import { expect, test } from "@playwright/test";

// Ukrainian at the root, English prefixed — both must hold up.
const pages = [
  "/",
  "/work",
  "/services",
  "/capabilities",
  "/about",
  "/insights",
  "/contact",
  "/en",
  "/en/work",
  "/ru/services",
];

test.describe("Accessibility basics", () => {
  for (const path of pages) {
    test(`${path} has one h1, a skip link, and titled landmarks`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeAttached();

      const skip = page.getByRole("link", { name: /skip to content|перейти до вмісту|перейти к содержимому/i });
      await expect(skip).toBeAttached();
      await expect(skip).toHaveAttribute("href", "#main");
    });
  }

  test("every image carries alt text", async ({ page }) => {
    await page.goto("/en/work");
    const missing = await page
      .locator("img:not([alt])")
      .count();
    expect(missing).toBe(0);
  });

  test("the skip link is reachable as the first tab stop", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveText(/skip to content|перейти до вмісту/i);
  });

  test("the services explorer is operable with the keyboard", async ({ page }) => {
    await page.goto("/en/services");
    const first = page.getByRole("tab").first();
    await first.focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("tab", { name: "Mobile" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("reduced motion still renders headings and reveals", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");

    // Headings must be visible, not stuck below their clipping wrapper.
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    // The words must actually be rendered, not clipped away by their wrapper.
    await expect(h1).not.toHaveText("");

    await expect(page.getByRole("heading", { level: 2 }).first()).toBeAttached();
    await context.close();
  });
});

/**
 * Reduce Motion is common on phones, and branching markup on it used to break
 * hydration: React discarded the server HTML, so the hero rendered from its
 * hidden initial state and the menu button had no handler attached.
 */
test.describe("Reduced motion hydration", () => {
  test("hydrates cleanly and stays interactive with Reduce Motion on", async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();

    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });

    await page.goto("/");
    await page.waitForTimeout(1500);

    // No hydration mismatch (React error #418/#423 and friends).
    expect(errors.filter((e) => /Minified React error|Hydration/i.test(e))).toEqual([]);

    // The hero must be rendered, not stuck at its animation start state.
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    expect((await h1.boundingBox())!.height).toBeGreaterThan(20);

    // And the menu button must actually respond to a tap.
    await page.getByRole("button", { name: /open menu|відкрити меню|открыть меню/i }).tap();
    await expect(page.getByRole("dialog")).toBeVisible();

    await context.close();
  });
});
