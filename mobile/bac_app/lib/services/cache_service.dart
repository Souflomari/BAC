import 'dart:convert';
import 'package:hive_flutter/hive_flutter.dart';

class CacheService {
  static const _sessionBox = 'sessions';
  static const _profileBox = 'profile';
  static const _progressBox = 'progress';
  static const _answerQueueBox = 'answer_queue';
  static const _lessonsBox = 'lessons';

  static Future<void> init() async {
    await Hive.initFlutter();
    await Future.wait([
      Hive.openBox(_sessionBox),
      Hive.openBox(_profileBox),
      Hive.openBox(_progressBox),
      Hive.openBox<Map>(_answerQueueBox),
      Hive.openBox(_lessonsBox),
    ]);
  }

  // ── Sessions ──

  Future<void> cacheSession(Map<String, dynamic> sessionJson) async {
    final box = Hive.box(_sessionBox);
    await box.put('latest', jsonEncode(sessionJson));
    await box.put('cached_at', DateTime.now().toIso8601String());
  }

  Map<String, dynamic>? getCachedSession() {
    final box = Hive.box(_sessionBox);
    final raw = box.get('latest') as String?;
    if (raw == null) return null;
    return jsonDecode(raw) as Map<String, dynamic>;
  }

  DateTime? getSessionCacheTime() {
    final box = Hive.box(_sessionBox);
    final ts = box.get('cached_at') as String?;
    return ts != null ? DateTime.tryParse(ts) : null;
  }

  // ── Profile ──

  Future<void> cacheProfile(Map<String, dynamic> profileJson) async {
    final box = Hive.box(_profileBox);
    await box.put('data', jsonEncode(profileJson));
  }

  Map<String, dynamic>? getCachedProfile() {
    final box = Hive.box(_profileBox);
    final raw = box.get('data') as String?;
    if (raw == null) return null;
    return jsonDecode(raw) as Map<String, dynamic>;
  }

  // ── Progress ──

  Future<void> cacheProgress(Map<String, dynamic> progressJson) async {
    final box = Hive.box(_progressBox);
    await box.put('data', jsonEncode(progressJson));
    await box.put('cached_at', DateTime.now().toIso8601String());
  }

  Map<String, dynamic>? getCachedProgress() {
    final box = Hive.box(_progressBox);
    final raw = box.get('data') as String?;
    if (raw == null) return null;
    return jsonDecode(raw) as Map<String, dynamic>;
  }

  // ── Lessons ──

  Future<void> cacheLesson(String skillId, Map<String, dynamic> lessonJson) async {
    final box = Hive.box(_lessonsBox);
    await box.put(skillId, jsonEncode(lessonJson));
  }

  Map<String, dynamic>? getCachedLesson(String skillId) {
    final box = Hive.box(_lessonsBox);
    final raw = box.get(skillId) as String?;
    if (raw == null) return null;
    return jsonDecode(raw) as Map<String, dynamic>;
  }

  // ── Answer Queue (offline answers to sync later) ──

  Future<void> queueAnswer(Map<String, dynamic> answerPayload) async {
    final box = Hive.box<Map>(_answerQueueBox);
    await box.add(answerPayload);
  }

  List<Map<String, dynamic>> getPendingAnswers() {
    final box = Hive.box<Map>(_answerQueueBox);
    return box.values
        .map((e) => Map<String, dynamic>.from(e))
        .toList();
  }

  Future<void> clearPendingAnswers() async {
    final box = Hive.box<Map>(_answerQueueBox);
    await box.clear();
  }

  int get pendingAnswerCount {
    final box = Hive.box<Map>(_answerQueueBox);
    return box.length;
  }

  // ── Utility ──

  Future<void> clearAll() async {
    await Future.wait([
      Hive.box(_sessionBox).clear(),
      Hive.box(_profileBox).clear(),
      Hive.box(_progressBox).clear(),
      Hive.box<Map>(_answerQueueBox).clear(),
      Hive.box(_lessonsBox).clear(),
    ]);
  }
}
