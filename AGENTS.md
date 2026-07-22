# luca-fregoso.com — personal site

Astro 5 static site, deployed to GitHub Pages. EN-first, with a fully
maintained (currently unrouted) Italian locale.

> This file is the canonical instruction set for **every** coding agent
> working in this repo (`CLAUDE.md` is a symlink to it). The Purpose and
> Copy rules below are not background flavor — they are acceptance
> criteria for any content review or content creation task.

## Purpose — read this before touching any copy or design

This site exists to give Luca **online visibility** and make him
**attractive to companies hiring for DevRel, technical presales and
specialist roles** — international, full-remote preferred. His deep
technical background (15 years building software, web-agency owner
before that) is the differentiator and must stay front and center:
he is not a marketer who learned tech, he is an engineer who learned
stages, sales rooms and classrooms.

Every content or design decision gets evaluated against one question:
*does this make a DevRel/presales/specialist hiring manager, skimming
for 30 seconds, want to start a conversation?*

Positioning pillars: technology events · software engineering · tech
community management · training · program/project management · a
geek/nerd streak kept in the margins (easter eggs, terminal voice).

## Copy rules (hard requirements)

- **Luca writes his own copy in both languages.** Anything an agent
  drafts must match his voice — derive it from the existing corpus
  (`src/content/now/*.md` blurbs, talk abstracts, writing summaries):
  verb-first actions, one em-dash pivot + short kicker, jokes made of
  true details, numbers always attached to objects. Never gerund
  triplets, never identity claims, never "passionate/leverage/proven".
- **EN and IT are siblings, not translations** — native phrasing in
  each, same tone. Even while IT is unrouted, keep both in sync.
- **Never invent facts or numbers.** Verified set: 20+ years in tech,
  15 building software, web agencies then his own agency, 5,000+
  proposals evaluated, 7 Codemotion editions (Milan/Madrid/Rome),
  ~600 submissions/edition, 2,000–3,000 devs per event, 20+ learning
  paths, academy built 0→1. Anything else: ask Luca.
- External links to Italian-language content carry a "(in Italian)"
  marker on the EN site (schema fields `lang` / `urlLang`).

## Design system

`PRODUCT.md` and `DESIGN.md` are the design context (read by the
`/impeccable` skill). Key invariants: Schibsted Grotesk (display via
weight 800) + Fragment Mono (labels, single weight 400, tracking 0);
the tokenized type scale in `src/styles/global.css` is closed — no new
font-size literals; lime `#d0db02` is structural only, never text;
every animation has a reduced-motion fallback; content never depends
on JS to be visible.

## Commands

Default shell node is ancient (v12) — always use nvm's node 24:

```bash
export PATH="$HOME/.nvm/versions/node/v24.1.0/bin:$PATH"
pnpm dev          # dev server (port 4321, base path /luca-fregoso-personal-website-2026-astro/)
pnpm run check    # astro check + cms check
pnpm run build    # production build (base path) — build:test for the no-base-path variant
pnpm test         # Playwright, --workers=1 (spawns its own server on 4399)
```

The full gate before calling anything done: `check` + `build` + `test`
green, axe accessibility specs included.

## Structure

- `src/data/site.ts` — single source of truth for identity, hero copy,
  metrics, intersection cards, links. Never hard-code copy in components.
- `src/i18n/index.ts` — all EN + IT UI strings. `activeLocales` gates
  which locales are routed (IT currently disabled; restore it there
  plus `src/pages/it/` from git history to re-enable).
- `src/content/{now,talks,writing,appearances}/` — content collections
  (schema in `src/content.config.ts`). `now` is the Lately feed.
- `src/pages/index.astro` — the homepage, structure and all section styles.
- `tests/` — Playwright contracts, including copy assertions; update
  them together with copy changes. `tests/regressions.spec.ts` entries
  guard bugs that actually happened — never delete them.

## Gotchas

- The email address must never appear as plain text in HTML/JSON-LD
  (it is split across data attributes — see `ContactEmail.astro`).
- "Updated {date}" in Lately is the build date, not a content date.
- The hero image also serves as the og:image; keep `site.ts`,
  `index.astro` and the i18n alt text in sync when swapping it.
