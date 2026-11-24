/**
 * /pilote/meiose — la leçon pilote SVT « La méiose, la fécondation et les brassages » (format v3),
 * suite de /pilote/expression-genetique.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes et n'y ajoute que ses contrôles. Non liée depuis l'accueil : la leçon n'est pas
 * montrée aux élèves tant qu'un vrai sujet de SVT n'a pas remplacé le premier exemple du bac
 * (plan, §9.2).
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./meiose.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { MeiosePilote } from "@/components/pilote/MeiosePilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/meiose" },
  title: "La méiose, la fécondation et les brassages : la leçon",
  description:
    "Moitié et hasard : du caryotype à la méiose en deux divisions, la quantité d’ADN, le brassage des chromosomes (2ⁿ), le crossing-over, la fécondation, puis un exercice type du bac.",
};

export default function PiloteMeiosePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <MeiosePilote />
      </main>
    </div>
  );
}
