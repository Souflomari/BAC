/**
 * corde-rendu.ts — la corde, DESSINÉE en Canvas 2D (spec-scene-corde.md §6,
 * « la langue visuelle »). Aucune 3D, aucun WebGL, aucun three.js :
 * `window.__THREE__` reste indéfini panneau ouvert, et la porte le vérifie.
 *
 * En haut, toujours, LA CORDE : de la main S (x = 0) à 4,00 m, vue de côté,
 * l'élongation dilatée ×20 (déclarée sur l'image). En dessous, l'APPAREIL de
 * l'étape — un seul, les autres n'existent pas (spec §5.3, `vue`) :
 *  - « film » : les axes (t, y) où se tracent y_S(t) et y_M(t) ;
 *  - « photo » : le petit graphe du geste y_S(t), la donnée (la corde, figée à
 *    t₁, EST la photo) ;
 *  - « photos » : les deux clichés de la caméra, l'un sous l'autre, à la même
 *    échelle que la corde.
 * L'énoncé (corde, main, M, axes, graduations, y_S) est à l'ENCRE ; l'accent
 * ne marque que ce qui répond au pari, et seulement après la révélation.
 */
import * as C from "./corde";
import { lireJetons, type RGB } from "../jetons-figure";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export type Vue = "film" | "photo" | "photos";

export interface EtatRenduCorde {
  vue: Vue;
  geste: C.Geste;
  /** m/s */
  v: number;
  /** l'abscisse de M, m */
  d: number;
  /** l'instant que la corde montre, s de corde */
  t: number;
  /** la corde bouge-t-elle (non : au repos, avant toute course) */
  anime: boolean;
  /** film : y_S et y_M tracés jusqu'à cet instant (null : axes vides) */
  trace: number | null;
  /** film, étape 4 : le film de M pour le geste de RÉFÉRENCE, jusqu'à cet instant */
  reference: { geste: C.Geste; jusqua: number } | null;
  /** la plus haute élongation de l'étape (cm) : l'échelle du film, et la place de la corde */
  yMaxFilm: number;
  /** après la révélation : l'accent a le droit d'exister */
  revele: boolean;
  /** film : le segment τ entre le départ de S et celui de M */
  repereTau: boolean;
  /** film : l'instant de départ commun aux deux courbes (étape 4) */
  departCommun: boolean;
  /** l'encart à l'échelle vraie (×1) a sa place sous la corde à cette étape */
  encart: boolean;
  /** … et il est dessiné (après le verdict) */
  encartVrai: boolean;
  /** photo : la cote du front et la pente, en accent */
  coteFront: boolean;
  /** photos : les deux instants des clichés (null : cadres vides) */
  cliches: { tA: number; tB: number; nA: number; nB: number } | null;
  /** photos : la règle de mesure entre les deux fronts, en accent */
  regleMesure: boolean;
}

export interface RenduCorde {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduCorde): void;
  /** les repères, en pixels CSS du canvas (la porte les lit ; les étiquettes s'y posent) */
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
}

type Bande = { x0: number; x1: number; y0: number; y1: number };

/**
 * La hauteur réservée à la légende du plateau (« Corde · ralenti ×5 ·
 * verticale ×20 »), une pastille opaque posée en haut à gauche : rien de ce
 * que la corde dessine ne monte sous elle (la porte le mesure, `cadre`).
 */
export const RESERVE_LEGENDE = 30;
/** Sous une ligne de repos graduée : 3 px de vide, les traits (6 px), puis les nombres (12 px), tenus DANS la bande. */
const GRAD = 24;

