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

import { Link } from "@/components/ui/Lien";
import { cn } from "@/lib/utils";
import { SUBJECT_ORDER, subjectHref, subjectLabel, notionHref } from "@/lib/subjects";
import {
  getFiliere,
  getSubject,
  isNotionInFiliere,
  subjectChapterCount,
  subjectAvailableCount,
  sortByProgramme,
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
    <section aria-label="Le programme" className="mt-16">
      {/* GRILLE : en-tête sur filet noir, matières en colonnes (4 au bureau),
          chapitres numérotés dans l'ordre du programme. Contrats inchangés :
          [data-programme-matiere], [data-couverture] (fraction machine),
          [data-mastery-token] sur chaque lien de notion. */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-accent pb-3">
        <h2 className="font-display text-h2 font-bold text-primary">Le programme</h2>
        <p className="text-body-sm text-tertiary">
          Couverture du cadre officiel, matière par matière.
        </p>
      </div>

      {/* `grid-cols-1` et non `grid` seul : une piste `auto` est au moins aussi
          large que le mot le plus long — à 200 % de texte, « Mathématiques »
          débordait de 16 px (§8.5, 2026-09-05). `minmax(0,1fr)` borne la piste. */}
      <div className="grid grid-cols-1 gap-x-8 bp-expanded:grid-cols-2 bp-large:grid-cols-4">
        {ordre.map((id) => {
          const liste = sortByProgramme(
            notions.filter(
              (n) =>
                n.subject === id &&
                (!filiereActive || isNotionInFiliere(`${n.subject}/${n.slug}`, filiereActive.id))
            )
          );
          if (liste.length === 0) return null;
          const sujet = getSubject(id as Parameters<typeof getSubject>[0]);
          const total = sujet ? subjectChapterCount(sujet) : liste.length;
          const dispo = sujet ? subjectAvailableCount(sujet, construits) : liste.length;

          return (
            <article key={id} data-programme-matiere={id} className="min-w-0 pt-6">
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-subtle pb-3">
                <Link
                  href={subjectHref(id)}
                  className="min-w-0 break-words focus-ring text-h4 font-semibold text-primary hover:underline underline-offset-4"
                >
                  {subjectLabel(id)}
                </Link>
                {/* « 14 chapitres » quand tout est là ; la fraction n'apparaît
                    que si elle informe. L'attribut garde la fraction machine. */}
                <span
                  data-couverture={`${dispo}/${total}`}
                  className="tnum ml-auto whitespace-nowrap text-body-sm text-tertiary"
                >
                  {dispo === total ? `${total} chapitres` : `${dispo}/${total} chapitres`}
                </span>
              </header>

              {dispo < total && (
                <div
                  className="mt-3 h-1 overflow-hidden bg-surface-container-lowest"
                  role="img"
                  aria-label={`${dispo} chapitres disponibles sur ${total} au programme`}
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${Math.round((dispo / Math.max(total, 1)) * 100)}%` }}
                  />
                </div>
              )}

              <ol className="mt-2 grid">
                {liste.map((n, i) => (
                  <li key={n.slug} className="min-w-0 border-b border-subtle last:border-b-0">
                    <Link
                      href={notionHref(n.subject, n.slug)}
                      data-mastery-token=""
                      className={cn(
                        "group grid w-full min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-baseline py-2",
                        "text-body-sm text-secondary hover:text-primary",
                        "state-layer focus-ring",
                        "transition-colors duration-micro ease-between"
                      )}
                    >
                      <span aria-hidden className="tnum text-caption font-semibold text-tertiary group-hover:text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Pas de troncature (HANDOFF §11.38) : le titre se plie. */}
                      <span className="min-w-0 break-words">{n.title}</span>
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
