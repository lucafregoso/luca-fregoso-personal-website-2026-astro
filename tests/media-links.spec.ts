import { expect, test, type Locator } from "@playwright/test";
import fs from "node:fs";

const providerRequest =
  /(?:youtube(?:-nocookie)?\.com|ytimg\.com|googlevideo\.com|spotify\.com|scdn\.co)/i;
// the hand-picked three (`library` placement), newest first
const examples = [
  {
    guest: "Andrey Breslav",
    duration: "15:16",
    platformId: "BaBDYY5PG-Y",
    lang: null,
  },
  {
    guest: "Katharine Jarmul",
    duration: "14:37",
    platformId: "-aZI6U0Q-tI",
    lang: null,
  },
  {
    guest: "BGE 116",
    duration: "2:15:21",
    platformId: "Bxprfi5Z7Uo",
    lang: "in Italian",
  },
] as const;
// typed wide so the it-locale branches keep compiling while disabled
const locales: ReadonlyArray<{ path: string; lang: "en" | "it" }> = [
  { path: "/", lang: "en" },
  // /it/ temporarily disabled — restore with src/pages/it/:
  // { path: "/it/", lang: "it" },
];

function rowFor(section: Locator, guest: string) {
  return section.locator("[data-appearance-entry]").filter({ hasText: guest });
}

