import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../models/item.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/papier/papier_top_nav.dart';
import '../../widgets/papier/papier_footer.dart';
import '../../widgets/math/epsilon_delta_visualizer_widget.dart';

/// Public marketing landing page.
///
/// Shown to unauthenticated visitors at `/landing`. Layout:
///   1. PapierTopNav with "Se connecter" + "Commencer" CTAs
///   2. Hero (2-col on desktop): headline + sub + CTAs (left), live ε-δ widget (right)
///   3. Three feature blocks
///   4. Stream coverage row
///   5. Big "Commencer" CTA strip
///   6. PapierFooter
class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const Positioned.fill(child: PaperGrain(opacity: 0.18)),
          Column(
            children: [
              const PapierTopNav(selectedIndex: null),
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: const [
                      _Hero(),
                      _Features(),
                      _Coverage(),
                      _BottomCta(),
                      PapierFooter(),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _Hero extends StatelessWidget {
  const _Hero();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= 900;
    final headlineSize = width >= 1100 ? 64.0 : (width >= 700 ? 48.0 : 40.0);

    final left = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'BAC MAROC · BIOF · 2 BAC',
          style: PapierType.smallCaps(fontSize: 12, color: Papier.red),
        ),
        const SizedBox(height: 16),
        Text(
          'Préparez le Bac\ncomme un cahier vivant.',
          style: PapierType.display1(fontSize: headlineSize),
        ),
        const SizedBox(height: 20),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 520),
          child: Text(
            'Toutes les filières, toutes les matières. Des manipulations interactives sur-mesure pour chaque chapitre, la mémorisation espacée pour ne rien oublier, et les annales corrigées pour s\'entraîner comme le jour J.',
            style: PapierType.body(fontSize: 16, color: Papier.ink2, height: 1.55),
          ),
        ),
        const SizedBox(height: 28),
        Wrap(
          spacing: 14,
          runSpacing: 12,
          children: [
            FilledButton(
              onPressed: () => context.go('/login'),
              style: FilledButton.styleFrom(
                backgroundColor: Papier.ink,
                foregroundColor: Papier.surface,
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(2)),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 18),
              ),
              child: Text(
                'Commencer gratuitement',
                style: PapierType.serif(
                  fontSize: 15,
                  color: Papier.surface,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            OutlinedButton(
              onPressed: () => context.go('/login'),
              style: OutlinedButton.styleFrom(
                foregroundColor: Papier.ink,
                side: const BorderSide(color: Papier.ink, width: 1.4),
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(2)),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 18),
              ),
              child: Text(
                'Se connecter',
                style: PapierType.serif(fontSize: 15, color: Papier.ink),
              ),
            ),
          ],
        ),
        const SizedBox(height: 18),
        Row(
          children: [
            const Icon(Icons.verified_outlined, size: 16, color: Papier.ink3),
            const SizedBox(width: 6),
            Text(
              'Programme officiel BIOF · Mis à jour pour 2026',
              style: PapierType.body(fontSize: 12, color: Papier.ink3),
            ),
          ],
        ),
      ],
    );

    final demo = const _LiveDemoFrame();

    return Container(
      padding: EdgeInsets.fromLTRB(
        isWide ? 48 : 24,
        isWide ? 64 : 36,
        isWide ? 48 : 24,
        isWide ? 80 : 48,
      ),
      child: isWide
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(flex: 6, child: left),
                const SizedBox(width: 32),
                Expanded(flex: 5, child: demo),
              ],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                left,
                const SizedBox(height: 32),
                demo,
              ],
            ),
    );
  }
}

class _LiveDemoFrame extends StatelessWidget {
  const _LiveDemoFrame();

