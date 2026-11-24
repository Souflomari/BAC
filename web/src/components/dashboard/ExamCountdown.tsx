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
import { semainesRestantes } from "@/lib/compte-a-rebours";
import { cn } from "@/lib/utils";

/**
 * `initial` est le nombre calculé par le serveur au build : le premier rendu du
 * navigateur doit donner EXACTEMENT le même HTML, sinon la page désaccorde le
 * jour où le nombre de semaines change (vu en CI à minuit UTC, 2026-11-24).
 * Le vrai chiffre du jour est posé juste après le montage.
 */
export function ExamCountdown({ initial, className }: { initial: number; className?: string }) {
  const [semaines, setSemaines] = useState(initial);
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
