/**
 * MotionStage
 *
 * The real-motion engine. Plays a declarative **beat spec** (a `.motion.json`
 * file, parsed by `lib/motion-spec.ts`) over an inline SVG using a single,
 * **paused** GSAP timeline. This REPLACES the old MotionDiagram, whose
 * "motion" was only a `display:none` toggle with an opacity fade — no real
 * animation. Here, curves DRAW on, bars FILL, equation terms ASSEMBLE, paths
 * MORPH.
 *
 * ── Playback contract (learner-paced, never autoplay) ───────────────────────
 *   • On load: the timeline is seeked instantly to the SETTLED end of beat 0,
 *     so the figure shows a calm, complete first beat — nothing animates on
 *     arrival, nothing has "already played" by the time the student scrolls to
 *     it. No autoplay, no scroll-trigger, no timer.
 *   • "Suivant ▸": plays exactly ONE beat segment (current → next settle point),
 *     the real animation, then pauses. At the last beat it becomes "Recommencer".
 *   • "◂ Précédent": jumps INSTANTLY back to the prior beat's settled state.
 *   • "Recommencer": jumps instantly back to beat 0's settled state.
 *
 * ── prefers-reduced-motion ──────────────────────────────────────────────────
 *   The same timeline is built, but every advance SEEKS instantly to the target
 *   settle point (zero animation). Controls still advance; the student still
 *   drives the reveal. (gsap.matchMedia is not needed — we branch on a flag.)
 *
 * ── Progressive enhancement / no flash ──────────────────────────────────────
 *   The authored SVG's static (no-JS) state shows ONLY beat 0 settled: every
 *   element belonging to a later beat is authored in its pre-animation state
 *   (opacity 0, or a curve with full stroke-dashoffset). The engine re-asserts
 *   those pre-states with gsap.set (idempotent — no visible flash) and animates
 *   them in on advance. If GSAP fails to load, the figure simply stays at beat 0
 *   — degraded, never broken.
 *
 * ── KaTeX-in-SVG ────────────────────────────────────────────────────────────
 *   Equation terms are authored as KaTeX-rendered HTML inside <foreignObject>
 *   (KaTeX CSS is imported globally). The engine animates the rendered nodes;
 *   math stays live text (DESIGN-BIBLE §3). The `assemble` verb staggers a
 *   group's children — agnostic to whether they are KaTeX spans or <text>.
 *
 * GSAP (Core + DrawSVGPlugin + MorphSVGPlugin, free since 2025) and the engine
 * are dynamically imported so they never enter the server bundle (ADR 0022).
 *
 * DESIGN-BIBLE §3 math rendered · §5 motion serves comprehension · §6 wide band
 * §7 one primary thing · §9 keyboard / focus ring / ≥44px / reduced-motion.
 *
 * CLIENT component.
 */

"use client";

import { useEffect, useRef, useState, useId } from "react";
import { cn } from "@/lib/utils";
import type { MotionSpec, BeatTween } from "@/lib/motion-spec";

interface MotionStageProps {
  /** Raw SVG string from media/<slug>.motion.svg. */
  svg: string;
  /** Parsed + validated beat spec from media/<slug>.motion.json. */
  spec: MotionSpec;
  /** Accessible label (overrides spec.label if given). */
  label?: string;
  className?: string;
}

// ── Minimal structural types for the GSAP surface we use ─────────────────────
// GSAP is dynamically imported (kept out of the server bundle), so we type only
// the methods we call rather than depending on gsap's full type export.
type Vars = Record<string, unknown>;
interface TweenLike {
  kill(): void;
}
interface TimelineLike {
  kill(): void;
  pause(): TimelineLike;
  seek(pos: string | number): TimelineLike;
  time(t: number): TimelineLike;
  duration(): number;
  addLabel(label: string, position?: string | number): TimelineLike;
  to(targets: unknown, vars: Vars, position?: string | number): TimelineLike;
}
interface GsapLike {
  registerPlugin(...args: unknown[]): void;
  set(targets: unknown, vars: Vars): void;
  to(targets: unknown, vars: Vars): TweenLike;
  timeline(vars?: Vars): TimelineLike;
  plugins?: Record<string, unknown>;
}

// Eases the engine permits — non-overshoot only (no back/elastic/bounce),
// per the MOTION-CHOREOGRAPHY hard rule. Anything else falls back to power2.out.
const ALLOWED_EASES = new Set([
  "none",
  "power1.in",
  "power1.out",
  "power1.inOut",
  "power2.in",
  "power2.out",
  "power2.inOut",
  "power3.out",
  "power3.inOut",
  "sine.in",
  "sine.out",
  "sine.inOut",
  "expo.out",
  "circ.out",
]);

