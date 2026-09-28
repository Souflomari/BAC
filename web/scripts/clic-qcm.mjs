/**
 * clic-qcm.mjs — combien de temps le fil gèle quand l'élève CLIQUE UNE RÉPONSE
 * dans un QCM de leçon, sur un téléphone bon marché (processeur bridé ×6).
 *
 * POURQUOI (2026-09-05, nuit). `MathText` — le rendu des énoncés et des
 * choix de QCM et de points d'arrêt — faisait passer sa chaîne par remark +
 * KaTeX à CHAQUE rendu du parent, et un QCM se re-rend à chaque clic (état
 * local). Même défaut que `MdBlock` (HANDOFF §11.20) ; cet instrument mesure
 * ce que le clic coûte, avant et après la mémoïsation (§11.23).
 *
 * CE QU'ON MESURE, par leçon, viewport 390 × 780, processeur bridé ×CPU
 * (défaut 6) : la page est chargée et calme ; on avance de chapitre jusqu'au
 * premier QCM visible ; on clique son premier choix ; on relève le délai
 * jusqu'au verdict (`[role="status"]` dans l'item) et les tâches longues du
 * geste (nombre, somme, la plus longue) jusqu'au calme suivant, ainsi que le
 * nombre de formules de l'item.
 *
 * Ce n'est PAS une porte : une mesure de temps dépend de la machine. C'est un
 * instrument de comparaison avant/après, à lancer seul, machine à froid.
 * Il s'arrête (code 2) si une feuille de style répond ≥ 400 (piège n° 4).
 *
 *   BASE=http://127.0.0.1:3911 CPU=6 node scripts/clic-qcm.mjs [routes…]
 *   (sans routes : les 62 leçons, par `../content`. ⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync, statSync } from "node:fs";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const cpu = Number(process.env.CPU ?? 6);
const lecons = [];
for (const m of readdirSync("../content")) { const d = `../content/${m}`; if (!statSync(d).isDirectory()) continue; for (const s of readdirSync(d)) if (existsSync(`${d}/${s}/lesson.md`)) lecons.push(`/notions/${m}/${s}`); }
const routes = process.argv.slice(2).length ? process.argv.slice(2) : lecons;
console.log(`processeur bridé ×${cpu} · ${routes.length} leçon(s) · clic de réponse dans le premier QCM visible · ${BASE}`);
async function calme(p) { let last = -1, quiet = 0; while (quiet < 4) { await p.waitForTimeout(500); const n = await p.evaluate(() => window.__lt.length); if (n === last) quiet++; else { quiet = 0; last = n; } } }
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); } catch {} });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  let css400 = 0; p.on("response", (res) => { if (/\.css(\?|$)/.test(res.url()) && res.status() >= 400) css400++; });
  await p.goto(`${BASE}${r}`, { waitUntil: "networkidle", timeout: 180000 });
  if (css400) { console.error(`✗ feuille de style en erreur — serveur périmé ?`); process.exit(2); }
  await calme(p);
  // trouver un QCM visible : avancer de chapitre jusqu'à en voir un
  const total = await p.locator("[data-chapter-section]").count();
  let sel = '[data-chapter-active="true"] [data-item-id] button';
  let trouve = (await p.locator(sel).count()) > 0, sauts = 0;
  while (!trouve && sauts < total - 1) { await p.locator("body").click({ position: { x: 5, y: 5 } }).catch(() => {}); await p.keyboard.press("ArrowRight"); sauts++; await p.waitForTimeout(300); await calme(p); trouve = (await p.locator(sel).count()) > 0; }
  if (!trouve) { console.log(`${r.padEnd(58)} — aucun QCM trouvé`); await ctx.close(); continue; }
  const item = p.locator('[data-chapter-active="true"] [data-item-id]').first();
  const nKatex = await item.locator(".katex").count();
  const bouton = item.locator("button").first();
  await bouton.scrollIntoViewIfNeeded();
  await p.waitForTimeout(300);
  await p.evaluate(() => { window.__lt = []; });
  const t0 = Date.now();
  await bouton.click();
  let verdict = null;
  for (let i = 0; i < 400; i++) { const ok = await item.locator('[role="status"]').count(); if (ok > 0) { verdict = Date.now() - t0; break; } await p.waitForTimeout(25); }
  await calme(p);
  const m = await p.evaluate(() => { const lt = window.__lt; return { n: lt.length, somme: Math.round(lt.reduce((a, [, d]) => a + d, 0)), max: Math.round(Math.max(0, ...lt.map(([, d]) => d))) }; });
  console.log(`${r.padEnd(58)} QCM au chapitre ${String(sauts + 1).padStart(2)}, ${String(nKatex).padStart(3)} formules dans l'item · verdict après ${(verdict === null ? "—" : verdict + " ms").padStart(8)} · tâches longues ${String(m.n).padStart(2)}, somme ${String(m.somme).padStart(5)} ms, max ${String(m.max).padStart(5)} ms`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
