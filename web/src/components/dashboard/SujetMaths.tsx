"use client";

/**
 * SujetMaths — « Le sujet de maths » (Grille, refonte 2026-10).
 *
 * Les poids OFFICIELS des domaines dans l'épreuve de mathématiques, d'après
 * les cadres de référence 2025 du CNEE (docs/refonte/01-programme-bac-maroc.md
 * §0 et §3) : SM — analyse 50 %, nombres complexes + structures algébriques
 * 35 %, arithmétique ou probabilités 15 % ; PC/SVT — analyse 55 %, nombres
 * complexes + probabilités 30 %, géométrie dans l'espace 15 %. Affichés en
 * points sur 20 (10/7/3 et 11/6/3, conversions exactes), parce que c'est
 * l'unité du barème qu'un élève lit sur sa copie — et parce que le tableau de
 * bord n'affiche pas de pourcentages (dom-truth D12 §5).
 */

import { getFiliere, type FiliereId } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";

interface Domaine {
  label: string;
  pts: number;
}
interface Sujet {
  titre: string;
  domaines: Domaine[];
  fait: string;
}

const SUJET_SM: Sujet = {
  titre: "Sciences Mathématiques",
  domaines: [
    { label: "Analyse", pts: 10 },
    { label: "Nombres complexes et structures algébriques", pts: 7 },
    { label: "Arithmétique ou probabilités", pts: 3 },
  ],
  fait: "Un problème d’analyse de 10\u00a0pts : étude de fonction, suite, intégrale. Pas de géométrie dans l’espace.",
};

const SUJET_SEXP: Sujet = {
  titre: "Sciences expérimentales (PC, SVT)",
  domaines: [
    { label: "Analyse", pts: 11 },
    { label: "Nombres complexes et probabilités", pts: 6 },
    { label: "Géométrie dans l’espace", pts: 3 },
  ],
  fait: "La géométrie dans l’espace tombe chaque année, pour 3\u00a0pts.",
};

function sujetsPour(filiere: FiliereId | null): Sujet[] {
  if (filiere === "sm-a" || filiere === "sm-b") return [SUJET_SM];
  if (filiere === "pc" || filiere === "svt") return [SUJET_SEXP];
  return [SUJET_SM, SUJET_SEXP];
}

function Barre({ sujet, compact }: { sujet: Sujet; compact: boolean }) {
  // Une rangée par domaine : le chiffre en très grand, le libellé, une barre
  // proportionnelle au barème (sur 20). Les blocs proportionnels côte à côte
  // de la maquette ne tenaient pas à 200 % de texte (SC 1.4.4) : « probabilités »
  // ne se coupe pas, et le bloc de 3 pts débordait de sa colonne.
  return (
    <figure className="m-0" data-sujet-maths={sujet.titre}>
      {compact && <figcaption className="mb-1 text-body-sm font-semibold text-primary">{sujet.titre}</figcaption>}
      <ol role="list" aria-label={`Poids des domaines, ${sujet.titre}`}>
        {sujet.domaines.map((d, i) => (
          <li
            key={d.label}
            className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 border-t border-subtle py-3 first:border-t-0"
          >
            <span className="flex items-baseline gap-x-1">
              <span
                className={cn(
                  "font-display wdth-62 tnum font-bold leading-none",
                  compact ? "text-[2.5rem]" : "text-[3.25rem]",
                  i === 0 ? "text-signal" : "text-primary"
                )}
              >
                {d.pts}
              </span>
              <span className="text-caption font-semibold text-secondary">pts</span>
            </span>
            <span className="min-w-0">
              <span className="block break-words text-body-sm font-semibold text-primary">{d.label}</span>
              <span className="mt-1.5 block h-2 bg-surface-container-lowest" aria-hidden>
                <span
                  className={cn("block h-full", i === 0 ? "bg-signal" : "bg-accent")}
                  style={{ width: `${(d.pts / 20) * 100}%` }}
                />
              </span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-1 text-body-sm text-secondary">{frenchTypography(sujet.fait)}</p>
    </figure>
  );
}

export function SujetMaths({ className }: { className?: string }) {
  const { filiere, mounted } = useFiliere();
  const active = mounted ? getFiliere(filiere) : null;
  const sujets = sujetsPour(active?.id ?? null);

  return (
    <section aria-label="Le sujet de maths" className={cn("min-w-0", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-accent pb-3">
        <h2 className="font-display text-h2 font-bold text-primary">Le sujet de maths</h2>
        <p className="text-body-sm text-tertiary">Cadre de référence 2025 · sur 20</p>
      </div>
      <div className="mt-5 grid gap-6">
        {sujets.map((s) => (
          <Barre key={s.titre} sujet={s} compact={sujets.length > 1} />
        ))}
      </div>
    </section>
  );
}
