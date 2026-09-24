/**
 * Math module for the `aire-sous-courbe` pilot (docs/design/INTERACTIVE-FIGURE-SPEC.md).
 * Mirrors the coordinate mapping authored in
 * content/maths/calcul-integral/media/aire-sous-courbe.svg exactly
 * (x_px = 80 + 150·t, y_px = 350 - 60·v, v = t²).
 *
 * Design note: the static original showed a Riemann-sum ("rectangle count n")
 * technique was considered for this pilot, but this lesson's own rung list
 * (R0-R9) never introduces Riemann sums/partitions — the area-integral link
 * is ADMITTED directly (R1: "on admet... le fait suivant"), never derived via
 * a limit of sums. Building a rectangle-convergence interactive would
 * introduce machinery this lesson doesn't teach (the same category of risk
 * flagged for the asymptotes pilot). Instead, the manipulable control is the
 * upper bound b itself: dragging it re-proves the R1 worked computation
 * (aire(b) = b³/3) for any b, landing exactly on the taught 8/3 at b=2 —
 * staying entirely inside what R1 already established.
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 80;
const X_SCALE = 150;
const Y0 = 350;
const Y_SCALE = 60;

// b = 2.0 is the lesson's own worked example (the R0/R1 car, distance in
// meters) and also the visual ceiling: y(t) = 350 - 60t² must stay within
// the panel (arrow tip at y≈50) — y(2.0) = 110, comfortably inside; the
// figure's own decorative curve extension beyond b (unmodified, still
// authored 2.0→2.2) needs that headroom too.
const DOMAIN: [number, number] = [0.3, 2.0];

function toSvgPoint(t: number, v: number): { x: number; y: number } {
  return { x: X0 + X_SCALE * t, y: Y0 - Y_SCALE * v };
}

function toDataX(svgX: number): number {
  const t = (svgX - X0) / X_SCALE;
  return Math.min(Math.max(t, DOMAIN[0]), DOMAIN[1]);
}

function f(t: number): number {
  return t * t;
}

function formatFr(n: number): string {
  const fixed = n.toFixed(2);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return trimmed.replace(".", ",");
}

/** Rounds a pixel coordinate to keep the DOM's `d`/x/y attributes tidy. */
function roundPx(n: number): number {
  return Math.round(n * 100) / 100;
}

function point(b: number): RecomputeResult {
  const p = toSvgPoint(b, f(b));
  return { kind: "point", x: roundPx(p.x), y: roundPx(p.y) };
}

const REGION_SAMPLES = 24;

/**
 * Regenerates the ENTIRE shaded region (top border along the curve, right
 * edge at t=b, baseline back to the origin) for any b — the static
 * original only ever had to draw ONE fixed case (b=2); this is a fixed-
 * count resampling (not the original's 0.1-step absolute spacing), so the
 * exact point count differs from the authored file, but it traces the same
 * v=t² exactly and closes on the same baseline.
 */
function regionPath(b: number): RecomputeResult {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= REGION_SAMPLES; i++) {
    const t = (b * i) / REGION_SAMPLES;
    points.push(toSvgPoint(t, f(t)));
  }
  const [first, ...rest] = points;
  const tail = rest.map((p) => `L${roundPx(p.x)},${roundPx(p.y)}`).join(" ");
  const last = points[points.length - 1];
  const d = `M${roundPx(first.x)},${roundPx(first.y)} ${tail} L${roundPx(last.x)},${Y0} Z`;
  return { kind: "path", d };
}

function boundLabelPos(b: number): RecomputeResult {
  const x = roundPx(toSvgPoint(b, 0).x);
  return { kind: "point", x, y: 366 };
}

function boundLabelText(b: number): RecomputeResult {
  return { kind: "text", value: `b = ${formatFr(b)}` };
}

function formuleBorne(b: number): RecomputeResult {
  return { kind: "text", value: `sur [0 ; ${formatFr(b)}]` };
}

function formuleValeur(b: number): RecomputeResult {
  return { kind: "text", value: `≈ ${formatFr((b * b * b) / 3)} m` };
}

export const aireSousCourbe: InteractiveFigureModel = {
  domain: DOMAIN,
  toSvgPoint,
  toDataX,
  f,
  recompute: {
    point,
    pointHalo: point,
    regionPath,
    boundLabelPos,
    boundLabelText,
    formuleBorne,
    formuleValeur,
  },
  formatValue: formatFr,
};
