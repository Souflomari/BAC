import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';

/// Concept animation library — short Manim-style animations rendered with
/// pure CustomPainter + AnimationController.
///
/// Lesson cards reference this widget with `widgetType: 'concept_animation'`
/// and `config: { animation_id: '...' }`. Supported IDs:
///
///   eps_delta, local_derivative, integral_as_area, young_slits, resonance,
///   half_life, chemical_equilibrium, magnetic_deflection, complex_rotation,
///   exponential_growth
class ConceptAnimationWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const ConceptAnimationWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<ConceptAnimationWidget> createState() => _State();
}

class _State extends State<ConceptAnimationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 8),
      vsync: this,
    )..addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  String get _animationId {
    final cfg = widget.item.question['sim_config'] ?? widget.item.question['graph_config'];
    if (cfg is Map) {
      final id = cfg['animation_id'];
      if (id is String) return id;
    }
    return 'eps_delta';
  }

  void _toggle() {
    setState(() {
      if (_controller.isAnimating) {
        _controller.stop();
      } else {
        if (_controller.value >= 1.0) _controller.reset();
        _controller.forward();
      }
    });
  }

  void _reset() => _controller.reset();

  @override
  Widget build(BuildContext context) {
    final id = _animationId;
    final spec = _animations[id] ?? _animations['eps_delta']!;
    return Padding(
      padding: const EdgeInsets.all(Spacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(spec.title, style: Theme.of(context).textTheme.titleSmall),
          const SizedBox(height: 6),
          Text(spec.caption, style: const TextStyle(fontSize: 12, color: BacPrepColors.textSecondary)),
          const SizedBox(height: Spacing.sm),
          Container(
            height: 240,
            decoration: BoxDecoration(
              color: BacPrepColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: BacPrepColors.locked),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: CustomPaint(
                size: const Size(double.infinity, 240),
                painter: _AnimationPainter(id: id, t: _controller.value),
              ),
            ),
          ),
          const SizedBox(height: Spacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton.filled(icon: const Icon(Icons.refresh), onPressed: _reset),
              const SizedBox(width: Spacing.md),
              IconButton.filled(
                icon: Icon(_controller.isAnimating ? Icons.pause : Icons.play_arrow),
                iconSize: 36,
                onPressed: _toggle,
                style: IconButton.styleFrom(
                  backgroundColor: BacPrepColors.physics,
                  foregroundColor: Colors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Slider(
            value: _controller.value.clamp(0, 1),
            onChanged: (v) {
              setState(() {
                _controller.stop();
                _controller.value = v;
              });
            },
          ),
        ],
      ),
    );
  }
}

class _Spec {
  final String title;
  final String caption;
  const _Spec(this.title, this.caption);
}

const Map<String, _Spec> _animations = {
  'eps_delta': _Spec('Définition ε-δ d\'une limite', 'Quand ε rétrécit, δ rétrécit aussi.'),
  'local_derivative': _Spec('La dérivée comme limite de la sécante', 'M tend vers M₀ : la sécante devient la tangente.'),
  'integral_as_area': _Spec('L\'intégrale comme aire', 'Quand n augmente, la somme des rectangles converge vers l\'aire.'),
  'young_slits': _Spec('Fentes d\'Young', 'Les ondes diffractées interfèrent : franges claires et sombres.'),
  'resonance': _Spec('Résonance d\'un oscillateur', 'L\'amplitude est maximale lorsque ω ≈ ω₀.'),
  'half_life': _Spec('Demi-vie radioactive', 'À chaque t½, la moitié des noyaux disparaît.'),
  'chemical_equilibrium': _Spec('Équilibre chimique', 'Les vitesses directe et inverse s\'égalisent.'),
  'magnetic_deflection': _Spec('Déflexion magnétique', 'Une charge dans un champ B perpendiculaire suit un cercle.'),
  'complex_rotation': _Spec('Multiplication complexe = rotation', 'Multiplier par e^(iθ) tourne le plan d\'un angle θ.'),
  'exponential_growth': _Spec('Croissance exponentielle', 'eˣ surpasse n\'importe quel polynôme.'),
};

class _AnimationPainter extends CustomPainter {
  final String id;
  final double t;

  _AnimationPainter({required this.id, required this.t});

