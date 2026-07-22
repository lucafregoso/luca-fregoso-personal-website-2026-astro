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
  tagline: "Developer Programs & Content Lead",

  // ---- Technical / SEO / social metadata ----
  meta: {
    // Language + locale of the content.
    lang: "en",
    ogLocale: "en_US",

    // The <title> pattern. {name} and {tagline} are filled in.
    // Pages can override the whole title via the layout prop.
    titlePattern: "{name} — {tagline}",

    // Default meta description (search results + social preview).
    description:
      "Developer Relations (DevRel), technical presales and developer programs — 20+ years in tech, 15 of them building software. " +
      "Luca Fregoso shapes conference agendas, training paths and solutions engineering for developer-facing products.",

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
  intro:
    "From European conference agendas to presales rooms, I turn hundreds of inputs, competing priorities and half-formed ideas into programs that ship.",
  proof:
    "Before programs, I wrote production code and sold it: web agencies first, then my own. Engineers, sales teams and speakers get the same straight answer from me.",

  // Exactly three true numbers spanning the three worlds (career /
  // conferences / training), none repeated as an intersection stat.
  metrics: [
    {
      value: "20+ years",
      label: "in tech — 15 of them building software",
    },
    {
      value: "5,000+",
      label: "conference proposals evaluated across CFPs and committees",
    },
    {
      value: "20+ paths",
      label:
        "custom learning paths designed while leading an academy business unit",
    },
  ],

  // The Work section: three intersections where being the glue between
  // tech, business and community produced measurable results. Compact by
  // design — one axis label, one title, one sentence, one display stat.
  intersections: [
    {
      id: "business",
      axis: "Business × Engineering",
      title: "Turning sales promises into shipped software",
      summary:
        "I sit between clients, sales and engineering — I find the real ask, test the promises against reality, and scope a plan engineering can commit to.",
      stat: {
        value: "pitch → prod",
        label:
          "technical presales, from the first sales call to a delivery plan that holds",
      },
      href: "#contact",
      linkLabel: "Discuss a complex brief",
    },
    {
      id: "community",
      axis: "Community × Engineering",
      title: "Shaping trusted agendas across Europe",
      summary:
        "International committees, CFP and speaker curation for seven Codemotion editions across Milan, Madrid and Rome — rooms of 2,000–3,000 developers each.",
      stat: {
        value: "600 → 1",
        label: "submissions per edition, shaped into one balanced agenda",
      },
      href: "#talks",
      linkLabel: "Explore speaking work",
    },
    {
      id: "people",
      axis: "People × Engineering",
      title: "Building a technical academy from zero",
      summary:
        "Program design, training model and the day-to-day running of an academy business unit.",
      stat: {
        value: "0 → 1",
        label:
          "an academy built into a running business unit",
      },
      href: "/cv.pdf",
      linkLabel: "Read the full CV",
      download: true,
    },
  ],

  links: {
    linkedin: "https://www.linkedin.com/in/lucafregoso",
    sessionize: "https://sessionize.com/luca-fregoso/",
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
  emailDomain: "luca-fregoso.com",
};
