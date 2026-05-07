import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class CircuitSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const CircuitSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<CircuitSimulatorWidget> createState() => _CircuitSimulatorWidgetState();
}

class _CircuitSimulatorWidgetState extends State<CircuitSimulatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  double _resistance = 10000;
  double _capacitance = 5e-6;
  double _voltage = 5;
  double _currentTime = 0;
  bool _isCharging = true;
  bool _showVoltage = true;
  bool _showCurrent = false;
  
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 10),
      vsync: this,
    );
    _controller.addListener(() {
      setState(() {
        _currentTime = _controller.value * _getTimeScale();
      });
    });
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() => _isCharging = false);
      }
    });
    _initializeFromConfig();
  }

  void _initializeFromConfig() {
    final config = widget.item.simConfig;
    _resistance = (config['resistance'] as num?)?.toDouble() ?? 10000;
    _capacitance = (config['capacitance'] as num?)?.toDouble() ?? 5e-6;
    _voltage = (config['voltage'] as num?)?.toDouble() ?? 5;
  }

  @override
  void didUpdateWidget(CircuitSimulatorWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _controller.reset();
      _currentTime = 0;
      _isCharging = true;
      _answerController.clear();
      _hasSubmitted = false;
      _initializeFromConfig();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _tau => _resistance * _capacitance;

  double _getTimeScale() {
    return _tau * 5;
  }

  double _getCapacitorVoltage(double t) {
    if (_isCharging) {
      return _voltage * (1 - math.exp(-t / _tau));
    } else {
      return _voltage * math.exp(-t / _tau);
    }
  }

  double _getCurrent(double t) {
    if (_isCharging) {
      return (_voltage / _resistance) * math.exp(-t / _tau);
    } else {
      return (-_voltage / _resistance) * math.exp(-t / _tau);
    }
  }

  void _toggleChargeDischarge() {
    setState(() {
      if (_isCharging) {
        _isCharging = false;
        _currentTime = 0;
        _controller.reset();
      } else {
        _isCharging = true;
        _currentTime = 0;
        _controller.reset();
      }
    });
  }

  void _startSimulation() {
    _controller.forward();
  }

  void _reset() {
    _controller.reset();
    setState(() {
      _currentTime = 0;
      _isCharging = true;
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

  String _formatResistance(double r) {
    if (r >= 1e6) return '${(r / 1e6).toStringAsFixed(1)} MΩ';
    if (r >= 1e3) return '${(r / 1e3).toStringAsFixed(1)} kΩ';
    return '${r.toStringAsFixed(0)} Ω';
  }

  String _formatCapacitance(double c) {
    if (c >= 1e-6) return '${(c / 1e-6).toStringAsFixed(1)} μF';
    if (c >= 1e-9) return '${(c / 1e-9).toStringAsFixed(1)} nF';
    return '${(c * 1e9).toStringAsFixed(1)} pF';
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
          _buildCircuit(),
          const SizedBox(height: Spacing.md),
          _buildGraph(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildMeasurements(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildCircuit() {
    return Container(
      height: 180,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 180),
          painter: _CircuitPainter(
            resistance: _resistance,
            capacitance: _capacitance,
            voltage: _voltage,
            currentTime: _currentTime,
            isCharging: _isCharging,
          ),
        ),
      ),
    );
  }

  Widget _buildGraph() {
    return Container(
      height: 180,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 180),
          painter: _VoltageGraphPainter(
            tau: _tau,
            voltage: _voltage,
            currentTime: _currentTime,
            isCharging: _isCharging,
            showVoltage: _showVoltage,
            showCurrent: _showCurrent,
          ),
        ),
      ),
    );
  }

  Widget _buildControls() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          _ControlSlider(
            label: 'R = ' + _formatResistance(_resistance),
            value: _resistance,
            min: 1000,
            max: 100000,
            onChanged: (v) => setState(() {
              _resistance = v;
              _controller.duration = Duration(milliseconds: (_getTimeScale() * 1000).toInt());
            }),
            displayValue: _formatResistance(_resistance),
          ),
          const SizedBox(height: Spacing.sm),
          _ControlSlider(
            label: 'C = ' + _formatCapacitance(_capacitance),
            value: _capacitance,
            min: 1e-6,
            max: 100e-6,
            onChanged: (v) => setState(() {
              _capacitance = v;
              _controller.duration = Duration(milliseconds: (_getTimeScale() * 1000).toInt());
            }),
            displayValue: _formatCapacitance(_capacitance),
          ),
          const SizedBox(height: Spacing.md),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton.filled(
                icon: const Icon(Icons.refresh),
                onPressed: _reset,
              ),
              const SizedBox(width: Spacing.md),
              ElevatedButton.icon(
                onPressed: _startSimulation,
                icon: const Icon(Icons.play_arrow),
                label: Text(_isCharging ? 'Charger' : 'Décharger'),
              ),
              const SizedBox(width: Spacing.md),
              ChoiceChip(
                label: Text(_isCharging ? 'Charging' : 'Discharging'),
                selected: true,
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ChoiceChip(
                label: const Text('Tension'),
                selected: _showVoltage,
                onSelected: (_) => setState(() {
                  _showVoltage = true;
                  _showCurrent = false;
                }),
              ),
              const SizedBox(width: Spacing.sm),
              ChoiceChip(
                label: const Text('Courant'),
                selected: _showCurrent,
                onSelected: (_) => setState(() {
                  _showCurrent = true;
                  _showVoltage = false;
                }),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMeasurements() {
    final vCap = _getCapacitorVoltage(_currentTime);
    final i = _getCurrent(_currentTime);

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.primary.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.primary.withValues(alpha: 0.2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _MeasurementDisplay(
            label: 'τ = RC',
            value: '${(_tau * 1000).toStringAsFixed(1)} ms',
            color: BacPrepColors.accent,
          ),
          _MeasurementDisplay(
            label: 'u_C(t)',
            value: '${vCap.toStringAsFixed(2)} V',
            color: BacPrepColors.success,
          ),
          _MeasurementDisplay(
            label: 'i(t)',
            value: '${(i * 1000).toStringAsFixed(2)} mA',
            color: BacPrepColors.warning,
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
              'τ = ${(_tau * 1000).toStringAsFixed(1)} ms',
              style: const TextStyle(
                fontSize: 18,
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
              hintText: 'Réponse (Ω)',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
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

class _ControlSlider extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final ValueChanged<double> onChanged;
  final String displayValue;

  const _ControlSlider({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
    required this.displayValue,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 80,
          child: Text(
            label,
            style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 12),
          ),
        ),
        Expanded(
          child: Slider(
            value: value.clamp(min, max),
            min: min,
            max: max,
            onChanged: onChanged,
          ),
        ),
        SizedBox(
          width: 70,
          child: Text(
            displayValue,
            textAlign: TextAlign.end,
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.primary,
            ),
          ),
        ),
      ],
    );
  }
}

class _MeasurementDisplay extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _MeasurementDisplay({
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(fontSize: 11, color: BacPrepColors.textSecondary),
        ),
        const SizedBox(height: 2),
        Text(
          value,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: color,
          ),
        ),
      ],
    );
  }
}

