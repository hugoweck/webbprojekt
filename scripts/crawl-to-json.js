#!/usr/bin/env node
/**
 * Crawl Vindbrukskollen → save as static JSON (no database needed)
 * Usage: node scripts/crawl-to-json.js
 */

const fs = require('fs');
const path = require('path');

const VBK_BASE = 'https://ext-geodata-applikationer.lansstyrelsen.se/arcgis/rest/services/VBK/lst_vbk_read/MapServer';

const OFFSHORE_LAYERS = {
  68: 'Beviljat', 69: 'Beviljat', 70: 'Beviljat',
  71: 'Avslaget', 72: 'Överklagat',
  73: 'Under handläggning', 74: 'Under handläggning', 75: 'Under handläggning',
  76: 'Avslutat',
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
  'UPPFORT','SenasteUppdatering','MB_Tillstand_TIDSBEGRANS_DAT',
].join(',');

function isoDate(ms) { return ms ? new Date(ms).toISOString().slice(0, 10) : null; }

function mapOffshore(a, layerId) {
  const name = (a.HAVSPARKNAMN || '').trim() || 'Havsbaserad vindkraftpark';
  const lan = (a.LANSNAMN || '').replace(/ ?län ?/i, '').trim();
  const kom = (a.KOMNAMN || '').trim();
  const org = (a.Orgnamn || '').trim();
  const eff = a.InstallEff || null;
  const ant = a.Beviljant || a.planantmax || null;
  const ghw = a.BeraknadGWh || null;
  const hoj = a.BevMaxHojd || null;
  const d1 = isoDate(a.ANSOKINL || a.ANSOKTILLST);
  const d2 = isoDate(a.SenasteUppdaterat);
  return {
    id: `VBK-HAV-${(a.OMRID || Math.random().toString(36).slice(2,8)).toString().replace(/\s/g,'-')}`,
    title: name, type: 'vindkraft', status: OFFSHORE_LAYERS[layerId] || 'Under handläggning',
    county: lan || 'Okänt', municipality: kom || 'Okänt',
    location: [kom, lan ? lan + ' län' : ''].filter(Boolean).join(', ') || 'Havsbaserad',
    applicant: { name: org || 'Okänd sökande', orgNr: a.Orgnr || '—', contact: '—' },
    officer: { name: '—', unit: 'Länsstyrelsen' },
    submitted: d1 || '—', lastUpdated: d2 || d1 || '—',
    capacity: eff ? { value: eff, unit: 'MW' } : null,
    turbines: ant, area: null, investmentMSEK: null, duration: '25 år',
    description: `Havsbaserat vindkraftsprojekt: ${name}. Sökande: ${org || 'ej angiven'}. Lokalisering: ${[kom, lan].filter(Boolean).join(', ')}. ${ghw ? `Beräknad årsproduktion: ${ghw} GWh. ` : ''}Källa: Vindbrukskollen (Energimyndigheten).`,
    keyFacts: [
      ant ? `${ant} havsbaserade vindkraftverk` : 'Antal verk ej fastställt',
      hoj ? `Max totalhöjd ${hoj} m` : null,
      eff ? `Installerad effekt ${eff} MW` : null,
      ghw ? `Beräknad årsproduktion ${ghw} GWh` : null,
      a.DNR ? `Dnr: ${a.DNR}` : null,
    ].filter(Boolean),
    concerns: ['Påverkan på marina ekosystem och bottenfauna', 'Sjöfartssäkerhet', 'Påverkan på fiske och fiskenäring'],
    timeline: [
      d1 ? { date: d1, event: 'Tillståndsansökan inlämnad' } : null,
      d2 && d2 !== d1 ? { date: d2, event: 'Senast uppdaterat – Vindbrukskollen' } : null,
    ].filter(Boolean),
    tags: ['vindkraft','havsbaserad','offshore', lan.toLowerCase(), kom.toLowerCase(), org.toLowerCase().split(' ')[0], 'vindbrukskollen'].filter(t => t && t.length > 1),
    sources: ['vindbrukskollen'],
    sourceUrl: a.OMRID ? `${VBK_BASE}/${layerId}/query?where=OMRID%3D${encodeURIComponent(a.OMRID)}&outFields=*&returnGeometry=false&f=html` : 'https://vbk.lansstyrelsen.se/',
    vbkUrl: 'https://vbk.lansstyrelsen.se/',
  };
}

