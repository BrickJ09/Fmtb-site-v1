// netlify/edge-functions/admin-auth.js

export default async function handler(request, context) {
  const url = new URL(request.url);

  // POST Login
  if (request.method === 'POST') {
    try {
      const formData = await request.formData();
      const user = formData.get('username');
      const pass = formData.get('password');

      const validUser = Deno.env.get('ADMIN_USERNAME');
      const validPass = Deno.env.get('ADMIN_PASSWORD');
      const secret    = Deno.env.get('SESSION_SECRET') || 'fallback-secret';

      if (user === validUser && pass === validPass) {
        const payload   = btoa(`${user}:${Date.now() + 7200000}`);
        const signature = await sign(payload, secret);
        const cookie    = `fm_sess=${payload}.${signature}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`;
        return new Response(null, {
          status: 302,
          headers: { 'Location': '/admin.html', 'Set-Cookie': cookie }
        });
      }

      return new Response(loginPage('Falsches Passwort oder Benutzername.'), {
        status: 401,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    } catch(e) {
      return new Response(loginPage('Fehler: ' + e.message), {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
  }

  // GET /admin.html oder /admin → Session prüfen
  if (url.pathname === '/admin.html' || url.pathname === '/admin') {
    const cookie = request.headers.get('cookie') || '';
    const secret = Deno.env.get('SESSION_SECRET') || 'fallback-secret';
    const sess   = parseCookie(cookie, 'fm_sess');

    if (sess && await verifySession(sess, secret)) {
      return context.next();
    }

    return new Response(loginPage(), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  return context.next();
}

function parseCookie(header, name) {
  const match = header.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
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
    const [payload, signature] = cookieValue.split('.');
    const expected = await sign(payload, secret);
    if (signature !== expected) return false;
    const expiry = parseInt(atob(payload).split(':')[1]);
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

function loginPage(error = '') {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login · FingerMTB</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #060608; color: #f0f0f0; font-family: 'Inter', sans-serif;
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background-image: radial-gradient(ellipse at 30% 30%, rgba(232,255,0,0.05) 0%, transparent 60%);
    }
    .box {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 40px 36px; width: 100%; max-width: 380px;
      backdrop-filter: blur(20px); box-shadow: 0 40px 80px rgba(0,0,0,0.5);
    }
    .logo { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #e8ff00; letter-spacing: 0.08em; margin-bottom: 4px; }
    .sub  { font-size: 0.65rem; color: rgba(255,255,255,0.35); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 32px; }
    label { display: block; font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 5px; margin-top: 16px; }
    input {
      width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      color: #f0f0f0; font-family: 'Inter', sans-serif; font-size: 0.9rem;
      padding: 11px 14px; outline: none; border-radius: 8px; transition: border-color 0.2s;
    }
    input:focus { border-color: rgba(232,255,0,0.5); background: rgba(232,255,0,0.03); }
    button {
      width: 100%; background: #e8ff00; color: #000; border: none;
      font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.1em;
      padding: 13px; border-radius: 8px; cursor: pointer; margin-top: 24px;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.85; }
    .error { background: rgba(255,51,85,0.12); border: 1px solid rgba(255,51,85,0.3); color: #ff3355; font-size: 0.75rem; padding: 10px 14px; border-radius: 8px; margin-top: 16px; }
    a { color: rgba(255,255,255,0.3); font-size: 0.7rem; text-decoration: none; display: block; text-align: center; margin-top: 20px; }
    a:hover { color: rgba(255,255,255,0.6); }
  </style>
</head>
<body>
  <div class="box">
    <div class="logo">FingerMTB</div>
    <div class="sub">Admin Panel</div>
    <form method="POST" action="/admin.html">
      <label>Benutzername</label>
      <input type="text" name="username" autocomplete="username" required autofocus>
      <label>Passwort</label>
      <input type="password" name="password" autocomplete="current-password" required>
      ${error ? `<div class="error">${error}</div>` : ''}
      <button type="submit">EINLOGGEN</button>
    </form>
    <a href="/">← Zurück zur Website</a>
  </div>
</body>
</html>`;
}

export const config = {
  path: ['/admin.html']
};