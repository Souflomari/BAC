import 'package:equatable/equatable.dart';

enum ItemType {
  mcq,
  numeric,
  shortText,
  trueFalse,
  ordering,
  fillBlank,
  matching,
  multiStep,
  graph,
  simulate,
  dragPoint,
  adjustSlider,
  sequence,
  limit,
  derivative,
  chainRule,
  integration,
  ipp,
  complexMult,
  diffEq,
  recurrence,
  system,
  probability,
  signTable,
  motion,
  projectile,
  capacitor,
  rlc,
  refraction,
  punnett,
  dnaReplication,
  cellDivision;

  static ItemType fromValue(String value) {
    switch (value) {
      case 'mcq': return ItemType.mcq;
      case 'numeric': return ItemType.numeric;
      case 'short_text': return ItemType.shortText;
      case 'true_false': return ItemType.trueFalse;
      case 'ordering': return ItemType.ordering;
      case 'fill_blank': return ItemType.fillBlank;
      case 'matching': return ItemType.matching;
      case 'multi_step': return ItemType.multiStep;
      case 'graph': return ItemType.graph;
      case 'simulate': return ItemType.simulate;
      case 'drag_point': return ItemType.dragPoint;
      case 'adjust_slider': return ItemType.adjustSlider;
      case 'sequence': return ItemType.sequence;
      case 'limit': return ItemType.limit;
      case 'derivative': return ItemType.derivative;
      case 'chain_rule': return ItemType.chainRule;
      case 'integration': return ItemType.integration;
      case 'ipp': return ItemType.ipp;
      case 'complex_mult': return ItemType.complexMult;
      case 'diff_eq': return ItemType.diffEq;
      case 'recurrence': return ItemType.recurrence;
      case 'system': return ItemType.system;
      case 'probability': return ItemType.probability;
      case 'sign_table': return ItemType.signTable;
      case 'motion': return ItemType.motion;
      case 'projectile': return ItemType.projectile;
      case 'capacitor': return ItemType.capacitor;
      case 'rlc': return ItemType.rlc;
      case 'refraction': return ItemType.refraction;
      case 'punnett': return ItemType.punnett;
      case 'dna_replication': return ItemType.dnaReplication;
      case 'cell_division': return ItemType.cellDivision;
      default: return ItemType.mcq;
    }
  }
}

class Item extends Equatable {
  final String id;
  final String skillId;
  final ItemType itemType;
  final int difficultyLevel;
  final String contentLanguage;
  final Map<String, dynamic> question;
  final Map<String, dynamic>? explanation;
  final Map<String, dynamic>? hint;
  final List<String> tags;

  const Item({
    required this.id,
    required this.skillId,
    required this.itemType,
    required this.difficultyLevel,
    this.contentLanguage = 'fr',
    required this.question,
    this.explanation,
    this.hint,
    this.tags = const [],
  });

  // --- Accessors for common question fields ---

  String get stem => question['stem'] as String? ?? '';
  String? get stemAr => question['stem_ar'] as String?;
  bool get hasLatex => question['latex'] as bool? ?? false;

  // MCQ specific
  List<String> get choices =>
      (question['choices'] as List?)?.cast<String>() ?? [];
  int get correctIndex => question['correct_index'] as int? ?? 0;

  // Numeric specific
  double get correctValue =>
      (question['correct_value'] as num?)?.toDouble() ?? 0;
  double get tolerance =>
      (question['tolerance'] as num?)?.toDouble() ?? 0;
  String? get unit => question['unit'] as String?;

  // Short text specific
  List<String> get acceptableAnswers =>
      (question['acceptable_answers'] as List?)?.cast<String>() ?? [];

  // True/false specific
  bool get correctAnswer => question['correct_answer'] as bool? ?? true;

  // Explanation
  String get explanationText =>
      explanation?['text_fr'] as String? ?? '';
  List<String> get explanationSteps =>
      (explanation?['steps'] as List?)?.cast<String>() ?? [];
  String? get explanationReference => explanation?['reference'] as String?;

  // Figures
  Map<String, dynamic>? get questionFigure =>
      question['figure'] as Map<String, dynamic>?;
  Map<String, dynamic>? get explanationFigure =>
      explanation?['figure'] as Map<String, dynamic>?;

  // Hint
  String? get hintText => hint?['text_fr'] as String?;

  // Contrastive wrong-answer explanations (MCQ)
  List<String?> get wrongChoiceExplanations =>
      (explanation?['wrong_choice_explanations'] as List?)
          ?.map((e) => e as String?)
          .toList() ??
      [];

