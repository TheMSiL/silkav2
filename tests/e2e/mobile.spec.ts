import { expect, test } from "@playwright/test";

/**
 * Phone regressions, all of which shipped once and were invisible in Chromium
 * device emulation. Worth running on every project, but the `ios` project is
 * the one that actually catches them.
 */

const routes = ["/", "/work", "/work/aera", "/services", "/about", "/contact"];

test.describe("Mobile layout", () => {
  test.skip(({ isMobile }) => !isMobile, "phone viewports only");

  for (const route of routes) {
    test(`${route} never pans horizontally`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("load");

      // Measured at several scroll depths: sections below the fold lay out
      // differently once their content is in view.
      const worst = await page.evaluate(async () => {
        let panned = 0;
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((resolve) => requestAnimationFrame(resolve));
          window.scrollTo(4000, y);
          panned = Math.max(panned, window.scrollX);
          window.scrollTo(0, y);
        }
        return panned;
      });

      expect(worst, "page scrolled sideways").toBe(0);
    });
  }

  test("form controls clear 16px so iOS never zooms on focus", async ({ page }) => {
    await page.goto("/contact");

    const tooSmall = await page.evaluate(() =>
      [...document.querySelectorAll("input, select, textarea")]
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16)
        .map((el) => `${el.tagName}[${el.getAttribute("name") ?? "?"}]`),
    );

    expect(tooSmall).toEqual([]);
  });
});

test.describe("Hero paints without JavaScript", () => {
  /*
   * The hero used to sit behind a route-level Suspense fallback and behind
   * motion's JS-driven `initial` styles, so on a phone it arrived seconds late
   * and — with Reduce Motion on — popped in with no animation at all. Turning
   * JavaScript off is the sharpest available proxy for "before hydration".
   */
  test.use({ javaScriptEnabled: false });

  for (const reducedMotion of ["reduce", "no-preference"] as const) {
    test(`heading is rendered and opaque (motion: ${reducedMotion})`, async ({ browser }, testInfo) => {
      const context = await browser.newContext({
        ...testInfo.project.use,
        javaScriptEnabled: false,
        reducedMotion,
      });
      const page = await context.newPage();
      await page.goto(`${testInfo.project.use.baseURL ?? "http://localhost:3210"}/`);

      const heading = page.locator("h1").first();
      await expect(heading).toBeVisible();

      const box = await heading.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThan(20);

      const opacity = await heading.evaluate((el) => {
        const word = el.querySelector("span span span") ?? el;
        return getComputedStyle(word).opacity;
      });
      expect(opacity).toBe("1");

      await context.close();
    });
  }
});

test.describe("Reveal engine", () => {
  /*
   * Entrance animations must never be able to strand content. The failure mode
   * is silent and total — an element that misses its trigger stays at opacity 0
   * for the life of the page — so this exercises the cases that break an
   * IntersectionObserver: teleport scrolling, and a straight jump to the end.
   */
  const tally = async (page: import("@playwright/test").Page) =>
    page.evaluate(() => {
      const all = [...document.querySelectorAll("[data-reveal]")];
      return {
        total: all.length,
        stuck: all.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.9).length,
      };
    });

  for (const route of ["/", "/about", "/work/aera"]) {
    test(`${route} reveals everything under teleport scrolling`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 1200) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((resolve) => setTimeout(resolve, 800));
      });

      const { total, stuck } = await tally(page);
      expect(total).toBeGreaterThan(0);
      expect(stuck, "elements left invisible").toBe(0);
    });
  }

  test("a jump straight to the bottom reveals everything above it", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    });

    expect((await tally(page)).stuck).toBe(0);
  });

  test("nothing is hidden at all under reduced motion", async ({ browser }, testInfo) => {
    const context = await browser.newContext({ ...testInfo.project.use, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(`${testInfo.project.use.baseURL ?? "http://localhost:3210"}/`);

    expect(await page.evaluate(() => document.documentElement.getAttribute("data-motion"))).toBeNull();
    expect((await tally(page)).stuck).toBe(0);

    await context.close();
  });
});
