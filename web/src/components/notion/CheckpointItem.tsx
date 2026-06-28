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
import { cn } from "@/lib/utils";

// ── Animated stroke icons ─────────────────────────────────────────────────────
//
// The check/cross path is drawn via CSS stroke-dashoffset animation.
// On mount (when `animate` becomes true) the dash offset transitions from
// the full path length to 0, stroking the path on.
//
// Path lengths (approximate, ViewBox 0 0 14 14):
//   check "M2 7l3.5 3.5L12 3" ≈ 14px → pathLength="14"
//   cross two-diag             ≈ 11.3 + 11.3 = uses pathLength="12" per segment
//
// We use SVG pathLength="1" and strokeDasharray="1" so the animation is
// unit-independent and works at any size. The transition-duration matches
// the 300ms spec. Reduced-motion: globals.css collapses all transitions to
// 0.01ms so the icon appears instantly in its final drawn state.

function AnimatedCheckIcon({ animate, className }: { animate: boolean; className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 8.5L6 12L13.5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: animate ? 0 : 1,
          transition: animate
            ? "stroke-dashoffset 300ms cubic-bezier(0.2, 0, 0, 1)"
            : "none",
        }}
      />
    </svg>
  );
}

function AnimatedCrossIcon({ animate, className }: { animate: boolean; className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 4L12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: animate ? 0 : 1,
          transition: animate
            ? "stroke-dashoffset 300ms cubic-bezier(0.2, 0, 0, 1)"
            : "none",
        }}
      />
      <path
        d="M12 4L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          // Slight stagger: second arm starts at 150ms delay
          strokeDashoffset: animate ? 0 : 1,
          transition: animate
            ? "stroke-dashoffset 300ms 150ms cubic-bezier(0.2, 0, 0, 1)"
            : "none",
        }}
      />
    </svg>
  );
}

// ── Small static icons for inline use (non-animated, summary row) ─────────────
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
          // Transition: all properties for smooth correctness reveal
          "transition-all duration-[250ms] ease-between",
          "min-h-[48px]",
          // Focus ring — migrated to .focus-ring utility
          "focus-ring",
          // Elevation at rest → elevated on hover; pressed: flat
          state === "idle" && !isRevealedCorrect && [
            "bg-[var(--color-surface-base)]",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-text-primary)]",
            "shadow-elevation-1",
            "hover:shadow-elevation-2",
            "hover:border-[var(--color-border-soft)]",
            "hover:bg-[var(--color-accent-subtle)]",
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
            "opacity-80",
            "shadow-elevation-0",
            "cursor-default",
          ],
          answered && !isSelected && !isRevealedCorrect && [
            "opacity-50",
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
            "transition-colors duration-[250ms] ease-between",
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
                    <AnimatedCheckIcon animate={true} />
                    <span>correct</span>
                  </>
                )
                : (
                  <>
                    <AnimatedCrossIcon animate={true} />
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
        "border border-[var(--color-border-soft)]",
        "bg-[var(--color-accent-subtle)]",
        // elevation-2 — checkpoint card (per TOKENS.md §6.3)
        "shadow-elevation-2",
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
            "bg-accent/10",
            "border border-accent/20",
            "text-caption font-medium text-accent",
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
