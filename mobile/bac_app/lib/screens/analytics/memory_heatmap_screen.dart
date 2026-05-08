import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/skill.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/shimmer_skeleton.dart';

class MemoryHeatmapScreen extends ConsumerWidget {
  const MemoryHeatmapScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final enrichedAsync = ref.watch(enrichedSkillStatesProvider);
    final l = AppLocalizations.of(context)!;
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      appBar: AppBar(title: Text(l.memoryHeatmap)),
      body: enrichedAsync.when(
        loading: () => const CardListSkeleton(itemCount: 5, itemHeight: 80),
        error: (e, _) => Center(child: Text(l.error('$e'))),
        data: (allStates) {
          if (allStates.isEmpty) {
            return Center(child: Text(l.noData));
          }

          // Group by subject
          final bySubject = <String, List<EnrichedSkillState>>{};
          for (final s in allStates) {
            bySubject.putIfAbsent(s.subjectId, () => []).add(s);
          }

          final subjectIds = bySubject.keys.toList();

          return Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 960),
              child: ListView.builder(
            padding: const EdgeInsets.all(Spacing.md),
            itemCount: subjectIds.length,
            itemBuilder: (context, index) {
              final subjectId = subjectIds[index];
              final skills = bySubject[subjectId]!;
              final subjectName = isArabic ? skills.first.subjectNameAr : skills.first.subjectNameFr;
              final subjectColor = skills.first.subjectColor;

              // Group by topic within subject
              final byTopic = <String, List<EnrichedSkillState>>{};
              for (final s in skills) {
                final topicKey = isArabic ? s.topicNameAr : s.topicNameFr;
                byTopic.putIfAbsent(topicKey, () => []).add(s);
              }

              return _SubjectHeatmapSection(
                subjectName: subjectName,
                subjectColor: subjectColor,
                topicGroups: byTopic,
                isArabic: isArabic,
              );
            },
          ),
            ),
          );
        },
      ),
    );
  }
}

class _SubjectHeatmapSection extends StatelessWidget {
  final String subjectName;
  final Color subjectColor;
  final Map<String, List<EnrichedSkillState>> topicGroups;
  final bool isArabic;

  const _SubjectHeatmapSection({
    required this.subjectName,
    required this.subjectColor,
    required this.topicGroups,
    required this.isArabic,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: Spacing.md),
      child: Padding(
        padding: const EdgeInsets.all(Spacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Subject header
            Row(
              children: [
                Container(
                  width: 4,
                  height: 20,
                  decoration: BoxDecoration(
                    color: subjectColor,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                const SizedBox(width: Spacing.sm),
                Text(
                  subjectName,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            const SizedBox(height: Spacing.md),

            // Topic groups with skill cells
            ...topicGroups.entries.map((entry) => Padding(
              padding: const EdgeInsets.only(bottom: Spacing.sm),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    entry.key,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: BacPrepColors.textSecondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Wrap(
                    spacing: 4,
                    runSpacing: 4,
                    children: entry.value.map((s) => _SkillCell(
                      enriched: s,
                      isArabic: isArabic,
                    )).toList(),
                  ),
                ],
              ),
            )),
          ],
        ),
      ),
    );
  }
}

class _SkillCell extends StatelessWidget {
  final EnrichedSkillState enriched;
  final bool isArabic;

  const _SkillCell({required this.enriched, required this.isArabic});

  Color _strengthColor(double strength) {
    if (strength >= 0.8) return BacPrepColors.success;
    if (strength >= 0.5) return const Color(0xFFF59E0B); // amber
    if (strength >= 0.3) return BacPrepColors.warning;
    if (strength > 0) return BacPrepColors.error;
    return BacPrepColors.surfaceVariant;
  }

  @override
  Widget build(BuildContext context) {
    final strength = enriched.state.strength;
    final color = enriched.state.lastReviewedAt != null
        ? _strengthColor(strength)
        : BacPrepColors.surfaceVariant;
    final l = AppLocalizations.of(context)!;

    return Tooltip(
      message: '${isArabic ? enriched.skillNameAr : enriched.skillNameFr}\n'
          '${enriched.state.lastReviewedAt != null ? l.strength((strength * 100).round()) : l.neverReviewed}',
      child: GestureDetector(
        onTap: () => _showSkillDetail(context),
        child: Container(
          width: 28,
          height: 28,
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.8),
            borderRadius: BorderRadius.circular(4),
            border: enriched.state.mastery == MasteryLevel.master
                ? Border.all(color: BacPrepColors.success, width: 1.5)
                : null,
          ),
        ),
      ),
    );
  }

  void _showSkillDetail(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final strength = enriched.state.strength;
    final name = isArabic ? enriched.skillNameAr : enriched.skillNameFr;

    String? nextReviewText;
    if (enriched.state.lastReviewedAt != null && enriched.state.halfLifeHours > 0) {
      // Time until strength drops to 0.85
      const targetRetention = 0.85;
      final optimalHours = -enriched.state.halfLifeHours * (math.log(targetRetention) / math.ln2);
      final elapsed = DateTime.now().difference(enriched.state.lastReviewedAt!).inHours;
      final hoursUntilReview = (optimalHours - elapsed).round();
      if (hoursUntilReview > 0) {
        nextReviewText = l.nextReviewIn(l.hoursShort(hoursUntilReview));
      } else {
        nextReviewText = l.reviewToday;
      }
    }

    showModalBottomSheet(
      context: context,
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(Spacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(name, style: Theme.of(ctx).textTheme.titleLarge),
            const SizedBox(height: Spacing.md),
            if (enriched.state.lastReviewedAt != null) ...[
              _DetailRow(
                icon: Icons.bar_chart,
                label: l.strength((strength * 100).round()),
                color: _strengthColor(strength),
              ),
              _DetailRow(
                icon: Icons.schedule,
                label: nextReviewText ?? l.reviewToday,
                color: BacPrepColors.textSecondary,
              ),
            ] else
              _DetailRow(
                icon: Icons.info_outline,
                label: l.neverReviewed,
                color: BacPrepColors.textTertiary,
              ),
            _DetailRow(
              icon: Icons.emoji_events,
              label: enriched.state.mastery.labelFr,
              color: enriched.state.mastery.color,
            ),
            const SizedBox(height: Spacing.lg),
          ],
        ),
      ),
    );
  }
}

class _DetailRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;

  const _DetailRow({required this.icon, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: Spacing.sm),
      child: Row(
        children: [
          Icon(icon, size: 18, color: color),
          const SizedBox(width: Spacing.sm),
          Text(label, style: TextStyle(fontSize: 14, color: color)),
        ],
      ),
    );
  }
}

/// Legend for the heatmap colors
class HeatmapLegend extends StatelessWidget {
  const HeatmapLegend({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _LegendDot(color: BacPrepColors.surfaceVariant, label: l.neverReviewed),
        const SizedBox(width: Spacing.md),
        _LegendDot(color: BacPrepColors.error, label: l.forgottenMemory),
        const SizedBox(width: Spacing.md),
        _LegendDot(color: const Color(0xFFF59E0B), label: l.fadingMemory),
        const SizedBox(width: Spacing.md),
        _LegendDot(color: BacPrepColors.success, label: l.strongMemory),
      ],
    );
  }
}

class _LegendDot extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendDot({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(3),
          ),
        ),
        const SizedBox(width: 4),
        Text(label, style: Theme.of(context).textTheme.bodySmall),
      ],
    );
  }
}
