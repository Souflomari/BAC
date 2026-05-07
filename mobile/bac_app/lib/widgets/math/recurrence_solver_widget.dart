import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class RecurrenceSolverWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const RecurrenceSolverWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<RecurrenceSolverWidget> createState() => _RecurrenceSolverWidgetState();
}

class _RecurrenceSolverWidgetState extends State<RecurrenceSolverWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  int _currentStep = 0;
  int _nValue = 1;
  List<int> _computedValues = [];

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  final List<String> _explanationSteps = [
    'Identifier la forme de récurrence',
    'C\'est une récurrence linéaire du premier ordre: Uₙ₊₁ = aUₙ + b',
    'Trouver la solution homogène',
    'Uₙ^(h) = C × aⁿ',
    'Trouver une solution particulière',
    'Uₙ^(p) = constante = b/(1-a) si a ≠ 1',
    'Écrire la solution générale',
    'Uₙ = C × aⁿ + b/(1-a)',
    'Utiliser la condition initiale',
    'U₁ = C × a + b/(1-a) → C = ...',
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
    _computeValues();
  }

  void _computeValues() {
    _computedValues = [1];
    for (int i = 1; i <= 20; i++) {
      _computedValues.add(_computedValues[i - 1] * 2 + 3);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < _explanationSteps.length - 1) {
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
    final value = int.tryParse(text);
    if (value != null) {
      setState(() => _hasSubmitted = true);
      widget.onAnswer(value);
    }
  }

  int _computeUn(int n) {
    return _computedValues[n - 1];
  }

  @override
  Widget build(BuildContext context) {
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
          _buildRecurrenceVisual(),
          const SizedBox(height: Spacing.md),
          _buildValueSlider(),
          const SizedBox(height: Spacing.md),
          _buildExplanation(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildRecurrenceVisual() {
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
            'Récurrence',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: 'U₀ = 1, Uₙ₊₁ = 2Uₙ + 3',
            style: const TextStyle(
              fontSize: 24,
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
                painter: _RecurrencePainter(
                  nValue: _nValue,
                  animationValue: _animation.value,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildValueSlider() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Calculer Uₙ',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: BacPrepColors.textSecondary,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  'n = $_nValue',
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.primary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              Expanded(
                child: Slider(
                  value: _nValue.toDouble(),
                  min: 0,
                  max: 10,
                  divisions: 10,
                  label: _nValue.toString(),
                  onChanged: (v) => setState(() {
                    _nValue = v.toInt();
                    _controller.forward(from: 0);
                  }),
                ),
              ),
              const SizedBox(width: Spacing.md),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: BacPrepColors.success.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: BacPrepColors.success.withValues(alpha: 0.3)),
                ),
                child: Text(
                  'U$_nValue = ${_computeUn(_nValue)}',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: BacPrepColors.success,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildExplanation() {
    if (_currentStep >= _explanationSteps.length) return const SizedBox.shrink();

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
                  _explanationSteps[_currentStep],
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
            '${(_currentStep ~/ 2) + 1}/${(_explanationSteps.length / 2).ceil()}',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.accent,
            ),
          ),
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_forward),
          onPressed: _currentStep < _explanationSteps.length - 1 ? _nextStep : null,
        ),
      ],
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
              'U₁₀ = ${widget.item.correctValue}',
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
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              hintText: 'Calculer U₁₀',
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

class _RecurrencePainter extends CustomPainter {
  final int nValue;
  final double animationValue;

  _RecurrencePainter({
    required this.nValue,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerY = size.height / 2;
    final stepX = size.width / 8;

    final nodePaint = Paint()
      ..color = BacPrepColors.primary
      ..style = PaintingStyle.fill;

    final arrowPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    for (int i = 0; i <= nValue.clamp(0, 6); i++) {
      final x = 20 + i * stepX;
      final radius = 16.0 * animationValue;

      if (i == nValue.clamp(0, 6)) {
        nodePaint.color = BacPrepColors.success;
      } else {
        nodePaint.color = BacPrepColors.primary.withValues(alpha: 0.5);
      }

      canvas.drawCircle(Offset(x, centerY), radius, nodePaint);

      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: 'U$i',
        style: TextStyle(
          color: i == nValue.clamp(0, 6) ? Colors.white : BacPrepColors.textSecondary,
          fontSize: 10,
          fontWeight: FontWeight.w600,
        ),
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        Offset(x - textPainter.width / 2, centerY - textPainter.height / 2),
      );

      if (i < nValue.clamp(0, 6)) {
        final arrowPath = Path();
        arrowPath.moveTo(x + 18, centerY);
        arrowPath.lineTo(x + stepX - 18, centerY);
        arrowPath.moveTo(x + stepX - 24, centerY - 6);
        arrowPath.lineTo(x + stepX - 18, centerY);
        arrowPath.lineTo(x + stepX - 24, centerY + 6);
        canvas.drawPath(arrowPath, arrowPaint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant _RecurrencePainter oldDelegate) {
    return nValue != oldDelegate.nValue || animationValue != oldDelegate.animationValue;
  }
}
