import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class ForceDiagramWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const ForceDiagramWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<ForceDiagramWidget> createState() => _ForceDiagramWidgetState();
}

class _ForceDiagramWidgetState extends State<ForceDiagramWidget> {
  double _mass = 5;
  double _angle = 30;
  double _frictionCoeff = 0;
  bool _showComponents = true;
  bool _showFriction = false;
  
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _initializeFromConfig();
  }

  void _initializeFromConfig() {
    final config = widget.item.simConfig;
    _mass = (config['mass'] as num?)?.toDouble() ?? 5;
    _angle = (config['angle'] as num?)?.toDouble() ?? 30;
    _frictionCoeff = (config['friction'] as num?)?.toDouble() ?? 0;
  }

  @override
  void didUpdateWidget(ForceDiagramWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _initializeFromConfig();
      _answerController.clear();
      _hasSubmitted = false;
    }
  }

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  double get _gravity => 9.8;
  double get _weight => _mass * _gravity;
  double get _angleRad => _angle * math.pi / 180;
  double get _weightX => _weight * math.sin(_angleRad);
  double get _weightY => _weight * math.cos(_angleRad);
  double get _normalForce => _weight * math.cos(_angleRad);
  double get _frictionForce => _frictionCoeff * _normalForce;
  double get _netForce => _weightX - _frictionForce;
  double get _acceleration => _netForce / _mass;

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
          _buildDiagram(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildForceValues(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildDiagram() {
    return Container(
      height: 300,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 300),
          painter: _ForceDiagramPainter(
            mass: _mass,
            angle: _angle,
            weight: _weight,
            weightX: _weightX,
            weightY: _weightY,
            normalForce: _normalForce,
            frictionForce: _frictionForce,
            showComponents: _showComponents,
            showFriction: _showFriction,
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
            label: 'Masse (kg)',
            value: _mass,
            min: 1,
            max: 20,
            onChanged: (v) => setState(() => _mass = v),
            color: BacPrepColors.physics,
          ),
          const SizedBox(height: Spacing.sm),
          _ControlSlider(
            label: 'Angle α (°)',
            value: _angle,
            min: 0,
            max: 60,
            onChanged: (v) => setState(() => _angle = v),
            color: BacPrepColors.warning,
          ),
          const SizedBox(height: Spacing.sm),
          _ControlSlider(
            label: 'Friction μ',
            value: _frictionCoeff,
            min: 0,
            max: 1,
            onChanged: (v) => setState(() {
              _frictionCoeff = v;
              _showFriction = v > 0;
            }),
            color: BacPrepColors.textSecondary,
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              ChoiceChip(
                label: const Text('Composantes'),
                selected: _showComponents,
                onSelected: (_) => setState(() => _showComponents = !_showComponents),
              ),
              const SizedBox(width: Spacing.sm),
              ChoiceChip(
                label: const Text('Friction'),
                selected: _showFriction,
                onSelected: (_) => setState(() => _showFriction = !_showFriction),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildForceValues() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.primary.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.primary.withValues(alpha: 0.2)),
      ),
      child: Column(
        children: [
          Text(
            'Forces calculées',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.primary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.md,
            runSpacing: Spacing.sm,
            children: [
              _ForceChip(
                label: 'P = mg',
                value: '${_weight.toStringAsFixed(1)} N',
                color: BacPrepColors.physics,
              ),
              _ForceChip(
                label: 'Px = P.sin(α)',
                value: '${_weightX.toStringAsFixed(1)} N',
                color: BacPrepColors.error,
              ),
              _ForceChip(
                label: 'N = P.cos(α)',
                value: '${_normalForce.toStringAsFixed(1)} N',
                color: BacPrepColors.success,
              ),
              if (_showFriction)
                _ForceChip(
                  label: 'f = μN',
                  value: '${_frictionForce.toStringAsFixed(1)} N',
                  color: BacPrepColors.textSecondary,
                ),
              _ForceChip(
                label: 'a = F/m',
                value: '${_acceleration.toStringAsFixed(2)} m/s²',
                color: BacPrepColors.accent,
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
              'Réponse : ${widget.item.correctValue}',
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
              hintText: 'Votre réponse (N)',
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
  final Color color;

  const _ControlSlider({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 90,
          child: Text(
            label,
            style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 13),
          ),
        ),
        Expanded(
          child: SliderTheme(
            data: SliderThemeData(
              activeTrackColor: color,
              thumbColor: color,
              inactiveTrackColor: color.withValues(alpha: 0.3),
            ),
            child: Slider(
              value: value.clamp(min, max),
              min: min,
              max: max,
              onChanged: onChanged,
            ),
          ),
        ),
        SizedBox(
          width: 55,
          child: Text(
            value.toStringAsFixed(value == value.roundToDouble() ? 0 : 1),
            textAlign: TextAlign.end,
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ),
      ],
    );
  }
}

class _ForceChip extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _ForceChip({
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 11, color: color),
          ),
          const SizedBox(width: 4),
          Text(
            value,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

class _ForceDiagramPainter extends CustomPainter {
  final double mass;
  final double angle;
  final double weight;
  final double weightX;
  final double weightY;
  final double normalForce;
  final double frictionForce;
  final bool showComponents;
  final bool showFriction;

  _ForceDiagramPainter({
    required this.mass,
    required this.angle,
    required this.weight,
    required this.weightX,
    required this.weightY,
    required this.normalForce,
    required this.frictionForce,
    required this.showComponents,
    required this.showFriction,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final bgPaint = Paint()..color = BacPrepColors.surface;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final centerX = size.width * 0.4;
    final centerY = size.height * 0.6;
    final scale = 1.5;

    final angleRad = angle * math.pi / 180;
    final inclineLength = 180.0;
    final endX = centerX + inclineLength * math.cos(angleRad);
    final endY = centerY - inclineLength * math.sin(angleRad);

    final groundPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 3;
    canvas.drawLine(Offset(centerX, centerY), Offset(endX, endY), groundPaint);
    canvas.drawLine(
      Offset(endX, endY),
      Offset(endX, centerY + 20),
      groundPaint,
    );
    canvas.drawLine(
      Offset(endX, centerY + 20),
      Offset(centerX - 30, centerY + 20),
      groundPaint,
    );

    final blockPaint = Paint()
      ..color = BacPrepColors.physics
      ..style = PaintingStyle.fill;
    final blockStrokePaint = Paint()
      ..color = BacPrepColors.physics.withValues(alpha: 0.5)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;
    
    final blockSize = 40.0;
    final blockAngle = angleRad;
    final blockCorners = [
      Offset(centerX - blockSize / 2 * math.cos(blockAngle), centerY - blockSize / 2 * math.sin(blockAngle)),
      Offset(centerX + blockSize / 2 * math.cos(blockAngle), centerY + blockSize / 2 * math.sin(blockAngle)),
      Offset(centerX + blockSize / 2 * math.cos(blockAngle) + blockSize * math.sin(blockAngle),
             centerY + blockSize / 2 * math.sin(blockAngle) - blockSize * math.cos(blockAngle)),
      Offset(centerX - blockSize / 2 * math.cos(blockAngle) + blockSize * math.sin(blockAngle),
             centerY - blockSize / 2 * math.sin(blockAngle) - blockSize * math.cos(blockAngle)),
    ];
    
    final blockPath = Path()
      ..moveTo(blockCorners[0].dx, blockCorners[0].dy)
      ..lineTo(blockCorners[1].dx, blockCorners[1].dy)
      ..lineTo(blockCorners[2].dx, blockCorners[2].dy)
      ..lineTo(blockCorners[3].dx, blockCorners[3].dy)
      ..close();
    canvas.drawPath(blockPath, blockPaint);
    canvas.drawPath(blockPath, blockStrokePaint);

    _drawArrow(canvas, Offset(centerX, centerY), Offset(centerX, centerY + weight * scale), 
               BacPrepColors.physics, 3, 'P');

    if (showComponents) {
      _drawArrow(canvas, Offset(centerX, centerY), Offset(centerX + weightX * scale, centerY),
                 BacPrepColors.error, 2, 'Px');
      _drawArrow(canvas, Offset(centerX, centerY), Offset(centerX, centerY - weightY * scale),
                 BacPrepColors.success, 2, 'Py');
    }

    final normalEndY = centerY - normalForce * scale * math.cos(angleRad);
    final normalEndX = centerX + normalForce * scale * math.sin(angleRad);
    _drawArrow(canvas, Offset(centerX, centerY), Offset(normalEndX, normalEndY),
               BacPrepColors.success, 2.5, 'N');

    if (showFriction) {
      _drawArrow(canvas, Offset(centerX + weightX * scale, centerY),
                 Offset(centerX, centerY),
                 BacPrepColors.textSecondary, 2, 'f');
    }

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'α = $angle°',
      style: TextStyle(color: BacPrepColors.accent, fontSize: 12, fontWeight: FontWeight.w600),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + 10, centerY - 20));

    textPainter.text = TextSpan(
      text: 'm = ${mass.toStringAsFixed(1)} kg',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 11),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - 35, centerY + 10));
  }

  void _drawArrow(Canvas canvas, Offset start, Offset end, Color color, double width, String label) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = width
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawLine(start, end, paint);

    final direction = (end - start);
    final length = direction.distance;
    if (length < 10) return;
    
    final normalized = direction / length;
    final perpendicular = Offset(-normalized.dy, normalized.dx);
    final arrowSize = 8.0;
    
    final arrowTip = end;
    final arrowLeft = end - normalized * arrowSize + perpendicular * arrowSize / 2;
    final arrowRight = end - normalized * arrowSize - perpendicular * arrowSize / 2;

    final arrowPath = Path()
      ..moveTo(arrowTip.dx, arrowTip.dy)
      ..lineTo(arrowLeft.dx, arrowLeft.dy)
      ..moveTo(arrowTip.dx, arrowTip.dy)
      ..lineTo(arrowRight.dx, arrowRight.dy);
    
    canvas.drawPath(arrowPath, paint);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: label,
      style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w600),
    );
    textPainter.layout();
    
    final midPoint = Offset((start.dx + end.dx) / 2, (start.dy + end.dy) / 2);
    textPainter.paint(canvas, Offset(midPoint.dx + 5, midPoint.dy - 15));
  }

  @override
  bool shouldRepaint(covariant _ForceDiagramPainter oldDelegate) {
    return mass != oldDelegate.mass ||
        angle != oldDelegate.angle ||
        showComponents != oldDelegate.showComponents ||
        showFriction != oldDelegate.showFriction;
  }
}
