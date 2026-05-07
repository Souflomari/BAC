import 'subject.dart';

class ProgressSummary {
  final int streakCurrent;
  final int totalXp;
  final int dailyGoalMinutes;
  final List<SubjectProgress> subjects;
  final DailyActivity today;
  final int daysUntilExam;

  const ProgressSummary({
    required this.streakCurrent,
    required this.totalXp,
    required this.dailyGoalMinutes,
    required this.subjects,
    required this.today,
    required this.daysUntilExam,
  });

  factory ProgressSummary.fromJson(Map<String, dynamic> json) {
    final user = json['user'] as Map<String, dynamic>;
    return ProgressSummary(
      streakCurrent: user['streak_current'] as int? ?? 0,
      totalXp: user['total_xp'] as int? ?? 0,
      dailyGoalMinutes: user['daily_goal_minutes'] as int? ?? 15,
      subjects: (json['subjects'] as List?)
              ?.map((e) => SubjectProgress.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      today: DailyActivity.fromJson(json['today'] as Map<String, dynamic>? ?? {}),
      daysUntilExam: json['days_until_exam'] as int? ?? 0,
    );
  }
}

class SubjectProgress {
  final Subject subject;
  final double coefficient;
  final int totalSkills;
  final int masteredSkills;
  final double averageStrength;

  const SubjectProgress({
    required this.subject,
    this.coefficient = 1.0,
    this.totalSkills = 0,
    this.masteredSkills = 0,
    this.averageStrength = 0,
  });

  double get completionPercent =>
      totalSkills > 0 ? masteredSkills / totalSkills : 0;

  factory SubjectProgress.fromJson(Map<String, dynamic> json) {
    return SubjectProgress(
      subject: Subject.fromJson(json['subject'] as Map<String, dynamic>),
      coefficient: (json['coefficient'] as num?)?.toDouble() ?? 1.0,
      totalSkills: json['total_skills'] as int? ?? 0,
      masteredSkills: json['mastered_skills'] as int? ?? 0,
      averageStrength: (json['average_strength'] as num?)?.toDouble() ?? 0,
    );
  }
}

class DailyActivity {
  final int minutesPracticed;
  final int itemsCompleted;
  final int itemsCorrect;
  final int xpEarned;
  final bool streakMaintained;

  const DailyActivity({
    this.minutesPracticed = 0,
    this.itemsCompleted = 0,
    this.itemsCorrect = 0,
    this.xpEarned = 0,
    this.streakMaintained = false,
  });

  double get accuracy =>
      itemsCompleted > 0 ? itemsCorrect / itemsCompleted : 0;

  factory DailyActivity.fromJson(Map<String, dynamic> json) {
    return DailyActivity(
      minutesPracticed: json['minutes_practiced'] as int? ?? 0,
      itemsCompleted: json['items_completed'] as int? ?? 0,
      itemsCorrect: json['items_correct'] as int? ?? 0,
      xpEarned: json['xp_earned'] as int? ?? 0,
      streakMaintained: json['streak_maintained'] as bool? ?? false,
    );
  }
}
