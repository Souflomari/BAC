/**
 * tab-corrige.mjs — l'ordre de tabulation COMPLET d'un corrigé d'épreuve, par
 * type d'élément (HANDOFF §11.39) : combien de Tab pour le parcourir, et sur
 * quoi. A trouvé : 243 arrêts (144 radios, 99 paragraphes que Chrome 130 rend
 * focalisables via l'`overflow-x` de la prose, 4 liens).
 *   node scripts/tab-corrige.mjs   (⚠️ depuis web/, serveur sur :3911)
 */
import { chromium } from "playwright-core";
// Même défaut qu'avant (:3911, la convention écrite dans l'en-tête) —
// BASE permet en plus de viser un serveur déjà debout.
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const p = await nav.newPage({ viewport: { width: Number(process.env.W ?? 1280), height: 900 } });
await p.goto(BASE + "/examens/sm-2025-normale", { waitUntil: "load" }); await p.waitForFunction(() => !!window.__bacVivant);
await p.getByRole("button", { name: /commencer/i }).first().click(); await p.waitForSelector("[data-sujet-complet]", { timeout: 60000 });
await p.getByRole("button", { name: /terminer/i }).first().click(); await p.waitForSelector("[data-corrige-complet]", { timeout: 60000 });
await p.evaluate(() => { const g = document.querySelector("[data-exam-exo]"); const b = document.createElement("button"); b.id = "amorce"; g.parentElement.insertBefore(b, g); b.focus(); });
const tally = new Map(); const ps = [];
for (let i = 0; i < 500; i++) {
  await p.keyboard.press("Tab");
  const e = await p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return null; const cs = getComputedStyle(a); return { k: `${a.tagName.toLowerCase()}[${a.getAttribute("role") || ""}]`, p: a.tagName === "P" ? `ov=${cs.overflowX} ${a.scrollWidth}/${a.clientWidth} tabindex=${a.getAttribute("tabindex")} cls=${(a.className || "").toString().slice(0, 40)} « ${a.textContent.trim().slice(0, 30)} »` : null, fin: a.closest("footer") != null }; });
  if (!e || e.fin) break;
  tally.set(e.k, (tally.get(e.k) || 0) + 1); if (e.p) ps.push(e.p);
}
console.log([...tally].map(([k, v]) => `${v} × ${k}`).join(" · "));
console.log(`paragraphes focalisés : ${ps.length}${ps.length ? "\n  " + ps.slice(0, 4).join("\n  ") : ""}`);
await nav.close();
