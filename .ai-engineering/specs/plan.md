---
spec: spec-001
title: Homepage storytelling redesign
status: approved
pipeline: standard
phases: 6
execution_route:
  version: 1
  spec: spec-001
  executor: build
  automation: hitl
  concern_count: 1
  estimated_files: 7
  reason: Single-concern homepage redesign touching content, layout, component styles and tests; below autopilot threshold.
  safe_next_command: "/ai-build"
---

# Plan — spec-001 Homepage Storytelling Redesign

## Design

Design intent captured at `.ai-engineering/specs/spec-001/design-intent.md` (auto-routed from /ai-plan because matched keywords: page, layout, typography, accessibility).

## Architecture

Pattern: ad-hoc static-content component architecture.

Rationale: this Astro site already separates structured content (`src/data/site.ts`, `src/i18n/index.ts`, Content Collections), presentation (`src/pages/index.astro`, components) and verification (`tests/*.spec.ts`). The approved spec is a single homepage storytelling redesign, not a domain architecture change; introducing layered/hexagonal abstractions would violate §10.1 KISS and §10.2 YAGNI.

## Phase 1: RED tests for the new homepage contract

- [x] T-1.1 — RED: assert hero signature and technical-glue positioning
  - Agent: build
  - Files: `tests/homepage.spec.ts:8`
  - Principles applied: §10.5 TDD, §10.6 SDD
  - Patch (deterministic):
    ```diff
    --- a/tests/homepage.spec.ts
    +++ b/tests/homepage.spec.ts
    @@
    -    await expect(
    -      page.getByRole('heading', { level: 1, name: 'I design technical programs people trust.' })
    -    ).toBeVisible();
    +    await expect(page.locator('.hero-signature')).toContainText('Luca Fregoso');
    +    await expect(
    +      page.getByRole('heading', { level: 1, name: 'I design technical programs people trust.' })
    +    ).toBeVisible();
    +    await expect(page.locator('.hero-intro')).toContainText(/technical glue/i);
    ```
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "communicates identity"`

- [x] T-1.2 — RED: assert metrics are three grouped impact blocks
  - Agent: build
  - Files: `tests/homepage.spec.ts:30`
  - Principles applied: §10.5 TDD, §10.6 SDD
  - Patch (deterministic): update the existing metrics contract to expect exactly three `.metric-group` elements, group labels for technical foundation / program design / community rooms, and continued presence of the existing proof numbers.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "career-wide proof"`

- [x] T-1.3 — RED: assert Lately renders as an accessible editorial timeline
  - Agent: build
  - Files: `tests/homepage.spec.ts:42`
  - Principles applied: §10.5 TDD, §10.6 SDD
  - Patch (deterministic): add expectations for `#lately .timeline`, timeline items, visible date/node affordances, preserved archive CTA, and hover/focus state that changes a non-color-only property.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "timeline"`

- [x] T-1.4 — RED: assert Media homepage is a five-card deck with archive continuation
  - Agent: build
  - Files: `tests/media-links.spec.ts:1`, `tests/functional.spec.ts:122`
  - Principles applied: §10.5 TDD, §10.6 SDD
  - Patch (deterministic): add a media-deck test that expects `#media .media-card` count `<= 5`, at least one typographic article card, secure external title links, and a visible archive link.
  - Gate: `pnpm exec playwright test tests/media-links.spec.ts tests/functional.spec.ts -g "media"`

