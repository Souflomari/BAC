/**
 * Icon — the BAC app's single icon module.
 *
 * Ends the ad-hoc inlined-SVG duplication (audit: three different stroke
 * weights, check/cross redrawn in both McqItem and CheckpointItem). Every glyph
 * the product draws by hand now lives here, on ONE normalized 24×24 viewBox with
 * ONE stroke language.
 *
 * STROKE LANGUAGE (single source of truth):
 *   - Stroke icons: strokeWidth 2 on the 24 grid, stroke="currentColor",
 *     fill="none", strokeLinecap/strokeLinejoin "round".
 *   - Filled icons (play): fill="currentColor", no stroke.
 *   - Color is always currentColor — the icon inherits the text color.
 *   - Default rendered size: 20 (a 20/24 dp grid); pass `size` to override.
 *
 * ACCESSIBILITY:
 *   - Decorative by default (aria-hidden). Pass `title` to make an icon
 *     meaningful: it becomes role="img" with an <title> + aria-label, and is no
 *     longer hidden from assistive tech.
 *
 * GEOMETRY:
 *   Each glyph was re-drawn faithfully from its previous inline form onto the
 *   24×24 viewBox (coordinates scaled from the original 14/16/36/48 boxes), so
 *   the visual does not regress. See per-glyph notes in GLYPHS below.
 *
 * This is a server-safe module (no "use client"): all icons are pure SVG. The
 * animated ResultIcon uses inline transition styles that the global
 * reduced-motion rule (globals.css: transition-duration 0.01ms !important)
 * collapses to the end state — exactly as the previous inline icons relied on.
 */

import type { CSSProperties } from "react";

// ── Glyph catalogue ───────────────────────────────────────────────────────────
//
// `kind: "stroke"` → rendered with the shared stroke language (sw 2, round caps).
// `kind: "fill"`   → rendered filled with currentColor.
// `d` is one or more path commands; an array draws multiple <path> elements.

type GlyphKind = "stroke" | "fill";

interface Glyph {
  kind: GlyphKind;
  /** One path string, or several for multi-stroke glyphs. */
  d: string | string[];
}

export type IconName =
  | "check"
  | "cross"
  | "play"
  | "arrow-right"
  | "external-link"
  | "interactive"
  | "empty-doc"
  | "chevron-right"
  | "chevron-left"
  | "reset"
  | "sun"
  | "moon"
  | "menu";

