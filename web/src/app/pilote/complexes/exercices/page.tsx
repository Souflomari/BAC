/**
 * /pilote/complexes/exercices — les exercices générés de la leçon « Nombres complexes : forme algébrique et équations ».
 * Les nombres sont tirés dans le navigateur ; la page serveur ne fournit que le squelette et le
 * libellé officiel des capacités visées.
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
  alternates: { canonical: "/pilote/complexes/exercices" },
  title: "Nombres complexes : forme algébrique et équations — exercices",
  description: "Des exercices générés sur les nombres complexes : la forme algébrique, le conjugué, le module, le second degré dans ℂ, et la fin d’exercice du bac.",
};

export default function ExercicesComplexesPage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>).complexes.flatMap((e) => e.capacites),
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
          nom="complexes"
          matiere="Maths · 2ᵉ Bac"
          titre="Nombres complexes : forme algébrique et équations"
          libelles={libellesLisibles(ids)}
          lecon="/pilote/complexes"
        />
      </div>
    </div>
  );
}
