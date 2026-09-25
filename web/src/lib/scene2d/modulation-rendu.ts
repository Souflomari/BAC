/**
 * modulation-rendu.ts — le rendu Canvas 2D du « banc de modulation »
 * (spec content/pc/ondes-em-modulation/spec-scene-modulation.md §5.1, §6).
 *
 * DEUX BANDES. En haut, le MONTAGE : deux sources, le multiplieur — une boîte
 * noire marquée « X », jamais de schéma interne (exclusion du cadre : les
 * composants actifs ne sont pas des objets d'étude) —, sa sortie, et, quand
 * l'étape l'a branché, l'étage de détection (diode, R0 ∥ C0). En dessous,
 * l'ÉCRAN : 10 × 8 divisions, un quadrillage, quatre traits fins par
 * division sur les deux axes médians, calé à GAUCHE — la marge de droite porte
 * les noms des voies et les cotes, comme sur un oscilloscope.
 *
 * UNE ÉCHELLE : `d` pixels par division, la même dans les deux sens (1,00 V et
 * 0,50 ms). Les courbes sont échantillonnées sur une grille de pixels FIXE
 * (un demi-pixel), PLUS les instants exacts des extrema de la porteuse : une
 * grille qui glisserait avec F ferait trembler les sommets (règle de la corde),
 * et une crête échantillonnée à côté de son sommet tomberait sous l'enveloppe —
 * l'enveloppe ne serait plus « inerte » d'un cran à l'autre.
 *
 * LA LANGUE VISUELLE (ADR 0041 §4, spec §6). À l'ENCRE, l'énoncé : le montage,
 * le cadre, la grille et ses traits fins, les axes, u_S (encre DOUCE, trait
 * fin), u_C (encre, trait ÉPAIS) — deux tracés, deux épaisseurs, une seule
 * encre ; jamais distingués par la couleur. L'enveloppe de départ, quand elle
 * n'est plus la courante, en tirets d'encre. À l'ACCENT, et seulement après la
 * révélation, ce qui RÉPOND : la double flèche de période, le crochet de
 * comptage, les deux curseurs U_max / U_min, les pincements et la bosse
 * retournée, les repères du détecteur.
 *
 * Les couleurs sont lues dans les jetons (`lib/jetons-figure.ts` — pas
 * `scene3d/palette.ts`, qui importerait three).
 */
import * as M from "./modulation-modele";
import { lireJetons, type RGB } from "../jetons-figure";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface Reglage {
  /** F en kHz, Sm et U0 en V, R0 en kΩ */
  F: number;
  Sm: number;
  U0: number;
  R0: number;
}

/** Ce que la révélation d'une étape ajoute, à l'accent. */
export type Marque = "periode" | "comptage" | "extrema" | "pincement" | "decrochage" | "vidange";

export interface EtatRenduModulation {
  courant: Reglage;
  /** l'étage de détection existe-t-il (schéma ET second tracé) ? */
  detecte: boolean;
  /** les marques d'accent de l'étape — vides tant que le pari n'est pas révélé */
  marques: readonly Marque[];
  /** le réglage de départ de l'étape, en tirets d'encre quand il diffère du courant */
  reference: Reglage | null;
}

export interface RenduModulation {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduModulation): void;
  /** les repères, en pixels CSS du canvas (la porte les lit ; les étiquettes s'y posent) */
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  /** là où aucune étiquette ne se pose : la surface balayée par les tracés, la rangée de calibration */
  zones(): { x0: number; y0: number; x1: number; y1: number }[];
  /** pixels par division (la porte la LIT sur la grille ; ceci ne sert qu'aux étiquettes) */
  division(): number;
}

/** La hauteur réservée à la légende du plateau (une pastille opaque, en haut à gauche). */
export const RESERVE_LEGENDE = 26;
/** La marge de droite de l'écran : les noms des voies et les cotes s'y posent. */
export const MARGE_DROITE = 68;

