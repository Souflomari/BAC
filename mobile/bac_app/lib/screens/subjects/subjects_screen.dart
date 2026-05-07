import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/error_retry_widget.dart';

class SubjectsScreen extends ConsumerWidget {
  const SubjectsScreen({super.key});

  static const _romanNumerals = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    'XI', 'XII', 'XIII',
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final subjectsAsync = ref.watch(subjectsProvider);
    final progressAsync = ref.watch(progressProvider);

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.2),
          SafeArea(
            child: subjectsAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => ErrorRetryWidget(
                message: 'Erreur de chargement',
                onRetry: () => ref.invalidate(subjectsProvider),
              ),
              data: (subjects) {
                final progress = progressAsync.valueOrNull;
                final totalMastered = progress?.subjects
                        .fold(0, (s, p) => s + p.masteredSkills) ??
                    0;
                final totalSkills =
                    progress?.subjects.fold(0, (s, p) => s + p.totalSkills) ?? 0;

                // Weakest subject = "current"
                String? currentId;
                if (progress != null && progress.subjects.isNotEmpty) {
                  final incomplete = progress.subjects
                      .where((p) => p.totalSkills > 0 && p.masteredSkills < p.totalSkills)
                      .toList()
                    ..sort((a, b) => a.averageStrength.compareTo(b.averageStrength));
                  if (incomplete.isNotEmpty) currentId = incomplete.first.subject.id;
                }

                return CustomScrollView(
                  slivers: [
                    // Header
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(22, 20, 22, 0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'PROGRAMME · BAC MAROC',
                              style: PapierType.mono(
                                fontSize: 8.5,
                                color: Papier.ink3,
                                letterSpacing: 2.4,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.baseline,
                              textBaseline: TextBaseline.alphabetic,
                              children: [
                                Text(
                                  'Index',
                                  style: PapierType.italic(
                                    fontSize: 30,
                                    letterSpacing: -0.6,
                                  ),
                                ),
                                const Spacer(),
                                if (totalSkills > 0)
                                  Text(
                                    '$totalMastered / $totalSkills acquis',
                                    style: PapierType.italic(
                                      fontSize: 14,
                                      color: Papier.ink2,
                                    ),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            const DoubleRule(),
                          ],
                        ),
                      ),
                    ),

                    // Chapter list
                    SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) {
                          if (index == subjects.length) return const _Legend();
                          final subject = subjects[index];
                          final sp = progress?.subjects
                              .where((p) => p.subject.id == subject.id)
                              .firstOrNull;
                          return _ChapterRow(
                            numeral: index < _romanNumerals.length
                                ? _romanNumerals[index]
                                : '${index + 1}',
                            title: subject.nameFr,
                            subtitle: subject.examType == 'national'
                                ? 'épreuve nationale'
                                : 'épreuve régionale',
                            masteredSkills: sp?.masteredSkills ?? 0,
                            totalSkills: sp?.totalSkills ?? 0,
                            averageStrength: sp?.averageStrength ?? 0,
                            isCurrent: subject.id == currentId,
                            onTap: () => context.push('/subjects/${subject.id}'),
                          );
                        },
                        childCount: subjects.length + 1,
                      ),
                    ),

                    const SliverToBoxAdapter(child: SizedBox(height: 80)),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _ChapterRow extends StatelessWidget {
  final String numeral;
  final String title;
  final String subtitle;
  final int masteredSkills;
  final int totalSkills;
  final double averageStrength;
  final bool isCurrent;
  final VoidCallback onTap;

  const _ChapterRow({
    required this.numeral,
    required this.title,
    required this.subtitle,
    required this.masteredSkills,
    required this.totalSkills,
    required this.averageStrength,
    required this.isCurrent,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Stack(
        children: [
          // Row content
          Container(
            padding: const EdgeInsets.fromLTRB(22, 14, 22, 14),
            decoration: BoxDecoration(
              color: isCurrent ? Papier.bg2 : Colors.transparent,
              border: const Border(bottom: BorderSide(color: Papier.line)),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Roman numeral
                SizedBox(
                  width: 30,
                  child: Text(
                    '$numeral.',
                    style: PapierType.italic(
                      fontSize: 20,
                      color: isCurrent ? Papier.red : Papier.ink3,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Title + leader dots + count
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.baseline,
                        textBaseline: TextBaseline.alphabetic,
                        children: [
                          Flexible(
                            child: Text(
                              title,
                              style: PapierType.serif(fontSize: 17, color: Papier.ink),
                            ),
                          ),
                          Expanded(
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 8),
                              child: CustomPaint(
                                size: const Size(double.infinity, 12),
                                painter: _DottedLinePainter(),
                              ),
                            ),
                          ),
                          Text(
                            '$masteredSkills/$totalSkills',
                            style: PapierType.mono(fontSize: 10, color: Papier.ink2),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        subtitle.toUpperCase(),
                        style: PapierType.mono(
                          fontSize: 9,
                          color: Papier.ink3,
                          letterSpacing: 1.2,
                        ),
                      ),
                      const SizedBox(height: 8),
                      // Skill dots
                      _SkillDots(
                        total: totalSkills,
                        mastered: masteredSkills,
                        strength: averageStrength,
                      ),
                      if (isCurrent) ...[
                        const SizedBox(height: 8),
                        Text(
                          '↳ en cours',
                          style: PapierType.italic(fontSize: 11, color: Papier.red),
                        ),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ),
          // Red left bar for current
          if (isCurrent)
            Positioned(
              left: 0,
              top: 0,
              bottom: 0,
              child: Container(width: 3, color: Papier.red),
            ),
        ],
      ),
    );
  }
}

class _SkillDots extends StatelessWidget {
  final int total;
  final int mastered;
  final double strength;

  const _SkillDots({
    required this.total,
    required this.mastered,
    required this.strength,
  });

  @override
  Widget build(BuildContext context) {
    if (total == 0) return const SizedBox.shrink();
    final displayCount = total.clamp(0, 16);
    return Wrap(
      spacing: 4,
      runSpacing: 4,
      children: [
        for (int i = 0; i < displayCount; i++) _dot(i),
        if (total > 16)
          Text('+${total - 16}', style: PapierType.mono(fontSize: 9, color: Papier.ink3)),
      ],
    );
  }

  Widget _dot(int i) {
    final isMastered = i < mastered;
    final isPartial = !isMastered && i < mastered + (total - mastered) * strength;
    final borderColor =
        isMastered ? Papier.ink : isPartial ? Papier.gold : Papier.line2;
    return Container(
      width: 12,
      height: 12,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: borderColor, width: 1.2),
        color: isMastered ? Papier.ink : Colors.transparent,
      ),
    );
  }
}

class _DottedLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Papier.line2
      ..strokeWidth = 0.8;
    const dashWidth = 3.0;
    const gap = 3.0;
    double x = 0;
    final y = size.height / 2 + 4;
    while (x < size.width) {
      canvas.drawLine(Offset(x, y), Offset(x + dashWidth, y), paint);
      x += dashWidth + gap;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _Legend extends StatelessWidget {
  const _Legend();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(22, 20, 22, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('LÉGENDE', style: PapierType.smallCaps(color: Papier.ink3)),
          const SizedBox(height: 10),
          Wrap(
            spacing: 16,
            runSpacing: 8,
            children: [
              _LegendItem(color: Papier.ink, filled: true, label: 'acquis'),
              _LegendItem(color: Papier.gold, filled: false, label: 'en cours'),
              _LegendItem(color: Papier.line2, filled: false, label: 'nouveau'),
            ],
          ),
        ],
      ),
    );
  }
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final bool filled;
  final String label;

  const _LegendItem({
    required this.color,
    required this.filled,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: color, width: 1.2),
            color: filled ? color : Colors.transparent,
          ),
        ),
        const SizedBox(width: 6),
        Text(label, style: PapierType.italic(fontSize: 12, color: Papier.ink2)),
      ],
    );
  }
}
