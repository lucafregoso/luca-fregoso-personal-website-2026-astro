import { site } from "../data/site";

export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

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
    role: `${site.tagline} — La Spezia, Italy`,
    headline: site.headline,
    intro: site.intro,
    proof: site.proof,
    primary: "Discuss a complex brief",
    secondary: "See selected work",
    profileLinks: "Profile links",
    cv: "CV (PDF)",
    imageAlt:
      "Luca Fregoso hosting on stage at Docebo GAME UP! Product Power Up 2026.",
    imageContext: "On stage",
    imagePlace: "Docebo · Milan · 2026",
  },
  metrics: site.metrics,
  intersections: site.intersections,
  work: {
    title: "Work",
    intro:
      "I am the glue between tech, business and community. Code, sales rooms, conference stages and classrooms — the same job every time: joining sides that don't speak each other's language, with results to show for it.",
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
  },
  talks: {
    title: "Talks",
    intro:
      "Talks for people navigating change: selected sessions about technical careers, hiring and the tools we use to think.",
    status: "session",
    view: "View session",
    fullProfile: "Full speaker profile",
  },
  writing: {
    title: "Media & writing",
    intro:
      "Recordings, podcasts and articles about developer careers, technology and the decisions behind good programs.",
    article: "article",
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
  },
  contact: {
    title: "Bring me the complicated brief.",
    intro:
      "If you are shaping a developer program, a technical proposal, an event or a learning path that needs to hold up in front of skilled people, we can talk.",
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
      "Programmi per developer, contenuti tecnici e prevendita con oltre 20 anni nel tech, 15 dei quali nello sviluppo software. Luca Fregoso progetta agende, percorsi formativi, narrative tecniche e programmi per community di developer.",
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
    role: `${site.tagline} — La Spezia, Italia`,
    headline: "Progetto programmi tecnici di cui le persone si fidano.",
    intro:
      "Dalle agende delle conferenze europee alle soluzioni enterprise, trasformo centinaia di input, priorità in competizione e promesse ancora vaghe in programmi chiari che possono davvero essere realizzati.",
    proof:
      "Più di vent’anni nel tech — quindici passati a sviluppare software — mi permettono di muovermi tra codice, contenuti, prevendita, formazione e platee di developer senza perdere il filo tecnico.",
    primary: "Parliamo di un brief complesso",
    secondary: "Scopri i progetti selezionati",
    profileLinks: "Link professionali",
    cv: "CV (PDF in inglese)",
    imageAlt:
      "Luca Fregoso sul palco come host di Docebo GAME UP! Product Power Up 2026.",
    imageContext: "Sul palco",
    imagePlace: "Docebo · Milano · 2026",
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
      title: "Il collante tra strategia e delivery",
      summary:
        "Lavoro tra clienti, vendite ed engineering come traduttore e orchestratore: faccio emergere il bisogno reale, metto alla prova le ipotesi, do forma a un lavoro che passa dal pitch alla produzione.",
      stat: {
        value: "pitch → prod",
        label: "conversazioni commerciali tradotte in piani tecnici credibili",
      },
      href: "#contact",
      linkLabel: "Parliamo di un brief complesso",
    },
    {
      id: "community",
      axis: "Community × Engineering",
      title: "Costruire agende autorevoli in Europa",
      summary:
        "Comitati internazionali, CFP e selezione speaker per sette edizioni Codemotion tra Milano, Madrid e Roma.",
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
        "Programma, modello didattico e ritmo operativo creati da zero per una business unit academy.",
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
      "Sono il collante tra tech, business e community. Codice, sale vendita, palchi e aule — sempre lo stesso mestiere: unire mondi che non parlano la stessa lingua, con risultati alla mano.",
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
  },
  talks: {
    title: "Talk",
    intro:
      "Talk per chi affronta il cambiamento: una selezione di sessioni su carriere tech, recruiting e strumenti che usiamo per pensare.",
    status: "sessione",
    view: "Vedi la sessione",
    fullProfile: "Profilo speaker completo",
  },
  writing: {
    title: "Media e articoli",
    intro:
      "Registrazioni, podcast e articoli su carriere tech, tecnologia e le decisioni che rendono efficace un buon programma.",
    article: "articolo",
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
  },
  contact: {
    title: "Portami il brief più complicato.",
    intro:
      "Se stai costruendo un programma per developer, una proposta tecnica, un evento o un percorso formativo che deve reggere davanti a persone competenti, possiamo parlarne.",
    linkedin: "Collegati su LinkedIn",
    cv: "Vedi il CV (PDF in inglese)",
    socials: "Profili social",
    colophon: "Costruito con Astro. Aggiornato a mano, di proposito.",
  },
  egg: {
    aria: "Una nota di Luca",
    command: "whoami",
    output:
      "Developer nel cuore, progettista di programmi di mestiere. Ancora qui? Mi piaci già — scrivimi ↓",
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
    "Hai aperto gli strumenti di sviluppo. Naturalmente.\nCostruito a mano con Astro. Scrivimi dalla sezione contatti.",
};

export const translations = { en, it } as const;
export type Translation = (typeof translations)[Locale];
