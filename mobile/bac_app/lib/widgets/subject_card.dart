import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/subject.dart';
import 'progress_ring.dart';

class SubjectCard extends StatelessWidget {
  final Subject subject;
  final int totalSkills;
  final int masteredSkills;
  final double averageStrength;
  final VoidCallback? onTap;

  const SubjectCard({
    super.key,
    required this.subject,
    this.totalSkills = 0,
    this.masteredSkills = 0,
    this.averageStrength = 0,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final completion = totalSkills > 0 ? masteredSkills / totalSkills : 0.0;

    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(Spacing.md),
          child: Row(
            children: [
              // Subject icon with progress ring
              ProgressRing(
                progress: completion,
                size: 52,
                strokeWidth: 4,
                color: subject.color,
                child: Icon(
                  subject.iconData,
                  color: subject.color,
                  size: 22,
                ),
              ),
              const SizedBox(width: Spacing.md),

              // Subject info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      subject.nameFr,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 2),
                    if (totalSkills > 0)
                      Text(
                        '$masteredSkills / $totalSkills compétences',
                        style: Theme.of(context).textTheme.bodyMedium,
                      )
                    else
                      Text(
                        'Pas encore commencé',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                  ],
                ),
              ),

              // Coefficient badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: subject.color.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '×${subject.coefficient.toStringAsFixed(0)}',
                  style: TextStyle(
                    color: subject.color,
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(width: Spacing.sm),
              Icon(Icons.play_circle_fill, color: subject.color, size: 28),
            ],
          ),
        ),
      ),
    );
  }
}
