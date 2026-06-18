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

## Site metadata (one place)

All site-wide metadata lives in `src/data/site.ts` under the `meta` object —
not in markdown, and not hard-coded in components. It's a `.ts` file so the
editor autocompletes fields and the build catches typos.

`meta` controls: `lang`, `ogLocale`, the `<title>` pattern, the default
`description`, `author`, `ogImage`, and `themeColor`. The `<head>` in
`BaseLayout.astro` reads everything from here.

To set the social share image: add `public/og-image.jpg` (recommended
**1200×630 px**) and set `ogImage: '/og-image.jpg'` in `site.ts`. Until then
it stays `null` and no image meta tag is emitted (nothing broken).

Note: the `keywords` meta tag is intentionally omitted — search engines have
ignored it since ~2009; title, description, semantic HTML and the JSON-LD
`Person` block are what actually matter.

## Socials, email, and the Writing archive

**Socials** live in `site.socials` (in `src/data/site.ts`), in priority order.
The first entry with `primary: true` renders with an icon + label and a border;
the rest are icon-only. Replace the `REPLACE_ME` placeholder URLs with your real
profiles, reorder freely, or remove any you don't want shown. Icons live in
`src/components/SocialIcon.astro` (recognisable brand shapes, uniform style).

**Email** is never written as a plain string in the HTML. It's stored split
(`emailUser` + `emailDomain`) and reassembled by JS on hover/click via
`ContactEmail.astro`, so spam harvesters scraping the static source get nothing.
To change it, edit the two fields in `site.ts`.

**Writing** is a multi-source archive: each entry in `src/content/writing/`
declares a `publication` (e.g. "Codemotion Magazine", "Medium") shown as a badge,
and an external `url`. When you start publishing on Medium, just add a markdown
file with `publication: Medium` and its URL — the site becomes the hub that
points to your articles wherever they live. Internal article pages (hosted on the
site itself) can be added later under `src/pages/writing/` and will open in the
same tab; external links open in a new tab automatically.
