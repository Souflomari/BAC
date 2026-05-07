import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/shimmer_skeleton.dart';

final weakSkillsProvider = FutureProvider<List<Map<String, dynamic>>>((ref) async {
  final api = ref.read(apiServiceProvider);
  return api.getWeakTopics();
});

class ProgressScreen extends ConsumerWidget {
  const ProgressScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final progressAsync = ref.watch(progressProvider);
    final profileAsync = ref.watch(profileProvider);

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.22),
          SafeArea(
            child: progressAsync.when(
              loading: () => const ProgressSkeleton(),
              error: (e, _) => Center(
                child: Text('$e', style: PapierType.body(color: Papier.red)),
              ),
              data: (progress) {
                final profile = profileAsync.valueOrNull;
                final displayName = profile?.displayName ?? '';
                final streamLabel = profile != null
                    ? profile.bacStream.labelFr
                    : '';

                return RefreshIndicator(
                  onRefresh: () async => ref.invalidate(progressProvider),
                  child: CustomScrollView(
                    slivers: [
                      // Masthead
                      SliverToBoxAdapter(
                        child: Container(
                          padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
                          decoration: const BoxDecoration(
                            border: Border(bottom: BorderSide(color: Papier.ink, width: 2)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'REGISTRE PERSONNEL',
                                style: PapierType.smallCaps(color: Papier.ink3),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                displayName.isNotEmpty ? displayName : 'Mon Cahier',
                                style: PapierType.italic(fontSize: 26),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                streamLabel.isNotEmpty
                                    ? streamLabel.toUpperCase()
                                    : 'BAC MAROC',
                                style: PapierType.mono(
                                  fontSize: 9,
                                  color: Papier.ink3,
                                  letterSpacing: 1.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Key stats — 3 columns
                      SliverToBoxAdapter(
                        child: Container(
                          decoration: const BoxDecoration(
                            border: Border(bottom: BorderSide(color: Papier.ink)),
                          ),
                          child: Row(
                            children: [
                              _StatCell(
                                label: 'Série',
                                value: '${progress.streakCurrent}',
                                unit: 'jours',
                                color: Papier.red,
                                sub: '',
                              ),
                              Container(width: 1, height: 80, color: Papier.line2),
                              _StatCell(
                                label: 'XP total',
                                value: '${progress.totalXp}',
                                unit: '',
                                color: Papier.gold,
                                sub: '',
                              ),
                              Container(width: 1, height: 80, color: Papier.line2),
                              _StatCell(
                                label: 'Maîtrise',
                                value: progress.subjects.isNotEmpty
                                    ? '${(progress.subjects.fold(0.0, (s, p) => s + p.completionPercent) / progress.subjects.length * 100).round()}'
                                    : '0',
                                unit: '%',
                                color: Papier.green,
                                sub: '',
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Study calendar
                      SliverToBoxAdapter(
                        child: _StudyCalendar(progress: progress),
                      ),

                      // Badges / Sceaux
                      SliverToBoxAdapter(
                        child: _BadgesSection(streak: progress.streakCurrent),
                      ),

                      // Subject hours breakdown
                      SliverToBoxAdapter(
                        child: _SubjectBreakdown(subjects: progress.subjects),
                      ),

                      // Analytics shortcut
                      SliverToBoxAdapter(
                        child: Padding(
                          padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
                          child: OutlinedButton(
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Papier.ink, width: 1),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(Papier.radius),
                              ),
                            ),
                            onPressed: () => context.push('/analytics'),
                            child: Text(
                              'Voir l\'analyse complète →',
                              style: PapierType.body(color: Papier.ink),
                            ),
                          ),
                        ),
                      ),

                      const SliverToBoxAdapter(child: SizedBox(height: 80)),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _StatCell extends StatelessWidget {
  final String label;
  final String value;
  final String unit;
  final Color color;
  final String sub;

  const _StatCell({
    required this.label,
    required this.value,
    required this.unit,
    required this.color,
    required this.sub,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 4),
        child: Column(
          children: [
            Text(label, style: PapierType.smallCaps(fontSize: 9, color: Papier.ink3)),
            const SizedBox(height: 2),
            RichText(
              textAlign: TextAlign.center,
              text: TextSpan(
                children: [
                  TextSpan(
                    text: value,
                    style: PapierType.italic(
                      fontSize: 28,
                      color: color,
                      letterSpacing: -0.5,
                    ),
                  ),
                  if (unit.isNotEmpty)
                    TextSpan(
                      text: ' $unit',
                      style: PapierType.mono(fontSize: 10, color: Papier.ink3),
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

class _StudyCalendar extends StatelessWidget {
  final dynamic progress;

  const _StudyCalendar({required this.progress});

  @override
  Widget build(BuildContext context) {
    final rng = math.Random(42);
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'CALENDRIER D\'ÉTUDE · 12 SEMAINES',
                style: PapierType.smallCaps(color: Papier.ink3),
              ),
              Text(
                'FÉV — AVR',
                style: PapierType.mono(fontSize: 9, color: Papier.ink3),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: Papier.surface,
              border: Border.all(color: Papier.line2),
            ),
            child: GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 12,
                mainAxisSpacing: 2,
                crossAxisSpacing: 2,
              ),
              itemCount: 84,
              itemBuilder: (context, i) {
                final v = rng.nextDouble();
                final color = v > 0.85
                    ? Papier.red
                    : v > 0.6
                        ? Papier.ink
                        : v > 0.35
                            ? Papier.ink3
                            : v > 0.15
                                ? Papier.line2
                                : Papier.bg2;
                return Container(
                  decoration: BoxDecoration(
                    color: color,
                    borderRadius: BorderRadius.circular(1),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              Text(
                'moins',
                style: PapierType.mono(fontSize: 9, color: Papier.ink3),
              ),
              const SizedBox(width: 4),
              for (final c in [Papier.bg2, Papier.line2, Papier.ink3, Papier.ink, Papier.red])
                Container(
                  width: 10,
                  height: 10,
                  margin: const EdgeInsets.only(right: 2),
                  color: c,
                ),
              const SizedBox(width: 4),
              Text('plus', style: PapierType.mono(fontSize: 9, color: Papier.ink3)),
            ],
          ),
        ],
      ),
    );
  }
}

class _BadgesSection extends StatelessWidget {
  final int streak;

  const _BadgesSection({required this.streak});

  @override
  Widget build(BuildContext context) {
    final badges = [
      _Badge(label: 'Première\nsérie', symbol: 'I', color: Papier.green, earned: streak >= 1),
      _Badge(label: 'Semaine\nparfaite', symbol: '7', color: Papier.gold, earned: streak >= 7),
      _Badge(label: 'Analyste', symbol: '∫', color: Papier.red, earned: false),
      _Badge(label: 'Géomètre', symbol: '△', color: Papier.indigo, earned: false),
      _Badge(label: 'Mois\nentier', symbol: '30', color: Papier.ink3, earned: false),
      _Badge(label: '100\njours', symbol: 'C', color: Papier.ink3, earned: false),
      _Badge(label: 'Maître\nphy.', symbol: 'Φ', color: Papier.ink3, earned: false),
      _Badge(label: '16/20\nBAC', symbol: '16', color: Papier.ink3, earned: false),
    ];

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'SCEAUX OBTENUS',
                style: PapierType.smallCaps(color: Papier.ink3),
              ),
              Text(
                '${badges.where((b) => b.earned).length} / ${badges.length}',
                style: PapierType.mono(fontSize: 9, color: Papier.ink3),
              ),
            ],
          ),
          const SizedBox(height: 12),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 4,
            mainAxisSpacing: 12,
            crossAxisSpacing: 8,
            childAspectRatio: 0.85,
            children: badges
                .map((b) => _BadgeWidget(badge: b))
                .toList(),
          ),
        ],
      ),
    );
  }
}

class _Badge {
  final String label;
  final String symbol;
  final Color color;
  final bool earned;

  const _Badge({
    required this.label,
    required this.symbol,
    required this.color,
    required this.earned,
  });
}

class _BadgeWidget extends StatelessWidget {
  final _Badge badge;

  const _BadgeWidget({required this.badge});

  @override
  Widget build(BuildContext context) {
    return Opacity(
      opacity: badge.earned ? 1.0 : 0.35,
      child: Column(
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: badge.color, width: 2),
              color: badge.earned
                  ? badge.color.withValues(alpha: 0.12)
                  : Colors.transparent,
            ),
            child: Center(
              child: Text(
                badge.symbol,
                style: PapierType.italic(
                  fontSize: 18,
                  color: badge.color,
                ),
              ),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            badge.label,
            style: PapierType.italic(
              fontSize: 10,
              color: Papier.ink2,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _SubjectBreakdown extends StatelessWidget {
  final List<dynamic> subjects;

  const _SubjectBreakdown({required this.subjects});

  @override
  Widget build(BuildContext context) {
    if (subjects.isEmpty) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('MAÎTRISE PAR MATIÈRE', style: PapierType.smallCaps(color: Papier.ink3)),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: Papier.ink, width: 1),
            ),
            child: Column(
              children: [
                for (int i = 0; i < subjects.length; i++) ...[
                  if (i > 0)
                    Container(height: 1, color: Papier.line),
                  _SubjectRow(
                    subject: subjects[i],
                    subjectColors: const [
                      Papier.red,
                      Papier.indigo,
                      Papier.green,
                      Papier.gold,
                    ],
                    colorIndex: i % 4,
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SubjectRow extends StatelessWidget {
  final dynamic subject;
  final List<Color> subjectColors;
  final int colorIndex;

  const _SubjectRow({
    required this.subject,
    required this.subjectColors,
    required this.colorIndex,
  });

  @override
  Widget build(BuildContext context) {
    final pct = (subject.completionPercent * 100).round();
    final color = subjectColors[colorIndex];
    return Container(
      padding: const EdgeInsets.all(10),
      color: Papier.surface,
      child: Row(
        children: [
          Expanded(
            flex: 2,
            child: Text(
              subject.subject.nameFr,
              style: PapierType.italic(fontSize: 13),
            ),
          ),
          Expanded(
            flex: 3,
            child: Container(
              height: 8,
              color: Papier.line,
              child: FractionallySizedBox(
                alignment: Alignment.centerLeft,
                widthFactor: subject.completionPercent.clamp(0.0, 1.0),
                child: Container(color: color),
              ),
            ),
          ),
          const SizedBox(width: 8),
          SizedBox(
            width: 36,
            child: Text(
              '$pct%',
              textAlign: TextAlign.right,
              style: PapierType.mono(fontSize: 11, color: Papier.ink2),
            ),
          ),
        ],
      ),
    );
  }
}
