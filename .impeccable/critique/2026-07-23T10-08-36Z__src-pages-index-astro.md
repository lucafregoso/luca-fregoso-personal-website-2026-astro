---
target: full homepage (index.astro)
total_score: 36
p0_count: 0
p1_count: 0
p2_count: 3
timestamp: 2026-07-23T10-08-36Z
slug: src-pages-index-astro
---
# Critique — full homepage (src/pages/index.astro)

Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "Updated" is build date (documented tradeoff); whole-card click only signaled on hover |
| 2 | Match System / Real World | 4 | n/a — terminal metaphor audience-correct, plain-language badges |
| 3 | User Control and Freedom | 4 | n/a |
| 4 | Consistency and Standards | 3 | Lately CTA drops the arrow; featured/feed meta order inverted; intersection cards look clickable but aren't |
| 5 | Error Prevention | 4 | n/a |
| 6 | Recognition Rather Than Recall | 4 | n/a — nav labels match section titles exactly |
| 7 | Flexibility and Efficiency | 4 | n/a |
| 8 | Aesthetic and Minimalist Design | 4 | hero carries 5 text blocks before the CTA — densest spot |
| 9 | Error Recovery | 3 | "1 more articles" plural bug possible |
| 10 | Help and Documentation | 3 | colophon + CV; enough |
| **Total** | | **36/40** | **Excellent band — minor polish only** |

## Anti-Patterns Verdict

**NOT slop — authored at both altitudes.** Category-reflex check passes: no centered gradient hero, no icon-card grid, no link graveyard, no eyebrows. Band rhythm (light → ink → tinted → ink → light → tinted → dark) is composed; two-voice typography discipline airtight across 7 sections and 4 card variants. Residual reflex: Talks is the least-authored component (three equal white cards) — the one template-shaped moment.

Deterministic scan: 2 CLI findings — SiteHeader.astro:139 min-height transition (REAL: layout thrash on a sticky header; fix with transform/grid-template-rows) and Lightbox.astro:20 empty src (FP: runtime-assigned template). In-page: hero-role 11.5px (FP: --text-meta mono), featured h3 leading 1.15 (FP borderline: dense when wrapped ~8 lines at tiny widths), image-hover transforms (FP: all three reduced-motion overrides verified in CSSOM).

## Priority Issues

- [P2] Dark-mode contact panel invisible: hardcoded #0b0e13 on page bg #0d1117 (index.astro:621) — the closing conversion moment flattens at peak-end. Fix: dark override like .band-ink's #161e2b or a band border.
- [P2] Egg cursor contrast: `.egg.is-typing .egg-command::after` uses --accent-text (~3:1 olive on ink in light theme, index.astro:650) while the prompt correctly uses --accent-text-dark. Fix: same var as .egg-prompt.
- [P2] Closed-type-scale violation: raw `clamp(1.4rem, 2.4vw, 2rem)` at AppearanceEntry.astro:183 — --text-display-sm is the intended token.
- [P3] SiteHeader min-height layout transition (SiteHeader.astro:139) — re-layout on every scroll-state flip.
- [P3] Lately archive CTA missing the arrow every other section-final CTA carries (index.astro:276).
- [P3] Lime as text in .ix-stat strong (index.astro:524) vs the written "lime never text" invariant — codify an exemption or switch to --accent-text-dark. (Luca's call.)
- [P3] archiveCta plural bug: "1 more articles" when the archive drops to one (i18n/index.ts:104).
- [P3] Featured vs feed meta order inversion (index.astro:231-234 vs 252-254).
- [P3] Intersection cards rhyme with clickable cards but are inert — second interaction contract. (Accept as display band, or extend delegation. Luca's call.)

## Strengths

1. Intersection cards are the best 30-second asset: axis (mono) + claim (display) + true number ("600 → 1") — exactly what a skimming DevRel/presales manager needs.
2. Two-voice discipline: mono never leaks into prose, sans never does meta duty — this is why the page reads as one system.
3. Robustness engineering matches the pitch: no JS-gating, reduced-motion everywhere, modified-click passthrough, email anti-harvesting. The site is evidence for "engineer who learned stages."

## Persona Red Flags

- Jordan: skim path works (name → role → metrics → axes inside 30s). One flag: no present-tense affiliation/availability until the footer — "where is he now?" unanswered above the fold.
- Casey: none serious; leading "· date" dot on wrap is the documented tradeoff.
- Riley: plural bug, egg cursor, dark panel edge. No-JS and reduced-motion genuinely handled.

## Minor Observations

- Card 3 in Work: stat floats with a large gap above (margin:auto bottom-alignment raggedness).
- Media featured rail reads slightly detached from the title block — the page's only floaty element.
- var(--dark-text, #e6edf3) references an undefined variable (fallback saves it) — dead token.
- Three consecutive ON STAGE badges at the top of Lately mute the kind-badge payoff (data, not design).

## Questions to Consider

1. Should talk cards get poster art (real event identities: Codemotion Rome, DevFest Milano) the way media appearances did — or is one plain section the necessary rest beat?
2. Is withholding present-tense affiliation until the footer deliberate consultant positioning, or a hole a 30-second manager falls into?
3. If "lime is never text" needs an exception the first time a display numeral hits a dark band — is the rule wrong or the design?
