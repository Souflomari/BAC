import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Radioactive decay simulator (loi de décroissance N(t) = N₀·e^(-λt)).
///
/// Half-life t½ = ln 2 / λ. Sliders set N₀ and t½. Widget shows the decay
/// curve over time, with vertical markers at t½, 2·t½, 3·t½ and a moving
/// cursor synced to an animation controller. A discrete grid of dots in
/// the bottom panel illustrates the population: filled = undecayed, faded =
/// decayed atoms.
class NuclearDecaySimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const NuclearDecaySimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<NuclearDecaySimulatorWidget> createState() => _State();
}

class _State extends State<NuclearDecaySimulatorWidget>
    with SingleTickerProviderStateMixin {
  double _n0 = 1000;
  double _halfLife = 5.0; // s
  late AnimationController _controller;
  final _random = math.Random(42);

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 12),
      vsync: this,
    )..addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _lambda => math.log(2) / _halfLife;
  double get _tMax => 5 * _halfLife;
  double get _tNow => _controller.value * _tMax;
  double _n(double t) => _n0 * math.exp(-_lambda * t);

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
          _buildAtomGrid(),
          const SizedBox(height: Spacing.md),
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

  Widget _buildAtomGrid() {
    return Container(
      height: 100,
      padding: const EdgeInsets.all(Spacing.sm),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: CustomPaint(
        size: const Size(double.infinity, 84),
        painter: _AtomGridPainter(
          fraction: _n(_tNow) / _n0,
          random: _random,
        ),
      ),
    );
  }

  Widget _buildGraph() {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 200),
          painter: _CurvePainter(
            n: _n,
            n0: _n0,
            tMax: _tMax,
            tNow: _tNow,
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
            'λ = ${_lambda.toStringAsFixed(3)} s⁻¹',
            style: const TextStyle(fontWeight: FontWeight.w600, color: BacPrepColors.accent),
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
          _S(
            label: 'N₀',
            value: _n0,
            min: 100,
            max: 10000,
            divisions: 99,
            display: _n0.toStringAsFixed(0),
            onChanged: (v) => setState(() {
              _n0 = v;
              _reset();
            }),
          ),
          _S(
            label: 't½ (s)',
            value: _halfLife,
            min: 1,
            max: 20,
            divisions: 38,
            display: _halfLife.toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _halfLife = v;
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
          _D(label: 't (s)', value: _tNow.toStringAsFixed(1), color: BacPrepColors.physics),
          _D(label: 'N(t)', value: _n(_tNow).toStringAsFixed(0), color: BacPrepColors.error),
          _D(
            label: 'A (Bq)',
            value: (_lambda * _n(_tNow)).toStringAsFixed(0),
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
        SizedBox(width: 70, child: Text(label, style: const TextStyle(fontSize: 13))),
        Expanded(
          child: Slider(value: value, min: min, max: max, divisions: divisions, onChanged: onChanged),
        ),
        SizedBox(
          width: 64,
          child: Text(display, style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end),
        ),
      ],
    );
  }
}

class _D extends StatelessWidget {
  final String label;
  final String value;
  final Color color;
  const _D({required this.label, required this.value, required this.color});
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

class _AtomGridPainter extends CustomPainter {
  final double fraction;
  final math.Random random;

  _AtomGridPainter({required this.fraction, required this.random});

  @override
  void paint(Canvas canvas, Size size) {
    const cols = 60;
    const rows = 8;
    const dotR = 2.4;
    final cellW = size.width / cols;
    final cellH = size.height / rows;
    const aliveColor = BacPrepColors.physics;
    final decayedColor = BacPrepColors.locked.withValues(alpha: 0.4);
    const total = cols * rows;
    final aliveCount = (total * fraction).round();

    // Deterministic shuffle: each atom has an index; ones with index < aliveCount alive.
    // We seed a permutation once via the shared random — rebuild on each repaint
    // is fine because the mapping from index to position is fixed per session.
    final perm = List<int>.generate(total, (i) => i)..shuffle(math.Random(42));

    for (var i = 0; i < total; i++) {
      final id = perm[i];
      final col = id % cols;
      final row = id ~/ cols;
      final cx = cellW * (col + 0.5);
      final cy = cellH * (row + 0.5);
      final alive = i < aliveCount;
      canvas.drawCircle(
        Offset(cx, cy),
        dotR,
        Paint()..color = alive ? aliveColor : decayedColor,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _AtomGridPainter oldDelegate) =>
      oldDelegate.fraction != fraction;
}

class _CurvePainter extends CustomPainter {
  final double Function(double) n;
  final double n0;
  final double tMax;
  final double tNow;
  final double halfLife;

  _CurvePainter({
    required this.n,
    required this.n0,
    required this.tMax,
    required this.tNow,
    required this.halfLife,
  });

  @override
  void paint(Canvas canvas, Size size) {
    const left = 44.0;
    const right = 12.0;
    const top = 12.0;
    const bottom = 26.0;
    final w = size.width - left - right;
    final h = size.height - top - bottom;

    double xOf(double t) => left + (t / tMax) * w;
    double yOf(double v) => top + (1 - v / n0) * h;

    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1.2;
    canvas.drawLine(const Offset(left, top), Offset(left, top + h), axis);
    canvas.drawLine(Offset(left, top + h), Offset(left + w, top + h), axis);

    // Half-life dashed verticals
    final dash = Paint()
      ..color = BacPrepColors.locked.withValues(alpha: 0.6)
      ..strokeWidth = 0.8;
    for (var i = 1; i <= 4; i++) {
      final tH = halfLife * i;
      if (tH > tMax) break;
      final x = xOf(tH);
      var y = top.toDouble();
      while (y < top + h) {
        final yEnd = math.min(y + 4, top + h);
        canvas.drawLine(Offset(x, y), Offset(x, yEnd), dash);
        y += 8;
      }
    }
    // N₀/2 horizontal dashed
    final yH = yOf(n0 / 2);
    var x = left.toDouble();
    while (x < left + w) {
      final xEnd = math.min(x + 4, left + w);
      canvas.drawLine(Offset(x, yH), Offset(xEnd, yH), dash);
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
      final v = n(t);
      final px = xOf(t);
      final py = yOf(v);
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
      Offset(xOf(tNow), yOf(n(tNow))),
      4.5,
      Paint()..color = BacPrepColors.success,
    );

    // Labels
    final tp = TextPainter(textDirection: TextDirection.ltr);
    void label(String s, Offset o, {Color? c}) {
      tp.text = TextSpan(text: s, style: TextStyle(fontSize: 10, color: c ?? BacPrepColors.textSecondary));
      tp.layout();
      tp.paint(canvas, o);
    }

    label('N(t)', const Offset(8, 2), c: BacPrepColors.physics);
    label('N₀', const Offset(left - 22, top - 4));
    label('N₀/2', Offset(left - 28, yH - 6));
    label('t (s)', Offset(left + w - 28, top + h + 8));
  }

  @override
  bool shouldRepaint(covariant _CurvePainter oldDelegate) =>
      oldDelegate.tNow != tNow || oldDelegate.tMax != tMax || oldDelegate.n0 != n0 || oldDelegate.halfLife != halfLife;
}
