import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'config/theme.dart';
import 'config/router.dart';
import 'l10n/app_localizations.dart';
import 'providers/locale_provider.dart';
import 'providers/theme_provider.dart';
import 'widgets/global_search.dart';

class BacPrepApp extends ConsumerWidget {
  const BacPrepApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    final locale = ref.watch(localeProvider);
    final themeMode = ref.watch(themeModeProvider);

    return MaterialApp.router(
      title: 'BacPrep',
      debugShowCheckedModeBanner: false,
      theme: BacPrepTheme.light,
      darkTheme: BacPrepTheme.dark,
      themeMode: themeMode,
      routerConfig: router,
      locale: locale,
      supportedLocales: AppLocalizations.supportedLocales,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      builder: (context, child) {
        return _GlobalShortcuts(child: child ?? const SizedBox.shrink());
      },
    );
  }
}

/// Global keyboard shortcuts — wraps the entire app.
///
///   Cmd/Ctrl + K → toggle the global search overlay
///   Cmd/Ctrl + / → also toggle search (alternative)
class _GlobalShortcuts extends StatelessWidget {
  final Widget child;
  const _GlobalShortcuts({required this.child});

  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: const <ShortcutActivator, Intent>{
        SingleActivator(LogicalKeyboardKey.keyK, meta: true): _SearchIntent(),
        SingleActivator(LogicalKeyboardKey.keyK, control: true): _SearchIntent(),
        SingleActivator(LogicalKeyboardKey.slash, meta: true): _SearchIntent(),
        SingleActivator(LogicalKeyboardKey.slash, control: true): _SearchIntent(),
      },
      child: Builder(
        builder: (innerContext) {
          return Actions(
            actions: <Type, Action<Intent>>{
              _SearchIntent: CallbackAction<_SearchIntent>(
                onInvoke: (_) {
                  GlobalSearchOverlay.toggle(innerContext);
                  return null;
                },
              ),
            },
            child: Focus(
              autofocus: true,
              child: child,
            ),
          );
        },
      ),
    );
  }
}

class _SearchIntent extends Intent {
  const _SearchIntent();
}
