/**
 * MarginRail
 *
 * Sticky left-margin chapter NAVIGATOR (LESSON-EXPERIENCE-SPEC §1.4 — was a
 * passive rung wayfinder before pagination landed; a click now ACTIVATES a
 * chapter via `ChapterShell`'s context instead of jumping to an anchor).
 *
 * Entries = every `## ` heading in lesson.md (widened from "rungs only" to
 * cover the one non-rung exception — probabilites-conditionnelles, ledger
 * 11.11), plus a synthetic final "S'entraîner" entry when `hasItems`. This
 * list is built with the SAME `extractChapterHeadings` helper NotionPageView
 * uses to size `ChapterShell`'s `totalChapters` (lib/chapters.ts) — rail and
 * shell can never disagree on how many chapters exist.
 *
 * The rAF scroll-spy that used to compute "active" from scroll position is
 * GONE (LESSON-EXPERIENCE-SPEC §1.4: "le code spy est retiré du chemin
 * paginé... il meurt") — active is now simply `current` from ChapterShell's
 * context, pushed down, not measured.
 *
 * Progress spine: a vertical line runs through all entries. The portion of
 * the spine ABOVE (and including) the active entry is rendered in the accent
 * color; below it in border-subtle. Calm — no animation, just a CSS gradient
 * read off `current`.
 *
 * Active-entry dot, hover title reveal, keyboard-focusable button, .focus-ring,
 * ≥48px effective touch target — unchanged from the pre-pagination version.
 *
 * No browser storage — active state lives in ChapterShell's React context,
 * reset on page navigation like any other in-memory state.
 *
 * CLIENT component (context consumer + click handlers).
 */

"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { extractChapterHeadings, type ChapterHeadingInfo } from "@/lib/chapters";
import { useChapter, ChapterPosition } from "./ChapterShell";

interface RailEntry {
  title: string;
  shortTitle: string;
  /** Honest sujet count on the trailing « S'entraîner » entry (BANK-SPEC §1). */
  count?: number;
}

interface MarginRailProps {
  /** Raw lesson markdown — used to extract chapter headings */
  lessonMd: string;
  /** Whether a synthetic final "S'entraîner" chapter follows (bank.yaml exists). */
  hasItems?: boolean;
  /** Bank entry count — renders « N sujets » on the practice entry (BANK-SPEC §1). */
  bankCount?: number;
}

const FALLBACK_ENTRY: ChapterHeadingInfo = { title: "Leçon", shortTitle: "Leçon" };

export function MarginRail({ lessonMd, hasItems = false, bankCount }: MarginRailProps) {
  const headings = useMemo(() => extractChapterHeadings(lessonMd), [lessonMd]);
  const { current, goTo } = useChapter();

  // Nothing to navigate: no headings and no exercises chapter (mirrors the
  // pre-pagination "0 rungs → hide the rail" behavior).
  if (headings.length === 0 && !hasItems) return null;

  // Real chapters (never empty — the "Leçon" fallback keeps this array's
  // length equal to lib/chapters.ts's `realChapterCount`, which also clamps
  // to min 1, so the synthetic entry below always lands at the right index).
  // A FRESH array, never `headings` itself: `headings` is useMemo-cached
  // keyed on `lessonMd`, so mutating it in place (e.g. via .push) would leak
  // an extra "S'entraîner" entry onto the SAME cached array on every
  // subsequent render while lessonMd is unchanged.
  const realEntries: RailEntry[] = headings.length > 0 ? headings : [FALLBACK_ENTRY];
  // A FRESH practice entry per render (never a module-level constant mutated in
  // place): the honest count is derived from `bankCount` at call time.
  const practiceEntry: RailEntry = {
    title: "S'entraîner",
    shortTitle: "S'entraîner",
    count: bankCount,
  };
  const entries: RailEntry[] = hasItems ? [...realEntries, practiceEntry] : realEntries;

  return (
    <nav className="notion-rail" aria-label="Navigation par chapitre de la leçon">
      <ChapterPosition className="mb-3" />
      <ol className="relative flex flex-col pt-1" role="list">
        {entries.map((entry, i) => {
          const isActive = current === i;
          // An entry is "read" if it is before or at the active one.
          const isRead = i <= current;

          return (
            <li key={i} className="relative">
              {/*
                The spine segment for this entry: a 1px vertical line that
                bridges from the top of this item to the bottom. Drawn
                explicitly per-entry so the read portion vs unread can be
                colored independently. Hidden on the last entry (no segment
                below).
              */}
              {i < entries.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    // Positioned from the dot center (top: ~22px) down to bottom of li
                    "absolute left-[5.5px] top-[22px] bottom-0 w-px",
                    // Read segment: accent color; unread: border-subtle
                    isRead ? "bg-accent" : "bg-[var(--color-border-subtle)]"
                  )}
                />
              )}

              <button
                type="button"
                onClick={() => goTo(i)}
                title={entry.title}
                // Active entry exposed to AT, not only by color (July-2026
                // audit F3 side-finding: color-swap was the sole signal).
                // "step" (not "location"): this is now a paginated sequence
                // activated by click, not an in-page anchor jump.
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  // §9 touch target: 48px (raised from 44px per audit finding #2)
                  "group relative flex w-full items-center gap-2 text-left",
                  "min-h-[48px] py-2 pr-2 rounded-sm",
                  "bg-transparent",
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
                    // #1: idle entry label is 12px functional text — must pass 4.5:1.
                    // Promoted from tertiary to secondary (#4A5568 light ≈7:1, #9AAABF dark ≈6:1).
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {/* Entry node on the spine */}
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

                {/* Entry label — the human section name (audit U3: the R-codes
                    are spec vocabulary and never render; wayfinding is words).
                    Text shows from the expanded rail (176px) up; the medium
                    rail (52px) is dots-only with the full title on hover. */}
                {/* Never truncate (Day-3 fallout fix): the 208px rail fits every
                    current name; an unusually long future name wraps to a
                    second line rather than ellipsizing wayfinding words. */}
                {/* The ordinal mirrors the in-prose heading counter (Day-6
                    followability) — rail and page tell one map. Human 1-based
                    numbering, never the R-codes. */}
                <span className="hidden bp-expanded:block leading-tight min-w-0">
                  <span className="tabular-nums">{i + 1}</span>
                  {" · "}
                  {entry.shortTitle}
                  {/* Honest sujet count on the trailing bank entry (BANK-SPEC
                      §1) — a quiet parenthetical, never a progress meter. */}
                  {entry.count != null && (
                    <span
                      data-bank-rail-count
                      className="ml-1 text-[var(--color-text-tertiary)] tabular-nums"
                    >
                      · {entry.count} sujet{entry.count > 1 ? "s" : ""}
                    </span>
                  )}
                </span>

                {/*
                  Hover-reveal title: positioned absolutely so it never shifts
                  the content column. Fades + slides in from the right of the
                  label. z-50 to float above everything.
                  pointer-events-none so it doesn't eat click events meant for
                  the underlying button.
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
                  {entry.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
