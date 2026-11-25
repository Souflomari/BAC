/**
 * /pilote/transformations-non-totales : la leçon pilote de chimie « Transformations non totales » (format v3),
 * première leçon de chimie : l'équation d'un acide avec l'eau, le tableau, le taux d'avancement final par le pH,
 * la loupe sur cent molécules (l'équilibre dynamique), la dilution, puis deux sujets du bac.
 *
 * Plein écran sous l'en-tête : la scène prend la largeur, le script se lit à droite. Pas de pied
 * de page : la leçon occupe la hauteur de la fenêtre. Elle reprend la feuille de style commune
 * des pilotes et n'y ajoute que ses contrôles. Non liée depuis l'accueil : elle n'est pas montrée
 * aux élèves tant que les valeurs « à vérifier » de son fichier d'outils ne sont pas relues.
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./transformations-non-totales.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { TransformationsNonTotalesPilote } from "@/components/pilote/TransformationsNonTotalesPilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/transformations-non-totales" },
  title: "Transformations non totales : la leçon",
  description:
    "Deux acides de même concentration, deux pH : où sont passés les protons ? Brønsted, l’équation avec l’eau, le taux d’avancement final par le pH, la loupe sur cent molécules, l’équilibre dynamique, la dilution, puis deux sujets du bac.",
};

export default function PiloteTransformationsNonTotalesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <TransformationsNonTotalesPilote />
      </main>
    </div>
  );
}
