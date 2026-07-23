"use client";

/**
 * InteractiveControl — the native range-input half of a manipulable
 * StagedFigure (docs/design/INTERACTIVE-FIGURE-SPEC.md §4). The drag-point
 * gesture on the SVG itself is wired by useInteractiveFigure directly against
 * the injected SVG subtree; this component is the accessible source of
 * truth — native keyboard (arrows, Home/End), native touch, native
 * aria-valuenow/min/max. `ChapterShell`'s global ArrowLeft/ArrowRight listener
 * already ignores `input` elements by tag name, so this never collides with
 * chapter-transport keyboard nav.
 *
 * `readoutTemplate` (from the sidecar) is filled in with `{value}`,
 * `{slope}` (when the model exposes `fPrime`), and any OTHER `{name}` token
 * that matches a key in the model's own `recompute` record whose result is
 * `kind: "text"` — reusing the exact same bindings the figure itself is
 * drawn from rather than inventing a parallel readout-only computation. A
 * live aria-live region so a screen-reader user hears the recomputed
 * reading as they drag or use the slider, without the figure's own static
 * aria-label having to change.
 */

import type { InteractiveFigureConfigSpec } from "@/lib/content";
import type { InteractiveFigureModel } from "@/lib/interactive-figures";
import type { FigTextOption } from "./StagedFigure";
import { cn } from "@/lib/utils";

function fillTemplate(
  template: string,
  value: number,
  model: InteractiveFigureModel
): string {
  return template.replace(/\{(\w+)\}/g, (match, token: string) => {
    if (token === "value") return model.formatValue(value);
    if (token === "slope" && model.fPrime) return model.formatValue(model.fPrime(value));
    const recompute = model.recompute[token];
    if (recompute) {
      const result = recompute(value);
      if (result.kind === "text") return result.value;
    }
    return match; // unresolvable token — leave literal rather than blank
  });
}

interface InteractiveControlProps {
  config: InteractiveFigureConfigSpec;
  model: InteractiveFigureModel;
  value: number;
  onChange: (value: number) => void;
  /**
   * MP-V1 step-text legibility candidate (StagedFigure.tsx — owner review
   * pending). The readout IS teaching text too: variants promote it from
   * body-sm to body (a1/a3) or body-lg (a2), and the hint from caption to
   * body-sm. Undefined on every default surface — byte-identical output.
   */
  figTextOption?: FigTextOption;
  /** Layout hook for StagedFigure's a3 side-by-side grid (column placement). */
  className?: string;
}

export function InteractiveControl({
  config,
  model,
  value,
  onChange,
  figTextOption,
  className,
}: InteractiveControlProps) {
  const { control, readoutTemplate } = config;
  const hint =
    control.kind === "drag-point"
      ? "Faites glisser le point sur la courbe, ou utilisez le curseur."
      : "Utilisez le curseur.";

  const hintClass =
    figTextOption === undefined
      ? "text-caption text-[var(--color-text-secondary)]"
      : "text-body-sm text-[var(--color-text-secondary)]";
  const readoutClass =
    figTextOption === undefined
      ? "text-body-sm text-[var(--color-text-primary)] tabular-nums"
      : figTextOption === "a2"
        ? "text-body-lg text-[var(--color-text-primary)] tabular-nums"
        : "text-body text-[var(--color-text-primary)] tabular-nums";

  return (
    <div
      className={cn("mt-4 flex flex-col gap-2 print:hidden", className)}
      role="group"
      aria-label="Manipuler la figure"
    >
      <p className={hintClass}>{hint}</p>
      <input
        type="range"
        min={control.domain[0]}
        max={control.domain[1]}
        step={control.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-valuetext={model.formatValue(value)}
        className="w-full max-w-sm accent-[var(--color-accent)]"
      />
      {readoutTemplate && (
        <p
          className={readoutClass}
          aria-live="polite"
          aria-atomic="true"
        >
          {fillTemplate(readoutTemplate, value, model)}
        </p>
      )}
    </div>
  );
}
