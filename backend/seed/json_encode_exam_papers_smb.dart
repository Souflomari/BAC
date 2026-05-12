// Phase 2 encoder: topic-coherent Bac exam papers for the 32 SMB chapters.
//
// Same structure as json_encode_exam_papers_sma.dart but targeted at the
// SMB curriculum (unprefixed skill codes: arithmetic_seq, limit_calc, etc.).
// SMB is one notch lower in mathematical sophistication than SMA — fewer
// algebraic gymnastics per sub-part, more emphasis on direct application.
//
// Output: backend/supabase/migrations/031_exam_papers_smb.sql

import 'dart:convert';
import 'dart:io';

// ============================================================================
// Builders (same as SMA encoder)
// ============================================================================

Map<String, dynamic> _step(
  String textFr, {
  String? latex,
  String? widgetSlug,
  Map<String, dynamic>? widgetConfig,
  String? mistakeFr,
  String? tipFr,
}) =>
    {
      'text_fr': textFr,
      if (latex != null) 'latex': latex,
      if (widgetSlug != null) 'widget_slug': widgetSlug,
      if (widgetConfig != null) 'widget_config': widgetConfig,
      if (mistakeFr != null) 'mistake_fr': mistakeFr,
      if (tipFr != null) 'tip_fr': tipFr,
    };

Map<String, dynamic> _sol(
  List<Map<String, dynamic>> steps, {
  String? finalAnswerFr,
  String? methodFr,
}) =>
    {
      'steps': steps,
      if (finalAnswerFr != null) 'final_answer_fr': finalAnswerFr,
      if (methodFr != null) 'method_fr': methodFr,
    };

Map<String, dynamic> _q(int number, String stemFr, int points,
        Map<String, dynamic> solution) =>
    {'number': number, 'stem_fr': stemFr, 'points': points, 'solution': solution};

Map<String, dynamic> _qSubs(int number, String stemFr, int points,
        List<Map<String, dynamic>> subparts) =>
    {'number': number, 'stem_fr': stemFr, 'points': points, 'subparts': subparts};

Map<String, dynamic> _sub(
        String letter, String stemFr, int points, Map<String, dynamic> solution) =>
    {'letter': letter, 'stem_fr': stemFr, 'points': points, 'solution': solution};

Map<String, dynamic> _ex(
  int number,
  String titleFr,
  int points,
  String preambleFr,
  List<Map<String, dynamic>> questions, {
  String? widgetSlug,
  Map<String, dynamic>? widgetConfig,
}) =>
    {
      'number': number,
      'title_fr': titleFr,
      'points': points,
      'preamble_fr': preambleFr,
      if (widgetSlug != null) 'widget_slug': widgetSlug,
      if (widgetConfig != null) 'widget_config': widgetConfig,
      'questions': questions,
    };

Map<String, dynamic> _paper({
  required String titleFr,
  required String subtitleFr,
  required int durationMinutes,
  required int totalPoints,
  String? introFr,
  required List<Map<String, dynamic>> exercices,
}) =>
    {
      'version': 1,
      'title_fr': titleFr,
      'subtitle_fr': subtitleFr,
      'duration_minutes': durationMinutes,
      'total_points': totalPoints,
      if (introFr != null) 'intro_fr': introFr,
      'exercices': exercices,
    };

// ============================================================================
// SMB Papers — math
// ============================================================================

