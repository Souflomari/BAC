/**
 * LienEvitement — « Aller au contenu », et il doit être le PREMIER focusable.
 *
 * Mesuré le 2026-09-04 (`web/scripts/annonce-sweep.mjs`) : le site en avait
 * un, mais seulement sur les pages de leçon, et APRÈS l'en-tête. Un lecteur
 * d'écran devait traverser le wordmark, la recherche, le sélecteur de
 * filière et le menu Notions avant d'atteindre le lien censé lui épargner
 * exactement ce trajet — et sur les six pages hors leçon (accueil, épreuves,
 * matières, atelier…), il n'y en avait aucun.
 *
 * Le composant existe pour qu'il n'y ait qu'UN endroit où cette règle est
 * écrite : premier enfant du document, cible `#main-content`, visible dès
 * qu'il reçoit le focus.
 */
import { cn } from "@/lib/utils";

export function LienEvitement() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only",
        "focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "focus:px-4 focus:py-2 focus:rounded-lg",
        "focus:bg-accent focus:text-on-accent focus:text-body-sm focus:font-medium",
        "focus-ring"
      )}
    >
      Aller au contenu
    </a>
  );
}
