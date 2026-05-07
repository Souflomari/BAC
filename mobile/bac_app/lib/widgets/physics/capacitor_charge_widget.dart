import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class CapacitorChargeWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const CapacitorChargeWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<CapacitorChargeWidget> createState() => _CapacitorChargeWidgetState();
}

class _CapacitorChargeWidgetState extends State<CapacitorChargeWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _capacitance = 100;
  double _voltage = 12;
  double _currentTime = 0;
  bool _isCharging = true;
  bool _showCharge = true;
  bool _showEnergy = true;
  bool _showCurrent = false;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );
    _controller.addListener(() {
      setState(() {
        _currentTime = _controller.value * _timeConstant * 5;
      });
    });
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() => _isCharging = false);
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _timeConstant => _capacitance * 1e-6 * 1000;
  double get _maxCharge => _capacitance * 1e-6 * _voltage;
  double get _maxEnergy => 0.5 * _capacitance * 1e-6 * _voltage * _voltage;

  double _charge(double t) => _maxCharge * (1 - math.exp(-t / _timeConstant));
  double _current(double t) => (_maxCharge / _timeConstant) * math.exp(-t / _timeConstant);
  double _energy(double t) => 0.5 * _capacitance * 1e-6 * math.pow(_charge(t) / (_capacitance * 1e-6), 2);
  double _voltageAt(double t) => _charge(t) / (_capacitance * 1e-6);

  void _toggleCharging() {
    setState(() {
      if (_controller.isAnimating) {
        _controller.stop();
        _isCharging = false;
      } else {
        if (_controller.value >= 1.0) {
          _controller.reset();
          _currentTime = 0;
        }
        _controller.forward();
        _isCharging = true;
      }
    });
  }

  void _reset() {
    _controller.reset();
    setState(() {
      _currentTime = 0;
      _isCharging = false;
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
          _buildCircuit(),
          const SizedBox(height: Spacing.md),
          _buildGraph(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildDataDisplay(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildCircuit() {
    return Container(
      height: 150,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 150),
          painter: _CapacitorCircuitPainter(
            charge: _charge(_currentTime),
            maxCharge: _maxCharge,
            voltage: _voltageAt(_currentTime),
            maxVoltage: _voltage,
          ),
        ),
      ),
    );
  }

  Widget _buildGraph() {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 200),
          painter: _ChargeGraphPainter(
            currentTime: _currentTime,
            timeConstant: _timeConstant,
            maxCharge: _maxCharge,
            maxCurrent: _maxCharge / _timeConstant,
            maxEnergy: _maxEnergy,
            showCharge: _showCharge,
            showCurrent: _showCurrent,
            showEnergy: _showEnergy,
            charge: _charge,
            current: _current,
            energy: _energy,
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
          icon: Icon(_isCharging ? Icons.pause : Icons.play_arrow),
          iconSize: 36,
          onPressed: _toggleCharging,
          style: IconButton.styleFrom(
            backgroundColor: BacPrepColors.physics,
            foregroundColor: Colors.white,
          ),
        ),
        const SizedBox(width: Spacing.md),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: BacPrepColors.accent.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            'τ = ${_timeConstant.toStringAsFixed(2)}τ',
            style: TextStyle(
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
          Text(
            'Paramètres',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          _ParameterSlider(
            label: 'Capacité (μF)',
            value: _capacitance,
            min: 10,
            max: 500,
            onChanged: (v) => setState(() => _capacitance = v),
          ),
          const SizedBox(height: Spacing.sm),
          _ParameterSlider(
            label: 'Tension (V)',
            value: _voltage,
            min: 1,
            max: 24,
            onChanged: (v) => setState(() => _voltage = v),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Charge Q'),
                selected: _showCharge,
                onSelected: (v) => setState(() => _showCharge = v),
              ),
              FilterChip(
                label: const Text('Courant I'),
                selected: _showCurrent,
                onSelected: (v) => setState(() => _showCurrent = v),
              ),
              FilterChip(
                label: const Text('Énergie E'),
                selected: _showEnergy,
                onSelected: (v) => setState(() => _showEnergy = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay() {
    final q = _charge(_currentTime);
    final e = _energy(_currentTime);

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
          _DataItem(
            icon: Icons.electric_bolt,
            label: 'Q',
            value: '${(q * 1e6).toStringAsFixed(1)} μC',
            color: BacPrepColors.primary,
          ),
          _DataItem(
            icon: Icons.electric_meter,
            label: 'U',
            value: '${_voltageAt(_currentTime).toStringAsFixed(1)} V',
            color: BacPrepColors.warning,
          ),
          _DataItem(
            icon: Icons.bolt,
            label: 'E_c',
            value: '${(e * 1e6).toStringAsFixed(1)} μJ',
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
              'Énergie finale : ${(_maxEnergy * 1e6).toStringAsFixed(1)} μJ',
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
              hintText: 'Énergie emmagasinée (μJ)',
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
  final ValueChanged<double> onChanged;

  const _ParameterSlider({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 140,
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
            value.toStringAsFixed(0),
            style: const TextStyle(fontWeight: FontWeight.w600),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

class _DataItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const _DataItem({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: color, size: 20),
        Text(label, style: TextStyle(fontSize: 10, color: BacPrepColors.textSecondary)),
        Text(
          value,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color),
        ),
      ],
    );
  }
}

class _CapacitorCircuitPainter extends CustomPainter {
  final double charge;
  final double maxCharge;
  final double voltage;
  final double maxVoltage;

  _CapacitorCircuitPainter({
    required this.charge,
    required this.maxCharge,
    required this.voltage,
    required this.maxVoltage,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height / 2;

    final plateWidth = 80.0;
    final plateHeight = 60.0;
    final gap = 20.0 * (1 - charge / maxCharge).clamp(0.1, 1.0);

    final platePaint = Paint()
      ..color = BacPrepColors.primary
      ..style = PaintingStyle.fill;
    final wirePaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    canvas.drawLine(Offset(centerX - plateWidth, centerY), Offset(centerX - gap / 2, centerY), wirePaint);
    canvas.drawLine(Offset(centerX + gap / 2, centerY), Offset(centerX + plateWidth, centerY), wirePaint);

    canvas.drawRect(
      Rect.fromLTWH(centerX - plateWidth - 10, centerY - plateHeight / 2, 10, plateHeight),
      platePaint,
    );

    final plate2Rect = Rect.fromLTWH(centerX + gap / 2, centerY - plateHeight / 2, 10, plateHeight);
    canvas.drawRect(plate2Rect, platePaint..color = BacPrepColors.warning);

    final chargePercent = (charge / maxCharge).clamp(0.0, 1.0);
    final chargePaint = Paint()
      ..color = BacPrepColors.success.withValues(alpha: chargePercent * 0.8)
      ..style = PaintingStyle.fill;

    final chargeWidth = gap * chargePercent;
    canvas.drawRect(
      Rect.fromLTWH(centerX - chargeWidth / 2, centerY - plateHeight / 2 + 5, chargeWidth, plateHeight - 10),
      chargePaint,
    );

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'Q = ${(charge * 1e6).toStringAsFixed(1)} μC',
      style: TextStyle(color: BacPrepColors.primary, fontSize: 12, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - textPainter.width / 2, centerY + plateHeight / 2 + 10));

    textPainter.text = TextSpan(
      text: 'U = ${voltage.toStringAsFixed(1)} V',
      style: TextStyle(color: BacPrepColors.warning, fontSize: 11),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - textPainter.width / 2, centerY + plateHeight / 2 + 25));
  }

  @override
  bool shouldRepaint(covariant _CapacitorCircuitPainter oldDelegate) {
    return charge != oldDelegate.charge || voltage != oldDelegate.voltage;
  }
}

class _ChargeGraphPainter extends CustomPainter {
  final double currentTime;
  final double timeConstant;
  final double maxCharge;
  final double maxCurrent;
  final double maxEnergy;
  final bool showCharge;
  final bool showCurrent;
  final bool showEnergy;
  final double Function(double) charge;
  final double Function(double) current;
  final double Function(double) energy;

  _ChargeGraphPainter({
    required this.currentTime,
    required this.timeConstant,
    required this.maxCharge,
    required this.maxCurrent,
    required this.maxEnergy,
    required this.showCharge,
    required this.showCurrent,
    required this.showEnergy,
    required this.charge,
    required this.current,
    required this.energy,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final leftPadding = 40.0;
    final bottomPadding = 30.0;
    final graphWidth = size.width - leftPadding - 10;
    final graphHeight = size.height - bottomPadding - 10;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;
    canvas.drawLine(Offset(leftPadding, 10), Offset(leftPadding, size.height - bottomPadding), axisPaint);
    canvas.drawLine(Offset(leftPadding, size.height - bottomPadding), Offset(size.width - 10, size.height - bottomPadding), axisPaint);

    final maxT = timeConstant * 5;
    double toScreenX(double t) => leftPadding + (t / maxT) * graphWidth;

    if (showCharge) {
      final chargePaint = Paint()
        ..color = BacPrepColors.primary
        ..strokeWidth = 2.5
        ..style = PaintingStyle.stroke;

      final path = Path();
      for (double t = 0; t <= currentTime; t += maxT / 100) {
        final q = charge(t);
        final py = size.height - bottomPadding - (q / maxCharge) * graphHeight * 0.8;
        if (t == 0) {
          path.moveTo(toScreenX(t), py);
        } else {
          path.lineTo(toScreenX(t), py);
        }
      }
      canvas.drawPath(path, chargePaint);
    }

    if (showCurrent) {
      final currentPaint = Paint()
        ..color = BacPrepColors.warning
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;

      final path = Path();
      for (double t = 0; t <= currentTime; t += maxT / 100) {
        final i = current(t);
        final py = size.height - bottomPadding - (i / maxCurrent) * graphHeight * 0.8;
        if (t == 0) {
          path.moveTo(toScreenX(t), py);
        } else {
          path.lineTo(toScreenX(t), py);
        }
      }
      canvas.drawPath(path, currentPaint);
    }

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'Q(t)',
      style: TextStyle(color: BacPrepColors.primary, fontSize: 11, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width - 50, 15));

    textPainter.text = TextSpan(
      text: 'I(t)',
      style: TextStyle(color: BacPrepColors.warning, fontSize: 11, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width - 50, 30));

    textPainter.text = TextSpan(
      text: 't (τ)',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width - 30, size.height - 20));
  }

  @override
  bool shouldRepaint(covariant _ChargeGraphPainter oldDelegate) {
    return currentTime != oldDelegate.currentTime;
  }
}
