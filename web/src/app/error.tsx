"use client";

/**
 * error.tsx — ce que l'élève lit quand une page s'interrompt.
 *
 * POURQUOI (§11.148). `src/app/` portait `not-found.tsx` et RIEN d'autre :
 * aucune frontière d'erreur. Toute exception non rattrapée côté client
 * remplaçait donc la page par le repli intégré de Next —
 *
 *     « Application error: a client-side exception has occurred
 *       (see the browser console for more information). »
 *
 * — en ANGLAIS, sur un produit français destiné à des élèves marocains, et
 * en renvoyant à la console du navigateur, ce qui ne veut rien dire pour un
 * élève de terminale. Observé en vrai le 2026-09-20 pendant un balayage du
 * déployé : un morceau de JavaScript perdu, et c'est cette phrase qui prend
 * toute la page.
 *
 * LA VOIX est celle du bandeau d'hydratation (`VeilleHydratation.tsx`) :
 * calme, à la deuxième personne, elle dit ce qui se passe, ce qui n'est pas
 * perdu, et ce qu'on peut faire. Pas de « erreur technique », pas de code,
 * pas de console.
 *
 * DEUX GESTES, parce qu'ils ne coûtent pas la même chose : `reset()` retente
 * le rendu sans recharger (gratuit, et suffit quand l'erreur était
 * passagère), et le rechargement complet va rechercher les morceaux
 * manquants (le vrai remède quand c'en est un qui manque).
 */

import { useEffect } from "react";

export default function Erreur({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //  La console reste pour qui sait la lire ; l'élève, lui, lit la page.
    console.error("[bac] page interrompue", error);
  }, [error]);

  return (
    /* Les classes sont celles de `not-found.tsx`, à l'identique : même carte,
       même échelle typographique. J'avais d'abord écrit `text-title-lg`,
       `max-w-prose` et `btn-secondary` — trois noms qui n'existent nulle part
       dans ce design system. Une page d'erreur qui se rend sans style est une
       deuxième panne par-dessus la première. */
    <div className="mx-auto w-full max-w-content px-gutter py-16">
      <div className="flex flex-col items-center justify-center rounded-xl border border-subtle bg-surface-raised px-8 py-20 text-center shadow-elevation-1">
        <h1 className="font-display text-h2 font-bold text-primary">
          Cette page s’est interrompue
        </h1>
        <p className="mt-3 text-body text-secondary max-w-[46ch]">
          Quelque chose s’est arrêté pendant l’affichage. Ce n’est pas ta faute,
          et rien de ce que tu as déjà fait n’est perdu. C’est presque toujours
          une connexion qui a lâché au mauvais moment.
        </p>
        <button type="button" onClick={() => reset()} className="mt-8 btn-primary">
          Réessayer
        </button>
        <p className="mt-4 text-body-sm text-secondary">
          <a href="" className="underline">Recharger la page</a>
          {" · "}
          <a href="/" className="underline">Revenir à l’accueil</a>
        </p>
      </div>
    </div>
  );
}
