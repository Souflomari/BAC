/**
 * kepler.ts — la physique de la scène « orbite géostationnaire », SANS three.js.
 *
 * Tout ce que la scène AFFICHE en nombres vient d'ici, et ce module ne dépend
 * d'aucun rendu : si WebGL manque, les lectures restent vraies et disponibles
 * (feuille de charge, risque 9). Le rendu 3D (`orbite-geostationnaire.ts`)
 * lit les MÊMES fonctions — une seule physique, deux usages.
 *
 * LES CONSTANTES SONT CELLES DE LA LEÇON, pas celles d'un manuel d'astronomie :
 * `content/pc/chute-mouvements-plans/lesson.md`, R10, exemple travaillé —
 * G = 6,67×10⁻¹¹, M_T = 5,97×10²⁴ kg, R_T ≈ 6,37×10⁶ m, et « on prend
 * T = 24 h ». (Le jour sidéral vaut 23 h 56 min ; la leçon, comme l'énoncé
 * type du bac, prend 24 h. La scène suit la leçon : un élève qui refait le
 * calcul de l'exemple doit retrouver EXACTEMENT le rayon que la scène
 * désigne.) Avec ces valeurs, r_geo ≈ 42 226 km, h ≈ 35 856 km, v ≈ 3,07 km/s.
 *
 * Le mouvement est ANALYTIQUE — orbite circulaire uniforme, rotation terrestre
 * uniforme — et non intégré pas à pas : la position à l'instant t ne dépend
 * que de t et des réglages, jamais de l'histoire des images rendues. C'est ce
 * qui rend la scène vérifiable par une porte (même réglage, même t, même
 * image) et ce qui fait que le temps peut se RÉGLER au curseur comme il se
 * déroule au bouton.
 *
 * Repère physique : z vers le Nord, le nœud ascendant sur l'axe x, le point P
 * de l'équateur à la longitude 0 (sur l'axe x à t = 0). Le satellite part à la
 * verticale de P.
 */

export const G = 6.67e-11; // N·m²·kg⁻²
export const M_TERRE = 5.97e24; // kg
export const R_TERRE = 6.37e6; // m
export const T_TERRE = 24 * 3600; // s — la convention de la leçon
export const GM = G * M_TERRE;

/** Période d'une orbite circulaire de rayon r (3e loi de Kepler). */
export function periode(r: number): number {
  return 2 * Math.PI * Math.sqrt((r * r * r) / GM);
}

/** Vitesse orbitale dans le référentiel géocentrique, v = √(GM/r). */
export function vitesseOrbitale(r: number): number {
  return Math.sqrt(GM / r);
}

/** Le rayon qui donne la période T : r = (GM·T²/4π²)^(1/3). */
export function rayonPourPeriode(T: number): number {
  return Math.cbrt((GM * T * T) / (4 * Math.PI * Math.PI));
}

/** L'unique rayon géostationnaire, avec les constantes de la leçon. */
export const RAYON_GEO = rayonPourPeriode(T_TERRE);

export type Sens = 1 | -1; // 1 : même sens que la Terre (vers l'est) ; −1 : sens contraire
export type Referentiel = "geocentrique" | "terrestre";

