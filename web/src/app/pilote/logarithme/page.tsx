/**
 * /pilote/logarithme — la leçon pilote au nouveau format (refonte 2026-10).
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit
 * à droite. Pas de pied de page : la leçon occupe la hauteur de la fenêtre.
 * Page de validation du format ; elle n'est liée que depuis l'accueil et la
 * notion « Fonction logarithme » le temps de la décision du propriétaire.
 */

import type { Metadata } from "next";
import "./pilote.css";
import "./logarithme.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { LogarithmePilote } from "@/components/pilote/LogarithmePilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fonction logarithme — la leçon",
  description: "Pourquoi ln : de Napier (1614) à la définition du bac, ce que dit la courbe de ln, ses règles de calcul et une équation du bac.",
};

export default function PiloteLogarithmePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LogarithmePilote />
      </main>
    </div>
  );
}
