import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3001";
const OUT =
  process.env.OUT ??
  "C:/Users/MSiL/AppData/Local/Temp/claude/c--Users-MSiL-Desktop-studio/bd854acc-5a96-4de5-92ca-8ee12b0f442a/scratchpad/shots";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message.slice(0, 200)));

await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Final CTA button — reported as rendering empty.
const cta = page.locator("section", { hasText: "Have a complex idea?" }).last();
await cta.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);

const info = await page.evaluate(() => {
  const link = [...document.querySelectorAll("a")].find(
    (a) => /start a project/i.test(a.textContent ?? "") && a.closest("section")?.textContent?.includes("complex idea"),
  );
  if (!link) return { found: false };
  const cs = getComputedStyle(link);
  const span = link.querySelector("span");
  return {
    found: true,
    text: link.textContent,
    color: cs.color,
    background: cs.backgroundColor,
    fontSize: cs.fontSize,
    rect: link.getBoundingClientRect().toJSON(),
    childCount: link.children.length,
    childHTML: link.innerHTML.slice(0, 300),
    spanColor: span ? getComputedStyle(span).color : null,
  };
});
console.log(JSON.stringify(info, null, 1));

await page.locator("section", { hasText: "Have a complex idea?" }).last().screenshot({ path: `${OUT}/cta.png` });

// Header CTA under hover — reported as doubled text.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
const header = page.locator("header a", { hasText: "Start a project" });
await header.hover();
await page.waitForTimeout(900);
await page.locator("header").screenshot({ path: `${OUT}/header-hover.png` });

await browser.close();
