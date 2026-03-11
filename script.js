/* ============================================================
   ENERGIÄRENDEN — Länsstyrelsen Sverige
   Sökdatabas för energiprojekt
   ============================================================ */

/* ============================================================
   DATA — 26 realistiska energiprojekt
   Baserade på Länsstyrelsens ärendeformat
   ============================================================ */
const PROJECTS = [
  {
    id: "LST-W-575-11203-2024",
    title: "Vindkraftpark Norrby",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Dalarnas",
    municipality: "Falun",
    location: "Norrby, nordost om Falun",
    applicant: {
      name: "Eolus Vind AB",
      orgNr: "556549-1997",
      contact: "sofia.lindqvist@eolus.com"
    },
    officer: { name: "Lars Bergström", unit: "Miljöprövningsenheten" },
    submitted: "2024-02-08",
    lastUpdated: "2024-11-14",
    capacity: { value: 72, unit: "MW" },
    turbines: 12,
    area: 580,
    investmentMSEK: 960,
    duration: "25 år",
    description: "Ansökan avser uppförande och drift av en vindkraftpark bestående av 12 vindkraftverk med en sammanlagd installerad effekt om 72 MW i skogsmark nordost om Falun. Parken planeras på höjdpartier i Norrby med goda vindförhållanden och bedömd årsproduktion om 230 GWh, motsvarande elanvändningen för ca 46 000 hushåll. Kabelvägar och intern infrastruktur ingår i ansökan.",
    keyFacts: [
      "12 vindkraftverk á 6 MW vardera",
      "Totalhöjd 220 m, rotordiameter 162 m",
      "Beräknad årsproduktion 230 GWh",
      "Motsvarar el för ca 46 000 hushåll",
      "Driftsättning planerad 2027"
    ],
    concerns: [
      "Påverkan på fågellivet i omgivande skogsmark",
      "Buller vid kringboende bostäder (riktvärde 40 dB(A))",
      "Skuggpåverkan och reflexer",
      "Intrång i renbetesmark – samråd med Sametinget pågår",
      "Påverkan på friluftslivet i området"
    ],
    timeline: [
      { date: "2024-02-08", event: "Ansökan inlämnad till Länsstyrelsen Dalarna" },
      { date: "2024-04-15", event: "Ansökan bedömd som komplett" },
      { date: "2024-06-10", event: "Samrådsredogörelse godkänd" },
      { date: "2024-09-02", event: "Remiss skickad till 12 instanser" },
      { date: "2024-11-14", event: "Yttranden inkomna – beredning pågår" }
    ],
    tags: ["vindkraft", "dalarna", "falun", "norrby", "eolus", "onshore", "skog", "bergström", "lindqvist"]
  },

  {
    id: "LST-I-432-8824-2023",
    title: "Solpark Näsudden",
    type: "solkraft",
    status: "Beviljat",
    county: "Gotlands",
    municipality: "Gotland",
    location: "Näsudden, södra Gotland",
    applicant: {
      name: "Vattenfall AB",
      orgNr: "556036-2138",
      contact: "erik.svensson@vattenfall.com"
    },
    officer: { name: "Karin Andersson", unit: "Prövningsenheten" },
    submitted: "2023-01-20",
    lastUpdated: "2024-08-30",
    capacity: { value: 84, unit: "MW" },
    turbines: null,
    area: 210,
    investmentMSEK: 620,
    duration: "30 år",
    description: "Ansökan avser anläggning av en storskalig solcellspark på Näsudden i södra Gotland. Anläggningen planeras på jordbruksmark med låg produktionspotential och bedöms inte konkurrera med pågående jordbruksverksamhet. Solparken består av bifaciala paneler och beräknas producera 88 GWh per år.",
    keyFacts: [
      "Ca 168 000 solpaneler (bifaciala)",
      "Årsproduktion 88 GWh",
      "Jordbruksmark med låg produktionspotential",
      "Nätanslutning via ny transformatorstation",
      "Tillstånd meddelat 30 aug 2024"
    ],
    concerns: [
      "Påverkan på jordbruksmark",
      "Visuell påverkan på landskapsbilden",
      "Reflexpåverkan för kringboende"
    ],
    timeline: [
      { date: "2023-01-20", event: "Ansökan inlämnad" },
      { date: "2023-03-14", event: "Komplettering inlämnad" },
      { date: "2023-08-22", event: "Remiss genomförd" },
      { date: "2024-03-10", event: "Förhandling hållen" },
      { date: "2024-08-30", event: "Tillstånd meddelat av Länsstyrelsen Gotland" }
    ],
    tags: ["solkraft", "gotland", "näsudden", "vattenfall", "solceller", "jordbruksmark", "andersson", "svensson"]
  },

  {
    id: "LST-N-431-9912-2024",
    title: "Havsbaserad vindkraft Kattegatt Offshore",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Hallands",
    municipality: "Halmstad",
    location: "Kattegatt, 25–40 km utanför Halmstads kust",
    applicant: {
      name: "Arise AB",
      orgNr: "556274-6726",
      contact: "anna.karlsson@arise.se"
    },
    officer: { name: "Magnus Holm", unit: "Miljöprövningsenheten" },
    submitted: "2024-03-18",
    lastUpdated: "2024-10-22",
    capacity: { value: 720, unit: "MW" },
    turbines: 80,
    area: 14500,
    investmentMSEK: 18000,
    duration: "25 år",
    description: "Projekt Kattegatt Offshore avser uppförande av upp till 80 havsbaserade vindkraftverk i Kattegatt, 25–40 km utanför Halmstads kust. Projektet är ett av Sveriges mest storskaliga havsvindsatsningar med en planerad installerad effekt om 720 MW. Miljökonsekvensbeskrivning inkluderar marina habitat, fisk och havsbottenbedömningar.",
    keyFacts: [
      "Upp till 80 havsbaserade vindkraftverk",
      "Installerad effekt 720 MW",
      "Lokalisering 25–40 km från kusten",
      "Årsproduktion ca 2 800 GWh",
      "Nätanslutning via undervattenskabel"
    ],
    concerns: [
      "Påverkan på marina ekosystem och bottenfauna",
      "Påverkan på fiske och fiskerinäringen",
      "Visuell påverkan från land och kust",
      "Störning av sjöfartsleder",
      "Påverkan på Försvarsmaktens övningsområden"
    ],
    timeline: [
      { date: "2024-03-18", event: "Ansökan inlämnad" },
      { date: "2024-05-05", event: "Formellt komplett ansökan bekräftad" },
      { date: "2024-08-12", event: "Utökat samråd inlett" },
      { date: "2024-10-22", event: "Yttranden från Trafikverket Sjöfart inkomna" }
    ],
    tags: ["vindkraft", "halland", "halmstad", "kattegatt", "offshore", "havsbaserad", "arise", "karlsson", "holm", "marin"]
  },

  {
    id: "LST-E-247-7741-2023",
    title: "Solpark Linköping Öst",
    type: "solkraft",
    status: "Beviljat",
    county: "Östergötlands",
    municipality: "Linköping",
    location: "Törnevik, öster om Linköping",
    applicant: {
      name: "OX2 AB",
      orgNr: "556675-7497",
      contact: "per.johansson@ox2.com"
    },
    officer: { name: "Helena Dahl", unit: "Prövningsenheten" },
    submitted: "2023-05-10",
    lastUpdated: "2024-02-29",
    capacity: { value: 45, unit: "MW" },
    turbines: null,
    area: 120,
    investmentMSEK: 340,
    duration: "30 år",
    description: "Solpark Linköping Öst avser etablering av en solcellsanläggning om 45 MW på åkermark öster om Linköping i Törnevi. Projektet kombineras med betesgång för får under driftstiden, vilket bidrar till bibehållet jordbruksbruk av marken. Produktionen ansluts till befintlig elnätsstation.",
    keyFacts: [
      "45 MW installerad effekt",
      "Kombineras med fåroch betesgång",
      "Ca 90 000 solpaneler",
      "Årsproduktion 48 GWh",
      "Tillstånd meddelat februari 2024"
    ],
    concerns: [
      "Omvandling av åkermark",
      "Visuell påverkan på odlingslandskapet"
    ],
    timeline: [
      { date: "2023-05-10", event: "Ansökan inlämnad" },
      { date: "2023-07-20", event: "Komplett ansökan" },
      { date: "2023-11-08", event: "Remissrunda genomförd" },
      { date: "2024-02-29", event: "Tillstånd meddelat" }
    ],
    tags: ["solkraft", "östergötland", "linköping", "ox2", "solceller", "åkermark", "johansson", "dahl"]
  },

  {
    id: "LST-Z-292-4401-2023",
    title: "Indalsälven vattenkraftstation Renovering",
    type: "vattenkraft",
    status: "Under handläggning",
    county: "Jämtlands",
    municipality: "Östersund",
    location: "Indalsälven, Ragunda",
    applicant: {
      name: "E.ON Sverige AB",
      orgNr: "556056-4148",
      contact: "bjorn.lindahl@eon.com"
    },
    officer: { name: "Gunnar Persson", unit: "Vattenverksamhetsenheten" },
    submitted: "2023-07-03",
    lastUpdated: "2024-09-18",
    capacity: { value: 38, unit: "MW" },
    turbines: null,
    area: null,
    investmentMSEK: 450,
    duration: "40 år",
    description: "Ansökan avser modernisering och effektutökning av befintlig vattenkraftstation vid Indalsälven i Ragunda. Renovering inkluderar byte av turbiner och generatorer med ny teknik som ökar installerad effekt från 28 till 38 MW och förbättrar reglerkraft. Miljöanpassningsåtgärder för fiskvandringsvägar ingår.",
    keyFacts: [
      "Effektökning från 28 till 38 MW",
      "Ny fiskvandringslösning – omlöp 480 m",
      "Minskad miljöpåverkan per producerad kWh",
      "Reglerkraft ökar med 35%",
      "Samordnat med Miljöbalken 11 kap"
    ],
    concerns: [
      "Påverkan på fisk och fiskvandring i Indalsälven",
      "Vattendragets ekologiska status",
      "Påverkan på nedströms verksamheter",
      "Sedimenttransport och bottensubstrat"
    ],
    timeline: [
      { date: "2023-07-03", event: "Ansökan inlämnad" },
      { date: "2023-10-14", event: "Kompletteringsföreläggande utskickat" },
      { date: "2024-02-20", event: "Komplettering inlämnad" },
      { date: "2024-06-05", event: "Samråd med berörda parter" },
      { date: "2024-09-18", event: "Remiss till Havs- och vattenmyndigheten" }
    ],
    tags: ["vattenkraft", "jämtland", "östersund", "indalsälven", "ragunda", "eon", "renovering", "lindahl", "persson", "fiskvandringsväg"]
  },

  {
    id: "LST-S-431-6652-2024",
    title: "Vindkraftpark Örå",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Värmlands",
    municipality: "Torsby",
    location: "Örå-skogen, Torsby kommun",
    applicant: {
      name: "Stena Renewable AB",
      orgNr: "556993-1002",
      contact: "malin.eriksson@stena.com"
    },
    officer: { name: "Johan Friberg", unit: "Miljöprövningsenheten" },
    submitted: "2024-01-25",
    lastUpdated: "2024-08-09",
    capacity: { value: 54, unit: "MW" },
    turbines: 9,
    area: 410,
    investmentMSEK: 710,
    duration: "25 år",
    description: "Vindkraftpark Örå planeras i skogsmark i Torsby kommun i norra Värmland. Nio vindkraftverk uppförs på höjdpartier med goda vindförhållanden. Projektet bidrar till Värmlands mål för förnybar energiproduktion och ersätter fossila kraftkällor i regionen.",
    keyFacts: [
      "9 vindkraftverk med totalhöjd 200 m",
      "Installerad effekt 54 MW",
      "Beräknad årsproduktion 165 GWh",
      "Skogsmark med aktivt skogsbruk",
      "Anslutning till befintlig ledning"
    ],
    concerns: [
      "Skogliga rekreationsvärden",
      "Påverkan på rovfåglar – inventeringar pågår",
      "Kringboendes intresse (bullerpåverkan)"
    ],
    timeline: [
      { date: "2024-01-25", event: "Ansökan inlämnad" },
      { date: "2024-03-20", event: "Ansökan komplett" },
      { date: "2024-06-17", event: "Remiss utskickad" },
      { date: "2024-08-09", event: "Yttranden inkomna – beredning pågår" }
    ],
    tags: ["vindkraft", "värmland", "torsby", "örå", "stena", "renewable", "skogsmark", "eriksson", "friberg"]
  },

  {
    id: "LST-X-292-5230-2022",
    title: "Bioenergianläggning Sandviken",
    type: "bioenergi",
    status: "Beviljat",
    county: "Gävleborgs",
    municipality: "Sandviken",
    location: "Sandviken industriområde",
    applicant: {
      name: "Stora Enso AB",
      orgNr: "556012-6293",
      contact: "anders.berg@storaenso.com"
    },
    officer: { name: "Lena Sjöberg", unit: "Prövningsenheten" },
    submitted: "2022-09-12",
    lastUpdated: "2023-11-30",
    capacity: { value: 95, unit: "MW termisk" },
    turbines: null,
    area: 12,
    investmentMSEK: 1200,
    duration: "20 år",
    description: "Bioenergianläggning vid Sandvikens industriområde som kombinerar kraftvärmeproduktion med biogas- och pelletproduktion. Råvara utgörs av skogsrester och biprodukter från pappersmassatillverkning. Anläggningen minskar fossila bränslen i fjärrvärmenätet med 90%.",
    keyFacts: [
      "95 MW termisk kapacitet",
      "Ersätter fossilbränslad anläggning",
      "Råvara: skogsrester och massabiprodukt",
      "Reducerar CO₂-utsläpp med 65 000 ton/år",
      "Tillstånd meddelat nov 2023"
    ],
    concerns: [
      "Luftkvalitetsaspekter vid förbränning",
      "Transporter av bioråvara"
    ],
    timeline: [
      { date: "2022-09-12", event: "Ansökan inlämnad" },
      { date: "2022-12-08", event: "Komplettering inlämnad" },
      { date: "2023-04-14", event: "Remiss genomförd" },
      { date: "2023-11-30", event: "Tillstånd meddelat" }
    ],
    tags: ["bioenergi", "gävleborg", "sandviken", "stora enso", "kraftvärme", "biomassa", "berg", "sjöberg"]
  },

  {
    id: "LST-BD-575-12001-2022",
    title: "Vindkraftpark Markbygden III",
    type: "vindkraft",
    status: "Beviljat",
    county: "Norrbottens",
    municipality: "Piteå",
    location: "Markbygden, Piteå kommun",
    applicant: {
      name: "Vattenfall Vindkraft AB",
      orgNr: "556993-2222",
      contact: "peter.lindqvist@vattenfall.com"
    },
    officer: { name: "Åsa Gren", unit: "Prövningsenheten" },
    submitted: "2022-04-18",
    lastUpdated: "2023-06-12",
    capacity: { value: 650, unit: "MW" },
    turbines: 90,
    area: 9800,
    investmentMSEK: 8500,
    duration: "25 år",
    description: "Markbygden III är sista etappen i Europas största landbaserade vindkraftsprojekt i Markbygden, Piteå. 90 vindkraftverk med en total installerad effekt om 650 MW. Projektet skapar hundratals arbetstillfällen under byggtiden och bidrar till Sveriges nationella klimatmål.",
    keyFacts: [
      "90 vindkraftverk á 7,2 MW",
      "650 MW installerad effekt",
      "Del av Europas största landbaserade vindpark",
      "Årsproduktion 2 100 GWh",
      "Tillstånd beviljat juni 2023"
    ],
    concerns: [
      "Påverkan på renbetesmark (Sametinget)",
      "Kumulativ påverkan tillsammans med etapp I och II",
      "Elnätskapacitet – förstärkning av stamnätet"
    ],
    timeline: [
      { date: "2022-04-18", event: "Ansökan inlämnad" },
      { date: "2022-08-11", event: "Samråd med samebyar" },
      { date: "2023-01-20", event: "Förhandling hållen" },
      { date: "2023-06-12", event: "Tillstånd meddelat" }
    ],
    tags: ["vindkraft", "norrbotten", "piteå", "markbygden", "vattenfall", "storskaligt", "renbete", "lindqvist", "gren"]
  },

  {
    id: "LST-C-292-3341-2024",
    title: "Solpark Tierp",
    type: "solkraft",
    status: "Under handläggning",
    county: "Uppsala",
    municipality: "Tierp",
    location: "Venngarn, Tierp",
    applicant: {
      name: "Bixia Energi AB",
      orgNr: "556781-4441",
      contact: "sara.nyberg@bixia.se"
    },
    officer: { name: "Thomas Lundgren", unit: "Miljöprövningsenheten" },
    submitted: "2024-04-22",
    lastUpdated: "2024-11-01",
    capacity: { value: 30, unit: "MW" },
    turbines: null,
    area: 88,
    investmentMSEK: 220,
    duration: "30 år",
    description: "Solpark Tierp planeras på mark norr om Venngarn i Tierps kommun. Marken har inte brukats aktivt de senaste åren och bedöms lämplig för solcellsproduktion. Produktionen bidrar till Upplands regionala energimål.",
    keyFacts: [
      "30 MW installerad effekt",
      "Ca 60 000 solpaneler",
      "Årsproduktion 29 GWh",
      "Inhägnad med viltpassager",
      "Nätanslutning via 20 kV kabel"
    ],
    concerns: [
      "Visuell påverkan nära Venngarn slott (byggnadsminne)",
      "Påverkan på kulturlandskap"
    ],
    timeline: [
      { date: "2024-04-22", event: "Ansökan inlämnad" },
      { date: "2024-06-30", event: "Ansökan komplett" },
      { date: "2024-09-15", event: "Remiss utskickad till Riksantikvarieämbetet" },
      { date: "2024-11-01", event: "Remissvar under sammanvägning" }
    ],
    tags: ["solkraft", "uppsala", "tierp", "venngarn", "bixia", "kulturmiljö", "nyberg", "lundgren"]
  },

  {
    id: "LST-Y-431-7720-2020",
    title: "Vindkraftpark Havsnäs",
    type: "vindkraft",
    status: "Beviljat",
    county: "Västernorrlands",
    municipality: "Strömsund",
    location: "Havsnäs, Strömsunds kommun",
    applicant: {
      name: "Vattenfall AB",
      orgNr: "556036-2138",
      contact: "gunnar.elofsson@vattenfall.com"
    },
    officer: { name: "Maria Eklund", unit: "Prövningsenheten" },
    submitted: "2020-03-10",
    lastUpdated: "2022-09-01",
    capacity: { value: 90, unit: "MW" },
    turbines: 20,
    area: 1200,
    investmentMSEK: 1150,
    duration: "25 år",
    description: "Vindkraftpark Havsnäs i Strömsunds kommun är en av norra Sveriges viktigaste vindkraftsetableringar. 20 vindkraftverk producerar el motsvarande 50 000 hushålls årsförbrukning. Parken är nu i drift och bidrar till norrlandsregionens energiproduktion.",
    keyFacts: [
      "20 vindkraftverk á 4,5 MW",
      "Totalhöjd 183 m",
      "Årsproduktion 250 GWh",
      "I full drift sedan september 2022",
      "Skogsmark – samverkan med skogsbolag"
    ],
    concerns: [
      "Renbetespåverkan (delvis löst via avtal)",
      "Buller vid fritidshusområden"
    ],
    timeline: [
      { date: "2020-03-10", event: "Ansökan inlämnad" },
      { date: "2020-11-18", event: "Tillstånd meddelat" },
      { date: "2021-08-01", event: "Byggstart" },
      { date: "2022-09-01", event: "Idrifttagning – projektet avslutat" }
    ],
    tags: ["vindkraft", "västernorrland", "strömsund", "havsnäs", "vattenfall", "i drift", "elofsson", "eklund"]
  },

  {
    id: "LST-M-431-9012-2024",
    title: "Solcellspark Vellinge",
    type: "solkraft",
    status: "Under handläggning",
    county: "Skånes",
    municipality: "Vellinge",
    location: "Östra Grevie, Vellinge",
    applicant: {
      name: "Soltech Energy AB",
      orgNr: "556709-9436",
      contact: "anna.strand@soltech.se"
    },
    officer: { name: "Fredrik Nilsson", unit: "Miljöprövningsenheten" },
    submitted: "2024-05-08",
    lastUpdated: "2024-10-11",
    capacity: { value: 22, unit: "MW" },
    turbines: null,
    area: 55,
    investmentMSEK: 165,
    duration: "30 år",
    description: "Solcellspark i Östra Grevie, Vellinge, i södra Skåne. Projektet möter starkt lokalt motstånd på grund av läget nära kustzonen och kulturlandskapet. Remissyttranden från kommunen och intresseorganisationer är delvis negativa.",
    keyFacts: [
      "22 MW installerad effekt",
      "Ca 44 000 solpaneler",
      "Kustläge – exponerat läge",
      "Årsproduktion 22 GWh",
      "Komplettering begärd av Länsstyrelsen"
    ],
    concerns: [
      "Påverkan på det skånska kulturlandskapet",
      "Visuell påverkan nära Östersjökusten",
      "Kommunens planmonopol i konflikt",
      "Negativa yttranden från Jordbruksverket"
    ],
    timeline: [
      { date: "2024-05-08", event: "Ansökan inlämnad" },
      { date: "2024-07-14", event: "Komplettering begärd" },
      { date: "2024-09-02", event: "Delvis komplettering inlämnad" },
      { date: "2024-10-11", event: "Ytterligare komplettering begärd" }
    ],
    tags: ["solkraft", "skåne", "vellinge", "östra grevie", "soltech", "kust", "kulturlandskap", "strand", "nilsson"]
  },

  {
    id: "LST-D-575-4211-2023",
    title: "Energilagring Nyköping",
    type: "batteri",
    status: "Beviljat",
    county: "Södermanlands",
    municipality: "Nyköping",
    location: "Nyköping industripark",
    applicant: {
      name: "Siemens Energy AB",
      orgNr: "556123-7841",
      contact: "linda.sjogren@siemens-energy.com"
    },
    officer: { name: "Eva Nordin", unit: "Prövningsenheten" },
    submitted: "2023-02-28",
    lastUpdated: "2024-01-15",
    capacity: { value: 200, unit: "MWh" },
    turbines: null,
    area: 3,
    investmentMSEK: 480,
    duration: "20 år",
    description: "Storskalig batterilagringsanläggning i Nyköpings industripark. Anläggningen består av litiumjonbatterier och tjänstgör som systemtjänster till Svenska kraftnät. Projektet möjliggör ökad andel intermittent förnybar kraft i elnätet.",
    keyFacts: [
      "200 MWh lagringskapacitet",
      "100 MW effektuttag",
      "Litiumjonbatterier (LFP)",
      "Tillhandahåller FCR-D till Svenska kraftnät",
      "Tillstånd meddelat jan 2024"
    ],
    concerns: [
      "Brandrisker och hantering av litiumjonbatterier",
      "Buller från kylsystem"
    ],
    timeline: [
      { date: "2023-02-28", event: "Ansökan inlämnad" },
      { date: "2023-06-12", event: "Remiss genomförd" },
      { date: "2023-11-08", event: "Förhandling" },
      { date: "2024-01-15", event: "Tillstånd meddelat" }
    ],
    tags: ["batteri", "energilagring", "södermanland", "nyköping", "siemens", "litiumjon", "systemtjänster", "sjögren", "nordin"]
  },

  {
    id: "LST-F-247-6120-2024",
    title: "Vindkraftpark Kråktorpet",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Jönköpings",
    municipality: "Eksjö",
    location: "Kråktorpet, Eksjö",
    applicant: {
      name: "Rabbalshede Kraft AB",
      orgNr: "556681-4652",
      contact: "carl.hammarstedt@rabbalshede.se"
    },
    officer: { name: "Ingela Westerberg", unit: "Miljöprövningsenheten" },
    submitted: "2024-06-12",
    lastUpdated: "2024-11-30",
    capacity: { value: 48, unit: "MW" },
    turbines: 8,
    area: 350,
    investmentMSEK: 640,
    duration: "25 år",
    description: "Vindkraftpark Kråktorpet planeras i höjdområden kring Kråktorpet i Eksjö. Projektet bidrar till Jönköpings läns klimatmål. Höjdpartier med god vindresurs identifierade i kommunens översiktsplan.",
    keyFacts: [
      "8 vindkraftverk á 6 MW",
      "Totalhöjd 210 m",
      "Beräknad årsproduktion 148 GWh",
      "Identifierat i kommunal vindbruksplan",
      "Driftsättning planerad 2028"
    ],
    concerns: [
      "Buller och skuggor vid fritidshusbebyggelse",
      "Påverkan på ornitologiska värden",
      "Tjänsteledskorridorer för Försvarsmakten"
    ],
    timeline: [
      { date: "2024-06-12", event: "Ansökan inlämnad" },
      { date: "2024-08-30", event: "Ansökan komplett" },
      { date: "2024-11-30", event: "Remiss utskickad" }
    ],
    tags: ["vindkraft", "jönköping", "eksjö", "kråktorpet", "rabbalshede", "hammarstedt", "westerberg"]
  },

  {
    id: "LST-K-247-5800-2022",
    title: "Solpark Ronneby",
    type: "solkraft",
    status: "Beviljat",
    county: "Blekinges",
    municipality: "Ronneby",
    location: "Brantafors, Ronneby",
    applicant: {
      name: "BayWa r.e. Nordic AB",
      orgNr: "556901-4411",
      contact: "tobias.kraft@baywa-re.com"
    },
    officer: { name: "Susanne Ask", unit: "Prövningsenheten" },
    submitted: "2022-11-03",
    lastUpdated: "2023-10-20",
    capacity: { value: 36, unit: "MW" },
    turbines: null,
    area: 95,
    investmentMSEK: 260,
    duration: "30 år",
    description: "Solpark Brantafors utanför Ronneby är en av Blekinges första storskaliga solcellsparker. Etablering på skogsmark som avverkats och ej planeras återbeskogas. Produktionen levereras till elnätet via befintlig transformatorstation.",
    keyFacts: [
      "36 MW installerad effekt",
      "Skogsmark – tidigare plantageyta",
      "Årsproduktion 37 GWh",
      "Tillstånd beviljat okt 2023",
      "I drift sedan kv1 2024"
    ],
    concerns: [
      "Markavvattning och dagvattenhantering",
      "Kringliggande naturvärden"
    ],
    timeline: [
      { date: "2022-11-03", event: "Ansökan inlämnad" },
      { date: "2023-02-15", event: "Remiss genomförd" },
      { date: "2023-10-20", event: "Tillstånd meddelat" }
    ],
    tags: ["solkraft", "blekinge", "ronneby", "brantafors", "baywa", "skogsmark", "kraft", "ask"]
  },

  {
    id: "LST-N-431-8830-2024",
    title: "Flytande vindkraft Västerhavet",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Hallands",
    municipality: "Varberg",
    location: "Västerhavet, 50 km utanför Varberg",
    applicant: {
      name: "Hexicon AB",
      orgNr: "556886-3304",
      contact: "frida.osterberg@hexicon.eu"
    },
    officer: { name: "Magnus Holm", unit: "Miljöprövningsenheten" },
    submitted: "2024-07-01",
    lastUpdated: "2024-12-01",
    capacity: { value: 500, unit: "MW" },
    turbines: 50,
    area: 20000,
    investmentMSEK: 25000,
    duration: "25 år",
    description: "Pilotprojekt och fullskalig utbyggnad av flytande vindkraft på djupare vatten i Västerhavet. Hexicons patenterade TwinWind-teknologi med dubbla turbiner per flytande plattform. Projektet öppnar möjligheter för vindkraft på djup > 60 m.",
    keyFacts: [
      "50 flytande plattformar (TwinWind)",
      "500 MW installerad effekt",
      "Vattendjup 60–120 m",
      "Årsproduktion ca 2 000 GWh",
      "Ny teknikutveckling – demonstrationsfas"
    ],
    concerns: [
      "Förankringssystem och bottenpåverkan",
      "Påverkan på marina ekosystem",
      "Sjöfartssäkerhet",
      "Försvarsmaktens övningsområden i Västerhavet"
    ],
    timeline: [
      { date: "2024-07-01", event: "Ansökan inlämnad" },
      { date: "2024-09-10", event: "Ansökan komplett bekräftad" },
      { date: "2024-12-01", event: "Utökat samråd inlett" }
    ],
    tags: ["vindkraft", "halland", "varberg", "flytande", "offshore", "hexicon", "västerhavet", "österberg", "holm"]
  },

  {
    id: "LST-T-247-7210-2022",
    title: "Vindkraftpark Brattön",
    type: "vindkraft",
    status: "Beviljat",
    county: "Örebros",
    municipality: "Lekeberg",
    location: "Brattön, Lekebergs kommun",
    applicant: {
      name: "OX2 AB",
      orgNr: "556675-7497",
      contact: "henrik.sundström@ox2.com"
    },
    officer: { name: "Camilla Bengtsson", unit: "Prövningsenheten" },
    submitted: "2022-05-17",
    lastUpdated: "2023-07-04",
    capacity: { value: 60, unit: "MW" },
    turbines: 10,
    area: 480,
    investmentMSEK: 790,
    duration: "25 år",
    description: "Vindkraftpark Brattön i Lekebergs kommun, Örebro. Tillstånd beviljat efter positivt utfall i remissrundan. Kommunen har gett positiv syn (villkorat med lokal energiöverenskommelse). Projektet är nu i byggförberedelsefas.",
    keyFacts: [
      "10 vindkraftverk á 6 MW",
      "Tillstånd beviljat juli 2023",
      "Positivt yttrande från Lekebergs kommun",
      "Lokal energiöverenskommelse tecknad",
      "Byggstart planerat 2025"
    ],
    concerns: [
      "Kumulativ påverkan i regionen",
      "Buller nära enstaka fritidsboenden"
    ],
    timeline: [
      { date: "2022-05-17", event: "Ansökan inlämnad" },
      { date: "2022-09-14", event: "Remiss genomförd" },
      { date: "2023-03-10", event: "Förhandling hållen" },
      { date: "2023-07-04", event: "Tillstånd meddelat" }
    ],
    tags: ["vindkraft", "örebro", "lekeberg", "brattön", "ox2", "sundström", "bengtsson"]
  },

  {
    id: "LST-H-247-6641-2024",
    title: "Solcellspark Hultsfred",
    type: "solkraft",
    status: "Under handläggning",
    county: "Kalmar",
    municipality: "Hultsfred",
    location: "Silverdalens industrimark, Hultsfred",
    applicant: {
      name: "Alight AB",
      orgNr: "559069-8882",
      contact: "emily.frost@alight.se"
    },
    officer: { name: "Rolf Håkansson", unit: "Miljöprövningsenheten" },
    submitted: "2024-03-05",
    lastUpdated: "2024-09-28",
    capacity: { value: 18, unit: "MW" },
    turbines: null,
    area: 44,
    investmentMSEK: 130,
    duration: "30 år",
    description: "Solcellspark på industrimark i Silverdalen, Hultsfred. Marken är tidigare industrimarkt och lämpar sig väl utan att ta jordbruksmark i anspråk. Produktionen levereras direkt till lokalt industrikollektiv via PPA-avtal.",
    keyFacts: [
      "18 MW installerad effekt",
      "PPA-avtal med lokal industri",
      "Industrimark – ej jordbruk",
      "Årsproduktion 17 GWh",
      "Remiss pågår"
    ],
    concerns: [
      "Tidigare markanvändning – möjlig markförorening att utreda"
    ],
    timeline: [
      { date: "2024-03-05", event: "Ansökan inlämnad" },
      { date: "2024-05-20", event: "Ansökan komplett" },
      { date: "2024-09-28", event: "Remiss utskickad" }
    ],
    tags: ["solkraft", "kalmar", "hultsfred", "silverdalen", "alight", "industrimark", "frost", "håkansson"]
  },

  {
    id: "LST-M-431-7730-2021",
    title: "Biogasanläggning Helsingborg",
    type: "bioenergi",
    status: "Beviljat",
    county: "Skånes",
    municipality: "Helsingborg",
    location: "Filborna, Helsingborg",
    applicant: {
      name: "NSR AB",
      orgNr: "556234-8142",
      contact: "markus.palmgren@nsr.se"
    },
    officer: { name: "Åsa Palmqvist", unit: "Prövningsenheten" },
    submitted: "2021-06-14",
    lastUpdated: "2022-08-22",
    capacity: { value: 32, unit: "MW termisk" },
    turbines: null,
    area: 4,
    investmentMSEK: 420,
    duration: "20 år",
    description: "Utökad biogasanläggning vid Filborna i Helsingborg för behandling av organiskt avfall från hushåll och livsmedelsindustri. Producerar fordonsgas och el. NSR är ett avfallsbolag ägt av Helsingborgs stad.",
    keyFacts: [
      "32 MW termisk biogasproduktion",
      "Behandlar 120 000 ton organiskt avfall/år",
      "Producerar 60 GWh fordonsgas",
      "Ger biogödsel tillbaka till lantbruk",
      "Tillstånd beviljat aug 2022"
    ],
    concerns: [
      "Luktpåverkan vid driftsstörningar",
      "Transport av organiskt avfall"
    ],
    timeline: [
      { date: "2021-06-14", event: "Ansökan inlämnad" },
      { date: "2021-10-05", event: "Remiss genomförd" },
      { date: "2022-08-22", event: "Tillstånd meddelat" }
    ],
    tags: ["bioenergi", "biogas", "skåne", "helsingborg", "filborna", "nsr", "avfall", "palmgren", "palmqvist"]
  },

  {
    id: "LST-Z-431-8810-2023",
    title: "Vindkraftpark Storrun",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Jämtlands",
    municipality: "Åre",
    location: "Storrun, Åre kommun",
    applicant: {
      name: "Fred. Olsen Renewables AB",
      orgNr: "556902-1134",
      contact: "sigrid.halvorsen@fredolsen.no"
    },
    officer: { name: "Gunnar Persson", unit: "Miljöprövningsenheten" },
    submitted: "2023-08-28",
    lastUpdated: "2024-11-08",
    capacity: { value: 66, unit: "MW" },
    turbines: 11,
    area: 620,
    investmentMSEK: 880,
    duration: "25 år",
    description: "Vindkraftpark Storrun planeras i fjällnära terräng i Åre kommun, Jämtland. Projektet möter stark opposition från kommunen och lokala intresseorganisationer som värnar om turism och fjällmiljöer. Komplettering begärd på flertalet punkter.",
    keyFacts: [
      "11 vindkraftverk á 6 MW",
      "Fjällnära läge – känslig miljö",
      "Beräknad årsproduktion 195 GWh",
      "Starkt lokalt motstånd",
      "Flertalet kompletteringar begärda"
    ],
    concerns: [
      "Påverkan på fjällandskapet och turism",
      "Rennäringens intressen (stora samebyar)",
      "Konflikter med kommunens turismstrategi",
      "Skyddsavstånd till fjällnaturreservat",
      "Bullerspridning i vindexponerad terräng"
    ],
    timeline: [
      { date: "2023-08-28", event: "Ansökan inlämnad" },
      { date: "2023-11-20", event: "Komplettering begärd (12 punkter)" },
      { date: "2024-04-08", event: "Delvis komplettering inlämnad" },
      { date: "2024-08-30", event: "Ny komplettering begärd" },
      { date: "2024-11-08", event: "Komplettering inlämnad – beredning påbörjas" }
    ],
    tags: ["vindkraft", "jämtland", "åre", "storrun", "fred olsen", "fjällnära", "turism", "halvorsen", "persson"]
  },

  {
    id: "LST-O-431-9901-2024",
    title: "Solpark Borås",
    type: "solkraft",
    status: "Under handläggning",
    county: "Västra Götalands",
    municipality: "Borås",
    location: "Häggås, Borås",
    applicant: {
      name: "Svea Solar AB",
      orgNr: "556773-4456",
      contact: "nina.bergqvist@sveasolar.se"
    },
    officer: { name: "Patrik Lundh", unit: "Miljöprövningsenheten" },
    submitted: "2024-02-14",
    lastUpdated: "2024-10-01",
    capacity: { value: 40, unit: "MW" },
    turbines: null,
    area: 105,
    investmentMSEK: 295,
    duration: "30 år",
    description: "Solpark Häggås i Borås stad. Projektet planeras i utkanten av Borås på mark med begränsade naturvärden. Närheten till Borås energinät ger god förutsättning för nätanslutning.",
    keyFacts: [
      "40 MW installerad effekt",
      "Utkant av Borås stad",
      "Årsproduktion 38 GWh",
      "Nätanslutning 1 km",
      "Remiss pågår"
    ],
    concerns: [
      "Stadsnära läge – visuell påverkan",
      "Dagvattenhantering"
    ],
    timeline: [
      { date: "2024-02-14", event: "Ansökan inlämnad" },
      { date: "2024-04-22", event: "Ansökan komplett" },
      { date: "2024-07-15", event: "Remiss utskickad" },
      { date: "2024-10-01", event: "Yttranden inkomna" }
    ],
    tags: ["solkraft", "västra götaland", "borås", "häggås", "svea solar", "bergqvist", "lundh"]
  },

  {
    id: "LST-X-431-6601-2024",
    title: "Vindkraftpark Gästrikkusten",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Gävleborgs",
    municipality: "Söderhamn",
    location: "Gästrikkusten, utanför Söderhamn",
    applicant: {
      name: "Nordex Sverige AB",
      orgNr: "556781-9934",
      contact: "lars.moberg@nordex-online.com"
    },
    officer: { name: "Lena Sjöberg", unit: "Miljöprövningsenheten" },
    submitted: "2024-01-10",
    lastUpdated: "2024-09-05",
    capacity: { value: 336, unit: "MW" },
    turbines: 48,
    area: 8200,
    investmentMSEK: 4400,
    duration: "25 år",
    description: "Havsbaserat vindkraftsprojekt utanför Söderhamns kust i Gästrikland. 48 vindkraftverk i Bottenhavet. Projektet utgör ett av Nordrlasgionens strategiskt viktiga havsvindsprojekt.",
    keyFacts: [
      "48 havsbaserade vindkraftverk á 7 MW",
      "Lokalisering 20–35 km från kusten",
      "Årsproduktion 1 200 GWh",
      "Bottenfast fundament",
      "Nätanslutning via undervattenskabel till Söderhamn"
    ],
    concerns: [
      "Påverkan på fiske",
      "Visuell påverkan från Hälsingekusten",
      "Störning av sjöfart",
      "Påverkan på Försvarsmaktens intressen"
    ],
    timeline: [
      { date: "2024-01-10", event: "Ansökan inlämnad" },
      { date: "2024-03-28", event: "Ansökan komplett" },
      { date: "2024-07-22", event: "Remiss utskickad" },
      { date: "2024-09-05", event: "Remissyttranden inkomna" }
    ],
    tags: ["vindkraft", "gävleborg", "söderhamn", "gästrikkusten", "nordex", "offshore", "bottenhavet", "moberg", "sjöberg"]
  },

  {
    id: "LST-BD-575-13220-2024",
    title: "Vätgasanläggning HYBRIT Luleå",
    type: "batteri",
    status: "Under handläggning",
    county: "Norrbottens",
    municipality: "Luleå",
    location: "SSAB:s stålverk, Luleå",
    applicant: {
      name: "LKAB / HYBRIT Development AB",
      orgNr: "559125-3371",
      contact: "martin.pei@hybrit.se"
    },
    officer: { name: "Katrin Wennberg", unit: "Miljöprövningsenheten" },
    submitted: "2024-04-10",
    lastUpdated: "2024-11-20",
    capacity: { value: 800, unit: "MW elektrolys" },
    turbines: null,
    area: 25,
    investmentMSEK: 12000,
    duration: "30 år",
    description: "HYBRIT Luleå är världens första industriella anläggning för fossilfri järn- och stålproduktion med vätgas. Ansökan avser fullskalig elektrolysanläggning om 800 MW vid SSAB:s stålverk i Luleå. Vätgasen produceras med fossilfri el och ersätter koks i järnframställningen.",
    keyFacts: [
      "800 MW elektrolyskapacitet",
      "Fossilfri vätgasproduktion",
      "Eliminerar 10% av Sveriges CO₂-utsläpp",
      "Del av HYBRIT-initiativet (SSAB, LKAB, Vattenfall)",
      "Globalt unikt – ingen liknande anläggning finns"
    ],
    concerns: [
      "Enorm elkonsumtion kräver ny transmissionskapacitet",
      "Lagring av vätgas – brand- och explosionsrisk",
      "Trafikintensitet vid anläggning"
    ],
    timeline: [
      { date: "2024-04-10", event: "Ansökan inlämnad" },
      { date: "2024-06-25", event: "Ansökan komplett" },
      { date: "2024-09-12", event: "Remiss till 18 instanser" },
      { date: "2024-11-20", event: "Yttranden under sammanvägning" }
    ],
    tags: ["vätgas", "hybrit", "norrbotten", "luleå", "lkab", "ssab", "vattenfall", "stål", "fossilfri", "pei", "wennberg"]
  },

  {
    id: "LST-E-247-8002-2021",
    title: "Vindpark Målarö",
    type: "vindkraft",
    status: "Beviljat",
    county: "Östergötlands",
    municipality: "Motala",
    location: "Målarö, Vätterns östkust, Motala",
    applicant: {
      name: "RWE Renewables Sverige AB",
      orgNr: "556922-6614",
      contact: "thomas.gruber@rwe.com"
    },
    officer: { name: "Helena Dahl", unit: "Prövningsenheten" },
    submitted: "2021-09-20",
    lastUpdated: "2023-04-18",
    capacity: { value: 42, unit: "MW" },
    turbines: 7,
    area: 290,
    investmentMSEK: 560,
    duration: "25 år",
    description: "Vindpark Målarö på Vätterns östkust i Motala. Sju vindkraftverk, beviljat tillstånd trots överklaganden från naturskyddsorganisationer. Vätterns naturvärden och Natura 2000-områden nära, men bedömda som ej påverkade.",
    keyFacts: [
      "7 vindkraftverk á 6 MW",
      "Kust mot Vättern",
      "Tillståndet överklagat – fastställt i Mark- och miljödomstolen",
      "Årsproduktion 120 GWh",
      "Byggstart 2024"
    ],
    concerns: [
      "Påverkan på Vätterns naturvärden",
      "Visuell påverkan från Vätterns västra strand",
      "Överklagat av Naturskyddsföreningen (avslaget)"
    ],
    timeline: [
      { date: "2021-09-20", event: "Ansökan inlämnad" },
      { date: "2022-06-14", event: "Tillstånd meddelat" },
      { date: "2022-08-30", event: "Tillståndet överklagat" },
      { date: "2023-04-18", event: "Mark- och miljödomstolen fastställer tillståndet" }
    ],
    tags: ["vindkraft", "östergötland", "motala", "målarö", "vättern", "rwe", "överklagat", "gruber", "dahl"]
  },

  {
    id: "LST-G-247-5520-2024",
    title: "Solcellspark Lessebo",
    type: "solkraft",
    status: "Under handläggning",
    county: "Kronobergs",
    municipality: "Lessebo",
    location: "Kosta, Lessebo",
    applicant: {
      name: "Kraftringen AB",
      orgNr: "556012-6892",
      contact: "jenny.akesson@kraftringen.se"
    },
    officer: { name: "Peter Magnusson", unit: "Miljöprövningsenheten" },
    submitted: "2024-05-30",
    lastUpdated: "2024-10-15",
    capacity: { value: 15, unit: "MW" },
    turbines: null,
    area: 38,
    investmentMSEK: 115,
    duration: "30 år",
    description: "Solcellspark nära Kosta glasbruk i Lessebo. Projekt kombinerat med bevarande av det kulturhistoriska glasbrukslandskapet. Kommunen är positiv.",
    keyFacts: [
      "15 MW installerad effekt",
      "Nära Kosta – kulturhistorisk kontext",
      "Kommunen positivt inställd",
      "Årsproduktion 14 GWh",
      "Remiss pågår"
    ],
    concerns: [
      "Visuell påverkan nära byggnadsminne Kosta glasbruk"
    ],
    timeline: [
      { date: "2024-05-30", event: "Ansökan inlämnad" },
      { date: "2024-08-06", event: "Ansökan komplett" },
      { date: "2024-10-15", event: "Remiss utskickad" }
    ],
    tags: ["solkraft", "kronoberg", "lessebo", "kosta", "kraftringen", "kulturmiljö", "åkesson", "magnusson"]
  },

  {
    id: "LST-Y-431-8330-2019",
    title: "Ljungans vattenkraft Nedre Ljungan",
    type: "vattenkraft",
    status: "Beviljat",
    county: "Västernorrlands",
    municipality: "Timrå",
    location: "Nedre Ljungan, Timrå",
    applicant: {
      name: "Fortum Sverige AB",
      orgNr: "556418-5590",
      contact: "kristina.ahlgren@fortum.com"
    },
    officer: { name: "Maria Eklund", unit: "Vattenverksamhetsenheten" },
    submitted: "2019-10-08",
    lastUpdated: "2021-12-15",
    capacity: { value: 55, unit: "MW" },
    turbines: null,
    area: null,
    investmentMSEK: 620,
    duration: "40 år",
    description: "Modernisering och effektökning av Fortums kraftverk i nedre Ljungan. Ny turbininstallation ökar kapaciteten från 42 till 55 MW. Fiskvandringslösning och minimitappning ingår i villkoren.",
    keyFacts: [
      "Effektökning 42 → 55 MW",
      "Omlöp 320 m för havsöring",
      "Nytt tillstånd ersätter 1950-tals villkor",
      "Ekologisk statusförbättring",
      "Tillstånd beviljat dec 2021"
    ],
    concerns: [
      "Havsörings fortplantning i Ljungan",
      "Vattenreglering nedströms"
    ],
    timeline: [
      { date: "2019-10-08", event: "Ansökan inlämnad" },
      { date: "2020-06-22", event: "Komplettering inlämnad" },
      { date: "2021-02-14", event: "Förhandling" },
      { date: "2021-12-15", event: "Tillstånd meddelat" }
    ],
    tags: ["vattenkraft", "västernorrland", "timrå", "ljungan", "fortum", "omlöp", "havsöring", "ahlgren", "eklund"]
  },

  {
    id: "LST-AB-431-7701-2023",
    title: "Havsbaserad vindkraft Lillgrund II",
    type: "vindkraft",
    status: "Under handläggning",
    county: "Skånes",
    municipality: "Malmö",
    location: "Öresund, söder om Malmö",
    applicant: {
      name: "Ørsted Sverige AB",
      orgNr: "556832-3310",
      contact: "jakob.nielsen@orsted.com"
    },
    officer: { name: "Fredrik Nilsson", unit: "Miljöprövningsenheten" },
    submitted: "2023-11-15",
    lastUpdated: "2024-11-05",
    capacity: { value: 400, unit: "MW" },
    turbines: 50,
    area: 7500,
    investmentMSEK: 10000,
    duration: "25 år",
    description: "Utbyggnad av havsbaserad vindkraft i Öresund, söder om Malmö och den befintliga Lillgrundparken. 50 nya vindkraftverk som nästan femdubblar produktionen i Öresund. Komplicerat av täta sjöfartsleder och Öresundsbrons skyddszon.",
    keyFacts: [
      "50 havsbaserade vindkraftverk",
      "400 MW installerad effekt",
      "Expansion av befintlig Lillgrund",
      "Årsproduktion 1 500 GWh",
      "Komplicerat av Öresundsbrons skyddszon"
    ],
    concerns: [
      "Sjöfartssäkerhet i Öresunds täta fartygsleder",
      "Öresundsbrons skyddszon",
      "Dansk-svensk samordning krävs",
      "Påverkan på fiske och marina naturvärden"
    ],
    timeline: [
      { date: "2023-11-15", event: "Ansökan inlämnad" },
      { date: "2024-02-20", event: "Ansökan komplett" },
      { date: "2024-06-10", event: "Internationell samordning med Danmark" },
      { date: "2024-11-05", event: "Remiss pågår" }
    ],
    tags: ["vindkraft", "skåne", "malmö", "öresund", "lillgrund", "ørsted", "offshore", "nielsen", "nilsson"]
  },

  /* ── Extra vindkraft ── */
  { id:"LST-Z-431-5501-2022", title:"Vindkraftpark Mörttjärnberget", type:"vindkraft", status:"Beviljat", county:"Jämtlands", municipality:"Östersund", location:"Mörttjärnberget, Östersund", applicant:{name:"Wind Estate AB",orgNr:"556923-4411",contact:"per.ahlstrom@windestate.se"}, officer:{name:"Gunnar Persson",unit:"Prövningsenheten"}, submitted:"2022-03-10", lastUpdated:"2023-08-15", capacity:{value:80,unit:"MW"}, turbines:14, area:720, investmentMSEK:1050, duration:"25 år", description:"Vindkraftpark Mörttjärnberget i Östersunds kommun med 14 vindkraftverk om 80 MW total installerad effekt. Tillstånd beviljat efter positivt utfall i remissrundan. Anläggningen beräknas producera 240 GWh per år.", keyFacts:["14 vindkraftverk á 5,7 MW","Årsproduktion 240 GWh","Skogsmark – skogsbruk pågår","Tillstånd beviljat aug 2023"], concerns:["Påverkan på rovfåglar","Renbetesmark"], timeline:[{date:"2022-03-10",event:"Ansökan inlämnad"},{date:"2022-10-14",event:"Remiss genomförd"},{date:"2023-08-15",event:"Tillstånd meddelat"}], tags:["vindkraft","jämtland","östersund","mörttjärnberget","wind estate","ahlstrom","persson"] },

  { id:"LST-W-575-9900-2023", title:"Vindkraftpark Hedbodberget", type:"vindkraft", status:"Beviljat", county:"Dalarnas", municipality:"Rättvik", location:"Hedbodberget, Rättvik", applicant:{name:"Statkraft Sverige AB",orgNr:"556699-7130",contact:"erik.nilsson@statkraft.com"}, officer:{name:"Lars Bergström",unit:"Prövningsenheten"}, submitted:"2023-01-18", lastUpdated:"2024-04-22", capacity:{value:90,unit:"MW"}, turbines:15, area:850, investmentMSEK:1180, duration:"25 år", description:"Vindkraftpark Hedbodberget i Rättviks kommun om 90 MW. Statkraft etablerar 15 vindkraftverk på höjdpartier i Siljansnäs-området. Tillstånd meddelat april 2024.", keyFacts:["15 vindkraftverk á 6 MW","Årsproduktion 280 GWh","Höjdläge med goda vindförhållanden","Tillstånd beviljat 2024"], concerns:["Visuell påverkan mot Siljan","Skuggor vid kringboende"], timeline:[{date:"2023-01-18",event:"Ansökan inlämnad"},{date:"2023-09-05",event:"Remiss genomförd"},{date:"2024-04-22",event:"Tillstånd meddelat"}], tags:["vindkraft","dalarna","rättvik","hedbodberget","statkraft","siljan","nilsson","bergström"] },

  { id:"LST-BD-575-14100-2024", title:"Uljabuouda Vindkraftpark", type:"vindkraft", status:"Under handläggning", county:"Norrbottens", municipality:"Arjeplog", location:"Uljabuouda, Arjeplog", applicant:{name:"Svevind AB",orgNr:"559095-4480",contact:"sara.larsson@svevind.com"}, officer:{name:"Katrin Wennberg",unit:"Miljöprövningsenheten"}, submitted:"2024-01-22", lastUpdated:"2024-10-30", capacity:{value:1100,unit:"MW"}, turbines:140, area:18000, investmentMSEK:15000, duration:"25 år", description:"Uljabuouda är ett av Sveriges största planerade landbaserade vindkraftsprojekt med upp till 140 vindkraftverk och 1 100 MW installerad effekt i Arjeplog. Projektet möter stor opposition från samebyar och rennäringen.", keyFacts:["Upp till 140 vindkraftverk","1 100 MW – ett av Sveriges största","Årsproduktion beräknad till 4 000 GWh","Starkt motstånd från rennäringen"], concerns:["Massiv påverkan på renbetesmark","Sametingets starka opposition","Kumulativ påverkan i regionen","Logistik i avlägset område"], timeline:[{date:"2024-01-22",event:"Ansökan inlämnad"},{date:"2024-05-08",event:"Samråd med samebyar"},{date:"2024-10-30",event:"Komplettering begärd"}], tags:["vindkraft","norrbotten","arjeplog","uljabuouda","svevind","renbete","storskaligt","larsson","wennberg"] },

  { id:"LST-Z-431-4400-2021", title:"Vindkraftpark Bräcke", type:"vindkraft", status:"Beviljat", county:"Jämtlands", municipality:"Bräcke", location:"Bodsjöhöjden, Bräcke", applicant:{name:"Arise AB",orgNr:"556274-6726",contact:"mikael.carlsson@arise.se"}, officer:{name:"Gunnar Persson",unit:"Prövningsenheten"}, submitted:"2021-05-14", lastUpdated:"2022-11-20", capacity:{value:54,unit:"MW"}, turbines:9, area:390, investmentMSEK:710, duration:"25 år", description:"Vindkraftpark vid Bodsjöhöjden i Bräcke, Jämtland. Nio vindkraftverk med tillstånd beviljat november 2022. Projektet är nu i driftsfas.", keyFacts:["9 vindkraftverk á 6 MW","Årsproduktion 165 GWh","Driftsatt 2023","Lokalt energiavtal tecknat"], concerns:["Buller vid enstaka bostadsfastigheter"], timeline:[{date:"2021-05-14",event:"Ansökan inlämnad"},{date:"2022-03-22",event:"Remiss"},{date:"2022-11-20",event:"Tillstånd meddelat"}], tags:["vindkraft","jämtland","bräcke","bodsjöhöjden","arise","carlsson","persson"] },

  { id:"LST-Z-431-5100-2022", title:"Vindkraftpark Kölvallen", type:"vindkraft", status:"Beviljat", county:"Jämtlands", municipality:"Härjedalen", location:"Kölvallen, Härjedalen", applicant:{name:"OX2 AB",orgNr:"556675-7497",contact:"anna.ek@ox2.com"}, officer:{name:"Gunnar Persson",unit:"Prövningsenheten"}, submitted:"2022-06-01", lastUpdated:"2023-12-18", capacity:{value:66,unit:"MW"}, turbines:11, area:580, investmentMSEK:870, duration:"25 år", description:"Vindkraftpark Kölvallen i Härjedalen med 11 vindkraftverk. OX2 har erhållit tillstånd och projektet befinner sig i byggförberedelsefas inför planerad driftsättning 2026.", keyFacts:["11 vindkraftverk á 6 MW","Årsproduktion 200 GWh","Tillstånd dec 2023","Byggstart 2025"], concerns:["Renbetesmark – avtal med sameby tecknat"], timeline:[{date:"2022-06-01",event:"Ansökan inlämnad"},{date:"2023-06-10",event:"Remiss"},{date:"2023-12-18",event:"Tillstånd meddelat"}], tags:["vindkraft","jämtland","härjedalen","kölvallen","ox2","ek","persson"] },

  { id:"LST-Y-431-8100-2024", title:"Trattberget Vindkraftpark", type:"vindkraft", status:"Under handläggning", county:"Västernorrlands", municipality:"Härnösand", location:"Trattberget, Härnösand", applicant:{name:"Eolus Vind AB",orgNr:"556549-1997",contact:"linda.berg@eolus.com"}, officer:{name:"Maria Eklund",unit:"Miljöprövningsenheten"}, submitted:"2024-02-28", lastUpdated:"2024-11-12", capacity:{value:42,unit:"MW"}, turbines:7, area:310, investmentMSEK:560, duration:"25 år", description:"Sju vindkraftverk planeras i Trattberget utanför Härnösand. Projektet handläggs av Länsstyrelsen Västernorrland och remissrundan pågår.", keyFacts:["7 vindkraftverk á 6 MW","Årsproduktion 130 GWh","Remissrunda pågår","Nätanslutning via ny ledning"], concerns:["Buller vid fritidshusbebyggelse","Påverkan på rovfåglar"], timeline:[{date:"2024-02-28",event:"Ansökan inlämnad"},{date:"2024-05-14",event:"Ansökan komplett"},{date:"2024-11-12",event:"Remiss utskickad"}], tags:["vindkraft","västernorrland","härnösand","trattberget","eolus","berg","eklund"] },

  { id:"LST-Y-431-7900-2022", title:"Ångersjö Vindkraftpark", type:"vindkraft", status:"Beviljat", county:"Västernorrlands", municipality:"Kramfors", location:"Ångersjö, Kramfors", applicant:{name:"RWE Renewables Sverige AB",orgNr:"556922-6614",contact:"hans.mueller@rwe.com"}, officer:{name:"Maria Eklund",unit:"Prövningsenheten"}, submitted:"2022-09-01", lastUpdated:"2023-10-05", capacity:{value:48,unit:"MW"}, turbines:8, area:440, investmentMSEK:640, duration:"25 år", description:"Vindkraftpark Ångersjö i Kramfors med 8 vindkraftverk. Tillstånd beviljat oktober 2023. RWE planerar driftsättning under 2025.", keyFacts:["8 vindkraftverk á 6 MW","Årsproduktion 148 GWh","Tillstånd okt 2023","Driftsättning 2025"], concerns:["Kumulativ påverkan i regionen"], timeline:[{date:"2022-09-01",event:"Ansökan inlämnad"},{date:"2023-04-18",event:"Remiss"},{date:"2023-10-05",event:"Tillstånd meddelat"}], tags:["vindkraft","västernorrland","kramfors","ångersjö","rwe","mueller","eklund"] },

  { id:"LST-G-247-4400-2022", title:"Grönhult Vindkraftpark", type:"vindkraft", status:"Beviljat", county:"Kronobergs", municipality:"Alvesta", location:"Grönhult, Alvesta", applicant:{name:"Stena Renewable AB",orgNr:"556993-1002",contact:"karin.asp@stena.com"}, officer:{name:"Peter Magnusson",unit:"Prövningsenheten"}, submitted:"2022-04-12", lastUpdated:"2023-06-28", capacity:{value:36,unit:"MW"}, turbines:6, area:270, investmentMSEK:480, duration:"25 år", description:"Vindkraftpark Grönhult i Alvesta kommun med sex vindkraftverk. Stena Renewable har erhållit tillstånd och projektet befinner sig i slutförberedelsefas.", keyFacts:["6 vindkraftverk á 6 MW","Årsproduktion 110 GWh","Tillstånd jun 2023"], concerns:["Visuell påverkan på odlingslandskap"], timeline:[{date:"2022-04-12",event:"Ansökan inlämnad"},{date:"2023-01-10",event:"Remiss"},{date:"2023-06-28",event:"Tillstånd meddelat"}], tags:["vindkraft","kronoberg","alvesta","grönhult","stena","asp","magnusson"] },

  { id:"LST-F-247-7100-2024", title:"Palsbo Vindkraftpark", type:"vindkraft", status:"Under handläggning", county:"Jönköpings", municipality:"Värnamo", location:"Palsbo, Värnamo", applicant:{name:"Arise AB",orgNr:"556274-6726",contact:"sofia.grahn@arise.se"}, officer:{name:"Ingela Westerberg",unit:"Miljöprövningsenheten"}, submitted:"2024-03-15", lastUpdated:"2024-10-22", capacity:{value:30,unit:"MW"}, turbines:5, area:210, investmentMSEK:400, duration:"25 år", description:"Fem vindkraftverk planeras vid Palsbo i Värnamo. Projektet handläggs av Länsstyrelsen Jönköping med remissrundan nyligen avslutad.", keyFacts:["5 vindkraftverk á 6 MW","Årsproduktion 92 GWh","Remiss genomförd hösten 2024"], concerns:["Buller för kringboende","Skuggpåverkan"], timeline:[{date:"2024-03-15",event:"Ansökan inlämnad"},{date:"2024-06-02",event:"Ansökan komplett"},{date:"2024-10-22",event:"Remiss genomförd"}], tags:["vindkraft","jönköping","värnamo","palsbo","arise","grahn","westerberg"] },

  { id:"LST-N-431-8600-2023", title:"Hornamossen Vindkraftpark", type:"vindkraft", status:"Beviljat", county:"Hallands", municipality:"Varberg", location:"Hornamossen, Varberg", applicant:{name:"Vattenfall AB",orgNr:"556036-2138",contact:"olle.lindgren@vattenfall.com"}, officer:{name:"Magnus Holm",unit:"Prövningsenheten"}, submitted:"2023-02-08", lastUpdated:"2024-03-14", capacity:{value:42,unit:"MW"}, turbines:7, area:320, investmentMSEK:560, duration:"25 år", description:"Vindkraftpark Hornamossen i Varbergs kommun med sju vindkraftverk. Vattenfall har erhållit tillstånd mars 2024.", keyFacts:["7 vindkraftverk á 6 MW","Årsproduktion 130 GWh","Tillstånd mars 2024"], concerns:["Buller vid kringboende","Skuggpåverkan"], timeline:[{date:"2023-02-08",event:"Ansökan inlämnad"},{date:"2023-09-14",event:"Remiss"},{date:"2024-03-14",event:"Tillstånd meddelat"}], tags:["vindkraft","halland","varberg","hornamossen","vattenfall","lindgren","holm"] },

  { id:"LST-X-431-5900-2022", title:"Hällsbo Vindkraftpark", type:"vindkraft", status:"Beviljat", county:"Gävleborgs", municipality:"Ljusdal", location:"Hällsbo, Ljusdal", applicant:{name:"Eolus Vind AB",orgNr:"556549-1997",contact:"anders.karlsson@eolus.com"}, officer:{name:"Lena Sjöberg",unit:"Prövningsenheten"}, submitted:"2022-08-22", lastUpdated:"2023-09-30", capacity:{value:60,unit:"MW"}, turbines:10, area:530, investmentMSEK:800, duration:"25 år", description:"Vindkraftpark Hällsbo med 10 vindkraftverk i Ljusdals kommun. Eolus Vind har erhållit tillstånd och projektet beräknas driftsättas under 2025.", keyFacts:["10 vindkraftverk á 6 MW","Årsproduktion 186 GWh","Tillstånd sep 2023","Driftsättning 2025"], concerns:["Renbetesmark","Buller"], timeline:[{date:"2022-08-22",event:"Ansökan inlämnad"},{date:"2023-03-20",event:"Remiss"},{date:"2023-09-30",event:"Tillstånd meddelat"}], tags:["vindkraft","gävleborg","ljusdal","hällsbo","eolus","karlsson","sjöberg"] },

  { id:"LST-S-431-5200-2024", title:"Tisjön Vindkraftpark", type:"vindkraft", status:"Under handläggning", county:"Värmlands", municipality:"Sunne", location:"Tisjön, Sunne", applicant:{name:"OX2 AB",orgNr:"556675-7497",contact:"frida.nilsson@ox2.com"}, officer:{name:"Johan Friberg",unit:"Miljöprövningsenheten"}, submitted:"2024-04-10", lastUpdated:"2024-11-05", capacity:{value:54,unit:"MW"}, turbines:9, area:480, investmentMSEK:720, duration:"25 år", description:"Vindkraftpark Tisjön planeras i Sunne kommun med nio vindkraftverk. Projektet handläggs av Länsstyrelsen Värmland.", keyFacts:["9 vindkraftverk á 6 MW","Årsproduktion 165 GWh","Remissrunda pågår"], concerns:["Friluftsliv kring Tisjön","Buller vid fritidshus"], timeline:[{date:"2024-04-10",event:"Ansökan inlämnad"},{date:"2024-07-01",event:"Ansökan komplett"},{date:"2024-11-05",event:"Remiss utskickad"}], tags:["vindkraft","värmland","sunne","tisjön","ox2","nilsson","friberg"] },

  { id:"LST-Y-431-7500-2021", title:"Kakuberget Vindkraftpark", type:"vindkraft", status:"Beviljat", county:"Västernorrlands", municipality:"Sollefteå", location:"Kakuberget, Sollefteå", applicant:{name:"Statkraft Sverige AB",orgNr:"556699-7130",contact:"bjorn.hansen@statkraft.com"}, officer:{name:"Maria Eklund",unit:"Prövningsenheten"}, submitted:"2021-10-05", lastUpdated:"2023-02-28", capacity:{value:72,unit:"MW"}, turbines:12, area:640, investmentMSEK:950, duration:"25 år", description:"Kakuberget vindkraftpark i Sollefteå med 12 vindkraftverk. Tillstånd beviljat februari 2023. Statkraft har påbörjat förberedande markarbeten.", keyFacts:["12 vindkraftverk á 6 MW","Årsproduktion 225 GWh","Tillstånd feb 2023"], concerns:["Renbetesmark – avtal träffat"], timeline:[{date:"2021-10-05",event:"Ansökan inlämnad"},{date:"2022-08-18",event:"Remiss"},{date:"2023-02-28",event:"Tillstånd meddelat"}], tags:["vindkraft","västernorrland","sollefteå","kakuberget","statkraft","hansen","eklund"] },

  { id:"LST-O-431-8200-2024", title:"Vänerlandet Vindkraftpark", type:"vindkraft", status:"Under handläggning", county:"Västra Götalands", municipality:"Lidköping", location:"Kållandsö, Lidköping", applicant:{name:"RWE Renewables Sverige AB",orgNr:"556922-6614",contact:"anna.berg@rwe.com"}, officer:{name:"Patrik Lundh",unit:"Miljöprövningsenheten"}, submitted:"2024-06-20", lastUpdated:"2024-12-02", capacity:{value:48,unit:"MW"}, turbines:8, area:360, investmentMSEK:640, duration:"25 år", description:"Vindkraftpark på Kållandsö vid Vänern i Lidköpings kommun. Projektet har väckt uppmärksamhet kring Vänerns skyddade naturvärden.", keyFacts:["8 vindkraftverk á 6 MW","Årsproduktion 142 GWh","Remiss pågår","Vänernärheten kräver extra MKB"], concerns:["Påverkan på Vänerns naturvärden","Visuell påverkan från sjön","Fågellivet längs Vänerkusten"], timeline:[{date:"2024-06-20",event:"Ansökan inlämnad"},{date:"2024-09-08",event:"Ansökan komplett"},{date:"2024-12-02",event:"Remiss utskickad"}], tags:["vindkraft","västra götaland","lidköping","kållandsö","vänern","rwe","berg","lundh"] },

  /* ── Extra solkraft ── */
  { id:"LST-M-247-6200-2022", title:"Solpark Trelleborg", type:"solkraft", status:"Beviljat", county:"Skånes", municipality:"Trelleborg", location:"Östra Vemmenhög, Trelleborg", applicant:{name:"Alight AB",orgNr:"559069-8882",contact:"carl.holm@alight.se"}, officer:{name:"Fredrik Nilsson",unit:"Prövningsenheten"}, submitted:"2022-03-14", lastUpdated:"2023-05-30", capacity:{value:28,unit:"MW"}, turbines:null, area:72, investmentMSEK:210, duration:"30 år", description:"Solpark Östra Vemmenhög i Trelleborgs kommun på nedlagd jordbruksmark. Tillstånd beviljat maj 2023 och anläggningen togs i drift under vintern 2024.", keyFacts:["28 MW installerad effekt","Årsproduktion 28 GWh","Tillstånd maj 2023","I drift 2024"], concerns:["Omvandling av jordbruksmark"], timeline:[{date:"2022-03-14",event:"Ansökan inlämnad"},{date:"2022-12-05",event:"Remiss"},{date:"2023-05-30",event:"Tillstånd meddelat"}], tags:["solkraft","skåne","trelleborg","östra vemmenhög","alight","holm","nilsson"] },

  { id:"LST-D-247-4800-2024", title:"Solpark Katrineholm", type:"solkraft", status:"Under handläggning", county:"Södermanlands", municipality:"Katrineholm", location:"Valla, Katrineholm", applicant:{name:"Bixia Energi AB",orgNr:"556781-4441",contact:"maja.lindqvist@bixia.se"}, officer:{name:"Eva Nordin",unit:"Miljöprövningsenheten"}, submitted:"2024-03-28", lastUpdated:"2024-10-14", capacity:{value:24,unit:"MW"}, turbines:null, area:62, investmentMSEK:180, duration:"30 år", description:"Solpark i Valla utanför Katrineholm på marker med låg jordbruksproduktivitet. Remissrunda pågår med yttranden från Jordbruksverket.", keyFacts:["24 MW installerad effekt","Årsproduktion 23 GWh","Remissrunda pågår"], concerns:["Omvandling av jordbruksmark","Yttrande från Jordbruksverket inväntas"], timeline:[{date:"2024-03-28",event:"Ansökan inlämnad"},{date:"2024-06-18",event:"Ansökan komplett"},{date:"2024-10-14",event:"Remiss utskickad"}], tags:["solkraft","södermanland","katrineholm","valla","bixia","lindqvist","nordin"] },

  { id:"LST-M-247-5900-2022", title:"Solpark Kristianstad", type:"solkraft", status:"Beviljat", county:"Skånes", municipality:"Kristianstad", location:"Vä, Kristianstad", applicant:{name:"Soltech Energy AB",orgNr:"556709-9436",contact:"lisa.persson@soltech.se"}, officer:{name:"Fredrik Nilsson",unit:"Prövningsenheten"}, submitted:"2022-07-01", lastUpdated:"2023-08-22", capacity:{value:38,unit:"MW"}, turbines:null, area:100, investmentMSEK:285, duration:"30 år", description:"Solpark Vä utanför Kristianstad på åkermark. Tillstånd beviljat augusti 2023. Anläggningens energi levereras via PPA till tre lokala industriföretag.", keyFacts:["38 MW installerad effekt","PPA med lokal industri","Årsproduktion 38 GWh","Tillstånd aug 2023"], concerns:["Påverkan på jordbruksmark"], timeline:[{date:"2022-07-01",event:"Ansökan inlämnad"},{date:"2023-01-20",event:"Remiss"},{date:"2023-08-22",event:"Tillstånd meddelat"}], tags:["solkraft","skåne","kristianstad","vä","soltech","persson","nilsson"] },

  { id:"LST-O-247-7800-2024", title:"Solpark Skövde", type:"solkraft", status:"Under handläggning", county:"Västra Götalands", municipality:"Skövde", location:"Hasslum, Skövde", applicant:{name:"Svea Solar AB",orgNr:"556773-4456",contact:"tobias.lind@sveasolar.se"}, officer:{name:"Patrik Lundh",unit:"Miljöprövningsenheten"}, submitted:"2024-05-16", lastUpdated:"2024-11-18", capacity:{value:32,unit:"MW"}, turbines:null, area:84, investmentMSEK:240, duration:"30 år", description:"Solpark Hasslum i Skövde kommun på mark i utkanten av bebyggt område. Remissrunda pågår med yttranden från kommunen under sammanvägning.", keyFacts:["32 MW installerad effekt","Årsproduktion 30 GWh","Remiss pågår"], concerns:["Stadsnärheten väcker kommuninvändarnas uppmärksamhet"], timeline:[{date:"2024-05-16",event:"Ansökan inlämnad"},{date:"2024-08-01",event:"Ansökan komplett"},{date:"2024-11-18",event:"Remiss pågår"}], tags:["solkraft","västra götaland","skövde","hasslum","svea solar","lind","lundh"] },

  { id:"LST-T-247-6900-2022", title:"Solpark Örebro Sörby", type:"solkraft", status:"Beviljat", county:"Örebros", municipality:"Örebro", location:"Sörby, Örebro", applicant:{name:"BayWa r.e. Nordic AB",orgNr:"556901-4411",contact:"petra.holst@baywa-re.com"}, officer:{name:"Camilla Bengtsson",unit:"Prövningsenheten"}, submitted:"2022-05-24", lastUpdated:"2023-04-10", capacity:{value:20,unit:"MW"}, turbines:null, area:50, investmentMSEK:150, duration:"30 år", description:"Solpark Sörby utanför Örebro stad på industrimark. Tillstånd beviljat april 2023. Produktionen levereras lokalt via elnätet.", keyFacts:["20 MW installerad effekt","Industrimark – ej jordbruk","Årsproduktion 19 GWh","Tillstånd apr 2023"], concerns:["Dagvattenhantering på industrimark"], timeline:[{date:"2022-05-24",event:"Ansökan inlämnad"},{date:"2022-11-08",event:"Remiss"},{date:"2023-04-10",event:"Tillstånd meddelat"}], tags:["solkraft","örebro","sörby","baywa","industrimark","holst","bengtsson"] },

  { id:"LST-X-247-6100-2024", title:"Solpark Gävle Sätra", type:"solkraft", status:"Under handläggning", county:"Gävleborgs", municipality:"Gävle", location:"Sätra industripark, Gävle", applicant:{name:"Alight AB",orgNr:"559069-8882",contact:"martin.åberg@alight.se"}, officer:{name:"Lena Sjöberg",unit:"Miljöprövningsenheten"}, submitted:"2024-02-20", lastUpdated:"2024-09-12", capacity:{value:26,unit:"MW"}, turbines:null, area:65, investmentMSEK:195, duration:"30 år", description:"Solpark vid Sätras industripark i Gävle. Marken är planlagd för industri och lämpar sig väl för solcellsproduktion utan att ta jordbruksmark i anspråk.", keyFacts:["26 MW installerad effekt","Industrimark – planlagd","Årsproduktion 25 GWh","PPA-förhandlingar pågår"], concerns:["Hantering av dagvatten"], timeline:[{date:"2024-02-20",event:"Ansökan inlämnad"},{date:"2024-05-15",event:"Ansökan komplett"},{date:"2024-09-12",event:"Remiss utskickad"}], tags:["solkraft","gävleborg","gävle","sätra","alight","åberg","sjöberg"] },

  { id:"LST-O-247-7200-2022", title:"Solpark Lidköping", type:"solkraft", status:"Beviljat", county:"Västra Götalands", municipality:"Lidköping", location:"Råda, Lidköping", applicant:{name:"OX2 AB",orgNr:"556675-7497",contact:"emma.svensson@ox2.com"}, officer:{name:"Patrik Lundh",unit:"Prövningsenheten"}, submitted:"2022-10-10", lastUpdated:"2023-11-25", capacity:{value:34,unit:"MW"}, turbines:null, area:88, investmentMSEK:255, duration:"30 år", description:"Solpark Råda utanför Lidköping på mark nära Vänern. Tillstånd beviljat november 2023.", keyFacts:["34 MW installerad effekt","Årsproduktion 33 GWh","Tillstånd nov 2023","Nätanslutning via Lidköping"], concerns:["Visuell påverkan nära Vänern"], timeline:[{date:"2022-10-10",event:"Ansökan inlämnad"},{date:"2023-04-22",event:"Remiss"},{date:"2023-11-25",event:"Tillstånd meddelat"}], tags:["solkraft","västra götaland","lidköping","råda","ox2","svensson","lundh"] },

  { id:"LST-E-247-6800-2024", title:"Solpark Norrköping Kimstad", type:"solkraft", status:"Under handläggning", county:"Östergötlands", municipality:"Norrköping", location:"Kimstad, Norrköping", applicant:{name:"Svea Solar AB",orgNr:"556773-4456",contact:"daniel.sson@sveasolar.se"}, officer:{name:"Helena Dahl",unit:"Miljöprövningsenheten"}, submitted:"2024-04-04", lastUpdated:"2024-10-30", capacity:{value:35,unit:"MW"}, turbines:null, area:90, investmentMSEK:265, duration:"30 år", description:"Solpark i Kimstad utanför Norrköping. Markerna är tidigare militärövningsplats med begränsade naturvärden. Remissrunda pågår.", keyFacts:["35 MW installerad effekt","Tidigare militärmark","Årsproduktion 34 GWh","Remiss pågår"], concerns:["Möjlig förorening i marken att utreda","Fornlämningar i randzon"], timeline:[{date:"2024-04-04",event:"Ansökan inlämnad"},{date:"2024-07-09",event:"Ansökan komplett"},{date:"2024-10-30",event:"Remiss utskickad"}], tags:["solkraft","östergötland","norrköping","kimstad","svea solar","dahl"] },

  { id:"LST-U-247-4200-2024", title:"Solpark Västerås Hacksta", type:"solkraft", status:"Under handläggning", county:"Västmanlands", municipality:"Västerås", location:"Hacksta, Västerås", applicant:{name:"Vattenfall AB",orgNr:"556036-2138",contact:"sara.lindgren@vattenfall.com"}, officer:{name:"Thomas Lundgren",unit:"Miljöprövningsenheten"}, submitted:"2024-05-22", lastUpdated:"2024-11-22", capacity:{value:42,unit:"MW"}, turbines:null, area:108, investmentMSEK:315, duration:"30 år", description:"Solpark Hacksta utanför Västerås på mark nära Mälaren. Vattenfall planerar en av Västmanlands största solparker. Remissrunda pågår.", keyFacts:["42 MW installerad effekt","Årsproduktion 40 GWh","Mälarnärhet kräver extra hänsyn","Remiss pågår"], concerns:["Påverkan på vattenområde Mälaren","Visuell påverkan från sjön"], timeline:[{date:"2024-05-22",event:"Ansökan inlämnad"},{date:"2024-08-12",event:"Ansökan komplett"},{date:"2024-11-22",event:"Remiss utskickad"}], tags:["solkraft","västmanland","västerås","hacksta","vattenfall","lindgren"] },

  { id:"LST-F-247-6400-2022", title:"Solpark Jönköping Månsarp", type:"solkraft", status:"Beviljat", county:"Jönköpings", municipality:"Jönköping", location:"Månsarp, Jönköping", applicant:{name:"Bixia Energi AB",orgNr:"556781-4441",contact:"karin.berg@bixia.se"}, officer:{name:"Ingela Westerberg",unit:"Prövningsenheten"}, submitted:"2022-06-15", lastUpdated:"2023-07-04", capacity:{value:18,unit:"MW"}, turbines:null, area:46, investmentMSEK:135, duration:"30 år", description:"Solpark Månsarp strax utanför Jönköping på åkermark. Tillstånd beviljat juli 2023 med villkor om återställning.", keyFacts:["18 MW installerad effekt","Årsproduktion 17 GWh","Tillstånd jul 2023","Återställningsvillkor i tillståndet"], concerns:["Omvandling av åkermark"], timeline:[{date:"2022-06-15",event:"Ansökan inlämnad"},{date:"2023-01-18",event:"Remiss"},{date:"2023-07-04",event:"Tillstånd meddelat"}], tags:["solkraft","jönköping","månsarp","bixia","berg","westerberg"] },

  /* ── Extra vattenkraft ── */
  { id:"LST-AC-292-3100-2020", title:"Stornorrfors Vattenkraft Uppgradering", type:"vattenkraft", status:"Beviljat", county:"Västerbottens", municipality:"Umeå", location:"Stornorrfors, Umeå", applicant:{name:"Vattenfall AB",orgNr:"556036-2138",contact:"anna.lindberg@vattenfall.com"}, officer:{name:"Katrin Wennberg",unit:"Vattenverksamhetsenheten"}, submitted:"2020-05-18", lastUpdated:"2022-04-12", capacity:{value:590,unit:"MW"}, turbines:null, area:null, investmentMSEK:3200, duration:"40 år", description:"Modernisering av Stornorrfors kraftverk i Umeälven, ett av Sveriges kraftfullaste. Ny turbininstallation ökar effekten och förbättrar reglerkraften. Fiskvandringslösning med ny omlöpskanal ingår.", keyFacts:["590 MW installerad effekt","Omlöpskanal 540 m","Sveriges femte mest effektiva kraftverk","Tillstånd apr 2022"], concerns:["Laxvandring i Umeälven","Nedströms verksamheter","Sedimenthantering"], timeline:[{date:"2020-05-18",event:"Ansökan inlämnad"},{date:"2021-04-22",event:"Förhandling"},{date:"2022-04-12",event:"Tillstånd meddelat"}], tags:["vattenkraft","västerbotten","umeå","stornorrfors","umeälven","vattenfall","lindberg","wennberg"] },

  { id:"LST-M-292-3300-2023", title:"Lagan Vattenkraftstation Renovering", type:"vattenkraft", status:"Under handläggning", county:"Skånes", municipality:"Älmhult", location:"Lagan, Älmhult", applicant:{name:"E.ON Sverige AB",orgNr:"556056-4148",contact:"jessica.berg@eon.com"}, officer:{name:"Fredrik Nilsson",unit:"Vattenverksamhetsenheten"}, submitted:"2023-04-12", lastUpdated:"2024-08-20", capacity:{value:12,unit:"MW"}, turbines:null, area:null, investmentMSEK:85, duration:"40 år", description:"Renovering och miljöanpassning av befintlig vattenkraftstation i Lagan. Ny fiskvandringslösning och uppdaterat drifttillstånd.", keyFacts:["Effektökning 8 → 12 MW","Fiskvandringslösning ingår","Nytt tillstånd ersätter 1970-talsversion"], concerns:["Flodpärlmussla i Lagan","Ekologisk statusförbättring"], timeline:[{date:"2023-04-12",event:"Ansökan inlämnad"},{date:"2023-10-05",event:"Komplettering begärd"},{date:"2024-08-20",event:"Komplettering inlämnad"}], tags:["vattenkraft","skåne","älmhult","lagan","eon","berg","nilsson"] },

  { id:"LST-S-292-3500-2024", title:"Klarälven Reglering Karlstad", type:"vattenkraft", status:"Under handläggning", county:"Värmlands", municipality:"Karlstad", location:"Klarälven, Karlstad", applicant:{name:"Fortum Sverige AB",orgNr:"556418-5590",contact:"lars.ek@fortum.com"}, officer:{name:"Johan Friberg",unit:"Vattenverksamhetsenheten"}, submitted:"2024-02-05", lastUpdated:"2024-10-01", capacity:{value:28,unit:"MW"}, turbines:null, area:null, investmentMSEK:220, duration:"40 år", description:"Ansökan om nytt regleringsvattendomar och miljöanpassning av Fortums kraftstationer längs Klarälven. Inkluderar fiskpassager och minimumflödeskrav.", keyFacts:["5 kraftstationer längs Klarälven","Fiskpassager vid samtliga stationer","Nytt regleringsdomar"], concerns:["Flodpärlmussla","Ålflytt längs Klarälven","Sedimenttransport"], timeline:[{date:"2024-02-05",event:"Ansökan inlämnad"},{date:"2024-05-28",event:"Samråd"},{date:"2024-10-01",event:"Remiss pågår"}], tags:["vattenkraft","värmland","karlstad","klarälven","fortum","ek","friberg"] },

  { id:"LST-H-292-2800-2021", title:"Emån Vattenkraft Renovering", type:"vattenkraft", status:"Beviljat", county:"Kalmar", municipality:"Hultsfred", location:"Emån, Hultsfred", applicant:{name:"Emåns Kraft AB",orgNr:"556301-4488",contact:"bo.strand@eman.se"}, officer:{name:"Rolf Håkansson",unit:"Prövningsenheten"}, submitted:"2021-03-22", lastUpdated:"2022-09-14", capacity:{value:6,unit:"MW"}, turbines:null, area:null, investmentMSEK:48, duration:"40 år", description:"Renovering och miljöanpassning av befintliga kraftverk längs Emån med ny fiskvandringslösning. Projekt i samarbete med Länsstyrelsen Kalmar för ekologisk restaurering.", keyFacts:["3 kraftstationer renoveras","Fiskvandringsvägar byggs","Omlöpskanal 220 m","Tillstånd sep 2022"], concerns:["Emåns rika fiskfauna","Musselförekomster"], timeline:[{date:"2021-03-22",event:"Ansökan inlämnad"},{date:"2022-02-08",event:"Förhandling"},{date:"2022-09-14",event:"Tillstånd meddelat"}], tags:["vattenkraft","kalmar","hultsfred","emån","fiskvandring","strand","håkansson"] },

  /* ── Extra bioenergi ── */
  { id:"LST-E-247-5500-2021", title:"Biogasanläggning Linköping Utbyggnad", type:"bioenergi", status:"Beviljat", county:"Östergötlands", municipality:"Linköping", location:"Tekniska verken, Linköping", applicant:{name:"Tekniska verken i Linköping AB",orgNr:"556004-9725",contact:"eva.lindqvist@tekniskaverken.se"}, officer:{name:"Helena Dahl",unit:"Prövningsenheten"}, submitted:"2021-08-16", lastUpdated:"2022-10-28", capacity:{value:55,unit:"MW termisk"}, turbines:null, area:6, investmentMSEK:680, duration:"20 år", description:"Utökning av Tekniska verkens biogasanläggning i Linköping för ökad behandling av organiskt avfall. Anläggningen producerar biogas och el för regionens behov.", keyFacts:["55 MW termisk effekt","Behandlar 80 000 ton avfall/år","Biogas till fordon och kraftvärme","Tillstånd okt 2022"], concerns:["Lukt vid driftstörningar","Trafik av avfallstransporter"], timeline:[{date:"2021-08-16",event:"Ansökan inlämnad"},{date:"2022-04-12",event:"Remiss"},{date:"2022-10-28",event:"Tillstånd meddelat"}], tags:["bioenergi","biogas","östergötland","linköping","tekniska verken","lindqvist","dahl"] },

  { id:"LST-AC-247-4100-2021", title:"Bioenergi Umeå Dåva", type:"bioenergi", status:"Beviljat", county:"Västerbottens", municipality:"Umeå", location:"Dåva industripark, Umeå", applicant:{name:"UMEVA AB",orgNr:"556594-3119",contact:"per.nilsson@umeva.se"}, officer:{name:"Katrin Wennberg",unit:"Prövningsenheten"}, submitted:"2021-04-08", lastUpdated:"2022-06-18", capacity:{value:45,unit:"MW termisk"}, turbines:null, area:5, investmentMSEK:320, duration:"20 år", description:"Utbyggnad av bioenergianläggning vid Dåva industripark i Umeå. Produktionen levereras till Umeås fjärrvärmenät och minskar fossila bränslen med 85%.", keyFacts:["45 MW termisk effekt","Minskar fossila bränslen 85%","Råvara: skogsrester","Tillstånd jun 2022"], concerns:["Luftkvalitet vid hög belastning"], timeline:[{date:"2021-04-08",event:"Ansökan inlämnad"},{date:"2022-01-15",event:"Remiss"},{date:"2022-06-18",event:"Tillstånd meddelat"}], tags:["bioenergi","västerbotten","umeå","dåva","umeva","fjärrvärme","nilsson","wennberg"] },

  { id:"LST-O-247-6700-2024", title:"Biogasanläggning Göteborg Ryahamnen", type:"bioenergi", status:"Under handläggning", county:"Västra Götalands", municipality:"Göteborg", location:"Ryahamnen, Göteborg", applicant:{name:"Renova AB",orgNr:"556069-7716",contact:"anna.lindberg@renova.se"}, officer:{name:"Patrik Lundh",unit:"Miljöprövningsenheten"}, submitted:"2024-01-30", lastUpdated:"2024-09-25", capacity:{value:70,unit:"MW termisk"}, turbines:null, area:8, investmentMSEK:850, duration:"20 år", description:"Ny biogasanläggning vid Ryahamnen i Göteborg för behandling av avfall från Göteborgsregionens 13 kommuner. Produktionen ska försörja stadens busstrafik med biogas.", keyFacts:["70 MW termisk biogaseffekt","Avfall från 13 kommuner","Biogas till bussar och tung trafik","Remiss pågår"], concerns:["Lukt vid Hisingen","Transport av organiskt avfall","Hamnnärhet – sjösäkerhet"], timeline:[{date:"2024-01-30",event:"Ansökan inlämnad"},{date:"2024-05-12",event:"Ansökan komplett"},{date:"2024-09-25",event:"Remiss utskickad"}], tags:["bioenergi","biogas","västra götaland","göteborg","ryahamnen","renova","hisingen","lindberg","lundh"] },

  { id:"LST-D-247-4300-2021", title:"Biogasanläggning Eskilstuna", type:"bioenergi", status:"Beviljat", county:"Södermanlands", municipality:"Eskilstuna", location:"Lövsta, Eskilstuna", applicant:{name:"Eskilstuna Energi och Miljö AB",orgNr:"556005-4913",contact:"mikael.strand@esem.se"}, officer:{name:"Eva Nordin",unit:"Prövningsenheten"}, submitted:"2021-11-22", lastUpdated:"2022-12-14", capacity:{value:28,unit:"MW termisk"}, turbines:null, area:4, investmentMSEK:240, duration:"20 år", description:"Biogasanläggning vid Lövsta reningsverk i Eskilstuna för rötning av slam och organiskt hushållsavfall. Tillstånd beviljat december 2022.", keyFacts:["28 MW termisk effekt","Slam + hushållsavfall","Biogödsel tillbaka till lantbruk","Tillstånd dec 2022"], concerns:["Lukt nära bostadsbebyggelse"], timeline:[{date:"2021-11-22",event:"Ansökan inlämnad"},{date:"2022-06-10",event:"Remiss"},{date:"2022-12-14",event:"Tillstånd meddelat"}], tags:["bioenergi","biogas","södermanland","eskilstuna","lövsta","esem","strand","nordin"] },

  /* ── Extra batteri & vätgas ── */
  { id:"LST-O-575-5100-2023", title:"Batterilager Göteborg Arendal", type:"batteri", status:"Beviljat", county:"Västra Götalands", municipality:"Göteborg", location:"Arendal, Göteborg", applicant:{name:"Stena Fastigheter AB",orgNr:"556072-1384",contact:"lisa.berg@stena.com"}, officer:{name:"Patrik Lundh",unit:"Prövningsenheten"}, submitted:"2023-01-12", lastUpdated:"2023-12-20", capacity:{value:150,unit:"MWh"}, turbines:null, area:2, investmentMSEK:360, duration:"20 år", description:"Storskalig batterilagringsanläggning vid Arendal i Göteborg. Litiumjonbatterier levererar frekvensreglering (FCR) och elmarknadstjänster till Göteborg-regionen.", keyFacts:["150 MWh lagringskapacitet","75 MW effektuttag","FCR-tjänster till Svenska kraftnät","Tillstånd dec 2023"], concerns:["Brandrisker – LFP-batterier","Buller från kylsystem"], timeline:[{date:"2023-01-12",event:"Ansökan inlämnad"},{date:"2023-07-08",event:"Remiss"},{date:"2023-12-20",event:"Tillstånd meddelat"}], tags:["batteri","energilagring","västra götaland","göteborg","arendal","stena","litiumjon","berg","lundh"] },

  { id:"LST-M-575-5300-2024", title:"Batterilager Malmö Norra Hamnen", type:"batteri", status:"Under handläggning", county:"Skånes", municipality:"Malmö", location:"Norra Hamnen, Malmö", applicant:{name:"Siemens Energy AB",orgNr:"556123-7841",contact:"henrik.sson@siemens-energy.com"}, officer:{name:"Fredrik Nilsson",unit:"Miljöprövningsenheten"}, submitted:"2024-03-01", lastUpdated:"2024-10-18", capacity:{value:250,unit:"MWh"}, turbines:null, area:3, investmentMSEK:600, duration:"20 år", description:"Batterianläggning vid Norra Hamnen i Malmö för stöd till regionens elnät och Öresundsintegration med danska elnätet. Remissrunda pågår.", keyFacts:["250 MWh lagringskapacitet","125 MW effektuttag","Stöd för Öresundsintegration","Remiss pågår"], concerns:["Brandrisker i hamnmiljö","Kylsystem buller"], timeline:[{date:"2024-03-01",event:"Ansökan inlämnad"},{date:"2024-06-14",event:"Ansökan komplett"},{date:"2024-10-18",event:"Remiss utskickad"}], tags:["batteri","energilagring","skåne","malmö","norra hamnen","siemens","öresund","nilsson"] },

  { id:"LST-O-575-6200-2024", title:"Vätgas Elektrolys Göteborg Hisingen", type:"batteri", status:"Under handläggning", county:"Västra Götalands", municipality:"Göteborg", location:"Hisingen industrizon, Göteborg", applicant:{name:"Preem AB",orgNr:"556072-6478",contact:"anders.berg@preem.se"}, officer:{name:"Patrik Lundh",unit:"Miljöprövningsenheten"}, submitted:"2024-04-14", lastUpdated:"2024-11-28", capacity:{value:200,unit:"MW elektrolys"}, turbines:null, area:8, investmentMSEK:3500, duration:"30 år", description:"Storskalig vätgaselektrolys på Hisingens industrizon i Göteborg. Preem planerar att producera grön vätgas för raffinaderiprocesser och framtida bränsleproduktion, vilket eliminerar 900 000 ton CO₂ per år.", keyFacts:["200 MW elektrolyskapacitet","Grön vätgas för Preems raffinaderi","Eliminerar 900 000 ton CO₂/år","Kräver 1,8 TWh el per år"], concerns:["Enorm elkonsumtion – nätkapacitet","Lagring och distribution av vätgas","Brandrisker"], timeline:[{date:"2024-04-14",event:"Ansökan inlämnad"},{date:"2024-07-01",event:"Ansökan komplett"},{date:"2024-11-28",event:"Remiss pågår"}], tags:["vätgas","batteri","västra götaland","göteborg","hisingen","preem","raffinaderi","grön energi","berg","lundh"] },

  { id:"LST-C-575-4800-2023", title:"Energilagring Uppsala Boländerna", type:"batteri", status:"Beviljat", county:"Uppsala", municipality:"Uppsala", location:"Boländerna, Uppsala", applicant:{name:"Vattenfall AB",orgNr:"556036-2138",contact:"cecilia.lindén@vattenfall.com"}, officer:{name:"Thomas Lundgren",unit:"Prövningsenheten"}, submitted:"2023-03-20", lastUpdated:"2024-02-05", capacity:{value:180,unit:"MWh"}, turbines:null, area:2, investmentMSEK:432, duration:"20 år", description:"Batterilagring vid Boländernas industripark i Uppsala. Anläggningen bidrar till frekvensreglering i norra elnätszonen och möjliggör ökad andel vindkraft i systemet.", keyFacts:["180 MWh lagringskapacitet","90 MW effektuttag","Frekvensreglering elnätszon 3","Tillstånd feb 2024"], concerns:["Brandrisker – LFP-batterier"], timeline:[{date:"2023-03-20",event:"Ansökan inlämnad"},{date:"2023-09-18",event:"Remiss"},{date:"2024-02-05",event:"Tillstånd meddelat"}], tags:["batteri","energilagring","uppsala","boländerna","vattenfall","lindén","lundgren"] }
];

