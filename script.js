/* ============================================================
   ENERGIÄRENDEN — Länsstyrelsen Sverige
   Sökdatabas för energiprojekt
   ============================================================ */


// Projects loaded from database

/* ============================================================
   FETCH PROJECTS FROM API
   ============================================================ */
async function fetchProjects() {
  const res = await fetch('/api/projects', { signal: AbortSignal.timeout(15000) });
  const data = await res.json();
  return (data.ok && Array.isArray(data.projects)) ? data.projects : [];
}

/* ============================================================
   STATE
   ============================================================ */
// ALL_PROJECTS is populated at init and extended with live data
let ALL_PROJECTS = [];

const state = {
  query: '',
  activeTypes: new Set(['alla']),
  capMin: null,
  capMax: null,
  county: '',
  status: '',
  sortBy: 'date',
  selectedId: null,
  results: [],
};

/* ============================================================
   SEARCH ENGINE
   ============================================================ */
function buildSearchIndex(p) {
  return [
    p.title, p.type, p.county, p.municipality, p.location,
    p.applicant.name, p.applicant.contact,
    p.officer.name, p.officer.unit,
    p.status, p.description,
    p.tags.join(' '),
    p.keyFacts.join(' '),
    p.concerns.join(' '),
    p.id, p.duration,
  ].join(' ').toLowerCase();
}

function tokenize(q) {
  return [...new Set(q.toLowerCase().trim().split(/[\s,;]+/).filter(t => t.length > 1))];
}

function scoreToken(p, token) {
  let score = 0;
  const t = token;

  // Title — highest weight
  if (p.title.toLowerCase().includes(t)) score += 30;

  // Type (vindkraft, solkraft, etc.)
  if (p.type.toLowerCase().includes(t)) score += 28;
  if (p.typLabel && p.typLabel.toLowerCase().includes(t)) score += 25;

  // Location fields
  if (p.county.toLowerCase().includes(t))       score += 22;
  if (p.municipality.toLowerCase().includes(t)) score += 22;
  if (p.location.toLowerCase().includes(t))     score += 20;

  // People
  if (p.officer.name.toLowerCase().includes(t))    score += 18;
  if (p.applicant.name.toLowerCase().includes(t))  score += 16;
  if (p.applicant.contact.toLowerCase().includes(t)) score += 10;

  // Status
  if (p.status.toLowerCase().includes(t)) score += 14;

  // Tags
  if (p.tags.some(tag => tag.includes(t))) score += 12;

  // Description / facts
  if (p.description.toLowerCase().includes(t)) score += 8;
  if (p.keyFacts.some(f => f.toLowerCase().includes(t))) score += 6;
  if (p.concerns.some(c => c.toLowerCase().includes(t))) score += 4;

  // ID / misc
  if (p.id.toLowerCase().includes(t)) score += 5;

  return score;
}

function getProjectTypeKey(p) {
  if (p.type === 'vindkraft') {
    if (p.subtype === 'offshore' || p.id.startsWith('VBK-HAV')) return 'offshore';
    if (p.subtype === 'onshore' || p.id.startsWith('VBK-LAND')) return 'onshore';
    // Static projects: check tags/title/location for offshore indicators
    const hint = [p.title, p.location, ...(p.tags || [])].join(' ').toLowerCase();
    if (hint.includes('offshore') || hint.includes('havsbaserad') || hint.includes('havs')) return 'offshore';
    return 'onshore';
  }
  return p.type;
}

function search(query) {
  const tokens = tokenize(query);
  const hasQuery = tokens.length > 0;
  const { activeTypes, capMin, capMax, county, status: statusFilter, sortBy } = state;
  const showAll = activeTypes.has('alla');

  let results = ALL_PROJECTS.map(p => {
    // Type filter (multi-select)
    if (!showAll) {
      const typeKey = getProjectTypeKey(p);
      if (!activeTypes.has(typeKey)) return null;
    }

    // Status filter
    if (statusFilter) {
      if (p.status !== statusFilter) return null;
    } else {
      // Hide rejected by default unless explicitly selected
      if (p.status === 'Avslaget') return null;
    }

    // Capacity filter
    const capVal = p.capacity ? p.capacity.value : 0;
    if (capMin !== null && capVal < capMin) return null;
    if (capMax !== null && capVal > capMax) return null;

    // County filter
    if (county && p.county !== county) return null;

    if (!hasQuery) return { project: p, score: 0, maxScore: 0 };

    // ALL tokens must match (AND logic)
    let total = 0;
    for (const t of tokens) {
      const s = scoreToken(p, t);
      if (s === 0) return null;
      total += s;
    }
    return { project: p, score: total, maxScore: 0 };
  }).filter(Boolean);

  if (hasQuery) {
    const maxScore = Math.max(...results.map(r => r.score), 1);
    results = results
      .map(r => ({ ...r, maxScore }))
      .sort((a, b) => b.score - a.score);
  } else {
    // Sort according to selected sort option
    results.sort((a, b) => {
      const pa = a.project, pb = b.project;
      switch (sortBy) {
        case 'date':
          return pb.lastUpdated.localeCompare(pa.lastUpdated);
        case 'date-asc':
          return pa.lastUpdated.localeCompare(pb.lastUpdated);
        case 'capacity-desc':
          return (pb.capacity?.value || 0) - (pa.capacity?.value || 0);
        case 'capacity-asc':
          return (pa.capacity?.value || 0) - (pb.capacity?.value || 0);
        case 'county':
          return pa.county.localeCompare(pb.county, 'sv');
        case 'name':
          return pa.title.localeCompare(pb.title, 'sv');
        default:
          return 0;
      }
    });
  }

  return results;
}

