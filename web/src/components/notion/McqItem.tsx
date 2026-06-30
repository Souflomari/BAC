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
 * State is local to the component — no localStorage, no cookies.
 * Math in stems and choices is rendered via KaTeX.
 */

import { useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { NotionItem, NotionChoice } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ResultIcon } from "@/components/ui/Icon";

// ── Math-aware text renderer ──────────────────────────────────────────────────
function MathText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("math-text", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: false, trust: false }]]}
        components={{
          p: ({ children }) => <span>{children}</span>,
        }}
      >
        {children}
      </ReactMarkdown>
    </span>
  );
}

// ── Choice state ──────────────────────────────────────────────────────────────
type ChoiceState = "idle" | "selected-correct" | "selected-incorrect";

// ── Individual choice button ──────────────────────────────────────────────────
interface ChoiceButtonProps {
  choice: NotionChoice;
  index: number;
  answered: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  itemId: string;
}

const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F"];

function ChoiceButton({
  choice,
  index,
  answered,
  selectedId,
  onSelect,
  itemId,
}: ChoiceButtonProps) {
  const isSelected = selectedId === choice.id;
  const label = CHOICE_LABELS[index] ?? String(index + 1);
  const feedbackId = `${itemId}-choice-${choice.id}-feedback`;

  let state: ChoiceState = "idle";
  if (answered && isSelected) {
    state = choice.correct ? "selected-correct" : "selected-incorrect";
  }

  const isRevealedCorrect = answered && choice.correct && !isSelected;

  return (
    <li>
      <button
        type="button"
        disabled={answered}
        onClick={() => !answered && onSelect(choice.id)}
        aria-pressed={isSelected}
        aria-describedby={isSelected && answered ? feedbackId : undefined}
        className={cn(
          // Base layout
          "w-full flex items-start gap-3",
          "text-left",
          "px-4 py-3",
          "rounded-lg",
          "border",
          // Typography
          "text-body font-regular",
          // Transition — 250ms (standard) ease-between for correctness reveals
          "transition-all duration-standard ease-between",
          // Touch target ≥ 48px (§9)
          "min-h-[48px]",
          // Focus ring — migrated to .focus-ring utility; match the rounded-lg
          // (12px) corner so the outline rounds with the host (ADR 0024).
          "focus-ring [--focus-radius:12px]",
          // Idle state: elevation-1 at rest, elevation-2 on hover, flat on press.
          // #6: accent-wash on hover removed (calm-load — reading/thinking surface).
          // .state-layer provides the ONE neutral hover/pressed feedback language;
          // elevation lift + border change + active:scale remain for tactility.
          state === "idle" && !isRevealedCorrect && [
            "state-layer",
            "bg-[var(--color-surface-raised)]",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-1",
            "hover:shadow-elevation-2",
            "hover:border-[var(--color-border-soft)]",
            "active:shadow-elevation-0",
            "active:scale-[0.99]",
            "cursor-pointer",
          ],
          // Selected & correct
          state === "selected-correct" && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-0",
            "cursor-default",
          ],
          // Selected & incorrect
          state === "selected-incorrect" && [
            "bg-[var(--color-error-subtle)]",
            "border-[var(--color-error)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-0",
            "cursor-default",
          ],
          // After answering: reveal correct answer (unselected) — keep its
          // success colors fully lit (it is the answer to read), not dimmed.
          isRevealedCorrect && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-0",
            "cursor-default",
          ],
          // After answering: non-selected, non-correct — the single inert
          // dimmed treatment (.state-disabled = one opacity + inert).
          answered && !isSelected && !isRevealedCorrect && [
            "state-disabled",
            "bg-[var(--color-surface-raised)]",
            "border-[var(--color-border-subtle)]",
            "shadow-elevation-0",
          ]
        )}
      >
        {/* Choice label letter — A, B, C, D… */}
        <span
          className={cn(
            "flex-shrink-0 flex items-center justify-center",
            "w-6 h-6 rounded-sm mt-0.5",
            "text-caption font-semibold",
            "transition-colors duration-standard ease-between",
            state === "idle" && !isRevealedCorrect && [
              "bg-[var(--color-border-subtle)]",
              "text-[var(--color-text-secondary)]",
            ],
            // On-semantic text: a letter on a FILLED success/error chip uses the
            // on-color (dark-mode contrast fix — text-white fails where the dark
            // success/error fills are light).
            state === "selected-correct" && [
              "bg-[var(--color-success)]",
              "text-success-on",
            ],
            state === "selected-incorrect" && [
              "bg-[var(--color-error)]",
              "text-error-on",
            ],
            isRevealedCorrect && [
              "bg-[var(--color-success)]",
              "text-success-on",
            ],
            answered && !isSelected && !isRevealedCorrect && [
              "bg-[var(--color-border-subtle)]",
              // #1: 12px letter badge text — promoted from tertiary to secondary
              "text-[var(--color-text-secondary)]",
            ]
          )}
          aria-hidden="true"
        >
          {label}
        </span>

        {/* Choice content — may contain KaTeX */}
        <span className="flex-1 min-w-0">
          <MathText>{choice.text}</MathText>

          {/* Animated correctness indicator — color + icon + text (never color alone §9) */}
          {isSelected && answered && (
            <span
              className={cn(
                "ml-2 inline-flex items-center gap-1",
                "text-caption font-semibold",
                state === "selected-correct" && "text-[var(--color-success)]",
                state === "selected-incorrect" && "text-[var(--color-error)]"
              )}
              aria-hidden="true"
            >
              {state === "selected-correct"
                ? (
                  <>
                    <ResultIcon kind="correct" animate size={16} />
                    <span>correct</span>
                  </>
                )
                : (
                  <>
                    <ResultIcon kind="incorrect" animate size={16} />
                    <span>incorrect</span>
                  </>
                )}
            </span>
          )}
        </span>
      </button>

      {/* Per-choice feedback — shown after answering, only for selected choice */}
      {isSelected && answered && choice.feedback && (
        <div
          id={feedbackId}
          role="status"
          className={cn(
            "mt-2 ml-9",
            "px-4 py-3 rounded-lg",
            "border-l-2",
            "text-body-sm",
            state === "selected-correct" && [
              "bg-[var(--color-success-subtle)]",
              "border-[var(--color-success)]",
              "text-[var(--color-text-primary)]",
            ],
            state === "selected-incorrect" && [
              "bg-[var(--color-error-subtle)]",
              "border-[var(--color-error)]",
              "text-[var(--color-text-primary)]",
            ]
          )}
        >
          <MathText>{choice.feedback}</MathText>
        </div>
      )}
    </li>
  );
}

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
            itemId={`${baseId}-item-${item.id}`}
          />
        ))}
      </ul>

      {/* Summary feedback after answering — DESIGN-BIBLE §7: immediate feedback */}
      {answered && (
        <div
          className={cn(
            "mt-5 pt-5",
            "border-t border-[var(--color-border-subtle)]",
            "flex items-center gap-2",
            "text-body-sm font-medium",
            isCorrect
              ? "text-[var(--color-success)]"
              : "text-[var(--color-error)]"
          )}
          role="status"
          aria-live="polite"
        >
          {/* SVG icon + text: never color alone (§9) */}
          <span aria-hidden="true" className="flex-shrink-0">
            {isCorrect
              ? <ResultIcon kind="correct" size={14} />
              : <ResultIcon kind="incorrect" size={14} />}
          </span>
          <span>
            {isCorrect
              ? "Bonne réponse."
              : "Réponse incorrecte — voir le détail ci-dessus."}
          </span>
        </div>
      )}

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
