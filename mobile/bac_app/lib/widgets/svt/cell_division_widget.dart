import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class CellDivisionWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const CellDivisionWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<CellDivisionWidget> createState() => _CellDivisionWidgetState();
}

class _CellDivisionWidgetState extends State<CellDivisionWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  String _divisionType = 'mitosis';
  int _currentPhase = 0;

  final List<_CellPhase> _mitosisPhases = [
    _CellPhase(
      name: 'Interphase',
      description: "L'ADN se réplique. La cellule prépare sa division.",
      icon: Icons.circle_outlined,
    ),
    _CellPhase(
      name: 'Prophase',
      description: 'Les chromosomes se condensent. L\'enveloppe nucléaire se désintègre.',
      icon: Icons.looks_one,
    ),
    _CellPhase(
      name: 'Métaphase',
      description: 'Les chromosomes s\'alignent au centre de la cellule.',
      icon: Icons.horizontal_rule,
    ),
    _CellPhase(
      name: 'Anaphase',
      description: 'Les chromatides sœurs se séparent et migrent aux pôles.',
      icon: Icons.arrow_upward,
    ),
    _CellPhase(
      name: 'Télophase',
      description: 'Les chromosomes arrivent aux pôles. L\'enveloppe se reforme.',
      icon: Icons.looks_6,
    ),
    _CellPhase(
      name: 'Cytodiérèse',
      description: 'Le cytoplasme se divise. Deux cellules filles identiques sont formées.',
      icon: Icons.call_split,
    ),
  ];

  final List<_CellPhase> _meiosisPhases = [
    _CellPhase(
      name: 'Prophase I',
      description: 'Synapsis et crossing-over entre chromosomes homologues.',
      icon: Icons.looks_one,
    ),
    _CellPhase(
      name: 'Métaphase I',
      description: 'Les paires de chromosomes homologues s\'alignent.',
      icon: Icons.horizontal_rule,
    ),
    _CellPhase(
      name: 'Anaphase I',
      description: 'Les chromosomes homologues se séparent.',
      icon: Icons.arrow_upward,
    ),
    _CellPhase(
      name: 'Prophase II',
      description: 'Condensation des chromosomes dans chaque cellule.',
      icon: Icons.looks_two,
    ),
    _CellPhase(
      name: 'Métaphase II',
      description: 'Les chromosomes s\'alignent au centre.',
      icon: Icons.horizontal_rule,
    ),
    _CellPhase(
      name: 'Anaphase II',
      description: 'Les chromatides se séparent.',
      icon: Icons.arrow_upward,
    ),
    _CellPhase(
      name: 'Télophase II',
      description: '4 cellules haploïdes génétiquement différentes.',
      icon: Icons.looks_6,
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
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _nextPhase() {
    final phases = _divisionType == 'mitosis' ? _mitosisPhases.length : _meiosisPhases.length;
    if (_currentPhase < phases - 1) {
      setState(() => _currentPhase++);
      _controller.forward(from: 0);
    }
  }

  void _prevPhase() {
    if (_currentPhase > 0) {
      setState(() => _currentPhase--);
      _controller.forward(from: 0);
    }
  }

  void _reset() {
    setState(() => _currentPhase = 0);
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
          _buildTypeSelector(),
          const SizedBox(height: Spacing.md),
          _buildDivisionVisual(),
          const SizedBox(height: Spacing.md),
          _buildPhaseInfo(),
          const SizedBox(height: Spacing.md),
          _buildPhaseSelector(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildTypeSelector() {
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
            'Type de division',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              ChoiceChip(
                label: const Text('Mïtoze'),
                selected: _divisionType == 'mitosis',
                onSelected: (v) {
                  if (v) setState(() {
                    _divisionType = 'mitosis';
                    _currentPhase = 0;
                    _controller.forward(from: 0);
                  });
                },
              ),
              ChoiceChip(
                label: const Text('Méiose'),
                selected: _divisionType == 'meiosis',
                onSelected: (v) {
                  if (v) setState(() {
                    _divisionType = 'meiosis';
                    _currentPhase = 0;
                    _controller.forward(from: 0);
                  });
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDivisionVisual() {
    return Container(
      height: 200,
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
              size: const Size(double.infinity, 200),
              painter: _CellDivisionPainter(
                divisionType: _divisionType,
                currentPhase: _currentPhase,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildPhaseInfo() {
    final phases = _divisionType == 'mitosis' ? _mitosisPhases : _meiosisPhases;
    if (_currentPhase >= phases.length) return const SizedBox.shrink();

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
                    phases[_currentPhase].name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                    ),
                  ),
                ),
                const SizedBox(height: Spacing.sm),
                Text(
                  phases[_currentPhase].description,
                  style: TextStyle(
                    fontSize: 14,
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

  Widget _buildPhaseSelector() {
    final phases = _divisionType == 'mitosis' ? _mitosisPhases : _meiosisPhases;

    return Container(
      padding: const EdgeInsets.all(Spacing.sm),
      decoration: BoxDecoration(
        color: BacPrepColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: List.generate(phases.length, (i) {
            final isActive = i == _currentPhase;
            final isCompleted = i < _currentPhase;
            return GestureDetector(
              onTap: () => setState(() {
                _currentPhase = i;
                _controller.forward(from: 0);
              }),
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 4),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: isActive
                      ? BacPrepColors.biology
                      : isCompleted
                          ? BacPrepColors.success.withValues(alpha: 0.2)
                          : BacPrepColors.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isActive
                        ? BacPrepColors.biology
                        : isCompleted
                            ? BacPrepColors.success
                            : BacPrepColors.border,
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (isCompleted)
                      Icon(Icons.check, size: 14, color: BacPrepColors.success)
                    else
                      Icon(
                        phases[i].icon,
                        size: 14,
                        color: isActive ? Colors.white : BacPrepColors.textSecondary,
                      ),
                    const SizedBox(width: 4),
                    Text(
                      '${i + 1}',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                        color: isActive ? Colors.white : BacPrepColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
      ),
    );
  }

  Widget _buildControls() {
    final phases = _divisionType == 'mitosis' ? _mitosisPhases : _meiosisPhases;

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
          onPressed: _currentPhase > 0 ? _prevPhase : null,
        ),
        const SizedBox(width: Spacing.sm),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: BacPrepColors.accent.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            '${_currentPhase + 1}/${phases.length}',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.accent,
            ),
          ),
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.arrow_forward),
          onPressed: _currentPhase < phases.length - 1 ? _nextPhase : null,
        ),
      ],
    );
  }

  Widget _buildAnswerInput() {
    final phases = _divisionType == 'mitosis' ? _mitosisPhases : _meiosisPhases;
    final outcome = _divisionType == 'mitosis'
        ? '2 cellules filles identiques (2n)'
        : '4 cellules filles haploïdes (n)';

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
            'Résultat: ${phases.last.name}',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.xs),
          Text(
            outcome,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.success,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: Spacing.sm),
          Text(
            _divisionType == 'mitosis'
                ? 'Conserve le nombre de chromosomes - Croissance et réparation'
                : 'Réduit le nombre de chromosomes - Production de gamètes',
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

class _CellPhase {
  final String name;
  final String description;
  final IconData icon;

  _CellPhase({
    required this.name,
    required this.description,
    required this.icon,
  });
}

class _CellDivisionPainter extends CustomPainter {
  final String divisionType;
  final int currentPhase;
  final double animationValue;

  _CellDivisionPainter({
    required this.divisionType,
    required this.currentPhase,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height / 2;

    if (divisionType == 'mitosis') {
      _drawMitosis(canvas, size, centerX, centerY);
    } else {
      _drawMeiosis(canvas, size, centerX, centerY);
    }
  }

  void _drawMitosis(Canvas canvas, Size size, double cx, double cy) {
    final membranePaint = Paint()
      ..color = BacPrepColors.biology
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final chromosomePaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 4
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final chromatidPaint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    double cellWidth, cellHeight;
    double chromOffsetY = 0;
    double separation = 0;

    switch (currentPhase) {
      case 0:
        cellWidth = 100;
        cellHeight = 60;
        break;
      case 1:
        cellWidth = 100;
        cellHeight = 70;
        chromOffsetY = -10;
        break;
      case 2:
        cellWidth = 120;
        cellHeight = 80;
        chromOffsetY = 0;
        break;
      case 3:
        cellWidth = 100;
        cellHeight = 80;
        separation = animationValue * 60;
        break;
      case 4:
        cellWidth = 80;
        cellHeight = 80;
        separation = 80;
        break;
      case 5:
        cellWidth = 50;
        cellHeight = 60;
        separation = 160;
        break;
      default:
        cellWidth = 100;
        cellHeight = 60;
    }

    if (currentPhase < 3) {
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx, cy), width: cellWidth, height: cellHeight),
        membranePaint,
      );

      if (currentPhase >= 1) {
        for (int i = -1; i <= 1; i += 2) {
          canvas.drawLine(
            Offset(cx + i * 15, cy + chromOffsetY - 15),
            Offset(cx + i * 15, cy + chromOffsetY + 15),
            chromatidPaint,
          );
        }
      }

      if (currentPhase == 2) {
        canvas.drawLine(
          Offset(cx - 30, cy - 20),
          Offset(cx + 30, cy - 20),
          chromosomePaint,
        );
        canvas.drawLine(
          Offset(cx - 30, cy + 20),
          Offset(cx + 30, cy + 20),
          chromosomePaint,
        );
      }
    } else {
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx - separation / 2, cy), width: cellWidth, height: cellHeight),
        membranePaint,
      );
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx + separation / 2, cy), width: cellWidth, height: cellHeight),
        membranePaint,
      );
    }
  }

  void _drawMeiosis(Canvas canvas, Size size, double cx, double cy) {
    final membranePaint = Paint()
      ..color = BacPrepColors.biology
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final chromPaint1 = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final chromPaint2 = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    if (currentPhase < 3) {
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx, cy), width: 120, height: 80),
        membranePaint,
      );

      for (int i = -1; i <= 1; i += 2) {
        final yOffset = i * 20 * animationValue;
        canvas.drawLine(
          Offset(cx - 25, cy + yOffset - 10),
          Offset(cx - 25, cy + yOffset + 10),
          chromPaint1,
        );
        canvas.drawLine(
          Offset(cx - 15, cy + yOffset - 10),
          Offset(cx - 15, cy + yOffset + 10),
          chromPaint2,
        );
        canvas.drawLine(
          Offset(cx + 15, cy + yOffset - 10),
          Offset(cx + 15, cy + yOffset + 10),
          chromPaint1,
        );
        canvas.drawLine(
          Offset(cx + 25, cy + yOffset - 10),
          Offset(cx + 25, cy + yOffset + 10),
          chromPaint2,
        );
      }
    } else {
      final sep1 = currentPhase < 5 ? 60.0 : 80.0;
      final sep2 = currentPhase >= 5 ? 40.0 * animationValue : 40.0;

      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx - sep1 / 2, cy - sep2 / 2), width: 50, height: 40),
        membranePaint,
      );
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx - sep1 / 2, cy + sep2 / 2), width: 50, height: 40),
        membranePaint,
      );
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx + sep1 / 2, cy - sep2 / 2), width: 50, height: 40),
        membranePaint,
      );
      canvas.drawOval(
        Rect.fromCenter(center: Offset(cx + sep1 / 2, cy + sep2 / 2), width: 50, height: 40),
        membranePaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _CellDivisionPainter oldDelegate) {
    return currentPhase != oldDelegate.currentPhase ||
        animationValue != oldDelegate.animationValue;
  }
}
