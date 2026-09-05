/**
 * FiliereChooser — pick your stream (Day-9 onboarding).
 *
 * Four calm cards, one per science filière. Choosing sets the persisted
 * device preference (useFiliere) and, on the dedicated /commencer page,
 * returns to the dashboard. It NEVER gates the app — the dashboard works
 * without a choice; this only personalises it.
 *
 * `compact` renders the inline dashboard prompt version (a single row of
 * chips); the full version is the /commencer grid.
 */

"use client";

import { useRouter } from "next/navigation";
import { FILIERES, SUBJECTS, type FiliereId } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { subjectLabel } from "@/lib/subjects";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function FiliereChooser({ redirectOnPick = false }: { redirectOnPick?: boolean }) {
  const { filiere, setFiliere } = useFiliere();
  const router = useRouter();

  function pick(id: FiliereId) {
    setFiliere(id);
    if (redirectOnPick) router.push("/");
  }

  return (
    <ul role="list" className="grid gap-4 bp-medium:grid-cols-2">
      {FILIERES.map((f) => {
        const active = filiere === f.id;
        const subjectNames = f.subjects
          .map((s) => (SUBJECTS[s.id]?.label ? subjectLabel(s.id) : s.id))
          .join(" · ");
        return (
          <li key={f.id} className="min-w-0">
            {/* `min-w-0` : item de grille, sinon la piste ne descend pas sous la
                largeur min-content de la carte — 98 px de débord à 200 % de texte
                (SC 1.4.4), mesuré le 2026-09-05. Même geste que ProgrammeMap. */}
            <button
              type="button"
              onClick={() => pick(f.id)}
              aria-pressed={active}
              className={cn(
                "group w-full text-left rounded-xl px-6 py-5",
                "bg-surface-raised",
                "border transition-all duration-micro ease-out",
                "state-layer focus-ring [--focus-radius:16px]",
                active
                  ? "border-accent shadow-elevation-2"
                  : "border-subtle shadow-elevation-1 hover:shadow-elevation-2 hover:-translate-y-px"
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 break-words font-display text-h4 font-semibold text-primary group-hover:text-accent transition-colors duration-micro">
                  {f.name}
                </span>
                <span
                  className={cn(
                    "flex-shrink-0 rounded-full px-2.5 py-0.5 text-caption font-semibold tabular-nums",
                    active
                      ? "bg-accent text-on-accent"
                      : "bg-accent-subtle text-accent"
                  )}
                >
                  {f.short}
                </span>
              </div>
              <p className="mt-1.5 text-body-sm text-secondary">
                {f.blurb}
              </p>
              <p className="mt-3 text-caption text-secondary">
                {subjectNames}
              </p>
              {active && (
                <p className="mt-3 flex items-center gap-1.5 text-caption font-medium text-accent">
                  <Icon name="check" size={13} />
                  Ta filière
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
