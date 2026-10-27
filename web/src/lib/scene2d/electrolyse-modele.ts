/**
 * electrolyse-modele.ts — « le banc d'électrolyse » : la loi de Faraday, et
 * rien d'autre (spec content/pc/electrolyse/spec-scene-electrolyse.md §5).
 *
 * LA CELLULE DE LA LEÇON : une lame de cuivre (B) dans sa solution, à gauche ;
 * une lame de zinc (A) dans la sienne, à droite ; un pont salin ; un générateur
 * dont la borne + est à GAUCHE. En `oppose` (le montage de la leçon), la borne +
 * alimente le cuivre : le zinc se dépose, le cuivre se dissout. En `accord`,
 * les deux fils sont échangés : la cellule évolue dans son sens spontané.
 *
 * LA TENSION N'EST L'ARGUMENT D'AUCUNE FONCTION DE CALCUL (spec §5.5, §12.2).
 * Un rhéostat en série maintient le courant à la valeur affichée : la charge
 * Q = I·Δt, les masses, n(e⁻) et F ne dépendent que de (I ; Δt), et du SIGNE
 * que donne le câblage. C'est la façon la plus sûre de tenir la ligne N12 de la
 * porte (27 états, 9 jeux de valeurs) : aucune loi I(U) n'a d'endroit où vivre.
 *
 * UNE SEULE FONCTION POUR LES DEUX CÂBLAGES (N9) : le câblage ne donne qu'un
 * signe, appliqué APRÈS le calcul ; n(e⁻) et F se calculent sur la valeur
 * absolue de la masse AFFICHÉE.
 *
 * LA CASCADE SE FAIT SUR LES VALEURS AFFICHÉES (spec §5.7 D, E ; §15.12) : la
 * masse arrondie au milligramme, puis n(e⁻) = 2·m/M à quatre chiffres, puis
 * F = Q/n(e⁻) à trois. C'est ce que fait l'élève qui refait le calcul, et
 * c'est ce qui produit l'écart réel du septième réglage (9,70·10⁴ à Q = 270 C).
 * La porte refait chaque nombre par sa propre arithmétique, depuis les
 * constantes de la spec, sans importer ce module.
 */

// ── Les constantes : toutes de la leçon (lesson.md:155, :177, :181) ─────────

/** Masse molaire du zinc (g·mol⁻¹). */
export const M_ZN = 65.4;
/** Masse molaire du cuivre (g·mol⁻¹). */
export const M_CU = 63.5;
/** La constante de Faraday ADMISE (C·mol⁻¹) — le banc en déduit les masses ; il ne l'affiche qu'à S5, MESURÉE. */
export const FARADAY = 9.65e4;
/** Électrons échangés par atome, pour les deux couples (Zn²⁺/Zn, Cu²⁺/Cu). */
export const Z = 2;
/** La f.é.m. propre de la cellule, un ACQUIS du chapitre 4 (V) — affichée « environ 1,1 V », jamais calculée. */
export const FEM = 1.1;
/** Le facteur d'accélération de la course : 1 s à l'écran = 900 s réelles (15 min). Constant. */
export const ACCELERE = 900;

/** Trois tensions, toutes au-dessus du seuil (V). 6,0 est l'exemple travaillé du chapitre 4 ; 12,0 son double. */
export const TENSIONS = ["2.0", "6.0", "12.0"] as const;
export type Tension = (typeof TENSIONS)[number];
/** Deux câblages : `oppose` (borne + sur le cuivre (B), le montage de la leçon) et son échange. */
export const CABLAGES = ["oppose", "accord"] as const;
export type Cablage = (typeof CABLAGES)[number];
/** Trois intensités maintenues (mA) : 200 est l'exemple travaillé ; 100 et 400, sa moitié et son double. */
export const INTENSITES = ["100", "200", "400"] as const;
export type Intensite = (typeof INTENSITES)[number];
/** Trois durées (s) : 5 400 est l'exemple travaillé (1 h 30) ; 2 700, sa moitié ; 1 800, la durée ronde. */
export const DUREES = ["1800", "2700", "5400"] as const;
export type Duree = (typeof DUREES)[number];

// ── La chaîne de Faraday ────────────────────────────────────────────────────

/** Q = I·Δt (C), avec I en A et Δt en s. */
export const charge = (iA: number, dtS: number) => iA * dtS;

/** La masse exacte d'un métal de masse molaire M que la charge Q fait passer (g) : Q·M/(z·F). */
export const masseExacte = (Q: number, M: number) => (Q * M) / (Z * FARADAY);