const GLYPHS: Record<IconName, Glyph> = {
  // menu — trois traits. Ajouté pour le repli du header sous 600 px
  // (audit 2026-08-15) : sans glyphe de menu, le cluster de droite n'avait
  // nulle part où se replier.
  menu: { kind: "stroke", d: ["M4 7 H20", "M4 12 H20", "M4 17 H20"] },

  // check — from the animated/static checkmark (orig 16-box "M2.5 8.5L6 12L13.5 4",
  // ×1.5 → 24-box). Single drawn-on stroke; round joints.
  check: { kind: "stroke", d: "M3.75 12.75 L9 18 L20.25 6" },

  // cross — two diagonals (orig 16-box "M4 4L12 12" / "M12 4L4 12", ×1.5 → 24-box).
  cross: { kind: "stroke", d: ["M6 6 L18 18", "M18 6 L6 18"] },

  // play — solid right-pointing triangle (orig 14-box filled "M3 2l9 5-9 5V2z",
  // re-drawn faithfully centered on the 24 grid).
  play: { kind: "fill", d: "M6 4 L20 12 L6 20 Z" },

  // arrow-right — shaft + head (orig 14-box "M3 7h8M8 4l3 3-3 3" sw1.5 → 24-box).
  // The home-card "Ouvrir" direction cue.
  "arrow-right": { kind: "stroke", d: ["M4 12 H19", "M13 6 L19 12 L13 18"] },

  // external-link — box + outbound arrow. Standard 24-box glyph in the shared
  // stroke language (replaces the "↗" text character used at the call sites).
  "external-link": {
    kind: "stroke",
    d: ["M14 5 H19 V10", "M19 5 L11 13", "M18 14 V19 H5 V6 H10"],
  },

  // interactive — the embed sandbox/crosshair hint (orig 36-box: rect 3,3,30,30
  // rx6 + circle r5 + axis ticks "M18 8v3…", ×24/36 → 24-box). Drawn as paths so
  // the whole glyph shares one stroke language.
  interactive: {
    kind: "stroke",
    d: [
      "M6 2 H18 A4 4 0 0 1 22 6 V18 A4 4 0 0 1 18 22 H6 A4 4 0 0 1 2 18 V6 A4 4 0 0 1 6 2 Z",
      "M12 8.5 A3.5 3.5 0 1 1 11.99 8.5 Z",
      "M12 5 V7",
      "M12 17 V19",
      "M5 12 H7",
      "M17 12 H19",
    ],
  },

  // empty-doc — document outline + text rules (orig 48-box: rect 6,8,36,32 rx6 +
  // "M15 18h18M15 24h14M15 30h10", ×0.5 → 24-box). The home empty-state glyph.
  "empty-doc": {
    kind: "stroke",
    d: [
      "M6 3 H18 A3 3 0 0 1 21 6 V18 A3 3 0 0 1 18 21 H6 A3 3 0 0 1 3 18 V6 A3 3 0 0 1 6 3 Z",
      "M7.5 9 H16.5",
      "M7.5 12 H14.5",
      "M7.5 15 H12.5",
    ],
  },

  // chevron-right — breadcrumb separator (replaces the "›" text character).
  "chevron-right": { kind: "stroke", d: "M9 6 L15 12 L9 18" },

  // chevron-left — horizontal mirror of chevron-right (the "‹" direction), for the
  // MotionDiagram transport's step-back control. Same single-stroke caret geometry.
  "chevron-left": { kind: "stroke", d: "M15 6 L9 12 L15 18" },

  // reset — circular replay/restart arrow for the MotionDiagram transport. A ~300°
  // open ring (gap at the top) closed by an arrowhead, so the loop reads as
  // "restart". Drawn on the 24 grid in the shared stroke language.
  reset: {
    kind: "stroke",
    d: [
      "M19.07 7.5 A8 8 0 1 0 20 12",
      "M19.07 7.5 L14.5 7",
      "M19.07 7.5 L19.5 2.5",
    ],
  },

  // sun / moon — the ThemeToggle pair (July-2026 audit F4). Same stroke
  // language: sun = disc + 8 short rays on the 24 grid; moon = a single
  // crescent path (outer arc + inner return arc).
  sun: {
    kind: "stroke",
    d: [
      "M12 8 A4 4 0 1 1 11.99 8",
      "M12 2 V4.5", "M12 19.5 V22", "M2 12 H4.5", "M19.5 12 H22",
      "M4.9 4.9 L6.7 6.7", "M17.3 17.3 L19.1 19.1",
      "M19.1 4.9 L17.3 6.7", "M6.7 17.3 L4.9 19.1",
    ],
  },
  moon: {
    kind: "stroke",
    d: "M20 14.5 A8.5 8.5 0 1 1 9.5 4 A7 7 0 0 0 20 14.5 Z",
  },
};

// ── Shared SVG attribute helpers ───────────────────────────────────────────────

const STROKE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FILL_PROPS = {
  fill: "currentColor",
  stroke: "none",
};

/** Accessibility wiring shared by every icon surface in this module. */
function a11yProps(title?: string) {
  return title
    ? ({ role: "img" as const, "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);
}

// ── Generic Icon ───────────────────────────────────────────────────────────────

export interface IconProps {
  /** Which glyph to render. */
  name: IconName;
  /** Rendered px size (square). Default 20 — the 20/24 dp grid. */
  size?: number;
  className?: string;
  /**
   * Meaningful label. When set, the icon is exposed to assistive tech
   * (role="img" + <title> + aria-label). When omitted, the icon is decorative
   * (aria-hidden).
   */
  title?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 20, className, title, style }: IconProps) {
  const glyph = GLYPHS[name];
  const paths = Array.isArray(glyph.d) ? glyph.d : [glyph.d];
  const props = glyph.kind === "fill" ? FILL_PROPS : STROKE_PROPS;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      {...a11yProps(title)}
    >
      {title ? <title>{title}</title> : null}
      {paths.map((d, i) => (
        <path key={i} d={d} {...props} />
      ))}
    </svg>
  );
}

