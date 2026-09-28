#!/usr/bin/env node
/**
 * carte-chapitres.mjs — la carte des chapitres est scellée ; la bouger oblige à relire ses renvois.
 *
 * POURQUOI (2026-09-28, DECISIONS-EN-ATTENTE §36). Le numéro de chapitre que l'élève lit
 * (« Chapitre 7 / 9 », le rail, `?chapitre=7`) est CALCULÉ : 1 + le nombre de titres `## `
 * qui le précèdent dans lesson.md (web/src/lib/chapters.ts). La prose, les banques, les
 * exercices, les légendes de figures le citent en dur : « étudiée au chapitre 6 ». Insérer
 * un `## R4b` décale donc, sans bruit, tous les renvois qui visent un chapitre suivant —
 * c'est arrivé quatre fois en une semaine (arithmétique R6b, calcul intégral R9, suites
 * R8b/R8c, dérivabilité R4b) : dix-sept renvois rendus à l'élève pointaient un chapitre trop
 * tôt, dont trois « le chapitre 6 a établi f′(x) = … » qui menaient à Rolle. Aucune porte ne
 * le voyait : validate-content vérifie qu'un renvoi a la bonne FORME, pas qu'il vise le bon
 * chapitre — et ça, aucun motif ne peut le savoir.
 *
 * CE QUE LA PORTE FAIT. Elle ne juge pas un renvoi (elle ne sait pas ce qu'il voulait dire) :
 * elle scelle, notion par notion, la liste ORDONNÉE des titres de chapitre, et rougit dès
 * que cette liste a bougé depuis le sceau — insertion, retrait, réordonnancement. Le rouge
 * nomme le premier chapitre déplacé et liste chaque renvoi (« chapitre N » dans les fichiers
 * de la notion, « chapitre N de « Titre » » partout ailleurs) dont N est à partir de lui :
 * ce sont ceux qu'il faut relire. Après relecture : `--sceller`. Un simple changement de
 * libellé à nombre et ordre constants (un titre reformulé) n'est qu'un avertissement.
 *
 *   node scripts/carte-chapitres.mjs --porte      compare au sceau (exit 1 si la carte a bougé)
 *   node scripts/carte-chapitres.mjs --sceller    réécrit le sceau (après relecture des renvois)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(ICI, "..", "..");
const CONTENU = path.join(RACINE, "content");
const SCEAU = path.join(ICI, "carte-chapitres.base.json");
const SCELLER = process.argv.includes("--sceller");

// Le titre d'un chapitre, sans son code de barreau : « ## R4b — Rolle … » → « Rolle … ».
const libelle = (h) => h.replace(/^##\s+/, "").replace(/^R\d+[a-z]?\s+—\s+/, "").trim();

function carte() {
  const c = {};
  for (const matiere of fs.readdirSync(CONTENU).sort()) {
    const dm = path.join(CONTENU, matiere);
    if (!fs.statSync(dm).isDirectory() || matiere.startsWith("_")) continue;
    for (const notion of fs.readdirSync(dm).sort()) {
      const f = path.join(dm, notion, "lesson.md");
      if (!fs.existsSync(f)) continue;
      c[`${matiere}/${notion}`] = fs.readFileSync(f, "utf8").split("\n").filter((l) => l.startsWith("## ")).map(libelle);
    }
  }
  return c;
}

// Titres affichés des notions (pour les renvois croisés « chapitre N de « Titre » »).
function titres() {
  const src = fs.readFileSync(path.join(RACINE, "web/src/lib/curriculum.ts"), "utf8");
  const t = {};
  for (const m of src.matchAll(/slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)) t[m[1]] = m[2];
  return t;
}

function fichiersDe(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(md|ya?ml|json)$/.test(e.name) && !/^REVIEW-|spec/.test(e.name)) out.push(p);
    }
  };
  walk(dir);
  return out;
}

const RENVOI = /[Cc]hapitres?\s+(\d+)(?:\s*(?:et|à|,)\s*(\d+))?(?:\s+de\s+(?:«\s*)?([A-ZÉÈ][^»,.;:)\n]{2,60}))?/g;

// Les renvois qui visent `cible` (« matiere/notion ») avec un numéro ≥ k.
function renvoisVers(cible, k, T) {
  const [, slug] = cible.split("/");
  const titre = T[slug];
  const out = [];
  for (const matiere of fs.readdirSync(CONTENU)) {
    const dm = path.join(CONTENU, matiere);
    if (!fs.statSync(dm).isDirectory() || matiere.startsWith("_")) continue;
    for (const notion of fs.readdirSync(dm)) {
      const dn = path.join(dm, notion);
      if (!fs.statSync(dn).isDirectory()) continue;
      const maison = `${matiere}/${notion}` === cible;
      for (const f of fichiersDe(dn)) {
        const lignes = fs.readFileSync(f, "utf8").split("\n");
        lignes.forEach((l, i) => {
          for (const m of l.matchAll(RENVOI)) {
            const qualifie = m[3] ? m[3].trim() : null;
            const vise = qualifie
              ? titre && (qualifie.startsWith(titre.slice(0, 14)) || titre.startsWith(qualifie.slice(0, 14)))
              : maison;
            if (!vise) continue;
            const nums = [m[1], m[2]].filter(Boolean).map(Number);
            if (nums.some((n) => n >= k)) out.push(`${path.relative(RACINE, f)}:${i + 1}  « ${m[0].trim()} »`);
          }
        });
      }
    }
  }
  return out;
}

const actuelle = carte();

if (SCELLER) {
  fs.writeFileSync(SCEAU, JSON.stringify(actuelle, null, 1) + "\n");
  const n = Object.values(actuelle).reduce((s, l) => s + l.length, 0);
  console.log(`carte-chapitres : sceau réécrit — ${Object.keys(actuelle).length} notions, ${n} chapitres.`);
  process.exit(0);
}

if (!fs.existsSync(SCEAU)) {
  console.error("carte-chapitres : pas de sceau. Lance --sceller d'abord.");
  process.exit(1);
}
const scellee = JSON.parse(fs.readFileSync(SCEAU, "utf8"));
const T = titres();
const bougees = [];
const renommees = [];
for (const [notion, liste] of Object.entries(actuelle)) {
  const avant = scellee[notion];
  if (!avant) { bougees.push({ notion, k: 1, quoi: "notion absente du sceau" }); continue; }
  if (avant.length === liste.length && avant.every((t, i) => t === liste[i])) continue;
  // Premier chapitre dont la POSITION a changé : le premier titre d'avant qui n'est plus au même rang.
  let k = 0;
  while (k < avant.length && k < liste.length && avant[k] === liste[k]) k++;
  const memeOrdre = avant.length === liste.length &&
    avant.every((t, i) => t === liste[i] || !liste.includes(t) && !avant.includes(liste[i]));
  if (memeOrdre) { renommees.push(`${notion} : chapitre ${k + 1} « ${avant[k]} » → « ${liste[k]} »`); continue; }
  bougees.push({ notion, k: k + 1, quoi: `${avant.length} → ${liste.length} chapitres ; le premier déplacé est le chapitre ${k + 1}, maintenant « ${liste[k] ?? "(fin)"} »` });
}
for (const n of Object.keys(scellee)) if (!actuelle[n]) bougees.push({ notion: n, k: 1, quoi: "notion disparue" });

for (const r of renommees) console.log(`  · titre reformulé, rang inchangé — ${r}`);
if (bougees.length === 0) {
  const n = Object.values(actuelle).reduce((s, l) => s + l.length, 0);
  console.log(`carte-chapitres : carte tenue — ${Object.keys(actuelle).length} notions, ${n} chapitres, aucun rang déplacé ✓`);
  process.exit(0);
}
console.error("\n━━ carte-chapitres : la carte des chapitres a BOUGÉ ━━");
for (const b of bougees) {
  console.error(`\n  ✗ ${b.notion} — ${b.quoi}`);
  const r = renvoisVers(b.notion, b.k, T);
  if (r.length === 0) console.error("     aucun renvoi numéroté à partir de ce chapitre : relire, puis sceller.");
  else {
    console.error(`     ${r.length} renvoi(s) à relire — chacun vise-t-il encore le chapitre qu'il nommait ?`);
    for (const x of r) console.error("       " + x);
  }
}
console.error(
  "\n  Le numéro qu'un renvoi cite est celui que l'élève LIT, calculé depuis les titres `## `.\n" +
  "  Insérer un chapitre décale en silence tous ceux qui suivent. Relis chaque renvoi listé,\n" +
  "  corrige ceux qui visaient l'ancien rang, puis : node scripts/carte-chapitres.mjs --sceller"
);
process.exit(1);
