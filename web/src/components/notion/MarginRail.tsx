/**
 * MarginRail
 *
 * Sticky left-margin wayfinder listing the lesson rungs (R0–R7…).
 *
 * Phase 4 — craft polish:
 *
 * Progress spine: a vertical line runs through all rungs. The portion of
 * the spine ABOVE (and including) the active rung is rendered in the accent
 * color; below it in border-subtle. This gives a calm reading-progress fill
 * without any animation — just a CSS gradient on the spine line.
 *
 * Active rung dot: scales in with a 250ms emphasized ease when it first
 * becomes active (one-shot, no looping). CSS transition on transform/opacity.
 *
 * Hover title reveal: on hover/focus, the rung's full title label
 * slides/fades in to the right of the dot+label cluster. Positioned
 * absolutely so it does NOT shift the content column layout.
 *
 * Keyboard-focusable, .focus-ring, ≥44px effective touch target.
 * Calm — the calm-load critic is the adversary; nothing loops or pulses.
 *
 * Design requirements:
 * - Quiet / muted — never loud
 * - Keyboard-focusable links
 * - Sticky; aligned with content column
 * - Current rung highlighted
 * - Desktop only (900px+)
 *
 * No browser storage — active state is ephemeral React state from a
 * rAF-throttled scroll listener, reset on page navigation.
 *
 * CLIENT component for scroll tracking and DOM queries.
 */

"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface RungDef {
  label: string;    // internal rung code, e.g. "R0" — used for h2 matching/keys, NEVER displayed (audit U3: no spec jargon in student chrome)
  title: string;    // e.g. "Accroche : le balancement électrique"
  shortTitle: string; // resting rail label, e.g. "Accroche" — title cut at " : " / " ("
}

/**
 * Derive the short resting label from a rung title: the part before " : " or
 * " (" reads as the section's name ("Accroche", "Le cas amorti"); titles with
 * neither stay whole (and wrap if ever too long). Also keeps raw KaTeX ($T_0$) out of
 * the rail — the dollar-bearing tails sit after these separators.
 */
function shortTitleOf(title: string): string {
  const cut = title.split(" : ")[0].split(" (")[0].trim();
  return cut.length > 0 ? cut : title;
}

interface MarginRailProps {
  /** Raw lesson markdown — used to extract rung headings */
  lessonMd: string;
}

/**
 * Extract rung definitions from lesson markdown.
 * Matches lines like: ## R0 — Accroche : le balancement électrique
 */
