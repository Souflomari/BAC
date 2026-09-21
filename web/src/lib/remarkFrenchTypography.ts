/**
 * remark (mdast) plugin: French-typography normalization for prose.
 *
 * Visits ONLY mdast `text` nodes and rewrites their `value` with
 * {@link frenchTypography}. Because remark-math and remark-gfm have already
 * parsed math and code into their own node types (`inlineMath`, `math`,
 * `inlineCode`, `code`) by the time a remark plugin runs, those nodes are
 * never `text` nodes and are therefore left completely untouched — we never
 * mangle apostrophes inside code or insert narrow spaces into LaTeX.
 *
 * ── LA COUTURE (2026-09-21, §11.164) ────────────────────────────────────
 * Un nœud de texte N'EST PAS une phrase. Le corpus écrit
 *
 *     Ta salive contient une molécule, l'**amylase salivaire**, qui découpe…
 *
 * et mdast en fait TROIS nœuds : le texte `…une molécule, l'`, un `strong`,
 * puis le texte `, qui découpe…`. L'apostrophe est le DERNIER caractère de
 * son nœud ; la lettre qui la suit vit dans le nœud d'à côté. La règle (a)
 * de `frenchTypography` exige une lettre APRÈS l'apostrophe *dans la même
 * chaîne* — elle ne peut structurellement pas voir celle-là, et l'élève lit
 * « l'amylase » en apostrophe droite au milieu d'une page qui, partout
 * ailleurs, en porte une courbe.
 *
 * Mesuré le 2026-09-21 sur le texte rendu, chapitres dépliés : **152
 * apostrophes droites visibles sur 50 pages**, dont 0 vues par la porte
 * `typo-francaise` — qui appliquait son motif nœud par nœud, exactement
 * comme le plugin, et répondait donc honnêtement à une question plus étroite
 * que son en-tête (ADR 0033). Les deux angles morts sont le MÊME : un motif
 * borné à une unité plus petite que celle où vit le défaut (ADR 0037, 2e
 * loi).
 *
 * La passe ci-dessous recolle donc les FRÈRES : pour chaque parent, elle
 * regarde chaque couple (enfant i, enfant i+1) et traite l'apostrophe posée
 * sur la couture. Elle ne franchit jamais un bloc — `visit` ne donne que des
 * frères, et deux paragraphes ne sont pas frères inline.
 *
 * Le voisin doit être de la PROSE. `inlineCode` et `inlineMath` sont
 * délibérément exclus : `l'` suivi de `$x$` n'est pas une élision française,
 * c'est une apostrophe devant du code ou du LaTeX, et la règle (a) la
 * laisse tranquille pour la même raison.
 *
 * Uses `unist-util-visit` (a transitive dependency already present via
 * react-markdown / the unified ecosystem — see package-lock). No new
 * dependency is added.
 */

import type { Root, Text } from "mdast";
import { visit } from "unist-util-visit";
import { frenchTypography, APOSTROPHE_TYPO } from "./frenchTypography";

/**
 * Les types de nœuds inline dont le texte rendu est de la PROSE française.
 *
 * Liste FERMÉE, et c'est voulu : tout ce qui n'y figure pas (`inlineCode`,
 * `inlineMath`, `image`, `break`, `html`, `footnoteReference`) ne fournit
 * pas de lettre au sens de la règle (a).
 */
const PROSE_INLINE = new Set([
  "text",
  "emphasis",
  "strong",
  "delete",
  "link",
  "linkReference",
]);

type Noeud = { type: string; value?: string; children?: Noeud[] };

/** Premier caractère de la prose que rend ce nœud, ou "" s'il n'en rend pas. */
function premierCar(n: Noeud | undefined): string {
  if (!n || !PROSE_INLINE.has(n.type)) return "";
  if (typeof n.value === "string") return n.value.charAt(0);
  for (const e of n.children ?? []) {
    const c = premierCar(e);
    if (c) return c;
  }
  return "";
}

/** Dernier caractère de la prose que rend ce nœud, ou "" s'il n'en rend pas. */
function dernierCar(n: Noeud | undefined): string {
  if (!n || !PROSE_INLINE.has(n.type)) return "";
  if (typeof n.value === "string") return n.value.charAt(n.value.length - 1);
  const k = n.children ?? [];
  for (let i = k.length - 1; i >= 0; i--) {
    const c = dernierCar(k[i]);
    if (c) return c;
  }
  return "";
}

const LETTRE = /\p{L}/u;
/** Une lettre puis une apostrophe droite, en FIN de nœud. */
const FIN_APOSTROPHE = /\p{L}'$/u;
/** Une apostrophe droite puis une lettre, en DÉBUT de nœud. */
const DEBUT_APOSTROPHE = /^'\p{L}/u;

/**
 * A remark transformer plugin. Returns the mutated tree's transformer.
 * Typed as a unified `Plugin<[], Root>`-compatible factory without importing
 * `unified` types directly (keeping the dep surface minimal): it is a
 * function returning a transformer over a `Root` tree.
 */
export default function remarkFrenchTypography(): (tree: Root) => void {
  return (tree: Root): void => {
    visit(tree, "text", (node: Text): void => {
      node.value = frenchTypography(node.value);
    });

    // La passe de couture. Elle tourne APRÈS la passe par nœud : celle-ci a
    // déjà traité tout ce qui tenait dans une seule chaîne, et ne laisse ici
    // que les apostrophes posées sur une frontière.
    visit(tree, (node: unknown): void => {
      const enfants = (node as Noeud).children;
      if (!Array.isArray(enfants)) return;
      for (let i = 0; i < enfants.length - 1; i++) {
        const gauche = enfants[i];
        const droite = enfants[i + 1];
        // « l'**amylase** » : l'apostrophe ferme le nœud de gauche.
        if (
          gauche.type === "text" &&
          typeof gauche.value === "string" &&
          FIN_APOSTROPHE.test(gauche.value) &&
          LETTRE.test(premierCar(droite))
        ) {
          gauche.value = gauche.value.slice(0, -1) + APOSTROPHE_TYPO;
        }
        // « **l**'amylase » : l'apostrophe ouvre le nœud de droite.
        if (
          droite.type === "text" &&
          typeof droite.value === "string" &&
          DEBUT_APOSTROPHE.test(droite.value) &&
          LETTRE.test(dernierCar(gauche))
        ) {
          droite.value = APOSTROPHE_TYPO + droite.value.slice(1);
        }
      }
    });
  };
}
