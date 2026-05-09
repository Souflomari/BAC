import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/profile.dart';
import '../../providers/auth_provider.dart';
import '../../providers/locale_provider.dart';
import '../../providers/theme_provider.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/papier/papier_toast.dart';
import 'daily_goal_picker.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(profileProvider);
    final l = AppLocalizations.of(context)!;
    final currentLocale = ref.watch(localeProvider);
    final isArabic = currentLocale.languageCode == 'ar';

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.22),
          SafeArea(
            child: ListView(
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.fromLTRB(22, 20, 22, 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'PARAMÈTRES',
                        style: PapierType.smallCaps(color: Papier.ink3),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        l.settings,
                        style: PapierType.italic(fontSize: 28, letterSpacing: -0.5),
                      ),
                      const SizedBox(height: 8),
                      const DoubleRule(),
                    ],
                  ),
                ),

                // Compte section header
                Padding(
                  padding: const EdgeInsets.fromLTRB(22, 0, 22, 4),
                  child: Text(
                    'COMPTE',
                    style: PapierType.smallCaps(color: Papier.ink3),
                  ),
                ),

                // Profile preview card → tap to open ProfileScreen
                profileAsync.when(
                  data: (profile) {
                    if (profile == null) return const SizedBox.shrink();
                    return InkWell(
                      onTap: () => context.push('/profile'),
                      child: Container(
                        margin: const EdgeInsets.fromLTRB(22, 4, 22, 20),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Papier.surface,
                          border: Border.all(color: Papier.ink, width: 1.5),
                        ),
                        child: Row(
                          children: [
                            // Initial stamp
                            Container(
                              width: 54,
                              height: 54,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border:
                                    Border.all(color: Papier.ink, width: 1.5),
                                color: Papier.bg2,
                              ),
                              child: Center(
                                child: Text(
                                  profile.displayName.isNotEmpty
                                      ? profile.displayName[0].toUpperCase()
                                      : '?',
                                  style: PapierType.italic(
                                    fontSize: 22,
                                    color: Papier.ink,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    profile.displayName,
                                    style: PapierType.serif(fontSize: 17),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    isArabic
                                        ? profile.bacStream.labelAr
                                        : profile.bacStream.labelFr,
                                    style: PapierType.mono(
                                      fontSize: 9,
                                      color: Papier.ink3,
                                      letterSpacing: 1.2,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Text(
                              '→',
                              style: PapierType.italic(
                                  fontSize: 18, color: Papier.ink3),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                  loading: () => const SizedBox.shrink(),
                  error: (_, __) => const SizedBox.shrink(),
                ),

                // Settings section header
                Padding(
                  padding: const EdgeInsets.fromLTRB(22, 0, 22, 4),
                  child: Text(
                    'PRÉFÉRENCES',
                    style: PapierType.smallCaps(color: Papier.ink3),
                  ),
                ),

                // Settings tiles
                _PapierTile(
                  label: l.bacStream,
                  value: isArabic
                      ? (profileAsync.valueOrNull?.bacStream.labelAr ?? '')
                      : (profileAsync.valueOrNull?.bacStream.labelFr ?? ''),
                  onTap: () => _confirmStreamSwitch(context),
                ),
                _PapierTile(
                  label: l.dailyGoal,
                  value: l.minutesGoal(
                    profileAsync.valueOrNull?.dailyGoalMinutes ?? 15,
                  ),
                  onTap: () => _showDailyGoalPicker(context, ref),
                ),
                _PapierTile(
                  label: l.language,
                  value: isArabic ? l.arabic : l.french,
                  onTap: () => _showLanguagePicker(context, ref),
                ),
                _PapierTile(
                  label: l.theme,
                  value: _themeLabel(l, ref.watch(themeModeProvider)),
                  onTap: () => _showThemePicker(context, ref),
                ),
                _PapierTile(
                  label: l.notifications,
                  value: l.studyReminders,
                  onTap: () => context.push('/settings/notifications'),
                  isLast: true,
                ),

                const SizedBox(height: 24),

                // À propos
                Padding(
                  padding: const EdgeInsets.fromLTRB(22, 0, 22, 4),
                  child: Text(
                    'À PROPOS',
                    style: PapierType.smallCaps(color: Papier.ink3),
                  ),
                ),
                _PapierTile(
                  label: 'Version',
                  value: '1.0.0',
                  onTap: () {},
                ),
                _PapierTile(
                  label: 'Confidentialité',
                  value: 'Comment on protège tes données',
                  onTap: () {},
                ),
                _PapierTile(
                  label: 'Conditions d\'utilisation',
                  value: '',
                  onTap: () {},
                ),
                _PapierTile(
                  label: 'Notes de version',
                  value: "Quoi de neuf, qu'arrive-t-il ensuite",
                  onTap: () => context.push('/docs'),
                ),
                _PapierTile(
                  label: 'À propos de BacPrep',
                  value: 'Mission, équipe, contact',
                  onTap: () {},
                  isLast: true,
                ),

                const SizedBox(height: 28),

                // Sign out
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 22),
                  child: GestureDetector(
                    onTap: () async {
                      await ref.read(authActionsProvider).signOut();
                      if (context.mounted) context.go('/login');
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      decoration: BoxDecoration(
                        border: Border.all(color: Papier.red, width: 1),
                      ),
                      child: Center(
                        child: Text(
                          l.signOut,
                          style: PapierType.smallCaps(
                            fontSize: 12,
                            color: Papier.red,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 14),

                // Delete account (low-key text link, double-confirm modal)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 22),
                  child: GestureDetector(
                    onTap: () => _confirmDeleteAccount(context, ref),
                    child: Center(
                      child: Text(
                        'Supprimer mon compte',
                        style: PapierType.italic(
                          fontSize: 13,
                          color: Papier.ink3,
                        ).copyWith(decoration: TextDecoration.underline),
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 80),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showDailyGoalPicker(BuildContext context, WidgetRef ref) {
    final currentGoal =
        ref.read(profileProvider).valueOrNull?.dailyGoalMinutes ?? 15;
    showModalBottomSheet(
      context: context,
      backgroundColor: Papier.surface,
      builder: (_) => DailyGoalPicker(
        currentGoal: currentGoal,
        onChanged: (newGoal) {
          final profile = ref.read(profileProvider).valueOrNull;
          if (profile != null) {
            final updated = profile.copyWith(dailyGoalMinutes: newGoal);
            ref.read(apiServiceProvider).updateProfile(updated);
            ref.invalidate(profileProvider);
          }
        },
      ),
    );
  }

  void _showLanguagePicker(BuildContext context, WidgetRef ref) {
    final l = AppLocalizations.of(context)!;
    final currentLocale = ref.read(localeProvider);

    showModalBottomSheet(
      context: context,
      backgroundColor: Papier.surface,
      builder: (ctx) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(22, 20, 22, 4),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(l.chooseLanguage, style: PapierType.italic(fontSize: 22)),
                  const SizedBox(height: 8),
                  const DoubleRule(),
                ],
              ),
            ),
            _RadioTile(
              label: 'Français',
              isSelected: currentLocale.languageCode == 'fr',
              onTap: () => _setLanguage(context, ref, ContentLanguage.fr),
            ),
            _RadioTile(
              label: 'العربية',
              isSelected: currentLocale.languageCode == 'ar',
              onTap: () => _setLanguage(context, ref, ContentLanguage.ar),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  void _setLanguage(BuildContext context, WidgetRef ref, ContentLanguage lang) {
    Navigator.pop(context);
    ref.read(localeProvider.notifier).state = Locale(lang.value);
    final profile = ref.read(profileProvider).valueOrNull;
    if (profile != null) {
      final updated = profile.copyWith(preferredLanguage: lang);
      ref.read(apiServiceProvider).updateProfile(updated);
      ref.invalidate(profileProvider);
    }
  }

  String _themeLabel(AppLocalizations l, ThemeMode mode) {
    switch (mode) {
      case ThemeMode.light:
        return l.themeLight;
      case ThemeMode.dark:
        return l.themeDark;
      case ThemeMode.system:
        return l.themeSystem;
    }
  }

  void _showThemePicker(BuildContext context, WidgetRef ref) {
    final l = AppLocalizations.of(context)!;
    final current = ref.read(themeModeProvider);

    showModalBottomSheet(
      context: context,
      backgroundColor: Papier.surface,
      builder: (ctx) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(22, 20, 22, 4),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(l.chooseTheme, style: PapierType.italic(fontSize: 22)),
                  const SizedBox(height: 8),
                  const DoubleRule(),
                ],
              ),
            ),
            _RadioTile(
              label: l.themeSystem,
              isSelected: current == ThemeMode.system,
              onTap: () => _setTheme(context, ref, ThemeMode.system),
            ),
            _RadioTile(
              label: l.themeLight,
              isSelected: current == ThemeMode.light,
              onTap: () => _setTheme(context, ref, ThemeMode.light),
            ),
            _RadioTile(
              label: l.themeDark,
              isSelected: current == ThemeMode.dark,
              onTap: () => _setTheme(context, ref, ThemeMode.dark),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  void _setTheme(BuildContext context, WidgetRef ref, ThemeMode mode) {
    Navigator.pop(context);
    ref.read(themeModeProvider.notifier).setMode(mode);
  }

  Future<void> _confirmStreamSwitch(BuildContext context) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: Papier.surface,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.zero,
          side: BorderSide(color: Papier.ink, width: 2),
        ),
        title: Text('Changer de filière',
            style: PapierType.italic(fontSize: 22, fontWeight: FontWeight.w500)),
        content: Text(
          "Cela ne supprimera pas ta progression, mais les chapitres affichés changeront. Continuer ?",
          style: PapierType.body(fontSize: 14, color: Papier.ink2, height: 1.5),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: Text('Annuler',
                style: PapierType.smallCaps(fontSize: 12, color: Papier.ink2)),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: Text('Continuer',
                style: PapierType.smallCaps(fontSize: 12, color: Papier.indigo)),
          ),
        ],
      ),
    );
    if (ok == true && context.mounted) {
      context.push('/onboarding/stream');
    }
  }

  Future<void> _confirmDeleteAccount(BuildContext context, WidgetRef ref) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => const _DeleteAccountDialog(),
    );
    if (confirmed != true) return;
    if (!context.mounted) return;
    try {
      await ref.read(authActionsProvider).deleteSelfAccount();
      if (!context.mounted) return;
      // Sign out client-side; the auth.users row is gone server-side already.
      await ref.read(authActionsProvider).signOut();
      if (!context.mounted) return;
      PapierToast.success(context, 'Compte supprimé.');
      context.go('/landing');
    } catch (e) {
      if (!context.mounted) return;
      PapierToast.error(context, "Échec de la suppression. Réessaie.");
    }
  }
}

/// Two-step confirm: must type DELETE to enable the destroy button.
class _DeleteAccountDialog extends StatefulWidget {
  const _DeleteAccountDialog();

  @override
  State<_DeleteAccountDialog> createState() => _DeleteAccountDialogState();
}

class _DeleteAccountDialogState extends State<_DeleteAccountDialog> {
  final _controller = TextEditingController();
  bool _canConfirm = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Papier.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
        side: BorderSide(color: Papier.ink, width: 2),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(22, 22, 22, 18),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('SUPPRIMER LE COMPTE',
                style: PapierType.smallCaps(fontSize: 11, color: Papier.red)),
            const SizedBox(height: 6),
            Text('Action irréversible',
                style: PapierType.italic(fontSize: 22, fontWeight: FontWeight.w500)),
            const SizedBox(height: 14),
            Text(
              "Toute ta progression, tes badges, ton historique et ton compte d'auth seront effacés. Cette action ne peut pas être annulée.",
              style: PapierType.body(fontSize: 14, color: Papier.ink2, height: 1.5),
            ),
            const SizedBox(height: 18),
            Text("Tape DELETE en majuscules pour confirmer :",
                style: PapierType.body(fontSize: 13, color: Papier.ink2)),
            const SizedBox(height: 8),
            TextField(
              controller: _controller,
              autofocus: true,
              style: PapierType.mono(fontSize: 14, color: Papier.ink),
              decoration: const InputDecoration(
                filled: true,
                fillColor: Papier.bg,
                contentPadding: EdgeInsets.fromLTRB(12, 12, 12, 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.zero,
                  borderSide: BorderSide(color: Papier.line2),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.zero,
                  borderSide: BorderSide(color: Papier.line2),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.zero,
                  borderSide: BorderSide(color: Papier.ink, width: 1.5),
                ),
              ),
              onChanged: (v) =>
                  setState(() => _canConfirm = v.trim() == 'DELETE'),
            ),
            const SizedBox(height: 18),
            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => Navigator.of(context).pop(false),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      decoration:
                          BoxDecoration(border: Border.all(color: Papier.ink, width: 1.4)),
                      child: Center(
                        child: Text('Annuler',
                            style: PapierType.smallCaps(
                                fontSize: 12, color: Papier.ink)),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: GestureDetector(
                    onTap: _canConfirm
                        ? () => Navigator.of(context).pop(true)
                        : null,
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      color: _canConfirm ? Papier.red : Papier.ink3,
                      child: Center(
                        child: Text('Supprimer',
                            style: PapierType.smallCaps(
                                fontSize: 12, color: Papier.surface)),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _PapierTile extends StatelessWidget {
  final String label;
  final String value;
  final VoidCallback onTap;
  final bool isLast;

  const _PapierTile({
    required this.label,
    required this.value,
    required this.onTap,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.fromLTRB(22, 14, 22, 14),
        decoration: BoxDecoration(
          color: Papier.surface,
          border: Border(
            left: const BorderSide(color: Papier.line2),
            right: const BorderSide(color: Papier.line2),
            top: const BorderSide(color: Papier.line2),
            bottom: BorderSide(color: isLast ? Papier.line2 : Papier.line),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: PapierType.serif(fontSize: 15)),
                  if (value.isNotEmpty) ...[
                    const SizedBox(height: 2),
                    Text(
                      value,
                      style: PapierType.mono(
                        fontSize: 10,
                        color: Papier.ink3,
                        letterSpacing: 0.8,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            Text(
              '→',
              style: PapierType.italic(fontSize: 16, color: Papier.ink3),
            ),
          ],
        ),
      ),
    );
  }
}

class _RadioTile extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _RadioTile({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.fromLTRB(22, 14, 22, 14),
        decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: Papier.line)),
        ),
        child: Row(
          children: [
            Container(
              width: 16,
              height: 16,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected ? Papier.ink : Papier.line2,
                  width: 1.2,
                ),
                color: isSelected ? Papier.ink : Colors.transparent,
              ),
            ),
            const SizedBox(width: 12),
            Text(
              label,
              style: PapierType.serif(
                fontSize: 15,
                color: isSelected ? Papier.ink : Papier.ink2,
                fontStyle: isSelected ? FontStyle.italic : FontStyle.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
