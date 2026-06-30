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
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/*
        #10 fix: A deliberate single-stroke oscillation mark.

        The previous 22×22 viewBox placed the path along the vertical center,
        making it read as a stray underline — too close in weight to the
        hairline dividers in the header.

        Fix: constrain the viewBox to 20×16, aligning the wave to the
        cap-height of the "BAC" text (roughly 12-14px). Stroke weight raised
        to 2px so it reads as intentional at 20px render size. The waveform
        is a single clean S-curve — one damped half-beat — which is on-theme
        (RLC oscillation, Maroc bac physique) and reads as an abstract mark.
        Not animated, currentColor, aria-hidden.
      */}
      <path
        d="M1 8 C1 2, 6 2, 10 8 C14 14, 19 14, 19 8"
        stroke="currentColor"
        strokeWidth="2"
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
        "transition-[box-shadow,background-color,border-color] duration-standard ease-between",
        scrolled
          ? [
              // Floating state: frosted glass (ADR 0023 polish). .header-glass is
              // translucent + blur where backdrop-filter is supported (reads as
              // "glass lifted"), with an opaque fallback so there is never legible
              // bleed-through. elevation-3 carries the float.
              "header-glass",
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
            // Neutral state-layer wash on the rounded hit-area so chrome shares
            // the content hover language (ADR 0024). -mx/-px pad the overlay out
            // around the wordmark; focus stays the ring+halo.
            "rounded state-layer -mx-2 px-2 py-1",
            "focus-ring"
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
          {/* #1: decorative but visible at 14px — promoted to secondary for contrast */}
          <span
            className="hidden sm:inline text-body-sm text-[var(--color-text-secondary)] font-medium"
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
                // Neutral state-layer wash leads; the text-color shift stays as
                // a secondary cue (ADR 0024). Both share the calm micro timing.
                "state-layer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                "transition-colors duration-micro ease-enter",
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
