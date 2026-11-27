/**
 * cuve.ts — la cuve à ondes : ses réglages, sa course, et ce qu'on y MESURE
 * (spec content/pc/ondes-mecaniques-periodiques/spec-scene-cuve.md §5, §6).
 *
 * Tout ce qui s'affiche en nombre vient d'ici. Deux familles de nombres :
 *  - l'ÉNONCÉ, analytique : a, f, λ = c/f, le rapport a/λ ;
 *  - les MESURES, lues sur le champ calculé : λ devant et derrière la paroi
 *    (écart entre crêtes), la fréquence au flotteur (comptage de crêtes),
 *    l'amplitude sur l'arc. Une mesure n'est JAMAIS une copie du réglage : la
 *    porte vérifie qu'elle en diffère d'une quantité non nulle (spec §11.2,
 *    `mesure-pas-echo`).
 */
import * as F from "./fdtd";

export const FREQUENCES = [40, 20, 10, 5] as const;
export type Frequence = (typeof FREQUENCES)[number];
export const A_MIN = 0.5, A_MAX = 4.0, A_PAS = 0.25; // cm
export const SONDE_MIN = -6.0, SONDE_MAX = 14.0, SONDE_PAS = 0.25; // cm, 0 = la paroi
export const RECEPTEUR_MAX = 60, RECEPTEUR_PAS = 5; // °
export const R_ARC = 0.07; // m
export const ANGLES = Array.from({ length: (2 * RECEPTEUR_MAX) / RECEPTEUR_PAS + 1 }, (_, k) => -RECEPTEUR_MAX + k * RECEPTEUR_PAS);

/**
 * La course, en temps de CUVE (s) : le front atteint l'arc vers 0,8 s ; à
 * 5 Hz, l'eau la plus lointaine n'est établie qu'après 1,5 s. 2,0 s laisse une
 * fenêtre de mesure où le motif ne bouge plus.
 */
export const DUREE = 2.0;
/** La phase de référence de l'étape 2 (40 Hz), plus courte : c'est un rappel. */
export const DUREE_REFERENCE = 1.2;
/**
 * Le RALENTI, déclaré : une seconde à l'écran montre 0,20 s de cuve. À 40 Hz,
 * le temps réel ferait 40 rides par seconde sur un écran qui en affiche 60
 * images : l'œil ne verrait qu'un brouillage. Le même ralenti pour les quatre
 * fréquences — sinon l'écran montrerait les rides lentes plus rapides que les
 * autres, alors que la célérité est la même.
 */
export const RALENTI = 0.2;

export const lambda = (f: number) => (F.C / f) * 100; // cm
export const cellules = (cm: number) => (cm / 100) / F.DX;
export const surGrilleA = (a: number) => Math.round(a / A_PAS) * A_PAS;

/** « 4,00 » — virgule décimale, `d` décimales. */
export const nombre = (x: number, d: number) => x.toFixed(d).replace(".", ",").replace("-", "−");
/** Deux chiffres significatifs, virgule décimale : 0,50 · 1,0 · 2,0 · 4,0 · 20. */
export function deuxCS(x: number): string {
  if (!Number.isFinite(x) || x === 0) return nombre(x, 1);
  // les décimales se comptent sur la valeur ARRONDIE : 9,98 donne « 10 », pas « 10,0 »
  const v = Number(x.toPrecision(2));
  const d = Math.max(0, 1 - Math.floor(Math.log10(Math.abs(v))));
  return nombre(v, d);
}
export const cm = (x: number) => `${nombre(x, 2)} cm`;

/** La comparaison, en mots de longueurs : « a = 8λ », « a = λ/4 », « a = λ ». */
export function comparaison(aCm: number, f: number): string {
  const r = aCm / lambda(f);
  const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
  if (Math.abs(r - 1) < 1e-9) return "a = λ";
  if (r > 1) return entier(r) ? `a = ${Math.round(r)}λ` : `a = ${deuxCS(r)}λ`;
  const inv = 1 / r;
  return entier(inv) ? `a = λ/${Math.round(inv)}` : `a = ${deuxCS(r)}λ`;
}

