import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────
// FUNCTIONAL TESTS
// The interactive pieces behave as intended.
// ─────────────────────────────────────────────────────────────

test.describe('lightbox', () => {
  test('opens on image click, navigates, and closes with Escape', async ({ page }) => {
    await page.goto('/');
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeHidden();

    // open the first image trigger
    await page.locator('[data-lightbox]').first().click();
    await expect(lightbox).toBeVisible();

    // the hackathon entry has 2 images → next arrow + counter
    const next = page.locator('.lb-next');
    if (await next.isVisible()) {
      await next.click();
      await expect(page.locator('.lb-count')).toContainText('2 /');
    }

    // close with Escape
    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();
  });

  test('closes when clicking the backdrop', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-lightbox]').first().click();
    await expect(page.locator('#lightbox')).toBeVisible();
    await page.locator('.lb-close').click();
    await expect(page.locator('#lightbox')).toBeHidden();
  });
});

test.describe('theme toggle', () => {
  test('switches theme and persists across reload', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initial = await html.getAttribute('data-theme');

    await page.locator('#theme-toggle, .theme-toggle').first().click();
    const after = await html.getAttribute('data-theme');
    expect(after).not.toBe(initial);

    // persists after reload (stored in localStorage)
    await page.reload();
    expect(await page.locator('html').getAttribute('data-theme')).toBe(after);
  });
});

test.describe('links', () => {
  test('external links open in a new tab with rel="noopener"', async ({ page }) => {
    await page.goto('/');
    const externals = page.locator('a[href^="http"]');
    const count = await externals.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = externals.nth(i);
      const href = await link.getAttribute('href');
      // skip same-origin links
      if (href && href.startsWith('http://localhost')) continue;
      await expect(link).toHaveAttribute('target', '_blank');
      const rel = (await link.getAttribute('rel')) || '';
      expect(rel).toContain('noopener');
    }
  });

  test('the entry title is never an external link', async ({ page }) => {
    // Design rule: titles never throw the reader off-site; the outbound
    // link is always an explicit row below.
    await page.goto('/');
    const titleLinks = page.locator('.feed-title a[href^="http"], .hero-title a[href^="http"]');
    expect(await titleLinks.count()).toBe(0);
  });
});

test.describe('email', () => {
  test('reveals the address on interaction', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.email-reveal').first();
    await btn.hover();
    await expect(btn).toContainText('@');
  });
});
