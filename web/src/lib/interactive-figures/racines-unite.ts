/**
 * Math module for the `racines-unite` pilot (docs/design/INTERACTIVE-FIGURE-SPEC.md)
 * — the deliberate "fun/quirky" pilot. A slider on n (3..8) redraws the n-th
 * roots of unity as an n-gon inscribed in the unit circle. Mirrors the
 * coordinate mapping authored in
 * content/maths/nombres-complexes-2/media/racines-unite.svg exactly:
 * center O=(320,300), radius R=170px, angle -> px = 320+170·cos(θ),
 * py = 300-170·sin(θ) (y inverted so increasing θ rotates counter-clockwise
 * on screen, matching the math convention).
 *
 * `control.kind` is `"slider"` here, not `"drag-point"` — n is a vertex
 * COUNT, not a position on a curve, so there is no natural point to drag;
 * `toSvgPoint`/`toDataX`/`f` are correctly omitted (types.ts §InteractiveFigureModel).
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const CX = 320;
const CY = 300;
const R = 170;
const DOT_R = 5;

const DOMAIN: [number, number] = [3, 8];

function vertex(k: number, n: number): { x: number; y: number } {
  const theta = (2 * Math.PI * k) / n;
  return { x: CX + R * Math.cos(theta), y: CY - R * Math.sin(theta) };
}

function roundPx(v: number): number {
  return Math.round(v * 100) / 100;
}

function formatFr(v: number): string {
  const fixed = v.toFixed(2);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return trimmed.replace(".", ",");
}

/**
 * n small filled circles (one per root), as a SINGLE path with n
 * circle-subpaths (two 180° arcs each) — avoids needing a fixed-max pool of
 * separately-bound `<circle>` elements with a show/hide capability the
 * shared contract doesn't have (only path/point/text).
 */
function rootsDots(n: number): RecomputeResult {
  const count = Math.round(n);
  const parts: string[] = [];
  for (let k = 0; k < count; k++) {
    const { x, y } = vertex(k, count);
    const cx = roundPx(x);
    const cy = roundPx(y);
    parts.push(
      `M${cx - DOT_R},${cy} a${DOT_R},${DOT_R} 0 1,0 ${2 * DOT_R},0 a${DOT_R},${DOT_R} 0 1,0 ${-2 * DOT_R},0`
    );
  }
  return { kind: "path", d: parts.join(" ") };
}

/** The closed n-gon connecting the roots (edges only, no fill). */
function rootsPolygon(n: number): RecomputeResult {
  const count = Math.round(n);
  const points: string[] = [];
  for (let k = 0; k < count; k++) {
    const { x, y } = vertex(k, count);
    points.push(`${k === 0 ? "M" : "L"}${roundPx(x)},${roundPx(y)}`);
  }
  return { kind: "path", d: `${points.join(" ")} Z` };
}

function formuleN(n: number): RecomputeResult {
  const count = Math.round(n);
  return {
    kind: "text",
    value: `ici, n = ${count} : ${count} racines espacées de 2π/${count}`,
  };
}

export const racinesUnite: InteractiveFigureModel = {
  domain: DOMAIN,
  recompute: {
    rootsDots,
    rootsPolygon,
    formuleN,
  },
  formatValue: formatFr,
};