- [x] T-1.5 — RED: assert footer easter egg exists without becoming a free-call CTA
  - Agent: build
  - Files: `tests/homepage.spec.ts:105`
  - Principles applied: §10.5 TDD, §10.6 SDD
  - Patch (deterministic): add expectations for a `.footer-easter-egg` / `.brief-spark` style block containing unusual/complex brief copy and not containing `free`, `gratis`, or `20 minutes`.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "conversion paths"`

## Phase 2: Copy and data model refinements

- [x] T-2.1 — GREEN: update EN site copy around technical glue
  - Agent: build
  - Files: `src/data/site.ts:48`
  - Principles applied: §10.6 SDD, §10.7 Clean Code
  - Patch (deterministic): no deterministic patch; requires copywriting judgment. Update hero support copy, metric groups and case-study language to match spec decisions D-001-01 and D-001-03.
  - Gate: `pnpm run check`

- [x] T-2.2 — GREEN: update IT localized copy naturally
  - Agent: build
  - Files: `src/i18n/index.ts:121`
  - Principles applied: §10.6 SDD, §10.7 Clean Code
  - Patch (deterministic): no deterministic patch; requires natural Italian localization. Translate the concept rather than forcing literal “collante tecnico” where awkward.
  - Gate: `pnpm run check`

- [x] T-2.3 — GREEN: expose grouped metrics and footer easter egg through typed data
  - Agent: build
  - Files: `src/data/site.ts:54`, `src/i18n/index.ts:40`
  - Principles applied: §10.3 SOLID, §10.4 DRY
  - Patch (deterministic): replace flat metrics consumption with grouped data fields in the existing data/i18n layer, keeping EN/IT parity and TypeScript inference.
  - Gate: `pnpm run check`

## Phase 3: Homepage structure and Work/Impact redesign

- [x] T-3.1 — GREEN: render hero signature and simplified proof stack
  - Agent: build
  - Files: `src/pages/index.astro:129`
  - Principles applied: §10.1 KISS, §10.6 SDD
  - Patch (deterministic): no deterministic patch; restructure hero markup to add `.hero-signature`, preserve one h1, keep CTA/profile links and image semantics.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "identity"`

- [x] T-3.2 — GREEN: render three grouped impact blocks
  - Agent: build
  - Files: `src/pages/index.astro:160`
  - Principles applied: §10.1 KISS, §10.4 DRY
  - Patch (deterministic): no deterministic patch; map grouped metrics into `.metric-group` blocks with semantic headings and proof chips.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "career-wide proof"`

- [x] T-3.3 — GREEN: separate capability groups and proof cards visually
  - Agent: build
  - Files: `src/pages/index.astro:175`
  - Principles applied: §10.1 KISS, §10.7 Clean Code
  - Patch (deterministic): no deterministic patch; tune markup/classes only where needed so Work reads as narrative groups plus evidence, not two competing tables.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "page order"`

- [x] T-3.4 — REFACTOR: consolidate repeated card typography and badge rhythm
  - Agent: build
  - Files: `src/pages/index.astro:358`, `src/styles/global.css:1`
  - Principles applied: §10.4 DRY, §10.7 Clean Code
  - Patch (deterministic): no deterministic patch; reduce repeated font-size chaos by introducing local CSS variables/classes where they reduce duplication without over-abstracting.
  - Gate: `pnpm run check`

## Phase 4: Lately editorial timeline

