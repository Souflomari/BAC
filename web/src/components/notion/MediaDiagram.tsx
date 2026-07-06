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
 * ViewBox cropping for vertically-stacked layouts (e.g. "regimes-uc"):
 * When a figure slug is registered in VERTICALLY_STACKED_SLUGS, the SVG's
 * viewBox is cropped to show only the top N/totalPanels fraction of the
 * full height. Hidden panels leave NO blank space below the visible panel.
 *
 * Structural figure sizing:
 * Circuit/schema figures (listed in STRUCTURAL_SLUGS) are capped at
 * max-width: 680px, centered in the band, so they never stretch to the
 * full 1140px content band and look disproportionately large.
 *
 * Caption stacking prevention:
 * stepCaption is passed in from NotionBody as the caption for the CURRENT
 * step only. This component renders it exactly once. No stacking occurs
 * because NotionBody passes only one caption string per render.
 */

import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";

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
   * Exactly one line per render — no stacking.
   */
  stepCaption?: string;
  className?: string;
}

// ── Structural figure slugs — capped to natural size, centered ───────────────
// These are circuit/schema diagrams that should NOT stretch to the full band.
// They are capped at 680px and centered.
// Exported: StagedFigure.tsx applies the same width-cap rule (single source —
// LESSON-EXPERIENCE-SPEC §2.3 "figure chrome identical to MediaDiagramFigure").
export const STRUCTURAL_SLUGS = new Set([
  "rlc-schema",
  "rl-schema",
  "rc-schema",
  "loi-mailles-build",
  "origin-uc",
  "origin-i",
  "origin-uL",
  // D10 wave C — electrochemistry cell schematics
  "pile-daniell",
  "cellule-electrolyse",
  // D10 wave B — mechanics schematics
  "plan-incline-forces",
  "deux-chariots-inertie",
]);

// ── Vertically-stacked slugs — viewBox cropped per visible step count ────────
// Key: slug; Value: total number of equal-height panels stacked vertically.
// When showing N of totalPanels panels, viewBox height is cropped to
// N/totalPanels of the full height, so hidden panels vanish (no blank space).
// Exported: StagedFigure.tsx (regimes-uc's stages.json migration) applies the
// same crop on the current stage count — single source (LESSON-EXPERIENCE-
// SPEC §2.3).
export const VERTICALLY_STACKED_PANELS: Record<string, number> = {
  "regimes-uc": 3,
};

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
    result = result.replace(
      new RegExp(`(<g[^>]*\\bid="step-${n}"[^>]*)>`, "g"),
      `$1 style="display:none">`
    );
  }
  return result;
}

/**
 * Crop the SVG viewBox vertically to show only the top N/totalPanels fraction.
 *
 * Parses the existing viewBox="minX minY width height" attribute and rewrites
 * height to (N / totalPanels) * originalHeight + a small buffer so the bottom
 * border of the last visible panel is not clipped.
 *
 * The buffer is 4% of a single panel height — enough to clear a typical
 * bottom stroke or gap line without revealing the next panel.
 *
 * If no viewBox is found, no cropping is applied (falls back to normal rendering).
 *
 * Exported for StagedFigure.tsx — single source (LESSON-EXPERIENCE-SPEC §2.3).
 */
export function applyViewBoxCrop(
  svg: string,
  visiblePanels: number,
  totalPanels: number
): string {
  if (visiblePanels >= totalPanels) return svg; // nothing to crop
  return svg.replace(
    /viewBox="([^"]+)"/,
    (_, existing: string) => {
      const parts = existing.trim().split(/[\s,]+/);
      if (parts.length !== 4) return `viewBox="${existing}"`; // can't parse
      const [minX, minY, w, h] = parts.map(Number);
      const panelH = h / totalPanels;
      // Buffer: 4% of a single panel — clears bottom border, won't reveal next panel
      const buffer = panelH * 0.04;
      const croppedH = (visiblePanels / totalPanels) * h + buffer;
      return `viewBox="${minX} ${minY} ${w} ${croppedH}"`;
    }
  );
}

