import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/exam.dart';
import '../models/item.dart';
import '../services/api_service.dart';
import 'auth_provider.dart';

/// API Service provider
final apiServiceProvider = Provider<ApiService>((ref) => ApiService());

/// Exam filter state
final examFilterProvider = StateProvider<ExamFilter>((ref) => const ExamFilter());

/// All available exams (with filter applied)
final examsProvider = FutureProvider<List<BacExam>>((ref) async {
  final api = ref.read(apiServiceProvider);
  final filter = ref.watch(examFilterProvider);
  return api.getExams(filter: filter);
});

/// Available years for exams
final examYearsProvider = FutureProvider<List<int>>((ref) async {
  final api = ref.read(apiServiceProvider);
  return api.getExamYears();
});

/// Subjects with exams
final examSubjectsProvider = FutureProvider<List<Map<String, String>>>((ref) async {
  final api = ref.read(apiServiceProvider);
  return api.getExamSubjects();
});

/// Single exam details
final examProvider = FutureProvider.family<BacExam, String>((ref, examId) async {
  final api = ref.read(apiServiceProvider);
  return api.getExam(examId);
});

/// Questions for an exam
final examQuestionsProvider = FutureProvider.family<List<ExamQuestion>, String>((ref, examId) async {
  final api = ref.read(apiServiceProvider);
  return api.getExamQuestions(examId);
});

/// User's progress on an exam
final userExamProgressProvider = FutureProvider.family<UserExamProgress?, String>((ref, examId) async {
  final api = ref.read(apiServiceProvider);
  return api.getUserExamProgress(examId);
});

/// User's exam attempts for an exam
final userExamAttemptsProvider = FutureProvider.family<List<UserExamProgress>, String>((ref, examId) async {
  final api = ref.read(apiServiceProvider);
  return api.getUserExamAttempts(examId);
});

/// User's favorite exams
final favoriteExamsProvider = FutureProvider<List<BacExam>>((ref) async {
  final api = ref.read(apiServiceProvider);
  return api.getFavoriteExams();
});

/// Exam practice state (for taking an exam)
class ExamPracticeState {
  final BacExam? exam;
  final List<ExamQuestion> questions;
  final int currentIndex;
  final Map<String, dynamic> answers;
  final Map<String, bool> correctMap;
  final bool isLoading;
  final bool isSubmitting;
  final String? error;
  final DateTime? startTime;

  const ExamPracticeState({
    this.exam,
    this.questions = const [],
    this.currentIndex = 0,
    this.answers = const {},
    this.correctMap = const {},
    this.isLoading = false,
    this.isSubmitting = false,
    this.error,
    this.startTime,
  });

  ExamQuestion? get currentQuestion =>
      questions.isNotEmpty && currentIndex < questions.length
          ? questions[currentIndex]
          : null;

  bool get isComplete => answers.length >= questions.length;

  int get answeredCount => answers.length;

  double get progress =>
      questions.isNotEmpty ? answeredCount / questions.length : 0;

  int get correctCount => correctMap.values.where((v) => v).length;

  ExamPracticeState copyWith({
    BacExam? exam,
    List<ExamQuestion>? questions,
    int? currentIndex,
    Map<String, dynamic>? answers,
    Map<String, bool>? correctMap,
    bool? isLoading,
    bool? isSubmitting,
    String? error,
    DateTime? startTime,
  }) {
    return ExamPracticeState(
      exam: exam ?? this.exam,
      questions: questions ?? this.questions,
      currentIndex: currentIndex ?? this.currentIndex,
      answers: answers ?? this.answers,
      correctMap: correctMap ?? this.correctMap,
      isLoading: isLoading ?? this.isLoading,
      isSubmitting: isSubmitting ?? this.isSubmitting,
      error: error,
      startTime: startTime ?? this.startTime,
    );
  }
}

/// Exam practice notifier
class ExamPracticeNotifier extends StateNotifier<ExamPracticeState> {
  final ApiService _api;

  ExamPracticeNotifier(this._api) : super(const ExamPracticeState());

  Future<void> startExam(String examId) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final exam = await _api.getExam(examId);
      final questions = await _api.getExamQuestions(examId);

      state = ExamPracticeState(
        exam: exam,
        questions: questions,
        startTime: DateTime.now(),
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'Failed to load exam: $e',
      );
    }
  }

  void answerQuestion(String questionId, dynamic answer, bool isCorrect) {
    final newAnswers = Map<String, dynamic>.from(state.answers);
    newAnswers[questionId] = answer;

    final newCorrectMap = Map<String, bool>.from(state.correctMap);
    newCorrectMap[questionId] = isCorrect;

    state = state.copyWith(
      answers: newAnswers,
      correctMap: newCorrectMap,
    );
  }

  void nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state = state.copyWith(currentIndex: state.currentIndex + 1);
    }
  }

  void previousQuestion() {
    if (state.currentIndex > 0) {
      state = state.copyWith(currentIndex: state.currentIndex - 1);
    }
  }

  void goToQuestion(int index) {
    if (index >= 0 && index < state.questions.length) {
      state = state.copyWith(currentIndex: index);
    }
  }

  Future<UserExamProgress?> submitExam() async {
    if (state.exam == null) return null;

    state = state.copyWith(isSubmitting: true);

    try {
      final results = state.correctMap.entries
          .map((e) => {
                'question_id': e.key,
                'correct': e.value,
                'points_earned': e.value ? 1 : 0,
                'points_max': 1,
                'user_answer': state.answers[e.key],
              })
          .toList();

      final progress = await _api.submitExamProgress(
        examId: state.exam!.id,
        questionResults: results,
        timeSpentSeconds: state.startTime != null
            ? DateTime.now().difference(state.startTime!).inSeconds
            : 0,
      );

      state = state.copyWith(isSubmitting: false);
      return progress;
    } catch (e) {
      state = state.copyWith(
        isSubmitting: false,
        error: 'Failed to submit exam: $e',
      );
      return null;
    }
  }

  void reset() {
    state = const ExamPracticeState();
  }
}

final examPracticeProvider =
    StateNotifierProvider<ExamPracticeNotifier, ExamPracticeState>((ref) {
  final api = ref.read(apiServiceProvider);
  return ExamPracticeNotifier(api);
});

/// Actions for exam management
class ExamActions {
  final ApiService _api;

  ExamActions(this._api);

  Future<void> toggleFavorite(String examId) async {
    await _api.toggleExamFavorite(examId);
  }

  Future<void> updateProgressNotes(String examId, String notes) async {
    await _api.updateExamProgressNotes(examId, notes);
  }

  Future<void> bookmarkQuestion(String examId, String questionId) async {
    await _api.bookmarkExamQuestion(examId, questionId);
  }
}

final examActionsProvider = Provider<ExamActions>((ref) {
  return ExamActions(ref.read(apiServiceProvider));
});

/// Exams by year
final examsByYearProvider = FutureProvider<Map<int, List<BacExam>>>((ref) async {
  final exams = await ref.watch(examsProvider.future);
  final grouped = <int, List<BacExam>>{};
  for (final exam in exams) {
    grouped.putIfAbsent(exam.year, () => []).add(exam);
  }
  return grouped;
});

/// Exams by subject
final examsBySubjectProvider = FutureProvider<Map<String, List<BacExam>>>((ref) async {
  final exams = await ref.watch(examsProvider.future);
  final grouped = <String, List<BacExam>>{};
  for (final exam in exams) {
    grouped.putIfAbsent(exam.subjectId, () => []).add(exam);
  }
  return grouped;
});
