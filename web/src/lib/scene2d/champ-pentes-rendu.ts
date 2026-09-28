/**
 * champ-pentes-rendu.ts — le rendu Canvas 2D de « ce que l'équation dit en chaque point »
 * (spec docs/pipeline/propositions/maths-equations-differentielles-scene-pentes.md §5.1, §6.2).
 *
 * LE REPÈRE (§5.1). La fenêtre de données est un CARRÉ, x ∈ [−8 ; 4], y ∈ [−6 ; 6], qui ne change
 * jamais ; le facteur px/unité est le MÊME sur les deux axes — un segment de champ est dessiné à
 * l'angle arctan(m), et un repère anisotrope ferait mentir chaque segment en restant juste dans les
 * nombres (§5.1.2). Une MARGE de la moitié d'un segment borde la fenêtre : les segments des
 * rangées du bord (x = −8, x = 4, y = ±6) restent entiers. Le quadrillage est OPAQUE (règle du banc
 * de modulation) et encadre la fenêtre.
 *
 * LA LANGUE VISUELLE (§6.2). À l'ENCRE, l'énoncé : axes, graduations, quadrillage, les segments que
 * l'étape a ouverts, P, le point fixe (0 ; 3) de S2, les trois départs de S5, et la ligne du palier
 * quand l'étape la DONNE (S4, S5). À l'ACCENT, et seulement après l'engagement : la ligne du palier
 * et la rangée plate à S3, la ligne à S6, les courbes. Le champ révélé se pose à l'encre ; l'accent
 * est réservé à la RÉPONSE (pédagogie I9 : 169 marques d'accent d'un coup noyaient la réponse).
 *
 * LES SEGMENTS ONT UNE LONGUEUR FIXE à l'écran (22 px, 16 px sous `COTE_SEGMENTS_COURTS`),
 * quelle que soit la pente — sinon le champ raconterait une intensité que l'équation ne dit pas
 * (§6.2, fit_caveat). Un segment par point entier, à toutes les largeurs : 13 × 13.
 *
 * LES COURBES SONT CLIPPÉES AU CADRE, JAMAIS PLAFONNÉES (§5.3 C) : une courbe qui sort continue
 * hors champ ; aplatie sur le bord, elle dessinerait un palier qui n'existe pas.
 *
 * P EST UN ANNEAU, pas un disque : à S1, la réponse EST le segment qui passe par P, et un disque
 * plein en cachait le milieu — au téléphone, 16 px de segment sous un disque de 11 px n'en
 * laissaient voir que deux bouts de 2,5 px.
 *
 * Ni temps, ni course : rien n'anime.
 */
import { FENETRE } from "./champ-pentes-modele";
import { lireJetons, melange, type RGB } from "../jetons-figure";
import { css, net, P, pointe, type Projection, type Pt, type Zone } from "./plan-repere";
import { tailleTexte } from "./texte";

export type { Projection };

export type DensiteChamp = "aucun" | "un-point" | "ligne" | "plan";

export interface EtatRenduChamp {
  /** le coefficient et le terme constant, en flottants (le dessin seulement) */
  a: number;
  b: number;
  /** le point P, en unités */
  P: Pt;
  /** S2 : le point FIXE (0 ; 3), dessiné à l'encre, sans lettre ; null ailleurs */
  pointFixe: Pt | null;
  /** S2 révélée : le segment au point fixe (sa pente attendait le pari) */
  segmentFixe: boolean;
  /** S5 : les trois départs, des MARQUES sans étiquette (§6.2) */
  departs: Pt[];
  /** les segments tracés : aucun, en P, sur l'horizontale de P, ou sur tout le plan */
  champ: DensiteChamp;
  /** la ligne du palier, à sa hauteur exacte ; `accent` quand elle est la réponse (S3, S6) */
  palier: null | { hauteur: number; accent: boolean };
  /** S3 révélée : la rangée plate à l'accent, avec la ligne */
  rangeePlate: boolean;
  /** les courbes, chacune par son point de passage — toujours à l'accent (les réponses) */
  courbes: Pt[];
  /**
   * la boîte de la LÉGENDE (le badge de l'équation), en px : aucun segment n'y est tracé. Une
   * pastille opaque posée sur le champ en cachait trois ou quatre à S4–S6 — rien sous la légende,
   * c'est la règle du `cadre` de toutes les scènes.
   */
  reserve: { x0: number; y0: number; x1: number; y1: number } | null;
}

export interface RenduChamp {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduChamp): void;
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  zones(): Zone[];
  echelle(): number;
  lier(filets: [{ x: number; y: number }, { x: number; y: number }][]): void;
}

