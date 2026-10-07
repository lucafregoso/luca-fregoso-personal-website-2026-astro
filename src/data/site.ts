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
  name: "Luca Fregoso",
  tagline: "Head of Content & Presales, Codemotion · Developer Relations",

  // ---- Technical / SEO / social metadata ----
  meta: {
    // Language + locale of the content.
    lang: "en",
    ogLocale: "en_US",

    // Default meta description. HARD LIMIT ~160 chars: Google truncates
    // beyond that and the "open to roles" line must survive the cut.
    description:
      "Head of Content & Presales at Codemotion: 5,000+ talk proposals across 7 editions, 15 years shipping software. Open to DevRel and Developer Programs roles, remote.",

    author: "Luca Fregoso",

    // Social share image. Put the file in /public and set the path
    // here (with a leading slash). RECOMMENDED SIZE: 1200×630 px.
    // The stage photograph is local, so social crawlers never depend on a
    // third-party media host. It is deliberately large enough for rich cards.
    ogImage: "/images/luca-fregoso-codemotion-milan-2025.jpg" as string | null,

    // Browser UI / mobile address-bar tint.
    themeColor: "#d0db02",
  },

  // ---- Page content ----
  headline: "I design technical programs people trust.",
  // The hero tells the arc, not the job search: community → company →
  // enterprise business unit → content for Italy's biggest tech
  // community. DevRel is shown through proof, never claimed.
  intro:
    "I started from the community, built a software company, ran an enterprise business unit. Today I lead content for the biggest tech community in Italy, and not just there.",
  proof:
    "15 years shipping software, the last six designing the programs around them. At Codemotion I turn ~600 talk submissions per edition into agendas the community trusts, across Milan, Madrid and Rome. Engineers, sales teams and speakers get the same straight answer from me.",
  // Person bio (JSON-LD description; the closest thing to an About).
  bio:
    "Luca Fregoso is Head of Content & Presales at Codemotion, where he curates conference agendas across Milan, Madrid and Rome and leads technical presales. A developer with 15 years of experience, he previously founded the software company S2K and built a technical training academy inside an enterprise group. Based in Italy, he works in English and Italian.",

  // Exactly three true numbers, each with a subject and a role attached
  // (no passive-voice achievements). The 600/edition and 2,000–3,000
  // figures live in the hero proof — never duplicated here.
  metrics: [
    {
      value: "20+ yrs",
      label: "in tech, 15 of them shipping software",
    },
    {
      value: "2,000–3,000",
      label: "developers in the room at every edition I curate",
    },
    {
      value: "0 → 20+",
      label: "custom learning paths for the technical academy I built from zero",
    },
  ],

  // The Work section: three intersections in one row, each opening with
  // role + employer + dates (name employers in visible copy). Numbers
  // live in the metrics strip; cards carry the narrative, one line each.
  intersections: [
    {
      id: "codemotion",
      axis: "Community × Business × Engineering",
      title: "Head of Content & Presales, Codemotion (2023–present)",
      summary:
        "Joined in 2023 as Dev Talent Partner. Conference content end to end, plus technical presales and AI Adoption for the company connecting businesses with Italy's largest developer community.",
      href: "#talks",
      linkLabel: "Explore speaking work",
    },
    {
      id: "people",
      axis: "People × Engineering",
      title: "Academy Manager in an enterprise group (2019–2022)",
      summary:
        "Needs assessment, curricula, instructors and daily operations: a tech academy built from zero into its own business unit.",
      href: "/cv/",
      linkLabel: "Read the full CV",
    },
    {
      id: "code",
      axis: "Code × Everything",
      title: "Founder & Technical Lead, S2K (2009–2023)",
      summary:
        "Fourteen years of custom software, e-commerce, CMS, web and mobile. Earlier, web team lead on projects for Condé Nast, MTV and Electronic Arts.",
      href: "https://www.linkedin.com/in/lucafregoso",
      linkLabel: "Full history on LinkedIn",
      external: true,
    },
  ],

  links: {
    linkedin: "https://www.linkedin.com/in/lucafregoso",
    sessionize: "https://sessionize.com/luca-fregoso/",
    codemotionAuthor: "https://www.codemotion.com/magazine/it/author/luca-fregoso/",
  },

  // Only verified public profiles belong here. Placeholder links are never
  // rendered: trust is more valuable than a row of empty social icons.
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/lucafregoso",
      primary: true,
    },
    {
      name: "Bluesky",
      url: "https://bsky.app/profile/lucafregoso.bsky.social",
    },
    { name: "Mastodon", url: "https://fosstodon.org/@scakko" },
    { name: "X", url: "https://x.com/scakko" },
    { name: "Instagram", url: "https://www.instagram.com/lucafregoso" },
  ],

  // Email, stored split so it never appears as a harvestable string in
  // the HTML. The UI reassembles it on interaction (see ContactEmail).
  emailUser: "hello",
  emailDomain: "luca-fregoso.me",
};
