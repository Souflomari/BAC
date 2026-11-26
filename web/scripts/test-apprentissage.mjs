/**
 * test-apprentissage.mjs — la table de cas du modèle pur `web/src/lib/apprentissage.ts`
 * (docs/design/APPRENTISSAGE-DONNEES.md §2 à §4, §9, §10).
 *
 * Lancement (Node 22 du dépôt : le TypeScript est lu directement, sans build ni dépendance) :
 *   node --experimental-strip-types web/scripts/test-apprentissage.mjs
 * (depuis la racine ; depuis web/ : node --experimental-strip-types scripts/test-apprentissage.mjs)
 *
 * Chaque cas porte un nom et dit ce qu'il affirme. Les journaux sont fabriqués ici : aucun
 * élève réel, aucune donnée de l'appareil.
 */
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const A = await import(path.join(WEB, "src/lib/apprentissage.ts"));
const { LOGARITHME } = await import(path.join(WEB, "src/lib/apprentissage-catalogue/logarithme.ts"));
const { GRAPHE } = await import(path.join(WEB, "src/lib/apprentissage-catalogue/graphe-transversal.ts"));

const CAT = A.composerCatalogue([LOGARITHME], GRAPHE);
const T0 = Date.parse("2026-11-24T09:00:00Z");
const JOUR = 86_400_000;
const date = (j, h = 0) => new Date(T0 + j * JOUR + h * 3_600_000).toISOString();
const maintenant = (j = 0, h = 0) => new Date(T0 + j * JOUR + h * 3_600_000);
let n = 0;
const id = () => `e${++n}`;

/** une réponse de leçon */
const L = (j, cle, option, { essai = 1, juste, seance = "s-lecon", h = 0, signature } = {}) => ({
  v: 1, id: id(), t: date(j, h), seance, type: "lecon_reponse", notion: "logarithme", cle, nature: "question", option, essai,
  juste: juste ?? LOGARITHME.questions[cle].juste === option, ...(signature ? { signature } : {}),
});
/** une réponse d'exercice */
const X = (j, gabarit, graine, { lecon = "logarithme", q = 0, qtype = "nombre", essai = 1, juste = true, erreur = null, indice = false, seance, h = 0 } = {}) => ({
  v: 1, id: id(), t: date(j, h), seance: seance ?? `s-${j}`, type: "exo_reponse", notion: lecon, gabarit, graine, question: q, qtype, essai, juste, erreur, indice_vu: indice,
});
const analyse = (journal, opts = {}) => A.analyser(journal, CAT, { maintenant: opts.maintenant ?? maintenant(0, 12), examen: opts.examen, filiere: opts.filiere });
const cap = (a, c) => a.capacites.find((x) => x.capacite === c);
const conc = (a, k) => a.conceptions.find((x) => x.conception === k);
const REG = "maths-sexp 1.2.16";
const RES = "maths-sexp 1.2.17";

const cas = [];
const ok = (nom, affirme, f) => cas.push({ nom, affirme, f });

// ── 1. Lecture du journal ──────────────────────────────────────────────────────

ok("journal vide", "rien n'est dit : toutes les capacités « jamais vue », estimation au point de départ, aucune action", () => {
  const a = analyse([]);
  assert.ok(a.capacites.length > 5);
  assert.ok(a.capacites.every((c) => c.etat === "jamais_vue" && c.confiance === "insuffisante" && c.estimation === A.PARAMS.pInitiale));
  assert.equal(a.actions.length, 0);
  assert.ok(a.conceptions.every((d) => d.etat === "non_evaluee"));
});

ok("journal abîmé", "un journal qui n'est pas un tableau, des entrées nulles, des types inconnus ou des champs manquants sont ignorés et comptés, sans erreur", () => {
  assert.equal(analyse("pas un tableau").lecture.evenements, 0);
  assert.equal(analyse({ a: 1 }).lecture.evenements, 0);
  const a = analyse([null, 3, { type: "inconnu", notion: "logarithme", t: date(0) }, { type: "exo_reponse", notion: "logarithme", t: date(0) }, { type: "lecon_reponse", t: "pas une date", notion: "logarithme", cle: "q1", option: 1 }, X(0, "ln-somme", 11)]);
  assert.equal(a.lecture.evenements, 1);
  assert.equal(a.lecture.ignores, 5);
});

ok("doublons", "un événement présent deux fois (même id) ne compte qu'une fois", () => {
  const e = X(0, "ln-somme", 11);
  assert.equal(analyse([e, e, { ...e }]).lecture.evenements, 1);
});

ok("événements dans le désordre", "l'ordre du tableau ne change rien : le modèle trie par date", () => {
  const j = [X(0, "ln-somme", 11), X(1, "ln-quotient", 12, { juste: false, erreur: "ln(a/b) = ln a / ln b" }), X(2, "ln-quotient", 13), X(3, "ln-simplifier", 14)];
  const a1 = analyse(j, { maintenant: maintenant(4) });
  const a2 = analyse([j[2], j[0], j[3], j[1]], { maintenant: maintenant(4) });
  assert.deepEqual(a2.capacites, a1.capacites);
  assert.deepEqual(a2.conceptions, a1.conceptions);
});

