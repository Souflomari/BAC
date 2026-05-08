import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'app.dart';
import 'services/cache_service.dart';
import 'services/notification_service.dart';
import 'widgets/global_error_boundary.dart';

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

  runApp(const ProviderScope(child: BacPrepApp()));
}
