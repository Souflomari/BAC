/**
 * Breadcrumb — shared wayfinding (Day-9: extracted so the notion page, subject
 * page, and any deeper surface share ONE breadcrumb grammar).
 *
 * Segments: each is a label + optional href (the last is the current page,
 * no href, aria-current). The final label truncates VISUALLY at 28ch with a
 * `title` for the full text (the DOM text — the accessible name — stays whole;
 * July-2026 audit F6). Chevrons between, tertiary color.
 */

import { Link } from "@/components/ui/Lien";
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
      className="mb-8 flex items-center gap-2 flex-wrap text-body-sm text-secondary"
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
                  // 28ch seulement en colonne étroite : sur un écran de 1440
                  // avec 770 px libres, l'ellipse lisait comme un bug
                  // (audit R6, P2-5). Le titre complet vit juste dessous en
                  // h1 — la troncature n'est qu'un garde-fou d'espace.
                  last
                    ? "text-primary font-medium truncate max-w-[28ch] bp-medium:max-w-[48ch]"
                    : "text-secondary"
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
                className="text-tertiary"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
