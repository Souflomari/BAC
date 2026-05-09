import 'dart:typed_data';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/models.dart';
import '../models/session.dart' as session_models;
import '../models/exam.dart';

/// Central API service wrapping Supabase client + edge functions
class ApiService {
  final SupabaseClient _client;

  ApiService() : _client = Supabase.instance.client;

  // --- Auth ---

  Future<AuthResponse> signUp(String email, String password, {String? displayName}) {
    return _client.auth.signUp(
      email: email,
      password: password,
      data: displayName != null ? {'display_name': displayName} : null,
    );
  }

  Future<AuthResponse> signIn(String email, String password) {
    return _client.auth.signInWithPassword(email: email, password: password);
  }

  Future<void> signOut() => _client.auth.signOut();

  User? get currentUser => _client.auth.currentUser;

  Stream<AuthState> get authStateChanges => _client.auth.onAuthStateChange;

  // --- Profile ---

  Future<Profile> getProfile() async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');
    final data = await _client
        .from('profiles')
        .select()
        .eq('id', userId)
        .single();
    return Profile.fromJson(data);
  }

  Future<void> updateProfile(Profile profile) async {
    await _client
        .from('profiles')
        .update(profile.toJson())
        .eq('id', profile.id);
  }

  /// Partial profile update. Only provided fields are written, so callers
  /// can change a single column (e.g. just display_name or just avatar_url)
  /// without nuking the rest.
  Future<void> patchProfile({
    String? displayName,
    String? avatarUrl,
    BacStream? bacStream,
    DateTime? examDate,
    int? dailyGoalMinutes,
    bool? onboardingCompleted,
  }) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');
    final patch = Profile.patchJson(
      displayName: displayName,
      avatarUrl: avatarUrl,
      bacStream: bacStream,
      examDate: examDate,
      dailyGoalMinutes: dailyGoalMinutes,
      onboardingCompleted: onboardingCompleted,
    );
    if (patch.isEmpty) return;
    await _client.from('profiles').update(patch).eq('id', userId);
  }

  /// Uploads an avatar image to the `avatars` bucket and returns the public URL.
  /// Path: `avatars/{user_id}/avatar.jpg`. Overwrites existing.
  Future<String> uploadAvatar(List<int> bytes, {String contentType = 'image/jpeg'}) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');
    final path = '$userId/avatar.jpg';
    await _client.storage.from('avatars').uploadBinary(
          path,
          Uint8List.fromList(bytes),
          fileOptions: FileOptions(contentType: contentType, upsert: true),
        );
    final url = _client.storage.from('avatars').getPublicUrl(path);
    // Bust cache so the new image actually shows
    return '$url?v=${DateTime.now().millisecondsSinceEpoch}';
  }

  /// Calls the `delete-self-account` edge function. Cascades happen via FKs
  /// on the user_id columns; the auth.users row is deleted last by the
  /// service-role client inside the edge function.
  Future<void> deleteSelfAccount() async {
    await _client.functions.invoke('delete-self-account');
  }

  // --- Curriculum ---

  Future<List<Subject>> getSubjectsForStream(String stream) async {
    final data = await _client
        .from('stream_subjects')
        .select('coefficient, is_optional, subjects(*)')
        .eq('stream', stream);

    final subjects = (data as List).map((row) {
      final subjectJson = row['subjects'] as Map<String, dynamic>;
      subjectJson['coefficient'] = row['coefficient'];
      return Subject.fromJson(subjectJson);
    }).toList();

    subjects.sort((a, b) => a.displayOrder.compareTo(b.displayOrder));
    return subjects;
  }

  Future<List<Topic>> getTopicsForSubject(String subjectId) async {
    final data = await _client
        .from('topics')
        .select()
        .eq('subject_id', subjectId)
        .order('display_order');
    return (data as List).map((e) => Topic.fromJson(e)).toList();
  }

  Future<List<Skill>> getSkillsForTopic(String topicId) async {
    final data = await _client
        .from('skills')
        .select()
        .eq('topic_id', topicId)
        .order('display_order');
    return (data as List).map((e) => Skill.fromJson(e)).toList();
  }

  Future<Skill> getSkillById(String skillId) async {
    final data = await _client
        .from('skills')
        .select()
        .eq('id', skillId)
        .single();
    return Skill.fromJson(data);
  }

  Future<List<UserSkillState>> getUserSkillStates() async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');
    final data = await _client
        .from('user_skill_states')
        .select()
        .eq('user_id', userId);
    return (data as List).map((e) => UserSkillState.fromJson(e)).toList();
  }

  /// Returns skill states enriched with skill name, topic, and subject info
  Future<List<EnrichedSkillState>> getEnrichedSkillStates() async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');
    final data = await _client
        .from('user_skill_states')
        .select('*, skills(id, name_fr, name_ar, difficulty_level, exam_relevance_weight, topics(id, name_fr, name_ar, exam_relevance_weight, subject_id, subjects(id, code, name_fr, name_ar, color, coefficient)))')
        .eq('user_id', userId);
    return (data as List).map((e) => EnrichedSkillState.fromJson(e)).toList();
  }

  // --- Sessions ---

  Future<session_models.LearningSession> getNextSession({
    String? subjectId,
    String? skillId,
    int maxItems = 15,
    String sessionType = 'practice',
  }) async {
    final params = <String, String>{
      'max_items': maxItems.toString(),
      'session_type': sessionType,
    };
    if (subjectId != null) params['subject_id'] = subjectId;
    if (skillId != null) params['skill_id'] = skillId;

    final response = await _client.functions.invoke(
      'next-session',
      queryParameters: params,
    );

    return session_models.LearningSession.fromJson(response.data as Map<String, dynamic>);
  }

  Future<session_models.AnswerResult> submitAnswer({
    required String sessionId,
    required String itemId,
    required String skillId,
    required bool isCorrect,
    required int responseTimeMs,
    required dynamic userAnswer,
    bool hintUsed = false,
  }) async {
    final response = await _client.functions.invoke(
      'submit-answer',
      body: {
        'session_id': sessionId,
        'item_id': itemId,
        'skill_id': skillId,
        'is_correct': isCorrect,
        'response_time_ms': responseTimeMs,
        'user_answer': userAnswer,
        'hint_used': hintUsed,
      },
    );

    return session_models.AnswerResult.fromJson(response.data as Map<String, dynamic>);
  }

  // --- Progress ---

  Future<ProgressSummary> getProgressSummary() async {
    final response = await _client.functions.invoke('progress');
    return ProgressSummary.fromJson(response.data as Map<String, dynamic>);
  }

  // --- Daily Quests ---

  /// Returns today's quests (server creates them if missing).
  /// Each entry has: id, quest_type, target, current, xp_reward, completed, slot_index.
  Future<List<Map<String, dynamic>>> getDailyQuests() async {
    final response = await _client.functions.invoke('daily-quests');
    final data = response.data as Map<String, dynamic>?;
    final quests = (data?['quests'] as List?) ?? [];
    return quests.cast<Map<String, dynamic>>();
  }

  /// Reports a quest event. Server matches it to in-flight quests and increments
  /// progress atomically. Returns total bonus XP awarded for newly-completed quests.
  Future<int> reportQuestEvent(String event, {int amount = 1}) async {
    final response = await _client.functions.invoke(
      'daily-quests',
      body: {'event': event, 'amount': amount},
    );
    final data = response.data as Map<String, dynamic>?;
    return (data?['bonus_xp'] as int?) ?? 0;
  }

  // --- Daily Activity ---

  Future<List<DailyActivity>> getRecentActivity({int days = 30}) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');
    final startDate = DateTime.now()
        .subtract(Duration(days: days))
        .toIso8601String()
        .split('T')
        .first;

    final data = await _client
        .from('daily_activity')
        .select()
        .eq('user_id', userId)
        .gte('activity_date', startDate)
        .order('activity_date', ascending: false);

    return (data as List).map((e) => DailyActivity.fromJson(e)).toList();
  }

  // --- Bac Exams ---

  Future<List<BacExam>> getExams({ExamFilter? filter}) async {
    var query = _client
        .from('bac_exams')
        .select('*, subjects(name_fr, name_ar)')
        .eq('is_active', true);

    if (filter != null) {
      if (filter.year != null) {
        query = query.eq('year', filter.year!);
      }
      if (filter.session != null) {
        query = query.eq('session', filter.session!.value);
      }
      if (filter.stream != null) {
        query = query.eq('stream', filter.stream!);
      }
      if (filter.subjectId != null) {
        query = query.eq('subject_id', filter.subjectId!);
      }
    }

    final data = await query.order('year', ascending: false);

    return (data as List).map((row) {
      final subject = row['subjects'] as Map<String, dynamic>?;
      return BacExam(
        id: row['id'] as String,
        year: row['year'] as int,
        session: ExamSession.fromValue(row['session'] as String),
        stream: row['stream'] as String,
        subjectId: row['subject_id'] as String,
        subjectName: subject?['name_fr'] as String? ?? '',
        examDate: row['exam_date'] != null
            ? DateTime.parse(row['exam_date'] as String)
            : null,
        durationMinutes: row['duration_minutes'] as int? ?? 180,
        totalScore: row['total_score'] as int? ?? 20,
        pdfUrl: row['pdf_url'] as String?,
        createdAt: DateTime.parse(
            row['created_at'] as String? ?? DateTime.now().toIso8601String()),
      );
    }).toList();
  }

  Future<List<int>> getExamYears() async {
    final data = await _client
        .from('bac_exams')
        .select('year')
        .eq('is_active', true)
        .order('year', ascending: false);

    final years = (data as List)
        .map((row) => row['year'] as int)
        .toSet()
        .toList();
    years.sort((a, b) => b.compareTo(a));
    return years;
  }

  Future<List<Map<String, String>>> getExamSubjects() async {
    final data = await _client
        .from('bac_exams')
        .select('subject_id, subjects(id, name_fr)')
        .eq('is_active', true);

    final subjects = <Map<String, String>>{};
    for (final row in data as List) {
      final subject = row['subjects'] as Map<String, dynamic>?;
      if (subject != null && !subjects.any((s) => s['id'] == subject['id'])) {
        subjects.add({
          'id': subject['id'] as String,
          'name': subject['name_fr'] as String? ?? '',
        });
      }
    }
    return subjects.toList();
  }

  Future<BacExam> getExam(String examId) async {
    final data = await _client
        .from('bac_exams')
        .select('*, subjects(name_fr, name_ar)')
        .eq('id', examId)
        .single();

    final subject = data['subjects'] as Map<String, dynamic>?;
    return BacExam(
      id: data['id'] as String,
      year: data['year'] as int,
      session: ExamSession.fromValue(data['session'] as String),
      stream: data['stream'] as String,
      subjectId: data['subject_id'] as String,
      subjectName: subject?['name_fr'] as String? ?? '',
      examDate: data['exam_date'] != null
          ? DateTime.parse(data['exam_date'] as String)
          : null,
      durationMinutes: data['duration_minutes'] as int? ?? 180,
      totalScore: data['total_score'] as int? ?? 20,
      pdfUrl: data['pdf_url'] as String?,
      createdAt: DateTime.parse(
          data['created_at'] as String? ?? DateTime.now().toIso8601String()),
    );
  }

  Future<List<ExamQuestion>> getExamQuestions(String examId) async {
    final data = await _client
        .from('exam_questions')
        .select()
        .eq('exam_id', examId)
        .eq('is_active', true)
        .order('question_number')
        .order('subquestion_letter');

    return (data as List).map((row) => ExamQuestion.fromJson(row)).toList();
  }

  Future<UserExamProgress?> getUserExamProgress(String examId) async {
    final userId = currentUser?.id;
    if (userId == null) return null;

    final data = await _client
        .from('user_exam_progress')
        .select()
        .eq('user_id', userId)
        .eq('exam_id', examId)
        .order('attempt_number', ascending: false)
        .limit(1);

    if (data.isEmpty) return null;
    return UserExamProgress.fromJson(data.first as Map<String, dynamic>);
  }

  Future<List<UserExamProgress>> getUserExamAttempts(String examId) async {
    final userId = currentUser?.id;
    if (userId == null) return [];

    final data = await _client
        .from('user_exam_progress')
        .select()
        .eq('user_id', userId)
        .eq('exam_id', examId)
        .order('attempt_number', ascending: false);

    return (data as List)
        .map((row) => UserExamProgress.fromJson(row))
        .toList();
  }

  Future<List<BacExam>> getFavoriteExams() async {
    final userId = currentUser?.id;
    if (userId == null) return [];

    final data = await _client
        .from('user_exam_favorites')
        .select('bac_exams(*, subjects(name_fr))')
        .eq('user_id', userId);

    return (data as List).map((row) {
      final exam = row['bac_exams'] as Map<String, dynamic>;
      final subject = exam['subjects'] as Map<String, dynamic>?;
      return BacExam(
        id: exam['id'] as String,
        year: exam['year'] as int,
        session: ExamSession.fromValue(exam['session'] as String),
        stream: exam['stream'] as String,
        subjectId: exam['subject_id'] as String,
        subjectName: subject?['name_fr'] as String? ?? '',
        createdAt: DateTime.parse(exam['created_at'] as String? ??
            DateTime.now().toIso8601String()),
      );
    }).toList();
  }

  Future<UserExamProgress> submitExamProgress({
    required String examId,
    required List<Map<String, dynamic>> questionResults,
    required int timeSpentSeconds,
  }) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    final correctCount = questionResults.where((r) => r['correct'] == true).length;
    final totalPoints = questionResults.fold<int>(
        0, (sum, r) => sum + (r['points_earned'] as int? ?? 0));
    final maxPoints = questionResults.fold<int>(
        0, (sum, r) => sum + (r['points_max'] as int? ?? 1));

    final data = await _client
        .from('user_exam_progress')
            .insert({
          'user_id': userId,
          'exam_id': examId,
          'attempt_number': 1,
          'started_at': DateTime.now()
              .subtract(Duration(seconds: timeSpentSeconds))
              .toIso8601String(),
          'completed_at': DateTime.now().toIso8601String(),
          'score_obtained': totalPoints.toDouble(),
          'score_max': maxPoints,
          'question_results': questionResults,
          'status': 'completed',
          'time_spent_seconds': timeSpentSeconds,
        })
        .select()
        .single();

    return UserExamProgress.fromJson(data);
  }

  Future<void> toggleExamFavorite(String examId) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    final existing = await _client
        .from('user_exam_favorites')
        .select()
        .eq('user_id', userId)
        .eq('exam_id', examId);

    if ((existing as List).isNotEmpty) {
      await _client
          .from('user_exam_favorites')
          .delete()
          .eq('user_id', userId)
          .eq('exam_id', examId);
    } else {
      await _client
          .from('user_exam_favorites')
          .insert({'user_id': userId, 'exam_id': examId});
    }
  }

  Future<void> updateExamProgressNotes(String examId, String notes) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    await _client
        .from('user_exam_progress')
        .update({'personal_notes': notes})
        .eq('user_id', userId)
        .eq('exam_id', examId);
  }

  Future<void> bookmarkExamQuestion(String examId, String questionId) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    await _client
        .from('user_exam_question_bookmarks')
        .upsert({
          'user_id': userId,
          'exam_id': examId,
          'question_id': questionId,
        });
  }

  Future<void> unbookmarkExamQuestion(String examId, String questionId) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    await _client
        .from('user_exam_question_bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('exam_id', examId)
        .eq('question_id', questionId);
  }

  Future<List<String>> getBookmarkedQuestions(String examId) async {
    final userId = currentUser?.id;
    if (userId == null) return [];

    final data = await _client
        .from('user_exam_question_bookmarks')
        .select('question_id')
        .eq('user_id', userId)
        .eq('exam_id', examId);

    return (data as List)
        .map((row) => row['question_id'] as String)
        .toList();
  }

  // --- Analytics ---

  Future<Map<String, dynamic>> getExamAnalytics() async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    final response = await _client.functions.invoke('exam-analytics');
    return response.data as Map<String, dynamic>;
  }

  Future<List<Map<String, dynamic>>> getExamHistory({
    int limit = 50,
    int offset = 0,
  }) async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    final data = await _client
        .from('user_exam_progress')
        .select('*, bac_exams(year, stream, session, subjects(name_fr))')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('completed_at', ascending: false)
        .limit(limit)
        .range(offset, offset + limit - 1);

    return (data as List).cast<Map<String, dynamic>>();
  }

  Future<Map<String, int>> getSubjectPerformance() async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    final data = await _client
        .from('user_exam_progress')
        .select('''
            bac_exams!inner(subject_id),
            score_obtained,
            score_max
        ''')
        .eq('user_id', userId)
        .eq('status', 'completed');

    final performance = <String, List<double>>{};
    for (final row in data as List) {
      final exam = row['bac_exams'] as Map<String, dynamic>;
      final subjectId = exam['subject_id'] as String;
      final score = (row['score_obtained'] as num?)?.toDouble() ?? 0;
      final maxScore = (row['score_max'] as num?)?.toDouble() ?? 20;
      
      performance.putIfAbsent(subjectId, () => []);
      if (maxScore > 0) {
        performance[subjectId]!.add(score / maxScore * 100);
      }
    }

    return performance.map((key, scores) {
      final avg = scores.isNotEmpty 
          ? scores.reduce((a, b) => a + b) / scores.length 
          : 0.0;
      return MapEntry(key, avg.round());
    });
  }

  Future<List<Map<String, dynamic>>> getWeakTopics() async {
    final userId = currentUser?.id;
    if (userId == null) throw Exception('Non authentifié');

    // Get skills with lowest mastery
    final data = await _client
        .from('user_skill_states')
        .select('*, skills(topic_id, topics(subject_id))')
        .eq('user_id', userId)
        .order('mastery_percentage', ascending: true)
        .limit(10);

    return (data as List).cast<Map<String, dynamic>>();
  }

  // --- Leaderboard ---

  /// Returns top users by total_xp, optionally filtered by stream.
  /// Each row: { id, display_name, avatar_url, total_xp, streak_current, bac_stream }
  Future<List<Map<String, dynamic>>> getLeaderboard({
    String? stream,
    int limit = 50,
  }) async {
    var query = _client
        .from('profiles')
        .select('id, display_name, avatar_url, total_xp, streak_current, bac_stream');

    if (stream != null) {
      query = query.eq('bac_stream', stream);
    }

    final data = await query
        .order('total_xp', ascending: false)
        .limit(limit);

    return (data as List).cast<Map<String, dynamic>>();
  }
}
