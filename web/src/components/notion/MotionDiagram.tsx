/**
 * MotionDiagram
 *
 * Renders a stepped motion SVG diagram inline (from media/*.motion.svg).
 *
 * Learner-paced step control (click-to-advance, never autoplay):
 *
 * The motion SVG is structured into discrete <g id="step-1"> … <g id="step-N">
 * groups where step N means steps 1..N are cumulatively visible. On load only
 * step 1 is shown. The student clicks "Suivant ▸" to reveal the next step,
 * and "◂ Précédent" to go back. At the last step "Suivant" becomes
 * "Recommencer" and resets to step 1. There is NO autoplay, NO
 * scroll-into-view trigger, NO timer.
 *
 * Step visibility:
 * Steps beyond `currentStep` have `style="display:none"` injected into their
 * <g> tag at the SVG string level (same approach as MediaDiagramFigure), so
 * each instance is independent and no document-wide <style> tag is needed.
 *
 * Fallback for legacy clips (no step groups):
 * If the SVG carries no id="step-N" groups, it is rendered whole. No controls
 * are shown. This prevents breakage of older assets.
 *
 * prefers-reduced-motion:
 * When the OS reports reduced-motion preference, ALL step groups are shown at
 * once (fully revealed, static). Controls are hidden — there is nothing to
 * advance through.
 *
 * Controls:
 * - "◂ Précédent" button — disabled at step 1
 * - "Étape N / Total" indicator — aria-live polite
 * - "Suivant ▸" button — at last step becomes "Recommencer" (resets to step 1)
 * All buttons are real <button>s, keyboard-focusable, min 44×44px hit area,
 * visible focus ring, resting text-secondary.
 *
 * No browser storage — state is in-memory React only.
 *
 * DESIGN-BIBLE §3: math rendered, not imaged.
 * DESIGN-BIBLE §5: motion serves comprehension, never decoration.
 * DESIGN-BIBLE §6: full-width wide-band element.
 * DESIGN-BIBLE §9: keyboard, focus ring, contrast, reduced-motion, touch ≥44px.
 *
 * CLIENT component — needs useState/useEffect.
 */

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { largeurNaturelle } from "./MediaDiagram";
import { Icon } from "@/components/ui/Icon";
import { TransportButton } from "./TransportButton";
import { frenchTypography } from "@/lib/frenchTypography";

interface MotionDiagramProps {
  /** Raw SVG string loaded from media/<slug>.motion.svg */
  svg: string;
  /** Accessible label for the figure */
  label?: string;
  className?: string;
}

// ── Step detection ─────────────────────────────────────────────────────────────
// Scans the SVG string for id="step-N" attributes. Returns the highest N found,
// or 0 if no step groups are present (legacy/unstepped SVG).
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

// ── Step visibility patching ───────────────────────────────────────────────────
// Sets the visibility state of each <g id="step-N"> group.
// The motion SVGs reveal a step via the `.step-visible` CLASS — children carry
// `.step-enter` (opacity 0) and fade in only when their parent group has
// `.step-visible`. So merely removing display:none is not enough; a shown step
// must carry the class, and a hidden step must carry display:none. We rewrite the
// whole opening tag (the step tags carry only id + one of class/style), so this
// also normalises away the SVG's baked default state (step-1 visible, rest hidden).
// Safe on SVGs with no step groups — the regex simply finds no matches.
function applyStepVisibility(svg: string, visibleUpTo: number): string {
  return svg.replace(
    /<g\s+id="step-(\d+)"[^>]*>/g,
    (_full, num: string) => {
      const k = parseInt(num, 10);
      return k <= visibleUpTo
        ? `<g id="step-${num}" class="step-visible">`
        : `<g id="step-${num}" style="display:none">`;
    }
  );
}

