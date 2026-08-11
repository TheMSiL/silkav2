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
