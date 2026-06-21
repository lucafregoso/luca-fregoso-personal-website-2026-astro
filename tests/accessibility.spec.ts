import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { createRequire } from 'node:module';

// ─────────────────────────────────────────────────────────────
// ACCESSIBILITY TESTS (axe-core, WCAG 2.1 AA)
// Runs the same engine used in the audit, in both light and dark
// themes. Catches contrast, ARIA, structure and labelling issues.
//
// Note: automated tools catch ~30–50% of a11y issues — a clean run
// is a strong baseline, not a guarantee. A manual screen-reader pass
// is the next level.
// ─────────────────────────────────────────────────────────────

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const axeSource = fs.readFileSync(axePath, 'utf-8');

async function runAxe(page: any) {
  await page.evaluate(axeSource);
  return page.evaluate(async () => {
    // @ts-ignore — axe is injected at runtime
    return await axe.run({ runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] });
  });
}

async function settlePage(page: any, path: string, theme: 'light' | 'dark') {
  await page.goto(path);
  await page.evaluate((t: string) => document.documentElement.setAttribute('data-theme', t), theme);
  await page.evaluate(() => {
    document.documentElement.classList.remove('js-reveal');
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  });
  await page.waitForTimeout(200);
}

for (const locale of [{ path: '/', name: 'English' }, { path: '/it/', name: 'Italian' }] as const) {
  for (const theme of ['light', 'dark'] as const) {
    test(`no WCAG 2.2 AA violations — ${locale.name}, ${theme} theme`, async ({ page }) => {
      await settlePage(page, locale.path, theme);

      const results = await runAxe(page);

      // Helpful output when something fails
      if (results.violations.length) {
        console.log(`\n${locale.name}, ${theme} theme violations:`);
        for (const v of results.violations) {
          console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
          for (const node of v.nodes) console.log(`     → ${node.target}`);
        }
      }

      expect(results.violations).toEqual([]);
    });

    test(`image dialog has no WCAG 2.2 AA violations — ${locale.name}, ${theme} theme`, async ({ page }) => {
      await settlePage(page, locale.path, theme);
      await page.locator('[data-lightbox]').first().click();
      await expect(page.locator('#lightbox')).toBeVisible();
      const results = await runAxe(page);
      expect(results.violations).toEqual([]);
    });
  }
}
