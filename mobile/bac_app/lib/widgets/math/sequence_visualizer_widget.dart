import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class SequenceVisualizerWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const SequenceVisualizerWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<SequenceVisualizerWidget> createState() => _SequenceVisualizerWidgetState();
}

class _SequenceVisualizerWidgetState extends State<SequenceVisualizerWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  int _currentTermIndex = 0;
  List<double> _sequence = [];
  double _convergenceValue = 0;
  bool _showCobweb = false;
  
  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
    _initializeSequence();
  }

  void _initializeSequence() {
    final config = widget.item.simConfig;
    final sequenceType = config['sequence_type'] as String? ?? 'arithmetic';
    final initialValue = (config['initial'] as num?)?.toDouble() ?? 1;
    
    _sequence = [initialValue];
    
    switch (sequenceType) {
      case 'arithmetic':
        final ratio = (config['ratio'] as num?)?.toDouble() ?? 2;
        final difference = (config['difference'] as num?)?.toDouble() ?? 1;
        for (int i = 1; i < 20; i++) {
          if (config.containsKey('ratio')) {
            _sequence.add(_sequence[i - 1] * ratio);
          } else {
            _sequence.add(_sequence[i - 1] + difference);
          }
        }
        break;
      case 'geometric':
        final ratio = (config['ratio'] as num?)?.toDouble() ?? 0.5;
        for (int i = 1; i < 20; i++) {
          _sequence.add(_sequence[i - 1] * ratio);
        }
        _convergenceValue = 0;
        break;
      case 'recursive':
        final recursiveFormula = config['recursive'] as String? ?? 'next = (current + 3) / 2';
        _computeRecursiveSequence(recursiveFormula, initialValue);
        break;
      case 'linear_convergence':
        _sequence = [];
        double u = initialValue;
        for (int i = 0; i < 20; i++) {
          _sequence.add(u);
          u = 0.7 * u + 0.3 * 5;
        }
        _convergenceValue = 5;
        break;
      default:
        for (int i = 1; i < 20; i++) {
          _sequence.add(initialValue + i * 2);
        }
    }
    
    _convergenceValue = _sequence.last;
    if (sequenceType == 'linear_convergence') {
      _convergenceValue = 5;
    }
  }

  void _computeRecursiveSequence(String formula, double initial) {
    _sequence = [initial];
    for (int i = 1; i < 20; i++) {
      final current = _sequence[i - 1];
      double next;
      if (formula.contains('(current +')) {
        final parts = formula.split('(current + ');
        if (parts.length > 1) {
          final inner = parts[1].split(')')[0];
          final addVal = double.tryParse(inner) ?? 3;
          final divisor = formula.contains('/2') ? 2.0 : 1.0;
          next = (current + addVal) / divisor;
        } else {
          next = current * 1.5;
        }
      } else {
        next = current * 0.5 + 1;
      }
      _sequence.add(next);
    }
    _convergenceValue = _sequence.last;
  }

  @override
  void didUpdateWidget(SequenceVisualizerWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.item.id != oldWidget.item.id) {
      _currentTermIndex = 0;
      _answerController.clear();
      _hasSubmitted = false;
      _showCobweb = false;
      _controller.reset();
      _initializeSequence();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _stepForward() {
    if (_currentTermIndex < _sequence.length - 1) {
      setState(() {
        _currentTermIndex++;
      });
      _controller.forward(from: 0);
    }
  }

  void _reset() {
    setState(() {
      _currentTermIndex = 0;
    });
    _controller.reset();
  }

  void _toggleCobweb() {
    setState(() {
      _showCobweb = !_showCobweb;
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
          _buildVisualization(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildSequenceInfo(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildVisualization() {
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
              painter: _SequencePainter(
                sequence: _sequence,
                currentIndex: _currentTermIndex,
                animationValue: _animation.value,
                showCobweb: _showCobweb,
                convergenceValue: _convergenceValue,
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
        IconButton.filled(
          icon: const Icon(Icons.refresh),
          onPressed: _reset,
          tooltip: 'Recommencer',
        ),
        const SizedBox(width: Spacing.sm),
        IconButton.filled(
          icon: const Icon(Icons.skip_next),
          onPressed: _currentTermIndex < _sequence.length - 1 ? _stepForward : null,
          tooltip: 'Terme suivant',
        ),
        const SizedBox(width: Spacing.md),
        ChoiceChip(
          label: const Text('Cobweb'),
          selected: _showCobweb,
          onSelected: (_) => _toggleCobweb(),
        ),
      ],
    );
  }

  Widget _buildSequenceInfo() {
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
            'Termes de la suite',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            runSpacing: Spacing.xs,
            children: List.generate(
              _sequence.length.clamp(0, 10),
              (i) {
                final isActive = i == _currentTermIndex;
                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: isActive 
                        ? BacPrepColors.primary.withValues(alpha: 0.2)
                        : BacPrepColors.surface,
                    borderRadius: BorderRadius.circular(6),
                    border: isActive 
                        ? Border.all(color: BacPrepColors.primary, width: 2)
                        : Border.all(color: BacPrepColors.border),
                  ),
                  child: Text(
                    'U${i} = ${_sequence[i].toStringAsFixed(2)}',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                      color: isActive ? BacPrepColors.primary : BacPrepColors.textPrimary,
                    ),
                  ),
                );
              },
            ),
          ),
          if (_sequence.length > 10)
            Padding(
              padding: const EdgeInsets.only(top: Spacing.sm),
              child: Text(
                '... U∞ ≈ ${_convergenceValue.toStringAsFixed(2)}',
                style: TextStyle(
                  color: BacPrepColors.success,
                  fontWeight: FontWeight.w600,
                ),
              ),
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
              'Limite : ${widget.item.correctValue}',
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
              hintText: 'Limite de la suite',
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

class _SequencePainter extends CustomPainter {
  final List<double> sequence;
  final int currentIndex;
  final double animationValue;
  final bool showCobweb;
  final double convergenceValue;

  _SequencePainter({
    required this.sequence,
    required this.currentIndex,
    required this.animationValue,
    required this.showCobweb,
    required this.convergenceValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (sequence.isEmpty) return;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;
    final linePaint = Paint()
      ..color = BacPrepColors.primary
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;
    final dotPaint = Paint()
      ..color = BacPrepColors.primary
      ..style = PaintingStyle.fill;
    final activeDotPaint = Paint()
      ..color = BacPrepColors.accent
      ..style = PaintingStyle.fill;
    final convergencePaint = Paint()
      ..color = BacPrepColors.success.withValues(alpha: 0.5)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final centerY = size.height * 0.7;
    final leftPadding = 50.0;
    final graphWidth = size.width - leftPadding;

    final maxVal = sequence.reduce((a, b) => a.abs() > b.abs() ? a : b).abs();
    final displayMax = (maxVal * 1.2).clamp(1.0, double.infinity);
    final scale = (size.height * 0.5) / displayMax;

    canvas.drawLine(
      Offset(leftPadding, centerY),
      Offset(size.width - 10, centerY),
      axisPaint,
    );

    final stepX = graphWidth / (sequence.length.clamp(1, 20));
    
    for (int i = 0; i <= currentIndex.clamp(0, sequence.length - 1); i++) {
      final x = leftPadding + i * stepX;
      final y = centerY - sequence[i] * scale;
      
      if (y > 10 && y < size.height - 10) {
        canvas.drawCircle(
          Offset(x, y),
          i == currentIndex ? 8 * animationValue : 5,
          i == currentIndex ? activeDotPaint : dotPaint,
        );
      }
    }

    final path = Path();
    for (int i = 0; i <= currentIndex.clamp(0, sequence.length - 1); i++) {
      final x = leftPadding + i * stepX;
      final y = centerY - sequence[i] * scale;
      if (y > 10 && y < size.height - 10) {
        if (i == 0) {
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
      }
    }
    canvas.drawPath(path, linePaint);

    final convY = centerY - convergenceValue * scale;
    if (convY > 10 && convY < size.height - 10) {
      canvas.drawLine(
        Offset(leftPadding, convY),
        Offset(size.width - 10, convY),
        convergencePaint,
      );
    }

    if (showCobweb && currentIndex > 0) {
      final cobwebPaint = Paint()
        ..color = BacPrepColors.warning.withValues(alpha: 0.7)
        ..strokeWidth = 1.5
        ..style = PaintingStyle.stroke;
      
      final cobwebPath = Path();
      for (int i = 0; i < currentIndex.clamp(0, sequence.length - 1); i++) {
        final x1 = leftPadding + i * stepX;
        final y1 = centerY - sequence[i] * scale;
        final x2 = leftPadding + (i + 1) * stepX;
        final y2 = centerY - sequence[i] * scale;
        final x3 = leftPadding + (i + 1) * stepX;
        final y3 = centerY - sequence[i + 1] * scale;
        
        cobwebPath.moveTo(x1, y1);
        cobwebPath.lineTo(x2, y2);
        cobwebPath.lineTo(x3, y3);
      }
      canvas.drawPath(cobwebPath, cobwebPaint);
    }

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: '0',
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(leftPadding - textPainter.width - 4, centerY + 4));

    textPainter.text = TextSpan(
      text: _formatNumber(displayMax),
      style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(leftPadding - textPainter.width - 4, centerY - displayMax * scale - 6));
  }

  String _formatNumber(double n) {
    if (n.abs() >= 1000) return '${(n / 1000).toStringAsFixed(1)}k';
    if (n == n.roundToDouble()) return n.toInt().toString();
    return n.toStringAsFixed(1);
  }

  @override
  bool shouldRepaint(covariant _SequencePainter oldDelegate) {
    return currentIndex != oldDelegate.currentIndex ||
        animationValue != oldDelegate.animationValue ||
        showCobweb != oldDelegate.showCobweb;
  }
}
