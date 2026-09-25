/**
 * electrolyse-rendu.ts — le rendu Canvas 2D du « banc d'électrolyse »
 * (spec content/pc/electrolyse/spec-scene-electrolyse.md §5.2, §6).
 *
 * LA PAILLASSE DE LA LEÇON, vue de face. En haut, le générateur : un cercle, le
 * symbole de la pile (le trait LONG du côté +), sa borne + à GAUCHE et sa
 * borne − à DROITE. Deux fils descendent ; en `accord`, ils se CROISENT sous le
 * générateur (l'un passe par-dessus l'autre) : c'est ce que veut dire
 * « échanger les fils ». Le fil de gauche porte le rhéostat et descend sur la
 * lame de cuivre (B) ; celui de droite porte l'ampèremètre — à ZÉRO CENTRAL :
 * son aiguille change de côté quand le courant change de sens — et descend sur
 * la lame de zinc (A). Deux béchers, un pont salin, deux balances.
 *
 * UNE SEULE ÉCHELLE DÉCLARÉE, CELLE DU DÉPÔT (spec §6.2). Un dépôt réel de
 * 0,732 g fait 64 µm — 0,2 pixel. L'épaisseur dessinée est EXAGÉRÉE d'un
 * facteur CONSTANT (px par gramme, qui ne dépend que de la largeur du dessin),
 * le même aux 27 états et aux deux lames, et un TÉMOIN (« 1 g ») le montre :
 * deux fois plus de masse, deux fois plus épais. Le reste de la paillasse est
 * un schéma, pas un plan à l'échelle.
 *
 * LA LANGUE VISUELLE (ADR 0041 §4). À l'ENCRE, l'énoncé : la paillasse, les
 * signes + et − (l'énoncé de S1), les instruments et leur zéro. À l'ACCENT, la
 * RÉPONSE, et seulement après l'engagement : à S1 l'aiguille, les flèches du
 * courant et des électrons ; à toutes les étapes, ce que la course dépose ou
 * dissout. Le bain change d'OPACITÉ, jamais de teinte (un seul jeton).
 *
 * TOUT EST PEINT OPAQUE (`voile`) : un trait semi-transparent dont les
 * sous-chemins se croisent est composé deux fois par Chromium (le banc de
 * modulation, ADR 0041 addendum point 6).
 *
 * Les couleurs sont lues dans les jetons (`lib/jetons-figure.ts` — pas
 * `scene3d/palette.ts`, qui importerait three).
 */
import * as M from "./electrolyse-modele";
import { lireJetons, melange, type RGB } from "../jetons-figure";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface EtatRenduElectrolyse {
  cablage: M.Cablage;
  iMa: number;
  dureeS: number;
  /** la fraction de la course (0 : lames neuves ; 1 : la durée réglée est écoulée) */
  p: number;
  /** le circuit est-il FERMÉ ? (aiguille, flèches) — à S1, seulement après l'engagement */
  circuit: boolean;
  /** l'aiguille et les flèches sont-elles la RÉPONSE de l'étape (S1) ? accent ; sinon encre */
  accentCircuit: boolean;
  /** ce que la course dépose ou dissout est-il la réponse ? accent ; sinon encre (l'énoncé) */
  accentDepot: boolean;
  /** le témoin d'épaisseur (à partir de S2 : quand la masse est le sujet) */
  temoin: boolean;
}

export interface RenduElectrolyse {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduElectrolyse): void;
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  zones(): { x0: number; y0: number; x1: number; y1: number }[];
  /** px par gramme du dépôt (la porte le LIT sur le témoin ; ceci ne sert qu'aux étiquettes) */
  echelle(): { pxParG: number };
}

/** La hauteur réservée à la légende du plateau. */
export const RESERVE_LEGENDE = 30;
/**
 * La hauteur (px) gardée libre au-dessus de la tête de chaque lame pour sa colonne
 * d'étiquettes — le nom de la lame et, empilé, son rôle : 18 + 2 + 22 px mesurés au
 * rendu, ×1,125 au grand texte, plus les marges du placeur (2 + 2) et son écart à l'ancre (3).
 */
