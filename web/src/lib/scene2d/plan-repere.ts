/**
 * plan-repere.ts — le REPÈRE du plan complexe, peint une fois pour deux scènes :
 * `plan-complexe-transformation` (R5) et `plan-complexe-rapport` (R6).
 *
 * Extrait tel quel de `plan-complexe-rendu.ts` (2026-09-25) quand la seconde scène
 * en a eu besoin : le quadrillage OPAQUE, les deux axes et leur pointe, les
 * graduations entières et leurs nombres (tous les 1, ou tous les 2 sous
 * `COTE_GRADUATIONS_FINES`), O, les vecteurs u⃗ et v⃗ nommés quand il y a la
 * place, et — sur demande — le cercle unité. Rien de ce module ne dépend de ce
 * que la scène raconte : il peint l'ÉNONCÉ commun, à l'encre.
 *
 * Les règles qu'il porte, toutes payées par la scène R5 : l'origine sur un
 * DEMI-pixel (les axes et les points partent du même zéro) ; les bandes des
 * graduations traversables par un filet mais pas par une pastille ; aucun nombre
 * d'axe peint sous un point (l'étiquette du point dit déjà ce nombre) ; tout
 * opaque (`voile`), jamais d'alpha.
 */
import { melange, type JetonsFigure as Jetons, type RGB } from "../jetons-figure";
import { tailleTexte } from "./texte";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}
export interface Zone {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  traversable?: boolean;
}
export type Pt = [number, number];

/** Sous ce côté (px), les nombres des axes ne sont écrits que tous les deux (§6.2). */
export const COTE_GRADUATIONS_FINES = 540;

export interface Geometrie {
  largeur: number;
  hauteur: number;
  /** px par unité — la MÊME sur les deux axes */
  s: number;
  X: (x: number) => number;
  Y: (y: number) => number;
  cote: number;
}

/** L'échelle isotrope et l'origine sur un demi-pixel (voir l'en-tête). */
export function geometrie(largeur: number, hauteur: number, fenetre: number): Geometrie {
  const cote = Math.min(largeur, hauteur);
  const s = cote / (2 * fenetre);
  const ox = Math.floor(largeur / 2) + 0.5, oy = Math.floor(hauteur / 2) + 0.5;
  return { largeur, hauteur, s, X: (x) => ox + x * s, Y: (y) => oy - y * s, cote };
}

