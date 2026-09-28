/**
 * rehypeKatexHtml — KaTeX rendu en UNE chaîne, pas en 40 nœuds React.
 *
 * POURQUOI CE FICHIER EXISTE (mesure du 2026-09-04, `scripts/poids-sweep.mjs`
 * et la sonde d'hydratation) :
 *
 *   Une leçon dense porte ~1 000 formules. `rehype-katex` produit, pour
 *   chacune, un arbre hast d'une quarantaine de nœuds (MathML + HTML
 *   visuel). React devait donc posséder **43 000 nœuds** sur
 *   `reactions-acido-basiques` — dont 92 % de KaTeX et 98 % dans des
 *   chapitres MASQUÉS. Conséquences mesurées :
 *
 *     · le document faisait 412 ko gzip, dont **271 ko de charge RSC** — la
 *       même arborescence re-sérialisée en JSON dans des <script> ;
 *     · sur un téléphone à processeur bridé ×4 (un milieu de gamme de
 *       2020), la page **ne répondait plus pendant 6,5 s** ; ×6, jusqu'à
 *       12,4 s. Elle était PEINTE en 0,5 s — donc l'élève voyait sa leçon,
 *       appuyait sur la flèche de chapitre, et rien ne se passait.
 *
 *   Ce défaut est invisible sur une machine de développement (1,2 s au
 *   même endroit) : c'est exactement la classe de défaut que seul un
 *   bridage révèle, comme le CLS ne se voyait qu'en réseau bridé.
 *
 * CE QUE FAIT CE GREFFON. Il remplace `rehype-katex`. Pour chaque formule,
 * il appelle KaTeX lui-même et garde la CHAÎNE HTML rendue, qu'il pose
 * telle quelle sur l'élément racine de KaTeX (`span.katex` ou
 * `span.katex-display`) via `dangerouslySetInnerHTML` côté composant.
 *
 * LE DOM RENDU EST IDENTIQUE — au caractère près. C'est la propriété qui
 * rend ce changement sûr : KaTeX est INERTE (aucun état, aucun écouteur,
 * aucune interactivité), donc React n'a aucune raison de posséder ses
 * nœuds. Ce qui change, c'est ce que React et le protocole RSC ont à
 * PORTER : une chaîne au lieu d'un arbre.
 *
 * COMMENT C'EST VÉRIFIÉ. `scripts/katex-identite.mjs` re-rend chaque page
 * du corpus et compare le HTML de la prose octet par octet avec la version
 * d'avant. Une différence, même d'un espace, fait échouer.
 *
 * L'HYPOTHÈSE DE FORME, ÉCRITE ICI PARCE QU'ELLE EST LOAD-BEARING :
 * `katex.renderToString` rend toujours `<span class="…">…</span>` — un seul
 * élément racine. Le découpage est fait par expression régulière ancrée aux
 * deux bouts ; si elle ne mord pas, on retombe sur le span d'erreur de
 * `rehype-katex`, jamais sur un rendu silencieusement différent.
 */
import katex from "katex";
import type { Root, Element, ElementContent, RootContent } from "hast";

/** Options passées à KaTeX (mêmes valeurs que l'appel `rehype-katex` d'avant). */
export interface OptionsKatexHtml {
  strict?: boolean | string;
  trust?: boolean;
  errorColor?: string;
}

/** Texte brut d'un sous-arbre hast — équivalent de `hast-util-to-text`
 *  en mode `pre` pour le cas qui nous occupe (la formule est un nœud texte
 *  unique produit par `remark-math`, mais on concatène par prudence). */
function texteDe(noeud: RootContent | Root): string {
  if (noeud.type === "text") return noeud.value;
  if ("children" in noeud && Array.isArray(noeud.children)) {
    return noeud.children.map((e) => texteDe(e as RootContent)).join("");
  }
  return "";
}

function classes(el: Element): string[] {
  const c = el.properties?.className;
  return Array.isArray(c) ? (c as string[]) : [];
}

/** `<span …attributs…>…</span>` → attributs + intérieur. Ancrée aux deux
 *  bouts : pas de correspondance partielle possible.
 *
 *  L'élément racine n'a PAS toujours le seul attribut `class` : quand une
 *  formule est malformée, KaTeX rend lui-même
 *  `<span class="katex-error" title="ParseError: …" style="color:#cc0000">`.
 *  Une première version n'acceptait que `class`, et transformait donc ces
 *  formules-là en span d'erreur maison — sans le `title` qui porte le
 *  message. Trois leçons du corpus en contiennent ; c'est la comparaison de
 *  DOM qui l'a attrapé, pas la relecture. */
