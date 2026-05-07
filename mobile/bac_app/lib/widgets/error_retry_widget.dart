import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../l10n/app_localizations.dart';

class ErrorRetryWidget extends StatelessWidget {
  final String? message;
  final VoidCallback? onRetry;

  const ErrorRetryWidget({super.key, this.message, this.onRetry});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(Spacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.error_outline,
              size: 48,
              color: BacPrepColors.error,
            ),
            const SizedBox(height: Spacing.md),
            Text(
              message ?? l.errorLoadingData,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: BacPrepColors.textSecondary,
              ),
            ),
            if (onRetry != null) ...[
              const SizedBox(height: Spacing.lg),
              ElevatedButton.icon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh, size: 18),
                label: Text(l.retry),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