export function MediaDiagram({
  svg,
  label,
  visibleSteps,
  stepCaption,
  className,
}: MediaDiagramProps) {
  let svgContent = svg;

  // Apply step visibility hiding
  if (visibleSteps && visibleSteps > 0) {
    svgContent = applyStepVisibility(svgContent, visibleSteps);
  }

  return (
    <figure
      aria-label={label}
      className={cn(
        "my-8 notion-wide-band",
        className
      )}
    >
      {/* SVG wrapper */}
      <div
        className={cn(
          "overflow-hidden",
          "rounded-xl",
          "bg-[var(--color-surface-raised)]",
          // Shadow-first card (ADR 0023): the elevation-1 hairline ring holds the
          // edge; no drawn border. Reads as lifted, not boxed-in.
          "shadow-elevation-1",
          "[&>svg]:w-full [&>svg]:h-auto",
          // Full width in the band (default)
          "w-full"
        )}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Step caption — one line, shown only when a caption is provided */}
      {stepCaption && (
        <figcaption
          className={cn(
            "mt-3 px-2",
            // #9: explanatory prose at body-sm (14px), #1: secondary color for 4.5:1
            "text-body-sm text-[var(--color-text-secondary)]",
            "leading-relaxed",
            "max-w-[65ch]" // cap caption width
          )}
        >
          {frenchTypography(stepCaption)}
        </figcaption>
      )}
    </figure>
  );
}

// ── Extended MediaDiagram with slug-aware sizing and viewBox cropping ─────────
// This is the version used by NotionBody. It accepts a `slug` prop so it can
// apply structural sizing and viewBox cropping without duplicating the
// STRUCTURAL_SLUGS / VERTICALLY_STACKED_PANELS config.

interface MediaDiagramWithSlugProps extends MediaDiagramProps {
  slug: string;
}

export function MediaDiagramFigure({
  svg,
  label,
  visibleSteps,
  stepCaption,
  slug,
  className,
}: MediaDiagramWithSlugProps) {
  let svgContent = svg;

  // 1. Apply step visibility hiding
  if (visibleSteps && visibleSteps > 0) {
    svgContent = applyStepVisibility(svgContent, visibleSteps);
  }

  // 2. Apply viewBox cropping for vertically-stacked figures
  const totalPanels = VERTICALLY_STACKED_PANELS[slug];
  if (totalPanels !== undefined && visibleSteps && visibleSteps > 0) {
    svgContent = applyViewBoxCrop(svgContent, visibleSteps, totalPanels);
  }

  // 3. Determine if this is a structural figure (cap width)
  const isStructural = STRUCTURAL_SLUGS.has(slug);

  return (
    <figure
      aria-label={label}
      className={cn(
        "my-8 notion-wide-band",
        className
      )}
    >
      {/* SVG wrapper */}
      <div
        className={cn(
          "overflow-hidden",
          "rounded-xl",
          "bg-[var(--color-surface-raised)]",
          // Shadow-first card (ADR 0023): the elevation-1 hairline ring holds the
          // edge; no drawn border. Reads as lifted, not boxed-in.
          "shadow-elevation-1",
          "[&>svg]:w-full [&>svg]:h-auto",
          isStructural
            ? // Structural: cap to natural size, center in band
              "w-full mx-auto"
            : // Wide-band: full width
              "w-full"
        )}
        style={isStructural ? { maxWidth: "680px" } : undefined}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Step caption — one line only, capped at 65ch */}
      {stepCaption && (
        <figcaption
          className={cn(
            "mt-3 px-2",
            // #9: explanatory prose at body-sm (14px), #1: secondary color for 4.5:1
            "text-body-sm text-[var(--color-text-secondary)]",
            "leading-relaxed",
            "max-w-[65ch]"
          )}
        >
          {frenchTypography(stepCaption)}
        </figcaption>
      )}
    </figure>
  );
}
