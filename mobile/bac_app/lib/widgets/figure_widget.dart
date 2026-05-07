import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/// Renders an SVG figure from JSONB data.
/// Expected JSON shape: { "svg": "<svg ...>...</svg>", "alt_text": "..." }
/// If [figure] is null, renders nothing (backward compatible).
class FigureWidget extends StatelessWidget {
  final Map<String, dynamic>? figure;

  const FigureWidget({super.key, this.figure});

  @override
  Widget build(BuildContext context) {
    if (figure == null) return const SizedBox.shrink();
    final svg = figure!['svg'] as String?;
    if (svg == null || svg.isEmpty) return const SizedBox.shrink();

    final altText = figure!['alt_text'] as String? ?? '';

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Column(
        children: [
          Container(
            width: double.infinity,
            constraints: const BoxConstraints(maxHeight: 320),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: Theme.of(context).dividerColor.withValues(alpha: 0.2),
              ),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: InteractiveViewer(
                minScale: 1.0,
                maxScale: 3.0,
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: SvgPicture.string(
                    svg,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            ),
          ),
          if (altText.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(
              altText,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                    fontStyle: FontStyle.italic,
                  ),
              textAlign: TextAlign.center,
            ),
          ],
        ],
      ),
    );
  }
}
