import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_math_fork/flutter_math.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../models/exam_paper.dart';
import '../../models/item.dart';
import '../../models/lesson_v2.dart';
import '../../widgets/exam_paper/exam_paper_view.dart';
import '../../providers/lesson_progress_provider.dart';
import '../../providers/progress_provider.dart';
import '../../services/analytics_service.dart';
import '../../utils/print_helper.dart';
import '../../utils/share_helper.dart';
import '../../widgets/lesson_find_bar.dart';
import '../../widgets/papier/papier_toast.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/rich_text_renderer.dart';
// Interactive widget dispatch — reuse the same set as the v1 lesson cards.
import '../../widgets/math/function_graph_widget.dart';
import '../../widgets/math/derivative_graph_widget.dart';
import '../../widgets/math/sequence_visualizer_widget.dart';
import '../../widgets/math/area_under_curve_widget.dart';
import '../../widgets/math/complex_plane_widget.dart';
import '../../widgets/math/complex_multiplication_widget.dart';
import '../../widgets/math/chain_rule_visualizer.dart';
import '../../widgets/math/sign_table_widget.dart';
import '../../widgets/math/probability_tree_widget.dart';
import '../../widgets/math/limit_calculator_widget.dart';
import '../../widgets/math/recurrence_solver_widget.dart';
import '../../widgets/math/sequence_calculator_widget.dart';
import '../../widgets/math/system_solver_widget.dart';
import '../../widgets/math/diff_eq_solver_widget.dart';
import '../../widgets/math/ipp_calculator_widget.dart';
import '../../widgets/math/epsilon_delta_visualizer_widget.dart';
import '../../widgets/math/slope_field_widget.dart';
import '../../widgets/math/monte_carlo_simulator_widget.dart';
import '../../widgets/math/euclid_visualizer_widget.dart';
import '../../widgets/math/geometry_3d_viewer_widget.dart';
import '../../widgets/physics/force_diagram_widget.dart';
import '../../widgets/physics/projectile_simulator_widget.dart';
import '../../widgets/physics/circuit_simulator_widget.dart';
import '../../widgets/physics/wave_simulator_widget.dart';
import '../../widgets/physics/rlc_simulator_widget.dart';
import '../../widgets/physics/capacitor_charge_widget.dart';
import '../../widgets/physics/motion_simulator_widget.dart';
import '../../widgets/physics/refraction_simulator_widget.dart';
import '../../widgets/physics/e_field_uniform_widget.dart';
import '../../widgets/physics/b_field_uniform_widget.dart';
import '../../widgets/physics/nuclear_decay_simulator_widget.dart';
import '../../widgets/physics/pendulum_lab_widget.dart';
import '../../widgets/physics/am_modulation_widget.dart';
import '../../widgets/chemistry/titration_simulator_widget.dart';
import '../../widgets/chemistry/acid_base_ph_widget.dart';
import '../../widgets/chemistry/equilibrium_qr_k_widget.dart';
import '../../widgets/chemistry/kinetics_reactor_widget.dart';
import '../../widgets/chemistry/daniell_cell_widget.dart';
import '../../widgets/chemistry/esterification_animator_widget.dart';
import '../../widgets/animations/concept_animation_widget.dart';

/// Renders a v2 long-form lesson — sections of typed blocks, with inline
/// checkpoints that gate per-section completion. Designed to read like a
/// textbook chapter, not a Duolingo card stack.
class LongLessonScreen extends ConsumerStatefulWidget {
  final String skillId;
  final LessonV2 lesson;
  final ExamPaper? examPaper;
  final String? practiceSkillId; // optional override for the "Pratiquer" CTA

  const LongLessonScreen({
    super.key,
    required this.skillId,
    required this.lesson,
    this.examPaper,
    this.practiceSkillId,
  });

  @override
  ConsumerState<LongLessonScreen> createState() => _LongLessonScreenState();
}

class _LongLessonScreenState extends ConsumerState<LongLessonScreen> {
  /// Per-section keys for scroll-to navigation from the TOC.
  late final List<GlobalKey> _sectionKeys;

  // Find-in-page state.
  bool _findOpen = false;
  String _findQuery = '';
  List<int> _findMatchSections = const [];
  int _findCurrentMatch = 0;

  @override
  void initState() {
    super.initState();
    _sectionKeys = List.generate(
      widget.lesson.sections.length,
      (_) => GlobalKey(),
    );
    Analytics.event('lesson_opened', {
      'skill_id': widget.skillId,
      'section_count': widget.lesson.sections.length,
    });
    if (widget.examPaper != null) {
      Analytics.event('exam_paper_opened', {
        'skill_id': widget.skillId,
        'exercice_count': widget.examPaper!.exercices.length,
      });
    }
  }

  void _scrollToSection(int index) {
    final ctx = _sectionKeys[index].currentContext;
    if (ctx != null) {
      Scrollable.ensureVisible(
        ctx,
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeInOutCubic,
        alignment: 0.05,
      );
    }
  }

  /// Walk every section's blocks and collect plain text from paragraph,
  /// heading, callout, and example blocks. Returns the section indices
  /// that contain a substring match (case-insensitive) for [query].
  List<int> _findSectionsMatching(String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return const [];
    final out = <int>[];
    for (var s = 0; s < widget.lesson.sections.length; s++) {
      final section = widget.lesson.sections[s];
      final hay = StringBuffer(section.titleFr.toLowerCase());
      for (final block in section.blocks) {
        if (block is ParagraphBlock) hay.write(' ${block.md.toLowerCase()}');
        if (block is HeadingBlock) hay.write(' ${block.text.toLowerCase()}');
        if (block is CalloutBlock) {
          hay.write(' ${block.titleFr.toLowerCase()}');
          hay.write(' ${block.bodyFr.toLowerCase()}');
        }
        if (block is ExampleBlock) {
          hay.write(' ${block.titleFr.toLowerCase()}');
          hay.write(' ${block.problemFr.toLowerCase()}');
          for (final st in block.stepsFr) {
            hay.write(' ${st.toLowerCase()}');
          }
        }
      }
      if (hay.toString().contains(q)) out.add(s);
    }
    return out;
  }

