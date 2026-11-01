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
      // filters are a labelled group of toggle buttons, "All" on by default
      await expect(
        page.getByRole("group", { name: /filter|filtra/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: locale.all, exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
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
        page.locator(`[data-filter][data-type="${locale.filter}"]`),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        page.getByRole("button", { name: locale.all, exact: true }),
      ).toHaveAttribute("aria-pressed", "false");
    });

    test(`${locale.path} combines filters and toggles them off`, async ({
      page,
    }) => {
      const filter = (type: string) =>
        page.locator(`[data-filter][data-type="${type}"]`);
      // the homepage "more recordings" link: every recording format at once
      await page.goto(`${locale.path}?type=video,live-recording,podcast`);
      const visible = page.locator("[data-archive-item]:visible");
      await expect(visible).toHaveCount(8);
      for (const type of ["video", "live-recording", "podcast"]) {
        await expect(filter(type)).toHaveAttribute("aria-pressed", "true");
      }
      await expect(filter("all")).toHaveAttribute("aria-pressed", "false");
      // clicking a selected pill drops just that type
      await filter("podcast").click();
      await expect(page).toHaveURL(/\?type=video,live-recording$/);
      await expect(visible).toHaveCount(7);
      await expect(visible.filter({ hasText: locale.filteredText })).toHaveCount(0);
      await expect(filter("podcast")).toHaveAttribute("aria-pressed", "false");
      // clicking an unselected pill adds it back, in pill order
      await filter("podcast").click();
      await expect(page).toHaveURL(/\?type=video,live-recording,podcast$/);
      await expect(visible).toHaveCount(8);
      // deselecting everything falls back to All
      for (const type of ["video", "live-recording", "podcast"]) {
        await filter(type).click();
      }
      await expect(page).toHaveURL(/\/archive\/$/);
      await expect(filter("all")).toHaveAttribute("aria-pressed", "true");
      // "All" clears any selection in one press
      await filter("video").click();
      await filter("podcast").click();
      await filter("all").click();
      await expect(page).toHaveURL(/\/archive\/$/);
      await expect(visible.first()).toBeVisible();
    });

    test(`${locale.path} without JavaScript lists entries and hides dead filters`, async ({
      browser,
    }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(locale.path);
      await expect(page.locator("[data-archive-filters]")).toBeHidden();
      await expect(page.locator("[data-archive-item]").first()).toBeVisible();
      await context.close();
    });
  }

  test("home labels navigate to filtered archive views", async ({ page }) => {
    await page.goto("/");
    const label = page
      .locator('#lately a.meta-badge[href*="/archive/"][href*="type="]')
      .first();
    const href = await label.getAttribute("href");
    expect(href).toContain("/archive/");
    await label.click();
    await expect(page).toHaveURL(/\/archive\/\?type=/);
  });
});
