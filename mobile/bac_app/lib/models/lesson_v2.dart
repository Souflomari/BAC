/// Long-form lesson schema (v2) — replaces the bite-sized v1 cards.
///
/// A v2 lesson is a sequence of *sections*, each containing typed *blocks*:
/// paragraphs, formulas, callouts, worked examples, interactive widgets,
/// checkpoint quizzes, "try it yourself" exercises, headings, dividers.
///
/// JSON shape stored in `skills.lesson` (Supabase Postgres JSONB):
///
/// ```json
/// {
///   "version": 2,
///   "title_fr": "...",
///   "subtitle_fr": "...",
///   "sections": [
///     {
///       "kind": "prerequisite",
///       "title_fr": "...",
///       "eyebrow_fr": "PRÉREQUIS",
///       "estimated_minutes": "3",
///       "blocks": [ {"kind": "paragraph", "md": "..."}, ... ]
///     }
///   ]
/// }
/// ```
///
/// The router decides between v1 and v2 by checking `lesson?['version'] == 2`
/// (see `lib/screens/subjects/lesson_screen.dart`).
library;

class LessonV2 {
  final String skillId;
  final String titleFr;
  final String? subtitleFr;
  final List<LessonSection> sections;

  const LessonV2({
    required this.skillId,
    required this.titleFr,
    this.subtitleFr,
    required this.sections,
  });

  factory LessonV2.fromJson(String skillId, Map<String, dynamic> json) {
    final sectionsJson = json['sections'] as List? ?? const [];
    return LessonV2(
      skillId: skillId,
      titleFr: json['title_fr'] as String? ?? '',
      subtitleFr: json['subtitle_fr'] as String?,
      sections: sectionsJson
          .whereType<Map<String, dynamic>>()
          .map(LessonSection.fromJson)
          .toList(growable: false),
    );
  }

  /// Total estimated reading minutes (sum of section estimates), best-effort.
  int get totalEstimatedMinutes {
    var total = 0;
    for (final s in sections) {
      final m = int.tryParse(s.estimatedMinutes ?? '');
      if (m != null) total += m;
    }
    return total;
  }
}

enum LessonSectionKind {
  prerequisite,
  concept,
  exampleWalkthrough,
  practice,
  deepen,
  synthesis;

  static LessonSectionKind fromValue(String value) {
    switch (value) {
      case 'prerequisite':
        return LessonSectionKind.prerequisite;
      case 'concept':
        return LessonSectionKind.concept;
      case 'example_walkthrough':
        return LessonSectionKind.exampleWalkthrough;
      case 'practice':
        return LessonSectionKind.practice;
      case 'deepen':
        return LessonSectionKind.deepen;
      case 'synthesis':
        return LessonSectionKind.synthesis;
      default:
        return LessonSectionKind.concept;
    }
  }
}

class LessonSection {
  final LessonSectionKind kind;
  final String titleFr;
  final String? eyebrowFr; // small-caps label e.g. "PRÉREQUIS"
  final String? estimatedMinutes;
  final List<LessonBlock> blocks;

  const LessonSection({
    required this.kind,
    required this.titleFr,
    this.eyebrowFr,
    this.estimatedMinutes,
    required this.blocks,
  });

  factory LessonSection.fromJson(Map<String, dynamic> json) {
    final blocksJson = json['blocks'] as List? ?? const [];
    return LessonSection(
      kind: LessonSectionKind.fromValue(json['kind'] as String? ?? 'concept'),
      titleFr: json['title_fr'] as String? ?? '',
      eyebrowFr: json['eyebrow_fr'] as String?,
      estimatedMinutes: json['estimated_minutes'] as String?,
      blocks: blocksJson
          .whereType<Map<String, dynamic>>()
          .map(LessonBlock.fromJson)
          .toList(growable: false),
    );
  }
}

/// Sealed family of block types. The JSON discriminator is `kind`.
sealed class LessonBlock {
  const LessonBlock();

