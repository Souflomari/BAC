"use client";

/**
 * Le transport des étapes — la grammaire de StagedFigure.
 *
 * Deux écarts voulus avec celle-ci (revue ergonomie, 2026-09-24) :
 *   · « Précédent » à l'étape 1 est `aria-disabled`, pas `disabled` : revenir
 *     à l'étape 1 désactivait le bouton sous le doigt, et le focus tombait à
 *     <body>. Il reste focalisable ; son clic ne fait rien.
 *   · les deux boutons portent la marge de défilement du header collant
 *     (WCAG 2.2 — 2.4.11) : ils sont hors de la colonne des réglages, donc hors
 *     de MARGE_FOCUS, et Maj+Tab les rangeait sous le header.
 */
import { Icon } from "@/components/ui/Icon";
import { TransportButton } from "../TransportButton";

export function TransportEtapes({
  index,
  total,
  onAller,
  idConsigne,
}: {
  index: number;
  total: number;
  onAller: (i: number) => void;
  idConsigne: string;
}) {
  const derniere = index === total - 1;
  const premiere = index === 0;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 [&_button]:scroll-mt-24" role="group" aria-label="Étapes de la scène">
      <TransportButton
        onClick={() => {
          if (!premiere) onAller(index - 1);
        }}
        aria-disabled={premiere || undefined}
        aria-label="Étape précédente"
      >
        <Icon name="chevron-left" size={14} />
        <span>Précédent</span>
      </TransportButton>
      <span className="min-w-[6ch] select-none text-center text-caption tabular-nums text-secondary" aria-live="polite" aria-atomic="true">
        {`Étape ${index + 1} / ${total}`}
      </span>
      <TransportButton
        onClick={() => onAller(derniere ? 0 : index + 1)}
        aria-label={derniere ? "Recommencer depuis l’étape 1" : "Étape suivante"}
        aria-describedby={idConsigne}
      >
        {derniere ? (
          <>
            <Icon name="reset" size={13} />
            <span>Recommencer</span>
          </>
        ) : (
          <>
            <span>Suivant</span>
            <Icon name="chevron-right" size={14} />
          </>
        )}
      </TransportButton>
    </div>
  );
}
