/** Dev-time visual check. Not part of the build. */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3117";
const OUT = process.env.OUT ?? "../../AppData/Local/Temp/claude/shots";

const shots = process.argv.slice(2);
const targets = shots.length
  ? shots.map((s) => {
      const [name, url, y] = s.split("|");
      return { name, url, y: Number(y ?? 0) };
    })
  : [{ name: "home", url: "/", y: 0 }];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.on("console", (m) => {
  if (m.type() === "error") console.log("  console error:", m.text().slice(0, 200));
});
page.on("pageerror", (e) => console.log("  PAGE ERROR:", e.message.slice(0, 300)));

for (const target of targets) {
  await page.goto(BASE + target.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  if (target.y) {
    await page.evaluate((y) => window.scrollTo(0, y), target.y);
    await page.waitForTimeout(1400);
  }
  const file = path.join(OUT, `${target.name}.jpg`);
  await page.screenshot({ path: file, quality: 78, type: "jpeg" });
  console.log("shot", file);
}

await browser.close();
