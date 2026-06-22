import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class DerivativeGraphWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const DerivativeGraphWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<DerivativeGraphWidget> createState() => _DerivativeGraphWidgetState();
}

class _DerivativeGraphWidgetState extends State<DerivativeGraphWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _showTangentAt = 0;
  bool _showDerivative = false;
  bool _showTangent = true;
  bool _showPoints = true;
  bool _showAxis = true;

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
    final config = widget.item.simConfig;
    _showTangentAt = (config['show_tangent_at'] as num?)?.toDouble() ?? 0;
    _showDerivative = config['show_derivative'] as bool? ?? false;
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double _function(double x) {
    return x * x - 4;
  }

  double _derivative(double x) {
    return 2 * x;
  }

  double _tangent(double x, double x0) {
    return _derivative(x0) * (x - x0) + _function(x0);
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
          _buildGraph(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildInfoPanel(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildGraph() {
    return Container(
      height: 300,
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
              size: const Size(double.infinity, 300),
              painter: _DerivativeGraphPainter(
                function: _function,
                derivative: _derivative,
                tangent: _tangent,
                showTangentAt: _showTangentAt,
                showDerivative: _showDerivative,
                showTangent: _showTangent,
                showPoints: _showPoints,
                showAxis: _showAxis,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildControls() {
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
            'Paramètres',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              const Text('Point pour tangente:', style: TextStyle(fontSize: 14)),
              Expanded(
                child: Slider(
                  value: _showTangentAt,
                  min: -5,
                  max: 5,
                  divisions: 20,
                  label: _showTangentAt.toStringAsFixed(1),
                  onChanged: (v) => setState(() => _showTangentAt = v),
                ),
              ),
              SizedBox(
                width: 50,
                child: Text(
                  _showTangentAt.toStringAsFixed(1),
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Tangente'),
                selected: _showTangent,
                onSelected: (v) => setState(() => _showTangent = v),
              ),
              FilterChip(
                label: const Text('f\'(x)'),
                selected: _showDerivative,
                onSelected: (v) => setState(() {
                  _showDerivative = v;
                  _controller.forward(from: 0);
                }),
              ),
              FilterChip(
                label: const Text('Points'),
                selected: _showPoints,
                onSelected: (v) => setState(() => _showPoints = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildInfoPanel() {
    final fx = _function(_showTangentAt);
    final fpx = _derivative(_showTangentAt);

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.math.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.math.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _InfoItem(
                label: 'f(x₀)',
                value: '(${_showTangentAt.toStringAsFixed(1)}, ${fx.toStringAsFixed(1)})',
                color: BacPrepColors.primary,
              ),
              _InfoItem(
                label: "f'(x₀)",
                value: fpx.toStringAsFixed(1),
                color: BacPrepColors.warning,
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Text(
            "Équation: y = ${fpx.toStringAsFixed(1)}(x - ${_showTangentAt.toStringAsFixed(1)}) + ${fx.toStringAsFixed(1)}",
            style: TextStyle(
              fontSize: 14,
              color: BacPrepColors.textSecondary,
              fontStyle: FontStyle.italic,
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
              'f\'(${_showTangentAt.toStringAsFixed(1)}) = ${widget.item.correctValue}',
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
            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
            decoration: InputDecoration(
              hintText: "Valeur de f'(x₀)",
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

class _InfoItem extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _InfoItem({
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(label, style: TextStyle(fontSize: 12, color: BacPrepColors.textSecondary)),
        Text(
          value,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: color),
        ),
      ],
    );
  }
}

class _DerivativeGraphPainter extends CustomPainter {
  final double Function(double) function;
  final double Function(double) derivative;
  final double Function(double, double) tangent;
  final double showTangentAt;
  final bool showDerivative;
  final bool showTangent;
  final bool showPoints;
  final bool showAxis;
  final double animationValue;

  _DerivativeGraphPainter({
    required this.function,
    required this.derivative,
    required this.tangent,
    required this.showTangentAt,
    required this.showDerivative,
    required this.showTangent,
    required this.showPoints,
    required this.showAxis,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    const xMin = -6.0, xMax = 6.0, yMin = -8.0, yMax = 8.0;
    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final scaleX = size.width / (xMax - xMin);
    final scaleY = size.height / (yMax - yMin);

    double toX(double x) => centerX + x * scaleX;
    double toY(double y) => centerY - y * scaleY;

    if (showAxis) {
      final axisPaint = Paint()
        ..color = BacPrepColors.textSecondary
        ..strokeWidth = 1.5;
      canvas.drawLine(Offset(0, centerY), Offset(size.width, centerY), axisPaint);
      canvas.drawLine(Offset(centerX, 0), Offset(centerX, size.height), axisPaint);

      final gridPaint = Paint()
        ..color = BacPrepColors.border.withValues(alpha: 0.3)
        ..strokeWidth = 0.5;
      for (int i = -5; i <= 5; i++) {
        if (i != 0) {
          canvas.drawLine(Offset(toX(i.toDouble()), 0), Offset(toX(i.toDouble()), size.height), gridPaint);
          canvas.drawLine(Offset(0, toY(i.toDouble())), Offset(size.width, toY(i.toDouble())), gridPaint);
        }
      }
    }

    final pathPaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path();
    bool first = true;
    for (double x = xMin; x <= xMax; x += 0.05) {
      final y = function(x);
      if (y >= yMin && y <= yMax) {
        final px = toX(x);
        final py = toY(y);
        if (first) {
          path.moveTo(px, py);
          first = false;
        } else {
          path.lineTo(px, py);
        }
      }
    }
    canvas.drawPath(path, pathPaint);

    if (showDerivative) {
      final derivPaint = Paint()
        ..color = BacPrepColors.warning.withValues(alpha: animationValue)
        ..strokeWidth = 2.5
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;

      final derivPath = Path();
      bool derivFirst = true;
      for (double x = xMin; x <= xMax; x += 0.05) {
        final y = derivative(x);
        if (y >= yMin && y <= yMax) {
          final px = toX(x);
          final py = toY(y);
          if (derivFirst) {
            derivPath.moveTo(px, py);
            derivFirst = false;
          } else {
            derivPath.lineTo(px, py);
          }
        }
      }
      canvas.drawPath(derivPath, derivPaint);
    }

    if (showTangent) {
      final tangentPaint = Paint()
        ..color = BacPrepColors.success
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;

      final tangentPath = Path();
      tangentPath.moveTo(toX(xMin), toY(tangent(xMin, showTangentAt)));
      tangentPath.lineTo(toX(xMax), toY(tangent(xMax, showTangentAt)));
      canvas.drawPath(tangentPath, tangentPaint);
    }

    if (showPoints) {
      final pointPaint = Paint()
        ..color = BacPrepColors.accent
        ..style = PaintingStyle.fill;
      final pointBorderPaint = Paint()
        ..color = Colors.white
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2;

      final px = toX(showTangentAt);
      final py = toY(function(showTangentAt));
      canvas.drawCircle(Offset(px, py), 8 * animationValue, pointPaint);
      canvas.drawCircle(Offset(px, py), 8 * animationValue, pointBorderPaint);

      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: 'M',
        style: TextStyle(color: BacPrepColors.accent, fontSize: 12, fontWeight: FontWeight.bold),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(px + 12, py - 20));
    }
  }

  @override
  bool shouldRepaint(covariant _DerivativeGraphPainter oldDelegate) {
    return showTangentAt != oldDelegate.showTangentAt ||
        showDerivative != oldDelegate.showDerivative ||
        showTangent != oldDelegate.showTangent ||
        animationValue != oldDelegate.animationValue;
  }
}