/* ============================================================
   ANALYSIS GENERATOR
   ============================================================ */
function daysBetween(d1, d2) {
  return Math.round((new Date(d2) - new Date(d1)) / 86400000);
}

function generateSummary(p) {
  const typeText = {
    vindkraft:   'vindkraftsprojekt',
    solkraft:    'solcellsprojekt',
    vattenkraft: 'vattenkraftsprojekt',
    bioenergi:   'bioenergiprojekt',
    batteri:     'energilagringsprojekt',
  };

  const t = typeText[p.type] || 'energiprojekt';
  const cap = p.capacity ? `${p.capacity.value} ${p.capacity.unit}` : 'ej angiven effekt';

  return `${p.title} är ett ${t} initierat av ${p.applicant.name} i ${p.location}. ` +
    `Projektet avser en installerad kapacitet om ${cap} och har en planerad driftstid om ${p.duration}. ` +
    `Ärendet handläggs av ${p.officer.name} vid ${p.county} länsstyrelses ${p.officer.unit}.`;
}

function generateAIAnalysis(p) {
  const days = daysBetween(p.submitted, p.lastUpdated) || 0;
  const hasPermit = ['Beviljat', 'Avslutat'].includes(p.status);
  const isAppeal = p.status === 'Överklagat';
  const isDevelopment = p.status === 'Under handläggning';

  // ─── Complexity ───
  let complexity, complexityLevel;
  if (p.concerns.length <= 1) {
    complexity = `Ärendet uppvisar låg processuell komplexitet med begränsade miljöaspekter att utreda. Det relativt snäva antalet remissinstanser och avsaknaden av motstridiga intressen talar för ett smidigt ärendeförlopp.`;
    complexityLevel = 'låg';
  } else if (p.concerns.length <= 3) {
    complexity = `Ärendet bedöms ha måttlig komplexitet. Identifierade miljöaspekter – bland annat ${p.concerns[0].toLowerCase()} – kräver noggrann utredning och samordning med berörda remissinstanser. Ärendet är typiskt för ${p.type}projekt av denna skala.`;
    complexityLevel = 'måttlig';
  } else {
    complexity = `Ärendet är av hög komplexitet med ${p.concerns.length} identifierade miljö- och intressekonflikter att hantera. Bland de mest centrala aspekterna märks ${p.concerns[0].toLowerCase()} och ${p.concerns[1].toLowerCase()}. Handläggningstiden kan bli utdragen.`;
    complexityLevel = 'hög';
  }

  // ─── Timeline velocity (anpassad per fas) ───
  let velocity;
  if (hasPermit) {
    velocity = `Ärendet har fått tillstånd. Fokus bör ligga på genomförbarheten samt lönsamheten för projektet givet nuvarande marknadsförhållanden och elnätssituation.`;
  } else if (isDevelopment) {
    if (days < 150) {
      velocity = `Handläggningstakten är hög. Med ${days} dagar sedan inlämning befinner sig ärendet klart under genomsnittlig handläggningstid (ca 18–24 månader). Sannolikheten att erhålla tillstånd bedöms utifrån ärendets nuvarande status.`;
    } else if (days < 400) {
      velocity = `Handläggningstiden om ${days} dagar är inom normalt spann för ${p.type}projekt med denna profil. Processen fortskrider enligt gängse ärendegång.`;
    } else {
      velocity = `Ärendet har pågått under ${days} dagar, vilket överstiger typisk handläggningstid. Det kan indikera komplexa utredningsbehov, kompletteringsbegäran eller överklagandeprocesser.`;
    }
  } else if (isAppeal) {
    velocity = `Ärendet är överklagat efter ${days} dagar. Prövning sker i Mark- och miljödomstolen, vilket typiskt förlänger processen med 6–18 månader.`;
  } else {
    velocity = `Ärendet har pågått under ${days} dagar.`;
  }

  // ─── Capacity context ───
  let scale;
  const val = p.capacity ? p.capacity.value : 0;
  if (p.type === 'vindkraft') {
    if (val >= 200) scale = `Med ${val} ${p.capacity.unit} installerad effekt klassificeras projektet som storskaligt nationellt intresse. Projektet kan ensamt täcka el-behovet för tiotusentals hushåll och har strategisk betydelse för Sveriges energiomställning.`;
    else if (val >= 50) scale = `Projektets effekt om ${val} MW är representativt för ett regionalt signifikant vindkraftsprojekt. Det bidrar märkbart till länets förnybara produktionskapacitet.`;
    else scale = `Med ${val} MW är projektet ett medelstort ${p.type}projekt, vanligt förekommande i prövningsprocessen hos länsstyrelserna.`;
  } else if (p.type === 'solkraft') {
    if (val >= 50) scale = `En solpark om ${val} MW överstiger klart gränsen för tillståndsplikt och kräver fullständig miljöprövning. Projektet tillhör de mer storskaliga solcellssatsningarna i Sverige.`;
    else scale = `Solparken om ${val} MW är ett medelstort projekt men kräver ändå fullständig tillståndsprövning.`;
  } else {
    scale = `Projektet med en kapacitet om ${val} ${p.capacity ? p.capacity.unit : ''} kräver en heltäckande miljökonsekvensbedömning i enlighet med Miljöbalken.`;
  }

  // ─── Outcome prediction ───
  let prediction, confLevel, confPct;
  if (p.status === 'Beviljat' || p.status === 'Avslutat') {
    prediction = null;
    confLevel = null;
    confPct = null;
  } else if (p.status === 'Överklagat') {
    prediction = `Ärendet är överklagat. Prövningen sker nu i Mark- och miljödomstolen. Statistiskt fastställs ca 55–65% av länsstyrelsens tillståndsbeslut i högre instans.`;
    confLevel = 'medium'; confPct = 60;
  } else {
    if (p.concerns.length <= 1) {
      prediction = `Givet den låga ärendekomplexiteten och avsaknaden av motstridiga starka intressen bedöms sannolikheten för bifall som hög, förutsatt att utestående kompletteringar är tillfredsställande.`;
      confLevel = 'high'; confPct = 80;
    } else if (p.concerns.length <= 3) {
      prediction = `Med ${p.concerns.length} miljöaspekter att hantera bedöms möjligheten för bifall som måttlig. Utfallet beror i hög grad på hur remissinstansernas synpunkter kan vägas mot projektets nytta.`;
      confLevel = 'medium'; confPct = 55;
    } else {
      prediction = `Den höga komplexiteten och flertalet motstridiga intressen sänker sannolikheten för ett ovillkorat bifall. Det är troligt att villkor eller begränsningar påverkar projektets slutliga utformning.`;
      confLevel = 'low'; confPct = 35;
    }
  }

  // ─── Investment valuation (baserat på skede) ───
  let valuation = '';
  const capMW = p.capacity ? p.capacity.value : 0;
  if (capMW > 0) {
    let estimatedMSEK = 0;
    let valuationNote = '';
    if (p.type === 'vindkraft') {
      estimatedMSEK = Math.round(capMW * 12); // ~12 MSEK/MW for wind
    } else if (p.type === 'solkraft') {
      estimatedMSEK = Math.round(capMW * 7); // ~7 MSEK/MW for solar
    } else {
      estimatedMSEK = Math.round(capMW * 10);
    }

    if (isDevelopment) {
      const discountedVal = Math.round(estimatedMSEK * 0.3);
      valuationNote = `I samrådsfas är projektvärdet begränsat — uppskattningsvis ${discountedVal.toLocaleString('sv-SE')} MSEK (ca 30% av fullt tillståndsvärde) givet osäkerheten kring tillstånd.`;
    } else if (isAppeal) {
      const discountedVal = Math.round(estimatedMSEK * 0.5);
      valuationNote = `Under prövningsfas bedöms projektvärdet till ca ${discountedVal.toLocaleString('sv-SE')} MSEK (50% av fullt värde) — överklagandeprocessen skapar osäkerhet.`;
    } else if (hasPermit) {
      let adjustedVal = estimatedMSEK;
      const isLandWind = getProjectTypeKey(p) === 'onshore';
      const isOffshoreWind = getProjectTypeKey(p) === 'offshore';
      if (isOffshoreWind) adjustedVal = Math.round(estimatedMSEK * 1.3);
      valuationNote = `Med tillstånd och kommunalt godkännande uppskattas investeringsvärdet till ca ${adjustedVal.toLocaleString('sv-SE')} MSEK. ${isLandWind ? 'Landbaserad vindkraft i detta elområde har god lönsamhetspotential.' : isOffshoreWind ? 'Havsbaserade projekt har högre kapitalkostnad men värderas högre.' : ''}`;
    }

    // Simple investment calc based on area's electricity price region
    const annualProdGWh = parseAnnualProduction(p);
    if (annualProdGWh > 0 && hasPermit) {
      const annualRevMSEK = Math.round(annualProdGWh * 0.5); // ~500 SEK/MWh average
      valuationNote += ` Enkel investeringskalkyl: ca ${annualRevMSEK.toLocaleString('sv-SE')} MSEK/år i intäkter vid genomsnittligt elpris.`;
    }

    if (valuationNote) {
      valuation = `<p class="analysis-p"><strong>Investeringsvärdering:</strong> ${valuationNote}</p>`;
    }
  }

  // ─── Elnätsanslutning ───
  let gridConnection = '';
  const gridInfo = estimateGridConnection(p);
  if (gridInfo) {
    gridConnection = `<p class="analysis-p"><strong>Elnätsanslutning:</strong> ${gridInfo}</p>`;
  }

  // ─── Assemble HTML ───
  let html = `
    <div class="analysis-paragraphs">
      <p class="analysis-p">${complexity}</p>
      <p class="analysis-p">${velocity}</p>
      <p class="analysis-p">${scale}</p>
      ${valuation}
      ${gridConnection}
    </div>
  `;

  if (prediction) {
    html += `
      <div class="confidence-block">
        <div class="confidence-label">
          <span class="confidence-text">Datakomplettering (hur mycket information finns tillgänglig)</span>
          <span class="confidence-pct">${confPct}%</span>
        </div>
        <div class="confidence-track">
          <div class="confidence-fill conf-${confLevel}" style="width: ${confPct}%"></div>
        </div>
        <p class="analysis-p" style="margin-top: 0.75rem; font-size: 0.76rem;">${prediction}</p>
      </div>
    `;
  } else {
    const statusNote = p.status === 'Beviljat'
      ? `Länsstyrelsen har beslutat att bevilja tillstånd för projektet. Beslutet kan ha överklagats till Mark- och miljödomstolen – kontrollera diariet för fullständig ärendehistorik.`
      : `Ärendet är avslutat. Se fullständig ärendeakt hos Länsstyrelsen ${p.county}.`;
    html += `<p class="analysis-p" style="margin-top: 0.75rem;">${statusNote}</p>`;
  }

  return html;
}

