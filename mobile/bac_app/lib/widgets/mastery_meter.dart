import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/skill.dart';

class MasteryMeter extends StatelessWidget {
  final String mastery;
  final int streak;

  const MasteryMeter({
    super.key,
    required this.mastery,
    this.streak = 0,
  });

  @override
  Widget build(BuildContext context) {
    final level = MasteryLevel.fromValue(mastery);

    return Row(
      children: [
        // Mastery badge
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: level.color.withValues(alpha: 0.15),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(_iconForMastery(level), size: 16, color: level.color),
              const SizedBox(width: 4),
              Text(
                level.labelFr,
                style: TextStyle(
                  color: level.color,
                  fontWeight: FontWeight.w600,
                  fontSize: 13,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(width: Spacing.sm),

        // Mastery progress dots
        Expanded(
          child: Row(
            children: MasteryLevel.values
                .where((l) => l != MasteryLevel.locked)
                .map((l) {
              final isActive = l.index <= level.index;
              return Expanded(
                child: Container(
                  height: 4,
                  margin: const EdgeInsets.symmetric(horizontal: 2),
                  decoration: BoxDecoration(
                    color: isActive ? level.color : BacPrepColors.surfaceVariant,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              );
            }).toList(),
          ),
        ),

        // Streak
        if (streak > 0) ...[
          const SizedBox(width: Spacing.sm),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: BacPrepColors.accent.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.local_fire_department,
                    size: 14, color: BacPrepColors.accent),
                const SizedBox(width: 2),
                Text(
                  '$streak',
                  style: const TextStyle(
                    color: BacPrepColors.accent,
                    fontWeight: FontWeight.w600,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }

  IconData _iconForMastery(MasteryLevel level) {
    switch (level) {
      case MasteryLevel.locked: return Icons.lock;
      case MasteryLevel.novice: return Icons.star_outline;
      case MasteryLevel.developing: return Icons.trending_up;
      case MasteryLevel.proficient: return Icons.verified_outlined;
      case MasteryLevel.master: return Icons.emoji_events;
    }
  }
}
