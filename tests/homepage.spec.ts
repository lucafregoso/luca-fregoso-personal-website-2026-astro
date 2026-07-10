import { expect, test } from "@playwright/test";

test.describe("homepage content contract", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("communicates identity, positioning, and proof in page order", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: /Luca Fregoso, home/i }),
    ).toHaveAttribute("href", /\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Luca Fregoso" }),
    ).toBeVisible();
    await expect(page.locator(".hero-role")).toContainText(
      "Developer Programs & Content Lead",
    );
    // the remote signal must be visible above the fold
    await expect(page.locator(".hero-role")).toContainText(/remote/i);
    await expect(page.locator(".hero-headline")).toHaveText(
      "I design technical programs people trust.",
    );
    await expect(page.locator(".hero-intro")).toContainText(
      /clear programs.*actually ship/i,
    );
    await expect(page.locator(".hero-proof")).toContainText(
      /written production code and sold it/i,
    );

    const sectionHeadings = await page.locator("h2").allTextContents();
    expect(sectionHeadings.map((heading) => heading.trim())).toEqual([
      "Work",
      "Lately",
      "Talks",
      "Media & writing",
      "Bring me the complicated brief.",
    ]);

    await expect(page.locator("#work .intersection").first()).toBeVisible();
    await expect(page.locator("#lately article").first()).toBeVisible();
    await expect(page.locator("#talks .talk-card").first()).toBeVisible();
    await expect(page.locator("#media .media-grid > *").first()).toBeVisible();
  });

  test("frames work as intersections, business-report style, glue first", async ({
    page,
  }) => {
    // the glue framing leads the section intro; the first card is the
    // business-side proof with the program-management keyword
    await expect(page.locator("#work .section-heading")).toContainText(
      /I am the glue/i,
    );
    const intersections = page.locator("#work .intersection");
    await expect(intersections).toHaveCount(3);
    await expect(intersections.first()).toContainText(
      "Turning sales promises into shipped software",
    );
    await expect(intersections.first()).toContainText(/program management/i);
    await expect(intersections.nth(2)).toContainText(/from zero/i);
    // each intersection card: axis label, one summary, display stat, CTA
    for (let index = 0; index < 3; index += 1) {
      const block = intersections.nth(index);
      await expect(block.locator(".ix-axis")).toContainText("×");
      await expect(block.locator(".ix-summary")).toBeVisible();
      await expect(block.locator(".ix-stat strong")).toBeVisible();
      await expect(block.locator(".ix-link")).toBeVisible();
    }
  });

  test("uses stronger career-wide proof without kicker scaffolding", async ({
    page,
  }) => {
    // exactly three true numbers, none duplicated as an intersection stat
    await expect(page.locator(".metrics .metric")).toHaveCount(3);
    await expect(page.locator(".metrics")).toContainText("20+ years");
    await expect(page.locator(".metrics")).toContainText("5,000+");
    await expect(page.locator(".metrics")).toContainText("20+ paths");
    await expect(page.locator(".section-number")).toHaveCount(0);
    await expect(page.locator(".section-glyph")).toHaveCount(0);
    await expect(page.locator(".eyebrow")).toHaveCount(0);
  });

  test("nav labels match the section headings they target", async ({
    page,
  }) => {
    const nav = page.locator(".desktop-navigation");
    for (const item of [
      { label: "Work", target: "#work" },
      { label: "Lately", target: "#lately" },
      { label: "Talks", target: "#talks" },
      { label: "Media & writing", target: "#media" },
    ]) {
      await expect(nav.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.target,
      );
      await expect(page.locator(`${item.target} h2`).first()).toHaveText(
        item.label,
      );
    }
  });

  test("whoami interlude sits between Lately and Talks, readable without motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const egg = page.locator(".interlude [data-egg]");
    await egg.scrollIntoViewIfNeeded();
    await expect(egg.locator("[data-egg-command]")).toHaveText("whoami");
    await expect(egg.locator("[data-egg-output]")).toBeVisible();
    await expect(egg.locator("[data-egg-output]")).toContainText(
      /still with me/i,
    );
    // the interlude is a rhythm break: after #lately, before #talks
    const order = await page.evaluate(() => {
      const lately = document.querySelector("#lately");
      const interlude = document.querySelector(".interlude");
      const talks = document.querySelector("#talks");
      if (!lately || !interlude || !talks) return "missing";
      const after =
        lately.compareDocumentPosition(interlude) &
        Node.DOCUMENT_POSITION_FOLLOWING;
      const before =
        interlude.compareDocumentPosition(talks) &
        Node.DOCUMENT_POSITION_FOLLOWING;
      return after && before ? "ordered" : "misplaced";
    });
    expect(order).toBe("ordered");
  });

  test("labels point to the filtered archive and upcoming remains prominent", async ({
    page,
  }) => {
    const upcoming = page.locator(".upcoming li");
    const upcomingCount = await upcoming.count();
    expect(upcomingCount).toBeLessThanOrEqual(1);
    if (upcomingCount > 0) {
      await expect(
        upcoming.first().locator(".meta-badge-status"),
      ).toBeVisible();
      const upcomingBackground = await upcoming
        .first()
        .evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(upcomingBackground).not.toBe("rgba(0, 0, 0, 0)");
    }
    await expect(page.locator(".meta-badge").first()).toBeVisible();
    await expect(
      page
        .locator('#lately .feed-meta a[href*="/archive/"][href*="type="]')
        .first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View the full archive" }),
    ).toHaveAttribute("href", /\/archive\/$/);
  });

  test("lately updated date reflects the build day", async ({ page }) => {
    const buildDay = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      timeZone: "Europe/Rome",
    });
    await expect(page.locator("#lately .updated")).toHaveText(
      `Updated ${buildDay}`,
    );
  });

  test("linked badges recover a full lime hover treatment in dark mode", async ({
    page,
  }) => {
    await page
      .locator("html")
      .evaluate((element) => element.setAttribute("data-theme", "dark"));
    const badge = page.locator("#lately .feed-meta a.meta-badge").first();
    await expect(badge).toBeVisible();
    const initial = await badge.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    await badge.hover();
    const hovered = await badge.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    expect(initial).not.toBe("rgba(0, 0, 0, 0)");
    expect(hovered).not.toBe(initial);
    expect(hovered).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("linked media badges render as pills, not underlined links", async ({
    page,
  }) => {
    await page
      .locator("html")
      .evaluate((element) => element.setAttribute("data-theme", "dark"));
    const linked = page.locator("#media a.meta-badge").first();
    await expect(linked).toBeVisible();
    const border = await linked.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        topColor: computed.borderTopColor,
        bottomColor: computed.borderBottomColor,
        topWidth: computed.borderTopWidth,
        bottomWidth: computed.borderBottomWidth,
        bottomStyle: computed.borderBottomStyle,
      };
    });
    expect(border.topColor).toBe(border.bottomColor);
    expect(border.topWidth).toBe(border.bottomWidth);
    expect(border.bottomStyle).toBe("solid");
  });

  test("offers clear primary profile and conversion paths", async ({
    page,
  }) => {
    const introNav = page.locator(".utility-links");
    await expect(
      introNav.getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/lucafregoso");
    await expect(
      introNav.getByRole("link", { name: "Sessionize" }),
    ).toHaveAttribute("href", "https://sessionize.com/luca-fregoso/");
    await expect(
      introNav.getByRole("link", { name: "CV (PDF)" }),
    ).toHaveAttribute("href", /\/cv\.pdf$/);
    await expect(
      page.locator(".hero-actions").getByRole("link", { name: "Work with me" }),
    ).toHaveAttribute("href", "#contact");
    // the availability statement lives at the conversion point
    await expect(page.locator("#contact")).toContainText(/remote by default/i);
    await expect(
      page.getByRole("link", { name: "See selected work" }),
    ).toHaveAttribute("href", "#work");

    const contact = page.locator("#contact");
    await expect(contact).toContainText(
      /developer program.*technical proposal.*event.*learning path/i,
    );
    await expect(introNav.getByRole('link', { name: 'Sessionize' })).toHaveAttribute(
      'href',
      'https://sessionize.com/luca-fregoso/'
    );
    await expect(introNav.getByRole('link', { name: 'CV (PDF)' })).toHaveAttribute('href', /\/cv\.pdf$/);
    await expect(page.locator('.hero-actions').getByRole('link', { name: 'Discuss a complex brief' })).toHaveAttribute(
      'href',
      '#contact'
    );
    await expect(page.getByRole('link', { name: 'See selected work' })).toHaveAttribute('href', '#work');

    await expect(contact.getByRole("button", { name: /email/i })).toBeVisible();
    await expect(
      contact.getByRole("link", { name: "View CV (PDF)" }),
    ).toHaveAttribute("href", /\/cv\.pdf$/);
  });

  test("has one main landmark and a navigable heading structure", async ({
    page,
  }) => {
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(
      await page.getByRole("heading", { level: 2 }).count(),
    ).toBeGreaterThanOrEqual(4);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("homepage responsive contract", () => {
  for (const viewport of [
    { name: "small phone", width: 320, height: 700 },
    { name: "200% zoom equivalent", width: 640, height: 800 },
    { name: "tablet", width: 768, height: 900 },
  ]) {
    test(`has no horizontal page overflow on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.addStyleTag({ content: "html { scrollbar-gutter: stable; }" });

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
      await expect(page.locator("html")).toHaveCSS("overflow-x", "clip");
      const horizontalPosition = await page.evaluate(() => {
        document.documentElement.scrollLeft = 100;
        return document.documentElement.scrollLeft;
      });
      expect(horizontalPosition).toBe(0);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator(".hero-actions")).toBeVisible();
    });
  }

  test("primary compact controls meet the 44px target size", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const selectors = [
      "#theme-toggle",
      ".menu-toggle",
      "[data-language-switcher] button",
      ".hero-actions a",
      ".social-links a",
    ];
    for (const selector of selectors) {
      const boxes = await page.locator(selector).evaluateAll((elements) =>
        elements.map((element) => {
          const box = element.getBoundingClientRect();
          return { width: box.width, height: box.height };
        }),
      );
      expect(boxes.length).toBeGreaterThan(0);
      for (const box of boxes) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
