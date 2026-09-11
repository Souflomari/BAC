/**
 * veille-hydratation.mjs — la veille d'hydratation, mesurée : quand la page
 * dit-elle que le JavaScript n'arrive pas, et se contredit-elle ?
 *
 * POURQUOI (2026-09-11, HANDOFF §11.29). Deux messages vivaient au même
 * endroit : la ligne « La page se prépare… » (1,5 s, ADR 0032) et le bandeau
 * « Recharger » de la veille (12 s après la FIN du HTML, reseau-malade.md).
 * Un morceau de JavaScript PERDU n'était détecté que par ce compte à rebours,
 * et le bandeau vivait en pied de page — donc inexistant tant que le HTML
 * n'était pas arrivé (10 s sur 3G lente) : mesuré, +8,3 s entre la perte et
 * le bandeau. Depuis : un écouteur `error` en tête du document révèle le
 * bandeau à la perte (+0,3 s), le compte à rebours est un filet à 30 s, et le
 * bandeau fait taire la ligne.
 *
 * DEUX MODES, viewport 390 × 780, processeur ×CPU (4), réseau émulé :
 *   - par défaut : chargement sain — chaque seconde, le bandeau est-il visible,
 *     la ligne est-elle visible (opacité > 0,5), les deux ENSEMBLE, et à
 *     quelle seconde `__bacVivant` (hydratation) arrive. Sur un réseau lent
 *     le bandeau ne doit JAMAIS apparaître, et jamais avec la ligne.
 *   - PERTE=1 : le plus gros morceau d'ENTRÉE (un <script src> du HTML) est
 *     bloqué — chaque 500 ms : le bandeau apparaît-il, combien de temps après
 *     la perte, la ligne s'est-elle tue.
 *
 * Pas une porte : des temps, sur une machine et un bridage émulés. Un
 * instrument de comparaison avant/après. `reseau-malade` (pertes aléatoires)
 * et `dom-truth` (le HTML servi) sont les portes voisines.
 *
 *   BASE=http://127.0.0.1:3911 [KBPS=400 RTT=400 CPU=4 MAX=45] node scripts/veille-hydratation.mjs [routes…]   (⚠️ depuis web/)
 *   PERTE=1 node scripts/veille-hydratation.mjs [routes…]
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const perte = process.env.PERTE === "1";
const routes = process.argv.slice(2).length ? process.argv.slice(2) : perte ? ["/notions/pc/rlc-serie", "/examens/sm-2025-normale"] : ["/notions/pc/rlc-serie", "/notions/philo/la-verite", "/examens/sm-2025-normale"];
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const etat = (p) => p.evaluate(() => {
  const b = document.getElementById("hydratation-perdue");
  const n = document.querySelector("[data-hydration-notice]");
  const cs = n ? getComputedStyle(n) : null;
  return { bandeau: b ? !b.hidden : false, ligne: !!cs && cs.display !== "none" && Number(cs.opacity) > 0.5, vivant: !!window.__bacVivant };
}).catch(() => ({ bandeau: false, ligne: false, vivant: false }));

for (const r of routes) {
  let cible = null, tailleCible = 0;
  if (perte) {
    const c0 = await nav.newContext(); const p0 = await c0.newPage();
    await p0.goto(`${BASE}${r}`, { waitUntil: "networkidle" });
    const tailles = await p0.evaluate(() => { const entree = new Set([...document.scripts].map((x) => x.src).filter(Boolean)); return Object.fromEntries(performance.getEntriesByType("resource").filter((e) => entree.has(e.name) && /\/_next\/static\/chunks\/.*\.js$/.test(e.name)).map((e) => [e.name, e.transferSize || e.encodedBodySize || 0])); });
    await c0.close();
    [cible, tailleCible] = Object.entries(tailles).sort((a, b) => b[1] - a[1])[0];
    cible = cible.replace(BASE, "");
  }
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  const t0 = Date.now();
  let tPerte = null;
  if (perte) await p.route("**/*", async (route) => { if (route.request().url().includes(cible)) { tPerte ??= Date.now() - t0; return route.abort("failed"); } return route.continue(); });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: Number(process.env.RTT ?? 400), downloadThroughput: Number(process.env.KBPS ?? 400) * 1024 / 8, uploadThroughput: 200 * 1024 / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(process.env.CPU ?? 4) });
  p.goto(`${BASE}${r}`, { waitUntil: "commit", timeout: 180000 }).catch(() => {});
  const pas = perte ? 500 : 1000;
  const max = Number(process.env.MAX ?? (perte ? 90 : 45));
  let bandeauA = null, bandeauZ = null, ligneA = null, ligneZ = null, ensemble = 0, vivant = null;
  for (let i = 1; i <= max; i++) {
    await p.waitForTimeout(Math.max(0, t0 + i * pas - Date.now()));
    const e = await etat(p);
    const t = i * pas;
    if (e.bandeau && bandeauA == null) bandeauA = t;
    if (bandeauA != null && !e.bandeau && bandeauZ == null) bandeauZ = t;
    if (e.ligne && ligneA == null) ligneA = t;
    if (ligneA != null && !e.ligne && ligneZ == null) ligneZ = t;
    if (e.bandeau && e.ligne) ensemble += pas;
    if (e.vivant && vivant == null) vivant = t;
    if (perte ? bandeauA != null && t >= bandeauA + 3000 : vivant != null && t >= vivant + 2000) break;
  }
  const s = (ms) => ms == null ? "—" : `${(ms / 1000).toFixed(perte ? 1 : 0)} s`;
  console.log(perte
    ? `${r.padEnd(28)} morceau ${cible.split("/").pop()} (${(tailleCible / 1024).toFixed(0)} ko) perdu à ${s(tPerte)} · bandeau à ${bandeauA == null ? "JAMAIS" : s(bandeauA)}${bandeauA != null && tPerte != null ? ` (+${bandeauA - tPerte} ms)` : ""} · ligne ${s(ligneA)}→${s(ligneZ)} · ensemble ${ensemble / 1000} s · hydraté ${vivant == null ? "jamais" : s(vivant)}`
    : `${r.padEnd(28)} bandeau ${s(bandeauA)}→${s(bandeauZ)} · ligne ${s(ligneA)}→${s(ligneZ)} · ensemble ${ensemble / 1000} s · hydraté ${s(vivant)}`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
