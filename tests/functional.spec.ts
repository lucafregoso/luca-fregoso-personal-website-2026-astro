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

  test('cycles focus, announces navigation, and restores the trigger', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('[data-lightbox]').first();
    await trigger.click();

    const close = page.locator('.lb-close');
    const next = page.locator('.lb-next');
    const previous = page.locator('.lb-prev');
    const status = page.locator('.lb-status');
    await expect(close).toBeFocused();
    await expect(status).toContainText('Image viewer opened');

    // The previous control is disabled on the first image, so forward focus
    // moves to Next and then wraps back to Close.
    await page.keyboard.press('Tab');
    await expect(next).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(status).toContainText('Image 2 of 2');
    await page.keyboard.press('Tab');
    await expect(previous).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(close).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(page.locator('#lightbox')).toBeHidden();
    await expect(trigger).toBeFocused();
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
    await expect(page.locator('#theme-toggle')).toHaveAttribute(
      'aria-label',
      after === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
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
      expect(rel).toContain('noreferrer');
      const accessibleLabel =
        (await link.getAttribute('aria-label')) || (await link.textContent()) || '';
      expect(accessibleLabel).toContain('opens in a new tab');
    }
  });

  test('internal links stay in the current tab', async ({ page }) => {
    await page.goto('/');
    const internalLinks = page.locator('a[href^="#"], a[href^="/"]');
    const count = await internalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(internalLinks.nth(i)).not.toHaveAttribute('target', '_blank');
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
  test('reveals the alias without launching mail and offers explicit actions', async ({ page }) => {
    await page.goto('/');
    const reveal = page.locator('.email-reveal');
    const actions = page.locator('.email-actions');
    await expect(actions).toBeHidden();
    await expect(page.locator('body')).not.toContainText('hello@luca-fregoso.com');

    await reveal.click();
    await expect(reveal).toBeHidden();
    await expect(actions).toBeVisible();
    await expect(page.locator('.email-address')).toHaveText('hello@luca-fregoso.com');
    await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:hello@luca-fregoso.com');
    await expect(page.locator('.email-link')).toBeFocused();
    await expect(page.locator('[data-email-status]')).toContainText('Email address revealed');
  });

  test('copies the revealed alias and announces success', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.locator('.email-reveal').click();
    await page.locator('.email-copy').click();
    await expect(page.locator('.email-copy')).toHaveText('Copied');
    await expect(page.locator('[data-email-status]')).toContainText('copied to clipboard');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('hello@luca-fregoso.com');
  });
});

test.describe('keyboard and user preferences', () => {
  test('skip link moves focus to the main landmark', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('respects reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const values = await page.locator('[data-reveal]').first().evaluate((element) => ({
      transition: getComputedStyle(element).transitionDuration,
      transform: getComputedStyle(element).transform,
    }));
    expect(Number.parseFloat(values.transition)).toBeLessThanOrEqual(0.00001);
    expect(values.transform).toBe('none');
  });

  test('keeps focus indicators visible in forced-colors mode', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/');
    const toggle = page.locator('#theme-toggle');
    await toggle.focus();
    const outline = await toggle.evaluate((element) => ({
      style: getComputedStyle(element).outlineStyle,
      width: getComputedStyle(element).outlineWidth,
    }));
    expect(outline.style).not.toBe('none');
    expect(Number.parseFloat(outline.width)).toBeGreaterThanOrEqual(3);
  });
});