/* ============================================================
   PRODUCTION & GRID HELPERS
   ============================================================ */
function parseAnnualProduction(p) {
  // Extract annual production from keyFacts like "Beräknad årsproduktion 180 GWh"
  for (const f of (p.keyFacts || [])) {
    const m = f.match(/årsproduktion\s+([\d\s,.]+)\s*GWh/i);
    if (m) return parseFloat(m[1].replace(/\s/g, '').replace(',', '.'));
  }
  return 0;
}

function estimateGridConnection(p) {
  // Map counties to typical grid connection points
  const gridStations = {
    'Norrbotten': 'Luleå/Boden (400 kV)',
    'Västerbotten': 'Umeå/Stornorrfors (220 kV)',
    'Jämtland': 'Midskog/Järpströmmen (400 kV)',
    'Västernorrland': 'Sollefteå/Kramfors (220 kV)',
    'Gävleborg': 'Sandviken/Ockelbo (130 kV)',
    'Dalarna': 'Borlänge/Tandö (400 kV)',
    'Värmland': 'Borgvik/Charlottenberg (130 kV)',
    'Uppsala': 'Uppsala norra (130 kV)',
    'Västmanland': 'Hallstahammar (130 kV)',
    'Stockholm': 'Beckomberga/Bredäng (400 kV)',
    'Södermanland': 'Kolbäck (130 kV)',
    'Östergötland': 'Kimstad/Norrköping (400 kV)',
    'Jönköping': 'Jönköping (130 kV)',
    'Kronoberg': 'Alvesta (130 kV)',
    'Kalmar': 'Oskarshamn/Simpevarp (400 kV)',
    'Gotlands': 'Ygne (130 kV / HVDC)',
    'Blekinge': 'Karlshamn (400 kV)',
    'Skåne': 'Hurva/Sege (400 kV)',
    'Halland': 'Halmstad/Breared (400 kV)',
    'Västra Götaland': 'Göteborg/Stenkullen (400 kV)',
    'Örebro': 'Örebro/Karlslund (130 kV)',
  };

  const station = gridStations[p.county];
  if (!station) return null;

  const capMW = p.capacity ? p.capacity.value : 0;
  let sizeNote = '';
  if (capMW >= 100) sizeNote = `Med ${capMW} MW krävs sannolikt anslutning till regionnätet eller stamnätet.`;
  else if (capMW >= 10) sizeNote = `Med ${capMW} MW ansluts projektet troligen till regionnätet.`;
  else sizeNote = `Med ${capMW} MW kan projektet anslutas till lokalnätet.`;

  return `Närmaste rimliga anslutningspunkt bedöms vara ${station} i ${p.county} län. ${sizeNote}`;
}

