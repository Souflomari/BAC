/**
 * ChapterQuestions
 *
 * Renders a single chapter's diagnostic MCQ items INLINE, at the end of that
 * chapter's section — the "vérifie ta compréhension" beat that closes a
 * chapter's teaching before the student advances (LESSON-EXPERIENCE-SPEC §1.1,
 * inline-items amendment). Replaces the former single end-of-lesson
 * "S'entraîner" bank: every item now lives with the chapter it belongs to,
 * keyed by its `rung`.
 *
 * DESIGN-BIBLE:
 * - §0 cœur calme / §7 une-idée-par-écran: this is the chapter's quiet
 *   practice coda, not engagement theater — no score, no streak, no progress.
 *   The shared McqItem carries the calm per-choice feedback (one source of
 *   truth across the inline block and the legacy end bank).
 * - §11 codes rungs jamais visibles: the block is filtered BY rung upstream,
 *   but the rung code (R3…) is NEVER shown — the heading is generic.
 * - Français d'abord: the heading and count line are French; McqItem's own
 *   aria-labels are hand-written French.
 *
 * Server component: renders the client McqItem children; holds no state itself.
 */

import type { NotionItem } from "@/lib/content";
import { McqItem } from "./McqItem";

interface ChapterQuestionsProps {
  /** This chapter's items, already filtered by rung, in authored order. */
  items: NotionItem[];
}

export function ChapterQuestions({ items }: ChapterQuestionsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Questions de compréhension du chapitre"
      className="mt-14 notion-wide-band"
    >
      {/* Quiet heading — subordinate to the chapter's own h2 (§7). No rung
          code ever surfaces here (§11): the block is generic. */}
      <div className="notion-prose mb-6">
        <h3 className="font-display text-h3 font-semibold text-primary">
          Vérifie ta compréhension
        </h3>
        <p className="mt-2 text-body-sm text-secondary">
          {items.length} question{items.length > 1 ? "s" : ""} — réponds
          directement, le résultat s’affiche aussitôt.
        </p>
      </div>

      <ol
        role="list"
        className="space-y-5"
        aria-label="Questions de ce chapitre"
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
