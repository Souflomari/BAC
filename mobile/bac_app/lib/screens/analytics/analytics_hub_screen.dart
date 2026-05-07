import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/skill.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/exam_readiness_card.dart';
import '../../widgets/smart_recommendations.dart';
import '../../widgets/progress_charts.dart';
import '../../widgets/shimmer_skeleton.dart';
import 'memory_heatmap_screen.dart';

class AnalyticsHubScreen extends ConsumerWidget {
  const AnalyticsHubScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final progressAsync = ref.watch(progressProvider);
    final enrichedAsync = ref.watch(enrichedSkillStatesProvider);
    final l = AppLocalizations.of(context)!;
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      appBar: AppBar(title: Text(l.analyticsHub)),
      body: RefreshIndicator(
        onRefresh: () async {
          ref.invalidate(progressProvider);
          ref.invalidate(enrichedSkillStatesProvider);
        },
        child: ListView(
          padding: const EdgeInsets.all(Spacing.md),
          children: [
            // 1. Exam Readiness Score
            const ExamReadinessCard(),
            const SizedBox(height: Spacing.md),

            // 2. Smart Recommendations
            const SmartRecommendations(),
            const SizedBox(height: Spacing.md),

            // 3. Memory Heatmap preview (compact)
            _SectionHeader(
              title: l.memoryHeatmap,
              onViewAll: () => context.push('/analytics/heatmap'),
            ),
            const SizedBox(height: Spacing.sm),
            enrichedAsync.when(
              loading: () => const CardListSkeleton(itemCount: 1, itemHeight: 60),
              error: (_, __) => const SizedBox.shrink(),
              data: (allStates) {
                if (allStates.isEmpty) {
                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(Spacing.lg),
                      child: Center(child: Text(l.noData)),
                    ),
                  );
                }
                return _CompactHeatmap(states: allStates, isArabic: isArabic);
              },
            ),
            const SizedBox(height: Spacing.md),

            // 4. Subject mastery charts
            progressAsync.when(
              loading: () => const CardListSkeleton(itemCount: 1, itemHeight: 200),
              error: (_, __) => const SizedBox.shrink(),
              data: (progress) => SubjectMasteryChart(subjects: progress.subjects),
            ),
            const SizedBox(height: Spacing.md),

            // 5. Upcoming Reviews (compact)
            _SectionHeader(
              title: l.studySchedule,
              onViewAll: () => context.push('/analytics/schedule'),
            ),
            const SizedBox(height: Spacing.sm),
            enrichedAsync.when(
              loading: () => const CardListSkeleton(itemCount: 3, itemHeight: 48),
              error: (_, __) => const SizedBox.shrink(),
              data: (allStates) => _CompactSchedule(states: allStates, isArabic: isArabic),
            ),

            const SizedBox(height: Spacing.xxl),
          ],
        ),
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final VoidCallback? onViewAll;

  const _SectionHeader({required this.title, this.onViewAll});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Row(
      children: [
        Expanded(
          child: Text(
            title,
            style: Theme.of(context).textTheme.titleMedium,
          ),
        ),
        if (onViewAll != null)
          TextButton(
            onPressed: onViewAll,
            child: Text(l.viewAll),
          ),
      ],
    );
  }
}

/// Compact heatmap showing only strength distribution as a single row of colored blocks
class _CompactHeatmap extends StatelessWidget {
  final List<EnrichedSkillState> states;
  final bool isArabic;

  const _CompactHeatmap({required this.states, required this.isArabic});

  @override
  Widget build(BuildContext context) {
    // Count by strength bucket
    int strong = 0, fading = 0, forgotten = 0, unreviewed = 0;
    for (final s in states) {
      if (s.state.lastReviewedAt == null) {
        unreviewed++;
      } else if (s.state.strength >= 0.7) {
        strong++;
      } else if (s.state.strength >= 0.4) {
        fading++;
      } else {
        forgotten++;
      }
    }

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Spacing.md),
        child: Column(
          children: [
            // Compact bar
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: SizedBox(
                height: 12,
                child: Row(
                  children: [
                    if (strong > 0)
                      Expanded(flex: strong, child: Container(color: BacPrepColors.success)),
                    if (fading > 0)
                      Expanded(flex: fading, child: Container(color: const Color(0xFFF59E0B))),
                    if (forgotten > 0)
                      Expanded(flex: forgotten, child: Container(color: BacPrepColors.error)),
                    if (unreviewed > 0)
                      Expanded(flex: unreviewed, child: Container(color: BacPrepColors.surfaceVariant)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: Spacing.sm),
            const HeatmapLegend(),
          ],
        ),
      ),
    );
  }
}

/// Shows top 5 most urgent upcoming reviews
class _CompactSchedule extends StatelessWidget {
  final List<EnrichedSkillState> states;
  final bool isArabic;

  const _CompactSchedule({required this.states, required this.isArabic});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    const targetRetention = 0.85;

    final reviewed = states
        .where((s) => s.state.lastReviewedAt != null && s.state.mastery != MasteryLevel.locked)
        .toList();

    if (reviewed.isEmpty) {
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(Spacing.lg),
          child: Center(child: Text(l.noData)),
        ),
      );
    }

    // Compute hours until review and sort
    final scheduled = reviewed.map((s) {
      final halfLife = s.state.halfLifeHours;
      final optimalHours = -halfLife * (math.log(targetRetention) / math.ln2);
      final elapsed = DateTime.now().difference(s.state.lastReviewedAt!).inMinutes / 60.0;
      return (enriched: s, hoursUntil: optimalHours - elapsed);
    }).toList()
      ..sort((a, b) => a.hoursUntil.compareTo(b.hoursUntil));

    final top5 = scheduled.take(5);

    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: Spacing.sm),
        child: Column(
          children: top5.map((r) {
            final e = r.enriched;
            final overdue = r.hoursUntil <= 0;
            final timeLabel = overdue
                ? l.reviewToday
                : l.nextReviewIn(l.hoursShort(r.hoursUntil.round()));

            return ListTile(
              dense: true,
              leading: Container(
                width: 4,
                height: 32,
                decoration: BoxDecoration(
                  color: e.subjectColor,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              title: Text(
                isArabic ? e.skillNameAr : e.skillNameFr,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
              ),
              trailing: Text(
                timeLabel,
                style: TextStyle(
                  fontSize: 12,
                  color: overdue ? BacPrepColors.error : BacPrepColors.textTertiary,
                  fontWeight: overdue ? FontWeight.w700 : FontWeight.normal,
                ),
              ),
              onTap: () => context.push('/session', extra: {
                'skill_id': e.skillId,
                'session_type': 'review',
              }),
            );
          }).toList(),
        ),
      ),
    );
  }
}
