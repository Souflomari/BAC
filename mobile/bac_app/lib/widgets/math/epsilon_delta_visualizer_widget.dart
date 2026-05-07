import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// ε-δ definition of a limit visualizer.
///
/// User picks a function f and a point a. Slider on ε shows the horizontal
/// band (L-ε, L+ε). The widget numerically searches for the largest δ such
/// that for all x in (a-δ, a+δ), |f(x)-L| < ε. Shows that as ε shrinks, δ
/// shrinks too — the formal definition of continuity.
class EpsilonDeltaVisualizerWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const EpsilonDeltaVisualizerWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<EpsilonDeltaVisualizerWidget> createState() =>
      _EpsilonDeltaVisualizerWidgetState();
}

enum _Func { square, linear, sine, oneOver }

extension on _Func {
  String get label {
    switch (this) {
      case _Func.square:
        return 'f(x) = x²';
      case _Func.linear:
        return 'f(x) = 2x + 1';
      case _Func.sine:
        return 'f(x) = sin(x)';
      case _Func.oneOver:
        return 'f(x) = 1/(x − 1)';
    }
  }

  double Function(double) get fn {
    switch (this) {
      case _Func.square:
        return (x) => x * x;
      case _Func.linear:
        return (x) => 2 * x + 1;
      case _Func.sine:
        return (x) => math.sin(x);
      case _Func.oneOver:
        return (x) => 1 / (x - 1);
    }
  }
}

