import 'package:flutter/material.dart';
import 'package:flutter_math_fork/flutter_math.dart';
import '../../config/theme.dart';

class InteractiveWidgetTestScreen extends StatelessWidget {
  const InteractiveWidgetTestScreen({super.key});

  static const String routeName = '/test-interactive';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Test: Interactive Widgets'),
        backgroundColor: BacPrepColors.primary,
        foregroundColor: Colors.white,
      ),
      body: ListView(
        padding: const EdgeInsets.all(Spacing.md),
        children: [
          const Text(
            'Interactive Math Widgets',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            'This screen tests the interactive visualization widgets for math and physics.',
            style: TextStyle(color: Colors.grey),
          ),
          const SizedBox(height: 16),
          
          // Test 1: LaTeX rendering
          _TestCard(
            title: 'LaTeX Rendering Test',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Math equations should render properly:'),
                const SizedBox(height: 8),
                Math.tex(r'f(x) = x^2 - 4'),
                const SizedBox(height: 8),
                Math.tex(r'\frac{d}{dx}f(x) = 2x'),
                const SizedBox(height: 8),
                Math.tex(r'\int_0^3 x^2 \, dx = 9'),
                const SizedBox(height: 8),
                Math.tex(r'z = 3 + 4i \Rightarrow |z| = 5'),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Test 2: Custom paint preview
          _TestCard(
            title: 'Graph Canvas Test',
            child: SizedBox(
              height: 200,
              child: CustomPaint(
                size: const Size(double.infinity, 200),
                painter: _TestGraphPainter(),
              ),
            ),
          ),

          const SizedBox(height: 16),

          // Test 3: Animation preview
          _TestCard(
            title: 'Animation Test',
            child: SizedBox(
              height: 150,
              child: _AnimatedBall(),
            ),
          ),

          const SizedBox(height: 16),

          // Test 4: Interactive slider
          _TestCard(
            title: 'Slider Interaction Test',
            child: _SliderTest(),
          ),

          const SizedBox(height: 16),

          // Test 5: Force diagram preview
          _TestCard(
            title: 'Force Diagram Preview',
            child: SizedBox(
              height: 200,
              child: CustomPaint(
                size: const Size(double.infinity, 200),
                painter: _TestForcePainter(),
              ),
            ),
          ),

          const SizedBox(height: 16),

          // Test 6: Circuit preview
          _TestCard(
            title: 'Circuit Preview',
            child: SizedBox(
              height: 150,
              child: CustomPaint(
                size: const Size(double.infinity, 150),
                painter: _TestCircuitPainter(),
              ),
            ),
          ),

          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _TestCard extends StatelessWidget {
  final String title;
  final Widget child;

  const _TestCard({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.border),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _TestGraphPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final axisPaint = Paint()
      ..color = Colors.grey
      ..strokeWidth = 1;

    final graphPaint = Paint()
      ..color = BacPrepColors.math
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final scale = 20.0;

    canvas.drawLine(
      Offset(10, centerY),
      Offset(size.width - 10, centerY),
      axisPaint,
    );
    canvas.drawLine(
      Offset(centerX, 10),
      Offset(centerX, size.height - 10),
      axisPaint,
    );

    final path = Path();
    bool started = false;
    for (double screenX = 10; screenX < size.width - 10; screenX++) {
      final x = (screenX - centerX) / scale;
      final y = x * x - 4;
      final screenY = centerY - y * scale;
      if (!started) {
        path.moveTo(screenX, screenY);
        started = true;
      } else {
        path.lineTo(screenX, screenY);
      }
    }
    canvas.drawPath(path, graphPaint);

    final dotPaint = Paint()
      ..color = BacPrepColors.accent
      ..style = PaintingStyle.fill;
    canvas.drawCircle(
      Offset(centerX + 2 * scale, centerY - (2 * 2 - 4) * scale),
      8,
      dotPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _AnimatedBall extends StatefulWidget {
  @override
  State<_AnimatedBall> createState() => _AnimatedBallState();
}

class _AnimatedBallState extends State<_AnimatedBall>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Stack(
          alignment: Alignment.center,
          children: [
            Container(
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Positioned(
              top: 20 + _controller.value * 80,
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: BacPrepColors.physics,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: BacPrepColors.physics.withValues(alpha: 0.4),
                      blurRadius: 10 + _controller.value * 10,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
              ),
            ),
            Positioned(
              bottom: 10,
              child: Text(
                'Tap to animate',
                style: TextStyle(
                  color: Colors.grey.shade500,
                  fontSize: 12,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _SliderTest extends StatefulWidget {
  @override
  State<_SliderTest> createState() => _SliderTestState();
}

class _SliderTestState extends State<_SliderTest> {
  double _value = 30;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            const Text('Angle: '),
            Expanded(
              child: Slider(
                value: _value,
                min: 0,
                max: 60,
                onChanged: (v) => setState(() => _value = v),
              ),
            ),
            SizedBox(
              width: 50,
              child: Text(
                '${_value.toInt()}°',
                textAlign: TextAlign.end,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        SizedBox(
          height: 80,
          child: CustomPaint(
            size: const Size(double.infinity, 80),
            painter: _AnglePreviewPainter(_value),
          ),
        ),
      ],
    );
  }
}

class _AnglePreviewPainter extends CustomPainter {
  final double angle;

  _AnglePreviewPainter(this.angle);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.grey
      ..strokeWidth = 2;

    final anglePaint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 2;

    final center = Offset(size.width / 2, size.height - 10);
    final length = size.height - 20;
    final angleRad = angle * 3.14159 / 180;

    canvas.drawLine(
      Offset(center.dx - length, center.dy),
      center,
      paint,
    );

    canvas.drawLine(
      center,
      Offset(center.dx + length * 0.7, center.dy - length * 0.5),
      anglePaint,
    );

    final arcPath = Path();
    arcPath.moveTo(center.dx + 20, center.dy);
    arcPath.arcTo(
      Rect.fromCenter(center: center, width: 40, height: 40),
      3.14159,
      -angleRad,
      false,
    );
    canvas.drawPath(
      arcPath,
      Paint()
        ..color = BacPrepColors.warning
        ..strokeWidth = 2
        ..style = PaintingStyle.stroke,
    );

    final textPainter = TextPainter(
      text: TextSpan(
        text: '${angle.toInt()}°',
        style: TextStyle(color: BacPrepColors.warning, fontSize: 12),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(center.dx + 25, center.dy - 15));
  }

  @override
  bool shouldRepaint(covariant _AnglePreviewPainter oldDelegate) {
    return angle != oldDelegate.angle;
  }
}

class _TestForcePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final centerX = size.width * 0.3;
    final centerY = size.height * 0.6;

    final groundPaint = Paint()
      ..color = Colors.grey
      ..strokeWidth = 3;
    final angle = 30 * 3.14159 / 180;
    final inclineLength = 150.0;

    canvas.drawLine(
      Offset(centerX, centerY),
      Offset(centerX + inclineLength * 0.866, centerY - inclineLength * 0.5),
      groundPaint,
    );
    canvas.drawLine(
      Offset(centerX + inclineLength * 0.866, centerY - inclineLength * 0.5),
      Offset(centerX + inclineLength * 0.866, centerY + 20),
      groundPaint,
    );

    final blockPaint = Paint()..color = BacPrepColors.physics;
    canvas.drawRect(
      Rect.fromCenter(
        center: Offset(centerX + 40, centerY - 15),
        width: 35,
        height: 35,
      ),
      blockPaint,
    );

    _drawArrow(canvas, Offset(centerX + 40, centerY - 15),
        Offset(centerX + 40, centerY + 50), BacPrepColors.physics, 3, 'P');

    _drawArrow(canvas, Offset(centerX + 40, centerY - 15),
        Offset(centerX + 40, centerY - 45), BacPrepColors.success, 2.5, 'N');

    _drawArrow(canvas, Offset(centerX + 40, centerY - 15),
        Offset(centerX + 40 + 25, centerY - 15), BacPrepColors.error, 2, 'Px');

    _drawArrow(canvas, Offset(centerX + 40, centerY - 15),
        Offset(centerX + 40, centerY - 15 - 43), BacPrepColors.warning, 2, 'Py');
  }

  void _drawArrow(Canvas canvas, Offset start, Offset end, Color color,
      double width, String label) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = width
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawLine(start, end, paint);

    final direction = (end - start);
    final length = direction.distance;
    if (length < 10) return;

    final normalized = direction / length;
    final perpendicular = Offset(-normalized.dy, normalized.dx);
    final arrowSize = 8.0;

    final arrowPath = Path()
      ..moveTo(end.dx, end.dy)
      ..lineTo(
          end.dx - normalized.dx * arrowSize + perpendicular.dx * arrowSize / 2,
          end.dy - normalized.dy * arrowSize + perpendicular.dy * arrowSize / 2)
      ..moveTo(end.dx, end.dy)
      ..lineTo(
          end.dx - normalized.dx * arrowSize - perpendicular.dx * arrowSize / 2,
          end.dy - normalized.dy * arrowSize - perpendicular.dy * arrowSize / 2);

    canvas.drawPath(arrowPath, paint);

    final textPainter = TextPainter(
      text: TextSpan(
        text: label,
        style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset((start.dx + end.dx) / 2 + 5, (start.dy + end.dy) / 2 - 15));
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _TestCircuitPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final wirePaint = Paint()
      ..color = Colors.grey.shade700
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final resistorPaint = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 3;

    final capacitorPaint = Paint()
      ..color = BacPrepColors.warning
      ..strokeWidth = 3;

    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final w = size.width * 0.6;
    final h = size.height * 0.6;

    canvas.drawLine(
      Offset(centerX - w / 2, centerY - h / 2),
      Offset(centerX - w / 4, centerY - h / 2),
      wirePaint,
    );
    canvas.drawLine(
      Offset(centerX + w / 4, centerY - h / 2),
      Offset(centerX + w / 2, centerY - h / 2),
      wirePaint,
    );
    canvas.drawLine(
      Offset(centerX + w / 2, centerY - h / 2),
      Offset(centerX + w / 2, centerY + h / 2),
      wirePaint,
    );
    canvas.drawLine(
      Offset(centerX + w / 2, centerY + h / 2),
      Offset(centerX - w / 2, centerY + h / 2),
      wirePaint,
    );
    canvas.drawLine(
      Offset(centerX - w / 2, centerY + h / 2),
      Offset(centerX - w / 2, centerY - h / 2),
      wirePaint,
    );

    final zigzagPath = Path();
    zigzagPath.moveTo(centerX - w / 4, centerY - h / 2);
    for (int i = 0; i < 6; i++) {
      final x = centerX - w / 4 + i * (w / 2) / 6;
      final y = centerY - h / 2 + (i % 2 == 0 ? -8 : 8);
      zigzagPath.lineTo(x, y);
    }
    zigzagPath.lineTo(centerX + w / 4, centerY - h / 2);
    canvas.drawPath(zigzagPath, resistorPaint);

    canvas.drawLine(
      Offset(centerX + w / 2, centerY - 10),
      Offset(centerX + w / 2, centerY - 25),
      capacitorPaint,
    );
    canvas.drawLine(
      Offset(centerX + w / 2 - 10, centerY - 25),
      Offset(centerX + w / 2 + 10, centerY - 25),
      capacitorPaint,
    );
    canvas.drawLine(
      Offset(centerX + w / 2 - 10, centerY + 25),
      Offset(centerX + w / 2 + 10, centerY + 25),
      capacitorPaint,
    );
    canvas.drawLine(
      Offset(centerX + w / 2, centerY + 25),
      Offset(centerX + w / 2, centerY + 10),
      capacitorPaint,
    );

    final textPainter = TextPainter(
      text: const TextSpan(
        text: 'R',
        style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX - 10, centerY - h / 2 - 30));

    textPainter.text = const TextSpan(
      text: 'C',
      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(centerX + w / 2 + 10, centerY - 10));
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