function extractRungDefs(markdown: string): RungDef[] {
  const rungs: RungDef[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const m = line.match(/^##\s+(R\d+(?:\s*[-—]\s*.+)?)\s*$/);
    if (!m) continue;

    const fullText = m[1].trim();
    const labelMatch = fullText.match(/^(R\d+)/);
    if (!labelMatch) continue;
    const label = labelMatch[1];

    const sepMatch = fullText.match(/^R\d+\s*[-—]\s*(.+)$/);
    const title = sepMatch ? sepMatch[1].trim() : fullText;

    rungs.push({ label, title, shortTitle: shortTitleOf(title) });
  }

  return rungs;
}

interface ResolvedRung extends RungDef {
  el: HTMLElement | null;
  href: string;
}

export function MarginRail({ lessonMd }: MarginRailProps) {
  const rungDefs = useMemo(() => extractRungDefs(lessonMd), [lessonMd]);
  const [resolvedRungs, setResolvedRungs] = useState<ResolvedRung[]>([]);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    if (rungDefs.length === 0) return;

    // Rung headings are matched by the data-rung attribute LessonRenderer sets
    // (the visible R-code was removed from student-facing render — audit U3 —
    // so textContent matching is no longer possible or desirable).
    const resolved: ResolvedRung[] = rungDefs.map((def) => {
      const el = document.querySelector<HTMLElement>(
        `h2[data-rung="${def.label}"]`
      );
      const href = el?.id ? `#${el.id}` : "#";
      return { ...def, el, href };
    });

    setResolvedRungs(resolved);

    const els = resolved.filter((r) => r.el);
    if (els.length === 0) return;

    // Scroll-spy (Day-3 fallout fix — the IntersectionObserver version only
    // recomputed on threshold crossings and visibly lagged a section behind).
    // Deterministic rule, evaluated on every scroll frame (rAF-throttled):
    // the active rung is the LAST heading whose top has passed the reading
    // line (header 56px + one line of breathing room). Passive listener;
    // cheap (≤10 getBoundingClientRect per frame, only while scrolling).
    const READING_LINE = 96;
    let ticking = false;
    function computeActive() {
      ticking = false;
      let found: string | null = null;
      for (const r of els) {
        if (r.el!.getBoundingClientRect().top <= READING_LINE) found = r.label;
        else break; // headings are in document order — first miss ends it
      }
      setActiveLabel(found ?? els[0].label);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeActive);
      }
    }
    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [rungDefs]);

  if (rungDefs.length === 0) return null;

  const rungs = resolvedRungs.length > 0 ? resolvedRungs : rungDefs.map((def) => ({
    ...def,
    el: null,
    href: "#",
  }));

  // Determine the index of the active rung for the progress spine
  const activeIndex = rungs.findIndex((r) => r.label === activeLabel);

  return (
    <nav
      className="notion-rail"
      aria-label="Navigation par rung de la leçon"
    >
      <ol
        className="relative flex flex-col pt-1"
        role="list"
      >
        {rungs.map((rung, i) => {
          const isActive = activeLabel === rung.label;
          // A rung is "read" if it is before or at the active rung
          const isRead = activeIndex >= 0 && i <= activeIndex;

          return (
            <li key={rung.label} className="relative">
              {/*
                The spine segment for this rung: a 1px vertical line that
                bridges from the top of this item to the bottom. We draw it
                explicitly per-rung so we can color the read portion vs unread.
                Hidden on the last rung (no segment below).
              */}
              {i < rungs.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    // Positioned from the dot center (top: ~22px) down to bottom of li
                    "absolute left-[5.5px] top-[22px] bottom-0 w-px",
                    // Read segment: accent color; unread: border-subtle
                    isRead
                      ? "bg-accent"
                      : "bg-[var(--color-border-subtle)]"
                  )}
                />
              )}

              <a
                href={rung.href}
                title={rung.title}
                className={cn(
                  // §9 touch target: 48px (raised from 44px per audit finding #2)
                  "group relative flex items-center gap-2",
                  "min-h-[48px] py-2 pr-2 rounded-sm",
                  "text-caption font-medium",
                  // Unified neutral interaction wash on the rounded hit-area
                  // (ADR 0024 state-layer). The dot/text-color active+hover
                  // treatment remains the secondary channel.
                  "state-layer",
                  // Transition for color changes
                  "transition-colors duration-micro ease-enter",
                  // Focus ring — migrated from ad-hoc pattern
                  "focus-ring",
                  isActive
                    ? "text-accent"
                    // #1: idle rung label is 12px functional text — must pass 4.5:1.
                    // Promoted from tertiary to secondary (#4A5568 light ≈7:1, #9AAABF dark ≈6:1).
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {/* Rung node on the spine */}
                <span
                  className={cn(
                    "relative z-10 flex-shrink-0",
                    // Dot: 6px diameter for read/idle, 8px for active
                    "rounded-full",
                    // One-shot scale settle when becoming active:
                    // transition on transform+opacity with emphasized ease.
                    // The CSS global reduced-motion rule will collapse this to
                    // 0.01ms, so no-transition in reduced-motion contexts.
                    "transition-all duration-standard",
                    // Tailwind can't express cubic-bezier directly in class,
                    // so we use the Tailwind token name from tailwind.config.ts
                    "ease-emphasized",
                    isActive
                      ? [
                          "w-2.5 h-2.5",
                          "bg-accent",
                          // Ring halo removed: size-step + accent fill alone say "you are here"
                          // (calm-load audit finding #5 — three emphasis channels is over-recruited)
                          "scale-100 opacity-100",
                        ]
                      : isRead
                        ? [
                            "w-1.5 h-1.5",
                            "bg-accent/40",
                            "scale-100 opacity-100",
                          ]
                        : [
                            "w-1.5 h-1.5",
                            "bg-[var(--color-border-soft)]",
                            "group-hover:bg-[var(--color-text-tertiary)]",
                            "scale-100 opacity-100",
                          ]
                  )}
                  aria-hidden="true"
                />

                {/* Rung label — the human section name (audit U3: the R-codes
                    are spec vocabulary and never render; wayfinding is words).
                    Text shows from the expanded rail (176px) up; the medium
                    rail (52px) is dots-only with the full title on hover. */}
                {/* Never truncate (Day-3 fallout fix): the 208px rail fits every
                    current name; an unusually long future name wraps to a
                    second line rather than ellipsizing wayfinding words. */}
                <span className="hidden bp-expanded:block leading-tight min-w-0">
                  {rung.shortTitle}
                </span>

                {/*
                  Hover-reveal title: positioned absolutely so it never shifts
                  the content column. Fades + slides in from the right of the
                  label. z-50 to float above everything.
                  pointer-events-none so it doesn't eat click events meant for
                  the underlying anchor.
                */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-full ml-3",
                    "whitespace-nowrap",
                    "px-2 py-1 rounded",
                    "text-caption text-[var(--color-text-secondary)]",
                    "bg-[var(--color-surface-overlay)]",
                    "border border-[var(--color-border-subtle)]",
                    "shadow-elevation-2",
                    "pointer-events-none",
                    "z-50",
                    // Fade + slide: hidden by default, visible on group hover/focus
                    "opacity-0 -translate-x-1",
                    "group-hover:opacity-100 group-hover:translate-x-0",
                    "group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                    "transition-[opacity,transform] duration-micro ease-enter",
                    // Cap the tooltip at a reasonable width for long titles
                    "max-w-[28ch] truncate"
                  )}
                >
                  {rung.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
