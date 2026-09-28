/**
 * test-examens.mjs — les invariants de l'assembleur d'épreuves.
 *
 * POURQUOI CE FICHIER EXISTE (2026-09-05). `lib/examens.ts` est le module le
 * plus accidenté du produit : son propre en-tête raconte QUATRE défauts
 * d'ordre déjà corrigés — le repli sur l'identifiant qui abîmait les épreuves
 * mixtes (K-7), le `??` qui ne rattrape pas NaN et faisait passer un romain
 * hors table pour « égal », les sujets qui ne numérotent pas leurs exercices,
 * la cinquième convention d'ordinal ajoutée après un désordre constaté au
 * rendu. Un cinquième a été trouvé le 2026-09-05 (SPC 2015 listait le
 * rattrapage avant la normale, faute de départage par session). **Aucun
 * n'était gardé par un test.**
 *
 * Ces tests portent sur le CORPUS RÉEL, pas sur des données fabriquées : les
 * défauts de ce module viennent tous de la rencontre entre une règle et un
 * libellé particulier, et un jeu d'essai inventé ne les aurait pas produits.
 * Ils coûtent une dizaine de secondes.
 *
 * ⚠️ À LANCER DEPUIS `web/` — `lib/content.ts` résout la racine du contenu
 * relativement au répertoire courant et rend une liste VIDE ailleurs, SANS
 * erreur. Le premier test ci-dessous existe pour que ce silence devienne un
 * échec bruyant.
 *
 *   node --test scripts/test-examens.mjs
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": path.join(WEB, "src") },
});
const { listEpreuves, epreuveTitre, filiereLabel } = jiti(path.join(WEB, "src/lib/examens.ts"));

const EPREUVES = listEpreuves();

const ROMAINS = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };
/** Le rang que le SUJET donne à un morceau, lu sur son libellé. */
function rangSujet(l) {
  let m;
  if ((m = l.match(/(?:partie|situation)\s+([IVX]+|\d+)/i))) return ROMAINS[m[1].toUpperCase()] ?? +m[1];
  if ((m = l.match(/§\s*(\d+)/))) return +m[1];
  if ((m = l.match(/(Première|Deuxième|Troisième|Quatrième)\s+partie/i)))
    return { premi: 1, deuxi: 2, troisi: 3, quatri: 4 }[m[1].slice(0, 6).toLowerCase()] ?? null;
  if ((m = l.match(/(\d+)\s*(?:ère|ᵉ|e)\s*(?:partie|situation)/i))) return +m[1];
  if ((m = l.match(/—\s*([IVX]+)\s*[.\-—]/))) return ROMAINS[m[1].toUpperCase()] ?? null;
  return null;
}

test("le corpus est CHARGÉ — un zéro silencieux est un échec, pas un succès", () => {
  assert.ok(
    EPREUVES.length >= 30,
    `${EPREUVES.length} épreuve(s) — lancé depuis le mauvais répertoire ? (il faut web/)`
  );
});

test("les morceaux d'un exercice sont rendus dans l'ordre du SUJET", () => {
  const fautifs = [];
  for (const e of EPREUVES) {
    const parExo = new Map();
    for (const x of e.exercices) {
      const l = x.entry.source.exerciseLabel;
      if (!l) continue;
      const num = (l.match(/Exercice\s+([IVX0-9]+)/i) ?? [])[1];
      if (!num) continue;
      if (!parExo.has(num)) parExo.set(num, []);
      parExo.get(num).push(rangSujet(l));
    }
    for (const [num, rangs] of parExo) {
      if (rangs.length < 2 || rangs.some((r) => r === null)) continue;
      const trie = [...rangs].sort((a, b) => a - b);
      if (rangs.join() !== trie.join())
        fautifs.push(`${e.id} exercice ${num} : rendu ${rangs.join(", ")} au lieu de ${trie.join(", ")}`);
    }
  }
  assert.deepEqual(fautifs, [], `morceaux hors de l'ordre du sujet :\n  ${fautifs.join("\n  ")}`);
});

test("la liste est triée : complètes d'abord, puis année décroissante", () => {
  const partielleVue = EPREUVES.findIndex((e) => !e.complete);
  if (partielleVue >= 0)
    assert.ok(
      EPREUVES.slice(partielleVue).every((e) => !e.complete),
      "une épreuve complète apparaît APRÈS une partielle"
    );
  for (let i = 1; i < EPREUVES.length; i++) {
    const a = EPREUVES[i - 1], b = EPREUVES[i];
    if (a.complete !== b.complete) continue;
    assert.ok(a.year >= b.year, `${a.id} (${a.year}) précède ${b.id} (${b.year})`);
  }
});

test("normale avant rattrapage — le défaut SPC 2015, épinglé", () => {
  // Une seule année sur vingt-deux listait le rattrapage en premier, faute de
  // départage explicite par session : deux épreuves du même millésime
  // restaient dans l'ordre où la Map les avait rencontrées.
  const inversions = [];
  for (let i = 1; i < EPREUVES.length; i++) {
    const a = EPREUVES[i - 1], b = EPREUVES[i];
    if (a.complete !== b.complete || a.filiere !== b.filiere || a.year !== b.year) continue;
    if (a.session === "rattrapage" && b.session === "normale")
      inversions.push(`${a.filiere} ${a.year}`);
  }
  assert.deepEqual(inversions, [], `rattrapage listé avant la normale : ${inversions.join(", ")}`);
});