class _CircuitPainter extends CustomPainter {
  final double resistance;
  final double capacitance;
  final double voltage;
  final double currentTime;
  final bool isCharging;

  _CircuitPainter({
    required this.resistance,
    required this.capacitance,
    required this.voltage,
    required this.currentTime,
    required this.isCharging,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final bgPaint = Paint()..color = BacPrepColors.surface;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final wirePaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final resistorPaint = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final capacitorPaint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final circuitWidth = size.width * 0.7;
    final circuitHeight = size.height * 0.6;

    canvas.drawLine(
      Offset(centerX - circuitWidth / 2, centerY - circuitHeight / 2),
      Offset(centerX - circuitWidth / 4, centerY - circuitHeight / 2),
      wirePaint,
    );
    
    _drawResistor(
      canvas,
      Offset(centerX - circuitWidth / 4, centerY - circuitHeight / 2),
      Offset(centerX + circuitWidth / 4, centerY - circuitHeight / 2),
      resistorPaint,
    );

    canvas.drawLine(
      Offset(centerX + circuitWidth / 4, centerY - circuitHeight / 2),
      Offset(centerX + circuitWidth / 2, centerY - circuitHeight / 2),
      wirePaint,
    );

    canvas.drawLine(
      Offset(centerX + circuitWidth / 2, centerY - circuitHeight / 2),
      Offset(centerX + circuitWidth / 2, centerY + circuitHeight / 2),
      wirePaint,
    );

    _drawCapacitor(
      canvas,
      Offset(centerX + circuitWidth / 2, centerY),
      capacitorPaint,
    );

    canvas.drawLine(
      Offset(centerX + circuitWidth / 2, centerY + circuitHeight / 2),
      Offset(centerX - circuitWidth / 2, centerY + circuitHeight / 2),
      wirePaint,
    );

    canvas.drawLine(
      Offset(centerX - circuitWidth / 2, centerY + circuitHeight / 2),
      Offset(centerX - circuitWidth / 2, centerY - circuitHeight / 2),
      wirePaint,
    );

    _drawBattery(
      canvas,
      Offset(centerX - circuitWidth / 2, centerY),
      voltage,
      wirePaint,
    );

    final tau = resistance * capacitance;
    final vCap = voltage * (isCharging 
        ? (1 - math.exp(-currentTime / tau))
        : math.exp(-currentTime / tau));

    final fillPaint = Paint()
      ..color = BacPrepColors.warning.withValues(alpha: 0.3 * (vCap / voltage))
      ..style = PaintingStyle.fill;
    canvas.drawRect(
      Rect.fromLTWH(centerX + circuitWidth / 2 - 15, centerY - 25 * (vCap / voltage), 30, 50 * (vCap / voltage)),
      fillPaint,
    );

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'E = ${voltage.toStringAsFixed(0)}V',
      style: TextStyle(color: BacPrepColors.success, fontSize: 11, fontWeight: FontWeight.w600),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - circuitWidth / 2 - 35, centerY - 10));

