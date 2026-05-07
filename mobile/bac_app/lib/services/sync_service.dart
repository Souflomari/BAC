import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'cache_service.dart';
import 'api_service.dart';
import '../providers/auth_provider.dart';

final syncServiceProvider = Provider<SyncService>((ref) {
  return SyncService(
    api: ref.read(apiServiceProvider),
    cache: ref.read(cacheServiceProvider),
  );
});

final cacheServiceProvider = Provider<CacheService>((ref) {
  return CacheService();
});

class SyncService {
  final ApiService api;
  final CacheService cache;

  SyncService({required this.api, required this.cache});

  Future<int> syncPendingAnswers() async {
    final pending = cache.getPendingAnswers();
    if (pending.isEmpty) return 0;

    int synced = 0;
    for (final answer in pending) {
      try {
        await api.submitAnswer(
          sessionId: answer['session_id'] as String,
          itemId: answer['item_id'] as String,
          skillId: answer['skill_id'] as String,
          isCorrect: answer['is_correct'] as bool,
          responseTimeMs: answer['response_time_ms'] as int? ?? 0,
          userAnswer: answer['user_answer'],
          hintUsed: answer['hint_used'] as bool? ?? false,
        );
        synced++;
      } catch (e) {
        debugPrint('Sync error for answer ${answer['item_id']}: $e');
        continue;
      }
    }

    if (synced > 0 && synced == pending.length) {
      await cache.clearPendingAnswers();
    } else if (synced > 0) {
      // Partial sync: re-queue only the unsynced answers
      final remaining = pending.sublist(synced);
      await cache.clearPendingAnswers();
      for (final answer in remaining) {
        await cache.queueAnswer(answer);
      }
    }

    return synced;
  }

  Future<void> refreshCaches() async {
    try {
      final profile = await api.getProfile();
      await cache.cacheProfile(profile.toJson());
    } catch (e) {
      debugPrint('Profile refresh error: $e');
    }
  }
}
