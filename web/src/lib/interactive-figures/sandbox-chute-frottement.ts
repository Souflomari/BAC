/**
 * Math module for the `sandbox-chute-frottement` figure
 * (docs/design/INTERACTIVE-FIGURE-SPEC.md) — pays the manipulation debt the
 * lesson's own spec-extension.md prescribed as
 * `[[embed:sandbox-chute-frottement]]` (« curseurs m, k ») and the STATIC
 * substitute's header openly named as a substitution. Only `m` is a control
 * here (`k` stays fixed at 2,0 kg/s, matching R7/R8's worked example) —
 * one bound control, per INTERACTIVE-FIGURE-SPEC.md's "bespoke, ONE control"
 * scope (ADR 0017's manipulable split), not a general-purpose sandbox.
 *
 * Mirrors the coordinate mapping authored in
 * content/pc/chute-mouvements-plans/media/sandbox-chute-frottement.svg
 * exactly: origin (t=0, v=0) = (90, 364) px, scale_t = 520 px/s,
 * scale_v = 140 px/(m/s). The reference bead (step-2, m₁ = 0,20 kg, curve
 * `--figure-ink`) is NOT controlled by this module — it stays exactly as
 * authored, fixed, precisely so the comparison against it stays visible as
 * the slider moves the mobile bead's curve.
 *
 * Curve shape: v/v_lim = 1 − e^(−t/τ) — the SAME "recorded experimentally,
 * never derived in the text" shape the static original used (R7 "limite du
 * cadre"; lesson.md line ~494: "on ne la dérive pas analytiquement"). This
 * module only REPLAYS that shape for any m; nothing here derives or labels
 * it as a formula on screen — only τ = m/k and v_lim = mg/k (both given
 * directly in the lesson) ever appear as text.
 *
 * Domain [0,20 ; 0,40] kg, step 0,05 kg (lands on both endpoints exactly):
 * chosen so the domain's own two endpoints ARE the static original's two
 * beads — m=0,20 kg reproduces bead 1 exactly (the mobile curve then
 * coincides with the fixed reference curve, showing "same mass -> same
 * v_lim"), m=0,40 kg reproduces the old "bille 2" exactly (the static
 * figure's own worked comparison, now the slider's initial position). The
 * max is capped at 0,40 kg (not pushed further) because v_lim = mg/k grows
 * linearly with m at fixed k: past ~0,44 kg, v_lim's pixel y would reach
 * the y-axis arrow tip (y=60) and the asymptote would run off the drawn
 * axis — 0,40 kg keeps the asymptote at y≈89,6, ~30 px clear of the tip,
 * without redrawing the axes.
 *
 * French-comma formatting here is FIXED at 2 decimals (0,20 / 0,40 / 1,96),
 * deliberately NOT the trailing-zero-trimming `formatFr` used by the
 * aire-sous-courbe/tangente-derivee pilots (which trims "2,00" to "2") —
 * this figure's quantities are physics constants whose lesson-given
 * precision IS 2 decimals (m₁=0,20 kg, k=2,0 kg/s, v_lim,1=0,98 m/s,
 * lesson.md lines ~480-492), so trimming would read as a different
 * (wrong) number of significant figures than the lesson uses.
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 90;
const T_SCALE = 520;
const Y0 = 364;
const V_SCALE = 140;

const K = 2.0; // kg/s — fixed for both beads, never controlled by this figure
const G = 9.8; // m/s² — g≈9,8, matching R7/R8's worked example

const DOMAIN: [number, number] = [0.2, 0.4];

// Same 11-sample set the static original used to trace the curve.
const S_SAMPLES = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5];

// The static original's asymptote/tick-label line endpoints (x-span only —
// unchanged by the slider).
const ASYMPTOTE_X0 = 90;
const ASYMPTOTE_X1 = 610;
const TICK_LABEL_X = 82;
const TICK_LABEL_DY = 4; // authored offset below the asymptote line

// The mass label sits on the mobile curve at s=3 (t=3τ), + a fixed pixel
// offset — reproduces the static original's authored m₂ label position
// (420, 84) almost exactly at m=0,40 kg (this module's own initial value),
// and stays readable (clear of the fixed bead-1 curve/label) at m=0,20 kg.
const LABEL_MASSE_ANCHOR_S = 3;
const LABEL_MASSE_OFFSET = { dx: 18, dy: -19 };

function tauOf(m: number): number {
  return m / K;
}

function vlimOf(m: number): number {
  return (m * G) / K;
}

/** Data-space (t, v) -> SVG user-space point, using the SAME scale constants
 * authored in the static SVG (single source — never re-derived). */
