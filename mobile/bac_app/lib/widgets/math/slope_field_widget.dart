import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Slope-field visualizer for first-order ODEs y' = f(x, y).
///
/// User picks an ODE family and adjusts the parameter a. Tap on the canvas
/// to set the initial condition (x₀, y₀); the widget integrates the solution
/// forward (and backward) using RK4 and overlays it on the slope field.
class SlopeFieldWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const SlopeFieldWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<SlopeFieldWidget> createState() => _State();
}

enum _ODE { linear, affine, forced, logistic }

extension on _ODE {
  String get label {
    switch (this) {
      case _ODE.linear:
        return "y' = a·y";
      case _ODE.affine:
        return "y' = a·y + 1";
      case _ODE.forced:
        return "y' = -y + cos(x)";
      case _ODE.logistic:
        return "y' = a·y(1 − y)";
    }
  }

  double Function(double x, double y, double a) get fn {
    switch (this) {
      case _ODE.linear:
        return (x, y, a) => a * y;
      case _ODE.affine:
        return (x, y, a) => a * y + 1;
      case _ODE.forced:
        return (x, y, a) => -y + math.cos(x);
      case _ODE.logistic:
        return (x, y, a) => a * y * (1 - y);
    }
  }
}

class _State extends State<SlopeFieldWidget> {
  _ODE _ode = _ODE.linear;
  double _a = 0.5;
  Offset? _initial; // tap location in math coordinates
  static const double _xMin = -4.0;
  static const double _xMax = 4.0;
  static const double _yMin = -3.0;
  static const double _yMax = 3.0;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  double _slope(double x, double y) => _ode.fn(x, y, _a);

  /// RK4 solution from start, returning a list of points sampled at uniform
  /// step h between xStart and xEnd. xEnd may be less than xStart.
  List<Offset> _solve(double x0, double y0, double xEnd, {double h = 0.05}) {
    final pts = <Offset>[Offset(x0, y0)];
    var x = x0, y = y0;
    final steps = ((xEnd - x0) / h).round().abs();
    final step = (xEnd - x0).sign * (xEnd - x0).abs() / math.max(steps, 1);
    for (var i = 0; i < steps; i++) {
      final k1 = _slope(x, y);
      final k2 = _slope(x + step / 2, y + step * k1 / 2);
      final k3 = _slope(x + step / 2, y + step * k2 / 2);
      final k4 = _slope(x + step, y + step * k3);
      y += step * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      x += step;
      if (!y.isFinite || y.abs() > 1e6) break;
      pts.add(Offset(x, y));
    }
    return pts;
  }

  void _handleTap(TapDownDetails details, Size size, EdgeInsets pad) {
    final w = size.width - pad.left - pad.right;
    final h = size.height - pad.top - pad.bottom;
    final p = details.localPosition;
    final x = _xMin + (p.dx - pad.left) / w * (_xMax - _xMin);
    final y = _yMax - (p.dy - pad.top) / h * (_yMax - _yMin);
    setState(() => _initial = Offset(x, y));
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
          _buildField(),
          const SizedBox(height: Spacing.sm),
          Text(
            _initial == null
                ? 'Touche le graphe pour fixer la condition initiale (x₀, y₀).'
                : '(x₀, y₀) = (${_initial!.dx.toStringAsFixed(2)}, ${_initial!.dy.toStringAsFixed(2)})',
            style: const TextStyle(fontSize: 12, color: BacPrepColors.textSecondary),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildField() {
    return Container(
      height: 260,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: LayoutBuilder(
          builder: (ctx, c) {
            const pad = EdgeInsets.fromLTRB(28, 12, 12, 26);
            final size = Size(c.maxWidth, c.maxHeight);
            final solution = _initial == null
                ? const <Offset>[]
                : ([
                    ..._solve(_initial!.dx, _initial!.dy, _xMax).reversed,
                    ..._solve(_initial!.dx, _initial!.dy, _xMin),
                  ]);
            return GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTapDown: (details) => _handleTap(details, size, pad),
              child: CustomPaint(
                size: size,
                painter: _FieldPainter(
                  slope: _slope,
                  solution: solution,
                  initial: _initial,
                  pad: pad,
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildParameters() {
    final showA = _ode != _ODE.forced;
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          DropdownButton<_ODE>(
            value: _ode,
            isExpanded: true,
            items: _ODE.values
                .map((o) => DropdownMenuItem(value: o, child: Text(o.label)))
                .toList(),
            onChanged: (v) => setState(() => _ode = v ?? _ode),
          ),
          if (showA)
            _S(
              label: 'a',
              value: _a,
              min: -2,
              max: 2,
              divisions: 80,
              display: _a.toStringAsFixed(2),
              onChanged: (v) => setState(() => _a = v),
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
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.check, color: BacPrepColors.success),
            SizedBox(width: Spacing.sm),
            Text(
              'Solution tracée',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: BacPrepColors.success),
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
              hintText: 'y(0)',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
            onSubmitted: (_) => _submit(),
          ),
        ),
        const SizedBox(width: Spacing.md),
        ElevatedButton(onPressed: _submit, child: const Text('Valider')),
      ],
    );
  }
}

class _S extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final int divisions;
  final String display;
  final ValueChanged<double> onChanged;
  const _S({
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
        SizedBox(width: 40, child: Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600))),
        Expanded(
          child: Slider(value: value, min: min, max: max, divisions: divisions, onChanged: onChanged),
        ),
        SizedBox(
          width: 56,
          child: Text(display, style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end),
        ),
      ],
    );
  }
}

