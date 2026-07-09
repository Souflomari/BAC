"use client";

/**
 * useInteractiveFigure — the manipulation layer for a StagedFigure once it
 * unlocks (docs/design/INTERACTIVE-FIGURE-SPEC.md §3-4).
 *
 * Writes IMPERATIVELY into the already-injected SVG subtree (setAttribute /
 * textContent, or a GSAP attribute tween — see below), exactly like
 * MotionStage.tsx writes into its own injected SVG — no fight with React's
 * render cycle, and no risk of the drag gesture fighting a re-render:
 * StagedFigure's `svgContent` memo does not depend on the control's value,
 * so React never re-injects the SVG mid-drag. It DOES re-inject on stage
 * changes (Précédent/Suivant) and on prefers-reduced-motion/print toggles —
 * `svgVersion` is a dependency of the structural-reapply effect below, so
 * every fresh injection gets the current control value re-applied,
 * mirroring MotionStage's own re-inject-then-re-apply pattern.
 *
 * ── Tweened recompute (not a snap) ──────────────────────────────────────────
 * A `value` change from user interaction (drag, keyboard step, slider input)
 * animates the bound attribute over `--duration-micro` via a lazily-loaded
 * GSAP (kept out of the server bundle, same dynamic-import pattern as
 * MotionStage.tsx:184-197) — `ease: "none"` while actively dragging (a
 * real-time chase, not laggy catch-up, matching MotionStage's own precedent
 * for continuous scrub) and `ease: "power2.out"` for discrete updates.
 *
 * The tween is created SYNCHRONOUSLY inside `setValue`, in the SAME call
 * stack as the triggering DOM event (matching how MotionStage's `goTo()`
 * creates its own tween directly inside the transport button's click
 * handler) — deliberately NOT via a separate `useEffect` watching `value`
 * as a dependency. Routing tween creation through a value-watching effect
 * (verified with both `useEffect` and `useLayoutEffect`) reproducibly made
 * GSAP's ticker treat the tween as already-complete on its very first tick
 * — confirmed via `tween.progress() === 1` immediately after creation and
 * via a frame-by-frame DOM poll showing the bound attribute already at its
 * final value on the first observed frame — while the exact same
 * `gsap.to()` call, made synchronously inside a plain
 * `window.addEventListener("keydown", …)` handler on the same page,
 * animated correctly every time. The exact GSAP-internal mechanism wasn't
 * fully root-caused, but the fix is unambiguous and low-risk: create the
 * tween where the user gesture actually happens, not one render-cycle away.
 *
 * A `path` binding whose new `d` has the SAME number of embedded numbers as
 * its current one gets a plain attribute tween; one whose topology changes
 * (only `racines-unite`'s vertex-count-scaled paths today, detected
 * generically by comparing token counts, never slug-hardcoded) routes
 * through MorphSVGPlugin instead — plain attribute interpolation on
 * differently-shaped `d` strings does not animate coherently. `text`
 * bindings are never tweened (can't be meaningfully interpolated; a
 * flash-on-every-tick would add noise, not reduce it — `pulse-settle-once`
 * already owns the "notable settle" cue). `prefers-reduced-motion` bypasses
 * GSAP entirely — an explicit branch, since the project's global reduced-
 * motion CSS net does not reach GSAP's own rAF-driven tweens.
 *
 * A structural re-injection (`svgVersion` changed — a stage transition, or
 * the reduced-motion/print toggle) is handled by a SEPARATE effect and is
 * always applied INSTANTLY: the freshly-mounted elements start at their
 * authored static values and this is a re-stamp, not a user gesture —
 * tweening it would compete visually with the stage-reveal transition. If
 * GSAP's dynamic import hasn't resolved yet (or fails), every apply
 * degrades to the original instant `setAttribute`/`textContent` —
 * "degrade, never break," the same contract MotionStage already keeps.
 *
 * No browser storage — `value` lives in React state only, reset to
 * `control.initial` on remount (the same honest-state discipline as every
 * other figure/derivation/exercise state in this codebase).
 */

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type {
  InteractiveFigureConfigSpec,
  InteractiveBindingSpec,
} from "@/lib/content";
import type { InteractiveFigureModel, RecomputeResult } from "@/lib/interactive-figures";

// ── Minimal structural type for the GSAP surface we use (same pattern as
// MotionStage.tsx:67-89 — GSAP is dynamically imported, so only the methods
// actually called are typed rather than depending on gsap's full exports). ──
interface GsapTweenVars {
  attr?: Record<string, number | string>;
  morphSVG?: string;
  duration?: number;
  ease?: string;
  overwrite?: string | boolean;
}
interface GsapLike {
  registerPlugin(...args: unknown[]): void;
  to(target: unknown, vars: GsapTweenVars): unknown;
}