export interface EtatOrbite {
  /** rayon de l'orbite, en mètres */
  rayon: number;
  /** inclinaison du plan de l'orbite sur l'équateur, en degrés */
  inclinaison: number;
  sens: Sens;
  referentiel: Referentiel;
  /** temps écoulé depuis le départ (satellite à la verticale de P), en secondes */
  temps: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Angle dont la Terre a tourné à l'instant t (radians, sens direct vu du Nord). */
export function angleTerre(t: number): number {
  return (2 * Math.PI * t) / T_TERRE;
}

/** Position du satellite dans le référentiel géocentrique (axes fixes). */
export function positionGeocentrique(e: EtatOrbite, t: number = e.temps): Vec3 {
  const phi = (e.sens * 2 * Math.PI * t) / periode(e.rayon);
  const i = (e.inclinaison * Math.PI) / 180;
  return {
    x: e.rayon * Math.cos(phi),
    y: e.rayon * Math.sin(phi) * Math.cos(i),
    z: e.rayon * Math.sin(phi) * Math.sin(i),
  };
}

/** Exprime un vecteur des axes géocentriques dans les axes liés au sol. */
function versSol(v: Vec3, t: number): Vec3 {
  const a = -angleTerre(t);
  return {
    x: v.x * Math.cos(a) - v.y * Math.sin(a),
    y: v.x * Math.sin(a) + v.y * Math.cos(a),
    z: v.z,
  };
}

/** Position du satellite dans le référentiel terrestre (axes tournant avec le sol). */
export function positionTerrestre(e: EtatOrbite, t: number = e.temps): Vec3 {
  return versSol(positionGeocentrique(e, t), t);
}

/** Position dans le référentiel AFFICHÉ. */
export function positionDansReferentiel(e: EtatOrbite, t: number = e.temps): Vec3 {
  return e.referentiel === "terrestre" ? positionTerrestre(e, t) : positionGeocentrique(e, t);
}

/** Vitesse du satellite dans le référentiel géocentrique (vecteur). */
export function vitesseGeocentrique(e: EtatOrbite, t: number = e.temps): Vec3 {
  const w = (e.sens * 2 * Math.PI) / periode(e.rayon);
  const phi = w * t;
  const i = (e.inclinaison * Math.PI) / 180;
  return {
    x: -e.rayon * w * Math.sin(phi),
    y: e.rayon * w * Math.cos(phi) * Math.cos(i),
    z: e.rayon * w * Math.cos(phi) * Math.sin(i),
  };
}

/**
 * Vitesse du satellite PAR RAPPORT AU SOL : v_sol = v − ω_T ∧ OS, exprimée dans
 * les axes liés au sol. Nulle à chaque instant si et seulement si les trois
 * conditions sont réunies.
 */
export function vitesseTerrestre(e: EtatOrbite, t: number = e.temps): Vec3 {
  const v = vitesseGeocentrique(e, t);
  const p = positionGeocentrique(e, t);
  const wT = (2 * Math.PI) / T_TERRE;
  return versSol({ x: v.x + wT * p.y, y: v.y - wT * p.x, z: v.z }, t);
}

export function norme(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}

/** Longitude (°, vers l'est positive) et latitude (°) du point sous le satellite. */
export function pointSousSatellite(e: EtatOrbite, t: number = e.temps): { lon: number; lat: number } {
  const p = positionTerrestre(e, t);
  const lon = (Math.atan2(p.y, p.x) * 180) / Math.PI;
  const lat = (Math.asin(p.z / norme(p)) * 180) / Math.PI;
  return { lon, lat };
}

/**
 * Dérive en longitude par rapport au sol, en degrés par jour (vers l'est
 * positive), pour une orbite équatoriale. 0 exactement à r = r_geo, sens direct.
 */
export function deriveParJour(e: EtatOrbite): number {
  const wRel = (e.sens * 2 * Math.PI) / periode(e.rayon) - (2 * Math.PI) / T_TERRE;
  return (wRel * T_TERRE * 180) / Math.PI;
}

// ── Les trois conditions — jugées sur ce que l'élève LIT ────────────────────
//
// LA PRÉCISION D'AFFICHAGE EST UN CHOIX PÉDAGOGIQUE, PAS COSMÉTIQUE. À 0,1 h
// près, « 24,0 h » s'affichait pour tout rayon entre 42 170 et 42 280 km —
// douze positions du curseur cochées « T = 24 h ». La scène aurait montré une
// PLAGE de rayons géostationnaires : exactement la misconception CH-KEP-3
// (« n'importe quelle altitude convient ») qu'elle est là pour casser. À
// 0,01 h près et sur une grille de 10 km, UNE seule position du curseur donne
// « 24,00 h » : 42 230 km. La case et le nombre ne peuvent jamais se
// contredire sous les yeux de l'élève — la condition est cochée quand
// l'affichage dit 24,00 h, et seulement alors.

/** Le pas du curseur de rayon, en mètres. */
export const PAS_RAYON = 10_000;
/** Le rayon géostationnaire posé sur la grille du curseur (42 230 km). */
export const RAYON_GEO_GRILLE = Math.round(RAYON_GEO / PAS_RAYON) * PAS_RAYON;

export function periodeAfficheeEnHeures(T: number): number {
  return Math.round(T / 36) / 100;
}

export interface Conditions {
  periode: boolean;
  plan: boolean;
  sens: boolean;
  geostationnaire: boolean;
}

export function conditions(e: EtatOrbite): Conditions {
  const periodeOk = periodeAfficheeEnHeures(periode(e.rayon)) === 24;
  const planOk = e.inclinaison === 0;
  const sensOk = e.sens === 1;
  return { periode: periodeOk, plan: planOk, sens: sensOk, geostationnaire: periodeOk && planOk && sensOk };
}

// ── Mise en forme française ────────────────────────────────────────────────

const fr0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const fr1 = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fr2 = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Espace insécable fine avant l'unité, comme le reste du produit. */
const U = " ";

export function formatKm(m: number): string {
  return `${fr0.format(Math.round(m / 1000))}${U}km`;
}
/** Le rayon en rayons terrestres, nombre seul (l'unité R_T s'écrit en JSX, indice compris). */
export function enRayonsTerrestres(m: number): string {
  return fr2.format(m / R_TERRE);
}
export function formatHeures(s: number): string {
  return `${fr2.format(periodeAfficheeEnHeures(s))}${U}h`;
}
export function formatTemps(s: number): string {
  return `${fr1.format(Math.round(s / 360) / 10)}${U}h`;
}
export function formatKmParSeconde(v: number): string {
  return `${fr2.format(v / 1000)}${U}km/s`;
}
export function formatDegres(d: number): string {
  return `${fr0.format(d)}${U}°`;
}

const EXPOSANTS: Record<string, string> = {
  "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
};

/** Un nombre en notation scientifique française : « 9,91 × 10⁻¹⁴ ». */
export function formatScientifique(x: number): string {
  const exp = Math.floor(Math.log10(Math.abs(x)));
  const mant = x / 10 ** exp;
  // 9,996 s'arrondirait en « 10,00 × 10ⁿ » : on repasse à la décade suivante.
  const arrondi = Math.round(mant * 100) / 100;
  const [m, e] = arrondi >= 10 ? [arrondi / 10, exp + 1] : [arrondi, exp];
  if (e === 0) return fr2.format(m);
  const sup = String(e).split("").map((c) => EXPOSANTS[c] ?? c).join("");
  return `${fr2.format(m)}${U}×${U}10${sup}`;
}

/** T²/r³ — la 3e loi de Kepler : la même valeur pour tous les rayons. */
export function formatRapportKepler(T: number, r: number): string {
  return `${formatScientifique((T * T) / (r * r * r))}${U}s²/m³`;
}

/**
 * Les rapports RIVAUX de T²/r³, ceux que l'élève retient à tort (CH-KEP-1 :
 * T/r, T³/r² — les distracteurs mêmes de l'item de la spec). Affichés côte à
 * côte à l'étape libre, ils BOUGENT quand le rayon change : c'est ainsi que
 * la mauvaise formule casse sur sa propre conséquence.
 */
export function formatRapportTSurR(T: number, r: number): string {
  return `${formatScientifique(T / r)}${U}s/m`;
}
export function formatRapportT3SurR2(T: number, r: number): string {
  return `${formatScientifique((T * T * T) / (r * r))}${U}s³/m²`;
}
