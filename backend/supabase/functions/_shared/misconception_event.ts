// ============================================================
// Pure classification logic for the submit-answer misconception path.
//
// Given an item + the user's MCQ choice + the parent skill's
// common_misconceptions array, decide whether to:
//   - write a misconception exhibition event,
//   - skip (no mapping / non-MCQ / correct answer),
//   - or log a phantom-tag warning (mapped misconception_id does
//     NOT exist in the skill's common_misconceptions — typo'd or
//     stale tag).
//
// The submit-answer edge function uses this to keep its DB-touching
// code linear and the decision logic unit-testable. There is NO
// network or DB call from this module — pure data → decision.
//
// References:
//   ADR 0007 (schema), ADR 0011 (FK round-trip), ADR 0013 (this
//   function's contract).
// ============================================================

/** Misconception entry shape inside skills.common_misconceptions[]. */
export interface MisconceptionEntry {
  id: string;
  label?: string;
  description?: string;
  contradicts_principle?: string;
  // Forward field — ADR 0011 §"Deprecation rule". Not in the schema yet,
  // but the classifier already honours it so the future migration that
  // adds it gets the runtime guard for free.
  deprecated_at?: string | null;
  // Other fields (distinguishing_mcq_stem, label_ar) are not used here.
  [key: string]: unknown;
}

/** Subset of the item row this classifier needs. */
export interface ItemInput {
  id: string;
  skill_id: string;
  item_type: string;
  /** Mapping from choice-index-as-string ('0'..'3') to misconception ID. */
  distractor_misconceptions: Record<string, string> | null | undefined;
}

/** Subset of the skill row this classifier needs. */
export interface SkillInput {
  id: string;
  common_misconceptions: MisconceptionEntry[] | null | undefined;
}

/** Classification outcome. The caller decides what to do with each kind. */
export type Outcome =
  /** Non-MCQ item, no chosen-distractor mapping, correct answer, or any
   *  benign "nothing to do" branch. The caller writes nothing. */
  | { kind: 'no_event' }
  /** A misconception fired and the candidate ID validates against the
   *  parent skill. The caller writes user_misconception_states using
   *  the returned (skill_id, misconception_id) tuple. */
  | { kind: 'event'; skill_id: string; misconception_id: string }
  /** The candidate misconception_id from items.distractor_misconceptions
   *  is NOT present in the parent skill's common_misconceptions[]. This
   *  is a phantom tag — stale, typo'd, or pointing at the wrong skill.
   *  The caller LOGS this with the included payload and writes nothing. */
  | {
      kind: 'phantom_tag';
      log: {
        event: 'misconception_tag_phantom';
        item_id: string;
        skill_id: string;
        candidate_misconception_id: string;
        chosen_choice_index: number;
      };
    }
  /** Misconception exists but is marked deprecated. The caller LOGS
   *  with the included payload and writes nothing. ADR 0013 §"Deprecation
   *  rule" forward note — the field doesn't exist on entries yet (no
   *  migration has added it), so this branch is unreachable in v1 but
   *  ready for the future migration. */
  | {
      kind: 'deprecated';
      log: {
        event: 'misconception_tag_deprecated';
        item_id: string;
        skill_id: string;
        candidate_misconception_id: string;
        chosen_choice_index: number;
      };
    }
  /** The item's skill_id resolves to a different skill row than the one
   *  the caller fetched. Indicates a corrupt fetch or an orphaned item.
   *  Caller LOGS and writes nothing. */
  | {
      kind: 'skill_mismatch';
      log: {
        event: 'misconception_skill_mismatch';
        item_id: string;
        item_skill_id: string;
        fetched_skill_id: string;
        candidate_misconception_id: string;
      };
    };

