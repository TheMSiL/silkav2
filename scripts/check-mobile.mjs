/**
 * Mobile regression sweep, run against a built site in WebKit.
 *
 * WebKit is not optional here. Chrome's device emulation propagates
 * `overflow-x: clip` from body to the viewport and WebKit does not, so a page
 * that pans sideways on a real iPhone measures perfectly clean in Chrome. Every
 * check below is one that Chrome emulation reported as passing while the phone
 * did not.
 *
 *   node scripts/check-mobile.mjs [baseUrl]
 */
import { devices, webkit } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const routes = ["/", "/work", "/work/aera", "/services", "/about", "/contact", "/insights"];

const failures = [];
const note = (message) => failures.push(message);

const browser = await webkit.launch();

for (const device of ["iPhone SE", "iPhone 13"]) {
  const context = await browser.newContext(devices[device]);
  const page = await context.newPage();

  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForTimeout(600);

    // 1. The page must not pan horizontally, at any scroll depth.
    const pan = await page.evaluate(async () => {
      let worst = 0;
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => requestAnimationFrame(resolve));
        window.scrollTo(4000, y);
        worst = Math.max(worst, window.scrollX);
        window.scrollTo(0, y);
      }
      window.scrollTo(0, 0);
      return worst;
    });
    if (pan > 0) note(`${device} ${route}: page pans ${pan}px horizontally`);

    // 2. Every form control must clear 16px, or iOS zooms the page on focus.
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("input, select, textarea")]
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16)
        .map((el) => `${el.tagName}[${el.getAttribute("name") ?? "?"}]`),
    );
    if (small.length > 0) note(`${device} ${route}: controls under 16px — ${small.join(", ")}`);
  }

  await context.close();
}

// 3. The hero must be readable without JavaScript, and under reduced motion.
for (const reducedMotion of ["reduce", "no-preference"]) {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({
      ...devices["iPhone SE"],
      reducedMotion,
      javaScriptEnabled,
    });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });
    const heading = page.locator("h1").first();
    const height = (await heading.boundingBox())?.height ?? 0;
    const opaque = await heading.evaluate((el) => {
      const word = el.querySelector("span span span") ?? el;
      return getComputedStyle(word).opacity === "1";
    });
    const label = `hero (motion=${reducedMotion}, js=${javaScriptEnabled})`;
    if (height < 20) note(`${label}: heading has no height`);
    if (!opaque) note(`${label}: heading is transparent`);
    await context.close();
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(`✗ ${failures.length} mobile issue(s):`);
  for (const failure of failures) console.error(`  · ${failure}`);
  process.exit(1);
}
console.log("✓ mobile checks passed");
