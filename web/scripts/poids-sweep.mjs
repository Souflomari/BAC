/**
 * Balayage POIDS — ce que la page coûte à charger, et combien de temps
 * l'élève attend avant de VOIR quelque chose.
 *
 * POURQUOI. C'est le point 1 de la liste « ce que RIEN ne mesure encore »
 * (docs/audits/INSTRUMENTS.md). Sept fenêtres de mesure ont été ouvertes le
 * 2026-09-04 ; six ont trouvé une classe entière de défauts. Aucune n'a
 * regardé le POIDS. `cls-sweep` bride le réseau mais ne mesure que le saut
 * de mise en page — une page peut être parfaitement stable ET mettre huit
 * secondes à apparaître.
 *
 * L'élève visé lit sur un téléphone, souvent en 3G ou en 4G encombrée. Un
 * mégaoctet de plus, ce n'est pas une ligne dans un tableau : c'est vingt
 * secondes d'attente, et une leçon qu'on n'ouvre pas.
 *
 * CE QU'ON MESURE — trois chiffres par route, tous des faits du protocole,
 * aucune heuristique :
 *
 *   · TTFB   (`responseStart − requestStart`) — le temps que le serveur met
 *            à répondre. Sur un build local il est plancher ; il sert de
 *            témoin, pas de verdict.
 *   · LCP    (`largest-contentful-paint`, dernière entrée) — l'instant où
 *            le plus gros élément visible est peint. C'est la mesure
 *            standard de « l'élève voit enfin sa leçon ». Seuils Core Web
 *            Vitals : ≤ 2,5 s bon ; ≤ 4,0 s à améliorer ; au-delà mauvais.
 *   · POIDS  (somme des `transferSize`, document compris) — les octets
 *            réellement transférés, pas la taille des sources.
 *
 * Le poids est ventilé par TYPE (script, feuille de style, fonte, image,
 * document, autre) parce que la ventilation dit quoi faire : 400 ko de
 * fontes se règlent autrement que 400 ko de JavaScript.
 *
 * DEUX PASSES, ET C'EST VOULU.
 *
 *   Passe A — le corpus ENTIER (70 routes) en HTTP nu, sans navigateur :
 *   octets du document et TTFB. Assez pour trouver LA page la plus lourde
 *   du corpus, ce qu'un échantillon de cinq leçons ne peut pas faire.
 *
 *   Passe B — un navigateur réel sur un échantillon PLUS les pires de la
 *   passe A : LCP, poids total, ventilation, et les cinq ressources les
 *   plus lourdes. Réseau libre, puis 3G lent (400 kb/s, 400 ms) — parce
 *   que sans bridage le LCP d'une machine de développement ne veut rien
 *   dire, exactement comme le CLS.
 *
 *   Passe C — LE PROCESSEUR BRIDÉ, et c'est celle qui a trouvé le défaut.
 *   Peindre vite ne suffit pas : entre la peinture et le moment où la page
 *   RÉPOND, il y a l'analyse du HTML puis l'hydratation. On mesure donc,
 *   à ×1, ×4 et ×6 (un milieu de gamme, puis un téléphone bon marché) :
 *   le temps de blocage total (somme des tâches longues au-delà de 50 ms)
 *   et — la mesure qui compte — le temps au bout duquel une PRESSION DE
 *   TOUCHE change enfin de chapitre.
 *
 * CE QU'IL NE DIT RIEN DE : le coût du RÉSEAU RÉEL (DNS, TLS, CDN, cache
 * de Vercel). Tout ceci est un build local servi par `next start`. Le
 * poids, lui, est transposable — ce sont les mêmes octets.
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync } from "node:fs";
import http from "node:http";

const BASE = process.env.BASE ?? "http://127.0.0.1:3495";
const { hostname, port } = new URL(BASE);

const lecons = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  if (!existsSync(d) || !readdirSync(d).length) continue;
  for (const s of readdirSync(d)) {
    if (existsSync(`${d}/${s}/lesson.md`)) lecons.push(`/notions/${m}/${s}`);
  }
}
const AUTRES = ["/", "/matieres/maths", "/matieres/pc", "/matieres/svt", "/examens",
                "/examens/spc-2023-normale", "/commencer", "/atelier"];
const TOUTES = [...AUTRES, ...lecons];

const ko = (n) => (n / 1024).toFixed(0).padStart(5);

/* ── PASSE A — le document seul, sur tout le corpus ──────────────────── */
function tirer(route) {
  return new Promise((res, rej) => {
    const t0 = Date.now();
    let ttfb = 0, octets = 0;
    const req = http.get(
      { hostname, port, path: route, headers: { "accept-encoding": "gzip, br", "user-agent": "poids-sweep" } },
      (r) => {
        ttfb = Date.now() - t0;
        r.on("data", (c) => (octets += c.length));
        r.on("end", () => res({ route, ttfb, octets, code: r.statusCode, enc: r.headers["content-encoding"] ?? "brut" }));
      },
    );
    req.on("error", rej);
    req.setTimeout(20000, () => { req.destroy(new Error("délai dépassé")); });
  });
}

