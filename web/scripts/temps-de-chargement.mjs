/**
 * Le TEMPS de chargement lui-même — TTFB, FCP, LCP, et SURTOUT quel élément
 * est le LCP.
 *
 * Le dernier angle mort nommé dans la colonne « ne mesure pas » de
 * `cls-sweep` : « Le TEMPS de chargement lui-même (LCP, TTFB) — jamais
 * mesuré sur ce projet ». Tout le reste de la journée lente du 2026-09-04 a
 * mesuré ce qui BOUGE (CLS), ce qui reste MORT (§11.60/61), ce qui est
 * TÉLÉCHARGÉ (donnees-sweep) — jamais quand le contenu principal ARRIVE.
 *
 * Ce que l'instrument mesure, et ce qu'il ne peut pas dire :
 *
 *   - TTFB, FCP, LCP en millisecondes, réseau libre puis 3G lent
 *     (400 kb/s, 400 ms — les mêmes conditions que `cls-sweep`, pour que
 *     les deux se lisent ensemble).
 *   - L'ÉLÉMENT du LCP : sa balise, sa classe, ses 60 premiers caractères.
 *     C'est la seule colonne vraiment actionnable. Un chiffre de LCP dit
 *     qu'on attend ; seul l'élément dit CE QU'on attend.
 *   - Trois passages par route et par condition, **médiane et étendue**.
 *     Un instrument neuf se lance plusieurs fois avant d'être cru
 *     (ADR 0036) : une mesure de temps qui ne donne pas son étendue ne
 *     permet pas de distinguer un défaut d'un bruit.
 *
 * CE QU'IL NE MESURE PAS. Les millisecondes sont celles de ce conteneur,
 * servi en local par `next start` : pas de relais, pas de réseau marocain,
 * un processeur partagé. Les valeurs ABSOLUES ne sont donc pas celles d'un
 * élève. Ce qui est lisible, c'est le CLASSEMENT entre pages et l'identité
 * de l'élément LCP — deux faits qui survivent au changement de machine.
 *
 * Ce n'est PAS une porte : un seuil en millisecondes sur une machine
 * partagée rougirait au hasard, et une porte instable enseigne à ignorer
 * le rouge de toutes les autres (ADR 0036).
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3111";
const PASSAGES = Number(process.env.PASSAGES ?? 3);
const ROUTES = [
  "/",
  "/commencer",
  "/examens",
  "/matieres/pc",
  "/notions/maths/suites-numeriques",
  "/notions/pc/rlc-serie",
  "/notions/svt/moyens-de-defense",
  "/examens/sexp-2018-normale",
];

const OBSERVATEUR = `
  window.__lcp = null;
  try {
    new PerformanceObserver((l) => {
      const e = l.getEntries();
      const d = e[e.length - 1];
      if (d) window.__lcp = { t: d.startTime, el: d.element ? {
        tag: d.element.tagName,
        cls: (d.element.getAttribute('class') || '').slice(0, 70),
        txt: (d.element.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 60),
      } : null };
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}
`;

const mediane = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};
const ms = (n) => (n == null ? "  —  " : String(Math.round(n)).padStart(5));

const navigateur = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
let pireLcp = { lcp: -1 };

for (const lent of [false, true]) {
  console.log(`\n=== ${lent ? "3G lent (400 kb/s, 400 ms de latence)" : "réseau libre"} — ${PASSAGES} passages par route`);
  console.log("route                                   TTFB   FCP   LCP  (étendue LCP)  élément du LCP");

  for (const route of ROUTES) {
    const runs = [];
    let dernierEl = null;

    for (let i = 0; i < PASSAGES; i++) {
      const ctx = await navigateur.newContext({ viewport: { width: 390, height: 780 } });
      await ctx.addInitScript(OBSERVATEUR);
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      if (lent) {
        await cdp.send("Network.emulateNetworkConditions", {
          offline: false, latency: 400,
          downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8,
        });
      }
      try {
        await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 });
        await page.waitForTimeout(lent ? 2500 : 900);
        const m = await page.evaluate(() => {
          const nav = performance.getEntriesByType("navigation")[0];
          const fcp = performance.getEntriesByName("first-contentful-paint")[0];
          return {
            ttfb: nav ? nav.responseStart : null,
            fcp: fcp ? fcp.startTime : null,
            lcp: window.__lcp ? window.__lcp.t : null,
            el: window.__lcp ? window.__lcp.el : null,
          };
        });
        runs.push(m);
        if (m.el) dernierEl = m.el;
      } catch (e) {
        runs.push({ ttfb: null, fcp: null, lcp: null, el: null, err: String(e).slice(0, 40) });
      }
      await ctx.close();
    }

    const col = (k) => runs.map((r) => r[k]).filter((v) => v != null);
    const lcps = col("lcp");
    const med = lcps.length ? mediane(lcps) : null;
    const etendue = lcps.length ? Math.round(Math.max(...lcps) - Math.min(...lcps)) : null;
    const desc = dernierEl
      ? `<${dernierEl.tag.toLowerCase()}> ${dernierEl.txt ? `« ${dernierEl.txt} »` : dernierEl.cls}`
      : "(aucun)";

    console.log(
      `${route.padEnd(38)} ${ms(col("ttfb").length ? mediane(col("ttfb")) : null)} ${ms(col("fcp").length ? mediane(col("fcp")) : null)} ${ms(med)}   ±${String(etendue ?? "—").padStart(5)}      ${desc}`
    );

    if (lent && med != null && med > pireLcp.lcp) pireLcp = { route, lcp: med, desc, etendue };
  }
}

console.log(`\nLCP le plus lent en 3G : ${pireLcp.route} — ${Math.round(pireLcp.lcp)} ms (étendue ±${pireLcp.etendue}), élément ${pireLcp.desc}`);
console.log("Rappel : millisecondes de CE conteneur. Le classement et l'élément survivent au changement de machine ; les valeurs absolues, non.");

await navigateur.close();
