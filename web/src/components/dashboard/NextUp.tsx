/**
 * NextUp — « Quoi étudier ensuite » (DASHBOARD-SPEC §1.2 / LEARNER-MODEL-SPEC
 * §5). ONE quiet recommendation line under the session card — never a list,
 * never the word « toi » (no state exists to justify personalising the
 * pronoun; DASHBOARD-SPEC §3).
 *
 * Predicate priority is LEARNER-MODEL-SPEC §5's full ladder
 * (misconception-active → reprise → révision → parcours). Predicates 1-3
 * come from `useStudentState()`'s `nextUp` (learner-model.ts's
 * `nextUpRecommendation` — pure, event-log-driven); predicate 4
 * (`parcours`) stays THIS file's own content-tree logic below, since it
 * needs curriculum/filière data the event log knows nothing about. The two
 * layers compose on one rule: `nextUp === null` (no persisted session, or
 * "off"/"mock" builds where it is ALWAYS null) means "fall through to
 * parcours" — so with no live session this render is BYTE-IDENTICAL to
 * before: the first chapter, in curriculum order (filière-aware via
 * useFiliere), that resolves to a REAL built notion. Recommending an
 * unwritten chapter would be dishonest (nothing to open) — skipping to the
 * first BUILT one is the honest reading of "première leçon non ouverte du
 * parcours" when nothing is open yet. `firstOfParcours` also SKIPS any
 * chapter outside the chosen filière (`chapterInFiliere`, ADR 0025 §2.11
 * golden rule: narrows, never gates) — e.g. a PC/SVT device preference never
 * recommends the SM-only "Approfondissement" chapters; no filière chosen
 * skips nothing.
 *
 * Predicate 1's sentence is deliberately generic ("un point précis te fait
 * encore trébucher", no quoted label): LEARNER-MODEL-SPEC §5's example text
 * quotes the misconception's curated `label` (items.yaml), which is loaded
 * server-side only (content.ts, `fs`) — no client-safe label artifact
 * exists yet. Quoting it would need either a new generated client-readable
 * map or threading it down from a server component; both are flagged here
 * as follow-ups rather than invented in place of the missing data.
 *
 * Client component: useFiliere reads the persisted device preference
 * (localStorage — sanctioned, ADR 0025 §2.11), so this narrows the parcours
 * order the same way Dashboard.tsx/FiliereBadge already do. `mounted` gates
 * the filière-aware order so server and first client paint agree (no
 * hydration flash) — the DEFAULT_ORDER fallback below is honest either way.
 */

"use client";

import { Link } from "@/components/ui/Lien";
import { getFiliere, SUBJECTS, chapterInFiliere, type SubjectId, type FiliereId } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { useStudentState } from "@/lib/student-state";
import type { NextUpPick } from "@/lib/learner-model";
import { notionHref } from "@/lib/subjects";
import { frenchTypography } from "@/lib/frenchTypography";
import { cn } from "@/lib/utils";
import type { NotionMeta } from "@/lib/content";

const RECO_LINK_CLASS = cn(
  "font-medium text-primary",
  "underline decoration-border-soft underline-offset-2",
  "hover:text-accent state-layer focus-ring [--focus-radius:4px]",
  "transition-colors duration-micro ease-between"
);

/**
 * The sentence fragments around the notion-title Link, keyed by predicate
 * source (LEARNER-MODEL-SPEC §5's wording, minus the unavailable
 * misconception label — see file header). Numeric detail (chapter position,
 * day count) renders ONLY when the read layer actually supplied it from a
 * real stored fact — never invented.
 */
