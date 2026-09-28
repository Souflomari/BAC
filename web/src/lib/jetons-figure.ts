/**
 * jetons-figure.ts — les couleurs d'une figure calculée, LUES sur les jetons
 * `--figure-*`, sans aucune dépendance.
 *
 * Aucun hex dans les scènes : chaque couleur est résolue à l'exécution, et
 * relue quand le thème change. La résolution passe par un canvas 1×1 : hex,
 * rgb(), hsl(), oklch(), color-mix()… un jeton qui changerait de syntaxe
 * demain ne casserait aucune scène.
 *
 * Séparé de `scene3d/palette.ts` le 2026-09-24 : la palette importait `three`
 * (pour sa `Color`), et importer three pose `window.__THREE__`. La cuve à ondes,
 * qui ne doit JAMAIS charger three (sa porte le vérifie, panneau ouvert), lit
 * ses couleurs ici ; la palette des scènes 3D y reprend les siennes.
 */
export type RGB = [number, number, number];

function resoudre(hote: HTMLElement, variable: string, secours: RGB): RGB {
  const valeur = getComputedStyle(hote).getPropertyValue(variable).trim();
  if (!valeur) return secours;
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return secours;
  ctx.fillStyle = `rgb(${secours.join(",")})`;
  ctx.fillStyle = valeur;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

/** Mélange en sRGB (comme le ferait un color-mix du CSS). */
export function melange(a: RGB, b: RGB, t: number): RGB {
  return [0, 1, 2].map((k) => Math.round(a[k] + (b[k] - a[k]) * t)) as RGB;
}

export interface JetonsFigure {
  surface: RGB;
  encre: RGB;
  encreDouce: RGB;
  accent: RGB;
}

export function lireJetons(hote: HTMLElement): JetonsFigure {
  return {
    surface: resoudre(hote, "--figure-surface", [255, 255, 255]),
    encre: resoudre(hote, "--figure-ink", [29, 26, 20]),
    encreDouce: resoudre(hote, "--figure-ink-soft", [85, 82, 74]),
    accent: resoudre(hote, "--figure-accent", [0, 116, 106]),
  };
}
