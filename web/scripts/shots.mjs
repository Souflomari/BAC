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
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

// ── Config ───────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function arg(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
}
// SERVE_PORT (env) → the harness spawns its own `next start` on that port,
// waits for readiness, and kills it on exit. This is the reliable path in the
// sandbox (where pkill/ps are restricted and a bash-backgrounded server dies
// silently): the server is OUR child, so we can manage and kill it.
const SERVE_PORT = process.env.SERVE_PORT ? Number(process.env.SERVE_PORT) : null;
let BASE_URL = process.env.BASE_URL || arg("base", "http://localhost:3000");
const SLUG = arg("slug", "pc/rlc-serie");
const OUT = arg("out", "shots");

// LESSON-EXPERIENCE-SPEC §5 / item 4 de l'ordre de travail post-Fable.
// Trois paliers de bureau, parce que trois choses différentes s'y jouent :
//   · 1280 — la largeur de référence des critiques visuelles ;
//   · 1536 — le palier où la spec plaçait la zone « à retenir » (elle vit en
//     fait à bp-xl/1600 : « bp-wide » n'existe pas dans tokens.ts, voir
//     l'ordre de travail item 1) ; c'est donc le palier JUSTE EN DESSOUS de
//     la zone, et il vaut d'être vu pour ça ;
//   · 1920 — l'écran du propriétaire, celui où les zones mortes se voient.
const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  wide: { width: 1536, height: 960 },
  ultra: { width: 1920, height: 1080 },
  mobile: { width: 390, height: 844 },
};

// Les captures lourdes (header, clips image par image, figures statiques)
// tournaient sur le seul « desktop ». Elles couvrent maintenant les trois
// paliers de bureau : c'est le même contenu, mais la composition change avec
// la largeur — et c'est justement la composition qu'on regarde.
const PALIERS_BUREAU = new Set(["desktop", "wide", "ultra"]);

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

// ── Optional self-managed server ─────────────────────────────────────────────
function waitForReady(url, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve(true);
      });
      req.on("error", () => {
        if (Date.now() > deadline) reject(new Error("server not ready in time"));
        else setTimeout(tick, 500);
      });
    };
    tick();
  });
}

