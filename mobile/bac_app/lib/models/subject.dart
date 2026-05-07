import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import '../config/theme.dart';

class Subject extends Equatable {
  final String id;
  final String code;
  final String nameFr;
  final String nameAr;
  final String? icon;
  final String? colorHex;
  final String examType;
  final String contentLanguage;
  final int displayOrder;
  final double coefficient;

  const Subject({
    required this.id,
    required this.code,
    required this.nameFr,
    required this.nameAr,
    this.icon,
    this.colorHex,
    this.examType = 'national',
    this.contentLanguage = 'fr',
    this.displayOrder = 0,
    this.coefficient = 1.0,
  });

  Color get color {
    if (colorHex != null) {
      try {
        return Color(int.parse(colorHex!.replaceFirst('#', '0xFF')));
      } catch (_) {}
    }
    switch (code) {
      case 'math': return BacPrepColors.math;
      case 'physics': return BacPrepColors.physics;
      case 'svt': return BacPrepColors.biology;
      case 'philosophy': return BacPrepColors.philosophy;
      case 'french': return BacPrepColors.french;
      case 'arabic': return BacPrepColors.arabic;
      case 'english': return BacPrepColors.english;
      default: return BacPrepColors.primary;
    }
  }

  IconData get iconData {
    switch (code) {
      case 'math': return Icons.calculate_outlined;
      case 'physics': return Icons.science_outlined;
      case 'svt': return Icons.eco_outlined;
      case 'philosophy': return Icons.psychology_outlined;
      case 'french': return Icons.menu_book_outlined;
      case 'arabic': return Icons.translate_outlined;
      case 'english': return Icons.language_outlined;
      case 'islamic_ed': return Icons.auto_stories_outlined;
      case 'engineering': return Icons.engineering_outlined;
      default: return Icons.school_outlined;
    }
  }

  factory Subject.fromJson(Map<String, dynamic> json) {
    return Subject(
      id: json['id'] as String,
      code: json['code'] as String,
      nameFr: json['name_fr'] as String,
      nameAr: json['name_ar'] as String,
      icon: json['icon'] as String?,
      colorHex: json['color'] as String?,
      examType: json['exam_type'] as String? ?? 'national',
      contentLanguage: json['content_language'] as String? ?? 'fr',
      displayOrder: json['display_order'] as int? ?? 0,
      coefficient: (json['coefficient'] as num?)?.toDouble() ?? 1.0,
    );
  }

  @override
  List<Object?> get props => [id, code];
}