/** Sous ce côté (px), les segments passent de 22 à 16 px, et les nombres des axes d'un pas de 1 à 2. */
export const COTE_SEGMENTS_COURTS = 540;
/** La longueur (px) d'un segment de champ — FIXE, quelle que soit la pente. */
export const longueurSegment = (cote: number) => (cote < COTE_SEGMENTS_COURTS ? 16 : 22);

export interface GeometrieChamp {
  s: number;
  X: (x: number) => number;
  Y: (y: number) => number;
  /** le cadre de la fenêtre de données, en px */
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  cote: number;
}

/** L'échelle ISOTROPE : la fenêtre 12 × 12, une marge d'un demi-segment, l'origine sur un demi-pixel. */
export function geometrieChamp(largeur: number, hauteur: number): GeometrieChamp {
  const cote = Math.min(largeur, hauteur);
  const marge = longueurSegment(cote) / 2 + 2;
  const [xa, xb] = FENETRE.x, [ya, yb] = FENETRE.y;
  const s = (cote - 2 * marge) / Math.max(xb - xa, yb - ya);
  const gx = (largeur - (xb - xa) * s) / 2, gy = (hauteur - (yb - ya) * s) / 2;
  const ox = Math.floor(gx - xa * s) + 0.5, oy = Math.floor(gy + yb * s) + 0.5;
  const X = (x: number) => ox + x * s, Y = (y: number) => oy - y * s;
  return { s, X, Y, x0: X(xa), x1: X(xb), y0: Y(yb), y1: Y(ya), cote };
}

