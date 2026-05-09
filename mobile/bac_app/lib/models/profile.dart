import 'package:equatable/equatable.dart';

enum BacStream {
  sciencesMathsA('sciences_maths_a', 'Sciences Maths A', 'علوم رياضية أ'),
  sciencesMathsB('sciences_maths_b', 'Sciences Maths B', 'علوم رياضية ب'),
  sciencesPhysiques('sciences_physiques', 'Sciences Physiques', 'علوم فيزيائية'),
  svt('svt', 'SVT', 'علوم الحياة والأرض'),
  sciencesEconomiques('sciences_economiques', 'Sciences Économiques', 'علوم اقتصادية'),
  sciencesGestionComptable('sciences_gestion_comptable', 'SGC', 'علوم التدبير المحاسباتي'),
  lettresSciencesHumaines('lettres_sciences_humaines', 'Lettres', 'آداب وعلوم إنسانية'),
  artsAppliques('arts_appliques', 'Arts Appliqués', 'فنون تطبيقية'),
  sciencesChariaa('sciences_chariaa', 'Sciences Chariaa', 'العلوم الشرعية'),
  langueArabe('langue_arabe', 'Langue Arabe', 'اللغة العربية');

  const BacStream(this.value, this.labelFr, this.labelAr);
  final String value;
  final String labelFr;
  final String labelAr;

  static BacStream fromValue(String value) {
    return BacStream.values.firstWhere(
      (e) => e.value == value,
      orElse: () => BacStream.sciencesMathsB,
    );
  }
}

enum ContentLanguage {
  fr('fr'),
  ar('ar'),
  en('en');

  const ContentLanguage(this.value);
  final String value;
}

class Profile extends Equatable {
  final String id;
  final String displayName;
  final String? avatarUrl;
  final BacStream bacStream;
  final int bacYear;
  final DateTime? examDate;
  final ContentLanguage preferredLanguage;
  final int dailyGoalMinutes;
  final int streakCurrent;
  final int streakLongest;
  final int totalXp;
  final bool onboardingCompleted;

  const Profile({
    required this.id,
    required this.displayName,
    this.avatarUrl,
    this.bacStream = BacStream.sciencesMathsB,
    this.bacYear = 2026,
    this.examDate,
    this.preferredLanguage = ContentLanguage.fr,
    this.dailyGoalMinutes = 15,
    this.streakCurrent = 0,
    this.streakLongest = 0,
    this.totalXp = 0,
    this.onboardingCompleted = false,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      id: json['id'] as String,
      displayName: json['display_name'] as String? ?? '',
      avatarUrl: json['avatar_url'] as String?,
      bacStream: BacStream.fromValue(json['bac_stream'] as String? ?? 'sciences_maths_b'),
      bacYear: json['bac_year'] as int? ?? 2026,
      examDate: json['exam_date'] != null ? DateTime.parse(json['exam_date'] as String) : null,
      preferredLanguage: ContentLanguage.values.firstWhere(
        (e) => e.value == (json['preferred_language'] ?? 'fr'),
        orElse: () => ContentLanguage.fr,
      ),
      dailyGoalMinutes: json['daily_goal_minutes'] as int? ?? 15,
      streakCurrent: json['streak_current'] as int? ?? 0,
      streakLongest: json['streak_longest'] as int? ?? 0,
      totalXp: json['total_xp'] as int? ?? 0,
      onboardingCompleted: json['onboarding_completed'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'display_name': displayName,
    'avatar_url': avatarUrl,
    'bac_stream': bacStream.value,
    'bac_year': bacYear,
    'exam_date': examDate?.toIso8601String().split('T').first,
    'preferred_language': preferredLanguage.value,
    'daily_goal_minutes': dailyGoalMinutes,
    'onboarding_completed': onboardingCompleted,
  };

  /// Patch keys for partial updates (avoids resetting fields like avatar_url
  /// to null when only updating display_name). Only includes the keys that
  /// are explicitly passed.
  static Map<String, dynamic> patchJson({
    String? displayName,
    String? avatarUrl,
    BacStream? bacStream,
    DateTime? examDate,
    int? dailyGoalMinutes,
    bool? onboardingCompleted,
  }) {
    final m = <String, dynamic>{};
    if (displayName != null) m['display_name'] = displayName;
    if (avatarUrl != null) m['avatar_url'] = avatarUrl;
    if (bacStream != null) m['bac_stream'] = bacStream.value;
    if (examDate != null) m['exam_date'] = examDate.toIso8601String().split('T').first;
    if (dailyGoalMinutes != null) m['daily_goal_minutes'] = dailyGoalMinutes;
    if (onboardingCompleted != null) m['onboarding_completed'] = onboardingCompleted;
    return m;
  }

  Profile copyWith({
    String? displayName,
    String? avatarUrl,
    BacStream? bacStream,
    int? bacYear,
    DateTime? examDate,
    ContentLanguage? preferredLanguage,
    int? dailyGoalMinutes,
    int? streakCurrent,
    int? totalXp,
    bool? onboardingCompleted,
  }) {
    return Profile(
      id: id,
      displayName: displayName ?? this.displayName,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      bacStream: bacStream ?? this.bacStream,
      bacYear: bacYear ?? this.bacYear,
      examDate: examDate ?? this.examDate,
      preferredLanguage: preferredLanguage ?? this.preferredLanguage,
      dailyGoalMinutes: dailyGoalMinutes ?? this.dailyGoalMinutes,
      streakCurrent: streakCurrent ?? this.streakCurrent,
      streakLongest: streakLongest,
      totalXp: totalXp ?? this.totalXp,
      onboardingCompleted: onboardingCompleted ?? this.onboardingCompleted,
    );
  }

  @override
  List<Object?> get props => [id, bacStream, totalXp, streakCurrent, onboardingCompleted];
}
