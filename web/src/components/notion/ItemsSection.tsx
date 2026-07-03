/**
 * ItemsSection
 *
 * Renders the full set of MCQ items for a notion.
 *
 * Clone filtering (#9 fix):
 * Items whose id appears as a checkpoint clone are EXCLUDED from the end bank
 * so the student never meets the identical question twice. Clone detection reads
 * the `item_source` field on checkpoint items: any item carrying
 * `item_source: clone_of_<id>` causes the referenced <id> to be dropped from
 * the end-bank render. This is a render-layer filter — it does not modify
 * the YAML source data.
 *
 * The clone ids are passed in as `checkpointCloneIds` — a Set<string> of
 * end-bank item ids that are cloned as checkpoints — built by the page.
 *
 * DESIGN-BIBLE §7: one primary thing per screen; the item list is the practice
 * layer — calm, no theater.
 */

import type { NotionItems, CheckpointItem } from "@/lib/content";
import { McqItem } from "./McqItem";
import { cn } from "@/lib/utils";

interface ItemsSectionProps {
  itemsData: NotionItems;
  /**
   * Set of end-bank item ids that are already surfaced inline as checkpoints
   * (clone_of_<id>). These are filtered out of the end-bank to prevent
   * the student seeing the identical question twice.
   */
  checkpointCloneIds?: Set<string>;
}

export function ItemsSection({ itemsData, checkpointCloneIds }: ItemsSectionProps) {
  const allItems = itemsData.items ?? [];

  // Filter out any item whose id is in the checkpointCloneIds set
  const items = checkpointCloneIds && checkpointCloneIds.size > 0
    ? allItems.filter((item) => !checkpointCloneIds.has(item.id))
    : allItems;

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl",
          "border border-dashed border-[var(--color-border-subtle)]",
          "px-8 py-10 text-center",
          // #1: informational text at 14px — promoted to secondary
          "text-body-sm text-[var(--color-text-secondary)]"
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
          className="font-serif text-h2 font-bold text-[var(--color-text-primary)]"
        >
          Exercices
        </h2>
        {/* Running text: measure-capped (July-2026 audit F2 sweep). */}
        <p className="mt-2 text-body text-[var(--color-text-secondary)] max-w-[var(--measure-wide)]">
          {items.length} question{items.length > 1 ? "s" : ""} — réponds
          directement, le résultat s’affiche immédiatement.
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

// ── Helper: build clone id set from checkpoints ───────────────────────────────
/**
 * Given the checkpoints map (keyed by id), returns the Set of end-bank item
 * ids that are clones — i.e., items with `item_source: clone_of_<id>`.
 *
 * Example: a checkpoint with `item_source: "clone_of_RLC-M1-1"` causes
 * "RLC-M1-1" to be added to the set.
 *
 * This function is exported so the page component can call it without
 * duplicating the parsing logic.
 */
export function buildCheckpointCloneIds(
  checkpoints: Record<string, CheckpointItem>
): Set<string> {
  const cloneIds = new Set<string>();
  for (const cp of Object.values(checkpoints)) {
    // `item_source` is a string like "clone_of_RLC-M1-1" or "new"
    // It's a free field in the YAML; TypeScript sees it as unknown via
    // the CheckpointItem (= NotionItem) type. We access it safely.
    const itemSource = (cp as unknown as Record<string, unknown>)["item_source"];
    if (typeof itemSource === "string" && itemSource.startsWith("clone_of_")) {
      const originalId = itemSource.slice("clone_of_".length);
      cloneIds.add(originalId);
    }
  }
  return cloneIds;
}
