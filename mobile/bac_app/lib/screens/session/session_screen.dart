import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/item.dart';
import '../../providers/session_provider.dart';
import '../../providers/daily_quest_provider.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/mcq_item_widget.dart';
import '../../widgets/numeric_item_widget.dart';
import '../../widgets/true_false_item_widget.dart';
import '../../widgets/rich_text_renderer.dart';
import '../../widgets/session_complete_widget.dart';
import '../../widgets/explanation_panel.dart';
import '../../widgets/badge_celebration_dialog.dart';
import '../../widgets/math/function_graph_widget.dart';
import '../../widgets/math/sequence_visualizer_widget.dart';
import '../../widgets/math/area_under_curve_widget.dart';
import '../../widgets/math/complex_plane_widget.dart';
import '../../widgets/math/chain_rule_visualizer.dart';
import '../../widgets/math/sequence_calculator_widget.dart';
import '../../widgets/math/limit_calculator_widget.dart';
import '../../widgets/math/derivative_graph_widget.dart';
import '../../widgets/math/ipp_calculator_widget.dart';
import '../../widgets/math/complex_multiplication_widget.dart';
import '../../widgets/math/diff_eq_solver_widget.dart';
import '../../widgets/math/recurrence_solver_widget.dart';
import '../../widgets/math/system_solver_widget.dart';
import '../../widgets/math/probability_tree_widget.dart';
import '../../widgets/math/sign_table_widget.dart';
import '../../widgets/physics/motion_simulator_widget.dart';
import '../../widgets/physics/force_diagram_widget.dart';
import '../../widgets/physics/circuit_simulator_widget.dart';
import '../../widgets/physics/wave_simulator_widget.dart';
import '../../widgets/physics/projectile_simulator_widget.dart';
import '../../widgets/physics/capacitor_charge_widget.dart';
import '../../widgets/physics/rlc_simulator_widget.dart';
import '../../widgets/physics/refraction_simulator_widget.dart';
import '../../widgets/svt/punnett_square_widget.dart';
import '../../widgets/svt/dna_replication_widget.dart';
import '../../widgets/svt/cell_division_widget.dart';

class SessionScreen extends ConsumerStatefulWidget {
  final String? subjectId;
  final String? skillId;
  final String sessionType;

  const SessionScreen({
    super.key,
    this.subjectId,
    this.skillId,
    this.sessionType = 'practice',
  });

  @override
  ConsumerState<SessionScreen> createState() => _SessionScreenState();
}

class _SessionScreenState extends ConsumerState<SessionScreen> {
  bool _showExplanation = false;
  bool _hintUsed = false;
  bool _hintVisible = false;
  bool _sessionCompleteRecorded = false;
  DateTime? _sessionStartTime;

