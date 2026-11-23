/**
 * ChapterList — unités et chapitres d'une matière (rapport 04 : G-04-002,
 * G-04-004, G-04-014).
 *
 * Liste honnête du programme : chaque chapitre construit renvoie vers sa leçon
 * avec sa durée de lecture (et, lorsqu'elle existe, un lien discret vers sa
 * leçon interactive) ; les chapitres non encore publiés affichent « À venir ».
 *
 * Resserrement par filière côté client (`useFiliere`, ADR 0025 §2.11) :
 * `mounted` évite tout écart d'hydratation. Sans filière choisie, tout est
 * affiché.
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
  /** Absent = commun à toutes les filières. */
  filieres?: FiliereId[];
  /** Passerelle vers la leçon interactive quand elle existe sur ce chapitre. */
  pilote?: {
    href: string;
    nbExercices: number;
  };
}

export interface UnitView {
  title: string;
  chapters: ChapterView[];
}

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
          <span className="mt-1 block font-mono text-caption tabular-nums text-tertiary">
            {chapter.minutes} min de lecture
          </span>
        )}
      </span>
      {chapter.available ? (
        <span className="flex flex-shrink-0 items-center gap-2">
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
            "group flex min-h-touch items-baseline justify-between gap-4",
            "-mx-2 px-2 py-3.5",
            "state-layer focus-ring"
          )}
        >
          {inner}
        </Link>
        {chapter.pilote && (
          <div className="-mt-1 pb-2 pl-12">
            <Link
              href={chapter.pilote.href}
              className="inline-flex min-h-touch items-center gap-1.5 text-caption font-semibold text-signal hover:underline underline-offset-4 focus-ring"
            >
              <span>
                Leçon interactive
                {chapter.pilote.nbExercices > 0 ? ` · ${chapter.pilote.nbExercices} exercices` : ""}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </li>
    );
  }

  return (
    <li className="flex min-h-touch items-baseline justify-between gap-4 -mx-2 px-2 py-3.5">
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
        className="max-w-lead border-l-2 border-subtle py-1 pl-5"
      >
        <h2 className="font-display text-h3 font-bold text-primary">
          Programme à venir
        </h2>
        <p className="mt-2 text-body text-secondary">
          Les chapitres de cette matière ne sont pas encore disponibles.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/" className="btn-primary focus-ring">
            Retour à l’accueil
          </Link>
          <Link
            href="/examens"
            className="inline-flex min-h-touch items-center text-body-sm font-semibold text-primary underline decoration-border-soft underline-offset-4 hover:text-signal focus-ring"
          >
            Voir les examens blancs
          </Link>
        </div>
      </div>
    );
  }

  // `columns` équilibre les hauteurs sur bureau ; `break-inside-avoid` garde
  // chaque unité entière. `min-w-0` empêche un titre long de déborder.
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