/* ============================================================
   HELPERS
   ============================================================ */
function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
}

function statusClass(s) {
  const map = {
    'Under handläggning': 'status-handlaggning',
    'Beviljat':           'status-beviljat',
    'Avslaget':           'status-avslag',
    'Överklagat':         'status-overklagat',
    'Avslutat':           'status-avslutat',
  };
  return map[s] || 'status-handlaggning';
}

function typeLabel(typeOrProject) {
  // Accept either a type string or a project object
  const map = {
    offshore:    'Vind offshore',
    onshore:     'Vind onshore',
    vindkraft:   'Vindkraft',
    solkraft:    'Solkraft',
    vattenkraft: 'Vattenkraft',
    bioenergi:   'Bioenergi',
    batteri:     'Energilagring',
  };
  if (typeof typeOrProject === 'object' && typeOrProject !== null) {
    const key = getProjectTypeKey(typeOrProject);
    return map[key] || map[typeOrProject.type] || typeOrProject.type;
  }
  return map[typeOrProject] || typeOrProject;
}

/* ============================================================
   RENDERERS
   ============================================================ */
function renderResultCard(r, isActive) {
  const { project: p, score, maxScore } = r;
  const hasQuery = state.query.length > 1;
  const relPct = hasQuery && maxScore > 0
    ? Math.round(Math.min(100, (score / maxScore) * 100))
    : null;

  const li = document.createElement('li');
  li.className = 'result-card' + (isActive ? ' active' : '');
  li.setAttribute('data-id', p.id);
  li.setAttribute('role', 'option');
  li.setAttribute('aria-selected', isActive ? 'true' : 'false');
  li.style.animationDelay = `${Math.min(r._index * 0.04, 0.4)}s`;

  li.innerHTML = `
    <div class="card-top">
      <span class="type-dot ${getProjectTypeKey(p)}"></span>
      <span class="type-label">${typeLabel(p)}</span>
      <span class="card-status ${statusClass(p.status)}">${p.status}</span>
    </div>
    <div class="card-title">${p.title}</div>
    <div class="card-meta">${p.applicant.name} · ${p.municipality}</div>
    <div class="card-county">${p.county} län · ${p.capacity ? p.capacity.value + ' ' + p.capacity.unit : ''}</div>
    ${relPct !== null ? `
    <div class="relevance-row">
      <div class="rel-bar-track">
        <div class="rel-bar-fill" style="width: ${relPct}%"></div>
      </div>
      <span class="rel-label">${relPct}% träff</span>
    </div>` : ''}
  `;

  return li;
}

function renderResultsList() {
  const list = document.getElementById('resultsList');
  const countEl = document.getElementById('resultsCount');
  const results = state.results;
  const hasQuery = state.query.length > 1;

  countEl.textContent = results.length === 0
    ? 'Inga träffar'
    : `${results.length} projekt${hasQuery ? ' hittade' : ''}`;

  if (results.length === 0) {
    list.innerHTML = `
      <div class="no-results">
        <h3>Inga projekt hittades</h3>
        <p>Prova ett annat sökord, t.ex. "vindkraft", "Dalarna" eller ett handläggarnamn.</p>
      </div>`;
    return;
  }

  // Rebuild list using document fragment (fast)
  const frag = document.createDocumentFragment();
  results.forEach((r, i) => {
    r._index = i;
    const el = renderResultCard(r, r.project.id === state.selectedId);
    el.addEventListener('click', () => selectProject(r.project.id));
    frag.appendChild(el);
  });

  list.innerHTML = '';
  list.appendChild(frag);
}

