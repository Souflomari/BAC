/**
 * cv-chapitre.mjs — ce que coûte DÉMASQUER un chapitre selon la façon dont il
 * était caché : `hidden` (display:none) contre `content-visibility: hidden`,
 * première puis seconde fois, processeur bridé ×6 (HANDOFF §11.22, « un
 * levier mesuré, pas encore pris »). Cinq leçons par défaut, dont un témoin
 * sans formules. Une expérience, pas une porte : elle manipule le DOM de la
 * page servie, sans toucher au produit.
 *
 *   BASE=http://127.0.0.1:3911 CPU=6 node scripts/cv-chapitre.mjs [routes…]   (⚠️ depuis web/)
 *
 * Colonnes : A1/A2 = display:none → visible, 1re / 2e fois ; B1/B2 = la même
 * chose avec content-visibility:hidden ; C1 = idem avec content-visibility:auto
 * (après B, donc état déjà gardé) ; Bprep = coût de basculer tous les chapitres
 * cachés vers content-visibility ; hauteurDoc = scrollHeight du document en B.
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const cpu = Number(process.env.CPU ?? 6);
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/notions/pc/rlc-serie", "/notions/maths/probabilites-conditionnelles", "/notions/maths/suites-numeriques", "/notions/pc/systemes-oscillants", "/notions/svt/moyens-de-defense"];
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(Math.round(e.duration)); }).observe({ type: "longtask", buffered: true }); } catch {} });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  await p.goto(`${BASE}${r}`, { waitUntil: "networkidle", timeout: 180000 });
  let last = -1, quiet = 0;
  while (quiet < 4) { await p.waitForTimeout(500); const n = await p.evaluate(() => window.__lt.length); if (n === last) quiet++; else { quiet = 0; last = n; } }
  const m = await p.evaluate(async () => {
    const raf = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
    const secs = [...document.querySelectorAll("[data-chapter-section]")];
    if (secs.length < 2) return { chapitres: secs.length };
    const s1 = secs[1], s0 = secs[0];
    const noeuds1 = s1.getElementsByTagName("*").length, katex1 = s1.querySelectorAll(".katex").length;
    const mesure = (fn) => { const t = performance.now(); fn(); void s1.offsetHeight; void document.body.offsetHeight; return Math.round(performance.now() - t); };
    // A — display:none (l'état actuel) : première puis seconde fois
    const A1 = mesure(() => { s0.hidden = true; s1.hidden = false; }); await raf();
    mesure(() => { s1.hidden = true; s0.hidden = false; }); await raf();
    const A2 = mesure(() => { s0.hidden = true; s1.hidden = false; }); await raf();
    mesure(() => { s1.hidden = true; s0.hidden = false; }); await raf();
    // B — content-visibility:hidden : tous les chapitres non actifs passent en CV hidden (au lieu de hidden)
    const tB0 = performance.now();
    for (const s of secs) { if (s !== s0) { s.hidden = false; s.style.contentVisibility = "hidden"; } }
    void document.body.offsetHeight; const Bprep = Math.round(performance.now() - tB0); await raf();
    const B1 = mesure(() => { s0.style.contentVisibility = "hidden"; s1.style.contentVisibility = ""; }); await raf();
    mesure(() => { s1.style.contentVisibility = "hidden"; s0.style.contentVisibility = ""; }); await raf();
    const B2 = mesure(() => { s0.style.contentVisibility = "hidden"; s1.style.contentVisibility = ""; }); await raf();
    // C — content-visibility:auto sur les non actifs (le navigateur décide) : montrer s1
    mesure(() => { s1.style.contentVisibility = "hidden"; s0.style.contentVisibility = ""; }); await raf();
    for (const s of secs) if (s !== s0) s.style.contentVisibility = "auto"; void document.body.offsetHeight; await raf();
    const C1 = mesure(() => { s0.style.contentVisibility = "auto"; s1.style.contentVisibility = ""; }); await raf();
    // hauteur du document en B (les chapitres CV hidden gardent-ils une hauteur ?)
    const hauteurDoc = document.documentElement.scrollHeight;
    // restaurer
    for (const s of secs) { s.style.contentVisibility = ""; s.hidden = s !== s0; }
    return { chapitres: secs.length, noeuds1, katex1, A1, A2, Bprep, B1, B2, C1, hauteurDoc };
  });
  console.log(r.padEnd(48), JSON.stringify(m));
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
