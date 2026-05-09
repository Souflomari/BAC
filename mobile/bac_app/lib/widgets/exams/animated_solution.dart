import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../interactive_widget_dispatch.dart';
import '../rich_text_renderer.dart';

/// Animated step-by-step solution for an exam question.
///
/// Behaviour:
/// - Steps start hidden behind a "Voir la solution" CTA.
/// - First click reveals step 1 with a stagger fade-in.
/// - "Suivant ↓" reveals the next step (also fades in).
/// - "Tout révéler" jumps to the final state.
/// - Each step optionally renders an interactive widget (projectile,
///   capacitor charge, titration, …) by reading `widget_slug` and
///   `widget_config` from the step map.
/// - Each step optionally renders a "Piège" (mistake) callout and
///   a "Astuce" (tip) callout by reading `mistake` and `tip`.
///
/// Schema (per step):
///   {
///     "text": "...",                   // markdown + LaTeX
///     "points": 2,                     // optional, integer
///     "widget_slug": "projectile",     // optional, must be in wiredSlugs
///     "widget_config": {...},          // optional, passed to the widget
///     "mistake": "Erreur classique...",// optional callout
///     "tip": "Astuce :..."             // optional callout
///   }
class AnimatedSolution extends StatefulWidget {
  final List<Map<String, dynamic>> steps;
  final String? finalAnswer;
  final String? gradingNotes;
  final List<String> commonMistakes;
  final List<String> tips;

  const AnimatedSolution({
    super.key,
    required this.steps,
    this.finalAnswer,
    this.gradingNotes,
    this.commonMistakes = const [],
    this.tips = const [],
  });

  @override
  State<AnimatedSolution> createState() => _AnimatedSolutionState();
}

class _AnimatedSolutionState extends State<AnimatedSolution> {
  /// 0 = nothing revealed yet (initial CTA visible).
  /// N = first N steps visible.
  /// steps.length+1 = full solution including final answer + grading notes.
  int _revealedCount = 0;

  void _revealNext() {
    setState(() {
      if (_revealedCount <= widget.steps.length) {
        _revealedCount++;
      }
    });
  }

  void _revealAll() {
    setState(() => _revealedCount = widget.steps.length + 1);
  }

  void _reset() {
    setState(() => _revealedCount = 0);
  }

