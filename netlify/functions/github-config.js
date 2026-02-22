// netlify/functions/github-config.js
// Gibt GITHUB_TOKEN + GITHUB_REPO an das Admin-Panel weiter
// Läuft server-seitig — Token nie direkt im Frontend-Code!

exports.handler = async function (event, context) {
  // Nur GET erlauben
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GITHUB_TOKEN oder GITHUB_REPO nicht gesetzt' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      // Nur vom eigenen Origin abrufbar
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify({ token, repo }),
  };
};