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

## Adding media to a "Lately" entry

Each entry in `src/content/now/` can carry any mix of media via a `media` list.
Put image/video files in `public/` and reference them with a leading slash.

```yaml
media:
  - type: image                 # one image → shown large
    src: /my-photo.jpg
    alt: "Description for accessibility."
  - type: image                 # two or more images → automatic gallery
    src: /another.jpg
    alt: "..."
  - type: video                 # self-hosted video, native player, no tracking
    src: /clip.mp4
    poster: /clip-thumb.jpg     # optional
  - type: link                  # clean card to e.g. a LinkedIn post (no iframe)
    url: https://www.linkedin.com/posts/...
    label: "Read the recap on LinkedIn"

# Optional: force media size regardless of featured state
layout: full        # 'full' = large, 'compact' = smaller thumbs
```

Notes:
- `url:` on the entry itself is the generic outbound link the title points to.
- LinkedIn is linked, never embedded: no third-party cookies, no GDPR headache,
  and the look stays consistent with the rest of the site.
- A single image renders large; multiple images auto-arrange into a grid.

## Linking out to LinkedIn (or anywhere) from a "Lately" entry

By design, the **title of an entry is never an external link** — clicking it
never throws the reader off your site unexpectedly. Instead, the outbound link
is an explicit row beneath the text, and it always opens in a new tab.

You choose, per entry, how prominent that link is:

| You want… | Set in the entry | Result |
|---|---|---|
| No link — text is complete on your site | omit `url` | nothing extra shown |
| A quiet pointer (text is self-sufficient) | `url:` + `urlStyle: subtle` | small "Read it on LinkedIn ↗" |
| A strong pointer (text is an excerpt) | `url:` + `urlStyle: strong` | framed "Read the full post on LinkedIn ↗" |

```yaml
url: "https://www.linkedin.com/posts/..."
urlStyle: strong          # or: subtle  (default is subtle when url is set)
urlLabel: "Read the recap"  # optional — overrides the auto label
```

The platform name is detected from the URL (LinkedIn, etc.), and tracking
parameters (`?utm_...`, `rcm=...`) should be stripped before pasting — they
leak your session/member id and add nothing.
