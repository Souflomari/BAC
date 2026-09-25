/**
 * diffraction-modele.ts — « le banc de diffraction » : la relation, et rien
 * d'autre (spec content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md §5).
 *
 * UNE SEULE VOIE DE CALCUL, ANALYTIQUE. θ = λ/a (le DEMI-écart angulaire, de
 * l'axe au bord de la tache centrale — cadre, `limites`) ; L/2 = D·θ (petits
 * angles : le plus grand θ de la scène vaut 1,08×10⁻² rad, tan θ s'en écarte de
 * 0,004 %) ; donc L = 2λD/a. La porte refait chaque nombre par sa propre
 * arithmétique, depuis les constantes de la spec, sans importer ce module.
 *
 * LE FIL DIFFRACTE COMME UNE FENTE DE MÊME LARGEUR — et c'est STRUCTUREL ici :
 * une seule fonction, qui ne connaît que la dimension transverse de l'objet
 * (`dimension`). Le cheveu n'est pas un cas recopié (spec §11.1, N9).
 *
 * Le PROFIL de la tache est un choix de RENDU, jamais un contenu (cadre : « pas
 * d'intégrale de diffraction ») : il vit ici pour que ses zéros tombent là où
 * la relation les met, et ne paraît dans aucun texte.
 */

// ── Les constantes : toutes de la leçon, des exercices ou des annales (spec §5.1) ──

/** Les sept fentes, en mm — des PIÈCES, pas un réglage continu. */
export const FENTES = ["0.060", "0.080", "0.100", "0.150", "0.200", "0.300", "1.000"] as const;
export type Fente = (typeof FENTES)[number];

/** Les quatre lasers, en nm (dans l'air). */
export const LASERS = ["450", "532", "600", "650"] as const;
export type Laser = (typeof LASERS)[number];
/** Le nom de la couleur, quand la leçon ou les items le donnent (600 nm n'en a pas). */
export const COULEUR: Record<Laser, string | null> = { "450": "bleu", "532": "vert", "600": null, "650": "rouge" };

/** La distance fente–écran, en m : 17 positions, au pas de 0,10 m. */
export const D_MIN = 0.4, D_MAX = 2.0, D_PAS = 0.1;

export type Objet = "fente" | "cheveu";
/** Le cheveu du sujet national 2021 (`r-bac` q7) : 80 µm. Une constante, sans contrôle. */
export const CHEVEU_MM = 0.08;

/**
 * L'exagération du dessin : les largeurs (en travers du banc) sont dessinées
 * DIX fois plus grandes que les distances (le long du banc). Le même facteur à
 * tous les réglages et à toutes les largeurs d'écran : les rapports dessinés
 * sont vrais, les angles sont dix fois trop ouverts — et c'est écrit (spec §5.3).
 */
export const EXAGERATION = 10;

/** La règle posée sur l'écran : l'axe optique tombe sur sa graduation 10 cm. */
export const REGLE_AXE_CM = 10;
export const REGLE_LONGUEUR_CM = 20;

/** Les cinq points de mesure du graphe L = f(D), en m (spec §5.2). */
export const POINTS_D = [0.4, 0.8, 1.2, 1.6, 2.0] as const;

/** Recale sur la grille d'un contrôle (évite 1,2000000000000002). */
export const surGrille = (x: number, pas: number, min: number) => Math.round((min + Math.round((x - min) / pas) * pas) * 1e6) / 1e6;

// ── La relation ─────────────────────────────────────────────────────────────

/** La dimension transverse de ce qui est sur le trajet, en mm : la fente, ou le cheveu. */
export const dimension = (objet: Objet, a: Fente | number) => (objet === "cheveu" ? CHEVEU_MM : typeof a === "number" ? a : parseFloat(a));

const nm = (l: Laser | number) => (typeof l === "number" ? l : parseFloat(l));

/** θ = λ/a, en radians — le DEMI-écart angulaire. */
export const theta = (lambda: Laser | number, dimMm: number) => (nm(lambda) * 1e-9) / (dimMm * 1e-3);

