"use client";

/**
 * CheckpointItem
 *
 * Renders an inline formative checkpoint MCQ from checkpoints.yaml.
 *
 * DESIGN-BIBLE §0 / §7: calm-core — NO score, NO streak, NO tally,
 * NO celebratory animation. Per-choice feedback names the wrong model
 * on a wrong pick (diagnostic, not just "incorrect"). Immediate, per-action.
 *
 * Phase 4 craft additions:
 * - Correct/incorrect indicator uses a CSS stroke-dashoffset reveal:
 *   the check or cross path strokes on over ~300ms (one-shot, no loop).
 *   Reduced-motion: the path is immediately at full dashoffset = 0
 *   (end state, no animation). Color-not-alone: icon + color + text.
 * - shadow-elevation-2 on the card container (per token spec).
 * - Option rows: shadow-elevation-1 at rest → elevation-2 on hover;
 *   active/pressed: scale 0.99 + elevation-0 (pressed-in feel).
 * - Focus rings migrated to .focus-ring utility.
 *
 * The per-choice option surface, the KaTeX-aware MathText renderer, and the calm
 * binary summary row are the SHARED ChoiceButton / MathText / ResultRow (one
 * source of truth across MCQ + checkpoint — see ChoiceButton.tsx). The only
 * checkpoint specifics are passed as props: the idle option reads on the BASE
 * surface tone (the inline checkpoint sits a tone below the MCQ's raised option),
 * and its post-answer dimmed row pins cursor-default on that base tone. The
 * diagnostic "names the wrong model" feedback is carried by choice.feedback
 * content — the rendered slot is the same shared markup.
 *
 * No browser storage — state is local React state only.
 * Keyboard navigable; .focus-ring on all interactive elements.
 * Math in stems/choices rendered via KaTeX.
 */

import { useState, useId } from "react";
import type { CheckpointItem as CheckpointItemType } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";
import { ChoiceButton, MathText, ResultRow } from "@/components/notion/ChoiceButton";

// ── Main CheckpointItem component ─────────────────────────────────────────────

interface CheckpointItemProps {
  item: CheckpointItemType;
}

export function CheckpointItem({ item }: CheckpointItemProps) {
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
        // Neutral raised surface — NOT an accent wash (ADR 0023 converge): the
        // accent leads in exactly one place per surface, so the checkpoint reads
        // as a distinct lifted card (elevation-2 ring), with the accent confined
        // to its eyebrow. Matches the MCQ card's material; fixes dark separation.
        // Surface-container tonal ladder (ADR 0024): an elevation-2 card steps UP
        // in tone, so it reads as raised through tone as well as shadow.
        "bg-surface-container-high",
        "shadow-elevation-2",
        "p-6 md:p-8",
      )}
      aria-label="Vérifie ta compréhension"
    >
      {/* Checkpoint eyebrow — the shared Eyebrow component (one eyebrow language
          across the product, ADR 0023). Decorative: the card carries its own
          aria-label, so the eyebrow is hidden from assistive tech. */}
      <Eyebrow className="mb-4" decorative>
        Vérifie ta compréhension
      </Eyebrow>

      {/* Stem */}
      <div
        className={cn(
          "mb-5",
          "text-body-lg text-[var(--color-text-primary)]",
          "leading-[1.6]",
          "[&_.katex-display]:my-3"
        )}
      >
        <MathText>{item.stem}</MathText>
      </div>

      {/* Choices */}
      <ul
        role="list"
        className="space-y-2"
        aria-label="Choix"
      >
        {choices.map((choice, i) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            index={i}
            answered={answered}
            selectedId={selectedId}
            onSelect={handleSelect}
            feedbackId={`${itemId}-cp-choice-${choice.id}-fb`}
            idleSurface="bg-[var(--color-surface-base)]"
            disabledExtra={[
              // The single dimmed/inert treatment (ADR 0024) replaces opacity-50.
              "cursor-default",
              "bg-[var(--color-surface-base)]",
              "border-[var(--color-border-subtle)]",
              "shadow-elevation-0",
            ]}
          />
        ))}
      </ul>

      {/* Summary result — calm, binary; no score, no tally, no celebration */}
      <ResultRow answered={answered} isCorrect={isCorrect} />
    </div>
  );
}
