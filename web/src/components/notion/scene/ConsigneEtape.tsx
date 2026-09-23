"use client";

/**
 * Le titre et la consigne de l'étape — AVANT la scène : on lit, puis on
 * manipule. La consigne passe par MathText (KaTeX + typographie française) :
 * une consigne de maths porte des formules, et une chaîne `$d$` rendue en
 * texte brut s'afficherait telle quelle (trouvé sur la scène de la sphère).
 */
import { frenchTypography } from "@/lib/frenchTypography";
import { MathText } from "../ChoiceButton";

export function ConsigneEtape({ idTitre, idConsigne, titre, consigne }: { idTitre: string; idConsigne: string; titre: string; consigne: string }) {
  return (
    <div className="mb-4 max-w-reading">
      <p id={idTitre} className="text-body font-semibold text-primary">
        {frenchTypography(titre)}
      </p>
      <p id={idConsigne} className="mt-2 min-w-0 break-words font-display text-body-lg text-primary">
        <MathText>{consigne}</MathText>
      </p>
    </div>
  );
}
