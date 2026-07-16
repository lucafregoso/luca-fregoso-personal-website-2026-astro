import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

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

// Public deployment configuration can come from an untracked local .env
// file or GitHub Actions repository variables. Public identity and content
// stay in the typed, reviewable src/data/site.ts file.
const env = { ...loadEnv(process.env.NODE_ENV || 'production', process.cwd(), ''), ...process.env };
const isPlaywright = env.PLAYWRIGHT_TEST === '1';

export default defineConfig({
  site: isPlaywright
    ? 'http://127.0.0.1:4399'
    : env.SITE_URL || 'https://luca-fregoso.me',
  // Keep base directory-like to avoid slash/no-slash sitemap duplicates.
  base: isPlaywright
    ? '/'
    : env.BASE_PATH || '/',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en-US', it: 'it-IT' },
    },
  })],
});
