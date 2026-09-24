/**
 * noyaux-rendu.ts — « la courbe et les noyaux », DESSINÉE en Canvas 2D (spec
 * content/pc/decroissance-radioactive/spec-scene-noyaux.md §5.2 et §6). Aucune 3D, aucun
 * WebGL, aucun three.js : `window.__THREE__` reste indéfini panneau ouvert, et
 * la porte le vérifie. Les couleurs sont lues dans les jetons
 * (`lib/jetons-figure.ts` — pas `scene3d/palette.ts`, qui importerait three).
 *
 * UN SEUL APPAREIL À LA FOIS (spec §5.5, `support`) :
 *  - « courbe » : la loi tracée sur le QUADRILLAGE DU BAC — traits majeurs tous
 *    les 8 jours et tous les 10¹⁴ noyaux (ou 10⁸ Bq), traits fins à la moitié.
 *    Le départ est sur le quatrième trait majeur, sa moitié sur le deuxième, et
 *    la courbe passe EXACTEMENT par le croisement (8 j ; 2) : la lecture de t½
 *    est une construction, pas une estimation ;
 *  - « grille » : un noyau par case, et à côté le petit graphe du compte.
 *
 * L'ÉNONCÉ est à l'encre — axes, graduations, quadrillage (plus doux que la
 * courbe, jamais plus contrasté), la courbe, la grille pleine, le curseur, le
 * repère du départ. L'ACCENT ne marque que ce qui répond au pari, et seulement
 * après la révélation : la construction, le crochet, les cases vidées, la loi
 * sur le graphe du compte, la seconde courbe (spec §6).
 */
import * as N from "./noyaux-modele";
import { lireJetons, type RGB } from "../jetons-figure";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export type Support = "courbe" | "grille";
export type Grandeur = "noyaux" | "activite";

export interface EtatRenduNoyaux {
  support: Support;
  /** l'isotope que lisent le curseur, le crochet, la construction et la grille */
  isotope: N.Isotope;
  /** l'étape libre, révélée : les DEUX échantillons (le premier à l'encre, le second en accent) */
  deuxCourbes: boolean;
  /** jours : jusqu'où la courbe est tracée et l'axe gradué (10 à l'étape 1 — spec §2.3) */
  fenetre: number;
  grandeur: Grandeur;
  /** l'instant du curseur (null : pas de curseur à cette étape) */
  curseur: number | null;
  /** le départ du crochet (null : pas de repère de départ à cette étape) */
  depart: number | null;
  /** la construction de t½ depuis l'ordonnée moitié, en accent */
  construction: boolean;
  /** le crochet (départ → moitié), en accent */
  crochet: boolean;
  /** après la révélation : l'accent a le droit d'exister */
  revele: boolean;
  // ── la grille ──
  population: N.Population;
  /** le tirage en cours (null : grille pleine, aucune course) */
  tirage: Float64Array | null;
  /** l'instant que la grille montre, en jours */
  t: number;
}

export interface RenduNoyaux {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduNoyaux): void;
  /** les repères, en pixels CSS du canvas (la porte les lit ; les étiquettes s'y posent) */
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  /**
   * Les bandes des NOMBRES d'axes (et de leurs titres) : aucune étiquette ne s'y
   * pose. Vague 2, dessin : à 390 px, « 8,0 jours » (le crochet) et « second
   * isotope » tombaient dans la rangée des graduations — « 16  8,0 jours  24 »,
   * la réponse de l'étape déguisée en graduation.
   */
  zones(): { x0: number; y0: number; x1: number; y1: number }[];
}

/**
 * La hauteur réservée à la légende du plateau, une pastille opaque en haut à
 * gauche : rien de ce que la scène dessine ne monte sous elle (leçon de la
 * corde, famille `cadre`).
 */
export const RESERVE_LEGENDE = 30;

/** L'unité de l'axe vertical : 10¹⁴ noyaux, ou 10⁸ Bq (spec §5.2). */
export const UNITE: Record<Grandeur, number> = { noyaux: 1e14, activite: 1e8 };

