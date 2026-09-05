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
    <section aria-label="Le programme" className="mt-14">
      {/* Légende SOUS le titre (audit : flottante à l'extrême droite, elle
          était à 1000 px de ce qu'elle qualifiait — attention divisée). */}
      <div>
        <h2 className="font-display text-h2 font-semibold text-primary">
          Le programme
        </h2>
        <p className="mt-1 text-body-sm text-tertiary">
          Couverture du cadre officiel, matière par matière.
        </p>
      </div>

      {/* `grid-cols-1` et non `grid` seul : une piste implicite est `auto`, donc
          au moins aussi large que le mot le plus long d'une carte — et
          `overflow-wrap: break-word` ne change PAS cette largeur (§8.5). À 200 %
          de texte (SC 1.4.4), « Mathématiques » fixait la piste à 344 px dans
          une colonne de 296 : 16 px de débord sur l'accueil. `minmax(0, 1fr)`
          borne la piste à la colonne ; le mot se coupe ensuite. 2026-09-05. */}
      <div className="mt-6 grid grid-cols-1 gap-4 bp-large:grid-cols-2">
        {ordre.map((id) => {
          // L'ORDRE DU PROGRAMME, jamais l'alphabet. Cette carte annonce
          // « couverture du cadre officiel » : un élève y lit l'ordre de son
          // année. Trié par titre, elle ouvrait maths sur « Arithmétique »
          // (rang 13 sur 14) pendant que la carte de session, deux blocs plus
          // haut sur la même page, proposait « Limites et continuité » — et
          // que /matieres/maths, à un clic, donnait le bon ordre. Voir
          // `sortByProgramme` pour la mesure (59 chapitres sur 62 déplacés).
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
            <article
              key={id}
              data-programme-matiere={id}
              className={cn(
                "rounded-xl border border-subtle bg-surface-raised p-5",
                "shadow-elevation-1 transition-shadow duration-standard ease-between hover:shadow-elevation-2"
              )}
            >
              {/* flex-wrap + min-w-0 : le compteur nowrap fixait la largeur
                  minimale de la rangée — 2 px de débord page à 320 (sweep
                  repli). En colonne très étroite, le compteur replie SOUS
                  le titre, d'un bloc. */}
              <header className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span
                  aria-hidden
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: `var(--subject-${id})` }}
                />
                <Link
                  href={subjectHref(id)}
                  // `break-words` : « Mathématiques » est un seul mot ; à 200 % de
                  // texte (SC 1.4.4) il faisait 290 px dans une colonne de 216 et
                  // poussait l'accueil de 16 px. `min-w-0` laisse le lien rétrécir,
                  // `break-words` laisse le mot se couper. Mesuré le 2026-09-05.
                  className="min-w-0 break-words focus-ring rounded text-h4 font-semibold text-primary hover:underline"
                >
                  {subjectLabel(id)}
                </Link>
                {/* Audit R6 (charge-calme P0-3) : « 14/14 » aligné à droite
                    au-dessus d'une barre pleine EST le vocabulaire du score
                    — et mesurait la disponibilité, pas la progression.
                    Quand dispo == total, on dit « 14 chapitres » ; la
                    fraction n'apparaît que si elle informe. L'attribut
                    garde la fraction machine (sweep dom-truth). */}
                <span
                  data-couverture={`${dispo}/${total}`}
                  className="mono-inline ml-auto whitespace-nowrap text-tertiary"
                >
                  {dispo === total ? `${total} chapitres` : `${dispo}/${total} chapitres`}
                </span>
              </header>

              {/* La barre de couverture n'existe qu'en couverture PARTIELLE
                  — pleine, elle n'était qu'un trait de couleur en
                  concurrence avec l'action primaire (audit P1-2). */}
              {dispo < total && (
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
              )}

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
                      {/* Pas de minutes ICI (audit : ~12 valeurs mono avant
                          le pli = texture de tableau de bord ; et 474 px de
                          vide entre titre et durée). Les minutes vivent sur
                          la page matière, où l'élève choisit vraiment. */}
                      <span className="min-w-0 truncate">{n.title}</span>
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
