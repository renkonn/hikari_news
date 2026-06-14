const RATE_LIMIT = new Map();
const CACHE = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;
const RATE_WINDOW = 60 * 1000;
const RATE_MAX = 5;

function getRateKey(req) {
  return req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
}

function checkRateLimit(key) {
  const now = Date.now();
  const entry = RATE_LIMIT.get(key);
  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req) {
  const ip = getRateKey(req);
  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Rate limit exceeded. Please wait a moment.' }, { status: 429 });
  }

  let headlines;
  try {
    const body = await req.json();
    headlines = body.headlines;
    if (!Array.isArray(headlines) || headlines.length === 0) throw new Error('invalid');
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const now = Date.now();
  const cached = {};
  const toScore = [];

  headlines.forEach((h, i) => {
    const key = h.title.slice(0, 80);
    const hit = CACHE.get(key);
    if (hit && now - hit.cachedAt < CACHE_TTL) cached[i] = hit;
    else toScore.push({ index: i, headline: h });
  });

  const scored = {};

  if (toScore.length > 0) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const prompt = `You are a positivity scorer for Hikari News, a good-news aggregator.

For each headline, return a JSON array. Each object must have:
- "score": integer 0–100 (how positive/uplifting for humanity)  
- "reason": one short Japanese phrase ≤18 chars, e.g. "再生可能エネルギーの転換点"
- "cat": one of "env", "sci", "soc", "tech", "health"

Respond ONLY with the raw JSON array. No markdown, no extra text.

Headlines:
${toScore.map((t, i) => `${i + 1}. ${t.headline.title}`).join('\n')}`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data.content?.map(b => b.text || '').join('') || '[]';
      const clean = text.replace(/```json|```/g, '').trim();
      const results = JSON.parse(clean);

      toScore.forEach((t, i) => {
        const r = results[i] || { score: 75, reason: 'ポジティブなニュース', cat: t.headline.cat || 'soc' };
        const entry = { score: r.score, reason: r.reason, cat: r.cat, cachedAt: Date.now() };
        CACHE.set(t.headline.title.slice(0, 80), entry);
        scored[t.index] = entry;
      });
    } catch {
      toScore.forEach(t => {
        scored[t.index] = { score: 75, reason: 'ポジティブなニュース', cat: t.headline.cat || 'soc' };
      });
    }
  }

  const results = headlines.map((h, i) => ({
    ...h,
    ...(cached[i] || scored[i] || { score: 75, reason: 'ポジティブなニュース', cat: 'soc' }),
  }));

  return Response.json({ results });
}
