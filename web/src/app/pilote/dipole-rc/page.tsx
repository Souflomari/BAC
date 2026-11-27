/**
 * /pilote/dipole-rc : la leçon pilote de physique « Le dipôle RC » (format v3), qui ouvre le
 * sous-domaine Électricité.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes et n'y ajoute que ses contrôles. Non liée depuis l'accueil : elle n'est pas montrée
 * aux élèves tant que les valeurs « à vérifier » de son fichier d'outils ne sont pas relues.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./dipole-rc.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { DipoleRcPilote } from "@/components/pilote/DipoleRcPilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/dipole-rc" },
  title: "Le dipôle RC : la leçon",
  description:
    "D’où vient l’énergie des noyaux : E = mc², le défaut de masse, l’énergie de liaison, la courbe d’Aston, le bilan d’une réaction, la fission et la fusion, puis deux sujets du bac.",
};

export default function PiloteDipoleRcPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <DipoleRcPilote />
      </main>
    </div>
  );
}
