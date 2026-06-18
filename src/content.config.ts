import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// NOW — the dated stream. This is the heart of the site.
// Add an entry by dropping a .md file in src/content/now/.
// Keep the most recent entry no older than ~2 months, or the
// stream starts working against you.
const now = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/now' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    kind: z.enum(['speaking', 'writing', 'milestone', 'building', 'note']),
    blurb: z.string().optional(),
    url: z.string().url().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// Talks — stable archive, curated order.
const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
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
    title: z.string(),
    summary: z.string(),
    publication: z.string().default('Codemotion Magazine'),
    url: z.string().url(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { now, talks, writing };
