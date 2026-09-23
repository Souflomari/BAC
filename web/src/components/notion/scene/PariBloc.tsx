"use client";

/**
 * Le PARI d'une étape, dans la grammaire des points d'arrêt (ChoiceButton,
 * ResultRow) : un seul langage de question dans tout le produit.
 */
import type { NotionChoice, Scene3DChoix, Scene3DPari } from "@/lib/content";
import { frenchTypography } from "@/lib/frenchTypography";
import { ChoiceButton, MathText, ResultRow } from "../ChoiceButton";
import type { PhasePari } from "./usePari";

export function PariBloc({
  pari,
  phase,
  choixId,
  choixRetenu,
  choixNotion,
  onChoisir,
  idBase,
  invitation = "Lance le temps et regarde : la scène répond d'abord.",
}: {
  pari: Scene3DPari;
  phase: PhasePari;
  choixId: string | null;
  choixRetenu?: Scene3DChoix;
  choixNotion: NotionChoice[];
  onChoisir: (id: string) => void;
  idBase: string;
  /** ce que l'élève fait entre le pari et la révélation */
  invitation?: string;
}) {
  return (
    <div className="flex flex-col gap-3" data-pari-bloc>
      <div className="min-w-0 break-words text-body text-primary">
        <MathText>{pari.question}</MathText>
      </div>
      {phase === "note" && choixRetenu ? (
        <p className="text-body-sm text-secondary" aria-live="polite">
          {frenchTypography("Ton pari : ")}
          <span className="text-primary">
            <MathText>{choixRetenu.texte}</MathText>
          </span>
          {frenchTypography(`. ${invitation}`)}
        </p>
      ) : (
        <ul role="list" className="space-y-2" aria-label="Choix" data-pari-choix>
          {choixNotion.map((c, i) => (
            <ChoiceButton
              key={c.id}
              choice={c}
              index={i}
              answered={phase === "revele"}
              selectedId={choixId}
              onSelect={onChoisir}
              feedbackId={`${idBase}-pari-${c.id}`}
              idleSurface="bg-surface-raised"
              revealCorrectFeedback
              disabledExtra={["cursor-default", "bg-surface-raised", "border-subtle", "shadow-elevation-0"]}
            />
          ))}
        </ul>
      )}
      <ResultRow answered={phase === "revele"} isCorrect={!!choixRetenu?.juste} />
    </div>
  );
}
