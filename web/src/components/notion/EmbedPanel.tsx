/**
 * EmbedPanel
 *
 * Renders an interactive embed (GeoGebra, Desmos, PhET, Falstad, etc.) from
 * the embed.json descriptor, or a graceful placeholder if the descriptor is
 * absent or the URL is not present.
 *
 * ADR-0017 taxonomy: "Manipulable" visuals are embeds — don't rebuild.
 * DESIGN-BIBLE §7: the interactive is in the learning core — calm, no
 * engagement theater.
 *
 * This is a client component because the iframe load state is tracked
 * to show a loading indicator without a content layout shift.
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
      <div className={cn("my-10", className)}>
        <EmbedPlaceholder />
      </div>
    );
  }

  // Default 16:9 aspect ratio; overridden by embed.aspectRatio
  const aspectPercent = embed.aspectRatio
    ? `${(embed.aspectRatio * 100).toFixed(2)}%`
    : "56.25%";

  return (
    <div className={cn("my-10", className)}>
      {/* Section label */}
      <p
        className="mb-3 text-caption font-medium text-[var(--color-text-tertiary)] uppercase tracking-widest"
        aria-hidden="true"
      >
        {embed.type ?? "Interactif"}
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
        {/* Loading shimmer — shown until iframe fires onLoad */}
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
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-soft)] animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        <iframe
          src={embed.url}
          title={embed.title ?? "Interactif"}
          allow="fullscreen"
          className={cn(
            "absolute inset-0 w-full h-full border-0",
            // Fade in once loaded — DESIGN-BIBLE §5: motion serves comprehension
            "transition-opacity duration-[250ms] ease-out",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          // Touch targets for in-iframe interaction are the embed's own concern.
          // We ensure the iframe itself is keyboard-reachable.
          tabIndex={0}
        />
      </div>
    </div>
  );
}