export const COLONNE_NOMS = 60;
/** La plus grande déviation de l'aiguille : 0,500 A au bout du cadran, à 55°. */
export const DEVIATION_PLEINE_ECHELLE = 55;
/** L'intensité du bout du cadran (A). */
export const PLEINE_ECHELLE_A = 0.5;

export function creerRenduElectrolyse(canvas: HTMLCanvasElement, hote: HTMLElement): RenduElectrolyse {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let largeur = 480, hauteur = 480, dpr = 1;
  let etat: EtatRenduElectrolyse | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zonesTexte: { x0: number; y0: number; x1: number; y1: number }[] = [];
  let pxParG = 1;

  const css = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`;
  /** une teinte OPAQUE, mélangée au fond (jamais un rgba) */
  const voile = (c: RGB, a: number) => css(melange(jetons.surface, c, a));
  const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });
  const tirets = (motif: number[] | null) => ctx!.setLineDash(motif ?? []);
  const seg = (x0: number, y0: number, x1: number, y1: number) => segs.push([P(x0, y0), P(x1, y1)]);

  /** Une flèche de (x0, y0) à (x1, y1), pointe pleine. */
  function fleche(x0: number, y0: number, x1: number, y1: number, couleur: string, epaisseur: number, pointe = 7, motif: number[] | null = null) {
    const c = ctx!;
    const L = Math.hypot(x1 - x0, y1 - y0);
    if (L < 0.5) return;
    const ux = (x1 - x0) / L, uy = (y1 - y0) / L;
    const p = Math.min(pointe, L * 0.6);
    c.strokeStyle = couleur;
    c.fillStyle = couleur;
    c.lineWidth = epaisseur;
    c.lineCap = "butt";
    tirets(motif);
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1 - ux * p * 0.7, y1 - uy * p * 0.7);
    c.stroke();
    tirets(null);
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x1 - ux * p - uy * p * 0.5, y1 - uy * p + ux * p * 0.5);
    c.lineTo(x1 - ux * p + uy * p * 0.5, y1 - uy * p - ux * p * 0.5);
    c.closePath();
    c.fill();
  }

  function trait(points: [number, number][], couleur: string, epaisseur: number) {
    const c = ctx!;
    c.strokeStyle = couleur;
    c.lineWidth = epaisseur;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.beginPath();
    points.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    c.stroke();
    for (let i = 1; i < points.length; i++) seg(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
  }

  function rendre() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = css(jetons.surface);
    c.fillRect(0, 0, largeur, hauteur);
    rep = {};
    segs = [];
    zonesTexte = [];
    if (!etat) return;
    const e = etat;
    const W = largeur, H = hauteur;
    const encre = css(jetons.encre), accent = css(jetons.accent), surface = css(jetons.surface);
    const lu = M.lire(e.iMa, e.dureeS, e.cablage, e.p);

    // ── la géométrie : ne dépend QUE de la taille du dessin ──
    // (vague 2) au téléphone, entre le fil horizontal et la tête des lames, il y avait 83 px
    // pour l'instrument (36) ET la colonne nom + rôle de la lame (46 ; 51 au grand texte) :
    // rien n'y tenait, et le placeur rejetait la colonne à 31 px de sa lame. Les béchers
    // descendent (0,54 → 0,56 H), les lames sortent moins du bain (0,05 → 0,03 H), la
    // descente sous le générateur se resserre (0,06 → 0,05 H), et les instruments ne
    // restent à mi-hauteur que si la colonne des noms garde sa place (COLONNE_NOMS).
    const xL = 0.25 * W, xR = 0.75 * W, bw = 0.3 * W;
    // la légende, puis les signes + et − posés 15 px au-dessus des bornes : au grand texte
    // (×1,125), à +18 le « + » passait sous la légende
    const gx = W / 2, gy = Math.max(RESERVE_LEGENDE + 22, Math.round(0.11 * H));
    const r = Math.max(13, Math.min(20, 0.04 * W));
    const xPlus = gx - r - 16, xMoins = gx + r + 16;
    const y1 = gy + r + 8, y2 = y1 + Math.max(16, Math.min(30, 0.05 * H));
    const yB0 = 0.56 * H, yB1 = 0.84 * H;
    const yLiq = yB0 + 0.14 * (yB1 - yB0);
    const yL0 = yB0 - 0.03 * H, yL1 = yB1 - 0.1 * (yB1 - yB0);
    const yMi = (yLiq + yL1) / 2;
    const lw = Math.max(14, Math.min(24, 0.034 * W));
    // px par GRAMME, constant : il ne dépend que de la largeur (aucun réglage n'y entre)
    pxParG = 0.016 * W;
    const yBal0 = yB1 + 6, yBal1 = Math.min(H - 6, yBal0 + Math.max(22, Math.min(34, 0.09 * H)));
    const rA = Math.max(16, Math.min(24, 0.05 * W, (yL0 - y2) / 2 - 6));
    const hRh = Math.min(28, (yL0 - y2) * 0.45);
    // la demi-hauteur de ce que les instruments occupent (le cadran, ou le rhéostat et sa flèche)
    const dI = Math.max(rA + 2, hRh / 2 + 4);
    const yInstr = Math.max(y2 + dI + 3, Math.min((y2 + yL0) / 2, yL0 - COLONNE_NOMS - dI));

    // ── le générateur : un cercle, le symbole de la pile, ses deux bornes ──
    c.fillStyle = surface;
    c.strokeStyle = encre;
    c.lineWidth = 2;
    c.beginPath();
    c.arc(gx, gy, r, 0, 2 * Math.PI);
    c.fill();
    c.stroke();
    // le trait LONG est le côté + (à gauche), le trait COURT le côté −
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(gx - 3, gy - 0.55 * r);
    c.lineTo(gx - 3, gy + 0.55 * r);
    c.moveTo(gx + 3, gy - 0.3 * r);
    c.lineTo(gx + 3, gy + 0.3 * r);
    c.stroke();
    trait([[gx - r, gy], [xPlus, gy]], encre, 1.5);
    trait([[gx + r, gy], [xMoins, gy]], encre, 1.5);
    for (const x of [xPlus, xMoins]) {
      c.fillStyle = encre;
      c.beginPath();
      c.arc(x, gy, 3.5, 0, 2 * Math.PI);
      c.fill();
    }
    rep["gen"] = P(gx, gy);
    rep["borne-plus"] = P(xPlus, gy);
    rep["borne-moins"] = P(xMoins, gy);
    zonesTexte.push({ x0: gx - r - 2, y0: gy - r - 2, x1: gx + r + 2, y1: gy + r + 2 });

    // ── les deux fils, depuis les bornes : droits (`oppose`) ou CROISÉS (`accord`) ──
    trait([[xPlus, gy], [xPlus, y1]], encre, 1.5);
    trait([[xMoins, gy], [xMoins, y1]], encre, 1.5);
    if (e.cablage === "oppose") {
      trait([[xPlus, y1], [xPlus, y2]], encre, 1.5);
      trait([[xMoins, y1], [xMoins, y2]], encre, 1.5);
    } else {
      // le fil de la borne + part vers la DROITE (le zinc) ; celui de la borne −
      // passe PAR-DESSUS, vers la gauche (le cuivre) — un liseré de fond marque le saut
      trait([[xPlus, y1], [xMoins, y2]], encre, 1.5);
      const cxX = gx, cyX = (y1 + y2) / 2;
      const ux = (xPlus - xMoins) / Math.hypot(xPlus - xMoins, y2 - y1), uy = (y2 - y1) / Math.hypot(xPlus - xMoins, y2 - y1);
      c.strokeStyle = surface;
      c.lineWidth = 6;
      c.lineCap = "butt";
      c.beginPath();
      c.moveTo(cxX - ux * 7, cyX - uy * 7);
      c.lineTo(cxX + ux * 7, cyX + uy * 7);
      c.stroke();
      trait([[xMoins, y1], [xPlus, y2]], encre, 1.5);
    }
    rep["croisement"] = P(gx, (y1 + y2) / 2);
    // la borne qui alimente chaque lame (le côté de la paillasse, et non le métal)
    const plusSurCuivre = e.cablage === "oppose";

    // ── les deux descentes : rhéostat à gauche (cuivre), ampèremètre à droite (zinc) ──
    trait([[xPlus, y2], [xL, y2], [xL, yL0]], encre, 1.5);
    trait([[xMoins, y2], [xR, y2], [xR, yL0]], encre, 1.5);
    rep["coin-g"] = P(xL, y2);
    rep["coin-d"] = P(xR, y2);

    // le rhéostat : une résistance traversée d'une flèche (la valeur se RÈGLE)
    const wRh = 10;
    c.fillStyle = surface;
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    c.beginPath();
    c.rect(xL - wRh / 2, yInstr - hRh / 2, wRh, hRh);
    c.fill();
    c.stroke();
    fleche(xL - 11, yInstr + hRh / 2 + 2, xL + 11, yInstr - hRh / 2 - 2, encre, 1.2, 6);
    rep["rheostat"] = P(xL, yInstr);
    zonesTexte.push({ x0: xL - 13, y0: yInstr - hRh / 2 - 4, x1: xL + 13, y1: yInstr + hRh / 2 + 4 });
    seg(xL - 11, yInstr + hRh / 2 + 2, xL + 11, yInstr - hRh / 2 - 2);

    // l'ampèremètre, à ZÉRO CENTRAL : un cadran, sa graduation, son zéro
    c.fillStyle = surface;
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(xR, yInstr, rA, 0, 2 * Math.PI);
    c.fill();
    c.stroke();
    const rG = 0.72 * rA;
    const angle = (i: number) => ((i / PLEINE_ECHELLE_A) * DEVIATION_PLEINE_ECHELLE * Math.PI) / 180;
    c.lineWidth = 1;
    c.beginPath();
    c.arc(xR, yInstr, rG, -Math.PI / 2 - angle(0.5), -Math.PI / 2 + angle(0.5));
    c.stroke();
    for (const i of [-0.4, -0.2, 0, 0.2, 0.4]) {
      const a = angle(i), long = i === 0 ? 5 : 3;
      c.beginPath();
      c.moveTo(xR + Math.sin(a) * rG, yInstr - Math.cos(a) * rG);
      c.lineTo(xR + Math.sin(a) * (rG - long), yInstr - Math.cos(a) * (rG - long));
      c.stroke();
    }
    // le « A » du symbole normalisé : TRACÉ sous le pivot (trois traits), et non une
    // étiquette — une lettre de 16 px de haut ne tenait pas dans un cadran de 16 px
    // de rayon sans toucher son bord (porte `etiquettes`, premier passage)
    {
      const hA = 0.36 * rA, lA = 0.26 * rA, yA0 = yInstr + 0.22 * rA;
      c.strokeStyle = encre;
      c.lineWidth = 1.3;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.beginPath();
      c.moveTo(xR - lA / 2, yA0 + hA);
      c.lineTo(xR, yA0);
      c.lineTo(xR + lA / 2, yA0 + hA);
      c.moveTo(xR - lA / 4, yA0 + hA / 2);
      c.lineTo(xR + lA / 4, yA0 + hA / 2);
      c.stroke();
    }
    rep["ampere-pivot"] = P(xR, yInstr);
    rep["ampere-zero"] = P(xR, yInstr - rG);
    // les ancres des lectures posées SUR la paillasse (ce qu'on règle et ce qu'on lit, ensemble)
    rep["intensite"] = P(xR + rA + 4, yInstr);
    rep["tension"] = P(xMoins + 8, gy);
    rep["chrono"] = P(W - 8, 14);
    rep["rheostat-nom"] = P(xL - 14, yInstr);
    zonesTexte.push({ x0: xR - rA - 2, y0: yInstr - rA - 2, x1: xR + rA + 2, y1: yInstr + rA + 2 });

    // ── les deux béchers, leur bain, le pont salin ──
    const opacite = (gain: number) => Math.max(0.06, Math.min(0.26, 0.16 + (0.08 * gain) / 0.732));
    // le bain dont les ions AUGMENTENT fonce (la lame qui s'y dissout), l'autre pâlit
    const bainCu = opacite(-lu.masseCuivre), bainZn = opacite(-lu.masseZinc);
    for (const [xc, a, nom] of [[xL, bainCu, "cu"], [xR, bainZn, "zn"]] as const) {
      c.fillStyle = voile(jetons.encreDouce, a);
      c.fillRect(xc - bw / 2 + 1, yLiq, bw - 2, yB1 - yLiq - 1);
      c.strokeStyle = voile(jetons.encreDouce, 0.55);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(xc - bw / 2 + 1, yLiq);
      c.lineTo(xc + bw / 2 - 1, yLiq);
      c.stroke();
      trait([[xc - bw / 2, yB0], [xc - bw / 2, yB1], [xc + bw / 2, yB1], [xc + bw / 2, yB0]], encre, 2);
      // un point du bain loin de la lame, du pont et des étiquettes : la porte y lit l'opacité
      rep[`bain-${nom}`] = P(xc + (nom === "cu" ? -1 : 1) * 0.36 * bw, yB1 - 0.18 * (yB1 - yLiq));
    }
    // le pont salin : un tube en U renversé, d'un bain à l'autre
    {
      const xa = xL + 0.3 * bw, xb = xR - 0.3 * bw, yh = yB0 - 0.06 * H, yb = yLiq + 0.4 * (yB1 - yLiq);
      const chemin = () => {
        c.beginPath();
        c.moveTo(xa, yb);
        c.lineTo(xa, yh + 6);
        c.quadraticCurveTo(xa, yh, xa + 6, yh);
        c.lineTo(xb - 6, yh);
        c.quadraticCurveTo(xb, yh, xb, yh + 6);
        c.lineTo(xb, yb);
      };
      c.lineCap = "butt";
      c.strokeStyle = encre;
      c.lineWidth = 8;
      chemin();
      c.stroke();
      c.strokeStyle = voile(jetons.encreDouce, 0.12);
      c.lineWidth = 5;
      chemin();
      c.stroke();
      seg(xa, yb, xa, yh);
      seg(xa, yh, xb, yh);
      seg(xb, yh, xb, yb);
      // le nom se pose AU-DESSUS du tube (8 px d'épaisseur), pas sur son axe
      rep["pont"] = P(gx, yh - 6);
    }

    // ── les deux lames : ce que la course dépose, ce qu'elle dissout ──
    const epaisseur = (m: number) => Math.abs(m) * pxParG;
    // LE TRAIT porte le signal, le REMPLISSAGE la quantité (vague 2) : un dépôt plein à
    // l'accent était, en thème sombre, le seul bloc qui brillait ; et au plus petit
    // réglage (0,061 g : 0,45 px) la lame qui gagne ne portait AUCUNE marque, quand
    // celle qui perd gardait son contour en tirets de 1,5 px. Les deux lames portent
    // désormais un trait de même poids — plein pour le gain, en tirets pour la perte.
    const teinteDepot = e.accentDepot ? accent : voile(jetons.encre, 0.62);
    const fondDepot = e.accentDepot ? voile(jetons.accent, 0.55) : voile(jetons.encre, 0.36);
    const teinteLame = voile(jetons.encreDouce, 0.3);
    for (const [xc, m, nom] of [[xL, lu.masseCuivre, "cu"], [xR, lu.masseZinc, "zn"]] as const) {
      const t = epaisseur(m);
      const g0 = xc - lw / 2, d0 = xc + lw / 2;
      // la partie émergée, intacte
      c.fillStyle = teinteLame;
      c.strokeStyle = encre;
      c.lineWidth = 1.5;
      c.beginPath();
      c.rect(g0, yL0, lw, yLiq - yL0);
      c.fill();
      c.stroke();
      if (m >= 0) {
        // la lame GAGNE : une couche sur ses deux faces et sous elle, d'épaisseur t
        c.fillStyle = teinteLame;
        c.beginPath();
        c.rect(g0, yLiq, lw, yL1 - yLiq);
        c.fill();
        c.stroke();
        if (t > 0) {
          c.fillStyle = fondDepot;
          c.fillRect(g0 - t, yLiq + 1, t, yL1 - yLiq - 1 + t);
          c.fillRect(d0, yLiq + 1, t, yL1 - yLiq - 1 + t);
          c.fillRect(g0, yL1, lw, t);
          // le bord EXTÉRIEUR du dépôt, tracé EN DEDANS : le bord peint reste à g0 − t
          // (l'épaisseur lue ne change pas) ; sous 1,5 px, c'est le contour de la lame
          // qui passe à l'accent — le pendant du contour en tirets de l'autre lame
          const m2 = 0.75;
          c.strokeStyle = teinteDepot;
          c.lineWidth = 1.5;
          c.lineCap = "butt";
          c.lineJoin = "miter";
          c.beginPath();
          c.moveTo(g0 - t + m2, yLiq + 1);
          c.lineTo(g0 - t + m2, yL1 + t - m2);
          c.lineTo(d0 + t - m2, yL1 + t - m2);
          c.lineTo(d0 + t - m2, yLiq + 1);
          c.stroke();
        }
      } else {
        // la lame PERD : sa partie immergée s'amincit de t sur chaque face ;
        // son contour d'origine reste, en tirets (l'entaille)
        const g1 = g0 + t, d1 = d0 - t;
        c.fillStyle = teinteLame;
        c.beginPath();
        c.rect(g1, yLiq, Math.max(0, d1 - g1), yL1 - yLiq - t);
        c.fill();
        c.stroke();
        if (t > 0) {
          c.strokeStyle = teinteDepot;
          c.lineWidth = 1.5;
          tirets([3, 2]);
          c.beginPath();
          c.moveTo(g0, yLiq);
          c.lineTo(g0, yL1);
          c.lineTo(d0, yL1);
          c.lineTo(d0, yLiq);
          c.stroke();
          tirets(null);
        }
      }
      rep[`lame-${nom}-haut`] = P(xc, (yL0 + yLiq) / 2);
      rep[`lame-${nom}-mi`] = P(xc, yMi);
      rep[`lame-${nom}-tete`] = P(xc, yL0);
      seg(g0 - 8, yL0, g0 - 8, yL1 + 8);
      seg(d0 + 8, yL0, d0 + 8, yL1 + 8);
      zonesTexte.push({ x0: g0 - Math.max(t, 0) - 3, y0: yL0 - 2, x1: d0 + Math.max(t, 0) + 3, y1: yL1 + t + 2 });
    }

    // ── les balances : un boîtier ; leur lecture est une étiquette posée dessus ──
    for (const [xc, nom] of [[xL, "cu"], [xR, "zn"]] as const) {
      const x0 = xc - 0.36 * bw, x1 = xc + 0.36 * bw;
      c.fillStyle = surface;
      c.strokeStyle = encre;
      c.lineWidth = 1.5;
      c.beginPath();
      c.roundRect(x0, yBal0, x1 - x0, yBal1 - yBal0, 4);
      c.fill();
      c.stroke();
      rep[`balance-${nom}`] = P(xc, (yBal0 + yBal1) / 2);
      zonesTexte.push({ x0: x0 - 2, y0: yBal0 - 2, x1: x1 + 2, y1: yBal1 + 2 });
    }

    // ── le témoin d'épaisseur : « 1 g », au même facteur que les dépôts ──
    // À LA HAUTEUR DES DÉPÔTS, entre les deux béchers (vague 2) : sous les balances, il
    // fallait traverser 130 px et changer de rangée pour le comparer à ce qu'il mesure.
    if (e.temoin) {
      const yt = yMi, ht = 14, xt = W / 2 - 18;
      c.fillStyle = voile(jetons.encre, 0.62);
      c.fillRect(xt, yt - ht / 2, pxParG, ht);
      rep["temoin-g"] = P(xt, yt);
      rep["temoin-d"] = P(xt + pxParG, yt);
      rep["temoin"] = P(xt + pxParG + 4, yt);
      zonesTexte.push({ x0: xt - 3, y0: yt - ht / 2 - 3, x1: xt + pxParG + 3, y1: yt + ht / 2 + 3 });
    }

    // ── le circuit fermé : l'aiguille, le courant, les électrons ──
    // Le courant sort par la borne + : en `oppose`, il descend le fil du cuivre et
    // remonte celui du zinc (l'aiguille penche à DROITE) ; en `accord`, l'inverse.
    if (e.circuit) {
      const coul = e.accentCircuit ? accent : encre;
      const sgn = plusSurCuivre ? 1 : -1;
      const a = sgn * angle(e.iMa / 1000);
      const La = rG - 2;
      c.strokeStyle = coul;
      c.lineWidth = e.accentCircuit ? 2 : 1.5;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(xR, yInstr);
      c.lineTo(xR + Math.sin(a) * La, yInstr - Math.cos(a) * La);
      c.stroke();
      c.fillStyle = coul;
      c.beginPath();
      c.arc(xR, yInstr, 2.2, 0, 2 * Math.PI);
      c.fill();
      rep["aiguille-bout"] = P(xR + Math.sin(a) * La, yInstr - Math.cos(a) * La);
      // les flèches, sur les deux fils horizontaux : le courant AU-DESSUS du fil, les électrons DESSOUS
      const lf = Math.max(16, Math.min(26, 0.4 * (xPlus - xL)));
      for (const [xa, xb, nom] of [[xL, xPlus, "g"], [xMoins, xR, "d"]] as const) {
        const xm = (xa + xb) / 2;
        // le sens du courant sur ce fil, en x : de la borne + vers sa lame, de la lame vers la borne −
        // à gauche : + → cuivre (vers la gauche) en `oppose` ; cuivre → − (vers la droite) en `accord`
        // à droite : zinc → − (vers la gauche) en `oppose` ; + → zinc (vers la droite) en `accord`
        const versGauche = plusSurCuivre;
        const s = versGauche ? -1 : 1;
        const xi0 = xm - (s * lf) / 2, xi1 = xm + (s * lf) / 2;
        fleche(xi0, y2 - 7, xi1, y2 - 7, coul, e.accentCircuit ? 2 : 1.5, 7);
        fleche(xi1, y2 + 7, xi0, y2 + 7, coul, 1.5, 6, [3, 2]);
        rep[`i-${nom}-queue`] = P(xi0, y2 - 7);
        rep[`i-${nom}-tete`] = P(xi1, y2 - 7);
        rep[`e-${nom}-queue`] = P(xi1, y2 + 7);
        rep[`e-${nom}-tete`] = P(xi0, y2 + 7);
        // les noms « I » et « e⁻ » se posent au MILIEU de leur flèche, au-dessus et au-dessous
        rep[`i-${nom}-mi`] = P(xm, y2 - 14);
        rep[`e-${nom}-mi`] = P(xm, y2 + 14);
        seg(xi0, y2 - 7, xi1, y2 - 7);
        seg(xi0, y2 + 7, xi1, y2 + 7);
        zonesTexte.push({ x0: Math.min(xi0, xi1) - 2, y0: y2 - 12, x1: Math.max(xi0, xi1) + 2, y1: y2 + 12 });
      }
    }
  }

  return {
    redimensionner(l, h) {
      largeur = Math.max(1, Math.round(l));
      hauteur = Math.max(1, Math.round(h));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(largeur * dpr);
      canvas.height = Math.round(hauteur * dpr);
    },
    relireCouleurs() {
      jetons = lireJetons(hote);
    },
    rendre,
    detruire() {
      etat = null;
    },
    mettreAJour(e) {
      etat = e;
    },
    reperes: () => rep,
    cadre: () => ({ largeur, hauteur }),
    segments: () => segs,
    zones: () => zonesTexte,
    echelle: () => ({ pxParG }),
  };
}
