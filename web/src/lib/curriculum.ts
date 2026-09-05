/**
 * curriculum.ts — the STRUCTURAL SKELETON of the whole product.
 *
 * This is the site's map: filières (streams) → matières (subjects) → unités →
 * chapitres. It is DATA ONLY (no lesson content) — the scaffold the owner
 * navigates and audits before content is authored. A chapter becomes a real
 * lesson when a `content/<subject>/<slug>/` directory exists; until then it
 * renders as an honest "à venir" state (the honest-state rule: no fabricated
 * availability, ever).
 *
 * GROUNDING: the four science streams + coefficients are from
 * `docs/cadre/cadre.yaml` (streams block). The Physique-Chimie chapter list is
 * transcribed verbatim from `docs/cadre/curriculum/pc-physique-chimie.yaml`
 * (the official 2025 PC cadre we hold). Maths / SVT / Philo chapter lists are
 * the standard Moroccan 2ème-Bac programs pending their own cadre extraction
 * (ADR 0018) — marked as such; they are structure to audit, not a validated
 * boundary. Sciences de l'ingénieur (SM-B) is a stub.
 *
 * Availability is NOT stored here — it is computed against the built content
 * tree (`listNotions()` on the server) so this file never drifts from truth.
 * A chapter's id is `${subjectId}/${slug}`; a chapter is available iff that id
 * resolves to a built notion. The three built notions today:
 * pc/rc-charge, pc/rlc-serie, maths/probabilites-conditionnelles.
 */

export type SubjectId = "maths" | "pc" | "svt" | "philo" | "si";
export type FiliereId = "sm-a" | "sm-b" | "pc" | "svt";

export interface Chapter {
  /** URL/dir slug; the built chapters' slugs MATCH their content directory. */
  slug: string;
  title: string;
  /**
   * Filières this chapter belongs to. ABSENT means common to all filières
   * (the default — most chapters are). Only set on chapters that are a real
   * stream-specific narrowing, e.g. the SM-only "Approfondissement" unit.
   *
   * This is a NARROWING signal only (ADR 0025 §2.11, the golden rule): the
   * filière preference narrows the view it never gates — a direct URL to a
   * chapter outside the device's chosen filière still renders normally
   * (§3 below, the lesson page itself stays ungated), and no filière chosen
   * means show everything.
   *
   * GROUNDING NOTE: per the new cadre extraction
   * (docs/cadre/curriculum/maths-sexp.yaml, PROPOSITION status — not yet
   * owner-validated), SExp excludes "Arithmétique" and "Structures
   * algébriques" from the maths programme structure it derives entirely,
   * rather than scoping them per-filière the way this field does. Adjust
   * this field (and which chapters carry it) once the owner validates the
   * SExp curriculum against the official cadre.
   */
  filieres?: FiliereId[];
}

export interface Unit {
  title: string;
  chapters: Chapter[];
}

export interface Subject {
  id: SubjectId;
  /** Canonical label lives in subjects.ts; duplicated here for the stub subjects. */
  label: string;
  /** One calm sentence — what the subject is, student-facing. */
  blurb: string;
  /** Provenance of the chapter list, shown nowhere but honest in the source. */
  source: "cadre" | "programme-standard" | "stub";
  units: Unit[];
}

export interface FiliereSubject {
  id: SubjectId;
  coefficient: number;
}

export interface Filiere {
  id: FiliereId;
  /** Full name, e.g. "Sciences Mathématiques A". */
  name: string;
  /** Short badge form, e.g. "SM-A". */
  short: string;
  /** One calm sentence describing who the stream is for. */
  blurb: string;
  /** Subjects in coefficient order (heaviest first). */
  subjects: FiliereSubject[];
}

// ── Subjects & their chapter skeletons ────────────────────────────────────────