  void _onFindChanged(String query) {
    setState(() {
      _findQuery = query;
      _findMatchSections = _findSectionsMatching(query);
      _findCurrentMatch = 0;
    });
    if (_findMatchSections.isNotEmpty) {
      _scrollToSection(_findMatchSections.first);
    }
  }

  void _findNext() {
    if (_findMatchSections.isEmpty) return;
    setState(() {
      _findCurrentMatch =
          (_findCurrentMatch + 1) % _findMatchSections.length;
    });
    _scrollToSection(_findMatchSections[_findCurrentMatch]);
  }

  void _findPrev() {
    if (_findMatchSections.isEmpty) return;
    setState(() {
      _findCurrentMatch =
          (_findCurrentMatch - 1 + _findMatchSections.length) %
              _findMatchSections.length;
    });
    _scrollToSection(_findMatchSections[_findCurrentMatch]);
  }

  void _toggleFind() {
    setState(() {
      _findOpen = !_findOpen;
      if (!_findOpen) {
        _findQuery = '';
        _findMatchSections = const [];
        _findCurrentMatch = 0;
      }
    });
  }

  Future<void> _share() async {
    final url = 'https://bacapp.vercel.app/lesson/${widget.skillId}';
    final result = await sharePage(
      title: 'BacPrep · ${widget.lesson.titleFr}',
      url: url,
    );
    if (!mounted) return;
    switch (result) {
      case ShareResult.shared:
        // Share sheet closed — nothing to toast.
        break;
      case ShareResult.copiedToClipboard:
        PapierToast.success(context, 'Lien copié dans le presse-papiers');
      case ShareResult.unsupported:
        PapierToast.note(context, 'Partage non disponible sur ce navigateur');
    }
    Analytics.event('feature_used:share', {'skill_id': widget.skillId});
  }

  /// Section completion: a section is "complete" iff every CheckpointBlock
  /// inside it has at least one passed key per question.
  Set<int> _computeCompletedSections(Set<String> passed) {
    final out = <int>{};
    for (var s = 0; s < widget.lesson.sections.length; s++) {
      final section = widget.lesson.sections[s];
      var hasCheckpoint = false;
      var allPassed = true;
      for (var b = 0; b < section.blocks.length; b++) {
        final block = section.blocks[b];
        if (block is CheckpointBlock) {
          hasCheckpoint = true;
          for (var q = 0; q < block.questions.length; q++) {
            final key = '$s.$b.$q';
            if (!passed.contains(key)) allPassed = false;
          }
        }
      }
      if (hasCheckpoint && allPassed) out.add(s);
    }
    return out;
  }

  void _onQuestionPassed(int sectionIdx, int blockIdx, int questionIdx) {
    final key = '$sectionIdx.$blockIdx.$questionIdx';
    ref.read(lessonProgressProvider(widget.skillId).notifier).markPassed(key);
    Analytics.event('checkpoint_passed', {
      'skill_id': widget.skillId,
      'section': sectionIdx,
    });
  }

