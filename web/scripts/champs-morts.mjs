#!/usr/bin/env node
/**
 * champs-morts — un champ écrit dans le corpus que AUCUN code ne lit.
 *
 * POURQUOI (§11.133). `correct_feedback` était écrit sur 1 678 items, dans les
 * 62 notions — l'explication de la bonne réponse — et n'apparaissait nulle part
 * dans `web/src`. Il voyageait jusqu'au navigateur, sérialisé dans la page, et
 * n'était jamais affiché. Pour 49 items il était le SEUL canal : l'élève qui
 * répondait juste lisait « Correct », et rien d'autre. Personne ne l'a vu
 * pendant toute la vie du corpus, parce que rien ne comparait ce qui est ÉCRIT
 * à ce qui est LU.
 *
 * LE SENS, franc : un nom de champ présent au moins CINQ fois dans
 * `content/**.yaml` doit apparaître quelque part dans le code du dépôt
 * (`web/src`, `web/scripts`, `scripts`), sous sa forme snake_case ou
 * camelCase. Cinq, parce qu'en dessous on attrape les coquilles d'un auteur
 * plutôt qu'un canal — et une coquille se voit autrement.
 *
 * LA LISTE BLANCHE est nominative, jamais un motif : quatre champs sont des
 * ANNOTATIONS D'AUTEUR, écrites pour un humain qui relit, et il est juste
 * qu'aucun code ne les lise. Chacune porte sa raison. Ajouter une ligne ici est
 * un geste visible dans le diff ; un motif « tout ce qui commence par honest_ »
 * ne le serait pas.
 *
 * CE QU'IL NE VOIT PAS — à mesurer, pas à taire :
 *   - la correspondance est un SIMPLE SOUS-MOT sur tout le code réuni. Un champ
 *     nommé `note` ou `text` est donc « lu » dès qu'un commentaire contient ce
 *     mot. L'erreur va dans le sens sûr — il SOUS-déclare les champs morts,
 *     jamais l'inverse — mais elle est réelle et c'est pourquoi elle est
 *     écrite ici plutôt que tue ;
 *   - un champ lu par du code mais jamais RENDU à l'écran (lu, stocké, oublié) ;
 *   - un champ écrit moins de cinq fois.
 *
 *   node scripts/champs-morts.mjs           → l'inventaire et la portée
 *   node scripts/champs-morts.mjs --porte   → rouge si un champ neuf est mort
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const RACINE = path.resolve(ICI, "..", "..");
const CONTENU = path.join(RACINE, "content");
const PORTE = process.argv.includes("--porte");
const SOI = path.resolve(ICI, "champs-morts.mjs");
const SEUIL = 5;

//  Les annotations d'auteur : écrites pour un humain qui relit le fichier.
const PERMIS = new Map([
  ["honest_state", "bloc d'état honnête (ADR 0025) : ce que l'auteur sait ne pas encore tenir, daté, pour le relecteur humain"],
  ["honest_state_2026_09_19", "le même, horodaté dans son nom par une passe de 2026-09-19"],
  ["attributes_to", "note de triage : à quelle misconception un distracteur est rattaché en SECOND, pour la famille M4/M5 (§11.92)"],
  ["gated_misconceptions", "métadonnée de plancher diagnostique, lue par un humain lors de l'arbitrage"],
]);

const compte = new Map();
const ou = new Map();
function marche(o, fichier) {
  if (Array.isArray(o)) { for (const x of o) marche(x, fichier); return; }
  if (o && typeof o === "object") {
    for (const [k, v] of Object.entries(o)) {
      compte.set(k, (compte.get(k) ?? 0) + 1);
      if (!ou.has(k)) ou.set(k, new Set());
      ou.get(k).add(fichier);
      marche(v, fichier);
    }
  }
}
function* fichiers(dir) {
  for (const n of fs.readdirSync(dir).sort()) {
    if (n.startsWith(".")) continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) yield* fichiers(p);
    else if (/\.ya?ml$/.test(n)) yield p;
  }
}
for (const f of fichiers(CONTENU)) {
  try { marche(yaml.load(fs.readFileSync(f, "utf-8")), path.relative(CONTENU, f)); } catch { /* le YAML cassé est l'affaire d'une autre porte */ }
}

