import 'package:flutter/material.dart';
import '../config/theme.dart';

/// Animated streak fire icon with count that pulses on milestones
class AnimatedStreakBadge extends StatefulWidget {
  final int streakDays;

  const AnimatedStreakBadge({super.key, required this.streakDays});

  @override
  State<AnimatedStreakBadge> createState() => _AnimatedStreakBadgeState();
}

class _AnimatedStreakBadgeState extends State<AnimatedStreakBadge>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _pulse;

  bool get _isMilestone {
    final s = widget.streakDays;
    return s == 7 || s == 14 || s == 30 || s == 50 || s == 100 || s == 365;
  }

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _pulse = Tween<double>(begin: 1.0, end: 1.15).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    if (_isMilestone) {
      _controller.repeat(reverse: true);
    }
  }

  @override
  void didUpdateWidget(AnimatedStreakBadge oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.streakDays != oldWidget.streakDays) {
      if (_isMilestone) {
        _controller.repeat(reverse: true);
      } else {
        _controller.stop();
        _controller.value = 0;
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Color get _fireColor {
    if (widget.streakDays >= 100) return const Color(0xFFEF4444); // red
    if (widget.streakDays >= 30) return const Color(0xFFF97316); // orange
    if (widget.streakDays >= 7) return BacPrepColors.accent;
    return BacPrepColors.textSecondary;
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _pulse,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: _fireColor.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(16),
          border: _isMilestone
              ? Border.all(color: _fireColor.withValues(alpha: 0.3), width: 1.5)
              : null,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.local_fire_department, size: 18, color: _fireColor),
            const SizedBox(width: 4),
            Text(
              '${widget.streakDays}',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 14,
                color: _fireColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Animated XP counter that counts up from 0
class AnimatedXpCounter extends StatefulWidget {
  final int xp;
  final Duration duration;

  const AnimatedXpCounter({
    super.key,
    required this.xp,
    this.duration = const Duration(milliseconds: 800),
  });

  @override
  State<AnimatedXpCounter> createState() => _AnimatedXpCounterState();
}

class _AnimatedXpCounterState extends State<AnimatedXpCounter>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _countUp;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(duration: widget.duration, vsync: this);
    _countUp = Tween<double>(begin: 0, end: widget.xp.toDouble()).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _countUp,
      builder: (context, _) {
        return Text(
          '+${_countUp.value.round()} XP',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: BacPrepColors.accent,
          ),
        );
      },
    );
  }
}

/// Animated daily goal ring that fills up smoothly
class AnimatedGoalRing extends StatefulWidget {
  final double progress; // 0.0 to 1.0
  final double size;
  final Widget? child;

  const AnimatedGoalRing({
    super.key,
    required this.progress,
    this.size = 64,
    this.child,
  });

  @override
  State<AnimatedGoalRing> createState() => _AnimatedGoalRingState();
}

class _AnimatedGoalRingState extends State<AnimatedGoalRing>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fillAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _fillAnimation = Tween<double>(begin: 0, end: widget.progress).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _fillAnimation,
      builder: (context, child) {
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: Stack(
            alignment: Alignment.center,
            children: [
              CircularProgressIndicator(
                value: _fillAnimation.value,
                strokeWidth: 5,
                backgroundColor: BacPrepColors.primary.withValues(alpha: 0.1),
                valueColor: AlwaysStoppedAnimation(
                  _fillAnimation.value >= 1.0
                      ? BacPrepColors.success
                      : BacPrepColors.primary,
                ),
              ),
              if (widget.child != null) widget.child!,
            ],
          ),
        );
      },
    );
  }
}
