import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localizedText = z.object({
  en: z.string().min(1),
  it: z.string().min(1),
});
const localeVisibility = z.array(z.enum(['en', 'it'])).min(1);

// NOW — the dated stream. This is the heart of the site.
// Add an entry by dropping a .md file in src/content/now/.
// Keep the most recent entry no older than ~2 months, or the
// stream starts working against you.
const now = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/now' }),
  schema: z.object({
    date: z.coerce.date(),
    title: localizedText,
    locales: localeVisibility,
    kind: z.enum(['speaking', 'writing', 'milestone', 'building', 'note']),
    blurb: localizedText.optional(),
    // Generic outbound link (LinkedIn post, article, event page…).
    url: z.string().url().optional(),
    // How prominently to surface the outbound link:
    //   'subtle' → small "Read on LinkedIn ↗" under the text (default when url present)
    //   'strong' → bigger "Read the full post ↗", for entries that are excerpts
    urlStyle: z.enum(['subtle', 'strong']).default('subtle'),
    // Optional custom label for the outbound link.
    urlLabel: localizedText.optional(),
    location: localizedText.optional(),
    // Media: zero, one, or many items, mixed types.
    //   - { type: 'image', src, alt }
    //   - { type: 'video', src, poster? }   (self-hosted file in /public)
    //   - { type: 'link',  url, label? }    (clean card, e.g. a LinkedIn post)
    media: z
      .array(
        z.discriminatedUnion('type', [
          z.object({ type: z.literal('image'), src: z.string(), alt: localizedText.optional() }),
          z.object({ type: z.literal('video'), src: z.string(), poster: z.string().optional() }),
          z.object({ type: z.literal('link'), url: z.string().url(), label: localizedText.optional() }),
        ])
      )
      .default([]),
    // Media prominence, decided per entry: 'full' = large, 'compact' = thumb row.
    // Defaults: featured → full, others → compact (overridable here).
    layout: z.enum(['full', 'compact']).optional(),
    featured: z.boolean().default(false),
  }),
});

// Talks — stable archive, curated order.
const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: localizedText,
    summary: localizedText,
    locales: localeVisibility,
    publication: z.string().default('Codemotion Magazine'),
    url: z.string().url(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { now, talks, writing };
