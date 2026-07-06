"use client";

/**
 * StagedFigure
 *
 * Generalizes the beat/derivation "learner-paced reveal" grammar to STATIC
 * SVG figures (DESIGN-BIBLE §5, §7; docs/design/LESSON-EXPERIENCE-SPEC.md §2).
 * A staged figure is declared by an optional sidecar
 * `media/<slug>.stages.json` sitting next to `media/<slug>.svg`; NotionBody
 * dispatches here instead of MediaDiagramFigure whenever that sidecar exists.
 *
 * ── AttemptFirst for figures (ledger 11.4) ──────────────────────────────────
 * Unlike ChapterShell (whose inactive chapters stay in the DOM, `hidden`),
 * step groups AHEAD of the current stage are REMOVED from the SVG string
 * before `dangerouslySetInnerHTML` — real DOM absence, not CSS `display:none`.
 * A graph-reading step is pedagogy-bearing (axes → data → the "lecture") in a
 * way an unread chapter is not; advancing re-injects the group's authored
 * markup. This is a DELIBERATELY different contract from ChapterShell §1.3.
 *
 * ── Calm prior-stage emphasis ────────────────────────────────────────────────
 * Groups from stages BEFORE the current one stay in the DOM but get
 * `opacity="0.55"` injected on their own `<g>` tag (string-level, idempotent
 * — re-injecting on an already-dimmed group just refreshes the value); the
 * current stage's group is full ink. No other treatment.
 *
 * ── extractStepGroups ────────────────────────────────────────────────────────
 * A hand-rolled DEPTH-COUNTING scanner, not a naive `<g id="step-N">…</g>`
 * regex: an authored step group may contain plain nested `<g>` sub-groups
 * (decorative wrappers, sub-groupings) with no `id`, and a non-greedy `.*?`
 * would stop at the FIRST nested `</g>`, truncating the group. The scanner
 * walks every `<g …>` / `<g …/>` / `</g>` token in document order, keeps a
 * stack of open groups, and closes a `step-N` group only when ITS OWN
 * matching `</g>` pops off the stack.
 *
 * ── Transport ────────────────────────────────────────────────────────────────
 * The exact MotionStage grammar (MotionStage.tsx:491-534): TransportButton
 * "Précédent" (disabled at stage 1) · `Étape n / N` (aria-live polite,
 * aria-atomic) · "Suivant" becoming "Recommencer" at the last stage. NO arrow
 * keys — ArrowLeft/Right are reserved for ChapterShell's chapter transport
 * (ledger 11.8: one gesture, one owner); Tab+Enter/Space (native <button>
 * semantics) drive this control.
 *
 * ── prefers-reduced-motion / print ──────────────────────────────────────────
 * Both render the figure FULLY (every step group present, no dimming) and
 * hide the transport bar — there is no timeline to seek here (unlike
 * MotionStage's "still advance, just instantly"), so the Derivation precedent
 * applies instead (Derivation.tsx:81,121,145: all steps shown, no emphasis,
 * controls hidden). Print additionally covers Safari (which does not
 * reliably fire beforeprint/afterprint) via a `matchMedia('print')` change
 * listener, and the controls are ALSO hidden by a static `print:hidden`
 * class — a CSS backstop independent of JS state ever having run.
 *
 * No browser storage anywhere here — the current stage lives in React state
 * only, reset to `initialStage` on remount.
 *
 * CLIENT component.
 */

import { useEffect, useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Icon } from "@/components/ui/Icon";
import { TransportButton } from "./TransportButton";
import {
  applyViewBoxCrop,
  STRUCTURAL_SLUGS,
  VERTICALLY_STACKED_PANELS,
} from "./MediaDiagram";

export interface StagedFigureStage {
  /** Caption shown below the figure while this stage is current. */
  caption: string;
}

interface StagedFigureProps {
  /** Raw SVG string from media/<slug>.svg, authored with <g id="step-N"> groups. */
  svg: string;
  slug: string;
  label?: string;
  stages: StagedFigureStage[];
  /**
   * Starting stage (1-based) — the document occurrence count (NotionBody's
   * global counter), clamped to [1, stages.length]. Repeated placements of
   * the same figure start pre-revealed at their historical level (§2.3).
   */
  initialStage: number;
  className?: string;
}

// ── extractStepGroups ─────────────────────────────────────────────────────────

interface ExtractedStepGroups {
  /** The SVG string with every step-N group spliced OUT. */
  template: string;
  /** step number → its full authored markup (`<g id="step-N" …>…</g>`). */
  groups: Map<number, string>;
}

