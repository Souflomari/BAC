/**
 * Eyebrow
 *
 * The product's ONE eyebrow language (ADR 0023/0024): a hairline rule + a
 * tracked small-caps label. Two tones, ONE component, so every tracked-caps
 * label in the product resolves to a single source of truth:
 *   - tone="accent" (default): the signature-accent hairline + accent caps —
 *     the one accent moment on a surface (masthead subject, checkpoint).
 *   - tone="muted": a neutral hairline + tertiary caps — quiet labels that must
 *     NOT add an accent (home notion-card subject, embed tool label).
 *
 * The hairline span is always decorative (aria-hidden). Set `decorative` when
 * the WHOLE eyebrow is redundant for assistive tech (e.g. the checkpoint card
 * already carries its own aria-label); leave it off when the label text is
 * meaningful (e.g. the masthead subject).
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  decorative = false,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  decorative?: boolean;
  tone?: "accent" | "muted";
}) {
  const muted = tone === "muted";
  return (
    <p
      aria-hidden={decorative || undefined}
      className={cn(
        "flex items-center gap-2.5",
        "text-caption font-medium uppercase tracking-eyebrow",
        // muted uses SECONDARY (not tertiary): a 12px label is functional text and
        // must pass WCAG AA (secondary = 6.8:1 light / 7.7:1 dark; tertiary fails).
        muted ? "text-secondary" : "text-accent",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-px w-6",
          muted ? "bg-border-soft" : "bg-accent/60"
        )}
      />
      {/* `min-w-0 break-words` (2026-09-05) : le libellé est un item flex à côté
          du trait ; sans boîte propre il ne peut pas descendre sous son mot le
          plus long. À 200 % de texte sur 320 px, « COMPRÉHENSION » (220 px)
          dans la carte de point d'arrêt (160 px de large après ses marges)
          faisait déborder la PAGE de 36 px — sur chaque leçon du corpus. */}
      <span className="min-w-0 break-words">{children}</span>
    </p>
  );
}
