import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../l10n/app_localizations.dart';
import '../models/progress.dart';

/// Bar chart showing subject mastery comparison
class SubjectMasteryChart extends StatelessWidget {
  final List<SubjectProgress> subjects;

  const SubjectMasteryChart({super.key, required this.subjects});

  @override
  Widget build(BuildContext context) {
    if (subjects.isEmpty) return const SizedBox.shrink();

    final l = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          l.subjectPerformance,
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: Spacing.md),
        SizedBox(
          height: 200,
          child: BarChart(
            BarChartData(
              alignment: BarChartAlignment.spaceAround,
              maxY: 100,
              barTouchData: BarTouchData(
                touchTooltipData: BarTouchTooltipData(
                  getTooltipItem: (group, groupIndex, rod, rodIndex) {
                    final sp = subjects[group.x.toInt()];
                    return BarTooltipItem(
                      '${sp.subject.nameFr}\n${rod.toY.round()}%',
                      const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    );
                  },
                ),
              ),
              titlesData: FlTitlesData(
                show: true,
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    reservedSize: 32,
                    getTitlesWidget: (value, meta) {
                      final index = value.toInt();
                      if (index >= subjects.length) return const SizedBox.shrink();
                      final sp = subjects[index];
                      return Padding(
                        padding: const EdgeInsets.only(top: 8),
                        child: Icon(sp.subject.iconData, size: 18, color: sp.subject.color),
                      );
                    },
                  ),
                ),
                leftTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    reservedSize: 32,
                    interval: 25,
                    getTitlesWidget: (value, meta) {
                      return Text(
                        '${value.toInt()}%',
                        style: TextStyle(fontSize: 10, color: BacPrepColors.textSecondary),
                      );
                    },
                  ),
                ),
                topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
              ),
              borderData: FlBorderData(show: false),
              gridData: FlGridData(
                show: true,
                horizontalInterval: 25,
                getDrawingHorizontalLine: (value) => FlLine(
                  color: BacPrepColors.border.withValues(alpha: 0.5),
                  strokeWidth: 1,
                ),
                drawVerticalLine: false,
              ),
              barGroups: subjects.asMap().entries.map((entry) {
                final i = entry.key;
                final sp = entry.value;
                final pct = sp.completionPercent * 100;
                return BarChartGroupData(
                  x: i,
                  barRods: [
                    BarChartRodData(
                      toY: pct,
                      color: sp.subject.color,
                      width: 20,
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(4),
                        topRight: Radius.circular(4),
                      ),
                      backDrawRodData: BackgroundBarChartRodData(
                        show: true,
                        toY: 100,
                        color: sp.subject.color.withValues(alpha: 0.08),
                      ),
                    ),
                  ],
                );
              }).toList(),
            ),
          ),
        ),
      ],
    );
  }
}

/// Today's activity ring with stats
class DailyActivityChart extends StatelessWidget {
  final DailyActivity today;
  final int dailyGoalMinutes;

  const DailyActivityChart({
    super.key,
    required this.today,
    required this.dailyGoalMinutes,
  });

  @override
  Widget build(BuildContext context) {
    final goalProgress = dailyGoalMinutes > 0
        ? (today.minutesPracticed / dailyGoalMinutes).clamp(0.0, 1.0)
        : 0.0;

    final sections = <PieChartSectionData>[
      PieChartSectionData(
        value: goalProgress * 100,
        color: BacPrepColors.primary,
        radius: 14,
        showTitle: false,
      ),
      PieChartSectionData(
        value: (1 - goalProgress) * 100,
        color: BacPrepColors.primary.withValues(alpha: 0.1),
        radius: 14,
        showTitle: false,
      ),
    ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(Spacing.md),
        child: Row(
          children: [
            SizedBox(
              width: 80,
              height: 80,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  PieChart(
                    PieChartData(
                      sections: sections,
                      centerSpaceRadius: 26,
                      sectionsSpace: 0,
                      startDegreeOffset: -90,
                    ),
                  ),
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        '${(goalProgress * 100).round()}%',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: BacPrepColors.primary,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: Spacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    AppLocalizations.of(context)!.dailyGoal,
                    style: Theme.of(context).textTheme.titleSmall,
                  ),
                  const SizedBox(height: 4),
                  _MiniStat(
                    icon: Icons.timer_outlined,
                    label: '${today.minutesPracticed} / $dailyGoalMinutes min',
                  ),
                  _MiniStat(
                    icon: Icons.check_circle_outline,
                    label: '${today.itemsCompleted} items  •  ${(today.accuracy * 100).round()}%',
                  ),
                  _MiniStat(
                    icon: Icons.star_outline,
                    label: '+${today.xpEarned} XP',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MiniStat extends StatelessWidget {
  final IconData icon;
  final String label;

  const _MiniStat({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 2),
      child: Row(
        children: [
          Icon(icon, size: 14, color: BacPrepColors.textSecondary),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(fontSize: 12, color: BacPrepColors.textSecondary),
          ),
        ],
      ),
    );
  }
}
