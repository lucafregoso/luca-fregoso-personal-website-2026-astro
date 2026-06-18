# luca-fregoso.com

Personal site built with [Astro](https://astro.build). Static output — fast, and it deploys anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## How it's organised

Everything you'll want to change lives in a few predictable places:

- `src/data/site.ts` — your name, role, bio, links and the speaking list. One file, edit and rebuild.
- `src/content/talks/` — one `.md` file per talk. Add a file, it appears on the site. Schema is in `src/content.config.ts`.
- `src/content/writing/` — one `.md` file per article. Newest shows first automatically.
- `src/styles/global.css` — design tokens. The lime accent (`--lime: #d0db02`) is used only for borders, prompts and the cursor; readable accent text uses a darker derived green so it passes contrast checks in both themes.
- `public/cv.pdf` — your CV. Replace this file to update the download.

### Adding a talk

Create `src/content/talks/my-talk.md`:

```markdown
---
title: "My Talk Title"
abstract: "One or two sentences."
events: ["Some Conf 2026"]
tags: ["topic"]
sessionizeUrl: "https://sessionize.com/s/..."
featured: false
---
```

### Adding an article

Create `src/content/writing/my-post.md`:

```markdown
---
title: "Title"
summary: "One sentence."
publication: "Codemotion Magazine"
url: "https://..."
date: 2026-01-15
tags: ["topic"]
---
```

## Where to extend next

The structure is ready for more:

- **Live Sessionize sync** — Sessionize exposes a public JSON API per speaker. You can fetch it at build time in a component to pull talks automatically instead of maintaining `.md` files. (Left as a manual collection for now so the site builds with zero external dependencies.)
- **A real blog** — add `src/pages/blog/[...slug].astro` to render full posts hosted here, not just links out.
- **RSS** — `@astrojs/rss` over the `writing` collection.
- **Sitemap** — add `@astrojs/sitemap` to the integrations in `astro.config.mjs`.

## Before deploying

1. In `astro.config.mjs`, set `site` to your final domain.
2. Replace `public/cv.pdf` with your latest CV.
3. Review `src/data/site.ts` links (Twitter/Instagram are included — remove any you don't want public).
