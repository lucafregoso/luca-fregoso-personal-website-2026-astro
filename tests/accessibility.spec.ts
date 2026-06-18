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
    return await axe.run({ runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] });
  });
}

for (const theme of ['light', 'dark'] as const) {
  test(`no WCAG 2.1 AA violations — ${theme} theme`, async ({ page }) => {
    await page.goto('/');
    await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);

    // Settle into the final visual state: reveal-on-scroll elements start at
    // opacity:0 and would make axe measure contrast against a blended colour.
    // Force them visible and disable the reveal class so axe sees the real,
    // stable rendering.
    await page.evaluate(() => {
      document.documentElement.classList.remove('js-reveal');
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    });
    await page.waitForTimeout(200);

    const results = await runAxe(page);

    // Helpful output when something fails
    if (results.violations.length) {
      console.log(`\n${theme} theme violations:`);
      for (const v of results.violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
        for (const node of v.nodes) console.log(`     → ${node.target}`);
      }
    }

    expect(results.violations).toEqual([]);
  });
}