  // Elaborative interrogation: "Pourquoi ?"
  String? get whyPrompt => explanation?['why_prompt'] as String?;
  String? get whyAnswer => explanation?['why_answer'] as String?;

  // Elaborative: "Et si...?"
  String? get whatIfPrompt =>
      (explanation?['what_if'] as Map<String, dynamic>?)?['prompt'] as String?;
  String? get whatIfAnswer =>
      (explanation?['what_if'] as Map<String, dynamic>?)?['answer'] as String?;

  // Graph / Interactive specific
  Map<String, dynamic> get graphConfig =>
      question['graph_config'] as Map<String, dynamic>? ?? {};
  Map<String, dynamic> get simConfig =>
      question['sim_config'] as Map<String, dynamic>? ?? {};

  // Graph mode: function, range, mode (derivative, integral, etc.)
  String get function => graphConfig['function'] as String? ?? '';
  String get graphMode => graphConfig['mode'] as String? ?? 'default';
  double get xMin => (graphConfig['x_min'] as num?)?.toDouble() ?? -10;
  double get xMax => (graphConfig['x_max'] as num?)?.toDouble() ?? 10;
  double get yMin => (graphConfig['y_min'] as num?)?.toDouble() ?? -10;
  double get yMax => (graphConfig['y_max'] as num?)?.toDouble() ?? 10;
  double? get showTangentAt => (graphConfig['show_tangent_at'] as num?)?.toDouble();
  bool get showDerivative => graphConfig['show_derivative'] as bool? ?? false;

  // Sim config: type, scenario, target variables
  String get simType => simConfig['type'] as String? ?? 'generic';
  String get simScenario => simConfig['scenario'] as String? ?? 'default';
  Map<String, dynamic> get targetConfig =>
      simConfig['target'] as Map<String, dynamic>? ?? {};
  String get targetVariable => targetConfig['variable'] as String? ?? '';
  double get targetValue => (targetConfig['value'] as num?)?.toDouble() ?? 0;
  double get targetTime => (targetConfig['time'] as num?)?.toDouble() ?? 0;
  double get targetPosition => (targetConfig['position'] as num?)?.toDouble() ?? 0;

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      id: json['id'] as String,
      skillId: json['skill_id'] as String,
      itemType: ItemType.fromValue(json['item_type'] as String? ?? 'mcq'),
      difficultyLevel: json['difficulty_level'] as int? ?? 1,
      contentLanguage: json['content_language'] as String? ?? 'fr',
      question: json['question'] as Map<String, dynamic>? ?? {},
      explanation: json['explanation'] as Map<String, dynamic>?,
      hint: json['hint'] as Map<String, dynamic>?,
      tags: (json['tags'] as List?)?.cast<String>() ?? [],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'skill_id': skillId,
    'item_type': itemType.name,
    'difficulty_level': difficultyLevel,
    'content_language': contentLanguage,
    'question': question,
    'explanation': explanation,
    'hint': hint,
    'tags': tags,
  };

  @override
  List<Object?> get props => [id, skillId, itemType];
}

/// An item within a session, with context about why it was selected
class SessionItem {
  final Item item;
  final String skillId;
  final String skillNameFr;
  final String skillNameAr;
  final int skillDifficulty;
  final String reason; // 'review', 'new', 'weak', 'exam_priority'

  const SessionItem({
    required this.item,
    required this.skillId,
    required this.skillNameFr,
    required this.skillNameAr,
    required this.skillDifficulty,
    required this.reason,
  });

  factory SessionItem.fromJson(Map<String, dynamic> json) {
    final itemJson = json['item'] as Map<String, dynamic>;
    final skillJson = json['skill'] as Map<String, dynamic>;

    return SessionItem(
      item: Item.fromJson(itemJson),
      skillId: skillJson['id'] as String,
      skillNameFr: skillJson['name_fr'] as String? ?? '',
      skillNameAr: skillJson['name_ar'] as String? ?? '',
      skillDifficulty: skillJson['difficulty_level'] as int? ?? 1,
      reason: json['reason'] as String? ?? 'review',
    );
  }

  Map<String, dynamic> toJson() => {
    'item': item.toJson(),
    'skill': {
      'id': skillId,
      'name_fr': skillNameFr,
      'name_ar': skillNameAr,
      'difficulty_level': skillDifficulty,
    },
    'reason': reason,
  };
}
