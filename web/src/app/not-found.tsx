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
            "text-display font-semibold",
            "text-[var(--color-border-soft)]",
            "select-none"
          )}
          aria-hidden="true"
        >
          404
        </span>
        <h1
          className={cn(
            "mt-4 text-h2 font-semibold text-[var(--color-text-primary)]"
          )}
        >
          Page introuvable
        </h1>
        <p className="mt-3 text-body text-[var(--color-text-secondary)] max-w-[40ch]">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className={cn(
            "mt-8 inline-flex items-center gap-2",
            "px-5 py-3 rounded-lg",
            "bg-accent text-white",
            "text-body-sm font-medium",
            "hover:bg-[#344d73]",
            "transition-colors duration-[150ms] ease-out",
            "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2"
          )}
        >
          Retour aux notions
        </Link>
      </div>
    </PageShell>
  );
}
