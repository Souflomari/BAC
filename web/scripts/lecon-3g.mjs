/**
 * lecon-3g.mjs — une leçon sur 3G LENTE (400 kb/s, 400 ms de latence) et
 * processeur bridé ×4 : combien de temps le premier geste — « Chapitre
 * suivant » — reste-t-il sans effet ?
 *
 * POURQUOI (2026-09-11, HANDOFF §11.28). Pendant de `epreuve-3g` côté leçon.
 * Les boutons de transport, de choix et de révélation sont rendus par le
 * serveur ; leur onClick attend l'hydratation, qui attend ~350 ko de
 * JavaScript et une page de 650 à 730 ko. Mesuré avant correctif : le bouton
 * « suivant » visible à 4–8 s et sans effet jusqu'à 17–28 s (16 à 29 appuis).
 *
 * CE QU'ON MESURE, par leçon, viewport 390 × 780 : DOMContentLoaded ; le
 * bouton « suivant » visible ; le bouton ACTIF (plus `disabled`) ; des appuis
 * répétés toutes les 500 ms jusqu'à ce que `[data-chapter-active]` change ;
 * octets transférés. La colonne « actif » est la mesure d'honnêteté (un
 * bouton désactivé qui le dit n'est pas un bouton mort), « réagit après »
 * celle de vitesse.
 *
 * Pas une porte : un temps dépend de la machine et du bridage émulé. Un
 * instrument de comparaison avant/après, machine à froid.
 *
 *   BASE=http://127.0.0.1:3911 CPU=4 node scripts/lecon-3g.mjs [routes…]   (⚠️ depuis web/)
 *   (sans routes : rlc-serie, moyens-de-defense, la-verite)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const cpu = Number(process.env.CPU ?? 4);
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/notions/pc/rlc-serie", "/notions/svt/moyens-de-defense", "/notions/philo/la-verite"];
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 400, downloadThroughput: 400 * 1024 / 8, uploadThroughput: 200 * 1024 / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  const t0 = Date.now();
  await p.goto(`${BASE}${r}`, { waitUntil: "commit", timeout: 180000 });
  // le premier geste : le bouton « suivant » du transport de chapitre
  const suivant = p.getByRole("button", { name: /suivant/i }).first();
  await suivant.waitFor({ state: "visible", timeout: 180000 });
  const tVisible = Date.now() - t0;
  let tActif = null;
  while (Date.now() - t0 < 120000) { if (!(await suivant.isDisabled())) { tActif = Date.now() - t0; break; } await p.waitForTimeout(100); }
  let appuis = 0, tReagit = null;
  while (Date.now() - t0 < 120000) {
    appuis++;
    await suivant.click({ timeout: 1500, force: true }).catch(() => {});
    const actif = await p.evaluate(() => document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "0");
    if (actif !== "0") { tReagit = Date.now() - t0; break; }
    await p.waitForTimeout(500);
  }
  const dcl = await p.evaluate(() => Math.round(performance.getEntriesByType("navigation")[0]?.domContentLoadedEventEnd ?? 0));
  const octets = await p.evaluate(() => Math.round(performance.getEntriesByType("resource").reduce((s, e) => s + (e.transferSize || 0), 0) / 1024));
  console.log(`${r.padEnd(34)} DCL ${String(dcl).padStart(5)} ms · « suivant » visible ${String(tVisible).padStart(5)} ms · ACTIF ${String(tActif ?? "—").padStart(5)} ms · réagit après ${String(tReagit ?? "—").padStart(6)} ms (${appuis} appui${appuis > 1 ? "s" : ""}) · ${octets} ko transférés`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
