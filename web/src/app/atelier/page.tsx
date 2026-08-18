import "mafs/core.css";

import type { Metadata } from "next";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { listNotions } from "@/lib/content";
import { Atelier } from "@/components/atelier/Atelier";

export const metadata: Metadata = {
  title: "Atelier — les dérivées, de la pente au nombre dérivé",
  // Prototype : hors du produit, il ne doit pas être indexé.
  robots: { index: false, follow: false },
};

/**
 * /atelier — prototype de la première chaîne selon NORTH-STAR-V2.
 *
 * Délibérément à côté du site existant, pas dedans : on compare deux
 * modèles, on ne mélange pas. Les notions actuelles restent intactes le
 * temps de l'arbitrage.
 *
 * La page est volontairement nue sous le header : c'est `Atelier` qui décide
 * de sa largeur et de ses marges, parce qu'elles CHANGENT entre le plan (une
 * colonne de lecture) et le parcours (deux panneaux larges). Un gabarit
 * imposé ici briderait la scène, qui est justement ce qu'on veut voir en
 * grand.
 *
 * Le header, lui, est revenu (audit 2026-08-15, P2-4) : la page ne portait
 * AUCUN lien. Un élève arrivant par un lien partagé était enfermé — pas de
 * retour à l'accueil, pas de thème, pas de taille de texte.
 */
export default function AtelierPage() {
  return (
    <>
      <SiteHeader
        container="mx-auto max-w-atelier px-gutter w-full"
        notions={listNotions().map((n) => ({ subject: n.subject, slug: n.slug, title: n.title, readingMinutes: n.readingMinutes }))}
      />
      <main>
        <Atelier />
      </main>
    </>
  );
}
