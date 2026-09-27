/**
 * plan-complexe-rendu.ts — le rendu Canvas 2D du « plan complexe »
 * (spec docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md
 * §5.1, §6.2).
 *
 * ISOTROPE, FIXE, CARRÉ (§5.1). La fenêtre de données est [−9 ; 9]², et le
 * facteur px/unité est LE MÊME sur les deux axes, à tout instant et à toute
 * largeur : si le plateau n'était pas carré, la fenêtre s'étendrait du côté
 * qui a de la place, jamais un axe seul. Le cercle unité est l'étalon — c'est
 * lui qui rend « |c| = 1 » lisible sans un nombre, et c'est lui qui trahirait
 * une échelle différente en x et en y (le défaut réel du 2026-08-14 dans cette
 * notion : 36,9 % d'écart entre un rayon écran et la distance qu'il figurait).
 *
 * LA LANGUE VISUELLE (§6.2). À l'ENCRE, l'énoncé : les axes, leurs graduations
 * et leurs nombres, O, le cercle unité, le centre DONNÉ, le point M et son
 * segment — et M' quand la consigne le donne (S3, S5). À l'ACCENT, et
 * seulement après l'engagement : M', son segment, l'ARC de l'angle, l'anneau du
 * point fixe, le centre CHERCHÉ (S5, qui n'a aucune existence avant).
 *
 * L'ARC est tracé à un rayon FIXE, indépendant de ΩM (déclaré au fit_caveat) :
 * il part de la direction ΩM et arrive à la direction ΩM' — jamais de l'axe
 * réel, qui est la misconception même que la scène combat (`angle-lu-depuis-
 * l-axe`). Une pointe dit son SENS.
 *
 * TOUT EST PEINT OPAQUE (`voile`), le quadrillage d'abord : un trait
 * semi-transparent dont les sous-chemins se croisent est composé deux fois par
 * Chromium, et chaque nœud d'une grille à 30 % devient un point à 51 % (le
 * banc de modulation, ADR 0041 addendum point 6). Cette scène naît du bon côté.
 *
 * Ni temps, ni course, ni three.js : rien n'anime. Le seul mouvement est celui
 * que la main fait (le balayage de S3), et le panneau le calcule.
 *
 * Les couleurs sont lues dans les jetons (`lib/jetons-figure.ts`).
 */
import { FENETRE } from "./plan-complexe-modele";
import { lireJetons, melange, type RGB } from "../jetons-figure";
import { COTE_GRADUATIONS_FINES, geometrie, peindreRepere, pointe as pointeSur, type Projection, type Pt } from "./plan-repere";

export type { Projection };
export { COTE_GRADUATIONS_FINES };

export interface EtatRenduPlan {
  /** M, en unités du plan */
  m: Pt;
  /** M' ; null tant qu'il n'est pas montré */
  mp: Pt | null;
  /** M' est-il l'ÉNONCÉ (S3, S5 : la consigne le donne) ? encre ; sinon accent */
  mpEncre: boolean;
  /** le centre de la transformation ; null tant qu'il n'existe pas (S5 avant la révélation) */
  centre: Pt | null;
  /** le centre est-il la RÉPONSE (cherché, S5) ? accent ; sinon encre (donné) */
  centreAccent: boolean;
  /** l'anneau du point fixe, quand il est la réponse (S4, S5) */
  anneau: boolean;
  /** l'angle de la transformation en douzièmes de π, tracé de ΩM vers ΩM' ; null : pas d'arc */
  arc: number | null;
}

export interface RenduPlan {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduPlan): void;
  /** les repères, en pixels CSS du canvas (la porte les lit ; les étiquettes s'y posent) */
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  /** les nombres des axes : aucune étiquette ne s'y pose */
  zones(): { x0: number; y0: number; x1: number; y1: number; traversable?: boolean }[];
  /** px par unité (la porte la LIT sur le cercle unité et les graduations ; ceci ne sert qu'aux étiquettes) */
  echelle(): number;
  /** trace, PAR-DESSUS l'image rendue, les filets qui relient une étiquette éloignée à son point */
  lier(filets: [{ x: number; y: number }, { x: number; y: number }][]): void;
}

/**
 * Le rayon (px) de l'arc de l'angle : FIXE, quelle que soit la distance ΩM (§6.2) —
 * et loin du cercle unité (1 unité ≈ 0,056 du côté) : à 22 px sur un plateau de 440,
 * l'arc se posait presque SUR le cercle et se lisait comme un morceau de lui
 * (captures de construction). ≈ 1,8 unité.
 */