function renderDetailPanel(id) {
  const result = state.results.find(r => r.project.id === id);
  if (!result) return;
  const p = result.project;

  document.getElementById('detailEmpty').classList.add('hidden');
  const panel = document.getElementById('detailPanel');
  panel.classList.remove('hidden');

  const isActive = ['Under handläggning', 'Överklagat'].includes(p.status);

  // Build timeline HTML
  const timelineHTML = p.timeline.map((t, i) => {
    const isLast = i === p.timeline.length - 1;
    return `
      <div class="timeline-item">
        <div class="timeline-dot ${isLast && isActive ? 'active' : ''}"></div>
        <div class="timeline-content">
          <div class="timeline-date">${formatDate(t.date)}</div>
          <div class="timeline-event">${t.event}</div>
        </div>
      </div>
    `;
  }).join('');

  // Key facts HTML
  const factsHTML = p.keyFacts.map(f => `
    <div class="fact-item">
      <div class="fact-icon">✓</div>
      <span>${f}</span>
    </div>
  `).join('');

  // Concerns HTML
  const concernsHTML = p.concerns.length
    ? p.concerns.map(c => `
      <div class="concern-item">
        <div class="concern-icon">!</div>
        <span>${c}</span>
      </div>
    `).join('')
    : '<p style="font-size:0.78rem;color:var(--text-3)">Inga anmärkningar registrerade.</p>';

  // Tags HTML
  const tagsHTML = p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

  // Metrics
  const cap = p.capacity ? `${p.capacity.value} ${p.capacity.unit}` : '—';
  const annualProd = parseAnnualProduction(p);
  const capProdLabel = annualProd > 0 ? 'Kapacitet / Årlig produktion' : 'Kapacitet';
  const capProdValue = annualProd > 0 ? `${cap} / ${annualProd} GWh` : cap;
  const area = p.area != null ? `${p.area.toLocaleString('sv-SE')} ha` : '—';
  const inv  = p.investmentMSEK != null ? `${p.investmentMSEK.toLocaleString('sv-SE')} MSEK` : 'Ej angiven';
  const dur  = p.duration || '—';

  // Fas-taggar
  const techTag = typeLabel(p);
  const phaseTag = p.status;

  panel.innerHTML = `
    <!-- Header with fas-taggar -->
    <div class="dp-header">
      <div class="dp-header-top">
        <span class="dp-type-badge ${getProjectTypeKey(p)}">${techTag}</span>
        <span class="dp-status-badge card-status ${statusClass(p.status)}">${phaseTag}</span>
      </div>
      <h1 class="dp-title">${p.title}</h1>
      <div class="dp-subtitle">${p.location} · ${p.county} län</div>
      <div class="dp-id">${p.id}</div>
    </div>

    <!-- Metrics strip -->
    <div class="metrics-strip">
      <div class="metric-card">
        <div class="metric-label">${capProdLabel}</div>
        <div class="metric-value">${capProdValue}</div>
        <div class="metric-unit">installerad effekt${annualProd > 0 ? ' / beräknad' : ''}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Areal</div>
        <div class="metric-value">${area}</div>
        <div class="metric-unit">projektyta</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Investering</div>
        <div class="metric-value">${inv}</div>
        <div class="metric-unit">uppskattad</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Driftstid</div>
        <div class="metric-value">${dur}</div>
        <div class="metric-unit">planerad</div>
      </div>
    </div>

    <!-- Sökande info (Handläggning borttagen — sällan ifylld) -->
    <div class="dp-section">
      <div class="dp-section-title">Sökande</div>
      <div class="dp-info-grid">
        <div class="dp-info-box">
          <div class="dp-info-row">
            <span class="dp-info-key">Företag</span>
            <span class="dp-info-val">${p.applicant.name}</span>
          </div>
          <div class="dp-info-row">
            <span class="dp-info-key">Org.nr.</span>
            <span class="dp-info-val">${p.applicant.orgNr}</span>
          </div>
          <div class="dp-info-row">
            <span class="dp-info-key">Kontakt</span>
            <span class="dp-info-val">${p.applicant.contact}</span>
          </div>
          <div class="dp-info-row">
            <span class="dp-info-key">Inlämnad</span>
            <span class="dp-info-val">${formatDate(p.submitted)}</span>
          </div>
          <div class="dp-info-row">
            <span class="dp-info-key">Länsstyrelse</span>
            <span class="dp-info-val">${p.county} läns</span>
          </div>
          <div class="dp-info-row">
            <span class="dp-info-key">Senast uppdaterat</span>
            <span class="dp-info-val">${formatDate(p.lastUpdated)}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="dp-section">
      <div class="dp-section-title">Ärendehistorik</div>
      <div class="timeline">${timelineHTML}</div>
    </div>

    <!-- Diarium (expandable) -->
    <div class="dp-section dp-diarium">
      <button class="diarium-toggle" onclick="toggleDiarium(this)" data-project-id="${p.id}" data-county="${p.county}" data-title="${p.title}">
        <svg class="diarium-toggle-icon" width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg>
        <span>Handlingar & diarieinformation</span>
        <span class="diarium-badge" id="diariumBadge"></span>
        <svg class="diarium-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="diarium-body hidden" id="diariumBody">
        <div id="diariumContent">
          <div class="diarium-loading">
            <span class="diarium-spinner"></span>
            Laddar diarieinformation...
          </div>
        </div>
      </div>
    </div>

    <!-- Key facts -->
    <div class="dp-section">
      <div class="dp-section-title">Nyckeltal & Fakta</div>
      <div class="facts-list">${factsHTML}</div>
    </div>

    <!-- Concerns -->
    <div class="dp-section">
      <div class="dp-section-title">Identifierade miljö- och intresseaspekter</div>
      <div class="concerns-list">${concernsHTML}</div>
    </div>

    <!-- AI Analysis -->
    <div class="dp-section dp-analysis">
      <div class="analysis-label">
        <span class="analysis-pulse"></span>
        Systemanalys · Automatisk bedömning
      </div>
      ${generateAIAnalysis(p)}
    </div>

    <!-- Tags -->
    <div class="dp-section">
      <div class="dp-section-title">Taggar</div>
      <div class="tag-list">${tagsHTML}</div>
    </div>

    <!-- Source links -->
    <div class="dp-section dp-sources">
      <div class="dp-section-title">Källor</div>
      <div class="source-links">
        <a class="source-link" href="${p.vbkUrl || 'https://vbk.lansstyrelsen.se/'}" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h4a.5.5 0 0 1 0 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-4a.5.5 0 0 1-.5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" transform="rotate(45,8,8)"/><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H8.136a.5.5 0 0 0 .5-.5z"/></svg>
          Öppna Vindbrukskollen
        </a>
        ${p.sourceUrl && p.sourceUrl !== p.vbkUrl ? `
        <a class="source-link source-link-raw" href="${p.sourceUrl}" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg>
          Visa rådata (ArcGIS REST API)
        </a>` : ''}
      </div>
    </div>
  `;

  // Scroll panel to top
  document.getElementById('detailCol').scrollTop = 0;
}

