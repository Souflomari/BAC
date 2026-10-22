#!/usr/bin/env node
/**
 * syntaxe-vieux-moteurs.mjs — le JavaScript livré se PARSE-t-il sur le
 * téléphone d'un élève ?
 *
 * POURQUOI. Un élève marocain révise souvent sur un téléphone d'occasion. Sur
 * Android, le moteur se met à jour tout seul ; **sur iPhone, il est soudé au
 * système** : un 6s, un 7 ou un SE de première génération sont bloqués en
 * iOS 15 et ne verront jamais Safari 16.4. Si le paquet livré contient une
 * syntaxe que ce moteur ne connaît pas, il ne « dégrade » pas — il lève une
 * SyntaxError, le morceau entier meurt, et l'élève regarde une page blanche
 * pendant que la veille d'hydratation lui propose de recharger, ce qui ne
 * changera rien.
 *
 * Rien ne mesurait cela, et aucune des deux autres façons de le savoir n'est
 * disponible ici : Playwright ne fournit que des moteurs récents (WebKit 26),
 * et le dépôt n'a pas de `browserslist` — la valeur par défaut ne retient que
 * des navigateurs de moins de deux ans.
 *
 * CE QU'ELLE FAIT. Elle lit les morceaux construits et cherche les marqueurs
 * dont la date d'arrivée est connue, en séparant deux gravités :
 *   · SYNTAXE — refusée à l'analyse : le morceau entier meurt (page blanche) ;
 *   · API — absente à l'exécution : une TypeError sur un chemin précis.
 *
 * MESURÉ (2026-09-21) — le plancher du produit :
 *   ?. et ??            Chrome 80 · Safari 13.1  (2020)
 *   .at( structuredClone  Chrome 92/98 · Safari 15.4  (API)
 *   regex lookbehind    **Safari 16.4 · mars 2023**  ← le plancher réel
 *
 * LE LOOKBEHIND, DEUX SOURCES, UNE CORRIGÉE :
 *   1. `src/lib/frenchTypography.ts` construisait `(?<=\p{L})'(?=\p{L})` pour
 *      l'apostrophe française. CORRIGÉ (§11.163) : la lettre de gauche est
 *      capturée et réécrite, comportement identique (10 tests, 7 chaînes).
 *   2. `mdast-util-gfm-autolink-literal`, tiré par `remark-gfm`, en porte un
 *      dans un littéral — donc refusé à l'ANALYSE. Il sert à transformer une
 *      URL nue en lien. **Le corpus n'en contient aucune** : 0 URL nue,
 *      0 adresse e-mail, pour 113 tableaux GFM qui, eux, sont indispensables.
 *      Le retirer demande de recomposer le greffon markdown — décision
 *      d'architecture, posée en `DECISIONS-EN-ATTENTE §14`, pas tranchée ici.
 *
 * CE QU'ELLE NE PROUVE PAS. Aucun vieux moteur n'a été exécuté : la
 * conséquence (page blanche) est déduite des tables de support, pas observée.
 * Ce qui est OBSERVÉ, c'est la présence du marqueur dans le paquet livré.
 *
 *   node scripts/syntaxe-vieux-moteurs.mjs           → le plancher
 *   node scripts/syntaxe-vieux-moteurs.mjs --porte   → deux cliquets
 */
import fs from "node:fs";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const PORTE = process.argv.includes("--porte");
//  Cliquet : une seule source de lookbehind dans le paquet, celle de la
//  dépendance. Toute nouvelle occurrence — surtout venue du produit — est un
//  pas de plus vers l'iPhone qui ne peut pas suivre.
const CLIQUET_LOOKBEHIND = Number(process.env.CLIQUET_LOOKBEHIND ?? 1);