export const css = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`;
export const net = (v: number) => Math.round(v - 0.5) + 0.5;
export const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });

/** une pointe de flèche pleine, dirigée par (dx, dy) unitaire, de longueur t */
export function pointe(c: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, t = 7) {
  const nx = -dy, ny = dx;
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x - dx * t + nx * t * 0.42, y - dy * t + ny * t * 0.42);
  c.lineTo(x - dx * t - nx * t * 0.42, y - dy * t - ny * t * 0.42);
  c.closePath();
  c.fill();
}

export interface Repere {
  rep: Record<string, Projection>;
  segs: [Projection, Projection][];
  zones: Zone[];
}

/**
 * Peint le repère. `marques` : les points (en unités) sous lesquels aucun nombre d'axe
 * ne s'écrit. `cercleUnite` : l'étalon, tracé ou non (R6 ne le trace qu'en mode `lieu`).
 */
export function peindreRepere(
  c: CanvasRenderingContext2D,
  g: Geometrie,
  jetons: Jetons,
  police: string,
  fenetre: number,
  marques: Pt[],
  cercleUnite: boolean,
): Repere {
  const { largeur, hauteur, s, X, Y, cote } = g;
  const rep: Record<string, Projection> = {};
  const segs: [Projection, Projection][] = [];
  const zones: Zone[] = [];
  const voile = (col: RGB, a: number) => css(melange(jetons.surface, col, a));
  const demiX = largeur / 2 / s, demiY = hauteur / 2 / s;
  const encre = css(jetons.encre);

  // ── le quadrillage, OPAQUE, sous tout le reste ──
  c.lineWidth = 1;
  c.strokeStyle = voile(jetons.encreDouce, 0.16);
  c.beginPath();
  for (let k = -Math.floor(demiX); k <= Math.floor(demiX); k++) {
    if (k === 0) continue;
    c.moveTo(net(X(k)), 0);
    c.lineTo(net(X(k)), hauteur);
  }
  for (let k = -Math.floor(demiY); k <= Math.floor(demiY); k++) {
    if (k === 0) continue;
    c.moveTo(0, net(Y(k)));
    c.lineTo(largeur, net(Y(k)));
  }
  c.stroke();

  // ── les axes, à l'encre, avec leur pointe ──
  const x0 = net(X(0)), y0 = net(Y(0));
  c.strokeStyle = encre;
  c.fillStyle = encre;
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(0, y0);
  c.lineTo(largeur - 1, y0);
  c.moveTo(x0, hauteur);
  c.lineTo(x0, 1);
  c.stroke();
  pointe(c, largeur - 1, y0, 1, 0);
  pointe(c, x0, 1, 0, -1);
  segs.push([P(0, y0), P(largeur, y0)], [P(x0, 0), P(x0, hauteur)]);
  // les traits des graduations dépassent de 4 px de part et d'autre de l'axe : une bande
  // qu'aucune pastille ne recouvre (captures : « M(4) » mordait sur un trait)
  // traversables par un FILET (qui coupe alors l'axe, un trait comme un autre) : la bande
  // n'écarte que les PASTILLES des graduations
  zones.push({ x0: 0, y0: y0 - 5, x1: largeur, y1: y0 + 5, traversable: true }, { x0: x0 - 5, y0: 0, x1: x0 + 5, y1: hauteur, traversable: true });
  rep["axe-x-droite"] = P(largeur - 1, y0);
  rep["axe-y-haut"] = P(x0, 1);

  // ── les graduations entières, et leurs nombres (tous les 1, ou tous les 2 au téléphone) ──
  const pas = cote < COTE_GRADUATIONS_FINES ? 2 : 1;
  // la taille suit le réglage du lecteur (texte.ts) ; les zones d'occupation des nombres, avec elle
  const h = tailleTexte(12);
  c.font = `${h}px ${police}`;
  c.fillStyle = encre;
  const nombre = (k: number) => (k < 0 ? `−${-k}` : `${k}`);
  c.beginPath();
  for (let k = -Math.floor(demiX) + 1; k < demiX; k++) {
    if (k === 0) continue;
    c.moveTo(net(X(k)), y0 - 3);
    c.lineTo(net(X(k)), y0 + 4);
  }
  for (let k = -Math.floor(demiY) + 1; k < demiY; k++) {
    if (k === 0) continue;
    c.moveTo(x0 - 4, net(Y(k)));
    c.lineTo(x0 + 3, net(Y(k)));
  }
  c.stroke();
  // les nombres de l'axe réel, SOUS l'axe ; ceux de l'axe imaginaire, à GAUCHE — sauf celui
  // qu'un POINT recouvrirait : M en 2i posait son disque sur le « 2 » de l'axe imaginaire, et
  // l'étiquette du point dit déjà ce nombre (vague 2, dessin)
  const px = marques.map((p) => [X(p[0]), Y(p[1])] as const);
  const sousUnPoint = (b: Zone) => px.some(([x, y]) => x > b.x0 - 7 && x < b.x1 + 7 && y > b.y0 - 7 && y < b.y1 + 7);
  c.textAlign = "center";
  c.textBaseline = "top";
  for (let k = -fenetre + 1; k < fenetre; k++) {
    if (k === 0 || k % pas !== 0) continue;
    const t = nombre(k), w = c.measureText(t).width;
    rep[`grad-x${k}`] = P(X(k), y0);
    const b = { x0: X(k) - w / 2 - 1, y0: y0 + 5, x1: X(k) + w / 2 + 1, y1: y0 + 8 + h };
    if (sousUnPoint(b)) continue;
    c.fillText(t, X(k), y0 + 6);
    zones.push(b);
  }
  c.textAlign = "right";
  c.textBaseline = "middle";
  for (let k = -fenetre + 1; k < fenetre; k++) {
    if (k === 0 || k % pas !== 0) continue;
    const t = nombre(k), w = c.measureText(t).width;
    rep[`grad-y${k}`] = P(x0, Y(k));
    const b = { x0: x0 - 8 - w, y0: Y(k) - (h * 2) / 3, x1: x0 - 6, y1: Y(k) + (h * 2) / 3 };
    if (sousUnPoint(b)) continue;
    c.fillText(t, x0 - 7, Y(k));
    zones.push(b);
  }
  // O, en bas à gauche de l'origine
  c.textAlign = "right";
  c.textBaseline = "top";
  c.fillText("O", x0 - 5, y0 + 5);
  zones.push({ x0: x0 - 16 - (h - 12), y0: y0 + 4, x1: x0 - 4, y1: y0 + 8 + h });
  rep["origine"] = P(X(0), Y(0));

  // les deux vecteurs du repère, u⃗ et v⃗, nommés quand il y a la place
  if (pas === 1) {
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(X(0), y0);
    c.lineTo(X(1) - 5, y0);
    c.moveTo(x0, Y(0));
    c.lineTo(x0, Y(1) + 5);
    c.stroke();
    pointe(c, X(1), y0, 1, 0, 6);
    pointe(c, x0, Y(1), 0, -1, 6);
    c.lineWidth = 1;
    const nomVecteur = (lettre: string, x: number, y: number) => {
      c.font = `italic 13px ${police}`;
      c.textAlign = "center";
      c.textBaseline = "alphabetic";
      c.fillText(lettre, x, y);
      const w = c.measureText(lettre).width;
      // la flèche au-dessus de la lettre
      c.beginPath();
      c.moveTo(x - w / 2 - 1, y - 11.5);
      c.lineTo(x + w / 2 + 2, y - 11.5);
      c.stroke();
      c.beginPath();
      c.moveTo(x + w / 2 + 3, y - 11.5);
      c.lineTo(x + w / 2 - 0.5, y - 13.5);
      c.lineTo(x + w / 2 - 0.5, y - 9.5);
      c.closePath();
      c.fill();
      zones.push({ x0: x - w / 2 - 2, y0: y - 16, x1: x + w / 2 + 4, y1: y + 3 });
    };
    nomVecteur("u", X(0.5), y0 - 5);
    nomVecteur("v", x0 + 9, Y(0.5) + 5);
    c.font = `${tailleTexte(12)}px ${police}`;
  }

  // ── le cercle unité : l'étalon ──
  if (cercleUnite) {
    c.strokeStyle = voile(jetons.encreDouce, 0.85);
    c.lineWidth = 1;
    c.beginPath();
    c.arc(X(0), Y(0), s, 0, 2 * Math.PI);
    c.stroke();
    // le cercle unité est un TRACÉ : les étiquettes l'évitent comme un trait
    for (let j = 0; j < 24; j++) {
      const a = (j * Math.PI) / 12, b = ((j + 1) * Math.PI) / 12;
      segs.push([P(X(Math.cos(a)), Y(Math.sin(a))), P(X(Math.cos(b)), Y(Math.sin(b)))]);
    }
    rep["cercle-e"] = P(X(1), Y(0));
    rep["cercle-n"] = P(X(0), Y(1));
    rep["cercle-o"] = P(X(-1), Y(0));
    rep["cercle-s"] = P(X(0), Y(-1));
  }
  rep["coin-hg"] = P(X(-fenetre), Y(fenetre));
  rep["coin-bd"] = P(X(fenetre), Y(-fenetre));
  return { rep, segs, zones };
}
