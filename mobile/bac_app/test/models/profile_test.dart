import 'package:flutter_test/flutter_test.dart';
import 'package:bac_app/models/profile.dart';

void main() {
  group('Profile.fromJson', () {
    test('parses a complete row', () {
      final p = Profile.fromJson(<String, dynamic>{
        'id': 'u1',
        'display_name': 'Soufiane',
        'avatar_url': 'https://example.com/a.jpg',
        'bac_stream': 'sciences_maths_b',
        'bac_year': 2026,
        'exam_date': '2026-06-07',
        'preferred_language': 'fr',
        'daily_goal_minutes': 30,
        'streak_current': 5,
        'streak_longest': 12,
        'total_xp': 420,
        'onboarding_completed': true,
      });
      expect(p.id, 'u1');
      expect(p.displayName, 'Soufiane');
      expect(p.avatarUrl, 'https://example.com/a.jpg');
      expect(p.bacStream, BacStream.sciencesMathsB);
      expect(p.examDate?.year, 2026);
      expect(p.dailyGoalMinutes, 30);
      expect(p.streakCurrent, 5);
      expect(p.totalXp, 420);
      expect(p.onboardingCompleted, isTrue);
    });

    test('uses safe defaults on missing fields', () {
      final p = Profile.fromJson(<String, dynamic>{'id': 'u2'});
      expect(p.displayName, '');
      expect(p.avatarUrl, isNull);
      expect(p.bacStream, BacStream.sciencesMathsB);
      expect(p.bacYear, 2026);
      expect(p.dailyGoalMinutes, 15);
      expect(p.onboardingCompleted, isFalse);
    });

    test('falls back to SMB on unknown bac_stream', () {
      final p = Profile.fromJson(<String, dynamic>{
        'id': 'u3',
        'bac_stream': 'made_up_filiere',
      });
      expect(p.bacStream, BacStream.sciencesMathsB);
    });
  });

  group('Profile.copyWith', () {
    test('preserves avatarUrl when unspecified', () {
      const original = Profile(id: 'u', displayName: 'a', avatarUrl: 'https://x');
      final updated = original.copyWith(displayName: 'b');
      expect(updated.displayName, 'b');
      expect(updated.avatarUrl, 'https://x');
    });

    test('overwrites avatarUrl when specified', () {
      const original = Profile(id: 'u', displayName: 'a', avatarUrl: 'https://x');
      final updated = original.copyWith(avatarUrl: 'https://y');
      expect(updated.avatarUrl, 'https://y');
    });
  });

  group('Profile.patchJson', () {
    test('only includes provided keys', () {
      final patch = Profile.patchJson(displayName: 'New');
      expect(patch, equals({'display_name': 'New'}));
    });

    test('merges multiple keys', () {
      final patch = Profile.patchJson(
        displayName: 'New',
        avatarUrl: 'https://z',
        dailyGoalMinutes: 60,
      );
      expect(patch.keys, containsAll(['display_name', 'avatar_url', 'daily_goal_minutes']));
      expect(patch['daily_goal_minutes'], 60);
    });

    test('returns empty map when no fields are set', () {
      expect(Profile.patchJson(), isEmpty);
    });
  });

  group('BacStream.fromValue', () {
    test('matches known value', () {
      expect(BacStream.fromValue('sciences_maths_a'), BacStream.sciencesMathsA);
      expect(BacStream.fromValue('svt'), BacStream.svt);
    });
    test('falls back to SMB on unknown', () {
      expect(BacStream.fromValue('???'), BacStream.sciencesMathsB);
    });
  });
}
