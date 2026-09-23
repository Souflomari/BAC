/**
 * lib/content.ts
 *
 * File-based content loader for notion files.
 *
 * Content lives at: <repo-root>/content/<subject>/<notion-slug>/
 *   lesson.md           — lesson prose (markdown + KaTeX delimiters)
 *   items.yaml          — MCQ items + misconceptions map
 *   checkpoints.yaml    — in-lesson checkpoint items (formative, calm-core)
 *   media/*.svg         — static structural/labelled SVG diagrams (figures)
 *   media/*.motion.svg  — animated SVG diagrams (carry their own CSS animation)
 *   media/*.json        — embed descriptors (PhET, GeoGebra, Desmos, Falstad, …)
 *   embed.json          — optional legacy embed descriptor at notion root
 *
 * All reads use `fs` against the filesystem; nothing fetches from Supabase.
 * The content/ dir is a sibling of web/, so paths resolve via process.cwd()
 * which Next.js sets to the project root (web/).
 *
 * Tolerates missing pieces: a notion may have a lesson but no items, no
 * media, no embed — callers receive null/empty for absent pieces.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { parseMotionSpec, type MotionSpec } from "./motion-spec";
import { parseRetenir, type RetenirEntry } from "./retenir";
// TYPOGRAPHIE FRANÇAISE À LA SOURCE. Les titres et intros lus dans les YAML
// sont affichés tels quels par les cartes ; sans normalisation, la même
// langue s'écrivait de deux façons dans la même page — « l'énergie » sur une
// carte d'exercice, « l’énergie » dans le paragraphe juste au-dessus.
// Mesuré le 2026-09-05 : 35 apostrophes droites et espaces manquantes sur
// trois leçons témoins, rien que dans les titres de carte.
import { frenchTypography } from "./frenchTypography";

// ── Path helpers ──────────────────────────────────────────────────────────────

/**
 * Absolute path to the repo-root content/ directory.
 * process.cwd() inside Next.js is the web/ directory, so we go one level up.
 */
function contentRoot(): string {
  return path.join(process.cwd(), "..", "content");
}

/**
 * Absolute path to a specific notion directory.
 */
