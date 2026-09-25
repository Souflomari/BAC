/**
 * gel-epreuve.mjs — combien de temps le téléphone GÈLE quand l'élève appuie
 * sur « Commencer l'épreuve », puis sur « Terminer l'épreuve ».
 *
 * POURQUOI (2026-09-05, soir). Le document d'épreuve est léger (≤ 194 ko)
 * parce que TOUT se rend côté client : « Commencer » rend les énoncés,
 * « Terminer » rend les corrigés — 256 à 1 668 formules KaTeX et autant de
 * blocs markdown. Personne ne l'avait mesuré : les instruments attendaient
 * `[data-exam-exo]` puis 400 ms. Sur un processeur bridé ×6 (le téléphone
 * bon marché du HANDOFF §8), l'écran gelait 3 à 15 s au « Commencer » et
 * 3 à 30 s au « Terminer », en une seule tâche de 2,6 à 15,9 s.
 *
 * CE QU'ON MESURE, par sujet, viewport 390 × 780, processeur bridé ×CPU
 * (défaut 6) :
 *   · au « Commencer » : délai jusqu'au PREMIER énoncé rendu, puis jusqu'à
 *     `[data-sujet-complet]` ; somme des tâches longues (> 50 ms) ;
 *   · au « Terminer » : délai jusqu'au premier corrigé, puis jusqu'à
 *     `[data-corrige-complet]` ; somme des tâches longues, la plus longue,
 *     leur nombre.
 * Sur un build sans marqueurs (avant la révélation progressive), le script
 * se replie sur la stabilité du nombre de `.katex`.
 *
 * Ce n'est PAS une porte : une mesure de temps dépend de la machine. C'est un
 * instrument de comparaison avant/après, à lancer seul, machine à froid.
 *
 *   BASE=http://127.0.0.1:3911 CPU=6 node scripts/gel-epreuve.mjs [routes…]
 *   (sans routes : les 39 épreuves par routes-examens.mjs. ⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
import { execSync } from "node:child_process";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const routes = process.argv.slice(2).length ? process.argv.slice(2) : execSync("node scripts/routes-examens.mjs", { encoding: "utf8" }).trim().split(" ");
const cpu = Number(process.env.CPU ?? 6);
console.log(`processeur bridé ×${cpu} · ${routes.length} épreuve(s)`);
const lignes = [];
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  await p.goto(`${BASE}${r}`, { waitUntil: "networkidle" });
  await p.evaluate(() => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(e.duration); }).observe({ type: "longtask", buffered: true }); });
  const commencer = p.getByRole("button", { name: /Commencer l.épreuve/i });
  let t0 = Date.now(); await commencer.first().click();
  await p.waitForSelector("[data-exam-exo] .prose-lesson", { timeout: 60000 }); const tPremier = Date.now() - t0;
  await p.waitForSelector("[data-sujet-complet]", { timeout: 60000 }).catch(() => {}); const tEnonce = Date.now() - t0;
  const ltEnonce = await p.evaluate(() => { const s = window.__lt.reduce((a, b) => a + b, 0); window.__lt = []; return Math.round(s); });
  const n0 = await p.evaluate(() => document.querySelectorAll(".katex").length);
  const terminer = p.getByRole("button", { name: /Terminer l.épreuve/i });
  t0 = Date.now(); await terminer.first().click();
  await p.waitForSelector("[data-exam-exo] .prose-lesson + div .prose-lesson, [data-exam-exo] .rounded-lg .prose-lesson", { timeout: 60000 }).catch(() => {}); const tPremierCorrige = Date.now() - t0;
  const complet = await p.waitForSelector("[data-corrige-complet]", { timeout: 60000 }).then(() => true).catch(() => false);
  // repli (ancien build sans marqueur) : le corrigé est là quand le nombre de formules cesse de croître
  let n = n0, stable = 0; while (stable < 3) { await p.waitForTimeout(150); const m = await p.evaluate(() => document.querySelectorAll(".katex").length); if (m === n) stable++; else { n = m; stable = 0; } }
  const tCorrige = complet ? Date.now() - t0 - 450 : Date.now() - t0 - 450;
  const lt = await p.evaluate(() => ({ somme: Math.round(window.__lt.reduce((a, b) => a + b, 0)), max: Math.round(Math.max(0, ...window.__lt)), n: window.__lt.length }));
  lignes.push({ r, n0, n, tEnonce, tPremier, tPremierCorrige, ltEnonce, tCorrige, lt });
  console.log(`${r.padEnd(32)} énoncé ${String(n0).padStart(4)} formules : 1er exo ${String(tPremier).padStart(5)} ms, complet ${String(tEnonce).padStart(5)} ms (tâches longues ${ltEnonce} ms) · corrigé → ${String(n).padStart(4)} formules : 1er ${String(tPremierCorrige).padStart(5)} ms, complet ${String(tCorrige).padStart(5)} ms · tâches longues ${lt.somme} ms (max ${lt.max} ms, ${lt.n})`);
  await ctx.close();
}
lignes.sort((a, b) => b.tCorrige - a.tCorrige);
console.log("\nLes cinq gels les plus longs au « Terminer » :"); for (const l of lignes.slice(0, 5)) console.log(`  ${l.tCorrige} ms · tâche la plus longue ${l.lt.max} ms · ${l.n} formules · ${l.r}`);
console.log(`médiane corrigé : ${lignes.map(l=>l.tCorrige).sort((a,b)=>a-b)[Math.floor(lignes.length/2)]} ms`);
await nav.close();
