/**
 * motion-spec.ts
 *
 * The declarative **beat-spec** schema for the real-motion engine
 * (`MotionStage.tsx`). A `.motion.json` file sits next to its `.motion.svg`
 * in a notion's `media/` directory and describes how that SVG animates,
 * one learner-paced **beat** at a time.
 *
 * Authority: ADR 0022 (design tokens + GSAP/Framer motion stack + beat-spec
 * architecture) and `docs/design/MOTION-CHOREOGRAPHY.md` (the authoring
 * contract). The engine plays a paused GSAP timeline; "Suivant" advances one
 * beat; nothing autoplays. See MotionStage.tsx for the playback semantics.
 *
 * This module is pure types + a defensive parser. It is imported by the
 * server-side content loader (to read+validate the spec) and by the client
 * engine (for the typed shape). It pulls in NO animation library, so it is
 * safe in the server bundle.
 */

// ── Beat verbs ──────────────────────────────────────────────────────────────
// The fixed vocabulary of typed tweens. Each maps to a concrete GSAP gesture in
// the engine. Defined once here; authors compose them in the spec, never code.
export type BeatVerb =
  | "draw" //         DrawSVG stroke-on, 0% → 100% (axes, brackets, connectors)
  | "trace" //        DrawSVG stroke-on for a data curve, drawn left→right
  | "fill" //         a bar / area grows from a baseline edge (scale from `from`)
  | "assemble" //     staggered entrance of a group's children (KaTeX terms, labels)
  | "fade" //         opacity 0→1, optionally translated in from a `from` direction
  | "morph" //        MorphSVG: the target path morphs to `to` (path id or `d`)
  | "pulse-settle"; // one-shot highlight: opacity rises to a peak then settles. NO loop.

// Direction an element travels in from (for `fade`) or grows from (for `fill`).
export type FromDirection = "up" | "down" | "left" | "right" | "none";

// ── A single tween within a beat ────────────────────────────────────────────
export interface BeatTween {
  /** CSS/SVG selector resolved within the stage SVG, e.g. "#curve-2". */
  target: string;
  /** Which gesture to apply. */
  verb: BeatVerb;
  /** Seconds. Omitted → engine default for the verb. */
  duration?: number;
  /**
   * GSAP ease string, e.g. "power2.out". Omitted → engine default for the verb.
   * Restricted by the engine to a non-overshoot allow-list (no bounce/elastic/back).
   */
  ease?: string;
  /** Stagger (seconds) between children — `assemble` only. */
  stagger?: number;
  /** Entrance direction — `fade` (translate-in) and `fill` (grow-from). */
  from?: FromDirection;
  /** Morph destination — `morph` only: another path's id ("#final") or raw `d`. */
  to?: string;
  /** Peak opacity for `pulse-settle` (default 1) before easing to `settle`. */
  peak?: number;
  /** Final opacity an element settles at (default 1). */
  settleTo?: number;
  /** Start offset (seconds) relative to the beat's timeline start. Default 0 (sequential). */
  at?: number;
}

// ── A beat: one click-to-advance unit ───────────────────────────────────────
export interface Beat {
  /** Stable id (for keys / aria). */
  id: string;
  /** One-line caption announced + shown under the stage when this beat is current. */
  caption?: string;
  /** The tweens that play when this beat is advanced to. Run sequentially unless `at` is set. */
  tweens: BeatTween[];
}

// ── Layout discipline (the structural overlap fix, ADR 0022 §4) ──────────────
//   reserved-regions  (default) every element lives in a disjoint named rect;
//                     two beats physically cannot write to overlapping bands.
//   replace           a slot holds exactly ONE current element; a new element
//                     replaces the prior one in place (prior fades as new enters)
//                     — kills vertical pile-up (e.g. loi-des-mailles).
//   reflow            (rare) engine measures bboxes and animates the viewBox.
export type LayoutModel = "reserved-regions" | "replace" | "reflow";

/** A named, disjoint rectangle in SVG user units (reserved-regions bookkeeping). */
export interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * `replace` directive: when this beat plays, the element entering `slot`
 * supersedes whatever element currently occupies it. The engine fades the
 * outgoing element out as the incoming one animates in — one slot, one tenant.
 */
export interface ReplaceDirective {
  /** Beat id this directive belongs to. */
  beat: string;
  /** The slot (a container group id) that holds exactly one current element. */
  slot: string;
  /** The element id entering the slot this beat. */
  enter: string;
  /** The element id currently in the slot, to fade out. Omitted on the first occupant. */
  exit?: string;
}

// ── The full spec ────────────────────────────────────────────────────────────
export interface MotionSpec {
  /** Matches the sibling "<slug>.motion.svg" basename. */
  slug: string;
  /** SVG viewBox, e.g. "0 0 680 480". Mirrors the SVG; used for sizing. */
  viewBox: string;
  /** Accessible label for the figure. */
  label?: string;
  /** Layout model — defaults to "reserved-regions". */
  layout?: LayoutModel;
  /** Named disjoint regions (documentation/bookkeeping for reserved-regions). */
  regions?: Record<string, Region>;
  /** `replace`-model slot directives, keyed implicitly by beat order. */
  replaces?: ReplaceDirective[];
  /** The ordered beats. Beat 0 is shown SETTLED on load (no animation). */
  beats: Beat[];
}

// ── Defensive parser ─────────────────────────────────────────────────────────
// The loader passes untrusted file text. We never throw into a page render:
// a malformed spec returns null and the caller falls back to the legacy
// stepped renderer. Validation is shape-only (verbs/targets checked at runtime
// in the engine, which already guards missing elements).

const VALID_VERBS: ReadonlySet<string> = new Set<BeatVerb>([
  "draw",
  "trace",
  "fill",
  "assemble",
  "fade",
  "morph",
  "pulse-settle",
]);

function isTween(v: unknown): v is BeatTween {
  if (!v || typeof v !== "object") return false;
  const t = v as Record<string, unknown>;
  return (
    typeof t.target === "string" &&
    typeof t.verb === "string" &&
    VALID_VERBS.has(t.verb)
  );
}

function isBeat(v: unknown): v is Beat {
  if (!v || typeof v !== "object") return false;
  const b = v as Record<string, unknown>;
  return (
    typeof b.id === "string" &&
    Array.isArray(b.tweens) &&
    b.tweens.every(isTween)
  );
}

/**
 * Parse + validate a `.motion.json` payload. Returns a typed MotionSpec on
 * success, or null on any malformed/empty input (never throws).
 */
export function parseMotionSpec(raw: string): MotionSpec | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;

  if (typeof d.slug !== "string") return null;
  if (typeof d.viewBox !== "string") return null;
  if (!Array.isArray(d.beats) || d.beats.length === 0) return null;
  if (!d.beats.every(isBeat)) return null;

  return data as MotionSpec;
}
