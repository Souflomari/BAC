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
  /** Last content update — lesson.md file mtime, formatted "juillet 2026". */
  updatedAt?: string;
  /** Raw lesson.md mtime (ms) — for deterministic "most recent" ordering. */
  updatedAtMs?: number;
}

export interface NotionChoice {
  id: string;
  text: string;
  correct: boolean;
  misconception?: string | null;
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

export interface NotionExercise {
  id: string;
  title: string;
  intro?: string;
  questions: ExerciseQuestion[];
  // NOTE: the authoring-side `sourcing` block in exercises.yaml is
  // deliberately NOT loaded — it must never reach the student DOM (audit U3).
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
   * Map of slug → EmbedDescriptor for every media/*.json file.
   * Key is the basename without extension, e.g. "rlc-sandbox".
   * Used by the inline [[embed:slug]] markers.
   */
  mediaEmbeds: Record<string, EmbedDescriptor>;
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
  return match ? match[1].trim() : slug;
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

const FRENCH_MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** "mise à jour" date from the lesson file's mtime — month + year is honest
 *  (day-level precision would suggest an editorial cadence we don't have). */
function updatedAtOf(dir: string): string | undefined {
  try {
    const st = fs.statSync(path.join(dir, "lesson.md"));
    const d = st.mtime;
    return `${FRENCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return undefined;
  }
}

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

      let updatedAtMs: number | undefined;
      try {
        updatedAtMs = fs.statSync(path.join(dir, "lesson.md")).mtimeMs;
      } catch {
        updatedAtMs = undefined;
      }

      results.push({
        id: `${subject}/${slug}`,
        subject,
        slug,
        title,
        readingMinutes: readingMinutesOf(lessonMd),
        updatedAtMs,
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
              title: typeof ex.title === "string" ? ex.title : ex.id,
              intro: typeof ex.intro === "string" ? ex.intro : undefined,
              questions,
            };
          }
        }
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

  // ── media/*.svg (figures), media/*.motion.svg (animations), media/*.json ──
  const mediaSvgs: Record<string, string> = {};
  const motionSvgs: Record<string, string> = {};
  const motionSpecs: Record<string, MotionSpec> = {};
  const mediaEmbeds: Record<string, EmbedDescriptor> = {};
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

    // JSON embed descriptors — keyed by basename slug (e.g. "rlc-sandbox").
    // Skip *.motion.json (already handled above as beat specs).
    for (const file of files.filter((f) => f.endsWith(".json") && !f.endsWith(".motion.json"))) {
      const raw = safeReadFile(path.join(mediaDir, file));
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        // Require at least a url field — malformed/missing → skip, never throw
        if (!parsed || typeof parsed.url !== "string") continue;

        const slug_key = file.replace(/\.json$/, "");
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
    updatedAt: updatedAtOf(dir),
  };
  const renderedLessonMd = stripLeadingTitle(stripAuthoringComments(lessonMd));

  return { meta, lessonMd: renderedLessonMd, itemsData, checkpoints, exercises, derivations, mediaSvgs, motionSvgs, motionSpecs, mediaEmbeds, embed };
}
