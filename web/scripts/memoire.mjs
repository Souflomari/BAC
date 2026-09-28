/**
 * memoire.mjs — la MÉMOIRE d'une page : tas JavaScript après ramasse-miettes,
 * nœuds DOM, écouteurs (CDP `Performance.getMetrics`) ; la fuite ; l'empreinte
 * réelle du processus de rendu (VmRSS, lu dans /proc — Linux seulement).
 *
 * POURQUOI (2026-09-11, HANDOFF §11.31). Un téléphone à 2 Go tue l'onglet
 * qui grossit ; « deux heures à un bureau » (DESIGN-BIBLE §9) veut dire que
 * soixante changements de chapitre ne doivent rien laisser derrière eux.
 * Jamais mesuré.
 *
 * QUATRE MODES, viewport 390 × 780, réseau libre :
 *   lecons   — les 62 leçons prérendues : tas, nœuds, écouteurs ; médianes,
 *              les 8 plus lourdes, les 3 plus légères.
 *   fuite    — 3 leçons, 30 puis 60 changements de chapitre au clavier : tas
 *              avant/après (après ramasse-miettes), nœuds, écouteurs.
 *   epreuves — 3 épreuves : avant, sujet révélé, corrigé révélé.
 *   rss      — VmRSS du processus de rendu pour 4 leçons et une épreuve
 *              corrigée (le chiffre qui compte pour un téléphone).
 *
 * A trouvé : tas 6,8–11 Mo, aucune fuite (10,8 → 11,2 → 10,6 Mo), 2 300 à
 * 66 000 nœuds dont 97 % dans des chapitres repliés et 90 % de KaTeX (31 % de
 * MathML masqué) ; VmRSS 166 Mo (leçon légère) → 226 Mo (lourde) → 296 Mo
 * (épreuve corrigée, 55–77 k nœuds).
 *
 * Pas une porte : des tailles qui dépendent du navigateur et de sa version ;
 * un instrument de comparaison. `BASE=… node scripts/memoire.mjs [lecons|fuite|epreuves|rss]`  (⚠️ depuis web/)
 */
