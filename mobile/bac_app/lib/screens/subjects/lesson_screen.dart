import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/lesson_v2.dart';
import '../../providers/progress_provider.dart';
import '../../widgets/lesson_card_widget.dart';
import 'long_lesson_screen.dart';

class LessonScreen extends ConsumerStatefulWidget {
  final String skillId;

  const LessonScreen({super.key, required this.skillId});

  @override
  ConsumerState<LessonScreen> createState() => _LessonScreenState();
}

class _LessonScreenState extends ConsumerState<LessonScreen>
    with TickerProviderStateMixin {
  int _currentPage = 0;
  late AnimationController _progressController;
  late AnimationController _cardTransitionController;
  late Animation<double> _cardFadeOut;
  late Animation<Offset> _cardSlideOut;
  bool _isTransitioning = false;
  int _totalCards = 0;

  @override
  void initState() {
    super.initState();
    _progressController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );
    _cardTransitionController = AnimationController(
      duration: const Duration(milliseconds: 250),
      vsync: this,
    );
    _cardFadeOut = Tween<double>(begin: 1, end: 0).animate(
      CurvedAnimation(parent: _cardTransitionController, curve: Curves.easeIn),
    );
    _cardSlideOut = Tween<Offset>(
      begin: Offset.zero,
      end: const Offset(-0.05, 0),
    ).animate(
      CurvedAnimation(parent: _cardTransitionController, curve: Curves.easeIn),
    );
  }

  @override
  void dispose() {
    _progressController.dispose();
    _cardTransitionController.dispose();
    super.dispose();
  }

  void _goToPage(int page) {
    if (_isTransitioning || page < 0 || page >= _totalCards) return;
    if (page == _currentPage) return;

    setState(() => _isTransitioning = true);

    _cardTransitionController.forward().then((_) {
      setState(() {
        _currentPage = page;
      });
      _cardTransitionController.reset();
      setState(() => _isTransitioning = false);
    });
  }

  void _next() => _goToPage(_currentPage + 1);
  void _previous() => _goToPage(_currentPage - 1);

  @override
  Widget build(BuildContext context) {
    final skillAsync = ref.watch(skillByIdProvider(widget.skillId));
    final l = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: Papier.bg,
      body: skillAsync.when(
        data: (skill) {
          // V2 long-form lesson dispatch — if the JSONB has version=2 (or
          // a `sections` list), route to the new screen.
          if (skill.isLongLesson && skill.lessonRaw != null) {
            final lesson =
                LessonV2.fromJson(widget.skillId, skill.lessonRaw!);
            return LongLessonScreen(
              skillId: widget.skillId,
              lesson: lesson,
            );
          }

          final cards = skill.lessonCards ?? [];
          if (cards.isEmpty) {
            return _EmptyLessonView(
              skillId: widget.skillId,
              message: l.noLessonAvailable,
              buttonLabel: l.startQuiz,
            );
          }

          _totalCards = cards.length;
          final progress = (_currentPage + 1) / _totalCards;
          final isLastCard = _currentPage == _totalCards - 1;

          return SafeArea(
            child: Column(
              children: [
                // Top bar: close + progress + counter
                _TopBar(
                  skillName: skill.nameFr,
                  currentPage: _currentPage,
                  totalCards: _totalCards,
                  progress: progress,
                  onClose: () => context.pop(),
                ),

                // Card area — swipe only, no tap zones
                Expanded(
                  child: GestureDetector(
                    onHorizontalDragEnd: (details) {
                      final velocity = details.primaryVelocity ?? 0;
                      if (velocity < -200) {
                        _next();
                      } else if (velocity > 200) {
                        _previous();
                      }
                    },
                    behavior: HitTestBehavior.translucent,
                    child: FadeTransition(
                      opacity: _cardFadeOut,
                      child: SlideTransition(
                        position: _cardSlideOut,
                        child: LessonCardWidget(
                          key: ValueKey(_currentPage),
                          card: cards[_currentPage],
                        ),
                      ),
                    ),
                  ),
                ),

                // Bottom: nav hints + action button
                _BottomBar(
                  isFirstCard: _currentPage == 0,
                  isLastCard: isLastCard,
                  currentPage: _currentPage,
                  totalCards: _totalCards,
                  onPrevious: _currentPage > 0 ? _previous : null,
                  onNext: !isLastCard ? _next : null,
                  onStartQuiz: () => context.push('/session', extra: {
                    'skill_id': widget.skillId,
                  }),
                  startQuizLabel: l.startQuiz,
                  nextLabel: l.next,
                ),
              ],
            ),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text(l.error('$e'))),
      ),
    );
  }
}

