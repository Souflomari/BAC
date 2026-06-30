/**
 * Home page — lists available notions.
 *
 * DESIGN-BIBLE §8 (periphery): the home screen is periphery, not learning core.
 * It invites the student in. It should be calm, clear, and lead directly to
 * the work — not a busy dashboard or a marketing page.
 *
 * Empty state: zero notions (content/ absent or empty) → calm "no notions yet"
 * message, never a crash.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { listNotions } from "@/lib/content";
import { PageShell } from "@/components/ui/PageShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notions",
};

// ── Subject display names ──────────────────────────────────────────────────────
const SUBJECT_LABELS: Record<string, string> = {
  maths:  "Mathématiques",
  pc:     "Physique-Chimie",
  svt:    "Sciences de la Vie et de la Terre",
  philo:  "Philosophie",
};

function subjectLabel(subject: string): string {
  return SUBJECT_LABELS[subject] ?? subject;
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "py-24 text-center",
        "rounded-2xl",
        "border border-dashed border-[var(--color-border-subtle)]",
        "bg-[var(--color-surface-raised)]"
      )}
      role="status"
      aria-label="Aucune notion disponible"
    >
      {/* Calm placeholder icon */}
      <Icon
        name="empty-doc"
        size={48}
        className="mb-6 text-[var(--color-border-soft)]"
      />
      <h2 className="text-h3 font-semibold text-[var(--color-text-primary)] mb-2">
        Aucune notion disponible
      </h2>
      <p className="text-body text-[var(--color-text-secondary)] max-w-[42ch]">
        Le contenu arrive bientôt. Les notions apparaîtront ici une fois
        qu’elles auront été préparées.
      </p>
    </div>
  );
}

// ── Notion card ───────────────────────────────────────────────────────────────
function NotionCard({
  id,
  title,
  subject,
  slug,
}: {
  id: string;
  title: string;
  subject: string;
  slug: string;
}) {
  return (
    <Link
      href={`/notions/${encodeURIComponent(subject)}/${encodeURIComponent(slug)}`}
      className={cn(
        "group block",
        "px-6 py-6 rounded-xl",
        "bg-[var(--color-surface-raised)]",
        // Shadow-first card (ADR 0023): elevation-1 hairline ring at rest;
        // lifts to elevation-2 on hover — confident, never a jump.
        "shadow-elevation-1",
        "hover:shadow-elevation-2 hover:-translate-y-px",
        "transition-all duration-micro ease-out",
        // One interaction-feedback language (ADR 0024): neutral state-layer wash.
        "state-layer",
        // Focus ring — migrated to .focus-ring utility; match the rounded-xl corner.
        "focus-ring [--focus-radius:16px]"
      )}
    >
      {/* Subject label — quiet tracked-caps eyebrow (no accent) */}
      <Eyebrow tone="muted" className="mb-2">
        {subjectLabel(subject)}
      </Eyebrow>

      {/* Notion title */}
      <h3
        className={cn(
          "text-h4 font-semibold",
          "text-[var(--color-text-primary)]",
          "leading-snug",
          "group-hover:text-accent",
          "transition-colors duration-micro ease-out"
        )}
      >
        {title}
      </h3>

      {/* Subtle arrow — direction cue */}
      <span
        className={cn(
          "mt-3 flex items-center gap-1",
          // #1: 14px body-sm + aria-hidden but still visible — promoted to secondary
          "text-body-sm font-medium text-[var(--color-text-secondary)]",
          "group-hover:text-accent",
          "transition-colors duration-micro ease-out"
        )}
        aria-hidden="true"
      >
        Ouvrir
        <Icon
          name="arrow-right"
          size={14}
          className="mt-px translate-x-0 group-hover:translate-x-1 transition-transform duration-micro ease-out"
        />
      </span>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const notions = listNotions();

  // Group by subject
  const bySubject: Record<string, typeof notions> = {};
  for (const n of notions) {
    (bySubject[n.subject] ??= []).push(n);
  }
  const subjects = Object.keys(bySubject).sort();

  return (
    <PageShell width="content">
      {/* Page header */}
      <header className="mb-12">
        <h1
          className={cn(
            "font-serif text-display font-bold text-[var(--color-text-primary)]",
          )}
        >
          Notions
        </h1>
        <p
          className={cn(
            "mt-4 text-lead text-[var(--color-text-secondary)] max-w-lead"
          )}
        >
          Chaque notion est enseignée jusqu’au bout — décortiquée, illustrée,
          exercée.
        </p>
      </header>

      {/* Content */}
      {notions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-12">
          {subjects.map((subject) => (
            <section key={subject} aria-labelledby={`subject-${subject}`} className="max-w-list">

              {/* Subject heading */}
              <h2
                id={`subject-${subject}`}
                className={cn(
                  "mb-6 pb-3",
                  "border-b border-[var(--color-border-subtle)]",
                  "text-h3 font-semibold text-[var(--color-text-secondary)]"
                )}
              >
                {subjectLabel(subject)}
              </h2>

              {/* Notion cards — single column for calm, each card its own row.
                  Width is governed by the section's max-w-list so the heading
                  rule and the cards share ONE right edge (ADR 0024). */}
              <ul
                role="list"
                className="space-y-3"
                aria-label={`Notions de ${subjectLabel(subject)}`}
              >
                {bySubject[subject].map((n) => (
                  <li key={n.id}>
                    <NotionCard
                      id={n.id}
                      title={n.title}
                      subject={n.subject}
                      slug={n.slug}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
