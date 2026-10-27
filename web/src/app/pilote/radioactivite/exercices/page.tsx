/**
 * /pilote/radioactivite/exercices — les exercices générés du pilote (V3).
 * Les nombres sont tirés dans le navigateur ; la page serveur ne fournit que
 * le squelette et le libellé officiel des capacités visées.
 */

import type { Metadata } from "next";
import "../../exercices.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { ExercicesPilote } from "@/components/pilote/ExercicesPilote";
import { CATALOGUE } from "@/components/pilote/exercices/catalogue";
import { libellesCapacites } from "@/lib/referentiel-libelles";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Décroissance radioactive — exercices",
  description: "Des exercices générés sur la décroissance radioactive, de l’écriture d’une désintégration à l’exercice complet du bac.",
};

export default function ExercicesRadioactivitePage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>).radioactivite.flatMap((e) => e.capacites),
  );
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <div id="main-content" tabIndex={-1} className="flex-1">
        <ExercicesPilote
          nom="radioactivite"
          matiere="Physique-chimie · 2ᵉ Bac"
          titre="Décroissance radioactive"
          libelles={libellesCapacites(ids)}
          lecon="/pilote/radioactivite"
        />
      </div>
    </div>
  );
}
