import 'package:flutter/foundation.dart';
import 'package:posthog_flutter/posthog_flutter.dart';

/// Thin wrapper around PostHog. No-ops when [POSTHOG_API_KEY] is not set
/// at build time, so dev/prod can ship without an account.
///
/// Build with `--dart-define=POSTHOG_API_KEY=phc_…` to activate.
class Analytics {
  static const _apiKey = String.fromEnvironment('POSTHOG_API_KEY');

  static bool get enabled => _apiKey.isNotEmpty;

  /// Fires once at app startup. Safe to call without checking [enabled];
  /// PostHog reads its config from a build-time MANIFEST entry as well as
  /// runtime, so the SDK won't actually emit when key is empty.
  static Future<void> init() async {
    if (!enabled) return;
    // posthog_flutter auto-initialises from native config on iOS/Android
    // and from the script tag on web. Nothing else to do here.
  }

  /// Track a custom event. Falls silent when disabled.
  static void event(String name, [Map<String, Object>? properties]) {
    if (!enabled) return;
    try {
      Posthog().capture(eventName: name, properties: properties);
    } catch (e) {
      if (kDebugMode) debugPrint('Analytics.event error: $e');
    }
  }

  /// Identify the current user (call after sign-in).
  static void identify(String userId, {Map<String, Object>? properties}) {
    if (!enabled) return;
    try {
      Posthog().identify(userId: userId, userProperties: properties);
    } catch (e) {
      if (kDebugMode) debugPrint('Analytics.identify error: $e');
    }
  }

  /// Forget the current user (call on sign-out).
  static void reset() {
    if (!enabled) return;
    try {
      Posthog().reset();
    } catch (e) {
      if (kDebugMode) debugPrint('Analytics.reset error: $e');
    }
  }
}
