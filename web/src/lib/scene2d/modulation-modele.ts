/**
 * modulation-modele.ts — « le banc de modulation » : le multiplieur, l'écran,
 * le détecteur, et rien d'autre (spec
 * content/pc/ondes-em-modulation/spec-scene-modulation.md §5).
 *
 * UNE SEULE VOIE DE CALCUL, ANALYTIQUE, en millisecondes (F en kHz est donc
 * un nombre d'oscillations PAR MILLISECONDE ; f = 400 Hz en vaut 0,4) :
 *   u(t)   = U0 + Sm·sin(2πft)           l'entrée modulante (composante continue + signal)
 *   p(t)   = Pm·cos(2πFt)                la porteuse
 *   u_S(t) = k·u(t)·p(t)                 LE PRODUIT — A = k·Pm·U0 en sort, il n'est pas posé
 *   E(t)   = A·|1 + m·sin(2πft)|         l'enveloppe, m = Sm/U0
 * Le SINUS plutôt que le cosinus des sujets est un décalage d'origine des
 * temps, déclaré (spec §5.2) : il place les quatre extrema d'enveloppe à
 * 1,25 · 3,75 · 6,25 · 8,75 divisions, dans le cadre.
 *
 * U_min EST UN PLANCHER STRUCTUREL : une BRANCHE explicite (Sm ≥ U0 ⇒ 0),
 * jamais un arrondi (spec §5.4, §12 point 2).
 *
 * LE DÉTECTEUR DE CRÊTE (diode idéale, R0 ∥ C0) est une RÉCURRENCE FERMÉE sur
 * les extrema de la porteuse, t_k = k·Tp/2 — deux par période : aux instants
 * pairs u_S vaut +A(1 + m sin), aux impairs −A(1 + m sin). À chaque instant,
 *   u_C(t_k) = max( u_S(t_k) , u_C(t_{k−1})·e^{−Tp/(2τ)} ),   τ = R0·C0.
 * Tant que m < 1, les instants impairs ne chargent jamais (u_S < 0) : c'est
 * EXACTEMENT la récurrence de la spec §5.2 sur les seules crêtes positives.
 * Quand m ≥ 1, sous la bosse retournée, la crête positive est à l'instant
 * IMPAIR — la récurrence de la spec, qui prend |1 + m sin| à l'instant pair,
 * chargerait le condensateur une demi-période trop tôt, sur une crête qui est
 * en réalité négative. ÉCART À LA SPEC, déclaré dans l'en-tête de la spec
 * livrée et refait tel quel par la porte.
 * ENTRE deux instants, la diode idéale conduit dès que u_S dépasse la décharge :
 * le tracé vaut max(décharge, u_S) — il REMONTE LE FLANC de la porteuse, comme
 * sur les oscillogrammes des sujets, au lieu de sauter à la verticale.
 * Amorçage une période d'enveloppe avant le bord gauche (u_C = E, spec §5.2) :
 * l'écran montre le régime établi.
 *
 * La porte refait chaque nombre par sa propre arithmétique, depuis les
 * constantes de la spec, sans importer ce module.
 */

// ── L'écran (spec §5.1) ─────────────────────────────────────────────────────

/** 10 divisions en largeur, 8 en hauteur (sujet 2021 N, figure 6). */
export const DIV_X = 10;
export const DIV_Y = 8;
/** Quatre traits fins par division — un choix d'honnêteté déclaré (spec §5.1) : les neuf couples d'extrema tombent SUR un trait. */
export const SOUS_DIV = 4;
/** 1,00 V/div et 0,50 ms/div (2021 N, 2015 N). */
export const V_PAR_DIV = 1.0;
export const MS_PAR_DIV = 0.5;
/** La durée affichée : 10 × 0,50 = 5,00 ms. */
export const DUREE_MS = DIV_X * MS_PAR_DIV;

// ── Les constantes (spec §5.3) ──────────────────────────────────────────────

/** f, la fréquence du signal modulant : 400 Hz, FIXE — T_env = 2,50 ms = 5,00 div. */
export const F_SIGNAL_HZ = 400;
const F_SIGNAL_KHZ = F_SIGNAL_HZ / 1000;
/** T_env = 1/f, en ms. */
export const T_ENV_MS = 1000 / F_SIGNAL_HZ;
/** Pm, l'amplitude de la porteuse, en V (jamais donnée par un sujet — spec §10.8). */
export const PM = 2.0;
/** k, la constante du multiplieur, en V⁻¹ — k·Pm = 0,500 : A ≠ U0, et visible. */
export const K = 0.25;
/** C0, le condensateur du détecteur, en nF. */
export const C0_NF = 100;