function mapOnshore(a, layerId, turbineCount, totalEff, totalProd) {
  const name = (a.PROJNAMN || '').trim() || 'Vindkraftpark';
  const lan = (a.LANSNAMN || '').replace(/ ?län ?/i, '').trim();
  const kom = (a.KOMNAMN || '').trim();
  const org = (a.vUser_ORGNAMN || '').trim();
  const eff = totalEff || a.MAXEFFEKT || null;
  const hoj = a.TOTALHOJD || null;
  const prod = totalProd || a.CALPROD || null;
  const upp = isoDate(a.UPPFORT);
  const upd = isoDate(a.SenasteUppdatering);
  const exp = isoDate(a.MB_Tillstand_TIDSBEGRANS_DAT);
  let duration = null;
  if (a.UPPFORT && a.MB_Tillstand_TIDSBEGRANS_DAT) {
    const years = Math.round((a.MB_Tillstand_TIDSBEGRANS_DAT - a.UPPFORT) / (1000 * 60 * 60 * 24 * 365));
    if (years > 0 && years < 100) duration = `${years} år`;
  }
  const id = a.OMRID ? `VBK-LAND-${String(a.OMRID).replace(/\s/g,'-')}` : `VBK-LAND-${name.replace(/\s/g,'-').slice(0,30)}-${kom}`;
  return {
    id, title: name || `Vindkraftpark ${kom}`, type: 'vindkraft', subtype: 'onshore',
    status: ONSHORE_LAYERS[layerId] || 'Beviljat',
    county: lan || 'Okänt', municipality: kom || 'Okänt',
    location: [kom, lan ? lan + ' län' : ''].filter(Boolean).join(', '),
    applicant: { name: org || 'Okänd sökande', orgNr: a.vUser_ORGNR || '—', contact: '—' },
    officer: { name: '—', unit: 'Länsstyrelsen' },
    submitted: upp || '—', lastUpdated: upd || upp || '—', permitExpiry: exp || null,
    capacity: eff ? { value: Math.round(eff * 10) / 10, unit: 'MW' } : null,
    turbines: turbineCount > 1 ? turbineCount : null, area: null, investmentMSEK: null, duration,
    description: `Landbaserat vindkraftsprojekt: ${name}. Sökande: ${org || 'ej angiven'}. Lokalisering: ${[kom, lan].filter(Boolean).join(', ')}. ${turbineCount > 1 ? `Antal vindkraftverk: ${turbineCount}. ` : ''}${eff ? `Total installerad effekt: ${Math.round(eff * 10) / 10} MW. ` : ''}${prod ? `Beräknad årsproduktion: ${Math.round(prod)} GWh. ` : ''}Källa: Vindbrukskollen (Energimyndigheten).`,
    keyFacts: [
      turbineCount > 1 ? `${turbineCount} vindkraftverk i parken` : null,
      hoj ? `Totalhöjd upp till ${hoj} m` : null,
      eff ? `Installerad effekt ${Math.round(eff*10)/10} MW` : null,
      prod ? `Årsproduktion ${Math.round(prod)} GWh` : null,
      upp ? `Uppfört ${upp}` : null,
      exp ? `Tillstånd till ${exp}` : null,
    ].filter(Boolean),
    concerns: ['Buller för kringboende', 'Skuggpåverkan', 'Påverkan på fågellivet'],
    timeline: [
      upp ? { date: upp, event: 'Vindkraftverk uppfört / beviljat' } : null,
      exp ? { date: exp, event: 'Tillstånd upphör' } : null,
    ].filter(Boolean),
    tags: ['vindkraft','landbaserad','onshore', lan.toLowerCase(), kom.toLowerCase(), org.toLowerCase().split(' ')[0], 'vindbrukskollen'].filter(t => t && t.length > 1),
    sources: ['vindbrukskollen'],
    sourceUrl: a.OMRID ? `${VBK_BASE}/${layerId}/query?where=OMRID%3D${encodeURIComponent(a.OMRID)}&outFields=*&returnGeometry=false&f=html` : 'https://vbk.lansstyrelsen.se/',
    vbkUrl: 'https://vbk.lansstyrelsen.se/',
  };
}

function groupAndMapOnshore(features, layerId) {
  const groups = new Map();
  for (const feat of features) {
    const a = feat.attributes;
    const key = a.OMRID ? String(a.OMRID).trim() : `${(a.PROJNAMN||'').trim()}_${(a.KOMNAMN||'').trim()}_${layerId}`;
    if (!groups.has(key)) {
      groups.set(key, { rep: a, count: 1, totalEff: a.MAXEFFEKT || 0, totalProd: a.CALPROD || 0 });
    } else {
      const g = groups.get(key);
      g.count++;
      g.totalEff += a.MAXEFFEKT || 0;
      g.totalProd += a.CALPROD || 0;
      const score = o => Object.values(o).filter(v => v !== null && v !== '' && v !== undefined).length;
      if (score(a) > score(g.rep)) g.rep = a;
    }
  }
  const projects = [];
  for (const { rep, count, totalEff, totalProd } of groups.values()) {
    try { projects.push(mapOnshore(rep, layerId, count, totalEff || null, totalProd || null)); } catch {}
  }
  return projects;
}

