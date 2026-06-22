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
    brand: 'Luca Fregoso, back to top', work: 'Work', lately: 'Lately', talks: 'Talks',
    writing: 'Media', contact: 'Contact', openMenu: 'Open menu', closeMenu: 'Close menu',
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
    primary: 'Discuss a leadership role', secondary: 'See selected work',
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
  appearances: {
    watch: 'Watch on YouTube', listen: 'Listen on Spotify',
    formats: { video: 'video', 'live-recording': 'live recording', podcast: 'podcast' },
    roles: { host: 'host', speaker: 'speaker', guest: 'guest' },
  },
  contact: {
    number: '05 / Let’s talk', title: 'Bring me the complicated brief.',
    intro: 'I’m open to senior international roles in developer programs, technical content and presales—and to the right hosting, speaking or program collaboration.',
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
    description: 'Responsabile di programmi per developer, contenuti tecnici e prevendita in Codemotion. Dopo 15 anni come full-stack developer, oggi guido la selezione di contenuti e speaker per conferenze europee. Disponibile per ruoli full remote.',
  },
  nav: {
    header: 'Intestazione del sito', primary: 'Navigazione principale', language: 'Selezione lingua',
    brand: 'Luca Fregoso, torna all’inizio', work: 'Lavoro', lately: 'Ultimamente', talks: 'Talk',
    writing: 'Media', contact: 'Contatti', openMenu: 'Apri menu', closeMenu: 'Chiudi menu',
    chooseLanguage: 'Scegli la lingua. Lingua attuale: Italiano', closeLanguage: 'Chiudi la selezione della lingua',
    languages: { en: 'Inglese', it: 'Italiano' },
  },
  theme: { dark: 'Passa al tema scuro', light: 'Passa al tema chiaro' },
  skip: 'Vai al contenuto',
  externalNewTab: 'si apre in una nuova scheda',
  hero: {
    eyebrow: 'Programmi per developer · contenuti tecnici · prevendita',
    headline: 'Progetto programmi tecnici di cui le persone si fidano.',
    intro: 'Dalle agende delle conferenze europee alle soluzioni enterprise, trasformo centinaia di input, priorità in competizione e promesse ancora vaghe in programmi chiari che possono davvero essere realizzati.',
    proof: 'Quindici anni passati a sviluppare software mi danno la profondità tecnica per guidare contenuti, prevendita, programmi di formazione e intere platee di developer.',
    primary: 'Parliamo di un ruolo di leadership', secondary: 'Scopri i progetti selezionati',
    profileLinks: 'Link professionali', cv: 'CV (PDF in inglese)',
    imageAlt: 'Luca Fregoso sul palco come host di Docebo GAME UP! Product Power Up 2026.',
    imageContext: 'Sul palco', imagePlace: 'Docebo · Milano · 2026',
  },
  metrics: [
    { value: '15 anni', label: 'nello sviluppo software' },
    { value: '~600', label: 'proposte CFP valutate per edizione' },
    { value: '~90', label: 'sessioni progettate per conferenza' },
    { value: '2–3 mila', label: 'developer raggiunti per evento' },
    { value: '~200', label: 'persone formate in un’academy creata da zero' },
  ],
  capabilities: [
    { number: '01', title: 'Programmi per developer e contenuti', description: 'Strategia editoriale, CFP e selezione speaker, guida dei comitati, progettazione delle agende e standard di qualità per pubblici tecnici.' },
    { number: '02', title: 'Prevendita tecnica', description: 'Trasformo obiettivi di business e impegni commerciali in perimetri tecnici credibili, piani di delivery e soluzioni che i team possano sostenere.' },
    { number: '03', title: 'Palchi e formazione', description: 'MC e moderazione, public speaking, progettazione di academy e formazione per developer capace di tenere insieme anche le platee più complesse.' },
  ],
  caseStudies: [
    { label: 'Programmi di conferenza', title: 'Costruire agende autorevoli in Europa', description: 'Coordino comitati internazionali e trasformo circa 600 proposte in un programma equilibrato di ~90 sessioni per le edizioni Codemotion di Roma, Madrid e Milano.', outcome: '2.000–3.000 developer coinvolti in ogni evento', href: '#talks', linkLabel: 'Scopri i talk' },
    { label: 'Prevendita enterprise', title: 'Rendere realizzabili le promesse più ambiziose', description: 'Lavoro tra clienti, vendite e team di delivery per far emergere il bisogno reale, mettere alla prova le ipotesi e definire un lavoro tecnico che possa passare dal pitch alla produzione.', outcome: 'Obiettivi di business tradotti in un perimetro tecnico credibile', href: '#contact', linkLabel: 'Parliamo di un ruolo di leadership' },
    { label: 'Programmi di formazione', title: 'Creare un’academy tecnica da zero', description: 'Ho progettato il programma, il modello didattico e il ritmo operativo di un’academy che ha aiutato le persone a entrare e crescere nelle professioni tecniche.', outcome: '~200 persone formate', href: '/cv.pdf', linkLabel: 'Leggi il CV completo', download: true },
  ],
  work: {
    number: '01 / Impatto selezionato', title: 'Dove la strategia incontra la delivery.',
    intro: 'Lavoro nei punti di contatto: tra tecnologia e persone, giudizio editoriale e realtà commerciale, il palco e tutto ciò che accade dietro le quinte.',
  },
  lately: {
    number: '02 / Note dal campo', title: 'Ultimamente', updated: 'Aggiornato',
    intro: 'Il lavoro recente tra programmi, palchi e le community che li rendono possibili.',
    upcoming: 'in arrivo', showEarlier: (count: number) => `Mostra altri ${count} aggiornamenti`,
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
  appearances: {
    watch: 'Guarda su YouTube', listen: 'Ascolta su Spotify',
    formats: { video: 'video', 'live-recording': 'registrazione live', podcast: 'podcast' },
    roles: { host: 'host', speaker: 'speaker', guest: 'ospite' },
  },
  contact: {
    number: '05 / Parliamone', title: 'Portami il brief più complicato.',
    intro: 'Sono disponibile per ruoli senior internazionali nei programmi per developer, nei contenuti tecnici e nella prevendita, oltre che per collaborazioni mirate come host, speaker o nella progettazione di programmi.',
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
