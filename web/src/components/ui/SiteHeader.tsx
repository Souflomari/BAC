"use client";

/**
 * SiteHeader
 *
 * The top navigation bar. Minimal — DESIGN-BIBLE §0: the learning core is
 * sacred, the periphery is where chrome lives. The header is periphery:
 * a wordmark, the font-size stepper (§9 a11y floor), and the nav link.
 *
 * Craft additions (Phase 4):
 * - Geometric glyph mark before "BAC" wordmark — a calm oscillation arc
 *   in accent color, reads as a considered brand mark.
 * - Elevation-on-scroll: flat (elevation-0 + hairline) at top; gains
 *   shadow-elevation-3 + slightly more opaque bg after >8px scroll.
 *   Transitions with ease-between over 200ms; reduced-motion: no transition,
 *   just the end-state class applied immediately.
 * - Focus rings migrated to .focus-ring utility.
 *
 * No browser storage — scrolled state is ephemeral in-memory React state.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FontSizeStepper } from "./FontSizeStepper";

interface SiteHeaderProps {
  className?: string;
}

/**
 * GlyphMark — a restrained geometric brand mark.
 *
 * An oscillation arc: two arcs suggest a damped wave / circuit oscillation,
 * which is both on-theme (RLC circuit, bac physique) and reads as an abstract
 * monogram at small sizes. 22×22px, currentColor so it inherits the accent.
 * aria-hidden — it is purely decorative, the "BAC" wordmark carries the label.
 */
function GlyphMark({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/*
        Two arcs forming a calm oscillation shape.
        Top arc: rises from left baseline, peaks, returns to midline.
        Bottom arc: continues below midline, rises back — a single damped beat.
        The two arcs share a clean midpoint at x=11, creating bilateral symmetry
        and making it read as a quiet monogram at 22px.
      */}
      <path
        d="M3 11 C3 4.5, 8 4.5, 11 11 C14 17.5, 19 17.5, 19 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SiteHeader({ className }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Passive scroll listener — check >8px threshold
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    // Check on mount in case page is already scrolled (e.g. browser back)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        // Transition between scroll states: 200ms ease-between.
        // The motion-reduce media query in globals.css collapses all transitions
        // to 0.01ms, so the end-state is applied instantly for reduced-motion
        // users without any special branching here.
        "transition-[box-shadow,background-color,border-color] duration-200 ease-between",
        scrolled
          ? [
              // Floating state: more opaque surface-raised, elevation-3, no hairline
              "bg-[var(--color-surface-raised)]/95",
              "supports-[backdrop-filter]:backdrop-blur-md",
              "shadow-elevation-3",
              "border-b border-transparent",
            ]
          : [
              // At-top state: flat, hairline only
              "bg-[var(--color-surface-base)]",
              "supports-[backdrop-filter]:backdrop-blur-sm",
              "shadow-elevation-0",
              "border-b border-[var(--color-border-subtle)]",
            ],
        className
      )}
    >
      <div className="mx-auto max-w-page flex h-14 items-center justify-between px-6 md:px-8">
        {/* Wordmark — glyph mark + "BAC" */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2",
            "text-[var(--color-text-primary)] no-underline",
            "rounded focus-ring"
          )}
          aria-label="Retour à l'accueil"
        >
          {/* Geometric glyph — oscillation arc in accent color */}
          <GlyphMark className="text-accent flex-shrink-0" />

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

        {/* Right-side: font stepper + nav */}
        <div className="flex items-center gap-4">
          {/* A−/A/A+ text size control — §9 floor item */}
          <FontSizeStepper />

          <nav aria-label="Navigation principale">
            <Link
              href="/"
              className={cn(
                "text-body-sm font-medium",
                "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                "transition-colors duration-[150ms] ease-enter",
                "rounded px-2 py-1",
                "focus-ring"
              )}
            >
              Notions
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