function renderDetailEmpty() {
  document.getElementById('detailEmpty').classList.remove('hidden');
  document.getElementById('detailPanel').classList.add('hidden');
}

/* ============================================================
   SETTINGS
   ============================================================ */
function getSettings() {
  return JSON.parse(localStorage.getItem('energiarenden-settings') || '{}');
}
function saveSettings() {
  const settings = {
    email: document.getElementById('settingsEmail').value.trim(),
    name: document.getElementById('settingsName').value.trim(),
  };
  localStorage.setItem('energiarenden-settings', JSON.stringify(settings));
  const btn = document.querySelector('.settings-save');
  btn.textContent = 'Sparat!';
  setTimeout(() => { btn.textContent = 'Spara inställningar'; }, 1500);
}
function toggleSettings() {
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  const isOpen = !panel.classList.contains('hidden');
  panel.classList.toggle('hidden', isOpen);
  overlay.classList.toggle('hidden', isOpen);
  if (!isOpen) {
    const s = getSettings();
    document.getElementById('settingsEmail').value = s.email || '';
    document.getElementById('settingsName').value = s.name || '';
  }
}

/* ============================================================
   BEGÄR HANDLING (Request Document)
   ============================================================ */
// Begär handling — skickar email via Google Apps Script (gratis, från din Gmail)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxmkZwXdfDNJEFWp78iNkqJCPsYyr81Qz8t4wQe23OpPQ5e379fVpbL064wH9V4Le6csw/exec';

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.di-req-btn');
  if (!btn) return;
  e.preventDefault();

  const settings = getSettings();
  if (!settings.email) {
    toggleSettings();
    setTimeout(() => document.getElementById('settingsEmail')?.focus(), 100);
    return;
  }

  btn.classList.add('di-req-loading');
  const origText = btn.textContent;
  btn.textContent = '...';

  const d = btn.dataset;
  const to = settings.email; // test mode: send to self
  const subject = 'Begaran om allman handling - ' + (d.dnr || '') + ' - ' + (d.doc || '');
  const body = [
    'Hej,',
    '',
    'Jag onskar ta del av handling ' + d.doc + ' i arende ' + d.dnr + (d.case ? ' (' + d.case.substring(0, 120) + ')' : '') + '.',
    '',
    d.title ? 'Handlingens rubrik: ' + d.title : '',
    '',
    'Vanligen skicka handlingen till ' + settings.email + '.',
    '',
    'Med vanlig halsning,',
    settings.name || settings.email,
  ].filter(Boolean).join('\n');

  try {
    // POST to Google Apps Script — sends email via Gmail
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script doesn't support CORS, but request still goes through
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ to, subject, body }),
    });
    // With no-cors we can't read response, but email is sent
    btn.textContent = 'Skickat!';
    btn.classList.remove('di-req-loading');
    btn.classList.add('di-req-sent');
    setTimeout(() => { btn.textContent = origText; btn.classList.remove('di-req-sent'); }, 4000);
  } catch {
    btn.textContent = 'Fel';
    btn.classList.remove('di-req-loading');
    setTimeout(() => { btn.textContent = origText; }, 2000);
  }
});

/* ============================================================
   DIARIUM LOADER
   ============================================================ */
function toggleDiarium(btn) {
  const body = document.getElementById('diariumBody');
  if (!body) return;
  const isHidden = body.classList.toggle('hidden');
  btn.classList.toggle('open', !isHidden);

  if (!isHidden && !body.dataset.loaded) {
    body.dataset.loaded = '1';
    loadDiariumForProject(btn.dataset.projectId, btn.dataset.county, btn.dataset.title);
  }
}


