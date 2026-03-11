/**
 * Vercel Serverless Function — /api/crawl
 * Inkrementell uppdatering: hämtar senaste poster och sparar i DB.
 * Anropas av cron-job.org (2x/dag) och Vercel Cron (1x/dag).
 *
 * Säkerhetsskydd: kräver header X-Crawl-Secret eller query ?secret=...
 */

const VBK_BASE =
  'https://ext-geodata-applikationer.lansstyrelsen.se/arcgis/rest/services/VBK/lst_vbk_read/MapServer';

const OFFSHORE_LAYERS = {
  68: 'Beviljat', 69: 'Beviljat', 70: 'Beviljat',
  71: 'Avslaget', 72: 'Överklagat',
  73: 'Under handläggning', 74: 'Under handläggning',
  75: 'Under handläggning', 76: 'Avslutat',
};

const ONSHORE_LAYERS = {
  5: 'Beviljat', 6: 'Beviljat', 7: 'Avslaget',
  8: 'Under handläggning', 10: 'Överklagat',
};

const OFFSHORE_FIELDS = [
  'OMRID','HAVSPARKNAMN','Orgnamn','Orgnr',
  'ANSOKINL','ANSOKTILLST','SenasteUppdaterat',
  'Beviljant','planantmax','BevMaxHojd',
  'InstallEff','BeraknadGWh','KOMNAMN','LANSNAMN','DNR',
].join(',');

const ONSHORE_FIELDS = [
  'VERKID','OMRID','PROJNAMN',
  'VerkArendeStatus_Text','VerkStatus_Text',
  'KOMNAMN','LANSNAMN',
  'vUser_ORGNAMN','vUser_ORGNR',
  'MAXEFFEKT','TOTALHOJD','ROTDIAMETER','CALPROD',
  'UPPFORT',
].join(',');

function isoDate(ms) {
  return ms ? new Date(ms).toISOString().slice(0, 10) : null;
}

function mapOffshore(a, layerId) {
  const name = (a.HAVSPARKNAMN || '').trim() || 'Havsbaserad vindkraftpark';
  const lan  = (a.LANSNAMN || '').replace(/ ?län ?/i, '').trim();
  const kom  = (a.KOMNAMN  || '').trim();
  const org  = (a.Orgnamn  || '').trim();
  const eff  = a.InstallEff || null;
  const ant  = a.Beviljant  || a.planantmax || null;
  const ghw  = a.BeraknadGWh || null;
  const hoj  = a.BevMaxHojd || null;
  const d1   = isoDate(a.ANSOKINL || a.ANSOKTILLST);
  const d2   = isoDate(a.SenasteUppdaterat);
  return {
    id: `VBK-HAV-${(a.OMRID||Math.random().toString(36).slice(2,8)).toString().replace(/\s/g,'-')}`,
    title: name, type: 'vindkraft',
    status: OFFSHORE_LAYERS[layerId] || 'Under handläggning',
    county: lan || 'Okänt', municipality: kom || 'Okänt',
    location: [kom, lan ? lan+' län' : ''].filter(Boolean).join(', ') || 'Havsbaserad',
    applicant: { name: org||'Okänd sökande', orgNr: a.Orgnr||'—', contact: '—' },
    officer: { name: '—', unit: 'Länsstyrelsen' },
    submitted: d1||'—', lastUpdated: d2||d1||'—',
    capacity: eff ? { value: eff, unit: 'MW' } : null,
    turbines: ant, area: null, investmentMSEK: null, duration: '25 år',
    description:
      `Havsbaserat vindkraftsprojekt: ${name}. Sökande: ${org||'ej angiven'}. ` +
      `Lokalisering: ${[kom,lan].filter(Boolean).join(', ')}. ` +
      (ghw ? `Beräknad årsproduktion: ${ghw} GWh. ` : '') +
      `Källa: Vindbrukskollen (Energimyndigheten).`,
    keyFacts: [ant?`${ant} havsbaserade vindkraftverk`:'Antal verk ej fastställt',hoj?`Max totalhöjd ${hoj} m`:null,eff?`Installerad effekt ${eff} MW`:null,ghw?`Beräknad årsproduktion ${ghw} GWh`:null,a.DNR?`Dnr: ${a.DNR}`:null].filter(Boolean),
    concerns: ['Påverkan på marina ekosystem och bottenfauna','Sjöfartssäkerhet','Påverkan på fiske och fiskenäring'],
    timeline: [d1?{date:d1,event:'Tillståndsansökan inlämnad'}:null,d2&&d2!==d1?{date:d2,event:'Senast uppdaterat – Vindbrukskollen'}:null].filter(Boolean),
    tags: ['vindkraft','havsbaserad','offshore',lan.toLowerCase(),kom.toLowerCase(),org.toLowerCase().split(' ')[0],'vindbrukskollen'].filter(t=>t&&t.length>1),
    sources: ['vindbrukskollen'],
  };
}

