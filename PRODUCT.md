# Product

## Register

brand

## Users

The primary audience, in priority order:

- **Talent leads and hiring managers filling DevRel, technical presales and specialist roles** — international companies, full-remote friendly — skimming for 30 seconds to decide whether to start a conversation.
- **Conference and community organizers** vetting him as a program designer, committee lead, MC or speaker.
- **Enterprise clients and sales leaders** deciding whether to bring him into a presales conversation or a complex technical brief.
- **Developers and community peers** who saw a talk or a post and want to know who he is and what he's shipped.

All arrive skeptical of self-promotion and allergic to AI-generated portfolio sludge. The job to be done: within one scroll, know whose site this is, what he actually does, and see proof.

## Product Purpose

Online visibility, and being attractive to companies hiring for DevRel, technical presales and specialist roles. Luca's deep technical background is the differentiator — he is an engineer who learned stages, sales rooms and classrooms, not a marketer who learned tech. The site converts a multi-role career (developer → agency owner → academy founder → conference program lead → presales) into one narrative: *the glue between tech, business and community*. Success = a hiring manager or client emails or connects on LinkedIn.

The acceptance test for every copy or design change: *does this make a DevRel/presales/specialist hiring manager, skimming for 30 seconds, want to start a conversation?*

## Copy rules

- Luca writes his own copy in both languages; anything drafted for him must match his voice (derive it from the Lately blurbs, talk abstracts and writing summaries: verb-first actions, one em-dash pivot + short kicker, numbers attached to objects; never gerund triplets, identity claims, or "passionate/leverage/proven"). EN and IT are native siblings, not translations.
- Role vocabulary (DevRel, presales, training, program management) appears as *domains he works in*, never as claimed titles — the real tagline is "Developer Programs & Content Lead".
- Verified facts only: 20+ years in tech · 15 building software · web agencies then his own · 5,000+ proposals evaluated · 7 Codemotion editions (Milan/Madrid/Rome) · ~600 submissions per edition · 2,000–3,000 devs per event · 20+ learning paths · academy built 0→1. Anything else: ask Luca.

## Brand Personality

**Precise · bilingual (boardroom ↔ terminal) · quick-witted.**

A nerd who is hyper-professional: fluent with C-levels and with developer communities, learns fast, and whose many roles are joined by the same skill — turning ambiguity into programs people trust. The site is "updated by hand, on purpose": crafted, personal, never templated. Wit lives in the margins (devtools message, terminal eggs), never in the way of the content.

The two-voice grammar carries this: Schibsted Grotesk (sans) is the boardroom voice for prose and display; Fragment Mono is the terminal voice for metadata, badges and eggs.

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
