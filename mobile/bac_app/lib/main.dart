import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sentry_flutter/sentry_flutter.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'app.dart';
import 'services/analytics_service.dart';
import 'services/cache_service.dart';
import 'services/notification_service.dart';
import 'widgets/global_error_boundary.dart';

const _sentryDsn = String.fromEnvironment('SENTRY_DSN');

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Replace the default red Flutter ErrorWidget with a Papier-styled pane.
  GlobalErrorBoundary.install();

  await Supabase.initialize(
    url: const String.fromEnvironment('SUPABASE_URL',
        defaultValue: 'https://your-project.supabase.co'),
    anonKey: const String.fromEnvironment('SUPABASE_ANON_KEY',
        defaultValue: 'your-anon-key'),
  );

  // Hive boxes must be open before any Hive.box() call — await this.
  await CacheService.init();

  // Notifications don't affect startup rendering — run non-blocking.
  unawaited(NotificationService.init());

  // Analytics SDK setup (no-op when POSTHOG_API_KEY is empty).
  unawaited(Analytics.init());

  if (_sentryDsn.isNotEmpty) {
    await SentryFlutter.init(
      (o) {
        o.dsn = _sentryDsn;
        o.tracesSampleRate = 0.1;
        o.environment = kReleaseMode ? 'production' : 'dev';
      },
      appRunner: () => runApp(const ProviderScope(child: BacPrepApp())),
    );
  } else {
    runApp(const ProviderScope(child: BacPrepApp()));
  }
}
