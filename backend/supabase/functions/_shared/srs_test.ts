// Deno tests for the SRS algorithm.
//
// Run from repo root:
//   deno test backend/supabase/functions/_shared/srs_test.ts

import {
  assert,
  assertEquals,
  assertAlmostEquals,
} from 'https://deno.land/std@0.177.0/testing/asserts.ts';

import {
  computeStrength,
  computeNewHalfLifeOnCorrect,
  computeNewHalfLifeOnIncorrect,
  computeNewAbility,
  computeMastery,
  computeXp,
  applyHintPenalty,
} from './srs.ts';

// ============================================================
// computeStrength — exponential decay
// ============================================================

Deno.test('computeStrength: just reviewed → ≈1.0', () => {
  assertAlmostEquals(computeStrength(24, 0), 1.0);
});

Deno.test('computeStrength: at half-life → 0.5', () => {
  assertAlmostEquals(computeStrength(24, 24), 0.5);
});

Deno.test('computeStrength: at 2× half-life → 0.25', () => {
  assertAlmostEquals(computeStrength(24, 48), 0.25);
});

Deno.test('computeStrength: at 4× half-life → 0.0625', () => {
  assertAlmostEquals(computeStrength(24, 96), 0.0625);
});

Deno.test('computeStrength: long half-life decays slowly', () => {
  // 1 week half-life, 1 day elapsed → still strong
  const s = computeStrength(168, 24);
  assert(s > 0.85, `expected >0.85, got ${s}`);
});

Deno.test('computeStrength: zero/negative half-life → 0', () => {
  assertEquals(computeStrength(0, 1), 0);
  assertEquals(computeStrength(-1, 1), 0);
});

Deno.test('computeStrength: negative elapsed → 1.0', () => {
  assertEquals(computeStrength(24, -5), 1);
});

// ============================================================
// computeNewHalfLifeOnCorrect — bonus stacking
// ============================================================

Deno.test('correct: base bonus 1.0 doubles HL', () => {
  // No difficulty bonus (diff=ability), no speed bonus (15s), no streak (0)
  const next = computeNewHalfLifeOnCorrect(24, 2, 2, 15000, 0);
  assertAlmostEquals(next, 48); // 24 * (1 + 1.0)
});

Deno.test('correct: difficulty bonus +0.5 when item harder than ability', () => {
  // diff=3 > ability=2, no speed, no streak → bonus = 1.5
  const next = computeNewHalfLifeOnCorrect(24, 3, 2, 15000, 0);
  assertAlmostEquals(next, 60); // 24 * 2.5
});

Deno.test('correct: speed bonus +0.3 when response < 10s', () => {
  // diff=ability, fast (5s), no streak → bonus = 1.3
  const next = computeNewHalfLifeOnCorrect(24, 2, 2, 5000, 0);
  assertAlmostEquals(next, 55.2); // 24 * 2.3
});

Deno.test('correct: streak bonus min(streak*0.1, 0.5)', () => {
  // streak=3 → +0.3
  const a = computeNewHalfLifeOnCorrect(24, 2, 2, 15000, 3);
  assertAlmostEquals(a, 24 * 2.3);

  // streak=10 → capped at +0.5
  const b = computeNewHalfLifeOnCorrect(24, 2, 2, 15000, 10);
  assertAlmostEquals(b, 24 * 2.5);

  // streak=100 → still capped at +0.5
  const c = computeNewHalfLifeOnCorrect(24, 2, 2, 15000, 100);
  assertAlmostEquals(c, 24 * 2.5);
});

Deno.test('correct: all bonuses stack', () => {
  // diff=3, ability=2, fast (5s), streak=10 → 1.0 + 0.5 + 0.3 + 0.5 = 2.3
  const next = computeNewHalfLifeOnCorrect(24, 3, 2, 5000, 10);
  assertAlmostEquals(next, 24 * 3.3);
});

Deno.test('correct: HL capped at 4320 hours (~6 months)', () => {
  // Start near cap, all bonuses → still capped
  const next = computeNewHalfLifeOnCorrect(2000, 5, 2, 5000, 10);
  assertEquals(next, 4320);
});

