import 'package:equatable/equatable.dart';
import 'item.dart';

enum ExamSession {
  normale('normale', 'Normale', 'الدورة العادية'),
  rattrapage('rattrapage', 'Rattrapage', 'الدورة الاستدراكية'),
  speciale('speciale', 'Spéciale', 'الدورة الخاصة');

  final String value;
  final String labelFr;
  final String labelAr;

  const ExamSession(this.value, this.labelFr, this.labelAr);

  static ExamSession fromValue(String value) {
    return ExamSession.values.firstWhere(
      (e) => e.value == value,
      orElse: () => ExamSession.normale,
    );
  }
}

class BacExam extends Equatable {
  final String id;
  final int year;
  final ExamSession session;
  final String stream;
  final String subjectId;
  final String subjectName;
  final DateTime? examDate;
  final int durationMinutes;
  final int totalScore;
  final String? pdfUrl;
  final int questionCount;
  final bool isActive;
  final DateTime createdAt;

  const BacExam({
    required this.id,
    required this.year,
    required this.session,
    required this.stream,
    required this.subjectId,
    required this.subjectName,
    this.examDate,
    this.durationMinutes = 180,
    this.totalScore = 20,
    this.pdfUrl,
    this.questionCount = 0,
    this.isActive = true,
    required this.createdAt,
  });

  String get displayName => '$subjectName - $year ${session.labelFr}';

  String get streamLabel {
    switch (stream) {
      case 'sciences_maths_a':
        return 'Sciences Maths A';
      case 'sciences_maths_b':
        return 'Sciences Maths B';
      case 'sciences_physiques':
        return 'Sciences Physiques';
      case 'svt':
        return 'SVT';
      case 'sciences_economiques':
        return 'Sciences Economiques';
      default:
        return stream;
    }
  }

  factory BacExam.fromJson(Map<String, dynamic> json) {
    return BacExam(
      id: json['id'] as String,
      year: json['year'] as int,
      session: ExamSession.fromValue(json['session'] as String),
      stream: json['stream'] as String,
      subjectId: json['subject_id'] as String,
      subjectName: json['subject_name'] as String? ?? '',
      examDate: json['exam_date'] != null
          ? DateTime.parse(json['exam_date'] as String)
          : null,
      durationMinutes: json['duration_minutes'] as int? ?? 180,
      totalScore: json['total_score'] as int? ?? 20,
      pdfUrl: json['pdf_url'] as String?,
      questionCount: json['question_count'] as int? ?? 0,
      isActive: json['is_active'] as bool? ?? true,
      createdAt: DateTime.parse(
          json['created_at'] as String? ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'year': year,
      'session': session.value,
      'stream': stream,
      'subject_id': subjectId,
      'subject_name': subjectName,
      'exam_date': examDate?.toIso8601String(),
      'duration_minutes': durationMinutes,
      'total_score': totalScore,
      'pdf_url': pdfUrl,
      'question_count': questionCount,
      'is_active': isActive,
      'created_at': createdAt.toIso8601String(),
    };
  }

  @override
  List<Object?> get props => [id, year, session, stream, subjectId];
}

class ExamQuestion extends Equatable {
  final String id;
  final String examId;
  final String? skillId;
  final int questionNumber;
  final String? subquestionLetter;
  final int? partNumber;
  final Map<String, dynamic> question;
  final Map<String, dynamic> answer;
  final ItemType itemType;
  final int difficultyLevel;
  final int points;
  final bool isBonus;
  final List<String> tags;
  final bool isActive;

  const ExamQuestion({
    required this.id,
    required this.examId,
    this.skillId,
    required this.questionNumber,
    this.subquestionLetter,
    this.partNumber,
    required this.question,
    required this.answer,
    required this.itemType,
    this.difficultyLevel = 3,
    required this.points,
    this.isBonus = false,
    this.tags = const [],
    this.isActive = true,
  });

  String get stem => question['stem'] as String? ?? '';
  String? get stemAr => question['stem_ar'] as String?;
  bool get hasLatex => question['latex'] as bool? ?? false;
  Map<String, dynamic>? get figure => question['figure'] as Map<String, dynamic>?;
  List<String> get choices => (question['choices'] as List?)?.cast<String>() ?? [];
  int? get correctIndex => question['correct_index'] as int?;
  double? get correctValue => (question['correct_value'] as num?)?.toDouble();
  double? get tolerance => (question['tolerance'] as num?)?.toDouble();
  String? get unit => question['unit'] as String?;

  List<Map<String, dynamic>> get answerSteps =>
      (answer['steps'] as List?)?.cast<Map<String, dynamic>>() ?? [];
  String get finalAnswer => answer['final_answer'] as String? ?? '';
  String get gradingNotes => answer['grading_notes'] as String? ?? '';
  List<String> get commonMistakes =>
      (answer['common_mistakes'] as List?)?.cast<String>() ?? [];
  List<String> get tips => (answer['tips'] as List?)?.cast<String>() ?? [];

  int get pointsForStep {
    return answerSteps.fold(0, (sum, step) => sum + (step['points'] as int? ?? 0));
  }

  String get fullQuestionText {
    final buffer = StringBuffer();
    buffer.write('Question $questionNumber');
    if (subquestionLetter != null) {
      buffer.write('.$subquestionLetter');
    }
    buffer.write('\n$stem');
    return buffer.toString();
  }

