import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Uniform magnetic field — circular motion of a charged particle.
///
/// Inside a region of uniform B (perpendicular to the page), a charged
/// particle moves on a circle of radius r = m v / (|q| B) and period
/// T = 2π m / (|q| B). The widget animates the particle around its circle
/// while sliders adjust v, B and the q/m ratio (via a particle picker).
class BFieldUniformWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const BFieldUniformWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<BFieldUniformWidget> createState() => _BFieldUniformWidgetState();
}

enum _Particle { electron, proton, alpha }

extension on _Particle {
  String get label {
    switch (this) {
      case _Particle.electron:
        return 'Électron';
      case _Particle.proton:
        return 'Proton';
      case _Particle.alpha:
        return 'Particule α';
    }
  }

  /// |q/m| in C/kg.
  double get qOverM {
    switch (this) {
      case _Particle.electron:
        return 1.76e11;
      case _Particle.proton:
        return 9.58e7;
      case _Particle.alpha:
        return 4.82e7;
    }
  }

  /// Sign of charge.
  double get qSign => this == _Particle.electron ? -1 : 1;
}

class _BFieldUniformWidgetState extends State<BFieldUniformWidget>
    with SingleTickerProviderStateMixin {
  // Physical params
  // ignore_for_file: non_constant_identifier_names — physical symbol B
  double _v = 5.0e6;        // m/s
  double _B = 0.005;        // T
  bool _bIntoPage = true;   // B direction (× into the page; • out of)
  _Particle _particle = _Particle.proton;

  late AnimationController _controller;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 6),
      vsync: this,
    )..addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  /// Radius of the circular motion (m). r = v / (|q/m| B).
  double get _radius => _v / (_particle.qOverM * _B);

  /// Period (s). T = 2π / (|q/m| B).
  double get _period => 2 * math.pi / (_particle.qOverM * _B);

  /// Direction of rotation: depends on sign of q and direction of B.
  /// For B into page and q > 0, motion is clockwise (looking at the page).
  /// For B into page and q < 0, motion is counter-clockwise.
  /// Reverse if B is out of page.
  bool get _clockwise =>
      (_particle.qSign > 0 && _bIntoPage) || (_particle.qSign < 0 && !_bIntoPage);

  void _toggle() {
    setState(() {
      if (_controller.isAnimating) {
        _controller.stop();
      } else {
        _controller.repeat();
      }
    });
  }

  void _reset() {
    _controller.reset();
    setState(() {});
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
          _buildScene(),
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

  Widget _buildScene() {
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
          painter: _ScenePainter(
            radius: _radius,
            t: _controller.value,
            clockwise: _clockwise,
            bIntoPage: _bIntoPage,
            qSign: _particle.qSign,
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
            'r = ${(_radius * 100).toStringAsFixed(2)} cm',
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DropdownButton<_Particle>(
            value: _particle,
            isExpanded: true,
            items: _Particle.values
                .map((p) => DropdownMenuItem(value: p, child: Text(p.label)))
                .toList(),
            onChanged: (v) => setState(() {
              _particle = v ?? _particle;
              _reset();
            }),
          ),
          const SizedBox(height: Spacing.sm),
          _Slider(
            label: 'v (×10⁶ m/s)',
            value: _v / 1e6,
            min: 0.5,
            max: 20.0,
            divisions: 39,
            display: (_v / 1e6).toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _v = v * 1e6;
              _reset();
            }),
          ),
          _Slider(
            label: 'B (mT)',
            value: _B * 1000,
            min: 1,
            max: 100,
            divisions: 99,
            display: (_B * 1000).toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _B = v / 1000;
              _reset();
            }),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              const Text('Direction de B :', style: TextStyle(fontSize: 13)),
              const SizedBox(width: Spacing.sm),
              SegmentedButton<bool>(
                segments: const [
                  ButtonSegment(value: true, label: Text('× entrant')),
                  ButtonSegment(value: false, label: Text('• sortant')),
                ],
                selected: {_bIntoPage},
                onSelectionChanged: (s) => setState(() => _bIntoPage = s.first),
              ),
            ],
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
            label: 'r (cm)',
            value: (_radius * 100).toStringAsFixed(2),
            color: BacPrepColors.accent,
          ),
          _DataItem(
            label: 'T (μs)',
            value: (_period * 1e6).toStringAsFixed(2),
            color: BacPrepColors.physics,
          ),
          _DataItem(
            label: 'f (MHz)',
            value: (1 / _period / 1e6).toStringAsFixed(2),
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
              'r = ${(_radius * 100).toStringAsFixed(2)} cm',
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
              hintText: 'r (cm)',
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
        SizedBox(width: 100, child: Text(label, style: const TextStyle(fontSize: 13))),
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
        Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color)),
      ],
    );
  }
}

class _ScenePainter extends CustomPainter {
  final double radius;
  final double t;
  final bool clockwise;
  final bool bIntoPage;
  final double qSign;

