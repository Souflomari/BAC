/**
 * cuve-rendu.ts — la cuve à ondes, DESSINÉE en Canvas 2D (spec §6, « la langue
 * visuelle »). Aucune 3D, aucun WebGL, aucun three.js : `window.__THREE__`
 * reste indéfini panneau ouvert, et la porte le vérifie (spec §9.10).
 *
 * Le champ est à l'ENCRE : crête vers `--figure-ink`, creux vers une encre
 * douce plus légère, eau au repos = le fond de la figure. L'exposition est
 * déclarée (fit_caveat) : par côté de la paroi, et avec deux plafonds — le
 * contraste d'ÉTUDE, à l'arrêt, et un contraste SANS ÉCLAIRS pendant qu'une
 * onde rapide défile (voir `PLAFONDS`). C'est une image ; les LECTURES
 * restent calculées sur le champ.
 * L'énoncé (la règle, la paroi, le crochet de a, la règle de λ, les
 * instruments vides) est à l'encre ; l'accent ne marque que ce qui répond, et
 * seulement après le pari.
 */
import * as F from "./fdtd";
import { R_ARC, ANGLES } from "./cuve";
import { lireJetons, melange, type RGB } from "../jetons-figure";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface EtatRenduCuve {
  champ: F.Champ | null;
  aCm: number;
  lambdaCm: number;
  /** l'instrument de l'étape : aucun, le flotteur sur l'axe, le récepteur sur l'arc */
  chemin: "aucun" | "axe" | "arc";
  sondeCm: number;
  recepteurDeg: number;
  /** ce qui répond (accent) — après le pari seulement */
  engage: boolean;
  /** les limites de l'ombre géométrique (accent) */
  ombre: boolean;
  /** les deux règles de λ MESURÉE, devant et derrière (cm, positions des crêtes sur l'axe, 0 = paroi) */
  reglesMesurees: { devant: [number, number]; derriere: [number, number] } | null;
  /** le profil sur l'arc : un point par angle VISITÉ, en % (0–100) */
  profil: { angle: number; amplitude: number }[];
  /** des rides RAPIDES défilent (plus de trois inversions par seconde en un point) : l'eau est dessinée pâle */
  pale: boolean;
}

export interface RenduCuve {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduCuve): void;
  /** les repères, en pixels CSS du canvas */
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
}

/**
 * L'EXPOSITION, déclarée (fit_caveat du descripteur). De chaque côté de la
 * paroi, l'image est à l'échelle de la ride la plus forte de CE côté depuis le
 * début de la course (le plus sombre = le plus fort), puis une courbe douce
 * (γ = 0,8) garde lisibles les rides moyennes.
 *
 * Pourquoi pas une échelle unique. La première version montrait tout à la même
 * échelle, en racine (γ = 0,55), pour que l'onde qu'une fente ÉTROITE laisse
 * passer (≈ 0,1 à 0,2 de l'onde incidente) reste visible. Les captures ont
 * montré le prix : derrière une ouverture de 8λ, l'ombre — 0,01 à 0,1 de
 * l'onde, mesurés sur le champ — était peinte à 28 % d'encre, pleine d'arcs,
 * pendant que le retour du pari disait « l'eau n'a presque pas bougé ». Une
 * image qui contredit la phrase qu'elle illustre. L'échelle par côté montre la
 * FORME de l'onde qui passe (ce que le chapitre enseigne) ; elle tait son
 * ÉNERGIE (une fente étroite en laisse passer peu), et le `fit_caveat` le dit.
 */
const GAMMA = 0.8;
/** en deçà, une ride n'est pas « la plus forte » : rien n'est encore arrivé */
const PLANCHER_EXPOSITION = 0.08;

/**
 * LES PLAFONDS D'ENCRE (revue « calme » et « visuel » de la vague 2,
 * 2026-09-24). Part de l'encre qu'une crête (ou un creux) atteint au plus.
 *
 *  - DERRIÈRE la paroi plus que DEVANT : l'idée du chapitre est derrière ;
 *    devant, l'onde incidente et son reflet forment une grille stationnaire qui
 *    ne dit rien et attirait l'œil la première.
 *  - Sous l'encre des INSTRUMENTS (paroi, crochets, règles : encre pleine) :
 *    l'eau et l'énoncé étaient presque de la même valeur, sans figure ni fond.
 *  - Plus bas en thème SOMBRE : des crêtes presque blanches sur presque noir
 *    faisaient de la cuve une grille lumineuse (halo, astigmatisme — DESIGN-
 *    BIBLE §2).
 */
