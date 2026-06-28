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
  duration(): number;
  addLabel(label: string, position?: string | number): TimelineLike;
  to(targets: unknown, vars: Vars, position?: string | number): TimelineLike;
  tweenTo(position: string | number, vars?: Vars): TweenLike;
}
interface GsapLike {
  registerPlugin(...args: unknown[]): void;
  set(targets: unknown, vars: Vars): void;
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
  const playingRef = useRef<unknown>(null); // active tweenTo tween, if any

  const totalBeats = spec.beats.length;
  const [currentBeat, setCurrentBeat] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  const figureLabel = label ?? spec.label ?? spec.slug;
  const captionId = useId();

  // ── Build the timeline once, after the SVG is in the DOM ───────────────────
  useEffect(() => {
    let cancelled = false;
    const root = stageRef.current;
    if (!root) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReduced = mq.matches;
    setReduced(isReduced);

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

      // ── 1. Pre-state: hide / reset every animated target across ALL beats. ──
      // Idempotent with the authored SVG (later-beat elements authored hidden),
      // so this does not flash.
      const setPre = (tw: BeatTween) => {
        const nodes = sel(tw.target);
        if (nodes.length === 0) return;
        switch (tw.verb) {
          case "draw":
          case "trace":
            if (hasDraw) gsap.set(nodes, { drawSVG: "0%" });
            else gsap.set(nodes, { autoAlpha: 0 });
            break;
          case "fill": {
            const origin =
              tw.from === "left" ? "0% 50%"
              : tw.from === "right" ? "100% 50%"
              : tw.from === "up" ? "50% 0%"
              : "50% 100%"; // default: grow up from bottom
            const axis = tw.from === "left" || tw.from === "right" ? "scaleX" : "scaleY";
            gsap.set(nodes, { [axis]: 0, transformOrigin: origin });
            break;
          }
          case "assemble": {
            const kids = nodes.flatMap((n) => Array.from(n.children));
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
            const axis = tw.from === "left" || tw.from === "right" ? "scaleX" : "scaleY";
            tl.to(nodes, { [axis]: 1, duration, ease }, pos);
            break;
          }
          case "assemble": {
            const kids = nodes.flatMap((n) => Array.from(n.children));
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
      spec.beats.forEach((beat, i) => {
        const beatStart = tl.duration();
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
      });

      tl.pause();
      tl.seek("settle-0"); // beat 0 shown settled, no animation
      tlRef.current = tl;
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
    };
    // Build once per (svg, spec) identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg, spec]);

  // ── Controls ───────────────────────────────────────────────────────────────
  const atFirst = currentBeat <= 0;
  const atLast = currentBeat >= totalBeats - 1;

  function goTo(target: number, instant: boolean) {
    const tl = tlRef.current as TimelineLike | null;
    if (!tl) return;
    const playing = playingRef.current as TweenLike | null;
    if (playing) playing.kill();

    if (instant || reduced) {
      tl.pause();
      tl.seek(`settle-${target}`);
      setCurrentBeat(target);
      return;
    }
    setAnimating(true);
    const tween = tl.tweenTo(`settle-${target}`, {
      ease: "none",
      onComplete: () => {
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
    "min-h-[44px] min-w-[44px] rounded-md",
    "text-caption font-medium",
    "text-[var(--color-text-secondary)]",
    "border border-[var(--color-border-subtle)]",
    "bg-[var(--color-surface-raised)]",
    "hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-soft)]",
    "transition-colors duration-[150ms]",
    "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2",
    "disabled:opacity-40 disabled:cursor-not-allowed"
  );

  const currentCaption = spec.beats[currentBeat]?.caption;

  return (
    <figure aria-label={figureLabel} className={cn("my-10 notion-wide-band", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl",
          "bg-[var(--color-surface-raised)]",
          "border border-[var(--color-border-subtle)]",
          // The SVG renders at its true aspect within the wide band — the old
          // max-height cap is DROPPED (it was the source of clipping/overlap).
          "[&_svg]:w-full [&_svg]:h-auto [&_svg]:block"
        )}
      >
        <div
          ref={stageRef}
          className="flex justify-center"
          dangerouslySetInnerHTML={{ __html: svg }}
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
          <span className="hidden sm:inline">Précédent</span>
        </button>

        <span
          className={cn(
            "text-caption text-[var(--color-text-tertiary)]",
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
              <span className="hidden sm:inline">Recommencer</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Suivant</span>
              <IconNext />
            </>
          )}
        </button>
      </div>

      {/* Per-beat caption — announced politely, replaces in place (one slot). */}
      {currentCaption && (
        <figcaption
          id={captionId}
          className={cn(
            "mt-2 text-caption text-[var(--color-text-tertiary)]",
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
