#!/usr/bin/env node
/**
 * figures-trois-moteurs.mjs — les 257 figures, dans les trois moteurs.
 *
 * POURQUOI, et c'est le point le plus exposé du produit. Le corpus de figures a
 * été réglé, étiquette par étiquette, contre les métriques de texte de
 * CHROMIUM : `figure-preview` mesure chaque `<text>` contre le cadre de son
 * `viewBox` et affiche « déborde : 0 cas » — dans Chromium. Or la largeur d'un
 * texte dépend du MOTEUR qui le compose. Une étiquette qui tient à 2 px près
 * dans Blink peut sortir du cadre dans Gecko ou WebKit, et une étiquette qui
 * sort du `viewBox` est COUPÉE à l'affichage : l'élève lit « vitess » au lieu
 * de « vitesse », ou perd une unité.
 *
 * Personne ne l'avait jamais regardé : §11.151 vient d'ouvrir les deux autres
 * moteurs, et la première chose à y rejouer est celle qui dépend le plus de la
 * fonte.
 *
 * COMMENT. La même page que `figure-preview` — chaque SVG dimensionné depuis
 * son propre `viewBox` (1 unité = 1 px) —, chargée dans les trois moteurs, et
 * pour chaque `<text>` la boîte englobante comparée au cadre. On compare
 * ensuite les VERDICTS entre moteurs : une figure propre partout est propre ;
 * une figure qui ne déborde que dans un moteur est un défaut de ce moteur.
 *
 * DEUX PIÈGES REPRIS DE `figure-preview`, payés en 2026-09-03 :
 *   · un SVG à `viewBox` SEUL n'a aucune taille intrinsèque et s'effondre à
 *     zéro — il faut lui poser width/height depuis son viewBox ;
 *   · le style doit être FUSIONNÉ dans un attribut `style` existant, jamais
 *     ajouté en double : le parseur HTML ne garde que le premier, et le style
 *     propre de la figure serait silencieusement jeté.
 *
 *   node scripts/figures-trois-moteurs.mjs           → le tableau
 *   node scripts/figures-trois-moteurs.mjs --porte   → rouge si divergence
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { chromium, firefox, webkit } from "playwright-core";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const RACINE = path.resolve(ICI, "..", "..");
const PORTE = process.argv.includes("--porte");
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");
//  Tolérance : celle de la porte armée, 1 px, appliquée dans `sonde`.
const MARGE = 1;

const fichiers = [];
(function marcher(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) marcher(p);
    else if (e.name.endsWith(".svg") && !e.name.endsWith(".motion.svg")) fichiers.push(p);
  }
})(path.join(RACINE, "content"));
fichiers.sort();

const cartes = fichiers.map((f, i) => {
  let svg = fs.readFileSync(f, "utf8").replace(/<\?xml[^>]*\?>/, "");
  const vb = svg.match(/viewBox="\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*"/);
  if (!vb) return "";
  const [, , , w, h] = vb;
  const dims = `width:${Number(w)}px;height:${Number(h)}px`;
  svg = /<svg\b[^>]*\sstyle="/.test(svg)
    ? svg.replace(/(<svg\b[^>]*\sstyle=")/, `$1${dims};`)
    : svg.replace(/<svg\b/, `<svg style="${dims}"`);
  //  ESSAI ROUGE : une seule figure reçoit une étiquette délibérément trop
  //  longue, posée hors du cadre. Les trois moteurs doivent la voir déborder —
  //  sinon la sonde ne mesure rien, et son « 0 » ne vaut rien.
  if (ESSAI_ROUGE && i === 0) {
    svg = svg.replace(/<\/svg>/, `<text x="${Number(w) + 40}" y="20" font-size="12">essai rouge — cette étiquette est hors du cadre</text></svg>`);
  }
  return `<div class="carte" data-fig="${path.relative(RACINE, f)}">${svg}</div>`;
}).filter(Boolean).join("\n");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body { background:#fff; font-family: system-ui, sans-serif; padding:24px; }
.carte { display:inline-block; margin:8px; }
</style></head><body>${cartes}</body></html>`;
const fichierPage = path.join(os.tmpdir(), `figures-3m-${process.pid}.html`);
fs.writeFileSync(fichierPage, html);

//  LA MÊME QUESTION QUE LA PORTE ARMÉE, et pas une question voisine. Premier
//  jet : `t.getBBox()` brut, marge 0,5 px, et le bord HAUT contrôlé en plus.
//  Résultat : 3 figures « débordantes dans les trois moteurs » alors que
//  `figure-preview` annonce 0 dans Chromium. Ce n'était pas une découverte,
//  c'était un désaccord d'instrument — et c'est le mien qui avait tort :
//    · `getBBox()` rend la boîte dans le repère PROPRE de l'élément ; un texte
//      dans un `<g transform="…">` est alors comparé à un cadre qui n'est pas
//      le sien (7 figures du corpus portent un transform ET du texte) ;
//    · la porte tolère 1 px, pas 0,5 ;
//    · la porte ne contrôle PAS le bord haut.
//  On reprend donc `boiteRacine` mot pour mot de `figure-preview.mjs`, avec sa
//  tolérance et ses trois bords. Comparer deux moteurs n'a de sens que si la
//  question posée est identique — y compris identique à celle que la CI garde.
const sonde = () => {
  const out = {};
  for (const carte of document.querySelectorAll(".carte")) {
    const svg = carte.querySelector("svg");
    if (!svg) continue;
    const [vx, vy, vw, vh] = (svg.getAttribute("viewBox") || "0 0 0 0").split(/\s+/).map(Number);
    const versRacine = svg.getScreenCTM()?.inverse() ?? null;
    const boiteRacine = (el) => {
      const b = el.getBBox();
      if (!versRacine || !el.getScreenCTM) return b;
      const m = versRacine.multiply(el.getScreenCTM());
      if (m.b === 0 && m.c === 0 && m.a === 1 && m.d === 1 && m.e === 0 && m.f === 0) return b;
      const coins = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]
        .map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]);
      const xs = coins.map((c) => c[0]), ys = coins.map((c) => c[1]);
      const x0 = Math.min(...xs), y0 = Math.min(...ys);
      return { x: x0, y: y0, width: Math.max(...xs) - x0, height: Math.max(...ys) - y0 };
    };
    let n = 0, pire = 0;
    for (const t of svg.querySelectorAll("text")) {
      if (!t.textContent.trim()) continue;
      let b;
      try { b = boiteRacine(t); } catch { continue; }
      if (!b || (b.width === 0 && b.height === 0)) continue;
      const debord = Math.max(vx - 1 - b.x, b.x + b.width - (vx + vw + 1), b.y + b.height - (vy + vh + 1));
      if (debord > 0) { n++; pire = Math.max(pire, Math.round(debord * 10) / 10); }
    }
    out[carte.dataset.fig] = { n, pire };
  }
  return out;
};

const MOTEURS = [["chromium", chromium], ["firefox", firefox], ["webkit", webkit]];
const releve = {};
for (const [nom, type] of MOTEURS) {
  const b = await type.launch(nom === "chromium" && process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
  const page = await b.newPage();
  await page.goto(`file://${fichierPage}`, { waitUntil: "networkidle" });
  releve[nom] = await page.evaluate(sonde);
  await b.close();
  const total = Object.values(releve[nom]).filter((v) => v.n > 0).length;
  console.log(`  · ${nom.padEnd(9)} ${Object.keys(releve[nom]).length} figures mesurées · ${total} avec un texte hors cadre`);
}
fs.unlinkSync(fichierPage);

const figs = Object.keys(releve.chromium ?? {});
const divergentes = [], debordantesPartout = [];
for (const f of figs) {
  const par = MOTEURS.map(([m]) => releve[m]?.[f]?.n ?? -1);
  const pires = MOTEURS.map(([m]) => releve[m]?.[f]?.pire ?? 0);
  if (new Set(par).size > 1) divergentes.push({ f, par, pires });
  else if (par[0] > 0) debordantesPartout.push({ f, n: par[0], pire: Math.max(...pires) });
}

console.log(`\n━━ les figures dans les trois moteurs — ${figs.length} figures, marge ${MARGE}px ━━\n`);
if (debordantesPartout.length) {
  console.log(`  ${debordantesPartout.length} figure(s) débordent dans les TROIS moteurs (donc pas un défaut de moteur) :`);
  for (const d of debordantesPartout.slice(0, 12)) console.log(`     · ${d.f} — ${d.n} texte(s), pire ${d.pire}px`);
  console.log();
}
if (divergentes.length) {
  console.log(`  ${divergentes.length} figure(s) ne débordent QUE dans certains moteurs :`);
  for (const d of divergentes) {
    console.log(`     ✗ ${d.f}`);
    console.log(`        ${MOTEURS.map(([m], i) => `${m}=${d.par[i]} (pire ${d.pires[i]}px)`).join("  ")}`);
  }
  console.log();
} else {
  console.log("  aucune figure ne déborde dans un moteur et pas dans un autre.\n");
}

if (ESSAI_ROUGE) {
  const vue = [...divergentes, ...debordantesPartout].some((d) => (d.f ?? "").length > 0);
  const partout = debordantesPartout.some((d) => d.f === path.relative(RACINE, fichiers[0]));
  if (partout) { console.log("━━ ESSAI ROUGE : les trois moteurs ont vu l'étiquette hors cadre ✓ ━━\n"); process.exit(0); }
  console.error("━━ ESSAI ROUGE : l'étiquette hors cadre n'a pas été vue par les trois moteurs — sonde AVEUGLE ━━\n");
  console.error(`   vue quelque part : ${vue}\n`);
  process.exit(1);
}
if (PORTE && divergentes.length) process.exit(1);
process.exit(0);
