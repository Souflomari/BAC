// Validates an SMA/SMB skill map JSON against widget registry conventions.
//
// Run:
//   dart shared/validate_skill_map.dart shared/skill_map_sciences_maths_a.json
//
// Checks per skill:
//  - has subtopic_id, name_fr, name_ar, difficulty_level (1..5), prerequisites (list)
//  - prerequisites reference subtopic_ids that exist inside the same subject
//  - interactive_resources is a list (may be empty for purely abstract topics)
//  - every resource has widget_type + status in {ready, ready_unwired, todo}
//  - widget_type is a known slug OR status='todo' (to-be-built)
//  - concept_animation refs name a known animation_id
//
// Exits 0 on success, 1 on any error.

import 'dart:convert';
import 'dart:io';

const wiredSlugs = <String>{
  // From mobile/bac_app/lib/widgets/lesson_card_widget.dart switch
  'function_graph',
  'derivative_graph',
  'epsilon_delta_visualizer',
  'sequence_viz',
  'area_curve',
  'complex_plane',
  'complex_multiplication',
  'chain_rule_visualizer',
  'sign_table',
  'probability_tree',
  'limit_calculator',
  'recurrence_solver',
  'sequence_calculator',
  'system_solver',
  'diff_eq_solver',
  'ipp_calculator',
  'force_diagram',
  'projectile',
  'circuit',
  'wave',
  'rlc',
  'capacitor_charge',
  'motion_simulator',
  'refraction_simulator',
  'titration_simulator',
  'e_field_uniform',
  'b_field_uniform',
  'acid_base_ph',
  'equilibrium_qr_k',
  'kinetics_reactor',
  'nuclear_decay_simulator',
  'pendulum_lab',
  'slope_field',
  'monte_carlo_simulator',
  'euclid_visualizer',
  'geometry_3d_viewer',
  'concept_animation',
  'am_modulation',
  'daniell_cell',
  'esterification_animator',
  'punnett_square',
  'dna_replication',
  'cell_division',
};

// Widget classes that exist but aren't yet wired. Empty for now — a follow-up
// PR can repopulate this if a new widget lands without a dispatch case.
const readyUnwiredSlugs = <String>{};

// Slugs to be built in Phase 3 (per the plan).
const todoSlugs = <String>{};

const knownAnimationIds = <String>{
  'eps_delta',
  'local_derivative',
  'integral_as_area',
  'young_slits',
  'resonance',
  'half_life',
  'chemical_equilibrium',
  'magnetic_deflection',
  'complex_rotation',
  'exponential_growth',
};

const validStatuses = <String>{'ready', 'ready_unwired', 'todo'};

