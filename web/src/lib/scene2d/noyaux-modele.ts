/**
 * noyaux-modele.ts — « la courbe et les noyaux » : la loi, et le tirage
 * (spec content/pc/decroissance-radioactive/spec-scene-noyaux.md §5).
 *
 * DEUX VOIES DE CALCUL, et chaque lecture dit de laquelle elle vient (spec §5.3) :
 *
 *  - la LOI, en forme fermée : N(t) = N0 · 2^(−t/t½). Aucun solveur, aucune
 *    erreur : les nombres sont exacts, et la porte les refait par sa propre
 *    arithmétique ;
 *  - le TIRAGE : chaque noyau encore présent tire, à chaque pas Δt = 0,25 jour,
 *    sa désintégration avec la probabilité p = 1 − exp(−λ·Δt) — JAMAIS λ·Δt,
 *    qui décalerait la survie à une demi-vie de 0,5000 à 0,4962 (sabotage n°1
 *    de la spec). Personne ne décide à l'avance combien partiront : c'est la
 *    différence exacte avec le média animé de R3, qui éteignait la moitié tout
 *    rond.
 *
 * La probabilité par pas ne paraît dans AUCUN texte rendu (spec §9.10) : elle
 * vit ici, et la porte la lit dans un attribut de mesure (`data-p-pas`).
 */

export type Isotope = "8" | "4";
export const ISOTOPES: readonly Isotope[] = ["8", "4"];

/** La demi-vie de chaque échantillon, en jours : l'iode 131 de la leçon, et un second isotope, λ doublée. */
export const T_DEMI: Record<Isotope, number> = { "8": 8.0, "4": 4.0 };

/** L'échantillon des courbes : exercises.yaml, N0 = A0/λ = 4,0×10⁸ / 1,00×10⁻⁶. */
export const N0 = 4.0e14;
export const SECONDES_PAR_JOUR = 86400;

/** Le pas du tirage : il divise EXACTEMENT 8,0 (32 pas), 4,0 (16), 1,0 et 0,5 (spec §5.1). */
export const DT = 0.25;

export const POPULATIONS = [64, 256, 1024] as const;
export type Population = (typeof POPULATIONS)[number];

export const INSTANT_MIN = 0, INSTANT_MAX = 10, INSTANT_PAS = 0.5; // j
export const DEPART_MIN = 0, DEPART_MAX = 24, DEPART_PAS = 1; // j

/** La course de la grille : seize jours d'échantillon, un jour = 0,25 s à l'écran. */
export const COURSE_J = 16;
export const ECRAN_S_PAR_JOUR = 0.25;
/** Combien de tirages passés la lecture garde. */
export const MEMOIRE_TIRAGES = 5;

/** Recale sur la grille d'un contrôle (évite 7,000000000000001). */
export const surGrille = (x: number, pas: number, min: number) => Math.round((min + Math.round((x - min) / pas) * pas) * 1e6) / 1e6;

/** λ en j⁻¹. */
export const lambdaJ = (iso: Isotope) => Math.LN2 / T_DEMI[iso];
/** λ en s⁻¹. */
export const lambdaS = (iso: Isotope) => lambdaJ(iso) / SECONDES_PAR_JOUR;
/** τ = 1/λ, en jours. */
export const tau = (iso: Isotope) => 1 / lambdaJ(iso);

/** La LOI : les noyaux restants à l'instant t (jours), pour une population initiale n0. */
export const noyaux = (iso: Isotope, t: number, n0 = N0) => n0 * Math.pow(2, -t / T_DEMI[iso]);
/** L'activité A = λ·N, en becquerels (la leçon écrit A). */
export const activite = (iso: Isotope, t: number) => lambdaS(iso) * noyaux(iso, t);

/**
 * La durée pour passer de N(t1) à N(t1)/2, CALCULÉE depuis la loi (pas recopiée
 * de t½) : ln(N(t1) / (N(t1)/2)) / λ. Qu'elle vaille t½ à toutes les positions
 * est le fait que l'étape 2 fait voir — et que la porte vérifie aux 25 positions.
 */
export function dureeDeMoitie(iso: Isotope, t1: number): number {
  const avant = noyaux(iso, t1);
  return Math.log(avant / (avant / 2)) / lambdaJ(iso);
}

/** La probabilité qu'un noyau présent se désintègre pendant un pas. */
export const pPas = (iso: Isotope) => 1 - Math.exp(-lambdaJ(iso) * DT);

/**
 * Un TIRAGE : pour chaque case, l'instant (jours) où son noyau se désintègre,
 * obtenu pas à pas — à chaque pas, un tirage indépendant de probabilité p ; un
 * noyau qui passe la course entière reçoit Infinity. Tiré une fois pour toute
 * la course : une case vidée ne se rallume jamais (spec §6), et l'image à
 * l'instant t se lit sans rien re-tirer.
 */
export function tirer(iso: Isotope, n: number, aleatoire: () => number = Math.random): Float64Array {
  const p = pPas(iso);
  const pas = Math.round(COURSE_J / DT);
  const fin = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    let k = 1;
    for (; k <= pas; k++) if (aleatoire() < p) break;
    fin[i] = k <= pas ? k * DT : Infinity;
  }
  return fin;
}

/** Combien de noyaux sont encore là à l'instant t. */
export function restants(tirage: Float64Array, t: number): number {
  let n = 0;
  for (let i = 0; i < tirage.length; i++) if (tirage[i] > t + 1e-9) n++;
  return n;
}

// ── L'écriture des nombres ────────────────────────────────────────────────

const EXPOSANTS: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };

/** « 2,0×10¹⁴ » — `cs` chiffres significatifs, virgule décimale. */
export function scientifique(x: number, cs = 2): string {
  if (x === 0) return "0";
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = x / Math.pow(10, e);
  let t = m.toFixed(cs - 1);
  if (parseFloat(t) >= 10) {
    e += 1;
    m = x / Math.pow(10, e);
    t = m.toFixed(cs - 1);
  }
  const exp = String(e).split("").map((c) => EXPOSANTS[c] ?? c).join("");
  return `${t.replace(".", ",")}×10${exp}`;
}

/** Le même nombre en LaTeX : « 2{,}0\times10^{14} ». */
export function scientifiqueTex(x: number, cs = 2): string {
  if (x === 0) return "0";
  let e = Math.floor(Math.log10(Math.abs(x)));
  let t = (x / Math.pow(10, e)).toFixed(cs - 1);
  if (parseFloat(t) >= 10) {
    e += 1;
    t = (x / Math.pow(10, e)).toFixed(cs - 1);
  }
  return `${t.replace(".", "{,}")}\\times10^{${e}}`;
}

/** « 8,0 » — `d` décimales, virgule. */
export const nombre = (x: number, d: number) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");

/** Trois chiffres significatifs, en décimal : 0,0866 · 11,5 · 5,77 · 0,173. */
export function troisCs(x: number): string {
  const e = Math.floor(Math.log10(Math.abs(x)));
  const d = Math.max(0, 2 - e);
  return nombre(x, d);
}