ok("horloge de l'appareil fausse", "une date dans le futur ou avant l'existence de l'application est ramenée dans l'intervalle et signalée ; la preuve reste", () => {
  const futur = { ...X(0, "ln-somme", 11), t: "2031-01-01T00:00:00Z" };
  const passe = { ...X(0, "ln-quotient", 12), t: "2001-01-01T00:00:00Z" };
  const a = analyse([futur, passe]);
  assert.equal(a.lecture.horlogeDouteuse, true);
  assert.equal(a.lecture.evenements, 2);
  assert.ok(cap(a, REG).preuves.every((p) => Date.parse(p.date) <= maintenant(0, 12).getTime()));
  assert.equal(analyse([X(0, "ln-somme", 11)]).lecture.horlogeDouteuse, false);
});

ok("pari jamais noté", "une réponse de nature « pari » ne crée ni observation ni diagnostic", () => {
  const a = analyse([{ ...L(0, "q3", 1), nature: "pari", juste: null }]);
  assert.ok(a.capacites.every((c) => c.etat === "jamais_vue"));
  assert.ok(a.conceptions.every((d) => d.observations.length === 0));
});

ok("version de leçon différente", "une réponse écrite pour une autre version de la leçon (signature différente) n'est pas lue avec ce catalogue : pas d'exhibition", () => {
  const a = analyse([L(0, "q3", 1, { signature: "autre,version" }), L(0, "retour", 2, { signature: "autre,version" })]);
  assert.equal(conc(a, "ln.somme-en-somme").observations.length, 0);
  const b = analyse([L(0, "q3", 1, { signature: LOGARITHME.signature })]);
  assert.equal(conc(b, "ln.somme-en-somme").observations.length, 1);
});

ok("fusion de deux appareils", "fusionner est idempotent et commutatif : même analyse quel que soit l'ordre, et deux fois le même journal ne double rien", () => {
  const telephone = [X(0, "ln-somme", 11), X(2, "ln-quotient", 12)];
  const ordinateur = [X(1, "ln-simplifier", 13), telephone[0]];
  const ab = A.fusionnerJournaux(telephone, ordinateur);
  const ba = A.fusionnerJournaux(ordinateur, telephone);
  assert.equal(ab.length, 3);
  assert.deepEqual(analyse(ab, { maintenant: maintenant(3) }).capacites, analyse(ba, { maintenant: maintenant(3) }).capacites);
  assert.deepEqual(A.fusionnerJournaux(ab, ab), ab);
});

// ── 2. Le suivi continu par capacité ───────────────────────────────────────────

ok("réussit tout du premier coup", "deux saisies justes seules, sur deux gabarits différents : la capacité est comprise, sa phrase le dit, aucune conception active", () => {
  const a = analyse([X(0, "ln-somme", 11, { q: 1 }), X(0, "ln-quotient", 12, { q: 1, h: 1 })]);
  const c = cap(a, REG);
  assert.equal(c.etat, "comprise");
  assert.ok(c.estimation >= A.PARAMS.seuilComprise);
  assert.match(c.phrase, /deux exercices différents/);
  assert.ok(a.conceptions.every((d) => d.etat !== "active"));
});

ok("deux réussites sur le même énoncé", "deux questions d'un même tirage ne font pas deux énoncés distincts : pas encore comprise", () => {
  const a = analyse([X(0, "ln-somme", 11, { q: 0 }), X(0, "ln-somme", 11, { q: 1 })]);
  assert.equal(cap(a, REG).reussitesSeules, 1);
  assert.notEqual(cap(a, REG).etat, "comprise");
});

ok("deux QCM seuls", "deux QCM à 3 options réussis ne suffisent pas (on devine 1 fois sur 9) ; une saisie de plus, si", () => {
  const deux = [X(0, "ln-somme", 11, { qtype: "qcm" }), X(0, "ln-quotient", 12, { qtype: "qcm", h: 1 })];
  const a = analyse(deux);
  assert.equal(cap(a, REG).etat, "en_cours");
  assert.ok(cap(a, REG).estimation < A.PARAMS.seuilComprise);
  const b = analyse([...deux, X(0, "ln-simplifier", 13, { h: 2 })]);
  assert.equal(cap(b, REG).etat, "comprise");
});

ok("qui devine", "un élève qui répond au hasard dans des QCM : erreurs dispersées, aucune conception active (taux d'exhibition sous la moitié), capacité non comprise", () => {
  const j = [
    X(0, "ln-somme", 1, { qtype: "qcm", juste: false, erreur: "ln(a + b) = ln a + ln b" }),
    X(0, "ln-somme", 2, { qtype: "qcm", juste: false, erreur: "ln(ab) = ln a × ln b", h: 1 }),
    X(0, "ln-vrai-faux", 3, { qtype: "qcm", juste: true, h: 2 }),
    X(0, "ln-equation", 4, { q: 1, qtype: "qcm", juste: false, erreur: "ln a + ln b = ln(a + b)", h: 3 }),
    X(0, "ln-vrai-faux", 5, { qtype: "qcm", juste: true, h: 4 }),
    X(0, "ln-equation", 6, { q: 1, qtype: "qcm", juste: false, erreur: "garder un ln d’un seul côté", h: 5 }),
    X(0, "ln-somme", 7, { qtype: "qcm", juste: true, h: 6 }),
  ];
  const a = analyse(j);
  const d = conc(a, "ln.somme-en-somme");
  assert.equal(d.observations.filter((o) => o.nature === "forte").length, 2);
  assert.ok(d.occasions >= 5);
  assert.equal(d.etat, "probable");
  assert.ok(a.conceptions.every((x) => x.etat !== "active"));
  assert.notEqual(cap(a, REG).etat, "comprise");
});

