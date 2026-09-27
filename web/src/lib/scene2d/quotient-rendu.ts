/**
 * quotient-rendu.ts — le rendu Canvas 2D de « l'échelle des quotients » (PC ·
 * evolution-spontanee ; spec
 * docs/pipeline/propositions/pc-evolution-spontanee-scene-quotient.md §5.5, §6.2, §11.2).
 *
 * TROIS OBJETS, DÉCLARÉS SÉPARÉMENT (§5.5). L'AXE D'ENSEMBLE (A) : fixe, 46 décades,
 * 10⁻⁴ … 10⁴², jamais redimensionné — c'est ce qui rend comparables les trois pivots K. La
 * BANDE DE TRAVAIL (B) : un encart de 8 décades centré sur K, sa PROPRE échelle, absente du
 * DOM avant S3 (le panneau ne l'envoie pas). Le BÉCHER (C) : la lame (toujours) et, au bain B
 * seulement, un dépôt (§5.5 C, `deuxSolides`). Chaque objet a un px/décade STRICTEMENT
 * constant, propre à lui — la seule garantie que la longueur dessinée veuille dire quelque
 * chose (§10.1, famille de porte `axe-decades` / `bande-de-travail`).
 *
 * LA LANGUE VISUELLE (§6.2). À l'ENCRE : l'axe, ses graduations, le pivot K (tige + disque),
 * le repère Q_{r,i} (une pastille — jamais la même forme que le pivot), le bécher, la lame, le
 * dépôt. À l'ACCENT, et seulement quand `accent` est vrai (la révélation du pari courant) : la
 * flèche du verdict (jamais à l'équilibre) et, au bécher, les deux flèches d'électrons + les
 * deux rôles. Le CHEVRON (hors bande) est une forme à part — un triangle plein, jamais une
 * pastille plafonnée au bord (§5.5 B, sabotage 29).
 *
 * `logQ: null` est le signal explicite du panneau pour « ce pari porte sur la valeur, ne la
 * montre nulle part » (S4 avant l'engagement, F4) : aucune pastille, aucune étiquette, aucun
 * chevron, sur l'axe COMME dans la bande.
 *
 * TOUT TRACÉ DE GRADUATION EST OPAQUE (jamais un trait semi-transparent dont les sous-chemins
 * se croisent — leçon du banc de modulation, ADR 0041 addendum). Les remplissages (solution,
 * dépôt) passent par `voile`, qui mélange dans le fond : le résultat est opaque aussi.
 *
 * Les couleurs sont lues dans les jetons (`lib/jetons-figure.ts`) ; la taille du texte peint
 * suit le réglage du lecteur A−/A/A+ (`tailleTexte`, convention du 2026-09-27) — à A, elle vaut
 * exactement 12 px et rien ne bouge, ce qui est ce que les portes de pixels mesurent.
 */
import { AXE, type Bain, type Sens } from "./quotient-modele";
import { lireJetons, melange, type RGB } from "../jetons-figure";
import { tailleTexte } from "./texte";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface EtatRenduQuotient {
  bain: Bain;
  /** log10(K) du bain courant — le pivot est toujours affiché, à toutes les étapes */
  logK: number;
  /** log10(Q_r,i) — null : aucune marque, aucune étiquette, aucun chevron (S4 avant le pari) */
  logQ: number | null;
  /** la bande de travail est-elle au DOM (à partir de S3, §5.5 B) */
  bande: boolean;
  /** le verdict de l'état affiché — sert à la flèche et aux rôles du bécher ; ignoré si `accent` est faux */
  verdict: Sens | null;
  /** la flèche du verdict et les rôles/flèches du bécher sont-ils la RÉPONSE ? faux avant chaque pari */
  accent: boolean;
  /** deux solides dans le bécher (lame + dépôt) : seul le bain B en a besoin (§5.5 C) */
  deuxSolides: boolean;
  /**
   * « oxydé » / « réduit » sont des chaînes GATÉES par `formule-graduee` (§7.6 C : autorisées à
   * partir de S3 seulement, dans la même rangée que « étain », « 2,5 », « se retourne »). La
   * flèche du verdict, sur l'axe, ne porte AUCUN mot — elle reste due dès S1 ; les deux flèches
   * d'électrons ET les deux étiquettes de rôle du bécher, elles, attendent ce signal, jamais
   * `accent` seul (sans quoi le bain A, toujours direct, les afficherait dès S1 — une fuite).
   */
  rolesAutorises: boolean;
}