  @override
  Widget build(BuildContext context) {
    final l = widget.lesson;
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= 1024;
    // Watch the persisted progress; falls back to empty set while loading.
    final progressAsync = ref.watch(lessonProgressProvider(widget.skillId));
    final passed = progressAsync.valueOrNull ?? const <String>{};
    final completed = _computeCompletedSections(passed);

    final matchSet = _findMatchSections.toSet();
    final activeMatchSection = _findMatchSections.isNotEmpty
        ? _findMatchSections[_findCurrentMatch]
        : -1;

    final hasExamPaper = widget.examPaper != null;
    // Trailing slots: optional ExamPaperView (if present) + end-of-lesson row.
    final trailingCount = hasExamPaper ? 2 : 1;
    final body = ListView.builder(
      padding: EdgeInsets.symmetric(
        horizontal: isWide ? 0 : 22,
        vertical: 24,
      ),
      itemCount: l.sections.length + trailingCount,
      itemBuilder: (context, idx) {
        if (idx < l.sections.length) {
          return KeyedSubtree(
            key: _sectionKeys[idx],
            child: _SectionView(
              index: idx,
              section: l.sections[idx],
              isCompleted: completed.contains(idx),
              onQuestionPassed: (b, q) => _onQuestionPassed(idx, b, q),
              passedKeys: passed,
              findMatch: matchSet.contains(idx),
              findActive: idx == activeMatchSection,
            ),
          );
        }
        // After all sections: exam paper then end-of-lesson, or just end.
        if (hasExamPaper && idx == l.sections.length) {
          return ExamPaperView(paper: widget.examPaper!);
        }
        return _buildEndOfLesson();
      },
    );

    final header = _buildHeader();

    return Shortcuts(
      shortcuts: const <ShortcutActivator, Intent>{
        SingleActivator(LogicalKeyboardKey.keyF, control: true): _FindIntent(),
        SingleActivator(LogicalKeyboardKey.keyF, meta: true): _FindIntent(),
      },
      child: Actions(
        actions: <Type, Action<Intent>>{
          _FindIntent: CallbackAction<_FindIntent>(
            onInvoke: (_) {
              if (!_findOpen) _toggleFind();
              return null;
            },
          ),
        },
        child: Focus(
          autofocus: true,
          child: Scaffold(
            backgroundColor: Papier.bg,
            body: SafeArea(
              child: Column(
                children: [
                  header,
                  if (_findOpen)
                    LessonFindBar(
                      initialQuery: _findQuery,
                      matchCount: _findMatchSections.length,
                      currentIndex: _findCurrentMatch,
                      onChanged: _onFindChanged,
                      onPrev: _findPrev,
                      onNext: _findNext,
                      onClose: _toggleFind,
                    ),
                  Expanded(
                    child: isWide
                        ? Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(
                                width: 240,
                                child: _Toc(
                                  sections: l.sections,
                                  completed: completed,
                                  onTap: _scrollToSection,
                                ),
                              ),
                              const VerticalDivider(
                                  width: 1, color: Papier.line2),
                              Expanded(
                                child: Center(
                                  child: ConstrainedBox(
                                    constraints:
                                        const BoxConstraints(maxWidth: 760),
                                    child: body,
                                  ),
                                ),
                              ),
                            ],
                          )
                        : body,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    final l = widget.lesson;
    final mins = l.totalEstimatedMinutes;
    final passed = ref.read(lessonProgressProvider(widget.skillId)).valueOrNull
        ?? const <String>{};
    final completed = _computeCompletedSections(passed);
    final total = l.sections.length;
    final pct = total == 0 ? 0.0 : completed.length / total;
    return Container(
      padding: const EdgeInsets.fromLTRB(22, 14, 14, 16),
      decoration: const BoxDecoration(
        color: Papier.surface,
        border: Border(bottom: BorderSide(color: Papier.ink, width: 2)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('LEÇON · ${l.skillId.toUpperCase()}',
                    style: PapierType.smallCaps(fontSize: 10, color: Papier.ink3)),
                const SizedBox(height: 4),
                Text(l.titleFr,
                    style: PapierType.italic(
                        fontSize: 28, fontWeight: FontWeight.w500, height: 1.1)),
                if (l.subtitleFr != null) ...[
                  const SizedBox(height: 4),
                  Text(l.subtitleFr!,
                      style: PapierType.body(
                          fontSize: 14, color: Papier.ink2, height: 1.45)),
                ],
                if (mins > 0) ...[
                  const SizedBox(height: 6),
                  Text('≈ $mins min de lecture',
                      style: PapierType.mono(fontSize: 11, color: Papier.ink3)),
                ],
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(2),
                        child: LinearProgressIndicator(
                          value: pct,
                          minHeight: 4,
                          backgroundColor: Papier.line,
                          valueColor: const AlwaysStoppedAnimation(Papier.green),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Text(
                      '${completed.length} / $total',
                      style: PapierType.mono(fontSize: 11, color: Papier.ink2),
                    ),
                  ],
                ),
              ],
            ),
          ),
          IconButton(
            icon: Icon(
              _findOpen ? Icons.search_off : Icons.search,
              color: Papier.ink,
            ),
            tooltip: 'Rechercher dans le chapitre (Cmd/Ctrl + F)',
            onPressed: _toggleFind,
          ),
          IconButton(
            icon: const Icon(Icons.share_outlined, color: Papier.ink),
            tooltip: 'Partager',
            onPressed: _share,
          ),
          IconButton(
            icon: const Icon(Icons.print_outlined, color: Papier.ink),
            tooltip: 'Imprimer',
            onPressed: printPage,
          ),
          IconButton(
            icon: const Icon(Icons.close, color: Papier.ink),
            tooltip: 'Fermer',
            onPressed: () {
              if (Navigator.of(context).canPop()) {
                Navigator.of(context).pop();
              } else {
                context.go('/subjects');
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildEndOfLesson() {
    final practiceId = widget.practiceSkillId ?? widget.skillId;
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 32),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.ink, width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('À LA FIN DE LA LEÇON',
              style: PapierType.smallCaps(fontSize: 10, color: Papier.red)),
          const SizedBox(height: 8),
          Text('Pratique maintenant.',
              style: PapierType.italic(
                  fontSize: 28, fontWeight: FontWeight.w500, height: 1.1)),
          const SizedBox(height: 8),
          Text(
              'Une bonne lecture ne suffit pas. Enchaîne avec une session pour ancrer ce que tu viens d\'apprendre — et laisse le système te ramener ces compétences au bon moment.',
              style: PapierType.body(fontSize: 14, color: Papier.ink2, height: 1.5)),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () => context.push('/session?skill_id=$practiceId'),
            style: FilledButton.styleFrom(
              backgroundColor: Papier.ink,
              foregroundColor: Papier.surface,
              shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(2)),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            ),
            child: Text('Démarrer la session →',
                style: PapierType.serif(
                    fontSize: 14,
                    color: Papier.surface,
                    fontWeight: FontWeight.w500)),
          ),
          const SizedBox(height: 28),
          _PrevNextNav(currentSkillId: widget.skillId),
        ],
      ),
    );
  }
}

/// Prev/next chapter navigation. Renders only when sibling chapters exist
/// in the same topic.
class _PrevNextNav extends ConsumerWidget {
  final String currentSkillId;
  const _PrevNextNav({required this.currentSkillId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final skillAsync = ref.watch(skillByIdProvider(currentSkillId));
    return skillAsync.when(
      loading: () => const SizedBox.shrink(),
      error: (_, __) => const SizedBox.shrink(),
      data: (skill) {
        final siblingsAsync = ref.watch(skillsProvider(skill.topicId));
        return siblingsAsync.when(
          loading: () => const SizedBox.shrink(),
          error: (_, __) => const SizedBox.shrink(),
          data: (siblings) {
            final ordered = [...siblings]
              ..sort((a, b) => a.displayOrder.compareTo(b.displayOrder));
            final i = ordered.indexWhere((s) => s.id == currentSkillId);
            if (i == -1) return const SizedBox.shrink();
            final prev = i > 0 ? ordered[i - 1] : null;
            final next = i < ordered.length - 1 ? ordered[i + 1] : null;
            if (prev == null && next == null) return const SizedBox.shrink();
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('CHAPITRES',
                    style: PapierType.smallCaps(
                        fontSize: 10, color: Papier.ink3)),
                const SizedBox(height: 10),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: prev != null
                          ? _NavCard(
                              direction: '← Chapitre précédent',
                              title: prev.nameFr,
                              onTap: () =>
                                  context.go('/lesson/${prev.id}'),
                            )
                          : const SizedBox.shrink(),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: next != null
                          ? _NavCard(
                              direction: 'Chapitre suivant →',
                              title: next.nameFr,
                              onTap: () =>
                                  context.go('/lesson/${next.id}'),
                            )
                          : const SizedBox.shrink(),
                    ),
                  ],
                ),
              ],
            );
          },
        );
      },
    );
  }
}