ok("une erreur d'inattention", "une erreur corrigée seule au second essai, sans indice, est une inattention : jamais une exhibition, même deux fois", () => {
  const j = [
    X(0, "ln-somme", 1, { qtype: "qcm", juste: false, erreur: "ln(a + b) = ln a + ln b" }), X(0, "ln-somme", 1, { qtype: "qcm", essai: 2 }),
    X(1, "ln-equation", 2, { q: 1, qtype: "qcm", juste: false, erreur: "ln a + ln b = ln(a + b)" }), X(1, "ln-equation", 2, { q: 1, qtype: "qcm", essai: 2 }),
  ];
  const d = conc(analyse(j, { maintenant: maintenant(2) }), "ln.somme-en-somme");
  assert.deepEqual(d.observations.map((o) => o.nature), ["inattention", "inattention"]);
  assert.equal(d.etat, "non_evaluee");
});

ok("un indice change la preuve", "une réussite après indice est « aidée » : elle pèse moitié, monte moins l'estimation, et ne compte pas pour « comprise »", () => {
  const seul = analyse([X(0, "ln-somme", 1)]);
  const aide = analyse([X(0, "ln-somme", 1, { indice: true })]);
  assert.ok(cap(aide, REG).estimation < cap(seul, REG).estimation);
  assert.equal(cap(aide, REG).observations, 0.5);
  assert.equal(cap(aide, REG).reussitesSeules, 0);
  assert.equal(cap(aide, REG).preuves[0].issue, "aidee");
});

ok("un échec remet le compte", "une capacité comprise puis ratée redevient « en cours », ses réussites seules repartent de zéro", () => {
  const a = analyse([X(0, "ln-somme", 1), X(0, "ln-quotient", 2, { h: 1 }), X(1, "ln-simplifier", 3, { juste: false }), X(1, "ln-simplifier", 3, { juste: false, essai: 2 })], { maintenant: maintenant(1, 4) });
  assert.equal(cap(a, REG).etat, "en_cours");
  assert.equal(cap(a, REG).reussitesSeules, 0);
});

ok("deux séances le même jour", "deux réussites le même jour, en deux séances : la mémoire ne s'allonge pas (rappel immédiat) et le retour est fixé au lendemain", () => {
  const a = analyse([X(0, "ln-somme", 1, { seance: "matin" }), X(0, "ln-quotient", 2, { seance: "soir", h: 8 })], { maintenant: maintenant(0, 9) });
  const c = cap(a, REG);
  assert.ok(Math.abs(c.demiVie - A.PARAMS.demiVieInitiale) < 0.05);
  assert.equal(A.intervalleRetour(c.demiVie, T0, maintenant(0)), 1);
});

ok("révision trop tôt", "une réussite une heure après la précédente ne fait presque rien gagner à la mémoire ; la même réussite à l'heure prévue la multiplie par environ 2,2", () => {
  const tot = analyse([X(0, "ln-somme", 1), X(0, "ln-quotient", 2, { h: 1 })], { maintenant: maintenant(0, 2) });
  const aTemps = analyse([X(0, "ln-somme", 1), X(1, "ln-quotient", 2)], { maintenant: maintenant(1, 1) });
  assert.ok(cap(tot, REG).demiVie < A.PARAMS.demiVieInitiale * 1.05);
  const f = cap(aTemps, REG).demiVie / A.PARAMS.demiVieInitiale;
  assert.ok(f > 1.9 && f < 2.6, `facteur ${f}`);
});

ok("à revoir après l'oubli", "comprise, puis dix jours sans y toucher : « à revoir », et une action de révision calme est proposée", () => {
  const a = analyse([X(0, "ln-somme", 1), X(0, "ln-quotient", 2, { h: 1 })], { maintenant: maintenant(10) });
  assert.equal(cap(a, REG).etat, "a_revoir");
  const r = a.actions.find((x) => x.motif === "revision");
  assert.ok(r);
  assert.equal(r.cible.type, "gabarit");
});

ok("retenue après une semaine", "une réussite seule plus de 7 jours après la précédente, une fois comprise, rend la capacité « retenue »", () => {
  const a = analyse([X(0, "ln-somme", 1), X(0, "ln-quotient", 2, { h: 1 }), X(8, "ln-simplifier", 3)], { maintenant: maintenant(8, 1) });
  assert.equal(cap(a, REG).retenue, true);
  assert.equal(cap(a, REG).etat, "comprise");
});