export function creerRenduChamp(canvas: HTMLCanvasElement, hote: HTMLElement): RenduChamp {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 480, dpr = 1;
  let etat: EtatRenduChamp | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zones: Zone[] = [];
  let s = 1;
  const voile = (c: RGB, a: number) => css(melange(jetons.surface, c, a));

  function rendre() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = css(jetons.surface);
    c.fillRect(0, 0, largeur, hauteur);
    rep = {};
    segs = [];
    zones = [];
    if (!etat) return;
    const e = etat;
    const g = geometrieChamp(largeur, hauteur);
    const { X, Y, x0, x1, y0, y1, cote } = g;
    s = g.s;
    const xa: number = FENETRE.x[0], xb: number = FENETRE.x[1], ya: number = FENETRE.y[0], yb: number = FENETRE.y[1];
    const encre = css(jetons.encre), accent = css(jetons.accent);

    // ── le quadrillage, OPAQUE, qui encadre la fenêtre ──
    c.lineWidth = 1;
    c.strokeStyle = voile(jetons.encreDouce, 0.16);
    c.beginPath();
    for (let k = xa; k <= xb; k++) {
      if (k === 0) continue;
      c.moveTo(net(X(k)), net(y0));
      c.lineTo(net(X(k)), net(y1));
    }
    for (let k = ya; k <= yb; k++) {
      if (k === 0) continue;
      c.moveTo(net(x0), net(Y(k)));
      c.lineTo(net(x1), net(Y(k)));
    }
    c.stroke();

    // ── les axes, à l'encre, avec leur pointe ──
    const ax = net(X(0)), ay = net(Y(0));
    c.strokeStyle = encre;
    c.fillStyle = encre;
    c.beginPath();
    c.moveTo(net(x0), ay);
    c.lineTo(largeur - 2, ay);
    c.moveTo(ax, net(y1));
    c.lineTo(ax, 2);
    c.stroke();
    pointe(c, largeur - 2, ay, 1, 0);
    pointe(c, ax, 2, 0, -1);
    segs.push([P(x0, ay), P(largeur, ay)], [P(ax, 0), P(ax, y1)]);
    zones.push({ x0: x0, y0: ay - 5, x1: largeur, y1: ay + 5, traversable: true }, { x0: ax - 5, y0: 0, x1: ax + 5, y1: y1, traversable: true });
    rep["axe-x-droite"] = P(largeur - 2, ay);
    rep["axe-y-haut"] = P(ax, 2);

    // ── les graduations entières, et leurs nombres (tous les 1, ou tous les 2 au téléphone) ──
    const pas = cote < COTE_SEGMENTS_COURTS ? 2 : 1;
    const h = tailleTexte(12);
    c.font = `${h}px ${police}`;
    c.beginPath();
    for (let k = xa; k <= xb; k++) {
      if (k === 0) continue;
      c.moveTo(net(X(k)), ay - 3);
      c.lineTo(net(X(k)), ay + 4);
    }
    for (let k = ya; k <= yb; k++) {
      if (k === 0) continue;
      c.moveTo(ax - 4, net(Y(k)));
      c.lineTo(ax + 3, net(Y(k)));
    }
    c.stroke();
    // aucun nombre sous un point : l'étiquette du point dit déjà ses coordonnées
    const marques: Pt[] = [e.P, ...(e.pointFixe ? [e.pointFixe] : []), ...e.departs];
    const sousUnPoint = (b: Zone) => marques.some(([mx, my]) => X(mx) > b.x0 - 8 && X(mx) < b.x1 + 8 && Y(my) > b.y0 - 8 && Y(my) < b.y1 + 8);
    const nombre = (k: number) => (k < 0 ? `−${-k}` : `${k}`);
    c.textAlign = "center";
    c.textBaseline = "top";
    for (let k = xa + 1; k < xb; k++) {
      if (k === 0 || k % pas !== 0) continue;
      const t = nombre(k), w = c.measureText(t).width;
      rep[`grad-x${k}`] = P(X(k), ay);
      const b = { x0: X(k) - w / 2 - 1, y0: ay + 5, x1: X(k) + w / 2 + 1, y1: ay + 8 + h };
      if (sousUnPoint(b)) continue;
      c.fillText(t, X(k), ay + 6);
      zones.push(b);
    }
    c.textAlign = "right";
    c.textBaseline = "middle";
    for (let k = ya + 1; k < yb; k++) {
      if (k === 0 || k % pas !== 0) continue;
      const t = nombre(k), w = c.measureText(t).width;
      rep[`grad-y${k}`] = P(ax, Y(k));
      const b = { x0: ax - 8 - w, y0: Y(k) - (h * 2) / 3, x1: ax - 6, y1: Y(k) + (h * 2) / 3 };
      if (sousUnPoint(b)) continue;
      c.fillText(t, ax - 7, Y(k));
      zones.push(b);
    }
    c.textAlign = "right";
    c.textBaseline = "top";
    c.fillText("O", ax - 5, ay + 5);
    zones.push({ x0: ax - 16 - (h - 12), y0: ay + 4, x1: ax - 4, y1: ay + 8 + h });
    rep["origine"] = P(X(0), Y(0));
    rep["coin-hg"] = P(x0, y0);
    rep["coin-bd"] = P(x1, y1);

    // ── les segments du champ : longueur FIXE, à l'angle exact arctan(a·y + b) ──
    const L = longueurSegment(cote);
    const r = e.reserve;
    const segment = (x: number, y: number, couleur: string, epaisseur: number, obstacle: boolean) => {
      const m = e.a * y + e.b;
      const n = Math.hypot(1, m);
      const dx = (L / 2) / n, dy = (L / 2) * (m / n);
      const cx = X(x), cy = Y(y);
      if (r && cx + L / 2 + 2 > r.x0 && cx - L / 2 - 2 < r.x1 && cy + L / 2 + 2 > r.y0 && cy - L / 2 - 2 < r.y1) return;
      c.strokeStyle = couleur;
      c.lineWidth = epaisseur;
      c.beginPath();
      c.moveTo(cx - dx, cy + dy);
      c.lineTo(cx + dx, cy - dy);
      c.stroke();
      if (obstacle) segs.push([P(cx - dx, cy + dy), P(cx + dx, cy - dy)]);
    };
    const encreChamp = voile(jetons.encre, 0.78);
    const surLaRangee = (y: number) => e.rangeePlate && e.palier !== null && Math.abs(y - e.palier.hauteur) < 1e-9;
    const [px, py] = e.P;
    c.lineCap = "round";
    if (e.champ === "plan" || e.champ === "ligne") {
      for (let j = ya; j <= yb; j++) {
        if (e.champ === "ligne" && j !== py) continue;
        for (let i = xa; i <= xb; i++) {
          if (surLaRangee(j)) continue;
          // le segment en P est un OBSTACLE pour les étiquettes (à S1 et S2, c'est la réponse)
          segment(i, j, encreChamp, 1.5, i === px && j === py);
        }
      }
    } else if (e.champ === "un-point") segment(px, py, encreChamp, 1.5, true);
    // le segment du point fixe (S2 révélée), s'il n'est pas déjà dans ce que le champ a tracé
    const dejaTrace = (x: number, y: number) => e.champ === "plan" || (e.champ === "ligne" && y === py) || (e.champ === "un-point" && x === px && y === py);
    if (e.segmentFixe && e.pointFixe && !dejaTrace(e.pointFixe[0], e.pointFixe[1])) segment(e.pointFixe[0], e.pointFixe[1], encreChamp, 1.5, true);
    // la rangée plate (S3 révélée) : à l'ACCENT, par-dessus
    if (e.rangeePlate && e.palier) for (let i = xa; i <= xb; i++) segment(i, e.palier.hauteur, accent, 2, true);
    c.lineCap = "butt";

    // ── la ligne du palier, en tirets, sur toute la largeur de la fenêtre ──
    if (e.palier) {
      const yk = Y(e.palier.hauteur);
      c.strokeStyle = e.palier.accent ? accent : encre;
      c.lineWidth = e.palier.accent ? 2 : 1.5;
      c.setLineDash([7, 5]);
      c.beginPath();
      c.moveTo(x0, yk);
      c.lineTo(x1, yk);
      c.stroke();
      c.setLineDash([]);
      segs.push([P(x0, yk), P(x1, yk)]);
      rep["palier-gauche"] = P(x0, yk);
      rep["palier-droite"] = P(x1, yk);
      // l'ancre de l'étiquette : à gauche, où aucune courbe ne passe (table C : elles sortent avant x ≈ −3,2)
      rep["palier-etiquette"] = P(X(-6.5), yk);
    }

    // ── les courbes : à l'ACCENT, CLIPPÉES au cadre de la fenêtre, jamais plafonnées ──
    if (e.courbes.length > 0) {
      c.save();
      c.beginPath();
      c.rect(x0, y0, x1 - x0, y1 - y0);
      c.clip();
      c.strokeStyle = accent;
      c.lineWidth = 2.5;
      c.lineJoin = "round";
      const k = -e.b / e.a;
      for (const [cx0, cy0] of e.courbes) {
        const f = (x: number) => k + (cy0 - k) * Math.exp(e.a * (x - cx0));
        c.beginPath();
        let dedans = false;
        let prec: Projection | null = null;
        for (let sx = Math.floor(x0); sx <= Math.ceil(x1); sx++) {
          const x = (sx - X(0)) / s;
          const y = f(x);
          // hors d'une large bande autour du cadre, on lève le crayon (le clip coupe le reste)
          if (!(y > ya - 2 && y < yb + 2)) {
            dedans = false;
            prec = null;
            continue;
          }
          const q = P(sx, Y(y));
          if (!dedans) c.moveTo(q.x, q.y);
          else c.lineTo(q.x, q.y);
          if (prec && q.y > y0 - 4 && q.y < y1 + 4 && prec.y > y0 - 4 && prec.y < y1 + 4 && (sx % 4 === 0)) segs.push([prec, q]);
          if (sx % 4 === 0) prec = q;
          dedans = true;
        }
        c.stroke();
      }
      c.restore();
    }

    // ── les points, à l'encre ──
    // les trois départs de S5 : des disques pleins, sans étiquette
    for (const [dx, dy] of e.departs) {
      const x = X(dx), y = Y(dy);
      c.fillStyle = css(jetons.surface);
      c.beginPath();
      c.arc(x, y, 5, 0, 2 * Math.PI);
      c.fill();
      c.fillStyle = encre;
      c.beginPath();
      c.arc(x, y, 3.5, 0, 2 * Math.PI);
      c.fill();
      zones.push({ x0: x - 6, y0: y - 6, x1: x + 6, y1: y + 6 });
      rep[`depart-${dx}-${dy}`] = P(x, y);
    }
    // le point fixe (S2) et P : des ANNEAUX — le segment qui les traverse reste lisible
    const anneau = (x: number, y: number) => {
      c.strokeStyle = encre;
      c.lineWidth = 1.75;
      c.beginPath();
      c.arc(x, y, 5.5, 0, 2 * Math.PI);
      c.stroke();
      zones.push({ x0: x - 7, y0: y - 7, x1: x + 7, y1: y + 7 });
    };
    if (e.pointFixe) {
      anneau(X(e.pointFixe[0]), Y(e.pointFixe[1]));
      rep["point-fixe"] = P(X(e.pointFixe[0]), Y(e.pointFixe[1]));
    }
    anneau(X(px), Y(py));
    rep["point-P"] = P(X(px), Y(py));
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
    zones: () => zones,
    echelle: () => s,
    lier(filets) {
      const c = ctx!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.strokeStyle = voile(jetons.encreDouce, 0.8);
      c.lineWidth = 1;
      c.beginPath();
      for (const [a, b] of filets) {
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
      }
      c.stroke();
    },
  };
}