//  Tout le code du dépôt, réuni une fois.
let CODE = "";
for (const racine of ["web/src", "web/scripts", "scripts"]) {
  const d = path.join(RACINE, racine);
  if (!fs.existsSync(d)) continue;
  const pile = [d];
  while (pile.length) {
    const p = pile.pop();
    for (const n of fs.readdirSync(p)) {
      const q = path.join(p, n);
      if (fs.statSync(q).isDirectory()) { if (n !== "node_modules") pile.push(q); }
      //  SAUF SOI-MÊME. Cet en-tête cite `correct_feedback` pour expliquer
      //  pourquoi la porte existe — et la citation suffisait à déclarer le
      //  champ « lu ». La porte se rendait donc AVEUGLE au défaut même qui
      //  l'a fait naître, et à tout champ qu'elle nommerait un jour. Une
      //  porte ne doit pas pouvoir se disculper en parlant d'elle-même.
      else if (q === SOI) continue;
      else if (/\.(ts|tsx|js|jsx|mjs|cjs|py)$/.test(n)) CODE += fs.readFileSync(q, "utf-8");
    }
  }
}
const camel = (k) => k.split("_").map((p, i) => (i ? p.charAt(0).toUpperCase() + p.slice(1) : p)).join("");

const morts = [];
let candidats = 0;
for (const [k, n] of compte) {
  if (n < SEUIL) continue;
  candidats++;
  if (PERMIS.has(k)) continue;
  if (CODE.includes(k) || CODE.includes(camel(k))) continue;
  morts.push({ k, n, ou: [...ou.get(k)].slice(0, 3) });
}
morts.sort((a, b) => b.n - a.n);

if (PORTE) {
  if (morts.length) {
    console.error("━━ CHAMP ÉCRIT, JAMAIS LU ━━");
    for (const m of morts) console.error(`   ${m.k} — ${m.n} occurrences (${m.ou.join(", ")})`);
    console.error("\n   Un champ que rien ne lit voyage jusqu'au navigateur et n'apparaît\n   jamais. `correct_feedback` a tenu ainsi toute la vie du corpus :\n   49 items n'avaient rien à montrer à l'élève qui répondait juste.\n   Soit un composant le lit, soit il rejoint PERMIS avec sa raison.\n");
    process.exit(1);
  }
  console.log(`champs-morts : porte tenue — ${candidats} champs vus ≥${SEUIL} fois, 0 mort (${PERMIS.size} annotations d'auteur permises) ✓`);
  process.exit(0);
}

console.log("\n━━ ce que le corpus écrit, ce que le code lit ━━\n");
console.log(`  noms de champ distincts .................. ${compte.size}`);
console.log(`  vus au moins ${SEUIL} fois ..................... ${candidats}`);
console.log(`  annotations d'auteur permises ............ ${PERMIS.size}`);
for (const [k, r] of PERMIS) console.log(`     · ${k.padEnd(26)} ${r}`);
console.log(`\n  CHAMPS MORTS ............................ ${morts.length}`);
for (const m of morts) console.log(`     ✗ ${m.k.padEnd(26)} ${m.n} occurrences — ${m.ou.join(", ")}`);
console.log(`\n  PORTÉE — la correspondance est un simple sous-mot sur tout le code\n  réuni : un champ nommé « note » est réputé lu dès qu'un commentaire\n  contient ce mot. L'erreur va dans le sens SÛR (elle sous-déclare), et\n  un champ lu par du code mais jamais RENDU lui échappe entièrement.\n`);
