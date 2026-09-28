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
 *   PERTE=1 [BLOCAGE=cdp] [RECHARGER=1] node scripts/veille-hydratation.mjs [routes…]
 *     (RECHARGER=1 : une fois le bandeau montré, le réseau « revient » et l'on
 *      appuie sur « Recharger » — temps jusqu'à l'hydratation et octets qui
 *      repassent par le réseau contre le cache HTTP. Impose BLOCAGE=cdp :
 *      l'interception Playwright DÉSACTIVE le cache HTTP et ferait mesurer un
 *      rechargement complet — 695 ko et 22,8 s au lieu de 75 ko et 4,2 s, la
 *      première mesure du 2026-09-11 s'y est trompée.)
 *     (BLOCAGE=cdp : Network.setBlockedURLs — échec INSTANTANÉ, sans la latence
 *      de l'interception Playwright, et le cache HTTP reste actif ; c'est le
 *      cas dur, celui qui passait sous l'écouteur `error`)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const perte = process.env.PERTE === "1";
if (process.env.RECHARGER === "1" && process.env.BLOCAGE !== "cdp") { console.error("RECHARGER=1 impose BLOCAGE=cdp (l'interception Playwright désactive le cache HTTP)."); process.exit(2); }
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
  // L'instant du bandeau est pris DANS la page (MutationObserver sur la classe
  // `hydratation-perdue` de <html>), pas par l'échantillonnage : sur une page
  // de 318 ko analysée à processeur ×4, un `evaluate` peut attendre des
  // secondes son tour — la première version disait 8,0 s pour un bandeau
  // révélé à ~2,3 s.
  await p.addInitScript(() => {
    new MutationObserver(() => {
      if (window.__bacTBandeau == null && document.documentElement.classList.contains("hydratation-perdue")) window.__bacTBandeau = Math.round(performance.now());
    }).observe(document, { attributes: true, subtree: true, attributeFilter: ["class"] });
  });
  const t0 = Date.now();
  let tPerte = null;
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Network.enable");
  if (perte && process.env.BLOCAGE === "cdp") {
    await cdp.send("Network.setBlockedURLs", { urls: [`*${cible}`] });
    cdp.on("Network.loadingFailed", () => { tPerte ??= Date.now() - t0; });
  } else if (perte) {
    await p.route("**/*", async (route) => { if (route.request().url().includes(cible)) { tPerte ??= Date.now() - t0; return route.abort("failed"); } return route.continue(); });
  }
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
  const tBandeauPage = await p.evaluate(() => window.__bacTBandeau ?? null).catch(() => null);
  if (tBandeauPage != null) bandeauA = tBandeauPage;
  // quand l'écouteur a été posé (repère `veille-posee`) et quand les feuilles de
  // style sont arrivées — un script en ligne après une feuille attend qu'elle soit là
  const chrono = await p.evaluate(() => ({ ecouteur: Math.round(performance.getEntriesByName("veille-posee")[0]?.startTime ?? -1), css: performance.getEntriesByType("resource").filter((e) => /\.css(\?|$)/.test(e.name)).map((e) => Math.round(e.responseEnd)) })).catch(() => ({ ecouteur: -1, css: [] }));
  let recharge = "";
  if (perte && process.env.RECHARGER === "1" && bandeauA != null) {
    // On attend la fin du premier chargement AVANT d'appuyer : appuyer pendant
    // que le HTML et les morceaux sont encore en vol les annule, et ils ne
    // sont pas en cache — mesuré : 315 ko et 12,8 s au lieu de 75 ko et 4,2 s.
    await p.waitForLoadState("load", { timeout: 120000 }).catch(() => {});
    await cdp.send("Network.setBlockedURLs", { urls: [] });
    const t1 = Date.now();
    await Promise.all([p.waitForNavigation({ waitUntil: "commit", timeout: 120000 }).catch(() => {}), p.locator("#hydratation-perdue a").click({ force: true })]);
    let tVivant2 = null;
    while (Date.now() - t1 < 120000) { if (await p.evaluate(() => !!window.__bacVivant).catch(() => false)) { tVivant2 = Date.now() - t1; break; } await p.waitForTimeout(250); }
    await p.waitForLoadState("load", { timeout: 120000 }).catch(() => {});
    const b = await p.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; const rs = performance.getEntriesByType("resource"); const reseau = rs.filter((e) => e.transferSize > 0); return { html: Math.round((n?.transferSize ?? 0) / 1024), ko: Math.round(rs.reduce((x, e) => x + (e.transferSize || 0), 0) / 1024), reseau: reseau.length, cache: rs.length - reseau.length, referme: !!document.getElementById("hydratation-perdue")?.hidden }; }).catch(() => null);
    recharge = b ? ` · RECHARGER → hydraté en ${tVivant2 == null ? "JAMAIS" : (tVivant2 / 1000).toFixed(1) + " s"}, ${b.ko} ko par le réseau (HTML ${b.html} ko, ${b.reseau} réponses réseau / ${b.cache} du cache), bandeau refermé ${b.referme}` : " · RECHARGER : bilan illisible";
  }
  const s = (ms) => ms == null ? "—" : `${(ms / 1000).toFixed(perte ? 1 : 0)} s`;
  console.log(perte
    ? `${r.padEnd(28)} morceau ${cible.split("/").pop()} (${(tailleCible / 1024).toFixed(0)} ko) perdu à ${s(tPerte)} · bandeau à ${bandeauA == null ? "JAMAIS" : s(bandeauA)}${bandeauA != null && tPerte != null ? ` (+${bandeauA - tPerte} ms)` : ""} · ligne ${s(ligneA)}→${s(ligneZ)} · ensemble ${ensemble / 1000} s · hydraté ${vivant == null ? "jamais" : s(vivant)} · écouteur posé à ${chrono.ecouteur < 0 ? "?" : (chrono.ecouteur / 1000).toFixed(1) + " s"}, feuilles de style à ${chrono.css.map((t) => (t / 1000).toFixed(1)).join("/")} s${recharge}`
    : `${r.padEnd(28)} bandeau ${s(bandeauA)}→${s(bandeauZ)} · ligne ${s(ligneA)}→${s(ligneZ)} · ensemble ${ensemble / 1000} s · hydraté ${s(vivant)}`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