// La MÉMOIRE d'une page : tas JavaScript (après ramasse-miettes), nœuds DOM,
// écouteurs — sur les 62 leçons ; puis la fuite : 30 changements de chapitre
// sur 3 leçons, tas avant/après ; puis 3 épreuves après révélation complète.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const racine = join(process.cwd(), ".next/server/app/notions");
const lecons = [];
(function marcher(d) { for (const e of readdirSync(d)) { const p = join(d, e); if (statSync(p).isDirectory()) marcher(p); else if (p.endsWith(".html")) lecons.push("/notions" + p.slice(racine.length).replace(/\.html$/, "")); } })(racine);
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send("Performance.enable"); await cdp.send("HeapProfiler.enable");
const mesure = async () => {
  await cdp.send("HeapProfiler.collectGarbage");
  await p.waitForTimeout(150);
  const m = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
  return { tas: Math.round(m.JSHeapUsedSize / 1048576 * 10) / 10, total: Math.round(m.JSHeapTotalSize / 1048576), noeuds: m.Nodes, ecouteurs: m.JSEventListeners, docs: m.Documents, frames: m.Frames };
};
const mode = process.argv[2] ?? "lecons";
if (mode === "lecons") {
  const res = [];
  for (const r of lecons.sort()) {
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 120000 });
    await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(300);
    res.push({ r, ...(await mesure()) });
  }
  res.sort((a, b) => b.tas - a.tas);
  const med = (k) => { const v = res.map((x) => x[k]).sort((a, b) => a - b); return v[Math.floor(v.length / 2)]; };
  console.log(`${res.length} leçons · tas médian ${med("tas")} Mo (max ${res[0].tas} Mo, ${res[0].r}) · nœuds médian ${med("noeuds")} (max ${Math.max(...res.map((x) => x.noeuds))}) · écouteurs médian ${med("ecouteurs")} (max ${Math.max(...res.map((x) => x.ecouteurs))})`);
  for (const x of res.slice(0, 8)) console.log(`  ${x.r.padEnd(46)} tas ${String(x.tas).padStart(5)} Mo · total ${String(x.total).padStart(3)} Mo · nœuds ${String(x.noeuds).padStart(6)} · écouteurs ${String(x.ecouteurs).padStart(5)} · docs ${x.docs} · frames ${x.frames}`);
  console.log("  … les plus légères :");
  for (const x of res.slice(-3)) console.log(`  ${x.r.padEnd(46)} tas ${String(x.tas).padStart(5)} Mo · nœuds ${String(x.noeuds).padStart(6)} · écouteurs ${String(x.ecouteurs).padStart(5)}`);
} else if (mode === "fuite") {
  for (const r of ["/notions/pc/rlc-serie", "/notions/maths/suites-numeriques", "/notions/philo/la-verite"]) {
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 120000 });
    await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(500);
    const avant = await mesure();
    const total = await p.evaluate(() => document.querySelectorAll("[data-chapter-index]").length);
    for (let i = 0; i < 30; i++) { await p.keyboard.press(i % (2 * (total - 1)) < total - 1 ? "ArrowRight" : "ArrowLeft"); await p.waitForTimeout(120); }
    await p.waitForTimeout(500);
    const milieu = await mesure();
    for (let i = 0; i < 30; i++) { await p.keyboard.press(i % (2 * (total - 1)) < total - 1 ? "ArrowRight" : "ArrowLeft"); await p.waitForTimeout(120); }
    await p.waitForTimeout(500);
    const apres = await mesure();
    console.log(`${r.padEnd(36)} ${total} chapitres · tas ${avant.tas} → ${milieu.tas} → ${apres.tas} Mo (30, 60 changements) · nœuds ${avant.noeuds} → ${milieu.noeuds} → ${apres.noeuds} · écouteurs ${avant.ecouteurs} → ${milieu.ecouteurs} → ${apres.ecouteurs}`);
  }
} else if (mode === "rss") {
  const { readFileSync } = await import("node:fs");
  const rss = (pid) => { try { return Math.round(Number(readFileSync(`/proc/${pid}/status`, "utf8").match(/VmRSS:\s+(\d+)/)[1]) / 1024); } catch { return null; } };
  for (const r of ["/notions/svt/soi-non-soi", "/notions/pc/rlc-serie", "/notions/pc/reactions-acido-basiques", "/notions/maths/geometrie-espace", "/examens/sm-2025-normale"]) {
    const c2 = await nav.newContext({ viewport: { width: 390, height: 780 } }); const p2 = await c2.newPage();
    await p2.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 120000 });
    await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 60000 }).catch(() => {});
    if (r.startsWith("/examens")) { await p2.getByRole("button", { name: /commencer/i }).first().click({ timeout: 5000 }).catch(() => {}); await p2.waitForSelector("[data-sujet-complet]", { timeout: 120000 }).catch(() => {}); await p2.getByRole("button", { name: /terminer/i }).first().click({ timeout: 5000 }).catch(() => {}); await p2.waitForSelector("[data-corrige-complet]", { timeout: 120000 }).catch(() => {}); }
    await p2.waitForTimeout(1500);
    const b = await nav.newBrowserCDPSession();
    const procs = (await b.send("SystemInfo.getProcessInfo")).processInfo.filter((x) => x.type === "renderer");
    const pid = procs.map((x) => x.id).sort((a, b2) => b2 - a)[0];
    const elements = await p2.evaluate(() => document.getElementsByTagName("*").length);
    console.log(`${r.padEnd(40)} VmRSS ${rss(pid) ?? "? (pas de /proc)"} Mo · éléments ${elements}`);
    await b.detach(); await c2.close();
  }
} else if (mode === "epreuves") {
  for (const r of ["/examens/sm-2025-normale", "/examens/spc-2024-rattrapage", "/examens/svt-2023-normale"]) {
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 120000 }).catch(() => {});
    await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 60000 }).catch(() => {});
    const avant = await mesure();
    const ok = await p.getByRole("button", { name: /commencer/i }).first().click({ timeout: 5000 }).then(() => true).catch(() => false);
    if (!ok) { console.log(`${r.padEnd(32)} pas de bouton Commencer — page absente ?`); continue; }
    await p.waitForSelector("[data-sujet-complet]", { timeout: 120000 }).catch(() => {});
    const sujet = await mesure();
    await p.getByRole("button", { name: /terminer/i }).first().click({ timeout: 5000 }).catch(() => {});
    await p.waitForSelector("[data-corrige-complet]", { timeout: 120000 }).catch(() => {});
    const corrige = await mesure();
    console.log(`${r.padEnd(32)} tas ${avant.tas} → sujet ${sujet.tas} → corrigé ${corrige.tas} Mo (total ${corrige.total} Mo) · nœuds ${avant.noeuds} → ${sujet.noeuds} → ${corrige.noeuds} · écouteurs ${corrige.ecouteurs}`);
  }
}
await nav.close();
console.log("FIN=0");
