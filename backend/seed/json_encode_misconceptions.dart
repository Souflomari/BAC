// Encoder for misconception patch migrations.
//
// Reads a per-skill misconception seed JSON file (schema_version: 2 per ADR 0009)
// and emits an idempotent UPDATE migration that loads the file's
// misconceptions into skills.common_misconceptions for the named skill.
//
// Convention (ADR 0008, ADR 0009):
//   - One JSON file per skill, located at backend/seed/misconceptions/<skill_code>.json
//   - One migration per skill, output by the caller-supplied output path.
//   - The encoder projects only the canonical five fields into the DB JSONB,
//     PLUS injects "label_ar": null on every entry (the encoder-side convention
//     from ADR 0008 §6, reaffirmed in ADR 0009).
//   - Authoring extras (`evidence`, `authoring_notes`) stay in the seed file and
//     are intentionally dropped.
//
// Usage:
//   dart backend/seed/json_encode_misconceptions.dart \
//     backend/seed/misconceptions/sma_limit_calc.json \
//     backend/supabase/migrations/045_misconceptions_sma_limit_calc.sql
//
// Idempotency:
//   The migration body is a single UPDATE against skills WHERE code = '<skill>'.
//   Re-running produces the same end state — UPDATE sets the column to the same
//   JSONB value. The verify block fires once per run and either asserts the
//   expected end state or rolls back. There is no INSERT, no row creation, no
//   side-effect that re-running compounds.
//
// Exit codes:
//   0  success — migration file written
//   1  validation error — input file is malformed or violates ADR 0008/0009
//   2  usage error — wrong number of arguments

import 'dart:convert';
import 'dart:io';

const String _expectedSchemaVersion = '2';