// ── Named convenience components ────────────────────────────────────────────────
//
// Thin wrappers over <Icon> for the call sites that read more clearly named.
// Each forwards size/className/title.

type NamedIconProps = Omit<IconProps, "name">;

export const CheckIcon = (p: NamedIconProps) => <Icon name="check" {...p} />;
export const CrossIcon = (p: NamedIconProps) => <Icon name="cross" {...p} />;
export const PlayIcon = (p: NamedIconProps) => <Icon name="play" {...p} />;
export const ArrowRightIcon = (p: NamedIconProps) => <Icon name="arrow-right" {...p} />;
export const ExternalLinkIcon = (p: NamedIconProps) => <Icon name="external-link" {...p} />;
export const InteractiveIcon = (p: NamedIconProps) => <Icon name="interactive" {...p} />;
export const EmptyDocIcon = (p: NamedIconProps) => <Icon name="empty-doc" {...p} />;
export const ChevronRightIcon = (p: NamedIconProps) => <Icon name="chevron-right" {...p} />;
export const ChevronLeftIcon = (p: NamedIconProps) => <Icon name="chevron-left" {...p} />;
export const ResetIcon = (p: NamedIconProps) => <Icon name="reset" {...p} />;

// ── ResultIcon — the shared animated correctness indicator ───────────────────────
//
// Replaces the duplicated AnimatedCheckIcon / AnimatedCrossIcon previously inlined
// in BOTH McqItem and CheckpointItem. Preserves their draw-on reveal faithfully:
//
//   - pathLength="1" + strokeDasharray="1" → unit-independent animation.
//   - animate=true: strokeDashoffset transitions 1 → 0 over 300ms
//     (cubic-bezier(0.2, 0, 0, 1)); the incorrect cross staggers its second arm
//     by 150ms for the same sequential draw the originals used.
//   - animate=false: the path renders at its final drawn state (offset 0 with no
//     transition) — instant, no animation.
//   - Reduced motion: the global rule (globals.css) collapses transition-duration
//     to 0.01ms, so even with animate=true the icon snaps to its end state. No
//     special branching is required here, exactly as before.
//
// Geometry is the SAME 24-box check/cross used by the static glyphs above, so the
// animated and summary indicators are visually identical.

const DRAW_TRANSITION = "stroke-dashoffset 300ms cubic-bezier(0.2, 0, 0, 1)";
const DRAW_TRANSITION_STAGGERED = "stroke-dashoffset 300ms 150ms cubic-bezier(0.2, 0, 0, 1)";

export type ResultKind = "correct" | "incorrect";

export interface ResultIconProps {
  /** "correct" draws the check; "incorrect" draws the cross. */
  kind: ResultKind;
  /** When true, the path strokes on over 300ms; when false it renders drawn. */
  animate?: boolean;
  /** Rendered px size (square). Default 20 — the shared dp grid. */
  size?: number;
  className?: string;
  /** Optional meaningful label (otherwise decorative / aria-hidden). */
  title?: string;
}

function drawStyle(animate: boolean, transition: string): CSSProperties {
  return {
    strokeDasharray: 1,
    strokeDashoffset: animate ? 0 : 1,
    transition: animate ? transition : "none",
  };
}

export function ResultIcon({
  kind,
  animate = false,
  size = 20,
  className,
  title,
}: ResultIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...a11yProps(title)}
    >
      {title ? <title>{title}</title> : null}
      {kind === "correct" ? (
        <path
          d="M3.75 12.75 L9 18 L20.25 6"
          {...STROKE_PROPS}
          pathLength={1}
          style={drawStyle(animate, DRAW_TRANSITION)}
        />
      ) : (
        <>
          <path
            d="M6 6 L18 18"
            {...STROKE_PROPS}
            pathLength={1}
            style={drawStyle(animate, DRAW_TRANSITION)}
          />
          <path
            d="M18 6 L6 18"
            {...STROKE_PROPS}
            pathLength={1}
            style={drawStyle(animate, DRAW_TRANSITION_STAGGERED)}
          />
        </>
      )}
    </svg>
  );
}
