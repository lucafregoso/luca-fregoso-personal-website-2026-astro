---
target: "Media & writing section (#media)"
total_score: 35
p0_count: 0
p1_count: 0
timestamp: 2026-07-23T07-44-28Z
slug: src-pages-index-astro-media
---
# Critique — Media & writing (#media), post-rework

Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | archive CTA has weak resting affordance (no arrow/underline) |
| 2 | Match System / Real World | 4 | n/a |
| 3 | User Control and Freedom | 4 | n/a |
| 4 | Consistency and Standards | 2 | poster-card titles render accent green while featured/index titles use --text; card variant misses the `.appearance-details h3` color rule |
| 5 | Error Prevention | 4 | n/a |
| 6 | Recognition Rather Than Recall | 4 | n/a |
| 7 | Flexibility and Efficiency | 3 | duration omitted from card meta — can't budget a 1:03:23 listen |
| 8 | Aesthetic and Minimalist Design | 3 | top-right void on desktop slab; poster art repeats the h3 text |
| 9 | Error Recovery | 4 | n/a |
| 10 | Help and Documentation | 4 | n/a |
| **Total** | | **35/40** | **Good — address weak areas, solid foundation** (up from 28/40) |

## Anti-Patterns Verdict

LLM assessment: **NO** — "the opposite of a link graveyard." Genuine curation (featured/library/archive tiers), three distinct card anatomies, bespoke poster art in the site's palette, honest archive count. The identical-card-grid and link-graveyard patterns from the previous run are gone.

Deterministic scan: CLI clean (0 findings, exit 0) on index.astro, AppearanceEntry.astro, ExternalLink.astro. In-page detector: 1 in-scope finding (tight-leading 1.15 on the featured h3) — false positive: conventional display leading on balanced display type. Page-level, out of scope: site-header min-height transition; hero-role --text-meta size (intentional mono metadata); hero-visual img hover transform lacks a reduced-motion transform reset (real, hero-scope — flagged for polish).

## Priority Issues

- [P2] Card title color inconsistency: `.appearance-details h3 :global(a) { color: var(--text) }` (AppearanceEntry.astro:147) never matches the card variant, so poster-card titles render accent green vs --text on featured/index. Fix: mirror the color + hover rules for `.appearance-card h3`.
- [P3] Dangling "·" on wrap: the separator is hardcoded in the publisher span; on mobile it orphans at line end before the date. Fix: render via CSS (`span + time::before`).
- [P3] Archive CTA affordance: only route to 4 of 6 written pieces reads like a caption at rest. Fix: arrow glyph or resting underline, matching the site's link grammar.
- [P3] `cursor: pointer` on card padding is a dead promise with JS off (click delegation is JS). Cosmetic; real links remain.

## Persona Red Flags

- Jordan: both visible recordings are "in Italian" — the two loudest artifacts are ones an international manager can't consume; EN featured essay mitigates. No duration on cards.
- Casey: featured rail wraps ragged on mobile (badge alone on its line); dangling "·" in viewport.
- Riley: hardcoded separator, JS-off pointer, title-color inconsistency; archive count is computed so it can't drift.

## Minor Observations

- The media-index third tier renders for zero items today — dark inventory until a piece carries `placement: library`.
- schema.org markup on library appearances is a nice invisible-proof touch.
- Accent text colors clear WCAG AA in both themes; lime stays structural.

## Questions to Consider

1. Two of three visible artifacts are Italian-language — what EN recording could earn a library slot to make the international case?
2. The slab's top-right void + disguised-filter ARTICLE badge: should that corner carry something that works (reading time, real label, arrowed link)?
3. Succession plan: when the next EN piece lands, what demotes where? (featured → library → archive is one edit per file, but the editorial decision is Luca's.)
