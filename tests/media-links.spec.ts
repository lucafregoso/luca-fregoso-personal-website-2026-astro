import { expect, test, type Locator } from '@playwright/test';
import fs from 'node:fs';

const providerRequest = /(?:youtube(?:-nocookie)?\.com|ytimg\.com|googlevideo\.com|spotify\.com|scdn\.co)/i;
const examples = [
  { title: 'Tech Chat – AI & Open Source', publisher: 'Codemotion', duration: '1:03:23', hrefPart: 'youtube.com/watch', mobilePresentation: 'poster', action: { en: 'Watch on YouTube', it: 'Guarda su YouTube' } },
  { title: 'Spotlight #11 – Luca Fregoso (Codemotion)', publisher: 'Il Podcast Open Source', duration: '44:01', hrefPart: 'open.spotify.com/episode', mobilePresentation: 'stamp', action: { en: 'Listen on Spotify', it: 'Ascolta su Spotify' } },
] as const;
const locales = [{ path: '/', lang: 'en' }, { path: '/it/', lang: 'it' }] as const;

function appearanceFor(section: Locator, title: string) {
  return section.locator('[data-appearance-entry]').filter({ hasText: title });
}

test.describe('compact media appearances', () => {
  for (const locale of locales) {
    test(`${locale.path} renders compact appearances in the editorial archive`, async ({ page }) => {
      await page.goto(locale.path);
      for (const example of examples) {
        const entry = appearanceFor(page.locator('#media'), example.title);
        await expect(entry).toHaveCount(1);
        await expect(entry).toHaveAttribute('data-mobile-presentation', example.mobilePresentation);
        await expect(entry).toContainText(example.publisher);
        await expect(entry).not.toContainText(example.duration);
        const thumbnail = entry.locator('.appearance-thumbnail');
        const title = entry.locator('a.appearance-title-link');
        const action = entry.locator('a.appearance-action');
        await expect(action).toContainText(example.action[locale.lang]);
        await expect(thumbnail.locator('img')).toHaveAttribute('src', /\/media\/.+\.png$/);
        await expect(thumbnail).not.toHaveAttribute('href', /.*/);
        for (const link of [title, action]) {
          await expect(link).toHaveAttribute('target', '_blank');
          await expect(link).toHaveAttribute('rel', /noopener/);
          await expect(link).toHaveAttribute('rel', /noreferrer/);
          await expect(link).toHaveAttribute('href', new RegExp(example.hrefPart));
        }
      }
      await expect(page.getByRole('link', { name: locale.lang === 'it' ? 'Vedi tutto l’archivio' : 'View all field notes' })).toBeVisible();
    });

    test(`${locale.path} contains no embeds or provider requests`, async ({ page }) => {
      const requests: string[] = [];
      page.on('request', (request) => { if (providerRequest.test(request.url())) requests.push(request.url()); });
      await page.goto(locale.path);
      await page.waitForTimeout(300);
      await expect(page.locator('iframe')).toHaveCount(0);
      await expect(page.locator('[data-embed-src]')).toHaveCount(0);
      expect(requests).toEqual([]);
    });
  }

  for (const viewport of [
    { name: 'desktop', width: 1200, maximum: .26 },
    { name: 'tablet', width: 800, maximum: .31 },
  ]) {
    test(`appearance thumbnails respect the ${viewport.name} width ratio`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: 900 });
      await page.goto('/');
      const entry = appearanceFor(page.locator('#media'), examples[0].title);
      const copyBox = await entry.locator('.appearance-copy').boundingBox();
      const thumbBox = await entry.locator('.appearance-thumbnail').boundingBox();
      expect(copyBox).not.toBeNull();
      expect(thumbBox).not.toBeNull();
      expect(thumbBox!.width / copyBox!.width).toBeLessThanOrEqual(viewport.maximum);
    });
  }

  test('YouTube keeps the requested start time in its external URL', async ({ page }) => {
    await page.goto('/');
    const href = await appearanceFor(page.locator('#media'), examples[0].title).locator('a.appearance-title-link').getAttribute('href');
    expect(new URL(href!).searchParams.get('t')).toBe('1060s');
  });

  test('clicking a non-link area of a media row follows the title link', async ({ page }) => {
    await page.goto('/');
    const entry = appearanceFor(page.locator('#media'), examples[1].title);
    const popupPromise = page.waitForEvent('popup');
    await entry.locator('.appearance-thumbnail').click();
    const popup = await popupPromise;
    expect(popup.url()).toContain('open.spotify.com/episode');
    await popup.close();
  });

  test('archive rows use the full content width and retain their separators', async ({ page }) => {
    await page.goto('/');
    const firstEntry = appearanceFor(page.locator('#media'), examples[1].title);
    const firstArticle = page.locator('#media .writing-item:not([data-appearance-entry])').first();
    await expect(page.locator('#media .writing-index')).toHaveCount(0);
    await expect(firstEntry).toHaveCSS('border-bottom-width', '1px');
    await expect(firstArticle.locator('.writing-meta')).toHaveCSS('text-align', 'left');
    const appearanceTitle = await firstEntry.locator('h3').boundingBox();
    const articleTitle = await firstArticle.locator('h3').boundingBox();
    const articleBadge = await firstArticle.locator('.archive-badges').boundingBox();
    expect(appearanceTitle).not.toBeNull();
    expect(articleTitle).not.toBeNull();
    expect(articleBadge).not.toBeNull();
    expect(Math.abs(appearanceTitle!.x - articleTitle!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(articleBadge!.x - articleTitle!.x)).toBeLessThanOrEqual(1);
    const borderBefore = await firstEntry.locator('.appearance-thumbnail').evaluate((element) => getComputedStyle(element).borderColor);
    await firstEntry.locator('.appearance-thumbnail').hover();
    await expect(firstEntry.locator('.appearance-thumbnail img')).not.toHaveCSS('transform', 'none');
    await expect(firstEntry.locator('.appearance-thumbnail')).toHaveCSS('border-color', borderBefore);
  });

  for (const width of [390, 320]) {
    test(`phone stamp layout uses full-width copy at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const entry = appearanceFor(page.locator('#media'), examples[1].title);
      const thumbnailBox = await entry.locator('.appearance-thumbnail').boundingBox();
      const titleBox = await entry.locator('h3').boundingBox();
      const summaryBox = await entry.locator('.appearance-details p').boundingBox();
      const copyBox = await entry.locator('.appearance-copy').boundingBox();
      expect(thumbnailBox).not.toBeNull();
      expect(titleBox).not.toBeNull();
      expect(summaryBox).not.toBeNull();
      expect(copyBox).not.toBeNull();
      expect(titleBox!.y).toBeLessThan(thumbnailBox!.y);
      expect(Math.abs(titleBox!.x - copyBox!.x)).toBeLessThanOrEqual(1);
      expect(summaryBox!.width / copyBox!.width).toBeGreaterThan(.85);
      await expect(entry).not.toContainText(examples[1].duration);
    });

    test(`phone poster layout keeps the image restrained at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const entry = appearanceFor(page.locator('#media'), examples[0].title);
      const thumbnailBox = await entry.locator('.appearance-thumbnail').boundingBox();
      const titleBox = await entry.locator('h3').boundingBox();
      const copyBox = await entry.locator('.appearance-copy').boundingBox();
      expect(thumbnailBox).not.toBeNull();
      expect(titleBox).not.toBeNull();
      expect(copyBox).not.toBeNull();
      expect(thumbnailBox!.y).toBeLessThan(titleBox!.y);
      expect(thumbnailBox!.height).toBeLessThanOrEqual(153);
      expect(thumbnailBox!.width / copyBox!.width).toBeGreaterThan(.9);
      await expect(entry).not.toContainText(examples[0].duration);
    });
  }

  test('text-only mobile mode remains available', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    const entry = appearanceFor(page.locator('#media'), examples[1].title);
    await entry.evaluate((element) => element.setAttribute('data-mobile-presentation', 'text-only'));
    await expect(entry.locator('.appearance-thumbnail')).toBeHidden();
    await expect(entry.locator('h3')).toBeVisible();
  });

  test('all Markdown presentation modes remain available', () => {
    const schema = fs.readFileSync('src/content.config.ts', 'utf8');
    expect(schema).toContain("['contact-sheet', 'lead', 'sidecar']");
    expect(schema).toContain("['stamp', 'poster', 'text-only']");
  });
});

test('Docebo uses a compact contact sheet and keeps lightbox navigation', async ({ page }) => {
  await page.goto('/');
  const gallery = page.locator('#lately [data-media-presentation="contact-sheet"]');
  await expect(gallery).toHaveCount(1);
  const triggers = gallery.locator('[data-lightbox]');
  await expect(triggers).toHaveCount(2);
  const galleryBox = await gallery.locator('.media-images').boundingBox();
  expect(galleryBox).not.toBeNull();
  expect(galleryBox!.width).toBeLessThanOrEqual(561);
  await triggers.nth(0).click();
  await expect(page.locator('#lightbox')).toBeVisible();
  await expect(page.locator('.lb-count')).toHaveText('1 / 2');
  await page.getByRole('button', { name: 'Next image' }).click();
  await expect(page.locator('.lb-count')).toHaveText('2 / 2');
});
