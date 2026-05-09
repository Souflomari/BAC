import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/exam.dart';
import '../../models/item.dart';
import '../../providers/exam_provider.dart';
import '../../widgets/rich_text_renderer.dart';
import '../../widgets/mcq_item_widget.dart';
import '../../widgets/numeric_item_widget.dart';
import '../../widgets/true_false_item_widget.dart';
import '../../widgets/math/function_graph_widget.dart';
import '../../widgets/math/sequence_visualizer_widget.dart';
import '../../widgets/math/area_under_curve_widget.dart';
import '../../widgets/math/complex_plane_widget.dart';
import '../../widgets/math/limit_calculator_widget.dart';
import '../../widgets/math/derivative_graph_widget.dart';
import '../../widgets/math/chain_rule_visualizer.dart';
import '../../widgets/math/ipp_calculator_widget.dart';
import '../../widgets/math/complex_multiplication_widget.dart';
import '../../widgets/math/diff_eq_solver_widget.dart';
import '../../widgets/math/sequence_calculator_widget.dart';
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

enum ExamMode { practice, timed }

class ExamPracticeScreen extends ConsumerStatefulWidget {
  final String examId;
  final ExamMode mode;

  const ExamPracticeScreen({
    super.key,
    required this.examId,
    this.mode = ExamMode.practice,
  });

  @override
  ConsumerState<ExamPracticeScreen> createState() => _ExamPracticeScreenState();
}

class _ExamPracticeScreenState extends ConsumerState<ExamPracticeScreen> {
  bool _showExplanation = false;
  final Map<String, dynamic> _answers = {};
  final Set<String> _flagged = {};
  int _currentIndex = 0;
  