const FORME = /^<span\s+([^>]*)>([\s\S]*)<\/span>$/;

const ENTITES = { "&quot;": '"', "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#x27;": "'", "&#39;": "'" };
const decoder = (v: string): string =>
  v.replace(/&(?:quot|amp|lt|gt|#x27|#39);/g, (e) => ENTITES[e as keyof typeof ENTITES] ?? e);

/** Attributs de la balise ouvrante, DANS L'ORDRE où KaTeX les écrit — React
 *  sérialise les props dans l'ordre d'insertion, et on tient à l'identité
 *  octet par octet. */
function attributs(source: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const m of source.matchAll(/([a-zA-Z][a-zA-Z0-9-]*)="([^"]*)"/g)) {
    const valeur = decoder(m[2]);
    if (m[1] === "class") out.className = valeur.split(/\s+/).filter(Boolean);
    else out[m[1]] = valeur;
  }
  return out;
}

/**
 * React sérialise `style` depuis un objet et n'écrit PAS de point-virgule
 * final ; KaTeX en écrit un. Les deux CSS sont identiques, mais l'octet
 * diffère — et on tient à l'identité octet par octet du DOM, parce que
 * c'est elle qui rend ce remplacement vérifiable (et qui laisse valides
 * toutes les captures d'écran de référence déjà prises). L'expression est
 * ancrée sur le guillemet fermant : elle ne peut pas mordre à l'intérieur
 * d'une valeur.
 */
const sansPointVirguleFinal = (html: string): string =>
  html.replace(/style="([^"]*);"/g, 'style="$1"');

function elementKatex(html: string, texSource: string, errorColor: string): ElementContent {
  const m = FORME.exec(html);
  if (!m) {
    // Forme inattendue : on ne devine pas. Même span d'erreur que
    // `rehype-katex` produit quand KaTeX échoue autrement qu'en ParseError.
    return {
      type: "element",
      tagName: "span",
      properties: { className: ["katex-error"], style: `color:${errorColor}` },
      children: [{ type: "text", value: texSource }],
    };
  }
  return {
    type: "element",
    tagName: "span",
    properties: { ...attributs(m[1]), dataKatexHtml: sansPointVirguleFinal(m[2]) },
    children: [],
  };
}

export default function rehypeKatexHtml(options: OptionsKatexHtml = {}) {
  const errorColor = options.errorColor ?? "#cc0000";

  function rendre(tex: string, display: boolean): ElementContent {
    let html: string;
    try {
      html = katex.renderToString(tex, {
        strict: (options.strict ?? false) as never,
        trust: options.trust ?? false,
        displayMode: display,
        throwOnError: false,
      });
    } catch {
      return {
        type: "element",
        tagName: "span",
        properties: { className: ["katex-error"], style: `color:${errorColor}` },
        children: [{ type: "text", value: tex }],
      };
    }
    return elementKatex(html, tex, errorColor);
  }

  return function (tree: Root): undefined {
    marcher(tree);

    function marcher(noeud: Root | Element): void {
      const enfants = noeud.children as RootContent[];
      for (let i = 0; i < enfants.length; i++) {
        const e = enfants[i];
        if (e.type !== "element") continue;

        // ```math  →  <pre><code class="language-math">…</code></pre>, en bloc.
        // (Aucune leçon du corpus ne s'en sert aujourd'hui ; la branche est
        // là pour garder la parité EXACTE avec `rehype-katex`, qu'on
        // remplace — pas pour ajouter une fonctionnalité.)
        if (e.tagName === "pre") {
          const code = e.children.find(
            (c): c is Element => c.type === "element" && c.tagName === "code",
          );
          if (code && classes(code).includes("language-math")) {
            enfants[i] = rendre(texteDe(e), true) as ElementContent;
            continue;
          }
        }

        const cl = classes(e);
        const bloc = cl.includes("math-display");
        if (bloc || cl.includes("math-inline") || cl.includes("language-math")) {
          enfants[i] = rendre(texteDe(e), bloc) as ElementContent;
          continue; // on ne redescend pas dans ce qu'on vient de poser
        }

        marcher(e);
      }
    }
  };
}
