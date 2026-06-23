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
 * State is local to the component — no localStorage, no cookies. The
 * session state layer (when built) will sit above this, not inside it.
 *
 * Math in stems and choices is rendered via KaTeX through the inline
 * approach: we render them as ReactMarkdown with remark-math + rehype-katex.
 */

import { useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { NotionItem, NotionChoice } from "@/lib/content";
import { cn } from "@/lib/utils";

// ── Math-aware text renderer ──────────────────────────────────────────────────
// Used for stem and choice text — both may contain KaTeX delimiters.
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
          // Unwrap the default <p> wrapper so inline math stays inline
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

  // After answering, reveal which answer is correct even if not selected
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
          // Transition — DESIGN-BIBLE §5: micro 100–200ms
          "transition-all duration-[150ms] ease-out",
          // Touch target ≥ 48px (§9)
          "min-h-[48px]",
          // Focus ring (§9)
          "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2",
          // Idle state
          state === "idle" && !isRevealedCorrect && [
            "bg-[var(--color-surface-raised)]",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-text-primary)]",
            "hover:border-[var(--color-border-soft)]",
            "hover:bg-[var(--color-accent-subtle)]",
            "cursor-pointer",
          ],
          // Selected & correct
          state === "selected-correct" && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "cursor-default",
          ],
          // Selected & incorrect
          state === "selected-incorrect" && [
            "bg-[var(--color-error-subtle)]",
            "border-[var(--color-error)]",
            "text-[var(--color-text-primary)]",
            "cursor-default",
          ],
          // After answering: reveal correct answer (unselected)
          isRevealedCorrect && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "opacity-80",
            "cursor-default",
          ],
          // After answering: non-selected, non-correct — dim
          answered && !isSelected && !isRevealedCorrect && [
            "opacity-50",
            "cursor-default",
            "bg-[var(--color-surface-raised)]",
            "border-[var(--color-border-subtle)]",
          ]
        )}
      >
        {/* Choice label letter — A, B, C, D… */}
        <span
          className={cn(
            "flex-shrink-0 flex items-center justify-center",
            "w-6 h-6 rounded-sm mt-0.5",
            "text-caption font-semibold",
            "transition-colors duration-[150ms]",
            state === "idle" && !isRevealedCorrect && [
              "bg-[var(--color-border-subtle)]",
              "text-[var(--color-text-secondary)]",
            ],
            state === "selected-correct" && [
              "bg-[var(--color-success)]",
              "text-white",
            ],
            state === "selected-incorrect" && [
              "bg-[var(--color-error)]",
              "text-white",
            ],
            isRevealedCorrect && [
              "bg-[var(--color-success)]",
              "text-white",
            ],
            answered && !isSelected && !isRevealedCorrect && [
              "bg-[var(--color-border-subtle)]",
              "text-[var(--color-text-tertiary)]",
            ]
          )}
          aria-hidden="true"
        >
          {label}
        </span>

        {/* Choice content — may contain KaTeX */}
        <span className="flex-1 min-w-0">
          <MathText>{choice.text}</MathText>

          {/* State icon — pairs with color so meaning is never conveyed by color alone (§9) */}
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
              {state === "selected-correct" ? "✓ correct" : "✗ incorrect"}
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
    // Immediate feedback — reveal answer the moment a choice is made
    setAnswered(true);
  }

  const selectedChoice = choices.find((c) => c.id === selectedId);
  const isCorrect = selectedChoice?.correct ?? false;

  return (
    <div
      className={cn(
        "rounded-xl",
        "border border-[var(--color-border-subtle)]",
        "bg-[var(--color-surface-raised)]",
        "p-6 md:p-8",
        "shadow-subtle"
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
            // KaTeX within the stem should render inline with prose
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
          {/* Icon + text: never color alone (§9) */}
          <span aria-hidden="true" className="text-base leading-none">
            {isCorrect ? "✓" : "✗"}
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
              "transition-colors duration-[150ms]",
              "py-1",
              "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2 rounded"
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
              // Override prose-lesson max-width inside this panel
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
