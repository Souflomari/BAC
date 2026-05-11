import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import '../config/theme.dart';

enum MasteryLevel {
  locked('locked', 'Verrouillé', 'مقفل'),
  novice('novice', 'Novice', 'مبتدئ'),
  developing('developing', 'En progrès', 'في تطور'),
  proficient('proficient', 'Compétent', 'كفء'),
  master('master', 'Maîtrisé', 'متقن');

  const MasteryLevel(this.value, this.labelFr, this.labelAr);
  final String value;
  final String labelFr;
  final String labelAr;

  Color get color {
    switch (this) {
      case MasteryLevel.locked: return BacPrepColors.locked;
      case MasteryLevel.novice: return BacPrepColors.novice;
      case MasteryLevel.developing: return BacPrepColors.developing;
      case MasteryLevel.proficient: return BacPrepColors.proficient;
      case MasteryLevel.master: return BacPrepColors.master;
    }
  }

  double get progressValue {
    switch (this) {
      case MasteryLevel.locked: return 0.0;
      case MasteryLevel.novice: return 0.25;
      case MasteryLevel.developing: return 0.50;
      case MasteryLevel.proficient: return 0.75;
      case MasteryLevel.master: return 1.0;
    }
  }

  static MasteryLevel fromValue(String value) {
    return MasteryLevel.values.firstWhere(
      (e) => e.value == value,
      orElse: () => MasteryLevel.locked,
    );
  }
}

class Topic extends Equatable {
  final String id;
  final String subjectId;
  final String code;
  final String nameFr;
  final String nameAr;
  final int displayOrder;
  final double examRelevanceWeight;

  const Topic({
    required this.id,
    required this.subjectId,
    required this.code,
    required this.nameFr,
    required this.nameAr,
    this.displayOrder = 0,
    this.examRelevanceWeight = 0.5,
  });

