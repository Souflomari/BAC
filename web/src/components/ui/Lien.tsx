"use client";

/**
 * Lien — le <Link> de la maison (R4, continuité entre routes) et, depuis le
 * 2026-09-05, le seul endroit où se décide le PRÉCHARGEMENT.
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
 *
 * ── LE PRÉCHARGEMENT : À L'INTENTION, PAS AU CHAMP DE VISION ──
 *
 * `next/link` précharge par défaut TOUT lien qui entre dans le champ de
 * vision. Mesuré le 2026-09-05 (`scripts/donnees-sweep.mjs`) sur l'accueil,
 * écran de téléphone, cache vide : 525 ko pour voir la page, puis **6,5 Mo**
 * tirés tout seuls en faisant défiler — 91 % du transfert, pour 62 leçons
 * dont l'élève en ouvrira une. Ces octets n'apparaissent dans aucun LCP,
 * dans aucun temps de blocage : ils sont invisibles au chronomètre, et
 * facturés par l'opérateur. L'élève visé achète des recharges de données.
 *
 * D'où la politique, en un seul endroit parce que TOUT le produit passe par
 * ce composant :
 *
 *   • champ de vision → NON (`prefetch={false}` par défaut) ;
 *   • intention → OUI : survol, focus clavier, et `touchstart` (le doigt
 *     posé, ~100 ms avant le clic). Ce sont exactement les octets que le
 *     clic allait demander — ils ne coûtent rien de plus, ils arrivent plus
 *     tôt ;
 *   • économiseur de données (`Save-Data`, `saveData` de l'API Network
 *     Information) ou lien mesuré 2G → AUCUN préchargement spéculatif.
 *     L'élève a demandé qu'on dépense moins ; le survol reste une
 *     spéculation, le clic non ;
 *   • `prefetch` reste une PROP : un appelant qui sait que son lien sera
 *     suivi (la carte « reprendre » du tableau de bord) écrit
 *     `prefetch` et retrouve le comportement d'avant.
 *
 * Un href n'est préchargé qu'une fois par chargement de page (`deja`), sinon
 * chaque passage de souris repayerait la même charge.
 */

import NextLink from "next/link";
import { forwardRef, useCallback } from "react";
import { useRouter } from "next/navigation";
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

/** Les href déjà préchargés dans cette page — un survol ne repaie pas. */
const deja = new Set<string>();

/**
 * L'élève a-t-il demandé qu'on dépense moins ? `saveData` est l'API Network
 * Information (Chrome/Android, l'écrasante majorité du parc visé) ; absente
 * ailleurs, on ne suppose rien et on précharge à l'intention.
 */
function economiseurActif(): boolean {
  const c = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!c) return false;
  if (c.saveData) return true;
  return c.effectiveType === "slow-2g" || c.effectiveType === "2g";
}

export const Link = forwardRef<HTMLAnchorElement, LienProps>(function Lien(
  {
    onClick,
    onPointerEnter,
    onFocus,
    onTouchStart,
    href,
    as,
    replace,
    scroll,
    prefetch,
    ...reste
  },
  ref
) {
  const router = useTransitionRouter();
  const routeur = useRouter();

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

  /** Le préchargement à l'intention — survol, focus, doigt posé. */
  const precharger = useCallback(() => {
    if (prefetch === false) return;
    const destination = as ?? href;
    if (typeof destination !== "string") return;
    if (!destination.startsWith("/") || destination.startsWith("//")) return;
    if (deja.has(destination)) return;
    if (economiseurActif()) return;
    deja.add(destination);
    try {
      routeur.prefetch(destination);
    } catch {
      /* un routeur indisponible ne doit jamais casser un survol */
    }
  }, [prefetch, href, as, routeur]);

  return (
    <NextLink
      ref={ref}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      // Le champ de vision ne précharge plus : c'est l'intention qui décide.
      // Un appelant peut redemander l'ancien comportement avec `prefetch`.
      prefetch={prefetch ?? false}
      onClick={auClic}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        precharger();
      }}
      onFocus={(e) => {
        onFocus?.(e);
        precharger();
      }}
      onTouchStart={(e) => {
        onTouchStart?.(e);
        precharger();
      }}
      {...reste}
    />
  );
});