/**
 * Decide whether the user's MCQ answer surfaces a misconception that
 * should be recorded as an exhibition event.
 *
 * Inputs are PURE — fetched by the caller before invocation. The function
 * does no I/O. ADR 0013 §"Validation": the existence-check against
 * `skill.common_misconceptions[].id` is the only structural guard
 * between `items.distractor_misconceptions` (which has no FK) and the
 * `user_misconception_states.misconception_id` column (also no FK).
 *
 * Returns one of:
 *   { kind: 'no_event' }                      — caller writes nothing
 *   { kind: 'event', skill_id, misconception_id } — caller writes
 *   { kind: 'phantom_tag', log }              — caller logs (no write)
 *   { kind: 'deprecated', log }               — caller logs (no write)
 *   { kind: 'skill_mismatch', log }           — caller logs (no write)
 */
export function classifyMisconceptionEvent(args: {
  item: ItemInput;
  skill: SkillInput | null | undefined;
  /** The user's submitted answer. For MCQ this is the chosen choice
   *  index. Accepts number or string (the wire format from
   *  the edge function's request body is unknown). */
  user_answer: unknown;
  /** Whether the answer was correct. If true, we never write a
   *  misconception event in v1 (resolution path deferred per ADR 0013). */
  is_correct: boolean;
}): Outcome {
  const { item, skill, user_answer, is_correct } = args;

  // Non-MCQ items don't have distractor-keyed misconceptions.
  if (item.item_type !== 'mcq') return { kind: 'no_event' };

  // v1 resolution path: skip on correct answers. ADR 0013 §A.2.
  if (is_correct) return { kind: 'no_event' };

  // Normalise the chosen-choice index. Wire format may be number or
  // string (PostgREST's JSONB readback can return either).
  const idx = toChoiceIndex(user_answer);
  if (idx === null) return { kind: 'no_event' };

  // Look up the misconception tag for this distractor slot. The key in
  // items.distractor_misconceptions is the 0-based index as a string
  // (per migration 046's convention).
  const dm = item.distractor_misconceptions ?? {};
  const candidate = dm[String(idx)];
  if (!candidate) return { kind: 'no_event' };

  // bac-curriculum (ADR 0013 §"Existence read"): assert skill row was
  // fetched. A null skill is a separate structural error from
  // "misconception not found" — log it as skill_mismatch (orphaned item).
  if (!skill || skill.id !== item.skill_id) {
    return {
      kind: 'skill_mismatch',
      log: {
        event: 'misconception_skill_mismatch',
        item_id: item.id,
        item_skill_id: item.skill_id,
        fetched_skill_id: skill?.id ?? '(null)',
        candidate_misconception_id: candidate,
      },
    };
  }

  // The canonical existence read: scan skill.common_misconceptions for
  // an entry whose id equals the candidate. ADR 0007 §A — the misconception
  // registry lives entirely in this JSONB; no separate table.
  const entries = skill.common_misconceptions ?? [];
  const entry = entries.find((mc) => mc?.id === candidate);

  if (!entry) {
    return {
      kind: 'phantom_tag',
      log: {
        event: 'misconception_tag_phantom',
        item_id: item.id,
        skill_id: item.skill_id,
        candidate_misconception_id: candidate,
        chosen_choice_index: idx,
      },
    };
  }

  // ADR 0013 §"Deprecation rule": when (future) deprecated_at is set,
  // skip the write and log a warning. The field does not exist on
  // current entries — branch unreachable in v1, kept for forward-compat.
  if (entry.deprecated_at !== undefined && entry.deprecated_at !== null) {
    return {
      kind: 'deprecated',
      log: {
        event: 'misconception_tag_deprecated',
        item_id: item.id,
        skill_id: item.skill_id,
        candidate_misconception_id: candidate,
        chosen_choice_index: idx,
      },
    };
  }

  return {
    kind: 'event',
    skill_id: item.skill_id, // proven == skill.id by the guard above
    misconception_id: candidate,
  };
}

// Helpers
// ----------------------------------------------------------------------------

function toChoiceIndex(answer: unknown): number | null {
  if (typeof answer === 'number') {
    return Number.isInteger(answer) && answer >= 0 && answer <= 3 ? answer : null;
  }
  if (typeof answer === 'string') {
    // The wire format may serialise 0..3 as a JSON number that arrives
    // here as the string "0".."3" depending on the client.
    const n = Number(answer);
    return Number.isInteger(n) && n >= 0 && n <= 3 ? n : null;
  }
  return null;
}