void main(List<String> args) {
  if (args.length != 2) {
    stderr.writeln(
      'Usage: dart json_encode_misconceptions.dart '
      '<input.json> <output_migration.sql>',
    );
    exit(2);
  }
  final inPath = args[0];
  final outPath = args[1];

  final raw = File(inPath).readAsStringSync();
  final data = jsonDecode(raw) as Map<String, dynamic>;

  // ---- Validate the input ---------------------------------------------------
  final schemaVersion = '${data['schema_version']}';
  if (schemaVersion != _expectedSchemaVersion) {
    _fail(
      'expected schema_version $_expectedSchemaVersion, got $schemaVersion. '
      'Per ADR 0009 the encoder reads structured-stem files only — re-author '
      'or migrate the seed file before running this encoder.',
    );
  }

  final skillCode = data['skill_code'];
  if (skillCode is! String || skillCode.isEmpty) {
    _fail('missing or invalid skill_code (must be a non-empty string)');
  }
  final subjectCode = data['subject_code'];
  if (subjectCode is! String || subjectCode.isEmpty) {
    _fail('missing or invalid subject_code (must be a non-empty string)');
  }

  final rawMcs = data['misconceptions'];
  if (rawMcs is! List || rawMcs.isEmpty) {
    _fail('misconceptions array is missing or empty');
  }
  final mcs = rawMcs.cast<Map<String, dynamic>>();

  // Project canonical fields + validate each entry.
  final idPrefix = 'mc.$subjectCode.$skillCode.';
  final dbEntries = <Map<String, Object?>>[];
  final expectedIds = <String>[];
  for (final m in mcs) {
    final id = m['id'];
    if (id is! String || id.isEmpty) {
      _fail('misconception entry missing id');
    }
    if (!(id as String).startsWith(idPrefix)) {
      _fail(
        'misconception id "$id" does not match expected prefix "$idPrefix". '
        'Per ADR 0008 §2 the id format is mc.<subjects.code>.<skills.code>.<short-label>.',
      );
    }
    final label = _requireString(m, 'label', id);
    final description = _requireString(m, 'description', id);
    final contradicts = _requireString(m, 'contradicts_principle', id);

    final stem = m['distinguishing_mcq_stem'];
    if (stem is! Map<String, dynamic>) {
      _fail(
        'misconception "$id" has non-object distinguishing_mcq_stem. '
        'Per ADR 0009 schema_version 2 requires a structured object with sub-fields '
        '{stem_text, distractor_choice_label, distractor_rationale, correct_choice_label, correct_rationale}.',
      );
    }
    // pedagogy-auditor's load-bearing keys for step 3 (distractor tagging):
    //   distractor_choice_label tells the next encoder which slot in
    //   items.distractor_misconceptions to write this misconception ID into.
    //   correct_choice_label is the audit-trail anchor.
    final structuredKeys = [
      'stem_text',
      'distractor_choice_label',
      'distractor_rationale',
      'correct_choice_label',
      'correct_rationale',
    ];
    for (final k in structuredKeys) {
      if (stem[k] is! String || (stem[k] as String).isEmpty) {
        _fail(
          'misconception "$id" distinguishing_mcq_stem.$k missing or empty. '
          'Per ADR 0009 §B.2 all five sub-fields are required.',
        );
      }
    }
    final distractorLabel = stem['distractor_choice_label'] as String;
    final correctLabel = stem['correct_choice_label'] as String;
    if (!['A', 'B', 'C', 'D'].contains(distractorLabel)) {
      _fail(
        'misconception "$id" distractor_choice_label "$distractorLabel" is not in {A,B,C,D}.',
      );
    }
    if (!['A', 'B', 'C', 'D'].contains(correctLabel)) {
      _fail(
        'misconception "$id" correct_choice_label "$correctLabel" is not in {A,B,C,D}.',
      );
    }
    if (distractorLabel == correctLabel) {
      _fail(
        'misconception "$id" distractor_choice_label and correct_choice_label both = "$distractorLabel"; '
        'the distinguishing distractor must be different from the correct choice.',
      );
    }

    expectedIds.add(id);
    dbEntries.add({
      'id': id,
      'label': label,
      'description': description,
      'contradicts_principle': contradicts,
      'distinguishing_mcq_stem': stem, // structured object passed through as-is
      'label_ar': null, // ADR 0008 §6 — encoder injects null sentinel for MVP
    });
  }

  // Detect duplicate IDs within the file.
  final idSet = expectedIds.toSet();
  if (idSet.length != expectedIds.length) {
    _fail('duplicate misconception ids within the file');
  }

  // ---- Emit SQL -------------------------------------------------------------
  final migrationNumber = _migrationNumberFromPath(outPath);
  final mcsJson = const JsonEncoder.withIndent('  ').convert(dbEntries);
  final expectedIdsSqlArray =
      expectedIds.map((id) => "    '${_sqlString(id)}'").join(',\n');
  final mcCount = dbEntries.length;

  final out = StringBuffer();
  out.writeln('-- ============================================================================');
  out.writeln('-- Migration $migrationNumber: Misconceptions for skill `$skillCode`.');
  out.writeln('-- ----------------------------------------------------------------------------');
  out.writeln('-- Auto-generated by backend/seed/json_encode_misconceptions.dart');
  out.writeln('-- Source: ${_relPath(inPath)}');
  out.writeln('-- Authoring: pedagogy-auditor (lead) + bac-curriculum (validation), per ADR 0008.');
  out.writeln('-- Shape: schema_version 2 with structured distinguishing_mcq_stem, per ADR 0009.');
  out.writeln('--');
  out.writeln('-- Misconceptions emitted ($mcCount):');
  for (final id in expectedIds) {
    out.writeln('--   - $id');
  }
  out.writeln('--');
  out.writeln('-- Idempotent: re-running produces the same UPDATE, same end state. The verify');
  out.writeln('-- block re-runs and either asserts the expected state or rolls back. No INSERT,');
  out.writeln('-- no row creation, no compounding side effect.');
  out.writeln('-- ============================================================================');
  out.writeln();
  out.writeln('BEGIN;');
  out.writeln();
  out.writeln('-- ----------------------------------------------------------------------------');
  out.writeln('-- 1. Load misconceptions onto skill `$skillCode`.');
  out.writeln('--    Dollar-quoted JSONB literal — no quote-escaping required for the FR text.');
  out.writeln('-- ----------------------------------------------------------------------------');
  out.writeln('UPDATE public.skills');
  out.writeln('SET    common_misconceptions = \$mcs\$');
  out.writeln(mcsJson);
  out.writeln('\$mcs\$::jsonb');
  out.writeln("WHERE  code = '${_sqlString(skillCode as String)}';");
  out.writeln();

  out.writeln('-- ----------------------------------------------------------------------------');
  out.writeln('-- 2. Verify block — mirrors the pattern from migrations 040-044.');
  out.writeln('--    Re-asserts the canonical prereq baseline (ADR 0004) so this migration');
  out.writeln('--    cannot silently drift it, then validates the content invariants:');
  out.writeln('--      - the target skill row exists and was updated;');
  out.writeln('--      - common_misconceptions contains exactly $mcCount entries;');
  out.writeln('--      - every expected ID is present (set equality, not subset);');
  out.writeln('--      - every entry carries the canonical six keys');
  out.writeln('--        (id, label, description, contradicts_principle, distinguishing_mcq_stem, label_ar);');
  out.writeln('--      - every distinguishing_mcq_stem carries the five structured sub-keys');
  out.writeln('--        (stem_text, distractor_choice_label, distractor_rationale, correct_choice_label, correct_rationale).');
  out.writeln('-- ----------------------------------------------------------------------------');
  out.writeln(r'''DO $verify$
DECLARE
  v_mc_count        INT;
  v_actual_ids      TEXT[];
  v_offender_id     TEXT;
  v_skill_id        UUID;
  -- prereq baseline (must be unchanged by this migration)
  v_total           INT;
  v_sma             INT;
  v_smb             INT;
  v_pc              INT;
  v_svt             INT;
  v_humanities      INT;
  v_cross           INT;
  v_expected_ids    TEXT[] := ARRAY[''' + '\n' + expectedIdsSqlArray + '\n' + r'''  ];
BEGIN
  -- 2a. The target skill row exists.''' + '\n' + r'''  SELECT id INTO v_skill_id FROM public.skills WHERE code = ''' + "'${_sqlString(skillCode)}'" + r''';
  IF v_skill_id IS NULL THEN
    RAISE EXCEPTION ''' + "'" + r'''Migration ''' + migrationNumber + r''' post-condition failed: skill `''' + skillCode + r'''` not found.''' + "'" + r''';
  END IF;

  -- 2b. common_misconceptions has exactly the expected entry count.
  SELECT jsonb_array_length(common_misconceptions)
  INTO   v_mc_count
  FROM   public.skills
  WHERE  code = ''' + "'${_sqlString(skillCode)}'" + r''';
  IF v_mc_count IS DISTINCT FROM ''' + mcCount.toString() + r''' THEN
    RAISE EXCEPTION ''' + "'" + r'''Migration ''' + migrationNumber + r''' post-condition failed: expected ''' + mcCount.toString() + r''' misconceptions on `''' + skillCode + r'''`, got %.''' + "'" + r''', v_mc_count;
  END IF;

  -- 2c. Set equality on misconception IDs (no missing, no extra).
  SELECT array_agg(elem->>''' + "'id'" + r''' ORDER BY elem->>''' + "'id'" + r''')
  INTO   v_actual_ids
  FROM   public.skills,
         LATERAL jsonb_array_elements(common_misconceptions) AS elem
  WHERE  code = ''' + "'${_sqlString(skillCode)}'" + r''';

  IF NOT (v_actual_ids @> v_expected_ids AND v_expected_ids @> v_actual_ids) THEN
    RAISE EXCEPTION ''' + "'" + r'''Migration ''' + migrationNumber + r''' post-condition failed: misconception ID set mismatch. expected=%, actual=%''' + "'" + r''', v_expected_ids, v_actual_ids;
  END IF;

  -- 2d. Every entry carries the canonical six keys.
  SELECT elem->>''' + "'id'" + r'''
  INTO   v_offender_id
  FROM   public.skills,
         LATERAL jsonb_array_elements(common_misconceptions) AS elem
  WHERE  code = ''' + "'${_sqlString(skillCode)}'" + r'''
    AND  NOT (
           elem ? ''' + "'id'" + r''' AND
           elem ? ''' + "'label'" + r''' AND
           elem ? ''' + "'description'" + r''' AND
           elem ? ''' + "'contradicts_principle'" + r''' AND
           elem ? ''' + "'distinguishing_mcq_stem'" + r''' AND
           elem ? ''' + "'label_ar'" + r'''
         )
  LIMIT 1;
  IF v_offender_id IS NOT NULL THEN
    RAISE EXCEPTION ''' + "'" + r'''Migration ''' + migrationNumber + r''' post-condition failed: misconception "%" is missing one of the six canonical keys.''' + "'" + r''', v_offender_id;
  END IF;

  -- 2e. Every distinguishing_mcq_stem is an object with the five structured sub-keys
  --     (per ADR 0009 §B.2 — step 3 reads distractor_choice_label and correct_choice_label).
  SELECT elem->>''' + "'id'" + r'''
  INTO   v_offender_id
  FROM   public.skills,
         LATERAL jsonb_array_elements(common_misconceptions) AS elem
  WHERE  code = ''' + "'${_sqlString(skillCode)}'" + r'''
    AND  NOT (
           jsonb_typeof(elem -> ''' + "'distinguishing_mcq_stem'" + r''') = ''' + "'object'" + r''' AND
           (elem -> ''' + "'distinguishing_mcq_stem'" + r''') ? ''' + "'stem_text'" + r''' AND
           (elem -> ''' + "'distinguishing_mcq_stem'" + r''') ? ''' + "'distractor_choice_label'" + r''' AND
           (elem -> ''' + "'distinguishing_mcq_stem'" + r''') ? ''' + "'distractor_rationale'" + r''' AND
           (elem -> ''' + "'distinguishing_mcq_stem'" + r''') ? ''' + "'correct_choice_label'" + r''' AND
           (elem -> ''' + "'distinguishing_mcq_stem'" + r''') ? ''' + "'correct_rationale'" + r'''
         )
  LIMIT 1;
  IF v_offender_id IS NOT NULL THEN
    RAISE EXCEPTION ''' + "'" + r'''Migration ''' + migrationNumber + r''' post-condition failed: misconception "%" distinguishing_mcq_stem missing structured sub-keys.''' + "'" + r''', v_offender_id;
  END IF;

  -- 2f. Prereq baseline — must be unchanged. Re-asserts ADR 0004's canonical
  --     counts so this content migration cannot silently drift them.
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
  JOIN  skill_stream pre ON pre.id = sp.prerequisite_skill_id;''' + '\n');

  out.writeln('  IF v_sma        <> 98  THEN RAISE EXCEPTION \'Migration $migrationNumber prereq baseline: SMA expected 98, got %\', v_sma; END IF;');
  out.writeln('  IF v_smb        <> 31  THEN RAISE EXCEPTION \'Migration $migrationNumber prereq baseline: SMB expected 31, got %\', v_smb; END IF;');
  out.writeln('  IF v_pc         <> 21  THEN RAISE EXCEPTION \'Migration $migrationNumber prereq baseline: PC expected 21, got %\', v_pc; END IF;');
  out.writeln('  IF v_svt        <> 9   THEN RAISE EXCEPTION \'Migration $migrationNumber prereq baseline: SVT expected 9, got %\', v_svt; END IF;');
  out.writeln('  IF v_humanities <> 42  THEN RAISE EXCEPTION \'Migration $migrationNumber prereq baseline: humanities expected 42, got %\', v_humanities; END IF;');
  out.writeln('  IF v_total      <> 201 THEN RAISE EXCEPTION \'Migration $migrationNumber prereq baseline: total expected 201, got %\', v_total; END IF;');
  out.writeln('  IF v_cross      <> 0   THEN RAISE EXCEPTION \'Migration $migrationNumber prereq baseline: cross-stream edges expected 0, got %\', v_cross; END IF;');
  out.writeln();
  out.writeln('  RAISE NOTICE');
  out.writeln('    \'Migration $migrationNumber verification OK: skill=`$skillCode` misconceptions=% expected_ids_match=true six_keys_present=true structured_stem_shape=true prereq_baseline=unchanged (total=% SMA=% SMB=% PC=% SVT=% humanities=% cross=%)\',');
  out.writeln('    v_mc_count, v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross;');
  out.writeln('END');
  out.writeln('\$verify\$;');
  out.writeln();
  out.writeln('COMMIT;');
  out.writeln();
  out.writeln('-- ============================================================================');
  out.writeln('-- Reversal (manual; repo is forward-only):');
  out.writeln('--');
  out.writeln('--   UPDATE public.skills SET common_misconceptions = \'[]\'::jsonb');
  out.writeln('--   WHERE code = \'$skillCode\';');
  out.writeln('--');
  out.writeln('-- Safe ONLY if no items.distractor_misconceptions or user_misconception_states');
  out.writeln('-- row references any of these misconception IDs. Misconception IDs are');
  out.writeln('-- IMMUTABLE once referenced (ADR 0007, ADR 0008). Verify before running:');
  out.writeln('--   SELECT COUNT(*) FROM public.items');
  out.writeln('--    WHERE distractor_misconceptions::text ~ \'$idPrefix\';');
  out.writeln('--   SELECT COUNT(*) FROM public.user_misconception_states');
  out.writeln('--    WHERE misconception_id LIKE \'$idPrefix%\';');
  out.writeln('-- Both must be 0 to safely reset to [].');
  out.writeln('-- ============================================================================');

  File(outPath).writeAsStringSync(out.toString());
  stdout.writeln('Wrote $outPath');
  stdout.writeln('  skill_code:     $skillCode');
  stdout.writeln('  subject_code:   $subjectCode');
  stdout.writeln('  schema_version: $schemaVersion');
  stdout.writeln('  misconceptions: ${dbEntries.length}');
  stdout.writeln('  ids:');
  for (final id in expectedIds) {
    stdout.writeln('    $id');
  }
}

void _fail(String msg) {
  stderr.writeln('ERROR: $msg');
  exit(1);
}

String _requireString(Map<String, dynamic> m, String key, String entryId) {
  final v = m[key];
  if (v is! String || v.isEmpty) {
    _fail('misconception "$entryId" field "$key" missing or empty');
  }
  return v as String;
}

String _sqlString(String s) => s.replaceAll("'", "''");

String _relPath(String p) {
  // best-effort: strip leading drive + repo prefix for the log line
  final normalised = p.replaceAll('\\', '/');
  final i = normalised.indexOf('backend/');
  return i >= 0 ? normalised.substring(i) : normalised;
}

String _migrationNumberFromPath(String path) {
  final base = path.replaceAll('\\', '/').split('/').last;
  final m = RegExp(r'^(\d{3})_').firstMatch(base);
  return m?.group(1) ?? '???';
}
