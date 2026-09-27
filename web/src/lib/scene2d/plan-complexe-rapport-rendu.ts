/**
 * plan-complexe-rapport-rendu.ts — le rendu Canvas 2D du « rapport lu depuis un
 * sommet » (spec docs/pipeline/propositions/maths-nombres-complexes-2-scene-w.md
 * §5.1, §6.2).
 *
 * LE REPÈRE est celui de la scène sœur (`plan-repere.ts`) : carré, isotrope,
 * [−9 ; 9]², quadrillage opaque. UNE différence décidée en vague 1 (§5.1) : le
 * cercle unité n'est tracé qu'en mode `lieu` — en mode `triangle`, aucun module
 * n'y est comparé à 1, et ce serait de l'encre que rien n'explique.
 *
 * LA LANGUE VISUELLE (§6.2). À l'ENCRE, l'énoncé : les points et (côté panneau)
 * leurs affixes ; les deux flèches quand la consigne les donne (S2, S3) ; en mode
 * `lieu`, le cercle unité et les deux segments MA, MB. À l'ACCENT, et seulement
 * après l'engagement : les flèches de S1 et de S4, l'ARC au sommet, la LONGUEUR
 * REPORTÉE (S2), le PETIT CARRÉ d'angle droit (S3), les TROIS courbes de lieu (S4).
 *
 * LES DEUX FLÈCHES NE SE RESSEMBLENT PAS : celle du DÉNOMINATEUR est plus épaisse
 * (la référence du rapport) — sans quoi le dessin ne distinguerait pas w de 1/w,
 * et c'est exactement ce que le pari de S1 demande. La consigne de S1 le dit.
 *
 * L'ARC EST AU SOMMET, ENTRE LES DEUX FLÈCHES — jamais depuis l'axe réel (ce
 * serait `angle-lu-depuis-l-axe` posé dans le pixel). Il part de la direction du
 * dénominateur et tourne de arg(w) ; rayon FIXE (§6.2, fit_caveat). En mode
 * `lieu`, les flèches ARRIVENT en M : l'arc va de la direction M→B à la direction
 * M→A — retourner les deux ajoute π à chacune, l'écart ne bouge pas.
 *
 * Ni temps, ni course : rien n'anime. Le seul mouvement est celui que la main
 * fait (le balayage de S4), et le panneau le calcule.
 */
import { FENETRE } from "./plan-complexe-modele";
import { lireJetons, melange, type RGB } from "../jetons-figure";
import { css, geometrie, P, peindreRepere, pointe, type Projection, type Pt, type Zone } from "./plan-repere";

export type { Projection };

export interface EtatRenduRapport {
  mode: "triangle" | "lieu";
  /** les points nommés, en unités : A, B, C (triangle) ou A, B, M (lieu) */
  points: Record<string, Pt>;
  /** le point d'où l'on lit (triangle) — ou M (lieu), où les flèches ARRIVENT */
  sommet: string;
  /** les deux flèches : null tant qu'elles n'existent pas. `num`/`den` : le point à l'autre bout */
  fleches: null | { num: string; den: string; accent: boolean; arrivent: boolean };
  /** mode lieu, avant la révélation : les segments MA et MB, à l'encre */
  segmentsEnonce: boolean;
  /** l'arc au sommet, en radians signés, de la direction du dénominateur à celle du numérateur */
  arc: number | null;
  arcAccent: boolean;
  /** la longueur REPORTÉE (S2) : |num| portée sur la direction du dénominateur, depuis le sommet */
  report: boolean;
  /** le petit carré d'angle droit (S3), au point nommé */
  angleDroit: string | null;
  cercleUnite: boolean;
  /** les trois courbes de lieu (S4, après la révélation) */
  courbes: boolean;
}

export interface RenduRapport {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduRapport): void;
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  zones(): Zone[];
  echelle(): number;
  lier(filets: [{ x: number; y: number }, { x: number; y: number }][]): void;
}

/** le rayon (px) de l'arc : FIXE, comme à la scène sœur — ≈ 1,8 unité */
export const rayonArc = (cote: number) => Math.round(Math.min(48, Math.max(30, 0.085 * cote)));
/** l'épaisseur des deux flèches : le dénominateur est la RÉFÉRENCE, il est plus épais (§6.2) */
export const EPAISSEUR = { num: 1.75, den: 3.5 } as const;
/** le décalage (px) de la longueur reportée, parallèle à la flèche du dénominateur */
export const DECALAGE_REPORT = 9;
/** le côté (px) du petit carré d'angle droit */
export const COTE_CARRE = 10;

