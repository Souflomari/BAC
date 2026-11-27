/**
 * Math module for `lecture-Ve-courbe-dosage` (pc/reactions-acido-basiques,
 * rung R10) — docs/design/INTERACTIVE-FIGURE-SPEC.md. PAYS the manipulation
 * debt spec-extension.md wrote for this rung: "[[embed:lecture-Ve-courbe-
 * dosage]] — courbe de dosage sur laquelle l'élève place un curseur pour
 * lire V_E ; feedback si l'élève vise pH = 7 (AB-EQU-1) ou la demi-
 * équivalence (AB-EQU-3)." This module — plus the bound elements now
 * authored inside the SVG's step-4 group — makes the STAGED figure itself
 * the manipulable, not a static stand-in for one.
 *
 * THE CURVE IS THE DRAWN CURVE, NOT A SUBSTITUTE FORMULA. The three cubic
 * Bézier segments below are copied VERBATIM from
 * content/pc/reactions-acido-basiques/media/lecture-Ve-courbe-dosage.svg's
 * step-2 path:
 *   M90,253.6
 *   C123.3,246.9 193.3,239.9 240,223.2
 *   C286.7,206.5 360,200.7 390,164
 *   C420,127.3 550,116.2 590,111.2
 * — i.e. 3 segments sharing the SAME 4 anchor points as
 * equivalence-methode-tangentes.svg / zone-virage-sur-saut.svg (the SVG's
 * own header note). f(V) below EVALUATES this exact path (solving x(t)=x
 * by bisection, then reading y(t)) rather than fitting/substituting an
 * analytic titration formula that could visibly diverge from the drawing —
 * the whole point of "coded, not generated" for this figure (AB-EQU-1 /
 * AB-EQU-3 depend on the EXACT shape of the saut, not a lookalike curve).
 *
 * Coordinate mapping (same as the SVG header, and the same frame as
 * equivalence-methode-tangentes.svg / zone-virage-sur-saut.svg):
 *   x(V)  = 90 + 20·V     ⇒  V  = (x − 90) / 20
 *   y(pH) = 300 − 16·pH   ⇒  pH = (300 − y) / 16
 *
 * MONOTONICITY (proved, not assumed — this is what makes the bisection
 * below safe). For a cubic Bézier B(t) with control values c0..c3,
 * B'(t) = 3[(c1−c0)(1−t)² + 2(c2−c1)t(1−t) + (c3−c2)t²]; since (1−t)²,
 * t(1−t) and t² are all ≥ 0 on [0,1], B is monotonic whenever the sequence
 * c0..c3 is monotonic. Each segment's x-controls are strictly increasing
 * (e.g. segment 2: 240 < 286.7 < 360 < 390) ⇒ x(t) strictly increasing on
 * every segment ⇒ bisection on x has a unique root. Each segment's
 * y-controls are strictly DEcreasing (e.g. segment 2: 223.2 > 206.5 >
 * 200.7 > 164) ⇒ pH = f(V) is strictly increasing over the whole domain —
 * the physically correct shape for a titration curve (pH never runs
 * backwards as titrant is added).
 *
 * The three segment boundaries are themselves the lesson's own landmark
 * values, and come out EXACT (t=0 or t=1 — no bisection error there):
 *   V=0    -> pH=(300-253.6)/16 = 2,9
 *   V=7,5  -> pH=(300-223.2)/16 = 4,8  = pKA  (demi-équivalence, R10)
 *   V=15,0 -> pH=(300-164)/16   = 8,5  = pH_E (équivalence, R10)
 *   V=25   -> pH=(300-111.2)/16 = 11,8
 * — matching the lesson's own worked numbers exactly, which confirms the
 * SVG's anchors were chosen deliberately, not just visually.
 *
 * Domain [0 ; 25] mL is the FULL drawn curve (step-2's path runs x:90→590,
 * i.e. V:0→25 mL) — never narrower than what's on screen. Step 0,1 mL
 * lands on every one-decimal V in the domain, in particular EXACTLY on
 * V_E/2 = 7,5 and V_E = 15,0 (both exact multiples of the step from V=0) —
 * the lesson's two required landings (docs/design/INTERACTIVE-FIGURE-
 * SPEC.md §2.1) — and also on V=13,3, the x=356 px point where the static
 * SVG (step-3) already places its "pH = 7, AVANT le saut" marker: f(13,3)
 * ≈ 6,97 here (rounds to 7,0 at the lesson's one-decimal precision — the
 * static point was hand-placed via an approximate t≈0,72, per the SVG's
 * own header comment; the exact root of f(V)=7,000 sits at V≈13,36 mL,
 * ~0,06 mL away, negligible at this scale — both readings sit well before
 * V_E, which is the only thing AB-EQU-1 needs). `initial` = 7,5 = V_E/2
 * (interactive.json).
 *
 * NEVER "équivalence" at the pH≈7 point. `verdict()` below is the ONLY
 * place any qualitative word appears — it is read exclusively by
 * readoutTemplate's `{verdict}` token, never bound to the SVG's own
 * #lecture-v-valeur / #lecture-ph-valeur (which stay numeric always, see
 * `vValeur`/`phValeur`). It says "demi-équivalence : pH = pKA" exactly at
 * V=V_E/2, "équivalence" exactly at V=V_E, and the empty string everywhere
 * else — in particular at V=13,3 (AB-EQU-1 is exactly the claim this must
 * never make).
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 90;
const X_SCALE = 20;
const Y0 = 300;
const Y_SCALE = 16;

const VE = 15.0;
const VE_HALF = VE / 2; // 7.5
const EPS = 1e-6;

const DOMAIN: [number, number] = [0, 25];

type Point = [number, number];
type Segment = { p0: Point; c1: Point; c2: Point; p1: Point; vMin: number; vMax: number };

function vOfX(x: number): number {
  return (x - X0) / X_SCALE;
}

// Copied verbatim from lecture-Ve-courbe-dosage.svg's step-2 `d` attribute —
// the ONE source for this curve; nothing here is re-derived independently.
const SEGMENTS: Segment[] = [
  { p0: [90, 253.6], c1: [123.3, 246.9], c2: [193.3, 239.9], p1: [240, 223.2], vMin: vOfX(90), vMax: vOfX(240) },
  { p0: [240, 223.2], c1: [286.7, 206.5], c2: [360, 200.7], p1: [390, 164], vMin: vOfX(240), vMax: vOfX(390) },
  { p0: [390, 164], c1: [420, 127.3], c2: [550, 116.2], p1: [590, 111.2], vMin: vOfX(390), vMax: vOfX(590) },
];

function bezierAxis(seg: Segment, t: number, axis: 0 | 1): number {
  const u = 1 - t;
  const p0 = seg.p0[axis];
  const c1 = seg.c1[axis];
  const c2 = seg.c2[axis];
  const p1 = seg.p1[axis];
  return u * u * u * p0 + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * p1;
}

function segmentForV(V: number): Segment {
  for (const seg of SEGMENTS) {
    if (V <= seg.vMax + EPS) return seg;
  }
  return SEGMENTS[SEGMENTS.length - 1];
}

/** x(t) is strictly increasing on every segment (proved in the file header)
 * — bisection is safe and converges to the unique root. */
