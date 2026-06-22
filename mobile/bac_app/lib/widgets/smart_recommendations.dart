import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../l10n/app_localizations.dart';
import '../models/skill.dart';
import '../providers/progress_provider.dart';

/// Shows top 3 recommended skills to study today based on urgency × exam relevance.
class SmartRecommendations extends ConsumerWidget {
  const SmartRecommendations({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final enrichedAsync = ref.watch(enrichedSkillStatesProvider);
    final l = AppLocalizations.of(context)!;
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return enrichedAsync.when(
      loading: () => const SizedBox.shrink(),
      error: (_, __) => const SizedBox.shrink(),
      data: (allStates) {
        // Only consider reviewed skills that aren't already mastered
        final candidates = allStates
            .where((s) =>
                s.state.lastReviewedAt != null &&
                s.state.mastery != MasteryLevel.master &&
                s.state.mastery != MasteryLevel.locked)
            .toList();

        if (candidates.isEmpty) {
          return const SizedBox.shrink();
        }

        // Score and sort by urgency
        final scored = candidates.map((s) => _ScoredSkill(s)).toList()
          ..sort((a, b) => b.score.compareTo(a.score));

        final top3 = scored.take(3).toList();

        return Card(
          child: Padding(
            padding: const EdgeInsets.all(Spacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.auto_awesome, color: BacPrepColors.accent, size: 20),
                    const SizedBox(width: Spacing.sm),
                    Text(
                      l.recommendedFocus,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ],
                ),
                const SizedBox(height: Spacing.md),
                ...top3.map((scored) => _RecommendationTile(
                  scored: scored,
                  isArabic: isArabic,
                  onTap: () => context.push('/session', extra: {
                    'skill_id': scored.enriched.skillId,
                    'session_type': 'review',
                  }),
                )),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _ScoredSkill {
  final EnrichedSkillState enriched;
  late final double score;
  late final String reasonKey;

  _ScoredSkill(this.enriched) {
    // Compute composite score
    final strength = enriched.state.strength;
    final strengthFactor = 1.0 - strength;
    final examFactor = enriched.skillExamWeight * enriched.topicExamWeight * enriched.coefficient;
    final abilityGap = (enriched.difficultyLevel - enriched.state.estimatedAbility).clamp(0.0, 4.0) / 4.0;

    score = strengthFactor * 0.5 + examFactor * 0.3 + abilityGap * 0.2;

    // Determine primary reason
    if (strength < 0.4) {
      reasonKey = 'fadingFast';
    } else if (examFactor > 0.5) {
      reasonKey = 'highCoefficient';
    } else {
      reasonKey = 'challengeZone';
    }
  }
}

class _RecommendationTile extends StatelessWidget {
  final _ScoredSkill scored;
  final bool isArabic;
  final VoidCallback onTap;

  const _RecommendationTile({
    required this.scored,
    required this.isArabic,
    required this.onTap,
  });

  String _reasonLabel(AppLocalizations l) {
    switch (scored.reasonKey) {
      case 'fadingFast':
        return l.fadingFast;
      case 'highCoefficient':
        return l.highCoefficient;
      default:
        return l.challengeZone;
    }
  }

  Color _reasonColor() {
    switch (scored.reasonKey) {
      case 'fadingFast':
        return BacPrepColors.error;
      case 'highCoefficient':
        return BacPrepColors.warning;
      default:
        return BacPrepColors.primaryLight;
    }
  }

  IconData _reasonIcon() {
    switch (scored.reasonKey) {
      case 'fadingFast':
        return Icons.trending_down;
      case 'highCoefficient':
        return Icons.priority_high;
      default:
        return Icons.fitness_center;
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final e = scored.enriched;
    final strengthPercent = (e.state.strength * 100).round();
    final color = _reasonColor();

    return Padding(
      padding: const EdgeInsets.only(bottom: Spacing.sm),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(10),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: Spacing.md, vertical: Spacing.sm),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: e.subjectColor.withValues(alpha: 0.10),
          ),
          child: Row(
            children: [
              // Subject color indicator
              Container(
                width: 4,
                height: 40,
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
                    const SizedBox(height: 2),
                    Row(
                      children: [
                        Text(
                          isArabic ? e.subjectNameAr : e.subjectNameFr,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: BacPrepColors.textTertiary,
                          ),
                        ),
                        const SizedBox(width: Spacing.sm),
                        Icon(_reasonIcon(), size: 12, color: color),
                        const SizedBox(width: 2),
                        Text(
                          _reasonLabel(l),
                          style: TextStyle(fontSize: 11, color: color, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // Strength indicator
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: _strengthColor(e.state.strength).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '$strengthPercent%',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: _strengthColor(e.state.strength),
                  ),
                ),
              ),
              const SizedBox(width: Spacing.sm),
              Icon(Icons.chevron_right, size: 18, color: BacPrepColors.textTertiary),
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