export function creerRenduRapport(canvas: HTMLCanvasElement, hote: HTMLElement): RenduRapport {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 480, dpr = 1;
  let etat: EtatRenduRapport | null = null;
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
    const g = geometrie(largeur, hauteur, FENETRE);
    const { cote, X, Y } = g;
    s = g.s;
    const encre = css(jetons.encre), accent = css(jetons.accent);
    const r0 = peindreRepere(c, g, jetons, police, FENETRE, Object.values(e.points), e.cercleUnite);
    rep = r0.rep;
    segs = r0.segs;
    zones = r0.zones;
    const px = (p: Pt): [number, number] => [X(p[0]), Y(p[1])];
    const S = e.points[e.sommet];
    const [sx, sy] = px(S);

    // ── les trois courbes de lieu (S4) : sous tout le reste, à l'accent ──
    if (e.courbes) {
      c.strokeStyle = accent;
      c.lineWidth = 2;
      // la médiatrice de [AB] — l'axe imaginaire ; la droite (AB) — l'axe réel : l'accent PAR-DESSUS l'encre
      c.beginPath();
      c.moveTo(X(0), Y(FENETRE));
      c.lineTo(X(0), Y(-FENETRE));
      c.moveTo(X(-FENETRE), Y(0));
      c.lineTo(X(FENETRE), Y(0));
      c.stroke();
      // le cercle de diamètre [AB] : centre O, rayon 2
      c.beginPath();
      c.arc(X(0), Y(0), 2 * s, 0, 2 * Math.PI);
      c.stroke();
      for (let j = 0; j < 36; j++) {
        const a = (j * Math.PI) / 18, b = ((j + 1) * Math.PI) / 18;
        segs.push([P(X(2 * Math.cos(a)), Y(2 * Math.sin(a))), P(X(2 * Math.cos(b)), Y(2 * Math.sin(b)))]);
      }
      // les ancres des trois noms (le panneau y pose les étiquettes)
      rep["lieu-mediatrice"] = P(X(0), Y(7.2));
      // à GAUCHE de A : aucun cran de M n'y va (le balayage de la droite part vers la droite, au-delà de B)
      rep["lieu-droite"] = P(X(-6.5), Y(0));
      rep["lieu-cercle"] = P(X(2 * Math.cos(-Math.PI / 4)), Y(2 * Math.sin(-Math.PI / 4)));
      // des repères SUR chaque courbe, loin de tout point (la porte y lit l'accent)
      rep["courbe-mediatrice"] = P(X(0), Y(-6));
      rep["courbe-droite"] = P(X(-6), Y(0));
      rep["courbe-cercle"] = P(X(2 * Math.cos((-2 * Math.PI) / 3)), Y(2 * Math.sin((-2 * Math.PI) / 3)));
    }

    // ── mode lieu, avant la révélation : les segments MA et MB, à l'encre ──
    if (e.segmentsEnonce) {
      c.strokeStyle = encre;
      c.lineWidth = 1.25;
      c.beginPath();
      for (const n of Object.keys(e.points)) {
        if (n === e.sommet) continue;
        const [x, y] = px(e.points[n]);
        c.moveTo(x, y);
        c.lineTo(sx, sy);
        segs.push([P(x, y), P(sx, sy)]);
      }
      c.stroke();
    }

    // ── les deux flèches : le numérateur fin, le dénominateur ÉPAIS ──
    const dir = (vers: string): [number, number] => {
      const q = e.points[vers];
      const d = Math.hypot(q[0] - S[0], q[1] - S[1]);
      return [(q[0] - S[0]) / d, (q[1] - S[1]) / d];
    };
    if (e.fleches) {
      const f = e.fleches;
      c.strokeStyle = f.accent ? accent : encre;
      c.fillStyle = f.accent ? accent : encre;
      c.lineCap = "round";
      // le dénominateur d'ABORD : le numérateur, plus fin, passe DESSUS là où ils se croisent
      for (const [cle, vers] of [["den", f.den], ["num", f.num]] as const) {
        const [bx, by] = px(e.points[vers]);
        const [depX, depY, finX, finY] = f.arrivent ? [bx, by, sx, sy] : [sx, sy, bx, by];
        const L = Math.hypot(finX - depX, finY - depY);
        const ux = (finX - depX) / L, uy = (finY - depY) / L;
        // la pointe s'arrête au BORD du disque du point d'arrivée (rayon 4 + 1,5)
        const recul = 6;
        const t = cle === "den" ? 10 : 8;
        c.lineWidth = EPAISSEUR[cle];
        c.beginPath();
        c.moveTo(depX, depY);
        c.lineTo(finX - ux * (recul + t * 0.8), finY - uy * (recul + t * 0.8));
        c.stroke();
        pointe(c, finX - ux * recul, finY - uy * recul, ux, uy, t);
        segs.push([P(depX, depY), P(finX, finY)]);
        // deux repères par flèche, au tiers et aux deux tiers (la porte y lit l'épaisseur et la teinte)
        rep[`fleche-${cle}-1`] = P(depX + (finX - depX) / 3, depY + (finY - depY) / 3);
        rep[`fleche-${cle}-2`] = P(depX + (2 * (finX - depX)) / 3, depY + (2 * (finY - depY)) / 3);
      }
      c.lineCap = "butt";
    }

    // ── la longueur REPORTÉE (S2) : |num| portée sur la direction du dénominateur, en cote ──
    if (e.report && e.fleches) {
      const f = e.fleches;
      const [dx, dy] = dir(f.den);
      const num = e.points[f.num];
      const lNum = Math.hypot(num[0] - S[0], num[1] - S[1]);
      const lDen = Math.hypot(e.points[f.den][0] - S[0], e.points[f.den][1] - S[1]);
      // du côté OPPOSÉ au numérateur : la cote ne croise pas l'autre flèche. Alignés (triangle 4,
      // arg w = π), le numérateur n'a pas de côté : l'arc tourne alors dans le sens direct, et la
      // cote passe du côté HORAIRE — sinon elle coupait l'arc (premier lancement)
      const [nx0, ny0] = dir(f.num);
      const cote_ = dx * ny0 - dy * nx0;
      const horaire = cote_ > -1e-9;
      const nx = horaire ? dy : -dy, ny = horaire ? -dx : dx;
      const o = DECALAGE_REPORT / s;
      const a: Pt = [S[0] + nx * o, S[1] + ny * o];
      const b: Pt = [a[0] + dx * lNum, a[1] + dy * lNum];
      const bFin: Pt = [a[0] + dx * lDen, a[1] + dy * lDen];
      c.strokeStyle = accent;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(X(a[0]), Y(a[1]));
      c.lineTo(X(b[0]), Y(b[1]));
      // deux traits de cote, perpendiculaires, aux deux bouts
      for (const p of [a, b]) {
        c.moveTo(X(p[0] - nx * (4 / s)), Y(p[1] - ny * (4 / s)));
        c.lineTo(X(p[0] + nx * (4 / s)), Y(p[1] + ny * (4 / s)));
      }
      c.stroke();
      // le bout de la référence, en encre douce : où l'on aurait dû arriver pour un rapport 1
      c.strokeStyle = voile(jetons.encreDouce, 0.85);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(X(bFin[0] - nx * (4 / s)), Y(bFin[1] - ny * (4 / s)));
      c.lineTo(X(bFin[0] + nx * (4 / s)), Y(bFin[1] + ny * (4 / s)));
      c.stroke();
      segs.push([P(X(a[0]), Y(a[1])), P(X(b[0]), Y(b[1]))]);
      // les trois traits de cote sont des TRAITS : les étiquettes les évitent (premier lancement :
      // « A » posée sur deux pixels de la cote de départ)
      for (const p of [a, b, bFin]) segs.push([P(X(p[0] - nx * (4 / s)), Y(p[1] - ny * (4 / s))), P(X(p[0] + nx * (4 / s)), Y(p[1] + ny * (4 / s)))]);
      rep["report-debut"] = P(X(a[0]), Y(a[1]));
      rep["report-fin"] = P(X(b[0]), Y(b[1]));
      rep["report-reference"] = P(X(bFin[0]), Y(bFin[1]));
      rep["report-milieu"] = P(X((a[0] + b[0]) / 2), Y((a[1] + b[1]) / 2));
    }

    // ── l'arc au sommet, de la direction du dénominateur, tourné de arg ──
    if (e.arc !== null && e.arc !== 0 && e.fleches) {
      const [dx, dy] = dir(e.fleches.den);
      const th1 = Math.atan2(dy, dx);
      const phi = e.arc;
      // Le rayon est FIXE — sauf s'il faisait COURIR l'arc le long d'une courbe de lieu, de la même
      // encre que lui (porte, troisième lancement : M en 2√3 i, l'arc de rayon 41 px passait à
      // moins de 5 px du cercle de diamètre [AB] sur toute sa longueur, et les deux se lisaient
      // comme un seul trait). Une courbe qui COUPE l'arc se lit ; une courbe qui le LONGE, non.
      // « Longer » : la courbe reste à moins de 6 px de l'arc sur plus de 24° ET plus d'un tiers
      // de son ouverture (une coupe franche n'en couvre que 2·asin(6/R) ≈ 17°). Les courbes qui
      // passent PAR le sommet (la médiatrice quand M y est) le coupent toujours : ignorées. On
      // retient le plus grand rayon où aucune courbe ne longe l'arc, par pas de 4 px, jamais
      // sous 22 px.
      const distances: ((x: number, y: number) => number)[] = [
        (x) => Math.abs(x - X(0)),
        (_x, y) => Math.abs(y - Y(0)),
        (x, y) => Math.abs(Math.hypot(x - X(0), y - Y(0)) - 2 * s),
      ];
      let R = rayonArc(cote);
      if (e.courbes) {
        const longees = distances.filter((d) => d(sx, sy) >= 1);
        const N = 48, ouverture = (Math.abs(phi) * 180) / Math.PI;
        for (let r = R; r >= 22; r -= 4) {
          R = r;
          const longe = longees.some((d) => {
            let n = 0;
            for (let j = 0; j <= N; j++) {
              const a = th1 + (phi * j) / N;
              if (d(sx + r * Math.cos(a), sy - r * Math.sin(a)) < 6) n++;
            }
            const span = (n * ouverture) / N;
            return span > 24 && span > ouverture / 3;
          });
          if (!longe) break;
        }
      }
      const th2 = th1 + phi;
      const coul = e.arcAccent ? accent : encre;
      c.strokeStyle = coul;
      c.fillStyle = coul;
      c.lineWidth = 1.75;
      c.beginPath();
      const pointeRad = Math.min(Math.abs(phi) * 0.4, 7 / R);
      const finTrait = th2 - Math.sign(phi) * pointeRad;
      // le canvas compte les angles dans le sens HORAIRE (y vers le bas)
      c.arc(sx, sy, R, -th1, -finTrait, phi > 0);
      c.stroke();
      const ex = sx + R * Math.cos(th2), ey = sy - R * Math.sin(th2);
      pointe(c, ex, ey, -Math.sin(th2) * Math.sign(phi), -Math.cos(th2) * Math.sign(phi), 7);
      zones.push({ x0: ex - 6, y0: ey - 6, x1: ex + 6, y1: ey + 6 });
      const mil = th1 + phi / 2;
      rep["arc-debut"] = P(sx + R * Math.cos(th1), sy - R * Math.sin(th1));
      rep["arc-fin"] = P(ex, ey);
      rep["arc-milieu"] = P(sx + R * Math.cos(mil), sy - R * Math.sin(mil));
      for (let j = 0; j < 6; j++) {
        const a = th1 + (phi * j) / 6, b = th1 + (phi * (j + 1)) / 6;
        segs.push([P(sx + R * Math.cos(a), sy - R * Math.sin(a)), P(sx + R * Math.cos(b), sy - R * Math.sin(b))]);
      }
    }

    // ── le petit carré d'angle droit (S3) ──
    if (e.angleDroit) {
      const n = e.angleDroit;
      const V = e.points[n];
      const autres = Object.keys(e.points).filter((k) => k !== n);
      const u = autres.map((k) => {
        const q = e.points[k];
        const d = Math.hypot(q[0] - V[0], q[1] - V[1]);
        return [(q[0] - V[0]) / d, (q[1] - V[1]) / d] as Pt;
      });
      const k = COTE_CARRE / s;
      const p1: Pt = [V[0] + u[0][0] * k, V[1] + u[0][1] * k];
      const p2: Pt = [V[0] + (u[0][0] + u[1][0]) * k, V[1] + (u[0][1] + u[1][1]) * k];
      const p3: Pt = [V[0] + u[1][0] * k, V[1] + u[1][1] * k];
      c.strokeStyle = accent;
      c.lineWidth = 1.75;
      c.beginPath();
      c.moveTo(X(p1[0]), Y(p1[1]));
      c.lineTo(X(p2[0]), Y(p2[1]));
      c.lineTo(X(p3[0]), Y(p3[1]));
      c.stroke();
      rep["angle-droit"] = P(X(p2[0]), Y(p2[1]));
      zones.push({ x0: Math.min(X(p1[0]), X(p2[0]), X(p3[0])) - 2, y0: Math.min(Y(p1[1]), Y(p2[1]), Y(p3[1])) - 2, x1: Math.max(X(p1[0]), X(p2[0]), X(p3[0])) + 2, y1: Math.max(Y(p1[1]), Y(p2[1]), Y(p3[1])) + 2 });
    }

    // ── les points, à l'encre : le sommet de lecture a le même disque que les autres ──
    for (const [n, p] of Object.entries(e.points)) {
      const [x, y] = px(p);
      c.fillStyle = css(jetons.surface);
      c.beginPath();
      c.arc(x, y, 5.5, 0, 2 * Math.PI);
      c.fill();
      c.fillStyle = encre;
      c.beginPath();
      c.arc(x, y, 4, 0, 2 * Math.PI);
      c.fill();
      zones.push({ x0: x - 6, y0: y - 6, x1: x + 6, y1: y + 6 });
      rep[`point-${n}`] = P(x, y);
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
