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
import rehypeKatexHtml from "@/lib/rehypeKatexHtml";
import rehypeDirectionRtl from "@/lib/rehypeDirectionRtl";
import { KatexSpan } from "./KatexSpan";
import type { NotionExercise, ExerciseQuestion, DerivationStep } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Derivation } from "./Derivation";
import { useAttemptRecorder } from "./AttemptEvents";
import { frenchTypography } from "@/lib/frenchTypography";

/** Block-level markdown + KaTeX renderer (stems and reasoning are prose).
 *  Exported so the bank card's intro renders identically (BANK-SPEC §3). */
export function MdBlock({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose-lesson max-w-none [&_.katex-display]:my-3", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm, remarkFrenchTypography]}
        rehypePlugins={[
          [rehypeKatexHtml, { strict: false, trust: false }],
          rehypeDirectionRtl,
        ]}
        components={{ span: KatexSpan }}
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
  exerciseId,
}: {
  index: number;
  part?: string;
  stem: string;
  reasoning: string;
  steps?: DerivationStep[];
  qid: string;
  exerciseId: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const { recordExerciseReveal } = useAttemptRecorder();

  function handleReveal() {
    if (revealed) return;
    setRevealed(true);
    // Attempt-event write path (Lane E): the self-declared attempt commit is
    // the honest observable — recorded as kind "exercise_reveal" with
    // item_id "<exercise_id>:<question_id>" (nulls for choice/correctness,
    // per draft-048). Fire-and-forget, inert in off/mock builds.
    recordExerciseReveal(exerciseId, qid);
  }

  return (
    <>
      {part && (
        <p className="mt-8 mb-2 text-caption font-medium uppercase tracking-eyebrow text-secondary">
          {frenchTypography(part)}
        </p>
      )}
      <div className="py-5 border-b border-subtle last:border-b-0">
        <div className="flex items-start gap-3">
          <span
            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-sm mt-1 bg-border-subtle text-caption font-semibold text-secondary tabular-nums"
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
                  onClick={handleReveal}
                  className={cn(
                    // `max-w-full text-left` : à 200 % de texte (SC 1.4.4) ce bouton prenait
                    // sa largeur max-content (255 px) dans une colonne de 208 et poussait la
                    // page de 47 px sur 15 leçons. Il se replie maintenant dans sa colonne.
                    "inline-flex items-center gap-1.5 px-3 py-2 max-w-full text-left",
                    "min-h-touch rounded-md",
                    "text-body-sm font-medium",
                    "text-secondary",
                    "border border-subtle",
                    "bg-surface-raised",
                    "hover:text-primary hover:border-soft",
                    "transition-colors duration-micro",
                    "state-layer focus-ring [--focus-radius:8px]"
                  )}
                >
                  {/* Le libellé dans un `span` à `min-w-0 break-words` (2026-09-05) :
                      un nœud texte nu est un item flex ANONYME, et rien ne peut lui
                      donner `min-w-0`. À 200 % de texte sur 320 px, la colonne de
                      question fait 88 px et « raisonnement » en fait 200 : le texte
                      sortait du bouton et poussait la PAGE de 36 px sur 49 leçons. */}
                  <span className="min-w-0 break-words">J’ai fait ma tentative — voir le raisonnement</span>
                  <Icon name="chevron-right" size={14} className="shrink-0" />
                </button>
                <p className="mt-2 text-caption text-secondary">
                  Cherche d’abord sur papier — c’est la tentative qui construit
                  le réflexe, pas la lecture.
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "mt-4 px-4 py-4 rounded-lg border-l-2",
                  "border-accent",
                  "bg-surface-raised"
                )}
                role="region"
                aria-live="polite"
                aria-label="Raisonnement expert"
              >
                <p className="mb-2 text-caption font-medium uppercase tracking-eyebrow text-accent">
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

/**
 * The question list, extracted so OTHER surfaces can reuse the EXACT
 * attempt-first contract without re-implementing it (BANK-SPEC §3.3: the
 * « S'entraîner » bank card reuses this verbatim — stem visible, reasoning
 * never in the DOM before the per-question commit, the same `recordExerciseReveal`
 * composite-id write path). The caller owns the surrounding `data-exercise`
 * container and any header/intro; this renders only the numbered questions.
 */
export function AttemptFirstQuestions({
  exerciseId,
  questions,
  className,
}: {
  exerciseId: string;
  questions: ExerciseQuestion[];
  className?: string;
}) {
  return (
    <div className={cn("mt-2", className)}>
      {questions.map((q, i) => (
        <Question
          key={q.id}
          qid={q.id}
          exerciseId={exerciseId}
          index={i + 1}
          part={q.part}
          stem={q.stem}
          reasoning={q.reasoning}
          steps={q.steps}
        />
      ))}
    </div>
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
      <h3 className="font-display text-h3 font-semibold text-primary">
        {exercise.title}
      </h3>

      {exercise.intro && (
        <div className="mt-4">
          <MdBlock className="[&_p]:text-body-lg">{exercise.intro}</MdBlock>
        </div>
      )}

      <AttemptFirstQuestions exerciseId={exercise.id} questions={exercise.questions} />
    </section>
  );
}
