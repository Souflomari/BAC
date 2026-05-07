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

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    initialLocation: '/splash',
    redirect: (context, state) {
      final isAuthenticated = authState.valueOrNull?.session != null;
      final isSplash = state.matchedLocation == '/splash';
      final isAuthRoute = state.matchedLocation == '/login' ||
          state.matchedLocation == '/forgot-password' ||
          state.matchedLocation.startsWith('/onboarding');

      // Let splash screen handle its own navigation
      if (isSplash) return null;

      if (!isAuthenticated && !isAuthRoute) {
        return '/login';
      }
      if (isAuthenticated && state.matchedLocation == '/login') {
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
            pageBuilder: (context, state) => const NoTransitionPage(
              child: HomeScreen(),
            ),
          ),
          GoRoute(
            path: '/subjects',
            pageBuilder: (context, state) => const NoTransitionPage(
              child: SubjectsScreen(),
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
            pageBuilder: (context, state) => const NoTransitionPage(
              child: ProgressScreen(),
            ),
          ),
          GoRoute(
            path: '/settings',
            pageBuilder: (context, state) => const NoTransitionPage(
              child: SettingsScreen(),
            ),
          ),
        ],
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
