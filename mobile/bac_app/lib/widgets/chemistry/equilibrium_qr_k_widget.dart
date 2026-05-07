import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Quotient de réaction Qr vs constante d'équilibre K.
///
/// Models a 1:1 reaction A + B ⇌ C + D. User sets initial concentrations and
/// log₁₀(K). Widget computes the equilibrium concentrations by solving the
/// quadratic in the extent x, displays Qr_initial and the direction of
/// evolution, and animates the system between the initial and equilibrium
/// states using a bar chart.
class EquilibriumQrKWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const EquilibriumQrKWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<EquilibriumQrKWidget> createState() => _EquilibriumQrKWidgetState();
}

class _EquilibriumQrKWidgetState extends State<EquilibriumQrKWidget>
    with SingleTickerProviderStateMixin {
  double _a0 = 0.20;
  double _b0 = 0.20;
  double _c0 = 0.05;
  double _d0 = 0.05;
  double _logK = 2.0; // K = 10²
  late AnimationController _controller;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 5),
      vsync: this,
    )..addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _k => math.pow(10, _logK).toDouble();
  double get _qrInitial =>
      (_a0 * _b0 < 1e-12) ? double.infinity : (_c0 * _d0) / (_a0 * _b0);

  /// Solves K(A₀-x)(B₀-x) = (C₀+x)(D₀+x) for the physically valid x.
  double _extent() {
    final k = _k;
    final a = k - 1;
    final b = -(k * (_a0 + _b0) + (_c0 + _d0));
    final c = k * _a0 * _b0 - _c0 * _d0;

    if (a.abs() < 1e-9) {
      if (b.abs() < 1e-9) return 0;
      return -c / b;
    }
    final disc = b * b - 4 * a * c;
    if (disc < 0) return 0;
    final sq = math.sqrt(disc);
    final x1 = (-b + sq) / (2 * a);
    final x2 = (-b - sq) / (2 * a);
    final maxForward = math.min(_a0, _b0);
    final maxReverse = -math.min(_c0, _d0);
    bool valid(double x) => x >= maxReverse - 1e-9 && x <= maxForward + 1e-9;
    if (valid(x1) && !valid(x2)) return x1;
    if (valid(x2) && !valid(x1)) return x2;
    if (valid(x1) && valid(x2)) {
      // Pick the root in the direction predicted by Qr vs K.
      final preferForward = _qrInitial < _k;
      if (preferForward) return x1 > 0 ? x1 : x2;
      return x1 < 0 ? x1 : x2;
    }
    return 0;
  }

  ({double a, double b, double c, double d}) _conc(double frac) {
    final xEq = _extent();
    final x = xEq * frac;
    return (
      a: _a0 - x,
      b: _b0 - x,
      c: _c0 + x,
      d: _d0 + x,
    );
  }

  void _toggle() {
    setState(() {
      if (_controller.isAnimating) {
        _controller.stop();
      } else {
        if (_controller.value >= 1.0) _controller.reset();
        _controller.forward();
      }
    });
  }

  void _reset() {
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
    final qr = _qrInitial;
    final direction = qr < _k
        ? 'Qr < K  →  sens direct (formation de C, D)'
        : qr > _k
            ? 'Qr > K  ←  sens inverse (formation de A, B)'
            : 'Qr = K  ⇌  équilibre';
    final directionColor = qr < _k
        ? BacPrepColors.success
        : qr > _k
            ? BacPrepColors.error
            : BacPrepColors.accent;

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
          Container(
            padding: const EdgeInsets.symmetric(horizontal: Spacing.md, vertical: 10),
            decoration: BoxDecoration(
              color: directionColor.withValues(alpha: 0.10),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: directionColor.withValues(alpha: 0.3)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'A + B  ⇌  C + D',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                ),
                const SizedBox(width: 12),
                Text(
                  direction,
                  style: TextStyle(fontSize: 13, color: directionColor, fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
          const SizedBox(height: Spacing.md),
          _buildBars(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildDataDisplay(),
          const SizedBox(height: Spacing.md),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildBars() {
    final c = _conc(_controller.value);
    return Container(
      height: 200,
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: CustomPaint(
        size: const Size(double.infinity, 170),
        painter: _BarsPainter(a: c.a, b: c.b, cConc: c.c, d: c.d),
      ),
    );
  }

  Widget _buildControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton.filled(icon: const Icon(Icons.refresh), onPressed: _reset),
        const SizedBox(width: Spacing.md),
        IconButton.filled(
          icon: Icon(_controller.isAnimating ? Icons.pause : Icons.play_arrow),
          iconSize: 36,
          onPressed: _toggle,
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
        children: [
          _Slider(
            label: '[A]₀',
            value: _a0,
            min: 0.001,
            max: 1.0,
            divisions: 100,
            display: _a0.toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _a0 = v;
              _reset();
            }),
          ),
          _Slider(
            label: '[B]₀',
            value: _b0,
            min: 0.001,
            max: 1.0,
            divisions: 100,
            display: _b0.toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _b0 = v;
              _reset();
            }),
          ),
          _Slider(
            label: '[C]₀',
            value: _c0,
            min: 0.0,
            max: 1.0,
            divisions: 100,
            display: _c0.toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _c0 = v;
              _reset();
            }),
          ),
          _Slider(
            label: '[D]₀',
            value: _d0,
            min: 0.0,
            max: 1.0,
            divisions: 100,
            display: _d0.toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _d0 = v;
              _reset();
            }),
          ),
          _Slider(
            label: 'log K',
            value: _logK,
            min: -4,
            max: 6,
            divisions: 100,
            display: _logK.toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _logK = v;
              _reset();
            }),
          ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay() {
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
          _DataItem(
            label: 'Qr (initial)',
            value: _qrInitial.isFinite ? _qrInitial.toStringAsExponential(2) : '∞',
            color: BacPrepColors.error,
          ),
          _DataItem(
            label: 'K',
            value: _k.toStringAsExponential(2),
            color: BacPrepColors.success,
          ),
          _DataItem(
            label: 'x_éq',
            value: _extent().toStringAsFixed(3),
            color: BacPrepColors.accent,
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
              'x_éq = ${_extent().toStringAsFixed(3)}',
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
              hintText: 'x à l\'équilibre',
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
        SizedBox(width: 60, child: Text(label, style: const TextStyle(fontSize: 13))),
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
        Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color)),
      ],
    );
  }
}

