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

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { type ChapterHeadingInfo } from "@/lib/chapters";
import { Icon } from "@/components/ui/Icon";
import { useChapter, ChapterPosition } from "./ChapterShell";
import { useHydrated } from "@/lib/useHydrated";

interface RailEntry {
  title: string;
  shortTitle: string;
  /** Honest sujet count on the trailing « S'entraîner » entry (BANK-SPEC §1). */
  count?: number;
}

interface MarginRailProps {
  /**
   * Les titres de chapitre, DÉJÀ extraits — pas le markdown de la leçon.
   *
   * Ces deux composants sont des composants CLIENT : tout ce qu'on leur passe
   * est sérialisé dans la charge RSC du document, en plus du DOM rendu. Tant
   * qu'ils recevaient `lessonMd`, la leçon entière (49 ko sur
   * `suites-numeriques`) partait DEUX fois sur le fil — une par frontière
   * client — pour n'en tirer qu'une liste de titres. §11.175.
   *
   * `extractChapterHeadings` reste la source unique : elle est simplement
   * appelée une fois, sur le serveur, par NotionPageView, qui passe le même
   * tableau aux deux surfaces — elles ne peuvent donc toujours pas diverger.
   */
  headings: ChapterHeadingInfo[];
  /** Whether a synthetic final "S'entraîner" chapter follows (bank.yaml exists). */
  hasItems?: boolean;
  /** Bank entry count — renders « N sujets » on the practice entry (BANK-SPEC §1). */
  bankCount?: number;
}

const FALLBACK_ENTRY: ChapterHeadingInfo = { title: "Leçon", shortTitle: "Leçon" };

export function MarginRail({ headings, hasItems = false, bankCount }: MarginRailProps) {
  const { current, goTo } = useChapter();
  const hydrated = useHydrated();

  // Nothing to navigate: no headings and no exercises chapter (mirrors the
  // pre-pagination "0 rungs → hide the rail" behavior).
  if (headings.length === 0 && !hasItems) return null;

  // Real chapters (never empty — the "Leçon" fallback keeps this array's
  // length equal to lib/chapters.ts's `realChapterCount`, which also clamps
  // to min 1, so the synthetic entry below always lands at the right index).
  // A FRESH array, never `headings` itself: `headings` is now a PROP, donc le
  // même objet d'un rendu à l'autre — et le MÊME tableau que reçoit
  // ChapterMenuCompact. Le muter en place (via .push) ferait fuir une entrée
  // « S'entraîner » en trop sur les deux surfaces à la fois. Le danger n'a pas
  // disparu avec le useMemo : il a doublé.
  const realEntries: RailEntry[] = headings.length > 0 ? headings : [FALLBACK_ENTRY];
  // A FRESH practice entry per render (never a module-level constant mutated in
  // place): the honest count is derived from `bankCount` at call time.
  const practiceEntry: RailEntry = {
    // Apostrophe TYPOGRAPHIQUE : cette entrée est écrite en dur, donc elle
    // échappait à la normalisation des titres de chapitre — et se retrouvait
    // seule, avec son apostrophe droite, au bas d'un rail par ailleurs juste.
    title: "S\u2019entraîner",
    shortTitle: "S\u2019entraîner",
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
      {/* GRILLE (refonte 2026-10) : une liste numérotée à la suisse — le
          numéro en chiffres serrés (Archivo 62 %), le titre à côté, un filet
          entre chaque entrée. Plus d'épine verticale ni de pastilles : le
          chapitre courant se lit au numéro rouge signal et au titre en gras,
          les chapitres déjà vus au numéro à l'encre, les suivants au gris.
          Le bouton garde sa taille de texte `caption` et ses attributs
          (aria-current, title, data-bank-rail-count) : les portes les lisent. */}
      <ol className="flex flex-col border-t border-subtle" role="list">
        {entries.map((entry, i) => {
          const isActive = current === i;
          const isRead = i <= current;

          return (
            <li key={i} className="relative border-b border-subtle">
              <button
                type="button"
                onClick={() => goTo(i)}
                disabled={!hydrated}
                aria-busy={!hydrated || undefined}
                title={entry.title}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group relative flex w-full items-baseline gap-3 text-left",
                  "min-h-touch py-2.5 pr-2",
                  "bg-transparent",
                  "text-caption font-medium",
                  "state-layer",
                  "transition-colors duration-micro ease-enter",
                  "focus-ring",
                  isActive ? "text-primary" : "text-secondary hover:text-primary"
                )}
              >
                {/* Le numéro : seul repère au palier medium (rail de 56 px),
                    numéro + titre à partir d'expanded. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-7 flex-shrink-0 font-display wdth-62 text-h4 font-bold leading-none tnum",
                    isActive ? "text-signal" : isRead ? "text-primary" : "text-tertiary"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Le titre humain du chapitre — jamais les codes R (audit U3) ;
                    jamais tronqué : un titre long passe à la ligne. */}
                <span
                  className={cn(
                    "hidden bp-expanded:block min-w-0 text-body-sm leading-snug",
                    isActive && "font-semibold"
                  )}
                >
                  <span className="sr-only">{i + 1} · </span>
                  {entry.shortTitle}
                  {/* Honest sujet count on the trailing bank entry (BANK-SPEC
                      §1) — a quiet parenthetical, never a progress meter. */}
                  {entry.count != null && (
                    <span
                      data-bank-rail-count
                      className="ml-1 font-normal text-tertiary tabular-nums"
                    >
                      · {entry.count} sujet{entry.count > 1 ? "s" : ""}
                    </span>
                  )}
                </span>

                {/* Titre au survol — utile au palier medium où seul le numéro
                    s'affiche. Hors flux, il ne pousse jamais la colonne. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-full ml-3",
                    "whitespace-nowrap",
                    "px-2 py-1",
                    "text-caption text-secondary",
                    "bg-surface-overlay",
                    "border border-subtle",
                    "pointer-events-none",
                    "z-overlay",
                    "opacity-0 -translate-x-1",
                    "group-hover:opacity-100 group-hover:translate-x-0",
                    "group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                    "transition-[opacity,transform] duration-micro ease-enter",
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
  headings,
  hasItems = false,
  bankCount,
  className,
}: MarginRailProps & { className?: string }) {
  const { current, total, goTo } = useChapter();
  const hydrated = useHydrated();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (headings.length === 0 && !hasItems) return null;
  if (total <= 1) return null; // rien à naviguer — pas de théâtre

  const realEntries: RailEntry[] = headings.length > 0 ? headings : [FALLBACK_ENTRY];
  const practiceEntry: RailEntry = {
    // Apostrophe TYPOGRAPHIQUE : cette entrée est écrite en dur, donc elle
    // échappait à la normalisation des titres de chapitre — et se retrouvait
    // seule, avec son apostrophe droite, au bas d'un rail par ailleurs juste.
    title: "S\u2019entraîner",
    shortTitle: "S\u2019entraîner",
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
              disabled={!hydrated}
              aria-busy={!hydrated || undefined}
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
