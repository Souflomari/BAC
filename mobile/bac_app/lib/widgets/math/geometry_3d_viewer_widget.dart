import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../rich_text_renderer.dart';
import '../figure_widget.dart';

/// 3D geometry viewer for SMA: vectors, planes, lines, spheres.
///
/// Pure-Dart orthographic projection (no GL). Camera rotates by drag —
/// horizontal drag controls azimuth (yaw around z-axis), vertical drag
/// controls elevation (pitch around x-axis). The active "object" is one
/// of plane / line / sphere, configured via sliders.
class Geometry3dViewerWidget extends StatefulWidget {
  final Item item;
  final bool isAnswered;
  final void Function(dynamic answer) onAnswer;

  const Geometry3dViewerWidget({
    super.key,
    required this.item,
    required this.isAnswered,
    required this.onAnswer,
  });

  @override
  State<Geometry3dViewerWidget> createState() => _State();
}

enum _Mode { plane, line, sphere }

extension on _Mode {
  String get label {
    switch (this) {
      case _Mode.plane:
        return 'Plan';
      case _Mode.line:
        return 'Droite';
      case _Mode.sphere:
        return 'Sphère';
    }
  }
}

class _State extends State<Geometry3dViewerWidget> {
  _Mode _mode = _Mode.plane;

  // Camera
  double _azim = 0.5;
  double _elev = 0.4;

  // Plane: ax + by + cz = d
  double _pa = 1, _pb = 1, _pc = 1, _pd = 2;

  // Line: passes through P0 with direction u
  double _lpx = 0, _lpy = 0, _lpz = 0;
  double _lux = 1, _luy = 1, _luz = 1;

  // Sphere: center, radius
  double _scx = 0, _scy = 0, _scz = 0, _sr = 1.5;

