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
 * Ce qui NE suit PAS, écrit à côté : les glyphes composés d'un tracé (la lettre d'un vecteur et
 * sa flèche, le « X » du multiplieur), dont les décalages sont réglés au pixel pour une taille.
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
