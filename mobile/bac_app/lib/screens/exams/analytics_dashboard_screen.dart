import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../providers/exam_provider.dart';
import '../../services/api_service.dart';

class AnalyticsDashboardScreen extends ConsumerWidget {
  const AnalyticsDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.myPerformance),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          ref.invalidate(examHistoryProvider);
          ref.invalidate(subjectPerformanceProvider);
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(Spacing.md),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _OverallScoreCard(),
              const SizedBox(height: Spacing.lg),
              _ExamHistorySection(),
              const SizedBox(height: Spacing.lg),
              _SubjectPerformanceSection(),
              const SizedBox(height: Spacing.lg),
              _WeakTopicsSection(),
            ],
          ),
        ),
      ),
    );
  }
}

class _OverallScoreCard extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final historyAsync = ref.watch(examHistoryProvider);

    return historyAsync.when(
      data: (history) {
        if (history.isEmpty) {
          return _EmptyCard(
            icon: Icons.analytics,
            title: AppLocalizations.of(context)!.noDataYet,
            subtitle: AppLocalizations.of(context)!.completeExamsHint,
          );
        }

        final totalExams = history.length;
        final avgScore = history.fold<double>(
          0,
          (sum, exam) => sum + (exam['percentage'] as double? ?? 0),
        ) / totalExams;

        final bestScore = history.fold<double>(
          0,
          (best, exam) {
            final score = exam['percentage'] as double? ?? 0;
            return score > best ? score : best;
          },
        );

        final totalTime = history.fold<int>(
          0,
          (sum, exam) => sum + (exam['time_spent_seconds'] as int? ?? 0),
        );

        return Container(
          padding: const EdgeInsets.all(Spacing.lg),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                BacPrepColors.primary,
                BacPrepColors.primaryLight,
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: BacPrepColors.primary.withValues(alpha: 0.3),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                AppLocalizations.of(context)!.overview,
                style: const TextStyle(
                  color: Colors.white70,
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: Spacing.md),
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    '${avgScore.toStringAsFixed(1)}%',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: Spacing.md),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Text(
                      AppLocalizations.of(context)!.averageScore,
                      style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.8),
                        fontSize: 14,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: Spacing.lg),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _StatItem(
                    icon: Icons.quiz,
                    value: '$totalExams',
                    label: AppLocalizations.of(context)!.examsLabel,
                  ),
                  _StatItem(
                    icon: Icons.emoji_events,
                    value: '${bestScore.toStringAsFixed(0)}%',
                    label: AppLocalizations.of(context)!.bestScore,
                  ),
                  _StatItem(
                    icon: Icons.timer,
                    value: _formatDuration(totalTime),
                    label: AppLocalizations.of(context)!.totalTime,
                  ),
                ],
              ),
            ],
          ),
        );
      },
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _ErrorCard(message: e.toString()),
    );
  }

  String _formatDuration(int seconds) {
    final hours = seconds ~/ 3600;
    final minutes = (seconds % 3600) ~/ 60;
    
    if (hours > 0) {
      return '${hours}h ${minutes}m';
    }
    return '${minutes}m';
  }
}

class _StatItem extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;

  const _StatItem({
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
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withValues(alpha: 0.8),
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}

class _ExamHistorySection extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final historyAsync = ref.watch(examHistoryProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              AppLocalizations.of(context)!.examHistory,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            TextButton(
              onPressed: () {},
              child: Text(AppLocalizations.of(context)!.viewAll),
            ),
          ],
        ),
        const SizedBox(height: Spacing.sm),
        historyAsync.when(
          data: (history) {
            if (history.isEmpty) {
              return const SizedBox.shrink();
            }

            return Column(
              children: history.take(5).map((exam) {
                final examData = exam['bac_exams'] as Map<String, dynamic>?;
                final subject = examData?['subjects'] as Map<String, dynamic>?;
                final score = exam['percentage'] as double? ?? 0;
                final completedAt = exam['completed_at'] as String?;
                
                return _ExamHistoryCard(
                  subjectName: subject?['name_fr'] as String? ?? 'Unknown',
                  year: examData?['year'] as int? ?? 0,
                  session: examData?['session'] as String? ?? '',
                  score: score,
                  completedAt: completedAt != null 
                      ? DateTime.parse(completedAt) 
                      : null,
                );
              }).toList(),
            );
          },
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (e, _) => _ErrorCard(message: e.toString()),
        ),
      ],
    );
  }
}

class _ExamHistoryCard extends StatelessWidget {
  final String subjectName;
  final int year;
  final String session;
  final double score;
  final DateTime? completedAt;

  const _ExamHistoryCard({
    required this.subjectName,
    required this.year,
    required this.session,
    required this.score,
    this.completedAt,
  });

