/**
 * NotionBody
 *
 * Splits lesson markdown on inline media markers and renders them in authored
 * order, interleaving prose segments with SVG diagrams and interactive embeds.
 *
 * Supported marker syntax (one per line, no other text on that line):
 *   [[figure:<slug>]]   → MediaDiagram (SVG looked up by slug in mediaSvgs)
 *   [[embed:<slug>]]    → EmbedPanel   (embed descriptor looked up in mediaEmbeds)
 *
 * Repeated markers are rendered at EVERY occurrence — the authored order is
 * preserved exactly.
 *
 * Unknown slugs → silent no-op (nothing rendered, no crash).
 * Malformed / partial markers never reach this function — they are left as
 * prose and will be escaped as text by react-markdown (they contain no
 * meaningful markdown so they render as a plain line of text, which is
 * still better than crashing; but the regex contract below prevents that
 * for any well-formed [[...]] on its own line).
 *
 * This is a server component — no "use client".
 *
 * DESIGN-BIBLE §0: the learning core is sacred; no engagement theater.
 * DESIGN-BIBLE §7: one primary thing per screen; prose and media interleave
 * as authored.
 */

import type { EmbedDescriptor } from "@/lib/content";
import { LessonRenderer } from "./LessonRenderer";
import { MediaDiagram } from "./MediaDiagram";
import { EmbedPanel } from "./EmbedPanel";

// ── Aria-label map for known figure slugs ────────────────────────────────────
// French captions read aloud by screen readers. Extend as new figures arrive.
const FIGURE_ARIA_LABELS: Record<string, string> = {
  "rlc-schema":      "Schéma du circuit RLC série",
  "regimes-uc":      "Les trois régimes de u_C(t)",
  "energy-exchange": "Échange d'énergie E_C ↔ E_L",
};

function figureAriaLabel(slug: string): string {
  return FIGURE_ARIA_LABELS[slug] ?? slug.replace(/-/g, " ");
}

// ── Marker regex ─────────────────────────────────────────────────────────────
// Matches an entire line that is ONLY a [[figure:slug]] or [[embed:slug]] marker.
// Whitespace before/after the marker on the line is tolerated but not required.
// The slug character set: lowercase letters, digits, hyphens.
const MARKER_LINE_RE = /^\s*\[\[(figure|embed):([a-z0-9-]+)\]\]\s*$/;

// ── Segment types ─────────────────────────────────────────────────────────────

type ProseSegment = { kind: "prose"; md: string };
type FigureSegment = { kind: "figure"; slug: string };
type EmbedSegment  = { kind: "embed";  slug: string };
type Segment = ProseSegment | FigureSegment | EmbedSegment;

/**
 * Split lesson markdown into an ordered list of prose segments and marker
 * segments. Every line of the source lands in exactly one segment — no content
 * is dropped. The order of the output array matches the authored order of the
 * markdown source.
 */
function splitIntoSegments(markdown: string): Segment[] {
  const lines = markdown.split("\n");
  const segments: Segment[] = [];
  let proseLines: string[] = [];

  for (const line of lines) {
    const match = line.match(MARKER_LINE_RE);
    if (match) {
      // Flush accumulated prose (preserve trailing newline so the subsequent
      // prose segment starts clean)
      if (proseLines.length > 0) {
        segments.push({ kind: "prose", md: proseLines.join("\n") });
        proseLines = [];
      }
      const markerKind = match[1] as "figure" | "embed";
      const slug = match[2];
      if (markerKind === "figure") {
        segments.push({ kind: "figure", slug });
      } else {
        segments.push({ kind: "embed", slug });
      }
    } else {
      proseLines.push(line);
    }
  }

  // Flush any remaining prose at end of file
  if (proseLines.length > 0) {
    segments.push({ kind: "prose", md: proseLines.join("\n") });
  }

  return segments;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface NotionBodyProps {
  /** Raw lesson markdown sourced from lesson.md */
  lessonMd: string;
  /** Map of "filename.svg" → SVG string (from content loader) */
  mediaSvgs: Record<string, string>;
  /** Map of slug → EmbedDescriptor (from media/*.json, content loader) */
  mediaEmbeds: Record<string, EmbedDescriptor>;
}

export function NotionBody({ lessonMd, mediaSvgs, mediaEmbeds }: NotionBodyProps) {
  // Build a slug-keyed SVG map (strip ".svg" extension) for marker lookups
  const svgBySlug: Record<string, string> = {};
  for (const [filename, svg] of Object.entries(mediaSvgs)) {
    const slug = filename.replace(/\.svg$/, "");
    svgBySlug[slug] = svg;
  }

  const segments = splitIntoSegments(lessonMd);

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === "prose") {
          // Trim trailing/leading blank lines that appear as artefacts of
          // splitting, but only if the segment has non-whitespace content.
          const trimmed = seg.md.trim();
          if (!trimmed) return null;
          return <LessonRenderer key={i} markdown={trimmed} />;
        }

        if (seg.kind === "figure") {
          const svg = svgBySlug[seg.slug];
          if (!svg) {
            // Unknown slug — render nothing, never crash
            return null;
          }
          return (
            <MediaDiagram
              key={`${seg.slug}-${i}`}
              svg={svg}
              label={figureAriaLabel(seg.slug)}
            />
          );
        }

        if (seg.kind === "embed") {
          const embed = mediaEmbeds[seg.slug] ?? null;
          // EmbedPanel already handles null gracefully (shows placeholder)
          return <EmbedPanel key={`${seg.slug}-${i}`} embed={embed} />;
        }

        return null;
      })}
    </>
  );
}