ok("examen dans trois jours", "les intervalles sont comprimés (au plus ⌊0,2 × J⌋, au moins 1 jour) et aucun retour n'est fixé après la veille de l'avant-veille de l'examen (D − 2)", () => {
  const exam = new Date(T0 + 3 * JOUR).toISOString().slice(0, 10);
  const j = [X(0, "ln-somme", 1), X(0, "ln-quotient", 2, { h: 1 }), X(0, "ln-simplifier", 3, { h: 2 })];
  const sans = analyse(j, { maintenant: maintenant(0, 3) });
  const avec = analyse(j, { maintenant: maintenant(0, 3), examen: exam });
  const d = Date.parse(exam + "T00:00:00Z");
  assert.ok(Date.parse(cap(avec, REG).prochaineRevision) <= d - 2 * JOUR + JOUR / 2);
  assert.ok(Date.parse(cap(avec, REG).prochaineRevision) <= Date.parse(cap(sans, REG).prochaineRevision));
  assert.equal(A.intervalleRetour(50, T0, maintenant(0), new Date(T0 + 30 * JOUR).toISOString().slice(0, 10)), 6);
});

ok("après l'examen", "le jour de l'examen passé, plus aucune date de retour n'est fixée", () => {
  const a = analyse([X(0, "ln-somme", 1)], { maintenant: maintenant(5), examen: new Date(T0 + 2 * JOUR).toISOString().slice(0, 10) });
  assert.equal(cap(a, REG).prochaineRevision, null);
});

ok("filière", "en filière PC, seules les capacités du cadre « maths-sexp » sont suivies ; en SM, seules celles de « maths-sm »", () => {
  const pc = analyse([X(0, "ln-somme", 1)], { filiere: "PC" });
  assert.ok(pc.capacites.length && pc.capacites.every((c) => c.capacite.startsWith("maths-sexp")));
  const sm = analyse([X(0, "ln-somme", 1)], { filiere: "SM" });
  assert.ok(sm.capacites.length && sm.capacites.every((c) => c.capacite.startsWith("maths-sm")));
});

// ── 3. L'estimation continue ───────────────────────────────────────────────────

ok("estimation : monotonie", "une réponse juste fait monter l'estimation, une fausse la fait baisser (ou monter moins) ; partir plus haut finit plus haut", () => {
  for (const p of [0.1, 0.3, 0.5, 0.7, 0.9]) {
    assert.ok(A.majBKT(p, true, 1 / 3) > A.majBKT(p, false, 1 / 3));
    assert.ok(A.majBKT(p, true, 1 / 3) > p);
    assert.ok(A.majBKT(p + 0.05, true, 1 / 3) > A.majBKT(p, true, 1 / 3));
    assert.ok(A.majBKT(p + 0.05, false, 1 / 3) > A.majBKT(p, false, 1 / 3));
  }
});

ok("estimation : effet du hasard", "plus on peut réussir au hasard, moins une réussite prouve : vrai/faux < QCM à 4 options < saisie", () => {
  const p = A.PARAMS.pInitiale;
  const vf = A.majBKT(p, true, 1 / 2), qcm4 = A.majBKT(p, true, 1 / 4), saisie = A.majBKT(p, true, A.PARAMS.hasardSaisie);
  assert.ok(vf < qcm4 && qcm4 < saisie);
  const a = analyse([X(0, "ln-vrai-faux", 1, { qtype: "qcm" })]);
  const b = analyse([X(0, "ln-somme", 1, { qtype: "nombre" })]);
  assert.ok(cap(a, REG).estimation < cap(b, REG).estimation);
});

ok("estimation : oubli", "sans pratique, l'estimation baisse avec le temps, jamais sous le point de départ ; une mémoire plus longue oublie moins vite", () => {
  const j = [X(0, "ln-somme", 1), X(0, "ln-quotient", 2, { h: 1 })];
  const e1 = cap(analyse(j, { maintenant: maintenant(1) }), REG).estimation;
  const e30 = cap(analyse(j, { maintenant: maintenant(30) }), REG).estimation;
  const e400 = cap(analyse(j, { maintenant: maintenant(400) }), REG).estimation;
  assert.ok(e1 > e30 && e30 >= e400 && e400 >= A.PARAMS.pInitiale);
  assert.ok(A.oublier(0.9, 10, 20) > A.oublier(0.9, 10, 5));
});

ok("estimation : incertitude", "une seule observation : « pas encore assez pour dire » ; l'intervalle se resserre quand les observations s'accumulent", () => {
  const un = cap(analyse([X(0, "ln-somme", 1)]), REG);
  assert.equal(un.confiance, "insuffisante");
  const six = cap(analyse([1, 2, 3, 4, 5, 6].map((g, i) => X(0, ["ln-somme", "ln-quotient", "ln-simplifier"][i % 3], g, { h: i }))), REG);
  assert.equal(six.confiance, "bonne");
  assert.ok(six.intervalle[1] - six.intervalle[0] < un.intervalle[1] - un.intervalle[0]);
  assert.equal(A.categorie(un), "reste_a_voir");
});

ok("estimation : la courbe", "chaque réponse ajoute un point daté à la courbe de la capacité, dans l'ordre du temps", () => {
  const c = cap(analyse([X(0, "ln-somme", 1), X(1, "ln-quotient", 2, { juste: false }), X(2, "ln-simplifier", 3)], { maintenant: maintenant(3) }), REG);
  assert.equal(c.courbe.length, 3);
  assert.ok(c.courbe[1].estimation < c.courbe[0].estimation && c.courbe[2].estimation > c.courbe[1].estimation);
  assert.ok(Date.parse(c.courbe[0].date) < Date.parse(c.courbe[2].date));
});

