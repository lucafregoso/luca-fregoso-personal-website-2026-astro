import { expect, test, type Locator } from '@playwright/test';

const locales = [
  {
    path: '/',
    lang: 'en',
    languageLabel: 'Language selection',
    languageTrigger: /Choose language[.,]? Current language: English/i,
    currentLanguage: 'English',
    alternateLanguage: 'Italiano',
    alternatePath: '/it/',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    firstSection: 'Work',
  },
  {
    path: '/it/',
    lang: 'it',
    languageLabel: 'Selezione lingua',
    languageTrigger: /Scegli la lingua[.,]? Lingua attuale: Italiano/i,
    currentLanguage: 'Italiano',
    alternateLanguage: 'English',
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
      const trigger = page.locator('[data-language-switcher] button');
      await expect(trigger).toHaveAccessibleName(locale.languageTrigger);
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await trigger.click();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const switcher = page.getByRole('navigation', { name: locale.languageLabel });
      await expect(switcher).toBeVisible();
      const currentLanguage = switcher.locator('a[aria-current="page"]');
      await expect(currentLanguage).toHaveCount(1);
      await expect(currentLanguage).toContainText(locale.currentLanguage);

      await switcher.getByRole('link', { name: locale.alternateLanguage, exact: true }).click();
      await expect.poll(() => new URL(page.url()).pathname).toBe(locale.alternatePath);
      await expect(page.locator('html')).toHaveAttribute('lang', locale.lang === 'en' ? 'it' : 'en');
    });
  }
});

test.describe('responsive site header', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const locale of locales) {
    test(`${locale.path} language disclosure supports keyboard and outside-click closing`, async ({ page }) => {
      await page.goto(locale.path);
      const trigger = page.locator('[data-language-switcher] button');
      await expect(trigger).toHaveAccessibleName(locale.languageTrigger);
      const controlledId = await trigger.getAttribute('aria-controls');
      expect(controlledId).toBeTruthy();
      const panel = page.locator(`#${controlledId}`);

      await trigger.focus();
      await page.keyboard.press('Enter');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(panel).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(panel.locator('a:focus')).toHaveCount(1);

      await page.keyboard.press('Escape');
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();

      await trigger.click();
      await page.locator('main').click({ position: { x: 1, y: 1 } });
      await expect(panel).toBeHidden();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test(`${locale.path} language disclosure and mobile navigation close each other`, async ({ page }) => {
      await page.goto(locale.path);
      const language = page.locator('[data-language-switcher] button');
      const menu = page.locator('.menu-toggle');
      await expect(language).toHaveAccessibleName(locale.languageTrigger);
      await expect(menu).toHaveAccessibleName(locale.openMenu);

      await language.click();
      await menu.click();
      await expect(language).toHaveAttribute('aria-expanded', 'false');
      await expect(menu).toHaveAttribute('aria-expanded', 'true');

      await language.click();
      await expect(language).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('button', { name: locale.openMenu })).toHaveAttribute('aria-expanded', 'false');
    });

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
