/**
 * gel-chapitre.mjs — combien de temps le fil gèle quand l'élève CHANGE DE
 * CHAPITRE dans une leçon déjà hydratée, sur un téléphone bon marché
 * (processeur bridé ×6) — les 62 leçons.
 *
 * POURQUOI (2026-09-05, nuit). `gel-lecon.mjs` a montré que le chargement
 * d'une leçon n'a aucune tâche ≥ 1 s. Prolongé d'une flèche, il a trouvé le
 * seul vrai gel de la leçon : le chapitre changeait 0,4 à 3,4 s après l'appui
 * (médiane 1,3 s), en UNE tâche de 0,4 à 2,8 s — 36 leçons au-dessus d'une
 * seconde. Cause : `useAttemptRecorder()` lisait `useChapter()`, donc chaque
 * item de toute la leçon se re-rendait à chaque flèche (HANDOFF §11.21–11.22).
 *
 * CE QU'ON MESURE, par leçon, viewport 390 × 780, processeur bridé ×CPU
 * (défaut 6) : la page est chargée, on attend deux secondes de calme, puis
 * ArrowRight ; on relève le délai jusqu'à ce que `[data-chapter-active]`
 * change vraiment (pas un marqueur posé d'avance), et les tâches longues du
 * geste (nombre, somme, la plus longue) jusqu'au calme suivant.
 *
 * Ce n'est PAS une porte : une mesure de temps dépend de la machine. C'est un
 * instrument de comparaison avant/après, à lancer seul, machine à froid.
 * Il s'arrête (code 2) si une feuille de style répond ≥ 400 (piège n° 4).
 *
 *   BASE=http://127.0.0.1:3911 CPU=6 node scripts/gel-chapitre.mjs [routes…]
 *   (sans routes : les 62 leçons, par `../content`. ⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync, statSync } from "node:fs";

const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const cpu = Number(process.env.CPU ?? 6);

const lecons = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  if (!statSync(d).isDirectory()) continue;
  for (const s of readdirSync(d)) if (existsSync(`${d}/${s}/lesson.md`)) lecons.push(`/notions/${m}/${s}`);
}
const routes = process.argv.slice(2).length ? process.argv.slice(2) : lecons;
if (!process.argv.slice(2).length && lecons.length < 30) {
  console.error(`✗ ${lecons.length} leçon(s) trouvée(s) — lancé depuis le mauvais répertoire ? (il faut web/)`);
  process.exit(2);
}
console.log(`processeur bridé ×${cpu} · ${routes.length} leçon(s) · changement de chapitre après hydratation · ${BASE}`);

async function calme(p) {
  let last = -1, quiet = 0;
  while (quiet < 4) {
    await p.waitForTimeout(500);
    const n = await p.evaluate(() => window.__lt.length);
    if (n === last) quiet++; else { quiet = 0; last = n; }
  }
}

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => {
    window.__lt = [];
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]);
      }).observe({ type: "longtask", buffered: true });
    } catch {}
  });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  let css400 = 0;
  p.on("response", (res) => { if (/\.css(\?|$)/.test(res.url()) && res.status() >= 400) css400++; });
  await p.goto(`${BASE}${r}`, { waitUntil: "networkidle", timeout: 180000 });
  if (css400) {
    console.error(`✗ ${r} : feuille de style en erreur HTTP — serveur périmé ? mesure invalide`);
    process.exit(2);
  }
  await calme(p);
  const nChap = await p.locator("[data-chapter-section]").count();
  if (nChap < 2) {
    console.log(`${r.padEnd(58)} ${String(nChap).padStart(2)} chapitre(s) — pas de transport`);
    await ctx.close();
    continue;
  }
  await p.evaluate(() => { window.__lt = []; });
  await p.locator("body").click({ position: { x: 5, y: 5 } }).catch(() => {});
  const t0 = Date.now();
  await p.keyboard.press("ArrowRight");
  let changeApres = null;
  for (let i = 0; i < 400; i++) {
    const actif = await p.evaluate(
      () => document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "0",
    );
    if (actif !== "0") { changeApres = Date.now() - t0; break; }
    await p.waitForTimeout(25);
  }
  await calme(p);
  const m = await p.evaluate(() => {
    const lt = window.__lt;
    return {
      n: lt.length,
      somme: Math.round(lt.reduce((a, [, d]) => a + d, 0)),
      max: Math.round(Math.max(0, ...lt.map(([, d]) => d))),
      katex: document.querySelectorAll(".katex").length,
      noeuds: document.getElementsByTagName("*").length,
    };
  });
  console.log(
    `${r.padEnd(58)} ${String(nChap).padStart(2)} chapitres ${String(m.katex).padStart(4)} formules ${String(m.noeuds).padStart(6)} nœuds · ` +
    `chapitre changé après ${(changeApres === null ? "—" : changeApres + " ms").padStart(8)} · ` +
    `tâches longues ${String(m.n).padStart(2)}, somme ${String(m.somme).padStart(5)} ms, max ${String(m.max).padStart(5)} ms`,
  );
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
