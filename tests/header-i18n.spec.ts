import { expect, test, type Locator } from '@playwright/test';

const locales = [
  {
    path: '/',
    lang: 'en',
    languageLabel: 'Language selection',
    currentLanguage: 'EN',
    alternateLanguage: 'IT',
    alternatePath: '/it/',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    firstSection: 'Work',
  },
  {
    path: '/it/',
    lang: 'it',
    languageLabel: 'Selezione lingua',
    currentLanguage: 'IT',
    alternateLanguage: 'EN',
    alternatePath: '/',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    firstSection: 'Lavoro',
  },
] as const;

async function expectMinimumTargetSize(locator: Locator, minimum = 44) {
  const box = await locator.boundingBox();
  expect(box, 'interactive target should have a rendered box').not.toBeNull();
  expect(box!.width, 'interactive target width').toBeGreaterThanOrEqual(minimum);
  expect(box!.height, 'interactive target height').toBeGreaterThanOrEqual(minimum);
}

test.describe('locale metadata and switching', () => {
  for (const locale of locales) {
    test(`${locale.path} declares canonical and language alternatives`, async ({ page }) => {
      await page.goto(locale.path);

      await expect(page.locator('html')).toHaveAttribute('lang', locale.lang);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(new URL(canonical!).pathname).toBe(locale.path);

      const alternates = page.locator('link[rel="alternate"][hreflang]');
      await expect(alternates).toHaveCount(3);
      for (const [hreflang, pathname] of [
        ['en', '/'],
        ['it', '/it/'],
        ['x-default', '/'],
      ] as const) {
        const href = await page
          .locator(`link[rel="alternate"][hreflang="${hreflang}"]`)
          .getAttribute('href');
        expect(new URL(href!).pathname).toBe(pathname);
      }
    });

    test(`${locale.path} language switcher identifies the current locale and navigates`, async ({ page }) => {
      await page.goto(locale.path);
      const switcher = page.getByRole('navigation', { name: locale.languageLabel });
      await expect(switcher).toBeVisible();
      await expect(switcher.getByRole('link', { name: locale.currentLanguage, exact: true })).toHaveAttribute(
        'aria-current',
        'page'
      );

      await switcher.getByRole('link', { name: locale.alternateLanguage, exact: true }).click();
      await expect.poll(() => new URL(page.url()).pathname).toBe(locale.alternatePath);
      await expect(page.locator('html')).toHaveAttribute('lang', locale.lang === 'en' ? 'it' : 'en');
    });
  }
});

test.describe('responsive site header', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const locale of locales) {
    test(`${locale.path} mobile menu exposes state and closes with Escape`, async ({ page }) => {
      await page.goto(locale.path);
      const toggle = page.getByRole('button', { name: locale.openMenu });
      await expect(toggle).toHaveAttribute('aria-controls', 'mobile-navigation');
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#mobile-navigation')).toBeHidden();

      await toggle.click();
      const closeToggle = page.getByRole('button', { name: locale.closeMenu });
      await expect(closeToggle).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#mobile-navigation')).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(page.locator('#mobile-navigation')).toBeHidden();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(toggle).toBeFocused();
    });

    test(`${locale.path} mobile menu closes after an in-page navigation choice`, async ({ page }) => {
      await page.goto(locale.path);
      await page.getByRole('button', { name: locale.openMenu }).click();
      const panel = page.locator('#mobile-navigation');
      await panel.getByRole('link', { name: locale.firstSection, exact: true }).click();

      await expect(panel).toBeHidden();
      await expect(page.getByRole('button', { name: locale.openMenu })).toHaveAttribute('aria-expanded', 'false');
      await expect(page).toHaveURL(/#work$/);
    });

    test(`${locale.path} visible header controls meet the 44px touch-target minimum`, async ({ page }) => {
      await page.goto(locale.path);
      await page.getByRole('button', { name: locale.openMenu }).click();

      const controls = page.locator('header a:visible, header button:visible, #mobile-navigation a:visible');
      expect(await controls.count()).toBeGreaterThan(0);
      for (let index = 0; index < await controls.count(); index += 1) {
        await expectMinimumTargetSize(controls.nth(index));
      }
    });
  }

  test('header hides while scrolling down and returns while scrolling up', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header[aria-label]');
    await expect(header).toHaveAttribute('data-hidden', 'false');
    await expect(header).toHaveAttribute('data-compact', 'false');

    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(header).toHaveAttribute('data-hidden', 'true');
    await expect(header).toHaveAttribute('data-compact', 'true');

    await page.evaluate(() => window.scrollBy(0, -300));
    await expect(header).toHaveAttribute('data-hidden', 'false');

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveAttribute('data-compact', 'false');
  });
});
