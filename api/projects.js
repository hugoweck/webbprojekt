/**
 * Vercel Serverless Function — /api/projects
 * Läser från Neon Postgres om POSTGRES_URL är satt,
 * annars hämtar live från Vindbrukskollen ArcGIS API.
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
  'UPPFORT','MB_Tillstand_TIDSBEGRANS_DAT',
].join(',');

function isoDate(ms) {
  return ms ? new Date(ms).toISOString().slice(0, 10) : null;
}

async function arcgisQuery(layerId, fields) {
  const url =
    `${VBK_BASE}/${layerId}/query` +
    `?where=1%3D1` +
    `&outFields=${encodeURIComponent(fields)}` +
    `&returnGeometry=false&f=json&resultRecordCount=500`;
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    const res  = await fetch(url, { signal: ctrl.signal });
    const data = await res.json();
    return Array.isArray(data.features) ? data.features : [];
  } catch { return []; } finally { clearTimeout(timer); }
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
    id: `VBK-HAV-${(a.OMRID || Math.random().toString(36).slice(2,8)).toString().replace(/\s/g,'-')}`,
    title: name, type: 'vindkraft',
    status: OFFSHORE_LAYERS[layerId] || 'Under handläggning',
    county: lan || 'Okänt', municipality: kom || 'Okänt',
    location: [kom, lan ? lan+' län' : ''].filter(Boolean).join(', ') || 'Havsbaserad',
    applicant: { name: org || 'Okänd sökande', orgNr: a.Orgnr || '—', contact: '—' },
    officer: { name: '—', unit: 'Länsstyrelsen' },
    submitted: d1 || '—', lastUpdated: d2 || d1 || '—',
    capacity: eff ? { value: eff, unit: 'MW' } : null,
    turbines: ant, area: null, investmentMSEK: null, duration: '25 år',
    description:
      `Havsbaserat vindkraftsprojekt: ${name}. Sökande: ${org||'ej angiven'}. ` +
      `Lokalisering: ${[kom,lan].filter(Boolean).join(', ')}. ` +
      (ghw ? `Beräknad årsproduktion: ${ghw} GWh. ` : '') +
      `Källa: Vindbrukskollen (Energimyndigheten).`,
    keyFacts: [
      ant ? `${ant} havsbaserade vindkraftverk` : 'Antal verk ej fastställt',
      hoj ? `Max totalhöjd ${hoj} m` : null,
      eff ? `Installerad effekt ${eff} MW` : null,
      ghw ? `Beräknad årsproduktion ${ghw} GWh` : null,
      a.DNR ? `Dnr: ${a.DNR}` : null,
    ].filter(Boolean),
    concerns: ['Påverkan på marina ekosystem och bottenfauna','Sjöfartssäkerhet','Påverkan på fiske och fiskenäring'],
    timeline: [
      d1 ? { date: d1, event: 'Tillståndsansökan inlämnad' } : null,
      d2 && d2 !== d1 ? { date: d2, event: 'Senast uppdaterat – Vindbrukskollen' } : null,
    ].filter(Boolean),
    tags: ['vindkraft','havsbaserad','offshore',lan.toLowerCase(),kom.toLowerCase(),org.toLowerCase().split(' ')[0],'vindbrukskollen'].filter(t=>t&&t.length>1),
    sources: ['vindbrukskollen'],
    sourceUrl: a.OMRID
      ? `${VBK_BASE}/${layerId}/query?where=OMRID%3D${encodeURIComponent(a.OMRID)}&outFields=*&returnGeometry=false&f=html`
      : 'https://vbk.lansstyrelsen.se/',
    vbkUrl: 'https://vbk.lansstyrelsen.se/',
  };
}

function mapOnshore(rep, layerId, turbineCount, totalEff, totalProd) {
  const a    = rep;
  const name = (a.PROJNAMN || '').trim() || 'Vindkraftpark';
  const lan  = (a.LANSNAMN || '').replace(/ ?län ?/i, '').trim();
  const kom  = (a.KOMNAMN  || '').trim();
  const org  = (a.vUser_ORGNAMN || '').trim();
  const eff  = totalEff || a.MAXEFFEKT || null;
  const hoj  = a.TOTALHOJD || null;
  const prod = totalProd || a.CALPROD || null;
  const upp  = isoDate(a.UPPFORT);
  const exp  = isoDate(a.MB_Tillstand_TIDSBEGRANS_DAT);
  let duration = null;
  if (a.UPPFORT && a.MB_Tillstand_TIDSBEGRANS_DAT) {
    const years = Math.round((a.MB_Tillstand_TIDSBEGRANS_DAT - a.UPPFORT) / (1000*60*60*24*365));
    if (years > 0 && years < 100) duration = `${years} år`;
  }
  const id = a.OMRID
    ? `VBK-LAND-${String(a.OMRID).replace(/\s/g,'-')}`
    : `VBK-LAND-${name.replace(/\s/g,'-').slice(0,30)}-${kom}`;
  return {
    id, title: name || `Vindkraftpark ${kom}`, type: 'vindkraft', subtype: 'onshore',
    status: ONSHORE_LAYERS[layerId] || 'Beviljat',
    county: lan||'Okänt', municipality: kom||'Okänt',
    location: [kom, lan ? lan+' län' : ''].filter(Boolean).join(', '),
    applicant: { name: org||'Okänd sökande', orgNr: a.vUser_ORGNR||'—', contact: '—' },
    officer: { name: '—', unit: 'Länsstyrelsen' },
    submitted: upp||'—', lastUpdated: upp||'—', permitExpiry: exp||null,
    capacity: eff ? { value: Math.round(eff*10)/10, unit: 'MW' } : null,
    turbines: turbineCount > 1 ? turbineCount : null,
    area: null, investmentMSEK: null, duration,
    description:
      `Landbaserat vindkraftsprojekt: ${name}. Sökande: ${org||'ej angiven'}. ` +
      `Lokalisering: ${[kom,lan].filter(Boolean).join(', ')}. ` +
      (turbineCount > 1 ? `Antal vindkraftverk: ${turbineCount}. ` : '') +
      (eff ? `Total installerad effekt: ${Math.round(eff*10)/10} MW. ` : '') +
      (prod ? `Beräknad årsproduktion: ${Math.round(prod)} GWh. ` : '') +
      `Källa: Vindbrukskollen (Energimyndigheten).`,
    keyFacts: [
      turbineCount > 1 ? `${turbineCount} vindkraftverk i parken` : null,
      hoj  ? `Totalhöjd upp till ${hoj} m`                        : null,
      eff  ? `Installerad effekt ${Math.round(eff*10)/10} MW`      : null,
      prod ? `Årsproduktion ${Math.round(prod)} GWh`               : null,
      upp  ? `Uppfört ${upp}`                                      : null,
      exp  ? `Tillstånd till ${exp}`                               : null,
    ].filter(Boolean),
    concerns: ['Buller för kringboende','Skuggpåverkan','Påverkan på fågellivet'],
    timeline: [
      upp ? { date: upp, event: 'Vindkraftverk uppfört / beviljat' } : null,
      exp ? { date: exp, event: 'Tillstånd upphör'                 } : null,
    ].filter(Boolean),
    tags: ['vindkraft','landbaserad','onshore',lan.toLowerCase(),kom.toLowerCase(),org.toLowerCase().split(' ')[0],'vindbrukskollen'].filter(t=>t&&t.length>1),
    sources: ['vindbrukskollen'],
    sourceUrl: a.OMRID
      ? `${VBK_BASE}/${layerId}/query?where=OMRID%3D${encodeURIComponent(a.OMRID)}&outFields=*&returnGeometry=false&f=html`
      : 'https://vbk.lansstyrelsen.se/',
    vbkUrl: 'https://vbk.lansstyrelsen.se/',
  };
}

function groupAndMapOnshore(features, layerId) {
  const groups = new Map();
  for (const feat of features) {
    const a = feat.attributes;
    const key = a.OMRID
      ? String(a.OMRID).trim()
      : `${(a.PROJNAMN||'').trim()}_${(a.KOMNAMN||'').trim()}_${layerId}`;
    if (!groups.has(key)) {
      groups.set(key, { rep: a, count: 1, totalEff: a.MAXEFFEKT||0, totalProd: a.CALPROD||0 });
    } else {
      const g = groups.get(key);
      g.count++; g.totalEff += a.MAXEFFEKT||0; g.totalProd += a.CALPROD||0;
      const score = o => Object.values(o).filter(v => v !== null && v !== '' && v !== undefined).length;
      if (score(a) > score(g.rep)) g.rep = a;
    }
  }
  const projects = [];
  for (const { rep, count, totalEff, totalProd } of groups.values()) {
    try { projects.push(mapOnshore(rep, layerId, count, totalEff||null, totalProd||null)); } catch {}
  }
  return projects;
}

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

/* ── Live ArcGIS fetch (fallback) ── */
async function fetchOffshore() {
  const results = await Promise.allSettled(
    Object.keys(OFFSHORE_LAYERS).map(id =>
      arcgisQuery(Number(id), OFFSHORE_FIELDS).then(feats =>
        feats.map(f => mapOffshore(f.attributes, Number(id)))
      )
    )
  );
  const seen = new Set(); const out = [];
  for (const r of results) {
    if (r.status !== 'fulfilled') continue;
    for (const p of r.value) { if (!seen.has(p.id)) { seen.add(p.id); out.push(p); } }
  }
  return out;
}

async function fetchOnshore() {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  let feats = [];
  try {
    const res  = await fetch(
      `${VBK_BASE}/6/query?where=1%3D1&outFields=${encodeURIComponent(ONSHORE_FIELDS)}&returnGeometry=false&f=json`,
      { signal: ctrl.signal }
    );
    const data = await res.json();
    feats = data.features || [];
  } catch { return []; } finally { clearTimeout(timer); }

  return groupAndMapOnshore(feats, 6);
}

/* ── Handler ── */
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Content-Type', 'application/json');

  const t0 = Date.now();

  // DB path
  if (process.env.POSTGRES_URL) {
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
      // fall through to live fetch
    }
  }

  // Live ArcGIS fallback
  const [offR, onR] = await Promise.allSettled([fetchOffshore(), fetchOnshore()]);
  const offshore = offR.status === 'fulfilled' ? offR.value : [];
  const onshore  = onR.status  === 'fulfilled' ? onR.value  : [];
  const projects = [...offshore, ...onshore];

  res.json({
    ok: true, count: projects.length,
    offshore: offshore.length, onshore: onshore.length,
    ms: Date.now() - t0,
    timestamp: new Date().toISOString(),
    source: 'live-arcgis',
    projects,
  });
};
