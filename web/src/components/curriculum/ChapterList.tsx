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

function ChapterRow({ subject, chapter }: { subject: string; chapter: ChapterView }) {
  const inner = (
    <>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-body",
            chapter.available
              ? "text-primary group-hover:text-accent transition-colors duration-micro"
              : "text-secondary"
          )}
        >
          {chapter.title}
        </span>
        {chapter.available && chapter.minutes != null && (
          <span className="mt-0.5 block font-mono text-caption tabular-nums text-tertiary">
            {chapter.minutes} min
          </span>
        )}
      </span>
      {chapter.available ? (
        <span className="flex flex-shrink-0 items-center gap-2">
          {/* Pas de pilule « Disponible » : sur un programme complet elle se
              répétait 25 fois à l'identique — du bruit, pas une information
              (§7, le regard R6). Le lien EST l'affordance ; « À venir »
              reste la marque honnête de l'exception. */}
          {/* Audit R6 (visuel P0-2) : 25 flèches à l'accent = l'accent ne
              signifie plus « l'action ». Tertiaire au repos, accent au
              survol de la ligne — l'affordance reste, l'inflation part. */}
          <Icon
            name="arrow-right"
            size={16}
            className="text-tertiary group-hover:text-accent translate-x-0 group-hover:translate-x-1 transition-[transform,color] duration-micro ease-out"
          />
        </span>
      ) : (
        <span className="flex-shrink-0 rounded-full border border-subtle px-2.5 py-0.5 text-caption font-medium text-tertiary">
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
            "group flex items-center justify-between gap-4",
            "rounded-lg -mx-3 px-3 py-3",
            "state-layer focus-ring [--focus-radius:12px]"
          )}
        >
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="flex items-center justify-between gap-4 -mx-3 px-3 py-3"
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

  // Studio (R6) : les unités deviennent des CARTES sur la bande large —
  // même grammaire que la ProgrammeMap de l'accueil (surface la plus
  // claire, bordure, deux colonnes à `large`). `min-w-0` sur la section :
  // le piège grid min-width:auto ferait déborder un titre long (mesuré
  // 509 px à 390 sur l'accueil — même classe de défaut).
  return (
    <div className="grid items-start gap-4 bp-large:grid-cols-2">
      {visibleUnits.map((unit) => (
        <section
          key={unit.title}
          aria-label={unit.title}
          className="min-w-0 rounded-xl border border-subtle bg-surface-raised p-5 shadow-elevation-1"
        >
          <h2 className="mb-2 pb-2 border-b border-subtle text-caption font-medium uppercase tracking-eyebrow text-secondary">
            {unit.title}
          </h2>
          <ul role="list" className="divide-y divide-border-subtle">
            {unit.chapters.map((c) => (
              <ChapterRow key={c.slug} subject={subject} chapter={c} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
