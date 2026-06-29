/**
 * FontSizeStepper
 *
 * A− / A / A+ stepper that drives the root font-size via a CSS variable.
 *
 * DESIGN-BIBLE §9 floor item: text-size control for accessibility.
 *
 * Three steps:
 *   small  → --font-scale: 0.9375  (15px base)
 *   base   → --font-scale: 1       (16px base, default)
 *   large  → --font-scale: 1.125   (18px base)
 *
 * The CSS variable `--font-scale` is set on <html>. All rem/em/ch sizes
 * in the lesson cascade from the root font-size, which is multiplied by
 * this variable via a CSS rule in globals.css.
 *
 * NO browser storage — state is in-memory React state only, reset on navigation.
 * The scale returns to default on page reload. This is intentional: §9
 * requires the control, not persistence.
 *
 * Touch targets: each button ≥ 44px hit area (§9).
 * Keyboard: arrow keys or individual button focus (each is a distinct button).
 *
 * This is a CLIENT component.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

type SizeStep = "small" | "base" | "large";

const SCALE_VALUES: Record<SizeStep, number> = {
  small: 0.9375,
  base:  1,
  large: 1.125,
};

const STEPS: SizeStep[] = ["small", "base", "large"];

const LABELS: Record<SizeStep, string> = {
  small: "A−",
  base:  "A",
  large: "A+",
};

const ARIA_LABELS: Record<SizeStep, string> = {
  small: "Réduire la taille du texte",
  base:  "Taille du texte normale",
  large: "Agrandir la taille du texte",
};

export function FontSizeStepper({ className }: { className?: string }) {
  const [current, setCurrent] = useState<SizeStep>("base");

  // Apply the CSS variable to <html> whenever the step changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      String(SCALE_VALUES[current])
    );
    // Clean up on unmount — reset to default
    return () => {
      document.documentElement.style.removeProperty("--font-scale");
    };
  }, [current]);

  const setStep = useCallback((step: SizeStep) => {
    setCurrent(step);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-0.5",
        "rounded-md",
        // Shadow-first segmented control (ADR 0023): elevation-1 hairline ring
        // defines the track; the active thumb lifts within it.
        "shadow-elevation-1",
        "bg-[var(--color-surface-raised)]",
        "p-0.5",
        className
      )}
      role="group"
      aria-label="Taille du texte"
    >
      {STEPS.map((step) => {
        const isActive = current === step;
        return (
          <button
            key={step}
            type="button"
            onClick={() => setStep(step)}
            aria-label={ARIA_LABELS[step]}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center justify-center",
              // §9 touch target: 48px (raised from 44px per audit finding #2)
              "min-w-[48px] min-h-[48px] px-2",
              "rounded",
              "text-caption font-semibold",
              "transition-colors duration-[150ms]",
              // Focus ring — migrated to .focus-ring utility
              "focus-ring",
              isActive
                ? [
                    // Lifted "selected" thumb: lightest surface + soft drop, so the
                    // active segment reads as raised within the track.
                    "bg-[var(--color-surface-overlay)]",
                    "text-[var(--color-text-primary)]",
                    "shadow-elevation-1",
                  ]
                : [
                    // #1: inactive step button at caption size — must pass 4.5:1.
                    // Promoted from tertiary to secondary.
                    "text-[var(--color-text-secondary)]",
                    "hover:text-[var(--color-text-primary)]",
                    "hover:bg-[var(--color-surface-base)]",
                  ]
            )}
          >
            {/* Size-scaled label so the buttons visually suggest their effect */}
            <span
              style={{
                fontSize:
                  step === "small" ? "11px"
                  : step === "base"  ? "13px"
                  : "15px",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {LABELS[step]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
