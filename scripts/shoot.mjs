/** Dev-time visual check. Not part of the build. */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3117";
const OUT = process.env.OUT ?? "../../AppData/Local/Temp/claude/shots";
/* Viewport, so the same call can check 390 and 1440 without editing this. */
const VW = Number(process.env.VW ?? 1440);
const VH = Number(process.env.VH ?? 900);

const shots = process.argv.slice(2);
const targets = shots.length
  ? shots.map((s) => {
      const [name, url, y] = s.split("|");
      return { name, url, y: Number(y ?? 0) };
    })
  : [{ name: "home", url: "/", y: 0 }];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: VW, height: VH },
  deviceScaleFactor: 1,
  isMobile: VW < 800,
  hasTouch: VW < 800,
});
const page = await context.newPage();
page.on("console", (m) => {
  if (m.type() === "error") console.log("  console error:", m.text().slice(0, 200));
});
page.on("pageerror", (e) => console.log("  PAGE ERROR:", e.message.slice(0, 300)));

for (const target of targets) {
  await page.goto(BASE + target.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);

  /* Sideways pan is the phone regression that keeps coming back, and it is
     invisible in a screenshot — so it is measured, at every scroll depth. */
  const panned = await page.evaluate(async () => {
    let worst = 0;
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      window.scrollTo(4000, y);
      worst = Math.max(worst, window.scrollX);
      window.scrollTo(0, y);
    }
    return worst;
  });
  if (panned) console.log(`  PANS SIDEWAYS by ${panned}px at ${VW}px wide`);

  /* Always, including y=0 — the pan check above leaves the page at the bottom. */
  await page.evaluate((y) => window.scrollTo(0, y), target.y);
  await page.waitForTimeout(1400);
  const file = path.join(OUT, `${target.name}.jpg`);
  await page.screenshot({ path: file, quality: 78, type: "jpeg" });
  console.log("shot", file);
}

await browser.close();
