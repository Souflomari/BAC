/**
 * fdtd.ts — le calcul de la cuve à ondes (pc/ondes-mecaniques-periodiques,
 * R5 ; spec content/pc/ondes-mecaniques-periodiques/spec-scene-cuve.md §5, §10).
 *
 * L'équation d'onde à deux dimensions, en différences finies explicites, sur
 * une grille de 0,5 mm. C'est la machine qui calcule pour DESSINER : l'élève ne
 * voit ni l'équation, ni le schéma (spec §1, §9.5). Aucun affichage ici — des
 * tableaux, des pas de temps, et des MESURES faites sur le champ.
 *
 * Choix, et pourquoi :
 *  - 0,5 mm : toutes les ouvertures (pas de 0,25 cm) et toutes les longueurs
 *    d'onde (0,50 · 1,0 · 2,0 · 4,0 cm) font un nombre ENTIER de cellules ; au
 *    cran le plus fin, 10 cellules par longueur d'onde, l'erreur de célérité du
 *    schéma est de l'ordre de 1 % — d'où les deux chiffres significatifs des
 *    lectures mesurées (spec §5.4, §10.3).
 *  - Courant 0,5 : stable (la limite à deux dimensions est 1/√2).
 *  - la règle vibrante est une source DOUCE (ajoutée au champ, pas imposée) :
 *    l'onde réfléchie par la paroi la traverse et meurt dans la bande de gauche,
 *    au lieu de rebondir et de faire de la cuve une caisse de résonance.
 *  - bandes absorbantes (amortissement quadratique) : les berges inclinées
 *    d'une vraie cuve, pour la même raison (spec §10.2). QUATRE centimètres, pas
 *    deux : une éponge plus mince que la longueur d'onde la renvoie en partie.
 *    Avec 2 cm, à 5 Hz (λ = 4 cm), le reflet des bandes haute et basse
 *    interférait sur l'arc, et le signal à 60° d'une fente de 0,50 cm y valait
 *    77 % à 5 Hz contre 94 % à 10 Hz — une fente PLUS étroite devant λ qui
 *    étalait MOINS, l'inverse du chapitre (vu par la porte, 2026-09-24). Avec
 *    4 cm : 93 et 95 % (sur le solveur seul, de 0° à 60°, 97 à 100 %) — le
 *    profil presque plat que veut une source étroite dans une paroi rigide. Une condition de Mur au
 *    bord extérieur n'y changeait rien : le reflet venait de l'éponge même.
 *  - une boucle intérieure SANS amortissement ni test : les bandes sont
 *    parcourues à part, avec des coefficients précalculés (pas de division par
 *    cellule) — depuis que les bandes font la moitié de la grille, c'est là que
 *    passe le temps. Float64Array : des Float32Array ont été essayés (moitié
 *    moins de mémoire à parcourir) et mesurés PLUS lents, 2,45 contre 2,1 ms
 *    par pas sur la grille pleine — V8 convertit chaque lecture en double.
 */
export const DX = 0.0005; // m
export const C = 0.2; // m/s
export const COURANT = 0.5;
export const DT = (COURANT * DX) / C; // 1,25 ms
export const BANDE = 0.04; // m — bandes absorbantes, les quatre côtés (voir plus haut)
/** la cuve UTILE, bandes non comprises (spec §5.1) */
export const LARGEUR = 0.24;
export const HAUTEUR = 0.16;
export const X_REGLE = BANDE; // la règle, au bord intérieur de la bande gauche
export const X_PAROI = X_REGLE + 0.09; // 9,0 cm après la règle
export const EP_PAROI = 0.002;

export const NX = Math.round((LARGEUR + 2 * BANDE) / DX); // 640
export const NY = Math.round((HAUTEUR + 2 * BANDE) / DX); // 480
export const NB = Math.round(BANDE / DX); // 80
export const IX_REGLE = NB;
export const IX_PAROI = Math.round(X_PAROI / DX);
export const NP = Math.round(EP_PAROI / DX);
export const IY_CENTRE = NY / 2;
const K = COURANT * COURANT;

export interface Champ {
  u0: Float64Array;
  u1: Float64Array;
  u2: Float64Array;
  /** 1 dans la paroi */
  paroi: Uint8Array;
  /** les cellules de paroi au contact de l'eau, et la cellule d'eau qu'elles recopient */
  miroirs: Int32Array;
  /** dans les bandes : u2 = ca·u1 − cb·u0 + ck·laplacien (1, 1, K hors des bandes) */
  ca: Float64Array;
  cb: Float64Array;
  ck: Float64Array;
  /** pas effectués */
  n: number;
  /** l'abscisse (cellules) au-delà de laquelle le champ est encore exactement nul */
  front: number;
  aCellules: number;
}

