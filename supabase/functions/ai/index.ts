const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';

Deno.serve(async (req: Request) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

  if (!ANTHROPIC_KEY) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in Supabase secrets' }), {
      status: 500, headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    return new Response(JSON.stringify(data), {
      status: r.status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