test("le barème d'une épreuve ne dépasse jamais 20", () => {
  const trop = EPREUVES.filter((e) => e.pts > 20).map((e) => `${e.id} : ${e.pts}`);
  assert.deepEqual(trop, [], `épreuves au-dessus de 20 points : ${trop.join(", ")}`);
});

test("une épreuve COMPLÈTE totalise exactement 20", () => {
  // Le test au-dessus ne pose qu'une borne SUPÉRIEURE, et le seuil de
  // `complete` est `>= 19,5` : une épreuve à 19,5 ou 19,75 passait donc les
  // deux, était annoncée complète, et servait de dénominateur à une note que
  // l'élève lit sur 20 (EpreuveShell « N/20 », examens.ts `ep.pts`). Un point
  // manquant dans un seul `bareme_total` se serait vu nulle part.
  // Mesuré le 2026-09-12 : les 38 épreuves complètes font exactement 20.
  const faux = EPREUVES.filter((e) => e.complete && Math.abs(e.pts - 20) > 1e-9)
    .map((e) => `${e.id} : ${e.pts}`);
  assert.deepEqual(faux, [], `épreuves complètes qui ne font pas 20 : ${faux.join(", ")}`);
});

test("« complète » veut dire ≥ 19,5 points, et rien d'autre", () => {
  for (const e of EPREUVES) assert.equal(e.complete, e.pts >= 19.5, `${e.id} : ${e.pts} pts, complete=${e.complete}`);
});

test("aucune épreuve trop maigre n'est listée", () => {
  const maigres = EPREUVES.filter((e) => e.pts < 9.75).map((e) => `${e.id} : ${e.pts}`);
  assert.deepEqual(maigres, [], `épreuves listées sous le seuil : ${maigres.join(", ")}`);
});

test("la durée officielle est celle du bac : SM 4 h, les autres 3 h", () => {
  for (const e of EPREUVES)
    assert.equal(e.dureeOfficielleMin, e.filiere === "SM" ? 240 : 180, `${e.id} (${e.filiere})`);
});

test("nbExercices compte les EXERCICES du sujet, pas les morceaux servis", () => {
  for (const e of EPREUVES) {
    assert.ok(e.nbExercices >= 1, `${e.id} annonce ${e.nbExercices} exercice(s)`);
    assert.ok(
      e.nbExercices <= e.exercices.length,
      `${e.id} annonce ${e.nbExercices} exercices pour ${e.exercices.length} morceaux`
    );
  }
});

test("un en-tête d'exercice ne s'arrête jamais sur son numéro de section", () => {
  // Neuf cartes n'annonçaient que « Exercice 1 — Partie 2 (Chimie) », à côté
  // d'un frère qui nommait son sujet. Corrigé le 2026-09-05 ; gardé ici ET
  // dans dom-truth, parce que le libellé EST le seul intitulé de la carte.
  const muets = [];
  for (const e of EPREUVES)
    for (const x of e.exercices) {
      const l = x.entry.source.exerciseLabel;
      if (l && /^Exercice\s+[IVX0-9]+\b.*?(?:Partie|§)\s*[IVX0-9]+\s*(?:\([^)]*\))?\s*$/i.test(l))
        muets.push(`${e.id} · ${x.entry.id} : « ${l} »`);
    }
  assert.deepEqual(muets, [], `en-têtes sans intitulé :\n  ${muets.join("\n  ")}`);
});

test("un titre d'exercice est du texte, pas du TeX", () => {
  const tex = [];
  for (const e of EPREUVES)
    for (const x of e.exercices)
      if (/\$[^$\n]{1,120}\$|\\[a-zA-Z]{2,}/.test(x.entry.title ?? ""))
        tex.push(`${x.entry.id} : « ${(x.entry.title ?? "").slice(0, 60)} »`);
  assert.deepEqual(tex, [], `titres avec du TeX brut :\n  ${tex.join("\n  ")}`);
});

test("chaque question d'épreuve porte un raisonnement expert", () => {
  let nues = 0, total = 0;
  for (const e of EPREUVES)
    for (const x of e.exercices)
      for (const q of x.entry.questions ?? []) {
        total++;
        if (!(q.reasoning ?? "").trim()) nues++;
      }
  assert.ok(total > 1000, `${total} questions — corpus incomplet ?`);
  assert.equal(nues, 0, `${nues} question(s) sans raisonnement sur ${total}`);
});

test("les libellés humains ne sont jamais vides", () => {
  for (const e of EPREUVES) {
    assert.match(epreuveTitre(e), /\S/, `titre vide pour ${e.id}`);
    assert.match(filiereLabel(e.filiere), /\S/, `filière vide pour ${e.id}`);
  }
});
