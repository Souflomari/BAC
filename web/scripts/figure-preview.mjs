/**
 * figure-preview.mjs — l'audit VISUEL d'une figure, sans lancer le site.
 *
 * Pourquoi : `validate-content` vérifie la STRUCTURE d'une figure (compte
 * d'étapes == max step-N, contrat de couleurs), jamais son RENDU. Or le
 * défaut n°1 constaté sur les figures est visuel : étiquettes qui se
 * chevauchent, courbe qui sort du cadre, repère écrasé. La bible §10 exige
 * de REGARDER — cet outil rend ce regard bon marché : il compose une page
 * autonome avec les vrais jetons du thème et capture chaque figure.
 *
 * Usage :
 *   node scripts/figure-preview.mjs <chemin-svg> [<chemin-svg>…]
 *   node scripts/figure-preview.mjs --dark content/pc/rlc-serie/media/regimes-uc.svg
 *
 * Sort les PNG dans le dossier temporaire annoncé en fin d'exécution ; TOUS
 * les groupes step-N sont visibles à la fois — c'est l'état où tout se
 * superpose, donc celui qui révèle les collisions.
 *
 * PIÈGE PAYÉ (2026-08-22, à ne pas refaire) : l'extraction des jetons doit
 * être SENSIBLE À LA CASSE des noms — `--figure-energy-C` et
 * `--figure-energy-L` finissent par une majuscule. Une classe `[a-z0-9-]+`
 * les laisse tomber, la variable n'est pas déclarée, et les courbes
 * d'énergie deviennent INVISIBLES : on croit à une figure cassée alors que
 * c'est l'instrument qui ment. Le premier audit de cette session a failli
 * déclarer un faux défaut sur `diagrammes-energie-elastique` pour cette
 * raison exacte.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { chromium } from "playwright-core";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RACINE = path.dirname(WEB);

const args = process.argv.slice(2);
const sombre = args.includes("--dark");
const fichiers = args.filter((a) => !a.startsWith("--"));

if (fichiers.length === 0) {
  console.error("usage: node scripts/figure-preview.mjs [--dark] <chemin-svg>…");
  process.exit(1);
}

// Les jetons du thème demandé, depuis la source générée.
const css = readFileSync(path.join(WEB, "src/app/tokens.generated.css"), "utf8");
const bloc = sombre ? css.slice(css.indexOf(".dark")) : css.slice(0, css.indexOf(".dark"));
// [A-Za-z0-9-] et non [a-z0-9-] — voir PIÈGE PAYÉ en tête de fichier.
const jetons = [...bloc.matchAll(/(--(?:figure|color)-[A-Za-z0-9-]+):\s*([^;]+);/g)];
const declarations = jetons.map(([, k, v]) => `  ${k}: ${v.trim()};`).join("\n");

/**
 * PIÈGE PAYÉ N°2 (2026-09-03) — l'instrument rendait des carrés de 26 px.
 *
 * Le contrat de figure impose `viewBox` SEUL, sans width/height : c'est ce
 * qui laisse le composant décider de la taille en page. Mais un SVG sans
 * width/height n'a pas de taille intrinsèque, et son défaut CSS (100 %)
 * ne peut pas se résoudre dans un conteneur en `width: max-content` — la
 * dépendance est circulaire. Chromium tranchait autrefois en faveur du
 * 300×150 par défaut ; il tranche désormais à ZÉRO. Les captures
 * mesuraient alors 26×26 — exactement le padding (2×12) plus la bordure
 * (2×1) de la carte, un SVG effondré à rien.
 *
 * Le défaut était SILENCIEUX de la pire façon : la sonde de débordement et
 * de chevauchement continuait d'annoncer « aucun défaut » (getBBox() lit
 * le système de coordonnées du viewBox, indifférent à la taille rendue),
 * si bien que l'outil affirmait une figure saine en produisant une image
 * vide. Un instrument d'audit VISUEL qui ne montre rien tout en certifiant
 * que tout va bien est pire que pas d'instrument.
 *
 * Le correctif dimensionne chaque SVG depuis son propre viewBox, ICI, dans
 * le harnais — jamais dans le fichier, qui doit rester conforme au
 * contrat. Taille naturelle préservée (1 unité de viewBox = 1 px), donc la
 * remarque du 2026-08-22 sur la stabilité des métriques tient toujours.
 */