class _NavCard extends StatelessWidget {
  final String direction;
  final String title;
  final VoidCallback onTap;
  const _NavCard({
    required this.direction,
    required this.title,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
        decoration: BoxDecoration(
          color: Papier.bg2,
          border: Border.all(color: Papier.line2, width: 1),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(direction,
                style: PapierType.smallCaps(
                    fontSize: 9, color: Papier.ink3)),
            const SizedBox(height: 4),
            Text(title,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: PapierType.italic(
                    fontSize: 16,
                    color: Papier.ink,
                    fontWeight: FontWeight.w500,
                    height: 1.2)),
          ],
        ),
      ),
    );
  }
}

class _Toc extends StatelessWidget {
  final List<LessonSection> sections;
  final Set<int> completed;
  final void Function(int) onTap;

  const _Toc({
    required this.sections,
    required this.completed,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(22, 28, 16, 28),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('SOMMAIRE',
              style: PapierType.smallCaps(fontSize: 10, color: Papier.ink3)),
          const SizedBox(height: 12),
          for (var i = 0; i < sections.length; i++)
            InkWell(
              onTap: () => onTap(i),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 4, right: 8),
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: completed.contains(i)
                            ? Papier.green
                            : Colors.transparent,
                        border: Border.all(color: Papier.ink2, width: 1),
                      ),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            sections[i].titleFr,
                            style: PapierType.serif(
                                fontSize: 13,
                                color: completed.contains(i)
                                    ? Papier.ink
                                    : Papier.ink2,
                                fontWeight: FontWeight.w500,
                                height: 1.3),
                          ),
                          if (sections[i].estimatedMinutes != null)
                            Padding(
                              padding: const EdgeInsets.only(top: 2),
                              child: Text(
                                '${sections[i].estimatedMinutes} min',
                                style: PapierType.mono(
                                    fontSize: 9, color: Papier.ink3),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _SectionView extends StatelessWidget {
  final int index;
  final LessonSection section;
  final bool isCompleted;
  final Set<String> passedKeys;
  final void Function(int blockIdx, int questionIdx) onQuestionPassed;
  final bool findMatch;
  final bool findActive;

  const _SectionView({
    required this.index,
    required this.section,
    required this.isCompleted,
    required this.onQuestionPassed,
    required this.passedKeys,
    this.findMatch = false,
    this.findActive = false,
  });

  @override
  Widget build(BuildContext context) {
    final highlightDecoration = findMatch
        ? BoxDecoration(
            border: Border(
              left: BorderSide(
                color: findActive ? Papier.gold : Papier.line2,
                width: findActive ? 3 : 2,
              ),
            ),
            color: findActive
                ? Papier.gold.withValues(alpha: 0.05)
                : null,
          )
        : null;
    return Container(
      margin: const EdgeInsets.only(bottom: 32),
      padding: findMatch
          ? const EdgeInsets.only(left: 12, top: 4, bottom: 4)
          : EdgeInsets.zero,
      decoration: highlightDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Eyebrow + section title
          Row(
            children: [
              Text(
                section.eyebrowFr ?? _defaultEyebrow(section.kind),
                style: PapierType.smallCaps(
                    fontSize: 11,
                    color: isCompleted ? Papier.green : Papier.red),
              ),
              const SizedBox(width: 8),
              Expanded(
                  child: Container(height: 1, color: Papier.line2)),
              if (section.estimatedMinutes != null) ...[
                const SizedBox(width: 8),
                Text('${section.estimatedMinutes} min',
                    style: PapierType.mono(
                        fontSize: 10, color: Papier.ink3)),
              ],
            ],
          ),
          const SizedBox(height: 8),
          Text(section.titleFr,
              style: PapierType.italic(
                  fontSize: 26,
                  fontWeight: FontWeight.w500,
                  height: 1.15,
                  letterSpacing: -0.4)),
          const SizedBox(height: 16),
          // Blocks
          for (var b = 0; b < section.blocks.length; b++)
            _BlockView(
              block: section.blocks[b],
              onQuestionPassed: (q) => onQuestionPassed(b, q),
              passedFor: (q) =>
                  passedKeys.contains('$index.$b.$q'),
            ),
        ],
      ),
    );
  }

  static String _defaultEyebrow(LessonSectionKind k) {
    switch (k) {
      case LessonSectionKind.prerequisite:
        return 'PRÉREQUIS';
      case LessonSectionKind.concept:
        return 'CONCEPT';
      case LessonSectionKind.exampleWalkthrough:
        return 'EXEMPLE COMPLET';
      case LessonSectionKind.practice:
        return 'PRATIQUE';
      case LessonSectionKind.deepen:
        return 'POUR ALLER PLUS LOIN';
      case LessonSectionKind.synthesis:
        return 'SYNTHÈSE';
    }
  }
}

class _BlockView extends StatelessWidget {
  final LessonBlock block;
  final void Function(int qIdx) onQuestionPassed;
  final bool Function(int qIdx) passedFor;

