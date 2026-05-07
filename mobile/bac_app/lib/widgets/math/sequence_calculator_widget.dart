import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class SequenceCalculatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const SequenceCalculatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<SequenceCalculatorWidget> createState() => _SequenceCalculatorWidgetState();
}

class _SequenceCalculatorWidgetState extends State<SequenceCalculatorWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  String _sequenceType = 'arithmetic';
  double _initialValue = 1;
  double _ratio = 3;
  double _difference = 2;

  int _displayedTerms = 10;
  List<double> _terms = [];

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
    _controller.forward();
    _computeTerms();
  }

  void _computeTerms() {
    _terms = [];
    switch (_sequenceType) {
      case 'arithmetic':
        for (int i = 0; i < _displayedTerms; i++) {
          _terms.add(_initialValue + i * _difference);
        }
        break;
      case 'geometric':
        for (int i = 0; i < _displayedTerms; i++) {
          _terms.add(_initialValue * math.pow(_ratio, i));
        }
        break;
      case 'fibonacci':
        if (_displayedTerms > 0) _terms.add(1);
        if (_displayedTerms > 1) _terms.add(1);
        for (int i = 2; i < _displayedTerms; i++) {
          _terms.add(_terms[i - 1] + _terms[i - 2]);
        }
        break;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double _computeSum() {
    if (_sequenceType == 'arithmetic') {
      return (_displayedTerms / 2) * (_terms.first + _terms.last);
    } else if (_sequenceType == 'geometric' && _ratio.abs() < 1) {
      return _initialValue * (1 - math.pow(_ratio, _displayedTerms)) / (1 - _ratio);
    }
    return _terms.fold(0.0, (a, b) => a + b);
  }

  double _getNthTerm(int n) {
    switch (_sequenceType) {
      case 'arithmetic':
        return _initialValue + (n - 1) * _difference;
      case 'geometric':
        return _initialValue * math.pow(_ratio, n - 1);
      case 'fibonacci':
        if (n <= 2) return 1;
        double a = 1, b = 1;
        for (int i = 3; i <= n; i++) {
          final c = a + b;
          a = b;
          b = c;
        }
        return b;
      default:
        return 0;
    }
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

  String _formatValue(double v) {
    if (v.abs() >= 1e6) return '${(v / 1e6).toStringAsFixed(1)}M';
    if (v.abs() >= 1e3) return '${(v / 1e3).toStringAsFixed(1)}k';
    if (v == v.roundToDouble()) return v.toInt().toString();
    return v.toStringAsFixed(2);
  }

  @override
  Widget build(BuildContext context) {
    final config = widget.item.simConfig;
    _sequenceType = config['type'] as String? ?? _sequenceType;
    _initialValue = (config['initial'] as num?)?.toDouble() ?? _initialValue;
    _ratio = (config['ratio'] as num?)?.toDouble() ?? _ratio;
    _difference = (config['difference'] as num?)?.toDouble() ?? _difference;

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
          _buildVisualization(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildStats(),
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
            'Type de suite',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              ChoiceChip(
                label: const Text('Arithmétique'),
                selected: _sequenceType == 'arithmetic',
                onSelected: (v) {
                  if (v) setState(() {
                    _sequenceType = 'arithmetic';
                    _computeTerms();
                    _controller.forward(from: 0);
                  });
                },
              ),
              ChoiceChip(
                label: const Text('Géométrique'),
                selected: _sequenceType == 'geometric',
                onSelected: (v) {
                  if (v) setState(() {
                    _sequenceType = 'geometric';
                    _computeTerms();
                    _controller.forward(from: 0);
                  });
                },
              ),
              ChoiceChip(
                label: const Text('Fibonacci'),
                selected: _sequenceType == 'fibonacci',
                onSelected: (v) {
                  if (v) setState(() {
                    _sequenceType = 'fibonacci';
                    _computeTerms();
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

  Widget _buildVisualization() {
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
              painter: _SequencePainter(
                terms: _terms,
                sequenceType: _sequenceType,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
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
          if (_sequenceType != 'fibonacci')
            _ParameterRow(
              label: 'Premier terme (U₁)',
              value: _initialValue,
              min: -10,
              max: 10,
              onChanged: (v) => setState(() {
                _initialValue = v;
                _computeTerms();
                _controller.forward(from: 0);
              }),
            ),
          if (_sequenceType == 'arithmetic') ...[
            const SizedBox(height: Spacing.sm),
            _ParameterRow(
              label: 'Raison (d)',
              value: _difference,
              min: -5,
              max: 5,
              onChanged: (v) => setState(() {
                _difference = v;
                _computeTerms();
                _controller.forward(from: 0);
              }),
            ),
          ],
          if (_sequenceType == 'geometric') ...[
            const SizedBox(height: Spacing.sm),
            _ParameterRow(
              label: 'Raison (q)',
              value: _ratio,
              min: -3,
              max: 3,
              onChanged: (v) => setState(() {
                _ratio = v;
                _computeTerms();
                _controller.forward(from: 0);
              }),
            ),
          ],
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              const Text('Nombre de termes affichés:'),
              Expanded(
                child: Slider(
                  value: _displayedTerms.toDouble(),
                  min: 5,
                  max: 15,
                  divisions: 10,
                  label: _displayedTerms.toString(),
                  onChanged: (v) => setState(() {
                    _displayedTerms = v.toInt();
                    _computeTerms();
                    _controller.forward(from: 0);
                  }),
                ),
              ),
              Text('$_displayedTerms'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStats() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.math.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.math.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            'Propriétés de la suite',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.math,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _StatItem(
                label: 'U₁₀',
                value: _formatValue(_getNthTerm(10)),
                color: BacPrepColors.primary,
              ),
              _StatItem(
                label: 'U₂₀',
                value: _formatValue(_getNthTerm(20)),
                color: BacPrepColors.warning,
              ),
              _StatItem(
                label: 'Σ₁₀',
                value: _formatValue(_computeSum()),
                color: BacPrepColors.success,
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Text(
            _getFormula(),
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: BacPrepColors.math,
            ),
          ),
        ],
      ),
    );
  }

  String _getFormula() {
    switch (_sequenceType) {
      case 'arithmetic':
        return 'Uₙ = U₁ + (n-1)d = $_initialValue + (n-1)×$_difference';
      case 'geometric':
        return 'Uₙ = U₁ × qⁿ⁻¹ = $_initialValue × $_ratioⁿ⁻¹';
      case 'fibonacci':
        return 'Fₙ = Fₙ₋₁ + Fₙ₋₂, F₁=F₂=1';
      default:
        return '';
    }
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
              'U₁₀ = ${widget.item.correctValue}',
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
              hintText: 'Calculer U₁₀',
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

class _ParameterRow extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final ValueChanged<double> onChanged;

  const _ParameterRow({
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
          width: 120,
          child: Text(label, style: const TextStyle(fontSize: 14)),
        ),
        Expanded(
          child: Slider(
            value: value.clamp(min, max),
            min: min,
            max: max,
            divisions: ((max - min) * 2).toInt(),
            onChanged: onChanged,
          ),
        ),
        SizedBox(
          width: 50,
          child: Text(
            _formatValue(value),
            style: const TextStyle(fontWeight: FontWeight.w600),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }

  String _formatValue(double v) {
    if (v == v.roundToDouble()) return v.toInt().toString();
    return v.toStringAsFixed(1);
  }
}

class _StatItem extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _StatItem({
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
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: color,
          ),
        ),
      ],
    );
  }
}

class _SequencePainter extends CustomPainter {
  final List<double> terms;
  final String sequenceType;
  final double animationValue;

  _SequencePainter({
    required this.terms,
    required this.sequenceType,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (terms.isEmpty) return;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;
    final linePaint = Paint()
      ..color = BacPrepColors.math
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    final dotPaint = Paint()
      ..color = BacPrepColors.math
      ..style = PaintingStyle.fill;

    canvas.drawLine(Offset(0, size.height - 20), Offset(size.width, size.height - 20), axisPaint);
    canvas.drawLine(Offset(20, 0), Offset(20, size.height), axisPaint);

    final maxVal = terms.reduce((a, b) => a.abs() > b.abs() ? a : b).abs();
    final minVal = terms.reduce((a, b) => a < b ? a : b);
    final range = maxVal - minVal;
    final displayRange = range > 0 ? range * 1.2 : maxVal * 2 + 2;

    final stepX = (size.width - 40) / (terms.length - 1).clamp(1, 20);
    final centerY = size.height / 2;
    final scale = (size.height - 40) / displayRange;

    final path = Path();
    for (int i = 0; i < (terms.length * animationValue).ceil(); i++) {
      final x = 20 + i * stepX;
      final normalized = (terms[i] - minVal) / displayRange;
      final y = centerY - (terms[i] - (maxVal + minVal) / 2) * scale;

      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }

      if (i < (terms.length * animationValue).ceil()) {
        canvas.drawCircle(Offset(x, y), 5, dotPaint);
      }
    }
    canvas.drawPath(path, linePaint);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    for (int i = 0; i < terms.length.clamp(0, 10); i += 2) {
      textPainter.text = TextSpan(
        text: 'U${i + 1}',
        style: TextStyle(color: BacPrepColors.textTertiary, fontSize: 9),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(20 + i * stepX - textPainter.width / 2, size.height - 18));
    }
  }

  @override
  bool shouldRepaint(covariant _SequencePainter oldDelegate) {
    return terms != oldDelegate.terms || animationValue != oldDelegate.animationValue;
  }
}
