# Audit report — accessibility, SEO, AI readiness

Run on the production build, June 2026.

## Accessibility (WCAG 2.1 AA)

Tested with **axe-core** (the industry-standard automated engine) via a real
headless browser, in **both light and dark themes**.

- **Result: 0 violations** in both themes, against the wcag2a, wcag2aa and
  wcag21aa rule sets.
- **One issue was found and fixed during the audit:** colour contrast on the
  faint grey text (the `~/luca-fregoso` brand mark and the "selected … archive"
  captions) fell below the 4.5:1 AA threshold. The faint-text colour was darkened
  in light mode (`#6a6a63`) and lightened in dark mode (`#8a93a0`); both now pass
  AA on every background they appear on, including the tinted sections.

What was already in place (and verified): semantic headings, `lang="en"`,
skip-link, alt text on images, visible focus states, ARIA on the lightbox dialog,
keyboard support (Esc / arrows), and `prefers-reduced-motion` honoured by every
animation (cursor, reveal-on-scroll, the live-dot pulse).

> Note: automated tools catch ~30–50% of accessibility issues. A zero-violation
> axe result is a strong baseline, not a guarantee. For a public professional
> site this is a solid place to be; a manual screen-reader pass (VoiceOver/NVDA)
> would be the next level if you want to go further.

## SEO

- **`sitemap-index.xml` + `sitemap-0.xml`** — generated automatically on every
  build via `@astrojs/sitemap`.
- **`robots.txt`** — added in `public/`, allows all crawlers and points to the
  sitemap. ⚠️ Update the `Sitemap:` URL to your final domain before publishing.
- Per-page `<title>`, meta description, canonical URL, Open Graph and Twitter
  cards: already present (in `BaseLayout.astro`).
- **JSON-LD `Person`** structured data: already present — helps search engines
  (and AI) treat you as a recognised entity with your roles and profile links.
- Content is **server-rendered static HTML** — fully readable without JavaScript,
  which is the single most important factor for both search and AI crawlers.

## AI readiness

- **`llms.txt`** added in `public/`. Honest expectation-setting: as of mid-2026
  this is **not** an SEO or AI-citation lever — major AI search crawlers
  (GPTBot, ClaudeBot, PerplexityBot) overwhelmingly ignore it and read your HTML
  directly, and Google has said it won't support it. It's included because the
  cost is trivial, it's a recognised signal in the developer/IDE-agent ecosystem
  (Cursor, Claude Code, etc. do read it), and it costs nothing to be early. Treat
  it as a low-effort nice-to-have, not a traffic driver.
- The real AI-readiness wins are the ones above: clean semantic HTML, static
  rendering, and JSON-LD structured data. Those you already have.

## Before publishing — checklist

1. `astro.config.mjs`: set `site` + `base` (or remove `base` for a custom domain).
2. `public/robots.txt`: update the `Sitemap:` URL to the real domain.
3. `public/llms.txt`: review the wording — it's your machine-readable bio.
4. Re-run the build and you're good.
