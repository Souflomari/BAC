/**
 * Eyebrow
 *
 * The product's ONE eyebrow language (ADR 0023): an accent hairline rule + a
 * tracked small-caps label in the signature accent. Used for the page masthead
 * (subject label) and the checkpoint ("Vérifie ta compréhension"). Extracted so
 * the two are provably the same component — identical tracking, weight, and
 * hairline — never a near-miss.
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
}: {
  children: ReactNode;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <p
      aria-hidden={decorative || undefined}
      className={cn(
        "flex items-center gap-2.5",
        "text-caption font-medium uppercase tracking-[0.14em] text-accent",
        className
      )}
    >
      <span aria-hidden="true" className="inline-block h-px w-6 bg-accent/60" />
      {children}
    </p>
  );
}
