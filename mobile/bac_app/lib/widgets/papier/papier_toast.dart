import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Tone of a toast — drives the left accent bar color and icon.
enum PapierToastTone { note, success, warning, error }

/// Papier-styled toast / snackbar replacement.
///
/// Renders an OverlayEntry near the bottom of the screen with cream surface,
/// ink border, optional left color bar and icon. Auto-dismisses after [duration].
/// Tap to dismiss earlier.
///
/// Usage:
///   PapierToast.show(context, 'Bienvenue.');
///   PapierToast.success(context, 'Profil enregistré.');
///   PapierToast.error(context, 'Connexion impossible.');
class PapierToast {
  static OverlayEntry? _current;

  static void show(
    BuildContext context, {
    required String message,
    PapierToastTone tone = PapierToastTone.note,
    Duration duration = const Duration(seconds: 3),
  }) {
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) return;

    // Dismiss any current toast first.
    _current?.remove();
    _current = null;

    final entry = OverlayEntry(builder: (_) {
      return _ToastWidget(
        message: message,
        tone: tone,
        duration: duration,
        onDismiss: () {
          _current?.remove();
          _current = null;
        },
      );
    });
    _current = entry;
    overlay.insert(entry);
  }

  static void note(BuildContext context, String message) =>
      show(context, message: message, tone: PapierToastTone.note);
  static void success(BuildContext context, String message) =>
      show(context, message: message, tone: PapierToastTone.success);
  static void warning(BuildContext context, String message) =>
      show(context, message: message, tone: PapierToastTone.warning);
  static void error(BuildContext context, String message) =>
      show(context, message: message, tone: PapierToastTone.error);
}

class _ToastWidget extends StatefulWidget {
  final String message;
  final PapierToastTone tone;
  final Duration duration;
  final VoidCallback onDismiss;

  const _ToastWidget({
    required this.message,
    required this.tone,
    required this.duration,
    required this.onDismiss,
  });

  @override
  State<_ToastWidget> createState() => _ToastWidgetState();
}

class _ToastWidgetState extends State<_ToastWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _opacity;
  late final Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      reverseDuration: const Duration(milliseconds: 160),
      vsync: this,
    );
    _opacity = CurvedAnimation(parent: _controller, curve: Curves.easeOut);
    _slide = Tween<Offset>(begin: const Offset(0, 0.4), end: Offset.zero)
        .animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));
    _controller.forward();
    Future.delayed(widget.duration, _dismiss);
  }

  Future<void> _dismiss() async {
    if (!mounted) return;
    await _controller.reverse();
    if (mounted) widget.onDismiss();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final color = switch (widget.tone) {
      PapierToastTone.success => Papier.green,
      PapierToastTone.warning => Papier.gold,
      PapierToastTone.error => Papier.red,
      PapierToastTone.note => Papier.indigo,
    };
    final icon = switch (widget.tone) {
      PapierToastTone.success => Icons.check_circle_outline,
      PapierToastTone.warning => Icons.warning_amber_outlined,
      PapierToastTone.error => Icons.error_outline,
      PapierToastTone.note => Icons.info_outline,
    };

    final media = MediaQuery.of(context);
    return Positioned(
      left: 0,
      right: 0,
      bottom: 28 + media.viewInsets.bottom + media.padding.bottom,
      child: SafeArea(
        top: false,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SlideTransition(
                position: _slide,
                child: FadeTransition(
                  opacity: _opacity,
                  child: Material(
                    color: Colors.transparent,
                    child: GestureDetector(
                      onTap: _dismiss,
                      child: Container(
                        decoration: BoxDecoration(
                          color: Papier.surface,
                          border: Border(
                            left: BorderSide(color: color, width: 3),
                            top: const BorderSide(color: Papier.ink, width: 1),
                            right: const BorderSide(color: Papier.ink, width: 1),
                            bottom: const BorderSide(color: Papier.ink, width: 1),
                          ),
                          boxShadow: const [
                            BoxShadow(
                              color: Color(0x22000000),
                              offset: Offset(0, 4),
                              blurRadius: 12,
                            ),
                          ],
                        ),
                        padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
                        child: Row(
                          children: [
                            Icon(icon, size: 18, color: color),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                widget.message,
                                style: PapierType.serif(
                                  fontSize: 14,
                                  color: Papier.ink,
                                  height: 1.45,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
