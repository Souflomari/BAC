/**
 * shots.mjs — notion screenshot harness
 *
 * Boots nothing itself; it drives a server you already have running
 * (`npm run build && npm run start`) and captures the notion in the states the
 * visual critics + verification need:
 *   • full page, light + dark, desktop + mobile
 *   • every BEAT of every motion clip (clicks "Suivant" through each clip and
 *     shoots after each beat settles) — this is how we prove REAL motion and
 *     zero overlap at every beat
 *   • header at top vs scrolled (elevation-on-scroll)
 *   • a checkpoint before/after answering
 *
 * Playwright is NOT a project dependency (it would bloat the app bundle's
 * lockfile intent). Install it transiently before a screenshot session and
 * remove it before committing:
 *     cd web && npm install --no-save playwright-core
 *     node scripts/shots.mjs            # uses the pre-installed Chromium
 *     npm install                       # prunes playwright-core back out
 * Chromium ships in the environment at $PLAYWRIGHT_BROWSERS_PATH; we never
 * download a browser.
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 node scripts/shots.mjs
 *   node scripts/shots.mjs --slug pc/rlc-serie --out shots
 *
 * Output: PNGs under web/<out>/ (default web/shots/, git-ignored).
 */

import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

// ── Config ───────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function arg(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
}
const BASE_URL = process.env.BASE_URL || arg("base", "http://localhost:3000");
const SLUG = arg("slug", "pc/rlc-serie");
const OUT = arg("out", "shots");
const URL = `${BASE_URL}/notions/${SLUG}`;

const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 390, height: 844 },
};

// ── Locate the pre-installed Chromium (no download) ──────────────────────────
function findChromium() {
  if (process.env.PLAYWRIGHT_CHROMIUM && fs.existsSync(process.env.PLAYWRIGHT_CHROMIUM)) {
    return process.env.PLAYWRIGHT_CHROMIUM;
  }
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  let dirs = [];
  try {
    dirs = fs.readdirSync(root).filter((d) => d.startsWith("chromium-"));
  } catch {
    /* fall through */
  }
  for (const d of dirs.sort().reverse()) {
    const p = path.join(root, d, "chrome-linux", "chrome");
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    `Could not find Chromium under ${root}. Set PLAYWRIGHT_CHROMIUM to the chrome binary.`
  );
}

const outDir = path.resolve(process.cwd(), OUT);
fs.mkdirSync(outDir, { recursive: true });

function shotPath(name) {
  return path.join(outDir, `${name}.png`);
}

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    document.documentElement.classList.toggle("dark", t === "dark");
  }, theme);
}

async function settle(page, ms = 450) {
  await page.waitForTimeout(ms);
}

// ── Main ─────────────────────────────────────────────────────────────────────
const exe = findChromium();
console.log(`[shots] chromium: ${exe}`);
console.log(`[shots] target:   ${URL}`);
console.log(`[shots] out:      ${outDir}`);

const browser = await chromium.launch({ executablePath: exe });
const shots = [];

try {
  for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await settle(page, 800);

    for (const theme of ["light", "dark"]) {
      await setTheme(page, theme);
      await settle(page, 300);

      // 1. Full page
      await page.evaluate(() => window.scrollTo(0, 0));
      await settle(page);
      const full = `${vpName}-${theme}-full`;
      await page.screenshot({ path: shotPath(full), fullPage: true });
      shots.push(full);

      // 2. Header at top vs scrolled (desktop only — the elevation-on-scroll)
      if (vpName === "desktop") {
        const headTop = `${vpName}-${theme}-header-top`;
        await page.screenshot({ path: shotPath(headTop), clip: { x: 0, y: 0, width: viewport.width, height: 120 } });
        shots.push(headTop);
        await page.evaluate(() => window.scrollTo(0, 600));
        await settle(page);
        const headScroll = `${vpName}-${theme}-header-scrolled`;
        await page.screenshot({ path: shotPath(headScroll), clip: { x: 0, y: 0, width: viewport.width, height: 120 } });
        shots.push(headScroll);
        await page.evaluate(() => window.scrollTo(0, 0));
        await settle(page);
      }

      // 3. Every beat of every motion clip (desktop light is the canonical pass;
      //    we also do desktop dark to check parity).
      if (vpName === "desktop") {
        const figures = page.locator('figure:has([role="group"])');
        const count = await figures.count();
        for (let f = 0; f < count; f++) {
          const fig = figures.nth(f);
          await fig.scrollIntoViewIfNeeded();
          await settle(page, 250);
          // The "Suivant" button (becomes "Recommencer" at the last beat).
          const next = fig.locator('button[aria-label="Étape suivante"], button[aria-label="Recommencer depuis l\'étape 1"]');
          const indicator = fig.locator('[aria-live="polite"].tabular-nums').first();
          let label = "clip";
          try {
            const al = await fig.getAttribute("aria-label");
            if (al) label = al.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40).toLowerCase();
          } catch { /* keep default */ }

          // Step through up to 8 beats (guard against runaway).
          for (let beat = 0; beat < 8; beat++) {
            await settle(page, 300);
            const name = `clip-${f}-${label}-${theme}-beat-${beat}`;
            await fig.screenshot({ path: shotPath(name) });
            shots.push(name);
            // Read the indicator "Étape X / N"; stop after the last beat.
            let txt = "";
            try { txt = (await indicator.textContent()) || ""; } catch { /* */ }
            const m = txt.match(/(\d+)\s*\/\s*(\d+)/);
            if (m && parseInt(m[1], 10) >= parseInt(m[2], 10)) break;
            // Advance.
            try {
              await next.click({ timeout: 2000 });
            } catch {
              break; // no advance control (legacy/static) — one shot is enough
            }
          }
        }
      }
    }
    await context.close();
  }

  console.log(`[shots] captured ${shots.length} screenshots:`);
  for (const s of shots) console.log(`         ${s}.png`);
} finally {
  await browser.close();
}