  final _answerController = TextEditingController();
  bool _hasSubmitted = false;

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  void _onPanUpdate(DragUpdateDetails d) {
    setState(() {
      _azim += d.delta.dx * 0.01;
      _elev = (_elev + d.delta.dy * 0.01).clamp(-math.pi / 2 + 0.05, math.pi / 2 - 0.05);
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
          _buildScene(),
          const SizedBox(height: Spacing.sm),
          const Text(
            'Glisse pour faire tourner la vue.',
            style: TextStyle(fontSize: 11, color: BacPrepColors.textSecondary),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: Spacing.md),
          _buildParameters(),
          const SizedBox(height: Spacing.md),
          _buildEquationCard(),
          const SizedBox(height: Spacing.md),
          _buildAnswerInput(),
        ],
      ),
    );
  }

  Widget _buildScene() {
    return Container(
      height: 280,
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.locked),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onPanUpdate: _onPanUpdate,
          child: CustomPaint(
            size: const Size(double.infinity, 280),
            painter: _ScenePainter(
              mode: _mode,
              azim: _azim,
              elev: _elev,
              pa: _pa,
              pb: _pb,
              pc: _pc,
              pd: _pd,
              lp: _Vec3(_lpx, _lpy, _lpz),
              lu: _Vec3(_lux, _luy, _luz),
              sc: _Vec3(_scx, _scy, _scz),
              sr: _sr,
            ),
          ),
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
        children: [
          SegmentedButton<_Mode>(
            segments: _Mode.values
                .map((m) => ButtonSegment(value: m, label: Text(m.label)))
                .toList(),
            selected: {_mode},
            onSelectionChanged: (s) => setState(() => _mode = s.first),
          ),
          const SizedBox(height: Spacing.sm),
          if (_mode == _Mode.plane) ..._planeSliders(),
          if (_mode == _Mode.line) ..._lineSliders(),
          if (_mode == _Mode.sphere) ..._sphereSliders(),
        ],
      ),
    );
  }

  List<Widget> _planeSliders() => [
        _S(label: 'a', value: _pa, min: -3, max: 3, divisions: 60, display: _pa.toStringAsFixed(2),
            onChanged: (v) => setState(() => _pa = v)),
        _S(label: 'b', value: _pb, min: -3, max: 3, divisions: 60, display: _pb.toStringAsFixed(2),
            onChanged: (v) => setState(() => _pb = v)),
        _S(label: 'c', value: _pc, min: -3, max: 3, divisions: 60, display: _pc.toStringAsFixed(2),
            onChanged: (v) => setState(() => _pc = v)),
        _S(label: 'd', value: _pd, min: -5, max: 5, divisions: 100, display: _pd.toStringAsFixed(2),
            onChanged: (v) => setState(() => _pd = v)),
      ];

  List<Widget> _lineSliders() => [
        const Text('Point P₀', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
        _S(label: 'P.x', value: _lpx, min: -3, max: 3, divisions: 60, display: _lpx.toStringAsFixed(2),
            onChanged: (v) => setState(() => _lpx = v)),
        _S(label: 'P.y', value: _lpy, min: -3, max: 3, divisions: 60, display: _lpy.toStringAsFixed(2),
            onChanged: (v) => setState(() => _lpy = v)),
        _S(label: 'P.z', value: _lpz, min: -3, max: 3, divisions: 60, display: _lpz.toStringAsFixed(2),
            onChanged: (v) => setState(() => _lpz = v)),
        const SizedBox(height: 6),
        const Text('Vecteur directeur u', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
        _S(label: 'u.x', value: _lux, min: -2, max: 2, divisions: 40, display: _lux.toStringAsFixed(2),
            onChanged: (v) => setState(() => _lux = v)),
        _S(label: 'u.y', value: _luy, min: -2, max: 2, divisions: 40, display: _luy.toStringAsFixed(2),
            onChanged: (v) => setState(() => _luy = v)),
        _S(label: 'u.z', value: _luz, min: -2, max: 2, divisions: 40, display: _luz.toStringAsFixed(2),
            onChanged: (v) => setState(() => _luz = v)),
      ];

  List<Widget> _sphereSliders() => [
        const Text('Centre C', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
        _S(label: 'C.x', value: _scx, min: -3, max: 3, divisions: 60, display: _scx.toStringAsFixed(2),
            onChanged: (v) => setState(() => _scx = v)),
        _S(label: 'C.y', value: _scy, min: -3, max: 3, divisions: 60, display: _scy.toStringAsFixed(2),
            onChanged: (v) => setState(() => _scy = v)),
        _S(label: 'C.z', value: _scz, min: -3, max: 3, divisions: 60, display: _scz.toStringAsFixed(2),
            onChanged: (v) => setState(() => _scz = v)),
        _S(label: 'R', value: _sr, min: 0.2, max: 3, divisions: 28, display: _sr.toStringAsFixed(2),
            onChanged: (v) => setState(() => _sr = v)),
      ];

  Widget _buildEquationCard() {
    String eq;
    switch (_mode) {
      case _Mode.plane:
        eq = '${_pa.toStringAsFixed(2)}·x + ${_pb.toStringAsFixed(2)}·y + ${_pc.toStringAsFixed(2)}·z = ${_pd.toStringAsFixed(2)}';
        break;
      case _Mode.line:
        eq = 'M = P + t·u, P=($_lpx, $_lpy, $_lpz), u=($_lux, $_luy, $_luz)';
        break;
      case _Mode.sphere:
        eq = '(x − ${_scx.toStringAsFixed(2)})² + (y − ${_scy.toStringAsFixed(2)})² + (z − ${_scz.toStringAsFixed(2)})² = ${(_sr * _sr).toStringAsFixed(2)}';
        break;
    }
    return Container(
      padding: const EdgeInsets.all(Spacing.md),
      decoration: BoxDecoration(
        color: BacPrepColors.physics.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: BacPrepColors.physics.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Équation', style: TextStyle(fontSize: 11, color: BacPrepColors.textSecondary)),
          const SizedBox(height: 4),
          Text(eq, style: const TextStyle(fontSize: 13, fontFamily: 'monospace', color: BacPrepColors.physics)),
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
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.check, color: BacPrepColors.success),
            SizedBox(width: Spacing.sm),
            Text('Visualisé', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: BacPrepColors.success)),
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
              hintText: 'Réponse',
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
        SizedBox(width: 40, child: Text(label, style: const TextStyle(fontSize: 13))),
        Expanded(child: Slider(value: value, min: min, max: max, divisions: divisions, onChanged: onChanged)),
        SizedBox(width: 56, child: Text(display, style: const TextStyle(fontWeight: FontWeight.w600), textAlign: TextAlign.end)),
      ],
    );
  }
}

