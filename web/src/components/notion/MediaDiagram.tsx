/**
 * MediaDiagram
 *
 * Renders a structural/labelled SVG diagram inline.
 *
 * DESIGN-BIBLE §6 + ADR-0017: structural visuals are coded SVG, never
 * raster/generated. Rendered inline so they inherit text color, scale with
 * text-size changes, and are accessible (the SVG can carry aria-label /
 * <title> authored by the content-author).
 *
 * The SVG string is passed from the server component that loaded it via fs.
 * dangerouslySetInnerHTML is safe here — SVGs come from the authored content
 * repo, not from user input.
 */

import { cn } from "@/lib/utils";

interface MediaDiagramProps {
  /** Raw SVG string loaded from media/*.svg */
  svg: string;
  /** Accessible name for the figure (passed to <figure> aria-label). */
  label?: string;
  className?: string;
}

export function MediaDiagram({ svg, label, className }: MediaDiagramProps) {
  return (
    <figure
      aria-label={label}
      className={cn(
        "my-8",
        // Centre the diagram within the reading column
        "flex justify-center",
        className
      )}
    >
      {/* SVG inline — inherits currentColor, scales cleanly */}
      <div
        className={cn(
          "w-full max-w-[56ch]",
          // Soft surface behind diagram — slightly raised
          "rounded-lg p-4",
          "bg-[var(--color-surface-raised)]",
          "border border-[var(--color-border-subtle)]",
          // Ensure SVG fills its container
          "[&>svg]:w-full [&>svg]:h-auto"
        )}
        // SVGs are authored content — safe to set as inner HTML
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
}