export interface RenduQuotient {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
  mettreAJour(e: EtatRenduQuotient): void;
  /** les repères, en pixels CSS du canvas — la porte les lit ; les étiquettes du panneau s'y posent */
  reperes(): Record<string, Projection>;
  cadre(): { largeur: number; hauteur: number };
  segments(): [Projection, Projection][];
  /** les zones déjà occupées par du texte peint (chiffres de décade) : les étiquettes les évitent */
  zones(): { x0: number; y0: number; x1: number; y1: number }[];
}

/** la demi-largeur de la bande : elle couvre [logK − DEMI ; logK + DEMI] (§5.5 B) */
const DEMI_BANDE = 4;
/** la hauteur réservée à la légende du plateau (une pastille opaque, en haut à gauche) */
const RESERVE_LEGENDE = 30;

/**
 * k = -4 → "m4" (une clé d'objet ne porte pas de signe moins redoublé). NON exportée : ce module
 * n'est chargé qu'au clic (`useSceneRendu`), donc le panneau — qui en a besoin bien avant, pour
 * lister à l'avance les noms de repères de l'axe — porte sa PROPRE copie, avec ce commentaire
 * comme fil : les deux doivent rester EXACTEMENT la même formule.
 */
const cleDecade = (k: number) => (k < 0 ? `m${-k}` : String(k));

