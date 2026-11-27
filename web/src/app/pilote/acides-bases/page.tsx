/**
 * /pilote/acides-bases : la leçon pilote de chimie « État d’équilibre, acides et bases » (format v3),
 * deuxième leçon de chimie (fiches C4 et C5) : quotient de réaction Q_r, constante d’équilibre K,
 * produit ionique de l’eau K_e, constante d’acidité K_A et pK_A, prédominance et distribution,
 * réaction entre deux couples, indicateur coloré, puis deux sujets du bac (2022 et 2020).
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./acides-bases.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { AcidesBasesPilote } from "@/components/pilote/AcidesBasesPilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/acides-bases" },
  title: "État d’équilibre, acides et bases : la leçon",
  description:
    "Une solution acide où l’hélianthine a la teinte de la soude : quotient de réaction Q_r, constante d’équilibre K, produit ionique de l’eau, constante d’acidité pK_A, domaines de prédominance, deux couples acide/base et sujets du bac.",
};

export default function PiloteAcidesBasesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <AcidesBasesPilote />
      </main>
    </div>
  );
}
