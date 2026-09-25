#!/usr/bin/env node
/**
 * calculs-numeriques.mjs — les égalités ENTIÈREMENT NUMÉRIQUES du corpus
 * se vérifient-elles ?
 *
 * POURQUOI. Une erreur de calcul dans un corrigé est le pire défaut possible :
 * l'élève qui refait le calcul et trouve autre chose conclut que c'est LUI qui
 * se trompe. Rien ne vérifiait cela.
 *
 * CE QU'ELLE PEUT FAIRE, ET C'EST ÉTROIT. Sur 13 936 expressions contenant un
 * « = », **333 sont entièrement numériques** (2,4 %) : pas une lettre, donc
 * calculables sans rien interpréter. Le reste porte des symboles, et vérifier
 * `v_B^2 = v_A^2 + 2ad` demande de comprendre la physique, pas d'évaluer.
 *
 * TOUT CE QUI N'EST PAS ENTIÈREMENT COMPRIS EST JETÉ, jamais deviné : la
 * traduction LaTeX → expression n'accepte au bout que chiffres, opérateurs et
 * parenthèses ; un seul caractère inattendu et l'expression est ignorée. Un
 * faux positif coûte plus cher qu'un silence, parce qu'il apprend à ignorer.
 *
 * DEUX FAMILLES DE FAUX POSITIFS, structurelles, mesurées le 2026-09-20 — et
 * c'est POUR ELLES que cette sonde n'est pas une porte :
 *
 *   1. L'ARITHMÉTIQUE MODULAIRE. Dans `structures-algebriques`,
 *      « $2\\times2=0$ » est VRAI : on est dans Z/4Z, et c'est même le cœur du
 *      chapitre (2 n'a pas de symétrique, donc (Z/4Z, ×) n'est pas un groupe).
 *   2. L'ERREUR CITÉE POUR ÊTRE RÉFUTÉE. Dans `arithmetique`, le retour d'un
 *      distracteur écrit « Tu as sans doute pris $(-1)^{2023} = 1$. Mais 2023
 *      est impair… ». La fausse égalité est là EXPRÈS.
 *
 *   La seconde famille est la plus intéressante : **un tuteur qui confronte les
 *   misconceptions contient nécessairement des égalités fausses, volontairement.**
 *   Une porte arithmétique naïve se battrait contre la pédagogie même du
 *   produit. D'où le classement, plutôt qu'un verdict.
 *
 * MESURÉ (2026-09-20) : 333 égalités numériques, 7 écarts, **7 classés** (6 en
 * arithmétique modulaire, 1 en erreur citée), **0 candidat réel**.
 *
 *   node scripts/calculs-numeriques.mjs           → le classement
 *   node scripts/calculs-numeriques.mjs --detail  → chaque écart, avec sa raison
 */
import fs from "node:fs";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const DETAIL = process.argv.includes("--detail");
//  PORTE : le cliquet ne porte QUE sur les écarts INEXPLIQUÉS. Les deux
//  familles structurelles (arithmétique modulaire, erreur citée pour être
//  réfutée) sont absorbées par le classement — sans quoi la porte se battrait
//  contre la pédagogie du produit, qui contient des égalités fausses EXPRÈS.
//
//  SA FAIBLESSE, ÉCRITE : une vraie erreur de calcul qui tomberait à moins de
//  240 caractères d'un mot comme « erreur » ou « tu as » serait classée « citée »
//  et donc absorbée. La porte est un filet à grosses mailles, pas une preuve.
const PORTE = process.argv.includes("--porte");

const fichiers = [];
(function marcher(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) marcher(p);
    else if (e.name.endsWith(".md") || e.name.endsWith(".yaml")) fichiers.push(p);
  }
})(CONTENU);
fichiers.sort();

function versExpression(t) {
  let s = t;
  s = s.replace(/\\left|\\right|\\!|\\,|\;|\\:|\\ /g, " ");
  s = s.replace(/\\times/g, "*").replace(/\\cdot/g, "*").replace(/\\div/g, "/");
  for (let i = 0; i < 4; i++) {
    const s2 = s.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))");
    if (s2 === s) break;
    s = s2;
  }
  s = s.replace(/\^\{([^{}]*)\}/g, "**($1)").replace(/\^(-?\d+)/g, "**($1)");
  s = s.replace(/[{}]/g, (c) => (c === "{" ? "(" : ")"));
  s = s.replace(/(?<=\d),(?=\d)/g, ".");
  s = s.replace(/(?<=\d)\s+(?=\d\d\d\b)/g, "");
  return s.trim();
}

const PROPRE = /^[\d\s.+\-*/()]+$/;
function evalue(s) {
  const nu = s.replace(/\*\*/g, "");
  if (!PROPRE.test(nu) || !/\d/.test(nu)) return null;
  try {
    // eslint-disable-next-line no-new-func
    const v = Function(`"use strict";return (${s});`)();
    return Number.isFinite(v) ? v : null;
  } catch { return null;
  }
}