/** Arrondie au MILLIGRAMME (spec §5.8 : la seule précision qui tienne). */
export const auMilligramme = (m: number) => Math.round(m * 1000 + 1e-9) / 1000;

/** Arrondi à n chiffres significatifs, en nombre. */
export function chiffres(x: number, n: number): number {
  if (x === 0) return 0;
  const e = Math.floor(Math.log10(Math.abs(x)));
  const f = 10 ** (n - 1 - e);
  return Math.round(x * f) / f;
}

/** n(e⁻) = z·m/M, calculée sur la masse AFFICHÉE (absolue), à quatre chiffres (mol). */
export const electrons = (mAffichee: number) => chiffres((Z * Math.abs(mAffichee)) / M_ZN, 4);

/** F = Q/n(e⁻), sur les valeurs AFFICHÉES, à trois chiffres (C·mol⁻¹). */
export const faradayMesure = (Q: number, nAffichee: number) => chiffres(Q / nAffichee, 3);

export type Sens = "impose" | "spontane";
/** Le sens de la transformation, lu sur le CÂBLAGE seul (les trois tensions dépassent le seuil). */
export const sens = (c: Cablage): Sens => (c === "oppose" ? "impose" : "spontane");

/**
 * Tout ce que le banc affiche pour un réglage (I ; Δt ; câblage), à la fraction
 * `p` de la course (1 : la course est finie). La TENSION n'y entre pas.
 * Masses SIGNÉES : la masse GAGNÉE par chaque lame (négative quand elle se dissout).
 */
export function lire(iMa: number, dureeS: number, cablage: Cablage, p = 1) {
  const pp = Math.min(1, Math.max(0, p));
  const Q = charge(iMa / 1000, dureeS * pp);
  const zn = auMilligramme(masseExacte(Q, M_ZN));
  const cu = auMilligramme(masseExacte(Q, M_CU));
  // oppose : le zinc (A) se dépose, le cuivre (B) se dissout ; accord : l'inverse
  const s = cablage === "oppose" ? 1 : -1;
  const n = zn > 0 ? electrons(zn) : 0;
  return {
    Q,
    masseZinc: s * zn,
    masseCuivre: -s * cu,
    electrons: n,
    faraday: n > 0 ? faradayMesure(Q, n) : 0,
    sens: sens(cablage),
    tempsReel: dureeS * pp,
  };
}

/** La durée d'ÉCRAN d'une course (s) : Δt/900. */
export const dureeEcran = (dureeS: number) => dureeS / ACCELERE;

// ── L'écriture des nombres ────────────────────────────────────────────────

/** Le séparateur des milliers : l'espace fine insécable (1 080 · 2 160). */
const FINE = " ";

/** « 0,183 » — `d` décimales, virgule, signe moins typographique. */
export const nombre = (x: number, d: number) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");

/** Un entier avec ses milliers séparés : 1 080 · 5 400. */
export const entier = (x: number) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, FINE);

/** La masse gagnée, signée, au milligramme : « +0,183 » · « −0,178 » · « 0,000 ». */
export const ecrireMasse = (m: number) => (m > 0 ? "+" : "") + nombre(m, 3);

/** La charge : trois chiffres significatifs, tous nos Q sont entiers (180 … 2 160). */
export const ecrireCharge = (Q: number) => entier(chiffres(Q, 3));

/** « 1,119·10⁻² » en LaTeX : mantisse à `n` chiffres, virgule protégée. */
export function scientifique(x: number, n: number): string {
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)) + 1e-12);
  const m = x / 10 ** e;
  return `${m.toFixed(n - 1).replace(".", "{,}")}\\times10^{${e}}`;
}

/** Une durée réelle : « 30 min » · « 45 min » · « 1 h 30 » (pendant la course : « 1 h 07 »). */
export function ecrireDuree(s: number): string {
  const min = Math.floor(s / 60 + 1e-9);
  if (min < 60) return `${min}${" "}min`;
  return `1${" "}h${" "}${String(min - 60).padStart(2, "0")}`;
}

/** L'intensité, trois chiffres : « 0,200 A ». */
export const ecrireIntensite = (iMa: number) => `${nombre(iMa / 1000, 3)}${" "}A`;

/** La tension, une décimale : « 6,0 V ». */
export const ecrireTension = (u: number) => `${nombre(u, 1)}${" "}V`;

/** Le sens, en mots (spec §5.9) : la chaîne exacte que la porte lit. */
export const ECRIRE_SENS: Record<Sens, string> = {
  impose: "sens imposé",
  spontane: "sens spontané (le générateur accompagne)",
};
