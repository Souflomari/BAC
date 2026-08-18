/**
 * 404 Not Found page.
 *
 * Calm, minimal — consistent with the product feel.
 * Never a crash, never a jarring error screen.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <PageShell width="reading">
      <div className="flex flex-col items-center justify-center py-24 text-center">
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
          Retour aux notions
        </Link>
      </div>
    </PageShell>
  );
}
