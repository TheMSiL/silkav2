/**
 * Captures reference screenshots of the live projects into public/work/<slug>/.
 *
 * Run:  node scripts/capture-work.mjs [slug ...]
 *
 * Output is committed to the repo so builds never depend on the remote sites
 * being up. Re-run when a project ships a visual change.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** scrollTo offsets (in viewport heights) captured for the desktop gallery. */
const targets = [
  { slug: "aera", url: "https://aera-phi.vercel.app/", shots: [0, 1.1, 2.4, 3.6] },
  { slug: "tvorivo", url: "https://tvorivo.vercel.app/", shots: [0, 1.1, 2.2, 3.2] },
  { slug: "ra-agency", url: "https://raagency.tech/en", shots: [0, 1.2, 2.4, 3.6] },
  {
    slug: "crashatlas",
    url: "https://crashatlas.com/",
    wait: 7000,
    // The map does not scroll, so the gallery walks the archive dimensions instead.
    pages: [
      "https://crashatlas.com/",
      "https://crashatlas.com/crashes/country",
      "https://crashatlas.com/statistics",
      "https://crashatlas.com/crashes/aircraft",
    ],
  },
  { slug: "litha", url: "https://litha.vercel.app/", shots: [0, 1.2, 2.4, 3.4] },
  { slug: "kovalov-partners", url: "https://kovalev-mu.vercel.app/", shots: [0, 1.1, 2.2, 3.2] },
  { slug: "elara-dental", url: "https://clinic-elara.vercel.app/", shots: [0, 1.1, 2.2, 3.2] },
  { slug: "aureon", url: "https://aureon-two-eta.vercel.app/", shots: [0, 1.1, 2.2, 3.2] },
  { slug: "axion", url: "https://axion-six-bay.vercel.app/", shots: [0, 1.1, 2.2, 3.2] },
  { slug: "oriel", url: "https://oriel-peach.vercel.app/", shots: [0, 1.2, 2.3, 3.3] },
  { slug: "glidex", url: "https://glidex-theta.vercel.app/ua", shots: [0, 1.2, 2.3, 3.3] },
  { slug: "pelagion", url: "https://deep-chi-six.vercel.app/", shots: [0, 1.2, 2.3, 3.3] },
];

const only = process.argv.slice(2);
const queue = only.length ? targets.filter((t) => only.includes(t.slug)) : targets;

/** Consent banners are chrome, not product. Dismiss them before capturing. */
const CONSENT_LABELS = [
  "Accept all",
  "Accept All",
  "Прийняти все",
  "Прийняти всі",
  "Прийняти",
  "Погоджуюсь",
  "Дозволити всі",
  "Allow all",
  "Got it",
];

const dismissConsent = async (page) => {
  for (const label of CONSENT_LABELS) {
    const button = page.getByRole("button", { name: label, exact: false }).first();
    try {
      if (await button.isVisible({ timeout: 400 })) {
        await button.click({ timeout: 1500 });
        await page.waitForTimeout(600);
        return;
      }
    } catch {
      /* banner not present in this language — keep looking */
    }
  }
};

/** Empty ad slots are noise in a portfolio shot, not part of the interface. */
const hideAdSlots = async (page) => {
  await page.evaluate(() => {
    const isAdLabel = (el) => {
      const text = (el.textContent ?? "").trim();
      return text === "Advertisement" || text === "Remove ads";
    };
    for (const el of Array.from(document.querySelectorAll("div, aside, section"))) {
      if (isAdLabel(el)) {
        const slot = el.closest("aside, div, section");
        if (slot instanceof HTMLElement) slot.style.visibility = "hidden";
      }
    }
  });
};

const settle = async (page, ms) => {
  await page.waitForTimeout(ms);
  await dismissConsent(page);
  await hideAdSlots(page);
  // Freeze animations so repeated runs produce stable images.
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-play-state:paused!important;transition:none!important}`,
  });
};

const browser = await chromium.launch();

for (const target of queue) {
  const dir = path.join("public", "work", target.slug);
  await mkdir(dir, { recursive: true });

  const context = await browser.newContext({
    viewport: DESKTOP,
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    colorScheme: "dark",
  });
  const page = await context.newPage();

  try {
    await page.goto(target.url, { waitUntil: "networkidle", timeout: 60000 });
  } catch {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }
  await settle(page, target.wait ?? 2500);

  const frames = target.pages ?? target.shots.map((factor) => ({ factor }));

  for (const [i, frame] of frames.entries()) {
    if (typeof frame === "string") {
      if (i > 0) {
        await page.goto(frame, { waitUntil: "domcontentloaded", timeout: 60000 });
        await settle(page, target.wait ?? 2500);
      }
    } else {
      await page.evaluate((f) => window.scrollTo(0, window.innerHeight * f), frame.factor);
      await page.waitForTimeout(1200);
    }
    const name = i === 0 ? "cover" : String(i).padStart(2, "0");
    await page.screenshot({ path: path.join(dir, `${name}.jpg`), quality: 94, type: "jpeg" });
    process.stdout.write(`  ${target.slug}/${name}.jpg\n`);
  }

  await context.close();

  const mobileContext = await browser.newContext({
    viewport: MOBILE,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const mobilePage = await mobileContext.newPage();
  try {
    await mobilePage.goto(target.url, { waitUntil: "networkidle", timeout: 60000 });
  } catch {
    await mobilePage.goto(target.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }
  await settle(mobilePage, target.wait ?? 2500);
  await mobilePage.screenshot({
    path: path.join(dir, "mobile.jpg"),
    quality: 94,
    type: "jpeg",
  });
  process.stdout.write(`  ${target.slug}/mobile.jpg\n`);
  await mobileContext.close();
}

await browser.close();
process.stdout.write("done\n");