const PLAFONDS = {
  clair: { aval: { crete: 0.62, creux: 0.34 }, amont: { crete: 0.32, creux: 0.18 } },
  sombre: { aval: { crete: 0.5, creux: 0.28 }, amont: { crete: 0.26, creux: 0.14 } },
};
/** la durée du passage du pâle au contraste d'étude, quand l'onde s'arrête */
const FONDU_MS = 450;

/** Luminance relative (WCAG) d'une couleur sRGB 0–255. */
function luminance(c: RGB): number {
  const lin = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
}

/**
 * Le plus fort mélange vers `ext`, au plus `max`, qui ne fasse pas d'ÉCLAIR au
 * sens du WCAG 2.3.1 : une paire de variations opposées de luminance relative
 * d'au moins 0,10, l'image la plus sombre sous 0,80. Sur fond clair, on garde
 * chaque couleur au-dessus de 0,80 ; sur fond sombre, à moins de 0,08 du fond.
 *
 * POURQUOI (revue ergonomie, 2026-09-24). Au ralenti ×5, une onde de 40 Hz
 * inverse chaque point de l'eau huit fois par seconde, et la grille couvre
 * bien plus du quart d'un champ visuel de 10° : exactement le motif de rayures
 * que le critère 2.3.1 (niveau A) nomme. La porte le mesure (`eclairs`).
 */
function plafondSansEclair(surface: RGB, ext: RGB, max: number): number {
  const ls = luminance(surface);
  const sur = (c: number) => {
    const l = luminance(melange(surface, ext, c));
    return ls >= 0.8 ? l >= 0.8 : Math.abs(l - ls) <= 0.08;
  };
  if (sur(max)) return max;
  let bas = 0, haut = max;
  for (let k = 0; k < 20; k++) {
    const m = (bas + haut) / 2;
    if (sur(m)) bas = m;
    else haut = m;
  }
  return bas;
}

