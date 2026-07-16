/**
 * lib/events/payload.ts — pure payload builders for the attempt-event wire.
 *
 * The ONE place the client computes what an answer event says. Both answer
 * components (McqItem, CheckpointItem) and the exercise reveal build their
 * `AnswerEventPayload` here, so the semantics below can never fork between
 * call sites. Pure module: no React, no fetch, no env — unit-tested by
 * `scripts/test-attempt-events.mjs` (jiti-loaded, like learner-model).
 *
 * Locked contract decisions (docs/pipeline/tutor-first-plan.md, Lane E):
 *
 * 1. `item_misconceptions` = the set of non-null `misconception` values on
 *    the item's own choices — EXACTLY the definition
 *    `scripts/build-learner-inputs.mjs` uses to generate the edge
 *    function's `item-misconceptions.json` (`primary_misconception` is NOT
 *    consulted; untagged items — e.g. SVT today — yield `[]`, which simply
 *    means the clearing check has no candidates). Sorted for determinism,
 *    same as the generator.
 *
 * 2. `choice_index` = 0-based index of the chosen choice in the AUTHORED
 *    choices array (items.yaml order), independent of the display shuffle
 *    (`lib/shuffle.ts` reorders a copy; `item.choices` stays authored). The
 *    file is the source of truth; the rendered order is derivable from the
 *    deterministic shuffle when ever needed. NULL for `exercise_reveal`
 *    (draft-048 column comment).
 *
 * 3. `exercise_reveal` events: `item_id` = `"<exercise_id>:<question_id>"`
 *    (e.g. `r-bac:q3`) — unambiguous within the notion, fits the ≤200-char
 *    validator; the fold and read layer treat reveals by `kind`, never by
 *    id shape. All of `choice_index` / `is_correct` / `misconception_id`
 *    are null; `item_misconceptions` is `[]`.
 *
 * HONEST-STATE: if the chosen id cannot be found in the authored choices
 * (should be impossible — the shuffle only reorders), the builder returns
 * `null` and the caller emits nothing, rather than fabricating an index.
 */

import type { AnswerEventPayload } from "./emitter";

/** The minimal authored-choice shape the builders need (structural subset
 *  of `NotionChoice` in lib/content.ts — kept structural so this module
 *  stays dependency-free and jiti-loadable in isolation). */
export interface AuthoredChoice {
  id: string;
  correct?: boolean;
  misconception?: string | null;
}

/**
 * An item's target misconceptions — the client-side twin of
 * `build-learner-inputs.mjs`'s `targetsFromItems`: non-null, non-empty
 * `misconception` strings on the choices, deduplicated, sorted.
 */
export function itemTargets(
  choices: readonly AuthoredChoice[] | undefined | null
): string[] {
  const out = new Set<string>();
  for (const choice of choices ?? []) {
    const m = choice?.misconception;
    if (typeof m === "string" && m.length > 0) out.add(m);
  }
  return [...out].sort();
}

export interface AnswerArgs {
  /** `"<subject>/<slug>"` — the learner-model-data.json key format. */
  notionId: string;
  itemId: string;
  kind: "item" | "checkpoint";
  /** The AUTHORED choices array (items.yaml order — NOT the shuffled copy). */
  authoredChoices: readonly AuthoredChoice[] | undefined | null;
  /** The id of the choice the student committed to. */
  chosenChoiceId: string;
  /** 0-based active chapter at the moment of the answer (null if unknown). */
  chapterIndex: number | null;
}

/**
 * Builds the wire payload for an item/checkpoint answer, or `null` when the
 * chosen id is not in the authored array (emit nothing — never fabricate).
 */
export function answerPayload(args: AnswerArgs): AnswerEventPayload | null {
  const authored = args.authoredChoices ?? [];
  const index = authored.findIndex((c) => c.id === args.chosenChoiceId);
  if (index === -1) return null;
  const chosen = authored[index];
  const misconception =
    typeof chosen.misconception === "string" && chosen.misconception.length > 0
      ? chosen.misconception
      : null;
  return {
    notion_id: args.notionId,
    item_id: args.itemId,
    kind: args.kind,
    choice_index: index,
    is_correct: chosen.correct === true,
    misconception_id: misconception,
    chapter_index: args.chapterIndex,
    item_misconceptions: itemTargets(authored),
  };
}

export interface RevealArgs {
  notionId: string;
  exerciseId: string;
  questionId: string;
  chapterIndex: number | null;
}

/** Builds the wire payload for one exercise-question reveal commit. */
export function exerciseRevealPayload(args: RevealArgs): AnswerEventPayload {
  return {
    notion_id: args.notionId,
    item_id: `${args.exerciseId}:${args.questionId}`,
    kind: "exercise_reveal",
    choice_index: null,
    is_correct: null,
    misconception_id: null,
    chapter_index: args.chapterIndex,
    item_misconceptions: [],
  };
}
