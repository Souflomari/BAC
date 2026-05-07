import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// AM modulation visualizer: porteuse + modulant + signal AM.
///
/// s(t) = (A_c + A_m · cos(2π f_m t)) · cos(2π f_c t).
/// The modulation index m = A_m / A_c. The widget renders three stacked
/// waveforms with annotated envelope dashed lines. Distortion (over-modulation)
/// is highlighted when m > 1.
class AmModulationWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const AmModulationWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<AmModulationWidget> createState() => _State();
}

class _State extends State<AmModulationWidget> {
  double _ac = 1.0;
  double _am = 0.5;
  double _fc = 50.0; // Hz, normalized for display
  double _fm = 5.0;  // Hz

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  double get _m => _am / _ac;

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
    final overMod = _m > 1.001;
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
          _buildStacked(),
          const SizedBox(height: Spacing.sm),
          if (overMod)
            Container(
              padding: const EdgeInsets.all(Spacing.sm),
              decoration: BoxDecoration(
                color: BacPrepColors.error.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text(
                'Surmodulation : m > 1, le signal AM est déformé.',
                style: TextStyle(fontSize: 12, color: BacPrepColors.error, fontWeight: FontWeight.w600),
                textAlign: TextAlign.center,
              ),
            ),
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

  Widget _buildStacked() {
    return Container(
      height: 280,
      padding: const EdgeInsets.all(Spacing.sm),
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: CustomPaint(
        size: const Size(double.infinity, 264),
        painter: _StackedPainter(ac: _ac, am: _am, fc: _fc, fm: _fm),
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
        children: [
          _S(
            label: 'A_c',
            value: _ac,
            min: 0.5,
            max: 2.0,
            divisions: 30,
            display: _ac.toStringAsFixed(2),
            onChanged: (v) => setState(() => _ac = v),
          ),
          _S(
            label: 'A_m',
            value: _am,
            min: 0.0,
            max: 2.0,
            divisions: 40,
            display: _am.toStringAsFixed(2),
            onChanged: (v) => setState(() => _am = v),
          ),
          _S(
            label: 'f_c (Hz)',
            value: _fc,
            min: 20,
            max: 100,
            divisions: 80,
            display: _fc.toStringAsFixed(0),
            onChanged: (v) => setState(() => _fc = v),
          ),
          _S(
            label: 'f_m (Hz)',
            value: _fm,
            min: 1,
            max: 20,
            divisions: 38,
            display: _fm.toStringAsFixed(1),
            onChanged: (v) => setState(() => _fm = v),
          ),
        ],
      ),
    );
  }

  Widget _buildDataDisplay() {
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
          _D(label: 'm (= A_m/A_c)', value: _m.toStringAsFixed(2), color: BacPrepColors.physics),
          _D(label: 'fc/fm', value: (_fc / _fm).toStringAsFixed(1), color: BacPrepColors.success),
          _D(label: 'État', value: _m > 1.001 ? 'sur-mod.' : 'OK', color: _m > 1.001 ? BacPrepColors.error : BacPrepColors.accent),
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
              'm = ${_m.toStringAsFixed(2)}',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: BacPrepColors.success),
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
              hintText: 'Indice de modulation m',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
            onSubmitted: (_) => _submit(),
          ),
        ),
        const SizedBox(width: Spacing.md),
        ElevatedButton(onPressed: _submit, child: const Text('Valider')),
      ],
    );
  }
}

class _S extends StatelessWidget {
  final String label;
  final double value;
  final double min;
  final double max;
  final int divisions;
  final String display;
  final ValueChanged<double> onChanged;
  const _S({
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
        SizedBox(width: 70, child: Text(label, style: const TextStyle(fontSize: 13))),
        Expanded(child: Slider(value: value, min: min, max: max, divisions: divisions, onChanged: onChanged)),
        SizedBox(width: 56, child: Text(display, style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
      ],
    );
  }
}

class _D extends StatelessWidget {
  final String label;
  final String value;
  final Color color;
  const _D({required this.label, required this.value, required this.color});
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, color: BacPrepColors.textSecondary)),
        Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color)),
      ],
    );
  }
}

