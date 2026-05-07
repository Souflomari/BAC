import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class SystemSolverWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const SystemSolverWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<SystemSolverWidget> createState() => _SystemSolverWidgetState();
}

class _SystemSolverWidgetState extends State<SystemSolverWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  int _currentStep = 0;
  bool _showSolution = false;

  double _a1 = 2, _b1 = 1, _c1 = 8;
  double _a2 = 1, _b2 = -1, _c2 = 2;

  final _answerXController = TextEditingController();
  final _answerYController = TextEditingController();
  bool _hasSubmitted = false;

  List<String> _methodSteps = [];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
    _updateMethodSteps();
  }

  void _updateMethodSteps() {
    _methodSteps = [
      'Équation 1: ${_a1.toStringAsFixed(0)}x + ${_b1.toStringAsFixed(0)}y = ${_c1.toStringAsFixed(0)}',
      'Équation 2: ${_a2.toStringAsFixed(0)}x + ${_b2.toStringAsFixed(0)}y = ${_c2.toStringAsFixed(0)}',
      'Substitution: x = (${_c1.toStringAsFixed(0)} - ${_b1.toStringAsFixed(0)}y) / ${_a1.toStringAsFixed(0)}',
      'Substituer dans Eq2...',
      'Résoudre pour y...',
      'y = ${_solveY().toStringAsFixed(2)}',
      'Substituer y dans Eq1...',
      'x = ${_solveX().toStringAsFixed(2)}',
    ];
  }

  double _solveX() {
    final det = _a1 * _b2 - _a2 * _b1;
    if (det == 0) return 0;
    return (_c1 * _b2 - _c2 * _b1) / det;
  }

  double _solveY() {
    final det = _a1 * _b2 - _a2 * _b1;
    if (det == 0) return 0;
    return (_a1 * _c2 - _a2 * _c1) / det;
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerXController.dispose();
    _answerYController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < _methodSteps.length - 1) {
      setState(() => _currentStep++);
      _controller.forward(from: 0);
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
      _controller.forward(from: 0);
    }
  }

  void _reset() {
    setState(() => _currentStep = 0);
    _controller.reset();
  }

  void _submit() {
    if (_hasSubmitted) return;
    setState(() => _hasSubmitted = true);
    widget.onAnswer('x=${_solveX().toStringAsFixed(1)}, y=${_solveY().toStringAsFixed(1)}');
  }

  @override
  Widget build(BuildContext context) {
    _updateMethodSteps();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(Spacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          RichTextRenderer(
            text: widget.item.stem,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontSize: 18,
              height: 1.5,
            ),
          ),
          const SizedBox(height: Spacing.md),
          FigureWidget(figure: widget.item.questionFigure),
          const SizedBox(height: Spacing.lg),
          _buildSystemDisplay(),
          const SizedBox(height: Spacing.md),
          _buildGraphicalVisualization(),
          const SizedBox(height: Spacing.md),
          _buildCurrentStep(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.lg),
          _buildSolution(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildSystemDisplay() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.math.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.math.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            'Système d\'équations',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: '${_a1.toStringAsFixed(0)}x + ${_b1.toStringAsFixed(0)}y = ${_c1.toStringAsFixed(0)}',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.primary,
            ),
          ),
          const SizedBox(height: Spacing.xs),
          RichTextRenderer(
            text: '${_a2.toStringAsFixed(0)}x + ${_b2.toStringAsFixed(0)}y = ${_c2.toStringAsFixed(0)}',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.warning,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGraphicalVisualization() {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return CustomPaint(
              size: const Size(double.infinity, 200),
              painter: _SystemPainter(
                a1: _a1, b1: _b1, c1: _c1,
                a2: _a2, b2: _b2, c2: _c2,
                solutionX: _solveX(),
                solutionY: _solveY(),
                showSolution: _showSolution,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildCurrentStep() {
    if (_currentStep >= _methodSteps.length) return const SizedBox.shrink();

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Opacity(
          opacity: _animation.value,
          child: Container(
            padding: const EdgeInsets.all(Spacing.md),
            decoration: BoxDecoration(
              color: BacPrepColors.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: BacPrepColors.primary.withValues(alpha: 0.3)),
            ),
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: BacPrepColors.primary,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    'Étape ${_currentStep + 1}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(height: Spacing.sm),
                Text(
                  _methodSteps[_currentStep],
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.primary,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton.filled(
          icon: const Icon(Icons.refresh),
          onPressed: _reset,
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_back),
          onPressed: _currentStep > 0 ? _prevStep : null,
        ),
        const SizedBox(width: Spacing.sm),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: BacPrepColors.accent.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            '${_currentStep + 1}/${_methodSteps.length}',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.accent,
            ),
          ),
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_forward),
          onPressed: _currentStep < _methodSteps.length - 1 ? _nextStep : null,
        ),
        const SizedBox(width: Spacing.md),
        FilterChip(
          label: const Text('Solution'),
          selected: _showSolution,
          onSelected: (v) => setState(() {
            _showSolution = v;
            _controller.forward(from: 0);
          }),
        ),
      ],
    );
  }

  Widget _buildSolution() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.success.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.success.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            'Solution',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              RichTextRenderer(
                text: 'x = ${_solveX().toStringAsFixed(2)}',
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  color: BacPrepColors.primary,
                ),
              ),
              const SizedBox(width: Spacing.lg),
              RichTextRenderer(
                text: 'y = ${_solveY().toStringAsFixed(2)}',
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  color: BacPrepColors.warning,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAnswerInput() {
    if (widget.isAnswered || _hasSubmitted) {
      return Container(
        padding: const EdgeInsets.all(Spacing.md),
        decoration: BoxDecoration(
          color: BacPrepColors.success.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: BacPrepColors.success.withValues(alpha: 0.3)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.check, color: BacPrepColors.success),
            const SizedBox(width: Spacing.sm),
            const Text(
              'Vérifié ✓',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: BacPrepColors.success,
              ),
            ),
          ],
        ),
      );
    }

    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: _answerXController,
            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
            decoration: InputDecoration(
              labelText: 'x',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 18),
            onSubmitted: (_) => _submit(),
          ),
        ),
        const SizedBox(width: Spacing.md),
        Expanded(
          child: TextField(
            controller: _answerYController,
            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
            decoration: InputDecoration(
              labelText: 'y',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 18),
            onSubmitted: (_) => _submit(),
          ),
        ),
        const SizedBox(width: Spacing.md),
        ElevatedButton(
          onPressed: _submit,
          child: const Text('Vérifier'),
        ),
      ],
    );
  }
}

