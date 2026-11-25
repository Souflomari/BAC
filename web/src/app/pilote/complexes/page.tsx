/**
 * /pilote/complexes — la leçon pilote « Nombres complexes, première partie » : forme algébrique et
 * équations (format v3), suite directe de /pilote/suites.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes (habillage Grille) et n'y ajoute que ses contrôles. Non liée depuis l'accueil
 * tant que le propriétaire n'a pas décidé.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./complexes.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { ComplexesPilote } from "@/components/pilote/ComplexesPilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/complexes" },
  title: "Nombres complexes : forme algébrique et équations — la leçon",
  description:
    "Une énigme de Cardan, le plan complexe et le quart de tour, le conjugué, le module, le second degré dans ℂ, et la fin de deux exercices du bac.",
};

export default function PiloteComplexesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <ComplexesPilote />
      </main>
    </div>
  );
}
