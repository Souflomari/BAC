import 'package:flutter_test/flutter_test.dart';
import 'package:bac_app/models/item.dart';

void main() {
  group('Item.fromJson/toJson round-trip', () {
    test('mcq item preserves all fields', () {
      final json = {
        'id': 'i1',
        'skill_id': 's1',
        'item_type': 'mcq',
        'difficulty_level': 2,
        'content_language': 'fr',
        'question': {
          'stem': 'What is 2+2?',
          'choices': ['3', '4', '5'],
          'correct_index': 1,
        },
        'explanation': {'text_fr': 'Because.'},
        'hint': {'text_fr': 'Add them.'},
        'tags': ['math', 'easy'],
      };
      final item = Item.fromJson(json);
      expect(item.id, 'i1');
      expect(item.itemType, ItemType.mcq);
      expect(item.choices, ['3', '4', '5']);
      expect(item.correctIndex, 1);
      expect(item.tags, ['math', 'easy']);

      final back = item.toJson();
      expect(back['id'], 'i1');
      expect(back['item_type'], 'mcq');
      expect(back['question'], json['question']);
    });

    test('numeric item exposes correctValue/tolerance/unit', () {
      final item = Item.fromJson({
        'id': 'n1',
        'skill_id': 's1',
        'item_type': 'numeric',
        'difficulty_level': 1,
        'question': {
          'correct_value': 9.81,
          'tolerance': 0.05,
          'unit': 'm/s²',
        },
      });
      expect(item.itemType, ItemType.numeric);
      expect(item.correctValue, 9.81);
      expect(item.tolerance, 0.05);
      expect(item.unit, 'm/s²');
    });

    test('unknown item_type falls back to mcq', () {
      final item = Item.fromJson({
        'id': 'x',
        'skill_id': 's',
        'item_type': 'totally_made_up',
        'difficulty_level': 1,
        'question': {},
      });
      expect(item.itemType, ItemType.mcq);
    });

    test('SessionItem round-trip', () {
      final json = {
        'item': {
          'id': 'i1',
          'skill_id': 's1',
          'item_type': 'true_false',
          'difficulty_level': 1,
          'question': {'correct_answer': true},
        },
        'skill': {
          'id': 's1',
          'name_fr': 'Limites',
          'name_ar': 'النهايات',
          'difficulty_level': 2,
        },
        'reason': 'weak',
      };
      final si = SessionItem.fromJson(json);
      expect(si.skillId, 's1');
      expect(si.skillNameAr, 'النهايات');
      expect(si.reason, 'weak');
      expect(si.item.correctAnswer, true);
      final back = si.toJson();
      expect(back['reason'], 'weak');
      expect((back['skill'] as Map)['name_ar'], 'النهايات');
    });
  });
}