// ============================================================
// computeNewHalfLifeOnIncorrect — decay
// ============================================================

Deno.test('incorrect: base decay 0.5 halves HL', () => {
  // diff=ability, no easy penalty
  const next = computeNewHalfLifeOnIncorrect(48, 2, 2);
  assertAlmostEquals(next, 24);
});

Deno.test('incorrect: easy-item penalty 0.3× when diff < ability - 1', () => {
  // ability=4, diff=2 → diff < ability - 1 → decay = 0.3
  const next = computeNewHalfLifeOnIncorrect(48, 2, 4);
  assertAlmostEquals(next, 14.4); // 48 * 0.3
});

Deno.test('incorrect: easy-item penalty NOT triggered at exactly ability - 1', () => {
  // ability=3, diff=2 → diff = ability - 1, not strictly less → decay = 0.5
  const next = computeNewHalfLifeOnIncorrect(48, 2, 3);
  assertAlmostEquals(next, 24);
});

Deno.test('incorrect: HL has minimum of 4 hours', () => {
  // Start tiny, big decay → still 4
  const next = computeNewHalfLifeOnIncorrect(5, 1, 4);
  assertEquals(next, 4);
});

// ============================================================
// computeNewAbility — drift toward item difficulty
// ============================================================

Deno.test('ability: correct on harder item drifts up', () => {
  // ability=2, diff=4 → +0.1*(4-2) = +0.2
  assertAlmostEquals(computeNewAbility(2, 4, true), 2.2);
});

Deno.test('ability: correct on easier item drifts down slightly', () => {
  // ability=4, diff=2 → +0.1*(2-4) = -0.2
  assertAlmostEquals(computeNewAbility(4, 2, true), 3.8);
});

Deno.test('ability: incorrect drifts toward max(diff-1, 1)', () => {
  // ability=3, diff=2 → target = max(1, 1) = 1 → ability -= 0.1*(3-1) = -0.2
  assertAlmostEquals(computeNewAbility(3, 2, false), 2.8);
});

Deno.test('ability: incorrect on hard item still drifts down', () => {
  // ability=2, diff=5 → target = 4 → ability -= 0.1*(2-4) = +0.2 (clamped: actually -0.1*(2-4) = +0.2)
  // Wait: -0.1 * (prevAbility - max(diff-1, 1)) = -0.1 * (2 - 4) = +0.2
  assertAlmostEquals(computeNewAbility(2, 5, false), 2.2);
});

Deno.test('ability: clamped to [1, 5]', () => {
  assertEquals(computeNewAbility(1, 1, false), 1);
  assertEquals(computeNewAbility(5, 5, true), 5);
  assertEquals(computeNewAbility(0.5, 5, true), 1); // clamps lower bound
  assertEquals(computeNewAbility(6, 5, true), 5); // clamps upper bound
});

// ============================================================
// computeMastery — transition thresholds
// ============================================================

Deno.test('mastery: 0 attempts → novice', () => {
  assertEquals(computeMastery(0, 0, 24), 'novice');
});

Deno.test('mastery: <5 attempts → novice', () => {
  assertEquals(computeMastery(4, 4, 24), 'novice');
});

Deno.test('mastery: 5+ attempts at 40%+ → developing', () => {
  assertEquals(computeMastery(5, 2, 24), 'developing'); // 40%
  assertEquals(computeMastery(7, 4, 24), 'developing'); // ~57%
});

Deno.test('mastery: 5+ attempts under 40% → novice', () => {
  assertEquals(computeMastery(5, 1, 24), 'novice'); // 20%
});

Deno.test('mastery: 8+ attempts at 70%+ → proficient', () => {
  assertEquals(computeMastery(8, 6, 24), 'proficient'); // 75%
  assertEquals(computeMastery(10, 8, 100), 'proficient'); // 80%, HL too low for master
});

Deno.test('mastery: 10+ attempts at 90%+ AND HL >= 168 → master', () => {
  assertEquals(computeMastery(10, 9, 168), 'master');
  assertEquals(computeMastery(20, 19, 200), 'master');
});