  @override
  void paint(Canvas canvas, Size size) {
    switch (id) {
      case 'eps_delta':
        _epsDelta(canvas, size);
        break;
      case 'local_derivative':
        _localDerivative(canvas, size);
        break;
      case 'integral_as_area':
        _integralArea(canvas, size);
        break;
      case 'young_slits':
        _youngSlits(canvas, size);
        break;
      case 'resonance':
        _resonance(canvas, size);
        break;
      case 'half_life':
        _halfLife(canvas, size);
        break;
      case 'chemical_equilibrium':
        _equilibrium(canvas, size);
        break;
      case 'magnetic_deflection':
        _magneticDeflection(canvas, size);
        break;
      case 'complex_rotation':
        _complexRotation(canvas, size);
        break;
      case 'exponential_growth':
        _exponentialGrowth(canvas, size);
        break;
      default:
        _epsDelta(canvas, size);
    }
  }

  // ---------- Animation primitives ----------

  ({double w, double h, Offset origin, double pxPerUnit}) _frame(Size size, {double xRange = 6, double yRange = 4}) {
    const pad = 28.0;
    final w = size.width - pad * 2;
    final h = size.height - pad * 2;
    final pxPerUnit = math.min(w / xRange, h / yRange);
    return (w: w, h: h, origin: Offset(size.width / 2, size.height / 2), pxPerUnit: pxPerUnit);
  }

  void _drawAxes(Canvas canvas, Size size, Offset origin, double pxPerUnit, double xR, double yR) {
    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1.2;
    canvas.drawLine(
      Offset(origin.dx - xR / 2 * pxPerUnit, origin.dy),
      Offset(origin.dx + xR / 2 * pxPerUnit, origin.dy),
      axis,
    );
    canvas.drawLine(
      Offset(origin.dx, origin.dy - yR / 2 * pxPerUnit),
      Offset(origin.dx, origin.dy + yR / 2 * pxPerUnit),
      axis,
    );
  }

  // ---------- Animations ----------

