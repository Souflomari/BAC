/**
 * EmbedPanel
 *
 * Renders an interactive embed (GeoGebra, Desmos, PhET, Falstad, etc.) from
 * a normalized EmbedDescriptor, or a graceful placeholder if the descriptor is
 * absent or the URL is not present.
 *
 * ADR-0017 taxonomy: "Manipulable" visuals are embeds — don't rebuild.
 * DESIGN-BIBLE §7: the interactive is in the learning core — calm, no
 * engagement theater.
 *
 * This is a client component because the iframe load state is tracked
 * to show a loading indicator without a content layout shift.
 *
 * Security: third-party iframe is sandboxed (allow-scripts allow-same-origin
 * allow-popups). No browser storage (no localStorage/sessionStorage/cookies)
 * anywhere in this component.
 *
 * Accessibility: caption text below the iframe; external fallback link always
 * present so the embed is usable even if the iframe is blocked. Fade/shimmer
 * respects prefers-reduced-motion.
 */

"use client";

import { useState } from "react";
import type { EmbedDescriptor } from "@/lib/content";
import { cn } from "@/lib/utils";

interface EmbedPanelProps {
  embed: EmbedDescriptor | null;
  className?: string;
}

/** Graceful placeholder when no embed is configured. */
function EmbedPlaceholder() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        "w-full rounded-xl",
        "bg-[var(--color-surface-raised)]",
        "border border-dashed border-[var(--color-border-soft)]",
        "px-8 py-12",
        "text-center"
      )}
      role="img"
      aria-label="Interactif non disponible pour cette notion"
    >
      {/* Visual placeholder — simple, calm, never flashy */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="text-[var(--color-border-soft)]"
      >
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
        <line
          x1="20"
          y1="14"
          x2="20"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="28"
          x2="20"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="20"
          x2="12"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="20"
          x2="26"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-body-sm text-[var(--color-text-tertiary)] font-medium">
        Interactif à venir
      </p>
      <p className="text-caption text-[var(--color-text-tertiary)] max-w-[36ch]">
        Un outil interactif sera disponible ici pour explorer ce concept en
        manipulation directe.
      </p>
    </div>
  );
}

export function EmbedPanel({ embed, className }: EmbedPanelProps) {
  const [loaded, setLoaded] = useState(false);

  if (!embed || !embed.url) {
    return (
      <div className={cn("my-10 notion-wide-band", className)}>
        <EmbedPlaceholder />
      </div>
    );
  }

  // Default 16:9 aspect ratio; overridden by embed.aspectRatio
  const aspectPercent = embed.aspectRatio
    ? `${(embed.aspectRatio * 100).toFixed(2)}%`
    : "56.25%";

  // Tool label for the section heading: normalize to display-friendly form
  const toolLabel =
    embed.type === "falstad"
      ? "Falstad CircuitJS"
      : embed.type
        ? embed.type.charAt(0).toUpperCase() + embed.type.slice(1)
        : "Interactif";

  return (
    <div className={cn("my-10 notion-wide-band", className)}>
      {/* Section label — muted, never flashy */}
      <p
        className="mb-3 text-caption font-medium text-[var(--color-text-tertiary)] uppercase tracking-widest"
        aria-hidden="true"
      >
        {toolLabel}
      </p>

      {/* Aspect-ratio container — avoids layout shift as iframe loads */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          "rounded-xl",
          "border border-[var(--color-border-subtle)]",
          "bg-[var(--color-surface-raised)]",
          // Subtle shadow for elevation (DESIGN-BIBLE §2: layered luminance)
          "shadow-soft"
        )}
        style={{ paddingBottom: aspectPercent }}
      >
        {/* Loading shimmer — shown until iframe fires onLoad.
            motion: animate-pulse is suppressed by prefers-reduced-motion via
            Tailwind's motion-safe: variant (falls back to static opacity). */}
        {!loaded && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "bg-[var(--color-surface-raised)]"
            )}
            aria-hidden="true"
          >
            <div className="flex gap-1.5" aria-label="Chargement…">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full bg-[var(--color-border-soft)]",
                    "motion-safe:animate-pulse"
                  )}
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        <iframe
          src={embed.url}
          title={embed.title ?? toolLabel}
          // Third-party iframe sandbox: allow scripts (embed logic), same-origin
          // (Falstad self-references), popups (share/help links).
          // allow-forms is intentionally omitted — not needed and reduces surface.
          sandbox="allow-scripts allow-same-origin allow-popups"
          loading="lazy"
          className={cn(
            "absolute inset-0 w-full h-full border-0",
            // Fade in once loaded — respects prefers-reduced-motion
            "motion-safe:transition-opacity motion-safe:duration-[250ms] motion-safe:ease-out",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          // The iframe itself must be keyboard-reachable
          tabIndex={0}
        />
      </div>

      {/* Caption and external fallback — always rendered below the iframe */}
      <div className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
        {embed.caption && (
          <p
            className={cn(
              "text-caption text-[var(--color-text-tertiary)]",
              "max-w-[56ch] leading-relaxed"
            )}
          >
            {embed.caption}
          </p>
        )}
        {/* Graceful external fallback — always visible, not just on iframe failure */}
        <a
          href={embed.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "shrink-0 text-caption font-medium",
            "text-[#3E5C86] hover:text-[#7E9CC8]",
            "transition-colors duration-[150ms]",
            "rounded focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2",
            // Push to right when caption is also present
            embed.caption ? "sm:ml-4" : ""
          )}
        >
          Ouvrir dans un nouvel onglet ↗
        </a>
      </div>

      {/*
       * CC-BY attribution — MUST render visibly when present (ADR 0021 §4).
       * PhET requires this; verbatim string from the embed descriptor.
       */}
      {embed.attribution && (
        <p
          className={cn(
            "mt-3 pt-3",
            "border-t border-[var(--color-border-subtle)]",
            "text-caption text-[var(--color-text-tertiary)]",
            "leading-relaxed"
          )}
        >
          {embed.attribution}
        </p>
      )}
    </div>
  );
}
