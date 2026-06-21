import { expect, test } from '@playwright/test';

test.describe('homepage content contract', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('communicates identity, positioning, and proof in page order', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Luca Fregoso, back to top/i })).toBeVisible();
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
      'Notes from the work.',
      'Bring me the complicated brief.',
    ]);

    await expect(page.locator('#work .case-card').first()).toBeVisible();
    await expect(page.locator('#lately article').first()).toBeVisible();
    await expect(page.locator('#talks .talk-card').first()).toBeVisible();
    await expect(page.locator('#writing .writing-item').first()).toBeVisible();
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
    await expect(page.locator('.hero-actions').getByRole('link', { name: 'Discuss a leadership role' })).toHaveAttribute(
      'href',
      '#contact'
    );
    await expect(page.getByRole('link', { name: 'See selected work' })).toHaveAttribute('href', '#work');

    const contact = page.locator('#contact');
    await expect(contact).toContainText(/senior.*roles.*technical content.*presales/i);
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
    { name: 'tablet', width: 768, height: 900 },
  ]) {
    test(`has no horizontal page overflow on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('.hero-actions')).toBeVisible();
    });
  }
});
