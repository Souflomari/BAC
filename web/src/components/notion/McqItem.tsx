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
 *
 * Answer-choice order is DETERMINISTICALLY shuffled per item (see
 * lib/shuffle.ts) — this kills the file-order answer-key bias (correct
 * answers clustering on choice A) without breaking SSR/hydration parity or
 * dom-truth's rendered-truth assertions. ChoiceButton derives the displayed
 * A/B/C/D letter from the choice's POSITION in the (already-shuffled) array
 * it's handed, never from choice.id — so shuffling here is enough; the
 * shared component needed no change.
 */

import { useState, useId, useMemo } from "react";
import type { NotionItem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChoiceButton, MathText, ResultRow } from "@/components/notion/ChoiceButton";
import { shuffledChoices } from "@/lib/shuffle";
import { useAttemptRecorder } from "@/components/notion/AttemptEvents";

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
  const { recordItemAnswer } = useAttemptRecorder();

  // Deterministic per-item shuffle (seeded by the item's own globally-unique
  // id) — same order on server render and client hydration, stable across
  // re-renders/reloads for a given item, different across items. The choice
  // objects (id, correct, feedback) are untouched; only display ORDER moves.
  const choices = useMemo(
    () => shuffledChoices(item.choices ?? [], item.id),
    [item.choices, item.id]
  );

  function handleSelect(choiceId: string) {
    if (answered) return;
    setSelectedId(choiceId);
    setAnswered(true);
    // Attempt-event write path (Lane E): fire-and-forget, from the AUTHORED
    // choices (item.choices — the shuffle reorders a copy, so the authored
    // array is the payload's stable frame of reference). Inert in off/mock
    // builds; never throws into the learning session.
    recordItemAnswer(item.id, item.choices, choiceId);
  }

  const selectedChoice = choices.find((c) => c.id === selectedId);
  const isCorrect = selectedChoice?.correct ?? false;

  const itemId = `${baseId}-item-${item.id}`;

  return (
    <div
      // Identifies this item's source (items.yaml) id in the DOM — used by
      // web/scripts/dom-truth.mjs's shuffle-order cross-check sweep to look
      // up the authored choices on disk and verify the rendered order
      // matches lib/shuffle.ts's prediction. Not used for styling/state.
      data-item-id={item.id}
      className={cn(
        "rounded-xl",
        // Surface-container tonal ladder (ADR 0024): an elevation-2 card steps UP
        // in tone (container-high), not the at-rest raised tone.
        "bg-surface-container-high",
        "p-6 bp-medium:p-8",
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
            "bg-accent-subtle",
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
            "text-body-lg text-primary",
            "leading-[1.6]",
            "[&_.katex-display]:my-3",
          // TÉLÉPHONE ÉTROIT (2026-09-04). Une formule EN LIGNE est
          // insécable : KaTeX ne coupe pas au milieu d'un $Q_r = [Cr_2O_7^{2-}]
          // \ldots$. À 320 px, quinze formules du corpus dépassaient la carte
          // d'item et poussaient la PAGE ENTIÈRE — quatre leçons glissaient
          // sous le doigt (mesuré : jusqu'à 51 px de débord). Le conteneur
          // défile donc ici, exactement comme `.katex-display` le fait déjà
          // dans la prose : rien n'est coupé, rien ne ment, et la page tient.
            "overflow-x-auto"
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
            idleSurface="bg-surface-raised"
            disabledExtra={[
              "bg-surface-raised",
              "border-subtle",
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
              // inline-flex + w-fit so the neutral state-layer wash hugs the
              // text (not the full details width); the default disclosure
              // triangle is hidden so it doesn't collide with the padded wash.
              "inline-flex w-fit items-center",
              "cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden",
              "text-body-sm font-medium text-secondary",
              "hover:text-primary",
              "transition-colors duration-micro ease-enter",
              // The one neutral hover/pressed feedback language (ADR 0024); the
              // text-color shift is the secondary cue. -mx keeps the text edge
              // aligned. 8px focus ring matches the rounded host.
              "state-layer rounded px-1.5 py-1 -mx-1.5",
              "focus-ring [--focus-radius:8px]"
            )}
          >
            Voir la solution complète
          </summary>
          <div
            className={cn(
              "mt-3 px-4 py-4",
              "bg-surface-base",
              "rounded-lg",
              "border border-subtle",
              "text-body-sm text-primary",
              "prose-lesson",
              "max-w-none",
              "[&_.katex-display]:my-2",
              // Même raison que l'énoncé ci-dessus : une solution complète
              // porte les formules les plus longues de la carte.
              "overflow-x-auto"
            )}
          >
            <MathText>{item.solution}</MathText>
          </div>
        </details>
      )}
    </div>
  );
}