export const rayonArc = (cote: number) => Math.round(Math.min(56, Math.max(34, 0.1 * cote)));

export function creerRenduPlan(canvas: HTMLCanvasElement, hote: HTMLElement): RenduPlan {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 480, dpr = 1;
  let etat: EtatRenduPlan | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zonesNombres: { x0: number; y0: number; x1: number; y1: number; traversable?: boolean }[] = [];
  let s = 1;

  const css = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`;
  /** une teinte OPAQUE, mélangée à la surface (jamais d'alpha : §6.2) */
  const voile = (c: RGB, a: number) => css(melange(jetons.surface, c, a));
  const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });

  function rendre() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = css(jetons.surface);
    c.fillRect(0, 0, largeur, hauteur);
    rep = {};
    segs = [];
    zonesNombres = [];
    if (!etat) return;
    const e = etat;
    // ISOTROPE : une seule échelle, lue sur le plus petit côté ; l'autre s'étend ; l'origine
    // sur un DEMI-pixel (plan-repere.ts, extrait de ce fichier le 2026-09-25 pour la scène R6)
    const g = geometrie(largeur, hauteur, FENETRE);
    const { cote, X, Y } = g;
    s = g.s;
    const encre = css(jetons.encre), accent = css(jetons.accent);
    const pointe = (x: number, y: number, dx: number, dy: number, t = 7) => pointeSur(c, x, y, dx, dy, t);
    // le repère — quadrillage opaque, axes, graduations et nombres (aucun sous un point), O,
    // u⃗ et v⃗, le cercle unité : l'étalon
    const r0 = peindreRepere(c, g, jetons, police, FENETRE, [e.m, e.mp, e.centre].filter((p): p is Pt => p !== null), true);
    rep = r0.rep;
    segs = r0.segs;
    zonesNombres = r0.zones;
    c.font = `12px ${police}`;

    const ctr: Pt = e.centre ?? [0, 0];
    const cx = X(ctr[0]), cy = Y(ctr[1]);

    // ── les segments : du centre à M (encre), du centre à M' ──
    // De deux segments COLINÉAIRES (c réel positif : M' sur la demi-droite [ΩM)), le
    // plus court est tracé DESSUS — sinon l'accent de ΩM' recouvre l'encre de ΩM, et
    // l'énoncé disparaît sous la réponse (règle du tremplin ; captures, S1).
    if (e.centre) {
      c.lineWidth = 1.5;
      c.lineCap = "round";
      const traits: { p: Pt; couleur: string }[] = [{ p: e.m, couleur: encre }];
      if (e.mp) traits.push({ p: e.mp, couleur: e.mpEncre ? encre : accent });
      const long = (p: Pt) => Math.hypot(p[0] - ctr[0], p[1] - ctr[1]);
      for (const { p, couleur } of [...traits].sort((a, b) => long(b.p) - long(a.p))) {
        c.strokeStyle = couleur;
        c.beginPath();
        c.moveTo(cx, cy);
        c.lineTo(X(p[0]), Y(p[1]));
        c.stroke();
        segs.push([P(cx, cy), P(X(p[0]), Y(p[1]))]);
      }
      c.lineCap = "butt";
    }
    // (S5 avant la révélation : aucun centre, donc aucun segment — les deux points seuls)

    // ── l'arc de l'angle : de la direction ΩM à la direction ΩM', rayon FIXE ──
    if (e.arc !== null && e.arc !== 0 && e.centre) {
      const R = rayonArc(cote);
      const th1 = Math.atan2(e.m[1] - ctr[1], e.m[0] - ctr[0]);
      const phi = (e.arc * Math.PI) / 12;
      const th2 = th1 + phi;
      // une direction plus courte que l'arc se PROLONGE en tirets jusqu'à lui : l'arc
      // relie deux directions, pas deux points (M en 1 + i est à 1,4 unité du centre)
      c.strokeStyle = voile(jetons.encreDouce, 0.7);
      c.lineWidth = 1;
      c.setLineDash([3, 3]);
      for (const p of e.mp ? [e.m, e.mp] : [e.m]) {
        const d = Math.hypot(p[0] - ctr[0], p[1] - ctr[1]) * s;
        if (d > 0 && d < R + 8) {
          const ux = (p[0] - ctr[0]) / (d / s), uy = (p[1] - ctr[1]) / (d / s);
          c.beginPath();
          c.moveTo(cx + ux * d, cy - uy * d);
          c.lineTo(cx + ux * (R + 8), cy - uy * (R + 8));
          c.stroke();
          segs.push([P(cx + ux * d, cy - uy * d), P(cx + ux * (R + 8), cy - uy * (R + 8))]);
        }
      }
      c.setLineDash([]);
      // le canvas compte les angles dans le sens HORAIRE (y vers le bas) : un angle
      // positif du plan se trace dans le sens anti-horaire de l'écran
      c.strokeStyle = accent;
      c.fillStyle = accent;
      c.lineWidth = 1.75;
      c.beginPath();
      const pointeRad = Math.min(Math.abs(phi) * 0.4, 7 / R);
      const finTrait = th2 - Math.sign(phi) * pointeRad;
      c.arc(cx, cy, R, -th1, -finTrait, phi > 0);
      c.stroke();
      // la pointe, tangente à l'arc, à son extrémité
      const ex = cx + R * Math.cos(th2), ey = cy - R * Math.sin(th2);
      const tx = -Math.sin(th2) * Math.sign(phi), ty = -Math.cos(th2) * Math.sign(phi);
      pointe(ex, ey, tx, ty, 7);
      zonesNombres.push({ x0: ex - 6, y0: ey - 6, x1: ex + 6, y1: ey + 6 });
      const mil = th1 + phi / 2;
      rep["arc-debut"] = P(cx + R * Math.cos(th1), cy - R * Math.sin(th1));
      rep["arc-fin"] = P(ex, ey);
      rep["arc-milieu"] = P(cx + R * Math.cos(mil), cy - R * Math.sin(mil));
      // l'ancre de l'étiquette : un peu au-delà de l'arc, sur sa bissectrice
      rep["arc-etiquette"] = P(cx + (R + 14) * Math.cos(mil), cy - (R + 14) * Math.sin(mil));
      // l'arc est un tracé : les étiquettes l'évitent comme un trait
      for (let j = 0; j < 6; j++) {
        const a = th1 + (phi * j) / 6, b = th1 + (phi * (j + 1)) / 6;
        segs.push([P(cx + R * Math.cos(a), cy - R * Math.sin(a)), P(cx + R * Math.cos(b), cy - R * Math.sin(b))]);
      }
    }

    // ── les points ──
    const disque = (p: Pt, couleur: string, r = 4) => {
      c.fillStyle = css(jetons.surface);
      c.beginPath();
      c.arc(X(p[0]), Y(p[1]), r + 1.5, 0, 2 * Math.PI);
      c.fill();
      c.fillStyle = couleur;
      c.beginPath();
      c.arc(X(p[0]), Y(p[1]), r, 0, 2 * Math.PI);
      c.fill();
      // un point est un OBJET : aucune pastille ne le couvre (captures : « M′ » posée sur M)
      zonesNombres.push({ x0: X(p[0]) - r - 2, y0: Y(p[1]) - r - 2, x1: X(p[0]) + r + 2, y1: Y(p[1]) + r + 2 });
    };
    if (e.mp) {
      disque(e.mp, e.mpEncre ? encre : accent);
      rep["mp"] = P(X(e.mp[0]), Y(e.mp[1]));
    }
    disque(e.m, encre);
    rep["m"] = P(X(e.m[0]), Y(e.m[1]));
    if (e.centre) {
      // le centre O est l'origine : il n'a pas d'autre marque que les axes
      if (ctr[0] !== 0 || ctr[1] !== 0) {
        c.fillStyle = e.centreAccent ? accent : encre;
        const r = 3.5;
        c.fillRect(cx - r, cy - r, 2 * r, 2 * r);
        zonesNombres.push({ x0: cx - 6, y0: cy - 6, x1: cx + 6, y1: cy + 6 });
      }
      rep["centre"] = P(cx, cy);
    }
    // l'anneau du point fixe : la réponse de S4 et de S5
    if (e.anneau && e.centre) {
      c.strokeStyle = accent;
      c.lineWidth = 2;
      c.beginPath();
      c.arc(cx, cy, 9, 0, 2 * Math.PI);
      c.stroke();
      rep["anneau"] = P(cx, cy);
      zonesNombres.push({ x0: cx - 11, y0: cy - 11, x1: cx + 11, y1: cy + 11 });
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