// Matches a `<g>` closing tag, or a `<g …>` / self-closing `<g …/>` opening
// tag. SVG attribute values in authored content never contain a literal
// unescaped `>`, so `[^>]*` is safe here (same assumption the existing
// applyStepVisibility/applyViewBoxCrop string-level transforms already make).
const GROUP_TOKEN_RE = /<\/g>|<g\b[^>]*>/g;

function extractStepGroups(svg: string): ExtractedStepGroups {
  interface StackFrame {
    start: number;
    stepN: number | null;
  }
  const stack: StackFrame[] = [];
  const found: { n: number; start: number; end: number }[] = [];

  GROUP_TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = GROUP_TOKEN_RE.exec(svg))) {
    const text = m[0];
    const start = m.index;

    if (text === "</g>") {
      // Pop whatever group this closes. If it was a tracked step group, its
      // OWN matching close (by stack depth, not by first "</g>" seen) is
      // exactly this token — nested plain <g>s were already popped above it.
      const frame = stack.pop();
      if (frame && frame.stepN !== null) {
        found.push({ n: frame.stepN, start: frame.start, end: start + text.length });
      }
      continue;
    }

    // An opening tag `<g …>` or a self-closing `<g …/>`. Self-closing tags
    // never open a scope — they must NOT be pushed, or the depth count for
    // every subsequent "</g>" would be off by one.
    const idMatch = text.match(/\bid="step-(\d+)"/);
    const stepN = idMatch ? parseInt(idMatch[1], 10) : null;
    if (/\/>\s*$/.test(text)) {
      if (stepN !== null) found.push({ n: stepN, start, end: start + text.length });
      continue;
    }
    stack.push({ start, stepN });
  }

  found.sort((a, b) => a.start - b.start);
  const groups = new Map<number, string>();
  let template = "";
  let cursor = 0;
  for (const f of found) {
    template += svg.slice(cursor, f.start);
    groups.set(f.n, svg.slice(f.start, f.end)); // last write wins on a duplicate id
    cursor = f.end;
  }
  template += svg.slice(cursor);

  return { template, groups };
}

/** Inject (or refresh) `opacity="<value>"` on a group's own opening tag. */
function withOpacity(markup: string, opacity: number): string {
  return markup.replace(
    /^(<g\b[^>]*?)(\s*\/?)(>)/,
    (_, head: string, selfClose: string, gt: string) => {
      const stripped = head.replace(/\s+opacity="[^"]*"/, "");
      return `${stripped} opacity="${opacity}"${selfClose}${gt}`;
    }
  );
}

/**
 * Reassemble a figure: kept groups are appended, in ascending order, right
 * before `</svg>` — for these figures the step groups are already each
 * other's only siblings in authored order, so "base SVG (everything outside
 * step groups) + groups 1..current" (§2.3) reconstructs the original figure
 * exactly. `keepUpTo === null` keeps every group (reduced-motion / print);
 * groups above it are simply never appended — real DOM absence, not hiding.
 * `dimBelowStage === null` dims nothing (reduced-motion / print: "no other
 * treatment").
 */
function assembleSvg(
  extracted: ExtractedStepGroups,
  keepUpTo: number | null,
  dimBelowStage: number | null
): string {
  const numbers = Array.from(extracted.groups.keys()).sort((a, b) => a - b);
  let appended = "";
  for (const n of numbers) {
    if (keepUpTo !== null && n > keepUpTo) continue;
    const raw = extracted.groups.get(n) as string;
    appended += dimBelowStage !== null && n < dimBelowStage ? withOpacity(raw, 0.55) : raw;
  }
  const closeIdx = extracted.template.lastIndexOf("</svg>");
  if (closeIdx === -1) return extracted.template + appended; // malformed SVG — never throws
  return extracted.template.slice(0, closeIdx) + appended + extracted.template.slice(closeIdx);
}

function clampStage(n: number, max: number): number {
  if (max < 1) return 1;
  return Math.min(Math.max(1, n), max);
}

