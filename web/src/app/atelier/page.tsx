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
 */
export default function AtelierPage() {
  return (
    <main className="mx-auto max-w-container px-5 py-10 bp-medium:px-8 bp-medium:py-14">
      <header className="max-w-reading">
        <p className="text-caption font-medium uppercase tracking-eyebrow text-accent">
          Prototype · chaîne de compétences
        </p>
        <h1 className="mt-2 font-serif text-h1 font-semibold text-primary">
          Les dérivées
        </h1>
        <p className="mt-3 text-body-lg text-secondary">
          De la pente vue au collège jusqu’au nombre dérivé du bac. Rien à lire
          d’abord : à chaque écran, tu fais quelque chose.
        </p>
      </header>

      <div className="mt-10">
        <Atelier />
      </div>
    </main>
  );
}
