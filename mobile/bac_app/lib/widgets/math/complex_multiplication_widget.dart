import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class ComplexMultiplicationWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const ComplexMultiplicationWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<ComplexMultiplicationWidget> createState() => _ComplexMultiplicationWidgetState();
}

class _ComplexMultiplicationWidgetState extends State<ComplexMultiplicationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _z1Real = 3;
  double _z1Imag = 2;
  double _z2Real = 1;
  double _z2Imag = -4;

  bool _showVector = true;
  bool _showSteps = true;
  bool _showResult = true;

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
  }

  double get _resultReal => _z1Real * _z2Real - _z1Imag * _z2Imag;
  double get _resultImag => _z1Real * _z2Imag + _z1Imag * _z2Real;
  double get _resultModule => math.sqrt(_resultReal * _resultReal + _resultImag * _resultImag);
  double get _resultArgument => math.atan2(_resultImag, _resultReal);

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_hasSubmitted) return;
    setState(() => _hasSubmitted = true);
    widget.onAnswer('$_resultReal + ${_resultImag}i');
  }

  String _formatNumber(double val) {
    if (val == val.roundToDouble()) return val.toInt().toString();
    return val.toStringAsFixed(1);
  }

  String _formatResult() {
    if (_resultImag >= 0) {
      return '${_formatNumber(_resultReal)} + ${_formatNumber(_resultImag)}i';
    }
    return '${_formatNumber(_resultReal)} - ${_formatNumber(_resultImag.abs())}i';
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
          _buildInputControls(),
          const SizedBox(height: Spacing.md),
          _buildCalculation(),
          const SizedBox(height: Spacing.md),
          _buildResult(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildComplexPlane() {
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
              painter: _ComplexPlanePainter(
                z1Real: _z1Real,
                z1Imag: _z1Imag,
                z2Real: _z2Real,
                z2Imag: _z2Imag,
                resultReal: _resultReal,
                resultImag: _resultImag,
                showVector: _showVector,
                showResult: _showResult,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildInputControls() {
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
            'Nombres complexes',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            children: [
              Expanded(
                child: _ComplexInput(
                  label: 'z₁ = a + bi',
                  realValue: _z1Real,
                  imagValue: _z1Imag,
                  realColor: BacPrepColors.primary,
                  onRealChanged: (v) => setState(() {
                    _z1Real = v;
                    _controller.forward(from: 0);
                  }),
                  onImagChanged: (v) => setState(() {
                    _z1Imag = v;
                    _controller.forward(from: 0);
                  }),
                ),
              ),
              const SizedBox(width: Spacing.md),
              const Text('×', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(width: Spacing.md),
              Expanded(
                child: _ComplexInput(
                  label: 'z₂ = a + bi',
                  realValue: _z2Real,
                  imagValue: _z2Imag,
                  realColor: BacPrepColors.warning,
                  onRealChanged: (v) => setState(() {
                    _z2Real = v;
                    _controller.forward(from: 0);
                  }),
                  onImagChanged: (v) => setState(() {
                    _z2Imag = v;
                    _controller.forward(from: 0);
                  }),
                ),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Vecteurs'),
                selected: _showVector,
                onSelected: (v) => setState(() => _showVector = v),
              ),
              FilterChip(
                label: const Text('Résultat'),
                selected: _showResult,
                onSelected: (v) => setState(() {
                  _showResult = v;
                  _controller.forward(from: 0);
                }),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCalculation() {
    if (!_showSteps) return const SizedBox.shrink();

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
            'Calcul: z₁ × z₂',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.math,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          _StepRow(
            label: 'Partie réelle',
            formula: 'a₁a₂ - b₁b₂',
            values: '${_formatNumber(_z1Real)}×${_formatNumber(_z2Real)} - ${_formatNumber(_z1Imag)}×${_formatNumber(_z2Imag)}',
            result: _formatNumber(_resultReal),
          ),
          const SizedBox(height: Spacing.xs),
          _StepRow(
            label: 'Partie imaginaire',
            formula: 'a₁b₂ + a₂b₁',
            values: '${_formatNumber(_z1Real)}×${_formatNumber(_z2Imag)} + ${_formatNumber(_z2Real)}×${_formatNumber(_z1Imag)}',
            result: '${_formatNumber(_resultImag)}i',
            isImag: true,
          ),
        ],
      ),
    );
  }

  Widget _buildResult() {
    if (!_showResult) return const SizedBox.shrink();

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
            'Résultat',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Text(
            _formatResult(),
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w700,
              color: BacPrepColors.success,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _ResultInfo(
                label: 'Module',
                value: _formatNumber(_resultModule),
                color: BacPrepColors.primary,
              ),
              const SizedBox(width: Spacing.lg),
              _ResultInfo(
                label: 'Argument',
                value: '${(_resultArgument * 180 / math.pi).toStringAsFixed(1)}°',
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
              'Résultat : $_formatResult()',
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

    return TextField(
      controller: _answerController,
      decoration: InputDecoration(
        hintText: 'Entrez z₁ × z₂ (ex: 11 - 10i)',
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      style: const TextStyle(fontSize: 18),
      onSubmitted: (_) => _submit(),
    );
  }
}

class _ComplexInput extends StatelessWidget {
  final String label;
  final double realValue;
  final double imagValue;
  final Color realColor;
  final ValueChanged<double> onRealChanged;
  final ValueChanged<double> onImagChanged;

  const _ComplexInput({
    required this.label,
    required this.realValue,
    required this.imagValue,
    required this.realColor,
    required this.onRealChanged,
    required this.onImagChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 12, color: realColor)),
        const SizedBox(height: 4),
        Row(
          children: [
            Expanded(
              child: _NumberInput(
                label: 'a',
                value: realValue,
                color: realColor,
                onChanged: onRealChanged,
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 4),
              child: Text('+', style: TextStyle(fontSize: 18)),
            ),
            Expanded(
              child: _NumberInput(
                label: 'b',
                value: imagValue,
                color: realColor,
                onChanged: onImagChanged,
                isImag: true,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _NumberInput extends StatelessWidget {
  final String label;
  final double value;
  final Color color;
  final ValueChanged<double> onChanged;
  final bool isImag;

  const _NumberInput({
    required this.label,
    required this.value,
    required this.color,
    required this.onChanged,
    this.isImag = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          Text(
            isImag ? '${label}i' : label,
            style: TextStyle(
              fontSize: 12,
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(width: 4),
          Expanded(
            child: SliderTheme(
              data: SliderTheme.of(context).copyWith(
                trackHeight: 2,
                thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
              ),
              child: Slider(
                value: value,
                min: -5,
                max: 5,
                divisions: 20,
                onChanged: onChanged,
              ),
            ),
          ),
          SizedBox(
            width: 30,
            child: Text(
              value.toStringAsFixed(0),
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: color,
              ),
              textAlign: TextAlign.end,
            ),
          ),
        ],
      ),
    );
  }
}

class _StepRow extends StatelessWidget {
  final String label;
  final String formula;
  final String values;
  final String result;
  final bool isImag;

  const _StepRow({
    required this.label,
    required this.formula,
    required this.values,
    required this.result,
    this.isImag = false,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 2,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  color: BacPrepColors.textSecondary,
                ),
              ),
              Text(
                formula,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: BacPrepColors.math,
                ),
              ),
            ],
          ),
        ),
        Expanded(
          flex: 3,
          child: Text(
            '= $values',
            style: TextStyle(
              fontSize: 12,
              color: BacPrepColors.textSecondary,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        Expanded(
          child: Text(
            '= $result',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: isImag ? BacPrepColors.warning : BacPrepColors.success,
            ),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

class _ResultInfo extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _ResultInfo({
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
          style: TextStyle(fontSize: 12, color: BacPrepColors.textSecondary),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: color,
          ),
        ),
      ],
    );
  }
}

class _ComplexPlanePainter extends CustomPainter {
  final double z1Real;
  final double z1Imag;
  final double z2Real;
  final double z2Imag;
  final double resultReal;
  final double resultImag;
  final bool showVector;
  final bool showResult;
  final double animationValue;

  _ComplexPlanePainter({
    required this.z1Real,
    required this.z1Imag,
    required this.z2Real,
    required this.z2Imag,
    required this.resultReal,
    required this.resultImag,
    required this.showVector,
    required this.showResult,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final scale = size.height / 12;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.5;
    final gridPaint = Paint()
      ..color = BacPrepColors.border.withValues(alpha: 0.3)
      ..strokeWidth = 0.5;

    canvas.drawLine(Offset(0, centerY), Offset(size.width, centerY), axisPaint);
    canvas.drawLine(Offset(centerX, 0), Offset(centerX, size.height), axisPaint);

    for (int i = -5; i <= 5; i++) {
      if (i != 0) {
        canvas.drawLine(
          Offset(centerX + i * scale, 0),
          Offset(centerX + i * scale, size.height),
          gridPaint,
        );
        canvas.drawLine(
          Offset(0, centerY - i * scale),
          Offset(size.width, centerY - i * scale),
          gridPaint,
        );
      }
    }

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    textPainter.text = TextSpan(
      text: 'Re',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width - 25, centerY + 5));

    textPainter.text = TextSpan(
      text: 'Im',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + 5, 5));

    if (showVector) {
      final z1Paint = Paint()
        ..color = BacPrepColors.primary
        ..strokeWidth = 3
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;
      final z1End = Offset(centerX + z1Real * scale, centerY - z1Imag * scale);
      canvas.drawLine(Offset(centerX, centerY), z1End, z1Paint);
      canvas.drawCircle(z1End, 6 * animationValue, Paint()..color = BacPrepColors.primary);

      final z2Paint = Paint()
        ..color = BacPrepColors.warning
        ..strokeWidth = 3
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;
      final z2End = Offset(centerX + z2Real * scale, centerY - z2Imag * scale);
      canvas.drawLine(Offset(centerX, centerY), z2End, z2Paint);
      canvas.drawCircle(z2End, 6 * animationValue, Paint()..color = BacPrepColors.warning);

      textPainter.text = TextSpan(
        text: 'z₁',
        style: TextStyle(color: BacPrepColors.primary, fontSize: 12, fontWeight: FontWeight.bold),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(z1End.dx + 8, z1End.dy - 20));

      textPainter.text = TextSpan(
        text: 'z₂',
        style: TextStyle(color: BacPrepColors.warning, fontSize: 12, fontWeight: FontWeight.bold),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(z2End.dx + 8, z2End.dy));
    }

    if (showResult) {
      final resultPaint = Paint()
        ..color = BacPrepColors.success
        ..strokeWidth = 4
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;
      final resultEnd = Offset(centerX + resultReal * scale, centerY - resultImag * scale);
      canvas.drawLine(Offset(centerX, centerY), resultEnd, resultPaint);
      canvas.drawCircle(resultEnd, 8 * animationValue, Paint()..color = BacPrepColors.success);

      textPainter.text = TextSpan(
        text: 'z₁z₂',
        style: TextStyle(color: BacPrepColors.success, fontSize: 12, fontWeight: FontWeight.bold),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(resultEnd.dx + 10, resultEnd.dy - 10));
    }
  }

  @override
  bool shouldRepaint(covariant _ComplexPlanePainter oldDelegate) {
    return z1Real != oldDelegate.z1Real ||
        z1Imag != oldDelegate.z1Imag ||
        z2Real != oldDelegate.z2Real ||
        z2Imag != oldDelegate.z2Imag ||
        animationValue != oldDelegate.animationValue;
  }
}
