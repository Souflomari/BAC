/**
 * apprentissage.ts — le modèle de l'élève pour les leçons au format v3, en fonctions pures.
 *
 * Spécification : docs/design/APPRENTISSAGE-DONNEES.md (§2 à §4, §9 diagnostic transversal,
 * §10 analyse à l'état de l'art). Entrées : le journal de l'appareil (`bac-journal-v1`, tel que
 * `lib/journal.ts` l'écrit) et un catalogue (`lib/apprentissage-catalogue/`). Sortie : ce que
 * l'application a le droit de dire, et pourquoi.
 *
 * PUR : aucun accès au navigateur, au stockage, au réseau ni à l'horloge. Le temps `maintenant`
 * est TOUJOURS un paramètre. Rien ne sort de l'appareil : ce module ne fait que calculer.
 *
 * Trois étages, chacun testable seul (`web/scripts/test-apprentissage.mjs`) :
 *   1. le SUIVI CONTINU par capacité officielle : une estimation de maîtrise mise à jour à chaque
 *      réponse (traçage bayésien des connaissances, BKT, à paramètres fixés a priori : le taux de
 *      réussite au hasard vient du nombre d'options, un taux d'étourderie, l'effet de l'indice et
 *      de l'énoncé déjà vu), un oubli avec le temps (une demi-vie par capacité, famille
 *      « half-life regression » / FSRS), une incertitude (« pas encore assez pour dire ») ;
 *      les étiquettes montrées (jamais vue, en cours, comprise, à revoir) se DÉRIVENT de cette
 *      estimation et d'un garde-fou discret (deux réussites seules sur deux énoncés distincts) ;
 *   2. le DIAGNOSTIC des conceptions erronées : non évaluée, probable, active, écartée, avec ses
 *      observations ; inattention et conception tenace distinguées ;
 *   3. le DIAGNOSTIC TRANSVERSAL : devant plusieurs erreurs en aval, on remonte au prérequis
 *      commun le plus probable (graphe `graphe-transversal.ts`), puis la PROCHAINE CHOSE À FAIRE
 *      (au plus trois remédiations : prérequis, puis conception tenace, puis révision due).
 *
 * Vocabulaire : aucun pourcentage montré, aucun score global, aucune série. Les nombres de
 * l'estimation servent à décider et à tracer une courbe ; la phrase dite à l'élève est une
 * observation et une action, jamais « tu ne sais pas ».
 */

// ─────────────────────────────────────────────────────────────────────────────
// Le catalogue : ce que le modèle sait du contenu
// ─────────────────────────────────────────────────────────────────────────────

/** Ce qu'une option fausse révèle : une conception (son identifiant), une inattention, ou rien. */
export type Etiquette = string | "inattention" | "aucune";

export type OptionCatalogue = {
  /** Le début du texte de l'option, sans balises : sert au contrôle de dérive. */
  t: string;
  e: Etiquette;
};

export type QuestionLecon = {
  /** Capacités officielles que la question travaille (identifiants de docs/referentiel/). */
  capacites: string[];
  /** Index de l'option juste dans l'ordre de l'auteur, `null` pour un pari jamais noté. */
  juste: number | null;
  /** Les options dans l'ordre de l'auteur (c'est l'index `option` du journal). */
  options: OptionCatalogue[];
};

export type GabaritCatalogue = {
  capacites: string[];
  niveau: 1 | 2 | 3;
  /** Nombre d'options des QCM du gabarit (l'événement ne le dit pas encore). */
  optionsQcm: number;
  /** Libellé d'erreur (tel que l'exercice l'écrit dans `erreur`) → ce qu'il révèle. */
  erreurs: Record<string, Etiquette>;
};

export type CatalogueLecon = {
  /** Nom de pilote : c'est `notion` dans le journal. */
  lecon: string;
  /** Version du contenu étiqueté : la liste des `cle` de la leçon jointes par des virgules (la même
   *  signature que la reprise de `noyau.js`). Un événement qui porte une autre signature a été
   *  écrit pour une autre version : son index d'option ne se lit plus avec ce catalogue. */
  signature?: string;
  matiere: Matiere;
  questions: Record<string, QuestionLecon>;
  gabarits: Record<string, GabaritCatalogue>;
};

export type Matiere = "maths" | "physique" | "svt";

export type Conception = {
  id: string;
  /** La leçon où elle s'enseigne (où on la remédie d'abord). */
  lecon: string;
  /** Phrase calme, montrable à l'élève : l'erreur, pas la personne. */
  libelle: string;
  capacites: string[];
  /** Étapes de leçon qui l'enseignent (à rejouer), si la leçon est stable. */
  etapes?: string[];
  /** Où elle apparaît dans des exercices, y compris d'autres leçons : [leçon, gabarit, libellé d'erreur]. */
  exercices?: [string, string, string][];
  /** D'où vient-elle : bible, spécification de leçon, exercice. */
  source: string;
};

export type Noeud = { conception: string } | { capacite: string };

export type Arete = {
  amont: Noeud;
  /** L'aval est toujours une conception : une erreur nommée, observable. */
  aval: string;
  raison: string;
  exemple: string;
  source: string;
  statut: "proposition à relire" | "relue";
};

export type Catalogue = {
  lecons: Record<string, CatalogueLecon>;
  conceptions: Record<string, Conception>;
  aretes: Arete[];
  /** Matière de chaque leçon connue, même sans catalogue complet. */
  matieres: Record<string, Matiere>;
};

/** Assemble les catalogues de leçons et le graphe en un seul catalogue. */
export function composerCatalogue(
  lecons: CatalogueLecon[],
  graphe: { conceptions: Conception[]; aretes: Arete[]; matieres: Record<string, Matiere> },
): Catalogue {
  const c: Catalogue = { lecons: {}, conceptions: {}, aretes: graphe.aretes.slice(), matieres: { ...graphe.matieres } };
  for (const l of lecons) {
    c.lecons[l.lecon] = l;
    c.matieres[l.lecon] = l.matiere;
  }
  for (const k of graphe.conceptions) c.conceptions[k.id] = k;
  return c;
}

// ─────────────────────────────────────────────────────────────────────────────
// Les paramètres : fixés a priori, dits comme tels (§10 de la spécification)
// ─────────────────────────────────────────────────────────────────────────────