const MATHS: Subject = {
  id: "maths",
  label: "Mathématiques",
  blurb: "Analyse, nombres complexes, probabilités et géométrie dans l’espace.",
  source: "programme-standard",
  units: [
    {
      title: "Analyse",
      chapters: [
        { slug: "limites-continuite", title: "Limites et continuité" },
        { slug: "derivabilite-etude-fonctions", title: "Dérivabilité et étude des fonctions" },
        { slug: "suites-numeriques", title: "Suites numériques" },
        { slug: "fonction-logarithme", title: "Fonction logarithme" },
        { slug: "fonction-exponentielle", title: "Fonction exponentielle" },
        { slug: "calcul-integral", title: "Calcul intégral" },
        { slug: "equations-differentielles", title: "Équations différentielles" },
      ],
    },
    {
      title: "Nombres complexes",
      chapters: [
        { slug: "nombres-complexes-1", title: "Nombres complexes — forme algébrique et géométrie" },
        { slug: "nombres-complexes-2", title: "Nombres complexes — forme trigonométrique et applications" },
      ],
    },
    {
      title: "Probabilités",
      chapters: [
        { slug: "denombrement", title: "Dénombrement" },
        { slug: "probabilites-conditionnelles", title: "Probabilités conditionnelles" },
      ],
    },
    {
      title: "Géométrie",
      chapters: [
        { slug: "geometrie-espace", title: "Géométrie dans l’espace" },
      ],
    },
    {
      title: "Approfondissement (Sciences Mathématiques)",
      chapters: [
        { slug: "arithmetique", title: "Arithmétique", filieres: ["sm-a", "sm-b"] },
        { slug: "structures-algebriques", title: "Structures algébriques", filieres: ["sm-a", "sm-b"] },
      ],
    },
  ],
};

const PC: Subject = {
  id: "pc",
  label: "Physique-Chimie",
  blurb: "Ondes, transformations nucléaires, électricité, mécanique et chimie des solutions.",
  source: "cadre",
  units: [
    {
      title: "Physique — Ondes",
      chapters: [
        { slug: "ondes-mecaniques-progressives", title: "Ondes mécaniques progressives" },
        { slug: "ondes-mecaniques-periodiques", title: "Ondes mécaniques progressives périodiques" },
        { slug: "propagation-onde-lumineuse", title: "Propagation d’une onde lumineuse" },
      ],
    },
    {
      title: "Physique — Transformations nucléaires",
      chapters: [
        { slug: "decroissance-radioactive", title: "Décroissance radioactive" },
        { slug: "noyaux-masse-energie", title: "Noyaux — masse et énergie" },
      ],
    },
    {
      title: "Physique — Électricité",
      chapters: [
        { slug: "rc-charge", title: "Dipôle RC" },
        { slug: "dipole-rl", title: "Dipôle RL" },
        { slug: "rlc-serie", title: "Oscillations libres dans un circuit RLC série" },
        { slug: "ondes-em-modulation", title: "Ondes électromagnétiques — modulation d’amplitude" },
      ],
    },
    {
      title: "Physique — Mécanique",
      chapters: [
        { slug: "lois-de-newton", title: "Lois de Newton" },
        { slug: "chute-mouvements-plans", title: "Chute libre et mouvements plans" },
        { slug: "rotation-axe-fixe", title: "Rotation autour d’un axe fixe" },
        { slug: "systemes-oscillants", title: "Systèmes oscillants" },
        { slug: "aspects-energetiques", title: "Aspects énergétiques" },
        { slug: "atome-mecanique-newton", title: "Atome et mécanique de Newton" },
      ],
    },
    {
      title: "Chimie — Cinétique",
      chapters: [
        { slug: "transformations-lentes-rapides", title: "Transformations lentes et rapides" },
        { slug: "suivi-temporel-vitesse", title: "Suivi temporel d’une transformation — vitesse" },
      ],
    },
    {
      title: "Chimie — Équilibres",
      chapters: [
        { slug: "transformations-deux-sens", title: "Transformations dans les deux sens" },
        { slug: "etat-equilibre", title: "État d’équilibre d’un système chimique" },
        { slug: "reactions-acido-basiques", title: "Réactions acido-basiques" },
      ],
    },
    {
      title: "Chimie — Sens d’évolution",
      chapters: [
        { slug: "evolution-spontanee", title: "Évolution spontanée d’un système" },
        { slug: "piles", title: "Piles et récupération de l’énergie" },
        { slug: "electrolyse", title: "Transformations forcées — électrolyse" },
      ],
    },
    {
      title: "Chimie — Contrôle de l’évolution",
      chapters: [
        { slug: "esterification-hydrolyse", title: "Estérification et hydrolyse" },
        { slug: "controle-catalyse", title: "Contrôle par un réactif ou par catalyse" },
      ],
    },
  ],
};

