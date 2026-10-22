/**
 * ChapterList — a subject's units → chapters (Day-9 site skeleton).
 *
 * The honest map of a matière: every chapter of the programme is listed;
 * built ones link to their notion and show reading time, un-built ones render
 * as a calm "À venir" row (no fabricated availability — the honest-state rule
 * at the catalogue level). Units are the programme's own groupings (cadre for
 * PC; standard program elsewhere).
 *
 * Filière narrowing (ADR 0025 §2.11 golden rule): narrowed here, client-side,
 * because the parent route (`matieres/[subject]/page.tsx`) is a SERVER
 * component and can't read the device's localStorage preference. `page.tsx`
 * stays server-rendered and passes every chapter (including its `filieres`
 * restriction, carried on `ChapterView`); THIS component reads `useFiliere`
 * and filters at render time — the one client boundary the narrowing needs.
 * `mounted` gates it so server and first client paint agree (no hydration
 * flash): the unfiltered list, byte-identical to before this existed, until
 * the device preference is read. No filière chosen shows every chapter, same
 * as always — the golden rule narrows, it never gates (a direct URL to an
 * out-of-filière chapter still opens normally regardless of this list).
 */

"use client";

import { Link } from "@/components/ui/Lien";
import { notionHref } from "@/lib/subjects";
import { chapterInFiliere, type FiliereId } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface ChapterView {
  slug: string;
  title: string;
  available: boolean;
  minutes?: number;
  /** Absent = common to all filières. See curriculum.ts's `Chapter.filieres`. */
  filieres?: FiliereId[];
}

export interface UnitView {
  title: string;
  chapters: ChapterView[];
}

// GRILLE (refonte 2026-10) : une ligne = numéro de chapitre (chiffres
// serrés, Archivo 62 %) · titre · durée de lecture · flèche. Les lignes sont
// séparées par des filets ; « À venir » reste la marque honnête d'un chapitre
// non construit, en capitales calmes, jamais en pilule.
function ChapterRow({ subject, chapter, numero }: { subject: string; chapter: ChapterView; numero: number }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "w-10 flex-shrink-0 font-display wdth-62 text-h3 font-bold leading-none tnum",
          chapter.available ? "text-primary" : "text-tertiary"
        )}
      >
        {String(numero).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-body-lg leading-snug",
            chapter.available
              ? "text-primary group-hover:underline underline-offset-4"
              : "text-secondary"
          )}
        >
          {chapter.title}
        </span>
        {chapter.available && chapter.minutes != null && (
          <span className="mt-1 block text-caption tabular-nums text-tertiary">
            {chapter.minutes} min de lecture
          </span>
        )}
      </span>
      {chapter.available ? (
        <span className="flex flex-shrink-0 items-center gap-2">
          {/* Pas de pilule « Disponible » (§7, le regard R6) : le lien EST
              l'affordance. Flèche tertiaire au repos, encre au survol. */}
          <Icon
            name="arrow-right"
            size={16}
            className="text-tertiary group-hover:text-primary translate-x-0 group-hover:translate-x-1 transition-[transform,color] duration-micro ease-out"
          />
        </span>
      ) : (
        <span className="flex-shrink-0 text-caption font-medium uppercase tracking-eyebrow text-tertiary">
          À venir
        </span>
      )}
    </>
  );

  if (chapter.available) {
    return (
      <li>
        <Link
          href={notionHref(subject, chapter.slug)}
          className={cn(
            "group flex items-baseline justify-between gap-4",
            "-mx-2 px-2 py-3.5",
            "state-layer focus-ring"
          )}
        >
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="flex items-baseline justify-between gap-4 -mx-2 px-2 py-3.5"
      aria-disabled="true"
    >
      {inner}
    </li>
  );
}

export function ChapterList({ subject, units }: { subject: string; units: UnitView[] }) {
  const { filiere, mounted } = useFiliere();
  const activeFiliere = mounted ? filiere : null;
  const visibleUnits = units
    .map((u) => ({ ...u, chapters: u.chapters.filter((c) => chapterInFiliere(c, activeFiliere)) }))
    .filter((u) => u.chapters.length > 0);

  if (visibleUnits.length === 0) {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl py-20 text-center",
          "border border-dashed border-subtle",
          "bg-surface-raised"
        )}
      >
        <Icon name="empty-doc" size={44} className="mb-5 text-border-soft" />
        <h2 className="mb-1 text-h4 font-semibold text-primary">
          Programme à venir
        </h2>
        <p className="max-w-[44ch] text-body-sm text-secondary">
          Les chapitres de cette matière seront ajoutés prochainement.
        </p>
      </div>
    );
  }

  // GRILLE (refonte 2026-10) : plus de cartes. Chaque unité est un bloc
  // ouvert par un intitulé en capitales et un filet d'encre, ses chapitres
  // numérotés en continu dans l'ordre du programme — sur ce qui est affiché
  // (une filière choisie resserre la liste ; les numéros suivent la liste que
  // l'élève a sous les yeux). `columns` et non `grid` (audit R6, P0-3) : les
  // colonnes CSS équilibrent les hauteurs ; break-inside-avoid garde chaque
  // unité entière. `min-w-0` : un titre long ne fait pas déborder la colonne.
  let numero = 0;
  return (
    <div className="bp-large:columns-2 bp-large:gap-16">
      {visibleUnits.map((unit) => (
        <section
          key={unit.title}
          aria-label={unit.title}
          className="min-w-0 break-inside-avoid pb-8"
        >
          <h2 className="border-b-2 border-text-secondary pb-2 text-caption font-semibold uppercase tracking-eyebrow text-primary">
            {unit.title}
          </h2>
          <ul role="list" className="divide-y divide-border-subtle">
            {unit.chapters.map((c) => {
              numero += 1;
              return <ChapterRow key={c.slug} subject={subject} chapter={c} numero={numero} />;
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
