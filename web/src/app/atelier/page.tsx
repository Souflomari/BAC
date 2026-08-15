import "mafs/core.css";

import type { Metadata } from "next";
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
 * La page est volontairement nue : c'est `Atelier` qui décide de sa largeur
 * et de ses marges, parce qu'elles CHANGENT entre le plan (une colonne de
 * lecture) et le parcours (deux panneaux larges). Un gabarit imposé ici
 * briderait la scène, qui est justement ce qu'on veut voir en grand.
 */
export default function AtelierPage() {
  return (
    <main>
      <Atelier />
    </main>
  );
}