const SVT: Subject = {
  id: "svt",
  label: "Sciences de la Vie et de la Terre",
  blurb: "Flux d’énergie, génétique, immunologie et tectonique des plaques.",
  source: "programme-standard",
  units: [
    {
      title: "Consommation de la matière organique et flux d’énergie",
      chapters: [
        { slug: "liberation-energie-matiere-organique", title: "La libération de l’énergie emmagasinée dans la matière organique" },
        { slug: "role-enzymes", title: "Le rôle des enzymes dans la digestion" },
      ],
    },
    {
      title: "Génétique",
      chapters: [
        { slug: "transmission-caracteres", title: "Les lois statistiques de transmission des caractères" },
        { slug: "genetique-humaine", title: "La génétique humaine" },
        { slug: "genetique-populations", title: "La génétique des populations" },
      ],
    },
    {
      title: "Immunologie",
      chapters: [
        { slug: "soi-non-soi", title: "Le soi et le non-soi" },
        { slug: "moyens-de-defense", title: "Les moyens de défense de l’organisme" },
        { slug: "dysfonctionnements-immunitaires", title: "Dysfonctionnements et aides du système immunitaire" },
      ],
    },
    {
      title: "Géologie — Tectonique des plaques",
      chapters: [
        { slug: "theorie-tectonique-plaques", title: "La théorie de la tectonique des plaques" },
        { slug: "chaines-de-montagnes", title: "Les chaînes de montagnes et la tectonique" },
        { slug: "granitisation-deformation", title: "La granitisation et la déformation des roches" },
      ],
    },
  ],
};

const PHILO: Subject = {
  id: "philo",
  label: "Philosophie",
  blurb: "Les grands axes du programme : la condition humaine, la politique, la morale et la connaissance.",
  source: "programme-standard",
  units: [
    {
      title: "La condition humaine",
      chapters: [
        { slug: "la-personne", title: "La personne" },
        { slug: "autrui", title: "Autrui" },
        { slug: "l-histoire", title: "L’histoire" },
      ],
    },
    {
      title: "La politique",
      chapters: [
        { slug: "l-etat", title: "L’État" },
        { slug: "le-droit-la-justice", title: "Le droit et la justice" },
        { slug: "la-violence", title: "La violence" },
      ],
    },
    {
      title: "La morale",
      chapters: [
        { slug: "le-devoir", title: "Le devoir" },
        { slug: "la-liberte", title: "La liberté" },
        { slug: "le-bonheur", title: "Le bonheur" },
      ],
    },
    {
      title: "La connaissance",
      chapters: [
        { slug: "la-verite", title: "La vérité" },
        { slug: "theorie-experience", title: "La théorie et l’expérience" },
      ],
    },
    {
      title: "Méthode de l’épreuve",
      chapters: [
        { slug: "analyse-de-texte", title: "Méthode de l’analyse de texte philosophique" },
      ],
    },
  ],
};

const SI: Subject = {
  id: "si",
  label: "Sciences de l’ingénieur",
  blurb: "Programme spécifique à la filière Sciences Mathématiques B — chapitres à venir.",
  source: "stub",
  units: [],
};

export const SUBJECTS: Record<SubjectId, Subject> = {
  maths: MATHS,
  pc: PC,
  svt: SVT,
  philo: PHILO,
  si: SI,
};

// ── Filières (streams) — subjects in coefficient order, from cadre.yaml ───────

