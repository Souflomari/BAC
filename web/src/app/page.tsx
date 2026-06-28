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
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="mb-5 text-[var(--color-border-soft)]"
      >
        <rect
          x="6"
          y="8"
          width="36"
          height="32"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M15 18h18M15 24h14M15 30h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <h2 className="text-h3 font-semibold text-[var(--color-text-primary)] mb-2">
        Aucune notion disponible
      </h2>
      <p className="text-body text-[var(--color-text-secondary)] max-w-[42ch]">
        Le contenu arrive bientôt. Les notions apparaîtront ici une fois
        qu&apos;elles auront été préparées.
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
        "px-6 py-5 rounded-xl",
        "border border-[var(--color-border-subtle)]",
        "bg-[var(--color-surface-raised)]",
        "shadow-subtle",
        // Hover — gentle lift in luminance, no jump
        "hover:border-[var(--color-border-soft)]",
        "hover:shadow-soft",
        "transition-all duration-[150ms] ease-out",
        // Focus
        // Focus ring — migrated to .focus-ring utility
        "focus-ring"
      )}
    >
      {/* Subject label */}
      <span
        className={cn(
          "inline-block mb-2",
          "text-caption font-medium",
          // #1: subject label at 12px caption — promoted to secondary for 4.5:1
          "text-[var(--color-text-secondary)]",
          "uppercase tracking-widest"
        )}
      >
        {subjectLabel(subject)}
      </span>

      {/* Notion title */}
      <h3
        className={cn(
          "text-h4 font-semibold",
          "text-[var(--color-text-primary)]",
          "leading-snug",
          "group-hover:text-accent",
          "transition-colors duration-[150ms] ease-out"
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
          "transition-colors duration-[150ms] ease-out"
        )}
        aria-hidden="true"
      >
        Ouvrir
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="mt-px translate-x-0 group-hover:translate-x-1 transition-transform duration-[150ms] ease-out"
        >
          <path
            d="M3 7h8M8 4l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
            "text-display font-semibold text-[var(--color-text-primary)]",
          )}
          style={{ letterSpacing: "-0.025em" }}
        >
          Notions
        </h1>
        <p
          className={cn(
            "mt-4 text-lead text-[var(--color-text-secondary)] max-w-[52ch]"
          )}
        >
          Chaque notion est enseignée jusqu&apos;au bout — décortiquée, illustrée,
          exercée.
        </p>
      </header>

      {/* Content */}
      {notions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-12">
          {subjects.map((subject) => (
            <section key={subject} aria-labelledby={`subject-${subject}`}>
              {/* Subject heading */}
              <h2
                id={`subject-${subject}`}
                className={cn(
                  "mb-5 pb-3",
                  "border-b border-[var(--color-border-subtle)]",
                  "text-h3 font-semibold text-[var(--color-text-secondary)]"
                )}
              >
                {subjectLabel(subject)}
              </h2>

              {/* Notion cards — single column for calm, each card its own row */}
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
