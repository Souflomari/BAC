// Generates idempotent SQL migration(s) that seed the SMA curriculum tree
// (topics + skills + lesson cards) and — optionally — the SMA prerequisite
// DAG, from shared/skill_map_sciences_maths_a.json.
//
// Run modes:
//   1. Seed migration only (legacy 2-arg form — unchanged behaviour):
//        dart backend/seed/json_encode_sma.dart \
//            shared/skill_map_sciences_maths_a.json \
//            backend/supabase/migrations/012_seed_sma_skills_and_lessons.sql
//
//   2. Seed migration + separate prereqs migration (3-arg form, new):
//        dart backend/seed/json_encode_sma.dart \
//            shared/skill_map_sciences_maths_a.json \
//            backend/supabase/migrations/012_seed_sma_skills_and_lessons.sql \
//            backend/supabase/migrations/042_seed_sma_prereqs.sql
//
// The 3-arg form is what Stage 3 of the curriculum-discipline cleanup uses
// (see docs/decisions/0004-sma-prereq-backfill.md). It does NOT modify
// migration 012; it produces 042 as a fresh, additive, append-only file.
//
// Acyclicity: Kahn's algorithm runs over the full edge set before any SQL
// is written. A non-DAG aborts the encoder with a non-zero exit code and
// lists the cycle-participating nodes.
//
// Curriculum cull: a small static blocklist removes specific edges flagged
// as out-of-cadre or orientation-defective by the bac-curriculum agent
// (see ADR 0004). The blocklist is declared near the top so future audits
// can find it; every entry carries a one-line reason.
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

import 'dart:collection';
import 'dart:convert';
import 'dart:io';

const String topicUuidPrefix = '22222222-aaaa-0000-0000-';
const String skillUuidPrefix = '33333333-aaaa-0000-0000-';

const Map<String, String> subjectIdByCode = {
  'math': '11111111-0000-0000-0000-000000000001',
  'physics': '11111111-0000-0000-0000-000000000002',
};

// ---------------------------------------------------------------------------
// Curriculum cull — edges declared in the source JSON that the
// `bac-curriculum` agent flagged as out-of-cadre or orientation-defective.
// Removing them at encode time keeps the source JSON authoritative for the
// content layer (lessons / exercises still need these skill nodes) while
// preventing the bad edges from polluting the DAG used by the scheduler.
// Each entry: (skill_subtopic_id, prerequisite_subtopic_id, reason).
// See docs/decisions/0004-sma-prereq-backfill.md for the full rationale.
// ---------------------------------------------------------------------------
const List<List<String>> _edgeCull = [
  ['rings_fields', 'groups',
   'Structures algébriques are out of SM-A cadre (belong to SM-B).'],
  ['ode_apps', 'ode_second_order',
   'Inverted orientation: SM-A cadre introduces 2nd-order ODE via the '
       'physical application, not the other way round.'],
  ['ode_second_order', 'ode_first_order',
   'Not cadre-mandated: 2nd-order ODEs are introduced as an independent '
       'form, not as a generalisation of 1st-order.'],
];

String _uuidSuffix(int n) => n.toString().padLeft(12, '0');

String _sql(String s) => s.replaceAll("'", "''");

