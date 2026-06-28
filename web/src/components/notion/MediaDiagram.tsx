/**
 * MediaDiagram
 *
 * Renders a structural/labelled SVG diagram inline.
 *
 * DESIGN-BIBLE §6 + ADR-0017: structural visuals are coded SVG, never
 * raster/generated. Rendered inline so they inherit text color, scale with
 * text-size changes, and are accessible.
 *
 * dangerouslySetInnerHTML is safe here — SVGs come from the authored content
 * repo, not from user input.
 *
 * Progressive (stepped) reveal:
 * When `visibleSteps` is provided, SVG groups with id="step-N" where N >
 * visibleSteps have `display:none` injected directly into their style
 * attribute. This avoids a document-wide <style> injection (which would affect
 * all same-slug figures on the page) by operating at the SVG string level
 * before rendering.
 *
 * Implementation: regex-replaces `<g id="step-N"` with
 * `<g id="step-N" style="display:none"` for each N > visibleSteps.
 * The replacement is bounded (steps 1..10) and harmless if the SVG has fewer
 * steps than the bound — no match means no change.
 */

import { cn } from "@/lib/utils";

interface MediaDiagramProps {
  /** Raw SVG string loaded from media/*.svg */
  svg: string;
  /** Accessible name for the figure (passed to <figure> aria-label). */
  label?: string;
  /**
   * How many step groups to show (cumulative from 1).
   * - Undefined or 0 → show ALL steps (static / fully revealed).
   * - N > 0 → show step-1..step-N, hide step-(N+1) and beyond.
   * Figures use id="step-1", id="step-2", … on their <g> groups.
   */
  visibleSteps?: number;
  /**
   * Caption text shown below the figure when visibleSteps is set.
   * E.g. "Étape 2 — le courant i apparaît."
   */
  stepCaption?: string;
  className?: string;
}

/**
 * Post-process SVG string to hide step groups beyond `visibleSteps`.
 *
 * Replaces `<g id="step-N"` with `<g id="step-N" style="display:none"`
 * for each N that exceeds visibleSteps. Safe on SVGs that have no such
 * groups — the regex simply finds no matches.
 */
function applyStepVisibility(svg: string, visibleSteps: number): string {
  const STEP_UPPER_BOUND = 10;
  let result = svg;
  for (let n = visibleSteps + 1; n <= STEP_UPPER_BOUND; n++) {
    // Match `<g id="step-N"` with optional whitespace before the id attr,
    // and with any attributes that may already be present (e.g. class).
    // We only match the opening of the g tag containing this exact id.
    // Using a negative lookahead on the id value avoids partial matches
    // (e.g. step-10 vs step-1). The boundary is the quote termination.
    result = result.replace(
      new RegExp(`(<g[^>]*\\bid="step-${n}"[^>]*)>`, "g"),
      `$1 style="display:none">`
    );
  }
  return result;
}

export function MediaDiagram({
  svg,
  label,
  visibleSteps,
  stepCaption,
  className,
}: MediaDiagramProps) {
  // Apply step visibility post-processing if needed
  const svgContent =
    visibleSteps && visibleSteps > 0
      ? applyStepVisibility(svg, visibleSteps)
      : svg;

  return (
    <figure
      aria-label={label}
      className={cn(
        "my-8 notion-wide-band",
        className
      )}
    >
      {/* SVG wrapper — full width, soft raised surface */}
      <div
        className={cn(
          "w-full overflow-hidden",
          "rounded-xl",
          "bg-[var(--color-surface-raised)]",
          "border border-[var(--color-border-subtle)]",
          "[&>svg]:w-full [&>svg]:h-auto"
        )}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Step caption — shown when a progressive reveal caption is provided */}
      {stepCaption && (
        <figcaption
          className={cn(
            "mt-3 px-2",
            "text-caption text-[var(--color-text-tertiary)]",
            "leading-relaxed"
          )}
        >
          {stepCaption}
        </figcaption>
      )}
    </figure>
  );
}
