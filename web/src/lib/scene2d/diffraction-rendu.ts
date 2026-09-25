/**
 * diffraction-rendu.ts — le rendu Canvas 2D du « banc de diffraction »
 * (spec content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md §5.3–§6).
 *
 * DEUX ÉCHELLES, DÉCLARÉES, ET UNE SEULE EXAGÉRATION. Le long du banc, les
 * DISTANCES (px par mètre, `sx`) ; en travers, les LARGEURS, dix fois plus
 * grandes (`sy = EXAGERATION × sx`). Tout angle est donc dessiné dix fois trop
 * ouvert — le même facteur à tous les réglages et à toutes les largeurs
 * d'écran : les rapports dessinés sont vrais. La fente n'est à AUCUNE des deux
 * échelles : un symbole de largeur constante (à l'échelle des largeurs,
 * 0,060 mm ferait un dixième de pixel).
 *
 * LA LANGUE VISUELLE (ADR 0041 §4). À l'ENCRE, l'énoncé : le laser, le
 * faisceau jusqu'à la fente, la plaque, l'écran, la règle et ses chiffres, la
 * cote de D, l'axe optique, le quadrillage du graphe — et la tache, à TOUTES
 * les phases. À l'ACCENT, et seulement après la révélation, ce qui RÉPOND : les
 * deux rayons de bord (l'éventail), l'arc de θ, le crochet L, les points du
 * graphe et leur droite. (La tache repeinte à l'accent à la révélation faisait
 * cinq taches d'accent — la centrale et quatre voisines dont la scène
 * n'affirme rien — pour une seule longueur à lire : vague 2, calme.) Aucune
 * teinte spectrale : la couleur du laser se lit dans un NOMBRE, jamais dans la
 * tache.
 *
 * Les couleurs sont lues dans les jetons (`lib/jetons-figure.ts` — pas
 * `scene3d/palette.ts`, qui importerait three).
 */
import * as M from "./diffraction-modele";
import { lireJetons, type RGB } from "../jetons-figure";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export type VueBanc = "banc" | "banc-et-graphe";

export interface Reglage {
  /** la dimension transverse de l'objet, en mm (la fente, ou le cheveu) */
  dim: number;
  lambda: number;
  D: number;
  objet: M.Objet;
}

export interface EtatRenduDiffraction {
  courant: Reglage;
  vue: VueBanc;
  /** après la révélation : l'éventail, l'arc, le crochet, les points — l'accent a le droit d'exister */
  revele: boolean;
  /** le réglage de départ de l'étape, dessiné en tirets d'encre quand il diffère du courant (après révélation) */
  reference: Reglage | null;
}

export interface RenduDiffraction {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduDiffraction): void;
  /** les repères, en pixels CSS du canvas (la porte les lit ; les étiquettes s'y posent) */
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  /** les bandes où aucune étiquette ne se pose : la règle et ses chiffres, les nombres du graphe */
  zones(): { x0: number; y0: number; x1: number; y1: number }[];
  /** l'échelle en travers, en px par cm (la porte la LIT sur la règle ; ceci ne sert qu'aux étiquettes) */
  echelle(): { sx: number; sy: number };
}

/** La hauteur réservée à la légende du plateau (une pastille opaque, en haut à gauche). */
export const RESERVE_LEGENDE = 30;
/** La largeur dessinée de la fente : un SYMBOLE, identique aux sept crans. */
export const FENTE_SYMBOLE_PX = 6;

