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
        "text-caption font-medium uppercase tracking-[0.14em]",
        // muted uses SECONDARY (not tertiary): a 12px label is functional text and
        // must pass WCAG AA (secondary = 6.8:1 light / 7.7:1 dark; tertiary fails).
        muted ? "text-[var(--color-text-secondary)]" : "text-accent",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-px w-6",
          muted ? "bg-[var(--color-border-soft)]" : "bg-accent/60"
        )}
      />
      {children}
    </p>
  );
}