class _TopBar extends StatelessWidget {
  final String skillName;
  final int currentPage;
  final int totalCards;
  final double progress;
  final VoidCallback onClose;

  const _TopBar({
    required this.skillName,
    required this.currentPage,
    required this.totalCards,
    required this.progress,
    required this.onClose,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Papier.surface,
      child: Column(
        children: [
          // Header row
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 10, 18, 6),
            child: Row(
              children: [
                GestureDetector(
                  onTap: onClose,
                  child: Text('✕', style: PapierType.body(color: Papier.ink2, fontSize: 16)),
                ),
                const Spacer(),
                Text(
                  skillName,
                  style: PapierType.smallCaps(fontSize: 9, color: Papier.ink3),
                  overflow: TextOverflow.ellipsis,
                ),
                const Spacer(),
                Text(
                  '${currentPage + 1} / $totalCards',
                  style: PapierType.mono(fontSize: 10, color: Papier.ink2),
                ),
              ],
            ),
          ),
          // Tick progress
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 6),
            child: Row(
              children: List.generate(totalCards, (i) {
                return Expanded(
                  child: Container(
                    height: 3,
                    margin: const EdgeInsetsDirectional.only(end: 2),
                    color: i <= currentPage ? Papier.ink : Papier.line,
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }
}

class _BottomBar extends StatelessWidget {
  final bool isFirstCard;
  final bool isLastCard;
  final int currentPage;
  final int totalCards;
  final VoidCallback? onPrevious;
  final VoidCallback? onNext;
  final VoidCallback onStartQuiz;
  final String startQuizLabel;
  final String nextLabel;

  const _BottomBar({
    required this.isFirstCard,
    required this.isLastCard,
    required this.currentPage,
    required this.totalCards,
    this.onPrevious,
    this.onNext,
    required this.onStartQuiz,
    required this.startQuizLabel,
    required this.nextLabel,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 14),
      decoration: const BoxDecoration(
        color: Papier.surface,
        border: Border(top: BorderSide(color: Papier.line2)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Dot indicators
          if (totalCards > 1) ...[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(totalCards, (i) => Container(
                margin: const EdgeInsets.symmetric(horizontal: 3),
                width: i == currentPage ? 8 : 5,
                height: i == currentPage ? 8 : 5,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: i == currentPage ? Papier.ink : Papier.line2,
                ),
              )),
            ),
            const SizedBox(height: 8),
          ],
          Row(
            children: [
              // Previous
              if (!isFirstCard)
                GestureDetector(
                  onTap: onPrevious,
                  child: Text(
                    '← précédent',
                    style: PapierType.italic(fontSize: 13, color: Papier.ink3),
                  ),
                )
              else
                const SizedBox(width: 80),

              const Spacer(),

              // Main action
              GestureDetector(
                onTap: isLastCard ? onStartQuiz : onNext,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
                  color: Papier.ink,
                  child: Text(
                    isLastCard ? '$startQuizLabel →' : '$nextLabel →',
                    style: PapierType.smallCaps(
                      fontSize: 11,
                      color: Papier.surface,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _EmptyLessonView extends StatelessWidget {
  final String skillId;
  final String message;
  final String buttonLabel;

  const _EmptyLessonView({
    required this.skillId,
    required this.message,
    required this.buttonLabel,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.menu_book_outlined, size: 56,
              color: BacPrepColors.textSecondary.withValues(alpha: 0.5)),
          const SizedBox(height: Spacing.md),
          Text(message),
          const SizedBox(height: Spacing.lg),
          ElevatedButton.icon(
            onPressed: () => context.push('/session', extra: {
              'skill_id': skillId,
            }),
            icon: const Icon(Icons.play_arrow),
            label: Text(buttonLabel),
          ),
        ],
      ),
    );
  }
}
