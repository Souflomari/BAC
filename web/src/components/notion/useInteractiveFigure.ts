"use client";

/**
 * useInteractiveFigure — the manipulation layer for a StagedFigure once it
 * unlocks (docs/design/INTERACTIVE-FIGURE-SPEC.md §3-4).
 *
 * Writes IMPERATIVELY into the already-injected SVG subtree (setAttribute /
 * textContent), exactly like MotionStage.tsx writes into its own injected
 * SVG — no fight with React's render cycle, and no risk of the drag gesture
 * fighting a re-render: StagedFigure's `svgContent` memo does not depend on
 * the control's value, so React never re-injects the SVG mid-drag. It DOES
 * re-inject on stage changes (Précédent/Suivant) and on prefers-reduced-
 * motion/print toggles — `svgVersion` (the same string) is a dependency here
 * so every fresh injection gets the current control value re-applied,
 * mirroring MotionStage's own re-inject-then-re-apply pattern.
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

function applyResult(el: Element, result: RecomputeResult): void {
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

function applyBindings(
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
    applyResult(el, recompute(value));
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
}: UseInteractiveFigureArgs): UseInteractiveFigureResult {
  const [value, setValueState] = useState<number>(() => config?.control.initial ?? 0);
  const draggingRef = useRef(false);

  const active = unlocked && config !== undefined && model !== undefined;

  function setValue(next: number) {
    if (!config) return;
    setValueState(snapToStep(next, config.control.domain, config.control.step));
  }

  // Re-apply every binding whenever the value changes OR the SVG subtree is
  // freshly re-injected (stage change, reduced-motion/print toggle).
  useEffect(() => {
    if (!active || !config || !model) return;
    const container = containerRef.current;
    if (!container) return;
    applyBindings(container, config.bindings, model, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, config, model, value, svgVersion]);

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
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  useEffect(() => {
    if (!active || !config || !model) return;
    const container = containerRef.current;
    if (!container) return;
    const observer = new MutationObserver(() => {
      applyBindings(container, config.bindings, model, valueRef.current);
    });
    observer.observe(container, { childList: true });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, config, model]);

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
      if (!config || !model) return;
      const svg = container!.querySelector("svg");
      if (!svg) return;
      const p = svgPointFromClient(svg as unknown as SVGSVGElement, clientX, clientY);
      const dataX = model.toDataX(p.x);
      setValue(dataX);
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
