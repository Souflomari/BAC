"use client";

/**
 * Derivation — the stepped worked derivation (Day-6; DESIGN-BIBLE §7's
 * "step-revealed worked examples with reasoning exposed", finally built as
 * designed — the owner's "equations crammed into one line" verdict).
 *
 * Grammar (same learner-paced contract as the beat engine): block KaTeX, ONE
 * transformation per step; the student advances with « Étape suivante »;
 * the CURRENT step is emphasized (full ink + its expert note on an accent
 * hairline), PRIOR steps stay rendered but calm (secondary ink, notes
 * retained); steps beyond the current one are NOT IN THE DOM (dom-truth
 * guards the pre-reveal state). No autoplay, no timers, no overshoot.
 *
 * prefers-reduced-motion: all steps rendered at once, emphasis static,
 * controls hidden (nothing to advance) — same policy as MotionDiagram.
 *
 * Spec: docs/design/PAGE-ANATOMY-SPECS.md §Derivation (Day-6 addition).
 */

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkFrenchTypography from "@/lib/remarkFrenchTypography";
import rehypeKatex from "rehype-katex";
import type { DerivationStep } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { TransportButton } from "./TransportButton";

/** Inline-capable markdown for notes; display math for step equations. */
function Note({ children }: { children: string }) {
  return (
    <span className="[&_p]:inline">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkFrenchTypography]}
        rehypePlugins={[[rehypeKatex, { strict: false, trust: false }]]}
        components={{ p: ({ children }) => <span>{children}</span> }}
      >
        {children}
      </ReactMarkdown>
    </span>
  );
}

function StepMath({ math }: { math: string }) {
  // Each step is ONE display-math block (template v2 display-math rule).
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[[rehypeKatex, { strict: false, trust: false }]]}
    >
      {`$$${math}$$`}
    </ReactMarkdown>
  );
}

export function Derivation({
  id,
  title,
  steps,
  /** Nested mode (inside an attempt-first reveal): quieter frame, no own card. */
  bare = false,
}: {
  id: string;
  title?: string;
  steps: DerivationStep[];
  bare?: boolean;
}) {
  const [visible, setVisible] = useState(1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const shown = reduced ? steps.length : Math.min(visible, steps.length);
  const atEnd = shown >= steps.length;

  return (
    <div
      data-derivation={id}
      className={cn(
        !bare && [
          "my-8 rounded-lg px-5 py-5 bp-medium:px-6",
          "bg-[var(--color-surface-raised)] shadow-elevation-1",
        ],
        bare && "my-4"
      )}
    >
      {title && (
        <p className="text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
          {title}
        </p>
      )}

      <ol className="mt-1" aria-label={title ?? "Dérivation pas à pas"}>
        {steps.slice(0, shown).map((step, i) => {
          const isCurrent = !reduced && i === shown - 1;
          return (
            <li
              key={i}
              data-step={i + 1}
              className={cn(
                "py-1 transition-opacity duration-standard ease-between",
                // Prior steps stay readable but calm; the current one leads.
                isCurrent || reduced ? "opacity-100" : "opacity-60"
              )}
            >
              <div className="[&_.katex-display]:my-2 overflow-x-auto">
                <StepMath math={step.math} />
              </div>
              {step.note && (
                <p
                  className={cn(
                    "mb-3 pl-3 border-l-2 text-body-sm",
                    isCurrent
                      ? "border-[var(--color-accent)] text-[var(--color-text-primary)]"
                      : "border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
                  )}
                >
                  <Note>{step.note}</Note>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {/* Controls — hidden under reduced-motion (everything is shown) */}
      {!reduced && !atEnd && (
        <div className="mt-2 flex items-center gap-3">
          <TransportButton
            onClick={() => setVisible((v) => Math.min(steps.length, v + 1))}
            aria-label="Étape suivante de la dérivation"
          >
            <span>Étape suivante</span>
            <Icon name="chevron-right" size={14} />
          </TransportButton>
          <span className="text-caption text-[var(--color-text-secondary)] tabular-nums" aria-live="polite">
            {shown} / {steps.length}
          </span>
        </div>
      )}
    </div>
  );
}