// ── Les crans (spec §5.8) — des énumérations, pas des curseurs ─────────────

/** La porteuse, en kHz : 6 · 12 · 20 · 40 oscillations sur l'écran. 2,0 kHz est écarté EXPRÈS (spec §0.1). */
export const PORTEUSES = ["1.2", "2.4", "4.0", "8.0"] as const;
export type Porteuse = (typeof PORTEUSES)[number];
/** Sm, l'amplitude du signal à transmettre, en V. */
export const MODULANTES = ["1.0", "2.0", "3.0"] as const;
export type Modulante = (typeof MODULANTES)[number];
/** U0, la composante continue de l'entrée modulante, en V. */
export const CONTINUES = ["2.0", "3.0", "4.0"] as const;
export type Continue = (typeof CONTINUES)[number];
/** R0, le rhéostat du détecteur, en kΩ. */
export const DETECTEURS = ["0.5", "2.0", "5.0", "10", "25"] as const;
export type Detecteur = (typeof DETECTEURS)[number];
/** L'étage de détection existe-t-il ? (clé posée par l'étape, sans contrôle.) */
export const SORTIES = ["modulee", "modulee-et-detectee"] as const;
export type Sortie = (typeof SORTIES)[number];
/** L'enveloppe du réglage de départ reste-t-elle dessinée ? (S3 seulement.) */
export const REFERENCES = ["aucune", "depart"] as const;
export type Reference = (typeof REFERENCES)[number];

// ── Le multiplieur ──────────────────────────────────────────────────────────

const DEUX_PI = 2 * Math.PI;

/** u(t) = U0 + Sm·sin(2πft), t en ms. */
export const entreeModulante = (t: number, U0: number, Sm: number) => U0 + Sm * Math.sin(DEUX_PI * F_SIGNAL_KHZ * t);

/** p(t) = Pm·cos(2πFt), t en ms, F en kHz. */
export const porteuse = (t: number, F: number) => PM * Math.cos(DEUX_PI * F * t);

/** u_S(t) = k·u(t)·p(t) : la sortie du multiplieur, en V. */
export const sortieMultiplieur = (t: number, F: number, U0: number, Sm: number) => K * entreeModulante(t, U0, Sm) * porteuse(t, F);

/** A = k·Pm·U0, en V. */
export const amplitudeA = (U0: number) => K * PM * U0;

/** m = Sm/U0 : le taux RÉGLÉ. */
export const tauxRegle = (Sm: number, U0: number) => Sm / U0;

/** E(t) = A·|1 + m·sin(2πft)| : la courbe que les crêtes touchent. */
export const enveloppe = (t: number, U0: number, Sm: number) => amplitudeA(U0) * Math.abs(1 + tauxRegle(Sm, U0) * Math.sin(DEUX_PI * F_SIGNAL_KHZ * t));

/** U_max = kPm(U0 + Sm) ; U_min = kPm(U0 − Sm) si m < 1, et 0 sinon — une BRANCHE. */
export function extrema(U0: number, Sm: number): { max: number; min: number } {
  const max = K * PM * (U0 + Sm);
  if (Sm >= U0) return { max, min: 0 };
  return { max, min: K * PM * (U0 - Sm) };
}

/** m_lu = (U_max − U_min)/(U_max + U_min) : le taux LU sur l'écran — il sature à 1. */
export const tauxLu = (max: number, min: number) => (max - min) / (max + min);

/** (U_max + U_min)/2 : l'amplitude LUE — égale à A tant que m ≤ 1. */
export const amplitudeLue = (max: number, min: number) => (max + min) / 2;

/** La petite bosse retournée entre deux pincements : A(m − 1), nulle si m ≤ 1. */
export const bosseSecondaire = (U0: number, Sm: number) => (Sm > U0 ? amplitudeA(U0) * (tauxRegle(Sm, U0) - 1) : 0);

// ── Le temps (spec §5.5) ────────────────────────────────────────────────────

/** Tp = 1/F, en ms. */
export const periodePorteuse = (F: number) => 1 / F;

/** Le nombre d'oscillations complètes sur l'écran : F × 5,00 ms — un ENTIER aux quatre crans. */
export const oscillations = (F: number) => Math.round(F * DUREE_MS);

/** F/f — calculé en hertz entiers, pour qu'il tombe juste (1,2/0,4 vaut 2,9999… en flottant). */
export const rapportFrequences = (F: number) => Math.round(F * 1000) / F_SIGNAL_HZ;

