"use client";

/**
 * ChoiceButton — the single shared MCQ/checkpoint choice surface.
 *
 * De-duplicates what were two ~95%-identical hand-copies: McqItem's
 * `ChoiceButton` and CheckpointItem's `CheckpointChoiceButton`. Both now import
 * and render THIS component; their only genuine differences are expressed as
 * props, not forks:
 *
 *   - `idleSurface` — the idle option background. MCQ reads on the at-rest
 *     RAISED tone (surface-raised); the inline checkpoint reads on the BASE
 *     tone (surface-base). Everything else about the idle state (the shared
 *     .state-layer feedback language, elevation lift, border change,
 *     active:scale press) is identical and lives here.
 *   - `disabledExtra` — the post-answer non-selected/non-correct row. The two
 *     originals diverged only in their surface var and whether they pinned
 *     `cursor-default`; this prop carries those exact extra classes so each
 *     component's rendered class set is preserved byte-for-byte.
 *   - `feedbackId` — the per-choice feedback element id is wired by the caller
 *     (the two used different id schemes), so aria-describedby is preserved.
 *
 * The diagnostic-feedback slot itself is identical markup in both: the
 * checkpoint's "names the wrong model" behavior comes from the CONTENT in
 * `choice.feedback`, not the rendering. So the feedback block is shared; only
 * the slot's id is parameterized.
 *
 * This module also exports the shared `MathText` (KaTeX-aware text renderer) and
 * `ResultRow` (the calm binary summary row) that were duplicated verbatim in
 * both files.
 *
 * Every ADR 0024 detail is preserved exactly: the .state-layer / .state-disabled
 * classes, the focus-ring [--focus-radius:12px], the ResultIcon usage, the
 * text-success-on / text-error-on badge colors, the success/error/
 * revealed-correct state styling, the duration/ease tokens, and all aria/roles/
 * keyboard wiring. This is a pure de-duplication refactor — pixels and a11y do
 * not change.
 */

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkFrenchTypography from "@/lib/remarkFrenchTypography";
import rehypeKatex from "rehype-katex";
import type { NotionChoice } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ResultIcon } from "@/components/ui/Icon";

// ── Math-aware text renderer ──────────────────────────────────────────────────
export function MathText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("math-text", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkFrenchTypography]}
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

export const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F"];

// ── Individual choice button ──────────────────────────────────────────────────
export interface ChoiceButtonProps {
  choice: NotionChoice;
  index: number;
  answered: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Fully-resolved id for the per-choice feedback element (aria-describedby). */
  feedbackId: string;
  /**
   * Idle option background utility. MCQ: "bg-[var(--color-surface-raised)]";
   * inline checkpoint: "bg-[var(--color-surface-base)]".
   */
  idleSurface: string;
  /**
   * Extra classes for the post-answer non-selected/non-correct row, appended
   * after the shared `state-disabled`. Carries each call site's exact surface
   * + cursor classes so the rendered class set is preserved verbatim.
   */
  disabledExtra: string[];
}

export function ChoiceButton({
  choice,
  index,
  answered,
  selectedId,
  onSelect,
  feedbackId,
  idleSurface,
  disabledExtra,
}: ChoiceButtonProps) {
  const isSelected = selectedId === choice.id;
  const label = CHOICE_LABELS[index] ?? String(index + 1);

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
            idleSurface,
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
          // dimmed treatment (.state-disabled = one opacity + inert). The extra
          // surface/cursor classes are supplied per call site (idleSurface base
          // tone vs raised tone; checkpoint pins cursor-default).
          answered && !isSelected && !isRevealedCorrect && [
            "state-disabled",
            ...disabledExtra,
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

      {/* Per-choice feedback — shown after answering, only for selected choice.
          Identical markup across MCQ and checkpoint; the checkpoint's
          model-naming is carried by choice.feedback content, not the slot. */}
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

// ── Shared summary/result row ─────────────────────────────────────────────────
//
// The calm, binary post-answer summary — no score, no tally, no celebration.
// Identical in McqItem and CheckpointItem; shared here. Renders nothing until
// answered (the caller previously guarded with `answered && (...)`; kept here so
// the call sites read the same).
export function ResultRow({
  answered,
  isCorrect,
}: {
  answered: boolean;
  isCorrect: boolean;
}) {
  if (!answered) return null;

  return (
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
  );
}