  @override
  Widget build(BuildContext context) {
    // Stub Item so the existing widget can be reused without scaffolding.
    final stub = Item(
      id: 'landing_demo',
      skillId: 'landing',
      itemType: ItemType.mcq,
      difficultyLevel: 1,
      question: const {'stem': '', 'graph_config': {}, 'sim_config': {}},
    );

    return Container(
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.ink, width: 2),
        boxShadow: const [
          BoxShadow(color: Color(0x33000000), offset: Offset(8, 8), blurRadius: 0),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: const BoxDecoration(
              color: Papier.bg2,
              border: Border(bottom: BorderSide(color: Papier.line2)),
            ),
            child: Row(
              children: [
                const Icon(Icons.science_outlined, size: 14, color: Papier.ink2),
                const SizedBox(width: 8),
                Text(
                  'EXPLORATION · DÉFINITION ε-δ D\'UNE LIMITE',
                  style: PapierType.smallCaps(fontSize: 10, color: Papier.ink2),
                ),
              ],
            ),
          ),
          SizedBox(
            height: 580,
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onHorizontalDragStart: (_) {},
              onHorizontalDragUpdate: (_) {},
              child: EpsilonDeltaVisualizerWidget(
                item: stub,
                isAnswered: false,
                onAnswer: (_) {},
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Features extends StatelessWidget {
  const _Features();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= 900;
    final cards = [
      const _FeatureCard(
        eyebrow: 'INTERACTIF',
        title: 'Tous vos chapitres, animés.',
        body:
            '16 explorations natives — titrage, déviation cathodique, fentes d\'Young, ε-δ, et plus. Manipulez, ne lisez pas seulement.',
      ),
      const _FeatureCard(
        eyebrow: 'MÉMOIRE',
        title: 'Ce que vous apprenez, vous le retenez.',
        body:
            'Algorithme de répétition espacée : chaque compétence revient juste avant que vous ne l\'oubliez. Sans surcharge.',
      ),
      const _FeatureCard(
        eyebrow: 'ANNALES',
        title: 'Du vrai entraînement Bac.',
        body:
            'Les sujets nationaux récents, corrigés étape par étape. Mode timé pour simuler le jour J.',
      ),
    ];

    return Container(
      color: Papier.bg2,
      padding: EdgeInsets.symmetric(
        horizontal: isWide ? 48 : 24,
        vertical: isWide ? 72 : 48,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Trois piliers.',
            style: PapierType.display2(fontSize: isWide ? 48 : 32),
          ),
          const SizedBox(height: 8),
          Text(
            'Tout ce qui sépare une révision passive d\'une vraie maîtrise.',
            style: PapierType.body(fontSize: 16, color: Papier.ink2),
          ),
          const SizedBox(height: 36),
          if (isWide)
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (var i = 0; i < cards.length; i++) ...[
                  Expanded(child: cards[i]),
                  if (i != cards.length - 1) const SizedBox(width: 24),
                ],
              ],
            )
          else
            Column(
              children: [
                for (var i = 0; i < cards.length; i++) ...[
                  cards[i],
                  if (i != cards.length - 1) const SizedBox(height: 16),
                ],
              ],
            ),
        ],
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final String eyebrow;
  final String title;
  final String body;

  const _FeatureCard({
    required this.eyebrow,
    required this.title,
    required this.body,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Papier.surface,
        border: Border.all(color: Papier.line2, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            eyebrow,
            style: PapierType.smallCaps(fontSize: 11, color: Papier.red),
          ),
          const SizedBox(height: 14),
          Text(title, style: PapierType.italic(fontSize: 22, height: 1.15)),
          const SizedBox(height: 12),
          Text(
            body,
            style: PapierType.body(fontSize: 14, color: Papier.ink2, height: 1.55),
          ),
        ],
      ),
    );
  }
}

class _Coverage extends StatelessWidget {
  const _Coverage();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= 900;

    final streams = [
      ('Sciences Maths A', true),
      ('Sciences Maths B', true),
      ('Sciences Physiques', false),
      ('SVT', false),
      ('Lettres et Sciences Humaines', false),
      ('Économie', false),
    ];

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isWide ? 48 : 24,
        vertical: isWide ? 72 : 48,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Couverture des filières.',
            style: PapierType.display2(fontSize: isWide ? 40 : 28),
          ),
          const SizedBox(height: 8),
          Text(
            'Sciences Maths A & B sont disponibles aujourd\'hui. Le reste arrive ce trimestre.',
            style: PapierType.body(fontSize: 16, color: Papier.ink2),
          ),
          const SizedBox(height: 28),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              for (final (name, available) in streams)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: available ? Papier.surface : Papier.bg2,
                    border: Border.all(
                      color: available ? Papier.ink : Papier.line2,
                      width: available ? 1.5 : 1,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        available ? Icons.check_circle : Icons.schedule,
                        size: 16,
                        color: available ? Papier.green : Papier.ink3,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        name,
                        style: PapierType.serif(
                          fontSize: 14,
                          color: available ? Papier.ink : Papier.ink3,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        available ? 'Disponible' : 'Bientôt',
                        style: PapierType.smallCaps(
                          fontSize: 9,
                          color: available ? Papier.green : Papier.ink3,
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _BottomCta extends StatelessWidget {
  const _BottomCta();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= 900;

    return Container(
      width: double.infinity,
      color: Papier.ink,
      padding: EdgeInsets.symmetric(
        horizontal: isWide ? 48 : 24,
        vertical: isWide ? 72 : 56,
      ),
      child: Column(
        children: [
          Text(
            'Commencez maintenant.',
            textAlign: TextAlign.center,
            style: PapierType.italic(
              fontSize: isWide ? 56 : 36,
              color: Papier.surface,
              fontWeight: FontWeight.w500,
              letterSpacing: -1,
              height: 1.05,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Gratuit pour toujours sur les chapitres essentiels. Sans carte bancaire.',
            textAlign: TextAlign.center,
            style: PapierType.body(fontSize: 16, color: Papier.darkInk2),
          ),
          const SizedBox(height: 28),
          FilledButton(
            onPressed: () => context.go('/login'),
            style: FilledButton.styleFrom(
              backgroundColor: Papier.surface,
              foregroundColor: Papier.ink,
              shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(2)),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 36, vertical: 20),
            ),
            child: Text(
              'Créer mon compte',
              style: PapierType.serif(
                fontSize: 16,
                color: Papier.ink,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
