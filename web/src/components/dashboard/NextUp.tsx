/**
 * NextUp — « Quoi étudier ensuite » (DASHBOARD-SPEC §1.2 / LEARNER-MODEL-SPEC
 * §5). ONE quiet recommendation line under the session card — never a list,
 * never the word « toi » (no state exists to justify personalising the
 * pronoun; DASHBOARD-SPEC §3).
 *
 * Predicate priority is LEARNER-MODEL-SPEC §5's full ladder
 * (misconception-active → reprise → révision → parcours); with
 * `getStudentState()` returning `null` this session, predicates 1–3 never
 * fire and the render always falls to predicate 4, `parcours`: the first
 * chapter, in curriculum order (filière-aware via useFiliere — a device
 * preference, not fabricated state), that resolves to a REAL built notion.
 * Recommending an unwritten chapter would be dishonest (nothing to open) —
 * skipping to the first BUILT one is the honest reading of "première leçon
 * non ouverte du parcours" when nothing is open yet. `firstOfParcours` also
 * SKIPS any chapter outside the chosen filière (`chapterInFiliere`, ADR 0025
 * §2.11 golden rule: narrows, never gates) — e.g. a PC/SVT device preference
 * never recommends the SM-only "Approfondissement" chapters; no filière
 * chosen skips nothing.
 *
 * Client component: useFiliere reads the persisted device preference
 * (localStorage — sanctioned, ADR 0025 §2.11), so this narrows the parcours
 * order the same way Dashboard.tsx/FiliereBadge already do. `mounted` gates
 * the filière-aware order so server and first client paint agree (no
 * hydration flash) — the DEFAULT_ORDER fallback below is honest either way.
 */

"use client";

import Link from "next/link";
import { getFiliere, SUBJECTS, chapterInFiliere, type SubjectId, type FiliereId } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { notionHref } from "@/lib/subjects";
import { frenchTypography } from "@/lib/frenchTypography";
import { cn } from "@/lib/utils";
import type { NotionMeta } from "@/lib/content";

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
  const activeFiliere = mounted ? filiere : null;
  const builtIds = new Set(notions.map((n) => n.id));
  const order = subjectOrder(activeFiliere);
  const pick = firstOfParcours(order, builtIds, activeFiliere);
  if (!pick) return null;

  const meta = notions.find((n) => n.id === `${pick.subject}/${pick.slug}`);
  if (!meta) return null;

  return (
    <section aria-label="Quoi étudier ensuite" className="max-w-list">
      <p
        data-reco-source="parcours"
        className="text-body-sm text-[var(--color-text-secondary)]"
      >
        {frenchTypography("Ensuite dans le parcours :")}{" "}
        <Link
          href={notionHref(pick.subject, pick.slug)}
          className={cn(
            "font-medium text-[var(--color-text-primary)]",
            "underline decoration-[var(--color-border-soft)] underline-offset-2",
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
