import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/exam_paper.dart';
import '../../services/analytics_service.dart';
import '../rich_text_renderer.dart';
import '../exams/animated_solution.dart';
import '../interactive_widget_dispatch.dart' as iwd;

/// Top-level renderer for a topic-coherent Bac-paper attached to a skill.
///
/// Sits below the existing LessonV2 content in `long_lesson_screen.dart`.
/// Renders:
/// 1. Section header with eyebrow "ÉPREUVE TYPE", title, duration, points.
/// 2. Optional intro paragraph.
/// 3. List of [ExerciceCard] (4–5 per paper).
///
/// Each ExerciceCard expands to show its preamble + numbered questions +
/// per-question (or per-subpart) solution reveal that reuses [AnimatedSolution].
class ExamPaperView extends StatelessWidget {
  final ExamPaper paper;

  const ExamPaperView({super.key, required this.paper});

  @override
  Widget build(BuildContext context) {
    if (paper.exercices.isEmpty) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 40),
          _SectionDivider(),
          const SizedBox(height: 16),
          _Header(paper: paper),
          if (paper.introFr != null && paper.introFr!.isNotEmpty) ...[
            const SizedBox(height: 18),
            RichTextRenderer(text: paper.introFr!),
          ],
          const SizedBox(height: 24),
          for (final ex in paper.exercices) ...[
            ExerciceCard(skillId: paper.skillId, exercice: ex),
            const SizedBox(height: 18),
          ],
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}

class _SectionDivider extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
            child: Container(height: 1, color: Papier.line2)),
        const SizedBox(width: 12),
        Text(
          'ÉPREUVE TYPE',
          style: PapierType.smallCaps(fontSize: 11, color: Papier.indigo),
        ),
        const SizedBox(width: 12),
        Expanded(
            child: Container(height: 1, color: Papier.line2)),
      ],
    );
  }
}

class _Header extends StatelessWidget {
  final ExamPaper paper;
  const _Header({required this.paper});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(paper.titleFr, style: PapierType.display3(fontSize: 28)),
        if (paper.subtitleFr != null && paper.subtitleFr!.isNotEmpty) ...[
          const SizedBox(height: 6),
          Text(
            paper.subtitleFr!,
            style: PapierType.body(
                fontSize: 13, color: Papier.ink2, height: 1.5),
          ),
        ],
        const SizedBox(height: 12),
        Row(
          children: [
            _Chip(
                icon: Icons.schedule_outlined,
                label: '${paper.durationMinutes} min'),
            const SizedBox(width: 10),
            _Chip(
                icon: Icons.stars_outlined,
                label: 'Sur ${paper.totalPoints} pts'),
            const SizedBox(width: 10),
            _Chip(
                icon: Icons.format_list_numbered,
                label: '${paper.exercices.length} exercices'),
          ],
        ),
      ],
    );
  }
}

class _Chip extends StatelessWidget {
  final IconData icon;
  final String label;
  const _Chip({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        border: Border.all(color: Papier.line2, width: 1),
        color: Papier.surface,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: Papier.ink2),
          const SizedBox(width: 6),
          Text(
            label,
            style: PapierType.body(fontSize: 11, color: Papier.ink2),
          ),
        ],
      ),
    );
  }
}

/// Collapsible card for one Exercice.
class ExerciceCard extends StatefulWidget {
  final String skillId;
  final Exercice exercice;

  const ExerciceCard({
    super.key,
    required this.skillId,
    required this.exercice,
  });

  @override
  State<ExerciceCard> createState() => _ExerciceCardState();
}

class _ExerciceCardState extends State<ExerciceCard> {
  bool _expanded = true;

  void _toggle() {
    setState(() => _expanded = !_expanded);
    if (_expanded) {
      Analytics.event('exercice_expanded', {
        'skill_id': widget.skillId,
        'exercice_number': widget.exercice.number,
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final ex = widget.exercice;
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Papier.line2, width: 1.4),
        color: Papier.surface,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          InkWell(
            onTap: _toggle,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(18, 16, 14, 16),
              child: Row(
                children: [
                  _NumberBadge(number: ex.number),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'EXERCICE ${ex.number} · ${ex.points} pts',
                          style: PapierType.smallCaps(
                              fontSize: 10, color: Papier.ink3),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          ex.titleFr,
                          style: PapierType.italic(
                              fontSize: 20, color: Papier.ink),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    _expanded ? Icons.expand_less : Icons.expand_more,
                    color: Papier.ink2,
                  ),
                ],
              ),
            ),
          ),
          if (_expanded) ...[
            const Divider(height: 1, color: Papier.line),
            Padding(
              padding: const EdgeInsets.fromLTRB(18, 18, 18, 22),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (ex.preambleFr != null && ex.preambleFr!.isNotEmpty)
                    _Preamble(text: ex.preambleFr!, widgetSlug: ex.widgetSlug,
                        widgetConfig: ex.widgetConfig),
                  const SizedBox(height: 16),
                  for (var i = 0; i < ex.questions.length; i++) ...[
                    QuestionBlock(
                      skillId: widget.skillId,
                      exerciceNumber: ex.number,
                      question: ex.questions[i],
                    ),
                    if (i < ex.questions.length - 1) ...[
                      const SizedBox(height: 14),
                      Container(height: 1, color: Papier.line),
                      const SizedBox(height: 14),
                    ],
                  ],
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _NumberBadge extends StatelessWidget {
  final int number;
  const _NumberBadge({required this.number});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 38,
      height: 38,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: Papier.ink,
        shape: BoxShape.circle,
      ),
      child: Text(
        '$number',
        style: PapierType.italic(
            fontSize: 18, color: Papier.surface),
      ),
    );
  }
}

class _Preamble extends StatelessWidget {
  final String text;
  final String? widgetSlug;
  final Map<String, dynamic>? widgetConfig;

