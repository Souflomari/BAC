import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../math/function_graph_widget.dart';
import '../math/sequence_visualizer_widget.dart';
import '../math/area_under_curve_widget.dart';
import '../math/complex_plane_widget.dart';
import '../physics/motion_simulator_widget.dart';
import '../physics/force_diagram_widget.dart';
import '../physics/circuit_simulator_widget.dart';
import '../physics/wave_simulator_widget.dart';

class InteractiveWidgetDemoScreen extends StatelessWidget {
  const InteractiveWidgetDemoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Interactive Widgets Demo'),
        backgroundColor: BacPrepColors.primary,
        foregroundColor: Colors.white,
      ),
      body: ListView(
        padding: const EdgeInsets.all(Spacing.md),
        children: [
          _SectionHeader(
            title: 'Math Widgets',
            icon: Icons.functions,
            color: BacPrepColors.math,
          ),
          const SizedBox(height: Spacing.sm),
          _WidgetCard(
            title: 'Function Graph',
            description: 'Plot functions, find derivatives, zoom/pan',
            widget: FunctionGraphWidget(
              item: _createFunctionGraphItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.md),
          _WidgetCard(
            title: 'Sequence Visualizer',
            description: 'Watch sequences converge on a number line',
            widget: SequenceVisualizerWidget(
              item: _createSequenceItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.md),
          _WidgetCard(
            title: 'Area Under Curve',
            description: 'Visualize definite integrals',
            widget: AreaUnderCurveWidget(
              item: _createAreaUnderCurveItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.md),
          _WidgetCard(
            title: 'Complex Plane (Argand)',
            description: 'Plot complex numbers, see module & argument',
            widget: ComplexPlaneWidget(
              item: _createComplexPlaneItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.xl),
          _SectionHeader(
            title: 'Physics Widgets',
            icon: Icons.science,
            color: BacPrepColors.physics,
          ),
          const SizedBox(height: Spacing.sm),
          _WidgetCard(
            title: 'Motion Simulator',
            description: 'Animate kinematics: position, velocity, time',
            widget: MotionSimulatorWidget(
              item: _createMotionSimulatorItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.md),
          _WidgetCard(
            title: 'Force Diagram',
            description: 'Interactive inclined plane with force vectors',
            widget: ForceDiagramWidget(
              item: _createForceDiagramItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.md),
          _WidgetCard(
            title: 'Circuit Simulator (RC)',
            description: 'Watch capacitor charge/discharge curves',
            widget: CircuitSimulatorWidget(
              item: _createCircuitSimulatorItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.md),
          _WidgetCard(
            title: 'Wave Simulator',
            description: 'Double-slit interference pattern',
            widget: WaveSimulatorWidget(
              item: _createWaveSimulatorItem(),
              isAnswered: false,
              onAnswer: (answer) => debugPrint('Answer: $answer'),
            ),
          ),
          const SizedBox(height: Spacing.xl),
        ],
      ),
    );
  }

  Item _createFunctionGraphItem() {
    return Item(
      id: 'test-graph-1',
      skillId: 'test',
      itemType: ItemType.graph,
      difficultyLevel: 3,
      question: {
        'stem': 'Soit \$f(x) = x^2 - 4\$. Touchez le graphe pour lire les coordonnées et trouver \$f\'(2)\$',
        'graph_config': {
          'function': 'x^2 - 4',
          'mode': 'derivative',
          'x_min': -5.0,
          'x_max': 5.0,
          'y_min': -10.0,
          'y_max': 10.0,
          'show_tangent_at': 2.0,
        },
      },
      explanation: {
        'text_fr': 'La dérivée de x² - 4 est 2x, donc f\'(2) = 4',
      },
    );
  }

  Item _createSequenceItem() {
    return Item(
      id: 'test-sequence-1',
      skillId: 'test',
      itemType: ItemType.dragPoint,
      difficultyLevel: 3,
      question: {
        'stem': 'Suite définie par \$U_{n+1} = (U_n + 3)/2\$ avec \$U_0 = 1\$. Vers quelle valeur converge-t-elle ?',
        'sim_config': {
          'sequence_type': 'recursive',
          'recursive': 'next = (current + 3) / 2',
          'initial': 1.0,
          'mode': 'convergence',
        },
      },
      explanation: {
        'text_fr': 'La limite L vérifie L = (L+3)/2, donc L = 3',
      },
    );
  }

  Item _createAreaUnderCurveItem() {
    return Item(
      id: 'test-area-1',
      skillId: 'test',
      itemType: ItemType.graph,
      difficultyLevel: 3,
      question: {
        'stem': 'Calculez l\'aire sous \$f(x) = x^2\$ entre \$x=0\$ et \$x=3\$',
        'graph_config': {
          'function': 'x^2',
          'mode': 'integral',
          'x_min': 0.0,
          'x_max': 5.0,
          'y_min': 0.0,
          'y_max': 10.0,
          'a': 0.0,
          'b': 3.0,
        },
      },
      explanation: {
        'text_fr': '∫x² dx = [x³/3]₀³ = 27/3 = 9',
      },
    );
  }

  Item _createComplexPlaneItem() {
    return Item(
      id: 'test-complex-1',
      skillId: 'test',
      itemType: ItemType.graph,
      difficultyLevel: 2,
      question: {
        'stem': 'Placez \$z = 3 + 4i\$ sur le diagramme d\'Argand. Quel est \$|z|\$ ?',
        'graph_config': {
          'function': 'complex',
          'mode': 'complexPlane',
          'expected_re': 3.0,
          'expected_im': 4.0,
          'x_min': -10.0,
          'x_max': 10.0,
          'y_min': -10.0,
          'y_max': 10.0,
        },
      },
      explanation: {
        'text_fr': '|z| = √(3² + 4²) = √25 = 5',
      },
    );
  }

  Item _createMotionSimulatorItem() {
    return Item(
      id: 'test-motion-1',
      skillId: 'test',
      itemType: ItemType.simulate,
      difficultyLevel: 2,
      question: {
        'stem': 'Un mobile se déplace à \$v_0 = 6\$ m/s. Quelle est sa position après \$t = 3\$ s ?',
        'sim_config': {
          'type': 'kinematics',
          'scenario': 'constantVelocity',
          'initial_position': 0.0,
          'initial_velocity': 6.0,
          'acceleration': 0.0,
          'target': {
            'variable': 'position',
            'time': 3.0,
            'value': 18.0,
          },
        },
      },
      explanation: {
        'text_fr': 'x = x₀ + v×t = 0 + 6×3 = 18 m',
      },
    );
  }

  Item _createForceDiagramItem() {
    return Item(
      id: 'test-force-1',
      skillId: 'test',
      itemType: ItemType.simulate,
      difficultyLevel: 3,
      question: {
        'stem': 'Un bloc de \$m = 5\$ kg sur un plan incliné à \$\\alpha = 30°\$. Quelle est son accélération ?',
        'sim_config': {
          'type': 'newtonsLaws',
          'scenario': 'inclinedPlane',
          'mass': 5.0,
          'angle': 30.0,
          'friction': 0.0,
          'target': {
            'variable': 'acceleration',
            'value': 5.0,
          },
        },
      },
      explanation: {
        'text_fr': 'a = g×sin(30°) = 10×0.5 = 5 m/s²',
      },
    );
  }

  Item _createCircuitSimulatorItem() {
    return Item(
      id: 'test-circuit-1',
      skillId: 'test',
      itemType: ItemType.simulate,
      difficultyLevel: 3,
      question: {
        'stem': 'Circuit RC: \$R = 10\$ kΩ, \$C = 5\$ μF. Quelle est la constante de temps τ ?',
        'sim_config': {
          'type': 'rcCircuit',
          'scenario': 'timeConstant',
          'resistance': 10000.0,
          'capacitance': 5e-6,
          'voltage': 5.0,
          'target': {
            'variable': 'resistance',
            'tau': 0.05,
            'value': 10000.0,
          },
        },
      },
      explanation: {
        'text_fr': 'τ = RC = 10000 × 5×10⁻⁶ = 0.05 s = 50 ms',
      },
    );
  }

  Item _createWaveSimulatorItem() {
    return Item(
      id: 'test-wave-1',
      skillId: 'test',
      itemType: ItemType.simulate,
      difficultyLevel: 3,
      question: {
        'stem': 'Fentes de Young: λ = 600 nm, a = 0.5 mm, D = 2 m. Calculez l\'interfrange i.',
        'sim_config': {
          'type': 'doubleSlit',
          'scenario': 'interfringe',
          'wavelength': 600e-9,
          'slit_separation': 0.5e-3,
          'screen_distance': 2.0,
          'target': {
            'variable': 'interfringe',
            'value': 2.4,
          },
        },
      },
      explanation: {
        'text_fr': 'i = λD/a = 600×10⁻⁹ × 2 / 0.5×10⁻³ = 2.4 mm',
      },
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;

  const _SectionHeader({
    required this.title,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Spacing.md, vertical: Spacing.sm),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(width: Spacing.sm),
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

class _WidgetCard extends StatelessWidget {
  final String title;
  final String description;
  final Widget widget;

  const _WidgetCard({
    required this.title,
    required this.description,
    required this.widget,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: BacPrepColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BacPrepColors.border),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(Spacing.md, Spacing.md, Spacing.md, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: BacPrepColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(
            height: 350,
            child: ClipRRect(
              borderRadius: const BorderRadius.vertical(bottom: Radius.circular(16)),
              child: widget,
            ),
          ),
        ],
      ),
    );
  }
}
