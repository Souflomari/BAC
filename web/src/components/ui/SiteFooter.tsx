/**
 * SiteFooter — the page end (audit U5: a page must end, not stop).
 *
 * MINIMAL STRUCTURE ONLY (Day-3 mechanical batch): hairline, wordmark echo,
 * one nav link, a purpose line, the year. The FINAL contents are owner
 * decision — option set C (`/options/end/c1|c2`, ledger in
 * docs/audits/fable-day3-ledger.md). This component is structured so the
 * chosen variant swaps in cheaply: everything renders inside one <footer>
 * whose inner container carries the SAME spine class as header + main
 * (alignment by construction).
 *
 * Periphery, not core (DESIGN-BIBLE §0): quiet, no engagement mechanics.
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteFooter({ container }: { container: string }) {
  return (
    <footer
      className={cn(
        "mt-24 border-t border-subtle",
        "bg-surface-base"
      )}
    >
      <div className={cn(container, "py-10")}>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          {/* Wordmark echo — quiet, no glyph (the header carries the mark) */}
          <p className="text-body-sm text-secondary">
            <span className="font-semibold text-primary">BAC</span>
            <span aria-hidden="true"> · </span>sciences — préparer le bac marocain,
            calmement.
          </p>

          <nav aria-label="Pied de page">
            <Link
              href="/"
              className={cn(
                "text-body-sm font-medium",
                "state-layer text-secondary hover:text-primary",
                "transition-colors duration-micro ease-enter",
                "rounded px-2 py-1",
                "focus-ring [--focus-radius:8px]"
              )}
            >
              Notions
            </Link>
          </nav>
        </div>

        <p className="mt-4 text-caption text-secondary">
          © {new Date().getFullYear()} — contenu aligné sur le cadre de référence
          national.
          {/* Build stamp (Day-8.5 deployment truth): commit + build date,
              injected at build time (next.config.mjs). Answers "which
              version am I looking at?" — the question behind two incidents.
              dom-truth asserts presence + SHA match.

              INVISIBLE POUR L'ÉLÈVE depuis l'audit Fable §3.1. Le tampon
              reste, parce que la vérité de déploiement a coûté deux
              incidents à établir et qu'on ne la retire pas ; mais un hash de
              commit affiché sous le pied de page d'un site destiné à des
              lycéens dit « ceci est un chantier », pas « ceci est un
              produit ». Il passe donc en attributs de données : toujours lu
              par les portes et par quiconque ouvre l'inspecteur, jamais
              rendu à l'écran. `hidden` le retire aussi de l'arbre
              d'accessibilité — ce n'est pas une information pour l'élève. */}
          <span
            hidden
            data-build-stamp
            data-build-sha={process.env.NEXT_PUBLIC_BUILD_SHA}
            data-build-date={process.env.NEXT_PUBLIC_BUILD_DATE}
          />
        </p>
      </div>
    </footer>
  );
}
