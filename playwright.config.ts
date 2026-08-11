import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3210);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 45_000,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    /*
     * WebKit, not another Chromium phone. Chrome propagates `overflow-x: clip`
     * from body to the viewport and WebKit does not, so layout that pans
     * sideways on a real iPhone measures perfectly clean on Pixel 7.
     */
    { name: "ios", use: { ...devices["iPhone SE"] } },
  ],
  webServer: {
    // Runs against a production build: the thing users actually get.
    command: `npm run build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
