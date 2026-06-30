/**
 * NotionBody
 *
 * Splits lesson markdown on inline media markers and renders them in authored
 * order, interleaving prose segments with SVG diagrams, animations, embeds,
 * checkpoints, and video elements.
 *
 * Supported marker syntax (one per line, no other text on that line):
 *   [[figure:<slug>]]      → MediaDiagram (static SVG, progressive stepped reveal)
 *   [[motion:<slug>]]      → MotionDiagram (animated SVG from *.motion.svg)
 *   [[embed:<slug>]]       → EmbedPanel (embed descriptor from media/*.json)
 *   [[checkpoint:<id>]]    → CheckpointItem (inline formative MCQ from checkpoints.yaml)
 *   [[video:<slug>]]       → VideoElement (graceful: renders if asset exists, omits if not)
 *
 * Progressive (stepped) figure reveal:
 *   Figures with step groups (id="step-1", "step-2", …) are revealed cumulatively
 *   by occurrence order in the document. The Nth occurrence of slug "rlc-schema"
 *   shows step groups 1..N and hides the rest. This requires no lesson-file edits —
 *   cumulative count is tracked at render time.
 *
 *   Stepped slugs (configured here): "rlc-schema" (4 steps), "regimes-uc" (3 steps).
 *   All other figure slugs render fully (visibleSteps=undefined).
 *
 * Unknown slugs → silent no-op (nothing rendered, no crash).
 * No [[…]] literal ever leaks to the rendered page.
 * No browser storage anywhere in this component tree.
 *
 * This is a SERVER component — no "use client".
 * CheckpointItem and MotionDiagram are client components imported here and
 * hydrated in the browser.
 *
 * DESIGN-BIBLE §0: learning core is sacred; no engagement theater.
 * DESIGN-BIBLE §7: one primary thing per screen; prose and media interleave as authored.
 */

import type { EmbedDescriptor, CheckpointItem as CheckpointItemType } from "@/lib/content";
import type { MotionSpec } from "@/lib/motion-spec";
import { frenchTypography } from "@/lib/frenchTypography";
import { LessonRenderer } from "./LessonRenderer";
import { MediaDiagramFigure } from "./MediaDiagram";
import { MotionDiagram } from "./MotionDiagram";
import { MotionStage } from "./MotionStage";
import { EmbedPanel } from "./EmbedPanel";
import { CheckpointItem } from "./CheckpointItem";

// ── Stepped figure configuration ─────────────────────────────────────────────
// Slugs listed here have step groups (id="step-1"…"step-N") in their SVG.
// The maximum step count is specified so we can cap the reveal at that maximum
// (e.g., the 5th occurrence of a 4-step figure still shows all 4 steps).
const STEPPED_FIGURE_MAX_STEPS: Record<string, number> = {
  "rlc-schema":  4,  // R0/R1/R2/R3 → steps 1/2/3/4
  "regimes-uc":  3,  // R0/R3-R4/R6 → steps 1/2/3
};

// ── Aria-label map for known figure slugs ────────────────────────────────────
// French captions read aloud by screen readers. Extend as new figures arrive.
const FIGURE_ARIA_LABELS: Record<string, string> = {
  "rlc-schema":          "Schéma du circuit RLC série",
  "regimes-uc":          "Les trois régimes de u_C(t)",
  "energy-exchange":     "Échange d'énergie E_C ↔ E_L",
  "energy-pendulum":     "Animation : échanges d'énergie E_C et E_L en antiphase",
  "regime-traces-forming": "Animation : les trois régimes se tracent de gauche à droite",
  "loi-des-mailles-build": "Animation : construction terme à terme de la loi des mailles",
  "origin-uc":           "Origine de la relation u_C = q/C",
  "origin-i":            "Origine de la relation i = dq/dt",
  "origin-uL":           "Origine de la relation u_L = L di/dt",
  "loi-mailles-build":   "Construction terme à terme de la loi des mailles",
};

function figureAriaLabel(slug: string): string {
  // Route through frenchTypography so the screen-reader-announced layer carries
  // the same curly apostrophe / narrow-no-break-space orthotypography as the
  // visible copy (ADR 0024 content pass — the announced layer must not regress).
  return frenchTypography(FIGURE_ARIA_LABELS[slug] ?? slug.replace(/-/g, " "));
}

