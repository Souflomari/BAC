// ============================================================
// Edge Function: GET /next-session
// Generates the next learning session for a user using SRS scheduling
// ============================================================
// Deploy: supabase functions deploy next-session

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ---- SRS ALGORITHM ----
// Simplified Half-Life Regression model
//
// Core concept: each (user, skill) pair has a "half_life" in hours.
// Memory strength = 2^(-elapsed_hours / half_life)
// When strength < 0.5, the skill needs review.
//
// Session generation:
// 1. Compute strength for all user skills
// 2. Prioritize: overdue reviews > weak skills > new skills
// 3. Mix items across skills, varying difficulty
// 4. Weight by exam relevance

interface SkillWithState {
  skill_id: string;
  topic_id: string;
  subject_id: string;
  name_fr: string;
  name_ar: string;
  difficulty_level: number;
  exam_relevance_weight: number;
  mastery: string;
  half_life_hours: number;
  last_reviewed_at: string | null;
  num_attempts: number;
  num_correct: number;
  estimated_ability: number;
  strength: number; // computed
  urgency: number;  // computed
}

function computeStrength(halfLifeHours: number, lastReviewedAt: string | null): number {
  if (!lastReviewedAt) return 0;
  const elapsedMs = Date.now() - new Date(lastReviewedAt).getTime();
  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  return Math.pow(2, -elapsedHours / halfLifeHours);
}

