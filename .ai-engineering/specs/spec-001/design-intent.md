## Design

design-routing: routed (matched keywords: page, layout, typography, accessibility)

### Conceptual direction

Editorial technical glue: the homepage should feel like a field notebook written by someone who can walk from code to sales rooms to conference stages without changing language. It must be professional, community-oriented and distinctive, not a generic portfolio or SaaS landing page.

### Purpose

Help visitors understand, within the first screen, whose site this is and why Luca is valuable: he connects business intent, technical credibility, delivery reality, content strategy and developer communities.

### Tone

Refined editorial with a quiet geek signal. Keep the existing lime/mono identity, but use it as annotation and connective tissue rather than filling every surface. The memorable line is “technical glue”; the memorable visual behavior is a page that feels like an ordered signal trace, not a pile of cards.

### Constraints

- Astro static site with EN/IT routes.
- No new frontend dependencies for this version.
- Keep crawlable HTML, external-link security, archive URLs and JSON-LD.
- Maintain keyboard access, visible focus, 44px controls, reduced-motion support and no mobile horizontal overflow.
- Design light and dark mode together; dark mode cannot be a flatter afterthought.

### Layout direction

- Hero: use “Luca Fregoso” as a large signature above the existing h1 claim. Keep one clear claim and a shorter proof stack; reduce the eyebrow’s density.
- Impact: replace the six-cell metric table with three grouped impact blocks: technical foundation, program design and community rooms. Each group pairs numbers with a sentence of meaning.
- Work proof: visually separate capability groups from case/proof cards. Case cards should read as evidence, not as another metric table.
- Lately: convert to a vertical editorial timeline with a left rail, dated nodes and entries that gain subtle depth/accent on hover/focus. The timeline remains static HTML and readable without JS.
- Media: convert the archive-like list into a compact homepage deck capped at five cards. Appearance cards use thumbnails; article cards use typographic poster/fallback treatment.
- Footer: add a small “weird brief” / complex-brief easter egg that feels human, not promotional.

### Typography and rhythm

- Keep the current font stack unless implementation discovers a project-approved display/body pairing already installed. This spec is not a font migration.
- Reduce perceived chaos by using fewer sizes in repeated content: large signature, claim, section h2, card h3, body, mono annotation/badge.
- Mono text is metadata/annotation, not paragraph copy.
- Body lines should remain under roughly 75 characters.

### Interaction direction

- Use transform/opacity/border/background microinteractions only.
- Hover/focus on timeline entries: subtle translate or scale, lime rail/node emphasis, title clarity.
- Media cards: titles and cards must feel clickable while preserving explicit secure external links.
- All hover-only affordances need equivalent focus states.
- Under reduced motion, interaction state remains visible without movement.

### Theme direction

- Light mode can stay airy and editorial.
- Dark mode needs stronger separation between surfaces, rails, cards and badges.
- The lime accent should highlight relationships and state, not become a border on every object.

### Design checklist status

- No emoji icons: pass target.
- SVG/mono glyph system retained: pass target.
- 44px interactive controls retained: pass target.
- Contrast and axe WCAG 2.2 AA must be re-run: pending implementation.
- No horizontal scroll at 320px, 390px, 768px and 1024px: pending implementation.
- Reduced-motion behavior preserved: pending implementation.
