/**
 * /pilote/radioactivite — la leçon pilote de physique, deuxième version
 * (refonte 2026-10), sur le noyau commun des pilotes comme /pilote/logarithme.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit
 * à droite. Pas de pied de page : la leçon occupe la hauteur de la fenêtre.
 * Page de validation du format sur une deuxième matière, le temps de la
 * décision du propriétaire. Elle reprend la feuille de style du pilote
 * logarithme (l'habillage Grille validé) et n'y ajoute que ses contrôles.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./radioactivite.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { RadioactivitePilote } from "@/components/pilote/RadioactivitePilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Décroissance radioactive — la leçon",
  description:
    "La décroissance radioactive pas à pas : de Becquerel (1896) à la datation au carbone 14, en lançant soi-même les dés.",
};

export default function PiloteRadioactivitePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <RadioactivitePilote />
      </main>
    </div>
  );
}