export const FILIERES: Filiere[] = [
  {
    id: "sm-a",
    name: "Sciences Mathématiques A",
    short: "SM-A",
    blurb: "Le mathématiques au centre, avec une physique exigeante.",
    subjects: [
      { id: "maths", coefficient: 9 },
      { id: "pc", coefficient: 7 },
      { id: "svt", coefficient: 3 },
      { id: "philo", coefficient: 2 },
    ],
  },
  {
    id: "sm-b",
    name: "Sciences Mathématiques B",
    short: "SM-B",
    blurb: "Mathématiques et physique, avec les sciences de l’ingénieur.",
    subjects: [
      { id: "maths", coefficient: 9 },
      { id: "pc", coefficient: 7 },
      { id: "si", coefficient: 3 },
      { id: "philo", coefficient: 2 },
    ],
  },
  {
    id: "pc",
    name: "Sciences Physiques",
    short: "PC",
    blurb: "La physique-chimie au premier plan, portée par les mathématiques.",
    subjects: [
      { id: "pc", coefficient: 7 },
      { id: "maths", coefficient: 7 },
      { id: "svt", coefficient: 5 },
      { id: "philo", coefficient: 2 },
    ],
  },
  {
    id: "svt",
    name: "Sciences de la Vie et de la Terre",
    short: "SVT",
    blurb: "Le vivant et la Terre en priorité, avec un socle physique et mathématique.",
    subjects: [
      { id: "svt", coefficient: 7 },
      { id: "maths", coefficient: 7 },
      { id: "pc", coefficient: 5 },
      { id: "philo", coefficient: 2 },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getFiliere(id: string | null | undefined): Filiere | null {
  return FILIERES.find((f) => f.id === id) ?? null;
}

export function getSubject(id: string): Subject | null {
  return (SUBJECTS as Record<string, Subject>)[id] ?? null;
}

/** All chapter ids (`${subject}/${slug}`) for a subject. */
export function subjectChapterIds(subject: Subject): string[] {
  return subject.units.flatMap((u) => u.chapters.map((c) => `${subject.id}/${c.slug}`));
}

export function subjectChapterCount(subject: Subject): number {
  return subject.units.reduce((n, u) => n + u.chapters.length, 0);
}

/** How many of a subject's chapters are built (present in `builtIds`). */
export function subjectAvailableCount(subject: Subject, builtIds: Set<string>): number {
  return subjectChapterIds(subject).filter((id) => builtIds.has(id)).length;
}

export function isChapterAvailable(subjectId: string, slug: string, builtIds: Set<string>): boolean {
  return builtIds.has(`${subjectId}/${slug}`);
}

/**
 * L'ordre des matières quand aucune filière n'est choisie — la seule source
 * partagée entre les surfaces qui recommandent quelque chose (le « quoi
 * étudier ensuite » du tableau de bord et la fin de leçon). Deux surfaces qui
 * définiraient chacune « l'ordre du programme » finiraient par se contredire
 * devant le même élève.
 */
export const DEFAULT_SUBJECT_ORDER: SubjectId[] = ["maths", "pc", "svt", "philo"];

/**
 * La notion CONSTRUITE qui suit `currentId` dans l'ordre du programme.
 *
 * Pourquoi cette fonction existe (2026-09-05). La fin de leçon proposait
 * `listNotions().filter(…)[0]` — c'est-à-dire l'ordre de `readdirSync`, donc
 * la MÊME notion à la fin de TOUTES les leçons, et un ordre que rien ne
 * garantit. Le commentaire du code affirmait pourtant « la notion la plus
 * récemment mise à jour » : il décrivait une intention, pas le code. Trier par
 * date de fichier n'aurait pas sauvé grand-chose — après un clone frais (donc
 * sur Vercel, à chaque déploiement) toutes les dates sont celles du checkout,
 * et « la plus récente » aurait été une fabrication au sens de la règle d'état
 * honnête.
 *
 * L'ordre du PROGRAMME, lui, existe vraiment et ne dépend d'aucune horloge :
 *   1. le chapitre construit suivant DANS LA MÊME MATIÈRE ;
 *   2. sinon, le premier chapitre construit des matières suivantes ;
 *   3. sinon, en bouclant, le premier chapitre construit de la matière
 *      courante — pour qu'une dernière leçon propose toujours quelque chose.
 *
 * Pas de narrowing par filière ici : la règle d'or (ADR 0025 §2.11) est que la
 * filière NARROWS, jamais GATES, et cette fonction tourne côté serveur, où la
 * préférence de l'appareil n'est pas lisible. Proposer un chapitre hors
 * filière est le comportement déjà admis pour une URL directe.
 */
/**
 * La PREMIÈRE notion construite du parcours — celle par où l'on commence.
 *
 * Pourquoi elle est ici (2026-09-05). Deux surfaces du tableau de bord
 * répondaient chacune de leur côté à « par où commencer » : `SessionCard`
 * triait les notions par DATE DE FICHIER (`updatedAtMs`) et proposait « la
 * plus récente », `NextUp` parcourait le programme. Résultat visible sur la
 * page d'accueil d'un élève neuf : la carte principale proposait une notion
 * de philosophie et la ligne juste en dessous en annonçait une de maths.
 *
 * Et le tri par date n'était pas seulement incohérent, il était FAUX : après
 * un clone frais — donc à chaque déploiement — toutes les dates de fichier
 * sont celles du checkout, et « la plus récente » devient l'ordre du système
 * de fichiers. C'est le même défaut que celui corrigé le même jour dans la
 * fin de leçon, sur le lien le plus important du site.
 *
 * `filiereId === null` ne filtre rien (règle d'or ADR 0025 §2.11 : la
 * filière NARROWS, jamais GATE).
 */
export function premiereDuParcours(
  builtIds: Set<string>,
  filiereId: FiliereId | null = null,
  ordre: SubjectId[] = DEFAULT_SUBJECT_ORDER
): string | null {
  for (const s of ordre) {
    const sujet = SUBJECTS[s];
    if (!sujet) continue;
    for (const unite of sujet.units) {
      for (const chapitre of unite.chapters) {
        if (!chapterInFiliere(chapitre, filiereId)) continue;
        const id = `${s}/${chapitre.slug}`;
        if (builtIds.has(id)) return id;
      }
    }
  }
  return null;
}

export function nextInParcours(currentId: string, builtIds: Set<string>): string | null {
  const subjectId = currentId.split("/")[0] as SubjectId;
  const courante = SUBJECTS[subjectId];

  if (courante) {
    const ids = subjectChapterIds(courante);
    const i = ids.indexOf(currentId);
    if (i >= 0) {
      for (const id of ids.slice(i + 1)) if (builtIds.has(id)) return id;
    }
  }

  for (const s of DEFAULT_SUBJECT_ORDER) {
    if (s === subjectId) continue;
    const sujet = SUBJECTS[s];
    if (!sujet) continue;
    for (const id of subjectChapterIds(sujet)) if (builtIds.has(id)) return id;
  }

  if (courante) {
    for (const id of subjectChapterIds(courante)) if (builtIds.has(id) && id !== currentId) return id;
  }
  return null;
}

// ── Filière narrowing (ADR 0025 §2.11 golden rule) ─────────────────────────────
//
// The filière preference NARROWS the view; it never GATES: a chapter with no
// `filieres` is common to everyone, and `filiereId === null` (no device
// preference chosen) always shows everything. These are pure helpers — no
// browser storage, no side effects — so every consumer narrows the same way.

/**
 * True iff `chapter` belongs to `filiereId`. A chapter with no `filieres`
 * restriction is common to all filières. `filiereId === null` (no preference
 * chosen yet) always returns true — the default, unfiltered view.
 */
export function chapterInFiliere(chapter: Chapter, filiereId: FiliereId | null): boolean {
  if (!filiereId) return true;
  if (!chapter.filieres) return true;
  return chapter.filieres.includes(filiereId);
}

/**
 * A subject's chapters, flattened across all units, narrowed to one filière
 * (see `chapterInFiliere`). `filiereId === null` returns every chapter,
 * unfiltered — the default, "show everything" view.
 */
export function subjectChaptersForFiliere(subject: Subject, filiereId: FiliereId | null): Chapter[] {
  return subject.units.flatMap((u) => u.chapters).filter((c) => chapterInFiliere(c, filiereId));
}

/**
 * A subject's units narrowed to one filière: each unit's chapters filtered by
 * `chapterInFiliere`, and units left with zero chapters dropped entirely (an
 * empty unit heading is worse than no heading). `filiereId === null` returns
 * every unit/chapter unchanged — the unfiltered, "show everything" view.
 */
export function unitsForFiliere(subject: Subject, filiereId: FiliereId | null): Unit[] {
  if (!filiereId) return subject.units;
  return subject.units
    .map((u) => ({ ...u, chapters: u.chapters.filter((c) => chapterInFiliere(c, filiereId)) }))
    .filter((u) => u.chapters.length > 0);
}

/**
 * True iff the built notion id (`${subject}/${slug}`, as produced by
 * `listNotions()`) belongs to `filiereId`. For consumers that hold a flat
 * notion list rather than the nested unit structure (MasteryMap,
 * AvailableShelf, SubjectProgress). An id whose chapter can't be found in
 * `SUBJECTS` defaults to true — narrowing never fabricates an exclusion for a
 * chapter it doesn't recognize.
 */
export function isNotionInFiliere(id: string, filiereId: FiliereId | null): boolean {
  if (!filiereId) return true;
  const slashIndex = id.indexOf("/");
  if (slashIndex === -1) return true;
  const subjectId = id.slice(0, slashIndex);
  const slug = id.slice(slashIndex + 1);
  const subject = getSubject(subjectId);
  if (!subject) return true;
  for (const unit of subject.units) {
    const chapter = unit.chapters.find((c) => c.slug === slug);
    if (chapter) return chapterInFiliere(chapter, filiereId);
  }
  return true;
}