  void _epsDelta(Canvas canvas, Size size) {
    // f(x) = x²; a = 1, L = 1. ε shrinks from 0.8 → 0.05.
    final f = _frame(size);
    _drawAxes(canvas, size, f.origin, f.pxPerUnit, 6, 4);
    final eps = 0.8 * (1 - t) + 0.05;
    final delta = math.sqrt(1 + eps) - 1;
    const a = 1.0;
    const L = 1.0;
    Offset xy(double x, double y) =>
        Offset(f.origin.dx + x * f.pxPerUnit, f.origin.dy - y * f.pxPerUnit);

    // Bands
    canvas.drawRect(
      Rect.fromLTRB(xy(-3, L + eps).dx, xy(-3, L + eps).dy, xy(3, L - eps).dx, xy(3, L - eps).dy),
      Paint()..color = BacPrepColors.success.withValues(alpha: 0.18),
    );
    canvas.drawRect(
      Rect.fromLTRB(xy(a - delta, 3).dx, xy(a - delta, 3).dy, xy(a + delta, -1).dx, xy(a + delta, -1).dy),
      Paint()..color = BacPrepColors.error.withValues(alpha: 0.12),
    );
    // Curve y = x²
    final path = Path();
    for (var i = 0; i <= 200; i++) {
      final x = -3 + 6 * i / 200;
      final y = x * x;
      final p = xy(x, y);
      if (i == 0) {
        path.moveTo(p.dx, p.dy);
      } else {
        path.lineTo(p.dx, p.dy);
      }
    }
    canvas.drawPath(path, Paint()..color = BacPrepColors.physics..strokeWidth = 2..style = PaintingStyle.stroke);
    canvas.drawCircle(xy(a, L), 4, Paint()..color = BacPrepColors.error);

    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: 'ε = ${eps.toStringAsFixed(2)}    δ ≈ ${delta.toStringAsFixed(3)}',
      style: const TextStyle(fontSize: 12, color: BacPrepColors.textPrimary),
    );
    tp.layout();
    tp.paint(canvas, const Offset(8, 6));
  }

  void _localDerivative(Canvas canvas, Size size) {
    // f(x) = x²; show secant from (1, 1) to (1+h, (1+h)²) with h shrinking.
    final f = _frame(size);
    _drawAxes(canvas, size, f.origin, f.pxPerUnit, 6, 4);
    final h = 1.5 * (1 - t) + 0.02;
    Offset xy(double x, double y) =>
        Offset(f.origin.dx + x * f.pxPerUnit, f.origin.dy - y * f.pxPerUnit);
    // Curve
    final path = Path();
    for (var i = 0; i <= 200; i++) {
      final x = -2 + 4 * i / 200;
      final y = x * x;
      final p = xy(x, y);
      if (i == 0) {
        path.moveTo(p.dx, p.dy);
      } else {
        path.lineTo(p.dx, p.dy);
      }
    }
    canvas.drawPath(path, Paint()..color = BacPrepColors.physics..strokeWidth = 2..style = PaintingStyle.stroke);
    // Secant
    final p0 = xy(1, 1);
    final pH = xy(1 + h, (1 + h) * (1 + h));
    // Extend secant across the canvas
    final dx = pH.dx - p0.dx, dy = pH.dy - p0.dy;
    const big = 1000.0;
    final sStart = Offset(p0.dx - dx * big, p0.dy - dy * big);
    final sEnd = Offset(p0.dx + dx * big, p0.dy + dy * big);
    canvas.drawLine(sStart, sEnd, Paint()..color = BacPrepColors.error..strokeWidth = 1.5);
    canvas.drawCircle(p0, 4, Paint()..color = BacPrepColors.error);
    canvas.drawCircle(pH, 4, Paint()..color = BacPrepColors.accent);
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: 'pente ≈ ${(2 + h).toStringAsFixed(3)}   (h = ${h.toStringAsFixed(2)})',
      style: const TextStyle(fontSize: 12, color: BacPrepColors.textPrimary),
    );
    tp.layout();
    tp.paint(canvas, const Offset(8, 6));
  }

  void _integralArea(Canvas canvas, Size size) {
    // ∫₀² x² dx = 8/3 ≈ 2.667. Riemann sum with n rectangles.
    final f = _frame(size);
    _drawAxes(canvas, size, f.origin, f.pxPerUnit, 6, 4);
    final n = (2 + 60 * t).round();
    Offset xy(double x, double y) =>
        Offset(f.origin.dx + (x - 1) * f.pxPerUnit, f.origin.dy - (y - 1) * f.pxPerUnit);
    // Rectangles
    final dx = 2.0 / n;
    var sum = 0.0;
    for (var i = 0; i < n; i++) {
      final x = i * dx;
      final y = x * x;
      sum += y * dx;
      final r = Rect.fromLTRB(xy(x, y).dx, xy(x, y).dy, xy(x + dx, 0).dx, xy(x + dx, 0).dy);
      canvas.drawRect(r, Paint()..color = BacPrepColors.success.withValues(alpha: 0.45));
      canvas.drawRect(
        r,
        Paint()..color = BacPrepColors.success..style = PaintingStyle.stroke..strokeWidth = 0.6,
      );
    }
    // Curve y = x² over [0, 2]
    final path = Path();
    for (var i = 0; i <= 80; i++) {
      final x = 2 * i / 80;
      final y = x * x;
      final p = xy(x, y);
      if (i == 0) {
        path.moveTo(p.dx, p.dy);
      } else {
        path.lineTo(p.dx, p.dy);
      }
    }
    canvas.drawPath(path, Paint()..color = BacPrepColors.physics..strokeWidth = 2..style = PaintingStyle.stroke);
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: 'n = $n   ∑ ≈ ${sum.toStringAsFixed(3)}   (vraie aire = 8/3 ≈ 2.667)',
      style: const TextStyle(fontSize: 12, color: BacPrepColors.textPrimary),
    );
    tp.layout();
    tp.paint(canvas, const Offset(8, 6));
  }

  void _youngSlits(Canvas canvas, Size size) {
    // Two point sources emitting circular wavefronts; overlap shows fringes on a screen.
    final cy = size.height / 2;
    final slitX = size.width * 0.25;
    final s1 = Offset(slitX, cy - 18);
    final s2 = Offset(slitX, cy + 18);
    final screenX = size.width - 20;

    canvas.drawLine(Offset(slitX, 8), Offset(slitX, size.height - 8),
        Paint()..color = BacPrepColors.locked..strokeWidth = 1);

    // Slits as gaps
    canvas.drawCircle(s1, 3, Paint()..color = BacPrepColors.physics);
    canvas.drawCircle(s2, 3, Paint()..color = BacPrepColors.physics);

    // Wavefronts: rings expanding with t
    final wavePaint = Paint()
      ..color = BacPrepColors.accent.withValues(alpha: 0.35)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;
    final maxR = (screenX - slitX) * 1.2;
    for (var i = 0; i < 6; i++) {
      final phase = ((t + i / 6) % 1);
      final r = phase * maxR;
      canvas.drawCircle(s1, r, wavePaint);
      canvas.drawCircle(s2, r, wavePaint);
    }

    // Screen line
    canvas.drawLine(Offset(screenX, 8), Offset(screenX, size.height - 8),
        Paint()..color = BacPrepColors.textPrimary..strokeWidth = 2);

    // Fringe pattern on screen: sinc-like along y
    final paintBright = Paint();
    for (var y = 12.0; y < size.height - 12; y += 1) {
      final dy = y - cy;
      final L = screenX - slitX;
      final delta = (math.sqrt(L * L + (dy - 18) * (dy - 18)) - math.sqrt(L * L + (dy + 18) * (dy + 18)));
      final phaseDiff = delta * 80; // arbitrary scale for visual effect
      final intensity = (math.cos(phaseDiff) + 1) / 2;
      paintBright.color = BacPrepColors.accent.withValues(alpha: intensity * 0.9);
      canvas.drawLine(Offset(screenX, y), Offset(screenX + 12, y), paintBright);
    }
  }

  void _resonance(Canvas canvas, Size size) {
    // Resonance curve A(ω) = A0/√((ω₀²-ω²)² + (γω)²); ω moves over time.
    const pad = 28.0;
    final w = size.width - pad * 2;
    final h = size.height - pad * 2;
    const omega0 = 1.0;
    const gamma = 0.2;
    double xOf(double om) => pad + om / 3.0 * w;
    double yOf(double a) => pad + h - (a / 6) * h;
    // Curve
    final path = Path();
    for (var i = 0; i <= 200; i++) {
      final om = 3 * i / 200;
      final a = 1 / math.sqrt((omega0 * omega0 - om * om) * (omega0 * omega0 - om * om) + (gamma * om) * (gamma * om));
      final p = Offset(xOf(om), yOf(a));
      if (i == 0) {
        path.moveTo(p.dx, p.dy);
      } else {
        path.lineTo(p.dx, p.dy);
      }
    }
    canvas.drawPath(path, Paint()..color = BacPrepColors.physics..strokeWidth = 2..style = PaintingStyle.stroke);

    final omNow = 3 * t;
    final aNow = 1 / math.sqrt((omega0 * omega0 - omNow * omNow) * (omega0 * omega0 - omNow * omNow) + (gamma * omNow) * (gamma * omNow));
    canvas.drawCircle(Offset(xOf(omNow), yOf(aNow)), 5, Paint()..color = BacPrepColors.error);

    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: 'ω = ${omNow.toStringAsFixed(2)}   A = ${aNow.toStringAsFixed(2)}',
      style: const TextStyle(fontSize: 12, color: BacPrepColors.textPrimary),
    );
    tp.layout();
    tp.paint(canvas, const Offset(8, 6));
  }

  void _halfLife(Canvas canvas, Size size) {
    const pad = 28.0;
    final w = size.width - pad * 2;
    final h = size.height - pad * 2;
    final lambda = math.log(2);
    const tMax = 5.0;
    final tNow = tMax * t;
    double xOf(double tt) => pad + tt / tMax * w;
    double yOf(double v) => pad + h - v * h;
    // Curve
    final path = Path();
    for (var i = 0; i <= 200; i++) {
      final tt = tMax * i / 200;
      final n = math.exp(-lambda * tt);
      final p = Offset(xOf(tt), yOf(n));
      if (i == 0) {
        path.moveTo(p.dx, p.dy);
      } else {
        path.lineTo(p.dx, p.dy);
      }
    }
    canvas.drawPath(path, Paint()..color = BacPrepColors.physics..strokeWidth = 2..style = PaintingStyle.stroke);
    // Half-life dashed
    final dash = Paint()..color = BacPrepColors.locked.withValues(alpha: 0.6)..strokeWidth = 0.8;
    for (var i = 1; i <= 4; i++) {
      final x = xOf(i.toDouble());
      var y = pad;
      while (y < pad + h) {
        canvas.drawLine(Offset(x, y), Offset(x, math.min(y + 4, pad + h)), dash);
        y += 8;
      }
    }
    canvas.drawCircle(Offset(xOf(tNow), yOf(math.exp(-lambda * tNow))), 5, Paint()..color = BacPrepColors.error);
  }

  void _equilibrium(Canvas canvas, Size size) {
    // Two rates approaching equality; show as bars + meeting curves.
    const pad = 28.0;
    final w = size.width - pad * 2;
    final h = size.height - pad * 2;
    double xOf(double tt) => pad + tt * w;
    double yOf(double v) => pad + h - v * h;

    // Forward rate: starts high, decays to half
    double rf(double tt) => 0.5 + 0.5 * math.exp(-3 * tt);
    // Reverse rate: starts at 0, grows to half
    double rr(double tt) => 0.5 - 0.5 * math.exp(-3 * tt);

    final pathF = Path();
    final pathR = Path();
    for (var i = 0; i <= 200; i++) {
      final tt = i / 200;
      final pf = Offset(xOf(tt), yOf(rf(tt)));
      final pr = Offset(xOf(tt), yOf(rr(tt)));
      if (i == 0) {
        pathF.moveTo(pf.dx, pf.dy);
        pathR.moveTo(pr.dx, pr.dy);
      } else {
        pathF.lineTo(pf.dx, pf.dy);
        pathR.lineTo(pr.dx, pr.dy);
      }
    }
    canvas.drawPath(pathF, Paint()..color = BacPrepColors.success..strokeWidth = 2..style = PaintingStyle.stroke);
    canvas.drawPath(pathR, Paint()..color = BacPrepColors.error..strokeWidth = 2..style = PaintingStyle.stroke);

    canvas.drawCircle(Offset(xOf(t), yOf(rf(t))), 4, Paint()..color = BacPrepColors.success);
    canvas.drawCircle(Offset(xOf(t), yOf(rr(t))), 4, Paint()..color = BacPrepColors.error);

    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = const TextSpan(
      text: 'v_directe',
      style: TextStyle(fontSize: 11, color: BacPrepColors.success, fontWeight: FontWeight.w600),
    );
    tp.layout();
    tp.paint(canvas, const Offset(pad + 6, pad - 4));
    tp.text = const TextSpan(
      text: 'v_inverse',
      style: TextStyle(fontSize: 11, color: BacPrepColors.error, fontWeight: FontWeight.w600),
    );
    tp.layout();
    tp.paint(canvas, Offset(pad + 6, pad + h - 14));
  }

  void _magneticDeflection(Canvas canvas, Size size) {
    // A particle enters from the left and curves clockwise inside the canvas
    // (B into the page). The centerline of the orbit rises with t.
    final cx = size.width * 0.5;
    final cy = size.height * 0.55;
    final r = math.min(size.width, size.height) * 0.28;
    // Background field markers (× pattern)
    const cell = 28.0;
    final markPaint = Paint()..color = BacPrepColors.locked..strokeWidth = 0.8;
    for (var x = cell / 2; x < size.width; x += cell) {
      for (var y = cell / 2; y < size.height; y += cell) {
        canvas.drawLine(Offset(x - 3, y - 3), Offset(x + 3, y + 3), markPaint);
        canvas.drawLine(Offset(x - 3, y + 3), Offset(x + 3, y - 3), markPaint);
      }
    }
    // Orbit
    canvas.drawCircle(
      Offset(cx, cy),
      r,
      Paint()..color = BacPrepColors.physics.withValues(alpha: 0.4)..style = PaintingStyle.stroke..strokeWidth = 1.2,
    );
    // Particle position (clockwise from left)
    final theta = math.pi - 2 * math.pi * t;
    final px = cx + r * math.cos(theta);
    final py = cy + r * math.sin(theta);
    canvas.drawCircle(Offset(px, py), 6, Paint()..color = BacPrepColors.error);
    // Velocity vector (tangent)
    final tx = -math.sin(theta);
    final ty = math.cos(theta);
    final vEnd = Offset(px + tx * 30, py + ty * 30);
    canvas.drawLine(Offset(px, py), vEnd, Paint()..color = BacPrepColors.accent..strokeWidth = 2);
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = const TextSpan(
      text: 'B entrant',
      style: TextStyle(fontSize: 11, color: BacPrepColors.textSecondary),
    );
    tp.layout();
    tp.paint(canvas, const Offset(8, 6));
  }

  void _complexRotation(Canvas canvas, Size size) {
    // Multiplication by e^(iθ). Show input z₀ and output zR = z₀·e^(iθ).
    final cx = size.width / 2;
    final cy = size.height / 2;
    final scale = math.min(size.width, size.height) * 0.32;
    // Axes
    final axis = Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1;
    canvas.drawLine(Offset(cx - scale * 1.4, cy), Offset(cx + scale * 1.4, cy), axis);
    canvas.drawLine(Offset(cx, cy - scale * 1.4), Offset(cx, cy + scale * 1.4), axis);
    // Unit circle
    canvas.drawCircle(Offset(cx, cy), scale, Paint()..color = BacPrepColors.locked..style = PaintingStyle.stroke..strokeWidth = 1);
    // z₀
    final z0 = Offset(cx + scale * 0.8, cy - scale * 0.3);
    canvas.drawLine(Offset(cx, cy), z0, Paint()..color = BacPrepColors.physics..strokeWidth = 2);
    canvas.drawCircle(z0, 4, Paint()..color = BacPrepColors.physics);
    // Rotation by angle θ = 2π t
    final theta = 2 * math.pi * t;
    final c = math.cos(theta), s = math.sin(theta);
    final zR = Offset(
      cx + (z0.dx - cx) * c - (cy - z0.dy) * s,
      cy - ((cy - z0.dy) * c + (z0.dx - cx) * s),
    );
    canvas.drawLine(Offset(cx, cy), zR, Paint()..color = BacPrepColors.error..strokeWidth = 2);
    canvas.drawCircle(zR, 4, Paint()..color = BacPrepColors.error);
    // Arc indicating angle
    final arcRect = Rect.fromCircle(center: Offset(cx, cy), radius: scale * 0.35);
    canvas.drawArc(arcRect, 0, -theta, false, Paint()..color = BacPrepColors.accent..strokeWidth = 2..style = PaintingStyle.stroke);
    final tp = TextPainter(textDirection: TextDirection.ltr);
    tp.text = TextSpan(
      text: 'θ = ${(theta * 180 / math.pi).toStringAsFixed(0)}°',
      style: const TextStyle(fontSize: 12, color: BacPrepColors.accent),
    );
    tp.layout();
    tp.paint(canvas, Offset(cx + scale * 0.4, cy - scale * 0.5));
  }

  void _exponentialGrowth(Canvas canvas, Size size) {
    // Compare e^x to x², x³ as the visible window grows with t.
    const pad = 28.0;
    final w = size.width - pad * 2;
    final h = size.height - pad * 2;
    final xMax = 1 + 4 * t; // grows from 1 to 5
    final yMax = math.exp(xMax) * 1.05;
    double xOf(double x) => pad + x / xMax * w;
    double yOf(double y) => pad + h - y / yMax * h;
    // Axes
    canvas.drawLine(const Offset(pad, pad), Offset(pad, pad + h), Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1);
    canvas.drawLine(Offset(pad, pad + h), Offset(pad + w, pad + h), Paint()..color = BacPrepColors.textSecondary..strokeWidth = 1);
    // Curves
    void plot(double Function(double) f, Color c) {
      final path = Path();
      for (var i = 0; i <= 200; i++) {
        final x = xMax * i / 200;
        final y = f(x);
        final p = Offset(xOf(x), yOf(y.clamp(0, yMax)));
        if (i == 0) {
          path.moveTo(p.dx, p.dy);
        } else {
          path.lineTo(p.dx, p.dy);
        }
      }
      canvas.drawPath(path, Paint()..color = c..strokeWidth = 2..style = PaintingStyle.stroke);
    }

    plot((x) => x * x, BacPrepColors.accent);
    plot((x) => x * x * x, BacPrepColors.success);
    plot(math.exp, BacPrepColors.error);

    final tp = TextPainter(textDirection: TextDirection.ltr);
    void label(String s, Color c, Offset o) {
      tp.text = TextSpan(text: s, style: TextStyle(fontSize: 11, color: c, fontWeight: FontWeight.w600));
      tp.layout();
      tp.paint(canvas, o);
    }

    label('eˣ', BacPrepColors.error, Offset(pad + w - 24, pad + 4));
    label('x³', BacPrepColors.success, Offset(pad + w - 24, pad + 18));
    label('x²', BacPrepColors.accent, Offset(pad + w - 24, pad + 32));
    label('x = ${xMax.toStringAsFixed(2)}', BacPrepColors.textSecondary, const Offset(pad + 4, pad + 4));
  }

  @override
  bool shouldRepaint(covariant _AnimationPainter oldDelegate) =>
      oldDelegate.t != t || oldDelegate.id != id;
}