async function loadDiariumForProject(projectId, county, title) {
  const container = document.getElementById('diariumContent');
  if (!container) return;

  const project = ALL_PROJECTS.find(p => p.id === projectId);
  if (project && project.diarium) {
    const d = project.diarium;
    renderDiariumData(container, {
      ok: true,
      overview: { diarienummer: d.dnr, status: d.status },
      documents: d.documents || [],
      documentCount: d.documentCount || 0,
      url: d.url,
    });
    updateDiariumBadge(d.documentCount);
    return;
  }

  // No diarium data embedded
  container.innerHTML = `
    <div class="diarium-empty">
      <p>Ingen diariedata.</p>
      <a class="diarium-open-link" href="https://diarium.lansstyrelsen.se/" target="_blank" rel="noopener">
        Sök manuellt i diariet →
      </a>
    </div>`;
}

function updateDiariumBadge(count) {
  const badge = document.getElementById('diariumBadge');
  if (badge && count > 0) {
    badge.textContent = `${count} handlingar`;
    badge.style.display = 'inline';
  }
}

function renderDiariumData(container, data) {
  const ov = data.overview || {};
  const docs = data.documents || [];

  // Overview: only show known string fields
  const fields = [
    ['diarienummer', 'Diarienummer'],
    ['dnr', 'Diarienummer'],
    ['arendemening', 'Ärende'],
    ['title', 'Ärende'],
    ['status', 'Status'],
    ['county', 'Län'],
    ['kommun', 'Kommun'],
    ['sokande', 'Sökande'],
    ['inkommet', 'Inkommet'],
    ['beslutsdatum', 'Beslutsdatum'],
    ['diarium', 'Diarium'],
    ['organisationsenhet', 'Org.enhet'],
    ['arendetyp', 'Ärendetyp'],
  ];
  const seen = new Set();
  const overviewRows = fields
    .filter(([k]) => {
      const v = ov[k];
      if (!v || typeof v !== 'string' || v === '—' || v === 'Personuppgift') return false;
      const label = k === 'dnr' ? 'diarienummer' : k === 'title' ? 'arendemening' : k;
      if (seen.has(label)) return false;
      seen.add(label);
      return true;
    })
    .map(([k, label]) => `
      <div class="di-field">
        <span class="di-label">${label}</span>
        <span class="di-value">${ov[k]}</span>
      </div>`)
    .join('');

  // Status pill
  const statusMap = { 'Handläggning': 'di-status-active', 'Beslutat': 'di-status-decided', 'Avslutat': 'di-status-closed' };
  const statusClass = statusMap[ov.status] || '';

  // Documents: show ALL
  const docsHTML = docs.length > 0
    ? docs.map((d, i) => {
        const isSecret = !d.title || d.title === 'Sekretessmarkerad';
        const dnr = ov.diarienummer || ov.dnr || '';
        const caseTitle = ov.arendemening || ov.title || '';
        const cty = ov.county || '';
        const esc = s => (s||'').replace(/"/g, '&quot;');
        return `
          <div class="di-doc ${isSecret ? 'di-doc-secret' : ''}">
            <span class="di-doc-nr">${d.number?.split('-').pop() || (i+1)}</span>
            <div class="di-doc-body">
              <span class="di-doc-title">${isSecret ? 'Sekretessmarkerad handling' : d.title}</span>
              ${d.sender && d.sender !== 'Sekretessmarkerad' && d.sender !== 'Personuppgift' ? `<span class="di-doc-sender">${d.sender}</span>` : ''}
            </div>
            <span class="di-doc-date">${d.date || ''}</span>
            ${!isSecret ? `<button class="di-req-btn" data-doc="${esc(d.number)}" data-title="${esc(d.title)}" data-dnr="${esc(dnr)}" data-case="${esc(caseTitle)}" data-county="${esc(cty)}">Begär</button>` : ''}
          </div>`;
      }).join('')
    : '<p class="di-empty">Inga handlingar tillgängliga.</p>';

  container.innerHTML = `
    <div class="di-overview">
      ${overviewRows}
    </div>
    <div class="di-docs-section">
      <div class="di-docs-header">
        <span>Alla handlingar</span>
        <span class="di-docs-count">${docs.length}</span>
      </div>
      <div class="di-docs-list">${docsHTML}</div>
    </div>
    ${data.url ? `
    <a class="di-ext-link" href="${data.url}" target="_blank" rel="noopener">
      Öppna i diariet →
    </a>` : ''}`;
}

/* ============================================================
   ACTIONS
   ============================================================ */
function selectProject(id) {
  state.selectedId = id;

  // Update active card
  document.querySelectorAll('.result-card').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });

  renderDetailPanel(id);
}

function applySearch() {
  state.results = search(state.query);
  renderResultsList();
  updateFilterBadge();
  updateFilterResultCount();

  // Re-render detail if selected project no longer in results
  if (state.selectedId) {
    const stillVisible = state.results.find(r => r.project.id === state.selectedId);
    if (!stillVisible) {
      state.selectedId = null;
      renderDetailEmpty();
    }
  }
}

function countActiveFilters() {
  let n = 0;
  if (!state.activeTypes.has('alla')) n++;
  if (state.capMin !== null) n++;
  if (state.capMax !== null) n++;
  if (state.county) n++;
  if (state.status) n++;
  return n;
}

function updateFilterBadge() {
  const n = countActiveFilters();
  const badge = document.getElementById('filterBadge');
  if (n > 0) {
    badge.textContent = n;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function updateFilterResultCount() {
  const el = document.getElementById('filterResultCount');
  if (el) el.textContent = `${state.results.length} projekt`;
}

/* ============================================================
   EVENT HANDLERS
   ============================================================ */

// Search input with debounce
let debounceTimer;
document.getElementById('searchInput').addEventListener('input', e => {
  state.query = e.target.value;
  document.getElementById('clearBtn').classList.toggle('hidden', state.query.length === 0);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(applySearch, 120);
});

// Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  state.query = '';
  document.getElementById('clearBtn').classList.add('hidden');
  applySearch();
});