async function arcgisGet(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const data = await res.json();
  if (data.error) throw new Error(`ArcGIS ${data.error.code}: ${data.error.message}`);
  return data;
}

async function getCounties(layerId) {
  const url = `${VBK_BASE}/${layerId}/query?where=1%3D1&outFields=LANSNAMN&returnGeometry=false&returnDistinctValues=true&f=json`;
  try { const data = await arcgisGet(url); return (data.features || []).map(f => f.attributes.LANSNAMN).filter(Boolean); } catch { return []; }
}

async function fetchAllFromLayer(layerId, fields) {
  const simpleUrl = `${VBK_BASE}/${layerId}/query?where=1%3D1&outFields=${encodeURIComponent(fields)}&returnGeometry=false&f=json`;
  try {
    const data = await arcgisGet(simpleUrl);
    const feats = data.features || [];
    if (!data.exceededTransferLimit) return feats;
    const counties = await getCounties(layerId);
    if (!counties.length) return feats;
    const all = [];
    for (const county of counties) {
      const where = `LANSNAMN='${county.replace(/'/g, "''")}'`;
      const url = `${VBK_BASE}/${layerId}/query?where=${encodeURIComponent(where)}&outFields=${encodeURIComponent(fields)}&returnGeometry=false&f=json`;
      try {
        const d = await arcgisGet(url);
        (d.features || []).forEach(f => all.push(f));
        if (d.exceededTransferLimit) {
          const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
          for (const letter of letters) {
            const w2 = `LANSNAMN='${county.replace(/'/g,"''")}' AND PROJNAMN LIKE '${letter}%'`;
            const u2 = `${VBK_BASE}/${layerId}/query?where=${encodeURIComponent(w2)}&outFields=${encodeURIComponent(fields)}&returnGeometry=false&f=json`;
            try { const d2 = await arcgisGet(u2); (d2.features || []).forEach(f => all.push(f)); } catch {}
          }
        }
      } catch {}
    }
    return all;
  } catch (e) { console.log(` FEL: ${e.message}`); return []; }
}

async function main() {
  console.log('=== Vindbrukskollen Crawler → JSON ===');
  console.log(`Starttid: ${new Date().toISOString()}\n`);
  const startAt = Date.now();

  // Offshore
  console.log('--- Havsbaserade (offshore) ---');
  const offshoreResults = await Promise.allSettled(
    Object.entries(OFFSHORE_LAYERS).map(([id, status]) =>
      (async () => {
        process.stdout.write(`  Layer ${id} (${status}): hämtar…`);
        const feats = await fetchAllFromLayer(Number(id), OFFSHORE_FIELDS);
        console.log(` ${feats.length} poster`);
        return feats.map(f => { try { return mapOffshore(f.attributes, Number(id)); } catch { return null; } }).filter(Boolean);
      })()
    )
  );

  const offshoreProjects = [];
  const seenOff = new Set();
  for (const r of offshoreResults) {
    if (r.status !== 'fulfilled') continue;
    for (const p of r.value) { if (!seenOff.has(p.id)) { seenOff.add(p.id); offshoreProjects.push(p); } }
  }
  console.log(`\nHavsbaserade totalt: ${offshoreProjects.length}\n`);

  // Onshore
  console.log('--- Landbaserade (onshore) ---');
  const onshoreProjects = [];
  for (const [id, status] of Object.entries(ONSHORE_LAYERS)) {
    process.stdout.write(`  Layer ${id} (${status}): hämtar…`);
    const feats = await fetchAllFromLayer(Number(id), ONSHORE_FIELDS);
    console.log(` ${feats.length} turbiner`);
    const projects = groupAndMapOnshore(feats, Number(id));
    console.log(`  → ${projects.length} projekt`);
    onshoreProjects.push(...projects);
  }

  // Deduplicate onshore
  const seenOn = new Set();
  const uniqueOnshore = onshoreProjects.filter(p => { if (seenOn.has(p.id)) return false; seenOn.add(p.id); return true; });

  const allProjects = [...offshoreProjects, ...uniqueOnshore];
  const outPath = path.join(__dirname, '..', 'data', 'projects.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(allProjects, null, 0));

  const elapsed = Date.now() - startAt;
  console.log(`\n=== KLAR ===`);
  console.log(`Totalt: ${allProjects.length} projekt (${offshoreProjects.length} offshore + ${uniqueOnshore.length} onshore)`);
  console.log(`Sparad till: ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`Tid: ${(elapsed/1000).toFixed(1)}s`);
}

main().catch(e => { console.error('Kritiskt fel:', e); process.exit(1); });
