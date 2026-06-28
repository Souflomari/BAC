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
 * PhET opt-in (#8 fix):
 * The iframe is NOT auto-mounted. The component defaults to a quiet
 * "Ouvrir le bac à sable interactif" button. The student clicks to mount
 * the iframe on demand. This avoids a heavy third-party resource loading
 * eagerly into the calm reading core.
 *
 * DOM/tab order (#8 fix):
 * "Ouvrir dans un nouvel onglet ↗" link appears BEFORE the iframe in DOM
 * and tab order so keyboard users can access the external URL without
 * entering the iframe.
 *
 * Loading label (#8 fix):
 * A visible "Chargement de l'interactif…" text label accompanies the shimmer.
 *
 * Attribution (#8 fix):
 * CC-BY attribution is rendered whenever the iframe is shown (not just always).
 *
 * Security: third-party iframe is sandboxed (allow-scripts allow-same-origin
 * allow-popups). No browser storage (no localStorage/sessionStorage/cookies)
 * anywhere in this component.
 *
 * Accessibility: caption text below the iframe; external fallback link always
 * present so the embed is usable even if the iframe is blocked. Fade/shimmer
 * respects prefers-reduced-motion.
 *
 * This is a CLIENT component: iframe mount state is tracked in React state.
 * No browser storage — all state is ephemeral React state only.
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
        <line x1="20" y1="14" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="28" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
  // iframeMounted: only true after the student explicitly clicks to open
  const [iframeMounted, setIframeMounted] = useState(false);
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

  // Tool label for the section heading
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

      {!iframeMounted ? (
        /* ── Opt-in state: show quiet button to open the sandbox ── */
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4",
            "w-full rounded-xl",
            "bg-[var(--color-surface-raised)]",
            "border border-[var(--color-border-subtle)]",
            "px-8 py-14",
            "text-center"
          )}
        >
          {/* Icon — circuit/interactive hint */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
            className="text-[var(--color-border-soft)]"
          >
            <rect x="3" y="3" width="30" height="30" rx="6" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 8v3M18 25v3M8 18h3M25 18h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium text-[var(--color-text-secondary)]">
              Bac à sable interactif
            </p>
            {embed.caption && (
              <p className="text-caption text-[var(--color-text-tertiary)] max-w-[48ch] leading-relaxed">
                {embed.caption.slice(0, 120)}{embed.caption.length > 120 ? "…" : ""}
              </p>
            )}
          </div>

          {/* DOM order: external link BEFORE the mount button (tab order §9) */}
          <a
            href={embed.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-caption font-medium",
              "text-[#3E5C86] hover:text-[#7E9CC8]",
              "transition-colors duration-[150ms]",
              // Focus ring — migrated to .focus-ring utility
              "rounded focus-ring"
            )}
          >
            Ouvrir dans un nouvel onglet ↗
          </a>

          <button
            type="button"
            onClick={() => setIframeMounted(true)}
            className={cn(
              "inline-flex items-center gap-2",
              "px-5 py-2.5",
              "rounded-lg",
              "text-body-sm font-medium",
              "text-[var(--color-text-secondary)]",
              "border border-[var(--color-border-soft)]",
              "bg-[var(--color-surface-raised)]",
              "hover:text-[var(--color-text-primary)]",
              "hover:border-[#3E5C86]",
              "hover:bg-[var(--color-accent-subtle)]",
              "transition-colors duration-[150ms]",
              // Focus ring — migrated to .focus-ring utility
              "focus-ring",
              "min-h-[44px]" // touch target §9
            )}
          >
            {/* Play icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
            </svg>
            Ouvrir le bac à sable interactif
          </button>
        </div>
      ) : (
        /* ── Mounted state: iframe with loading shimmer ── */
        <>
          {/* External link in DOM BEFORE the iframe (tab order §9) */}
          <div className="mb-2 flex justify-end">
            <a
              href={embed.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-caption font-medium",
                "text-[#3E5C86] hover:text-[#7E9CC8]",
                "transition-colors duration-[150ms]",
                // Focus ring — migrated to .focus-ring utility
                "rounded focus-ring"
              )}
            >
              Ouvrir dans un nouvel onglet ↗
            </a>
          </div>

          {/* Aspect-ratio container — avoids layout shift */}
          <div
            className={cn(
              "relative w-full overflow-hidden",
              "rounded-xl",
              "border border-[var(--color-border-subtle)]",
              "bg-[var(--color-surface-raised)]",
              // elevation-2 — mounted iframe panel (raised interactive surface, per TOKENS.md §6.3)
              "shadow-elevation-2"
            )}
            style={{ paddingBottom: aspectPercent }}
          >
            {/* Loading shimmer — shown until iframe fires onLoad.
                Visible text label "Chargement de l'interactif…" satisfies §9. */}
            {!loaded && (
              <div
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center gap-3",
                  "bg-[var(--color-surface-raised)]"
                )}
              >
                {/* Visible loading label — not aria-hidden */}
                <p className="text-caption text-[var(--color-text-tertiary)]">
                  Chargement de l&apos;interactif…
                </p>
                <div className="flex gap-1.5" aria-hidden="true">
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
              sandbox="allow-scripts allow-same-origin allow-popups"
              loading="lazy"
              className={cn(
                "absolute inset-0 w-full h-full border-0",
                "motion-safe:transition-opacity motion-safe:duration-[250ms] motion-safe:ease-out",
                loaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setLoaded(true)}
              tabIndex={0}
            />
          </div>

          {/* Caption below the iframe */}
          {embed.caption && (
            <div className="mt-3">
              <p
                className={cn(
                  "text-caption text-[var(--color-text-tertiary)]",
                  "max-w-[56ch] leading-relaxed"
                )}
              >
                {embed.caption}
              </p>
            </div>
          )}

          {/*
           * CC-BY attribution — MUST render visibly when the iframe is shown.
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
        </>
      )}
    </div>
  );
}
