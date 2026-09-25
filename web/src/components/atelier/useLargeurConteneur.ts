"use client";

/**
 * useLargeurConteneur — la largeur réelle du parent, observée.
 *
 * Pourquoi ça existe : les figures doivent grandir avec LEUR PANNEAU, pas
 * avec la fenêtre. C'est la distinction que font les container queries, et
 * c'est celle qui compte ici — le panneau de scène ne fait pas la même
 * largeur selon qu'on est en une ou deux colonnes, à écran égal.
 *
 * Les SVG faits main s'en passent (`width="100%"` + viewBox suffisent : ils
 * sont fluides par construction). Mafs, lui, exige une hauteur en NOMBRE de
 * pixels et pose un SVG de hauteur fixe : sans mesure, il restait à 440 px
 * quel que soit l'écran, et c'est précisément la figure que l'owner
 * trouvait trop petite.
 *
 * On observe donc, plutôt que de deviner à partir de `window.innerWidth`.
 */

import { useEffect, useRef, useState } from "react";

export function useLargeurConteneur<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [largeur, setLargeur] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new ResizeObserver((entrees) => {
      for (const e of entrees) setLargeur(e.contentRect.width);
    });
    obs.observe(el);
    setLargeur(el.getBoundingClientRect().width);
    return () => obs.disconnect();
  }, []);

  return { ref, largeur };
}

/**
 * Hauteur d'une scène à partir de la largeur de son panneau.
 *
 * Rapport 0,66 : assez haut pour qu'une parabole respire, assez plat pour
 * qu'on voie la figure ET sa légende sans défiler. Borné en bas (380 px,
 * en dessous la figure cesse d'être lisible) et en haut (760 px, au-delà
 * elle ne tient plus dans une fenêtre d'ordinateur portable).
 */
export function hauteurScene(largeur: number) {
  if (!largeur) return 440;
  // Rapport 0,58 et plafond à 620 px. Le premier essai (0,66 / 760) donnait
  // une scène de 760 px de haut à 1920 : la figure passait, mais elle
  // repoussait ses propres curseurs sous la ligne de flottaison — on ne
  // pouvait plus manipuler ce qu'on venait d'agrandir. Une figure qu'il faut
  // faire défiler pour actionner est une régression, pas un progrès.
  return Math.round(Math.min(620, Math.max(360, largeur * 0.58)));
}
