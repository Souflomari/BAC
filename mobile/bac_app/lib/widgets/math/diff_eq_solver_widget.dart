import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class DiffEqSolverWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const DiffEqSolverWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<DiffEqSolverWidget> createState() => _DiffEqSolverWidgetState();
}

class _DiffEqSolverWidgetState extends State<DiffEqSolverWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  int _currentStep = 0;
  bool _showAllSteps = false;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  List<_DiffEqStep> _steps = [];

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
    _initializeSteps();
  }

  void _initializeSteps() {
    final config = widget.item.simConfig;
    final type = config['type'] as String? ?? 'first_order_linear';

    switch (type) {
      case 'first_order_linear':
        _steps = [
          _DiffEqStep(
            title: 'Forme standard',
            content: "L'équation est de la forme: y' + ay = b",
            latex: "y' + 2y = 6",
          ),
          _DiffEqStep(
            title: 'Identifier a et b',
            content: 'a = 2, b = 6',
            latex: r'a = 2,\quad b = 6',
          ),
          _DiffEqStep(
            title: 'Équation homogène',
            content: 'Résoudre y\' + 2y = 0',
            latex: r"y_h = Ce^{-2x}",
          ),
          _DiffEqStep(
            title: 'Solution particulière',
            content: 'Essayer y_p = constante = k',
            latex: r'y_p = k',
          ),
          _DiffEqStep(
            title: 'Substituer',
            content: '0 + 2k = 6 → k = 3',
            latex: r'0 + 2k = 6 \Rightarrow k = 3',
          ),
          _DiffEqStep(
            title: 'Solution générale',
            content: 'y = y_h + y_p',
            latex: r'y = Ce^{-2x} + 3',
          ),
        ];
        break;
      case 'second_order_homogeneous':
        _steps = [
          _DiffEqStep(
            title: 'Équation caractéristique',
            content: 'Écrire l\'équation caractéristique',
            latex: r'r^2 - 5r + 6 = 0',
          ),
          _DiffEqStep(
            title: 'Résoudre',
            content: 'Discriminant: Δ = 25 - 24 = 1',
            latex: r'\Delta = 25 - 24 = 1',
          ),
          _DiffEqStep(
            title: 'Racines',
            content: 'r₁ = 3, r₂ = 2',
            latex: r'r_1 = 3,\quad r_2 = 2',
          ),
          _DiffEqStep(
            title: 'Solution',
            content: 'Deux racines réelles distinctes',
            latex: r'y = C_1e^{3x} + C_2e^{2x}',
          ),
        ];
        break;
      case 'separable':
        _steps = [
          _DiffEqStep(
            title: 'Séparer les variables',
            content: 'dy/dx = xy → dy/y = x dx',
            latex: r'\frac{dy}{dx} = xy \Rightarrow \frac{dy}{y} = x\,dx',
          ),
          _DiffEqStep(
            title: 'Intégrer',
            content: '∫1/y dy = ∫x dx',
            latex: r'\int\frac{1}{y}\,dy = \int x\,dx',
          ),
          _DiffEqStep(
            title: 'Résultats',
            content: 'ln|y| = x²/2 + C',
            latex: r'\ln|y| = \frac{x^2}{2} + C',
          ),
          _DiffEqStep(
            title: 'Solution explicite',
            content: 'y = Ce^(x²/2)',
            latex: r'y = Ce^{x^2/2}',
          ),
        ];
        break;
      default:
        _steps = [
          _DiffEqStep(title: 'Identifier le type', content: '...'),
          _DiffEqStep(title: 'Résoudre', content: '...'),
          _DiffEqStep(title: 'Vérifier', content: '...'),
        ];
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < _steps.length - 1) {
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
    widget.onAnswer(_answerController.text.trim());
  }

  @override
  Widget build(BuildContext context) {
    final config = widget.item.simConfig;
    final equation = config['equation'] as String? ?? "y' + 2y = 6";

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
          _buildEquationDisplay(equation),
          const SizedBox(height: Spacing.md),
          _buildCurrentStep(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildAllSteps(),
          const SizedBox(height: Spacing.lg),
          _buildSolution(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildEquationDisplay(String equation) {
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
            'Résoudre l\'équation différentielle',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: equation,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: BacPrepColors.math,
            ),
          ),
          const SizedBox(height: Spacing.md),
          Container(
            height: 100,
            decoration: BoxDecoration(
              color: BacPrepColors.surface,
              borderRadius: BorderRadius.circular(12),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: CustomPaint(
                size: const Size(double.infinity, 100),
                painter: _DiffEqPainter(
                  currentStep: _currentStep,
                  animationValue: _animation.value,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCurrentStep() {
    if (_currentStep >= _steps.length) return const SizedBox.shrink();

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Opacity(
          opacity: _animation.value,
          child: Transform.translate(
            offset: Offset(0, 20 * (1 - _animation.value)),
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
                      'Étape ${_currentStep + 1}/${_steps.length}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  const SizedBox(height: Spacing.sm),
                  Text(
                    _steps[_currentStep].title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: BacPrepColors.primary,
                    ),
                  ),
                  const SizedBox(height: Spacing.xs),
                  Text(
                    _steps[_currentStep].content,
                    style: TextStyle(
                      fontSize: 14,
                      color: BacPrepColors.textSecondary,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  if (_steps[_currentStep].latex.isNotEmpty) ...[
                    const SizedBox(height: Spacing.sm),
                    RichTextRenderer(
                      text: _steps[_currentStep].latex,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: BacPrepColors.math,
                      ),
                    ),
                  ],
                ],
              ),
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
            '${_currentStep + 1}/${_steps.length}',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.accent,
            ),
          ),
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_forward),
          onPressed: _currentStep < _steps.length - 1 ? _nextStep : null,
        ),
        const SizedBox(width: Spacing.md),
        FilterChip(
          label: const Text('Tout'),
          selected: _showAllSteps,
          onSelected: (v) => setState(() => _showAllSteps = v),
        ),
      ],
    );
  }

  Widget _buildAllSteps() {
    if (!_showAllSteps) return const SizedBox.shrink();

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Toutes les étapes',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          ...List.generate(_steps.length, (i) {
            final isCompleted = i < _currentStep;
            final isActive = i == _currentStep;
            return Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isCompleted
                          ? BacPrepColors.success
                          : isActive
                              ? BacPrepColors.primary
                              : BacPrepColors.textTertiary.withValues(alpha: 0.3),
                    ),
                    child: Center(
                      child: isCompleted
                          ? const Icon(Icons.check, color: Colors.white, size: 14)
                          : Text(
                              '${i + 1}',
                              style: TextStyle(
                                color: isActive ? Colors.white : BacPrepColors.textSecondary,
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                    ),
                  ),
                  const SizedBox(width: Spacing.sm),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _steps[i].title,
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: isActive ? BacPrepColors.primary : BacPrepColors.textPrimary,
                          ),
                        ),
                        Text(
                          _steps[i].content,
                          style: TextStyle(
                            fontSize: 12,
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
      ),
    );
  }

  Widget _buildSolution() {
    final config = widget.item.simConfig;
    final solution = config['solution'] as String? ?? r'y = Ce^{-2x} + 3';

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
          RichTextRenderer(
            text: solution,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: BacPrepColors.success,
            ),
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
            Text(
              'Vérifié ✓',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: BacPrepColors.success,
              ),
            ),
          ],
        ),
      );
    }

    return TextField(
      controller: _answerController,
      decoration: InputDecoration(
        hintText: 'Entrez la solution y(x)',
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      style: const TextStyle(fontSize: 18),
      onSubmitted: (_) => _submit(),
    );
  }
}

