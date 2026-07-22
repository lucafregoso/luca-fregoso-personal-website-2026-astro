import { expect, test } from "@playwright/test";

const locales = [
  {
    path: "/archive/",
    lang: "en",
    title: "Archive.",
    filter: "podcast",
    filteredText: "Spotlight #11",
    all: "All",
  },
  // The /it/ locale is temporarily disabled (see activeLocales in
  // src/i18n). Restore this row together with src/pages/it/:
  // { path: "/it/archive/", lang: "it", title: "Archivio.",
  //   filter: "podcast", filteredText: "Spotlight #11", all: "Tutto" },
] as const;

test.describe("archive", () => {
  for (const locale of locales) {
    test(`${locale.path} renders metadata, filters and entries`, async ({
      page,
    }) => {
      await page.goto(locale.path);
      await expect(page.locator("html")).toHaveAttribute("lang", locale.lang);
      await expect(
        page.getByRole("heading", { level: 1, name: locale.title }),
      ).toBeVisible();
      await expect(page.locator(".section-glyph")).toHaveCount(0);
      expect(await page.locator("[data-archive-item]").count()).toBeGreaterThan(
        0,
      );
      expect(
        await page.locator("[data-archive-item]:visible").count(),
      ).toBeLessThanOrEqual(20);
      await expect(
        page.getByRole("navigation", { name: /filter|filtra/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: locale.all, exact: true }),
      ).toHaveAttribute("aria-current", "page");
    });

    test(`${locale.path} supports query-filtered archive views`, async ({
      page,
    }) => {
      await page.goto(`${locale.path}?type=${locale.filter}`);
      await expect(page.locator("[data-archive-item]:visible")).toHaveCount(1);
      await expect(page.locator("[data-archive-item]:visible")).toContainText(
        locale.filteredText,
      );
      await expect(
        page.locator(`[data-filter-link][data-type="${locale.filter}"]`),
      ).toHaveAttribute("aria-current", "page");
    });
  }

  test("home labels navigate to filtered archive views", async ({ page }) => {
    await page.goto("/");
    const label = page
      .locator('#lately .feed-meta a[href*="/archive/"][href*="type="]')
      .first();
    const href = await label.getAttribute("href");
    expect(href).toContain("/archive/");
    await label.click();
    await expect(page).toHaveURL(/\/archive\/\?type=/);
  });
});
