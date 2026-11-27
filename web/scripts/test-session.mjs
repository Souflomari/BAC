/**
 * test-session.mjs — tests unitaires de `web/src/lib/session.ts`.
 *
 * POURQUOI CE FICHIER EXISTE (2026-09-05). `sessionFromState` décide de
 * l'ACTION PRINCIPALE de la page d'accueil : quelle notion proposer, et si
 * l'on dit « commencer » ou « reprendre ». C'est le lien le plus important du
 * site, et il n'avait aucun test — alors que le module est une fonction PURE
 * (elle reçoit `notions` et `state`, elle ne lit rien), donc la chose la plus
 * facile à épingler du produit.
 *
 * Le manque s'est vu en corrigeant `startSession` le matin même : il triait
 * par DATE DE FICHIER et proposait « la plus récente », ce qui après un clone
 * frais retombe sur l'ordre du système de fichiers. Rien n'aurait signalé le
 * retour du défaut. Le test « la première du PROGRAMME, pas la première du
 * tableau » ci-dessous est exactement ce garde-fou.
 *
 * Depuis `web/` :   node --test scripts/test-session.mjs
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
const { sessionFromState } = jiti(path.join(WEB, "src/lib/session.ts"));
const { SUBJECTS, subjectChapterIds, DEFAULT_SUBJECT_ORDER } = jiti(
  path.join(WEB, "src/lib/curriculum.ts")
);

/** Une notion minimale : `sessionFromState` ne lit que `id`. */
const notion = (id) => {
  const [subject, slug] = id.split("/");
  return { id, subject, slug, title: `Titre de ${slug}`, readingMinutes: 10 };
};

/** Les identifiants du cadre, dans l'ordre du programme, pour une matière. */
const cadre = (s) => subjectChapterIds(SUBJECTS[s]);

const MATHS = cadre("maths");
const PREMIERE_MATHS = MATHS[0];

test("sans état : la première notion du PROGRAMME, pas la première du tableau", () => {
  // Le tableau est donné dans un ordre DÉLIBÉRÉMENT faux (le dernier chapitre
  // du cadre en tête) : c'est ce que rendait le tri par date de fichier.
  const notions = [...MATHS].reverse().map(notion);
  const s = sessionFromState(notions, null);
  assert.equal(s.kind, "start");
  assert.equal(
    s.notion.id,
    PREMIERE_MATHS,
    `attendu ${PREMIERE_MATHS}, obtenu ${s.notion.id} — l'ordre du tableau a repris le dessus`
  );
});

test("sans état : l'ordre des MATIÈRES est celui du cadre", () => {
  // Philo d'abord dans le tableau ; maths doit tout de même gagner, parce que
  // DEFAULT_SUBJECT_ORDER commence par maths.
  assert.equal(DEFAULT_SUBJECT_ORDER[0], "maths");
  const notions = [...cadre("philo"), ...MATHS].map(notion);
  const s = sessionFromState(notions, null);
  assert.equal(s.notion.id, PREMIERE_MATHS);
});

test("sans état : la notion proposée EXISTE dans la liste reçue", () => {
  // Le cadre connaît des chapitres non construits ; on ne doit jamais
  // proposer un chapitre absent du tableau.
  const construites = MATHS.slice(3).map(notion); // les trois premiers manquent
  const s = sessionFromState(construites, null);
  assert.ok(
    construites.some((n) => n.id === s.notion.id),
    `${s.notion.id} n'est pas dans la liste des notions construites`
  );
  assert.equal(s.notion.id, MATHS[3]);
});

test("liste vide : null, pas une carte vide", () => {
  assert.equal(sessionFromState([], null), null);
});

test("état avec lastSession : on REPREND, au bon chapitre", () => {
  const notions = MATHS.map(notion);
  const cible = MATHS[4];
  const s = sessionFromState(notions, {
    lastSession: { notionId: cible, chapterIndex: 2, at: "2026-09-05T10:00:00Z" },
    perNotion: { [cible]: { chaptersTotal: 9 } },
  });
  assert.equal(s.kind, "resume");
  assert.equal(s.notion.id, cible);
  assert.equal(s.step, 3); // chapterIndex 2 → chapitre 3
  assert.equal(s.totalSteps, 9);
  assert.equal(s.position, "Chapitre 3");
});

test("état pointant une notion DISPARUE : on retombe sur « commencer »", () => {
  const notions = MATHS.map(notion);
  const s = sessionFromState(notions, {
    lastSession: { notionId: "maths/notion-supprimee", chapterIndex: 2, at: "x" },
    perNotion: { "maths/notion-supprimee": { chaptersTotal: 9 } },
  });
  assert.equal(s.kind, "start");
  assert.equal(s.notion.id, PREMIERE_MATHS);
});

test("état sans entrée perNotion : on retombe sur « commencer », jamais un reprise cassée", () => {
  const notions = MATHS.map(notion);
  const s = sessionFromState(notions, {
    lastSession: { notionId: MATHS[1], chapterIndex: 4, at: "x" },
    perNotion: {},
  });
  assert.equal(s.kind, "start");
});

test("un chapitre hors bornes est RAMENÉ dans l'intervalle, jamais rendu tel quel", () => {
  const notions = MATHS.map(notion);
  const cible = MATHS[0];
  const trop = sessionFromState(notions, {
    lastSession: { notionId: cible, chapterIndex: 99, at: "x" },
    perNotion: { [cible]: { chaptersTotal: 6 } },
  });
  assert.equal(trop.step, 6, "un index trop grand doit être ramené au dernier chapitre");
  const negatif = sessionFromState(notions, {
    lastSession: { notionId: cible, chapterIndex: -5, at: "x" },
    perNotion: { [cible]: { chaptersTotal: 6 } },
  });
  assert.equal(negatif.step, 1, "un index négatif doit être ramené au premier chapitre");
});

test("chaptersTotal à zéro ne produit jamais « Chapitre 1 / 0 »", () => {
  const notions = MATHS.map(notion);
  const cible = MATHS[0];
  const s = sessionFromState(notions, {
    lastSession: { notionId: cible, chapterIndex: 0, at: "x" },
    perNotion: { [cible]: { chaptersTotal: 0 } },
  });
  assert.ok(s.totalSteps >= 1, `totalSteps = ${s.totalSteps}`);
  assert.ok(s.step >= 1 && s.step <= s.totalSteps);
});

test("la carte « commencer » dit POURQUOI, et le dit honnêtement", () => {
  const s = sessionFromState(MATHS.map(notion), null);
  assert.equal(s.kind, "start");
  assert.match(s.reason, /parcours/i);
  // Le motif ne doit plus jamais invoquer une DATE : c'est le défaut corrigé
  // le 2026-09-05 (une date de fichier n'est pas un fait sur le contenu).
  assert.doesNotMatch(s.reason, /récent|mise à jour|date/i);
});
