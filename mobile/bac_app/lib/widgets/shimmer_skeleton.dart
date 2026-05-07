import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../config/theme.dart';

/// A single shimmering rounded rectangle
class ShimmerBox extends StatelessWidget {
  final double width;
  final double height;
  final double borderRadius;

  const ShimmerBox({
    super.key,
    this.width = double.infinity,
    required this.height,
    this.borderRadius = 8,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
    );
  }
}

/// Shimmer wrapper that applies the shimmer effect to its children
class ShimmerWrap extends StatelessWidget {
  final Widget child;

  const ShimmerWrap({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: BacPrepColors.surfaceVariant,
      highlightColor: BacPrepColors.surface,
      child: child,
    );
  }
}

/// Skeleton for a list of cards (subjects, exams, etc.)
class CardListSkeleton extends StatelessWidget {
  final int itemCount;
  final double itemHeight;

  const CardListSkeleton({
    super.key,
    this.itemCount = 4,
    this.itemHeight = 80,
  });

  @override
  Widget build(BuildContext context) {
    return ShimmerWrap(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: Spacing.lg),
        child: Column(
          children: List.generate(itemCount, (i) {
            return Padding(
              padding: const EdgeInsets.only(bottom: Spacing.sm),
              child: ShimmerBox(height: itemHeight, borderRadius: 12),
            );
          }),
        ),
      ),
    );
  }
}

/// Skeleton for progress screen (stats row + chart + cards)
class ProgressSkeleton extends StatelessWidget {
  const ProgressSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return ShimmerWrap(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(Spacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title
            const ShimmerBox(width: 180, height: 28),
            const SizedBox(height: Spacing.sm),
            const ShimmerBox(width: 140, height: 16),
            const SizedBox(height: Spacing.lg),
            // Stats row
            Row(
              children: const [
                Expanded(child: ShimmerBox(height: 80, borderRadius: 12)),
                SizedBox(width: Spacing.sm),
                Expanded(child: ShimmerBox(height: 80, borderRadius: 12)),
                SizedBox(width: Spacing.sm),
                Expanded(child: ShimmerBox(height: 80, borderRadius: 12)),
              ],
            ),
            const SizedBox(height: Spacing.lg),
            // Chart placeholder
            const ShimmerBox(height: 120, borderRadius: 12),
            const SizedBox(height: Spacing.lg),
            // Subject cards
            ...List.generate(3, (_) => const Padding(
              padding: EdgeInsets.only(bottom: Spacing.sm),
              child: ShimmerBox(height: 80, borderRadius: 12),
            )),
          ],
        ),
      ),
    );
  }
}

/// Skeleton for home screen
class HomeSkeleton extends StatelessWidget {
  const HomeSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return ShimmerWrap(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(Spacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: const [
                ShimmerBox(width: 48, height: 48, borderRadius: 24),
                SizedBox(width: Spacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ShimmerBox(width: 140, height: 20),
                      SizedBox(height: 6),
                      ShimmerBox(width: 100, height: 14),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: Spacing.xl),
            // Session card
            const ShimmerBox(height: 140, borderRadius: 16),
            const SizedBox(height: Spacing.lg),
            // Title
            const ShimmerBox(width: 120, height: 20),
            const SizedBox(height: Spacing.md),
            // Subject cards
            ...List.generate(3, (_) => const Padding(
              padding: EdgeInsets.only(bottom: Spacing.sm),
              child: ShimmerBox(height: 72, borderRadius: 12),
            )),
          ],
        ),
      ),
    );
  }
}