// ── 4. Les conceptions erronées ────────────────────────────────────────────────

ok("une erreur isolée", "une seule erreur de leçon n'est pas un diagnostic : « probable », jamais « active »", () => {
  const d = conc(analyse([L(0, "q3", 1)]), "ln.somme-en-somme");
  assert.equal(d.etat, "probable");
  assert.match(d.phrase, /ne suffit pas/);
});

ok("conception active", "deux erreurs fortes sur deux énoncés distincts, au-dessus du plancher de 3 lieux et plus d'une fois sur deux : active", () => {
  const a = analyse([X(0, "ln-somme", 1, { qtype: "qcm", juste: false, erreur: "ln(a + b) = ln a + ln b" }), X(0, "ln-somme", 1, { qtype: "qcm", essai: 2, juste: false }), L(0, "q3", 1, { h: 1 })]);
  const d = conc(a, "ln.somme-en-somme");
  assert.equal(d.etat, "active");
  assert.equal(d.tenace, false);
  assert.ok(d.lieux >= 3);
  assert.equal(a.actions[0].motif, "conception");
});

ok("sous le plancher", "une conception piégée par moins de 3 lieux reste « probable » même après deux erreurs", () => {
  const e = "confondre log et ln";
  const d = conc(analyse([X(0, "log-decimal", 1, { juste: false, erreur: e }), X(1, "log-decimal", 2, { juste: false, erreur: e })], { maintenant: maintenant(2) }), "log.confondre-ln");
  assert.ok(d.lieux < 3);
  assert.equal(d.etat, "probable");
});

ok("erreur au second essai ignorée", "une option piégée choisie au second essai (après l'indice) n'est pas une exhibition", () => {
  const a = analyse([L(0, "q3", 2), L(0, "q3", 1, { essai: 2, h: 0.01 })]);
  assert.equal(conc(a, "ln.somme-en-somme").observations.filter((o) => o.nature === "forte").length, 0);
});

ok("conception tenace", "la même erreur trois fois devient tenace", () => {
  const e = "ln(a + b) = ln a + ln b";
  const d = conc(analyse([X(0, "ln-somme", 1, { qtype: "qcm", juste: false, erreur: e }), X(0, "ln-vrai-faux", 2, { qtype: "qcm", juste: false, erreur: e, h: 1 }), L(0, "q3", 1, { h: 2 })]), "ln.somme-en-somme");
  assert.equal(d.etat, "active");
  assert.equal(d.tenace, true);
});

ok("revenue après dix jours", "une erreur vue une fois, puis revue dix jours plus tard sur un autre énoncé : active et tenace", () => {
  const a = analyse([L(0, "q3", 1), X(10, "ln-equation", 5, { q: 1, qtype: "qcm", juste: false, erreur: "ln a + ln b = ln(a + b)" })], { maintenant: maintenant(10, 1) });
  const d = conc(a, "ln.somme-en-somme");
  assert.equal(d.etat, "active");
  assert.equal(d.tenace, true);
  assert.equal(a.actions[0].regle, "conception:tenace");
});

ok("écartée puis rouverte", "deux réussites seules là où l'erreur était possible l'écartent ; une nouvelle erreur la rouvre, tenace", () => {
  const e = "ln(a + b) = ln a + ln b";
  const base = [X(0, "ln-somme", 1, { qtype: "qcm", juste: false, erreur: e }), L(0, "q3", 1, { h: 1 }), X(1, "ln-somme", 2), X(1, "ln-equation", 3, { h: 1 })];
  assert.equal(conc(analyse(base, { maintenant: maintenant(2) }), "ln.somme-en-somme").etat, "ecartee");
  const d = conc(analyse([...base, X(5, "ln-somme", 4, { qtype: "qcm", juste: false, erreur: e })], { maintenant: maintenant(5, 1) }), "ln.somme-en-somme");
  assert.equal(d.etat, "active");
  assert.equal(d.tenace, true);
});

ok("une conception active bloque « comprise »", "tant qu'une erreur liée à la capacité est active, la capacité n'est pas dite comprise", () => {
  const e = "ln(a + b) = ln a + ln b";
  const a = analyse([X(0, "ln-somme", 1, { q: 1 }), X(0, "ln-quotient", 2, { q: 1, h: 1 }), X(0, "ln-simplifier", 3, { h: 2 }), L(0, "q3", 1, { h: 3 }), L(0, "retour", 2, { h: 4, seance: "s2" })]);
  assert.equal(conc(a, "ln.somme-en-somme").etat, "active");
  assert.equal(cap(a, REG).etat, "en_cours");
});

// ── 5. Le diagnostic transversal ───────────────────────────────────────────────

const SEUIL = X(0, "seuil-ln", 21, { lecon: "suites", juste: false, erreur: "le sens gardé en divisant par ln q < 0" });
const DATATION = X(1, "datation-c14", 22, { lecon: "radioactivite", juste: false, erreur: "signe du logarithme" });