function computeUrgency(strength: number, examRelevance: number, mastery: string): number {
  // Higher urgency = should be reviewed sooner
  // Factors: low strength, high exam relevance, not yet mastered
  const strengthUrgency = 1 - strength;
  const masteryMultiplier = mastery === 'master' ? 0.3 : mastery === 'proficient' ? 0.6 : 1.0;
  return strengthUrgency * examRelevance * masteryMultiplier;
}

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

    const url = new URL(req.url);
    const subjectId = url.searchParams.get('subject_id');
    const skillId = url.searchParams.get('skill_id');
    const maxItems = parseInt(url.searchParams.get('max_items') ?? '15');
    const sessionType = url.searchParams.get('session_type') ?? 'practice';

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('bac_stream, exam_date')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch all skills for the user's stream (with their states)
    // Join: skills -> topics -> subjects -> stream_subjects
    let skillsQuery = supabase
      .from('skills')
      .select(`
        id,
        topic_id,
        code,
        name_fr,
        name_ar,
        difficulty_level,
        exam_relevance_weight,
        topics!inner (
          id,
          subject_id,
          exam_relevance_weight,
          subjects!inner (
            id,
            code,
            stream_subjects!inner (
              stream,
              coefficient
            )
          )
        )
      `)
      .eq('topics.subjects.stream_subjects.stream', profile.bac_stream);

    if (subjectId) {
      skillsQuery = skillsQuery.eq('topics.subject_id', subjectId);
    }

    const { data: skills, error: skillsError } = await skillsQuery;

    // If skill_id is specified, filter to only that skill
    const filteredSkills = skillId
      ? (skills ?? []).filter((s: any) => s.id === skillId)
      : skills;
    if (skillsError) throw skillsError;

    // Fetch user's skill states
    const { data: userStates } = await supabase
      .from('user_skill_states')
      .select('*')
      .eq('user_id', user.id);

    const stateMap = new Map(
      (userStates ?? []).map((s: any) => [s.skill_id, s])
    );

    // Compute strength and urgency for each skill
    const enrichedSkills: SkillWithState[] = (filteredSkills ?? []).map((skill: any) => {
      const state = stateMap.get(skill.id);
      const halfLife = state?.half_life_hours ?? 24;
      const lastReviewed = state?.last_reviewed_at ?? null;
      const mastery = state?.mastery ?? 'locked';
      const strength = computeStrength(halfLife, lastReviewed);
      const examWeight = skill.exam_relevance_weight *
        (skill.topics?.exam_relevance_weight ?? 0.5);

      return {
        skill_id: skill.id,
        topic_id: skill.topic_id,
        subject_id: skill.topics?.subject_id,
        name_fr: skill.name_fr,
        name_ar: skill.name_ar,
        difficulty_level: skill.difficulty_level,
        exam_relevance_weight: examWeight,
        mastery,
        half_life_hours: halfLife,
        last_reviewed_at: lastReviewed,
        num_attempts: state?.num_attempts ?? 0,
        num_correct: state?.num_correct ?? 0,
        estimated_ability: state?.estimated_ability ?? 1.0,
        strength,
        urgency: computeUrgency(strength, examWeight, mastery),
      };
    });

    // ---- ITEM SELECTION ALGORITHM ----
    // Split into categories
    const overdueReviews = enrichedSkills
      .filter(s => s.mastery !== 'locked' && s.strength < 0.5)
      .sort((a, b) => b.urgency - a.urgency);

    const weakSkills = enrichedSkills
      .filter(s => s.mastery !== 'locked' && s.strength >= 0.5 && s.strength < 0.75)
      .sort((a, b) => b.urgency - a.urgency);

    const newSkills = enrichedSkills
      .filter(s => s.mastery === 'locked' || s.num_attempts === 0)
      .sort((a, b) => {
        // Prioritize by display order and exam relevance
        return b.exam_relevance_weight - a.exam_relevance_weight;
      });

    // Allocate items: 50% review, 30% weak, 20% new (adjust based on availability)
    const reviewCount = Math.min(Math.ceil(maxItems * 0.5), overdueReviews.length * 2);
    const weakCount = Math.min(Math.ceil(maxItems * 0.3), weakSkills.length * 2);
    const newCount = maxItems - reviewCount - weakCount;

    // Select skills for each category
    const selectedSkillIds: { id: string; reason: string; count: number }[] = [];

    // Add review skills (1-2 items each)
    for (const skill of overdueReviews.slice(0, Math.ceil(reviewCount / 1.5))) {
      selectedSkillIds.push({ id: skill.skill_id, reason: 'review', count: 2 });
    }

    // Add weak skills
    for (const skill of weakSkills.slice(0, Math.ceil(weakCount / 1.5))) {
      selectedSkillIds.push({ id: skill.skill_id, reason: 'weak', count: 2 });
    }

    // Add new skills (check prerequisites are met)
    const masteredSet = new Set(
      enrichedSkills
        .filter(s => s.mastery === 'proficient' || s.mastery === 'master')
        .map(s => s.skill_id)
    );

    // Check prerequisites for new skills
    const { data: prerequisites } = await supabase
      .from('skill_prerequisites')
      .select('skill_id, prerequisite_skill_id');

    const prereqMap = new Map<string, string[]>();
    (prerequisites ?? []).forEach((p: any) => {
      const existing = prereqMap.get(p.skill_id) ?? [];
      existing.push(p.prerequisite_skill_id);
      prereqMap.set(p.skill_id, existing);
    });

    for (const skill of newSkills.slice(0, Math.ceil(newCount))) {
      const prereqs = prereqMap.get(skill.skill_id) ?? [];
      const prereqsMet = prereqs.every(p => masteredSet.has(p));
      // For v1: also allow if skill has no prerequisites
      if (prereqsMet || prereqs.length === 0) {
        selectedSkillIds.push({ id: skill.skill_id, reason: 'new', count: 2 });
      }
    }

    // Fetch items for selected skills
    const skillIds = selectedSkillIds.map(s => s.id);
    if (skillIds.length === 0) {
      // Fallback: pick any available skills
      const fallback = enrichedSkills
        .filter(s => s.mastery !== 'locked')
        .slice(0, 5);
      fallback.forEach(s => {
        selectedSkillIds.push({ id: s.skill_id, reason: 'review', count: 3 });
        skillIds.push(s.skill_id);
      });
    }

    const { data: items } = await supabase
      .from('items')
      .select('*')
      .in('skill_id', skillIds)
      .eq('is_active', true);

    // Build session items
    const sessionItems: any[] = [];
    const skillInfoMap = new Map(enrichedSkills.map(s => [s.skill_id, s]));

    for (const selection of selectedSkillIds) {
      const skillItems = (items ?? []).filter((i: any) => i.skill_id === selection.id);
      const skillInfo = skillInfoMap.get(selection.id);

      // Pick items matching user's ability level
      const ability = skillInfo?.estimated_ability ?? 1;
      const sorted = skillItems.sort((a: any, b: any) => {
        const aDist = Math.abs(a.difficulty_level - ability);
        const bDist = Math.abs(b.difficulty_level - ability);
        return aDist - bDist;
      });

      for (const item of sorted.slice(0, selection.count)) {
        sessionItems.push({
          item,
          skill: {
            id: selection.id,
            name_fr: skillInfo?.name_fr,
            name_ar: skillInfo?.name_ar,
            difficulty_level: skillInfo?.difficulty_level,
          },
          reason: selection.reason,
        });
      }
    }

    // Shuffle items (but keep some structure: start easier, end harder)
    sessionItems.sort((a, b) => {
      // Interleave: new items first, then reviews
      const reasonOrder: Record<string, number> = { new: 0, weak: 1, review: 2 };
      const rDiff = (reasonOrder[a.reason] ?? 1) - (reasonOrder[b.reason] ?? 1);
      if (rDiff !== 0) return rDiff;
      return a.item.difficulty_level - b.item.difficulty_level;
    });

    // Create session record
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .insert({
        user_id: user.id,
        session_type: sessionType,
        num_items: sessionItems.length,
        subject_ids: [...new Set(sessionItems.map((si: any) => skillInfoMap.get(si.skill.id)?.subject_id).filter(Boolean))],
        skill_ids: [...new Set(sessionItems.map((si: any) => si.skill.id))],
      })
      .select()
      .single();

    if (sessionError) throw sessionError;

    // Unlock any new skills that were selected
    for (const selection of selectedSkillIds) {
      if (selection.reason === 'new') {
        await supabase
          .from('user_skill_states')
          .upsert({
            user_id: user.id,
            skill_id: selection.id,
            mastery: 'novice',
            unlocked_at: new Date().toISOString(),
            first_seen_at: new Date().toISOString(),
          }, { onConflict: 'user_id,skill_id' });
      }
    }

    const response = {
      session_id: session.id,
      items: sessionItems.slice(0, maxItems),
      estimated_duration_minutes: Math.ceil(sessionItems.length * 1.2),
      skill_focus: [...new Set(sessionItems.map((si: any) => si.skill.id))].map(id => {
        const info = skillInfoMap.get(id as string);
        return {
          skill_id: id,
          name_fr: info?.name_fr,
          strength: info?.strength ?? 0,
        };
      }),
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
