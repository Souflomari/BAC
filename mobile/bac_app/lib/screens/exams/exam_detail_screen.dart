import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/exam.dart';
import '../../providers/exam_provider.dart';
import '../../widgets/error_retry_widget.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/shimmer_skeleton.dart';
import 'exam_practice_screen.dart';

class ExamDetailScreen extends ConsumerWidget {
  final String examId;

  const ExamDetailScreen({super.key, required this.examId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final examAsync = ref.watch(examProvider(examId));
    final progressAsync = ref.watch(userExamProgressProvider(examId));
    final questionsAsync = ref.watch(examQuestionsProvider(examId));

    return Scaffold(
      backgroundColor: Papier.bg,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(56),
        child: Container(
          color: Papier.surface,
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
          child: SafeArea(
            child: Row(
              children: [
                GestureDetector(
                  onTap: () => context.pop(),
                  child: Text(
                    '← Annales',
                    style: PapierType.smallCaps(fontSize: 10, color: Papier.ink3),
                  ),
                ),
                const Spacer(),
                Text(
                  'BAC',
                  style: PapierType.smallCaps(fontSize: 10, color: Papier.ink3),
                ),
                const Spacer(),
                GestureDetector(
                  onTap: () => ref.read(examActionsProvider).toggleFavorite(examId),
                  child: Text(
                    '☆',
                    style: PapierType.serif(fontSize: 20, color: Papier.ink3),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: examAsync.when(
        data: (exam) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(Spacing.md),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _ExamHeader(exam: exam),
                const SizedBox(height: Spacing.lg),
                progressAsync.when(
                  data: (progress) => _ProgressSection(
                    exam: exam,
                    progress: progress,
                  ),
                  loading: () => const ShimmerBox(width: double.infinity, height: 80),
                  error: (_, __) => const SizedBox.shrink(),
                ),
                const SizedBox(height: Spacing.lg),
                questionsAsync.when(
                  data: (questions) => _QuestionsPreview(
                    exam: exam,
                    questions: questions,
                  ),
                  loading: () => const CardListSkeleton(itemCount: 4, itemHeight: 56),
                  error: (e, _) => ErrorRetryWidget(
                    message: 'Impossible de charger les questions.',
                    onRetry: () => ref.invalidate(examQuestionsProvider(examId)),
                  ),
                ),
                const SizedBox(height: Spacing.xl),
              ],
            ),
          );
        },
        loading: () => const CardListSkeleton(itemCount: 3, itemHeight: 100),
        error: (e, _) => ErrorRetryWidget(
          message: "Impossible de charger l'épreuve.",
          onRetry: () => ref.invalidate(examProvider(examId)),
        ),
      ),
      bottomNavigationBar: examAsync.when(
        data: (exam) => _BottomBar(exam: exam, examId: examId),
        loading: () => null,
        error: (_, __) => null,
      ),
    );
  }
}

class _ExamHeader extends StatelessWidget {
  final BacExam exam;

  const _ExamHeader({required this.exam});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.ink, width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'ROYAUME DU MAROC · MINISTÈRE DE L\'ÉDUCATION NATIONALE',
            style: PapierType.smallCaps(fontSize: 8, color: Papier.ink3),
          ),
          const SizedBox(height: 2),
          Text(
            'SESSION ${exam.session.labelFr.toUpperCase()} ${exam.year}',
            style: PapierType.mono(fontSize: 9, color: Papier.ink3, letterSpacing: 1.0),
          ),
          const SizedBox(height: 8),
          const DoubleRule(),
          const SizedBox(height: 10),
          Text(
            'Épreuve de ${exam.subjectName}',
            style: PapierType.italic(fontSize: 22, letterSpacing: -0.3),
          ),
          const SizedBox(height: 4),
          Text(
            exam.streamLabel,
            style: PapierType.italic(fontSize: 13, color: Papier.ink2),
          ),
          const SizedBox(height: 14),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: Papier.line2),
            ),
            child: Row(
              children: [
                _InfoCell(label: 'DURÉE', value: '${exam.durationMinutes ~/ 60}h${exam.durationMinutes % 60 > 0 ? '${exam.durationMinutes % 60}' : ''}'),
                Container(width: 1, height: 44, color: Papier.line2),
                _InfoCell(label: 'POINTS', value: '${exam.totalScore}'),
                Container(width: 1, height: 44, color: Papier.line2),
                _InfoCell(label: 'ANNÉE', value: '${exam.year}'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _InfoCell extends StatelessWidget {
  final String label;
  final String value;

  const _InfoCell({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Column(
          children: [
            Text(label, style: PapierType.smallCaps(fontSize: 8, color: Papier.ink3)),
            const SizedBox(height: 2),
            Text(value, style: PapierType.serif(fontSize: 17)),
          ],
        ),
      ),
    );
  }
}

class _ProgressSection extends StatelessWidget {
  final BacExam exam;
  final UserExamProgress? progress;

  const _ProgressSection({required this.exam, this.progress});

  @override
  Widget build(BuildContext context) {
    if (progress == null) {
      return Container(
        padding: const EdgeInsets.all(Spacing.md),
        decoration: BoxDecoration(
          color: BacPrepColors.surfaceVariant,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Icon(Icons.play_circle_outline, color: BacPrepColors.primary),
            const SizedBox(width: Spacing.md),
            Expanded(
              child: Text(
                AppLocalizations.of(context)!.notAttemptedYet,
                style: const TextStyle(color: BacPrepColors.textSecondary),
              ),
            ),
          ],
        ),
      );
    }

    final score = progress!.percentage;
    final color = score >= 80
        ? BacPrepColors.success
        : score >= 60
            ? BacPrepColors.accent
            : score >= 40
                ? BacPrepColors.warning
                : BacPrepColors.error;

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.check_circle, color: color),
              const SizedBox(width: Spacing.sm),
              Text(
                AppLocalizations.of(context)!.lastAttempt,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  color: color,
                ),
              ),
              const Spacer(),
              Text(
                '${progress!.percentage.toStringAsFixed(1)}%',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          LinearProgressIndicator(
            value: progress!.percentage / 100,
            backgroundColor: BacPrepColors.border,
            valueColor: AlwaysStoppedAnimation(color),
          ),
          const SizedBox(height: Spacing.sm),
          Text(
            '${progress!.scoreObtained.toStringAsFixed(1)}/${progress!.scoreMax} points • ${progress!.attemptNumber} tentative${progress!.attemptNumber > 1 ? 's' : ''}',
            style: TextStyle(
              color: BacPrepColors.textSecondary,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}

class _QuestionsPreview extends StatelessWidget {
  final BacExam exam;
  final List<ExamQuestion> questions;

  const _QuestionsPreview({required this.exam, required this.questions});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          AppLocalizations.of(context)!.questions(questions.length),
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: Spacing.sm),
        ...questions.take(5).map((q) => _QuestionPreview(question: q)),
        if (questions.length > 5)
          Padding(
            padding: const EdgeInsets.only(top: Spacing.sm),
            child: Text(
              AppLocalizations.of(context)!.moreQuestions(questions.length - 5),
              style: const TextStyle(color: BacPrepColors.textSecondary),
            ),
          ),
      ],
    );
  }
}