/** Ce que la course a enregistré, et que les lectures relisent. */
export interface Releve {
  f: number;
  aCm: number;
  /** enveloppe (max |u| sur la dernière fenêtre) aux points de l'arc, dans l'ordre d'ANGLES */
  arc: number[];
  /** enveloppe le long de l'axe, une valeur par cellule, x de IX_REGLE à NX - NB */
  axe: Float64Array;
  /** les hauteurs le long de l'axe, pendant la dernière fenêtre : [pas][cellule] */
  serie: Float64Array;
  nSerie: number;
  /** le champ final le long de l'axe (pour l'écart entre crêtes) */
  profilFinal: Float64Array;
  /** l'amplitude incidente (enveloppe devant la paroi, loin d'elle) */
  incidente: number;
  /** max |u| dans les bandes, rapporté à l'incidente, en fin de course */
  reflexion: number;
}

const X0_AXE = F.IX_REGLE;
const X1_AXE = F.NX - F.NB;
const N_AXE = X1_AXE - X0_AXE;

/** Une course complète : un champ neuf, `duree` s de cuve à `f` Hz, et le relevé. */
export class Course {
  ch: F.Champ;
  readonly f: number;
  readonly aCm: number;
  readonly duree: number;
  private fenetre: number; // pas
  private arc: number[];
  private axe: Float64Array;
  private serie: Float64Array;
  private nSerie = 0;
  private iArc: number[];

  constructor(aCm: number, f: number, duree = DUREE) {
    this.aCm = aCm;
    this.f = f;
    this.duree = duree;
    this.ch = F.creerChamp(Math.round(cellules(aCm)));
    // la fenêtre de mesure : les 0,8 dernières secondes de cuve (quatre
    // périodes au cran le plus lent, trente-deux au plus rapide)
    this.fenetre = Math.round(0.8 / F.DT);
    this.arc = ANGLES.map(() => 0);
    this.axe = new Float64Array(N_AXE);
    this.serie = new Float64Array(this.fenetre * N_AXE);
    const xc = F.IX_PAROI + F.NP, yc = F.IY_CENTRE;
    this.iArc = ANGLES.map((a) => {
      const r = (a * Math.PI) / 180;
      return Math.round(yc - (R_ARC / F.DX) * Math.sin(r)) * F.NX + Math.round(xc + (R_ARC / F.DX) * Math.cos(r));
    });
  }

  get nPas() {
    return Math.round(this.duree / F.DT);
  }
  get t() {
    return F.temps(this.ch);
  }
  /**
   * L'IMAGE ARRÊTÉE. Devant la paroi, l'eau porte une onde STATIONNAIRE (la
   * paroi renvoie presque tout) : son image passe par zéro deux fois par
   * période. Arrêtée pile à 2,0 s, la cuve à 5 Hz tombait sur un de ces zéros
   * — 1 % de l'énergie de la période, et ce qui restait à l'écran était le
   * résidu, des taches au lieu de rides (captures de l'étape 2, 2026-09-24).
   * La course va donc jusqu'à 2,0 s, PUIS jusqu'au prochain maximum de
   * l'énergie devant la paroi (au plus une demi-période : 0,1 s à 5 Hz). Les
   * MESURES, elles, restent sur leur fenêtre, qui finit à 2,0 s.
   */
  private arretee = false;
  private eAvant = -1;
  private monte = false;
  get finie() {
    return this.arretee;
  }

  /** L'énergie de l'eau devant la paroi, le long de l'axe (loin de la règle et de la paroi). */
  private energieAmont() {
    const u = this.ch.u1;
    const base = F.IY_CENTRE * F.NX;
    let e = 0;
    for (let x = F.IX_REGLE + 20; x < F.IX_PAROI - 4; x++) e += u[base + x] * u[base + x];
    return e;
  }

