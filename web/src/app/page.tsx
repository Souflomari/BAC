/**
 * Home — the DASHBOARD (DASHBOARD-SPEC.md — "home becomes a real dashboard;
 * content composed, sides functional", Day-12 owner direction).
 *
 * THIS BUILD SHIPS THE ZERO-STATE ONLY (DASHBOARD-SPEC §3): StudentState is
 * consumed through the real contract (`@/lib/student-state`) from a NULL
 * provider — no persistence exists yet (AUTH-SPEC §4 gate), so every
 * component here renders the honest first-visit degraded state, never a
 * fabricated one. DESIGN-BIBLE §8 (periphery, functional sides) + §0
 * (spatial separation of focus/engagement): the dashboard is the ONE surface
 * allowed a multi-column composition (DASHBOARD-SPEC §0).
 *
 * Anatomy (DASHBOARD-SPEC §1, DOM order = mobile order):
 *   1. SessionCard  — the one primary action ([data-primary-action]).
 *   2. NextUp        — one quiet "what next" line, under the session card.
 *   3. MasteryMap    — the per-notion table of contents ([data-mastery-token]).
 *   4. AvailableShelf — the existing B1 shelf, unchanged, recomposed here.
 *   5. SubjectProgress — one honest fact-line per subject.
 *   6. MilestoneSlot — renders null; absent from the DOM (§1.6).
 *
 * Wide composition (DASHBOARD-SPEC §4) is `.dashboard-grid` in globals.css:
 * mobile = single column in DOM order; 1280 = two columns (primary 2/3,
 * mastery 1/3, shelf+subjects full width below); 1536/1920 = three zones
 * (a thin subjects rail, primary centre-gauche, mastery droite) — same
 * `.dashboard-grid__*` wrapper divs at every tier, repositioned ONLY via
 * CSS Grid named areas (no DOM reorder, no `order` property — §5).
 *
 * The former Dashboard/SubjectCard grid (the pre-spec Day-9 sketch: cards
 * with cover art + "N chapitres · M disponibles" + an inline filière
 * chooser) is REPLACED here, not kept alongside — see the report for the
 * judgment call. Its "choisir sa filière" affordance is unaffected: it lives
 * in the header (FiliereBadge, SiteHeader.tsx) on every page already.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { listNotions, type NotionMeta } from "@/lib/content";
import { subjectLabel, notionHref } from "@/lib/subjects";
import { PageShell } from "@/components/ui/PageShell";
import { Cover } from "@/components/covers/Cover";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { NextUp } from "@/components/dashboard/NextUp";
import { MasteryMap } from "@/components/dashboard/MasteryMap";
import { SubjectProgress } from "@/components/dashboard/SubjectProgress";
import { MilestoneSlot } from "@/components/dashboard/MilestoneSlot";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ta session",
};

// ── Available notions shelf — the built ones, ready to study now (unchanged,
//    Day-9 B1 shelf; DASHBOARD-SPEC §1.4 — recomposed here, not restyled) ──────
function AvailableShelf({ notions }: { notions: NotionMeta[] }) {
  if (notions.length === 0) return null;
  const bySubject: Record<string, typeof notions> = {};
  for (const n of notions) (bySubject[n.subject] ??= []).push(n);
  const subjects = Object.keys(bySubject).sort();

  return (
    <section aria-label="Notions disponibles">
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

  return (
    <PageShell width="page">
      <header className="mb-10 max-w-lead">
        <h1 className="font-serif text-display font-bold text-[var(--color-text-primary)]">
          Ta session
        </h1>
        <p className="mt-4 text-lead text-[var(--color-text-secondary)]">
          Deux heures calmes, une notion à fond. Voilà par où commencer.
        </p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-grid__primary">
          <SessionCard />
          <NextUp notions={notions} />
        </div>
        <div className="dashboard-grid__mastery">
          <MasteryMap notions={notions} />
        </div>
        <div className="dashboard-grid__shelf">
          <AvailableShelf notions={notions} />
        </div>
        <div className="dashboard-grid__subjects">
          <SubjectProgress notions={notions} />
        </div>
      </div>

      {/* DASHBOARD-SPEC §1.6 — absent from the DOM until a real milestone is
          earned; renders null today. */}
      <MilestoneSlot />
    </PageShell>
  );
}
