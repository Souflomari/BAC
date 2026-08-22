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

import { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { extractChapterHeadings, type ChapterHeadingInfo } from "@/lib/chapters";
import { Icon } from "@/components/ui/Icon";
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
      <ChapterPosition className="mb-1" />
      {/* L'indice clavier (audit ergonomie P2-7) : les flèches ← → changent
          de chapitre depuis ChapterShell, mais rien à l'écran ne le disait —
          une capacité invisible n'existe pas. Tertiaire, une ligne, rien
          de plus. */}
      <p aria-hidden="true" className="mb-3 text-caption text-tertiary">
        ← → pour naviguer
      </p>
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
              {/* Audit R6 (visuel P1-6) : la ligne était en morceaux — les
                  segments s'arrêtaient au bas de l'item (le haut du suivant,
                  jusqu'à sa pastille, restait nu) et les pastilles de 6 et
                  10 px n'avaient pas d'axe commun. Désormais : gabarit fixe
                  de 10 px pour la colonne des pastilles (axe unique à 5 px),
                  pastille calée sur la PREMIÈRE ligne (items-start + boîte
                  d'une ligne), et le segment court de sous cette pastille
                  jusqu'au bord de la suivante (-bottom déborde dans le li
                  voisin ; les pastilles, z-10 et pleines, le recouvrent). */}
              {i < entries.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[4.5px] top-[21px] -bottom-[13px] w-px",
                    isRead ? "bg-accent" : "bg-border-subtle"
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
                  // items-start : sur un libellé de 2-3 lignes, la pastille
                  // reste sur la première ligne au lieu de flotter au milieu.
                  "group relative flex w-full items-start gap-2 text-left",
                  "min-h-touch py-2 pr-2 rounded-sm",
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
                    : "text-secondary hover:text-primary"
                )}
              >
                {/* Entry node on the spine — dans une boîte d'UNE ligne de
                    texte (h-[18px]) et de largeur fixe (w-2.5 = le diamètre
                    actif) : la pastille se centre sur la première ligne et
                    sur l'axe commun, quelle que soit sa taille. */}
                <span
                  aria-hidden="true"
                  className="flex h-[15px] w-2.5 flex-shrink-0 items-center justify-center"
                >
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
                            "bg-border-soft",
                            "group-hover:bg-text-tertiary",
                            "scale-100 opacity-100",
                          ]
                  )}
                  aria-hidden="true"
                />
                </span>

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
                      className="ml-1 text-tertiary tabular-nums"
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
                    "text-caption text-secondary",
                    "bg-surface-overlay",
                    "border border-subtle",
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

// ── ChapterMenuCompact — la navigation par chapitre SOUS 600 px ─────────────
// Audit R6 (ergonomie P1-7) : en colonne compacte le rail est display:none et
// il ne restait que le texte inerte « Chapitre 1 / 10 » — atteindre le
// chapitre 7 exigeait six « Chapitre suivant » avec un défilement complet
// entre chaque. §1 demande une adaptation vers le bas, pas une perte de
// capacité. Ce menu est un <details> fermé par défaut : le même libellé
// devient le déclencheur, la liste est CELLE du rail (mêmes props, même
// construction d'entrées — les deux surfaces ne peuvent pas diverger).
export function ChapterMenuCompact({
  lessonMd,
  hasItems = false,
  bankCount,
  className,
}: MarginRailProps & { className?: string }) {
  const headings = useMemo(() => extractChapterHeadings(lessonMd), [lessonMd]);
  const { current, total, goTo } = useChapter();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (headings.length === 0 && !hasItems) return null;
  if (total <= 1) return null; // rien à naviguer — pas de théâtre

  const realEntries: RailEntry[] = headings.length > 0 ? headings : [FALLBACK_ENTRY];
  const practiceEntry: RailEntry = {
    title: "S'entraîner",
    shortTitle: "S'entraîner",
    count: bankCount,
  };
  const entries: RailEntry[] = hasItems ? [...realEntries, practiceEntry] : realEntries;

  return (
    <details ref={detailsRef} className={cn("group", className)}>
      <summary
        className={cn(
          "flex min-h-touch cursor-pointer list-none items-center gap-2 rounded-lg",
          "text-body-sm text-secondary",
          "state-layer focus-ring [--focus-radius:8px] px-2 -mx-2",
          "[&::-webkit-details-marker]:hidden"
        )}
      >
        <span aria-live="polite">{`Chapitre ${current + 1} / ${total}`}</span>
        <Icon
          name="chevron-right"
          size={14}
          className="rotate-90 transition-transform duration-micro ease-enter group-open:rotate-[270deg]"
        />
      </summary>
      <ol
        role="list"
        className="mt-1 rounded-lg border border-subtle bg-surface-raised p-1 shadow-elevation-1"
      >
        {entries.map((entry, i) => (
          <li key={i}>
            <button
              type="button"
              aria-current={current === i ? "step" : undefined}
              onClick={() => {
                goTo(i);
                if (detailsRef.current) detailsRef.current.open = false;
              }}
              className={cn(
                "flex min-h-touch w-full items-center gap-2 rounded-md px-3 py-1.5 text-left",
                "text-body-sm state-layer focus-ring [--focus-radius:6px]",
                current === i ? "font-medium text-accent" : "text-secondary"
              )}
            >
              <span className="tabular-nums">{i + 1}</span>
              {" · "}
              <span className="min-w-0">{entry.shortTitle}</span>
              {entry.count != null && (
                <span className="ml-auto shrink-0 font-mono text-caption tabular-nums text-tertiary">
                  {entry.count} sujet{entry.count > 1 ? "s" : ""}
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </details>
  );
}
