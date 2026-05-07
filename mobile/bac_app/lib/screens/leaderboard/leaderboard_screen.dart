import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/shimmer_skeleton.dart';

enum LeaderboardScope { global, stream }

final leaderboardScopeProvider = StateProvider<LeaderboardScope>((ref) => LeaderboardScope.global);

final leaderboardProvider = FutureProvider.autoDispose<List<Map<String, dynamic>>>((ref) async {
  final api = ref.watch(apiServiceProvider);
  final scope = ref.watch(leaderboardScopeProvider);
  String? streamFilter;
  if (scope == LeaderboardScope.stream) {
    final profile = ref.watch(profileProvider).valueOrNull;
    streamFilter = profile?.bacStream.value;
  }
  return api.getLeaderboard(stream: streamFilter, limit: 100);
});

class LeaderboardScreen extends ConsumerWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final leaderboardAsync = ref.watch(leaderboardProvider);
    final scope = ref.watch(leaderboardScopeProvider);
    final currentUserId = ref.watch(profileProvider).valueOrNull?.id;
    final l = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(l.leaderboardTitle),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: Spacing.lg, vertical: Spacing.sm),
            child: SegmentedButton<LeaderboardScope>(
              segments: [
                ButtonSegment(
                  value: LeaderboardScope.global,
                  label: Text(l.global),
                  icon: const Icon(Icons.public, size: 16),
                ),
                ButtonSegment(
                  value: LeaderboardScope.stream,
                  label: Text(l.myStreamShort),
                  icon: const Icon(Icons.school, size: 16),
                ),
              ],
              selected: {scope},
              onSelectionChanged: (selection) {
                ref.read(leaderboardScopeProvider.notifier).state = selection.first;
              },
            ),
          ),
        ),
      ),
      body: leaderboardAsync.when(
        loading: () => const CardListSkeleton(itemCount: 8, itemHeight: 64),
        error: (e, _) => Center(child: Text(l.error('$e'))),
        data: (entries) {
          if (entries.isEmpty) {
            return Center(
              child: Text(l.noData),
            );
          }

          // Find current user rank
          final currentUserRank = entries.indexWhere((e) => e['id'] == currentUserId);

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(leaderboardProvider),
            child: ListView.builder(
              padding: const EdgeInsets.all(Spacing.md),
              itemCount: entries.length,
              itemBuilder: (context, index) {
                final entry = entries[index];
                final isCurrentUser = entry['id'] == currentUserId;
                return _LeaderboardRow(
                  rank: index + 1,
                  displayName: entry['display_name'] as String? ?? '?',
                  totalXp: entry['total_xp'] as int? ?? 0,
                  streak: entry['streak_current'] as int? ?? 0,
                  avatarUrl: entry['avatar_url'] as String?,
                  isCurrentUser: isCurrentUser,
                );
              },
            ),
          );
        },
      ),
    );
  }
}

class _LeaderboardRow extends StatelessWidget {
  final int rank;
  final String displayName;
  final int totalXp;
  final int streak;
  final String? avatarUrl;
  final bool isCurrentUser;

  const _LeaderboardRow({
    required this.rank,
    required this.displayName,
    required this.totalXp,
    required this.streak,
    this.avatarUrl,
    required this.isCurrentUser,
  });

  Color _rankColor() {
    if (rank == 1) return const Color(0xFFFFD700); // gold
    if (rank == 2) return const Color(0xFFC0C0C0); // silver
    if (rank == 3) return const Color(0xFFCD7F32); // bronze
    return BacPrepColors.textSecondary;
  }

  IconData? _rankIcon() {
    if (rank == 1) return Icons.emoji_events;
    if (rank == 2) return Icons.emoji_events;
    if (rank == 3) return Icons.emoji_events;
    return null;
  }

  @override
  Widget build(BuildContext context) {
    final rankIcon = _rankIcon();
    return Card(
      color: isCurrentUser ? BacPrepColors.primary.withValues(alpha: 0.08) : null,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: isCurrentUser
            ? const BorderSide(color: BacPrepColors.primary, width: 1.5)
            : BorderSide.none,
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: Spacing.md, vertical: Spacing.sm),
        child: Row(
          children: [
            // Rank
            SizedBox(
              width: 36,
              child: rankIcon != null
                  ? Icon(rankIcon, color: _rankColor(), size: 28)
                  : Text(
                      '$rank',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 16,
                        color: _rankColor(),
                      ),
                    ),
            ),
            const SizedBox(width: Spacing.sm),

            // Avatar
            CircleAvatar(
              radius: 20,
              backgroundColor: BacPrepColors.primary,
              backgroundImage: avatarUrl != null ? NetworkImage(avatarUrl!) : null,
              child: avatarUrl == null
                  ? Text(
                      displayName.isNotEmpty ? displayName[0].toUpperCase() : '?',
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
                    )
                  : null,
            ),
            const SizedBox(width: Spacing.md),

            // Name + streak
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    displayName,
                    style: TextStyle(
                      fontWeight: isCurrentUser ? FontWeight.w700 : FontWeight.w500,
                      fontSize: 15,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  if (streak > 0)
                    Row(
                      children: [
                        const Icon(Icons.local_fire_department,
                            size: 14, color: BacPrepColors.accent),
                        const SizedBox(width: 2),
                        Text(
                          '$streak',
                          style: const TextStyle(
                            fontSize: 12,
                            color: BacPrepColors.accent,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                ],
              ),
            ),

            // XP
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: BacPrepColors.primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.star, size: 14, color: BacPrepColors.primary),
                  const SizedBox(width: 4),
                  Text(
                    '$totalXp',
                    style: const TextStyle(
                      color: BacPrepColors.primary,
                      fontWeight: FontWeight.w700,
                      fontSize: 13,
                    ),
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
