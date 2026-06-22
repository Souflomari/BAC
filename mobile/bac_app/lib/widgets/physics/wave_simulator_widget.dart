import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class WaveSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const WaveSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<WaveSimulatorWidget> createState() => _WaveSimulatorWidgetState();
}

class _WaveSimulatorWidgetState extends State<WaveSimulatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  double _wavelength = 0.5;
  double _slitSeparation = 0.001;
  double _screenDistance = 2;
  double _animationPhase = 0;
  bool _showInterference = true;
  bool _showSlits = true;
  
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat();
    _controller.addListener(() {
      setState(() {
        _animationPhase = _controller.value * 2 * math.pi;
      });
    });
    _initializeFromConfig();
  }

  void _initializeFromConfig() {
    final config = widget.item.simConfig;
    _wavelength = (config['wavelength'] as num?)?.toDouble() ?? 0.5;
    _slitSeparation = (config['slit_separation'] as num?)?.toDouble() ?? 0.001;
    _screenDistance = (config['screen_distance'] as num?)?.toDouble() ?? 2;
  }

  @override
  void didUpdateWidget(WaveSimulatorWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
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

  double _calculateInterfringe() {
    return _wavelength * _screenDistance / _slitSeparation;
  }

  double _getIntensity(double y, double screenY) {
    final d = _slitSeparation;
    final lambda = _wavelength;
    final D = _screenDistance;
    
    final delta = math.pi * d * screenY / (lambda * D);
    if (delta.abs() < 0.001) return 1.0;
    
    final intensity = math.pow(math.cos(delta), 2).toDouble();
    return intensity;
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
          _buildSimulation(),
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
        child: CustomPaint(
          size: const Size(double.infinity, 280),
          painter: _WaveSimulatorPainter(
            wavelength: _wavelength,
            slitSeparation: _slitSeparation,
            screenDistance: _screenDistance,
            animationPhase: _animationPhase,
            showInterference: _showInterference,
            showSlits: _showSlits,
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
          _WaveSlider(
            label: 'λ (m)',
            value: _wavelength,
            min: 0.1e-6,
            max: 2e-6,
            onChanged: (v) => setState(() => _wavelength = v),
            displayValue: '${(_wavelength * 1e6).toStringAsFixed(1)} μm',
          ),
          const SizedBox(height: Spacing.sm),
          _WaveSlider(
            label: 'a (m)',
            value: _slitSeparation,
            min: 0.1e-3,
            max: 2e-3,
            onChanged: (v) => setState(() => _slitSeparation = v),
            displayValue: '${(_slitSeparation * 1e3).toStringAsFixed(1)} mm',
          ),
          const SizedBox(height: Spacing.sm),
          _WaveSlider(
            label: 'D (m)',
            value: _screenDistance,
            min: 0.5,
            max: 5,
            onChanged: (v) => setState(() => _screenDistance = v),
            displayValue: '${_screenDistance.toStringAsFixed(1)} m',
          ),
          const SizedBox(height: Spacing.md),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ChoiceChip(
                label: const Text('Fentes'),
                selected: _showSlits,
                onSelected: (_) => setState(() => _showSlits = !_showSlits),
              ),
              const SizedBox(width: Spacing.sm),
              ChoiceChip(
                label: const Text('Interférence'),
                selected: _showInterference,
                onSelected: (_) => setState(() => _showInterference = !_showInterference),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMeasurements() {
    final interfringe = _calculateInterfringe();

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
            'Franges d\'interférence',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.primary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: BacPrepColors.accent.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              'i = λD/a = ${(interfringe * 1000).toStringAsFixed(2)} mm',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: BacPrepColors.accent,
              ),
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _MeasurementChip(
                label: 'Maxima',
                value: '${(math.pi / (_wavelength * _slitSeparation / (_screenDistance))).floor()}',
                color: BacPrepColors.success,
              ),
              _MeasurementChip(
                label: 'Interfrange',
                value: '${(interfringe * 1000).toStringAsFixed(1)} mm',
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
              hintText: 'Interfrange i (mm)',
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

class _WaveSlider extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final ValueChanged<double> onChanged;
  final String displayValue;

  const _WaveSlider({
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
          width: 60,
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

class _MeasurementChip extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _MeasurementChip({
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
        Text(
          value,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: color,
          ),
        ),
      ],
    );
  }
}

class _WaveSimulatorPainter extends CustomPainter {
  final double wavelength;
  final double slitSeparation;
  final double screenDistance;
  final double animationPhase;
  final bool showInterference;
  final bool showSlits;

  _WaveSimulatorPainter({
    required this.wavelength,
    required this.slitSeparation,
    required this.screenDistance,
    required this.animationPhase,
    required this.showInterference,
    required this.showSlits,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final bgPaint = Paint()..color = BacPrepColors.surface;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final centerY = size.height * 0.4;
    final slitX = size.width * 0.15;
    final screenX = size.width * 0.85;

    if (showSlits) {
      _drawSlits(canvas, Offset(slitX, centerY), slitSeparation);
    }

    if (showInterference) {
      _drawWaveFronts(canvas, Offset(slitX, centerY), screenX, size.height);
    }

    _drawScreen(canvas, Offset(screenX, centerY), size.height);

    _drawWavePattern(canvas, Offset(screenX, centerY), size.height);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'Source',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(slitX - textPainter.width / 2, centerY + 60));

    textPainter.text = TextSpan(
      text: 'Écran',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(screenX - textPainter.width / 2, centerY + 60));
  }

  void _drawSlits(Canvas canvas, Offset center, double separation) {
    final slitPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final scale = 50000.0;
    final slitSize = 5.0;

    canvas.drawLine(
      Offset(center.dx, center.dy - separation * scale / 2 - slitSize),
      Offset(center.dx, center.dy - separation * scale / 2 + slitSize),
      slitPaint,
    );
    canvas.drawLine(
      Offset(center.dx, center.dy + separation * scale / 2 - slitSize),
      Offset(center.dx, center.dy + separation * scale / 2 + slitSize),
      slitPaint,
    );

    canvas.drawCircle(
      Offset(center.dx, center.dy - separation * scale / 2),
      3,
      Paint()..color = BacPrepColors.warning,
    );
    canvas.drawCircle(
      Offset(center.dx, center.dy + separation * scale / 2),
      3,
      Paint()..color = BacPrepColors.warning,
    );
  }

  void _drawWaveFronts(Canvas canvas, Offset source, double screenX, double height) {
    final wavePaint = Paint()
      ..color = BacPrepColors.primary.withValues(alpha: 0.3)
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;

    final source1Y = source.dy - slitSeparation * 50000 / 2;
    final source2Y = source.dy + slitSeparation * 50000 / 2;

    for (double r = 20; r < screenX - source.dx; r += 30) {
      canvas.drawCircle(Offset(source.dx, source1Y), r, wavePaint);
      canvas.drawCircle(Offset(source.dx, source2Y), r, wavePaint);
    }

    final rayPaint = Paint()
      ..color = BacPrepColors.warning.withValues(alpha: 0.5)
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;

    for (double angle = -0.4; angle <= 0.4; angle += 0.1) {
      final endX = screenX;
      final endY1 = source1Y + math.tan(angle) * (screenX - source.dx);
      final endY2 = source2Y + math.tan(angle) * (screenX - source.dx);
      
      if (endY1 > 10 && endY1 < height - 10) {
        canvas.drawLine(Offset(source.dx, source1Y), Offset(endX, endY1), rayPaint);
      }
      if (endY2 > 10 && endY2 < height - 10) {
        canvas.drawLine(Offset(source.dx, source2Y), Offset(endX, endY2), rayPaint);
      }
    }
  }

  void _drawScreen(Canvas canvas, Offset screen, double height) {
    final screenPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 3;
    
    canvas.drawLine(
      Offset(screen.dx, 20),
      Offset(screen.dx, height - 20),
      screenPaint,
    );
  }

  void _drawWavePattern(Canvas canvas, Offset screen, double height) {
    final patternPaint = Paint()
      ..style = PaintingStyle.fill;

    final D = screenDistance;
    final d = slitSeparation;
    final lambda = wavelength;
    final L = height - 40;
    final scale = L / (2 * lambda * D / d * 5);

    for (double y = 20; y < height - 20; y++) {
      final screenY = (y - height / 2) / scale;
      final delta = math.pi * d * screenY / (lambda * D);
      if (delta.abs() < 0.001) continue;
      
      final intensity = math.pow(math.cos(delta), 2);
      final brightness = (intensity * 255).clamp(0, 255).toInt();
      
      patternPaint.color = Color.fromARGB(brightness, 255, 200, 50);
      canvas.drawRect(
        Rect.fromLTWH(screen.dx - 8, y, 8, 1),
        patternPaint,
      );
    }

    final interfringe = lambda * D / d;
    final screenInterfringe = interfringe * scale;
    
    if (screenInterfringe > 5) {
      final centerY = height / 2;
      final maximaPaint = Paint()
        ..color = BacPrepColors.success.withValues(alpha: 0.5)
        ..strokeWidth = 1
        ..style = PaintingStyle.stroke;

      int n = 1;
      while (n * screenInterfringe / 2 < L / 2 - 10) {
        final y1 = centerY - n * screenInterfringe / 2;
        final y2 = centerY + n * screenInterfringe / 2;
        
        if (y1 > 20) {
          canvas.drawLine(
            Offset(screen.dx - 8, y1),
            Offset(screen.dx, y1),
            maximaPaint,
          );
        }
        if (y2 < height - 20) {
          canvas.drawLine(
            Offset(screen.dx - 8, y2),
            Offset(screen.dx, y2),
            maximaPaint,
          );
        }
        n++;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _WaveSimulatorPainter oldDelegate) {
    return wavelength != oldDelegate.wavelength ||
        slitSeparation != oldDelegate.slitSeparation ||
        animationPhase != oldDelegate.animationPhase ||
        showInterference != oldDelegate.showInterference ||
        showSlits != oldDelegate.showSlits;
  }
}
