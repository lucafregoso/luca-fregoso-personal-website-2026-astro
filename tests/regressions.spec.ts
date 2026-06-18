import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────
// REGRESSION TESTS
// Each test here guards a bug that actually happened. If one fails,
// a real defect has come back. Don't delete these.
// ─────────────────────────────────────────────────────────────

test.describe('regressions', () => {
  test('the page title never contains "undefined"', async ({ page }) => {
    // Bug history: a removed `site.role` field left the title as
    // "Luca Fregoso — undefined".
    await page.goto('/');
    const title = await page.title();
    expect(title).not.toContain('undefined');
    expect(title).toMatch(/Luca Fregoso/);
  });

  test('no meta tag or JSON-LD contains "undefined"', async ({ page }) => {
    await page.goto('/');
    const head = await page.locator('head').innerHTML();
    expect(head).not.toContain('undefined');
  });

  test('talks and writing content is visible WITHOUT JavaScript', async ({ browser }) => {
    // Bug history: reveal-on-scroll hid content with opacity:0 and only
    // showed it via JS. When the observer misfired, sections were empty.
    // Content must never depend on JS to be visible.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    const talks = page.locator('#talks .arch-item').first();
    await expect(talks).toBeVisible();
    expect(await talks.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');

    const writing = page.locator('#writing .arch-item').first();
    await expect(writing).toBeVisible();
    expect(await writing.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');

    await context.close();
  });

  test('email address is not present as plain text in the HTML source', async ({ page }) => {
    // Bug history: the email leaked in the footer, JSON-LD, and a console
    // easter egg. It must only exist split across data-attributes.
    await page.goto('/');
    const html = await page.content();
    expect(html).not.toContain('luca.fregoso@gmail.com');
  });

  test('section dividers are not stray short lines (no border-top on tinted sections)', async ({ page }) => {
    // Bug history: a 760px-wide rule floated inside a full-width tinted band.
    await page.goto('/');
    const streamBorder = await page
      .locator('.stream')
      .evaluate((el) => getComputedStyle(el).borderTopWidth);
    expect(streamBorder).toBe('0px');
  });

  test('tinted sections render a visible full-width background band', async ({ page }) => {
    // Bug history: z-index:-1 pushed the band behind the body, hiding it.
    await page.goto('/');
    const band = await page.locator('.stream.tinted').evaluate((el) => {
      const b = getComputedStyle(el, '::before');
      return { z: b.zIndex, bg: b.backgroundColor };
    });
    expect(Number(band.z)).toBeGreaterThanOrEqual(0);
    expect(band.bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('all social icons render at the same size', async ({ page }) => {
    // Bug history: the LinkedIn glyph was smaller than the others.
    await page.goto('/');
    const sizes = await page.locator('.social .social-ico').evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return `${Math.round(r.width)}x${Math.round(r.height)}`;
      })
    );
    expect(sizes.length).toBeGreaterThan(1);
    expect(new Set(sizes).size).toBe(1);
  });

  test('featured items use the lime left bar, not a background tint', async ({ page }) => {
    // Bug history: featured entries kept getting a grey/lime background box
    // that clashed with the tinted section bands. The signature is the left
    // bar (a ::after pseudo-element), and the item background must stay
    // transparent / match the section — never a tinted card.
    await page.goto('/');
    const item = page.locator('.feed-item.is-feat').first();
    await expect(item).toBeVisible();

    // the item itself has no opaque background fill
    const bg = await item.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(['rgba(0, 0, 0, 0)', 'transparent']).toContain(bg);

    // the lime bar exists as a ::after pseudo-element with a visible width
    const barWidth = await item.evaluate(
      (el) => getComputedStyle(el, '::after').width
    );
    expect(barWidth).not.toBe('auto');
    expect(barWidth).not.toBe('0px');
  });
});