    textPainter.text = TextSpan(
      text: 'R = ${(resistance / 1000).toStringAsFixed(0)}kΩ',
      style: TextStyle(color: BacPrepColors.physics, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - 30, centerY - circuitHeight / 2 - 25));

    textPainter.text = TextSpan(
      text: 'C = ${(capacitance * 1e6).toStringAsFixed(0)}μF',
      style: TextStyle(color: BacPrepColors.warning, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + circuitWidth / 2 + 10, centerY - 5));
  }

  void _drawResistor(Canvas canvas, Offset start, Offset end, Paint paint) {
    final direction = end - start;
    final length = direction.distance;
    final normalized = direction / length;
    final perpendicular = Offset(-normalized.dy, normalized.dx);
    
    final zigzagHeight = 8.0;
    final zigzagLength = length / 6;
    
    final path = Path();
    path.moveTo(start.dx, start.dy);
    
    for (int i = 0; i < 6; i++) {
      final x = start.dx + normalized.dx * zigzagLength * i;
      final y = start.dy + normalized.dy * zigzagLength * i;
      final offset = (i % 2 == 0) ? zigzagHeight : -zigzagHeight;
      path.lineTo(
        x + perpendicular.dx * offset,
        y + perpendicular.dy * offset,
      );
    }
    
    path.lineTo(end.dx, end.dy);
    canvas.drawPath(path, paint);
  }

  void _drawCapacitor(Canvas canvas, Offset center, Paint paint) {
    canvas.drawLine(
      Offset(center.dx, center.dy - 25),
      Offset(center.dx, center.dy - 5),
      paint,
    );
    canvas.drawLine(
      Offset(center.dx - 15, center.dy - 5),
      Offset(center.dx + 15, center.dy - 5),
      paint,
    );
    canvas.drawLine(
      Offset(center.dx - 15, center.dy + 5),
      Offset(center.dx + 15, center.dy + 5),
      paint,
    );
    canvas.drawLine(
      Offset(center.dx, center.dy + 5),
      Offset(center.dx, center.dy + 25),
      paint,
    );
  }

  void _drawBattery(Canvas canvas, Offset center, double voltage, Paint paint) {
    final longLine = Paint()
      ..color = paint.color
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;
    final shortLine = Paint()
      ..color = paint.color
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    canvas.drawLine(
      Offset(center.dx - 15, center.dy - 20),
      Offset(center.dx - 15, center.dy + 20),
      longLine,
    );
    canvas.drawLine(
      Offset(center.dx, center.dy - 10),
      Offset(center.dx, center.dy + 10),
      shortLine,
    );

    canvas.drawLine(
      Offset(center.dx - 15, center.dy - 20),
      Offset(center.dx - 15, center.dy - 20),
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant _CircuitPainter oldDelegate) {
    return currentTime != oldDelegate.currentTime ||
        isCharging != oldDelegate.isCharging;
  }
}

