import 'dart:math';
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class ProbabilityTreeWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const ProbabilityTreeWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<ProbabilityTreeWidget> createState() => _ProbabilityTreeWidgetState();
}

class _ProbabilityTreeWidgetState extends State<ProbabilityTreeWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _pA = 0.3;
  double _pBgivenA = 0.7;
  double _pBgivenNotA = 0.4;

  bool _highlightPath = false;
  int _highlightedNode = -1;
  bool _showCalculations = true;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
    _controller.forward();
  }

  double get pNotA => 1 - _pA;
  double get pNotBgivenA => 1 - _pBgivenA;
  double get pNotBgivenNotA => 1 - _pBgivenNotA;
  double get pAandB => _pA * _pBgivenA;
  double get pAandNotB => _pA * pNotBgivenA;
  double get pNotAandB => pNotA * _pBgivenNotA;
  double get pNotAandNotB => pNotA * pNotBgivenNotA;
  double get pB => pAandB + pNotAandB;
  double get pNotB => pAandNotB + pNotAandNotB;
  double get pAgivenB => pB > 0 ? pAandB / pB : 0;

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
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
          _buildProbabilities(),
          const SizedBox(height: Spacing.md),
          _buildTree(),
          const SizedBox(height: Spacing.md),
          _buildCalculations(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildProbabilities() {
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
            'Probabilités',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          _ProbabilitySlider(
            label: 'P(A)',
            value: _pA,
            onChanged: (v) => setState(() {
              _pA = v;
              _controller.forward(from: 0);
            }),
          ),
          _ProbabilitySlider(
            label: 'P(B|A)',
            value: _pBgivenA,
            onChanged: (v) => setState(() {
              _pBgivenA = v;
              _controller.forward(from: 0);
            }),
          ),
          _ProbabilitySlider(
            label: 'P(B|¬A)',
            value: _pBgivenNotA,
            onChanged: (v) => setState(() {
              _pBgivenNotA = v;
              _controller.forward(from: 0);
            }),
          ),
        ],
      ),
    );
  }

  Widget _buildTree() {
    return Container(
      height: 320,
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
              size: const Size(double.infinity, 320),
              painter: _ProbabilityTreePainter(
                pA: _pA,
                pBgivenA: _pBgivenA,
                pBgivenNotA: _pBgivenNotA,
                highlightedNode: _highlightedNode,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildCalculations() {
    if (!_showCalculations) return const SizedBox.shrink();

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.biology.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.biology.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Calculs',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.biology,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          _CalcRow(label: 'P(A ∩ B)', value: pAandB, formula: '${_pA.toStringAsFixed(1)} × ${_pBgivenA.toStringAsFixed(1)}'),
          _CalcRow(label: 'P(¬A ∩ B)', value: pNotAandB, formula: '${pNotA.toStringAsFixed(1)} × ${_pBgivenNotA.toStringAsFixed(1)}'),
          _CalcRow(label: 'P(B)', value: pB, formula: '${pAandB.toStringAsFixed(2)} + ${pNotAandB.toStringAsFixed(2)}'),
          const Divider(),
          _CalcRow(label: 'P(A|B)', value: pAgivenB, formula: 'P(A∩B)/P(B)', isHighlight: true),
        ],
      ),
    );
  }

  Widget _buildControls() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        FilterChip(
          label: const Text('Calculs'),
          selected: _showCalculations,
          onSelected: (v) => setState(() => _showCalculations = v),
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
              'P(A|B) = ${widget.item.correctValue}',
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
              hintText: 'Calculer P(A|B)',
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

class _ProbabilitySlider extends StatelessWidget {
  final String label;
  final double value;
  final ValueChanged<double> onChanged;

  const _ProbabilitySlider({
    required this.label,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 80,
          child: Text(label, style: const TextStyle(fontSize: 14)),
        ),
        Expanded(
          child: Slider(
            value: value,
            min: 0,
            max: 1,
            divisions: 20,
            onChanged: onChanged,
          ),
        ),
        SizedBox(
          width: 50,
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

class _CalcRow extends StatelessWidget {
  final String label;
  final double value;
  final String formula;
  final bool isHighlight;

  const _CalcRow({
    required this.label,
    required this.value,
    required this.formula,
    this.isHighlight = false,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          SizedBox(
            width: 80,
            child: Text(
              label,
              style: TextStyle(
                fontWeight: isHighlight ? FontWeight.w700 : FontWeight.normal,
                color: isHighlight ? BacPrepColors.primary : BacPrepColors.textPrimary,
              ),
            ),
          ),
          Expanded(
            child: Text(
              '= $formula',
              style: TextStyle(
                color: BacPrepColors.textSecondary,
                fontStyle: FontStyle.italic,
              ),
            ),
          ),
          Text(
            '= ${value.toStringAsFixed(3)}',
            style: TextStyle(
              fontWeight: isHighlight ? FontWeight.w700 : FontWeight.w600,
              color: isHighlight ? BacPrepColors.success : BacPrepColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}

class _ProbabilityTreePainter extends CustomPainter {
  final double pA;
  final double pBgivenA;
  final double pBgivenNotA;
  final int highlightedNode;
  final double animationValue;

  _ProbabilityTreePainter({
    required this.pA,
    required this.pBgivenA,
    required this.pBgivenNotA,
    required this.highlightedNode,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final rootY = 40.0;
    final level1Y = 130.0;
    final level2Y = 250.0;

    void drawNode(Offset pos, String label, double prob, Color color, bool highlight) {
      final radius = highlight ? 30.0 : 25.0;
      final paint = Paint()
        ..color = highlight ? color : color.withValues(alpha: 0.7)
        ..style = PaintingStyle.fill;

      canvas.drawCircle(pos, radius * animationValue, paint);
      canvas.drawCircle(
        pos,
        radius * animationValue,
        Paint()
          ..color = Colors.white
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );

      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: label,
        style: TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        Offset(pos.dx - textPainter.width / 2, pos.dy - textPainter.height / 2),
      );

      textPainter.text = TextSpan(
        text: prob.toStringAsFixed(2),
        style: TextStyle(
          color: color,
          fontSize: 10,
          fontWeight: FontWeight.w600,
        ),
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        Offset(pos.dx - textPainter.width / 2, pos.dy + radius * animationValue + 5),
      );
    }

    void drawArrow(Offset from, Offset to, String label, Color color, bool highlight) {
      final paint = Paint()
        ..color = highlight ? color : color.withValues(alpha: 0.5)
        ..strokeWidth = highlight ? 3 : 2
        ..style = PaintingStyle.stroke;

      canvas.drawLine(from, to, paint);

      final arrowPath = Path();
      final dir = (to - from).direction;
      const arrowLen = 12.0;
      arrowPath.moveTo(to.dx, to.dy);
      final cosDir = cos(dir);
      final sinDir = sin(dir);
      arrowPath.lineTo(
        to.dx - arrowLen * 1.2 * cosDir + arrowLen * 0.5 * sinDir,
        to.dy - arrowLen * 1.2 * sinDir - arrowLen * 0.5 * cosDir,
      );
      arrowPath.moveTo(to.dx, to.dy);
      arrowPath.lineTo(
        to.dx - arrowLen * 1.2 * cosDir - arrowLen * 0.5 * sinDir,
        to.dy - arrowLen * 1.2 * sinDir + arrowLen * 0.5 * cosDir,
      );
      canvas.drawPath(arrowPath, paint);

      final mid = Offset((from.dx + to.dx) / 2 - 15, (from.dy + to.dy) / 2);
      final textPainter = TextPainter(textDirection: TextDirection.ltr);
      textPainter.text = TextSpan(
        text: label,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      );
      textPainter.layout();
      textPainter.paint(canvas, mid);
    }

    final root = Offset(centerX, rootY);
    final nodeA = Offset(centerX - 100, level1Y);
    final nodeNotA = Offset(centerX + 100, level1Y);
    final nodeAB = Offset(centerX - 150, level2Y);
    final nodeANotB = Offset(centerX - 50, level2Y);
    final nodeNotAB = Offset(centerX + 50, level2Y);
    final nodeNotANotB = Offset(centerX + 150, level2Y);

    drawNode(root, 'START', 1, BacPrepColors.textSecondary, highlightedNode == 0);
    drawNode(nodeA, 'A', pA, BacPrepColors.primary, highlightedNode == 1);
    drawNode(nodeNotA, '¬A', 1 - pA, BacPrepColors.warning, highlightedNode == 2);
    drawNode(nodeAB, 'A∩B', pA * pBgivenA, BacPrepColors.success, highlightedNode == 3);
    drawNode(nodeANotB, 'A∩¬B', pA * (1 - pBgivenA), BacPrepColors.error, highlightedNode == 4);
    drawNode(nodeNotAB, '¬A∩B', (1 - pA) * pBgivenNotA, BacPrepColors.success, highlightedNode == 5);
    drawNode(nodeNotANotB, '¬A∩¬B', (1 - pA) * (1 - pBgivenNotA), BacPrepColors.error, highlightedNode == 6);

    drawArrow(root, nodeA, pA.toStringAsFixed(2), BacPrepColors.primary, highlightedNode == 1);
    drawArrow(root, nodeNotA, (1 - pA).toStringAsFixed(2), BacPrepColors.warning, highlightedNode == 2);
    drawArrow(nodeA, nodeAB, pBgivenA.toStringAsFixed(2), BacPrepColors.success, highlightedNode == 3);
    drawArrow(nodeA, nodeANotB, (1 - pBgivenA).toStringAsFixed(2), BacPrepColors.error, highlightedNode == 4);
    drawArrow(nodeNotA, nodeNotAB, pBgivenNotA.toStringAsFixed(2), BacPrepColors.success, highlightedNode == 5);
    drawArrow(nodeNotA, nodeNotANotB, (1 - pBgivenNotA).toStringAsFixed(2), BacPrepColors.error, highlightedNode == 6);
  }

  @override
  bool shouldRepaint(covariant _ProbabilityTreePainter oldDelegate) {
    return pA != oldDelegate.pA ||
        pBgivenA != oldDelegate.pBgivenA ||
        pBgivenNotA != oldDelegate.pBgivenNotA ||
        highlightedNode != oldDelegate.highlightedNode ||
        animationValue != oldDelegate.animationValue;
  }
}

extension on double {
  double get cos => this;
  double get sin => this;
}
