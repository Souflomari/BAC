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
 * No browser storage — state is local React state only.
 * Keyboard navigable; .focus-ring on all interactive elements.
 * Math in stems/choices rendered via KaTeX.
 */

import { useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { CheckpointItem as CheckpointItemType, NotionChoice } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ResultIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

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
          // Transition: all properties for smooth correctness reveal
          "transition-all duration-standard ease-between",
          "min-h-[48px]",
          // Focus ring — migrated to .focus-ring utility; rounded-lg (12px) corner
          // so the outline radius tracks the host via --focus-radius.
          "focus-ring [--focus-radius:12px]",
          // Elevation at rest → elevated on hover; pressed: flat.
          // #6: accent-wash on hover removed (calm-load — reading/thinking surface).
          // The neutral hover/pressed feedback now rides on the shared .state-layer
          // overlay (one feedback language, ADR 0024); elevation lift + border
          // change remain for tactile feedback.
          state === "idle" && !isRevealedCorrect && [
            "state-layer",
            "bg-[var(--color-surface-base)]",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-1",
            "hover:shadow-elevation-2",
            "hover:border-[var(--color-border-soft)]",
            "active:shadow-elevation-0",
            "active:scale-[0.99]",
            "cursor-pointer",
          ],
          state === "selected-correct" && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-0",
            "cursor-default",
          ],
          state === "selected-incorrect" && [
            "bg-[var(--color-error-subtle)]",
            "border-[var(--color-error)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-0",
            "cursor-default",
          ],
          isRevealedCorrect && [
            "bg-[var(--color-success-subtle)]",
            "border-[var(--color-success)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-0",
            "cursor-default",
          ],
          answered && !isSelected && !isRevealedCorrect && [
            // The single dimmed/inert treatment (ADR 0024) replaces opacity-50.
            "state-disabled",
            "cursor-default",
            "bg-[var(--color-surface-base)]",
            "border-[var(--color-border-subtle)]",
            "shadow-elevation-0",
          ]
        )}
      >
        {/* Letter label */}
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
            // On-semantic text colors (dark-mode contrast): a letter sitting ON a
            // filled success/error chip uses the on-color, not text-white.
            state === "selected-correct" && ["bg-[var(--color-success)]", "text-success-on"],
            state === "selected-incorrect" && ["bg-[var(--color-error)]", "text-error-on"],
            isRevealedCorrect && ["bg-[var(--color-success)]", "text-success-on"],
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

        {/* Choice text + animated correctness indicator */}
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
    </div>
  );
}
