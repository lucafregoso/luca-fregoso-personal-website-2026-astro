import { expect, test, type Page } from '@playwright/test';

function watchRuntime(page: Page) {
  const issues: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'warning' || message.type() === 'error') {
      const location = message.location();
      issues.push(`console.${message.type()}: ${message.text()} @ ${location.url || 'unknown'}:${location.lineNumber ?? 0}`);
    }
  });
  page.on('pageerror', (error) => issues.push(`pageerror: ${error.message}`));
  page.on('requestfailed', (request) => {
    const reason = request.failure()?.errorText ?? 'unknown failure';
    if (reason !== 'net::ERR_ABORTED') issues.push(`requestfailed: ${request.url()} — ${reason}`);
  });
  return issues;
}

for (const locale of [
  { path: '/', language: /Choose language/i, menu: 'Open menu' },
  { path: '/it/', language: /Scegli (?:la )?lingua/i, menu: 'Apri menu' },
] as const) {
  test(`${locale.path} stays free of runtime warnings and failures through key interactions`, async ({ page }) => {
    const issues = watchRuntime(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(locale.path);

    const language = page.getByRole('button', { name: locale.language });
    await language.click();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: locale.menu }).click();
    await page.keyboard.press('Escape');

    await expect(page.locator('iframe')).toHaveCount(0);
    await expect(page.locator('#media [data-appearance-entry]')).toHaveCount(2);
    await page.waitForTimeout(500);

    expect(issues, 'runtime issue provenance').toEqual([]);
  });
}
