/**
 * MotionDiagram
 *
 * Renders an animated SVG diagram inline (from media/*.motion.svg).
 *
 * The motion SVGs carry their own CSS animations and a
 * `@media (prefers-reduced-motion: reduce)` block that freezes all
 * animations to their final (fully-built) state — the static figure is
 * the fallback already baked into the SVG.
 *
 * Includes an optional "Rejouer" (replay) control that restarts the CSS
 * animation by briefly removing and re-adding the SVG to the DOM. This
 * is keyboard-reachable and respects prefers-reduced-motion (the button
 * is hidden when the user has requested reduced motion, since the
 * animation is suppressed anyway).
 *
 * DESIGN-BIBLE §5: motion serves comprehension, never decoration.
 * DESIGN-BIBLE §6: full-width band — these are the "wide-band" elements.
 * DESIGN-BIBLE §9: keyboard-reachable, focus ring, reduced-motion safe.
 *
 * This is a CLIENT component because the replay button needs useState.
 */

"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface MotionDiagramProps {
  /** Raw SVG string loaded from media/<slug>.motion.svg */
  svg: string;
  /** Accessible label for the figure */
  label?: string;
  className?: string;
}

export function MotionDiagram({ svg, label, className }: MotionDiagramProps) {
  // key is incremented on replay to force React to remount the SVG,
  // which restarts CSS animations from the beginning.
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = useCallback(() => {
    setReplayKey((k) => k + 1);
    // Return focus to the container after remount so keyboard users stay oriented
    requestAnimationFrame(() => {
      containerRef.current?.querySelector<HTMLElement>("[data-replay-svg]")?.focus();
    });
  }, []);

  return (
    <figure
      aria-label={label}
      className={cn(
        "my-10 notion-wide-band",
        className
      )}
    >
      {/* SVG wrapper — full width, soft raised surface */}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden",
          "rounded-xl",
          "bg-[var(--color-surface-raised)]",
          "border border-[var(--color-border-subtle)]",
          // SVG fills its container; height is determined by the SVG's own viewBox
          "[&>div>svg]:w-full [&>div>svg]:h-auto"
        )}
      >
        {/* The SVG itself — remounted on replay via the key */}
        <div
          key={replayKey}
          data-replay-svg=""
          dangerouslySetInnerHTML={{ __html: svg }}
          // SVGs from the content repo are authored, not user input
          aria-hidden="true"
        />
      </div>

      {/*
       * Replay button — only shown when animations are likely running
       * (hidden via CSS if prefers-reduced-motion:reduce, because the
       * SVG's own style block already freezes it to the final state).
       */}
      <div
        className={cn(
          "mt-3 flex justify-end",
          // Hide the replay button when the user prefers reduced motion.
          // The motion SVG is already static in that case — replay does nothing useful.
          "motion-reduce:hidden"
        )}
      >
        <button
          type="button"
          onClick={handleReplay}
          className={cn(
            "flex items-center gap-1.5",
            "px-3 py-1.5",
            "rounded-md",
            "text-caption font-medium",
            "text-[var(--color-text-tertiary)]",
            "border border-[var(--color-border-subtle)]",
            "bg-[var(--color-surface-raised)]",
            "hover:text-[var(--color-text-secondary)]",
            "hover:border-[var(--color-border-soft)]",
            "transition-colors duration-[150ms]",
            "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2"
          )}
          aria-label="Rejouer l'animation"
        >
          {/* Simple replay icon — SVG, no emoji */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6a4 4 0 1 1 .8 2.4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 9V6.5H4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Rejouer
        </button>
      </div>

      {/* Caption slot — if a figcaption is desired, add it via label prop display */}
      {label && (
        <figcaption className="mt-2 text-caption text-[var(--color-text-tertiary)] text-center">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