Map<String, dynamic> _paperArithmeticSeq() => _paper(
      titleFr: 'Épreuve type — Suites arithmétiques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites arithmétiques : raison, terme général \$u_n = u_0 + nr\$, somme par Gauss \$S = (n+1)(u_0 + u_n)/2\$.",
      exercices: [
        _ex(
          1,
          'Identifier et calculer',
          5,
          "On considère la suite \$(u_n)\$ telle que \$u_0 = 3\$ et \$u_{n+1} = u_n + 5\$.",
          [
            _q(
              1,
              "Justifier que \$(u_n)\$ est arithmétique et donner sa raison.",
              2,
              _sol([
                _step(
                  "Par définition d'une suite arithmétique : \$u_{n+1} - u_n = r\$ constant. Ici \$u_{n+1} - u_n = (u_n + 5) - u_n = 5\$.",
                ),
                _step(
                  "La différence entre deux termes consécutifs est **constante et vaut 5**. Donc \$(u_n)\$ est arithmétique de **raison \$r = 5\$**.",
                ),
              ], finalAnswerFr: r"$r = 5$"),
            ),
            _q(
              2,
              "Donner l'expression de \$u_n\$ en fonction de \$n\$.",
              1,
              _sol([
                _step(
                  "**Terme général** : \$u_n = u_0 + nr = 3 + 5n\$.",
                ),
              ], finalAnswerFr: r"$u_n = 3 + 5n$"),
            ),
            _q(
              3,
              "Calculer \$u_{10}\$, \$u_{20}\$ et \$u_{50}\$.",
              2,
              _sol([
                _step(
                  "Application directe : \$u_{10} = 3 + 50 = 53\$.",
                ),
                _step(
                  "\$u_{20} = 3 + 100 = 103\$ ; \$u_{50} = 3 + 250 = 253\$.",
                  tipFr:
                      "L'expression explicite permet de calculer n'importe quel terme directement, sans énumérer les précédents.",
                ),
              ], finalAnswerFr: r"$u_{10} = 53$, $u_{20} = 103$, $u_{50} = 253$"),
            ),
          ],
        ),
        _ex(
          2,
          'Sommes',
          5,
          "On utilise la suite \$(u_n)\$ de l'Exercice 1.",
          [
            _q(
              1,
              "Calculer la somme \$S = u_0 + u_1 + \\dots + u_{10}\$ (11 termes).",
              3,
              _sol([
                _step(
                  "**Formule de Gauss** : \$S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}\$.",
                ),
                _step(
                  "Ici 11 termes, \$u_0 = 3\$, \$u_{10} = 53\$. Donc \$S = 11 \\times (3 + 53)/2 = 11 \\times 28 = 308\$.",
                ),
              ], finalAnswerFr: r"$S = 308$"),
            ),
            _q(
              2,
              "Calculer \$1 + 2 + 3 + \\dots + 100\$.",
              2,
              _sol([
                _step(
                  "Suite arithmétique de premier terme 1, raison 1, 100 termes.",
                ),
                _step(
                  "**Formule** : \$S_{100} = 100 \\times (1 + 100)/2 = 5050\$. Anecdote : Gauss l'aurait calculée à l'âge de 9 ans, à la surprise de son instituteur.",
                ),
              ], finalAnswerFr: r"$S = 5050$"),
            ),
          ],
        ),
        _ex(
          3,
          'Sens de variation',
          5,
          "Soit \$(v_n)\$ arithmétique de premier terme \$v_0 = 100\$ et raison \$r = -3\$.",
          [
            _q(
              1,
              "Donner l'expression de \$v_n\$ et étudier le sens de variation.",
              3,
              _sol([
                _step(
                  "\$v_n = 100 - 3n\$. Calcul : \$v_{n+1} - v_n = -3 < 0\$. La suite est **strictement décroissante**.",
                ),
                _step(
                  "**Règle générale** : suite arithmétique avec \$r > 0\$ → croissante ; \$r < 0\$ → décroissante ; \$r = 0\$ → constante.",
                ),
              ], finalAnswerFr: r"$v_n = 100 - 3n$, décroissante"),
            ),
            _q(
              2,
              "À partir de quel rang \$n\$ a-t-on \$v_n < 0\$ ?",
              2,
              _sol([
                _step(
                  "\$v_n < 0 \\iff 100 - 3n < 0 \\iff n > 100/3 \\approx 33{,}3\$.",
                ),
                _step(
                  "Donc à partir de \$n = 34\$ : \$v_{34} = 100 - 102 = -2 < 0\$ ✓. Avant : \$v_{33} = 100 - 99 = 1 > 0\$.",
                ),
              ], finalAnswerFr: r"$n \ge 34$"),
            ),
          ],
        ),
        _ex(
          4,
          'Problème — escaliers',
          5,
          "Un escalier comporte 50 marches. La première marche a une hauteur de 18 cm. Chaque marche suivante est 0,2 cm plus haute que la précédente.",
          [
            _q(
              1,
              "Quelle est la hauteur de la 25ème marche ?",
              2,
              _sol([
                _step(
                  "Suite arithmétique de \$u_1 = 18\$, \$r = 0{,}2\$. Terme général : \$u_n = u_1 + (n-1) r = 18 + 0{,}2(n-1)\$.",
                ),
                _step(
                  "Pour la 25ème marche : \$u_{25} = 18 + 0{,}2 \\times 24 = 18 + 4{,}8 = 22{,}8\\,cm\$.",
                ),
              ], finalAnswerFr: r"$u_{25} = 22{,}8$ cm"),
            ),
            _q(
              2,
              "Quelle est la hauteur totale de l'escalier ?",
              3,
              _sol([
                _step(
                  "Hauteur totale = somme de toutes les hauteurs. \$u_{50} = 18 + 0{,}2 \\times 49 = 27{,}8\\,cm\$.",
                ),
                _step(
                  "Somme : \$H = 50 \\times (18 + 27{,}8)/2 = 50 \\times 22{,}9 = 1145\\,cm = 11{,}45\\,m\$.",
                ),
                _step(
                  "Vérification : si toutes les marches faisaient 22,9 cm (la moyenne), la hauteur serait \$50 \\times 22{,}9 = 1145\\,cm\$ ✓.",
                ),
              ], finalAnswerFr: r"$H = 11{,}45$ m"),
            ),
          ],
        ),
      ],
    );

// ============================================================================
// Registry & main
// ============================================================================

final Map<String, Map<String, dynamic>> _papers = {
  'arithmetic_seq': _paperArithmeticSeq(),
  // 31 SMB chapters remaining.
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln(
      '-- Migration 031: topic-coherent exam papers for SMB chapters (Phase 2).');
  buf.writeln('-- Auto-generated by json_encode_exam_papers_smb.dart.');
  buf.writeln(
      '-- Each row UPDATE writes the full multi-exercice paper into skills.exam_paper.');
  buf.writeln('BEGIN;');
  buf.writeln();

  for (final entry in _papers.entries) {
    final code = entry.key;
    final json = jsonEncode(entry.value);
    buf.writeln(
        "UPDATE public.skills SET exam_paper = '${_sqlEscape(json)}'::jsonb WHERE code = '$code';");
  }

  buf.writeln();
  buf.writeln('COMMIT;');

  File('backend/supabase/migrations/031_exam_papers_smb.sql')
      .writeAsStringSync(buf.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/031_exam_papers_smb.sql (${_papers.length} papers).');
}
