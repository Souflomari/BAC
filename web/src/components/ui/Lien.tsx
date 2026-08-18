"use client";

/**
 * Lien — le <Link> de la maison (R4, continuité entre routes).
 *
 * Pourquoi pas le Link de next-view-transitions directement : son composant
 * n'expose PAS de forwardRef (v0.3.5 — `function Link(props)` nue). Or le
 * panneau Notions rend ses liens via Radix `asChild`, qui PASSE une ref à
 * son enfant — le roving focus et le typeahead du menu en dépendent. Sans
 * ref, la navigation clavier du panneau se dégrade en silence.
 *
 * Ce wrapper reproduit l'interception upstream à l'identique — clic modifié,
 * target ≠ _self, bouton non-gauche et defaultPrevented laissent le
 * navigateur faire — et la pose sur un next/link AVEC ref. Deux garde-fous
 * de plus qu'upstream : un href objet (UrlObject) retombe sur next/link au
 * lieu d'être sérialisé en « [object Object] », et le clic molette est testé
 * par `button` (l'API `which` est morte). Firefox, sans l'API View
 * Transitions : le test échoue, next/link navigue — bascule nette, comme
 * avant.
 */

import NextLink from "next/link";
import { forwardRef, useCallback } from "react";
import { useTransitionRouter } from "next-view-transitions";

type LienProps = React.ComponentProps<typeof NextLink>;

/** Le clic appartient-il au navigateur (nouvel onglet, téléchargement…) ? */
function clicNavigateur(e: React.MouseEvent<HTMLAnchorElement>): boolean {
  const cible = e.currentTarget.getAttribute("target");
  return (
    (cible !== null && cible !== "_self") ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    e.button !== 0
  );
}

export const Link = forwardRef<HTMLAnchorElement, LienProps>(function Lien(
  { onClick, href, as, replace, scroll, ...reste },
  ref
) {
  const router = useTransitionRouter();

  const auClic = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (!("startViewTransition" in document)) return;
      if (clicNavigateur(e)) return;
      const destination = as ?? href;
      if (typeof destination !== "string") return;
      e.preventDefault();
      const naviguer = replace ? router.replace : router.push;
      naviguer(destination, { scroll: scroll ?? true });
    },
    [onClick, href, as, replace, scroll, router]
  );

  return (
    <NextLink
      ref={ref}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      onClick={auClic}
      {...reste}
    />
  );
});