  @override
  Widget build(BuildContext context) {
    if (widget.steps.isEmpty &&
        (widget.finalAnswer == null || widget.finalAnswer!.isEmpty)) {
      return const SizedBox.shrink();
    }

    final isCollapsed = _revealedCount == 0;
    final isFullyRevealed = _revealedCount > widget.steps.length;
    final hasMoreSteps = _revealedCount < widget.steps.length;

    return Container(
      margin: const EdgeInsets.only(top: 18),
      decoration: BoxDecoration(
        color: Papier.surface,
        border: const Border(
          left: BorderSide(color: Papier.indigo, width: 2),
        ),
      ),
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              const Icon(Icons.auto_awesome_outlined,
                  size: 16, color: Papier.indigo),
              const SizedBox(width: 8),
              Text(
                'SOLUTION',
                style: PapierType.smallCaps(
                    fontSize: 11, color: Papier.indigo),
              ),
              const Spacer(),
              if (!isCollapsed && !isFullyRevealed)
                TextButton(
                  onPressed: _revealAll,
                  style: TextButton.styleFrom(
                    minimumSize: Size.zero,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 4),
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                  child: Text(
                    'Tout révéler',
                    style: PapierType.smallCaps(
                        fontSize: 10, color: Papier.ink2),
                  ),
                ),
              if (isFullyRevealed)
                TextButton(
                  onPressed: _reset,
                  style: TextButton.styleFrom(
                    minimumSize: Size.zero,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 4),
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                  child: Text(
                    'Masquer',
                    style: PapierType.smallCaps(
                        fontSize: 10, color: Papier.ink2),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 12),

          // Initial CTA — shown before anything is revealed
          if (isCollapsed)
            Center(
              child: GestureDetector(
                onTap: _revealNext,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 22, vertical: 14),
                  color: Papier.ink,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.visibility_outlined,
                          size: 16, color: Papier.surface),
                      const SizedBox(width: 8),
                      Text(
                        widget.steps.isEmpty
                            ? 'Voir la réponse'
                            : 'Voir la solution étape par étape',
                        style: PapierType.smallCaps(
                            fontSize: 11, color: Papier.surface),
                      ),
                    ],
                  ),
                ),
              ),
            ),

          // Revealed steps
          for (var i = 0; i < widget.steps.length && i < _revealedCount; i++)
            _StepView(
              key: ValueKey('step_$i'),
              index: i,
              data: widget.steps[i],
            ),

          // Final answer + grading notes + common mistakes + tips
          if (isFullyRevealed) ...[
            if (widget.finalAnswer != null && widget.finalAnswer!.isNotEmpty) ...[
              const SizedBox(height: 14),
              _FinalAnswerBox(answer: widget.finalAnswer!),
            ],
            if (widget.gradingNotes != null &&
                widget.gradingNotes!.isNotEmpty) ...[
              const SizedBox(height: 12),
              _NotesPanel(
                eyebrow: 'BARÈME',
                tone: Papier.gold,
                body: widget.gradingNotes!,
              ),
            ],
            if (widget.commonMistakes.isNotEmpty) ...[
              const SizedBox(height: 8),
              _NotesPanel(
                eyebrow: 'PIÈGES CLASSIQUES',
                tone: Papier.red,
                body: widget.commonMistakes.map((m) => '• $m').join('\n'),
              ),
            ],
            if (widget.tips.isNotEmpty) ...[
              const SizedBox(height: 8),
              _NotesPanel(
                eyebrow: 'ASTUCES',
                tone: Papier.green,
                body: widget.tips.map((t) => '• $t').join('\n'),
              ),
            ],
          ],

          // "Suivant ↓" button — when there are more steps to reveal
          if (!isCollapsed && hasMoreSteps) ...[
            const SizedBox(height: 12),
            Center(
              child: GestureDetector(
                onTap: _revealNext,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 18, vertical: 10),
                  decoration: BoxDecoration(
                    border: Border.all(color: Papier.ink, width: 1.4),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Étape suivante',
                        style: PapierType.smallCaps(
                            fontSize: 11, color: Papier.ink),
                      ),
                      const SizedBox(width: 6),
                      const Icon(Icons.arrow_downward,
                          size: 14, color: Papier.ink),
                    ],
                  ),
                ),
              ),
            ),
          ],

          // "Voir la réponse finale" button — when all steps are out but
          // final answer / notes still hidden
          if (!isCollapsed && !hasMoreSteps && !isFullyRevealed) ...[
            const SizedBox(height: 12),
            Center(
              child: GestureDetector(
                onTap: _revealNext,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 22, vertical: 12),
                  color: Papier.indigo,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        widget.finalAnswer != null &&
                                widget.finalAnswer!.isNotEmpty
                            ? 'Voir la réponse finale'
                            : 'Voir le récapitulatif',
                        style: PapierType.smallCaps(
                            fontSize: 11, color: Papier.surface),
                      ),
                      const SizedBox(width: 6),
                      const Icon(Icons.check, size: 14, color: Papier.surface),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _StepView extends StatefulWidget {
  final int index;
  final Map<String, dynamic> data;

  const _StepView({super.key, required this.index, required this.data});

  @override
  State<_StepView> createState() => _StepViewState();
}

class _StepViewState extends State<_StepView>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fade;
  late final Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 380),
      vsync: this,
    );
    _fade = CurvedAnimation(parent: _controller, curve: Curves.easeOut);
    _slide = Tween<Offset>(
      begin: const Offset(0, 0.05),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final text = widget.data['text'] as String? ?? '';
    final points = widget.data['points'] as int? ?? 0;
    final widgetSlug = widget.data['widget_slug'] as String?;
    final widgetConfig = widget.data['widget_config'] as Map<String, dynamic>?;
    final mistake = widget.data['mistake'] as String?;
    final tip = widget.data['tip'] as String?;

    final embeddedWidget = (widgetSlug != null && widgetSlug.isNotEmpty)
        ? buildInteractiveWidgetBySlug(widgetSlug, config: widgetConfig)
        : null;

    return FadeTransition(
      opacity: _fade,
      child: SlideTransition(
        position: _slide,
        child: Padding(
          padding: const EdgeInsets.only(bottom: 14),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Numbered step badge
              Container(
                width: 26,
                height: 26,
                margin: const EdgeInsets.only(top: 1),
                decoration: BoxDecoration(
                  color: Papier.indigo.withValues(alpha: 0.1),
                  border: Border.all(color: Papier.indigo, width: 1.2),
                  shape: BoxShape.circle,
                ),
                alignment: Alignment.center,
                child: Text(
                  '${widget.index + 1}',
                  style: PapierType.mono(
                      fontSize: 11,
                      color: Papier.indigo,
                      fontWeight: FontWeight.w600),
                ),
              ),
              const SizedBox(width: 12),

              // Body
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (text.isNotEmpty)
                      RichTextRenderer(
                        text: text,
                        style: PapierType.body(
                            fontSize: 14, color: Papier.ink, height: 1.5),
                      ),
                    if (points > 0) ...[
                      const SizedBox(height: 4),
                      Text(
                        '$points pt${points > 1 ? 's' : ''}',
                        style: PapierType.mono(
                            fontSize: 10, color: Papier.ink3),
                      ),
                    ],
                    if (embeddedWidget != null) ...[
                      const SizedBox(height: 10),
                      ClipRect(
                        child: Container(
                          decoration: BoxDecoration(
                            color: Papier.bg,
                            border: Border.all(
                                color: Papier.line2, width: 1),
                          ),
                          padding: const EdgeInsets.all(8),
                          child: embeddedWidget,
                        ),
                      ),
                    ],
                    if (mistake != null && mistake.isNotEmpty) ...[
                      const SizedBox(height: 8),
                      _InlineCallout(
                        eyebrow: 'PIÈGE',
                        body: mistake,
                        tone: Papier.red,
                      ),
                    ],
                    if (tip != null && tip.isNotEmpty) ...[
                      const SizedBox(height: 8),
                      _InlineCallout(
                        eyebrow: 'ASTUCE',
                        body: tip,
                        tone: Papier.green,
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FinalAnswerBox extends StatefulWidget {
  final String answer;
  const _FinalAnswerBox({required this.answer});

  @override
  State<_FinalAnswerBox> createState() => _FinalAnswerBoxState();
}

class _FinalAnswerBoxState extends State<_FinalAnswerBox>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 420),
      vsync: this,
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _controller,
      child: Container(
        padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
        decoration: BoxDecoration(
          color: Papier.indigo.withValues(alpha: 0.06),
          border: Border.all(color: Papier.indigo, width: 1.4),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.check_circle_outline,
                    size: 14, color: Papier.indigo),
                const SizedBox(width: 6),
                Text('RÉPONSE FINALE',
                    style: PapierType.smallCaps(
                        fontSize: 11, color: Papier.indigo)),
              ],
            ),
            const SizedBox(height: 6),
            RichTextRenderer(
              text: widget.answer,
              style: PapierType.body(
                  fontSize: 14, color: Papier.ink, fontWeight: FontWeight.w500),
            ),
          ],
        ),
      ),
    );
  }
}