  const _Preamble({
    required this.text,
    this.widgetSlug,
    this.widgetConfig,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 12, 14, 14),
      decoration: BoxDecoration(
        color: Papier.bg2,
        border: const Border(
          left: BorderSide(color: Papier.ink, width: 2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'ÉNONCÉ',
            style: PapierType.smallCaps(fontSize: 10, color: Papier.ink3),
          ),
          const SizedBox(height: 8),
          RichTextRenderer(text: text),
          if (widgetSlug != null) ...[
            const SizedBox(height: 12),
            iwd.buildInteractiveWidgetBySlug(
                  widgetSlug!,
                  config: widgetConfig,
                ) ??
                const SizedBox.shrink(),
          ],
        ],
      ),
    );
  }
}

/// Renders one numbered question (with optional sub-parts).
class QuestionBlock extends StatelessWidget {
  final String skillId;
  final int exerciceNumber;
  final Question question;

  const QuestionBlock({
    super.key,
    required this.skillId,
    required this.exerciceNumber,
    required this.question,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${question.number}.',
              style: PapierType.italic(
                  fontSize: 17, color: Papier.indigo, fontWeight: FontWeight.w600),
            ),
            const SizedBox(width: 10),
            Expanded(child: RichTextRenderer(text: question.stemFr)),
            if (question.points > 0)
              Padding(
                padding: const EdgeInsets.only(left: 8, top: 4),
                child: Text(
                  '${question.points} pts',
                  style: PapierType.smallCaps(
                      fontSize: 10, color: Papier.ink3),
                ),
              ),
          ],
        ),
        if (question.hasSubparts) ...[
          const SizedBox(height: 8),
          for (final sub in question.subparts!) ...[
            const SizedBox(height: 10),
            _SubpartBlock(
              skillId: skillId,
              exerciceNumber: exerciceNumber,
              questionNumber: question.number,
              subpart: sub,
            ),
          ],
        ] else if (question.solution != null) ...[
          const SizedBox(height: 10),
          SolutionReveal(
            skillId: skillId,
            scopeId: 'ex${exerciceNumber}_q${question.number}',
            solution: question.solution!,
          ),
        ],
      ],
    );
  }
}

class _SubpartBlock extends StatelessWidget {
  final String skillId;
  final int exerciceNumber;
  final int questionNumber;
  final Subpart subpart;

  const _SubpartBlock({
    required this.skillId,
    required this.exerciceNumber,
    required this.questionNumber,
    required this.subpart,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 14),
      decoration: BoxDecoration(
        border: const Border(left: BorderSide(color: Papier.line2, width: 1)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                color: Papier.ink2,
                child: Text(
                  subpart.letter,
                  style: PapierType.italic(
                      fontSize: 13, color: Papier.surface),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(child: RichTextRenderer(text: subpart.stemFr)),
              if (subpart.points > 0)
                Padding(
                  padding: const EdgeInsets.only(left: 8, top: 4),
                  child: Text(
                    '${subpart.points} pts',
                    style: PapierType.smallCaps(
                        fontSize: 10, color: Papier.ink3),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 8),
          SolutionReveal(
            skillId: skillId,
            scopeId:
                'ex${exerciceNumber}_q${questionNumber}_${subpart.letter}',
            solution: subpart.solution,
          ),
        ],
      ),
    );
  }
}

/// Wraps the existing [AnimatedSolution] widget around a [QuestionSolution].
/// Maps our sealed-class steps into the Map<String,dynamic> shape that
/// AnimatedSolution already understands.
class SolutionReveal extends StatefulWidget {
  final String skillId;
  final String scopeId;
  final QuestionSolution solution;

  const SolutionReveal({
    super.key,
    required this.skillId,
    required this.scopeId,
    required this.solution,
  });

  @override
  State<SolutionReveal> createState() => _SolutionRevealState();
}

class _SolutionRevealState extends State<SolutionReveal> {
  bool _hasFiredOpenEvent = false;

  @override
  Widget build(BuildContext context) {
    final stepMaps = widget.solution.steps.map<Map<String, dynamic>>((s) {
      return {
        'text': s.textFr,
        if (s.latex != null) 'latex': s.latex,
        if (s.widgetSlug != null) 'widget_slug': s.widgetSlug,
        if (s.widgetConfig != null) 'widget_config': s.widgetConfig,
        if (s.mistakeFr != null) 'mistake': s.mistakeFr,
        if (s.tipFr != null) 'tip': s.tipFr,
      };
    }).toList();

    return NotificationListener<ScrollNotification>(
      child: GestureDetector(
        behavior: HitTestBehavior.translucent,
        onTap: () {
          if (!_hasFiredOpenEvent) {
            _hasFiredOpenEvent = true;
            Analytics.event('solution_revealed', {
              'skill_id': widget.skillId,
              'scope_id': widget.scopeId,
            });
          }
        },
        child: AnimatedSolution(
          steps: stepMaps,
          finalAnswer: widget.solution.finalAnswerFr,
          gradingNotes: widget.solution.methodFr,
        ),
      ),
    );
  }
}
