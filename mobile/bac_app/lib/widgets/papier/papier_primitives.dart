import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Papier shared primitives — the visual vocabulary of the cahier:
/// PaperGrain, DoubleRule, Fleuron, Folio, FootMark, StreakRing,
/// Masthead, ToCRow, ChapterHead, SmallCaps, Stamp.

// ─── PaperGrain ─────────────────────────────────────────────
// Subtle multiplicative noise overlay to fake fibre texture.
// Cheaper than an SVG filter; applied via CustomPainter.
class PaperGrain extends StatelessWidget {
  final double opacity;
  final int seed;
  const PaperGrain({super.key, this.opacity = 0.18, this.seed = 7});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Opacity(
        opacity: opacity,
        child: CustomPaint(
          painter: _GrainPainter(seed: seed),
          child: const SizedBox.expand(),
        ),
      ),
    );
  }
}

class _GrainPainter extends CustomPainter {
  final int seed;
  _GrainPainter({required this.seed});

  @override
  void paint(Canvas canvas, Size size) {
    final rnd = math.Random(seed);
    final paint = Paint()..blendMode = BlendMode.multiply;
    // Sparse noise grid — fast enough for a static decorative layer
    const cell = 2.5;
    for (double y = 0; y < size.height; y += cell) {
      for (double x = 0; x < size.width; x += cell) {
        final v = rnd.nextDouble();
        // Bias toward darker speckles (only ~20% of cells get a dot)
        if (v < 0.2) {
          final intensity = (0.5 + rnd.nextDouble() * 0.5);
          paint.color = const Color(0xFF1F1B14).withValues(alpha: intensity * 0.5);
          canvas.drawCircle(Offset(x, y), 0.6, paint);
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant _GrainPainter oldDelegate) => oldDelegate.seed != seed;
}

// ─── DoubleRule ─────────────────────────────────────────────
// Thick + thin horizontal divider, the signature Papier separator.
class DoubleRule extends StatelessWidget {
  final double topThickness;
  final double gap;
  final double bottomThickness;
  final Color color;
  const DoubleRule({
    super.key,
    this.topThickness = 2,
    this.gap = 2,
    this.bottomThickness = 1,
    this.color = Papier.ink,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: topThickness + gap + bottomThickness,
      child: Stack(
        children: [
          Positioned(top: 0, left: 0, right: 0, height: topThickness, child: Container(color: color)),
          Positioned(bottom: 0, left: 0, right: 0, height: bottomThickness, child: Container(color: color)),
        ],
      ),
    );
  }
}

// ─── Fleuron ────────────────────────────────────────────────
// Decorative typographic ornament between thin rules.
class Fleuron extends StatelessWidget {
  final double size;
  final Color color;
  final EdgeInsets padding;
  const Fleuron({
    super.key,
    this.size = 18,
    this.color = Papier.ink2,
    this.padding = const EdgeInsets.symmetric(vertical: 10),
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Row(
        children: [
          Expanded(child: Container(height: 1, color: Papier.line)),
          const SizedBox(width: 12),
          CustomPaint(
            size: Size(size, size * 0.6),
            painter: _FleuronPainter(color: color, fillColor: Papier.bg),
          ),
          const SizedBox(width: 12),
          Expanded(child: Container(height: 1, color: Papier.line)),
        ],
      ),
    );
  }
}

class _FleuronPainter extends CustomPainter {
  final Color color;
  final Color fillColor;
  _FleuronPainter({required this.color, required this.fillColor});

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final paint = Paint()..color = color..style = PaintingStyle.fill;

    // Central diamond/leaf shape — scaled from the SVG path in papier-prims.jsx
    final path = Path()
      ..moveTo(w * 0.5, h * 0.111)
      ..quadraticBezierTo(w * 0.6, h * 0.333, w * 0.733, h * 0.333)
      ..quadraticBezierTo(w * 0.633, h * 0.444, w * 0.733, h * 0.667)
      ..quadraticBezierTo(w * 0.6, h * 0.667, w * 0.5, h * 0.889)
      ..quadraticBezierTo(w * 0.4, h * 0.667, w * 0.267, h * 0.667)
      ..quadraticBezierTo(w * 0.367, h * 0.444, w * 0.267, h * 0.333)
      ..quadraticBezierTo(w * 0.4, h * 0.333, w * 0.5, h * 0.111)
      ..close();
    canvas.drawPath(path, paint);

    // Hollow center
    final center = Paint()..color = fillColor;
    canvas.drawCircle(Offset(w * 0.5, h * 0.5), w * 0.043, center);

    // Side dots
    canvas.drawCircle(Offset(w * 0.067, h * 0.5), w * 0.033, paint);
    canvas.drawCircle(Offset(w * 0.933, h * 0.5), w * 0.033, paint);
  }

  @override
  bool shouldRepaint(covariant _FleuronPainter oldDelegate) =>
      oldDelegate.color != color || oldDelegate.fillColor != fillColor;
}

// ─── SmallCaps ──────────────────────────────────────────────
// Eyebrow label — wide-tracked uppercase Garamond.
class SmallCaps extends StatelessWidget {
  final String text;
  final Color color;
  final double fontSize;
  final FontWeight fontWeight;
  final TextAlign textAlign;
  const SmallCaps(
    this.text, {
    super.key,
    this.color = Papier.ink3,
    this.fontSize = 10,
    this.fontWeight = FontWeight.w400,
    this.textAlign = TextAlign.start,
  });

  @override
  Widget build(BuildContext context) {
    return Text(
      text.toUpperCase(),
      textAlign: textAlign,
      style: PapierType.smallCaps(
        fontSize: fontSize,
        color: color,
        fontWeight: fontWeight,
      ),
    );
  }
}

// ─── Folio ──────────────────────────────────────────────────
// Page number-style label: italic numeral + thin rule + small-caps text.
class Folio extends StatelessWidget {
  final String number;
  final String label;
  final bool reverse;
  const Folio({
    super.key,
    required this.number,
    required this.label,
    this.reverse = false,
  });

  @override
  Widget build(BuildContext context) {
    final children = [
      Text(number, style: PapierType.italic(fontSize: 14, color: Papier.ink2)),
      const SizedBox(width: 8),
      Container(width: 18, height: 1, color: Papier.ink3),
      const SizedBox(width: 8),
      SmallCaps(label, color: Papier.ink3),
    ];
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: reverse ? children.reversed.toList() : children,
    );
  }
}

// ─── FootMark ───────────────────────────────────────────────
// Footnote dagger / asterism marker (†, ‡, *, ✎...).
class FootMark extends StatelessWidget {
  final String mark;
  final Color color;
  final double fontSize;
  const FootMark({
    super.key,
    this.mark = '†',
    this.color = Papier.red,
    this.fontSize = 10,
  });

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: const Offset(1, -3),
      child: Text(
        mark,
        style: PapierType.serif(
          fontSize: fontSize,
          color: color,
          height: 1.0,
        ),
      ),
    );
  }
}

