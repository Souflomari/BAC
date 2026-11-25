/**
 * /pilote/transmission/exercices : les exercices générés de la leçon « Les lois statistiques de la transmission des caractères ».
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
  alternates: { canonical: "/pilote/transmission/exercices" },
  title: "Les lois statistiques de la transmission des caractères : exercices",
  description:
    "Des exercices générés sur la transmission des caractères : dominance, test-cross, gène létal, gènes indépendants ou liés, distances et carte factorielle.",
};

export default function ExercicesTransmissionPage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>).transmission.flatMap((e) => e.capacites),
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
          nom="transmission"
          matiere="SVT · 2ᵉ Bac"
          titre="Les lois de la transmission des caractères"
          libelles={libellesLisibles(ids)}
          lecon="/pilote/transmission"
        />
      </div>
    </div>
  );
}