/// Simple immutable 3-vector.
class _Vec3 {
  final double x, y, z;
  const _Vec3(this.x, this.y, this.z);
}

class _ScenePainter extends CustomPainter {
  final _Mode mode;
  final double azim;
  final double elev;
  // Plane
  final double pa, pb, pc, pd;
  // Line
  final _Vec3 lp, lu;
  // Sphere
  final _Vec3 sc;
  final double sr;

  _ScenePainter({
    required this.mode,
    required this.azim,
    required this.elev,
    required this.pa,
    required this.pb,
    required this.pc,
    required this.pd,
    required this.lp,
    required this.lu,
    required this.sc,
    required this.sr,
  });

  /// World → 2D screen via orthographic projection.
  /// Rotate around z by -azim, then around x by -elev. Project (x, y, _).
  Offset _project(double x, double y, double z, Size size, double scale) {
    final ca = math.cos(azim), sa = math.sin(azim);
    final ce = math.cos(elev), se = math.sin(elev);
    // Yaw (around z)
    final x1 = x * ca + y * sa;
    final y1 = -x * sa + y * ca;
    final z1 = z;
    // Pitch (around x)
    final x2 = x1;
    final y2 = y1 * ce + z1 * se;
    // We project (x2, -y2) to use screen-down y.
    return Offset(size.width / 2 + x2 * scale, size.height / 2 - y2 * scale);
  }

  @override
  void paint(Canvas canvas, Size size) {
    const halfRange = 3.5;
    final scale = math.min(size.width, size.height) / (halfRange * 2.4);

    // Background grid in xy plane (z=0)
    final gridPaint = Paint()
      ..color = BacPrepColors.locked.withValues(alpha: 0.45)
      ..strokeWidth = 0.6;
    for (var i = -3; i <= 3; i++) {
      canvas.drawLine(
        _project(i.toDouble(), -3, 0, size, scale),
        _project(i.toDouble(), 3, 0, size, scale),
        gridPaint,
      );
      canvas.drawLine(
        _project(-3, i.toDouble(), 0, size, scale),
        _project(3, i.toDouble(), 0, size, scale),
        gridPaint,
      );
    }

    // Axes
    final axisX = Paint()..color = BacPrepColors.error..strokeWidth = 2;
    final axisY = Paint()..color = BacPrepColors.success..strokeWidth = 2;
    final axisZ = Paint()..color = BacPrepColors.physics..strokeWidth = 2;
    canvas.drawLine(_project(-3, 0, 0, size, scale), _project(3, 0, 0, size, scale), axisX);
    canvas.drawLine(_project(0, -3, 0, size, scale), _project(0, 3, 0, size, scale), axisY);
    canvas.drawLine(_project(0, 0, -3, size, scale), _project(0, 0, 3, size, scale), axisZ);

    final tp = TextPainter(textDirection: TextDirection.ltr);
    void label(String s, Offset o, Color c) {
      tp.text = TextSpan(text: s, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: c));
      tp.layout();
      tp.paint(canvas, o);
    }

    label('x', _project(3.2, 0, 0, size, scale), BacPrepColors.error);
    label('y', _project(0, 3.2, 0, size, scale), BacPrepColors.success);
    label('z', _project(0, 0, 3.2, size, scale), BacPrepColors.physics);

