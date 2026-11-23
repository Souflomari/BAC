/**
 * /pilote/exponentielle/exercices — les exercices générés de la leçon « Fonction exponentielle ».
 * Les nombres sont tirés dans le navigateur ; la page serveur ne fournit que le squelette et le
 * libellé officiel des capacités visées.
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
  alternates: { canonical: "/pilote/exponentielle/exercices" },
  title: "Fonction exponentielle — exercices",
  description: "Des exercices générés sur la fonction exponentielle, du calcul aux équations du bac.",
};

export default function ExercicesExponentiellePage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>).exponentielle.flatMap((e) => e.capacites),
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
          nom="exponentielle"
          matiere="Maths · 2ᵉ Bac"
          titre="Fonction exponentielle"
          libelles={libellesCapacites(ids)}
          lecon="/pilote/exponentielle"
        />
      </div>
    </div>
  );
}
