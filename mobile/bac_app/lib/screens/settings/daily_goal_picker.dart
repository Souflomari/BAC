import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';

class DailyGoalPicker extends StatelessWidget {
  final int currentGoal;
  final ValueChanged<int> onChanged;

  const DailyGoalPicker({
    super.key,
    required this.currentGoal,
    required this.onChanged,
  });

  static const _options = [10, 15, 20, 30, 45, 60];

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(Spacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              l.dailyGoal,
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: Spacing.sm),
            Text(
              l.howManyMinutes,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: Spacing.lg),
            Wrap(
              spacing: Spacing.sm,
              runSpacing: Spacing.sm,
              children: _options.map((min) {
                final isSelected = min == currentGoal;
                return ChoiceChip(
                  label: Text(l.minutesShort(min)),
                  selected: isSelected,
                  onSelected: (_) {
                    onChanged(min);
                    Navigator.pop(context);
                  },
                  selectedColor: BacPrepColors.primary,
                  labelStyle: TextStyle(
                    color: isSelected ? Colors.white : BacPrepColors.textPrimary,
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: Spacing.md),
          ],
        ),
      ),
    );
  }
}
