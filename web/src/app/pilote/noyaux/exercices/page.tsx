/**
 * /pilote/noyaux/exercices — les exercices générés de la leçon « Noyaux, masse et énergie ».
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
  alternates: { canonical: "/pilote/noyaux/exercices" },
  title: "Noyaux, masse et énergie : exercices",
  description: "Des exercices générés sur les noyaux : unités, défaut de masse, énergie de liaison, courbe d’Aston, bilan d’une réaction, fission et fusion.",
};

export default function ExercicesNoyauxPage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>).noyaux.flatMap((e) => e.capacites),
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
          nom="noyaux"
          matiere="Physique-chimie · 2ᵉ Bac"
          titre="Noyaux, masse et énergie"
          libelles={libellesLisibles(ids)}
          lecon="/pilote/noyaux"
        />
      </div>
    </div>
  );
}
