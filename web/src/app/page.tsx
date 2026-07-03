/**
 * Home — the DASHBOARD (Day-9 site skeleton; grew from the Day-4 session-first
 * front door, Set B = B1).
 *
 * DESIGN-BIBLE §8 + VISION (guided-primary): the app LEADS. The dashboard
 * opens on today's session (the one primary action), then the subject grid
 * (the whole programme — the "it's a real product" spine), then the notions
 * available to study right now.
 *
 * THE HONEST-STATE RULE holds everywhere: no fabricated progress. The session
 * is the honest first-visit "start" state; subject cards show real built/total
 * counts; the shelf shows only notions that actually exist. Filière is a
 * device preference (Dashboard/useFiliere), never invented, and never gates
 * the page — it narrows the grid.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { listNotions } from "@/lib/content";
import { getTodaySession } from "@/lib/session";
import { subjectLabel, notionHref } from "@/lib/subjects";
import {
  SUBJECTS,
  subjectChapterCount,
  subjectAvailableCount,
  type SubjectId,
} from "@/lib/curriculum";
import { PageShell } from "@/components/ui/PageShell";
import { Icon } from "@/components/ui/Icon";
import { Cover } from "@/components/covers/Cover";
import { Dashboard } from "@/components/dashboard/Dashboard";
import type { SubjectSummary } from "@/components/dashboard/SubjectCard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ta session",
};

// ── THE primary element: the session card (Day-4 B1, unchanged) ───────────────
function SessionCard() {
  const session = getTodaySession();
  if (!session) return null;

  const { notion } = session;

  return (
    <section aria-label="La session du jour" className="max-w-list">
      <div
        className={cn(
          "rounded-xl overflow-hidden",
          "bg-surface-container-high shadow-elevation-2",
          "bp-medium:grid bp-medium:grid-cols-[1fr_240px]"
        )}
      >
        <div className="px-8 py-8">
          <p className="text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
            Aujourd’hui · {subjectLabel(notion.subject)}
          </p>
          <h2 className="mt-2 font-serif text-h2 font-bold text-[var(--color-text-primary)]">
            {notion.title}
          </h2>
          <p className="mt-2 text-body text-[var(--color-text-secondary)]">
            {session.kind === "start" ? (
              <>
                Nouvelle notion — on la prend depuis le début
                {notion.readingMinutes ? ` (≈ ${notion.readingMinutes} min de lecture)` : ""}.
              </>
            ) : (
              <>
                Reprise à « {session.position} » — section {session.step} sur{" "}
                {session.totalSteps}.
              </>
            )}
          </p>

          {/* Progress renders ONLY from real resume state — never fabricated. */}
          {session.kind === "resume" && (
            <div
              className="mt-5 h-1 rounded-full bg-[var(--color-border-subtle)]"
              role="progressbar"
              aria-valuenow={Math.round((session.step / session.totalSteps) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression dans la notion"
            >
              <div
                className="h-1 rounded-full bg-accent"
                style={{ width: `${(session.step / session.totalSteps) * 100}%` }}
              />
            </div>
          )}

          <Link
            href={notionHref(notion.subject, notion.slug)}
            className={cn("mt-6 btn-primary focus-ring")}
          >
            {session.kind === "start" ? "Commencer la session" : "Reprendre la session"}
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>

        <div className="hidden bp-medium:block relative">
          <Cover
            subject={notion.subject}
            slug={notion.slug}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// ── Available notions shelf — the built ones, ready to study now ──────────────
function AvailableShelf({ notions }: { notions: ReturnType<typeof listNotions> }) {
  if (notions.length === 0) return null;
  const bySubject: Record<string, typeof notions> = {};
  for (const n of notions) (bySubject[n.subject] ??= []).push(n);
  const subjects = Object.keys(bySubject).sort();

  return (
    <section aria-label="Notions disponibles" className="mt-16">
      <h2 className="mb-2 pb-3 border-b border-[var(--color-border-subtle)] text-h4 font-semibold text-[var(--color-text-primary)]">
        Disponible maintenant
      </h2>
      <p className="mt-2 mb-6 text-caption text-[var(--color-text-secondary)]">
        Les notions déjà écrites — commence l’une d’elles tout de suite.
      </p>
      <div className="space-y-8">
        {subjects.map((subject) => (
          <section key={subject} aria-labelledby={`avail-${subject}`}>
            <h3
              id={`avail-${subject}`}
              className="mb-3 text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
            >
              {subjectLabel(subject)}
            </h3>
            <ul
              role="list"
              className="grid gap-4 bp-medium:grid-cols-2 bp-wide:grid-cols-3"
              aria-label={`Notions de ${subjectLabel(subject)}`}
            >
              {bySubject[subject].map((n) => (
                <li key={n.id}>
                  <Link
                    href={notionHref(n.subject, n.slug)}
                    className={cn(
                      "group block rounded-xl overflow-hidden",
                      "bg-[var(--color-surface-raised)] shadow-elevation-1",
                      "hover:shadow-elevation-2 hover:-translate-y-px",
                      "transition-all duration-micro ease-out",
                      "state-layer focus-ring [--focus-radius:16px]"
                    )}
                  >
                    <div className="aspect-[8/5] overflow-hidden border-b border-[var(--color-border-subtle)]">
                      <Cover subject={n.subject} slug={n.slug} />
                    </div>
                    <div className="px-5 py-4">
                      <span className="block font-serif text-lead leading-snug text-[var(--color-text-primary)] group-hover:text-accent transition-colors duration-micro">
                        {n.title}
                      </span>
                      {n.readingMinutes && (
                        <span className="mt-1 block text-caption text-[var(--color-text-secondary)] tabular-nums">
                          {n.readingMinutes} min de lecture
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const notions = listNotions();
  const builtIds = new Set(notions.map((n) => n.id));

  // All subject summaries, server-computed (serializable → passed to the
  // client Dashboard, which chooses which to show by filière).
  const subjectSummaries: SubjectSummary[] = (
    Object.keys(SUBJECTS) as SubjectId[]
  ).map((id) => {
    const s = SUBJECTS[id];
    return {
      id,
      label: s.label,
      blurb: s.blurb,
      total: subjectChapterCount(s),
      available: subjectAvailableCount(s, builtIds),
    };
  });

  return (
    <PageShell width="content">
      <header className="mb-10">
        <h1 className="font-serif text-display font-bold text-[var(--color-text-primary)]">
          Ta session
        </h1>
        <p className="mt-4 text-lead text-[var(--color-text-secondary)] max-w-lead">
          Deux heures calmes, une notion à fond. Voilà par où commencer.
        </p>
      </header>

      <SessionCard />
      <Dashboard subjects={subjectSummaries} />
      <AvailableShelf notions={notions} />
    </PageShell>
  );
}
