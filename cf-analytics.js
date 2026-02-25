// netlify/functions/cf-analytics.js
// Cloudflare Web Analytics API
// Benötigt: CF_API_TOKEN und CF_SITE_TAG in Netlify Environment Variables

exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const token   = process.env.CF_API_TOKEN;
  const siteTag = process.env.CF_SITE_TAG;

  if (!token || !siteTag) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'CF_API_TOKEN oder CF_SITE_TAG fehlt', visitors: null, pageviews: null, requests: null }),
    };
  }

  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const until = new Date().toISOString().split('T')[0];

    const r = await fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          viewer {
            accounts {
              webAnalyticsSites(filter: { siteTag: "${siteTag}" }) {
                totals(
                  filter: {
                    date_geq: "${since}"
                    date_leq: "${until}"
                  }
                ) {
                  pageViews
                  visits
                }
              }
            }
          }
        }`
      }),
    });

    if (!r.ok) throw new Error(`CF API ${r.status}`);
    const data = await r.json();
    if (data.errors) throw new Error(data.errors[0]?.message || 'GraphQL error');

    const totals = data?.data?.viewer?.accounts?.[0]?.webAnalyticsSites?.[0]?.totals;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({
        visitors:  totals?.visits    ?? null,
        pageviews: totals?.pageViews ?? null,
        requests:  totals?.pageViews ?? null,
      }),
    };
  } catch(e) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message, visitors: null, pageviews: null, requests: null }),
    };
  }
};