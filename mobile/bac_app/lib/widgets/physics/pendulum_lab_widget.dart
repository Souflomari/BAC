import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Pendulum lab — pendule simple OR pendule élastique (masse-ressort).
///
/// Simple pendulum (small angles): T = 2π·√(L/g).
/// Spring pendulum: T = 2π·√(m/k).
///
/// Both are integrated with semi-implicit Euler so the small-angle
/// assumption isn't required visually — students can see the period
/// drift slightly when θ₀ becomes large.
class PendulumLabWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const PendulumLabWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<PendulumLabWidget> createState() => _State();
}

enum _Mode { simple, spring }

class _State extends State<PendulumLabWidget>
    with SingleTickerProviderStateMixin {
  _Mode _mode = _Mode.simple;
  // Simple pendulum
  double _length = 0.5;     // m
  double _g = 9.81;         // m/s²
  double _theta0Deg = 20;   // °
  // Spring
  double _massKg = 0.20;    // kg
  double _stiffness = 12.0; // N/m
  double _x0 = 0.10;        // m initial displacement

  double _theta = 0;
  double _omega = 0;
  double _xDisp = 0;
  double _v = 0;

  late Ticker _ticker;
  Duration? _lastTick;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;
  bool _running = false;

  @override
  void initState() {
    super.initState();
    _ticker = createTicker(_onTick);
    _resetState();
  }

  @override
  void dispose() {
    _ticker.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _resetState() {
    _theta = _theta0Deg * math.pi / 180;
    _omega = 0;
    _xDisp = _x0;
    _v = 0;
    _lastTick = null;
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

  void _reset() {
    _ticker.stop();
    setState(() {
      _running = false;
      _resetState();
    });
  }

  void _onTick(Duration elapsed) {
    final dtMs = _lastTick == null ? 16 : (elapsed - _lastTick!).inMilliseconds;
    _lastTick = elapsed;
    final dt = math.min(dtMs, 50) / 1000.0;
    setState(() {
      if (_mode == _Mode.simple) {
        // d²θ/dt² = -(g/L) sin θ
        final acc = -(_g / _length) * math.sin(_theta);
        _omega += acc * dt;
        _theta += _omega * dt;
      } else {
        // d²x/dt² = -(k/m) x
        final acc = -(_stiffness / _massKg) * _xDisp;
        _v += acc * dt;
        _xDisp += _v * dt;
      }
    });
  }

  double get _periodSimple => 2 * math.pi * math.sqrt(_length / _g);
  double get _periodSpring => 2 * math.pi * math.sqrt(_massKg / _stiffness);

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
            mode: _mode,
            theta: _theta,
            xDisp: _xDisp,
            length: _length,
            x0: _x0,
          ),
        ),
      ),
    );
  }

  Widget _buildControls() {
    final period = _mode == _Mode.simple ? _periodSimple : _periodSpring;
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton.filled(icon: const Icon(Icons.refresh), onPressed: _reset),
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
            'T = ${period.toStringAsFixed(2)} s',
            style: const TextStyle(fontWeight: FontWeight.w600, color: BacPrepColors.accent),
          ),
        ),
      ],
    );
  }

  Widget _buildParameters() {
    final isSimple = _mode == _Mode.simple;
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          SegmentedButton<_Mode>(
            segments: const [
              ButtonSegment(value: _Mode.simple, label: Text('Pendule simple')),
              ButtonSegment(value: _Mode.spring, label: Text('Masse-ressort')),
            ],
            selected: {_mode},
            onSelectionChanged: (s) => setState(() {
              _mode = s.first;
              _reset();
            }),
          ),
          const SizedBox(height: Spacing.sm),
          if (isSimple) ...[
            _S(
              label: 'L (m)',
              value: _length,
              min: 0.1,
              max: 2.0,
              divisions: 38,
              display: _length.toStringAsFixed(2),
              onChanged: (v) => setState(() {
                _length = v;
                _reset();
              }),
            ),
            _S(
              label: 'g (m/s²)',
              value: _g,
              min: 1.6,
              max: 24.8,
              divisions: 40,
              display: _g.toStringAsFixed(2),
              onChanged: (v) => setState(() {
                _g = v;
                _reset();
              }),
            ),
            _S(
              label: 'θ₀ (°)',
              value: _theta0Deg,
              min: 1,
              max: 45,
              divisions: 44,
              display: _theta0Deg.toStringAsFixed(0),
              onChanged: (v) => setState(() {
                _theta0Deg = v;
                _reset();
              }),
            ),
          ] else ...[
            _S(
              label: 'm (kg)',
              value: _massKg,
              min: 0.05,
              max: 1.0,
              divisions: 95,
              display: _massKg.toStringAsFixed(2),
              onChanged: (v) => setState(() {
                _massKg = v;
                _reset();
              }),
            ),
            _S(
              label: 'k (N/m)',
              value: _stiffness,
              min: 1,
              max: 100,
              divisions: 99,
              display: _stiffness.toStringAsFixed(0),
              onChanged: (v) => setState(() {
                _stiffness = v;
                _reset();
              }),
            ),
            _S(
              label: 'x₀ (m)',
              value: _x0,
              min: 0.01,
              max: 0.30,
              divisions: 29,
              display: _x0.toStringAsFixed(2),
              onChanged: (v) => setState(() {
                _x0 = v;
                _reset();
              }),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildDataDisplay() {
    final isSimple = _mode == _Mode.simple;
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
          if (isSimple) ...[
            _D(label: 'θ (°)', value: (_theta * 180 / math.pi).toStringAsFixed(1), color: BacPrepColors.physics),
            _D(label: 'ω (rad/s)', value: _omega.toStringAsFixed(2), color: BacPrepColors.error),
            _D(label: 'T (s)', value: _periodSimple.toStringAsFixed(3), color: BacPrepColors.success),
          ] else ...[
            _D(label: 'x (cm)', value: (_xDisp * 100).toStringAsFixed(1), color: BacPrepColors.physics),
            _D(label: 'v (m/s)', value: _v.toStringAsFixed(2), color: BacPrepColors.error),
            _D(label: 'T (s)', value: _periodSpring.toStringAsFixed(3), color: BacPrepColors.success),
          ],
        ],
      ),
    );
  }

  Widget _buildAnswerInput() {
    final period = _mode == _Mode.simple ? _periodSimple : _periodSpring;
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
              'T = ${period.toStringAsFixed(3)} s',
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
              hintText: 'T (s)',
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
        SizedBox(width: 80, child: Text(label, style: const TextStyle(fontSize: 13))),
        Expanded(child: Slider(value: value, min: min, max: max, divisions: divisions, onChanged: onChanged)),
        SizedBox(
          width: 56,
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

class _ScenePainter extends CustomPainter {
  final _Mode mode;
  final double theta;
  final double xDisp;
  final double length;
  final double x0;

  _ScenePainter({
    required this.mode,
    required this.theta,
    required this.xDisp,
    required this.length,
    required this.x0,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (mode == _Mode.simple) {
      _paintSimple(canvas, size);
    } else {
      _paintSpring(canvas, size);
    }
  }

  void _paintSimple(Canvas canvas, Size size) {
    final pivotX = size.width / 2;
    const pivotY = 16.0;
    // Scale length so that even L = 2 m fits
    final maxLenPx = size.height - pivotY - 20;
    final pxPerM = maxLenPx / 2.0;
    final lenPx = length * pxPerM;
    final bobX = pivotX + lenPx * math.sin(theta);
    final bobY = pivotY + lenPx * math.cos(theta);

    // String
    final stringPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.6;
    canvas.drawLine(Offset(pivotX, pivotY), Offset(bobX, bobY), stringPaint);

    // Pivot
    canvas.drawCircle(Offset(pivotX, pivotY), 4, Paint()..color = BacPrepColors.textPrimary);

    // Reference vertical (dashed)
    final dash = Paint()
      ..color = BacPrepColors.locked.withValues(alpha: 0.6)
      ..strokeWidth = 0.8;
    var y = pivotY;
    while (y < pivotY + lenPx) {
      final yEnd = math.min(y + 4, pivotY + lenPx);
      canvas.drawLine(Offset(pivotX, y), Offset(pivotX, yEnd), dash);
      y += 8;
    }

    // Bob
    canvas.drawCircle(Offset(bobX, bobY), 12, Paint()..color = BacPrepColors.physics);
  }

  void _paintSpring(Canvas canvas, Size size) {
    final wallY = size.height / 2;
    const wallX = 18.0;
    final eqX = size.width * 0.55; // equilibrium position of mass
    // Visual scale: x0 maps to ~80 px max amplitude
    final pxPerM = 80 / x0.clamp(0.01, 1.0);
    final massX = eqX + xDisp * pxPerM;

    // Wall
    final wallPaint = Paint()
      ..color = BacPrepColors.textPrimary
      ..strokeWidth = 2;
    canvas.drawLine(Offset(wallX, wallY - 30), Offset(wallX, wallY + 30), wallPaint);
    // Hatching
    for (var i = -3; i <= 3; i++) {
      canvas.drawLine(
        Offset(wallX, wallY + i * 8),
        Offset(wallX - 6, wallY + i * 8 - 6),
        wallPaint..strokeWidth = 1,
      );
    }

    // Spring (simple zigzag from wallX to massX)
    final springPaint = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 1.6
      ..style = PaintingStyle.stroke;
    const coils = 12;
    final dx = (massX - wallX) / (coils * 2);
    const amp = 8.0;
    final path = Path()..moveTo(wallX, wallY);
    for (var i = 1; i <= coils * 2; i++) {
      final x = wallX + dx * i;
      final yOff = (i % 2 == 0) ? 0.0 : (i % 4 == 1 ? -amp : amp);
      path.lineTo(x, wallY + yOff);
    }
    path.lineTo(massX, wallY);
    canvas.drawPath(path, springPaint);

    // Mass
    const massSize = 36.0;
    final massRect = Rect.fromCenter(
      center: Offset(massX + massSize / 2, wallY),
      width: massSize,
      height: massSize,
    );
    canvas.drawRect(massRect, Paint()..color = BacPrepColors.error);

    // Equilibrium dashed
    final dash = Paint()
      ..color = BacPrepColors.locked.withValues(alpha: 0.6)
      ..strokeWidth = 0.8;
    var y = wallY - 36.0;
    while (y < wallY + 36) {
      final yEnd = math.min(y + 4, wallY + 36);
      canvas.drawLine(Offset(eqX, y), Offset(eqX, yEnd), dash);
      y += 8;
    }
  }

  @override
  bool shouldRepaint(covariant _ScenePainter oldDelegate) =>
      oldDelegate.theta != theta ||
      oldDelegate.xDisp != xDisp ||
      oldDelegate.length != length ||
      oldDelegate.x0 != x0 ||
      oldDelegate.mode != mode;
}