  // Timer state
  int _remainingSeconds = 0;
  bool _timerRunning = false;
  
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(examPracticeProvider.notifier).startExam(widget.examId);
      if (widget.mode == ExamMode.timed) {
        _startTimer();
      }
    });
  }
  
  @override
  void dispose() {
    _stopTimer();
    super.dispose();
  }
  
  void _startTimer() {
    final exam = ref.read(examPracticeProvider).exam;
    if (exam != null) {
      _remainingSeconds = exam.durationMinutes * 60;
      _timerRunning = true;
      _runTimer();
    }
  }
  
  void _runTimer() async {
    while (_timerRunning && _remainingSeconds > 0) {
      await Future.delayed(const Duration(seconds: 1));
      if (mounted && _timerRunning) {
        setState(() {
          _remainingSeconds--;
        });
        
        if (_remainingSeconds == 300) { // 5 minutes warning
          _showTimeWarning();
        } else if (_remainingSeconds == 60) { // 1 minute warning
          _showCriticalWarning();
        }
      }
    }
    
    if (_remainingSeconds == 0 && mounted) {
      _showTimeUpDialog();
    }
  }
  
  void _stopTimer() {
    _timerRunning = false;
  }
  
  void _showTimeWarning() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(AppLocalizations.of(context)!.fiveMinutesLeft),
        backgroundColor: Colors.orange,
        duration: const Duration(seconds: 3),
      ),
    );
  }
  
  void _showCriticalWarning() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(AppLocalizations.of(context)!.oneMinuteLeft),
        backgroundColor: Colors.red,
        duration: const Duration(seconds: 3),
      ),
    );
  }
  
  void _showTimeUpDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.timeUpTitle),
        content: Text(AppLocalizations.of(context)!.timeUpBody),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              _submitExam();
            },
            child: Text(AppLocalizations.of(context)!.submit),
          ),
        ],
      ),
    );
  }
  
  String _formatTime(int seconds) {
    final hours = seconds ~/ 3600;
    final minutes = (seconds % 3600) ~/ 60;
    final secs = seconds % 60;
    
    if (hours > 0) {
      return '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
    }
    return '${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }
  
  Color _getTimerColor() {
    if (_remainingSeconds <= 60) return BacPrepColors.error;
    if (_remainingSeconds <= 300) return BacPrepColors.warning;
    return BacPrepColors.textPrimary;
  }

  void _onAnswer(String questionId, dynamic answer, bool isCorrect) {
    setState(() {
      _answers[questionId] = answer;
      _showExplanation = true;
    });
    ref.read(examPracticeProvider.notifier).answerQuestion(questionId, answer, isCorrect);
  }

  void _onNext() {
    final state = ref.read(examPracticeProvider);
    if (_currentIndex < state.questions.length - 1) {
      setState(() {
        _currentIndex++;
        _showExplanation = _answers.containsKey(state.questions[_currentIndex].id);
      });
    }
  }

  void _onPrevious() {
    if (_currentIndex > 0) {
      setState(() {
        _currentIndex--;
        _showExplanation = _answers.containsKey(ref.read(examPracticeProvider).questions[_currentIndex].id);
      });
    }
  }

  Future<void> _submitExam() async {
    final total = ref.read(examPracticeProvider).questions.length;
    final unanswered = total - _answers.length;
    final flaggedCount = _flagged.length;

    final l = AppLocalizations.of(context)!;
    final messageParts = <String>[];
    if (unanswered > 0) {
      messageParts.add(l.unansweredQuestions(unanswered));
    }
    if (flaggedCount > 0) {
      messageParts.add(l.flaggedQuestions(flaggedCount));
    }
    final message = messageParts.isEmpty
        ? l.submitExamConfirm
        : '${messageParts.join(' ')}\n\n${l.submitAnyway}';

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(l.submitExamTitle),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: Text(l.cancel),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: Text(l.submit),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      final progress = await ref.read(examPracticeProvider.notifier).submitExam();
      if (progress != null && mounted) {
        context.pushReplacement('/exams/${widget.examId}/results');
      }
    }
  }

  void _toggleFlag(String questionId) {
    setState(() {
      if (_flagged.contains(questionId)) {
        _flagged.remove(questionId);
      } else {
        _flagged.add(questionId);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(examPracticeProvider);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          tooltip: 'Quitter',
          onPressed: () => _showExitDialog(context),
        ),
        title: state.exam != null
            ? Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('${_currentIndex + 1} / ${state.questions.length}'),
                  if (widget.mode == ExamMode.timed) ...[
                    const SizedBox(width: 16),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: _getTimerColor().withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.timer,
                            size: 16,
                            color: _getTimerColor(),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            _formatTime(_remainingSeconds),
                            style: TextStyle(
                              color: _getTimerColor(),
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              )
            : null,
        centerTitle: true,
        actions: [
          if (state.exam != null)
            TextButton.icon(
              onPressed: _submitExam,
              icon: const Icon(Icons.send, size: 18),
              label: Text(AppLocalizations.of(context)!.submit),
            ),
        ],
        bottom: state.questions.isNotEmpty
            ? PreferredSize(
                preferredSize: const Size.fromHeight(4),
                child: LinearProgressIndicator(
                  value: state.questions.isNotEmpty
                      ? _currentIndex / state.questions.length
                      : 0,
                  backgroundColor: BacPrepColors.surfaceVariant,
                  valueColor: const AlwaysStoppedAnimation(BacPrepColors.primary),
                ),
              )
            : null,
      ),
      body: state.isLoading
          ? const Center(child: CircularProgressIndicator())
          : state.error != null
              ? Center(child: Text(AppLocalizations.of(context)!.error('${state.error}')))
              : _buildBody(state),
      bottomNavigationBar: state.questions.isNotEmpty
          ? _BottomNavBar(
              currentIndex: _currentIndex,
              totalQuestions: state.questions.length,
              questionIds: state.questions.map((q) => q.id).toList(),
              answers: _answers,
              flagged: _flagged,
              onPrevious: _currentIndex > 0 ? _onPrevious : null,
              onNext: _currentIndex < state.questions.length - 1 ? _onNext : null,
              onSubmit: _submitExam,
              onQuestionTap: (index) {
                setState(() {
                  _currentIndex = index;
                  _showExplanation = _answers.containsKey(state.questions[index].id);
                });
              },
            )
          : null,
    );
  }

  Widget _buildBody(ExamPracticeState state) {
    if (state.questions.isEmpty) {
      return Center(child: Text(AppLocalizations.of(context)!.noQuestionsAvailable));
    }

    final currentQuestion = state.questions[_currentIndex];
    final isAnswered = _answers.containsKey(currentQuestion.id);

    return Column(
      children: [
        // Question header
        Padding(
          padding: const EdgeInsets.fromLTRB(Spacing.lg, Spacing.md, Spacing.lg, 0),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.primaryLight.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  'Question ${currentQuestion.questionNumber}${currentQuestion.subquestionLetter != null ? '.${currentQuestion.subquestionLetter}' : ''}',
                  style: const TextStyle(
                    color: BacPrepColors.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.accent.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '${currentQuestion.points} pt${currentQuestion.points > 1 ? 's' : ''}',
                  style: const TextStyle(
                    color: BacPrepColors.accent,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              IconButton(
                icon: Icon(
                  _flagged.contains(currentQuestion.id)
                      ? Icons.flag
                      : Icons.flag_outlined,
                  color: _flagged.contains(currentQuestion.id)
                      ? BacPrepColors.warning
                      : BacPrepColors.textSecondary,
                ),
                onPressed: () => _toggleFlag(currentQuestion.id),
                tooltip: AppLocalizations.of(context)!.flagForReview,
              ),
            ],
          ),
        ),

        // Question content
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(Spacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Question stem
                RichTextRenderer(
                  text: currentQuestion.stem,
                  style: const TextStyle(fontSize: 16, height: 1.6),
                ),
                const SizedBox(height: Spacing.lg),

                // Question input
                _buildQuestionInput(currentQuestion, isAnswered),

                // Explanation (shown after answering)
                if (_showExplanation && isAnswered)
                  _ExplanationPanel(question: currentQuestion),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildQuestionInput(ExamQuestion question, bool isAnswered) {
    final item = _questionToItem(question);
    
    switch (question.itemType) {
      // Basic types
      case ItemType.mcq:
        return _McqInput(
          question: question,
          isAnswered: isAnswered,
          onAnswer: (index) => _onAnswer(question.id, index, index == question.correctIndex),
        );
      case ItemType.numeric:
        return _NumericInput(
          question: question,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - (question.correctValue ?? 0)).abs();
            final isCorrect = diff <= (question.tolerance ?? 0.01);
            _onAnswer(question.id, value, isCorrect);
          },
        );
      case ItemType.trueFalse:
        return _TrueFalseInput(
          question: question,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final correct = question.correctValue != null ? question.correctValue != 0 : true;
            _onAnswer(question.id, value, value == correct);
          },
        );
      
      // Graph/Visual types
      case ItemType.graph:
        return FunctionGraphWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - (question.correctValue ?? 0)).abs();
            final isCorrect = diff <= (question.tolerance ?? 0.01);
            _onAnswer(question.id, value, isCorrect);
          },
        );
      case ItemType.simulate:
        return _buildSimulatorWidget(question, item, isAnswered);
      
      // Math widgets
      case ItemType.sequence:
        return SequenceCalculatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.limit:
        return LimitCalculatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.derivative:
        return DerivativeGraphWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.chainRule:
        return ChainRuleVisualizer(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.integration:
        return AreaUnderCurveWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.ipp:
        return IPPCalculatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.complexMult:
        return ComplexMultiplicationWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.diffEq:
        return DiffEqSolverWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.recurrence:
        return RecurrenceSolverWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.system:
        return SystemSolverWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.probability:
        return ProbabilityTreeWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.signTable:
        return SignTableWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      
      // Physics widgets
      case ItemType.motion:
        return MotionSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.projectile:
        return ProjectileSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.capacitor:
        return CapacitorChargeWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.rlc:
        return RLCSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.refraction:
        return RefractionSimulatorWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      
      // SVT widgets
      case ItemType.punnett:
        return PunnettSquareWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.dnaReplication:
        return DNAReplicationWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      case ItemType.cellDivision:
        return CellDivisionWidget(
          item: item,
          isAnswered: isAnswered,
          onAnswer: (value) => _onAnswer(question.id, value, true),
        );
      
      default:
        return _NumericInput(
          question: question,
          isAnswered: isAnswered,
          onAnswer: (value) {
            final diff = (value - (question.correctValue ?? 0)).abs();
            final isCorrect = diff <= (question.tolerance ?? 0.01);
            _onAnswer(question.id, value, isCorrect);
          },
        );
    }
  }

  Widget _buildSimulatorWidget(ExamQuestion question, Item item, bool isAnswered) {
    final simType = item.simType;
    
    // Route to appropriate simulator based on sim_config.type
    if (simType.contains('projectile') || simType.contains('trajectory')) {
      return ProjectileSimulatorWidget(
        item: item,
        isAnswered: isAnswered,
        onAnswer: (value) => _onAnswer(question.id, value, true),
      );
    } else if (simType.contains('capacitor') || simType.contains('charge')) {
      return CapacitorChargeWidget(
        item: item,
        isAnswered: isAnswered,
        onAnswer: (value) => _onAnswer(question.id, value, true),
      );
    } else if (simType.contains('rlc') || simType.contains('oscillation')) {
      return RLCSimulatorWidget(
        item: item,
        isAnswered: isAnswered,
        onAnswer: (value) => _onAnswer(question.id, value, true),
      );
    } else if (simType.contains('refraction') || simType.contains('optics')) {
      return RefractionSimulatorWidget(
        item: item,
        isAnswered: isAnswered,
        onAnswer: (value) => _onAnswer(question.id, value, true),
      );
    } else if (simType.contains('punnett') || simType.contains('genetics')) {
      return PunnettSquareWidget(
        item: item,
        isAnswered: isAnswered,
        onAnswer: (value) => _onAnswer(question.id, value, true),
      );
    } else if (simType.contains('dna') || simType.contains('replication')) {
      return DNAReplicationWidget(
        item: item,
        isAnswered: isAnswered,
        onAnswer: (value) => _onAnswer(question.id, value, true),
      );
    } else if (simType.contains('cell') || simType.contains('division')) {
      return CellDivisionWidget(
        item: item,
        isAnswered: isAnswered,
        onAnswer: (value) => _onAnswer(question.id, value, true),
      );
    }
    
    // Default to motion simulator
    return MotionSimulatorWidget(
      item: item,
      isAnswered: isAnswered,
      onAnswer: (value) => _onAnswer(question.id, value, true),
    );
  }

  Item _questionToItem(ExamQuestion question) {
    return Item(
      id: question.id,
      skillId: question.skillId ?? '',
      itemType: question.itemType,
      difficultyLevel: question.difficultyLevel,
      question: question.question,
    );
  }

  void _showExitDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.quit),
        content: Text(AppLocalizations.of(context)!.exitExamBody),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text(AppLocalizations.of(context)!.continueSession),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              ref.read(examPracticeProvider.notifier).reset();
              context.go('/home');
            },
            child: Text(AppLocalizations.of(context)!.quit),
          ),
        ],
      ),
    );
  }
}