export function creerRenduModulation(canvas: HTMLCanvasElement, hote: HTMLElement): RenduModulation {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 480, dpr = 1;
  let etat: EtatRenduModulation | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zonesLibres: { x0: number; y0: number; x1: number; y1: number }[] = [];
  let d = 30;

  const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  /** `a` sur la surface, en couleur OPAQUE : deux traits qui se croisent n'y font pas un point plus sombre. */
  const voile = (c: RGB, a: number) => {
    const s = jetons.surface;
    return `rgb(${[0, 1, 2].map((i) => Math.round(s[i] + a * (c[i] - s[i]))).join(",")})`;
  };
  const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });
  /** Un trait de 1 px posé au milieu d'un pixel : net, et à ≤ 0,5 px de sa place exacte. */
  const net = (v: number) => Math.round(v - 0.5) + 0.5;
  const tirets = (on: boolean) => ctx!.setLineDash(on ? [4, 3] : []);
  const trait = (x0: number, y0: number, x1: number, y1: number) => {
    const c = ctx!;
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.stroke();
    segs.push([P(x0, y0), P(x1, y1)]);
  };

  // ── LE MONTAGE ────────────────────────────────────────────────────────────
  function rendreMontage(e: EtatRenduModulation, mx0: number, my0: number, mx1: number, my1: number, xEcranFin: number) {
    const c = ctx!;
    const encre = css(jetons.encre);
    c.strokeStyle = encre;
    c.fillStyle = encre;
    c.lineWidth = 1.2;
    const h = my1 - my0;
    // au-dessus du fil de u(t), la place de son nom (≈ 24 px) : plus haut, il passait SOUS la
    // légende du plateau au téléphone (porte, 390 px)
    const yIn1 = Math.round(my0 + Math.max(24, h * 0.22)) + 0.5;
    const yIn2 = Math.round(my0 + h * 0.5) + 0.5;
    const yRail = Math.round(my1 - 3) + 0.5;
    const ySrc = Math.round((yIn2 + yRail) / 2 + 3);
    const R = Math.max(6, Math.min(9, h * 0.12));
    // les deux sources : un cercle, une ondulation — l'entrée modulante (U0 + Sm sin) et la porteuse
    const xs1 = mx0 + 16, xs2 = mx0 + 46;
    const xb0 = Math.round(mx0 + Math.max(90, (mx1 - mx0) * 0.3)) + 0.5, xb1 = xb0 + 34;
    const source = (x: number) => {
      c.beginPath();
      c.arc(x, ySrc, R, 0, 2 * Math.PI);
      c.stroke();
      c.beginPath();
      for (let k = 0; k <= 12; k++) {
        const u = -R * 0.55 + (k / 12) * R * 1.1;
        const v = -Math.sin((k / 12) * 2 * Math.PI) * R * 0.3;
        if (k === 0) c.moveTo(x + u, ySrc + v);
        else c.lineTo(x + u, ySrc + v);
      }
      c.stroke();
      segs.push([P(x - R, ySrc - R), P(x + R, ySrc + R)], [P(x - R, ySrc + R), P(x + R, ySrc - R)]);
    };
    source(xs1);
    source(xs2);
    trait(xs1, ySrc - R, xs1, yIn1);
    trait(xs1, yIn1, xb0, yIn1);
    trait(xs2, ySrc - R, xs2, yIn2);
    trait(xs2, yIn2, xb0, yIn2);
    trait(xs1, ySrc + R, xs1, yRail);
    trait(xs2, ySrc + R, xs2, yRail);
    rep["source-u"] = P(xs1, ySrc);
    rep["source-p"] = P(xs2, ySrc);
    rep["entree-u"] = P((xs1 + xb0) / 2 + 12, yIn1);
    rep["entree-p"] = P((xs2 + xb0) / 2 + 8, yIn2);

    // le multiplieur : une boîte noire marquée X, deux entrées, une sortie
    const yb0 = yIn1 - 9, yb1 = yIn2 + 9;
    c.lineWidth = 1.5;
    c.strokeRect(xb0, yb0, xb1 - xb0, yb1 - yb0);
    segs.push([P(xb0, yb0), P(xb1, yb0)], [P(xb1, yb0), P(xb1, yb1)], [P(xb1, yb1), P(xb0, yb1)], [P(xb0, yb1), P(xb0, yb0)]);
    c.font = `600 15px ${police}`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("X", (xb0 + xb1) / 2, (yb0 + yb1) / 2 + 0.5);
    rep["multiplieur"] = P((xb0 + xb1) / 2, yb0);
    const ySortie = Math.round((yb0 + yb1) / 2) + 0.5;
    c.lineWidth = 1.2;
    // la masse du multiplieur, sur le rail
    trait((xb0 + xb1) / 2, yb1, (xb0 + xb1) / 2, yRail);

    // la sortie, jusqu'à la borne de la voie 1 — ou jusqu'au détecteur
    const xFin = Math.min(mx1 - 10, xEcranFin + 20);
    const xNoeud = Math.round(xb1 + Math.max(34, (xFin - xb1) * 0.22)) + 0.5;
    const borne = (x: number, y: number) => {
      c.beginPath();
      c.arc(x, y, 2.6, 0, 2 * Math.PI);
      c.fill();
    };
    if (!e.detecte) {
      trait(xb1, ySortie, xFin, ySortie);
      borne(xFin, ySortie);
      rep["borne-uS"] = P(xFin, ySortie);
      rep["nom-uS-montage"] = P((xb1 + xFin) / 2, ySortie);
      trait(xs1, yRail, xFin, yRail);
      borne(xFin, yRail);
    } else {
      // l'étage de détection : diode, puis R0 ∥ C0 vers la masse, puis la voie 2
      trait(xb1, ySortie, xNoeud, ySortie);
      borne(xNoeud, ySortie);
      rep["borne-uS"] = P(xNoeud, ySortie);
      rep["nom-uS-montage"] = P((xb1 + xNoeud) / 2, ySortie);
      const xd0 = xNoeud + 10, xd1 = xd0 + 16;
      trait(xNoeud, ySortie, xd0, ySortie);
      // la diode : un triangle vers la droite, une barre
      c.beginPath();
      c.moveTo(xd0, ySortie - 7);
      c.lineTo(xd1, ySortie);
      c.lineTo(xd0, ySortie + 7);
      c.closePath();
      c.fill();
      c.lineWidth = 2;
      trait(xd1, ySortie - 7, xd1, ySortie + 7);
      c.lineWidth = 1.2;
      segs.push([P(xd0, ySortie - 7), P(xd1, ySortie)], [P(xd0, ySortie + 7), P(xd1, ySortie)]);
      rep["diode"] = P((xd0 + xd1) / 2, ySortie - 7);
      const xR = Math.round(xd1 + Math.max(24, (xFin - xd1) * 0.28)) + 0.5;
      const xC = Math.round(xR + Math.max(26, (xFin - xd1) * 0.26)) + 0.5;
      trait(xd1, ySortie, xFin, ySortie);
      // R0 : un rectangle vertical
      const rh = Math.max(10, (yRail - ySortie) * 0.5), ry0 = (ySortie + yRail) / 2 - rh / 2;
      trait(xR, ySortie, xR, ry0);
      c.strokeRect(xR - 4, ry0, 8, rh);
      segs.push([P(xR - 4, ry0), P(xR - 4, ry0 + rh)], [P(xR + 4, ry0), P(xR + 4, ry0 + rh)]);
      trait(xR, ry0 + rh, xR, yRail);
      rep["R0"] = P(xR + 4, (ySortie + yRail) / 2);
      rep["R0-gauche"] = P(xR - 4, (ySortie + yRail) / 2);
      // C0 : deux armatures
      const yc = (ySortie + yRail) / 2;
      trait(xC, ySortie, xC, yc - 2.5);
      c.lineWidth = 2;
      trait(xC - 7, yc - 2.5, xC + 7, yc - 2.5);
      trait(xC - 7, yc + 2.5, xC + 7, yc + 2.5);
      c.lineWidth = 1.2;
      trait(xC, yc + 2.5, xC, yRail);
      rep["C0"] = P(xC + 7, yc);
      borne(xFin, ySortie);
      rep["borne-uC"] = P(xFin, ySortie);
      rep["nom-uC-montage"] = P((xC + xFin) / 2, ySortie);
      // le rail va jusqu'à la borne de la voie, comme la sortie : un port à deux bornes
      trait(xs1, yRail, xFin, yRail);
      borne(xFin, yRail);
    }
    // la masse : un symbole sous le rail, entre les deux sources
    const xm = (xs1 + xs2) / 2;
    c.lineWidth = 1.2;
    trait(xm, yRail, xm, yRail + 3);
    for (const [dy, dl] of [[3, 6], [6, 4], [9, 2]]) trait(xm - dl, yRail + dy, xm + dl, yRail + dy);
    rep["masse"] = P(xm, yRail);
  }

  // ── L'ÉCRAN ───────────────────────────────────────────────────────────────
  function rendreEcran(e: EtatRenduModulation, x0: number, y0: number) {
    const c = ctx!;
    // l'origine des TRACÉS est celle des TRAITS : le milieu d'un pixel (net) — sans
    // quoi l'axe dessiné tombe un demi-pixel sous le zéro des courbes
    x0 = net(x0);
    y0 = net(y0);
    const w = M.DIV_X * d, h = M.DIV_Y * d;
    const x1 = x0 + w, y1 = y0 + h;
    const yc = y0 + h / 2;
    const X = (t: number) => x0 + (t / M.MS_PAR_DIV) * d;
    const Y = (v: number) => yc - (v / M.V_PAR_DIV) * d;
    rep["ecran-hg"] = P(x0, y0);
    rep["ecran-bd"] = P(x1, y1);
    rep["ecran-o"] = P(x0, yc);

    // le quadrillage : une ligne par division — jamais plus contrasté que les tracés.
    // En couleur OPAQUE (le voile à 30 %) : en transparence, deux lignes se recouvrent
    // aux croisements (51 %) — même dans un seul chemin, Chromium les compose deux fois,
    // mesuré — et chaque nœud de la grille devient un point plus sombre qu'elle, un faux
    // sommet de tracé pour qui lit l'écran
    // À 3:1 sur la surface (vague 2) : c'est une règle qu'on COMPTE (« 5,00 div »), un objet
    // graphique porteur de sens — à 30 % d'encre douce, 1,62:1, elle disparaissait sous
    // quarante oscillations. Toujours sous les tracés (u_S 7,8:1).
    const teinteGrille = voile(jetons.encre, 0.47);
    c.lineWidth = 1;
    c.strokeStyle = teinteGrille;
    c.beginPath();
    for (let k = 1; k < M.DIV_X; k++) {
      if (k === M.DIV_X / 2) continue;
      c.moveTo(net(x0 + k * d), y0);
      c.lineTo(net(x0 + k * d), y1);
    }
    for (let k = 1; k < M.DIV_Y; k++) {
      if (k === M.DIV_Y / 2) continue;
      c.moveTo(x0, net(y0 + k * d));
      c.lineTo(x1, net(y0 + k * d));
    }
    c.stroke();
    // les deux axes médians (4,9:1), et leurs QUATRE traits fins par division à la teinte de
    // la grille : plus fort, le peigne faisait de l'axe la bande la plus lourde de l'écran,
    // là même où le tracé passe par zéro (vague 2, calme)
    c.strokeStyle = voile(jetons.encre, 0.62);
    c.beginPath();
    c.moveTo(x0, net(yc));
    c.lineTo(x1, net(yc));
    c.moveTo(net(x0 + w / 2), y0);
    c.lineTo(net(x0 + w / 2), y1);
    c.stroke();
    c.strokeStyle = teinteGrille;
    c.beginPath();
    for (let k = 1; k < M.DIV_X * M.SOUS_DIV; k++) {
      if (k % M.SOUS_DIV === 0) continue;
      const x = net(x0 + (k * d) / M.SOUS_DIV);
      c.moveTo(x, net(yc) - 3);
      c.lineTo(x, net(yc) + 3);
    }
    for (let k = 1; k < M.DIV_Y * M.SOUS_DIV; k++) {
      if (k % M.SOUS_DIV === 0) continue;
      const y = net(y0 + (k * d) / M.SOUS_DIV);
      c.moveTo(net(x0 + w / 2) - 3, y);
      c.lineTo(net(x0 + w / 2) + 3, y);
    }
    c.stroke();
    // le cadre
    c.strokeStyle = css(jetons.encre, 0.85);
    c.lineWidth = 1.2;
    c.strokeRect(net(x0), net(y0), Math.round(w), Math.round(h));
    segs.push([P(x0, y0), P(x1, y0)], [P(x1, y0), P(x1, y1)], [P(x1, y1), P(x0, y1)], [P(x0, y1), P(x0, y0)]);
    for (let k = 0; k <= M.DIV_X; k++) rep[`div-x${k}`] = P(x0 + k * d, yc);
    for (let k = 0; k <= M.DIV_Y; k++) rep[`div-y${k}`] = P(x0 + w / 2, y0 + k * d);
    // la calibration, sous le cadre (les étiquettes HTML s'y posent)
    rep["calibration-v"] = P(x0, y1 + 4);
    rep["calibration-t"] = P(x1, y1 + 4);
    zonesLibres.push({ x0: x0 - 2, y0: y1 + 2, x1: x1 + 2, y1: y1 + 22 });

    const { courant: r } = e;
    // ── les échantillons : une grille de demi-pixels FIXE, plus les extrema exacts de la porteuse ──
    const pas = M.MS_PAR_DIV / d / 2;
    const n = Math.round(M.DUREE_MS / pas);
    const ts: number[] = [];
    for (let i = 0; i <= n; i++) ts.push(i * pas);
    const demi = M.periodePorteuse(r.F) / 2;
    for (let k = 0; k * demi <= M.DUREE_MS + 1e-9; k++) ts.push(k * demi);
    ts.sort((a, b) => a - b);

    c.save();
    c.beginPath();
    c.rect(x0, y0, w, h);
    c.clip();

    // l'enveloppe de DÉPART, en tirets d'encre, quand elle n'est plus la courante
    const ref = e.reference;
    if (ref && (ref.U0 !== r.U0 || ref.Sm !== r.Sm)) {
      // PLUS LÉGÈRE que le tracé vivant (vague 2, dessin et calme d'accord) : à l'encre 0,85,
      // le souvenir était 1,4 fois plus contrasté que le présent qu'on doit lire
      c.strokeStyle = voile(jetons.encreDouce, 0.6);
      c.lineWidth = 1;
      tirets(true);
      for (const s of [1, -1]) {
        c.beginPath();
        for (let i = 0; i <= n; i += 2) {
          const t = i * pas;
          const v = s * M.enveloppe(t, ref.U0, ref.Sm);
          if (i === 0) c.moveTo(X(t), Y(v));
          else c.lineTo(X(t), Y(v));
        }
        c.stroke();
      }
      tirets(false);
      const tr = 0.3;
      rep["reference"] = P(X(tr), Y(M.enveloppe(tr, ref.U0, ref.Sm)));
    }

    // u_S : encre DOUCE, trait fin
    c.strokeStyle = css(jetons.encreDouce);
    c.lineWidth = 1;
    c.lineJoin = "round";
    c.beginPath();
    ts.forEach((t, i) => {
      const v = M.sortieMultiplieur(t, r.F, r.U0, r.Sm);
      if (i === 0) c.moveTo(X(t), Y(v));
      else c.lineTo(X(t), Y(v));
    });
    c.stroke();

    // u_C : encre, trait ÉPAIS, sur un liseré de surface qui le détache de u_S
    let uC: ((t: number) => number) | null = null;
    if (e.detecte) {
      uC = M.detecteur(r.F, r.U0, r.Sm, r.R0);
      const chemin = () => {
        c.beginPath();
        ts.forEach((t, i) => {
          const v = uC!(t);
          if (i === 0) c.moveTo(X(t), Y(v));
          else c.lineTo(X(t), Y(v));
        });
      };
      c.strokeStyle = css(jetons.surface);
      c.lineWidth = 5;
      chemin();
      c.stroke();
      c.strokeStyle = css(jetons.encre);
      c.lineWidth = 2.2;
      chemin();
      c.stroke();
    }
    c.restore();

    // ── les noms des voies, en bout de tracé (marge de droite) ──
    const vS = M.sortieMultiplieur(M.DUREE_MS, r.F, r.U0, r.Sm);
    rep["fin-uS"] = P(x1, Y(vS));
    if (uC) rep["fin-uC"] = P(x1, Y(uC(M.DUREE_MS)));

    // la surface balayée par les tracés : aucune étiquette ne s'y pose
    const tranche = M.MS_PAR_DIV / 2;
    for (let t0 = 0; t0 < M.DUREE_MS - 1e-9; t0 += tranche) {
      let haut = 0;
      for (let k = 0; k <= 8; k++) {
        const t = t0 + (k / 8) * tranche;
        haut = Math.max(haut, M.enveloppe(t, r.U0, r.Sm), uC ? uC(t) : 0);
      }
      zonesLibres.push({ x0: X(t0), y0: Y(haut) - 1, x1: X(t0 + tranche), y1: Y(-M.enveloppe(t0 + tranche / 2, r.U0, r.Sm) - 0.05) + 1 });
    }

    // ── la RÉPONSE, à l'accent ──
    if (e.marques.length === 0) return;
    const accent = css(jetons.accent);
    c.strokeStyle = accent;
    c.fillStyle = accent;
    const ext = M.extrema(r.U0, r.Sm);
    /** un cercle d'accent est un OBSTACLE pour les étiquettes (ses deux diagonales) : sans quoi le
     *  nom « ici, C0 se vide » se posait sur son propre repère (porte, 390 px et 1 280 px) */
    const obstacleRond = (x: number, y: number, r: number) => segs.push([P(x - r, y - r), P(x + r, y + r)], [P(x - r, y + r), P(x + r, y - r)]);
    /**
     * Un RENVOI : un trait court d'accent qui part du cercle vers la diagonale où l'étiquette
     * (de largeur ESTIMÉE `lEtiq`) tient hors des tracés et dans le plateau ; l'étiquette se
     * pose au bout (repères `${nom}-ancre` et `${nom}-dir`). « ici » sans renvoi ne montrait
     * rien : au téléphone, le nom tombait à 100 px de son cercle (vague 2, dessin).
     */
    const renvoi = (nom: string, x: number, y: number, lEtiq: number) => {
      const hauteurE = 22, r = 7, L = 12;
      const libre = (dx: number, dy: number) => {
        const ex = x + (dx * (r + L)) / Math.SQRT2, ey = y + (dy * (r + L)) / Math.SQRT2;
        const cx = ex + dx * (lEtiq / 2 + 5), cy = ey + dy * (hauteurE / 2 + 3);
        const b = { x0: cx - lEtiq / 2 - 2, y0: cy - hauteurE / 2 - 2, x1: cx + lEtiq / 2 + 2, y1: cy + hauteurE / 2 + 2 };
        if (b.x0 < 0 || b.y0 < RESERVE_LEGENDE || b.x1 > largeur || b.y1 > hauteur) return false;
        return !zonesLibres.some((z) => z.x0 < b.x1 && b.x0 < z.x1 && z.y0 < b.y1 && b.y0 < z.y1);
      };
      const choix = ([[1, -1], [-1, -1], [1, 1], [-1, 1]] as const).find(([dx, dy]) => libre(dx, dy)) ?? ([1, -1] as const);
      const [dx, dy] = choix;
      const x1 = x + (dx * r) / Math.SQRT2, y1 = y + (dy * r) / Math.SQRT2;
      const x2 = x + (dx * (r + L)) / Math.SQRT2, y2 = y + (dy * (r + L)) / Math.SQRT2;
      c.lineWidth = 1.2;
      trait(x1, y1, x2, y2);
      rep[`${nom}-ancre`] = P(x2, y2);
      rep[`${nom}-dir`] = P(dx, dy);
    };
    const fleche = (xa: number, ya: number, xb: number, yb: number) => {
      const L = Math.hypot(xb - xa, yb - ya), ux = (xb - xa) / L, uy = (yb - ya) / L;
      c.beginPath();
      c.moveTo(xa, ya);
      c.lineTo(xb, yb);
      c.stroke();
      for (const [px, py, s] of [[xa, ya, 1], [xb, yb, -1]] as const) {
        c.beginPath();
        c.moveTo(px, py);
        c.lineTo(px + s * (ux * 7 - uy * 3.5), py + s * (uy * 7 + ux * 3.5));
        c.lineTo(px + s * (ux * 7 + uy * 3.5), py + s * (uy * 7 - ux * 3.5));
        c.closePath();
        c.fill();
      }
      segs.push([P(xa, ya), P(xb, yb)]);
    };

    if (e.marques.includes("periode")) {
      // d'un resserrement au resserrement suivant — deux extrema de MÊME type
      const [ta, tb] = M.minimaEnveloppe();
      const yf = Y(Math.min(3.6, ext.max + 0.5));
      c.lineWidth = 1;
      tirets(true);
      trait(X(ta), Y(ext.min), X(ta), yf);
      trait(X(tb), Y(ext.min), X(tb), yf);
      tirets(false);
      c.lineWidth = 1.5;
      fleche(X(ta), yf, X(tb), yf);
      rep["periode-a"] = P(X(ta), yf);
      rep["periode-b"] = P(X(tb), yf);
      // la cote se pose AU-DESSUS du cadre, dans l'intervalle : sur le trait du cadre, sa
      // pastille l'effaçait (vague 2, dessin)
      rep["cote-periode"] = P((X(ta) + X(tb)) / 2, y0 - 14);
    }
    if (e.marques.includes("comptage")) {
      // un crochet sur TOUTE la largeur : on compte sur l'écran entier
      const yk = Y(-Math.min(3.6, ext.max + 0.5));
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(x0 + 1.5, yk - 6);
      c.lineTo(x0 + 1.5, yk);
      c.lineTo(x1 - 1.5, yk);
      c.lineTo(x1 - 1.5, yk - 6);
      c.stroke();
      segs.push([P(x0, yk), P(x1, yk)]);
      rep["crochet-comptage"] = P((x0 + x1) / 2, yk);
      // son nombre, dans la rangée de calibration, entre « V/div » et « ms/div » — là où un
      // oscilloscope l'écrit, et hors du cadre qu'il effaçait
      rep["cote-comptage"] = P((x0 + x1) / 2, y1 + 4);
    }
    if (e.marques.includes("extrema")) {
      // deux curseurs horizontaux, à U_max et U_min, et un crochet entre eux, dans la marge
      c.lineWidth = 1.2;
      tirets(true);
      for (const v of [ext.max, ext.min]) trait(x0, Y(v), x1 + 6, Y(v));
      tirets(false);
      const xk = x1 + 6;
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(xk - 4, Y(ext.max));
      c.lineTo(xk, Y(ext.max));
      c.lineTo(xk, Y(ext.min));
      c.lineTo(xk - 4, Y(ext.min));
      c.stroke();
      segs.push([P(xk, Y(ext.max)), P(xk, Y(ext.min))]);
      rep["curseur-max"] = P(xk, Y(ext.max));
      rep["curseur-min"] = P(xk, Y(ext.min));
    }
    if (e.marques.includes("pincement")) {
      const zeros = M.zerosEnveloppe(r.U0, r.Sm);
      c.lineWidth = 1.5;
      zeros.forEach((t, i) => {
        c.beginPath();
        c.arc(X(t), yc, 4.5, 0, 2 * Math.PI);
        c.stroke();
        obstacleRond(X(t), yc, 4.5);
        rep[`pincement-${i}`] = P(X(t), yc);
      });
      // la bosse retournée, entourée (m > 1 seulement : à m = 1, il n'y en a pas)
      if (zeros.length === 4) {
        // UNE bosse entourée (spec §6, au singulier ; vague 2, calme) : la seconde, identique,
        // l'œil la trouve seul — la marquer aussi faisait d'un repère une décoration
        for (const [a, b, i] of [[zeros[0], zeros[1], 0]] as const) {
          const bosse = M.bosseSecondaire(r.U0, r.Sm);
          const cx = (X(a) + X(b)) / 2, rx = (X(b) - X(a)) / 2 - 7, ry = bosse * d + 6;
          if (rx > 4) {
            c.beginPath();
            c.ellipse(cx, yc, rx, ry, 0, 0, 2 * Math.PI);
            c.stroke();
          }
          rep[`bosse-${i}`] = P(cx, yc - ry);
        }
      }
    }
    if (uC && (e.marques.includes("decrochage") || e.marques.includes("vidange"))) {
      const Tp = M.periodePorteuse(r.F);
      if (e.marques.includes("decrochage")) {
        // la première descente de l'enveloppe : où u_C s'en écarte le plus
        const [tMax] = M.maximaEnveloppe();
        const [tMin] = M.minimaEnveloppe();
        let pire = 0, tp = tMax;
        for (let t = tMax; t <= tMin; t += Tp / 4) {
          const ecart = uC(t) - M.enveloppe(t, r.U0, r.Sm);
          if (ecart > pire) { pire = ecart; tp = t; }
        }
        if (pire > 0.1) {
          c.lineWidth = 1.5;
          c.beginPath();
          c.arc(X(tp), Y(uC(tp)), 6, 0, 2 * Math.PI);
          c.stroke();
          obstacleRond(X(tp), Y(uC(tp)), 7);
          rep["decrochage"] = P(X(tp), Y(uC(tp)));
          renvoi("decrochage", X(tp), Y(uC(tp)), 150);
        }
      }
      if (e.marques.includes("vidange")) {
        // au renflement : le creux le plus profond entre deux crêtes
        const [tMax] = M.maximaEnveloppe();
        const k0 = Math.round(tMax / Tp);
        let pire = 0, tp = tMax;
        for (let k = k0 - 1; k <= k0; k++) {
          for (let j = 1; j < 16; j++) {
            const t = (k + j / 16) * Tp;
            if (t < 0) continue;
            const creux = M.enveloppe(t, r.U0, r.Sm) - uC(t);
            if (creux > pire) { pire = creux; tp = t; }
          }
        }
        if (pire > 0.25) {
          c.lineWidth = 1.5;
          c.beginPath();
          c.arc(X(tp), Y(uC(tp)), 6, 0, 2 * Math.PI);
          c.stroke();
          obstacleRond(X(tp), Y(uC(tp)), 7);
          rep["vidange"] = P(X(tp), Y(uC(tp)));
          renvoi("vidange", X(tp), Y(uC(tp)), 100);
        }
      }
    }
  }

  function rendre() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = css(jetons.surface);
    c.fillRect(0, 0, largeur, hauteur);
    rep = {};
    segs = [];
    zonesLibres = [];
    if (!etat) return;
    // la hauteur : légende, montage, un intervalle (les cotes du haut s'y posent), l'écran, la calibration
    // au moins 80 px : deux fils d'entrée, leurs noms, les sources et le rail (à 62, au téléphone,
    // les deux entrées n'étaient qu'à 10 px l'une de l'autre une fois le nom de u(t) logé)
    const hMontage = Math.round(Math.max(80, Math.min(104, hauteur * 0.19)));
    // 28 : la cote de période se pose dans l'intervalle, au-dessus du cadre
    const intervalle = 28, calib = 24;
    const yEcran = RESERVE_LEGENDE + hMontage + intervalle;
    const dH = (hauteur - yEcran - calib) / M.DIV_Y;
    const dW = (largeur - 10 - MARGE_DROITE) / M.DIV_X;
    d = Math.max(8, Math.floor(Math.min(dH, dW)));
    const x0 = 10;
    rendreMontage(etat, 4, RESERVE_LEGENDE, largeur - 4, RESERVE_LEGENDE + hMontage, x0 + M.DIV_X * d);
    rendreEcran(etat, x0, Math.round(yEcran));
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
    zones: () => zonesLibres,
    division: () => d,
  };
}