const cartes = fichiers
  .map((f) => {
    const abs = path.isAbsolute(f) ? f : path.join(RACINE, f);
    const svg = readFileSync(abs, "utf8").replace(/<\?xml[^>]*\?>/, "");
    const vb = svg.match(/viewBox="\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*"/);
    if (!vb) {
      console.error(`  ✗ ${path.basename(f)} : pas de viewBox lisible — impossible de dimensionner`);
      process.exit(1);
    }
    const [, , , w, h] = vb;
    // Injecté dans la COPIE servie au navigateur, pas dans le fichier.
    const dimensionne = svg.replace(
      /<svg\b/,
      `<svg style="width:${Number(w)}px;height:${Number(h)}px"`
    );
    return `<h2>${path.basename(f)}</h2><div class="carte">${dimensionne}</div>`;
  })
  .join("\n");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
:root {
${declarations}
}
body { background: var(--color-surface-base); font-family: system-ui, sans-serif; padding: 24px; }
h2 { font-size: 13px; color: var(--color-text-tertiary); margin: 24px 0 8px; font-weight: 500; }
.carte { background: var(--figure-surface); border: 1px solid var(--color-border-subtle);
         border-radius: 12px; padding: 12px; width: max-content; max-width: 100%; }
/* Taille NATURELLE (le viewBox), jamais width:100%. Mesuré le 2026-08-22 :
   à l'échelle, les métriques de texte varient assez pour qu'un chevauchement
   à 60 % apparaisse à quatre figures et disparaisse à une seule — un
   instrument qui change d'avis selon le nombre d'entrées ne vaut rien. */
svg { display: block; }
</style></head><body>${cartes}</body></html>`;

const sortie = path.join(RACINE, ".figure-preview");
mkdirSync(sortie, { recursive: true });
const page_html = path.join(sortie, "page.html");
writeFileSync(page_html, html, "utf8");

const navigateur = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await navigateur.newPage({ viewport: { width: 900, height: 1200 } });
await page.goto(`file://${page_html}`, { waitUntil: "networkidle" });
// Les métriques de texte ne sont stables qu'une fois les polices appliquées :
// sans cette attente, un même fichier mesuré seul ou en lot ne donne pas le
// même verdict (constaté le 2026-08-22 sur un chevauchement à 60 %).
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

// L'INSTRUMENT SE CONTRÔLE LUI-MÊME (ajouté avec le correctif du 2026-09-03).
// La leçon du carré de 26 px : un outil d'audit visuel doit prouver qu'il a
// rendu quelque chose avant de dire quoi que ce soit du contenu. On compare
// la boîte rendue à la taille attendue du viewBox : un écart franc signifie
// que c'est le HARNAIS qui a échoué, pas la figure — et on le dit en
// échouant, plutôt qu'en livrant une image vide accompagnée d'un verdict
// rassurant.
const cartesDom = await page.$$(".carte");
let harnaisCasse = 0;
for (let i = 0; i < cartesDom.length; i++) {
  const nom = path.basename(fichiers[i], ".svg") + (sombre ? "-sombre" : "") + ".png";
  const boite = await cartesDom[i].boundingBox();
  const attendu = await cartesDom[i].evaluate((el) => {
    const svg = el.querySelector("svg");
    const vb = (svg?.getAttribute("viewBox") || "0 0 0 0").split(/\s+/).map(Number);
    return { w: vb[2], h: vb[3] };
  });
  const rendu = { w: (boite?.width ?? 0) - 26, h: (boite?.height ?? 0) - 26 };
  if (rendu.w < attendu.w * 0.5 || rendu.h < attendu.h * 0.5) {
    console.error(
      `  ✗ ${nom} : HARNAIS EN ÉCHEC — le SVG s'est rendu à ${Math.round(rendu.w)}×${Math.round(rendu.h)} ` +
        `pour un viewBox de ${attendu.w}×${attendu.h}. La capture ne montrerait rien : ne t'y fie pas. ` +
        `(Cause déjà vue : un SVG à viewBox seul n'a pas de taille intrinsèque et s'effondre à zéro — ` +
        `voir PIÈGE PAYÉ N°2 en tête de fichier.)`
    );
    harnaisCasse++;
    continue;
  }
  await cartesDom[i].screenshot({ path: path.join(sortie, nom) });
  console.log(`  ✓ ${nom}  (${Math.round(rendu.w)}×${Math.round(rendu.h)})`);
}
if (harnaisCasse) {
  await navigateur.close();
  console.error(
    `\n${harnaisCasse} figure(s) non capturée(s) : l'instrument refuse de certifier ce qu'il n'a pas rendu.`
  );
  process.exit(1);
}

