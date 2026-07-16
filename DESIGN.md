# Design

Visual system of lucafregoso.com. Source of truth for tokens: [src/styles/global.css](src/styles/global.css).

## Theme

Light default + dark theme via `:root[data-theme="dark"]`, set pre-paint from `localStorage` or OS preference (inline script in `BaseLayout.astro`). Both themes share the lime accent; everything else swaps.

## Color

| Token | Light | Dark | Role |
|---|---|---|---|
| `--lime` | `#d0db02` | same | **Structural accent only** — borders, dots, rails, carets, ::selection. Never text. |
| `--lime-dim` | `#aab300` | same | Hover fill for lime surfaces |
| `--accent-text` | `#5b6300` | `#c3ce4a` | Readable accent text (links, prompts) |
| `--bg` | `#fbfbf7` | `#0d1117` | Page |
| `--surface` / `--surface-2` | `#ffffff` / `#ebebe5` | `#161b22` / `#182230` | Cards / tinted section bands (a visible step from `--bg`, not a whisper) |
| band-ink (local) | `#0b0e13` | `#161e2b` | Work section full-bleed band; light theme's one committed dark moment, rhyming with the contact panel |
| `--text` / `--text-muted` / `--text-faint` | `#1a1a1a` / `#5f5f5a` / `#6a6a63` | `#e6edf3` / `#9aa4b1` / `#8a93a0` | Ink ramp |
| `--border` / `--border-strong` | `#e3e3d8` / `#cfcfc2` | `#2a313c` / `#3a424e` | Rules |

Strategy: **restrained** — neutral surfaces, one signal color at <10%, carried by structure not area. The contact block is a fixed dark panel (`#0b0e13`) in both themes.

## Typography

Two voices, one grammar (see PRODUCT.md):

- **Sans — Schibsted Grotesk Variable** (`@fontsource-variable/schibsted-grotesk`, wght 400–900). Prose and display. Schibsted has no width axis: display presence comes from `font-weight: var(--display-weight)` (800) + tight tracking (≥ -.03em).
- **Mono — Fragment Mono** (`@fontsource/fragment-mono`, single weight 400). The `.mono` label grammar: badges, dates, nav, buttons, eggs. **Weight 400 only** (the face ships no other weights — never synthesize bold), letter-spacing 0.

Self-hosted via Fontsource; system stacks as fallbacks. No CDN requests.

### Type scale — the only sizes allowed

```
--text-meta        0.72rem                       mono labels: badges, dates, nav
--text-ui          0.85rem                       mono UI: buttons, strong links
--text-body-sm     0.92rem                       card/feed body copy
--text-body        1rem   (17px root)            default prose
--text-lead        clamp(1.15rem, 2vw, 1.35rem)  hero intro + proof
--text-sub         clamp(1.35rem, 2.6vw, 1.9rem) hero sub-headline
--text-h3          1.25rem                       every h3/h4 on the site
--text-display-sm  clamp(1.6rem, 3vw, 2.4rem)    featured-entry titles
--text-stat        clamp(1.9rem, 3.2vw, 2.6rem)  display numerals (stats, metrics)
--text-h2          clamp(2.2rem, 4vw, 3.6rem)    section headings
--text-h1          clamp(3.1rem, 6.5vw, 5.7rem)  hero name only
```

Hard rule: no new `font-size` literals in components. Adding a size means removing one.

## Layout

- Shell: `min(calc(100% - 3rem), 70rem)` centered; sections at 7rem vertical padding (5rem ≤620px).
- Full-bleed tinted bands via `.tinted::before` (100vw pseudo-element; `html { overflow-x: clip }` absorbs the gutter).
- **Page rhythm alternates**: light → ink Work band → tinted Lately → slim ink `$ whoami` interlude → light Talks → tinted Media → ink contact panel. The alternation must stay visible in both themes.
- **Work = three compact intersection cards on the ink band**: each card is axis label (`Business × Engineering`, uppercase mono) → title → one-sentence summary → lime display stat (`600 → 1` + label) → CTA. Lime 3px top rule per card (top border is fine; side stripes are banned). Deliberately terse — one sentence, one stat, no multi-paragraph case prose. Data in `site.intersections`.
- **Lately = vertical time rail**: `.timeline` with a 2px lime-tinted rail and a lime dot per entry (`::before` on `.featured-story` / `.feed-item`); featured entries get a larger dot only — no background wash, no side-stripes (both banned).
- **Media & writing = card grid**: `repeat(auto-fit, minmax(280px, 1fr))`; appearances are poster-led cards (AppearanceEntry `card` variant), articles typographic cards; whole card clickable via delegated click on the title link.

## Motion

- Ease: `--ease-out: cubic-bezier(.2,.8,.2,1)`; durations .18–.5s.
- Reveal-on-scroll only subtracts from a visible default (`.js-reveal [data-reveal]` pattern) — content never depends on JS.
- Hovers: cards lift `translateY(-3px)`, feed rows shift `translateX(6px)` + dot scale, buttons lift 2px.
- Page-end egg: `$ whoami` types on scroll-into-view (rAF-free `setTimeout` steps), output fades up, caret blinks.
- Everything has a `prefers-reduced-motion: reduce` fallback (global kill-switch + per-component overrides).

## Components

- `SiteHeader` — sticky, blur backdrop, compact on scroll, hover caret egg on the brand.
- `AppearanceEntry` — variants: `featured`, `feed`, `archive`, `card`.
- `meta-badge` (global) — pill, mono `--text-meta`, neutral/status/accent variants.
- `Media`, `Lightbox`, `ContactEmail`, `ExternalLink`, `SocialIcon`, `ThemeToggle`, `LanguageSwitcher`.

## Easter eggs (fixed budget — do not add more)

1. Devtools console message (BaseLayout).
2. Brand hover caret `▊` (SiteHeader).
3. Lime `::selection` (global.css).
4. The `$ whoami` typing reveal — promoted to its own interlude band between Lately and Talks (index.astro).