  @override
  void initState() {
    super.initState();
    // Start session after build
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(sessionProvider.notifier).startSession(
        subjectId: widget.subjectId,
        skillId: widget.skillId,
        sessionType: widget.sessionType,
      );
      _sessionStartTime = DateTime.now();
    });
  }

  void _onAnswer(bool isCorrect, dynamic userAnswer) async {
    final result = await ref.read(sessionProvider.notifier).submitAnswer(
      isCorrect: isCorrect,
      userAnswer: userAnswer,
      hintUsed: _hintUsed,
    );

    if (result != null) {
      // Update daily quest progress
      final quests = ref.read(dailyQuestsProvider.notifier);
      if (isCorrect) {
        await quests.recordEvent(QuestEvent.correctAnswer);
      } else {
        quests.resetPerfectStreak();
      }

      // Show badge celebration if badges earned
      if (result.badgesEarned != null && result.badgesEarned!.isNotEmpty && mounted) {
        await showDialog(
          context: context,
          barrierDismissible: false,
          builder: (_) => BadgeCelebrationDialog(badges: result.badgesEarned!),
        );
      }
      setState(() => _showExplanation = true);
    }
  }

  void _onNext() {
    setState(() {
      _showExplanation = false;
      _hintUsed = false;
      _hintVisible = false;
    });
    ref.read(sessionProvider.notifier).nextItem();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(sessionProvider);
    final hasSession = state.session != null;
    final currentItem = state.currentItem;

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const Positioned.fill(child: PaperGrain(opacity: 0.18)),
          SafeArea(
            child: Column(
              children: [
                // ── Papier slim header ──
                Container(
                  color: Papier.surface,
                  padding: const EdgeInsets.fromLTRB(18, 12, 18, 8),
                  child: Row(
                    children: [
                      InkWell(
                        onTap: () => _showExitDialog(context),
                        child: const Icon(Icons.close, size: 18, color: Papier.ink2),
                      ),
                      const Spacer(),
                      if (hasSession)
                        RichText(
                          text: TextSpan(
                            style: PapierType.italic(fontSize: 12, color: Papier.ink2),
                            children: [
                              TextSpan(text: 'question '),
                              TextSpan(
                                text: toRoman(state.currentIndex + 1).toLowerCase(),
                                style: PapierType.italic(fontSize: 12, color: Papier.ink),
                              ),
                              TextSpan(text: ' sur ${state.totalItems}'),
                            ],
                          ),
                        ),
                      const Spacer(),
                      if (hasSession)
                        Text(
                          '+${state.totalXp}',
                          style: PapierType.mono(
                            fontSize: 11,
                            color: Papier.ink,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                    ],
                  ),
                ),
                // ── Tick progress ──
                if (hasSession)
                  Container(
                    color: Papier.surface,
                    padding: const EdgeInsets.fromLTRB(18, 0, 18, 6),
                    child: _TickProgress(
                      total: state.totalItems > 0 ? state.totalItems : 10,
                      current: state.currentIndex,
                    ),
                  ),
                // ── Body ──
                Expanded(child: _buildBody(context, state)),
                // ── Footer with Papier-style hint button ──
                if (currentItem != null &&
                    currentItem.item.hintText != null &&
                    !_showExplanation &&
                    !_hintVisible)
                  Container(
                    width: double.infinity,
                    color: Papier.bg,
                    padding: const EdgeInsets.fromLTRB(22, 0, 22, 8),
                    child: Align(
                      alignment: AlignmentDirectional.centerStart,
                      child: TextButton(
                        onPressed: () {
                          setState(() {
                            _hintVisible = true;
                            _hintUsed = true;
                          });
                        },
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.zero,
                          foregroundColor: Papier.red,
                        ),
                        child: Text(
                          '↳ ${AppLocalizations.of(context)!.hint} ${AppLocalizations.of(context)!.hintPenalty}',
                          style: PapierType.italic(
                            fontSize: 12,
                            color: Papier.red,
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBody(BuildContext context, SessionState state) {
    if (state.isLoading) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: Spacing.md),
            Text(AppLocalizations.of(context)!.sessionPreparation),
          ],
        ),
      );
    }

    if (state.error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(Spacing.lg),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: BacPrepColors.error),
              const SizedBox(height: Spacing.md),
              Text(AppLocalizations.of(context)!.error('${state.error}'), textAlign: TextAlign.center),
              const SizedBox(height: Spacing.lg),
              ElevatedButton(
                onPressed: () => ref.read(sessionProvider.notifier).startSession(
                  subjectId: widget.subjectId,
                  skillId: widget.skillId,
                  sessionType: widget.sessionType,
                ),
                child: Text(AppLocalizations.of(context)!.retry),
              ),
            ],
          ),
        ),
      );
    }

    if (state.isComplete) {
      if (!_sessionCompleteRecorded) {
        _sessionCompleteRecorded = true;
        WidgetsBinding.instance.addPostFrameCallback((_) {
          final quests = ref.read(dailyQuestsProvider.notifier);
          quests.recordEvent(QuestEvent.sessionCompleted);
          if (_sessionStartTime != null) {
            final mins = DateTime.now().difference(_sessionStartTime!).inMinutes;
            if (mins > 0) {
              quests.recordEvent(QuestEvent.studyMinute, amount: mins);
            }
          }
        });
      }
      return SessionCompleteWidget(
        totalItems: state.totalItems,
        correctAnswers: state.correctAnswers,
        totalXp: state.totalXp,
        accuracy: state.accuracy,
        skillId: widget.skillId,
        onContinue: () {
          ref.read(sessionProvider.notifier).reset();
          context.go('/home');
        },
        onNewSession: () {
          ref.read(sessionProvider.notifier).startSession(
            subjectId: widget.subjectId,
            sessionType: widget.sessionType,
          );
        },
        onReviewLesson: (skillId) {
          ref.read(sessionProvider.notifier).reset();
          context.go('/lesson/$skillId');
        },
      );
    }

    final currentItem = state.currentItem;
    if (currentItem == null) return const SizedBox.shrink();

    return Column(
      children: [
        // Papier eyebrow row — skill name as small caps + folio EX number
        Padding(
          padding: const EdgeInsets.fromLTRB(22, 16, 22, 0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Expanded(
                child: SmallCaps(
                  currentItem.skillNameFr,
                  color: Papier.red,
                  fontSize: 10,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                'EX · ${state.currentIndex + 1}',
                style: PapierType.mono(fontSize: 9, color: Papier.ink3),
              ),
              const SizedBox(width: 10),
              // Difficulty dots — Papier style: filled gold circles
              Row(
                children: List.generate(5, (i) => Container(
                  width: 6,
                  height: 6,
                  margin: const EdgeInsetsDirectional.only(start: 3),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: i < currentItem.item.difficultyLevel
                        ? Papier.gold
                        : Colors.transparent,
                    border: Border.all(
                      color: i < currentItem.item.difficultyLevel
                          ? Papier.gold
                          : Papier.line2,
                      width: 1,
                    ),
                  ),
                )),
              ),
            ],
          ),
        ),

        // Hint panel — Papier style margin slip with botanical green border
        if (_hintVisible && currentItem.item.hintText != null)
          AnimatedSize(
            duration: const Duration(milliseconds: 250),
            child: Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(22, 12, 22, 0),
              padding: const EdgeInsets.fromLTRB(14, 12, 14, 14),
              decoration: const BoxDecoration(
                color: Color(0x0F3E5A3B),  // green @ ~6%
                border: BorderDirectional(
                  start: BorderSide(color: Papier.green, width: 2),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const FootMark(mark: '✎', color: Papier.green),
                      const SizedBox(width: 4),
                      SmallCaps(
                        '${AppLocalizations.of(context)!.hint} · ${AppLocalizations.of(context)!.hintPenalty}',
                        color: Papier.green,
                        fontSize: 9,
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  RichTextRenderer(
                    text: currentItem.item.hintText!,
                    style: PapierType.italic(
                      fontSize: 13,
                      color: Papier.ink,
                    ),
                  ),
                ],
              ),
            ),
          ),

        // Hint-used indicator (when hint was opened then closed)
        if (_hintUsed && !_hintVisible && !_showExplanation)
          Padding(
            padding: const EdgeInsets.fromLTRB(22, 4, 22, 0),
            child: Align(
              alignment: AlignmentDirectional.centerStart,
              child: Text(
                '✎ ${AppLocalizations.of(context)!.hint} ${AppLocalizations.of(context)!.hintPenalty}',
                style: PapierType.italic(
                  fontSize: 11,
                  color: Papier.green,
                ),
              ),
            ),
          ),

        // Item content
        Expanded(
          child: _buildItemWidget(currentItem, state),
        ),

        // Explanation panel (shown after answering)
        if (_showExplanation && state.lastResult != null)
          ExplanationPanel(
            isCorrect: state.answers.last.isCorrect,
            result: state.lastResult!,
            item: currentItem.item,
            selectedAnswer: state.answers.last.userAnswer,
            onNext: _onNext,
            onNavigateToLesson: (skillId) {
              context.push('/lesson/$skillId');
            },
          ),
      ],
    );
  }

  Widget _buildItemWidget(SessionItem sessionItem, SessionState state) {
    final item = sessionItem.item;
    final isAnswered = _showExplanation;

    switch (item.itemType) {
      case ItemType.mcq:
        return McqItemWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (selectedIndex) {
            final isCorrect = selectedIndex == item.correctIndex;
            _onAnswer(isCorrect, selectedIndex);
          },
        );
      case ItemType.numeric:
        return NumericItemWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.trueFalse:
        return TrueFalseItemWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (answer) {
            final isCorrect = answer == item.correctAnswer;
            _onAnswer(isCorrect, answer);
          },
        );
      case ItemType.graph:
        return FunctionGraphWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.simulate:
        final simType = item.simType;
        if (simType == 'kinematics' || simType == 'constantVelocity' || simType == 'constantAcceleration' || simType == 'freeFall' || simType == 'projectile') {
          return MotionSimulatorWidget(
            item: item,
            isAnswered: isAnswered,
            onAnswer: (value) {
              final diff = (value - item.correctValue).abs();
              final isCorrect = diff <= item.tolerance;
              _onAnswer(isCorrect, value);
            },
          );
        } else if (simType == 'rcCircuit' || simType == 'rlCircuit' || simType == 'rlcCircuit') {
          return CircuitSimulatorWidget(
            item: item,
            isAnswered: isAnswered,
            onAnswer: (value) {
              final diff = (value - item.correctValue).abs();
              final isCorrect = diff <= item.tolerance;
              _onAnswer(isCorrect, value);
            },
          );
        } else if (simType == 'doubleSlit' || simType == 'diffraction' || simType == 'interference') {
          return WaveSimulatorWidget(
            item: item,
            isAnswered: isAnswered,
            onAnswer: (value) {
              final diff = (value - item.correctValue).abs();
              final isCorrect = diff <= item.tolerance;
              _onAnswer(isCorrect, value);
            },
          );
        } else if (simType == 'newtonsLaws' || simType == 'inclinedPlane' || simType == 'forceDiagram') {
          return ForceDiagramWidget(
            item: item,
            isAnswered: isAnswered,
            onAnswer: (value) {
              final diff = (value - item.correctValue).abs();
              final isCorrect = diff <= item.tolerance;
              _onAnswer(isCorrect, value);
            },
          );
        }
        return MotionSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.dragPoint:
        final graphMode = item.graphMode;
        if (graphMode == 'sequence' || graphMode == 'numberLine') {
          return SequenceVisualizerWidget(
            item: item,
            isAnswered: isAnswered,
            onAnswer: (value) {
              final diff = (value - item.correctValue).abs();
              final isCorrect = diff <= item.tolerance;
              _onAnswer(isCorrect, value);
            },
          );
        } else if (graphMode == 'complexPlane' || graphMode == 'argand') {
          return ComplexPlaneWidget(
            item: item,
            isAnswered: isAnswered,
            onAnswer: (value) {
              final diff = (value - item.correctValue).abs();
              final isCorrect = diff <= item.tolerance;
              _onAnswer(isCorrect, value);
            },
          );
        } else if (graphMode == 'integral' || graphMode == 'areaUnderCurve') {
          return AreaUnderCurveWidget(
            item: item,
            isAnswered: isAnswered,
            onAnswer: (value) {
              final diff = (value - item.correctValue).abs();
              final isCorrect = diff <= item.tolerance;
              _onAnswer(isCorrect, value);
            },
          );
        }
        return SequenceVisualizerWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.adjustSlider:
        return CircuitSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      // --- Math specialized widgets ---
      case ItemType.sequence:
        return SequenceCalculatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.limit:
        return LimitCalculatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.derivative:
        return DerivativeGraphWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.chainRule:
        return ChainRuleVisualizer(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.integration:
        return AreaUnderCurveWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.ipp:
        return IPPCalculatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.complexMult:
        return ComplexMultiplicationWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.diffEq:
        return DiffEqSolverWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.recurrence:
        return RecurrenceSolverWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.system:
        return SystemSolverWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.probability:
        return ProbabilityTreeWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.signTable:
        return SignTableWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );

      // --- Physics specialized widgets ---
      case ItemType.motion:
        return MotionSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.projectile:
        return ProjectileSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.capacitor:
        return CapacitorChargeWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.rlc:
        return RLCSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.refraction:
        return RefractionSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );

      // --- SVT specialized widgets ---
      case ItemType.punnett:
        return PunnettSquareWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.dnaReplication:
        return DNAReplicationWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );
      case ItemType.cellDivision:
        return CellDivisionWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = ((value as num).toDouble() - item.correctValue).abs();
            final isCorrect = diff <= item.tolerance;
            _onAnswer(isCorrect, value);
          },
        );

      // --- Fallback for types without dedicated widgets ---
      // shortText, ordering, fillBlank, matching, multiStep
      default:
        return McqItemWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (selectedIndex) {
            _onAnswer(selectedIndex == item.correctIndex, selectedIndex);
          },
        );
    }
  }

  void _showExitDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Quitter la session ?'),
        content: const Text('Votre progression dans cette session sera sauvegardée.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Continuer'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              ref.read(sessionProvider.notifier).reset();
              context.go('/home');
            },
            child: const Text('Quitter'),
          ),
        ],
      ),
    );
  }
}

/// Tick progress — `total` little serif marks, the first `current` are
/// filled with ink, the rest are pale rule line.
class _TickProgress extends StatelessWidget {
  final int total;
  final int current;
  const _TickProgress({required this.total, required this.current});

  @override
  Widget build(BuildContext context) {
    // Cap visual ticks at 12 to avoid overcrowding on long sessions
    final visualTotal = total.clamp(1, 12);
    final visualCurrent = total > 0
        ? ((current / total) * visualTotal).round().clamp(0, visualTotal)
        : 0;

    return Row(
      children: List.generate(visualTotal, (i) {
        return Expanded(
          child: Container(
            margin: EdgeInsetsDirectional.only(end: i == visualTotal - 1 ? 0 : 4),
            height: 3,
            color: i < visualCurrent ? Papier.ink : Papier.line,
          ),
        );
      }),
    );
  }
}