class _SystemPainter extends CustomPainter {
  final double a1, b1, c1;
  final double a2, b2, c2;
  final double solutionX;
  final double solutionY;
  final bool showSolution;
  final double animationValue;

  _SystemPainter({
    required this.a1, required this.b1, required this.c1,
    required this.a2, required this.b2, required this.c2,
    required this.solutionX, required this.solutionY,
    required this.showSolution, required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final scale = size.width / 20;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;
    canvas.drawLine(Offset(0, centerY), Offset(size.width, centerY), axisPaint);
    canvas.drawLine(Offset(centerX, 0), Offset(centerX, size.height), axisPaint);

    final line1Paint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    final line2Paint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    final path1 = Path();
    final path2 = Path();
    bool first1 = true, first2 = true;

    for (double x = -10; x <= 10; x += 0.1) {
      if (b1 != 0) {
        final y = (c1 - a1 * x) / b1;
        if (y >= -10 && y <= 10) {
          final px = centerX + x * scale;
          final py = centerY - y * scale;
          if (first1) {
            path1.moveTo(px, py);
            first1 = false;
          } else {
            path1.lineTo(px, py);
          }
        }
      }
      if (b2 != 0) {
        final y = (c2 - a2 * x) / b2;
        if (y >= -10 && y <= 10) {
          final px = centerX + x * scale;
          final py = centerY - y * scale;
          if (first2) {
            path2.moveTo(px, py);
            first2 = false;
          } else {
            path2.lineTo(px, py);
          }
        }
      }
    }

    canvas.drawPath(path1, line1Paint);
    canvas.drawPath(path2, line2Paint);

    if (showSolution) {
      final solutionXPos = centerX + solutionX * scale * animationValue;
      final solutionYPos = centerY - solutionY * scale * animationValue;

      final dotPaint = Paint()
        ..color = BacPrepColors.success
        ..style = PaintingStyle.fill;

      canvas.drawCircle(Offset(solutionXPos, solutionYPos), 10, dotPaint);

      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: '(${solutionX.toStringAsFixed(1)}, ${solutionY.toStringAsFixed(1)})',
        style: const TextStyle(
          color: BacPrepColors.success,
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(solutionXPos + 15, solutionYPos - 20));
    }
  }

  @override
  bool shouldRepaint(covariant _SystemPainter oldDelegate) {
    return showSolution != oldDelegate.showSolution ||
        animationValue != oldDelegate.animationValue;
  }
}