ok("prérequis révélé en aval, autre matière", "une erreur de seuil (suites, maths) et une erreur de datation (radioactivité, physique) remontent à un même point du logarithme ; la première action est de le vérifier, et les erreurs d'aval ne sont plus remédiées à part", () => {
  const a = analyse([SEUIL, DATATION], { maintenant: maintenant(2) });
  const h = a.hypotheses[0];
  assert.ok(h, "une hypothèse");
  assert.equal(h.amont, "conception:ineq.sens-diviser-negatif");
  assert.equal(h.statut, "a_verifier");
  assert.equal(new Set(h.explique.map((x) => x.lecon)).size, 2);
  assert.equal(a.actions[0].motif, "prerequis");
  assert.deepEqual(a.actions[0].cible, { type: "gabarit", lecon: "logarithme", gabarit: "ln-domaine" });
  assert.equal(conc(a, "rad.signe-log").expliqueePar, "conception:ineq.sens-diviser-negatif");
  assert.equal(conc(a, "ineq.sens-diviser-negatif").etat, "probable");
});

ok("le prérequis le plus probable", "entre deux prérequis qui expliquent les mêmes erreurs, on retient celui que l'élève a déjà montré dans sa leçon : confirmé, et l'action rejoue l'étape qui l'enseigne", () => {
  const a = analyse([L(0, "q1", 1), SEUIL, DATATION], { maintenant: maintenant(2) });
  assert.equal(a.hypotheses[0].amont, "conception:ln.signe-sur-0-1");
  assert.equal(a.hypotheses[0].statut, "confirmee");
  assert.equal(a.hypotheses.filter((h) => h.statut !== "ecartee").length, 1);
  assert.deepEqual(a.actions[0].cible, { type: "etape", lecon: "logarithme", cle: "gauche" });
});

ok("prérequis écarté", "si les prérequis sont réussis seuls (et la capacité comprise), les erreurs d'aval restent locales : aucune action de prérequis", () => {
  const ok2 = [X(0, "ln-domaine", 31, { q: 1 }), X(0, "ln-domaine", 32, { q: 1, h: 1 }), X(0, "ln-signe", 33, { q: 1, h: 2 }), X(0, "ln-signe", 34, { q: 1, h: 3 }), X(0, "ln-inequation", 35, { q: 1, h: 4 })];
  const a = analyse([...ok2, { ...SEUIL, t: date(1) }, { ...DATATION, t: date(1, 1) }], { maintenant: maintenant(1, 2) });
  assert.ok(a.hypotheses.length > 0 && a.hypotheses.every((h) => h.statut === "ecartee"));
  assert.ok(!a.actions.some((x) => x.motif === "prerequis"));
  assert.equal(conc(a, "rad.signe-log").expliqueePar, undefined);
});

// remplace « e^{2x} lu 2eˣ et le dipôle RC » : l'arête exp.exposant-facteur → rc.coefficient-exposant
// a été retirée à la relecture (2026-11-24) ; le lien maths → RC qui reste vrai passe par la pente.
ok("pente et hauteur, puis le courant du dipôle RC", "la pente prise pour la hauteur en logarithme (étape pente), puis le courant traité comme uC sur deux énoncés de RC : le prérequis du logarithme est retenu, confirmé, et l'action rejoue son étape", () => {
  const a = analyse([
    L(0, "pente", 1),
    X(1, "rc-expressions", 42, { lecon: "dipole-rc", juste: false, erreur: "i part de zéro" }),
    X(1, "rc-expressions", 43, { lecon: "dipole-rc", juste: false, erreur: "i part de zéro", h: 1 }),
  ], { maintenant: maintenant(2) });
  assert.equal(a.hypotheses[0].amont, "conception:graphe.pente-hauteur");
  assert.equal(a.hypotheses[0].statut, "confirmee");
  assert.deepEqual(a.actions[0].cible, { type: "etape", lecon: "logarithme", cle: "pente" });
});

ok("exposant lu comme facteur : plus de lien vers le RC", "l'erreur e^{2x} = 2eˣ puis deux erreurs de coefficient en RC ne remontent plus à l'exponentielle (arête retirée à la relecture)", () => {
  const a = analyse([
    X(0, "exp-trinome", 41, { lecon: "exponentielle", juste: false, erreur: "e^{2x} = 2eˣ" }),
    X(1, "rc-solution", 42, { lecon: "dipole-rc", juste: false, erreur: "α = RC" }),
    X(1, "rc-equation", 43, { lecon: "dipole-rc", juste: false, erreur: "RC multiplié au lieu de divisé", h: 1 }),
  ], { maintenant: maintenant(2) });
  assert.ok(!a.hypotheses.some((h) => h.amont === "conception:exp.exposant-facteur"));
});

// remplace « haploïde et transmission » : l'arête meiose.haploide-une-chromatide → trans.alleles-par-cellule
// a été retirée à la relecture (2026-11-24) ; le lien méiose → transmission qui reste vrai est le dénombrement.
ok("dénombrer en méiose et « et » en transmission", "les choix additionnés en méiose (2 × n), puis l'addition pour « et » dans deux exercices de transmission : la méiose est le prérequis retenu", () => {
  const a = analyse([
    X(0, "gametes-2n", 51, { lecon: "meiose", juste: false, erreur: "le nombre de types s’additionne (2 × n)" }),
    X(3, "f2-monohybride", 52, { lecon: "transmission", juste: false, erreur: "addition pour « et »" }),
    X(3, "f2-deux-genes", 53, { lecon: "transmission", juste: false, erreur: "addition pour « et »", h: 1 }),
  ], { maintenant: maintenant(4) });
  assert.equal(a.hypotheses[0].amont, "conception:meiose.additionner-choix");
  assert.equal(a.hypotheses[0].statut, "confirmee");
  assert.equal(a.actions[0].motif, "prerequis");
  assert.equal(a.actions[0].cible.lecon, "meiose");
});

