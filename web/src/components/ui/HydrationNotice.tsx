"use client";

import { useHydrated } from "@/lib/useHydrated";

/**
 * « La page se prépare… » — une ligne discrète en bas de l'écran tant que
 * React n'a pas pris la main (HANDOFF §11.28). Rendue par le serveur, donc
 * présente AVANT tout JavaScript ; retirée au premier rendu après
 * l'hydratation. Invisible pendant 1,5 s (CSS, `globals.css`) : sur un
 * réseau normal l'hydratation arrive avant et l'élève ne la voit jamais.
 * `aria-hidden` : les commandes portent déjà `aria-busy` pour les lecteurs
 * d'écran ; une région live annoncée à CHAQUE chargement serait du bruit.
 * `<noscript>` la masque pour qui n'a pas de JavaScript du tout — sinon elle
 * dirait « se prépare » pour toujours.
 */
export function HydrationNotice() {
  const hydrated = useHydrated();
  if (hydrated) return null;
  return (
    <>
      <noscript>
        <style>{`[data-hydration-notice]{display:none}`}</style>
      </noscript>
      <p
        data-hydration-notice
        aria-hidden="true"
        className="pointer-events-none fixed bottom-3 left-1/2 z-40 -translate-x-1/2 rounded-md border border-subtle bg-surface-raised px-3 py-1.5 text-caption text-secondary shadow-elevation-1"
      >
        La page se prépare…
      </p>
    </>
  );
}
