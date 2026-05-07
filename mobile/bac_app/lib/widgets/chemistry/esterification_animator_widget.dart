import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Estérification: acide carboxylique + alcool ⇌ ester + eau.
///
/// Stoichiometry 1:1:1:1 with constant K. Computes equilibrium extent x_eq
/// from the quadratic in x, then animates evolution between initial state
/// and equilibrium. Sliders set initial moles and K (rendement increases
/// with K and with the use of excess alcohol).
class EsterificationAnimatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const EsterificationAnimatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<EsterificationAnimatorWidget> createState() => _State();
}

class _State extends State<EsterificationAnimatorWidget>
    with SingleTickerProviderStateMixin {
  double _nAcid = 1.0;   // mol
  double _nAlcohol = 1.0; // mol
  double _k = 4.0;       // typical Hartman rendement K ≈ 4 for primary
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

  /// Solve K(nA0 − x)(nB0 − x) = x² for the smaller positive root.
  double _xEq() {
    final a = _k - 1;
    final b = -_k * (_nAcid + _nAlcohol);
    final c = _k * _nAcid * _nAlcohol;
    if (a.abs() < 1e-9) return -c / b;
    final disc = b * b - 4 * a * c;
    if (disc < 0) return 0;
    final sq = math.sqrt(disc);
    final x1 = (-b - sq) / (2 * a);
    final x2 = (-b + sq) / (2 * a);
    final maxX = math.min(_nAcid, _nAlcohol);
    bool valid(double x) => x > -1e-9 && x < maxX + 1e-9;
    if (valid(x1)) return x1;
    if (valid(x2)) return x2;
    return 0;
  }

  ({double acid, double alcohol, double ester, double water}) _state(double frac) {
    final x = _xEq() * frac;
    return (
      acid: _nAcid - x,
      alcohol: _nAlcohol - x,
      ester: x,
      water: x,
    );
  }

  double get _yieldPct {
    final limiting = math.min(_nAcid, _nAlcohol);
    if (limiting < 1e-9) return 0;
    return (_xEq() / limiting) * 100;
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
    final s = _state(_controller.value);
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
            padding: const EdgeInsets.symmetric(vertical: 6, horizontal: Spacing.md),
            decoration: BoxDecoration(
              color: BacPrepColors.physics.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Text(
                'R-COOH + R\'-OH  ⇌  R-COO-R\' + H₂O',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
              ),
            ),
          ),
          const SizedBox(height: Spacing.md),
          _buildBars(s),
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

  Widget _buildBars(({double acid, double alcohol, double ester, double water}) s) {
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
        painter: _BarsPainter(
          acid: s.acid,
          alcohol: s.alcohol,
          ester: s.ester,
          water: s.water,
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
            'η = ${_yieldPct.toStringAsFixed(1)} %',
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
            label: 'n(acide) (mol)',
            value: _nAcid,
            min: 0.1,
            max: 5.0,
            divisions: 49,
            display: _nAcid.toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _nAcid = v;
              _reset();
            }),
          ),
          _S(
            label: 'n(alcool) (mol)',
            value: _nAlcohol,
            min: 0.1,
            max: 5.0,
            divisions: 49,
            display: _nAlcohol.toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _nAlcohol = v;
              _reset();
            }),
          ),
          _S(
            label: 'K',
            value: _k,
            min: 0.5,
            max: 30,
            divisions: 60,
            display: _k.toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _k = v;
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
          _D(label: 'x_éq (mol)', value: _xEq().toStringAsFixed(3), color: BacPrepColors.success),
          _D(label: 'rendement', value: '${_yieldPct.toStringAsFixed(1)} %', color: BacPrepColors.accent),
          _D(label: 'K', value: _k.toStringAsFixed(2), color: BacPrepColors.physics),
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
              'Rendement = ${_yieldPct.toStringAsFixed(1)} %',
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
              hintText: 'Rendement (%)',
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
        SizedBox(width: 110, child: Text(label, style: const TextStyle(fontSize: 13))),
        Expanded(child: Slider(value: value, min: min, max: max, divisions: divisions, onChanged: onChanged)),
        SizedBox(width: 56, child: Text(display, style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
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

class _BarsPainter extends CustomPainter {
  final double acid;
  final double alcohol;
  final double ester;
  final double water;
  _BarsPainter({required this.acid, required this.alcohol, required this.ester, required this.water});

  @override
  void paint(Canvas canvas, Size size) {
    const labels = ['acide', 'alcool', 'ester', 'eau'];
    final values = [acid, alcohol, ester, water];
    final colors = [
      BacPrepColors.error,
      BacPrepColors.physics,
      BacPrepColors.success,
      const Color(0xFF1976D2),
    ];
    final maxV = values.fold<double>(0.001, (m, v) => v > m ? v : m);
    const pad = 24.0;
    final colW = (size.width - pad * 2) / 4;
    final barW = colW * 0.55;
    final baseY = size.height - 24;
    final maxH = size.height - 40;

    final tp = TextPainter(textDirection: TextDirection.ltr);
    for (var i = 0; i < 4; i++) {
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
        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: colors[i]),
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

    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1;
    canvas.drawLine(Offset(pad - 4, baseY), Offset(size.width - pad + 4, baseY), axis);
  }

  @override
  bool shouldRepaint(covariant _BarsPainter oldDelegate) =>
      oldDelegate.acid != acid ||
      oldDelegate.alcohol != alcohol ||
      oldDelegate.ester != ester ||
      oldDelegate.water != water;
}
