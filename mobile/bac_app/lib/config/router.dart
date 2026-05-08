import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../providers/auth_provider.dart';
import '../screens/onboarding/onboarding_screen.dart';
import '../screens/onboarding/stream_selection_screen.dart';
import '../screens/home/home_screen.dart';
import '../screens/session/session_screen.dart';
import '../screens/progress/progress_screen.dart';
import '../screens/subjects/subjects_screen.dart';
import '../screens/settings/settings_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/forgot_password_screen.dart';
import '../screens/subjects/subject_detail_screen.dart';
import '../screens/subjects/lesson_screen.dart';
import '../screens/shell/app_shell.dart';
import '../screens/landing/landing_screen.dart';
import '../screens/profile/profile_screen.dart';
import '../widgets/demo/interactive_widget_demo_screen.dart';
import '../widgets/demo/interactive_widget_test_screen.dart';
import '../screens/exams/exam_browser_screen.dart';
import '../screens/exams/exam_detail_screen.dart';
import '../screens/exams/exam_practice_screen.dart';
import '../screens/exams/exam_results_screen.dart';
import '../screens/exams/analytics_dashboard_screen.dart';
import '../screens/settings/notification_settings_screen.dart';
import '../screens/leaderboard/leaderboard_screen.dart';
import '../screens/splash/splash_screen.dart';
import '../screens/analytics/analytics_hub_screen.dart';
import '../screens/analytics/memory_heatmap_screen.dart';
import '../screens/analytics/study_schedule_screen.dart';
import 'theme.dart';

/// Smooth Papier-style page transition: short fade + small upward slide.
/// Used for tab routes (replaces NoTransitionPage which snaps instantly).
CustomTransitionPage<void> _papierPage({
  required Widget child,
  Object? key,
  Duration duration = const Duration(milliseconds: 180),
}) {
  return CustomTransitionPage<void>(
    key: key is LocalKey ? key : null,
    child: child,
    transitionDuration: duration,
    reverseTransitionDuration: const Duration(milliseconds: 120),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final curved = CurvedAnimation(
        parent: animation,
        curve: Curves.easeOutCubic,
        reverseCurve: Curves.easeInCubic,
      );
      return FadeTransition(
        opacity: curved,
        child: SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(0, 0.012),
            end: Offset.zero,
          ).animate(curved),
          child: child,
        ),
      );
    },
  );
}

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    initialLocation: '/splash',
    errorBuilder: (context, state) => NotFoundScreen(uri: state.uri.toString()),
    redirect: (context, state) {
      final isAuthenticated = authState.valueOrNull?.session != null;
      final loc = state.matchedLocation;
      final isSplash = loc == '/splash';
      final isPublic = loc == '/landing' ||
          loc == '/login' ||
          loc == '/forgot-password' ||
          loc.startsWith('/onboarding');

      // Let splash screen handle its own navigation
      if (isSplash) return null;

      // Unauth: anything non-public redirects to landing.
      if (!isAuthenticated && !isPublic) {
        return '/landing';
      }
      // Auth: bounce off public marketing/auth routes back into the app.
      if (isAuthenticated && (loc == '/landing' || loc == '/login')) {
        return '/home';
      }
      return null;
    },
    routes: [
      // Splash
      GoRoute(
        path: '/splash',
        builder: (context, state) => const SplashScreen(),
      ),

      // Public marketing landing
      GoRoute(
        path: '/landing',
        builder: (context, state) => const LandingScreen(),
      ),

      // Auth
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) => const ForgotPasswordScreen(),
      ),

      // Onboarding
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
        routes: [
          GoRoute(
            path: 'stream',
            builder: (context, state) => const StreamSelectionScreen(),
          ),
        ],
      ),

      // Main app with bottom navigation shell
      ShellRoute(
        builder: (context, state, child) => AppShell(child: child),
        routes: [
          GoRoute(
            path: '/home',
            pageBuilder: (context, state) => _papierPage(
              child: const HomeScreen(),
              key: state.pageKey,
            ),
          ),
          GoRoute(
            path: '/subjects',
            pageBuilder: (context, state) => _papierPage(
              child: const SubjectsScreen(),
              key: state.pageKey,
            ),
            routes: [
              GoRoute(
                path: ':subjectId',
                builder: (context, state) => SubjectDetailScreen(
                  subjectId: state.pathParameters['subjectId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: '/progress',
            pageBuilder: (context, state) => _papierPage(
              child: const ProgressScreen(),
              key: state.pageKey,
            ),
          ),
          GoRoute(
            path: '/settings',
            pageBuilder: (context, state) => _papierPage(
              child: const SettingsScreen(),
              key: state.pageKey,
            ),
          ),
        ],
      ),

      // Profile
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),

      // Notification settings
      GoRoute(
        path: '/settings/notifications',
        builder: (context, state) => const NotificationSettingsScreen(),
      ),

      // Leaderboard
      GoRoute(
        path: '/leaderboard',
        builder: (context, state) => const LeaderboardScreen(),
      ),

      // Lesson (full screen, no bottom nav)
      GoRoute(
        path: '/lesson/:skillId',
        builder: (context, state) => LessonScreen(
          skillId: state.pathParameters['skillId']!,
        ),
      ),

      // Session (full screen, no bottom nav)
      GoRoute(
        path: '/session',
        builder: (context, state) {
          final extra = state.extra as Map<String, dynamic>?;
          final querySkillId = state.uri.queryParameters['skill_id'];
          return SessionScreen(
            subjectId: extra?['subject_id'] as String?,
            skillId: querySkillId ?? extra?['skill_id'] as String?,
            sessionType: extra?['session_type'] as String? ?? 'practice',
          );
        },
      ),

      // Demo screen for interactive widgets
      GoRoute(
        path: '/demo/interactive',
        builder: (context, state) => const InteractiveWidgetDemoScreen(),
      ),

      // Test screen for interactive widgets
      GoRoute(
        path: '/demo/test',
        builder: (context, state) => const InteractiveWidgetTestScreen(),
      ),

      // Exam browser
      GoRoute(
        path: '/exams',
        builder: (context, state) => const ExamBrowserScreen(),
      ),

      // Exam detail
      GoRoute(
        path: '/exams/:examId',
        builder: (context, state) => ExamDetailScreen(
          examId: state.pathParameters['examId']!,
        ),
      ),

      // Exam practice
      GoRoute(
        path: '/exams/:examId/practice',
        builder: (context, state) {
          final mode = state.uri.queryParameters['mode'];
          return ExamPracticeScreen(
            examId: state.pathParameters['examId']!,
            mode: mode == 'timed' ? ExamMode.timed : ExamMode.practice,
          );
        },
      ),

      // Exam results
      GoRoute(
        path: '/exams/:examId/results',
        builder: (context, state) => ExamResultsScreen(
          examId: state.pathParameters['examId']!,
        ),
      ),

      // Exam analytics dashboard (legacy)
      GoRoute(
        path: '/exam-analytics',
        builder: (context, state) => const AnalyticsDashboardScreen(),
      ),

      // Learning Analytics hub
      GoRoute(
        path: '/analytics',
        builder: (context, state) => const AnalyticsHubScreen(),
      ),
      GoRoute(
        path: '/analytics/heatmap',
        builder: (context, state) => const MemoryHeatmapScreen(),
      ),
      GoRoute(
        path: '/analytics/schedule',
        builder: (context, state) => const StudyScheduleScreen(),
      ),
    ],
  );
});

