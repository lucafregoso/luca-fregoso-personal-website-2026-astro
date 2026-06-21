# Tests

End-to-end tests with [Playwright](https://playwright.dev). They build the
site, serve it locally, and check it in a real browser — no manual setup.

## First-time setup

```bash
npm install
npx playwright install chromium   # downloads the browser (once)
```

## Running

```bash
npm test            # run everything (headless)
npm run test:ui     # interactive UI mode — great for watching/debugging
npm run test:report # open the HTML report after a run
```

`npm test` automatically builds the site (at the root path, via
`PLAYWRIGHT_TEST=1`) and serves it on a **dedicated port (4399)** before
testing — your real deploy config in `astro.config.mjs` is untouched.

> **Why port 4399 and not 4321?** The default Astro port (4321) is often busy
> with a `dev` server from another project. The tests use 4399 and always
> start a fresh server, so they can never accidentally run against the wrong
> site. (If you ever see tests failing with content from a different project,
> that's exactly the bug this avoids — check nothing else is on 4399.)

## What's covered

**`tests/regressions.spec.ts`** — guards bugs that actually happened:
- the page title never says "undefined"
- no `undefined` anywhere in `<head>` (meta tags / JSON-LD)
- talks & writing content is visible **even with JavaScript disabled**
- the personal email and phone never appear in HTML or machine-readable text
- full-width tinted section bands do not collapse to the content width
- placeholder profiles never reach published links
- featured updates retain their lime marker without a card fill

**`tests/homepage.spec.ts`** — protects the homepage's core product contract:
- positioning, proof and section hierarchy remain present
- LinkedIn, Sessionize, CV and contact conversion paths remain valid
- landmark and heading structure stays navigable
- 320px, 200%-zoom-equivalent and tablet layouts do not overflow horizontally
- compact primary controls retain at least 44×44px targets

**`tests/functional.spec.ts`** — the interactive pieces:
- native image dialog traps focus correctly, announces navigation, supports
  arrows/Escape/backdrop and restores focus
- theme toggle switches and persists across reload
- external links securely open and announce a new tab; internal links never do
- the email alias reveals deliberately, exposes mail/copy actions and announces
  clipboard success
- skip-link focus, reduced motion and forced-colors focus indicators

**`tests/header-i18n.spec.ts`** — bilingual navigation and responsive header:
- English and Italian `lang`, canonical and `hreflang` metadata
- locale switcher current-page state and navigation
- mobile menu ARIA state, Escape/link close behavior and focus restoration
- scroll-direction hide/show behavior and compact state
- 44×44px mobile header and navigation targets

**`tests/accessibility.spec.ts`** — axe-core, WCAG 2.2 AA, in **both themes**
and **both locales** for the idle page and open image dialog.
> Automated a11y tools catch ~30–50% of issues. A clean run is a strong
> baseline, not a guarantee — a manual screen-reader pass is the next level.

## Adding tests

Drop a new `*.spec.ts` file in `tests/`. When you fix a bug, add a test that
would have caught it — that's what the regressions file is for.

## Tip

Run the suite before every deploy. If something here goes red, don't push
until it's green again — it's catching a real regression.
