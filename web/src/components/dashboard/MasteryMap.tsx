/**
 * MasteryMap — « Carte de maîtrise » (DASHBOARD-SPEC §1.3 / LEARNER-MODEL-SPEC
 * §4). Per-notion tokens, one per real notion. Zero-state (this session,
 * `getStudentState()` returns `null`): EVERY token is `non-ouvert`, rendered
 * as a calm TABLE OF CONTENTS grouped by subject — headings + quiet links,
 * no grey deficit chips, no invented state label. `non-ouvert` is the
 * DEFAULT state (DASHBOARD-SPEC §5): it is not printed as a status word and
 * carries no `data-state-source` — only a non-default state (entamé, lu,
 * exercé, à revoir) would earn a visible label + its `data-state-source`
 * anchor, once `state.perNotion[n.id]` is ever non-null.
 *
 * Token count is exactly `notions.length` (DASHBOARD-SPEC §5's dom-truth
 * invariant) — every notion in the prop list renders exactly one
 * `[data-mastery-token]`, once, in its subject group.
 */

import Link from "next/link";
import { getStudentState } from "@/lib/student-state";
import { subjectLabel, notionHref } from "@/lib/subjects";
import { cn } from "@/lib/utils";
import type { NotionMeta } from "@/lib/content";

const SUBJECT_ORDER = ["maths", "pc", "svt", "philo", "si"];

export function MasteryMap({ notions }: { notions: NotionMeta[] }) {
  // Consumed through the contract (DASHBOARD-SPEC §2): null until
  // persistence lands (AUTH-SPEC §4 gate). See the per-token lookup below —
  // that is where a future non-default état + data-state-source attaches.
  const state = getStudentState();

  const bySubject = new Map<string, NotionMeta[]>();
  for (const n of notions) {
    const list = bySubject.get(n.subject) ?? [];
    list.push(n);
    bySubject.set(n.subject, list);
  }
  const subjects = SUBJECT_ORDER.filter((id) => bySubject.has(id));

  return (
    <section aria-label="Carte de maîtrise">
      <h2 className="mb-2 pb-3 border-b border-[var(--color-border-subtle)] text-h4 font-semibold text-[var(--color-text-primary)]">
        Carte de maîtrise
      </h2>
      <p className="mt-2 mb-6 text-caption text-[var(--color-text-secondary)]">
        Le sommaire des notions déjà écrites, matière par matière.
      </p>

      <div className="space-y-6">
        {subjects.map((subjectId) => {
          const list = bySubject.get(subjectId)!;
          return (
            <div key={subjectId}>
              <h3 className="mb-2 text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                {subjectLabel(subjectId)}
              </h3>
              <ul role="list" className="space-y-0.5">
                {list.map((n) => {
                  // Always undefined this session (state is null) — the
                  // lookup exists so a future non-null state attaches its
                  // data-state-source here without restructuring the token.
                  const perNotion = state?.perNotion[n.id];
                  return (
                    <li key={n.id}>
                      <Link
                        href={notionHref(n.subject, n.slug)}
                        data-mastery-token=""
                        data-state-source={perNotion ? n.id : undefined}
                        className={cn(
                          "group block rounded-md px-2 py-1.5 -mx-2",
                          "state-layer focus-ring [--focus-radius:6px]",
                          "text-body-sm text-[var(--color-text-secondary)]",
                          "transition-colors duration-micro ease-between"
                        )}
                      >
                        <span className="group-hover:text-accent transition-colors duration-micro">
                          {n.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
