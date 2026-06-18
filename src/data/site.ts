// ─────────────────────────────────────────────────────────────
// Single source of truth for the whole site.
//
// `meta`     → technical / SEO / social metadata (used in <head>)
// everything else → content shown on the page
//
// This is a .ts file (not markdown) on purpose: you get
// autocomplete and the build warns you if a field is missing
// or misspelled. Edit values here; never hard-code them in
// components.
// ─────────────────────────────────────────────────────────────

export const site = {
  // ---- Identity ----
  name: 'Luca Fregoso',
  tagline: 'Developer Programs & Content Lead',
  email: 'luca.fregoso@gmail.com',
  location: 'La Spezia, Italy — open to full remote',

  // ---- Technical / SEO / social metadata ----
  meta: {
    // Language + locale of the content.
    lang: 'en',
    ogLocale: 'en_US',

    // The <title> pattern. {name} and {tagline} are filled in.
    // Pages can override the whole title via the layout prop.
    titlePattern: '{name} — {tagline}',

    // Default meta description (search results + social preview).
    description:
      'Developer Programs & Content Lead and Technical Presales at Codemotion. ' +
      '15 years a full-stack developer, now leading content and speaker curation ' +
      'for Europe’s developer conferences. Open to full-remote roles.',

    author: 'Luca Fregoso',

    // Social share image. Put the file in /public and set the path
    // here (with a leading slash). RECOMMENDED SIZE: 1200×630 px.
    // Kept null until you add the file, so no broken tag is emitted.
    // When ready: add public/og-image.jpg and set ogImage: '/og-image.jpg'.
    ogImage: null as string | null,

    // Browser UI / mobile address-bar tint.
    themeColor: '#d0db02',
  },

  // ---- Page content ----
  intro: [
    "I spend my days deciding what gets said on stage and what gets built behind the scenes.",
    "At Codemotion I lead technical content and presales — curating the speaker programs for Europe’s developer conferences, and sitting with enterprise clients to turn vague intentions into things that actually ship. Fifteen years of writing code is what lets me do both.",
  ],

  currently:
    "Leading content & presales at Codemotion · MC across the European cloud-native and developer scene.",

  links: {
    linkedin: 'https://www.linkedin.com/in/lucafregoso',
    sessionize: 'https://sessionize.com/luca-fregoso/',
  },

  // Social profiles, in priority order. LinkedIn is primary and gets
  // visual weight; the rest are secondary. Remove any you don't want
  // shown, or reorder — the first item is treated as primary.
  // Replace the placeholder handles with your real profile URLs.
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/lucafregoso', primary: true },
    { name: 'Bluesky',  url: 'https://bsky.app/profile/REPLACE_ME' },
    { name: 'Mastodon', url: 'https://REPLACE_INSTANCE/@REPLACE_ME' },
    { name: 'X',        url: 'https://x.com/REPLACE_ME' },
    { name: 'Instagram',url: 'https://instagram.com/REPLACE_ME' },
  ],

  // Email, stored split so it never appears as a harvestable string in
  // the HTML. The UI reassembles it on interaction (see ContactEmail).
  emailUser: 'luca.fregoso',
  emailDomain: 'gmail.com',
};