ok("une seule erreur en aval", "une erreur d'aval isolée ne fait remonter aucun prérequis", () => {
  assert.equal(analyse([SEUIL], { maintenant: maintenant(1) }).hypotheses.length, 0);
});

// ── 5 bis. Les huit autres leçons (catalogue complet) ──────────────────────────
// Les 44 cas ci-dessus lisent le seul catalogue de logarithme (leurs comptes en dépendent) ; ceux-ci
// lisent les neuf catalogues, comme l'interface (apprentissage-catalogue/index.ts).

const NEUF = [];
for (const f of ["logarithme", "exponentielle", "suites", "radioactivite", "noyaux", "dipole-rc", "dipole-rl", "transformations-non-totales", "acides-bases", "complexes", "expression-genetique", "meiose", "transmission"]) {
  NEUF.push(...Object.values(await import(path.join(WEB, `src/lib/apprentissage-catalogue/${f}.ts`))));
}
const CAT9 = A.composerCatalogue(NEUF, GRAPHE);
const analyse9 = (journal, m) => A.analyser(journal, CAT9, { maintenant: m });
/** une réponse de leçon, dans n'importe quelle leçon cataloguée */
const L9 = (lecon, j, cle, option, { h = 0, seance = `s-${lecon}` } = {}) => ({
  v: 1, id: id(), t: date(j, h), seance, type: "lecon_reponse", notion: lecon, cle, nature: "question", option, essai: 1,
  juste: CAT9.lecons[lecon].questions[cle].juste === option,
});

ok("conception hors logarithme", "en expression génétique, le brin non transcrit complémenté à l'étape pari-brin, dans un exercice, puis au piège q1 : la conception du brin est active, et la première action la remédie dans sa leçon", () => {
  const a = analyse9([
    L9("expression-genetique", 0, "pari-brin", 0),
    X(0, "brin-non-transcrit", 61, { lecon: "expression-genetique", qtype: "texte", juste: false, erreur: "complémenter le brin non transcrit", h: 1 }),
    L9("expression-genetique", 0, "q1", 0, { h: 2 }),
  ], maintenant(0, 3));
  const d = a.conceptions.find((x) => x.conception === "gen.brin-transcrit");
  assert.equal(d.etat, "active");
  assert.ok(d.lieux >= 3);
  assert.equal(d.observations.filter((o) => o.nature === "forte").length, 3);
  assert.equal(a.actions[0].motif, "conception");
  assert.equal(a.actions[0].cible.lecon, "expression-genetique");
});

ok("remontée exponentielle vers logarithme", "les conditions d'existence de ln oubliées en logarithme (bac-rejet), puis une racine t < 0 gardée deux fois en exponentielle (étape k-negatif, gabarit exp-trinome) : le prérequis du logarithme est retenu, confirmé, et l'action rejoue son étape", () => {
  const a = analyse9([
    L9("logarithme", 0, "bac-rejet", 1),
    L9("exponentielle", 2, "k-negatif", 1),
    X(2, "exp-trinome", 71, { lecon: "exponentielle", juste: false, erreur: "garder t < 0", h: 1 }),
  ], maintenant(3));
  const h = a.hypotheses[0];
  assert.equal(h.amont, "conception:ln.domaine-oublie");
  assert.equal(h.statut, "confirmee");
  assert.ok(h.explique.every((x) => x.lecon === "exponentielle" && x.conception === "exp.t-negatif"));
  assert.equal(a.conceptions.find((x) => x.conception === "exp.t-negatif").expliqueePar, "conception:ln.domaine-oublie");
  assert.equal(a.actions[0].motif, "prerequis");
  assert.equal(a.actions[0].cible.lecon, "logarithme");
});

ok("remontée physique vers maths", "en radioactivité, le signe du logarithme perdu dans deux gabarits (instant-seuil, datation-c14) ; en logarithme, ln d'un nombre entre 0 et 1 dit positif (q1) : le prérequis ln.signe-sur-0-1 l'emporte, confirmé", () => {
  const a = analyse9([
    L9("logarithme", 0, "q1", 1),
    X(1, "instant-seuil", 80, { lecon: "radioactivite", juste: false, erreur: "signe du logarithme" }),
    X(1, "datation-c14", 81, { lecon: "radioactivite", juste: false, erreur: "signe du logarithme", h: 1 }),
  ], maintenant(2));
  assert.equal(a.hypotheses[0].amont, "conception:ln.signe-sur-0-1");
  assert.equal(a.hypotheses[0].statut, "confirmee");
  assert.deepEqual(a.actions[0].cible, { type: "etape", lecon: "logarithme", cle: "gauche" });
});

