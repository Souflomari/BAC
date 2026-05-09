import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/exam.dart';
import '../../models/item.dart';
import '../../providers/exam_provider.dart';
import '../../widgets/rich_text_renderer.dart';
import '../../widgets/shimmer_skeleton.dart';

class ExamResultsScreen extends ConsumerStatefulWidget {
  final String examId;

  const ExamResultsScreen({super.key, required this.examId});

  @override
  ConsumerState<ExamResultsScreen> createState() => _ExamResultsScreenState();
}

class _ExamResultsScreenState extends ConsumerState<ExamResultsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _selectedQuestionIndex = 0;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(examPracticeProvider);
    final exam = state.exam;
    final questions = state.questions;
    final correctMap = state.correctMap;
    final answers = state.answers;

    final l = AppLocalizations.of(context)!;
    if (exam == null) {
      return Scaffold(
        appBar: AppBar(title: Text(l.results)),
        body: const CardListSkeleton(itemCount: 4, itemHeight: 80),
      );
    }

    final correctCount = correctMap.values.where((v) => v).length;
    final totalCount = questions.length;
    final percentage = totalCount > 0 ? (correctCount / totalCount * 100).toDouble() : 0.0;
    final score = exam.totalScore * (correctCount / totalCount);

    return Scaffold(
      appBar: AppBar(
        title: Text(l.results),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: l.summary),
            Tab(text: l.questionsTab),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmark_border),
            onPressed: () {},
            tooltip: l.save,
          ),
        ],
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _SummaryTab(
            exam: exam,
            score: score,
            correctCount: correctCount,
            totalCount: totalCount,
            percentage: percentage,
            correctMap: correctMap,
            questions: questions,
            onQuestionTap: (index) {
              setState(() => _selectedQuestionIndex = index);
              _tabController.animateTo(1);
            },
          ),
          _QuestionsTab(
            questions: questions,
            answers: answers,
            correctMap: correctMap,
            selectedIndex: _selectedQuestionIndex,
            onQuestionSelect: (index) {
              setState(() => _selectedQuestionIndex = index);
            },
          ),
        ],
      ),
      bottomNavigationBar: _BottomActions(
        onRetry: () {
          ref.read(examPracticeProvider.notifier).reset();
          context.pushReplacement('/exams/${widget.examId}/practice');
        },
        onHome: () {
          ref.read(examPracticeProvider.notifier).reset();
          context.go('/home');
        },
        onReview: () => _tabController.animateTo(1),
      ),
    );
  }
}

class _SummaryTab extends StatelessWidget {
  final BacExam exam;
  final double score;
  final int correctCount;
  final int totalCount;
  final double percentage;
  final Map<String, bool> correctMap;
  final List<ExamQuestion> questions;
  final void Function(int) onQuestionTap;

