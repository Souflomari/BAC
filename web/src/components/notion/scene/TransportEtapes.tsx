"use client";

/** Le transport des étapes — la grammaire de StagedFigure. */
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
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Étapes de la scène">
      <TransportButton onClick={() => onAller(index - 1)} disabled={index === 0} aria-label="Étape précédente">
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
