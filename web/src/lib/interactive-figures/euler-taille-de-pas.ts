/**
 * Math module for the `euler-taille-de-pas` pilot
 * (docs/design/INTERACTIVE-FIGURE-SPEC.md) — pc/chute-mouvements-plans, R8.
 * A Δt slider recomputes Euler's explicit scheme, EXACTLY as the lesson
 * writes it (lesson.md R8, "La formule centrale"):
 *
 *   v_{i+1} = v_i + a_i·Δt ,  a_i = g − (k/m)·v_i
 *
 * for the SAME bead as R7/R8's worked example: m = 0,20 kg, k = 2,0 kg/s,
 * g ≈ 9,8 m/s², so k/m = 10,0 /s and a_i = 9,8 − 10·v_i. v_0 = 0.
 *
 * Mirrors the coordinate mapping authored in
 * content/pc/chute-mouvements-plans/media/euler-taille-de-pas.svg exactly
 * (origin (t=0, v=0) = (90,320), scale_t = 900 px/s, scale_v = 230 px/(m/s)).
 *
 * `control.kind` is `"slider"` here, not `"drag-point"` — Δt is a step
 * SIZE, not a position on the curve, so there is no point to drag;
 * `toSvgPoint`/`toDataX`/`f` are correctly omitted (same choice as
 * racines-unite.ts, whose control is also a slider with no curve position).
 *
 * ── The comparison window ──────────────────────────────────────────────
 * WINDOW_TARGET = 0,30 s is the SAME reference instant the static original
 * verified by hand in its own header comment ("Vérification qualitative à
 * t=0,30 s"). For every Δt in the domain, N = round(0,30 / Δt) steps are
 * taken and the actually-reached instant is t_end = N·Δt — for the two
 * values the static figure drew fixed (Δt = 0,05 s → N=6, Δt = 0,02 s →
 * N=15) this lands EXACTLY on t_end = 0,30 s, so the live curve overlays
 * the two static reference lines exactly at those two slider positions;
 * for a Δt that doesn't divide 0,30 s evenly (only Δt = 0,04 s in this
 * domain), t_end drifts slightly (0,32 s) rather than being forced —
 * consistent with "the end of the plotted window" rather than a fixed
 * instant that would misrepresent what was actually stepped through.
 *
 * ── The true-curve comparison value ────────────────────────────────────
 * v_true(t) = v_lim·(1 − e^(−t/τ)) is used ONLY internally, to compute the
 * numeric comparison shown in #label-comparaison — it is NEVER displayed
 * as a formula anywhere (the lesson's own "limite du cadre" for R7 never
 * derives this closed form in the text, and the static original's true
 * curve is drawn as a graphical reference only, same discipline here).
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 90;
const SCALE_T = 900;
const Y0 = 320;
const SCALE_V = 230;

const G = 9.8; // m/s^2
const K_OVER_M = 10.0; // k/m = 2,0 / 0,20, in /s
const V_LIM = 0.98; // m/s — mg/k, established in R7's worked example
const TAU = 0.1; // s — m/k, established in R7's worked example
const WINDOW_TARGET = 0.3; // s — the static original's own verification instant

const DOMAIN: [number, number] = [0.01, 0.05];

function roundPx(n: number): number {
  return Math.round(n * 100) / 100;
}

/** French decimal comma, no trailing zeros — for Δt and t (2 dp, trimmed). */
function formatFr(n: number): string {
  const fixed = n.toFixed(2);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return trimmed.replace(".", ",");
}

/** French decimal comma, fixed 3 dp — for the velocity comparison values,
 * where a trimmed format would make close-but-different Euler/true values
 * (the whole point of CH-EU-1) look coincidentally identical. */
function formatV(n: number): string {
  return n.toFixed(3).replace(".", ",");
}

function toSvgPoint(t: number, v: number): { x: number; y: number } {
  return { x: X0 + SCALE_T * t, y: Y0 - SCALE_V * v };
}

/**
 * Euler's explicit scheme, exactly as R8 states it: v_{i+1} = v_i + a_i·Δt,
 * a_i = g − (k/m)·v_i — carried at full float precision step to step (never
 * re-rounding an intermediate v_i before using it, the same discipline the
 * lesson's own R8 worked table follows: its DISPLAYED v_i/a_i are rounded,
 * but the next row's v_{i+1} is computed from the unrounded value, e.g. row
 * 4's v_{i+1}=0,579 comes from 0,478 + (9,8−10×0,47824)×0,02, not from the
 * rounded 0,478).
 */
function eulerSequence(dt: number): { ts: number[]; vs: number[] } {
  const steps = Math.max(1, Math.round(WINDOW_TARGET / dt));
  const ts: number[] = [0];
  const vs: number[] = [0];
  for (let i = 0; i < steps; i++) {
    const a = G - K_OVER_M * vs[i];
    vs.push(vs[i] + a * dt);
    ts.push((i + 1) * dt);
  }
  return { ts, vs };
}

/** The "true" curve's value at t — internal use only (§ file header: never
 * displayed as a formula, only as a numeric comparison). */
function trueValue(t: number): number {
  return V_LIM * (1 - Math.exp(-t / TAU));
}

function eulerPath(dt: number): RecomputeResult {
  const { ts, vs } = eulerSequence(dt);
  const d = ts
    .map((t, i) => {
      const p = toSvgPoint(t, vs[i]);
      return `${i === 0 ? "M" : "L"}${roundPx(p.x)},${roundPx(p.y)}`;
    })
    .join(" ");
  return { kind: "path", d };
}

const MARKER_R = 3;

/** One small diamond per Euler point, as a single combined path (multiple
 * closed subpaths) — same technique as racines-unite.ts's rootsDots, kept
 * to a shape distinct from the two static references' circles/squares. */
function eulerDots(dt: number): RecomputeResult {
  const { ts, vs } = eulerSequence(dt);
  const d = ts
    .map((t, i) => {
      const p = toSvgPoint(t, vs[i]);
      const cx = roundPx(p.x);
      const cy = roundPx(p.y);
      return `M${cx - MARKER_R},${cy} L${cx},${cy - MARKER_R} L${cx + MARKER_R},${cy} L${cx},${cy + MARKER_R} Z`;
    })
    .join(" ");
  return { kind: "path", d };
}

function labelDt(dt: number): RecomputeResult {
  const { ts } = eulerSequence(dt);
  const tEnd = ts[ts.length - 1];
  return { kind: "text", value: `Δt = ${formatFr(dt)} s — à t = ${formatFr(tEnd)} s` };
}

function labelComparaison(dt: number): RecomputeResult {
  const { ts, vs } = eulerSequence(dt);
  const tEnd = ts[ts.length - 1];
  const vEuler = vs[vs.length - 1];
  const vTrue = trueValue(tEnd);
  const gap = Math.abs(vEuler - vTrue);
  return {
    kind: "text",
    value: `Euler ≈ ${formatV(vEuler)} · vraie ≈ ${formatV(vTrue)} (écart ${formatV(gap)})`,
  };
}

export const eulerTailleDePas: InteractiveFigureModel = {
  domain: DOMAIN,
  recompute: {
    eulerPath,
    eulerDots,
    labelDt,
    labelComparaison,
  },
  formatValue: formatFr,
};
