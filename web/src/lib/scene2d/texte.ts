/**
 * La taille du texte PEINT sur un canvas de scène suit le réglage du lecteur (A− / A / A+).
 *
 * Les étiquettes HTML des scènes (KaTeX) sont en rem : elles grandissent avec `--font-scale`,
 * posé en style en ligne sur <html> (`FontSizeStepper`). Les NOMBRES peints sur le canvas —
 * graduations, légendes d'axe — étaient écrits à 12 px en dur : à A+, les étiquettes passaient à
 * 18 px de base et les nombres de l'axe restaient à 12, deux échelles de texte dans une même
 * figure. La taille de base de la racine (16 px × `--font-scale`) donne le facteur ; à A il vaut
 * exactement 1, et rien ne bouge d'un pixel — les portes de pixels mesurent à A.
 *
 * Ce qui NE suit PAS, écrit à côté : le « X » du multiplieur (modulation), un symbole dans une
 * boîte de taille fixe — le glyphe grandirait hors de sa boîte. La lettre d'un vecteur et sa
 * flèche (`plan-repere.ts`) suivent, décalages compris, dans la proportion tailleTexte(13) / 13.
 * Le redessin au changement de réglage est déjà câblé (`useSceneRendu`, MutationObserver sur
 * l'attribut `style` de <html>).
 */
export function tailleTexte(px: number): number {
  if (typeof document === "undefined") return px;
  const racine = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const f = Number.isFinite(racine) && racine > 0 ? racine / 16 : 1;
  // au demi-pixel : une taille de police fractionnaire quelconque brouille l'anticrénelage
  return Math.round(px * f * 2) / 2;
}
