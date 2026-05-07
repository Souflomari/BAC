import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Uniform electric field deflection (oscilloscope cathodique style).
///
/// A charged particle enters horizontally between two parallel plates of
/// length L and separation d with applied voltage U. Between plates the
/// trajectory is parabolic with deflection y(x) = (qU)/(2 m d v0²) x².
/// Exit angle tan α = qUL/(m d v0²). After the plates the particle moves
/// in a straight line until the screen at distance D from the plate exit.
class EFieldUniformWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const EFieldUniformWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<EFieldUniformWidget> createState() => _EFieldUniformWidgetState();
}

enum _Particle { electron, proton }

extension on _Particle {
  String get label {
    switch (this) {
      case _Particle.electron:
        return 'Électron (q < 0)';
      case _Particle.proton:
        return 'Proton (q > 0)';
    }
  }

  /// Sign of charge.
  double get qSign => this == _Particle.electron ? -1 : 1;

  /// |q/m| ratio in C/kg (used to keep numbers reasonable in the simulator).
  double get qOverM {
    switch (this) {
      case _Particle.electron:
        return 1.76e11;
      case _Particle.proton:
        return 9.58e7;
    }
  }
}

class _EFieldUniformWidgetState extends State<EFieldUniformWidget>
    with SingleTickerProviderStateMixin {
  // Physical parameters (SI, but values picked for readable simulation).
  // ignore_for_file: non_constant_identifier_names — physical symbols (U, L, D, B)
  double _U = 200.0;        // V
  double _L = 0.08;         // m, plate length
  double _d = 0.03;         // m, plate separation
  double _v0 = 2.0e7;       // m/s, initial horizontal velocity
  double _D = 0.20;         // m, distance from plate exit to screen
  _Particle _particle = _Particle.electron;

  late AnimationController _controller;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    )..addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  /// Deflection inside plates at horizontal position x (m).
  double _yInside(double x) {
    final qOverM = _particle.qOverM * _particle.qSign;
    return qOverM * _U * x * x / (2 * _d * _v0 * _v0);
  }

  /// Deflection at the exit of plates.
  double get _yExit => _yInside(_L);

  /// tan(α) at exit.
  double get _tanAlpha {
    final qOverM = _particle.qOverM * _particle.qSign;
    return qOverM * _U * _L / (_d * _v0 * _v0);
  }

  /// Deflection on the screen (after the field-free drift).
  double get _yScreen => _yExit + _tanAlpha * _D;

  /// Whether the particle clips a plate.
  bool get _hits => _yExit.abs() >= _d / 2;

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
      height: 220,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 220),
          painter: _ScenePainter(
            U: _U,
            L: _L,
            d: _d,
            D: _D,
            yInside: _yInside,
            yExit: _yExit,
            tanAlpha: _tanAlpha,
            t: _controller.value,
            qSign: _particle.qSign,
            hits: _hits,
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
            color: (_hits ? BacPrepColors.error : BacPrepColors.accent)
                .withValues(alpha: 0.12),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            _hits ? 'Choque la plaque !' : 'tan α = ${_tanAlpha.toStringAsFixed(3)}',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: _hits ? BacPrepColors.error : BacPrepColors.accent,
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
            label: 'U (V)',
            value: _U,
            min: 0,
            max: 1000,
            divisions: 100,
            display: _U.toStringAsFixed(0),
            onChanged: (v) => setState(() {
              _U = v;
              _reset();
            }),
          ),
          _Slider(
            label: 'v₀ (×10⁷ m/s)',
            value: _v0 / 1e7,
            min: 0.5,
            max: 5.0,
            divisions: 45,
            display: (_v0 / 1e7).toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _v0 = v * 1e7;
              _reset();
            }),
          ),
          _Slider(
            label: 'L (cm)',
            value: _L * 100,
            min: 2,
            max: 20,
            divisions: 18,
            display: (_L * 100).toStringAsFixed(0),
            onChanged: (v) => setState(() {
              _L = v / 100;
              _reset();
            }),
          ),
          _Slider(
            label: 'd (cm)',
            value: _d * 100,
            min: 1,
            max: 8,
            divisions: 14,
            display: (_d * 100).toStringAsFixed(1),
            onChanged: (v) => setState(() {
              _d = v / 100;
              _reset();
            }),
          ),
          _Slider(
            label: 'D (cm)',
            value: _D * 100,
            min: 5,
            max: 50,
            divisions: 45,
            display: (_D * 100).toStringAsFixed(0),
            onChanged: (v) => setState(() {
              _D = v / 100;
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
            label: 'E (V/m)',
            value: (_U / _d).toStringAsExponential(2),
            color: BacPrepColors.physics,
          ),
          _DataItem(
            label: 'y_sortie (cm)',
            value: (_yExit * 100).toStringAsFixed(2),
            color: BacPrepColors.success,
          ),
          _DataItem(
            label: 'y_écran (cm)',
            value: (_yScreen * 100).toStringAsFixed(2),
            color: BacPrepColors.error,
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
              'Déflexion à l\'écran : ${(_yScreen * 100).toStringAsFixed(2)} cm',
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
              hintText: 'y_écran (cm)',
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
        SizedBox(
          width: 100,
          child: Text(label, style: const TextStyle(fontSize: 13)),
        ),
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
        Text(
          value,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color),
        ),
      ],
    );
  }
}

