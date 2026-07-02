"use client";

/**
 * AttemptFirstExercise — the staged-reveal exercise (Day-5, audit C1 fix).
 *
 * THE CONTRACT (template v2, docs/pipeline/NOTION-TEMPLATE-V2.md):
 *   question → the student COMMITS to an attempt → the expert reasoning
 *   unlocks. Reasoning is NEVER rendered into the DOM before the commit —
 *   "printed solutions at the summit" is a template failure, and dom-truth
 *   guards it (no "Raisonnement expert" text pre-interaction).
 *
 * The commit mechanic (v1): a deliberate self-declared attempt — the student
 * clicks « J'ai fait ma tentative » after working on paper. This is honest
 * about what a static page can know; it changes the default from "solution
 * shown" to "solution earned". Future extension (spec'd, not built): an
 * mcq-commit question type that reuses ChoiceButton for closed questions.
 *
 * Calm core: no timers, no scores, no celebration, no autoplay — the reveal
 * is a render toggle (no entrance animation). Reduced-motion safe by
 * construction. Keyboard: the commit is a real <button>; the revealed
 * region is aria-live="polite".
 *
 * VISION anchor: the ramp summit is something the student DOES (VISION
 * L73-82); reasoning stays expert-annotated (L65-71) once earned.
 */

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkFrenchTypography from "@/lib/remarkFrenchTypography";
import rehypeKatex from "rehype-katex";
import type { NotionExercise, DerivationStep } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Derivation } from "./Derivation";

/** Block-level markdown + KaTeX renderer (stems and reasoning are prose). */
function MdBlock({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose-lesson max-w-none [&_.katex-display]:my-3", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm, remarkFrenchTypography]}
        rehypePlugins={[[rehypeKatex, { strict: false, trust: false }]]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

function Question({
  index,
  part,
  stem,
  reasoning,
  steps,
  qid,
}: {
  index: number;
  part?: string;
  stem: string;
  reasoning: string;
  steps?: DerivationStep[];
  qid: string;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      {part && (
        <p className="mt-8 mb-2 text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
          {part}
        </p>
      )}
      <div className="py-5 border-b border-[var(--color-border-subtle)] last:border-b-0">
        <div className="flex items-start gap-3">
          <span
            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-sm mt-1 bg-[var(--color-border-subtle)] text-caption font-semibold text-[var(--color-text-secondary)] tabular-nums"
            aria-hidden="true"
          >
            {index}
          </span>
          <div className="flex-1 min-w-0">
            <MdBlock>{stem}</MdBlock>

            {!revealed ? (
              <div className="mt-3">
                {/* The commit gate. Quiet secondary control — the reveal is
                    earned, not celebrated. */}
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-2",
                    "min-h-[48px] rounded-md",
                    "text-body-sm font-medium",
                    "text-[var(--color-text-secondary)]",
                    "border border-[var(--color-border-subtle)]",
                    "bg-[var(--color-surface-raised)]",
                    "hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-soft)]",
                    "transition-colors duration-micro",
                    "state-layer focus-ring [--focus-radius:8px]"
                  )}
                >
                  J’ai fait ma tentative — voir le raisonnement
                  <Icon name="chevron-right" size={14} />
                </button>
                <p className="mt-2 text-caption text-[var(--color-text-secondary)]">
                  Cherche d’abord sur papier — c’est la tentative qui construit
                  le réflexe, pas la lecture.
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "mt-4 px-4 py-4 rounded-lg border-l-2",
                  "border-[var(--color-accent)]",
                  "bg-[var(--color-surface-raised)]"
                )}
                role="region"
                aria-live="polite"
                aria-label="Raisonnement expert"
              >
                <p className="mb-2 text-caption font-medium uppercase tracking-[0.14em] text-accent">
                  Raisonnement expert
                </p>
                <MdBlock>{reasoning}</MdBlock>
                {/* Multi-step algebra renders as a stepped Derivation (template
                    v2 display-math rule) — the student paces the transformations. */}
                {steps && <Derivation id={`${qid}-steps`} steps={steps} bare />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function AttemptFirstExercise({ exercise }: { exercise: NotionExercise }) {
  return (
    <section
      data-exercise={exercise.id}
      aria-label={exercise.title}
      className={cn(
        "my-10",
        "rounded-xl px-6 py-6 bp-medium:px-8 bp-medium:py-8",
        "bg-surface-container-high shadow-elevation-2"
      )}
    >
      <h3 className="font-serif text-h3 font-semibold text-[var(--color-text-primary)]">
        {exercise.title}
      </h3>

      {exercise.intro && (
        <div className="mt-4">
          <MdBlock className="[&_p]:text-body-lg">{exercise.intro}</MdBlock>
        </div>
      )}

      <div className="mt-2">
        {exercise.questions.map((q, i) => (
          <Question
            key={q.id}
            qid={q.id}
            index={i + 1}
            part={q.part}
            stem={q.stem}
            reasoning={q.reasoning}
            steps={q.steps}
          />
        ))}
      </div>
    </section>
  );
}
