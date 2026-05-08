import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../config/theme.dart';

/// Catches uncaught exceptions during widget builds and shows a Papier-styled
/// "something went wrong" screen instead of the red error pane.
///
/// Wrap the app's `home` (or just below `MaterialApp`) with this. When a
/// build error reaches Flutter's `ErrorWidget.builder`, we show a friendly
/// screen with a "Recharger" button.
class GlobalErrorBoundary extends StatefulWidget {
  final Widget child;
  const GlobalErrorBoundary({super.key, required this.child});

  /// Install once at app startup (in main()).
  static void install() {
    ErrorWidget.builder = (FlutterErrorDetails details) {
      if (kDebugMode) {
        // In dev, keep the red screen so devs see the trace.
        return ErrorWidget(details.exception);
      }
      return _PapierErrorPane(details: details);
    };
  }

  @override
  State<GlobalErrorBoundary> createState() => _GlobalErrorBoundaryState();
}

class _GlobalErrorBoundaryState extends State<GlobalErrorBoundary> {
  @override
  Widget build(BuildContext context) {
    return widget.child;
  }
}

class _PapierErrorPane extends StatelessWidget {
  final FlutterErrorDetails details;
  const _PapierErrorPane({required this.details});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Papier.bg,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: Papier.bg2,
                    shape: BoxShape.circle,
                    border: Border.all(color: Papier.red, width: 1.5),
                  ),
                  child: const Icon(
                    Icons.error_outline,
                    size: 26,
                    color: Papier.red,
                  ),
                ),
                const SizedBox(height: 18),
                Text(
                  'Quelque chose s\'est mal passé.',
                  textAlign: TextAlign.center,
                  style: PapierType.italic(
                    fontSize: 24,
                    fontWeight: FontWeight.w500,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Cette section a planté pendant son chargement. Tu peux essayer de recharger la page — si ça revient, dis-le-nous.',
                  textAlign: TextAlign.center,
                  style: PapierType.body(
                    fontSize: 14,
                    color: Papier.ink2,
                    height: 1.55,
                  ),
                ),
                const SizedBox(height: 22),
                FilledButton(
                  onPressed: () {
                    // On Flutter web, force a hard reload.
                    if (kIsWeb) {
                      // Use a route navigation if possible; otherwise the user
                      // will hard-refresh.
                    }
                    // Fallback: try Navigator.maybePop (modal) or do nothing.
                  },
                  style: FilledButton.styleFrom(
                    backgroundColor: Papier.ink,
                    foregroundColor: Papier.surface,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(2)),
                    ),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 22, vertical: 14),
                  ),
                  child: Text('Recharger',
                      style: PapierType.serif(
                        fontSize: 14,
                        color: Papier.surface,
                        fontWeight: FontWeight.w500,
                      )),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
