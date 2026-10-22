/**
 * tremplin-rendu.ts — le rendu Canvas 2D du « tremplin circulaire »
 * (spec content/pc/lois-de-newton/spec-scene-tremplin.md §5.8, §6).
 *
 * DEUX ÉCHELLES, DÉCLARÉES, CONSTANTES — et RIEN D'EXAGÉRÉ. La géométrie de
 * la piste est à UNE échelle (px par mètre), la même horizontalement et
 * verticalement : les angles 10° et 18° du sujet sont vrais à l'écran, et un
 * tremplin de 20 m qui ne tourne que de 28° EST une courbe douce. Les
 * accélérations ont leur propre échelle (px par m·s⁻²). Chacune a son TÉMOIN
 * sur la scène (« 5 m », « 10 m·s⁻² »), et aucune ne change avec le réglage :
 * elles ne dépendent que de la largeur du dessin.
 *
 * LA LANGUE VISUELLE (ADR 0041 §4). À l'ENCRE, l'énoncé : la piste, B et C,
 * les horizontales et les angles 10° et 18°, la moto (réduite à son centre
 * d'inertie G), le vecteur unitaire u_T, les deux témoins. À l'ACCENT, et
 * seulement après l'engagement, la RÉPONSE : le vecteur accélération — il n'a
 * aucune existence d'énoncé (spec §7.6) —, ses composantes, le rayon vers le
 * centre du virage. u_N (à l'encre, c'est un vecteur de la base) n'existe
 * qu'après la révélation, et seulement dans l'arc : sur la droite, la normale
 * n'a pas de côté vers lequel pointer.
 *
 * Les couleurs sont lues dans les jetons (`lib/jetons-figure.ts` — pas
 * `scene3d/palette.ts`, qui importerait three).
 */
import * as M from "./tremplin-modele";
import { lireJetons, type RGB } from "../jetons-figure";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface Reglage {
  vB: number;
  R: number;
  regime: M.Regime;
}

export interface EtatRenduTremplin {
  courant: Reglage;
  /** l'abscisse de G le long de la piste, en m (B = 0 ; négative sur la droite) */
  l: number;
  /** le vecteur accélération existe-t-il à l'écran ? (après l'engagement) */
  acceleration: boolean;
  /** la décomposition dans la base, u_N et le centre — après la révélation */
  base: boolean;
  /** l'étape a-t-elle déjà ouvert la composante tangentielle ? (S4, S5) */
  tangentielle: boolean;
  /** le réglage de départ de l'étape, en tirets d'encre au même repère (après révélation) */
  reference: Reglage | null;
}

export interface RenduTremplin {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduTremplin): void;
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  zones(): { x0: number; y0: number; x1: number; y1: number }[];
  /** les deux échelles, en px (la porte les LIT sur les témoins ; ceci ne sert qu'aux étiquettes) */
  echelle(): { pxParM: number; pxParMs2: number };
}

/** La hauteur réservée à la légende du plateau. */
export const RESERVE_LEGENDE = 30;
/** La longueur dessinée des vecteurs UNITAIRES : une convention, la même partout. */
export const UNITAIRE_PX = 30;