  /** Avance d'au plus `n` pas (jamais au-delà de l'image arrêtée). */
  avancer(n: number) {
    const fin = this.nPas;
    const limite = fin + Math.round(1 / this.f / F.DT);
    for (let k = 0; k < n && !this.arretee; k++) {
      F.pas(this.ch, this.f);
      if (this.ch.n >= fin) {
        const e = this.energieAmont();
        if (this.eAvant >= 0 && e > this.eAvant) this.monte = true;
        if ((this.monte && e < this.eAvant) || this.ch.n >= limite) this.arretee = true;
        this.eAvant = e;
      }
      if (this.ch.n > fin - this.fenetre && this.ch.n <= fin) {
        const u = this.ch.u1;
        for (let j = 0; j < this.iArc.length; j++) {
          const v = Math.abs(u[this.iArc[j]]);
          if (v > this.arc[j]) this.arc[j] = v;
        }
        const base = F.IY_CENTRE * F.NX + X0_AXE;
        const off = this.nSerie * N_AXE;
        for (let x = 0; x < N_AXE; x++) {
          const v = u[base + x];
          this.serie[off + x] = v;
          if (Math.abs(v) > this.axe[x]) this.axe[x] = Math.abs(v);
        }
        this.nSerie++;
      }
    }
  }

  releve(): Releve {
    const u = this.ch.u1;
    const base = F.IY_CENTRE * F.NX + X0_AXE;
    const profilFinal = Float64Array.from({ length: N_AXE }, (_, x) => u[base + x]);
    // l'incidente : l'enveloppe sur l'axe entre 2 et 5 cm après la règle
    let incidente = 0;
    for (let x = Math.round(0.02 / F.DX); x < Math.round(0.05 / F.DX); x++) incidente = Math.max(incidente, this.axe[x]);
    // Ce qu'il reste de l'onde AU FOND des bandes (leur quart extérieur),
    // derrière la paroi : l'onde diffractée y entre et doit y mourir. Un bord
    // qui la renverrait la garderait entière jusqu'au fond.
    let bord = 0;
    const fond = Math.round(F.NB / 4);
    for (let y = 0; y < F.NY; y++)
      for (let x = F.IX_PAROI + F.NP; x < F.NX; x++) {
        const d = Math.min(F.NX - 1 - x, y, F.NY - 1 - y);
        if (d < fond) bord = Math.max(bord, Math.abs(u[y * F.NX + x]));
      }
    return {
      f: this.f,
      aCm: this.aCm,
      arc: this.arc.slice(),
      axe: this.axe.slice(),
      serie: this.serie,
      nSerie: this.nSerie,
      profilFinal,
      incidente,
      reflexion: incidente > 0 ? bord / incidente : 0,
    };
  }
}

/** L'abscisse (cm, 0 = la paroi) d'une cellule de l'axe relevé, et l'inverse. */
export const xCm = (iAxe: number) => ((X0_AXE + iAxe - F.IX_PAROI) * F.DX) * 100;
export const iAxe = (x: number) => Math.round((x / 100) / F.DX) + F.IX_PAROI - X0_AXE;

/**
 * Le pic d'un spectre de Fourier fenêtré (Hann) de `n` échantillons pris au pas
 * `pas`, cherché entre `lo` et `hi` (en 1/unité du pas), affiné par une
 * parabole. `im` : la partie imaginaire, pour un signal complexe.
 */
function pic(re: (i: number) => number, n: number, pas: number, lo: number, hi: number, im?: (i: number) => number): number {
  const w = (i: number) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1));
  let mr = 0, mi = 0;
  for (let i = 0; i < n; i++) {
    mr += re(i);
    if (im) mi += im(i);
  }
  mr /= n;
  mi /= n;
  const S = (nu: number) => {
    let a = 0, b = 0;
    for (let i = 0; i < n; i++) {
      const x = (re(i) - mr) * w(i), y = im ? (im(i) - mi) * w(i) : 0;
      const t = -2 * Math.PI * nu * i * pas, c = Math.cos(t), s = Math.sin(t);
      a += x * c - y * s;
      b += x * s + y * c;
    }
    return Math.hypot(a, b);
  };
  const N = 300;
  let best = lo, bs = -1;
  for (let k = 0; k <= N; k++) {
    const nu = lo + ((hi - lo) * k) / N;
    const v = S(nu);
    if (v > bs) {
      bs = v;
      best = nu;
    }
  }
  const h = (hi - lo) / N;
  const a = S(best - h), b = S(best), c = S(best + h);
  const den = a - 2 * b + c;
  return best + (den !== 0 ? ((0.5 * (a - c)) / den) * h : 0);
}