export function creerRenduDiffraction(canvas: HTMLCanvasElement, hote: HTMLElement): RenduDiffraction {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 320, dpr = 1;
  let etat: EtatRenduDiffraction | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zonesNombres: { x0: number; y0: number; x1: number; y1: number }[] = [];
  let echelle = { sx: 1, sy: 1 };

  const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });
  /** Un trait de 1 px posé au milieu d'un pixel : net, et à ≤ 0,5 px de sa place exacte. */
  const net = (v: number) => Math.round(v - 0.5) + 0.5;
  // 12 px : la taille de la légende (`text-caption`) et des autres rendus plans ;
  // 11 px n'était dans aucun jeton, et ce sont les nombres qu'on demande de LIRE
  const texte = (t: string, x: number, y: number, aligne: CanvasTextAlign, base: CanvasTextBaseline) => {
    const c = ctx!;
    c.font = `12px ${police}`;
    c.textAlign = aligne;
    c.textBaseline = base;
    c.fillStyle = css(jetons.encre);
    c.fillText(t, x, y);
  };
  const tirets = (on: boolean) => ctx!.setLineDash(on ? [4, 3] : []);

  // ── LE BANC ───────────────────────────────────────────────────────────────
  function rendreBanc(e: EtatRenduDiffraction, bx0: number, by0: number, bx1: number, by1: number) {
    const c = ctx!;
    const encre = css(jetons.encre), accent = css(jetons.accent);
    const COTE = 26, REGLE = 36, HAUT = 18;
    const yHaut = by0 + HAUT, yBas = by1 - COTE;
    const ym = Math.round((yHaut + yBas) / 2) + 0.5;
    const hh = Math.max(20, (yBas - yHaut) / 2);
    const LASER_W = 26;
    const xLaser = bx0 + 8;
    const xs = Math.round(xLaser + LASER_W + Math.max(16, (bx1 - bx0) * 0.06));
    // l'échelle des DISTANCES : l'écran le plus loin (2,00 m) touche la règle
    const sx = (bx1 - REGLE - 6 - xs) / M.D_MAX; // px par mètre
    const sy = (M.EXAGERATION * sx) / 100; // px par cm, en travers
    echelle = { sx, sy };
    const { courant } = e;
    const xe = Math.round(xs + courant.D * sx) + 0.5;
    const L = M.largeurTache(courant.lambda, courant.dim, courant.D);
    const demiPx = (L / 2) * sy;

    // l'axe optique, en tirets doux
    c.strokeStyle = css(jetons.encreDouce, 0.7);
    c.lineWidth = 1;
    tirets(true);
    c.beginPath();
    c.moveTo(xLaser + LASER_W, ym);
    c.lineTo(xe, ym);
    c.stroke();
    tirets(false);
    // tout trait dessiné est un obstacle pour les étiquettes : une pastille
    // opaque posée sur l'axe, la cote ou le crochet de départ les coupait
    segs.push([P(xLaser + LASER_W, ym), P(xe, ym)]);

    // le laser et son faisceau incident, jusqu'à la fente
    c.fillStyle = css(jetons.encreDouce);
    c.fillRect(xLaser, ym - 7, LASER_W, 14);
    c.strokeStyle = encre;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(xLaser + LASER_W, ym);
    c.lineTo(xs, ym);
    c.stroke();
    rep["laser"] = P(xLaser + LASER_W / 2, ym + 7);

    // la plaque et sa fente (un SYMBOLE), ou le cheveu (un symbole aussi)
    const hPlaque = Math.min(hh * 0.62, 70);
    c.strokeStyle = encre;
    c.lineWidth = 3;
    c.beginPath();
    if (courant.objet === "fente") {
      c.moveTo(xs, ym - hPlaque);
      c.lineTo(xs, ym - FENTE_SYMBOLE_PX / 2);
      c.moveTo(xs, ym + FENTE_SYMBOLE_PX / 2);
      c.lineTo(xs, ym + hPlaque);
    } else {
      c.moveTo(xs, ym - FENTE_SYMBOLE_PX / 2);
      c.lineTo(xs, ym + FENTE_SYMBOLE_PX / 2);
    }
    c.stroke();
    rep["fente"] = P(xs, ym);
    rep["objet-haut"] = P(xs, courant.objet === "fente" ? ym - hPlaque : ym - FENTE_SYMBOLE_PX / 2);
    rep["fente-bord-haut"] = P(xs, ym - FENTE_SYMBOLE_PX / 2);
    rep["fente-bord-bas"] = P(xs, ym + FENTE_SYMBOLE_PX / 2);
    segs.push([P(xs, ym - hPlaque), P(xs, ym + hPlaque)]);

    // l'écran : un trait, et sa bande (on lui donne une épaisseur pour peindre dessus)
    const BANDE = 12;
    const teinte = jetons.encre;
    for (let y = Math.ceil(ym - hh); y <= Math.floor(ym + hh); y++) {
      const xcm = (ym - (y + 0.5)) / sy;
      const I = M.eclaircir(M.profil(xcm, L));
      if (I < 0.01) continue;
      c.fillStyle = css(teinte, 0.92 * I);
      c.fillRect(xe - BANDE, y, BANDE - 1, 1);
    }
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(xe, ym - hh);
    c.lineTo(xe, ym + hh);
    c.stroke();
    rep["ecran"] = P(xe, ym);
    rep["ecran-haut"] = P(xe, ym - hh);
    rep["bord-haut"] = P(xe, ym - demiPx);
    rep["bord-bas"] = P(xe, ym + demiPx);
    segs.push([P(xe, ym - hh), P(xe, ym + hh)]);

    // la règle, posée contre l'écran : l'axe sur la graduation 10 cm, les
    // nombres croissant vers le haut ; un trait fin tous les 0,5 cm, fort tous
    // les centimètres, chiffré quand la place le permet
    const xr = xe + 5;
    const vHaut = Math.min(M.REGLE_LONGUEUR_CM, M.REGLE_AXE_CM + hh / sy);
    const vBas = Math.max(0, M.REGLE_AXE_CM - hh / sy);
    const Yv = (v: number) => ym - (v - M.REGLE_AXE_CM) * sy;
    c.strokeStyle = encre;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(net(xr), Yv(vHaut));
    c.lineTo(net(xr), Yv(vBas));
    c.stroke();
    // un chiffre tous les 2 cm tant qu'un centimètre fait moins de 28 px : chiffrée
    // au centimètre, la règle (13 nombres à 1 280 px) était l'objet le plus dense
    // du dessin, collée à la tache qu'il faut regarder (vague 2)
    const pasChiffre = sy >= 28 ? 1 : sy >= 8 ? 2 : 5;
    for (let k = Math.ceil(vBas * 2); k <= Math.floor(vHaut * 2); k++) {
      const v = k / 2, y = net(Yv(v));
      const fort = k % 2 === 0;
      c.beginPath();
      c.moveTo(xr, y);
      c.lineTo(xr + (fort ? 7 : 4), y);
      c.stroke();
      if (fort && v % pasChiffre === 0) texte(String(v), xr + 9, y, "left", "middle");
      if (fort) rep[`regle-${v}`] = P(xr, Yv(v));
    }
    zonesNombres.push({ x0: xr - 2, y0: by0, x1: bx1, y1: by1 });
    rep["regle-titre"] = P(xr + 9, Yv(vHaut) - 4);

    // la cote de D, sous le banc (l'étiquette « D = … » s'y pose)
    const yc = by1 - 12.5;
    c.strokeStyle = encre;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(xs, yc);
    c.lineTo(xe, yc);
    c.moveTo(xs, yc - 4);
    c.lineTo(xs, yc + 4);
    c.moveTo(xe, yc - 4);
    c.lineTo(xe, yc + 4);
    c.stroke();
    segs.push([P(xs, yc), P(xe, yc)]);
    rep["cote-D"] = P((xs + xe) / 2, yc);
    rep["cote-D-g"] = P(xs, yc);
    rep["cote-D-d"] = P(xe, yc);

    // le réglage de DÉPART, en tirets d'encre, quand il n'est plus le courant
    const ref = e.reference;
    if (e.revele && ref && (ref.dim !== courant.dim || ref.lambda !== courant.lambda || ref.D !== courant.D || ref.objet !== courant.objet)) {
      const xR = Math.round(xs + ref.D * sx) + 0.5;
      const Lr = M.largeurTache(ref.lambda, ref.dim, ref.D);
      const dR = (Lr / 2) * sy;
      const xb = xR - BANDE - 16;
      c.strokeStyle = encre;
      c.lineWidth = 1;
      tirets(true);
      c.beginPath();
      c.moveTo(xb, ym - dR);
      c.lineTo(xb, ym + dR);
      c.moveTo(xb - 4, ym - dR);
      c.lineTo(xR - BANDE, ym - dR);
      c.moveTo(xb - 4, ym + dR);
      c.lineTo(xR - BANDE, ym + dR);
      c.stroke();
      tirets(false);
      segs.push([P(xb, ym - dR), P(xb, ym + dR)], [P(xb - 4, ym - dR), P(xR - BANDE, ym - dR)], [P(xb - 4, ym + dR), P(xR - BANDE, ym + dR)]);
      rep["ref-haut"] = P(xb, ym - dR);
      rep["ref-bas"] = P(xb, ym + dR);
      // « départ » se nomme par le BAS, « L » par le haut : jamais échangés,
      // même quand les deux crochets se resserrent sur l'axe (vague 2)
      rep["ref"] = P(xb, ym + dR);
    }

    // ── la RÉPONSE, à l'accent : l'éventail, l'arc de θ, le crochet L ──
    if (e.revele) {
      // les rayons s'arrêtent à la FACE de la bande : ils y arrivent aux bords de
      // la tache, et la bande elle-même reste lisible (la porte y mesure les bords)
      const xf = xe - BANDE, yf = demiPx * ((xf - xs) / (xe - xs));
      c.strokeStyle = accent;
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(xs, ym);
      c.lineTo(xf, ym - yf);
      c.moveTo(xs, ym);
      c.lineTo(xf, ym + yf);
      c.stroke();
      segs.push([P(xs, ym), P(xf, ym - yf)], [P(xs, ym), P(xf, ym + yf)]);
      rep["rayon-haut"] = P(xf, ym - yf);
      rep["rayon-bas"] = P(xf, ym + yf);
      // l'arc de θ : de l'axe au rayon du HAUT — θ est le DEMI-écart angulaire
      const angle = Math.atan2(demiPx, xe - xs);
      const r = Math.max(18, Math.min(46, (xe - xs) * 0.4));
      c.beginPath();
      c.arc(xs, ym, r, -angle, 0);
      c.stroke();
      rep["arc"] = P(xs + (r + 10) * Math.cos(angle / 2), ym - (r + 10) * Math.sin(angle / 2));
      // le crochet L, contre la bande de l'écran
      const xk = xe - BANDE - 7;
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(xk, ym - demiPx);
      c.lineTo(xk, ym + demiPx);
      c.moveTo(xk - 4, ym - demiPx);
      c.lineTo(xk + 4, ym - demiPx);
      c.moveTo(xk - 4, ym + demiPx);
      c.lineTo(xk + 4, ym + demiPx);
      c.stroke();
      rep["crochet-L"] = P(xk, ym);
      segs.push([P(xk, ym - demiPx), P(xk, ym + demiPx)]);
    }
  }

  // ── LE GRAPHE L = f(D) : le papier de la figure 3 du sujet 2021 ──────────
  const D_MAX_CM = 210, L_MAX_CM = 4.4;
  function rendreGraphe(e: EtatRenduDiffraction, gx0: number, gy0: number, gx1: number, gy1: number) {
    const c = ctx!;
    const accent = css(jetons.accent), encre = css(jetons.encre);
    // en bas, deux rangées : les nombres de l'axe, puis son titre « D (cm) » —
    // à 34 px, le titre tombait dans la rangée des nombres, sous « 200 » (vague 2)
    const x0 = Math.round(gx0 + 38), x1 = Math.round(gx1 - 12), y0 = Math.round(gy0 + 22), y1 = Math.round(gy1 - 42);
    const X = (Dcm: number) => x0 + (Dcm / D_MAX_CM) * (x1 - x0);
    const Y = (Lcm: number) => y1 - (Lcm / L_MAX_CM) * (y1 - y0);
    // le quadrillage : fins tous les 10 cm et 0,2 cm, forts tous les 50 cm et 0,8 cm
    // les fins ne sont tracés que s'ils restent à 5 px l'un de l'autre DANS LES
    // DEUX SENS : plus serrés, ils font un code-barres ; dans un seul sens, un
    // panneau rayé, pas la feuille quadrillée que la consigne nomme (vague 2)
    // les forts portent les nombres qu'on LIT : 0,7 (3,6:1 sur la surface claire ;
    // à 0,6 ils tombaient à 2,9:1, sous le plancher des objets graphiques)
    const fins = ((x1 - x0) * 10) / D_MAX_CM >= 5 && ((y1 - y0) * 0.2) / L_MAX_CM >= 5;
    for (let k = 0; k <= D_MAX_CM / 10; k++) {
      const fort = (k * 10) % 50 === 0;
      if (!fort && !fins) continue;
      c.strokeStyle = css(jetons.encreDouce, fort ? 0.7 : 0.3);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(net(X(k * 10)), y0);
      c.lineTo(net(X(k * 10)), y1);
      c.stroke();
    }
    for (let k = 0; k <= Math.round(L_MAX_CM / 0.2); k++) {
      const fort = k % 4 === 0;
      if (!fort && !fins) continue;
      c.strokeStyle = css(jetons.encreDouce, fort ? 0.7 : 0.3);
      c.beginPath();
      c.moveTo(x0, net(Y(k * 0.2)));
      c.lineTo(x1, net(Y(k * 0.2)));
      c.stroke();
    }
    // les axes, et leurs nombres
    c.strokeStyle = encre;
    c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(net(x0), y0);
    c.lineTo(net(x0), net(y1));
    c.lineTo(x1, net(y1));
    c.stroke();
    texte("0", x0 - 6, y1 + 5, "right", "top");
    for (const d of [50, 100, 150, 200]) texte(String(d), X(d), y1 + 5, "center", "top");
    for (let k = 1; k <= 5; k++) texte(M.nombre(k * 0.8, 1), x0 - 6, Y(k * 0.8), "right", "middle");
    zonesNombres.push({ x0: gx0, y0: y1 + 2, x1: gx1, y1: gy1 }, { x0: gx0, y0: y0 - 6, x1: x0 - 2, y1: y1 + 2 });
    rep["graphe-o"] = P(x0, y1);
    for (const d of [50, 100, 150, 200]) rep[`graphe-D${d}`] = P(X(d), y1);
    for (let k = 1; k <= 5; k++) rep[`graphe-L${k}`] = P(x0, Y(k * 0.8));
    rep["graphe-titre-D"] = P(x1, y1 + 22);
    rep["graphe-titre-L"] = P(gx0 + 8, y0 - 18);
    segs.push([P(x0, y0), P(x0, y1)], [P(x0, y1), P(x1, y1)]);

    if (!e.revele) return;
    // les cinq points de mesure, et la droite par l'origine (le réglage COURANT)
    const { dim, lambda } = e.courant;
    c.strokeStyle = accent;
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(X(0), Y(0));
    const Lfin = M.largeurTache(lambda, dim, D_MAX_CM / 100);
    const dFin = Lfin > L_MAX_CM ? (L_MAX_CM / Lfin) * D_MAX_CM : D_MAX_CM;
    c.lineTo(X(dFin), Y(M.largeurTache(lambda, dim, dFin / 100)));
    c.stroke();
    c.fillStyle = accent;
    M.POINTS_D.forEach((D, i) => {
      const Lp = M.largeurTache(lambda, dim, D);
      if (Lp > L_MAX_CM) return;
      c.beginPath();
      c.arc(X(D * 100), Y(Lp), 3.5, 0, 2 * Math.PI);
      c.fill();
      rep[`point-${i}`] = P(X(D * 100), Y(Lp));
    });
    // le point du réglage courant, entouré
    const Lc = M.largeurTache(lambda, dim, e.courant.D);
    if (Lc <= L_MAX_CM) {
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(X(e.courant.D * 100), Y(Lc), 6.5, 0, 2 * Math.PI);
      c.stroke();
      rep["point-courant"] = P(X(e.courant.D * 100), Y(Lc));
    }
  }

  function rendre() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = css(jetons.surface);
    c.fillRect(0, 0, largeur, hauteur);
    rep = {};
    segs = [];
    zonesNombres = [];
    if (!etat) return;
    const top = RESERVE_LEGENDE;
    if (etat.vue === "banc-et-graphe") {
      if (largeur >= 560) {
        const coupe = Math.round(largeur * 0.52);
        rendreBanc(etat, 0, top, coupe, hauteur);
        rendreGraphe(etat, coupe, top, largeur, hauteur);
      } else {
        // le banc n'a besoin que de ±2,2 cm à cette étape (4,00 cm au plus) : le
        // graphe prend la plus grande part
        const coupe = Math.round(top + (hauteur - top) * 0.45);
        rendreBanc(etat, 0, top, largeur, coupe);
        rendreGraphe(etat, 0, coupe, largeur, hauteur);
      }
    } else rendreBanc(etat, 0, top, largeur, hauteur);
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
      lirePolice();
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
    zones: () => zonesNombres,
    echelle: () => echelle,
  };
}