  const _BlockView({
    required this.block,
    required this.onQuestionPassed,
    required this.passedFor,
  });

  @override
  Widget build(BuildContext context) {
    final b = block;
    Widget child;
    switch (b) {
      case ParagraphBlock _:
        child = _ParagraphView(md: b.md);
      case HeadingBlock _:
        child = _HeadingView(text: b.text, level: b.level);
      case FormulaBlock _:
        child = _FormulaView(latex: b.latex, captionFr: b.captionFr);
      case CalloutBlock _:
        child = _CalloutView(tone: b.tone, titleFr: b.titleFr, bodyFr: b.bodyFr);
      case ExampleBlock _:
        child = _ExampleView(
          titleFr: b.titleFr,
          problemFr: b.problemFr,
          stepsFr: b.stepsFr,
          answerFr: b.answerFr,
        );
      case InteractiveBlock _:
        child = _InteractiveView(
          widgetType: b.widgetType,
          config: b.config,
          captionFr: b.captionFr,
        );
      case CheckpointBlock _:
        child = _CheckpointView(
          titleFr: b.titleFr,
          questions: b.questions,
          onQuestionPassed: onQuestionPassed,
          passedFor: passedFor,
        );
      case TryItBlock _:
        child = _TryItView(
          titleFr: b.titleFr,
          problemFr: b.problemFr,
          hintFr: b.hintFr,
          solutionFr: b.solutionFr,
        );
      case DividerBlock _:
        child = const _DividerView();
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: child,
    );
  }
}

class _ParagraphView extends StatelessWidget {
  final String md;
  const _ParagraphView({required this.md});

  @override
  Widget build(BuildContext context) {
    return RichTextRenderer(
      text: md,
      style: PapierType.body(fontSize: 16, color: Papier.ink, height: 1.65),
    );
  }
}

class _HeadingView extends StatelessWidget {
  final String text;
  final int level;
  const _HeadingView({required this.text, required this.level});

  @override
  Widget build(BuildContext context) {
    final size = level == 2 ? 22.0 : 18.0;
    return Padding(
      padding: const EdgeInsets.only(top: 12, bottom: 4),
      child: Text(text,
          style: PapierType.italic(
              fontSize: size, fontWeight: FontWeight.w500, height: 1.2)),
    );
  }
}

class _FormulaView extends StatelessWidget {
  final String latex;
  final String? captionFr;
  const _FormulaView({required this.latex, this.captionFr});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 14),
      decoration: BoxDecoration(
        color: Papier.bg2,
        border: const Border(left: BorderSide(color: Papier.ink2, width: 2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Math.tex(
            latex,
            mathStyle: MathStyle.display,
            textStyle: const TextStyle(
                fontSize: 18, color: Papier.ink),
            onErrorFallback: (e) => Text(latex,
                style: PapierType.mono(fontSize: 13, color: Papier.red)),
          ),
          if (captionFr != null) ...[
            const SizedBox(height: 8),
            Text(captionFr!,
                textAlign: TextAlign.center,
                style: PapierType.smallCaps(
                    fontSize: 10, color: Papier.ink2)),
          ],
        ],
      ),
    );
  }
}

class _CalloutView extends StatelessWidget {
  final String tone;
  final String titleFr;
  final String bodyFr;
  const _CalloutView(
      {required this.tone, required this.titleFr, required this.bodyFr});

  @override
  Widget build(BuildContext context) {
    final color = switch (tone) {
      'warning' || 'pitfall' => Papier.red,
      'insight' => Papier.green,
      _ => Papier.indigo, // 'note' default
    };
    final iconData = switch (tone) {
      'warning' || 'pitfall' => Icons.warning_amber_rounded,
      'insight' => Icons.lightbulb_outline,
      _ => Icons.info_outline,
    };
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 12, 14, 14),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.06),
        border: Border(left: BorderSide(color: color, width: 3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(iconData, size: 16, color: color),
              const SizedBox(width: 6),
              Text(
                titleFr,
                style: PapierType.serif(
                    fontSize: 13,
                    color: color,
                    fontWeight: FontWeight.w600),
              ),
            ],
          ),
          const SizedBox(height: 6),
          RichTextRenderer(
            text: bodyFr,
            style: PapierType.body(
                fontSize: 14, color: Papier.ink, height: 1.55),
          ),
        ],
      ),
    );
  }
}

class _ExampleView extends StatefulWidget {
  final String titleFr;
  final String problemFr;
  final List<String> stepsFr;
  final String? answerFr;
  const _ExampleView({
    required this.titleFr,
    required this.problemFr,
    required this.stepsFr,
    this.answerFr,
  });

  @override
  State<_ExampleView> createState() => _ExampleViewState();
}