class _StackedPainter extends CustomPainter {
  final double ac;
  final double am;
  final double fc;
  final double fm;

  _StackedPainter({required this.ac, required this.am, required this.fc, required this.fm});

  @override
  void paint(Canvas canvas, Size size) {
    const titles = ['Modulant s_m(t) = A_m·cos(2π·f_m·t)', 'Porteuse s_c(t) = A_c·cos(2π·f_c·t)', 'AM : (A_c + s_m)·cos(2π·f_c·t)'];
    const lanes = 3;
    final laneH = size.height / lanes;
    final tDur = 2 / fm; // show 2 modulating periods

    final tp = TextPainter(textDirection: TextDirection.ltr);
    void label(String s, Offset o, {Color? c}) {
      tp.text = TextSpan(text: s, style: TextStyle(fontSize: 10, color: c ?? BacPrepColors.textSecondary));
      tp.layout();
      tp.paint(canvas, o);
    }

    for (var lane = 0; lane < lanes; lane++) {
      final yMid = laneH * (lane + 0.5);
      final yMax = laneH * lane + 4;
      final yMin = laneH * (lane + 1) - 4;
      final amp = (yMin - yMax) / 2;

      // Axis
      canvas.drawLine(
        Offset(8, yMid),
        Offset(size.width - 6, yMid),
        Paint()..color = BacPrepColors.locked.withValues(alpha: 0.6)..strokeWidth = 0.8,
      );

      label(titles[lane], Offset(8, laneH * lane + 2), c: BacPrepColors.physics);

      final paint = Paint()
        ..color = BacPrepColors.physics
        ..strokeWidth = 1.6
        ..style = PaintingStyle.stroke;

      final path = Path();
      const samples = 400;
      for (var i = 0; i <= samples; i++) {
        final t = tDur * i / samples;
        double v;
        switch (lane) {
          case 0:
            v = am * math.cos(2 * math.pi * fm * t) / 2;
            break;
          case 1:
            v = ac * math.cos(2 * math.pi * fc * t) / 2;
            break;
          default:
            v = (ac + am * math.cos(2 * math.pi * fm * t)) * math.cos(2 * math.pi * fc * t) / (ac + am).clamp(0.01, 4);
            break;
        }
        final px = 8 + (size.width - 14) * i / samples;
        final py = yMid - v * amp * 0.9;
        if (i == 0) {
          path.moveTo(px, py);
        } else {
          path.lineTo(px, py);
        }
      }
      canvas.drawPath(path, paint);

      // Envelope on lane 2
      if (lane == 2) {
        final envPaint = Paint()
          ..color = BacPrepColors.error
          ..strokeWidth = 1.0
          ..style = PaintingStyle.stroke;
        final envPos = Path();
        final envNeg = Path();
        for (var i = 0; i <= samples; i++) {
          final t = tDur * i / samples;
          final env = (ac + am * math.cos(2 * math.pi * fm * t)) / (ac + am).clamp(0.01, 4);
          final px = 8 + (size.width - 14) * i / samples;
          final pyP = yMid - env * amp * 0.9;
          final pyN = yMid + env * amp * 0.9;
          if (i == 0) {
            envPos.moveTo(px, pyP);
            envNeg.moveTo(px, pyN);
          } else {
            envPos.lineTo(px, pyP);
            envNeg.lineTo(px, pyN);
          }
        }
        canvas.drawPath(envPos, envPaint);
        canvas.drawPath(envNeg, envPaint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant _StackedPainter oldDelegate) =>
      oldDelegate.ac != ac || oldDelegate.am != am || oldDelegate.fc != fc || oldDelegate.fm != fm;
}
