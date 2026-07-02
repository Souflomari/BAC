/**
 * OPTION SET C — page end / footer, variant C1: "QUIET COLOPHON".
 *
 * Philosophy: a lesson ends like a book chapter — a hairline, one line of
 * identity, one nav link, the cadre note. Nothing asks for attention; the
 * footer exists so the page ENDS (audit U5) and nothing more. This is the
 * shipped minimal structure, presented as a deliberate candidate.
 *
 * TEMPORARY option route, deleted after the owner's Set-C pick.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Option — fin de page C1",
  robots: { index: false, follow: false },
};

const CONTAINER = "w-full mx-auto px-4 bp-medium:px-6 bp-expanded:px-8 max-w-content";

export default function EndC1() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-base)]">
      <SiteHeader container={CONTAINER} />

      <main className={cn(CONTAINER, "flex-1 py-12 md:py-16")}>
        {/* End-of-lesson context so the transition prose → end is judged */}
        <div className="prose-lesson">
          <h2>Fermeture de l’arc</h2>
          <p>
            Tu sais maintenant répondre aux deux questions posées au début :
            l’énergie <strong>traverse</strong> entre condensateur et bobine, et
            c’est <strong>R</strong> qui, cycle après cycle, la dissipe. Rien ne
            s’est perdu — tout s’explique.
          </p>
          <p>
            La prochaine fois : on retrouve ces mêmes oscillations… en mécanique.
          </p>
        </div>
      </main>

      {/* ── C1: the quiet colophon ── */}
      <footer className="mt-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-base)]">
        <div className={cn(CONTAINER, "py-10")}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              <span className="font-semibold text-[var(--color-text-primary)]">BAC</span>
              <span aria-hidden="true"> · </span>sciences — préparer le bac
              marocain, calmement.
            </p>
            <nav aria-label="Pied de page">
              <Link
                href="/"
                className={cn(
                  "text-body-sm font-medium",
                  "state-layer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                  "transition-colors duration-micro ease-enter",
                  "rounded px-2 py-1 focus-ring [--focus-radius:8px]"
                )}
              >
                Notions
              </Link>
            </nav>
          </div>
          <p className="mt-4 text-caption text-[var(--color-text-secondary)]">
            © 2026 — contenu aligné sur le cadre de référence national.
          </p>
        </div>
      </footer>
    </div>
  );
}