// ── Step caption map: (slug × stepNumber) → caption text ─────────────────────
// Human-readable caption for each step of a progressive figure.
const STEP_CAPTIONS: Record<string, Record<number, string>> = {
  "rlc-schema": {
    1: "Étape 1 — la boucle nue : condensateur C et bobine L en série, interrupteur K.",
    2: "Étape 2 — le courant i et sa flèche apparaissent dans la boucle.",
    3: "Étape 3 — les tensions u_C et u_L sont étiquetées en convention récepteur.",
    4: "Étape 4 — la résistance R et u_R entrent dans le circuit.",
  },
  "regimes-uc": {
    1: "Étape 1 — régime périodique (R ≈ 0) : sinusoïde parfaite, amplitude constante.",
    2: "Étape 2 — régime pseudo-périodique ajouté : les oscillations s'amortissent.",
    3: "Étape 3 — régime apériodique ajouté : retour monotone vers zéro, sans oscillation.",
  },
};

function stepCaption(slug: string, step: number): string | undefined {
  return STEP_CAPTIONS[slug]?.[step];
}

// ── Marker regex ──────────────────────────────────────────────────────────────
// Matches an entire line that is ONLY a [[type:slug]] marker.
// Whitespace before/after the marker on the line is tolerated.
// Slug character set: lowercase letters, digits, hyphens.
// Also matches checkpoint IDs which may contain uppercase and underscores:
//   [[checkpoint:cp-r3-m1]]
// So we use a broader character class for the id part: [a-zA-Z0-9_-]+
const MARKER_LINE_RE =
  /^\s*\[\[(figure|motion|embed|checkpoint|video):([a-zA-Z0-9_-]+)\]\]\s*$/;

// ── Segment types ─────────────────────────────────────────────────────────────

type ProseSegment      = { kind: "prose";      md: string };
type FigureSegment     = { kind: "figure";     slug: string };
type MotionSegment     = { kind: "motion";     slug: string };
type EmbedSegment      = { kind: "embed";      slug: string };
type CheckpointSegment = { kind: "checkpoint"; id: string };
type VideoSegment      = { kind: "video";      slug: string };

type Segment =
  | ProseSegment
  | FigureSegment
  | MotionSegment
  | EmbedSegment
  | CheckpointSegment
  | VideoSegment;

/**
 * Split lesson markdown into an ordered list of prose and marker segments.
 * Every line lands in exactly one segment — no content is dropped.
 * Order matches the authored order of the markdown source.
 */