export function creerRenduCorde(canvas: HTMLCanvasElement, hote: HTMLElement): RenduCorde {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 320, dpr = 1;
  let etat: EtatRenduCorde | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];

  const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  /**
   * La mise en page, CALCULÉE depuis l'amplitude la plus haute que l'étape peut
   * montrer — plus depuis des fractions fixes de la hauteur (vague 2 : à
   * l'étape 4, la rampe de 6 cm, dilatée ×20, montait sous la légende du
   * plateau et y cachait la main, S et le palier ; à 390 px, le film n'avait
   * plus que 46 px et l'étiquette y_S partait se poser sur la corde).
   * De haut en bas : la réserve de la légende, la corde (sa plus haute
   * élongation, puis ses graduations), l'encart à l'échelle vraie s'il est
   * RÉSERVÉ à cette étape (réservé, pas seulement dessiné : il n'apparaît
   * qu'après le verdict, et le film ne doit pas sauter à ce moment-là), puis
   * l'appareil, qui prend le reste.
   */
  function bandes(e: EtatRenduCorde): { corde: Bande; encart?: Bande; appareil?: Bande; a?: Bande; b?: Bande } {
    const g = Math.max(34, largeur * 0.1), d = Math.max(14, largeur * 0.035);
    const x0 = g, x1 = largeur - d;
    const pxM = (x1 - x0) / C.LONGUEUR;
    // la plus haute élongation de l'étape, en pixels (×20)
    const h = (e.yMaxFilm / 100) * C.EXAGERATION * pxM;
    if (e.vue === "photos") {
      // trois bandes de même hauteur ; la légende des clichés se pose à droite
      // (vers 3,1 m), où aucune secousse n'arrive : elle partage la hauteur de
      // la bosse sans la croiser
      // la corde du haut, SANS nombres : la règle graduée est sous les deux
      // photos (« la même règle graduée en dessous ») ; ses nombres tombaient
      // à quelques pixels du cadre de la première photo
      const hb = h + 6 + GRAD;
      const hc = h + 6 + 4;
      const libre = Math.max(0, hauteur - 4 - RESERVE_LEGENDE - hc - 2 * hb);
      const pas = Math.min(18, libre / 2);
      const corde = { x0, x1, y0: RESERVE_LEGENDE, y1: RESERVE_LEGENDE + hc };
      const a = { x0, x1, y0: corde.y1 + pas, y1: corde.y1 + pas + hb };
      const b = { x0, x1, y0: a.y1 + pas, y1: a.y1 + pas + hb };
      return { corde, a, b };
    }
    const corde = { x0, x1, y0: RESERVE_LEGENDE, y1: RESERVE_LEGENDE + h + 6 + GRAD };
    // l'encart : son titre à 8 px sous les nombres de la corde (vague 2 : 3 px)
    const encart = e.encart ? { x0, x1, y0: corde.y1 + 12, y1: corde.y1 + 28 } : undefined;
    // au-dessus de l'appareil : son titre (« y (cm) », ou celui du geste)
    const haut = (encart ? encart.y1 : corde.y1) + 20;
    const appareil = { x0, x1: e.vue === "photo" ? x0 + (x1 - x0) * 0.5 : x1, y0: haut, y1: hauteur - 4 };
    return { corde, encart, appareil };
  }

  // 12 px : la taille « caption » des jetons, celle des étiquettes posées sur la
  // scène — le canvas n'a pas une seconde échelle de texte (vague 2 : 10 et 11 px)
  const texte = (t: string, x: number, y: number, aligne: CanvasTextAlign = "center", taille = 12) => {
    const c = ctx!;
    c.font = `${taille}px ${police}`;
    c.textAlign = aligne;
    c.textBaseline = "top";
    c.fillStyle = css(jetons.encreDouce);
    c.fillText(t, x, y);
  };

  /**
   * Les abscisses d'un tracé : une grille FIXE (un point par pixel, toujours
   * aux mêmes places) plus les COUDES exacts du geste. Une grille qui glisse
   * avec l'instant (« n points entre 0 et t ») faisait trembler les sommets
   * d'une image à l'autre — invisible sur une capture, et un éclair par image
   * au sens du WCAG 2.3.1 pour la porte (14 par seconde au premier passage).
   */
  function abscisses(debut: number, fin: number, pas: number, coudes: number[]): number[] {
    const xs: number[] = [];
    for (let k = Math.ceil(debut / pas - 1e-9); k * pas <= fin + 1e-12; k++) xs.push(k * pas);
    for (const c of coudes) if (c > debut && c < fin) xs.push(c);
    xs.push(debut, fin);
    return [...new Set(xs.map((x) => Math.round(x * 1e9) / 1e9))].sort((a, b) => a - b);
  }
  /** Les instants où le geste change de pente. */
  const instantsCoudes = (g: C.Geste) => C.GESTE[g].sommets.map(([t]) => t);

  /**
   * Une corde dans une bande : l'axe des x gradué au demi-mètre (nombres au
   * mètre), la ligne de repos, et — si `t` n'est pas null — la corde à
   * l'instant t, pixel par pixel. Rend les fonctions de passage m → px.
   */
  function corde(b: Bande, e: EtatRenduCorde, t: number | null, nom: string, graduer = true) {
    const c = ctx!;
    const pxM = (b.x1 - b.x0) / C.LONGUEUR;
    const base = b.y1 - (graduer ? GRAD : 4);
    const px = (x: number) => b.x0 + x * pxM;
    // ×20 : un centimètre d'élongation = 20 cm à l'échelle des abscisses
    const pyCm = (yCm: number) => base - (yCm / 100) * C.EXAGERATION * pxM;
    c.strokeStyle = css(jetons.encreDouce, 0.55);
    c.lineWidth = 1;
    c.setLineDash([2, 4]);
    c.beginPath();
    c.moveTo(b.x0, base);
    c.lineTo(b.x1, base);
    c.stroke();
    c.setLineDash([]);
    if (graduer) {
      c.strokeStyle = css(jetons.encreDouce);
      c.beginPath();
      // Les traits restent à 3 px SOUS l'axe (la vague 2 les voulait attachés) :
      // la porte lit la hauteur de la corde colonne par colonne, et un trait
      // collé à la ligne de repos, aux abscisses mêmes qu'elle échantillonne
      // (tous les 0,5 m), déplaçait le centre du trait mesuré — essayé, et vu
      // par la porte (« cadres vides : 0/8 »). Un défaut visuel mineur contre
      // une mesure faussée : la mesure l'emporte.
      for (let k = 0; k <= 8; k++) {
        const X = px(k * 0.5);
        c.moveTo(X, base + 3);
        c.lineTo(X, base + (k % 2 === 0 ? 9 : 6));
      }
      c.stroke();
      for (let k = 0; k <= 4; k++) texte(String(k), px(k), base + 10);
    }
    for (let k = 0; k <= 4; k++) rep[`${nom}-x${k}`] = { x: px(k), y: base, visible: true };
    rep[`${nom}-1cm`] = { x: b.x0, y: pyCm(1), visible: true };
    if (t !== null) {
      c.strokeStyle = css(jetons.encre);
      c.lineWidth = 2.4;
      c.lineJoin = "round";
      c.beginPath();
      // les coudes de la photo : x = v·(t − tᵢ) pour chaque sommet du geste, et le front
      const coudes = [...instantsCoudes(e.geste).map((ti) => e.v * (t - ti)), e.v * t];
      abscisses(0, C.LONGUEUR, 1 / pxM, coudes).forEach((x, k) => {
        const X = px(x), Y = pyCm(C.elongation(e.geste, e.v, x, t));
        if (k === 0) c.moveTo(X, Y);
        else c.lineTo(X, Y);
      });
      c.stroke();
      rep[`${nom}-front`] = { x: px(C.front(e.v, t)), y: base, visible: true };
    }
    return { px, pyCm, base, pxM };
  }

  function rendre() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = css(jetons.surface);
    c.fillRect(0, 0, largeur, hauteur);
    rep = {};
    segs = [];
    if (!etat) return;
    const e = etat;
    const B = bandes(e);
    const encre = css(jetons.encre), douce = css(jetons.encreDouce), accent = css(jetons.accent), fond = css(jetons.surface);

    // ── LA CORDE, toujours ──
    const tCorde = e.anime ? e.t : 0;
    const K = corde(B.corde, e, tCorde, "corde", e.vue !== "photos");
    rep["corde-front"] = { x: K.px(C.front(e.v, tCorde)), y: K.base, visible: e.anime };
    // la main S : un bloc qui tient le bout, et qui monte avec le geste —
    // arrondi et plus petit (vague 2 : la masse la plus sombre de l'image)
    const yS = K.pyCm(C.source(e.geste, tCorde));
    c.fillStyle = encre;
    c.beginPath();
    if (typeof c.roundRect === "function") c.roundRect(B.corde.x0 - 7.5, yS - 8, 6, 16, 2);
    else c.rect(B.corde.x0 - 7.5, yS - 8, 6, 16);
    c.fill();
    rep["S"] = { x: B.corde.x0 - 4.5, y: yS, visible: true };
    // le point M : un anneau posé sur la corde — il monte et descend, il n'avance jamais
    const xM = K.px(e.d), yM = K.pyCm(C.elongation(e.geste, e.v, e.d, tCorde));
    c.fillStyle = fond;
    c.beginPath();
    c.arc(xM, yM, 6.5, 0, 2 * Math.PI);
    c.fill();
    c.strokeStyle = encre;
    c.lineWidth = 2.2;
    c.beginPath();
    c.arc(xM, yM, 4.5, 0, 2 * Math.PI);
    c.stroke();
    rep["M"] = { x: xM, y: yM, visible: true };
    rep["M-axe"] = { x: xM, y: K.base, visible: true };
    segs.push([{ x: B.corde.x0, y: K.base, visible: true }, { x: B.corde.x1, y: K.base, visible: true }]);

    // ── LA COTE DU FRONT (après la révélation) : sur la photo, et sur la corde
    //    de l'étape libre, qu'on photographie au curseur. La PENTE en accent,
    //    sur la photo seulement — c'est elle que le pari de l'étape 2 regardait ;
    //    à l'étape libre, l'accent est déjà sur y_M et sur τ (vague 2 : quatre
    //    objets en accent à la fois, l'accent ne désignait plus rien) ──
    if (e.vue !== "photos" && e.revele && e.coteFront && e.anime) {
      const xf = C.front(e.v, tCorde);
      const debut = Math.max(0, xf - e.v * C.GESTE[e.geste].montee);
      if (e.vue === "photo") {
        c.strokeStyle = accent;
        c.lineWidth = 3.2;
        c.lineCap = "round";
        c.beginPath();
        const n = 60;
        for (let k = 0; k <= n; k++) {
          const x = debut + ((xf - debut) * k) / n;
          const X = K.px(x), Y = K.pyCm(C.elongation(e.geste, e.v, x, tCorde));
          if (k === 0) c.moveTo(X, Y);
          else c.lineTo(X, Y);
        }
        c.stroke();
        c.lineCap = "butt";
      }
      // la cote : un trait vertical jusqu'à l'axe, au front
      c.strokeStyle = accent;
      c.lineWidth = 1.5;
      c.setLineDash([4, 3]);
      c.beginPath();
      c.moveTo(K.px(xf), K.base);
      c.lineTo(K.px(xf), K.pyCm(C.GESTE[e.geste].amplitudeCm) - 6);
      c.stroke();
      c.setLineDash([]);
      rep["cote-front"] = { x: K.px(xf), y: K.pyCm(C.GESTE[e.geste].amplitudeCm) - 14, visible: true };
      rep["pente-haut"] = { x: K.px(debut), y: K.pyCm(C.GESTE[e.geste].amplitudeCm), visible: true };
      rep["pente-bas"] = { x: K.px(xf), y: K.base, visible: true };
    }

    // ── L'ENCART À L'ÉCHELLE VRAIE (×1), sous la corde ──
    if (B.encart && e.encartVrai && e.anime) {
      const b = B.encart;
      const pxM = (b.x1 - b.x0) / C.LONGUEUR;
      const base = b.y1 - 2;
      c.strokeStyle = encre;
      c.lineWidth = 1.4;
      c.beginPath();
      const coudes = [...instantsCoudes(e.geste).map((ti) => e.v * (tCorde - ti)), e.v * tCorde];
      abscisses(0, C.LONGUEUR, 1 / pxM, coudes).forEach((x, k) => {
        const X = b.x0 + x * pxM, Y = base - (C.elongation(e.geste, e.v, x, tCorde) / 100) * pxM;
        if (k === 0) c.moveTo(X, Y);
        else c.lineTo(X, Y);
      });
      c.stroke();
      rep["encart-x0"] = { x: b.x0, y: base, visible: true };
      rep["encart-x4"] = { x: b.x1, y: base, visible: true };
      rep["encart-1cm"] = { x: b.x0, y: base - pxM / 100, visible: true };
      // le titre DANS la bande, à gauche : à t = 1,0 s la secousse est à droite
      // (3,2 à 4,0 m), la corde vraie est plate sous le texte
      texte("la même corde, à l’échelle vraie", b.x0 + 4, b.y0 - 1, "left", 10);
    }

    // ── LE FILM ──
    if (e.vue === "film" && B.appareil) {
      const b = B.appareil;
      const base = b.y1 - 20;
      const ft = (t: number) => b.x0 + (t / C.T_FILM) * (b.x1 - b.x0);
      const fy = (yCm: number) => base - (yCm / e.yMaxFilm) * (base - b.y0 - 6);
      c.strokeStyle = douce;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(b.x0, b.y0);
      c.lineTo(b.x0, base);
      c.lineTo(b.x1, base);
      for (let k = 0; k <= 10; k++) {
        c.moveTo(ft(k * 0.1), base);
        c.lineTo(ft(k * 0.1), base + (k % 5 === 0 ? 7 : 4));
      }
      for (let y = 1; y <= e.yMaxFilm + 1e-9; y += 1) {
        c.moveTo(b.x0 - 4, fy(y));
        c.lineTo(b.x0, fy(y));
      }
      c.stroke();
      for (const k of [0, 5, 10]) texte(C.nombre(k / 10, 1), ft(k / 10), base + 8);
      for (let y = 3; y <= e.yMaxFilm + 1e-9; y += 3) texte(String(y), b.x0 - 7, fy(y) - 7, "right");
      rep["film-t0"] = { x: ft(0), y: base, visible: true };
      rep["film-t1"] = { x: ft(1), y: base, visible: true };
      rep["film-y0"] = { x: b.x0, y: base, visible: true };
      rep["film-ymax"] = { x: b.x0, y: fy(e.yMaxFilm), visible: true };
      rep["film-axe-t"] = { x: b.x1, y: base - 10, visible: true };
      rep["film-axe-y"] = { x: b.x0 + 16, y: b.y0 + 4, visible: true };
      const tracer = (g: C.Geste, x: number, jusqua: number, style: string, larg: number, tirets: number[] = []) => {
        c.strokeStyle = style;
        c.lineWidth = larg;
        c.setLineDash(tirets);
        c.beginPath();
        // les coudes du film : t = x/v + tᵢ
        const coudes = instantsCoudes(g).map((ti) => x / e.v + ti);
        abscisses(0, jusqua, C.T_FILM / (b.x1 - b.x0), coudes).forEach((t, k) => {
          const X = ft(t), Y = fy(C.elongation(g, e.v, x, t));
          if (k === 0) c.moveTo(X, Y);
          else c.lineTo(X, Y);
        });
        c.stroke();
        c.setLineDash([]);
      };
      // la référence de l'étape 4 : le film de M pour l'ancien geste, à l'encre douce
      // l'échelle des traits monte avec l'importance (vague 2 : la référence,
      // un état passé, pesait plus que y_S, la source qu'on compare) :
      // référence 1,4 en tirets < y_S 2,0 < y_M 2,4
      if (e.reference) tracer(e.reference.geste, e.d, Math.min(C.T_FILM, e.reference.jusqua), douce, 1.4, [5, 4]);
      if (e.trace !== null) {
        const j = Math.min(C.T_FILM, e.trace);
        tracer(e.geste, 0, j, douce, 2);
        // y_M : à l'encre pendant la course ; en accent une fois la réponse révélée
        tracer(e.geste, e.d, j, e.revele ? accent : encre, 2.4);
        const tauM = C.retard(e.d, e.v);
        rep["film-depart-S"] = { x: ft(0), y: base, visible: true };
        rep["film-depart-M"] = { x: ft(tauM), y: base, visible: j >= tauM };
        rep["film-yS"] = { x: ft(Math.min(j, C.GESTE[e.geste].montee)), y: fy(C.source(e.geste, Math.min(j, C.GESTE[e.geste].montee))), visible: true };
        rep["film-yM"] = { x: ft(Math.min(j, tauM + C.GESTE[e.geste].montee)), y: fy(C.elongation(e.geste, e.v, e.d, Math.min(j, tauM + C.GESTE[e.geste].montee))), visible: j > tauM };
      }
      // l'instant que la corde montre, sur l'axe du temps
      if (e.anime && e.t <= C.T_FILM + 1e-9) {
        c.strokeStyle = douce;
        c.globalAlpha = 0.45;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(ft(e.t), b.y0);
        c.lineTo(ft(e.t), base);
        c.stroke();
        c.globalAlpha = 1;
      }
      if (e.revele && e.repereTau) {
        const tauM = C.retard(e.d, e.v);
        const yy = base - 5;
        c.strokeStyle = accent;
        c.lineWidth = 1.8;
        c.beginPath();
        c.moveTo(ft(0), yy);
        c.lineTo(ft(tauM), yy);
        c.moveTo(ft(0), yy - 5);
        c.lineTo(ft(0), yy + 5);
        c.moveTo(ft(tauM), yy - 5);
        c.lineTo(ft(tauM), yy + 5);
        c.stroke();
        rep["tau"] = { x: (ft(0) + ft(tauM)) / 2, y: yy - 12, visible: true };
        rep["tau-debut"] = { x: ft(0), y: yy, visible: true };
        rep["tau-fin"] = { x: ft(tauM), y: yy, visible: true };
      }
      if (e.revele && e.departCommun) {
        const tauM = C.retard(e.d, e.v);
        c.strokeStyle = accent;
        c.lineWidth = 1.5;
        c.setLineDash([4, 3]);
        c.beginPath();
        c.moveTo(ft(tauM), b.y0);
        c.lineTo(ft(tauM), base);
        c.stroke();
        c.setLineDash([]);
        rep["depart-commun"] = { x: ft(tauM), y: b.y0 + 8, visible: true };
      }
    }

    // ── LE GESTE, en petit (la donnée de la photo) ──
    if (e.vue === "photo" && B.appareil) {
      const b = B.appareil;
      const base = b.y1 - 20;
      const tMax = 0.3;
      const ft = (t: number) => b.x0 + (t / tMax) * (b.x1 - b.x0);
      const fy = (yCm: number) => base - (yCm / 3) * (base - b.y0 - 10);
      c.strokeStyle = douce;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(b.x0, b.y0);
      c.lineTo(b.x0, base);
      c.lineTo(b.x1, base);
      for (let k = 0; k <= 3; k++) {
        c.moveTo(ft(k * 0.1), base);
        c.lineTo(ft(k * 0.1), base + 5);
      }
      c.stroke();
      for (let k = 0; k <= 3; k++) texte(C.nombre(k * 0.1, 1), ft(k * 0.1), base + 8);
      texte("3", b.x0 - 6, fy(3) - 7, "right");
      c.strokeStyle = encre;
      c.lineWidth = 2;
      c.beginPath();
      for (let k = 0; k <= 60; k++) {
        const t = (k / 60) * tMax;
        const X = ft(t), Y = fy(C.source(e.geste, t));
        if (k === 0) c.moveTo(X, Y);
        else c.lineTo(X, Y);
      }
      c.stroke();
      rep["geste-titre"] = { x: (b.x0 + b.x1) / 2, y: b.y0 - 2, visible: true };
      rep["geste-axe-t"] = { x: b.x1 + 14, y: base - 2, visible: true };
    }

    // ── LES DEUX CLICHÉS ──
    if (e.vue === "photos" && B.a && B.b) {
      const BA = B.a, BB = B.b;
      const ca = corde(BA, e, e.cliches ? e.cliches.tA : null, "cliche-a");
      const cb = corde(BB, e, e.cliches ? e.cliches.tB : null, "cliche-b");
      // les légendes des clichés à droite, vers 3,2 m : aucune secousse n'y
      // arrive avant la dernière photo (au plus 1,80 m à 0,45 s)
      // (alignées sur le bord de 4 m, comme « x (m) » : la panel les pose par leur droite)
      rep["cliche-a-titre"] = { x: ca.px(C.LONGUEUR), y: BA.y0, visible: true };
      rep["cliche-b-titre"] = { x: cb.px(C.LONGUEUR), y: BB.y0, visible: true };
      if (e.cliches && e.revele && e.regleMesure) {
        const xa = C.front(e.v, e.cliches.tA), xb = C.front(e.v, e.cliches.tB);
        c.strokeStyle = accent;
        c.lineWidth = 1.5;
        c.setLineDash([4, 3]);
        c.beginPath();
        c.moveTo(ca.px(xa), BA.y0 + 6);
        c.lineTo(ca.px(xa), cb.base);
        c.moveTo(cb.px(xb), BB.y0 + 6);
        c.lineTo(cb.px(xb), cb.base);
        c.stroke();
        c.setLineDash([]);
        const yy = cb.base - 6;
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(cb.px(xa), yy);
        c.lineTo(cb.px(xb), yy);
        c.moveTo(cb.px(xa), yy - 5);
        c.lineTo(cb.px(xa), yy + 5);
        c.moveTo(cb.px(xb), yy - 5);
        c.lineTo(cb.px(xb), yy + 5);
        c.stroke();
        rep["regle-mesure"] = { x: (cb.px(xa) + cb.px(xb)) / 2, y: yy - 12, visible: true };
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
  };
}
