/**
 * Breadcrumb — shared wayfinding (Day-9: extracted so the notion page, subject
 * page, and any deeper surface share ONE breadcrumb grammar).
 *
 * Segments: each is a label + optional href (the last is the current page,
 * no href, aria-current). The final label truncates VISUALLY at 28ch with a
 * `title` for the full text (the DOM text — the accessible name — stays whole;
 * July-2026 audit F6). Chevrons between, tertiary color.
 */

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ segments }: { segments: Crumb[] }) {
  return (
    <nav
      aria-label="Fil d’Ariane"
      className="mb-8 flex items-center gap-2 flex-wrap text-body-sm text-[var(--color-text-secondary)]"
    >
      {segments.map((seg, i) => {
        const last = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {seg.href && !last ? (
              <Link
                href={seg.href}
                className={cn(
                  "hover:text-accent transition-colors duration-micro",
                  "rounded focus-ring"
                )}
              >
                {seg.label}
              </Link>
            ) : (
              <span
                className={cn(
                  last
                    ? "text-[var(--color-text-primary)] font-medium truncate max-w-[28ch]"
                    : "text-[var(--color-text-secondary)]"
                )}
                aria-current={last ? "page" : undefined}
                title={last ? seg.label : undefined}
              >
                {seg.label}
              </span>
            )}
            {!last && (
              <Icon
                name="chevron-right"
                size={16}
                className="text-[var(--color-text-tertiary)]"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