- [x] T-4.1 — GREEN: convert Lately feed markup to timeline structure
  - Agent: build
  - Files: `src/pages/index.astro:204`
  - Principles applied: §10.1 KISS, §10.5 TDD
  - Patch (deterministic): no deterministic patch; keep existing data ordering, upcoming item, featured entry and archive link while wrapping past entries in `.timeline` / `.timeline-item` semantics.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts -g "timeline|updated|labels"`

- [x] T-4.2 — GREEN: style timeline rail, nodes and microinteractions
  - Agent: build
  - Files: `src/pages/index.astro:414`
  - Principles applied: §10.1 KISS, §10.7 Clean Code
  - Patch (deterministic): no deterministic patch; implement CSS-only transform/opacity/background states with hover/focus parity and reduced-motion fallback.
  - Gate: `pnpm exec playwright test tests/functional.spec.ts -g "reduced motion"`

- [x] T-4.3 — VERIFY: preserve media galleries and lightbox behavior inside timeline entries
  - Agent: verify
  - Files: `src/components/Media.astro:26`, `tests/media-links.spec.ts:146`
  - Principles applied: §10.4 Goal-Driven Execution, §10.5 TDD
  - Patch (deterministic): verification only.
  - Gate: `pnpm exec playwright test tests/media-links.spec.ts -g "Docebo"`

## Phase 5: Media card deck

- [x] T-5.1 — GREEN: render homepage Media as max-five card deck
  - Agent: build
  - Files: `src/pages/index.astro:301`
  - Principles applied: §10.1 KISS, §10.5 TDD
  - Patch (deterministic): no deterministic patch; slice homepage library to five cards, preserve full archive data source, and add archive CTA.
  - Gate: `pnpm exec playwright test tests/media-links.spec.ts -g "card deck"`

- [x] T-5.2 — GREEN: adapt AppearanceEntry for deck cards without breaking archive rows
  - Agent: build
  - Files: `src/components/AppearanceEntry.astro:38`
  - Principles applied: §10.3 SOLID, §10.7 Clean Code
  - Patch (deterministic): no deterministic patch; add a card variant or class path for homepage deck while preserving feed/archive variants and secure external links.
  - Gate: `pnpm exec playwright test tests/media-links.spec.ts`

- [x] T-5.3 — GREEN: add typographic article-card fallback
  - Agent: build
  - Files: `src/pages/index.astro:307`
  - Principles applied: §10.1 KISS, §10.7 Clean Code
  - Patch (deterministic): no deterministic patch; articles without thumbnails must render as intentional typographic cards with badge, title, summary, publication and secure external title link.
  - Gate: `pnpm exec playwright test tests/functional.spec.ts -g "media and article titles"`

## Phase 6: Visual QA, accessibility and documentation

- [x] T-6.1 — GREEN: add/update responsive and dark-mode tests for redesigned sections
  - Agent: build
  - Files: `tests/homepage.spec.ts:126`, `tests/accessibility.spec.ts:38`
  - Principles applied: §10.5 TDD, §10.6 SDD
  - Patch (deterministic): add checks for 320px/390px no overflow, dark-mode card separation, 44px interactive targets inside media deck and timeline focus visibility.
  - Gate: `pnpm exec playwright test tests/homepage.spec.ts tests/accessibility.spec.ts`

- [x] T-6.2 — VERIFY: run full quality suite
  - Agent: verify
  - Files: `package.json:7`
  - Principles applied: §4 Goal-Driven Execution, §10.5 TDD
  - Patch (deterministic): verification only.
  - Gate: `pnpm run check && pnpm run build && pnpm test && git diff --check`

- [x] T-6.3 — GUARD: manual design review against approved intent
  - Agent: guard
  - Files: `.ai-engineering/specs/spec-001/design-intent.md:1`
  - Principles applied: §8 Demand Elegance, §10.6 SDD
  - Patch (deterministic): advisory only.
  - Gate: inspect EN/IT, light/dark, 320px, 768px, 1440px; confirm no generic AI look, no link cemetery, no over-dense first screen.

- [x] T-6.4 — GUARD: document any changed editorial conventions
  - Agent: build
  - Files: `README.md:20`
  - Principles applied: §10.4 DRY, §10.7 Clean Code
  - Patch (deterministic): update CMS/content notes only if grouped metrics or media deck introduce new editing conventions.
  - Gate: `pnpm run cms:check`

## Self-review

- Iteration 1 concern: original task split risked hiding TDD behind broad visual work. Resolved by adding Phase 1 RED tests before any GREEN implementation tasks.
- Iteration 1 concern: media deck could break existing appearance archive contracts. Resolved by isolating card work behind a variant and retaining explicit gates for existing media-link tests.
- Iteration 1 concern: design routing required an artifact. Resolved by writing `.ai-engineering/specs/spec-001/design-intent.md` and linking it above.

safe_next_command: `/ai-build`
