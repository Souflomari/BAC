// ============================================================
// Edge Function: POST /submit-answer
// Processes a user's answer, updates SRS state, returns feedback
// ============================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {
  computeMastery,
  computeNewAbility,
  computeNewHalfLifeOnCorrect,
  computeNewHalfLifeOnIncorrect,
  computeXp,
  applyHintPenalty,
} from '../_shared/srs.ts';
import {
  classifyMisconceptionEvent,
} from '../_shared/misconception_event.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ---- SRS UPDATE ALGORITHM ----
//
// After each answer, we update the user's skill state:
//
// CORRECT ANSWER:
//   half_life *= (1 + bonus)
//   bonus depends on: difficulty vs ability gap, response time, current streak
//   Base bonus = 1.0 (doubles half-life), max 2.0 (triples)
//   - If item was harder than ability: bonus += 0.5
//   - If response was fast (< 10s): bonus += 0.3
//   - Streak bonus: min(streak * 0.1, 0.5)
//
// INCORRECT ANSWER:
//   half_life *= decay_factor (0.5 by default = halves half-life)
//   - If item was much easier than ability: extra penalty
//   Reset current streak
//
// MASTERY UPDATE:
//   Compute accuracy over last N attempts
//   locked -> novice: first attempt
//   novice -> developing: accuracy >= 40% over 5+ attempts
//   developing -> proficient: accuracy >= 70% over 8+ attempts
//   proficient -> master: accuracy >= 90% over 10+ attempts AND half_life >= 168h (1 week)
//
// ABILITY UPDATE:
//   estimated_ability moves toward item difficulty based on correctness
//   correct: ability += 0.1 * (difficulty - ability)  [pulled toward harder]
//   incorrect: ability -= 0.1 * (ability - difficulty) [pulled toward easier]
//   Clamped to [1, 5]

interface SubmitRequest {
  session_id: string;
  item_id: string;
  skill_id: string;
  is_correct: boolean;
  response_time_ms: number;
  user_answer: unknown;
  hint_used?: boolean;
}

