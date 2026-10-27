/**
 * Math module for the `tangente-derivee` pilot (docs/design/INTERACTIVE-FIGURE-SPEC.md).
 * Mirrors the coordinate mapping authored in
 * content/maths/derivabilite-etude-fonctions/media/tangente-derivee.svg exactly
 * (x_px = 90 + 100·t, y_px = 340 - 15·d, d = t²) — this is the ONE source for
 * that mapping; the static SVG's own authored coordinates at t=2 were derived
 * from these same constants, not independently guessed.
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 90;
const X_SCALE = 100;
const Y0 = 340;
const Y_SCALE = 15;

const DOMAIN: [number, number] = [0.3, 4.0];

function toSvgPoint(t: number, d: number): { x: number; y: number } {
  return { x: X0 + X_SCALE * t, y: Y0 - Y_SCALE * d };
}

/** Rounds a pixel coordinate to keep the DOM's `d`/x/y attributes tidy —
 * cosmetic only, well under any visually-perceptible tolerance. */
function roundPx(n: number): number {
  return Math.round(n * 100) / 100;
}

function toDataX(svgX: number): number {
  const t = (svgX - X0) / X_SCALE;
  return Math.min(Math.max(t, DOMAIN[0]), DOMAIN[1]);
}

function f(t: number): number {
  return t * t;
}

function fPrime(t: number): number {
  return 2 * t;
}

// The panel's plottable interior in SVG px — just inside the drawn axis lines
// and arrowheads (axis spans x∈[90,585], y∈[45,400]) — so the clipped tangent
// never overruns the drawn axes at any point in `domain`.
const PANEL = { xMin: 95, xMax: 580, yMin: 50, yMax: 395 };

/**
 * Clips the infinite tangent line (through `anchor`, pixel-space slope
 * `slopePx`) to the panel interior. The original static SVG only ever drew
 * ONE fixed case (a=2) and could hand-pick a pleasing shorter segment; the
 * interactive version must handle any `t` in `domain`, so the segment is
 * derived by intersecting the line with all four panel edges and keeping the
 * two intersections that actually fall on the box.
 */
function clipLineToPanel(
  anchor: { x: number; y: number },
  slopePx: number
): { x1: number; y1: number; x2: number; y2: number } {
  const yAt = (x: number) => anchor.y + slopePx * (x - anchor.x);
  const xAt = (y: number) => anchor.x + (y - anchor.y) / slopePx;
  const candidates: { x: number; y: number }[] = [];

  const yAtXMin = yAt(PANEL.xMin);
  if (yAtXMin >= PANEL.yMin && yAtXMin <= PANEL.yMax) candidates.push({ x: PANEL.xMin, y: yAtXMin });
  const yAtXMax = yAt(PANEL.xMax);
  if (yAtXMax >= PANEL.yMin && yAtXMax <= PANEL.yMax) candidates.push({ x: PANEL.xMax, y: yAtXMax });
  const xAtYMin = xAt(PANEL.yMin);
  if (xAtYMin >= PANEL.xMin && xAtYMin <= PANEL.xMax) candidates.push({ x: xAtYMin, y: PANEL.yMin });
  const xAtYMax = xAt(PANEL.yMax);
  if (xAtYMax >= PANEL.xMin && xAtYMax <= PANEL.xMax) candidates.push({ x: xAtYMax, y: PANEL.yMax });

  candidates.sort((a, b) => a.x - b.x);
  const start = candidates[0] ?? anchor;
  const end = candidates[candidates.length - 1] ?? anchor;
  return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
}

/** French decimal comma, no trailing zeros — never a raw toString(). */
function formatFr(n: number): string {
  const fixed = n.toFixed(2);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return trimmed.replace(".", ",");
}

// Point A's label sits at a fixed pixel offset from the point (the static
// SVG's own authored a=2 case: label at (283,252), point at (290,280) —
// dx=-7, dy=-28). Safe across all of `domain`: the panel interior keeps the
// offset label on-canvas at both ends (t=0.3 and t=4.0).
const LABEL_A_OFFSET = { dx: -7, dy: -28 };
const REPERE_LABEL_Y = 357;
const REPERE_DASH_TOP_Y = 283;
const REPERE_DASH_BOTTOM_Y = 335;
const REPERE_TICK_BOTTOM_Y = 345;

function point(t: number): RecomputeResult {
  const p = toSvgPoint(t, f(t));
  return { kind: "point", x: roundPx(p.x), y: roundPx(p.y) };
}

function labelAPos(t: number): RecomputeResult {
  const p = toSvgPoint(t, f(t));
  return { kind: "point", x: roundPx(p.x + LABEL_A_OFFSET.dx), y: roundPx(p.y + LABEL_A_OFFSET.dy) };
}

function labelAText(t: number): RecomputeResult {
  return { kind: "text", value: `A(${formatFr(t)} ; ${formatFr(f(t))})` };
}

function repereDash(t: number): RecomputeResult {
  const x = roundPx(toSvgPoint(t, 0).x);
  return { kind: "path", d: `M${x},${REPERE_DASH_TOP_Y} L${x},${REPERE_DASH_BOTTOM_Y}` };
}

function repereTick(t: number): RecomputeResult {
  const x = roundPx(toSvgPoint(t, 0).x);
  return { kind: "path", d: `M${x},${REPERE_DASH_BOTTOM_Y} L${x},${REPERE_TICK_BOTTOM_Y}` };
}

function repereLabelPos(t: number): RecomputeResult {
  const x = roundPx(toSvgPoint(t, 0).x);
  return { kind: "point", x, y: REPERE_LABEL_Y };
}

function repereLabelText(t: number): RecomputeResult {
  return { kind: "text", value: formatFr(t) };
}

function tangentPath(t: number): RecomputeResult {
  const anchor = toSvgPoint(t, f(t));
  const slopePx = (-Y_SCALE * fPrime(t)) / X_SCALE;
  const { x1, y1, x2, y2 } = clipLineToPanel(anchor, slopePx);
  return {
    kind: "path",
    d: `M${roundPx(x1)},${roundPx(y1)} L${roundPx(x2)},${roundPx(y2)}`,
  };
}

function equationLabel(t: number): RecomputeResult {
  return { kind: "text", value: `T : d = ${formatFr(fPrime(t))}t − ${formatFr(f(t))}` };
}

function slopeLabel(t: number): RecomputeResult {
  return { kind: "text", value: `pente = d′(${formatFr(t)}) = ${formatFr(fPrime(t))}` };
}

export const tangenteDerivee: InteractiveFigureModel = {
  domain: DOMAIN,
  toSvgPoint,
  toDataX,
  f,
  fPrime,
  recompute: {
    point,
    pointHalo: point,
    labelAPos,
    labelAText,
    repereDash,
    repereTick,
    repereLabelPos,
    repereLabelText,
    tangentPath,
    equationLabel,
    slopeLabel,
  },
  formatValue: formatFr,
};
