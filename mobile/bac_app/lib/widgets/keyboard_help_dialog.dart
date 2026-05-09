import 'package:flutter/material.dart';
import '../config/theme.dart';

/// Papier-styled overlay listing global keyboard shortcuts.
/// Open via `KeyboardHelpDialog.show(context)`.
class KeyboardHelpDialog extends StatelessWidget {
  const KeyboardHelpDialog({super.key});

  static Future<void> show(BuildContext context) {
    return showDialog<void>(
      context: context,
      builder: (_) => const KeyboardHelpDialog(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isMac = Theme.of(context).platform == TargetPlatform.macOS ||
        Theme.of(context).platform == TargetPlatform.iOS;
    final cmd = isMac ? '⌘' : 'Ctrl';

    return Dialog(
      backgroundColor: Papier.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
        side: BorderSide(color: Papier.ink, width: 2),
      ),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 480),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24, 22, 24, 18),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text('AIDE',
                  style: PapierType.smallCaps(fontSize: 11, color: Papier.red)),
              const SizedBox(height: 4),
              Text('Raccourcis clavier',
                  style: PapierType.italic(fontSize: 24, fontWeight: FontWeight.w500)),
              const SizedBox(height: 16),
              const _DoubleRule(),
              const SizedBox(height: 16),
              _Row(keys: ['$cmd', 'K'], label: 'Recherche globale'),
              _Row(keys: ['$cmd', 'F'], label: 'Rechercher dans le chapitre'),
              _Row(keys: const ['?'], label: 'Cette aide'),
              _Row(keys: const ['Esc'], label: 'Fermer une fenêtre / overlay'),
              const SizedBox(height: 8),
              const _DoubleRule(),
              const SizedBox(height: 12),
              Text(
                "Astuce : passe la souris au-dessus d'une icône pour voir son nom et son raccourci.",
                style: PapierType.italic(fontSize: 12, color: Papier.ink3, height: 1.5),
              ),
              const SizedBox(height: 18),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => Navigator.of(context).pop(),
                  child: Text('Fermer',
                      style: PapierType.smallCaps(fontSize: 12, color: Papier.ink2)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DoubleRule extends StatelessWidget {
  const _DoubleRule();
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(height: 1.2, color: Papier.ink),
        const SizedBox(height: 2),
        Container(height: 0.8, color: Papier.ink2),
      ],
    );
  }
}

class _Row extends StatelessWidget {
  final List<String> keys;
  final String label;
  const _Row({required this.keys, required this.label});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Expanded(
            child: Text(label,
                style: PapierType.body(fontSize: 14, color: Papier.ink)),
          ),
          for (var i = 0; i < keys.length; i++) ...[
            if (i > 0)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: Text('+',
                    style: PapierType.body(fontSize: 12, color: Papier.ink3)),
              ),
            _Kbd(keys[i]),
          ],
        ],
      ),
    );
  }
}

class _Kbd extends StatelessWidget {
  final String label;
  const _Kbd(this.label);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: Papier.bg,
        border: Border.all(color: Papier.ink, width: 1),
      ),
      child: Text(label,
          style: PapierType.mono(
              fontSize: 12, color: Papier.ink, fontWeight: FontWeight.w600)),
    );
  }
}
