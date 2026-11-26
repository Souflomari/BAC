/**
 * /pilote/acides-bases/exercices : les exercices générés de la leçon « État d’équilibre, acides et bases ».
 * Les nombres sont tirés dans le navigateur ; la page serveur fournit le squelette et les libellés officiels.
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
  alternates: { canonical: "/pilote/acides-bases/exercices" },
  title: "État d’équilibre, acides et bases : exercices",
  description:
    "Des exercices générés sur l’état d’équilibre et les réactions acido-basiques : Q_r, constante K, produit ionique K_e, constante d’acidité K_A et pK_A, prédominance, distribution, réaction entre deux couples, indicateur coloré et sujets du bac.",
};

export default function ExercicesAcidesBasesPage() {
  const ids = new Set<string>(
    (CATALOGUE as Record<string, { capacites: string[] }[]>)["acides-bases"].flatMap((e) => e.capacites),
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
          nom="acides-bases"
          matiere="Physique-chimie · 2ᵉ Bac"
          titre="État d’équilibre, acides et bases"
          libelles={libellesLisibles(ids)}
          lecon="/pilote/acides-bases"
        />
      </div>
    </div>
  );
}
