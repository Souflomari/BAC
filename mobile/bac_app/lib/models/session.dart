import 'item.dart';

class LearningSession {
  final String id;
  final List<SessionItem> items;
  final int estimatedDurationMinutes;
  final List<SkillFocus> skillFocus;

  const LearningSession({
    required this.id,
    required this.items,
    this.estimatedDurationMinutes = 15,
    this.skillFocus = const [],
  });

  factory LearningSession.fromJson(Map<String, dynamic> json) {
    return LearningSession(
      id: json['session_id'] as String,
      items: (json['items'] as List)
          .map((e) => SessionItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      estimatedDurationMinutes: json['estimated_duration_minutes'] as int? ?? 15,
      skillFocus: (json['skill_focus'] as List?)
              ?.map((e) => SkillFocus.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}

class SkillFocus {
  final String skillId;
  final String nameFr;
  final double strength;

  const SkillFocus({
    required this.skillId,
    required this.nameFr,
    required this.strength,
  });

  factory SkillFocus.fromJson(Map<String, dynamic> json) {
    return SkillFocus(
      skillId: json['skill_id'] as String,
      nameFr: json['name_fr'] as String? ?? '',
      strength: (json['strength'] as num?)?.toDouble() ?? 0,
    );
  }
}

class AnswerResult {
  final int xpEarned;
  final double updatedStrength;
  final String updatedMastery;
  final int streak;
  final Map<String, dynamic>? explanation;
  final List<dynamic>? badgesEarned;

  const AnswerResult({
    required this.xpEarned,
    required this.updatedStrength,
    required this.updatedMastery,
    required this.streak,
    this.explanation,
    this.badgesEarned,
  });

  factory AnswerResult.fromJson(Map<String, dynamic> json) {
    return AnswerResult(
      xpEarned: json['xp_earned'] as int? ?? 0,
      updatedStrength: (json['updated_strength'] as num?)?.toDouble() ?? 0,
      updatedMastery: json['updated_mastery'] as String? ?? 'novice',
      streak: json['streak'] as int? ?? 0,
      explanation: json['explanation'] as Map<String, dynamic>?,
      badgesEarned: json['badges_earned'] as List?,
    );
  }
}
