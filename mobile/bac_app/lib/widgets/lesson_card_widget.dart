import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/item.dart';
import '../models/skill.dart';
import 'rich_text_renderer.dart';
import 'figure_widget.dart';
import 'math/function_graph_widget.dart';
import 'math/derivative_graph_widget.dart';
import 'math/epsilon_delta_visualizer_widget.dart';
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
import 'math/slope_field_widget.dart';
import 'math/monte_carlo_simulator_widget.dart';
import 'math/euclid_visualizer_widget.dart';
import 'math/geometry_3d_viewer_widget.dart';
import 'animations/concept_animation_widget.dart';
import 'physics/am_modulation_widget.dart';
import 'chemistry/daniell_cell_widget.dart';
import 'chemistry/esterification_animator_widget.dart';
import 'chemistry/titration_simulator_widget.dart';
import 'chemistry/acid_base_ph_widget.dart';
import 'chemistry/equilibrium_qr_k_widget.dart';
import 'chemistry/kinetics_reactor_widget.dart';
import 'svt/punnett_square_widget.dart';
import 'svt/dna_replication_widget.dart';
import 'svt/cell_division_widget.dart';

class LessonCardWidget extends StatefulWidget {
  final LessonCard card;

  const LessonCardWidget({super.key, required this.card});

  @override
  State<LessonCardWidget> createState() => _LessonCardWidgetState();
}

class _LessonCardWidgetState extends State<LessonCardWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<Offset> _slideAnimation;
  late final Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.08),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));
    _fadeAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  // Creates a minimal Item so existing interactive widgets can be reused in lesson mode.
  Item _makeLessonItem() {
    final cfg = widget.card.config ?? {};
    return Item(
      id: 'lesson_preview',
      skillId: 'lesson',
      itemType: ItemType.mcq,
      difficultyLevel: 1,
      question: {
        'stem': widget.card.bodyFr,
        'graph_config': cfg,
        'sim_config': cfg,
      },
    );
  }

  Widget _buildInteractiveWidget() {
    final item = _makeLessonItem();
    const onAnswer = _noOp;

    switch (widget.card.widgetType) {
      case 'function_graph':
        return FunctionGraphWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'derivative_graph':
        return DerivativeGraphWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'epsilon_delta_visualizer':
        return EpsilonDeltaVisualizerWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'sequence_viz':
        return SequenceVisualizerWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'area_curve':
        return AreaUnderCurveWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'complex_plane':
        return ComplexPlaneWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'complex_multiplication':
        return ComplexMultiplicationWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'chain_rule_visualizer':
        return ChainRuleVisualizer(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'sign_table':
        return SignTableWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'probability_tree':
        return ProbabilityTreeWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'limit_calculator':
        return LimitCalculatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'recurrence_solver':
        return RecurrenceSolverWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'sequence_calculator':
        return SequenceCalculatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'system_solver':
        return SystemSolverWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'diff_eq_solver':
        return DiffEqSolverWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'ipp_calculator':
        return IPPCalculatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'force_diagram':
        return ForceDiagramWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'projectile':
        return ProjectileSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'circuit':
        return CircuitSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'wave':
        return WaveSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'rlc':
        return RLCSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'capacitor_charge':
        return CapacitorChargeWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'motion_simulator':
        return MotionSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'refraction_simulator':
        return RefractionSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'titration_simulator':
        return TitrationSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'e_field_uniform':
        return EFieldUniformWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'b_field_uniform':
        return BFieldUniformWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'acid_base_ph':
        return AcidBasePhWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'equilibrium_qr_k':
        return EquilibriumQrKWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'kinetics_reactor':
        return KineticsReactorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'nuclear_decay_simulator':
        return NuclearDecaySimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'pendulum_lab':
        return PendulumLabWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'slope_field':
        return SlopeFieldWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'monte_carlo_simulator':
        return MonteCarloSimulatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'euclid_visualizer':
        return EuclidVisualizerWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'geometry_3d_viewer':
        return Geometry3dViewerWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'concept_animation':
        return ConceptAnimationWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'am_modulation':
        return AmModulationWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'daniell_cell':
        return DaniellCellWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'esterification_animator':
        return EsterificationAnimatorWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'punnett_square':
        return PunnettSquareWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'dna_replication':
        return DNAReplicationWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      case 'cell_division':
        return CellDivisionWidget(item: item, isAnswered: false, onAnswer: onAnswer);
      default:
        return const SizedBox.shrink();
    }
  }

  @override
  Widget build(BuildContext context) {
    final card = widget.card;
    final hasWidget = card.widgetType != null && card.widgetType!.isNotEmpty;
    final isInteractive = card.type == 'interactive' || hasWidget;

    return FadeTransition(
      opacity: _fadeAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: Spacing.lg, vertical: Spacing.sm),
          decoration: BoxDecoration(
            color: Papier.surface,
            border: Border.all(color: Papier.line2),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Type header — left accent bar + smallCaps label
              Container(
                decoration: BoxDecoration(
                  color: Papier.bg2,
                  border: Border(
                    left: BorderSide(color: card.color, width: 4),
                    bottom: const BorderSide(color: Papier.line2),
                  ),
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: Spacing.md,
                  vertical: 10,
                ),
                child: Row(
                  children: [
                    Icon(card.icon, color: card.color, size: 16),
                    const SizedBox(width: 8),
                    Text(
                      card.typeLabel.toUpperCase(),
                      style: PapierType.smallCaps(
                        fontSize: 10,
                        color: Papier.ink2,
                      ),
                    ),
                  ],
                ),
              ),

              // Content
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(Spacing.lg),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (card.titleFr.isNotEmpty) ...[
                        Text(
                          card.titleFr,
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: Papier.ink,
                          ),
                        ),
                        const SizedBox(height: Spacing.md),
                      ],
                      RichTextRenderer(
                        text: card.bodyFr,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          height: 1.7,
                          color: Papier.ink,
                        ),
                      ),
                      if (!isInteractive)
                        FigureWidget(figure: card.figure),
                      if (isInteractive) ...[
                        const SizedBox(height: Spacing.md),
                        const Divider(color: Papier.line2, height: 1),
                        const SizedBox(height: Spacing.md),
                        // Absorb horizontal drags so the lesson screen's
                        // swipe-to-navigate gesture doesn't steal touches
                        // from sliders/canvases inside interactive widgets.
                        GestureDetector(
                          behavior: HitTestBehavior.opaque,
                          onHorizontalDragStart: (_) {},
                          onHorizontalDragUpdate: (_) {},
                          child: SizedBox(
                            height: 340,
                            child: _buildInteractiveWidget(),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void _noOp(dynamic _) {}
