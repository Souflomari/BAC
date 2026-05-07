import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../services/notification_service.dart';

class NotificationSettingsScreen extends StatefulWidget {
  const NotificationSettingsScreen({super.key});

  @override
  State<NotificationSettingsScreen> createState() => _NotificationSettingsScreenState();
}

class _NotificationSettingsScreenState extends State<NotificationSettingsScreen> {
  bool _enabled = false;
  TimeOfDay _reminderTime = const TimeOfDay(hour: 19, minute: 0);
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final enabled = await NotificationService.isEnabled();
    final time = await NotificationService.getSavedTime();
    if (mounted) {
      setState(() {
        _enabled = enabled;
        _reminderTime = time;
        _loading = false;
      });
    }
  }

  Future<void> _toggleNotifications(bool value) async {
    if (value) {
      final granted = await NotificationService.requestPermission();
      if (!granted) return;
      await NotificationService.scheduleDailyReminder(time: _reminderTime);
    } else {
      await NotificationService.cancelDailyReminder();
    }
    setState(() => _enabled = value);
  }

  Future<void> _pickTime() async {
    final picked = await showTimePicker(
      context: context,
      initialTime: _reminderTime,
    );
    if (picked != null) {
      setState(() => _reminderTime = picked);
      if (_enabled) {
        await NotificationService.scheduleDailyReminder(time: picked);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(l.notifications)),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.all(Spacing.lg),
              children: [
                SwitchListTile(
                  title: Text(l.studyReminders),
                  subtitle: Text(l.dailyReminderSubtitle),
                  value: _enabled,
                  onChanged: _toggleNotifications,
                  activeColor: BacPrepColors.primary,
                ),
                const SizedBox(height: Spacing.md),
                ListTile(
                  enabled: _enabled,
                  leading: const Icon(Icons.access_time),
                  title: Text(l.reminderTime),
                  subtitle: Text(_reminderTime.format(context)),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: _enabled ? _pickTime : null,
                ),
              ],
            ),
    );
  }
}