void main(List<String> args) {
  if (args.length < 2 || args.length > 3) {
    stderr.writeln(
      'Usage: dart json_encode_sma.dart <skill_map.json> <out_seed.sql> '
      '[<out_prereqs.sql>]',
    );
    exit(2);
  }
  final input = File(args[0]).readAsStringSync();
  final root = jsonDecode(input) as Map<String, dynamic>;
  final emitPrereqs = args.length == 3;

  final seedOut = StringBuffer();
  seedOut.writeln('-- ============================================================');
  seedOut.writeln('-- Migration 012: Seed Sciences Mathématiques A (BIOF) curriculum');
  seedOut.writeln('-- Auto-generated from shared/skill_map_sciences_maths_a.json by');
  seedOut.writeln('--   backend/seed/json_encode_sma.dart');
  seedOut.writeln('-- Idempotent: ON CONFLICT DO NOTHING + jsonb_set guards.');
  seedOut.writeln('-- Codes are prefixed with sma_ to avoid collision with SMB.');
  seedOut.writeln('-- ============================================================');
  seedOut.writeln();
  seedOut.writeln('BEGIN;');
  seedOut.writeln();

  var topicSeq = 0;
  var skillSeq = 0;

  // Maps for the prereq pass.
  // subtopic_id -> generated skill UUID
  final skillIdByCode = <String, String>{};
  // subtopic_id -> { 'topic_code': ..., 'topic_name_fr': ... } (for grouping)
  final topicMetaBySkillCode = <String, Map<String, String>>{};
  // subtopic_id -> raw prerequisites list (from the JSON)
  final prereqsBySkillCode = <String, List<String>>{};
  // Topic-emission order preserved by walking topics sequentially.
  final topicOrder = <String>[]; // list of topic codes (sma_<topic_id>)
  final skillsByTopic = <String, List<String>>{}; // topic code -> [skill codes]

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
    seedOut.writeln('-- ==== Subject: $subjectNameFr (sma) ====');

    final topics = subj['topics'] as List? ?? const [];
    for (var topicIndex = 0; topicIndex < topics.length; topicIndex++) {
      final topic = topics[topicIndex] as Map<String, dynamic>;
      topicSeq++;
      final topicUuid = '$topicUuidPrefix${_uuidSuffix(topicSeq)}';
      final topicCode = 'sma_${topic['topic_id']}';
      final topicNameFr = _sql(topic['name_fr'] as String);
      final topicNameAr = _sql(topic['name_ar'] as String);
      final topicWeight = (topic['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5;
      topicOrder.add(topicCode);
      skillsByTopic[topicCode] = [];

      seedOut.writeln('INSERT INTO public.topics '
          '(id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) '
          "VALUES ('$topicUuid', '$subjectId', '$topicCode', "
          "'$topicNameFr', '$topicNameAr', $topicIndex, $topicWeight) "
          'ON CONFLICT (subject_id, code) DO NOTHING;');

      final skills = topic['skills'] as List? ?? const [];
      for (var skillIndex = 0; skillIndex < skills.length; skillIndex++) {
        final skill = skills[skillIndex] as Map<String, dynamic>;
        skillSeq++;
        final skillUuid = '$skillUuidPrefix${_uuidSuffix(skillSeq)}';
        final skillCode = skill['subtopic_id'] as String;
        final skillCodeFull = 'sma_$skillCode';
        final skillNameFr = _sql(skill['name_fr'] as String);
        final skillNameAr = _sql(skill['name_ar'] as String);
        final difficulty = skill['difficulty_level'] as int? ?? 1;
        final skillWeight = (skill['exam_relevance_weight'] as num?)?.toDouble() ?? 0.5;

        skillIdByCode[skillCode] = skillUuid;
        topicMetaBySkillCode[skillCode] = {
          'topic_code': topicCode,
          'topic_name_fr': topic['name_fr'] as String,
        };
        skillsByTopic[topicCode]!.add(skillCode);
        final rawPrereqs =
            (skill['prerequisites'] as List? ?? const []).cast<String>();
        if (rawPrereqs.isNotEmpty) {
          prereqsBySkillCode[skillCode] = rawPrereqs;
        }

        seedOut.writeln('INSERT INTO public.skills '
            '(id, topic_id, code, name_fr, name_ar, difficulty_level, '
            'exam_relevance_weight, display_order) '
            "VALUES ('$skillUuid', '$topicUuid', '$skillCodeFull', "
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
      seedOut.writeln();
    }
  }

  seedOut.writeln('-- ==== Lesson cards (only status=ready resources) ====');
  for (final u in lessonUpdates) {
    seedOut.writeln(u);
  }
  seedOut.writeln();
  seedOut.writeln('COMMIT;');

  File(args[1]).writeAsStringSync(seedOut.toString());
  stdout.writeln('Wrote ${args[1]}');
  stdout.writeln('  topics: $topicSeq');
  stdout.writeln('  skills: $skillSeq');
  stdout.writeln('  lesson updates: ${lessonUpdates.length}');

  if (!emitPrereqs) return;

  // -------------------------------------------------------------------------
  // Prereq pass — build the edge set, apply the cull, run acyclicity check,
  // emit migration 042.
  // -------------------------------------------------------------------------
  final cullSet = <(String, String)>{
    for (final c in _edgeCull) (c[0], c[1]),
  };
  final cullReasonByEdge = {
    for (final c in _edgeCull) (c[0], c[1]): c[2],
  };

  final allEdges = <(String, String)>[]; // (skill subtopic_id, prereq subtopic_id)
  final culledEdges = <(String, String)>[]; // for the audit log

  for (final entry in prereqsBySkillCode.entries) {
    final child = entry.key;
    for (final parent in entry.value) {
      if (!skillIdByCode.containsKey(parent)) {
        stderr.writeln(
          'ERROR: skill "$child" declares prerequisite "$parent" which is not '
          'a known SMA skill (cross-file refs not supported yet).',
        );
        exit(1);
      }
      final edge = (child, parent);
      if (cullSet.contains(edge)) {
        culledEdges.add(edge);
        continue;
      }
      allEdges.add(edge);
    }
  }

  // Acyclicity via Kahn's algorithm.
  final cycle = _findCycleNodes(allEdges);
  if (cycle.isNotEmpty) {
    stderr.writeln('ERROR: prereq graph is not a DAG.');
    stderr.writeln('  Cycle-participating skills:');
    for (final n in cycle) {
      stderr.writeln('    $n');
    }
    exit(1);
  }

  // Emit migration 042.
  final prereqOut = StringBuffer();
  final expectedSmaCount = allEdges.length;
  prereqOut.writeln('-- ============================================================================');
  prereqOut.writeln('-- Migration 042: Seed SMA (Sciences Mathématiques A) prerequisite edges.');
  prereqOut.writeln('-- ----------------------------------------------------------------------------');
  prereqOut.writeln('-- Closes audit finding E-1 (docs/grounding/known-issues.md): 89 of 108 SMA');
  prereqOut.writeln('-- skills declare prereqs in shared/skill_map_sciences_maths_a.json but the');
  prereqOut.writeln('-- encoder previously discarded them, leaving SMA at 0 edges in the DB.');
  prereqOut.writeln('--');
  prereqOut.writeln('-- Auto-generated by backend/seed/json_encode_sma.dart (extended in Stage 3).');
  prereqOut.writeln('-- Acyclicity verified at encode time via Kahn\'s algorithm.');
  prereqOut.writeln('-- Curriculum cull applied — ${culledEdges.length} edge(s) removed per bac-curriculum');
  prereqOut.writeln('-- review (ADR 0004):');
  for (final e in culledEdges) {
    final reason = cullReasonByEdge[e] ?? '';
    prereqOut.writeln('--   - ${e.$1} ← ${e.$2}: $reason');
  }
  prereqOut.writeln('-- Source: $expectedSmaCount edges emitted, 101 declared in JSON.');
  prereqOut.writeln('--');
  prereqOut.writeln('-- Idempotent: ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING.');
  prereqOut.writeln('-- ============================================================================');
  prereqOut.writeln();
  prereqOut.writeln('BEGIN;');
  prereqOut.writeln();

  // Group emitted edges by the topic of the dependent skill, preserving the
  // topic emission order from the seed pass.
  final edgesByTopic = LinkedHashMap<String, List<(String, String)>>();
  for (final t in topicOrder) {
    edgesByTopic[t] = [];
  }
  for (final e in allEdges) {
    final topicCode = topicMetaBySkillCode[e.$1]!['topic_code']!;
    edgesByTopic[topicCode]!.add(e);
  }

  for (final entry in edgesByTopic.entries) {
    final topicCode = entry.key;
    final edges = entry.value;
    if (edges.isEmpty) continue;
    final topicNameFr = topicMetaBySkillCode.values
        .firstWhere((m) => m['topic_code'] == topicCode)['topic_name_fr']!;
    final crossTopic = edges
        .where((e) =>
            topicMetaBySkillCode[e.$2]!['topic_code']! != topicCode)
        .length;
    prereqOut.writeln(
      '-- ==== Topic: $topicNameFr  (${edges.length} edge'
      '${edges.length == 1 ? "" : "s"}'
      '${crossTopic > 0 ? ", $crossTopic cross-topic" : ""}) ====',
    );
    prereqOut.writeln(
      'INSERT INTO public.skill_prerequisites '
      '(skill_id, prerequisite_skill_id) VALUES',
    );
    for (var i = 0; i < edges.length; i++) {
      final (child, parent) = edges[i];
      final childUuid = skillIdByCode[child]!;
      final parentUuid = skillIdByCode[parent]!;
      final sep = i == edges.length - 1 ? '' : ',';
      prereqOut.writeln(
        "  ('$childUuid', '$parentUuid')$sep  -- $child ← $parent",
      );
    }
    prereqOut.writeln(
      'ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING;',
    );
    prereqOut.writeln();
  }

  // Verification block — asserts the new SMA count, re-asserts ADR 0003
  // baseline for the other streams, cross-stream = 0, total = 103 + N_SMA.
  prereqOut.writeln('-- ----------------------------------------------------------------------------');
  prereqOut.writeln('-- Verification — asserts the new per-stream baseline. A failure rolls the');
  prereqOut.writeln('-- whole migration back (BEGIN/COMMIT). Mirrors migration 041\'s pattern.');
  prereqOut.writeln('-- ----------------------------------------------------------------------------');
  prereqOut.writeln(r'''DO $verify$
DECLARE
  v_total       INT;
  v_sma         INT;
  v_smb         INT;
  v_pc          INT;
  v_svt         INT;
  v_humanities  INT;
  v_cross       INT;
BEGIN
  WITH skill_stream AS (
    SELECT
      sk.id,
      CASE
        WHEN sk.code LIKE 'sma\_%' ESCAPE '\' THEN 'SMA'
        WHEN sk.code LIKE 'pc\_%'  ESCAPE '\' THEN 'PC'
        WHEN sk.code LIKE 'svt\_%' ESCAPE '\' THEN 'SVT'
        WHEN sub.code IN ('math','physics','svt') THEN 'SMB'
        ELSE                                           'humanities'
      END AS stream
    FROM public.skills    sk
    JOIN public.topics    t   ON t.id   = sk.topic_id
    JOIN public.subjects  sub ON sub.id = t.subject_id
  )
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE dep.stream = 'SMA'),
    COUNT(*) FILTER (WHERE dep.stream = 'SMB'),
    COUNT(*) FILTER (WHERE dep.stream = 'PC'),
    COUNT(*) FILTER (WHERE dep.stream = 'SVT'),
    COUNT(*) FILTER (WHERE dep.stream = 'humanities'),
    COUNT(*) FILTER (WHERE dep.stream <> pre.stream)
  INTO  v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross
  FROM  public.skill_prerequisites sp
  JOIN  skill_stream dep ON dep.id = sp.skill_id
  JOIN  skill_stream pre ON pre.id = sp.prerequisite_skill_id;
''');
  prereqOut.writeln('  IF v_sma <> $expectedSmaCount THEN');
  prereqOut.writeln("    RAISE EXCEPTION 'Migration 042 verification: SMA edges expected $expectedSmaCount, got %', v_sma;");
  prereqOut.writeln('  END IF;');
  prereqOut.writeln(r'''  IF v_smb <> 31 THEN
    RAISE EXCEPTION 'Migration 042 verification: SMB edges expected 31, got %', v_smb;
  END IF;
  IF v_pc <> 21 THEN
    RAISE EXCEPTION 'Migration 042 verification: PC edges expected 21, got %', v_pc;
  END IF;
  IF v_svt <> 9 THEN
    RAISE EXCEPTION 'Migration 042 verification: SVT edges expected 9, got %', v_svt;
  END IF;
  IF v_humanities <> 42 THEN
    RAISE EXCEPTION 'Migration 042 verification: humanities edges expected 42, got %', v_humanities;
  END IF;''');
  final expectedTotal = 103 + expectedSmaCount;
  prereqOut.writeln('  IF v_total <> $expectedTotal THEN');
  prereqOut.writeln("    RAISE EXCEPTION 'Migration 042 verification: total edges expected $expectedTotal, got %', v_total;");
  prereqOut.writeln('  END IF;');
  prereqOut.writeln(r'''  IF v_cross <> 0 THEN
    RAISE EXCEPTION 'Migration 042 verification: cross-stream edges expected 0, got %', v_cross;
  END IF;

  RAISE NOTICE
    'Migration 042 verification OK: total=% SMA=% SMB=% PC=% SVT=% humanities=% cross=%',
    v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross;
END
$verify$;
''');

  prereqOut.writeln('COMMIT;');
  prereqOut.writeln();
  prereqOut.writeln('-- ============================================================================');
  prereqOut.writeln('-- Reversal (manual — repo is forward-only):');
  prereqOut.writeln('--');
  prereqOut.writeln('--   DELETE FROM public.skill_prerequisites');
  prereqOut.writeln('--   WHERE skill_id IN (');
  prereqOut.writeln(r"--     SELECT id FROM public.skills WHERE code LIKE 'sma\_%' ESCAPE '\'");
  prereqOut.writeln('--   )');
  prereqOut.writeln('--   AND prerequisite_skill_id IN (');
  prereqOut.writeln(r"--     SELECT id FROM public.skills WHERE code LIKE 'sma\_%' ESCAPE '\'");
  prereqOut.writeln('--   );');
  prereqOut.writeln('--');
  prereqOut.writeln('-- Safe only if no learner-model state references SMA prerequisites.');
  prereqOut.writeln('-- After deletion, re-run the verify CTE; SMA must return to 0 and total to 103.');
  prereqOut.writeln('-- ============================================================================');

  File(args[2]).writeAsStringSync(prereqOut.toString());
  stdout.writeln();
  stdout.writeln('Wrote ${args[2]}');
  stdout.writeln('  edges declared in JSON: 101');
  stdout.writeln('  edges culled (out-of-cadre / orientation): ${culledEdges.length}');
  stdout.writeln('  edges emitted: $expectedSmaCount');
  stdout.writeln('  acyclicity: OK (Kahn passed)');
  stdout.writeln('  topics with edges: '
      '${edgesByTopic.values.where((v) => v.isNotEmpty).length}');
}

/// Returns the set of node IDs that participate in cycles, or an empty set if
/// the graph is a DAG. Uses Kahn's algorithm: repeatedly remove zero-in-degree
/// nodes; any node never removed is in a cycle.
Set<String> _findCycleNodes(List<(String, String)> edges) {
  final inDegree = <String, int>{};
  final adj = <String, List<String>>{}; // parent → children
  for (final e in edges) {
    final child = e.$1;
    final parent = e.$2;
    inDegree[child] = (inDegree[child] ?? 0) + 1;
    inDegree.putIfAbsent(parent, () => 0);
    adj.putIfAbsent(parent, () => <String>[]).add(child);
  }
  final queue = Queue<String>();
  for (final entry in inDegree.entries) {
    if (entry.value == 0) queue.add(entry.key);
  }
  final visited = <String>{};
  while (queue.isNotEmpty) {
    final node = queue.removeFirst();
    if (!visited.add(node)) continue;
    for (final child in adj[node] ?? const <String>[]) {
      inDegree[child] = inDegree[child]! - 1;
      if (inDegree[child] == 0) queue.add(child);
    }
  }
  return inDegree.keys.where((n) => !visited.contains(n)).toSet();
}
