/**
 * ItemsSection
 *
 * Renders the full set of MCQ items for a notion.
 *
 * Groups items by rung (R0–R6) if rung metadata is present; otherwise renders
 * flat. Each item is an independent McqItem — state is isolated per card so
 * answering one doesn't affect another.
 *
 * DESIGN-BIBLE §7: one primary thing per screen; the item list is the practice
 * layer — calm, no theater.
 */

import type { NotionItems } from "@/lib/content";
import { McqItem } from "./McqItem";
import { cn } from "@/lib/utils";

interface ItemsSectionProps {
  itemsData: NotionItems;
}

export function ItemsSection({ itemsData }: ItemsSectionProps) {
  const items = itemsData.items ?? [];

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl",
          "border border-dashed border-[var(--color-border-subtle)]",
          "px-8 py-10 text-center",
          "text-body-sm text-[var(--color-text-tertiary)]"
        )}
      >
        Aucun exercice disponible pour cette notion.
      </div>
    );
  }

  return (
    <section aria-labelledby="items-heading" className="mt-16">
      {/* Section heading */}
      <div className="mb-8">
        <h2
          id="items-heading"
          className="text-h2 font-semibold text-[var(--color-text-primary)]"
          style={{ letterSpacing: "-0.015em" }}
        >
          Exercices
        </h2>
        <p className="mt-2 text-body text-[var(--color-text-secondary)]">
          {items.length} question{items.length > 1 ? "s" : ""} — réponds
          directement, le résultat s&apos;affiche immédiatement.
        </p>
      </div>

      {/* Item list */}
      <ol
        role="list"
        className="space-y-5"
        aria-label="Liste des exercices"
      >
        {items.map((item, i) => (
          <li key={item.id}>
            <McqItem item={item} index={i + 1} />
          </li>
        ))}
      </ol>
    </section>
  );
}
