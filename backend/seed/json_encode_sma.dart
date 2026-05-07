// Generates an idempotent SQL migration that seeds the SMA curriculum tree
// (topics + skills + lesson cards) from skill_map_sciences_maths_a.json.
//
// Run:
//   dart backend/seed/json_encode_sma.dart \
//       shared/skill_map_sciences_maths_a.json \
//       backend/supabase/migrations/012_seed_sma_skills_and_lessons.sql
//
// Notes on isolation from SMB content:
//  - Topic and skill `code`s are prefixed with `sma_` to avoid colliding with
//    the existing SMB rows on `subjects(id) + code` UNIQUE.
//  - UUIDs follow a deterministic pattern so the migration is idempotent and
//    safe to re-run: topics = 22222222-aaaa-0000-0000-{NNNNNNNNNNNN},
//    skills = 33333333-aaaa-0000-0000-{NNNNNNNNNNNN}, where N is a 12-digit
//    sequential index.
//  - Lesson cards are emitted only for resources with status='ready' (widgets
//    that exist AND are wired into LessonCardWidget today). Resources with
//    status='ready_unwired' or 'todo' are skipped here and will be added by
//    follow-up migrations as those widgets land.

import 'dart:convert';
import 'dart:io';

const String topicUuidPrefix = '22222222-aaaa-0000-0000-';
const String skillUuidPrefix = '33333333-aaaa-0000-0000-';

const Map<String, String> subjectIdByCode = {
  'math': '11111111-0000-0000-0000-000000000001',
  'physics': '11111111-0000-0000-0000-000000000002',
};

String _uuidSuffix(int n) => n.toString().padLeft(12, '0');

String _sql(String s) => s.replaceAll("'", "''");

void main(List<String> args) {
  if (args.length != 2) {
    stderr.writeln('Usage: dart json_encode_sma.dart <skill_map.json> <out.sql>');
    exit(2);
  }
  final input = File(args[0]).readAsStringSync();
  final root = jsonDecode(input) as Map<String, dynamic>;

  final out = StringBuffer();
  out.writeln('-- ============================================================');
  out.writeln('-- Migration 012: Seed Sciences Mathématiques A (BIOF) curriculum');
  out.writeln('-- Auto-generated from shared/skill_map_sciences_maths_a.json by');
  out.writeln('--   backend/seed/json_encode_sma.dart');
  out.writeln('-- Idempotent: ON CONFLICT DO NOTHING + jsonb_set guards.');
  out.writeln('-- Codes are prefixed with sma_ to avoid collision with SMB.');
  out.writeln('-- ============================================================');
  out.writeln();
  out.writeln('BEGIN;');
  out.writeln();

  var topicSeq = 0;
  var skillSeq = 0;

  // First pass: emit topics and skills inserts.
  final lessonUpdates = <String>[];
  final subjects = root['subjects'] as List;
  for (final s in subjects) {
    final subj = s as Map<String, dynamic>;
    final subjectCode = subj['subject_id'] as String;
    final subjectId = subjectIdByCode[subjectCode];
    if (subjectId == null) {
      stderr.writeln('ERROR: unknown subject_id "$subjectCode" — extend subjectIdByCode');
      exit(1);
    }
    final subjectNameFr = subj['name_fr'] as String? ?? subjectCode;
    out.writeln('-- ==== Subject: $subjectNameFr (sma) ====');

    final topics = subj['topics'] as List? ?? const [];
    for (var topicIndex = 0; topicIndex < topics.length; topicIndex++) {
      final topic = topics[topicIndex] as Map<String, dynamic>;
      topicSeq++;
      final topicUuid = '$topicUuidPrefix${_uuidSuffix(topicSeq)}';
      final topicCode = 'sma_${topic['topic_id']}';
      final topicNameFr = _sql(topic['name_fr'] as String);
      final topicNameAr = _sql(topic['name_ar'] as String);
      final topicWeight = (topic['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5;

      out.writeln('INSERT INTO public.topics '
          '(id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) '
          "VALUES ('$topicUuid', '$subjectId', '$topicCode', "
          "'$topicNameFr', '$topicNameAr', $topicIndex, $topicWeight) "
          'ON CONFLICT (subject_id, code) DO NOTHING;');

      final skills = topic['skills'] as List? ?? const [];
      for (var skillIndex = 0; skillIndex < skills.length; skillIndex++) {
        final skill = skills[skillIndex] as Map<String, dynamic>;
        skillSeq++;
        final skillUuid = '$skillUuidPrefix${_uuidSuffix(skillSeq)}';
        final skillCode = 'sma_${skill['subtopic_id']}';
        final skillNameFr = _sql(skill['name_fr'] as String);
        final skillNameAr = _sql(skill['name_ar'] as String);
        final difficulty = skill['difficulty_level'] as int? ?? 1;
        final skillWeight = (skill['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5;

        out.writeln('INSERT INTO public.skills '
            '(id, topic_id, code, name_fr, name_ar, difficulty_level, '
            'exam_relevance_weight, display_order) '
            "VALUES ('$skillUuid', '$topicUuid', '$skillCode', "
            "'$skillNameFr', '$skillNameAr', $difficulty, $skillWeight, $skillIndex) "
            'ON CONFLICT (topic_id, code) DO NOTHING;');

        // Build lesson cards from resources with status='ready'.
        final resources = (skill['interactive_resources'] as List? ?? const [])
            .cast<Map<String, dynamic>>()
            .where((r) => r['status'] == 'ready')
            .toList();
        if (resources.isNotEmpty) {
          final cards = <Map<String, dynamic>>[
            {
              'type': 'theory',
              'title_fr': skill['name_fr'],
              'body_fr': "Cette leçon couvre : ${skill['name_fr']}.",
            },
          ];
          for (final r in resources) {
            cards.add({
              'type': 'interactive',
              'title_fr': 'Exploration',
              'body_fr': 'Manipule les paramètres pour développer ton intuition.',
              'widget_type': r['widget_type'],
              if (r['config'] != null) 'config': r['config'],
            });
          }
          final lessonJson = _sql(jsonEncode({'cards': cards}));
          lessonUpdates.add(
            "UPDATE public.skills SET lesson = '$lessonJson'::jsonb "
            "WHERE id = '$skillUuid' AND lesson IS NULL;",
          );
        }
      }
      out.writeln();
    }
  }

  out.writeln('-- ==== Lesson cards (only status=ready resources) ====');
  for (final u in lessonUpdates) {
    out.writeln(u);
  }
  out.writeln();
  out.writeln('COMMIT;');

  File(args[1]).writeAsStringSync(out.toString());
  stdout.writeln('Wrote ${args[1]}');
  stdout.writeln('  topics: $topicSeq');
  stdout.writeln('  skills: $skillSeq');
  stdout.writeln('  lesson updates: ${lessonUpdates.length}');
}
