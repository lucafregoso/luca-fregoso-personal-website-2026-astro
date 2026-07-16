import { test, expect } from "@playwright/test";

// ─────────────────────────────────────────────────────────────
// REGRESSION TESTS
// Each test here guards a bug that actually happened. If one fails,
// a real defect has come back. Don't delete these.
// ─────────────────────────────────────────────────────────────

test.describe("regressions", () => {
  test('the page title never contains "undefined"', async ({ page }) => {
    // Bug history: a removed `site.role` field left the title as
    // "Luca Fregoso — undefined".
    await page.goto("/");
    const title = await page.title();
    expect(title).not.toContain("undefined");
    expect(title).toMatch(/Luca Fregoso/);
  });

  test('no meta tag or JSON-LD contains "undefined"', async ({ page }) => {
    await page.goto("/");
    const head = await page.locator("head").innerHTML();
    expect(head).not.toContain("undefined");
  });

  test("talks and writing content is visible WITHOUT JavaScript", async ({
    browser,
  }) => {
    // Bug history: reveal-on-scroll hid content with opacity:0 and only
    // showed it via JS. When the observer misfired, sections were empty.
    // Content must never depend on JS to be visible.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");

    const talks = page.locator("#talks .talk-card").first();
    await expect(talks).toBeVisible();
    expect(await talks.evaluate((el) => getComputedStyle(el).opacity)).toBe(
      "1",
    );

    const writing = page.locator("#media .media-grid > *").first();
    await expect(writing).toBeVisible();
    expect(await writing.evaluate((el) => getComputedStyle(el).opacity)).toBe(
      "1",
    );

    await context.close();
  });

  test("email address is not present as plain text in the HTML source", async ({
    page,
  }) => {
    // Bug history: the email leaked in the footer, JSON-LD, and a console
    // easter egg. It must only exist split across data-attributes.
    await page.goto("/");
    const html = await page.content();
    expect(html).not.toContain("luca.fregoso@gmail.com");
  });

  test("personal contact details are absent from machine-readable public text", async ({
    request,
  }) => {
    const response = await request.get("/llms.txt");
    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    expect(text).not.toContain("luca.fregoso@gmail.com");
    expect(text).not.toContain("+39 347 5420915");
    expect(text).toContain("#contact");
  });

  test("tinted sections render a visible full-width background band", async ({
    page,
  }) => {
    // Bug history: the background band collapsed to the content width.
    await page.goto("/");
    const band = await page.locator(".stream.tinted").evaluate((el) => {
      const b = getComputedStyle(el, "::before");
      return {
        width: Number.parseFloat(b.width),
        viewport: window.innerWidth,
        bg: b.backgroundColor,
      };
    });
    expect(band.width).toBeGreaterThanOrEqual(band.viewport);
    expect(band.bg).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("published links never expose placeholder profiles", async ({
    page,
  }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href") ?? ""),
      );
    expect(hrefs.join("\n")).not.toMatch(
      /REPLACE_ME|REPLACE_INSTANCE|example\.com/i,
    );
  });

  test("Sveltia CMS admin is not part of the public static site", async ({
    request,
  }) => {
    const response = await request.get("/admin/");
    expect(response.status()).toBe(404);
  });

  test("featured items get a larger rail dot, never an opaque box", async ({
    page,
  }) => {
    // Bug history: featured entries kept getting a grey/lime background box
    // that clashed with the tinted section bands. The current signature is a
    // larger lime dot on the time rail (::after) plus a transparent gradient
    // wash — the background-color itself must stay transparent, never an
    // opaque tinted card.
    await page.goto("/");
    const featured = page.locator(".timeline .is-featured").first();
    await expect(featured).toBeVisible();

    // no opaque background fill (the gradient wash lives in background-image)
    const bg = await featured.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(["rgba(0, 0, 0, 0)", "transparent"]).toContain(bg);

    // the rail dot exists and is larger than a regular entry's dot
    const featuredDot = await featured.evaluate((el) =>
      Number.parseFloat(getComputedStyle(el, "::before").width),
    );
    const regularDot = await page
      .locator(".timeline .feed-item:not(.is-featured)")
      .first()
      .evaluate((el) =>
        Number.parseFloat(getComputedStyle(el, "::before").width),
      );
    expect(featuredDot).toBeGreaterThan(0);
    expect(regularDot).toBeGreaterThan(0);
    expect(featuredDot).toBeGreaterThan(regularDot);
  });
});
