import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class RefractionSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const RefractionSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<RefractionSimulatorWidget> createState() => _RefractionSimulatorWidgetState();
}

class _RefractionSimulatorWidgetState extends State<RefractionSimulatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _incidentAngle = 30;
  double _n1 = 1.0;
  double _n2 = 1.5;
  bool _showNormal = true;
  bool _showAngles = true;
  bool _showCritical = false;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _criticalAngle {
    if (_n1 <= _n2) return double.infinity;
    return math.asin(_n2 / _n1) * 180 / math.pi;
  }

  double get _refractedAngle {
    final sinI = math.sin(_incidentAngle * math.pi / 180);
    final sinR = _n1 / _n2 * sinI;
    if (sinR.abs() > 1) return double.infinity;
    return math.asin(sinR) * 180 / math.pi;
  }

  bool get _isTotalReflection => _refractedAngle.isInfinite && _n1 > _n2;

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
          _buildSimulation(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildResults(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildSimulation() {
    return Container(
      height: 280,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return CustomPaint(
              size: const Size(double.infinity, 280),
              painter: _RefractionPainter(
                incidentAngle: _incidentAngle,
                refractedAngle: _refractedAngle,
                n1: _n1,
                n2: _n2,
                showNormal: _showNormal,
                showAngles: _showAngles,
                isTotalReflection: _isTotalReflection,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: _isTotalReflection
                ? BacPrepColors.error.withValues(alpha: 0.2)
                : BacPrepColors.success.withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: _isTotalReflection ? BacPrepColors.error : BacPrepColors.success,
            ),
          ),
          child: Text(
            _isTotalReflection ? 'Réflexion totale!' : 'Réfraction',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: _isTotalReflection ? BacPrepColors.error : BacPrepColors.success,
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
            label: 'Angle incident θᵢ',
            value: _incidentAngle,
            min: 0,
            max: 90,
            color: BacPrepColors.primary,
            onChanged: (v) => setState(() {
              _incidentAngle = v;
              _controller.forward(from: 0);
            }),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              Expanded(
                child: _RefractiveIndexPicker(
                  label: 'n₁ (milieu 1)',
                  value: _n1,
                  color: BacPrepColors.warning,
                  onChanged: (v) => setState(() {
                    _n1 = v;
                    _controller.forward(from: 0);
                  }),
                ),
              ),
              const SizedBox(width: Spacing.md),
              Expanded(
                child: _RefractiveIndexPicker(
                  label: 'n₂ (milieu 2)',
                  value: _n2,
                  color: BacPrepColors.success,
                  onChanged: (v) => setState(() {
                    _n2 = v;
                    _controller.forward(from: 0);
                  }),
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Normale'),
                selected: _showNormal,
                onSelected: (v) => setState(() => _showNormal = v),
              ),
              FilterChip(
                label: const Text('Angles'),
                selected: _showAngles,
                onSelected: (v) => setState(() => _showAngles = v),
              ),
              FilterChip(
                label: const Text('Réflexion critique'),
                selected: _showCritical,
                onSelected: (v) => setState(() => _showCritical = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildResults() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.physics.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.physics.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            'Loi de Snell-Descartes',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.physics,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: 'n₁ · sin(θᵢ) = n₂ · sin(θᵣ)',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.math,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _ResultItem(
                label: 'θᵢ',
                value: '${_incidentAngle.toStringAsFixed(1)}°',
                color: BacPrepColors.primary,
              ),
              _ResultItem(
                label: 'θᵣ',
                value: _isTotalReflection
                    ? 'N/A'
                    : '${_refractedAngle.toStringAsFixed(1)}°',
                color: BacPrepColors.success,
              ),
              if (_showCritical)
                _ResultItem(
                  label: 'θc',
                  value: '${_criticalAngle.toStringAsFixed(1)}°',
                  color: BacPrepColors.warning,
                ),
            ],
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
              'θᵣ = ${_refractedAngle.toStringAsFixed(1)}°',
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
              hintText: 'Calculer θᵣ (°)',
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
          width: 150,
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
            '${value.toStringAsFixed(1)}°',
            style: TextStyle(fontWeight: FontWeight.w600, color: color),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

class _RefractiveIndexPicker extends StatelessWidget {
  final String label;
  final double value;
  final Color color;
  final ValueChanged<double> onChanged;

  const _RefractiveIndexPicker({
    required this.label,
    required this.value,
    required this.color,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final materials = {
      1.0: 'Air',
      1.33: 'Eau',
      1.5: 'Verre',
      2.42: 'Diamant',
    };

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 12, color: color)),
        const SizedBox(height: 4),
        DropdownButtonFormField<double>(
          value: materials.keys.any((k) => (k - value).abs() < 0.1) 
              ? materials.keys.firstWhere((k) => (k - value).abs() < 0.1)
              : 1.5,
          decoration: InputDecoration(
            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          items: materials.entries
              .map((e) => DropdownMenuItem(
                    value: e.key,
                    child: Text('${e.value} (n=${e.key})'),
                  ))
              .toList(),
          onChanged: (v) {
            if (v != null) onChanged(v);
          },
        ),
      ],
    );
  }
}

class _ResultItem extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _ResultItem({
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
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: color),
        ),
      ],
    );
  }
}

class _RefractionPainter extends CustomPainter {
  final double incidentAngle;
  final double refractedAngle;
  final double n1;
  final double n2;
  final bool showNormal;
  final bool showAngles;
  final bool isTotalReflection;
  final double animationValue;

  _RefractionPainter({
    required this.incidentAngle,
    required this.refractedAngle,
    required this.n1,
    required this.n2,
    required this.showNormal,
    required this.showAngles,
    required this.isTotalReflection,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height * 0.6;

    final interfacePaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 3;
    canvas.drawLine(Offset(20, centerY), Offset(size.width - 20, centerY), interfacePaint);

    if (showNormal) {
      final normalPaint = Paint()
        ..color = BacPrepColors.textTertiary
        ..strokeWidth = 1;
      canvas.drawLine(Offset(centerX, 20), Offset(centerX, size.height - 20), normalPaint);
    }

    final n1Paint = Paint()
      ..color = BacPrepColors.warning.withValues(alpha: 0.3)
      ..style = PaintingStyle.fill;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, centerY), n1Paint);

    final n2Paint = Paint()
      ..color = BacPrepColors.success.withValues(alpha: 0.3)
      ..style = PaintingStyle.fill;
    canvas.drawRect(Rect.fromLTWH(0, centerY, size.width, size.height - centerY), n2Paint);

    final incidentRad = incidentAngle * math.pi / 180;
    final rayLength = size.width * 0.7;

    final incidentEndX = centerX - rayLength * math.sin(incidentRad);
    final incidentEndY = centerY - rayLength * math.cos(incidentRad);

    final incidentPaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawLine(Offset(centerX, centerY), Offset(incidentEndX, incidentEndY), incidentPaint);

    if (!isTotalReflection) {
      final refractedRad = refractedAngle * math.pi / 180;
      final refractedEndX = centerX + rayLength * math.sin(refractedRad);
      final refractedEndY = centerY + rayLength * math.cos(refractedRad);

      final refractedPaint = Paint()
        ..color = BacPrepColors.success
        ..strokeWidth = 3
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;

      canvas.drawLine(Offset(centerX, centerY), Offset(refractedEndX, refractedEndY), refractedPaint);
    } else {
      final reflectedEndX = centerX + rayLength * math.sin(incidentRad);
      final reflectedEndY = centerY - rayLength * math.cos(incidentRad);

      final reflectedPaint = Paint()
        ..color = BacPrepColors.error
        ..strokeWidth = 3
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;

      canvas.drawLine(Offset(centerX, centerY), Offset(reflectedEndX, reflectedEndY), reflectedPaint);
    }

    if (showAngles) {
      final arcPaint = Paint()
        ..color = BacPrepColors.primary
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;

      canvas.drawArc(
        Rect.fromCenter(center: Offset(centerX, centerY), width: 40, height: 40),
        -math.pi / 2,
        -incidentRad,
        false,
        arcPaint,
      );

      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: '${incidentAngle.toStringAsFixed(0)}°',
        style: TextStyle(color: BacPrepColors.primary, fontSize: 11, fontWeight: FontWeight.bold),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(centerX - 50, centerY - 30));
    }

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'n₁ = ${n1.toStringAsFixed(2)}',
      style: TextStyle(color: BacPrepColors.warning, fontSize: 12, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(10, 10));

    textPainter.text = TextSpan(
      text: 'n₂ = ${n2.toStringAsFixed(2)}',
      style: TextStyle(color: BacPrepColors.success, fontSize: 12, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(10, centerY + 10));

    if (isTotalReflection) {
      textPainter.text = TextSpan(
        text: 'Réflexion totale!',
        style: TextStyle(color: BacPrepColors.error, fontSize: 14, fontWeight: FontWeight.bold),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(centerX - textPainter.width / 2, centerY + 50));
    }
  }

  @override
  bool shouldRepaint(covariant _RefractionPainter oldDelegate) {
    return incidentAngle != oldDelegate.incidentAngle ||
        refractedAngle != oldDelegate.refractedAngle ||
        n1 != oldDelegate.n1 ||
        n2 != oldDelegate.n2 ||
        animationValue != oldDelegate.animationValue;
  }
}
