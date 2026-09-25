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
 *
 * Answer-choice order is DETERMINISTICALLY shuffled per item (see
 * lib/shuffle.ts and the same note in McqItem.tsx) — kills the file-order
 * answer-key bias without breaking SSR/hydration parity. ChoiceButton derives
 * the displayed letter from array position, so no change was needed there.
 */

import { useState, useId, useMemo } from "react";
import type { CheckpointItem as CheckpointItemType } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";
import { ChoiceButton, MathText, ResultRow } from "@/components/notion/ChoiceButton";
import { shuffledChoices } from "@/lib/shuffle";
import { useAttemptRecorder } from "@/components/notion/AttemptEvents";

// ── Main CheckpointItem component ─────────────────────────────────────────────

interface CheckpointItemProps {
  item: CheckpointItemType;
}

export function CheckpointItem({ item }: CheckpointItemProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const baseId = useId();
  const { recordCheckpointAnswer } = useAttemptRecorder();

  // Deterministic per-item shuffle — see McqItem.tsx for the full rationale.
  const choices = useMemo(
    () => shuffledChoices(item.choices ?? [], item.id),
    [item.choices, item.id]
  );

  function handleSelect(choiceId: string) {
    if (answered) return;
    setSelectedId(choiceId);
    setAnswered(true);
    // Attempt-event write path (Lane E) — same shape as McqItem: authored
    // choices as the frame of reference, fire-and-forget, inert off-mode.
    recordCheckpointAnswer(item.id, item.choices, choiceId);
  }

  const selectedChoice = choices.find((c) => c.id === selectedId);
  const isCorrect = selectedChoice?.correct ?? false;

  const itemId = `${baseId}-item-${item.id}`;

  return (
    <div
      // Identifie le point d'arrêt (checkpoints.yaml) dans le DOM, comme
      // `data-item-id` le fait pour McqItem. AJOUTÉ le 2026-09-22 (§11.185) :
      // sans lui, les 132 points d'arrêt du corpus — la PREMIÈRE chose qu'un
      // élève rencontre dans une leçon, avant la banque de fin — n'étaient
      // identifiables par aucun instrument, donc leur verdict n'était vérifié
      // nulle part. Ne sert ni au style ni à l'état.
      data-checkpoint-id={item.id}
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
        "p-6 bp-medium:p-8",
      )}
      aria-label="Vérifie ta compréhension"
    >
      {/* Checkpoint eyebrow — the shared Eyebrow component (one eyebrow language
          across the product, ADR 0023). Decorative: the card carries its own
          aria-label, so the eyebrow is hidden from assistive tech. */}
      {/* muted (audit R6, P0-2) : un eyebrow de carte pédagogique en accent
          diluait la marque de l'action — l'accent est réservé à « voici
          l'action », pas aux étiquettes. */}
      <Eyebrow tone="muted" className="mb-4" decorative>
        Vérifie ta compréhension
      </Eyebrow>

      {/* Stem */}
      <div
        className={cn(
          "mb-5",
          "text-body-lg text-primary",
          "leading-[1.6]",
          "[&_.katex-display]:my-3",
          // Même défaut, même correctif que McqItem : une formule en ligne
          // insécable ne doit pas pousser la page sur un téléphone étroit.
          "overflow-x-auto"
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
            // Tone/shadow agreement (ADR 0024): the checkpoint is now a card
            // (container-high + elevation-2), identical to the MCQ card — so its
            // option rows read on the same RAISED tone (surface-raised) as the
            // MCQ rows, not the page BASE tone. An elevation-1 chip toned at the
            // page base contradicted its own lift; surface-raised resolves it.
            idleSurface="bg-surface-raised"
            // Un point d'arrêt n'a pas de `solution` : sans ceci, l'élève qui
            // se trompe verrait la bonne réponse surlignée sans jamais lire
            // pourquoi elle est bonne. Voir ChoiceButton.revealCorrectFeedback.
            revealCorrectFeedback
            disabledExtra={[
              // The single dimmed/inert treatment (ADR 0024) replaces opacity-50.
              "cursor-default",
              "bg-surface-raised",
              "border-subtle",
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