/** Les maxima de l'enveloppe (ms) : T_env/4 + n·T_env — 0,625 et 3,125 ms. */
export const maximaEnveloppe = () => [T_ENV_MS / 4, T_ENV_MS / 4 + T_ENV_MS];
/** Les minima de l'enveloppe (ms) : 3·T_env/4 + n·T_env — 1,875 et 4,375 ms. */
export const minimaEnveloppe = () => [(3 * T_ENV_MS) / 4, (3 * T_ENV_MS) / 4 + T_ENV_MS];

/**
 * Les instants où l'enveloppe touche zéro, sur l'écran (ms) : sin(2πft) = −1/m.
 * m < 1 : aucun. m = 1 : un point de contact par creux (les minima). m > 1 : deux.
 */
export function zerosEnveloppe(U0: number, Sm: number): number[] {
  if (Sm < U0) return [];
  if (Sm === U0) return minimaEnveloppe();
  const a = Math.asin(U0 / Sm); // sin(2πft) = −1/m ⇔ 2πft = π + a ou 2π − a
  const t1 = (Math.PI + a) / (DEUX_PI * F_SIGNAL_KHZ);
  const t2 = (DEUX_PI - a) / (DEUX_PI * F_SIGNAL_KHZ);
  return [t1, t2, t1 + T_ENV_MS, t2 + T_ENV_MS];
}

/** La division horizontale d'un instant (ms). */
export const enDivisions = (t: number) => t / MS_PAR_DIV;

// ── Le détecteur de crête (spec §5.2, §5.7) ─────────────────────────────────

/** τ = R0·C0, en ms (R0 en kΩ, C0 = 100 nF). */
export const constanteTemps = (R0: number) => R0 * 1e3 * C0_NF * 1e-9 * 1e3;

/**
 * La récurrence fermée sur les extrema de la porteuse, de l'amorçage
 * (t = −T_env) jusqu'au-delà du bord droit. `t[i]` en ms, `v[i]` = u_C juste
 * après l'instant t[i].
 */
export function crestes(F: number, U0: number, Sm: number, R0: number): { t: number[]; v: number[] } {
  const demi = periodePorteuse(F) / 2;
  const tau = constanteTemps(R0);
  const facteur = Math.exp(-demi / tau);
  const kDebut = -Math.round(T_ENV_MS / demi);
  const kFin = Math.round(DUREE_MS / demi) + 1;
  const t: number[] = [kDebut * demi];
  const v: number[] = [enveloppe(kDebut * demi, U0, Sm)];
  for (let k = kDebut + 1; k <= kFin; k++) {
    const tk = k * demi;
    t.push(tk);
    v.push(Math.max(sortieMultiplieur(tk, F, U0, Sm), v[v.length - 1] * facteur));
  }
  return { t, v };
}

/**
 * u_C(t) : la tension aux bornes du condensateur, à tout instant de l'écran.
 * Décharge exponentielle depuis la dernière crête, et la diode idéale qui
 * conduit dès que u_S la dépasse : max(décharge, u_S).
 */
export function detecteur(F: number, U0: number, Sm: number, R0: number): (t: number) => number {
  const { t: tk, v } = crestes(F, U0, Sm, R0);
  const demi = periodePorteuse(F) / 2;
  const tau = constanteTemps(R0);
  const t0 = tk[0];
  return (t: number) => {
    const i = Math.min(tk.length - 1, Math.max(0, Math.floor((t - t0) / demi + 1e-9)));
    const decharge = v[i] * Math.exp(-(t - tk[i]) / tau);
    return Math.max(decharge, sortieMultiplieur(t, F, U0, Sm));
  };
}

// ── L'écriture des nombres ────────────────────────────────────────────────

/** « 2,00 » — `d` décimales, virgule, signe moins typographique. */
export const nombre = (x: number, d: number) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");

/** Trois chiffres significatifs : 0,833 · 4,00 · 0,0500 · 2,50 · 400. */
export function troisCs(x: number): string {
  if (x === 0) return "0,00";
  const e = Math.floor(Math.log10(Math.abs(x)));
  let d = Math.max(0, 2 - e);
  if (Math.abs(parseFloat(x.toFixed(d))) >= 10 ** (e + 1)) d = Math.max(0, d - 1);
  return nombre(x, d);
}

/** Un cran, tel qu'on l'écrit : « 1,2 » · « 4,0 » · « 10 » · « 0,5 ». */
export const cran = (valeur: string) => valeur.replace(".", ",");
