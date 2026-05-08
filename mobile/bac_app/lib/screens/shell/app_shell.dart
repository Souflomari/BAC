import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../widgets/papier/papier_tab_bar.dart';
import '../../widgets/papier/papier_top_nav.dart';

/// App shell with Papier-style navigation.
///
/// On phones (width < 800) renders the bottom PapierTabBar.
/// On tablets/desktop renders a Papier-styled top nav (PapierTopNav) with
/// body content centered at maxWidth 1200 so it reads as a website rather
/// than a phone-app-on-desktop.
class AppShell extends StatelessWidget {
  final Widget child;
  const AppShell({super.key, required this.child});

  static const double _wideBreakpoint = 800;
  static const double _maxContentWidth = 1200;

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    if (location.startsWith('/home')) return 0;
    if (location.startsWith('/subjects')) return 1;
    if (location.startsWith('/progress')) return 2;
    if (location.startsWith('/settings')) return 3;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= _wideBreakpoint;
    final selected = _currentIndex(context);

    if (!isWide) {
      // Phone layout — bottom tab bar, unchanged.
      return Scaffold(
        body: child,
        bottomNavigationBar: PapierTabBar(
          currentIndex: selected,
          onTap: (i) {
            switch (i) {
              case 0:
                context.go('/home');
              case 1:
                context.go('/subjects');
              case 2:
                context.go('/progress');
              case 3:
                context.go('/settings');
            }
          },
          items: [
            PapierTabItem(numeral: 'I', label: l.home),
            PapierTabItem(numeral: 'II', label: l.navSubjects),
            PapierTabItem(numeral: 'III', label: l.navProgress),
            PapierTabItem(numeral: 'IV', label: l.settings),
          ],
        ),
      );
    }

    // Tablet / desktop: top nav + centered, width-bounded body.
    return Scaffold(
      backgroundColor: Papier.bg,
      body: Column(
        children: [
          PapierTopNav(selectedIndex: selected),
          Expanded(
            child: Center(
              child: ConstrainedBox(
                constraints:
                    const BoxConstraints(maxWidth: _maxContentWidth),
                child: child,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