const TRAITS = [
  { nom: "?. (chaînage optionnel)", rx: /\?\.[a-zA-Z_[(]/, genre: "SYNTAXE", depuis: "Chrome 80 · Safari 13.1 (2020)" },
  { nom: "?? (coalescence nulle)", rx: /[^?]\?\?[^?=]/, genre: "SYNTAXE", depuis: "Chrome 80 · Safari 13.1 (2020)" },
  { nom: "??= ||= &&=", rx: /(\?\?=|\|\|=|&&=)/, genre: "SYNTAXE", depuis: "Chrome 85 · Safari 14 (2020)" },
  { nom: "champs privés #x", rx: /[{;]\s*#[a-zA-Z_]/, genre: "SYNTAXE", depuis: "Chrome 74 · Safari 14.1" },
  { nom: "bloc static {}", rx: /static\s*\{/, genre: "SYNTAXE", depuis: "Chrome 94 · Safari 16.4 (2023)" },
  { nom: "await de haut niveau", rx: /^\s*await /m, genre: "SYNTAXE", depuis: "Chrome 89 · Safari 15" },
  { nom: "regex lookbehind (?<=", rx: /\(\?<[=!]/, genre: "SYNTAXE", depuis: "Chrome 62 · Safari 16.4 (mars 2023)" },
  { nom: ".at(", rx: /\.at\(/, genre: "API", depuis: "Chrome 92 · Safari 15.4" },
  { nom: "structuredClone", rx: /structuredClone/, genre: "API", depuis: "Chrome 98 · Safari 15.4" },
  { nom: ".replaceAll(", rx: /\.replaceAll\(/, genre: "API", depuis: "Chrome 85 · Safari 13.1" },
];

//  SANS BUILD, LA MOITIÉ DE LA PORTE TIENT ENCORE — et il vaut mieux la faire
//  tourner à moitié en le DISANT que pas du tout. Le contrôle sur `src/` ne
//  demande rien ; seul l'inventaire du paquet livré a besoin d'un build. La
//  batterie locale tourne sans navigateur ni build : elle gardera donc la
//  source, et la CI, qui construit, gardera les deux.
const racine = path.join(WEB, ".next", "static", "chunks");
const avecBuild = fs.existsSync(racine);
const morceaux = [];
if (avecBuild) (function marcher(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) marcher(p);
    else if (e.name.endsWith(".js")) morceaux.push(p);
  }
})(racine);

const vu = new Map();
let lookbehind = 0;
let octets = 0;
for (const f of morceaux) {
  const t = fs.readFileSync(f, "utf-8");
  octets += t.length;
  lookbehind += (t.match(/\(\?<[=!]/g) ?? []).length;
  for (const tr of TRAITS) if (!vu.has(tr.nom) && tr.rx.test(t)) vu.set(tr.nom, path.basename(f));
}

//  LE PRODUIT LUI-MÊME, à la source : un lookbehind écrit dans `src/` est une
//  régression qu'on peut refuser tout de suite, sans attendre le paquet.
const srcFautifs = [];
(function marcher(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) marcher(p);
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(e.name)) {
      //  LES COMMENTAIRES SONT RETIRÉS AVANT DE CHERCHER, et ce n'est pas un
      //  détail : au premier passage, cette porte a accusé
      //  `frenchTypography.ts` — dont le lookbehind venait d'être RETIRÉ — parce
      //  que le commentaire qui explique le correctif cite le motif d'avant.
      //  Une porte qui punit la documentation apprend à ne plus documenter
      //  (ADR 0036 §3, la porte qui se cite elle-même).
      const t = fs.readFileSync(p, "utf-8")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/^\s*\/\/.*$/gm, " ");
      if (/\(\?<[=!]/.test(t)) srcFautifs.push(path.relative(WEB, p));
    }
  }
})(path.join(WEB, "src"));

console.log(`\n━━ le JavaScript livré se parse-t-il sur un vieux téléphone ? ━━\n`);
console.log(avecBuild
  ? `  ${morceaux.length} morceaux · ${Math.round(octets / 1024)} ko\n`
  : "  (pas de build : l'inventaire du paquet est SAUTÉ, seul `src/` est gardé)\n");
if (avecBuild) for (const tr of TRAITS) {
  const ou = vu.get(tr.nom);
  console.log(`  ${ou ? "PRÉSENT" : "absent "}  ${tr.genre.padEnd(7)} ${tr.nom.padEnd(24)}${ou ? ` — exige ${tr.depuis}` : ""}`);
}
console.log();
if (avecBuild) console.log(`  lookbehind dans le paquet ......... ${lookbehind}  (cliquet ${CLIQUET_LOOKBEHIND})`);
console.log(`  lookbehind dans src/ .............. ${srcFautifs.length}`);
for (const f of srcFautifs) console.log(`     ✗ ${f}`);
console.log();

if (PORTE) {
  const casses = [];
  if (srcFautifs.length) casses.push(`${srcFautifs.length} lookbehind dans le code du produit : ${srcFautifs.join(", ")}`);
  if (avecBuild && lookbehind > CLIQUET_LOOKBEHIND) casses.push(`${lookbehind} lookbehind dans le paquet (cliquet ${CLIQUET_LOOKBEHIND})`);
  if (casses.length) {
    console.error("━━ ROUGE ━━");
    for (const c of casses) console.error(`   ${c}`);
    console.error("\n   Un lookbehind n'existe dans WebKit qu'à partir de Safari 16.4 (mars 2023).");
    console.error("   Sur un iPhone resté en iOS 15 — le téléphone d'occasion d'un lycéen — le");
    console.error("   morceau entier est refusé À L'ANALYSE : page blanche, et « Recharger » n'y");
    console.error("   changera rien. Écrire la même chose en capturant au lieu de regarder derrière.\n");
    process.exit(1);
  }
  console.log(avecBuild
    ? `  ✓ cliquets tenus — 0 dans le produit, ${lookbehind} dans le paquet (dépendance connue).\n`
    : "  ✓ cliquet source tenu — 0 lookbehind dans `src/`. Le paquet n'a PAS été inventorié.\n");
}
process.exit(0);