export const PARAMS = {
  /** BKT : probabilité de connaître la capacité avant toute observation. */
  pInitiale: 0.2,
  /** BKT : probabilité d'apprendre à chaque occasion de pratique. */
  pApprendre: 0.15,
  /** BKT : étourderie, se tromper en sachant. */
  pEtourderie: 0.1,
  /** Réussir une saisie (nombre, texte) sans savoir. */
  hasardSaisie: 0.02,
  /** Réussite « au hasard » plancher quand un indice a été vu, un énoncé déjà rencontré, ou une
   *  question de leçon posée juste après l'explication : la réponse prouve moins. */
  hasardAide: 0.5,
  /** Seuil de l'estimation pour « comprise ». */
  seuilComprise: 0.85,
  /** Mémoire : demi-vie initiale (jours) ; calée pour un premier retour au lendemain. */
  demiVieInitiale: 3.1,
  demiVieMax: 180,
  /** Mémoire : rappel visé au moment du retour. */
  rappelVise: 0.8,
  /** Gain de demi-vie après un rappel réussi : × (1 + gain × (1 − R)). Avec R = 0,8, × 2,2 :
   *  le facteur de l'échelle de Leitner de la spécification. Un rappel trop tôt (R ≈ 1) ne gagne
   *  rien ; un rappel réussi tard gagne davantage. */
  gainRappel: 6,
  /** Un échec divise la demi-vie (≈ deux boîtes de Leitner). */
  diviseurEchec: 5,
  /** Compression par l'examen : intervalle ≤ max(1, ⌊0,2 × J⌋). */
  compression: 0.2,
  /** Diagnostic : nombre de lieux distincts qui piègent une conception pour pouvoir conclure. */
  plancherLieux: 3,
  /** Diagnostic : exhibitions fortes sur des sources distinctes pour « active ». */
  exhibitionsActive: 2,
  /** Diagnostic : part minimale d'exhibitions parmi les occasions (au hasard sur 3 options : 1/3). */
  tauxActive: 0.5,
  /** Diagnostic : somme des preuves (1 − hasard) des réussites seules, sur énoncés distincts, pour
   *  « écartée » : 1,5, soit deux saisies, ou trois QCM à 3 options. */
  preuveEcartee: 1.5,
  /** Une erreur revenue après ce nombre de jours est dite tenace. */
  joursTenace: 3,
  /** Fuseau de l'élève (minutes, Maroc UTC+1) pour découper les jours. */
  decalageMinutes: 60,
  /** Avant cette date, l'application n'existait pas : une date antérieure est une horloge fausse. */
  plancherDate: "2026-09-01T00:00:00Z",
  /** Une date au-delà de `maintenant` + 5 min est une horloge fausse. */
  toleranceFuturMs: 5 * 60 * 1000,
} as const;

const JOUR_MS = 86_400_000;
const jourDe = (ms: number) => Math.floor((ms + PARAMS.decalageMinutes * 60_000) / JOUR_MS);

