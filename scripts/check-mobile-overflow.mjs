/** Dev check: no page may be wider than the phone viewport. */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3240";
const paths = [
  "/",
  "/work",
  "/work/crashatlas",
  "/services",
  "/capabilities",
  "/about",
  "/insights",
  "/insights/automation-that-fails-loudly",
  "/contact",
  "/privacy",
  "/en",
  "/en/work/aera",
  "/en/capabilities",
  "/ru",
  "/ru/work/glidex",
  "/ru/services",
  "/nope-404",
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

let bad = 0;
for (const path of paths) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const widest = [...document.querySelectorAll("body *")]
      .map((el) => ({ w: Math.round(el.getBoundingClientRect().width), el }))
      .filter((x) => x.w > window.innerWidth + 1)
      .sort((a, b) => b.w - a.w)[0];
    return {
      innerW: window.innerWidth,
      scrollW: document.documentElement.scrollWidth,
      offender: widest
        ? `${widest.el.tagName}.${String(widest.el.className).slice(0, 70)} = ${widest.w}px`
        : null,
    };
  });
  const ok = m.innerW === 390 && m.scrollW <= 391;
  if (!ok) bad += 1;
  console.log(`${ok ? "ok  " : "FAIL"} ${path.padEnd(42)} innerW=${m.innerW} scrollW=${m.scrollW}${m.offender ? ` <- ${m.offender}` : ""}`);
}

console.log(bad === 0 ? "\nAll pages fit the phone viewport." : `\n${bad} page(s) overflow.`);
await browser.close();
