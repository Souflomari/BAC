"use client";

/**
 * ProgrammeMap — LE programme par matière (ADR 0045, Option A — G-04-013).
 *
 * Quatre cartes sobres (une par matière publiée) : titre de matière vers sa
 * page dédiée, couverture réelle du cadre (« M/N chapitres »), coefficient
 * officiel lorsque la filière est choisie, et la liste complète des chapitres
 * repliée dans un `<details>` fermé par défaut (`Voir les N chapitres`).
 *
 * Option A : tous les liens `[data-mastery-token]` restent dans le DOM dans
 * l'ordre exact du programme (contrat D12 de `dom-truth.mjs` inchangé) tout
 * en évitant un mur de 62 lignes sur téléphone. Aucune progression fabriquée,
 * aucun pourcentage.
 */

import { frenchTypography } from "@/lib/frenchTypography";
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
    <section aria-label="Le programme" className="mt-12 bp-large:mt-16">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-accent pb-3">
        <h2 className="font-display text-h2 font-bold text-primary">Le programme</h2>
        <p className="text-body-sm text-tertiary">
          Couverture du cadre officiel, matière par matière
          {filiereActive ? ` · ${filiereActive.short}` : ""}.
        </p>
      </div>

      {/* `grid-cols-1` borne la piste à 200 % de texte (SC 1.4.4). */}
      <div className="mt-6 grid grid-cols-1 gap-4 bp-medium:grid-cols-2 bp-large:grid-cols-4 bp-large:items-stretch">
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
          const coef = filiereActive?.subjects.find((s) => s.id === id)?.coefficient;
          const totalAffiche = filiereActive ? liste.length : total;
          const dispoAffiche = filiereActive ? liste.length : dispo;

          return (
            <article
              key={id}
              data-programme-matiere={id}
              className="flex min-w-0 flex-col border border-subtle bg-surface-raised p-5"
            >
              <header className="flex flex-col gap-1">
                <Link
                  href={subjectHref(id)}
                  className="inline-flex min-h-touch items-center min-w-0 break-words font-display text-h4 font-bold text-primary hover:text-signal hover:underline underline-offset-4 focus-ring"
                >
                  {subjectLabel(id)}
                </Link>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-mono text-caption text-secondary">
                  <span data-couverture={`${dispoAffiche}/${totalAffiche}`} className="tnum whitespace-nowrap">
                    {dispoAffiche === totalAffiche
                      ? `${totalAffiche} chapitres`
                      : `${dispoAffiche}/${totalAffiche} chapitres`}
                  </span>
                  {coef != null ? (
                    <>
                      <span aria-hidden="true" className="text-tertiary">·</span>
                      <span className="tnum whitespace-nowrap text-tertiary">Coef. {coef}</span>
                    </>
                  ) : null}
                </div>
              </header>

              {dispoAffiche < totalAffiche && (
                <div
                  className="mt-3 h-1 overflow-hidden bg-surface-container-lowest"
                  role="img"
                  aria-label={`${dispoAffiche} chapitres disponibles sur ${totalAffiche} au programme`}
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${Math.round((dispoAffiche / Math.max(totalAffiche, 1)) * 100)}%` }}
                  />
                </div>
              )}

              {/* Les parties du programme, telles que le cadre les nomme : la carte dit ce que
                  contient la matière avant qu'on l'ouvre. Un fait du programme, pas un progrès. */}
              {sujet && sujet.units.length > 0 ? (
                <ul role="list" className="mt-4 flex-1 space-y-1.5 text-body-sm text-secondary">
                  {sujet.units.map((u) => (
                    <li key={u.title} className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0">{frenchTypography(u.title.replace(" — ", " : "))}</span>
                      <span className="tnum shrink-0 font-mono text-caption text-tertiary">{u.chapters.length}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <details className="group mt-4 border-t border-subtle pt-1">
                <summary
                  className={cn(
                    "flex min-h-touch cursor-pointer list-none items-center justify-between gap-2",
                    "text-body-sm font-medium text-secondary hover:text-primary",
                    "focus-ring [&::-webkit-details-marker]:hidden"
                  )}
                >
                  <span>Voir les {liste.length} chapitres</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-body text-tertiary transition-transform duration-micro group-open:rotate-90"
                  >
                    ›
                  </span>
                </summary>

                <ol className="mt-1 grid border-t border-subtle">
                  {liste.map((n, i) => (
                    <li key={n.slug} className="min-w-0 border-b border-subtle last:border-b-0">
                      <Link
                        href={notionHref(n.subject, n.slug)}
                        data-mastery-token=""
                        className={cn(
                          "group/item grid min-h-touch w-full min-w-0 grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-2 py-2",
                          "text-body-sm text-secondary hover:text-primary",
                          "state-layer focus-ring",
                          "transition-colors duration-micro ease-between"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono tnum text-caption font-semibold text-tertiary group-hover/item:text-signal"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {/* Pas de troncature (HANDOFF §11.38) : le titre se plie. */}
                        <span className="min-w-0 break-words">{n.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
