/**
 * /pilote/suites — la leçon pilote « Les suites numériques », séance 1 « La machine u_{n+1} = f(u_n) »
 * (format v3), suite directe de /pilote/logarithme et /pilote/exponentielle.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes (habillage Grille) et n'y ajoute que ses contrôles. Non liée depuis l'accueil
 * tant que le propriétaire n'a pas décidé.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./suites.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { SuitesPilote } from "@/components/pilote/SuitesPilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/suites" },
  title: "Les suites numériques — la leçon",
  description:
    "La machine u(n+1) = f(u(n)) : l’escalier entre la courbe et la droite y = x, la récurrence, le sens de variation, la convergence, la limite, et la fin d’un problème du bac.",
};

export default function PiloteSuitesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <SuitesPilote />
      </main>
    </div>
  );
}