function curvePoint(s: number, m: number): { x: number; y: number } {
  const tau = tauOf(m);
  const vlim = vlimOf(m);
  const t = s * tau;
  const v = vlim * (1 - Math.exp(-s));
  return { x: X0 + T_SCALE * t, y: Y0 - V_SCALE * v };
}

/** Rounds a pixel coordinate to keep the DOM's `d`/x/y attributes tidy —
 * cosmetic only, well under any visually-perceptible tolerance. */
function roundPx(n: number): number {
  return Math.round(n * 100) / 100;
}

/** French decimal comma, ALWAYS 2 decimals (never trimmed) — see file
 * header for why this figure's quantities need fixed precision. */
function formatFr(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function curvePath(m: number): RecomputeResult {
  const points = S_SAMPLES.map((s) => {
    const p = curvePoint(s, m);
    return { x: roundPx(p.x), y: roundPx(p.y) };
  });
  const [first, ...rest] = points;
  const tail = rest.map((p) => `L${p.x},${p.y}`).join(" ");
  return { kind: "path", d: `M${first.x},${first.y} ${tail}` };
}

function asymptotePath(m: number): RecomputeResult {
  const y = roundPx(Y0 - V_SCALE * vlimOf(m));
  return { kind: "path", d: `M${ASYMPTOTE_X0},${y} L${ASYMPTOTE_X1},${y}` };
}

function vlimTickPos(m: number): RecomputeResult {
  const y = roundPx(Y0 - V_SCALE * vlimOf(m) + TICK_LABEL_DY);
  return { kind: "point", x: TICK_LABEL_X, y };
}

function masseLabelPos(m: number): RecomputeResult {
  const anchor = curvePoint(LABEL_MASSE_ANCHOR_S, m);
  return {
    kind: "point",
    x: roundPx(anchor.x + LABEL_MASSE_OFFSET.dx),
    y: roundPx(anchor.y + LABEL_MASSE_OFFSET.dy),
  };
}

function masseLabelText(m: number): RecomputeResult {
  return { kind: "text", value: `m = ${formatFr(m)} kg` };
}

function lectureText(m: number): RecomputeResult {
  const tau = tauOf(m);
  const vlim = vlimOf(m);
  return {
    kind: "text",
    value: `m = ${formatFr(m)} kg (k inchangé) → τ = m/k = ${formatFr(tau)} s ; v_lim = mg/k = ${formatFr(vlim)} m/s`,
  };
}

/** Readout-only (below-slider live region, InteractiveControl.tsx's
 * `{tau}` token) — not bound to any SVG element (the value already appears,
 * inside a full sentence, via `lectureText`/`#label-lecture`). */
function tau(m: number): RecomputeResult {
  return { kind: "text", value: formatFr(tauOf(m)) };
}

/** Readout-only (`{vlim}` token) — same rationale as `tau` above. */
function vlim(m: number): RecomputeResult {
  return { kind: "text", value: formatFr(vlimOf(m)) };
}

export const sandboxChuteFrottement: InteractiveFigureModel = {
  domain: DOMAIN,
  recompute: {
    curvePath,
    asymptotePath,
    vlimTickPos,
    masseLabelPos,
    masseLabelText,
    lectureText,
    tau,
    vlim,
  },
  formatValue: formatFr,
};
