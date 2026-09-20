/**
 * GardePreferences — réaffirme les deux préférences d'affichage après un
 * rendu client de secours.
 *
 * POURQUOI (§11.149). Les deux réglages d'affichage — le thème (`.dark` sur
 * <html>) et la taille du texte (`--font-scale`, une variable en ligne sur
 * <html>) — sont posés AVANT la peinture par le script THEME_BOOT du layout,
 * et par personne d'autre : ThemeToggle et FontSizeStepper ne font que LIRE
 * l'état au montage, puis l'écrire quand l'élève clique. Or `<html>` est rendu
 * par React, et le serveur le rend TOUJOURS sans la classe et sans la
 * variable. Tant que l'hydratation réussit, React ne touche à rien. Dès
 * qu'elle échoue, React abandonne le HTML du serveur et refait un rendu
 * client complet : il réapplique alors les attributs de `<html>` tels que le
 * layout les déclare — et les deux préférences disparaissent.
 *
 * MESURÉ (2026-09-20, thème sombre émulé, `bac-textsize=large`) :
 *
 *   route                            dark   --font-scale
 *   /                                 oui   1.125      ← hydratation normale
 *   route à désaccord d'hydratation   NON   (vide)     ← rendu de secours
 *   route qui lève (error.tsx)        NON   (vide)     ← même rendu de secours
 *
 * Ce que ça vaut pour un élève : un désaccord d'hydratation n'affiche AUCUNE
 * erreur — la page marche. Elle repasse simplement en clair, et le texte
 * agrandi redevient petit. Sur le réglage même dont dépendent les élèves qui
 * voient mal, et sans que rien ne le dise.
 *
 * CE QUE CE COMPOSANT FAIT. Il ne rend rien. Au montage — donc aussi après un
 * rendu de secours, puisque tout l'arbre remonte — il relit la source de
 * vérité (localStorage, à défaut la préférence système pour le thème) et
 * remet la classe et la variable si le DOM en a divergé. Il n'écrit JAMAIS
 * dans localStorage : il n'est pas un choix de l'élève, seulement la mémoire
 * de ce que l'élève a déjà choisi.
 *
 * POURQUOI EN TÊTE DU BODY. Les effets partent dans l'ordre de l'arbre :
 * monté avant l'en-tête, celui-ci passe AVANT ceux de ThemeToggle et de
 * FontSizeStepper, qui lisent le DOM au montage — ils lisent donc un DOM déjà
 * corrigé, et leurs icônes ne mentent pas.
 */

"use client";

import { useEffect } from "react";

const CLE_THEME = "bac-theme";
const CLE_TAILLE = "bac-textsize";
//  Mêmes valeurs que FontSizeStepper (SCALE_VALUES) et que THEME_BOOT dans
//  le layout : trois écritures de la même table, que la porte
//  `garde-preferences` du dom-truth compare entre elles.
const ECHELLES: Record<string, string> = {
  small: "0.9375",
  base: "1",
  large: "1.125",
};

export function GardePreferences() {
  useEffect(() => {
    const html = document.documentElement;
    try {
      const t = localStorage.getItem(CLE_THEME);
      const sombre = t
        ? t === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (html.classList.contains("dark") !== sombre) {
        html.classList.toggle("dark", sombre);
      }
    } catch {
      //  Stockage indisponible (navigation privée) : la préférence système
      //  reste la seule source, et le script de démarrage l'a déjà appliquée.
    }
    try {
      const s = localStorage.getItem(CLE_TAILLE);
      const echelle = s ? ECHELLES[s] : undefined;
      if (echelle && html.style.getPropertyValue("--font-scale") !== echelle) {
        html.style.setProperty("--font-scale", echelle);
      }
    } catch {
      /* idem */
    }
  }, []);

  return null;
}
