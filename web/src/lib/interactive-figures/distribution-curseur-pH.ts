/**
 * Math module for the `distribution-curseur-pH` figure (pc/reactions-acido-basiques,
 * rung R8) — docs/design/INTERACTIVE-FIGURE-SPEC.md. This PAYS a written
 * manipulation debt: spec-extension.md prescribed
 * `[[embed:distribution-curseur-pH]]` ("curseur de pH sur l'axe ; les deux
 * pourcentages s'affichent et les deux courbes se remplissent"); a static
 * substitute (three fixed readings) shipped instead. This module — plus the
 * bound elements now authored in the SVG's step-4 group — makes the figure
 * itself the manipulable, not a stand-in for one.
 *
 * `control.kind` is `"slider"`, not `"drag-point"` — there are TWO curves
 * (%AH and %A−), so there is no single natural point to drag; a pH cursor
 * is exactly the `"slider"` case the spec carves out (§2.1: "curseur seul,
 * pas de geste de glisser sur la courbe"), same pattern as racines-unite's
 * vertex count and suite-escalier's n. `toSvgPoint`/`toDataX`/`f`/`fPrime`
 * are correctly omitted (types.ts: optional, drag-point-only).
 *
 * Mirrors the coordinate mapping authored in
 * content/pc/reactions-acido-basiques/media/distribution-curseur-pH.svg
 * exactly:
 *   x(pH) = 70 + 38·pH
 *   y(%)  = 290 − 2·%      (0 % → y=290, 100 % → y=90, 200 px/100 pts)
 * and the same couple/formula as the static original and its sibling
 * diagramme-distribution-vs-predominance.svg — CH3COOH/CH3COO−, pKA = 4,8:
 *   %A− = 100 / (1 + 10^(pKA − pH))
 *   %AH = 100 − %A−
 *
 * Domain [0 ; 14] is the figure's full pH axis (its drawn curves already
 * span it) — chosen deliberately over a narrower window so a student can
 * drag to the extremes and SEE the two "teste l'idée avant de la croire"
 * claims the lesson makes right before this figure: pH ≪ pKA ⇒ %AH → 100,
 * %A− → 0 ; pH ≫ pKA ⇒ the reverse. Step 0,2 lands exactly on pKA = 4,8
 * and on all three worked-example pH values the static readings already
 * show (3,8 / 4,8 / 5,8), so dragging onto any of them reproduces the
 * lesson's own numbers exactly (see the three-position check below).
 *
 * Out of scope, same as the lesson itself (spec-extension.md "HORS-CADRE") :
 * no polyacid / multi-pKA distribution, no buffer-composition (Henderson-
 * Hasselbalch) computation — this cursor only ever READS one couple's two
 * percentages at one pH, never predicts a mixture.
 */

import type { InteractiveFigureModel, RecomputeResult } from "./types";

const X0 = 70;
const X_SCALE = 38;
const Y0 = 290; // 0 %
const Y100 = 90; // 100 %
const PKA = 4.8;

// pKA ± 4 environ : le curseur couvre la bascule et les trois lectures de
// l'exemple travaillé (3,8 · 4,8 · 5,8). Au-delà, la forme minoritaire tombe
// sous le cent-millième et la lecture n'apprendrait plus rien.
const DOMAIN: [number, number] = [1, 9];

function xFromPh(ph: number): number {
  return X0 + X_SCALE * ph;
}

function yFromPct(pct: number): number {
  return Y0 - (pct / 100) * (Y0 - Y100);
}

/** %A− = 100 / (1 + 10^(pKA − pH)) — same formula as the lesson text (R8). */
function pctA(ph: number): number {
  return 100 / (1 + Math.pow(10, PKA - ph));
}

/** %AH = 100 − %A− — the two always sum to exactly 100. */
function pctAH(ph: number): number {
  return 100 - pctA(ph);
}

function roundPx(v: number): number {
  return Math.round(v * 100) / 100;
}

/** pH to one decimal, French comma — matches the control's step (0,2), so
 * every reachable value has at most one significant decimal digit. */
function formatFr(ph: number): string {
  return ph.toFixed(1).replace(".", ",");
}

/**
 * Les deux pourcentages, JAMAIS « 0 » ni « 100 ». La leçon, juste avant cette
 * figure, réfute « à la frontière, la forme dominante a déjà tout pris » et
 * montre que même à pKA + 3 la forme minoritaire garde 0,1 % : arrondis à
 * l'unité, les pourcentages affichaient 100 % et 0 % dès pH ≈ 7,1 — la
 * misconception même, écrite par la figure (signalé par l'auteur de la figure).
 *
 * Règle : si la forme minoritaire pèse au moins 1 %, les deux à l'unité (la
 * majoritaire reste alors ≤ 99) ; sinon, la minoritaire à DEUX chiffres
 * significatifs, et les deux avec ce même nombre de décimales — leur somme
 * affichée fait toujours 100.
 */
function decimales(ph: number): number {
  const m = Math.min(pctA(ph), pctAH(ph));
  if (m >= 1) return 0;
  return Math.min(6, 1 - Math.floor(Math.log10(m)));
}
function formatPct(pct: number, d: number): string {
  return pct.toFixed(d).replace(".", ",");
}

function cursorLine(ph: number): RecomputeResult {
  const x = roundPx(xFromPh(ph));
  const topY = roundPx(Math.min(yFromPct(pctAH(ph)), yFromPct(pctA(ph))));
  return { kind: "path", d: `M${x},290 L${x},${topY}` };
}

function pointAH(ph: number): RecomputeResult {
  return { kind: "point", x: roundPx(xFromPh(ph)), y: roundPx(yFromPct(pctAH(ph))) };
}

function pointA(ph: number): RecomputeResult {
  return { kind: "point", x: roundPx(xFromPh(ph)), y: roundPx(yFromPct(pctA(ph))) };
}

function phLabel(ph: number): RecomputeResult {
  return { kind: "text", value: `pH = ${formatFr(ph)}` };
}

/** Bare number (no "%" sign — the surrounding SVG tspan text supplies it,
 * and the sidecar's readoutTemplate wraps it as "{pctAH} %" itself). */
function pctAHText(ph: number): RecomputeResult {
  return { kind: "text", value: formatPct(pctAH(ph), decimales(ph)) };
}

function pctAText(ph: number): RecomputeResult {
  return { kind: "text", value: formatPct(pctA(ph), decimales(ph)) };
}

export const distributionCurseurPH: InteractiveFigureModel = {
  domain: DOMAIN,
  recompute: {
    cursorLine,
    pointAH,
    pointA,
    phLabel,
    pctAH: pctAHText,
    pctA: pctAText,
  },
  formatValue: formatFr,
};
