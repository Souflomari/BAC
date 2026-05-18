// Deno unit tests for the misconception classifier.
//
// Run from repo root:
//   deno test backend/supabase/functions/_shared/misconception_event_test.ts
//
// Convention parallels _shared/srs_test.ts (the SRS algorithm's unit
// tests). See ADR 0013 §"Assurance mechanism" for the full test pyramid:
// these unit tests cover the pure decision; the integration smoke test
// in scripts/edge-function-smoke-test.ps1 covers the DB/RLS/auth wiring.

import {
  assert,
  assertEquals,
} from 'https://deno.land/std@0.177.0/testing/asserts.ts';

import {
  classifyMisconceptionEvent,
  type ItemInput,
  type SkillInput,
} from './misconception_event.ts';

// ----------------------------------------------------------------------------
// Test fixtures — modelled after migration 045/046's real data shape.
// ----------------------------------------------------------------------------

const SMA_LIMIT_CALC_UUID = '33333333-aaaa-0000-0000-000000000002';
const M1_ID = 'mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle';
const M3_ID = 'mc.math.sma_limit_calc.infini-moins-infini-nul';

const sampleItem: ItemInput = {
  id: '44444444-aaaa-0001-0000-000000000001',
  skill_id: SMA_LIMIT_CALC_UUID,
  item_type: 'mcq',
  distractor_misconceptions: {
    '1': M1_ID,
    '2': M1_ID,
  },
};

const sampleSkill: SkillInput = {
  id: SMA_LIMIT_CALC_UUID,
  common_misconceptions: [
    { id: M1_ID, label: 'M1' },
    { id: M3_ID, label: 'M3' },
  ],
};

// ============================================================
// Happy path — wrong answer on a tagged distractor
// ============================================================

Deno.test('event: chosen distractor 1 → M1 fires', () => {
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'event');
  if (r.kind === 'event') {
    assertEquals(r.skill_id, SMA_LIMIT_CALC_UUID);
    assertEquals(r.misconception_id, M1_ID);
  }
});

Deno.test('event: chosen distractor 2 → also M1 (dual-tagged distractors)', () => {
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: 2,
    is_correct: false,
  });
  assertEquals(r.kind, 'event');
  if (r.kind === 'event') {
    assertEquals(r.misconception_id, M1_ID);
  }
});

Deno.test('event: user_answer as string "1" — accepted (wire format tolerance)', () => {
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: '1',
    is_correct: false,
  });
  assertEquals(r.kind, 'event');
});

// ============================================================
// no_event — skip cases. The function must not write.
// ============================================================

Deno.test('no_event: correct answer on a tagged item (v1 resolution deferred)', () => {
  // Even though the chosen index 1 has a tagged misconception in the
  // map, the answer being correct skips the write. ADR 0013 §A.2.
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: 1,
    is_correct: true,
  });
  assertEquals(r.kind, 'no_event');
});

Deno.test('no_event: chosen distractor has no mapping (e.g. choice 3)', () => {
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: 3,
    is_correct: false,
  });
  assertEquals(r.kind, 'no_event');
});

Deno.test('no_event: chosen index 0 (the correct slot, no tag in dm)', () => {
  // Index 0 has no entry in distractor_misconceptions; classifier short-
  // circuits at the candidate lookup.
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: 0,
    is_correct: false, // pretend it's wrong for test purposes
  });
  assertEquals(r.kind, 'no_event');
});

Deno.test('no_event: non-MCQ item', () => {
  const numericItem: ItemInput = {
    ...sampleItem,
    item_type: 'numeric',
  };
  const r = classifyMisconceptionEvent({
    item: numericItem,
    skill: sampleSkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'no_event');
});

Deno.test('no_event: distractor_misconceptions is null', () => {
  const untaggedItem: ItemInput = {
    ...sampleItem,
    distractor_misconceptions: null,
  };
  const r = classifyMisconceptionEvent({
    item: untaggedItem,
    skill: sampleSkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'no_event');
});

Deno.test('no_event: distractor_misconceptions is {} (default)', () => {
  const untaggedItem: ItemInput = {
    ...sampleItem,
    distractor_misconceptions: {},
  };
  const r = classifyMisconceptionEvent({
    item: untaggedItem,
    skill: sampleSkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'no_event');
});

Deno.test('no_event: user_answer out of range (5)', () => {
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: 5,
    is_correct: false,
  });
  assertEquals(r.kind, 'no_event');
});

Deno.test('no_event: user_answer not a number (object)', () => {
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: sampleSkill,
    user_answer: { value: 'x' },
    is_correct: false,
  });
  assertEquals(r.kind, 'no_event');
});

