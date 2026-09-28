/**
 * wide-measure.mjs — Day-8 void measurement at 1920px (the owner's monitor
 * class). Produces the BEFORE numbers the fix is judged against (ledger) and
 * the before-shots. Throwaway after the batch? NO — kept: re-run after the
 * owner's picks to produce the AFTER row of the same table.
 *
 * Measures, per theme, on the notion page:
 *   - band occupancy: title-block area / band area (the owner's top circles)
 *   - right margin beside prose: viewport right edge ← content column right
 *   - left gutter: viewport left edge → container left (the tall left circle)
 *   - rail-to-spine geometry: rail left/right vs container/prose edges
 * And on home + 404: container margins + widest content element.
 *
 * AMENDEMENT DU 2026-09-20 (la passe APRÈS, celle que cet en-tête réclamait
 * depuis juillet). Deux clés ont été AJOUTÉES, et la raison est la même que
 * celle de l'ADR 0033 : `bandVoidRightPx` répondait exactement à une question
 * plus étroite que son nom ne le laisse lire — « distance entre la droite du
 * bloc-titre et la droite de la bande ». En juillet cette distance ÉTAIT du
 * vide. Depuis le 2026-09-04, M1 est en production et y pose la couverture de
 * la notion (piste de 400px + gouttière, au-delà de bp-large = 1200px) : la
 * même formule, inchangée, appelle « vide » une région OCCUPÉE.
 *
 * L'ancienne clé est GARDÉE telle quelle — c'est elle qui rend la ligne AVANT
 * et la ligne APRÈS comparables ; la réécrire aurait effacé le point de
 * comparaison. Les deux nouvelles disent ce qu'elle ne sait plus dire :
 *   • `cover` — la boîte réellement peinte dans la région droite (null si
 *     absente : sous bp-large, ou si M1 était retiré).
 *   • `bandFreeRightPx` — le vide VRAI : bord droit de la bande moins le bord
 *     droit de ce qui est le plus à droite (titre OU couverture).
 *   • `bandOccupancyWithCoverPct` — l'occupation quand on compte la
 *     couverture, qui est du contenu et non du remplissage.
 */
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";

const PORT = 3200 + (process.pid % 500);
const BASE = `http://localhost:${PORT}`;
const OUT = "shots/day8-wide";
fs.mkdirSync(OUT, { recursive: true });
//  `--apres` : la passe d'APRÈS écrit sous son propre nom. Sans ce drapeau,
//  un ré-lancement écrasait `before-*.png` et `measurements.json` — l'outil
//  fait pour produire une comparaison détruisait son propre terme de
//  comparaison. (La copie de juillet a survécu par accident : `report/` est
//  la seule exception au .gitignore du dossier.)
const APRES = process.argv.includes("--apres");
const PREFIXE = APRES ? "after" : "before";
const FICHIER = APRES ? "measurements-apres.json" : "measurements.json";

const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: process.cwd(), stdio: "ignore", detached: true,
});
function waitReady(url, tries = 60) {
  return new Promise((res, rej) => {
    const t = (n) => http.get(url, (r) => { r.resume(); res(); })
      .on("error", () => n > 0 ? setTimeout(() => t(n - 1), 500) : rej(new Error("timeout")));
    t(tries);
  });
}

