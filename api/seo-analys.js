/**
 * /api/seo-analys
 * Tar emot Tally webhook → PageSpeed + konkurrent-scraping → Claude 2-stegs-analys → rapport
 */

const { callClaude } = require('./lib/claude');
const { sendEmail } = require('./lib/email');

// --- Helpers ---

async function getPageSpeed(url) {
  try {
    const encoded = encodeURIComponent(url);
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encoded}&strategy=mobile`);
    const data = await res.json();
    const cats = data.lighthouseResult?.categories;
    if (!cats) return 'Kunde inte hämta PageSpeed-data';
    return `Performance: ${Math.round((cats.performance?.score || 0) * 100)}/100, SEO: ${Math.round((cats.seo?.score || 0) * 100)}/100, Accessibility: ${Math.round((cats.accessibility?.score || 0) * 100)}/100`;
  } catch {
    return 'PageSpeed-hämtning misslyckades';
  }
}

async function scrapeCompetitor(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'saknas';
    const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1] || 'saknas';
    const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1] || 'saknas';
    return `- Title: ${title}\n- Meta desc: ${desc}\n- H1: ${h1}`;
  } catch {
    return 'Kunde inte hämta konkurrentdata';
  }
}

function validateReport(report) {
  const modules = ['MODUL 1', 'MODUL 2', 'MODUL 3', 'MODUL 4', 'MODUL 5', 'MODUL 6'];
  const missing = modules.filter(m => !report.includes(m));
  const wordCount = report.split(' ').length;

  return {
    allModulesPresent: missing.length === 0,
    missingModules: missing,
    wordCount,
    hasKeywordTable: report.includes('|'),
    hasActionPlan: /[Kk]ritiskt/.test(report),
    approved: missing.length === 0 && wordCount > 500
  };
}

// --- Handler ---

module.exports = async (req, res) => {
  const allowedOrigins = ['https://weckmedia.com', 'https://www.weckmedia.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const secret = process.env.SEO_API_SECRET;
  if (!secret || req.headers['x-api-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const body = req.body?.data?.fields
      ? Object.fromEntries(req.body.data.fields.map(f => [f.key || f.label, f.value]))
      : req.body;

    const formData = {
      foretagsnamn: body.foretagsnamn || body.företagsnamn || '',
      bransch: body.bransch || '',
      stad: body.stad || '',
      tjanster: body.tjanster || body.tjänster || '',
      malgrupp: body.malgrupp || body.målgrupp || '',
      mal: body.mal || body.mål || '',
      sokord: body.sokord || body.sökord || '',
      konkurrenter: body.konkurrenter || [],
      url: body.url || ''
    };

    // 1. Hämta data parallellt
    const [pagespeedSummary, konkurentData] = await Promise.all([
      formData.url ? getPageSpeed(formData.url) : Promise.resolve('Ingen URL angiven'),
      Array.isArray(formData.konkurrenter) && formData.konkurrenter[0]
        ? scrapeCompetitor(formData.konkurrenter[0]).then(d => `Konkurrent 1 (${formData.konkurrenter[0]}):\n${d}`)
        : Promise.resolve('Inga konkurrenter angivna')
    ]);

    // 2. Claude steg 1: Analysera
    const analysis = await callClaude(
      `Du är en SEO-expert. Analysera följande kunddata och identifiera de viktigaste insikterna. Var specifik och konkret – undvik generella råd.

KUNDDATA:
Företagsnamn: ${formData.foretagsnamn}
Bransch: ${formData.bransch}
Stad: ${formData.stad}
Tjänster: ${JSON.stringify(formData.tjanster)}
Målgrupp: ${formData.malgrupp}
Mål: ${formData.mal}
Sökord kunden tror på: ${JSON.stringify(formData.sokord)}
URL: ${formData.url || 'ingen'}

PAGESPEED-DATA (mobil):
${pagespeedSummary}

KONKURRENTDATA:
${konkurentData}

Leverera en strukturerad analys med:
1. Top 5 kritiska problem/möjligheter du ser
2. 20 sökord rankade efter köpintention (hög/medel/låg) – inkludera stad + tjänst-kombinationer
3. Vad konkurrenterna gör som kunden inte gör
4. 3 snabba vinster som kan ge resultat inom 2 veckor`,
      4000
    );

    // 3. Claude steg 2: Skriv rapport
    const report = await callClaude(
      `Du är en world-class SEO-analytiker. Baserat på analysen nedan, skriv en komplett SEO-rapport på svenska. Var så konkret att kunden kan genomföra varje åtgärd utan att fråga igen.

ANALYS FRÅN STEG 1:
${analysis}

KUNDINFO:
Företagsnamn: ${formData.foretagsnamn}
Stad: ${formData.stad}

SKRIV RAPPORTEN I DETTA FORMAT:

# SEO-rapport: ${formData.foretagsnamn}

## MODUL 1 – TEKNISK AUDIT
[Specifika fynd och åtgärder]

## MODUL 2 – ON-PAGE ANALYS
[Specifika fynd och åtgärder]

## MODUL 3 – KEYWORD-ANALYS
[Tabell med 20 sökord: sökord | intention | volym | konkurrens]

## MODUL 4 – KONKURRENTANALYS
[Vad de gör bättre, content gaps, snabba vinstmöjligheter]

## MODUL 5 – ÅTGÄRDSPLAN
### Kritiskt (1 vecka)
- [Åtgärd]: Vad → Varför → Hur (steg-för-steg) → Förväntat resultat

### Viktigt (1 månad)
- [Åtgärd]: Vad → Varför → Hur → Förväntat resultat

### Long-term (3-6 månader)
- [Åtgärd]: Vad → Varför → Hur → Förväntat resultat

## MODUL 6 – 6-MÅNADERS ROADMAP
| Månad | Fokus | Åtgärder | Förväntat resultat |
|---|---|---|---|`,
      6000
    );

    // 4. Validera
    const quality = validateReport(report);

    // 5. Notifiera Hugo
    await sendEmail(
      'hugo@weckmedia.se',
      `SEO-rapport klar: ${formData.foretagsnamn}`,
      `<h2>SEO-rapport genererad</h2>
      <p><strong>Företag:</strong> ${formData.foretagsnamn}</p>
      <p><strong>Godkänd:</strong> ${quality.approved ? 'Ja' : 'Nej — saknar: ' + quality.missingModules.join(', ')}</p>
      <p><strong>Ord:</strong> ${quality.wordCount}</p>
      <hr>
      <pre style="white-space:pre-wrap;font-size:14px;">${report}</pre>`
    );

    return res.json({
      success: true,
      approved: quality.approved,
      quality,
      report,
      reportLength: report.length
    });
  } catch (err) {
    console.error('SEO-analys fel:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
