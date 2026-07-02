/**
 * LessonEnd — the lesson surface's session-close handoff.
 *
 * Spec: docs/design/PAGE-ANATOMY-SPECS.md §LessonEnd (purpose, anatomy, data
 * contract, invariants). Governed by DESIGN-BIBLE §8 (the periphery — gentle
 * return: "one clear what-to-study-next, not a feed of options") and §11
 * (page anatomy: "every page ends... the lesson's session-close moment is the
 * LessonEnd component ON the lesson surface, above the footer" — the footer
 * itself stays a quiet colophon, no engagement mechanics).
 *
 * Renders ONE clear next recommendation in a quiet register. Deliberately NOT
 * a filled button: DESIGN-BIBLE §13's primary-element table reserves the
 * notion surface's one `.btn-primary` for the embed — a second filled accent
 * action here would be a defect. The recommendation is a plain `.state-layer`
 * row, not a boxed card: §11's section-rhythm rule reserves panels for
 * genuinely interactive/stateful content (MCQ, checkpoint, embed, motion) and
 * flowing content is NOT boxed. The whole handoff is measure-capped to the
 * same reading column as the lesson prose above it (`.notion-prose`) so the
 * close reads as the column's own last word, not a full-width band.
 *
 * HONEST-STATE RULE (the data contract). `next` is computed deterministically
 * by the caller (NotionPageView: today, the most recently updated OTHER
 * notion — interleaving beats repeating the same subject) and handed in as
 * `NotionMeta | null`. This component never invents an ordering, never
 * fabricates student state, and renders no `role="progressbar"` — no real
 * per-student state exists yet. When per-student state lands (production-lane,
 * human-gated), the same slot renders the personalized next step; this markup
 * contract does not change. When `next` is null (no other notion exists),
 * only the quiet "Retour aux notions" path renders.
 */

import Link from "next/link";
import type { NotionMeta } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

// Subject display labels — mirrors the map kept in app/page.tsx and
// components/notion/NotionPageView.tsx. No shared lib export exists yet for
// this small display map (each surface currently keeps its own copy); kept
// local here rather than reaching into a sibling page/view module.
const SUBJECT_LABELS: Record<string, string> = {
  maths: "Mathématiques",
  pc: "Physique-Chimie",
  svt: "Sciences de la Vie et de la Terre",
  philo: "Philosophie",
};

function subjectLabel(subject: string): string {
  return SUBJECT_LABELS[subject] ?? subject;
}

function notionHref(subject: string, slug: string): string {
  return `/notions/${encodeURIComponent(subject)}/${encodeURIComponent(slug)}`;
}

export function LessonEnd({ next }: { next: NotionMeta | null }) {
  return (
    <aside
      data-lesson-end
      aria-label="Et maintenant"
      className={cn(
        "notion-prose",
        "mt-20 pt-8 border-t border-[var(--color-border-subtle)]"
      )}
    >
      {/* Caps-caption label. Decorative: the <aside>'s aria-label already
          names this region, so the visible label is not announced twice. */}
      <Eyebrow tone="muted" decorative>
        Et maintenant
      </Eyebrow>

      {/* ONE recommendation — a quiet state-layer row, not a filled button
          (the surface's one .btn-primary belongs to the embed). Honest-state:
          renders only when the caller found a real other notion to suggest. */}
      {next && (
        <Link
          href={notionHref(next.subject, next.slug)}
          className={cn(
            "group mt-4 flex items-center justify-between gap-6",
            "-mx-6 rounded-xl px-6 py-6",
            "state-layer focus-ring [--focus-radius:16px]"
          )}
        >
          <span className="min-w-0 flex-1">
            <span
              className={cn(
                "block truncate font-serif text-h3 font-semibold",
                "text-[var(--color-text-primary)]",
                "transition-colors duration-micro group-hover:text-accent"
              )}
            >
              {next.title}
            </span>
            <span className="mt-1 block text-caption text-[var(--color-text-secondary)]">
              Changer de matière — {subjectLabel(next.subject)}
            </span>
          </span>
          <Icon
            name="arrow-right"
            size={20}
            className="flex-shrink-0 text-accent"
          />
        </Link>
      )}

      {/* Quiet return path — always present, independent of whether a
          recommendation exists. */}
      <Link
        href="/"
        className={cn(
          "mt-6 inline-flex items-center gap-1.5",
          "text-body-sm font-medium",
          "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
          "transition-colors duration-micro ease-enter",
          "state-layer rounded px-2 py-1 -mx-2",
          "focus-ring [--focus-radius:8px]"
        )}
      >
        Retour aux notions
      </Link>
    </aside>
  );
}