try {
  await waitReady(BASE);
  const browser = await chromium.launch({
    //  Le binaire du conteneur dérive (build 1194 vs 1228 attendu par
    //  playwright-core 1.61) : laisser l'environnement le désigner.
    executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
  const results = {};

  for (const theme of ["light", "dark"]) {
    // Theme via the real user path (persisted boot choice).
    await page.goto(`${BASE}/notions/pc/rlc-serie`, { waitUntil: "networkidle" });
    await page.evaluate((t) => localStorage.setItem("bac-theme", t), theme);
    await page.reload({ waitUntil: "networkidle" });

    results[`notion-${theme}`] = await page.evaluate(() => {
      const vw = window.innerWidth;
      const band = document.querySelector("[data-band='masthead']");
      const bandR = band.getBoundingClientRect();
      // Title block = breadcrumb + h1 + meta (the band's inner div)
      const inner = band.querySelector("h1").closest("header");
      const crumb = band.querySelector("nav");
      const meta = band.querySelector("header p");
      const l = Math.min(inner.getBoundingClientRect().left, crumb.getBoundingClientRect().left);
      const r = Math.max(
        band.querySelector("h1").getBoundingClientRect().right,
        crumb.getBoundingClientRect().right,
        meta ? meta.getBoundingClientRect().right : 0
      );
      const top = crumb.getBoundingClientRect().top;
      const bot = inner.getBoundingClientRect().bottom;
      const titleArea = (r - l) * (bot - top);
      const bandArea = bandR.width * bandR.height;

      //  La couverture M1 : une cellule de grille à part, en aria-hidden,
      //  rendue seulement au-delà de bp-large. C'est elle qui occupe depuis
      //  le 2026-09-04 ce que l'ancienne clé continue d'appeler « vide ».
      const coverEl = band.querySelector("[aria-hidden='true'] svg");
      const coverR = coverEl ? coverEl.getBoundingClientRect() : null;

      const main = document.querySelector("main");
      const mainR = main.getBoundingClientRect();
      const rail = document.querySelector(".notion-rail");
      const railR = rail ? rail.getBoundingClientRect() : null;
      const prose = document.querySelector(".notion-prose");
      const proseR = prose.getBoundingClientRect();
      const content = document.querySelector(".notion-content");
      const contentR = content.getBoundingClientRect();

      return {
        viewport: vw,
        bandOccupancyPct: +(100 * titleArea / bandArea).toFixed(1),
        bandTitleBlock: { w: Math.round(r - l), h: Math.round(bot - top) },
        band: { w: Math.round(bandR.width), h: Math.round(bandR.height) },
        bandOccupancyWithCoverPct: +(100 * (titleArea + (coverR ? coverR.width * coverR.height : 0)) / bandArea).toFixed(1),
        bandVoidRightPx: Math.round(bandR.right - r),
        bandVoidLeftPx: Math.round(l - bandR.left),
        cover: coverR
          ? { left: Math.round(coverR.left), right: Math.round(coverR.right), w: Math.round(coverR.width), h: Math.round(coverR.height) }
          : null,
        bandFreeRightPx: Math.round(bandR.right - Math.max(r, coverR ? coverR.right : 0)),
        leftGutterPx: Math.round(mainR.left),
        rightMarginPx: Math.round(vw - contentR.right),
        rightOfProsePx: Math.round(vw - proseR.right),
        rail: railR ? { left: Math.round(railR.left), w: Math.round(railR.width) } : null,
        prose: { left: Math.round(proseR.left), w: Math.round(proseR.width) },
        content: { left: Math.round(contentR.left), w: Math.round(contentR.width) },
      };
    });
    await page.screenshot({ path: `${OUT}/${PREFIXE}-notion-1920-${theme}.png` });

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    results[`home-${theme}`] = await page.evaluate(() => {
      const vw = window.innerWidth;
      const main = document.querySelector("main");
      const m = main.getBoundingClientRect();
      const card = document.querySelector("section[aria-label='La session du jour'] > div");
      const c = card ? card.getBoundingClientRect() : null;
      return {
        leftGutterPx: Math.round(m.left),
        rightGutterPx: Math.round(vw - m.right),
        mainW: Math.round(m.width),
        sessionCard: c ? { w: Math.round(c.width), rightVoidPx: Math.round(m.right - c.right) } : null,
      };
    });
    await page.screenshot({ path: `${OUT}/${PREFIXE}-home-1920-${theme}.png` });

    await page.goto(`${BASE}/nonexistent-xyz`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${OUT}/${PREFIXE}-404-1920-${theme}.png` });
    await page.evaluate(() => localStorage.removeItem("bac-theme"));
  }

  fs.writeFileSync(`${OUT}/${FICHIER}`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
} finally {
  try { process.kill(-server.pid, "SIGTERM"); } catch { server.kill(); }
}
