"use client";

/**
 * ExamCountdown — le compte à rebours de l'examen national (Grille, refonte
 * 2026-10). Le chiffre qui décide de tout, imprimé en très grand.
 *
 * HONNÊTETÉ : la date officielle de l'examen national de juin 2027 n'est pas
 * publiée (docs/refonte/01-programme-bac-maroc.md §8). La cible est une
 * ESTIMATION — le début de juin, où les sessions normales récentes ont eu
 * lieu — et l'écran le dit. Le nombre est recalculé chez l'élève au montage :
 * la page est statique, le chiffre du build pourrait dater de plusieurs jours.
 */

import { useEffect, useState } from "react";
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

  return (
    <section aria-label="Compte à rebours de l'examen national" data-compte-a-rebours="" className={cn("min-w-0", className)}>
      <p
        className="font-display wdth-62 tnum text-[8.5rem] font-bold leading-[0.8] text-signal bp-medium:text-[11rem]"
        suppressHydrationWarning
      >
        {semaines}
      </p>
      <p className="mt-5 text-h4 font-semibold text-primary">
        semaines, environ, avant l’examen national
      </p>
      <p className="mt-1 max-w-[34ch] text-body-sm text-tertiary">
        Estimation&#8239;: début juin 2027. La date officielle n’est pas encore publiée.
      </p>
    </section>
  );
}