function splitIntoSegments(markdown: string): Segment[] {
  const lines = markdown.split("\n");
  const segments: Segment[] = [];
  let proseLines: string[] = [];

  for (const line of lines) {
    const match = line.match(MARKER_LINE_RE);
    if (match) {
      if (proseLines.length > 0) {
        segments.push({ kind: "prose", md: proseLines.join("\n") });
        proseLines = [];
      }
      const markerKind = match[1] as Segment["kind"];
      const id = match[2];
      switch (markerKind) {
        case "figure":     segments.push({ kind: "figure",     slug: id }); break;
        case "motion":     segments.push({ kind: "motion",     slug: id }); break;
        case "embed":      segments.push({ kind: "embed",      slug: id }); break;
        case "checkpoint": segments.push({ kind: "checkpoint", id });        break;
        case "video":      segments.push({ kind: "video",      slug: id }); break;
      }
    } else {
      proseLines.push(line);
    }
  }

  if (proseLines.length > 0) {
    segments.push({ kind: "prose", md: proseLines.join("\n") });
  }

  return segments;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface NotionBodyProps {
  /** Raw lesson markdown sourced from lesson.md */
  lessonMd: string;
  /**
   * Static figure SVGs — media/*.svg (excluding *.motion.svg).
   * Keyed by filename (e.g. "rlc-schema.svg").
   */
  mediaSvgs: Record<string, string>;
  /**
   * Animated SVG diagrams — media/*.motion.svg.
   * Keyed by slug without ".motion.svg" (e.g. "energy-pendulum").
   */
  motionSvgs: Record<string, string>;
  /**
   * Declarative beat specs — media/*.motion.json, keyed by base slug.
   * When a motion slug has a spec, the real-motion engine (MotionStage)
   * renders it; otherwise the legacy stepped MotionDiagram is used.
   */
  motionSpecs: Record<string, MotionSpec>;
  /** Map of slug → EmbedDescriptor for every media/*.json file. */
  mediaEmbeds: Record<string, EmbedDescriptor>;
  /** Checkpoint items keyed by id. */
  checkpoints: Record<string, CheckpointItemType>;
}

export function NotionBody({
  lessonMd,
  mediaSvgs,
  motionSvgs,
  motionSpecs,
  mediaEmbeds,
  checkpoints,
}: NotionBodyProps) {
  // Build a slug-keyed SVG map for static figures (strip ".svg" extension)
  const svgBySlug: Record<string, string> = {};
  for (const [filename, svg] of Object.entries(mediaSvgs)) {
    const slug = filename.replace(/\.svg$/, "");
    svgBySlug[slug] = svg;
  }

  const segments = splitIntoSegments(lessonMd);

  // Track occurrence count per stepped figure slug for cumulative reveal.
  // Key: slug, Value: how many times this slug has been rendered so far.
  const figureOccurrenceCount: Record<string, number> = {};

  return (
    <>
      {segments.map((seg, i) => {
        // ── Prose ──────────────────────────────────────────────────────────
        if (seg.kind === "prose") {
          const trimmed = seg.md.trim();
          if (!trimmed) return null;
          return (
            // notion-prose: max-width 65ch + mx-auto (centered in content band)
            <div key={i} className="notion-prose">
              <LessonRenderer markdown={trimmed} />
            </div>
          );
        }

        // ── Figure (static SVG, optionally stepped) ────────────────────────
        if (seg.kind === "figure") {
          const svg = svgBySlug[seg.slug];
          if (!svg) return null; // Unknown slug — silent no-op

          // Cumulative step reveal
          const maxSteps = STEPPED_FIGURE_MAX_STEPS[seg.slug];
          let visibleSteps: number | undefined;
          let caption: string | undefined;

          if (maxSteps !== undefined) {
            // Increment occurrence counter
            figureOccurrenceCount[seg.slug] =
              (figureOccurrenceCount[seg.slug] ?? 0) + 1;
            const occurrence = figureOccurrenceCount[seg.slug];
            // Clamp to max steps so extra occurrences show the full figure
            visibleSteps = Math.min(occurrence, maxSteps);
            caption = stepCaption(seg.slug, visibleSteps);
          }

          return (
            <MediaDiagramFigure
              key={`${seg.slug}-${i}`}
              slug={seg.slug}
              svg={svg}
              label={figureAriaLabel(seg.slug)}
              visibleSteps={visibleSteps}
              stepCaption={caption}
            />
          );
        }

        // ── Motion (animated SVG) ──────────────────────────────────────────
        if (seg.kind === "motion") {
          const svg = motionSvgs[seg.slug];
          if (!svg) return null; // Unknown slug — silent no-op

          // Real-motion engine when a beat spec exists; else legacy stepped
          // renderer (graceful: not every motion slug has been converted yet).
          const spec = motionSpecs[seg.slug];
          if (spec) {
            return (
              <MotionStage
                key={`motion-${seg.slug}-${i}`}
                svg={svg}
                spec={spec}
                label={figureAriaLabel(seg.slug)}
              />
            );
          }

          return (
            <MotionDiagram
              key={`motion-${seg.slug}-${i}`}
              svg={svg}
              label={figureAriaLabel(seg.slug)}
            />
          );
        }

        // ── Embed ──────────────────────────────────────────────────────────
        if (seg.kind === "embed") {
          const embed = mediaEmbeds[seg.slug] ?? null;
          // EmbedPanel handles null gracefully (shows placeholder)
          return (
            <EmbedPanel
              key={`embed-${seg.slug}-${i}`}
              embed={embed}
            />
          );
        }

        // ── Checkpoint ─────────────────────────────────────────────────────
        if (seg.kind === "checkpoint") {
          const item = checkpoints[seg.id];
          if (!item) return null; // Unknown id — silent no-op

          return (
            <div key={`cp-${seg.id}-${i}`} className="my-10 notion-wide-band">
              <CheckpointItem item={item} />
            </div>
          );
        }

        // ── Video ──────────────────────────────────────────────────────────
        // Gracefully omit if the asset does not exist.
        // The lesson currently references [[video:balancement]] — if the Veo
        // asset has not been produced yet, this renders nothing (no error, no
        // placeholder — design brief specifies graceful omission).
        if (seg.kind === "video") {
          // Video assets are not loaded server-side in this pass —
          // the balancement Veo clip is pending production. When a video
          // asset exists, it would be passed in via a `mediaVideos` prop.
          // For now: silent no-op on all video markers.
          // This satisfies the "omit gracefully, never show a placeholder error"
          // requirement without blocking the build.
          return null;
        }

        return null;
      })}
    </>
  );
}
