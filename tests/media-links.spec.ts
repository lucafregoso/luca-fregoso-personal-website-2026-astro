import { expect, test, type Locator } from '@playwright/test';
import fs from 'node:fs';

const providerRequest = /(?:youtube(?:-nocookie)?\.com|ytimg\.com|googlevideo\.com|spotify\.com|scdn\.co)/i;
const examples = [
  { title: 'Tech Chat – AI & Open Source', publisher: 'Codemotion', duration: '1:03:23', hrefPart: 'youtube.com/watch', action: { en: 'Watch on YouTube', it: 'Guarda su YouTube' } },
  { title: 'Spotlight #11 – Luca Fregoso (Codemotion)', publisher: 'Il Podcast Open Source', duration: '44:01', hrefPart: 'open.spotify.com/episode', action: { en: 'Listen on Spotify', it: 'Ascolta su Spotify' } },
] as const;
const locales = [{ path: '/', lang: 'en' }, { path: '/it/', lang: 'it' }] as const;

function appearanceFor(section: Locator, title: string) {
  return section.locator('[data-appearance-entry]').filter({ hasText: title });
}

test.describe('compact media appearances', () => {
  for (const locale of locales) {
    test(`${locale.path} renders compact appearances in Lately and Media`, async ({ page }) => {
      await page.goto(locale.path);
      for (const example of examples) {
        for (const sectionId of ['#lately', '#media']) {
          const entry = appearanceFor(page.locator(sectionId), example.title);
          await expect(entry).toHaveCount(1);
          await expect(entry).toHaveAttribute('data-mobile-presentation', 'row');
          await expect(entry).toContainText(example.publisher);
          if (sectionId === '#lately') {
            await expect(entry).toContainText(example.duration);
          } else {
            await expect(entry).not.toContainText(example.duration);
          }
        }
        const entry = appearanceFor(page.locator('#media'), example.title);
        const thumbnail = entry.locator('a.appearance-thumbnail');
        const action = entry.locator('a.appearance-action');
        await expect(action).toContainText(example.action[locale.lang]);
        for (const link of [thumbnail, action]) {
          await expect(link).toHaveAttribute('target', '_blank');
          await expect(link).toHaveAttribute('rel', /noopener/);
          await expect(link).toHaveAttribute('rel', /noreferrer/);
          await expect(link).toHaveAttribute('href', new RegExp(example.hrefPart));
        }
        await expect(thumbnail.locator('img')).toHaveAttribute('src', /\/media\/.+\.png$/);
      }
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
    const href = await appearanceFor(page.locator('#media'), examples[0].title).locator('a.appearance-thumbnail').getAttribute('href');
    expect(new URL(href!).searchParams.get('t')).toBe('1060s');
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

  test('all Markdown presentation modes remain available', () => {
    const schema = fs.readFileSync('src/content.config.ts', 'utf8');
    expect(schema).toContain("['contact-sheet', 'lead', 'sidecar']");
    expect(schema).toContain("['row', 'above', 'text-only']");
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
