/**
 * Ce que toutes les scènes manipulables partagent (ADR 0041).
 *
 * Une scène = un panneau propre à son sujet (ses contrôles, ses lectures, son
 * encadré de conditions) + ces pièces communes : l'ouverture au clic, le
 * cycle de vie du rendu, le PARI de chaque étape, les vues, le transport. La
 * règle de conception : tout ce qui touche au calme, à l'honnêteté ou à
 * l'accessibilité vit ICI, une fois — une deuxième scène n'a pas à le
 * réapprendre.
 */

export type EtatPanneau = "ferme" | "chargement" | "prete" | "sans-webgl" | "erreur";

/**
 * Le curseur neutre : l'accent est réservé à l'action et à l'objet étudié (§2).
 * `.curseur` (globals.css) : boîte de 48 px, piste de 6, poignée de 24 — le
 * natif mesurait 16 px et sa poignée 14, sur le contrôle que l'élève tient
 * pendant quatre étapes sur cinq (revue ergonomie, 2026-09-24).
 */
export const CURSEUR = "curseur curseur-neutre";

/**
 * Une ligne de bouton radio : la cible fait déjà 48 px de haut et toute la
 * largeur, mais sur grand écran elle se lisait comme du texte inerte — ni
 * curseur de pointage, ni voile au survol, les seules commandes du panneau hors
 * du vocabulaire de survol du produit (revue ergonomie, 2026-09-24).
 */
export const LIGNE_RADIO = "ligne-radio state-layer flex min-h-touch cursor-pointer items-center gap-2 rounded-md px-2 text-body-sm text-primary";
// « ligne-radio » (globals.css) : au clavier, c'est la LIGNE qui porte l'anneau
// et le halo du focus, pas le rond natif de 13 px (vague 2 de la corde : la
// ligne s'allumait sous la souris et restait presque muette sous le clavier).

/**
 * Un contrôle qui reçoit le focus (Tab) ou vers lequel on défile ne doit
 * JAMAIS se ranger sous la scène collante (WCAG 2.2 — 2.4.11). Au téléphone la
 * scène fait 3/4 de la largeur, sous le header de 56 px ; sur grand écran elle
 * est à côté, seul le header compte.
 */
export const MARGE_FOCUS = [
  "[&_:is(button,input,summary,a)]:scroll-mt-[calc(3.5rem+75vw+1rem)]",
  "bp-expanded:[&_:is(button,input,summary,a)]:scroll-mt-24",
].join(" ");
// (Le `<summary>` d'un encadré est focalisable : il n'était pas dans la liste,
// et Tab le rangeait sous le header — vague 2 de la corde.)

/**
 * La mise en page d'un panneau : la scène, puis la colonne des réglages — une
 * grille, sur deux colonnes à partir de `bp-expanded`. Une seule définition
 * pour les huit panneaux, et un attribut (`data-scene-grille`) par lequel les
 * portes la reconnaissent, au lieu de la classe `.grid`.
 *
 * La vague 2 de la corde affirmait la scène collante INERTE au téléphone (un
 * élément de grille ne voyagerait que dans sa case). Rejoué avant de corriger :
 * FAUX — la grille remontée 120 px au-dessus de l'écran, la scène reste à
 * 56 px, sous le header, pour la cuve, la corde et le manège. La correction
 * écrite d'avance (une colonne flex) a été retirée : on ne répare pas un défaut
 * qu'on n'a pas vu. La porte ergonomie, elle, fait maintenant CE test.
 */
export const GRILLE_SCENE = "grid gap-5 bp-expanded:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)] bp-expanded:items-start";

export interface Vue {
  azimut: number;
  elevation: number;
  libelle: string;
}

/** Le contrat minimal d'un module de rendu (three.js), chargé au clic. */
export interface RenduScene {
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  detruire(): void;
}

export type FabriqueRendu<R extends RenduScene> = (canvas: HTMLCanvasElement, hote: HTMLElement) => R;
