import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/skill.dart';

class SkillTile extends StatelessWidget {
  final Skill skill;
  final UserSkillState? skillState;
  final VoidCallback onTap;

  const SkillTile({
    super.key,
    required this.skill,
    this.skillState,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final mastery = skillState?.mastery ?? MasteryLevel.locked;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: Spacing.md, vertical: Spacing.sm),
        child: Row(
          children: [
            // Mastery indicator
            Container(
              width: 12,
              height: 12,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: mastery.color,
              ),
            ),
            const SizedBox(width: Spacing.md),

            // Skill name
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    skill.nameFr,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  if (mastery != MasteryLevel.locked)
                    Text(
                      mastery.labelFr,
                      style: TextStyle(
                        color: mastery.color,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                ],
              ),
            ),

            // Difficulty dots
            Row(
              children: List.generate(5, (i) => Container(
                width: 6,
                height: 6,
                margin: const EdgeInsetsDirectional.only(start: 2),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: i < skill.difficultyLevel
                      ? BacPrepColors.accent
                      : BacPrepColors.surfaceVariant,
                ),
              )),
            ),

            const SizedBox(width: Spacing.sm),

            // Lesson icon or chevron
            if (skill.hasLesson)
              Icon(Icons.menu_book_outlined, size: 18, color: BacPrepColors.primary)
            else
              const Icon(Icons.chevron_right, size: 20, color: BacPrepColors.textTertiary),
          ],
        ),
      ),
    );
  }
}
