import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class NotificationService {
  static final _plugin = FlutterLocalNotificationsPlugin();
  static const _dailyReminderId = 0;
  static const _prefsEnabledKey = 'notifications_enabled';
  static const _prefsTimeKey = 'notification_time';

  /// Local notifications aren't supported on Flutter web; all methods become no-ops.
  static bool get _supported => !kIsWeb;

  static Future<void> init() async {
    if (!_supported) return;
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings(
      requestAlertPermission: false,
      requestBadgePermission: false,
      requestSoundPermission: false,
    );
    const settings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );
    await _plugin.initialize(settings);
  }

  static Future<bool> requestPermission() async {
    if (!_supported) return false;
    final android = _plugin.resolvePlatformSpecificImplementation<
        AndroidFlutterLocalNotificationsPlugin>();
    if (android != null) {
      final granted = await android.requestNotificationsPermission();
      return granted ?? false;
    }
    final ios = _plugin.resolvePlatformSpecificImplementation<
        IOSFlutterLocalNotificationsPlugin>();
    if (ios != null) {
      final granted = await ios.requestPermissions(alert: true, badge: true, sound: true);
      return granted ?? false;
    }
    return true;
  }

  static Future<void> scheduleDailyReminder({
    required TimeOfDay time,
    String title = 'BacPrep',
    String body = 'Tu as des questions à réviser ! 📚',
  }) async {
    if (!_supported) return;
    await _plugin.cancel(_dailyReminderId);

    final now = DateTime.now();
    var scheduledDate = DateTime(now.year, now.month, now.day, time.hour, time.minute);
    if (scheduledDate.isBefore(now)) {
      scheduledDate = scheduledDate.add(const Duration(days: 1));
    }

    const androidDetails = AndroidNotificationDetails(
      'daily_reminder',
      'Rappels quotidiens',
      channelDescription: 'Rappels de révision quotidiens',
      importance: Importance.high,
      priority: Priority.high,
    );
    const details = NotificationDetails(android: androidDetails);

    await _plugin.periodicallyShow(
      _dailyReminderId,
      title,
      body,
      RepeatInterval.daily,
      details,
      androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
    );

    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_prefsEnabledKey, true);
    await prefs.setString(_prefsTimeKey, '${time.hour}:${time.minute}');
  }

  static Future<void> cancelDailyReminder() async {
    if (!_supported) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(_prefsEnabledKey, false);
      return;
    }
    await _plugin.cancel(_dailyReminderId);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_prefsEnabledKey, false);
  }

  static Future<bool> isEnabled() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_prefsEnabledKey) ?? false;
  }

  static Future<TimeOfDay> getSavedTime() async {
    final prefs = await SharedPreferences.getInstance();
    final timeStr = prefs.getString(_prefsTimeKey);
    if (timeStr != null) {
      final parts = timeStr.split(':');
      return TimeOfDay(hour: int.parse(parts[0]), minute: int.parse(parts[1]));
    }
    return const TimeOfDay(hour: 19, minute: 0); // default 7 PM
  }
}