// ============================================================
// phantom_tag — the load-bearing safety check
// ============================================================

Deno.test('phantom_tag: candidate id not in skill.common_misconceptions', () => {
  // The item maps choice 1 to M1, but the skill's common_misconceptions
  // array contains a DIFFERENT misconception_id. This is the typo /
  // stale-tag scenario the application-layer guard exists to catch.
  const driftedSkill: SkillInput = {
    id: SMA_LIMIT_CALC_UUID,
    common_misconceptions: [
      { id: 'mc.math.sma_limit_calc.totally-different-id' },
    ],
  };
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: driftedSkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'phantom_tag');
  if (r.kind === 'phantom_tag') {
    assertEquals(r.log.event, 'misconception_tag_phantom');
    assertEquals(r.log.candidate_misconception_id, M1_ID);
    assertEquals(r.log.item_id, sampleItem.id);
    assertEquals(r.log.skill_id, sampleItem.skill_id);
    assertEquals(r.log.chosen_choice_index, 1);
    // No user_id leaked into the log payload (bac-curriculum: PII-free).
    assert(
      !Object.prototype.hasOwnProperty.call(r.log, 'user_id'),
      'log payload must not contain user_id (PII)',
    );
  }
});

Deno.test('phantom_tag: skill.common_misconceptions is empty', () => {
  const emptySkill: SkillInput = {
    id: SMA_LIMIT_CALC_UUID,
    common_misconceptions: [],
  };
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: emptySkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'phantom_tag');
});

Deno.test('phantom_tag: skill.common_misconceptions is null', () => {
  const nullCmSkill: SkillInput = {
    id: SMA_LIMIT_CALC_UUID,
    common_misconceptions: null,
  };
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: nullCmSkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'phantom_tag');
});

// ============================================================
// skill_mismatch — corruption / orphan
// ============================================================

Deno.test('skill_mismatch: fetched skill row is null', () => {
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: null,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'skill_mismatch');
  if (r.kind === 'skill_mismatch') {
    assertEquals(r.log.event, 'misconception_skill_mismatch');
    assertEquals(r.log.item_skill_id, sampleItem.skill_id);
    assertEquals(r.log.fetched_skill_id, '(null)');
  }
});

Deno.test('skill_mismatch: skill.id != item.skill_id', () => {
  const wrongSkill: SkillInput = {
    id: '33333333-0000-0000-0000-000000000007', // unprefixed limit_calc
    common_misconceptions: [{ id: M1_ID }],
  };
  const r = classifyMisconceptionEvent({
    item: sampleItem, // skill_id is SMA's UUID
    skill: wrongSkill,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'skill_mismatch');
});

// ============================================================
// deprecated — forward-compat (no current data triggers this)
// ============================================================

Deno.test('deprecated: misconception entry has non-null deprecated_at', () => {
  const skillWithDeprecation: SkillInput = {
    id: SMA_LIMIT_CALC_UUID,
    common_misconceptions: [
      { id: M1_ID, deprecated_at: '2026-12-01T00:00:00Z' },
    ],
  };
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: skillWithDeprecation,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'deprecated');
  if (r.kind === 'deprecated') {
    assertEquals(r.log.event, 'misconception_tag_deprecated');
  }
});

Deno.test('deprecated: deprecated_at = null is treated as ACTIVE (event fires)', () => {
  // The forward-compat guard checks for non-null deprecated_at. An
  // explicit null must NOT block the write — it indicates the field
  // is present but unset.
  const skillWithExplicitNull: SkillInput = {
    id: SMA_LIMIT_CALC_UUID,
    common_misconceptions: [
      { id: M1_ID, deprecated_at: null },
    ],
  };
  const r = classifyMisconceptionEvent({
    item: sampleItem,
    skill: skillWithExplicitNull,
    user_answer: 1,
    is_correct: false,
  });
  assertEquals(r.kind, 'event');
});