/* ============================================================
   LIVE DATA — Vindbrukskollen (Energimyndigheten)
   Havsbaserade vindkraftsprojekt via offentligt ArcGIS API
   Obs: CORS kräver att sidan körs via en webbserver (ej file://)
   ============================================================ */
const VBK_BASE = 'https://ext-geodata-applikationer.lansstyrelsen.se/arcgis/rest/services/VBK/lst_vbk_read/MapServer';

// Layer-id → status mapping
const VBK_LAYER_STATUS = {
  68: 'Beviljat',        // Uppförd havsbaserad
  69: 'Beviljat',        // Tillståndsansökan beviljad
  70: 'Beviljat',        // Ändringsansökan (beviljad)
  71: 'Avslaget',        // Avslagen
  72: 'Överklagat',      // Överklagad
  73: 'Under handläggning', // Tillståndsansökan inlämnad
  74: 'Under handläggning', // Samråd inför ansökan
  75: 'Under handläggning', // Inledande undersökningar
};

function mapVBKFeature(attrs, layerId) {
  const ts = ms => ms ? new Date(ms).toISOString().slice(0, 10) : null;
  const name  = (attrs.HAVSPARKNAMN || '').trim() || 'Havsbaserad vindkraftpark';
  const lan   = (attrs.LANSNAMN || '').replace(' län', '').trim();
  const kom   = (attrs.KOMNAMN  || '').trim();
  const org   = (attrs.Orgnamn  || '').trim();
  const eff   = attrs.InstallEff || null;
  const ant   = attrs.Beviljant  || attrs.planantmax || null;
  const ghw   = attrs.BeraknadGWh || null;
  const hoj   = attrs.BevMaxHojd || null;
  const date1 = ts(attrs.ANSOKINL || attrs.ANSOKTILLST);
  const date2 = ts(attrs.SenasteUppdaterat);

  const facts = [
    ant  ? `${ant} havsbaserade vindkraftverk` : 'Antal verk ej fastställt',
    hoj  ? `Max totalhöjd ${hoj} m` : null,
    eff  ? `Installerad effekt ${eff} MW` : null,
    ghw  ? `Beräknad årsproduktion ${ghw} GWh` : null,
    attrs.DNR ? `Dnr: ${attrs.DNR}` : 'Havsbaserat projekt – Länsstyrelsen',
  ].filter(Boolean);

  const timeline = [
    date1 && { date: date1, event: 'Tillståndsansökan inlämnad' },
    date2 && date2 !== date1 && { date: date2, event: 'Senast uppdaterat i Vindbrukskollen' },
  ].filter(Boolean);
  if (!timeline.length) timeline.push({ date: '2024-01-01', event: 'Registrerat i Vindbrukskollen' });

  return {
    id: `VBK-${attrs.OMRID || Math.random().toString(36).slice(2, 8)}`,
    title: name,
    type: 'vindkraft',
    status: VBK_LAYER_STATUS[layerId] || 'Under handläggning',
    county: lan || 'Okänt',
    municipality: kom || 'Okänt',
    location: [kom, lan ? lan + ' län' : ''].filter(Boolean).join(', ') || 'Havsbaserad',
    applicant: { name: org || 'Okänd sökande', orgNr: attrs.Orgnr || '—', contact: '—' },
    officer: { name: '—', unit: 'Länsstyrelsen' },
    submitted: date1 || '—',
    lastUpdated: date2 || date1 || '—',
    capacity: eff ? { value: eff, unit: 'MW' } : null,
    turbines: ant,
    area: null,
    investmentMSEK: null,
    duration: '25 år',
    description: `Havsbaserat vindkraftsprojekt – ${name}. Sökande: ${org || 'ej angiven'}. Lokalisering: ${[kom, lan].filter(Boolean).join(', ')}. ${ghw ? 'Beräknad årsproduktion: ' + ghw + ' GWh.' : ''} Källa: Vindbrukskollen (Energimyndigheten/Länsstyrelsen).`,
    keyFacts: facts,
    concerns: ['Påverkan på marina ekosystem och bottenfauna', 'Sjöfartssäkerhet', 'Påverkan på fiske och fiskenäring'],
    timeline,
    tags: ['vindkraft', 'havsbaserad', 'offshore', lan.toLowerCase(), kom.toLowerCase(), org.toLowerCase().split(' ')[0], 'vindbrukskollen'].filter(t => t && t.length > 1),
    _live: true,
  };
}

