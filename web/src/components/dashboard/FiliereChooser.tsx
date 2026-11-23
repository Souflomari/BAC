/**
 * FiliereChooser — choix de la filière (rapport 04 : G-04-009, ADR 0045).
 *
 * Quatre cartes sobres, une par filière scientifique : le sigle en surtitre
 * au-dessus du nom complet (sans coupure orpheline), puis les coefficients
 * officiels de l'examen national lus directement dans `FILIERES`
 * (`curriculum.ts`) — jamais saisis à la main. Les matières sans chapitre
 * publié (`units.length === 0`, ex. SI en SM-B) portent la mention honnête
 * « (à venir) ».
 *
 * Choisir une filière enregistre la préférence locale (`useFiliere`) et, sur
 * `/commencer`, renvoie vers l'accueil. L'application reste entièrement
 * accessible sans filière choisie.
 */

"use client";

import { useRouter } from "next/navigation";
import { FILIERES, SUBJECTS, type FiliereId } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { useHydrated } from "@/lib/useHydrated";
import { subjectLabel } from "@/lib/subjects";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function FiliereChooser({ redirectOnPick = false }: { redirectOnPick?: boolean }) {
  const { filiere, setFiliere } = useFiliere();
  const router = useRouter();
  // ADR 0032 : le choix ne vit qu'après l'hydratation (localStorage + routeur) ;
  // servi actif, le bouton ignorerait le doigt pendant 9–24 s sur 3G lente.
  const hydrated = useHydrated();

  function pick(id: FiliereId) {
    setFiliere(id);
    if (redirectOnPick) router.push("/");
  }

  return (
    <div>
      <ul role="list" className="grid grid-cols-1 gap-4 bp-medium:grid-cols-2">
        {FILIERES.map((f) => {
          const active = filiere === f.id;
          return (
            <li key={f.id} className="min-w-0">
              {/* `min-w-0` : item de grille, sinon la piste ne descend pas sous la
                  largeur min-content de la carte à 200 % de texte (SC 1.4.4). */}
              <button
                type="button"
                onClick={() => pick(f.id)}
                aria-pressed={active}
                disabled={!hydrated}
                aria-busy={!hydrated || undefined}
                className={cn(
                  "group flex h-full w-full flex-col text-left p-5 bp-medium:p-6",
                  "bg-surface-raised",
                  "border-2 transition-colors duration-micro ease-out",
                  "state-layer focus-ring",
                  active
                    ? "border-accent"
                    : "border-subtle hover:border-accent"
                )}
              >
                <div className="flex w-full items-center justify-between gap-3">
                  <span
                    className={cn(
                      "font-mono text-caption font-semibold uppercase tracking-eyebrow tabular-nums px-2 py-0.5",
                      active
                        ? "bg-accent text-on-accent"
                        : "border border-subtle bg-surface-container-low text-primary"
                    )}
                  >
                    {f.short}
                  </span>
                  {active ? (
                    <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-accent">
                      <Icon name="check" size={13} />
                      Ta filière
                    </span>
                  ) : null}
                </div>

                <span className="mt-3 block min-w-0 break-words font-display text-h4 font-bold leading-snug text-primary group-hover:text-signal transition-colors duration-micro">
                  {f.name}
                </span>

                <dl className="mt-4 w-full space-y-1.5 border-t border-subtle pt-3 text-body-sm">
                  {f.subjects.map((s) => {
                    const label = SUBJECTS[s.id]?.label ? subjectLabel(s.id) : s.id;
                    const aVenir = (SUBJECTS[s.id]?.units.length ?? 0) === 0;
                    return (
                      <div key={s.id} className="flex items-baseline justify-between gap-4">
                        <dt className="min-w-0 text-secondary">
                          {label}
                          {aVenir ? (
                            <span className="ml-1.5 whitespace-nowrap text-caption text-tertiary">(à venir)</span>
                          ) : null}
                        </dt>
                        <dd className="shrink-0 font-mono tnum text-caption font-semibold text-primary">
                          Coef. {s.coefficient}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-body-sm text-tertiary">
        Coefficients de l’examen national (l’anglais, coef. 2, n’est pas encore dans l’application).
      </p>
    </div>
  );
}