export function creerRenduQuotient(canvas: HTMLCanvasElement, hote: HTMLElement): RenduQuotient {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  let jetons = lireJetons(hote);
  let police = "system-ui, sans-serif";
  const lirePolice = () => {
    police = getComputedStyle(hote).fontFamily || police;
  };
  lirePolice();
  let largeur = 480, hauteur = 480, dpr = 1;
  let etat: EtatRenduQuotient | null = null;
  let rep: Record<string, Projection> = {};
  let segs: [Projection, Projection][] = [];
  let zonesTexte: { x0: number; y0: number; x1: number; y1: number }[] = [];

  const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  /** une teinte OPAQUE, mélangée au fond (jamais un rgba nu) */
  const voile = (c: RGB, a: number) => css(melange(jetons.surface, c, a));
  const P = (x: number, y: number, visible = true): Projection => ({ x, y, visible });
  /** un trait de 1 px posé au milieu d'un pixel : net, comme les autres rendus plans */
  const net = (v: number) => Math.round(v - 0.5) + 0.5;
  const seg = (x0: number, y0: number, x1: number, y1: number) => segs.push([P(x0, y0), P(x1, y1)]);

  const texte = (t: string, x: number, y: number, aligne: CanvasTextAlign, base: CanvasTextBaseline, couleur?: string) => {
    const c = ctx!;
    c.font = `${tailleTexte(12)}px ${police}`;
    c.textAlign = aligne;
    c.textBaseline = base;
    c.fillStyle = couleur ?? css(jetons.encre);
    c.fillText(t, x, y);
  };

  /** 10^k, en exposant unicode : ce sont des PUISSANCES DE DIX peintes, pas des formules (§5.5 A) */
  const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  const decade = (k: number) => `10${[...String(k)].map((c) => SUP[c] ?? c).join("")}`;

  /** une flèche simple, pointe pleine — la flèche du verdict, les flèches d'électrons du bécher */
  function fleche(x0: number, y0: number, x1: number, y1: number, couleur: string, epaisseur: number, pointe = 6) {
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
    c.lineTo(x1 - ux * p - uy * p * 0.5, y1 - uy * p + ux * p * 0.5);
    c.lineTo(x1 - ux * p + uy * p * 0.5, y1 - uy * p - ux * p * 0.5);
    c.closePath();
    c.fill();
    seg(x0, y0, x1, y1);
  }

  /** le pivot K : une tige et un disque évidé — jamais la même forme que la pastille de Q_{r,i} */
  function pivot(x: number, yBase: number, encre: string, surface: string) {
    const c = ctx!;
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(x, yBase);
    c.lineTo(x, yBase - 13);
    c.stroke();
    c.fillStyle = surface;
    c.beginPath();
    c.arc(x, yBase - 13, 4.5, 0, 2 * Math.PI);
    c.fill();
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    c.stroke();
    seg(x, yBase, x, yBase - 13);
  }

  // ── L'AXE D'ENSEMBLE (A) et, à partir de S3, la BANDE DE TRAVAIL (B) ──
  function rendreAxes(e: EtatRenduQuotient, x0: number, y0: number, x1: number, y1: number) {
    const c = ctx!;
    const encre = css(jetons.encre), accent = css(jetons.accent), surface = css(jetons.surface);
    const h = tailleTexte(12);
    const mG = Math.round(2.4 * h), mD = 10;
    const xA0 = x0 + mG, xA1 = x1 - mD;
    const pxDec = (xA1 - xA0) / (AXE.max - AXE.min);
    const Xo = (v: number) => xA0 + (v - AXE.min) * pxDec;
    const yAxe = Math.round(y0 + 0.26 * (y1 - y0)) + 0.5;

    // les graduations de décade — OPAQUES ; une sur cinq étiquetée (une sur dix à largeur réduite, §5.5 A)
    const pas = largeur < 540 ? 10 : 5;
    for (let k = AXE.min; k <= AXE.max; k++) {
      const x = net(Xo(k));
      const marque = (k - AXE.min) % pas === 0;
      const long = marque ? 7 : 3.5;
      c.strokeStyle = encre;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x, yAxe - long);
      c.lineTo(x, yAxe + long);
      c.stroke();
      if (marque) {
        texte(decade(k), x, yAxe - long - 3, "center", "bottom");
        zonesTexte.push({ x0: x - 16, y0: yAxe - long - 3 - h, x1: x + 16, y1: yAxe - long });
      }
      rep[`axe-decade-${cleDecade(k)}`] = P(x, yAxe);
    }
    c.strokeStyle = encre;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(net(xA0), yAxe);
    c.lineTo(net(xA1), yAxe);
    c.stroke();
    seg(xA0, yAxe, xA1, yAxe);
    rep["axe-debut"] = P(xA0, yAxe);
    rep["axe-fin"] = P(xA1, yAxe);

    // le pivot K, sur l'axe d'ensemble — toujours, c'est l'énoncé
    const xK = Xo(e.logK);
    pivot(xK, yAxe, encre, surface);
    rep["k-marque"] = P(xK, yAxe - 17.5);

    // le repère Q_{r,i} : une pastille SUR l'axe — absente si `logQ` est null (S4 avant le pari)
    if (e.logQ !== null) {
      const xQ = Xo(e.logQ);
      c.fillStyle = encre;
      c.beginPath();
      c.arc(xQ, yAxe, 4, 0, 2 * Math.PI);
      c.fill();
      rep["qri-marque"] = P(xQ, yAxe + 9);
      zonesTexte.push({ x0: xQ - 6, y0: yAxe - 6, x1: xQ + 6, y1: yAxe + 6 });

      // la flèche du verdict : ACCENT, seulement révélée, jamais à l'équilibre (§5.5 A)
      if (e.accent && e.verdict && e.verdict !== "equilibre") fleche(xQ, yAxe + 17, xK, yAxe + 17, accent, 2);
    } else {
      rep["qri-marque"] = P(0, 0, false);
    }

    if (!e.bande) return;

    // ── la bande de travail : un encart de 8 décades autour de K, sa PROPRE échelle ──
    const bMin = e.logK - DEMI_BANDE, bMax = e.logK + DEMI_BANDE;
    const yBande = Math.round(y0 + 0.7 * (y1 - y0)) + 0.5;
    const xB0 = x0 + mG, xB1 = x1 - mD;
    const pxDecB = (xB1 - xB0) / (2 * DEMI_BANDE);
    const Xb = (v: number) => xB0 + (v - bMin) * pxDecB;

    // le crochet, posé SUR l'axe d'ensemble : la portion qu'agrandit la bande (§10.5)
    const xc0 = Xo(bMin), xc1 = Xo(bMax), yCr = yAxe + 24;
    c.strokeStyle = encre;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(xc0, yCr - 4);
    c.lineTo(xc0, yCr);
    c.lineTo(xc1, yCr);
    c.lineTo(xc1, yCr - 4);
    c.stroke();
    seg(xc0, yCr - 4, xc0, yCr);
    seg(xc0, yCr, xc1, yCr);
    seg(xc1, yCr, xc1, yCr - 4);
    rep["bande-crochet"] = P((xc0 + xc1) / 2, yCr + 4);

    // les décades de la bande sont nommées par leur RANG relatif (0…7), pas par leur valeur
    // absolue : `logK` n'est pas entier, donc la valeur qui tombe sur chaque trait change avec
    // le bain — un nom absolu (« bande-decade-34 ») ne serait pas le même repère d'un bain à
    // l'autre. Le rang, lui, est stable : la bande fait toujours huit décades exactement.
    const debutBande = Math.ceil(bMin);
    for (let k = debutBande; k <= Math.floor(bMax); k++) {
      const x = net(Xb(k));
      c.strokeStyle = encre;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x, yBande - 7);
      c.lineTo(x, yBande + 7);
      c.stroke();
      texte(decade(k), x, yBande - 10, "center", "bottom");
      zonesTexte.push({ x0: x - 16, y0: yBande - 10 - h, x1: x + 16, y1: yBande - 7 });
      rep[`bande-decade-${k - debutBande}`] = P(x, yBande);
    }
    c.strokeStyle = encre;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(net(xB0), yBande);
    c.lineTo(net(xB1), yBande);
    c.stroke();
    seg(xB0, yBande, xB1, yBande);
    rep["bande-debut"] = P(xB0, yBande);
    rep["bande-fin"] = P(xB1, yBande);

    // le pivot K, dans la bande — toujours au centre, par construction
    const xKb = Xb(e.logK);
    pivot(xKb, yBande, encre, surface);
    rep["bande-k-marque"] = P(xKb, yBande - 17.5);

    if (e.logQ === null) {
      rep["bande-qri-marque"] = P(0, 0, false);
      rep["bande-chevron"] = P(0, 0, false);
      return; // S4 avant le pari : ni pastille ni chevron dans la bande non plus (F4)
    }

    if (e.logQ >= bMin && e.logQ <= bMax) {
      const xQb = Xb(e.logQ);
      c.fillStyle = encre;
      c.beginPath();
      c.arc(xQb, yBande, 4, 0, 2 * Math.PI);
      c.fill();
      rep["bande-qri-marque"] = P(xQb, yBande + 9);
      rep["bande-chevron"] = P(0, 0, false);
      zonesTexte.push({ x0: xQb - 6, y0: yBande - 6, x1: xQb + 6, y1: yBande + 6 });
      if (e.accent && e.verdict && e.verdict !== "equilibre") fleche(xQb, yBande + 17, xKb, yBande + 17, accent, 2);
    } else {
      // hors bande : un CHEVRON — un triangle plein, jamais une pastille plafonnée (§5.5 B, sabotage 29)
      rep["bande-qri-marque"] = P(0, 0, false);
      const gauche = e.logQ < bMin;
      const xCh = gauche ? xB0 : xB1;
      const dir = gauche ? -1 : 1;
      c.fillStyle = encre;
      c.beginPath();
      c.moveTo(xCh + dir * 9, yBande);
      c.lineTo(xCh, yBande - 6);
      c.lineTo(xCh, yBande + 6);
      c.closePath();
      c.fill();
      rep["bande-chevron"] = P(xCh + dir * 13, yBande - 16);
      zonesTexte.push({ x0: Math.min(xCh, xCh + dir * 9) - 2, y0: yBande - 8, x1: Math.max(xCh, xCh + dir * 9) + 2, y1: yBande + 8 });
    }
  }

  // ── LE BÉCHER (C) ──
  function rendreBecher(e: EtatRenduQuotient, x0: number, y0: number, x1: number, y1: number) {
    const c = ctx!;
    const encre = css(jetons.encre), accent = css(jetons.accent);
    const cx = Math.round((x0 + x1) / 2);
    const bw = Math.max(64, Math.min(0.68 * (x1 - x0), 0.72 * (y1 - y0)));
    const yB0 = Math.round(y0 + 0.16 * (y1 - y0)), yB1 = Math.round(y1 - 0.12 * (y1 - y0));
    const yLiq = Math.round(yB0 + 0.13 * (yB1 - yB0));

    // le bécher, en encre : deux parois et le fond (ouvert en haut)
    c.strokeStyle = encre;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(cx - bw / 2, yB0);
    c.lineTo(cx - bw / 2, yB1);
    c.lineTo(cx + bw / 2, yB1);
    c.lineTo(cx + bw / 2, yB0);
    c.stroke();
    seg(cx - bw / 2, yB0, cx - bw / 2, yB1);
    seg(cx - bw / 2, yB1, cx + bw / 2, yB1);
    seg(cx + bw / 2, yB1, cx + bw / 2, yB0);

    // la solution
    c.fillStyle = voile(jetons.encreDouce, 0.12);
    c.fillRect(cx - bw / 2 + 1, yLiq, bw - 2, yB1 - yLiq - 1);
    c.strokeStyle = voile(jetons.encreDouce, 0.55);
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx - bw / 2 + 1, yLiq);
    c.lineTo(cx + bw / 2 - 1, yLiq);
    c.stroke();

    // la lame : TOUJOURS présente — le métal du sens direct (§5.5 C)
    const lw = Math.max(11, 0.1 * bw), xLame = cx - bw * 0.2;
    const yLameHaut = yB0 + 0.06 * (yB1 - yB0), yLameBas = yLiq + 0.68 * (yB1 - yLiq);
    c.fillStyle = voile(jetons.encreDouce, 0.3);
    c.strokeStyle = encre;
    c.lineWidth = 1.5;
    c.beginPath();
    c.rect(xLame - lw / 2, yLameHaut, lw, yLameBas - yLameHaut);
    c.fill();
    c.stroke();
    seg(xLame - lw / 2 - 4, yLameHaut, xLame - lw / 2 - 4, yLameBas);
    seg(xLame + lw / 2 + 4, yLameHaut, xLame + lw / 2 + 4, yLameBas);
    rep["lame-tete"] = P(xLame, yLameHaut);
    rep["lame"] = P(xLame, (yLiq + yLameBas) / 2);
    zonesTexte.push({ x0: xLame - lw / 2 - 2, y0: yLameHaut - 2, x1: xLame + lw / 2 + 2, y1: yLameBas + 2 });

    // le dépôt : SEULEMENT si le bain le demande (§5.5 C, becher-et-roles a) — des grains, au fond
    const xDepot = cx + bw * 0.24, yDepot = yB1 - Math.max(8, 0.1 * (yB1 - yLiq));
    if (e.deuxSolides) {
      c.fillStyle = voile(jetons.encreDouce, 0.55);
      const grains: readonly (readonly [number, number])[] = [[-7, -3], [0, -6], [7, -3], [-4, 2], [4, 3], [-9, 4], [9, 2], [0, 5]];
      for (const [dx, dy] of grains) {
        c.beginPath();
        c.arc(xDepot + dx, yDepot + dy, 2.3, 0, 2 * Math.PI);
        c.fill();
      }
      rep["depot"] = P(xDepot, yDepot - 9);
      zonesTexte.push({ x0: xDepot - 12, y0: yDepot - 12, x1: xDepot + 12, y1: yDepot + 8 });
    } else {
      rep["depot"] = P(0, 0, false);
    }

    // les deux noms d'espèce (les ions en solution) — toujours, c'est l'énoncé
    rep["espece-produit"] = P(cx - bw * 0.32, yLiq + 12);
    rep["espece-oxydant"] = P(cx + bw * 0.32, yLiq + 12);

    // les rôles — SEULEMENT révélés, JAMAIS à l'équilibre (§5.5 C, §9)
    const visible = e.accent && e.rolesAutorises && !!e.verdict && e.verdict !== "equilibre";
    if (visible) {
      const direct = e.verdict === "direct";
      // oxydé : la lame en sens direct, le dépôt en sens inverse (seul le bain B atteint l'inverse)
      const posOxyde = direct ? { x: xLame, y: yLameHaut } : { x: xDepot, y: yDepot };
      // réduit : le dépôt quand il existe (l'ion qui s'y dépose), sinon l'espèce ionique voisine
      const posReduit = direct ? (e.deuxSolides ? { x: xDepot, y: yDepot } : { x: rep["espece-oxydant"].x, y: rep["espece-oxydant"].y }) : { x: xLame, y: yLameHaut };
      fleche(posOxyde.x, posOxyde.y - 13, posOxyde.x, posOxyde.y - 25, accent, 2, 5);
      fleche(posReduit.x, posReduit.y - 25, posReduit.x, posReduit.y - 13, accent, 2, 5);
      rep["role-oxyde"] = P(posOxyde.x, posOxyde.y - 29);
      rep["role-reduit"] = P(posReduit.x, posReduit.y - 29);
    } else {
      rep["role-oxyde"] = P(0, 0, false);
      rep["role-reduit"] = P(0, 0, false);
    }
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
    const top = RESERVE_LEGENDE;
    if (largeur >= 560) {
      const coupe = Math.round(largeur * 0.64);
      rendreAxes(etat, 0, top, coupe, hauteur);
      rendreBecher(etat, coupe, top, largeur, hauteur);
    } else {
      const coupe = Math.round(top + (hauteur - top) * (etat.bande ? 0.6 : 0.46));
      rendreAxes(etat, 0, top, largeur, coupe);
      rendreBecher(etat, 0, coupe, largeur, hauteur);
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
    zones: () => zonesTexte,
  };
}
