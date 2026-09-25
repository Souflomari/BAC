/**
 * gel-lecon.mjs — combien de temps une LEÇON reste sourde après s'être peinte,
 * sur un téléphone bon marché (processeur bridé ×6) — les 62 leçons.
 *
 * POURQUOI (2026-09-05, nuit). Le §8.7 du HANDOFF avait mesuré trois leçons
 * denses et un témoin (`poids-sweep`, passe C) : `reactions-acido-basiques`
 * « ne répond à aucun appui pendant 6,7 s ». INSTRUMENTS listait depuis « le
 * gel des LEÇONS au même protocole que les épreuves » comme portée manquante
 * de `gel-epreuve.mjs`. Ceci est ce protocole, sur tout le corpus.
 *
 * CE QU'ON MESURE, par leçon, viewport 390 × 780, processeur bridé ×CPU
 * (défaut 6), observateur de tâches longues posé AVANT la navigation :
 *   · le nombre de formules et de nœuds (le volume) ;
 *   · le délai jusqu'au réseau calme (`networkidle`) ;
 *   · les tâches longues (> 50 ms) : nombre, somme, BLOCAGE (somme au-delà
 *     de 50 ms — la définition de `poids-sweep`), la plus longue ;
 *   · l'instant où la DERNIÈRE tâche longue finit, compté depuis le début de
 *     la navigation : c'est le moment où la page répond enfin à un appui —
 *     avant lui, l'hydratation n'a pas attaché les gestionnaires.
 * On attend deux secondes de calme (quatre relevés à 500 ms sans tâche
 * nouvelle) avant de lire.
 *
 * CE QUE ÇA A TROUVÉ (62 leçons, ×6) : aucune tâche ≥ 1 s ; blocage total
 * 0,6 à 2,8 s ; page réactive 1,9 à 7,3 s après la navigation (médiane
 * 3,5 s) — 16 leçons au-dessus de 5 s, toutes de maths ou de PC (HANDOFF
 * §11.21). Ce n'est PAS un gel — une dizaine de tâches d'une demi-seconde
 * entre lesquelles la page défile — c'est un silence.
 *
 * Ce n'est PAS une porte : une mesure de temps dépend de la machine. C'est un
 * instrument de comparaison avant/après, à lancer seul, machine à froid.
 * Il s'arrête (code 2) si une feuille de style répond ≥ 400 — un serveur
 * périmé qui sert un HTML d'un autre build rend toute mesure fausse
 * (INSTRUMENTS, piège n° 4).
 *
 *   BASE=http://127.0.0.1:3911 CPU=6 node scripts/gel-lecon.mjs [routes…]
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
console.log(`processeur bridé ×${cpu} · ${routes.length} leçon(s) · ${BASE}`);

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
  const t0 = Date.now();
  await p.goto(`${BASE}${r}`, { waitUntil: "networkidle", timeout: 180000 });
  const tIdle = Date.now() - t0;
  if (css400) {
    console.error(`✗ ${r} : feuille de style en ${css400} erreur(s) HTTP — serveur périmé ? mesure invalide`);
    process.exit(2);
  }
  // deux secondes de calme : quatre relevés à 500 ms sans tâche longue nouvelle
  let last = -1, quiet = 0;
  while (quiet < 4) {
    await p.waitForTimeout(500);
    const n = await p.evaluate(() => window.__lt.length);
    if (n === last) quiet++; else { quiet = 0; last = n; }
  }
  const m = await p.evaluate(() => {
    const lt = window.__lt;
    const somme = lt.reduce((a, [, d]) => a + d, 0);
    const bloc = lt.reduce((a, [, d]) => a + Math.max(0, d - 50), 0);
    const max = Math.max(0, ...lt.map(([, d]) => d));
    const fin = lt.length ? Math.max(...lt.map(([s, d]) => s + d)) : 0;
    return { n: lt.length, somme: Math.round(somme), bloc: Math.round(bloc), max: Math.round(max), fin: Math.round(fin),
      katex: document.querySelectorAll(".katex").length, noeuds: document.getElementsByTagName("*").length };
  });
  console.log(
    `${r.padEnd(58)} ${String(m.katex).padStart(4)} formules ${String(m.noeuds).padStart(6)} nœuds · réseau calme ${String(tIdle).padStart(5)} ms · ` +
    `tâches longues ${String(m.n).padStart(3)}, somme ${String(m.somme).padStart(6)} ms, bloquant ${String(m.bloc).padStart(6)} ms, ` +
    `max ${String(m.max).padStart(5)} ms, dernière finit à ${String(m.fin).padStart(6)} ms`,
  );
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