class _EpsilonDeltaVisualizerWidgetState
    extends State<EpsilonDeltaVisualizerWidget>
    with SingleTickerProviderStateMixin {
  _Func _func = _Func.square;
  double _a = 1.5;
  double _epsilon = 0.6;

  late AnimationController _shrinkController;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _shrinkController = AnimationController(
      duration: const Duration(seconds: 6),
      vsync: this,
    );
    _shrinkController.addListener(() {
      // Shrink ε from 0.9 down to 0.05 as the controller advances.
      setState(() {
        _epsilon = 0.9 * (1 - _shrinkController.value) + 0.05;
      });
    });
  }

  @override
  void dispose() {
    _shrinkController.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double _f(double x) => _func.fn(x);
  // ignore: non_constant_identifier_names — matches mathematical convention
  double get _L => _f(_a);

  /// Largest δ in [0, deltaMax] such that for all x in (a-δ, a+δ) ∖ {a},
  /// |f(x) - L| < ε. Found by bisection on the candidate δ.
  double _solveDelta({double deltaMax = 1.5, int steps = 60}) {
    final eps = _epsilon;
    final L = _L;

    bool ok(double d) {
      const samples = 80;
      for (var i = -samples; i <= samples; i++) {
        if (i == 0) continue;
        final x = _a + d * i / samples;
        final fx = _f(x);
        if (!fx.isFinite) return false;
        if ((fx - L).abs() >= eps) return false;
      }
      return true;
    }

    if (!ok(0.001)) return 0;
    var lo = 0.001;
    var hi = deltaMax;
    if (ok(hi)) return hi;
    for (var i = 0; i < steps; i++) {
      final mid = (lo + hi) / 2;
      if (ok(mid)) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return lo;
  }

  void _toggleShrink() {
    setState(() {
      if (_shrinkController.isAnimating) {
        _shrinkController.stop();
      } else {
        if (_shrinkController.value >= 1.0) _shrinkController.reset();
        _shrinkController.forward();
      }
    });
  }

  void _reset() {
    _shrinkController.reset();
    setState(() => _epsilon = 0.6);
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
    final delta = _solveDelta();
    return SingleChildScrollView(
      padding: const EdgeInsets.all(Spacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (widget.item.stem.isNotEmpty) ...[
            RichTextRenderer(
              text: widget.item.stem,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    fontSize: 16,
                    height: 1.5,
                  ),
            ),
            const SizedBox(height: Spacing.sm),
          ],
          FigureWidget(figure: widget.item.questionFigure),
          _buildGraph(delta),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildDataDisplay(delta),
          const SizedBox(height: Spacing.md),
          _buildAnswerInput(delta),
        ],
      ),
    );
  }

  Widget _buildGraph(double delta) {
    return Container(
      height: 260,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 260),
          painter: _GraphPainter(
            f: _f,
            a: _a,
            L: _L,
            epsilon: _epsilon,
            delta: delta,
          ),
        ),
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
        ),
        const SizedBox(width: Spacing.md),
        IconButton.filled(
          icon: Icon(_shrinkController.isAnimating ? Icons.pause : Icons.play_arrow),
          iconSize: 36,
          tooltip: 'Faire diminuer ε',
          onPressed: _toggleShrink,
          style: IconButton.styleFrom(
            backgroundColor: BacPrepColors.physics,
            foregroundColor: Colors.white,
          ),
        ),
      ],
    );
  }

  Widget _buildParameters() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DropdownButton<_Func>(
            value: _func,
            isExpanded: true,
            items: _Func.values
                .map((f) => DropdownMenuItem(value: f, child: Text(f.label)))
                .toList(),
            onChanged: (v) => setState(() => _func = v ?? _func),
          ),
          const SizedBox(height: Spacing.sm),
          _Slider(
            label: 'a',
            value: _a,
            min: -3,
            max: 3,
            divisions: 60,
            display: _a.toStringAsFixed(2),
            onChanged: (v) => setState(() => _a = v),
          ),
          _Slider(
            label: 'ε',
            value: _epsilon,
            min: 0.05,
            max: 1.5,
            divisions: 145,
            display: _epsilon.toStringAsFixed(2),
            onChanged: (v) => setState(() => _epsilon = v),
          ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay(double delta) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.physics.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.physics.withValues(alpha: 0.2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _DataItem(label: 'L = f(a)', value: _L.toStringAsFixed(3), color: BacPrepColors.physics),
          _DataItem(label: 'ε', value: _epsilon.toStringAsFixed(3), color: BacPrepColors.success),
          _DataItem(label: 'δ', value: delta == 0 ? '∅' : delta.toStringAsFixed(3), color: BacPrepColors.error),
        ],
      ),
    );
  }

  Widget _buildAnswerInput(double delta) {
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
              'δ ≈ ${delta.toStringAsFixed(3)} pour ε = ${_epsilon.toStringAsFixed(2)}',
              style: const TextStyle(
                fontSize: 16,
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
              hintText: 'δ',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 18),
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

class _Slider extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final int divisions;
  final String display;
  final ValueChanged<double> onChanged;

  const _Slider({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.divisions,
    required this.display,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 40,
          child: Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
        ),
        Expanded(
          child: Slider(
            value: value,
            min: min,
            max: max,
            divisions: divisions,
            onChanged: onChanged,
          ),
        ),
        SizedBox(
          width: 56,
          child: Text(
            display,
            style: const TextStyle(fontWeight: FontWeight.w600),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

class _DataItem extends StatelessWidget {
  final String label;
  final String value;
  final Color color;
  const _DataItem({required this.label, required this.value, required this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, color: BacPrepColors.textSecondary)),
        Text(
          value,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: color),
        ),
      ],
    );
  }
}

class _GraphPainter extends CustomPainter {
  final double Function(double) f;
  final double a;
  // ignore: non_constant_identifier_names — matches mathematical convention
  final double L;
  final double epsilon;
  final double delta;

  _GraphPainter({
    required this.f,
    required this.a,
    required this.L,
    required this.epsilon,
    required this.delta,
  });

  static const double _xMin = -3.5;
  static const double _xMax = 3.5;

