import { expect, test, type Page } from "@playwright/test";

/**
 * The four journeys from the brief, driven against the English locale so the
 * assertions can be read by anyone. Ukrainian is the default locale and is
 * served unprefixed; `locale.spec.ts` covers that routing separately.
 */

const EN = "/en";
const isMobile = (page: Page) => page.viewportSize()!.width < 900;

/** Navigation lives behind a menu on small screens. */
async function navigate(page: Page, label: string | RegExp) {
  if (isMobile(page)) {
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("dialog").getByRole("link", { name: label }).click();
  } else {
    await page.getByRole("navigation", { name: "Main menu" }).getByRole("link", { name: label }).click();
  }
}

test.describe("Scenario 1 — Home → Work → case study", () => {
  test("a visitor can reach a case study and its live build", async ({ page }) => {
    await page.goto(EN);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("digital products");

    await navigate(page, "Work");
    await expect(page).toHaveURL(/\/en\/work$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Fifteen products");

    await page.getByRole("link", { name: /CrashAtlas/ }).first().click();
    await expect(page).toHaveURL(/\/en\/work\/crashatlas$/);

    // The case study must carry the full narrative, not just images.
    for (const heading of ["Challenge", "Solution", "Architecture", "Where it landed"]) {
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    }

    const live = page.getByRole("link", { name: /visit the live site/i });
    await expect(live).toHaveAttribute("href", "https://crashatlas.com/");
    await expect(live).toHaveAttribute("target", "_blank");
  });

  test("the next-project link moves to a different case", async ({ page }) => {
    await page.goto(`${EN}/work/aera`);
    await page.getByRole("link", { name: /read the case/i }).click();
    await expect(page).toHaveURL(/\/en\/work\/(?!aera)[a-z-]+$/);
  });
});

test.describe("Scenario 2 — Home → Services → Contact", () => {
  test("a service can be explored and leads to the contact form", async ({ page }) => {
    await page.goto(EN);
    await navigate(page, "Services");
    await expect(page).toHaveURL(/\/en\/services$/);

    const tab = page.getByRole("tab", { name: "CRM & ERP" });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("system your business actually runs on");

    await page.getByRole("link", { name: /start a project/i }).first().click();
    await expect(page).toHaveURL(/\/en\/contact/);
    await expect(page.getByLabel(/^message/i)).toBeVisible();
  });
});

test.describe("Scenario 3 — Estimator → Contact → Submit", () => {
  test("the estimator hands its answers to the contact form", async ({ page }) => {
    await page.goto(`${EN}/services#estimator`);

    await page.getByRole("button", { name: /^CRM \/ ERP/ }).click();
    await page.getByRole("button", { name: /^An existing product/ }).click();
    await page.getByRole("button", { name: /^Full cycle/ }).click();
    await page.getByRole("button", { name: /^Now/ }).click();

    await expect(page.getByRole("heading", { name: /here is what we heard/i })).toBeVisible();

    await page.getByRole("link", { name: /let's discuss it/i }).click();
    await expect(page).toHaveURL(/\/en\/contact\?/);

    // The brief arrives pre-filled — nothing is retyped.
    await expect(page.getByLabel(/^message/i)).toHaveValue(/We are building: CRM \/ ERP/);

    await page.getByLabel(/^name/i).fill("Dana Meyer");
    await page.getByLabel(/^email/i).fill("dana@example.com");
    await page.getByLabel(/^message/i).fill(
      "We're building a CRM. Existing product, full cycle, starting now. Roughly 40 users.",
    );
    await page.getByRole("button", { name: /send it over/i }).click();

    await expect(page.getByRole("heading", { name: /that landed/i })).toBeVisible({ timeout: 15_000 });
  });

  test("the form refuses incomplete input and says why", async ({ page }) => {
    await page.goto(`${EN}/contact`);
    await page.getByLabel(/^name/i).fill("D");
    await page.getByLabel(/^email/i).fill("not-an-email");
    await page.getByLabel(/^message/i).fill("hi");
    await page.getByRole("button", { name: /send it over/i }).click();

    await expect(page.getByRole("alert").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /that landed/i })).toBeHidden();
  });
});

test.describe("Scenario 4 — Mobile menu → Service → CTA", () => {
  test.skip(({ page }) => !isMobile(page), "mobile navigation only");

  test("the menu opens, navigates, and closes on Escape", async ({ page }) => {
    await page.goto(EN);

    await page.getByRole("button", { name: /open menu/i }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: /open menu/i }).click();
    await dialog.getByRole("link", { name: "Capabilities" }).click();
    await expect(page).toHaveURL(/\/en\/capabilities$/);
    await expect(dialog).toBeHidden();

    await page.getByRole("link", { name: /start a project/i }).first().click();
    await expect(page).toHaveURL(/\/en\/contact/);
  });
});

test.describe("Structure and error handling", () => {
  test("an unknown URL renders the custom 404 with a way out", async ({ page }) => {
    const response = await page.goto(`${EN}/work/this-does-not-exist`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /does not exist|не існує|не существует/i })).toBeVisible();
  });

  test("robots and sitemap are served", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const xml = await sitemap.text();
    expect(xml).toContain("/work/crashatlas");
    expect(xml).toContain("/en/work/crashatlas");
    expect(xml).toContain("/ru/insights/");
  });

  test("every case study page carries unique metadata", async ({ page }) => {
    const slugs = ["aera", "glidex", "oriel"];
    const titles = new Set<string>();
    for (const slug of slugs) {
      await page.goto(`${EN}/work/${slug}`);
      const title = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(title).toContain("Silka");
      expect(description?.length ?? 0).toBeGreaterThan(40);
      titles.add(title);
    }
    expect(titles.size).toBe(slugs.length);
  });
});
