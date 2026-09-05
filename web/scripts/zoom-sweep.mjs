/**
 * Balayage ZOOM — le corpus entier avec le texte doublé (WCAG 2.2 SC 1.4.4).
 *
 * « Le texte peut être redimensionné jusqu'à 200 % sans perte de contenu ni de
 * fonctionnalité. » On double la taille de la racine (16 → 32 px : l'échelle
 * typographique est en `rem`, elle suit) et on mesure deux choses :
 *
 *   · le DÉBORD horizontal du document — du contenu poussé hors cadre ;
 *   · le texte COUPÉ — une boîte qui cache son débordement. C'est la perte
 *     silencieuse, et c'est la pire des deux : rien ne la signale à l'élève.
 *
 * Quand il y a débord, on remonte le coupable par BISSECTION : masquer un
 * enfant, regarder si le débord disparaît, descendre. C'est ce qui a désigné
 * la piste de grille du masthead, puis les tableaux, là où une inspection à
 * l'œil aurait accusé le titre.
 *
 * TROIS EXCLUSIONS, faux positifs par construction : `sr-only` (masqué
 * jusqu'au focus), `katex-mathml` (la couche MathML, masquée par nature), et
 * tout `text-overflow: ellipsis` (troncature VOULUE, doublée d'un `title`).
 * Une quatrième, mesurée : l'opacité effective — une infobulle de rail est
 * « coupée » en permanence, et c'est son fonctionnement.
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:3457";
const lecons = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  for (const s of readdirSync(d)) if (existsSync(`${d}/${s}/lesson.md`)) lecons.push(`/notions/${m}/${s}`);
}
const routes = [...lecons, "/", "/examens", "/examens/spc-2023-normale", "/matieres/pc", "/commencer"];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
for (const W of [1280, 360]) {
  const p = await b.newPage({ viewport: { width: W, height: 900 } });
  const soucis = [];
  for (const r of routes) {
    await p.goto(`${BASE}${r}`, { waitUntil: "networkidle" });
    const m = await p.evaluate(async () => {
      // LES FONTES D'ABORD (2026-09-05). Sous charge — trois navigateurs et
      // deux serveurs sur la même machine —, `networkidle` arrive avant que
      // les fontes du site soient posées, et la mesure se fait avec les
      // métriques du SUBSTITUT, plus large : 61 débords de 47 à 200 px sur des
      // pages qui, seules et à froid, mesurent 0. Une largeur qui dépend de
      // l'instant où on la lit n'est pas une mesure. On attend les fontes.
      await document.fonts.ready;
      document.querySelectorAll("[data-chapter-section]").forEach((s) => (s.hidden = false));
      // SC 1.4.4 : texte redimensionnable à 200 % sans perte de contenu.
      document.documentElement.style.fontSize = "32px";
      const W = window.innerWidth;
      const debord = document.documentElement.scrollWidth - W;
      // Bissection : masquer un enfant, regarder si le débord disparaît.
      let chemin = [];
      if (debord > 1) {
        const trop = () => document.documentElement.scrollWidth > W + 1;
        let noeud = document.body;
        for (let prof = 0; prof < 25; prof++) {
          let suivant = null;
          for (const c of noeud.children) {
            const d = c.style.display; c.style.display = "none";
            const parti = !trop(); c.style.display = d;
            if (parti) { suivant = c; break; }
          }
          if (!suivant) break;
          chemin.push(`${suivant.tagName.toLowerCase()}.${String(suivant.className).trim().split(/\s+/).slice(0,2).join(".")}`);
          noeud = suivant;
        }
        if (noeud !== document.body) chemin.push(`FEUILLE « ${(noeud.textContent||"").trim().replace(/\s+/g," ").slice(0,50)} »`);
      }
      // texte COUPÉ : une boîte qui cache son contenu débordant.
      const coupes = [];
      for (const el of document.querySelectorAll("main *")) {
        const cs = getComputedStyle(el);
        if (cs.overflow !== "hidden" && cs.overflowY !== "hidden" && cs.overflowX !== "hidden") continue;
        if (!el.textContent || !el.textContent.trim()) continue;
        // Les éléments VISUELLEMENT MASQUÉS (lien d'évitement, MathML de
        // KaTeX, libellé de rail hors cadre) sont coupés par construction :
        // c'est leur fonctionnement, pas une perte de contenu.
        const cl = String(el.className);
        if (/sr-only|katex-mathml/.test(cl)) continue;
        // `truncate` = troncature VOULUE avec ellipse, et le libellé complet
        // vit dans un `title`. Ce n'est pas une perte silencieuse.
        if (cs.textOverflow === "ellipsis") continue;
        const q = el.getBoundingClientRect();
        if (q.right <= 0 || q.left >= window.innerWidth) continue;
        let op = 1;
        for (let n = el; n; n = n.parentElement) op *= parseFloat(getComputedStyle(n).opacity || "1");
        if (op < 0.1) continue; // infobulle au survol, etc.
        const dy = el.scrollHeight - el.clientHeight;
        const dx = el.scrollWidth - el.clientWidth;
        if ((dy > 2 || dx > 2) && el.clientHeight > 0) {
          // ignorer les conteneurs qui défilent volontairement
          if (cs.overflowX === "auto" || cs.overflowY === "auto" || cs.overflowX === "scroll") continue;
          coupes.push(`${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0,2).join(".")} (+${Math.max(dx,dy)}px) « ${el.textContent.trim().replace(/\s+/g," ").slice(0,30)} »`);
        }
      }
      document.documentElement.style.fontSize = "";
      return { debord, chemin, coupes: [...new Set(coupes)].slice(0, 3) };
    });
    if (m.debord > 1) soucis.push(`${r} @${W} débord ${m.debord}px — ${m.chemin.join(' > ')}`);
    for (const c of m.coupes) soucis.push(`${r} @${W} COUPÉ ${c}`);
  }
  console.log(`\n=== ${W}px, texte à 200 % — ${soucis.length} signalement(s)`);
  for (const x of soucis.slice(0, 25)) console.log(`  ✗ ${x}`);
  await p.close();
}
await b.close();
