import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class ComplexPlaneWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const ComplexPlaneWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<ComplexPlaneWidget> createState() => _ComplexPlaneWidgetState();
}

class _ComplexPlaneWidgetState extends State<ComplexPlaneWidget> {
  double _real = 0;
  double _imaginary = 0;
  bool _showVector = true;
  bool _showModule = true;
  bool _showArgument = false;
  
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _initializeFromConfig();
  }

  void _initializeFromConfig() {
    final config = widget.item.graphConfig;
    final expectedRe = (config['expected_re'] as num?)?.toDouble();
    final expectedIm = (config['expected_im'] as num?)?.toDouble();
    
    if (expectedRe != null) _real = expectedRe;
    if (expectedIm != null) _imaginary = expectedIm;
  }

  @override
  void didUpdateWidget(ComplexPlaneWidget oldWidget) {
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

  double get _module => math.sqrt(_real * _real + _imaginary * _imaginary);
  double get _argument {
    if (_real == 0 && _imaginary == 0) return 0;
    var angle = math.atan2(_imaginary, _real) * 180 / math.pi;
    if (angle < 0) angle += 360;
    return angle;
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
          _buildComplexPlane(),
          const SizedBox(height: Spacing.md),
          _buildPointControls(),
          const SizedBox(height: Spacing.md),
          _buildMeasurements(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildComplexPlane() {
    return Container(
      height: 300,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: GestureDetector(
          onPanUpdate: (details) {
            setState(() {
              final dx = details.delta.dx * 0.1;
              final dy = -details.delta.dy * 0.1;
              _real = (_real + dx).clamp(-10, 10);
              _imaginary = (_imaginary + dy).clamp(-10, 10);
            });
          },
          onTapUp: (details) {
            final localPos = details.localPosition;
            setState(() {
              _real = ((localPos.dx - 150) / 30).clamp(-10.0, 10.0);
              _imaginary = ((150 - localPos.dy) / 30).clamp(-10.0, 10.0);
            });
          },
          child: CustomPaint(
            size: const Size(double.infinity, 300),
            painter: _ComplexPlanePainter(
              real: _real,
              imaginary: _imaginary,
              showVector: _showVector,
              showModule: _showModule,
              showArgument: _showArgument,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPointControls() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Text('Re(z) =', style: TextStyle(color: BacPrepColors.textSecondary)),
              const Spacer(),
              IconButton(
                icon: const Icon(Icons.remove_circle_outline),
                onPressed: () => setState(() => _real = (_real - 0.5).clamp(-10, 10)),
              ),
              Container(
                width: 80,
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _real.toStringAsFixed(1),
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.primary,
                    fontSize: 16,
                  ),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.add_circle_outline),
                onPressed: () => setState(() => _real = (_real + 0.5).clamp(-10, 10)),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              Text('Im(z) =', style: TextStyle(color: BacPrepColors.textSecondary)),
              const Spacer(),
              IconButton(
                icon: const Icon(Icons.remove_circle_outline),
                onPressed: () => setState(() => _imaginary = (_imaginary - 0.5).clamp(-10, 10)),
              ),
              Container(
                width: 80,
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: BacPrepColors.warning.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _imaginary.toStringAsFixed(1),
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.warning,
                    fontSize: 16,
                  ),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.add_circle_outline),
                onPressed: () => setState(() => _imaginary = (_imaginary + 0.5).clamp(-10, 10)),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMeasurements() {
    return Row(
      children: [
        Expanded(
          child: _MeasurementCard(
            icon: Icons.straighten,
            label: 'Module |z|',
            value: _module.toStringAsFixed(2),
            color: BacPrepColors.success,
            isActive: _showModule,
            onTap: () => setState(() => _showModule = !_showModule),
          ),
        ),
        const SizedBox(width: Spacing.sm),
        Expanded(
          child: _MeasurementCard(
            icon: Icons.rotate_right,
            label: 'Argument',
            value: '${_argument.toStringAsFixed(1)}°',
            color: BacPrepColors.primary,
            isActive: _showArgument,
            onTap: () => setState(() => _showArgument = !_showArgument),
          ),
        ),
      ],
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
              '|z| = ${widget.item.correctValue}',
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
              hintText: 'Module |z|',
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

class _MeasurementCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;
  final bool isActive;
  final VoidCallback onTap;

  const _MeasurementCard({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(Spacing.md),
        decoration: BoxDecoration(
          color: isActive ? color.withValues(alpha: 0.1) : BacPrepColors.surfaceVariant,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isActive ? color : BacPrepColors.border,
            width: isActive ? 2 : 1,
          ),
        ),
        child: Column(
          children: [
            Icon(icon, color: isActive ? color : BacPrepColors.textTertiary),
            const SizedBox(height: Spacing.xs),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                color: BacPrepColors.textSecondary,
              ),
            ),
            const SizedBox(height: Spacing.xs),
            Text(
              value,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: isActive ? color : BacPrepColors.textPrimary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ComplexPlanePainter extends CustomPainter {
  final double real;
  final double imaginary;
  final bool showVector;
  final bool showModule;
  final bool showArgument;

  _ComplexPlanePainter({
    required this.real,
    required this.imaginary,
    required this.showVector,
    required this.showModule,
    required this.showArgument,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final scale = 30.0;

    final bgPaint = Paint()..color = Colors.white;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final gridPaint = Paint()
      ..color = BacPrepColors.border.withValues(alpha: 0.5)
      ..strokeWidth = 0.5;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;

    final vectorPaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final modulePaint = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final argumentPaint = Paint()
      ..color = BacPrepColors.accent
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final dotPaint = Paint()
      ..color = BacPrepColors.primary
      ..style = PaintingStyle.fill;

    for (double i = -10; i <= 10; i++) {
      if (i == 0) continue;
      final x = centerX + i * scale;
      final y = centerY + i * scale;
      if (x >= 0 && x <= size.width) {
        canvas.drawLine(Offset(x, 0), Offset(x, size.height), gridPaint);
      }
      if (y >= 0 && y <= size.height) {
        canvas.drawLine(Offset(0, y), Offset(size.width, y), gridPaint);
      }
    }

    canvas.drawLine(
      Offset(centerX, 0),
      Offset(centerX, size.height),
      axisPaint,
    );
    canvas.drawLine(
      Offset(0, centerY),
      Offset(size.width, centerY),
      axisPaint,
    );

    final pointX = centerX + real * scale;
    final pointY = centerY - imaginary * scale;

    if (showModule) {
      final module = math.sqrt(real * real + imaginary * imaginary);
      if (module > 0.1) {
        final angle = math.atan2(imaginary, real);
        final arcRect = Rect.fromCenter(
          center: Offset(centerX, centerY),
          width: 60,
          height: 60,
        );
        canvas.drawArc(
          arcRect,
          0,
          angle,
          false,
          argumentPaint,
        );
        
        final textPainter = TextPainter(textDirection: TextDirection.ltr);
        textPainter.text = TextSpan(
          text: module.toStringAsFixed(2),
          style: TextStyle(
            color: BacPrepColors.success,
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
        );
        textPainter.layout();
        final midX = (centerX + pointX) / 2;
        final midY = (centerY + pointY) / 2;
        textPainter.paint(canvas, Offset(midX + 5, midY - 10));
      }
    }

    if (showArgument) {
      final angle = math.atan2(imaginary, real);
      final arcPaint = Paint()
        ..color = BacPrepColors.accent
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;
      
      final arcRect = Rect.fromCenter(
        center: Offset(centerX, centerY),
        width: 50,
        height: 50,
      );
      canvas.drawArc(arcRect, 0, angle, false, arcPaint);

      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: '${(angle * 180 / math.pi).toStringAsFixed(1)}°',
        style: TextStyle(
          color: BacPrepColors.accent,
          fontSize: 11,
          fontWeight: FontWeight.w500,
        ),
      );
      textPainter.layout();
      final labelAngle = angle / 2;
      final labelX = centerX + 35 * math.cos(labelAngle);
      final labelY = centerY - 35 * math.sin(labelAngle);
      textPainter.paint(canvas, Offset(labelX - textPainter.width / 2, labelY - textPainter.height / 2));
    }

    if (showVector) {
      canvas.drawLine(Offset(centerX, centerY), Offset(pointX, pointY), vectorPaint);
      canvas.drawLine(
        Offset(centerX, centerY),
        Offset(pointX, centerY),
        modulePaint,
      );
      canvas.drawLine(
        Offset(pointX, centerY),
        Offset(pointX, pointY),
        argumentPaint,
      );
    }

    canvas.drawCircle(Offset(pointX, pointY), 10, dotPaint);
    canvas.drawCircle(
      Offset(pointX, pointY),
      10,
      Paint()
        ..color = Colors.white
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2,
    );

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    
    textPainter.text = TextSpan(
      text: '1',
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + scale - 5, centerY + 4));
    
    textPainter.text = TextSpan(
      text: 'i',
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 12, fontWeight: FontWeight.w600),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + 4, centerY - scale + 2));

    textPainter.text = TextSpan(
      text: 'Re',
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width - 30, centerY + 4));

    textPainter.text = TextSpan(
      text: 'Im',
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + 4, 4));
  }

  @override
  bool shouldRepaint(covariant _ComplexPlanePainter oldDelegate) {
    return real != oldDelegate.real ||
        imaginary != oldDelegate.imaginary ||
        showVector != oldDelegate.showVector ||
        showModule != oldDelegate.showModule ||
        showArgument != oldDelegate.showArgument;
  }
}