  factory ExamQuestion.fromJson(Map<String, dynamic> json) {
    return ExamQuestion(
      id: json['id'] as String,
      examId: json['exam_id'] as String,
      skillId: json['skill_id'] as String?,
      questionNumber: json['question_number'] as int,
      subquestionLetter: json['subquestion_letter'] as String?,
      partNumber: json['part_number'] as int?,
      question: json['question'] as Map<String, dynamic>? ?? {},
      answer: json['answer'] as Map<String, dynamic>? ?? {},
      itemType: ItemType.fromValue(json['item_type'] as String? ?? 'numeric'),
      difficultyLevel: json['difficulty_level'] as int? ?? 3,
      points: json['points'] as int? ?? 1,
      isBonus: json['is_bonus'] as bool? ?? false,
      tags: (json['tags'] as List?)?.cast<String>() ?? [],
      isActive: json['is_active'] as bool? ?? true,
    );
  }

  @override
  List<Object?> get props => [id, examId, questionNumber, subquestionLetter];
}

class UserExamProgress extends Equatable {
  final String id;
  final String userId;
  final String examId;
  final int attemptNumber;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final double scoreObtained;
  final int scoreMax;
  final List<QuestionResult> questionResults;
  final String status;
  final int timeSpentSeconds;
  final bool isBookmarked;
  final String? personalNotes;

  const UserExamProgress({
    required this.id,
    required this.userId,
    required this.examId,
    required this.attemptNumber,
    this.startedAt,
    this.completedAt,
    this.scoreObtained = 0,
    this.scoreMax = 20,
    this.questionResults = const [],
    this.status = 'not_started',
    this.timeSpentSeconds = 0,
    this.isBookmarked = false,
    this.personalNotes,
  });

  double get percentage => scoreMax > 0 ? (scoreObtained / scoreMax * 100) : 0;
  bool get isCompleted => status == 'completed' || status == 'reviewed';
  bool get isInProgress => status == 'in_progress';

  factory UserExamProgress.fromJson(Map<String, dynamic> json) {
    final resultsJson = json['question_results'] as List? ?? [];
    return UserExamProgress(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      examId: json['exam_id'] as String,
      attemptNumber: json['attempt_number'] as int? ?? 1,
      startedAt: json['started_at'] != null
          ? DateTime.parse(json['started_at'] as String)
          : null,
      completedAt: json['completed_at'] != null
          ? DateTime.parse(json['completed_at'] as String)
          : null,
      scoreObtained: (json['score_obtained'] as num?)?.toDouble() ?? 0,
      scoreMax: json['score_max'] as int? ?? 20,
      questionResults: resultsJson
          .map((r) => QuestionResult.fromJson(r as Map<String, dynamic>))
          .toList(),
      status: json['status'] as String? ?? 'not_started',
      timeSpentSeconds: json['time_spent_seconds'] as int? ?? 0,
      isBookmarked: json['is_bookmarked'] as bool? ?? false,
      personalNotes: json['personal_notes'] as String?,
    );
  }

  @override
  List<Object?> get props => [id, userId, examId, attemptNumber];
}

class QuestionResult extends Equatable {
  final String questionId;
  final bool correct;
  final int pointsEarned;
  final int pointsMax;
  final dynamic userAnswer;

  const QuestionResult({
    required this.questionId,
    required this.correct,
    required this.pointsEarned,
    required this.pointsMax,
    this.userAnswer,
  });

  double get percentage =>
      pointsMax > 0 ? (pointsEarned / pointsMax * 100) : 0;

  factory QuestionResult.fromJson(Map<String, dynamic> json) {
    return QuestionResult(
      questionId: json['question_id'] as String,
      correct: json['correct'] as bool? ?? false,
      pointsEarned: json['points_earned'] as int? ?? 0,
      pointsMax: json['points_max'] as int? ?? 1,
      userAnswer: json['user_answer'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'question_id': questionId,
      'correct': correct,
      'points_earned': pointsEarned,
      'points_max': pointsMax,
      if (userAnswer != null) 'user_answer': userAnswer,
    };
  }

  @override
  List<Object?> get props => [questionId, correct, pointsEarned];
}

class ExamFilter {
  final int? year;
  final ExamSession? session;
  final String? stream;
  final String? subjectId;
  final List<String>? tags;

  const ExamFilter({
    this.year,
    this.session,
    this.stream,
    this.subjectId,
    this.tags,
  });

  ExamFilter copyWith({
    int? year,
    ExamSession? session,
    String? stream,
    String? subjectId,
    List<String>? tags,
  }) {
    return ExamFilter(
      year: year ?? this.year,
      session: session ?? this.session,
      stream: stream ?? this.stream,
      subjectId: subjectId ?? this.subjectId,
      tags: tags ?? this.tags,
    );
  }

  bool get hasFilters =>
      year != null ||
      session != null ||
      stream != null ||
      subjectId != null ||
      (tags != null && tags!.isNotEmpty);

  ExamFilter clear() => const ExamFilter();

  Map<String, dynamic> toQueryParams() {
    final params = <String, dynamic>{};
    if (year != null) params['year'] = year;
    if (session != null) params['session'] = session!.value;
    if (stream != null) params['stream'] = stream;
    if (subjectId != null) params['subject_id'] = subjectId;
    if (tags != null && tags!.isNotEmpty) params['tags'] = tags!.join(',');
    return params;
  }
}
