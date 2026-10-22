/**
 * rehypeDirectionRtl — un bloc majoritairement ARABE est rendu de droite à
 * gauche, et le dit.
 *
 * POURQUOI (constaté le 2026-09-04 en inspectant le rendu de
 * `philo/analyse-de-texte`) : l'épreuve de philosophie du bac marocain est
 * EN ARABE. Cette leçon de méthode cite donc le libellé officiel
 * (« حلّل (ي) النص و ناقشه (يه) ») et deux textes sources entiers — Épicure,
 * Bakounine — dans leur version arabe, à côté de la traduction française.
 *
 * Tous étaient rendus dans des blocs `dir=ltr`. L'algorithme bidi d'Unicode
 * pose correctement chaque LIGNE de droite à gauche — on croit donc que
 * c'est bon — mais la DIRECTION DU BLOC reste latine, et trois choses
 * clochent :
 *
 *   · la dernière ligne, courte, va se coller à GAUCHE au lieu de la droite ;
 *   · un signe de ponctuation terminal (« . » « ، ») prend la direction du
 *     bloc et se retrouve du mauvais côté de la phrase ;
 *   · sans `lang`, un lecteur d'écran lit l'arabe avec une voix française,
 *     et le navigateur choisit sa fonte de repli au hasard.
 *
 * LA RÈGLE, VOLONTAIREMENT PLUS STRICTE QUE `dir="auto"`. `dir="auto"`
 * décide sur le PREMIER caractère fort ; une ligne comme
 * « تحليل النص الفلسفي — Philosophie · 2ème Bac » basculerait donc en RTL
 * alors qu'elle est majoritairement française. On compte : le bloc passe en
 * `dir="rtl" lang="ar"` seulement si les lettres arabes sont PLUS
 * NOMBREUSES que les lettres latines. Une phrase française qui cite un
 * terme arabe entre parenthèses — le cas le plus fréquent de cette leçon —
 * ne bouge pas d'un pixel, et c'est voulu : elle est française.
 *
 * On ne touche pas au CONTENU. Le markdown reste ce qu'un auteur écrit ;
 * c'est le rendu qui sait lire ce qu'il rend.
 */
import type { Root, Element, RootContent } from "hast";

/** Blocs susceptibles de porter un paragraphe entier dans une langue. */
const BLOCS = new Set([
  "p", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6",
  "td", "th", "dd", "dt", "figcaption",
]);

// Arabe + supplément + formes de présentation. Hébreu inclus : la règle est
// « écriture de droite à gauche », pas « arabe » — même si le corpus n'a
// aujourd'hui que de l'arabe.
const RTL = /[֐-׿؀-ۿ܀-ݏݐ-ݿࢠ-ࣿיִ-﷿ﹰ-﻿]/g;
const LATIN = /[A-Za-zÀ-ɏ]/g;

function texteDe(n: RootContent | Root): string {
  if (n.type === "text") return n.value;
  if ("children" in n && Array.isArray(n.children)) {
    return (n.children as RootContent[]).map(texteDe).join("");
  }
  return "";
}

export default function rehypeDirectionRtl() {
  return function (tree: Root): undefined {
    marcher(tree);

    function marcher(noeud: Root | Element): void {
      for (const e of (noeud.children as RootContent[]) ?? []) {
        if (e.type !== "element") continue;
        if (BLOCS.has(e.tagName)) {
          const t = texteDe(e);
          const rtl = (t.match(RTL) || []).length;
          if (rtl > 0 && rtl > (t.match(LATIN) || []).length) {
            e.properties = { ...(e.properties ?? {}), dir: "rtl", lang: "ar" };
          }
        }
        marcher(e);
      }
    }
  };
}
