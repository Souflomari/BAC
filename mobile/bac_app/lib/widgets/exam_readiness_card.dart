import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/theme.dart';
import '../l10n/app_localizations.dart';
import '../providers/auth_provider.dart';
import '../providers/progress_provider.dart';

/// Projects memory strength forward to exam date and shows readiness breakdown.
class ExamReadinessCard extends ConsumerWidget {
  const ExamReadinessCard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(profileProvider);
    final skillStatesAsync = ref.watch(skillStatesProvider);
    final l = AppLocalizations.of(context)!;

    return profileAsync.when(
      loading: () => const SizedBox.shrink(),
      error: (_, __) => const SizedBox.shrink(),
      data: (profile) {
        if (profile == null || profile.examDate == null) {
          return _NoExamDateCard(message: l.noExamDate);
        }

        return skillStatesAsync.when(
          loading: () => const SizedBox.shrink(),
          error: (_, __) => const SizedBox.shrink(),
          data: (skillStates) {
            final daysUntilExam = profile.examDate!.difference(DateTime.now()).inDays;
            if (daysUntilExam <= 0) return const SizedBox.shrink();

            final hoursToExam = daysUntilExam * 24.0;
            final reviewed = skillStates.where((s) => s.lastReviewedAt != null).toList();
            if (reviewed.isEmpty) return const SizedBox.shrink();

            // Project each skill's strength to exam day
            int strong = 0;
            int atRisk = 0;
            int critical = 0;

            for (final state in reviewed) {
              final projected = _projectStrength(state.halfLifeHours, state.lastReviewedAt!, hoursToExam);
              if (projected >= 0.5) {
                strong++;
              } else if (projected >= 0.3) {
                atRisk++;
              } else {
                critical++;
              }
            }

            final total = reviewed.length;
            final readyPercent = total > 0 ? (strong / total * 100).round() : 0;

            return Card(
              child: Padding(
                padding: const EdgeInsets.all(Spacing.lg),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.school,
                          color: _readinessColor(readyPercent),
                          size: 22,
                        ),
                        const SizedBox(width: Spacing.sm),
                        Text(
                          l.examReadiness,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: _readinessColor(readyPercent).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            l.examReadyPercent(readyPercent),
                            style: TextStyle(
                              fontWeight: FontWeight.w700,
                              fontSize: 13,
                              color: _readinessColor(readyPercent),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: Spacing.md),

                    // Progress bar
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: SizedBox(
                        height: 8,
                        child: Row(
                          children: [
                            if (strong > 0)
                              Expanded(
                                flex: strong,
                                child: Container(color: BacPrepColors.success),
                              ),
                            if (atRisk > 0)
                              Expanded(
                                flex: atRisk,
                                child: Container(color: BacPrepColors.warning),
                              ),
                            if (critical > 0)
                              Expanded(
                                flex: critical,
                                child: Container(color: BacPrepColors.error),
                              ),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: Spacing.md),

                    // Legend row
                    Row(
                      children: [
                        _LegendItem(
                          color: BacPrepColors.success,
                          label: l.skillsStrong(strong),
                        ),
                        const SizedBox(width: Spacing.md),
                        _LegendItem(
                          color: BacPrepColors.warning,
                          label: l.skillsAtRisk(atRisk),
                        ),
                        const SizedBox(width: Spacing.md),
                        _LegendItem(
                          color: BacPrepColors.error,
                          label: l.skillsCritical(critical),
                        ),
                      ],
                    ),

                    const SizedBox(height: Spacing.sm),

                    // Days countdown
                    Text(
                      l.daysUntilExam(daysUntilExam),
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: daysUntilExam < 30
                            ? BacPrepColors.warning
                            : BacPrepColors.textTertiary,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  /// Project strength to exam day: strength = 2^(-total_elapsed / half_life)
  static double _projectStrength(double halfLifeHours, DateTime lastReviewed, double hoursToExam) {
    final elapsedSoFar = DateTime.now().difference(lastReviewed).inMinutes / 60.0;
    final totalHours = elapsedSoFar + hoursToExam;
    if (halfLifeHours <= 0) return 0;
    return math.pow(2, -totalHours / halfLifeHours).toDouble();
  }

  static Color _readinessColor(int percent) {
    if (percent >= 70) return BacPrepColors.success;
    if (percent >= 40) return BacPrepColors.warning;
    return BacPrepColors.error;
  }
}

class _NoExamDateCard extends StatelessWidget {
  final String message;
  const _NoExamDateCard({required this.message});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Spacing.lg),
        child: Row(
          children: [
            const Icon(Icons.event, color: BacPrepColors.textTertiary, size: 22),
            const SizedBox(width: Spacing.sm),
            Expanded(
              child: Text(
                message,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: BacPrepColors.textSecondary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendItem({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 10,
          height: 10,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall,
        ),
      ],
    );
  }
}
