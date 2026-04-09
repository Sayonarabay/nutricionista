// api/chat.js — Nootrit · Vercel Serverless Function
// El frontend envía: { model, max_tokens, messages:[{role,content}] }
// Anthropic devuelve: { content:[{ type:'text', text:'...' }] }
// Este archivo es un proxy transparente que añade la API key.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured in Vercel env vars');
    return res.status(500).json({ error: 'API key not configured' });
  }

  const body = req.body;
  if (!body || !body.messages) {
    return res.status(400).json({ error: 'Missing messages in body' });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: body.model || 'claude-haiku-4-5-20251001',
        max_tokens: body.max_tokens || 120,
        messages: body.messages
      })
    });

    const data = await r.json();

    if (!r.ok) {
      console.error('Anthropic error:', r.status, JSON.stringify(data));
      return res.status(r.status).json(data);
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
