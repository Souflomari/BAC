import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/theme_provider.dart';

/// Papier-styled top navigation bar.
///
/// Shown at width >= 800. Replaces the bottom PapierTabBar on tablet/desktop
/// and is also rendered standalone on the public landing page.
///
/// Layout:
///  - Left: italic Garamond logo "BacPrep" → /home (authed) or /landing (unauth)
///  - Center: nav items in small caps with red underline on selected (only at width >= 1100)
///  - Right: profile menu when authed; "Se connecter" + filled CTA when unauth
class PapierTopNav extends ConsumerWidget {
  /// Selected nav index (0 = Cahier, 1 = Sujets, 2 = Progrès, 3 = Annales).
  /// Pass null for screens that aren't one of the main nav targets (e.g. landing).
  final int? selectedIndex;

  /// Whether to render with a flat bottom edge (no shadow, just the 2px ink rule).
  final bool flat;

  const PapierTopNav({super.key, this.selectedIndex, this.flat = true});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authStateProvider);
    final isAuthed = authState.valueOrNull?.session != null;
    final width = MediaQuery.sizeOf(context).width;
    final showNavCenter = width >= 1100;

    return Container(
      height: 64,
      decoration: const BoxDecoration(
        color: Papier.surface,
        border: Border(bottom: BorderSide(color: Papier.ink, width: 2)),
      ),
      child: Row(
        children: [
          const SizedBox(width: 24),
          // Logo
          InkWell(
            onTap: () => context.go(isAuthed ? '/home' : '/landing'),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
              child: Text(
                'BacPrep',
                style: PapierType.italic(
                  fontSize: 24,
                  color: Papier.ink,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          if (showNavCenter && isAuthed) ...[
            const SizedBox(width: 32),
            _NavItem(
              label: 'Cahier',
              selected: selectedIndex == 0,
              onTap: () => context.go('/home'),
            ),
            _NavItem(
              label: 'Sujets',
              selected: selectedIndex == 1,
              onTap: () => context.go('/subjects'),
            ),
            _NavItem(
              label: 'Progrès',
              selected: selectedIndex == 2,
              onTap: () => context.go('/progress'),
            ),
            _NavItem(
              label: 'Annales',
              selected: false,
              onTap: () => context.go('/exams'),
            ),
          ],
          if (showNavCenter && !isAuthed) ...[
            const SizedBox(width: 32),
            _NavItem(label: 'Programmes', selected: false, onTap: () {}),
            _NavItem(label: 'Annales', selected: false, onTap: () {}),
            _NavItem(label: 'À propos', selected: false, onTap: () {}),
          ],
          const Spacer(),
          // Right side
          const _ThemeToggleButton(),
          const SizedBox(width: 4),
          if (isAuthed)
            _ProfileMenu()
          else ...[
            TextButton(
              onPressed: () => context.go('/login'),
              child: Text(
                'Se connecter',
                style: PapierType.serif(fontSize: 14, color: Papier.ink),
              ),
            ),
            const SizedBox(width: 12),
            FilledButton(
              onPressed: () => context.go('/login'),
              style: FilledButton.styleFrom(
                backgroundColor: Papier.ink,
                foregroundColor: Papier.surface,
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(2)),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
              ),
              child: Text(
                'Commencer',
                style: PapierType.serif(
                  fontSize: 14,
                  color: Papier.surface,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
          const SizedBox(width: 24),
        ],
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _NavItem({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 22),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              label,
              style: PapierType.smallCaps(
                fontSize: 12,
                color: selected ? Papier.ink : Papier.ink3,
                fontWeight: selected ? FontWeight.w500 : FontWeight.w400,
              ),
            ),
            const SizedBox(height: 4),
            Container(
              width: 18,
              height: 2,
              color: selected ? Papier.red : Colors.transparent,
            ),
          ],
        ),
      ),
    );
  }
}

class _ThemeToggleButton extends ConsumerWidget {
  const _ThemeToggleButton();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final mode = ref.watch(themeModeProvider);
    final notifier = ref.read(themeModeProvider.notifier);
    final (icon, tooltip) = switch (mode) {
      ThemeMode.system => (Icons.brightness_auto, 'Thème : auto (clic pour clair)'),
      ThemeMode.light => (Icons.light_mode_outlined, 'Thème : clair (clic pour sombre)'),
      ThemeMode.dark => (Icons.dark_mode_outlined, 'Thème : sombre (clic pour auto)'),
    };
    return IconButton(
      tooltip: tooltip,
      icon: Icon(icon, size: 20, color: Papier.ink),
      onPressed: () {
        final next = switch (mode) {
          ThemeMode.system => ThemeMode.light,
          ThemeMode.light => ThemeMode.dark,
          ThemeMode.dark => ThemeMode.system,
        };
        notifier.setMode(next);
      },
    );
  }
}

class _ProfileMenu extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final name = profile.valueOrNull?.displayName ?? '';
    final initial = name.isNotEmpty ? name[0].toUpperCase() : '?';
    return PopupMenuButton<String>(
      offset: const Offset(0, 56),
      onSelected: (value) async {
        if (value == 'settings') {
          context.go('/settings');
        } else if (value == 'signout') {
          await ref.read(authActionsProvider).signOut();
          if (context.mounted) context.go('/landing');
        }
      },
      itemBuilder: (_) => [
        PopupMenuItem(
          value: 'settings',
          child: Text('Paramètres', style: PapierType.serif(fontSize: 14)),
        ),
        PopupMenuItem(
          value: 'signout',
          child: Text('Se déconnecter',
              style: PapierType.serif(fontSize: 14, color: Papier.red)),
        ),
      ],
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8),
        child: Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: Papier.bg2,
            border: Border.all(color: Papier.ink, width: 1.5),
            shape: BoxShape.circle,
          ),
          alignment: Alignment.center,
          child: Text(
            initial,
            style: PapierType.italic(
              fontSize: 16,
              color: Papier.ink,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}
