/**
 * /api/webb-leverans
 * Tar emot Tally webhook → Claude genererar hemsida → Vercel deploy → email-notis
 */

const { callClaude } = require('./lib/claude');
const { sendEmail } = require('./lib/email');

const LEVEL_CONFIG = {
  one_pager: {
    max_tokens: 16000,
    instruction: `NIVÅ: one_pager
Du ska bygga EN ENDA HTML-fil (index.html) med ALL CSS inline i en <style>-tagg och ALL JS inline i en <script>-tagg.

STRUKTUR (5 sektioner):
1. Hero med H1 som innehåller primärt sökord + stad, kort tagline, CTA-knapp
2. Tjänster/Vad vi erbjuder — kort presentation av varje tjänst med ikoner
3. Om oss / Varför välja oss — förtroendbyggande copy
4. Omdömen / Socialt bevis — 3 fiktiva men realistiska recensioner
5. Kontakt — formulär eller kontaktinfo + Google Maps embed-placeholder

Navigation ska vara sticky med smooth scroll till sektioner.
Mobilmeny med hamburger-ikon.

Leverera EXAKT EN fil: index.html (med inline CSS och JS)
Ingen separat style.css eller script.js.`
  },
  multi: {
    max_tokens: 32000,
    instruction: `NIVÅ: multi
Du ska bygga en flersidig webbplats. Leverera VARJE sida som en separat HTML-fil med inline CSS i <style> och inline JS i <script>.

SIDOR ATT GENERERA:
1. index.html — Startsida med hero, kort tjänsteöversikt, CTA
2. tjanster.html — Detaljerad sida för alla tjänster
3. om-oss.html — Om företaget, historia, värderingar
4. kontakt.html — Kontaktformulär + info + karta

Varje sida ska ha:
- Samma navigation (sticky) med aktiv-markering på rätt sida
- Samma footer med kontaktinfo och snabblänkar
- Konsekvent design/färger

Genera också: sitemap.xml, robots.txt

LEVERERA SÅ HÄR (VIKTIGT — följ exakt detta format):
---FILE: index.html---
(html-innehåll)
---FILE: tjanster.html---
(html-innehåll)
---FILE: om-oss.html---
(html-innehåll)
---FILE: kontakt.html---
(html-innehåll)
---FILE: sitemap.xml---
(xml-innehåll)
---FILE: robots.txt---
(innehåll)`
  },
  premium: {
    max_tokens: 32000,
    instruction: `NIVÅ: premium
Du ska bygga en flersidig premium-webbplats med animationer och genomtänkt design.

SIDOR ATT GENERERA:
1. index.html — Startsida med hero (animerad text eller gradient), tjänsteöversikt, testimonials, CTA
2. tjanster.html — Varje tjänst i eget kort/sektion med hover-effekter
3. om-oss.html — Om företaget med timeline eller steg-för-steg
4. kontakt.html — Snyggt kontaktformulär med validering

PREMIUM-FUNKTIONER (OBLIGATORISKT):
- CSS custom properties (--primary, --secondary, --accent, --bg, --text etc)
- Intersection Observer-animationer: fade-in, slide-up på sektioner vid scroll
- Smooth scroll, prefers-reduced-motion stöd
- Hover-effekter på kort och knappar, gradient-accenter
- Typografi med Google Fonts (välj passande för branschen)
- Performance-optimerad: lazy loading, minimal DOM

Genera också: sitemap.xml, robots.txt

LEVERERA SÅ HÄR (VIKTIGT — följ exakt detta format):
---FILE: index.html---
(html-innehåll)
---FILE: tjanster.html---
(html-innehåll)
---FILE: om-oss.html---
(html-innehåll)
---FILE: kontakt.html---
(html-innehåll)
---FILE: sitemap.xml---
(xml-innehåll)
---FILE: robots.txt---
(innehåll)`
  }
};

