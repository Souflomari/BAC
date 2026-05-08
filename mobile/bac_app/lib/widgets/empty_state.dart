import 'package:flutter/material.dart';
import '../config/theme.dart';

/// Designed empty state — what to show when a list/page has no data.
///
/// Replaces silent `SizedBox.shrink()` fallbacks. Has Papier styling (cream
/// container, ink iconography, italic Garamond headline).
class EmptyState extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? message;
  final String? actionLabel;
  final VoidCallback? onAction;
  final EdgeInsets padding;

  const EmptyState({
    super.key,
    required this.icon,
    required this.title,
    this.message,
    this.actionLabel,
    this.onAction,
    this.padding = const EdgeInsets.symmetric(horizontal: 32, vertical: 48),
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: padding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                color: Papier.bg2,
                shape: BoxShape.circle,
                border: Border.all(color: Papier.line2, width: 1),
              ),
              child: Icon(icon, size: 26, color: Papier.ink2),
            ),
            const SizedBox(height: 16),
            Text(
              title,
              textAlign: TextAlign.center,
              style: PapierType.italic(
                fontSize: 22,
                color: Papier.ink,
                fontWeight: FontWeight.w500,
                height: 1.2,
              ),
            ),
            if (message != null) ...[
              const SizedBox(height: 8),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 420),
                child: Text(
                  message!,
                  textAlign: TextAlign.center,
                  style: PapierType.body(
                    fontSize: 14,
                    color: Papier.ink2,
                    height: 1.55,
                  ),
                ),
              ),
            ],
            if (actionLabel != null && onAction != null) ...[
              const SizedBox(height: 20),
              FilledButton(
                onPressed: onAction,
                style: FilledButton.styleFrom(
                  backgroundColor: Papier.ink,
                  foregroundColor: Papier.surface,
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(2)),
                  ),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 22, vertical: 14),
                ),
                child: Text(
                  actionLabel!,
                  style: PapierType.serif(
                    fontSize: 14,
                    color: Papier.surface,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
