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

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Icon } from "@/components/ui/Icon";
import { TransportButton } from "./TransportButton";
import { InteractiveControl } from "./InteractiveControl";
import { useInteractiveFigure } from "./useInteractiveFigure";
import { getInteractiveFigureModel } from "@/lib/interactive-figures";
import type { InteractiveFigureConfigSpec } from "@/lib/content";
import {
  applyViewBoxCrop,
  cropViewBoxValue,
  STRUCTURAL_SLUGS,
  VERTICALLY_STACKED_PANELS,
} from "./MediaDiagram";

// React warns if useLayoutEffect runs during server rendering; Next.js does
// render client components on the server for the initial HTML, so the DOM
// reconciliation effect below (which must fire before paint — see its own
// comment) needs the same isomorphic guard ChapterShell.tsx already uses.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  /**
   * Optional bespoke-manipulation sidecar (docs/design/INTERACTIVE-FIGURE-SPEC.md).
   * Pure JSON — no function ever crosses this boundary. Only takes effect if
   * `slug` also resolves to a registered model in
   * web/src/lib/interactive-figures/index.ts; otherwise this figure renders
   * exactly as a plain staged figure (graceful degradation, §2.2).
   */
  interactiveConfig?: InteractiveFigureConfigSpec;
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

const ASSEMBLE_CHILD_DURATION_MS = 350; // MOTION-CHOREOGRAPHY.md §1 "assemble"

/** Stagger interval between an assembling group's direct children, scaled
 * by count (MOTION-CHOREOGRAPHY.md §2.2: 60–90ms, tighter for busier
 * groups) — a 3-element step reads as deliberately paced at 90ms apart; a
 * 12-element one would take too long at that same interval, so it tightens
 * to 60ms rather than growing the whole reveal past a few seconds. */
function assembleStaggerMs(childCount: number): number {
  if (childCount <= 3) return 90;
  if (childCount > 6) return 60;
  return 70;
}

/**
 * Reveal a freshly-inserted step group's DIRECT children one at a time —
 * MOTION-CHOREOGRAPHY.md §1 "assemble": "never fire all elements
 * simultaneously (reads as 'pop', not choreography)." Each child (a curve,
 * an axis, a label — whatever the figure actually authored as a direct
 * child of the step group) gets `.stage-child-enter` with a JS-computed
 * `animation-delay`, instead of the whole group fading in as one blob —
 * the "watch it build, thing by thing" pacing an Imprint-style illustration
 * has and the old single-blob fade didn't. Each child's own cleanup timer
 * clears its class/inline delay once settled, independent of the others,
 * so a later re-entrance (Précédent-then-Suivant) always starts fresh.
 */
function assembleGroupChildren(group: SVGGElement): number {
  const children = Array.from(group.children) as SVGElement[];
  const stagger = assembleStaggerMs(children.length);
  children.forEach((child, i) => {
    child.classList.add("stage-child-enter");
    child.style.animationDelay = `${i * stagger}ms`;
    const settleMs = i * stagger + ASSEMBLE_CHILD_DURATION_MS + 50;
    window.setTimeout(() => {
      child.classList.remove("stage-child-enter");
      child.style.removeProperty("animation-delay");
    }, settleMs);
  });
  // Durée totale jusqu'au repos du dernier enfant — le site d'appel s'en
  // sert pour savoir si une réinsertion self-heal tombe EN PLEINE assemble.
  return (children.length - 1) * stagger + ASSEMBLE_CHILD_DURATION_MS + 50;
}

