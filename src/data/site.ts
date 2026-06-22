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
    // The stage photograph is local, so social crawlers never depend on a
    // third-party media host. It is deliberately large enough for rich cards.
    ogImage: '/hackathon-2026.jpg' as string | null,

    // Browser UI / mobile address-bar tint.
    themeColor: '#d0db02',
  },

  // ---- Page content ----
  eyebrow: 'Developer programs · technical content · presales',
  headline: 'I design technical programs people trust.',
  intro:
    'From European conference agendas to enterprise solutions, I turn hundreds of inputs, competing priorities and vague promises into clear programs that can actually ship.',
  proof:
    'Fifteen years building software gives me the technical depth to lead content, presales, learning programs and rooms full of developers.',

  metrics: [
    { value: '15 years', label: 'building software' },
    { value: '~600', label: 'CFP proposals reviewed per edition' },
    { value: '~90', label: 'sessions shaped per conference' },
    { value: '2–3k', label: 'developers reached per event' },
    { value: '~200', label: 'people trained in an academy built from zero' },
  ],

  capabilities: [
    {
      number: '01',
      title: 'Developer programs & content',
      description:
        'Content strategy, CFP and speaker curation, committee leadership, agenda design and quality standards for technical audiences.',
    },
    {
      number: '02',
      title: 'Technical presales',
      description:
        'Turning business intent and sales commitments into credible technical scope, delivery plans and solutions teams can stand behind.',
    },
    {
      number: '03',
      title: 'Stages & learning',
      description:
        'MC and moderation, conference speaking, academy design and developer education that keeps complex rooms moving together.',
    },
  ],

  caseStudies: [
    {
      label: 'Conference programs',
      title: 'Shaping trusted agendas across Europe',
      description:
        'I coordinate international committees and turn roughly 600 submissions into a balanced ~90-session program for Codemotion editions in Rome, Madrid and Milan.',
      outcome: '2,000–3,000 developers served at each event',
      href: '#talks',
      linkLabel: 'Explore speaking work',
    },
    {
      label: 'Enterprise presales',
      title: 'Making ambitious promises deliverable',
      description:
        'I sit between clients, sales and delivery teams to uncover the real need, challenge assumptions and define technical work that can move from pitch to production.',
      outcome: 'Business intent translated into credible technical scope',
      href: '#contact',
      linkLabel: 'Discuss a leadership role',
    },
    {
      label: 'Learning programs',
      title: 'Building a technical academy from zero',
      description:
        'I designed the program, teaching model and operating rhythm for an academy that helped people enter and grow in technical careers.',
      outcome: '~200 people trained',
      href: '/cv.pdf',
      linkLabel: 'Read the full CV',
      download: true,
    },
  ],

  links: {
    linkedin: 'https://www.linkedin.com/in/lucafregoso',
    sessionize: 'https://sessionize.com/luca-fregoso/',
  },

  // Only verified public profiles belong here. Placeholder links are never
  // rendered: trust is more valuable than a row of empty social icons.
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/lucafregoso', primary: true },
    { name: 'Bluesky', url: 'https://bsky.app/profile/lucafregoso.bsky.social' },
    { name: 'Mastodon', url: 'https://fosstodon.org/@scakko' },
    { name: 'X', url: 'https://x.com/scakko' },
    { name: 'Instagram', url: 'https://www.instagram.com/lucafregoso' },
  ],

  // Email, stored split so it never appears as a harvestable string in
  // the HTML. The UI reassembles it on interaction (see ContactEmail).
  emailUser: 'hello',
  emailDomain: 'luca-fregoso.com',
};