class _ExampleViewState extends State<_ExampleView> {
  int _stepsRevealed = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.line2, width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.lightbulb_outline,
                  size: 16, color: Papier.gold),
              const SizedBox(width: 6),
              Text('EXEMPLE',
                  style: PapierType.smallCaps(
                      fontSize: 10, color: Papier.gold)),
            ],
          ),
          const SizedBox(height: 6),
          Text(widget.titleFr,
              style: PapierType.italic(
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                  height: 1.2)),
          const SizedBox(height: 10),
          RichTextRenderer(
            text: widget.problemFr,
            style: PapierType.body(
                fontSize: 15, color: Papier.ink, height: 1.55),
          ),
          const SizedBox(height: 12),
          for (var i = 0; i < _stepsRevealed; i++) ...[
            const Divider(color: Papier.line, height: 18),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 2, right: 8),
                  padding: const EdgeInsets.symmetric(
                      horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: Papier.bg2,
                    border: Border.all(color: Papier.ink2),
                  ),
                  child: Text('${i + 1}',
                      style: PapierType.mono(
                          fontSize: 10,
                          color: Papier.ink2,
                          fontWeight: FontWeight.w600)),
                ),
                Expanded(
                  child: RichTextRenderer(
                    text: widget.stepsFr[i],
                    style: PapierType.body(
                        fontSize: 14, color: Papier.ink, height: 1.55),
                  ),
                ),
              ],
            ),
          ],
          if (_stepsRevealed < widget.stepsFr.length) ...[
            const SizedBox(height: 10),
            OutlinedButton(
              onPressed: () => setState(() => _stepsRevealed++),
              style: OutlinedButton.styleFrom(
                foregroundColor: Papier.ink,
                side: const BorderSide(color: Papier.ink, width: 1.4),
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(2)),
                ),
                padding: const EdgeInsets.symmetric(
                    horizontal: 16, vertical: 10),
              ),
              child: Text(
                _stepsRevealed == 0
                    ? 'Voir la solution étape par étape →'
                    : 'Étape suivante →',
                style: PapierType.serif(fontSize: 13, color: Papier.ink),
              ),
            ),
          ] else if (widget.answerFr != null) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.symmetric(
                  vertical: 10, horizontal: 12),
              decoration: BoxDecoration(
                color: Papier.green.withValues(alpha: 0.10),
                border: const Border(
                    left: BorderSide(color: Papier.green, width: 2)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.check, color: Papier.green, size: 18),
                  const SizedBox(width: 6),
                  Expanded(
                    child: RichTextRenderer(
                      text: widget.answerFr!,
                      style: PapierType.body(
                          fontSize: 14,
                          color: Papier.green,
                          fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _InteractiveView extends StatelessWidget {
  final String widgetType;
  final Map<String, dynamic>? config;
  final String? captionFr;
  const _InteractiveView({
    required this.widgetType,
    this.config,
    this.captionFr,
  });

  Item _stub() {
    final cfg = config ?? const {};
    return Item(
      id: 'lesson_v2_demo',
      skillId: 'lesson_v2',
      itemType: ItemType.mcq,
      difficultyLevel: 1,
      question: {'stem': '', 'graph_config': cfg, 'sim_config': cfg},
    );
  }

  Widget _dispatch(Item item) {
    void onAnswer(_) {}
    switch (widgetType) {
      case 'function_graph':
        return FunctionGraphWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'derivative_graph':
        return DerivativeGraphWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'epsilon_delta_visualizer':
        return EpsilonDeltaVisualizerWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'sequence_viz':
        return SequenceVisualizerWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'area_curve':
        return AreaUnderCurveWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'complex_plane':
        return ComplexPlaneWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'complex_multiplication':
        return ComplexMultiplicationWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'chain_rule_visualizer':
        return ChainRuleVisualizer(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'sign_table':
        return SignTableWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'probability_tree':
        return ProbabilityTreeWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'limit_calculator':
        return LimitCalculatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'recurrence_solver':
        return RecurrenceSolverWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'sequence_calculator':
        return SequenceCalculatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'system_solver':
        return SystemSolverWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'diff_eq_solver':
        return DiffEqSolverWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'ipp_calculator':
        return IPPCalculatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'slope_field':
        return SlopeFieldWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'monte_carlo_simulator':
        return MonteCarloSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'euclid_visualizer':
        return EuclidVisualizerWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'geometry_3d_viewer':
        return Geometry3dViewerWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'force_diagram':
        return ForceDiagramWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'projectile':
        return ProjectileSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'circuit':
        return CircuitSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'wave':
        return WaveSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'rlc':
        return RLCSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'capacitor_charge':
        return CapacitorChargeWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'motion_simulator':
        return MotionSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'refraction_simulator':
        return RefractionSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'e_field_uniform':
        return EFieldUniformWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'b_field_uniform':
        return BFieldUniformWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'nuclear_decay_simulator':
        return NuclearDecaySimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'pendulum_lab':
        return PendulumLabWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'am_modulation':
        return AmModulationWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'titration_simulator':
        return TitrationSimulatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'acid_base_ph':
        return AcidBasePhWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'equilibrium_qr_k':
        return EquilibriumQrKWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'kinetics_reactor':
        return KineticsReactorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'daniell_cell':
        return DaniellCellWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'esterification_animator':
        return EsterificationAnimatorWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      case 'concept_animation':
        return ConceptAnimationWidget(
            item: item, isAnswered: false, onAnswer: onAnswer);
      default:
        return Container(
          padding: const EdgeInsets.all(12),
          color: Papier.bg2,
          child: Text('Widget inconnu : $widgetType',
              style: PapierType.mono(fontSize: 12, color: Papier.red)),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.ink2, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: const BoxDecoration(
              color: Papier.bg2,
              border: Border(bottom: BorderSide(color: Papier.line2)),
            ),
            child: Row(
              children: [
                const Icon(Icons.science_outlined,
                    size: 14, color: Papier.ink2),
                const SizedBox(width: 6),
                Text('EXPLORATION',
                    style: PapierType.smallCaps(
                        fontSize: 10, color: Papier.ink2)),
                if (captionFr != null) ...[
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(captionFr!,
                        overflow: TextOverflow.ellipsis,
                        style: PapierType.body(
                            fontSize: 11, color: Papier.ink2)),
                  ),
                ],
              ],
            ),
          ),
          // Absorb horizontal drags so the parent ListView scroll doesn't
          // steal touches from sliders inside the widget.
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            onHorizontalDragStart: (_) {},
            onHorizontalDragUpdate: (_) {},
            child: SizedBox(
              height: 380,
              child: _dispatch(_stub()),
            ),
          ),
        ],
      ),
    );
  }
}

class _CheckpointView extends StatefulWidget {
  final String titleFr;
  final List<CheckpointQuestion> questions;
  final void Function(int qIdx) onQuestionPassed;
  final bool Function(int qIdx) passedFor;

  const _CheckpointView({
    required this.titleFr,
    required this.questions,
    required this.onQuestionPassed,
    required this.passedFor,
  });

  @override
  State<_CheckpointView> createState() => _CheckpointViewState();
}

class _CheckpointViewState extends State<_CheckpointView> {
  /// Per-question selected answer index (null = not yet answered).
  final Map<int, int> _selected = {};

  /// Per-question whether feedback has been revealed (true after Valider).
  final Map<int, bool> _revealed = {};

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Papier.bg2,
        border: Border.all(color: Papier.ink2, width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.check_circle_outline,
                  size: 16, color: Papier.red),
              const SizedBox(width: 6),
              Text('CHECKPOINT',
                  style: PapierType.smallCaps(
                      fontSize: 10, color: Papier.red)),
            ],
          ),
          const SizedBox(height: 4),
          Text(widget.titleFr,
              style: PapierType.italic(
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                  height: 1.2)),
          const SizedBox(height: 12),
          for (var q = 0; q < widget.questions.length; q++) ...[
            if (q > 0) const Divider(color: Papier.line, height: 24),
            _buildQuestion(q, widget.questions[q]),
          ],
        ],
      ),
    );
  }

  Widget _buildQuestion(int qIdx, CheckpointQuestion question) {
    final selected = _selected[qIdx];
    final revealed = _revealed[qIdx] ?? false;
    final alreadyPassed = widget.passedFor(qIdx);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RichTextRenderer(
          text: 'Q${qIdx + 1}.  ${question.stemFr}',
          style: PapierType.body(
              fontSize: 14,
              color: Papier.ink,
              height: 1.55,
              fontWeight: FontWeight.w500),
        ),
        const SizedBox(height: 8),
        for (var c = 0; c < question.choicesFr.length; c++)
          _ChoiceTile(
            label: String.fromCharCode(65 + c), // A, B, C, D
            text: question.choicesFr[c],
            isSelected: selected == c,
            isCorrect: revealed && c == question.correctIndex,
            isWrongPick: revealed && selected == c && c != question.correctIndex,
            onTap: revealed
                ? null
                : () => setState(() => _selected[qIdx] = c),
          ),
        const SizedBox(height: 8),
        if (!revealed)
          Row(
            children: [
              FilledButton(
                onPressed: selected == null
                    ? null
                    : () {
                        setState(() => _revealed[qIdx] = true);
                        if (selected == question.correctIndex) {
                          widget.onQuestionPassed(qIdx);
                        }
                      },
                style: FilledButton.styleFrom(
                  backgroundColor: Papier.ink,
                  foregroundColor: Papier.surface,
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(2)),
                  ),
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16, vertical: 10),
                ),
                child: Text('Valider',
                    style: PapierType.serif(
                        fontSize: 13, color: Papier.surface)),
              ),
              if (alreadyPassed) ...[
                const SizedBox(width: 10),
                Text('Déjà validé',
                    style: PapierType.italic(
                        fontSize: 12, color: Papier.green)),
              ],
            ],
          )
        else
          _Feedback(
              correct: selected == question.correctIndex,
              explanationFr: question.explanationFr,
              onRetry: () => setState(() {
                    _revealed.remove(qIdx);
                    _selected.remove(qIdx);
                  })),
      ],
    );
  }
}

