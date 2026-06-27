# luca-fregoso.com

Personal site built with [Astro](https://astro.build). Static output — fast, and it deploys anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Run locally

```bash
pnpm install
pnpm run dev      # http://localhost:4321
pnpm run check    # Astro + TypeScript diagnostics
pnpm test         # Playwright suite; builds and previews with PLAYWRIGHT_TEST=1
pnpm run build    # outputs to ./dist
pnpm run preview  # preview the production build
```

The project is pinned to pnpm in `package.json`. Build scripts for `esbuild`
and `sharp` are approved in `pnpm-workspace.yaml`, so a fresh install should not
require an interactive `pnpm approve-builds` step.

## How it's organised

Everything you'll want to change lives in a few predictable places:

- `src/data/site.ts` — shared identity, verified social links and the split contact alias.
- `src/i18n/index.ts` — typed English and Italian interface and page copy.
- `src/content/talks/` — one `.md` file per talk. Add a file, it appears on the site. Schema is in `src/content.config.ts`.
- `src/content/writing/` — one `.md` file per article. Newest shows first automatically.
- `src/content/appearances/` — one bilingual source per video, live recording or podcast; placements control whether it appears in Lately, Media, or both.
- `src/styles/global.css` — design tokens. The lime accent (`--lime: #d0db02`) is used only for borders, prompts and the cursor; readable accent text uses a darker derived green so it passes contrast checks in both themes.
- `public/cv.pdf` — your CV. Replace this file to update the download.

### Adding a talk

Create `src/content/talks/my-talk.md`:

```markdown
---
title:
  en: "My Talk Title"
  it: "Titolo del talk"
abstract:
  en: "One or two sentences."
  it: "Una o due frasi."
locales: [en, it]
events: ["Some Conf 2026"]
tags: ["topic"]
sessionizeUrl: "https://sessionize.com/s/..."
---
```

### Adding an article

Create `src/content/writing/my-post.md`:

```markdown
---
title:
  en: "English editorial title"
  it: "Titolo originale italiano"
summary:
  en: "One sentence."
  it: "Una frase."
locales: [en, it]
publication: "Codemotion Magazine"
url: "https://..."
date: 2026-01-15
tags: ["topic"]
---
```

### Adding a media appearance

Create `src/content/appearances/my-appearance.md`. Posters must be local; the
site never embeds or contacts YouTube or Spotify during page load.

```markdown
---
title:
  en: "Appearance title"
  it: "Titolo dell'apparizione"
summary:
  en: "One sentence."
  it: "Una frase."
locales: [en, it]
format: live-recording # video | live-recording | podcast
platform: youtube      # youtube | spotify
role: host             # host | speaker | guest
placements: [lately, library]
date: 2026-01-15
duration: "44:01"
publisher: "Show or publisher"
platformId: "provider-id"
externalUrl: "https://..."
poster: /media/local-poster.png
startAtSeconds: 1060   # optional, YouTube only
mobilePresentation: stamp # stamp | poster | text-only
---
```

The permanent Media archive merges articles and appearances newest-first.
Titles, cards and explicit watch/listen actions open the original platform in a
new tab. On phones, `stamp` keeps the copy dominant and uses the poster as a
small editorial stamp, `poster` leads with a restrained image, and `text-only`
hides the thumbnail for dense future entries.

## Where to extend next

The structure is ready for more:

- **Live Sessionize sync** — Sessionize exposes a public JSON API per speaker. You can fetch it at build time in a component to pull talks automatically instead of maintaining `.md` files. (Left as a manual collection for now so the site builds with zero external dependencies.)
- **A real blog** — add `src/pages/blog/[...slug].astro` to render full posts hosted here, not just links out.
- **RSS** — expose localized writing feeds when the archive grows.

## Before deploying

1. In `astro.config.mjs`, set `site` to your final domain.
2. Replace `public/cv.pdf` with your latest CV.
3. Review the verified social links in `src/data/site.ts` and remove any you no longer want public.

## Adding media to a "Lately" entry

Each entry in `src/content/now/` can carry any mix of media via a `media` list.
Put image/video files in `public/` and reference them with a leading slash.

```yaml
media:
  - type: image                 # one image → shown large
    src: /my-photo.jpg
    alt:
      en: "Description for accessibility."
      it: "Descrizione accessibile."
  - type: image                 # two or more images → automatic gallery
    src: /another.jpg
    alt:
      en: "..."
      it: "..."
  - type: video                 # self-hosted video, native player, no tracking
    src: /clip.mp4
    poster: /clip-thumb.jpg     # optional
  - type: link                  # clean card to e.g. a LinkedIn post (no iframe)
    url: https://www.linkedin.com/posts/...
    label:
      en: "Read the recap on LinkedIn"
      it: "Leggi il riepilogo su LinkedIn"

# Choose the image treatment for this Lately entry
mediaPresentation: contact-sheet # contact-sheet | lead | sidecar
```

Notes:
- `url:` on the entry itself is the generic outbound link the title points to.
- LinkedIn is linked, never embedded: no third-party cookies, no GDPR headache,
  and the look stays consistent with the rest of the site.
- Image sizing follows the entry’s `mediaPresentation`; it is never inferred
  from whether the entry is currently featured.
- `contact-sheet` shows compact 4:3 thumbnails, `lead` shows one 16:9 image
  with a photo count, and `sidecar` places text and images in adjacent columns.
  Every option retains the complete keyboard-accessible lightbox gallery.

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
urlLabel:                    # optional — overrides the localized auto label
  en: "Read the recap"
  it: "Leggi il riepilogo"
```

The platform name is detected from the URL (LinkedIn, etc.), and tracking
parameters (`?utm_...`, `rcm=...`) should be stripped before pasting — they
leak your session/member id and add nothing.

## Site metadata (one place)

Shared technical metadata lives in `src/data/site.ts`; localized titles,
descriptions and interface text live in `src/i18n/index.ts`. Both are typed so
the editor autocompletes fields and the build catches missing values.

`BaseLayout.astro` combines these sources to emit locale-specific canonical,
Open Graph and `hreflang` metadata for `/` and `/it/`.

The default social share image is the local stage photograph configured in
`site.ts`; Open Graph/Twitter image alt text and dimensions are emitted by the
layout. Replace it with a dedicated **1200×630 px** JPG when brand artwork is
available.

Note: the `keywords` meta tag is intentionally omitted — search engines have
ignored it since ~2009; title, description, semantic HTML and the JSON-LD
`Person` block are what actually matter.

## Socials, email, and the Media archive

**Socials** live in `site.socials` (in `src/data/site.ts`), in priority order.
The first entry with `primary: true` is the primary professional profile and
the rest appear as social icons. Only verified URLs should be added. Icons live in
`src/components/SocialIcon.astro` (recognisable brand shapes, uniform style).

**Email** is never written as a plain string in the HTML. It's stored split
(`emailUser` + `emailDomain`) and reassembled only after an intentional click in
`ContactEmail.astro`, so basic harvesters scraping the static source get nothing.
To change it, edit the two fields in `site.ts`.

**Media** is a multi-source archive: each entry in `src/content/writing/`
declares a `publication` (e.g. "Codemotion Magazine", "Medium") shown as a badge,
and an external `url`; `src/content/appearances/` contributes recordings and
podcasts without duplicating content files. The site remains the hub for work
published elsewhere, and external links open in a new tab automatically.

The Field notes archive lives at `/archive/` and `/it/archive/`. Home-page labels
link to filtered archive views such as `?type=podcast` or `?type=speaking`; the
archive remains readable without JavaScript and enhances filtering/pagination on
the client.
