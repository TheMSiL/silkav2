import { expect, test } from "@playwright/test";

/**
 * Ukrainian is the primary language and is served unprefixed; English and
 * Russian are prefixed. These cover the routing contract itself.
 */
test.describe("Localisation", () => {
  test("the root serves Ukrainian", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "uk-UA");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("цифрові продукти");
  });

  test("prefixed routes serve their own language", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.goto("/ru");
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("цифровые продукты");
  });

  test("the internal /uk prefix redirects to the clean URL", async ({ page }) => {
    await page.goto("/uk/work");
    await expect(page).toHaveURL(/\/work$/);
    await expect(page).not.toHaveURL(/\/uk\//);
  });

  test("the switcher keeps you on the same page", async ({ page }) => {
    await page.goto("/work/crashatlas", { waitUntil: "domcontentloaded" });
    await page.getByRole("navigation", { name: /мова|language|язык/i })
      .first()
      .getByRole("link", { name: "EN" })
      .click();
    await expect(page).toHaveURL(/\/en\/work\/crashatlas$/);

    await page.getByRole("navigation", { name: /language/i })
      .first()
      .getByRole("link", { name: "RU" })
      .click();
    await expect(page).toHaveURL(/\/ru\/work\/crashatlas$/);
  });

  test("every locale declares hreflang alternates", async ({ page }) => {
    await page.goto("/work");
    for (const hreflang of ["uk-UA", "en", "ru", "x-default"]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveCount(1);
    }
  });

  test("case studies carry translated prose but identical media", async ({ page }) => {
    await page.goto("/work/crashatlas", { waitUntil: "domcontentloaded" });
    const ukCover = await page.locator("main img").first().getAttribute("src");
    await expect(page.getByRole("heading", { name: "Задача" })).toBeVisible();

    await page.goto("/ru/work/crashatlas", { waitUntil: "domcontentloaded" });
    const ruCover = await page.locator("main img").first().getAttribute("src");
    await expect(page.getByRole("heading", { name: "Задача" })).toBeVisible();

    expect(ukCover).toBe(ruCover);
  });
});
