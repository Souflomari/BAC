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
 * No browser storage — active state is ephemeral React state from
 * IntersectionObserver, reset on page navigation.
 *
 * CLIENT component for IntersectionObserver and DOM queries.
 */

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface RungDef {
  label: string;    // e.g. "R0"
  title: string;    // e.g. "Accroche : le balancement électrique"
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

    rungs.push({ label, title });
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
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (rungDefs.length === 0) return;

    const allH2 = Array.from(document.querySelectorAll<HTMLElement>("h2"));

    const resolved: ResolvedRung[] = rungDefs.map((def) => {
      const el = allH2.find((h) => {
        const text = h.textContent?.trim() ?? "";
        return text.startsWith(def.label);
      }) ?? null;

      const href = el?.id ? `#${el.id}` : "#";
      return { ...def, el, href };
    });

    setResolvedRungs(resolved);

    observerRef.current?.disconnect();

    const observableEls = resolved
      .map((r) => r.el)
      .filter(Boolean) as HTMLElement[];

    if (observableEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      () => {
        let found: string | null = null;
        for (const r of resolved) {
          if (!r.el) continue;
          const rect = r.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            found = r.label;
          }
        }
        setActiveLabel(found);
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: 0,
      }
    );

    observableEls.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
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
                  // ≥44px effective touch target: py-2.5 gives 10px*2=20px +
                  // the content height (~20px) = ≥40px; we pad to min-h-[44px].
                  "group relative flex items-center gap-2",
                  "min-h-[44px] py-2 pr-2 rounded-sm",
                  "text-caption font-medium",
                  // Transition for color changes
                  "transition-colors duration-[150ms] ease-enter",
                  // Focus ring — migrated from ad-hoc pattern
                  "focus-ring",
                  isActive
                    ? "text-accent"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
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
                    "transition-all duration-[250ms]",
                    // Tailwind can't express cubic-bezier directly in class,
                    // so we use the Tailwind token name from tailwind.config.ts
                    "ease-emphasized",
                    isActive
                      ? [
                          "w-2.5 h-2.5",
                          "bg-accent",
                          // Subtle outer ring for the active node
                          "ring-2 ring-accent/20 ring-offset-1",
                          "ring-offset-[var(--color-surface-base)]",
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

                {/* Rung label — short (R0, R1, …) */}
                <span className="leading-none tabular-nums flex-shrink-0">{rung.label}</span>

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
                    "transition-[opacity,transform] duration-[150ms] ease-enter",
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
