"use client";

/**
 * ExamCountdown — le compte à rebours discret de l'examen national (ADR 0045,
 * G-04-013). Une seule ligne factuelle en haut de l'accueil : filière active
 * (si choisie), estimation du nombre de semaines restantes avant l'examen
 * national, et accès direct au choix de filière.
 *
 * HONNÊTETÉ : la date officielle de l'examen national de juin 2027 n'est pas
 * publiée (docs/refonte/01-programme-bac-maroc.md §8). La cible est une
 * ESTIMATION — le début de juin, où les sessions normales récentes ont eu
 * lieu — et l'écran le dit. Le nombre est recalculé chez l'élève au montage :
 * la page est statique, le chiffre du build pourrait dater de plusieurs jours.
 */

import { useEffect, useState } from "react";
import { Link } from "@/components/ui/Lien";
import { getFiliere } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { cn } from "@/lib/utils";

/** Début juin 2027 — estimation, pas une date officielle. */
const CIBLE_ESTIMEE = Date.UTC(2027, 5, 1);
const SEMAINE = 7 * 24 * 3600 * 1000;

function semainesRestantes(maintenant: number): number {
  return Math.max(0, Math.ceil((CIBLE_ESTIMEE - maintenant) / SEMAINE));
}

export function ExamCountdown({ className }: { className?: string }) {
  const [semaines, setSemaines] = useState(() => semainesRestantes(Date.now()));
  useEffect(() => setSemaines(semainesRestantes(Date.now())), []);
  const { filiere, mounted } = useFiliere();
  const active = mounted ? getFiliere(filiere) : null;

  return (
    <section
      aria-label="Compte à rebours de l'examen national"
      data-compte-a-rebours=""
      className={cn(
        "min-w-0 border-b border-subtle pb-3",
        "flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-body-sm text-secondary",
        className
      )}
    >
      <p className="min-w-0 leading-relaxed" suppressHydrationWarning>
        {active ? (
          <>
            <span className="font-semibold text-primary">{active.name}</span>
            <span aria-hidden="true" className="text-tertiary"> · </span>
          </>
        ) : null}
        <strong className="tnum font-semibold text-primary">{semaines}</strong>{" "}
        semaines environ avant l’examen national
        <span className="text-tertiary">
          {" "}
          (estimation&#8239;: début juin 2027, date officielle non publiée)
        </span>
      </p>
      <Link
        href="/commencer"
        className="inline-flex min-h-touch items-center whitespace-nowrap font-semibold text-primary underline decoration-border-soft underline-offset-4 hover:text-signal focus-ring"
      >
        {active ? "Changer de filière" : "Choisis ta filière"}
      </Link>
    </section>
  );
}
