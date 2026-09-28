/**
 * Math module for the `asymptotes` pilot (docs/design/INTERACTIVE-FIGURE-SPEC.md).
 * Mirrors the coordinate mapping authored in
 * content/maths/limites-continuite/media/asymptotes.svg exactly:
 * px_x(x) = 90 + (x+2)·67.5, px_y(y) = 340 - (y+4)·25.
 *
 * Curriculum-safety note (pedagogy-architect sign-off, 2026-07): this
 * lesson teaches limits and asymptotes PURELY intuitively/graphically —
 * "on peut rendre f(x) aussi proche qu'on veut de L... Pas de piège, pas
 * de formalisme caché." The R0 hook already hands the student a table of
 * converging values (1,9 / 1,99 / 1,999 → 2); this interactive is a LIVE
 * version of that same table, nothing more. The interaction direction must
 * stay "x → gap" (drag x, OBSERVE the gap shrink) and never "gap → x"
 * (pick a tolerance, hunt for x) — the second is ε/δ and is explicitly
 * out of scope. Every French string this module produces is descriptive
 * ("écart", "se rapproche") — never ε, δ, "tolérance", "seuil", or any
 * quantifier ("pour tout... il existe").
 *
 * The draggable point stays on the RIGHT branch (x > 2) — domain
 * [2.2, 6.0] — where f is always > 2, so the "gap" to the horizontal
 * asymptote y=2 is always f(x)-2 (never needs an absolute value sign
 * shown to the student, though the code takes Math.abs defensively).
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 90;
const X_SHIFT = 2;
const X_SCALE = 67.5;
const Y0 = 340;
const Y_SHIFT = 4;
const Y_SCALE = 25;

const DOMAIN: [number, number] = [2.2, 6.0];

function toSvgPoint(x: number, y: number): { x: number; y: number } {
  return { x: X0 + (x + X_SHIFT) * X_SCALE, y: Y0 - (y + Y_SHIFT) * Y_SCALE };
}

function toDataX(svgX: number): number {
  const x = (svgX - X0) / X_SCALE - X_SHIFT;
  return Math.min(Math.max(x, DOMAIN[0]), DOMAIN[1]);
}

function f(x: number): number {
  return 2 + 1 / (x - 2);
}

function roundPx(v: number): number {
  return Math.round(v * 100) / 100;
}

function formatFr(v: number): string {
  const fixed = v.toFixed(2);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return trimmed.replace(".", ",");
}

function point(x: number): RecomputeResult {
  const p = toSvgPoint(x, f(x));
  return { kind: "point", x: roundPx(p.x), y: roundPx(p.y) };
}

/**
 * A dashed vertical guide from the point down to the x-axis — it crosses
 * the already-drawn horizontal asymptote (y=2) on the way, so the shrinking
 * portion ABOVE that line IS the gap, visually, without a second element.
 */
function guideX(x: number): RecomputeResult {
  const top = toSvgPoint(x, f(x));
  const axisY = toSvgPoint(x, 0).y;
  return { kind: "path", d: `M${roundPx(top.x)},${roundPx(top.y)} L${roundPx(top.x)},${roundPx(axisY)}` };
}

function labelXPos(x: number): RecomputeResult {
  const svgX = roundPx(toSvgPoint(x, 0).x);
  return { kind: "point", x: svgX, y: 254 };
}

function labelXText(x: number): RecomputeResult {
  return { kind: "text", value: `x = ${formatFr(x)}` };
}

/** Readout-only (not bound to any SVG element) — the numeric half of the
 * gap story, substituted into readoutTemplate by name. */
function fValue(x: number): RecomputeResult {
  return { kind: "text", value: formatFr(f(x)) };
}

function gapValue(x: number): RecomputeResult {
  return { kind: "text", value: formatFr(Math.abs(f(x) - 2)) };
}

export const asymptotes: InteractiveFigureModel = {
  domain: DOMAIN,
  toSvgPoint,
  toDataX,
  f,
  recompute: {
    point,
    pointHalo: point,
    guideX,
    labelXPos,
    labelXText,
    fValue,
    gapValue,
  },
  formatValue: formatFr,
};