    // Object
    switch (mode) {
      case _Mode.plane:
        _drawPlane(canvas, size, scale);
        break;
      case _Mode.line:
        _drawLine(canvas, size, scale);
        break;
      case _Mode.sphere:
        _drawSphere(canvas, size, scale);
        break;
    }
  }

  void _drawPlane(Canvas canvas, Size size, double scale) {
    // Sample the plane on a grid of 5×5 quads, where the plane is parameterized
    // by two orthogonal vectors spanning it.
    if (pa.abs() < 1e-6 && pb.abs() < 1e-6 && pc.abs() < 1e-6) return;
    final n = _Vec3(pa, pb, pc);
    final nLen = math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
    // A point on the plane (closest to origin)
    final t0 = pd / (nLen * nLen);
    final p0 = _Vec3(pa * t0, pb * t0, pc * t0);

    // Build 2 orthogonal in-plane vectors
    final aux = (n.x.abs() < 0.9) ? const _Vec3(1, 0, 0) : const _Vec3(0, 1, 0);
    final u = _Vec3(
      n.y * aux.z - n.z * aux.y,
      n.z * aux.x - n.x * aux.z,
      n.x * aux.y - n.y * aux.x,
    );
    final uLen = math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z);
    final ux = u.x / uLen, uy = u.y / uLen, uz = u.z / uLen;
    final v = _Vec3(
      n.y * uz - n.z * uy,
      n.z * ux - n.x * uz,
      n.x * uy - n.y * ux,
    );
    final vLen = math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    final vx = v.x / vLen, vy = v.y / vLen, vz = v.z / vLen;

    const half = 2.5;
    const samples = 5;
    final fillPaint = Paint()
      ..color = BacPrepColors.physics.withValues(alpha: 0.25)
      ..style = PaintingStyle.fill;
    final edgePaint = Paint()
      ..color = BacPrepColors.physics
      ..strokeWidth = 1.2
      ..style = PaintingStyle.stroke;

    for (var i = -samples; i < samples; i++) {
      for (var j = -samples; j < samples; j++) {
        final s0 = i * half / samples;
        final s1 = (i + 1) * half / samples;
        final t0 = j * half / samples;
        final t1 = (j + 1) * half / samples;
        final p1 = _Vec3(p0.x + ux * s0 + vx * t0, p0.y + uy * s0 + vy * t0, p0.z + uz * s0 + vz * t0);
        final p2 = _Vec3(p0.x + ux * s1 + vx * t0, p0.y + uy * s1 + vy * t0, p0.z + uz * s1 + vz * t0);
        final p3 = _Vec3(p0.x + ux * s1 + vx * t1, p0.y + uy * s1 + vy * t1, p0.z + uz * s1 + vz * t1);
        final p4 = _Vec3(p0.x + ux * s0 + vx * t1, p0.y + uy * s0 + vy * t1, p0.z + uz * s0 + vz * t1);
        final path = Path()
          ..moveTo(_project(p1.x, p1.y, p1.z, size, scale).dx, _project(p1.x, p1.y, p1.z, size, scale).dy)
          ..lineTo(_project(p2.x, p2.y, p2.z, size, scale).dx, _project(p2.x, p2.y, p2.z, size, scale).dy)
          ..lineTo(_project(p3.x, p3.y, p3.z, size, scale).dx, _project(p3.x, p3.y, p3.z, size, scale).dy)
          ..lineTo(_project(p4.x, p4.y, p4.z, size, scale).dx, _project(p4.x, p4.y, p4.z, size, scale).dy)
          ..close();
        canvas.drawPath(path, fillPaint);
        canvas.drawPath(path, edgePaint);
      }
    }

    // Normal vector at p0
    final nUnit = _Vec3(n.x / nLen, n.y / nLen, n.z / nLen);
    final tip = _Vec3(p0.x + nUnit.x, p0.y + nUnit.y, p0.z + nUnit.z);
    final p0s = _project(p0.x, p0.y, p0.z, size, scale);
    final tipS = _project(tip.x, tip.y, tip.z, size, scale);
    canvas.drawLine(p0s, tipS, Paint()..color = BacPrepColors.error..strokeWidth = 2);
    canvas.drawCircle(tipS, 3, Paint()..color = BacPrepColors.error);
  }

  void _drawLine(Canvas canvas, Size size, double scale) {
    final uLen = math.sqrt(lu.x * lu.x + lu.y * lu.y + lu.z * lu.z);
    if (uLen < 1e-6) return;
    final ux = lu.x / uLen, uy = lu.y / uLen, uz = lu.z / uLen;
    const tStart = -4.0, tEnd = 4.0;
    final start = _Vec3(lp.x + ux * tStart, lp.y + uy * tStart, lp.z + uz * tStart);
    final end = _Vec3(lp.x + ux * tEnd, lp.y + uy * tEnd, lp.z + uz * tEnd);
    final s = _project(start.x, start.y, start.z, size, scale);
    final e = _project(end.x, end.y, end.z, size, scale);
    canvas.drawLine(s, e, Paint()..color = BacPrepColors.physics..strokeWidth = 2);
    // Point P₀
    final p0 = _project(lp.x, lp.y, lp.z, size, scale);
    canvas.drawCircle(p0, 5, Paint()..color = BacPrepColors.error);
    // u arrow
    final up = _Vec3(lp.x + ux, lp.y + uy, lp.z + uz);
    final uS = _project(up.x, up.y, up.z, size, scale);
    canvas.drawLine(p0, uS, Paint()..color = BacPrepColors.accent..strokeWidth = 2);
    canvas.drawCircle(uS, 3, Paint()..color = BacPrepColors.accent);
  }

  void _drawSphere(Canvas canvas, Size size, double scale) {
    // Render as 3 great circles + a fill blob.
    final cS = _project(sc.x, sc.y, sc.z, size, scale);
    final ringPaint = Paint()
      ..color = BacPrepColors.physics
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2;
    void greatCircle(int axis) {
      final path = Path();
      const samples = 80;
      for (var i = 0; i <= samples; i++) {
        final ang = 2 * math.pi * i / samples;
        double dx, dy, dz;
        switch (axis) {
          case 0: // y-z plane
            dx = 0;
            dy = sr * math.cos(ang);
            dz = sr * math.sin(ang);
            break;
          case 1: // x-z plane
            dx = sr * math.cos(ang);
            dy = 0;
            dz = sr * math.sin(ang);
            break;
          default: // x-y plane
            dx = sr * math.cos(ang);
            dy = sr * math.sin(ang);
            dz = 0;
        }
        final p = _project(sc.x + dx, sc.y + dy, sc.z + dz, size, scale);
        if (i == 0) {
          path.moveTo(p.dx, p.dy);
        } else {
          path.lineTo(p.dx, p.dy);
        }
      }
      canvas.drawPath(path, ringPaint);
    }

    // Faint disc to suggest volume
    canvas.drawCircle(
      cS,
      sr * scale,
      Paint()..color = BacPrepColors.physics.withValues(alpha: 0.10),
    );
    greatCircle(0);
    greatCircle(1);
    greatCircle(2);
    canvas.drawCircle(cS, 4, Paint()..color = BacPrepColors.error);
  }

  @override
  bool shouldRepaint(covariant _ScenePainter oldDelegate) =>
      oldDelegate.azim != azim ||
      oldDelegate.elev != elev ||
      oldDelegate.mode != mode ||
      oldDelegate.pa != pa ||
      oldDelegate.pb != pb ||
      oldDelegate.pc != pc ||
      oldDelegate.pd != pd ||
      oldDelegate.lp.x != lp.x ||
      oldDelegate.lp.y != lp.y ||
      oldDelegate.lp.z != lp.z ||
      oldDelegate.lu.x != lu.x ||
      oldDelegate.lu.y != lu.y ||
      oldDelegate.lu.z != lu.z ||
      oldDelegate.sc.x != sc.x ||
      oldDelegate.sc.y != sc.y ||
      oldDelegate.sc.z != sc.z ||
      oldDelegate.sr != sr;
}
