import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../models/exam.dart';
import '../../providers/exam_provider.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_retry_widget.dart';
import '../../widgets/papier/papier_primitives.dart';
import '../../widgets/shimmer_skeleton.dart';

class ExamBrowserScreen extends ConsumerStatefulWidget {
  const ExamBrowserScreen({super.key});

  @override
  ConsumerState<ExamBrowserScreen> createState() => _ExamBrowserScreenState();
}

class _ExamBrowserScreenState extends ConsumerState<ExamBrowserScreen> {
  String? _selectedSubject;

  @override
  Widget build(BuildContext context) {
    final examsAsync = ref.watch(examsByYearProvider);

    return Scaffold(
      backgroundColor: Papier.bg,
      body: Stack(
        children: [
          const PaperGrain(opacity: 0.2),
          SafeArea(
            child: Column(
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.fromLTRB(22, 20, 22, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'ANNALES · BAC MAROC · 2014–2024',
                        style: PapierType.mono(
                          fontSize: 8.5,
                          color: Papier.ink3,
                          letterSpacing: 2.4,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.baseline,
                        textBaseline: TextBaseline.alphabetic,
                        children: [
                          Text(
                            'Examens blancs',
                            style: PapierType.italic(
                              fontSize: 26,
                              letterSpacing: -0.5,
                            ),
                          ),
                          const Spacer(),
                          examsAsync.when(
                            data: (m) {
                              final total = m.values.fold(0, (s, l) => s + l.length);
                              return Text(
                                '$total épreuves',
                                style: PapierType.italic(fontSize: 13, color: Papier.ink2),
                              );
                            },
                            loading: () => const SizedBox.shrink(),
                            error: (_, __) => const SizedBox.shrink(),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      const DoubleRule(),
                    ],
                  ),
                ),

                // Flat text filter row
                _buildFilterRow(examsAsync),

                // Exam list
                Expanded(
                  child: examsAsync.when(
                    loading: () => const CardListSkeleton(itemCount: 6, itemHeight: 80),
                    error: (e, _) => ErrorRetryWidget(
                      message: 'Impossible de charger les annales.',
                      onRetry: () => ref.invalidate(examsByYearProvider),
                    ),
                    data: (examsByYear) {
                      if (examsByYear.isEmpty) {
                        return const EmptyState(
                          icon: Icons.menu_book_outlined,
                          title: 'Pas encore d\'annales',
                          message:
                              "Les épreuves passées seront ajoutées au fur et à mesure. Reviens bientôt.",
                        );
                      }

                      // Filter exams
                      final filtered = _selectedSubject == null
                          ? examsByYear
                          : {
                              for (final entry in examsByYear.entries)
                                entry.key: entry.value
                                    .where((e) => e.subjectName
                                        .toLowerCase()
                                        .contains(_selectedSubject!.toLowerCase()))
                                    .toList()
                            }
                        ..removeWhere((_, v) => v.isEmpty);

                      return ListView.builder(
                        padding: const EdgeInsets.only(bottom: 80),
                        itemCount: filtered.length,
                        itemBuilder: (context, index) {
                          final year = filtered.keys.elementAt(index);
                          final exams = filtered[year]!;
                          return _YearSection(year: year, exams: exams);
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterRow(AsyncValue<Map<int, List<BacExam>>> examsAsync) {
    final subjects = ['Toutes', 'Maths', 'Physique', 'SVT'];
    return Container(
      padding: const EdgeInsets.fromLTRB(22, 10, 22, 10),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Papier.line2)),
      ),
      child: Row(
        children: subjects.map((s) {
          final isOn = (s == 'Toutes' && _selectedSubject == null) ||
              (s != 'Toutes' && _selectedSubject == s);
          return Padding(
            padding: const EdgeInsets.only(right: 16),
            child: GestureDetector(
              onTap: () => setState(() {
                _selectedSubject = s == 'Toutes' ? null : s;
              }),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    s,
                    style: PapierType.serif(
                      fontSize: 13,
                      fontStyle: isOn ? FontStyle.italic : FontStyle.normal,
                      color: isOn ? Papier.ink : Papier.ink3,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Container(
                    height: 1.5,
                    width: s.length * 7.0,
                    color: isOn ? Papier.red : Colors.transparent,
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _YearSection extends StatelessWidget {
  final int year;
  final List<BacExam> exams;

  const _YearSection({required this.year, required this.exams});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Year as giant italic section marker
        Padding(
          padding: const EdgeInsets.fromLTRB(22, 18, 22, 8),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                '$year',
                style: PapierType.italic(
                  fontSize: 36,
                  color: Papier.ink,
                  letterSpacing: -0.7,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Container(
                  height: 1,
                  color: Papier.ink,
                  margin: const EdgeInsets.only(bottom: 6),
                ),
              ),
              const SizedBox(width: 12),
              Text(
                '${exams.length} épreuve${exams.length > 1 ? 's' : ''}',
                style: PapierType.mono(fontSize: 9, color: Papier.ink3),
              ),
            ],
          ),
        ),
        // Exam rows
        ...exams.map((exam) => _ExamRow(exam: exam)),
      ],
    );
  }
}

class _ExamRow extends ConsumerWidget {
  final BacExam exam;

  const _ExamRow({required this.exam});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return InkWell(
      onTap: () => context.push('/exams/${exam.id}'),
      child: Container(
        padding: const EdgeInsets.fromLTRB(22, 14, 22, 14),
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Papier.line)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Folded paper icon
            _FoldedPaperIcon(year: exam.year),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  RichText(
                    text: TextSpan(
                      children: [
                        TextSpan(
                          text: exam.subjectName,
                          style: PapierType.serif(fontSize: 15),
                        ),
                        TextSpan(
                          text: ' — ${exam.session.labelFr.toLowerCase()}',
                          style: PapierType.italic(fontSize: 15, color: Papier.ink2),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Text(
                        '3H · 20PTS · ${exam.streamLabel}',
                        style: PapierType.mono(fontSize: 9, color: Papier.ink3),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Text(
              'commencer →',
              style: PapierType.italic(fontSize: 13, color: Papier.red),
            ),
          ],
        ),
      ),
    );
  }
}

class _FoldedPaperIcon extends StatelessWidget {
  final int year;

  const _FoldedPaperIcon({required this.year});

  @override
  Widget build(BuildContext context) {
    final yearShort = '${year}'.substring(2);
    return SizedBox(
      width: 38,
      height: 50,
      child: CustomPaint(
        painter: _FoldedPaperPainter(yearShort: yearShort),
      ),
    );
  }
}

class _FoldedPaperPainter extends CustomPainter {
  final String yearShort;

  const _FoldedPaperPainter({required this.yearShort});

  @override
  void paint(Canvas canvas, Size size) {
    final borderPaint = Paint()
      ..color = Papier.ink
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;
    final fillPaint = Paint()
      ..color = Papier.bg
      ..style = PaintingStyle.fill;
    final linePaint = Paint()
      ..color = Papier.line2
      ..strokeWidth = 0.8;

    const fold = 10.0;

    // Paper body
    final path = Path()
      ..moveTo(2, 2)
      ..lineTo(size.width - fold, 2)
      ..lineTo(size.width, fold + 2)
      ..lineTo(size.width, size.height - 2)
      ..lineTo(2, size.height - 2)
      ..close();
    canvas.drawPath(path, fillPaint);
    canvas.drawPath(path, borderPaint);

    // Fold corner
    final foldPath = Path()
      ..moveTo(size.width - fold, 2)
      ..lineTo(size.width - fold, fold + 2)
      ..lineTo(size.width, fold + 2);
    canvas.drawPath(foldPath, borderPaint);

    // Year text
    final tp = TextPainter(
      text: TextSpan(
        text: yearShort,
        style: PapierType.italic(fontSize: 11, color: Papier.ink2),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    tp.paint(canvas, Offset((size.width - tp.width) / 2, 12));

    // Lines
    for (final y in [26.0, 32.0, 38.0, 44.0]) {
      canvas.drawLine(Offset(6, y), Offset(size.width - 6, y), linePaint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