function solveTForX(seg: Segment, targetX: number): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const x = bezierAxis(seg, mid, 0);
    if (x < targetX) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function xFromV(V: number): number {
  return X0 + X_SCALE * V;
}

/** pH = f(V), read directly off the drawn Bézier curve — see file header
 * ("THE CURVE IS THE DRAWN CURVE, NOT A SUBSTITUTE FORMULA"). */
function f(V: number): number {
  const clamped = Math.min(Math.max(V, DOMAIN[0]), DOMAIN[1]);
  const targetX = xFromV(clamped);
  const seg = segmentForV(clamped);
  const t = solveTForX(seg, targetX);
  const y = bezierAxis(seg, t, 1);
  return (Y0 - y) / Y_SCALE;
}

function toSvgPoint(dataX: number, dataY: number): { x: number; y: number } {
  return { x: X0 + X_SCALE * dataX, y: Y0 - Y_SCALE * dataY };
}

function toDataX(svgX: number): number {
  const V = (svgX - X0) / X_SCALE;
  return Math.min(Math.max(V, DOMAIN[0]), DOMAIN[1]);
}

function roundPx(n: number): number {
  return Math.round(n * 100) / 100;
}

/** French decimal comma, ALWAYS one decimal (never trimmed) — matches the
 * lesson's own notation (V_E = 15,0 mL, pH_E ≈ 8,5), unlike tangente-
 * derivee's trimmed formatFr (this figure never shows an integer-looking
 * "15" where the lesson writes "15,0"). */
function formatFr(n: number): string {
  return n.toFixed(1).replace(".", ",");
}

function point(V: number): RecomputeResult {
  const p = toSvgPoint(V, f(V));
  return { kind: "point", x: roundPx(p.x), y: roundPx(p.y) };
}

function guideVertical(V: number): RecomputeResult {
  const p = toSvgPoint(V, f(V));
  const x = roundPx(p.x);
  const y = roundPx(p.y);
  return { kind: "path", d: `M${x},${y} L${x},${Y0}` };
}

function guideHorizontal(V: number): RecomputeResult {
  const p = toSvgPoint(V, f(V));
  const x = roundPx(p.x);
  const y = roundPx(p.y);
  return { kind: "path", d: `M${X0},${y} L${x},${y}` };
}

/** Bare number for the SVG's #lecture-v-valeur tspan ("V = <7,5> mL" — the
 * surrounding "V = " / " mL" text is static). Same format as formatValue,
 * exposed here as a named recompute key because bindings always resolve
 * through `model.recompute[...]` (useInteractiveFigure.ts). */
function vValeur(V: number): RecomputeResult {
  return { kind: "text", value: formatFr(V) };
}

/** Bare number for the SVG's #lecture-ph-valeur tspan ("pH = <4,8>") —
 * reused by readoutTemplate's {phValeur} token (same convention as
 * distribution-curseur-pH's pctAH/pctA: one function, bound in the SVG AND
 * referenced in the template). */
function phValeur(V: number): RecomputeResult {
  return { kind: "text", value: formatFr(f(V)) };
}

/** Readout-only (never bound to an SVG element — see file header "NEVER
 * 'équivalence' at the pH≈7 point"): the ONLY place a qualitative word can
 * appear, and only exactly at V_E/2 and V_E. */
function verdict(V: number): RecomputeResult {
  if (Math.abs(V - VE_HALF) < EPS) return { kind: "text", value: " — demi-équivalence : pH = pKA" };
  if (Math.abs(V - VE) < EPS) return { kind: "text", value: " — équivalence" };
  return { kind: "text", value: "" };
}

export const lectureVeCourbeDosage: InteractiveFigureModel = {
  domain: DOMAIN,
  toSvgPoint,
  toDataX,
  f,
  recompute: {
    point,
    pointHalo: point,
    guideVertical,
    guideHorizontal,
    vValeur,
    phValeur,
    verdict,
  },
  formatValue: formatFr,
};