/// Papier-styled 404. Shown by GoRouter when no route matches.
class NotFoundScreen extends StatelessWidget {
  final String uri;
  const NotFoundScreen({super.key, required this.uri});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Papier.bg,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: Padding(
              padding: const EdgeInsets.all(28),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '404',
                    style: PapierType.italic(
                      fontSize: 88,
                      color: Papier.ink,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "Cette page n'existe pas",
                    textAlign: TextAlign.center,
                    style: PapierType.italic(fontSize: 24, color: Papier.ink),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    "L'URL « $uri » ne mène nulle part. Voici quelques chapitres pour t'orienter.",
                    textAlign: TextAlign.center,
                    style: PapierType.serif(fontSize: 14, color: Papier.ink2),
                  ),
                  const SizedBox(height: 24),
                  const Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    alignment: WrapAlignment.center,
                    children: [
                      _NotFoundLink(label: 'Cahier', route: '/home'),
                      _NotFoundLink(label: 'Sujets', route: '/subjects'),
                      _NotFoundLink(label: 'Annales', route: '/exams'),
                      _NotFoundLink(label: 'Progrès', route: '/progress'),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _NotFoundLink extends StatelessWidget {
  final String label;
  final String route;
  const _NotFoundLink({required this.label, required this.route});

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: () => GoRouter.of(context).go(route),
      style: OutlinedButton.styleFrom(
        foregroundColor: Papier.ink,
        side: const BorderSide(color: Papier.ink, width: 1.4),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(2)),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
      child: Text(
        label,
        style: PapierType.smallCaps(
          fontSize: 11,
          color: Papier.ink,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
