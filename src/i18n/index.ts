import { site } from '../data/site';

export const locales = ['en', 'it'] as const;
export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && locales.includes(value as Locale);

export const localize = (value: LocalizedText, locale: Locale) => value[locale];

const en = {
  meta: {
    lang: 'en',
    ogLocale: 'en_US',
    title: `${site.name} — ${site.tagline}`,
    description: site.meta.description,
  },
  nav: {
    header: 'Site header', primary: 'Primary navigation', language: 'Language selection',
    brand: 'Luca Fregoso, home', work: 'Work', lately: 'Lately', talks: 'Talks',
    writing: 'Media', contact: 'Contact', openMenu: 'Open menu', closeMenu: 'Close menu',
    archive: 'Archive',
    chooseLanguage: 'Choose language. Current language: English', closeLanguage: 'Close language selection',
    languages: { en: 'English', it: 'Italian' },
  },
  theme: { dark: 'Switch to dark mode', light: 'Switch to light mode' },
  skip: 'Skip to content',
  externalNewTab: 'opens in a new tab',
  hero: {
    eyebrow: site.eyebrow,
    headline: site.headline,
    intro: site.intro,
    proof: site.proof,
    primary: 'Discuss a complex brief', secondary: 'See selected work',
    profileLinks: 'Profile links', cv: 'CV (PDF)',
    imageAlt: 'Luca Fregoso hosting on stage at Docebo GAME UP! Product Power Up 2026.',
    imageContext: 'On stage', imagePlace: 'Docebo · Milan · 2026',
  },
  metrics: site.metrics,
  capabilities: site.capabilities,
  caseStudies: site.caseStudies,
  work: {
    number: '01 / Selected impact', title: 'Where strategy meets delivery.',
    intro: 'I work at the joins: between technology and people, editorial judgment and commercial reality, the stage and everything behind it.',
  },
  lately: {
    number: '02 / Field notes', title: 'Lately', updated: 'Updated',
    intro: 'Recent work from programs, stages and the communities around them.',
    upcoming: 'upcoming', showEarlier: (count: number) => `Show ${count} earlier updates`,
    archiveCta: 'View all field notes',
    kinds: { speaking: 'on stage', writing: 'wrote', milestone: 'milestone', building: 'shipped', note: 'note' },
    read: (platform: string) => `Read it on ${platform}`,
    readFull: (platform: string) => `Read the full post on ${platform}`,
  },
  talks: {
    number: '03 / On stage', title: 'Talks for people navigating change.',
    intro: 'Selected sessions about technical careers, hiring and the tools we use to think.',
    status: 'session', view: 'View session', fullProfile: 'Full speaker profile',
  },
  writing: {
    number: '04 / Media & writing', title: 'Media & writing.',
    intro: 'Recordings, podcasts and articles about developer careers, technology and the decisions behind good programs.',
    article: 'article',
  },
  archive: {
    number: 'Archive', title: 'Field notes archive.',
    metaTitle: `${site.name} — Field notes archive`,
    intro: 'A filtered archive of updates, articles, recordings and stage work.',
    all: 'All', filterLabel: 'Filter archive entries', empty: 'No entries match this filter.',
    pageStatus: (shown: number, total: number) => `${shown} of ${total} entries shown`,
    previous: 'Previous', next: 'Next',
    filters: {
      speaking: 'on stage', writing: 'wrote', milestone: 'milestone', building: 'shipped', note: 'note',
      article: 'article', video: 'video', 'live-recording': 'live recording', podcast: 'podcast',
    },
  },
  appearances: {
    watch: 'Watch on YouTube', listen: 'Listen on Spotify',
    formats: { video: 'video', 'live-recording': 'live recording', podcast: 'podcast' },
    roles: { host: 'host', speaker: 'speaker', guest: 'guest' },
  },
  contact: {
    number: '05 / Let’s talk', title: 'Bring me the complicated brief.',
    intro: 'If you are shaping a developer program, a technical proposal, an event or a learning path that needs to hold up in front of skilled people, we can talk.',
    linkedin: 'Connect on LinkedIn', cv: 'View CV (PDF)', socials: 'Social profiles',
    colophon: 'Built with Astro. Updated by hand, on purpose.',
  },
  email: {
    reveal: 'Email me', action: 'Email me', copy: 'Copy address', copied: 'Copied',
    revealed: 'Email address revealed.', copiedStatus: 'Email address copied to clipboard.',
    failed: 'Copy failed. Select the email address shown above.',
  },
  media: { openImage: 'Open image', readFull: 'Read the full post', viewPhotos: (count: number) => `View ${count} photos` },
  lightbox: {
    viewer: 'Image viewer', close: 'Close image viewer', previous: 'Previous image', next: 'Next image',
    imageOf: (position: number, total: number) => `Image ${position} of ${total}`,
    opened: 'Image viewer opened.',
  },
  devtools: 'You opened the devtools. Of course you did.\nBuilt by hand with Astro. Say hi via the contact section.',
} as const;

