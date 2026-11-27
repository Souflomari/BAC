/**
 * /pilote/dipole-rl : la leçon pilote de physique « Le dipôle RL » (format v3), deuxième chapitre du
 * sous-domaine Électricité, suite directe de /pilote/dipole-rc.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes et n'y ajoute que ses contrôles. Non liée depuis l'accueil : elle n'est pas montrée
 * aux élèves tant que les valeurs « à vérifier » de son fichier d'outils ne sont pas relues.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./dipole-rl.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { DipoleRlPilote } from "@/components/pilote/DipoleRlPilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/dipole-rl" },
  title: "Le dipôle RL : la leçon",
  description:
    "Pourquoi une bobine retarde le courant : la tension u = r i + L di/dt, l’équation différentielle, la constante de temps L/(R + r), la rupture et la surtension, l’énergie magnétique, puis deux sujets du bac.",
};

export default function PiloteDipoleRlPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <DipoleRlPilote />
      </main>
    </div>
  );
}