// ── Filter toggle ──
document.getElementById('filterToggle').addEventListener('click', () => {
  const panel = document.getElementById('filterPanel');
  const btn = document.getElementById('filterToggle');
  panel.classList.toggle('hidden');
  btn.classList.toggle('open');
});

// ── Energityp checkboxes (multi-select like Hemnet) ──
document.getElementById('typeGrid').addEventListener('click', e => {
  // Ignore clicks from the checkbox itself — the label click already handles it
  if (e.target.tagName === 'INPUT') return;
  const label = e.target.closest('.type-option');
  if (!label) return;
  e.preventDefault();
  const type = label.dataset.type;

  if (type === 'alla') {
    // Reset all to "Alla"
    state.activeTypes = new Set(['alla']);
    document.querySelectorAll('.type-option').forEach(el => {
      el.classList.toggle('active', el.dataset.type === 'alla');
      el.querySelector('input').checked = el.dataset.type === 'alla';
    });
  } else {
    // Toggle this type
    const allaEl = document.querySelector('.type-option[data-type="alla"]');
    allaEl.classList.remove('active');
    allaEl.querySelector('input').checked = false;
    state.activeTypes.delete('alla');

    if (state.activeTypes.has(type)) {
      state.activeTypes.delete(type);
      label.classList.remove('active');
      label.querySelector('input').checked = false;
    } else {
      state.activeTypes.add(type);
      label.classList.add('active');
      label.querySelector('input').checked = true;
    }

    // If nothing selected, revert to "alla"
    if (state.activeTypes.size === 0) {
      state.activeTypes.add('alla');
      allaEl.classList.add('active');
      allaEl.querySelector('input').checked = true;
    }
  }
  applySearch();
});

// ── Capacity min/max ──
document.getElementById('capMin').addEventListener('change', e => {
  state.capMin = e.target.value ? parseFloat(e.target.value) : null;
  applySearch();
});
document.getElementById('capMax').addEventListener('change', e => {
  state.capMax = e.target.value ? parseFloat(e.target.value) : null;
  applySearch();
});

// ── County dropdown ──
document.getElementById('countyFilter').addEventListener('change', e => {
  state.county = e.target.value;
  applySearch();
});

// ── Status dropdown ──
document.getElementById('statusFilter').addEventListener('change', e => {
  state.status = e.target.value;
  applySearch();
});

// ── Sort dropdown ──
document.getElementById('sortSelect').addEventListener('change', e => {
  state.sortBy = e.target.value;
  applySearch();
});

// ── Reset filters ──
document.getElementById('filterReset').addEventListener('click', () => {
  state.activeTypes = new Set(['alla']);
  state.capMin = null;
  state.capMax = null;
  state.county = '';
  state.status = '';

  // Reset UI
  document.querySelectorAll('.type-option').forEach(el => {
    el.classList.toggle('active', el.dataset.type === 'alla');
    el.querySelector('input').checked = el.dataset.type === 'alla';
  });
  document.getElementById('capMin').value = '';
  document.getElementById('capMax').value = '';
  document.getElementById('countyFilter').value = '';
  document.getElementById('statusFilter').value = '';

  applySearch();
});

/* ============================================================
   NAV COUNTERS
   ============================================================ */
function updateNavCounters() {
  const total  = ALL_PROJECTS.length;
  const active = ALL_PROJECTS.filter(p => p.status === 'Under handläggning').length;
  document.getElementById('navTotal').textContent  = total;
  document.getElementById('navActive').textContent = active;
}

/* ============================================================
   INIT
   ============================================================ */
/* ── Live data status banner ── */
function setLiveStatus(statusKey) {
  const el = document.getElementById('liveStatus');
  if (!el) return;
  const msgs = {
    loading: '<span class="ls-dot ls-spin"></span> Hämtar live-data från Vindbrukskollen…',
    live:    '<span class="ls-dot ls-green"></span> <strong id="liveCount"></strong> projekt live från Vindbrukskollen (Energimyndigheten) · Uppdateras varje timme',
    local:   '<span class="ls-dot ls-grey"></span> Visar lokal databas — live-data laddas på Vercel',
  };
  el.innerHTML = msgs[statusKey] || '';
}

function populateCountyDropdown() {
  const counties = [...new Set(ALL_PROJECTS.map(p => p.county).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'sv'));
  const sel = document.getElementById('countyFilter');
  // Keep first "Alla län" option
  sel.innerHTML = '<option value="">Alla län</option>';
  for (const c of counties) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  }
}


async function init() {
  // Initial empty render
  populateCountyDropdown();
  applySearch();
  renderDetailEmpty();
  updateNavCounters();

  setLiveStatus('loading');
  try {
    const projects = await fetchProjects();
    if (projects.length > 0) {
      projects.forEach(p => { p._index = buildSearchIndex(p); p.typLabel = typeLabel(p); });
      ALL_PROJECTS = projects;
      populateCountyDropdown();
      applySearch();
      updateNavCounters();
      setLiveStatus('live');
      const cnt = document.getElementById('liveCount');
      if (cnt) cnt.textContent = projects.length;
    } else {
      setLiveStatus('local');
    }
  } catch (_) {
    setLiveStatus('local');
  }
}

document.addEventListener('DOMContentLoaded', init);