  static LessonBlock fromJson(Map<String, dynamic> json) {
    final kind = json['kind'] as String? ?? 'paragraph';
    switch (kind) {
      case 'paragraph':
        return ParagraphBlock(md: json['md'] as String? ?? '');
      case 'heading':
        return HeadingBlock(
          text: json['text'] as String? ?? '',
          level: json['level'] as int? ?? 2,
        );
      case 'formula':
        return FormulaBlock(
          latex: json['latex'] as String? ?? '',
          captionFr: json['caption_fr'] as String?,
        );
      case 'callout':
        return CalloutBlock(
          tone: json['tone'] as String? ?? 'note',
          titleFr: json['title_fr'] as String? ?? '',
          bodyFr: json['body_fr'] as String? ?? '',
        );
      case 'example':
        return ExampleBlock(
          titleFr: json['title_fr'] as String? ?? 'Exemple',
          problemFr: json['problem_fr'] as String? ?? '',
          stepsFr: ((json['steps_fr'] as List?) ?? const [])
              .whereType<String>()
              .toList(growable: false),
          answerFr: json['answer_fr'] as String?,
        );
      case 'interactive':
        return InteractiveBlock(
          widgetType: json['widget_type'] as String? ?? '',
          config: json['config'] as Map<String, dynamic>?,
          captionFr: json['caption_fr'] as String?,
        );
      case 'checkpoint':
        final qs = ((json['questions'] as List?) ?? const [])
            .whereType<Map<String, dynamic>>()
            .map(CheckpointQuestion.fromJson)
            .toList(growable: false);
        return CheckpointBlock(
          titleFr: json['title_fr'] as String? ?? 'Checkpoint',
          questions: qs,
        );
      case 'try_it':
        return TryItBlock(
          titleFr: json['title_fr'] as String? ?? 'À toi de jouer',
          problemFr: json['problem_fr'] as String? ?? '',
          hintFr: json['hint_fr'] as String? ?? '',
          solutionFr: json['solution_fr'] as String? ?? '',
        );
      case 'divider':
        return const DividerBlock();
      default:
        return ParagraphBlock(md: '[bloc inconnu: $kind]');
    }
  }
}

class ParagraphBlock extends LessonBlock {
  /// Body text. Supports the same lightweight markup as `RichTextRenderer`:
  /// `$..$` and `$$..$$` for inline/display LaTeX, `**bold**`, `*italic*`,
  /// blank line = paragraph break.
  final String md;
  const ParagraphBlock({required this.md});
}

class HeadingBlock extends LessonBlock {
  final String text;
  final int level; // 2 = h2, 3 = h3
  const HeadingBlock({required this.text, this.level = 2});
}

class FormulaBlock extends LessonBlock {
  final String latex;
  final String? captionFr;
  const FormulaBlock({required this.latex, this.captionFr});
}

class CalloutBlock extends LessonBlock {
  /// 'note' | 'warning' | 'insight' | 'pitfall'
  final String tone;
  final String titleFr;
  final String bodyFr;
  const CalloutBlock({
    required this.tone,
    required this.titleFr,
    required this.bodyFr,
  });
}

class ExampleBlock extends LessonBlock {
  final String titleFr;
  final String problemFr;
  final List<String> stepsFr;
  final String? answerFr;
  const ExampleBlock({
    required this.titleFr,
    required this.problemFr,
    required this.stepsFr,
    this.answerFr,
  });
}

class InteractiveBlock extends LessonBlock {
  final String widgetType;
  final Map<String, dynamic>? config;
  final String? captionFr;
  const InteractiveBlock({
    required this.widgetType,
    this.config,
    this.captionFr,
  });
}

class CheckpointBlock extends LessonBlock {
  final String titleFr;
  final List<CheckpointQuestion> questions;
  const CheckpointBlock({
    required this.titleFr,
    required this.questions,
  });
}

class CheckpointQuestion {
  final String stemFr;
  final List<String> choicesFr;
  final int correctIndex;
  final String explanationFr;
  const CheckpointQuestion({
    required this.stemFr,
    required this.choicesFr,
    required this.correctIndex,
    required this.explanationFr,
  });

  factory CheckpointQuestion.fromJson(Map<String, dynamic> json) {
    return CheckpointQuestion(
      stemFr: json['stem_fr'] as String? ?? '',
      choicesFr: ((json['choices_fr'] as List?) ?? const [])
          .whereType<String>()
          .toList(growable: false),
      correctIndex: json['correct_index'] as int? ?? 0,
      explanationFr: json['explanation_fr'] as String? ?? '',
    );
  }
}

class TryItBlock extends LessonBlock {
  final String titleFr;
  final String problemFr;
  final String hintFr;
  final String solutionFr;
  const TryItBlock({
    required this.titleFr,
    required this.problemFr,
    required this.hintFr,
    required this.solutionFr,
  });
}

class DividerBlock extends LessonBlock {
  const DividerBlock();
}
