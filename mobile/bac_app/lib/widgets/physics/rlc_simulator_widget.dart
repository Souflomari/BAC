import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class RLCSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const RLCSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<RLCSimulatorWidget> createState() => _RLCSimulatorWidgetState();
}

class _RLCSimulatorWidgetState extends State<RLCSimulatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _inductance = 0.5;
  double _capacitance = 100;
  double _resistance = 10;
  double _currentTime = 0;
  bool _isPlaying = false;
  String _dampingType = 'underdamped';
  bool _showVoltage = true;
  bool _showCurrent = true;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );
    _controller.addListener(() {
      setState(() {
        _currentTime = _controller.value * 2 * math.pi;
      });
    });
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() => _isPlaying = false);
      }
    });
    _updateDampingType();
  }

  void _updateDampingType() {
    final R = _resistance;
    final L = _inductance;
    final C = _capacitance * 1e-6;
    final criticalR = 2 * math.sqrt(L / C);
    final R2 = R * R;
    final discriminant = R2 - 4 * L / C;

    if (discriminant > 0.01) {
      _dampingType = 'overdamped';
    } else if (discriminant < -0.01) {
      _dampingType = 'underdamped';
    } else {
      _dampingType = 'critically_damped';
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _omega0 => 1 / math.sqrt(_inductance * _capacitance * 1e-6);
  double get _omegaD {
    final R = _resistance;
    final L = _inductance;
    final C = _capacitance * 1e-6;
    return math.sqrt(1 / (L * C) - R * R / (4 * L * L));
  }

  double _current(double t) {
    final R = _resistance;
    final L = _inductance;
    final C = _capacitance * 1e-6;
    final alpha = R / (2 * L);
    final omega0 = 1 / math.sqrt(L * C);

    if (alpha > omega0) {
      final s1 = -alpha + math.sqrt(alpha * alpha - omega0 * omega0);
      final s2 = -alpha - math.sqrt(alpha * alpha - omega0 * omega0);
      return 0.1 * (math.exp(s1 * t) - math.exp(s2 * t)) / (s2 - s1);
    } else if (alpha < omega0) {
      final omegaD = math.sqrt(omega0 * omega0 - alpha * alpha);
      return 0.1 * math.exp(-alpha * t) * math.cos(omegaD * t);
    } else {
      return 0.1 * t * math.exp(-alpha * t);
    }
  }

  double _voltageCapacitor(double t) {
    final i = _current(t);
    final C = _capacitance * 1e-6;
    return i / C * 0.01;
  }

  void _togglePlaying() {
    setState(() {
      if (_isPlaying) {
        _controller.stop();
        _isPlaying = false;
      } else {
        if (_controller.value >= 1.0) {
          _controller.reset();
          _currentTime = 0;
        }
        _controller.forward();
        _isPlaying = true;
      }
    });
  }

  void _reset() {
    _controller.reset();
    setState(() {
      _currentTime = 0;
      _isPlaying = false;
    });
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
      padding: const EdgeInsets.all(Spacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          RichTextRenderer(
            text: widget.item.stem,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontSize: 18,
              height: 1.5,
            ),
          ),
          const SizedBox(height: Spacing.md),
          FigureWidget(figure: widget.item.questionFigure),
          const SizedBox(height: Spacing.lg),
          _buildRLCCircuit(),
          const SizedBox(height: Spacing.md),
          _buildOscilloscope(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildInfo(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildRLCCircuit() {
    return Container(
      height: 120,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 120),
          painter: _RLCCircuitPainter(
            resistance: _resistance,
            inductance: _inductance,
            capacitance: _capacitance,
            dampingType: _dampingType,
          ),
        ),
      ),
    );
  }

  Widget _buildOscilloscope() {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        color: Color(0xFF0D1B2A),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 200),
          painter: _RLCOscilloscopePainter(
            currentTime: _currentTime,
            current: _current,
            voltageCapacitor: _voltageCapacitor,
            showVoltage: _showVoltage,
            showCurrent: _showCurrent,
            dampingType: _dampingType,
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
          icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow),
          iconSize: 36,
          onPressed: _togglePlaying,
          style: IconButton.styleFrom(
            backgroundColor: BacPrepColors.physics,
            foregroundColor: Colors.white,
          ),
        ),
        const SizedBox(width: Spacing.md),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: _getDampingColor().withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: _getDampingColor()),
          ),
          child: Text(
            _getDampingLabel(),
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: _getDampingColor(),
            ),
          ),
        ),
      ],
    );
  }

  Color _getDampingColor() {
    switch (_dampingType) {
      case 'underdamped':
        return BacPrepColors.success;
      case 'overdamped':
        return BacPrepColors.warning;
      case 'critically_damped':
        return BacPrepColors.error;
      default:
        return BacPrepColors.textSecondary;
    }
  }

  String _getDampingLabel() {
    switch (_dampingType) {
      case 'underdamped':
        return 'Sous-amorti';
      case 'overdamped':
        return 'Surchargé';
      case 'critically_damped':
        return 'Critiquement amorti';
      default:
        return '';
    }
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
          Text(
            'Paramètres du circuit',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          _ParameterSlider(
            label: 'R (Ω)',
            value: _resistance,
            min: 1,
            max: 100,
            color: BacPrepColors.warning,
            onChanged: (v) {
              setState(() {
                _resistance = v;
                _updateDampingType();
              });
            },
          ),
          _ParameterSlider(
            label: 'L (H)',
            value: _inductance,
            min: 0.1,
            max: 2,
            color: BacPrepColors.primary,
            onChanged: (v) {
              setState(() {
                _inductance = v;
                _updateDampingType();
              });
            },
          ),
          _ParameterSlider(
            label: 'C (μF)',
            value: _capacitance,
            min: 10,
            max: 500,
            color: BacPrepColors.success,
            onChanged: (v) {
              setState(() {
                _capacitance = v;
                _updateDampingType();
              });
            },
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Tension'),
                selected: _showVoltage,
                onSelected: (v) => setState(() => _showVoltage = v),
              ),
              FilterChip(
                label: const Text('Courant'),
                selected: _showCurrent,
                onSelected: (v) => setState(() => _showCurrent = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildInfo() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.physics.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.physics.withValues(alpha: 0.3)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _InfoItem(
            label: 'ω₀',
            value: '${_omega0.toStringAsFixed(0)} rad/s',
            color: BacPrepColors.primary,
          ),
          _InfoItem(
            label: 'ω_d',
            value: '${_omegaD.toStringAsFixed(0)} rad/s',
            color: BacPrepColors.warning,
          ),
          _InfoItem(
            label: 'Période',
            value: '${(2 * math.pi / _omegaD).toStringAsFixed(2)} s',
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
              'ω₀ = ${_omega0.toStringAsFixed(1)} rad/s',
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
              hintText: 'Calculer ω₀ (rad/s)',
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

class _ParameterSlider extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final Color color;
  final ValueChanged<double> onChanged;

  const _ParameterSlider({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.color,
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
            onChanged: onChanged,
          ),
        ),
        SizedBox(
          width: 60,
          child: Text(
            value.toStringAsFixed(1),
            style: TextStyle(fontWeight: FontWeight.w600, color: color),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

class _InfoItem extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _InfoItem({
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(label, style: TextStyle(fontSize: 12, color: BacPrepColors.textSecondary)),
        Text(
          value,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color),
        ),
      ],
    );
  }
}

class _RLCCircuitPainter extends CustomPainter {
  final double resistance;
  final double inductance;
  final double capacitance;
  final String dampingType;

  _RLCCircuitPainter({
    required this.resistance,
    required this.inductance,
    required this.capacitance,
    required this.dampingType,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height / 2;

    final wirePaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    canvas.drawLine(Offset(centerX - 100, centerY), Offset(centerX - 50, centerY), wirePaint);
    canvas.drawLine(Offset(centerX + 50, centerY), Offset(centerX + 100, centerY), wirePaint);
    canvas.drawLine(Offset(centerX - 100, centerY), Offset(centerX - 100, 20), wirePaint);
    canvas.drawLine(Offset(centerX - 100, 20), Offset(centerX + 100, 20), wirePaint);
    canvas.drawLine(Offset(centerX + 100, 20), Offset(centerX + 100, centerY), wirePaint);

    final resPaint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;
    canvas.drawLine(Offset(centerX - 50, centerY - 10), Offset(centerX - 50, centerY + 10), resPaint);
    canvas.drawLine(Offset(centerX - 45, centerY - 10), Offset(centerX - 45, centerY + 10), resPaint);
    canvas.drawLine(Offset(centerX - 55, centerY - 10), Offset(centerX - 55, centerY + 10), resPaint);

    final indPaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;
    for (int i = 0; i < 4; i++) {
      final x = centerX - 20 + i * 12;
      canvas.drawArc(
        Rect.fromCenter(center: Offset(x, centerY), width: 20, height: 30),
        0,
        math.pi,
        false,
        indPaint,
      );
    }

    final capPaint = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;
    canvas.drawLine(Offset(centerX + 40, centerY - 20), Offset(centerX + 40, centerY + 20), capPaint);
    canvas.drawLine(Offset(centerX + 50, centerY - 15), Offset(centerX + 50, centerY + 15), capPaint);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'R = ${resistance.toStringAsFixed(0)}Ω',
      style: TextStyle(color: BacPrepColors.warning, fontSize: 9),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - 50 - textPainter.width / 2, centerY + 20));

    textPainter.text = TextSpan(
      text: 'L = ${inductance.toStringAsFixed(1)}H',
      style: TextStyle(color: BacPrepColors.primary, fontSize: 9),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - 10 - textPainter.width / 2, centerY + 20));

    textPainter.text = TextSpan(
      text: 'C = ${capacitance.toStringAsFixed(0)}μF',
      style: TextStyle(color: BacPrepColors.success, fontSize: 9),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + 45 - textPainter.width / 2, centerY + 20));
  }

  @override
  bool shouldRepaint(covariant _RLCCircuitPainter oldDelegate) {
    return resistance != oldDelegate.resistance ||
        inductance != oldDelegate.inductance ||
        capacitance != oldDelegate.capacitance;
  }
}

class _RLCOscilloscopePainter extends CustomPainter {
  final double currentTime;
  final double Function(double) current;
  final double Function(double) voltageCapacitor;
  final bool showVoltage;
  final bool showCurrent;
  final String dampingType;

  _RLCOscilloscopePainter({
    required this.currentTime,
    required this.current,
    required this.voltageCapacitor,
    required this.showVoltage,
    required this.showCurrent,
    required this.dampingType,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final gridPaint = Paint()
      ..color = Colors.green.withValues(alpha: 0.2)
      ..strokeWidth = 0.5;

    for (int i = 0; i < 10; i++) {
      canvas.drawLine(Offset(i * size.width / 10, 0), Offset(i * size.width / 10, size.height), gridPaint);
      canvas.drawLine(Offset(0, i * size.height / 8), Offset(size.width, i * size.height / 8), gridPaint);
    }

    final centerY = size.height / 2;
    final axisPaint = Paint()
      ..color = Colors.green.withValues(alpha: 0.5)
      ..strokeWidth = 1;
    canvas.drawLine(Offset(0, centerY), Offset(size.width, centerY), axisPaint);

    final tMax = 2 * math.pi;
    double toScreenX(double t) => (t / tMax) * size.width;
    double toScreenY(double v, double maxV) => centerY - (v / maxV) * (size.height / 2 - 10);

    if (showCurrent) {
      final currentPaint = Paint()
        ..color = Colors.cyan
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;

      final path = Path();
      double maxI = 0.1;
      for (double t = 0; t <= currentTime; t += tMax / 200) {
        final i = current(t);
        if (i.abs() > maxI) maxI = i.abs();
        final py = toScreenY(i, maxI);
        if (t == 0) {
          path.moveTo(toScreenX(t), py);
        } else {
          path.lineTo(toScreenX(t), py);
        }
      }
      canvas.drawPath(path, currentPaint);
    }

    if (showVoltage) {
      final voltagePaint = Paint()
        ..color = Colors.yellow
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;

      final path = Path();
      double maxV = 1.0;
      for (double t = 0; t <= currentTime; t += tMax / 200) {
        final v = voltageCapacitor(t);
        if (v.abs() > maxV) maxV = v.abs();
        final py = toScreenY(v, maxV);
        if (t == 0) {
          path.moveTo(toScreenX(t), py);
        } else {
          path.lineTo(toScreenX(t), py);
        }
      }
      canvas.drawPath(path, voltagePaint);
    }

    final timeIndicatorPaint = Paint()
      ..color = Colors.green.withValues(alpha: 0.8)
      ..strokeWidth = 1;
    canvas.drawLine(Offset(toScreenX(currentTime), 0), Offset(toScreenX(currentTime), size.height), timeIndicatorPaint);
  }

  @override
  bool shouldRepaint(covariant _RLCOscilloscopePainter oldDelegate) {
    return currentTime != oldDelegate.currentTime;
  }
}
