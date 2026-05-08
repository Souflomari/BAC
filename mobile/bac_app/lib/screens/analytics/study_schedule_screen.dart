import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/skill.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/shimmer_skeleton.dart';

/// Default target retention for optimal review scheduling
const _targetRetention = 0.85;

class _ScheduledReview {
  final EnrichedSkillState enriched;
  final double hoursUntilReview;
  final double currentStrength;

  const _ScheduledReview({
    required this.enriched,
    required this.hoursUntilReview,
    required this.currentStrength,
  });
}

enum _ReviewBucket { overdue, today, tomorrow, thisWeek, later }

class StudyScheduleScreen extends ConsumerWidget {
  const StudyScheduleScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final enrichedAsync = ref.watch(enrichedSkillStatesProvider);
    final l = AppLocalizations.of(context)!;
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      appBar: AppBar(title: Text(l.studySchedule)),
      body: enrichedAsync.when(
        loading: () => const CardListSkeleton(itemCount: 6, itemHeight: 64),
        error: (e, _) => Center(child: Text(l.error('$e'))),
        data: (allStates) {
          // Only skills that have been reviewed at least once
          final reviewed = allStates
              .where((s) => s.state.lastReviewedAt != null && s.state.mastery != MasteryLevel.locked)
              .toList();

          if (reviewed.isEmpty) {
            return Center(child: Text(l.noData));
          }

          // Compute optimal review time for each skill
          final scheduled = reviewed.map((s) {
            final halfLife = s.state.halfLifeHours;
            final optimalHours = -halfLife * (math.log(_targetRetention) / math.ln2);
            final elapsed = DateTime.now().difference(s.state.lastReviewedAt!).inMinutes / 60.0;
            final hoursUntil = optimalHours - elapsed;
            return _ScheduledReview(
              enriched: s,
              hoursUntilReview: hoursUntil,
              currentStrength: s.state.strength,
            );
          }).toList()
            ..sort((a, b) => a.hoursUntilReview.compareTo(b.hoursUntilReview));

          // Bucket into groups
          final buckets = <_ReviewBucket, List<_ScheduledReview>>{};
          for (final r in scheduled) {
            final bucket = _getBucket(r.hoursUntilReview);
            buckets.putIfAbsent(bucket, () => []).add(r);
          }

          // Count overdue
          final overdueCount = buckets[_ReviewBucket.overdue]?.length ?? 0;

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(enrichedSkillStatesProvider),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 960),
                child: ListView(
              padding: const EdgeInsets.all(Spacing.md),
              children: [
                // Overdue banner
                if (overdueCount > 0)
                  Container(
                    padding: const EdgeInsets.all(Spacing.md),
                    margin: const EdgeInsets.only(bottom: Spacing.md),
                    decoration: BoxDecoration(
                      color: BacPrepColors.error.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: BacPrepColors.error.withValues(alpha: 0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.warning_amber, color: BacPrepColors.error, size: 22),
                        const SizedBox(width: Spacing.sm),
                        Expanded(
                          child: Text(
                            l.overdueReviews(overdueCount),
                            style: const TextStyle(
                              color: BacPrepColors.error,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                // Sections
                ..._ReviewBucket.values.where((b) => buckets.containsKey(b)).map(
                  (bucket) => _BucketSection(
                    bucket: bucket,
                    reviews: buckets[bucket]!,
                    isArabic: isArabic,
                  ),
                ),
              ],
            ),
              ),
            ),
          );
        },
      ),
    );
  }

  static _ReviewBucket _getBucket(double hoursUntil) {
    if (hoursUntil <= 0) return _ReviewBucket.overdue;
    if (hoursUntil <= 24) return _ReviewBucket.today;
    if (hoursUntil <= 48) return _ReviewBucket.tomorrow;
    if (hoursUntil <= 168) return _ReviewBucket.thisWeek;
    return _ReviewBucket.later;
  }
}

class _BucketSection extends StatelessWidget {
  final _ReviewBucket bucket;
  final List<_ScheduledReview> reviews;
  final bool isArabic;

  const _BucketSection({
    required this.bucket,
    required this.reviews,
    required this.isArabic,
  });

  String _bucketLabel(AppLocalizations l) {
    switch (bucket) {
      case _ReviewBucket.overdue:
        return l.reviewToday;
      case _ReviewBucket.today:
        return l.reviewToday;
      case _ReviewBucket.tomorrow:
        return l.reviewTomorrow;
      case _ReviewBucket.thisWeek:
        return l.thisWeek;
      case _ReviewBucket.later:
        return l.later;
    }
  }

  Color _bucketColor() {
    switch (bucket) {
      case _ReviewBucket.overdue:
        return BacPrepColors.error;
      case _ReviewBucket.today:
        return BacPrepColors.warning;
      case _ReviewBucket.tomorrow:
        return BacPrepColors.primaryLight;
      case _ReviewBucket.thisWeek:
        return BacPrepColors.textSecondary;
      case _ReviewBucket.later:
        return BacPrepColors.textTertiary;
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: Spacing.sm),
          child: Row(
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: _bucketColor(),
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: Spacing.sm),
              Text(
                _bucketLabel(l),
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: _bucketColor(),
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(width: Spacing.sm),
              Text(
                '(${reviews.length})',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: BacPrepColors.textTertiary,
                ),
              ),
            ],
          ),
        ),
        ...reviews.map((r) => _ReviewTile(
          review: r,
          isArabic: isArabic,
          bucketColor: _bucketColor(),
        )),
        const SizedBox(height: Spacing.sm),
      ],
    );
  }
}

class _ReviewTile extends StatelessWidget {
  final _ScheduledReview review;
  final bool isArabic;
  final Color bucketColor;

  const _ReviewTile({
    required this.review,
    required this.isArabic,
    required this.bucketColor,
  });

  @override
  Widget build(BuildContext context) {
    final e = review.enriched;
    final l = AppLocalizations.of(context)!;
    final strengthPercent = (review.currentStrength * 100).round();

    return Card(
      margin: const EdgeInsets.only(bottom: 4),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => context.push('/session', extra: {
          'skill_id': e.skillId,
          'session_type': 'review',
        }),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: Spacing.md, vertical: Spacing.sm),
          child: Row(
            children: [
              // Subject color bar
              Container(
                width: 4,
                height: 36,
                decoration: BoxDecoration(
                  color: e.subjectColor,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(width: Spacing.sm),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      isArabic ? e.skillNameAr : e.skillNameFr,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    Text(
                      isArabic ? e.subjectNameAr : e.subjectNameFr,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: BacPrepColors.textTertiary,
                      ),
                    ),
                  ],
                ),
              ),
              // Strength badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: _strengthColor(review.currentStrength).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '$strengthPercent%',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: _strengthColor(review.currentStrength),
                  ),
                ),
              ),
              const SizedBox(width: Spacing.sm),
              Text(
                l.reviewNow,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: bucketColor,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Color _strengthColor(double strength) {
    if (strength >= 0.7) return BacPrepColors.success;
    if (strength >= 0.4) return BacPrepColors.warning;
    return BacPrepColors.error;
  }
}
