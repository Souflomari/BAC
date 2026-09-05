/**
 * test-typographie.mjs — tests unitaires de `web/src/lib/frenchTypography.ts`.
 *
 * Cette fonction est appliquée au texte que l'élève LIT : la prose des leçons
 * (via `remarkFrenchTypography`), les libellés d'exercice, les intitulés de
 * l'assembleur d'épreuves. Ses quatre règles étaient jusqu'ici gardées
 * uniquement par `typo-francaise.mjs`, qui mesure le rendu de quelques pages —
 * un filet à grosses mailles pour une fonction pure de trente lignes.
 *
 * Le cas qui a motivé ce fichier : la règle (d), la liaison insécable entre un
 * nombre et son unité — et le premier test rouge qu'on lui a fait passer, qui
 * a montré que la crainte était mal placée. On croyait l'ORDRE de la liste
 * d'unités déterminant (`m` avant `mA` aurait coupé l'unité en deux) : la
 * liste inversée exprès, les tests sont restés verts. Ce qui protège
 * réellement, c'est le lookahead final — sans lui « 3 mètres » et
 * « l'exercice 3 montre » se lieraient. Les tests ci-dessous gardent LES DEUX
 * comportements, celui qu'on craignait et celui qui compte.
 *
 * Depuis `web/` :   node --test scripts/test-typographie.mjs
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true });
const { frenchTypography: f } = jiti(path.join(WEB, "src/lib/frenchTypography.ts"));

const NNBSP = " "; // espace fine insécable
const NBSP = " "; // espace insécable

test("(a) l'apostrophe droite entre deux lettres devient typographique", () => {
  assert.equal(f("l'élève"), "l’élève");
  assert.equal(f("aujourd'hui"), "aujourd’hui");
});

test("(a) une apostrophe qui n'est pas entre deux lettres est laissée seule", () => {
  assert.equal(f("'x"), "'x");
  assert.equal(f("5'"), "5'");
});

test("(b) une paire de guillemets droits autour de prose devient « … »", () => {
  assert.equal(f('il dit "bonjour" ici'), `il dit «${NNBSP}bonjour${NNBSP}» ici`);
});

test("(b) une paire sans lettre est laissée seule", () => {
  assert.equal(f('"123"'), '"123"');
});

test("(c) espace fine insécable devant la ponctuation haute", () => {
  assert.equal(f("Vraiment ?"), `Vraiment${NNBSP}?`);
  assert.equal(f("Vraiment?"), `Vraiment${NNBSP}?`);
  assert.equal(f("a : b ; c !"), `a${NNBSP}: b${NNBSP}; c${NNBSP}!`);
});

test("(d) un nombre est lié à son unité par une espace insécable", () => {
  assert.equal(f("un bidon de 3 L"), `un bidon de 3${NBSP}L`);
  assert.equal(f("à 0 °C"), `à 0${NBSP}°C`);
  assert.equal(f("une masse de 2,5 kg"), `une masse de 2,5${NBSP}kg`);
  assert.equal(f("30 % des élèves"), `30${NBSP}% des élèves`);
  assert.equal(f("10 Ω"), `10${NBSP}Ω`);
});

test("(d) une unité à plusieurs lettres se lie d'un bloc", () => {
  // Vérifié le 2026-09-05 : ces cas passent MÊME avec la liste inversée
  // (`m` avant `mA`). Le remplacement n'insère qu'une espace dans un créneau
  // déjà consommé, et il n'y a pas d'espace entre `m` et `A` à déranger.
  // Le test reste : il épingle le comportement, pas la crainte.
  assert.equal(f("25 mA"), `25${NBSP}mA`);
  assert.equal(f("12 mL"), `12${NBSP}mL`);
  assert.equal(f("3 min"), `3${NBSP}min`);
  assert.equal(f("40 MeV"), `40${NBSP}MeV`);
  assert.equal(f("5 mol"), `5${NBSP}mol`);
});

// LE test qui garde vraiment la règle : c'est le lookahead final, pas l'ordre
// de la liste. Retirez `(?![\p{L}\d])` et ces quatre assertions tombent.
test("(d) une unité ÉCRITE EN TOUTES LETTRES reste un mot ordinaire", () => {
  assert.equal(f("3 mètres"), "3 mètres");
  assert.equal(f("2 Ampères"), "2 Ampères");
  assert.equal(f("4 axiomes"), "4 axiomes");
  assert.equal(f("l'exercice 3 montre"), "l’exercice 3 montre");
});

test("(d) un nombre déjà lié à son unité n'est pas retouché", () => {
  assert.equal(f(`3${NBSP}L`), `3${NBSP}L`);
});

test("la fonction est idempotente", () => {
  const cas = [
    `un bidon de 3 L à 0 °C : 25 mA, "voilà" !`,
    "l'élève dit : 30 % ; 2,5 kg ?",
    "3 mètres, 4 axiomes",
  ];
  for (const c of cas) {
    const une = f(c);
    assert.equal(f(une), une, `non idempotent sur « ${c} »`);
  }
});
