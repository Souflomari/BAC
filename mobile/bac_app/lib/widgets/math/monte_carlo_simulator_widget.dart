import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Monte-Carlo simulator: repeated Bernoulli trials → loi binomiale.
///
/// Each trial draws a sample from B(n, p). Histogram of observed counts of
/// successes accumulates over the run; the theoretical PMF curve overlays.
class MonteCarloSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const MonteCarloSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<MonteCarloSimulatorWidget> createState() => _State();
}

class _State extends State<MonteCarloSimulatorWidget>
    with SingleTickerProviderStateMixin {
  int _n = 10;
  double _p = 0.5;
  late List<int> _hist; // length n+1
  int _totalTrials = 0;
  late Ticker _ticker;
  bool _running = false;
  final _rand = math.Random();

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _hist = List.filled(_n + 1, 0);
    _ticker = createTicker((_) => _step(50));
  }

  @override
  void dispose() {
    _ticker.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _step(int batchSize) {
    setState(() {
      for (var b = 0; b < batchSize; b++) {
        var k = 0;
        for (var i = 0; i < _n; i++) {
          if (_rand.nextDouble() < _p) k++;
        }
        _hist[k]++;
        _totalTrials++;
      }
    });
  }

  void _toggle() {
    setState(() {
      _running = !_running;
      if (_running) {
        _ticker.start();
      } else {
        _ticker.stop();
      }
    });
  }

  void _resetData() {
    _ticker.stop();
    setState(() {
      _hist = List.filled(_n + 1, 0);
      _totalTrials = 0;
      _running = false;
    });
  }

  static int _binom(int n, int k) {
    if (k < 0 || k > n) return 0;
    var r = 1;
    for (var i = 1; i <= k; i++) {
      r = r * (n - i + 1) ~/ i;
    }
    return r;
  }

  double _theoreticalPmf(int k) =>
      _binom(_n, k) * math.pow(_p, k) * math.pow(1 - _p, _n - k).toDouble();

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
    final mean = _n * _p;
    final variance = _n * _p * (1 - _p);
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
          _buildHistogram(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildDataDisplay(mean, variance),
          const SizedBox(height: Spacing.md),
          _buildAnswerInput(mean),
        ],
      ),
    );
  }

  Widget _buildHistogram() {
    return Container(
      height: 240,
      padding: const EdgeInsets.all(Spacing.sm),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: CustomPaint(
        size: const Size(double.infinity, 220),
        painter: _HistPainter(
          hist: _hist,
          total: _totalTrials,
          theoreticalPmf: _theoreticalPmf,
          n: _n,
        ),
      ),
    );
  }

  Widget _buildControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton.filled(icon: const Icon(Icons.refresh), onPressed: _resetData),
        const SizedBox(width: Spacing.md),
        IconButton.filled(
          icon: Icon(_running ? Icons.pause : Icons.play_arrow),
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
            'Essais : $_totalTrials',
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
          Row(
            children: [
              const SizedBox(width: 70, child: Text('n', style: TextStyle(fontSize: 13))),
              Expanded(
                child: Slider(
                  value: _n.toDouble(),
                  min: 2,
                  max: 30,
                  divisions: 28,
                  onChanged: (v) => setState(() {
                    _n = v.round();
                    _hist = List.filled(_n + 1, 0);
                    _totalTrials = 0;
                  }),
                ),
              ),
              SizedBox(width: 56, child: Text('$_n', style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
            ],
          ),
          Row(
            children: [
              const SizedBox(width: 70, child: Text('p', style: TextStyle(fontSize: 13))),
              Expanded(
                child: Slider(
                  value: _p,
                  min: 0,
                  max: 1,
                  divisions: 100,
                  onChanged: (v) => setState(() {
                    _p = v;
                    _resetData();
                  }),
                ),
              ),
              SizedBox(width: 56, child: Text(_p.toStringAsFixed(2), style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay(double mean, double variance) {
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
          _D(label: 'E(X) = np', value: mean.toStringAsFixed(2), color: BacPrepColors.physics),
          _D(label: 'V(X) = np(1−p)', value: variance.toStringAsFixed(2), color: BacPrepColors.error),
          _D(label: 'σ(X)', value: math.sqrt(variance).toStringAsFixed(2), color: BacPrepColors.success),
        ],
      ),
    );
  }

  Widget _buildAnswerInput(double mean) {
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
              'E(X) = np = ${mean.toStringAsFixed(2)}',
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
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            decoration: InputDecoration(
              hintText: 'E(X)',
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

class _HistPainter extends CustomPainter {
  final List<int> hist;
  final int total;
  final double Function(int k) theoreticalPmf;
  final int n;

  _HistPainter({
    required this.hist,
    required this.total,
    required this.theoreticalPmf,
    required this.n,
  });

  @override
  void paint(Canvas canvas, Size size) {
    const left = 28.0;
    const right = 8.0;
    const top = 12.0;
    const bottom = 24.0;
    final w = size.width - left - right;
    final h = size.height - top - bottom;

    // Find max for scaling: max of theoretical pmf and observed frequency.
    var maxF = 0.05;
    for (var k = 0; k <= n; k++) {
      final th = theoreticalPmf(k);
      if (th > maxF) maxF = th;
      final obs = total > 0 ? hist[k] / total : 0;
      if (obs > maxF) maxF = obs.toDouble();
    }
    maxF *= 1.15;

    final colW = w / (n + 1);
    final barW = colW * 0.7;

    final tp = TextPainter(textDirection: TextDirection.ltr);
    void label(String s, Offset o, {Color? c}) {
      tp.text = TextSpan(text: s, style: TextStyle(fontSize: 10, color: c ?? BacPrepColors.textSecondary));
      tp.layout();
      tp.paint(canvas, o);
    }

    // Axes
    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1;
    canvas.drawLine(const Offset(left, top), Offset(left, top + h), axis);
    canvas.drawLine(Offset(left, top + h), Offset(left + w, top + h), axis);

    // Theoretical PMF as a polyline
    final pmfPaint = Paint()
      ..color = BacPrepColors.error
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;
    final path = Path();
    for (var k = 0; k <= n; k++) {
      final x = left + colW * (k + 0.5);
      final y = top + h - (theoreticalPmf(k) / maxF) * h;
      if (k == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
      // Marker
      canvas.drawCircle(Offset(x, y), 3, Paint()..color = BacPrepColors.error);
    }
    canvas.drawPath(path, pmfPaint);

    // Observed bars
    for (var k = 0; k <= n; k++) {
      final freq = total > 0 ? hist[k] / total : 0;
      final hPx = (freq / maxF) * h;
      final cx = left + colW * (k + 0.5);
      final rect = Rect.fromLTWH(cx - barW / 2, top + h - hPx, barW, hPx);
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(2)),
        Paint()..color = BacPrepColors.physics.withValues(alpha: 0.55),
      );
      // x-tick label
      label('$k', Offset(cx - 4, top + h + 4));
    }

    // Y-axis labels
    label(maxF.toStringAsFixed(2), const Offset(2, top - 4));
    label('0', Offset(left - 12, top + h - 6));
    label('k', Offset(left + w - 4, top + h + 4));
  }

  @override
  bool shouldRepaint(covariant _HistPainter oldDelegate) =>
      oldDelegate.total != total || oldDelegate.n != n;
}