  @override
  Widget build(BuildContext context) {
    final color = score >= 80
        ? BacPrepColors.success
        : score >= 60
            ? BacPrepColors.accent
            : score >= 40
                ? BacPrepColors.warning
                : BacPrepColors.error;

    return Card(
      margin: const EdgeInsets.only(bottom: Spacing.sm),
      child: Padding(
        padding: const EdgeInsets.all(Spacing.md),
        child: Row(
          children: [
            Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(
                  '${score.toStringAsFixed(0)}',
                  style: TextStyle(
                    color: color,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
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
                    subjectName,
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '$year • ${_sessionLabel(session)}',
                    style: TextStyle(
                      color: BacPrepColors.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            if (completedAt != null)
              Text(
                _formatDate(completedAt!),
                style: TextStyle(
                  color: BacPrepColors.textTertiary,
                  fontSize: 11,
                ),
              ),
          ],
        ),
      ),
    );
  }

  String _sessionLabel(String session) {
    switch (session) {
      case 'normale':
        return 'Normale';
      case 'rattrapage':
        return 'Rattrapage';
      default:
        return session;
    }
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final diff = now.difference(date);
    if (diff.inDays == 0) return 'Aujourd\'hui';
    if (diff.inDays == 1) return 'Hier';
    if (diff.inDays < 7) return 'Il y a ${diff.inDays}j';
    return '${date.day}/${date.month}';
  }
}

class _SubjectPerformanceSection extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final performanceAsync = ref.watch(subjectPerformanceProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          AppLocalizations.of(context)!.subjectPerformance,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: Spacing.sm),
        performanceAsync.when(
          data: (performance) {
            if (performance.isEmpty) {
              return const SizedBox.shrink();
            }

            return Column(
              children: performance.entries.take(4).map((entry) {
                return _SubjectPerformanceBar(
                  subjectId: entry.key,
                  percentage: entry.value,
                );
              }).toList(),
            );
          },
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (e, _) => _ErrorCard(message: e.toString()),
        ),
      ],
    );
  }
}

class _SubjectPerformanceBar extends ConsumerWidget {
  final String subjectId;
  final int percentage;

  const _SubjectPerformanceBar({
    required this.subjectId,
    required this.percentage,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final subjectsAsync = ref.watch(examSubjectsProvider);
    
    String subjectName = AppLocalizations.of(context)!.navSubjects;
    if (subjectsAsync.hasValue) {
      final subjects = subjectsAsync.value!;
      final subject = subjects.firstWhere(
        (s) => s['id'] == subjectId,
        orElse: () => {'name': 'Unknown'},
      );
      subjectName = subject['name'] ?? 'Unknown';
    }

    final color = percentage >= 80
        ? BacPrepColors.success
        : percentage >= 60
            ? BacPrepColors.accent
            : percentage >= 40
                ? BacPrepColors.warning
                : BacPrepColors.error;

    return Padding(
      padding: const EdgeInsets.only(bottom: Spacing.sm),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                subjectName,
                style: const TextStyle(fontSize: 13),
              ),
              Text(
                '$percentage%',
                style: TextStyle(
                  color: color,
                  fontWeight: FontWeight.w600,
                  fontSize: 13,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: percentage / 100,
              backgroundColor: BacPrepColors.surfaceVariant,
              valueColor: AlwaysStoppedAnimation(color),
              minHeight: 8,
            ),
          ),
        ],
      ),
    );
  }
}

class _WeakTopicsSection extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final weakTopicsAsync = ref.watch(weakTopicsProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.lightbulb_outline, color: BacPrepColors.warning, size: 20),
            const SizedBox(width: Spacing.sm),
            Text(
              AppLocalizations.of(context)!.topicsToReview,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
        const SizedBox(height: Spacing.sm),
        weakTopicsAsync.when(
          data: (topics) {
            if (topics.isEmpty) {
              return _EmptyCard(
                icon: Icons.check_circle,
                title: AppLocalizations.of(context)!.noWeaknessDetected,
                subtitle: AppLocalizations.of(context)!.encourageGood,
              );
            }

            return Wrap(
              spacing: Spacing.sm,
              runSpacing: Spacing.sm,
              children: topics.take(6).map((topic) {
                final skill = topic['skills'] as Map<String, dynamic>?;
                final mastery = topic['mastery_percentage'] as num? ?? 0;
                
                return Chip(
                  avatar: CircleAvatar(
                    backgroundColor: _getMasteryColor(mastery.toDouble()),
                    radius: 10,
                    child: Text(
                      '${mastery.toInt()}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 9,
                      ),
                    ),
                  ),
                  label: Text(
                    skill?['name_fr'] as String? ?? 'Unknown',
                    style: const TextStyle(fontSize: 12),
                  ),
                  backgroundColor: BacPrepColors.surface,
                );
              }).toList(),
            );
          },
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (e, _) => _ErrorCard(message: e.toString()),
        ),
      ],
    );
  }

  Color _getMasteryColor(double mastery) {
    if (mastery >= 80) return BacPrepColors.success;
    if (mastery >= 60) return BacPrepColors.accent;
    if (mastery >= 40) return BacPrepColors.warning;
    return BacPrepColors.error;
  }
}

class _EmptyCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _EmptyCard({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(Spacing.xl),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          Icon(icon, size: 48, color: BacPrepColors.textTertiary),
          const SizedBox(height: Spacing.md),
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            subtitle,
            style: const TextStyle(
              fontSize: 12,
              color: BacPrepColors.textTertiary,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _ErrorCard extends StatelessWidget {
  final String message;

  const _ErrorCard({required this.message});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.error.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          const Icon(Icons.error_outline, color: BacPrepColors.error),
          const SizedBox(width: Spacing.sm),
          Expanded(
            child: Text(
              message,
              style: const TextStyle(color: BacPrepColors.error, fontSize: 13),
            ),
          ),
        ],
      ),
    );
  }
}

// Additional providers for analytics
final examHistoryProvider = FutureProvider<List<Map<String, dynamic>>>((ref) async {
  final api = ref.read(apiServiceProvider);
  return api.getExamHistory(limit: 10);
});

final subjectPerformanceProvider = FutureProvider<Map<String, int>>((ref) async {
  final api = ref.read(apiServiceProvider);
  return api.getSubjectPerformance();
});

final weakTopicsProvider = FutureProvider<List<Map<String, dynamic>>>((ref) async {
  final api = ref.read(apiServiceProvider);
  return api.getWeakTopics();
});