console.log("=== PASSE A — le document HTML seul (compressé comme le navigateur le reçoit)\n");
const docs = [];
for (const r of TOUTES) {
  try { docs.push(await tirer(r)); }
  catch (e) { console.log(`  !! ${r} — ${e.message}`); }
}
docs.sort((a, b) => b.octets - a.octets);
const total = docs.reduce((s, d) => s + d.octets, 0);
console.log(`  ${docs.length} routes · document médian ${ko(docs[Math.floor(docs.length / 2)].octets)} ko · somme ${(total / 1024 / 1024).toFixed(1)} Mo\n`);
console.log("  LES DIX PLUS LOURDES");
for (const d of docs.slice(0, 10)) console.log(`  ${ko(d.octets)} ko  ${String(d.ttfb).padStart(4)} ms  ${d.code}  ${d.enc.padEnd(4)}  ${d.route}`);
console.log("\n  LES TROIS PLUS LÉGÈRES (pour l'échelle)");
for (const d of docs.slice(-3)) console.log(`  ${ko(d.octets)} ko  ${String(d.ttfb).padStart(4)} ms  ${d.code}  ${d.enc.padEnd(4)}  ${d.route}`);
const nonOk = docs.filter((d) => d.code !== 200);
if (nonOk.length) { console.log("\n  !! CODES NON-200"); for (const d of nonOk) console.log(`     ${d.code}  ${d.route}`); }

/* ── PASSE B — un vrai navigateur, LCP + poids total ─────────────────── */
const ECHANTILLON = [...new Set([
  "/", "/examens", "/examens/spc-2023-normale", "/matieres/pc",
  ...docs.slice(0, 3).map((d) => d.route),
  "/notions/maths/suites-numeriques", "/notions/pc/rlc-serie",
  ...docs.slice(-1).map((d) => d.route),
])];

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const TYPES = { script: "js", link: "css", css: "css", font: "fonte", img: "image", image: "image", navigation: "doc", fetch: "fetch", xmlhttprequest: "fetch", other: "autre" };

