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

/** Le curseur neutre : l'accent est réservé à l'action et à l'objet étudié (§2). */
export const CURSEUR = "w-full accent-figure-ink-soft";

/**
 * Un contrôle qui reçoit le focus (Tab) ou vers lequel on défile ne doit
 * JAMAIS se ranger sous la scène collante (WCAG 2.2 — 2.4.11). Au téléphone la
 * scène fait 3/4 de la largeur, sous le header de 56 px ; sur grand écran elle
 * est à côté, seul le header compte.
 */
export const MARGE_FOCUS = [
  "[&_button]:scroll-mt-[calc(3.5rem+75vw+1rem)] [&_input]:scroll-mt-[calc(3.5rem+75vw+1rem)]",
  "bp-expanded:[&_button]:scroll-mt-24 bp-expanded:[&_input]:scroll-mt-24",
].join(" ");

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