interface GsapContext {
  gsap: GsapLike;
  hasMorph: boolean;
}

const TWEEN_DURATION = 0.15; // --duration-micro (150ms), globals.css:92

let gsapLoadPromise: Promise<GsapContext | null> | null = null;

/** Lazily loads GSAP + MorphSVGPlugin once, cached across every figure on
 * the page — mirrors MotionStage.tsx:184-197's dynamic-import pattern
 * (GSAP stays out of the server bundle, ADR 0022). Never throws: a failed
 * plugin import just means path-topology-changing bindings (racines-unite)
 * fall back to an instant snap; a failed core import means every binding
 * on every interactive figure does. */
function loadGsap(): Promise<GsapContext | null> {
  if (!gsapLoadPromise) {
    gsapLoadPromise = (async () => {
      try {
        const gsapMod = await import("gsap");
        const gsap = (gsapMod.gsap ?? gsapMod.default) as unknown as GsapLike;
        let hasMorph = false;
        try {
          const morph = await import("gsap/MorphSVGPlugin");
          gsap.registerPlugin(morph.MorphSVGPlugin ?? morph.default);
          hasMorph = true;
        } catch {
          // Plugin unavailable — variable-topology paths degrade to instant snap.
        }
        return { gsap, hasMorph };
      } catch {
        return null;
      }
    })();
  }
  return gsapLoadPromise;
}

/** Count of embedded numeric tokens in an SVG path `d` string — a cheap,
 * generic proxy for "same topology" (same command/point count), used to
 * decide plain attribute tweening vs. MorphSVGPlugin. Not slug-specific:
 * any figure whose recompute changes a path's segment count (today, only
 * racines-unite's vertex-count-scaled `d`) is caught by this check. */
function pathTokenCount(d: string): number {
  return (d.match(/-?\d+\.?\d*/g) ?? []).length;
}

function applyResultInstant(el: Element, result: RecomputeResult): void {
  if (result.kind === "path") {
    el.setAttribute("d", result.d);
  } else if (result.kind === "point") {
    if (el.tagName === "circle") {
      el.setAttribute("cx", String(result.x));
      el.setAttribute("cy", String(result.y));
    } else {
      el.setAttribute("x", String(result.x));
      el.setAttribute("y", String(result.y));
    }
  } else {
    el.textContent = result.value;
  }
}

function applyResultTweened(
  ctx: GsapContext | null,
  el: Element,
  result: RecomputeResult,
  dragging: boolean
): void {
  if (result.kind === "text") {
    el.textContent = result.value;
    return;
  }
  if (!ctx) {
    // GSAP hasn't loaded yet (or failed) — degrade, never break.
    applyResultInstant(el, result);
    return;
  }
  const ease = dragging ? "none" : "power2.out";
  if (result.kind === "point") {
    const attrs: Record<string, number> =
      el.tagName === "circle" ? { cx: result.x, cy: result.y } : { x: result.x, y: result.y };
    ctx.gsap.to(el, { attr: attrs, duration: TWEEN_DURATION, ease, overwrite: "auto" });
    return;
  }
  // kind === "path"
  const currentD = el.getAttribute("d") ?? "";
  if (pathTokenCount(currentD) === pathTokenCount(result.d)) {
    ctx.gsap.to(el, { attr: { d: result.d }, duration: TWEEN_DURATION, ease, overwrite: "auto" });
  } else if (ctx.hasMorph) {
    ctx.gsap.to(el, { morphSVG: result.d, duration: TWEEN_DURATION, ease, overwrite: "auto" });
  } else {
    // Topology changed but the morph plugin isn't available — snap rather
    // than animate a mismatched attribute interpolation.
    el.setAttribute("d", result.d);
  }
}

function applyBindingsInstant(
  container: Element,
  bindings: InteractiveBindingSpec[],
  model: InteractiveFigureModel,
  value: number
): void {
  for (const binding of bindings) {
    const recompute = model.recompute[binding.recompute];
    if (!recompute) continue;
    const el = container.querySelector(binding.target);
    if (!el) continue;
    applyResultInstant(el, recompute(value));
  }
}

function applyBindingsTweened(
  container: Element,
  bindings: InteractiveBindingSpec[],
  model: InteractiveFigureModel,
  value: number,
  ctx: GsapContext | null,
  dragging: boolean
): void {
  for (const binding of bindings) {
    const recompute = model.recompute[binding.recompute];
    if (!recompute) continue;
    const el = container.querySelector(binding.target);
    if (!el) continue;
    applyResultTweened(ctx, el, recompute(value), dragging);
  }
}

