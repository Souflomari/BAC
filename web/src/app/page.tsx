/**
 * Home — the DASHBOARD (DASHBOARD-SPEC.md — "home becomes a real dashboard;
 * content composed, sides functional", Day-12 owner direction).
 *
 * StudentState is consumed through the real contract (`@/lib/student-state`'s
 * `useStudentState()`, LEARNER-MODEL-SPEC's read layer) — in "off"/"mock"
 * builds, and on every signed-out render in "live" (no production project is
 * gated in yet — AUTH-SPEC §4), it resolves `null`, so every component here
 * renders the SAME honest first-visit degraded state (DASHBOARD-SPEC §3) as
 * before this read layer existed, never a fabricated one. DESIGN-BIBLE §8
 * (periphery, functional sides) + §0 (spatial separation of focus/
 * engagement): the dashboard is the ONE surface allowed a multi-column
 * composition (DASHBOARD-SPEC §0).
 *
 * Anatomy (DASHBOARD-SPEC §1, DOM order = mobile order):
 *   1. SessionCard  — the one primary action ([data-primary-action]).
 *   2. NextUp        — one quiet "what next" line, under the session card.
 *   3. MasteryMap    — the per-notion table of contents ([data-mastery-token]).
 *   4. AvailableShelf — the B1 shelf, now COLLAPSED per matière (owner
 *      feedback 2026-07-07: `Cover` shares one motif per SUBJECT — flat-
 *      listing all 61 notions repeated the same handful of illustrations
 *      dozens of times and made the page too long; see AvailableShelf.tsx).
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
import { listNotions } from "@/lib/content";
import { PageShell } from "@/components/ui/PageShell";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { NextUp } from "@/components/dashboard/NextUp";
import { MasteryMap } from "@/components/dashboard/MasteryMap";
import { AvailableShelf } from "@/components/dashboard/AvailableShelf";
import { SubjectProgress } from "@/components/dashboard/SubjectProgress";
import { MilestoneSlot } from "@/components/dashboard/MilestoneSlot";

export const metadata: Metadata = {
  title: "Ta session",
};

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
          <SessionCard notions={notions} />
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
