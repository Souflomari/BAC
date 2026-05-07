// ============================================================
// BacPrep Shared Type Definitions
// Used by backend edge functions and as reference for Flutter models
// ============================================================

// --- Enums ---

export type BacStream =
  | 'sciences_maths_a'
  | 'sciences_maths_b'
  | 'sciences_physiques'
  | 'svt'
  | 'sciences_economiques'
  | 'sciences_gestion_comptable'
  | 'lettres_sciences_humaines'
  | 'arts_appliques'
  | 'sciences_chariaa'
  | 'langue_arabe';

export type MasteryLevel = 'locked' | 'novice' | 'developing' | 'proficient' | 'master';

export type ItemType =
  | 'mcq'
  | 'numeric'
  | 'short_text'
  | 'true_false'
  | 'ordering'
  | 'fill_blank'
  | 'matching'
  | 'multi_step';

export type ExamType = 'national' | 'regional';
export type ContentLanguage = 'fr' | 'ar' | 'en';
export type SessionType = 'practice' | 'review' | 'mock_exam' | 'challenge';

// --- Core Models ---

export interface Profile {
  id: string;
  display_name: string;
  avatar_url?: string;
  bac_stream: BacStream;
  bac_year: number;
  exam_date?: string;
  preferred_language: ContentLanguage;
  daily_goal_minutes: number;
  streak_current: number;
  streak_longest: number;
  total_xp: number;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  code: string;
  name_fr: string;
  name_ar: string;
  icon?: string;
  color?: string;
  exam_type: ExamType;
  content_language: ContentLanguage;
  display_order: number;
}

export interface StreamSubject {
  stream: BacStream;
  subject_id: string;
  coefficient: number;
  is_optional: boolean;
}

export interface Topic {
  id: string;
  subject_id: string;
  code: string;
  name_fr: string;
  name_ar: string;
  description_fr?: string;
  description_ar?: string;
  display_order: number;
  exam_relevance_weight: number;
}

export interface Skill {
  id: string;
  topic_id: string;
  code: string;
  name_fr: string;
  name_ar: string;
  description_fr?: string;
  difficulty_level: number; // 1-5
  exam_relevance_weight: number;
  display_order: number;
}

export interface SkillPrerequisite {
  skill_id: string;
  prerequisite_skill_id: string;
}

// --- Item (Question) Models ---

export interface McqQuestion {
  stem: string;
  stem_ar?: string;
  choices: string[];
  correct_index: number;
  latex?: boolean;
  image_url?: string;
}

export interface NumericQuestion {
  stem: string;
  stem_ar?: string;
  correct_value: number;
  tolerance: number;
  unit?: string;
  latex?: boolean;
}

export interface ShortTextQuestion {
  stem: string;
  stem_ar?: string;
  acceptable_answers: string[];
  case_sensitive: boolean;
}

export interface TrueFalseQuestion {
  stem: string;
  stem_ar?: string;
  correct_answer: boolean;
}

export interface Explanation {
  text_fr: string;
  text_ar?: string;
  steps?: string[];
  reference?: string;
}

export interface Item {
  id: string;
  skill_id: string;
  item_type: ItemType;
  difficulty_level: number;
  content_language: ContentLanguage;
  question: McqQuestion | NumericQuestion | ShortTextQuestion | TrueFalseQuestion;
  explanation?: Explanation;
  hint?: { text_fr: string; text_ar?: string };
  tags: string[];
  is_active: boolean;
}

// --- User Learning State ---

export interface UserSkillState {
  user_id: string;
  skill_id: string;
  half_life_hours: number;
  last_reviewed_at?: string;
  mastery: MasteryLevel;
  num_attempts: number;
  num_correct: number;
  current_streak: number;
  best_streak: number;
  estimated_ability: number;
  first_seen_at?: string;
  unlocked_at?: string;
  mastered_at?: string;
  // Computed at query time
  strength?: number; // 0-1
}

export interface UserItemHistory {
  id: string;
  user_id: string;
  item_id: string;
  skill_id: string;
  session_id?: string;
  is_correct: boolean;
  response_time_ms?: number;
  user_answer?: unknown;
  difficulty_at_time: number;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  session_type: SessionType;
  started_at: string;
  completed_at?: string;
  duration_seconds?: number;
  num_items: number;
  num_correct: number;
  xp_earned: number;
  subject_ids: string[];
  skill_ids: string[];
}

// --- Gamification ---

export interface Badge {
  id: string;
  code: string;
  name_fr: string;
  name_ar: string;
  description_fr?: string;
  icon?: string;
  category: 'mastery' | 'streak' | 'challenge' | 'mock_exam';
  criteria: Record<string, unknown>;
}

export interface DailyActivity {
  user_id: string;
  activity_date: string;
  minutes_practiced: number;
  items_completed: number;
  items_correct: number;
  xp_earned: number;
  streak_maintained: boolean;
}

// --- API Request/Response Types ---

export interface NextSessionRequest {
  user_id: string;
  subject_id?: string;      // optional: focus on a specific subject
  session_type?: SessionType;
  max_items?: number;        // default 15
}

export interface NextSessionResponse {
  session_id: string;
  items: SessionItem[];
  estimated_duration_minutes: number;
  skill_focus: { skill_id: string; name_fr: string; strength: number }[];
}

export interface SessionItem {
  item: Item;
  skill: Pick<Skill, 'id' | 'name_fr' | 'name_ar' | 'difficulty_level'>;
  reason: 'review' | 'new' | 'weak' | 'exam_priority';
}

export interface SubmitAnswerRequest {
  user_id: string;
  session_id: string;
  item_id: string;
  skill_id: string;
  is_correct: boolean;
  response_time_ms: number;
  user_answer: unknown;
}

export interface SubmitAnswerResponse {
  xp_earned: number;
  updated_strength: number;
  updated_mastery: MasteryLevel;
  streak: number;
  explanation?: Explanation;
  badges_earned?: Badge[];
}

export interface ProgressSummary {
  user: Pick<Profile, 'streak_current' | 'total_xp' | 'daily_goal_minutes'>;
  subjects: SubjectProgress[];
  today: DailyActivity;
  days_until_exam: number;
}

export interface SubjectProgress {
  subject: Subject;
  total_skills: number;
  mastered_skills: number;
  average_strength: number;
  topics: TopicProgress[];
}

export interface TopicProgress {
  topic: Topic;
  skills: SkillProgress[];
}

export interface SkillProgress {
  skill: Skill;
  state: UserSkillState;
}

// --- Skill Map Schema (for curriculum import) ---

export interface SkillMapEntry {
  subject_id: string;
  topic_id: string;
  subtopic_id: string;
  difficulty_level: number;
  prerequisites: string[];
  exam_relevance_weight: number;
  question_templates: ItemType[];
}
