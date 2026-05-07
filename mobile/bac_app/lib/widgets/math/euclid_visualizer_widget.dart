import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Euclid algorithm visualizer for PGCD and Bézout.
///
/// Shows step-by-step:
///   a = q·b + r
///   (a, b) → (b, r) until r = 0
///   PGCD = last non-zero remainder
/// Bézout coefficients (u, v) with a·u + b·v = pgcd reconstructed by
/// back-substitution after the forward pass.
class EuclidVisualizerWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const EuclidVisualizerWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<EuclidVisualizerWidget> createState() => _State();
}

class _State extends State<EuclidVisualizerWidget> {
  int _a = 252;
  int _b = 105;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  /// Forward pass — list of (a, b, q, r) tuples.
  List<({int a, int b, int q, int r})> _forward() {
    final steps = <({int a, int b, int q, int r})>[];
    var a = _a, b = _b;
    if (b == 0) return steps;
    while (b != 0) {
      final q = a ~/ b;
      final r = a - q * b;
      steps.add((a: a, b: b, q: q, r: r));
      a = b;
      b = r;
    }
    return steps;
  }

  int get _gcd {
    final s = _forward();
    if (s.isEmpty) return _a.abs();
    return s.last.b;
  }

  /// Bézout coefficients: returns (gcd, u, v) such that a·u + b·v = gcd.
  ({int gcd, int u, int v}) _bezout() {
    var (oldR, r) = (_a, _b);
    var (oldS, s) = (1, 0);
    var (oldT, t) = (0, 1);
    while (r != 0) {
      final q = oldR ~/ r;
      final tmpR = oldR - q * r;
      oldR = r;
      r = tmpR;
      final tmpS = oldS - q * s;
      oldS = s;
      s = tmpS;
      final tmpT = oldT - q * t;
      oldT = t;
      t = tmpT;
    }
    return (gcd: oldR, u: oldS, v: oldT);
  }

  void _submit() {
    if (_hasSubmitted) return;
    final value = int.tryParse(_answerController.text.trim());
    if (value != null) {
      setState(() => _hasSubmitted = true);
      widget.onAnswer(value);
    }
  }

  @override
  Widget build(BuildContext context) {
    final steps = _forward();
    final bz = _bezout();
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
          _buildBars(steps),
          const SizedBox(height: Spacing.md),
          _buildSteps(steps),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildBezout(bz),
          const SizedBox(height: Spacing.md),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildBars(List<({int a, int b, int q, int r})> steps) {
    return Container(
      height: 160,
      padding: const EdgeInsets.all(Spacing.sm),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: CustomPaint(
        size: const Size(double.infinity, 144),
        painter: _BarsPainter(steps: steps, a: _a, b: _b),
      ),
    );
  }

  Widget _buildSteps(List<({int a, int b, int q, int r})> steps) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Algorithme d\'Euclide', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
          const SizedBox(height: Spacing.sm),
          for (final s in steps)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 2),
              child: Text(
                '${s.a} = ${s.q} × ${s.b} + ${s.r}',
                style: TextStyle(
                  fontSize: 14,
                  fontFamily: 'monospace',
                  color: s.r == 0 ? BacPrepColors.error : BacPrepColors.textPrimary,
                  fontWeight: s.r == 0 ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
          const SizedBox(height: Spacing.sm),
          Text(
            'PGCD($_a, $_b) = $_gcd',
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: BacPrepColors.error),
          ),
        ],
      ),
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
          Row(
            children: [
              const SizedBox(width: 30, child: Text('a', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600))),
              Expanded(
                child: Slider(
                  value: _a.toDouble(),
                  min: 1,
                  max: 999,
                  divisions: 998,
                  onChanged: (v) => setState(() => _a = v.round()),
                ),
              ),
              SizedBox(width: 56, child: Text('$_a', style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
            ],
          ),
          Row(
            children: [
              const SizedBox(width: 30, child: Text('b', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600))),
              Expanded(
                child: Slider(
                  value: _b.toDouble(),
                  min: 1,
                  max: 999,
                  divisions: 998,
                  onChanged: (v) => setState(() => _b = v.round()),
                ),
              ),
              SizedBox(width: 56, child: Text('$_b', style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBezout(({int gcd, int u, int v}) bz) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.physics.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.physics.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Identité de Bézout', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
          const SizedBox(height: Spacing.sm),
          Text(
            '$_a × ${bz.u} + $_b × ${bz.v} = ${_a * bz.u + _b * bz.v}',
            style: const TextStyle(fontFamily: 'monospace', fontSize: 14),
          ),
          const SizedBox(height: 4),
          Text(
            'u = ${bz.u},  v = ${bz.v}',
            style: const TextStyle(fontSize: 13, color: BacPrepColors.physics, fontWeight: FontWeight.w600),
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
              'PGCD = $_gcd',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: BacPrepColors.success),
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
              hintText: 'PGCD',
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

class _BarsPainter extends CustomPainter {
  final List<({int a, int b, int q, int r})> steps;
  final int a;
  final int b;

  _BarsPainter({required this.steps, required this.a, required this.b});

  @override
  void paint(Canvas canvas, Size size) {
    final maxV = a > b ? a : b;
    const pad = 8.0;
    final w = size.width - pad * 2;
    final rowH = (size.height - pad * 2) / (steps.length + 1).clamp(1, 10);
    double xOf(int v) => pad + (v / maxV) * w;

    final tp = TextPainter(textDirection: TextDirection.ltr);

    // Initial bars: a (red) and b (blue)
    var y = pad;
    void drawBar(int v, Color c, String label) {
      final rect = Rect.fromLTWH(pad, y, xOf(v) - pad, rowH * 0.8);
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(3)),
        Paint()..color = c,
      );
      tp.text = TextSpan(
        text: label,
        style: const TextStyle(fontSize: 11, color: BacPrepColors.textPrimary, fontWeight: FontWeight.w600),
      );
      tp.layout();
      tp.paint(canvas, Offset(rect.right + 4, y + 2));
      y += rowH;
    }

    // Original
    drawBar(a, BacPrepColors.error.withValues(alpha: 0.65), 'a = $a');
    drawBar(b, BacPrepColors.physics.withValues(alpha: 0.65), 'b = $b');

    // Show how a is divided by b: q copies of b plus a remainder r
    if (steps.isNotEmpty) {
      final s = steps.first;
      final segPx = xOf(s.b) - pad;
      final stripeY = y;
      // Stripes for q copies of b
      for (var i = 0; i < s.q; i++) {
        final rect = Rect.fromLTWH(pad + segPx * i, stripeY, segPx - 1, rowH * 0.8);
        canvas.drawRect(rect, Paint()..color = BacPrepColors.physics.withValues(alpha: 0.4));
      }
      // Remainder r in red
      final rectR = Rect.fromLTWH(pad + segPx * s.q, stripeY, xOf(s.r) - pad, rowH * 0.8);
      if (s.r > 0) {
        canvas.drawRect(rectR, Paint()..color = BacPrepColors.accent.withValues(alpha: 0.7));
      }
      tp.text = TextSpan(
        text: '${s.q}·b + r (r = ${s.r})',
        style: const TextStyle(fontSize: 11, color: BacPrepColors.textPrimary),
      );
      tp.layout();
      tp.paint(canvas, Offset(pad + segPx * s.q + (s.r > 0 ? rectR.width : 0) + 6, stripeY + 2));
    }
  }

  @override
  bool shouldRepaint(covariant _BarsPainter oldDelegate) =>
      oldDelegate.a != a || oldDelegate.b != b;
}
