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

Map<String, dynamic> _paperPrimitivesSmb() => _paper(
      titleFr: 'Épreuve type — Primitives',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Définition (\$F' = f\$), calcul, unicité à une constante près, primitives usuelles.",
      exercices: [
        _ex(
          1,
          'Primitives usuelles',
          5,
          "Donner une primitive sur l'intervalle indiqué.",
          [
            _q(
              1,
              "\$f(x) = x^3 - 4x + 2\$ sur \$\\mathbb{R}\$.",
              2,
              _sol([
                _step(
                  "Linéarité de l'intégration. Pour \$x^n\$ (\$n \\ne -1\$) : primitive = \$x^{n+1}/(n+1)\$.",
                ),
                _step(
                  "\$F(x) = x^4/4 - 2x^2 + 2x + C\$. Vérification : \$F'(x) = x^3 - 4x + 2\$ ✓.",
                ),
              ], finalAnswerFr: r"$F(x) = x^4/4 - 2x^2 + 2x + C$"),
            ),
            _q(
              2,
              "\$g(x) = 1/x^2\$ sur \$]0, +\\infty[\$.",
              1,
              _sol([
                _step(
                  "\$g(x) = x^{-2}\$, primitive \$x^{-1}/(-1) = -1/x + C\$. Vérification : \$(-1/x)' = 1/x^2\$ ✓.",
                ),
              ], finalAnswerFr: r"$G(x) = -1/x + C$"),
            ),
            _q(
              3,
              "\$h(x) = \\sin(2x)\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Composition : essayer \$H(x) = -\\cos(2x)/2\$. Vérification : \$H'(x) = -(-\\sin 2x) \\cdot 2 / 2 = \\sin 2x\$ ✓.",
                  tipFr:
                      "Pour \$\\sin(ax)\$, primitive \$-\\cos(ax)/a\$. Pour \$\\cos(ax)\$, primitive \$\\sin(ax)/a\$. Le facteur \$1/a\$ compense la dérivation de l'argument.",
                ),
              ], finalAnswerFr: r"$H(x) = -\cos(2x)/2 + C$"),
            ),
            _q(
              4,
              "\$k(x) = e^{3x + 1}\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Primitive \$K(x) = e^{3x+1}/3 + C\$. Vérification : \$K'(x) = 3 e^{3x+1}/3 = e^{3x+1}\$ ✓.",
                ),
              ], finalAnswerFr: r"$K(x) = e^{3x+1}/3 + C$"),
            ),
          ],
        ),
        _ex(
          2,
          'Primitive vérifiant une condition',
          5,
          "Soit \$f(x) = 3 x^2 - 6x + 5\$.",
          [
            _q(
              1,
              "Trouver la primitive \$F\$ telle que \$F(1) = 0\$.",
              3,
              _sol([
                _step(
                  "Forme générale : \$F(x) = x^3 - 3 x^2 + 5x + C\$.",
                ),
                _step(
                  "Condition : \$F(1) = 1 - 3 + 5 + C = 3 + C = 0 \\Rightarrow C = -3\$.",
                ),
                _step(
                  "Primitive : \$F(x) = x^3 - 3 x^2 + 5x - 3\$.",
                  tipFr:
                      "Toute primitive a une **constante d'intégration** libre — fixée par une condition supplémentaire.",
                ),
              ], finalAnswerFr: r"$F(x) = x^3 - 3x^2 + 5x - 3$"),
            ),
            _q(
              2,
              "Vérifier le résultat.",
              2,
              _sol([
                _step(
                  "\$F'(x) = 3x^2 - 6x + 5 = f(x)\$ ✓.",
                ),
                _step(
                  "\$F(1) = 1 - 3 + 5 - 3 = 0\$ ✓.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Reconnaître une dérivée',
          5,
          "Calculer les primitives suivantes en reconnaissant la forme \$u'/u\$ ou \$u' u^n\$.",
          [
            _q(
              1,
              "\$\\int \\dfrac{2x}{x^2 + 1}\\,dx\$.",
              2,
              _sol([
                _step(
                  "On reconnaît la forme \$u'/u\$ avec \$u(x) = x^2 + 1\$. La primitive est \$\\ln|u| + C = \\ln(x^2 + 1) + C\$ (valeur absolue inutile car \$x^2 + 1 > 0\$).",
                ),
                _step(
                  "Vérification : \$(\\ln(x^2+1))' = (2x)/(x^2+1)\$ ✓.",
                ),
              ], finalAnswerFr: r"$\ln(x^2 + 1) + C$"),
            ),
            _q(
              2,
              "\$\\int (2x + 1)^5\\,dx\$.",
              2,
              _sol([
                _step(
                  "Forme \$u' u^n\$ ? On a \$u = 2x + 1\$, \$u' = 2\$. Mais le facteur 2 manque. Réécrire : \$(2x+1)^5 = (1/2) \\cdot 2 \\cdot (2x+1)^5\$.",
                ),
                _step(
                  "Primitive : \$(1/2) \\cdot (2x+1)^6/6 = (2x+1)^6/12 + C\$.",
                ),
                _step(
                  "Vérification : \$\\dfrac{d}{dx}\\left[(2x+1)^6/12\\right] = \\dfrac{6(2x+1)^5 \\cdot 2}{12} = (2x+1)^5\$ ✓.",
                ),
              ], finalAnswerFr: r"$(2x+1)^6/12 + C$"),
            ),
            _q(
              3,
              "\$\\int x e^{x^2}\\,dx\$.",
              1,
              _sol([
                _step(
                  "Forme \$u' e^u\$ ? \$u = x^2\$, \$u' = 2x\$. Donc \$x e^{x^2} = (1/2) \\cdot 2 x \\cdot e^{x^2}\$. Primitive : \$(1/2) e^{x^2} + C\$.",
                ),
              ], finalAnswerFr: r"$e^{x^2}/2 + C$"),
            ),
          ],
        ),
        _ex(
          4,
          'Intégration par parties (notion)',
          5,
          "On admet la formule : \$\\int u v' = [uv] - \\int u' v\$.",
          [
            _q(
              1,
              "Calculer \$\\int x \\cos x\\,dx\$.",
              3,
              _sol([
                _step(
                  "**Choix LIATE** : \$u = x\$ (devient \$u' = 1\$, plus simple) ; \$v' = \\cos x\$ (donc \$v = \\sin x\$).",
                ),
                _step(
                  "Application : \$\\int x \\cos x\\,dx = x \\sin x - \\int 1 \\cdot \\sin x\\,dx = x \\sin x - (-\\cos x) + C = x \\sin x + \\cos x + C\$.",
                ),
                _step(
                  "Vérification : \$(x \\sin x + \\cos x)' = \\sin x + x \\cos x - \\sin x = x \\cos x\$ ✓.",
                ),
              ], finalAnswerFr: r"$x \sin x + \cos x + C$"),
            ),
            _q(
              2,
              "Calculer \$\\int \\ln x\\,dx\$.",
              2,
              _sol([
                _step(
                  "Astuce : \$\\ln x = 1 \\cdot \\ln x\$. Poser \$u = \\ln x\$ (donc \$u' = 1/x\$) et \$v' = 1\$ (donc \$v = x\$).",
                ),
                _step(
                  "\$\\int \\ln x\\,dx = x \\ln x - \\int (1/x) \\cdot x\\,dx = x \\ln x - x + C\$.",
                  tipFr:
                      "Astuce célèbre : pour intégrer \$\\ln\$, l'écrire \$1 \\cdot \\ln\$ et faire une IPP.",
                ),
              ], finalAnswerFr: r"$x \ln x - x + C$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDefiniteIntegral() => _paper(
      titleFr: 'Épreuve type — Intégrale définie',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Définition par primitives (Newton-Leibniz), propriétés (linéarité, Chasles, positivité), aire algébrique.",
      exercices: [
        _ex(
          1,
          'Calculs directs',
          5,
          "Calculer.",
          [
            _q(
              1,
              "\$\\int_0^2 (x^2 + 1)\\,dx\$.",
              2,
              _sol([
                _step(
                  "Primitive : \$F(x) = x^3/3 + x\$.",
                ),
                _step(
                  "\$\\int_0^2 = F(2) - F(0) = (8/3 + 2) - 0 = 8/3 + 6/3 = 14/3\$.",
                ),
              ], finalAnswerFr: r"$\int = 14/3$"),
            ),
            _q(
              2,
              "\$\\int_1^e \\dfrac{1}{x}\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$\\ln x\$. \$\\int = \\ln e - \\ln 1 = 1 - 0 = 1\$.",
                  tipFr:
                      "Définition historique de \$e\$ : \$\\int_1^e 1/t\\,dt = 1\$. C'est-à-dire \$e\$ est le nombre dont le logarithme népérien vaut 1.",
                ),
              ], finalAnswerFr: r"$\int = 1$"),
            ),
            _q(
              3,
              "\$\\int_0^{\\pi} \\sin x\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$-\\cos x\$. \$\\int = -\\cos\\pi + \\cos 0 = 1 + 1 = 2\$.",
                ),
              ], finalAnswerFr: r"$\int = 2$"),
            ),
            _q(
              4,
              "\$\\int_{-1}^1 |x|\\,dx\$.",
              1,
              _sol([
                _step(
                  "Décomposer : \$\\int_{-1}^0 -x\\,dx + \\int_0^1 x\\,dx = [-x^2/2]_{-1}^0 + [x^2/2]_0^1 = 1/2 + 1/2 = 1\$.",
                ),
                _step(
                  "Vérification géométrique : deux triangles isocèles de base 1 et hauteur 1 → aire totale = 1 ✓.",
                ),
              ], finalAnswerFr: r"$\int = 1$"),
            ),
          ],
        ),
        _ex(
          2,
          'Propriétés',
          5,
          "Utiliser les propriétés (linéarité, Chasles, etc.).",
          [
            _q(
              1,
              "Sachant que \$\\int_0^3 f = 7\$ et \$\\int_3^5 f = 2\$, calculer \$\\int_0^5 f\$.",
              1,
              _sol([
                _step(
                  "**Relation de Chasles** : \$\\int_0^5 f = \\int_0^3 f + \\int_3^5 f = 7 + 2 = 9\$.",
                ),
              ], finalAnswerFr: r"$\int = 9$"),
            ),
            _q(
              2,
              "Sachant que \$\\int_0^1 f = 5\$ et \$\\int_0^1 g = 3\$, calculer \$\\int_0^1 (2f - 3g)\$.",
              2,
              _sol([
                _step(
                  "**Linéarité** : \$\\int_0^1 (2f - 3g) = 2 \\int f - 3 \\int g = 2 \\times 5 - 3 \\times 3 = 10 - 9 = 1\$.",
                ),
              ], finalAnswerFr: r"$\int = 1$"),
            ),
            _q(
              3,
              "Inverser les bornes : \$\\int_5^2 f\$ si \$\\int_2^5 f = 4\$.",
              1,
              _sol([
                _step(
                  "\$\\int_a^b = -\\int_b^a\$. Donc \$\\int_5^2 f = -4\$.",
                ),
              ], finalAnswerFr: r"$-4$"),
            ),
            _q(
              4,
              "Positivité : si \$f \\ge 0\$ sur \$[a, b]\$, que dire de \$\\int_a^b f\$ ?",
              1,
              _sol([
                _step(
                  "\$\\int_a^b f \\ge 0\$. Plus fort : si \$f\$ continue et \$f \\ge 0\$ et non identiquement nulle, alors \$\\int > 0\$.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Aire d\'un domaine',
          5,
          "Calculer l'aire des domaines indiqués.",
          [
            _q(
              1,
              "Aire entre \$y = x^2\$ et l'axe Ox sur \$[0, 2]\$.",
              2,
              _sol([
                _step(
                  "\$A = \\int_0^2 x^2\\,dx = [x^3/3]_0^2 = 8/3\$ unités d'aire.",
                ),
              ], finalAnswerFr: r"$A = 8/3$"),
            ),
            _q(
              2,
              "Aire entre \$y = x^2\$ et \$y = x\$ sur \$[0, 1]\$.",
              3,
              _sol([
                _step(
                  "Sur \$[0, 1]\$, \$x \\ge x^2\$ (la droite est au-dessus). \$A = \\int_0^1 (x - x^2)\\,dx\$.",
                ),
                _step(
                  "\$\\int = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6\$.",
                ),
                _step(
                  "**Vérification** : à mi-chemin, \$x = 1/2\$, la droite est en 0,5 et la parabole en 0,25 — différence 0,25. Aire moyenne sur [0,1] = quelques dixièmes — cohérent avec 1/6 ≈ 0,167.",
                ),
              ], finalAnswerFr: r"$A = 1/6$"),
            ),
          ],
        ),
        _ex(
          4,
          'Valeur moyenne',
          5,
          "Définition : valeur moyenne de \$f\$ sur \$[a, b]\$ = \$\\bar f = \\dfrac{1}{b - a} \\int_a^b f\$.",
          [
            _q(
              1,
              "Calculer la valeur moyenne de \$f(x) = x^2\$ sur \$[0, 2]\$.",
              2,
              _sol([
                _step(
                  "\$\\int_0^2 x^2\\,dx = 8/3\$ (Exercice 3). \$\\bar f = (8/3)/(2 - 0) = 4/3\$.",
                ),
                _step(
                  "**Interprétation** : si on remplaçait \$f\$ par une fonction constante de valeur \$4/3\$ sur \$[0, 2]\$, l'aire sous la courbe serait identique : \$4/3 \\times 2 = 8/3\$ ✓.",
                ),
              ], finalAnswerFr: r"$\bar f = 4/3$"),
            ),
            _q(
              2,
              "Théorème de la moyenne : si \$f\$ continue sur \$[a, b]\$, \$\\exists c \\in [a, b]\$ tel que \$f(c) = \\bar f\$. Trouver \$c\$ pour l'exemple précédent.",
              3,
              _sol([
                _step(
                  "On cherche \$c\$ tel que \$c^2 = 4/3 \\iff c = \\pm 2/\\sqrt 3\$. La valeur dans \$[0, 2]\$ est \$c = 2/\\sqrt 3 \\approx 1{,}155\$.",
                ),
                _step(
                  "**Vérification** : \$c \\in [0, 2]\$ ✓ et \$f(c) = 4/3 = \\bar f\$ ✓.",
                ),
                _step(
                  "**Théorème de la moyenne** = conséquence du TVI : la valeur moyenne est atteinte au moins une fois.",
                  tipFr:
                      "Le théorème de la moyenne est puissant — il garantit l'existence d'un point précis où \$f\$ atteint sa moyenne.",
                ),
              ], finalAnswerFr: r"$c = 2/\sqrt{3}$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperIntegralApps() => _paper(
      titleFr: 'Épreuve type — Applications de l\'intégration',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Aires entre courbes, volumes de révolution (notion), calcul de longueurs, intégrale et probabilités continues.",
      exercices: [
        _ex(
          1,
          'Aire entre deux courbes',
          5,
          "Soient \$f(x) = x^2 + 1\$ et \$g(x) = x + 3\$.",
          [
            _q(
              1,
              "Trouver les points d'intersection des deux courbes.",
              2,
              _sol([
                _step(
                  "Égalité : \$x^2 + 1 = x + 3 \\iff x^2 - x - 2 = 0 \\iff (x-2)(x+1) = 0\$. Solutions : \$x = -1\$ et \$x = 2\$.",
                ),
                _step(
                  "Points : \$(-1, 2)\$ et \$(2, 5)\$.",
                ),
              ], finalAnswerFr: r"$(-1, 2)$ et $(2, 5)$"),
            ),
            _q(
              2,
              "Sur \$[-1, 2]\$, laquelle des deux courbes est au-dessus ? Calculer l'aire entre elles.",
              3,
              _sol([
                _step(
                  "Test en \$x = 0\$ : \$f(0) = 1\$, \$g(0) = 3\$. Donc \$g \\ge f\$ sur \$[-1, 2]\$ (la droite est au-dessus de la parabole entre les intersections).",
                ),
                _step(
                  "\$A = \\int_{-1}^2 (g - f)\\,dx = \\int_{-1}^2 (x + 3 - x^2 - 1)\\,dx = \\int_{-1}^2 (-x^2 + x + 2)\\,dx\$.",
                ),
                _step(
                  "Primitive : \$F(x) = -x^3/3 + x^2/2 + 2x\$.",
                ),
                _step(
                  "\$A = F(2) - F(-1) = (-8/3 + 2 + 4) - (1/3 + 1/2 - 2) = (-8/3 + 6) - (1/3 - 3/2) = (10/3) - (2/6 - 9/6) = 10/3 + 7/6 = 20/6 + 7/6 = 27/6 = 9/2\$.",
                ),
              ], finalAnswerFr: r"$A = 9/2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Volume de révolution (notion)',
          5,
          "On fait tourner la courbe \$y = \\sqrt{x}\$ autour de l'axe Ox sur \$[0, 4]\$, formant un solide de révolution.",
          [
            _q(
              1,
              "Donner la formule du volume.",
              2,
              _sol([
                _step(
                  "**Formule** : \$V = \\pi \\int_a^b [f(x)]^2\\,dx\$ (volume engendré par la rotation autour de Ox).",
                ),
                _step(
                  "Intuition : on découpe le solide en disques infinitésimaux d'épaisseur \$dx\$ et de rayon \$f(x)\$, d'aire \$\\pi f(x)^2\$. Intégration → volume total.",
                ),
              ], finalAnswerFr: r"$V = \pi \int_a^b f^2\,dx$"),
            ),
            _q(
              2,
              "Calculer ce volume.",
              3,
              _sol([
                _step(
                  "\$V = \\pi \\int_0^4 (\\sqrt x)^2\\,dx = \\pi \\int_0^4 x\\,dx = \\pi [x^2/2]_0^4 = \\pi \\cdot 8 = 8\\pi\\,\\text{unités}^3\$.",
                ),
                _step(
                  "**Forme du solide** : paraboloïde de révolution — comme un bol (la courbe \$y = \\sqrt x\$ est une demi-parabole, tournée donne un paraboloïde).",
                ),
              ], finalAnswerFr: r"$V = 8\pi$"),
            ),
          ],
        ),
        _ex(
          3,
          'Calcul de l\'énergie via une intégrale',
          5,
          "Un courant variable \$i(t) = 5 e^{-2t}\$ traverse une résistance \$R = 10\\,\\Omega\$. Énergie dissipée par effet Joule : \$E = R \\int_0^\\infty i^2(t)\\,dt\$.",
          [
            _q(
              1,
              "Calculer l'énergie totale dissipée.",
              4,
              _sol([
                _step(
                  "\$i^2(t) = 25 e^{-4t}\$.",
                ),
                _step(
                  "Primitive de \$e^{-4t}\$ : \$-e^{-4t}/4\$.",
                ),
                _step(
                  "\$\\int_0^\\infty e^{-4t}\\,dt = [-e^{-4t}/4]_0^\\infty = 0 - (-1/4) = 1/4\$.",
                ),
                _step(
                  "Énergie : \$E = R \\times 25 \\times 1/4 = 10 \\times 25/4 = 62{,}5\\,J\$.",
                ),
              ], finalAnswerFr: r"$E = 62{,}5$ J"),
            ),
            _q(
              2,
              "L'intégrale \$\\int_0^\\infty\$ est-elle un calcul rigoureux ?",
              1,
              _sol([
                _step(
                  "**C'est une intégrale impropre** : \$\\int_0^\\infty f = \\lim_{T \\to \\infty} \\int_0^T f\$. Elle converge ici car \$e^{-4t}\$ décroît assez vite.",
                ),
                _step(
                  "Plus généralement : \$\\int_0^\\infty e^{-\\alpha t}\\,dt = 1/\\alpha\$ pour \$\\alpha > 0\$ — résultat utile en physique (RC, RL, désintégration).",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Lien dérivée-intégrale',
          5,
          "On considère \$F(x) = \\int_0^x e^{-t^2}\\,dt\$.",
          [
            _q(
              1,
              "Quelle est la dérivée de \$F\$ ?",
              2,
              _sol([
                _step(
                  "**Théorème fondamental du calcul** : si \$F(x) = \\int_a^x f(t)\\,dt\$, alors \$F'(x) = f(x)\$.",
                ),
                _step(
                  "Application : \$F'(x) = e^{-x^2}\$.",
                  tipFr:
                      "C'est ce théorème qui établit le lien fondamental dérivation ↔ intégration. Newton-Leibniz est sa conséquence.",
                ),
              ], finalAnswerFr: r"$F'(x) = e^{-x^2}$"),
            ),
            _q(
              2,
              "Étudier les variations de \$F\$.",
              3,
              _sol([
                _step(
                  "\$F'(x) = e^{-x^2} > 0\$ pour tout \$x\$. Donc \$F\$ **strictement croissante** sur \$\\mathbb{R}\$.",
                ),
                _step(
                  "\$F(0) = 0\$. Pour \$x > 0\$ : \$F(x) > 0\$. Pour \$x < 0\$ : \$F(x) < 0\$.",
                ),
                _step(
                  "**Limites** : on admet \$\\int_0^\\infty e^{-t^2}\\,dt = \\sqrt\\pi/2 \\approx 0{,}886\$. Donc \$\\lim_{+\\infty} F = \\sqrt\\pi/2\$ et \$\\lim_{-\\infty} F = -\\sqrt\\pi/2\$.",
                ),
                _step(
                  "Cette fonction est liée à la **fonction d'erreur** \$\\text{erf}(x) = (2/\\sqrt\\pi) F(x)\$, omniprésente en probabilités et physique statistique.",
                  tipFr:
                      "\$\\int e^{-t^2}\$ ne s'exprime pas avec des fonctions élémentaires — elle définit une nouvelle fonction (erf).",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperProbBasic() => _paper(
      titleFr: 'Épreuve type — Probabilités',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Univers, événements, probabilité uniforme, opérations sur les événements, inclusion-exclusion.",
      exercices: [
        _ex(
          1,
          'Probabilité uniforme',
          5,
          "On lance simultanément 2 dés équilibrés à 6 faces. Univers : couples \$(i, j)\$ avec \$i, j \\in \\{1, \\ldots, 6\\}\$.",
          [
            _q(
              1,
              "Combien d'issues possibles ?",
              1,
              _sol([
                _step(
                  "**Principe multiplicatif** : 6 issues pour le 1er dé × 6 pour le 2ème = **36 issues** au total.",
                ),
              ], finalAnswerFr: r"36 issues"),
            ),
            _q(
              2,
              "Probabilité d'obtenir une somme de 7.",
              2,
              _sol([
                _step(
                  "**Cas favorables** : couples \$(i, j)\$ avec \$i + j = 7\$. Ce sont : \$(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\$ — soit **6 couples**.",
                ),
                _step(
                  "Probabilité : \$P(\\text{somme = 7}) = 6/36 = 1/6 \\approx 0{,}167\$.",
                  tipFr:
                      "C'est la somme la plus probable au lancer de 2 dés. C'est pourquoi 7 est la 'cible' au craps.",
                ),
              ], finalAnswerFr: r"$P = 1/6$"),
            ),
            _q(
              3,
              "Probabilité d'obtenir au moins un 6.",
              2,
              _sol([
                _step(
                  "**Astuce** : passer au complémentaire. \"Au moins un 6\" = ¬\"aucun 6\".",
                ),
                _step(
                  "P(aucun 6) : 5 issues hors 6 pour chaque dé, \$5 \\times 5 = 25\$ couples sans 6. P(aucun 6) = 25/36.",
                ),
                _step(
                  "P(au moins un 6) = 1 - 25/36 = 11/36 \\approx 0{,}306.",
                  tipFr:
                      "Pour 'au moins un X', passer au complémentaire 'aucun X' simplifie souvent les calculs.",
                ),
              ], finalAnswerFr: r"$P = 11/36$"),
            ),
          ],
        ),
        _ex(
          2,
          'Inclusion-exclusion',
          5,
          "Dans une classe de 30 élèves : 18 suivent l'option math, 14 l'option physique, 8 les deux.",
          [
            _q(
              1,
              "Combien suivent au moins une des deux options ?",
              2,
              _sol([
                _step(
                  "**Formule d'inclusion-exclusion** : \$|A \\cup B| = |A| + |B| - |A \\cap B| = 18 + 14 - 8 = 24\$.",
                ),
                _step(
                  "Vérification : 18 - 8 = 10 ne font que math, 14 - 8 = 6 ne font que physique, 8 font les deux. Total : \$10 + 6 + 8 = 24\$ ✓.",
                ),
              ], finalAnswerFr: r"24 élèves"),
            ),
            _q(
              2,
              "Combien ne suivent aucune des deux ?",
              1,
              _sol([
                _step(
                  "\$30 - 24 = 6\$ élèves ne suivent aucune option.",
                ),
              ], finalAnswerFr: r"6 élèves"),
            ),
            _q(
              3,
              "On tire un élève au hasard. Probabilité qu'il suive seulement l'option math (pas physique).",
              2,
              _sol([
                _step(
                  "\"Math seul\" = \"Math\" ET \"pas Physique\" = \\(|A \\setminus B|\\) = \\(|A| - |A \\cap B|\\) = 18 - 8 = 10.",
                ),
                _step(
                  "\$P = 10/30 = 1/3 \\approx 0{,}333\$.",
                ),
              ], finalAnswerFr: r"$P = 1/3$"),
            ),
          ],
        ),
        _ex(
          3,
          'Tirages successifs avec remise',
          5,
          "Une urne contient 5 boules rouges et 3 boules vertes (8 boules). On tire 2 boules **avec remise**.",
          [
            _q(
              1,
              "Probabilité de tirer 2 rouges.",
              2,
              _sol([
                _step(
                  "**Avec remise** : les tirages sont **indépendants**. \$P(RR) = P(R) \\times P(R) = (5/8)^2 = 25/64\$.",
                ),
              ], finalAnswerFr: r"$P(RR) = 25/64$"),
            ),
            _q(
              2,
              "Probabilité de tirer 1 rouge et 1 verte (dans n'importe quel ordre).",
              3,
              _sol([
                _step(
                  "Deux cas disjoints : RV et VR.",
                ),
                _step(
                  "P(RV) = (5/8)(3/8) = 15/64. P(VR) = (3/8)(5/8) = 15/64.",
                ),
                _step(
                  "Total : \$P = 30/64 = 15/32 \\approx 0{,}469\$.",
                ),
              ], finalAnswerFr: r"$P = 15/32$"),
            ),
          ],
        ),
        _ex(
          4,
          'Tirages sans remise',
          5,
          "Même urne (5 rouges + 3 vertes), mais tirages **sans remise**.",
          [
            _q(
              1,
              "Probabilité de tirer 2 rouges.",
              3,
              _sol([
                _step(
                  "**Sans remise** : les tirages ne sont **pas indépendants**. P(R1) = 5/8. Sachant R1, P(R2|R1) = 4/7 (4 rouges restantes sur 7 boules).",
                ),
                _step(
                  "P(RR) = P(R1) × P(R2|R1) = (5/8)(4/7) = 20/56 = **5/14 ≈ 0,357**.",
                ),
                _step(
                  "**Comparaison avec remise** : 25/64 ≈ 0,391 > 5/14 ≈ 0,357. Sans remise, la probabilité de tirer 2 rouges est plus faible (la 1ère consomme une rouge).",
                  tipFr:
                      "Sans remise = dépendance entre tirages. Avec remise = indépendance.",
                ),
              ], finalAnswerFr: r"$P(RR) = 5/14$"),
            ),
            _q(
              2,
              "Probabilité de tirer 1 rouge et 1 verte.",
              2,
              _sol([
                _step(
                  "P(RV) = (5/8)(3/7) = 15/56. P(VR) = (3/8)(5/7) = 15/56.",
                ),
                _step(
                  "Total : \$30/56 = 15/28 \\approx 0{,}536\$.",
                ),
              ], finalAnswerFr: r"$P = 15/28$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperConditionalProb() => _paper(
      titleFr: 'Épreuve type — Probabilités conditionnelles',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Probabilité conditionnelle \$P(A|B) = P(A \\cap B)/P(B)\$, indépendance, formule des probabilités totales, formule de Bayes.",
      exercices: [
        _ex(
          1,
          'Probabilité conditionnelle',
          5,
          "Une famille a deux enfants. On note F = 'fille' et G = 'garçon'.",
          [
            _q(
              1,
              "Combien de configurations possibles (en ordre de naissance) ?",
              1,
              _sol([
                _step(
                  "4 configurations équiprobables : FF, FG, GF, GG.",
                ),
              ], finalAnswerFr: r"4 configurations"),
            ),
            _q(
              2,
              "Probabilité d'avoir 2 filles, sachant qu'au moins un enfant est une fille.",
              3,
              _sol([
                _step(
                  "**Définition** : \$P(A | B) = \\dfrac{P(A \\cap B)}{P(B)}\$.",
                ),
                _step(
                  "A = \"2 filles\" = {FF}, B = \"au moins une fille\" = {FF, FG, GF}.",
                ),
                _step(
                  "\$P(A) = 1/4\$. \$P(B) = 3/4\$. \$P(A \\cap B) = P(\\text{FF}) = 1/4\$.",
                ),
                _step(
                  "\$P(A | B) = (1/4)/(3/4) = 1/3\$.",
                  tipFr:
                      "Résultat contre-intuitif ! La 'condition' \\(au moins une fille\\) réduit l'univers à 3 cas, dont 1 favorable. Différent de 1/2 (intuition naïve).",
                ),
              ], finalAnswerFr: r"$P = 1/3$"),
            ),
            _q(
              3,
              "Probabilité d'avoir 2 filles, sachant que l'aîné est une fille.",
              1,
              _sol([
                _step(
                  "Sous \"aîné fille\", univers = {FF, FG}, parmi lesquels FF est favorable. \$P = 1/2\$.",
                ),
                _step(
                  "**Comparaison** : la conditionnalité change radicalement la réponse (1/3 vs 1/2) selon l'information disponible. C'est le 'paradoxe des deux enfants'.",
                ),
              ], finalAnswerFr: r"$P = 1/2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Indépendance',
          5,
          "Soit A et B deux événements avec \$P(A) = 0{,}4\$, \$P(B) = 0{,}5\$, \$P(A \\cap B) = 0{,}2\$.",
          [
            _q(
              1,
              "Vérifier que A et B sont indépendants.",
              2,
              _sol([
                _step(
                  "**Critère** : A et B indépendants ssi \$P(A \\cap B) = P(A) P(B)\$.",
                ),
                _step(
                  "Calcul : \$P(A) P(B) = 0{,}4 \\times 0{,}5 = 0{,}2 = P(A \\cap B)\$ ✓. Indépendants.",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer \$P(A | B)\$ et \$P(B | A)\$.",
              2,
              _sol([
                _step(
                  "\$P(A | B) = P(A \\cap B)/P(B) = 0{,}2/0{,}5 = 0{,}4 = P(A)\$.",
                ),
                _step(
                  "\$P(B | A) = 0{,}2/0{,}4 = 0{,}5 = P(B)\$.",
                ),
                _step(
                  "Cohérent : si A et B sont indépendants, alors \$P(A | B) = P(A)\$ — la connaissance de B ne change pas la probabilité de A.",
                ),
              ]),
            ),
            _q(
              3,
              "Calculer \$P(A \\cup B)\$ et \$P(\\bar A \\cap \\bar B)\$.",
              1,
              _sol([
                _step(
                  "\$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0{,}4 + 0{,}5 - 0{,}2 = 0{,}7\$.",
                ),
                _step(
                  "\$P(\\bar A \\cap \\bar B) = P(\\overline{A \\cup B}) = 1 - 0{,}7 = 0{,}3\$ (lois de De Morgan).",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Probabilités totales et Bayes',
          5,
          "Dans une usine, 3 machines produisent des pièces : M1 (40% de la production, 3% défectueuses), M2 (35%, 5%), M3 (25%, 2%).",
          [
            _q(
              1,
              "Probabilité qu'une pièce prise au hasard soit défectueuse.",
              3,
              _sol([
                _step(
                  "**Formule des probabilités totales** : \$P(D) = P(D | M_1) P(M_1) + P(D | M_2) P(M_2) + P(D | M_3) P(M_3)\$.",
                ),
                _step(
                  "\$P(D) = 0{,}03 \\times 0{,}4 + 0{,}05 \\times 0{,}35 + 0{,}02 \\times 0{,}25 = 0{,}012 + 0{,}0175 + 0{,}005 = 0{,}0345 = 3{,}45\\%\$.",
                ),
              ], finalAnswerFr: r"$P(D) \approx 3{,}45\%$"),
            ),
            _q(
              2,
              "Une pièce est défectueuse. Probabilité qu'elle vienne de M2 ?",
              2,
              _sol([
                _step(
                  "**Formule de Bayes** : \$P(M_2 | D) = \\dfrac{P(D | M_2) P(M_2)}{P(D)} = \\dfrac{0{,}05 \\times 0{,}35}{0{,}0345} = \\dfrac{0{,}0175}{0{,}0345} \\approx 0{,}507\$.",
                ),
                _step(
                  "Donc **environ 51%** des pièces défectueuses viennent de M2, alors que M2 ne produit que 35% du total. M2 a un taux de défaut élevé qui amplifie sa contribution aux défauts.",
                  tipFr:
                      "Bayes inverse la conditionnalité : connaître \\(D \\to ?\\) à partir de \\(? \\to D\\). Très puissant en diagnostic (médical, machine learning).",
                ),
              ], finalAnswerFr: r"$P(M_2 | D) \approx 0{,}507$"),
            ),
          ],
        ),
        _ex(
          4,
          'Arbre pondéré',
          5,
          "Un test médical détecte une maladie avec 95% de fiabilité (vrais positifs) mais a 4% de faux positifs. La maladie touche 1% de la population.",
          [
            _q(
              1,
              "Si le test est positif, probabilité d'être effectivement malade ?",
              4,
              _sol([
                _step(
                  "Notations : M = malade, T+ = test positif. Données : \$P(T+ | M) = 0{,}95\$, \$P(T+ | \\bar M) = 0{,}04\$, \$P(M) = 0{,}01\$.",
                ),
                _step(
                  "Probabilités totales : \$P(T+) = P(T+|M) P(M) + P(T+|\\bar M) P(\\bar M) = 0{,}95 \\times 0{,}01 + 0{,}04 \\times 0{,}99 = 0{,}0095 + 0{,}0396 = 0{,}0491\$.",
                ),
                _step(
                  "Bayes : \$P(M | T+) = \\dfrac{P(T+ | M) P(M)}{P(T+)} = \\dfrac{0{,}0095}{0{,}0491} \\approx 0{,}194\$.",
                ),
                _step(
                  "**Résultat contre-intuitif** : avec un test positif, on n'a que **~19% de chance d'être réellement malade** ! Les faux positifs dominent à cause de la rareté de la maladie.",
                  tipFr:
                      "Cela motive le double-test (retest indépendant) ou des tests confirmatoires. Application en COVID, médecine prédictive, etc.",
                ),
              ], finalAnswerFr: r"$P(M | T+) \approx 19{,}4\%$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRandomVariables() => _paper(
      titleFr: 'Épreuve type — Variables aléatoires',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Variables aléatoires discrètes, loi de probabilité, espérance \$E(X) = \\sum x P(X=x)\$, variance, loi binomiale \$\\mathcal{B}(n, p)\$.",
      exercices: [
        _ex(
          1,
          'Loi de probabilité',
          5,
          "On lance un dé équilibré. Soit X = 'valeur du dé'.",
          [
            _q(
              1,
              "Donner la loi de probabilité de X.",
              1,
              _sol([
                _step(
                  "\$X\$ prend les valeurs 1, 2, 3, 4, 5, 6, chacune avec probabilité 1/6 (loi uniforme).",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer \$E(X)\$.",
              2,
              _sol([
                _step(
                  "\$E(X) = \\sum_{k=1}^6 k \\cdot P(X=k) = (1 + 2 + 3 + 4 + 5 + 6)/6 = 21/6 = 3{,}5\$.",
                ),
                _step(
                  "**Interprétation** : sur un grand nombre de lancers, la moyenne tend vers 3,5. Pas une valeur du dé (les dés ne donnent que des entiers), mais une moyenne théorique.",
                ),
              ], finalAnswerFr: r"$E(X) = 3{,}5$"),
            ),
            _q(
              3,
              "Calculer \$V(X)\$ et l'écart-type \$\\sigma\$.",
              2,
              _sol([
                _step(
                  "**Formule de König** : \$V(X) = E(X^2) - (E(X))^2\$.",
                ),
                _step(
                  "\$E(X^2) = \\sum k^2 / 6 = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6 \\approx 15{,}17\$.",
                ),
                _step(
                  "\$V(X) = 91/6 - (7/2)^2 = 91/6 - 49/4 = 182/12 - 147/12 = 35/12 \\approx 2{,}92\$.",
                ),
                _step(
                  "\$\\sigma = \\sqrt{V} \\approx 1{,}71\$. Mesure la dispersion typique autour de la moyenne 3,5.",
                ),
              ], finalAnswerFr: r"$V \approx 2{,}92$, $\sigma \approx 1{,}71$"),
            ),
          ],
        ),
        _ex(
          2,
          'Loi binomiale',
          5,
          "Un examen comporte 20 QCM, chacune avec 4 réponses dont 1 correcte. Un candidat répond au hasard. Soit X = nombre de bonnes réponses.",
          [
            _q(
              1,
              "Justifier que \$X \\sim \\mathcal{B}(n, p)\$ et préciser \$n, p\$.",
              2,
              _sol([
                _step(
                  "**Schéma de Bernoulli** : \$n = 20\$ essais indépendants (questions), chacune à 2 issues (succès = bonne réponse, \$p = 1/4\$), \$X\$ = nombre de succès.",
                ),
                _step(
                  "Conditions binomiale ✓ : \$X \\sim \\mathcal{B}(20, 1/4)\$.",
                ),
              ], finalAnswerFr: r"$X \sim \mathcal{B}(20, 1/4)$"),
            ),
            _q(
              2,
              "Calculer \$E(X)\$ et \$V(X)\$.",
              2,
              _sol([
                _step(
                  "**Binomiale** : \$E(X) = np\$, \$V(X) = np(1-p)\$.",
                ),
                _step(
                  "\$E(X) = 20 \\times 1/4 = 5\$. \$V(X) = 20 \\times 1/4 \\times 3/4 = 15/4 = 3{,}75\$. \$\\sigma \\approx 1{,}94\$.",
                ),
                _step(
                  "**Interprétation** : en répondant au hasard, on obtient en moyenne 5/20 = 25% (cohérent avec 1 chance sur 4). Variance modeste → la plupart des candidats au hasard obtiennent entre 3 et 7.",
                ),
              ], finalAnswerFr: r"$E = 5$, $V = 3{,}75$"),
            ),
            _q(
              3,
              "Probabilité d'avoir exactement 10 bonnes réponses.",
              1,
              _sol([
                _step(
                  "\$P(X = 10) = \\binom{20}{10} (1/4)^{10} (3/4)^{10}\$.",
                ),
                _step(
                  "\$\\binom{20}{10} = 184756\$. \$(1/4)^{10} = 9{,}54 \\times 10^{-7}\$. \$(3/4)^{10} \\approx 0{,}056\$.",
                ),
                _step(
                  "Produit : \$P(X = 10) \\approx 184756 \\times 9{,}54 \\times 10^{-7} \\times 0{,}056 \\approx 0{,}0099 \\approx 1\\%\$.",
                ),
              ], finalAnswerFr: r"$P(X = 10) \approx 1\%$"),
            ),
          ],
        ),
        _ex(
          3,
          'Espérance d\'un jeu',
          5,
          "À un jeu, on gagne 10€ avec proba 0,1 ; on gagne 2€ avec proba 0,4 ; on perd 3€ avec proba 0,5.",
          [
            _q(
              1,
              "Calculer le gain espéré par partie.",
              3,
              _sol([
                _step(
                  "Soit \$X\$ le gain (positif ou négatif). \$E(X) = 10 \\times 0{,}1 + 2 \\times 0{,}4 + (-3) \\times 0{,}5\$.",
                ),
                _step(
                  "\$E(X) = 1 + 0{,}8 - 1{,}5 = 0{,}3\\,€\$.",
                ),
                _step(
                  "Le jeu est **favorable** (espérance positive). Sur le long terme, on gagne en moyenne 30 centimes par partie.",
                ),
              ], finalAnswerFr: r"$E(X) = 0{,}30$ €"),
            ),
            _q(
              2,
              "Quel doit être le coût d'entrée pour un jeu équitable ?",
              2,
              _sol([
                _step(
                  "**Jeu équitable** : espérance du gain net (gain - coût) = 0.",
                ),
                _step(
                  "Si coût d'entrée = \$c\$, espérance nette = \$0{,}3 - c = 0\\,\\Rightarrow\\, c = 0{,}30\\,€\$.",
                ),
                _step(
                  "En pratique, les casinos fixent un coût supérieur (jeu défavorable au joueur) — c'est leur marge. Pour ce jeu : coût > 0,30€ avantage le casino.",
                ),
              ], finalAnswerFr: r"$c = 0{,}30$ €"),
            ),
          ],
        ),
        _ex(
          4,
          'Loi de Bernoulli et somme',
          5,
          "Soit \$X_1, X_2, \\ldots, X_n\$ des variables aléatoires de Bernoulli indépendantes de paramètre \$p\$.",
          [
            _q(
              1,
              "Que vaut \$S = X_1 + X_2 + \\dots + X_n\$ en termes de loi ?",
              3,
              _sol([
                _step(
                  "Chaque \$X_i\$ vaut 0 ou 1 avec \$P(X_i = 1) = p\$. La somme \$S = \\sum X_i\$ compte le nombre de '1' parmi les \$n\$.",
                ),
                _step(
                  "C'est **exactement la définition d'une loi binomiale** : \$S \\sim \\mathcal{B}(n, p)\$.",
                ),
                _step(
                  "Cette décomposition donne immédiatement : \$E(S) = \\sum E(X_i) = np\$, \$V(S) = \\sum V(X_i) = np(1-p)\$ (linéarité de l'espérance, additivité de la variance pour des v.a. indépendantes).",
                  tipFr:
                      "La binomiale est 'la somme de \\(n\\) Bernoulli'. Permet de prouver les formules d'espérance et variance sans calcul direct.",
                ),
              ], finalAnswerFr: r"$S \sim \mathcal{B}(n, p)$"),
            ),
            _q(
              2,
              "Application : si on tire 50 cartes avec remise dans un jeu de 52, espérance du nombre d'as obtenus ?",
              2,
              _sol([
                _step(
                  "Chaque tirage est une expérience de Bernoulli avec \$p = 4/52 = 1/13\$ (4 as sur 52 cartes).",
                ),
                _step(
                  "Nombre d'as = somme de 50 Bernoulli → \$\\mathcal{B}(50, 1/13)\$. Espérance : \$np = 50/13 \\approx 3{,}85\$.",
                ),
              ], finalAnswerFr: r"$E \approx 3{,}85$ as"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexBasicsSmb() => _paper(
      titleFr: 'Épreuve type — Nombres complexes (bases)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Forme algébrique, module, conjugué, opérations, équations dans \$\\mathbb{C}\$.",
      exercices: [
        _ex(
          1,
          'Opérations algébriques',
          5,
          "Soit \$z_1 = 2 + 3i\$ et \$z_2 = 1 - i\$.",
          [
            _q(
              1,
              "Calculer \$z_1 + z_2\$, \$z_1 z_2\$, \$z_1/z_2\$.",
              4,
              _sol([
                _step(
                  "**Somme** : \$z_1 + z_2 = (2 + 1) + (3 - 1)i = 3 + 2i\$.",
                ),
                _step(
                  "**Produit** : \$(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i\$.",
                ),
                _step(
                  "**Quotient** (multiplier par conjugué) : \$\\dfrac{2+3i}{1-i} = \\dfrac{(2+3i)(1+i)}{(1-i)(1+i)} = \\dfrac{2 + 2i + 3i + 3i^2}{1+1} = \\dfrac{-1 + 5i}{2} = -1/2 + 5i/2\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$z_1+z_2 = 3+2i$, $z_1 z_2 = 5+i$, $z_1/z_2 = -1/2 + 5i/2$"),
            ),
            _q(
              2,
              "Calculer \$|z_1|\$ et \$|z_2|\$.",
              1,
              _sol([
                _step(
                  "\$|z_1| = \\sqrt{4 + 9} = \\sqrt{13}\$. \$|z_2| = \\sqrt{1 + 1} = \\sqrt 2\$.",
                ),
              ], finalAnswerFr: r"$|z_1| = \sqrt{13}$, $|z_2| = \sqrt 2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Conjugué',
          5,
          "Propriétés du conjugué \$\\bar z\$.",
          [
            _q(
              1,
              "Calculer \$z + \\bar z\$ et \$z - \\bar z\$ pour \$z = a + bi\$.",
              2,
              _sol([
                _step(
                  "\$\\bar z = a - bi\$. Donc \$z + \\bar z = 2a = 2 \\text{Re}(z)\$. \$z - \\bar z = 2bi = 2i \\text{Im}(z)\$.",
                ),
                _step(
                  "**Conséquence** : \$z \\in \\mathbb{R} \\iff z = \\bar z\$ ; \$z\$ imaginaire pur ssi \$z = -\\bar z\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer \$z \\bar z\$ pour \$z = a + bi\$.",
              2,
              _sol([
                _step(
                  "\$z \\bar z = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 + b^2 = |z|^2\$.",
                ),
                _step(
                  "**Propriété fondamentale** : \$z \\bar z = |z|^2\$ — toujours réel positif. C'est ce qui justifie le truc 'multiplier par le conjugué' pour rationaliser.",
                ),
              ], finalAnswerFr: r"$z \bar z = |z|^2$"),
            ),
            _q(
              3,
              "Pour \$z = 3 - 4i\$, calculer \$1/z\$ sous forme algébrique.",
              1,
              _sol([
                _step(
                  "\$1/z = \\bar z / (z \\bar z) = (3 + 4i)/(9 + 16) = (3 + 4i)/25 = 3/25 + 4i/25\$.",
                ),
              ], finalAnswerFr: r"$1/z = 3/25 + 4i/25$"),
            ),
          ],
        ),
        _ex(
          3,
          'Équation du second degré',
          5,
          "Résoudre dans \$\\mathbb{C}\$ : \$(E) : z^2 + 4z + 13 = 0\$.",
          [
            _q(
              1,
              "Calculer le discriminant.",
              1,
              _sol([
                _step(
                  "\$\\Delta = 16 - 52 = -36 < 0\$. Deux racines complexes conjuguées dans \$\\mathbb{C}\$.",
                ),
              ], finalAnswerFr: r"$\Delta = -36$"),
            ),
            _q(
              2,
              "Résoudre.",
              3,
              _sol([
                _step(
                  "\$\\sqrt\\Delta = \\pm 6i\$ (avec convention). Racines : \$z = (-4 \\pm 6i)/2 = -2 \\pm 3i\$.",
                ),
                _step(
                  "Donc \$S = \\{-2 + 3i,\\, -2 - 3i\\}\$ — racines conjuguées.",
                ),
              ], finalAnswerFr: r"$S = \{-2 \pm 3i\}$"),
            ),
            _q(
              3,
              "Vérifier par Viète : somme = -4, produit = 13.",
              1,
              _sol([
                _step(
                  "Somme : \$(-2+3i) + (-2-3i) = -4 = -b/a\$ ✓. Produit : \$(-2)^2 - (3i)^2 = 4 + 9 = 13 = c/a\$ ✓.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Argument',
          5,
          "Soit \$z = -1 + i\\sqrt 3\$.",
          [
            _q(
              1,
              "Calculer \$|z|\$.",
              1,
              _sol([
                _step(
                  "\$|z| = \\sqrt{1 + 3} = 2\$.",
                ),
              ], finalAnswerFr: r"$|z| = 2$"),
            ),
            _q(
              2,
              "Calculer \$\\arg(z)\$.",
              4,
              _sol([
                _step(
                  "\$\\cos\\theta = -1/2\$, \$\\sin\\theta = \\sqrt 3/2\$. Partie réelle < 0, partie imaginaire > 0 → \$z\$ dans le **2ème quadrant**.",
                ),
                _step(
                  "Cherchons \$\\theta\$ : \$\\sin\\theta = \\sqrt 3/2\$ pour \$\\theta = \\pi/3\$ ou \$\\theta = 2\\pi/3\$.",
                ),
                _step(
                  "\$\\cos(\\pi/3) = 1/2\$, \$\\cos(2\\pi/3) = -1/2\$. Le second convient.",
                ),
                _step(
                  "\$\\arg z = 2\\pi/3\$ (à \$2\\pi\\) près).",
                  tipFr:
                      "Vérifier les deux conditions (\$\\cos\\) ET \$\\sin\\)) pour identifier l'argument sans ambiguïté.",
                ),
              ], finalAnswerFr: r"$\arg z = 2\pi/3$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexTrig() => _paper(
      titleFr: 'Épreuve type — Forme trigonométrique et exponentielle',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Forme trigonométrique \$z = r(\\cos\\theta + i\\sin\\theta)\$, forme exponentielle \$z = re^{i\\theta}\$, formule de Moivre, racines n-ièmes.",
      exercices: [
        _ex(
          1,
          'Forme trigonométrique',
          5,
          "Mettre sous forme trigonométrique et exponentielle.",
          [
            _q(
              1,
              "\$z = 1 + i\$.",
              2,
              _sol([
                _step(
                  "\$|z| = \\sqrt 2\$. \$\\cos\\theta = 1/\\sqrt 2\$, \$\\sin\\theta = 1/\\sqrt 2\$, donc \$\\theta = \\pi/4\$.",
                ),
                _step(
                  "Forme trig : \$z = \\sqrt 2 (\\cos(\\pi/4) + i\\sin(\\pi/4))\$. Forme exp : \$z = \\sqrt 2\\, e^{i\\pi/4}\$.",
                ),
              ], finalAnswerFr: r"$z = \sqrt 2 e^{i\pi/4}$"),
            ),
            _q(
              2,
              "\$z = -2\$.",
              1,
              _sol([
                _step(
                  "\$|z| = 2\$. \$\\arg z = \\pi\$ (axe réel négatif). Donc \$z = 2 e^{i\\pi}\$.",
                ),
                _step(
                  "**Identité célèbre** : \$e^{i\\pi} = -1\$, ou \$e^{i\\pi} + 1 = 0\$ — la 'plus belle formule des maths' (Euler).",
                ),
              ], finalAnswerFr: r"$z = 2 e^{i\pi}$"),
            ),
            _q(
              3,
              "\$z = i\$.",
              1,
              _sol([
                _step(
                  "\$|z| = 1\$, \$\\arg z = \\pi/2\$. Donc \$z = e^{i\\pi/2}\$.",
                ),
                _step(
                  "Forme cohérente : \$i^2 = (e^{i\\pi/2})^2 = e^{i\\pi} = -1\$ ✓.",
                ),
              ], finalAnswerFr: r"$z = e^{i\pi/2}$"),
            ),
            _q(
              4,
              "\$z = -\\sqrt 3 + i\$.",
              1,
              _sol([
                _step(
                  "\$|z| = \\sqrt{3 + 1} = 2\$. Quadrant 2 (\$\\text{Re} < 0\$, \$\\text{Im} > 0\$).",
                ),
                _step(
                  "\$\\cos\\theta = -\\sqrt 3/2\$, \$\\sin\\theta = 1/2\$ → \$\\theta = 5\\pi/6\$.",
                ),
              ], finalAnswerFr: r"$z = 2 e^{i 5\pi/6}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Formule de Moivre',
          5,
          "Utiliser \$(e^{i\\theta})^n = e^{in\\theta}\$.",
          [
            _q(
              1,
              "Calculer \$(1 + i)^8\$.",
              3,
              _sol([
                _step(
                  "\$1 + i = \\sqrt 2 e^{i\\pi/4}\$. Donc \$(1+i)^8 = (\\sqrt 2)^8 \\cdot e^{i \\cdot 8\\pi/4} = 16 \\cdot e^{i 2\\pi} = 16 \\cdot 1 = 16\$.",
                ),
                _step(
                  "**Vérification** : \$(1+i)^2 = 2i\$. \$(2i)^4 = 16 i^4 = 16\$ ✓.",
                  tipFr:
                      "Pour des puissances élevées, la forme exponentielle est beaucoup plus rapide qu'un développement binomial.",
                ),
              ], finalAnswerFr: r"$(1+i)^8 = 16$"),
            ),
            _q(
              2,
              "Établir la formule du cosinus double : \$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta\$.",
              2,
              _sol([
                _step(
                  "\$e^{i 2\\theta} = (e^{i\\theta})^2 = (\\cos\\theta + i\\sin\\theta)^2 = \\cos^2\\theta + 2i\\sin\\theta\\cos\\theta - \\sin^2\\theta\$.",
                ),
                _step(
                  "Partie réelle : \$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta\$. Partie imaginaire : \$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\$.",
                  tipFr:
                      "Les identités trigonométriques classiques sont des conséquences directes de Moivre — pas besoin de les mémoriser séparément.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Racines n-ièmes',
          5,
          "Résoudre dans \$\\mathbb{C}\$ : \$z^3 = 1\$.",
          [
            _q(
              1,
              "Trouver les 3 racines cubiques de l'unité.",
              4,
              _sol([
                _step(
                  "1 = \$e^{i \\cdot 0}\$ (forme exp). Les racines cubiques satisfont \$z = r e^{i\\theta}\$ avec \$r^3 = 1\$ et \$3\\theta = 2k\\pi\$ pour \$k \\in \\mathbb{Z}\$.",
                ),
                _step(
                  "\$r = 1\$, \$\\theta = 2k\\pi/3\$. Pour \$k = 0, 1, 2\$ : \$\\theta = 0, 2\\pi/3, 4\\pi/3\$.",
                ),
                _step(
                  "Racines : \$z_0 = 1\$, \$z_1 = e^{i 2\\pi/3} = -1/2 + i\\sqrt 3/2\$, \$z_2 = e^{i 4\\pi/3} = -1/2 - i\\sqrt 3/2\$.",
                ),
                _step(
                  "**Géométriquement** : 3 sommets d'un triangle équilatéral inscrit dans le cercle unité, espacés de \$2\\pi/3\$.",
                  tipFr:
                      "Les \\(n\\) racines n-ièmes de l'unité forment un polygone régulier à \\(n\\) sommets, espacés de \\(2\\pi/n\\).",
                ),
              ],
                  finalAnswerFr:
                      r"$z = 1, -1/2 \pm i\sqrt 3/2$"),
            ),
            _q(
              2,
              "Somme et produit de ces racines.",
              1,
              _sol([
                _step(
                  "Somme = \$1 + (-1/2 + i\\sqrt 3/2) + (-1/2 - i\\sqrt 3/2) = 0\$.",
                ),
                _step(
                  "Produit = \$1 \\cdot (-1/2)^2 + (\\sqrt 3/2)^2 = ... \$. Plus simplement, c'est \$(-1)^3 / 1 = -1\$ par Viète sur \$z^3 - 1 = 0\$. Mais on a \$1 \\cdot z_1 \\cdot z_2 = z_1 z_2\$. Pour deux conjugués : \$z_1 z_2 = |z_1|^2 = 1\$. Total : \$1 \\cdot 1 = 1\$. Hmm — par Viète sur \$z^3 - 1 = 0\$ = \$(z-1)(z^2 + z + 1) = 0\$. Produit des 3 racines = 1 (cstte / coeff dominant) = 1. Cohérent.",
                ),
                _step(
                  "Donc somme = 0, produit = 1.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Linéarisation',
          5,
          "Linéariser \$\\cos^3\\theta\$ (exprimer en fonction de \$\\cos\$ d'angles multiples).",
          [
            _q(
              1,
              "Effectuer la linéarisation.",
              5,
              _sol([
                _step(
                  "**Formules d'Euler** : \$\\cos\\theta = (e^{i\\theta} + e^{-i\\theta})/2\$.",
                ),
                _step(
                  "Cube : \$\\cos^3\\theta = \\dfrac{(e^{i\\theta} + e^{-i\\theta})^3}{8}\$.",
                ),
                _step(
                  "Développer le cube : \$(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3\$. Avec \$a = e^{i\\theta}, b = e^{-i\\theta}\$ : \$a^3 = e^{i 3\\theta}\$, \$b^3 = e^{-i 3\\theta}\$, \$a^2 b = e^{i\\theta}\$, \$ab^2 = e^{-i\\theta}\$.",
                ),
                _step(
                  "Somme : \$e^{i 3\\theta} + 3 e^{i\\theta} + 3 e^{-i\\theta} + e^{-i 3\\theta} = 2\\cos(3\\theta) + 6\\cos\\theta\$.",
                ),
                _step(
                  "Donc \$\\cos^3\\theta = \\dfrac{2\\cos(3\\theta) + 6\\cos\\theta}{8} = \\dfrac{\\cos(3\\theta)}{4} + \\dfrac{3\\cos\\theta}{4}\$.",
                  tipFr:
                      "La linéarisation transforme une puissance de sin/cos en somme d'angles multiples — utile pour intégrer.",
                ),
              ],
                  finalAnswerFr:
                      r"$\cos^3\theta = \dfrac{\cos(3\theta) + 3\cos\theta}{4}$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexGeometry() => _paper(
      titleFr: 'Épreuve type — Complexes et géométrie',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Affixes, distances \$|z_B - z_A|\$, arguments \$\\arg(z_B - z_A)\$, transformations (translation, rotation, homothétie).",
      exercices: [
        _ex(
          1,
          'Distances et triangles',
          5,
          "Dans le plan complexe : \$A\$ d'affixe \$z_A = 1\$, \$B\$ d'affixe \$z_B = 1 + 2i\$, \$C\$ d'affixe \$z_C = 3\$.",
          [
            _q(
              1,
              "Calculer \$AB\$, \$BC\$, \$CA\$.",
              3,
              _sol([
                _step(
                  "\$AB = |z_B - z_A| = |2i| = 2\$.",
                ),
                _step(
                  "\$BC = |z_C - z_B| = |2 - 2i| = \\sqrt{4 + 4} = 2\\sqrt 2\$.",
                ),
                _step(
                  "\$CA = |z_A - z_C| = |-2| = 2\$.",
                ),
              ], finalAnswerFr: r"$AB = 2$, $BC = 2\sqrt 2$, $CA = 2$"),
            ),
            _q(
              2,
              "Nature du triangle \$ABC\$ ?",
              2,
              _sol([
                _step(
                  "\$AB = CA = 2\$ → triangle **isocèle** en \$A\$.",
                ),
                _step(
                  "Test Pythagore : \$AB^2 + CA^2 = 4 + 4 = 8 = BC^2\$ ✓. Triangle **rectangle isocèle** en \$A\$.",
                  tipFr:
                      "Calculer toutes les longueurs et tester Pythagore donne en général la nature exacte (isocèle, équilatéral, rectangle, rectangle isocèle...).",
                ),
              ], finalAnswerFr: r"Rectangle isocèle en $A$"),
            ),
          ],
        ),
        _ex(
          2,
          'Angles entre vecteurs',
          5,
          "On considère \$A(1)\$, \$B(1+i)\$, \$C(2+i)\$.",
          [
            _q(
              1,
              "Calculer \$\\arg\\left(\\dfrac{z_C - z_B}{z_A - z_B}\\right)\$ et interpréter.",
              4,
              _sol([
                _step(
                  "\$z_C - z_B = (2 + i) - (1 + i) = 1\$. \$z_A - z_B = 1 - (1 + i) = -i\$.",
                ),
                _step(
                  "Rapport : \$\\dfrac{1}{-i} = \\dfrac{i}{-i \\cdot i} = \\dfrac{i}{1} = i\$.",
                ),
                _step(
                  "\$\\arg(i) = \\pi/2\$.",
                ),
                _step(
                  "**Interprétation géométrique** : c'est l'angle orienté \\(\\widehat{BA, BC}\\) — l'angle au sommet B du triangle. Ici \$\\pi/2\$ → triangle **rectangle en B**.",
                  tipFr:
                      "Formule \\(\\widehat{(\\vec{BA}, \\vec{BC})} = \\arg\\left(\\dfrac{z_C - z_B}{z_A - z_B}\\right)\\) — outil puissant pour calculer des angles via les complexes.",
                ),
              ], finalAnswerFr: r"Angle = $\pi/2$ (rectangle en B)"),
            ),
            _q(
              2,
              "Le quotient \$\\dfrac{z_C - z_B}{z_A - z_B}\$ donne aussi le rapport \$\\dfrac{BC}{BA}\$. Vérifier.",
              1,
              _sol([
                _step(
                  "\$|z_C - z_B|/|z_A - z_B| = 1/1 = 1\$ ✓. Et |module du quotient| = |1/-i| = 1 ✓.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Transformations',
          5,
          "Identifier les transformations associées à diverses opérations sur \$z\$.",
          [
            _q(
              1,
              "\$z \\mapsto z + (3 + 2i)\$ : quelle transformation ?",
              1,
              _sol([
                _step(
                  "**Translation** de vecteur d'affixe \$3 + 2i\$, c'est-à-dire \$\\vec u = (3, 2)\$.",
                ),
              ], finalAnswerFr: r"Translation de $(3, 2)$"),
            ),
            _q(
              2,
              "\$z \\mapsto i z\$ : quelle transformation ?",
              2,
              _sol([
                _step(
                  "Multiplier par \$i = e^{i\\pi/2}\$ → **rotation d'angle \$\\pi/2\$** (et centre origine).",
                ),
                _step(
                  "Vérification : appliqué à 1, donne \$i\$ — point (1,0) devient (0,1). Rotation de 90° dans le sens trigo.",
                ),
              ], finalAnswerFr: r"Rotation d'angle $\pi/2$ (centre O)"),
            ),
            _q(
              3,
              "\$z \\mapsto 2 z\$ : quelle transformation ?",
              1,
              _sol([
                _step(
                  "Multiplier par 2 (réel positif) → **homothétie de rapport 2** (centre origine). Les distances sont doublées, les directions préservées.",
                ),
              ], finalAnswerFr: r"Homothétie de rapport 2"),
            ),
            _q(
              4,
              "\$z \\mapsto 2 e^{i\\pi/3} z\$ : quelle transformation ?",
              1,
              _sol([
                _step(
                  "**Similitude directe** : rotation d'angle \$\\pi/3\$ ET homothétie de rapport 2 (centre origine). Combinaison des deux précédentes.",
                ),
              ], finalAnswerFr: r"Similitude (rot $\pi/3$ + homothétie ×2)"),
            ),
          ],
        ),
        _ex(
          4,
          'Lieu géométrique',
          5,
          "Trouver l'ensemble des points \$M\$ d'affixe \$z\$ tels que \$|z - 1| = |z + i|\$.",
          [
            _q(
              1,
              "Interpréter géométriquement et trouver l'ensemble.",
              5,
              _sol([
                _step(
                  "\$|z - 1|\$ = distance de \$M\$ au point \$A\$ d'affixe 1. \$|z + i| = |z - (-i)|\$ = distance à \$B\$ d'affixe \$-i\$.",
                ),
                _step(
                  "Équation \$MA = MB\$ caractérise la **médiatrice du segment [AB]**.",
                ),
                _step(
                  "Trouver son équation : posons \$z = x + iy\$. \$|x + iy - 1| = |x + iy + i| \\iff (x-1)^2 + y^2 = x^2 + (y+1)^2\$.",
                ),
                _step(
                  "Développer : \$x^2 - 2x + 1 + y^2 = x^2 + y^2 + 2y + 1 \\iff -2x = 2y \\iff y = -x\$.",
                ),
                _step(
                  "**Conclusion** : la médiatrice est la droite \$y = -x\$ (passe par l'origine, perpendiculaire au segment de A(1, 0) à B(0, -1)).",
                  tipFr:
                      "Toujours convertir une équation complexe en équations cartésiennes (x, y) pour identifier les lieux géométriques (droite, cercle, etc.).",
                ),
              ], finalAnswerFr: r"Médiatrice : droite $y = -x$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperOdeFirstOrderSmb() => _paper(
      titleFr: 'Épreuve type — EDO du 1er ordre',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Équations du type \$y' = ay\$, \$y' = ay + b\$, applications à la désintégration, la charge de condensateur, le refroidissement.",
      exercices: [
        _ex(
          1,
          'Résolution de référence',
          5,
          "Soit \$(E_1) : y' = 3y\$.",
          [
            _q(
              1,
              "Donner la solution générale.",
              2,
              _sol([
                _step(
                  "**Théorème** : \$y' = ay\$ admet pour solution générale \$y(x) = C e^{ax}\$, \$C \\in \\mathbb{R}\$.",
                ),
                _step(
                  "Ici \$a = 3\$ : \$y(x) = C e^{3x}\$.",
                ),
              ], finalAnswerFr: r"$y(x) = C e^{3x}$"),
            ),
            _q(
              2,
              "Solution vérifiant \$y(0) = 2\$.",
              2,
              _sol([
                _step(
                  "\$y(0) = C = 2\$. Donc \$y(x) = 2 e^{3x}\$.",
                ),
              ], finalAnswerFr: r"$y(x) = 2 e^{3x}$"),
            ),
            _q(
              3,
              "À quel instant \$y\$ atteindra 100 ?",
              1,
              _sol([
                _step(
                  "\$2 e^{3x} = 100 \\iff e^{3x} = 50 \\iff x = \\ln(50)/3 \\approx 1{,}30\$.",
                ),
              ], finalAnswerFr: r"$x \approx 1{,}30$"),
            ),
          ],
        ),
        _ex(
          2,
          'EDO avec second membre',
          5,
          "Soit \$(E_2) : y' = -2y + 10\$.",
          [
            _q(
              1,
              "Trouver une solution particulière constante.",
              1,
              _sol([
                _step(
                  "\$y_p\$ constante → \$y_p' = 0\$. \$0 = -2 y_p + 10 \\iff y_p = 5\$.",
                ),
              ], finalAnswerFr: r"$y_p = 5$"),
            ),
            _q(
              2,
              "Solution générale de l'équation homogène \$y' = -2y\$.",
              1,
              _sol([
                _step(
                  "\$y_h = C e^{-2x}\$.",
                ),
              ], finalAnswerFr: r"$y_h = C e^{-2x}$"),
            ),
            _q(
              3,
              "Solution générale de \$(E_2)\$, puis solution vérifiant \$y(0) = 8\$.",
              3,
              _sol([
                _step(
                  "**Principe de superposition** : \$y = y_h + y_p = C e^{-2x} + 5\$.",
                ),
                _step(
                  "\$y(0) = C + 5 = 8 \\Rightarrow C = 3\$. Solution : \$y(x) = 3 e^{-2x} + 5\$.",
                ),
                _step(
                  "**Comportement** : \$\\lim_{+\\infty} y = 5\$ (convergence vers l'équilibre). \$y = 5\$ est attractif.",
                ),
              ], finalAnswerFr: r"$y(x) = 3 e^{-2x} + 5$"),
            ),
          ],
        ),
        _ex(
          3,
          'Application — refroidissement (loi de Newton)',
          5,
          "Un café à 80°C est laissé dans une pièce à 20°C. La température \$T(t)\$ vérifie l'EDO : \$T'(t) = -k(T - T_{\\text{amb}})\$ avec \$T_{\\text{amb}} = 20\$°C et \$k > 0\$.",
          [
            _q(
              1,
              "Résoudre l'EDO avec \$T(0) = 80\$.",
              3,
              _sol([
                _step(
                  "Poser \$\\theta = T - 20\$. Alors \$\\theta' = T' = -k(T - 20) = -k\\theta\$ → \$\\theta' = -k\\theta\$.",
                ),
                _step(
                  "Solution : \$\\theta(t) = C e^{-kt}\$. CI : \$\\theta(0) = T(0) - 20 = 60 = C\$. Donc \$\\theta(t) = 60 e^{-kt}\$.",
                ),
                _step(
                  "Retour à T : \$T(t) = 20 + 60 e^{-kt}\$.",
                ),
              ], finalAnswerFr: r"$T(t) = 20 + 60 e^{-kt}$"),
            ),
            _q(
              2,
              "Si après 5 minutes le café est à 50°C, calculer \$k\$.",
              2,
              _sol([
                _step(
                  "\$T(5) = 50 \\iff 20 + 60 e^{-5k} = 50 \\iff e^{-5k} = 1/2 \\iff k = \\ln 2/5 \\approx 0{,}139\\,\\text{min}^{-1}\$.",
                ),
                _step(
                  "**Demi-vie thermique** : \$t_{1/2} = \\ln 2/k = 5\\,\\text{min}\$. La température excédentaire (au-dessus de 20°C) est divisée par 2 toutes les 5 minutes.",
                  tipFr:
                      "Loi de Newton du refroidissement : structure identique à la désintégration radioactive (cinétique d'ordre 1).",
                ),
              ], finalAnswerFr: r"$k \approx 0{,}139$ /min"),
            ),
          ],
        ),
        _ex(
          4,
          'Modèle d\'évolution démographique',
          5,
          "La population \$P(t)\$ d'une ville évolue selon \$P'(t) = 0{,}02 P(t)\$ (croissance de 2% par an).",
          [
            _q(
              1,
              "Si \$P(0) = 100\\,000\$, donner \$P(t)\$.",
              2,
              _sol([
                _step(
                  "Solution : \$P(t) = 100000 \\times e^{0{,}02 t}\$.",
                ),
              ], finalAnswerFr: r"$P(t) = 100000 e^{0{,}02 t}$"),
            ),
            _q(
              2,
              "Calculer \$P(10)\$, \$P(50)\$.",
              2,
              _sol([
                _step(
                  "\$P(10) = 100000 \\times e^{0{,}2} \\approx 122140\$.",
                ),
                _step(
                  "\$P(50) = 100000 \\times e^1 \\approx 271828\$. La population a presque triplé en 50 ans.",
                ),
              ]),
            ),
            _q(
              3,
              "En combien d'années la population aura-t-elle doublé ?",
              1,
              _sol([
                _step(
                  "\$e^{0{,}02 t} = 2 \\iff t = \\ln 2/0{,}02 \\approx 34{,}66\\,\\text{ans}\$.",
                ),
                _step(
                  "**Règle de 72** : doublement \\approx \\(72/(\\text{taux \\%}) = 72/2 = 36\\) ans — proche de 34,66.",
                ),
              ], finalAnswerFr: r"$t \approx 35$ ans"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperOdeSecondOrder() => _paper(
      titleFr: 'Épreuve type — EDO du 2nd ordre (oscillateurs)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Équation \$y'' + \\omega^2 y = 0\$ (oscillateur harmonique), solutions sinusoïdales, applications mécanique et électricité.",
      exercices: [
        _ex(
          1,
          'Résolution de référence',
          5,
          "Soit \$(E) : y'' + 4y = 0\$.",
          [
            _q(
              1,
              "Identifier la pulsation et donner la solution générale.",
              2,
              _sol([
                _step(
                  "Forme \$y'' + \\omega^2 y = 0\$ avec \$\\omega^2 = 4\$, donc \$\\omega = 2\\,\\text{rad/s}\$.",
                ),
                _step(
                  "**Solution générale** : \$y(t) = A\\cos(2t) + B\\sin(2t)\$ pour \$A, B \\in \\mathbb{R}\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$y(t) = A\cos(2t) + B\sin(2t)$"),
            ),
            _q(
              2,
              "Donner la solution avec \$y(0) = 3\$ et \$y'(0) = 0\$.",
              3,
              _sol([
                _step(
                  "\$y(0) = A\\cos 0 + B\\sin 0 = A = 3\$. Donc \$A = 3\$.",
                ),
                _step(
                  "\$y'(t) = -2A\\sin(2t) + 2B\\cos(2t)\$. \$y'(0) = 2B = 0 \\Rightarrow B = 0\$.",
                ),
                _step(
                  "Solution : \$y(t) = 3\\cos(2t)\$. Oscillation pure, amplitude 3, période \$T = 2\\pi/\\omega = \\pi\$ s.",
                ),
              ], finalAnswerFr: r"$y(t) = 3\cos(2t)$, $T = \pi$ s"),
            ),
          ],
        ),
        _ex(
          2,
          'Pendule simple — petites oscillations',
          5,
          "Un pendule de longueur \$L\$ : \$\\theta'' + (g/L)\\theta = 0\$ (petites oscillations).",
          [
            _q(
              1,
              "Donner la pulsation propre et la période.",
              2,
              _sol([
                _step(
                  "Identification : \$\\omega_0^2 = g/L \\Rightarrow \\omega_0 = \\sqrt{g/L}\$.",
                ),
                _step(
                  "Période : \$T_0 = 2\\pi/\\omega_0 = 2\\pi\\sqrt{L/g}\$.",
                ),
              ], finalAnswerFr: r"$T_0 = 2\pi\sqrt{L/g}$"),
            ),
            _q(
              2,
              "Pour un pendule de 1 m sur Terre (\$g = 9{,}81\$), calculer \$T_0\$.",
              1,
              _sol([
                _step(
                  "\$T_0 = 2\\pi\\sqrt{1/9{,}81} \\approx 2\\pi \\times 0{,}319 \\approx 2{,}006\\,s\$. Soit environ 2 secondes — la 'seconde de pendule' historique correspond à \\(L \\approx 1\\) m.",
                ),
              ], finalAnswerFr: r"$T_0 \approx 2$ s"),
            ),
            _q(
              3,
              "Sur la Lune (\$g \\approx 1{,}62\$), recalculer \$T_0\$.",
              2,
              _sol([
                _step(
                  "\$T_{Lune}/T_{Terre} = \\sqrt{g_{Terre}/g_{Lune}} = \\sqrt{9{,}81/1{,}62} \\approx 2{,}46\$.",
                ),
                _step(
                  "\$T_{Lune} \\approx 2 \\times 2{,}46 \\approx 4{,}9\\,s\$. Pendule beaucoup plus lent.",
                ),
              ], finalAnswerFr: r"$T_{Lune} \approx 4{,}9$ s"),
            ),
          ],
        ),
        _ex(
          3,
          'Forme \$A\\cos(\\omega t + \\varphi)\$',
          5,
          "On a \$y(t) = 3\\cos(2t) + 4\\sin(2t)\$.",
          [
            _q(
              1,
              "Écrire \$y\$ sous la forme \$R\\cos(\\omega t + \\varphi)\$.",
              4,
              _sol([
                _step(
                  "**Identité** : \$A\\cos\\theta + B\\sin\\theta = R\\cos(\\theta - \\varphi)\$ avec \$R = \\sqrt{A^2 + B^2}\$ et \$\\tan\\varphi = B/A\$.",
                ),
                _step(
                  "Application : \$R = \\sqrt{9 + 16} = 5\$.",
                ),
                _step(
                  "\$\\tan\\varphi = 4/3\$, et \$\\cos\\varphi = 3/5 > 0\$, \$\\sin\\varphi = 4/5 > 0\$ → \$\\varphi \\approx 0{,}927\\,rad\\) (≈ 53°).",
                ),
                _step(
                  "Donc \$y(t) = 5\\cos(2t - 0{,}927)\$. Amplitude 5, phase 0,927 rad.",
                  tipFr:
                      "Cette forme amplitude-phase est très utile pour identifier amplitude et déphasage d'un signal.",
                ),
              ],
                  finalAnswerFr:
                      r"$y(t) = 5\cos(2t - 0{,}927)$"),
            ),
          ],
        ),
        _ex(
          4,
          'Circuit LC',
          5,
          "Dans un circuit LC sans résistance, la charge \$q(t)\$ vérifie \$L q'' + q/C = 0\$.",
          [
            _q(
              1,
              "Identifier la pulsation propre \$\\omega_0\$.",
              2,
              _sol([
                _step(
                  "Réécriture : \$q'' + q/(LC) = 0\$. Forme \$y'' + \\omega^2 y = 0\$ avec \$\\omega^2 = 1/(LC)\$.",
                ),
                _step(
                  "\$\\omega_0 = 1/\\sqrt{LC}\$. Période : \$T_0 = 2\\pi\\sqrt{LC}\$.",
                ),
              ], finalAnswerFr: r"$\omega_0 = 1/\sqrt{LC}$"),
            ),
            _q(
              2,
              "Pour \$L = 10\\,mH\$, \$C = 100\\,\\mu F\$ : calculer \$T_0\$.",
              2,
              _sol([
                _step(
                  "\$LC = 10^{-2} \\times 10^{-4} = 10^{-6}\$. \$\\sqrt{LC} = 10^{-3}\\,s\$.",
                ),
                _step(
                  "\$T_0 = 2\\pi \\times 10^{-3} \\approx 6{,}28\\,ms\$. Fréquence : \$f_0 = 1/T_0 \\approx 159\\,Hz\$.",
                ),
              ], finalAnswerFr: r"$T_0 \approx 6{,}28$ ms"),
            ),
            _q(
              3,
              "Énergie : conservation entre les formes électrique et magnétique.",
              1,
              _sol([
                _step(
                  "À chaque instant, \$E_C(t) + E_L(t) = E_0\$ (constante). Énergie oscille entre le condensateur (\$E_C = q^2/(2C)\$) et la bobine (\$E_L = Li^2/2\$).",
                ),
                _step(
                  "Analogue parfait du pendule sans frottement : énergie potentielle (gravitationnelle) ↔ énergie cinétique.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperKinematics() => _paper(
      titleFr: 'Épreuve type — Cinématique',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Position, vitesse, accélération. MRU, MRUA, équations horaires, application à la chute libre.",
      exercices: [
        _ex(
          1,
          'Vitesse et accélération',
          5,
          "Un mobile a pour position \$x(t) = 2 t^3 - 9 t^2 + 12 t + 1\$ (en mètres, t en secondes).",
          [
            _q(
              1,
              "Calculer la vitesse \$v(t)\$ et l'accélération \$a(t)\$.",
              3,
              _sol([
                _step(
                  "**Vitesse** = dérivée de la position : \$v(t) = x'(t) = 6 t^2 - 18 t + 12 = 6(t^2 - 3t + 2) = 6(t-1)(t-2)\$ m/s.",
                ),
                _step(
                  "**Accélération** = dérivée de la vitesse : \$a(t) = v'(t) = 12 t - 18 = 6(2t - 3)\$ m/s².",
                ),
              ],
                  finalAnswerFr:
                      r"$v = 6(t-1)(t-2)$, $a = 6(2t-3)$"),
            ),
            _q(
              2,
              "À quels instants le mobile est-il à l'arrêt ?",
              2,
              _sol([
                _step(
                  "\$v(t) = 0 \\iff t = 1\$ ou \$t = 2\$ secondes.",
                ),
                _step(
                  "Entre 0 et 1 : \$v > 0\$ → mouvement progressif. Entre 1 et 2 : \$v < 0\$ → mouvement rétrograde. Après 2 s : \$v > 0\$ à nouveau.",
                ),
              ], finalAnswerFr: r"$t = 1$ s et $t = 2$ s"),
            ),
          ],
        ),
        _ex(
          2,
          'MRUA — chute libre',
          5,
          "On lâche une pierre du haut d'une falaise (sans vitesse initiale). Elle touche le sol après 4 s. \$g = 9{,}8\\,m/s^2\$.",
          [
            _q(
              1,
              "Quelle est la hauteur de la falaise ?",
              2,
              _sol([
                _step(
                  "**MRUA** : \$h = (1/2) g t^2 = 0{,}5 \\times 9{,}8 \\times 16 = 78{,}4\\,m\$.",
                ),
              ], finalAnswerFr: r"$h = 78{,}4$ m"),
            ),
            _q(
              2,
              "Quelle est la vitesse de la pierre à l'impact ?",
              2,
              _sol([
                _step(
                  "\$v = g t = 9{,}8 \\times 4 = 39{,}2\\,m/s\$. Soit \$\\approx 141\\,km/h\$ — très rapide !",
                ),
                _step(
                  "**Vérification énergétique** : \$mgh = (1/2)mv^2\$ → \$v = \\sqrt{2 g h} = \\sqrt{2 \\times 9{,}8 \\times 78{,}4} = \\sqrt{1537} \\approx 39{,}2\\,m/s\$ ✓.",
                ),
              ], finalAnswerFr: r"$v \approx 39{,}2$ m/s"),
            ),
            _q(
              3,
              "Quelle distance a-t-elle parcourue durant la 3ème seconde ?",
              1,
              _sol([
                _step(
                  "Distance entre \$t = 2\$ et \$t = 3\$ : \$\\Delta h = (1/2) g (3^2 - 2^2) = 0{,}5 \\times 9{,}8 \\times 5 = 24{,}5\\,m\$.",
                ),
                _step(
                  "**Remarque** : pendant la 1ère seconde elle parcourt 4,9 m, la 2ème 14,7 m, la 3ème 24,5 m — distances croissantes selon les nombres impairs (1, 3, 5, 7...) × 4,9.",
                ),
              ], finalAnswerFr: r"$\Delta h = 24{,}5$ m"),
            ),
          ],
        ),
        _ex(
          3,
          'Démarrage et freinage',
          5,
          "Une voiture démarre du repos avec accélération constante \$a_1 = 3\\,m/s^2\$ pendant 8 s. Elle roule ensuite à vitesse constante 10 s. Puis freine avec décélération \$a_2 = -4\\,m/s^2\$ jusqu'à l'arrêt.",
          [
            _q(
              1,
              "Vitesse maximale atteinte ?",
              1,
              _sol([
                _step(
                  "Phase 1 : \$v = a_1 t = 3 \\times 8 = 24\\,m/s = 86{,}4\\,km/h\$.",
                ),
              ], finalAnswerFr: r"$v_{\max} = 24$ m/s"),
            ),
            _q(
              2,
              "Distance parcourue durant la phase de freinage.",
              3,
              _sol([
                _step(
                  "Phase 3 : vitesse passe de 24 à 0 m/s avec \$a = -4\$. Durée : \$t_3 = -v_0/a = 24/4 = 6\\,s\$.",
                ),
                _step(
                  "Distance : \$d_3 = v_0 t + (1/2) a t^2 = 24 \\times 6 - 0{,}5 \\times 4 \\times 36 = 144 - 72 = 72\\,m\$.",
                ),
                _step(
                  "Vérification énergétique : \$v^2 - v_0^2 = 2 a d \\Rightarrow d = (0 - 576)/(-8) = 72\\,m\$ ✓.",
                ),
              ], finalAnswerFr: r"$d_3 = 72$ m"),
            ),
            _q(
              3,
              "Distance totale parcourue.",
              1,
              _sol([
                _step(
                  "Phase 1 : \$d_1 = (1/2) a_1 t_1^2 = 0{,}5 \\times 3 \\times 64 = 96\\,m\$.",
                ),
                _step(
                  "Phase 2 : \$d_2 = v t_2 = 24 \\times 10 = 240\\,m\$.",
                ),
                _step(
                  "Phase 3 : 72 m. **Total : 96 + 240 + 72 = 408 m**.",
                ),
              ], finalAnswerFr: r"$d_{tot} = 408$ m"),
            ),
          ],
        ),
        _ex(
          4,
          'Mouvement parabolique',
          5,
          "Un projectile est lancé avec \$v_0 = 25\\,m/s\$ à un angle \$\\alpha = 30°\$ au-dessus de l'horizontale.",
          [
            _q(
              1,
              "Calculer la portée \$x_p\$.",
              3,
              _sol([
                _step(
                  "Composantes : \$v_{0x} = v_0\\cos\\alpha = 25 \\times \\sqrt 3/2 \\approx 21{,}65\\,m/s\$ ; \$v_{0y} = v_0\\sin\\alpha = 12{,}5\\,m/s\$.",
                ),
                _step(
                  "Durée du vol : \$t_p = 2 v_{0y}/g = 25/9{,}81 \\approx 2{,}55\\,s\$.",
                ),
                _step(
                  "Portée : \$x_p = v_{0x} \\times t_p \\approx 21{,}65 \\times 2{,}55 \\approx 55{,}2\\,m\$.",
                ),
                _step(
                  "Formule : \$x_p = v_0^2 \\sin(2\\alpha)/g = 625 \\times \\sin 60°/9{,}81 = 625 \\times 0{,}866/9{,}81 \\approx 55{,}2\\,m\$ ✓.",
                ),
              ], finalAnswerFr: r"$x_p \approx 55{,}2$ m"),
            ),
            _q(
              2,
              "Hauteur maximale atteinte.",
              2,
              _sol([
                _step(
                  "Au sommet, \$v_y = 0\$. \$h_{\\max} = v_{0y}^2/(2g) = 156{,}25/19{,}62 \\approx 7{,}97\\,m\$.",
                ),
                _step(
                  "Formule : \$h_{\\max} = v_0^2\\sin^2\\alpha/(2g) = 625 \\times 0{,}25/19{,}62 \\approx 7{,}97\\,m\$ ✓.",
                ),
              ], finalAnswerFr: r"$h_{\max} \approx 8$ m"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperNewtonsLawsSmb() => _paper(
      titleFr: 'Épreuve type — Lois de Newton (SMB)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Trois lois de Newton, équilibre, frottements, plans inclinés, principe d'action-réaction.",
      exercices: [
        _ex(
          1,
          'Équilibre statique',
          5,
          "Une caisse de 50 kg est suspendue par deux cordes à 30° de la verticale chacune.",
          [
            _q(
              1,
              "Faire le bilan des forces sur la caisse.",
              2,
              _sol([
                _step(
                  "Forces : poids \$\\vec P\$ (vers le bas, \$P = mg = 50 \\times 10 = 500\\,N\$). Deux tensions \$\\vec T_1, \\vec T_2\$ (selon les cordes, vers le haut + écart). Par symétrie \$T_1 = T_2 = T\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer la tension dans chaque corde.",
              3,
              _sol([
                _step(
                  "**Équilibre vertical** : \$2 T \\cos 30° = P\$, soit \$2T \\times \\sqrt 3/2 = 500\$, donc \$T = 500/\\sqrt 3 \\approx 289\\,N\$.",
                ),
                _step(
                  "**Composantes horizontales** : les deux tensions ont des composantes opposées \$T \\sin 30°\$, qui s'annulent ✓.",
                ),
                _step(
                  "**Observation** : si les cordes étaient plus inclinées (angle \\(\\to 90°\\)), la tension exploserait — \\(\\lim T = \\infty\\). C'est pourquoi des cordes presque horizontales sont très contraignantes.",
                  tipFr:
                      "À chaque fois qu'on tend une corde, on multiplie les contraintes — physique pertinente pour les ponts suspendus, les téléphériques.",
                ),
              ], finalAnswerFr: r"$T \approx 289$ N"),
            ),
          ],
        ),
        _ex(
          2,
          'Plan incliné avec frottement',
          5,
          "Un bloc de 10 kg est posé sur un plan incliné à 25°. Coefficient de frottement statique \$\\mu_s = 0{,}5\$.",
          [
            _q(
              1,
              "Le bloc glisse-t-il spontanément ?",
              3,
              _sol([
                _step(
                  "Composante du poids selon le plan : \$P_x = mg\\sin\\alpha = 10 \\times 10 \\times 0{,}423 = 42{,}3\\,N\$ (tirant le bloc vers le bas).",
                ),
                _step(
                  "Réaction normale : \$R = mg\\cos\\alpha = 100 \\times 0{,}906 = 90{,}6\\,N\$. Force de frottement statique max : \$f_{\\max} = \\mu_s R = 0{,}5 \\times 90{,}6 = 45{,}3\\,N\$.",
                ),
                _step(
                  "Comparaison : \$P_x = 42{,}3 < f_{\\max} = 45{,}3\$. Le frottement suffit à compenser → **le bloc ne glisse pas**.",
                  tipFr:
                      "Critère d'équilibre : \$\\tan\\alpha < \\mu_s\$. Pour \$\\mu_s = 0{,}5\$, angle critique \$\\alpha_c = \\arctan 0{,}5 \\approx 26{,}6°\$. Ici 25° < 26,6° ✓.",
                ),
              ], finalAnswerFr: r"Non, le bloc reste statique"),
            ),
            _q(
              2,
              "À partir de quel angle commence-t-il à glisser ?",
              2,
              _sol([
                _step(
                  "Au seuil : \$\\tan\\alpha_c = \\mu_s\$. \$\\alpha_c = \\arctan(0{,}5) \\approx 26{,}57°\$.",
                ),
                _step(
                  "Au-delà, la composante du poids dépasse la friction max et le bloc accélère.",
                ),
              ], finalAnswerFr: r"$\alpha_c \approx 26{,}6°$"),
            ),
          ],
        ),
        _ex(
          3,
          'Système avec poulie',
          5,
          "Deux blocs (5 kg et 3 kg) sont reliés par une corde passant sur une poulie idéale. Le bloc lourd descend.",
          [
            _q(
              1,
              "Déterminer l'accélération du système et la tension de la corde.",
              4,
              _sol([
                _step(
                  "Bloc 1 (5 kg, descend) : \$m_1 g - T = m_1 a\$, soit \$50 - T = 5a\$.",
                ),
                _step(
                  "Bloc 2 (3 kg, monte) : \$T - m_2 g = m_2 a\$, soit \$T - 30 = 3a\$.",
                ),
                _step(
                  "Sommer : \$50 - 30 = 8a \\Rightarrow a = 2{,}5\\,m/s^2\$.",
                ),
                _step(
                  "Tension : \$T = 30 + 3 \\times 2{,}5 = 37{,}5\\,N\$.",
                  tipFr:
                      "Vérification : \$T < m_1 g\$ (bloc 1 descend) ET \$T > m_2 g\$ (bloc 2 monte). Ici \$30 < 37{,}5 < 50\$ ✓.",
                ),
              ], finalAnswerFr: r"$a = 2{,}5$ m/s², $T = 37{,}5$ N"),
            ),
            _q(
              2,
              "Vitesse du système après 2 s, partant du repos.",
              1,
              _sol([
                _step(
                  "\$v = at = 2{,}5 \\times 2 = 5\\,m/s\$.",
                ),
              ], finalAnswerFr: r"$v = 5$ m/s"),
            ),
          ],
        ),
        _ex(
          4,
          'Mouvement circulaire uniforme',
          5,
          "Un satellite tourne autour de la Terre à altitude \$h = 400\\,km\$ (orbite ISS). Rayon terrestre \$R_T = 6400\\,km\$. \$g_0 = 9{,}81\\,m/s^2\$ au sol.",
          [
            _q(
              1,
              "Calculer la gravité \$g\$ à cette altitude.",
              2,
              _sol([
                _step(
                  "Loi de gravitation : \$g \\propto 1/r^2\$. \$g/g_0 = (R_T/(R_T + h))^2 = (6400/6800)^2 \\approx 0{,}886\$.",
                ),
                _step(
                  "\$g \\approx 9{,}81 \\times 0{,}886 \\approx 8{,}69\\,m/s^2\$.",
                ),
                _step(
                  "Donc \$g\$ à 400 km est encore ~89% de \$g_0\$ — ce n'est pas le 'zéro gravité' qu'on imagine, mais la 'chute libre permanente' du satellite (orbite).",
                ),
              ], finalAnswerFr: r"$g \approx 8{,}69$ m/s²"),
            ),
            _q(
              2,
              "Calculer la vitesse orbitale.",
              3,
              _sol([
                _step(
                  "**Mouvement circulaire uniforme** : la force centripète = gravité. \$m g = m v^2/r \\Rightarrow v = \\sqrt{g r}\$ avec \$r = R_T + h\$.",
                ),
                _step(
                  "\$v = \\sqrt{8{,}69 \\times 6{,}8 \\times 10^6} = \\sqrt{5{,}91 \\times 10^7} \\approx 7690\\,m/s \\approx 27\\,700\\,km/h\$.",
                ),
                _step(
                  "Période de révolution : \$T = 2\\pi r/v = 2\\pi \\times 6{,}8 \\times 10^6 / 7690 \\approx 5556\\,s \\approx 92{,}6\\,\\text{min}\$. L'ISS fait un tour de Terre en ~93 min.",
                  tipFr:
                      "Toujours vérifier numériquement les ordres de grandeur — la vitesse orbitale (~28000 km/h) et la période (~90 min) sont des valeurs classiques en physique spatiale.",
                ),
              ], finalAnswerFr: r"$v \approx 7690$ m/s, $T \approx 93$ min"),
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
  'primitives': _paperPrimitivesSmb(),
  'definite_integral': _paperDefiniteIntegral(),
  'integral_apps': _paperIntegralApps(),
  'prob_basic': _paperProbBasic(),
  'conditional_prob': _paperConditionalProb(),
  'random_variables': _paperRandomVariables(),
  'complex_basics': _paperComplexBasicsSmb(),
  'complex_trig': _paperComplexTrig(),
  'complex_geometry': _paperComplexGeometry(),
  'ode_first_order': _paperOdeFirstOrderSmb(),
  'ode_second_order': _paperOdeSecondOrder(),
  'kinematics': _paperKinematics(),
  'newtons_laws': _paperNewtonsLawsSmb(),
  // 7 SMB chapters remaining.
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