class _DiffEqStep {
  final String title;
  final String content;
  final String latex;

  _DiffEqStep({
    required this.title,
    required this.content,
    this.latex = '',
  });
}

class _DiffEqPainter extends CustomPainter {
  final int currentStep;
  final double animationValue;

  _DiffEqPainter({
    required this.currentStep,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = BacPrepColors.math.withValues(alpha: 0.5)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final centerX = size.width / 2;
    final centerY = size.height / 2;

    if (currentStep >= 2) {
      final path = Path();
      path.moveTo(0, centerY);
      for (double x = 0; x < size.width; x += 2) {
        final t = x / size.width * 3;
        final y = centerY - (math.exp(-2 * t) * 30 + 30) * animationValue;
        if (x == 0) {
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
      }
      canvas.drawPath(path, paint..color = BacPrepColors.success.withValues(alpha: 0.5 * animationValue));
    }

    if (currentStep >= 4) {
      paint.color = BacPrepColors.warning.withValues(alpha: animationValue);
      canvas.drawCircle(Offset(centerX, centerY + 30), 8, paint..style = PaintingStyle.fill);
    }
  }

  @override
  bool shouldRepaint(covariant _DiffEqPainter oldDelegate) {
    return currentStep != oldDelegate.currentStep ||
        animationValue != oldDelegate.animationValue;
  }
}
