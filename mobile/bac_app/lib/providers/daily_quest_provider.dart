import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/daily_quest.dart';
import '../services/api_service.dart';
import 'auth_provider.dart';

const _prefsKey = 'daily_quests_v1';
const _prefsDateKey = 'daily_quests_date';
const _prefsRemoteIdsKey = 'daily_quests_remote_ids_v1';

/// Quest event types fed into the controller from the session flow.
enum QuestEvent {
  correctAnswer,
  studyMinute,
  reviewedFadingSkill,
  sessionCompleted,
}

extension on QuestEvent {
  String get wireName {
    switch (this) {
      case QuestEvent.correctAnswer:
        return 'correctAnswer';
      case QuestEvent.studyMinute:
        return 'studyMinute';
      case QuestEvent.reviewedFadingSkill:
        return 'reviewedFadingSkill';
      case QuestEvent.sessionCompleted:
        return 'sessionCompleted';
    }
  }
}

class DailyQuestsState {
  final List<DailyQuest> quests;
  final int perfectStreakCounter;
  final int pendingBonusXp;

  const DailyQuestsState({
    required this.quests,
    this.perfectStreakCounter = 0,
    this.pendingBonusXp = 0,
  });

  DailyQuestsState copyWith({
    List<DailyQuest>? quests,
    int? perfectStreakCounter,
    int? pendingBonusXp,
  }) {
    return DailyQuestsState(
      quests: quests ?? this.quests,
      perfectStreakCounter: perfectStreakCounter ?? this.perfectStreakCounter,
      pendingBonusXp: pendingBonusXp ?? this.pendingBonusXp,
    );
  }

  bool get allCompleted => quests.isNotEmpty && quests.every((q) => q.isComplete);
  int get completedCount => quests.where((q) => q.isComplete).length;
}

class DailyQuestsNotifier extends StateNotifier<DailyQuestsState> {
  final ApiService _api;

  DailyQuestsNotifier(this._api) : super(const DailyQuestsState(quests: [])) {
    _load();
  }

  String _todayKey(DateTime date) =>
      '${date.year.toString().padLeft(4, '0')}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';

  /// Load order: try backend → fall back to cache → fall back to local generator.
  /// Backend is source of truth; local generator matches the server's deterministic
  /// algorithm so offline-generated quests merge seamlessly when reconciled.
  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final today = _todayKey(DateTime.now());

    // 1. Restore cache first for instant UI
    final cachedDate = prefs.getString(_prefsDateKey);
    if (cachedDate == today) {
      final json = prefs.getString(_prefsKey);
      if (json != null) {
        try {
          final list = (jsonDecode(json) as List).cast<Map<String, dynamic>>();
          state = state.copyWith(quests: list.map(DailyQuest.fromJson).toList());
        } catch (_) {/* ignore — fetch from backend */}
      }
    }

    // 2. Fetch from backend (source of truth)
    try {
      final remote = await _api.getDailyQuests();
      final remoteIds = <String>[];
      final quests = remote.map((row) {
        remoteIds.add(row['id'] as String);
        return DailyQuest(
          type: QuestType.fromValue(row['quest_type'] as String),
          target: row['target'] as int,
          current: row['current'] as int? ?? 0,
          xpReward: row['xp_reward'] as int,
          completed: row['completed'] as bool? ?? false,
          rewardClaimed: row['reward_claimed'] as bool? ?? false,
        );
      }).toList();

      state = state.copyWith(quests: quests);
      await prefs.setString(_prefsDateKey, today);
      await prefs.setStringList(_prefsRemoteIdsKey, remoteIds);
      await _persist();
      return;
    } catch (e) {
      debugPrint('daily_quests: backend fetch failed, using local fallback: $e');
    }

    // 3. Backend unreachable AND no cache — generate locally as last resort
    if (state.quests.isEmpty) {
      final newQuests = QuestGenerator.generateForDate(DateTime.now());
      state = DailyQuestsState(quests: newQuests);
      await prefs.setString(_prefsDateKey, today);
      await _persist();
    }
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    final json = jsonEncode(state.quests.map((q) => q.toJson()).toList());
    await prefs.setString(_prefsKey, json);
  }

  /// Record an event. Sends to backend (authoritative) and applies optimistic
  /// local update. If backend fails, the local update still gives instant UI
  /// feedback — next successful _load() will reconcile from server truth.
  Future<int> recordEvent(QuestEvent event, {int amount = 1}) async {
    // Optimistic local update
    final localBonus = _applyLocal(event, amount);

    // Best-effort backend sync
    try {
      final serverBonus = await _api.reportQuestEvent(event.wireName, amount: amount);
      // Server is authoritative for XP awarded; reconcile if drifted
      if (serverBonus != localBonus) {
        state = state.copyWith(
          pendingBonusXp: state.pendingBonusXp - localBonus + serverBonus,
        );
      }
      return serverBonus;
    } catch (e) {
      debugPrint('daily_quests: event sync failed (will reconcile on next load): $e');
      return localBonus;
    }
  }

  int _applyLocal(QuestEvent event, int amount) {
    var bonusXp = 0;
    final updated = <DailyQuest>[];

    var newPerfectStreak = state.perfectStreakCounter;
    if (event == QuestEvent.correctAnswer) {
      newPerfectStreak += amount;
    }

    for (final quest in state.quests) {
      if (quest.isComplete) {
        updated.add(quest);
        continue;
      }

      var newCurrent = quest.current;
      switch (quest.type) {
        case QuestType.correctAnswers:
          if (event == QuestEvent.correctAnswer) newCurrent += amount;
          break;
        case QuestType.studyMinutes:
          if (event == QuestEvent.studyMinute) newCurrent += amount;
          break;
        case QuestType.reviewSkills:
          if (event == QuestEvent.reviewedFadingSkill) newCurrent += amount;
          break;
        case QuestType.completeSession:
          if (event == QuestEvent.sessionCompleted) newCurrent += amount;
          break;
        case QuestType.perfectStreak:
          if (event == QuestEvent.correctAnswer) {
            newCurrent = newPerfectStreak.clamp(0, quest.target);
          }
          break;
      }

      final justCompleted = newCurrent >= quest.target && !quest.completed;
      if (justCompleted) {
        bonusXp += quest.xpReward;
        updated.add(quest.copyWith(current: newCurrent, completed: true));
      } else {
        updated.add(quest.copyWith(current: newCurrent));
      }
    }

    state = state.copyWith(
      quests: updated,
      perfectStreakCounter: newPerfectStreak,
      pendingBonusXp: state.pendingBonusXp + bonusXp,
    );
    _persist();
    return bonusXp;
  }

  /// Call when a wrong answer breaks the perfect streak counter.
  void resetPerfectStreak() {
    state = state.copyWith(perfectStreakCounter: 0);
  }

  /// Mark pending bonus XP as displayed/consumed.
  void clearPendingBonus() {
    state = state.copyWith(pendingBonusXp: 0);
  }

  /// Force refresh (e.g., after midnight crossing or manual pull-to-refresh).
  Future<void> refresh() => _load();
}

final dailyQuestsProvider =
    StateNotifierProvider<DailyQuestsNotifier, DailyQuestsState>((ref) {
  return DailyQuestsNotifier(ref.read(apiServiceProvider));
});
