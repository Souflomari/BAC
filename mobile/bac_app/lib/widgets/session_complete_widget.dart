import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../l10n/app_localizations.dart';
import 'papier/papier_primitives.dart';

class SessionCompleteWidget extends StatefulWidget {
  final int totalItems;
  final int correctAnswers;
  final int totalXp;
  final double accuracy;
  final VoidCallback onContinue;
  final VoidCallback onNewSession;
  final void Function(String skillId)? onReviewLesson;
  final String? skillId;

  const SessionCompleteWidget({
    super.key,
    required this.totalItems,
    required this.correctAnswers,
    required this.totalXp,
    required this.accuracy,
    required this.onContinue,
    required this.onNewSession,
    this.onReviewLesson,
    this.skillId,
  });

  @override
  State<SessionCompleteWidget> createState() => _SessionCompleteWidgetState();
}

class _SessionCompleteWidgetState extends State<SessionCompleteWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fade;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 900),
      vsync: this,
    );
    _fade = CurvedAnimation(parent: _controller, curve: Curves.easeOut);
    _scale = Tween<double>(begin: 0.85, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  String get _romanNumeral {
    final correct = widget.correctAnswers;
    const numerals = [
      '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
      'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    ];
    if (correct >= 1 && correct < numerals.length) return numerals[correct];
    return '$correct';
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final isGood = widget.accuracy >= 0.7;

    return FadeTransition(
      opacity: _fade,
      child: ScaleTransition(
        scale: _scale,
        child: Container(
          color: Papier.darkBg,
          child: SafeArea(
            child: Stack(
              children: [
                const PaperGrain(opacity: 0.18),
                // Thin gold frame
                Positioned.fill(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: Papier.gold.withValues(alpha: 0.35),
                          width: 0.5,
                        ),
                      ),
                    ),
                  ),
                ),

                Column(
                  children: [
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // Label
                          Text(
                            'SESSION TERMINÉE',
                            style: PapierType.smallCaps(
                              fontSize: 9,
                              color: Papier.gold,
                            ),
                          ),
                          const SizedBox(height: 16),

                          // Giant Roman numeral — the hero
                          Text(
                            _romanNumeral,
                            style: PapierType.italic(
                              fontSize: 110,
                              color: Papier.gold,
                              letterSpacing: -2,
                            ),
                          ),

                          // Fleuron row
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Container(
                                  width: 32,
                                  height: 0.5,
                                  color: Papier.gold.withValues(alpha: 0.5),
                                ),
                                const SizedBox(width: 14),
                                const Fleuron(size: 16, color: Papier.gold),
                                const SizedBox(width: 14),
                                Container(
                                  width: 32,
                                  height: 0.5,
                                  color: Papier.gold.withValues(alpha: 0.5),
                                ),
                              ],
                            ),
                          ),

                          // Result headline
                          Text(
                            isGood
                                ? 'Bonne session.'
                                : 'Continue comme ça.',
                            style: PapierType.italic(
                              fontSize: 22,
                              color: Papier.darkInk,
                            ),
                            textAlign: TextAlign.center,
                          ),

                          // Quote
                          const SizedBox(height: 14),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 40),
                            child: Text(
                              _encouragementMessage(l),
                              style: PapierType.italic(
                                fontSize: 12,
                                color: Papier.darkInk2,
                                height: 1.6,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),

                          // Stats
                          const SizedBox(height: 26),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              _Stat(
                                value: '${widget.correctAnswers}/${widget.totalItems}',
                                label: l.correct,
                              ),
                              _divider(),
                              _Stat(
                                value: '${(widget.accuracy * 100).round()}%',
                                label: l.precision,
                              ),
                              _divider(),
                              _Stat(
                                value: '+${widget.totalXp}',
                                label: l.xp,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    // Footer
                    Container(
                      padding: const EdgeInsets.fromLTRB(18, 12, 18, 18),
                      decoration: BoxDecoration(
                        border: Border(
                          top: BorderSide(
                            color: Papier.gold.withValues(alpha: 0.4),
                            width: 0.5,
                          ),
                        ),
                        color: Papier.darkBg,
                      ),
                      child: Column(
                        children: [
                          GestureDetector(
                            onTap: widget.onContinue,
                            child: Container(
                              width: double.infinity,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              color: Papier.gold,
                              child: Center(
                                child: Text(
                                  '${l.backToHome} →',
                                  style: PapierType.smallCaps(
                                    fontSize: 11,
                                    color: Papier.darkBg,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 10),
                          GestureDetector(
                            onTap: widget.onNewSession,
                            child: Center(
                              child: Text(
                                l.newSession,
                                style: PapierType.italic(
                                  fontSize: 13,
                                  color: Papier.darkInk2,
                                ),
                              ),
                            ),
                          ),
                          if (widget.onReviewLesson != null &&
                              widget.skillId != null &&
                              widget.accuracy < 0.7) ...[
                            const SizedBox(height: 8),
                            GestureDetector(
                              onTap: () => widget.onReviewLesson!(widget.skillId!),
                              child: Center(
                                child: Text(
                                  '↳ ${l.reviewLesson}',
                                  style: PapierType.italic(
                                    fontSize: 12,
                                    color: Papier.darkInk3,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _divider() => Container(
        width: 0.5,
        height: 28,
        margin: const EdgeInsets.symmetric(horizontal: 18),
        color: Papier.darkInk2.withValues(alpha: 0.25),
      );

  String _encouragementMessage(AppLocalizations l) {
    if (widget.accuracy >= 0.9) return l.encourageExcellent;
    if (widget.accuracy >= 0.7) return l.encourageGood;
    if (widget.accuracy >= 0.5) return l.encourageOk;
    return l.encourageKeepGoing;
  }
}

class _Stat extends StatelessWidget {
  final String value;
  final String label;

  const _Stat({required this.value, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: PapierType.italic(
            fontSize: 18,
            color: Papier.darkInk,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: PapierType.mono(
            fontSize: 9,
            color: Papier.darkInk3,
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }
}
