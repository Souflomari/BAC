"use client";

/**
 * global-error.tsx — le dernier filet (§11.148).
 *
 * `error.tsx` vit DANS la mise en page ; si c'est la mise en page elle-même
 * qui tombe, il ne s'affiche pas. Celui-ci remplace le document entier, donc
 * il doit rendre `<html>` et `<body>` lui-même.
 *
 * IL N'UTILISE AUCUNE CLASSE DU PRODUIT, et c'est délibéré : quand la racine
 * tombe, on ne peut pas SUPPOSER que la feuille de style du design system est
 * là. Tout est en styles en ligne, avec les deux teintes du produit écrites à
 * la main et un `prefers-color-scheme` pour le mode sombre — un filet qui
 * dépend de ce qu'il rattrape n'est pas un filet.
 */

const FOND_CLAIR = "#f7f7f4";
const FOND_SOMBRE = "#11100f";
const ENCRE_CLAIRE = "#1d1a14";
const ENCRE_SOMBRE = "#f2f0ea";

export default function ErreurGlobale({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: FOND_CLAIR, color: ENCRE_CLAIRE }}>
        <style>{`
          @media (prefers-color-scheme: dark) {
            body { background: ${FOND_SOMBRE} !important; color: ${ENCRE_SOMBRE} !important; }
            a, button { color: ${ENCRE_SOMBRE} !important; border-color: ${ENCRE_SOMBRE} !important; }
          }
        `}</style>
        <main
          style={{
            maxWidth: "38rem",
            margin: "0 auto",
            padding: "4rem 1.25rem",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
            lineHeight: 1.6,
          }}
        >
          <h1 style={{ fontSize: "1.6rem", fontWeight: 600, margin: 0 }}>
            L’application s’est interrompue
          </h1>
          <p style={{ marginTop: "1rem" }}>
            Quelque chose s’est arrêté avant même que la page puisse s’afficher.
            Ce n’est pas ta faute, et rien de ce que tu as déjà fait n’est perdu.
            C’est presque toujours une connexion qui a lâché au mauvais moment.
          </p>
          <p style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                font: "inherit", padding: "0.6rem 1rem", borderRadius: "0.5rem",
                border: "1px solid currentColor", background: "transparent", cursor: "pointer",
              }}
            >
              Réessayer
            </button>
            <a
              href=""
              style={{
                font: "inherit", padding: "0.6rem 1rem", borderRadius: "0.5rem",
                border: "1px solid currentColor", textDecoration: "none", color: "inherit",
              }}
            >
              Recharger la page
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
