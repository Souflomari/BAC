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
          <span key={i} className="flex items-center gap-2 min-w-0 max-w-full">
            {seg.href && !last ? (
              <Link
                href={seg.href}
                className={cn(
                  "hover:text-accent transition-colors duration-micro",
                  "rounded focus-ring",
                  // WCAG 2.2 SC 2.5.8 (AA) : 24 px de cible minimum. Le
                  // libellé fait 21 px de haut ; l'exception « lien en pleine
                  // phrase » ne couvre pas un fil d'Ariane, qui est un
                  // contrôle de navigation à part entière. `py-1` porte la
                  // zone à 29 px, `-my-1` la rend gratuite en hauteur de
                  // ligne — rien ne bouge à l'œil, la cible double presque.
                  "inline-block py-1 -my-1"
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
                    // `min(…,100%)` : à 200 % de texte (SC 1.4.4), 28ch fait
                    // 430 px sur un écran de 360 — la borne en ch grandit avec la
                    // fonte, l'écran non. Mesuré le 2026-09-05 : 200 px de débord
                    // sur « Nombres complexes 1 ». La borne ne dépasse plus jamais
                    // la colonne ; l'ellipse fait le reste.
                    ? "text-primary font-medium truncate max-w-[min(28ch,100%)] bp-medium:max-w-[min(48ch,100%)]"
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
