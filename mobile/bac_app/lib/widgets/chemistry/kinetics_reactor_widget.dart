import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// First-order kinetics reactor: A → produits, with rate v = -d[A]/dt = k[A].
///
/// Solution: [A](t) = [A]₀ · exp(-k·t). Half-life t½ = ln 2 / k.
/// Sliders: [A]₀, k, T (temperature, modulating k via a simplified Arrhenius
/// factor exp(Ea/R · (1/T_ref - 1/T))).
class KineticsReactorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const KineticsReactorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<KineticsReactorWidget> createState() => _KineticsReactorWidgetState();
}

class _KineticsReactorWidgetState extends State<KineticsReactorWidget>
    with SingleTickerProviderStateMixin {
  double _a0 = 0.10;        // mol/L
  double _kRef = 0.05;      // s⁻¹ at T_ref
  double _tempC = 25;       // °C
  static const double _eaOverR = 5000; // K (≈ 40 kJ/mol)
  static const double _tRefK = 298.0;
  late AnimationController _controller;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 10),
      vsync: this,
    )..addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _tK => _tempC + 273.15;

  /// Effective rate constant after Arrhenius scaling.
  double get _k {
    final factor = math.exp(_eaOverR * (1 / _tRefK - 1 / _tK));
    return _kRef * factor;
  }

  /// Total simulated time on the x-axis: 5·t½ to see decay clearly.
  double get _tMax => 5 * math.log(2) / math.max(_k, 1e-6);

  /// Current simulated time.
  double get _tNow => _controller.value * _tMax;

  /// [A](t)
  double _conc(double t) => _a0 * math.exp(-_k * t);

  /// v(t) = k · [A](t) — instantaneous rate of disappearance of A.
  double _rate(double t) => _k * _conc(t);

  double get _halfLife => math.log(2) / math.max(_k, 1e-9);

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

  void _reset() => _controller.reset();

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
          _buildGraph(),
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

  Widget _buildGraph() {
    return Container(
      height: 240,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 240),
          painter: _CurvePainter(
            conc: _conc,
            tNow: _tNow,
            tMax: _tMax,
            a0: _a0,
            halfLife: _halfLife,
          ),
        ),
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
        const SizedBox(width: Spacing.md),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: BacPrepColors.accent.withValues(alpha: 0.12),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            't½ = ${_halfLife.toStringAsFixed(1)} s',
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.accent,
            ),
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
            label: '[A]₀ (mol/L)',
            value: _a0,
            min: 0.01,
            max: 1.0,
            divisions: 99,
            display: _a0.toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _a0 = v;
              _reset();
            }),
          ),
          _Slider(
            label: 'k (réf, s⁻¹)',
            value: _kRef,
            min: 0.005,
            max: 0.5,
            divisions: 99,
            display: _kRef.toStringAsFixed(3),
            onChanged: (v) => setState(() {
              _kRef = v;
              _reset();
            }),
          ),
          _Slider(
            label: 'T (°C)',
            value: _tempC,
            min: 0,
            max: 100,
            divisions: 100,
            display: _tempC.toStringAsFixed(0),
            onChanged: (v) => setState(() {
              _tempC = v;
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
          _DataItem(label: 't (s)', value: _tNow.toStringAsFixed(1), color: BacPrepColors.physics),
          _DataItem(
            label: '[A] (mol/L)',
            value: _conc(_tNow).toStringAsFixed(3),
            color: BacPrepColors.error,
          ),
          _DataItem(
            label: 'v (mol/L/s)',
            value: _rate(_tNow).toStringAsExponential(2),
            color: BacPrepColors.success,
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
              't½ = ${_halfLife.toStringAsFixed(2)} s',
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
              hintText: 't½ (s)',
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
        SizedBox(width: 110, child: Text(label, style: const TextStyle(fontSize: 13))),
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

class _CurvePainter extends CustomPainter {
  final double Function(double) conc;
  final double tNow;
  final double tMax;
  final double a0;
  final double halfLife;

  _CurvePainter({
    required this.conc,
    required this.tNow,
    required this.tMax,
    required this.a0,
    required this.halfLife,
  });

  @override
  void paint(Canvas canvas, Size size) {
    const left = 44.0;
    const right = 12.0;
    const top = 14.0;
    const bottom = 26.0;
    final w = size.width - left - right;
    final h = size.height - top - bottom;

    double xOf(double t) => left + (t / tMax) * w;
    double yOf(double c) => top + (1 - c / a0) * h;

    // Axes
    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1.2;
    canvas.drawLine(const Offset(left, top), Offset(left, top + h), axis);
    canvas.drawLine(Offset(left, top + h), Offset(left + w, top + h), axis);

    // Half-life markers (vertical dashed at t½, 2·t½, 3·t½)
    final dashPaint = Paint()
      ..color = BacPrepColors.locked.withValues(alpha: 0.6)
      ..strokeWidth = 0.8;
    for (var i = 1; i <= 4; i++) {
      final tHalf = i * halfLife;
      if (tHalf > tMax) break;
      final x = xOf(tHalf);
      var y = top.toDouble();
      while (y < top + h) {
        final yEnd = math.min(y + 4, top + h);
        canvas.drawLine(Offset(x, y), Offset(x, yEnd), dashPaint);
        y += 8;
      }
    }

    // [A]₀/2 horizontal dashed line
    final yHalf = yOf(a0 / 2);
    var x = left.toDouble();
    while (x < left + w) {
      final xEnd = math.min(x + 4, left + w);
      canvas.drawLine(Offset(x, yHalf), Offset(xEnd, yHalf), dashPaint);
      x += 8;
    }

    // Curve
    final curve = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 2.4
      ..style = PaintingStyle.stroke;
    final path = Path();
    const samples = 200;
    for (var i = 0; i <= samples; i++) {
      final t = tMax * i / samples;
      final c = conc(t);
      final px = xOf(t);
      final py = yOf(c);
      if (i == 0) {
        path.moveTo(px, py);
      } else {
        path.lineTo(px, py);
      }
    }
    canvas.drawPath(path, curve);

    // Cursor
    final cursor = Paint()..color = BacPrepColors.success..strokeWidth = 2;
    canvas.drawLine(Offset(xOf(tNow), top), Offset(xOf(tNow), top + h), cursor);
    canvas.drawCircle(
      Offset(xOf(tNow), yOf(conc(tNow))),
      4.5,
      Paint()..color = BacPrepColors.success,
    );

    // Labels
    final tp = TextPainter(textDirection: TextDirection.ltr);
    void label(String s, Offset o, {Color? c, double size = 10}) {
      tp.text = TextSpan(text: s, style: TextStyle(fontSize: size, color: c ?? BacPrepColors.textSecondary));
      tp.layout();
      tp.paint(canvas, o);
    }

    label('[A]', const Offset(8, top - 2), c: BacPrepColors.physics);
    label('[A]₀ = ${a0.toStringAsFixed(2)}', const Offset(left + 6, top - 2), c: BacPrepColors.physics);
    label('[A]₀/2', Offset(left + 4, yHalf - 12));
    label('t (s)', Offset(left + w - 28, top + h + 8));
    label('0', Offset(left - 6, top + h + 4));
    label(tMax.toStringAsFixed(0), Offset(left + w - 8, top + h + 4));
  }

  @override
  bool shouldRepaint(covariant _CurvePainter oldDelegate) =>
      oldDelegate.tNow != tNow ||
      oldDelegate.tMax != tMax ||
      oldDelegate.a0 != a0 ||
      oldDelegate.halfLife != halfLife;
}
