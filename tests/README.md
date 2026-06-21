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
- the email address never appears as plain text in the HTML source
- full-width tinted section bands do not collapse to the content width
- placeholder profiles never reach published links
- featured updates retain their lime marker without a card fill

**`tests/homepage.spec.ts`** — protects the homepage's core product contract:
- positioning, proof and section hierarchy remain present
- LinkedIn, Sessionize, CV and contact conversion paths remain valid
- landmark and heading structure stays navigable
- 320px mobile and tablet layouts do not overflow horizontally

**`tests/functional.spec.ts`** — the interactive pieces:
- lightbox opens, navigates between images, closes (Esc + backdrop)
- theme toggle switches and persists across reload
- external links open in a new tab with `rel="noopener"`; entry titles never do
- the obfuscated email reveals on interaction

**`tests/accessibility.spec.ts`** — axe-core, WCAG 2.1 AA, in **both themes**.
> Automated a11y tools catch ~30–50% of issues. A clean run is a strong
> baseline, not a guarantee — a manual screen-reader pass is the next level.

## Adding tests

Drop a new `*.spec.ts` file in `tests/`. When you fix a bug, add a test that
would have caught it — that's what the regressions file is for.

## Tip

Run the suite before every deploy. If something here goes red, don't push
until it's green again — it's catching a real regression.
