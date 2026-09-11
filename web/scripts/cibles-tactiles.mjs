/**
 * cibles-tactiles.mjs — WCAG 2.5.8 (AA, 24×24 px) et 2.5.5 (AAA, 44×44) : la
 * taille des commandes tactiles sur téléphone (390 px). A trouvé : au niveau
 * AA, seules restent sous 24×24 des cibles EXEMPTÉES — le lien d'évitement
 * (masqué, 1×1) et les liens « Revoir la notion » (18 px, mais liens de texte
 * dans leur propre bloc = exception « en ligne » + espacement). Les radios
 * d'auto-évaluation sont `min-h-touch` (≥ 44). L'AAA (44×44) a des manques
 * assumés sur un produit calme, orienté bureau (HANDOFF §11.42).
 *   BASE=http://127.0.0.1:3911 node scripts/cibles-tactiles.mjs   (⚠️ depuis web/)
 */
// WCAG 2.5.8 (AA, 24×24 min) et 2.5.5 (AAA, 44×44) : les commandes tactiles.
// Une commande sous 24×24 sans espacement de 24 px autour est un échec AA.
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await nav.newPage({ viewport: { width: 390, height: 780 }, hasTouch: true });
const mesure = async (etiq) => {
  const petites = await p.evaluate(() => {
    const cibles = [...document.querySelectorAll("button, a[href], [role=button], [role=radio], input:not([type=hidden]), select")].filter((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden"; });
    return cibles.map((el) => { const r = el.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), t: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 24), tag: el.tagName.toLowerCase() + (el.getAttribute("role") ? "[" + el.getAttribute("role") + "]" : "") }; }).filter((x) => x.w < 24 || x.h < 24);
  });
  console.log(`  ${etiq.padEnd(16)} sous 24×24 : ${petites.length}${petites.length ? " → " + petites.slice(0, 4).map((x) => `${x.tag} ${x.w}×${x.h} « ${x.t} »`).join(" ; ") : ""}`);
  const sous44 = await p.evaluate(() => [...document.querySelectorAll("button, a[href], [role=button], [role=radio]")].filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44); }).length);
  console.log(`  ${" ".repeat(16)} sous 44×44 (AAA) : ${sous44}`);
};
for (const [r, wait] of [["/", null], ["/notions/pc/rlc-serie", null], ["/matieres/svt", null]]) { await p.goto(`${BASE}${r}`, { waitUntil: "load" }); await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {}); await mesure(r); }
await p.goto(`${BASE}/examens/sm-2025-normale`, { waitUntil: "load" }); await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 });
await p.getByRole("button", { name: /commencer/i }).first().click(); await p.waitForSelector("[data-sujet-complet]", { timeout: 60000 });
await p.getByRole("button", { name: /terminer/i }).first().click(); await p.waitForSelector("[data-corrige-complet]", { timeout: 60000 });
await mesure("épreuve corrigé");
await nav.close();