export function StagedFigure({
  svg,
  slug,
  label,
  stages,
  initialStage,
  className,
}: StagedFigureProps) {
  const totalStages = stages.length;
  const [stage, setStage] = useState(() => clampStage(initialStage, totalStages));
  const [reduced, setReduced] = useState(false);
  const [printing, setPrinting] = useState(false);
  const captionId = useId();

  // prefers-reduced-motion — same live-listener pattern as Derivation/MotionStage.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Print (§2.6 / ledger 11.9): beforeprint/afterprint cover Chrome/Firefox;
  // matchMedia('print') covers Safari, which does not reliably fire them.
  useEffect(() => {
    const onBeforePrint = () => setPrinting(true);
    const onAfterPrint = () => setPrinting(false);
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    const mq = window.matchMedia("print");
    const onChange = (e: MediaQueryListEvent) => setPrinting(e.matches);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const fullyRevealed = reduced || printing;
  const atFirst = stage <= 1;
  const atLast = stage >= totalStages;

  function handlePrev() {
    if (atFirst) return;
    setStage((s) => clampStage(s - 1, totalStages));
  }
  function handleNext() {
    if (atLast) {
      setStage(1); // Recommencer — full replay from stage 1, not initialStage
    } else {
      setStage((s) => clampStage(s + 1, totalStages));
    }
  }

  // Parsing the SVG into template + groups only depends on the raw string;
  // re-running it on every stage change (rather than memoizing) would be
  // wasted work, so it's split from the (cheap) per-stage reassembly below.
  const extracted = useMemo(() => extractStepGroups(svg), [svg]);

  const svgContent = useMemo(() => {
    let out = assembleSvg(
      extracted,
      fullyRevealed ? null : stage,
      fullyRevealed ? null : stage
    );
    const totalPanels = VERTICALLY_STACKED_PANELS[slug];
    if (totalPanels !== undefined) {
      const visiblePanels = fullyRevealed ? totalPanels : stage;
      out = applyViewBoxCrop(out, visiblePanels, totalPanels);
    }
    return out;
  }, [extracted, fullyRevealed, stage, slug]);

  const isStructural = STRUCTURAL_SLUGS.has(slug);
  const currentCaption = stages[stage - 1]?.caption;
  const accessibleName = label ?? slug;

  return (
    <figure
      aria-label={label}
      data-figure={slug}
      data-stage-current={stage}
      className={cn("my-8 notion-wide-band", className)}
    >
      {/* SVG wrapper — identical chrome to MediaDiagramFigure (MediaDiagram.tsx:221-264) */}
      <div
        className={cn(
          "overflow-hidden",
          "rounded-xl",
          "bg-[var(--color-surface-raised)]",
          // Shadow-first card (ADR 0023): the elevation-1 hairline ring holds the
          // edge; no drawn border. Reads as lifted, not boxed-in.
          "shadow-elevation-1",
          "[&>svg]:w-full [&>svg]:h-auto",
          isStructural
            ? // Structural: cap to natural size, center in band
              "w-full mx-auto"
            : // Wide-band: full width
              "w-full"
        )}
        style={isStructural ? { maxWidth: "680px" } : undefined}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Controls — hidden under reduced-motion / print (Derivation precedent:
          there is no timeline to seek here, unlike MotionStage; an instant
          reveal-all leaves nothing to click through). `print:hidden` is a
          static CSS backstop independent of the JS printing state. */}
      {!fullyRevealed && (
        <div
          className="mt-3 flex items-center gap-2 flex-wrap print:hidden"
          role="group"
          aria-label={`Contrôles : ${accessibleName}`}
        >
          <TransportButton
            onClick={handlePrev}
            disabled={atFirst}
            aria-label="Étape précédente"
          >
            <Icon name="chevron-left" size={14} />
            <span>Précédent</span>
          </TransportButton>

          {/* Step indicator — functional UI text, promoted to secondary for 4.5:1. */}
          <span
            className={cn(
              "text-caption text-[var(--color-text-secondary)]",
              "tabular-nums select-none min-w-[6ch] text-center"
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {`Étape ${stage} / ${totalStages}`}
          </span>

          <TransportButton
            onClick={handleNext}
            aria-label={atLast ? "Recommencer depuis l’étape 1" : "Étape suivante"}
            aria-describedby={currentCaption ? captionId : undefined}
          >
            {atLast ? (
              <>
                <Icon name="reset" size={13} />
                <span>Recommencer</span>
              </>
            ) : (
              <>
                <span>Suivant</span>
                <Icon name="chevron-right" size={14} />
              </>
            )}
          </TransportButton>
        </div>
      )}

      {/* Caption for the current stage — one line, capped at 65ch, matching
          MediaDiagramFigure's stepCaption placement exactly. */}
      {currentCaption && (
        <figcaption
          id={captionId}
          className={cn(
            "mt-3 px-2",
            "text-body-sm text-[var(--color-text-secondary)]",
            "leading-relaxed",
            "max-w-[65ch]"
          )}
        >
          {frenchTypography(currentCaption)}
        </figcaption>
      )}
    </figure>
  );
}

// Exported for unit-level reasoning / a future dom-truth-adjacent script that
// wants to assert group extraction directly without mounting the component.
export { extractStepGroups };