export function creerRenduTremplin(canvas: HTMLCanvasElement, hote: HTMLElement): RenduTremplin {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let largeur = 480, hauteur = 360, dpr = 1;
  let etat: EtatRenduTremplin | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zonesTexte: { x0: number; y0: number; x1: number; y1: number }[] = [];
  let echelle = { pxParM: 1, pxParMs2: 1 };

  const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });
  const tirets = (motif: number[] | null) => ctx!.setLineDash(motif ?? []);

  /** Une flèche de (x0, y0) à (x1, y1), pointe pleine. */
  function fleche(x0: number, y0: number, x1: number, y1: number, couleur: string, epaisseur: number, pointe = 8) {
    const c = ctx!;
    const L = Math.hypot(x1 - x0, y1 - y0);
    if (L < 0.5) return;
    const ux = (x1 - x0) / L, uy = (y1 - y0) / L;
    const p = Math.min(pointe, L * 0.6);
    c.strokeStyle = couleur;
    c.fillStyle = couleur;
    c.lineWidth = epaisseur;
    c.lineCap = "butt";
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1 - ux * p * 0.7, y1 - uy * p * 0.7);
    c.stroke();
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x1 - ux * p - uy * p * 0.42, y1 - uy * p + ux * p * 0.42);
    c.lineTo(x1 - ux * p + uy * p * 0.42, y1 - uy * p - ux * p * 0.42);
    c.closePath();
    c.fill();
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
    const encre = css(jetons.encre), accent = css(jetons.accent);

    // ── les deux échelles : ne dépendent QUE de la largeur du dessin ──
    // la piste la plus longue (R = 30 m) tient, avec 2 m devant la moto et
    // 2,5 m après C pour l'angle de sortie
    const RMAX = 30;
    const avant = M.APPROCHE_M * Math.cos((M.BETA_DEG * Math.PI) / 180) + 0.7;
    // 3,4 m après C : l'arc des 18° et son étiquette (à R = 30 m, 2,6 m laissaient
    // « 18° » déborder du cadre — porte `etiquettes`)
    const apres = RMAX * (Math.sin((M.ALPHA_DEG * Math.PI) / 180) + Math.sin((M.BETA_DEG * Math.PI) / 180)) + 3.4;
    const mx = 14;
    const s = (largeur - 2 * mx) / (avant + apres); // px par mètre, isotrope
    // px par m·s⁻² : la plus grande accélération de la scène (32,7 m·s⁻², R = 10 m
    // à 18 m·s⁻¹) tient au-dessus de la piste ; à 0,0085, les flèches de S4
    // (4,50 et 16,2) et leurs étiquettes se serraient dans 60 px (captures v1)
    const k = 0.0115 * largeur;
    echelle = { pxParM: s, pxParMs2: k };
    const ox = mx + avant * s; // B
    // B, à la base : la place est AU-DESSUS (le virage tourne vers le haut) ; 88 px
    // laissent SOUS la piste une rangée d'étiquettes (« B », « a_T ») au-dessus des
    // deux témoins et des leurs — à 60, « B » tombait sur « 10 m·s⁻² » ; à 74, « a_T »
    // n'y tenait plus, montait prendre la place de « u_T », et le nom de u_T se
    // posait, opaque, sur le pied des flèches d'accélération (porte `etiquettes`)
    const oy = Math.round(hauteur - 88);
    const X = (x: number) => ox + x * s;
    const Y = (y: number) => oy - y * s;
    const pt = (l: number, R: number) => {
      const [x, y] = M.position(l, R);
      return [X(x), Y(y)] as [number, number];
    };
    const { R, vB, regime } = e.courant;
    const sArc = M.longueurArc(R);

    // ── la piste ──
    c.strokeStyle = encre;
    c.lineWidth = 3;
    c.lineCap = "round";
    c.beginPath();
    // la droite vient du BORD gauche (un moignon de 10 px arrêté à la marge se
    // lisait comme un tracé coupé — vague 2) ; l'échelle ne bouge pas
    const [xd, yd] = pt(-(ox + 2) / (s * Math.cos((M.BETA_DEG * Math.PI) / 180)), R);
    c.moveTo(xd, yd);
    c.lineTo(ox, oy);
    const pas = 60;
    for (let k2 = 1; k2 <= pas; k2++) {
      const [xa, ya] = pt((k2 / pas) * sArc, R);
      c.lineTo(xa, ya);
    }
    c.stroke();
    c.lineCap = "butt";
    segs.push([P(xd, yd), P(ox, oy)]);
    for (let k2 = 0; k2 < 8; k2++) {
      const [x1, y1] = pt((k2 / 8) * sArc, R), [x2, y2] = pt(((k2 + 1) / 8) * sArc, R);
      segs.push([P(x1, y1), P(x2, y2)]);
    }
    rep["depart"] = P(...pt(-M.APPROCHE_M, R));
    rep["B"] = P(ox, oy);
    const [xc, yc] = pt(sArc, R);
    rep["C"] = P(xc, yc);
    for (let k2 = 0; k2 <= 20; k2++) rep[`arc-${k2}`] = P(...pt((k2 / 20) * sArc, R));

    // B et C : un trait court, perpendiculaire à la piste
    const marque = (l: number) => {
      const th = M.angleTangente(l, R);
      const [x, y] = pt(l, R);
      const nx = -Math.sin(th), ny = -Math.cos(th); // la normale « vers le haut » à l'écran
      c.strokeStyle = encre;
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(x - nx * 6, y - ny * 6);
      c.lineTo(x + nx * 6, y + ny * 6);
      c.stroke();
    };
    marque(0);
    marque(sArc);

    // ── les horizontales et les angles du sujet (10° en B, 18° en C) ──
    c.strokeStyle = css(jetons.encreDouce, 0.8);
    c.lineWidth = 1;
    tirets([4, 3]);
    c.beginPath();
    c.moveTo(ox, oy);
    c.lineTo(ox - 3.2 * s, oy);
    c.moveTo(xc, yc);
    c.lineTo(xc + 2.4 * s, yc);
    // le prolongement de la tangente en C : la piste s'arrête, sa direction non
    const thC = (M.ALPHA_DEG * Math.PI) / 180;
    c.moveTo(xc, yc);
    c.lineTo(xc + 2.4 * s * Math.cos(thC), yc - 2.4 * s * Math.sin(thC));
    c.stroke();
    tirets(null);
    const rB = Math.min(46, 2.6 * s), rC = Math.min(40, 2.1 * s);
    c.strokeStyle = encre;
    c.lineWidth = 1;
    c.beginPath();
    // 10° : entre l'horizontale (vers la gauche) et la piste qui remonte vers la
    // gauche — angles d'ÉCRAN (y vers le bas) : de 180° à 190°
    c.arc(ox, oy, rB, Math.PI, Math.PI + (M.BETA_DEG * Math.PI) / 180);
    c.stroke();
    c.beginPath();
    c.arc(xc, yc, rC, -thC, 0);
    c.stroke();
    const mi10 = Math.PI + (M.BETA_DEG * Math.PI) / 360;
    rep["angle-10"] = P(ox + (rB + 12) * Math.cos(mi10), oy + (rB + 12) * Math.sin(mi10));
    rep["angle-18"] = P(xc + (rC + 10) * Math.cos(thC / 2), yc - (rC + 10) * Math.sin(thC / 2));
    segs.push([P(ox, oy), P(ox - 3.2 * s, oy)], [P(xc, yc), P(xc + 2.4 * s, yc)]);

    // ── les TÉMOINS d'échelle : en bas, à l'encre (l'énoncé) ──
    const yt = hauteur - 16.5;
    const xt = 14;
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(xt, yt);
    c.lineTo(xt + 5 * s, yt);
    c.moveTo(xt, yt - 5);
    c.lineTo(xt, yt + 5);
    c.moveTo(xt + 5 * s, yt - 5);
    c.lineTo(xt + 5 * s, yt + 5);
    c.stroke();
    rep["temoin-m-g"] = P(xt, yt);
    rep["temoin-m-d"] = P(xt + 5 * s, yt);
    rep["temoin-m"] = P(xt + 2.5 * s, yt);
    const xa0 = xt + 5 * s + 64;
    fleche(xa0, yt, xa0 + 10 * k, yt, encre, 1.5, 7);
    rep["temoin-a-g"] = P(xa0, yt);
    rep["temoin-a-d"] = P(xa0 + 10 * k, yt);
    rep["temoin-a"] = P(xa0 + 5 * k, yt);
    // la zone des témoins ET de leurs étiquettes (posées 4 px au-dessus du trait)
    zonesTexte.push({ x0: 0, y0: yt - 28, x1: xa0 + 10 * k + 12, y1: hauteur });

    // ── G, la moto réduite à son centre d'inertie ──
    const l = e.l;
    const [gx, gy] = pt(l, R);
    const th = M.angleTangente(l, R);
    const tx = Math.cos(th), ty = -Math.sin(th); // u_T à l'écran (y vers le bas)
    const nx = -Math.sin(th), ny = -Math.cos(th); // u_N à l'écran : vers le centre (le haut du virage)
    const r = M.lire(vB, R, regime, l);

    // ── la base de Freinet en G : u_T toujours (l'énoncé), u_N après la révélation, dans l'arc ──
    // Les deux vecteurs unitaires sont COLINÉAIRES, par définition, aux deux
    // composantes : de deux flèches superposées, la plus COURTE passe dessus, et
    // les deux se voient. Dessinés toujours par-dessus (première version), u_T et
    // son liseré effaçaient a_T tout entier aux gaz (25 px sous 30 px d'encre) ;
    // toujours dessous (deuxième), u_N disparaissait sous la flèche de S1 — et
    // son étiquette flottait sur rien.
    const uTx = gx + tx * UNITAIRE_PX, uTy = gy + ty * UNITAIRE_PX;
    const uNx = gx + nx * UNITAIRE_PX, uNy = gy + ny * UNITAIRE_PX;
    const avecUN = e.base && !r.droite;
    // la longueur (px) de la flèche d'accent posée le long de +u_T et de +u_N
    const decompose = e.acceleration && e.base && Math.abs(r.aT) > 1e-9 && r.aN > 1e-9;
    const leLongT = !e.acceleration ? 0 : decompose ? Math.max(0, r.aT) * k : r.aN < 1e-9 ? Math.max(0, r.aT) * k : 0;
    const leLongN = !e.acceleration ? 0 : decompose ? r.aN * k : Math.abs(r.aT) < 1e-9 ? r.aN * k : 0;
    const dessus = (L: number) => L > UNITAIRE_PX + 12;
    // u_T est POSÉ SUR la piste (il en porte la tangente) : un liseré de la
    // couleur du fond le détache du trait de la piste — posé AVANT la réponse,
    // pour n'effacer que la piste
    fleche(gx, gy, uTx, uTy, css(jetons.surface), 5, 10);
    const baseFrenet = (auDessus: boolean) => {
      if (dessus(leLongT) === auDessus) fleche(gx, gy, uTx, uTy, encre, 1.5, 7);
      if (avecUN && dessus(leLongN) === auDessus) fleche(gx, gy, uNx, uNy, encre, 1.5, 7);
    };
    baseFrenet(false);
    rep["uT-bout"] = P(uTx, uTy);
    segs.push([P(gx, gy), P(uTx, uTy)]);
    if (avecUN) {
      rep["uN-bout"] = P(uNx, uNy);
      segs.push([P(gx, gy), P(uNx, uNy)]);
    }
    // CONFONDUS : la flèche d'accent finit à moins de 3 px de la pointe du vecteur
    // unitaire — les deux pointes n'en font qu'une, le vecteur unitaire ne se voit
    // plus, et son NOM flotterait sur rien (390 px, S5 : a_N = 7,20 m·s⁻², 29,6 px)
    rep["uT-confondu"] = P(0, 0, Math.abs(leLongT - UNITAIRE_PX) < 3);
    rep["uN-confondu"] = P(0, 0, avecUN && Math.abs(leLongN - UNITAIRE_PX) < 3);

    // ── la RÉPONSE, à l'accent : le vecteur accélération et sa décomposition ──
    const ax = gx + (r.aT * tx + r.aN * nx) * k, ay = gy + (r.aT * ty + r.aN * ny) * k;
    if (e.acceleration && r.a > 1e-9) {
      if (e.base && !r.droite) {
        // le rayon vers le centre du virage, en tirets, jusqu'au bord du cadre
        const [cxm, cym] = M.centre(R);
        const cxp = X(cxm), cyp = Y(cym);
        const dedans = cyp >= RESERVE_LEGENDE + 8;
        const L = Math.hypot(cxp - gx, cyp - gy);
        const tMax = dedans ? 1 : Math.max(0, (gy - (RESERVE_LEGENDE + 8)) / (gy - cyp));
        c.strokeStyle = css(jetons.accent, 0.7);
        c.lineWidth = 1;
        tirets([5, 4]);
        c.beginPath();
        c.moveTo(gx, gy);
        c.lineTo(gx + (cxp - gx) * tMax, gy + (cyp - gy) * tMax);
        c.stroke();
        tirets(null);
        if (dedans) {
          c.fillStyle = accent;
          c.beginPath();
          c.arc(cxp, cyp, 3.5, 0, 2 * Math.PI);
          c.fill();
          // un liseré de fond, comme G : à R = 10 m, la flèche de 34,6 m·s⁻² passe
          // sur le centre (deux échelles), et le point s'y noyait
          c.strokeStyle = css(jetons.surface);
          c.lineWidth = 1.5;
          c.stroke();
        }
        rep["centre"] = P(cxp, cyp, dedans);
        rep["rayon-bout"] = P(gx + (cxp - gx) * tMax, gy + (cyp - gy) * tMax);
        rep["rayon-longueur-px"] = P(L, 0, false);
        segs.push([P(gx, gy), P(gx + (cxp - gx) * tMax, gy + (cyp - gy) * tMax)]);
      }
      if (e.base && Math.abs(r.aT) > 1e-9 && r.aN > 1e-9) {
        // les deux composantes, et le parallélogramme qui les ferme
        const tax = gx + r.aT * tx * k, tay = gy + r.aT * ty * k;
        const nax = gx + r.aN * nx * k, nay = gy + r.aN * ny * k;
        // 0,7 et non 0,55 : un trait porteur de sens tient 3:1 sur le fond (2,4:1 à
        // 0,55 — vague 2) ; le motif [3, 3] le distingue du rayon [5, 4]
        c.strokeStyle = css(jetons.accent, 0.7);
        c.lineWidth = 1;
        tirets([3, 3]);
        c.beginPath();
        c.moveTo(tax, tay);
        c.lineTo(ax, ay);
        c.moveTo(nax, nay);
        c.lineTo(ax, ay);
        c.stroke();
        tirets(null);
        fleche(gx, gy, tax, tay, accent, 2, 7);
        fleche(gx, gy, nax, nay, accent, 2, 7);
        rep["aT-bout"] = P(tax, tay);
        rep["aN-bout"] = P(nax, nay);
        segs.push([P(gx, gy), P(tax, tay)], [P(gx, gy), P(nax, nay)]);
      }
      fleche(gx, gy, ax, ay, accent, 3, 10);
      rep["a-bout"] = P(ax, ay);
      segs.push([P(gx, gy), P(ax, ay)]);
    }

    let refBout: [number, number] | null = null;
    // ── la référence : l'accélération du réglage de départ, au même lieu ──
    // Dessinée APRÈS la réponse : elle lui est colinéaire (S2, S3 : vitesse tenue)
    // et toujours plus courte — sous l'accent, il n'en restait qu'un point noir au
    // milieu de la flèche, qui se lisait comme un défaut (vague 2).
    if (e.base && e.reference) {
      const f = e.reference;
      const rr = M.lire(f.vB, f.R, f.regime, l);
      if (Math.abs(rr.aT - r.aT) > 1e-12 || Math.abs(rr.aN - r.aN) > 1e-12) {
        const [gxr, gyr] = pt(l, f.R);
        const thr = M.angleTangente(l, f.R);
        const txr = Math.cos(thr), tyr = -Math.sin(thr), nxr = -Math.sin(thr), nyr = -Math.cos(thr);
        const ex = gxr + (rr.aT * txr + rr.aN * nxr) * k, ey = gyr + (rr.aT * tyr + rr.aN * nyr) * k;
        c.strokeStyle = encre;
        c.lineWidth = 1.2;
        tirets([4, 3]);
        c.beginPath();
        c.moveTo(gxr, gyr);
        c.lineTo(ex, ey);
        c.stroke();
        tirets(null);
        refBout = [ex, ey];
        rep["ref"] = P(ex, ey);
        segs.push([P(gxr, gyr), P(ex, ey)]);
      }
    }

    // les vecteurs unitaires plus COURTS que la flèche d'accent qui les porte
    baseFrenet(true);
    // le bout de la référence : un ANNEAU, par-dessus tout sauf la moto — à S2 il
    // tombe à 22 px, sur la hampe de u_N (30 px) : un point plein s'y confondait,
    // et le nom « départ » flottait sur rien (vague 2)
    if (refBout) {
      c.fillStyle = css(jetons.surface);
      c.strokeStyle = encre;
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(refBout[0], refBout[1], 3.5, 0, 2 * Math.PI);
      c.fill();
      c.stroke();
    }

    // la moto : un point, par-dessus tout
    c.fillStyle = encre;
    c.beginPath();
    c.arc(gx, gy, 5, 0, 2 * Math.PI);
    c.fill();
    c.strokeStyle = css(jetons.surface);
    c.lineWidth = 1.5;
    c.stroke();
    rep["G"] = P(gx, gy);
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
    echelle: () => echelle,
  };
}
