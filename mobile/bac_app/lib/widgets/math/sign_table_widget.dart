import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

class SignTableWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const SignTableWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<SignTableWidget> createState() => _SignTableWidgetState();
}

class _SignTableWidgetState extends State<SignTableWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  double _a = 1, _b = -3, _c = 2;
  bool _showFactors = true;
  bool _showZeros = true;
  bool _showSign = true;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  List<double> get _zeros {
    final disc = _b * _b - 4 * _a * _c;
    if (disc < 0) return [];
    if (disc == 0) return [-_b / (2 * _a)];
    final sqrtDisc = disc.sqrt();
    return [(-_b - sqrtDisc) / (2 * _a), (-_b + sqrtDisc) / (2 * _a)];
  }

  String get _factorization {
    final z = _zeros;
    if (z.length == 2) {
      return '${_a}x² + ${_b}x + $_c = ${_a}(x - ${_formatVal(z[0])})(x - ${_formatVal(z[1])})';
    } else if (z.length == 1) {
      return '${_a}x² + ${_b}x + $_c = ${_a}(x - ${_formatVal(z[0])})²';
    }
    return '${_a}x² + ${_b}x + $_c (non factorisable)';
  }

  String _formatVal(double v) {
    if (v == v.roundToDouble()) return v.toInt().toString();
    return v.toStringAsFixed(2);
  }

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

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_hasSubmitted) return;
    setState(() => _hasSubmitted = true);
    widget.onAnswer(_answerController.text.trim());
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
          _buildPolynomial(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildSignTable(),
          const SizedBox(height: Spacing.md),
          _buildZeros(),
          const SizedBox(height: Spacing.lg),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildPolynomial() {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.math.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.math.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            'Signe du trinôme',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: BacPrepColors.textSecondary,
            ),
          ),
          const SizedBox(height: Spacing.sm),
          RichTextRenderer(
            text: 'f(x) = ${_a.toStringAsFixed(0)}x² + ${_b.toStringAsFixed(0)}x + ${_c.toStringAsFixed(0)}',
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: BacPrepColors.math,
            ),
          ),
          if (_showFactors) ...[
            const SizedBox(height: Spacing.sm),
            Text(
              _factorization,
              style: TextStyle(
                fontSize: 14,
                color: BacPrepColors.textSecondary,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ],
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
          _CoefficientSlider(
            label: 'a (coefficient x²)',
            value: _a,
            color: BacPrepColors.primary,
            onChanged: (v) => setState(() {
              _a = v;
              _controller.forward(from: 0);
            }),
          ),
          _CoefficientSlider(
            label: 'b (coefficient x)',
            value: _b,
            color: BacPrepColors.warning,
            onChanged: (v) => setState(() {
              _b = v;
              _controller.forward(from: 0);
            }),
          ),
          _CoefficientSlider(
            label: 'c (constante)',
            value: _c,
            color: BacPrepColors.success,
            onChanged: (v) => setState(() {
              _c = v;
              _controller.forward(from: 0);
            }),
          ),
          const SizedBox(height: Spacing.sm),
          Wrap(
            spacing: Spacing.sm,
            children: [
              FilterChip(
                label: const Text('Factorisation'),
                selected: _showFactors,
                onSelected: (v) => setState(() => _showFactors = v),
              ),
              FilterChip(
                label: const Text('Zéros'),
                selected: _showZeros,
                onSelected: (v) => setState(() => _showZeros = v),
              ),
              FilterChip(
                label: const Text('Signe'),
                selected: _showSign,
                onSelected: (v) => setState(() => _showSign = v),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSignTable() {
    return Container(
      height: 180,
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
              size: const Size(double.infinity, 180),
              painter: _SignTablePainter(
                a: _a,
                b: _b,
                c: _c,
                zeros: _zeros,
                showSign: _showSign,
                animationValue: _animation.value,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildZeros() {
    if (!_showZeros || _zeros.isEmpty) return const SizedBox.shrink();

    final disc = _b * _b - 4 * _a * _c;
    String discResult;
    if (disc < 0) {
      discResult = 'Δ = ${disc.toStringAsFixed(0)} < 0: Pas de racine réelle';
    } else if (disc == 0) {
      discResult = 'Δ = 0: Une racine double x₀ = ${_formatVal(_zeros[0])}';
    } else {
      discResult = 'Δ = ${disc.toStringAsFixed(0)} > 0: Deux racines distinctes';
    }

    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.warning.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.warning.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Text(
            discResult,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: BacPrepColors.warning,
            ),
          ),
          if (_zeros.isNotEmpty) ...[
            const SizedBox(height: Spacing.sm),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (_zeros.length >= 1)
                  _ZeroChip(label: 'x₁ = ${_formatVal(_zeros[0])}', color: BacPrepColors.success),
                if (_zeros.length >= 2) ...[
                  const SizedBox(width: Spacing.md),
                  _ZeroChip(label: 'x₂ = ${_formatVal(_zeros[1])}', color: BacPrepColors.success),
                ],
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildAnswerInput() {
    String expectedSign;
    if (_zeros.isEmpty) {
      expectedSign = _a > 0 ? 'Positif pour tout x' : 'Négatif pour tout x';
    } else if (_zeros.length == 1) {
      expectedSign = _a > 0 ? 'Positif sauf en x₀' : 'Négatif sauf en x₀';
    } else {
      expectedSign = _a > 0 ? 'Signe de a: + sur ]x₁,x₂[, - ailleurs' : 'Signe de a: - sur ]x₁,x₂[, + ailleurs';
    }

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
            Flexible(
              child: Text(
                'Signe: $expectedSign',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: BacPrepColors.success,
                ),
              ),
            ),
          ],
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quel est le signe de f(x) ?',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            color: BacPrepColors.textSecondary,
          ),
        ),
        const SizedBox(height: Spacing.sm),
        TextField(
          controller: _answerController,
          decoration: InputDecoration(
            hintText: expectedSign,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
          style: const TextStyle(fontSize: 16),
          maxLines: 2,
          onSubmitted: (_) => _submit(),
        ),
      ],
    );
  }
}

class _CoefficientSlider extends StatelessWidget {
  final String label;
  final double value;
  final Color color;
  final ValueChanged<double> onChanged;

  const _CoefficientSlider({
    required this.label,
    required this.value,
    required this.color,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 150,
          child: Text(label, style: const TextStyle(fontSize: 14)),
        ),
        Expanded(
          child: Slider(
            value: value,
            min: -5,
            max: 5,
            divisions: 20,
            onChanged: onChanged,
          ),
        ),
        SizedBox(
          width: 50,
          child: Text(
            value.toStringAsFixed(0),
            style: TextStyle(fontWeight: FontWeight.w600, color: color),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

class _ZeroChip extends StatelessWidget {
  final String label;
  final Color color;

  const _ZeroChip({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.5)),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
  }
}

class _SignTablePainter extends CustomPainter {
  final double a, b, c;
  final List<double> zeros;
  final bool showSign;
  final double animationValue;

  _SignTablePainter({
    required this.a,
    required this.b,
    required this.c,
    required this.zeros,
    required this.showSign,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final leftPadding = 30.0;
    final rightPadding = 10.0;
    final topPadding = 30.0;
    final bottomPadding = 40.0;

    final tableWidth = size.width - leftPadding - rightPadding;
    final tableHeight = size.height - topPadding - bottomPadding;

    final linePaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 2;

    final axisPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1;

    canvas.drawLine(
      Offset(leftPadding, topPadding),
      Offset(size.width - rightPadding, topPadding),
      linePaint,
    );
    canvas.drawLine(
      Offset(leftPadding, topPadding),
      Offset(leftPadding, size.height - bottomPadding),
      linePaint,
    );
    canvas.drawLine(
      Offset(leftPadding, size.height - bottomPadding),
      Offset(size.width - rightPadding, size.height - bottomPadding),
      linePaint,
    );

    final rowHeight = tableHeight / 2;

    canvas.drawLine(
      Offset(leftPadding, topPadding + rowHeight),
      Offset(size.width - rightPadding, topPadding + rowHeight),
      axisPaint..strokeWidth = 1,
    );

    final xColWidth = tableWidth * 0.2;
    final factorColWidth = tableWidth * 0.4;
    final signColWidth = tableWidth * 0.4;

    canvas.drawLine(
      Offset(leftPadding + xColWidth, topPadding),
      Offset(leftPadding + xColWidth, size.height - bottomPadding),
      axisPaint,
    );
    canvas.drawLine(
      Offset(leftPadding + xColWidth + factorColWidth, topPadding),
      Offset(leftPadding + xColWidth + factorColWidth, size.height - bottomPadding),
      axisPaint,
    );

    final textPainter = TextPainter(textDirection: TextDirection.ltr);

    textPainter.text = TextSpan(
      text: 'x',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 12, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(leftPadding + xColWidth / 2 - textPainter.width / 2, topPadding + 5));

    textPainter.text = TextSpan(
      text: 'Signe',
      style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 12, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(leftPadding + xColWidth + factorColWidth + signColWidth / 2 - textPainter.width / 2, topPadding + 5));

    if (zeros.isEmpty) {
      textPainter.text = TextSpan(
        text: '∅',
        style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 10),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(leftPadding + xColWidth + 10, topPadding + rowHeight + 5));

      _drawSign(canvas, Offset(leftPadding + xColWidth + factorColWidth + signColWidth / 2, topPadding + rowHeight / 2 + 10), a > 0);
    } else if (zeros.length == 1) {
      textPainter.text = TextSpan(
        text: '-∞',
        style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 9),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(leftPadding + 5, topPadding + rowHeight + 5));

      textPainter.text = TextSpan(
        text: 'x₀=${zeros[0].toStringAsFixed(1)}',
        style: TextStyle(color: BacPrepColors.primary, fontSize: 10, fontWeight: FontWeight.w600),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(leftPadding + xColWidth / 2 - textPainter.width / 2, topPadding + rowHeight + 5));

      canvas.drawLine(
        Offset(leftPadding + xColWidth + factorColWidth / 2, topPadding),
        Offset(leftPadding + xColWidth + factorColWidth / 2, size.height - bottomPadding),
        axisPaint..color = BacPrepColors.primary,
      );

      _drawSign(canvas, Offset(leftPadding + xColWidth + factorColWidth / 4, topPadding + rowHeight / 2 + 10), a > 0);
      _drawSign(canvas, Offset(leftPadding + xColWidth + factorColWidth * 3 / 4, topPadding + rowHeight / 2 + 10), a > 0);
    } else {
      final sortedZeros = List<double>.from(zeros)..sort();
      final x1 = sortedZeros[0];
      final x2 = sortedZeros[1];

      textPainter.text = TextSpan(
        text: '-∞',
        style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 9),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(leftPadding + 5, topPadding + rowHeight + 5));

      textPainter.text = TextSpan(
        text: x1.toStringAsFixed(1),
        style: TextStyle(color: BacPrepColors.primary, fontSize: 10, fontWeight: FontWeight.w600),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(leftPadding + xColWidth / 2 - 15, topPadding + rowHeight + 5));

      textPainter.text = TextSpan(
        text: x2.toStringAsFixed(1),
        style: TextStyle(color: BacPrepColors.primary, fontSize: 10, fontWeight: FontWeight.w600),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(leftPadding + xColWidth / 2 + 10, topPadding + rowHeight + 5));

      textPainter.text = TextSpan(
        text: '+∞',
        style: TextStyle(color: BacPrepColors.textSecondary, fontSize: 9),
      );
      textPainter.layout();
      textPainter.paint(canvas, Offset(size.width - rightPadding - 20, topPadding + rowHeight + 5));

      final zero1X = leftPadding + xColWidth + factorColWidth / 3;
      final zero2X = leftPadding + xColWidth + factorColWidth * 2 / 3;

      canvas.drawLine(
        Offset(zero1X, topPadding),
        Offset(zero1X, size.height - bottomPadding),
        axisPaint..color = BacPrepColors.primary,
      );
      canvas.drawLine(
        Offset(zero2X, topPadding),
        Offset(zero2X, size.height - bottomPadding),
        axisPaint..color = BacPrepColors.primary,
      );

      _drawSign(canvas, Offset(leftPadding + xColWidth + factorColWidth / 6, topPadding + rowHeight / 2 + 10), a > 0);
      _drawSign(canvas, Offset(zero1X + (zero2X - zero1X) / 2, topPadding + rowHeight / 2 + 10), a < 0);
      _drawSign(canvas, Offset(leftPadding + xColWidth + factorColWidth * 5 / 6, topPadding + rowHeight / 2 + 10), a > 0);
    }
  }

  void _drawSign(Canvas canvas, Offset pos, bool positive) {
    final paint = Paint()
      ..color = positive ? BacPrepColors.success : BacPrepColors.error
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final path = Path();
    path.moveTo(pos.dx - 12, pos.dy + 8);
    path.lineTo(pos.dx, pos.dy - 8);
    path.lineTo(pos.dx + 12, pos.dy + 8);

    canvas.drawPath(path, paint..color = paint.color.withValues(alpha: animationValue));
  }

  @override
  bool shouldRepaint(covariant _SignTablePainter oldDelegate) {
    return a != oldDelegate.a ||
        b != oldDelegate.b ||
        c != oldDelegate.c ||
        zeros != oldDelegate.zeros ||
        showSign != oldDelegate.showSign ||
        animationValue != oldDelegate.animationValue;
  }
}

double _sqrtApprox(double value) {
  if (value <= 0) return 0;
  double x = value;
  double y = (x + 1) / 2;
  while (y < x) {
    x = y;
    y = (x + value / x) / 2;
  }
  return x;
}

extension on double {
  double sqrt() => this >= 0 ? _sqrtApprox(this) : 0;
}
