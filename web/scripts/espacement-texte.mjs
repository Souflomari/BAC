/**
 * espacement-texte.mjs — WCAG 1.4.12 : l'élève impose interligne 1,5,
 * paragraphes 2 em, lettres 0,12 em, mots 0,16 em (une extension de lecture,
 * une dyslexie). Rien ne doit être coupé ni sortir du cadre.
 *
 * POURQUOI (2026-09-11, HANDOFF §11.38). Jamais mesuré. Le balayage n'a
 * trouvé ni débord ni texte hors cadre, mais il a fait sortir les
 * troncatures « … » de l'accueil et des épreuves — qui coupaient déjà à
 * l'espacement NORMAL sur téléphone (7 titres sur 62, 24 sous-titres sur 24).
 *
 * CE QU'ON MESURE, par page, à 390 et 1 280 px, surcharges appliquées :
 * le débord horizontal du document ; les éléments à `overflow: hidden/clip`
 * dont le contenu dépasse (texte COUPÉ), hors KaTeX, SVG, chapitres repliés
 * et `sr-only` ; les blocs de texte qui sortent de la fenêtre. Ce qui reste
 * « coupé » par conception : les infobulles du rail (28 ch), les figures à
 * transport. Un instrument, pas une porte.
 *
 *   BASE=http://127.0.0.1:3911 node scripts/espacement-texte.mjs [routes…]   (⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/examens", "/examens/sm-2025-normale", "/notions/pc/rlc-serie", "/notions/philo/la-verite", "/commencer", "/matieres/svt"];
const CSS = "* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }";
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
for (const largeur of [390, 1280]) {
  const ctx = await nav.newContext({ viewport: { width: largeur, height: 900 } });
  const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 60000 });
    await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 30000 }).catch(() => {});
    await p.addStyleTag({ content: CSS });
    await p.waitForTimeout(300);
    const e = await p.evaluate(() => {
      const de = document.documentElement;
      const debord = de.scrollWidth - de.clientWidth;
      // texte COUPÉ : un élément overflow hidden/clip dont le contenu déborde (hors KaTeX/SVG, qui défilent exprès)
      const coupes = [...document.querySelectorAll("body *")].filter((el) => {
        if (el.closest(".katex, svg, [data-chapter-section][hidden], [hidden]") || el.matches(".sr-only")) return false;
        const cs = getComputedStyle(el);
        if (!/hidden|clip/.test(cs.overflowY) && !/hidden|clip/.test(cs.overflowX)) return false;
        if (!(el.textContent || "").trim()) return false;
        const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) return false;
        return el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2;
      }).map((el) => `${el.parentElement?.tagName.toLowerCase()}${el.parentElement?.className && typeof el.parentElement.className === "string" ? "." + el.parentElement.className.trim().split(/\s+/)[0] : ""} > ${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/)[0] : ""} « ${(el.textContent || "").trim().slice(0, 30)} » (${el.scrollWidth}/${el.clientWidth}×${el.scrollHeight}/${el.clientHeight})`);
      // texte qui SORT de la fenêtre (hors conteneurs qui défilent)
      const sortent = [...document.querySelectorAll("main p, main li, main h1, main h2, main h3, header button, header a")].filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > de.clientWidth + 1 && !el.closest("[style*='overflow'], .overflow-x-auto, .katex, pre, table"); }).length;
      return { debord, coupes: coupes.slice(0, 4), nCoupes: coupes.length, sortent };
    });
    console.log(`${String(largeur).padStart(4)} px ${r.padEnd(28)} débord ${e.debord}px · coupés ${e.nCoupes}${e.nCoupes ? " : " + e.coupes.join(" ; ") : ""} · sortent ${e.sortent}`);
  }
  await ctx.close();
}
await nav.close();
