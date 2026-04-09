// api/chat.js — Nootrit AI endpoint
// Desplegado en Vercel como Serverless Function

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, type } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  const isActivity = type === 'Actividad';

  const systemPrompt = isActivity
    ? `Eres un experto en nutrición y fitness. El usuario describe una actividad física.
Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, sin bloques de código.
Formato exacto:
{"description":"nombre corto de la actividad","kcal":número_entero,"unit":"sesión","protein_g":0,"carbs_g":0,"fat_g":0}
Las kcal son las quemadas aproximadas. Sé conservador y realista.`
    : `Eres un experto en nutrición española y mediterránea. El usuario describe una comida o alimento.
Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, sin bloques de código.
Formato exacto:
{"description":"nombre normalizado del alimento/plato","kcal":número_entero,"unit":"porción","protein_g":número_entero,"carbs_g":número_entero,"fat_g":número_entero}
Usa valores nutricionales reales y precisos. Si son varias unidades (ej: "2 huevos"), devuelve los valores TOTALES.
La unidad debe ser la unidad más natural: "huevo", "vaso", "porción", "ración", "pieza", etc.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        system: systemPrompt,
        messages: [
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Anthropic API error:', response.status, errBody);
      return res.status(502).json({
        error: 'Anthropic API error',
        status: response.status,
        detail: errBody
      });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // Parse JSON — strip any accidental markdown fences
    const clean = text.replace(/```json|```/g, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error('JSON parse error:', clean);
      return res.status(200).json({ error: 'parse_error', raw: clean });
    }

    // Validate required field
    if (!parsed.kcal || typeof parsed.kcal !== 'number') {
      return res.status(200).json({ error: 'invalid_response', raw: clean });
    }

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
}
