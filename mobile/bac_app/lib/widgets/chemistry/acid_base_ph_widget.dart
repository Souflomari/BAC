import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// pH and predominance diagram for an acid-base couple HA / A⁻.
///
/// User picks the species (strong acid, weak acid, strong base, weak base),
/// concentration C and (for weak species) pKa. Computes pH, [HA]/[A⁻]
/// fractions and renders a predominance diagram with the current pH marker.
class AcidBasePhWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const AcidBasePhWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<AcidBasePhWidget> createState() => _AcidBasePhWidgetState();
}

enum _Species { strongAcid, weakAcid, strongBase, weakBase }

extension on _Species {
  String get label {
    switch (this) {
      case _Species.strongAcid:
        return 'Acide fort (HCl)';
      case _Species.weakAcid:
        return 'Acide faible (HA, pKa)';
      case _Species.strongBase:
        return 'Base forte (NaOH)';
      case _Species.weakBase:
        return 'Base faible (A⁻, pKa)';
    }
  }
}

class _AcidBasePhWidgetState extends State<AcidBasePhWidget> {
  _Species _species = _Species.weakAcid;
  double _c = 0.10;     // mol/L
  double _pKa = 4.75;   // CH3COOH default

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  static double _log10(double x) => math.log(x) / math.ln10;

  double get _ph {
    switch (_species) {
      case _Species.strongAcid:
        return -_log10(math.max(_c, 1e-14));
      case _Species.strongBase:
        return 14 + _log10(math.max(_c, 1e-14));
      case _Species.weakAcid:
        // pH = ½(pKa - log C)
        return 0.5 * (_pKa - _log10(math.max(_c, 1e-14)));
      case _Species.weakBase:
        // pH = ½(14 + pKa + log C)
        return 0.5 * (14 + _pKa + _log10(math.max(_c, 1e-14)));
    }
  }

