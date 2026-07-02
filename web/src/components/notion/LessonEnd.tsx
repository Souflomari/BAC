/**
 * LessonEnd — the session-close handoff (bible §8's "session close" periphery
 * moment; the Day-3 Set-C decision refiled C2's handoff band HERE, keeping the
 * site-wide footer quiet).
 *
 * Register: QUIET. One clear next recommendation, stated once — no filled
 * button (the lesson surface's one filled action belongs to the embed's
 * primary), no celebration, no score, no engagement theater. The row uses the
 * standard state-layer + accent-arrow language every link shares.
 *
 * Honest-state rule (Day 4): the recommendation is DETERMINISTIC AND REAL —
 * the caller passes the most recently updated other notion (interleaving
 * beats repetition); nothing implies knowledge of the student we don't have.
 * When per-student state lands, the same slot renders the personalized next
 * step — the contract (one recommendation + one quiet escape) is stable.
 *
 * Spec: docs/design/PAGE-ANATOMY-SPECS.md §LessonEnd.
 */

import Link from "next/link";
import type { NotionMeta } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const SUBJECT_LABELS: Record<string, string> = {
  maths: "Mathématiques",
  pc:    "Physique-Chimie",
  svt:   "Sciences de la Vie et de la Terre",
};

export function LessonEnd({ next }: { next: NotionMeta | null }) {
  return (
    <aside
      data-lesson-end
      aria-label="Fin de la leçon"
      className={cn(
        "mt-20 pt-8",
        "border-t border-[var(--color-border-subtle)]"
      )}
    >
      <p className="text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
        Et maintenant
      </p>

      {next ? (
        <Link
          href={`/notions/${encodeURIComponent(next.subject)}/${encodeURIComponent(next.slug)}`}
          className={cn(
            "group mt-4 flex items-center justify-between gap-6",
            "rounded-lg px-4 py-4 -mx-4",
            "state-layer focus-ring [--focus-radius:12px]"
          )}
        >
          <span className="min-w-0">
            <span className="block text-caption text-[var(--color-text-secondary)]">
              Changer de matière — {SUBJECT_LABELS[next.subject] ?? next.subject}
            </span>
            <span className="mt-1 block font-serif text-h3 font-semibold text-[var(--color-text-primary)]">
              {next.title}
            </span>
          </span>
          <Icon
            name="arrow-right"
            size={20}
            className="flex-shrink-0 text-accent translate-x-0 group-hover:translate-x-1 transition-transform duration-micro ease-out"
          />
        </Link>
      ) : null}

      <p className="mt-4">
        <Link
          href="/"
          className={cn(
            "text-body-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            "state-layer rounded px-2 py-1 -mx-2 focus-ring [--focus-radius:8px]",
            "transition-colors duration-micro ease-enter"
          )}
        >
          Retour aux notions
        </Link>
      </p>
    </aside>
  );
}