let avecEgal = 0, numeriques = 0;
const ecarts = [];
for (const f of fichiers) {
  const txt = fs.readFileSync(f, "utf-8");
  const modulaire = /\\mathbb\{Z\}\s*\/|modulo|congru/i.test(txt);
  //  DEUX PASSES, ET DANS CET ORDRE — payé par l'essai rouge §11.158, qui n'a
  //  pas crié sur une égalité pourtant fausse. Un seul motif `\$\$?…\$\$?`
  //  apparie les dollars de gauche à droite sans savoir distinguer `$…$` de
  //  `$$…$$` : sur `$n=26$ … $$26^3 = 17\,576$$`, il capturait « n=26 », puis
  //  le TEXTE entre deux dollars orphelins, et laissait l'expression affichée
  //  de côté. Or les calculs travaillés sont écrits en math AFFICHÉE — c'est
  //  précisément la famille qui manquait au balayage.
  //  On prend donc les blocs `$$…$$` d'abord, puis on les MASQUE avant la passe
  //  en ligne, pour qu'aucun dollar ne puisse plus être apparié de travers.
  const spans = [];
  for (const m of txt.matchAll(/\$\$([\s\S]{2,400}?)\$\$/g)) spans.push({ tex: m[1], index: m.index });
  const masque = txt.replace(/\$\$[\s\S]{2,400}?\$\$/g, (x) => " ".repeat(x.length));
  for (const m of masque.matchAll(/\$([^$\n]{2,200})\$/g)) spans.push({ tex: m[1], index: m.index });
  for (const sp of spans) {
    const brut = sp.tex;
    const m = { index: sp.index };
    if (!brut.includes("=") && !brut.includes("\\approx")) continue;
    avecEgal++;
    const approx = brut.includes("\\approx");
    const parts = brut.split(/\\approx|=/);
    if (parts.length < 2) continue;
    const vals = parts.map((p) => evalue(versExpression(p)));
    if (vals.some((v) => v === null)) continue;
    numeriques++;
    const [a, b] = vals;
    const d = Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b), 1e-9);
    if (d <= (approx ? 0.10 : 0.02)) continue;
    //  Le CONTEXTE, lu autour de l'expression : 240 caractères suffisent à
    //  reconnaître une erreur citée, qui s'annonce toujours ("tu as pris…",
    //  "au lieu de…", "l'erreur…").
    const autour = txt.slice(Math.max(0, m.index - 240), m.index + 240);
    const citee = /tu as |sans doute|au lieu de|l['’]erreur|erreur fréquente|piège|misconception|feedback:/i.test(autour);
    //  TROISIÈME FAMILLE, trouvée par la porte elle-même une fois le balayage
    //  réparé : le RAISONNEMENT PAR L'ABSURDE. « L'égalité des cotes exigerait
    //  $0=5$ », « on démontrerait que $-1=1$ », « donc $0 = 1$. Absurde. » Les
    //  trois sont des mathématiques justes dont la conclusion EST une égalité
    //  fausse — c'est le procédé. Comme la deuxième famille, elle dit quelque
    //  chose du produit : un tuteur qui démontre contient des égalités fausses
    //  par construction, et une porte arithmétique naïve se bat contre lui.
    const absurde = /absurde|contradiction|exigerait|on démontrerait|impossible|ne peut pas être|ce qui est faux/i.test(autour);
    ecarts.push({
      f: path.relative(path.resolve(ICI, "..", ".."), f), brut: brut.trim(),
      a, b, pct: Math.round(d * 1000) / 10,
      raison: citee ? "erreur CITÉE pour être réfutée" : absurde ? "raisonnement par l'ABSURDE" : modulaire ? "arithmétique MODULAIRE" : null,
    });
  }
}

const classes = ecarts.filter((e) => e.raison);
const reels = ecarts.filter((e) => !e.raison);

console.log(`\n━━ les égalités entièrement numériques du corpus ━━\n`);
console.log(`  expressions contenant « = » ................ ${avecEgal}`);
console.log(`  entièrement numériques, donc vérifiables ... ${numeriques}  (${(numeriques / avecEgal * 100).toFixed(1)} %)`);
console.log(`  écarts trouvés ............................. ${ecarts.length}`);
console.log(`     dont expliqués par le contexte .......... ${classes.length}`);
console.log(`     RESTANT à regarder ...................... ${reels.length}\n`);

if (DETAIL || reels.length) {
  for (const e of (reels.length ? reels : classes)) {
    console.log(`  ${e.raison ? "·" : "✗"} ${e.f}`);
    console.log(`      « ${e.brut} »  →  ${e.a} vs ${e.b}  (${e.pct} %)${e.raison ? `  — ${e.raison}` : ""}`);
  }
  console.log();
}
if (DETAIL && reels.length) {
  console.log("  (les écarts expliqués, pour mémoire)");
  for (const e of classes) console.log(`  · ${e.f} — « ${e.brut} » : ${e.raison}`);
  console.log();
}

if (PORTE) {
  if (reels.length) {
    console.error(`━━ ROUGE : ${reels.length} égalité(s) numérique(s) fausse(s) sans explication ━━`);
    console.error("   Une erreur de calcul dans un corrigé est le pire défaut possible : l'élève");
    console.error("   qui refait le calcul et trouve autre chose conclut que c'est LUI qui se trompe.\n");
    process.exit(1);
  }
  console.log(`  ✓ cliquet tenu — ${numeriques} égalités vérifiées, ${classes.length} écart(s) tous expliqués, 0 inexpliqué.\n`);
}
process.exit(0);
