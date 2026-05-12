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

Map<String, dynamic> _paperGeometricSeq() => _paper(
      titleFr: 'Épreuve type — Suites géométriques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites géométriques : raison \$q\$, terme général \$u_n = u_0 q^n\$, somme \$S = u_0 (1 - q^{n+1})/(1-q)\$, limites selon \$|q|\$.",
      exercices: [
        _ex(
          1,
          'Identification',
          5,
          "Soit \$(u_n)\$ telle que \$u_0 = 2\$ et \$u_{n+1} = 3 u_n\$.",
          [
            _q(
              1,
              "Montrer que \$(u_n)\$ est géométrique et donner la raison.",
              2,
              _sol([
                _step(
                  "Définition d'une suite géométrique : \$u_{n+1}/u_n = q\$ constant. Ici \$u_{n+1}/u_n = 3\$.",
                ),
                _step(
                  "Donc \$(u_n)\$ est géométrique de **raison \$q = 3\$** (multiplication par 3 à chaque étape).",
                ),
              ], finalAnswerFr: r"$q = 3$"),
            ),
            _q(
              2,
              "Donner \$u_n\$ en fonction de \$n\$ et calculer \$u_5\$, \$u_{10}\$.",
              3,
              _sol([
                _step(
                  "Terme général : \$u_n = u_0 q^n = 2 \\cdot 3^n\$.",
                ),
                _step(
                  "\$u_5 = 2 \\times 243 = 486\$ ; \$u_{10} = 2 \\times 59049 = 118098\$.",
                  tipFr:
                      "Croissance exponentielle pour \$|q| > 1\$ — chaque terme est \$q\$ fois le précédent.",
                ),
              ], finalAnswerFr: r"$u_n = 2 \cdot 3^n$, $u_5 = 486$, $u_{10} = 118098$"),
            ),
          ],
        ),
        _ex(
          2,
          'Sommes',
          5,
          "Avec la suite \$u_n = 2 \\cdot 3^n\$.",
          [
            _q(
              1,
              "Calculer \$S = u_0 + u_1 + \\dots + u_5\$ (6 termes).",
              3,
              _sol([
                _step(
                  "**Formule** : \$S = u_0 \\dfrac{1 - q^{n+1}}{1 - q}\$ pour \$n+1\$ termes.",
                ),
                _step(
                  "Ici 6 termes, \$u_0 = 2\$, \$q = 3\$. \$S = 2 \\dfrac{1 - 3^6}{1 - 3} = 2 \\dfrac{1 - 729}{-2} = 2 \\times 364 = 728\$.",
                ),
              ], finalAnswerFr: r"$S = 728$"),
            ),
            _q(
              2,
              "Limite de la somme infinie \$1 + 1/2 + 1/4 + 1/8 + \\dots\$",
              2,
              _sol([
                _step(
                  "Suite géométrique \$u_0 = 1\$, \$q = 1/2\$, \$|q| < 1\$ → somme infinie converge.",
                ),
                _step(
                  "Formule : \$S_\\infty = u_0/(1 - q) = 1/(1 - 1/2) = 2\$.",
                  tipFr:
                      "Pour \$|q| < 1\$, \$q^n \\to 0\$ et \$S_n \\to u_0/(1-q)\$ — c'est le paradoxe de Zénon résolu.",
                ),
              ], finalAnswerFr: r"$S_\infty = 2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Comportement à l\'infini',
          5,
          "Étudier la limite de la suite \$(u_n)\$ selon la valeur de \$q\$ pour \$u_n = u_0 q^n\$ avec \$u_0 > 0\$.",
          [
            _q(
              1,
              "Donner la limite \$\\lim u_n\$ selon les 4 cas : \$q > 1\$, \$q = 1\$, \$|q| < 1\$, \$q \\le -1\$.",
              5,
              _sol([
                _step(
                  "**\$q > 1\$** : \$q^n \\to +\\infty\$, donc \$u_n \\to +\\infty\$. Croissance exponentielle.",
                ),
                _step(
                  "**\$q = 1\$** : \$u_n = u_0\$ constant. Limite : \$u_0\$.",
                ),
                _step(
                  "**\$|q| < 1\$** (c-à-d \$-1 < q < 1\$) : \$q^n \\to 0\$, donc \$u_n \\to 0\$. Décroissance vers 0.",
                ),
                _step(
                  "**\$q = -1\$** : \$u_n\$ alterne \$\\pm u_0\$ → **pas de limite**.",
                ),
                _step(
                  "**\$q < -1\$** : oscillations divergentes (\$|u_n| \\to +\\infty\$ avec alternance de signe) → **pas de limite**.",
                  tipFr:
                      "Mémo : la limite d'une suite géométrique dépend uniquement de la position de \$q\$ par rapport à 1 et -1.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Application — capital à intérêts composés',
          5,
          "Un capital \$C_0 = 1000\\,€\$ est placé à un taux annuel de 5%. Soit \$C_n\$ le capital après \$n\$ ans.",
          [
            _q(
              1,
              "Justifier que \$(C_n)\$ est géométrique. Donner sa raison.",
              2,
              _sol([
                _step(
                  "Chaque année, le capital est multiplié par \$1{,}05\$ (capital initial + 5% d'intérêts). Donc \$C_{n+1} = 1{,}05 \\times C_n\$.",
                ),
                _step(
                  "Géométrique de raison \$q = 1{,}05\$.",
                ),
              ], finalAnswerFr: r"$q = 1{,}05$"),
            ),
            _q(
              2,
              "Calculer \$C_{10}\$ et \$C_{30}\$.",
              2,
              _sol([
                _step(
                  "\$C_n = C_0 \\times 1{,}05^n = 1000 \\times 1{,}05^n\$.",
                ),
                _step(
                  "\$C_{10} = 1000 \\times 1{,}629 \\approx 1629\\,€\$ ; \$C_{30} = 1000 \\times 4{,}322 \\approx 4322\\,€\$.",
                ),
                _step(
                  "**Insight** : en 30 ans à 5%, le capital plus que quadruple. C'est le pouvoir des intérêts composés (vs intérêts simples qui donneraient 1000 + 30×50 = 2500 €).",
                ),
              ], finalAnswerFr: r"$C_{10} \approx 1629$ €, $C_{30} \approx 4322$ €"),
            ),
            _q(
              3,
              "Après combien d'années le capital aura-t-il doublé ?",
              1,
              _sol([
                _step(
                  "Résoudre \$1{,}05^n = 2 \\iff n = \\ln 2/\\ln 1{,}05 \\approx 0{,}693/0{,}0488 \\approx 14{,}2\\,\\text{ans}\$.",
                ),
                _step(
                  "Donc le capital double en environ **14 ans** au taux de 5%. Règle approximative : 'doublement = 72/taux %' (ici 72/5 = 14,4, très proche).",
                  tipFr:
                      "La 'règle de 72' est très utilisée en finance : à taux r% par an, doublement en ~72/r années.",
                ),
              ], finalAnswerFr: r"$n \approx 14$ ans"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperSeqConvergence() => _paper(
      titleFr: 'Épreuve type — Convergence des suites',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Convergence, limite, théorème des gendarmes, monotonie + bornes, opérations sur les limites.",
      exercices: [
        _ex(
          1,
          'Limites usuelles',
          5,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{n \\to \\infty} 1/n\$, \$1/n^2\$, \$1/\\sqrt{n}\$.",
              2,
              _sol([
                _step(
                  "**Règle générale** : pour tout \$\\alpha > 0\$, \$\\lim 1/n^\\alpha = 0\$.",
                ),
                _step(
                  "Application : les 3 limites valent **0**. Plus \$\\alpha\$ est grand, plus la décroissance est rapide.",
                ),
              ], finalAnswerFr: r"Toutes valent 0"),
            ),
            _q(
              2,
              "\$\\lim_{n \\to \\infty} \\dfrac{2n + 1}{n + 3}\$.",
              2,
              _sol([
                _step(
                  "Forme \$\\infty/\\infty\$. Diviser haut et bas par \$n\$ : \$\\dfrac{2 + 1/n}{1 + 3/n} \\to \\dfrac{2}{1} = 2\$.",
                ),
                _step(
                  "**Règle** : pour un quotient de polynômes de même degré, limite = rapport des coefficients dominants.",
                ),
              ], finalAnswerFr: r"$\lim = 2$"),
            ),
            _q(
              3,
              "\$\\lim_{n \\to \\infty} \\sqrt{n+1} - \\sqrt{n}\$.",
              1,
              _sol([
                _step(
                  "Forme \$\\infty - \\infty\$. **Astuce de la quantité conjuguée** : multiplier par \$(\\sqrt{n+1} + \\sqrt{n})/(\\sqrt{n+1} + \\sqrt{n})\$.",
                ),
                _step(
                  "\$\\sqrt{n+1} - \\sqrt{n} = \\dfrac{(n+1) - n}{\\sqrt{n+1} + \\sqrt{n}} = \\dfrac{1}{\\sqrt{n+1} + \\sqrt{n}} \\to 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          2,
          'Théorème des gendarmes',
          5,
          "Soit \$u_n = \\dfrac{\\sin(n)}{n}\$ pour \$n \\ge 1\$.",
          [
            _q(
              1,
              "Encadrer \$u_n\$.",
              2,
              _sol([
                _step(
                  "\$-1 \\le \\sin(n) \\le 1\$. Diviser par \$n > 0\$ : \$-1/n \\le \\sin(n)/n \\le 1/n\$.",
                ),
              ], finalAnswerFr: r"$-1/n \le u_n \le 1/n$"),
            ),
            _q(
              2,
              "En déduire la limite.",
              3,
              _sol([
                _step(
                  "\$\\lim -1/n = 0\$ et \$\\lim 1/n = 0\$.",
                ),
                _step(
                  "Par le **théorème des gendarmes**, \$u_n\$ est encadrée par deux suites qui tendent toutes deux vers 0, donc \$\\lim u_n = 0\$.",
                  tipFr:
                      "Note : \$\\sin(n)\$ n'a PAS de limite, mais \$\\sin(n)/n\$ converge grâce à la décroissance de \$1/n\$.",
                ),
              ], finalAnswerFr: r"$\lim u_n = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Convergence par monotonie',
          5,
          "Soit \$(u_n)\$ définie par \$u_0 = 1\$ et \$u_{n+1} = \\sqrt{2 + u_n}\$.",
          [
            _qSubs(
              1,
              "Étude de \$(u_n)\$.",
              4,
              [
                _sub(
                  'a',
                  "Montrer par récurrence que \$1 \\le u_n \\le 2\$.",
                  2,
                  _sol([
                    _step(
                      "**Initialisation** : \$u_0 = 1\$ vérifie \$1 \\le 1 \\le 2\$ ✓.",
                    ),
                    _step(
                      "**Hérédité** : si \$1 \\le u_n \\le 2\$, alors \$3 \\le 2 + u_n \\le 4\$, donc \$\\sqrt 3 \\le \\sqrt{2 + u_n} \\le 2\$. Comme \$\\sqrt 3 > 1\$ : \$1 \\le u_{n+1} \\le 2\$ ✓.",
                    ),
                    _step(
                      "Conclusion : pour tout \$n\$, \$1 \\le u_n \\le 2\$. La suite est **bornée**.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Montrer que \$(u_n)\$ est croissante.",
                  2,
                  _sol([
                    _step(
                      "On veut \$u_{n+1} \\ge u_n\$, soit \$\\sqrt{2 + u_n} \\ge u_n\$. Élever au carré (tous positifs) : \$2 + u_n \\ge u_n^2 \\iff u_n^2 - u_n - 2 \\le 0 \\iff (u_n - 2)(u_n + 1) \\le 0\$.",
                    ),
                    _step(
                      "Sur \$[1, 2]\$ : \$u_n - 2 \\le 0\$ et \$u_n + 1 > 0\$ → produit \$\\le 0\$ ✓. Donc \$u_{n+1} \\ge u_n\$ : croissante.",
                    ),
                  ]),
                ),
              ],
            ),
            _q(
              2,
              "En déduire que \$(u_n)\$ converge. Calculer sa limite.",
              1,
              _sol([
                _step(
                  "Suite croissante et majorée (par 2) → **convergente** par théorème de la limite monotone.",
                ),
                _step(
                  "Limite \$L\$ : passage à la limite dans \$u_{n+1} = \\sqrt{2 + u_n}\$ donne \$L = \\sqrt{2 + L}\$. Carré : \$L^2 = L + 2 \\iff (L-2)(L+1) = 0\$. Avec \$L \\in [1, 2]\$ : \$L = 2\$.",
                ),
              ], finalAnswerFr: r"$L = 2$"),
            ),
          ],
        ),
        _ex(
          4,
          'Opérations sur les limites',
          5,
          "Soient \$u_n = (n^2 + 1)/n\$ et \$v_n = (3n - 1)/(n + 2)\$. Calculer \$\\lim u_n\$, \$\\lim v_n\$, \$\\lim u_n + v_n\$, \$\\lim u_n v_n\$.",
          [
            _q(
              1,
              "Calculer chaque limite.",
              5,
              _sol([
                _step(
                  "\$u_n = n + 1/n \\to +\\infty\$.",
                ),
                _step(
                  "\$v_n = (3n - 1)/(n + 2) \\to 3\$ (mêmes degrés, rapport des dominants).",
                ),
                _step(
                  "**Somme** : \$\\lim (u_n + v_n) = +\\infty + 3 = +\\infty\$.",
                ),
                _step(
                  "**Produit** : \$\\lim (u_n v_n) = +\\infty \\times 3 = +\\infty\$.",
                  tipFr:
                      "Opérations sur les limites : (+\\infty) + fini = +\\infty ; (+\\infty) × fini > 0 = +\\infty ; (+\\infty) × 0 ou (+\\infty) - (+\\infty) = formes indéterminées (cas à étudier).",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim u_n = +\infty$, $\lim v_n = 3$, somme et produit $= +\infty$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLimitDefSmb() => _paper(
      titleFr: 'Épreuve type — Limites de fonctions',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Limite en un point, à l'infini, formes indéterminées, factorisation, quantités conjuguées.",
      exercices: [
        _ex(
          1,
          'Calcul direct',
          4,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 1}(x^2 + 3x - 2)\$.",
              1,
              _sol([
                _step(
                  "Polynôme continu partout. Substitution directe : \$1 + 3 - 2 = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim = 2$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 0} \\dfrac{x^2 - 4}{x - 2}\$.",
              1,
              _sol([
                _step(
                  "Substitution directe possible : \$(0 - 4)/(0 - 2) = -4/-2 = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim = 2$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$ — factoriser : \$x^2 - 4 = (x-2)(x+2)\$. Donc \$\\dfrac{x^2-4}{x-2} = x + 2\$ pour \$x \\ne 2\$.",
                ),
                _step(
                  "\$\\lim_{x \\to 2}(x+2) = 4\$.",
                ),
              ], finalAnswerFr: r"$\lim = 4$"),
            ),
          ],
        ),
        _ex(
          2,
          'Limites à l\'infini',
          5,
          "Calculer ces limites.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{3x^2 - x}{x^2 + 5}\$.",
              2,
              _sol([
                _step(
                  "Quotient de polynômes de **même degré 2**. Rapport des coefficients dominants : \$3/1 = 3\$.",
                ),
              ], finalAnswerFr: r"$\lim = 3$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} \\dfrac{x + 1}{x^2}\$.",
              1,
              _sol([
                _step(
                  "Numérateur degré 1, dénominateur degré 2 — dénominateur l'emporte. Limite = 0.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to +\\infty} \\dfrac{x^3 + 1}{x}\$.",
              1,
              _sol([
                _step(
                  "Numérateur degré 3, dénominateur degré 1 — numérateur l'emporte. \$\\dfrac{x^3 + 1}{x} = x^2 + 1/x \\to +\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim = +\infty$"),
            ),
            _q(
              4,
              "\$\\lim_{x \\to -\\infty}\\sqrt{x^2 + 1} + x\$.",
              1,
              _sol([
                _step(
                  "Forme \$+\\infty - \\infty\$. Quantité conjuguée : multiplier par \$(\\sqrt{x^2+1} - x)/(\\sqrt{x^2+1} - x)\$.",
                ),
                _step(
                  "On obtient \$\\dfrac{1}{\\sqrt{x^2+1} - x}\$. Pour \$x \\to -\\infty\$, \$-x \\to +\\infty\$, donc dénominateur \$\\to +\\infty\$, fraction \$\\to 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Limites latérales',
          5,
          "On considère \$f(x) = \\dfrac{1}{x}\$.",
          [
            _q(
              1,
              "Calculer \$\\lim_{x \\to 0^+} f\$ et \$\\lim_{x \\to 0^-} f\$.",
              3,
              _sol([
                _step(
                  "\$x \\to 0^+\$ : \$x > 0\$ très petit, donc \$1/x \\to +\\infty\$.",
                ),
                _step(
                  "\$x \\to 0^-\$ : \$x < 0\$ très petit, donc \$1/x \\to -\\infty\$.",
                ),
                _step(
                  "Limites latérales différentes → **pas de limite en 0**. La courbe a une asymptote verticale en \$x = 0\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{0^+} = +\infty$, $\lim_{0^-} = -\infty$"),
            ),
            _q(
              2,
              "Calculer \$\\lim_{x \\to \\pm\\infty} f(x)\$.",
              2,
              _sol([
                _step(
                  "À \$\\pm\\infty\$ : \$1/x \\to 0\$. La courbe a une asymptote horizontale \$y = 0\$.",
                ),
                _step(
                  "**Résumé** : la courbe de \$1/x\$ a deux branches (hyperbole), avec asymptotes \$y = 0\$ et \$x = 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = 0$ aux deux bornes"),
            ),
          ],
        ),
        _ex(
          4,
          'Asymptote oblique',
          6,
          "Soit \$f(x) = \\dfrac{x^2 + 1}{x - 1}\$ définie sur \$\\mathbb{R} \\setminus \\{1\\}\$.",
          [
            _q(
              1,
              "Effectuer la division euclidienne et écrire \$f(x) = ax + b + \\dfrac{c}{x - 1}\$.",
              3,
              _sol([
                _step(
                  "Division : \$x^2 + 1 = (x - 1) \\cdot x + (x + 1) = (x - 1)(x + 1) + 2\$.",
                ),
                _step(
                  "Donc \$f(x) = x + 1 + \\dfrac{2}{x - 1}\$.",
                ),
              ], finalAnswerFr: r"$f(x) = x + 1 + \dfrac{2}{x-1}$"),
            ),
            _q(
              2,
              "En déduire l'asymptote oblique de la courbe en \$\\pm\\infty\$.",
              3,
              _sol([
                _step(
                  "Quand \$x \\to \\pm\\infty\$ : \$\\dfrac{2}{x-1} \\to 0\$, donc \$f(x) - (x + 1) \\to 0\$.",
                ),
                _step(
                  "La courbe \$y = f(x)\$ admet la droite \$y = x + 1\$ pour **asymptote oblique** en \$\\pm\\infty\$.",
                  tipFr:
                      "Asymptote oblique : on prend la partie polynômiale après division euclidienne. Le reste tend vers 0.",
                ),
              ], finalAnswerFr: r"$y = x + 1$ asymptote oblique"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLimitCalcSmb() => _paper(
      titleFr: 'Épreuve type — Calcul de limites avancé',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Techniques avancées : factorisation, conjugué, taux d'accroissement, croissances comparées \$\\ln/\\exp/x^n\$.",
      exercices: [
        _ex(
          1,
          'Formes 0/0 par factorisation',
          5,
          "Calculer les limites.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$. Factoriser : \$x^2 - 9 = (x-3)(x+3)\$.",
                ),
                _step(
                  "\$\\dfrac{(x-3)(x+3)}{x-3} = x + 3 \\to 6\$ quand \$x \\to 3\$.",
                ),
              ], finalAnswerFr: r"$\lim = 6$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x^2 - 1}\$.",
              3,
              _sol([
                _step(
                  "Forme \$0/0\$. Numérateur : \$x^3 - 1 = (x-1)(x^2 + x + 1)\$. Dénominateur : \$x^2 - 1 = (x-1)(x+1)\$.",
                ),
                _step(
                  "Fraction : \$\\dfrac{(x-1)(x^2+x+1)}{(x-1)(x+1)} = \\dfrac{x^2+x+1}{x+1}\$ (pour \$x \\ne 1\$).",
                ),
                _step(
                  "Limite en 1 : \$\\dfrac{3}{2} = 1{,}5\$.",
                ),
              ], finalAnswerFr: r"$\lim = 3/2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Quantité conjuguée',
          5,
          "Calculer.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 0} \\dfrac{\\sqrt{1 + x} - 1}{x}\$.",
              3,
              _sol([
                _step(
                  "Forme \$0/0\$. Multiplier haut et bas par la quantité conjuguée \$\\sqrt{1+x} + 1\$.",
                ),
                _step(
                  "\$\\dfrac{(\\sqrt{1+x} - 1)(\\sqrt{1+x} + 1)}{x(\\sqrt{1+x} + 1)} = \\dfrac{(1+x) - 1}{x(\\sqrt{1+x} + 1)} = \\dfrac{x}{x(\\sqrt{1+x} + 1)} = \\dfrac{1}{\\sqrt{1+x} + 1}\$.",
                ),
                _step(
                  "Limite en 0 : \$\\dfrac{1}{1 + 1} = 1/2\$.",
                  tipFr:
                      "La quantité conjuguée \$a - b\$ multipliée par \$a + b\$ donne \$a^2 - b^2\$ — fait disparaître les racines carrées.",
                ),
              ], finalAnswerFr: r"$\lim = 1/2$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty}\\sqrt{x^2 + x} - x\$.",
              2,
              _sol([
                _step(
                  "Forme \$\\infty - \\infty\$. Conjuguée : multiplier par \$(\\sqrt{x^2+x} + x)/(\\sqrt{x^2+x} + x)\$.",
                ),
                _step(
                  "Numérateur : \$x^2 + x - x^2 = x\$. Dénominateur : \$\\sqrt{x^2+x} + x \\sim 2x\$ à l'infini.",
                ),
                _step(
                  "Donc fraction \$\\sim x/(2x) = 1/2\$. Limite = \$1/2\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1/2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Taux d\'accroissement',
          5,
          "Reconnaître un taux d'accroissement pour calculer.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 0} \\dfrac{\\sin x}{x}\$.",
              2,
              _sol([
                _step(
                  "C'est \$\\dfrac{\\sin x - \\sin 0}{x - 0}\$ = taux d'accroissement de \$\\sin\$ entre 0 et \$x\$. Limite = \$\\sin'(0) = \\cos 0 = 1\$.",
                ),
                _step(
                  "**Limite usuelle** : \$\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1\$. À mémoriser absolument.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x}\$.",
              2,
              _sol([
                _step(
                  "Taux d'accroissement de \$\\exp\$ en 0 : limite = \$\\exp'(0) = e^0 = 1\$.",
                  tipFr:
                      "Limites usuelles : \$\\lim_{0} \\dfrac{\\sin x}{x} = 1\$, \$\\lim_{0} \\dfrac{e^x - 1}{x} = 1\$, \$\\lim_{0} \\dfrac{\\ln(1+x)}{x} = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0} \\dfrac{\\ln(1 + x)}{x}\$.",
              1,
              _sol([
                _step(
                  "Taux d'accroissement de \$\\ln\$ en 1 (avec changement de variable) : \$\\ln(1+x) = \\ln(1+x) - \\ln(1)\$, dérivée en 1 = \$1/1 = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
          ],
        ),
        _ex(
          4,
          'Croissances comparées',
          5,
          "Calculer les limites.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x}\$ et \$\\dfrac{\\ln x}{x^2}\$.",
              2,
              _sol([
                _step(
                  "**Théorème** : à l'infini, toute puissance positive de \$x\$ l'emporte sur \$\\ln x\$. \$\\lim \\dfrac{\\ln x}{x^\\alpha} = 0\$ pour tout \$\\alpha > 0\$.",
                ),
                _step(
                  "Les deux limites valent **0**.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^{10}}\$.",
              2,
              _sol([
                _step(
                  "**Théorème** : à l'infini, l'exponentielle l'emporte sur toute puissance. \$\\lim \\dfrac{e^x}{x^n} = +\\infty\$ pour tout \$n\$.",
                ),
                _step(
                  "Donc \$\\lim = +\\infty\$. Hiérarchie : \$\\exp \\gg x^n \\gg \\ln\$ à l'infini.",
                  tipFr:
                      "Cette hiérarchie est universelle — elle décide qui 'gagne' dans les formes indéterminées \$\\infty/\\infty\$ ou \$\\infty \\cdot 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = +\infty$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0^+} x \\ln x\$.",
              1,
              _sol([
                _step(
                  "Forme \$0 \\cdot (-\\infty)\$. Changement de variable \$u = 1/x\$ : \$x \\ln x = (1/u) \\ln(1/u) = -\\ln(u)/u \\to 0\$ quand \$u \\to +\\infty\$.",
                ),
                _step(
                  "Donc \$\\lim_{0^+} x \\ln x = 0\$. Limite usuelle.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperSeqRecursive() => _paper(
      titleFr: 'Épreuve type — Suites récurrentes',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites définies par récurrence \$u_{n+1} = f(u_n)\$, point fixe, étude de la convergence par monotonie + bornes.",
      exercices: [
        _ex(
          1,
          'Récurrence simple',
          5,
          "Soit \$(u_n)\$ définie par \$u_0 = 0\$ et \$u_{n+1} = (u_n + 4)/2\$.",
          [
            _q(
              1,
              "Calculer \$u_1, u_2, u_3\$ et conjecturer la limite.",
              2,
              _sol([
                _step(
                  "\$u_1 = (0 + 4)/2 = 2\$. \$u_2 = (2 + 4)/2 = 3\$. \$u_3 = (3 + 4)/2 = 3{,}5\$.",
                ),
                _step(
                  "La suite semble croître vers une limite proche de **4** : 0, 2, 3, 3.5, 3.75, ...",
                ),
              ], finalAnswerFr: r"Conjecture : $L = 4$"),
            ),
            _q(
              2,
              "Trouver le point fixe de \$f(x) = (x+4)/2\$.",
              2,
              _sol([
                _step(
                  "**Point fixe** : \$L = f(L) \\iff L = (L+4)/2 \\iff 2L = L + 4 \\iff L = 4\$. ✓ avec la conjecture.",
                ),
                _step(
                  "Mais attention : trouver le point fixe ne prouve pas la convergence — il faut aussi vérifier que la suite y tend.",
                  tipFr:
                      "Le point fixe est un candidat-limite. Pour conclure, il faut montrer monotonie + bornes (théorème de la limite monotone).",
                ),
              ], finalAnswerFr: r"$L = 4$"),
            ),
            _q(
              3,
              "Montrer que \$(u_n)\$ est croissante et majorée par 4.",
              1,
              _sol([
                _step(
                  "Par récurrence : si \$u_n < 4\$, alors \$u_{n+1} = (u_n + 4)/2 < (4 + 4)/2 = 4\$. Donc \$u_n < 4\$ pour tout \$n\$ (majorée).",
                ),
                _step(
                  "Croissance : \$u_{n+1} - u_n = (u_n + 4)/2 - u_n = (4 - u_n)/2 > 0\$ tant que \$u_n < 4\$. Donc croissante.",
                ),
                _step(
                  "Croissante + majorée → converge (vers le point fixe \$L = 4\$).",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Récurrence non linéaire',
          5,
          "Soit \$u_0 = 2\$ et \$u_{n+1} = \\sqrt{u_n + 6}\$.",
          [
            _qSubs(
              1,
              "Étude.",
              4,
              [
                _sub(
                  'a',
                  "Trouver le point fixe.",
                  1,
                  _sol([
                    _step(
                      "\$L = \\sqrt{L + 6} \\Rightarrow L^2 = L + 6 \\Rightarrow L^2 - L - 6 = 0\$. Discriminant 25, racines \$L = 3\$ ou \$L = -2\$.",
                    ),
                    _step(
                      "Comme \$\\sqrt{\\cdot} \\ge 0\$, la limite (si elle existe) est \$\\ge 0\$. Donc \$L = 3\$.",
                    ),
                  ], finalAnswerFr: r"$L = 3$"),
                ),
                _sub(
                  'b',
                  "Montrer par récurrence que \$2 \\le u_n \\le 3\$.",
                  2,
                  _sol([
                    _step(
                      "Init : \$u_0 = 2\$ ✓. Hérédité : si \$2 \\le u_n \\le 3\$, alors \$8 \\le u_n + 6 \\le 9\$, donc \$\\sqrt{8} \\le u_{n+1} \\le 3\$. \$\\sqrt 8 \\approx 2{,}83 > 2\$ ✓.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Conclure sur la convergence.",
                  1,
                  _sol([
                    _step(
                      "Croissance : \$u_{n+1}^2 - u_n^2 = u_n + 6 - u_n^2 = -(u_n - 3)(u_n + 2)\$. Sur [2, 3], \$(u_n - 3) \\le 0\$ et \$(u_n + 2) > 0\$ → \$u_{n+1}^2 \\ge u_n^2\$ → \$u_{n+1} \\ge u_n\$. Croissante + majorée → converge vers L = 3.",
                    ),
                  ]),
                ),
              ],
            ),
            _q(
              2,
              "Combien d'itérations sont nécessaires pour atteindre \$|u_n - 3| < 10^{-3}\$ ?",
              1,
              _sol([
                _step(
                  "Calcul itératif : u_0 = 2 (|err| = 1), u_1 ≈ 2.83 (|err| ≈ 0.17), u_2 ≈ 2.97 (|err| ≈ 0.03), u_3 ≈ 2.995 (|err| ≈ 0.005), u_4 ≈ 2.9992 (|err| ≈ 0.0008).",
                ),
                _step(
                  "Donc dès \$n = 4\$, on a \$|u_n - 3| < 10^{-3}\$. Convergence rapide.",
                ),
              ], finalAnswerFr: r"$n = 4$"),
            ),
          ],
        ),
        _ex(
          3,
          'Suite arithmético-géométrique',
          5,
          "Soit \$(u_n)\$ telle que \$u_0 = 0\$ et \$u_{n+1} = 2 u_n + 3\$.",
          [
            _q(
              1,
              "Trouver le point fixe \$\\ell\$ et étudier \$v_n = u_n - \\ell\$.",
              3,
              _sol([
                _step(
                  "Point fixe : \$\\ell = 2\\ell + 3 \\iff -\\ell = 3 \\iff \\ell = -3\$.",
                ),
                _step(
                  "Posons \$v_n = u_n + 3\$. Alors \$v_{n+1} = u_{n+1} + 3 = 2u_n + 3 + 3 = 2(u_n + 3) = 2 v_n\$. \$(v_n)\$ est **géométrique** de raison 2.",
                ),
                _step(
                  "\$v_0 = u_0 + 3 = 3\$. Donc \$v_n = 3 \\cdot 2^n\$ et \$u_n = v_n - 3 = 3 \\cdot 2^n - 3\$.",
                  tipFr:
                      "Astuce arithmético-géométrique : passer à \$v_n = u_n - \\ell\$ rend la récurrence géométrique pure.",
                ),
              ],
                  finalAnswerFr:
                      r"$u_n = 3 \cdot 2^n - 3$"),
            ),
            _q(
              2,
              "En déduire \$\\lim u_n\$.",
              2,
              _sol([
                _step(
                  "Quand \$n \\to \\infty\$, \$2^n \\to +\\infty\$, donc \$u_n \\to +\\infty\$.",
                ),
                _step(
                  "Note : ici \$|q| = 2 > 1\$, donc la suite **diverge** vers \$+\\infty\$. Le point fixe \$\\ell = -3\$ est **répulsif** (la suite s'en éloigne).",
                ),
              ], finalAnswerFr: r"$\lim u_n = +\infty$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — modèle de population',
          5,
          "Une population de bactéries double chaque heure, mais 100 sont prélevées chaque heure pour analyse. À \$t = 0\$, population = 200.",
          [
            _q(
              1,
              "Modéliser la population \$P_n\$ après \$n\$ heures par une suite récurrente.",
              2,
              _sol([
                _step(
                  "\$P_0 = 200\$. Chaque heure : doublement (\$\\times 2\$) puis prélèvement (-100). Donc \$P_{n+1} = 2 P_n - 100\$.",
                ),
              ], finalAnswerFr: r"$P_{n+1} = 2 P_n - 100$, $P_0 = 200$"),
            ),
            _q(
              2,
              "Trouver l'expression explicite de \$P_n\$ et son comportement.",
              3,
              _sol([
                _step(
                  "Point fixe : \$\\ell = 2\\ell - 100 \\iff \\ell = 100\$. Posons \$Q_n = P_n - 100\$. Alors \$Q_{n+1} = P_{n+1} - 100 = 2 P_n - 100 - 100 = 2 P_n - 200 = 2(P_n - 100) = 2 Q_n\$.",
                ),
                _step(
                  "\$(Q_n)\$ géométrique de raison 2, \$Q_0 = 100\$. Donc \$Q_n = 100 \\cdot 2^n\$ et \$P_n = 100 \\cdot 2^n + 100\$.",
                ),
                _step(
                  "**Vérification** : \$P_0 = 100 + 100 = 200\$ ✓. \$P_1 = 200 + 100 = 300\$ ; or \$2 P_0 - 100 = 400 - 100 = 300\$ ✓.",
                ),
                _step(
                  "Comportement : la population **explose exponentiellement**. Au bout de 10 heures, \$P_{10} = 100 \\cdot 1024 + 100 = 102\\,500\$ bactéries.",
                ),
              ], finalAnswerFr: r"$P_n = 100 (2^n + 1)$, explose"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperSeqAdjacent() => _paper(
      titleFr: 'Épreuve type — Suites adjacentes',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites adjacentes : croissante + décroissante + différence nulle à l'infini → même limite. Outil de démonstration d'existence et d'encadrement.",
      exercices: [
        _ex(
          1,
          'Définition',
          5,
          "On dit que deux suites \$(a_n)\$ et \$(b_n)\$ sont **adjacentes** si \$(a_n)\$ est croissante, \$(b_n)\$ est décroissante, et \$b_n - a_n \\to 0\$.",
          [
            _q(
              1,
              "Énoncer le théorème des suites adjacentes.",
              2,
              _sol([
                _step(
                  "**Théorème** : si \$(a_n)\$ et \$(b_n)\$ sont adjacentes, alors elles convergent toutes deux vers la **même limite** \$\\ell\$.",
                ),
                _step(
                  "De plus, pour tout \$n\$, \$a_n \\le \\ell \\le b_n\$. La limite est ainsi **encadrée** par les deux suites.",
                ),
              ]),
            ),
            _q(
              2,
              "Vérifier que les suites \$a_n = 1 - 1/n\$ et \$b_n = 1 + 1/n\$ pour \$n \\ge 1\$ sont adjacentes.",
              3,
              _sol([
                _step(
                  "Monotonie : \$a_{n+1} - a_n = -1/(n+1) - (-1/n) = 1/n - 1/(n+1) > 0\$ → croissante ✓.",
                ),
                _step(
                  "\$b_{n+1} - b_n = 1/(n+1) - 1/n < 0\$ → décroissante ✓.",
                ),
                _step(
                  "Différence : \$b_n - a_n = 2/n \\to 0\$ ✓.",
                ),
                _step(
                  "Limite commune : 1 (par calcul direct). Encadrement : \$a_n \\le 1 \\le b_n\$ pour tout \$n\$ ✓.",
                ),
              ], finalAnswerFr: r"Adjacentes, limite commune $= 1$"),
            ),
          ],
        ),
        _ex(
          2,
          'Application — encadrement de e',
          5,
          "On considère \$a_n = \\sum_{k=0}^{n} \\dfrac{1}{k!}\$ et \$b_n = a_n + \\dfrac{1}{n \\cdot n!}\$.",
          [
            _q(
              1,
              "Montrer que \$(a_n)\$ est croissante.",
              2,
              _sol([
                _step(
                  "\$a_{n+1} - a_n = \\dfrac{1}{(n+1)!} > 0\$ → strictement croissante.",
                ),
              ]),
            ),
            _q(
              2,
              "Admettre que \$(b_n)\$ est décroissante et que \$b_n - a_n \\to 0\$. Conclure.",
              3,
              _sol([
                _step(
                  "\$(a_n)\$ croissante, \$(b_n)\$ décroissante, \$b_n - a_n = 1/(n n!) \\to 0\$ → **adjacentes**.",
                ),
                _step(
                  "Elles convergent vers la même limite \$e = \\sum_{k=0}^\\infty 1/k!\$ (définition en série de l'exponentielle de Neper).",
                ),
                _step(
                  "**Encadrement utile** : \$a_n \\le e \\le b_n\$. Par exemple \$a_5 = 1 + 1 + 1/2 + 1/6 + 1/24 + 1/120 \\approx 2{,}717\$ et \$b_5 \\approx 2{,}7183\$ — encadrement très précis.",
                  tipFr:
                      "Cette construction est la définition rigoureuse classique de \$e\$. Elle permet de calculer \$e\$ avec autant de précision qu'on veut.",
                ),
              ], finalAnswerFr: r"$\lim a_n = \lim b_n = e$"),
            ),
          ],
        ),
        _ex(
          3,
          'Suites construites par récurrence',
          5,
          "Soit \$a_0 = 1\$, \$b_0 = 2\$, et pour tout \$n\$ : \$a_{n+1} = \\sqrt{a_n b_n}\$ (moyenne géométrique), \$b_{n+1} = (a_n + b_n)/2\$ (moyenne arithmétique).",
          [
            _q(
              1,
              "Calculer \$a_1\$ et \$b_1\$. Conjecturer une relation.",
              2,
              _sol([
                _step(
                  "\$a_1 = \\sqrt{1 \\cdot 2} = \\sqrt{2} \\approx 1{,}414\$. \$b_1 = (1+2)/2 = 1{,}5\$.",
                ),
                _step(
                  "Observation : \$a_1 < b_1\$. Plus généralement, **AM-GM inequality** : \$\\sqrt{ab} \\le (a+b)/2\$ avec égalité ssi \$a = b\$.",
                ),
              ], finalAnswerFr: r"$a_n \le b_n$ par AM-GM"),
            ),
            _q(
              2,
              "Admettre que \$(a_n)\$ est croissante et \$(b_n)\$ décroissante. Si \$b_n - a_n \\to 0\$, conclure.",
              3,
              _sol([
                _step(
                  "Suites adjacentes — convergent vers la même limite \$\\mu\$, appelée **moyenne arithmético-géométrique** de \$a_0\$ et \$b_0\$.",
                ),
                _step(
                  "Pour \$a_0 = 1, b_0 = 2\$ : \$\\mu \\approx 1{,}4567\$. Cette quantité apparaît dans le calcul d'intégrales elliptiques (méthode de Gauss).",
                  tipFr:
                      "La moyenne arithmético-géométrique (AGM) converge extrêmement vite — utilisée historiquement pour calculer \$\\pi\$ avec haute précision (Brent-Salamin).",
                ),
              ], finalAnswerFr: r"Convergence vers $\mu \approx 1{,}457$"),
            ),
          ],
        ),
        _ex(
          4,
          'Critique du théorème',
          5,
          "Le théorème des suites adjacentes nécessite **3 conditions** ; sans l'une d'elles, la conclusion peut être fausse.",
          [
            _q(
              1,
              "Donner un exemple où \$(a_n)\$ croissante, \$(b_n)\$ décroissante, mais \$b_n - a_n\$ ne tend PAS vers 0. Montrer qu'elles n'ont pas la même limite.",
              3,
              _sol([
                _step(
                  "Exemple : \$a_n = 1 - 1/n\$ (croissante, limite 1) et \$b_n = 2 + 1/n\$ (décroissante, limite 2).",
                ),
                _step(
                  "Différence : \$b_n - a_n = 1 + 2/n \\to 1 \\ne 0\$.",
                ),
                _step(
                  "Limites différentes (1 et 2) → on ne peut pas conclure à une limite commune. Le théorème ne s'applique pas — il faut bien \$b_n - a_n \\to 0\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Donner un exemple où \$(a_n), (b_n)\$ ne sont pas adjacentes mais convergent vers la même limite. Cela contredit-il le théorème ?",
              2,
              _sol([
                _step(
                  "Exemple : \$a_n = (-1)^n / n\$ et \$b_n = 1/n\$. Toutes deux tendent vers 0.",
                ),
                _step(
                  "Mais \$(a_n)\$ n'est pas monotone (alterne en signe). Le théorème ne s'applique pas, mais cela ne contredit rien : c'est une **implication** (adjacentes → même limite), pas une équivalence.",
                  tipFr:
                      "Le théorème donne une condition SUFFISANTE de convergence, pas nécessaire. Il y a d'autres façons d'avoir la même limite.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperContinuity() => _paper(
      titleFr: 'Épreuve type — Continuité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Définition de la continuité, prolongement par continuité, fonctions usuelles, opérations.",
      exercices: [
        _ex(
          1,
          'Définition et exemples',
          4,
          "On rappelle : \$f\$ est continue en \$a\$ ssi \$\\lim_{x \\to a} f(x) = f(a)\$.",
          [
            _q(
              1,
              "Étudier la continuité de \$f(x) = \\begin{cases} x + 1 & \\text{si } x \\le 2 \\\\ x^2 - 1 & \\text{si } x > 2 \\end{cases}\$ en \$x = 2\$.",
              3,
              _sol([
                _step(
                  "Valeur en 2 : \$f(2) = 2 + 1 = 3\$ (cas \$x \\le 2\$).",
                ),
                _step(
                  "**Limite à gauche** : \$\\lim_{x \\to 2^-} f(x) = \\lim x + 1 = 3\$ ✓.",
                ),
                _step(
                  "**Limite à droite** : \$\\lim_{x \\to 2^+} f(x) = \\lim x^2 - 1 = 4 - 1 = 3\$ ✓.",
                ),
                _step(
                  "Les deux limites latérales valent \$f(2) = 3\$ → \$f\$ est **continue en 2**. La fonction se 'recolle' parfaitement à \$x = 2\$.",
                  tipFr:
                      "Pour une fonction définie par morceaux, vérifier la continuité aux 'points de raccord' = points où la définition change.",
                ),
              ], finalAnswerFr: r"Continue en 2"),
            ),
            _q(
              2,
              "Que dire si la définition était \$x^2 + 1\$ pour \$x > 2\$ ?",
              1,
              _sol([
                _step(
                  "Limite à droite : \$\\lim x^2 + 1 = 5 \\ne f(2) = 3\$. **Discontinuité** en 2 — saut de 2.",
                ),
              ], finalAnswerFr: r"Discontinue (saut)"),
            ),
          ],
        ),
        _ex(
          2,
          'Prolongement par continuité',
          5,
          "Soit \$f(x) = \\dfrac{x^2 - 1}{x - 1}\$ définie sur \$\\mathbb{R} \\setminus \\{1\\}\$.",
          [
            _q(
              1,
              "Montrer qu'on peut prolonger \$f\$ par continuité en \$x = 1\$.",
              3,
              _sol([
                _step(
                  "\$f\$ n'est pas définie en 1 (dénominateur s'annule). Étudions la limite : \$\\dfrac{x^2 - 1}{x - 1} = \\dfrac{(x-1)(x+1)}{x-1} = x + 1\$ pour \$x \\ne 1\$.",
                ),
                _step(
                  "Donc \$\\lim_{x \\to 1} f(x) = 2\$ existe et est finie.",
                ),
                _step(
                  "**Prolongement par continuité** : définir \$\\tilde f(1) = 2\$ rend \$\\tilde f\$ continue en 1. La fonction prolongée est simplement \$x + 1\$ partout.",
                  tipFr:
                      "Quand une fonction a une discontinuité 'apparente' (forme \$0/0\$), on peut souvent la prolonger par continuité.",
                ),
              ], finalAnswerFr: r"$\tilde f(1) = 2$, continue partout"),
            ),
            _q(
              2,
              "Peut-on prolonger \$g(x) = 1/x\$ par continuité en \$x = 0\$ ?",
              2,
              _sol([
                _step(
                  "Limites latérales : \$\\lim_{0^+} 1/x = +\\infty\$ et \$\\lim_{0^-} 1/x = -\\infty\$.",
                ),
                _step(
                  "Pas de limite finie en 0 → **impossible** de prolonger par continuité. La discontinuité de \$1/x\$ en 0 est essentielle (asymptote verticale).",
                ),
              ], finalAnswerFr: r"Non (pas de limite finie en 0)"),
            ),
          ],
        ),
        _ex(
          3,
          'Continuité des fonctions usuelles',
          5,
          "Étudier la continuité des fonctions suivantes sur leur ensemble de définition.",
          [
            _q(
              1,
              "\$f(x) = \\sqrt{x}\$.",
              1,
              _sol([
                _step(
                  "Définie sur \$[0, +\\infty[\$. Continue sur cet intervalle (fonction usuelle).",
                ),
              ]),
            ),
            _q(
              2,
              "\$g(x) = \\ln x\$.",
              1,
              _sol([
                _step(
                  "Définie sur \$]0, +\\infty[\$. Continue sur cet intervalle.",
                ),
              ]),
            ),
            _q(
              3,
              "\$h(x) = \\dfrac{1}{x^2 + 1}\$.",
              1,
              _sol([
                _step(
                  "\$x^2 + 1 > 0\$ pour tout \$x\$, donc \$h\$ est définie sur \$\\mathbb{R}\$. Continue partout (quotient de fonctions continues sans annulation du dénominateur).",
                ),
              ]),
            ),
            _q(
              4,
              "\$k(x) = \\dfrac{\\sin x}{x}\$ avec \$k(0) = 1\$.",
              2,
              _sol([
                _step(
                  "Sur \$\\mathbb{R}^*\$, continue (quotient de continues). En 0 : \$\\lim_{x \\to 0} \\sin x/x = 1 = k(0)\$ ✓.",
                ),
                _step(
                  "**Continue sur \$\\mathbb{R}\$**. Cette fonction est célèbre — c'est la fonction 'sinc' utilisée en traitement du signal.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Opérations sur les fonctions continues',
          6,
          "On rappelle : somme/produit/quotient/composée de fonctions continues est continue (avec conditions classiques).",
          [
            _q(
              1,
              "Justifier la continuité de \$f(x) = \\sqrt{x^2 + 1}\$.",
              2,
              _sol([
                _step(
                  "\$x \\mapsto x^2 + 1\$ est polynômiale, continue sur \$\\mathbb{R}\$.",
                ),
                _step(
                  "\$x^2 + 1 \\ge 1 > 0\$, donc \$\\sqrt{x^2 + 1}\$ est bien définie. \$\\sqrt{\\cdot}\$ est continue sur \$[0, +\\infty[\$.",
                ),
                _step(
                  "Composée de continues sur leur image → **\$f\$ continue sur \$\\mathbb{R}\$**.",
                ),
              ]),
            ),
            _q(
              2,
              "Continuité de \$g(x) = \\dfrac{x + 1}{x^2 - 4}\$. Préciser le domaine.",
              2,
              _sol([
                _step(
                  "Dénominateur \$x^2 - 4 = (x-2)(x+2) = 0 \\iff x = \\pm 2\$. Donc domaine = \$\\mathbb{R} \\setminus \\{-2, 2\\}\$.",
                ),
                _step(
                  "Quotient de polynômes (continus) avec dénominateur non nul → \$g\$ est **continue sur \$\\mathbb{R} \\setminus \\{-2, 2\\}\$**.",
                ),
              ], finalAnswerFr: r"Continue sur $\mathbb{R} \setminus \{-2, 2\}$"),
            ),
            _q(
              3,
              "Que dire de la continuité de \$h(x) = e^{1/x}\$ sur \$\\mathbb{R}^*\$ ?",
              2,
              _sol([
                _step(
                  "\$x \\mapsto 1/x\$ continue sur \$\\mathbb{R}^*\$. \$\\exp\$ continue partout. Composée → \$h\$ continue sur \$\\mathbb{R}^*\$.",
                ),
                _step(
                  "En 0 : pas de limite finie (\$\\lim_{0^+} e^{1/x} = +\\infty\$, \$\\lim_{0^-} e^{1/x} = 0\$). Pas prolongeable.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperTviSmb() => _paper(
      titleFr: 'Épreuve type — Théorème des valeurs intermédiaires',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "TVI : \$f\$ continue sur \$[a, b]\$ et \$k\$ entre \$f(a)\$ et \$f(b)\$ → \$\\exists c \\in [a, b] : f(c) = k\$. Corollaire : \$f(a) f(b) < 0\$ → \$f\$ s'annule au moins une fois.",
      exercices: [
        _ex(
          1,
          'Application directe',
          5,
          "Montrer que les équations suivantes admettent au moins une solution dans l'intervalle indiqué.",
          [
            _q(
              1,
              "\$x^3 + x - 1 = 0\$ sur \$[0, 1]\$.",
              3,
              _sol([
                _step(
                  "Soit \$p(x) = x^3 + x - 1\$. \$p\$ est polynômiale donc **continue sur \$\\mathbb{R}\$**, en particulier sur \$[0, 1]\$.",
                ),
                _step(
                  "Calcul : \$p(0) = -1 < 0\$, \$p(1) = 1 + 1 - 1 = 1 > 0\$.",
                ),
                _step(
                  "0 est compris entre \$p(0) = -1\$ et \$p(1) = 1\$. Par le **TVI**, \$\\exists c \\in [0, 1] : p(c) = 0\$.",
                ),
                _step(
                  "**Unicité** : \$p'(x) = 3x^2 + 1 > 0\$ partout → \$p\$ strictement croissante → unicité de la solution. \$c \\approx 0{,}682\$.",
                  tipFr:
                      "Pour montrer l'**unicité**, prouver la monotonie de \$f\$ via l'étude du signe de \$f'\$.",
                ),
              ], finalAnswerFr: r"$\exists ! c \in ]0, 1[$ avec $p(c) = 0$"),
            ),
            _q(
              2,
              "\$\\cos x = x\$ sur \$[0, \\pi/2]\$.",
              2,
              _sol([
                _step(
                  "Poser \$g(x) = \\cos x - x\$. Continue sur \$\\mathbb{R}\$ (différence de continues).",
                ),
                _step(
                  "\$g(0) = 1 > 0\$, \$g(\\pi/2) = 0 - \\pi/2 \\approx -1{,}57 < 0\$. Changement de signe → par TVI, \$\\exists c : g(c) = 0 \\iff \\cos c = c\$. Numériquement \$c \\approx 0{,}739\$.",
                ),
              ], finalAnswerFr: r"$\exists c \in ]0, \pi/2[$ : $\cos c = c$"),
            ),
          ],
        ),
        _ex(
          2,
          'Méthode de dichotomie',
          5,
          "On veut approximer la solution \$\\alpha\$ de \$f(x) = x^2 - 2 = 0\$ sur \$[1, 2]\$.",
          [
            _q(
              1,
              "Justifier qu'une solution existe dans \$[1, 2]\$.",
              1,
              _sol([
                _step(
                  "\$f\$ continue, \$f(1) = -1 < 0\$, \$f(2) = 2 > 0\$. Par TVI, solution dans \$]1, 2[\$.",
                ),
                _step(
                  "Bien sûr la solution est \$\\sqrt 2 \\approx 1{,}414\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Appliquer 3 étapes de dichotomie pour encadrer \$\\alpha\$.",
              4,
              _sol([
                _step(
                  "**Itération 1** : milieu \$m_1 = 1{,}5\$. \$f(1{,}5) = 0{,}25 > 0\$. Donc la solution est dans \$]1, 1{,}5[\$.",
                ),
                _step(
                  "**Itération 2** : \$m_2 = 1{,}25\$. \$f(1{,}25) = -0{,}4375 < 0\$. Donc dans \$]1{,}25, 1{,}5[\$.",
                ),
                _step(
                  "**Itération 3** : \$m_3 = 1{,}375\$. \$f(1{,}375) = -0{,}109 < 0\$. Donc dans \$]1{,}375, 1{,}5[\$.",
                ),
                _step(
                  "Encadrement après 3 étapes : \$1{,}375 < \\sqrt 2 < 1{,}5\$. Précision : 0,125.",
                  tipFr:
                      "Dichotomie : à chaque étape, on divise l'intervalle par 2. Convergence linéaire — précision multipliée par 2 à chaque étape.",
                ),
              ],
                  finalAnswerFr:
                      r"$\alpha \in [1{,}375, 1{,}5]$ après 3 étapes"),
            ),
          ],
        ),
        _ex(
          3,
          'TVI pour équations transcendantes',
          5,
          "Soit \$f(x) = e^x + x - 5\$.",
          [
            _q(
              1,
              "Montrer que l'équation \$f(x) = 0\$ admet une **unique** solution dans \$\\mathbb{R}\$.",
              4,
              _sol([
                _step(
                  "**Existence** : \$f\$ est continue (somme de continues). \$f(0) = 1 + 0 - 5 = -4 < 0\$, \$f(2) = e^2 + 2 - 5 \\approx 4{,}39 > 0\$. TVI → solution dans \$]0, 2[\$.",
                ),
                _step(
                  "**Unicité** : \$f'(x) = e^x + 1 > 0\$ partout (somme de positifs). \$f\$ strictement croissante → solution unique.",
                ),
                _step(
                  "**Domaine** : \$\\lim_{-\\infty} f = -\\infty + (-\\infty) - 5 = -\\infty\$. \$\\lim_{+\\infty} f = +\\infty\$. Donc \$f\$ atteint toutes les valeurs réelles, et l'unique solution est dans \$\\mathbb{R}\$.",
                  tipFr:
                      "Combiner : (1) TVI pour l'existence, (2) monotonie stricte pour l'unicité, (3) extension du domaine via les limites aux bornes.",
                ),
              ], finalAnswerFr: r"$\exists ! \alpha \approx 1{,}306$"),
            ),
            _q(
              2,
              "Donner un encadrement de la solution à \$10^{-1}\$ près.",
              1,
              _sol([
                _step(
                  "Test \$f(1{,}3) = e^{1{,}3} + 1{,}3 - 5 \\approx 3{,}669 + 1{,}3 - 5 = -0{,}031 < 0\$. \$f(1{,}4) \\approx 4{,}055 + 1{,}4 - 5 = 0{,}455 > 0\$.",
                ),
                _step(
                  "Donc \$\\alpha \\in ]1{,}3,\\, 1{,}4[\$.",
                ),
              ], finalAnswerFr: r"$\alpha \in ]1{,}3, 1{,}4[$"),
            ),
          ],
        ),
        _ex(
          4,
          'Limitations du TVI',
          5,
          "Le TVI donne l'existence, pas la valeur. Discuter ses limites.",
          [
            _q(
              1,
              "Pourquoi la condition 'continue sur \$[a, b]\$' est-elle essentielle ? Donner un contre-exemple.",
              3,
              _sol([
                _step(
                  "Contre-exemple : \$f(x) = 1/x\$ sur \$[-1, 1] \\setminus \\{0\\}\$. \$f(-1) = -1\$, \$f(1) = 1\$, 0 est entre les deux.",
                ),
                _step(
                  "Pourtant, \$f\$ ne s'annule **jamais** sur ce domaine — la discontinuité en 0 fait que la courbe 'saute' \$-\\infty \\to +\\infty\$ sans passer par 0.",
                ),
                _step(
                  "Conclusion : sans continuité, le TVI ne s'applique pas. La continuité est essentielle.",
                ),
              ]),
            ),
            _q(
              2,
              "Le TVI donne-t-il l'unicité ?",
              2,
              _sol([
                _step(
                  "**Non** — il donne juste l'existence d'au moins un \$c\$. Si \$f\$ n'est pas monotone, il peut y avoir plusieurs solutions.",
                ),
                _step(
                  "Exemple : \$f(x) = x^2 - 1\$ sur \$[-2, 2]\$. \$f(-2) = 3 > 0\$, \$f(2) = 3 > 0\$ — le TVI ne s'applique pas pour conclure à l'existence d'une racine ici (0 n'est pas entre 3 et 3). Mais en fait il y en a deux : \$x = \\pm 1\$. Le TVI ne les voit pas car les bornes sont du même signe.",
                ),
                _step(
                  "Sur \$[-2, 0]\$ : \$f(-2) = 3\$, \$f(0) = -1\$ → TVI donne une racine dans \$[-2, 0]\$ (à savoir -1). Mais le TVI seul ne détecte pas l'autre racine.",
                  tipFr:
                      "Pour des fonctions non-monotones, découper l'intervalle en sous-intervalles monotones avant d'appliquer le TVI.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDerivBasic() => _paper(
      titleFr: 'Épreuve type — Dérivée — concept et calcul',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Définition par taux d'accroissement, interprétation géométrique (tangente), dérivées usuelles.",
      exercices: [
        _ex(
          1,
          'Définition',
          5,
          "Soit \$f(x) = x^2 - 3x\$.",
          [
            _q(
              1,
              "Calculer le taux d'accroissement \$\\tau_h\$ entre 2 et \$2 + h\$.",
              2,
              _sol([
                _step(
                  "\$f(2+h) = (2+h)^2 - 3(2+h) = 4 + 4h + h^2 - 6 - 3h = h^2 + h - 2\$.",
                ),
                _step(
                  "\$f(2) = 4 - 6 = -2\$.",
                ),
                _step(
                  "\$\\tau_h = \\dfrac{f(2+h) - f(2)}{h} = \\dfrac{h^2 + h - 2 - (-2)}{h} = \\dfrac{h^2 + h}{h} = h + 1\$.",
                ),
              ], finalAnswerFr: r"$\tau_h = h + 1$"),
            ),
            _q(
              2,
              "En déduire \$f'(2)\$.",
              2,
              _sol([
                _step(
                  "\$f'(2) = \\lim_{h \\to 0} \\tau_h = \\lim (h + 1) = 1\$.",
                ),
                _step(
                  "Vérification : \$f'(x) = 2x - 3\$, \$f'(2) = 4 - 3 = 1\$ ✓.",
                ),
              ], finalAnswerFr: r"$f'(2) = 1$"),
            ),
            _q(
              3,
              "Donner l'équation de la tangente en \$x = 2\$.",
              1,
              _sol([
                _step(
                  "**Équation** : \$y = f(2) + f'(2)(x - 2) = -2 + 1 \\cdot (x - 2) = x - 4\$.",
                ),
              ], finalAnswerFr: r"$y = x - 4$"),
            ),
          ],
        ),
        _ex(
          2,
          'Dérivées usuelles',
          5,
          "Calculer les dérivées.",
          [
            _q(
              1,
              "\$f(x) = x^5\$, \$g(x) = 1/x\$, \$h(x) = \\sqrt{x}\$.",
              3,
              _sol([
                _step(
                  "\$f'(x) = 5 x^4\$ (règle des puissances).",
                ),
                _step(
                  "\$g(x) = x^{-1} \\Rightarrow g'(x) = -x^{-2} = -1/x^2\$.",
                ),
                _step(
                  "\$h(x) = x^{1/2} \\Rightarrow h'(x) = (1/2) x^{-1/2} = 1/(2\\sqrt{x})\$.",
                ),
              ]),
            ),
            _q(
              2,
              "\$\\sin x, \\cos x, e^x, \\ln x\$.",
              2,
              _sol([
                _step(
                  "\$(\\sin x)' = \\cos x\$, \$(\\cos x)' = -\\sin x\$.",
                ),
                _step(
                  "\$(e^x)' = e^x\$ (sa propre dérivée), \$(\\ln x)' = 1/x\$.",
                  tipFr:
                      "Mémoriser ces 4 dérivées usuelles : indispensable. Avec les règles d'opérations, on peut tout dériver.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Sens de variation',
          5,
          "Soit \$f(x) = x^3 - 3x + 2\$.",
          [
            _q(
              1,
              "Calculer \$f'(x)\$ et étudier son signe.",
              3,
              _sol([
                _step(
                  "\$f'(x) = 3 x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)\$.",
                ),
                _step(
                  "Racines : \$x = -1\$ et \$x = 1\$. Coefficient dominant positif → \$f'\$ positive en dehors des racines.",
                ),
                _step(
                  "Signes : sur \$]-\\infty, -1[\$ : \$f' > 0\$. Sur \$]-1, 1[\$ : \$f' < 0\$. Sur \$]1, +\\infty[\$ : \$f' > 0\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Donner le tableau de variations et les extrema.",
              2,
              _sol([
                _step(
                  "\$f\$ croissante sur \$]-\\infty, -1[\$, décroissante sur \$]-1, 1[\$, croissante sur \$]1, +\\infty[\$.",
                ),
                _step(
                  "**Maximum local** en \$x = -1\$ : \$f(-1) = -1 + 3 + 2 = 4\$. **Minimum local** en \$x = 1\$ : \$f(1) = 1 - 3 + 2 = 0\$.",
                ),
              ], finalAnswerFr: r"Max local en $-1$ ($=4$), min local en $1$ ($=0$)"),
            ),
          ],
        ),
        _ex(
          4,
          'Tangente — problème géométrique',
          5,
          "Soit la parabole \$\\mathcal{P}\$ d'équation \$y = x^2\$.",
          [
            _q(
              1,
              "Trouver les points de \$\\mathcal{P}\$ où la tangente a pour pente 4.",
              3,
              _sol([
                _step(
                  "Pente en un point \$(a, a^2)\$ : \$f'(a) = 2a\$.",
                ),
                _step(
                  "\$2a = 4 \\iff a = 2\$. Point : \$(2, 4)\$.",
                ),
                _step(
                  "Tangente : \$y = 4 + 4(x - 2) = 4x - 4\$.",
                ),
              ], finalAnswerFr: r"Point $(2, 4)$, tangente $y = 4x - 4$"),
            ),
            _q(
              2,
              "Existe-t-il un point de \$\\mathcal{P}\$ où la tangente est parallèle à la droite \$y = -3x\$ ?",
              2,
              _sol([
                _step(
                  "Pente -3 → \$2a = -3 \\iff a = -3/2\$. Point : \$(-3/2, 9/4)\$.",
                ),
                _step(
                  "**Oui**, ce point existe. La tangente y a pour équation \$y = 9/4 - 3(x + 3/2) = -3x - 9/4\$, parallèle à \$y = -3x\$ ✓.",
                ),
              ], finalAnswerFr: r"Point $(-3/2, 9/4)$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDerivRules() => _paper(
      titleFr: 'Épreuve type — Règles de dérivation',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Linéarité, produit \$(uv)' = u'v + uv'\$, quotient \$(u/v)' = (u'v - uv')/v^2\$, composition \$(f \\circ g)' = (f' \\circ g) \\cdot g'\$.",
      exercices: [
        _ex(
          1,
          'Linéarité et puissances',
          4,
          "Dériver.",
          [
            _q(
              1,
              "\$f(x) = 3x^4 - 2x^3 + 5x - 7\$.",
              2,
              _sol([
                _step(
                  "Linéarité : dériver terme à terme. \$f'(x) = 12 x^3 - 6 x^2 + 5\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = 12x^3 - 6x^2 + 5$"),
            ),
            _q(
              2,
              "\$g(x) = \\dfrac{2}{x^3} + 4\\sqrt{x}\$.",
              2,
              _sol([
                _step(
                  "\$g(x) = 2 x^{-3} + 4 x^{1/2}\$.",
                ),
                _step(
                  "\$g'(x) = -6 x^{-4} + 2 x^{-1/2} = -6/x^4 + 2/\\sqrt x\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = -6/x^4 + 2/\sqrt{x}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Produit',
          5,
          "Utiliser la règle du produit.",
          [
            _q(
              1,
              "\$f(x) = x \\sin x\$.",
              2,
              _sol([
                _step(
                  "Règle : \$(uv)' = u'v + uv'\$. \$u = x, u' = 1\$ ; \$v = \\sin x, v' = \\cos x\$.",
                ),
                _step(
                  "\$f'(x) = 1 \\cdot \\sin x + x \\cdot \\cos x = \\sin x + x \\cos x\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = \sin x + x \cos x$"),
            ),
            _q(
              2,
              "\$g(x) = (x^2 + 1)(x^3 - 2)\$.",
              2,
              _sol([
                _step(
                  "\$g'(x) = 2x(x^3 - 2) + (x^2 + 1) \\cdot 3 x^2 = 2x^4 - 4x + 3x^4 + 3x^2 = 5x^4 + 3x^2 - 4x\$.",
                ),
                _step(
                  "Vérification (développer puis dériver) : \$g(x) = x^5 + x^3 - 2x^2 - 2\$, \$g'(x) = 5x^4 + 3x^2 - 4x\$ ✓.",
                ),
              ], finalAnswerFr: r"$g'(x) = 5x^4 + 3x^2 - 4x$"),
            ),
            _q(
              3,
              "\$h(x) = x^2 e^x\$.",
              1,
              _sol([
                _step(
                  "\$h'(x) = 2x \\cdot e^x + x^2 \\cdot e^x = (2x + x^2) e^x = x(x + 2) e^x\$.",
                ),
              ], finalAnswerFr: r"$h'(x) = x(x+2) e^x$"),
            ),
          ],
        ),
        _ex(
          3,
          'Quotient',
          5,
          "Utiliser la règle du quotient.",
          [
            _q(
              1,
              "\$f(x) = \\dfrac{x}{x^2 + 1}\$.",
              3,
              _sol([
                _step(
                  "Règle : \$(u/v)' = (u'v - uv')/v^2\$. \$u = x, u' = 1\$ ; \$v = x^2 + 1, v' = 2x\$.",
                ),
                _step(
                  "Numérateur : \$1 \\cdot (x^2 + 1) - x \\cdot 2x = x^2 + 1 - 2x^2 = 1 - x^2\$.",
                ),
                _step(
                  "Dénominateur : \$(x^2 + 1)^2\$. Donc \$f'(x) = \\dfrac{1 - x^2}{(x^2 + 1)^2}\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = \dfrac{1 - x^2}{(x^2+1)^2}$"),
            ),
            _q(
              2,
              "\$g(x) = \\dfrac{1 + x}{1 - x}\$ (pour \$x \\ne 1\$).",
              2,
              _sol([
                _step(
                  "\$u = 1 + x, u' = 1\$ ; \$v = 1 - x, v' = -1\$.",
                ),
                _step(
                  "\$g'(x) = \\dfrac{1 \\cdot (1-x) - (1+x)(-1)}{(1-x)^2} = \\dfrac{1 - x + 1 + x}{(1-x)^2} = \\dfrac{2}{(1-x)^2}\$.",
                ),
                _step(
                  "Observation : \$g'(x) > 0\$ partout (sauf en 1 où non définie) → \$g\$ strictement croissante sur ses deux intervalles.",
                ),
              ], finalAnswerFr: r"$g'(x) = 2/(1-x)^2$"),
            ),
          ],
        ),
        _ex(
          4,
          'Composition',
          6,
          "Utiliser la règle de la chaîne.",
          [
            _q(
              1,
              "\$f(x) = (3x + 1)^4\$.",
              2,
              _sol([
                _step(
                  "**Composition** \$u^4\$ avec \$u(x) = 3x + 1\$. Règle : \$(u^n)' = n u^{n-1} u'\$.",
                ),
                _step(
                  "\$u' = 3\$, donc \$f'(x) = 4 (3x + 1)^3 \\cdot 3 = 12(3x + 1)^3\$.",
                  mistakeFr:
                      "Ne pas oublier le \$\\times 3\$ (dérivée de l'intérieur) — c'est l'erreur la plus fréquente.",
                ),
              ], finalAnswerFr: r"$f'(x) = 12(3x+1)^3$"),
            ),
            _q(
              2,
              "\$g(x) = \\sqrt{x^2 + 1}\$.",
              2,
              _sol([
                _step(
                  "Composition \$\\sqrt{u}\$ avec \$u = x^2 + 1\$. Règle : \$(\\sqrt u)' = u'/(2\\sqrt u)\$.",
                ),
                _step(
                  "\$u' = 2x\$, donc \$g'(x) = \\dfrac{2x}{2\\sqrt{x^2+1}} = \\dfrac{x}{\\sqrt{x^2+1}}\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = x/\sqrt{x^2+1}$"),
            ),
            _q(
              3,
              "\$h(x) = e^{-x^2}\$.",
              2,
              _sol([
                _step(
                  "Composition \$e^u\$ avec \$u = -x^2\$. Règle : \$(e^u)' = u' e^u\$.",
                ),
                _step(
                  "\$u' = -2x\$, donc \$h'(x) = -2x e^{-x^2}\$.",
                ),
                _step(
                  "**Fonction célèbre** : \$e^{-x^2}\$ est la cloche de Gauss (densité de probabilité normale, à un facteur près).",
                ),
              ], finalAnswerFr: r"$h'(x) = -2x e^{-x^2}$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDerivApps() => _paper(
      titleFr: 'Épreuve type — Applications de la dérivation',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Étude complète de fonction : domaine, variations, extrema, asymptotes, tracé. Problèmes d'optimisation.",
      exercices: [
        _ex(
          1,
          'Étude complète',
          6,
          "Soit \$f(x) = \\dfrac{x^2 - 1}{x}\$ définie sur \$\\mathbb{R}^*\$.",
          [
            _qSubs(
              1,
              "Étude complète de \$f\$.",
              5,
              [
                _sub(
                  'a',
                  "Calculer \$f'(x)\$ et étudier son signe.",
                  2,
                  _sol([
                    _step(
                      "\$f(x) = x - 1/x\$. \$f'(x) = 1 + 1/x^2 > 0\$ partout. \$f\$ **strictement croissante** sur ses deux intervalles \$]-\\infty, 0[\$ et \$]0, +\\infty[\$.",
                    ),
                  ], finalAnswerFr: r"$f'(x) = 1 + 1/x^2 > 0$"),
                ),
                _sub(
                  'b',
                  "Calculer les limites aux bornes.",
                  2,
                  _sol([
                    _step(
                      "\$\\lim_{x \\to +\\infty} f = +\\infty\$ (dominé par \$x\$). \$\\lim_{x \\to -\\infty} f = -\\infty\$.",
                    ),
                    _step(
                      "\$\\lim_{x \\to 0^+} f = -\\infty\$ (le terme \$-1/x \\to -\\infty\$). \$\\lim_{x \\to 0^-} f = +\\infty\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Étudier les asymptotes.",
                  1,
                  _sol([
                    _step(
                      "**Asymptote verticale** : \$x = 0\$ (les limites en \$0^\\pm\$ sont infinies).",
                    ),
                    _step(
                      "**Asymptote oblique** à l'infini : \$f(x) = x - 1/x\$. Le terme \$-1/x \\to 0\$, donc \$f(x) - x \\to 0\$. La droite \$y = x\$ est asymptote oblique.",
                    ),
                  ], finalAnswerFr: r"Asymptote verticale $x=0$, oblique $y=x$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          2,
          'Optimisation — boîte sans couvercle',
          5,
          "On veut fabriquer une boîte rectangulaire sans couvercle à partir d'une feuille de carton carrée de côté 30 cm, en découpant un carré de côté \$x\$ à chaque coin et en pliant. Volume \$V(x) = x (30 - 2x)^2\$, avec \$0 < x < 15\$.",
          [
            _q(
              1,
              "Calculer \$V'(x)\$ et trouver la valeur de \$x\$ qui maximise le volume.",
              4,
              _sol([
                _step(
                  "Règle du produit : \$V'(x) = 1 \\cdot (30 - 2x)^2 + x \\cdot 2(30 - 2x)(-2) = (30 - 2x)^2 - 4x(30 - 2x)\$.",
                ),
                _step(
                  "Factoriser : \$V'(x) = (30 - 2x)[(30 - 2x) - 4x] = (30 - 2x)(30 - 6x) = 12 (15 - x)(5 - x)\$.",
                ),
                _step(
                  "Racines de \$V'\$ : \$x = 5\$ et \$x = 15\$. \$x = 15\$ exclu (bord du domaine). Étude du signe sur \$]0, 15[\$ : \$V'(0) = 12 \\cdot 15 \\cdot 5 = 900 > 0\$ ; \$V'(10) = 12 \\cdot 5 \\cdot (-5) = -300 < 0\$. Donc \$V'\$ change de signe en \$x = 5\$ : **maximum**.",
                ),
                _step(
                  "Volume maximum : \$V(5) = 5 \\cdot 20^2 = 5 \\cdot 400 = 2000\\,cm^3 = 2\\,L\$.",
                  tipFr:
                      "Problème classique d'optimisation en BTS. La 'recette' : exprimer la grandeur à optimiser comme fonction d'une variable, calculer la dérivée, trouver les points critiques.",
                ),
              ],
                  finalAnswerFr:
                      r"$x = 5$ cm, $V_{\max} = 2000$ cm³"),
            ),
          ],
        ),
        _ex(
          3,
          'Inégalité par étude de fonction',
          5,
          "Démontrer que pour tout \$x > 0\$, \$\\ln(1 + x) < x\$.",
          [
            _q(
              1,
              "Étudier la fonction \$f(x) = x - \\ln(1 + x)\$ sur \$[0, +\\infty[\$.",
              4,
              _sol([
                _step(
                  "\$f(0) = 0 - \\ln 1 = 0\$.",
                ),
                _step(
                  "\$f'(x) = 1 - \\dfrac{1}{1 + x} = \\dfrac{x}{1 + x}\$. Sur \$[0, +\\infty[\$ : \$x \\ge 0\$ et \$1 + x > 0\$ → \$f'(x) \\ge 0\$.",
                ),
                _step(
                  "\$f' > 0\$ pour \$x > 0\$ → \$f\$ strictement croissante.",
                ),
                _step(
                  "Conclusion : pour \$x > 0\$, \$f(x) > f(0) = 0\$, donc \$x - \\ln(1+x) > 0 \\iff \\ln(1+x) < x\$. ✓",
                  tipFr:
                      "Pour démontrer \$f(x) > g(x)\$, étudier la fonction différence \$h = f - g\$ et montrer qu'elle est positive.",
                ),
              ]),
            ),
            _q(
              2,
              "En déduire l'inégalité \$\\ln(2) < 1\$ et donner un encadrement de \$\\ln 2\$.",
              1,
              _sol([
                _step(
                  "Appliquer avec \$x = 1\$ : \$\\ln(1 + 1) = \\ln 2 < 1\$ ✓.",
                ),
                _step(
                  "On peut aussi montrer \$\\ln(1 + x) > x - x^2/2\$ pour \$x > 0\$ (par étude similaire). Avec \$x = 1\$ : \$\\ln 2 > 1/2\$. Donc \$1/2 < \\ln 2 < 1\$. Valeur exacte : \$\\ln 2 \\approx 0{,}693\$.",
                ),
              ], finalAnswerFr: r"$1/2 < \ln 2 < 1$"),
            ),
          ],
        ),
        _ex(
          4,
          'Tangentes communes',
          4,
          "Soient \$f(x) = x^2\$ et \$g(x) = -(x-2)^2 + 4\$.",
          [
            _q(
              1,
              "Trouver une tangente commune aux deux courbes.",
              4,
              _sol([
                _step(
                  "Soit la tangente à \$f\$ en \$(a, a^2)\$ : pente \$2a\$, équation \$y = 2a(x - a) + a^2 = 2ax - a^2\$.",
                ),
                _step(
                  "Soit la tangente à \$g\$ en \$(b, -(b-2)^2 + 4)\$ : pente \$g'(b) = -2(b - 2)\$, équation \$y = -2(b-2)x + \\text{const}\$.",
                ),
                _step(
                  "Pour qu'elles coïncident : pentes égales \$2a = -2(b-2) \\Rightarrow a = 2 - b\$. Et ordonnées à l'origine égales : \$-a^2 = -2(b-2) \\cdot 0 + g(b) - g'(b) \\cdot b\$... calcul plus simple : la tangente à g au point b a pour équation \$y = -2(b-2)x + (b^2 - 4)\$ (en développant).",
                ),
                _step(
                  "Égalité : \$2a = -2(b-2)\$ et \$-a^2 = b^2 - 4\$. Substituer \$a = 2 - b\$ : \$-(2-b)^2 = b^2 - 4 \\Rightarrow -(4 - 4b + b^2) = b^2 - 4 \\Rightarrow -4 + 4b - b^2 = b^2 - 4 \\Rightarrow 4b = 2 b^2 \\Rightarrow b = 0\$ ou \$b = 2\$.",
                ),
                _step(
                  "Pour \$b = 2\$ : \$a = 0\$, tangente \$y = 0\$ (axe Ox). Vérification : \$f(0) = 0\$, tangente horizontale ; et tangente à g au sommet \$(2, 4)\$ n'est pas l'axe Ox... mais à \$(2, 0)\$ - non, \$g(2) = 4\$. La tangente commune est à \$y = 0\$ entre \$f(0) = 0\$ et \$g(0) = 0\$... ah, \$g(0) = -(0-2)^2 + 4 = -4 + 4 = 0\$ ✓.",
                ),
              ], finalAnswerFr: r"Tangente commune : $y = 0$ entre $(0,0)$ pour les deux"),
            ),
          ],
        ),
      ],
    );

final Map<String, Map<String, dynamic>> _papers = {
  'arithmetic_seq': _paperArithmeticSeq(),
  'geometric_seq': _paperGeometricSeq(),
  'seq_convergence': _paperSeqConvergence(),
  'seq_recursive': _paperSeqRecursive(),
  'seq_adjacent': _paperSeqAdjacent(),
  'limit_def': _paperLimitDefSmb(),
  'limit_calc': _paperLimitCalcSmb(),
  'continuity': _paperContinuity(),
  'tvi': _paperTviSmb(),
  'deriv_basic': _paperDerivBasic(),
  'deriv_rules': _paperDerivRules(),
  'deriv_apps': _paperDerivApps(),
  // 20 SMB chapters remaining.
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