/** Préfixes des référentiels par filière (docs/referentiel/). */
export const PREFIXES_FILIERE: Record<string, string[]> = {
  PC: ["maths-sexp", "pc-pc", "svt-pc"],
  SVT: ["maths-sexp", "pc-svt", "svt-svt"],
  SM: ["maths-sm", "pc-sm", "svt-sma"],
  "SM-A": ["maths-sm", "pc-sm", "svt-sma"],
  "SM-B": ["maths-sm", "pc-sm", "svt-sma"],
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Lire le journal : garder ce qui est sûr, dire ce qu'on a écarté
// ─────────────────────────────────────────────────────────────────────────────

export type Evenement =
  | { type: "lecon_reponse"; ms: number; seance: string; lecon: string; cle: string; question: boolean; option: number; essai: number; juste: boolean | null; signature: string | null; rang: number }
  | { type: "exo_reponse"; ms: number; seance: string; lecon: string; gabarit: string; graine: number; question: number; qtype: string; essai: number; juste: boolean; erreur: string | null; indice: boolean; rang: number }
  | { type: "exo_correction"; ms: number; seance: string; lecon: string; gabarit: string; graine: number; rang: number };

export type Lecture = {
  evenements: Evenement[];
  /** Nombre d'entrées écartées (type inconnu, champs manquants, doublons). */
  ignores: number;
  /** Au moins une date était hors de l'intervalle possible (horloge de l'appareil fausse). */
  horlogeDouteuse: boolean;
};

const estEntier = (x: unknown): x is number => typeof x === "number" && Number.isInteger(x);
const estTexte = (x: unknown): x is string => typeof x === "string" && x.length > 0;

/**
 * Normalise un journal brut. Une entrée illisible est ignorée, jamais devinée. Les dates
 * impossibles (avant `plancherDate`, ou dans le futur de `maintenant`) sont ramenées dans
 * l'intervalle et signalées : on garde la preuve, on ne lui fait pas confiance pour l'espacement.
 * L'ordre est celui des dates, puis celui du journal à date égale (le journal est écrit dans
 * l'ordre des gestes).
 */
export function lireJournal(brut: unknown, maintenant: Date): Lecture {
  const liste = Array.isArray(brut) ? brut : [];
  const plancher = Date.parse(PARAMS.plancherDate);
  const plafond = maintenant.getTime();
  const vus = new Set<string>();
  const evenements: Evenement[] = [];
  let ignores = 0;
  let horlogeDouteuse = false;
  liste.forEach((x: unknown, rang: number) => {
    if (!x || typeof x !== "object") return void ignores++;
    const o = x as Record<string, unknown>;
    if (estTexte(o.id)) {
      if (vus.has(o.id)) return void ignores++;
      vus.add(o.id);
    }
    let ms = typeof o.t === "string" ? Date.parse(o.t) : NaN;
    if (!Number.isFinite(ms) || !estTexte(o.notion)) return void ignores++;
    if (ms < plancher) {
      ms = plancher;
      horlogeDouteuse = true;
    } else if (ms > plafond + PARAMS.toleranceFuturMs) {
      ms = plafond;
      horlogeDouteuse = true;
    }
    const seance = estTexte(o.seance) ? o.seance : `jour-${jourDe(ms)}`;
    const lecon = o.notion;
    if (o.type === "lecon_reponse") {
      if (!estTexte(o.cle) || !estEntier(o.option) || o.option < 0) return void ignores++;
      const question = o.nature === "question";
      const essai = estEntier(o.essai) && o.essai >= 1 ? o.essai : 1;
      const juste = question ? (typeof o.juste === "boolean" ? o.juste : null) : null;
      if (question && juste === null) return void ignores++;
      const signature = estTexte(o.signature) ? o.signature : null;
      evenements.push({ type: "lecon_reponse", ms, seance, lecon, cle: o.cle, question, option: o.option, essai, juste, signature, rang });
    } else if (o.type === "exo_reponse") {
      if (!estTexte(o.gabarit) || !estEntier(o.question) || typeof o.juste !== "boolean") return void ignores++;
      const essai = estEntier(o.essai) && o.essai >= 1 ? o.essai : 1;
      evenements.push({
        type: "exo_reponse", ms, seance, lecon, gabarit: o.gabarit, graine: estEntier(o.graine) ? o.graine : -1,
        question: o.question, qtype: estTexte(o.qtype) ? o.qtype : "qcm", essai, juste: o.juste,
        erreur: estTexte(o.erreur) ? o.erreur : null, indice: o.indice_vu === true, rang,
      });
    } else if (o.type === "exo_correction") {
      if (!estTexte(o.gabarit)) return void ignores++;
      evenements.push({ type: "exo_correction", ms, seance, lecon, gabarit: o.gabarit, graine: estEntier(o.graine) ? o.graine : -1, rang });
    } else if (o.type === "lecon_etape" || o.type === "lecon_fin" || o.type === "exo_indice" || o.type === "exo_tirage") {
      /* connus, sans preuve pour le modèle d'aujourd'hui */
    } else ignores++;
  });
  evenements.sort((a, b) => a.ms - b.ms || a.rang - b.rang);
  return { evenements, ignores, horlogeDouteuse };
}

/**
 * Fusionne les journaux de plusieurs appareils (ou le journal local et celui du compte). Idempotent :
 * un événement est identifié par son `id` (l'enveloppe de `journal.ts`), donc fusionner deux fois,
 * ou importer un journal déjà importé, ne change rien. Les entrées sans `id` sont gardées telles
 * quelles (elles ne peuvent pas être dédoublonnées : on le sait, et `lireJournal` les accepte).
 * Le résultat est trié par date : le même calcul tourne à l'identique sur l'appareil et au serveur.
 */
export function fusionnerJournaux(...journaux: unknown[]): unknown[] {
  const vus = new Set<string>();
  const sortie: { x: unknown; ms: number; i: number }[] = [];
  let i = 0;
  for (const j of journaux) {
    if (!Array.isArray(j)) continue;
    for (const x of j) {
      const o = x as Record<string, unknown> | null;
      const id = o && typeof o === "object" && estTexte(o.id) ? o.id : null;
      if (id) {
        if (vus.has(id)) continue;
        vus.add(id);
      }
      const ms = o && typeof o.t === "string" ? Date.parse(o.t) : NaN;
      sortie.push({ x, ms: Number.isFinite(ms) ? ms : Infinity, i: i++ });
    }
  }
  return sortie.sort((a, b) => a.ms - b.ms || a.i - b.i).map((s) => s.x);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Les tentatives : une question, du premier essai à la fin
// ─────────────────────────────────────────────────────────────────────────────

export type Issue = "solide" | "aidee" | "echec" | "inachevee";

export type Essai = { juste: boolean; etiquette: Etiquette | null; indice: boolean; ms: number };

export type Tentative = {
  source: "lecon" | "exo";
  lecon: string;
  /** cle d'étape ou id de gabarit */
  ref: string;
  /** l'énoncé : `lecon:cle` ou `gabarit:graine` (deux réussites doivent venir de deux énoncés) */
  enonce: string;
  question: number;
  ms: number;
  seance: string;
  capacites: string[];
  /** probabilité de réussir sans savoir, au premier essai */
  hasard: number;
  essais: Essai[];
  dejaVu: boolean;
  correctionAvant: boolean;
  issue: Issue;
  /** les conceptions qu'une réponse fausse aurait pu révéler ici */
  pieges: string[];
  niveau: number;
};

function etiquetteExo(cat: Catalogue, lecon: string, gabarit: string, erreur: string | null): Etiquette | null {
  if (!erreur) return null;
  const g = cat.lecons[lecon]?.gabarits[gabarit];
  if (g && erreur in g.erreurs) return g.erreurs[erreur];
  for (const k of Object.values(cat.conceptions))
    if (k.exercices?.some(([l, gb, lib]) => l === lecon && gb === gabarit && lib === erreur)) return k.id;
  return null;
}

function piegesExo(cat: Catalogue, lecon: string, gabarit: string): string[] {
  const s = new Set<string>();
  const g = cat.lecons[lecon]?.gabarits[gabarit];
  if (g) for (const e of Object.values(g.erreurs)) if (e !== "inattention" && e !== "aucune") s.add(e);
  for (const k of Object.values(cat.conceptions))
    if (k.exercices?.some(([l, gb]) => l === lecon && gb === gabarit)) s.add(k.id);
  return [...s];
}

const estConception = (e: Etiquette | null): e is string => !!e && e !== "inattention" && e !== "aucune";

/** Regroupe les réponses en tentatives. Une tentative repart à chaque premier essai ou nouvelle séance. */
export function tentatives(lecture: Lecture, cat: Catalogue): Tentative[] {
  const ouvertes = new Map<string, Tentative>();
  const enoncesVus = new Map<string, string>(); // enonce → seance où il est apparu la première fois
  const corrections = new Map<string, number>(); // gabarit:graine:seance → ms
  const sortie: Tentative[] = [];
  for (const e of lecture.evenements) {
    if (e.type === "exo_correction") {
      corrections.set(`${e.gabarit}:${e.graine}:${e.seance}`, e.ms);
      for (const t of ouvertes.values())
        if (t.source === "exo" && t.enonce === `${e.gabarit}:${e.graine}` && t.seance === e.seance && !t.essais.some((x) => x.juste)) t.correctionAvant = true;
      continue;
    }
    if (e.type === "lecon_reponse") {
      if (!e.question) continue; // un pari n'est jamais noté
      const q = cat.lecons[e.lecon]?.questions[e.cle];
      const cle = `L|${e.lecon}|${e.cle}|${e.seance}`;
      let t = ouvertes.get(cle);
      if (!t || e.essai === 1) {
        const enonce = `${e.lecon}:${e.cle}`;
        t = {
          source: "lecon", lecon: e.lecon, ref: e.cle, enonce, question: 0, ms: e.ms, seance: e.seance,
          capacites: q?.capacites ?? [],
          hasard: Math.max(PARAMS.hasardAide, q ? 1 / Math.max(2, q.options.length) : 1 / 3),
          essais: [], dejaVu: enoncesVus.has(enonce) && enoncesVus.get(enonce) !== e.seance, correctionAvant: false,
          issue: "inachevee", pieges: q ? [...new Set(q.options.map((o) => o.e).filter(estConception))] : [], niveau: 1,
        };
        if (!enoncesVus.has(enonce)) enoncesVus.set(enonce, e.seance);
        ouvertes.set(cle, t);
        sortie.push(t);
      }
      const sig = cat.lecons[e.lecon]?.signature;
      const memeVersion = !e.signature || !sig || e.signature === sig;
      const etiquette = q && !e.juste && memeVersion ? (q.options[e.option]?.e ?? null) : null;
      // dans une leçon, la première erreur montre toujours l'indice : le second essai le suit
      t.essais.push({ juste: !!e.juste, etiquette, indice: t.essais.length > 0, ms: e.ms });
      continue;
    }
    const g = cat.lecons[e.lecon]?.gabarits[e.gabarit];
    const cle = `E|${e.lecon}|${e.gabarit}|${e.graine}|${e.question}|${e.seance}`;
    let t = ouvertes.get(cle);
    if (!t || e.essai === 1) {
      const enonce = `${e.gabarit}:${e.graine}`;
      const k = Math.max(2, g?.optionsQcm ?? 3);
      const saisie = e.qtype === "nombre" || e.qtype === "texte";
      const premier = enoncesVus.get(enonce);
      t = {
        source: "exo", lecon: e.lecon, ref: e.gabarit, enonce, question: e.question, ms: e.ms, seance: e.seance,
        capacites: g?.capacites ?? [], hasard: saisie ? PARAMS.hasardSaisie : 1 / k, essais: [],
        dejaVu: premier !== undefined && premier !== e.seance,
        correctionAvant: corrections.has(`${e.gabarit}:${e.graine}:${e.seance}`),
        issue: "inachevee", pieges: piegesExo(cat, e.lecon, e.gabarit), niveau: g?.niveau ?? 2,
      };
      if (premier === undefined) enoncesVus.set(enonce, e.seance);
      ouvertes.set(cle, t);
      sortie.push(t);
    }
    t.essais.push({ juste: e.juste, etiquette: e.juste ? null : etiquetteExo(cat, e.lecon, e.gabarit, e.erreur), indice: e.indice, ms: e.ms });
  }
  for (const t of sortie) t.issue = issueDe(t);
  return sortie;
}

function issueDe(t: Tentative): Issue {
  const p = t.essais[0];
  if (!p) return "inachevee";
  if (p.juste && !p.indice && !t.dejaVu && !t.correctionAvant && t.source === "exo") return "solide";
  if (t.essais.some((x) => x.juste) && !t.correctionAvant) return t.source === "lecon" && p.juste ? "solide" : "aidee";
  if (t.essais.length >= 2 || t.correctionAvant) return "echec";
  return "inachevee";
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Le suivi continu par capacité : BKT + oubli + incertitude
// ─────────────────────────────────────────────────────────────────────────────

/** Une mise à jour BKT : observation du premier essai, puis occasion d'apprendre. Exportée pour les tests. */
export function majBKT(p: number, juste: boolean, hasard: number, etourderie: number = PARAMS.pEtourderie, apprendre: number = PARAMS.pApprendre): number {
  const vrai = juste ? p * (1 - etourderie) : p * etourderie;
  const faux = juste ? (1 - p) * hasard : (1 - p) * (1 - hasard);
  const post = vrai + faux > 0 ? vrai / (vrai + faux) : p;
  return post + (1 - post) * apprendre;
}

/** Rappel attendu après `jours` pour une demi-vie `h` (jours). */
export const rappel = (jours: number, h: number) => Math.pow(2, -Math.max(0, jours) / h);

/** L'oubli ramène l'estimation vers le point de départ, jamais en dessous. */
export const oublier = (p: number, jours: number, h: number) => (p <= PARAMS.pInitiale ? p : PARAMS.pInitiale + (p - PARAMS.pInitiale) * rappel(jours, h));

export type EtatCapacite = "jamais_vue" | "en_cours" | "comprise" | "a_revoir";
export type Confiance = "insuffisante" | "moyenne" | "bonne";

export type Preuve = { lecon: string; ref: string; enonce: string; date: string; issue: Issue; source: "lecon" | "exo" };

export type SuiviCapacite = {
  capacite: string;
  etat: EtatCapacite;
  /** estimation de maîtrise À `maintenant` (oubli compris), entre 0 et 1 ; jamais affichée en % */
  estimation: number;
  /** intervalle approché autour de l'estimation */
  intervalle: [number, number];
  /** poids cumulé des observations (une réponse d'exercice sans aide = 1) */
  observations: number;
  confiance: Confiance;
  /** demi-vie de mémoire estimée, en jours */
  demiVie: number;
  /** réussites seules d'exercice depuis le dernier échec, sur énoncés distincts */
  reussitesSeules: number;
  retenue: boolean;
  prochaineRevision: string | null;
  preuves: Preuve[];
  /** l'estimation après chaque réponse : la courbe de cette capacité */
  courbe: { date: string; estimation: number }[];
  phrase: string;
};

export type Options = {
  maintenant: Date;
  /** date de l'examen (ISO), qui comprime les intervalles */
  examen?: string;
  /** filière de l'élève : ne garder que ses capacités */
  filiere?: string;
};

const iso = (ms: number) => new Date(ms).toISOString();

function capaciteGardee(c: string, filiere?: string): boolean {
  const pref = filiere ? PREFIXES_FILIERE[filiere] : undefined;
  return !pref || pref.some((p) => c.startsWith(p + " "));
}

/** Toutes les capacités que le catalogue sait observer (pour dire aussi « jamais vue »). */
export function capacitesConnues(cat: Catalogue, filiere?: string): Map<string, Set<string>> {
  const m = new Map<string, Set<string>>();
  const ajoute = (c: string, l: string) => {
    if (!capaciteGardee(c, filiere)) return;
    if (!m.has(c)) m.set(c, new Set());
    m.get(c)!.add(l);
  };
  for (const l of Object.values(cat.lecons)) {
    for (const q of Object.values(l.questions)) q.capacites.forEach((c) => ajoute(c, l.lecon));
    for (const g of Object.values(l.gabarits)) g.capacites.forEach((c) => ajoute(c, l.lecon));
  }
  return m;
}

/** L'intervalle avant le prochain retour, comprimé par l'examen. `null` après l'examen. */
export function intervalleRetour(demiVie: number, depuisMs: number, maintenant: Date, examen?: string): number | null {
  let jours = Math.max(1, Math.round(demiVie * Math.log2(1 / PARAMS.rappelVise)));
  if (!examen) return jours;
  const d = jourDe(Date.parse(examen + (examen.length === 10 ? "T00:00:00Z" : "")));
  const auj = jourDe(maintenant.getTime());
  const J = d - auj;
  if (J <= 0) return null;
  jours = Math.min(jours, Math.max(1, Math.floor(PARAMS.compression * J)));
  const depuis = jourDe(depuisMs);
  if (depuis + jours > d - 2) jours = Math.max(0, d - 2 - depuis);
  return jours;
}

const dateDuJour = (jour: number) => new Date(jour * JOUR_MS - PARAMS.decalageMinutes * 60_000).toISOString();

export function suivreCapacites(ts: Tentative[], cat: Catalogue, opts: Options, actives: Set<string> = new Set()): SuiviCapacite[] {
  const connues = capacitesConnues(cat, opts.filiere);
  for (const t of ts) for (const c of t.capacites) if (capaciteGardee(c, opts.filiere) && !connues.has(c)) connues.set(c, new Set([t.lecon]));
  const gabaritsPar = new Map<string, Set<string>>();
  for (const l of Object.values(cat.lecons))
    for (const [id, g] of Object.entries(l.gabarits)) for (const c of g.capacites) (gabaritsPar.get(c) ?? gabaritsPar.set(c, new Set()).get(c)!).add(id);
  const conceptionsPar = new Map<string, string[]>();
  for (const k of Object.values(cat.conceptions)) for (const c of k.capacites) (conceptionsPar.get(c) ?? conceptionsPar.set(c, []).get(c)!).push(k.id);

  const maintenantMs = opts.maintenant.getTime();
  const sortie: SuiviCapacite[] = [];
  for (const c of [...connues.keys()].sort()) {
    const mine = ts.filter((t) => t.capacites.includes(c) && t.essais.length);
    let p: number = PARAMS.pInitiale;
    let h: number = PARAMS.demiVieInitiale;
    let dernier = -1;
    let dernierSolide = -1;
    let n = 0;
    let solides: Tentative[] = [];
    let retenue = false;
    let critereAtteint = false;
    const courbe: { date: string; estimation: number }[] = [];
    for (const t of mine) {
      const jours = dernier < 0 ? 0 : (t.ms - dernier) / JOUR_MS;
      if (dernier >= 0) p = oublier(p, jours, h);
      const premier = t.essais[0];
      const aide = premier.indice || t.dejaVu || t.correctionAvant;
      const hasard = aide ? Math.max(t.hasard, PARAMS.hasardAide) : t.hasard;
      p = majBKT(p, premier.juste, hasard);
      n += t.source === "lecon" || aide ? 0.5 : 1;
      if (t.source === "exo") {
        if (t.issue === "solide") {
          const ecart = dernierSolide < 0 ? 0 : (t.ms - dernierSolide) / JOUR_MS;
          if (dernierSolide >= 0 && ecart >= 7 && critereAtteint) retenue = true;
          // avant la moitié de l'intervalle prévu, c'est de l'entraînement libre : la mémoire ne
          // s'allonge pas (spécification §3.1) ; après, le gain croît avec l'oubli surmonté
          const prevu = h * Math.log2(1 / PARAMS.rappelVise);
          if (dernierSolide >= 0 && ecart >= prevu / 2) h = Math.min(PARAMS.demiVieMax, h * (1 + PARAMS.gainRappel * (1 - rappel(ecart, h))));
          dernierSolide = t.ms;
          if (!solides.some((s) => s.enonce === t.enonce)) solides.push(t);
        } else if (!premier.juste || t.issue === "echec") {
          h = Math.max(PARAMS.demiVieInitiale, h / PARAMS.diviseurEchec);
          solides = [];
          critereAtteint = false;
          retenue = false;
        }
      }
      dernier = t.ms;
      const nGab = gabaritsPar.get(c)?.size ?? 0;
      const gabDistincts = new Set(solides.map((s) => s.ref)).size;
      if (solides.length >= 2 && (nGab < 2 || gabDistincts >= 2) && p >= PARAMS.seuilComprise) critereAtteint = true;
      courbe.push({ date: iso(t.ms), estimation: arrondi(p) });
    }
    const estimation = dernier < 0 ? p : oublier(p, (maintenantMs - dernier) / JOUR_MS, h);
    const conf: Confiance = n < 2 ? "insuffisante" : n < 5 ? "moyenne" : "bonne";
    const e = 1.96 * Math.sqrt((estimation * (1 - estimation)) / (n + 2));
    const bloquee = (conceptionsPar.get(c) ?? []).some((k) => actives.has(k));
    const depuis = dernierSolide >= 0 ? dernierSolide : dernier;
    const inter = depuis >= 0 ? intervalleRetour(h, depuis, opts.maintenant, opts.examen) : null;
    const due = inter === null || depuis < 0 ? null : jourDe(depuis) + inter;
    let etat: EtatCapacite;
    if (!mine.length) etat = "jamais_vue";
    else if (critereAtteint && !bloquee && p >= PARAMS.seuilComprise) etat = due !== null && jourDe(maintenantMs) >= due ? "a_revoir" : "comprise";
    else etat = "en_cours";
    sortie.push({
      capacite: c, etat, estimation: arrondi(estimation),
      intervalle: [arrondi(Math.max(0, estimation - e)), arrondi(Math.min(1, estimation + e))],
      observations: n, confiance: conf, demiVie: arrondi(h), reussitesSeules: solides.length, retenue: etat !== "jamais_vue" && retenue,
      prochaineRevision: due === null ? null : dateDuJour(due),
      preuves: mine.map((t) => ({ lecon: t.lecon, ref: t.ref, enonce: t.enonce, date: iso(t.ms), issue: t.issue, source: t.source })),
      courbe, phrase: phraseCapacite(etat, conf, retenue, bloquee),
    });
  }
  return sortie;
}

const arrondi = (x: number) => Math.round(x * 1000) / 1000;

function phraseCapacite(etat: EtatCapacite, conf: Confiance, retenue: boolean, bloquee: boolean): string {
  if (etat === "jamais_vue") return "Pas encore d’exercice fait sur ce point.";
  if (etat === "comprise") return retenue ? "Réussi seul, et encore réussi après une semaine sans y toucher." : "Tu as réussi seul, du premier coup, deux exercices différents sur ce point.";
  if (etat === "a_revoir") return "Compris il y a quelque temps : c’est le moment d’un exercice neuf pour le garder.";
  if (bloquee) return "Une erreur revient sur ce point : on la travaille d’abord.";
  if (conf === "insuffisante") return "Pas encore assez d’exercices pour dire où tu en es sur ce point.";
  return "En cours : encore un exercice réussi seul, sur un énoncé neuf.";
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Les conceptions erronées
// ─────────────────────────────────────────────────────────────────────────────

export type EtatConception = "non_evaluee" | "probable" | "active" | "ecartee";

export type Observation = {
  lecon: string;
  ref: string;
  enonce: string;
  date: string;
  /** forte : erreur au premier essai, non corrigée seule ; inattention : corrigée seule au second
   *  essai sans indice ; reussite : question qui piégeait la conception, réussie seule */
  nature: "forte" | "inattention" | "reussite";
  /** ce que prouve une réussite : 1 − probabilité de réussir au hasard */
  preuve: number;
  source: "lecon" | "exo";
  niveau: number;
};

export type DiagnosticConception = {
  conception: string;
  libelle: string;
  etat: EtatConception;
  /** répétée (3 fois ou plus), revenue après plusieurs jours, ou rouverte après avoir été écartée */
  tenace: boolean;
  /** lieux distincts du catalogue qui piègent cette conception ; sous le plancher, on ne conclut pas */
  lieux: number;
  /** occasions (premiers essais sur une question qui la piégeait) et exhibitions fortes */
  occasions: number;
  observations: Observation[];
  /** rempli par le diagnostic transversal : le prérequis qui explique cette erreur */
  expliqueePar?: string;
  phrase: string;
};

/** Nombre de lieux distincts (étapes de leçon, gabarits) où le catalogue piège la conception. */
export function lieuxDe(cat: Catalogue, id: string): number {
  const s = new Set<string>();
  for (const l of Object.values(cat.lecons)) {
    for (const [cle, q] of Object.entries(l.questions)) if (q.juste !== null && q.options.some((o) => o.e === id)) s.add(`${l.lecon}:${cle}`);
    for (const [g, gb] of Object.entries(l.gabarits)) if (Object.values(gb.erreurs).includes(id)) s.add(`${l.lecon}/${g}`);
  }
  for (const [l, g] of cat.conceptions[id]?.exercices ?? []) s.add(`${l}/${g}`);
  return s.size;
}

export function diagnostiquer(ts: Tentative[], cat: Catalogue): DiagnosticConception[] {
  const ids = new Set<string>(Object.keys(cat.conceptions));
  for (const t of ts) {
    t.pieges.forEach((p) => ids.add(p));
    t.essais.forEach((e) => estConception(e.etiquette) && ids.add(e.etiquette));
  }
  const sortie: DiagnosticConception[] = [];
  for (const id of [...ids].sort()) {
    const obs: Observation[] = [];
    let occasions = 0;
    for (const t of ts) {
      const p = t.essais[0];
      if (!p) continue;
      const piege = t.pieges.includes(id) || p.etiquette === id;
      if (!piege) continue;
      occasions++;
      const base = { lecon: t.lecon, ref: t.ref, enonce: t.enonce, date: iso(t.ms), source: t.source, niveau: t.niveau, preuve: arrondi(1 - t.hasard) };
      if (!p.juste && p.etiquette === id) {
        const s = t.essais[1];
        const corrigeeSeule = t.source === "exo" && !!s && s.juste && !s.indice;
        obs.push({ ...base, nature: corrigeeSeule ? "inattention" : "forte" });
      } else if (t.issue === "solide" && t.source === "exo") obs.push({ ...base, nature: "reussite" });
    }
    const lieux = lieuxDe(cat, id);
    // la marche dans le temps : exhibitions depuis le dernier écartement, réussites depuis la dernière exhibition
    let fortes: Observation[] = [];
    let reussites: Observation[] = [];
    let ecartee = false;
    let rouverte = false;
    let toutesFortes = 0;
    let premiereForte = -1;
    let derniereForte = -1;
    let ecartTenace = false;
    for (const o of obs) {
      const ms = Date.parse(o.date);
      if (o.nature === "forte") {
        toutesFortes++;
        if (premiereForte < 0) premiereForte = ms;
        if (derniereForte >= 0 && (ms - derniereForte) / JOUR_MS >= PARAMS.joursTenace) ecartTenace = true;
        derniereForte = ms;
        if (ecartee) rouverte = true;
        ecartee = false;
        fortes.push(o);
        reussites = [];
      } else if (o.nature === "reussite") {
        if (!reussites.some((r) => r.enonce === o.enonce)) reussites.push(o);
        // deux saisies suffisent ; il faut trois QCM à 3 options (deviner deux fois arrive 1 fois sur 9)
        if (reussites.reduce((x, r) => x + r.preuve, 0) >= PARAMS.preuveEcartee) {
          ecartee = true;
          fortes = [];
        }
      }
    }
    const sources = new Set(fortes.map((o) => o.enonce)).size;
    const taux = occasions ? toutesFortes / occasions : 0;
    let etat: EtatConception;
    if (ecartee) etat = "ecartee";
    else if (lieux >= PARAMS.plancherLieux && fortes.length && (rouverte || (sources >= PARAMS.exhibitionsActive && taux >= PARAMS.tauxActive))) etat = "active";
    else if (fortes.length) etat = "probable";
    else etat = "non_evaluee";
    const tenace = etat === "active" && (toutesFortes >= 3 || ecartTenace || rouverte);
    const libelle = cat.conceptions[id]?.libelle ?? id;
    sortie.push({ conception: id, libelle, etat, tenace, lieux, occasions, observations: obs, phrase: phraseConception(etat, libelle, lieux) });
  }
  return sortie;
}

function phraseConception(etat: EtatConception, libelle: string, lieux: number): string {
  if (etat === "active") return `La même erreur est revenue plusieurs fois : ${libelle}. Un exercice fait pour la déjouer.`;
  if (etat === "ecartee") return `Plus vue depuis : ${libelle}.`;
  if (etat === "probable")
    return lieux < PARAMS.plancherLieux ? `Vue une fois ou deux : ${libelle}. Il faut encore des exercices sur ce point pour en dire plus.` : `Vue une fois : ${libelle}. Une seule erreur ne suffit pas pour conclure.`;
  return "Pas encore évaluée.";
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Le diagnostic transversal : remonter au prérequis commun
// ─────────────────────────────────────────────────────────────────────────────

export type Hypothese = {
  /** `conception:<id>` ou `capacite:<id>` */
  amont: string;
  lecon: string | null;
  /** confirmée : le prérequis montre lui-même l'erreur ; à vérifier : seule l'aval le suggère ;
   *  écartée : le prérequis est réussi seul, les erreurs d'aval sont locales */
  statut: "confirmee" | "a_verifier" | "ecartee";
  /** les erreurs d'aval expliquées (conception, énoncé, date) */
  explique: { conception: string; lecon: string; enonce: string; date: string }[];
  aretes: Arete[];
  phrase: string;
};

const cleNoeud = (n: Noeud) => ("conception" in n ? `conception:${n.conception}` : `capacite:${n.capacite}`);

/**
 * Règle : pour chaque prérequis U du graphe, on rassemble les exhibitions fortes des conceptions
 * d'aval qui en dépendent, observées dans une AUTRE leçon que U. U devient une hypothèse s'il
 * explique au moins 2 exhibitions sur 2 énoncés distincts. Les hypothèses sont retenues par
 * couverture gloutonne : la plus explicative d'abord (à égalité : celle qui a une preuve directe,
 * puis l'ordre du graphe) ; une hypothèse suivante n'est retenue que si elle explique encore
 * 2 exhibitions non couvertes. Chaque erreur d'aval expliquée n'est plus remédiée à part.
 */
export function remonter(diags: DiagnosticConception[], suivis: SuiviCapacite[], cat: Catalogue): Hypothese[] {
  const parId = new Map(diags.map((d) => [d.conception, d]));
  const parCap = new Map(suivis.map((s) => [s.capacite, s]));
  const groupes = new Map<string, Arete[]>();
  for (const a of cat.aretes) (groupes.get(cleNoeud(a.amont)) ?? groupes.set(cleNoeud(a.amont), []).get(cleNoeud(a.amont))!).push(a);
  const candidats: (Hypothese & { ordre: number; direct: boolean })[] = [];
  let ordre = 0;
  for (const [amont, aretes] of groupes) {
    ordre++;
    const n = aretes[0].amont;
    const leconAmont = "conception" in n ? (cat.conceptions[n.conception]?.lecon ?? null) : null;
    const explique: Hypothese["explique"] = [];
    for (const a of aretes) {
      const d = parId.get(a.aval);
      if (!d) continue;
      for (const o of d.observations) if (o.nature === "forte" && o.lecon !== leconAmont && !explique.some((x) => x.enonce === o.enonce && x.conception === a.aval)) explique.push({ conception: a.aval, lecon: o.lecon, enonce: o.enonce, date: o.date });
    }
    if (explique.length < 2 || new Set(explique.map((x) => x.enonce)).size < 2) continue;
    let statut: Hypothese["statut"] = "a_verifier";
    let direct = false;
    if ("conception" in n) {
      const d = parId.get(n.conception);
      if (d?.etat === "ecartee") statut = "ecartee";
      else if (d && d.observations.some((o) => o.nature === "forte" && o.lecon === leconAmont)) {
        direct = true;
        statut = d.etat === "active" || d.observations.filter((o) => o.nature === "forte").length >= 1 ? "confirmee" : "a_verifier";
      }
    } else {
      const s = parCap.get(n.capacite);
      if (s && (s.etat === "comprise" || s.etat === "a_revoir")) statut = "ecartee";
      else if (s && s.confiance !== "insuffisante" && s.estimation < 0.5) {
        statut = "confirmee";
        direct = true;
      }
    }
    candidats.push({ amont, lecon: leconAmont, statut, explique, aretes, phrase: "", ordre, direct });
  }
  candidats.sort((a, b) => b.explique.length - a.explique.length || Number(b.direct) - Number(a.direct) || a.ordre - b.ordre);
  const couverts = new Set<string>();
  const retenues: Hypothese[] = [];
  for (const h of candidats) {
    const neufs = h.explique.filter((x) => !couverts.has(`${x.conception}|${x.enonce}`));
    if (neufs.length < 2 || new Set(neufs.map((x) => x.enonce)).size < 2) continue;
    if (h.statut !== "ecartee") neufs.forEach((x) => couverts.add(`${x.conception}|${x.enonce}`));
    const { ordre: _o, direct: _d, ...propre } = h;
    void _o;
    void _d;
    retenues.push({ ...propre, phrase: phraseHypothese(h, cat) });
  }
  // marquer les conceptions d'aval expliquées par une hypothèse non écartée
  for (const h of retenues) {
    if (h.statut === "ecartee") continue;
    for (const x of h.explique) {
      const d = parId.get(x.conception);
      if (d && !d.expliqueePar) d.expliqueePar = h.amont;
    }
    if (h.amont.startsWith("conception:")) {
      const d = parId.get(h.amont.slice(11));
      if (d && d.etat === "non_evaluee") {
        d.etat = "probable";
        d.phrase = `Des erreurs dans d’autres leçons viennent peut-être de ce point : ${d.libelle}. Un court exercice dira si c’est le cas.`;
      }
    }
  }
  return retenues;
}

function libelleNoeud(cle: string, cat: Catalogue): string {
  if (cle.startsWith("conception:")) return cat.conceptions[cle.slice(11)]?.libelle ?? cle.slice(11);
  return `la capacité ${cle.slice(9)}`;
}

function phraseHypothese(h: Hypothese, cat: Catalogue): string {
  const lecons = [...new Set(h.explique.map((x) => x.lecon))].join(", ");
  const quoi = libelleNoeud(h.amont, cat);
  if (h.statut === "ecartee") return `Les erreurs vues en ${lecons} ne viennent pas de ce point, réussi seul : ${quoi}.`;
  if (h.statut === "confirmee") return `Les erreurs vues en ${lecons} ont une même source, déjà vue dans sa leçon : ${quoi}. On reprend ce point d’abord.`;
  return `Plusieurs erreurs en ${lecons} viennent peut-être d’un même point : ${quoi}. Un court exercice pour le vérifier.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. La prochaine chose à faire (au plus trois)
// ─────────────────────────────────────────────────────────────────────────────

export type Cible = { type: "etape"; lecon: string; cle: string } | { type: "gabarit"; lecon: string; gabarit: string };

export type Action = {
  motif: "prerequis" | "conception" | "revision";
  cible: Cible;
  raison: string;
  /** la règle qui a produit l'action (pour `data-state-source`) */
  regle: string;
};

function gabaritsQuiPiegent(cat: Catalogue, id: string): Cible[] {
  const s: Cible[] = [];
  for (const l of Object.values(cat.lecons))
    for (const [g, gb] of Object.entries(l.gabarits)) if (Object.values(gb.erreurs).includes(id)) s.push({ type: "gabarit", lecon: l.lecon, gabarit: g });
  for (const [l, g] of cat.conceptions[id]?.exercices ?? []) if (!s.some((x) => x.type === "gabarit" && x.lecon === l && x.gabarit === g)) s.push({ type: "gabarit", lecon: l, gabarit: g });
  return s;
}

function etapesDe(cat: Catalogue, id: string): Cible[] {
  const k = cat.conceptions[id];
  return k?.etapes && cat.lecons[k.lecon] ? k.etapes.map((cle) => ({ type: "etape" as const, lecon: k.lecon, cle })) : [];
}

function gabaritsDeCapacite(cat: Catalogue, c: string): Cible[] {
  const s: Cible[] = [];
  for (const l of Object.values(cat.lecons))
    for (const [g, gb] of Object.entries(l.gabarits)) if (gb.capacites.includes(c)) s.push({ type: "gabarit", lecon: l.lecon, gabarit: g });
  return s;
}

const memeCible = (a: Cible, b: Cible) => a.type === b.type && a.lecon === b.lecon && (a.type === "etape" ? a.cle === (b as typeof a).cle : a.gabarit === (b as Extract<Cible, { type: "gabarit" }>).gabarit);

export function prochainesActions(diags: DiagnosticConception[], suivis: SuiviCapacite[], hyps: Hypothese[], cat: Catalogue, maintenant: Date): Action[] {
  const actions: Action[] = [];
  const ajoute = (a: Action | null) => {
    if (a && actions.length < 3 && !actions.some((x) => memeCible(x.cible, a.cible))) actions.push(a);
  };
  // 1. le prérequis (une seule action de ce type)
  const h = hyps.find((x) => x.statut !== "ecartee");
  if (h) {
    let cible: Cible | undefined;
    if (h.amont.startsWith("conception:")) {
      const id = h.amont.slice(11);
      cible = h.statut === "confirmee" ? (etapesDe(cat, id)[0] ?? gabaritsQuiPiegent(cat, id)[0]) : (gabaritsQuiPiegent(cat, id).find((c) => c.lecon === cat.conceptions[id]?.lecon) ?? gabaritsQuiPiegent(cat, id)[0] ?? etapesDe(cat, id)[0]);
    } else cible = gabaritsDeCapacite(cat, h.amont.slice(9))[0];
    if (cible) ajoute({ motif: "prerequis", cible, raison: h.phrase, regle: `transversal:${h.statut}` });
  }
  // 2. une conception active, tenace d'abord, non déjà expliquée par le prérequis
  const actives = diags.filter((d) => d.etat === "active" && !d.expliqueePar).sort((a, b) => Number(b.tenace) - Number(a.tenace) || b.observations.length - a.observations.length);
  const d = actives[0];
  if (d) {
    const vus = new Set(d.observations.filter((o) => o.nature === "forte").map((o) => o.ref));
    const niv = Math.min(...d.observations.filter((o) => o.nature === "forte").map((o) => o.niveau));
    const gabs = gabaritsQuiPiegent(cat, d.conception);
    const cible = gabs.find((g) => g.type === "gabarit" && !vus.has(g.gabarit) && (cat.lecons[g.lecon]?.gabarits[g.gabarit]?.niveau ?? 1) <= niv) ?? gabs.find((g) => g.type === "gabarit" && !vus.has(g.gabarit)) ?? etapesDe(cat, d.conception)[0] ?? gabs[0];
    if (cible)
      ajoute({ motif: "conception", cible, raison: d.tenace ? `Cette erreur est revenue après quelques jours : ${d.libelle}. Un exercice neuf, fait pour la déjouer.` : `Deux fois la même erreur : ${d.libelle}. Voici un exercice fait pour la déjouer.`, regle: d.tenace ? "conception:tenace" : "conception:active" });
  }
  // 3. les révisions dues, la plus en retard d'abord
  const auj = jourDe(maintenant.getTime());
  const dues = suivis.filter((s) => s.etat === "a_revoir" && s.prochaineRevision).sort((a, b) => Date.parse(a.prochaineRevision!) - Date.parse(b.prochaineRevision!));
  for (const s of dues) {
    const deja = new Set(s.preuves.slice(-2).map((p) => p.ref));
    const gabs = gabaritsDeCapacite(cat, s.capacite);
    const cible = gabs.find((g) => g.type === "gabarit" && !deja.has(g.gabarit)) ?? gabs[0];
    const retard = auj - jourDe(Date.parse(s.prochaineRevision!));
    if (cible) ajoute({ motif: "revision", cible, raison: retard > 0 ? "Ce point attend son retour depuis quelques jours : un exercice neuf pour le garder." : "C’est le jour de revoir ce point : un exercice neuf pour le garder.", regle: "revision:due" });
  }
  return actions;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Tout ensemble, et le bilan
// ─────────────────────────────────────────────────────────────────────────────

export type Analyse = {
  lecture: { ignores: number; horlogeDouteuse: boolean; evenements: number };
  capacites: SuiviCapacite[];
  conceptions: DiagnosticConception[];
  hypotheses: Hypothese[];
  actions: Action[];
};

export function analyser(journalBrut: unknown, cat: Catalogue, opts: Options): Analyse {
  const lecture = lireJournal(journalBrut, opts.maintenant);
  const ts = tentatives(lecture, cat);
  const conceptions = diagnostiquer(ts, cat);
  const actives = new Set(conceptions.filter((d) => d.etat === "active").map((d) => d.conception));
  const capacites = suivreCapacites(ts, cat, opts, actives);
  const hypotheses = remonter(conceptions, capacites, cat);
  const actions = prochainesActions(conceptions, capacites, hypotheses, cat, opts.maintenant);
  return { lecture: { ignores: lecture.ignores, horlogeDouteuse: lecture.horlogeDouteuse, evenements: lecture.evenements.length }, capacites, conceptions, hypotheses, actions };
}

export type Categorie = "compris" | "fragile" | "reste_a_voir";

export type LigneBilan = { capacite: string; categorie: Categorie; etat: EtatCapacite; phrase: string; prochaineRevision: string | null; courbe: SuiviCapacite["courbe"] };

export type Bilan = {
  /** des comptes de choses vraies, avec leur dénominateur réel ; jamais un pourcentage */
  parMatiere: Record<string, { compris: number; fragile: number; reste_a_voir: number; total: number; lecons: string[] }>;
  parLecon: Record<string, { matiere: Matiere | null; lignes: LigneBilan[]; compris: number; fragile: number; reste_a_voir: number }>;
  gardeSurAppareil: true;
};

export function categorie(s: SuiviCapacite): Categorie {
  if (s.etat === "comprise") return "compris";
  if (s.etat === "a_revoir") return "fragile";
  if (s.etat === "en_cours" && s.confiance !== "insuffisante") return "fragile";
  return "reste_a_voir";
}

const matiereDeCapacite = (c: string): Matiere | null => (c.startsWith("maths-") ? "maths" : c.startsWith("pc-") ? "physique" : c.startsWith("svt-") ? "svt" : null);

/** Compris / fragile / reste à voir, par capacité officielle, regroupés par leçon et par matière. */
export function bilan(a: Analyse, cat: Catalogue, filiere?: string): Bilan {
  const lecons = capacitesConnues(cat, filiere);
  for (const s of a.capacites) if (!lecons.has(s.capacite)) lecons.set(s.capacite, new Set(s.preuves.map((p) => p.lecon)));
  const parLecon: Bilan["parLecon"] = {};
  const parMatiere: Bilan["parMatiere"] = {};
  for (const s of a.capacites) {
    const cat0 = categorie(s);
    const ligne: LigneBilan = { capacite: s.capacite, categorie: cat0, etat: s.etat, phrase: s.phrase, prochaineRevision: s.prochaineRevision, courbe: s.courbe };
    for (const l of lecons.get(s.capacite) ?? []) {
      const b = (parLecon[l] ??= { matiere: cat.matieres[l] ?? null, lignes: [], compris: 0, fragile: 0, reste_a_voir: 0 });
      b.lignes.push(ligne);
      b[cat0]++;
    }
    const m = matiereDeCapacite(s.capacite) ?? "autre";
    const bm = (parMatiere[m] ??= { compris: 0, fragile: 0, reste_a_voir: 0, total: 0, lecons: [] });
    bm[cat0]++;
    bm.total++;
    for (const l of lecons.get(s.capacite) ?? []) if (!bm.lecons.includes(l)) bm.lecons.push(l);
  }
  return { parMatiere, parLecon, gardeSurAppareil: true };
}
