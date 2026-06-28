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
 * Reuses the same visual MCQ logic as McqItem. Wrapped in a distinctive
 * "Vérifie ta compréhension" surface so the student knows it is a checkpoint,
 * not a section heading.
 *
 * No browser storage — state is local React state only.
 * Keyboard navigable; focus states match McqItem's ring standard.
 * Math in stems/choices rendered via KaTeX (remark-math + rehype-katex).
 */

import { useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { CheckpointItem as CheckpointItemType, NotionChoice } from "@/lib/content";
import { cn } from "@/lib/utils";

// ── SVG icons — inline, no emoji (§9) ────────────────────────────────────────
function IconCorrect({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconIncorrect({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  );
}

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

const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F"];

// ── Individual choice button ──────────────────────────────────────────────────
interface ChoiceButtonProps {
  choice: NotionChoice;
  index: number;
  answered: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  baseId: string;
}

function CheckpointChoiceButton({
  choice,
  index,
  answered,
  selectedId,
  onSelect,
  baseId,
}: ChoiceButtonProps) {
  const isSelected = selectedId === choice.id;
  const label = CHOICE_LABELS[index] ?? String(index + 1);
  const feedbackId = `${baseId}-cp-choice-${choice.id}-fb`;

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
          "w-full flex items-start gap-3",
          "text-left",
          "px-4 py-3",
          "rounded-lg",
          "border",
          "text-body font-regular",
          "transition-all duration-[150ms] ease-out",
          "min-h-[48px]",
          "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2",
          state === "idle" && !isRevealedCorrect && [
            "bg-[var(--color-surface-base)]",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-text-primary)]",
            "hover:border-[var(--color-border-soft)]",
            "hover:bg-[var(--color-accent-subtle)]",
            "cursor-pointer",
          ],
          state === "selected-correct" && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "cursor-default",
          ],
          state === "selected-incorrect" && [
            "bg-[var(--color-error-subtle)]",
            "border-[var(--color-error)]",
            "text-[var(--color-text-primary)]",
            "cursor-default",
          ],
          isRevealedCorrect && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "opacity-80",
            "cursor-default",
          ],
          answered && !isSelected && !isRevealedCorrect && [
            "opacity-50",
            "cursor-default",
            "bg-[var(--color-surface-base)]",
            "border-[var(--color-border-subtle)]",
          ]
        )}
      >
        {/* Letter label */}
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
            state === "selected-correct" && ["bg-[var(--color-success)]", "text-white"],
            state === "selected-incorrect" && ["bg-[var(--color-error)]", "text-white"],
            isRevealedCorrect && ["bg-[var(--color-success)]", "text-white"],
            answered && !isSelected && !isRevealedCorrect && [
              "bg-[var(--color-border-subtle)]",
              "text-[var(--color-text-tertiary)]",
            ]
          )}
          aria-hidden="true"
        >
          {label}
        </span>

        {/* Choice text */}
        <span className="flex-1 min-w-0">
          <MathText>{choice.text}</MathText>
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
                ? <><IconCorrect /> correct</>
                : <><IconIncorrect /> incorrect</>}
            </span>
          )}
        </span>
      </button>

      {/* Per-choice feedback — model-naming, shown only for selected choice */}
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

  return (
    <div
      className={cn(
        // Distinctive surface — slightly inset feel to signal "pause and check"
        "rounded-xl",
        "border border-[var(--color-border-soft)]",
        "bg-[var(--color-accent-subtle)]",
        "p-6 md:p-8",
      )}
      aria-label="Vérifie ta compréhension"
    >
      {/* Checkpoint badge — calm, not flashy */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={cn(
            "inline-flex items-center",
            "px-2.5 py-0.5",
            "rounded-full",
            "bg-[#3E5C86] bg-opacity-10",
            "border border-[#3E5C86] border-opacity-20",
            "text-caption font-medium text-[#3E5C86]",
            "uppercase tracking-wide"
          )}
          aria-hidden="true"
        >
          Vérifie ta compréhension
        </span>
      </div>

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
          <CheckpointChoiceButton
            key={choice.id}
            choice={choice}
            index={i}
            answered={answered}
            selectedId={selectedId}
            onSelect={handleSelect}
            baseId={`${baseId}-item-${item.id}`}
          />
        ))}
      </ul>

      {/* Summary result — calm, binary; no score, no tally, no celebration */}
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
          <span aria-hidden="true" className="flex-shrink-0">
            {isCorrect ? <IconCorrect /> : <IconIncorrect />}
          </span>
          <span>
            {isCorrect
              ? "Bonne réponse."
              : "Réponse incorrecte — voir le détail ci-dessus."}
          </span>
        </div>
      )}
    </div>
  );
}
