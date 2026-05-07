import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/profile.dart';
import '../../models/progress.dart';
import '../../providers/auth_provider.dart';
import '../../providers/connectivity_provider.dart';
import '../../providers/progress_provider.dart';
import '../../services/sync_service.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/error_retry_widget.dart';
import '../../widgets/shimmer_skeleton.dart';
import '../../widgets/daily_quests_card.dart';
import '../../widgets/exam_readiness_card.dart';
import '../../widgets/smart_recommendations.dart';

/// Papier · Dashboard V3 — "Le Cahier"
///
/// Slim masthead → streak strip → hero italic headline → fleuron →
/// table-of-contents (leader dots) → subjects strip with vertical bars.
///
/// Maps real BacPrep data:
/// • Masthead "jour N" = profile.streakCurrent
/// • Headline = today's recommended skill / fallback motivational
/// • ToC rows = top 4 subject progress entries
/// • Subjects strip = subject mastery percentages
class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(profileProvider);
    final progressAsync = ref.watch(progressProvider);
    final isOnline = ref.watch(isOnlineProvider);
    final l = AppLocalizations.of(context)!;

    // Auto-sync pending answers when back online
    ref.listen<bool>(isOnlineProvider, (prev, next) {
      if (prev == false && next == true) {
        ref.read(syncServiceProvider).syncPendingAnswers();
        ref.invalidate(progressProvider);
      }
    });

    return Scaffold(
      body: Stack(
        children: [
          const Positioned.fill(child: PaperGrain(opacity: 0.18)),
          SafeArea(
            child: RefreshIndicator(
              onRefresh: () async {
                ref.invalidate(progressProvider);
                ref.invalidate(profileProvider);
              },
              child: CustomScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                slivers: [
                  if (!isOnline)
                    SliverToBoxAdapter(
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 22, vertical: Spacing.sm),
                        color: Papier.bg2,
                        child: Row(
                          children: [
                            const Icon(Icons.cloud_off,
                                size: 14, color: Papier.ink2),
                            const SizedBox(width: Spacing.sm),
                            Expanded(
                              child: Text(
                                l.offlineMode,
                                style: PapierType.italic(
                                    fontSize: 12, color: Papier.ink2),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                  // ── Masthead ──
                  SliverToBoxAdapter(
                    child: profileAsync.when(
                      data: (profile) => _PapierMasthead(profile: profile),
                      loading: () => const SizedBox(height: 110),
                      error: (_, __) =>
                          const _PapierMasthead(profile: null),
                    ),
                  ),

                  // ── Streak strip ──
                  SliverToBoxAdapter(
                    child: profileAsync.when(
                      data: (profile) =>
                          _StreakStrip(profile: profile),
                      loading: () => const SizedBox(height: 60),
                      error: (_, __) => const SizedBox(height: 0),
                    ),
                  ),

                  // ── Headline ("À LA UNE") ──
                  SliverToBoxAdapter(
                    child: progressAsync.when(
                      data: (progress) => _Headline(
                        daysUntilExam: progress.daysUntilExam,
                        weakSkillCount: progress.subjects
                            .map((s) => s.totalSkills - s.masteredSkills)
                            .fold<int>(0, (a, b) => a + b),
                        onPrimary: () => context.push('/session'),
                        onSecondary: () => context.push('/subjects'),
                      ),
                      loading: () => const _HeadlineSkeleton(),
                      error: (e, _) => Padding(
                        padding: const EdgeInsets.all(22),
                        child: ErrorRetryWidget(
                          message: l.errorLoadingData,
                          onRetry: () => ref.invalidate(progressProvider),
                        ),
                      ),
                    ),
                  ),

                  const SliverToBoxAdapter(child: Fleuron()),

                  // ── Daily quests + analytics cards (existing widgets,
                  //     auto-restyled by theme tokens) ──
                  const SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 22),
                      child: DailyQuestsCard(),
                    ),
                  ),
                  const SliverToBoxAdapter(child: SizedBox(height: 12)),
                  const SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 22),
                      child: ExamReadinessCard(),
                    ),
                  ),
                  const SliverToBoxAdapter(child: SizedBox(height: 12)),
                  const SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 22),
                      child: SmartRecommendations(),
                    ),
                  ),
                  const SliverToBoxAdapter(child: SizedBox(height: 18)),

                  // ── Table of contents (subjects → leader-dot rows) ──
                  SliverToBoxAdapter(
                    child: progressAsync.when(
                      data: (progress) => _TableOfDay(
                        subjects: progress.subjects,
                        onTap: (subjectId) =>
                            context.push('/subjects/$subjectId'),
                      ),
                      loading: () => const SizedBox(height: 100),
                      error: (_, __) => const SizedBox(height: 0),
                    ),
                  ),

                  // ── Subjects strip ──
                  SliverToBoxAdapter(
                    child: progressAsync.when(
                      data: (progress) =>
                          _SubjectsStrip(subjects: progress.subjects),
                      loading: () => const SizedBox(height: 0),
                      error: (_, __) => const SizedBox(height: 0),
                    ),
                  ),
                  const SliverToBoxAdapter(child: SizedBox(height: 80)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ─── Slim masthead ──────────────────────────────────────────
class _PapierMasthead extends StatelessWidget {
  final Profile? profile;
  const _PapierMasthead({this.profile});

  @override
  Widget build(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    final df = DateFormat('EEE d MMM', isArabic ? 'ar' : 'fr');
    final today = df.format(DateTime.now());
    final volumeLabel = isArabic
        ? (profile?.bacStream.labelAr ?? '')
        : (profile?.bacStream.labelFr ?? '');
    final streak = profile?.streakCurrent ?? 0;

    return Masthead(
      issueLine: 'N° ${(profile?.totalXp ?? 0) ~/ 10 + 1} · $today',
      volumeLine: 'VOL · ${volumeLabel.isEmpty ? "—" : volumeLabel}',
      title: isArabic ? 'الدفتر' : 'Le Cahier',
      rightLabel: streak > 0
          ? (isArabic ? 'يوم $streak' : 'jour $streak')
          : null,
    );
  }
}

// ─── Streak strip with weekly dots ──────────────────────────
class _StreakStrip extends StatelessWidget {
  final Profile? profile;
  const _StreakStrip({this.profile});

  @override
  Widget build(BuildContext context) {
    final streak = profile?.streakCurrent ?? 0;
    // Assume the last `streak` days (clamped at 7) are filled.
    // Today index: weekday() returns 1=Mon..7=Sun → 0..6
    final todayIdx = (DateTime.now().weekday - 1).clamp(0, 6);
    final filledCount = streak.clamp(0, 7);
    final done = List<bool>.generate(7, (i) {
      // Fill from today backwards
      final daysAgo = todayIdx - i;
      return daysAgo >= 0 && daysAgo < filledCount;
    });
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Padding(
      padding: const EdgeInsets.fromLTRB(22, 6, 22, 4),
      child: Row(
        children: [
          Expanded(child: StreakRing(done: done, today: todayIdx)),
          if (streak > 0)
            Padding(
              padding: const EdgeInsets.only(left: 12),
              child: Text(
                isArabic
                    ? '$streak أيام متتالية'
                    : '$streak ${streak == 1 ? "jour" : "jours"} d\'affilée',
                textAlign: TextAlign.right,
                style:
                    PapierType.italic(fontSize: 11, color: Papier.ink2),
              ),
            ),
        ],
      ),
    );
  }
}

// ─── À la une — heroic italic headline ──────────────────────
class _Headline extends StatelessWidget {
  final int daysUntilExam;
  final int weakSkillCount;
  final VoidCallback onPrimary;
  final VoidCallback onSecondary;
  const _Headline({
    required this.daysUntilExam,
    required this.weakSkillCount,
    required this.onPrimary,
    required this.onSecondary,
  });

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    final eyebrow = isArabic ? 'في الواجهة · اليوم' : 'À la une · aujourd\'hui';
    final descrFr = weakSkillCount > 0
        ? '$weakSkillCount compétences proches de l\'oubli. Une lecture courte, puis quelques questions calibrées sur ton historique.'
        : 'Continue de t\'exercer pour consolider tes acquis avant l\'examen.';
    final descrAr = weakSkillCount > 0
        ? '$weakSkillCount مهارات تتلاشى. قراءة قصيرة ثم أسئلة معايرة وفقا لمسارك.'
        : 'تابع التمرّن لتثبيت مكتسباتك قبل الامتحان.';

    return Padding(
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SmallCaps(eyebrow, color: Papier.red),
          const SizedBox(height: 10),
          // Hero headline — large italic Garamond, red emphasis on key word
          RichText(
            text: TextSpan(
              children: [
                TextSpan(
                  text: isArabic ? 'الدرس\n' : 'La règle\n',
                  style: PapierType.serif(
                    fontSize: 36,
                    fontWeight: FontWeight.w500,
                    color: Papier.ink,
                    letterSpacing: -0.9,
                    height: 0.98,
                  ),
                ),
                TextSpan(
                  text: isArabic ? 'الموصى به' : 'd\'aujourd\'hui',
                  style: PapierType.italic(
                    fontSize: 36,
                    fontWeight: FontWeight.w500,
                    color: Papier.red,
                    letterSpacing: -0.9,
                    height: 0.98,
                  ),
                ),
                TextSpan(
                  text: daysUntilExam > 0
                      ? (isArabic
                          ? ',\nخلال $daysUntilExam يوما.'
                          : ',\nà $daysUntilExam jours du Bac.')
                      : '.',
                  style: PapierType.serif(
                    fontSize: 36,
                    fontWeight: FontWeight.w500,
                    color: Papier.ink,
                    letterSpacing: -0.9,
                    height: 0.98,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          // Body italic — supporting copy
          Text.rich(
            TextSpan(
              children: [
                TextSpan(text: isArabic ? descrAr : descrFr),
              ],
            ),
            style: PapierType.italic(
                fontSize: 13, color: Papier.ink2, height: 1.5),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                flex: 2,
                child: ElevatedButton(
                  onPressed: onPrimary,
                  child: Text(
                    isArabic ? 'اقرأ وتمرّن ←' : 'Lire & pratiquer →',
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                flex: 1,
                child: OutlinedButton(
                  onPressed: onSecondary,
                  child: Text(isArabic ? 'لاحقا' : 'Plus tard'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _HeadlineSkeleton extends StatelessWidget {
  const _HeadlineSkeleton();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.fromLTRB(22, 18, 22, 8),
      child: CardListSkeleton(itemCount: 1, itemHeight: 180),
    );
  }
}

// ─── Table du jour — leader-dot ToC ────────────────────────
class _TableOfDay extends StatelessWidget {
  final List<SubjectProgress> subjects;
  final ValueChanged<String> onTap;
  const _TableOfDay({required this.subjects, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    if (subjects.isEmpty) return const SizedBox.shrink();

    final ordered = [...subjects]
      ..sort((a, b) => a.completionPercent.compareTo(b.completionPercent));
    final top = ordered.take(4).toList();

    String _meta(SubjectProgress sp) {
      final pct = (sp.completionPercent * 100).round();
      if (pct == 0) return isArabic ? 'جديد' : 'nouveau';
      if (pct < 40) return isArabic ? 'في تقدم' : 'en cours';
      if (pct < 90) return isArabic ? 'مراجعة' : 'révision';
      return isArabic ? 'مكتسب' : 'acquis';
    }

    Color _col(SubjectProgress sp) {
      final pct = sp.completionPercent;
      if (pct < 0.3) return Papier.red;
      if (pct < 0.7) return Papier.gold;
      return Papier.green;
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 22),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              SmallCaps(isArabic ? 'برنامج اليوم' : 'Table du jour',
                  color: Papier.ink3),
              Text(
                'p. ${(top.length).clamp(1, 99)}',
                style: PapierType.mono(fontSize: 9, color: Papier.ink3),
              ),
            ],
          ),
          const SizedBox(height: 6),
          const DoubleRule(topThickness: 1, gap: 2, bottomThickness: 1),
          for (var i = 0; i < top.length; i++)
            ToCRow(
              numeral: '${toRoman(i + 1)}.',
              title: isArabic
                  ? top[i].subject.nameAr
                  : top[i].subject.nameFr,
              meta: _meta(top[i]),
              right: '${(top[i].completionPercent * 100).round()}%',
              rightColor: _col(top[i]),
              onTap: () => onTap(top[i].subject.id),
            ),
        ],
      ),
    );
  }
}

// ─── Subjects strip — vertical bars ────────────────────────
class _SubjectsStrip extends StatelessWidget {
  final List<SubjectProgress> subjects;
  const _SubjectsStrip({required this.subjects});

  @override
  Widget build(BuildContext context) {
    if (subjects.isEmpty) return const SizedBox.shrink();
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    final l = AppLocalizations.of(context)!;

    final shown = subjects.take(5).toList();
    Color _col(int i) =>
        const [Papier.red, Papier.indigo, Papier.gold, Papier.green, Papier.ink2][i % 5];

    return Padding(
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 22),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SmallCaps(
            isArabic ? 'المواد · الإتقان' : 'Matières · maîtrise',
            color: Papier.ink3,
          ),
          const SizedBox(height: 10),
          Container(
            height: 84,
            decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Papier.ink, width: 1)),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                for (var i = 0; i < shown.length; i++) ...[
                  if (i > 0)
                    const SizedBox(
                      width: 1,
                      height: 50,
                      child: ColoredBox(color: Papier.line2),
                    ),
                  Expanded(
                    child: _SubjectBar(
                      name: isArabic
                          ? shown[i].subject.nameAr
                          : shown[i].subject.nameFr,
                      pct: (shown[i].completionPercent * 100).round(),
                      total: shown[i].totalSkills,
                      color: _col(i),
                    ),
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

class _SubjectBar extends StatelessWidget {
  final String name;
  final int pct;
  final int total;
  final Color color;
  const _SubjectBar({
    required this.name,
    required this.pct,
    required this.total,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final shortName = name.length > 6 ? '${name.substring(0, 6)}.' : name;
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Text.rich(
          TextSpan(
            children: [
              TextSpan(
                text: '$pct',
                style: PapierType.mono(
                    fontSize: 10, color: Papier.ink, fontWeight: FontWeight.w500),
              ),
              TextSpan(
                text: '%',
                style: PapierType.mono(fontSize: 8, color: Papier.ink3),
              ),
            ],
          ),
        ),
        const SizedBox(height: 4),
        Container(
          width: 8,
          height: (pct * 0.55).clamp(2.0, 50.0),
          color: color,
        ),
        const SizedBox(height: 4),
        Text(
          shortName,
          style: PapierType.italic(fontSize: 11, color: Papier.ink2),
        ),
        Text(
          '×$total',
          style: PapierType.mono(fontSize: 8, color: Papier.ink3),
        ),
      ],
    );
  }
}
