/**
 * Shared contracts for bespoke first-party interactive figures
 * (docs/design/INTERACTIVE-FIGURE-SPEC.md). One `InteractiveFigureModel`
 * per figure slug, registered in `index.ts` — the math lives here (app
 * source), the sidecar JSON under `content/` stays pure data (§2 of the
 * spec explains why: every other content/ sidecar is data-only, and this
 * mirrors the existing STRUCTURAL_SLUGS/VERTICALLY_STACKED_PANELS pattern
 * in MediaDiagram.tsx rather than inventing a third).
 */

export type RecomputeResult =
  | { kind: "path"; d: string }
  | { kind: "point"; x: number; y: number }
  | { kind: "text"; value: string };

export interface InteractiveFigureModel {
  /** Data-space domain the control may range over (never SVG pixels). */
  domain: [number, number];
  /**
   * Data-space (dataX, dataY) -> SVG user-space point, using the SAME
   * scale constants the author used for the static SVG (single source —
   * never re-derive the mapping separately from the drawn curve). Required
   * for `control.kind === "drag-point"` figures (the drag gesture needs it);
   * a `"slider"`-only figure whose control value isn't a point on a curve
   * (e.g. racines-unite's vertex count n) may omit it.
   */
  toSvgPoint?(dataX: number, dataY: number): { x: number; y: number };
  /** SVG user-space x -> data-space x, clamped to `domain`. Same
   * drag-point-only requirement as `toSvgPoint`. */
  toDataX?(svgX: number): number;
  /** f evaluated at a data-space x. Omit if the control isn't a curve position. */
  f?(x: number): number;
  /** Optional — only bindings that draw a tangent/derivative need this. */
  fPrime?(x: number): number;
  /**
   * binding id (the `.interactive.json` `bindings[].recompute` string) ->
   * fn(current control value) -> what to write to that binding's target.
   */
  recompute: Record<string, (value: number) => RecomputeResult>;
  /** French, locale-correct live readout (comma decimal) — never a raw toString(). */
  formatValue(value: number): string;
}
