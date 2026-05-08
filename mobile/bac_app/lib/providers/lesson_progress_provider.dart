import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'auth_provider.dart';

/// Per-user, per-skill lesson checkpoint progress.
///
/// `passedKeys` are strings of the form "${sectionIdx}.${blockIdx}.${qIdx}"
/// matching the keying used by `_LongLessonScreenState._checkpointPassed`.
///
/// Reads/writes the `user_lesson_progress` table created by migration 015.
class LessonProgressNotifier extends FamilyAsyncNotifier<Set<String>, String> {
  Timer? _writeTimer;
  Set<String> _pending = {};

  SupabaseClient get _supabase => Supabase.instance.client;

  @override
  Future<Set<String>> build(String skillId) async {
    // Cancel any pending debounced write when the family arg changes.
    ref.onDispose(() {
      _writeTimer?.cancel();
    });

    final user = _supabase.auth.currentUser;
    if (user == null) return <String>{};

    try {
      final row = await _supabase
          .from('user_lesson_progress')
          .select('passed_keys')
          .eq('user_id', user.id)
          .eq('skill_id', skillId)
          .maybeSingle();
      if (row == null) return <String>{};
      final keys = (row['passed_keys'] as List?) ?? const [];
      return keys.whereType<String>().toSet();
    } catch (_) {
      // Soft-fail: progress will live in memory only this session.
      return <String>{};
    }
  }

  /// Mark a checkpoint question as passed. Returns the new set immediately
  /// for snappy UI; persistence is debounced (1s) so a fast pass-burst
  /// doesn't hammer the DB.
  Future<void> markPassed(String key) async {
    final current = state.valueOrNull ?? <String>{};
    if (current.contains(key)) return; // already passed
    final next = {...current, key};
    state = AsyncData(next);

    _pending = next;
    _writeTimer?.cancel();
    _writeTimer = Timer(const Duration(milliseconds: 800), _flush);
  }

  Future<void> _flush() async {
    final user = _supabase.auth.currentUser;
    if (user == null) return;
    final keys = _pending.toList();
    try {
      await _supabase.from('user_lesson_progress').upsert({
        'user_id': user.id,
        'skill_id': arg,
        'passed_keys': keys,
        'updated_at': DateTime.now().toUtc().toIso8601String(),
      }, onConflict: 'user_id,skill_id');
    } catch (_) {
      // Silent fail — UI already shows passed; we'll retry on next mark.
    }
  }
}

final lessonProgressProvider =
    AsyncNotifierProvider.family<LessonProgressNotifier, Set<String>, String>(
  LessonProgressNotifier.new,
);

/// The single most-recently-updated lesson the user has touched but not
/// finished — fuels the "Continue learning" card on Home.
final continueLearningProvider =
    FutureProvider<Map<String, dynamic>?>((ref) async {
  final supabase = Supabase.instance.client;
  final user = supabase.auth.currentUser;
  if (user == null) return null;
  // Watch auth state so we re-fetch after login.
  ref.watch(authStateProvider);
  try {
    final rows = await supabase
        .from('user_lesson_progress')
        .select('skill_id, passed_keys, updated_at, skills(id, name_fr, code, topic_id)')
        .eq('user_id', user.id)
        .order('updated_at', ascending: false)
        .limit(1);
    if (rows.isEmpty) return null;
    return Map<String, dynamic>.from(rows.first as Map);
  } catch (_) {
    return null;
  }
});
