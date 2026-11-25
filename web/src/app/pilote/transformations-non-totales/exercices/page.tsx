/**
 * /pilote/transformations-non-totales/exercices : les exercices générés de la leçon « Transformations non totales ».
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
  alternates: { canonical: "/pilote/transformations-non-totales/exercices" },
  title: "Transformations non totales : exercices",
  description: "Des exercices générés sur les transformations non totales : couples acide/base, équation, pH et [H₃O⁺], tableau d’avancement, avancement final, taux d’avancement, équilibre, dilution, sujets du bac.",
};

export default function ExercicesTransformationsNonTotalesPage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>)["transformations-non-totales"].flatMap((e) => e.capacites),
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
          nom="transformations-non-totales"
          matiere="Physique-chimie · 2ᵉ Bac"
          titre="Transformations non totales"
          libelles={libellesLisibles(ids)}
          lecon="/pilote/transformations-non-totales"
        />
      </div>
    </div>
  );
}
