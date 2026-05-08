import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Papier-styled site footer.
///
/// Top double-rule (academic-cahier feel), 4 columns of links on tablet/desktop
/// that stack to a single column on phone, and a bottom credit line.
/// Designed to be mounted at the bottom of public/dashboard screens — skip on
/// immersive flows like /lesson, /session, /exams/:id/practice.
class PapierFooter extends StatelessWidget {
  const PapierFooter({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= 800;

    final cols = [
      const _FooterColumn(
        title: 'Programmes',
        links: [
          ('Sciences Maths A', '/landing'),
          ('Sciences Maths B', '/landing'),
          ('Sciences Physiques', '/landing'),
          ('SVT', '/landing'),
        ],
      ),
      const _FooterColumn(
        title: 'Ressources',
        links: [
          ('Annales du Bac', '/landing'),
          ('Méthode', '/landing'),
          ('FAQ', '/landing'),
        ],
      ),
      const _FooterColumn(
        title: 'À propos',
        links: [
          ('Mission', '/landing'),
          ('Équipe', '/landing'),
          ('Contact', 'mailto:hello@bacprep.ma'),
        ],
      ),
      const _FooterColumn(
        title: 'Légal',
        links: [
          ('Confidentialité', '/landing'),
          ('CGU', '/landing'),
          ('Mentions légales', '/landing'),
        ],
      ),
    ];

    return Container(
      width: double.infinity,
      color: Papier.bg2,
      padding: EdgeInsets.symmetric(
        horizontal: isWide ? 48 : 22,
        vertical: 32,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Double-rule
          Container(height: 1, color: Papier.ink2),
          const SizedBox(height: 3),
          Container(height: 1, color: Papier.line),
          const SizedBox(height: 28),
          // Columns
          if (isWide)
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _FooterBrand(),
                const SizedBox(width: 48),
                for (final c in cols) ...[
                  Expanded(child: c),
                ],
              ],
            )
          else
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _FooterBrand(),
                const SizedBox(height: 24),
                for (final c in cols) ...[
                  c,
                  const SizedBox(height: 20),
                ],
              ],
            ),
          const SizedBox(height: 32),
          Container(height: 1, color: Papier.line),
          const SizedBox(height: 14),
          // Credit row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '© 2026 BacPrep · Made in Morocco',
                style: PapierType.mono(fontSize: 11, color: Papier.ink3),
              ),
              if (isWide)
                Text(
                  'v1.0 · BIOF',
                  style: PapierType.mono(fontSize: 11, color: Papier.ink3),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _FooterBrand extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 200,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'BacPrep',
            style: PapierType.italic(
              fontSize: 24,
              color: Papier.ink,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Préparer le Baccalauréat marocain comme un cahier vivant.',
            style: PapierType.body(fontSize: 12, color: Papier.ink2, height: 1.45),
          ),
        ],
      ),
    );
  }
}

class _FooterColumn extends StatelessWidget {
  final String title;
  final List<(String, String)> links;

  const _FooterColumn({required this.title, required this.links});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title.toUpperCase(),
          style: PapierType.smallCaps(fontSize: 11, color: Papier.ink2),
        ),
        const SizedBox(height: 12),
        for (final (label, _) in links)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Text(
              label,
              style: PapierType.serif(fontSize: 13, color: Papier.ink),
            ),
          ),
      ],
    );
  }
}
