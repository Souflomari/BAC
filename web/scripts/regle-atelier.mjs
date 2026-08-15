#!/usr/bin/env node
/**
 * regle-atelier.mjs — LA RÈGLE (NORTH-STAR-V2 §4), rendue mécanique.
 *
 * Pourquoi ce fichier existe : le produit précédent avait toutes ses
 * portes au vert (dom-truth 176/0) tout en ratant sa cible, parce que
 * chaque porte mesurait la conformité et aucune l'apprentissage. Cette
 * porte-ci mesure des propriétés qui, si elles se dégradent, font
 * retomber le contenu vers le manuel :
 *
 *   R1  tout écran a une action        — sinon c'est une page à lire
 *   R2  ≤ 2 phrases visibles           — sinon c'est un paragraphe
 *   R3  toute erreur a SON feedback    — sinon c'est un QCM, pas un tuteur
 *   R4  aucun prérequis non chaîné     — sinon on suppose les bases
 *
 * R5 (« la figure porte l'idée ») n'est PAS ici : elle demande un jugement
 * humain, une fois par compétence. C'est assumé — c'est exactement le trou
 * qu'avaient les portes précédentes, et le boucher par une régression
 * automatique reviendrait à refaire la même erreur.
 *
 * Usage : node scripts/regle-atelier.mjs
 */

import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(WEB, { interopDefault: true, esmResolve: true });
const { COMPETENCES, ECRANS } = jiti(path.join(WEB, "src/lib/atelier/derivees.ts"));

let echecs = 0;
const ko = (m) => { console.log(`  ✗ ${m}`); echecs++; };

// Compte les phrases « visibles » : le texte de cadrage + la question.
// On coupe sur . ! ? … en ignorant les décimales françaises (2,5) et les
// abréviations courtes.
function phrases(s) {
  return s
    .replace(/\d+[.,]\d+/g, "N")
    .split(/[.!?…]+\s|[.!?…]+$/)
    .map((x) => x.trim())
    .filter(Boolean).length;
}

console.log(`règle-atelier — ${ECRANS.length} écrans, ${COMPETENCES.length} compétences\n`);

// ── R1 : tout écran a une action ────────────────────────────────────────
console.log("R1  tout écran a une action");
for (const e of ECRANS) {
  if (e.type === "choix") {
    if (!e.options?.length) ko(`${e.id} : type « choix » sans options`);
    else if (!e.options.some((o) => o.correct)) ko(`${e.id} : aucune option correcte`);
  } else if (e.type === "reglage") {
    if (e.cible == null) ko(`${e.id} : type « reglage » sans cible`);
  } else {
    ko(`${e.id} : type inconnu « ${e.type} » — donc aucune action`);
  }
}
if (!echecs) console.log(`  ✓ ${ECRANS.length}/${ECRANS.length} écrans exigent un geste`);

// ── R2 : ≤ 2 phrases visibles ───────────────────────────────────────────
const avant = echecs;
console.log("\nR2  au plus 2 phrases visibles à la fois");
for (const e of ECRANS) {
  const n = phrases(e.texte);
  if (n > 2) ko(`${e.id} : ${n} phrases de cadrage (max 2) — « ${e.texte.slice(0, 60)}… »`);
  if (phrases(e.question) > 2) ko(`${e.id} : question en ${phrases(e.question)} phrases`);
}
if (echecs === avant) console.log("  ✓ aucun écran ne dépasse 2 phrases");

// ── R3 : toute erreur porte SON feedback ────────────────────────────────
const avant3 = echecs;
console.log("\nR3  chaque réponse fausse a un feedback qui lui est propre");
const vus = new Map();
for (const e of ECRANS) {
  for (const o of e.options ?? []) {
    if (o.correct) continue;
    if (!o.feedback || o.feedback.trim().length < 40) {
      ko(`${e.id}/${o.id} : feedback absent ou trop court pour viser l'erreur`);
      continue;
    }
    // un feedback recopié d'un écran à l'autre n'est plus « propre »
    const cle = o.feedback.trim();
    if (vus.has(cle)) ko(`${e.id}/${o.id} : feedback identique à ${vus.get(cle)}`);
    else vus.set(cle, `${e.id}/${o.id}`);
  }
}
if (echecs === avant3) {
  const n = ECRANS.flatMap((e) => (e.options ?? []).filter((o) => !o.correct)).length;
  console.log(`  ✓ ${n} réponses fausses, ${n} feedbacks distincts`);
}

// ── R4 : aucun prérequis supposé hors chaîne ────────────────────────────
const avant4 = echecs;
console.log("\nR4  tout prérequis est nommé dans la chaîne, et couvert par des écrans");
const ids = new Set(COMPETENCES.map((c) => c.id));
for (const c of COMPETENCES) {
  for (const r of c.requiert) {
    if (!ids.has(r)) ko(`${c.id} : requiert « ${r} », absent de la chaîne`);
  }
}
for (const c of COMPETENCES) {
  if (!ECRANS.some((e) => e.competence === c.id)) {
    ko(`${c.id} : aucune écran ne l'enseigne`);
  }
}
// la chaîne doit partir du collège : sinon on suppose les bases
if (!COMPETENCES.some((c) => c.niveau === "collège")) {
  ko("la chaîne ne descend pas jusqu'au collège — elle suppose les bases");
}
if (echecs === avant4) {
  console.log(`  ✓ chaîne complète de « ${COMPETENCES[0].niveau} » à « ${COMPETENCES.at(-1).niveau} », chaque maillon enseigné`);
}

console.log(`\n━━ règle-atelier : ${echecs} violation(s) ━━`);
process.exit(echecs ? 1 : 0);
