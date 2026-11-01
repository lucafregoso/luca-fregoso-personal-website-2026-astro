import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { readdirSync, readFileSync } from 'node:fs';

// Sitemap lastmod must be a real content date: a build date that changes on
// every deploy is a signal crawlers learn to ignore. The homepage and the
// archive change when dated content is published, so their lastmod is the
// newest past-dated entry; the CV page carries none rather than a fake one.
function newestContentDate() {
  const now = Date.now();
  let newest = 0;
  for (const dir of ['now', 'appearances', 'writing']) {
    const folder = new URL(`./src/content/${dir}/`, import.meta.url);
    for (const file of readdirSync(folder).filter((name) => name.endsWith('.md'))) {
      const match = readFileSync(new URL(file, folder), 'utf8').match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m);
      const time = match ? Date.parse(match[1]) : NaN;
      if (time <= now && time > newest) newest = time;
    }
  }
  return newest ? new Date(newest).toISOString() : undefined;
}
const contentLastmod = newestContentDate();

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
    serialize(item) {
      if (!item.url.includes('/cv/') && contentLastmod) item.lastmod = contentLastmod;
      return item;
    },
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en-US', it: 'it-IT' },
    },
  })],
});
