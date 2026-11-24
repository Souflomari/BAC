/**
 * /pilote/transmission : la leçon pilote SVT « Les lois statistiques de la transmission des caractères
 * héréditaires » (format v3), suite de /pilote/meiose.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes et n'y ajoute que ses contrôles. Non liée depuis l'accueil : la leçon n'est montrée
 * aux élèves qu'après la vérification des quatre sujets transcrits (plan, §6) et la relecture des
 * effectifs de Mendel sur le mémoire de 1866 (plan, §9.11).
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./transmission.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { TransmissionPilote } from "@/components/pilote/TransmissionPilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/transmission" },
  title: "Les lois statistiques de la transmission des caractères : la leçon",
  description:
    "Compter les descendants : dominance, test-cross, gène létal, deux gènes indépendants ou liés, distance et carte factorielle, puis deux exercices du bac.",
};

export default function PiloteTransmissionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <TransmissionPilote />
      </main>
    </div>
  );
}
