import 'package:equatable/equatable.dart';

enum QuestType {
  correctAnswers,
  studyMinutes,
  reviewSkills,
  completeSession,
  perfectStreak;

  String get value => name;

  static QuestType fromValue(String v) {
    return QuestType.values.firstWhere(
      (e) => e.name == v,
      orElse: () => QuestType.correctAnswers,
    );
  }
}

class DailyQuest extends Equatable {
  final QuestType type;
  final int target;
  final int current;
  final int xpReward;
  final bool completed;
  final bool rewardClaimed;

  const DailyQuest({
    required this.type,
    required this.target,
    required this.current,
    required this.xpReward,
    this.completed = false,
    this.rewardClaimed = false,
  });

  double get progress => target > 0 ? (current / target).clamp(0.0, 1.0) : 0.0;

  bool get isComplete => completed || current >= target;

  DailyQuest copyWith({
    int? current,
    bool? completed,
    bool? rewardClaimed,
  }) {
    return DailyQuest(
      type: type,
      target: target,
      current: current ?? this.current,
      xpReward: xpReward,
      completed: completed ?? this.completed,
      rewardClaimed: rewardClaimed ?? this.rewardClaimed,
    );
  }

  Map<String, dynamic> toJson() => {
        'type': type.name,
        'target': target,
        'current': current,
        'xp_reward': xpReward,
        'completed': completed,
        'reward_claimed': rewardClaimed,
      };

  factory DailyQuest.fromJson(Map<String, dynamic> json) {
    return DailyQuest(
      type: QuestType.fromValue(json['type'] as String),
      target: json['target'] as int,
      current: json['current'] as int? ?? 0,
      xpReward: json['xp_reward'] as int,
      completed: json['completed'] as bool? ?? false,
      rewardClaimed: json['reward_claimed'] as bool? ?? false,
    );
  }

  @override
  List<Object?> get props => [type, target, current, completed, rewardClaimed];
}

/// Generates today's quests deterministically from the date.
/// Same student always sees the same 3 quests on a given day.
class QuestGenerator {
  static const List<_QuestTemplate> _templates = [
    _QuestTemplate(QuestType.correctAnswers, 5, 20),
    _QuestTemplate(QuestType.correctAnswers, 10, 35),
    _QuestTemplate(QuestType.studyMinutes, 10, 15),
    _QuestTemplate(QuestType.studyMinutes, 15, 25),
    _QuestTemplate(QuestType.reviewSkills, 3, 25),
    _QuestTemplate(QuestType.completeSession, 1, 15),
    _QuestTemplate(QuestType.completeSession, 2, 30),
    _QuestTemplate(QuestType.perfectStreak, 5, 30),
  ];

  /// Returns 3 quests for the given date, deterministic per date.
  static List<DailyQuest> generateForDate(DateTime date) {
    final seed = date.year * 10000 + date.month * 100 + date.day;
    final templates = List<_QuestTemplate>.from(_templates);
    // Fisher-Yates shuffle with deterministic seed
    final rand = _SeededRandom(seed);
    for (var i = templates.length - 1; i > 0; i--) {
      final j = rand.nextInt(i + 1);
      final tmp = templates[i];
      templates[i] = templates[j];
      templates[j] = tmp;
    }

    // Pick 3 with diverse types
    final picked = <_QuestTemplate>[];
    final usedTypes = <QuestType>{};
    for (final t in templates) {
      if (!usedTypes.contains(t.type)) {
        picked.add(t);
        usedTypes.add(t.type);
        if (picked.length == 3) break;
      }
    }

    return picked
        .map((t) => DailyQuest(
              type: t.type,
              target: t.target,
              current: 0,
              xpReward: t.xpReward,
            ))
        .toList();
  }
}

class _QuestTemplate {
  final QuestType type;
  final int target;
  final int xpReward;
  const _QuestTemplate(this.type, this.target, this.xpReward);
}

/// Linear congruential generator for deterministic seeding
class _SeededRandom {
  int _state;
  _SeededRandom(int seed) : _state = seed;

  int nextInt(int max) {
    _state = (_state * 1103515245 + 12345) & 0x7FFFFFFF;
    return _state % max;
  }
}
