/**
 * /pilote/exponentielle — la leçon pilote « Fonction exponentielle », séance 1 (format v3),
 * suite directe de /pilote/logarithme.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes (habillage Grille) et n'y ajoute que ses contrôles. Non liée depuis l'accueil
 * tant que le propriétaire n'a pas décidé.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./exponentielle.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { ExponentiellePilote } from "@/components/pilote/ExponentiellePilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/exponentielle" },
  title: "Fonction exponentielle — la leçon",
  description:
    "Pourquoi exp : de l’énigme de Bernoulli (1683) à la courbe de exp comme reflet de ln, ses règles, sa dérivée, ses limites de base et une équation du bac.",
};

export default function PiloteExponentiellePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <ExponentiellePilote />
      </main>
    </div>
  );
}
