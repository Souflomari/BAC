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

/**
 * Le réglage est partagé entre toutes les instances du contrôle et survit
 * à la navigation.
 *
 * Deux raisons, toutes deux issues de l'audit du 2026-08-15 :
 *
 *  1. **Persistance.** C'était le SEUL réglage non conservé, alors que le
 *     thème et la filière l'étaient. Un élève malvoyant devait le régler à
 *     chaque page. La docstring d'origine assumait l'oubli (« §9 exige le
 *     contrôle, pas la persistance ») ; c'est vrai à la lettre et faux en
 *     pratique — un contrôle qu'il faut réactionner à chaque navigation
 *     n'est pas un réglage d'accessibilité, c'est une corvée. Une taille de
 *     texte choisie est une PRÉFÉRENCE réelle, exactement la catégorie que
 *     l'ADR 0025 §2.11 autorise à stocker (jamais de l'état d'apprentissage
 *     fabriqué).
 *  2. **Cohérence entre instances.** Le header en rend deux (une visible en
 *     large, une dans le menu compact en étroit). Avec un état local, la
 *     copie cachée affichait « A » pendant que la page était en « A+ ».
 */
const CLE = "bac-textsize";

function lire(): SizeStep {
  try {
    const v = localStorage.getItem(CLE);
    if (v === "small" || v === "base" || v === "large") return v;
  } catch {
    /* stockage indisponible : on reste au défaut */
  }
  return "base";
}

const abonnes = new Set<(s: SizeStep) => void>();

export function FontSizeStepper({ className }: { className?: string }) {
  // Toujours "base" au premier rendu : le serveur ne connaît pas le
  // localStorage, et rendre autre chose ici casserait l'hydratation. La
  // valeur réelle est appliquée juste après, et sans clignotement de mise
  // en page puisque le script de démarrage a déjà posé --font-scale.
  const [current, setCurrent] = useState<SizeStep>("base");

  useEffect(() => {
    setCurrent(lire());
    abonnes.add(setCurrent);
    return () => {
      abonnes.delete(setCurrent);
    };
  }, []);

  const setStep = useCallback((step: SizeStep) => {
    try {
      localStorage.setItem(CLE, step);
    } catch {
      /* stockage indisponible : le réglage vaut pour cette page */
    }
    document.documentElement.style.setProperty("--font-scale", String(SCALE_VALUES[step]));
    abonnes.forEach((f) => f(step));
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-0.5",
        "rounded-md",
        // Shadow-first segmented control (ADR 0023): elevation-1 hairline ring
        // defines the track; the active thumb lifts within it. The track sits on
        // a recessed container-low tone (ADR 0024 tonal ladder) so the lifted
        // overlay-toned thumb reads as raised in tone as well as shadow.
        "shadow-elevation-1",
        "bg-surface-container-low",
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
              "min-w-touch min-h-touch px-2",
              "rounded",
              "text-caption font-semibold",
              "transition-colors duration-micro",
              // Focus ring — 8px to match the rounded (8px) host (ADR 0024)
              "focus-ring [--focus-radius:8px]",
              isActive
                ? [
                    // Lifted "selected" thumb: lightest surface + a stronger drop
                    // (elevation-2) than the track (elevation-1), so the active
                    // segment clearly reads as raised within the control. It also
                    // carries the neutral state-layer so re-pressing the active
                    // step gives the same hover/pressed feedback as every control
                    // (ADR 0024 — one feedback language, no dead interactive).
                    "state-layer",
                    "bg-surface-overlay",
                    "text-primary",
                    "shadow-elevation-2",
                  ]
                : [
                    // #1: inactive step button at caption size — must pass 4.5:1.
                    // Promoted from tertiary to secondary.
                    "text-secondary",
                    "hover:text-primary",
                    // ADR 0024: ghost hover via the uniform neutral state-layer
                    // (replaces the bespoke hover:bg-surface-base wash).
                    "state-layer",
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
