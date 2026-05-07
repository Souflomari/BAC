import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class IPPCalculatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const IPPCalculatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<IPPCalculatorWidget> createState() => _IPPCalculatorWidgetState();
}

class _IPPCalculatorWidgetState extends State<IPPCalculatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  int _currentStep = 0;
  bool _showAllSteps = false;
  List<String> _steps = [];
  List<String> _explanations = [];

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 600),
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
    final type = config['type'] as String? ?? 'polynomial';

    switch (type) {
      case 'polynomial':
        _steps = [
          'Identifier u et dv',
          'u = x, dv = eˣ dx',
          'Calculer du et v',
          'du = dx, v = eˣ',
          'Appliquer IPP',
          '∫xeˣdx = xeˣ - ∫eˣdx',
          'Calculer l\'intégrale restante',
          '∫eˣdx = eˣ',
          'Écrire le résultat',
          '∫xeˣdx = eˣ(x - 1) + C',
        ];
        _explanations = [
          'On cherche à intégrer un produit de x et eˣ.',
          'Pour IPP, on pose u = x (polynôme simple) et dv = eˣdx.',
          'd(u) = du = dx, et v = ∫dv = ∫eˣdx = eˣ.',
          'La formule d\'IPP: ∫u dv = uv - ∫v du',
          'En substituant: ∫xeˣdx = x·eˣ - ∫eˣdx',
          'Il reste à calculer ∫eˣdx, qui est simplement eˣ.',
          'En remettant tout ensemble: ∫xeˣdx = xeˣ - eˣ',
          'Factoriser: ∫xeˣdx = eˣ(x - 1) + C',
        ];
        break;
      case 'trigonometric':
        _steps = [
          'Identifier u et dv',
          'u = x², dv = sin(x)dx',
          'Calculer du et v',
          'du = 2x dx, v = -cos(x)',
          'Appliquer IPP (1ère fois)',
          '∫x²sin(x)dx = -x²cos(x) + 2∫xcos(x)dx',
          'Appliquer IPP (2ème fois)',
          '∫xcos(x)dx = xsin(x) + cos(x)',
          'Assembler le résultat',
          '∫x²sin(x)dx = -x²cos(x) + 2xsin(x) + 2cos(x) + C',
        ];
        _explanations = [
          'L\'exposant de x est 2, donc IPP 2 fois.',
          'u = polynôme, dv = fonction trigonométrique.',
          'du = 2x dx, v = ∫sin(x)dx = -cos(x).',
          'IPP: ∫u dv = uv - ∫v du.',
          'Première application donne: -x²cos(x) + 2∫xcos(x)dx.',
          'Pour ∫xcos(x)dx,新一轮 IPP avec u=x, dv=cos(x)dx.',
          'Deuxième IPP donne: xsin(x) + cos(x).',
          'Assembler: -x²cos(x) + 2[xsin(x) + cos(x)] + C.',
        ];
        break;
      case 'ln':
        _steps = [
          'Identifier u et dv',
          'u = ln(x), dv = dx',
          'Calculer du et v',
          'du = 1/x dx, v = x',
          'Appliquer IPP',
          '∫ln(x)dx = xln(x) - ∫x·(1/x)dx',
          'Simplifier',
          '∫ln(x)dx = xln(x) - ∫dx',
          'Résultat final',
          '∫ln(x)dx = xln(x) - x + C',
        ];
        _explanations = [
          'ln(x) nécessite IPP pour disparaître de l\'intégrande.',
          'On pose u = ln(x), dv = dx.',
          'du = 1/x dx, v = x.',
          'IPP: ∫u dv = uv - ∫v du.',
          '∫ln(x)dx = x·ln(x) - ∫x·(1/x)dx = xln(x) - ∫1dx.',
          '∫1dx est simplement x.',
          'Le résultat est: xln(x) - x + C.',
        ];
        break;
      default:
        _steps = [
          'Identifier u et dv',
          'Appliquer IPP',
          'Calculer',
          'Résultat',
        ];
        _explanations = ['...', '...', '...', '...'];
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
    final text = _answerController.text.trim();
    setState(() => _hasSubmitted = true);
    widget.onAnswer(text);
  }

  @override
  Widget build(BuildContext context) {
    final config = widget.item.simConfig;
    final integral = config['integral'] as String? ?? '∫xeˣdx';

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
          _buildIntegralVisual(integral),
          const SizedBox(height: Spacing.md),
          _buildCurrentStep(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.lg),
          _buildAllSteps(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildIntegralVisual(String integral) {
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
            'Calculer',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: integral,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w700,
              color: BacPrepColors.math,
            ),
          ),
          const SizedBox(height: Spacing.md),
          Container(
            height: 120,
            decoration: BoxDecoration(
              color: BacPrepColors.surface,
              borderRadius: BorderRadius.circular(12),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: CustomPaint(
                size: const Size(double.infinity, 120),
                painter: _IPPPainter(
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
            offset: Offset(0, 10 * (1 - _animation.value)),
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
                      'Étape ${(_currentStep ~/ 2) + 1}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  const SizedBox(height: Spacing.sm),
                  Text(
                    _steps[_currentStep],
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: BacPrepColors.primary,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  if (_currentStep < _explanations.length) ...[
                    const SizedBox(height: Spacing.sm),
                    Text(
                      _explanations[_currentStep],
                      style: TextStyle(
                        fontSize: 14,
                        color: BacPrepColors.textSecondary,
                        fontStyle: FontStyle.italic,
                      ),
                      textAlign: TextAlign.center,
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
          tooltip: 'Recommencer',
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
            '${(_currentStep ~/ 2) + 1}/${(_steps.length / 2).ceil()}',
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
          ...List.generate(_steps.length ~/ 2, (i) {
            final stepIdx = i * 2;
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
                      color: i <= (_currentStep ~/ 2) ? BacPrepColors.success : BacPrepColors.textTertiary.withValues(alpha: 0.3),
                    ),
                    child: Center(
                      child: i < (_currentStep ~/ 2)
                          ? const Icon(Icons.check, color: Colors.white, size: 14)
                          : Text(
                              '${i + 1}',
                              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600),
                            ),
                    ),
                  ),
                  const SizedBox(width: Spacing.sm),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _steps[stepIdx],
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: i == (_currentStep ~/ 2) ? BacPrepColors.primary : BacPrepColors.textPrimary,
                          ),
                        ),
                        Text(
                          _steps[stepIdx + 1],
                          style: TextStyle(
                            color: BacPrepColors.textSecondary,
                            fontStyle: FontStyle.italic,
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
            Flexible(
              child: Text(
                'Réponse : ${widget.item.correctValue}',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: BacPrepColors.success,
                ),
              ),
            ),
          ],
        ),
      );
    }

    return TextField(
      controller: _answerController,
      decoration: InputDecoration(
        hintText: 'Entrez la primitive (ex: eˣ(x-1) + C)',
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      style: const TextStyle(fontSize: 18),
      onSubmitted: (_) => _submit(),
    );
  }
}

class _IPPPainter extends CustomPainter {
  final int currentStep;
  final double animationValue;

  _IPPPainter({
    required this.currentStep,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = BacPrepColors.primary.withValues(alpha: 0.5)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final textPainter = TextPainter(textDirection: TextDirection.ltr);

    if (currentStep >= 2) {
      textPainter.text = TextSpan(
        text: 'u',
        style: TextStyle(
          color: BacPrepColors.warning.withValues(alpha: animationValue),
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(size.width * 0.2, size.height * 0.3));
    }

    if (currentStep >= 4) {
      textPainter.text = TextSpan(
        text: 'dv',
        style: TextStyle(
          color: BacPrepColors.success.withValues(alpha: animationValue),
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(size.width * 0.6, size.height * 0.3));
    }

    if (currentStep >= 6) {
      textPainter.text = TextSpan(
        text: '→',
        style: TextStyle(
          color: BacPrepColors.textSecondary,
          fontSize: 24,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(size.width * 0.45, size.height * 0.4));
    }

    if (currentStep >= 8) {
      paint.color = BacPrepColors.success.withValues(alpha: animationValue);
      paint.strokeWidth = 3;
      canvas.drawLine(
        Offset(size.width * 0.1, size.height * 0.7),
        Offset(size.width * 0.9, size.height * 0.7),
        paint,
      );
      textPainter.text = TextSpan(
        text: 'F(x) + C',
        style: TextStyle(
          color: BacPrepColors.success.withValues(alpha: animationValue),
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(size.width * 0.35, size.height * 0.75));
    }
  }

  @override
  bool shouldRepaint(covariant _IPPPainter oldDelegate) {
    return currentStep != oldDelegate.currentStep ||
        animationValue != oldDelegate.animationValue;
  }
}