class _ScenePainter extends CustomPainter {
  final double U;
  final double L;
  final double D;
  final double d;
  final double Function(double) yInside;
  final double yExit;
  final double tanAlpha;
  final double t;
  final double qSign;
  final bool hits;

  _ScenePainter({
    required this.U,
    required this.L,
    required this.D,
    required this.d,
    required this.yInside,
    required this.yExit,
    required this.tanAlpha,
    required this.t,
    required this.qSign,
    required this.hits,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // Layout: pre-plate margin, plate length, drift D, screen.
    const padX = 16.0;
    final totalLen = L + D + 0.04; // +4 cm pre-plate
    final mPerPx = totalLen / (size.width - padX * 2);
    final pxPerM = 1 / mPerPx;
    const preLen = 0.04;
    final plateLeft = padX + preLen * pxPerM;
    final plateRight = plateLeft + L * pxPerM;
    final screenX = plateRight + D * pxPerM;
    final centerY = size.height / 2;

    // Plates
    const plateThickness = 4.0;
    final plateHalfSep = (d / 2) * pxPerM;
    final platePaint = Paint()
      ..color = BacPrepColors.textPrimary
      ..style = PaintingStyle.fill;
    final topPlate = Rect.fromLTWH(
      plateLeft,
      centerY - plateHalfSep - plateThickness,
      plateRight - plateLeft,
      plateThickness,
    );
    final bottomPlate = Rect.fromLTWH(
      plateLeft,
      centerY + plateHalfSep,
      plateRight - plateLeft,
      plateThickness,
    );
    canvas.drawRect(topPlate, platePaint);
    canvas.drawRect(bottomPlate, platePaint);

    // E field arrows (top → bottom for U > 0; the field convention here is
    // that the upper plate is at +U/2, lower at -U/2).
    final arrowPaint = Paint()
      ..color = BacPrepColors.accent.withValues(alpha: 0.7)
      ..strokeWidth = 1.4
      ..style = PaintingStyle.stroke;
    final arrowsCount = ((plateRight - plateLeft) / 28).floor().clamp(1, 12);
    for (var i = 0; i <= arrowsCount; i++) {
      final ax = plateLeft + (plateRight - plateLeft) * i / arrowsCount;
      canvas.drawLine(
        Offset(ax, centerY - plateHalfSep + 2),
        Offset(ax, centerY + plateHalfSep - 4),
        arrowPaint,
      );
      // Arrowhead
      final tip = Offset(ax, centerY + plateHalfSep - 4);
      canvas.drawLine(tip, Offset(tip.dx - 3, tip.dy - 5), arrowPaint);
      canvas.drawLine(tip, Offset(tip.dx + 3, tip.dy - 5), arrowPaint);
    }

    // Voltage label
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: 'U = ${U.toStringAsFixed(0)} V',
      style: const TextStyle(fontSize: 11, color: BacPrepColors.textSecondary),
    );
    tp.layout();
    tp.paint(canvas, Offset(plateLeft, centerY - plateHalfSep - 22));

    // Screen at right edge
    final screenPaint = Paint()
      ..color = BacPrepColors.locked
      ..strokeWidth = 3;
    canvas.drawLine(
      Offset(screenX, centerY - 50),
      Offset(screenX, centerY + 50),
      screenPaint,
    );

    // Trajectory: pre-plate (straight), in-plate (parabola), post-plate (straight) up to screen.
    // Animate along arc length using parameter t ∈ [0, 1] mapping to total horizontal distance.
    final pre = preLen * pxPerM;
    final inLen = (plateRight - plateLeft);
    final post = (screenX - plateRight);
    final fullLen = pre + inLen + post;
    final progress = t * fullLen;

    final trajPaint = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;
    final path = Path()..moveTo(padX, centerY);

    // Pre-plate
    final preEndX = math.min(progress, pre) + padX;
    path.lineTo(preEndX, centerY);

    Offset particlePos = Offset(preEndX, centerY);
    if (progress > pre) {
      // In-plate parabola: x' from 0..inLen
      final inProgress = math.min(progress - pre, inLen);
      const samples = 30;
      for (var i = 1; i <= samples; i++) {
        final fr = i / samples;
        final xPx = inProgress * fr;
        final xMeters = xPx * mPerPx;
        // qSign inverted to convert physics y-up to screen y-down.
        final yPx = -yInside(xMeters) * pxPerM * qSign / qSign; // keep physical sign
        path.lineTo(plateLeft + xPx, centerY - yPx);
      }
      final xMeters = inProgress * mPerPx;
      // Final particle position inside plates
      final yPx = -yInside(xMeters) * pxPerM;
      particlePos = Offset(plateLeft + inProgress, centerY - yPx);
    }
    if (progress > pre + inLen) {
      // Post-plate straight line at angle α from exit point
      final dxPx = math.min(progress - pre - inLen, post);
      final exitYPx = -yExit * pxPerM;
      final extraYPx = -tanAlpha * (dxPx * mPerPx) * pxPerM;
      path.lineTo(plateRight + dxPx, centerY + exitYPx + extraYPx);
      particlePos = Offset(plateRight + dxPx, centerY + exitYPx + extraYPx);
    }
    canvas.drawPath(path, trajPaint);

    // Particle dot
    if (t > 0) {
      final dotColor = qSign < 0 ? BacPrepColors.physics : BacPrepColors.error;
      canvas.drawCircle(particlePos, 5, Paint()..color = dotColor);
    }

    // Hit-mark on screen
    if (t >= 1.0 && !hits) {
      canvas.drawCircle(
        Offset(screenX, particlePos.dy),
        4,
        Paint()..color = BacPrepColors.success,
      );
    }

    // Labels
    tp.text = const TextSpan(
      text: 'écran',
      style: TextStyle(fontSize: 10, color: BacPrepColors.textSecondary),
    );
    tp.layout();
    tp.paint(canvas, Offset(screenX - tp.width / 2, centerY + 54));
  }

  @override
  bool shouldRepaint(covariant _ScenePainter oldDelegate) =>
      oldDelegate.t != t ||
      oldDelegate.U != U ||
      oldDelegate.L != L ||
      oldDelegate.D != D ||
      oldDelegate.d != d ||
      oldDelegate.yExit != yExit ||
      oldDelegate.tanAlpha != tanAlpha ||
      oldDelegate.qSign != qSign ||
      oldDelegate.hits != hits;
}
