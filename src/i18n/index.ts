import { site } from "../data/site";

export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

// Locales currently routed and built. Italian is temporarily disabled:
// its translations and content stay maintained below, but no /it/ pages
// are generated and no hreflang alternates are emitted. To re-enable,
// add "it" back here and restore src/pages/it/ (git history has them).
export const activeLocales: Locale[] = ["en"];

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && locales.includes(value as Locale);

export const localize = (value: LocalizedText, locale: Locale) => value[locale];

const en = {
  meta: {
    lang: "en",
    ogLocale: "en_US",
    title: `${site.name} — ${site.tagline}`,
    description: site.meta.description,
  },
  nav: {
    header: "Site header",
    primary: "Primary navigation",
    language: "Language selection",
    brand: "Luca Fregoso, home",
    work: "Work",
    lately: "Lately",
    talks: "Talks",
    writing: "Media & writing",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    archive: "Archive",
    chooseLanguage: "Choose language. Current language: English",
    closeLanguage: "Close language selection",
    languages: { en: "English", it: "Italian" },
  },
  theme: { dark: "Switch to dark mode", light: "Switch to light mode" },
  skip: "Skip to content",
  externalNewTab: "opens in a new tab",
  hero: {
    name: site.name,
    role: `${site.tagline} — DevRel, technical presales & training`,
    headline: site.headline,
    intro: site.intro,
    proof: site.proof,
    primary: "Work with me",
    secondary: "See selected work",
    profileLinks: "Profile links",
    cv: "CV (PDF)",
    imageAlt:
      "Luca Fregoso hosting on stage at Codemotion Conference Milan 2025.",
    imageContext: "On stage",
    imagePlace: "Codemotion · Milan · 2025",
  },
  metrics: site.metrics,
  intersections: site.intersections,
  work: {
    title: "Work",
    intro:
      "I am the glue between tech, business and community. Code, sales rooms, conference stages and classrooms — call it DevRel, presales or program management, the job is the same: getting worlds that don't speak the same language to ship one thing together.",
  },
  lately: {
    title: "Lately",
    updated: "Updated",
    intro: "Recent work from programs, stages and the communities around them.",
    upcoming: "upcoming",
    showEarlier: (count: number) => `Show ${count} earlier updates`,
    archiveCta: "View the full archive",
    kinds: {
      speaking: "on stage",
      writing: "wrote",
      milestone: "milestone",
      building: "shipped",
      note: "note",
    },
    read: (platform: string) => `Read it on ${platform}`,
    readFull: (platform: string) => `Read the full post on ${platform}`,
    inItalian: "(in Italian)",
  },
  talks: {
    title: "Talks",
    intro:
      "Selected sessions about tech careers, hiring and the tools we use to think — delivered in English or Italian.",
    status: "session",
    view: "View session",
    fullProfile: "Full speaker profile",
  },
  writing: {
    title: "Media & writing",
    intro:
      "Recordings and writing about developer careers, technology and the decisions behind good programs.",
    article: "article",
    inItalian: "in Italian",
  },
  archive: {
    title: "Archive.",
    metaTitle: `${site.name} — Archive`,
    intro:
      "A filtered archive of updates, articles, recordings and stage work.",
    all: "All",
    filterLabel: "Filter archive entries",
    empty: "No entries match this filter.",
    pageStatus: (shown: number, total: number) =>
      `${shown} of ${total} entries shown`,
    previous: "Previous",
    next: "Next",
    filters: {
      speaking: "on stage",
      writing: "wrote",
      milestone: "milestone",
      building: "shipped",
      note: "note",
      article: "article",
      video: "video",
      "live-recording": "live recording",
      podcast: "podcast",
    },
  },
  appearances: {
    watch: "Watch on YouTube",
    listen: "Listen on Spotify",
    formats: {
      video: "video",
      "live-recording": "live recording",
      podcast: "podcast",
    },
    roles: { host: "host", speaker: "speaker", guest: "guest" },
    inItalian: "in Italian",
  },
  contact: {
    title: "Bring me the complicated brief.",
    intro:
      "If you are shaping a DevRel motion, a presales cycle, an event or a training program that needs to hold up in front of skilled people, we can talk. I work remote by default (CET, plenty of EU/US overlap), in English or Italian, as a consultant or embedded in your team.",
    linkedin: "Connect on LinkedIn",
    cv: "View CV (PDF)",
    socials: "Social profiles",
    colophon: "Built with Astro. Updated by hand, on purpose.",
  },
  egg: {
    aria: "A note from Luca",
    command: "whoami",
    output:
      "Developer at heart, program designer by trade. Still with me? I like you already — say hi ↓",
  },
  email: {
    reveal: "Email me",
    action: "Email me",
    copy: "Copy address",
    copied: "Copied",
    revealed: "Email address revealed.",
    copiedStatus: "Email address copied to clipboard.",
    failed: "Copy failed. Select the email address shown above.",
  },
  media: {
    openImage: "Open image",
    readFull: "Read the full post",
    viewPhotos: (count: number) => `View ${count} photos`,
  },
  lightbox: {
    viewer: "Image viewer",
    close: "Close image viewer",
    previous: "Previous image",
    next: "Next image",
    imageOf: (position: number, total: number) =>
      `Image ${position} of ${total}`,
    opened: "Image viewer opened.",
  },
  devtools:
    "You opened the devtools. Of course you did.\nBuilt by hand with Astro. Say hi via the contact section.",
} as const;

