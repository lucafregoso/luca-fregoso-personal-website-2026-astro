---
spec: spec-001
title: Homepage storytelling redesign
status: in-progress
effort: medium
summary: Reframe the homepage around Luca as the technical glue between strategy, delivery, sales, content and developer communities, with clearer impact blocks, an editorial timeline and a compact media deck.
---

# Spec 001 - Homepage Storytelling Redesign

## Summary

The current homepage contains strong ingredients but asks visitors to connect too many signals at once: the name is understated, the impact area blends metrics and examples together, the lower sections risk becoming long link lists, and some copy sounds more like a generic sales pitch than Luca’s real value. This redesign will keep the strongest positioning — “I design technical programs people trust” — while reframing the page around Luca as the technical glue between strategy, sales, delivery, content and developer communities, with an editorial rhythm that feels alive without compromising accessibility, SEO or maintainability.

## Goals

- Make Luca’s identity immediately clear by rendering “Luca Fregoso” as a prominent hero signature above the existing trust-focused claim.
- Reduce first-screen overload by simplifying the hero eyebrow and moving supporting proof into a clearer narrative hierarchy.
- Replace the six isolated metric cells with three visually distinct impact groups that pair numbers with meaning: technical foundation, program design and community rooms.
- Rewrite the “ambitious promises” case-study language into concrete “technical glue” positioning that explains how Luca connects business intent, technical credibility and delivery.
- Make the Work/Impact section easier to scan by separating capability groups and proof cards more clearly in both light and dark mode.
- Reduce perceived typography chaos by using a smaller, consistent type scale for hero support copy, cards, badges and archive-like rows.
- Redesign Lately as a vertical editorial timeline with accessible hover/focus microinteractions, keeping the “Updated” build-date signal.
- Redesign Media & writing as a compact card deck with at most five homepage cards plus an archive link, including a deliberate text-first fallback for article cards without thumbnails.
- Keep navigation clear and aligned with homepage sections: Work, Lately, Talks, Media and Contact.
- Add a restrained final-page easter egg that invites unusual or complex briefs without presenting a discount, free-call offer or lead-generation gimmick.
- Preserve bilingual EN/IT content, crawlable content, structured data, archive URLs, keyboard access, reduced-motion behavior and current CI/test expectations.

## Non-Goals

- Do not implement a draggable or horizontal timeline in this version.
- Do not introduce new JavaScript dependencies, third-party embeds or animation libraries.
- Do not redesign the whole brand identity, typography stack, color palette or header architecture.
- Do not move structural homepage copy into Sveltia CMS in this version.
- Do not remove the existing archive pages, content collections, i18n routes, contact privacy behavior or accessibility remediation work.
- Do not create a downloadable freebie, newsletter funnel or commercial “free consultation” offer as the easter egg.

## Decisions

### D-001-01: Use “technical glue” as the organizing narrative

The homepage will position Luca as the technical glue between strategy, sales, delivery, content and developer communities. The existing claim “I design technical programs people trust” remains, but the supporting copy becomes more concrete and less pitch-like.

**Rationale**: Tester feedback praised the trust-focused claim but called “making ambitious promises deliverable” vague and AI-like. “Technical glue” better matches Luca’s cross-functional value while leaving room for the geek/editorial tone he wants.

### D-001-02: Treat the v1 as a controlled redesign, not a full visual reset

The work will refine layout, hierarchy, copy, microinteractions and section rhythm while keeping the current visual identity, component model, Astro structure and accessibility baseline.

**Rationale**: The feedback identifies real UX confusion, but a full reset would risk churn across dark mode, i18n, tests, content collections and accessibility. A controlled redesign can deliver clarity while preserving the site’s hard-won foundations.

### D-001-03: Group metrics into three narrative blocks

The six current metrics will be reorganized into three impact groups rather than displayed as six equal table-like cells.

**Rationale**: Equal metric cells make unrelated signals compete visually. Grouping them lets visitors understand how Luca’s software background, program design work and community/stage work fit together.

### D-001-04: Make Lately an accessible vertical editorial timeline

Lately will become a vertical timeline with date/nodes, clear entry hierarchy and subtle hover/focus enlargement or accent movement. It will remain fully readable without JavaScript and respect reduced-motion preferences.

**Rationale**: Testers asked for a more temporal, dynamic treatment. A vertical timeline provides the “series over time” affordance without the accessibility, mobile and overflow risks of a draggable carousel.

### D-001-05: Convert Media & writing into a five-card homepage deck

The homepage will show a compact deck of at most five media/article cards with clear type badges, title affordance and brief metadata, followed by a link to the archive.

**Rationale**: The current list risks becoming a link cemetery. Five cards keep the homepage short, make the section more visual and push long-tail exploration to the existing archive.

### D-001-06: Keep section naming clear in navigation and editorial inside the page

The navigation remains functional — Work, Lately, Talks, Media, Contact — while section headings can keep editorial rhythm and numbering where useful.

**Rationale**: Users need clear wayfinding, while the page still benefits from a distinctive editorial voice. Splitting navigation clarity from section personality resolves that tension.

### D-001-07: Add a small geek-useful footer surprise, not a marketing offer

The final easter egg will be a lightweight invitation around unusual or complex briefs, written as a human/geek note rather than a free-call CTA.

**Rationale**: A surprise can reward deep scrolling, but a free-call or giveaway would undermine the professional/community tone and make the page feel like a lead funnel.

## Risks

- The “technical glue” phrase risks sounding too colloquial in Italian: mitigate with natural localized copy that uses “collante tecnico” only where it sounds credible, otherwise translate the concept rather than the literal phrase.
- Timeline microinteractions risk becoming distracting or inaccessible: mitigate by keeping motion decorative, preserving static readability and disabling transitions under reduced-motion preferences.
- Media cards without thumbnails risk looking weaker than podcast/video cards: mitigate with a deliberate typographic card treatment for article-only entries.
- Reducing Media to five homepage cards risks hiding useful content: mitigate with a prominent archive link and preserved archive filters.
- Copy rewrites risk drifting into job-search or agency-marketing language: mitigate by keeping statements grounded in concrete examples, numbers and existing work.
- Dark mode risks remaining visually flatter than light mode: mitigate by reviewing badge contrast, card separation and hover/focus states in both themes.

## References

- doc: Tester feedback provided in conversation on 2026-07-02
- doc: src/data/site.ts
- doc: src/i18n/index.ts
- doc: src/pages/index.astro
- doc: src/components/AppearanceEntry.astro
- doc: src/components/Media.astro

## Open Questions

- None for v1. Further timeline experiments, freebie/editorial assets and stronger magazine layouts remain future design explorations.