class _NotesPanel extends StatelessWidget {
  final String eyebrow;
  final Color tone;
  final String body;
  const _NotesPanel({
    required this.eyebrow,
    required this.tone,
    required this.body,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
      decoration: BoxDecoration(
        color: tone.withValues(alpha: 0.05),
        border: Border(left: BorderSide(color: tone, width: 2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(eyebrow,
              style: PapierType.smallCaps(fontSize: 10, color: tone)),
          const SizedBox(height: 4),
          RichTextRenderer(
            text: body,
            style: PapierType.body(
                fontSize: 12, color: Papier.ink2, height: 1.5),
          ),
        ],
      ),
    );
  }
}

class _InlineCallout extends StatelessWidget {
  final String eyebrow;
  final String body;
  final Color tone;
  const _InlineCallout({
    required this.eyebrow,
    required this.body,
    required this.tone,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(10, 6, 10, 6),
      decoration: BoxDecoration(
        color: tone.withValues(alpha: 0.05),
        border: Border(left: BorderSide(color: tone, width: 2)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('$eyebrow · ',
              style: PapierType.smallCaps(fontSize: 9, color: tone)),
          Expanded(
            child: RichTextRenderer(
              text: body,
              style: PapierType.body(
                  fontSize: 12, color: Papier.ink2, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}
