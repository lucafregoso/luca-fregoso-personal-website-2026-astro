---
target: homepage (src/pages/index.astro)
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-07-06T12-15-39Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design-review sub-agent · B: detector sub-agent) + parent browser overlay pass

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "Updated {date}" + upcoming badge good; no active-section state in nav; mobile header auto-hide can disorient |
| 2 | Match System / Real World | 3 | "pitch → prod" is styled as a stat but isn't one; "600 → 1" opaque until its label is read |
| 3 | User Control and Freedom | 3 | Whole-card programmatic click swallows text-selection drags and cmd/middle-click new-tab intent |
| 4 | Consistency and Standards | 2 | Legacy global.css layer (`.section` border-top, `h2 1.6rem`, dead `.card`/`.tag`/`.pulse`) collides with the scoped system; ~5 raw font-size clamps violate DESIGN.md's "seven tokens and nothing else" |
| 5 | Error Prevention | 3 | New-tab announcements, PDF aria-labels, copy-fail fallback — solid |
| 6 | Recognition Rather Than Recall | 3 | Badge-as-archive-filter affordance invisible; appearances appear in two sections depending on `placements` |
| 7 | Flexibility and Efficiency | 3 | Skip link, anchors, filters, EN/IT parity; email is two-step with no fast path |
| 8 | Aesthetic and Minimalist Design | 2 | Hero stacks 4 text blocks + 5 actions; the same facts stated three times (hero proof ≈ first metric ≈ intersection stats) |
| 9 | Error Recovery | 3 | Copy-fail message includes recovery instruction; little error surface |
| 10 | Help and Documentation | 3 | Colophon + devtools note; solid for the genre |
| **Total** | | **28/40** | **Good — solid foundation, address weak areas** |

## Anti-Patterns Verdict

