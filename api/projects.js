/**
 * Vercel Serverless Function — /api/projects
 * Reads all projects from Postgres. No ArcGIS fallback.
 * ?refresh=true triggers a crawl.
 */

/* ── DB fetch ── */
async function fetchFromDB() {
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL, ssl: { rejectUnauthorized: false } });
  try {
    const result = await pool.query('SELECT data FROM projects ORDER BY updated_at DESC');
    return result.rows.map(r => r.data);
  } finally {
    await pool.end();
  }
}

/* ── Handler ── */
module.exports = async (req, res) => {
  const allowedOrigins = ['https://weckmedia.com', 'https://www.weckmedia.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);

  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  if (!process.env.POSTGRES_URL) {
    return res.status(503).json({ ok: false, error: 'No POSTGRES_URL configured' });
  }

  // Manual refresh: trigger crawl logic
  if (req.query.refresh === 'true') {
    try {
      const crawl = require('./crawl');
      // Simulate req/res for the crawl handler
      const crawlRes = {
        _status: 200, _body: null,
        status(s) { this._status = s; return this; },
        json(b) { this._body = b; },
        setHeader() {},
      };
      const crawlReq = {
        headers: { 'x-crawl-secret': process.env.CRAWL_SECRET },
        query: { secret: process.env.CRAWL_SECRET },
      };
      await crawl(crawlReq, crawlRes);
      // After crawl, fall through to return fresh data
    } catch (e) {
      return res.status(500).json({ ok: false, error: 'Crawl failed: ' + e.message });
    }
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  const t0 = Date.now();
  try {
    const projects = await fetchFromDB();
    const offshore = projects.filter(p => p.id && p.id.startsWith('VBK-HAV'));
    const onshore  = projects.filter(p => p.id && p.id.startsWith('VBK-LAND'));
    return res.json({
      ok: true, count: projects.length,
      offshore: offshore.length, onshore: onshore.length,
      ms: Date.now() - t0,
      timestamp: new Date().toISOString(),
      source: 'database',
      projects,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
