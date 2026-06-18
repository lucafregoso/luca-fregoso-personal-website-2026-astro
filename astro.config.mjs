import { defineConfig } from 'astro/config';

// ─────────────────────────────────────────────────────────────
// DEPLOY CONFIG — read this before publishing.
//
// You have THREE scenarios. Pick the matching block.
//
//  A) TESTING on GitHub Pages from a normal repo
//     (served at https://USERNAME.github.io/REPO/)
//     → set `site` to your Pages URL and `base` to "/REPO".
//     This is the ACTIVE config below. Replace USERNAME and REPO.
//
//  B) Repo named USERNAME.github.io  (served at the root)
//     → set `site: 'https://USERNAME.github.io'` and DELETE the `base` line.
//
//  C) Custom domain (luca-fregoso.com) — your eventual home
//     → set `site: 'https://www.luca-fregoso.com'` and DELETE the `base` line.
//     (Also add a CNAME file — see README.)
// ─────────────────────────────────────────────────────────────

export default defineConfig({
  site: 'https://USERNAME.github.io',
  base: '/REPO',
});