export function creerRenduCuve(canvas: HTMLCanvasElement, hote: HTMLElement): RenduCuve {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  // Le champ, une cellule par pixel, sur la cuve UTILE (bandes exclues).
  const LX = F.NX - 2 * F.NB, LY = F.NY - 2 * F.NB;
  const hors = document.createElement("canvas");
  hors.width = LX;
  hors.height = LY;
  const hctx = hors.getContext("2d");
  if (!hctx) throw new Error("canvas 2d indisponible");
  const image = hctx.createImageData(LX, LY);

  let jetons = lireJetons(hote);
  // deux tables, du fond (0) à l'encre pleine (1) ; les plafonds choisissent où s'arrêter
  let lutCrete: RGB[] = [];
  let lutCreux: RGB[] = [];
  const PALIERS = 512;
  type Plafonds = { aval: { crete: number; creux: number }; amont: { crete: number; creux: number } };
  let etude: Plafonds = PLAFONDS.clair;
  let pales: Plafonds = PLAFONDS.clair;
  function relireCouleurs() {
    jetons = lireJetons(hote);
    lutCrete = Array.from({ length: PALIERS }, (_, k) => melange(jetons.surface, jetons.encre, k / (PALIERS - 1)));
    lutCreux = Array.from({ length: PALIERS }, (_, k) => melange(jetons.surface, jetons.encreDouce, k / (PALIERS - 1)));
    etude = luminance(jetons.surface) >= 0.5 ? PLAFONDS.clair : PLAFONDS.sombre;
    const borne = (cote: { crete: number; creux: number }) => ({
      crete: plafondSansEclair(jetons.surface, jetons.encre, cote.crete),
      creux: plafondSansEclair(jetons.surface, jetons.encreDouce, cote.creux),
    });
    pales = { aval: borne(etude.aval), amont: borne(etude.amont) };
  }
  relireCouleurs();
  // 0 = pâle, 1 = contraste d'étude ; un fondu de l'un à l'autre quand l'onde s'arrête
  let contraste = 1;
  let fondu: { debut: number; de: number } | null = null;
  let idFondu = 0;

  let largeur = 480, hauteur = 320, dpr = 1;
  // la cuve utile, placée au centre du canvas, à échelle uniforme
  let echelle = 1, ox = 0, oy = 0;
  function placer() {
    // 0,90 : une marge où la légende se pose sans couper le bord de la cuve
    echelle = Math.min(largeur / LX, hauteur / LY) * 0.9;
    ox = (largeur - LX * echelle) / 2;
    oy = (hauteur - LY * echelle) / 2;
  }
  /** cellule de la grille (bandes comprises) → pixel CSS du canvas */
  const px = (ix: number) => ox + (ix - F.NB) * echelle;
  const py = (iy: number) => oy + (iy - F.NB) * echelle;
  /** cm le long de l'axe (0 = face amont de la paroi) → cellule */
  const cellX = (cm: number) => F.IX_PAROI + (cm / 100) / F.DX;

  let etat: EtatRenduCuve | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];

  // l'exposition de chaque côté : la ride la plus forte depuis le début de CE
  // champ (une course neuve est un champ neuf)
  let champExpose: unknown = null;
  let maxAmont = 0, maxAval = 0;
  /** première colonne (cuve utile) derrière la paroi */
  const XAVAL = F.IX_PAROI + F.NP - F.NB;

  function champ() {
    const d = image.data;
    const ch = etat?.champ;
    if (ch) {
      if (ch !== champExpose) {
        champExpose = ch;
        maxAmont = 0;
        maxAval = 0;
      }
      for (let y = 0; y < LY; y++) {
        const ligne = (y + F.NB) * F.NX + F.NB;
        for (let x = 0; x < LX; x++) {
          const v = Math.abs(ch.u1[ligne + x]);
          if (x < XAVAL) {
            if (v > maxAmont) maxAmont = v;
          } else if (v > maxAval) maxAval = v;
        }
      }
    }
    const gAmont = 1 / Math.max(PLANCHER_EXPOSITION, maxAmont);
    const gAval = 1 / Math.max(PLANCHER_EXPOSITION, maxAval);
    const mix = (a: number, b: number) => a + (b - a) * contraste;
    const P = PALIERS - 1;
    const kAmontCrete = mix(pales.amont.crete, etude.amont.crete) * P, kAmontCreux = mix(pales.amont.creux, etude.amont.creux) * P;
    const kAvalCrete = mix(pales.aval.crete, etude.aval.crete) * P, kAvalCreux = mix(pales.aval.creux, etude.aval.creux) * P;
    for (let y = 0; y < LY; y++)
      for (let x = 0; x < LX; x++) {
        const k = (y * LX + x) * 4;
        let rgb: RGB = jetons.surface;
        if (ch) {
          const i = (y + F.NB) * F.NX + x + F.NB;
          const amont = x < XAVAL;
          const v = ch.u1[i] * (amont ? gAmont : gAval);
          const t = Math.pow(Math.min(1, Math.abs(v)), GAMMA);
          rgb = v >= 0
            ? lutCrete[Math.round(t * (amont ? kAmontCrete : kAvalCrete))]
            : lutCreux[Math.round(t * (amont ? kAmontCreux : kAvalCreux))];
        }
        d[k] = rgb[0];
        d[k + 1] = rgb[1];
        d[k + 2] = rgb[2];
        d[k + 3] = 255;
      }
    hctx!.putImageData(image, 0, 0);
  }

  const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  function rendre() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = css(jetons.surface);
    c.fillRect(0, 0, largeur, hauteur);
    champ();
    c.imageSmoothingEnabled = true;
    c.imageSmoothingQuality = "high";
    c.drawImage(hors, ox, oy, LX * echelle, LY * echelle);
    // le bord de la cuve utile
    c.strokeStyle = css(jetons.encreDouce, 0.5);
    c.lineWidth = 1;
    c.strokeRect(ox, oy, LX * echelle, LY * echelle);
    rep = {};
    segs = [];
    if (!etat) return;
    const e = etat;
    const encre = css(jetons.encre), accent = css(jetons.accent), fond = css(jetons.surface);
    // un trait d'instrument se pose sur l'eau avec un liseré de fond dessous :
    // sans lui, l'accent se perdait dans les rides (revue visuelle, vague 2)
    const liseré = (trace: () => void, largeurTrait: number) => {
      c.save();
      c.strokeStyle = fond;
      c.lineWidth = largeurTrait + 3;
      trace();
      c.stroke();
      c.restore();
      trace();
      c.stroke();
    };
    const yc = F.IY_CENTRE;
    const aCel = (e.aCm / 100) / F.DX;
    const haut = yc - aCel / 2, bas = yc + aCel / 2;

    // ── la règle vibrante (encre DOUCE : la source ne doit pas se lire comme la paroi) ──
    c.fillStyle = css(jetons.encreDouce);
    c.fillRect(px(F.IX_REGLE) - 3, py(F.NB + 6), 4, py(F.NY - F.NB - 6) - py(F.NB + 6));
    rep["regle"] = { x: px(F.IX_REGLE), y: py(yc), visible: true };

    // ── la paroi, une seule ouverture (encre) ──
    const x0 = px(F.IX_PAROI), x1 = px(F.IX_PAROI + F.NP);
    c.fillRect(x0, py(F.NB), Math.max(2, x1 - x0), py(haut) - py(F.NB));
    c.fillRect(x0, py(bas), Math.max(2, x1 - x0), py(F.NY - F.NB) - py(bas));
    rep["ouverture-haut"] = { x: x0, y: py(haut), visible: true };
    rep["ouverture-bas"] = { x: x0, y: py(bas), visible: true };

    // ── l'énoncé : le crochet de a et la règle de λ, côte à côte, même échelle ──
    const xa = x0 - 10, xl = x0 - 24;
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    const trait = (xx: number, ya: number, yb: number) => {
      c.beginPath();
      c.moveTo(xx, ya);
      c.lineTo(xx, yb);
      c.moveTo(xx - 4, ya);
      c.lineTo(xx + 4, ya);
      c.moveTo(xx - 4, yb);
      c.lineTo(xx + 4, yb);
      c.stroke();
    };
    trait(xa, py(haut), py(bas));
    rep["a-debut"] = { x: xa, y: py(haut), visible: true };
    rep["a-fin"] = { x: xa, y: py(bas), visible: true };
    const lCel = (e.lambdaCm / 100) / F.DX;
    const yl0 = py(bas) - lCel * echelle;
    trait(xl, yl0, py(bas));
    rep["lambda-debut"] = { x: xl, y: yl0, visible: true };
    rep["lambda-fin"] = { x: xl, y: py(bas), visible: true };
    rep["etiquette-a"] = { x: xa, y: (py(haut) + py(bas)) / 2, visible: true };
    rep["etiquette-lambda"] = { x: xl, y: (yl0 + py(bas)) / 2, visible: true };
    segs.push([rep["a-debut"], rep["a-fin"]], [rep["lambda-debut"], rep["lambda-fin"]]);

    // ── ce qui répond : les limites de l'ombre géométrique (accent, pointillé) ──
    if (e.engage && e.ombre) {
      c.strokeStyle = accent;
      c.lineWidth = 1.2;
      c.setLineDash([6, 5]);
      for (const yy of [haut, bas])
        liseré(() => {
          c.beginPath();
          c.moveTo(x1, py(yy));
          c.lineTo(px(F.NX - F.NB), py(yy));
        }, 1.2);
      c.setLineDash([]);
    }

    // ── le flotteur, sur l'axe ──
    if (e.chemin === "axe") {
      const sx = px(cellX(e.sondeCm));
      c.fillStyle = encre;
      c.beginPath();
      c.arc(sx, py(yc), 4, 0, 2 * Math.PI);
      c.fill();
      rep["sonde"] = { x: sx, y: py(yc), visible: true };
      if (e.engage && e.reglesMesurees) {
        c.strokeStyle = accent;
        c.lineWidth = 2;
        for (const [a, b] of [e.reglesMesurees.devant, e.reglesMesurees.derriere]) {
          const ya = py(yc) + 14;
          liseré(() => {
            c.beginPath();
            c.moveTo(px(cellX(a)), ya);
            c.lineTo(px(cellX(b)), ya);
            c.moveTo(px(cellX(a)), ya - 4);
            c.lineTo(px(cellX(a)), ya + 4);
            c.moveTo(px(cellX(b)), ya - 4);
            c.lineTo(px(cellX(b)), ya + 4);
          }, 2);
        }
        rep["regle-devant"] = { x: (px(cellX(e.reglesMesurees.devant[0])) + px(cellX(e.reglesMesurees.devant[1]))) / 2, y: py(yc) + 14, visible: true };
        rep["regle-derriere"] = { x: (px(cellX(e.reglesMesurees.derriere[0])) + px(cellX(e.reglesMesurees.derriere[1]))) / 2, y: py(yc) + 14, visible: true };
      }
    }

    // ── l'arc et le récepteur ──
    if (e.chemin === "arc") {
      const cx = x1, cy = py(yc), R = (R_ARC / F.DX) * echelle;
      c.strokeStyle = css(jetons.encreDouce);
      c.lineWidth = 1;
      liseré(() => {
        c.beginPath();
        c.arc(cx, cy, R, -Math.PI / 3, Math.PI / 3);
      }, 1);
      rep["arc-centre"] = { x: cx, y: cy, visible: true };
      const pos = (deg: number, r: number) => ({ x: cx + r * Math.cos((deg * Math.PI) / 180), y: cy - r * Math.sin((deg * Math.PI) / 180) });
      // Le profil : un POINT par angle visité, porté vers l'extérieur de l'arc.
      // Pas de ligne entre les points : elle affirmait une continuité que la
      // mesure n'a pas, et ses zigzags de champ proche se lisaient comme du
      // bruit plutôt que « un pic, puis une chute » (revue calme, vague 2).
      if (e.engage && e.profil.length) {
        const h = Math.min(largeur, hauteur) * 0.16;
        for (const p of e.profil) {
          const q = pos(p.angle, R + (h * p.amplitude) / 100);
          c.fillStyle = fond;
          c.beginPath();
          c.arc(q.x, q.y, 4, 0, 2 * Math.PI);
          c.fill();
          c.fillStyle = accent;
          c.beginPath();
          c.arc(q.x, q.y, 2.6, 0, 2 * Math.PI);
          c.fill();
        }
      }
      const r = pos(e.recepteurDeg, R);
      c.fillStyle = encre;
      c.beginPath();
      c.arc(r.x, r.y, 5, 0, 2 * Math.PI);
      c.fill();
      rep["recepteur"] = { x: r.x, y: r.y, visible: true };
      for (const a of [ANGLES[0], 0, ANGLES[ANGLES.length - 1]]) rep[`arc-${a}`] = { ...pos(a, R), visible: true };
    }
  }

  return {
    redimensionner(l, h) {
      largeur = Math.max(1, Math.round(l));
      hauteur = Math.max(1, Math.round(h));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(largeur * dpr);
      canvas.height = Math.round(hauteur * dpr);
      placer();
    },
    relireCouleurs,
    rendre,
    detruire() {
      etat = null;
      cancelAnimationFrame(idFondu);
    },
    mettreAJour(e) {
      const avant = etat?.pale;
      etat = e;
      if (e.pale) {
        // l'onde rapide repart : pâle tout de suite (une seule variation)
        cancelAnimationFrame(idFondu);
        fondu = null;
        contraste = 0;
      } else if (avant && contraste < 1 && !fondu) {
        // l'onde s'arrête : le contraste d'étude revient en fondu
        fondu = { debut: performance.now(), de: contraste };
        const pas = () => {
          if (!fondu || !etat) return;
          const k = Math.min(1, (performance.now() - fondu.debut) / FONDU_MS);
          contraste = fondu.de + (1 - fondu.de) * k;
          rendre();
          if (k < 1) idFondu = requestAnimationFrame(pas);
          else fondu = null;
        };
        idFondu = requestAnimationFrame(pas);
      } else if (avant === undefined) contraste = e.pale ? 0 : 1;
    },
    reperes: () => rep,
    cadre: () => ({ largeur, hauteur }),
    segments: () => segs,
  };
}
