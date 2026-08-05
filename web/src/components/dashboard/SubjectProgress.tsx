/**
 * SubjectProgress — « Progrès par matière » (DASHBOARD-SPEC §1.5). One line
 * per subject: a real lesson count and real cumulative reading minutes —
 * "N leçons · ~H h de lecture". A COUNT, never a score: no percentage, no
 * "0 %", nothing computed from a denominator that would fabricate a sense of
 * completion (DASHBOARD-SPEC §3/§5's forbidden-word guard).
 *
 * Facts only, straight from `listNotions()`'s real `readingMinutes` sums —
 * no StudentState involved (there is no per-student reading time to report
 * yet; this is programme-level, not personal).
 *
 * Filière narrowing (ADR 0025 §2.11 golden rule): the device's chosen
 * filière (useFiliere) narrows the counts to notions in that filière (e.g.
 * the two SM-only "Approfondissement" chapters don't count for a PC/SVT
 * student) — never gates: no filière chosen counts every built notion, same
 * as before this existed. `mounted` gates the narrowing so server and first
 * client paint agree — hence the "use client" this component now needs.
 */

"use client";

import { subjectLabel } from "@/lib/subjects";
import { isNotionInFiliere } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import type { NotionMeta } from "@/lib/content";

const SUBJECT_ORDER = ["maths", "pc", "svt", "philo", "si"];

/** Nearest half-hour, dropping the decimal when it lands on a whole hour —
 *  honest precision (not false rigor: reading time is an estimate). */
function formatHours(totalMinutes: number): string {
  const rounded = Math.round((totalMinutes / 60) * 2) / 2;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function SubjectProgress({ notions }: { notions: NotionMeta[] }) {
  const { filiere, mounted } = useFiliere();
  const activeFiliere = mounted ? filiere : null;
  const filieredNotions = notions.filter((n) => isNotionInFiliere(n.id, activeFiliere));

  const bySubject = new Map<string, NotionMeta[]>();
  for (const n of filieredNotions) {
    const list = bySubject.get(n.subject) ?? [];
    list.push(n);
    bySubject.set(n.subject, list);
  }
  const subjects = SUBJECT_ORDER.filter((id) => bySubject.has(id));
  if (subjects.length === 0) return null;

  return (
    <section aria-label="Progrès par matière">
      <h2 className="mb-2 pb-3 border-b border-subtle text-h4 font-semibold text-primary">
        Progrès par matière
      </h2>
      <ul role="list" className="mt-4 space-y-3">
        {subjects.map((subjectId) => {
          const list = bySubject.get(subjectId)!;
          const totalMinutes = list.reduce((sum, n) => sum + (n.readingMinutes ?? 0), 0);
          return (
            <li key={subjectId} className="text-body-sm">
              <span className="block font-medium text-primary">
                {subjectLabel(subjectId)}
              </span>
              <span className="block text-secondary tabular-nums">
                {list.length} leçon{list.length > 1 ? "s" : ""} · ~
                {formatHours(totalMinutes)}&nbsp;h de lecture
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