const it = {
  meta: {
    lang: "it",
    ogLocale: "it_IT",
    title: `${site.name} — Programmi per developer e contenuti tecnici`,
    description:
      "Developer Relations (DevRel), presales tecnico e programmi per developer — oltre 20 anni nel tech, 15 dei quali nello sviluppo software. Luca Fregoso progetta agende per conferenze, percorsi di formazione, narrative tecniche e solution engineering per prodotti developer-facing.",
  },
  nav: {
    header: "Intestazione del sito",
    primary: "Navigazione principale",
    language: "Selezione lingua",
    brand: "Luca Fregoso, home",
    work: "Lavoro",
    lately: "Ultimamente",
    talks: "Talk",
    writing: "Media e articoli",
    contact: "Contatti",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    archive: "Archivio",
    chooseLanguage: "Scegli la lingua. Lingua attuale: Italiano",
    closeLanguage: "Chiudi la selezione della lingua",
    languages: { en: "Inglese", it: "Italiano" },
  },
  theme: { dark: "Passa al tema scuro", light: "Passa al tema chiaro" },
  skip: "Vai al contenuto",
  externalNewTab: "si apre in una nuova scheda",
  hero: {
    name: site.name,
    role: `${site.tagline} — DevRel, presales e formazione · Italia, da remoto con team internazionali`,
    headline: "Progetto programmi tecnici di cui le persone si fidano.",
    intro:
      "Dalle agende delle conferenze europee ai tavoli presales, trasformo centinaia di input, priorità in conflitto e idee ancora abbozzate in programmi chiari che vanno davvero in porto.",
    proof:
      "Il codice l’ho scritto e venduto — prima nelle web agency, poi con la mia — prima di passare ai programmi. Engineer, commerciali e speaker ricevono da me la stessa risposta, senza giri di parole.",
    primary: "Lavoriamo insieme",
    secondary: "Scopri i progetti selezionati",
    profileLinks: "Link professionali",
    cv: "CV (PDF in inglese)",
    imageAlt:
      "Luca Fregoso sul palco come host alla Codemotion Conference di Milano 2025.",
    imageContext: "Sul palco",
    imagePlace: "Codemotion · Milano · 2025",
  },
  metrics: [
    {
      value: "20+ anni",
      label: "nel tech — 15 passati a sviluppare software e programmi tecnici",
    },
    {
      value: "5.000+",
      label: "proposte valutate tra CFP e comitati per conferenze",
    },
    {
      value: "20+ percorsi",
      label:
        "percorsi formativi su misura progettati guidando una business unit academy",
    },
  ],
  intersections: [
    {
      id: "business",
      axis: "Business × Engineering",
      title: "Trasformare le promesse commerciali in software consegnato",
      summary:
        "Sto in mezzo tra clienti, commerciali ed engineering — trovo la richiesta vera, metto alla prova le promesse e definisco un piano su cui l'engineering può impegnarsi.",
      stat: {
        value: "pitch → prod",
        label:
          "presales tecnico: dalla prima telefonata commerciale a un piano di delivery che regge",
      },
      href: "#contact",
      linkLabel: "Parliamo di un brief complesso",
    },
    {
      id: "community",
      axis: "Community × Engineering",
      title: "Costruire agende autorevoli in Europa",
      summary:
        "Comitati internazionali, CFP e selezione speaker per sette edizioni Codemotion tra Milano, Madrid e Roma — sale da 2.000–3.000 developer ogni volta.",
      stat: {
        value: "600 → 1",
        label: "proposte per edizione in un'unica agenda equilibrata",
      },
      href: "#talks",
      linkLabel: "Scopri i talk",
    },
    {
      id: "people",
      axis: "People × Engineering",
      title: "Creare un'academy tecnica da zero",
      summary:
        "Progettazione del programma, modello di formazione e gestione quotidiana di una business unit academy.",
      stat: {
        value: "0 → 1",
        label:
          "un'academy che non esisteva, diventata una business unit operativa",
      },
      href: "/cv.pdf",
      linkLabel: "Leggi il CV completo",
      download: true,
    },
  ],
  work: {
    title: "Lavoro",
    intro:
      "Sono il collante tra tech, business e community. Codice, sale vendita, palchi e aule — chiamalo DevRel, presales o program management, il mestiere è lo stesso: far costruire la stessa cosa a mondi che non parlano la stessa lingua.",
  },
  lately: {
    title: "Ultimamente",
    updated: "Aggiornato",
    intro:
      "Il lavoro recente tra programmi, palchi e le community che li rendono possibili.",
    upcoming: "in arrivo",
    showEarlier: (count: number) => `Mostra altri ${count} aggiornamenti`,
    archiveCta: "Vedi tutto l’archivio",
    kinds: {
      speaking: "sul palco",
      writing: "articolo",
      milestone: "traguardo",
      building: "progetto",
      note: "nota",
    },
    read: (platform: string) => `Leggi su ${platform}`,
    readFull: (platform: string) => `Leggi il post completo su ${platform}`,
    inItalian: "(in italiano)",
  },
  talks: {
    title: "Talk",
    intro:
      "Una selezione di sessioni su carriere tech, recruiting e strumenti che usiamo per pensare — in italiano o in inglese.",
    status: "sessione",
    view: "Vedi la sessione",
    fullProfile: "Profilo speaker completo",
  },
  writing: {
    title: "Media e articoli",
    intro:
      "Registrazioni, podcast e articoli su carriere tech, tecnologia e le decisioni che rendono efficace un buon programma.",
    article: "articolo",
    inItalian: "in italiano",
  },
  archive: {
    title: "Archivio.",
    metaTitle: `${site.name} — Archivio`,
    intro:
      "Un archivio filtrabile di aggiornamenti, articoli, registrazioni e attività sul palco.",
    all: "Tutto",
    filterLabel: "Filtra le voci dell’archivio",
    empty: "Nessuna voce corrisponde a questo filtro.",
    pageStatus: (shown: number, total: number) =>
      `${shown} di ${total} voci mostrate`,
    previous: "Precedente",
    next: "Successiva",
    filters: {
      speaking: "sul palco",
      writing: "articolo",
      milestone: "traguardo",
      building: "progetto",
      note: "nota",
      article: "articolo",
      video: "video",
      "live-recording": "registrazione live",
      podcast: "podcast",
    },
  },
  appearances: {
    watch: "Guarda su YouTube",
    listen: "Ascolta su Spotify",
    formats: {
      video: "video",
      "live-recording": "registrazione live",
      podcast: "podcast",
    },
    roles: { host: "host", speaker: "speaker", guest: "ospite" },
    inItalian: "in italiano",
  },
  contact: {
    title: "Portami il brief più complicato.",
    intro:
      "Se stai costruendo un'attività di DevRel, un ciclo di presales, un evento o un programma di formazione che deve reggere davanti a persone competenti, possiamo parlarne. Lavoro da remoto — fuso CET, con ampia sovrapposizione su Europa e USA — in inglese o in italiano, come consulente o dentro il tuo team.",
    linkedin: "Collegati su LinkedIn",
    cv: "Vedi il CV (PDF in inglese)",
    socials: "Profili social",
    colophon: "Costruito con Astro. Aggiornato a mano, di proposito.",
  },
  egg: {
    aria: "Una nota di Luca",
    command: "whoami",
    output:
      "Developer nell'anima, progettista di programmi di mestiere. Ancora qui? Mi piaci già — scrivimi ↓",
  },
  email: {
    reveal: "Scrivimi",
    action: "Scrivimi",
    copy: "Copia indirizzo",
    copied: "Copiato",
    revealed: "Indirizzo email mostrato.",
    copiedStatus: "Indirizzo email copiato negli appunti.",
    failed:
      "Copia non riuscita. Seleziona l’indirizzo email mostrato qui sopra.",
  },
  media: {
    openImage: "Apri immagine",
    readFull: "Leggi il post completo",
    viewPhotos: (count: number) => `Vedi ${count} foto`,
  },
  lightbox: {
    viewer: "Visualizzatore immagini",
    close: "Chiudi il visualizzatore",
    previous: "Immagine precedente",
    next: "Immagine successiva",
    imageOf: (position: number, total: number) =>
      `Immagine ${position} di ${total}`,
    opened: "Visualizzatore immagini aperto.",
  },
  devtools:
    "Hai aperto i devtools. Ovvio che l'hai fatto.\nFatto a mano con Astro. Scrivimi dalla sezione contatti.",
};

export const translations = { en, it } as const;
export type Translation = (typeof translations)[Locale];