class _BarsPainter extends CustomPainter {
  final double a;
  final double b;
  final double cConc;
  final double d;

  _BarsPainter({required this.a, required this.b, required this.cConc, required this.d});

  @override
  void paint(Canvas canvas, Size size) {
    const labels = ['A', 'B', 'C', 'D'];
    final values = [a, b, cConc, d];
    final colors = [
      BacPrepColors.error,
      BacPrepColors.physics,
      BacPrepColors.success,
      BacPrepColors.accent,
    ];
    final maxV = values.fold<double>(0.001, (m, v) => v > m ? v : m);

    final n = values.length;
    const pad = 24.0;
    final colW = (size.width - pad * 2) / n;
    final barW = colW * 0.55;
    final baseY = size.height - 24;
    final maxH = size.height - 40;

    final tp = TextPainter(textDirection: TextDirection.ltr);
    for (var i = 0; i < n; i++) {
      final cx = pad + colW * (i + 0.5);
      final v = values[i];
      final h = (v / maxV) * maxH;
      final rect = Rect.fromLTWH(cx - barW / 2, baseY - h, barW, h);
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(4)),
        Paint()..color = colors[i].withValues(alpha: 0.85),
      );

      tp.text = TextSpan(
        text: labels[i],
        style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: colors[i]),
      );
      tp.layout();
      tp.paint(canvas, Offset(cx - tp.width / 2, baseY + 4));

      tp.text = TextSpan(
        text: v.toStringAsFixed(2),
        style: const TextStyle(fontSize: 11, color: BacPrepColors.textSecondary),
      );
      tp.layout();
      tp.paint(canvas, Offset(cx - tp.width / 2, baseY - h - 14));
    }

    // Baseline
    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1;
    canvas.drawLine(Offset(pad - 4, baseY), Offset(size.width - pad + 4, baseY), axis);
  }

  @override
  bool shouldRepaint(covariant _BarsPainter oldDelegate) =>
      oldDelegate.a != a || oldDelegate.b != b || oldDelegate.cConc != cConc || oldDelegate.d != d;
}