test.describe("media run of show", () => {
  for (const locale of locales) {
    test(`${locale.path} renders one row per recording with secure outbound links`, async ({
      page,
    }) => {
      await page.goto(locale.path);
      for (const example of examples) {
        const row = rowFor(page.locator("#media"), example.guest);
        await expect(row).toHaveCount(1);
        await expect(row.locator(".rundown-time")).toHaveText(example.duration);
        await expect(row.locator(".rundown-kind")).toHaveText(/watch/i);
        if (example.lang) {
          // a flag before the title, "(in Italian)" in the link's name
          await expect(row.locator("h3 .rundown-flag svg")).toBeVisible();
          await expect(row.locator("h3 a.media-card-link")).toHaveAccessibleName(
            new RegExp(`\\(${example.lang}\\)`),
          );
        } else {
          await expect(row.locator(".rundown-flag")).toHaveCount(0);
        }
        await expect(row.locator(".rundown-thumb img")).toHaveAttribute(
          "src",
          /\/media\/.+\.png$/,
        );
        const link = row.locator("h3 a.media-card-link");
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener/);
        await expect(link).toHaveAttribute("rel", /noreferrer/);
        await expect(link).toHaveAttribute(
          "href",
          new RegExp(`youtube\\.com/watch\\?v=${example.platformId}`),
        );
      }
      await expect(
        page.getByRole("link", {
          name:
            locale.lang === "it"
              ? "Vedi tutto l’archivio"
              : "View the full archive",
        }),
      ).toBeVisible();
    });

    test(`${locale.path} contains no embeds or provider requests`, async ({
      page,
    }) => {
      const requests: string[] = [];
      page.on("request", (request) => {
        if (providerRequest.test(request.url())) requests.push(request.url());
      });
      await page.goto(locale.path);
      await page.waitForTimeout(300);
      await expect(page.locator("iframe")).toHaveCount(0);
      await expect(page.locator("[data-embed-src]")).toHaveCount(0);
      expect(requests).toEqual([]);
    });
  }

  test("desktop preview starts on the newest item and follows pointer and focus", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const media = page.locator("#media");
    const preview = media.locator(".rundown-preview");
    await expect(preview).toBeVisible();
    await expect(preview).toHaveAttribute("aria-hidden", "true");
    // only one slide shows, and row thumbnails stay out of the way
    await expect(preview.locator(".rundown-slide:visible")).toHaveCount(1);
    await expect(media.locator(".rundown-thumb").first()).toBeHidden();
    await expect(preview.locator(".rundown-slide:visible")).toContainText(
      "Andrey Breslav",
    );

    await rowFor(media, "Katharine Jarmul").hover();
    await expect(preview.locator(".rundown-slide:visible")).toContainText(
      "Katharine Jarmul",
    );
    await expect(rowFor(media, "Katharine Jarmul")).toHaveClass(/is-active/);

    await rowFor(media, "BGE 116").locator("h3 a").focus();
    await expect(preview.locator(".rundown-slide:visible")).toContainText(
      "BGE 116",
    );
    await expect(media.locator(".rundown-row.is-active")).toHaveCount(1);
  });

  test("clicking the preview follows the active row's link", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const media = page.locator("#media");
    await rowFor(media, "BGE 116").hover();
    const popupPromise = page.waitForEvent("popup");
    await media.locator(".rundown-slide:visible .rundown-poster").click();
    const popup = await popupPromise;
    expect(popup.url()).toContain("Bxprfi5Z7Uo");
    await popup.close();
  });

  test("without JavaScript the preview still shows the newest item", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();
    await page.goto("/");
    const slide = page.locator("#media .rundown-slide:visible");
    await expect(slide).toHaveCount(1);
    await expect(slide).toContainText("Andrey Breslav");
    await context.close();
  });

  test("YouTube keeps the requested start time in its external URL", async ({
    page,
  }) => {
    // Tech Chat left the homepage Media section; its start time still has
    // to survive wherever it is listed.
    await page.goto("/archive/");
    const href = await page
      .locator('a[href*="hexh4KEy2Lo"]')
      .first()
      .getAttribute("href");
    expect(new URL(href!).searchParams.get("t")).toBe("1060s");
  });

  test("clicking a non-link area of a media row follows the title link", async ({
    page,
  }) => {
    await page.goto("/");
    const row = rowFor(page.locator("#media"), "BGE 116");
    const popupPromise = page.waitForEvent("popup");
    await row.locator(".rundown-date").click();
    const popup = await popupPromise;
    expect(popup.url()).toContain("Bxprfi5Z7Uo");
    await popup.close();
  });

  for (const width of [390, 320, 800]) {
    test(`rows carry a thumbnail beside the title at ${width}px, no preview`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.locator("#media .rundown-preview")).toBeHidden();
      for (const example of examples) {
        const row = rowFor(page.locator("#media"), example.guest);
        const thumbBox = await row.locator(".rundown-thumb").boundingBox();
        const titleBox = await row.locator("h3").boundingBox();
        expect(thumbBox).not.toBeNull();
        expect(titleBox).not.toBeNull();
        expect(thumbBox!.x + thumbBox!.width).toBeLessThanOrEqual(titleBox!.x);
        await expect(row.locator(".rundown-time")).toBeVisible();
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("text-only mobile mode remains available", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/");
    const row = rowFor(page.locator("#media"), "BGE 116");
    await row.evaluate((element) =>
      element.setAttribute("data-mobile-presentation", "text-only"),
    );
    await expect(row.locator(".rundown-thumb")).toBeHidden();
    await expect(row.locator("h3")).toBeVisible();
  });

  test("all Markdown presentation modes remain available", () => {
    // quote-style agnostic: the formatter may rewrite ' to " in the schema
    const schema = fs
      .readFileSync("src/content.config.ts", "utf8")
      .replaceAll('"', "'");
    expect(schema).toContain("['contact-sheet', 'lead', 'sidecar']");
    expect(schema).toContain("['stamp', 'poster', 'text-only']");
  });
});

test("image galleries use a compact contact sheet and keep lightbox navigation", async ({
  page,
}) => {
  await page.goto("/test-fixtures/lightbox/");
  const gallery = page.locator(
    '#lately [data-media-presentation="contact-sheet"]',
  );
  await expect(gallery).toHaveCount(1);
  const triggers = gallery.locator("[data-lightbox]");
  await expect(triggers).toHaveCount(2);
  const galleryBox = await gallery.locator(".media-images").boundingBox();
  expect(galleryBox).not.toBeNull();
  expect(galleryBox!.width).toBeLessThanOrEqual(561);
  await triggers.nth(0).click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await expect(page.locator(".lb-count")).toHaveText("1 / 2");
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(page.locator(".lb-count")).toHaveText("2 / 2");
});
