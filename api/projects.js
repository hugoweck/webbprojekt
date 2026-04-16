/**
 * Vercel Serverless Function — /api/projects
 * Serves projects from static JSON file (no database needed)
 */
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const allowedOrigins = ['https://weckmedia.com', 'https://www.weckmedia.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);

  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  const t0 = Date.now();
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'projects.json');
    const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const offshore = projects.filter(p => p.id && p.id.startsWith('VBK-HAV'));
    const onshore = projects.filter(p => p.id && p.id.startsWith('VBK-LAND'));
    return res.json({
      ok: true, count: projects.length,
      offshore: offshore.length, onshore: onshore.length,
      ms: Date.now() - t0,
      timestamp: new Date().toISOString(),
      source: 'static-json',
      projects,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