const MASTERPROMPT = `Du är en expert på att bygga konverterande webbplatser för svenska småföretag med inbyggd SEO-optimering. Du får strukturerad data från ett kundformulär och levererar produktionsklar kod.

ALLTID INKLUDERA:
- <title>: "[Tjänst] i [Stad] – [Företagsnamn]"
- <meta description>: 150-160 tecken med primärt sökord
- Schema.org LocalBusiness JSON-LD med företagsnamn, stad, telefon, email
- H1 med primärt sökord, hierarkisk H2/H3-struktur
- Alt-texter på alla bilder (använd beskrivande placeholder-alt-texter)
- Mobilanpassad (mobile-first)
- Inga placeholder-texter – generera rimligt, övertygande content på svenska
- Favicon meta-taggar, Open Graph meta-taggar
- Professionell design – INTE generisk "AI-look". Tänk som en dyr designbyrå.
- Moderna CSS-tekniker: grid, flexbox, clamp() för typografi
- Smooth, subtila övergångar
- Genomtänkt whitespace och typografisk hierarki

DESIGNPRINCIPER:
- Undvik generisk look. Varje sajt ska kännas unik och branschanpassad.
- Använd kundens färger genomgående men med god kontrast
- Bilder: använd <img> med src="" och beskrivande alt-text (bilderna läggs in senare)
- Ikoner: använd SVG-ikoner inline eller Unicode-symboler, INTE Font Awesome
- Typografi: välj Google Fonts som passar branschen

Skriv alltid på svenska. Undvik floskler som "välkommen till vår hemsida". Fokusera på kundens problem och din lösning. Var specifik för branschen.`;

// --- Helpers ---

function parseTallyData(body) {
  let data = {};
  if (body.data && body.data.fields) {
    for (const field of body.data.fields) {
      data[field.key || field.label] = field.value;
    }
  } else {
    data = body;
  }

  const parsed = {
    level: (data.level || data.niva || data.paket || 'one_pager').toLowerCase().trim(),
    foretagsnamn: data.foretagsnamn || data.företagsnamn || data.company || '',
    bransch: data.bransch || data.industry || '',
    stad: data.stad || data.city || '',
    tjanster: data.tjanster || data.tjänster || data.services || '',
    malgrupp: data.malgrupp || data.målgrupp || data.target_audience || '',
    ton: data.ton || data.tone || 'professionell',
    kontakt_namn: data.kontakt_namn || data.kontaktperson || data.name || '',
    kontakt_email: data.kontakt_email || data.email || '',
    kontakt_telefon: data.kontakt_telefon || data.telefon || data.phone || '',
    farger: data.farger || data.färger || data.colors || '',
    konkurrenter: data.konkurrenter || data.competitors || '',
    inspirationssajter: data.inspirationssajter || data.inspiration || '',
    befintlig_url: data.befintlig_url || data.url || '',
    extra_info: data.extra_info || data.övrigt || ''
  };

  const projectName = parsed.foretagsnamn
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 50) || 'kund-sajt';

  return { ...parsed, projectName };
}

function buildPrompt(data) {
  const config = LEVEL_CONFIG[data.level] || LEVEL_CONFIG.one_pager;

  return {
    prompt: `${MASTERPROMPT}

${config.instruction}

KUNDDATA:
- Företagsnamn: ${data.foretagsnamn}
- Bransch: ${data.bransch}
- Stad: ${data.stad}
- Tjänster: ${data.tjanster}
- Målgrupp: ${data.malgrupp}
- Ton/känsla: ${data.ton}
- Kontakt namn: ${data.kontakt_namn}
- Kontakt email: ${data.kontakt_email}
- Kontakt telefon: ${data.kontakt_telefon}
- Färger: ${data.farger}
- Konkurrenter: ${data.konkurrenter || 'Ej angivna'}
- Inspirationssajter: ${data.inspirationssajter || 'Ej angivna'}
- Extra info: ${data.extra_info || 'Ingen'}

EFTER ALL KOD, LEVERERA:
1. Keyword-rapport: primärt sökord + 5 sekundära + lokal SEO-strategi
2. SEO-checklista: vad som är implementerat och varför

BÖRJA DIREKT MED KODEN. Ingen inledande text.`,
    max_tokens: config.max_tokens
  };
}

