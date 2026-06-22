import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class LimitCalculatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const LimitCalculatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<LimitCalculatorWidget> createState() => _LimitCalculatorWidgetState();
}

class _LimitCalculatorWidgetState extends State<LimitCalculatorWidget> {
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;
  List<double> _computedValues = [];

  @override
  void initState() {
    super.initState();
    _computeValues();
  }

  void _computeValues() {
    final config = widget.item.simConfig;
    final limitType = config['type'] as String? ?? 'polynomial';

    _computedValues = [];

    switch (limitType) {
      case 'exponential':
        final base = (config['base'] as num?)?.toDouble() ?? math.e;
        for (int n = 1; n <= 10; n++) {
          _computedValues.add(math.pow(base, n.toDouble() * 10) / n);
        }
        break;
      case 'indeterminate_fraction':
        for (int n = 1; n <= 10; n++) {
          final numerator = 2 * n * n + 3 * n;
          final denominator = n * n - n;
          _computedValues.add(numerator / denominator);
        }
        break;
      case 'polynomial':
        for (int n = 1; n <= 10; n++) {
          _computedValues.add((3 * n * n + 2 * n).toDouble());
        }
        break;
      case 'reciprocal':
        for (int n = 1; n <= 10; n++) {
          _computedValues.add(1 / n);
        }
        break;
      default:
        for (int n = 1; n <= 10; n++) {
          _computedValues.add((2 * n + 1) / n);
        }
    }
  }

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_hasSubmitted) return;
    final text = _answerController.text.trim().replaceAll(',', '.').replaceAll('∞', '');
    double? value;
    if (text.toLowerCase() == 'inf' || text == '+' || text == '+infty') {
      value = double.infinity;
    } else if (text == '-' || text == '-infty') {
      value = double.negativeInfinity;
    } else {
      value = double.tryParse(text);
    }
    if (value != null) {
      setState(() => _hasSubmitted = true);
      widget.onAnswer(value);
    }
  }

  @override
  Widget build(BuildContext context) {
    final config = widget.item.simConfig;
    final limitType = config['type'] as String? ?? 'exponential';
    final limitExpr = config['expression'] as String? ?? 'lim_{n→∞} a^n/n';

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
          _buildLimitVisualization(limitExpr, limitType),
          const SizedBox(height: Spacing.md),
          _buildValueTable(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildLimitVisualization(String expr, String type) {
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
            expr,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.math,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Container(
            height: 200,
            decoration: BoxDecoration(
              color: BacPrepColors.surface,
              borderRadius: BorderRadius.circular(12),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: CustomPaint(
                size: const Size(double.infinity, 200),
                painter: _LimitPainter(
                  values: _computedValues,
                  limitType: type,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildValueTable() {
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
            'Valeurs approchées',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            runSpacing: Spacing.xs,
            children: List.generate(_computedValues.length.clamp(0, 8), (i) {
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.surface,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: BacPrepColors.border),
                ),
                child: Text(
                  'n=$i+1: ${_formatValue(_computedValues[i])}',
                  style: const TextStyle(fontSize: 12),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }

  String _formatValue(double v) {
    if (v.isInfinite) return v > 0 ? '+∞' : '-∞';
    if (v.abs() > 1e6) return '${(v / 1e6).toStringAsFixed(1)}M';
    if (v.abs() > 1e3) return '${(v / 1e3).toStringAsFixed(1)}k';
    if (v == v.roundToDouble()) return v.toInt().toString();
    return v.toStringAsFixed(2);
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
              'Limite : ${widget.item.correctValue}',
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
              hintText: 'Valeur de la limite (ex: +∞)',
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

class _LimitPainter extends CustomPainter {
  final List<double> values;
  final String limitType;

  _LimitPainter({required this.values, required this.limitType});

  @override
  void paint(Canvas canvas, Size size) {
    if (values.isEmpty) return;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;
    final linePaint = Paint()
      ..color = BacPrepColors.math
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    final dotPaint = Paint()
      ..color = BacPrepColors.math
      ..style = PaintingStyle.fill;
    final gridPaint = Paint()
      ..color = BacPrepColors.border.withValues(alpha: 0.3)
      ..strokeWidth = 0.5;

    canvas.drawLine(
      Offset(40, size.height - 30),
      Offset(size.width - 10, size.height - 30),
      axisPaint,
    );
    canvas.drawLine(
      Offset(40, size.height - 30),
      Offset(40, 10),
      axisPaint,
    );

    for (int i = 1; i <= 5; i++) {
      final y = size.height - 30 - i * (size.height - 40) / 5;
      canvas.drawLine(Offset(35, y), Offset(45, y), gridPaint);
    }

    final filteredValues = values.where((v) => !v.isInfinite && v.abs() < 1e10).toList();
    if (filteredValues.isEmpty) return;

    final maxVal = filteredValues.reduce((a, b) => a.abs() > b.abs() ? a : b).abs();
    final minVal = filteredValues.reduce((a, b) => a < b ? a : b);
    final range = maxVal - minVal;
    final displayRange = range > 0 ? range * 1.2 : maxVal * 2;

    final stepX = (size.width - 60) / (filteredValues.length - 1).clamp(1, 20);

    final path = Path();
    for (int i = 0; i < filteredValues.length; i++) {
      final x = 50 + i * stepX;
      final normalized = (filteredValues[i] - minVal) / displayRange;
      final y = size.height - 30 - normalized * (size.height - 40);
      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
      canvas.drawCircle(Offset(x, y), 4, dotPaint);
    }
    canvas.drawPath(path, linePaint);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'n',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width - 20, size.height - 25));

    textPainter.text = TextSpan(
      text: 'L(n)',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, const Offset(20, 5));
  }

  @override
  bool shouldRepaint(covariant _LimitPainter oldDelegate) {
    return values != oldDelegate.values;
  }
}
