import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:hive/hive.dart';

// Tests cache round-trips against the same Hive boxes used by CacheService,
// without invoking Hive.initFlutter (which needs path_provider plugins).

void main() {
  late Directory tempDir;

  setUp(() async {
    tempDir = await Directory.systemTemp.createTemp('bacprep_cache_test');
    Hive.init(tempDir.path);
    await Hive.openBox('sessions');
    await Hive.openBox('profile');
    await Hive.openBox<Map>('answer_queue');
  });

  tearDown(() async {
    await Hive.deleteFromDisk();
    await tempDir.delete(recursive: true);
  });

  test('session JSON round-trips through cache', () async {
    final box = Hive.box('sessions');
    final session = {
      'id': 'sess-1',
      'items': [
        {'id': 'i1', 'skill_id': 's1'},
      ],
    };
    await box.put('latest', session.toString());
    expect(box.get('latest'), session.toString());
  });

  test('answer queue add/flush', () async {
    final box = Hive.box<Map>('answer_queue');
    await box.add({'item_id': 'i1', 'correct': true});
    await box.add({'item_id': 'i2', 'correct': false});
    expect(box.length, 2);

    final pending = box.values.map((e) => Map<String, dynamic>.from(e)).toList();
    expect(pending[0]['item_id'], 'i1');
    expect(pending[1]['correct'], false);

    await box.clear();
    expect(box.length, 0);
  });

  test('profile cache hit/miss', () async {
    final box = Hive.box('profile');
    expect(box.get('data'), isNull);
    await box.put('data', '{"name":"Soufiane"}');
    expect(box.get('data'), contains('Soufiane'));
  });
}