async function fetchVBKProjects() {
  // On Vercel (https) use the serverless API — avoids CORS issues and gets more data
  const onVercel = window.location.protocol === 'https:' || window.location.hostname.endsWith('.vercel.app');
  if (onVercel) {
    const res  = await fetch('/api/projects', { signal: AbortSignal.timeout(25000) });
    const data = await res.json();
    if (data.ok && Array.isArray(data.projects) && data.projects.length > 0) {
      return data.projects;
    }
    return [];
  }

  // Localhost fallback: fetch offshore layers directly from ArcGIS
  const layers = [69, 73, 74, 72, 71, 68, 75, 70];
  const fields = 'OMRID,HAVSPARKNAMN,Orgnamn,Orgnr,ArendeStatus,DNR,ANSOKINL,ANSOKTILLST,SenasteUppdaterat,Beviljant,planantmax,BevMaxHojd,InstallEff,BeraknadGWh,KOMNAMN,LANSNAMN';
  const seen   = new Set();
  const result = [];

  await Promise.allSettled(layers.map(async layerId => {
    const url = `${VBK_BASE}/${layerId}/query?where=1%3D1&outFields=${encodeURIComponent(fields)}&returnGeometry=false&f=json&resultRecordCount=500`;
    const res  = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const data = await res.json();
    if (!Array.isArray(data.features)) return;
    for (const feat of data.features) {
      const key = feat.attributes.OMRID;
      if (key && seen.has(key)) continue;
      if (key) seen.add(key);
      result.push(mapVBKFeature(feat.attributes, layerId));
    }
  }));

  return result;
}

