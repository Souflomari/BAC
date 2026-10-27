/**
 * Math module for the `suite-escalier` pilot (docs/design/INTERACTIVE-FIGURE-SPEC.md).
 * Mirrors the coordinate mapping authored in
 * content/maths/suites-numeriques/media/suite-escalier.svg exactly
 * (x_px = 100 + 4·x, y_px = 480 - 4·y). Drag the starting point u0 along
 * the abscissa axis; the cobweb (staircase) construction regenerates for
 * K=5 iterations, always converging toward the SAME fixed point ℓ=20 —
 * the whole point of the R8 "Fermeture de l'arc" resolution the lesson
 * just taught: ℓ does not depend on u0.
 *
 * Companion file `escalier-pas-a-pas.motion.json`/`.motion.svg` (the
 * already-shipped step-by-step animation of this SAME reservoir example,
 * u0=100 baked into its own captions) is a SEPARATE asset with its own
 * element-id namespace — untouched by this pilot.
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 100;
const SCALE = 4;
const Y0 = 480;

const DOMAIN: [number, number] = [10, 100];
const ITERATIONS = 5;

function toSvgPoint(x: number, y: number): { x: number; y: number } {
  return { x: X0 + SCALE * x, y: Y0 - SCALE * y };
}

function toDataX(svgX: number): number {
  const x = (svgX - X0) / SCALE;
  return Math.min(Math.max(x, DOMAIN[0]), DOMAIN[1]);
}

function f(x: number): number {
  return 0.5 * x + 10;
}

function roundPx(v: number): number {
  return Math.round(v * 100) / 100;
}

function formatFr(v: number): string {
  const fixed = v.toFixed(2);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return trimmed.replace(".", ",");
}

/** u0, u1, ..., u_ITERATIONS. */
function sequence(u0: number): number[] {
  const us = [u0];
  for (let i = 0; i < ITERATIONS; i++) us.push(f(us[i]));
  return us;
}

function point(u0: number): RecomputeResult {
  const p = toSvgPoint(u0, 0);
  return { kind: "point", x: roundPx(p.x), y: roundPx(p.y) };
}

/**
 * The cobweb path: start on the axis, then alternate vertical (apply f)
 * and horizontal (carry the value onto y=x) segments, ITERATIONS times —
 * 2·ITERATIONS+1 points, matching the static original's exact 11-point
 * structure (ITERATIONS=5) at u0=100.
 */
function cobwebPath(u0: number): RecomputeResult {
  const us = sequence(u0);
  const points: { x: number; y: number }[] = [toSvgPoint(us[0], 0)];
  for (let i = 0; i < ITERATIONS; i++) {
    points.push(toSvgPoint(us[i], us[i + 1]));
    points.push(toSvgPoint(us[i + 1], us[i + 1]));
  }
  const [firstPt, ...rest] = points;
  const tail = rest.map((p) => `L${roundPx(p.x)},${roundPx(p.y)}`).join(" ");
  return { kind: "path", d: `M${roundPx(firstPt.x)},${roundPx(firstPt.y)} ${tail}` };
}

function tickU0Line(u0: number): RecomputeResult {
  const x = roundPx(toSvgPoint(u0, 0).x);
  return { kind: "path", d: `M${x},480 L${x},488` };
}

function labelU0Pos(u0: number): RecomputeResult {
  const x = roundPx(toSvgPoint(u0, 0).x);
  return { kind: "point", x, y: 500 };
}

function labelU0Text(u0: number): RecomputeResult {
  return { kind: "text", value: `u₀ = ${formatFr(u0)}` };
}

export const suiteEscalier: InteractiveFigureModel = {
  domain: DOMAIN,
  toSvgPoint,
  toDataX,
  f,
  recompute: {
    point,
    pointHalo: point,
    cobwebPath,
    tickU0Line,
    labelU0Pos,
    labelU0Text,
  },
  formatValue: formatFr,
};