  _ScenePainter({
    required this.radius,
    required this.t,
    required this.clockwise,
    required this.bIntoPage,
    required this.qSign,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;

    // Background field markers (× or •)
    final markerPaint = Paint()..color = BacPrepColors.locked;
    const cellSize = 32.0;
    for (var x = cellSize / 2; x < size.width; x += cellSize) {
      for (var y = cellSize / 2; y < size.height; y += cellSize) {
        if (bIntoPage) {
          canvas.drawLine(
            Offset(x - 4, y - 4),
            Offset(x + 4, y + 4),
            Paint()
              ..color = BacPrepColors.locked
              ..strokeWidth = 1,
          );
          canvas.drawLine(
            Offset(x - 4, y + 4),
            Offset(x + 4, y - 4),
            Paint()
              ..color = BacPrepColors.locked
              ..strokeWidth = 1,
          );
        } else {
          canvas.drawCircle(Offset(x, y), 1.5, markerPaint);
          canvas.drawCircle(
            Offset(x, y),
            5,
            Paint()
              ..color = BacPrepColors.locked
              ..strokeWidth = 0.8
              ..style = PaintingStyle.stroke,
          );
        }
      }
    }

    // Scale: choose so the diameter of the circle is at most 70% of the
    // shorter side, with a minimum scale to keep small circles visible.
    final maxDiameterPx = math.min(size.width, size.height) * 0.75;
    var pxPerM = radius > 0 ? maxDiameterPx / 2 / radius : 1.0;
    // Cap so very small radii still render
    pxPerM = math.min(pxPerM, 1e6);
    final rPx = math.max(8.0, radius * pxPerM);

    // The circular trajectory. Center the circle on (cx, cy).
    final orbitPaint = Paint()
      ..color = BacPrepColors.physics.withValues(alpha: 0.4)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.4;
    canvas.drawCircle(Offset(cx, cy), rPx, orbitPaint);

    // Particle position on the orbit at time t
    const omega = 2 * math.pi; // one revolution per controller cycle
    final dir = clockwise ? -1.0 : 1.0;
    final theta = dir * omega * t;
    final px = cx + rPx * math.cos(theta);
    final py = cy + rPx * math.sin(theta);

    // Velocity vector at the particle (tangent to the circle)
    final tangent = Offset(-math.sin(theta), math.cos(theta)) * dir;
    final vTipScale = math.min(40.0, rPx * 0.5);
    final vEnd = Offset(px + tangent.dx * vTipScale, py + tangent.dy * vTipScale);
    final vPaint = Paint()
      ..color = BacPrepColors.accent
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;
    _drawArrow(canvas, Offset(px, py), vEnd, vPaint);

    // Centripetal force vector (toward center)
    final toCenter = Offset(cx - px, cy - py);
    final toCenterMag = toCenter.distance;
    if (toCenterMag > 0) {
      final fEnd = Offset(
        px + toCenter.dx / toCenterMag * vTipScale * 0.7,
        py + toCenter.dy / toCenterMag * vTipScale * 0.7,
      );
      final fPaint = Paint()
        ..color = BacPrepColors.error
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;
      _drawArrow(canvas, Offset(px, py), fEnd, fPaint);
    }

    // Radius line and label
    final rLine = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 1.4;
    canvas.drawLine(Offset(cx, cy), Offset(px, py), rLine);

    // Particle dot
    final dotColor = qSign > 0 ? BacPrepColors.error : BacPrepColors.physics;
    canvas.drawCircle(Offset(px, py), 6, Paint()..color = dotColor);

    // Center cross
    final centerPaint = Paint()..color = BacPrepColors.textSecondary;
    canvas.drawCircle(Offset(cx, cy), 2.5, centerPaint);

    // Labels
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = const TextSpan(
      text: 'v',
      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: BacPrepColors.accent),
    );
    tp.layout();
    tp.paint(canvas, Offset(vEnd.dx + 4, vEnd.dy - 6));

    tp.text = TextSpan(
      text: 'r = ${(radius * 100).toStringAsFixed(2)} cm',
      style: const TextStyle(fontSize: 11, color: BacPrepColors.textSecondary),
    );
    tp.layout();
    tp.paint(canvas, const Offset(8, 6));
  }

  void _drawArrow(Canvas canvas, Offset start, Offset end, Paint paint) {
    canvas.drawLine(start, end, paint);
    final dir = end - start;
    final len = dir.distance;
    if (len < 1) return;
    final unit = Offset(dir.dx / len, dir.dy / len);
    final perp = Offset(-unit.dy, unit.dx);
    final tip1 = end - unit * 8 + perp * 4;
    final tip2 = end - unit * 8 - perp * 4;
    canvas.drawLine(end, tip1, paint);
    canvas.drawLine(end, tip2, paint);
  }

  @override
  bool shouldRepaint(covariant _ScenePainter oldDelegate) =>
      oldDelegate.radius != radius ||
      oldDelegate.t != t ||
      oldDelegate.clockwise != clockwise ||
      oldDelegate.bIntoPage != bIntoPage ||
      oldDelegate.qSign != qSign;
}
