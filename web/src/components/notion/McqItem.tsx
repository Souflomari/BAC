"use client";

/**
 * McqItem
 *
 * Renders a single MCQ item from items.yaml with immediate per-choice feedback.
 *
 * DESIGN-BIBLE §7:
 * - Immediate, per-action feedback (non-negotiable: required for flow AND learning)
 * - No engagement theater (no confetti, no XP, no streak display)
 * - Keyboard navigable (§9)
 * - Color never conveys meaning alone — paired with icons and text (§2, §9)
 *
 * Phase 4 craft additions:
 * - Correct/incorrect indicator: animated stroke-dashoffset reveal over 300ms
 *   (one-shot check/cross draw-on). Reduced-motion: instant end-state.
 * - shadow-elevation-2 on the card container.
 * - Option rows: shadow-elevation-1 at rest → elevation-2 on hover;
 *   active/pressed: scale 0.99, elevation-0 (tactile press feedback).
 * - Focus rings migrated to .focus-ring utility.
 * - Transition on correctness reveal: 250ms ease-between.
 *
 * The per-choice option surface, the KaTeX-aware MathText renderer, and the calm
 * binary summary row are the SHARED ChoiceButton / MathText / ResultRow (one
 * source of truth across MCQ + checkpoint — see ChoiceButton.tsx). The only MCQ
 * specifics are passed as props: the idle option reads on the at-rest RAISED
 * surface tone.
 *
 * State is local to the component — no localStorage, no cookies.
 * Math in stems and choices is rendered via KaTeX.
 */

import { useState, useId } from "react";
import type { NotionItem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChoiceButton, MathText, ResultRow } from "@/components/notion/ChoiceButton";

// ── Main McqItem component ────────────────────────────────────────────────────
interface McqItemProps {
  item: NotionItem;
  /** Index within the item list (1-based display number) */
  index: number;
}

export function McqItem({ item, index }: McqItemProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const baseId = useId();

  const choices = item.choices ?? [];

  function handleSelect(choiceId: string) {
    if (answered) return;
    setSelectedId(choiceId);
    setAnswered(true);
  }

  const selectedChoice = choices.find((c) => c.id === selectedId);
  const isCorrect = selectedChoice?.correct ?? false;

  const itemId = `${baseId}-item-${item.id}`;

  return (
    <div
      className={cn(
        "rounded-xl",
        // Surface-container tonal ladder (ADR 0024): an elevation-2 card steps UP
        // in tone (container-high), not the at-rest raised tone.
        "bg-surface-container-high",
        "p-6 md:p-8",
        // Shadow-first card (ADR 0023): elevation-2 hairline ring holds the edge;
        // the drawn border is dropped.
        "shadow-elevation-2"
      )}
    >
      {/* Item header */}
      <div className="flex items-start gap-3 mb-5">
        {/* Question number — visible, unambiguous */}
        <span
          className={cn(
            "flex-shrink-0",
            "w-7 h-7 rounded-full",
            "flex items-center justify-center",
            "bg-[var(--color-accent-subtle)]",
            "text-caption font-semibold text-accent",
            "mt-0.5"
          )}
          aria-hidden="true"
        >
          {index}
        </span>

        {/* Stem — may contain KaTeX */}
        <div
          className={cn(
            "flex-1 min-w-0",
            "text-body-lg text-[var(--color-text-primary)]",
            "leading-[1.6]",
            "[&_.katex-display]:my-3"
          )}
        >
          <MathText>{item.stem}</MathText>
        </div>
      </div>

      {/* Choices */}
      <ul
        role="list"
        className="space-y-2"
        aria-label={`Choix pour la question ${index}`}
      >
        {choices.map((choice, i) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            index={i}
            answered={answered}
            selectedId={selectedId}
            onSelect={handleSelect}
            feedbackId={`${itemId}-choice-${choice.id}-feedback`}
            idleSurface="bg-[var(--color-surface-raised)]"
            disabledExtra={[
              "bg-[var(--color-surface-raised)]",
              "border-[var(--color-border-subtle)]",
              "shadow-elevation-0",
            ]}
          />
        ))}
      </ul>

      {/* Summary feedback after answering — DESIGN-BIBLE §7: immediate feedback */}
      <ResultRow answered={answered} isCorrect={isCorrect} />

      {/* Solution — shown after answering, when available */}
      {answered && item.solution && (
        <details className="mt-4">
          <summary
            className={cn(
              "cursor-pointer select-none",
              "text-body-sm font-medium text-[var(--color-text-secondary)]",
              "hover:text-[var(--color-text-primary)]",
              "transition-colors duration-micro ease-enter",
              "py-1 rounded",
              // Focus ring — migrated to .focus-ring utility
              "focus-ring"
            )}
          >
            Voir la solution complète
          </summary>
          <div
            className={cn(
              "mt-3 px-4 py-4",
              "bg-[var(--color-surface-base)]",
              "rounded-lg",
              "border border-[var(--color-border-subtle)]",
              "text-body-sm text-[var(--color-text-primary)]",
              "prose-lesson",
              "max-w-none",
              "[&_.katex-display]:my-2"
            )}
          >
            <MathText>{item.solution}</MathText>
          </div>
        </details>
      )}
    </div>
  );
}
