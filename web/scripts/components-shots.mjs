/**
 * components-shots.mjs — close-up crops of the interactive components for the audit.
 * Captures the surfaces that change with each iterate round (checkpoint, embed,
 * masthead, scrolled glass header, a focused primary button), light + dark, so the
 * front-auditors see current component craft. Output under web/<out>/ (git-ignored).
 *   cd web && SERVE_PORT=3310 node scripts/components-shots.mjs --out shots/r1
 */
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const SERVE_PORT = process.env.SERVE_PORT ? Number(process.env.SERVE_PORT) : 3310;
const SLUG = "pc/rlc-serie";
const OUT = arg("out", "shots/r1");
function findChromium() {
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  for (const d of fs.readdirSync(root).filter((x) => x.startsWith("chromium-")).sort().reverse()) {
    const p = path.join(root, d, "chrome-linux", "chrome");
    if (fs.existsSync(p)) return p;
  }
  throw new Error("no chromium");
}
function waitReady(url, t = 45000) {
  const dl = Date.now() + t;
  return new Promise((res, rej) => { const tick = () => { const r = http.get(url, (x) => { x.resume(); res(true); }); r.on("error", () => (Date.now() > dl ? rej(new Error("timeout")) : setTimeout(tick, 500))); }; tick(); });
}
const outDir = path.resolve(process.cwd(), OUT);
fs.mkdirSync(outDir, { recursive: true });
const P = (n) => path.join(outDir, `${n}.png`);
const settle = (page, ms = 400) => page.waitForTimeout(ms);

const server = spawn("node_modules/.bin/next", ["start", "-p", String(SERVE_PORT)], { cwd: process.cwd(), stdio: ["ignore", "ignore", "ignore"] });
const BASE = `http://localhost:${SERVE_PORT}`;
await waitReady(`${BASE}/notions/${SLUG}`);
const browser = await chromium.launch({ executablePath: findChromium() });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const shots = [];
async function clip(name, sel, pad = 0) {
  try {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded(); await settle(page, 350);
    if (pad) { const b = await el.boundingBox(); if (b) { await page.screenshot({ path: P(name), clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); shots.push(name); return; } }
    await el.screenshot({ path: P(name) }); shots.push(name);
  } catch (e) { console.log("skip", name, e.message); }
}
try {
  for (const theme of ["light", "dark"]) {
    await page.goto(`${BASE}/notions/${SLUG}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme);
    await page.evaluate(() => window.scrollTo(0, 0)); await settle(page, 500);
    await page.screenshot({ path: P(`masthead-${theme}`), clip: { x: 0, y: 0, width: 1280, height: 640 } }); shots.push(`masthead-${theme}`);
    await clip(`checkpoint-${theme}`, 'div[aria-label="Vérifie ta compréhension"]');
    await clip(`embed-${theme}`, 'div.notion-wide-band:has(button:has-text("bac à sable"))');
    // scrolled glass header
    await page.evaluate(() => window.scrollTo(0, 700)); await settle(page, 450);
    await page.screenshot({ path: P(`header-glass-${theme}`), clip: { x: 0, y: 0, width: 1280, height: 130 } }); shots.push(`header-glass-${theme}`);
  }
  // focus halo on the primary button (light)
  await page.goto(`${BASE}/notions/${SLUG}`, { waitUntil: "networkidle", timeout: 60000 }); await settle(page, 400);
  const btn = page.locator('button:has-text("bac à sable")').first();
  await btn.scrollIntoViewIfNeeded(); await settle(page, 300); await btn.focus(); await settle(page, 200);
  const b = await btn.boundingBox();
  if (b) { await page.screenshot({ path: P("focus-primary"), clip: { x: Math.max(0, b.x - 26), y: Math.max(0, b.y - 26), width: b.width + 52, height: b.height + 52 } }); shots.push("focus-primary"); }
  console.log(`[components-shots] captured ${shots.length}: ${shots.join(", ")}`);
} finally { await browser.close(); server.kill("SIGKILL"); }
