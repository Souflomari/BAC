import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/item.dart';
import '../models/session.dart';
import '../services/api_service.dart';
import '../services/cache_service.dart';
import '../services/sync_service.dart';
import 'auth_provider.dart';
import 'connectivity_provider.dart';

/// State for an active learning session
class SessionState {
  final LearningSession? session;
  final int currentIndex;
  final bool isLoading;
  final bool isSubmitting;
  final String? error;
  final AnswerResult? lastResult;
  final List<ItemAnswer> answers;
  final DateTime? sessionStartTime;
  final DateTime? itemStartTime;

  const SessionState({
    this.session,
    this.currentIndex = 0,
    this.isLoading = false,
    this.isSubmitting = false,
    this.error,
    this.lastResult,
    this.answers = const [],
    this.sessionStartTime,
    this.itemStartTime,
  });

  SessionItem? get currentItem {
    if (session == null || currentIndex >= session!.items.length) return null;
    return session!.items[currentIndex];
  }

  bool get isComplete =>
      session != null && currentIndex >= session!.items.length;

  int get totalItems => session?.items.length ?? 0;
  int get correctAnswers => answers.where((a) => a.isCorrect).length;
  int get totalXp => answers.fold(0, (sum, a) => sum + a.xpEarned);

  double get accuracy =>
      answers.isNotEmpty ? correctAnswers / answers.length : 0;

  SessionState copyWith({
    LearningSession? session,
    int? currentIndex,
    bool? isLoading,
    bool? isSubmitting,
    String? error,
    AnswerResult? lastResult,
    bool clearLastResult = false,
    List<ItemAnswer>? answers,
    DateTime? sessionStartTime,
    DateTime? itemStartTime,
  }) {
    return SessionState(
      session: session ?? this.session,
      currentIndex: currentIndex ?? this.currentIndex,
      isLoading: isLoading ?? this.isLoading,
      isSubmitting: isSubmitting ?? this.isSubmitting,
      error: error,
      lastResult: clearLastResult ? null : (lastResult ?? this.lastResult),
      answers: answers ?? this.answers,
      sessionStartTime: sessionStartTime ?? this.sessionStartTime,
      itemStartTime: itemStartTime ?? this.itemStartTime,
    );
  }
}

class ItemAnswer {
  final String itemId;
  final String skillId;
  final bool isCorrect;
  final int responseTimeMs;
  final dynamic userAnswer;
  final int xpEarned;

  const ItemAnswer({
    required this.itemId,
    required this.skillId,
    required this.isCorrect,
    required this.responseTimeMs,
    required this.userAnswer,
    this.xpEarned = 0,
  });
}

class SessionNotifier extends StateNotifier<SessionState> {
  final ApiService _api;
  final CacheService _cache;
  final bool Function() _checkOnline;

  SessionNotifier(this._api, this._cache, this._checkOnline) : super(const SessionState());

  /// Start a new session
  Future<void> startSession({
    String? subjectId,
    String? skillId,
    String sessionType = 'practice',
    int maxItems = 15,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final session = await _api.getNextSession(
        subjectId: subjectId,
        skillId: skillId,
        maxItems: maxItems,
        sessionType: sessionType,
      );

      // Cache for offline use
      _cache.cacheSession({
        'session_id': session.id,
        'items': session.items.map((i) => i.toJson()).toList(),
        'estimated_duration_minutes': session.estimatedDurationMinutes,
        'skill_focus': session.skillFocus.map((sf) => {
          'skill_id': sf.skillId,
          'name_fr': sf.nameFr,
          'strength': sf.strength,
        }).toList(),
      });

      state = SessionState(
        session: session,
        currentIndex: 0,
        isLoading: false,
        answers: [],
        sessionStartTime: DateTime.now(),
        itemStartTime: DateTime.now(),
      );
    } catch (e) {
      // Try cached session when offline
      final cached = _cache.getCachedSession();
      if (cached != null) {
        final session = LearningSession.fromJson(cached);
        state = SessionState(
          session: session,
          currentIndex: 0,
          isLoading: false,
          answers: [],
          sessionStartTime: DateTime.now(),
          itemStartTime: DateTime.now(),
        );
      } else {
        state = state.copyWith(isLoading: false, error: e.toString());
      }
    }
  }