class _ChoiceTile extends StatelessWidget {
  final String label;
  final String text;
  final bool isSelected;
  final bool isCorrect;
  final bool isWrongPick;
  final VoidCallback? onTap;
  const _ChoiceTile({
    required this.label,
    required this.text,
    required this.isSelected,
    required this.isCorrect,
    required this.isWrongPick,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = isCorrect
        ? Papier.green
        : isWrongPick
            ? Papier.red
            : isSelected
                ? Papier.ink
                : Papier.line2;
    final bg = isCorrect
        ? Papier.green.withValues(alpha: 0.10)
        : isWrongPick
            ? Papier.red.withValues(alpha: 0.08)
            : isSelected
                ? Papier.surface
                : Colors.transparent;
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: InkWell(
        onTap: onTap,
        child: Container(
          padding:
              const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          decoration: BoxDecoration(
            color: bg,
            border: Border.all(color: color, width: isSelected ? 1.6 : 1),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 22,
                height: 22,
                margin: const EdgeInsets.only(right: 10, top: 1),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isCorrect
                      ? Papier.green
                      : isWrongPick
                          ? Papier.red
                          : isSelected
                              ? Papier.ink
                              : Papier.bg2,
                  border: Border.all(color: color, width: 1),
                ),
                alignment: Alignment.center,
                child: Text(label,
                    style: PapierType.serif(
                        fontSize: 11,
                        color: (isSelected || isCorrect || isWrongPick)
                            ? Papier.surface
                            : Papier.ink2,
                        fontWeight: FontWeight.w600)),
              ),
              Expanded(
                child: RichTextRenderer(
                  text: text,
                  style: PapierType.body(
                      fontSize: 14, color: Papier.ink, height: 1.45),
                ),
              ),
              if (isCorrect)
                const Icon(Icons.check, color: Papier.green, size: 18),
              if (isWrongPick)
                const Icon(Icons.close, color: Papier.red, size: 18),
            ],
          ),
        ),
      ),
    );
  }
}

