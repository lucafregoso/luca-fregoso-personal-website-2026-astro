# Audit report — accessibility, SEO, AI readiness

Updated against the production build on 21 June 2026.

## Accessibility (WCAG 2.2 AA)

Tested with **axe-core** (the industry-standard automated engine) via a real
browser in **both light and dark themes**, including the open image dialog.

- **Automated result: 0 violations** against WCAG 2.0 A/AA, 2.1 AA and 2.2 AA.
- **Regression result: 31 Playwright tests passed.**
- Verified: colour contrast, landmarks, heading structure, labels, alt text,
  320px reflow, a 200%-zoom-equivalent viewport, 44px compact controls,
  reduced motion, forced-colors focus visibility and no-JavaScript content.
- The native image dialog keeps focus inside, exposes every enabled control,
  supports arrows/Escape/swipe, announces image changes and restores focus.
- External links consistently announce that they open a new tab; internal links
  remain in the current tab.
- Contact uses a deliberate reveal step, a public alias, separate mail/copy
  actions and live feedback. The personal Gmail address is absent from HTML and
  machine-readable public text.

### Manual verification matrix

These checks cannot be certified by automation and should be repeated before a
major release:

| Environment | Journey | Status |
|---|---|---|
| Safari + VoiceOver | Landmarks, links, contact reveal, image dialog | Pending manual pass |
| Chrome + NVDA | Reading order, live announcements, dialog controls | Pending manual pass |
| Keyboard only | Skip link, full page order, dialog, contact actions | Covered automatically; manual spot-check pending |
| Browser zoom 200% and 400% | Reflow, clipping and readability | 200% equivalent automated; manual browser zoom pending |
| Windows forced colors | Focus, buttons, links and dialog controls | Core focus automated; full visual pass pending |

> Note: automated tools catch ~30–50% of accessibility issues. A zero-violation
> axe result is a strong baseline, not formal WCAG certification.

### Privacy release blocker

`public/cv.pdf` still contains the personal Gmail address and mobile number.
Replace it with the user-supplied export containing `hello@luca-fregoso.com`
and no phone number, then inspect the rendered PDF and re-run text extraction
before deployment.

## SEO

- **`sitemap-index.xml` + `sitemap-0.xml`** — generated automatically on every
  build via `@astrojs/sitemap`.
- **`robots.txt`** allows all crawlers and points to the current sitemap.
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

1. Replace and verify `public/cv.pdf` as described above.
2. Complete the VoiceOver and NVDA manual passes.
3. Review `SITE_URL`, `BASE_PATH`, `robots.txt` and `llms.txt` when moving domains.
4. Run `npm run check`, `npm test` and `npm run build`.
