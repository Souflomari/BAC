/**
 * KatexSpan — le composant `span` que react-markdown appelle pour la sortie
 * de `rehypeKatexHtml` (voir `src/lib/rehypeKatexHtml.ts` pour la mesure qui
 * a motivé tout ceci : 43 000 nœuds React par leçon, 6,5 s d'attente avant
 * qu'un téléphone milieu de gamme réponde à un appui).
 *
 * Quand le nœud porte `data-katex-html`, on pose la chaîne rendue par KaTeX
 * telle quelle et l'attribut disparaît : le DOM produit est identique au
 * caractère près à celui de `rehype-katex`. Sinon, un `<span>` ordinaire —
 * un `span` de prose ne doit rien perdre au passage.
 *
 * KaTeX est INERTE : pas d'état, pas d'écouteur, pas d'interactivité. C'est
 * la raison pour laquelle React n'a pas besoin de posséder ses nœuds, et
 * c'est la seule raison. Si un jour une formule devait devenir cliquable,
 * ce fichier serait le premier à réexaminer.
 */
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"span"> & {
  node?: unknown;
  children?: ReactNode;
};

export function KatexSpan({ node, children, ...props }: Props) {
  void node; // react-markdown passe le nœud hast ; il ne va pas dans le DOM
  const html = (props as Record<string, unknown>)["data-katex-html"];
  if (typeof html !== "string") {
    return <span {...props}>{children}</span>;
  }
  const reste = { ...(props as Record<string, unknown>) };
  delete reste["data-katex-html"];
  return (
    <span
      {...(reste as ComponentPropsWithoutRef<"span">)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
