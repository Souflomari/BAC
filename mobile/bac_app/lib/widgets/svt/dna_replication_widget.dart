import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class DNAReplicationWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const DNAReplicationWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<DNAReplicationWidget> createState() => _DNAReplicationWidgetState();
}

class _DNAReplicationWidgetState extends State<DNAReplicationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  int _currentStep = 0;
  bool _showHelicase = true;
  bool _showPrimase = true;
  bool _showDNAPolymerase = true;
  bool _showLabels = true;

  final List<_ReplicationStep> _steps = [
    _ReplicationStep(
      title: 'ADN double brin initial',
      description: 'Les deux brins complémentaires forment une double hélice.',
      label: 'Brin matrice',
    ),
    _ReplicationStep(
      title: 'Déroulement (Helicase)',
      description: "L'helicase déroule la double hélice en cassant les liaisons hydrogène.",
      label: 'Helicase',
    ),
    _ReplicationStep(
      title: 'Synthèse des primers (Primase)',
      description: "La primase synthétise de courts primers ARN sur chaque brin matrice.",
      label: 'Primer ARN',
    ),
    _ReplicationStep(
      title: 'Synthèse (ADN Polymérase III)',
      description: "L'ADN polymérase III synthétise le nouveau brin dans le sens 5'→3'.",
      label: 'ADN Polymérase III',
    ),
    _ReplicationStep(
      title: 'Brin leader et brin retardé',
      description: 'Le brin leader est synthétisé de façon continue, le brin retardé par fragments.',
      label: 'Okazaki',
    ),
    _ReplicationStep(
      title: 'Ligature',
      description: "L'ADN ligase relie les fragments d'Okazaki.",
      label: 'ADN Ligase',
    ),
    _ReplicationStep(
      title: 'Deux ADN identiques',
      description: 'Chaque molècule d\'ADN contient un brin parental et un brin néosynthétisé.',
      label: 'ADN fils',
    ),
  ];

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
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < _steps.length - 1) {
      setState(() => _currentStep++);
      _controller.forward(from: 0);
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
      _controller.forward(from: 0);
    }
  }

  void _reset() {
    setState(() => _currentStep = 0);
    _controller.reset();
  }

  void _submit() {
    widget.onAnswer(true);
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
          _buildReplicationVisual(),
          const SizedBox(height: Spacing.md),
          _buildCurrentStep(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildLegend(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildReplicationVisual() {
    return Container(
      height: 250,
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
              size: const Size(double.infinity, 250),
              painter: _DNAReplicationPainter(
                currentStep: _currentStep,
                animationValue: _animation.value,
                showLabels: _showLabels,
                showHelicase: _showHelicase,
                showPrimase: _showPrimase,
                showDNAPolymerase: _showDNAPolymerase,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildCurrentStep() {
    if (_currentStep >= _steps.length) return const SizedBox.shrink();

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Opacity(
          opacity: _animation.value,
          child: Container(
            padding: const EdgeInsets.all(Spacing.md),
            decoration: BoxDecoration(
              color: BacPrepColors.biology.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: BacPrepColors.biology.withValues(alpha: 0.3)),
            ),
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: BacPrepColors.biology,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    'Étape ${_currentStep + 1}/${_steps.length}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(height: Spacing.sm),
                Text(
                  _steps[_currentStep].title,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: BacPrepColors.biology,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: Spacing.xs),
                Text(
                  _steps[_currentStep].description,
                  style: TextStyle(
                    fontSize: 13,
                    color: BacPrepColors.textSecondary,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        );
      },
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
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_back),
          onPressed: _currentStep > 0 ? _prevStep : null,
        ),
        const SizedBox(width: Spacing.sm),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: BacPrepColors.accent.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            '${_currentStep + 1}/${_steps.length}',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.accent,
            ),
          ),
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_forward),
          onPressed: _currentStep < _steps.length - 1 ? _nextStep : null,
        ),
      ],
    );
  }

  Widget _buildLegend() {
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
            'Légende',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.md,
            runSpacing: Spacing.sm,
            children: [
              _LegendItem(color: BacPrepColors.primary, label: 'Brin matrice 3\'→5\''),
              _LegendItem(color: BacPrepColors.success, label: 'Brin néosynthétisé'),
              _LegendItem(color: BacPrepColors.warning, label: 'Helicase'),
              _LegendItem(color: BacPrepColors.error, label: 'ADN Polymérase'),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Enzymes'),
                selected: _showHelicase,
                onSelected: (v) => setState(() => _showHelicase = v),
              ),
              FilterChip(
                label: const Text('Labels'),
                selected: _showLabels,
                onSelected: (v) => setState(() => _showLabels = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAnswerInput() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.success.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.success.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            'Mécanisme de réplication',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: 'Semi-conservative',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.xs),
          Text(
            "Chaque ADN fille conserve un brin parental",
            style: TextStyle(
              fontSize: 12,
              color: BacPrepColors.textSecondary,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _ReplicationStep {
  final String title;
  final String description;
  final String label;

  _ReplicationStep({
    required this.title,
    required this.description,
    required this.label,
  });
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendItem({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 16,
          height: 16,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 11)),
      ],
    );
  }
}

class _DNAReplicationPainter extends CustomPainter {
  final int currentStep;
  final double animationValue;
  final bool showLabels;
  final bool showHelicase;
  final bool showPrimase;
  final bool showDNAPolymerase;

  _DNAReplicationPainter({
    required this.currentStep,
    required this.animationValue,
    required this.showLabels,
    required this.showHelicase,
    required this.showPrimase,
    required this.showDNAPolymerase,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerY = size.height / 2;
    final centerX = size.width / 2;

    if (currentStep == 0) {
      _drawDoubleHelix(canvas, size, centerX, centerY, false, 0);
    } else if (currentStep == 1) {
      _drawReplicationFork(canvas, size, centerX, centerY, 0.3 * animationValue, 0);
    } else if (currentStep == 2) {
      _drawReplicationFork(canvas, size, centerX, centerY, 0.4, 0.2 * animationValue);
    } else if (currentStep <= 4) {
      _drawReplicationFork(canvas, size, centerX, centerY, 0.5, 0.4);
    } else if (currentStep == 5) {
      _drawReplicationFork(canvas, size, centerX, centerY, 0.7, 0.7);
    } else {
      _drawDaughterDNA(canvas, size, centerX, centerY);
    }

    if (showLabels && currentStep > 0) {
      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: 'Fourche de réplication',
        style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(centerX - textPainter.width / 2, 10));
    }
  }

  void _drawDoubleHelix(Canvas canvas, Size size, double cx, double cy, bool separated, double sepAmount) {
    final strandPaint1 = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 4
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final strandPaint2 = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 4
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path1 = Path();
    final path2 = Path();

    for (double x = 30; x < size.width - 30; x += 2) {
      final normalizedX = (x - 30) / (size.width - 60);
      final y1 = cy + 30 * math.sin(normalizedX * 4 * math.pi);
      final y2 = cy - 30 * math.sin(normalizedX * 4 * math.pi);

      if (x == 30) {
        path1.moveTo(x, y1);
        path2.moveTo(x, y2);
      } else {
        path1.lineTo(x, y1);
        path2.lineTo(x, y2);
      }
    }

    canvas.drawPath(path1, strandPaint1);
    canvas.drawPath(path2, strandPaint2);

    final basePairPaint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 1;

    for (double x = 50; x < size.width - 50; x += 20) {
      final normalizedX = (x - 30) / (size.width - 60);
      final y = cy + 30 * math.sin(normalizedX * 4 * math.pi);
      canvas.drawLine(Offset(x, y - 4), Offset(x, y + 4), basePairPaint);
    }
  }

  void _drawReplicationFork(Canvas canvas, Size size, double cx, double cy, double forkOpen, double synthesisProgress) {
    final templatePaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 4
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final newStrandPaint = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 4
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final openAmount = forkOpen * 80;

    canvas.drawLine(
      Offset(30, cy - 30),
      Offset(cx - openAmount, cy - 30 - openAmount * 0.5),
      templatePaint,
    );
    canvas.drawLine(
      Offset(30, cy + 30),
      Offset(cx - openAmount, cy + 30 + openAmount * 0.5),
      templatePaint,
    );

    if (synthesisProgress > 0) {
      final synthesisLength = synthesisProgress * openAmount * 1.5;
      canvas.drawLine(
        Offset(cx - openAmount, cy - 30 - openAmount * 0.5),
        Offset(cx - openAmount + synthesisLength, cy - 30 - openAmount * 0.5),
        newStrandPaint,
      );
    }

    canvas.drawLine(
      Offset(cx + openAmount, cy - 30 - openAmount * 0.3),
      Offset(size.width - 30, cy - 20),
      templatePaint,
    );
    canvas.drawLine(
      Offset(cx + openAmount, cy + 30 + openAmount * 0.3),
      Offset(size.width - 30, cy + 20),
      templatePaint,
    );

    if (synthesisProgress > 0) {
      final synthesisLength = synthesisProgress * openAmount;
      for (double i = 0; i < synthesisLength; i += 15) {
        final x = cx + openAmount * 0.3 + i;
        canvas.drawLine(
          Offset(x, cy - 20 - i * 0.2),
          Offset(x + 8, cy - 20 - i * 0.2 + 6),
          newStrandPaint,
        );
      }
    }

    if (showHelicase && forkOpen > 0.2) {
      final helicasePaint = Paint()
        ..color = BacPrepColors.warning
        ..style = PaintingStyle.fill;
      canvas.drawCircle(Offset(cx - openAmount * 0.5, cy), 12 * animationValue, helicasePaint);
    }
  }

  void _drawDaughterDNA(Canvas canvas, Size size, double cx, double cy) {
    final parentPaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final newPaint = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawLine(Offset(30, cy - 40), Offset(size.width - 30, cy - 40), parentPaint);
    canvas.drawLine(Offset(30, cy - 20), Offset(size.width - 30, cy - 20), newPaint);

    canvas.drawLine(Offset(30, cy + 20), Offset(size.width - 30, cy + 20), parentPaint);
    canvas.drawLine(Offset(30, cy + 40), Offset(size.width - 30, cy + 40), newPaint);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'ADN fille 1',
      style: TextStyle(color: BacPrepColors.primary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(cx - textPainter.width / 2, cy - 60));

    textPainter.text = TextSpan(
      text: 'ADN fille 2',
      style: TextStyle(color: BacPrepColors.primary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(cx - textPainter.width / 2, cy + 50));

    textPainter.text = TextSpan(
      text: '(1 parental + 1 néosynthétisé)',
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 8, fontStyle: FontStyle.italic),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(cx - textPainter.width / 2, cy - 70));
  }

  @override
  bool shouldRepaint(covariant _DNAReplicationPainter oldDelegate) {
    return currentStep != oldDelegate.currentStep ||
        animationValue != oldDelegate.animationValue;
  }
}