ok("la division I traitée comme une mitose", "en méiose, l'anaphase I qui sépare des chromatides (étape anaphase1), la télophase I « pensée mitose » et le gabarit anaphase-alleles : la conception division-i-mitose est active ; homologues et sœurs ne sont pas accusés", () => {
  const a = analyse9([
    L9("meiose", 0, "anaphase1", 1),
    L9("meiose", 0, "telophase1", 1, { h: 1 }),
    X(0, "anaphase-alleles", 91, { lecon: "meiose", qtype: "qcm", juste: false, erreur: "chromatides séparées en anaphase I", h: 2 }),
  ], maintenant(0, 3));
  const d = a.conceptions.find((x) => x.conception === "meiose.division-i-mitose");
  assert.equal(d.etat, "active");
  assert.equal(d.observations.filter((o) => o.nature === "forte").length, 3);
  assert.equal(a.conceptions.find((x) => x.conception === "meiose.soeurs-homologues").observations.filter((o) => o.nature === "forte").length, 0);
});

// ── 6. Les actions et le bilan ─────────────────────────────────────────────────

ok("ordre et nombre des actions", "au plus trois actions : prérequis d'abord, puis conception, puis révision ; des phrases calmes, sans point d'exclamation ni tiret cadratin, jamais « tu ne sais pas »", () => {
  const e = "ln(a/b) = ln a / ln b";
  const a = analyse([
    X(0, "ln-somme", 1), X(0, "ln-simplifier", 2, { h: 1 }), // comprise puis due
    X(9, "ln-quotient", 3, { qtype: "qcm", juste: false, erreur: e }), L(9, "v-regles", 1, { h: 1 }), L(9, "r-quotient", 2, { h: 2, seance: "s9b" }),
    { ...SEUIL, t: date(9, 3) }, { ...DATATION, t: date(9, 4) },
  ], { maintenant: maintenant(12) });
  assert.ok(a.actions.length <= 3);
  const ordre = a.actions.map((x) => x.motif);
  assert.deepEqual(ordre, [...ordre].sort((x, y) => ["prerequis", "conception", "revision"].indexOf(x) - ["prerequis", "conception", "revision"].indexOf(y)));
  assert.equal(ordre[0], "prerequis");
  assert.ok(ordre.includes("conception"));
  const textes = [...a.actions.map((x) => x.raison), ...a.capacites.map((c) => c.phrase), ...a.conceptions.map((d) => d.phrase), ...a.hypotheses.map((h) => h.phrase)];
  for (const t of textes) {
    assert.ok(!/[!—]/.test(t), t);
    assert.ok(!/tu ne sais pas|%/i.test(t), t);
  }
});

ok("bilan par leçon et par matière", "le bilan compte compris, fragile, reste à voir par capacité officielle, regroupés par leçon et par matière, avec la courbe ; jamais un pourcentage", () => {
  const a = analyse([X(0, "ln-somme", 1), X(0, "ln-quotient", 2, { h: 1 }), X(0, "ln-inequation", 3, { juste: false, h: 2 }), X(0, "ln-inequation", 4, { juste: false, h: 3 })]);
  const b = A.bilan(a, CAT);
  const l = b.parLecon.logarithme;
  assert.equal(l.matiere, "maths");
  assert.ok(l.compris >= 1 && l.fragile >= 1 && l.reste_a_voir >= 1);
  assert.equal(l.compris + l.fragile + l.reste_a_voir, l.lignes.length);
  assert.equal(b.parMatiere.maths.total, a.capacites.length);
  assert.ok(l.lignes.every((x) => Array.isArray(x.courbe)));
  assert.equal(b.gardeSurAppareil, true);
  assert.ok(!JSON.stringify(b).includes("%"));
});

ok("le même calcul partout", "analyser deux fois le même journal (appareil, serveur) donne exactement le même résultat : aucune horloge ni hasard caché", () => {
  const j = [SEUIL, DATATION, X(0, "ln-somme", 1), L(0, "q3", 1)];
  assert.deepEqual(analyse(j, { maintenant: maintenant(3) }), analyse(JSON.parse(JSON.stringify(j)), { maintenant: maintenant(3) }));
});

// ── exécution ──────────────────────────────────────────────────────────────────

ok("prérequis écarté, neuf catalogues", "une erreur d'aval qui porte aussi la capacité du prérequis ne confirme pas sa propre cause : avec les neuf leçons cataloguées, le prérequis réussi seul reste écarté", () => {
  const ok2 = [X(0, "ln-domaine", 31, { q: 1 }), X(0, "ln-domaine", 32, { q: 1, h: 1 }), X(0, "ln-signe", 33, { q: 1, h: 2 }), X(0, "ln-signe", 34, { q: 1, h: 3 }), X(0, "ln-inequation", 35, { q: 1, h: 4 })];
  const a = analyse9([...ok2, { ...SEUIL, t: date(1) }, { ...DATATION, t: date(1, 1) }], maintenant(1, 2));
  assert.ok(!a.hypotheses.some((h) => h.statut === "confirmee"));
  assert.ok(!a.actions.some((x) => x.motif === "prerequis"));
});

let passes = 0;
for (const c of cas) {
  try {
    c.f();
    passes++;
    console.log(`ok   ${c.nom} : ${c.affirme}`);
  } catch (e) {
    console.log(`ÉCHEC ${c.nom} : ${c.affirme}\n     ${String(e.message).split("\n").join("\n     ")}`);
  }
}
console.log(`\n${passes} cas sur ${cas.length} passent.`);
process.exit(passes === cas.length ? 0 : 1);