function snapToStep(value: number, domain: [number, number], step: number): number {
  const steps = Math.round((value - domain[0]) / step);
  const snapped = domain[0] + steps * step;
  return Math.min(Math.max(snapped, domain[0]), domain[1]);
}

/** clientX/clientY (pointer event coords) -> SVG user-space, via the CTM —
 * correct regardless of how the responsive `w-full` SVG is actually scaled. */
function svgPointFromClient(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const transformed = pt.matrixTransform(ctm.inverse());
  return { x: transformed.x, y: transformed.y };
}

interface UseInteractiveFigureArgs {
  containerRef: RefObject<HTMLElement | null>;
  config: InteractiveFigureConfigSpec | undefined;
  model: InteractiveFigureModel | undefined;
  /** True once the figure has reached the stage where manipulation unlocks. */
  unlocked: boolean;
  /** Changes whenever the SVG subtree is freshly re-injected (StagedFigure's
   * own `svgContent` string) — re-applies the current value on remount. */
  svgVersion: string;
  /** StagedFigure's own prefers-reduced-motion flag — threaded down rather
   * than a second matchMedia listener here (single source of truth). When
   * true, every apply bypasses GSAP entirely. */
  reduced: boolean;
}

interface UseInteractiveFigureResult {
  /** Undefined when there is nothing to render (no config, no model, locked). */
  value: number | undefined;
  setValue: (v: number) => void;
}

