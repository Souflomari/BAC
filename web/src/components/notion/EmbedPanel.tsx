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
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ExternalLinkIcon, InteractiveIcon, PlayIcon } from "@/components/ui/Icon";

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
      {/* Visual placeholder — shared interactive glyph, simple, calm, never flashy.
          Same glyph as the opt-in state so both embed states draw alike. */}
      <InteractiveIcon size={40} className="text-[var(--color-border-soft)]" />
      {/* #1: small text in placeholder promoted to secondary for contrast floor */}
      <p className="text-body-sm text-[var(--color-text-secondary)] font-medium">
        Interactif à venir
      </p>
      <p className="text-caption text-[var(--color-text-secondary)] max-w-[36ch]">
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
      {/* Section label — muted, never flashy.
          #1: 12px uppercase label promoted to secondary for 4.5:1 floor. */}
      <Eyebrow tone="muted" decorative className="mb-3">
        {toolLabel}
      </Eyebrow>

      {!iframeMounted ? (
        /* ── Opt-in state: show quiet button to open the sandbox ── */
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4",
            "w-full rounded-xl",
            "bg-[var(--color-surface-raised)]",
            // Shadow-first panel (ADR 0023): elevation-1 hairline ring, no border.
            "shadow-elevation-1",
            "px-8 py-14",
            "text-center"
          )}
        >
          {/* Icon — circuit/interactive hint */}
          <InteractiveIcon size={36} className="text-[var(--color-border-soft)]" />

          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium text-[var(--color-text-secondary)]">
              Bac à sable interactif
            </p>
            {embed.caption && (
              // #1: caption at 12px must pass 4.5:1 — promoted from tertiary to secondary
              <p className="text-caption text-[var(--color-text-secondary)] max-w-[48ch] leading-relaxed">
                {frenchTypography(embed.caption.slice(0, 120))}{embed.caption.length > 120 ? "…" : ""}
              </p>
            )}
          </div>

          {/* DOM order: external link BEFORE the mount button (tab order §9) */}
          <a
            href={embed.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5",
              "text-caption font-medium",
              "text-accent hover:text-accent-strong",
              "transition-colors duration-micro",
              // Focus ring — migrated to .focus-ring utility
              "rounded focus-ring"
            )}
          >
            Ouvrir dans un nouvel onglet
            <ExternalLinkIcon size={14} />
          </a>

          <button
            type="button"
            onClick={() => setIframeMounted(true)}
            className={cn(
              // The one confident primary action of this panel (ADR 0023
              // .btn-primary). The calm opt-in is unchanged — the heavy iframe
              // still mounts only on click; this just makes THE action legible.
              "btn-primary",
              "focus-ring"
            )}
          >
            {/* Play icon */}
            <PlayIcon size={14} />
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
                "inline-flex items-center gap-1.5",
                "text-caption font-medium",
                "text-accent hover:text-accent-strong",
                "transition-colors duration-micro",
                // Focus ring — migrated to .focus-ring utility
                "rounded focus-ring"
              )}
            >
              Ouvrir dans un nouvel onglet
              <ExternalLinkIcon size={14} />
            </a>
          </div>

          {/* Aspect-ratio container — avoids layout shift.
              ADR 0024: expand-in-place container-transform on mount;
              elevation-2 surface steps UP in tone (container-high). */}
          <div
            className={cn(
              "relative w-full overflow-hidden",
              "rounded-xl",
              "bg-surface-container-high",
              // Shadow-first panel (ADR 0023): elevation-2 hairline ring, no border.
              "shadow-elevation-2",
              "motion-container-transform"
            )}
            style={{ paddingBottom: aspectPercent }}
          >
            {/* Loading state — shown until iframe fires onLoad.
                #4 fix: looping animate-pulse dots are the only ambient loop in the
                core, banned by MOTION-CHOREOGRAPHY §4. Replaced with a static label
                and a non-animating border indicator. Reduced-motion: already safe
                (no animation to suppress). */}
            {!loaded && (
              <div
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center gap-3",
                  "bg-surface-container-high"
                )}
              >
                {/* Non-animating spinner ring — one visual element, no looping */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full",
                    "border-2 border-[var(--color-border-subtle)]",
                    "border-t-[var(--color-text-secondary)]"
                  )}
                  aria-hidden="true"
                />
                {/* Visible loading label — not aria-hidden; satisfies §9 */}
                <p className="text-caption text-[var(--color-text-secondary)]">
                  Chargement de l’interactif…
                </p>
              </div>
            )}

            <iframe
              src={embed.url}
              title={embed.title ?? toolLabel}
              sandbox="allow-scripts allow-same-origin allow-popups"
              loading="lazy"
              className={cn(
                "absolute inset-0 w-full h-full border-0",
                "motion-safe:transition-opacity motion-safe:duration-standard motion-safe:ease-out",
                loaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setLoaded(true)}
              tabIndex={0}
            />
          </div>

          {/* Caption below the iframe — #1: 12px text promoted to secondary for 4.5:1 */}
          {embed.caption && (
            <div className="mt-3">
              <p
                className={cn(
                  "text-caption text-[var(--color-text-secondary)]",
                  "max-w-[56ch] leading-relaxed"
                )}
              >
                {frenchTypography(embed.caption)}
              </p>
            </div>
          )}

          {/*
           * CC-BY attribution — MUST render visibly when the iframe is shown.
           * PhET requires this; verbatim string from the embed descriptor.
           * #1: promoted from tertiary to secondary (12px must pass 4.5:1)
           */}
          {embed.attribution && (
            <p
              className={cn(
                "mt-3 pt-3",
                "border-t border-[var(--color-border-subtle)]",
                "text-caption text-[var(--color-text-secondary)]",
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
