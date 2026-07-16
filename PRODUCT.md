# Product

## Register

brand

## Users

Three audiences reach this site, usually after meeting Luca elsewhere:

- **Conference and community organizers** vetting him as a program designer, committee lead, MC or speaker.
- **Enterprise clients and sales leaders** deciding whether to bring him into a presales conversation or a complex technical brief.
- **Developers and community peers** who saw a talk or a post and want to know who he is and what he's shipped.

All three arrive skeptical of self-promotion and allergic to AI-generated portfolio sludge. The job to be done: within one scroll, know whose site this is, what he actually does, and see proof.

## Product Purpose

A personal positioning site for Luca Fregoso — Developer Programs & Content Lead. It converts 15 years of multi-role career (developer → academy founder → conference program lead → presales) into a single coherent narrative: *the glue between strategy and delivery*. Success = a visitor emails or connects on LinkedIn with a complicated brief.

## Brand Personality

**Precise · bilingual (boardroom ↔ terminal) · quick-witted.**

A nerd who is hyper-professional: fluent with C-levels and with developer communities, learns fast, and whose many roles are joined by the same skill — turning ambiguity into programs people trust. The site is "updated by hand, on purpose": crafted, personal, never templated. Wit lives in the margins (devtools message, terminal eggs), never in the way of the content.

The two-voice grammar carries this: Archivo (sans) is the boardroom voice for prose and display; Martian Mono is the terminal voice for metadata, badges and eggs.

## Anti-references

- Generic AI-generated SaaS landing pages: numbered section eyebrows, identical card grids, gradient text, hero-metric templates.
- Link-graveyard portfolios: long undifferentiated lists of talks/articles nobody reads.
- Costume-mono "hacker" sites: monospace everywhere as a technical cosplay. Mono is a *voice* here, scoped to metadata and eggs.
- Font-size pyramids: 15+ ad-hoc sizes that read as over-designed AI output (real tester feedback).

## Design Principles

1. **Name first.** "Luca Fregoso" is the H1; the visitor knows whose site this is before anything else.
2. **Proof over pitch.** Every claim pairs with a concrete outcome (7 editions, 600 submissions, 20+ learning paths). No empty sales language.
3. **Two voices, one grammar.** Sans = boardroom, mono = terminal. Each has exactly one role; they never swap.
4. **One type scale.** Seven tokens (`--text-meta` through `--text-h1`) and nothing else. New sizes require deleting one.
5. **Wit in the margins.** Easter eggs reward attention (page-end `$ whoami`, brand caret, ::selection, devtools) but never interrupt reading.

## Accessibility & Inclusion

- Axe-clean via Playwright (`tests/accessibility.spec.ts`) — keep it green.
- Body and muted text meet 4.5:1 in both themes; lime `#d0db02` is structural-only, never text (readable derived greens `--accent-text-*` carry accent text).
- Every animation has a `prefers-reduced-motion` fallback; content is never gated on JS (reveal pattern only subtracts from a visible default).
- 44px minimum touch targets; keyboard focus ring on `:focus-visible`; EN/IT full parity.
