import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../config/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/error_retry_widget.dart';
import '../../widgets/shimmer_skeleton.dart';
import 'edit_profile_sheet.dart';

/// Dedicated profile screen — avatar, stats, recent activity, badges.
class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(profileProvider);
    final progressAsync = ref.watch(progressProvider);

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.18),
          SafeArea(
            child: profileAsync.when(
              loading: () => const _ProfileSkeleton(),
              error: (e, _) => ErrorRetryWidget(
                message: 'Impossible de charger ton profil.',
                onRetry: () => ref.invalidate(profileProvider),
              ),
              data: (profile) {
                if (profile == null) {
                  return const Center(child: Text('Pas de profil.'));
                }
                final progress = progressAsync.valueOrNull;
                final width = MediaQuery.sizeOf(context).width;
                final isWide = width >= 900;

                return CustomScrollView(
                  slivers: [
                    SliverToBoxAdapter(
                      child: _Header(
                        displayName: profile.displayName,
                        avatarUrl: profile.avatarUrl,
                        streamLabel: profile.bacStream.labelFr,
                        joinedFr: '',
                        onEdit: () async {
                          final saved = await EditProfileSheet.show(context, profile);
                          if (saved == true) ref.invalidate(profileProvider);
                        },
                        onClose: () {
                          if (context.canPop()) {
                            context.pop();
                          } else {
                            context.go('/home');
                          }
                        },
                      ),
                    ),
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: isWide ? 32 : 22,
                          vertical: 16,
                        ),
                        child: isWide
                            ? Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    flex: 5,
                                    child: _StatsCards(
                                      streak: progress?.streakCurrent ?? 0,
                                      xp: progress?.totalXp ?? 0,
                                      mastered: progress?.subjects.fold<int>(
                                            0,
                                            (s, p) => s + p.masteredSkills,
                                          ) ??
                                          0,
                                    ),
                                  ),
                                  const SizedBox(width: 24),
                                  Expanded(
                                    flex: 6,
                                    child: _Links(),
                                  ),
                                ],
                              )
                            : Column(
                                children: [
                                  _StatsCards(
                                    streak: progress?.streakCurrent ?? 0,
                                    xp: progress?.totalXp ?? 0,
                                    mastered: progress?.subjects.fold<int>(
                                          0,
                                          (s, p) => s + p.masteredSkills,
                                        ) ??
                                        0,
                                  ),
                                  const SizedBox(height: 24),
                                  _Links(),
                                ],
                              ),
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

class _Header extends StatelessWidget {
  final String displayName;
  final String? avatarUrl;
  final String streamLabel;
  final String joinedFr;
  final VoidCallback onEdit;
  final VoidCallback onClose;

  const _Header({
    required this.displayName,
    required this.avatarUrl,
    required this.streamLabel,
    required this.joinedFr,
    required this.onEdit,
    required this.onClose,
  });

  @override
  Widget build(BuildContext context) {
    final initial = displayName.isNotEmpty ? displayName[0].toUpperCase() : '?';
    return Container(
      padding: const EdgeInsets.fromLTRB(22, 22, 18, 24),
      decoration: const BoxDecoration(
        color: Papier.surface,
        border: Border(bottom: BorderSide(color: Papier.ink, width: 2)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GestureDetector(
            onTap: onEdit,
            child: Container(
              width: 76,
              height: 76,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Papier.ink, width: 1.5),
                color: Papier.bg2,
                image: avatarUrl != null
                    ? DecorationImage(
                        image: NetworkImage(avatarUrl!),
                        fit: BoxFit.cover,
                      )
                    : null,
              ),
              child: avatarUrl == null
                  ? Center(
                      child: Text(
                        initial,
                        style: PapierType.italic(
                          fontSize: 36,
                          color: Papier.ink,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    )
                  : null,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'PROFIL',
                  style: PapierType.smallCaps(fontSize: 10, color: Papier.red),
                ),
                const SizedBox(height: 4),
                Text(
                  displayName.isEmpty ? 'Mon Cahier' : displayName,
                  style: PapierType.italic(
                    fontSize: 30,
                    fontWeight: FontWeight.w500,
                    height: 1.1,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  streamLabel.toUpperCase(),
                  style: PapierType.mono(
                    fontSize: 10,
                    color: Papier.ink2,
                    letterSpacing: 1.4,
                  ),
                ),
                const SizedBox(height: 8),
                GestureDetector(
                  onTap: onEdit,
                  child: Text(
                    'Modifier →',
                    style: PapierType.smallCaps(
                      fontSize: 11,
                      color: Papier.indigo,
                    ),
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.close, color: Papier.ink),
            tooltip: 'Fermer',
            onPressed: onClose,
          ),
        ],
      ),
    );
  }
}

class _StatsCards extends StatelessWidget {
  final int streak;
  final int xp;
  final int mastered;
  const _StatsCards(
      {required this.streak, required this.xp, required this.mastered});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('STATISTIQUES',
            style: PapierType.smallCaps(color: Papier.ink3)),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: _StatCard(
                label: 'Série',
                value: '$streak',
                unit: 'jours',
                color: Papier.red,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _StatCard(
                label: 'XP',
                value: NumberFormat('#,##0', 'fr')
                    .format(xp)
                    .replaceAll(',', ' '),
                unit: '',
                color: Papier.gold,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _StatCard(
                label: 'Maîtrisées',
                value: '$mastered',
                unit: 'compétences',
                color: Papier.green,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final String value;
  final String unit;
  final Color color;
  const _StatCard({
    required this.label,
    required this.value,
    required this.unit,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 14, 14, 14),
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.line2, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label.toUpperCase(),
              style: PapierType.smallCaps(fontSize: 9, color: Papier.ink3)),
          const SizedBox(height: 6),
          Text(
            value,
            style: PapierType.italic(
                fontSize: 28, color: color, fontWeight: FontWeight.w500),
          ),
          if (unit.isNotEmpty)
            Text(
              unit,
              style: PapierType.mono(fontSize: 9, color: Papier.ink3),
            ),
        ],
      ),
    );
  }
}

class _Links extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final items = [
      ('Voir mes statistiques détaillées', '/progress', Icons.timeline),
      ('Préférences et compte', '/settings', Icons.tune),
      ('Annales du Bac', '/exams', Icons.menu_book_outlined),
      ('Tableau d\'analyse', '/analytics', Icons.insights_outlined),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('NAVIGATION',
            style: PapierType.smallCaps(color: Papier.ink3)),
        const SizedBox(height: 8),
        for (final (label, route, icon) in items)
          InkWell(
            onTap: () => context.push(route),
            child: Container(
              padding:
                  const EdgeInsets.symmetric(vertical: 14, horizontal: 14),
              decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: Papier.line)),
              ),
              child: Row(
                children: [
                  Icon(icon, size: 18, color: Papier.ink2),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(label,
                        style: PapierType.serif(fontSize: 15)),
                  ),
                  Text('→',
                      style:
                          PapierType.italic(fontSize: 16, color: Papier.ink3)),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _ProfileSkeleton extends StatelessWidget {
  const _ProfileSkeleton();

  @override
  Widget build(BuildContext context) {
    return ShimmerWrap(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(22, 22, 22, 22),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: const [
                ShimmerBox(width: 76, height: 76, borderRadius: 38),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ShimmerBox(width: 80, height: 11),
                      SizedBox(height: 6),
                      ShimmerBox(width: 200, height: 28),
                      SizedBox(height: 6),
                      ShimmerBox(width: 140, height: 12),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            const ShimmerBox(width: 120, height: 11),
            const SizedBox(height: 8),
            Row(
              children: const [
                Expanded(child: ShimmerBox(height: 90, borderRadius: 4)),
                SizedBox(width: 10),
                Expanded(child: ShimmerBox(height: 90, borderRadius: 4)),
                SizedBox(width: 10),
                Expanded(child: ShimmerBox(height: 90, borderRadius: 4)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
