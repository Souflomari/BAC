import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// Acid-base titration simulator.
///
/// Models the titration of an acid (strong HCl or weak HA with pKa) by a
/// strong base (NaOH). Shows a live burette + beaker + indicator color +
/// pH=f(V) curve with the equivalence point marked.
class TitrationSimulatorWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const TitrationSimulatorWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<TitrationSimulatorWidget> createState() => _TitrationSimulatorWidgetState();
}

class _TitrationSimulatorWidgetState extends State<TitrationSimulatorWidget>
    with SingleTickerProviderStateMixin {
  // Acid in beaker
  double _ca = 0.10;        // mol/L
  double _va = 20.0;        // mL
  double _pKa = 4.75;       // CH3COOH default
  bool _isStrongAcid = false;

  // Base in burette
  double _cb = 0.10;        // mol/L

  // State
  double _vCurrent = 0.0;   // mL of base added
  late AnimationController _controller;

  // Display toggles
  bool _showIndicator = true;
  String _indicator = 'phenolphthalein'; // or 'methyl_orange', 'bbt'

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 12),
      vsync: this,
    );
    _controller.addListener(() {
      setState(() {
        _vCurrent = _controller.value * _vMax;
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _answerController.dispose();
    super.dispose();
  }

  double get _vEq => _ca * _va / _cb; // mL
  double get _vMax => math.max(_vEq * 2, _vEq + 10); // plot range

  /// pH as a function of base volume V (mL added).
  double _ph(double v) {
    final na0 = _ca * _va * 1e-3;       // mol acid initially
    final nb = _cb * v * 1e-3;          // mol base added
    final vTot = (_va + v) * 1e-3;      // L total

    if (_isStrongAcid) {
      if (v < _vEq) {
        // Excess acid: pH = -log([H+]) where [H+] = (na0 - nb)/vTot
        final h = (na0 - nb) / vTot;
        return -_log10(math.max(h, 1e-14));
      } else if ((v - _vEq).abs() < 1e-9) {
        return 7.0;
      } else {
        // Excess base: pOH = -log([OH-]); pH = 14 - pOH
        final oh = (nb - na0) / vTot;
        return 14 + _log10(math.max(oh, 1e-14));
      }
    } else {
      // Weak acid
      if (v <= 0) {
        // Initial pH from Ca's equilibrium (approx ignoring water): pH = ½(pKa - log Ca)
        return 0.5 * (_pKa - _log10(_ca));
      }
      if (v < _vEq) {
        // Buffer region: pH = pKa + log(nA-/nHA) where nA- = nb, nHA = na0 - nb
        // Avoid log(0) at the boundaries.
        final nHA = math.max(na0 - nb, 1e-12);
        final nAm = math.max(nb, 1e-12);
        return _pKa + _log10(nAm / nHA);
      } else if ((v - _vEq).abs() < 1e-6) {
        // At equivalence: salt of weak acid in water; pH from Kb of A-.
        // [A-] ≈ na0 / vTot ; pOH = ½(pKb - log [A-]) ; pKb = 14 - pKa
        final aMinus = na0 / vTot;
        final pKb = 14 - _pKa;
        final pOH = 0.5 * (pKb - _log10(aMinus));
        return 14 - pOH;
      } else {
        // Past equivalence: dominated by excess strong base.
        final oh = (nb - na0) / vTot;
        return 14 + _log10(math.max(oh, 1e-14));
      }
    }
  }

  static double _log10(double x) => math.log(x) / math.ln10;

  void _toggleDrip() {
    setState(() {
      if (_controller.isAnimating) {
        _controller.stop();
      } else {
        if (_controller.value >= 1.0) {
          _controller.reset();
          _vCurrent = 0;
        }
        _controller.forward();
      }
    });
  }

  void _reset() {
    _controller.reset();
    setState(() {
      _vCurrent = 0;
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
      padding: const EdgeInsets.all(Spacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (widget.item.stem.isNotEmpty) ...[
            RichTextRenderer(
              text: widget.item.stem,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    fontSize: 16,
                    height: 1.5,
                  ),
            ),
            const SizedBox(height: Spacing.sm),
          ],
          FigureWidget(figure: widget.item.questionFigure),
          _buildApparatus(),
          const SizedBox(height: Spacing.md),
          _buildGraph(),
          const SizedBox(height: Spacing.md),
          _buildControls(),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildDataDisplay(),
          const SizedBox(height: Spacing.md),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildApparatus() {
    final ph = _ph(_vCurrent);
    return Container(
      height: 220,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 220),
          painter: _ApparatusPainter(
            vCurrent: _vCurrent,
            vMax: _vMax,
            ph: ph,
            beakerColor: _showIndicator
                ? _indicatorColor(ph, _indicator)
                : BacPrepColors.surfaceVariant,
            isPouring: _controller.isAnimating,
          ),
        ),
      ),
    );
  }

  Widget _buildGraph() {
    return Container(
      height: 220,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: CustomPaint(
          size: const Size(double.infinity, 220),
          painter: _CurvePainter(
            ph: _ph,
            vCurrent: _vCurrent,
            vMax: _vMax,
            vEq: _vEq,
            phEq: _ph(_vEq),
            indicator: _showIndicator ? _indicator : null,
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
          icon: Icon(_controller.isAnimating ? Icons.pause : Icons.play_arrow),
          iconSize: 36,
          onPressed: _toggleDrip,
          style: IconButton.styleFrom(
            backgroundColor: BacPrepColors.physics,
            foregroundColor: Colors.white,
          ),
        ),
        const SizedBox(width: Spacing.md),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: BacPrepColors.accent.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            'V_éq = ${_vEq.toStringAsFixed(1)} mL',
            style: const TextStyle(
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
          Row(
            children: [
              Text(
                'Acide dans le bécher',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: BacPrepColors.textSecondary,
                    ),
              ),
              const Spacer(),
              SegmentedButton<bool>(
                segments: const [
                  ButtonSegment(value: true, label: Text('Fort')),
                  ButtonSegment(value: false, label: Text('Faible')),
                ],
                selected: {_isStrongAcid},
                onSelectionChanged: (s) => setState(() {
                  _isStrongAcid = s.first;
                  _reset();
                }),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          _Slider(
            label: 'Cₐ (mol/L)',
            value: _ca,
            min: 0.01,
            max: 1.0,
            divisions: 99,
            display: _ca.toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _ca = v;
              _reset();
            }),
          ),
          _Slider(
            label: 'Vₐ (mL)',
            value: _va,
            min: 5,
            max: 50,
            divisions: 45,
            display: _va.toStringAsFixed(0),
            onChanged: (v) => setState(() {
              _va = v;
              _reset();
            }),
          ),
          if (!_isStrongAcid)
            _Slider(
              label: 'pKₐ',
              value: _pKa,
              min: 1,
              max: 10,
              divisions: 90,
              display: _pKa.toStringAsFixed(2),
              onChanged: (v) => setState(() {
                _pKa = v;
                _reset();
              }),
            ),
          const Divider(height: Spacing.md),
          Text(
            'Base titrante (NaOH)',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: BacPrepColors.textSecondary,
                ),
          ),
          const SizedBox(height: Spacing.sm),
          _Slider(
            label: 'C_b (mol/L)',
            value: _cb,
            min: 0.01,
            max: 1.0,
            divisions: 99,
            display: _cb.toStringAsFixed(2),
            onChanged: (v) => setState(() {
              _cb = v;
              _reset();
            }),
          ),
          const Divider(height: Spacing.md),
          Row(
            children: [
              Text(
                'Indicateur',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: BacPrepColors.textSecondary,
                    ),
              ),
              const SizedBox(width: Spacing.sm),
              Switch(
                value: _showIndicator,
                onChanged: (v) => setState(() => _showIndicator = v),
              ),
              const SizedBox(width: Spacing.sm),
              if (_showIndicator)
                Expanded(
                  child: DropdownButton<String>(
                    isExpanded: true,
                    value: _indicator,
                    items: const [
                      DropdownMenuItem(value: 'methyl_orange', child: Text('Hélianthine (3.1–4.4)')),
                      DropdownMenuItem(value: 'bbt', child: Text('B.B.T. (6.0–7.6)')),
                      DropdownMenuItem(value: 'phenolphthalein', child: Text('Phénolphtaléine (8.2–10.0)')),
                    ],
                    onChanged: (v) => setState(() => _indicator = v ?? _indicator),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay() {
    final ph = _ph(_vCurrent);
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.physics.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.physics.withValues(alpha: 0.2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _DataItem(
            label: 'V',
            value: '${_vCurrent.toStringAsFixed(1)} mL',
            color: BacPrepColors.physics,
          ),
          _DataItem(
            label: 'pH',
            value: ph.toStringAsFixed(2),
            color: _phColor(ph),
          ),
          _DataItem(
            label: 'V/V_éq',
            value: (_vEq > 0 ? (_vCurrent / _vEq) : 0).toStringAsFixed(2),
            color: BacPrepColors.accent,
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
              'V_éq attendu : ${_vEq.toStringAsFixed(1)} mL',
              style: const TextStyle(
                fontSize: 16,
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
              hintText: 'V_éq (mL)',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 18),
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

  /// Indicator color in the beaker — shows the qualitative color change at the
  /// indicator's transition zone.
  Color _indicatorColor(double ph, String which) {
    switch (which) {
      case 'methyl_orange':
        // red <3.1 ; orange 3.1..4.4 ; yellow >4.4
        if (ph < 3.1) return const Color(0xFFD32F2F);
        if (ph < 4.4) {
          final t = (ph - 3.1) / (4.4 - 3.1);
          return Color.lerp(const Color(0xFFD32F2F), const Color(0xFFFFC107), t)!;
        }
        return const Color(0xFFFFC107);
      case 'bbt':
        // yellow <6.0 ; green 6.0..7.6 ; blue >7.6
        if (ph < 6.0) return const Color(0xFFFFEB3B);
        if (ph < 7.6) {
          final t = (ph - 6.0) / (7.6 - 6.0);
          return Color.lerp(const Color(0xFFFFEB3B), const Color(0xFF1976D2), t)!;
        }
        return const Color(0xFF1976D2);
      case 'phenolphthalein':
      default:
        // colorless <8.2 ; pink 8.2..10 ; magenta >10
        if (ph < 8.2) return BacPrepColors.surfaceVariant;
        if (ph < 10.0) {
          final t = (ph - 8.2) / (10.0 - 8.2);
          return Color.lerp(BacPrepColors.surfaceVariant, const Color(0xFFE91E63), t)!;
        }
        return const Color(0xFFC2185B);
    }
  }

  Color _phColor(double ph) {
    // Generic universal-indicator-ish coloring of the pH numeral.
    if (ph < 4) return const Color(0xFFD32F2F);
    if (ph < 7) return const Color(0xFFF57C00);
    if (ph < 8) return const Color(0xFF388E3C);
    if (ph < 11) return const Color(0xFF1976D2);
    return const Color(0xFF6A1B9A);
  }
}

class _Slider extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final int divisions;
  final String display;
  final ValueChanged<double> onChanged;

  const _Slider({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.divisions,
    required this.display,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 100,
          child: Text(label, style: const TextStyle(fontSize: 13)),
        ),
        Expanded(
          child: Slider(
            value: value,
            min: min,
            max: max,
            divisions: divisions,
            onChanged: onChanged,
          ),
        ),
        SizedBox(
          width: 56,
          child: Text(
            display,
            style: const TextStyle(fontWeight: FontWeight.w600),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

class _DataItem extends StatelessWidget {
  final String label;
  final String value;
  final Color color;

  const _DataItem({required this.label, required this.value, required this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, color: BacPrepColors.textSecondary)),
        Text(
          value,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: color),
        ),
      ],
    );
  }
}

class _ApparatusPainter extends CustomPainter {
  final double vCurrent;
  final double vMax;
  final double ph;
  final Color beakerColor;
  final bool isPouring;

  _ApparatusPainter({
    required this.vCurrent,
    required this.vMax,
    required this.ph,
    required this.beakerColor,
    required this.isPouring,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width / 2;

    // Burette
    const buretteTop = 10.0;
    final buretteBottom = size.height * 0.55;
    const buretteWidth = 14.0;
    final glass = Paint()
      ..color = BacPrepColors.locked.withValues(alpha: 0.5)
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke;
    canvas.drawRect(
      Rect.fromLTWH(centerX - buretteWidth / 2, buretteTop, buretteWidth, buretteBottom - buretteTop),
      glass,
    );
    // Liquid in burette: starts full, decreases proportionally to vCurrent / vMax
    final fillFrac = (1 - vCurrent / vMax).clamp(0.0, 1.0);
    final liquidH = (buretteBottom - buretteTop - 4) * fillFrac;
    final fillPaint = Paint()..color = const Color(0xFF8AB6D6).withValues(alpha: 0.7);
    canvas.drawRect(
      Rect.fromLTWH(
        centerX - buretteWidth / 2 + 1,
        buretteBottom - 2 - liquidH,
        buretteWidth - 2,
        liquidH,
      ),
      fillPaint,
    );
    // Tap
    canvas.drawRect(
      Rect.fromLTWH(centerX - 10, buretteBottom, 20, 5),
      Paint()..color = BacPrepColors.textSecondary,
    );

    // Drip
    if (isPouring) {
      final dripPaint = Paint()..color = const Color(0xFF8AB6D6);
      canvas.drawCircle(Offset(centerX, buretteBottom + 14), 2.2, dripPaint);
      canvas.drawCircle(Offset(centerX, buretteBottom + 24), 1.8, dripPaint);
    }

    // Beaker
    final beakerY = size.height * 0.62;
    final beakerH = size.height - beakerY - 8;
    final beakerW = size.width * 0.48;
    final beakerLeft = centerX - beakerW / 2;
    final beakerRect = Rect.fromLTWH(beakerLeft, beakerY, beakerW, beakerH);

    // Liquid in beaker
    final liquidPaint = Paint()..color = beakerColor;
    final liquidRect = Rect.fromLTWH(
      beakerLeft + 2,
      beakerY + beakerH * 0.15,
      beakerW - 4,
      beakerH * 0.85 - 2,
    );
    canvas.drawRect(liquidRect, liquidPaint);

    // Beaker outline
    final beakerPaint = Paint()
      ..color = BacPrepColors.textSecondary
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;
    canvas.drawRect(beakerRect, beakerPaint);

    // pH label below beaker
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: 'pH = ${ph.toStringAsFixed(2)}',
      style: const TextStyle(
        color: BacPrepColors.textPrimary,
        fontSize: 13,
        fontWeight: FontWeight.bold,
      ),
    );
    tp.layout();
    tp.paint(canvas, Offset(centerX - tp.width / 2, beakerY - 18));
  }

  @override
  bool shouldRepaint(covariant _ApparatusPainter oldDelegate) =>
      oldDelegate.vCurrent != vCurrent ||
      oldDelegate.ph != ph ||
      oldDelegate.beakerColor != beakerColor ||
      oldDelegate.isPouring != isPouring;
}

class _CurvePainter extends CustomPainter {
  final double Function(double v) ph;
  final double vCurrent;
  final double vMax;
  final double vEq;
  final double phEq;
  final String? indicator;

  _CurvePainter({
    required this.ph,
    required this.vCurrent,
    required this.vMax,
    required this.vEq,
    required this.phEq,
    required this.indicator,
  });

  @override
  void paint(Canvas canvas, Size size) {
    const left = 36.0;
    const right = 10.0;
    const top = 10.0;
    const bottom = 26.0;
    final w = size.width - left - right;
    final h = size.height - top - bottom;

    double xOf(double v) => left + (v / vMax) * w;
    double yOf(double p) => top + (1 - p / 14) * h;

    final axis = Paint()
      ..color = BacPrepColors.textSecondary
      ..strokeWidth = 1.2;
    canvas.drawLine(const Offset(left, top), Offset(left, top + h), axis);
    canvas.drawLine(Offset(left, top + h), Offset(left + w, top + h), axis);

    // Y axis labels (pH 0, 7, 14)
    final tp = TextPainter(textDirection: TextDirection.ltr);
    void drawText(String s, Offset o, {double size = 9, Color? c}) {
      tp.text = TextSpan(text: s, style: TextStyle(fontSize: size, color: c ?? BacPrepColors.textSecondary));
      tp.layout();
      tp.paint(canvas, o);
    }

    for (final p in [0, 7, 14]) {
      drawText('$p', Offset(8, yOf(p.toDouble()) - 6));
      final dash = Paint()
        ..color = BacPrepColors.locked.withValues(alpha: 0.5)
        ..strokeWidth = 0.6;
      canvas.drawLine(Offset(left, yOf(p.toDouble())), Offset(left + w, yOf(p.toDouble())), dash);
    }

    // Indicator zone shading
    if (indicator != null) {
      final zone = _indicatorZone(indicator!);
      if (zone != null) {
        final fill = Paint()..color = BacPrepColors.accent.withValues(alpha: 0.12);
        canvas.drawRect(
          Rect.fromLTRB(left, yOf(zone.$2), left + w, yOf(zone.$1)),
          fill,
        );
      }
    }

    // pH curve
    final curve = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 2.4
      ..style = PaintingStyle.stroke;
    final path = Path();
    bool started = false;
    for (double v = 0; v <= vMax; v += vMax / 200) {
      final p = ph(v);
      final x = xOf(v);
      final y = yOf(p.clamp(0, 14));
      if (!started) {
        path.moveTo(x, y);
        started = true;
      } else {
        path.lineTo(x, y);
      }
    }
    canvas.drawPath(path, curve);

    // Equivalence point marker
    final eqPaint = Paint()
      ..color = BacPrepColors.error
      ..strokeWidth = 1.2
      ..style = PaintingStyle.stroke;
    final dashed = _dashPath(
      Path()
        ..moveTo(xOf(vEq), top)
        ..lineTo(xOf(vEq), top + h),
      4,
      3,
    );
    canvas.drawPath(dashed, eqPaint);

    final eqDot = Paint()..color = BacPrepColors.error;
    canvas.drawCircle(Offset(xOf(vEq), yOf(phEq)), 4, eqDot);
    drawText('V_éq', Offset(xOf(vEq) - 12, top + h + 4), c: BacPrepColors.error, size: 10);

    // Current cursor
    final cursorPaint = Paint()
      ..color = BacPrepColors.success
      ..strokeWidth = 2;
    canvas.drawLine(
      Offset(xOf(vCurrent), top),
      Offset(xOf(vCurrent), top + h),
      cursorPaint,
    );
    canvas.drawCircle(Offset(xOf(vCurrent), yOf(ph(vCurrent).clamp(0, 14))), 4, Paint()..color = BacPrepColors.success);

    // X axis label
    drawText('V (mL)', Offset(left + w - 32, top + h + 10));
    drawText('pH', const Offset(left + 4, top - 2));
  }

  /// Returns the (low, high) pH bounds of the named indicator's transition zone.
  (double, double)? _indicatorZone(String name) {
    switch (name) {
      case 'methyl_orange':
        return (3.1, 4.4);
      case 'bbt':
        return (6.0, 7.6);
      case 'phenolphthalein':
        return (8.2, 10.0);
    }
    return null;
  }

  Path _dashPath(Path source, double on, double off) {
    final out = Path();
    for (final metric in source.computeMetrics()) {
      double d = 0;
      while (d < metric.length) {
        final next = math.min(d + on, metric.length);
        out.addPath(metric.extractPath(d, next), Offset.zero);
        d = next + off;
      }
    }
    return out;
  }

  @override
  bool shouldRepaint(covariant _CurvePainter oldDelegate) =>
      oldDelegate.vCurrent != vCurrent ||
      oldDelegate.vEq != vEq ||
      oldDelegate.phEq != phEq ||
      oldDelegate.vMax != vMax ||
      oldDelegate.indicator != indicator;
}
