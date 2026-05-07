// ============================================================
// Edge Function: /daily-quests
// GET  -> Returns today's 3 quests (creates them if missing)
// POST -> Increments progress for quest events
// ============================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

type QuestType =
  | 'correctAnswers'
  | 'studyMinutes'
  | 'reviewSkills'
  | 'completeSession'
  | 'perfectStreak';

interface QuestTemplate {
  type: QuestType;
  target: number;
  xpReward: number;
}

const TEMPLATES: QuestTemplate[] = [
  { type: 'correctAnswers', target: 5, xpReward: 20 },
  { type: 'correctAnswers', target: 10, xpReward: 35 },
  { type: 'studyMinutes', target: 10, xpReward: 15 },
  { type: 'studyMinutes', target: 15, xpReward: 25 },
  { type: 'reviewSkills', target: 3, xpReward: 25 },
  { type: 'completeSession', target: 1, xpReward: 15 },
  { type: 'completeSession', target: 2, xpReward: 30 },
  { type: 'perfectStreak', target: 5, xpReward: 30 },
];

// Linear congruential generator — keeps server in sync with the client's
// QuestGenerator in lib/models/daily_quest.dart. Seed = YYYYMMDD.
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let state = seed;
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generateQuestsForDate(date: Date): QuestTemplate[] {
  const seed = date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
  const shuffled = seededShuffle(TEMPLATES, seed);
  const picked: QuestTemplate[] = [];
  const usedTypes = new Set<QuestType>();
  for (const t of shuffled) {
    if (!usedTypes.has(t.type)) {
      picked.push(t);
      usedTypes.add(t.type);
      if (picked.length === 3) break;
    }
  }
  return picked;
}

function todayUtcDate(): string {
  return new Date().toISOString().split('T')[0];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing authorization' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  const userId = userData.user.id;
  const today = todayUtcDate();

  try {
    if (req.method === 'GET') {
      // Fetch today's quests
      const { data: existing } = await supabase
        .from('daily_quests')
        .select('*')
        .eq('user_id', userId)
        .eq('quest_date', today)
        .order('slot_index');

      if (existing && existing.length > 0) {
        return new Response(JSON.stringify({ quests: existing }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Generate and insert today's quests
      const templates = generateQuestsForDate(new Date());
      const rows = templates.map((t, idx) => ({
        user_id: userId,
        quest_date: today,
        quest_type: t.type,
        target: t.target,
        xp_reward: t.xpReward,
        slot_index: idx,
      }));

      const { data: inserted, error: insertError } = await supabase
        .from('daily_quests')
        .insert(rows)
        .select();

      if (insertError) throw insertError;

      return new Response(JSON.stringify({ quests: inserted }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      // Body: { event: 'correctAnswer'|'studyMinute'|'reviewedFadingSkill'|'sessionCompleted', amount?: number }
      const body = await req.json();
      const event = body.event as string;
      const amount = (body.amount as number) ?? 1;

      // Map event -> quest types affected
      const affected: QuestType[] = [];
      if (event === 'correctAnswer') affected.push('correctAnswers', 'perfectStreak');
      else if (event === 'studyMinute') affected.push('studyMinutes');
      else if (event === 'reviewedFadingSkill') affected.push('reviewSkills');
      else if (event === 'sessionCompleted') affected.push('completeSession');
      else {
        return new Response(JSON.stringify({ error: 'Unknown event' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Fetch matching quests for today
      const { data: quests } = await supabase
        .from('daily_quests')
        .select('id, quest_type, completed')
        .eq('user_id', userId)
        .eq('quest_date', today)
        .in('quest_type', affected);

      let totalBonus = 0;
      const updated: { id: string; bonus: number }[] = [];

      for (const q of quests ?? []) {
        if (q.completed) continue;
        const { data: bonus } = await supabase.rpc('increment_quest_progress', {
          p_quest_id: q.id,
          p_delta: amount,
        });
        if (typeof bonus === 'number' && bonus > 0) {
          totalBonus += bonus;
          updated.push({ id: q.id, bonus });
        }
      }

      // Award XP for any newly completed quests
      if (totalBonus > 0) {
        await supabase.rpc('increment_xp', { p_user_id: userId, p_xp: totalBonus });
      }

      return new Response(
        JSON.stringify({ bonus_xp: totalBonus, completed: updated }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
