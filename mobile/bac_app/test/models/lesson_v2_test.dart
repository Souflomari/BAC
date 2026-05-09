import 'package:flutter_test/flutter_test.dart';
import 'package:bac_app/models/lesson_v2.dart';

void main() {
  group('LessonV2.fromJson', () {
    test('parses a minimal lesson', () {
      final lesson = LessonV2.fromJson('skill_x', <String, dynamic>{
        'version': 2,
        'title_fr': 'Titre',
        'subtitle_fr': 'Sous-titre',
        'sections': <Map<String, dynamic>>[],
      });
      expect(lesson.skillId, 'skill_x');
      expect(lesson.titleFr, 'Titre');
      expect(lesson.subtitleFr, 'Sous-titre');
      expect(lesson.sections, isEmpty);
    });

    test('parses block types correctly', () {
      final lesson = LessonV2.fromJson('s', <String, dynamic>{
        'title_fr': 'T',
        'sections': <Map<String, dynamic>>[
          <String, dynamic>{
            'kind': 'concept',
            'title_fr': 'Section',
            'estimated_minutes': '5',
            'blocks': <Map<String, dynamic>>[
              <String, dynamic>{'kind': 'paragraph', 'md': 'Hello world'},
              <String, dynamic>{'kind': 'heading', 'text': 'H', 'level': 2},
              <String, dynamic>{
                'kind': 'formula',
                'latex': 'x^2',
                'caption_fr': 'cap',
              },
              <String, dynamic>{
                'kind': 'callout',
                'tone': 'note',
                'title_fr': 'Title',
                'body_fr': 'Body'
              },
              <String, dynamic>{
                'kind': 'checkpoint',
                'title_fr': 'CP',
                'questions': <Map<String, dynamic>>[
                  <String, dynamic>{
                    'stem_fr': 'Q?',
                    'choices_fr': ['A', 'B'],
                    'correct_index': 1,
                    'explanation_fr': 'Because B.',
                  },
                ],
              },
              <String, dynamic>{'kind': 'divider'},
            ],
          },
        ],
      });
      final blocks = lesson.sections.first.blocks;
      expect(blocks[0], isA<ParagraphBlock>());
      expect((blocks[0] as ParagraphBlock).md, 'Hello world');
      expect(blocks[1], isA<HeadingBlock>());
      expect((blocks[1] as HeadingBlock).level, 2);
      expect(blocks[2], isA<FormulaBlock>());
      expect((blocks[2] as FormulaBlock).captionFr, 'cap');
      expect(blocks[3], isA<CalloutBlock>());
      expect((blocks[3] as CalloutBlock).tone, 'note');
      expect(blocks[4], isA<CheckpointBlock>());
      expect((blocks[4] as CheckpointBlock).questions.first.correctIndex, 1);
      expect(blocks[5], isA<DividerBlock>());
    });

    test('unknown block kinds fall back to paragraph', () {
      final lesson = LessonV2.fromJson('s', <String, dynamic>{
        'title_fr': 'T',
        'sections': <Map<String, dynamic>>[
          <String, dynamic>{
            'kind': 'concept',
            'title_fr': 'S',
            'estimated_minutes': '1',
            'blocks': <Map<String, dynamic>>[
              <String, dynamic>{'kind': 'unknown_kind'},
            ],
          },
        ],
      });
      expect(lesson.sections.first.blocks.first, isA<ParagraphBlock>());
    });

    test('totalEstimatedMinutes sums numeric estimates', () {
      final lesson = LessonV2.fromJson('s', <String, dynamic>{
        'title_fr': 'T',
        'sections': <Map<String, dynamic>>[
          <String, dynamic>{
            'kind': 'concept',
            'title_fr': 'S1',
            'estimated_minutes': '3',
            'blocks': <Map<String, dynamic>>[],
          },
          <String, dynamic>{
            'kind': 'synthesis',
            'title_fr': 'S2',
            'estimated_minutes': '5',
            'blocks': <Map<String, dynamic>>[],
          },
          <String, dynamic>{
            'kind': 'concept',
            'title_fr': 'S3',
            'estimated_minutes': 'not-a-number',
            'blocks': <Map<String, dynamic>>[],
          },
        ],
      });
      expect(lesson.totalEstimatedMinutes, 8);
    });
  });

  group('LessonSectionKind.fromValue', () {
    test('maps known kinds', () {
      expect(LessonSectionKind.fromValue('prerequisite'), LessonSectionKind.prerequisite);
      expect(LessonSectionKind.fromValue('synthesis'), LessonSectionKind.synthesis);
      expect(LessonSectionKind.fromValue('example_walkthrough'), LessonSectionKind.exampleWalkthrough);
    });
    test('falls back to concept on unknown', () {
      expect(LessonSectionKind.fromValue('???'), LessonSectionKind.concept);
    });
  });
}
