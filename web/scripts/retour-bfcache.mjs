/**
 * retour-bfcache.mjs — le bouton RETOUR : la page revient-elle du cache
 * arrière/avant (bfcache), instantanée et dans l'état où on l'a laissée, ou
 * est-elle rebâtie — sur 3G lente, 17 à 28 s d'hydratation à refaire ?
 *
 * POURQUOI (2026-09-11, HANDOFF §11.30). Un élève quitte une leçon par une
 * navigation complète (adresse tapée, résultat de recherche, « Recharger »
 * de la veille) puis revient. Jamais mesuré. Chromium lancé par Playwright
 * DÉSACTIVE le bfcache (--disable-back-forward-cache) : l'instrument retire
 * ce drapeau ; sans ça, tout est « rebâti » et l'instrument ment.
 *
 * CE QU'ON MESURE, par paire (page A → page B → Retour), viewport 390 × 780 :
 * `pageshow.persisted` (restaurée ou non), le temps jusqu'au signal de vie,
 * si l'état (le chapitre courant) a survécu, et les RAISONS de Chromium
 * quand il n'a pas restauré (`Page.backForwardCacheNotUsed`).
 *
 * A trouvé : leçons et épreuves restaurées en 50–230 ms, chapitre conservé ;
 * l'accueil REBÂTI sur 3G lente quand on le quitte pendant qu'une requête
 * est encore en vol (le favicon, `NetworkExceedsBufferLimit` /
 * `JavaScriptExecution`) — restauré si l'on part une fois le réseau calme.
 *
 *   BASE=http://127.0.0.1:3911 [KBPS=400 RTT=400 CPU=4] [SEJOUR=ms] [PAIRES="/a,/b;/c,/d"] node scripts/retour-bfcache.mjs   (⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", ignoreDefaultArgs: ["--disable-back-forward-cache"] });
const paires = process.env.PAIRES ? process.env.PAIRES.split(";").map((x) => x.split(",")) : [["/notions/pc/rlc-serie", "/examens"], ["/examens/sm-2025-normale", "/"], ["/", "/notions/philo/la-verite"]];
for (const [a, b] of paires) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => { window.__pageshow = []; addEventListener("pageshow", (e) => window.__pageshow.push({ persisted: e.persisted, t: Math.round(performance.now()) })); });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Page.enable");
  const raisons = [];
  cdp.on("Page.backForwardCacheNotUsed", (e) => raisons.push(...(e.notRestoredExplanations ?? []).map((x) => x.reason)));
  if (process.env.KBPS) { await cdp.send("Network.enable"); await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: Number(process.env.RTT ?? 400), downloadThroughput: Number(process.env.KBPS) * 1024 / 8, uploadThroughput: 200 * 1024 / 8 }); await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(process.env.CPU ?? 4) }); }
  await p.goto(`${BASE}${a}`, { waitUntil: "load", timeout: 180000 });
  await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 120000 }).catch(() => {});
  // un geste dans la page, pour qu'il y ait un état à restaurer
  await p.keyboard.press("ArrowRight").catch(() => {});
  await p.waitForTimeout(800);
  const etatAvant = await p.evaluate(() => document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "-");
  await p.goto(`${BASE}${b}`, { waitUntil: "load", timeout: 180000 });
  if (process.env.SEJOUR) await p.waitForTimeout(Number(process.env.SEJOUR));
  const t0 = Date.now();
  await p.goBack({ waitUntil: "commit", timeout: 180000 }).catch(() => {});
  await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 120000 }).catch(() => {});
  const tRetour = Date.now() - t0;
  const r = await p.evaluate(() => ({ shows: window.__pageshow, etat: document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "-", nav: performance.getEntriesByType("navigation")[0]?.type }));
  const persiste = r.shows.some((x) => x.persisted);
  console.log(`séjour ${process.env.SEJOUR ?? 0} ms · ${a.padEnd(26)} → ${b.padEnd(24)} → retour : ${persiste ? "BFCACHE (restaurée)" : "REBÂTIE"} en ${tRetour} ms · navigation ${r.nav} · chapitre ${etatAvant} → ${r.etat} · raisons : ${[...new Set(raisons)].join(", ") || "—"}`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
