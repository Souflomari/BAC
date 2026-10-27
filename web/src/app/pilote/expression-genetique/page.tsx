/**
 * /pilote/expression-genetique — la leçon pilote SVT au nouveau format
 * (refonte 2026-10) : « Du gène à la protéine ».
 *
 * Même habillage que /pilote/logarithme (sa feuille pilote.css est réutilisée
 * telle quelle, complétée par expression-genetique.css). Plein écran sous
 * l'en-tête, sans pied de page. Page de validation du format : elle n'est
 * liée de nulle part tant que le propriétaire n'a pas tranché.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./expression-genetique.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { ExpressionGenetiquePilote } from "@/components/pilote/ExpressionGenetiquePilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Du gène à la protéine — la leçon",
  description:
    "L’expression de l’information génétique pas à pas : ce qu’il faut savoir (protéine, chromosome, gène), puis de la drépanocytose au raisonnement de l’exercice du bac.",
};

export default function PiloteExpressionGenetiquePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <ExpressionGenetiquePilote />
      </main>
    </div>
  );
}