class _FieldPainter extends CustomPainter {
  final double Function(double, double) slope;
  final List<Offset> solution;
  final Offset? initial;
  final EdgeInsets pad;

  static const double _xMin = -4.0;
  static const double _xMax = 4.0;
  static const double _yMin = -3.0;
  static const double _yMax = 3.0;

  _FieldPainter({
    required this.slope,
    required this.solution,
    required this.initial,
    required this.pad,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width - pad.left - pad.right;
    final h = size.height - pad.top - pad.bottom;

    double xOf(double x) => pad.left + (x - _xMin) / (_xMax - _xMin) * w;
    double yOf(double y) => pad.top + (1 - (y - _yMin) / (_yMax - _yMin)) * h;

    // Axes
    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1.2;
    canvas.drawLine(Offset(pad.left, yOf(0)), Offset(pad.left + w, yOf(0)), axis);
    canvas.drawLine(Offset(xOf(0), pad.top), Offset(xOf(0), pad.top + h), axis);

    // Slope field
    const cols = 18;
    const rows = 12;
    final segPaint = Paint()
      ..color = BacPrepColors.physics.withValues(alpha: 0.55)
      ..strokeWidth = 1.2;
    const dx = (_xMax - _xMin) / cols;
    const dy = (_yMax - _yMin) / rows;
    final segHalfPx = math.min(w / cols, h / rows) * 0.4;

    for (var i = 0; i <= cols; i++) {
      for (var j = 0; j <= rows; j++) {
        final x = _xMin + dx * i;
        final y = _yMin + dy * j;
        final s = slope(x, y);
        if (!s.isFinite) continue;
        // Convert math slope dy/dx to screen direction.
        const dxv = 1.0;
        final dyv = -s; // screen y inverted
        final mag = math.sqrt(dxv * dxv + dyv * dyv);
        final ux = dxv / mag;
        final uy = dyv / mag;
        final cx = xOf(x);
        final cy = yOf(y);
        canvas.drawLine(
          Offset(cx - ux * segHalfPx, cy - uy * segHalfPx),
          Offset(cx + ux * segHalfPx, cy + uy * segHalfPx),
          segPaint,
        );
      }
    }

    // Solution curve
    if (solution.isNotEmpty) {
      final p = Paint()
        ..color = BacPrepColors.error
        ..strokeWidth = 2.4
        ..style = PaintingStyle.stroke;
      final path = Path();
      var started = false;
      for (final pt in solution) {
        if (!pt.dy.isFinite) continue;
        final px = xOf(pt.dx);
        final py = yOf(pt.dy.clamp(_yMin - 1, _yMax + 1));
        if (!started) {
          path.moveTo(px, py);
          started = true;
        } else {
          path.lineTo(px, py);
        }
      }
      canvas.drawPath(path, p);
    }

    // Initial dot
    if (initial != null) {
      canvas.drawCircle(Offset(xOf(initial!.dx), yOf(initial!.dy)), 5, Paint()..color = BacPrepColors.error);
    }

    // Tick labels
    final tp = TextPainter(textDirection: TextDirection.ltr);
    void label(String s, Offset o) {
      tp.text = TextSpan(text: s, style: const TextStyle(fontSize: 10, color: BacPrepColors.textSecondary));
      tp.layout();
      tp.paint(canvas, o);
    }

    for (var i = _xMin.toInt(); i <= _xMax.toInt(); i++) {
      if (i == 0) continue;
      label('$i', Offset(xOf(i.toDouble()) - 4, yOf(0) + 2));
    }
    for (var j = _yMin.toInt(); j <= _yMax.toInt(); j++) {
      if (j == 0) continue;
      label('$j', Offset(xOf(0) + 4, yOf(j.toDouble()) - 6));
    }
  }

  @override
  bool shouldRepaint(covariant _FieldPainter oldDelegate) =>
      oldDelegate.solution != solution || oldDelegate.initial != initial;
}
