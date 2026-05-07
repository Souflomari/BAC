import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class FunctionGraphWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const FunctionGraphWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<FunctionGraphWidget> createState() => _FunctionGraphWidgetState();
}

class _FunctionGraphWidgetState extends State<FunctionGraphWidget> {
  double _xMin = -10;
  double _xMax = 10;
  double _yMin = -10;
  double _yMax = 10;
  double _selectedX = 0;
  double _selectedY = 0;
  bool _showTangent = false;
  double _tangentSlope = 0;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _xMin = widget.item.xMin;
    _xMax = widget.item.xMax;
    _yMin = widget.item.yMin;
    _yMax = widget.item.yMax;
    _updateSelectedY();
  }

  @override
  void didUpdateWidget(FunctionGraphWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _xMin = widget.item.xMin;
      _xMax = widget.item.xMax;
      _yMin = widget.item.yMin;
      _yMax = widget.item.yMax;
      _answerController.clear();
      _hasSubmitted = false;
      _showTangent = false;
      _updateSelectedY();
    }
  }

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  void _updateSelectedY() {
    _selectedY = _evaluateFunction(_selectedX);
    if (widget.item.showTangentAt != null) {
      _showTangent = (_selectedX - widget.item.showTangentAt!).abs() < 0.5;
      _tangentSlope = _evaluateDerivative(_selectedX);
    }
  }

  double _evaluateFunction(double x) {
    final func = widget.item.function.toLowerCase();
    try {
      return _parseAndEvaluate(func, x);
    } catch (e) {
      return 0;
    }
  }

  double _parseAndEvaluate(String expr, double x) {
    expr = expr.replaceAll(' ', '');
    
    if (expr.contains('x^2')) {
      final coef = _extractCoefficient(expr, 'x^2');
      return coef * x * x;
    }
    if (expr.contains('x^3')) {
      final coef = _extractCoefficient(expr, 'x^3');
      return coef * x * x * x;
    }
    if (expr.contains('x^')) {
      final match = RegExp(r'([\d.]*)?\*?x\^(\d)').firstMatch(expr);
      if (match != null) {
        final coef = double.tryParse(match.group(1) ?? '1') ?? 1;
        final power = int.parse(match.group(2)!);
        return coef * math.pow(x, power);
      }
    }
    if (expr.contains('x')) {
      final coef = _extractLinearCoefficient(expr);
      final constant = _extractConstant(expr);
      return coef * x + constant;
    }
    if (expr == 'sin(x)' || expr == 'sin x') {
      return math.sin(x);
    }
    if (expr == 'cos(x)' || expr == 'cos x') {
      return math.cos(x);
    }
    if (expr == 'tan(x)' || expr == 'tan x') {
      return math.tan(x);
    }
    if (expr == 'e^x' || expr == 'e^x' || expr == 'exp(x)') {
      return math.exp(x);
    }
    if (expr.contains('sqrt(') || expr.contains('√')) {
      final inner = expr.contains('sqrt(') 
          ? expr.substring(expr.indexOf('sqrt(') + 5, expr.indexOf(')'))
          : 'x';
      return math.sqrt(inner == 'x' ? x : double.tryParse(inner) ?? x);
    }
    if (expr.contains('1/x') || expr == '1/x') {
      return 1 / x;
    }
    if (expr == 'ln(x)' || expr == 'ln x') {
      return x > 0 ? math.log(x) : double.nan;
    }
    if (expr.contains('abs(') || expr == '|x|') {
      return x.abs();
    }

    return double.tryParse(expr) ?? 0;
  }

  double _extractCoefficient(String expr, String term) {
    final idx = expr.indexOf(term);
    if (idx == 0) return 1;
    if (idx == 1 && expr[0] == '-') return -1;
    final coefStr = expr.substring(0, idx);
    return double.tryParse(coefStr) ?? 1;
  }

  double _extractLinearCoefficient(String expr) {
    final idx = expr.indexOf('x');
    if (idx == 0) return 1;
    if (idx == 1 && expr[0] == '-') return -1;
    final coefStr = expr.substring(0, idx);
    return double.tryParse(coefStr) ?? 1;
  }

  double _extractConstant(String expr) {
    final xIdx = expr.lastIndexOf('x');
    if (xIdx == -1) return double.tryParse(expr) ?? 0;
    final afterX = expr.substring(xIdx + 1);
    if (afterX.isEmpty) return 0;
    return double.tryParse(afterX) ?? 0;
  }

  double _evaluateDerivative(double x) {
    final h = 0.0001;
    return (_evaluateFunction(x + h) - _evaluateFunction(x - h)) / (2 * h);
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
          _buildCoordinateInfo(),
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
        child: GestureDetector(
          onPanUpdate: (details) {
            final dx = details.delta.dx;
            final xRange = _xMax - _xMin;
            final yRange = _yMax - _yMin;
            setState(() {
              _xMin -= dx * xRange / 300;
              _xMax -= dx * xRange / 300;
              _yMin += dx * yRange / 300;
              _yMax += dx * yRange / 300;
            });
          },
          onScaleUpdate: (details) {
            if (details.scale != 1.0) {
              setState(() {
                final factor = 1 / details.scale;
                final midX = (_xMin + _xMax) / 2;
                final midY = (_yMin + _yMax) / 2;
                _xMin = midX + (_xMin - midX) * factor;
                _xMax = midX + (_xMax - midX) * factor;
                _yMin = midY + (_yMin - midY) * factor;
                _yMax = midY + (_yMax - midY) * factor;
              });
            }
          },
          onTapUp: (details) {
            final localX = details.localPosition.dx;
            final localY = details.localPosition.dy;
            setState(() {
              _selectedX = _xMin + (localX / 300) * (_xMax - _xMin);
              final height = 300 * (_yMax - _yMin) / (_xMax - _xMin);
              _selectedY = _yMax - (localY / height) * (_yMax - _yMin);
              _updateSelectedY();
            });
          },
          child: CustomPaint(
            size: const Size(300, 300),
            painter: _GraphPainter(
              xMin: _xMin,
              xMax: _xMax,
              yMin: _yMin,
              yMax: _yMax,
              function: widget.item.function,
              selectedX: _selectedX,
              selectedY: _selectedY,
              showTangent: _showTangent,
              tangentSlope: _tangentSlope,
              showDerivative: widget.item.showDerivative,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCoordinateInfo() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.primaryLight.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Column(
            children: [
              Text('x', style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 12)),
              Text(_selectedX.toStringAsFixed(2), style: TextStyle(
                fontWeight: FontWeight.w600,
                color: BacPrepColors.primary,
                fontSize: 16,
              )),
            ],
          ),
          Column(
            children: [
              Text('f(x)', style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 12)),
              Text(_selectedY.isFinite ? _selectedY.toStringAsFixed(2) : '∞', style: TextStyle(
                fontWeight: FontWeight.w600,
                color: BacPrepColors.primary,
                fontSize: 16,
              )),
            ],
          ),
          if (_showTangent)
            Column(
              children: [
                Text("f'(x)", style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 12)),
                Text(_tangentSlope.toStringAsFixed(2), style: TextStyle(
                  fontWeight: FontWeight.w600,
                  color: BacPrepColors.success,
                  fontSize: 16,
                )),
              ],
            ),
          IconButton(
            icon: const Icon(Icons.zoom_in),
            onPressed: () {
              setState(() {
                final midX = (_xMin + _xMax) / 2;
                final midY = (_yMin + _yMax) / 2;
                _xMin = midX + (_xMin - midX) * 0.7;
                _xMax = midX + (_xMax - midX) * 0.7;
                _yMin = midY + (_yMin - midY) * 0.7;
                _yMax = midY + (_yMax - midY) * 0.7;
              });
            },
          ),
          IconButton(
            icon: const Icon(Icons.zoom_out),
            onPressed: () {
              setState(() {
                final midX = (_xMin + _xMax) / 2;
                final midY = (_yMin + _yMax) / 2;
                _xMin = midX + (_xMin - midX) * 1.3;
                _xMax = midX + (_xMax - midX) * 1.3;
                _yMin = midY + (_yMin - midY) * 1.3;
                _yMax = midY + (_yMax - midY) * 1.3;
              });
            },
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
            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
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

class _GraphPainter extends CustomPainter {
  final double xMin, xMax, yMin, yMax;
  final String function;
  final double selectedX, selectedY;
  final bool showTangent;
  final double tangentSlope;
  final bool showDerivative;

  _GraphPainter({
    required this.xMin,
    required this.xMax,
    required this.yMin,
    required this.yMax,
    required this.function,
    required this.selectedX,
    required this.selectedY,
    required this.showTangent,
    required this.tangentSlope,
    required this.showDerivative,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = BacPrepColors.textTertiary
      ..strokeWidth = 1;

    final gridPaint = Paint()
      ..color = BacPrepColors.border.withValues(alpha: 0.5)
      ..strokeWidth = 0.5;

    final functionPaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;

    final dotPaint = Paint()
      ..color = BacPrepColors.accent
      ..style = PaintingStyle.fill;

    final tangentPaint = Paint()
      ..color = BacPrepColors.success.withValues(alpha: 0.7)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final gridSpacing = _calculateGridSpacing();

    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), Paint()..color = Colors.white);

    for (double x = (xMin / gridSpacing).floor() * gridSpacing; x <= xMax; x += gridSpacing) {
      final screenX = _mapX(x, size.width);
      canvas.drawLine(
        Offset(screenX, 0),
        Offset(screenX, size.height),
        gridPaint,
      );
    }

    for (double y = (yMin / gridSpacing).floor() * gridSpacing; y <= yMax; y += gridSpacing) {
      final screenY = _mapY(y, size.height);
      canvas.drawLine(
        Offset(0, screenY),
        Offset(size.width, screenY),
        gridPaint,
      );
    }

    final originX = _mapX(0, size.width);
    final originY = _mapY(0, size.height);
    if (originX >= 0 && originX <= size.width) {
      canvas.drawLine(Offset(originX, 0), Offset(originX, size.height), axisPaint);
    }
    if (originY >= 0 && originY <= size.height) {
      canvas.drawLine(Offset(0, originY), Offset(size.width, originY), axisPaint);
    }

    final path = Path();
    bool started = false;
    final step = (xMax - xMin) / size.width;

    for (double x = xMin; x <= xMax; x += step) {
      final y = _evaluateFunction(x);
      if (y.isFinite && y >= yMin - 100 && y <= yMax + 100) {
        final screenX = _mapX(x, size.width);
        final screenY = _mapY(y, size.height);
        if (!started) {
          path.moveTo(screenX, screenY);
          started = true;
        } else {
          path.lineTo(screenX, screenY);
        }
      } else {
        started = false;
      }
    }
    canvas.drawPath(path, functionPaint);

    if (showTangent) {
      final tangentPath = Path();
      final screenX = _mapX(selectedX, size.width);
      final screenY = _mapY(selectedY, size.height);
      final tangentDx = 50.0;
      final tangentDy = tangentSlope * ((xMax - xMin) / size.width) * tangentDx;
      tangentPath.moveTo(screenX - tangentDx, screenY - tangentDy);
      tangentPath.lineTo(screenX + tangentDx, screenY + tangentDy);
      canvas.drawPath(tangentPath, tangentPaint);
    }

    final dotX = _mapX(selectedX, size.width);
    final dotY = _mapY(selectedY, size.height);
    if (dotX >= 0 && dotX <= size.width && dotY >= 0 && dotY <= size.height) {
      canvas.drawCircle(Offset(dotX, dotY), 8, dotPaint);
      canvas.drawCircle(
        Offset(dotX, dotY),
        8,
        Paint()
          ..color = Colors.white
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );
    }

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: _formatNumber(xMin),
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(4, originY + 4));

    textPainter.text = TextSpan(
      text: _formatNumber(xMax),
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width - 24, originY + 4));
  }

  double _mapX(double x, double width) => (x - xMin) / (xMax - xMin) * width;
  double _mapY(double y, double height) => height - (y - yMin) / (yMax - yMin) * height;

  double _evaluateFunction(double x) {
    try {
      final func = function.toLowerCase().replaceAll(' ', '');
      if (func.contains('x^2')) {
        final match = RegExp(r'([-\d.]*)?\*?x\^2').firstMatch(func);
        if (match != null) {
          final coef = double.tryParse(match.group(1) ?? '1') ?? 1;
          if (match.group(1) == '-') return -x * x;
          return coef * x * x;
        }
      }
      if (func.contains('x^3')) {
        return x * x * x;
      }
      if (func.contains('x^')) {
        final match = RegExp(r'([-\d.]*)?\*?x\^(\d)').firstMatch(func);
        if (match != null) {
          final coef = double.tryParse(match.group(1) ?? '1') ?? 1;
          final power = int.parse(match.group(2)!);
          return coef * math.pow(x, power);
        }
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
      if (func == 'sin(x)' || func == 'sinx') return math.sin(x);
      if (func == 'cos(x)' || func == 'cosx') return math.cos(x);
      if (func == 'tan(x)' || func == 'tanx') return math.tan(x);
      if (func == 'e^x' || func == 'exp(x)' || func == 'exp(x)') return math.exp(x);
      if (func == 'ln(x)' || func == 'lnx') return x > 0 ? math.log(x) : double.nan;
      if (func == 'abs(x)' || func == '|x|') return x.abs();
      if (func.contains('sqrt(x)') || func.contains('√x')) return math.sqrt(x);
      return double.tryParse(func) ?? 0;
    } catch (e) {
      return double.nan;
    }
  }

  double _calculateGridSpacing() {
    final range = xMax - xMin;
    if (range <= 4) return 0.5;
    if (range <= 10) return 1;
    if (range <= 20) return 2;
    if (range <= 50) return 5;
    return 10;
  }

  String _formatNumber(double n) {
    if (n == n.roundToDouble()) return n.toInt().toString();
    return n.toStringAsFixed(1);
  }

  @override
  bool shouldRepaint(covariant _GraphPainter oldDelegate) {
    return xMin != oldDelegate.xMin ||
        xMax != oldDelegate.xMax ||
        yMin != oldDelegate.yMin ||
        yMax != oldDelegate.yMax ||
        selectedX != oldDelegate.selectedX ||
        selectedY != oldDelegate.selectedY ||
        showTangent != oldDelegate.showTangent ||
        function != oldDelegate.function;
  }
}
