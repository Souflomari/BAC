import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class ProjectileSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const ProjectileSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<ProjectileSimulatorWidget> createState() => _ProjectileSimulatorWidgetState();
}

class _ProjectileSimulatorWidgetState extends State<ProjectileSimulatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _initialVelocity = 20;
  double _launchAngle = 45;
  double _initialHeight = 0;
  double _currentTime = 0;
  bool _isPlaying = false;
  bool _showTrajectory = true;
  bool _showVectors = true;
  bool _showRange = true;

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
          _currentTime = _controller.value * _totalFlightTime;
        });
      }
    });
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() => _isPlaying = false);
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _angleRad => _launchAngle * math.pi / 180;
  double get _vx0 => _initialVelocity * math.cos(_angleRad);
  double get _vy0 => _initialVelocity * math.sin(_angleRad);
  double get _g => 9.81;

  double _positionX(double t) => _vx0 * t;
  double _positionY(double t) => _initialHeight + _vy0 * t - 0.5 * _g * t * t;
  double _velocityX(double t) => _vx0;
  double _velocityY(double t) => _vy0 - _g * t;
  double _speed(double t) => math.sqrt(_velocityX(t) * _velocityX(t) + _velocityY(t) * _velocityY(t));

  double get _totalFlightTime {
    final a = -0.5 * _g;
    final b = _vy0;
    final c = _initialHeight;
    final disc = b * b - 4 * a * c;
    if (disc <= 0) return 2 * _vy0 / _g;
    return (-b + math.sqrt(disc)) / (2 * a);
  }

  double get _maxHeight {
    final tMax = _vy0 / _g;
    return _initialHeight + _vy0 * tMax - 0.5 * _g * tMax * tMax;
  }

  double get _range => _positionX(_totalFlightTime);

  void _togglePlay() {
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
          _buildSimulation(),
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

  Widget _buildSimulation() {
    return Container(
      height: 250,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 250),
          painter: _ProjectilePainter(
            initialVelocity: _initialVelocity,
            launchAngle: _launchAngle,
            initialHeight: _initialHeight,
            currentTime: _currentTime,
            totalFlightTime: _totalFlightTime,
            showTrajectory: _showTrajectory,
            showVectors: _showVectors,
            showRange: _showRange,
            positionX: _positionX,
            positionY: _positionY,
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
          onPressed: _togglePlay,
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
            't = ${_currentTime.toStringAsFixed(2)}s',
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
            'Paramètres de lancement',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          _ParameterSlider(
            label: 'Vitesse initiale (m/s)',
            value: _initialVelocity,
            min: 5,
            max: 50,
            onChanged: (v) => setState(() => _initialVelocity = v),
          ),
          const SizedBox(height: Spacing.sm),
          _ParameterSlider(
            label: 'Angle de tir (°)',
            value: _launchAngle,
            min: 0,
            max: 90,
            onChanged: (v) => setState(() => _launchAngle = v),
          ),
          const SizedBox(height: Spacing.sm),
          _ParameterSlider(
            label: 'Hauteur initiale (m)',
            value: _initialHeight,
            min: 0,
            max: 50,
            onChanged: (v) => setState(() => _initialHeight = v),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Trajectoire'),
                selected: _showTrajectory,
                onSelected: (v) => setState(() => _showTrajectory = v),
              ),
              FilterChip(
                label: const Text('Vecteurs'),
                selected: _showVectors,
                onSelected: (v) => setState(() => _showVectors = v),
              ),
              FilterChip(
                label: const Text('Portée'),
                selected: _showRange,
                onSelected: (v) => setState(() => _showRange = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay() {
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
            'Données cinématiques',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.physics,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _DataItem(
                icon: Icons.height,
                label: 'H_max',
                value: '${_maxHeight.toStringAsFixed(1)} m',
                color: BacPrepColors.warning,
              ),
              _DataItem(
                icon: Icons.straighten,
                label: 'Portée',
                value: '${_range.toStringAsFixed(1)} m',
                color: BacPrepColors.success,
              ),
              _DataItem(
                icon: Icons.timer,
                label: 'Durée',
                value: '${_totalFlightTime.toStringAsFixed(1)} s',
                color: BacPrepColors.primary,
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _DataItem(
                icon: Icons.speed,
                label: 'vₓ',
                value: '${_vx0.toStringAsFixed(1)} m/s',
                color: BacPrepColors.physics,
              ),
              _DataItem(
                icon: Icons.arrow_upward,
                label: 'vᵧ',
                value: '${_velocityY(_currentTime).toStringAsFixed(1)} m/s',
                color: BacPrepColors.warning,
              ),
              _DataItem(
                icon: Icons.all_inclusive,
                label: '|v|',
                value: '${_speed(_currentTime).toStringAsFixed(1)} m/s',
                color: BacPrepColors.success,
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
              'Portée : ${widget.item.correctValue} m',
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
              hintText: 'Calculer la portée (m)',
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
          width: 180,
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
        const SizedBox(height: 2),
        Text(label, style: TextStyle(fontSize: 10, color: BacPrepColors.textSecondary)),
        Text(
          value,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color),
        ),
      ],
    );
  }
}

class _ProjectilePainter extends CustomPainter {
  final double initialVelocity;
  final double launchAngle;
  final double initialHeight;
  final double currentTime;
  final double totalFlightTime;
  final bool showTrajectory;
  final bool showVectors;
  final bool showRange;
  final double Function(double) positionX;
  final double Function(double) positionY;

  _ProjectilePainter({
    required this.initialVelocity,
    required this.launchAngle,
    required this.initialHeight,
    required this.currentTime,
    required this.totalFlightTime,
    required this.showTrajectory,
    required this.showVectors,
    required this.showRange,
    required this.positionX,
    required this.positionY,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final groundY = size.height - 30;
    final g = 9.81;
    final angleRad = launchAngle * math.pi / 180;
    final vx0 = initialVelocity * math.cos(angleRad);
    final vy0 = initialVelocity * math.sin(angleRad);
    final range = positionX(totalFlightTime);

    final scaleX = (size.width - 60) / (range * 1.2).clamp(1, double.infinity);
    final scaleY = (groundY - 20) / 150;

    double toScreenX(double x) => 30 + x * scaleX;
    double toScreenY(double y) => groundY - y * scaleY;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;
    canvas.drawLine(Offset(30, groundY), Offset(size.width - 10, groundY), axisPaint);
    canvas.drawLine(Offset(30, groundY), Offset(30, 10), axisPaint);

    final gridPaint = Paint()
      ..color = BacPrepColors.border.withValues(alpha: 0.3)
      ..strokeWidth = 0.5;
    for (int i = 1; i <= 5; i++) {
      canvas.drawLine(Offset(30, groundY - i * 30), Offset(size.width - 10, groundY - i * 30), gridPaint);
    }

    if (showTrajectory) {
      final trajectoryPaint = Paint()
        ..color = BacPrepColors.primary.withValues(alpha: 0.4)
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;

      final path = Path();
      for (double t = 0; t <= currentTime; t += 0.02) {
        final x = positionX(t);
        final y = positionY(t);
        final px = toScreenX(x);
        final py = toScreenY(y);
        if (t == 0) {
          path.moveTo(px, py);
        } else {
          path.lineTo(px, py);
        }
      }
      canvas.drawPath(path, trajectoryPaint);
    }

    if (showRange && currentTime >= totalFlightTime * 0.95) {
      final rangePaint = Paint()
        ..color = BacPrepColors.success
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke;
      canvas.drawLine(
        Offset(30, groundY),
        Offset(toScreenX(range), groundY),
        rangePaint,
      );

      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: 'R = ${range.toStringAsFixed(1)}m',
        style: TextStyle(color: BacPrepColors.success, fontSize: 11, fontWeight: FontWeight.bold),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(30 + (toScreenX(range) - 30) / 2 - textPainter.width / 2, groundY + 5));
    }

    final ballX = positionX(currentTime);
    final ballY = positionY(currentTime);
    final px = toScreenX(ballX);
    final py = toScreenY(ballY);

    final ballPaint = Paint()..color = BacPrepColors.physics;
    canvas.drawCircle(Offset(px, py), 12, ballPaint);

    if (showVectors) {
      final vx = vx0;
      final vy = vy0 - g * currentTime;
      final speed = math.sqrt(vx * vx + vy * vy);

      if (speed > 0.1) {
        final arrowPaint = Paint()
          ..color = BacPrepColors.success
          ..strokeWidth = 3
          ..style = PaintingStyle.stroke
          ..strokeCap = StrokeCap.round;

        final vxScale = 3;
        final vyScale = 3;
        canvas.drawLine(Offset(px, py), Offset(px + vx * vxScale, py), arrowPaint);
        canvas.drawLine(Offset(px, py), Offset(px, py - vy * vyScale), arrowPaint);

        final textPainter = TextPainter(textDirection: TextDirection.ltr);
        textPainter.text = TextSpan(
          text: 'vₓ',
          style: TextStyle(color: BacPrepColors.success, fontSize: 10),
        );
        textPainter.layout();
        textPainter.paint(canvas, Offset(px + vx * vxScale / 2, py + 5));

        textPainter.text = TextSpan(
          text: 'vᵧ',
          style: TextStyle(color: BacPrepColors.warning, fontSize: 10),
        );
        textPainter.layout();
        textPainter.paint(canvas, Offset(px + 5, py - vy * vyScale / 2 - 10));
      }
    }

    final shadowPaint = Paint()
      ..color = Colors.black.withValues(alpha: 0.2)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4);
    canvas.drawOval(Rect.fromLTRB(px - 10, groundY - 2, px + 10, groundY + 2), shadowPaint);
  }

  @override
  bool shouldRepaint(covariant _ProjectilePainter oldDelegate) {
    return currentTime != oldDelegate.currentTime ||
        initialVelocity != oldDelegate.initialVelocity ||
        launchAngle != oldDelegate.launchAngle ||
        initialHeight != oldDelegate.initialHeight;
  }
}
