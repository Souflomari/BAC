import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(Spacing.lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              Center(
                child: Container(
                  width: 200,
                  height: 200,
                  decoration: BoxDecoration(
                    color: BacPrepColors.primaryLight.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(100),
                  ),
                  child: const Icon(
                    Icons.school,
                    size: 80,
                    color: BacPrepColors.primary,
                  ),
                ),
              ),
              const SizedBox(height: Spacing.xl),
              Text(
                l.welcomeTitle,
                style: Theme.of(context).textTheme.headlineMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: Spacing.md),
              Text(
                l.welcomeBody,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: BacPrepColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: Spacing.xxl),
              _BenefitItem(
                icon: Icons.psychology,
                title: l.benefitAdaptiveTitle,
                subtitle: l.benefitAdaptiveSubtitle,
              ),
              const SizedBox(height: Spacing.md),
              _BenefitItem(
                icon: Icons.refresh,
                title: l.benefitSpacedTitle,
                subtitle: l.benefitSpacedSubtitle,
              ),
              const SizedBox(height: Spacing.md),
              _BenefitItem(
                icon: Icons.emoji_events,
                title: l.benefitAlignedTitle,
                subtitle: l.benefitAlignedSubtitle,
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () => context.go('/onboarding/stream'),
                child: Text(l.start),
              ),
              const SizedBox(height: Spacing.md),
            ],
          ),
        ),
      ),
    );
  }
}

class _BenefitItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _BenefitItem({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: BacPrepColors.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: BacPrepColors.primary),
        ),
        const SizedBox(width: Spacing.md),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: Theme.of(context).textTheme.titleMedium),
              Text(
                subtitle,
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
