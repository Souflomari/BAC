/**
 * ExerciseBank — the body of the trailing « S'entraîner » chapter (BANK-SPEC
 * §1/§3). Renders the honest count, a calm framing line, then the stacked
 * bank cards. An empty bank renders the honest empty state (§1) — never a
 * fabricated "coming soon" that implies work already done.
 *
 * SERVER component: it only lays out the heading + maps entries to BankCard
 * (the client card owns collapse + the live fait-state read).
 *
 * DESIGN-BIBLE §0/§7: calm core, one idea per screen. No scores, no timers,
 * no completion %. The count is a fact, not a progress meter.
 */

import { cn } from "@/lib/utils";
import type { NotionBank } from "@/lib/content";
import { BankCard } from "./BankCard";

/** « N sujets » — the honest count (BANK-SPEC §1). Singular-safe. */
export function bankCountLabel(n: number): string {
  return `${n} sujet${n > 1 ? "s" : ""}`;
}

export function ExerciseBank({ bank }: { bank: NotionBank }) {
  const entries = bank.entries;
  const count = entries.length;

  return (
    <div data-exercise-bank>
      <div className="notion-prose">
        <h2 className="font-serif text-h2 font-semibold text-[var(--color-text-primary)]">
          S’entraîner
        </h2>
        {count > 0 ? (
          <p className="mt-2 text-body text-[var(--color-text-secondary)]">
            <span data-bank-count className="font-medium text-[var(--color-text-primary)]">
              {bankCountLabel(count)}
            </span>{" "}
            du bac national à faire à la manière de l’examen — cherche d’abord sur
            papier, puis compare au raisonnement expert.
          </p>
        ) : (
          // Honest empty state (BANK-SPEC §1) — no census count is asserted here
          // (the second half of the spec sentence is omitted until a census
          // exists), so nothing implies work already done.
          <p className="mt-2 text-body text-[var(--color-text-secondary)]">
            La banque d’exercices de cette notion arrive — en cours de
            vérification.
          </p>
        )}
      </div>

      {count > 0 && (
        <div className="mt-8 flex flex-col gap-5">
          {entries.map((entry) => (
            <BankCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
