import { expect, test } from '@playwright/test';

test.describe('homepage content contract', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('communicates identity, positioning, and proof in page order', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Luca Fregoso, home/i })).toHaveAttribute('href', /\/$/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'I design technical programs people trust.' })
    ).toBeVisible();
    await expect(page.locator('.hero-intro')).toContainText(/clear programs.*actually ship/i);
    await expect(page.locator('.hero-proof')).toContainText(/fifteen years.*building software/i);

    const sectionHeadings = await page.locator('h2').allTextContents();
    expect(sectionHeadings.map((heading) => heading.trim())).toEqual([
      'Where strategy meets delivery.',
      'Lately',
      'Talks for people navigating change.',
      'Media & writing.',
      'Bring me the complicated brief.',
    ]);

    await expect(page.locator('#work .case-card').first()).toBeVisible();
    await expect(page.locator('#lately article').first()).toBeVisible();
    await expect(page.locator('#talks .talk-card').first()).toBeVisible();
    await expect(page.locator('#media .writing-item').first()).toBeVisible();
  });

  test('uses stronger career-wide proof and semantic section glyphs', async ({ page }) => {
    await expect(page.locator('.metrics')).toContainText('20+ paths');
    await expect(page.locator('.metrics')).toContainText('7 editions');
    await expect(page.locator('.metrics')).toContainText('Presales');
    await expect(page.locator('.metrics')).toContainText('Mentoring');
    await expect(page.locator('.section-glyph')).toHaveCount(5);
    for (let index = 0; index < await page.locator('.section-glyph').count(); index += 1) {
      await expect(page.locator('.section-glyph').nth(index)).toHaveAttribute('aria-hidden', 'true');
    }
  });

  test('labels point to the filtered archive and upcoming remains prominent', async ({ page }) => {
    const upcoming = page.locator('.upcoming li');
    const upcomingCount = await upcoming.count();
    expect(upcomingCount).toBeLessThanOrEqual(1);
    if (upcomingCount > 0) {
      await expect(upcoming.first().locator('.meta-badge-status')).toBeVisible();
      const upcomingBackground = await upcoming.first().evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(upcomingBackground).not.toBe('rgba(0, 0, 0, 0)');
    }
    await expect(page.locator('.meta-badge').first()).toBeVisible();
    await expect(page.locator('#lately .feed-meta a[href*="/archive/"][href*="type="]').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'View all field notes' })).toHaveAttribute('href', /\/archive\/$/);
  });

  test('linked badges recover a full lime hover treatment in dark mode', async ({ page }) => {
    await page.locator('html').evaluate((element) => element.setAttribute('data-theme', 'dark'));
    const badge = page.locator('#lately .feed-meta a.meta-badge').first();
    await expect(badge).toBeVisible();
    const initial = await badge.evaluate((element) => getComputedStyle(element).backgroundColor);
    await badge.hover();
    const hovered = await badge.evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(initial).not.toBe('rgba(0, 0, 0, 0)');
    expect(hovered).not.toBe(initial);
    expect(hovered).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('linked media badges render as pills, not underlined links', async ({ page }) => {
    await page.locator('html').evaluate((element) => element.setAttribute('data-theme', 'dark'));
    const linked = page.locator('#media a.meta-badge').first();
    await expect(linked).toBeVisible();
    const border = await linked.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        topColor: computed.borderTopColor,
        bottomColor: computed.borderBottomColor,
        topWidth: computed.borderTopWidth,
        bottomWidth: computed.borderBottomWidth,
        bottomStyle: computed.borderBottomStyle,
      };
    });
    expect(border.topColor).toBe(border.bottomColor);
    expect(border.topWidth).toBe(border.bottomWidth);
    expect(border.bottomStyle).toBe('solid');
  });

  test('offers clear primary profile and conversion paths', async ({ page }) => {
    const introNav = page.locator('.utility-links');
    await expect(introNav.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/lucafregoso'
    );
    await expect(introNav.getByRole('link', { name: 'Sessionize' })).toHaveAttribute(
      'href',
      'https://sessionize.com/luca-fregoso/'
    );
    await expect(introNav.getByRole('link', { name: 'CV (PDF)' })).toHaveAttribute('href', /\/cv\.pdf$/);
    await expect(page.locator('.hero-actions').getByRole('link', { name: 'Discuss a complex brief' })).toHaveAttribute(
      'href',
      '#contact'
    );
    await expect(page.getByRole('link', { name: 'See selected work' })).toHaveAttribute('href', '#work');

    const contact = page.locator('#contact');
    await expect(contact).toContainText(/developer program.*technical proposal.*event.*learning path/i);
    await expect(contact.getByRole('button', { name: /email/i })).toBeVisible();
    await expect(contact.getByRole('link', { name: 'View CV (PDF)' })).toHaveAttribute('href', /\/cv\.pdf$/);
  });

  test('has one main landmark and a navigable heading structure', async ({ page }) => {
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    expect(await page.getByRole('heading', { level: 2 }).count()).toBeGreaterThanOrEqual(4);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('homepage responsive contract', () => {
  for (const viewport of [
    { name: 'small phone', width: 320, height: 700 },
    { name: '200% zoom equivalent', width: 640, height: 800 },
    { name: 'tablet', width: 768, height: 900 },
  ]) {
    test(`has no horizontal page overflow on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.addStyleTag({ content: 'html { scrollbar-gutter: stable; }' });

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
      await expect(page.locator('html')).toHaveCSS('overflow-x', 'clip');
      const horizontalPosition = await page.evaluate(() => {
        document.documentElement.scrollLeft = 100;
        return document.documentElement.scrollLeft;
      });
      expect(horizontalPosition).toBe(0);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('.hero-actions')).toBeVisible();
    });
  }

  test('primary compact controls meet the 44px target size', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const selectors = ['#theme-toggle', '.menu-toggle', '[data-language-switcher] button', '.hero-actions a', '.social-links a'];
    for (const selector of selectors) {
      const boxes = await page.locator(selector).evaluateAll((elements) =>
        elements.map((element) => {
          const box = element.getBoundingClientRect();
          return { width: box.width, height: box.height };
        })
      );
      expect(boxes.length).toBeGreaterThan(0);
      for (const box of boxes) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