function notionDir(subject: string, slug: string): string {
  return path.join(contentRoot(), subject, slug);
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NotionMeta {
  /** Unique ID: "<subject>/<slug>", e.g. "maths/probabilites-conditionnelles" */
  id: string;
  subject: string;
  slug: string;
  /** Display title — extracted from the first H1 of lesson.md, or the slug. */
  title: string;
  /** Estimated reading time in minutes (word count / 180 wpm, French prose). */
  readingMinutes?: number;
}

/*
 * `updatedAt` et `updatedAtMs` ont été RETIRÉS le 2026-09-05. Tous deux
 * venaient du `mtime` de `lesson.md`, et une date de fichier n'est pas un
 * fait sur le contenu : après un clone frais — donc à chaque déploiement —
 * elle vaut l'instant du checkout pour les 62 notions à la fois.
 *
 * Les deux avaient déjà coûté un défaut chacun, le même jour :
 *   · `updatedAtMs` ordonnait l'action principale du tableau de bord et la
 *     suggestion de fin de leçon (HANDOFF §10.12 et §10.21) — le pick
 *     retombait sur l'ordre du système de fichiers ;
 *   · `updatedAt` s'affichait dans le masthead de chaque leçon, où les 62
 *     annonçaient « mis à jour septembre 2026 ».
 *
 * Ne pas les réintroduire pour ordonner ou dater du contenu. L'ordre vient
 * du programme (`lib/curriculum.ts`) ; une date de mise à jour, si elle
 * revient un jour, sera un champ AUTORÉ dans le contenu.
 */

export interface NotionChoice {
  id: string;
  text: string;
  correct: boolean;
  /** One tag, or several when a single distracteur exhibits more than one
   *  named error (items.yaml authors both `misconception: a` and
   *  `misconception: [a, b]`). Normalize with `choiceTags` in
   *  lib/events/payload.ts — never read this field with `typeof === "string"`
   *  alone, which silently drops the list form. */
  misconception?: string | string[] | null;
  feedback?: string;
}

export interface NotionItem {
  id: string;
  rung?: string;
  difficulty_level?: number;
  skill_code?: string;
  tags?: string[];
  stem: string;
  type: "mcq" | string;
  choices?: NotionChoice[];
  solution?: string;
  /**
   * L'explication de la BONNE réponse quand l'item n'a pas de `solution`
   * complète. Le champ est écrit dans le corpus depuis l'origine (1 678 items,
   * les 62 notions) et n'était lu par AUCUN composant : 49 items de
   * `philo/analyse-de-texte` n'avaient donc rien à montrer à l'élève qui
   * répondait juste — ni `solution`, ni feedback sur le choix correct, ni
   * ceci. Voir HANDOFF §11.133.
   */
  correct_feedback?: string;
}

export interface MisconceptionEntry {
  id: string;
  label: string;
  description: string;
  contradicts_principle: string;
}

export interface NotionItems {
  notion: string;
  skill_code?: string;
  misconceptions: MisconceptionEntry[];
  items: NotionItem[];
}

export interface EmbedDescriptor {
  /** The kind of embed: "geogebra" | "desmos" | "falstad" | "phet" | "custom" */
  type: string;
  /** The URL to embed in an <iframe> (the full ?ctz= share URL for Falstad) */
  url: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Suggested aspect ratio as a fraction, e.g. 0.5625 for 16:9 */
  aspectRatio?: number;
  /** Base URL without query string (Falstad: url_base) */
  urlBase?: string;
  /** French caption displayed below the embed */
  caption?: string;
  /** Raw netlist text — circuit_import_text fallback if URL fails */
  circuitImportText?: string;
  /**
   * CC-BY / attribution string — MUST be rendered visibly when present.
   * Required for PhET per ADR 0021 §4.
   */
  attribution?: string;
}

/**
 * Scène 3D de première partie (ADR 0041) — un descripteur `media/<slug>.json`
 * dont `tool` vaut "scene3d". Le marqueur reste `[[embed:<slug>]]` : pour la
 * leçon c'est un manipulable comme un autre ; seul le moteur change (three.js,
 * chargé au clic, au lieu d'une iframe tierce).
 *
 * Tout ce qui est PÉDAGOGIQUE vit ici, dans le contenu : les étapes, leurs
 * consignes, l'état posé à l'entrée de chacune, le contrôle qu'elle ouvre.
 * Tout ce qui est CALCUL vit dans le code (`web/src/lib/scene3d/`).
 */
/**
 * Les contrôles, les clés d'état et les lectures sont PROPRES À CHAQUE SCÈNE :
 * ils sont typés ici comme des chaînes, et validés contre le registre
 * `web/src/lib/scene3d/scenes.json` par `validate-content` (échec dur). Chaque
 * panneau resserre ensuite ses propres clés.
 */
export type Scene3DControle = string;

/** L'état posé à l'entrée d'une étape — clés propres à la scène. */
export type Scene3DEtat = Record<string, number | string | undefined>;

/** Les lectures chiffrées qu'une étape affiche (les autres sont absentes) — propres à la scène. */
export type Scene3DLecture = string;

export interface Scene3DChoix {
  id: string;
  /** le texte du choix (KaTeX en ligne permis : `$T^2/r^3$`) */
  texte: string;
  juste: boolean;
  /** pourquoi — montré une fois le pari révélé */
  retour: string;
  misconception?: string | string[];
}

/**
 * Le PARI de l'étape : l'élève s'engage AVANT toute preuve (VISION, physique :
 * « confront the wrong model »). Tant qu'il n'a pas parié, ni le temps ni le
 * contrôle de l'étape n'existent dans le DOM. `revele_apres_h` > 0 : le
 * verdict et le retour n'apparaissent qu'après ce nombre d'heures simulées —
 * c'est la SCÈNE qui répond d'abord, le texte ensuite.
 */
export interface Scene3DPari {
  question: string;
  revele_apres_h?: number;
  choix: Scene3DChoix[];
}

export interface Scene3DEtape {
  id: string;
  titre: string;
  consigne: string;
  pari?: Scene3DPari;
  /** la tâche suivante, montrée une fois le pari révélé */
  suite?: string;
  /** les contrôles que l'étape OUVRE ; les autres sont absents du DOM */
  controles: Scene3DControle[];
  /** les lectures que l'étape affiche une fois le pari révélé ; aucune par défaut */
  lectures?: Scene3DLecture[];
  /** l'état posé en entrant dans l'étape (annoncé par la consigne) ; absent = on garde l'état courant */
  etat?: Scene3DEtat;
}

export interface Scene3DDescriptor {
  slug: string;
  /** la scène enregistrée dans `web/src/lib/scene3d/scenes.json` */
  scene: string;
  title?: string;
  caption?: string;
  etapes: Scene3DEtape[];
}

/**
 * A single checkpoint item (from checkpoints.yaml).
 * Shares the same MCQ structure as NotionItem but is formative-only:
 * no score, no streak, no tally. Lives inside the lesson body.
 */
export type CheckpointItem = NotionItem;

/**
 * Attempt-first exercise (exercises.yaml — Day-5 content systems, audit C1).
 * The student commits to an attempt before `reasoning` is revealed; the
 * component never renders reasoning into the DOM pre-commit.
 */
export interface ExerciseQuestion {
  id: string;
  /** Optional part divider label ("Partie 1 — …"), rendered when it changes. */
  part?: string;
  /** Question stem (markdown + KaTeX). Always visible. */
  stem: string;
  /** Expert reasoning (markdown + KaTeX). Rendered ONLY after the commit. */
  reasoning: string;
  /** Optional stepped derivation rendered (Derivation, bare) after `reasoning`. */
  steps?: DerivationStep[];
}

export interface DerivationStep {
  /** ONE transformation, KaTeX (rendered as display math). */
  math: string;
  /** The expert-decision layer for this move — why this step. */
  note?: string | null;
}

export interface NotionDerivation {
  id: string;
  title?: string;
  steps: DerivationStep[];
}

/** A single stage of a StagedFigure — one caption per revealed step group. */
export interface StagedFigureStageSpec {
  caption: string;
}

/**
 * Parsed media/<slug>.stages.json sidecar (LESSON-EXPERIENCE-SPEC §2.2).
 * `slug` is the authored slug inside the file (asserted equal to the
 * filename-derived key by validate-content.mjs, not re-checked here — the
 * loader is fail-safe, not the source of truth for authoring correctness).
 */
export interface MediaStagesSpec {
  slug: string;
  stages: StagedFigureStageSpec[];
}

/**
 * Parsed media/<slug-figure>.interactive.json sidecar
 * (docs/design/INTERACTIVE-FIGURE-SPEC.md §2.1/§3). Always sits next to a
 * `.stages.json` for the same slug — a manipulable figure is always staged
 * first, never a standalone manipulation mode.
 */
export interface InteractiveControlSpec {
  kind: "drag-point" | "slider";
  axis: string;
  domain: [number, number];
  step: number;
  initial: number;
}
export interface InteractiveBindingSpec {
  target: string;
  recompute: string;
}
export interface InteractiveFigureConfigSpec {
  slug: string;
  control: InteractiveControlSpec;
  bindings: InteractiveBindingSpec[];
  unlockAfterStage: number;
  readoutTemplate?: string;
  /**
   * Optional ONE-SHOT micro-affordance (racines-unite pilot): when the
   * control's value lands on `settleAt` (a transition INTO it, never on
   * mount), `settleTarget` (a CSS selector into the injected SVG) gets a
   * `pulse-settle-once` class for ~450ms — reaction to the student's own
   * action landing back on the lesson's worked example, never ambient/
   * looping (DESIGN-BIBLE §0/§5). Both fields must be present together or
   * both absent.
   */
  settleAt?: number;
  settleTarget?: string;
}

export interface NotionExercise {
  id: string;
  title: string;
  intro?: string;
  questions: ExerciseQuestion[];
  // NOTE: the authoring-side `sourcing` block in exercises.yaml is
  // deliberately NOT loaded — it must never reach the student DOM (audit U3).
}

/**
 * Bank entry provenance — STUDENT-VISIBLE (BANK-SPEC §2/§3.1, decision D1):
 * the year/session badge motivates and matches prep culture. `filiere`/
 * `exerciseLabel` are the exam paper's own stream + position on the paper.
 */
export interface NotionBankEntrySource {
  year: number;
  /** "normale" | "rattrapage". */
  session: string;
  /** The exam paper's stream (PC: "SPC"; maths: "SM" | "SExp"). */
  filiere?: string;
  /** Position on the real paper, e.g. "Exercice I — Partie 2 (Chimie)". */
  exerciseLabel?: string;
}

/**
 * A single « S'entraîner » bank entry (bank.yaml — BANK-SPEC §2). Shares the
 * exercises.yaml QUESTION schema exactly (AttemptFirstExercise reuse), plus a
 * student-visible provenance block, barème, and honest duration. As with
 * exercises.yaml, the authoring-side `sourcing` block is deliberately NOT
 * loaded — it must never reach the student DOM.
 */
export interface NotionBankEntry {
  id: string;
  title: string;
  source: NotionBankEntrySource;
  /** Points on the paper for what this card transcribes (from the scan). */
  baremeTotal?: number;
  /** Honest duration estimate from the barème weight (minutes). */
  durationMin?: number;
  intro?: string;
  questions: ExerciseQuestion[];
}

export interface NotionBank {
  notion: string;
  entries: NotionBankEntry[];
}

/**
 * Parsed checkpoints.yaml top-level shape.
 */
export interface NotionCheckpoints {
  notion: string;
  skill_code?: string;
  checkpoints: CheckpointItem[];
}

export interface NotionContent {
  meta: NotionMeta;
  /** Raw lesson markdown — pass to react-markdown with remark-math + rehype-katex */
  lessonMd: string | null;
  /** Parsed items.yaml */
  itemsData: NotionItems | null;
  /**
   * Checkpoint items keyed by id, from checkpoints.yaml.
   * Used by [[checkpoint:<id>]] markers in the lesson.
   */
  checkpoints: Record<string, CheckpointItem>;
  /** Attempt-first exercises keyed by id, from exercises.yaml. */
  exercises: Record<string, NotionExercise>;
  /**
   * The « S'entraîner » bank (bank.yaml — BANK-SPEC §2), or null when the
   * notion carries no bank.yaml. NotionPageView renders a trailing
   * « S'entraîner » chapter ONLY when this is non-null — every other notion's
   * pagination is unchanged.
   */
  bank: NotionBank | null;
  /** Stepped derivations keyed by id, from derivations.yaml. */
  derivations: Record<string, NotionDerivation>;
  /**
   * Static figure SVGs — media/*.svg EXCLUDING *.motion.svg.
   * Keyed by filename (e.g. "rlc-schema.svg").
   */
  mediaSvgs: Record<string, string>;
  /**
   * Animated SVG diagrams — media/*.motion.svg, keyed by their base slug
   * (the part before ".motion.svg", e.g. "energy-pendulum").
   * These carry their own CSS animations and prefers-reduced-motion blocks.
   */
  motionSvgs: Record<string, string>;
  /**
   * Declarative beat specs — media/*.motion.json, keyed by base slug
   * (e.g. "energy-pendulum"). Parsed + validated via parseMotionSpec.
   * When a motion slug has a spec, the real-motion engine (MotionStage)
   * renders it; absent → the legacy stepped MotionDiagram is used.
   */
  motionSpecs: Record<string, MotionSpec>;
  /**
   * Staged-figure declarations — media/*.stages.json, keyed by base slug
   * (e.g. "regimes-uc.stages.json" → "regimes-uc"), same convention as
   * motionSpecs. When a figure slug has an entry here, NotionBody dispatches
   * to StagedFigure instead of MediaDiagramFigure (LESSON-EXPERIENCE-SPEC §2).
   */
  mediaStages: Record<string, MediaStagesSpec>;
  /**
   * Sidecar « à retenir » — `retenir.json` à la racine de la notion, une
   * entrée par barreau (LESSON-EXPERIENCE-SPEC §3.2). ABSENT pour la
   * quasi-totalité des notions : la zone se replie alors sur la première
   * formule détachée du chapitre, ou reste vide. Un fichier malformé est
   * traité comme absent — jamais une page qui casse.
   */
  retenir: RetenirEntry[] | null;
  /**
   * Bespoke-interactive declarations — media/*.interactive.json, keyed by
   * base slug (e.g. "tangente-derivee.interactive.json" → "tangente-derivee"),
   * same convention as mediaStages. When a figure slug has an entry here,
   * StagedFigure unlocks a manipulation control once the student reaches
   * `unlockAfterStage` (docs/design/INTERACTIVE-FIGURE-SPEC.md §3).
   */
  mediaInteractive: Record<string, InteractiveFigureConfigSpec>;
  /**
   * Map of slug → EmbedDescriptor for every media/*.json file.
   * Key is the basename without extension, e.g. "rlc-sandbox".
   * Used by the inline [[embed:slug]] markers.
   */
  mediaEmbeds: Record<string, EmbedDescriptor>;
  /** Scènes 3D de première partie, par slug de marqueur `[[embed:]]` (ADR 0041). */
  mediaScenes: Record<string, Scene3DDescriptor>;
  /**
   * Parsed embed.json at the notion root, or null if absent.
   * Legacy field — prefer mediaEmbeds for inline markers.
   */
  embed: EmbedDescriptor | null;
}

// ── Safe filesystem helpers ───────────────────────────────────────────────────

function safeReadFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function safeReadDir(dirPath: string): string[] {
  try {
    return fs.readdirSync(dirPath);
  } catch {
    return [];
  }
}

function dirExists(dirPath: string): boolean {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

// ── Title extraction ──────────────────────────────────────────────────────────

/**
 * Extract the first H1 heading from lesson markdown as the display title.
 * Falls back to the slug if no H1 is found.
 */
function extractTitle(lessonMd: string | null, slug: string): string {
  if (!lessonMd) return slug;
  const match = lessonMd.match(/^#\s+(.+)$/m);
  // Normalisé ICI : ce titre part au masthead, au fil d'Ariane, à l'onglet du
  // navigateur et aux métadonnées. Le laisser brut, c'est écrire « L'énergie »
  // en gros au-dessus d'un corps qui écrit « l’énergie ».
  return match ? frenchTypography(match[1].trim()) : slug;
}

/**
 * Strip a leading H1 (and an immediately-following thematic break) from the
 * prose that gets rendered. The page header already renders this title as the
 * masthead anchor (ADR 0023), so leaving it in the prose duplicates the title
 * and emits a second <h1> on the page — an accessibility defect. The title is
 * still extracted from the RAW markdown via extractTitle before this runs, so
 * stripping it here is render-only and never loses the title.
 */
function stripLeadingTitle(lessonMd: string | null): string | null {
  if (!lessonMd) return lessonMd;
  // Remove a leading H1 line, then any blank lines, then an optional `---`
  // thematic break and its trailing blank lines. Only the FIRST H1 at the very
  // top is removed; in-body headings are untouched.
  return lessonMd.replace(
    /^\s*#\s+.+\r?\n+(?:(?:---|\*\*\*|___)[ \t]*\r?\n+)?/,
    ""
  );
}

/**
 * Strip authoring comments (`<!-- … -->`) from lesson markdown BEFORE it can
 * reach any renderer. External-audit finding 5.1 (July 2026): three internal
 * enhancement-slot comments rendered as student-visible text — react-markdown
 * without rehype-raw does not silently drop raw-HTML nodes, so an HTML
 * comment in markdown is NOT a safe annotation channel. This loader-level
 * strip makes the channel safe BY CONSTRUCTION: authors keep writing
 * `<!-- … -->` (NOTION-TEMPLATE-V2 §E), and nothing downstream can render
 * what no longer exists. dom-truth guards the CLASS (no authoring lexicon in
 * any page's rendered text), not just these instances.
 */
function stripAuthoringComments(lessonMd: string | null): string | null {
  if (!lessonMd) return lessonMd;
  return lessonMd.replace(/<!--[\s\S]*?-->/g, "");
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * List all available notions by scanning the content/ directory.
 *
 * Returns an empty array (never throws) when:
 * - content/ does not exist
 * - content/ is empty
 * - no subdirectory contains a readable lesson.md or items.yaml
 *
 * A notion is considered present if its directory exists, regardless of
 * which files it contains — the individual loaders handle missing pieces.
 */

// ── Masthead metadata (audit amendment #3 — web-native texture) ───────────────

/** Estimated reading minutes for a lesson: words / 180 wpm (French prose reads
 *  slower than English; 180 is the conservative convention), min 1. Markdown
 *  markers and [[callouts]] count as words — the error is a rounding noise. */
function readingMinutesOf(lessonMd: string | null): number | undefined {
  if (!lessonMd) return undefined;
  // Authoring comments never render (stripAuthoringComments) — they don't
  // count as reading either (honest metadata: computable facts only).
  const words = (stripAuthoringComments(lessonMd) as string)
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

/**
 * L'inventaire des notions construites — l'ordre est celui du système de
 * fichiers, et RIEN ne doit s'y fier pour classer : l'ordre du produit vient
 * du programme (`lib/curriculum.ts`, `premiereDuParcours` / `nextInParcours`).
 *
 * Le tableau `FRENCH_MONTHS` et le commentaire « mise à jour — month + year
 * est honnête » vivaient ici. Ils ne le sont plus depuis le 2026-09-05 : le
 * mois d'un `mtime` n'est pas honnête après un clone, il est faux pour les
 * 62 notions à la fois. Voir le bloc de retrait au-dessus de `NotionMeta`.
 */
export function listNotions(): NotionMeta[] {
  const root = contentRoot();
  if (!dirExists(root)) return [];

  const results: NotionMeta[] = [];

  const subjects = safeReadDir(root).filter(
    (name) => !name.startsWith("_") && !name.startsWith(".")
  );

  for (const subject of subjects) {
    const subjectPath = path.join(root, subject);
    if (!dirExists(subjectPath)) continue;

    const slugs = safeReadDir(subjectPath).filter(
      (name) => !name.startsWith("_") && !name.startsWith(".")
    );

    for (const slug of slugs) {
      const dir = path.join(subjectPath, slug);
      if (!dirExists(dir)) continue;

      const lessonMd = safeReadFile(path.join(dir, "lesson.md"));
      const title = extractTitle(lessonMd, slug);

      results.push({
        id: `${subject}/${slug}`,
        subject,
        slug,
        title,
        readingMinutes: readingMinutesOf(lessonMd),
      });
    }
  }

  return results;
}

/**
 * Load the full content for a single notion by its id ("subject/slug").
 *
 * Returns null if the notion directory does not exist at all.
 * Returns a NotionContent with null/empty fields for any missing pieces —
 * never throws on absent files.
 */
export function loadNotion(id: string): NotionContent | null {
  const parts = id.split("/");
  if (parts.length !== 2) return null;
  const [subject, slug] = parts;

  const dir = notionDir(subject, slug);
  if (!dirExists(dir)) return null;

  // ── lesson.md ──
  const lessonMd = safeReadFile(path.join(dir, "lesson.md"));

  // ── items.yaml ──
  let itemsData: NotionItems | null = null;
  const itemsRaw = safeReadFile(path.join(dir, "items.yaml"));
  if (itemsRaw) {
    try {
      const parsed = yaml.load(itemsRaw);
      if (parsed && typeof parsed === "object") {
        itemsData = parsed as NotionItems;
      }
    } catch {
      // Malformed YAML — treat as absent, never crash the page
      itemsData = null;
    }
  }

  // ── checkpoints.yaml ──
  const checkpoints: Record<string, CheckpointItem> = {};
  const checkpointsRaw = safeReadFile(path.join(dir, "checkpoints.yaml"));
  if (checkpointsRaw) {
    try {
      const parsed = yaml.load(checkpointsRaw) as NotionCheckpoints | null;
      if (parsed && Array.isArray(parsed.checkpoints)) {
        for (const cp of parsed.checkpoints) {
          if (cp && typeof cp.id === "string") {
            checkpoints[cp.id] = cp as CheckpointItem;
          }
        }
      }
    } catch {
      // Malformed YAML — treat as absent, never crash the page
    }
  }

  // ── exercises.yaml (attempt-first, Day-5 — audit C1) ──
  const exercises: Record<string, NotionExercise> = {};
  const exercisesRaw = safeReadFile(path.join(dir, "exercises.yaml"));
  if (exercisesRaw) {
    try {
      const parsed = yaml.load(exercisesRaw) as {
        exercises?: Array<{
          id?: string;
          title?: string;
          intro?: string;
          questions?: Array<{ id?: string; part?: string; stem?: string; reasoning?: string }>;
        }>;
      } | null;
      if (parsed && Array.isArray(parsed.exercises)) {
        for (const ex of parsed.exercises) {
          if (!ex || typeof ex.id !== "string" || !Array.isArray(ex.questions)) continue;
          const questions: ExerciseQuestion[] = [];
          for (const q of ex.questions) {
            if (q && typeof q.id === "string" && typeof q.stem === "string" && typeof q.reasoning === "string") {
              const qq = q as typeof q & { steps?: Array<{ math?: string; note?: string | null }> };
              const steps: DerivationStep[] = [];
              if (Array.isArray(qq.steps)) {
                for (const st of qq.steps) {
                  if (st && typeof st.math === "string") {
                    steps.push({ math: st.math, note: typeof st.note === "string" ? st.note : null });
                  }
                }
              }
              questions.push({ id: q.id, part: q.part, stem: q.stem, reasoning: q.reasoning, steps: steps.length > 0 ? steps : undefined });
            }
          }
          if (questions.length > 0) {
            exercises[ex.id] = {
              id: ex.id,
              title: frenchTypography(typeof ex.title === "string" ? ex.title : ex.id),
              intro: typeof ex.intro === "string" ? frenchTypography(ex.intro) : undefined,
              questions,
            };
          }
        }
      }
    } catch {
      // Malformed YAML — treat as absent, never crash the page
    }
  }

  // ── bank.yaml (the « S'entraîner » bank — BANK-SPEC §2) ──
  // Same fail-safe discipline as every loader here: malformed/absent → null,
  // never a thrown page. The authoring-side `sourcing` block is deliberately
  // NOT loaded (it must never reach the student DOM — same rule as exercises).
  let bank: NotionBank | null = null;
  const bankRaw = safeReadFile(path.join(dir, "bank.yaml"));
  if (bankRaw) {
    try {
      const parsed = yaml.load(bankRaw) as {
        notion?: string;
        entries?: Array<{
          id?: string;
          title?: string;
          source?: {
            year?: number;
            session?: string;
            filiere?: string;
            exercise_label?: string;
          };
          bareme_total?: number;
          duration_min?: number;
          intro?: string;
          questions?: Array<{ id?: string; part?: string; stem?: string; reasoning?: string }>;
        }>;
      } | null;
      if (parsed && Array.isArray(parsed.entries)) {
        const entries: NotionBankEntry[] = [];
        for (const e of parsed.entries) {
          if (!e || typeof e.id !== "string" || !Array.isArray(e.questions)) continue;
          const src = e.source ?? {};
          if (typeof src.year !== "number" || typeof src.session !== "string") continue;
          const questions: ExerciseQuestion[] = [];
          for (const q of e.questions) {
            if (q && typeof q.id === "string" && typeof q.stem === "string" && typeof q.reasoning === "string") {
              const qq = q as typeof q & { steps?: Array<{ math?: string; note?: string | null }> };
              const steps: DerivationStep[] = [];
              if (Array.isArray(qq.steps)) {
                for (const st of qq.steps) {
                  if (st && typeof st.math === "string") {
                    steps.push({ math: st.math, note: typeof st.note === "string" ? st.note : null });
                  }
                }
              }
              questions.push({ id: q.id, part: q.part, stem: q.stem, reasoning: q.reasoning, steps: steps.length > 0 ? steps : undefined });
            }
          }
          if (questions.length === 0) continue;
          entries.push({
            id: e.id,
            title: frenchTypography(typeof e.title === "string" ? e.title : e.id),
            source: {
              year: src.year,
              session: src.session,
              filiere: typeof src.filiere === "string" ? src.filiere : undefined,
              exerciseLabel: typeof src.exercise_label === "string" ? src.exercise_label : undefined,
            },
            baremeTotal: typeof e.bareme_total === "number" ? e.bareme_total : undefined,
            durationMin: typeof e.duration_min === "number" ? e.duration_min : undefined,
            intro: typeof e.intro === "string" ? e.intro : undefined,
            questions,
          });
        }
        // Non-null bank even with zero entries: the trailing chapter's honest
        // empty state (BANK-SPEC §1) is a real, different render from "no bank".
        bank = { notion: typeof parsed.notion === "string" ? parsed.notion : `${subject}/${slug}`, entries };
      }
    } catch {
      // Malformed YAML — treat as absent, never crash the page
    }
  }

  // ── derivations.yaml (stepped derivations, Day-6 — DESIGN-BIBLE §7) ──
  const derivations: Record<string, NotionDerivation> = {};
  const derivationsRaw = safeReadFile(path.join(dir, "derivations.yaml"));
  if (derivationsRaw) {
    try {
      const parsed = yaml.load(derivationsRaw) as {
        derivations?: Array<{ id?: string; title?: string; steps?: Array<{ math?: string; note?: string | null }> }>;
      } | null;
      if (parsed && Array.isArray(parsed.derivations)) {
        for (const d of parsed.derivations) {
          if (!d || typeof d.id !== "string" || !Array.isArray(d.steps)) continue;
          const steps: DerivationStep[] = [];
          for (const st of d.steps) {
            if (st && typeof st.math === "string") {
              steps.push({ math: st.math, note: typeof st.note === "string" ? st.note : null });
            }
          }
          if (steps.length > 0) {
            derivations[d.id] = { id: d.id, title: typeof d.title === "string" ? d.title : undefined, steps };
          }
        }
      }
    } catch {
      // Malformed YAML — treat as absent, never crash the page
    }
  }

  // ── retenir.json (LESSON-EXPERIENCE-SPEC §3.2) ──
  // Sidecar facultatif, à la racine de la notion. Malformé = absent : la zone
  // « à retenir » se replie alors sur la première formule détachée du
  // chapitre, ou reste vide et silencieuse. Une colonne latérale ne vaut pas
  // qu'on casse une page.
  let retenir: RetenirEntry[] | null = null;
  const retenirRaw = safeReadFile(path.join(dir, "retenir.json"));
  if (retenirRaw) {
    try {
      retenir = parseRetenir(JSON.parse(retenirRaw));
    } catch {
      retenir = null;
    }
  }

  // ── media/*.svg (figures), media/*.motion.svg (animations), media/*.json ──
  const mediaSvgs: Record<string, string> = {};
  const motionSvgs: Record<string, string> = {};
  const motionSpecs: Record<string, MotionSpec> = {};
  const mediaStages: Record<string, MediaStagesSpec> = {};
  const mediaInteractive: Record<string, InteractiveFigureConfigSpec> = {};
  const mediaEmbeds: Record<string, EmbedDescriptor> = {};
  const mediaScenes: Record<string, Scene3DDescriptor> = {};
  const mediaDir = path.join(dir, "media");
  if (dirExists(mediaDir)) {
    const files = safeReadDir(mediaDir);

    for (const file of files.filter((f) => f.endsWith(".svg"))) {
      const svg = safeReadFile(path.join(mediaDir, file));
      if (!svg) continue;

      if (file.endsWith(".motion.svg")) {
        // Motion SVG — key is the slug without ".motion.svg"
        // e.g. "energy-pendulum.motion.svg" → key "energy-pendulum"
        const motionSlug = file.replace(/\.motion\.svg$/, "");
        motionSvgs[motionSlug] = svg;
      } else {
        // Static figure SVG — keyed by full filename (e.g. "rlc-schema.svg")
        mediaSvgs[file] = svg;
      }
    }

    // Beat specs — media/*.motion.json — parsed for the real-motion engine.
    // Keyed by base slug ("energy-pendulum.motion.json" → "energy-pendulum").
    // Loaded BEFORE the embed-JSON loop so these files are not mis-read as
    // embed descriptors (they carry no `url`, so they'd be skipped anyway —
    // but routing them explicitly keeps intent clear).
    for (const file of files.filter((f) => f.endsWith(".motion.json"))) {
      const raw = safeReadFile(path.join(mediaDir, file));
      if (!raw) continue;
      const spec = parseMotionSpec(raw);
      if (spec) {
        const motionSlug = file.replace(/\.motion\.json$/, "");
        motionSpecs[motionSlug] = spec;
      }
    }

    // Staged-figure sidecars — media/*.stages.json (LESSON-EXPERIENCE-SPEC §2.2).
    // Keyed by base slug ("regimes-uc.stages.json" → "regimes-uc"), same
    // convention as motionSpecs. Loaded BEFORE the embed-JSON loop below so
    // these files are never mis-read as embed descriptors (they carry no
    // `url`, so the embed loop would skip them anyway — routing them
    // explicitly keeps intent clear, matching the motion-spec comment above).
    // Malformed JSON → console.warn + skip, never throw (every loader here is
    // fail-safe; a bad sidecar must not take the page down).
    for (const file of files.filter((f) => f.endsWith(".stages.json"))) {
      const raw = safeReadFile(path.join(mediaDir, file));
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") {
          console.warn(`loadNotion(${id}): media/${file} is not a JSON object — skipped`);
          continue;
        }
        const p = parsed as { slug?: unknown; stages?: unknown };
        if (typeof p.slug !== "string" || !Array.isArray(p.stages) || p.stages.length === 0) {
          console.warn(
            `loadNotion(${id}): media/${file} missing "slug" or a non-empty "stages" array — skipped`
          );
          continue;
        }
        const stages: StagedFigureStageSpec[] = [];
        let allCaptionsValid = true;
        for (const s of p.stages) {
          const caption = (s as { caption?: unknown } | null)?.caption;
          if (typeof caption !== "string" || caption.length === 0) {
            allCaptionsValid = false;
            break;
          }
          stages.push({ caption });
        }
        if (!allCaptionsValid) {
          console.warn(`loadNotion(${id}): media/${file} has a non-string/empty stage caption — skipped`);
          continue;
        }
        const stageSlug = file.replace(/\.stages\.json$/, "");
        mediaStages[stageSlug] = { slug: p.slug, stages };
      } catch (err) {
        console.warn(
          `loadNotion(${id}): media/${file} invalid JSON — skipped (${(err as Error).message})`
        );
      }
    }

    // Bespoke-interactive sidecars — media/*.interactive.json
    // (INTERACTIVE-FIGURE-SPEC.md §2.1). Keyed by base slug
    // ("tangente-derivee.interactive.json" → "tangente-derivee"), loaded
    // BEFORE the embed-JSON loop below for the same reason as motionSpecs/
    // mediaStages above — these carry no `url`, so routing them explicitly
    // just keeps intent clear. Malformed/incomplete → console.warn + skip,
    // never throw (every loader here is fail-safe).
    for (const file of files.filter((f) => f.endsWith(".interactive.json"))) {
      const raw = safeReadFile(path.join(mediaDir, file));
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") {
          console.warn(`loadNotion(${id}): media/${file} is not a JSON object — skipped`);
          continue;
        }
        const p = parsed as {
          slug?: unknown;
          control?: unknown;
          bindings?: unknown;
          unlockAfterStage?: unknown;
          readoutTemplate?: unknown;
          settleAt?: unknown;
          settleTarget?: unknown;
        };
        const c = p.control as
          | { kind?: unknown; axis?: unknown; domain?: unknown; step?: unknown; initial?: unknown }
          | undefined;
        const domainValid =
          Array.isArray(c?.domain) &&
          c.domain.length === 2 &&
          typeof c.domain[0] === "number" &&
          typeof c.domain[1] === "number" &&
          c.domain[0] < c.domain[1];
        if (
          typeof p.slug !== "string" ||
          !c ||
          (c.kind !== "drag-point" && c.kind !== "slider") ||
          typeof c.axis !== "string" ||
          !domainValid ||
          typeof c.step !== "number" ||
          typeof c.initial !== "number" ||
          !Array.isArray(p.bindings) ||
          typeof p.unlockAfterStage !== "number"
        ) {
          console.warn(`loadNotion(${id}): media/${file} has an invalid shape — skipped`);
          continue;
        }
        const domain = c.domain as [number, number];
        const bindings: InteractiveBindingSpec[] = [];
        let allBindingsValid = true;
        for (const b of p.bindings) {
          const target = (b as { target?: unknown } | null)?.target;
          const recompute = (b as { recompute?: unknown } | null)?.recompute;
          if (typeof target !== "string" || typeof recompute !== "string") {
            allBindingsValid = false;
            break;
          }
          bindings.push({ target, recompute });
        }
        if (!allBindingsValid) {
          console.warn(`loadNotion(${id}): media/${file} has an invalid binding — skipped`);
          continue;
        }
        const interactiveSlug = file.replace(/\.interactive\.json$/, "");
        mediaInteractive[interactiveSlug] = {
          slug: p.slug,
          control: {
            kind: c.kind,
            axis: c.axis,
            domain: [domain[0], domain[1]],
            step: c.step,
            initial: c.initial,
          },
          bindings,
          unlockAfterStage: p.unlockAfterStage,
          readoutTemplate: typeof p.readoutTemplate === "string" ? p.readoutTemplate : undefined,
          settleAt: typeof p.settleAt === "number" ? p.settleAt : undefined,
          settleTarget: typeof p.settleTarget === "string" ? p.settleTarget : undefined,
        };
      } catch (err) {
        console.warn(
          `loadNotion(${id}): media/${file} invalid JSON — skipped (${(err as Error).message})`
        );
      }
    }

    // JSON embed descriptors — keyed by basename slug (e.g. "rlc-sandbox").
    // Skip *.motion.json, *.stages.json, and *.interactive.json (already handled above).
    for (const file of files.filter(
      (f) =>
        f.endsWith(".json") &&
        !f.endsWith(".motion.json") &&
        !f.endsWith(".stages.json") &&
        !f.endsWith(".interactive.json")
    )) {
      const raw = safeReadFile(path.join(mediaDir, file));
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        const slug_key = file.replace(/\.json$/, "");

        // Scène 3D de première partie : pas d'url, une scène et des étapes.
        // Forme minimale exigée ici (never throw) ; `validate-content` juge
        // le reste, en échec dur.
        if (parsed && parsed.tool === "scene3d") {
          if (typeof parsed.scene !== "string" || !Array.isArray(parsed.etapes) || parsed.etapes.length === 0) continue;
          mediaScenes[slug_key] = {
            slug: slug_key,
            scene: parsed.scene,
            title: parsed.title_fr ?? parsed.title ?? undefined,
            caption: parsed.caption_fr ?? parsed.caption ?? undefined,
            etapes: parsed.etapes,
          };
          continue;
        }

        // Require at least a url field — malformed/missing → skip, never throw
        if (!parsed || typeof parsed.url !== "string") continue;

        mediaEmbeds[slug_key] = {
          type: parsed.tool ?? parsed.type ?? "custom",
          url: parsed.url,
          title: parsed.title_fr ?? parsed.title ?? undefined,
          aspectRatio: parsed.aspectRatio ?? undefined,
          urlBase: parsed.url_base ?? undefined,
          caption: parsed.caption_fr ?? parsed.caption ?? undefined,
          circuitImportText: parsed.circuit_import_text ?? undefined,
          attribution: parsed.attribution ?? undefined,
        };
      } catch {
        // Malformed JSON — skip silently, never crash the page
      }
    }
  }

  // ── embed.json (legacy, notion root) ──
  let embed: EmbedDescriptor | null = null;
  const embedRaw = safeReadFile(path.join(dir, "embed.json"));
  if (embedRaw) {
    try {
      const parsed = JSON.parse(embedRaw);
      if (parsed && typeof parsed.url === "string") {
        embed = {
          type: parsed.tool ?? parsed.type ?? "custom",
          url: parsed.url,
          title: parsed.title_fr ?? parsed.title ?? undefined,
          aspectRatio: parsed.aspectRatio ?? undefined,
          urlBase: parsed.url_base ?? undefined,
          caption: parsed.caption_fr ?? parsed.caption ?? undefined,
          circuitImportText: parsed.circuit_import_text ?? undefined,
        };
      }
    } catch {
      embed = null;
    }
  }

  // ── meta ──
  // Extract the title from the RAW markdown, THEN strip the leading H1 so the
  // rendered prose doesn't duplicate the masthead (ADR 0023 heading anchor).
  const title = extractTitle(lessonMd, slug);
  const meta: NotionMeta = {
    id, subject, slug, title,
    readingMinutes: readingMinutesOf(lessonMd),
  };
  const renderedLessonMd = stripLeadingTitle(stripAuthoringComments(lessonMd));

  return { meta, lessonMd: renderedLessonMd, itemsData, checkpoints, exercises, bank, derivations, mediaSvgs, motionSvgs, motionSpecs, mediaStages, retenir, mediaInteractive, mediaEmbeds, mediaScenes, embed };
}
