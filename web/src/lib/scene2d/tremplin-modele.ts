/**
 * tremplin-modele.ts — « le tremplin circulaire » : la cinématique, et rien
 * d'autre (spec content/pc/lois-de-newton/spec-scene-tremplin.md §5).
 *
 * LA PISTE du sujet national 2019 N, vue de côté : une droite qui DESCEND à
 * 10° sous l'horizontale, raccordée en B à un tremplin circulaire de rayon R
 * qui relève la piste jusqu'au point C, où elle s'arrête (18° au-dessus de
 * l'horizontale — deux données du sujet ; la rotation, 28°, s'en déduit). Le
 * rayon n'est PAS dans le sujet : quatre pièces, 10 · 15 · 20 · 30 m.
 *
 * UNE SEULE VOIE DE CALCUL, ANALYTIQUE. Avec ℓ l'abscisse le long de la piste
 * comptée depuis B (négative sur la droite) et a_T le régime (dv/dt, constant) :
 *   v(ℓ)  = √(v_B² + 2·a_T·ℓ)
 *   a_N   = 0 sur la droite — une BRANCHE, jamais un 1/R à grand R (spec §5.3) ;
 *           v²/R dans l'arc
 *   ‖a‖   = √(a_T² + a_N²)          (une seule fonction pour les trois régimes :
 *                                     l'identité gaz / freinage est STRUCTURELLE)
 *   a·v   = a_T·v                   (u_N ⟂ v : la normale disparaît du produit)
 * La porte refait chaque nombre par sa propre arithmétique, depuis les
 * constantes de la spec, sans importer ce module.
 *
 * AUCUNE FORCE, AUCUNE MASSE (spec §1, §9.2) : la scène est posée AVANT
 * l'énoncé de la deuxième loi. Rien ici ne connaît un newton.
 */

// ── Les constantes : toutes du sujet 2019 N, de la leçon, ou de la spec ──────

/** La pente de l'approche, sous l'horizontale (sujet : β = 10°). */
export const BETA_DEG = 10;
/** La direction en C, au-dessus de l'horizontale (sujet, partie II : α = 18°). */
export const ALPHA_DEG = 18;
const RAD = Math.PI / 180;
/** La rotation totale du tremplin : 18° − (−10°) = 28°, en radians. */
export const ROTATION = (ALPHA_DEG + BETA_DEG) * RAD;
/** La longueur d'approche dessinée : la course part de là (ℓ = −9,0 m). */
export const APPROCHE_M = 9;
/** Le repère « approche » : sur la droite, 6,0 m avant B. */
export const APPROCHE_REPERE_M = 6;
/** Le ralenti de la course : 1 s à l'écran = 1/6 s réelle. Un facteur de TEMPS, constant. */
export const RALENTI = 6;

/** Trois vitesses au point B (m/s) : 18,0 est V_B du sujet ; 9,0 sa moitié exacte. */
export const VITESSES = ["9", "12", "18"] as const;
export type Vitesse = (typeof VITESSES)[number];
/** Quatre tremplins (m) : deux chaînes de doublement, 10 ↔ 20 et 15 ↔ 30. */
export const RAYONS = ["10", "15", "20", "30"] as const;
export type Rayon = (typeof RAYONS)[number];
/** Trois régimes : dv/dt, en m/s². +4,50 est a_G du sujet ; −4,50 son miroir exact. */
export const REGIMES = ["gaz", "tenue", "freinage"] as const;
export type Regime = (typeof REGIMES)[number];
export const A_T: Record<Regime, number> = { gaz: 4.5, tenue: 0, freinage: -4.5 };
/** Quatre lieux de lecture : la droite témoin, puis trois points de l'arc. */
export const REPERES = ["approche", "entree", "milieu", "sortie"] as const;
export type Repere = (typeof REPERES)[number];

// ── La géométrie ────────────────────────────────────────────────────────────

/** La longueur de l'arc B → C, en m : R × 28° en radians. */
export const longueurArc = (R: number) => R * ROTATION;

/** L'abscisse ℓ d'un repère, comptée depuis B le long de la piste (m). */
export function abscisse(repere: Repere, R: number): number {
  switch (repere) {
    case "approche":
      return -APPROCHE_REPERE_M;
    case "entree":
      return 0;
    case "milieu":
      return longueurArc(R) / 2;
    case "sortie":
      return longueurArc(R);
  }
}

