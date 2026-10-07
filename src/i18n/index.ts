import { site } from "../data/site";

// The locale UNIVERSE the code supports. Keep both here so every
// `locale === 'it'` branch stays valid, compiled and ready — the code
// is bilingual-capable even while the content is English-only.
export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];
// English required; Italian optional (translations are deleted for now,
// recoverable from git). localize() falls back to English.
export type LocalizedText = { en: string; it?: string };

// The locales actually ROUTED and built — the single switch for the
// whole site. To re-enable Italian: add "it" here, restore
// src/pages/it/ and the `it` dictionary below from git history, and
// re-add it: translations to content frontmatter as needed.
export const activeLocales: Locale[] = ["en"];

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && locales.includes(value as Locale);

export const localize = (value: LocalizedText, locale: Locale) =>
  value[locale] ?? value.en;

const en = {
  meta: {
    lang: "en",
    ogLocale: "en_US",
    // ~75 chars: SERP cuts near 60, so name + role + employer come first and
    // "Developer Relations" (recruiter keyword) may be truncated; it also
    // lives in the meta description.
    title: `${site.name} · Head of Content & Presales, Codemotion · Developer Relations`,
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
    role: site.tagline,
    headline: site.headline,
    intro: site.intro,
    proof: site.proof,
    primary: "Work with me",
    secondary: "See selected work",
    profileLinks: "Profile links",
    cv: "CV",
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
      "I am the glue between tech, business and community. Code, sales rooms, conference stages and classrooms. Call it DevRel, developer programs, presales or program management, the job is the same: getting worlds that don't speak the same language to ship one thing together.",
  },
  network: {
    title: "The network behind the programs",
    body:
      "Years of conferences and communities built me a network that answers the phone: speakers, committee members, organizers, partner companies from startups to enterprises. When a program needs the right person in the room, I know who to call.",
  },
  lately: {
    title: "Lately",
    updated: "Updated",
    intro:
      "Where you'll find me on stage and behind the scenes: MC and host gigs, hackathons, facilitation. Updated by hand.",
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
      "Selected sessions on AI workflows, developer careers and developer tools: the same themes I curate for others, from the other side of the stage.",
    view: "View session",
    fullProfile: "Full speaker profile",
  },
  writing: {
    title: "Media & writing",
    intro:
      "Recordings and writing about developer careers, technology and the decisions behind good programs.",
    article: "article",
    inItalian: "in Italian",
    archiveCta: (count: number) =>
      `${count} more articles live in the archive`,
  },
  archive: {
    title: "Archive.",
    metaTitle: `${site.name} - Archive`,
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
      "If you're building something for developers, a conference, a community program, a technical story that needs telling, we can talk. I work remote-first from Italy (CET, EU/US overlap), in English or Italian.",
    secondary: "Open to the right full-time role, and to selected consulting engagements.",
    linkedin: "Connect on LinkedIn",
    cv: "View CV (PDF)",
    socials: "Social profiles",
    colophon: "Built with Astro. Updated by hand, on purpose.",
  },
  egg: {
    aria: "A note from Luca",
    command: "whoami",
    output:
      "Developer at heart, program designer by trade. Still with me? I like you already, say hi ↓",
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
  notFound: {
    title: "404. This page shipped without a program.",
    body: "The address does not exist, or it moved. Everything worth reading is one click away.",
    cta: "Back to the homepage",
    metaTitle: `${site.name} - Page not found`,
  },
  devtools:
    "You opened the devtools. Of course you did.\nBuilt by hand with Astro. Say hi via the contact section.",
} as const;

// While Italian is disabled its dictionary is deleted (git has it);
// the alias keeps `translations[locale]` valid for every Locale —
// an IT request would simply render English.
export const translations: Record<Locale, typeof en> = { en, it: en };
export type Translation = (typeof translations)[Locale];
