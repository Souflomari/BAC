/**
 * site-shots.mjs — whole-site breakpoint matrix harness (Google-grade audit)
 *
 * Companion to shots.mjs (which captures deep notion detail: motion beats,
 * figures, checkpoint). This one captures the WHOLE SITE as full pages across
 * the M3 window-size classes × themes, which the adaptive/responsive +
 * cohesion fronts need:
 *
 *   routes:      home (/) · notion (/notions/pc/rlc-serie) · 404 (unknown path)
 *   breakpoints: compact 390 · medium 800 · expanded 1366  (M3 <600 / 600–839 / 840+)
 *   themes:      light · dark
 *
 * → 3 routes × 3 breakpoints × 2 themes = 18 full-page PNGs, plus header
 *   top/scrolled crops on the notion at expanded.
 *
 * Same self-managed-server pattern as shots.mjs. Output under web/<out>/ (git-ignored).
 *   cd web && npm install --no-save playwright-core
 *   npm run build && SERVE_PORT=3300 node scripts/site-shots.mjs --out shots/site
 */

import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const SERVE_PORT = process.env.SERVE_PORT ? Number(process.env.SERVE_PORT) : 3300;
const OUT = arg("out", "shots/site");

const ROUTES = [
  { name: "home", path: "/" },
  { name: "notion", path: "/notions/pc/rlc-serie" },
  { name: "404", path: "/this-page-does-not-exist" },
];
// Heights kept modest so 2× screenshots stay within the image-read size limit
// (very-tall fullPage shots fail to load). We capture the fold + scroll-stops.
const BREAKPOINTS = [
  { name: "compact", width: 390, height: 780 },
  { name: "medium", width: 800, height: 1040 },
  { name: "expanded", width: 1280, height: 860 },
];
// Per-route extra scroll-stops (deviceIndependent y) to show layout reflow below the fold.
const SCROLL_STOPS = {
  home: [820],
  notion: [820, 1900, 3200],
  "404": [],
};

function findChromium() {
  if (process.env.PLAYWRIGHT_CHROMIUM && fs.existsSync(process.env.PLAYWRIGHT_CHROMIUM)) return process.env.PLAYWRIGHT_CHROMIUM;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  for (const d of (fs.readdirSync(root).filter((x) => x.startsWith("chromium-")).sort().reverse())) {
    const p = path.join(root, d, "chrome-linux", "chrome");
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`No Chromium under ${root}`);
}
const outDir = path.resolve(process.cwd(), OUT);
fs.mkdirSync(outDir, { recursive: true });
const shotPath = (n) => path.join(outDir, `${n}.png`);
const settle = (page, ms = 450) => page.waitForTimeout(ms);

function waitForReady(url, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => { res.resume(); resolve(true); });
      req.on("error", () => (Date.now() > deadline ? reject(new Error("server not ready")) : setTimeout(tick, 500)));
    };
    tick();
  });
}

let server = null;
async function startServer() {
  console.log(`[site-shots] starting next start -p ${SERVE_PORT} …`);
  server = spawn("node_modules/.bin/next", ["start", "-p", String(SERVE_PORT)], { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"] });
  server.stdout.on("data", (d) => process.stdout.write(`[next] ${d}`));
  server.stderr.on("data", (d) => process.stdout.write(`[next:err] ${d}`));
  await waitForReady(`http://localhost:${SERVE_PORT}/`);
  console.log(`[site-shots] server ready`);
}
const stopServer = () => { if (server && !server.killed) { try { server.kill("SIGKILL"); } catch {} } };

const exe = findChromium();
await startServer();
const BASE = `http://localhost:${SERVE_PORT}`;
const browser = await chromium.launch({ executablePath: exe });
const shots = [];
try {
  for (const bp of BREAKPOINTS) {
    const context = await browser.newContext({ viewport: { width: bp.width, height: bp.height }, deviceScaleFactor: 2, reducedMotion: "no-preference" });
    const page = await context.newPage();
    for (const route of ROUTES) {
      await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle", timeout: 60000 });
      await settle(page, 700);
      for (const theme of ["light", "dark"]) {
        await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme);
        await page.evaluate(() => window.scrollTo(0, 0));
        await settle(page, 350);
        const base = `${route.name}-${bp.name}-${theme}`;
        // Fold (viewport top) — readable size.
        await page.screenshot({ path: shotPath(`${base}-fold`) });
        shots.push(`${base}-fold`);
        // Scroll-stops to show reflow below the fold.
        for (const [i, y] of (SCROLL_STOPS[route.name] || []).entries()) {
          await page.evaluate((yy) => window.scrollTo(0, yy), y);
          await settle(page, 350);
          await page.screenshot({ path: shotPath(`${base}-s${i + 1}`) });
          shots.push(`${base}-s${i + 1}`);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        // Header top vs scrolled — notion at expanded only (elevation-on-scroll / glass).
        if (route.name === "notion" && bp.name === "expanded") {
          await settle(page, 250);
          await page.screenshot({ path: shotPath(`${base}-header-top`), clip: { x: 0, y: 0, width: bp.width, height: 120 } });
          await page.evaluate(() => window.scrollTo(0, 700));
          await settle(page, 400);
          await page.screenshot({ path: shotPath(`${base}-header-scrolled`), clip: { x: 0, y: 0, width: bp.width, height: 120 } });
          await page.evaluate(() => window.scrollTo(0, 0));
          await settle(page, 250);
        }
      }
    }
    await context.close();
  }
  console.log(`[site-shots] captured ${shots.length} full pages (+ header crops):`);
  for (const s of shots) console.log(`           ${s}.png`);
} finally {
  await browser.close();
  stopServer();
}