function recoParts(pick: NextUpPick): { before: string; after: string } {
  switch (pick.source) {
    case "misconception-active":
      return { before: "Reprends ", after: " — un point précis te fait encore trébucher." };
    case "reprise":
      return pick.chapterIndex && pick.chaptersTotal
        ? { before: "Continue ", after: `, chapitre ${pick.chapterIndex} sur ${pick.chaptersTotal}.` }
        : { before: "Continue ", after: "." };
    case "revision": {
      const j = pick.daysSinceVisit;
      return j != null
        ? { before: `Ça fait ${j} jour${j > 1 ? "s" : ""} — refais un passage sur `, after: "." }
        : { before: "Refais un passage sur ", after: "." };
    }
  }
}

/** Subject scan order when no filière is chosen — mirrors Dashboard.tsx's
 *  DEFAULT_ORDER so the two surfaces never disagree about "the" curriculum
 *  order in the absence of a filière preference. */
const DEFAULT_ORDER: SubjectId[] = ["maths", "pc", "svt", "philo"];

function subjectOrder(filiereId: string | null): SubjectId[] {
  const f = getFiliere(filiereId);
  return f ? (f.subjects.map((s) => s.id) as SubjectId[]) : DEFAULT_ORDER;
}

/** The first chapter, in curriculum order, that is BOTH in the chosen
 *  filière (ADR 0025 §2.11: narrows, never gates — `filiereId === null`
 *  skips nothing) AND a real built notion — the only honest "next in the
 *  parcours" pick while nothing is opened. */
function firstOfParcours(
  order: SubjectId[],
  builtIds: Set<string>,
  filiereId: FiliereId | null
): { subject: SubjectId; slug: string } | null {
  for (const subjectId of order) {
    const subject = SUBJECTS[subjectId];
    if (!subject) continue;
    for (const unit of subject.units) {
      for (const chapter of unit.chapters) {
        if (!chapterInFiliere(chapter, filiereId)) continue;
        if (builtIds.has(`${subjectId}/${chapter.slug}`)) {
          return { subject: subjectId, slug: chapter.slug };
        }
      }
    }
  }
  return null;
}

export function NextUp({ notions }: { notions: NotionMeta[] }) {
  const { filiere, mounted } = useFiliere();
  const { nextUp } = useStudentState();
  const activeFiliere = mounted ? filiere : null;
  const builtIds = new Set(notions.map((n) => n.id));

  // Predicates 1-3 (LEARNER-MODEL-SPEC §5): only ever non-null in a "live"
  // build with a real session and a real recommendation — "off"/"mock"
  // builds and every signed-out/loading render keep `nextUp === null`
  // forever, falling straight through to the unchanged predicate-4 branch
  // below (byte-identical to before this session's work).
  if (nextUp) {
    const stateMeta = notions.find((n) => n.id === nextUp.notionId);
    if (stateMeta) {
      const { before, after } = recoParts(nextUp);
      return (
        <section aria-label="Quoi étudier ensuite" className="max-w-list">
          <p data-reco-source={nextUp.source} className="text-body-sm text-secondary">
            {frenchTypography(before)}
            <Link href={notionHref(stateMeta.subject, stateMeta.slug)} className={RECO_LINK_CLASS}>
              {frenchTypography(stateMeta.title)}
            </Link>
            {frenchTypography(after)}
          </p>
        </section>
      );
    }
  }

  const order = subjectOrder(activeFiliere);
  const pick = firstOfParcours(order, builtIds, activeFiliere);
  if (!pick) return null;

  const meta = notions.find((n) => n.id === `${pick.subject}/${pick.slug}`);
  if (!meta) return null;

  return (
    <section aria-label="Quoi étudier ensuite" className="max-w-list">
      <p
        data-reco-source="parcours"
        className="text-body-sm text-secondary"
      >
        {frenchTypography("Ensuite dans le parcours :")}{" "}
        <Link
          href={notionHref(pick.subject, pick.slug)}
          className={cn(
            "font-medium text-primary",
            "underline decoration-border-soft underline-offset-2",
            "hover:text-accent state-layer focus-ring [--focus-radius:4px]",
            "transition-colors duration-micro ease-between"
          )}
        >
          {frenchTypography(meta.title)}
        </Link>
        .
      </p>
    </section>
  );
}
