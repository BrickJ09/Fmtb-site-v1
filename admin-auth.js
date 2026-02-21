// netlify/edge-functions/admin-auth.js
// Läuft auf Netlify's Edge-Servern — Passwort NIE im Frontend sichtbar

export default async function handler(request, context) {
  const url = new URL(request.url);

  // Login-POST abhandeln
  if (request.method === 'POST' && url.pathname === '/admin-login') {
    const formData = await request.formData();
    const user = formData.get('username');
    const pass = formData.get('password');

    // Liest aus Netlify Environment Variables (nie im Code sichtbar!)
    const validUser = Deno.env.get('ADMIN_USERNAME');
    const validPass = Deno.env.get('ADMIN_PASSWORD');
    const secret = Deno.env.get('SESSION_SECRET');

    if (user === validUser && pass === validPass) {
      const payload = `${user}:${Date.now() + 2 * 60 * 60 * 1000}`; // 2h
      const signature = await sign(payload, secret);
      const cookieValue = `${btoa(payload)}.${signature}`;

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin.html',
          'Set-Cookie': `fingermtb_session=${cookieValue}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`
        }
      });
    }

    // Falsches Passwort
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/admin-login.html?error=1' }
    });
  }

  // GET /admin.html → Session prüfen
  const cookie = request.headers.get('cookie') || '';
  const sessionCookie = parseCookie(cookie, 'fingermtb_session');
  const secret = Deno.env.get('SESSION_SECRET');

  if (!sessionCookie || !(await verifySession(sessionCookie, secret))) {
    const isExpired = !!sessionCookie;
    return new Response(null, {
      status: 302,
      headers: {
        'Location': isExpired ? '/admin-login.html?expired=1' : '/admin-login.html',
        ...(isExpired ? { 'Set-Cookie': 'fingermtb_session=; Max-Age=0; Path=/' } : {})
      }
    });
  }

  return context.next();
}

function parseCookie(header, name) {
  const match = header.split(';').map(c => c.trim()).find(c => c.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

async function sign(payload, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function verifySession(cookieValue, secret) {
  try {
    const [encodedPayload, signature] = cookieValue.split('.');
    const payload = atob(encodedPayload);
    const expectedSig = await sign(payload, secret);
    if (signature !== expectedSig) return false;
    const expiry = parseInt(payload.split(':')[1]);
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

export const config = {
  path: ['/admin.html', '/admin-login']
};
