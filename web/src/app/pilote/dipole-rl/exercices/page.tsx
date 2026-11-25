/**
 * /pilote/dipole-rl/exercices : les exercices générés de la leçon « Le dipôle RL ».
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
  alternates: { canonical: "/pilote/dipole-rl/exercices" },
  title: "Le dipôle RL : exercices",
  description: "Des exercices générés sur le dipôle RL : unités, tension d’une bobine, courant triangulaire, équation différentielle, constante de temps, rupture et surtension, énergie, oscilloscope.",
};

export default function ExercicesDipoleRlPage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>)["dipole-rl"].flatMap((e) => e.capacites),
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
          nom="dipole-rl"
          matiere="Physique-chimie · 2ᵉ Bac"
          titre="Le dipôle RL"
          libelles={libellesLisibles(ids)}
          lecon="/pilote/dipole-rl"
        />
      </div>
    </div>
  );
}
