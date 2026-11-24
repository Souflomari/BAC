/**
 * Le compte à rebours de l'examen national : une fonction pure, appelée par le
 * serveur (au build) et par le navigateur (au montage).
 *
 * HONNÊTETÉ : la date officielle de juin 2027 n'est pas publiée
 * (docs/refonte/01-programme-bac-maroc.md §8). La cible est une ESTIMATION,
 * le début de juin, et l'écran le dit.
 */
const CIBLE_ESTIMEE = Date.UTC(2027, 5, 1);
const SEMAINE = 7 * 24 * 3600 * 1000;

export function semainesRestantes(maintenant: number): number {
  return Math.max(0, Math.ceil((CIBLE_ESTIMEE - maintenant) / SEMAINE));
}
