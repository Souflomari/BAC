// ============================================================
// Edge Function: GET /progress
// Returns comprehensive progress summary for the user
// ============================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // Fetch subjects for user's stream
    const { data: streamSubjects } = await supabase
      .from('stream_subjects')
      .select('*, subjects(*)')
      .eq('stream', profile.bac_stream);

    // Fetch all topics and skills for those subjects
    const subjectIds = (streamSubjects ?? []).map((ss: any) => ss.subject_id);

    const { data: topics } = await supabase
      .from('topics')
      .select('*')
      .in('subject_id', subjectIds)
      .order('display_order');

    const topicIds = (topics ?? []).map((t: any) => t.id);

    const { data: skills } = await supabase
      .from('skills')
      .select('*')
      .in('topic_id', topicIds)
      .order('display_order');

    // Fetch user's skill states
    const { data: userStates } = await supabase
      .from('user_skill_states')
      .select('*')
      .eq('user_id', user.id);

    const stateMap = new Map(
      (userStates ?? []).map((s: any) => [s.skill_id, s])
    );

    // Fetch today's activity
    const today = new Date().toISOString().split('T')[0];
    const { data: todayActivity } = await supabase
      .from('daily_activity')
      .select('*')
      .eq('user_id', user.id)
      .eq('activity_date', today)
      .single();

    // Compute days until exam
    let daysUntilExam = 0;
    if (profile.exam_date) {
      const examDate = new Date(profile.exam_date);
      const now = new Date();
      daysUntilExam = Math.max(0, Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    }

    // Build hierarchical progress
    const subjectProgress = (streamSubjects ?? []).map((ss: any) => {
      const subject = ss.subjects;
      const subjectTopics = (topics ?? []).filter((t: any) => t.subject_id === subject.id);

      const topicProgress = subjectTopics.map((topic: any) => {
        const topicSkills = (skills ?? []).filter((s: any) => s.topic_id === topic.id);

        const skillProgress = topicSkills.map((skill: any) => {
          const state = stateMap.get(skill.id);
          let strength = 0;
          if (state?.last_reviewed_at) {
            const elapsed = (Date.now() - new Date(state.last_reviewed_at).getTime()) / (1000 * 3600);
            strength = Math.pow(2, -elapsed / (state.half_life_hours || 24));
          }
          return {
            skill,
            state: state ? { ...state, strength } : {
              mastery: 'locked',
              strength: 0,
              num_attempts: 0,
              num_correct: 0,
              half_life_hours: 24,
            },
          };
        });

        return { topic, skills: skillProgress };
      });

      const allSkillStates = topicProgress.flatMap((tp: any) => tp.skills);
      const totalSkills = allSkillStates.length;
      const masteredSkills = allSkillStates.filter((s: any) =>
        s.state.mastery === 'master' || s.state.mastery === 'proficient'
      ).length;
      const avgStrength = totalSkills > 0
        ? allSkillStates.reduce((sum: number, s: any) => sum + (s.state.strength || 0), 0) / totalSkills
        : 0;

      return {
        subject,
        coefficient: ss.coefficient,
        total_skills: totalSkills,
        mastered_skills: masteredSkills,
        average_strength: Math.round(avgStrength * 100) / 100,
        topics: topicProgress,
      };
    });

    const response = {
      user: {
        streak_current: profile.streak_current,
        total_xp: profile.total_xp,
        daily_goal_minutes: profile.daily_goal_minutes,
      },
      subjects: subjectProgress,
      today: todayActivity ?? {
        minutes_practiced: 0,
        items_completed: 0,
        items_correct: 0,
        xp_earned: 0,
        streak_maintained: false,
      },
      days_until_exam: daysUntilExam,
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
