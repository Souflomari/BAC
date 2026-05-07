import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../providers/auth_provider.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    // Small delay to let Supabase restore the session
    await Future.delayed(const Duration(milliseconds: 800));
    if (!mounted) return;

    final authState = ref.read(authStateProvider);
    final isAuthenticated = authState.valueOrNull?.session != null;

    if (isAuthenticated) {
      context.go('/home');
    } else {
      context.go('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context);
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: BacPrepColors.primary,
                borderRadius: BorderRadius.circular(24),
              ),
              child: const Icon(Icons.school, size: 50, color: Colors.white),
            ),
            const SizedBox(height: Spacing.lg),
            Text(
              'BacPrep',
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: Spacing.sm),
            Text(
              l?.splashTagline ?? '',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: BacPrepColors.textSecondary,
              ),
            ),
            const SizedBox(height: Spacing.xxl),
            const SizedBox(
              width: 24,
              height: 24,
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          ],
        ),
      ),
    );
  }
}
