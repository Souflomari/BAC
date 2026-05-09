import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../widgets/papier/papier_primitives.dart';

/// In-app changelog. Hand-curated copy of CHANGELOG.md, kept short
/// enough to read in one sitting.
class DocsScreen extends StatelessWidget {
  const DocsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Papier.bg,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: Stack(
              children: [
                const PaperGrain(opacity: 0.18),
                ListView(
                  padding: const EdgeInsets.fromLTRB(24, 24, 24, 80),
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            'BacPrep',
                            style: PapierType.italic(
                              fontSize: 36,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, color: Papier.ink),
                          tooltip: 'Fermer',
                          onPressed: () {
                            if (context.canPop()) {
                              context.pop();
                            } else {
                              context.go('/home');
                            }
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Notes de version & roadmap',
                      style: PapierType.italic(
                          fontSize: 18, color: Papier.ink2),
                    ),
                    const SizedBox(height: 12),
                    const DoubleRule(),
                    const SizedBox(height: 24),
                    for (final r in _releases) _ReleaseSection(release: r),
                    const SizedBox(height: 32),
                    const DoubleRule(),
                    const SizedBox(height: 16),
                    Text(
                      'À venir',
                      style: PapierType.italic(
                          fontSize: 22, fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(height: 8),
                    for (final item in _roadmap) _RoadmapItem(text: item),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _Release {
  final String date;
  final String title;
  final List<String> bullets;
  const _Release({required this.date, required this.title, required this.bullets});
}

const _releases = <_Release>[
  _Release(date: '2026-05-09', title: 'Run intégral', bullets: [
    "Recherche dans le chapitre (Cmd/Ctrl + F)",
    "Bouton de partage sur les chapitres",
    "Bandeau de vérification d'email (doux, masquable)",
    "README, ARCHITECTURE, CONTRIBUTING ajoutés au dépôt",
    "CI GitHub Actions (analyze + test + build)",
    "Suite de tests de base (23 tests)",
  ]),
  _Release(date: '2026-05-09', title: 'Run de contenu', bullets: [
    "32 chapitres SMB en format long (Math + Physique-Chimie)",
    "129 questions pour les chapitres SMA spécifiques",
    "8 annales SMB (2023 + 2024) avec questions types",
  ]),
  _Release(date: '2026-05-08', title: 'Polish Apple/Google', bullets: [
    "Skeletons de chargement, EmptyState, ErrorRetryWidget",
    "Persistance des checkpoints de leçon",
    "Transitions de page Papier",
    "PapierToast, hover, thème automatique",
    "Écran /profile, ProgressScreen responsive, SettingsScreen groupé",
    "Recherche globale (Cmd/Ctrl + K), continue learning sur Home",
    "Navigation chapitre précédent/suivant",
    "Page 404 personnalisée",
    "Loader Papier",
  ]),
  _Release(date: '2026-05-08', title: 'Sécurité du compte + observabilité', bullets: [
    "Écran /verify-email après inscription",
    "Modification du profil (nom + avatar)",
    "Suppression du compte (RGPD)",
    "Confirmation pour le changement de filière",
    "SDK Sentry + PostHog (no-op sans clés)",
    "Bouton Imprimer sur les leçons",
    "Aide clavier avec ?",
    "robots.txt + sitemap.xml",
  ]),
  _Release(date: '2026-05-07', title: 'Fondations', bullets: [
    "32 chapitres SMA en format long",
    "33 widgets interactifs (math, physique, chimie, SVT)",
    "Auth, onboarding, dashboard, leçon, session",
  ]),
];

const _roadmap = <String>[
  "Filières PC + SVT (skill maps + chapitres)",
  "Traduction arabe des contenus de leçon",
  "Sentry + PostHog avec vraies clés",
  "Annales : remplacer les PDF placeholders par les vrais documents du Ministère",
  "Code-splitting des widgets interactifs (réduire le bundle web)",
  "Connexion Google (OAuth)",
];

class _ReleaseSection extends StatelessWidget {
  final _Release release;
  const _ReleaseSection({required this.release});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 22),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                release.date,
                style: PapierType.mono(fontSize: 11, color: Papier.ink3),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  release.title,
                  style: PapierType.italic(
                      fontSize: 22, fontWeight: FontWeight.w500),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          for (final b in release.bullets) _Bullet(text: b),
        ],
      ),
    );
  }
}

class _Bullet extends StatelessWidget {
  final String text;
  const _Bullet({required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 7, right: 10),
            child: Container(width: 4, height: 4, color: Papier.ink2),
          ),
          Expanded(
            child: Text(
              text,
              style: PapierType.body(
                  fontSize: 14, color: Papier.ink, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}

class _RoadmapItem extends StatelessWidget {
  final String text;
  const _RoadmapItem({required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 6, right: 10),
            child: Icon(Icons.chevron_right,
                size: 16, color: Papier.ink3),
          ),
          Expanded(
            child: Text(
              text,
              style: PapierType.italic(
                  fontSize: 14, color: Papier.ink2, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}
