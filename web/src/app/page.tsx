/**
 * Home page — the SESSION-FIRST front door (Day-4 freeze, Set B = B1,
 * FABLE-DECIDED / OWNER-REVIEW-PENDING — ledger docs/audits/fable-day3-ledger.md).
 *
 * DESIGN-BIBLE §8 (periphery) + VISION (guided-primary): the app LEADS — home
 * opens on today's session, the page's ONE primary element (the only filled
 * accent action on the surface). The library is quiet rows below.
 *
 * THE HONEST-STATE RULE: no fabricated progress, ever. Until per-student
 * persistence exists (production-lane, human-gated), the truthful first-visit
 * state renders: "today's session — start <the most recently updated notion>".
 * The session element branches on the SessionState contract (lib/session.ts),
 * so real resume states light up with zero markup changes.
 *
 * Empty state: zero notions → calm "no notions yet" message, never a crash.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { listNotions } from "@/lib/content";
import { getTodaySession } from "@/lib/session";
import { subjectLabel, notionHref } from "@/lib/subjects";
import { PageShell } from "@/components/ui/PageShell";
import { Icon } from "@/components/ui/Icon";
import { Cover } from "@/components/covers/Cover";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ta session",
};

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

// ── THE primary element: the session card ─────────────────────────────────────
// Branches on the SessionState contract. Today only "start" can occur (honest
// first-visit); "resume" renders the same anatomy with position + progress —
// from REAL state only, when persistence lands.
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

        {/* The suggested notion's cover — side panel, art only (COVER-SPEC:
            the session copy leads; the cover is mood). Hidden on compact. */}
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

// ── The library — quiet rows under subject headings (B1 anatomy) ─────────────
function Library({ notions }: { notions: ReturnType<typeof listNotions> }) {
  const bySubject: Record<string, typeof notions> = {};
  for (const n of notions) {
    (bySubject[n.subject] ??= []).push(n);
  }
  const subjects = Object.keys(bySubject).sort();

  return (
    <section aria-label="Toutes les notions" className="mt-16 max-w-list">
      <h2 className="mb-2 pb-3 border-b border-[var(--color-border-subtle)] text-h4 font-semibold text-[var(--color-text-secondary)]">
        Toutes les notions
      </h2>
      <div className="space-y-8 mt-6">
        {subjects.map((subject) => (
          <section key={subject} aria-labelledby={`subject-${subject}`}>
            <h3
              id={`subject-${subject}`}
              className="mb-1 text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
            >
              {subjectLabel(subject)}
            </h3>
            {/* The SHELF (Day-6, COVER-SPEC): cover cards, not index rows —
                the owner's "Wikipedia home" fix. No state words (honest-state
                rule); reading time is a real fact. */}
            <ul
              role="list"
              className="grid gap-4 bp-medium:grid-cols-2"
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

      {notions.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <SessionCard />
          <Library notions={notions} />
        </>
      )}
    </PageShell>
  );
}
