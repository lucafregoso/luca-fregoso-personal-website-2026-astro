import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localizedText = z.object({
  en: z.string().min(1),
  it: z.string().min(1),
});
const localeVisibility = z.array(z.enum(["en", "it"])).min(1);

// NOW — the dated stream. This is the heart of the site.
// Add an entry by dropping a .md file in src/content/now/.
// Keep the most recent entry no older than ~2 months, or the
// stream starts working against you.
const now = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/now" }),
  schema: z.object({
    date: z.coerce.date(),
    title: localizedText,
    locales: localeVisibility,
    kind: z.enum(["speaking", "writing", "milestone", "building", "note"]),
    blurb: localizedText.optional(),
    // Generic outbound link (LinkedIn post, article, event page…).
    url: z.string().url().optional(),
    // How prominently to surface the outbound link:
    //   'subtle' → small "Read on LinkedIn ↗" under the text (default when url present)
    //   'strong' → bigger "Read the full post ↗", for entries that are excerpts
    urlStyle: z.enum(["subtle", "strong"]).default("subtle"),
    // Optional custom label for the outbound link.
    urlLabel: localizedText.optional(),
    // Language of the linked content, when it differs from the reader's
    // locale (e.g. an Italian LinkedIn post). Drives the "(in Italian)"
    // marker on the EN site so international readers aren't surprised.
    urlLang: z.enum(["en", "it"]).optional(),
    location: localizedText.optional(),
    // Media: zero, one, or many items, mixed types.
    //   - { type: 'image', src, alt }
    //   - { type: 'video', src, poster? }   (self-hosted file in /public)
    //   - { type: 'link',  url, label? }    (clean card, e.g. a LinkedIn post)
    media: z
      .array(
        z.discriminatedUnion("type", [
          z.object({
            type: z.literal("image"),
            src: z.string(),
            alt: localizedText.optional(),
          }),
          z.object({
            type: z.literal("video"),
            src: z.string(),
            poster: z.string().optional(),
          }),
          z.object({
            type: z.literal("link"),
            url: z.string().url(),
            label: localizedText.optional(),
          }),
        ]),
      )
      .default([]),
    // Editorial treatment for image groups in the Lately chronology.
    mediaPresentation: z
      .enum(["contact-sheet", "lead", "sidecar"])
      .default("contact-sheet"),
    featured: z.boolean().default(false),
  }),
});

// Talks — stable archive, curated order.
const talks = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/talks" }),
  schema: z.object({
    title: localizedText,
    abstract: localizedText,
    locales: localeVisibility,
    events: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    sessionizeUrl: z.string().url().optional(),
    order: z.number().default(99),
  }),
});

// Writing — stable archive, newest first.
const writing = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: localizedText,
    summary: localizedText,
    locales: localeVisibility,
    publication: z.string().default("Codemotion Magazine"),
    url: z.string().url(),
    // Language of the linked article — shows a "(in Italian)" marker on
    // the EN site when it differs from the reader's locale.
    lang: z.enum(["en", "it"]).optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// Appearances — one source of truth for recordings, live streams and podcasts.
// Entries can appear in the dated stream, the permanent media library, or both.
const appearances = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/appearances" }),
  schema: z.object({
    title: localizedText,
    summary: localizedText,
    locales: localeVisibility,
    format: z.enum(["video", "live-recording", "podcast"]),
    platform: z.enum(["youtube", "spotify"]),
    role: z.enum(["host", "speaker", "guest"]),
    placements: z.array(z.enum(["lately", "library"])).min(1),
    date: z.coerce.date(),
    duration: z.string().regex(/^\d{1,2}:\d{2}(?::\d{2})?$/),
    publisher: z.string().min(1),
    platformId: z.string().min(1),
    externalUrl: z.string().url(),
    // Language of the recording — "(in Italian)" marker on the EN site.
    lang: z.enum(["en", "it"]).optional(),
    poster: z.string().startsWith("/"),
    startAtSeconds: z.number().int().nonnegative().optional(),
    mobilePresentation: z
      .enum(["stamp", "poster", "text-only"])
      .default("stamp"),
  }),
});

export const collections = { now, talks, writing, appearances };