export function StagedFigure({
  svg,
  slug,
  label,
  stages,
  initialStage,
  className,
  interactiveConfig,
}: StagedFigureProps) {
  const totalStages = stages.length;
  const initialStageClamped = clampStage(initialStage, totalStages);
  const [stage, setStage] = useState(initialStageClamped);
  const [reduced, setReduced] = useState(false);
  const [printing, setPrinting] = useState(false);
  const captionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveModel = interactiveConfig ? getInteractiveFigureModel(slug) : undefined;
  // Populated (below, after useInteractiveFigure is called) with its
  // `reapply` function — read from `reconcile` via a ref, not a dependency,
  // so `reconcile`'s own identity doesn't change every render (see the
  // reconciliation comment for why calling this must never itself trigger
  // a React re-render).
  const reapplyRef = useRef<(() => void) | null>(null);
  // Fenêtres d'assemble en vol, par numéro d'étape (voir le rejeu self-heal
  // dans `reconcile`) : n → horodatage de fin de la chorégraphie.
  const assembleUntilRef = useRef<Map<number, number>>(new Map());

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
  // wasted work, so it's split from the per-stage DOM reconciliation below.
  const extracted = useMemo(() => extractStepGroups(svg), [svg]);
  const originalViewBox = useMemo(() => svg.match(/viewBox="([^"]+)"/)?.[1] ?? null, [svg]);

  // First-paint markup ONLY — computed once via a lazy initializer, never
  // recomputed on a later render, and used ONLY for the very first commit
  // (see the note on React re-injecting dangerouslySetInnerHTML, below).
  const [initialSvgContent] = useState(() => {
    let out = assembleSvg(extracted, initialStageClamped, initialStageClamped);
    const totalPanels = VERTICALLY_STACKED_PANELS[slug];
    if (totalPanels !== undefined) {
      out = applyViewBoxCrop(out, initialStageClamped, totalPanels);
    }
    return out;
  });

  // ── DOM reconciliation ────────────────────────────────────────────────────
  // Patches the LIVE svg subtree directly instead of re-injecting a whole new
  // string — the old contract tore down and reparsed the entire SVG on every
  // stage change (the literal "everything pops in on top of each other like
  // slides" the motion upgrade exists to fix). A step group that's needed but
  // missing is appended and its DIRECT CHILDREN assemble in one at a time via
  // `assembleGroupChildren` (skipped on the initial mount, via `mountedRef`,
  // and whenever `fullyRevealed` batch-inserts everything at once — no
  // timeline to animate through there) — MOTION-CHOREOGRAPHY.md §1
  // "assemble," not a single group-level blob fade: the group itself is
  // never animated, only its children, staggered. A group no longer wanted
  // gets a `.stage-group-exit` fade before removal — real DOM absence is
  // preserved (ledger 11.4's AttemptFirst contract), it's just no longer
  // instant. Calls `reapplyRef.current()` directly (never a React state
  // update) after a structural change, so useInteractiveFigure can
  // re-stamp its bound value onto whatever just got reinserted.
  const mountedRef = useRef(false);
  const pendingExitsRef = useRef(new Map<number, () => void>());
  // Which step numbers the student has ALREADY watched assemble, independent
  // of momentary DOM presence — `!el` alone is NOT a safe proxy for "never
  // revealed": React's own re-render can silently reset this component's
  // dangerouslySetInnerHTML subtree (see the comment on `reconcile` below),
  // and on a multi-stage advance (e.g. stage 2→3) that reset can wipe an
  // ALREADY-SHOWN group out of the DOM microseconds before this SAME
  // reconcile call runs — which, without this set, re-inserts it exactly
  // like a fresh reveal and replays its assemble alongside the genuinely
  // new stage's (a real, reported bug: "step 3 redoes the motion at step
  // 2"). Seeded with whatever the frozen initial paint already shows, so a
  // repeated placement that starts pre-revealed never animates its own
  // history either. Cleared for `n` only when that group's exit actually
  // `finalize()`s (a real backward stage change, not a self-heal
  // correction) — so Précédent-then-Suivant deliberately DOES replay the
  // assemble (the student asked to go back and came forward again; seeing
  // it build once more is correct there, unlike the reset-driven case).
  const shownRef = useRef(new Set<number>(Array.from({ length: initialStageClamped }, (_, i) => i + 1)));

  // React's `dangerouslySetInnerHTML` prop is NOT reliably inert across
  // re-renders in this app even when the `__html` string is unchanged —
  // confirmed by direct DOM instrumentation (a MutationObserver on the
  // wrapping div catches the whole `<svg>` being silently replaced on a
  // later, unrelated commit) and by MotionStage.tsx:163-170's own
  // pre-existing comment describing the exact same hazard ("if it also
  // managed this innerHTML it would re-inject the SVG on the next
  // re-render… replacing the very nodes [being] animated"). Rather than
  // fight that (MotionStage sidesteps it by never using
  // dangerouslySetInnerHTML past first paint, at the cost of no SSR
  // content — not acceptable here, print/no-JS rendering matters for this
  // component), `reconcile` is idempotent and re-runs INSTANTLY whenever a
  // MutationObserver on the container catches such a reset — the exact
  // "self-healing net" pattern useInteractiveFigure.ts already uses for
  // the identical class of bug, one effect below.
  const reconcile = useCallback(
    (instant: boolean) => {
      const svgRoot = containerRef.current?.querySelector("svg");
      if (!svgRoot) return;
      const pendingExits = pendingExitsRef.current;
      const numbers = Array.from(extracted.groups.keys()).sort((a, b) => a - b);
      let structuralChange = false;

      for (const n of numbers) {
        const wanted = fullyRevealed || n <= stage;
        const el = svgRoot.querySelector<SVGGElement>(`#step-${n}`);

        if (wanted) {
          const cancelExit = pendingExits.get(n);
          if (cancelExit) {
            cancelExit();
            pendingExits.delete(n);
          }
          if (!el) {
            const raw = extracted.groups.get(n);
            if (!raw) continue;
            svgRoot.insertAdjacentHTML("beforeend", raw);
            const inserted = svgRoot.querySelector<SVGGElement>(`#step-${n}`);
            if (inserted) {
              inserted.classList.add("stage-group");
              if (mountedRef.current && !fullyRevealed && !instant && !shownRef.current.has(n)) {
                const duree = assembleGroupChildren(inserted);
                assembleUntilRef.current.set(n, Date.now() + duree);
              } else if (
                !fullyRevealed &&
                Date.now() < (assembleUntilRef.current.get(n) ?? 0)
              ) {
                // Le cas qui perdait la chorégraphie : un rendu React
                // supplémentaire (hydratation tardive, bascule de fonte en
                // `swap`…) réinitialise le dangerouslySetInnerHTML PENDANT
                // les ~350 ms de l'assemble ; le self-heal réinsérait le
                // groupe d'un bloc — contenu juste, mouvement perdu, et la
                // porte dom-truth « pas de pop en blob » échouait au gré de
                // la course. Si la réinsertion tombe dans la fenêtre d'une
                // assemble encore en vol, on la REJOUE au lieu de l'écraser.
                const duree = assembleGroupChildren(inserted);
                assembleUntilRef.current.set(n, Date.now() + duree);
              }
            }
            shownRef.current.add(n);
            structuralChange = true;
          } else {
            const dim = !fullyRevealed && n < stage;
            el.classList.add("stage-group");
            el.classList.toggle("stage-group-dim", dim);
            // The frozen initial string may carry opacity as a raw SVG
            // attribute (withOpacity, above) for a pre-revealed placement's
            // dimmed groups — dimming is handed off to the CSS class
            // exclusively from here on, or a later undim (class removed)
            // would still be overridden by the leftover attribute.
            if (el.hasAttribute("opacity")) el.removeAttribute("opacity");
          }
        } else if (el && !pendingExits.has(n)) {
          el.classList.add("stage-group-exit");
          structuralChange = true;
          let finished = false;
          const cleanup = () => {
            el.removeEventListener("transitionend", onEnd);
            window.clearTimeout(timeoutId);
          };
          const finalize = () => {
            if (finished) return;
            finished = true;
            cleanup();
            pendingExits.delete(n);
            shownRef.current.delete(n);
            el.remove();
          };
          const onEnd = (e: Event) => {
            if (e.target === el) finalize();
          };
          el.addEventListener("transitionend", onEnd);
          const timeoutId = window.setTimeout(finalize, 200);
          // If this group becomes wanted again before finalize runs (a quick
          // Précédent-then-Suivant), the `wanted` branch above calls this to
          // stop the pending removal and restore full opacity — the element
          // was never actually torn down, so any live (e.g. dragged) values
          // on it survive untouched.
          pendingExits.set(n, () => {
            finished = true;
            cleanup();
            el.classList.remove("stage-group-exit");
          });
        }
      }

      const totalPanels = VERTICALLY_STACKED_PANELS[slug];
      if (totalPanels !== undefined && originalViewBox) {
        const visiblePanels = fullyRevealed ? totalPanels : stage;
        const nextViewBox =
          visiblePanels >= totalPanels
            ? originalViewBox
            : cropViewBoxValue(originalViewBox, visiblePanels, totalPanels);
        svgRoot.setAttribute("viewBox", nextViewBox);
      }

      mountedRef.current = true;
      // Re-stamp the interactive value onto whatever just got structurally
      // reinserted (the Précédent-then-Suivant case) — called DIRECTLY, a
      // plain function call, never a React state update. An earlier version
      // signaled this via a `domVersion` state bump instead; that bump
      // forced a second render, and React's own re-render is what causes
      // the dangerouslySetInnerHTML reset `reconcile` exists to correct —
      // re-rendering AGAIN here gave React another chance to reset the div,
      // which then needed another correction, which bumped again: an
      // infinite loop, empirically confirmed (hung a real browser tab), and
      // separately, ANY extra render — even a self-terminating one — was
      // also silently overwriting this exact reconcile call's OWN
      // `assembleGroupChildren` reveal before it ever painted. Skipped
      // entirely on an `instant` (self-heal) call: that call is itself the
      // reapply-worthy correction, and useInteractiveFigure's own
      // MutationObserver self-heal on the same container already covers it
      // independently.
      if (structuralChange && !instant) reapplyRef.current?.();
    },
    [stage, fullyRevealed, extracted, originalViewBox, slug]
  );

  useIsoLayoutEffect(() => {
    reconcile(false);
  }, [reconcile]);

  // Self-heal: whenever React resets the container's direct children back
  // to the frozen `initialSvgContent` (see `reconcile`'s own comment above),
  // re-apply the current stage's state INSTANTLY — a correction, not a user
  // gesture. `subtree: false` is deliberate: `reconcile`'s own writes are
  // always to GRANDCHILDREN of this container (groups inside the `<svg>`),
  // so they never re-trigger this observer — only a wholesale replacement
  // of the `<svg>` element itself (a direct child) does.
  //
  // MUST be a LAYOUT effect (useIsoLayoutEffect), not a plain useEffect —
  // confirmed by a real, reproduced bug: a plain useEffect's reconnect
  // (disconnect the OLD observer, whose closure captured the PREVIOUS
  // render's `fullyRevealed`/`stage`, then create a NEW one) only runs
  // AFTER paint, as a passive effect. But the OLD observer is still
  // CONNECTED at the moment `reconcile`'s own layout effect (just above)
  // mutates the DOM — it sees that mutation and queues its STALE callback
  // as a microtask, which fires (with the previous, now-wrong
  // `fullyRevealed`/`stage`) BEFORE the passive effect ever gets a chance
  // to reconnect — undoing the correct insertion moments after it happened
  // (reproduced with prefers-print: the group was inserted, then
  // immediately re-removed by a self-heal call that still read
  // `fullyRevealed: false`). Making this a layout effect means the
  // disconnect+reconnect happens SYNCHRONOUSLY, in the same commit as the
  // mutation, before the browser ever drains the microtask queue that
  // would have delivered the stale observer's callback.
  useIsoLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new MutationObserver(() => reconcile(true));
    observer.observe(container, { childList: true, subtree: false });
    return () => observer.disconnect();
  }, [reconcile]);

  const isStructural = STRUCTURAL_SLUGS.has(slug);
  const currentCaption = stages[stage - 1]?.caption;
  const accessibleName = label ?? slug;

  // The manipulation control unlocks once the figure reaches its final stage
  // (§1.2) — or immediately under reduced-motion, where the figure is already
  // fully assembled and there is no stage to click through. Printing hides it
  // regardless (nothing to drag on paper) — this is INTENTIONALLY separate
  // from `fullyRevealed`: reduced-motion must not disable manipulation itself
  // (§4), only the click-through transport above it does that.
  const interactiveUnlocked = (fullyRevealed || atLast) && !printing;
  const { value: interactiveValue, setValue: setInteractiveValue, reapply } = useInteractiveFigure({
    containerRef,
    config: interactiveConfig,
    model: interactiveModel,
    unlocked: interactiveUnlocked,
    reduced,
  });
  useEffect(() => {
    reapplyRef.current = reapply;
  }, [reapply]);

  return (
    <figure
      aria-label={label}
      data-figure={slug}
      data-stage-current={stage}
      className={cn("my-8 notion-wide-band", className)}
    >
      {/* SVG wrapper — identical chrome to MediaDiagramFigure (MediaDiagram.tsx:221-264) */}
      <div
        ref={containerRef}
        className={cn(
          "overflow-hidden",
          "rounded-xl",
          "bg-surface-raised",
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
        dangerouslySetInnerHTML={{ __html: initialSvgContent }}
      />

      {/* Manipulation control — only once interactiveUnlocked (§1.2) AND the
          slug resolves to a registered model (graceful degradation, §2.2). */}
      {interactiveConfig && interactiveModel && interactiveValue !== undefined && (
        <InteractiveControl
          config={interactiveConfig}
          model={interactiveModel}
          value={interactiveValue}
          onChange={setInteractiveValue}
        />
      )}

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
              "text-caption text-secondary",
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

      {/* Caption for the current stage — this text IS the teaching, not a
          caption (MP-V1 owner finding: the prior below-figure treatment read
          too small and under-emphasized beneath the interactive visuals).
          a2 ("lede serif + accent ordinal") is the SHIPPED DEFAULT as of
          Phase C1: the caption text renders as body-lg reading-serif prose
          (§3 — teaching prose is the serif's job), preceded by the stage
          number as a small `text-accent` ordinal. The ordinal is
          aria-hidden — the aria-live "Étape n / N" indicator above already
          announces the stage, so meaning is carried by the number itself,
          never color alone (§2/§9). Measure capped at `max-w-reading`
          (--measure-prose ≤ 75ch). */}
      {currentCaption && (
        <figcaption
          id={captionId}
          className={cn("mt-6 px-2", "flex items-baseline gap-3", "max-w-reading")}
        >
          <span
            aria-hidden="true"
            className={cn(
              "text-body-sm font-medium text-accent",
              "tabular-nums select-none"
            )}
          >
            {stage}
          </span>
          <span className="font-display text-body-lg text-primary">
            {frenchTypography(currentCaption)}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

// Exported for unit-level reasoning / a future dom-truth-adjacent script that
// wants to assert group extraction directly without mounting the component.
export { extractStepGroups };