  factory Topic.fromJson(Map<String, dynamic> json) {
    return Topic(
      id: json['id'] as String,
      subjectId: json['subject_id'] as String,
      code: json['code'] as String,
      nameFr: json['name_fr'] as String,
      nameAr: json['name_ar'] as String,
      displayOrder: json['display_order'] as int? ?? 0,
      examRelevanceWeight: (json['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5,
    );
  }

  @override
  List<Object?> get props => [id, code];
}

class LessonCard {
  final String type; // theory, formula, example, interactive
  final String titleFr;
  final String bodyFr;
  final Map<String, dynamic>? figure;
  // interactive type only
  final String? widgetType; // 'sequence_viz', 'function_graph', 'derivative_graph', etc.
  final Map<String, dynamic>? config; // initial params for the widget

  const LessonCard({
    required this.type,
    required this.titleFr,
    required this.bodyFr,
    this.figure,
    this.widgetType,
    this.config,
  });

  factory LessonCard.fromJson(Map<String, dynamic> json) {
    return LessonCard(
      type: json['type'] as String? ?? 'theory',
      titleFr: json['title_fr'] as String? ?? '',
      bodyFr: json['body_fr'] as String? ?? '',
      figure: json['figure'] as Map<String, dynamic>?,
      // Accept either snake_case (canonical) or camelCase (legacy from
      // migrations 011, 012). Mixed convention exists in the DB.
      widgetType: (json['widget_type'] ?? json['widgetType']) as String?,
      config: json['config'] as Map<String, dynamic>?,
    );
  }

  IconData get icon {
    switch (type) {
      case 'formula':
        return Icons.functions;
      case 'example':
        return Icons.lightbulb_outline;
      case 'interactive':
        return Icons.science_outlined;
      default:
        return Icons.menu_book_outlined;
    }
  }

  Color get color {
    switch (type) {
      case 'formula':
        return const Color(0xFFA07B2B); // Papier gold — better contrast on cream
      case 'example':
        return const Color(0xFF1A7A58); // darker teal — better contrast on cream
      case 'interactive':
        return const Color(0xFF2D4963); // Papier indigo
      default:
        return Papier.indigo; // engraving indigo — better contrast on cream than bright blue
    }
  }

  String get typeLabel {
    switch (type) {
      case 'formula':
        return 'Formule';
      case 'example':
        return 'Exemple';
      case 'interactive':
        return 'Exploration';
      default:
        return 'Théorie';
    }
  }
}

class Skill extends Equatable {
  final String id;
  final String topicId;
  final String code;
  final String nameFr;
  final String nameAr;
  final String? descriptionFr;
  final int difficultyLevel;
  final double examRelevanceWeight;
  final int displayOrder;
  final List<LessonCard>? lessonCards;

  /// Raw JSONB from `skills.lesson`. Kept around so the lesson-screen router
  /// can detect v2 (long-form) lessons via `lessonRaw?['version'] == 2`.
  final Map<String, dynamic>? lessonRaw;

  /// Raw JSONB from `skills.exam_paper`. Optional topic-coherent Bac-paper
  /// rendered below the lesson when present. See `models/exam_paper.dart`.
  final Map<String, dynamic>? examPaperRaw;

  const Skill({
    required this.id,
    required this.topicId,
    required this.code,
    required this.nameFr,
    required this.nameAr,
    this.descriptionFr,
    this.difficultyLevel = 1,
    this.examRelevanceWeight = 0.5,
    this.displayOrder = 0,
    this.lessonCards,
    this.lessonRaw,
    this.examPaperRaw,
  });

  bool get hasExamPaper => examPaperRaw != null;

  bool get hasLesson =>
      (lessonCards != null && lessonCards!.isNotEmpty) || isLongLesson;

  /// True when the lesson JSON is the v2 long-form schema.
  bool get isLongLesson {
    final raw = lessonRaw;
    if (raw == null) return false;
    return raw['version'] == 2 || raw['sections'] is List;
  }

  factory Skill.fromJson(Map<String, dynamic> json) {
    List<LessonCard>? cards;
    Map<String, dynamic>? rawLesson;
    final lessonJson = json['lesson'];
    if (lessonJson is Map<String, dynamic>) {
      rawLesson = lessonJson;
      final cardsJson = lessonJson['cards'];
      if (cardsJson is List) {
        cards = cardsJson
            .map((c) => LessonCard.fromJson(c as Map<String, dynamic>))
            .toList();
      }
    }

    Map<String, dynamic>? rawExamPaper;
    final examPaperJson = json['exam_paper'];
    if (examPaperJson is Map<String, dynamic>) {
      rawExamPaper = examPaperJson;
    }

    return Skill(
      id: json['id'] as String,
      topicId: json['topic_id'] as String,
      code: json['code'] as String,
      nameFr: json['name_fr'] as String,
      nameAr: json['name_ar'] as String,
      descriptionFr: json['description_fr'] as String?,
      difficultyLevel: json['difficulty_level'] as int? ?? 1,
      examRelevanceWeight: (json['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5,
      displayOrder: json['display_order'] as int? ?? 0,
      lessonCards: cards,
      lessonRaw: rawLesson,
      examPaperRaw: rawExamPaper,
    );
  }

  @override
  List<Object?> get props => [id, code];
}

class UserSkillState extends Equatable {
  final String skillId;
  final MasteryLevel mastery;
  final double halfLifeHours;
  final DateTime? lastReviewedAt;
  final int numAttempts;
  final int numCorrect;
  final int currentStreak;
  final int bestStreak;
  final double estimatedAbility;
  final double strength; // computed

  const UserSkillState({
    required this.skillId,
    this.mastery = MasteryLevel.locked,
    this.halfLifeHours = 24,
    this.lastReviewedAt,
    this.numAttempts = 0,
    this.numCorrect = 0,
    this.currentStreak = 0,
    this.bestStreak = 0,
    this.estimatedAbility = 1.0,
    this.strength = 0.0,
  });

  double get accuracy => numAttempts > 0 ? numCorrect / numAttempts : 0;

  factory UserSkillState.fromJson(Map<String, dynamic> json) {
    double strength = 0;
    if (json['last_reviewed_at'] != null) {
      final elapsed = DateTime.now()
          .difference(DateTime.parse(json['last_reviewed_at'] as String))
          .inHours;
      final halfLife = (json['half_life_hours'] as num?)?.toDouble() ?? 24;
      strength = _pow2(-elapsed / halfLife);
    }

    return UserSkillState(
      skillId: json['skill_id'] as String,
      mastery: MasteryLevel.fromValue(json['mastery'] as String? ?? 'locked'),
      halfLifeHours: (json['half_life_hours'] as num?)?.toDouble() ?? 24,
      lastReviewedAt: json['last_reviewed_at'] != null
          ? DateTime.parse(json['last_reviewed_at'] as String)
          : null,
      numAttempts: json['num_attempts'] as int? ?? 0,
      numCorrect: json['num_correct'] as int? ?? 0,
      currentStreak: json['current_streak'] as int? ?? 0,
      bestStreak: json['best_streak'] as int? ?? 0,
      estimatedAbility: (json['estimated_ability'] as num?)?.toDouble() ?? 1.0,
      strength: strength,
    );
  }

  static double _pow2(double exp) {
    // 2^exp
    if (exp < -10) return 0;
    return 1.0 / (1 << (-exp).ceil()) *
        (1 + (exp + (-exp).ceil()) * 0.693); // rough approximation
  }

  @override
  List<Object?> get props => [skillId, mastery, strength, numAttempts];
}

/// Skill state enriched with skill name, topic, and subject info for analytics
class EnrichedSkillState {
  final UserSkillState state;
  final String skillId;
  final String skillNameFr;
  final String skillNameAr;
  final int difficultyLevel;
  final double skillExamWeight;
  final String topicNameFr;
  final String topicNameAr;
  final double topicExamWeight;
  final String subjectId;
  final String subjectCode;
  final String subjectNameFr;
  final String subjectNameAr;
  final String? subjectColorHex;
  final double coefficient;

  const EnrichedSkillState({
    required this.state,
    required this.skillId,
    required this.skillNameFr,
    required this.skillNameAr,
    required this.difficultyLevel,
    required this.skillExamWeight,
    required this.topicNameFr,
    required this.topicNameAr,
    required this.topicExamWeight,
    required this.subjectId,
    required this.subjectCode,
    required this.subjectNameFr,
    required this.subjectNameAr,
    this.subjectColorHex,
    required this.coefficient,
  });

  /// Combined urgency score: lower strength + higher exam weight = higher urgency
  double get urgencyScore {
    final strengthFactor = 1.0 - state.strength;
    final examFactor = skillExamWeight * topicExamWeight * coefficient;
    return strengthFactor * examFactor;
  }

  Color get subjectColor {
    if (subjectColorHex != null) {
      try {
        return Color(int.parse(subjectColorHex!.replaceFirst('#', '0xFF')));
      } catch (_) {}
    }
    return BacPrepColors.primary;
  }

  factory EnrichedSkillState.fromJson(Map<String, dynamic> json) {
    final skill = json['skills'] as Map<String, dynamic>? ?? {};
    final topic = skill['topics'] as Map<String, dynamic>? ?? {};
    final subject = topic['subjects'] as Map<String, dynamic>? ?? {};

    return EnrichedSkillState(
      state: UserSkillState.fromJson(json),
      skillId: json['skill_id'] as String,
      skillNameFr: skill['name_fr'] as String? ?? '',
      skillNameAr: skill['name_ar'] as String? ?? '',
      difficultyLevel: skill['difficulty_level'] as int? ?? 1,
      skillExamWeight: (skill['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5,
      topicNameFr: topic['name_fr'] as String? ?? '',
      topicNameAr: topic['name_ar'] as String? ?? '',
      topicExamWeight: (topic['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5,
      subjectId: subject['id'] as String? ?? '',
      subjectCode: subject['code'] as String? ?? '',
      subjectNameFr: subject['name_fr'] as String? ?? '',
      subjectNameAr: subject['name_ar'] as String? ?? '',
      subjectColorHex: subject['color'] as String?,
      coefficient: (subject['coefficient'] as num?)?.toDouble() ?? 1.0,
    );
  }
}
