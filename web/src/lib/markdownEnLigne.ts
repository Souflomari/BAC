/**
 * Neutralise les marqueurs de BLOC en tête de ligne, pour un rendu EN LIGNE.
 *
 * MESURÉ, PAS SUPPOSÉ (2026-09-21, §11.166). Passer le sur-titre de partie
 * dans le moteur markdown a fait apparaître **10 erreurs d'hydratation React
 * (#418) sur `pc/reactions-acido-basiques`** — zéro avant. La cause : le
 * corpus écrit `part: "1. Solution aqueuse d'acide propanoïque"`, et `1.` en
 * tête de ligne EST une liste ordonnée en CommonMark. Le moteur produisait un
 * `<ol>` à l'intérieur du `<p>` du libellé ; `<ol>` dans `<p>` est de l'HTML
 * invalide, le navigateur referme le `<p>` en analysant, et l'arbre client
 * cesse de ressembler à l'arbre servi.
 *
 * Rendre `ol`/`li` en fragments ne suffirait pas : l'analyseur a déjà mangé le
 * « 1. », et le libellé perdrait son numéro. On échappe donc le marqueur, ce
 * qui laisse le texte exactement tel qu'il est écrit.
 *
 * `1)` compte autant que `1.` — CommonMark accepte les deux.
 */
export function echappeBloc(s: string): string {
  return s
    .replace(/^([ \t]*)(\d{1,9})([.)])/gm, "$1$2\\$3")
    .replace(/^([ \t]*)([-*+>#])/gm, "$1\\$2");
}
