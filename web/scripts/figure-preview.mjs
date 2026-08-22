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

const cartes = fichiers
  .map((f) => {
    const abs = path.isAbsolute(f) ? f : path.join(RACINE, f);
    const svg = readFileSync(abs, "utf8").replace(/<\?xml[^>]*\?>/, "");
    return `<h2>${path.basename(f)}</h2><div class="carte">${svg}</div>`;
  })
  .join("\n");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
:root {
${declarations}
}
body { background: var(--color-surface-base); font-family: system-ui, sans-serif; padding: 24px; }
h2 { font-size: 13px; color: var(--color-text-tertiary); margin: 24px 0 8px; font-weight: 500; }
.carte { background: var(--figure-surface); border: 1px solid var(--color-border-subtle);
         border-radius: 12px; padding: 12px; }
svg { width: 100%; height: auto; display: block; }
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
await page.waitForTimeout(400);

const cartesDom = await page.$$(".carte");
for (let i = 0; i < cartesDom.length; i++) {
  const nom = path.basename(fichiers[i], ".svg") + (sombre ? "-sombre" : "") + ".png";
  await cartesDom[i].screenshot({ path: path.join(sortie, nom) });
  console.log(`  ✓ ${nom}`);
}
await navigateur.close();
console.log(`\n${cartesDom.length} figure(s) → ${sortie}  (thème ${sombre ? "sombre" : "clair"})`);
console.log("REGARDE-LES : collisions d'étiquettes, courbe hors cadre, repère écrasé.");
