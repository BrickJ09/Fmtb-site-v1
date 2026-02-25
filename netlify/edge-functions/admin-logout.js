// netlify/edge-functions/admin-logout.js

export default async function handler(request, context) {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/admin.html',
      'Set-Cookie': 'fm_sess=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict'
    }
  });
}

export const config = {
  path: ['/admin-logout']
};