// SRS algorithm functions (computeMastery, computeXp, computeNewHalfLifeOn*,
// computeNewAbility, applyHintPenalty) are imported from _shared/srs.ts
// so they can be unit-tested independently.

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body: SubmitRequest = await req.json();
    const { session_id, item_id, skill_id, is_correct, response_time_ms, user_answer, hint_used } = body;

    // Fetch current skill state
    const { data: currentState } = await supabase
      .from('user_skill_states')
      .select('*')
      .eq('user_id', user.id)
      .eq('skill_id', skill_id)
      .single();

    // Fetch item — SRS needs difficulty + explanation; the misconception
    // path needs item_type, skill_id (re-derived for the FK round-trip
    // per ADR 0011), and distractor_misconceptions.
    const { data: item } = await supabase
      .from('items')
      .select('id, item_type, skill_id, difficulty_level, explanation, distractor_misconceptions')
      .eq('id', item_id)
      .single();

    const itemDifficulty = item?.difficulty_level ?? 1;
    const prevHalfLife = currentState?.half_life_hours ?? 24;
    const prevAbility = currentState?.estimated_ability ?? 1.0;
    const prevStreak = currentState?.current_streak ?? 0;
    const prevBestStreak = currentState?.best_streak ?? 0;
    const prevAttempts = currentState?.num_attempts ?? 0;
    const prevCorrect = currentState?.num_correct ?? 0;

    // ---- Compute new SRS parameters (delegated to _shared/srs.ts) ----
    const newHalfLife = is_correct
      ? computeNewHalfLifeOnCorrect(prevHalfLife, itemDifficulty, prevAbility, response_time_ms, prevStreak)
      : computeNewHalfLifeOnIncorrect(prevHalfLife, itemDifficulty, prevAbility);
    const newStreak = is_correct ? prevStreak + 1 : 0;
    const newAbility = computeNewAbility(prevAbility, itemDifficulty, is_correct);

    const newAttempts = prevAttempts + 1;
    const newCorrect = prevCorrect + (is_correct ? 1 : 0);
    const newBestStreak = Math.max(prevBestStreak, newStreak);
    const newMastery = computeMastery(newAttempts, newCorrect, newHalfLife);
    const now = new Date().toISOString();

    // Just reviewed, so strength ≈ 1.0
    const newStrength = 1.0;

    // XP (with hint penalty if applicable)
    let xpEarned = computeXp(is_correct, itemDifficulty, response_time_ms, newStreak);
    if (hint_used) {
      xpEarned = applyHintPenalty(xpEarned);
    }

    // ---- Persist updates ----

    // Update skill state
    await supabase
      .from('user_skill_states')
      .upsert({
        user_id: user.id,
        skill_id: skill_id,
        half_life_hours: newHalfLife,
        last_reviewed_at: now,
        mastery: newMastery,
        num_attempts: newAttempts,
        num_correct: newCorrect,
        current_streak: newStreak,
        best_streak: newBestStreak,
        estimated_ability: newAbility,
        first_seen_at: currentState?.first_seen_at ?? now,
        unlocked_at: currentState?.unlocked_at ?? now,
        mastered_at: newMastery === 'master' && currentState?.mastery !== 'master' ? now : currentState?.mastered_at,
      }, { onConflict: 'user_id,skill_id' });

    // Record item history
    await supabase
      .from('user_item_history')
      .insert({
        user_id: user.id,
        item_id: item_id,
        skill_id: skill_id,
        session_id: session_id,
        is_correct: is_correct,
        response_time_ms: response_time_ms,
        user_answer: user_answer,
        difficulty_at_time: itemDifficulty,
        hint_used: hint_used ?? false,
      });

    // Update session stats
    await supabase.rpc('update_session_stats', {
      p_session_id: session_id,
      p_correct: is_correct,
      p_xp: xpEarned,
    }).then(() => {}).catch(() => {
      // Fallback: direct update if RPC doesn't exist yet
      // This is fine for v1
    });

    // Update daily activity (atomic upsert)
    const today = new Date().toISOString().split('T')[0];
    await supabase.rpc('upsert_daily_activity', {
      p_user_id: user.id,
      p_date: today,
      p_correct: is_correct,
      p_xp: xpEarned,
    });

    // Update user total XP (atomic increment)
    await supabase.rpc('increment_xp', { p_user_id: user.id, p_xp: xpEarned });

    // ---- Misconception write path (ADR 0013) ----
    //
    // Dual-client pattern: userClient (above) carries the JWT and gates
    // reads/writes via RLS. For misconceptions, we use a separate
    // adminClient (service_role) because:
    //   - the write target is record_misconception_exhibited (RPC,
    //     migration 047), which is granted ONLY to service_role to
    //     prevent authenticated users from inflating exhibited_count
    //     by calling the RPC directly.
    //   - RLS on user_misconception_states is the read-side guard;
    //     this function is the write-side guard. ADR 0007 §learner-model.
    //
    // user.id is the JWT-verified subject from userClient.auth.getUser().
    // It is NOT taken from the request body — that would let a caller
    // write state for another user.
    if (item) {
      // Re-fetch the parent skill's common_misconceptions for the
      // existence-validation read (ADR 0013 §bac-curriculum). Using the
      // userClient is fine — skills has a public-read RLS policy (mig 040)
      // so RLS doesn't block; the data is non-PII.
      const { data: skillRow } = await supabase
        .from('skills')
        .select('id, common_misconceptions')
        .eq('id', item.skill_id)
        .single();

      const outcome = classifyMisconceptionEvent({
        item: {
          id: item.id,
          skill_id: item.skill_id,
          item_type: item.item_type,
          distractor_misconceptions: item.distractor_misconceptions,
        },
        skill: skillRow,
        user_answer,
        is_correct,
      });

      if (outcome.kind === 'event') {
        // adminClient is scoped narrowly to this call. SUPABASE_SERVICE_ROLE_KEY
        // is the staging/prod-specific deployed env var; the function does
        // not inspect it beyond passing it to createClient.
        const adminClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        );
        const { error: rpcError } = await adminClient.rpc(
          'record_misconception_exhibited',
          {
            p_user_id: user.id,             // JWT-verified, NOT body-derived
            p_skill_id: outcome.skill_id,   // == item.skill_id, validated
                                            // against skill.common_misconceptions
            p_misconception_id: outcome.misconception_id,
          },
        );
        if (rpcError) {
          // Log but do not 5xx the whole answer submission — the user's
          // SRS state was already updated; failing the response would
          // hide a successful answer behind a diagnostic-layer hiccup.
          console.error(JSON.stringify({
            event: 'misconception_rpc_error',
            item_id: item.id,
            skill_id: outcome.skill_id,
            misconception_id: outcome.misconception_id,
            session_id,
            message: rpcError.message,
          }));
        }
      } else if (outcome.kind === 'phantom_tag') {
        // Phantom tag — application-layer guard caught a stale or typo'd
        // misconception_id in items.distractor_misconceptions. Log with
        // the payload bac-curriculum specified in ADR 0013 §3 (no user_id
        // — PII). Authors triage from item_id + candidate_misconception_id.
        console.error(JSON.stringify({ ...outcome.log, session_id }));
      } else if (outcome.kind === 'deprecated') {
        // Forward-compat: future migration adds deprecated_at to
        // misconception entries. Log as warning, no write.
        console.warn(JSON.stringify({ ...outcome.log, session_id }));
      } else if (outcome.kind === 'skill_mismatch') {
        // Structural integrity violation: item.skill_id resolves to a
        // different skill row than the one fetched, or the fetch
        // returned null. Log and skip.
        console.error(JSON.stringify({ ...outcome.log, session_id }));
      }
      // outcome.kind === 'no_event' is the silent path — no log, no write.
    }

    // Check for newly earned badges
    const badgesEarned = await checkBadges(supabase, user.id, newMastery, newStreak, newAttempts);

    const response = {
      xp_earned: xpEarned,
      updated_strength: newStrength,
      updated_mastery: newMastery,
      streak: newStreak,
      explanation: item?.explanation,
      badges_earned: badgesEarned,
      half_life_hours: newHalfLife,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function checkBadges(supabase: any, userId: string, mastery: string, streak: number, attempts: number) {
  const earned: any[] = [];

  // Check streak badges
  const streakBadges = [
    { threshold: 5, code: 'streak_5' },
    { threshold: 10, code: 'streak_10' },
    { threshold: 30, code: 'streak_30' },
  ];

  for (const sb of streakBadges) {
    if (streak >= sb.threshold) {
      const { data: badge } = await supabase
        .from('badges')
        .select('*')
        .eq('code', sb.code)
        .single();

      if (badge) {
        const { data: existing } = await supabase
          .from('user_badges')
          .select('badge_id')
          .eq('user_id', userId)
          .eq('badge_id', badge.id)
          .single();

        if (!existing) {
          await supabase.from('user_badges').insert({ user_id: userId, badge_id: badge.id });
          earned.push(badge);
        }
      }
    }
  }

  // Check mastery badge
  if (mastery === 'master') {
    const { data: masteredCount } = await supabase
      .from('user_skill_states')
      .select('skill_id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('mastery', 'master');

    const count = masteredCount?.length ?? 0;
    const masteryBadges = [
      { threshold: 1, code: 'first_mastery' },
      { threshold: 5, code: 'mastery_5' },
      { threshold: 10, code: 'mastery_10' },
    ];

    for (const mb of masteryBadges) {
      if (count >= mb.threshold) {
        const { data: badge } = await supabase
          .from('badges')
          .select('*')
          .eq('code', mb.code)
          .single();

        if (badge) {
          const { data: existing } = await supabase
            .from('user_badges')
            .select('badge_id')
            .eq('user_id', userId)
            .eq('badge_id', badge.id)
            .single();

          if (!existing) {
            await supabase.from('user_badges').insert({ user_id: userId, badge_id: badge.id });
            earned.push(badge);
          }
        }
      }
    }
  }

  return earned.length > 0 ? earned : undefined;
}
