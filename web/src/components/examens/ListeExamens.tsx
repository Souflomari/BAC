"use client";

/**
 * ListeExamens — filtre par filière et liste horaire des épreuves (rapport 04
 * G-04-014, ADR 0045).
 *
 * Au rendu serveur (et sans filière enregistrée), toutes les épreuves sont
 * affichées (« Toutes »), préservant le crawl statique et les balayages
 * `dom-truth.mjs:4246-4385`. Une fois hydraté, si l'élève a choisi une filière
 * (`useFiliere`), le filtre se positionne automatiquement sur son flux d'examen
 * (PC → Physique-Chimie PC ; SVT → Maths PC / SVT ; SM-A/B → Maths SM) tout en
 * gardant « Toutes » et les autres flux à un tap.
 *
 * Tous les boutons de filtre sont `disabled` jusqu'à l'hydratation (ADR 0032 /
 * `dom-truth.mjs:706`) et respectent `min-h-touch` (≥ 48 px).
 */

import { useEffect, useState } from "react";
import { Link } from "@/components/ui/Lien";
import { useFiliere } from "@/lib/useFiliere";
import { useHydrated } from "@/lib/useHydrated";
import type { FiliereId } from "@/lib/curriculum";
import { cn } from "@/lib/utils";

export interface EpreuveResume {
  id: string;
  filiere: string;
  year: number;
  session: string;
  pts: number;
  nbExercices: number;
  nbParties: number;
  dureeOfficielleMin: number;
  complete: boolean;
}

export interface GroupeExamens {
  id: string;
  libelleComplet: string;
  matiere: string;
  filiere: string;
  onglet: string;
  liste: EpreuveResume[];
}

function fluxParDefaut(filiere: FiliereId | null): string {
  if (filiere === "sm-a" || filiere === "sm-b") return "SM";
  if (filiere === "svt") return "SExp";
  if (filiere === "pc") return "SPC";
  return "toutes";
}

function LigneEpreuve({ ep }: { ep: EpreuveResume }) {
  return (
    <li className="min-w-0 border-b border-subtle">
      <Link
        href={`/examens/${ep.id}`}
        data-epreuve={ep.id}
        className={cn(
          // Flex à retour, pas une grille à deux pistes : à 200 % de texte
          // sur 320 px, « Rattrapage » passe sous l'année sans déborder.
          "flex min-h-touch flex-wrap items-baseline gap-x-4 py-3",
          "state-layer focus-ring"
        )}
      >
        <span className="w-[4.5rem] shrink-0 font-display text-h2 font-bold leading-none text-primary wdth-62 tnum">
          {ep.year}
        </span>
        <span className="min-w-0 flex-1 basis-32">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-body font-semibold text-primary">
              {ep.session === "normale" ? "Session normale" : "Rattrapage"}
            </span>
            {!ep.complete && (
              <span className="border border-subtle bg-surface-container-low px-2 py-0.5 text-caption font-medium text-secondary">
                Partielle
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-body-sm text-secondary tnum">
            <span data-epreuve-exos>
              {ep.nbExercices} exercice{ep.nbExercices > 1 ? "s" : ""}
              {ep.nbParties > ep.nbExercices && ` · ${ep.nbParties} parties`}
            </span>{" "}
            ·{" "}
            <span data-epreuve-pts>
              {ep.complete
                ? `${Math.round(ep.pts)} pts`
                : `${String(ep.pts).replace(".", ",")} pts sur 20 disponibles`}
            </span>{" "}
            · {ep.dureeOfficielleMin / 60} h
          </span>
        </span>
      </Link>
    </li>
  );
}

export function ListeExamens({
  groupes,
  total,
}: {
  groupes: GroupeExamens[];
  total: number;
}) {
  const { filiere, mounted } = useFiliere();
  const hydrated = useHydrated();
  const [filtre, setFiltre] = useState<string>("toutes");
  const [choixManuel, setChoixManuel] = useState(false);

  useEffect(() => {
    if (!mounted || choixManuel) return;
    const cible = fluxParDefaut(filiere);
    if (cible === "toutes" || groupes.some((g) => g.id === cible)) {
      setFiltre(cible);
    }
  }, [mounted, filiere, choixManuel, groupes]);

  const selectionner = (id: string) => {
    setChoixManuel(true);
    setFiltre(id);
  };

  const groupesVisibles =
    filtre === "toutes" ? groupes : groupes.filter((g) => g.id === filtre);

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrer les épreuves par filière"
        className="mb-8 flex flex-wrap gap-2 border-b border-subtle pb-4"
      >
        <button
          type="button"
          onClick={() => selectionner("toutes")}
          aria-pressed={filtre === "toutes"}
          disabled={!hydrated}
          aria-busy={!hydrated || undefined}
          className={cn(
            "inline-flex min-h-touch items-center gap-2 border px-3.5 text-body-sm font-medium",
            "state-layer focus-ring transition-colors duration-micro ease-enter",
            filtre === "toutes"
              ? "border-accent bg-accent text-on-accent"
              : "border-subtle bg-surface-raised text-secondary hover:border-soft hover:text-primary"
          )}
        >
          <span>Toutes</span>
          <span
            className={cn(
              "font-mono text-caption tnum",
              filtre === "toutes" ? "text-on-accent" : "text-tertiary"
            )}
          >
            {total}
          </span>
        </button>

        {groupes.map((g) => {
          const actif = filtre === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => selectionner(g.id)}
              aria-pressed={actif}
              disabled={!hydrated}
              aria-busy={!hydrated || undefined}
              className={cn(
                "inline-flex min-h-touch items-center gap-2 border px-3.5 text-body-sm font-medium",
                "state-layer focus-ring transition-colors duration-micro ease-enter",
                actif
                  ? "border-accent bg-accent text-on-accent"
                  : "border-subtle bg-surface-raised text-secondary hover:border-soft hover:text-primary"
              )}
            >
              <span>{g.onglet}</span>
              <span
                className={cn(
                  "font-mono text-caption tnum",
                  actif ? "text-on-accent" : "text-tertiary"
                )}
              >
                {g.liste.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-x-12 gap-y-12",
          groupesVisibles.length > 1 ? "bp-large:grid-cols-3" : "max-w-3xl"
        )}
      >
        {groupesVisibles.map((g) => (
          <section key={g.id} aria-label={g.libelleComplet} className="min-w-0">
            <div className="border-b-2 border-accent pb-3">
              <p className="font-mono text-caption uppercase tracking-eyebrow text-secondary">
                {g.matiere}
              </p>
              <h2 className="mt-1 flex items-baseline justify-between gap-3 font-display text-h2 font-bold text-primary">
                <span className="min-w-0">{g.filiere}</span>
                <span className="shrink-0 font-mono text-caption font-semibold text-secondary tnum">
                  {g.liste.length} épreuve{g.liste.length > 1 ? "s" : ""}
                </span>
              </h2>
            </div>
            <ul role="list">
              {g.liste.map((ep) => (
                <LigneEpreuve key={ep.id} ep={ep} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