const it = {
  meta: {
    lang: 'it',
    ogLocale: 'it_IT',
    title: `${site.name} — Programmi per developer e contenuti tecnici`,
    description: 'Programmi per developer, contenuti tecnici e prevendita con 15 anni di esperienza nello sviluppo software. Luca Fregoso progetta agende, percorsi formativi, narrative tecniche e programmi per community di developer.',
  },
  nav: {
    header: 'Intestazione del sito', primary: 'Navigazione principale', language: 'Selezione lingua',
    brand: 'Luca Fregoso, home', work: 'Lavoro', lately: 'Ultimamente', talks: 'Talk',
    writing: 'Media', contact: 'Contatti', openMenu: 'Apri menu', closeMenu: 'Chiudi menu',
    archive: 'Archivio',
    chooseLanguage: 'Scegli la lingua. Lingua attuale: Italiano', closeLanguage: 'Chiudi la selezione della lingua',
    languages: { en: 'Inglese', it: 'Italiano' },
  },
  theme: { dark: 'Passa al tema scuro', light: 'Passa al tema chiaro' },
  skip: 'Vai al contenuto',
  externalNewTab: 'si apre in una nuova scheda',
  hero: {
    eyebrow: 'Programmi per developer · prevendita tecnica · palchi e community',
    headline: 'Progetto programmi tecnici di cui le persone si fidano.',
    intro: 'Dalle agende delle conferenze europee alle soluzioni enterprise, trasformo centinaia di input, priorità in competizione e promesse ancora vaghe in programmi chiari che possono davvero essere realizzati.',
    proof: 'Quindici anni passati a sviluppare software mi permettono di muovermi tra codice, contenuti, prevendita, formazione e platee di developer senza perdere il filo tecnico.',
    primary: 'Parliamo di un brief complesso', secondary: 'Scopri i progetti selezionati',
    profileLinks: 'Link professionali', cv: 'CV (PDF in inglese)',
    imageAlt: 'Luca Fregoso sul palco come host di Docebo GAME UP! Product Power Up 2026.',
    imageContext: 'Sul palco', imagePlace: 'Docebo · Milano · 2026',
  },
  metrics: [
    { value: '15 anni', label: 'tra sviluppo software e programmi tecnici' },
    { value: '20+ percorsi', label: 'percorsi formativi su misura progettati guidando una business unit academy' },
    { value: '7 edizioni', label: 'agende, speaker e contenuti Codemotion costruiti tra Milano, Madrid e Roma' },
    { value: 'MC', label: 'conduzione di eventi tech e sale complesse' },
    { value: 'Presales', label: 'supporto ai team sales con narrative tecniche credibili' },
    { value: 'Mentoring', label: 'supporto a startup su direzione prodotto e pianificazione tecnica' },
  ],
  capabilities: [
    { number: '01', title: 'Programmi per developer e contenuti', description: 'Strategia editoriale, CFP e selezione speaker, guida dei comitati, progettazione delle agende e standard di qualità per pubblici tecnici.' },
    { number: '02', title: 'Prevendita, prodotto e perimetro', description: 'Trasformo obiettivi di business, conversazioni commerciali e idee di prodotto in perimetri tecnici credibili, piani di delivery e narrative che i team possano sostenere.' },
    { number: '03', title: 'Palchi e formazione', description: 'MC e moderazione, public speaking, progettazione di academy e formazione per developer capace di tenere insieme anche le platee più complesse con chiarezza.' },
  ],
  caseStudies: [
    { label: 'Programmi di conferenza', title: 'Costruire agende autorevoli in Europa', description: 'Coordino comitati internazionali e trasformo circa 600 proposte per edizione in programmi equilibrati per sette edizioni Codemotion: tre a Milano, due a Madrid e due a Roma.', outcome: '2.000–3.000 developer coinvolti in ogni evento', href: '#talks', linkLabel: 'Scopri i talk' },
    { label: 'Prevendita enterprise', title: 'Rendere realizzabili le promesse più ambiziose', description: 'Lavoro tra clienti, vendite e team di delivery per far emergere il bisogno reale, mettere alla prova le ipotesi e costruire un lavoro tecnico che possa passare dal pitch alla produzione.', outcome: 'Conversazioni commerciali tradotte in piani tecnici credibili', href: '#contact', linkLabel: 'Parliamo di un brief complesso' },
    { label: 'Programmi di formazione', title: 'Creare un’academy tecnica da zero', description: 'Ho guidato programma, modello didattico e ritmo operativo di una business unit academy, progettando più di venti percorsi custom per carriere tecniche.', outcome: '20+ percorsi formativi progettati per chi entra nel tech', href: '/cv.pdf', linkLabel: 'Leggi il CV completo', download: true },
  ],
  work: {
    number: '01 / Impatto selezionato', title: 'Dove la strategia incontra la delivery.',
    intro: 'Lavoro nei punti di contatto: tra tecnologia e persone, giudizio editoriale e realtà commerciale, il palco e tutto ciò che accade dietro le quinte.',
  },
  lately: {
    number: '02 / Note dal campo', title: 'Ultimamente', updated: 'Aggiornato',
    intro: 'Il lavoro recente tra programmi, palchi e le community che li rendono possibili.',
    upcoming: 'in arrivo', showEarlier: (count: number) => `Mostra altri ${count} aggiornamenti`,
    archiveCta: 'Vedi tutto l’archivio',
    kinds: { speaking: 'sul palco', writing: 'articolo', milestone: 'traguardo', building: 'progetto', note: 'nota' },
    read: (platform: string) => `Leggi su ${platform}`,
    readFull: (platform: string) => `Leggi il post completo su ${platform}`,
  },
  talks: {
    number: '03 / Sul palco', title: 'Talk per chi affronta il cambiamento.',
    intro: 'Una selezione di sessioni su carriere tech, recruiting e strumenti che usiamo per pensare.',
    status: 'sessione', view: 'Vedi la sessione', fullProfile: 'Profilo speaker completo',
  },
  writing: {
    number: '04 / Media e articoli', title: 'Media e articoli.',
    intro: 'Registrazioni, podcast e articoli su carriere tech, tecnologia e le decisioni che rendono efficace un buon programma.',
    article: 'articolo',
  },
  archive: {
    number: 'Archivio', title: 'Archivio note dal campo.',
    metaTitle: `${site.name} — Archivio note dal campo`,
    intro: 'Un archivio filtrabile di aggiornamenti, articoli, registrazioni e attività sul palco.',
    all: 'Tutto', filterLabel: 'Filtra le voci dell’archivio', empty: 'Nessuna voce corrisponde a questo filtro.',
    pageStatus: (shown: number, total: number) => `${shown} di ${total} voci mostrate`,
    previous: 'Precedente', next: 'Successiva',
    filters: {
      speaking: 'sul palco', writing: 'articolo', milestone: 'traguardo', building: 'progetto', note: 'nota',
      article: 'articolo', video: 'video', 'live-recording': 'registrazione live', podcast: 'podcast',
    },
  },
  appearances: {
    watch: 'Guarda su YouTube', listen: 'Ascolta su Spotify',
    formats: { video: 'video', 'live-recording': 'registrazione live', podcast: 'podcast' },
    roles: { host: 'host', speaker: 'speaker', guest: 'ospite' },
  },
  contact: {
    number: '05 / Parliamone', title: 'Portami il brief più complicato.',
    intro: 'Se stai costruendo un programma per developer, una proposta tecnica, un evento o un percorso formativo che deve reggere davanti a persone competenti, possiamo parlarne.',
    linkedin: 'Collegati su LinkedIn', cv: 'Vedi il CV (PDF in inglese)', socials: 'Profili social',
    colophon: 'Costruito con Astro. Aggiornato a mano, di proposito.',
  },
  email: {
    reveal: 'Scrivimi', action: 'Scrivimi', copy: 'Copia indirizzo', copied: 'Copiato',
    revealed: 'Indirizzo email mostrato.', copiedStatus: 'Indirizzo email copiato negli appunti.',
    failed: 'Copia non riuscita. Seleziona l’indirizzo email mostrato qui sopra.',
  },
  media: { openImage: 'Apri immagine', readFull: 'Leggi il post completo', viewPhotos: (count: number) => `Vedi ${count} foto` },
  lightbox: {
    viewer: 'Visualizzatore immagini', close: 'Chiudi il visualizzatore', previous: 'Immagine precedente', next: 'Immagine successiva',
    imageOf: (position: number, total: number) => `Immagine ${position} di ${total}`,
    opened: 'Visualizzatore immagini aperto.',
  },
  devtools: 'Hai aperto gli strumenti di sviluppo. Naturalmente.\nCostruito a mano con Astro. Scrivimi dalla sezione contatti.',
};

export const translations = { en, it } as const;
export type Translation = (typeof translations)[Locale];