/** La valeur de la loi dans l'unité de l'axe. */
export const valeurAxe = (iso: N.Isotope, t: number, g: Grandeur) => (g === "noyaux" ? N.noyaux(iso, t) : N.activite(iso, t)) / UNITE[g];

/**
 * Le haut du cadre vertical, en unités de l'axe : 5 (le quatrième trait porte
 * le départ, le cinquième ferme le cadre sans nombre, comme au sujet) — sauf
 * quand l'activité du second isotope est tracée : 8,0×10⁸ Bq au départ, le
 * cadre monte à 9.
 */
export const hautAxe = (g: Grandeur, isotopes: readonly N.Isotope[]) => (g === "activite" && isotopes.includes("4") ? 9 : 5);

export function creerRenduNoyaux(canvas: HTMLCanvasElement, hote: HTMLElement): RenduNoyaux {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 320, dpr = 1;
  let etat: EtatRenduNoyaux | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zonesNombres: { x0: number; y0: number; x1: number; y1: number }[] = [];
  /** le tirage trié, pour compter vite à chaque image (clé : l'objet tirage) */
  let trie: { de: Float64Array; fins: Float64Array } | null = null;

  const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });

  // 12 px : la taille « caption » des jetons, celle des étiquettes posées sur la scène
  const texte = (t: string, x: number, y: number, aligne: CanvasTextAlign = "center", base: CanvasTextBaseline = "top", encre = false) => {
    const c = ctx!;
    c.font = `12px ${police}`;
    c.textAlign = aligne;
    c.textBaseline = base;
    c.fillStyle = css(encre ? jetons.encre : jetons.encreDouce);
    c.fillText(t, x, y);
  };
  /** Un trait de 1 px posé au milieu d'un pixel : net, et à ≤ 0,5 px de sa place exacte. */
  const net = (v: number) => Math.round(v - 0.5) + 0.5;

  // ── LA COURBE ─────────────────────────────────────────────────────────────
  function rendreCourbe(e: EtatRenduNoyaux) {
    const c = ctx!;
    const encre = css(jetons.encre), accent = css(jetons.accent), fond = css(jetons.surface);
    const isotopes: N.Isotope[] = e.deuxCourbes ? ["8", "4"] : [e.isotope];
    const yMax = hautAxe(e.grandeur, isotopes);
    // le cadre : à gauche les nombres de l'axe vertical, en bas ceux du temps
    // et, sur une seconde ligne, le titre de l'axe du temps
    const x0 = Math.max(36, Math.round(largeur * 0.075)), x1 = largeur - 16;
    const y0 = RESERVE_LEGENDE + 28, y1 = hauteur - 36;
    const X = (t: number) => x0 + (t / e.fenetre) * (x1 - x0);
    const Y = (v: number) => y1 - (v / yMax) * (y1 - y0);

    // ── le QUADRILLAGE : l'énoncé, à l'encre douce, les fins plus légers que
    //    les majeurs, les majeurs plus légers que la courbe (spec §5.2) ──
    // les fins : à mi-chemin de deux majeurs (4 j, 0,5 unité), jamais sur un majeur
    // (le pas vertical et le pas horizontal ne partagent pas le même k : deux boucles)
    // Poids (vague 2) : les FORTS au-dessus de 3:1 sur la surface — WCAG 1.4.11,
    // un graphique nécessaire à la lecture ; ce sont eux qu'on compte (« deux
    // gros carreaux »). La critique du calme voulait le murmure de 1,98:1 ; la
    // norme l'emporte sur le goût maison (ADR 0039). Les fins restent en dessous,
    // la courbe (≈16:1) loin au-dessus.
    // L'« environ 3:1 » était 2,91:1 à 0,6 (#55524A sur #FFFFFF, calculé) —
    // SOUS le plancher qu'il citait ; 0,7 donne 3,6:1 (vague 2 du banc de
    // diffraction, qui a trouvé le même 0,6 dans son propre graphe).
    c.strokeStyle = css(jetons.encreDouce, 0.3);
    c.lineWidth = 1;
    c.beginPath();
    for (let t = 4; t <= e.fenetre + 1e-9; t += 8) {
      const x = net(X(t));
      c.moveTo(x, y0);
      c.lineTo(x, y1);
    }
    for (let v = 0.5; v <= yMax + 1e-9; v += 1) {
      const y = net(Y(v));
      c.moveTo(x0, y);
      c.lineTo(x1, y);
    }
    c.stroke();
    // les majeurs : tous les 8 j et tous les 1 unité
    c.strokeStyle = css(jetons.encreDouce, 0.7);
    c.beginPath();
    for (let t = 8; t <= e.fenetre + 1e-9; t += 8) {
      const x = net(X(t));
      c.moveTo(x, y0);
      c.lineTo(x, y1);
    }
    for (let v = 1; v <= yMax + 1e-9; v += 1) {
      const y = net(Y(v));
      c.moveTo(x0, y);
      c.lineTo(x1, y);
    }
    // le bord droit du cadre, quand la fenêtre ne tombe pas sur un majeur (10 j)
    if (Math.abs(e.fenetre / 8 - Math.round(e.fenetre / 8)) > 1e-9) {
      c.moveTo(net(x1), y0);
      c.lineTo(net(x1), y1);
    }
    c.stroke();
    // les axes
    c.strokeStyle = css(jetons.encreDouce, 0.95);
    c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(net(x0), y0 - 4);
    c.lineTo(net(x0), net(y1));
    c.lineTo(x1, net(y1));
    c.stroke();
    // les NOMBRES : les majeurs sauf le dernier (le bord du cadre, comme au sujet)
    texte("0", x0 - 10, y1 + 5, "right", "top", true);
    for (let t = 8; t < e.fenetre - 1e-9 || (t <= e.fenetre + 1e-9 && e.fenetre % 8 !== 0); t += 8) {
      if (t >= e.fenetre - 1e-9 && e.fenetre % 8 === 0) break;
      texte(String(t), X(t), y1 + 5, "center", "top", true);
    }
    for (let v = 1; v < yMax; v++) texte(String(v), x0 - 10, Y(v), "right", "middle", true);
    zonesNombres = [
      { x0: 0, y0: y1 + 2, x1: largeur, y1: hauteur },
      { x0: 0, y0: y0 - 6, x1: x0 - 2, y1: y1 + 2 },
    ];
    for (let t = 0; t <= e.fenetre + 1e-9; t += 4) rep[`axe-t${t}`] = P(X(t), y1);
    rep[`axe-tfin`] = P(X(e.fenetre), y1);
    for (let v = 0; v <= yMax; v++) rep[`axe-y${v}`] = P(x0, Y(v));
    rep["axe-titre-t"] = P(x1, y1 + 26);
    rep["axe-titre-y"] = P(8, RESERVE_LEGENDE + 13);
    segs.push([P(x0, y0), P(x0, y1)], [P(x0, y1), P(x1, y1)]);

    // ── les COURBES : le premier échantillon à l'encre, le second en accent ──
    const pasPx = e.fenetre / (x1 - x0);
    for (const iso of isotopes) {
      const second = e.deuxCourbes && iso === "4";
      c.strokeStyle = second ? accent : encre;
      c.lineWidth = 2.2;
      c.lineJoin = "round";
      c.beginPath();
      let precedent: Projection | null = null;
      for (let k = 0; ; k++) {
        const t = Math.min(e.fenetre, k * pasPx);
        const p = P(X(t), Y(valeurAxe(iso, t, e.grandeur)));
        if (k === 0) c.moveTo(p.x, p.y);
        else c.lineTo(p.x, p.y);
        // quelques segments pour que les étiquettes évitent la courbe
        if (k % 12 === 0 || t >= e.fenetre) {
          if (precedent) segs.push([precedent, p]);
          precedent = p;
        }
        if (t >= e.fenetre) break;
      }
      c.stroke();
      const nom = second ? "second" : "courbe";
      rep[`${nom}-0`] = P(X(0), Y(valeurAxe(iso, 0, e.grandeur)));
      rep[`${nom}-fin`] = P(X(e.fenetre), Y(valeurAxe(iso, e.fenetre, e.grandeur)));
    }

    const iso = e.isotope;
    const th = N.T_DEMI[iso];
    const v = (t: number) => valeurAxe(iso, t, e.grandeur);

    // ── le REPÈRE DU DÉPART (l'énoncé de l'étape 2 : visible avant le pari) ──
    if (e.depart !== null) {
      const t1 = e.depart;
      const p1 = P(X(t1), Y(v(t1)));
      c.strokeStyle = css(jetons.encreDouce, 0.7);
      c.lineWidth = 1;
      c.setLineDash([3, 3]);
      c.beginPath();
      c.moveTo(p1.x, y1);
      c.lineTo(p1.x, p1.y);
      c.moveTo(x0, p1.y);
      c.lineTo(p1.x, p1.y);
      c.stroke();
      c.setLineDash([]);
      rep["depart"] = p1;
      rep["depart-axe"] = P(p1.x, y1);
    }

    // ── le CROCHET (en accent, après la révélation) : de la courbe à t₁ jusqu'à
    //    la courbe là où il ne reste que la moitié. Sa hauteur s'effondre quand
    //    on le déplace ; sa LARGEUR ne bouge pas (spec §2.2) ──
    //    À l'étape libre, deux courbes : le crochet prend la TEINTE de la courbe
    //    qu'il mesure (vague 2, captures : posé en accent sur la courbe noire de
    //    l'iode, il se lisait comme une mesure de la courbe accent du second
    //    isotope — la porte, elle, l'écartait avant de lire cette courbe).
    if (e.crochet && e.revele && e.depart !== null) {
      const teinte = e.deuxCourbes && e.isotope !== "4" ? encre : accent;
      const t1 = e.depart;
      const p1 = P(X(t1), Y(v(t1)));
      const yh = Y(v(t1) / 2);
      const xd = X(t1 + th);
      c.strokeStyle = teinte;
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(p1.x, p1.y);
      c.lineTo(p1.x, yh);
      c.stroke();
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(p1.x, yh);
      c.lineTo(xd, yh);
      // les pointes : ± 7 px — la courbe du second isotope passe PAR la pointe
      // droite ; à 6 px de la cote elle s'en est écartée, et la porte y lit
      // les deux pointes sans les confondre avec elle
      c.moveTo(p1.x, yh - 7);
      c.lineTo(p1.x, yh + 7);
      c.moveTo(xd, yh - 7);
      c.lineTo(xd, yh + 7);
      c.stroke();
      c.fillStyle = teinte;
      c.beginPath();
      c.arc(xd, yh, 3.5, 0, 2 * Math.PI);
      c.fill();
      rep["crochet-g"] = P(p1.x, yh);
      rep["crochet-d"] = P(xd, yh);
      rep["demi"] = P(xd, yh);
      rep["crochet-cote"] = P((p1.x + xd) / 2, yh);
      segs.push([P(p1.x, p1.y), P(p1.x, yh)], [P(p1.x, yh), P(xd, yh)]);
    }

    // ── la CONSTRUCTION de t½ (en accent, après la révélation) : l'ordonnée
    //    moitié, l'horizontale jusqu'à la courbe, la verticale jusqu'à l'axe —
    //    elle finit sur un CROISEMENT de traits majeurs (spec §5.2) ──
    if (e.construction && e.revele) {
      const yh = Y(v(0) / 2), xh = X(th);
      c.strokeStyle = accent;
      c.lineWidth = 1.6;
      c.setLineDash([5, 3]);
      c.beginPath();
      c.moveTo(x0, yh);
      c.lineTo(xh, yh);
      c.lineTo(xh, y1);
      c.stroke();
      c.setLineDash([]);
      c.lineWidth = 2.4;
      c.beginPath();
      c.moveTo(xh, y1 - 6);
      c.lineTo(xh, y1 + 3);
      c.stroke();
      c.fillStyle = accent;
      c.beginPath();
      c.arc(xh, yh, 3.5, 0, 2 * Math.PI);
      c.fill();
      rep["construction-y"] = P(x0, yh);
      rep["construction-p"] = P(xh, yh);
      rep["construction-t"] = P(xh, y1);
      segs.push([P(x0, yh), P(xh, yh)], [P(xh, yh), P(xh, y1)]);
    }

    // ── le CURSEUR (l'énoncé : un point qu'on promène sur la courbe) ──
    if (e.curseur !== null) {
      const p = P(X(e.curseur), Y(v(e.curseur)));
      c.strokeStyle = css(jetons.encreDouce, 0.5);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(p.x, y1);
      c.lineTo(p.x, p.y);
      c.stroke();
      c.fillStyle = fond;
      c.beginPath();
      c.arc(p.x, p.y, 6, 0, 2 * Math.PI);
      c.fill();
      c.fillStyle = encre;
      c.beginPath();
      c.arc(p.x, p.y, 4, 0, 2 * Math.PI);
      c.fill();
      rep["curseur"] = p;
      rep["curseur-axe"] = P(p.x, y1);
    }
    if (e.depart !== null) {
      // l'anneau du départ, par-dessus le crochet
      const p1 = rep["depart"];
      c.fillStyle = fond;
      c.beginPath();
      c.arc(p1.x, p1.y, 6.5, 0, 2 * Math.PI);
      c.fill();
      c.strokeStyle = encre;
      c.lineWidth = 2.2;
      c.beginPath();
      c.arc(p1.x, p1.y, 4.5, 0, 2 * Math.PI);
      c.stroke();
    }
  }

  // ── LA GRILLE ─────────────────────────────────────────────────────────────
  function rendreGrille(e: EtatRenduNoyaux) {
    const c = ctx!;
    const encre = css(jetons.encre), accent = css(jetons.accent);
    const n = e.population;
    const cotes = Math.round(Math.sqrt(n));
    const bas = hauteur - 10;
    const cote = Math.floor(Math.min(bas - RESERVE_LEGENDE - 8, largeur * 0.48) / cotes) * cotes;
    const gx0 = 16, gy0 = RESERVE_LEGENDE + 8;
    const pas = cote / cotes;
    // l'écart entre deux cases : 1 px, 2 px quand elles sont grandes
    const jeu = pas >= 14 ? 2 : 1;
    const t = e.tirage ? e.t : 0;
    if (e.tirage && (!trie || trie.de !== e.tirage)) trie = { de: e.tirage, fins: Float64Array.from(e.tirage).sort() };
    const videe = (i: number) => e.tirage !== null && e.tirage[i] <= t + 1e-9;
    // les cases pleines d'abord, en un seul remplissage
    c.fillStyle = css(jetons.encreDouce, 0.7);
    c.beginPath();
    for (let i = 0; i < n; i++) {
      if (videe(i)) continue;
      const cx = gx0 + (i % cotes) * pas, cy = gy0 + Math.floor(i / cotes) * pas;
      c.rect(cx + jeu / 2, cy + jeu / 2, pas - jeu, pas - jeu);
    }
    c.fill();
    // une case vidée n'est PAS effacée : son contour reste — c'est toujours un
    // noyau, ce n'est plus de l'iode 131 (spec §6). JAMAIS en accent (vague 2,
    // dessin et calme d'accord) : 775 contours d'accent faisaient de la grille
    // l'objet le plus bruyant de la page, et ils marquaient le COMPLÉMENT de ce
    // que le pari demandait (combien RESTENT). La figure et le fond tiennent
    // par « plein / vidé », pas par la teinte ; l'accent de la révélation est
    // la loi, sur le graphe du compte. Et à 1 024 cases, pas de contour du tout
    // (calme) : à 6 px, un contour ne dit plus « c'est un noyau », il fait de la neige.
    if (cotes < 32) {
      c.strokeStyle = css(jetons.encreDouce, 0.55);
      c.lineWidth = 1;
      c.beginPath();
      for (let i = 0; i < n; i++) {
        if (!videe(i)) continue;
        const cx = gx0 + (i % cotes) * pas, cy = gy0 + Math.floor(i / cotes) * pas;
        c.rect(cx + jeu / 2 + 0.5, cy + jeu / 2 + 0.5, pas - jeu - 1, pas - jeu - 1);
      }
      c.stroke();
    }
    rep["grille-0"] = P(gx0, gy0);
    rep["grille-1"] = P(gx0 + cote, gy0 + cote);

    // ── le GRAPHE DU COMPTE, à droite : ce qu'on compte, en escalier ; la loi,
    //    en accent, après la révélation (« la courbe superposée ») ──
    const gauche = gx0 + cote + 40;
    const cx0 = gauche, cx1 = largeur - 16;
    const cy0 = RESERVE_LEGENDE + 22, cy1 = hauteur - 44;
    if (cx1 - cx0 < 40) return;
    const th = N.T_DEMI[e.isotope];
    const GX = (tt: number) => cx0 + (tt / N.COURSE_J) * (cx1 - cx0);
    const GY = (k: number) => cy1 - (k / n) * (cy1 - cy0);
    c.strokeStyle = css(jetons.encreDouce, 0.95);
    c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(net(cx0), cy0 - 4);
    c.lineTo(net(cx0), net(cy1));
    c.lineTo(cx1, net(cy1));
    for (const tt of [0, 8, 16]) {
      c.moveTo(GX(tt), cy1);
      c.lineTo(GX(tt), cy1 + 4);
    }
    c.stroke();
    // la moitié et l'instant d'une demi-vie, en tirets doux — une fois qu'il y
    // a un tirage à lire (vague 2, calme : avant le pari, un axe vide suffit)
    if (e.tirage) {
      c.strokeStyle = css(jetons.encreDouce, 0.45);
      c.lineWidth = 1;
      c.setLineDash([3, 3]);
      c.beginPath();
      c.moveTo(cx0, net(GY(n / 2)));
      c.lineTo(cx1, net(GY(n / 2)));
      c.moveTo(net(GX(th)), cy0);
      c.lineTo(net(GX(th)), cy1);
      c.stroke();
      c.setLineDash([]);
    }
    texte(String(n), cx0 - 5, GY(n), "right", "middle");
    texte(String(n / 2), cx0 - 5, GY(n / 2), "right", "middle");
    texte("0", cx0 - 5, cy1, "right", "middle");
    for (const tt of [0, 8, 16]) texte(String(tt), GX(tt), cy1 + 6);
    rep["graphe-o"] = P(cx0, cy1);
    rep["graphe-t16"] = P(GX(16), cy1);
    rep["graphe-n"] = P(cx0, GY(n));
    rep["graphe-demi"] = P(GX(th), cy1);
    rep["graphe-titre"] = P(cx0 - 5, RESERVE_LEGENDE + 10);
    rep["graphe-titre-t"] = P(cx1, cy1 + 31);
    zonesNombres = [{ x0: cx0 - 40, y0: cy1 + 2, x1: largeur, y1: hauteur }];
    segs.push([P(cx0, cy0), P(cx0, cy1)], [P(cx0, cy1), P(cx1, cy1)]);
    if (e.revele) {
      c.strokeStyle = accent;
      c.lineWidth = 2;
      c.beginPath();
      for (let k = 0; k <= 64; k++) {
        const tt = (k / 64) * N.COURSE_J;
        const x = GX(tt), y = GY(n * Math.pow(2, -tt / th));
        if (k === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.stroke();
    }
    if (e.tirage && trie) {
      // l'escalier du compte, jusqu'à l'instant montré : un pas par pas du tirage
      const fins = trie.fins;
      let parties = 0;
      c.strokeStyle = encre;
      c.lineWidth = 1.6;
      c.beginPath();
      c.moveTo(GX(0), GY(n));
      const pasMax = Math.round(Math.min(t, N.COURSE_J) / N.DT);
      for (let k = 1; k <= pasMax; k++) {
        const tt = k * N.DT;
        const avant = n - parties;
        while (parties < fins.length && fins[parties] <= tt + 1e-9) parties++;
        c.lineTo(GX(tt), GY(avant));
        c.lineTo(GX(tt), GY(n - parties));
      }
      c.stroke();
      rep["graphe-compte"] = P(GX(Math.min(t, N.COURSE_J)), GY(n - parties));
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
    if (etat.support === "courbe") rendreCourbe(etat);
    else rendreGrille(etat);
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
  };
}