class _VoltageGraphPainter extends CustomPainter {
  final double tau;
  final double voltage;
  final double currentTime;
  final bool isCharging;
  final bool showVoltage;
  final bool showCurrent;

  _VoltageGraphPainter({
    required this.tau,
    required this.voltage,
    required this.currentTime,
    required this.isCharging,
    required this.showVoltage,
    required this.showCurrent,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final padding = 30.0;
    final graphWidth = size.width - padding * 2;
    final graphHeight = size.height - padding * 2;

    final bgPaint = Paint()..color = BacPrepColors.surface;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1;
    canvas.drawLine(
      Offset(padding, size.height - padding),
      Offset(size.width - padding, size.height - padding),
      axisPaint,
    );
    canvas.drawLine(
      Offset(padding, padding),
      Offset(padding, size.height - padding),
      axisPaint,
    );

    final voltagePaint = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    final currentPaint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final timeScale = tau * 5;
    final path = Path();

    if (showVoltage) {
      path.moveTo(padding, size.height - padding);
      for (double t = 0; t <= currentTime.clamp(0, timeScale); t += timeScale / 100) {
        final v = voltage * (isCharging 
            ? (1 - math.exp(-t / tau))
            : math.exp(-t / tau));
        final x = padding + (t / timeScale) * graphWidth;
        final y = size.height - padding - (v / (voltage * 1.2)) * graphHeight;
        path.lineTo(x, y);
      }
      canvas.drawPath(path, voltagePaint);
    }

    if (showCurrent) {
      final currentPath = Path();
      final maxCurrent = voltage / 10000;
      currentPath.moveTo(padding, size.height - padding);
      for (double t = 0; t <= currentTime.clamp(0, timeScale); t += timeScale / 100) {
        final i = (voltage / 10000) * (isCharging 
            ? math.exp(-t / tau)
            : -math.exp(-t / tau));
        final x = padding + (t / timeScale) * graphWidth;
        final y = size.height - padding - ((i + maxCurrent) / (2 * maxCurrent)) * graphHeight;
        currentPath.lineTo(x, y);
      }
      canvas.drawPath(currentPath, currentPaint);
    }

    final markerX = padding + (currentTime / timeScale) * graphWidth;
    canvas.drawLine(
      Offset(markerX, padding),
      Offset(markerX, size.height - padding),
      Paint()
        ..color = BacPrepColors.accent
        ..strokeWidth = 1
        ..style = PaintingStyle.stroke,
    );

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 't = ${(currentTime * 1000).toStringAsFixed(0)} ms',
      style: TextStyle(color: BacPrepColors.accent, fontSize: 11, fontWeight: FontWeight.w600),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(markerX - textPainter.width / 2, size.height - padding + 4));
  }

  @override
  bool shouldRepaint(covariant _VoltageGraphPainter oldDelegate) {
    return currentTime != oldDelegate.currentTime ||
        isCharging != oldDelegate.isCharging;
  }
}