class _Feedback extends StatelessWidget {
  final bool correct;
  final String explanationFr;
  final VoidCallback onRetry;
  const _Feedback({
    required this.correct,
    required this.explanationFr,
    required this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    final color = correct ? Papier.green : Papier.red;
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.06),
        border: Border(left: BorderSide(color: color, width: 2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(correct ? Icons.check_circle : Icons.error_outline,
                  size: 18, color: color),
              const SizedBox(width: 6),
              Text(correct ? 'Correct' : 'Pas tout à fait',
                  style: PapierType.serif(
                      fontSize: 14,
                      color: color,
                      fontWeight: FontWeight.w600)),
            ],
          ),
          const SizedBox(height: 6),
          RichTextRenderer(
            text: explanationFr,
            style: PapierType.body(
                fontSize: 13, color: Papier.ink, height: 1.5),
          ),
          if (!correct) ...[
            const SizedBox(height: 8),
            TextButton(
              onPressed: onRetry,
              style: TextButton.styleFrom(
                foregroundColor: Papier.ink2,
                padding: EdgeInsets.zero,
                minimumSize: const Size(40, 28),
              ),
              child: Text('Réessayer',
                  style: PapierType.italic(
                      fontSize: 12, color: Papier.ink2)),
            ),
          ],
        ],
      ),
    );
  }
}

class _TryItView extends StatefulWidget {
  final String titleFr;
  final String problemFr;
  final String hintFr;
  final String solutionFr;

  const _TryItView({
    required this.titleFr,
    required this.problemFr,
    required this.hintFr,
    required this.solutionFr,
  });

  @override
  State<_TryItView> createState() => _TryItViewState();
}

class _TryItViewState extends State<_TryItView> {
  bool _hintShown = false;
  bool _solutionShown = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.gold, width: 1.5),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.edit_note_outlined,
                  size: 16, color: Papier.gold),
              const SizedBox(width: 6),
              Text('À TOI DE JOUER',
                  style: PapierType.smallCaps(
                      fontSize: 10, color: Papier.gold)),
            ],
          ),
          const SizedBox(height: 4),
          Text(widget.titleFr,
              style: PapierType.italic(
                  fontSize: 18, fontWeight: FontWeight.w500)),
          const SizedBox(height: 8),
          RichTextRenderer(
            text: widget.problemFr,
            style: PapierType.body(
                fontSize: 14, color: Papier.ink, height: 1.55),
          ),
          const SizedBox(height: 12),
          if (!_hintShown)
            TextButton.icon(
              onPressed: () => setState(() => _hintShown = true),
              icon: const Icon(Icons.lightbulb_outline,
                  color: Papier.gold, size: 16),
              label: Text('Afficher un indice',
                  style: PapierType.italic(
                      fontSize: 13, color: Papier.gold)),
              style: TextButton.styleFrom(
                padding: EdgeInsets.zero,
                minimumSize: const Size(40, 28),
              ),
            )
          else
            Container(
              padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
              margin: const EdgeInsets.only(bottom: 8),
              decoration: BoxDecoration(
                color: Papier.gold.withValues(alpha: 0.06),
                border: const Border(
                    left: BorderSide(color: Papier.gold, width: 2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('INDICE',
                      style: PapierType.smallCaps(
                          fontSize: 10, color: Papier.gold)),
                  const SizedBox(height: 4),
                  RichTextRenderer(
                    text: widget.hintFr,
                    style: PapierType.body(
                        fontSize: 13, color: Papier.ink, height: 1.5),
                  ),
                ],
              ),
            ),
          if (!_solutionShown)
            TextButton.icon(
              onPressed: () => setState(() => _solutionShown = true),
              icon: const Icon(Icons.visibility_outlined,
                  color: Papier.ink2, size: 16),
              label: Text('Voir la solution',
                  style: PapierType.italic(
                      fontSize: 13, color: Papier.ink2)),
              style: TextButton.styleFrom(
                padding: EdgeInsets.zero,
                minimumSize: const Size(40, 28),
              ),
            )
          else
            Container(
              padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
              decoration: BoxDecoration(
                color: Papier.green.withValues(alpha: 0.06),
                border: const Border(
                    left: BorderSide(color: Papier.green, width: 2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('SOLUTION',
                      style: PapierType.smallCaps(
                          fontSize: 10, color: Papier.green)),
                  const SizedBox(height: 4),
                  RichTextRenderer(
                    text: widget.solutionFr,
                    style: PapierType.body(
                        fontSize: 13, color: Papier.ink, height: 1.55),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class _DividerView extends StatelessWidget {
  const _DividerView();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        children: [
          Expanded(child: Container(height: 1, color: Papier.line2)),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 12),
            child: Fleuron(),
          ),
          Expanded(child: Container(height: 1, color: Papier.line2)),
        ],
      ),
    );
  }
}

class _FindIntent extends Intent {
  const _FindIntent();
}
