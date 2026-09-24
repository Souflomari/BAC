/**
 * palette.ts — les couleurs d'une scène, LUES sur les jetons `--figure-*`.
 *
 * Aucun hex dans les scènes : chaque couleur est résolue à l'exécution, et
 * relue quand le thème change. La résolution passe par un canvas 1×1 : hex,
 * rgb(), hsl(), oklch(), color-mix()… un jeton qui changerait de syntaxe
 * demain ne casserait aucune scène.
 */
import { Color, SRGBColorSpace } from "three";
import { lireJetons, melange, type JetonsFigure, type RGB } from "../jetons-figure";

// La lecture des jetons vit dans `lib/jetons-figure.ts`, sans three : la cuve à
// ondes (2D) s'en sert sans charger three. Ce module garde ce qui est propre
// aux scènes 3D : la conversion en `Color`.
export { lireJetons, melange };
export type { JetonsFigure, RGB };

export function couleur(rgb: RGB): Color {
  return new Color().setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, SRGBColorSpace);
}
