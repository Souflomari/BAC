/// Single source of truth for dispatching a widget-slug to its Flutter
/// implementation. Used by:
///   - [LessonCardWidget] for v1 lesson cards
///   - [LongLessonScreen]'s _InteractiveView for v2 lesson interactive blocks
///   - The animated solution panel (this run) for embedding widgets in
///     exam answer steps
///
/// Returns null when the slug isn't recognized — callers can fall back
/// to a no-op SizedBox or surface a "widget non disponible" notice.
library interactive_widget_dispatch;

import 'package:flutter/material.dart';
import '../models/item.dart';

import 'math/function_graph_widget.dart';
import 'math/derivative_graph_widget.dart';
import 'math/sequence_visualizer_widget.dart';
import 'math/area_under_curve_widget.dart';
import 'math/complex_plane_widget.dart';
import 'math/complex_multiplication_widget.dart';
import 'math/chain_rule_visualizer.dart';
import 'math/sign_table_widget.dart';
import 'math/probability_tree_widget.dart';
import 'math/limit_calculator_widget.dart';
import 'math/recurrence_solver_widget.dart';
import 'math/sequence_calculator_widget.dart';
import 'math/system_solver_widget.dart';
import 'math/diff_eq_solver_widget.dart';
import 'math/ipp_calculator_widget.dart';
import 'math/epsilon_delta_visualizer_widget.dart';
import 'math/slope_field_widget.dart';
import 'math/monte_carlo_simulator_widget.dart';
import 'math/euclid_visualizer_widget.dart';
import 'math/geometry_3d_viewer_widget.dart';
import 'physics/force_diagram_widget.dart';
import 'physics/projectile_simulator_widget.dart';
import 'physics/circuit_simulator_widget.dart';
import 'physics/wave_simulator_widget.dart';
import 'physics/rlc_simulator_widget.dart';
import 'physics/capacitor_charge_widget.dart';
import 'physics/motion_simulator_widget.dart';
import 'physics/refraction_simulator_widget.dart';
import 'physics/e_field_uniform_widget.dart';
import 'physics/b_field_uniform_widget.dart';
import 'physics/nuclear_decay_simulator_widget.dart';
import 'physics/pendulum_lab_widget.dart';
import 'physics/am_modulation_widget.dart';
import 'chemistry/titration_simulator_widget.dart';
import 'chemistry/acid_base_ph_widget.dart';
import 'chemistry/equilibrium_qr_k_widget.dart';
import 'chemistry/kinetics_reactor_widget.dart';
import 'chemistry/daniell_cell_widget.dart';
import 'chemistry/esterification_animator_widget.dart';
import 'svt/punnett_square_widget.dart';
import 'svt/dna_replication_widget.dart';
import 'svt/cell_division_widget.dart';
import 'animations/concept_animation_widget.dart';

void _noOp(dynamic _) {}

/// Build the interactive widget for [slug]. [config] is passed through
/// as the item's question payload so individual widgets can read their
/// per-instance parameters.
///
/// Returns null when [slug] isn't recognized.
Widget? buildInteractiveWidgetBySlug(
  String slug, {
  Map<String, dynamic>? config,
}) {
  final item = Item(
    id: 'embed_${slug}_${DateTime.now().microsecondsSinceEpoch}',
    skillId: 'embed',
    itemType: ItemType.mcq,
    difficultyLevel: 1,
    question: <String, dynamic>{
      'stem': '',
      if (config != null) 'graph_config': config,
      if (config != null) 'sim_config': config,
      if (config != null) ...config,
    },
  );
  switch (slug) {
    case 'function_graph':
      return FunctionGraphWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'derivative_graph':
      return DerivativeGraphWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'epsilon_delta_visualizer':
      return EpsilonDeltaVisualizerWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'sequence_viz':
      return SequenceVisualizerWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'area_curve':
      return AreaUnderCurveWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'complex_plane':
      return ComplexPlaneWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'complex_multiplication':
      return ComplexMultiplicationWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'chain_rule_visualizer':
      return ChainRuleVisualizer(item: item, isAnswered: false, onAnswer: _noOp);
    case 'sign_table':
      return SignTableWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'probability_tree':
      return ProbabilityTreeWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'limit_calculator':
      return LimitCalculatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'recurrence_solver':
      return RecurrenceSolverWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'sequence_calculator':
      return SequenceCalculatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'system_solver':
      return SystemSolverWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'diff_eq_solver':
      return DiffEqSolverWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'ipp_calculator':
      return IPPCalculatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'force_diagram':
      return ForceDiagramWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'projectile':
      return ProjectileSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'circuit':
      return CircuitSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'wave':
      return WaveSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'rlc':
      return RLCSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'capacitor_charge':
      return CapacitorChargeWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'motion_simulator':
      return MotionSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'refraction_simulator':
      return RefractionSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'titration_simulator':
      return TitrationSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'e_field_uniform':
      return EFieldUniformWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'b_field_uniform':
      return BFieldUniformWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'acid_base_ph':
      return AcidBasePhWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'equilibrium_qr_k':
      return EquilibriumQrKWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'kinetics_reactor':
      return KineticsReactorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'nuclear_decay_simulator':
      return NuclearDecaySimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'pendulum_lab':
      return PendulumLabWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'slope_field':
      return SlopeFieldWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'monte_carlo_simulator':
      return MonteCarloSimulatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'euclid_visualizer':
      return EuclidVisualizerWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'geometry_3d_viewer':
      return Geometry3dViewerWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'concept_animation':
      return ConceptAnimationWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'am_modulation':
      return AmModulationWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'daniell_cell':
      return DaniellCellWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'esterification_animator':
      return EsterificationAnimatorWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'punnett_square':
      return PunnettSquareWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'dna_replication':
      return DNAReplicationWidget(item: item, isAnswered: false, onAnswer: _noOp);
    case 'cell_division':
      return CellDivisionWidget(item: item, isAnswered: false, onAnswer: _noOp);
    default:
      return null;
  }
}