function extractFiles(response, level, projectName) {
  const files = {};

  if (level === 'one_pager') {
    const htmlMatch = response.match(/```html\n([\s\S]*?)```/);
    if (htmlMatch) {
      files['index.html'] = htmlMatch[1].trim();
    } else {
      const rawMatch = response.match(/(<!DOCTYPE[\s\S]*?<\/html>)/i);
      files['index.html'] = rawMatch ? rawMatch[1].trim() : response;
    }
  } else {
    const filePattern = /---FILE:\s*([\w.-]+)---\s*\n([\s\S]*?)(?=---FILE:|$)/g;
    let match;
    while ((match = filePattern.exec(response)) !== null) {
      let content = match[2].trim();
      content = content.replace(/^```\w*\n/, '').replace(/\n```$/, '');
      files[match[1].trim()] = content;
    }

    if (Object.keys(files).length === 0) {
      const blockPattern = /(?:#+\s*)?([\w.-]+)\s*\n```(?:html|xml|txt)?\n([\s\S]*?)```/g;
      while ((match = blockPattern.exec(response)) !== null) {
        files[match[1].trim()] = match[2].trim();
      }
    }

    if (Object.keys(files).length === 0) {
      const htmlMatch = response.match(/```html\n([\s\S]*?)```/);
      files['index.html'] = htmlMatch ? htmlMatch[1].trim() : response;
    }
  }

  if (!files['vercel.json']) {
    files['vercel.json'] = JSON.stringify({ buildCommand: '', outputDirectory: '.' });
  }
  if (!files['robots.txt'] && level !== 'one_pager') {
    files['robots.txt'] = `User-agent: *\nAllow: /\nSitemap: https://${projectName}.vercel.app/sitemap.xml`;
  }

  return files;
}

async function vercelCreateProject(name) {
  const res = await fetch('https://api.vercel.com/v10/projects', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.VERCEL_DEPLOY_TOKEN}`
    },
    body: JSON.stringify({ name, framework: null })
  });
  // Ignorera 409 (redan finns)
  if (!res.ok && res.status !== 409) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Vercel create project: ${err.error?.message || res.status}`);
  }
}

async function vercelDeploy(projectName, files) {
  const vercelFiles = Object.entries(files).map(([file, data]) => ({ file, data }));

  const res = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.VERCEL_DEPLOY_TOKEN}`
    },
    body: JSON.stringify({
      name: projectName,
      files: vercelFiles,
      target: 'production',
      projectSettings: { buildCommand: '', outputDirectory: '.', framework: null }
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Vercel deploy: ${data.error?.message || res.status}`);

  return data.url ? `https://${data.url}` : `https://${projectName}.vercel.app`;
}

// --- Handler ---

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const secret = process.env.WEBB_API_SECRET;
  if (!secret || req.headers['x-api-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 1. Parsa Tally-data
    const data = parseTallyData(req.body);
    const { prompt, max_tokens } = buildPrompt(data);

    // 2. Claude genererar hemsidan
    const response = await callClaude(prompt, max_tokens);

    // 3. Extrahera filer
    const files = extractFiles(response, data.level, data.projectName);
    const fileNames = Object.keys(files);

    // 4. Deploya till Vercel
    await vercelCreateProject(data.projectName);
    const deployUrl = await vercelDeploy(data.projectName, files);
    const prodUrl = `https://${data.projectName}.vercel.app`;

    // 5. Notifiera Hugo
    await sendEmail(
      'hugo@weckmedia.se',
      `Ny webb levererad: ${data.foretagsnamn} (${data.level})`,
      `<h2>Ny webbplats genererad och deployad</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;">Företag:</td><td style="padding:8px;">${data.foretagsnamn}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Nivå:</td><td style="padding:8px;">${data.level}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Bransch:</td><td style="padding:8px;">${data.bransch}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Stad:</td><td style="padding:8px;">${data.stad}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Kund email:</td><td style="padding:8px;">${data.kontakt_email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Filer:</td><td style="padding:8px;">${fileNames.join(', ')}</td></tr>
      </table>
      <p><strong>Preview:</strong> <a href="${deployUrl}">${deployUrl}</a></p>
      <p><strong>Produktion:</strong> <a href="${prodUrl}">${prodUrl}</a></p>`
    );

    // 6. Synka till CRM
    if (process.env.CRM_URL && process.env.SYNC_API_SECRET) {
      await fetch(process.env.CRM_URL + '/api/delivery-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-secret': process.env.SYNC_API_SECRET },
        body: JSON.stringify({ phone: data.kontakt_telefon, company: data.foretagsnamn, url: prodUrl, level: data.level }),
      }).catch(() => {}); // Fail silently — leverans viktigare än CRM-sync
    }

    // 7. Svara till Tally webhook
    return res.json({
      success: true,
      project: data.projectName,
      url: prodUrl,
      level: data.level,
      files: fileNames
    });
  } catch (err) {
    console.error('Webb-leverans fel:', err);

    // Felnotis till Hugo
    await sendEmail(
      'hugo@weckmedia.se',
      'FEL i Webb-leverans',
      `<h2 style="color:red;">Fel i webb-leverans</h2>
      <pre style="background:#f5f5f5;padding:16px;">${err.message}</pre>`
    ).catch(() => {});

    return res.status(500).json({ success: false, error: err.message });
  }
};
