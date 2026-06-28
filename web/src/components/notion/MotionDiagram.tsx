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
 * Learner-paced step control:
 * When the motion SVG has step groups (id="step-1", "step-2", …), the
 * component exposes ← Étape précédente / Rejouer / Étape suivante → controls
 * so the student can walk the reveal at their own pace (fix #7).
 * The step count is detected by scanning id="step-N" in the SVG string.
 *
 * Under prefers-reduced-motion: defaults to the stepped static view (step 1)
 * with prev/next controls only — autoplay is not triggered. The "Rejouer"
 * button is replaced by a static view label.
 *
 * Touch targets: all controls ≥ 44px hit area.
 * Resting text: text-secondary (contrast-safe).
 *
 * DESIGN-BIBLE §5: motion serves comprehension, never decoration.
 * DESIGN-BIBLE §6: full-width band — these are "wide-band" elements.
 * DESIGN-BIBLE §9: keyboard-reachable, focus ring, reduced-motion safe.
 *
 * This is a CLIENT component because it needs useState/useEffect.
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MotionDiagramProps {
  /** Raw SVG string loaded from media/<slug>.motion.svg */
  svg: string;
  /** Accessible label for the figure */
  label?: string;
  className?: string;
}

// ── Step detection ────────────────────────────────────────────────────────────
// Count how many id="step-N" groups exist in the SVG string.
// Returns 0 if no step groups found (SVG has no stepped structure).
function detectStepCount(svg: string): number {
  let max = 0;
  const re = /\bid="step-(\d+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(svg)) !== null) {
    const n = parseInt(m[1], 10);
    if (n > max) max = n;
  }
  return max;
}

// ── Step visibility (same logic as MediaDiagramFigure) ────────────────────────
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

// ── Inline SVG icons (no emoji, keyboard-safe) ────────────────────────────────
function IconPrev() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconNext() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconReplay() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6a4 4 0 1 1 .8 2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 9V6.5H4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MotionDiagram({ svg, label, className }: MotionDiagramProps) {
  const totalSteps = detectStepCount(svg);
  const hasSteps = totalSteps > 0;

  // replayKey forces React to remount the SVG, restarting CSS animations.
  const [replayKey, setReplayKey] = useState(0);
  // currentStep: 0 = full autoplay (all steps visible / animated), 1..N = stepped
  const [currentStep, setCurrentStep] = useState<number>(0);
  // reducedMotion: detected via matchMedia; if true default to step 1 (static)
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Detect prefers-reduced-motion on mount (client-only)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    // Under reduced motion, start at step 1 (static view) not autoplay
    if (mq.matches && hasSteps) {
      setCurrentStep(1);
    }
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches && hasSteps) setCurrentStep(1);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [hasSteps]);

  const handleReplay = useCallback(() => {
    setCurrentStep(0); // back to full autoplay
    setReplayKey((k) => k + 1);
    requestAnimationFrame(() => {
      containerRef.current?.querySelector<HTMLElement>("[data-replay-svg]")?.focus();
    });
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentStep((s) => Math.max(1, s === 0 ? 1 : s - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((s) => {
      if (s === 0) return 1; // if in autoplay, jump to step 1
      return Math.min(totalSteps, s + 1);
    });
  }, [totalSteps]);

  // Compute which SVG content to render
  const svgContent = (() => {
    if (currentStep > 0 && hasSteps) {
      return applyStepVisibility(svg, currentStep);
    }
    return svg;
  })();

  // In stepped mode (currentStep > 0), we show a static div (no remount trick needed)
  const isSteppedMode = currentStep > 0;

  const btnBase = cn(
    "inline-flex items-center gap-1.5",
    "px-3 py-2",
    "min-h-[44px] min-w-[44px]", // touch target floor §9
    "rounded-md",
    "text-caption font-medium",
    "text-[var(--color-text-secondary)]",
    "border border-[var(--color-border-subtle)]",
    "bg-[var(--color-surface-raised)]",
    "hover:text-[var(--color-text-primary)]",
    "hover:border-[var(--color-border-soft)]",
    "transition-colors duration-[150ms]",
    "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2",
    "disabled:opacity-40 disabled:cursor-not-allowed"
  );

  return (
    <figure
      aria-label={label}
      className={cn("my-10 notion-wide-band", className)}
    >
      {/* SVG wrapper — full width, soft raised surface */}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden",
          "rounded-xl",
          "bg-[var(--color-surface-raised)]",
          "border border-[var(--color-border-subtle)]",
          "[&>div>svg]:w-full [&>div>svg]:h-auto"
        )}
      >
        {isSteppedMode ? (
          // Static stepped view — no CSS animation running
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            aria-hidden="true"
          />
        ) : (
          // Autoplay — remounted on replay via key
          <div
            key={replayKey}
            data-replay-svg=""
            dangerouslySetInnerHTML={{ __html: svgContent }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Controls row */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {/* Prev/Next step controls — shown when the SVG has step groups */}
        {hasSteps && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={btnBase}
              aria-label="Étape précédente"
            >
              <IconPrev />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            {/* Step indicator */}
            <span
              className="text-caption text-[var(--color-text-tertiary)] tabular-nums min-w-[4ch] text-center select-none"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentStep === 0
                ? "Auto"
                : `${currentStep} / ${totalSteps}`}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentStep === totalSteps}
              className={btnBase}
              aria-label="Étape suivante"
            >
              <span className="hidden sm:inline">Suivant</span>
              <IconNext />
            </button>
          </>
        )}

        {/* Spacer — push replay to the right */}
        <div className="flex-1" aria-hidden="true" />

        {/* Replay button — only when animation is not suppressed */}
        {!reducedMotion && (
          <button
            type="button"
            onClick={handleReplay}
            className={btnBase}
            aria-label="Rejouer l'animation depuis le début"
          >
            <IconReplay />
            Rejouer
          </button>
        )}

        {/* Reduced-motion static label */}
        {reducedMotion && (
          <span className="text-caption text-[var(--color-text-tertiary)] italic">
            Vue statique (mouvement réduit)
          </span>
        )}
      </div>

      {/* Figure caption — label displayed below controls */}
      {label && (
        <figcaption className="mt-2 text-caption text-[var(--color-text-tertiary)] text-center max-w-[65ch] mx-auto">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