function mapOnshore(a, layerId) {
  const name = (a.PROJNAMN || '').trim() || 'Vindkraftpark';
  const lan  = (a.LANSNAMN || '').replace(/ ?län ?/i, '').trim();
  const kom  = (a.KOMNAMN  || '').trim();
  const org  = (a.vUser_ORGNAMN || '').trim();
  const eff  = a.MAXEFFEKT || null;
  const hoj  = a.TOTALHOJD || null;
  const prod = a.CALPROD   || null;
  const upp  = isoDate(a.UPPFORT);
  return {
    id: `VBK-LAND-${(a.VERKID||a.OMRID||Math.random().toString(36).slice(2,8)).toString().replace(/\s/g,'-')}`,
    title: name||`Vindkraftverk ${kom}`, type: 'vindkraft',
    status: ONSHORE_LAYERS[layerId] || 'Beviljat',
    county: lan||'Okänt', municipality: kom||'Okänt',
    location: [kom, lan ? lan+' län' : ''].filter(Boolean).join(', '),
    applicant: { name: org||'Okänd sökande', orgNr: a.vUser_ORGNR||'—', contact: '—' },
    officer: { name: '—', unit: 'Länsstyrelsen' },
    submitted: upp||'—', lastUpdated: upp||'—',
    capacity: eff ? { value: eff, unit: 'MW' } : null,
    turbines: null, area: null, investmentMSEK: null, duration: '25 år',
    description:
      `Landbaserat vindkraftsprojekt: ${name}. Sökande: ${org||'ej angiven'}. ` +
      `Lokalisering: ${[kom,lan].filter(Boolean).join(', ')}. ` +
      (eff?`Installerad effekt: ${eff} MW. `:'') +
      (prod?`Beräknad årsproduktion: ${prod} GWh. `:'') +
      `Källa: Vindbrukskollen (Energimyndigheten).`,
    keyFacts: [hoj?`Totalhöjd ${hoj} m`:null,eff?`Installerad effekt ${eff} MW`:null,prod?`Årsproduktion ${prod} GWh`:null,upp?`Uppfört ${upp}`:null].filter(Boolean),
    concerns: ['Buller för kringboende','Skuggpåverkan','Påverkan på fågellivet'],
    timeline: [upp?{date:upp,event:'Vindkraftverk uppfört / beviljat'}:null].filter(Boolean),
    tags: ['vindkraft','landbaserad','onshore',lan.toLowerCase(),kom.toLowerCase(),org.toLowerCase().split(' ')[0],'vindbrukskollen'].filter(t=>t&&t.length>1),
    sources: ['vindbrukskollen'],
  };
}

async function arcgisQuery(layerId, fields, extra = '') {
  const url = `${VBK_BASE}/${layerId}/query?where=1%3D1&outFields=${encodeURIComponent(fields)}&returnGeometry=false&f=json&resultRecordCount=500${extra}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res  = await fetch(url, { signal: ctrl.signal });
    const data = await res.json();
    return Array.isArray(data.features) ? data.features : [];
  } catch { return []; } finally { clearTimeout(t); }
}

async function upsertProjects(pool, projects) {
  const client = await pool.connect();
  let added = 0, updated = 0;
  try {
    await client.query('BEGIN');
    for (const p of projects) {
      const r = await client.query(
        `INSERT INTO projects (id, source, raw_id, data, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (id) DO UPDATE SET data = $4, updated_at = NOW()
         RETURNING (xmax = 0) AS inserted`,
        [p.id, 'vindbrukskollen', p.id, JSON.stringify(p)]
      );
      if (r.rows[0].inserted) added++; else updated++;
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
  return { added, updated };
}

module.exports = async (req, res) => {
  // Auth check
  const secret = req.headers['x-crawl-secret'] || req.query.secret;
  if (secret !== process.env.CRAWL_SECRET) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  if (!process.env.POSTGRES_URL) {
    return res.status(500).json({ ok: false, error: 'No database configured' });
  }

  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL, ssl: { rejectUnauthorized: false } });

  const t0 = Date.now();
  let totalAdded = 0, totalUpdated = 0;

  try {
    // Offshore — all layers (small dataset, fits in time limit)
    const offshoreProjects = [];
    const seen = new Set();
    const offResults = await Promise.allSettled(
      Object.keys(OFFSHORE_LAYERS).map(id =>
        arcgisQuery(Number(id), OFFSHORE_FIELDS).then(feats =>
          feats.map(f => mapOffshore(f.attributes, Number(id)))
        )
      )
    );
    for (const r of offResults) {
      if (r.status !== 'fulfilled') continue;
      for (const p of r.value) { if (!seen.has(p.id)) { seen.add(p.id); offshoreProjects.push(p); } }
    }
    if (offshoreProjects.length > 0) {
      const { added, updated } = await upsertProjects(pool, offshoreProjects);
      totalAdded += added; totalUpdated += updated;
    }

    // Onshore layer 6 (most active, newest first, top 500)
    const onshore = await arcgisQuery(6, ONSHORE_FIELDS, '&orderByFields=OBJECTID%20DESC');
    const onshoreProjects = onshore.map(f => mapOnshore(f.attributes, 6));
    if (onshoreProjects.length > 0) {
      const { added, updated } = await upsertProjects(pool, onshoreProjects);
      totalAdded += added; totalUpdated += updated;
    }

    // Also check other onshore layers for recent changes
    const otherOnshoreResults = await Promise.allSettled(
      [5, 7, 8, 10].map(id =>
        arcgisQuery(id, ONSHORE_FIELDS, '&orderByFields=OBJECTID%20DESC').then(feats =>
          feats.map(f => mapOnshore(f.attributes, id))
        )
      )
    );
    for (const r of otherOnshoreResults) {
      if (r.status !== 'fulfilled' || !r.value.length) continue;
      const { added, updated } = await upsertProjects(pool, r.value);
      totalAdded += added; totalUpdated += updated;
    }

    // Log
    await pool.query(
      `INSERT INTO crawl_log (finished_at, total, added, updated, errors, sources)
       VALUES (NOW(), $1, $2, $3, 0, '{"vindbrukskollen": true}')`,
      [totalAdded + totalUpdated, totalAdded, totalUpdated]
    );

    res.json({
      ok: true,
      added: totalAdded,
      updated: totalUpdated,
      ms: Date.now() - t0,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  } finally {
    await pool.end();
  }
};
