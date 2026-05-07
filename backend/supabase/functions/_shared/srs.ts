// ============================================================
// BacPrep SRS Algorithm — pure functions, no side effects.
//
// Extracted from submit-answer/index.ts so it can be unit-tested
// without spinning up Supabase or hitting the database.
//
// Memory model: Half-Life Regression
//   strength = 2 ^ (-elapsed_hours / half_life_hours)
//   strength ∈ [0, 1], decays exponentially after each review.
// ============================================================

export type Mastery = 'locked' | 'novice' | 'developing' | 'proficient' | 'master';

/// Strength of memory at time of evaluation (0 = forgotten, 1 = perfectly fresh).
export function computeStrength(halfLifeHours: number, elapsedHours: number): number {
  if (halfLifeHours <= 0) return 0;
  if (elapsedHours <= 0) return 1;
  return Math.pow(2, -elapsedHours / halfLifeHours);
}

/// Half-life update on a CORRECT answer.
/// Returns new half-life capped at 4320 hours (~6 months).
///
/// Bonus = 1.0 (base, doubles HL)
///       + 0.5 if item difficulty > prior ability
///       + 0.3 if response < 10s
///       + min(streak * 0.1, 0.5)
/// New HL = prevHalfLife * (1 + bonus), capped at 4320.
export function computeNewHalfLifeOnCorrect(
  prevHalfLife: number,
  itemDifficulty: number,
  prevAbility: number,
  responseTimeMs: number,
  prevStreak: number,
): number {
  let bonus = 1.0;
  if (itemDifficulty > prevAbility) bonus += 0.5;
  if (responseTimeMs < 10000) bonus += 0.3;
  bonus += Math.min(prevStreak * 0.1, 0.5);
  return Math.min(prevHalfLife * (1 + bonus), 4320);
}

/// Half-life update on an INCORRECT answer.
/// Returns new half-life with a minimum of 4 hours.
///
/// Decay = 0.5 (base, halves HL)
///       = 0.3 if item was much easier than ability (difficulty < ability - 1)
/// New HL = max(prevHalfLife * decay, 4).
export function computeNewHalfLifeOnIncorrect(
  prevHalfLife: number,
  itemDifficulty: number,
  prevAbility: number,
): number {
  let decay = 0.5;
  if (itemDifficulty < prevAbility - 1) decay = 0.3;
  return Math.max(prevHalfLife * decay, 4);
}

/// Estimated ability update.
/// On correct: ability += 0.1 * (difficulty - ability)
/// On incorrect: ability -= 0.1 * (ability - max(difficulty - 1, 1))
/// Clamped to [1, 5].
export function computeNewAbility(
  prevAbility: number,
  itemDifficulty: number,
  isCorrect: boolean,
): number {
  let next: number;
  if (isCorrect) {
    next = prevAbility + 0.1 * (itemDifficulty - prevAbility);
  } else {
    next = prevAbility - 0.1 * (prevAbility - Math.max(itemDifficulty - 1, 1));
  }
  return Math.max(1, Math.min(5, next));
}

/// Mastery transition based on attempts, accuracy, and half-life.
/// - master:     ≥10 attempts AND ≥90% accuracy AND HL ≥ 168h (1 week)
/// - proficient: ≥8 attempts AND ≥70% accuracy
/// - developing: ≥5 attempts AND ≥40% accuracy
/// - novice:     otherwise
export function computeMastery(
  numAttempts: number,
  numCorrect: number,
  halfLifeHours: number,
): Mastery {
  if (numAttempts === 0) return 'novice';
  const accuracy = numCorrect / numAttempts;
  if (numAttempts >= 10 && accuracy >= 0.9 && halfLifeHours >= 168) return 'master';
  if (numAttempts >= 8 && accuracy >= 0.7) return 'proficient';
  if (numAttempts >= 5 && accuracy >= 0.4) return 'developing';
  return 'novice';
}

/// XP awarded per answer.
/// Wrong: 1 (participation).
/// Correct: 10 * difficulty + speed bonus (0/5/10) + streak bonus (0..20).
/// Hint penalty (-30%) applied externally by the caller.
export function computeXp(
  isCorrect: boolean,
  difficulty: number,
  responseTimeMs: number,
  streak: number,
): number {
  if (!isCorrect) return 1;
  let xp = 10 * difficulty;
  if (responseTimeMs < 10000) xp += 5;
  if (responseTimeMs < 5000) xp += 5;
  xp += Math.min(streak * 2, 20);
  return Math.round(xp);
}

/// Apply -30% hint penalty (rounded).
export function applyHintPenalty(xp: number): number {
  return Math.round(xp * 0.7);
}
