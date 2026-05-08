import 'package:flutter/foundation.dart' show debugPrint;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/progress.dart';
import '../models/subject.dart';
import '../models/skill.dart';
import 'auth_provider.dart';

/// Provides progress summary data
final progressProvider = FutureProvider<ProgressSummary>((ref) async {
  // Re-fetch when auth changes
  final authState = ref.watch(authStateProvider);
  if (authState.valueOrNull?.session == null) {
    throw Exception('Non authentifié');
  }
  final api = ref.read(apiServiceProvider);
  return api.getProgressSummary();
});

/// Provides subjects for the current user's stream
final subjectsProvider = FutureProvider<List<Subject>>((ref) async {
  try {
    final profile = await ref.watch(profileProvider.future);
    if (profile == null) return [];
    final api = ref.read(apiServiceProvider);
    return api.getSubjectsForStream(profile.bacStream.value);
  } catch (e) {
    debugPrint('subjectsProvider error: $e');
    return [];
  }
});

/// Provides user's skill states
final skillStatesProvider = FutureProvider<List<UserSkillState>>((ref) async {
  ref.watch(authStateProvider);
  final api = ref.read(apiServiceProvider);
  return api.getUserSkillStates();
});

/// Provides enriched skill states with skill/topic/subject metadata (for analytics)
final enrichedSkillStatesProvider = FutureProvider<List<EnrichedSkillState>>((ref) async {
  ref.watch(authStateProvider);
  final api = ref.read(apiServiceProvider);
  return api.getEnrichedSkillStates();
});

/// Provides topics for a specific subject
final topicsProvider =
    FutureProvider.family<List<Topic>, String>((ref, subjectId) async {
  final api = ref.read(apiServiceProvider);
  return api.getTopicsForSubject(subjectId);
});

/// Provides skills for a specific topic
final skillsProvider =
    FutureProvider.family<List<Skill>, String>((ref, topicId) async {
  final api = ref.read(apiServiceProvider);
  return api.getSkillsForTopic(topicId);
});

/// Provides a single skill by ID (for lesson screen)
final skillByIdProvider =
    FutureProvider.family<Skill, String>((ref, skillId) async {
  final api = ref.read(apiServiceProvider);
  return api.getSkillById(skillId);
});

/// All topics across all subjects — fuels global search.
final allTopicsProvider = FutureProvider<List<Topic>>((ref) async {
  final subjects = await ref.watch(subjectsProvider.future);
  final api = ref.read(apiServiceProvider);
  final results = <Topic>[];
  for (final s in subjects) {
    try {
      final topics = await api.getTopicsForSubject(s.id);
      results.addAll(topics);
    } catch (_) {
      // skip subject if fetch fails
    }
  }
  return results;
});

/// All skills across all topics — fuels global search. Heavy fetch; cached
/// by Riverpod, refreshed only on invalidate.
final allSkillsProvider = FutureProvider<List<Skill>>((ref) async {
  final topics = await ref.watch(allTopicsProvider.future);
  final api = ref.read(apiServiceProvider);
  final results = <Skill>[];
  for (final t in topics) {
    try {
      final skills = await api.getSkillsForTopic(t.id);
      results.addAll(skills);
    } catch (_) {
      // skip topic on failure
    }
  }
  return results;
});