class _QuestionPreview extends StatelessWidget {
  final ExamQuestion question;

  const _QuestionPreview({required this.question});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: Spacing.sm),
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: BacPrepColors.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(
              child: Text(
                '${question.questionNumber}',
                style: TextStyle(
                  color: BacPrepColors.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          const SizedBox(width: Spacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  question.stem.length > 100
                      ? '${question.stem.substring(0, 100)}...'
                      : question.stem,
                  style: const TextStyle(fontSize: 13),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Icon(
                      Icons.star,
                      size: 12,
                      color: BacPrepColors.accent,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '${question.points} pts',
                      style: TextStyle(
                        fontSize: 11,
                        color: BacPrepColors.textSecondary,
                      ),
                    ),
                    const SizedBox(width: Spacing.sm),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: BacPrepColors.surfaceVariant,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        question.itemType.name,
                        style: const TextStyle(fontSize: 10),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _BottomBar extends StatelessWidget {
  final BacExam exam;
  final String examId;

  const _BottomBar({required this.exam, required this.examId});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: const BoxDecoration(
        color: Papier.surface,
        border: Border(top: BorderSide(color: Papier.line2)),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (exam.pdfUrl != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: GestureDetector(
                  onTap: () => _openPdf(context, exam.pdfUrl!),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    decoration: BoxDecoration(
                      border: Border.all(color: Papier.ink),
                      color: Papier.bg2,
                    ),
                    child: Center(
                      child: Text(
                        AppLocalizations.of(context)!.viewPdf,
                        style: PapierType.smallCaps(
                            fontSize: 11, color: Papier.ink2),
                      ),
                    ),
                  ),
                ),
              ),
            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => _startPractice(context, ExamMode.practice),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      decoration: BoxDecoration(
                        border: Border.all(color: Papier.ink),
                        color: Papier.bg2,
                      ),
                      child: Center(
                        child: Text(
                          AppLocalizations.of(context)!.practice,
                          style: PapierType.smallCaps(
                              fontSize: 11, color: Papier.ink),
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  flex: 2,
                  child: GestureDetector(
                    onTap: () => _startPractice(context, ExamMode.timed),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      color: Papier.ink,
                      child: Center(
                        child: Text(
                          'Commencer (3h) →',
                          style: PapierType.smallCaps(
                              fontSize: 11, color: Papier.surface),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openPdf(BuildContext context, String url) async {
    final uri = Uri.parse(url);
    try {
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(AppLocalizations.of(context)!.cantOpenPdf)),
          );
        }
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(AppLocalizations.of(context)!.error('$e'))),
        );
      }
    }
  }

  void _startPractice(BuildContext context, ExamMode mode) {
    if (mode == ExamMode.timed) {
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(AppLocalizations.of(context)!.examMode),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(AppLocalizations.of(context)!.examModeIntro),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: BacPrepColors.warning.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.timer, color: BacPrepColors.warning),
                    const SizedBox(width: 8),
                    Text(
                      '${exam.durationMinutes} minutes',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              Text(
                AppLocalizations.of(context)!.rules,
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
              Text(AppLocalizations.of(context)!.ruleNoExit),
              Text(AppLocalizations.of(context)!.ruleTimed),
              Text(AppLocalizations.of(context)!.ruleAutoSubmit),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: Text(AppLocalizations.of(context)!.cancel),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(ctx);
                context.push('/exams/$examId/practice?mode=timed');
              },
              child: Text(AppLocalizations.of(context)!.start),
            ),
          ],
        ),
      );
    } else {
      context.push('/exams/$examId/practice');
    }
  }
}
