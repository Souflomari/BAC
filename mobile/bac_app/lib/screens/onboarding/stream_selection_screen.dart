import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../l10n/app_localizations.dart';
import '../../models/profile.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/papier/papier_primitives.dart';

class StreamSelectionScreen extends ConsumerStatefulWidget {
  const StreamSelectionScreen({super.key});

  @override
  ConsumerState<StreamSelectionScreen> createState() =>
      _StreamSelectionScreenState();
}

class _StreamSelectionScreenState extends ConsumerState<StreamSelectionScreen> {
  BacStream? _selectedStream;
  int _dailyGoal = 15;
  DateTime? _examDate;
  bool _isSaving = false;

  static const _streams = [
    (BacStream.sciencesMathsA, 'SM-A', 'Sciences Maths A', 'علوم رياضية أ',
        'Maths 9 · Physique 7 · SI 5'),
    (BacStream.sciencesMathsB, 'SM-B', 'Sciences Maths B', 'علوم رياضية ب',
        'Maths 9 · Physique 7 · SI 5'),
    (BacStream.sciencesPhysiques, 'PC', 'Sciences Physiques', 'علوم فيزيائية',
        'Physique 7 · Maths 7 · SVT 5'),
    (BacStream.svt, 'SVT', 'Sciences de la Vie et de la Terre',
        'علوم الحياة والأرض', 'SVT 7 · Physique 5 · Maths 5'),
    (BacStream.sciencesEconomiques, 'SE', 'Sciences Économiques',
        'علوم اقتصادية', 'Écon. 6 · Maths 4 · Gestion'),
    (BacStream.sciencesGestionComptable, 'SGC',
        'Sciences Gestion Comptable', 'علوم التدبير', 'Gestion · Maths'),
    (BacStream.lettresSciencesHumaines, 'L', 'Lettres & Sc. Humaines',
        'آداب وعلوم إنسانية', 'Philo · Histoire · Langues'),
  ];

