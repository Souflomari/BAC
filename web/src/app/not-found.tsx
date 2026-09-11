/**
 * 404 Not Found page.
 *
 * Calm, minimal — consistent with the product feel.
 * Never a crash, never a jarring error screen.
 */

import type { Metadata } from "next";
import { Link } from "@/components/ui/Lien";
import { PageShell } from "@/components/ui/PageShell";
import { listNotions } from "@/lib/content";
import { cn } from "@/lib/utils";
import { manifesteEpreuves } from "@/lib/palette-epreuves";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  // Page SERVEUR : elle peut charger le manifeste — le panneau Notions et
  // la palette ⌘K marchent donc ICI aussi, là où un élève perdu en a le
  // plus besoin (R6 ; le contraire du cul-de-sac).
  const notions = listNotions().map((n) => ({
    subject: n.subject,
    slug: n.slug,
    title: n.title,
    readingMinutes: n.readingMinutes,
  }));
  return (
    <PageShell epreuves={manifesteEpreuves()} width="reading" notions={notions}>
      {/* La carte standard (audit R6, P1-11) : STUDIO-SPEC §6.3 — mêmes
          cartes que le reste du site, pas du texte nu flottant sur le fond. */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-subtle bg-surface-raised px-8 py-20 text-center shadow-elevation-1">
        <span
          className={cn(
            "font-display text-display font-bold",
            "text-border-soft",
            "select-none"
          )}
          aria-hidden="true"
        >
          404
        </span>
        <h1
          className={cn(
            "mt-4 font-display text-h2 font-bold text-primary"
          )}
        >
          Page introuvable
        </h1>
        <p className="mt-3 text-body text-secondary max-w-[40ch]">
          Cette page n’existe pas ou a été déplacée.
        </p>
        <Link href="/" className={cn("mt-8", "btn-primary")}>
          Retour à l’accueil
        </Link>
      </div>
    </PageShell>
  );
}