  @override
  void paint(Canvas canvas, Size size) {
    const left = 36.0;
    const right = 10.0;
    const top = 12.0;
    const bottom = 26.0;
    final w = size.width - left - right;
    final h = size.height - top - bottom;

    // Adaptive Y window: center on L with margin 1.5
    final yCenter = L;
    final yHalf = math.max(2.0, epsilon * 3 + 1);
    final yMin = yCenter - yHalf;
    final yMax = yCenter + yHalf;

    double xOf(double x) => left + ((x - _xMin) / (_xMax - _xMin)) * w;
    double yOf(double y) => top + (1 - (y - yMin) / (yMax - yMin)) * h;

    // Axes
    final axis = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.2;
    // x-axis at y = 0 if visible
    if (yMin <= 0 && 0 <= yMax) {
      canvas.drawLine(Offset(left, yOf(0)), Offset(left + w, yOf(0)), axis);
    }
    // y-axis at x = 0 if visible
    if (_xMin <= 0 && 0 <= _xMax) {
      canvas.drawLine(Offset(xOf(0), top), Offset(xOf(0), top + h), axis);
    }

    // ε horizontal band
    final epsRect = Rect.fromLTRB(left, yOf(L + epsilon), left + w, yOf(L - epsilon));
    canvas.drawRect(
      epsRect,
      Paint()..color = BacPrepColors.success.withValues(alpha: 0.12),
    );

    // δ vertical band (if delta > 0)
    if (delta > 0) {
      final dxLeft = math.max(_xMin, a - delta);
      final dxRight = math.min(_xMax, a + delta);
      final dRect = Rect.fromLTRB(xOf(dxLeft), top, xOf(dxRight), top + h);
      canvas.drawRect(
        dRect,
        Paint()..color = BacPrepColors.error.withValues(alpha: 0.10),
      );
    }

    // Function curve
    final curve = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 2.4
      ..style = PaintingStyle.stroke;
    final path = Path();
    var started = false;
    double? prevY;
    for (var i = 0; i <= 400; i++) {
      final x = _xMin + (_xMax - _xMin) * i / 400;
      final y = f(x);
      if (!y.isFinite) {
        started = false;
        prevY = null;
        continue;
      }
      // Break path on big jumps (asymptotes)
      if (prevY != null && (y - prevY).abs() > yHalf * 2) {
        started = false;
      }
      final px = xOf(x);
      final py = yOf(y.clamp(yMin - 1, yMax + 1));
      if (!started) {
        path.moveTo(px, py);
        started = true;
      } else {
        path.lineTo(px, py);
      }
      prevY = y;
    }
    canvas.drawPath(path, curve);

    // Point (a, L)
    final dotPaint = Paint()..color = BacPrepColors.error;
    canvas.drawCircle(Offset(xOf(a), yOf(L)), 4.5, dotPaint);

    // Labels
    final tp = TextPainter(textDirection: TextDirection.ltr);
    void drawText(String s, Offset o, {Color? c, double size = 10}) {
      tp.text = TextSpan(
        text: s,
        style: TextStyle(fontSize: size, color: c ?? BacPrepColors.textSecondary),
      );
      tp.layout();
      tp.paint(canvas, o);
    }

    drawText('a', Offset(xOf(a) - 4, top + h + 6), c: BacPrepColors.error, size: 11);
    drawText('L', Offset(left + 4, yOf(L) - 12), c: BacPrepColors.error, size: 11);
    drawText('L+ε', Offset(left + 4, yOf(L + epsilon) - 12), c: BacPrepColors.success);
    drawText('L−ε', Offset(left + 4, yOf(L - epsilon) + 2), c: BacPrepColors.success);
    if (delta > 0) {
      drawText('a−δ', Offset(xOf(a - delta) - 14, top - 2), c: BacPrepColors.error);
      drawText('a+δ', Offset(xOf(a + delta) + 2, top - 2), c: BacPrepColors.error);
    }
  }

  @override
  bool shouldRepaint(covariant _GraphPainter oldDelegate) =>
      oldDelegate.a != a ||
      oldDelegate.L != L ||
      oldDelegate.epsilon != epsilon ||
      oldDelegate.delta != delta;
}
