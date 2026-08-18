/**
 * SubjectCard — one matière on the dashboard grid (Day-9 site skeleton).
 *
 * Same card language as the notion shelf (Cover on top, serif title, quiet
 * meta) so the dashboard reads as one system. Honest counts only: "N chapitres
 * · M disponibles" — real facts from the built content tree, never fabricated
 * progress. A stub subject (0 chapters) says "programme à venir".
 */

import { Link } from "@/components/ui/Lien";
import { Cover } from "@/components/covers/Cover";
import { subjectHref } from "@/lib/subjects";
import { cn } from "@/lib/utils";

export interface SubjectSummary {
  id: string;
  label: string;
  blurb: string;
  total: number;
  available: number;
  /** Shown only in a filière context. */
  coefficient?: number;
}

export function SubjectCard({ subject }: { subject: SubjectSummary }) {
  const { id, label, blurb, total, available, coefficient } = subject;
  const meta =
    total === 0
      ? "Programme à venir"
      : `${total} chapitre${total > 1 ? "s" : ""}${
          available > 0 ? ` · ${available} disponible${available > 1 ? "s" : ""}` : ""
        }`;

  return (
    <Link
      href={subjectHref(id)}
      className={cn(
        "group flex h-full w-full flex-col rounded-xl overflow-hidden",
        "bg-surface-raised shadow-elevation-1",
        "hover:shadow-elevation-2 hover:-translate-y-px",
        "transition-all duration-micro ease-out",
        "state-layer focus-ring [--focus-radius:16px]"
      )}
    >
      <div className="relative aspect-[8/5] overflow-hidden border-b border-subtle">
        <Cover subject={id} />
        {coefficient != null && (
          <span
            className={cn(
              "absolute right-3 top-3 rounded-full px-2.5 py-0.5",
              "bg-surface-overlay/90 backdrop-blur-sm",
              "text-caption font-medium tabular-nums text-secondary",
              "border border-subtle"
            )}
            title="Coefficient au baccalauréat"
          >
            coef. {coefficient}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 py-4">
        <span className="block font-display text-lead leading-snug text-primary group-hover:text-accent transition-colors duration-micro">
          {label}
        </span>
        <span className="mt-1 text-body-sm text-secondary line-clamp-2">
          {blurb}
        </span>
        <span className="mt-3 text-caption text-secondary tabular-nums">
          {meta}
        </span>
      </div>
    </Link>
  );
}
