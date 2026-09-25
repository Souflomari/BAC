"use client";

/**
 * Le PARI d'une étape, dans la grammaire des points d'arrêt (ChoiceButton,
 * ResultRow) : un seul langage de question dans tout le produit.
 *
 * LE FOCUS NE TOMBE JAMAIS À <body> (revue ergonomie, 2026-09-24). Parier
 * remplace la liste des choix par « Ton pari : … » quand la scène doit
 * répondre d'abord : le bouton qui avait le focus disparaît. Le focus passe
 * alors sur cette phrase — Tab mène ensuite au bouton qui lance la scène, la
 * suite logique. À la révélation, si le focus s'est perdu, il revient au choix
 * retenu (resté focalisable, voir ChoiceButton). On ne le DÉPLACE jamais s'il
 * est ailleurs ET VISIBLE : l'élève a peut-être la main sur le lancement.
 *
 * UN FOCUS HORS DE L'ÉCRAN EST UN FOCUS PERDU (vague 2 des noyaux, rejoué avant
 * correction). Quand la révélation attend la course, l'élève au clavier a le
 * focus sur « Lancer… » ; le verdict, la suite et les lectures s'insèrent
 * AU-DESSUS, et « Relancer » descend d'environ 1 000 px sous l'écran (cuve,
 * corde, noyaux, à 390 comme à 1 280 px) — Entrée relançait à l'aveugle, Tab
 * partait plus bas encore, loin du verdict. Dans ce cas le focus revient au
 * choix retenu, comme s'il était tombé, et ce choix est amené dans la vue sans
 * passer sous la scène collante (`MARGE_FOCUS` règle la marge de défilement).
 */
import { useEffect, useRef } from "react";
import type { NotionChoice, Scene3DChoix, Scene3DPari } from "@/lib/content";
import { frenchTypography } from "@/lib/frenchTypography";
import { ChoiceButton, MathText, ResultRow } from "../ChoiceButton";
import type { PhasePari } from "./usePari";

const focusPerdu = () => !document.activeElement || document.activeElement === document.body;
/** le focus est-il entièrement hors de la fenêtre (sous le header de 56 px, ou sous le bas) ? */
const focusHorsVue = () => {
  const a = document.activeElement;
  if (!a || a === document.body) return false;
  const r = a.getBoundingClientRect();
  return r.bottom <= 56 || r.top >= window.innerHeight;
};

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
  const blocRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (phase === "note") {
      if (focusPerdu()) noteRef.current?.focus({ preventScroll: true });
    } else if (phase === "revele") {
      const perdu = focusPerdu();
      if (!perdu && !focusHorsVue()) return;
      const retenu = blocRef.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
      retenu?.focus({ preventScroll: true });
      // tombé : on ne fait pas défiler (rien n'a bougé) ; poussé hors de l'écran :
      // le choix retenu vient dans la vue, au plus court
      if (!perdu) retenu?.scrollIntoView({ block: "nearest" });
    }
  }, [phase]);

  return (
    <div ref={blocRef} className="flex flex-col gap-3" data-pari-bloc>
      <div className="min-w-0 break-words text-body text-primary">
        <MathText>{pari.question}</MathText>
      </div>
      {phase === "note" && choixRetenu ? (
        <p ref={noteRef} tabIndex={-1} className="text-body-sm text-secondary" aria-live="polite">
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
