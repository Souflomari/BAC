import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class MotionSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const MotionSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<MotionSimulatorWidget> createState() => _MotionSimulatorWidgetState();
}

class _MotionSimulatorWidgetState extends State<MotionSimulatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  double _initialPosition = 0;
  double _initialVelocity = 5;
  double _acceleration = 0;
  double _currentTime = 0;
  double _animationTime = 0;
  bool _isPlaying = false;
  String _scenario = 'constantVelocity';
  
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 5),
      vsync: this,
    );
    _controller.addListener(() {
      if (_isPlaying) {
        setState(() {
          _animationTime = _controller.value * 5;
        });
      }
    });
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() => _isPlaying = false);
      }
    });
    _initializeFromConfig();
  }

  void _initializeFromConfig() {
    final config = widget.item.simConfig;
    _scenario = config['type'] as String? ?? 'kinematics';
    
    _initialPosition = (config['initial_position'] as num?)?.toDouble() ?? 0;
    _initialVelocity = (config['initial_velocity'] as num?)?.toDouble() ?? 5;
    _acceleration = (config['acceleration'] as num?)?.toDouble() ?? 0;
  }

  @override
  void didUpdateWidget(MotionSimulatorWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _controller.reset();
      _animationTime = 0;
      _isPlaying = false;
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

  double _calculatePosition(double t) {
    switch (_scenario) {
      case 'constantVelocity':
        return _initialPosition + _initialVelocity * t;
      case 'constantAcceleration':
        return _initialPosition + _initialVelocity * t + 0.5 * _acceleration * t * t;
      case 'freeFall':
        return _initialPosition - 4.9 * t * t;
      case 'projectile':
        return _initialPosition + _initialVelocity * t - 4.9 * t * t;
      default:
        return _initialPosition + _initialVelocity * t;
    }
  }

  double _calculateVelocity(double t) {
    switch (_scenario) {
      case 'constantVelocity':
        return _initialVelocity;
      case 'constantAcceleration':
        return _initialVelocity + _acceleration * t;
      case 'freeFall':
        return -9.8 * t;
      case 'projectile':
        return _initialVelocity - 9.8 * t;
      default:
        return _initialVelocity;
    }
  }

  void _togglePlay() {
    setState(() {
      if (_isPlaying) {
        _controller.stop();
        _isPlaying = false;
      } else {
        if (_controller.value >= 1.0) {
          _controller.reset();
          _animationTime = 0;
        }
        _controller.forward();
        _isPlaying = true;
      }
    });
  }

  void _reset() {
    _controller.reset();
    setState(() {
      _animationTime = 0;
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
          _buildSimulation(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameterSliders(),
          const SizedBox(height: Spacing.md),
          _buildDataDisplay(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildSimulation() {
    final position = _calculatePosition(_animationTime);
    final velocity = _calculateVelocity(_animationTime);

    return Container(
      height: 220,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 220),
          painter: _MotionSimulatorPainter(
            position: position,
            velocity: velocity,
            time: _animationTime,
            scenario: _scenario,
            isPlaying: _isPlaying,
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
          tooltip: 'Recommencer',
        ),
        const SizedBox(width: Spacing.md),
        IconButton.filled(
          icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow),
          iconSize: 32,
          onPressed: _togglePlay,
          style: IconButton.styleFrom(
            backgroundColor: BacPrepColors.primary,
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
            't = ${_animationTime.toStringAsFixed(1)}s',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.accent,
              fontSize: 16,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildParameterSliders() {
    if (_scenario == 'freeFall') {
      return const SizedBox.shrink();
    }

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
          if (_scenario != 'freeFall') ...[
            _ParameterSlider(
              label: 'v₀ (m/s)',
              value: _initialVelocity,
              min: -20,
              max: 20,
              onChanged: (v) => setState(() => _initialVelocity = v),
            ),
            const SizedBox(height: Spacing.sm),
          ],
          if (_scenario == 'constantAcceleration' || _scenario == 'projectile')
            _ParameterSlider(
              label: 'a (m/s²)',
              value: _acceleration,
              min: -20,
              max: 20,
              onChanged: (v) => setState(() => _acceleration = v),
            ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay() {
    final position = _calculatePosition(_animationTime);
    final velocity = _calculateVelocity(_animationTime);

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
          _DataColumn(
            icon: Icons.location_on,
            label: 'Position',
            value: '${position.toStringAsFixed(1)} m',
            color: BacPrepColors.primary,
          ),
          Container(
            width: 1,
            height: 40,
            color: BacPrepColors.border,
          ),
          _DataColumn(
            icon: Icons.speed,
            label: 'Vitesse',
            value: '${velocity.toStringAsFixed(1)} m/s',
            color: BacPrepColors.warning,
          ),
          Container(
            width: 1,
            height: 40,
            color: BacPrepColors.border,
          ),
          _DataColumn(
            icon: Icons.timer,
            label: 'Temps',
            value: '${_animationTime.toStringAsFixed(1)} s',
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
            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
            decoration: InputDecoration(
              hintText: 'Votre réponse',
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
          width: 70,
          child: Text(
            label,
            style: TextStyle(color: BacPrepColors.textSecondary),
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
          width: 60,
          child: Text(
            value.toStringAsFixed(1),
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

class _DataColumn extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const _DataColumn({
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
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(fontSize: 10, color: BacPrepColors.textSecondary),
        ),
        Text(
          value,
          style: TextStyle(
            fontWeight: FontWeight.w600,
            color: color,
            fontSize: 14,
          ),
        ),
      ],
    );
  }
}

class _MotionSimulatorPainter extends CustomPainter {
  final double position;
  final double velocity;
  final double time;
  final String scenario;
  final bool isPlaying;

  _MotionSimulatorPainter({
    required this.position,
    required this.velocity,
    required this.time,
    required this.scenario,
    required this.isPlaying,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final bgPaint = Paint()..color = BacPrepColors.surface;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final groundPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 2;
    final groundY = size.height - 40;
    canvas.drawLine(Offset(0, groundY), Offset(size.width, groundY), groundPaint);

    final gridPaint = Paint()
      ..color = BacPrepColors.border.withValues(alpha: 0.3)
      ..strokeWidth = 0.5;
    for (int i = 1; i < 5; i++) {
      final y = groundY - i * (size.height - 60) / 5;
      canvas.drawLine(Offset(0, y), Offset(size.width, y), gridPaint);
    }

    double displayPosition = position;
    if (displayPosition > size.width - 80) displayPosition = size.width - 80;
    if (displayPosition < 40) displayPosition = 40;

    final objectPaint = Paint()..color = BacPrepColors.physics;
    double objectY;
    double objectSize = 24;

    switch (scenario) {
      case 'freeFall':
      case 'projectile':
        objectY = groundY - (displayPosition.clamp(0, 200) / 200) * (size.height - 80);
        if (scenario == 'freeFall' && position > 100) {
          objectY = groundY;
        }
        break;
      default:
        objectY = groundY - 20;
        displayPosition = 60 + (displayPosition.clamp(-50, 300) / 350) * (size.width - 120);
    }

    if (scenario == 'freeFall' || scenario == 'projectile') {
      canvas.drawCircle(Offset(displayPosition, objectY), objectSize / 2, objectPaint);
      
      final shadowPaint = Paint()
        ..color = Colors.black.withValues(alpha: 0.2)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4);
      canvas.drawOval(
        Rect.fromLTRB(displayPosition - 12, groundY - 2, displayPosition + 12, groundY + 2),
        shadowPaint,
      );
    } else {
      canvas.drawCircle(Offset(displayPosition, objectY), objectSize / 2, objectPaint);
    }

    final velocityArrowPaint = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    
    final arrowTip = Offset(displayPosition + velocity * 2, objectY);
    canvas.drawLine(Offset(displayPosition, objectY), arrowTip, velocityArrowPaint);
    
    final arrowPath = Path();
    arrowPath.moveTo(arrowTip.dx, arrowTip.dy);
    arrowPath.lineTo(arrowTip.dx - 8, arrowTip.dy + 5);
    arrowPath.moveTo(arrowTip.dx, arrowTip.dy);
    arrowPath.lineTo(arrowTip.dx - 8, arrowTip.dy - 5);
    canvas.drawPath(arrowPath, velocityArrowPaint);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'v = ${velocity.toStringAsFixed(1)} m/s',
      style: TextStyle(
        color: BacPrepColors.success,
        fontSize: 11,
        fontWeight: FontWeight.w600,
      ),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(displayPosition + 5, objectY - 35));
  }

  @override
  bool shouldRepaint(covariant _MotionSimulatorPainter oldDelegate) {
    return position != oldDelegate.position ||
        velocity != oldDelegate.velocity ||
        time != oldDelegate.time ||
        isPlaying != oldDelegate.isPlaying;
  }
}
