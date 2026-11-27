/**
 * /pilote/dosage/exercices : les exercices générés de la leçon « Le dosage acido-basique ».
 */

import type { Metadata } from "next";
import "../../exercices.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { ExercicesPilote } from "@/components/pilote/ExercicesPilote";
import { CATALOGUE } from "@/components/pilote/exercices/catalogue";
import { libellesLisibles } from "@/lib/referentiel-libelles";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/dosage/exercices" },
  title: "Le dosage acido-basique\u202f: exercices",
  description:
    "Des exercices générés sur le dosage acido-basique : équation et constante K, montage, équivalence, contenu du bécher, lecture graphique, demi-équivalence, indicateur coloré, dilution, sujets du bac.",
};

export default function ExercicesDosagePage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>).dosage.flatMap((e) => e.capacites),
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
          nom="dosage"
          matiere="Physique-chimie · 2ᵉ Bac"
          titre="Le dosage acido-basique"
          libelles={libellesLisibles(ids)}
          lecon="/pilote/dosage"
        />
      </div>
    </div>
  );
}
