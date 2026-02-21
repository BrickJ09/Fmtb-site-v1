// netlify/edge-functions/admin-logout.js
// Löscht den Session-Cookie und leitet zurück zum Login

export default async function handler(request) {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/admin-login.html',
      // Cookie mit Max-Age=0 löschen
      'Set-Cookie': 'fingermtb_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
    }
  });
}

export const config = { path: '/admin-logout' };