  Future<void> _save() async {
    if (_selectedStream == null) return;
    setState(() => _isSaving = true);
    try {
      final profile = await ref.read(profileProvider.future);
      if (profile != null) {
        await ref.read(authActionsProvider).updateProfile(profile.copyWith(
          bacStream: _selectedStream,
          dailyGoalMinutes: _dailyGoal,
          examDate: _examDate,
          onboardingCompleted: true,
        ));
      }
      if (mounted) context.go('/home');
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(AppLocalizations.of(context)!.error('$e'))),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.3),
          SafeArea(
            child: Column(
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(22, 32, 22, 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Folio top
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'II.',
                              style: PapierType.italic(
                                  fontSize: 14, color: Papier.ink3),
                            ),
                            Text(
                              'p. 2 / 4',
                              style: PapierType.mono(
                                  fontSize: 9, color: Papier.ink3),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),

                        Text(
                          'COMMENÇONS',
                          style: PapierType.smallCaps(color: Papier.red),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Quelle est\nta filière ?',
                          style: PapierType.italic(
                            fontSize: 30,
                            letterSpacing: -0.6,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          l.chooseStream,
                          style:
                              PapierType.italic(fontSize: 13, color: Papier.ink2),
                        ),

                        const Fleuron(color: Papier.ink3),

                        // Stream cards
                        ...List.generate(_streams.length, (i) {
                          final s = _streams[i];
                          final isSelected = _selectedStream == s.$1;
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 10),
                            child: GestureDetector(
                              onTap: () =>
                                  setState(() => _selectedStream = s.$1),
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: isSelected
                                      ? Papier.surface
                                      : Colors.transparent,
                                  border: Border.all(
                                    color: isSelected
                                        ? Papier.red
                                        : Papier.line2,
                                    width: isSelected ? 1.5 : 1,
                                    style: isSelected
                                        ? BorderStyle.solid
                                        : BorderStyle.solid,
                                  ),
                                ),
                                child: Row(
                                  children: [
                                    // Code badge
                                    Container(
                                      width: 48,
                                      height: 48,
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: isSelected
                                              ? Papier.red
                                              : Papier.ink2,
                                          width: 1,
                                        ),
                                        color: isSelected
                                            ? Papier.red
                                                .withValues(alpha: 0.06)
                                            : Colors.transparent,
                                      ),
                                      child: Center(
                                        child: Text(
                                          s.$2,
                                          style: PapierType.italic(
                                            fontSize: 11,
                                            color: isSelected
                                                ? Papier.red
                                                : Papier.ink2,
                                          ),
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            s.$3,
                                            style: PapierType.serif(
                                              fontSize: 15,
                                              color: Papier.ink,
                                            ),
                                          ),
                                          const SizedBox(height: 2),
                                          Text(
                                            s.$5.toUpperCase(),
                                            style: PapierType.mono(
                                              fontSize: 8,
                                              color: Papier.ink3,
                                              letterSpacing: 0.8,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    if (isSelected)
                                      Text(
                                        '✓',
                                        style: PapierType.serif(
                                          fontSize: 16,
                                          color: Papier.red,
                                        ),
                                      ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        }),

                        const SizedBox(height: 24),

                        // Daily goal
                        Text(
                          l.dailyGoal.toUpperCase(),
                          style: PapierType.smallCaps(color: Papier.ink3),
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [10, 15, 20, 30].map((mins) {
                            final isSel = _dailyGoal == mins;
                            return Expanded(
                              child: Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 3),
                                child: GestureDetector(
                                  onTap: () =>
                                      setState(() => _dailyGoal = mins),
                                  child: Container(
                                    padding:
                                        const EdgeInsets.symmetric(vertical: 10),
                                    decoration: BoxDecoration(
                                      color: isSel
                                          ? Papier.ink
                                          : Papier.surface,
                                      border: Border.all(
                                        color: isSel
                                            ? Papier.ink
                                            : Papier.line2,
                                      ),
                                    ),
                                    child: Center(
                                      child: Text(
                                        '${mins}min',
                                        style: PapierType.mono(
                                          fontSize: 10,
                                          color: isSel
                                              ? Papier.surface
                                              : Papier.ink2,
                                          letterSpacing: 0.5,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            );
                          }).toList(),
                        ),

                        const SizedBox(height: 24),

                        // Exam date
                        Text(
                          l.examDateApprox.toUpperCase(),
                          style: PapierType.smallCaps(color: Papier.ink3),
                        ),
                        const SizedBox(height: 10),
                        GestureDetector(
                          onTap: () async {
                            final date = await showDatePicker(
                              context: context,
                              initialDate: DateTime(2026, 6, 15),
                              firstDate: DateTime.now(),
                              lastDate: DateTime(2027, 12, 31),
                            );
                            if (date != null) {
                              setState(() => _examDate = date);
                            }
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                                vertical: 12, horizontal: 14),
                            decoration: BoxDecoration(
                              color: Papier.surface,
                              border: Border.all(color: Papier.line2),
                            ),
                            child: Row(
                              children: [
                                Text(
                                  _examDate != null
                                      ? '${_examDate!.day}/${_examDate!.month}/${_examDate!.year}'
                                      : l.pickDate,
                                  style: PapierType.serif(
                                    fontSize: 14,
                                    color: _examDate != null
                                        ? Papier.ink
                                        : Papier.ink3,
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                                const Spacer(),
                                Text(
                                  '→',
                                  style:
                                      PapierType.body(color: Papier.ink3),
                                ),
                              ],
                            ),
                          ),
                        ),

                        const SizedBox(height: 24),
                      ],
                    ),
                  ),
                ),

                // Footer
                Container(
                  padding:
                      const EdgeInsets.fromLTRB(22, 12, 22, 18),
                  decoration: const BoxDecoration(
                    color: Papier.surface,
                    border: Border(top: BorderSide(color: Papier.ink)),
                  ),
                  child: Row(
                    children: [
                      Text(
                        '● ● ○ ○\nÉTAPE 2 / 4',
                        style: PapierType.mono(
                          fontSize: 8,
                          color: Papier.ink3,
                          letterSpacing: 0.5,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: GestureDetector(
                          onTap: _selectedStream != null && !_isSaving
                              ? _save
                              : null,
                          child: Container(
                            padding:
                                const EdgeInsets.symmetric(vertical: 16),
                            color: _selectedStream != null
                                ? Papier.ink
                                : Papier.line2,
                            child: Center(
                              child: _isSaving
                                  ? const SizedBox(
                                      width: 18,
                                      height: 18,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                        color: Papier.surface,
                                      ),
                                    )
                                  : Text(
                                      '${l.startReviewing} →',
                                      style: PapierType.smallCaps(
                                        fontSize: 11,
                                        color: Papier.surface,
                                      ),
                                    ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
