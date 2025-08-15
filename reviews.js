const fetch = require("node-fetch"); // Node.js Fetch für Netlify

exports.handler = async function(event, context) {
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbwRBKRnE2iqUO0DBUXObjdMwITDhcezBVWMjHQ6A9NU9YfVXMSJ1XxKwvgKTw0rFytgZw/exec";

  if (event.httpMethod === "GET") {
    // Reviews abrufen
    try {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === "POST") {
    // Neue Bewertung absenden
    try {
      const body = JSON.parse(event.body);

      // POST an die Google Web-App weiterleiten
      const res = await fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
