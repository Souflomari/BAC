/**
 * noms-accessibles.mjs — WCAG 4.1.2 : toute commande a-t-elle un NOM accessible
 * (HANDOFF §11.41) ? Un bouton/lien/champ dont l'arbre d'accessibilité ne
 * donne aucun nom s'annonce « bouton » — l'élève au lecteur d'écran ne sait
 * pas ce qu'il déclenche. Balaie 9 pages types à 390 et 1 280 px : aria-label,
 * aria-labelledby, texte, title, alt d'image, <title> de SVG, <label> associé.
 * A trouvé : 0, sur les pages ET les états révélés (sujet, corrigé, atelier
 * démarré, menus ouverts — vérifiés le 2026-09-11). ROUGE si une commande
 * visible n'a aucun nom (exit 1). Un résultat négatif qui valait d'être posé.
 *   BASE=http://127.0.0.1:3911 node scripts/noms-accessibles.mjs   (⚠️ depuis web/)
 */
// Commandes SANS nom accessible (WCAG 4.1.2) : bouton/lien/champ dont l'arbre
// d'accessibilité ne donne aucun nom — un lecteur d'écran annonce « bouton ».
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const routes = ["/", "/examens", "/examens/sm-2025-normale", "/notions/pc/rlc-serie", "/notions/philo/la-verite", "/commencer", "/connexion", "/atelier", "/matieres/svt"];
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
let total = 0;
for (const w of [390, 1280]) {
  const ctx = await nav.newContext({ viewport: { width: w, height: 900 } }); const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 60000 });
    await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    const sans = await p.evaluate(() => {
      const acc = (el) => { const al = el.getAttribute("aria-label"); if (al && al.trim()) return al; const lb = el.getAttribute("aria-labelledby"); if (lb) return lb.split(/\s+/).map((id) => document.getElementById(id)?.textContent || "").join(" ").trim(); const t = (el.textContent || "").trim(); if (t) return t; const title = el.getAttribute("title"); if (title) return title; const img = el.querySelector("img[alt]"); if (img && img.alt.trim()) return img.alt; const svgTitle = el.querySelector("svg title"); if (svgTitle && svgTitle.textContent.trim()) return svgTitle.textContent; return ""; };
      const cibles = [...document.querySelectorAll("button, a[href], input:not([type=hidden]), select, textarea, [role=button], [role=link]")].filter((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden"; });
      return cibles.filter((el) => !acc(el) && !(el.tagName === "INPUT" && el.labels && el.labels.length && [...el.labels].some((l) => l.textContent.trim()))).map((el) => `${el.tagName.toLowerCase()}${el.getAttribute("role") ? "[" + el.getAttribute("role") + "]" : ""}.${(el.className || "").toString().split(" ")[0]}`);
    });
    total += sans.length;
    if (sans.length) console.log(`${String(w).padStart(4)} px ${r.padEnd(30)} ${sans.length} sans nom : ${[...new Set(sans)].slice(0, 5).join(" | ")}`);
  }
  await ctx.close();
}
console.log(`TOTAL commandes sans nom accessible : ${total}`);
await nav.close();
process.exit(total ? 1 : 0);
