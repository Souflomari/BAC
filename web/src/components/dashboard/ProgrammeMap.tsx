"use client";

/**
 * ProgrammeMap — LE programme, une seule carte (refonte Studio, R6 avancé).
 *
 * Remplace TROIS modules qui disaient la même chose sur la même page
 * (audit Fable §3.5 : « Carte de maîtrise » en liste plate à scroll
 * imbriqué, « Disponible maintenant » en accordéons d'illustrations
 * répétées, « Progrès par matière » en texte sans visualisation). Un seul
 * module : par matière, une section colorée (jeton --subject-*) avec
 *
 *   · la COUVERTURE réelle du programme — « M/N chapitres », barre à
 *     l'appui. C'est une donnée du cadre, vérifiable, honnête pour un
 *     visiteur non connecté (inventaire 2026-08-18 : il n'existe AUCUNE
 *     donnée de progression hors session live — donc AUCUN « % lu »,
 *     aucun état de maîtrise, rien de fabriqué) ;
 *   · les notions en rangées compactes, texte d'abord — les 5 motifs
 *     d'illustration qui se répétaient sur 61 cartes sont partis, la
 *     couleur de matière fait le repérage (§3.7).
 *
 * Chaque notion garde [data-mastery-token] : l'attribut que dom-truth
 * compte (62) et que le rétrécissement par filière pilote — le contrat ne
 * change pas, seule la présentation change.
 */

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SUBJECT_ORDER, subjectHref, subjectLabel, notionHref } from "@/lib/subjects";
import {
  getFiliere,
  getSubject,
  isNotionInFiliere,
  subjectChapterCount,
  subjectAvailableCount,
} from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import type { NotionMeta } from "@/lib/content";

export function ProgrammeMap({ notions }: { notions: NotionMeta[] }) {
  const { filiere, mounted } = useFiliere();
  const filiereActive = mounted ? getFiliere(filiere) : undefined;
  const sujetsActifs = filiereActive?.subjects.map((s) => s.id);
  const ordre = sujetsActifs
    ? SUBJECT_ORDER.filter((id) => sujetsActifs.includes(id as never))
    : SUBJECT_ORDER;

  const construits = new Set(notions.map((n) => `${n.subject}/${n.slug}`));

  return (
    <section aria-label="Le programme" className="mt-14">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-h2 font-semibold text-primary">
          Le programme
        </h2>
        <p className="text-body-sm text-tertiary">
          Couverture du cadre officiel, matière par matière.
        </p>
      </div>

      <div className="mt-6 grid gap-4 bp-large:grid-cols-2">
        {ordre.map((id) => {
          const liste = notions
            .filter(
              (n) =>
                n.subject === id &&
                (!filiereActive || isNotionInFiliere(`${n.subject}/${n.slug}`, filiereActive.id))
            )
            .sort((a, b) => a.title.localeCompare(b.title, "fr"));
          if (liste.length === 0) return null;
          const sujet = getSubject(id as Parameters<typeof getSubject>[0]);
          const total = sujet ? subjectChapterCount(sujet) : liste.length;
          const dispo = sujet ? subjectAvailableCount(sujet, construits) : liste.length;

          return (
            <article
              key={id}
              data-programme-matiere={id}
              className={cn(
                "rounded-xl border border-subtle bg-surface-raised p-5",
                "shadow-elevation-1 transition-shadow duration-standard ease-between hover:shadow-elevation-2"
              )}
            >
              <header className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: `var(--subject-${id})` }}
                />
                <Link
                  href={subjectHref(id)}
                  className="focus-ring rounded text-h4 font-semibold text-primary hover:underline"
                >
                  {subjectLabel(id)}
                </Link>
                <span
                  data-couverture={`${dispo}/${total}`}
                  className="ml-auto font-mono text-body-sm tabular-nums text-secondary"
                >
                  {dispo}
                  <span className="text-tertiary">/{total} chapitres</span>
                </span>
              </header>

              {/* La couverture — construite vs cadre. Une barre de FAITS. */}
              <div
                className="mt-3 h-1 overflow-hidden rounded-full"
                style={{ background: `var(--subject-${id}-subtle)` }}
                role="img"
                aria-label={`${dispo} chapitres disponibles sur ${total} au programme`}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    background: `var(--subject-${id})`,
                    width: `${Math.round((dispo / Math.max(total, 1)) * 100)}%`,
                  }}
                />
              </div>

              <ol className="mt-4 grid gap-0.5">
                {liste.map((n) => (
                  // min-w-0 : un item de grille refuse par défaut de passer
                  // sous la largeur de son contenu (min-width:auto) — un long
                  // titre de notion poussait l'article à 493 px sur un écran
                  // de 390 et TOUTE la page débordait. Le troncage ne peut
                  // agir que si l'ancêtre a le droit de rétrécir.
                  <li key={n.slug} className="min-w-0">
                    <Link
                      href={notionHref(n.subject, n.slug)}
                      data-mastery-token=""
                      className={cn(
                        "group flex w-full min-w-0 items-baseline gap-3 rounded-md px-2.5 py-1.5 -mx-2.5",
                        "text-body-sm text-secondary hover:text-primary",
                        "state-layer focus-ring [--focus-radius:6px]",
                        "transition-colors duration-micro ease-between"
                      )}
                    >
                      <span className="min-w-0 truncate">{n.title}</span>
                      {n.readingMinutes != null && (
                        <span className="ml-auto shrink-0 font-mono text-caption tabular-nums text-tertiary">
                          {n.readingMinutes} min
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ol>
            </article>
          );
        })}
      </div>
    </section>
  );
}
