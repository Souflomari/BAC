/**
 * m3-motion — le système de mouvement de Material 3 Expressive.
 *
 * Pourquoi ce fichier : le retour owner était « aucune animation, et le
 * visuel n'est pas au niveau Google ». Plutôt que d'inventer des courbes
 * d'accélération maison, on adopte le système publié par Google — M3
 * Expressive (mai 2025) remplace les durées + béziers par une PHYSIQUE DE
 * RESSORTS : raideur, amortissement, vitesse initiale.
 *
 * Deux familles, comme dans la spec :
 *   · spatial — position, taille, rotation, forme. Peut rebondir.
 *   · effect  — couleur, opacité. Ne rebondit jamais (amortissement 1).
 *
 * Deux schémas :
 *   · standard   — amortissement 0,9 : sobre, sans dépassement visible.
 *   · expressive — amortissement 0,6-0,8 : dépassement assumé, réservé
 *                  aux moments qui comptent (une réponse juste, une
 *                  révélation). C'est le défaut recommandé par M3.
 *
 * Les valeurs `spatial` sont celles publiées. Les valeurs `effect` sont
 * marquées À CONFIRMER : je ne les ai pas trouvées sourcées, et inventer
 * des nombres en les présentant comme « du M3 » serait exactement le
 * genre d'affirmation non fondée qu'on cherche à éliminer du projet.
 */

export interface Ressort {
  /** Raideur : plus c'est haut, plus le mouvement se résout vite. */
  raideur: number;
  /** Amortissement : 1 = aucun rebond ; en dessous, ça dépasse et revient. */
  amortissement: number;
}

/** Valeurs publiées par M3 Expressive (jetons spatiaux). */
export const SPATIAL = {
  standardFast: { raideur: 1400, amortissement: 0.9 },
  standardDefault: { raideur: 700, amortissement: 0.9 },
  standardSlow: { raideur: 300, amortissement: 0.9 },
  expressiveFast: { raideur: 800, amortissement: 0.6 },
  expressiveDefault: { raideur: 380, amortissement: 0.8 },
  expressiveSlow: { raideur: 200, amortissement: 0.8 },
} as const satisfies Record<string, Ressort>;

/**
 * Jetons d'effet — À CONFIRMER contre la spec officielle avant de s'y
 * fier. Ce qui EST sûr : un effet ne rebondit pas (amortissement 1), donc
 * une couleur ou une opacité ne dépassera jamais sa valeur cible, quelle
 * que soit la raideur retenue.
 */
export const EFFECT = {
  fast: { raideur: 3800, amortissement: 1 },
  default: { raideur: 1600, amortissement: 1 },
  slow: { raideur: 800, amortissement: 1 },
} as const satisfies Record<string, Ressort>;

/**
 * Intègre un ressort amorti pas à pas (Euler semi-implicite).
 *
 * On résout la physique réelle plutôt que d'approcher un ressort par une
 * courbe de Bézier : c'est ce que fait M3, et c'est la seule façon
 * d'obtenir le dépassement caractéristique du schéma « expressive ». La
 * masse est fixée à 1 — dans ce modèle elle se confond avec la raideur.
 *
 * @returns la position et la vitesse après `dt` secondes
 */
export function pasRessort(
  position: number,
  vitesse: number,
  cible: number,
  { raideur, amortissement }: Ressort,
  dt: number
): { position: number; vitesse: number } {
  // amortissement critique = 2√k ; le jeton est un RATIO de celui-ci
  const c = amortissement * 2 * Math.sqrt(raideur);
  const force = -raideur * (position - cible) - c * vitesse;
  // Sous-pas fixes : un dt long (onglet en arrière-plan) ferait diverger
  // l'intégration et le ressort partirait à l'infini.
  const PAS = 1 / 240;
  let p = position;
  let v = vitesse;
  let restant = Math.min(dt, 0.1);
  while (restant > 0) {
    const h = Math.min(PAS, restant);
    const f = -raideur * (p - cible) - c * v;
    v += f * h;
    p += v * h;
    restant -= h;
  }
  void force;
  return { position: p, vitesse: v };
}

/** Le ressort est-il arrivé ? (seuils usuels : position ET vitesse) */
export function ressortAuRepos(
  position: number,
  vitesse: number,
  cible: number,
  seuil = 0.001
): boolean {
  return Math.abs(position - cible) < seuil && Math.abs(vitesse) < seuil;
}