// ─── StreakRing ─────────────────────────────────────────────
// Day-of-week dots — filled circle for completed, hollow with center
// dot for "today", outlined for not-yet.
class StreakRing extends StatelessWidget {
  final List<String> days;
  final List<bool> done;
  final int today;
  final Color color;
  const StreakRing({
    super.key,
    this.days = const ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    required this.done,
    required this.today,
    this.color = Papier.red,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(days.length, (i) {
        final isDone = i < done.length ? done[i] : false;
        final isToday = i == today;
        return Padding(
          padding: const EdgeInsets.only(right: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                days[i],
                style: PapierType.mono(
                  fontSize: 8,
                  color: isToday ? color : Papier.ink3,
                  fontWeight: isToday ? FontWeight.w600 : FontWeight.w400,
                ),
              ),
              const SizedBox(height: 4),
              Container(
                width: 18,
                height: 18,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isDone ? color : Colors.transparent,
                  border: Border.all(color: isDone ? color : Papier.line2, width: 1.2),
                ),
                child: Center(
                  child: isDone
                      ? const Icon(Icons.check, size: 11, color: Papier.bg)
                      : isToday
                          ? Container(
                              width: 5,
                              height: 5,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: color,
                              ),
                            )
                          : null,
                ),
              ),
            ],
          ),
        );
      }),
    );
  }
}

// ─── Masthead ───────────────────────────────────────────────
// Slim newspaper-style header: top eyebrows + italic title + jour count.
class Masthead extends StatelessWidget {
  final String issueLine;     // e.g. "N° 47 · LUN 21 AVR"
  final String volumeLine;    // e.g. "VOL. IV · SM-B"
  final String title;         // e.g. "Le Cahier"
  final String? rightLabel;   // e.g. "jour 12"
  final EdgeInsets padding;
  const Masthead({
    super.key,
    required this.issueLine,
    required this.volumeLine,
    required this.title,
    this.rightLabel,
    this.padding = const EdgeInsets.fromLTRB(22, 16, 22, 10),
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(issueLine.toUpperCase(),
                  style: PapierType.mono(
                    fontSize: 8.5,
                    color: Papier.ink3,
                    letterSpacing: 0.28 * 8.5,
                  )),
              Text(volumeLine.toUpperCase(),
                  style: PapierType.mono(
                    fontSize: 8.5,
                    color: Papier.ink3,
                    letterSpacing: 0.28 * 8.5,
                  )),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                title,
                style: PapierType.italic(
                  fontSize: 34,
                  fontWeight: FontWeight.w500,
                  letterSpacing: -0.85,
                  height: 1.0,
                ),
              ),
              const SizedBox(width: 14),
              Expanded(child: Container(height: 1, color: Papier.ink, margin: const EdgeInsets.only(top: 6))),
              if (rightLabel != null) ...[
                const SizedBox(width: 14),
                Text(rightLabel!, style: PapierType.italic(fontSize: 14, color: Papier.ink2)),
              ],
            ],
          ),
          const SizedBox(height: 4),
          const DoubleRule(topThickness: 1, gap: 3, bottomThickness: 2),
        ],
      ),
    );
  }
}