/** L = 2λD/a, la largeur de la tache centrale, en cm. */
export const largeurTache = (lambda: Laser | number, dimMm: number, D: number) => ((2 * nm(lambda) * 1e-9 * D) / (dimMm * 1e-3)) * 100;

/** Les deux bords de la tache centrale, lus sur la règle, en cm. */
export const bords = (L: number): [number, number] => [REGLE_AXE_CM - L / 2, REGLE_AXE_CM + L / 2];

/** La pente p = L/D, les deux dans la MÊME unité : sans dimension. */
export const pente = (Lcm: number, D: number) => Lcm / (D * 100);

/** λ = p·a/2, en nm. */
export const lambdaDeduite = (p: number, aMm: number) => ((p * aMm * 1e-3) / 2) * 1e9;

/** d = 2λD/L, en µm. */
export const diametreDeduit = (lambda: Laser | number, D: number, Lcm: number) => ((2 * nm(lambda) * 1e-9 * D) / (Lcm / 100)) * 1e6;

/** L/(2D) : l'angle calculé depuis la MESURE, en radians. */
export const thetaMesure = (Lcm: number, D: number) => Lcm / (2 * D * 100);

/** a/λ : « la fente vaut N fois la longueur d'onde ». */
export const rapport = (dimMm: number, lambda: Laser | number) => Math.round((dimMm * 1e-3) / (nm(lambda) * 1e-9));

/**
 * Le profil de RENDU, à la distance x (cm) de l'axe sur l'écran : celui d'une
 * fente simple éclairée par une onde plane, dont les zéros tombent à
 * k·L/2 — ce qui fixe la tache centrale à L. Jamais affiché, nommé ni lu
 * (spec §9.3) : il sert à peindre, et la porte vérifie où tombent ses zéros.
 */
export function profil(x: number, L: number): number {
  const u = (Math.PI * x) / (L / 2);
  if (Math.abs(u) < 1e-9) return 1;
  const s = Math.sin(u) / u;
  return s * s;
}

/**
 * L'éclaircissement DÉCLARÉ (fit_caveat 3) : la première tache voisine vaut ~1/21
 * de la centrale ; peinte telle quelle, elle disparaîtrait. On peint la racine
 * de l'intensité : elle reste visible (≈ 0,21), et l'ordre des taches est gardé.
 */
export const eclaircir = (I: number) => Math.sqrt(Math.max(0, I));

// ── L'écriture des nombres ────────────────────────────────────────────────

const EXPOSANTS: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };

/** « 3,00×10⁻³ » — `cs` chiffres significatifs, virgule décimale. */
export function scientifique(x: number, cs = 3): string {
  if (x === 0) return "0";
  let e = Math.floor(Math.log10(Math.abs(x)));
  let t = (x / Math.pow(10, e)).toFixed(cs - 1);
  if (parseFloat(t) >= 10) {
    e += 1;
    t = (x / Math.pow(10, e)).toFixed(cs - 1);
  }
  return `${t.replace(".", ",")}×10${String(e).split("").map((c) => EXPOSANTS[c] ?? c).join("")}`;
}

/** « 2,00 » — `d` décimales, virgule. */
export const nombre = (x: number, d: number) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");

/** Trois chiffres significatifs, en décimal : 4,00 · 1,20 · 0,800 · 0,240 · 2,13. */
export function troisCs(x: number): string {
  const e = Math.floor(Math.log10(Math.abs(x)));
  let d = Math.max(0, 2 - e);
  // 9,996 s'écrirait « 10,00 » : on recale sur l'exposant arrondi
  if (Math.abs(parseFloat(x.toFixed(d))) >= 10 ** (e + 1)) d = Math.max(0, d - 1);
  return nombre(x, d);
}

/** Un entier, milliers séparés par une espace fine insécable : « 1 667 ». */
export const entier = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** « 0,060 mm » */
export const ecrireFente = (aMm: number) => `${nombre(aMm, 3)} mm`;
/** « 450 nm (bleu) » */
export const ecrireLaser = (l: Laser) => `${l} nm${COULEUR[l] ? ` (${COULEUR[l]})` : ""}`;
