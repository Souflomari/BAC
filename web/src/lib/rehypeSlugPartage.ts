/**
 * rehypeSlugPartage — les ancres de titre restent uniques D'UN SEGMENT À
 * L'AUTRE.
 *
 * LE DÉFAUT (mesuré le 2026-09-05, consigné en juillet dans
 * LESSON-EXPERIENCE-SPEC §6 et jamais repris). Depuis la pagination par
 * chapitres, `LessonRenderer` est appelé une fois PAR SEGMENT de prose.
 * `rehype-slug` fait `slugs.reset()` à chaque passe : son compteur d'unicité
 * repart de zéro, et deux sections homonymes situées dans deux segments
 * différents reçoivent le MÊME id. Mesuré sur trois leçons : « L'erreur à
 * repérer » huit fois avec le même id dans `maths/suites-numeriques`, deux
 * paires dans `philo/la-verite`.
 *
 * POURQUOI C'EST VISIBLE PAR L'ÉLÈVE. Chaque titre porte une ancre « § »
 * (audit U5) qui permet de copier un lien profond vers la section. Avec des
 * ids dupliqués, sept des huit « L'erreur à repérer » renvoient à la
 * PREMIÈRE : l'élève copie un lien vers le passage qu'il lit et retombe
 * ailleurs. C'est aussi un document HTML invalide, donc un piège pour tout
 * `aria-labelledby` posé plus tard.
 *
 * LE REMÈDE. Le même que celui de `rehype-slug` — un `GithubSlugger` qui
 * suffixe `-1`, `-2`… — mais PARTAGÉ par tous les segments d'une même page au
 * lieu d'être remis à zéro. Les ids produits sont alors exactement ceux
 * qu'aurait donnés un rendu en une seule passe, ce qui préserve la promesse
 * du composant : la PREMIÈRE occurrence garde son id nu, donc les liens déjà
 * partagés continuent de fonctionner.
 *
 * Le slugger est créé par `NotionBody` à chaque rendu et passé aux segments,
 * jamais par un module partagé : un état de module survivrait d'une page à
 * l'autre sur le serveur et ferait dériver les ids d'une leçon selon ce qui a
 * été rendu avant elle.
 */

import GithubSlugger from "github-slugger";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
import type { Root } from "hast";

export { GithubSlugger };

/**
 * Le plugin rehype, lié au slugger que l'appelant lui donne.
 *
 * Rend un ATTACHEUR (`() => transform`), pas la transformation elle-même :
 * unified appelle un plugin sans argument pour obtenir sa transformation.
 * Lui passer directement la transformation la fait exécuter avec `tree`
 * indéfini — « Cannot use 'in' operator to search for 'children' in
 * undefined » au build. Payé une fois.
 */
export function rehypeSlugPartage(slugger: GithubSlugger) {
  return function attacheur() {
    return function (tree: Root) {
      visit(tree, "element", function (node) {
        if (headingRank(node) && !node.properties.id) {
          node.properties.id = slugger.slug(toString(node));
        }
      });
    };
  };
}