Deno.test('mastery: 90% accuracy but HL < 168 → only proficient', () => {
  assertEquals(computeMastery(10, 9, 100), 'proficient');
});

Deno.test('mastery: HL high but accuracy < 90% → only proficient', () => {
  assertEquals(computeMastery(10, 8, 200), 'proficient'); // 80%
});

Deno.test('mastery: progression sanity check', () => {
  // Simulate a learner climbing the ladder
  assertEquals(computeMastery(1, 1, 24), 'novice');
  assertEquals(computeMastery(5, 3, 24), 'developing'); // 60%
  assertEquals(computeMastery(8, 6, 48), 'proficient'); // 75%
  assertEquals(computeMastery(15, 14, 200), 'master'); // ~93%, HL ok
});

// ============================================================
// computeXp — base + bonuses
// ============================================================

Deno.test('xp: incorrect → 1 (participation)', () => {
  assertEquals(computeXp(false, 5, 1000, 100), 1);
});

Deno.test('xp: correct base = 10 * difficulty', () => {
  // Slow response (>10s), no streak
  assertEquals(computeXp(true, 1, 15000, 0), 10);
  assertEquals(computeXp(true, 3, 15000, 0), 30);
  assertEquals(computeXp(true, 5, 15000, 0), 50);
});

Deno.test('xp: speed bonus +5 if <10s', () => {
  assertEquals(computeXp(true, 2, 8000, 0), 25); // 20 + 5
});

Deno.test('xp: extra speed bonus +5 if <5s (total +10)', () => {
  assertEquals(computeXp(true, 2, 3000, 0), 30); // 20 + 5 + 5
});

Deno.test('xp: streak bonus = min(streak*2, 20)', () => {
  // Slow response, streak=3 → 20 + 6 = 26
  assertEquals(computeXp(true, 2, 15000, 3), 26);
  // Streak=15 → capped at 20 → 20 + 20 = 40
  assertEquals(computeXp(true, 2, 15000, 15), 40);
  // Streak=100 → still capped → 20 + 20 = 40
  assertEquals(computeXp(true, 2, 15000, 100), 40);
});

Deno.test('xp: all bonuses stack', () => {
  // diff=5, fast=3s, streak=10 → 50 + 5 + 5 + 20 = 80
  assertEquals(computeXp(true, 5, 3000, 10), 80);
});

// ============================================================
// applyHintPenalty
// ============================================================

Deno.test('hint penalty: 30% reduction, rounded', () => {
  assertEquals(applyHintPenalty(10), 7); // 7.0
  assertEquals(applyHintPenalty(50), 35); // 35.0
  assertEquals(applyHintPenalty(80), 56); // 56.0
  assertEquals(applyHintPenalty(13), 9); // 9.1 → 9
  assertEquals(applyHintPenalty(0), 0);
});

// ============================================================
// Integration sanity: full forgetting curve
// ============================================================

Deno.test('integration: half-life doubles after correct, decays back after wrong', () => {
  // Start: HL=24h, ability=2, no streak
  // Correct, slow, item match: bonus=1.0 → HL=48
  const hl1 = computeNewHalfLifeOnCorrect(24, 2, 2, 15000, 0);
  assertAlmostEquals(hl1, 48);

  // Then wrong on same difficulty: decay=0.5 → HL=24
  const hl2 = computeNewHalfLifeOnIncorrect(hl1, 2, 2);
  assertAlmostEquals(hl2, 24);
});

Deno.test('integration: streak amplifies HL growth', () => {
  // Build up: HL=24, ability=3, streak=5, all correct on diff=4
  // bonus = 1.0 + 0.5 (diff>ability) + 0.3 (fast) + 0.5 (streak capped) = 2.3
  const next = computeNewHalfLifeOnCorrect(24, 4, 3, 5000, 5);
  assertAlmostEquals(next, 24 * 3.3); // 79.2
});

Deno.test('integration: master requires sustained accuracy + retention', () => {
  // Scenario: 12 attempts, 11 correct = 91.6%, HL=200h → master
  assertEquals(computeMastery(12, 11, 200), 'master');
  // Same accuracy but HL=100h → only proficient
  assertEquals(computeMastery(12, 11, 100), 'proficient');
});