/** La cuve au repos, UNE ouverture de `aCellules` cellules, centrée sur l'axe. */
export function creerChamp(aCellules: number): Champ {
  const N = NX * NY;
  const paroi = new Uint8Array(N);
  const ca = new Float64Array(N).fill(2), cb = new Float64Array(N).fill(1), ck = new Float64Array(N).fill(K);
  const bas = IY_CENTRE - aCellules / 2;
  const haut = IY_CENTRE + aCellules / 2;
  for (let y = 0; y < NY; y++)
    for (let x = IX_PAROI; x < IX_PAROI + NP; x++) if (y < bas || y >= haut) paroi[y * NX + x] = 1;
  // Une paroi RIGIDE : l'eau ne la traverse pas, la pente de la surface y est
  // nulle (condition de Neumann). Chaque cellule de paroi au contact de l'eau
  // recopie sa voisine d'eau, face par face — une « cellule miroir ». (Une
  // hauteur imposée nulle serait une autre paroi : elle ferait rayonner une
  // fente étroite en cos θ, et placerait des nœuds contre la paroi.)
  const miroirs: number[] = [];
  for (let y = 1; y < NY - 1; y++)
    for (let x = IX_PAROI; x < IX_PAROI + NP; x++) {
      const i = y * NX + x;
      if (!paroi[i]) continue;
      const voisins = [i - 1, i + 1, i - NX, i + NX].filter((j) => !paroi[j]);
      // la voisine d'eau dans la direction normale à la face
      if (voisins.length) miroirs.push(i, voisins[0]);
    }
  for (let y = 0; y < NY; y++)
    for (let x = 0; x < NX; x++) {
      const d = Math.min(x, NX - 1 - x, y, NY - 1 - y);
      if (d >= NB) continue;
      // amortissement quadratique, écrit sous forme de trois coefficients
      const s = 0.3 * ((NB - d) / NB) ** 2;
      const i = y * NX + x;
      ca[i] = 2 / (1 + s);
      cb[i] = (1 - s) / (1 + s);
      ck[i] = K / (1 + s);
    }
  return { u0: new Float64Array(N), u1: new Float64Array(N), u2: new Float64Array(N), paroi, miroirs: Int32Array.from(miroirs), ca, cb, ck, n: 0, front: IX_REGLE + 2, aCellules };
}

/**
 * Le gain de la règle, par cran : une source douce rayonne d'autant plus fort
 * que l'onde est longue (l'amplitude libre mesurée valait 0,91 · 1,83 · 3,93 ·
 * 9,19 à 40 · 20 · 10 · 5 Hz). MESURÉ — une onde plane libre, sans paroi,
 * d'amplitude 1 à chaque cran — pour que l'image et les pourcentages parlent
 * la même langue d'une fréquence à l'autre.
 */
const GAIN_SOURCE: Record<number, number> = { 40: 1.0957, 20: 0.5457, 10: 0.2544, 5: 0.1088 };

/** Le battement de la règle : une montée douce sur deux périodes évite le choc. */
export function source(f: number, t: number): number {
  const rampe = Math.min(1, (t * f) / 2);
  return (GAIN_SOURCE[f] ?? 1) * Math.sin(2 * Math.PI * f * t) * rampe * rampe;
}

/** Avance le champ d'UN pas, la règle battant à `f` Hz. */
export function pas(ch: Champ, f: number) {
  const { u0, u1, u2, ca, cb, ck, paroi, miroirs } = ch;
  // les miroirs d'abord : la paroi présente à l'eau la hauteur de l'eau
  for (let k = 0; k < miroirs.length; k += 2) u1[miroirs[k]] = u1[miroirs[k + 1]];
  // Au-delà du front, tout est encore nul : la frontière avance d'une cellule
  // par pas au plus (le domaine de dépendance du schéma).
  const xMax = Math.min(NX - 1, ch.front + 1);
  const xInt1 = Math.min(NX - NB, xMax);
  const bande = (ligne: number, xa: number, xb: number) => {
    for (let i = ligne + xa, fin = ligne + xb; i < fin; i++)
      u2[i] = ca[i] * u1[i] - cb[i] * u0[i] + ck[i] * (u1[i - 1] + u1[i + 1] + u1[i - NX] + u1[i + NX] - 4 * u1[i]);
  };
  for (let y = 1; y < NY - 1; y++) {
    const ligne = y * NX;
    if (y < NB || y >= NY - NB) {
      bande(ligne, 1, xMax);
      continue;
    }
    bande(ligne, 1, Math.min(NB, xMax));
    for (let i = ligne + NB, fin = ligne + xInt1; i < fin; i++)
      u2[i] = 2 * u1[i] - u0[i] + K * (u1[i - 1] + u1[i + 1] + u1[i - NX] + u1[i + NX] - 4 * u1[i]);
    if (xMax > NX - NB) bande(ligne, NX - NB, xMax);
  }
  // l'intérieur de la paroi ne porte pas d'onde (ses faces sont des miroirs)
  for (let y = 0; y < NY; y++) for (let x = IX_PAROI; x < IX_PAROI + NP; x++) if (paroi[y * NX + x]) u2[y * NX + x] = 0;
  // la source DOUCE, sur toute la hauteur utile
  const s = source(f, ch.n * DT) * K;
  for (let y = NB; y < NY - NB; y++) u2[y * NX + IX_REGLE] += s;
  ch.u0 = u1;
  ch.u1 = u2;
  ch.u2 = u0;
  ch.n++;
  ch.front = Math.min(NX - 1, ch.front + 1);
}

export const temps = (ch: Champ) => ch.n * DT;
/** La hauteur au point (x, y) en mètres, repère de la grille (0 = coin haut gauche, bandes comprises). */
export const hauteur = (ch: Champ, x: number, y: number) => ch.u1[Math.round(y / DX) * NX + Math.round(x / DX)];
