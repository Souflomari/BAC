/**
 * epreuve-3g.mjs — une épreuve sur 3G LENTE (400 kb/s, 400 ms de latence) et
 * processeur bridé ×4 : quand le bouton « Commencer l'épreuve » est-il
 * visible, quand devient-il ACTIF, combien d'appuis avant le premier énoncé ?
 *
 * POURQUOI (2026-09-06, HANDOFF §11.27). Les §11.20 et suivants mesurent le
 * processeur ; personne n'avait mesuré le RÉSEAU sur la page d'épreuve. Le
 * bouton est rendu par le serveur — visible à 4–7 s — mais son onClick
 * attendait l'hydratation, donc tout le JavaScript de la route (285 ko gzip,
 * dont 126 ko de pipeline markdown/KaTeX inutile avant l'appui) : il ignorait
 * le doigt jusqu'à ~17 s, vingt appuis. La pire forme de lenteur (§8.7).
 *
 * CE QU'ON MESURE, par épreuve, viewport 390 × 780 : DOMContentLoaded ; le
 * bouton visible ; le bouton ACTIF (plus `disabled`) et les octets reçus à cet
 * instant ; des appuis répétés toutes les 500 ms jusqu'au premier énoncé
 * (`[data-exam-exo] .prose-lesson`) ; `[data-sujet-complet]` ; octets
 * transférés au total. Un bouton désactivé qui le DIT n'est pas un bouton
 * mort : la colonne « actif » est la mesure d'honnêteté, « 1er énoncé » celle
 * de vitesse.
 *
 * Pas une porte : un temps dépend de la machine et du bridage émulé. Un
 * instrument de comparaison avant/après, machine à froid.
 *
 *   BASE=http://127.0.0.1:3911 CPU=4 node scripts/epreuve-3g.mjs [routes…]   (⚠️ depuis web/)
 *   (sans routes : sm-2025-normale, spc-2024-rattrapage, sexp-2021-normale)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const cpu = Number(process.env.CPU ?? 4);
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/examens/sm-2025-normale", "/examens/spc-2024-rattrapage", "/examens/sexp-2021-normale"];
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
  const bouton = p.getByRole("button", { name: /Commencer l.épreuve/i }).first();
  await bouton.waitFor({ state: "visible", timeout: 180000 });
  const tBouton = Date.now() - t0;
  // quand le bouton devient ACTIF (plus `disabled`) — et combien d'octets étaient arrivés
  let tActif = null, koActif = null;
  while (Date.now() - t0 < 120000) {
    if (!(await bouton.isDisabled())) { tActif = Date.now() - t0; koActif = await p.evaluate(() => Math.round(performance.getEntriesByType("resource").reduce((s, e) => s + (e.transferSize || 0), 0) / 1024)); break; }
    await p.waitForTimeout(100);
  }
  // appuis répétés toutes les 500 ms jusqu'à ce que le premier énoncé apparaisse
  let appuis = 0, tEnonce = null;
  while (Date.now() - t0 < 120000) {
    appuis++;
    await bouton.click({ timeout: 2000, force: true }).catch(() => {});
    const ok = await p.locator("[data-exam-exo] .prose-lesson").count();
    if (ok > 0) { tEnonce = Date.now() - t0; break; }
    await p.waitForTimeout(500);
  }
  const tComplet = await p.waitForSelector("[data-sujet-complet]", { timeout: 120000 }).then(() => Date.now() - t0).catch(() => null);
  const dcl = await p.evaluate(() => Math.round(performance.getEntriesByType("navigation")[0]?.domContentLoadedEventEnd ?? 0));
  const octets = await p.evaluate(() => Math.round(performance.getEntriesByType("resource").reduce((s, e) => s + (e.transferSize || 0), 0) / 1024));
  console.log(`${r.padEnd(32)} DCL ${String(dcl).padStart(5)} ms · bouton visible ${String(tBouton).padStart(5)} ms · ACTIF ${String(tActif ?? "—").padStart(5)} ms (${koActif ?? "—"} ko reçus) · 1er énoncé après ${String(tEnonce ?? "—").padStart(6)} ms (${appuis} appui${appuis > 1 ? "s" : ""}) · sujet complet ${String(tComplet ?? "—").padStart(6)} ms · ${octets} ko transférés`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
