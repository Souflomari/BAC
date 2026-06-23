"use client";

/**
 * SiteHeader
 *
 * The top navigation bar. Minimal — DESIGN-BIBLE §0: the learning core is
 * sacred, the periphery is where chrome lives. The header is periphery:
 * a wordmark and the single navigation affordance.
 *
 * No streaks, no XP, no notification bells here. Just orientation.
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  className?: string;
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "border-b border-[var(--color-border-subtle)]",
        "bg-[var(--color-surface-base)]",
        // Subtle backdrop blur for depth without heavy shadow.
        // Use explicit rgba since CSS variable opacity modifier isn't available.
        "supports-[backdrop-filter]:backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto max-w-page flex h-14 items-center justify-between px-6 md:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2",
            "text-[var(--color-text-primary)] no-underline",
            "rounded focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2"
          )}
          aria-label="Retour à l'accueil"
        >
          <span
            className="text-h4 font-semibold tracking-tight"
            style={{ letterSpacing: "-0.015em" }}
          >
            BAC
          </span>
          <span
            className="hidden sm:inline text-body-sm text-[var(--color-text-tertiary)] font-medium"
            aria-hidden="true"
          >
            · sciences
          </span>
        </Link>

        {/* Right-side nav — kept intentionally minimal */}
        <nav aria-label="Navigation principale">
          <Link
            href="/"
            className={cn(
              "text-body-sm font-medium",
              "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
              "transition-colors duration-[150ms] ease-out",
              "rounded px-2 py-1",
              "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2"
            )}
          >
            Notions
          </Link>
        </nav>
      </div>
    </header>
  );
}