/**
 * Ce que l'œil rate et que la mesure attrape (ajouté après une chasse de
 * trois défauts, 2026-08-22) :
 *   — DÉBORDEMENT : un texte hors du viewBox est coupé à l'affichage. Cause
 *     déjà vue : `text-anchor` en ATTRIBUT de présentation, battu par tout
 *     CSS ambiant — le texte se centre sur son x et sort du cadre. Le
 *     correctif qui tient est un `style="text-anchor:…"` inline.
 *   — CHEVAUCHEMENT : deux étiquettes qui se recouvrent de plus de 40 % de
 *     la plus petite. Le seuil laisse passer les frôlements voulus.
 *
 * HONNÊTETÉ DE L'INSTRUMENT : la détection de chevauchement est INDICATIVE,
 * pas une certification. Les métriques de texte renvoyées par getBBox()
 * fluctuent avec le contexte de rendu — un même fichier mesuré seul ou en
 * lot peut passer de « 61 % de recouvrement » à « rien », près du seuil.
 * Elle sert à DIRIGER LE REGARD vers une zone suspecte ; c'est la capture
 * qui tranche. Le débordement, lui, est fiable (comparaison à un cadre
 * fixe, sans dépendance aux métriques fines).
 */
const defauts = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("svg").forEach((svg, iFig) => {
    const vb = (svg.getAttribute("viewBox") || "0 0 0 0").split(/\s+/).map(Number);
    const [vx, vy, vw, vh] = vb;
    const textes = [...svg.querySelectorAll("text")];
    const boites = textes.map((t) => ({ t, b: t.getBBox(), s: t.textContent.trim() }));
    for (const { t, b, s } of boites) {
      if (!s) continue;
      if (b.x < vx - 1 || b.x + b.width > vx + vw + 1 || b.y + b.height > vy + vh + 1) {
        out.push({
          fig: iFig, type: "déborde", txt: s.slice(0, 40),
          detail: `x ${Math.round(b.x)}→${Math.round(b.x + b.width)} · cadre ${vx}→${vx + vw}` +
                  ` · ancrage calculé ${getComputedStyle(t).textAnchor}`,
        });
      }
    }
    for (let i = 0; i < boites.length; i++) {
      for (let j = i + 1; j < boites.length; j++) {
        const a = boites[i].b, c = boites[j].b;
        if (!boites[i].s || !boites[j].s) continue;
        const ox = Math.min(a.x + a.width, c.x + c.width) - Math.max(a.x, c.x);
        const oy = Math.min(a.y + a.height, c.y + c.height) - Math.max(a.y, c.y);
        if (ox <= 0 || oy <= 0) continue;
        const aire = ox * oy;
        const petite = Math.min(a.width * a.height, c.width * c.height);
        if (petite > 0 && aire / petite > 0.4) {
          out.push({
            fig: iFig, type: "chevauche", txt: boites[i].s.slice(0, 26),
            detail: `avec « ${boites[j].s.slice(0, 26)} » — ${Math.round((aire / petite) * 100)} % de recouvrement`,
          });
        }
      }
    }
  });
  return out;
});

await navigateur.close();
console.log(`\n${cartesDom.length} figure(s) → ${sortie}  (thème ${sombre ? "sombre" : "clair"})`);
if (defauts.length === 0) {
  console.log("Mesure : aucun texte hors cadre, aucun chevauchement > 40 %.");
} else {
  console.log(`\nMESURE — ${defauts.length} défaut(s) :`);
  for (const d of defauts) {
    console.log(`  ✗ [${path.basename(fichiers[d.fig] ?? "?")}] ${d.type} : « ${d.txt} »`);
    console.log(`      ${d.detail}`);
  }
}
console.log("\nLa mesure ne remplace pas le regard : ouvre les PNG.");
