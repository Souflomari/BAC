import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../l10n/app_localizations.dart';
import '../../widgets/papier/papier_tab_bar.dart';

/// App shell with Papier-style Roman-numeral tab bar.
class AppShell extends StatelessWidget {
  final Widget child;
  const AppShell({super.key, required this.child});

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
    return Scaffold(
      body: child,
      bottomNavigationBar: PapierTabBar(
        currentIndex: _currentIndex(context),
        onTap: (i) {
          switch (i) {
            case 0: context.go('/home');
            case 1: context.go('/subjects');
            case 2: context.go('/progress');
            case 3: context.go('/settings');
          }
        },
        items: [
          PapierTabItem(numeral: 'I',   label: l.home),
          PapierTabItem(numeral: 'II',  label: l.navSubjects),
          PapierTabItem(numeral: 'III', label: l.navProgress),
          PapierTabItem(numeral: 'IV',  label: l.settings),
        ],
      ),
    );
  }
}