// ─── ToCRow ─────────────────────────────────────────────────
// Table-of-contents row with leader dots between title and right label.
class ToCRow extends StatelessWidget {
  final String numeral;       // e.g. "I."
  final String title;         // e.g. "Suites géométriques"
  final String? meta;         // e.g. "révision"
  final String? right;        // e.g. "12 h"
  final Color rightColor;
  final VoidCallback? onTap;
  const ToCRow({
    super.key,
    required this.numeral,
    required this.title,
    this.meta,
    this.right,
    this.rightColor = Papier.ink2,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 11),
        child: Container(
          decoration: const BoxDecoration(
            border: Border(bottom: BorderSide(color: Papier.line, width: 1)),
          ),
          padding: const EdgeInsets.only(bottom: 11),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              SizedBox(
                width: 18,
                child: Text(numeral,
                    style: PapierType.italic(fontSize: 13, color: Papier.ink3)),
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: PapierType.serif(fontSize: 14, color: Papier.ink),
                ),
              ),
              const SizedBox(width: 6),
              Expanded(
                child: Container(
                  margin: const EdgeInsets.only(bottom: 3),
                  child: const _DottedRule(),
                ),
              ),
              const SizedBox(width: 6),
              if (meta != null)
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: Text(meta!,
                      style: PapierType.italic(fontSize: 11, color: Papier.ink3)),
                ),
              if (right != null)
                Text(right!,
                    style: PapierType.mono(
                        fontSize: 10,
                        color: rightColor,
                        fontWeight: FontWeight.w500)),
            ],
          ),
        ),
      ),
    );
  }
}

class _DottedRule extends StatelessWidget {
  const _DottedRule();

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: const Size.fromHeight(1),
      painter: _DottedPainter(),
    );
  }
}

class _DottedPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Papier.line2
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;
    const dotSpacing = 3.0;
    for (double x = 0; x < size.width; x += dotSpacing) {
      canvas.drawLine(Offset(x, 0), Offset(x + 1, 0), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ─── ChapterHead ────────────────────────────────────────────
// Eyebrow + roman numeral + italic title (used for screen-level headings).
class ChapterHead extends StatelessWidget {
  final String? eyebrow;
  final String? numeral;
  final String title;
  final bool italic;
  const ChapterHead({
    super.key,
    this.eyebrow,
    this.numeral,
    required this.title,
    this.italic = true,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (eyebrow != null) SmallCaps(eyebrow!, color: Papier.ink3),
        const SizedBox(height: 4),
        Row(
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.alphabetic,
          children: [
            if (numeral != null)
              Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Text(numeral!,
                    style: PapierType.italic(
                      fontSize: 26,
                      color: Papier.ink3,
                      letterSpacing: -0.5,
                    )),
              ),
            Flexible(
              child: Text(
                title,
                style: PapierType.serif(
                  fontSize: 26,
                  fontWeight: FontWeight.w500,
                  fontStyle: italic ? FontStyle.italic : FontStyle.normal,
                  letterSpacing: -0.5,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

// ─── PaperCard ──────────────────────────────────────────────
// A flat paper-textured card — useful for wrapping content sections.
class PaperCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets padding;
  final Color? color;
  final bool grain;
  const PaperCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(14),
    this.color,
    this.grain = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: color ?? Papier.surface,
        border: Border.all(color: Papier.line, width: 1),
        borderRadius: BorderRadius.circular(Papier.radius),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(Papier.radius),
        child: Stack(
          children: [
            if (grain) const Positioned.fill(child: PaperGrain(opacity: 0.12)),
            Padding(padding: padding, child: child),
          ],
        ),
      ),
    );
  }
}

// ─── Roman numerals helper ──────────────────────────────────
// For tab bar labels and chapter headings.
String toRoman(int n) {
  if (n <= 0) return '';
  const m = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const s = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  var result = '';
  var num = n;
  for (var i = 0; i < m.length; i++) {
    while (num >= m[i]) {
      result += s[i];
      num -= m[i];
    }
  }
  return result;
}