  /// Fraction in HA form at the current pH (Henderson-Hasselbalch).
  double get _fracHA {
    final ph = _ph;
    final r = math.pow(10.0, ph - _pKa).toDouble();
    return 1 / (1 + r);
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
          _buildPhScale(),
          const SizedBox(height: Spacing.md),
          _buildPredominance(),
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

  Widget _buildPhScale() {
    return Container(
      height: 120,
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: CustomPaint(
        size: const Size(double.infinity, 90),
        painter: _PhScalePainter(ph: _ph),
      ),
    );
  }

  Widget _buildPredominance() {
    final usePredominance =
        _species == _Species.weakAcid || _species == _Species.weakBase;
    if (!usePredominance) {
      return const SizedBox.shrink();
    }
    return Container(
      height: 130,
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: CustomPaint(
        size: const Size(double.infinity, 100),
        painter: _PredominancePainter(ph: _ph, pKa: _pKa, fracHA: _fracHA),
      ),
    );
  }

  Widget _buildParameters() {
    final isWeak = _species == _Species.weakAcid || _species == _Species.weakBase;
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DropdownButton<_Species>(
            value: _species,
            isExpanded: true,
            items: _Species.values
                .map((s) => DropdownMenuItem(value: s, child: Text(s.label)))
                .toList(),
            onChanged: (v) => setState(() => _species = v ?? _species),
          ),
          const SizedBox(height: Spacing.sm),
          _Slider(
            label: 'C (mol/L)',
            value: _c,
            min: 0.001,
            max: 1.0,
            divisions: 999,
            display: _c.toStringAsFixed(3),
            onChanged: (v) => setState(() => _c = v),
          ),
          if (isWeak)
            _Slider(
              label: 'pKa',
              value: _pKa,
              min: 0.5,
              max: 13.5,
              divisions: 130,
              display: _pKa.toStringAsFixed(2),
              onChanged: (v) => setState(() => _pKa = v),
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
          _DataItem(label: 'pH', value: _ph.toStringAsFixed(2), color: BacPrepColors.error),
          _DataItem(
            label: '[H₃O⁺]',
            value: math.pow(10.0, -_ph).toStringAsExponential(2),
            color: BacPrepColors.physics,
          ),
          _DataItem(
            label: '[OH⁻]',
            value: math.pow(10.0, _ph - 14).toStringAsExponential(2),
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
              'pH = ${_ph.toStringAsFixed(2)}',
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
              hintText: 'pH',
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
        SizedBox(width: 90, child: Text(label, style: const TextStyle(fontSize: 13))),
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

/// Linear pH scale (0 → 14) shaded with the universal-indicator gradient.
class _PhScalePainter extends CustomPainter {
  final double ph;

  _PhScalePainter({required this.ph});

  static const _stops = [
    (0.0, Color(0xFFD32F2F)),
    (3.0, Color(0xFFF57C00)),
    (5.0, Color(0xFFFBC02D)),
    (7.0, Color(0xFF388E3C)),
    (9.0, Color(0xFF1976D2)),
    (12.0, Color(0xFF6A1B9A)),
    (14.0, Color(0xFF311B92)),
  ];

  @override
  void paint(Canvas canvas, Size size) {
    const left = 6.0;
    final right = size.width - 6.0;
    final w = right - left;
    const barH = 18.0;
    final barY = size.height / 2 - barH / 2;

    // Gradient fill via stop interpolation
    final paint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: _stops.map((s) => s.$2).toList(),
        stops: _stops.map((s) => s.$1 / 14).toList(),
      ).createShader(Rect.fromLTWH(left, barY, w, barH));
    canvas.drawRRect(
      RRect.fromRectAndRadius(Rect.fromLTWH(left, barY, w, barH), const Radius.circular(8)),
      paint,
    );

    // Tick marks
    final tickPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1;
    final tp = TextPainter(textDirection: TextDirection.ltr);
    for (var i = 0; i <= 14; i += 2) {
      final x = left + w * i / 14;
      canvas.drawLine(Offset(x, barY + barH), Offset(x, barY + barH + 4), tickPaint);
      tp.text = TextSpan(
        text: '$i',
        style: const TextStyle(fontSize: 10, color: BacPrepColors.textSecondary),
      );
      tp.layout();
      tp.paint(canvas, Offset(x - tp.width / 2, barY + barH + 6));
    }

    // pH cursor
    final cx = left + w * ph.clamp(0, 14) / 14;
    final cursorPaint = Paint()
      ..color = BacPrepColors.textPrimary
      ..strokeWidth = 2;
    canvas.drawLine(Offset(cx, barY - 6), Offset(cx, barY + barH + 6), cursorPaint);
    canvas.drawCircle(Offset(cx, barY - 8), 5, Paint()..color = BacPrepColors.textPrimary);
    tp.text = TextSpan(
      text: 'pH ${ph.toStringAsFixed(2)}',
      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: BacPrepColors.textPrimary),
    );
    tp.layout();
    tp.paint(canvas, Offset(cx - tp.width / 2, 0));
  }

  @override
  bool shouldRepaint(covariant _PhScalePainter oldDelegate) => oldDelegate.ph != ph;
}

class _PredominancePainter extends CustomPainter {
  final double ph;
  final double pKa;
  final double fracHA;

  _PredominancePainter({required this.ph, required this.pKa, required this.fracHA});

  @override
  void paint(Canvas canvas, Size size) {
    const left = 8.0;
    final right = size.width - 8.0;
    final w = right - left;
    final h = size.height;
    const barH = 22.0;
    final barY = h / 2 - barH;

    // HA region (left of pKa)
    final haRect = Rect.fromLTWH(left, barY, w * pKa / 14, barH);
    canvas.drawRect(haRect, Paint()..color = BacPrepColors.error.withValues(alpha: 0.5));
    // A- region (right of pKa)
    final aRect = Rect.fromLTWH(left + w * pKa / 14, barY, w * (1 - pKa / 14), barH);
    canvas.drawRect(aRect, Paint()..color = BacPrepColors.success.withValues(alpha: 0.5));

    // pKa marker
    final pkaX = left + w * pKa / 14;
    final pkaPaint = Paint()
      ..color = BacPrepColors.textPrimary
      ..strokeWidth = 1.4;
    canvas.drawLine(Offset(pkaX, barY - 3), Offset(pkaX, barY + barH + 3), pkaPaint);

    // Current pH cursor
    final phX = left + w * ph.clamp(0, 14) / 14;
    final cursorPaint = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 2;
    canvas.drawLine(Offset(phX, barY - 8), Offset(phX, barY + barH + 8), cursorPaint);

    // Labels
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = const TextSpan(
      text: 'HA',
      style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: BacPrepColors.error),
    );
    tp.layout();
    tp.paint(canvas, Offset(left + 6, barY + 3));

    tp.text = const TextSpan(
      text: 'A⁻',
      style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: BacPrepColors.success),
    );
    tp.layout();
    tp.paint(canvas, Offset(right - tp.width - 6, barY + 3));

    tp.text = TextSpan(
      text: 'pKa = ${pKa.toStringAsFixed(2)}',
      style: const TextStyle(fontSize: 10, color: BacPrepColors.textSecondary),
    );
    tp.layout();
    tp.paint(canvas, Offset(pkaX - tp.width / 2, barY + barH + 6));

    // Fraction display below
    tp.text = TextSpan(
      text: '[HA]/(C) = ${(fracHA * 100).toStringAsFixed(1)}%   [A⁻]/(C) = ${((1 - fracHA) * 100).toStringAsFixed(1)}%',
      style: const TextStyle(fontSize: 11, color: BacPrepColors.textPrimary),
    );
    tp.layout();
    tp.paint(canvas, Offset((size.width - tp.width) / 2, h - tp.height - 2));
  }

  @override
  bool shouldRepaint(covariant _PredominancePainter oldDelegate) =>
      oldDelegate.ph != ph || oldDelegate.pKa != pKa || oldDelegate.fracHA != fracHA;
}
