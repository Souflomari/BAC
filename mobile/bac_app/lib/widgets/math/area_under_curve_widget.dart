import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class AreaUnderCurveWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const AreaUnderCurveWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<AreaUnderCurveWidget> createState() => _AreaUnderCurveWidgetState();
}

class _AreaUnderCurveWidgetState extends State<AreaUnderCurveWidget> {
  double _xMin = 0;
  double _xMax = 5;
  double _a = 0;
  double _b = 3;
  double _displayArea = 0;
  
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _initializeFromConfig();
  }

  void _initializeFromConfig() {
    final config = widget.item.graphConfig;
    _xMin = (config['x_min'] as num?)?.toDouble() ?? 0;
    _xMax = (config['x_max'] as num?)?.toDouble() ?? 5;
    _a = (config['a'] as num?)?.toDouble() ?? 0;
    _b = (config['b'] as num?)?.toDouble() ?? 3;
    _displayArea = _calculateArea();
  }

  @override
  void didUpdateWidget(AreaUnderCurveWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _initializeFromConfig();
      _answerController.clear();
      _hasSubmitted = false;
    }
  }

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  double _evaluateFunction(double x) {
    final func = widget.item.function.toLowerCase();
    try {
      func.replaceAll(' ', '');
      if (func.contains('x^2')) {
        final match = RegExp(r'([-\d.]*)?\*?x\^2').firstMatch(func);
        if (match != null) {
          double coef = 1;
          final coefStr = match.group(1);
          if (coefStr == '-') coef = -1;
          else if (coefStr != null) coef = double.tryParse(coefStr) ?? 1;
          return coef * x * x;
        }
      }
      if (func.contains('x^3')) {
        return x * x * x;
      }
      if (func.contains('x')) {
        final coefMatch = RegExp(r'([-\d.]*)?\*?x').firstMatch(func);
        double coef = 1;
        if (coefMatch != null) {
          final coefStr = coefMatch.group(1);
          if (coefStr == '-') coef = -1;
          else if (coefStr != null && coefStr != '*') coef = double.tryParse(coefStr) ?? 1;
        }
        final constMatch = RegExp(r'x([+\-][\d.]+)?$').firstMatch(func);
        double constant = 0;
        if (constMatch != null && constMatch.group(1) != null) {
          constant = double.tryParse(constMatch.group(1)!) ?? 0;
        }
        return coef * x + constant;
      }
      if (func == 'sin(x)') return math.sin(x);
      if (func == 'cos(x)') return math.cos(x);
      if (func == 'sqrt(x)' || func == '√x') return math.sqrt(x);
      return double.tryParse(func) ?? 0;
    } catch (e) {
      return 0;
    }
  }

  double _calculateArea() {
    final n = 100;
    final dx = (_b - _a) / n;
    double sum = 0;
    for (int i = 0; i < n; i++) {
      final x = _a + (i + 0.5) * dx;
      sum += _evaluateFunction(x) * dx;
    }
    return sum;
  }

  void _adjustBound(bool isLower, double delta) {
    setState(() {
      if (isLower) {
        _a = (_a + delta).clamp(_xMin, _b - 0.5);
      } else {
        _b = (_b + delta).clamp(_a + 0.5, _xMax);
      }
      _displayArea = _calculateArea();
    });
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
          _buildBoundsControls(),
          const SizedBox(height: Spacing.md),
          _buildAreaDisplay(),
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
        child: CustomPaint(
          size: const Size(double.infinity, 300),
          painter: _AreaUnderCurvePainter(
            xMin: _xMin,
            xMax: _xMax,
            function: widget.item.function,
            a: _a,
            b: _b,
            area: _displayArea,
          ),
        ),
      ),
    );
  }

  Widget _buildBoundsControls() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.start, color: BacPrepColors.primary, size: 20),
              const SizedBox(width: Spacing.sm),
              Text('Borne inférieure a =', style: TextStyle(color: BacPrepColors.textSecondary)),
              const Spacer(),
              IconButton(
                icon: const Icon(Icons.remove_circle_outline),
                onPressed: () => _adjustBound(true, -0.5),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _a.toStringAsFixed(1),
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.primary,
                    fontSize: 16,
                  ),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.add_circle_outline),
                onPressed: () => _adjustBound(true, 0.5),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              const Icon(Icons.stop, color: BacPrepColors.error, size: 20),
              const SizedBox(width: Spacing.sm),
              Text('Borne supérieure b =', style: TextStyle(color: BacPrepColors.textSecondary)),
              const Spacer(),
              IconButton(
                icon: const Icon(Icons.remove_circle_outline),
                onPressed: () => _adjustBound(false, -0.5),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.error.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _b.toStringAsFixed(1),
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.error,
                    fontSize: 16,
                  ),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.add_circle_outline),
                onPressed: () => _adjustBound(false, 0.5),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAreaDisplay() {
    return Container(
      padding: const EdgeInsets.all(Spacing.lg),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            BacPrepColors.success.withValues(alpha: 0.2),
            BacPrepColors.success.withValues(alpha: 0.1),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.success.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            'Aire sous la courbe',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Text(
            '∫f(x)dx = ${_displayArea.toStringAsFixed(2)}',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.w700,
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.xs),
          Text(
            'de ${_a.toStringAsFixed(1)} à ${_b.toStringAsFixed(1)}',
            style: TextStyle(color: BacPrepColors.textSecondary),
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
              'Réponse : ${widget.item.correctValue}',
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
              hintText: 'Entrez l\'aire calculée',
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

class _AreaUnderCurvePainter extends CustomPainter {
  final double xMin, xMax;
  final String function;
  final double a, b;
  final double area;

  _AreaUnderCurvePainter({
    required this.xMin,
    required this.xMax,
    required this.function,
    required this.a,
    required this.b,
    required this.area,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final padding = 40.0;
    final graphWidth = size.width - padding * 2;
    final graphHeight = size.height - padding * 2;

    final bgPaint = Paint()..color = Colors.white;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final gridPaint = Paint()
      ..color = BacPrepColors.border.withValues(alpha: 0.5)
      ..strokeWidth = 0.5;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;

    final areaPaint = Paint()
      ..color = BacPrepColors.success.withValues(alpha: 0.3)
      ..style = PaintingStyle.fill;

    final functionPaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    final boundPaint = Paint()
      ..color = BacPrepColors.accent
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    double minY = double.infinity;
    double maxY = double.negativeInfinity;
    for (double x = xMin; x <= xMax; x += (xMax - xMin) / 100) {
      final y = _evaluateFunction(x);
      if (y.isFinite) {
        minY = y < minY ? y : minY;
        maxY = y > maxY ? y : maxY;
      }
    }
    minY -= 1;
    maxY += 1;

    for (int i = 0; i <= 5; i++) {
      final y = minY + (maxY - minY) * i / 5;
      final screenY = padding + graphHeight * (1 - (y - minY) / (maxY - minY));
      canvas.drawLine(
        Offset(padding, screenY),
        Offset(size.width - padding, screenY),
        gridPaint,
      );
    }

    final originX = padding + graphWidth * (-xMin / (xMax - xMin));
    final originY = padding + graphHeight * (1 - (-minY / (maxY - minY)));

    if (originX >= padding && originX <= size.width - padding) {
      canvas.drawLine(
        Offset(originX, padding),
        Offset(originX, size.height - padding),
        axisPaint,
      );
    }
    if (originY >= padding && originY <= size.height - padding) {
      canvas.drawLine(
        Offset(padding, originY),
        Offset(size.width - padding, originY),
        axisPaint,
      );
    }

    final areaPath = Path();
    final n = 50;
    final dx = (b - a) / n;
    
    final aScreenX = padding + graphWidth * ((a - xMin) / (xMax - xMin));
    final bScreenX = padding + graphWidth * ((b - xMin) / (xMax - xMin));
    
    areaPath.moveTo(aScreenX, originY);
    for (int i = 0; i <= n; i++) {
      final x = a + i * dx;
      final y = _evaluateFunction(x);
      final screenX = padding + graphWidth * ((x - xMin) / (xMax - xMin));
      final screenY = padding + graphHeight * (1 - (y - minY) / (maxY - minY));
      if (y.isFinite) {
        areaPath.lineTo(screenX, screenY);
      }
    }
    areaPath.lineTo(bScreenX, originY);
    areaPath.close();
    canvas.drawPath(areaPath, areaPaint);

    final funcPath = Path();
    bool started = false;
    final step = (xMax - xMin) / graphWidth;
    
    for (double screenX = padding; screenX <= size.width - padding; screenX++) {
      final x = xMin + (screenX - padding) / graphWidth * (xMax - xMin);
      final y = _evaluateFunction(x);
      final screenY = padding + graphHeight * (1 - (y - minY) / (maxY - minY));
      if (y.isFinite && screenY >= padding - 50 && screenY <= size.height - padding + 50) {
        if (!started) {
          funcPath.moveTo(screenX, screenY);
          started = true;
        } else {
          funcPath.lineTo(screenX, screenY);
        }
      } else {
        started = false;
      }
    }
    canvas.drawPath(funcPath, functionPaint);

    canvas.drawLine(
      Offset(aScreenX, padding),
      Offset(aScreenX, size.height - padding),
      boundPaint,
    );
    canvas.drawLine(
      Offset(bScreenX, padding),
      Offset(bScreenX, size.height - padding),
      boundPaint,
    );

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: a.toStringAsFixed(1),
      style: TextStyle(color: BacPrepColors.accent, fontSize: 12, fontWeight: FontWeight.w600),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(aScreenX - textPainter.width / 2, size.height - padding + 4));

    textPainter.text = TextSpan(
      text: b.toStringAsFixed(1),
      style: TextStyle(color: BacPrepColors.accent, fontSize: 12, fontWeight: FontWeight.w600),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(bScreenX - textPainter.width / 2, size.height - padding + 4));
  }

  double _evaluateFunction(double x) {
    final func = function.toLowerCase().replaceAll(' ', '');
    try {
      if (func.contains('x^2')) {
        final match = RegExp(r'([-\d.]*)?\*?x\^2').firstMatch(func);
        if (match != null) {
          double coef = 1;
          final coefStr = match.group(1);
          if (coefStr == '-') coef = -1;
          else if (coefStr != null) coef = double.tryParse(coefStr) ?? 1;
          return coef * x * x;
        }
      }
      if (func.contains('x^3')) return x * x * x;
      if (func.contains('x')) {
        final coefMatch = RegExp(r'([-\d.]*)?\*?x').firstMatch(func);
        double coef = 1;
        if (coefMatch != null) {
          final coefStr = coefMatch.group(1);
          if (coefStr == '-') coef = -1;
          else if (coefStr != null && coefStr != '*') coef = double.tryParse(coefStr) ?? 1;
        }
        final constMatch = RegExp(r'x([+\-][\d.]+)?$').firstMatch(func);
        double constant = 0;
        if (constMatch != null && constMatch.group(1) != null) {
          constant = double.tryParse(constMatch.group(1)!) ?? 0;
        }
        return coef * x + constant;
      }
      if (func == 'sin(x)') return math.sin(x);
      if (func == 'cos(x)') return math.cos(x);
      if (func == 'sqrt(x)') return math.sqrt(x);
      return double.tryParse(func) ?? 0;
    } catch (e) {
      return 0;
    }
  }

  @override
  bool shouldRepaint(covariant _AreaUnderCurvePainter oldDelegate) {
    return a != oldDelegate.a ||
        b != oldDelegate.b ||
        area != oldDelegate.area ||
        function != oldDelegate.function;
  }
}