void main(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Usage: dart validate_skill_map.dart <skill_map.json>');
    exit(2);
  }
  final path = args[0];
  final raw = File(path).readAsStringSync();
  final root = jsonDecode(raw) as Map<String, dynamic>;

  final errors = <String>[];
  final warnings = <String>[];
  var skillCount = 0;
  var resourceCount = 0;
  final unknownSlugs = <String, int>{};
  final statusCounts = <String, int>{
    'ready': 0,
    'ready_unwired': 0,
    'todo': 0,
  };

  final subjects = root['subjects'] as List;
  for (final s in subjects) {
    final subj = s as Map<String, dynamic>;
    final subjectId = subj['subject_id'] as String? ?? '?';
    final topics = subj['topics'] as List? ?? const [];
    final subjectSubtopicIds = <String>{};

    // First pass — collect all subtopic ids in this subject.
    for (final t in topics) {
      final topic = t as Map<String, dynamic>;
      final skills = topic['skills'] as List? ?? const [];
      for (final sk in skills) {
        final id = (sk as Map)['subtopic_id'] as String?;
        if (id != null) subjectSubtopicIds.add(id);
      }
    }

    // Second pass — validate each skill.
    for (final t in topics) {
      final topic = t as Map<String, dynamic>;
      final topicId = topic['topic_id'] as String? ?? '?';
      final skills = topic['skills'] as List? ?? const [];
      for (final sk in skills) {
        final skill = sk as Map<String, dynamic>;
        skillCount++;
        final subId = skill['subtopic_id'] as String? ?? '?';
        final ctx = '$subjectId/$topicId/$subId';

        for (final field in const ['subtopic_id', 'name_fr', 'name_ar']) {
          if (skill[field] is! String || (skill[field] as String).isEmpty) {
            errors.add('[$ctx] missing or empty $field');
          }
        }
        final diff = skill['difficulty_level'];
        if (diff is! int || diff < 1 || diff > 5) {
          errors.add('[$ctx] difficulty_level must be int 1..5, got $diff');
        }

        final prereqs = skill['prerequisites'];
        if (prereqs is! List) {
          errors.add('[$ctx] prerequisites must be a list');
        } else {
          for (final p in prereqs) {
            if (p is! String) {
              errors.add('[$ctx] prerequisite entry not a string: $p');
            } else if (!subjectSubtopicIds.contains(p)) {
              errors.add('[$ctx] prerequisite "$p" not found in subject $subjectId');
            }
          }
        }

        final res = skill['interactive_resources'];
        if (res == null) {
          warnings.add('[$ctx] no interactive_resources key (treating as empty)');
        } else if (res is! List) {
          errors.add('[$ctx] interactive_resources must be a list');
        } else {
          if (res.isEmpty) {
            warnings.add('[$ctx] interactive_resources is empty');
          }
          for (final r in res) {
            resourceCount++;
            if (r is! Map) {
              errors.add('[$ctx] resource entry not an object');
              continue;
            }
            final wt = r['widget_type'] as String?;
            final status = r['status'] as String?;
            if (wt == null || wt.isEmpty) {
              errors.add('[$ctx] resource missing widget_type');
              continue;
            }
            if (status == null || !validStatuses.contains(status)) {
              errors.add('[$ctx/$wt] status must be one of $validStatuses, got "$status"');
            } else {
              statusCounts[status] = (statusCounts[status] ?? 0) + 1;
            }
            // Slug must be known in some registry, OR explicitly status=todo.
            final known = wiredSlugs.contains(wt) ||
                readyUnwiredSlugs.contains(wt) ||
                todoSlugs.contains(wt);
            if (!known) {
              unknownSlugs[wt] = (unknownSlugs[wt] ?? 0) + 1;
              errors.add('[$ctx] unknown widget_type "$wt" (not in any registry)');
            }
            // Status / registry consistency.
            if (status == 'ready' && !wiredSlugs.contains(wt)) {
              errors.add('[$ctx/$wt] status=ready but slug is not in wiredSlugs');
            }
            if (status == 'ready_unwired' && !readyUnwiredSlugs.contains(wt)) {
              errors.add('[$ctx/$wt] status=ready_unwired but slug is not in readyUnwiredSlugs');
            }
            if (status == 'todo' && !todoSlugs.contains(wt)) {
              errors.add('[$ctx/$wt] status=todo but slug is not in todoSlugs');
            }
            // concept_animation requires a known animation_id.
            if (wt == 'concept_animation') {
              final cfg = r['config'] as Map?;
              final aid = cfg?['animation_id'] as String?;
              if (aid == null || aid.isEmpty) {
                errors.add('[$ctx] concept_animation missing config.animation_id');
              } else if (!knownAnimationIds.contains(aid)) {
                errors.add('[$ctx] unknown animation_id "$aid"');
              }
            }
          }
        }
      }
    }
  }

  stdout.writeln('--- Skill map validation: $path ---');
  stdout.writeln('Skills:    $skillCount');
  stdout.writeln('Resources: $resourceCount');
  stdout.writeln('  ready:         ${statusCounts['ready']}');
  stdout.writeln('  ready_unwired: ${statusCounts['ready_unwired']}');
  stdout.writeln('  todo:          ${statusCounts['todo']}');
  if (warnings.isNotEmpty) {
    stdout.writeln('\nWarnings: ${warnings.length}');
    for (final w in warnings) {
      stdout.writeln('  ! $w');
    }
  }
  if (errors.isNotEmpty) {
    stderr.writeln('\nErrors: ${errors.length}');
    for (final e in errors) {
      stderr.writeln('  x $e');
    }
    exit(1);
  }
  stdout.writeln('\nOK');
}