class _McqInput extends StatefulWidget {
  final ExamQuestion question;
  final bool isAnswered;
  final void Function(int) onAnswer;

  const _McqInput({
    required this.question,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<_McqInput> createState() => _McqInputState();
}

class _McqInputState extends State<_McqInput> {
  int? _selectedIndex;

  @override
  Widget build(BuildContext context) {
    final choices = widget.question.choices;
    final correctIndex = widget.question.correctIndex;

    return Column(
      children: choices.asMap().entries.map((entry) {
        final index = entry.key;
        final choice = entry.value;
        final isSelected = _selectedIndex == index;
        final isCorrect = index == correctIndex;

        Color? bgColor;
        Color? borderColor;
        if (widget.isAnswered) {
          if (isCorrect) {
            bgColor = BacPrepColors.success.withValues(alpha: 0.1);
            borderColor = BacPrepColors.success;
          } else if (isSelected && !isCorrect) {
            bgColor = BacPrepColors.error.withValues(alpha: 0.1);
            borderColor = BacPrepColors.error;
          }
        } else if (isSelected) {
          bgColor = BacPrepColors.primary.withValues(alpha: 0.1);
          borderColor = BacPrepColors.primary;
        }

        return GestureDetector(
          onTap: widget.isAnswered
              ? null
              : () => setState(() {
                    _selectedIndex = index;
                    widget.onAnswer(index);
                  }),
          child: Container(
            margin: const EdgeInsets.only(bottom: Spacing.sm),
            padding: const EdgeInsets.all(Spacing.md),
            decoration: BoxDecoration(
              color: bgColor ?? BacPrepColors.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: borderColor ?? BacPrepColors.border,
                width: isSelected || (widget.isAnswered && isCorrect) ? 2 : 1,
              ),
            ),
            child: Row(
              children: [
                Container(
                  width: 28,
                  height: 28,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isSelected || (widget.isAnswered && isCorrect)
                        ? (borderColor ?? BacPrepColors.primary)
                        : BacPrepColors.surfaceVariant,
                  ),
                  child: Center(
                    child: Text(
                      String.fromCharCode(65 + index),
                      style: TextStyle(
                        color: isSelected || (widget.isAnswered && isCorrect)
                            ? Colors.white
                            : BacPrepColors.textSecondary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: Spacing.md),
                Expanded(
                  child: RichTextRenderer(
                    text: choice,
                    style: const TextStyle(fontSize: 14),
                  ),
                ),
                if (widget.isAnswered && isCorrect)
                  const Icon(Icons.check_circle, color: BacPrepColors.success, size: 20)
                else if (widget.isAnswered && isSelected && !isCorrect)
                  const Icon(Icons.cancel, color: BacPrepColors.error, size: 20),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }
}

class _NumericInput extends StatefulWidget {
  final ExamQuestion question;
  final bool isAnswered;
  final void Function(double) onAnswer;

  const _NumericInput({
    required this.question,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<_NumericInput> createState() => _NumericInputState();
}

class _NumericInputState extends State<_NumericInput> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: _controller,
            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
            enabled: !widget.isAnswered,
            decoration: InputDecoration(
              labelText: AppLocalizations.of(context)!.yourAnswer,
              suffix: widget.question.unit != null
                  ? Text(widget.question.unit!)
                  : null,
              border: const OutlineInputBorder(),
            ),
          ),
        ),
        if (!widget.isAnswered) ...[
          const SizedBox(width: Spacing.md),
          ElevatedButton(
            onPressed: () {
              final value = double.tryParse(_controller.text);
              if (value != null) {
                widget.onAnswer(value);
              }
            },
            child: Text(AppLocalizations.of(context)!.validate),
          ),
        ],
      ],
    );
  }
}

class _TrueFalseInput extends StatefulWidget {
  final ExamQuestion question;
  final bool isAnswered;
  final void Function(bool) onAnswer;

  const _TrueFalseInput({
    required this.question,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<_TrueFalseInput> createState() => _TrueFalseInputState();
}

class _TrueFalseInputState extends State<_TrueFalseInput> {
  bool? _selected;

  @override
  Widget build(BuildContext context) {
    final correct = widget.question.correctValue != 0;
    final isAnswered = widget.isAnswered;

    return Row(
      children: [
        Expanded(
          child: _TFButton(
            label: 'Vrai',
            icon: Icons.check,
            isSelected: _selected == true,
            isCorrect: isAnswered && correct,
            isWrong: isAnswered && _selected == true && !correct,
            onTap: isAnswered ? null : () {
              setState(() => _selected = true);
              widget.onAnswer(true);
            },
          ),
        ),
        const SizedBox(width: Spacing.md),
        Expanded(
          child: _TFButton(
            label: 'Faux',
            icon: Icons.close,
            isSelected: _selected == false,
            isCorrect: isAnswered && !correct,
            isWrong: isAnswered && _selected == false && correct,
            onTap: isAnswered ? null : () {
              setState(() => _selected = false);
              widget.onAnswer(false);
            },
          ),
        ),
      ],
    );
  }
}

class _TFButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool isSelected;
  final bool isCorrect;
  final bool isWrong;
  final VoidCallback? onTap;

  const _TFButton({
    required this.label,
    required this.icon,
    required this.isSelected,
    required this.isCorrect,
    required this.isWrong,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    Color bgColor;
    Color borderColor;
    Color textColor;

    if (isCorrect) {
      bgColor = BacPrepColors.success.withValues(alpha: 0.1);
      borderColor = BacPrepColors.success;
      textColor = BacPrepColors.success;
    } else if (isWrong) {
      bgColor = BacPrepColors.error.withValues(alpha: 0.1);
      borderColor = BacPrepColors.error;
      textColor = BacPrepColors.error;
    } else if (isSelected) {
      bgColor = BacPrepColors.primary.withValues(alpha: 0.1);
      borderColor = BacPrepColors.primary;
      textColor = BacPrepColors.primary;
    } else {
      bgColor = BacPrepColors.surface;
      borderColor = BacPrepColors.border;
      textColor = BacPrepColors.textPrimary;
    }

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: Spacing.lg),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: borderColor, width: isSelected || isCorrect || isWrong ? 2 : 1),
        ),
        child: Column(
          children: [
            Icon(icon, color: textColor, size: 32),
            const SizedBox(height: Spacing.sm),
            Text(label, style: TextStyle(color: textColor, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }
}

class _ExplanationPanel extends StatelessWidget {
  final ExamQuestion question;

  const _ExplanationPanel({required this.question});

  @override
  Widget build(BuildContext context) {
    final answer = question.answer;
    final steps = question.answerSteps;
    final gradingNotes = question.gradingNotes;
    final tips = question.tips;

    return Container(
      margin: const EdgeInsets.only(top: Spacing.lg),
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.primaryLight.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.primary.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.lightbulb_outline, color: BacPrepColors.accent, size: 20),
              const SizedBox(width: Spacing.sm),
              Text(
                AppLocalizations.of(context)!.solution,
                style: const TextStyle(
                  fontWeight: FontWeight.w600,
                  color: BacPrepColors.accent,
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.md),
          if (steps.isNotEmpty) ...[
            ...steps.asMap().entries.map((entry) {
              final index = entry.key;
              final step = entry.value;
              final text = step['text'] as String? ?? '';
              final points = step['points'] as int? ?? 0;

              return Padding(
                padding: const EdgeInsets.only(bottom: Spacing.sm),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 24,
                      height: 24,
                      decoration: BoxDecoration(
                        color: BacPrepColors.primary.withValues(alpha: 0.1),
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Text(
                          '${index + 1}',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: BacPrepColors.primary,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: Spacing.sm),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          RichTextRenderer(text: text, style: const TextStyle(fontSize: 13)),
                          if (points > 0)
                            Text(
                              '($points pt${points > 1 ? 's' : ''})',
                              style: const TextStyle(
                                fontSize: 11,
                                color: BacPrepColors.textSecondary,
                              ),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }),
          ],
          if (gradingNotes.isNotEmpty) ...[
            const SizedBox(height: Spacing.sm),
            const Divider(),
            const SizedBox(height: Spacing.sm),
            Text(
              AppLocalizations.of(context)!.scaleHeader,
              style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12),
            ),
            const SizedBox(height: Spacing.xs),
            RichTextRenderer(
              text: gradingNotes,
              style: const TextStyle(fontSize: 12, color: BacPrepColors.textSecondary),
            ),
          ],
          if (tips.isNotEmpty) ...[
            const SizedBox(height: Spacing.sm),
            const Divider(),
            const SizedBox(height: Spacing.sm),
            Text(
              AppLocalizations.of(context)!.tipsHeader,
              style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12),
            ),
            const SizedBox(height: Spacing.xs),
            ...tips.map((tip) => Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('  • ', style: TextStyle(fontSize: 12)),
                  Expanded(
                    child: Text(tip, style: const TextStyle(fontSize: 12)),
                  ),
                ],
              ),
            )),
          ],
        ],
      ),
    );
  }
}

class _BottomNavBar extends StatelessWidget {
  final int currentIndex;
  final int totalQuestions;
  final List<String> questionIds;
  final Map<String, dynamic> answers;
  final Set<String> flagged;
  final VoidCallback? onPrevious;
  final VoidCallback? onNext;
  final VoidCallback? onSubmit;
  final void Function(int) onQuestionTap;

  const _BottomNavBar({
    required this.currentIndex,
    required this.totalQuestions,
    required this.questionIds,
    required this.answers,
    required this.flagged,
    this.onPrevious,
    this.onNext,
    this.onSubmit,
    required this.onQuestionTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Question grid
            SizedBox(
              height: 44,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: totalQuestions,
                itemBuilder: (context, index) {
                  final questionId = index < questionIds.length ? questionIds[index] : '';
                  final isAnswered = answers.containsKey(questionId);
                  final isFlagged = flagged.contains(questionId);
                  final isCurrent = index == currentIndex;

                  Color bgColor;
                  Color borderColor;

                  if (isCurrent) {
                    bgColor = BacPrepColors.primary;
                    borderColor = BacPrepColors.primary;
                  } else if (isFlagged) {
                    bgColor = BacPrepColors.warning.withValues(alpha: 0.15);
                    borderColor = BacPrepColors.warning;
                  } else if (isAnswered) {
                    bgColor = BacPrepColors.success.withValues(alpha: 0.1);
                    borderColor = BacPrepColors.success;
                  } else {
                    bgColor = BacPrepColors.surface;
                    borderColor = BacPrepColors.border;
                  }

                  return GestureDetector(
                    onTap: () => onQuestionTap(index),
                    child: Container(
                      width: 36,
                      height: 36,
                      margin: const EdgeInsetsDirectional.only(end: 6),
                      decoration: BoxDecoration(
                        color: bgColor,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: borderColor,
                          width: isCurrent ? 2 : 1,
                        ),
                      ),
                      child: Stack(
                        children: [
                          Center(
                            child: Text(
                              '${index + 1}',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: isCurrent
                                    ? Colors.white
                                    : isAnswered
                                        ? BacPrepColors.success
                                        : BacPrepColors.textSecondary,
                              ),
                            ),
                          ),
                          if (isFlagged)
                            Positioned(
                              top: 2,
                              right: 2,
                              child: Container(
                                width: 8,
                                height: 8,
                                decoration: const BoxDecoration(
                                  color: BacPrepColors.warning,
                                  shape: BoxShape.circle,
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: Spacing.md),
            // Navigation buttons
            Row(
              children: [
                if (onPrevious != null)
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: onPrevious,
                      icon: const Icon(Icons.arrow_back, size: 18),
                      label: Text(AppLocalizations.of(context)!.previous),
                    ),
                  )
                else
                  const Expanded(child: SizedBox()),
                const SizedBox(width: Spacing.md),
                if (onNext != null)
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: onNext,
                      icon: const Icon(Icons.arrow_forward, size: 18),
                      label: Text(AppLocalizations.of(context)!.next),
                    ),
                  )
                else
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: onSubmit,
                      icon: const Icon(Icons.check, size: 18),
                      label: Text(AppLocalizations.of(context)!.finish),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: BacPrepColors.success,
                      ),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