export function MotionDiagram({ svg, label, className }: MotionDiagramProps) {
  const totalSteps = detectStepCount(svg);
  const hasSteps = totalSteps > 0;

  // currentStep: always starts at 1 (step 1 visible only on load).
  // Range: [1, totalSteps]. Clamped when totalSteps changes (shouldn't happen,
  // but safe). For no-step SVGs, this state is unused.
  const [currentStep, setCurrentStep] = useState<number>(1);

  // reducedMotion: true when the OS signals prefers-reduced-motion: reduce.
  // Under this preference, all steps are shown at once (static full reveal).
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion on mount (client only — matchMedia is not
  // available during SSR). Listen for changes (user can flip the setting).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Clamp currentStep to valid range whenever totalSteps changes.
  useEffect(() => {
    if (hasSteps) {
      setCurrentStep((s) => Math.min(Math.max(s, 1), totalSteps));
    }
  }, [totalSteps, hasSteps]);

  // Compute the SVG string to render:
  // - reduced-motion: full SVG (all steps visible, no hiding)
  // - stepped: hide groups beyond currentStep
  // - no steps: raw SVG unchanged
  const svgContent: string = (() => {
    if (!hasSteps) return svg;
    if (reducedMotion) return svg; // all steps visible, static
    return applyStepVisibility(svg, currentStep);
  })();

  const atFirst = currentStep === 1;
  const atLast = currentStep === totalSteps;

  function handlePrev() {
    setCurrentStep((s) => Math.max(1, s - 1));
  }

  function handleNext() {
    if (atLast) {
      // Recommencer — reset to step 1
      setCurrentStep(1);
    } else {
      setCurrentStep((s) => Math.min(totalSteps, s + 1));
    }
  }

  return (
    <figure
      aria-label={label}
      className={cn("my-10 notion-wide-band", className)}
    >
      {/* SVG display area */}
      <div
        style={
          largeurNaturelle(svg)
            ? ({ "--figure-naturelle": `${largeurNaturelle(svg)}px` } as React.CSSProperties)
            : undefined
        }
        className={cn(
          "relative w-full overflow-hidden",
          // Même règle que les figures statiques (globals.css, .figure-cadre).
          "figure-cadre",
          "rounded-xl",
          "bg-surface-raised",
          "border border-subtle",
          // elevation-1 — figure panel at rest (per TOKENS.md §6.3)
          "shadow-elevation-1",
          // Cap the display area so a tall, sparsely-populated canvas at early
          // steps never opens a full-height void. The SVG scales proportionally
          // (w-auto + max-w-full) so the aspect ratio is always preserved; the
          // 460px cap is wide enough for landscape SVGs (≤2:1 ratio) to remain
          // legible while keeping controls/caption near the figure.
          // DESIGN-BIBLE §9 / VC-1 fix: bound the motion panel height.
          "[&>div>svg]:max-h-[460px]",
          "[&>div>svg]:w-auto",
          "[&>div>svg]:max-w-full",
          "[&>div>svg]:h-auto",
          "[&>div>svg]:block"
        )}
      >
        {/*
          Static div — no remount key needed. The SVG string itself changes
          (step visibility patched at string level) so React diffs the
          dangerouslySetInnerHTML and updates the DOM. No CSS animation
          autoplay is triggered by this diff; the SVG's own transition rules
          (if any) handle per-element reveal on re-render.
          The inner div is centered so the SVG (which may be narrower than the
          container at the 460px cap) sits in the middle of the panel.
        */}
        <div
          className="flex justify-center"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          aria-hidden="true"
        />
      </div>

      {/*
        Controls row — shown only when:
        (a) the SVG has step groups, AND
        (b) reduced-motion is NOT active (under reduced-motion all steps are
            visible at once; there is nothing to step through).
      */}
      {hasSteps && !reducedMotion && (
        <div
          className="mt-3 flex items-center gap-2 flex-wrap"
          role="group"
          aria-label={label ? `Contrôles : ${label}` : "Contrôles de l’animation"}
        >
          {/* ◂ Précédent */}
          <TransportButton
            onClick={handlePrev}
            disabled={atFirst}
            aria-label="Étape précédente"
          >
            <Icon name="chevron-left" size={14} />
            <span className="hidden bp-medium:inline">Précédent</span>
          </TransportButton>

          {/* Step indicator — functional UI text, politely announced on change.
              #1: promoted from tertiary to secondary (12px must pass 4.5:1) */}
          <span
            className={cn(
              "text-caption text-secondary",
              "tabular-nums select-none",
              "min-w-[6ch] text-center"
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {`Étape ${currentStep} / ${totalSteps}`}
          </span>

          {/* Suivant ▸ — becomes Recommencer at the last step */}
          <TransportButton
            onClick={handleNext}
            aria-label={
              atLast ? "Recommencer depuis l’étape 1" : "Étape suivante"
            }
          >
            {atLast ? (
              <>
                <Icon name="reset" size={13} />
                <span className="hidden bp-medium:inline">Recommencer</span>
              </>
            ) : (
              <>
                <span className="hidden bp-medium:inline">Suivant</span>
                <Icon name="chevron-right" size={14} />
              </>
            )}
          </TransportButton>
        </div>
      )}

      {/* Reduced-motion notice (in place of controls) — #1: promoted to secondary */}
      {hasSteps && reducedMotion && (
        <p
          className={cn(
            "mt-2",
            "text-caption text-secondary",
            "italic"
          )}
        >
          Vue statique — mouvement réduit activé.
        </p>
      )}

      {/* Figure caption — label shown below controls, capped at 65ch.
          #9: body-sm (14px) for explanatory prose; #1: secondary for contrast */}
      {label && (
        <figcaption
          className={cn(
            "mt-2",
            "text-body-sm text-secondary",
            "text-center max-w-reading mx-auto"
          )}
        >
          {frenchTypography(label)}
        </figcaption>
      )}
    </figure>
  );
}
