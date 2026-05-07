import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../widgets/papier/papier_tab_bar.dart';

/// App shell with Papier-style Roman-numeral navigation.
///
/// On phones (width < 800) renders the bottom tab bar.
/// On tablets/desktop renders a Papier-styled NavigationRail on the left,
/// with body content centered at maxWidth 1200 so it reads naturally on
/// wide monitors instead of stretching edge-to-edge.
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

  void _go(BuildContext context, int i) {
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
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= _wideBreakpoint;

    final destinations = [
      (numeral: 'I', label: l.home, icon: Icons.menu_book_outlined),
      (numeral: 'II', label: l.navSubjects, icon: Icons.school_outlined),
      (numeral: 'III', label: l.navProgress, icon: Icons.timeline_outlined),
      (numeral: 'IV', label: l.settings, icon: Icons.settings_outlined),
    ];

    if (!isWide) {
      // Phone layout — unchanged.
      return Scaffold(
        body: child,
        bottomNavigationBar: PapierTabBar(
          currentIndex: _currentIndex(context),
          onTap: (i) => _go(context, i),
          items: destinations
              .map((d) => PapierTabItem(numeral: d.numeral, label: d.label))
              .toList(),
        ),
      );
    }

    // Tablet / desktop layout: rail + centered, width-bounded body.
    final extended = width >= 1100;
    final selected = _currentIndex(context);
    return Scaffold(
      body: Row(
        children: [
          Container(
            decoration: const BoxDecoration(
              color: Papier.surface,
              border: Border(right: BorderSide(color: Papier.ink, width: 2)),
            ),
            child: NavigationRail(
              backgroundColor: Papier.surface,
              selectedIndex: selected,
              onDestinationSelected: (i) => _go(context, i),
              extended: extended,
              minWidth: 72,
              minExtendedWidth: 200,
              indicatorColor: Papier.bg2,
              labelType: extended
                  ? NavigationRailLabelType.none
                  : NavigationRailLabelType.all,
              selectedLabelTextStyle: PapierType.serif(
                fontSize: 12,
                color: Papier.ink,
                fontWeight: FontWeight.w500,
              ),
              unselectedLabelTextStyle: PapierType.serif(
                fontSize: 12,
                color: Papier.ink3,
              ),
              selectedIconTheme: const IconThemeData(color: Papier.ink),
              unselectedIconTheme: const IconThemeData(color: Papier.ink3),
              leading: Padding(
                padding: const EdgeInsets.only(top: 16, bottom: 8),
                child: Text(
                  'BacPrep',
                  style: PapierType.serif(
                    fontSize: extended ? 20 : 14,
                    color: Papier.ink,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              destinations: [
                for (final d in destinations)
                  NavigationRailDestination(
                    icon: Icon(d.icon),
                    selectedIcon: Icon(d.icon, color: Papier.red),
                    label: Text('${d.numeral} · ${d.label}'),
                  ),
              ],
            ),
          ),
          Expanded(
            child: Container(
              color: Papier.bg,
              child: Center(
                child: ConstrainedBox(
                  constraints:
                      const BoxConstraints(maxWidth: _maxContentWidth),
                  child: child,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
