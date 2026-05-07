import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Daniell cell — Zn|Zn²⁺‖Cu²⁺|Cu electrochemical cell.
///
/// Visualizes the two half-cells, electron flow direction in the external
/// wire, and ion movement in the salt bridge. Computes the cell EMF using
/// the Nernst equation:
///   ΔE = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) − (0.030/n)·log([Zn²⁺]/[Cu²⁺])
class DaniellCellWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const DaniellCellWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<DaniellCellWidget> createState() => _State();
}

class _State extends State<DaniellCellWidget>
    with SingleTickerProviderStateMixin {
  double _cZn = 0.10; // mol/L
  double _cCu = 1.00; // mol/L
  static const double _e0Cu = 0.34; // V, standard reduction potentials
  static const double _e0Zn = -0.76;
  late AnimationController _controller;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    )..repeat()..addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _emf {
    // ΔE = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) − (0.030/2)·log(Q)
    // Q = [Zn²⁺]/[Cu²⁺]
    final q = math.max(_cZn / math.max(_cCu, 1e-9), 1e-9);
    return (_e0Cu - _e0Zn) - (0.030 / 2) * (math.log(q) / math.ln10);
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
          _buildCell(),
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

  Widget _buildCell() {
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
          painter: _CellPainter(t: _controller.value, emf: _emf),
        ),
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
          _S(
            label: '[Zn²⁺] (mol/L)',
            value: _cZn,
            min: 0.001,
            max: 1.0,
            divisions: 99,
            display: _cZn.toStringAsFixed(3),
            onChanged: (v) => setState(() => _cZn = v),
          ),
          _S(
            label: '[Cu²⁺] (mol/L)',
            value: _cCu,
            min: 0.001,
            max: 1.0,
            divisions: 99,
            display: _cCu.toStringAsFixed(3),
            onChanged: (v) => setState(() => _cCu = v),
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
          _D(label: 'E°(Cu²⁺/Cu)', value: '${_e0Cu.toStringAsFixed(2)} V', color: BacPrepColors.error),
          _D(label: 'E°(Zn²⁺/Zn)', value: '${_e0Zn.toStringAsFixed(2)} V', color: BacPrepColors.physics),
          _D(label: 'ΔE', value: '${_emf.toStringAsFixed(3)} V', color: BacPrepColors.success),
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
              'ΔE = ${_emf.toStringAsFixed(3)} V',
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
              hintText: 'ΔE (V)',
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
        SizedBox(width: 64, child: Text(display, style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
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

class _CellPainter extends CustomPainter {
  final double t; // animation phase 0..1
  final double emf;

  _CellPainter({required this.t, required this.emf});

  @override
  void paint(Canvas canvas, Size size) {
    final beakerY = size.height * 0.40;
    final beakerH = size.height - beakerY - 14;
    final beakerW = size.width * 0.34;
    final leftBeakerX = size.width * 0.07;
    final rightBeakerX = size.width - leftBeakerX - beakerW;

    // Draw two beakers
    void drawBeaker(double x, Color liquidColor, String label, String electrodeLabel, Color electrodeColor) {
      final rect = Rect.fromLTWH(x, beakerY, beakerW, beakerH);
      // Liquid
      canvas.drawRect(
        Rect.fromLTWH(x + 3, beakerY + beakerH * 0.18, beakerW - 6, beakerH * 0.82 - 4),
        Paint()..color = liquidColor.withValues(alpha: 0.55),
      );
      // Outline
      canvas.drawRect(
        rect,
        Paint()
          ..color = BacPrepColors.textSecondary
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.6,
      );
      // Electrode (a tall rectangle at center of beaker)
      final eRect = Rect.fromLTWH(x + beakerW / 2 - 6, beakerY - 30, 12, beakerH * 0.7);
      canvas.drawRect(eRect, Paint()..color = electrodeColor);
      final tp = TextPainter(textDirection: TextDirection.ltr);
      tp.text = TextSpan(
        text: electrodeLabel,
        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: electrodeColor),
      );
      tp.layout();
      tp.paint(canvas, Offset(x + beakerW / 2 - tp.width / 2, beakerY - 48));
      tp.text = TextSpan(
        text: label,
        style: const TextStyle(fontSize: 11, color: BacPrepColors.textSecondary),
      );
      tp.layout();
      tp.paint(canvas, Offset(x + beakerW / 2 - tp.width / 2, beakerY + beakerH + 2));
    }

    drawBeaker(leftBeakerX, const Color(0xFFB0B0B0), '[Zn²⁺]', 'Zn (−)', const Color(0xFF7E7E7E));
    drawBeaker(rightBeakerX, const Color(0xFF1976D2), '[Cu²⁺]', 'Cu (+)', const Color(0xFFB87333));

    // External wire with electrons (anode → cathode externally; Zn → Cu)
    final wireY = beakerY - 60;
    final wireLeft = leftBeakerX + beakerW / 2;
    final wireRight = rightBeakerX + beakerW / 2;
    final wirePaint = Paint()
      ..color = BacPrepColors.textPrimary
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;
    canvas.drawLine(Offset(wireLeft, beakerY - 30), Offset(wireLeft, wireY), wirePaint);
    canvas.drawLine(Offset(wireLeft, wireY), Offset(wireRight, wireY), wirePaint);
    canvas.drawLine(Offset(wireRight, wireY), Offset(wireRight, beakerY - 30), wirePaint);

    // Voltmeter / EMF label in middle
    final vBox = Rect.fromCenter(
      center: Offset((wireLeft + wireRight) / 2, wireY),
      width: 64,
      height: 28,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(vBox, const Radius.circular(8)),
      Paint()..color = BacPrepColors.surface,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(vBox, const Radius.circular(8)),
      Paint()
        ..color = BacPrepColors.textPrimary
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.4,
    );
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: '${emf.toStringAsFixed(2)} V',
      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: BacPrepColors.error),
    );
    tp.layout();
    tp.paint(canvas, Offset(vBox.center.dx - tp.width / 2, vBox.center.dy - tp.height / 2));

    // Animated electrons in the wire (left → right above the voltmeter)
    final wireLen = wireRight - wireLeft;
    for (var i = 0; i < 6; i++) {
      final phase = ((t + i / 6) % 1);
      final x = wireLeft + wireLen * phase;
      // Skip electrons inside the voltmeter box
      if (x > vBox.left - 2 && x < vBox.right + 2) continue;
      canvas.drawCircle(
        Offset(x, wireY),
        3,
        Paint()..color = BacPrepColors.error,
      );
    }
    tp.text = const TextSpan(
      text: 'e⁻ →',
      style: TextStyle(fontSize: 11, color: BacPrepColors.error, fontWeight: FontWeight.w600),
    );
    tp.layout();
    tp.paint(canvas, Offset((wireLeft + wireRight) / 2 - tp.width / 2, wireY - 22));

    // Salt bridge — arc connecting the two beaker tops
    final bridgePaint = Paint()
      ..color = BacPrepColors.locked
      ..strokeWidth = 6
      ..style = PaintingStyle.stroke;
    final bridgePath = Path()
      ..moveTo(leftBeakerX + beakerW - 6, beakerY + 10)
      ..quadraticBezierTo(
        size.width / 2,
        beakerY - 8,
        rightBeakerX + 6,
        beakerY + 10,
      );
    canvas.drawPath(bridgePath, bridgePaint);
    tp.text = const TextSpan(
      text: 'pont salin',
      style: TextStyle(fontSize: 10, color: BacPrepColors.textSecondary),
    );
    tp.layout();
    tp.paint(canvas, Offset(size.width / 2 - tp.width / 2, beakerY - 18));
  }

  @override
  bool shouldRepaint(covariant _CellPainter oldDelegate) =>
      oldDelegate.t != t || oldDelegate.emf != emf;
}
