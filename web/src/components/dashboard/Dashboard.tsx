/**
 * Dashboard — the filière-aware subject grid (Day-9 site skeleton).
 *
 * The dashboard's spine: "your subjects" for the chosen stream. It NEVER
 * blocks behind a filière choice — with none set it shows the four science
 * subjects; with one set it shows exactly that stream's subjects in
 * coefficient order, with the coefficient chip. The choice narrows the view,
 * it doesn't gate it (useFiliere / ADR 0025 §2.11).
 *
 * Honest-state: counts are real (built vs total), no fabricated progress. All
 * subject DATA is server-computed and passed in (serializable); this client
 * layer only chooses which subjects to show and in what order.
 */

"use client";

import Link from "next/link";
import { getFiliere } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { SubjectCard, type SubjectSummary } from "./SubjectCard";

/** Subjects shown when no filière is chosen — the four science programs. */
const DEFAULT_ORDER = ["maths", "pc", "svt", "philo"];

export function Dashboard({ subjects }: { subjects: SubjectSummary[] }) {
  const { filiere, mounted } = useFiliere();
  const byId = new Map(subjects.map((s) => [s.id, s]));
  const f = getFiliere(filiere);

  let shown: SubjectSummary[];
  if (f) {
    shown = f.subjects.reduce<SubjectSummary[]>((acc, fs) => {
      const base = byId.get(fs.id);
      if (base) acc.push({ ...base, coefficient: fs.coefficient });
      return acc;
    }, []);
  } else {
    shown = DEFAULT_ORDER.reduce<SubjectSummary[]>((acc, id) => {
      const base = byId.get(id);
      if (base) acc.push(base);
      return acc;
    }, []);
  }

  return (
    <section aria-label="Tes matières" className="mt-16">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-subtle pb-3">
        <div>
          <h2 className="text-h4 font-semibold text-primary">
            {f ? "Tes matières" : "Les matières"}
          </h2>
          <p className="mt-0.5 text-caption text-secondary">
            {/* mounted-gated so the neutral server text and the client text
                agree on first paint (no hydration flash). */}
            {mounted && f
              ? `Programme ${f.name} · ${f.short}`
              : "Tout le programme des sciences — 2ᵉ Bac"}
          </p>
        </div>
        <Link
          href="/commencer"
          className={cn(
            "text-body-sm font-medium text-secondary hover:text-primary",
            "state-layer rounded px-2 py-1 -mx-2 focus-ring [--focus-radius:8px]",
            "transition-colors duration-micro ease-enter"
          )}
        >
          {mounted && f ? "Changer de filière" : "Choisis ta filière"}
        </Link>
      </div>

      {mounted && !f && (
        <p className="mb-6 flex items-center gap-2 rounded-lg border border-subtle bg-surface-raised px-4 py-3 text-body-sm text-secondary">
          <Icon name="arrow-right" size={14} className="flex-shrink-0 text-accent" />
          <span>
            Choisis ta filière pour voir ton programme et tes coefficients.
          </span>
        </p>
      )}

      <ul role="list" className="grid gap-4 bp-medium:grid-cols-2 bp-large:grid-cols-3 bp-xl:grid-cols-4">
        {shown.map((s) => (
          <li key={s.id} className="flex">
            <SubjectCard subject={s} />
          </li>
        ))}
      </ul>
    </section>
  );
}
