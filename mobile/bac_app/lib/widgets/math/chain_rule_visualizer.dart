import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class ChainRuleVisualizer extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const ChainRuleVisualizer({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<ChainRuleVisualizer> createState() => _ChainRuleVisualizerState();
}

class _ChainRuleVisualizerState extends State<ChainRuleVisualizer>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  int _currentStep = 0;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  final List<String> _steps = [
    'Identifier u(x)',
    'Identifier v(u)',
    'Calculer u\'(x)',
    'Calculer v\'(u)',
    'Appliquer la formule: f\'(x) = u\'(x) × v\'(u(x))',
  ];

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
    final text = _answerController.text.trim().replaceAll(',', '.');
    final value = double.tryParse(text);
    if (value != null) {
      setState(() => _hasSubmitted = true);
      widget.onAnswer(value);
    }
  }

  @override
  Widget build(BuildContext context) {
    final config = widget.item.simConfig;
    final outerFunc = config['outer'] as String? ?? 'u²';
    final innerFunc = config['inner'] as String? ?? '2x+1';
    final outerPrime = config['outer_prime'] as String? ?? '2u';
    final innerPrime = config['inner_prime'] as String? ?? '2';
    final finalResult = config['result'] as String? ?? '4x(2x+1)³';

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
          _buildCompositionVisual(outerFunc, innerFunc),
          const SizedBox(height: Spacing.md),
          _buildSteps(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildResult(outerPrime, innerPrime, finalResult),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildCompositionVisual(String outer, String inner) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: Column(
        children: [
          Text(
            'Composition de fonctions',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.md),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _FunctionBox(label: 'v(u)', expr: outer, color: BacPrepColors.primary),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: Spacing.sm),
                child: Icon(Icons.compress, color: BacPrepColors.textTertiary),
              ),
              _FunctionBox(label: 'u(x)', expr: inner, color: BacPrepColors.warning),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: Spacing.sm),
                child: Icon(Icons.arrow_forward, color: BacPrepColors.textTertiary),
              ),
              _FunctionBox(label: 'x', expr: 'x', color: BacPrepColors.success),
            ],
          ),
          const SizedBox(height: Spacing.md),
          Container(
            height: 180,
            decoration: BoxDecoration(
              color: BacPrepColors.surfaceVariant,
              borderRadius: BorderRadius.circular(12),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: AnimatedBuilder(
                animation: _animation,
                builder: (context, child) {
                  return CustomPaint(
                    size: const Size(double.infinity, 180),
                    painter: _CompositionPainter(
                      currentStep: _currentStep,
                      animationValue: _animation.value,
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSteps() {
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
            'Étapes de résolution',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          ...List.generate(_steps.length, (i) {
            final isActive = i == _currentStep;
            final isCompleted = i < _currentStep;
            return AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              margin: const EdgeInsets.symmetric(vertical: 4),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: isActive
                    ? BacPrepColors.primary.withValues(alpha: 0.15)
                    : isCompleted
                        ? BacPrepColors.success.withValues(alpha: 0.08)
                        : BacPrepColors.surface,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: isActive
                      ? BacPrepColors.primary
                      : isCompleted
                          ? BacPrepColors.success.withValues(alpha: 0.5)
                          : BacPrepColors.border,
                  width: isActive ? 2 : 1,
                ),
              ),
              child: Row(
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
                          ? const Icon(Icons.check, color: Colors.white, size: 16)
                          : Text(
                              '${i + 1}',
                              style: TextStyle(
                                color: isActive ? Colors.white : BacPrepColors.textSecondary,
                                fontWeight: FontWeight.w600,
                                fontSize: 12,
                              ),
                            ),
                    ),
                  ),
                  const SizedBox(width: Spacing.sm),
                  Expanded(
                    child: Text(
                      _steps[i],
                      style: TextStyle(
                        color: isActive
                            ? BacPrepColors.primary
                            : isCompleted
                                ? BacPrepColors.success
                                : BacPrepColors.textSecondary,
                        fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                      ),
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
          tooltip: 'Étape précédente',
        ),
        const SizedBox(width: Spacing.sm),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: BacPrepColors.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            'Étape ${_currentStep + 1}/${_steps.length}',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.primary,
            ),
          ),
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_forward),
          onPressed: _currentStep < _steps.length - 1 ? _nextStep : null,
          tooltip: 'Étape suivante',
        ),
      ],
    );
  }

  Widget _buildResult(String outerPrime, String innerPrime, String result) {
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
            'Application de la règle de la chaîne',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: "[$outerPrime] × [$innerPrime]",
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.warning,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          const Icon(Icons.expand_more, color: BacPrepColors.textTertiary),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: result,
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
              'Dérivée : ${widget.item.correctValue}',
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

    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: _answerController,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            decoration: InputDecoration(
              hintText: 'Votre réponse',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
            textAlign: TextAlign.center,
            onSubmitted: (_) => _submit(),
          ),
        ),
        const SizedBox(width: Spacing.md),
        ElevatedButton(
          onPressed: _submit,
          child: const Text('Valider'),
        ),
      ],
    );
  }
}

class _FunctionBox extends StatelessWidget {
  final String label;
  final String expr;
  final Color color;

  const _FunctionBox({
    required this.label,
    required this.expr,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: color,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 4),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: color.withValues(alpha: 0.5)),
          ),
          child: Text(
            expr,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ),
      ],
    );
  }
}

class _CompositionPainter extends CustomPainter {
  final int currentStep;
  final double animationValue;

  _CompositionPainter({
    required this.currentStep,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height / 2;

    final stepPaint = Paint()
      ..color = BacPrepColors.primary.withValues(alpha: 0.8)
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final dotPaint = Paint()
      ..color = BacPrepColors.warning
      ..style = PaintingStyle.fill;

    if (currentStep >= 0) {
      final path = Path();
      path.moveTo(centerX - 80, centerY);
      path.quadraticBezierTo(centerX - 40, centerY - 50 * animationValue, centerX, centerY - 30 * animationValue);
      path.quadraticBezierTo(centerX + 40, centerY - 10 * animationValue, centerX + 80, centerY);
      canvas.drawPath(path, stepPaint);
      canvas.drawCircle(Offset(centerX - 80, centerY), 6, dotPaint);
      canvas.drawCircle(Offset(centerX + 80, centerY), 6, dotPaint);
    }

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    if (currentStep >= 1) {
      textPainter.text = TextSpan(
        text: 'u(x)',
        style: TextStyle(
          color: BacPrepColors.warning.withValues(alpha: animationValue),
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(centerX - 30, centerY - 55 * animationValue));
    }

    if (currentStep >= 2) {
      textPainter.text = TextSpan(
        text: 'v(u)',
        style: TextStyle(
          color: BacPrepColors.primary.withValues(alpha: animationValue),
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(centerX - 30, centerY + 35));
    }
  }

  @override
  bool shouldRepaint(covariant _CompositionPainter oldDelegate) {
    return currentStep != oldDelegate.currentStep ||
        animationValue != oldDelegate.animationValue;
  }
}
