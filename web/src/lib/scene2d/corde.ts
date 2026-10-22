/**
 * corde.ts — la corde : ses réglages, sa course, et ce qu'on y LIT
 * (spec content/pc/ondes-mecaniques-progressives/spec-scene-corde.md §5, §6).
 *
 * La corde est ANALYTIQUE, et idéale — ni amortissement, ni dispersion, ni
 * retour (le bout lointain absorbe). Tout vient d'une seule relation, celle de
 * la leçon (R3) :
 *
 *     y(x, t) = y_S(t − x/v)   si t ≥ x/v,   0 sinon.
 *
 * Aucun solveur, aucune grille spatiale, aucune équation à résoudre : le
 * produit calcule une TRANSLATION (spec §1). La PHOTO est cette fonction lue à t
 * fixé, le long de x ; le FILM d'un point est la même fonction lue à x fixé, le
 * long de t. Tout ce qui s'affiche en nombre vient d'ici ; la porte refait ces
 * nombres par sa propre arithmétique, sans importer ce module (spec §11.1).
 */

/** Les sommets d'un geste : (t en s, y en fraction de l'amplitude), reliés en ligne droite ; après le dernier, la valeur TIENT. */
export type Sommets = readonly (readonly [number, number])[];

export const GESTES = ["bosse", "rampe", "rampe-haute", "rampe-lente"] as const;
export type Geste = (typeof GESTES)[number];

/** Les quatre gestes de la main (spec §5.1). Aucun n'est périodique : un seul geste par course. */
export const GESTE: Record<Geste, { sommets: Sommets; amplitudeCm: number; montee: number; duree: number; nom: string }> = {
  // 0 → 3,0 cm en 0,10 s, puis 3,0 → 0 en 0,10 s : son propre miroir
  bosse: { sommets: [[0, 0], [0.1, 1], [0.2, 0]], amplitudeCm: 3.0, montee: 0.1, duree: 0.2, nom: "la bosse (monte, redescend)" },
  // l'exemple travaillé de R3 : 0 → 3,0 cm en 0,10 s, puis maintenu
  rampe: { sommets: [[0, 0], [0.1, 1]], amplitudeCm: 3.0, montee: 0.1, duree: 0.1, nom: "la rampe (monte, reste en haut)" },
  "rampe-haute": { sommets: [[0, 0], [0.1, 1]], amplitudeCm: 6.0, montee: 0.1, duree: 0.1, nom: "la rampe deux fois plus haute" },
  "rampe-lente": { sommets: [[0, 0], [0.2, 1]], amplitudeCm: 3.0, montee: 0.2, duree: 0.2, nom: "la rampe deux fois plus lente" },
};

export const VITESSES = [4, 8] as const;
export type Vitesse = (typeof VITESSES)[number];

/** La corde utile, m. */
export const LONGUEUR = 4.0;
/** Le pas de temps du modèle (s de corde) : il divise EXACTEMENT chaque τ, chaque instant et chaque durée de geste (spec §5.1). */
export const DT = 0.005;
/** L'exagération verticale, déclarée sur l'image (spec §6, §10.1). */
export const EXAGERATION = 20;
/** Le ralenti, déclaré : une seconde de corde dure cinq secondes à l'écran (spec §6). */
export const RALENTI = 5;
/** La fenêtre du film, s de corde. */
export const T_FILM = 1.0;

export const D_MIN = 0.4, D_MAX = 3.2, D_PAS = 0.4; // m
export const T_MIN = 0, T_MAX = 1.0, T_PAS = 0.05; // s

/** La caméra de l'étape 3 : 20 images par seconde, photos numérotées depuis n°0 (t = 0). */
export const IMAGES_PAR_S = 20;
export const PHOTO_A = 4;
export const ECARTS = [1, 2, 4, 5] as const;
export type Ecart = (typeof ECARTS)[number];

/** Recale sur la grille d'un contrôle (évite 1,2000000000000002). */
export const surGrille = (x: number, pas: number, min: number) => Math.round((min + Math.round((x - min) / pas) * pas) * 1e6) / 1e6;

/** y_S(t), en cm : 0 avant le geste ; après le dernier sommet, la valeur tient. */
export function source(g: Geste, t: number): number {
  const { sommets, amplitudeCm } = GESTE[g];
  if (t <= sommets[0][0]) return 0;
  for (let i = 1; i < sommets.length; i++) {
    const [t0, y0] = sommets[i - 1];
    const [t1, y1] = sommets[i];
    if (t <= t1) return amplitudeCm * (y0 + ((y1 - y0) * (t - t0)) / (t1 - t0));
  }
  return amplitudeCm * sommets[sommets.length - 1][1];
}

/** L'élongation (cm) du point d'abscisse x (m) à l'instant t (s), sur une corde de célérité v (m/s). */
export function elongation(g: Geste, v: number, x: number, t: number): number {
  const tau = x / v;
  return t < tau ? 0 : source(g, t - tau);
}

/**
 * Le retard τ = d/v (s). JAMAIS recalé sur la grille du modèle : c'est la
 * GRILLE des contrôles qui le rend exact (spec §5.2), et la porte le vérifie
 * (`grille-exacte`). Un recalage ici rendrait ce contrôle aveugle à un pas mal
 * choisi — le défaut serait réparé en silence au lieu d'être vu.
 */
export const retard = (d: number, v: number) => d / v;
/** Jusqu'où la perturbation est arrivée : le front, x = v·t (m). */
export const front = (v: number, t: number) => Math.min(LONGUEUR, v * t);
/** L'instant d'une photo de la caméra (s). */
export const instantPhoto = (n: number) => n / IMAGES_PAR_S;
/** La vitesse MOYENNE de M pendant sa montée : hauteur / durée de la montée (m/s). */
export const vitesseM = (g: Geste) => GESTE[g].amplitudeCm / 100 / GESTE[g].montee;

/** « 0,30 » — virgule décimale, `d` décimales, vrai signe moins. */
export const nombre = (x: number, d: number) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");
export const m = (x: number, d = 1) => `${nombre(x, d)} m`;
export const s = (x: number) => `${nombre(x, 2)} s`;
export const cm = (x: number) => `${nombre(x, 1)} cm`;
export const ms = (x: number, d = 1) => `${nombre(x, d)} m/s`;