/* ============================================================
   STATE
   ============================================================ */
// ALL_PROJECTS is populated at init and extended with live data
let ALL_PROJECTS = [...PROJECTS];

const state = {
  query: '',
  activeFilter: 'alla',
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

function search(query, filter) {
  const tokens = tokenize(query);
  const hasQuery = tokens.length > 0;

  let results = ALL_PROJECTS.map(p => {
    // Type / subtype filtering
    if (filter === 'offshore') {
      if (!(p.type === 'vindkraft' && (p.subtype === 'offshore' || p.id.startsWith('VBK-HAV')))) return null;
    } else if (filter === 'onshore') {
      if (!(p.type === 'vindkraft' && (p.subtype === 'onshore' || p.id.startsWith('VBK-LAND')))) return null;
    } else if (filter !== 'alla') {
      if (p.type !== filter) return null;
    }

    // Hide rejected projects unless specifically filtered
    if (filter !== 'avslagna' && p.status === 'Avslaget') return null;

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
    // Browse mode: offshore first, then onshore, sorted by date
    const order = p =>
      p.id.startsWith('VBK-HAV') ? 0 : p.id.startsWith('VBK-LAND') ? 1 : 2;
    results.sort((a, b) => {
      const od = order(a.project) - order(b.project);
      if (od !== 0) return od;
      return b.project.lastUpdated.localeCompare(a.project.lastUpdated);
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
  const days = daysBetween(p.submitted, p.lastUpdated);

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

  // ─── Timeline velocity ───
  let velocity;
  if (days < 150) {
    velocity = `Handläggningstakten är hög. Med ${days} dagar från inlämning till senaste uppdatering befinner sig ärendet klart under genomsnittlig handläggningstid för motsvarande ärendetyp (ca 18–24 månader).`;
  } else if (days < 400) {
    velocity = `Handläggningstiden om ${days} dagar är inom normalt spann för ${p.type}projekt med denna geografiska och tekniska profil. Processen fortskrider enligt gängse ärendegång.`;
  } else {
    velocity = `Ärendet har pågått under ${days} dagar, vilket överstiger typisk handläggningstid. Det kan indikera komplexa utredningsbehov, kompletteringsbegäran eller överklagandeprocesser som förlängt ärendet.`;
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

  // ─── Assemble HTML ───
  let html = `
    <div class="analysis-paragraphs">
      <p class="analysis-p">${complexity}</p>
      <p class="analysis-p">${velocity}</p>
      <p class="analysis-p">${scale}</p>
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

function typeLabel(type) {
  const map = {
    vindkraft:   'Vindkraft',
    solkraft:    'Solkraft',
    vattenkraft: 'Vattenkraft',
    bioenergi:   'Bioenergi',
    batteri:     'Energilagring',
  };
  return map[type] || type;
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
      <span class="type-dot ${p.type}"></span>
      <span class="type-label">${typeLabel(p.type)}</span>
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
  const sortEl  = document.getElementById('resultsSort');

  const results = state.results;
  const hasQuery = state.query.length > 1;

  countEl.textContent = results.length === 0
    ? 'Inga träffar'
    : `${results.length} projekt${hasQuery ? ' hittade' : ''}`;

  sortEl.textContent = hasQuery ? 'Sorterat efter relevans' : 'Sorterat efter datum';

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
  const area = p.area != null ? `${p.area.toLocaleString('sv-SE')} ha` : '—';
  const inv  = p.investmentMSEK != null ? `${p.investmentMSEK.toLocaleString('sv-SE')} MSEK` : 'Ej angiven';
  const dur  = p.duration || '—';

  panel.innerHTML = `
    <!-- Header -->
    <div class="dp-header">
      <div class="dp-header-top">
        <span class="dp-type-badge ${p.type}">${typeLabel(p.type)}</span>
        <span class="dp-status-badge card-status ${statusClass(p.status)}">${p.status}</span>
      </div>
      <h1 class="dp-title">${p.title}</h1>
      <div class="dp-subtitle">${p.location} · ${p.county} län</div>
      <div class="dp-id">${p.id}</div>
    </div>

    <!-- Metrics strip -->
    <div class="metrics-strip">
      <div class="metric-card">
        <div class="metric-label">Kapacitet</div>
        <div class="metric-value">${cap}</div>
        <div class="metric-unit">installerad effekt</div>
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

    <!-- Summary -->
    <div class="dp-section">
      <div class="dp-section-title">Projektöversikt</div>
      <p class="dp-summary">${p.description}</p>
    </div>

    <!-- Info grid: Applicant + Officer -->
    <div class="dp-section">
      <div class="dp-section-title">Inblandade parter</div>
      <div class="dp-info-grid">
        <div class="dp-info-box">
          <div class="dp-info-box-title">Sökande</div>
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
        </div>
        <div class="dp-info-box">
          <div class="dp-info-box-title">Handläggning</div>
          <div class="dp-info-row">
            <span class="dp-info-key">Handläggare</span>
            <span class="dp-info-val">${p.officer.name}</span>
          </div>
          <div class="dp-info-row">
            <span class="dp-info-key">Enhet</span>
            <span class="dp-info-val">${p.officer.unit}</span>
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
  state.results = search(state.query, state.activeFilter);
  renderResultsList();

  // Re-render detail if selected project no longer in results
  if (state.selectedId) {
    const stillVisible = state.results.find(r => r.project.id === state.selectedId);
    if (!stillVisible) {
      state.selectedId = null;
      renderDetailEmpty();
    }
  }
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

// Filter chips (event delegation)
document.getElementById('chips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  state.activeFilter = chip.dataset.filter;
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
function setLiveStatus(state) {
  const el = document.getElementById('liveStatus');
  if (!el) return;
  const msgs = {
    loading: '<span class="ls-dot ls-spin"></span> Hämtar live-data från Vindbrukskollen…',
    live:    '<span class="ls-dot ls-green"></span> <strong id="liveCount"></strong> projekt live från Vindbrukskollen (Energimyndigheten)',
    local:   '<span class="ls-dot ls-grey"></span> Visar lokal databas — live-data laddas på Vercel',
  };
  el.innerHTML = msgs[state] || '';
}

async function init() {
  // Index local projects
  ALL_PROJECTS.forEach(p => {
    p._index  = buildSearchIndex(p);
    p.typLabel = typeLabel(p.type);
  });

  // Initial render
  applySearch();
  renderDetailEmpty();
  updateNavCounters();

  // Try live fetch from Vindbrukskollen
  setLiveStatus('loading');
  try {
    const live = await fetchVBKProjects();
    if (live.length > 0) {
      live.forEach(p => { p._index = buildSearchIndex(p); p.typLabel = typeLabel(p.type); });
      // Deduplicate: keep live projects + local non-offshore projects
      ALL_PROJECTS = [...live, ...PROJECTS];
      applySearch();
      updateNavCounters();
      setLiveStatus('live');
      const cnt = document.getElementById('liveCount');
      if (cnt) cnt.textContent = live.length;
    } else {
      setLiveStatus('local');
    }
  } catch (_) {
    setLiveStatus('local');
  }
}

document.addEventListener('DOMContentLoaded', init);