for (const lent of [false, true]) {
  console.log(`\n=== PASSE B — ${lent ? "3G lent (400 kb/s, 400 ms de latence)" : "réseau libre"}\n`);
  console.log("   LCP     TTFB    poids   route");
  for (const r of ECHANTILLON) {
    const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    if (lent) await cdp.send("Network.emulateNetworkConditions", {
      offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 });
    await p.addInitScript(() => {
      window.__lcp = 0; window.__lcpEl = "";
      try {
        new PerformanceObserver((l) => {
          const e = l.getEntries().at(-1);
          if (!e) return;
          window.__lcp = e.startTime;
          const n = e.element;
          window.__lcpEl = n ? `${n.tagName.toLowerCase()}${n.className ? "." + String(n.className).trim().split(/\s+/)[0] : ""}` : "(sans élément)";
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}
    });
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 120000 });
    await p.waitForTimeout(lent ? 5000 : 1800);
    const m = await p.evaluate((TYPES) => {
      const n = performance.getEntriesByType("navigation")[0];
      const parType = {}; let poids = n ? n.transferSize : 0;
      parType.doc = n ? n.transferSize : 0;
      const gros = [];
      for (const e of performance.getEntriesByType("resource")) {
        const t = e.initiatorType === "link" && /\.woff2?($|\?)/.test(e.name) ? "fonte"
                : e.initiatorType === "css" && /\.woff2?($|\?)/.test(e.name) ? "fonte"
                : (TYPES[e.initiatorType] ?? "autre");
        parType[t] = (parType[t] ?? 0) + e.transferSize;
        poids += e.transferSize;
        gros.push({ n: e.name.replace(location.origin, ""), o: e.transferSize, t });
      }
      gros.sort((a, b) => b.o - a.o);
      return { lcp: window.__lcp, lcpEl: window.__lcpEl, ttfb: n ? n.responseStart - n.requestStart : 0,
               poids, parType, gros: gros.slice(0, 5), noeuds: document.querySelectorAll("*").length };
    }, TYPES);
    const s = (x) => (x / 1000).toFixed(2) + " s";
    const verdict = m.lcp > 4000 ? "MAUVAIS" : m.lcp > 2500 ? "à améliorer" : "bon";
    console.log(`  ${s(m.lcp).padStart(7)} ${String(Math.round(m.ttfb)).padStart(5)} ms ${ko(m.poids)} ko  ${r}   [${verdict}]`);
    const vent = Object.entries(m.parType).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k} ${(v / 1024).toFixed(0)}`).join(" · ");
    console.log(`          ${vent} ko · ${m.noeuds} nœuds · LCP sur ${m.lcpEl}`);
    if (!lent) for (const g of m.gros) console.log(`          ${(g.o / 1024).toFixed(0).padStart(5)} ko  ${g.t.padEnd(6)} ${g.n.slice(0, 78)}`);
    await ctx.close();
  }
}
/* ── PASSE C — processeur bridé : quand la page RÉPOND-elle ? ────────── */
const TEMOINS = [
  "/notions/pc/reactions-acido-basiques", // la plus dense en formules
  "/notions/maths/suites-numeriques",
  "/notions/pc/rlc-serie",
  "/notions/svt/moyens-de-defense",       // une leçon SANS formules : le témoin
  "/examens/spc-2023-normale",
  "/",
];

for (const cpu of [1, 4, 6]) {
  console.log(`\n=== PASSE C — processeur bridé ×${cpu}${cpu === 1 ? " (machine de développement)" : cpu === 4 ? " (milieu de gamme)" : " (téléphone bon marché)"}\n`);
  for (const r of TEMOINS) {
    const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    if (cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
    await p.addInitScript(() => {
      window.__bloc = 0; window.__n = 0;
      try {
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) { window.__bloc += Math.max(0, e.duration - 50); window.__n++; }
        }).observe({ type: "longtask", buffered: true });
      } catch {}
    });
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 240000 });

    // La PREUVE de réactivité : on presse une touche jusqu'à ce que le
    // chapitre change vraiment. Attendre un marqueur du DOM ne prouve rien —
    // le serveur rend déjà le chapitre 0 comme actif.
    let reactif = null;
    if ((await p.locator("[data-chapter-section]").count()) > 1) {
      const t0 = Date.now();
      for (let i = 0; i < 500; i++) {
        await p.keyboard.press("ArrowRight");
        const actif = await p.evaluate(
          () => document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "0",
        );
        if (actif !== "0") { reactif = Date.now() - t0; break; }
        await p.waitForTimeout(50);
      }
    }
    await p.waitForTimeout(1500);
    const m = await p.evaluate(() => ({ bloc: window.__bloc, n: window.__n, noeuds: document.querySelectorAll("*").length }));
    console.log(
      `  ${String(Math.round(m.bloc)).padStart(6)} ms bloqués sur ${String(m.n).padStart(2)} tâches longues · ` +
        `réactif après ${(reactif === null ? "—" : reactif + " ms").padStart(8)} · ${String(m.noeuds).padStart(6)} nœuds · ${r}`,
    );
    await ctx.close();
  }
}

await nav.close();