/** L'angle de la tangente (sens du mouvement) avec l'horizontale, en radians. */
export const angleTangente = (l: number, R: number) => (l <= 0 ? -BETA_DEG * RAD : -BETA_DEG * RAD + Math.min(l, longueurArc(R)) / R);

/** Le centre du tremplin, en m, B à l'origine, y vers le HAUT. */
export const centre = (R: number): [number, number] => [R * Math.sin(BETA_DEG * RAD), R * Math.cos(BETA_DEG * RAD)];

/** La position du point d'abscisse ℓ, en m (B à l'origine, y vers le haut). */
export function position(l: number, R: number): [number, number] {
  if (l <= 0) return [l * Math.cos(BETA_DEG * RAD), -l * Math.sin(BETA_DEG * RAD)];
  const th = angleTangente(l, R);
  const [cx, cy] = centre(R);
  return [cx + R * Math.sin(th), cy - R * Math.cos(th)];
}

// ── La cinématique ─────────────────────────────────────────────────────────

/** v(ℓ) = √(v_B² + 2·a_T·ℓ), en m/s. */
export const vitesse = (vB: number, aT: number, l: number) => Math.sqrt(Math.max(0, vB * vB + 2 * aT * l));

/** a_N : zéro sur la droite (une BRANCHE — spec §5.3), v²/R dans l'arc. */
export function accelerationNormale(v: number, R: number, l: number): number {
  if (l < 0) return 0;
  return (v * v) / R;
}

/** ‖a‖ = √(a_T² + a_N²) — UNE fonction pour les trois régimes (a_T n'y entre qu'au carré). */
export const normeAcceleration = (aT: number, aN: number) => Math.sqrt(aT * aT + aN * aN);

/** a·v = a_T·v, en m²/s³ (u_N ⟂ v). */
export const produitAV = (aT: number, v: number) => aT * v;

export type Nature = "accéléré" | "uniforme" | "retardé";
/** La nature du mouvement, lue sur le SIGNE de a·v — jamais sur ‖a‖. */
export const nature = (av: number): Nature => (av > 0 ? "accéléré" : av < 0 ? "retardé" : "uniforme");

/** Tout ce qu'un repère donne, pour un réglage. */
export function lire(vB: number, R: number, regime: Regime, l: number) {
  const aT = A_T[regime];
  const v = vitesse(vB, aT, l);
  const aN = accelerationNormale(v, R, l);
  const a = normeAcceleration(aT, aN);
  const av = produitAV(aT, v);
  return { v, aT, aN, a, av, nature: nature(av), droite: l < 0 };
}

// ── La course : de ℓ = −9,0 m jusqu'à B, à accélération constante ─────────────

/** La vitesse au départ de la course (m/s) : 0 pour (9 m/s, gaz) — la moto part du repos. */
export const vitesseDepart = (vB: number, aT: number) => vitesse(vB, aT, -APPROCHE_M);

/** La durée RÉELLE de la course jusqu'à B (s). */
export function dureeCourse(vB: number, aT: number): number {
  if (aT === 0) return APPROCHE_M / vB;
  return (vB - vitesseDepart(vB, aT)) / aT;
}

/** L'abscisse ℓ au temps réel t de la course (≤ 0 ; 0 à l'arrivée en B). */
export function abscisseCourse(t: number, vB: number, aT: number): number {
  const T = dureeCourse(vB, aT);
  const tt = Math.min(Math.max(0, t), T);
  const v0 = vitesseDepart(vB, aT);
  return -APPROCHE_M + v0 * tt + 0.5 * aT * tt * tt;
}

// ── L'écriture des nombres ────────────────────────────────────────────────

/** « 2,00 » — `d` décimales, virgule, signe moins typographique. */
export const nombre = (x: number, d: number) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");

/** Trois chiffres significatifs : 16,2 · 4,05 · 324 · 8,49 · 0,00 (le zéro, à deux décimales). */
export function troisCs(x: number): string {
  if (x === 0) return "0,00";
  const e = Math.floor(Math.log10(Math.abs(x)));
  let d = Math.max(0, 2 - e);
  if (Math.abs(parseFloat(x.toFixed(d))) >= 10 ** (e + 1)) d = Math.max(0, d - 1);
  return nombre(x, d);
}

/** Signé, trois chiffres : « +4,50 » · « 0,00 » · « −4,50 ». */
export const signe3 = (x: number) => (x > 0 ? "+" : "") + troisCs(x);

/** a·v : « +81,0 » · « 0 » · « −54,0 » — le zéro exact s'écrit 0. */
export const ecrireAV = (x: number) => (x === 0 ? "0" : signe3(x));
