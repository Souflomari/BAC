/**
 * trace-chargement.mjs — où passe le temps d'un chargement de leçon, sur un
 * téléphone bon marché (processeur bridé ×6) : JavaScript (analyse,
 * compilation, exécution) contre style et mise en page contre analyse du HTML.
 *
 * POURQUOI (2026-09-06, HANDOFF §11.21 et §11.26). Le silence d'hydratation
 * est mesuré en bloc (1,9 à 7,3 s selon la leçon) ; la part du JavaScript —
 * dont 143 ko de pipeline markdown/KaTeX que la leçon n'utilise qu'après un
 * geste — n'était pas isolée. Ceci ventile, par une trace CDP
 * (`devtools.timeline`), les événements complets du fil principal entre la
 * navigation et deux secondes de calme.
 *
 * LECTURE. Les durées sont des SELF-TIMES approximatifs : un événement qui en
 * contient d'autres (EvaluateScript ⊃ FunctionCall ⊃ Layout forcé…) est compté
 * une fois, déduction faite de ses enfants directs de même fil. Les familles :
 *   · JS        : EvaluateScript, v8.compile, v8.run, FunctionCall, TimerFire,
 *                 EventDispatch, RunMicrotasks, v8.parseOnBackground (hors fil)
 *   · style/MEP : UpdateLayoutTree, Layout, PrePaint, Paint, Layerize,
 *                 HitTest, ScheduleStyleRecalculation
 *   · HTML      : ParseHTML, ParseAuthorStyleSheet
 *   · autre     : le reste (GC, commit, etc.)
 * Un bridage émulé, pas un téléphone : les rapports comptent plus que les
 * valeurs. Pas une porte.
 *
 *   BASE=http://127.0.0.1:3911 CPU=6 node scripts/trace-chargement.mjs [routes…]   (⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const cpu = Number(process.env.CPU ?? 6);
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/notions/pc/rlc-serie", "/notions/maths/suites-numeriques", "/notions/svt/moyens-de-defense"];
const FAM = {
  JS: new Set(["EvaluateScript", "v8.compile", "v8.run", "FunctionCall", "TimerFire", "EventDispatch", "RunMicrotasks", "V8.Execute", "v8.compileModule", "V8.CompileCode", "V8.CompileIgnition", "EvaluateModule", "v8.evaluateModule", "XHRReadyStateChange", "RequestIdleCallback", "FireAnimationFrame", "FireIdleCallback"]),
  MEP: new Set(["UpdateLayoutTree", "Layout", "PrePaint", "Paint", "Layerize", "HitTest", "ScheduleStyleRecalculation", "UpdateLayer", "UpdateLayerTree", "Commit", "CompositeLayers", "IntersectionObserverController::computeIntersections"]),
  HTML: new Set(["ParseHTML", "ParseAuthorStyleSheet", "HTMLDocumentParser::PumpTokenizer", "ResourceReceivedData", "ResourceFinish", "ResourceSendRequest"]),
};
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(Math.round(e.duration)); }).observe({ type: "longtask", buffered: true }); } catch {} });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  const events = [];
  cdp.on("Tracing.dataCollected", (e) => events.push(...e.value));
  const fin = new Promise((res) => cdp.once("Tracing.tracingComplete", res));
  await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline,v8.execute", transferMode: "ReportEvents" });
  const t0 = Date.now();
  await p.goto(`${BASE}${r}`, { waitUntil: "networkidle", timeout: 180000 });
  let last = -1, quiet = 0;
  while (quiet < 4) { await p.waitForTimeout(500); const n = await p.evaluate(() => window.__lt.length); if (n === last) quiet++; else { quiet = 0; last = n; } }
  const dureeMur = Date.now() - t0;
  await cdp.send("Tracing.end"); await fin;
  // fil principal du renderer : le pid/tid qui porte le plus d'événements X
  const X = events.filter((e) => e.ph === "X" && typeof e.dur === "number");
  const parFil = new Map(); for (const e of X) { const k = `${e.pid}/${e.tid}`; parFil.set(k, (parFil.get(k) ?? 0) + 1); }
  const [filPrincipal] = [...parFil.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null];
  const M = X.filter((e) => `${e.pid}/${e.tid}` === filPrincipal).sort((a, b) => a.ts - b.ts);
  // self-time : durée moins la durée des enfants directs (pile par imbrication temporelle)
  const self = new Map(); const pile = [];
  for (const e of M) {
    while (pile.length && pile[pile.length - 1].ts + pile[pile.length - 1].dur <= e.ts) pile.pop();
    const parent = pile[pile.length - 1];
    if (parent) parent.enfants = (parent.enfants ?? 0) + e.dur;
    pile.push(e);
  }
  for (const e of M) self.set(e.name, (self.get(e.name) ?? 0) + Math.max(0, e.dur - (e.enfants ?? 0)));
  const fam = { JS: 0, MEP: 0, HTML: 0, autre: 0 };
  for (const [n, us] of self) { if (FAM.JS.has(n)) fam.JS += us; else if (FAM.MEP.has(n)) fam.MEP += us; else if (FAM.HTML.has(n)) fam.HTML += us; else fam.autre += us; }
  const tot = fam.JS + fam.MEP + fam.HTML + fam.autre;
  const ms = (us) => (us / 1000).toFixed(0).padStart(5);
  const pct = (us) => `${((100 * us) / Math.max(1, tot)).toFixed(0)} %`.padStart(4);
  console.log(`${r.padEnd(40)} mur ${dureeMur} ms · fil principal ${ms(tot)} ms — JS ${ms(fam.JS)} ms (${pct(fam.JS)}) · style/mise en page ${ms(fam.MEP)} ms (${pct(fam.MEP)}) · HTML ${ms(fam.HTML)} ms (${pct(fam.HTML)}) · autre ${ms(fam.autre)} ms (${pct(fam.autre)})`);
  const top = [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([n, us]) => `${n} ${(us / 1000).toFixed(0)}`).join(" · ");
  console.log(`    top : ${top}`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
