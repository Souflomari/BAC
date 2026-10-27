/**
 * traits.ts — des traits d'épaisseur CONSTANTE en pixels CSS (Line2).
 *
 * Un trait WebGL de base fait 1 pixel d'APPAREIL : sur un écran de densité 2,
 * un demi-pixel CSS, presque invisible. Line2 garde l'épaisseur voulue, à
 * condition que sa `resolution` soit la taille CSS du canvas (à reposer à
 * chaque redimensionnement).
 */
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

export function cercle(rayon: number, n: number, point: (a: number) => [number, number, number]): number[] {
  const out: number[] = [];
  for (let k = 0; k <= n; k++) out.push(...point((2 * Math.PI * k) / n).map((v) => v * rayon));
  return out;
}

export function trait(positions: number[], largeur: number, options: Partial<{ pointille: boolean; opacite: number }> = {}) {
  const g = new LineGeometry();
  g.setPositions(positions);
  const m = new LineMaterial({
    linewidth: largeur,
    dashed: options.pointille ?? false,
    transparent: options.opacite !== undefined,
    opacity: options.opacite ?? 1,
  });
  const l = new Line2(g, m);
  l.computeLineDistances();
  return l;
}

export function remplacerPositions(l: Line2, positions: number[]) {
  l.geometry.dispose();
  const g = new LineGeometry();
  g.setPositions(positions);
  l.geometry = g;
  l.computeLineDistances();
}

export type { Line2 };
