/// Topic-coherent Bac-style exam paper attached to a skill.
///
/// Stored in `skills.exam_paper` (JSONB). Renders below the existing
/// LessonV2 content in `long_lesson_screen.dart`. Each paper is a full
/// problem-set (4–5 exercices) focused on the one chapter, mirroring
/// how Moroccan Bac papers structure questions: an enumerated exercice
/// with a preamble, then numbered questions (1, 2, 3) that often have
/// lettered sub-parts (a, b, c).
///
/// JSON shape:
///
/// ```json
/// {
///   "version": 1,
///   "title_fr": "Épreuve type — Suites numériques",
///   "subtitle_fr": "4 exercices, durée 1h30, sur 20 points",
///   "duration_minutes": 90,
///   "total_points": 20,
///   "intro_fr": "Court rappel des outils nécessaires.",
///   "exercices": [
///     {
///       "number": 1,
///       "title_fr": "Suites arithmétiques",
///       "points": 5,
///       "preamble_fr": "Soit la suite $(u_n)$ ...",
///       "questions": [
///         {
///           "number": 1,
///           "stem_fr": "Calculer $u_5$.",
///           "points": 1,
///           "subparts": null,
///           "solution": {
///             "steps": [{"text_fr": "...", "latex": "u_n = u_0 + nr"}],
///             "final_answer_fr": "$u_5 = 16$",
///             "method_fr": "Application directe..."
///           }
///         }
///       ]
///     }
///   ]
/// }
/// ```
library;

class ExamPaper {
  final String skillId;
  final int version;
  final String titleFr;
  final String? subtitleFr;
  final int durationMinutes;
  final int totalPoints;
  final String? introFr;
  final List<Exercice> exercices;

  const ExamPaper({
    required this.skillId,
    required this.version,
    required this.titleFr,
    this.subtitleFr,
    required this.durationMinutes,
    required this.totalPoints,
    this.introFr,
    required this.exercices,
  });

  factory ExamPaper.fromJson(String skillId, Map<String, dynamic> json) {
    final exJson = json['exercices'] as List? ?? const [];
    return ExamPaper(
      skillId: skillId,
      version: (json['version'] as num?)?.toInt() ?? 1,
      titleFr: json['title_fr'] as String? ?? '',
      subtitleFr: json['subtitle_fr'] as String?,
      durationMinutes: (json['duration_minutes'] as num?)?.toInt() ?? 90,
      totalPoints: (json['total_points'] as num?)?.toInt() ?? 20,
      introFr: json['intro_fr'] as String?,
      exercices: exJson
          .whereType<Map<String, dynamic>>()
          .map(Exercice.fromJson)
          .toList(growable: false),
    );
  }
}

class Exercice {
  final int number;
  final String titleFr;
  final int points;
  final String? preambleFr;
  final String? widgetSlug; // optional figure accompanying the preamble
  final Map<String, dynamic>? widgetConfig;
  final List<Question> questions;

  const Exercice({
    required this.number,
    required this.titleFr,
    required this.points,
    this.preambleFr,
    this.widgetSlug,
    this.widgetConfig,
    required this.questions,
  });

  factory Exercice.fromJson(Map<String, dynamic> json) {
    final qJson = json['questions'] as List? ?? const [];
    return Exercice(
      number: (json['number'] as num?)?.toInt() ?? 0,
      titleFr: json['title_fr'] as String? ?? '',
      points: (json['points'] as num?)?.toInt() ?? 0,
      preambleFr: json['preamble_fr'] as String?,
      widgetSlug: json['widget_slug'] as String?,
      widgetConfig: (json['widget_config'] as Map?)?.cast<String, dynamic>(),
      questions: qJson
          .whereType<Map<String, dynamic>>()
          .map(Question.fromJson)
          .toList(growable: false),
    );
  }
}

class Question {
  final int number;
  final String stemFr;
  final int points;

  /// If non-empty, this question is split into lettered sub-parts (a, b, c).
  /// In that case `solution` is null and each subpart carries its own
  /// `QuestionSolution`.
  final List<Subpart>? subparts;

  /// Present when `subparts` is null — the solution applies to the whole
  /// question (no sub-letter breakdown).
  final QuestionSolution? solution;

  const Question({
    required this.number,
    required this.stemFr,
    required this.points,
    this.subparts,
    this.solution,
  });

  bool get hasSubparts => subparts != null && subparts!.isNotEmpty;

  factory Question.fromJson(Map<String, dynamic> json) {
    final subRaw = json['subparts'];
    List<Subpart>? subs;
    if (subRaw is List && subRaw.isNotEmpty) {
      subs = subRaw
          .whereType<Map<String, dynamic>>()
          .map(Subpart.fromJson)
          .toList(growable: false);
    }
    final solRaw = json['solution'];
    QuestionSolution? sol;
    if (solRaw is Map<String, dynamic>) {
      sol = QuestionSolution.fromJson(solRaw);
    }
    return Question(
      number: (json['number'] as num?)?.toInt() ?? 0,
      stemFr: json['stem_fr'] as String? ?? '',
      points: (json['points'] as num?)?.toInt() ?? 0,
      subparts: subs,
      solution: sol,
    );
  }
}

class Subpart {
  final String letter; // 'a', 'b', 'c', ...
  final String stemFr;
  final int points;
  final QuestionSolution solution;

  const Subpart({
    required this.letter,
    required this.stemFr,
    required this.points,
    required this.solution,
  });

  factory Subpart.fromJson(Map<String, dynamic> json) {
    return Subpart(
      letter: json['letter'] as String? ?? '',
      stemFr: json['stem_fr'] as String? ?? '',
      points: (json['points'] as num?)?.toInt() ?? 0,
      solution: QuestionSolution.fromJson(
          (json['solution'] as Map?)?.cast<String, dynamic>() ?? const {}),
    );
  }
}

class QuestionSolution {
  final List<SolutionStep> steps;
  final String? finalAnswerFr;
  final String? methodFr;

  const QuestionSolution({
    required this.steps,
    this.finalAnswerFr,
    this.methodFr,
  });

  factory QuestionSolution.fromJson(Map<String, dynamic> json) {
    final stepsJson = json['steps'] as List? ?? const [];
    return QuestionSolution(
      steps: stepsJson
          .whereType<Map<String, dynamic>>()
          .map(SolutionStep.fromJson)
          .toList(growable: false),
      finalAnswerFr: json['final_answer_fr'] as String?,
      methodFr: json['method_fr'] as String?,
    );
  }
}

class SolutionStep {
  final String textFr;
  final String? latex; // optional standalone formula block

  /// Optional interactive widget to embed alongside this step.
  /// Reuses the same slug registry as LessonV2 interactive blocks.
  final String? widgetSlug;
  final Map<String, dynamic>? widgetConfig;

  /// Optional inline mistake / tip callouts (mirror exam_questions schema).
  final String? mistakeFr;
  final String? tipFr;

  const SolutionStep({
    required this.textFr,
    this.latex,
    this.widgetSlug,
    this.widgetConfig,
    this.mistakeFr,
    this.tipFr,
  });

  factory SolutionStep.fromJson(Map<String, dynamic> json) {
    return SolutionStep(
      textFr: json['text_fr'] as String? ?? '',
      latex: json['latex'] as String?,
      widgetSlug: json['widget_slug'] as String?,
      widgetConfig: (json['widget_config'] as Map?)?.cast<String, dynamic>(),
      mistakeFr: json['mistake_fr'] as String?,
      tipFr: json['tip_fr'] as String?,
    );
  }
}
