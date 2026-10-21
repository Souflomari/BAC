"use client";

/**
 * NoteEnJeu — « Où se joue ta note » (Grille, refonte 2026-10).
 *
 * Les COEFFICIENTS de l'examen national, filière par filière : des faits
 * officiels (en-têtes des sujets nationaux, docs/refonte/01-programme-bac-
 * maroc.md §0), pas une progression. Les quatre matières scientifiques +
 * philosophie viennent de `curriculum.ts` (FILIERES) ; l'anglais (coef 2,
 * même source) est ajouté ici parce que l'application ne le couvre pas encore
 * — c'est dit à l'écran. Somme des coefficients : 23 dans les quatre filières.
 *
 * HONEST-STATE : aucune maîtrise n'est affichée. La colonne existe, vide, avec
 * une phrase calme ; elle se remplira quand un modèle d'élève réel l'alimentera.
 * Vocabulaire du tableau de bord (dom-truth D12 §5) : ni « % », ni « points »,
 * ni « maîtrisé ».
 */

import { Link } from "@/components/ui/Lien";
import { FILIERES, getFiliere, type FiliereId } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { useHydrated } from "@/lib/useHydrated";
import { subjectLabel } from "@/lib/subjects";
import { cn } from "@/lib/utils";

const TOTAL_COEF = 23;

interface Ligne {
  id: string;
  label: string;
  coef: number;
  horsApp?: boolean;
}

function lignes(filiereId: FiliereId): Ligne[] {
  const f = getFiliere(filiereId);
  if (!f) return [];
  return [
    ...f.subjects.map((s) => ({ id: s.id, label: subjectLabel(s.id), coef: s.coefficient })),
    { id: "anglais", label: "Anglais", coef: 2, horsApp: true },
  ];
}

export function NoteEnJeu({ className }: { className?: string }) {
  const { filiere, setFiliere, mounted } = useFiliere();
  const hydrated = useHydrated();
  const active = mounted ? getFiliere(filiere) : null;

  return (
    <section aria-label="Où se joue ta note" data-note-en-jeu="" className={cn("min-w-0", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-accent pb-3">
        <h2 className="font-display text-h2 font-bold text-primary">Où se joue ta note</h2>
        <p className="text-body-sm text-tertiary">
          Examen national · coefficients officiels{active ? ` · ${active.short}` : ""}
        </p>
      </div>

      {!active ? (
        <div className="pt-6">
          <p className="max-w-[52ch] text-body text-secondary">
            Choisis ta filière&#8239;: les coefficients de ton examen national s’affichent ici, matière
            par matière.
          </p>
          <ul role="list" className="mt-5 grid grid-cols-2 gap-px border border-subtle bg-border-subtle bp-medium:grid-cols-4">
            {FILIERES.map((f) => (
              <li key={f.id} className="min-w-0 bg-surface-base">
                <button
                  type="button"
                  onClick={() => setFiliere(f.id)}
                  disabled={!hydrated}
                  aria-busy={!hydrated || undefined}
                  className="flex min-h-touch w-full flex-col items-start gap-1 px-4 py-4 text-left state-layer focus-ring hover:bg-surface-container-low"
                >
                  <span className="font-display text-h3 font-bold text-primary">{f.short}</span>
                  <span className="text-caption text-secondary">{f.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <table className="mt-1 w-full border-collapse">
            <caption className="sr-only">
              Coefficients de l’examen national, filière {active.name}
            </caption>
            <thead>
              <tr className="text-left text-caption font-semibold uppercase tracking-eyebrow text-tertiary">
                <th scope="col" className="py-3 pr-4 font-semibold">Matière</th>
                <th scope="col" className="py-3 pr-4 text-right font-semibold">Coef.</th>
                <th scope="col" className="hidden py-3 pr-4 font-semibold bp-medium:table-cell">Poids dans le national</th>
                <th scope="col" className="hidden py-3 text-right font-semibold bp-medium:table-cell">Ta maîtrise</th>
              </tr>
            </thead>
            <tbody>
              {lignes(active.id).map((l) => (
                <tr key={l.id} data-coef-matiere={l.id} className="border-t border-subtle align-middle">
                  <th scope="row" className="py-3 pr-4 text-left font-normal">
                    <span className="block text-h4 font-semibold text-primary">{l.label}</span>
                    {l.horsApp && (
                      <span className="block text-caption text-tertiary">pas encore dans l’application</span>
                    )}
                  </th>
                  <td className="py-3 pr-4 text-right">
                    <span className="font-display wdth-62 tnum text-[3.5rem] font-bold leading-none text-primary">
                      {l.coef}
                    </span>
                  </td>
                  <td className="hidden py-3 pr-4 bp-medium:table-cell">
                    <div className="flex items-center gap-3">
                      <div className="h-3 flex-1 bg-surface-container-lowest" aria-hidden>
                        <div className="h-full bg-accent" style={{ width: `${(l.coef / TOTAL_COEF) * 100}%` }} />
                      </div>
                      <span className="tnum whitespace-nowrap text-body-sm text-secondary">
                        {l.coef}&#8239;/&#8239;{TOTAL_COEF}
                      </span>
                    </div>
                  </td>
                  <td className="hidden py-3 text-right text-h4 text-tertiary bp-medium:table-cell" aria-label="pas encore mesurée">
                    —
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-subtle pt-4">
            <p className="max-w-[60ch] text-body-sm text-secondary">
              Ta maîtrise apparaîtra ici après tes premiers exercices. L’examen national compte pour la
              moitié de la moyenne du bac&#8239;: (2 × national + régional + contrôle continu) / 4.
            </p>
            <Link
              href="/commencer"
              className="whitespace-nowrap text-body-sm font-semibold text-primary underline underline-offset-4 focus-ring"
            >
              Changer de filière
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