export function useInteractiveFigure({
  containerRef,
  config,
  model,
  unlocked,
  svgVersion,
  reduced,
}: UseInteractiveFigureArgs): UseInteractiveFigureResult {
  const [value, setValueState] = useState<number>(() => config?.control.initial ?? 0);
  const draggingRef = useRef(false);
  const [gsapCtx, setGsapCtx] = useState<GsapContext | null>(null);

  const active = unlocked && config !== undefined && model !== undefined;

  // Refs mirroring the latest gsapCtx/reduced/value — read by setValue (and,
  // transitively, the drag gesture's moveTo() below) so that ANY closure
  // over setValue, however stale (the drag-gesture effect only re-runs on
  // [active, config, model, svgVersion], not on gsapCtx/reduced changing),
  // still applies with the CURRENT GSAP-loaded state and reduced-motion
  // flag, never a stale "not loaded yet" snapshot from an earlier render.
  const gsapCtxRef = useRef(gsapCtx);
  useEffect(() => {
    gsapCtxRef.current = gsapCtx;
  }, [gsapCtx]);
  const reducedRef = useRef(reduced);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Updates state AND applies the new value SYNCHRONOUSLY, in the same call
  // stack as the triggering DOM event — see the file header for why this
  // must not be deferred through a value-watching effect.
  function setValue(next: number) {
    if (!config || !model) return;
    const snapped = snapToStep(next, config.control.domain, config.control.step);
    setValueState(snapped);
    const container = containerRef.current;
    if (!container) return;
    if (reducedRef.current) {
      applyBindingsInstant(container, config.bindings, model, snapped);
    } else {
      applyBindingsTweened(container, config.bindings, model, snapped, gsapCtxRef.current, draggingRef.current);
    }
  }

  // Load GSAP once, lazily — harmless to kick off even when reduced-motion
  // is active (loadGsap() is cached and cheap; the actual bypass happens at
  // apply time above, not here).
  useEffect(() => {
    let cancelled = false;
    loadGsap().then((ctx) => {
      if (!cancelled) setGsapCtx(ctx);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Structural re-apply: fires ONLY when the SVG subtree is freshly
  // re-injected (a stage transition — svgVersion changes) or reduced-motion
  // toggles — NEVER on a plain value change (setValue already handled that
  // synchronously, above). Always instant: the freshly-mounted elements
  // start at their authored static values and this is a re-stamp, not a
  // user gesture — tweening it would compete visually with StagedFigure's
  // own stage-reveal transition.
  const prevSvgVersionRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!active || !config || !model) return;
    const container = containerRef.current;
    if (!container) return;
    const svgChanged = prevSvgVersionRef.current !== svgVersion;
    prevSvgVersionRef.current = svgVersion;
    if (!svgChanged && !reduced) return;
    applyBindingsInstant(container, config.bindings, model, valueRef.current);
  }, [active, config, model, svgVersion, reduced]);

  // Self-healing net: StagedFigure's `dangerouslySetInnerHTML` div can be
  // silently re-injected by React on a commit whose diff isn't visible to
  // the effect above (the replacement HTML is byte-identical to the
  // authored SVG, and JS string equality — Object.is over a string VALUE —
  // can't distinguish "same DOM subtree" from "fresh, content-identical
  // subtree" the way it would for an object reference). When that happens,
  // the freshly-injected markup reverts every bound element to its AUTHORED
  // (non-live) value until the next drag/keyboard tick — a real, observed
  // regression, not a hypothetical. A MutationObserver watching the
  // container's OWN children (not `subtree`, so it never sees our own
  // attribute writes on grandchildren) re-stamps the current value the
  // instant any such replacement happens, regardless of why it happened.
  useEffect(() => {
    if (!active || !config || !model) return;
    const container = containerRef.current;
    if (!container) return;
    const observer = new MutationObserver(() => {
      // A correction, not a user gesture — always instant.
      applyBindingsInstant(container, config.bindings, model, valueRef.current);
    });
    observer.observe(container, { childList: true });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, config, model]);

  // One-shot settle pulse (racines-unite pilot, §"pulse-settle-once" in
  // globals.css) — fires ONLY on a transition INTO settleAt (never on
  // mount, even though the initial value often IS the worked example),
  // matching the calm-core rule that this is a reaction to the student's
  // OWN action, not an ambient effect.
  const prevSettleValueRef = useRef(value);
  useEffect(() => {
    const prev = prevSettleValueRef.current;
    prevSettleValueRef.current = value;
    if (!active || !config?.settleAt || !config.settleTarget) return;
    if (value !== config.settleAt || prev === config.settleAt) return;

    const settleTarget = config.settleTarget;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | undefined;

    function pulse(el: Element) {
      el.classList.add("pulse-settle-once");
      timeoutId = setTimeout(() => el.classList.remove("pulse-settle-once"), 500);
    }

    const el = containerRef.current?.querySelector(settleTarget);
    if (el) {
      pulse(el);
    } else {
      // The target can be MOMENTARILY absent here even though it exists in
      // the authored SVG: this same keypress also changed `value`, which
      // re-renders StagedFigure, which — a confirmed, if not fully
      // root-caused, React behavior in this app — can reset and then
      // self-heal the dangerouslySetInnerHTML subtree (StagedFigure.tsx's
      // `reconcile` comment). That self-heal runs off a MutationObserver
      // microtask; this passive effect can run before it. One rAF retry
      // (which always fires after any pending microtask) is enough.
      rafId = requestAnimationFrame(() => {
        const retryEl = containerRef.current?.querySelector(settleTarget);
        if (retryEl) pulse(retryEl);
      });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, config, value]);

  // The drag-point gesture — delegated on the STABLE container (never
  // replaced by React; only its injected SVG children are, whenever
  // StagedFigure re-renders for ANY reason — a captured reference to the
  // circle/svg themselves would go stale mid-drag). Every DOM lookup below
  // is therefore done FRESH at the moment it's needed, never cached across
  // an awaited user gesture.
  useEffect(() => {
    if (!active || !config || !model) return;
    if (config.control.kind !== "drag-point") return;
    const container = containerRef.current;
    if (!container) return;
    const pointBinding = config.bindings.find((b) => b.recompute === "point");
    if (!pointBinding) return;
    const haloTarget = `${pointBinding.target}-halo`;

    function setHaloVisible(visible: boolean) {
      const halo = container!.querySelector(haloTarget);
      if (halo) halo.setAttribute("style", `opacity: ${visible ? "var(--state-dragged)" : "0"}`);
    }

    function moveTo(clientX: number, clientY: number) {
      if (!config || !model || !model.toDataX) return;
      const svg = container!.querySelector("svg");
      if (!svg) return;
      const p = svgPointFromClient(svg as unknown as SVGSVGElement, clientX, clientY);
      setValue(model.toDataX(p.x));
    }

    function onPointerDown(e: PointerEvent) {
      // The halo (a wider circle, normally invisible) doubles as an enlarged
      // touch/mouse hit area around the small authored point — both count as
      // valid grab targets.
      const handle = container!.querySelector(pointBinding!.target);
      const halo = container!.querySelector(haloTarget);
      const target = e.target as Node;
      const onHandle = !!handle && (target === handle || handle.contains(target));
      const onHalo = !!halo && (target === halo || halo.contains(target));
      if (!onHandle && !onHalo) return;
      draggingRef.current = true;
      setHaloVisible(true);
      moveTo(e.clientX, e.clientY);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }
    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      moveTo(e.clientX, e.clientY);
    }
    function onPointerUp() {
      draggingRef.current = false;
      setHaloVisible(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    }

    container.addEventListener("pointerdown", onPointerDown as EventListener);

    return () => {
      container!.removeEventListener("pointerdown", onPointerDown as EventListener);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, config, model, svgVersion]);

  return { value: active ? value : undefined, setValue };
}