  /// Submit answer for current item
  Future<AnswerResult?> submitAnswer({
    required bool isCorrect,
    required dynamic userAnswer,
    bool hintUsed = false,
  }) async {
    final item = state.currentItem;
    if (item == null || state.isSubmitting) return null;

    state = state.copyWith(isSubmitting: true);

    final responseTimeMs = state.itemStartTime != null
        ? DateTime.now().difference(state.itemStartTime!).inMilliseconds
        : 10000;

    final session = state.session;
    if (session == null) {
      state = state.copyWith(isSubmitting: false, error: 'Session introuvable');
      return null;
    }

    // If offline, queue the answer locally
    if (!_checkOnline()) {
      await _cache.queueAnswer({
        'session_id': session.id,
        'item_id': item.item.id,
        'skill_id': item.skillId,
        'is_correct': isCorrect,
        'response_time_ms': responseTimeMs,
        'user_answer': userAnswer,
        'hint_used': hintUsed,
      });

      final offlineResult = AnswerResult(
        xpEarned: isCorrect ? 10 : 2,
        updatedStrength: 0,
        updatedMastery: 'novice',
        streak: 0,
      );

      final answer = ItemAnswer(
        itemId: item.item.id,
        skillId: item.skillId,
        isCorrect: isCorrect,
        responseTimeMs: responseTimeMs,
        userAnswer: userAnswer,
        xpEarned: offlineResult.xpEarned,
      );

      state = state.copyWith(
        isSubmitting: false,
        lastResult: offlineResult,
        answers: [...state.answers, answer],
      );

      return offlineResult;
    }

    try {
      final result = await _api.submitAnswer(
        sessionId: session.id,
        itemId: item.item.id,
        skillId: item.skillId,
        isCorrect: isCorrect,
        responseTimeMs: responseTimeMs,
        userAnswer: userAnswer,
        hintUsed: hintUsed,
      );

      final answer = ItemAnswer(
        itemId: item.item.id,
        skillId: item.skillId,
        isCorrect: isCorrect,
        responseTimeMs: responseTimeMs,
        userAnswer: userAnswer,
        xpEarned: result.xpEarned,
      );

      state = state.copyWith(
        isSubmitting: false,
        lastResult: result,
        answers: [...state.answers, answer],
      );

      return result;
    } catch (e) {
      // Queue answer if submission fails (connectivity issue)
      await _cache.queueAnswer({
        'session_id': session.id,
        'item_id': item.item.id,
        'skill_id': item.skillId,
        'is_correct': isCorrect,
        'response_time_ms': responseTimeMs,
        'user_answer': userAnswer,
        'hint_used': hintUsed,
      });

      final fallbackResult = AnswerResult(
        xpEarned: isCorrect ? 10 : 2,
        updatedStrength: 0,
        updatedMastery: 'novice',
        streak: 0,
      );

      final answer = ItemAnswer(
        itemId: item.item.id,
        skillId: item.skillId,
        isCorrect: isCorrect,
        responseTimeMs: responseTimeMs,
        userAnswer: userAnswer,
        xpEarned: fallbackResult.xpEarned,
      );

      state = state.copyWith(
        isSubmitting: false,
        lastResult: fallbackResult,
        answers: [...state.answers, answer],
      );

      return fallbackResult;
    }
  }

  /// Move to next item
  void nextItem() {
    state = state.copyWith(
      currentIndex: state.currentIndex + 1,
      clearLastResult: true,
      error: null,
      itemStartTime: DateTime.now(),
    );
  }

  /// Reset session
  void reset() {
    state = const SessionState();
  }
}

final sessionProvider =
    StateNotifierProvider<SessionNotifier, SessionState>((ref) {
  final api = ref.read(apiServiceProvider);
  final cache = ref.read(cacheServiceProvider);
  bool checkOnline() => ref.read(isOnlineProvider);
  return SessionNotifier(api, cache, checkOnline);
});