/**
 * λ MESURÉE entre deux abscisses de l'axe (cm, 0 = la paroi), sur l'onde qui
 * va VERS LA DROITE seulement. Devant la paroi, l'onde réfléchie se superpose
 * à l'incidente, et une photographie place mal ses crêtes (jusqu'à 5 % d'erreur
 * à 5 Hz). En chaque point de l'axe, la hauteur est ramenée à son amplitude
 * complexe au rythme de la règle ; le spectre SPATIAL de ces amplitudes sépare
 * l'onde qui part de celle qui revient ; λ est lue sur la première, sans rien
 * supposer de sa valeur (recherche de 0,3 à 6 cm). La fréquence de la règle
 * sert à démoduler, jamais de réponse.
 */
export function lambdaMesuree(r: Releve, x0: number, x1: number): number {
  const N_AX = r.axe.length;
  const i0 = Math.max(0, iAxe(x0)), i1 = Math.min(N_AX - 1, iAxe(x1));
  const n = i1 - i0 + 1;
  if (n < 8 || r.nSerie < 8) return NaN;
  const re = new Float64Array(n), im = new Float64Array(n);
  const w = 2 * Math.PI * r.f * F.DT;
  for (let k = 0; k < r.nSerie; k++) {
    const c = Math.cos(w * k), s = Math.sin(w * k);
    for (let i = 0; i < n; i++) {
      const v = r.serie[k * N_AX + i0 + i];
      re[i] += v * c;
      im[i] -= v * s;
    }
  }
  const pasCm = F.DX * 100;
  // l'onde qui part, cos(ωt − kx), démodulée par e^{−iωt}, vaut e^{−ikx}/2 :
  // sa fréquence spatiale est NÉGATIVE — on la cherche là, l'onde qui revient
  // est à la fréquence opposée.
  const nu = pic((i) => re[i], n, pasCm, -1 / 0.3, -1 / 6, (i) => im[i]);
  return -1 / nu;
}

/**
 * La fréquence lue au flotteur posé en `x` (cm) : les passages de la hauteur
 * par zéro en MONTANT, datés par interpolation linéaire, comptés sur la
 * fenêtre. Un passage par zéro ne dépend pas de l'amplitude : une onde qui
 * s'installe encore (son amplitude croît) garde des passages justes, là où un
 * pic de spectre ou une crête se décalent.
 */
export function frequenceSonde(r: Releve, x: number): number {
  const i = iAxe(x);
  const N_AX = r.axe.length;
  const n = r.nSerie;
  if (i < 0 || i >= N_AX || n < 8) return NaN;
  const v = (k: number) => r.serie[k * N_AX + i];
  let m = 0;
  for (let k = 0; k < n; k++) m += v(k);
  m /= n;
  const t: number[] = [];
  for (let k = 1; k < n; k++) {
    const a = v(k - 1) - m, b = v(k) - m;
    if (a < 0 && b >= 0) t.push((k - 1 + a / (a - b)) * F.DT);
  }
  if (t.length < 2) return NaN;
  return (t.length - 1) / (t[t.length - 1] - t[0]);
}

/** L'amplitude au flotteur, en % du maximum de l'enveloppe sur l'axe. */
export function amplitudeSonde(r: Releve, x: number): number {
  const i = iAxe(x);
  let m = 0;
  for (let k = 0; k < r.axe.length; k++) m = Math.max(m, r.axe[k]);
  return m > 0 && i >= 0 && i < r.axe.length ? (100 * r.axe[i]) / m : NaN;
}

/**
 * L'amplitude sur l'arc à `angle` (°), en % du MAXIMUM lu sur l'arc pour CE
 * réglage. Pour une ouverture large, ce maximum est droit devant ; pour une
 * ouverture étroite, l'onde rayonne presque également partout et le maximum
 * peut tomber un peu à côté de 0° (le champ proche d'une cuve finie) — le
 * rapporter à 0° afficherait « 103 % ».
 */
export function amplitudeArc(r: Releve, angle: number): number {
  const j = ANGLES.indexOf(angle);
  const m = Math.max(...r.arc);
  return j >= 0 && m > 0 ? (100 * r.arc[j]) / m : NaN;
}