let server = null;
async function startServer() {
  if (!SERVE_PORT) return;
  console.log(`[shots] starting next start -p ${SERVE_PORT} …`);
  server = spawn("node_modules/.bin/next", ["start", "-p", String(SERVE_PORT)], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (d) => process.stdout.write(`[next] ${d}`));
  server.stderr.on("data", (d) => process.stdout.write(`[next:err] ${d}`));
  BASE_URL = `http://localhost:${SERVE_PORT}`;
  await waitForReady(`${BASE_URL}/notions/${SLUG}`);
  console.log(`[shots] server ready at ${BASE_URL}`);
}
function stopServer() {
  if (server && !server.killed) {
    try { server.kill("SIGKILL"); } catch { /* ignore */ }
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
const exe = findChromium();
await startServer();
// Recompute URL in case the server overrode BASE_URL.
const TARGET = `${BASE_URL}/notions/${SLUG}`;
console.log(`[shots] chromium: ${exe}`);
console.log(`[shots] target:   ${TARGET}`);
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
    await page.goto(TARGET, { waitUntil: "networkidle", timeout: 60000 });
    await settle(page, 800);

    for (const theme of ["light", "dark"]) {
      // Recharger à chaque thème : les passes « figures » ci-dessous
      // DÉPLIENT tous les chapitres, et sans rechargement la capture pleine
      // page du thème suivant montrerait la leçon entière au lieu du
      // chapitre courant.
      await page.goto(TARGET, { waitUntil: "networkidle", timeout: 60000 });
      await setTheme(page, theme);
      await settle(page, 300);

      // 1. Full page
      await page.evaluate(() => window.scrollTo(0, 0));
      await settle(page);
      const full = `${vpName}-${theme}-full`;
      await page.screenshot({ path: shotPath(full), fullPage: true });
      shots.push(full);

      // 2. Header at top vs scrolled (desktop only — the elevation-on-scroll)
      if (PALIERS_BUREAU.has(vpName)) {
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
      if (PALIERS_BUREAU.has(vpName)) {
        // DÉPLIER TOUS LES CHAPITRES avant de photographier les figures.
        //
        // Depuis la pagination (Day-11), neuf figures sur dix vivent dans un
        // `<section hidden>` : `scrollIntoViewIfNeeded` y attend un élément
        // qui ne deviendra jamais visible, et la passe entière mourait sur
        // un TimeoutError — le harnais était cassé depuis, sans que rien ne
        // le dise. Les captures de figures sont des captures d'ÉLÉMENT : la
        // composition de la page autour n'entre pas dans l'image, donc
        // déplier ne fausse rien. La page est rechargée au thème suivant.
        await page.evaluate(() =>
          document
            .querySelectorAll("[data-chapter-section]")
            .forEach((s) => (s.hidden = false))
        );
        await settle(page, 200);
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
            // Long enough for a 0.6–0.9s draw/trace to fully settle before the shot.
            await settle(page, 1300);
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

        // 4. Each STATIC figure (a <figure aria-label> WITHOUT a controls group):
        //    rlc-schema, regimes-uc, origin-*, checkpoints. One shot each.
        const statics = page.locator('figure[aria-label]:not(:has([role="group"]))');
        const sc = await statics.count();
        for (let s = 0; s < sc; s++) {
          const f2 = statics.nth(s);
          await f2.scrollIntoViewIfNeeded();
          await settle(page, 200);
          let label = `fig-${s}`;
          try {
            const al = await f2.getAttribute("aria-label");
            if (al) label = al.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40).toLowerCase();
          } catch { /* keep default */ }
          const name = `static-${s}-${label}-${theme}`;
          try { await f2.screenshot({ path: shotPath(name) }); shots.push(name); } catch { /* skip unrenderable */ }
        }
      }
    }
    // 5. UN SHOT PAR CHAPITRE (item 4). La leçon est paginée : une capture de
    //    la page ne montre qu'un dixième d'elle-même. On parcourt les
    //    chapitres par `?chapitre=n` — le lien profond, pas un clic — pour
    //    que la série soit reproductible et que chaque image porte son
    //    numéro. Thème clair seulement : doubler la série en sombre
    //    quadruplerait la sortie sans rien montrer que le plein-page sombre
    //    ne montre déjà.
    if (PALIERS_BUREAU.has(vpName)) {
      await setTheme(page, "light");
      const total = await page.evaluate(
        () => document.querySelectorAll("[data-chapter-section]").length
      );
      for (let n = 1; n <= total; n++) {
        await page.goto(`${TARGET}${TARGET.includes("?") ? "&" : "?"}chapitre=${n}`, {
          waitUntil: "networkidle",
          timeout: 60000,
        });
        // Le bon chapitre n'est actif qu'APRÈS hydratation : le HTML statique
        // ne connaît pas la query string et rend toujours le chapitre 1
        // (ChapterShell, note de tête). Attendre l'attribut, pas un délai.
        try {
          await page.waitForFunction(
            (k) =>
              document
                .querySelector(`[data-chapter-section][data-chapter-index="${k}"]`)
                ?.getAttribute("data-chapter-active") === "true",
            n - 1,
            { timeout: 15000 }
          );
        } catch { /* la capture dira ce qui s'est passé */ }
        await settle(page, 300);
        const nom = `${vpName}-light-chapitre-${String(n).padStart(2, "0")}`;
        await page.screenshot({ path: shotPath(nom), fullPage: true });
        shots.push(nom);
      }
    }

    await context.close();
  }

  console.log(`[shots] captured ${shots.length} screenshots:`);
  for (const s of shots) console.log(`         ${s}.png`);
} finally {
  await browser.close();
  stopServer();
}