**LLM assessment:** Not immediately AI-made. Gradient text, glassmorphism, eyebrows, numbered sections, side stripes: all absent (and the one legacy side-accent, AppearanceEntry's hover bar, is suppressed inside the timeline). Two residual tells: (1) **the 6-cell metrics strip after the hero IS the hero-metric template** — big value + small label grid — and half its "values" aren't numbers (MC, Presales, Mentoring); (2) second-order, acid-lime-on-ink + variable grotesque + terminal eggs sits inside the saturated "developer-portfolio editorial-terminal" lane — execution is above the lane's median (mono is scoped, not costume), but the palette itself won't read as unusual.

**Deterministic scan (CLI):** 2 findings. `broken-image` at Lightbox.astro:20 — **false positive** (JS-populated dialog template, never rendered empty). `layout-transition` at SiteHeader.astro:139 (`min-height .2s` on the compact header) — real but low-impact, fires once per scroll threshold, known and accepted.

**Visual overlays:** injection succeeded — overlays are visible in the preview tab. The in-page detector added: `tiny-text` on `p.talk-events.mono` (11.2px — content-ish text at meta size); `body-text-viewport-edge` (a 152-char paragraph within 10px of the viewport edge at narrow width — needs verification, likely the embedded preview's viewport); `image-hover-transform` (hero/thumbnail hover zooms — intentional, register-appropriate); `layout-transition` (duplicate of CLI).

## Overall Impression

The two-voice identity is real and the ink-band section with lime result numerals is a genuine peak — this no longer reads as a template. But the page still hedges: a metrics strip restates facts the intersections already prove, the hero answers "what does he do" with an abstraction while the literal job title never appears on screen, and one mobile regression breaks the Lately rail — the signature element — on the audience's most common device. The single biggest opportunity: trust the intersections and delete what repeats them.

## What's Working

1. **The two-voice grammar is enforced, not claimed** — mono appears only on metadata, nav, badges, buttons, eggs; body copy never goes monospace. Exactly the discipline that separates this from costume-mono portfolios.
2. **The intersection card anatomy is proof-dense and terse** — axis / title / one sentence / display stat / CTA, lime top rule where a template would put a side stripe. The anti-slop decisions are visible in CSS comments.
3. **Trust compounds through honest details** — measured-not-claimed Lighthouse scores with a date, verified-only socials, reveals that only subtract from a visible default, reduced-motion everywhere including the eggs.

## Priority Issues

1. **[P1] Mobile rail dots detach from the timeline.** index.astro:643 repositions `::after` at ≤620px but the dots are `::before` (:505) — verified in source. On phones the dots hang in the gutter off the rail. **Fix:** change `::after` to `::before` on line 643. *Command: /impeccable polish*
2. **[P1] The metrics strip is the surviving AI-template tell.** Hero-metric grid, 6 cells (3 non-numeric), restating facts the hero proof and the intersection stats already carry — the same information three times before mid-page. **Fix:** delete it, or keep exactly 3 true numbers not duplicated elsewhere and fold MC/Presales/Mentoring into prose. *Command: /impeccable distill*
3. **[P1] The visible page never states the job title.** "Developer Programs & Content Lead" exists only in the document title. First-time visitors' first question is answered nowhere on screen. **Fix:** one mono meta line under the H1: tagline + location. *Command: /impeccable clarify*
4. **[P2] The stylesheet contradicts its own constitution.** Legacy global.css layer (`.section` border-top + `h2 1.6rem`, dead `.card`/`.tag`/`.section-label`/`.pulse`) collides with the scoped homepage styles (order-dependent 1px line risk atop the ink band), and ~5 raw font-size clamps violate the documented "no new font-size literals" rule. **Fix:** purge the legacy block; tokenize or explicitly amend the display clamps. *Command: /impeccable polish*
5. **[P2] Contact panel decision overload at the conversion point.** Eight near-equal actions (email, LinkedIn, CV, 5 socials) where the stated success metric is one action. **Fix:** email dominant, LinkedIn secondary, CV + socials demoted to one quiet row. *Command: /impeccable distill*

## Persona Red Flags

- **Jordan (first-timer):** no visible job title; "Discuss a complex brief" presumes a brief exists; "pitch → prod" looks like a stat but isn't; kind badges ("wrote", "shipped") are charming but opaque on first contact.
- **Casey (mobile):** broken rail dots (P1); hero at ≤620px stacks name + 3 paragraphs + 2 full-width buttons + 3 links + 330px image before any proof; auto-hiding header removes the Contact escape mid-scroll; unbounded media grid becomes a very long single column.
- **Riley (stress tester):** selecting text in any card fires the delegated programmatic click on release — no selection-state guard; cmd/middle-click on card whitespace loses new-tab intent; "Updated {date}" prints build time, not content time.
- **Hiring manager, 30-second skim:** the on-stage hero photo is exactly right; but Talks offers three identical "session" badges and no footage — the videos live two sections lower under "Media & writing", a label nobody scans for "watch him speak"; email requires a reveal click.

## Minor Observations

- `p.talk-events.mono` at 11.2px is content-adjacent text at metadata size (overlay `tiny-text` finding) — consider `--text-ui`.
- Whole-card click delegation needs a selection guard and should ignore modified clicks (Riley's finding; borderline P2).
- `theme-color` paints the mobile address bar full lime — the one place "lime is structural-only" breaks, at OS level.
- Line clamps (talk abstracts 3, card summaries 2) truncate with no affordance that more exists.
- `.upcoming li` can squeeze long titles at ~375px; egg observer threshold 0.9 is fragile on very small viewports.
- "Updated {buildDate}" is compile-time, not content-time — theater vs craft question below.
- `body-text-viewport-edge` overlay finding needs verification at a real 375px device width.

## Questions to Consider

1. If the intersection stats are the proof, what is the metrics strip *for* — load-bearing, or a security blanket inherited from the exact genre this site swears it isn't?
2. "Updated by hand, on purpose" is the identity — but "Updated 06 Jul" is the compiler's date. Would a visitor who notices feel more trust, or less?
3. Nobody on the page says what Luca *is*. Is "I design technical programs people trust" doing positioning work, or elegantly dodging the visitor's first question?