  const _SummaryTab({
    required this.exam,
    required this.score,
    required this.correctCount,
    required this.totalCount,
    required this.percentage,
    required this.correctMap,
    required this.questions,
    required this.onQuestionTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = percentage >= 80
        ? BacPrepColors.success
        : percentage >= 60
            ? BacPrepColors.accent
            : percentage >= 40
                ? BacPrepColors.warning
                : BacPrepColors.error;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(Spacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Score card
          Container(
            padding: const EdgeInsets.all(Spacing.xl),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withValues(alpha: 0.7)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: color.withValues(alpha: 0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Column(
              children: [
                Text(
                  '${percentage.toStringAsFixed(0)}%',
                  style: const TextStyle(
                    fontSize: 56,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: Spacing.sm),
                Text(
                  _getGradeMessage(context, percentage),
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.white.withValues(alpha: 0.9),
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: Spacing.lg),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _StatChip(
                      icon: Icons.check_circle_outline,
                      value: '$correctCount',
                      label: AppLocalizations.of(context)!.correctPlural,
                    ),
                    const SizedBox(width: Spacing.xl),
                    _StatChip(
                      icon: Icons.cancel_outlined,
                      value: '${totalCount - correctCount}',
                      label: AppLocalizations.of(context)!.incorrectPlural,
                    ),
                    const SizedBox(width: Spacing.xl),
                    _StatChip(
                      icon: Icons.star_outline,
                      value: '${score.toStringAsFixed(1)}/${exam.totalScore}',
                      label: AppLocalizations.of(context)!.points,
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: Spacing.xl),

          // Performance breakdown
          Text(
            AppLocalizations.of(context)!.perQuestion,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: Spacing.md),

          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: questions.asMap().entries.map((entry) {
              final index = entry.key;
              final q = entry.value;
              final isCorrect = correctMap[q.id] ?? false;

              return GestureDetector(
                onTap: () => onQuestionTap(index),
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: isCorrect
                        ? BacPrepColors.success.withValues(alpha: 0.1)
                        : BacPrepColors.error.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: isCorrect ? BacPrepColors.success : BacPrepColors.error,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      '${index + 1}',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: isCorrect ? BacPrepColors.success : BacPrepColors.error,
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: Spacing.xl),

          // Topic breakdown
          if (_hasTopicBreakdown()) ...[
            Text(
              AppLocalizations.of(context)!.perTopic,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: Spacing.md),
            _buildTopicBreakdown(),
            const SizedBox(height: Spacing.xl),
          ],

          // Tips
          _TipsCard(percentage: percentage),
        ],
      ),
    );
  }

  String _getGradeMessage(BuildContext context, double percentage) {
    final l = AppLocalizations.of(context)!;
    if (percentage >= 90) return l.gradeExcellent;
    if (percentage >= 80) return l.gradeVeryGood;
    if (percentage >= 70) return l.gradeGood;
    if (percentage >= 60) return l.gradeOk;
    if (percentage >= 40) return l.gradeKeepGoing;
    return l.gradeMorePractice;
  }

  bool _hasTopicBreakdown() {
    return questions.any((q) => q.tags.isNotEmpty);
  }

  Widget _buildTopicBreakdown() {
    final topicStats = <String, Map<String, int>>{};
    for (final q in questions) {
      for (final tag in q.tags) {
        topicStats.putIfAbsent(tag, () => {'correct': 0, 'total': 0});
        topicStats[tag]!['total'] = topicStats[tag]!['total']! + 1;
        if (correctMap[q.id] == true) {
          topicStats[tag]!['correct'] = topicStats[tag]!['correct']! + 1;
        }
      }
    }

    return Column(
      children: topicStats.entries.map((entry) {
        final tag = entry.key;
        final stats = entry.value;
        final pct = stats['total']! > 0
            ? (stats['correct']! / stats['total']! * 100)
            : 0;

        return Padding(
          padding: const EdgeInsets.only(bottom: Spacing.sm),
          child: Row(
            children: [
              Expanded(
                flex: 2,
                child: Text(
                  tag,
                  style: const TextStyle(fontSize: 13),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: Spacing.sm),
              Expanded(
                flex: 3,
                child: LinearProgressIndicator(
                  value: pct / 100,
                  backgroundColor: BacPrepColors.surfaceVariant,
                  valueColor: AlwaysStoppedAnimation(
                    pct >= 80
                        ? BacPrepColors.success
                        : pct >= 60
                            ? BacPrepColors.accent
                            : BacPrepColors.error,
                  ),
                ),
              ),
              const SizedBox(width: Spacing.sm),
              SizedBox(
                width: 40,
                child: Text(
                  '${pct.toStringAsFixed(0)}%',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: pct >= 80
                        ? BacPrepColors.success
                        : pct >= 60
                            ? BacPrepColors.accent
                            : BacPrepColors.error,
                  ),
                  textAlign: TextAlign.right,
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}

class _StatChip extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;

  const _StatChip({
    required this.icon,
    required this.value,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white70, size: 20),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            color: Colors.white.withValues(alpha: 0.8),
          ),
        ),
      ],
    );
  }
}

class _TipsCard extends StatelessWidget {
  final double percentage;

  const _TipsCard({required this.percentage});

  @override
  Widget build(BuildContext context) {
    final tips = _getTips();

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.accent.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.accent.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.tips_and_updates, color: BacPrepColors.accent, size: 20),
              const SizedBox(width: Spacing.sm),
              Text(
                AppLocalizations.of(context)!.tipsTitle,
                style: const TextStyle(
                  fontWeight: FontWeight.w600,
                  color: BacPrepColors.accent,
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          ...tips.map((tip) => Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('  • ', style: TextStyle(color: BacPrepColors.accent)),
                Expanded(child: Text(tip, style: const TextStyle(fontSize: 13))),
              ],
            ),
          )),
        ],
      ),
    );
  }

  List<String> _getTips() {
    if (percentage >= 80) {
      return [
        'Excellent travail ! Continuez à pratiquer pour maintenir votre niveau.',
        'Essayez des examens dans des conditions réelles (chronométrés).',
      ];
    } else if (percentage >= 60) {
      return [
        'Bon début ! Identifiez les questions que vous avez ratées et revoyez ces concepts.',
        'Pratiquez plus d\'exercices sur les thèmes où vous avez des difficultés.',
      ];
    } else {
      return [
        'Revenez aux leçons de base pour consolider vos connaissances.',
        'Concentrez-vous sur un thème à la fois avant de passer aux examens complets.',
        'N\'hésitez pas à utiliser les indices et explications pendant la pratique.',
      ];
    }
  }
}

class _QuestionsTab extends StatelessWidget {
  final List<ExamQuestion> questions;
  final Map<String, dynamic> answers;
  final Map<String, bool> correctMap;
  final int selectedIndex;
  final void Function(int) onQuestionSelect;

  const _QuestionsTab({
    required this.questions,
    required this.answers,
    required this.correctMap,
    required this.selectedIndex,
    required this.onQuestionSelect,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Question selector
        Container(
          height: 56,
          padding: const EdgeInsets.symmetric(vertical: Spacing.sm),
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: Spacing.md),
            itemCount: questions.length,
            itemBuilder: (context, index) {
              final q = questions[index];
              final isCorrect = correctMap[q.id] ?? false;
              final isSelected = index == selectedIndex;

              return GestureDetector(
                onTap: () => onQuestionSelect(index),
                child: Container(
                  width: 44,
                  height: 44,
                  margin: const EdgeInsetsDirectional.only(end: 8),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? (isCorrect ? BacPrepColors.success : BacPrepColors.error)
                        : (isCorrect
                            ? BacPrepColors.success.withValues(alpha: 0.1)
                            : BacPrepColors.error.withValues(alpha: 0.1)),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: isSelected
                          ? (isCorrect ? BacPrepColors.success : BacPrepColors.error)
                          : (isCorrect ? BacPrepColors.success : BacPrepColors.error)
                              .withValues(alpha: 0.5),
                      width: isSelected ? 2 : 1,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      '${index + 1}',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: isSelected
                            ? Colors.white
                            : (isCorrect ? BacPrepColors.success : BacPrepColors.error),
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        const Divider(height: 1),

        // Question content
        Expanded(
          child: selectedIndex < questions.length
              ? _QuestionReview(question: questions[selectedIndex])
              : Center(child: Text(AppLocalizations.of(context)!.selectQuestion)),
        ),
      ],
    );
  }
}

class _QuestionReview extends StatelessWidget {
  final ExamQuestion question;

  const _QuestionReview({required this.question});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(Spacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Question header
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.primaryLight.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  'Question ${question.questionNumber}${question.subquestionLetter != null ? '.${question.subquestionLetter}' : ''}',
                  style: const TextStyle(
                    color: BacPrepColors.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.accent.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '${question.points} pt${question.points > 1 ? 's' : ''}',
                  style: const TextStyle(
                    color: BacPrepColors.accent,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.lg),

          // Question stem
          RichTextRenderer(
            text: question.stem,
            style: const TextStyle(fontSize: 16, height: 1.6),
          ),

          const SizedBox(height: Spacing.xl),

          // Solution
          _SolutionCard(question: question),
        ],
      ),
    );
  }
}

class _SolutionCard extends StatelessWidget {
  final ExamQuestion question;

  const _SolutionCard({required this.question});

  @override
  Widget build(BuildContext context) {
    final steps = question.answerSteps;
    final finalAnswer = question.finalAnswer;
    final gradingNotes = question.gradingNotes;
    final commonMistakes = question.commonMistakes;
    final tips = question.tips;

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Container(
            padding: const EdgeInsets.all(Spacing.md),
            decoration: BoxDecoration(
              color: BacPrepColors.primary.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.lightbulb, color: BacPrepColors.accent, size: 20),
                    const SizedBox(width: Spacing.sm),
                    Text(
                      AppLocalizations.of(context)!.detailedSolution,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        color: BacPrepColors.accent,
                      ),
                    ),
                  ],
                ),
                if (finalAnswer.isNotEmpty) ...[
                  const SizedBox(height: Spacing.md),
                  RichTextRenderer(
                    text: finalAnswer,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ],
            ),
          ),

          if (steps.isNotEmpty) ...[
            const SizedBox(height: Spacing.lg),
            Text(
              AppLocalizations.of(context)!.resolutionSteps,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: Spacing.md),
            ...steps.asMap().entries.map((entry) {
              final index = entry.key;
              final step = entry.value;
              final text = step['text'] as String? ?? '';
              final points = step['points'] as int? ?? 0;

              return Padding(
                padding: const EdgeInsets.only(bottom: Spacing.md),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 28,
                      height: 28,
                      decoration: BoxDecoration(
                        color: BacPrepColors.primary.withValues(alpha: 0.1),
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Text(
                          '${index + 1}',
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: BacPrepColors.primary,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: Spacing.md),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          RichTextRenderer(text: text),
                          if (points > 0)
                            Container(
                              margin: const EdgeInsets.only(top: 4),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: BacPrepColors.success.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                '$points pt${points > 1 ? 's' : ''}',
                                style: const TextStyle(
                                  fontSize: 11,
                                  color: BacPrepColors.success,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }),
          ],

          if (gradingNotes.isNotEmpty) ...[
            const SizedBox(height: Spacing.lg),
            const Divider(),
            const SizedBox(height: Spacing.md),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: BacPrepColors.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.star, size: 14, color: BacPrepColors.primary),
                      const SizedBox(width: 4),
                      Text(
                        AppLocalizations.of(context)!.scaleHeader,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: BacPrepColors.primary,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: Spacing.sm),
            RichTextRenderer(
              text: gradingNotes,
              style: const TextStyle(fontSize: 13, color: BacPrepColors.textSecondary),
            ),
          ],

          if (commonMistakes.isNotEmpty) ...[
            const SizedBox(height: Spacing.lg),
            Container(
              padding: const EdgeInsets.all(Spacing.md),
              decoration: BoxDecoration(
                color: BacPrepColors.warning.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: BacPrepColors.warning.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.warning_amber, color: BacPrepColors.warning, size: 18),
                      const SizedBox(width: Spacing.sm),
                      Text(
                        AppLocalizations.of(context)!.commonMistakes,
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: BacPrepColors.warning,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: Spacing.sm),
                  ...commonMistakes.map((mistake) => Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('  • ', style: TextStyle(color: BacPrepColors.warning)),
                        Expanded(child: Text(mistake, style: const TextStyle(fontSize: 13))),
                      ],
                    ),
                  )),
                ],
              ),
            ),
          ],

          if (tips.isNotEmpty) ...[
            const SizedBox(height: Spacing.lg),
            Container(
              padding: const EdgeInsets.all(Spacing.md),
              decoration: BoxDecoration(
                color: BacPrepColors.success.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: BacPrepColors.success.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.emoji_objects, color: BacPrepColors.success, size: 18),
                      const SizedBox(width: Spacing.sm),
                      Text(
                        AppLocalizations.of(context)!.tipsHeader,
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: BacPrepColors.success,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: Spacing.sm),
                  ...tips.map((tip) => Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('  • ', style: TextStyle(color: BacPrepColors.success)),
                        Expanded(child: Text(tip, style: const TextStyle(fontSize: 13))),
                      ],
                    ),
                  )),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _BottomActions extends StatelessWidget {
  final VoidCallback onRetry;
  final VoidCallback onHome;
  final VoidCallback onReview;

  const _BottomActions({
    required this.onRetry,
    required this.onHome,
    required this.onReview,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Row(
          children: [
            OutlinedButton.icon(
              onPressed: onHome,
              icon: const Icon(Icons.home_outlined, size: 18),
              label: Text(AppLocalizations.of(context)!.home),
            ),
            const SizedBox(width: Spacing.sm),
            OutlinedButton.icon(
              onPressed: onReview,
              icon: const Icon(Icons.visibility_outlined, size: 18),
              label: Text(AppLocalizations.of(context)!.reviewBtn),
            ),
            const SizedBox(width: Spacing.sm),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh, size: 18),
                label: Text(AppLocalizations.of(context)!.retry),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
