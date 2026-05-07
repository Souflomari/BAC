import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/theme.dart';
import '../l10n/app_localizations.dart';
import '../models/daily_quest.dart';
import '../providers/daily_quest_provider.dart';

class DailyQuestsCard extends ConsumerWidget {
  const DailyQuestsCard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(dailyQuestsProvider);
    final l = AppLocalizations.of(context)!;

    if (state.quests.isEmpty) return const SizedBox.shrink();

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Spacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.emoji_events, color: BacPrepColors.accent, size: 22),
                const SizedBox(width: Spacing.sm),
                Text(
                  l.dailyQuests,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                  decoration: BoxDecoration(
                    color: state.allCompleted
                        ? BacPrepColors.success.withValues(alpha: 0.12)
                        : BacPrepColors.accent.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '${state.completedCount} / ${state.quests.length}',
                    style: TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 12,
                      color: state.allCompleted
                          ? BacPrepColors.success
                          : BacPrepColors.accent,
                    ),
                  ),
                ),
              ],
            ),
            if (state.allCompleted) ...[
              const SizedBox(height: Spacing.md),
              Container(
                padding: const EdgeInsets.all(Spacing.sm),
                decoration: BoxDecoration(
                  color: BacPrepColors.success.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.celebration, color: BacPrepColors.success, size: 18),
                    const SizedBox(width: Spacing.sm),
                    Expanded(
                      child: Text(
                        l.allQuestsCompleted,
                        style: const TextStyle(
                          color: BacPrepColors.success,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: Spacing.md),
            ...state.quests.map((q) => _QuestTile(quest: q)),
          ],
        ),
      ),
    );
  }
}

class _QuestTile extends StatelessWidget {
  final DailyQuest quest;

  const _QuestTile({required this.quest});

  String _label(AppLocalizations l) {
    switch (quest.type) {
      case QuestType.correctAnswers:
        return l.questCorrectAnswers(quest.target);
      case QuestType.studyMinutes:
        return l.questStudyMinutes(quest.target);
      case QuestType.reviewSkills:
        return l.questReviewSkills(quest.target);
      case QuestType.completeSession:
        return l.questCompleteSession(quest.target);
      case QuestType.perfectStreak:
        return l.questPerfectStreak(quest.target);
    }
  }

  IconData _icon() {
    switch (quest.type) {
      case QuestType.correctAnswers:
        return Icons.check_circle_outline;
      case QuestType.studyMinutes:
        return Icons.timer_outlined;
      case QuestType.reviewSkills:
        return Icons.refresh;
      case QuestType.completeSession:
        return Icons.flag_outlined;
      case QuestType.perfectStreak:
        return Icons.bolt;
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final isComplete = quest.isComplete;
    final color = isComplete ? BacPrepColors.success : BacPrepColors.primary;

    return Padding(
      padding: const EdgeInsets.only(bottom: Spacing.sm),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(
              isComplete ? Icons.check : _icon(),
              size: 18,
              color: color,
            ),
          ),
          const SizedBox(width: Spacing.sm),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _label(l),
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    decoration: isComplete ? TextDecoration.lineThrough : null,
                    color: isComplete
                        ? BacPrepColors.textTertiary
                        : null,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(3),
                        child: LinearProgressIndicator(
                          value: quest.progress,
                          minHeight: 6,
                          backgroundColor: BacPrepColors.surfaceVariant,
                          valueColor: AlwaysStoppedAnimation(color),
                        ),
                      ),
                    ),
                    const SizedBox(width: Spacing.sm),
                    Text(
                      l.questProgress(quest.current.clamp(0, quest.target), quest.target),
                      style: const TextStyle(
                        fontSize: 11,
                        color: BacPrepColors.textTertiary,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: Spacing.sm),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: BacPrepColors.accent.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              l.questXpReward(quest.xpReward),
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: BacPrepColors.textPrimary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