// Per-verb default duration (seconds) and ease, used when the tween omits them.
const VERB_DEFAULTS: Record<string, { duration: number; ease: string }> = {
  draw: { duration: 0.6, ease: "power2.out" },
  trace: { duration: 0.9, ease: "power2.out" },
  fill: { duration: 0.6, ease: "power2.out" },
  assemble: { duration: 0.5, ease: "power2.out" },
  fade: { duration: 0.45, ease: "power2.out" },
  morph: { duration: 0.7, ease: "power2.inOut" },
  "pulse-settle": { duration: 0.6, ease: "sine.inOut" },
};

const FADE_TRAVEL = 12; // px an element translates in from its `from` direction

function safeEase(ease: string | undefined, fallback: string): string {
  if (ease && ALLOWED_EASES.has(ease)) return ease;
  return fallback;
}

// ── Icons (inline SVG, no emoji) ─────────────────────────────────────────────
function IconPrev() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconNext() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconReset() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" focusable="false">
      <path d="M2.5 6.5a4 4 0 1 1 .7 2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 9.5V7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MotionStage({ svg, spec, label, className }: MotionStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  // The GSAP timeline + a tweenTo handle + a "label list" live in refs so the
  // render cycle never re-creates them.
  const tlRef = useRef<unknown>(null);
  const gsapRef = useRef<unknown>(null);
  const playingRef = useRef<unknown>(null); // active advance tween, if any
  const settleTimesRef = useRef<number[]>([]); // absolute timeline time of each beat's settle point

  const totalBeats = spec.beats.length;
  const [currentBeat, setCurrentBeat] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  // Refs for the mq listener so we can remove it on cleanup
  const mqRef = useRef<MediaQueryList | null>(null);
  const mqHandlerRef = useRef<((e: MediaQueryListEvent) => void) | null>(null);

  const figureLabel = label ?? spec.label ?? spec.slug;
  const captionId = useId();

  // Aspect ratio from "minX minY w h" → "w / h", to reserve container space
  // before the SVG is injected client-side (avoids layout shift).
  const aspectRatio = (() => {
    const p = spec.viewBox?.trim().split(/[\s,]+/).map(Number);
    if (p && p.length === 4 && p[2] > 0 && p[3] > 0) return `${p[2]} / ${p[3]}`;
    return undefined;
  })();

  // ── Build the timeline once, after the SVG is in the DOM ───────────────────
  useEffect(() => {
    let cancelled = false;
    const root = stageRef.current;
    if (!root) return;

    // Inject the SVG IMPERATIVELY (not via React's dangerouslySetInnerHTML).
    // React owns the JSX-described DOM; if it also managed this innerHTML it
    // would re-inject the SVG on the next re-render (e.g. when currentBeat
    // changes), replacing the very nodes GSAP is animating with fresh authored
    // ones — the timeline would then animate detached nodes and nothing would
    // visibly move. By injecting here and leaving the container empty in JSX,
    // React never touches the SVG subtree and GSAP's targets stay attached.
    root.innerHTML = svg;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqRef.current = mq;
    const isReduced = mq.matches;
    setReduced(isReduced);

    // Live listener — respects OS setting toggled mid-session (#7 fix).
    // Controls stay visible and advances remain functional; only the
    // animation vs. instant-seek branch changes.
    const handleMqChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mqHandlerRef.current = handleMqChange;
    mq.addEventListener("change", handleMqChange);

    (async () => {
      // Dynamic import — keeps GSAP out of the server bundle.
      const gsapMod = await import("gsap");
      const gsap = (gsapMod.gsap ?? gsapMod.default) as unknown as GsapLike;
      try {
        const draw = await import("gsap/DrawSVGPlugin");
        const morph = await import("gsap/MorphSVGPlugin");
        gsap.registerPlugin(
          draw.DrawSVGPlugin ?? draw.default,
          morph.MorphSVGPlugin ?? morph.default
        );
      } catch {
        // Plugins unavailable — draw/morph verbs degrade to fades below.
      }
      if (cancelled) return;
      gsapRef.current = gsap;

      const svgEl = root.querySelector("svg");
      if (!svgEl) return;

      const sel = (s: string): Element[] => Array.from(svgEl.querySelectorAll(s));
      const hasDraw = !!gsap.plugins?.drawSVG;
      const hasMorph = !!gsap.plugins?.morphSVG;

      // `fill` is animated by tweening the rect's GEOMETRY ATTRIBUTES
      // (height/y or width/x), NOT a CSS/SVG scale transform. Scale transforms
      // on SVG fight any authored transform-box/transform-origin and proved
      // unreliable (bars half-filled or not at all); animating the attributes
      // is exact and origin-free. We stash each rect's full authored geometry
      // here because setPre collapses the attribute to its zero state.
      const fillGeom = new Map<Element, { W: number; H: number; X: number; Y: number }>();
      const numAttr = (n: Element, a: string) => parseFloat(n.getAttribute(a) || "0");

      // ── 1. Pre-state: hide / reset every animated target across ALL beats. ──
      // Idempotent with the authored SVG (later-beat elements authored hidden),
      // so this does not flash.
      const setPre = (tw: BeatTween) => {
        const nodes = sel(tw.target);
        if (nodes.length === 0) return;
        switch (tw.verb) {
          case "draw":
          case "trace":
            // Force the stroke VISIBLE (override any authored no-JS opacity:0);
            // DrawSVG hides it via stroke-dashoffset, not opacity. Without this,
            // the curve "draws" to 100% but stays opacity:0 — invisible.
            if (hasDraw) gsap.set(nodes, { drawSVG: "0%", autoAlpha: 1 });
            else gsap.set(nodes, { autoAlpha: 0 });
            break;
          case "fill": {
            const horizontal = tw.from === "left" || tw.from === "right";
            nodes.forEach((n) => {
              const r = n as HTMLElement;
              // Drop any authored transform / fill-box so only the attr tween acts.
              n.removeAttribute("transform");
              r.style.transformBox = "";
              r.style.transformOrigin = "";
              r.style.transform = "";
              const g = { W: numAttr(n, "width"), H: numAttr(n, "height"), X: numAttr(n, "x"), Y: numAttr(n, "y") };
              fillGeom.set(n, g);
              gsap.set(n, { autoAlpha: 1 });
              if (horizontal) {
                gsap.set(n, { attr: { width: 0, x: tw.from === "right" ? g.X + g.W : g.X } });
              } else {
                // "up" → grow DOWN (top edge fixed); default/"down" → grow UP (bottom edge fixed)
                gsap.set(n, { attr: { height: 0, y: tw.from === "up" ? g.Y : g.Y + g.H } });
              }
            });
            break;
          }
          case "assemble": {
            const kids = nodes.flatMap((n) => Array.from(n.children));
            // The GROUP is forced visible (overriding any authored no-JS
            // opacity="0"); its CHILDREN carry the staggered entrance. Group
            // visibility is then toggled OFF only by a `replace` directive — so
            // each property (group.autoAlpha, children.autoAlpha) is touched by
            // at most one timeline tween, avoiding seek-order ambiguity.
            gsap.set(nodes, { autoAlpha: 1 });
            gsap.set(kids.length ? kids : nodes, { autoAlpha: 0, y: 6 });
            break;
          }
          case "fade": {
            const dx = tw.from === "left" ? -FADE_TRAVEL : tw.from === "right" ? FADE_TRAVEL : 0;
            const dy = tw.from === "up" ? -FADE_TRAVEL : tw.from === "down" ? FADE_TRAVEL : 0;
            gsap.set(nodes, { autoAlpha: 0, x: dx, y: dy });
            break;
          }
          case "pulse-settle":
            gsap.set(nodes, { autoAlpha: 0 });
            break;
          case "morph":
            // starts at its authored path; nothing to pre-set
            break;
        }
      };

      // ── 2. Apply the tween onto the timeline at `pos`. Returns its duration. ─
      const addTween = (tl: TimelineLike, tw: BeatTween, pos: number): number => {
        const nodes = sel(tw.target);
        if (nodes.length === 0) return 0;
        const dflt = VERB_DEFAULTS[tw.verb] ?? { duration: 0.5, ease: "power2.out" };
        const duration = tw.duration ?? dflt.duration;
        const ease = safeEase(tw.ease, dflt.ease);

        switch (tw.verb) {
          case "draw":
          case "trace":
            if (hasDraw) tl.to(nodes, { drawSVG: "100%", duration, ease }, pos);
            else tl.to(nodes, { autoAlpha: 1, duration, ease }, pos);
            break;
          case "fill": {
            const horizontal = tw.from === "left" || tw.from === "right";
            nodes.forEach((n) => {
              const g = fillGeom.get(n);
              if (!g) return;
              tl.to(n, horizontal
                ? { attr: { width: g.W, x: g.X }, duration, ease }
                : { attr: { height: g.H, y: g.Y }, duration, ease }, pos);
            });
            break;
          }
          case "assemble": {
            const kids = nodes.flatMap((n) => Array.from(n.children));
            // Stagger the children in (the group is already visible from setPre).
            tl.to(kids.length ? kids : nodes, {
              autoAlpha: 1,
              y: 0,
              duration,
              ease,
              stagger: tw.stagger ?? 0.07,
            }, pos);
            break;
          }
          case "fade":
            tl.to(nodes, { autoAlpha: 1, x: 0, y: 0, duration, ease }, pos);
            break;
          case "pulse-settle": {
            const peak = tw.peak ?? 1;
            const settleTo = tw.settleTo ?? 0.85;
            tl.to(nodes, { autoAlpha: peak, duration: duration * 0.45, ease: "power2.out" }, pos);
            tl.to(nodes, { autoAlpha: settleTo, duration: duration * 0.55, ease: "power2.inOut" }, pos + duration * 0.45);
            break;
          }
          case "morph":
            if (hasMorph && tw.to) tl.to(nodes, { morphSVG: tw.to, duration, ease }, pos);
            else tl.to(nodes, { autoAlpha: 1, duration, ease }, pos);
            break;
        }
        return duration;
      };

      // Pre-set everything, then build the paused timeline beat by beat.
      spec.beats.forEach((b) => b.tweens.forEach(setPre));

      const tl = gsap.timeline({ paused: true });
      tl.addLabel("settle--1", 0); // notional "before beat 0"
      const settleTimes: number[] = [];
      spec.beats.forEach((beat, i) => {
        const beatStart = tl.duration();

        // `replace` layout: at this beat's START, fade OUT whatever element
        // currently occupies a slot, concurrently with the new entrant
        // animating in. One slot, one tenant — this is the structural cure for
        // the "writing over writing" vertical pile-up. The exit element was a
        // prior beat's entrant (already visible at this point on the timeline);
        // seeking back re-reveals it deterministically.
        const exits = (spec.replaces ?? []).filter((r) => r.beat === beat.id && r.exit);
        for (const r of exits) {
          // `exit` is an element id; replace directives carry bare ids (no "#"),
          // so normalise before selecting (a bare id would be read as a tag).
          const target = /^[#.]/.test(r.exit as string) ? (r.exit as string) : `#${r.exit}`;
          const exitNodes = sel(target);
          if (exitNodes.length) {
            tl.to(exitNodes, { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, beatStart);
          }
        }

        let cursor = beatStart;
        for (const tw of beat.tweens) {
          const pos = tw.at != null ? beatStart + tw.at : cursor;
          const dur = addTween(tl, tw, pos);
          if (tw.at == null) cursor = pos + dur;
        }
        // A beat whose targets all resolved to nothing adds 0 duration; its
        // label then coincides with the previous settle point — harmless
        // (there is nothing to reveal), and seeking to either lands correctly.
        tl.addLabel(`settle-${i}`);
        settleTimes[i] = tl.duration(); // absolute time of this beat's settle
      });

      tl.pause();
      tl.seek("settle-0"); // beat 0 shown settled, no animation
      tlRef.current = tl;
      settleTimesRef.current = settleTimes;
      if (!cancelled) {
        setCurrentBeat(0);
        setReady(true);
      }
    })();

    return () => {
      cancelled = true;
      const tl = tlRef.current as TimelineLike | null;
      if (tl) tl.kill();
      const playing = playingRef.current as TweenLike | null;
      if (playing) playing.kill();
      tlRef.current = null;
      // Remove the live reduced-motion listener
      if (mqRef.current && mqHandlerRef.current) {
        mqRef.current.removeEventListener("change", mqHandlerRef.current);
      }
    };
    // Build once per (svg, spec) identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg, spec]);

  // ── Controls ───────────────────────────────────────────────────────────────
  const atFirst = currentBeat <= 0;
  const atLast = currentBeat >= totalBeats - 1;

  function goTo(target: number, instant: boolean) {
    const tl = tlRef.current as TimelineLike | null;
    const gsap = gsapRef.current as GsapLike | null;
    if (!tl) return;
    const playing = playingRef.current as TweenLike | null;
    if (playing) playing.kill();

    const times = settleTimesRef.current;
    const toT = times[target] ?? 0;

    if (instant || reduced || !gsap) {
      tl.time(toT);
      setCurrentBeat(target);
      return;
    }

    // Animate the playhead by tweening a plain proxy object and driving
    // tl.time() on each update. This is what tweenTo() does internally but is
    // robust on a PAUSED timeline (tweenTo's own tween can fail to tick on a
    // paused parent). A normal gsap.to on a proxy always autoplays + completes.
    const fromT = times[currentBeat] ?? 0;
    const proxy = { t: fromT };
    setAnimating(true);
    const tween = gsap.to(proxy, {
      t: toT,
      duration: Math.max(0.2, Math.abs(toT - fromT)),
      ease: "none",
      onUpdate: () => {
        tl.time(proxy.t);
      },
      onComplete: () => {
        tl.time(toT);
        setAnimating(false);
        playingRef.current = null;
      },
    });
    playingRef.current = tween;
    setCurrentBeat(target);
  }

  function handlePrev() {
    if (atFirst || animating) return;
    goTo(currentBeat - 1, true); // Précédent is always instant
  }
  function handleNext() {
    if (animating) return;
    if (atLast) {
      goTo(0, true); // Recommencer — instant reset to beat 0
    } else {
      goTo(currentBeat + 1, false); // Suivant — animate one beat
    }
  }

  const btnBase = cn(
    "inline-flex items-center gap-1.5 px-3 py-2",
    // §9 touch target: 48px (raised from 44px per audit finding #2)
    "min-h-[48px] min-w-[48px] rounded-md",
    "text-caption font-medium",
    "text-[var(--color-text-secondary)]",
    "border border-[var(--color-border-subtle)]",
    "bg-[var(--color-surface-raised)]",
    "hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-soft)]",
    "transition-colors duration-micro",
    // Focus ring — migrated to .focus-ring utility
    "focus-ring",
    "disabled:opacity-[var(--state-disabled)] disabled:cursor-not-allowed"
  );

  const currentCaption = spec.beats[currentBeat]?.caption;

  return (
    <figure aria-label={figureLabel} className={cn("my-10 notion-wide-band", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl",
          "bg-[var(--color-surface-raised)]",
          // Shadow-first card (ADR 0023): elevation-1 hairline ring holds the
          // edge; the drawn border is dropped.
          "shadow-elevation-1",
          // The SVG renders at its true aspect within the wide band — the old
          // max-height cap is DROPPED (it was the source of clipping/overlap).
          "[&_svg]:w-full [&_svg]:h-auto [&_svg]:block"
        )}
      >
        {/* The SVG is injected imperatively in the effect (see note there);
            this container stays empty in JSX so React never re-injects it.
            aspectRatio (from the spec viewBox) reserves space to avoid layout
            shift before the client-side injection paints. */}
        <div
          ref={stageRef}
          className="flex justify-center [&>svg]:w-full"
          style={aspectRatio ? { aspectRatio } : undefined}
          aria-hidden="true"
        />
      </div>

      {/* Controls — shown once the engine is ready. Under reduced-motion they
          still advance (instant seeks); there is always something to step to. */}
      <div
        className="mt-3 flex items-center gap-2 flex-wrap"
        role="group"
        aria-label={`Contrôles : ${figureLabel}`}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={!ready || atFirst || animating}
          className={btnBase}
          aria-label="Étape précédente"
        >
          <IconPrev />
          {/* #8: keep labels visible on mobile — footer flex-wraps so width is fine */}
          <span>Précédent</span>
        </button>

        {/* Step indicator — functional UI text: must pass 4.5:1.
            Promoted from tertiary (#1 fix) to secondary (#4A5568 light ≈7:1, #9AAABF dark ≈6:1) */}
        <span
          className={cn(
            "text-caption text-[var(--color-text-secondary)]",
            "tabular-nums select-none min-w-[6ch] text-center"
          )}
          aria-live="polite"
          aria-atomic="true"
        >
          {`Étape ${currentBeat + 1} / ${totalBeats}`}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={!ready || animating}
          className={btnBase}
          aria-label={atLast ? "Recommencer depuis l'étape 1" : "Étape suivante"}
          aria-describedby={currentCaption ? captionId : undefined}
        >
          {atLast ? (
            <>
              <IconReset />
              {/* #8: Recommencer label always visible — appears only at last beat,
                  width is fine; bare icon alone is not self-evident */}
              <span>Recommencer</span>
            </>
          ) : (
            <>
              {/* #8: keep Suivant label visible on mobile */}
              <span>Suivant</span>
              <IconNext />
            </>
          )}
        </button>
      </div>

      {/* Per-beat caption — announced politely, replaces in place (one slot).
          #9: rendered at body-sm (14px) — explanatory prose, not metadata.
          #1: promoted to secondary color for 4.5:1 contrast floor. */}
      {currentCaption && (
        <figcaption
          id={captionId}
          className={cn(
            "mt-2 text-body-sm text-[var(--color-text-secondary)]",
            "text-center max-w-[65ch] mx-auto"
          )}
          aria-live="polite"
        >
          {currentCaption}
        </figcaption>
      )}
    </figure>
  );
}
