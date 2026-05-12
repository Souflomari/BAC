// Phase 3.4 encoder: topic-coherent Bac exam papers for the 31 PC chapters.
//
// Mirrors json_encode_exam_papers_smb.dart structure. PC (Sciences Physiques)
// is one notch lower than SMA in mathematical sophistication, comparable to
// SMB in depth. Many PC chapters have direct equivalents in SMB which we adapt
// (e.g. pc_seq_convergence ≈ SMB seq_convergence). A handful are
// PC-exclusive (pc_am_modulation, pc_radioactivity, pc_pendulum) and authored
// from scratch.
//
// Output: backend/supabase/migrations/034_exam_papers_pc.sql

import 'dart:convert';
import 'dart:io';

// ============================================================================
// Builders
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
// PC Papers — math (15 chapters)
// ============================================================================

// pc_arithmetic_geom_seq — combines arithmetic + geometric suites in one paper
Map<String, dynamic> _paperArithmeticGeomSeq() => _paper(
      titleFr: 'Épreuve type — Suites arithmétiques et géométriques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites arithmétiques (raison \$r\$ par addition, \$u_n = u_0 + nr\$) et géométriques (raison \$q\$ par multiplication, \$u_n = u_0 q^n\$). Sommes : Gauss pour les arithmétiques, \$u_0 (1-q^{n+1})/(1-q)\$ pour les géométriques.",
      exercices: [
        _ex(
          1,
          'Identification arithmétique',
          5,
          "Soit \$(u_n)\$ définie par \$u_0 = 2\$ et \$u_{n+1} = u_n + 4\$.",
          [
            _q(
              1,
              "Justifier que \$(u_n)\$ est arithmétique et donner sa raison.",
              2,
              _sol([
                _step(
                  "Par définition : \$(u_n)\$ arithmétique \$\\iff u_{n+1} - u_n = r\$ constant. Ici \$u_{n+1} - u_n = (u_n + 4) - u_n = 4\$.",
                ),
                _step(
                  "La différence est **constante et vaut 4**, indépendante de \$n\$. Donc \$(u_n)\$ est arithmétique de **raison \$r = 4\$**.",
                ),
              ], finalAnswerFr: r"$r = 4$"),
            ),
            _q(
              2,
              "Donner \$u_n\$ en fonction de \$n\$ puis calculer \$u_{20}\$.",
              2,
              _sol([
                _step(
                  "**Terme général arithmétique** : \$u_n = u_0 + nr = 2 + 4n\$.",
                ),
                _step(
                  "\$u_{20} = 2 + 4 \\times 20 = 82\$.",
                  tipFr:
                      "L'expression explicite \$u_n = u_0 + nr\$ permet d'accéder à n'importe quel terme sans énumérer les précédents.",
                ),
              ], finalAnswerFr: r"$u_n = 2 + 4n$, $u_{20} = 82$"),
            ),
            _q(
              3,
              "Calculer la somme \$S = u_0 + u_1 + \\dots + u_{20}\$ (21 termes).",
              1,
              _sol([
                _step(
                  "**Formule de Gauss** : \$S = \\text{(nb termes)} \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}\$.",
                ),
                _step(
                  "\$S = 21 \\times (u_0 + u_{20})/2 = 21 \\times (2 + 82)/2 = 21 \\times 42 = 882\$.",
                ),
              ], finalAnswerFr: r"$S = 882$"),
            ),
          ],
        ),
        _ex(
          2,
          'Identification géométrique',
          5,
          "Soit \$(v_n)\$ définie par \$v_0 = 3\$ et \$v_{n+1} = 2 v_n\$.",
          [
            _q(
              1,
              "Montrer que \$(v_n)\$ est géométrique et préciser sa raison.",
              2,
              _sol([
                _step(
                  "\$(v_n)\$ géométrique \$\\iff v_{n+1}/v_n = q\$ constant (avec \$v_n \\ne 0\$). Ici \$v_{n+1}/v_n = 2 v_n / v_n = 2\$.",
                ),
                _step(
                  "Donc \$(v_n)\$ est géométrique de **raison \$q = 2\$**.",
                  mistakeFr:
                      "Ne pas confondre arithmétique (différence constante) et géométrique (rapport constant) — le doublement, triplement, etc. est géométrique.",
                ),
              ], finalAnswerFr: r"$q = 2$"),
            ),
            _q(
              2,
              "Donner \$v_n\$ en fonction de \$n\$ et calculer \$v_{10}\$.",
              1,
              _sol([
                _step(
                  "**Terme général géométrique** : \$v_n = v_0 q^n = 3 \\cdot 2^n\$.",
                ),
                _step(
                  "\$v_{10} = 3 \\times 1024 = 3072\$.",
                ),
              ], finalAnswerFr: r"$v_n = 3 \cdot 2^n$, $v_{10} = 3072$"),
            ),
            _q(
              3,
              "Calculer \$S = v_0 + v_1 + \\dots + v_{10}\$.",
              2,
              _sol([
                _step(
                  "**Formule géométrique** : \$S = v_0 \\dfrac{1 - q^{n+1}}{1 - q}\$ pour \$n+1\$ termes (\$q \\ne 1\$).",
                ),
                _step(
                  "Ici 11 termes (\$v_0\$ à \$v_{10}\$), \$v_0 = 3\$, \$q = 2\$. \$S = 3 \\cdot \\dfrac{1 - 2^{11}}{1 - 2} = 3 \\cdot \\dfrac{1 - 2048}{-1} = 3 \\times 2047 = 6141\$.",
                ),
              ], finalAnswerFr: r"$S = 6141$"),
            ),
          ],
        ),
        _ex(
          3,
          'Sens de variation et limites',
          5,
          "Étudier le comportement à l'infini selon la nature et les paramètres de la suite.",
          [
            _qSubs(
              1,
              "Suites arithmétiques.",
              2,
              [
                _sub(
                  'a',
                  "Donner le sens de variation d'une suite arithmétique selon le signe de \$r\$.",
                  1,
                  _sol([
                    _step(
                      "\$u_{n+1} - u_n = r\$. Donc : \$r > 0\$ → strictement croissante ; \$r < 0\$ → strictement décroissante ; \$r = 0\$ → constante.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Donner \$\\lim u_n\$ selon le signe de \$r\$.",
                  1,
                  _sol([
                    _step(
                      "\$r > 0\$ : \$u_n \\to +\\infty\$. \$r < 0\$ : \$u_n \\to -\\infty\$. \$r = 0\$ : suite constante, limite \$= u_0\$.",
                    ),
                  ], finalAnswerFr: r"Limite $= \pm\infty$ sauf si $r = 0$"),
                ),
              ],
            ),
            _qSubs(
              2,
              "Suites géométriques (\$u_0 > 0\$).",
              3,
              [
                _sub(
                  'a',
                  "Sens de variation selon \$q\$.",
                  1,
                  _sol([
                    _step(
                      "\$u_{n+1} - u_n = u_n(q - 1)\$. Avec \$u_0 > 0\$ et \$q > 0\$ : \$q > 1\$ → croissante, \$0 < q < 1\$ → décroissante.",
                    ),
                    _step(
                      "Si \$q < 0\$, les termes alternent de signe — pas de monotonie.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Limites selon \$q\$.",
                  2,
                  _sol([
                    _step(
                      "**\$q > 1\$** : \$q^n \\to +\\infty\$ donc \$u_n \\to +\\infty\$.",
                    ),
                    _step(
                      "**\$q = 1\$** : suite constante, limite \$= u_0\$.",
                    ),
                    _step(
                      "**\$|q| < 1\$** : \$q^n \\to 0\$ donc \$u_n \\to 0\$.",
                    ),
                    _step(
                      "**\$q \\le -1\$** : la suite oscille (pas de limite).",
                      tipFr:
                          "Mémo : pour les géométriques, seule la position de \$q\$ par rapport à \$\\pm 1\$ détermine le comportement asymptotique.",
                    ),
                  ]),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Application — capital à intérêts composés',
          5,
          "Un capital \$C_0 = 5000\\,\\text{DH}\$ est placé à 4% d'intérêts composés annuels. Soit \$C_n\$ le capital après \$n\$ années.",
          [
            _q(
              1,
              "Exprimer \$C_{n+1}\$ en fonction de \$C_n\$ et identifier la nature de la suite.",
              2,
              _sol([
                _step(
                  "Chaque année, le capital est multiplié par \$1{,}04\$ (capital initial + 4% d'intérêt). Donc \$C_{n+1} = 1{,}04 \\cdot C_n\$.",
                ),
                _step(
                  "\$(C_n)\$ est **géométrique** de raison \$q = 1{,}04\$ et de premier terme \$C_0 = 5000\$.",
                ),
              ], finalAnswerFr: r"Géométrique, $q = 1{,}04$"),
            ),
            _q(
              2,
              "Calculer \$C_{10}\$ et \$C_{20}\$.",
              2,
              _sol([
                _step(
                  "\$C_n = 5000 \\times 1{,}04^n\$. \$1{,}04^{10} \\approx 1{,}4802\$ → \$C_{10} \\approx 7401\\,\\text{DH}\$.",
                ),
                _step(
                  "\$1{,}04^{20} \\approx 2{,}1911\$ → \$C_{20} \\approx 10\\,956\\,\\text{DH}\$.",
                  tipFr:
                      "Règle de 72 : à 4%, doublement en environ \$72/4 = 18\$ ans. Cohérent avec \$C_{20} \\approx 2 C_0\$.",
                ),
              ], finalAnswerFr: r"$C_{10} \approx 7401$ DH, $C_{20} \approx 10\,956$ DH"),
            ),
            _q(
              3,
              "Au bout de combien d'années le capital aura-t-il triplé ?",
              1,
              _sol([
                _step(
                  "Résoudre \$1{,}04^n = 3 \\iff n \\ln(1{,}04) = \\ln 3 \\iff n = \\ln 3 / \\ln(1{,}04) \\approx 1{,}0986 / 0{,}0392 \\approx 28\\,\\text{ans}\$.",
                ),
              ], finalAnswerFr: r"$n \approx 28$ ans"),
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
          "Convergence, théorème des gendarmes, théorème de la limite monotone, opérations sur les limites.",
      exercices: [
        _ex(
          1,
          'Limites usuelles',
          5,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{n \\to \\infty} 1/n\$, \$\\lim 1/n^2\$, \$\\lim 1/\\sqrt{n}\$.",
              2,
              _sol([
                _step(
                  "**Règle générale** : pour tout \$\\alpha > 0\$, \$\\lim_{n \\to \\infty} 1/n^\\alpha = 0\$ (avec \$\\sqrt n = n^{1/2}\$).",
                ),
                _step(
                  "Les trois limites valent donc **0**. Plus \$\\alpha\$ est grand, plus la décroissance est rapide.",
                ),
              ], finalAnswerFr: r"Toutes valent 0"),
            ),
            _q(
              2,
              "\$\\lim_{n \\to \\infty} \\dfrac{3n^2 + n + 1}{n^2 - 2}\$.",
              2,
              _sol([
                _step(
                  "Forme \$\\infty/\\infty\$ : on **factorise le terme dominant** (ici \$n^2\$) en haut et en bas.",
                ),
                _step(
                  "\$\\dfrac{3n^2 + n + 1}{n^2 - 2} = \\dfrac{n^2(3 + 1/n + 1/n^2)}{n^2(1 - 2/n^2)} = \\dfrac{3 + 1/n + 1/n^2}{1 - 2/n^2} \\to \\dfrac{3}{1} = 3\$.",
                ),
                _step(
                  "**Règle** : pour un quotient de polynômes de même degré, la limite est le rapport des coefficients dominants.",
                ),
              ], finalAnswerFr: r"$\lim = 3$"),
            ),
            _q(
              3,
              "\$\\lim_{n \\to \\infty} \\sqrt{n+1} - \\sqrt{n}\$.",
              1,
              _sol([
                _step(
                  "Forme indéterminée \$\\infty - \\infty\$. **Astuce de la quantité conjuguée** : multiplier par \$\\dfrac{\\sqrt{n+1} + \\sqrt{n}}{\\sqrt{n+1} + \\sqrt{n}}\$.",
                ),
                _step(
                  "\$\\sqrt{n+1} - \\sqrt{n} = \\dfrac{(n+1) - n}{\\sqrt{n+1} + \\sqrt{n}} = \\dfrac{1}{\\sqrt{n+1} + \\sqrt{n}} \\to 0\$.",
                  mistakeFr:
                      "Ne pas conclure que \$\\sqrt{n+1} - \\sqrt{n} \\to \\infty - \\infty = 0\$ : cette 'soustraction' n'a pas de sens, il faut lever l'indétermination.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          2,
          'Théorème des gendarmes',
          5,
          "Soit \$u_n = \\dfrac{\\cos(n)}{n}\$ pour \$n \\ge 1\$.",
          [
            _q(
              1,
              "Encadrer \$u_n\$.",
              2,
              _sol([
                _step(
                  "Pour tout \$n\$, \$-1 \\le \\cos(n) \\le 1\$. Comme \$n > 0\$, on divise par \$n\$ sans changer le sens : \$-1/n \\le \\cos(n)/n \\le 1/n\$.",
                ),
              ], finalAnswerFr: r"$-1/n \le u_n \le 1/n$"),
            ),
            _q(
              2,
              "En déduire \$\\lim u_n\$.",
              3,
              _sol([
                _step(
                  "Les deux bornes \$-1/n\$ et \$1/n\$ tendent vers 0 quand \$n \\to \\infty\$.",
                ),
                _step(
                  "Par le **théorème des gendarmes**, \$u_n\$ est encadrée par deux suites convergeant vers la même limite 0. Donc \$\\lim u_n = 0\$.",
                  tipFr:
                      "\$\\cos(n)\$ n'a pas de limite (oscille entre -1 et 1), mais \$\\cos(n)/n\$ converge grâce à la décroissance dominante de \$1/n\$.",
                ),
              ], finalAnswerFr: r"$\lim u_n = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Théorème de la limite monotone',
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
                  "Montrer par récurrence que \$0 \\le u_n \\le 2\$.",
                  2,
                  _sol([
                    _step(
                      "**Init** : \$u_0 = 1 \\in [0, 2]\$ ✓.",
                    ),
                    _step(
                      "**Hérédité** : si \$0 \\le u_n \\le 2\$, alors \$2 \\le 2 + u_n \\le 4\$, donc \$\\sqrt 2 \\le u_{n+1} \\le 2\$. Comme \$\\sqrt 2 \\approx 1{,}41 > 0\$, on a bien \$0 \\le u_{n+1} \\le 2\$.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Montrer que \$(u_n)\$ est croissante.",
                  1,
                  _sol([
                    _step(
                      "Étude de signe : \$u_{n+1}^2 - u_n^2 = (2 + u_n) - u_n^2 = -(u_n - 2)(u_n + 1)\$. Sur \$[0, 2]\$, \$(u_n - 2) \\le 0\$ et \$(u_n + 1) > 0\$, donc \$u_{n+1}^2 - u_n^2 \\ge 0\$.",
                    ),
                    _step(
                      "Comme \$u_n, u_{n+1} \\ge 0\$, ceci entraîne \$u_{n+1} \\ge u_n\$. La suite est croissante.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Conclure sur la convergence et calculer la limite.",
                  1,
                  _sol([
                    _step(
                      "(\$u_n\$) est croissante et majorée par 2 → par le **théorème de la limite monotone**, elle converge vers une limite \$L \\le 2\$.",
                    ),
                    _step(
                      "\$L\$ vérifie \$L = \\sqrt{2 + L}\$ (passage à la limite). Élever au carré : \$L^2 = 2 + L \\iff L^2 - L - 2 = 0 \\iff (L-2)(L+1) = 0\$, donc \$L = 2\$ (puisque \$L \\ge 0\$).",
                    ),
                  ], finalAnswerFr: r"$L = 2$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Opérations sur les limites',
          5,
          "Calculer ou justifier l'absence de limite pour les suites suivantes.",
          [
            _q(
              1,
              "\$u_n = (-1)^n\$.",
              2,
              _sol([
                _step(
                  "\$u_n\$ vaut alternativement \$+1\$ (\$n\$ pair) et \$-1\$ (\$n\$ impair). Elle prend deux valeurs distinctes à l'infini.",
                ),
                _step(
                  "Donc \$(u_n)\$ **n'a pas de limite** (la suite des termes pairs converge vers 1, celle des impairs vers -1 — limites différentes → divergence).",
                ),
              ], finalAnswerFr: r"Pas de limite"),
            ),
            _q(
              2,
              "\$v_n = n - n^2\$.",
              1,
              _sol([
                _step(
                  "Forme \$\\infty - \\infty\$. Factoriser : \$v_n = n(1 - n) = -n(n - 1)\$.",
                ),
                _step(
                  "Quand \$n \\to \\infty\$, \$n(n-1) \\to +\\infty\$ donc \$v_n \\to -\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim v_n = -\infty$"),
            ),
            _q(
              3,
              "\$w_n = \\dfrac{(-1)^n}{n} + 3\$.",
              2,
              _sol([
                _step(
                  "\$(-1)^n / n\$ est encadrée par \$-1/n\$ et \$1/n\$, donc tend vers 0 (gendarmes).",
                ),
                _step(
                  "Par somme des limites : \$\\lim w_n = 0 + 3 = 3\$.",
                ),
              ], finalAnswerFr: r"$\lim w_n = 3$"),
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
          "Suites définies par \$u_{n+1} = f(u_n)\$, points fixes, suites arithmético-géométriques, convergence par monotonie + bornes.",
      exercices: [
        _ex(
          1,
          'Récurrence affine simple',
          5,
          "Soit \$(u_n)\$ définie par \$u_0 = 0\$ et \$u_{n+1} = \\dfrac{u_n + 6}{2}\$.",
          [
            _q(
              1,
              "Calculer \$u_1, u_2, u_3\$ et conjecturer le comportement.",
              2,
              _sol([
                _step(
                  "\$u_1 = (0 + 6)/2 = 3\$. \$u_2 = (3 + 6)/2 = 4{,}5\$. \$u_3 = (4{,}5 + 6)/2 = 5{,}25\$.",
                ),
                _step(
                  "La suite semble **croître et se stabiliser autour de 6** : 0, 3, 4.5, 5.25, 5.625, ...",
                ),
              ], finalAnswerFr: r"Conjecture : croissante, limite $\approx 6$"),
            ),
            _q(
              2,
              "Trouver le point fixe de \$f(x) = (x+6)/2\$ et le comparer à la conjecture.",
              2,
              _sol([
                _step(
                  "**Point fixe** : \$L = f(L) \\iff L = (L + 6)/2 \\iff 2L = L + 6 \\iff L = 6\$. ✓ avec la conjecture.",
                ),
                _step(
                  "Le point fixe est un **candidat-limite** ; pour conclure rigoureusement, il faut prouver la convergence (monotonie + bornes).",
                  mistakeFr:
                      "Trouver le point fixe ne prouve pas la convergence : certaines suites n'atteignent jamais leur point fixe (ex. \$u_{n+1} = 2 u_n - 6\$ avec \$u_0 = 0\$ diverge bien que 6 soit un point fixe).",
                ),
              ], finalAnswerFr: r"$L = 6$"),
            ),
            _q(
              3,
              "Montrer que \$(u_n)\$ est croissante et majorée par 6, puis conclure.",
              1,
              _sol([
                _step(
                  "**Majoration** par récurrence : si \$u_n \\le 6\$, alors \$u_{n+1} = (u_n + 6)/2 \\le (6 + 6)/2 = 6\$. Init OK avec \$u_0 = 0 \\le 6\$.",
                ),
                _step(
                  "**Croissance** : \$u_{n+1} - u_n = (u_n + 6)/2 - u_n = (6 - u_n)/2 > 0\$ tant que \$u_n < 6\$.",
                ),
                _step(
                  "Croissante + majorée → converge vers le point fixe \$L = 6\$.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Récurrence non linéaire',
          5,
          "Soit \$(u_n)\$ telle que \$u_0 = 1\$ et \$u_{n+1} = \\sqrt{3 u_n + 4}\$.",
          [
            _qSubs(
              1,
              "Étude complète.",
              4,
              [
                _sub(
                  'a',
                  "Trouver le(s) point(s) fixe(s).",
                  1,
                  _sol([
                    _step(
                      "\$L = \\sqrt{3L + 4} \\Rightarrow L^2 = 3L + 4 \\Rightarrow L^2 - 3L - 4 = 0\$.",
                    ),
                    _step(
                      "Discriminant : \$9 + 16 = 25\$. Racines : \$L = (3 + 5)/2 = 4\$ ou \$L = (3 - 5)/2 = -1\$. La racine carrée étant positive, \$L \\ge 0\$, donc \$L = 4\$.",
                    ),
                  ], finalAnswerFr: r"$L = 4$"),
                ),
                _sub(
                  'b',
                  "Montrer par récurrence que \$1 \\le u_n \\le 4\$.",
                  2,
                  _sol([
                    _step(
                      "Init : \$u_0 = 1 \\in [1, 4]\$ ✓.",
                    ),
                    _step(
                      "Hérédité : si \$1 \\le u_n \\le 4\$, alors \$7 \\le 3 u_n + 4 \\le 16\$, donc \$\\sqrt 7 \\le u_{n+1} \\le 4\$. Comme \$\\sqrt 7 \\approx 2{,}65 > 1\$, on a bien \$1 \\le u_{n+1} \\le 4\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Conclure sur la convergence.",
                  1,
                  _sol([
                    _step(
                      "Étude de signe : \$u_{n+1}^2 - u_n^2 = (3 u_n + 4) - u_n^2 = -(u_n - 4)(u_n + 1)\$. Sur \$[1, 4]\$, \$(u_n - 4) \\le 0\$ et \$(u_n + 1) > 0\$ → \$u_{n+1}^2 \\ge u_n^2\$ → \$u_{n+1} \\ge u_n\$ (les termes étant positifs).",
                    ),
                    _step(
                      "Croissante + majorée par 4 → converge. La limite vérifie l'équation du point fixe → \$L = 4\$.",
                    ),
                  ], finalAnswerFr: r"$\lim u_n = 4$"),
                ),
              ],
            ),
            _q(
              2,
              "Combien d'itérations pour atteindre \$|u_n - 4| < 10^{-3}\$ ?",
              1,
              _sol([
                _step(
                  "Calcul itératif : \$u_0 = 1\$ (err = 3), \$u_1 = \\sqrt 7 \\approx 2{,}65\$ (err ≈ 1.35), \$u_2 \\approx \\sqrt{11{,}95} \\approx 3{,}46\$ (err ≈ 0.54), \$u_3 \\approx \\sqrt{14{,}37} \\approx 3{,}79\$ (err ≈ 0.21), \$u_4 \\approx 3{,}92\$, \$u_5 \\approx 3{,}97\$, \$u_6 \\approx 3{,}99\$, \$u_7 \\approx 3{,}996\$ (err ≈ 4×10⁻³), \$u_8 \\approx 3{,}998\$ (err ≈ 1.5×10⁻³), \$u_9\\approx 3{,}9994\$ (err < 10⁻³).",
                ),
                _step(
                  "Donc dès \$n = 9\$, la précision est atteinte.",
                ),
              ], finalAnswerFr: r"$n \approx 9$"),
            ),
          ],
        ),
        _ex(
          3,
          'Suite arithmético-géométrique',
          5,
          "Soit \$(u_n)\$ avec \$u_0 = 1\$ et \$u_{n+1} = 3 u_n - 4\$.",
          [
            _q(
              1,
              "Trouver le point fixe \$\\ell\$ de \$f(x) = 3x - 4\$.",
              1,
              _sol([
                _step(
                  "\$\\ell = 3 \\ell - 4 \\iff 2 \\ell = 4 \\iff \\ell = 2\$.",
                ),
              ], finalAnswerFr: r"$\ell = 2$"),
            ),
            _q(
              2,
              "Poser \$v_n = u_n - \\ell\$. Montrer que \$(v_n)\$ est géométrique et donner sa raison.",
              2,
              _sol([
                _step(
                  "\$v_{n+1} = u_{n+1} - 2 = (3 u_n - 4) - 2 = 3 u_n - 6 = 3(u_n - 2) = 3 v_n\$.",
                ),
                _step(
                  "Donc \$(v_n)\$ est **géométrique de raison \$q = 3\$**.",
                  tipFr:
                      "**Astuce arithmético-géométrique** : pour \$u_{n+1} = a u_n + b\$ avec \$a \\ne 1\$, le changement de variable \$v_n = u_n - \\ell\$ (où \$\\ell\$ est le point fixe \$\\ell = b/(1-a)\$) rend la suite géométrique pure.",
                ),
              ], finalAnswerFr: r"Géométrique, $q = 3$"),
            ),
            _q(
              3,
              "Déterminer l'expression explicite de \$u_n\$ et sa limite.",
              2,
              _sol([
                _step(
                  "\$v_0 = u_0 - 2 = -1\$. Donc \$v_n = v_0 q^n = -3^n\$.",
                ),
                _step(
                  "Et \$u_n = v_n + 2 = 2 - 3^n\$.",
                ),
                _step(
                  "Vérification : \$u_0 = 2 - 1 = 1\$ ✓. \$u_1 = 2 - 3 = -1\$ ; formule \$3(1) - 4 = -1\$ ✓.",
                ),
                _step(
                  "Quand \$n \\to \\infty\$, \$3^n \\to +\\infty\$ donc \$u_n \\to -\\infty\$. La suite **diverge** ; le point fixe 2 est **répulsif** (\$|q| > 1\$).",
                ),
              ], finalAnswerFr: r"$u_n = 2 - 3^n$, $\lim = -\infty$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — modèle démographique',
          5,
          "Dans une cuve de production, la population de bactéries triple chaque heure mais 200 bactéries sont prélevées pour analyse. À \$t = 0\$, on a 500 bactéries.",
          [
            _q(
              1,
              "Modéliser la population \$P_n\$ après \$n\$ heures.",
              1,
              _sol([
                _step(
                  "\$P_0 = 500\$. Chaque heure : triplement (\$\\times 3\$) puis prélèvement (\$-200\$). Donc \$P_{n+1} = 3 P_n - 200\$.",
                ),
              ], finalAnswerFr: r"$P_{n+1} = 3 P_n - 200$, $P_0 = 500$"),
            ),
            _q(
              2,
              "Déterminer l'expression explicite \$P_n\$.",
              3,
              _sol([
                _step(
                  "Point fixe : \$\\ell = 3 \\ell - 200 \\iff 2\\ell = 200 \\iff \\ell = 100\$.",
                ),
                _step(
                  "Posons \$Q_n = P_n - 100\$. Alors \$Q_{n+1} = P_{n+1} - 100 = 3 P_n - 200 - 100 = 3(P_n - 100) = 3 Q_n\$.",
                ),
                _step(
                  "\$(Q_n)\$ géométrique de raison 3, \$Q_0 = 500 - 100 = 400\$. Donc \$Q_n = 400 \\cdot 3^n\$ et **\$P_n = 100 + 400 \\cdot 3^n\$**.",
                ),
              ], finalAnswerFr: r"$P_n = 100 + 400 \cdot 3^n$"),
            ),
            _q(
              3,
              "Calculer \$P_5\$ et conclure sur le comportement à long terme.",
              1,
              _sol([
                _step(
                  "\$P_5 = 100 + 400 \\cdot 3^5 = 100 + 400 \\times 243 = 100 + 97\\,200 = 97\\,300\$ bactéries.",
                ),
                _step(
                  "Quand \$n \\to \\infty\$, \$3^n \\to +\\infty\$ donc \$P_n \\to +\\infty\$ : la population **explose exponentiellement** malgré les prélèvements, car la croissance interne (\$\\times 3\$) domine largement la décroissance externe (\$-200\$).",
                ),
              ], finalAnswerFr: r"$P_5 = 97\,300$, explose"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLimitCalc() => _paper(
      titleFr: 'Épreuve type — Calcul de limites',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Limites en un point et à l'infini, formes indéterminées, factorisation, quantités conjuguées, croissances comparées.",
      exercices: [
        _ex(
          1,
          'Limites par calcul direct',
          5,
          "Calculer les limites suivantes en justifiant la méthode.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 2}(x^3 - 2x^2 + 1)\$.",
              1,
              _sol([
                _step(
                  "Polynôme continu sur \$\\mathbb{R}\$ → substitution directe : \$8 - 8 + 1 = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$ (numérateur et dénominateur s'annulent en 3). Factoriser : \$x^2 - 9 = (x-3)(x+3)\$.",
                ),
                _step(
                  "\$\\dfrac{(x-3)(x+3)}{x-3} = x + 3 \\to 6\$ quand \$x \\to 3\$.",
                  tipFr:
                      "Forme \$0/0\$ avec polynômes : factoriser par \$(x - a)\$ pour faire apparaître une simplification.",
                ),
              ], finalAnswerFr: r"$\lim = 6$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x^2 - 1}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$. \$x^3 - 1 = (x-1)(x^2 + x + 1)\$ ; \$x^2 - 1 = (x-1)(x+1)\$.",
                ),
                _step(
                  "Fraction : \$\\dfrac{x^2 + x + 1}{x + 1}\$ pour \$x \\ne 1\$.",
                ),
                _step(
                  "Limite en 1 : \$\\dfrac{1 + 1 + 1}{1 + 1} = \\dfrac{3}{2}\$.",
                ),
              ], finalAnswerFr: r"$\lim = 3/2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Quantité conjuguée',
          5,
          "Calculer ces limites par la technique du conjugué.",
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
                  "\$\\dfrac{(\\sqrt{1+x} - 1)(\\sqrt{1+x} + 1)}{x(\\sqrt{1+x} + 1)} = \\dfrac{(1 + x) - 1}{x(\\sqrt{1+x} + 1)} = \\dfrac{x}{x(\\sqrt{1+x} + 1)} = \\dfrac{1}{\\sqrt{1+x} + 1}\$.",
                ),
                _step(
                  "Limite en 0 : \$\\dfrac{1}{\\sqrt 1 + 1} = \\dfrac{1}{2}\$.",
                  tipFr:
                      "Multiplier par le conjugué \$(a + b)\$ d'une expression \$(a - b)\$ donne \$a^2 - b^2\$ — fait disparaître les racines.",
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
                  "Numérateur : \$(x^2 + x) - x^2 = x\$. Dénominateur : \$\\sqrt{x^2 + x} + x\$. Pour \$x \\to +\\infty\$, \$\\sqrt{x^2 + x} \\sim x\$, donc dénominateur \$\\sim 2x\$.",
                ),
                _step(
                  "Limite : \$\\dfrac{x}{2x} = \\dfrac{1}{2}\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1/2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Limites à l\'infini et croissances comparées',
          5,
          "Étudier le comportement asymptotique.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{3x^2 - x + 1}{x^2 + 2}\$.",
              2,
              _sol([
                _step(
                  "Quotient de polynômes de **même degré 2**. Factoriser \$x^2\$ en haut et en bas : \$\\dfrac{x^2(3 - 1/x + 1/x^2)}{x^2(1 + 2/x^2)} \\to \\dfrac{3}{1} = 3\$.",
                ),
                _step(
                  "**Règle pratique** : pour un quotient de polynômes de même degré, limite = rapport des coefficients dominants.",
                ),
              ], finalAnswerFr: r"$\lim = 3$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x}\$ et \$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^{10}}\$.",
              2,
              _sol([
                _step(
                  "**Croissances comparées** : à l'infini, l'exponentielle l'emporte sur toute puissance, qui l'emporte sur \$\\ln\$.",
                ),
                _step(
                  "Donc \$\\lim \\dfrac{\\ln x}{x} = 0\$ et \$\\lim \\dfrac{e^x}{x^{10}} = +\\infty\$.",
                  tipFr:
                      "Hiérarchie universelle : \$e^x \\gg x^n \\gg \\ln x\$ à l'infini. Elle décide qui 'gagne' dans toute forme indéterminée \$\\infty/\\infty\$.",
                ),
              ], finalAnswerFr: r"$0$ et $+\infty$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0^+} x \\ln x\$.",
              1,
              _sol([
                _step(
                  "Forme \$0 \\cdot (-\\infty)\$. Changement de variable \$u = 1/x\$ (\$u \\to +\\infty\$ quand \$x \\to 0^+\$) : \$x \\ln x = (1/u) \\ln(1/u) = -\\ln u / u \\to 0\$ par croissances comparées.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          4,
          'Asymptotes',
          5,
          "Soit \$f(x) = \\dfrac{x^2 + 1}{x - 1}\$ définie sur \$\\mathbb{R} \\setminus \\{1\\}\$.",
          [
            _q(
              1,
              "Calculer les limites de \$f\$ en \$1^+\$, \$1^-\$, \$+\\infty\$, \$-\\infty\$.",
              2,
              _sol([
                _step(
                  "En 1 : numérateur \$\\to 2 > 0\$, dénominateur \$\\to 0\$. Signe à droite : \$x - 1 > 0\$ → \$f \\to +\\infty\$. Signe à gauche : \$x - 1 < 0\$ → \$f \\to -\\infty\$.",
                ),
                _step(
                  "À \$\\pm \\infty\$ : numérateur degré 2, dénominateur degré 1 → \$f \\to \\pm \\infty\$ (numérateur l'emporte).",
                ),
              ], finalAnswerFr: r"$\pm\infty$ en 1; $\pm\infty$ à $\pm\infty$"),
            ),
            _q(
              2,
              "Effectuer la division euclidienne pour écrire \$f(x) = ax + b + c/(x-1)\$.",
              2,
              _sol([
                _step(
                  "Division : \$x^2 + 1 = (x - 1)(x + 1) + 2\$ (car \$(x-1)(x+1) = x^2 - 1\$ et reste = \$1 - (-1) = 2\$).",
                ),
                _step(
                  "Donc \$f(x) = x + 1 + \\dfrac{2}{x - 1}\$.",
                ),
              ], finalAnswerFr: r"$f(x) = x + 1 + 2/(x-1)$"),
            ),
            _q(
              3,
              "En déduire l'asymptote oblique en \$\\pm\\infty\$.",
              1,
              _sol([
                _step(
                  "Quand \$x \\to \\pm\\infty\$, \$\\dfrac{2}{x-1} \\to 0\$, donc \$f(x) - (x + 1) \\to 0\$.",
                ),
                _step(
                  "La droite \$y = x + 1\$ est **asymptote oblique** à la courbe de \$f\$ en \$\\pm\\infty\$.",
                  tipFr:
                      "Asymptote oblique : la partie polynômiale après division euclidienne donne l'équation de l'asymptote. Le reste tend vers 0.",
                ),
              ], finalAnswerFr: r"$y = x + 1$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperContinuityTvi() => _paper(
      titleFr: 'Épreuve type — Continuité et théorème des valeurs intermédiaires',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Continuité (\$\\lim_a f = f(a)\$), prolongement par continuité, TVI (\$f\$ continue sur \$[a,b]\$ + signes opposés → racine).",
      exercices: [
        _ex(
          1,
          'Continuité par morceaux',
          5,
          "Soit \$f(x) = \\begin{cases} x^2 + 1 & \\text{si } x \\le 1 \\\\ ax + b & \\text{si } x > 1 \\end{cases}\$.",
          [
            _q(
              1,
              "Déterminer \$a, b\$ pour que \$f\$ soit continue et dérivable en \$x = 1\$.",
              4,
              _sol([
                _step(
                  "**Continuité en 1** : \$\\lim_{1^-} f = 1^2 + 1 = 2\$ et \$f(1) = 2\$. Limite à droite : \$\\lim_{1^+} ax + b = a + b\$. Égalité : \$a + b = 2\$.",
                ),
                _step(
                  "**Dérivabilité en 1** : les dérivées à gauche et à droite doivent coïncider. À gauche : \$f'(x) = 2x\$ donc \$f'_g(1) = 2\$. À droite : \$f'(x) = a\$, donc \$a = 2\$.",
                ),
                _step(
                  "Avec \$a = 2\$ et \$a + b = 2\$ : \$b = 0\$. Donc \$f(x) = 2x\$ pour \$x > 1\$.",
                  tipFr:
                      "Pour 'recoller' deux morceaux avec dérivabilité, deux conditions : (1) mêmes valeurs (continuité), (2) mêmes pentes (dérivabilité).",
                ),
              ], finalAnswerFr: r"$a = 2$, $b = 0$"),
            ),
            _q(
              2,
              "Avec ces valeurs, vérifier la continuité et la dérivabilité.",
              1,
              _sol([
                _step(
                  "\$\\lim_{1^-} f = 2\$, \$\\lim_{1^+} f = 2 \\cdot 1 + 0 = 2\$, \$f(1) = 2\$ ✓ continue. \$f'_g(1) = 2\$, \$f'_d(1) = 2\$ ✓ dérivable.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Prolongement par continuité',
          5,
          "Étudier la possibilité de prolonger par continuité.",
          [
            _q(
              1,
              "\$f(x) = \\dfrac{x^2 - 4}{x - 2}\$ en \$x = 2\$.",
              3,
              _sol([
                _step(
                  "\$f\$ n'est pas définie en 2 (dénominateur s'annule). Calcul de la limite : \$\\dfrac{x^2 - 4}{x - 2} = \\dfrac{(x-2)(x+2)}{x - 2} = x + 2\$ pour \$x \\ne 2\$.",
                ),
                _step(
                  "\$\\lim_{x \\to 2} f(x) = 4\$ existe et est finie.",
                ),
                _step(
                  "**Prolongement par continuité** : \$\\tilde f(2) = 4\$. La fonction prolongée est simplement \$x + 2\$ partout, continue sur \$\\mathbb{R}\$.",
                  tipFr:
                      "Discontinuité 'apparente' (forme \$0/0\$) → prolongeable. Discontinuité 'essentielle' (limites infinies ou limites latérales différentes) → non-prolongeable.",
                ),
              ], finalAnswerFr: r"$\tilde f(2) = 4$"),
            ),
            _q(
              2,
              "\$g(x) = \\dfrac{1}{x^2}\$ en \$x = 0\$.",
              2,
              _sol([
                _step(
                  "\$\\lim_{x \\to 0} 1/x^2 = +\\infty\$ (des deux côtés). Pas de limite finie.",
                ),
                _step(
                  "**Impossible** de prolonger par continuité — la discontinuité est essentielle (asymptote verticale).",
                ),
              ], finalAnswerFr: r"Non prolongeable"),
            ),
          ],
        ),
        _ex(
          3,
          'TVI — existence et unicité',
          5,
          "Soit \$f(x) = x^3 + 2x - 5\$.",
          [
            _qSubs(
              1,
              "Étude de l'équation \$f(x) = 0\$.",
              4,
              [
                _sub(
                  'a',
                  "Justifier que l'équation admet au moins une solution dans \$[1, 2]\$.",
                  2,
                  _sol([
                    _step(
                      "\$f\$ est polynômiale → **continue sur \$\\mathbb{R}\$**, en particulier sur \$[1, 2]\$.",
                    ),
                    _step(
                      "\$f(1) = 1 + 2 - 5 = -2 < 0\$ et \$f(2) = 8 + 4 - 5 = 7 > 0\$. Signes opposés → par **TVI**, \$\\exists \\alpha \\in [1, 2] : f(\\alpha) = 0\$.",
                    ),
                  ], finalAnswerFr: r"$\exists \alpha \in [1, 2]$"),
                ),
                _sub(
                  'b',
                  "Montrer l'unicité.",
                  1,
                  _sol([
                    _step(
                      "\$f'(x) = 3x^2 + 2 > 0\$ pour tout \$x\$ (somme de positifs). Donc \$f\$ est **strictement croissante** sur \$\\mathbb{R}\$ → la solution est unique.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Donner un encadrement à \$10^{-1}\$ près.",
                  1,
                  _sol([
                    _step(
                      "\$f(1{,}3) = 2{,}197 + 2{,}6 - 5 = -0{,}203 < 0\$. \$f(1{,}4) = 2{,}744 + 2{,}8 - 5 = 0{,}544 > 0\$. Donc \$\\alpha \\in ]1{,}3,\\, 1{,}4[\$.",
                    ),
                  ], finalAnswerFr: r"$\alpha \in ]1{,}3,\, 1{,}4[$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Équation transcendante',
          5,
          "Soit \$g(x) = e^x + x - 3\$.",
          [
            _q(
              1,
              "Montrer que \$g(x) = 0\$ admet une unique solution \$\\alpha\$ dans \$\\mathbb{R}\$.",
              3,
              _sol([
                _step(
                  "**Existence** : \$g\$ est continue (somme de continues). \$g(0) = 1 + 0 - 3 = -2 < 0\$ ; \$g(1) = e + 1 - 3 \\approx 0{,}72 > 0\$. TVI sur \$[0, 1]\$ → solution.",
                ),
                _step(
                  "**Unicité** : \$g'(x) = e^x + 1 > 0\$ partout → \$g\$ strictement croissante → solution unique.",
                ),
                _step(
                  "**Domaine global** : \$\\lim_{-\\infty} g = 0 - \\infty - 3 = -\\infty\$ ; \$\\lim_{+\\infty} g = +\\infty\$. \$g\$ atteint toute valeur réelle, l'unique solution est dans \$\\mathbb{R}\$.",
                ),
              ], finalAnswerFr: r"$\exists ! \alpha \approx 0{,}79$"),
            ),
            _q(
              2,
              "Donner un encadrement de \$\\alpha\$ à \$10^{-2}\$ près par dichotomie.",
              2,
              _sol([
                _step(
                  "On part de \$[0, 1]\$. Milieu \$0{,}5\$ : \$g(0{,}5) = e^{0{,}5} + 0{,}5 - 3 \\approx 1{,}649 - 2{,}5 = -0{,}851 < 0\$ → \$\\alpha \\in ]0{,}5, 1[\$.",
                ),
                _step(
                  "Milieu \$0{,}75\$ : \$g(0{,}75) \\approx 2{,}117 + 0{,}75 - 3 = -0{,}133 < 0\$ → \$\\alpha \\in ]0{,}75, 1[\$.",
                ),
                _step(
                  "Milieu \$0{,}875\$ : \$g(0{,}875) \\approx 2{,}399 + 0{,}875 - 3 = 0{,}274 > 0\$ → \$\\alpha \\in ]0{,}75, 0{,}875[\$. Milieu \$0{,}8125\$ : \$g \\approx 2{,}253 + 0{,}8125 - 3 = 0{,}066 > 0\$ → \$\\alpha \\in ]0{,}75, 0{,}8125[\$. Encore quelques étapes : \$\\alpha \\approx 0{,}79\$.",
                  tipFr:
                      "**Dichotomie** : précision divisée par 2 à chaque étape. Pour \$10^{-2}\$ partant de longueur 1, il faut environ 7 itérations.",
                ),
              ], finalAnswerFr: r"$\alpha \approx 0{,}79$"),
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
          'Dérivées usuelles et linéarité',
          5,
          "Calculer la dérivée de chaque fonction.",
          [
            _q(
              1,
              "\$f(x) = 3x^4 - 2x^3 + 5x - 7\$.",
              1,
              _sol([
                _step(
                  "Linéarité — dériver terme à terme : \$f'(x) = 12 x^3 - 6 x^2 + 5\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = 12x^3 - 6x^2 + 5$"),
            ),
            _q(
              2,
              "\$g(x) = \\dfrac{2}{x^3} + 4 \\sqrt x\$ (sur \$]0, +\\infty[\$).",
              2,
              _sol([
                _step(
                  "Réécrire en puissances : \$g(x) = 2 x^{-3} + 4 x^{1/2}\$.",
                ),
                _step(
                  "\$g'(x) = 2 \\cdot (-3) x^{-4} + 4 \\cdot (1/2) x^{-1/2} = -\\dfrac{6}{x^4} + \\dfrac{2}{\\sqrt x}\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = -6/x^4 + 2/\sqrt x$"),
            ),
            _q(
              3,
              "\$h(x) = \\cos x + 2 \\sin x\$.",
              2,
              _sol([
                _step(
                  "\$(\\cos x)' = -\\sin x\$ et \$(\\sin x)' = \\cos x\$. Linéarité : \$h'(x) = -\\sin x + 2 \\cos x\$.",
                ),
              ], finalAnswerFr: r"$h'(x) = -\sin x + 2\cos x$"),
            ),
          ],
        ),
        _ex(
          2,
          'Produit et quotient',
          5,
          "Appliquer les règles \$(uv)'\$ et \$(u/v)'\$.",
          [
            _q(
              1,
              "\$f(x) = x \\sin x\$.",
              1,
              _sol([
                _step(
                  "**Produit** : \$u = x\$, \$u' = 1\$ ; \$v = \\sin x\$, \$v' = \\cos x\$.",
                ),
                _step(
                  "\$f'(x) = 1 \\cdot \\sin x + x \\cdot \\cos x = \\sin x + x \\cos x\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = \sin x + x \cos x$"),
            ),
            _q(
              2,
              "\$g(x) = (x^2 + 1)(2x - 3)\$.",
              2,
              _sol([
                _step(
                  "\$g'(x) = 2x \\cdot (2x - 3) + (x^2 + 1) \\cdot 2 = 4x^2 - 6x + 2x^2 + 2 = 6x^2 - 6x + 2\$.",
                ),
                _step(
                  "Vérification (développer \$g\$ puis dériver) : \$g(x) = 2x^3 - 3x^2 + 2x - 3\$, \$g'(x) = 6x^2 - 6x + 2\$ ✓.",
                ),
              ], finalAnswerFr: r"$g'(x) = 6x^2 - 6x + 2$"),
            ),
            _q(
              3,
              "\$h(x) = \\dfrac{x}{x^2 + 1}\$.",
              2,
              _sol([
                _step(
                  "**Quotient** : \$u = x\$, \$u' = 1\$ ; \$v = x^2 + 1\$, \$v' = 2x\$.",
                ),
                _step(
                  "\$(u/v)' = (u'v - uv')/v^2 = \\dfrac{1 \\cdot (x^2 + 1) - x \\cdot 2x}{(x^2 + 1)^2} = \\dfrac{x^2 + 1 - 2x^2}{(x^2+1)^2} = \\dfrac{1 - x^2}{(x^2+1)^2}\$.",
                  mistakeFr:
                      "Ne pas oublier le signe **moins** au milieu : \$u'v - uv'\$ (et pas \$u'v + uv'\$).",
                ),
              ], finalAnswerFr: r"$h'(x) = (1 - x^2)/(x^2+1)^2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Composition (règle de la chaîne)',
          5,
          "Appliquer \$(f \\circ g)' = (f' \\circ g) \\cdot g'\$.",
          [
            _q(
              1,
              "\$f(x) = (3x + 1)^4\$.",
              2,
              _sol([
                _step(
                  "Composition \$u^4\$ avec \$u(x) = 3x + 1\$. Règle : \$(u^n)' = n u^{n-1} u'\$.",
                ),
                _step(
                  "\$u' = 3\$, donc \$f'(x) = 4 (3x + 1)^3 \\cdot 3 = 12(3x + 1)^3\$.",
                  mistakeFr:
                      "Erreur fréquente : oublier le \$\\times u' = \\times 3\$. La dérivée de l'intérieur est essentielle.",
                ),
              ], finalAnswerFr: r"$f'(x) = 12(3x+1)^3$"),
            ),
            _q(
              2,
              "\$g(x) = \\sqrt{x^2 + 1}\$.",
              2,
              _sol([
                _step(
                  "Composition \$\\sqrt u\$ avec \$u = x^2 + 1\$. Règle : \$(\\sqrt u)' = u' / (2 \\sqrt u)\$.",
                ),
                _step(
                  "\$u' = 2x\$, donc \$g'(x) = \\dfrac{2x}{2\\sqrt{x^2 + 1}} = \\dfrac{x}{\\sqrt{x^2 + 1}}\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = x/\sqrt{x^2+1}$"),
            ),
            _q(
              3,
              "\$h(x) = \\sin(2x + \\pi/3)\$.",
              1,
              _sol([
                _step(
                  "Composition \$\\sin u\$ avec \$u = 2x + \\pi/3\$. \$u' = 2\$.",
                ),
                _step(
                  "\$h'(x) = \\cos(2x + \\pi/3) \\cdot 2 = 2 \\cos(2x + \\pi/3)\$.",
                ),
              ], finalAnswerFr: r"$h'(x) = 2 \cos(2x + \pi/3)$"),
            ),
          ],
        ),
        _ex(
          4,
          'Tangentes',
          5,
          "Soit \$f(x) = x^3 - 3x^2 + 2\$.",
          [
            _q(
              1,
              "Donner l'équation de la tangente \$T\$ à la courbe en \$x_0 = 1\$.",
              3,
              _sol([
                _step(
                  "Équation de la tangente : \$y = f'(x_0)(x - x_0) + f(x_0)\$.",
                ),
                _step(
                  "\$f(1) = 1 - 3 + 2 = 0\$. \$f'(x) = 3x^2 - 6x\$, donc \$f'(1) = 3 - 6 = -3\$.",
                ),
                _step(
                  "Donc \$T : y = -3(x - 1) + 0 = -3x + 3\$.",
                ),
              ], finalAnswerFr: r"$T : y = -3x + 3$"),
            ),
            _q(
              2,
              "En quels points la tangente est-elle horizontale ?",
              2,
              _sol([
                _step(
                  "Tangente horizontale \$\\iff\$ pente nulle \$\\iff f'(x) = 0 \\iff 3x^2 - 6x = 0 \\iff 3x(x - 2) = 0\$.",
                ),
                _step(
                  "Solutions : \$x = 0\$ (\$f(0) = 2\$) et \$x = 2\$ (\$f(2) = 8 - 12 + 2 = -2\$). Tangentes horizontales aux points \$(0, 2)\$ et \$(2, -2)\$.",
                  tipFr:
                      "Les tangentes horizontales correspondent aux **extrema locaux** ; ici \$f(0) = 2\$ est un max local et \$f(2) = -2\$ un min local.",
                ),
              ], finalAnswerFr: r"$(0, 2)$ et $(2, -2)$"),
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
          "Étude de variations, extrema, optimisation, démonstration d'inégalités via étude de fonction.",
      exercices: [
        _ex(
          1,
          'Étude de variations',
          5,
          "Soit \$f(x) = x^3 - 3x + 1\$ définie sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Calculer \$f'(x)\$, étudier son signe et dresser le tableau de variations.",
              3,
              _sol([
                _step(
                  "\$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x - 1)(x + 1)\$.",
                ),
                _step(
                  "Signe de \$f'\$ : \$f'(x) > 0\$ sur \$]-\\infty, -1[\$ ; \$f'(x) < 0\$ sur \$]-1, 1[\$ ; \$f'(x) > 0\$ sur \$]1, +\\infty[\$.",
                ),
                _step(
                  "Variations : \$f\$ **croissante** sur \$]-\\infty, -1]\$, **décroissante** sur \$[-1, 1]\$, **croissante** sur \$[1, +\\infty[\$.",
                ),
              ], finalAnswerFr: r"Max local en $-1$, min local en $1$"),
            ),
            _q(
              2,
              "Donner les extrema locaux et leurs valeurs.",
              2,
              _sol([
                _step(
                  "**Maximum local** en \$x = -1\$ : \$f(-1) = -1 + 3 + 1 = 3\$.",
                ),
                _step(
                  "**Minimum local** en \$x = 1\$ : \$f(1) = 1 - 3 + 1 = -1\$.",
                  tipFr:
                      "À un extremum local d'une fonction dérivable : la tangente est horizontale, donc \$f'\$ s'annule en changeant de signe.",
                ),
              ], finalAnswerFr: r"$f(-1) = 3$, $f(1) = -1$"),
            ),
          ],
        ),
        _ex(
          2,
          'Optimisation — boîte à volume maximal',
          5,
          "Une feuille de carton carrée de côté 30 cm. On découpe un carré de côté \$x\$ à chaque coin, puis on plie pour former une boîte sans couvercle. Volume : \$V(x) = x(30 - 2x)^2\$ pour \$0 < x < 15\$.",
          [
            _q(
              1,
              "Calculer \$V'(x)\$ et trouver la valeur de \$x\$ qui maximise \$V\$.",
              4,
              _sol([
                _step(
                  "**Produit** : \$V'(x) = 1 \\cdot (30 - 2x)^2 + x \\cdot 2(30 - 2x)(-2) = (30 - 2x)^2 - 4x(30 - 2x)\$.",
                ),
                _step(
                  "Factoriser par \$(30 - 2x)\$ : \$V'(x) = (30 - 2x)[(30 - 2x) - 4x] = (30 - 2x)(30 - 6x) = 12(15 - x)(5 - x)\$.",
                ),
                _step(
                  "Racines : \$x = 5\$ et \$x = 15\$ (exclu). Sur \$]0, 5[\$ : \$V'(0) = 12 \\cdot 15 \\cdot 5 = 900 > 0\$. Sur \$]5, 15[\$ : \$V'(10) = 12 \\cdot 5 \\cdot (-5) = -300 < 0\$. \$V'\$ s'annule en \$x = 5\$ en changeant de signe → **maximum**.",
                ),
                _step(
                  "Volume maximum : \$V(5) = 5 \\cdot 20^2 = 5 \\cdot 400 = 2000\\,\\text{cm}^3 = 2\\,\\text{L}\$.",
                  tipFr:
                      "Recette d'optimisation : (1) exprimer la grandeur à optimiser, (2) délimiter le domaine, (3) dériver, (4) trouver les points critiques, (5) vérifier le signe de la dérivée.",
                ),
              ], finalAnswerFr: r"$x = 5$ cm, $V_{\max} = 2000$ cm³"),
            ),
          ],
        ),
        _ex(
          3,
          'Inégalité par étude de fonction',
          5,
          "Démontrer que pour tout \$x > 0\$, \$\\ln(1 + x) < x\$.",
          [
            _qSubs(
              1,
              "Étude de la fonction \$f(x) = x - \\ln(1 + x)\$.",
              4,
              [
                _sub(
                  'a',
                  "Donner le domaine de \$f\$ et calculer \$f(0)\$.",
                  1,
                  _sol([
                    _step(
                      "\$\\ln(1 + x)\$ définie pour \$1 + x > 0 \\iff x > -1\$. Domaine : \$]-1, +\\infty[\$.",
                    ),
                    _step(
                      "\$f(0) = 0 - \\ln 1 = 0\$.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Calculer \$f'(x)\$ et étudier son signe sur \$]0, +\\infty[\$.",
                  2,
                  _sol([
                    _step(
                      "\$f'(x) = 1 - \\dfrac{1}{1 + x} = \\dfrac{(1 + x) - 1}{1 + x} = \\dfrac{x}{1 + x}\$.",
                    ),
                    _step(
                      "Sur \$]0, +\\infty[\$ : \$x > 0\$ et \$1 + x > 0\$, donc \$f'(x) > 0\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Conclure.",
                  1,
                  _sol([
                    _step(
                      "\$f\$ est strictement croissante sur \$[0, +\\infty[\$ avec \$f(0) = 0\$. Donc pour \$x > 0\$, \$f(x) > 0 \\iff x - \\ln(1 + x) > 0 \\iff \\ln(1 + x) < x\$ ✓.",
                      tipFr:
                          "Pour démontrer une inégalité \$g(x) < h(x)\$, étudier la fonction différence \$h - g\$ et montrer qu'elle est positive.",
                    ),
                  ]),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Étude complète',
          5,
          "Soit \$f(x) = \\dfrac{x^2 - 1}{x}\$ définie sur \$\\mathbb{R}^*\$.",
          [
            _qSubs(
              1,
              "Étude complète.",
              5,
              [
                _sub(
                  'a',
                  "Calculer \$f'(x)\$ et étudier son signe.",
                  2,
                  _sol([
                    _step(
                      "Réécrire : \$f(x) = x - 1/x\$. Donc \$f'(x) = 1 + 1/x^2\$.",
                    ),
                    _step(
                      "\$f'(x) = 1 + 1/x^2 > 0\$ partout sur \$\\mathbb{R}^*\$ → \$f\$ **strictement croissante** sur chacun de ses intervalles \$]-\\infty, 0[\$ et \$]0, +\\infty[\$.",
                    ),
                  ], finalAnswerFr: r"$f$ strictement croissante sur $\mathbb{R}^*$"),
                ),
                _sub(
                  'b',
                  "Calculer les limites aux bornes.",
                  2,
                  _sol([
                    _step(
                      "À \$\\pm \\infty\$ : \$f(x) = x - 1/x \\to \\pm \\infty\$ (terme dominant \$x\$).",
                    ),
                    _step(
                      "En \$0^+\$ : \$f(x) = x - 1/x \\to 0 - (+\\infty) = -\\infty\$. En \$0^-\$ : \$-1/x \\to +\\infty\$, donc \$f \\to +\\infty\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Donner les asymptotes.",
                  1,
                  _sol([
                    _step(
                      "**Verticale** : \$x = 0\$ (limites infinies).",
                    ),
                    _step(
                      "**Oblique** en \$\\pm \\infty\$ : \$f(x) - x = -1/x \\to 0\$, donc la droite \$y = x\$ est asymptote oblique.",
                      tipFr:
                          "Asymptote oblique \$y = ax + b\$ \$\\iff f(x) - (ax + b) \\to 0\$ en \$\\pm\\infty\$.",
                    ),
                  ], finalAnswerFr: r"V: $x = 0$; O: $y = x$"),
                ),
              ],
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLnFunction() => _paper(
      titleFr: 'Épreuve type — Fonction logarithme népérien',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Fonction \$\\ln\$ définie sur \$]0, +\\infty[\$, \$\\ln 1 = 0\$, \$\\ln e = 1\$. Propriétés : \$\\ln(ab) = \\ln a + \\ln b\$, \$(\\ln u)' = u'/u\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques et équations',
          5,
          "Rappel : \$\\ln(ab) = \\ln a + \\ln b\$, \$\\ln(a/b) = \\ln a - \\ln b\$, \$\\ln(a^n) = n \\ln a\$ pour \$a, b > 0\$.",
          [
            _q(
              1,
              "Simplifier \$A = \\ln 8 + \\ln 3 - 2 \\ln 2 - \\ln 6\$.",
              2,
              _sol([
                _step(
                  "Réécrire : \$2 \\ln 2 = \\ln 4\$ et regrouper. \$A = \\ln 8 - \\ln 4 + \\ln 3 - \\ln 6 = \\ln(8/4) + \\ln(3/6) = \\ln 2 + \\ln(1/2)\$.",
                ),
                _step(
                  "\$\\ln(1/2) = -\\ln 2\$, donc \$A = \\ln 2 - \\ln 2 = 0\$.",
                  tipFr:
                      "Regrouper les \$\\ln\$ par somme/différence avant de calculer numériquement — souvent tout se simplifie.",
                ),
              ], finalAnswerFr: r"$A = 0$"),
            ),
            _q(
              2,
              "Résoudre dans \$\\mathbb{R}\$ : \$\\ln(2x - 1) = \\ln(x + 3)\$.",
              2,
              _sol([
                _step(
                  "**Domaine** : \$2x - 1 > 0\$ et \$x + 3 > 0\$, soit \$x > 1/2\$ (plus restrictif).",
                ),
                _step(
                  "Par injectivité de \$\\ln\$ : \$\\ln u = \\ln v \\iff u = v\$. \$2x - 1 = x + 3 \\iff x = 4\$.",
                ),
                _step(
                  "\$x = 4 > 1/2\$ ✓ → \$S = \\{4\\}\$.",
                  mistakeFr:
                      "Toujours vérifier les conditions d'existence avant d'utiliser l'injectivité — une solution 'algébrique' peut être hors-domaine.",
                ),
              ], finalAnswerFr: r"$S = \{4\}$"),
            ),
            _q(
              3,
              "Résoudre \$\\ln(x^2 - 1) = \\ln 3 + \\ln(x + 1)\$.",
              1,
              _sol([
                _step(
                  "**Domaine** : \$x^2 - 1 > 0 \\iff x < -1\$ ou \$x > 1\$ ; \$x + 1 > 0 \\iff x > -1\$. Intersection : \$x > 1\$.",
                ),
                _step(
                  "Équation : \$\\ln(x^2 - 1) - \\ln(x + 1) = \\ln 3 \\iff \\ln\\left(\\dfrac{x^2 - 1}{x + 1}\\right) = \\ln 3 \\iff \\ln(x - 1) = \\ln 3\$ (car \$(x^2-1)/(x+1) = x - 1\$).",
                ),
                _step(
                  "Donc \$x - 1 = 3 \\iff x = 4 > 1\$ ✓. \$S = \\{4\\}\$.",
                ),
              ], finalAnswerFr: r"$S = \{4\}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Dérivation et étude',
          5,
          "Soit \$f(x) = x - \\ln x\$ sur \$]0, +\\infty[\$.",
          [
            _qSubs(
              1,
              "Étude de \$f\$.",
              4,
              [
                _sub(
                  'a',
                  "Calculer \$f'(x)\$ et étudier son signe.",
                  2,
                  _sol([
                    _step(
                      "\$f'(x) = 1 - 1/x = \\dfrac{x - 1}{x}\$.",
                    ),
                    _step(
                      "Sur \$]0, +\\infty[\$ : \$x > 0\$ → signe de \$f'\$ = signe de \$x - 1\$. \$f' < 0\$ sur \$]0, 1[\$, \$f' > 0\$ sur \$]1, +\\infty[\$, \$f'(1) = 0\$.",
                    ),
                  ], finalAnswerFr: r"$f'(x) = (x-1)/x$"),
                ),
                _sub(
                  'b',
                  "Tableau de variations et minimum.",
                  1,
                  _sol([
                    _step(
                      "\$f\$ décroît sur \$]0, 1]\$, croît sur \$[1, +\\infty[\$. **Minimum global** en \$x = 1\$ : \$f(1) = 1 - \\ln 1 = 1\$.",
                    ),
                    _step(
                      "**Conséquence** : pour tout \$x > 0\$, \$f(x) \\ge 1 \\iff x - \\ln x \\ge 1 \\iff \\ln x \\le x - 1\$. Inégalité classique.",
                      tipFr:
                          "L'inégalité \$\\ln x \\le x - 1\$ (égalité en 1) est très utile pour borner \$\\ln\$ par un polynôme.",
                    ),
                  ], finalAnswerFr: r"Min $f(1) = 1$; $\ln x \le x - 1$"),
                ),
                _sub(
                  'c',
                  "Limites aux bornes.",
                  1,
                  _sol([
                    _step(
                      "En \$0^+\$ : \$\\ln x \\to -\\infty\$ donc \$f(x) = x - \\ln x \\to 0 - (-\\infty) = +\\infty\$.",
                    ),
                    _step(
                      "En \$+\\infty\$ : factoriser \$f(x) = x(1 - \\ln x / x)\$. Par croissances comparées, \$\\ln x / x \\to 0\$, donc \$f(x) \\to +\\infty\$.",
                    ),
                  ], finalAnswerFr: r"$+\infty$ aux deux bornes"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          3,
          'Composition',
          5,
          "Soit \$g(x) = \\ln(x^2 + 1)\$ sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Justifier le domaine.",
              1,
              _sol([
                _step(
                  "\$x^2 + 1 \\ge 1 > 0\$ pour tout \$x \\in \\mathbb{R}\$, donc \$\\ln(x^2 + 1)\$ est défini partout. \$\\mathcal D_g = \\mathbb{R}\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer \$g'(x)\$ et étudier les variations.",
              2,
              _sol([
                _step(
                  "**Règle** : \$(\\ln u)' = u'/u\$. Ici \$u = x^2 + 1\$, \$u' = 2x\$.",
                ),
                _step(
                  "\$g'(x) = \\dfrac{2x}{x^2 + 1}\$. Dénominateur \$> 0\$, donc signe = signe de \$2x\$.",
                ),
                _step(
                  "\$g\$ décroît sur \$]-\\infty, 0]\$, croît sur \$[0, +\\infty[\$. **Minimum** en \$x = 0\$ : \$g(0) = \\ln 1 = 0\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = 2x/(x^2+1)$; min $g(0) = 0$"),
            ),
            _q(
              3,
              "Limites en \$\\pm\\infty\$.",
              2,
              _sol([
                _step(
                  "Quand \$x \\to \\pm\\infty\$, \$x^2 + 1 \\to +\\infty\$ et \$\\ln t \\to +\\infty\$ quand \$t \\to +\\infty\$.",
                ),
                _step(
                  "Par composition : \$\\lim_{\\pm\\infty} g = +\\infty\$.",
                  tipFr:
                      "\$g\$ est paire (\$g(-x) = g(x)\$) — mêmes valeurs et mêmes limites en \$\\pm\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim = +\infty$ aux deux bornes"),
            ),
          ],
        ),
        _ex(
          4,
          'Inégalité',
          5,
          "Démontrer pour tout \$x > 0\$ : \$\\ln(1 + x) \\le x\$.",
          [
            _q(
              1,
              "Étudier la fonction \$h(x) = x - \\ln(1 + x)\$ sur \$]-1, +\\infty[\$.",
              4,
              _sol([
                _step(
                  "\$h(0) = 0 - \\ln 1 = 0\$.",
                ),
                _step(
                  "\$h'(x) = 1 - \\dfrac{1}{1 + x} = \\dfrac{x}{1 + x}\$.",
                ),
                _step(
                  "Sur \$]0, +\\infty[\$ : \$x > 0\$ et \$1 + x > 0\$ → \$h'(x) > 0\$. \$h\$ strictement croissante.",
                ),
                _step(
                  "Donc pour \$x > 0\$ : \$h(x) > h(0) = 0 \\iff x - \\ln(1+x) > 0 \\iff \\ln(1 + x) < x\$ ✓.",
                  tipFr:
                      "Stratégie classique : pour montrer \$f < g\$ sur \$I\$, étudier \$g - f\$ et montrer qu'elle est strictement positive.",
                ),
              ], finalAnswerFr: r"$\ln(1+x) < x$ pour $x > 0$"),
            ),
            _q(
              2,
              "Application : encadrer \$\\ln 2\$.",
              1,
              _sol([
                _step(
                  "Avec \$x = 1\$ : \$\\ln 2 < 1\$. On peut aussi montrer \$\\ln(1+x) \\ge x - x^2/2\$ pour \$x \\ge 0\$, ce qui donne \$\\ln 2 \\ge 1/2\$. Encadrement \$1/2 < \\ln 2 < 1\$. Valeur exacte \$\\ln 2 \\approx 0{,}693\$.",
                ),
              ], finalAnswerFr: r"$0{,}5 < \ln 2 < 1$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperExpFunction() => _paper(
      titleFr: 'Épreuve type — Fonction exponentielle',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Fonction \$\\exp(x) = e^x\$ : \$(e^x)' = e^x\$, \$e^x > 0\$ partout, \$e^0 = 1\$. Croissances comparées \$e^x \\gg x^n\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques',
          5,
          "Rappel : \$e^a \\cdot e^b = e^{a+b}\$, \$e^a/e^b = e^{a-b}\$, \$(e^a)^n = e^{na}\$, \$e^{-a} = 1/e^a\$.",
          [
            _q(
              1,
              "Simplifier \$A = \\dfrac{e^3 \\cdot e^{-1}}{e^4}\$.",
              1,
              _sol([
                _step(
                  "Numérateur : \$e^3 \\cdot e^{-1} = e^{3-1} = e^2\$.",
                ),
                _step(
                  "Quotient : \$e^2 / e^4 = e^{2-4} = e^{-2}\$.",
                ),
              ], finalAnswerFr: r"$A = e^{-2}$"),
            ),
            _q(
              2,
              "Résoudre \$e^{2x} - 3 e^x + 2 = 0\$.",
              3,
              _sol([
                _step(
                  "**Astuce** : poser \$X = e^x\$ (\$X > 0\$). \$e^{2x} = X^2\$, l'équation devient \$X^2 - 3X + 2 = 0\$.",
                ),
                _step(
                  "Discriminant : \$\\Delta = 9 - 8 = 1\$. Racines : \$X = 2\$ ou \$X = 1\$. Les deux sont positives ✓.",
                ),
                _step(
                  "Retour à \$x\$ : \$e^x = 2 \\iff x = \\ln 2\$ ; \$e^x = 1 \\iff x = 0\$. \$S = \\{0, \\ln 2\\}\$.",
                  tipFr:
                      "Pour une équation polynomiale en \$e^x\$, substituer \$X = e^x\$ ramène à un polynôme classique.",
                ),
              ], finalAnswerFr: r"$S = \{0, \ln 2\}$"),
            ),
            _q(
              3,
              "Résoudre \$e^x \\ge 5\$.",
              1,
              _sol([
                _step(
                  "\$\\ln\$ étant strictement croissante, on applique \$\\ln\$ aux deux membres : \$e^x \\ge 5 \\iff x \\ge \\ln 5 \\approx 1{,}609\$.",
                ),
              ], finalAnswerFr: r"$x \ge \ln 5$"),
            ),
          ],
        ),
        _ex(
          2,
          'Étude de \$f(x) = x e^{-x}\$',
          5,
          "Soit \$f(x) = x e^{-x}\$ sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Calculer \$f'(x)\$ et étudier son signe.",
              2,
              _sol([
                _step(
                  "**Produit** : \$u = x\$ (\$u' = 1\$), \$v = e^{-x}\$ (\$v' = -e^{-x}\$).",
                ),
                _step(
                  "\$f'(x) = 1 \\cdot e^{-x} + x \\cdot (-e^{-x}) = e^{-x}(1 - x)\$.",
                ),
                _step(
                  "\$e^{-x} > 0\$ toujours → signe de \$f'\$ = signe de \$1 - x\$. \$f' > 0\$ sur \$]-\\infty, 1[\$, \$f' < 0\$ sur \$]1, +\\infty[\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = e^{-x}(1 - x)$"),
            ),
            _q(
              2,
              "Tableau de variations et extremum.",
              1,
              _sol([
                _step(
                  "\$f\$ croît sur \$]-\\infty, 1]\$, décroît sur \$[1, +\\infty[\$. **Maximum global** en \$x = 1\$ : \$f(1) = 1 \\cdot e^{-1} = 1/e \\approx 0{,}368\$.",
                ),
              ], finalAnswerFr: r"Max $f(1) = 1/e$"),
            ),
            _q(
              3,
              "Limites en \$\\pm\\infty\$.",
              2,
              _sol([
                _step(
                  "En \$-\\infty\$ : \$x \\to -\\infty\$ et \$e^{-x} \\to +\\infty\$ — produit (négatif) × (positif) → \$f \\to -\\infty\$.",
                ),
                _step(
                  "En \$+\\infty\$ : \$f(x) = x/e^x\$. Par croissances comparées, \$\\lim x/e^x = 0\$. Donc \$f \\to 0\$.",
                  tipFr:
                      "**Croissances comparées** : \$\\lim_{x \\to +\\infty} x^n/e^x = 0\$ pour tout \$n\$. L'exponentielle domine toute puissance.",
                ),
              ], finalAnswerFr: r"$-\infty$ et $0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Limites et croissances comparées',
          5,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^3}\$.",
              1,
              _sol([
                _step(
                  "Croissances comparées : \$\\lim e^x / x^n = +\\infty\$. Donc limite = \$+\\infty\$.",
                ),
              ], finalAnswerFr: r"$+\infty$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} x^2 e^{-x}\$.",
              2,
              _sol([
                _step(
                  "Réécrire : \$x^2 e^{-x} = x^2/e^x\$. Forme \$\\infty/\\infty\$.",
                ),
                _step(
                  "Par croissances comparées : \$\\lim x^2/e^x = 0\$. Donc limite = 0.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$. Reconnaître le **taux d'accroissement** de \$\\exp\$ en 0 : \$\\dfrac{e^x - e^0}{x - 0}\$. Sa limite quand \$x \\to 0\$ est \$\\exp'(0) = e^0 = 1\$.",
                  tipFr:
                      "**Limites usuelles** : \$\\lim_0 (e^x - 1)/x = 1\$, \$\\lim_0 \\sin x/x = 1\$, \$\\lim_0 \\ln(1+x)/x = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
          ],
        ),
        _ex(
          4,
          'Modèle de décroissance — radioactivité',
          5,
          "Une quantité \$Q(t)\$ vérifie \$Q(t) = Q_0 e^{-\\lambda t}\$ avec \$Q_0 = 100\$ et \$Q(2) = 60\$.",
          [
            _q(
              1,
              "Calculer la constante \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "\$Q(2) = 100 e^{-2\\lambda} = 60 \\iff e^{-2\\lambda} = 0{,}6\$.",
                ),
                _step(
                  "Appliquer \$\\ln\$ : \$-2\\lambda = \\ln(0{,}6)\$, donc \$\\lambda = -\\ln(0{,}6)/2 = \\ln(5/3)/2 \\approx 0{,}255\$.",
                ),
              ], finalAnswerFr: r"$\lambda \approx 0{,}255$"),
            ),
            _q(
              2,
              "Déterminer la demi-vie \$t_{1/2}\$.",
              2,
              _sol([
                _step(
                  "\$Q(t_{1/2}) = Q_0/2 \\iff e^{-\\lambda t_{1/2}} = 1/2 \\iff -\\lambda t_{1/2} = -\\ln 2 \\iff t_{1/2} = \\ln 2 / \\lambda\$.",
                ),
                _step(
                  "Avec \$\\lambda \\approx 0{,}255\$ : \$t_{1/2} \\approx 0{,}693/0{,}255 \\approx 2{,}72\$.",
                  tipFr:
                      "**Formule fondamentale** : \$t_{1/2} = \\ln 2 / \\lambda\$. Indépendante de \$Q_0\$ — caractéristique du matériau.",
                ),
              ], finalAnswerFr: r"$t_{1/2} \approx 2{,}72$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{t \\to +\\infty} Q(t)\$ et interpréter.",
              1,
              _sol([
                _step(
                  "Quand \$t \\to +\\infty\$, \$-\\lambda t \\to -\\infty\$, \$e^{-\\lambda t} \\to 0^+\$. Donc \$Q(t) \\to 0\$.",
                ),
                _step(
                  "**Interprétation** : décroissance asymptotique — il reste toujours un peu de matière. Cohérent avec la radioactivité.",
                ),
              ], finalAnswerFr: r"$\lim Q = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperPrimitives() => _paper(
      titleFr: 'Épreuve type — Primitives',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Primitive : fonction \$F\$ telle que \$F' = f\$. Unicité à une constante près. Primitives usuelles + formes \$u'/u\$, \$u' u^n\$, \$u' e^u\$.",
      exercices: [
        _ex(
          1,
          'Primitives usuelles',
          5,
          "Donner une primitive de chaque fonction sur le domaine indiqué.",
          [
            _q(
              1,
              "\$f(x) = x^3 - 4x + 2\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Linéarité et primitive de \$x^n\$ = \$x^{n+1}/(n+1)\$ (pour \$n \\ne -1\$).",
                ),
                _step(
                  "\$F(x) = \\dfrac{x^4}{4} - 2 x^2 + 2 x + C\$. Vérif : \$F'(x) = x^3 - 4x + 2\$ ✓.",
                ),
              ], finalAnswerFr: r"$F(x) = x^4/4 - 2x^2 + 2x + C$"),
            ),
            _q(
              2,
              "\$g(x) = 1/x^2\$ sur \$]0, +\\infty[\$.",
              1,
              _sol([
                _step(
                  "\$g(x) = x^{-2}\$, primitive \$x^{-1}/(-1) = -1/x\$. \$G(x) = -1/x + C\$.",
                ),
              ], finalAnswerFr: r"$G(x) = -1/x + C$"),
            ),
            _q(
              3,
              "\$h(x) = \\sin(2x) + \\cos(3x)\$ sur \$\\mathbb{R}\$.",
              2,
              _sol([
                _step(
                  "Pour \$\\sin(ax)\$, primitive \$-\\cos(ax)/a\$. Pour \$\\cos(ax)\$, primitive \$\\sin(ax)/a\$.",
                ),
                _step(
                  "\$H(x) = -\\cos(2x)/2 + \\sin(3x)/3 + C\$. Vérif : \$H'(x) = \\sin(2x) \\cdot 1 + \\cos(3x) \\cdot 1\$ ✓.",
                  tipFr:
                      "Le facteur \$1/a\$ compense la dérivation interne — sans lui, la dérivée serait \$a\\sin(ax)\$ au lieu de \$\\sin(ax)\$.",
                ),
              ], finalAnswerFr: r"$H(x) = -\cos(2x)/2 + \sin(3x)/3 + C$"),
            ),
            _q(
              4,
              "\$k(x) = e^{3x + 1}\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Primitive de \$e^{ax + b}\$ : \$e^{ax+b}/a\$. \$K(x) = e^{3x+1}/3 + C\$.",
                ),
              ], finalAnswerFr: r"$K(x) = e^{3x+1}/3 + C$"),
            ),
          ],
        ),
        _ex(
          2,
          'Primitive avec condition',
          5,
          "Soit \$f(x) = 3 x^2 - 6x + 5\$.",
          [
            _q(
              1,
              "Donner la forme générale des primitives.",
              1,
              _sol([
                _step(
                  "\$F(x) = x^3 - 3 x^2 + 5x + C\$ (où \$C \\in \\mathbb{R}\$).",
                ),
              ], finalAnswerFr: r"$F(x) = x^3 - 3x^2 + 5x + C$"),
            ),
            _q(
              2,
              "Trouver la primitive \$F\$ vérifiant \$F(1) = 0\$.",
              2,
              _sol([
                _step(
                  "Condition : \$F(1) = 1 - 3 + 5 + C = 3 + C = 0 \\Rightarrow C = -3\$.",
                ),
                _step(
                  "Donc \$F(x) = x^3 - 3 x^2 + 5x - 3\$. Vérification : \$F(1) = 1 - 3 + 5 - 3 = 0\$ ✓.",
                  tipFr:
                      "Toute primitive a une **constante d'intégration libre**, fixée par une condition initiale (souvent \$F(x_0) = y_0\$).",
                ),
              ], finalAnswerFr: r"$F(x) = x^3 - 3x^2 + 5x - 3$"),
            ),
            _q(
              3,
              "Combien y a-t-il de primitives de \$f\$ ?",
              2,
              _sol([
                _step(
                  "Il y a une **infinité** de primitives, toutes différant d'une constante (la 'constante d'intégration'). Une condition \$F(x_0) = y_0\$ en sélectionne exactement une.",
                ),
                _step(
                  "Mathématiquement : si \$F_1\$ et \$F_2\$ sont primitives de \$f\$ alors \$(F_1 - F_2)' = 0\$ donc \$F_1 - F_2 = \\text{const}\$.",
                ),
              ], finalAnswerFr: r"Infinité, à constante près"),
            ),
          ],
        ),
        _ex(
          3,
          'Formes reconnaissables',
          5,
          "Calculer les primitives en reconnaissant \$u'/u\$, \$u' u^n\$ ou \$u' e^u\$.",
          [
            _q(
              1,
              "\$\\int \\dfrac{2x}{x^2 + 1}\\,dx\$.",
              2,
              _sol([
                _step(
                  "Forme \$u'/u\$ avec \$u = x^2 + 1\$ (et \$u' = 2x\$). Primitive : \$\\ln|u| + C\$.",
                ),
                _step(
                  "Comme \$x^2 + 1 > 0\$, on omet la valeur absolue : \$\\ln(x^2 + 1) + C\$.",
                ),
              ], finalAnswerFr: r"$\ln(x^2+1) + C$"),
            ),
            _q(
              2,
              "\$\\int (2x + 1)^5\\,dx\$.",
              2,
              _sol([
                _step(
                  "Forme \$u' u^n\$ avec \$u = 2x + 1\$, \$u' = 2\$. Le facteur 2 manque — multiplier-diviser par 2.",
                ),
                _step(
                  "\$(2x + 1)^5 = \\dfrac{1}{2} \\cdot 2 (2x+1)^5\$. Primitive : \$\\dfrac{1}{2} \\cdot \\dfrac{(2x+1)^6}{6} = \\dfrac{(2x+1)^6}{12} + C\$.",
                ),
              ], finalAnswerFr: r"$(2x+1)^6/12 + C$"),
            ),
            _q(
              3,
              "\$\\int x e^{x^2}\\,dx\$.",
              1,
              _sol([
                _step(
                  "Forme \$u' e^u\$ avec \$u = x^2\$, \$u' = 2x\$. Facteur 2 manquant : \$x e^{x^2} = \\dfrac{1}{2} \\cdot 2x \\cdot e^{x^2}\$.",
                ),
                _step(
                  "Primitive : \$\\dfrac{1}{2} e^{x^2} + C\$. Vérif : \$\\dfrac{d}{dx}\\left(\\frac{1}{2} e^{x^2}\\right) = \\dfrac{1}{2} \\cdot 2x e^{x^2} = x e^{x^2}\$ ✓.",
                  tipFr:
                      "Pour \$u' e^u\$, la primitive est simplement \$e^u\$. Si le coefficient ne colle pas, ajuster par multiplication-division.",
                ),
              ], finalAnswerFr: r"$e^{x^2}/2 + C$"),
            ),
          ],
        ),
        _ex(
          4,
          'Intégration par parties (introduction)',
          5,
          "On rappelle : \$\\int u v' = [u v] - \\int u' v\$.",
          [
            _q(
              1,
              "Calculer \$\\int x \\cos x\\,dx\$.",
              3,
              _sol([
                _step(
                  "**Choix** : \$u = x\$ (devient simple en dérivant) et \$v' = \\cos x\$ (donc \$v = \\sin x\$).",
                ),
                _step(
                  "Application : \$\\int x \\cos x\\,dx = x \\sin x - \\int 1 \\cdot \\sin x\\,dx = x \\sin x + \\cos x + C\$.",
                ),
                _step(
                  "Vérification : \$(x \\sin x + \\cos x)' = \\sin x + x \\cos x - \\sin x = x \\cos x\$ ✓.",
                ),
              ], finalAnswerFr: r"$x \sin x + \cos x + C$"),
            ),
            _q(
              2,
              "Calculer \$\\int \\ln x\\,dx\$ par IPP.",
              2,
              _sol([
                _step(
                  "Astuce : \$\\ln x = 1 \\cdot \\ln x\$. Poser \$u = \\ln x\$ (\$u' = 1/x\$) et \$v' = 1\$ (\$v = x\$).",
                ),
                _step(
                  "\$\\int \\ln x\\,dx = x \\ln x - \\int (1/x) \\cdot x\\,dx = x \\ln x - \\int 1\\,dx = x \\ln x - x + C\$.",
                  tipFr:
                      "**Astuce célèbre** : pour intégrer \$\\ln\$, l'écrire \$1 \\cdot \\ln\$ et faire une IPP.",
                ),
              ], finalAnswerFr: r"$x \ln x - x + C$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperIntegralCalc() => _paper(
      titleFr: 'Épreuve type — Calcul intégral',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Intégrale définie via Newton-Leibniz : \$\\int_a^b f = F(b) - F(a)\$. Propriétés : linéarité, Chasles, positivité. Aires et valeur moyenne.",
      exercices: [
        _ex(
          1,
          'Calculs directs',
          5,
          "Calculer les intégrales.",
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
              ], finalAnswerFr: r"$14/3$"),
            ),
            _q(
              2,
              "\$\\int_1^e \\dfrac{dx}{x}\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$\\ln x\$. \$\\int = \\ln e - \\ln 1 = 1 - 0 = 1\$.",
                  tipFr:
                      "**Définition historique de \$e\$** : \$\\int_1^e dt/t = 1\$. \$e\$ est le réel dont le logarithme népérien vaut 1.",
                ),
              ], finalAnswerFr: r"$\int = 1$"),
            ),
            _q(
              3,
              "\$\\int_0^\\pi \\sin x\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$-\\cos x\$. \$\\int = -\\cos\\pi - (-\\cos 0) = 1 + 1 = 2\$.",
                ),
              ], finalAnswerFr: r"$\int = 2$"),
            ),
            _q(
              4,
              "\$\\int_0^1 e^x\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$e^x\$. \$\\int = e^1 - e^0 = e - 1 \\approx 1{,}718\$.",
                ),
              ], finalAnswerFr: r"$\int = e - 1$"),
            ),
          ],
        ),
        _ex(
          2,
          'Propriétés (Chasles, linéarité)',
          5,
          "Utiliser les propriétés.",
          [
            _q(
              1,
              "Sachant \$\\int_0^3 f = 7\$ et \$\\int_3^5 f = 2\$, calculer \$\\int_0^5 f\$.",
              1,
              _sol([
                _step(
                  "**Relation de Chasles** : \$\\int_a^c = \\int_a^b + \\int_b^c\$. Donc \$\\int_0^5 = 7 + 2 = 9\$.",
                ),
              ], finalAnswerFr: r"$\int = 9$"),
            ),
            _q(
              2,
              "Sachant \$\\int_0^1 f = 5\$ et \$\\int_0^1 g = 3\$, calculer \$\\int_0^1 (2f - 3g)\$.",
              2,
              _sol([
                _step(
                  "**Linéarité** : \$\\int (\\alpha f + \\beta g) = \\alpha \\int f + \\beta \\int g\$.",
                ),
                _step(
                  "\$\\int_0^1 (2f - 3g) = 2 \\cdot 5 - 3 \\cdot 3 = 10 - 9 = 1\$.",
                ),
              ], finalAnswerFr: r"$\int = 1$"),
            ),
            _q(
              3,
              "Si \$\\int_2^5 f = 4\$, calculer \$\\int_5^2 f\$.",
              1,
              _sol([
                _step(
                  "\$\\int_a^b = -\\int_b^a\$. Donc \$\\int_5^2 f = -4\$.",
                ),
              ], finalAnswerFr: r"$-4$"),
            ),
            _q(
              4,
              "Positivité : si \$f \\ge 0\$ et \$f\$ continue non identiquement nulle sur \$[a, b]\$, que dire de \$\\int_a^b f\$ ?",
              1,
              _sol([
                _step(
                  "\$\\int_a^b f > 0\$ strictement. La continuité + positivité non triviale garantit une aire strictement positive.",
                ),
              ], finalAnswerFr: r"$\int > 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Aire entre deux courbes',
          5,
          "Soient \$f(x) = x^2 + 1\$ et \$g(x) = x + 3\$.",
          [
            _q(
              1,
              "Trouver les points d'intersection.",
              2,
              _sol([
                _step(
                  "\$f(x) = g(x) \\iff x^2 + 1 = x + 3 \\iff x^2 - x - 2 = 0 \\iff (x - 2)(x + 1) = 0\$.",
                ),
                _step(
                  "Solutions : \$x = -1\$ et \$x = 2\$. Points : \$(-1, 2)\$ et \$(2, 5)\$.",
                ),
              ], finalAnswerFr: r"$x = -1$ et $x = 2$"),
            ),
            _q(
              2,
              "Calculer l'aire du domaine entre les deux courbes.",
              3,
              _sol([
                _step(
                  "Sur \$[-1, 2]\$, on compare : à \$x = 0\$, \$f(0) = 1\$ et \$g(0) = 3\$ → \$g \\ge f\$ sur l'intervalle.",
                ),
                _step(
                  "\$A = \\int_{-1}^{2} (g - f)\\,dx = \\int_{-1}^{2} (x + 3 - x^2 - 1)\\,dx = \\int_{-1}^{2} (-x^2 + x + 2)\\,dx\$.",
                ),
                _step(
                  "Primitive : \$-x^3/3 + x^2/2 + 2x\$. En 2 : \$-8/3 + 2 + 4 = -8/3 + 6 = 10/3\$. En -1 : \$1/3 + 1/2 - 2 = 2/6 + 3/6 - 12/6 = -7/6\$.",
                ),
                _step(
                  "Différence : \$10/3 - (-7/6) = 20/6 + 7/6 = 27/6 = 9/2\$.",
                  tipFr:
                      "**Aire entre deux courbes** : \$\\int_a^b |f - g|\\,dx\$. En pratique, identifier laquelle est au-dessus puis ne pas mettre la valeur absolue.",
                ),
              ], finalAnswerFr: r"$A = 9/2$"),
            ),
          ],
        ),
        _ex(
          4,
          'Valeur moyenne',
          5,
          "Valeur moyenne : \$\\bar f = \\dfrac{1}{b - a} \\int_a^b f\$.",
          [
            _q(
              1,
              "Calculer la valeur moyenne de \$f(x) = x^2\$ sur \$[0, 2]\$.",
              2,
              _sol([
                _step(
                  "\$\\int_0^2 x^2\\,dx = [x^3/3]_0^2 = 8/3\$.",
                ),
                _step(
                  "\$\\bar f = \\dfrac{1}{2 - 0} \\cdot \\dfrac{8}{3} = \\dfrac{4}{3}\$.",
                ),
                _step(
                  "**Interprétation** : si on remplaçait \$f\$ par sa moyenne constante \$4/3\$ sur \$[0, 2]\$, l'aire totale serait identique : \$(4/3) \\times 2 = 8/3\$ ✓.",
                ),
              ], finalAnswerFr: r"$\bar f = 4/3$"),
            ),
            _q(
              2,
              "Théorème de la moyenne : trouver \$c \\in [0, 2]\$ tel que \$f(c) = \\bar f\$.",
              2,
              _sol([
                _step(
                  "On cherche \$c^2 = 4/3\$, soit \$c = \\pm 2/\\sqrt 3\$. La valeur dans \$[0, 2]\$ : \$c = 2/\\sqrt 3 \\approx 1{,}155\$.",
                ),
                _step(
                  "**Théorème de la moyenne** : si \$f\$ est continue sur \$[a, b]\$, il existe \$c \\in [a, b]\$ tel que \$f(c) = \\bar f\$. Conséquence du TVI.",
                  tipFr:
                      "Ce théorème garantit l'existence du point — utile pour les démonstrations, même si on ne sait pas calculer \$c\$ explicitement.",
                ),
              ], finalAnswerFr: r"$c = 2/\sqrt 3$"),
            ),
            _q(
              3,
              "Application physique : un mobile a vitesse \$v(t) = 3 t^2\$ m/s sur \$[0, 4]\$ secondes. Distance parcourue ?",
              1,
              _sol([
                _step(
                  "Distance = \$\\int_0^4 v(t)\\,dt = \\int_0^4 3 t^2\\,dt = [t^3]_0^4 = 64\$ m.",
                ),
                _step(
                  "Vérification : vitesse moyenne = \$64/4 = 16\$ m/s. \$\\bar v = (1/4) \\int_0^4 3t^2 = 64/4 = 16\$ ✓.",
                ),
              ], finalAnswerFr: r"$d = 64$ m"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexAlgebra() => _paper(
      titleFr: 'Épreuve type — Nombres complexes (forme algébrique)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Forme algébrique \$z = a + bi\$ avec \$i^2 = -1\$. Module \$|z| = \\sqrt{a^2 + b^2}\$, conjugué \$\\bar z = a - bi\$, \$z \\bar z = |z|^2\$.",
      exercices: [
        _ex(
          1,
          'Opérations algébriques',
          5,
          "Soit \$z_1 = 2 + 3i\$ et \$z_2 = 1 - i\$.",
          [
            _q(
              1,
              "Calculer \$z_1 + z_2\$, \$z_1 \\cdot z_2\$, \$z_1/z_2\$.",
              4,
              _sol([
                _step(
                  "**Somme** : \$(2 + 1) + (3 - 1)i = 3 + 2i\$.",
                ),
                _step(
                  "**Produit** : \$(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i\$ (utiliser \$i^2 = -1\$).",
                ),
                _step(
                  "**Quotient** : multiplier numérateur et dénominateur par le conjugué \$\\bar z_2 = 1 + i\$.",
                ),
                _step(
                  "\$\\dfrac{2 + 3i}{1 - i} = \\dfrac{(2 + 3i)(1 + i)}{(1 - i)(1 + i)} = \\dfrac{2 + 2i + 3i + 3i^2}{1 + 1} = \\dfrac{-1 + 5i}{2} = -\\dfrac{1}{2} + \\dfrac{5}{2} i\$.",
                  tipFr:
                      "Pour diviser deux complexes, toujours multiplier par le conjugué du dénominateur — ça rationalise (résultat avec dénominateur réel).",
                ),
              ], finalAnswerFr: r"$3+2i$, $5+i$, $-1/2 + 5i/2$"),
            ),
            _q(
              2,
              "Calculer \$|z_1|\$ et \$|z_2|\$.",
              1,
              _sol([
                _step(
                  "\$|z_1| = \\sqrt{2^2 + 3^2} = \\sqrt{13}\$. \$|z_2| = \\sqrt{1 + 1} = \\sqrt 2\$.",
                ),
              ], finalAnswerFr: r"$\sqrt{13}$ et $\sqrt 2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Conjugué',
          5,
          "Pour \$z = a + bi\$, le conjugué est \$\\bar z = a - bi\$.",
          [
            _q(
              1,
              "Démontrer \$z + \\bar z = 2 \\text{Re}(z)\$ et \$z - \\bar z = 2i \\text{Im}(z)\$.",
              2,
              _sol([
                _step(
                  "\$z + \\bar z = (a + bi) + (a - bi) = 2a = 2 \\text{Re}(z)\$.",
                ),
                _step(
                  "\$z - \\bar z = (a + bi) - (a - bi) = 2bi = 2i \\text{Im}(z)\$.",
                ),
                _step(
                  "**Conséquences** : \$z \\in \\mathbb{R} \\iff z = \\bar z\$ ; \$z\$ imaginaire pur \$\\iff z = -\\bar z\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Montrer que \$z \\bar z = |z|^2\$.",
              1,
              _sol([
                _step(
                  "\$z \\bar z = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 + b^2 = |z|^2\$.",
                  tipFr:
                      "Cette identité fondamentale justifie la technique 'multiplier par le conjugué' pour rationaliser \$1/z\$.",
                ),
              ], finalAnswerFr: r"$z \bar z = |z|^2 \in \mathbb{R}^+$"),
            ),
            _q(
              3,
              "Calculer \$1/z\$ pour \$z = 3 - 4i\$.",
              2,
              _sol([
                _step(
                  "\$1/z = \\dfrac{\\bar z}{z \\bar z} = \\dfrac{3 + 4i}{|z|^2} = \\dfrac{3 + 4i}{9 + 16} = \\dfrac{3 + 4i}{25} = \\dfrac{3}{25} + \\dfrac{4}{25} i\$.",
                ),
                _step(
                  "Vérification : \$z \\cdot (1/z) = (3 - 4i)(3/25 + 4i/25) = (9 + 12i - 12i + 16)/25 = 25/25 = 1\$ ✓.",
                ),
              ], finalAnswerFr: r"$1/z = 3/25 + 4i/25$"),
            ),
          ],
        ),
        _ex(
          3,
          'Équation du second degré',
          5,
          "Résoudre \$(E) : z^2 + 4z + 13 = 0\$ dans \$\\mathbb{C}\$.",
          [
            _q(
              1,
              "Calculer le discriminant.",
              1,
              _sol([
                _step(
                  "\$\\Delta = b^2 - 4ac = 16 - 52 = -36\$. \$\\Delta < 0\$ → deux racines complexes conjuguées.",
                ),
              ], finalAnswerFr: r"$\Delta = -36$"),
            ),
            _q(
              2,
              "Résoudre.",
              3,
              _sol([
                _step(
                  "Pour \$\\Delta < 0\$ : racines \$z = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}\$. Ici \$\\sqrt{-\\Delta} = \\sqrt{36} = 6\$.",
                ),
                _step(
                  "\$z = \\dfrac{-4 \\pm 6i}{2} = -2 \\pm 3i\$.",
                ),
                _step(
                  "\$S = \\{-2 + 3i,\\, -2 - 3i\\}\$ — racines conjuguées.",
                  tipFr:
                      "Pour un trinôme à coefficients **réels**, les racines complexes vont toujours par paire de conjugués.",
                ),
              ], finalAnswerFr: r"$S = \{-2 \pm 3i\}$"),
            ),
            _q(
              3,
              "Vérification par Viète.",
              1,
              _sol([
                _step(
                  "Somme \$z_1 + z_2 = (-2 + 3i) + (-2 - 3i) = -4 = -b/a\$ ✓. Produit \$z_1 z_2 = (-2)^2 - (3i)^2 = 4 + 9 = 13 = c/a\$ ✓.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Module et argument',
          5,
          "Soit \$z = -1 + i \\sqrt 3\$.",
          [
            _q(
              1,
              "Calculer \$|z|\$.",
              1,
              _sol([
                _step(
                  "\$|z| = \\sqrt{(-1)^2 + (\\sqrt 3)^2} = \\sqrt{1 + 3} = 2\$.",
                ),
              ], finalAnswerFr: r"$|z| = 2$"),
            ),
            _q(
              2,
              "Déterminer un argument \$\\theta\$ de \$z\$ (à \$2\\pi\$ près).",
              3,
              _sol([
                _step(
                  "\$\\cos\\theta = \\text{Re}(z)/|z| = -1/2\$. \$\\sin\\theta = \\text{Im}(z)/|z| = \\sqrt 3/2\$.",
                ),
                _step(
                  "Re < 0 et Im > 0 → \$z\$ dans le **2ème quadrant**. Les valeurs \$\\cos\\theta = -1/2\$ et \$\\sin\\theta = \\sqrt 3/2\$ correspondent à \$\\theta = 2\\pi/3\$.",
                ),
                _step(
                  "Donc \$\\arg z = 2\\pi/3\$ (à \$2\\pi\$ près).",
                  mistakeFr:
                      "Une seule équation (\$\\cos\\theta\$ ou \$\\sin\\theta\$) ne suffit pas — il faut les deux pour identifier le quadrant et donc l'angle sans ambiguïté.",
                ),
              ], finalAnswerFr: r"$\arg z = 2\pi/3$"),
            ),
            _q(
              3,
              "Représenter \$z\$ dans le plan complexe.",
              1,
              _sol([
                _step(
                  "Point d'affixe \$z\$ : coordonnées \$(-1, \\sqrt 3) \\approx (-1, 1{,}73)\$. Sur le cercle de rayon 2 centré en O, dans le 2ème quadrant.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexTrig() => _paper(
      titleFr: 'Épreuve type — Forme trigonométrique et formule de Moivre',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Forme trigonométrique \$z = r(\\cos\\theta + i\\sin\\theta)\$, forme exponentielle \$z = r e^{i\\theta}\$, formule de Moivre \$(e^{i\\theta})^n = e^{in\\theta}\$, racines n-ièmes.",
      exercices: [
        _ex(
          1,
          'Passage à la forme exponentielle',
          5,
          "Mettre chaque complexe sous forme exponentielle.",
          [
            _q(
              1,
              "\$z = 1 + i\$.",
              2,
              _sol([
                _step(
                  "\$|z| = \\sqrt 2\$. \$\\cos\\theta = 1/\\sqrt 2\$, \$\\sin\\theta = 1/\\sqrt 2\$ → \$\\theta = \\pi/4\$.",
                ),
                _step(
                  "Forme exponentielle : \$z = \\sqrt 2\\, e^{i\\pi/4}\$.",
                ),
              ], finalAnswerFr: r"$z = \sqrt 2\, e^{i\pi/4}$"),
            ),
            _q(
              2,
              "\$z = -2\$.",
              1,
              _sol([
                _step(
                  "\$|z| = 2\$, \$\\arg z = \\pi\$ (axe réel négatif). Donc \$z = 2 e^{i\\pi}\$.",
                ),
                _step(
                  "**Identité d'Euler** : \$e^{i\\pi} = -1\$, soit \$e^{i\\pi} + 1 = 0\$ — souvent appelée la plus belle formule des mathématiques.",
                ),
              ], finalAnswerFr: r"$z = 2 e^{i\pi}$"),
            ),
            _q(
              3,
              "\$z = i\$.",
              1,
              _sol([
                _step(
                  "\$|z| = 1\$, \$\\arg z = \\pi/2\$ → \$z = e^{i\\pi/2}\$.",
                ),
                _step(
                  "Cohérent avec \$i^2 = e^{i\\pi} = -1\$ ✓.",
                ),
              ], finalAnswerFr: r"$z = e^{i\pi/2}$"),
            ),
            _q(
              4,
              "\$z = -\\sqrt 3 + i\$.",
              1,
              _sol([
                _step(
                  "\$|z| = \\sqrt{3 + 1} = 2\$. \$\\cos\\theta = -\\sqrt 3/2\$, \$\\sin\\theta = 1/2\$ → \$\\theta = 5\\pi/6\$.",
                ),
                _step(
                  "\$z = 2 e^{i 5\\pi/6}\$.",
                ),
              ], finalAnswerFr: r"$z = 2 e^{i 5\pi/6}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Formule de Moivre',
          5,
          "Utiliser \$(e^{i\\theta})^n = e^{i n\\theta}\$.",
          [
            _q(
              1,
              "Calculer \$(1 + i)^{10}\$.",
              3,
              _sol([
                _step(
                  "\$1 + i = \\sqrt 2\\, e^{i\\pi/4}\$.",
                ),
                _step(
                  "\$(1 + i)^{10} = (\\sqrt 2)^{10} \\cdot e^{i \\cdot 10\\pi/4} = 2^5 \\cdot e^{i 5\\pi/2} = 32 \\cdot e^{i\\pi/2}\$ (car \$5\\pi/2 = 2\\pi + \\pi/2\$).",
                ),
                _step(
                  "\$e^{i\\pi/2} = i\$. Donc \$(1+i)^{10} = 32 i\$.",
                  tipFr:
                      "Pour des puissances élevées, la forme exponentielle est beaucoup plus rapide que le développement binomial.",
                ),
              ], finalAnswerFr: r"$(1+i)^{10} = 32i$"),
            ),
            _q(
              2,
              "Établir l'identité \$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta\$.",
              2,
              _sol([
                _step(
                  "\$e^{i 2\\theta} = (e^{i\\theta})^2 = (\\cos\\theta + i\\sin\\theta)^2 = \\cos^2\\theta + 2i\\sin\\theta\\cos\\theta + (i\\sin\\theta)^2\$.",
                ),
                _step(
                  "\$(i\\sin\\theta)^2 = -\\sin^2\\theta\$. Donc \$e^{i 2\\theta} = (\\cos^2\\theta - \\sin^2\\theta) + 2i\\sin\\theta\\cos\\theta\$.",
                ),
                _step(
                  "Identifier parties réelle et imaginaire : \$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta\$ et \$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\$.",
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
          "Résoudre \$z^3 = 1\$ dans \$\\mathbb{C}\$.",
          [
            _q(
              1,
              "Trouver les 3 racines cubiques de l'unité.",
              4,
              _sol([
                _step(
                  "\$1 = e^{i \\cdot 0}\$. Cherchons \$z = r e^{i\\theta}\$ avec \$r^3 = 1\$ et \$3\\theta \\equiv 0 \\pmod{2\\pi}\$.",
                ),
                _step(
                  "\$r = 1\$ (réel positif), \$\\theta = 2k\\pi/3\$ pour \$k = 0, 1, 2\$.",
                ),
                _step(
                  "\$z_0 = e^{i \\cdot 0} = 1\$ ; \$z_1 = e^{i 2\\pi/3} = -1/2 + i\\sqrt 3/2\$ ; \$z_2 = e^{i 4\\pi/3} = -1/2 - i\\sqrt 3/2\$.",
                ),
                _step(
                  "**Géométriquement** : les 3 racines forment un **triangle équilatéral** inscrit dans le cercle unité, sommets espacés de \$2\\pi/3\$.",
                  tipFr:
                      "Les \$n\$ racines n-ièmes de l'unité forment un polygone régulier à \$n\$ sommets sur le cercle unité, espacés de \$2\\pi/n\$.",
                ),
              ], finalAnswerFr: r"$\{1,\, -1/2 \pm i\sqrt 3/2\}$"),
            ),
            _q(
              2,
              "Vérifier que la somme des 3 racines vaut 0.",
              1,
              _sol([
                _step(
                  "Somme : \$1 + (-1/2 + i\\sqrt 3/2) + (-1/2 - i\\sqrt 3/2) = 1 - 1 + 0 = 0\$ ✓.",
                ),
                _step(
                  "Cohérent avec Viète : pour \$z^3 - 1 = 0\$, somme des racines = \$-(\\text{coeff de }z^2)/(\\text{coeff dominant}) = -0/1 = 0\$.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Application — équation \$z^n = a\$',
          5,
          "Résoudre \$z^4 = -16\$.",
          [
            _q(
              1,
              "Mettre \$-16\$ sous forme exponentielle.",
              1,
              _sol([
                _step(
                  "\$-16 = 16 \\cdot (-1) = 16 e^{i\\pi}\$.",
                ),
              ], finalAnswerFr: r"$-16 = 16 e^{i\pi}$"),
            ),
            _q(
              2,
              "Trouver les 4 racines.",
              4,
              _sol([
                _step(
                  "\$z = r e^{i\\theta}\$ avec \$r^4 = 16\$ et \$4\\theta \\equiv \\pi \\pmod{2\\pi}\$.",
                ),
                _step(
                  "\$r = 2\$ (réelle positive). \$\\theta = \\pi/4 + k\\pi/2\$ pour \$k = 0, 1, 2, 3\$ : \$\\theta = \\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4\$.",
                ),
                _step(
                  "Racines : \$z_k = 2 e^{i(\\pi/4 + k\\pi/2)}\$. En forme algébrique : \$z_0 = \\sqrt 2(1 + i)\$, \$z_1 = \\sqrt 2(-1 + i)\$, \$z_2 = \\sqrt 2(-1 - i)\$, \$z_3 = \\sqrt 2(1 - i)\$.",
                ),
                _step(
                  "Vérification : \$z_0^4 = (\\sqrt 2(1+i))^4 = (\\sqrt 2)^4 (1+i)^4 = 4 \\cdot (2i)^2 = 4 \\cdot (-4) = -16\$ ✓.",
                  tipFr:
                      "**Méthode générale** pour \$z^n = a\$ avec \$a = |a| e^{i\\alpha}\$ : \$n\$ racines \$z_k = |a|^{1/n} e^{i(\\alpha + 2k\\pi)/n}\$.",
                ),
              ], finalAnswerFr: r"$z_k = 2 e^{i(\pi/4 + k\pi/2)}$, $k=0..3$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperOdeFirstOrder() => _paper(
      titleFr: 'Épreuve type — Équations différentielles du 1er ordre',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "EDO \$y' = ay\$ → \$y = C e^{ax}\$. EDO \$y' = ay + b\$ → solution = homogène + particulière. Applications : refroidissement, charge RC, désintégration.",
      exercices: [
        _ex(
          1,
          'EDO homogène',
          5,
          "Soit \$(E) : y' = 3y\$.",
          [
            _q(
              1,
              "Donner la solution générale.",
              2,
              _sol([
                _step(
                  "**Théorème** : la solution générale de \$y' = ay\$ est \$y(x) = C e^{ax}\$, \$C \\in \\mathbb{R}\$.",
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
              "À quel instant \$y\$ atteint-elle 100 ?",
              1,
              _sol([
                _step(
                  "\$2 e^{3x} = 100 \\iff e^{3x} = 50 \\iff x = \\dfrac{\\ln 50}{3} \\approx 1{,}30\$.",
                ),
              ], finalAnswerFr: r"$x \approx 1{,}30$"),
            ),
          ],
        ),
        _ex(
          2,
          'EDO avec second membre constant',
          5,
          "Soit \$(E) : y' = -2y + 10\$.",
          [
            _q(
              1,
              "Trouver une solution particulière constante \$y_p\$.",
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
                  "\$y_h(x) = C e^{-2x}\$.",
                ),
              ], finalAnswerFr: r"$y_h = C e^{-2x}$"),
            ),
            _q(
              3,
              "Donner la solution générale de \$(E)\$, puis la solution avec \$y(0) = 8\$.",
              3,
              _sol([
                _step(
                  "**Principe de superposition** : \$y = y_h + y_p = C e^{-2x} + 5\$.",
                ),
                _step(
                  "\$y(0) = C + 5 = 8 \\iff C = 3\$. Donc \$y(x) = 3 e^{-2x} + 5\$.",
                ),
                _step(
                  "**Comportement asymptotique** : \$\\lim_{+\\infty} y = 5\$ — la solution tend vers l'équilibre \$y_p\$. Le terme transitoire \$3 e^{-2x}\$ s'atténue.",
                  tipFr:
                      "Pour une EDO linéaire à coeffs constants, la solution = transitoire (terme en \$e^{at}\$) + régime permanent (solution particulière).",
                ),
              ], finalAnswerFr: r"$y(x) = 3 e^{-2x} + 5$"),
            ),
          ],
        ),
        _ex(
          3,
          'Loi de Newton — refroidissement',
          5,
          "Un café à 80°C est posé dans une pièce à 20°C. La température \$T(t)\$ vérifie \$T'(t) = -k(T - 20)\$ avec \$k > 0\$.",
          [
            _q(
              1,
              "Résoudre l'EDO avec \$T(0) = 80\$.",
              3,
              _sol([
                _step(
                  "Poser \$\\theta = T - 20\$ (écart à l'ambiance). \$\\theta' = T' = -k(T - 20) = -k\\theta\$.",
                ),
                _step(
                  "Solution : \$\\theta(t) = C e^{-kt}\$. Condition initiale : \$\\theta(0) = T(0) - 20 = 60 = C\$.",
                ),
                _step(
                  "Retour à T : \$T(t) = 20 + 60 e^{-kt}\$.",
                ),
              ], finalAnswerFr: r"$T(t) = 20 + 60 e^{-kt}$"),
            ),
            _q(
              2,
              "Si \$T(5) = 50\$°C, déterminer \$k\$ et la 'demi-vie thermique'.",
              2,
              _sol([
                _step(
                  "\$T(5) = 50 \\iff 20 + 60 e^{-5k} = 50 \\iff e^{-5k} = 1/2 \\iff -5k = -\\ln 2 \\iff k = \\dfrac{\\ln 2}{5} \\approx 0{,}139\\,\\text{min}^{-1}\$.",
                ),
                _step(
                  "Demi-vie thermique : \$t_{1/2} = \\ln 2 / k = 5\$ minutes. L'écart à l'ambiance est divisé par 2 toutes les 5 min.",
                  tipFr:
                      "**Loi de Newton du refroidissement** : structure identique à la désintégration radioactive et à la décharge RC (toutes des cinétiques d'ordre 1).",
                ),
              ], finalAnswerFr: r"$k \approx 0{,}139$/min"),
            ),
          ],
        ),
        _ex(
          4,
          'Désintégration radioactive',
          5,
          "Le nombre de noyaux \$N(t)\$ d'un isotope vérifie \$N'(t) = -\\lambda N(t)\$. À \$t = 0\$, \$N_0 = 10^{12}\$ noyaux ; demi-vie 8 jours.",
          [
            _q(
              1,
              "Donner l'expression de \$N(t)\$.",
              2,
              _sol([
                _step(
                  "EDO de référence \$N' = -\\lambda N\$ → \$N(t) = N_0 e^{-\\lambda t} = 10^{12} e^{-\\lambda t}\$.",
                ),
                _step(
                  "Demi-vie \$t_{1/2}\$ : \$N(t_{1/2}) = N_0/2 \\iff e^{-\\lambda t_{1/2}} = 1/2 \\iff \\lambda = \\ln 2 / t_{1/2}\$.",
                ),
                _step(
                  "Avec \$t_{1/2} = 8\$ jours : \$\\lambda = \\ln 2 / 8 \\approx 0{,}0866\\,\\text{jour}^{-1}\$.",
                ),
              ], finalAnswerFr: r"$N(t) = 10^{12} e^{-\lambda t}$, $\lambda = \ln 2/8$"),
            ),
            _q(
              2,
              "Au bout de combien de temps reste-t-il 1% des noyaux initiaux ?",
              2,
              _sol([
                _step(
                  "\$N(t)/N_0 = 0{,}01 \\iff e^{-\\lambda t} = 0{,}01 \\iff t = -\\ln(0{,}01)/\\lambda = \\ln 100 / \\lambda\$.",
                ),
                _step(
                  "\$\\ln 100 \\approx 4{,}605\$. \$t \\approx 4{,}605 / 0{,}0866 \\approx 53\\,\\text{jours}\$, soit environ 6,6 demi-vies (\\(53/8\\)).",
                ),
                _step(
                  "**Vérification** : après \$n\$ demi-vies, il reste \$1/2^n\$ ; \$1/2^7 \\approx 0{,}008\$, ce qui est cohérent avec ≈ 1% à \$n \\approx 6{,}6\$.",
                  tipFr:
                      "**Règle de chiffre** : il reste 1% après ≈ 7 demi-vies (\$1/2^7 = 1/128 \\approx 0{,}8\\%\$). Utile pour estimer rapidement.",
                ),
              ], finalAnswerFr: r"$t \approx 53$ jours"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{t \\to +\\infty} N(t)\$ et interpréter.",
              1,
              _sol([
                _step(
                  "\$\\lim_{+\\infty} e^{-\\lambda t} = 0\$ donc \$\\lim N(t) = 0\$. La désintégration est asymptotiquement complète mais ne touche jamais 0 mathématiquement.",
                ),
              ], finalAnswerFr: r"$\lim N = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperProbBinomial() => _paper(
      titleFr: 'Épreuve type — Loi binomiale',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Schéma de Bernoulli (n essais identiques indépendants à 2 issues, succès \$p\$), loi binomiale \$\\mathcal B(n, p)\$. Espérance \$E = np\$, variance \$V = np(1-p)\$.",
      exercices: [
        _ex(
          1,
          'Schéma de Bernoulli',
          5,
          "Un examen comporte 20 QCM, chacune à 4 réponses dont 1 correcte. Un candidat répond au hasard. Soit X = nombre de bonnes réponses.",
          [
            _q(
              1,
              "Justifier que \$X \\sim \\mathcal B(n, p)\$ et préciser \$n, p\$.",
              2,
              _sol([
                _step(
                  "**Schéma de Bernoulli** : \$n\$ essais identiques, indépendants, à 2 issues 'succès/échec', succès de probabilité \$p\$ constante.",
                ),
                _step(
                  "Ici : \$n = 20\$ questions, indépendantes, succès = 'bonne réponse' avec \$p = 1/4\$. Donc \$X \\sim \\mathcal B(20, 1/4)\$.",
                ),
              ], finalAnswerFr: r"$X \sim \mathcal B(20, 1/4)$"),
            ),
            _q(
              2,
              "Calculer \$E(X)\$ et \$V(X)\$.",
              2,
              _sol([
                _step(
                  "**Formules binomiales** : \$E(X) = np\$, \$V(X) = np(1-p)\$.",
                ),
                _step(
                  "\$E(X) = 20 \\times 1/4 = 5\$. \$V(X) = 20 \\times 1/4 \\times 3/4 = 15/4 = 3{,}75\$. \$\\sigma = \\sqrt V \\approx 1{,}94\$.",
                ),
                _step(
                  "**Interprétation** : en répondant au hasard, on attend en moyenne 5/20 (= 25% = \$p\$). La plupart des candidats au hasard obtiennent entre \$E - 2\\sigma \\approx 1\$ et \$E + 2\\sigma \\approx 9\$ bonnes réponses.",
                ),
              ], finalAnswerFr: r"$E = 5$, $V = 3{,}75$"),
            ),
            _q(
              3,
              "Calculer \$P(X = 10)\$.",
              1,
              _sol([
                _step(
                  "**Formule** : \$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}\$.",
                ),
                _step(
                  "\$P(X = 10) = \\binom{20}{10} (1/4)^{10} (3/4)^{10} \\approx 184756 \\times 9{,}54 \\cdot 10^{-7} \\times 0{,}0563 \\approx 0{,}0099 \\approx 1\\%\$.",
                ),
              ], finalAnswerFr: r"$P(X = 10) \approx 1\%$"),
            ),
          ],
        ),
        _ex(
          2,
          'Bernoulli somme = binomiale',
          5,
          "Soient \$X_1, \\ldots, X_n\$ des Bernoulli indépendantes de paramètre \$p\$.",
          [
            _q(
              1,
              "Que vaut \$S = X_1 + X_2 + \\dots + X_n\$ en termes de loi ?",
              3,
              _sol([
                _step(
                  "Chaque \$X_i\$ vaut 0 ou 1, avec \$P(X_i = 1) = p\$. La somme \$S\$ compte le nombre de '1' parmi les \$n\$ tirages.",
                ),
                _step(
                  "C'est **exactement la définition** d'une variable binomiale : \$S \\sim \\mathcal B(n, p)\$.",
                ),
                _step(
                  "**Conséquence immédiate** : \$E(S) = \\sum E(X_i) = n \\cdot p\$ (linéarité). \$V(S) = \\sum V(X_i) = n \\cdot p(1-p)\$ (indépendance).",
                  tipFr:
                      "La binomiale n'est rien d'autre qu'une somme de \$n\$ Bernoulli. Cette décomposition permet de retrouver les formules d'espérance/variance sans calcul direct.",
                ),
              ], finalAnswerFr: r"$S \sim \mathcal B(n, p)$"),
            ),
            _q(
              2,
              "Application : on tire 50 cartes **avec remise** dans un jeu de 52. Espérance du nombre d'as obtenus.",
              2,
              _sol([
                _step(
                  "Chaque tirage = Bernoulli avec \$p = 4/52 = 1/13\$ (4 as parmi 52 cartes).",
                ),
                _step(
                  "Nombre d'as = somme de 50 Bernoulli indépendantes → \$\\mathcal B(50, 1/13)\$. Espérance : \$E = np = 50/13 \\approx 3{,}85\$.",
                  mistakeFr:
                      "Sans remise, les tirages ne seraient plus indépendants (\$p\$ changerait à chaque tirage). La binomiale s'applique seulement avec remise.",
                ),
              ], finalAnswerFr: r"$E \approx 3{,}85$ as"),
            ),
          ],
        ),
        _ex(
          3,
          'Probabilités cumulées',
          5,
          "Dans une usine, 2% des pièces sont défectueuses. On contrôle un lot de 100 pièces. Soit \$D\$ le nombre de défectueuses.",
          [
            _q(
              1,
              "Justifier \$D \\sim \\mathcal B(100,\\, 0{,}02)\$ et calculer \$E(D)\$, \$\\sigma(D)\$.",
              2,
              _sol([
                _step(
                  "Modèle : chaque pièce est indépendamment défectueuse avec proba 0,02. Le contrôle = 100 tirages indépendants.",
                ),
                _step(
                  "\$E(D) = 100 \\times 0{,}02 = 2\$. \$V(D) = 100 \\times 0{,}02 \\times 0{,}98 = 1{,}96\$, \$\\sigma \\approx 1{,}40\$.",
                ),
              ], finalAnswerFr: r"$E = 2$, $\sigma \approx 1{,}40$"),
            ),
            _q(
              2,
              "Calculer \$P(D = 0)\$ — probabilité qu'aucune pièce ne soit défectueuse.",
              2,
              _sol([
                _step(
                  "\$P(D = 0) = \\binom{100}{0} \\cdot 0{,}02^0 \\cdot 0{,}98^{100} = 0{,}98^{100}\$.",
                ),
                _step(
                  "\$0{,}98^{100} = e^{100 \\ln 0{,}98} \\approx e^{100 \\times (-0{,}0202)} = e^{-2{,}02} \\approx 0{,}133\$.",
                ),
                _step(
                  "Donc \$P(D = 0) \\approx 13\\%\$. Plutôt faible — un lot 'parfait' est rare avec un taux de défaut de 2%.",
                ),
              ], finalAnswerFr: r"$P(D=0) \approx 0{,}133$"),
            ),
            _q(
              3,
              "Calculer \$P(D \\le 1)\$ — au plus 1 défectueuse.",
              1,
              _sol([
                _step(
                  "\$P(D \\le 1) = P(D = 0) + P(D = 1)\$. \$P(D = 1) = \\binom{100}{1} \\cdot 0{,}02 \\cdot 0{,}98^{99} = 100 \\times 0{,}02 \\times 0{,}98^{99}\$.",
                ),
                _step(
                  "\$0{,}98^{99} \\approx 0{,}136\$. Donc \$P(D = 1) \\approx 2 \\times 0{,}136 = 0{,}271\$. Total : \$P(D \\le 1) \\approx 0{,}133 + 0{,}271 = 0{,}404\$.",
                ),
              ], finalAnswerFr: r"$P(D \le 1) \approx 0{,}40$"),
            ),
          ],
        ),
        _ex(
          4,
          'Espérance de jeu',
          5,
          "Un jeu : on gagne 10 DH avec proba 0,1 ; 2 DH avec proba 0,4 ; on perd 3 DH avec proba 0,5.",
          [
            _q(
              1,
              "Calculer l'espérance de gain par partie.",
              3,
              _sol([
                _step(
                  "Soit \$G\$ le gain (positif ou négatif). \$E(G) = \\sum g \\cdot P(G = g)\$.",
                ),
                _step(
                  "\$E(G) = 10 \\times 0{,}1 + 2 \\times 0{,}4 + (-3) \\times 0{,}5 = 1 + 0{,}8 - 1{,}5 = 0{,}3\\,\\text{DH}\$.",
                ),
                _step(
                  "Jeu **favorable** (espérance > 0). Sur le long terme, on gagne en moyenne 0,30 DH par partie.",
                ),
              ], finalAnswerFr: r"$E(G) = 0{,}30$ DH"),
            ),
            _q(
              2,
              "Quel doit être le coût d'entrée \$c\$ pour un jeu équitable ?",
              2,
              _sol([
                _step(
                  "**Jeu équitable** : espérance du gain net \$G - c\$ nulle, soit \$E(G) - c = 0 \\iff c = E(G) = 0{,}30\$ DH.",
                ),
                _step(
                  "En pratique, un casino fixerait \$c > 0{,}30\$ pour avoir une espérance favorable à la maison — c'est leur marge.",
                  tipFr:
                      "Loi des grands nombres : sur un grand nombre de parties, la moyenne empirique converge vers \$E(G)\$ — d'où l'importance de cette grandeur pour évaluer un jeu.",
                ),
              ], finalAnswerFr: r"$c = 0{,}30$ DH"),
            ),
          ],
        ),
      ],
    );

// ============================================================================
// PC Papers — Physique-Chimie (16 chapters)
// ============================================================================

Map<String, dynamic> _paperNewtonLaws() => _paper(
      titleFr: 'Épreuve type — Lois de Newton',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Trois lois : 1ère (inertie), 2ème \$\\sum \\vec F = m \\vec a\$, 3ème (action-réaction). Applications : équilibre, plan incliné, poulies, mouvement circulaire.",
      exercices: [
        _ex(
          1,
          'Équilibre statique',
          5,
          "Une caisse de 50 kg est suspendue par deux cordes formant chacune un angle de 30° avec la verticale. Prendre \$g = 10\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Faire le bilan des forces sur la caisse.",
              1,
              _sol([
                _step(
                  "Forces : poids \$\\vec P\$ vertical descendant (\$P = mg = 500\\,\\text{N}\$). Tensions \$\\vec T_1\$ et \$\\vec T_2\$ le long des cordes, vers le haut. Par symétrie, \$T_1 = T_2 = T\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer la tension dans chaque corde.",
              3,
              _sol([
                _step(
                  "**1ère loi de Newton** (équilibre) : \$\\sum \\vec F = \\vec 0\$.",
                ),
                _step(
                  "Projection sur la verticale : \$2 T \\cos 30° - P = 0\$. Soit \$2 T \\cdot \\dfrac{\\sqrt 3}{2} = 500\$, donc \$T = \\dfrac{500}{\\sqrt 3} \\approx 289\\,\\text{N}\$.",
                ),
                _step(
                  "Projection horizontale : les composantes \$\\pm T \\sin 30°\$ s'annulent ✓.",
                  tipFr:
                      "Quand l'angle des cordes \$\\to 90°\$ (cordes horizontales), \$\\cos \\to 0\$ et \$T \\to \\infty\$. C'est pourquoi tendre une corde demande des forces énormes.",
                ),
              ], finalAnswerFr: r"$T \approx 289$ N"),
            ),
            _q(
              3,
              "Si l'angle passe à 60°, quelle est la nouvelle tension ?",
              1,
              _sol([
                _step(
                  "\$T = P/(2\\cos 60°) = 500/(2 \\times 0{,}5) = 500\\,\\text{N}\$. La tension a augmenté de 73% en doublant l'écartement.",
                ),
              ], finalAnswerFr: r"$T = 500$ N"),
            ),
          ],
        ),
        _ex(
          2,
          'Plan incliné avec frottement',
          5,
          "Un bloc de 10 kg est posé sur un plan incliné à \$\\alpha = 25°\$. Coefficient de frottement statique \$\\mu_s = 0{,}5\$, \$g = 10\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Le bloc glisse-t-il spontanément ?",
              3,
              _sol([
                _step(
                  "Composante du poids selon le plan (qui tire le bloc vers le bas) : \$P_\\parallel = mg \\sin\\alpha = 10 \\times 10 \\times \\sin 25° \\approx 42{,}3\\,\\text{N}\$.",
                ),
                _step(
                  "Réaction normale : \$R = mg \\cos\\alpha = 100 \\times \\cos 25° \\approx 90{,}6\\,\\text{N}\$. Frottement statique maximal : \$f_\\text{max} = \\mu_s R = 0{,}5 \\times 90{,}6 \\approx 45{,}3\\,\\text{N}\$.",
                ),
                _step(
                  "Comparaison : \$P_\\parallel \\approx 42{,}3 < f_\\text{max} \\approx 45{,}3\$. Le frottement compense exactement → **le bloc reste statique**.",
                  tipFr:
                      "**Critère d'équilibre sur plan incliné** : \$\\tan\\alpha < \\mu_s\$. Ici \$\\tan 25° \\approx 0{,}466 < 0{,}5\$ ✓.",
                ),
              ], finalAnswerFr: r"Non, équilibre"),
            ),
            _q(
              2,
              "Calculer l'angle critique \$\\alpha_c\$ à partir duquel le bloc glisse.",
              2,
              _sol([
                _step(
                  "Au seuil : \$\\tan\\alpha_c = \\mu_s \\iff \\alpha_c = \\arctan(\\mu_s) = \\arctan(0{,}5) \\approx 26{,}57°\$.",
                ),
                _step(
                  "Au-delà, la composante du poids dépasse la friction maximale et le bloc accélère.",
                ),
              ], finalAnswerFr: r"$\alpha_c \approx 26{,}6°$"),
            ),
          ],
        ),
        _ex(
          3,
          'Système avec poulie',
          5,
          "Deux blocs de masses \$m_1 = 5\\,\\text{kg}\$ et \$m_2 = 3\\,\\text{kg}\$ sont reliés par un fil inextensible passant sur une poulie sans frottement. Le bloc lourd descend.",
          [
            _q(
              1,
              "Déterminer l'accélération du système et la tension du fil.",
              4,
              _sol([
                _step(
                  "**2ème loi de Newton** sur chaque bloc, en orientant positivement le sens du mouvement.",
                ),
                _step(
                  "Bloc 1 (5 kg, descend) : \$m_1 g - T = m_1 a \\iff 50 - T = 5a\$.",
                ),
                _step(
                  "Bloc 2 (3 kg, monte) : \$T - m_2 g = m_2 a \\iff T - 30 = 3a\$.",
                ),
                _step(
                  "Sommer : \$50 - 30 = 8a \\Rightarrow a = 2{,}5\\,\\text{m/s}^2\$. Tension : \$T = 30 + 3 \\times 2{,}5 = 37{,}5\\,\\text{N}\$.",
                  tipFr:
                      "Vérification : \$T < m_1 g\$ (le bloc 1 descend) et \$T > m_2 g\$ (le bloc 2 monte). Ici \$30 < 37{,}5 < 50\$ ✓.",
                ),
              ], finalAnswerFr: r"$a = 2{,}5$ m/s², $T = 37{,}5$ N"),
            ),
            _q(
              2,
              "Vitesse du système après 2 s, partant du repos.",
              1,
              _sol([
                _step(
                  "Mouvement uniformément accéléré : \$v = a t = 2{,}5 \\times 2 = 5\\,\\text{m/s}\$.",
                ),
              ], finalAnswerFr: r"$v = 5$ m/s"),
            ),
          ],
        ),
        _ex(
          4,
          'Mouvement circulaire uniforme',
          5,
          "Un satellite tourne autour de la Terre à altitude \$h = 400\\,\\text{km}\$ (ISS). \$R_T = 6400\\,\\text{km}\$, \$g_0 = 9{,}81\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Gravité \$g\$ à cette altitude.",
              2,
              _sol([
                _step(
                  "Loi de gravitation : \$g \\propto 1/r^2\$. \$g/g_0 = (R_T/(R_T + h))^2 = (6400/6800)^2 \\approx 0{,}886\$.",
                ),
                _step(
                  "\$g \\approx 9{,}81 \\times 0{,}886 \\approx 8{,}69\\,\\text{m/s}^2\$. Encore 89% de \$g_0\$ — l'apesanteur orbitale n'est pas une absence de gravité mais une chute libre permanente.",
                ),
              ], finalAnswerFr: r"$g \approx 8{,}69$ m/s²"),
            ),
            _q(
              2,
              "Vitesse orbitale et période de révolution.",
              3,
              _sol([
                _step(
                  "**Mouvement circulaire uniforme** : la gravité fournit la force centripète. \$m g = m v^2 / r \\Rightarrow v = \\sqrt{g r}\$ avec \$r = R_T + h = 6{,}8 \\times 10^6\\,\\text{m}\$.",
                ),
                _step(
                  "\$v = \\sqrt{8{,}69 \\times 6{,}8 \\times 10^6} \\approx 7690\\,\\text{m/s} \\approx 27\\,700\\,\\text{km/h}\$.",
                ),
                _step(
                  "Période : \$T = 2\\pi r / v = 2\\pi \\times 6{,}8 \\times 10^6 / 7690 \\approx 5556\\,\\text{s} \\approx 92{,}6\\,\\text{min}\$. L'ISS fait un tour de Terre en ~93 min.",
                  tipFr:
                      "Valeurs à retenir : vitesse orbitale ~28000 km/h, période ~90 min pour les orbites basses. Ordres de grandeur classiques.",
                ),
              ], finalAnswerFr: r"$v \approx 7690$ m/s, $T \approx 93$ min"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperProjectile() => _paper(
      titleFr: 'Épreuve type — Mouvement d\'un projectile',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Chute libre (\$y = \\frac{1}{2} g t^2\$), tir parabolique (séparation des composantes \$x, y\$), portée, hauteur maximale.",
      exercices: [
        _ex(
          1,
          'Chute libre',
          5,
          "Une pierre est lâchée du haut d'une falaise sans vitesse initiale. Elle touche le sol après 4 s. \$g = 9{,}8\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Hauteur de la falaise.",
              2,
              _sol([
                _step(
                  "**MRUA en chute libre** : \$h = \\dfrac{1}{2} g t^2 = 0{,}5 \\times 9{,}8 \\times 16 = 78{,}4\\,\\text{m}\$.",
                ),
              ], finalAnswerFr: r"$h = 78{,}4$ m"),
            ),
            _q(
              2,
              "Vitesse à l'impact.",
              2,
              _sol([
                _step(
                  "\$v = g t = 9{,}8 \\times 4 = 39{,}2\\,\\text{m/s} \\approx 141\\,\\text{km/h}\$.",
                ),
                _step(
                  "Vérification énergétique : \$mgh = \\frac{1}{2} m v^2 \\Rightarrow v = \\sqrt{2gh} = \\sqrt{2 \\times 9{,}8 \\times 78{,}4} \\approx 39{,}2\\,\\text{m/s}\$ ✓.",
                  tipFr:
                      "Deux approches : cinématique (\$v = g t\$) ou énergétique (\$v = \\sqrt{2 g h}\$). Donnent le même résultat — utile pour double-vérification.",
                ),
              ], finalAnswerFr: r"$v \approx 39{,}2$ m/s"),
            ),
            _q(
              3,
              "Distance parcourue durant la 3ème seconde.",
              1,
              _sol([
                _step(
                  "\$\\Delta h = h(3) - h(2) = \\frac{1}{2} g (9 - 4) = 0{,}5 \\times 9{,}8 \\times 5 = 24{,}5\\,\\text{m}\$.",
                ),
                _step(
                  "**Observation** : les distances parcourues à chaque seconde sont proportionnelles aux nombres impairs (4,9 m, 14,7 m, 24,5 m, 34,3 m ...) — propriété galiléenne de la chute libre.",
                ),
              ], finalAnswerFr: r"$\Delta h = 24{,}5$ m"),
            ),
          ],
        ),
        _ex(
          2,
          'Tir parabolique — équations horaires',
          5,
          "Un projectile est lancé avec vitesse initiale \$v_0 = 25\\,\\text{m/s}\$ à un angle \$\\alpha = 30°\$ au-dessus de l'horizontale. \$g = 9{,}81\\,\\text{m/s}^2\$, origine au point de lancement.",
          [
            _qSubs(
              1,
              "Équations horaires.",
              4,
              [
                _sub(
                  'a',
                  "Donner les composantes initiales \$v_{0x}, v_{0y}\$.",
                  1,
                  _sol([
                    _step(
                      "\$v_{0x} = v_0 \\cos\\alpha = 25 \\times \\dfrac{\\sqrt 3}{2} \\approx 21{,}65\\,\\text{m/s}\$.",
                    ),
                    _step(
                      "\$v_{0y} = v_0 \\sin\\alpha = 25 \\times 0{,}5 = 12{,}5\\,\\text{m/s}\$.",
                    ),
                  ], finalAnswerFr: r"$v_{0x} \approx 21{,}65$, $v_{0y} = 12{,}5$"),
                ),
                _sub(
                  'b',
                  "Équations horaires \$x(t), y(t)\$.",
                  2,
                  _sol([
                    _step(
                      "**Axe x (horizontal, sans force)** : MRU, \$x(t) = v_{0x} t \\approx 21{,}65\\,t\$.",
                    ),
                    _step(
                      "**Axe y (vertical, poids)** : MRUA, \$y(t) = v_{0y} t - \\dfrac{1}{2} g t^2 = 12{,}5\\,t - 4{,}905\\,t^2\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Trouver l'équation de la trajectoire \$y(x)\$.",
                  1,
                  _sol([
                    _step(
                      "De \$x = v_{0x} t\$ : \$t = x/v_{0x}\$. Substituer dans \$y(t)\$ :",
                    ),
                    _step(
                      "\$y = v_{0y} \\dfrac{x}{v_{0x}} - \\dfrac{g}{2} \\dfrac{x^2}{v_{0x}^2} = x \\tan\\alpha - \\dfrac{g x^2}{2 v_0^2 \\cos^2\\alpha}\$.",
                    ),
                    _step(
                      "C'est une **parabole** — d'où le nom 'tir parabolique'.",
                      tipFr:
                          "Forme générale : \$y = (\\tan\\alpha) x - \\dfrac{g}{2 v_0^2 \\cos^2\\alpha} x^2\$. À mémoriser.",
                    ),
                  ]),
                ),
              ],
            ),
          ],
        ),
        _ex(
          3,
          'Portée et hauteur maximale',
          5,
          "Mêmes données qu'à l'Ex 2.",
          [
            _q(
              1,
              "Calculer la portée \$x_p\$ (distance horizontale atteinte au retour au sol).",
              3,
              _sol([
                _step(
                  "Durée totale du vol : \$y(t_p) = 0\\) avec \$t_p > 0\\), soit \$t_p (v_{0y} - g t_p/2) = 0 \\Rightarrow t_p = 2 v_{0y}/g = 25/9{,}81 \\approx 2{,}55\\,\\text{s}\$.",
                ),
                _step(
                  "Portée : \$x_p = v_{0x} \\cdot t_p \\approx 21{,}65 \\times 2{,}55 \\approx 55{,}2\\,\\text{m}\$.",
                ),
                _step(
                  "**Formule synthétique** : \$x_p = \\dfrac{v_0^2 \\sin(2\\alpha)}{g} = \\dfrac{625 \\times \\sin 60°}{9{,}81} \\approx 55{,}2\\,\\text{m}\$ ✓.",
                  tipFr:
                      "Portée maximale pour \$\\sin(2\\alpha) = 1 \\iff \\alpha = 45°\$. Au-delà ou en deçà, la portée diminue.",
                ),
              ], finalAnswerFr: r"$x_p \approx 55{,}2$ m"),
            ),
            _q(
              2,
              "Hauteur maximale.",
              2,
              _sol([
                _step(
                  "Au sommet : \$v_y = 0 \\iff t_s = v_{0y}/g \\approx 1{,}274\\,\\text{s}\$.",
                ),
                _step(
                  "Hauteur : \$h_\\text{max} = y(t_s) = v_{0y}^2/(2g) = 156{,}25/19{,}62 \\approx 7{,}97\\,\\text{m}\$.",
                ),
                _step(
                  "Ou avec la formule : \$h_\\text{max} = \\dfrac{v_0^2 \\sin^2\\alpha}{2g} \\approx 7{,}97\\,\\text{m}\$ ✓.",
                ),
              ], finalAnswerFr: r"$h_\text{max} \approx 8$ m"),
            ),
          ],
        ),
        _ex(
          4,
          'Tir horizontal',
          5,
          "Un ballon est lancé horizontalement à 15 m/s du haut d'une tour de 80 m. \$g = 10\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Durée de chute.",
              1,
              _sol([
                _step(
                  "Chute libre verticale (\$v_{0y} = 0\$) : \$h = \\dfrac{1}{2} g t^2 \\iff t = \\sqrt{2 h /g} = \\sqrt{160/10} = 4\\,\\text{s}\$.",
                ),
              ], finalAnswerFr: r"$t = 4$ s"),
            ),
            _q(
              2,
              "Distance horizontale au sol (portée).",
              2,
              _sol([
                _step(
                  "Mouvement horizontal uniforme : \$x = v_0 t = 15 \\times 4 = 60\\,\\text{m}\$.",
                ),
              ], finalAnswerFr: r"$x = 60$ m"),
            ),
            _q(
              3,
              "Vitesse à l'impact (module et angle).",
              2,
              _sol([
                _step(
                  "À l'impact : \$v_x = 15\\,\\text{m/s}\$ (inchangé), \$v_y = g t = 40\\,\\text{m/s}\$.",
                ),
                _step(
                  "Module : \$v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{225 + 1600} = \\sqrt{1825} \\approx 42{,}7\\,\\text{m/s}\$.",
                ),
                _step(
                  "Angle avec l'horizontale : \$\\beta = \\arctan(v_y/v_x) = \\arctan(40/15) \\approx 69{,}4°\$ — quasi-vertical.",
                ),
              ], finalAnswerFr: r"$v \approx 42{,}7$ m/s, $\beta \approx 69°$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperEnergyMechanical() => _paper(
      titleFr: 'Épreuve type — Énergie mécanique',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Énergies cinétique \$E_c = \\frac{1}{2} m v^2\$, potentielle pesanteur \$E_p = mgh\$, élastique \$E_{pe} = \\frac{1}{2} k x^2\$. Conservation \$E_m = E_c + E_p\$ en absence de frottement.",
      exercices: [
        _ex(
          1,
          'Calculs élémentaires',
          5,
          "Un cycliste de 70 kg roule à 36 km/h sur route plate. \$g = 10\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Calculer son énergie cinétique.",
              2,
              _sol([
                _step(
                  "Conversion : \$v = 36/3{,}6 = 10\\,\\text{m/s}\$.",
                ),
                _step(
                  "\$E_c = \\dfrac{1}{2} m v^2 = 0{,}5 \\times 70 \\times 100 = 3500\\,\\text{J} = 3{,}5\\,\\text{kJ}\$.",
                ),
              ], finalAnswerFr: r"$E_c = 3{,}5$ kJ"),
            ),
            _q(
              2,
              "Énergie potentielle gagnée en montant une côte de 50 m.",
              1,
              _sol([
                _step(
                  "\$\\Delta E_p = m g \\Delta h = 70 \\times 10 \\times 50 = 35\\,000\\,\\text{J} = 35\\,\\text{kJ}\$.",
                ),
              ], finalAnswerFr: r"$\Delta E_p = 35$ kJ"),
            ),
            _q(
              3,
              "Hauteur atteinte si toute l'énergie cinétique est convertie en énergie potentielle.",
              2,
              _sol([
                _step(
                  "Conservation : \$E_c \\to E_p \\iff mgh = 3500 \\Rightarrow h = \\dfrac{3500}{700} = 5\\,\\text{m}\$.",
                ),
                _step(
                  "Pour gravir 50 m, il faut donc fournir \$35 - 3{,}5 = 31{,}5\\,\\text{kJ}\$ supplémentaires (en pédalant).",
                ),
              ], finalAnswerFr: r"$h = 5$ m"),
            ),
          ],
        ),
        _ex(
          2,
          'Conservation sur toboggan',
          5,
          "Un enfant de 25 kg glisse depuis le haut d'un toboggan de hauteur 4 m, partant du repos. \$g = 10\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "En absence de frottement, vitesse en bas.",
              3,
              _sol([
                _step(
                  "Conservation de l'énergie mécanique : \$E_m^\\text{haut} = E_m^\\text{bas}\$, soit \$mgh = \\dfrac{1}{2} m v^2\$.",
                ),
                _step(
                  "Simplification : \$v = \\sqrt{2 g h} = \\sqrt{2 \\times 10 \\times 4} = \\sqrt{80} \\approx 8{,}94\\,\\text{m/s} \\approx 32\\,\\text{km/h}\$.",
                ),
                _step(
                  "**Résultat indépendant de la masse** — un adulte et un enfant arrivent à la même vitesse. La masse se simplifie dans l'équation.",
                  tipFr:
                      "C'est le même principe que la chute libre — toutes les masses tombent à la même vitesse en absence d'air (Galilée à Pise).",
                ),
              ], finalAnswerFr: r"$v \approx 8{,}94$ m/s"),
            ),
            _q(
              2,
              "Si avec frottement l'enfant arrive à 7 m/s, énergie dissipée.",
              2,
              _sol([
                _step(
                  "Énergie initiale : \$E_m^\\text{haut} = mgh = 25 \\times 10 \\times 4 = 1000\\,\\text{J}\$.",
                ),
                _step(
                  "Énergie cinétique finale : \$E_c^\\text{bas} = 0{,}5 \\times 25 \\times 49 = 612{,}5\\,\\text{J}\$.",
                ),
                _step(
                  "Énergie dissipée par frottement : \$\\Delta E = 1000 - 612{,}5 = 387{,}5\\,\\text{J}\$ — soit 38,7% de l'énergie initiale convertie en chaleur.",
                ),
              ], finalAnswerFr: r"$\Delta E = 387{,}5$ J"),
            ),
          ],
        ),
        _ex(
          3,
          'Ressort — énergie élastique',
          5,
          "Un ressort de raideur \$k = 500\\,\\text{N/m}\$ est comprimé de \$x = 10\\,\\text{cm}\$, puis libéré pour propulser une bille de masse \$m = 0{,}2\\,\\text{kg}\$ horizontalement.",
          [
            _q(
              1,
              "Énergie potentielle élastique stockée.",
              2,
              _sol([
                _step(
                  "\$E_{pe} = \\dfrac{1}{2} k x^2 = 0{,}5 \\times 500 \\times (0{,}1)^2 = 2{,}5\\,\\text{J}\$.",
                ),
              ], finalAnswerFr: r"$E_{pe} = 2{,}5$ J"),
            ),
            _q(
              2,
              "Vitesse maximale de la bille.",
              3,
              _sol([
                _step(
                  "Conservation (sans frottement) : \$\\dfrac{1}{2} k x^2 = \\dfrac{1}{2} m v^2 \\Rightarrow v = x \\sqrt{\\dfrac{k}{m}}\$.",
                ),
                _step(
                  "\$v = 0{,}1 \\times \\sqrt{500/0{,}2} = 0{,}1 \\times \\sqrt{2500} = 0{,}1 \\times 50 = 5\\,\\text{m/s}\$.",
                ),
                _step(
                  "**Lien avec la pulsation propre** : \$\\omega_0 = \\sqrt{k/m}\$. Donc \$v_\\text{max} = x \\omega_0\$ (vitesse maximale d'un oscillateur harmonique d'amplitude \$x\$).",
                  tipFr:
                      "\$\\omega_0 = \\sqrt{k/m}\$ apparaît partout en oscillations : ressort, pendule, RLC. La formule structurale est universelle.",
                ),
              ], finalAnswerFr: r"$v = 5$ m/s"),
            ),
          ],
        ),
        _ex(
          4,
          'Théorème de l\'énergie cinétique avec frottement',
          5,
          "Une caisse de 30 kg est tirée sur un sol horizontal par une force \$F = 100\\,\\text{N}\$ pendant \$d = 5\\,\\text{m}\$. Coefficient de frottement \$\\mu = 0{,}2\$, \$g = 10\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Travaux de \$F\$ et du frottement.",
              3,
              _sol([
                _step(
                  "**Travail de \$F\$** (parallèle au mouvement) : \$W_F = F \\cdot d = 100 \\times 5 = 500\\,\\text{J}\$.",
                ),
                _step(
                  "**Frottement** : réaction normale \$R = mg = 300\\,\\text{N}\$ ; force de frottement \$f = \\mu R = 60\\,\\text{N}\$, opposée au mouvement.",
                ),
                _step(
                  "Travail du frottement : \$W_f = -f \\cdot d = -300\\,\\text{J}\$ (négatif, force opposée).",
                ),
                _step(
                  "Travaux du poids et de la réaction normale : nuls (perpendiculaires au déplacement horizontal).",
                ),
              ], finalAnswerFr: r"$W_F = 500$ J, $W_f = -300$ J"),
            ),
            _q(
              2,
              "Vitesse finale, partant du repos.",
              2,
              _sol([
                _step(
                  "**Théorème de l'énergie cinétique** : \$\\Delta E_c = \\sum W_\\text{ext} = 500 - 300 = 200\\,\\text{J}\$.",
                ),
                _step(
                  "\$\\dfrac{1}{2} m v^2 = 200 \\Rightarrow v = \\sqrt{400/30} \\approx 3{,}65\\,\\text{m/s}\$.",
                ),
              ], finalAnswerFr: r"$v \approx 3{,}65$ m/s"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperPendulum() => _paper(
      titleFr: 'Épreuve type — Pendule pesant et pendule élastique',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Pendule simple : période \$T = 2\\pi\\sqrt{L/g}\$. Pendule élastique : \$T = 2\\pi\\sqrt{m/k}\$. Équation différentielle \$\\theta'' + \\omega_0^2 \\theta = 0\$ pour petites oscillations.",
      exercices: [
        _ex(
          1,
          'Pendule simple',
          5,
          "Un pendule simple est constitué d'une masse \$m = 200\\,\\text{g}\$ suspendue à un fil inextensible de longueur \$L = 1\\,\\text{m}\$. On l'écarte d'un petit angle \$\\theta_0\$ puis on lâche. \$g = 9{,}81\\,\\text{m/s}^2\$.",
          [
            _q(
              1,
              "Établir l'équation différentielle du mouvement pour de petites oscillations.",
              3,
              _sol([
                _step(
                  "Forces : poids \$\\vec P\$ et tension \$\\vec T\$ du fil. Projection sur la tangente à la trajectoire (axe \$\\theta\$) : seule la composante tangentielle du poids agit, soit \$-mg \\sin\\theta\$ (rappel vers la verticale).",
                ),
                _step(
                  "**2ème loi de Newton sur l'axe tangentiel** : \$m L \\theta'' = -mg \\sin\\theta\$ (accélération tangentielle \$= L\\theta''\$ pour un cercle).",
                ),
                _step(
                  "**Approximation des petites oscillations** : \$\\sin\\theta \\approx \\theta\$ (rad). L'équation devient : \$\\theta'' + \\dfrac{g}{L} \\theta = 0\$.",
                  tipFr:
                      "L'approximation \$\\sin\\theta \\approx \\theta\$ est valable pour \$|\\theta| < 0{,}2\\,\\text{rad} \\approx 12°\$ avec erreur < 1%. Au-delà, le pendule devient anharmonique.",
                ),
              ], finalAnswerFr: r"$\theta'' + (g/L) \theta = 0$"),
            ),
            _q(
              2,
              "Identifier la pulsation propre \$\\omega_0\$ et la période \$T_0\$.",
              2,
              _sol([
                _step(
                  "Forme canonique \$\\theta'' + \\omega_0^2 \\theta = 0\$ avec \$\\omega_0^2 = g/L\$.",
                ),
                _step(
                  "\$\\omega_0 = \\sqrt{g/L} = \\sqrt{9{,}81/1} \\approx 3{,}13\\,\\text{rad/s}\$.",
                ),
                _step(
                  "Période : \$T_0 = \\dfrac{2\\pi}{\\omega_0} = 2\\pi\\sqrt{\\dfrac{L}{g}} = 2\\pi\\sqrt{1/9{,}81} \\approx 2{,}01\\,\\text{s}\$.",
                  tipFr:
                      "**Isochronisme** : la période est indépendante de l'amplitude (en petites oscillations) ET indépendante de la masse. C'est l'observation de Galilée.",
                ),
              ], finalAnswerFr: r"$\omega_0 \approx 3{,}13$ rad/s, $T_0 \approx 2$ s"),
            ),
          ],
        ),
        _ex(
          2,
          'Pendule élastique',
          5,
          "Une masse \$m = 0{,}5\\,\\text{kg}\$ est accrochée à un ressort horizontal de raideur \$k = 50\\,\\text{N/m}\$, sur un support sans frottement. On l'écarte de \$x_0 = 5\\,\\text{cm}\$ puis on lâche.",
          [
            _q(
              1,
              "Établir l'équation différentielle.",
              2,
              _sol([
                _step(
                  "Seule force horizontale (autre que la normale verticale) : force de rappel du ressort \$F = -k x\$ (loi de Hooke).",
                ),
                _step(
                  "2ème loi : \$m x'' = -k x \\Rightarrow x'' + \\dfrac{k}{m} x = 0\$.",
                ),
              ], finalAnswerFr: r"$x'' + (k/m) x = 0$"),
            ),
            _q(
              2,
              "Pulsation, période, fréquence.",
              2,
              _sol([
                _step(
                  "\$\\omega_0 = \\sqrt{k/m} = \\sqrt{50/0{,}5} = \\sqrt{100} = 10\\,\\text{rad/s}\$.",
                ),
                _step(
                  "Période : \$T_0 = 2\\pi/\\omega_0 = 2\\pi/10 \\approx 0{,}628\\,\\text{s}\$. Fréquence : \$f = 1/T \\approx 1{,}59\\,\\text{Hz}\$.",
                ),
              ], finalAnswerFr: r"$\omega_0 = 10$ rad/s, $T \approx 0{,}63$ s"),
            ),
            _q(
              3,
              "Solution générale \$x(t)\$ avec conditions initiales \$x(0) = x_0\$ et \$x'(0) = 0\$.",
              1,
              _sol([
                _step(
                  "Solution générale : \$x(t) = A \\cos(\\omega_0 t) + B \\sin(\\omega_0 t)\$.",
                ),
                _step(
                  "CI : \$x(0) = A = x_0 = 0{,}05\\,\\text{m}\$. \$x'(0) = B \\omega_0 = 0 \\Rightarrow B = 0\$.",
                ),
                _step(
                  "Donc \$x(t) = 0{,}05 \\cos(10\\,t)\$ (en mètres).",
                ),
              ], finalAnswerFr: r"$x(t) = 0{,}05 \cos(10 t)$"),
            ),
          ],
        ),
        _ex(
          3,
          'Énergie d\'un oscillateur',
          5,
          "Reprenons le pendule élastique de l'exercice 2.",
          [
            _q(
              1,
              "Calculer l'énergie mécanique \$E_m\$ totale (constante).",
              2,
              _sol([
                _step(
                  "À \$t = 0\$ : vitesse nulle, position \$x_0 = 0{,}05\\,\\text{m}\$. Toute l'énergie est potentielle élastique.",
                ),
                _step(
                  "\$E_m = E_{pe} = \\dfrac{1}{2} k x_0^2 = 0{,}5 \\times 50 \\times (0{,}05)^2 = 0{,}0625\\,\\text{J} = 62{,}5\\,\\text{mJ}\$.",
                ),
              ], finalAnswerFr: r"$E_m = 62{,}5$ mJ"),
            ),
            _q(
              2,
              "Vitesse maximale (au passage par la position d'équilibre).",
              2,
              _sol([
                _step(
                  "À \$x = 0\$ : énergie potentielle nulle, donc \$E_m = E_c = \\dfrac{1}{2} m v_\\text{max}^2\$.",
                ),
                _step(
                  "\$v_\\text{max} = \\sqrt{2 E_m / m} = \\sqrt{0{,}125/0{,}5} = \\sqrt{0{,}25} = 0{,}5\\,\\text{m/s}\$.",
                ),
                _step(
                  "Vérification : \$v_\\text{max} = x_0 \\omega_0 = 0{,}05 \\times 10 = 0{,}5\\,\\text{m/s}\$ ✓.",
                  tipFr:
                      "Pour un oscillateur harmonique : \$v_\\text{max} = x_\\text{max} \\cdot \\omega_0\$. Identité utile pour relier amplitudes et vitesses.",
                ),
              ], finalAnswerFr: r"$v_\text{max} = 0{,}5$ m/s"),
            ),
            _q(
              3,
              "Vérifier que \$E_c + E_{pe}\$ est constante en tout point.",
              1,
              _sol([
                _step(
                  "À position quelconque \$x\$, vitesse \$v\$ : \$E_c + E_{pe} = \\frac{1}{2} m v^2 + \\frac{1}{2} k x^2\$. Conservation : valeur = \$E_m = \\frac{1}{2} k x_0^2\$ (initiale).",
                ),
                _step(
                  "Échange continu : à \$x = 0\$, tout est cinétique ; aux extrémités, tout est potentiel. Caractéristique des oscillations harmoniques sans frottement.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Pendule pesant — petites oscillations',
          5,
          "Un pendule pesant est un solide pouvant tourner autour d'un axe fixe horizontal, ne passant pas par son centre de gravité. La période s'écrit \$T = 2\\pi \\sqrt{J_\\Delta/(mgd)}\$ avec \$J_\\Delta\$ moment d'inertie, \$d\$ distance axe-centre de gravité.",
          [
            _q(
              1,
              "Application : tige homogène de masse 1 kg et longueur 60 cm, suspendue à un bout. \$J = \\frac{1}{3} m L^2\$, \$d = L/2\$. Calculer T.",
              4,
              _sol([
                _step(
                  "Données : \$m = 1\\,\\text{kg}\$, \$L = 0{,}6\\,\\text{m}\$, \$d = L/2 = 0{,}3\\,\\text{m}\$.",
                ),
                _step(
                  "\$J = \\dfrac{1}{3} m L^2 = \\dfrac{1}{3} \\times 1 \\times 0{,}36 = 0{,}12\\,\\text{kg}\\cdot\\text{m}^2\$.",
                ),
                _step(
                  "\$T = 2\\pi \\sqrt{\\dfrac{J}{m g d}} = 2\\pi \\sqrt{\\dfrac{0{,}12}{1 \\times 9{,}81 \\times 0{,}3}} = 2\\pi \\sqrt{0{,}0408} \\approx 2\\pi \\times 0{,}202 \\approx 1{,}27\\,\\text{s}\$.",
                ),
                _step(
                  "**Comparaison avec un pendule simple** de longueur 60 cm : \$T_\\text{simple} = 2\\pi\\sqrt{0{,}6/9{,}81} \\approx 1{,}55\\,\\text{s}\$. Le pendule pesant oscille **plus vite** car sa masse est concentrée plus haut.",
                  tipFr:
                      "**Longueur équivalente** \$L_\\text{eq} = J/(m d)\$ donne la longueur du pendule simple de même période. Pour la tige : \$L_\\text{eq} = 0{,}12/0{,}3 = 0{,}4\\,\\text{m}\$.",
                ),
              ], finalAnswerFr: r"$T \approx 1{,}27$ s"),
            ),
            _q(
              2,
              "Fréquence et nombre d'oscillations en 1 minute.",
              1,
              _sol([
                _step(
                  "\$f = 1/T \\approx 0{,}787\\,\\text{Hz}\$. Nombre d'oscillations en 60 s : \$N = 60/T \\approx 47\\,\\text{oscillations}\$.",
                ),
              ], finalAnswerFr: r"$f \approx 0{,}79$ Hz, $N \approx 47$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRcCircuit() => _paper(
      titleFr: 'Épreuve type — Dipôle RC',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Charge \$u_C(t) = E(1 - e^{-t/\\tau})\$ et décharge \$u_C(t) = U_0 e^{-t/\\tau}\$ avec \$\\tau = RC\$. Énergie stockée \$\\frac{1}{2} C u_C^2\$.",
      exercices: [
        _ex(
          1,
          'Charge d\'un condensateur',
          5,
          "Circuit série : générateur idéal \$E = 12\\,\\text{V}\$, \$R = 1\\,\\text{k}\\Omega\$, \$C = 470\\,\\mu\\text{F}\$. À \$t = 0\$ on ferme l'interrupteur, condensateur initialement déchargé.",
          [
            _q(
              1,
              "Établir l'équation différentielle vérifiée par \$u_C(t)\$.",
              2,
              _sol([
                _step(
                  "Loi des mailles : \$E = u_R + u_C = R i + u_C\$. Avec \$i = C\\,du_C/dt\$ : \$E = RC \\dfrac{du_C}{dt} + u_C\$.",
                ),
                _step(
                  "Forme canonique : \$\\dfrac{du_C}{dt} + \\dfrac{1}{RC} u_C = \\dfrac{E}{RC}\$, ou \$\\tau \\dfrac{du_C}{dt} + u_C = E\$ avec \$\\tau = RC\$.",
                ),
              ], finalAnswerFr: r"$\tau \dfrac{du_C}{dt} + u_C = E$"),
            ),
            _q(
              2,
              "Calculer la constante de temps \$\\tau\$.",
              1,
              _sol([
                _step(
                  "\$\\tau = RC = 10^3 \\times 470 \\times 10^{-6} = 0{,}47\\,\\text{s} = 470\\,\\text{ms}\$.",
                  tipFr:
                      "Vérification dimensionnelle : \$[\\tau] = \\Omega \\cdot \\text{F} = \\text{V/A} \\cdot \\text{C/V} = \\text{C/A} = \\text{s}\$ ✓.",
                ),
              ], finalAnswerFr: r"$\tau = 470$ ms"),
            ),
            _q(
              3,
              "Donner \$u_C(t)\$.",
              1,
              _sol([
                _step(
                  "Solution : \$u_C(t) = E(1 - e^{-t/\\tau}) = 12(1 - e^{-t/0{,}47})\\,\\text{V}\$.",
                ),
                _step(
                  "Limites : \$u_C(0) = 0\$ ✓ ; \$\\lim_{+\\infty} u_C = E = 12\\,\\text{V}\$ (régime permanent).",
                ),
              ], finalAnswerFr: r"$u_C(t) = 12(1 - e^{-t/0{,}47})$"),
            ),
            _q(
              4,
              "Au bout de combien de temps \$u_C\$ atteint-il 95% de \$E\$ ?",
              1,
              _sol([
                _step(
                  "\$1 - e^{-t/\\tau} = 0{,}95 \\iff t = \\tau \\ln 20 \\approx 3\\tau \\approx 1{,}41\\,\\text{s}\$.",
                ),
                _step(
                  "**Règles pratiques** : \$3\\tau\$ → 95% ; \$5\\tau\$ → 99,3% ; le régime est considéré 'établi' au-delà de \$5\\tau\$.",
                ),
              ], finalAnswerFr: r"$t \approx 3\tau \approx 1{,}4$ s"),
            ),
          ],
        ),
        _ex(
          2,
          'Décharge',
          5,
          "Le condensateur est chargé à \$U_0 = 12\\,\\text{V}\$. On le décharge dans une résistance \$R' = 2\\,\\text{k}\\Omega\$.",
          [
            _q(
              1,
              "Équation différentielle et solution \$u_C(t)\$.",
              3,
              _sol([
                _step(
                  "Maille (sans générateur) : \$0 = R' i + u_C\$ avec \$i = C\\,du_C/dt\$. Donc \$R'C \\dfrac{du_C}{dt} + u_C = 0\$.",
                ),
                _step(
                  "Solution : \$u_C(t) = U_0 e^{-t/\\tau'}\$ avec \$\\tau' = R'C\$.",
                ),
                _step(
                  "\$\\tau' = 2000 \\times 470 \\times 10^{-6} = 0{,}94\\,\\text{s}\$. Donc \$u_C(t) = 12 e^{-t/0{,}94}\\,\\text{V}\$.",
                ),
              ], finalAnswerFr: r"$u_C(t) = 12 e^{-t/0{,}94}$"),
            ),
            _q(
              2,
              "Énergie initialement stockée puis dissipée par effet Joule.",
              2,
              _sol([
                _step(
                  "Énergie initiale : \$E_C^\\text{init} = \\dfrac{1}{2} C U_0^2 = 0{,}5 \\times 470 \\times 10^{-6} \\times 144 \\approx 33{,}8\\,\\text{mJ}\$.",
                ),
                _step(
                  "À long terme, \$u_C \\to 0\$ donc \$E_C \\to 0\$. **Toute** l'énergie initiale est dissipée par effet Joule dans \$R'\$ (conservation).",
                  tipFr:
                      "**Décharge** : 100% Joule. **Charge** : 50% Joule + 50% stockée dans \$C\$ — résultat universel, indépendant de \$R\$ et \$C\$.",
                ),
              ], finalAnswerFr: r"$E_J \approx 33{,}8$ mJ"),
            ),
          ],
        ),
        _ex(
          3,
          'Mesure de C par chronométrage',
          5,
          "Un condensateur inconnu est associé à \$R = 10\\,\\text{k}\\Omega\$. On observe que \$u_C\$ passe de 12 V à 6 V en 2 secondes lors d'une décharge.",
          [
            _q(
              1,
              "Que représente la durée de 2 s ?",
              2,
              _sol([
                _step(
                  "\$u_C\$ divisé par 2 → \$e^{-t/\\tau} = 1/2 \\iff t = \\tau \\ln 2\$.",
                ),
                _step(
                  "C'est le **temps de demi-décharge** : \$t_{1/2} = \\tau \\ln 2\$. Analogue à la demi-vie radioactive.",
                ),
              ], finalAnswerFr: r"$t_{1/2} = \tau \ln 2$"),
            ),
            _q(
              2,
              "Calculer \$\\tau\$ puis \$C\$.",
              3,
              _sol([
                _step(
                  "\$\\tau = t_{1/2}/\\ln 2 = 2/0{,}693 \\approx 2{,}885\\,\\text{s}\$.",
                ),
                _step(
                  "\$C = \\tau/R = 2{,}885/10\\,000 \\approx 2{,}88 \\times 10^{-4}\\,\\text{F} \\approx 288\\,\\mu\\text{F}\$.",
                  tipFr:
                      "Méthode standard de mesure : chronométrer la chute à mi-amplitude donne directement \$\\tau\$ (sans formule complexe).",
                ),
              ], finalAnswerFr: r"$C \approx 288$ μF"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — flash photographique',
          5,
          "Un flash utilise un condensateur \$C = 1000\\,\\mu\\text{F}\$ chargé à \$U_0 = 300\\,\\text{V}\$ qui se décharge en \$\\Delta t \\approx 1\\,\\text{ms}\$ à travers le tube éclair.",
          [
            _q(
              1,
              "Énergie disponible pour l'éclair.",
              2,
              _sol([
                _step(
                  "\$E = \\dfrac{1}{2} C U_0^2 = 0{,}5 \\times 10^{-3} \\times 90\\,000 = 45\\,\\text{J}\$.",
                ),
              ], finalAnswerFr: r"$E = 45$ J"),
            ),
            _q(
              2,
              "Puissance moyenne pendant l'éclair.",
              2,
              _sol([
                _step(
                  "\$P_\\text{moy} = E/\\Delta t = 45/10^{-3} = 45\\,000\\,\\text{W} = 45\\,\\text{kW}\$.",
                ),
                _step(
                  "**45 kW pendant 1 ms** — puissance crête énorme. C'est ce qui permet l'éclair intense pour figer le mouvement en photographie.",
                  tipFr:
                      "Principe identique pour les défibrillateurs cardiaques : on stocke lentement (charges au secteur), on décharge instantanément (kJ en quelques ms).",
                ),
              ], finalAnswerFr: r"$P \approx 45$ kW"),
            ),
            _q(
              3,
              "Résistance équivalente du tube pour avoir \$\\tau = 1\\,\\text{ms}\$.",
              1,
              _sol([
                _step(
                  "\$\\tau = R_\\text{tube} \\cdot C \\iff R_\\text{tube} = \\tau/C = 10^{-3}/10^{-3} = 1\\,\\Omega\$. Très faible — c'est un plasma conducteur.",
                ),
              ], finalAnswerFr: r"$R \approx 1$ Ω"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRlCircuit() => _paper(
      titleFr: 'Épreuve type — Dipôle RL',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Établissement \$i(t) = I_\\text{max}(1 - e^{-t/\\tau})\$ et rupture \$i(t) = I_0 e^{-t/\\tau}\$ avec \$\\tau = L/R\$. Énergie magnétique \$\\frac{1}{2} L i^2\$.",
      exercices: [
        _ex(
          1,
          'Établissement du courant',
          5,
          "Circuit série : \$E = 6\\,\\text{V}\$, \$R = 30\\,\\Omega\$, bobine \$L = 0{,}1\\,\\text{H}\$ (résistance interne négligeable). À \$t = 0\$ on ferme.",
          [
            _q(
              1,
              "Établir l'équation différentielle pour \$i(t)\$.",
              2,
              _sol([
                _step(
                  "Loi des mailles : \$E = u_R + u_L = R i + L \\dfrac{di}{dt}\$.",
                ),
                _step(
                  "Forme : \$L \\dfrac{di}{dt} + R i = E\$, ou \$\\dfrac{di}{dt} + \\dfrac{R}{L} i = \\dfrac{E}{L}\$. Avec \$\\tau = L/R\$ : \$\\tau \\dfrac{di}{dt} + i = I_\\text{max}\$ avec \$I_\\text{max} = E/R\$.",
                ),
              ], finalAnswerFr: r"$\tau di/dt + i = I_\text{max}$"),
            ),
            _q(
              2,
              "Calculer \$\\tau\$ et \$I_\\text{max}\$.",
              1,
              _sol([
                _step(
                  "\$\\tau = L/R = 0{,}1/30 \\approx 3{,}33\\,\\text{ms}\$. \$I_\\text{max} = E/R = 6/30 = 0{,}2\\,\\text{A} = 200\\,\\text{mA}\$.",
                  tipFr:
                      "Vérification dimensionnelle : \$[L/R] = \\text{H}/\\Omega = (\\text{V}\\cdot\\text{s/A})/(\\text{V/A}) = \\text{s}\$ ✓.",
                ),
              ], finalAnswerFr: r"$\tau \approx 3{,}33$ ms, $I_\text{max} = 200$ mA"),
            ),
            _q(
              3,
              "Donner \$i(t)\$ et \$u_L(t)\$.",
              2,
              _sol([
                _step(
                  "Solution : \$i(t) = I_\\text{max}(1 - e^{-t/\\tau}) = 0{,}2(1 - e^{-t/0{,}00333})\\,\\text{A}\$.",
                ),
                _step(
                  "Tension bobine : \$u_L = L\\,di/dt = L \\cdot I_\\text{max}/\\tau \\cdot e^{-t/\\tau} = E e^{-t/\\tau} = 6 e^{-t/0{,}00333}\\,\\text{V}\$.",
                ),
                _step(
                  "À \$t = 0\$ : \$i = 0\$ et \$u_L = E = 6\\,\\text{V}\$ (toute la tension est absorbée par la bobine). À l'infini : \$i = I_\\text{max}\$, \$u_L = 0\$ (la bobine se comporte comme un fil).",
                  tipFr:
                      "**Comportements asymptotiques** : à l'instant initial, la bobine s'oppose au courant (\$u_L\$ max) ; en régime permanent, elle est invisible (\$u_L = 0\$).",
                ),
              ], finalAnswerFr: r"$i = 0{,}2(1 - e^{-t/\tau})$, $u_L = 6 e^{-t/\tau}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Rupture du courant',
          5,
          "Après le régime établi, on bascule un interrupteur qui isole \$E\$ et ferme le circuit \$(L, R)\$.",
          [
            _q(
              1,
              "Donner l'équation différentielle et la solution \$i(t)\$.",
              3,
              _sol([
                _step(
                  "Maille (sans générateur) : \$0 = R i + L\\,di/dt \\iff \\dfrac{di}{dt} + \\dfrac{R}{L} i = 0\$.",
                ),
                _step(
                  "Solution : \$i(t) = I_0 e^{-t/\\tau}\$ avec \$I_0 = I_\\text{max} = 0{,}2\\,\\text{A}\$ (continuité du courant dans la bobine).",
                ),
                _step(
                  "\$i(t) = 0{,}2 e^{-t/0{,}00333}\\,\\text{A}\$.",
                ),
              ], finalAnswerFr: r"$i(t) = 0{,}2 e^{-t/\tau}$"),
            ),
            _q(
              2,
              "Énergie stockée puis dissipée.",
              2,
              _sol([
                _step(
                  "Énergie stockée à \$t = 0\$ (instant de bascule) : \$E_L = \\dfrac{1}{2} L I_0^2 = 0{,}5 \\times 0{,}1 \\times 0{,}04 = 2 \\times 10^{-3}\\,\\text{J} = 2\\,\\text{mJ}\$.",
                ),
                _step(
                  "À long terme, \$i \\to 0\$, \$E_L \\to 0\$. Conservation : 2 mJ dissipés par effet Joule dans R.",
                ),
              ], finalAnswerFr: r"$E_J = 2$ mJ"),
            ),
          ],
        ),
        _ex(
          3,
          'Symétrie RC vs RL',
          5,
          "Comparer les comportements transitoires des circuits RC et RL.",
          [
            _q(
              1,
              "Compléter le tableau d'analogies.",
              4,
              _sol([
                _step(
                  "| Grandeur | Circuit RC | Circuit RL |",
                ),
                _step(
                  "| Quantité qui ne saute pas | \$u_C\$ (charge) | \$i\$ (flux magnétique) |",
                ),
                _step(
                  "| Constante de temps | \$\\tau = RC\$ | \$\\tau = L/R\$ |",
                ),
                _step(
                  "| Énergie stockée | \$\\frac{1}{2} C u_C^2\$ (électrique) | \$\\frac{1}{2} L i^2\$ (magnétique) |",
                ),
                _step(
                  "| À t=0 en régime initial | \$u_C\$ continu | \$i\$ continu |",
                ),
                _step(
                  "| À l'infini en charge | \$u_C \\to E\$, \$i \\to 0\$ | \$i \\to E/R\$, \$u_L \\to 0\$ |",
                  tipFr:
                      "Les deux circuits sont **mathématiquement équivalents** : équations différentielles linéaires du 1er ordre avec même structure. Seules les variables physiques diffèrent.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Application — protection contre les surtensions',
          5,
          "À la rupture d'un circuit RL, si on coupe brutalement (ouverture d'interrupteur), \$di/dt\$ devient très grand → \$u_L = L\\,di/dt\$ peut produire une étincelle.",
          [
            _q(
              1,
              "Pourquoi cette surtension apparaît-elle ?",
              3,
              _sol([
                _step(
                  "La bobine veut maintenir son courant (\$i\$ ne peut pas sauter). Si on ouvre brutalement le circuit, \$i\$ chute en \$\\Delta t\$ très petit, donc \$di/dt = -i_0/\\Delta t\$ très grand en valeur absolue.",
                ),
                _step(
                  "\$u_L = L\\,di/dt\$ devient énorme — peut atteindre des centaines de volts pour ionisation de l'air → étincelle (arc électrique).",
                ),
                _step(
                  "**Conséquences** : usure des contacts, parasites électromagnétiques, danger pour les semiconducteurs avoisinants.",
                ),
              ]),
            ),
            _q(
              2,
              "Solution pratique : diode de roue libre.",
              2,
              _sol([
                _step(
                  "On place une **diode** en parallèle avec la bobine, polarisée en inverse (bloquante) en fonctionnement normal.",
                ),
                _step(
                  "À l'ouverture, le courant \$i\$ continue à circuler à travers la diode (qui devient passante grâce à la tension induite). L'énergie est dissipée progressivement, sans pic de tension.",
                  tipFr:
                      "Diode de roue libre : présente sur tout relais, moteur DC, alimentation à découpage — composant invisible mais critique.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRlcOscillations() => _paper(
      titleFr: 'Épreuve type — Oscillations RLC libres',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Régime libre du RLC série : trois régimes selon \$R\$ vs \$R_c = 2\\sqrt{L/C}\$ (pseudo-périodique, critique, apériodique). Pulsation propre \$\\omega_0 = 1/\\sqrt{LC}\$.",
      exercices: [
        _ex(
          1,
          'Circuit LC idéal',
          5,
          "Un circuit LC sans résistance : \$L = 1\\,\\text{H}\$, \$C = 4\\,\\mu\\text{F}\$. Condensateur initialement chargé à \$U_0 = 10\\,\\text{V}\$, \$i(0) = 0\$.",
          [
            _q(
              1,
              "Établir l'équation différentielle vérifiée par \$u_C(t)\$.",
              2,
              _sol([
                _step(
                  "Maille : \$u_C + u_L = 0 \\iff u_C + L\\,di/dt = 0\$. Avec \$i = -C\\,du_C/dt\$ (orientation), \$di/dt = -C\\,d^2 u_C/dt^2\$.",
                ),
                _step(
                  "Donc \$u_C - LC\\,\\dfrac{d^2 u_C}{dt^2} = 0 \\iff \\dfrac{d^2 u_C}{dt^2} + \\dfrac{1}{LC} u_C = 0\$.",
                ),
                _step(
                  "Forme canonique de l'oscillateur harmonique : \$u_C'' + \\omega_0^2 u_C = 0\$ avec \$\\omega_0 = 1/\\sqrt{LC}\$.",
                ),
              ], finalAnswerFr: r"$u_C'' + \omega_0^2 u_C = 0$"),
            ),
            _q(
              2,
              "Calculer \$\\omega_0\$, période \$T_0\$ et fréquence \$f_0\$.",
              2,
              _sol([
                _step(
                  "\$\\omega_0 = 1/\\sqrt{LC} = 1/\\sqrt{4 \\times 10^{-6}} = 1/(2 \\times 10^{-3}) = 500\\,\\text{rad/s}\$.",
                ),
                _step(
                  "\$T_0 = 2\\pi/\\omega_0 \\approx 12{,}57\\,\\text{ms}\$. \$f_0 = 1/T_0 \\approx 79{,}6\\,\\text{Hz}\$.",
                ),
              ], finalAnswerFr: r"$\omega_0 = 500$ rad/s, $T_0 \approx 12{,}6$ ms"),
            ),
            _q(
              3,
              "Solution \$u_C(t)\$ et courant \$i(t)\$.",
              1,
              _sol([
                _step(
                  "Solution générale : \$u_C(t) = A\\cos(\\omega_0 t) + B\\sin(\\omega_0 t)\$. CI : \$u_C(0) = U_0 = A\$ ; \$i(0) = -C\\,u_C'(0) = -C B\\omega_0 = 0 \\Rightarrow B = 0\$.",
                ),
                _step(
                  "Donc \$u_C(t) = U_0\\cos(\\omega_0 t) = 10\\cos(500\\,t)\\,\\text{V}\$. Courant : \$i(t) = -C u_C' = C U_0 \\omega_0 \\sin(\\omega_0 t) = 0{,}02\\sin(500 t)\\,\\text{A}\$.",
                ),
              ], finalAnswerFr: r"$u_C = 10\cos(500t)$, $i = 0{,}02\sin(500t)$"),
            ),
          ],
        ),
        _ex(
          2,
          'Conservation de l\'énergie',
          5,
          "On reprend le circuit LC précédent.",
          [
            _q(
              1,
              "Énergie totale stockée.",
              2,
              _sol([
                _step(
                  "À \$t = 0\$ : \$i = 0\$ donc \$E_L = 0\$ ; tout est dans le condensateur : \$E_C = \\dfrac{1}{2} C U_0^2 = 0{,}5 \\times 4 \\times 10^{-6} \\times 100 = 2 \\times 10^{-4}\\,\\text{J} = 0{,}2\\,\\text{mJ}\$.",
                ),
                _step(
                  "Par conservation (pas de R) : \$E_\\text{tot} = E_C + E_L = 0{,}2\\,\\text{mJ}\$ à tout instant.",
                ),
              ], finalAnswerFr: r"$E_\text{tot} = 0{,}2$ mJ"),
            ),
            _q(
              2,
              "Quand \$u_C = 0\$, quel est le courant ? Vérifier la conservation.",
              3,
              _sol([
                _step(
                  "À cet instant : \$E_C = 0\$, donc \$E_L = E_\\text{tot} = 0{,}2\\,\\text{mJ}\$.",
                ),
                _step(
                  "\$\\dfrac{1}{2} L i^2 = 2 \\times 10^{-4} \\iff |i| = \\sqrt{4 \\times 10^{-4}/1} = 0{,}02\\,\\text{A} = 20\\,\\text{mA}\$.",
                ),
                _step(
                  "Cohérent avec l'amplitude \$I_\\text{max} = 0{,}02\\,\\text{A}\$ trouvée précédemment. **L'énergie oscille entre \$C\$ (électrique) et \$L\$ (magnétique)** sans perte.",
                  tipFr:
                      "Analogue mécanique : oscillateur ressort-masse — l'énergie oscille entre cinétique et potentielle élastique, sans amortissement.",
                ),
              ], finalAnswerFr: r"$|i| = I_\text{max} = 20$ mA"),
            ),
          ],
        ),
        _ex(
          3,
          'RLC réel — trois régimes',
          5,
          "On ajoute une résistance \$R\$ en série dans le circuit.",
          [
            _q(
              1,
              "Donner le critère de régime selon \$R\$.",
              3,
              _sol([
                _step(
                  "Équation : \$L\\,d^2 q/dt^2 + R\\,dq/dt + q/C = 0\$. Équation caractéristique : \$L r^2 + R r + 1/C = 0\$.",
                ),
                _step(
                  "Discriminant : \$\\Delta = R^2 - 4L/C\$. **Trois cas** :",
                ),
                _step(
                  "**\$\\Delta < 0\$** (\$R < R_c = 2\\sqrt{L/C}\$) : régime **pseudo-périodique** (oscillations amorties exponentiellement).",
                ),
                _step(
                  "**\$\\Delta = 0\$** (\$R = R_c\$) : régime **critique** (retour le plus rapide sans oscillation).",
                ),
                _step(
                  "**\$\\Delta > 0\$** (\$R > R_c\$) : régime **apériodique** (retour lent sans oscillation, somme de deux exponentielles).",
                ),
              ], finalAnswerFr: r"Critère: $R$ vs $R_c = 2\sqrt{L/C}$"),
            ),
            _q(
              2,
              "Calculer \$R_c\$ pour \$L = 1\\,\\text{H}\$, \$C = 4\\,\\mu\\text{F}\$.",
              2,
              _sol([
                _step(
                  "\$R_c = 2\\sqrt{L/C} = 2\\sqrt{1/(4 \\times 10^{-6})} = 2 \\times 500 = 1000\\,\\Omega = 1\\,\\text{k}\\Omega\$.",
                ),
                _step(
                  "Pour \$R < 1\\,\\text{k}\\Omega\$ : oscillations amorties. Pour \$R > 1\\,\\text{k}\\Omega\$ : retour exponentiel sans oscillation.",
                  tipFr:
                      "\$R_c\$ est la résistance critique. **Au seuil**, le système revient à l'équilibre le plus rapidement possible — utilisé en suspension automobile (amortisseurs réglés au critique).",
                ),
              ], finalAnswerFr: r"$R_c = 1$ kΩ"),
            ),
          ],
        ),
        _ex(
          4,
          'Décrément logarithmique',
          5,
          "En régime pseudo-périodique faiblement amorti, l'amplitude décroît selon \$A(t) = A_0 e^{-t/\\tau_a}\$ avec \$\\tau_a = 2L/R\$.",
          [
            _q(
              1,
              "Si l'amplitude passe de 5 V à 1 V en 4 pseudo-périodes, calculer \$\\tau_a\$ (avec \$T \\approx T_0 \\approx 12{,}57\\,\\text{ms}\$).",
              3,
              _sol([
                _step(
                  "Durée totale : \$\\Delta t = 4 T \\approx 4 \\times 12{,}57 = 50{,}28\\,\\text{ms}\$.",
                ),
                _step(
                  "Rapport : \$A_1/A_0 = e^{-\\Delta t/\\tau_a} = 1/5 \\iff \\tau_a = \\Delta t / \\ln 5 = 0{,}05028/1{,}609 \\approx 31{,}2\\,\\text{ms}\$.",
                ),
              ], finalAnswerFr: r"$\tau_a \approx 31{,}2$ ms"),
            ),
            _q(
              2,
              "En déduire la résistance \$R\$ correspondante.",
              1,
              _sol([
                _step(
                  "\$\\tau_a = 2L/R \\iff R = 2L/\\tau_a = 2/0{,}0312 \\approx 64\\,\\Omega\$.",
                ),
                _step(
                  "\$R \\ll R_c = 1\\,\\text{k}\\Omega\$, cohérent avec un amortissement faible (oscillations bien visibles avant disparition).",
                ),
              ], finalAnswerFr: r"$R \approx 64$ Ω"),
            ),
            _q(
              3,
              "Décrément logarithmique \$\\delta = T/\\tau_a\$ et nombre d'oscillations significatives.",
              1,
              _sol([
                _step(
                  "\$\\delta = T/\\tau_a \\approx 12{,}57/31{,}2 \\approx 0{,}403\$. Quantifie la dissipation par cycle.",
                ),
                _step(
                  "Nombre d'oscillations 'visibles' (\$A > A_0/e^3 \\approx 5\\%\$ initial) : \$3\\tau_a/T \\approx 3 \\times 31{,}2/12{,}57 \\approx 7\\,\\text{oscillations}\$ avant amortissement complet.",
                  tipFr:
                      "Décrément logarithmique : utilisé en mesure de viscosité (oscillation amortie d'un pendule torsionel), caractérisation de matériaux.",
                ),
              ], finalAnswerFr: r"$\delta \approx 0{,}40$, ~7 oscillations"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperMechanicalWaves() => _paper(
      titleFr: 'Épreuve type — Ondes mécaniques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Onde mécanique = propagation d'une perturbation dans un milieu, sans transport de matière. Célérité \$v\$, longueur d'onde \$\\lambda = v T = v/f\$. Transversale vs longitudinale.",
      exercices: [
        _ex(
          1,
          'Vocabulaire et relations fondamentales',
          5,
          "Une onde se propage le long d'une corde tendue avec célérité \$v = 30\\,\\text{m/s}\$, fréquence \$f = 60\\,\\text{Hz}\$.",
          [
            _q(
              1,
              "Calculer la période \$T\$ et la longueur d'onde \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "**Période** : \$T = 1/f = 1/60 \\approx 16{,}7\\,\\text{ms}\$.",
                ),
                _step(
                  "**Longueur d'onde** : \$\\lambda = v T = v/f = 30/60 = 0{,}5\\,\\text{m}\$.",
                ),
              ], finalAnswerFr: r"$T \approx 16{,}7$ ms, $\lambda = 0{,}5$ m"),
            ),
            _q(
              2,
              "Que représente \$\\lambda\$ géométriquement sur la corde ?",
              1,
              _sol([
                _step(
                  "Distance entre **deux maxima consécutifs** (ou deux points dans le même état de vibration) à un instant donné, soit \$\\lambda = 0{,}5\\,\\text{m}\$.",
                ),
              ]),
            ),
            _q(
              3,
              "Si on double la fréquence (\$v\$ inchangée), comment varie \$\\lambda\$ ?",
              2,
              _sol([
                _step(
                  "\$\\lambda = v/f\$ → si \$f\$ est doublée, \$\\lambda\$ est **divisée par 2** : \$\\lambda' = 0{,}25\\,\\text{m}\$.",
                ),
                _step(
                  "Relation fondamentale : \$\\lambda \\propto 1/f\$ à célérité constante. Vraie pour toute onde dans un milieu donné.",
                  tipFr:
                      "La célérité dépend du milieu (tension de la corde, densité). La fréquence est imposée par la source. \$\\lambda\$ s'ajuste pour satisfaire \$\\lambda = v/f\$.",
                ),
              ], finalAnswerFr: r"$\lambda$ divisée par 2"),
            ),
          ],
        ),
        _ex(
          2,
          'Types d\'ondes',
          5,
          "Comparer ondes transversales et longitudinales.",
          [
            _q(
              1,
              "Le son est-il transversal ou longitudinal ? Justifier.",
              2,
              _sol([
                _step(
                  "**Longitudinal** : dans l'air, les molécules oscillent **parallèlement à la direction de propagation**, créant des compressions/raréfactions.",
                ),
                _step(
                  "**Contre-exemple** : une corde vibre **transversalement** — chaque point se déplace perpendiculairement à la corde.",
                ),
              ], finalAnswerFr: r"Longitudinale"),
            ),
            _q(
              2,
              "Le son se propage-t-il dans le vide ?",
              1,
              _sol([
                _step(
                  "**Non** — les ondes mécaniques nécessitent un milieu matériel. Sans matière à comprimer, pas de propagation.",
                ),
                _step(
                  "Contraste : la **lumière** (onde électromagnétique) se propage dans le vide → on voit le soleil sans entendre les explosions solaires.",
                ),
              ]),
            ),
            _q(
              3,
              "Célérité du son dans différents milieux.",
              2,
              _sol([
                _step(
                  "Air (20°C) : \$v \\approx 340\\,\\text{m/s}\$. Eau : \$v \\approx 1500\\,\\text{m/s}\$. Acier : \$v \\approx 5000\\,\\text{m/s}\$.",
                ),
                _step(
                  "**Règle** : célérité ↑ avec rigidité du milieu. Solide > liquide > gaz. \$v_\\text{son} \\propto \\sqrt{K/\\rho}\$ (\$K\$ = module de compression, \$\\rho\$ = densité).",
                  tipFr:
                      "Application : les baleines communiquent à grande distance dans l'eau grâce à la célérité élevée (1500 m/s contre 340 dans l'air).",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Retard et déphasage',
          5,
          "Une source S émet une onde de fréquence \$f = 200\\,\\text{Hz}\$ dans l'air (célérité 340 m/s). Un récepteur M est à distance \$d = 5{,}1\\,\\text{m}\$.",
          [
            _q(
              1,
              "Retard \$\\tau\$ entre S et M.",
              1,
              _sol([
                _step(
                  "\$\\tau = d/v = 5{,}1/340 = 0{,}015\\,\\text{s} = 15\\,\\text{ms}\$.",
                ),
              ], finalAnswerFr: r"$\tau = 15$ ms"),
            ),
            _q(
              2,
              "Déphasage \$\\Delta\\varphi\$ entre S et M en radians, modulo \$2\\pi\$.",
              3,
              _sol([
                _step(
                  "\$\\Delta\\varphi = 2\\pi f \\tau = 2\\pi \\times 200 \\times 0{,}015 = 6\\pi\\,\\text{rad}\$.",
                ),
                _step(
                  "Modulo \$2\\pi\$ : \$6\\pi = 3 \\times 2\\pi \\equiv 0\$. Les deux points sont **en phase**.",
                ),
                _step(
                  "**Vérification** : \$\\lambda = v/f = 340/200 = 1{,}7\\,\\text{m}\$. \$d/\\lambda = 5{,}1/1{,}7 = 3\$ (entier) → en phase ✓.",
                  tipFr:
                      "**Critère synthétique** : en phase si \$d\$ est un multiple entier de \$\\lambda\$, en opposition de phase si multiple impair de \$\\lambda/2\$.",
                ),
              ], finalAnswerFr: r"En phase ($\Delta\varphi \equiv 0$)"),
            ),
          ],
        ),
        _ex(
          4,
          'Onde stationnaire sur corde fixée',
          5,
          "Une corde de longueur \$L = 1\\,\\text{m}\$ est fixée à ses deux extrémités. On l'excite dans son mode fondamental.",
          [
            _q(
              1,
              "Longueur d'onde du mode fondamental.",
              2,
              _sol([
                _step(
                  "Mode fondamental = un seul ventre au milieu, nœuds aux extrémités fixes.",
                ),
                _step(
                  "Donc \$L = \\lambda/2 \\iff \\lambda = 2 L = 2\\,\\text{m}\$.",
                ),
              ], finalAnswerFr: r"$\lambda_1 = 2$ m"),
            ),
            _q(
              2,
              "Si \$f_1 = 220\\,\\text{Hz}\$, célérité sur la corde ?",
              1,
              _sol([
                _step(
                  "\$v = \\lambda_1 f_1 = 2 \\times 220 = 440\\,\\text{m/s}\$.",
                ),
              ], finalAnswerFr: r"$v = 440$ m/s"),
            ),
            _q(
              3,
              "Fréquence et longueur d'onde du 3ème harmonique (\$f_3 = 3 f_1\$).",
              2,
              _sol([
                _step(
                  "\$f_3 = 3 \\times 220 = 660\\,\\text{Hz}\$. \$\\lambda_3 = v/f_3 = 440/660 = 2/3\\,\\text{m}\$.",
                ),
                _step(
                  "Géométriquement : 3 ventres sur la corde, \$L = 3 \\lambda_3 / 2\$ ✓.",
                  tipFr:
                      "Sur une corde fixée aux 2 bouts : \$f_n = n \\cdot f_1\$ (harmoniques entiers). Cette série produit la sonorité 'musicale' des instruments à cordes.",
                ),
              ], finalAnswerFr: r"$f_3 = 660$ Hz, $\lambda_3 = 2/3$ m"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDiffractionInterference() => _paper(
      titleFr: 'Épreuve type — Diffraction et interférences',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Diffraction par une fente : \$\\theta \\approx \\lambda/a\$. Interférences de Young (deux fentes) : interfrange \$i = \\lambda D/a\$. Conditions : ondes cohérentes, monochromatiques.",
      exercices: [
        _ex(
          1,
          'Diffraction par une fente',
          5,
          "Un laser de longueur d'onde \$\\lambda = 632\\,\\text{nm}\$ (rouge) traverse une fente de largeur \$a = 0{,}1\\,\\text{mm}\$. L'écran est à \$D = 2\\,\\text{m}\$.",
          [
            _q(
              1,
              "Calculer l'angle \$\\theta\$ du 1er minimum de diffraction.",
              2,
              _sol([
                _step(
                  "**Formule** : 1er minimum à \$\\sin\\theta = \\lambda/a\$ (pour petits angles : \$\\theta \\approx \\lambda/a\$ en rad).",
                ),
                _step(
                  "\$\\theta \\approx 6{,}32 \\times 10^{-7} / 10^{-4} = 6{,}32 \\times 10^{-3}\\,\\text{rad} \\approx 0{,}36°\$.",
                ),
              ], finalAnswerFr: r"$\theta \approx 6{,}32 \times 10^{-3}$ rad"),
            ),
            _q(
              2,
              "Demi-largeur \$\\ell\$ et largeur totale \$L\$ de la tache centrale sur l'écran.",
              2,
              _sol([
                _step(
                  "\$\\ell = D \\tan\\theta \\approx D \\theta = 2 \\times 6{,}32 \\times 10^{-3} \\approx 1{,}26 \\times 10^{-2}\\,\\text{m} = 12{,}6\\,\\text{mm}\$.",
                ),
                _step(
                  "Largeur totale : \$L = 2\\ell \\approx 25\\,\\text{mm} = 2{,}5\\,\\text{cm}\$. Bien plus large que la fente initiale (0,1 mm) !",
                ),
              ], finalAnswerFr: r"$L \approx 2{,}5$ cm"),
            ),
            _q(
              3,
              "Si on réduit la fente à \$a' = 0{,}05\\,\\text{mm}\$, comment varie la tache ?",
              1,
              _sol([
                _step(
                  "\$\\theta \\propto 1/a\$. Donc \$\\theta\$ double, et la tache double aussi : \$L' = 5\\,\\text{cm}\$.",
                ),
                _step(
                  "**Contre-intuitif** : plus la fente est étroite, plus la tache diffractée est large. Au contraire du sens commun.",
                  tipFr:
                      "Conséquence pratique : pour obtenir une image nette (objectif microscope, photographie), il faut une **grande** ouverture, pas une petite — sinon la diffraction limite la résolution.",
                ),
              ], finalAnswerFr: r"$L'$ double"),
            ),
          ],
        ),
        _ex(
          2,
          'Interférences à deux ondes (Young)',
          5,
          "Deux fentes de Young espacées de \$a = 0{,}2\\,\\text{mm}\$, écran à \$D = 1{,}5\\,\\text{m}\$, laser à \$\\lambda = 500\\,\\text{nm}\$ (vert).",
          [
            _q(
              1,
              "Calculer l'interfrange \$i\$.",
              2,
              _sol([
                _step(
                  "**Formule** : \$i = \\lambda D / a\$ (distance entre deux franges brillantes consécutives).",
                ),
                _step(
                  "\$i = 5 \\times 10^{-7} \\times 1{,}5 / (2 \\times 10^{-4}) = 3{,}75 \\times 10^{-3}\\,\\text{m} = 3{,}75\\,\\text{mm}\$.",
                ),
              ], finalAnswerFr: r"$i = 3{,}75$ mm"),
            ),
            _q(
              2,
              "Position de la 5ème frange brillante (par rapport à la frange centrale).",
              1,
              _sol([
                _step(
                  "Frange brillante d'ordre \$k\$ : \$x_k = k \\cdot i\$. Pour \$k = 5\$ : \$x_5 = 5 \\times 3{,}75 = 18{,}75\\,\\text{mm}\$.",
                ),
              ], finalAnswerFr: r"$x_5 = 18{,}75$ mm"),
            ),
            _q(
              3,
              "On change le laser pour du rouge (\$\\lambda' = 700\\,\\text{nm}\$). Comment varie \$i\$ ?",
              2,
              _sol([
                _step(
                  "\$i \\propto \\lambda\$. Nouvel interfrange : \$i' = 3{,}75 \\times 700/500 = 5{,}25\\,\\text{mm}\$.",
                ),
                _step(
                  "**Conséquence pour lumière blanche** : chaque couleur produit ses propres franges, donc l'écran présente un spectre coloré (sauf à l'ordre 0 où toutes coïncident — frange blanche centrale).",
                  tipFr:
                      "L'analyse spectroscopique exploite cette propriété : interférences sélectives → mesure précise de \$\\lambda\$ et donc identification de l'élément chimique émetteur.",
                ),
              ], finalAnswerFr: r"$i' = 5{,}25$ mm"),
            ),
          ],
        ),
        _ex(
          3,
          'Conditions d\'interférence',
          5,
          "Discuter les conditions pour observer des interférences nettes.",
          [
            _q(
              1,
              "Pourquoi utilise-t-on un **laser** plutôt qu'une ampoule classique ?",
              3,
              _sol([
                _step(
                  "**Cohérence temporelle** : un laser émet une lumière (quasi-)monochromatique — une seule longueur d'onde bien définie. Une ampoule émet un spectre large.",
                ),
                _step(
                  "**Cohérence spatiale** : les rayons d'un laser sont quasi-parallèles, depuis la même source ponctuelle. Une ampoule émet dans toutes les directions, depuis un filament étendu.",
                ),
                _step(
                  "**Conséquence** : avec une ampoule, les déphasages varient aléatoirement → les franges s'effacent. Avec un laser, les franges sont stables.",
                  tipFr:
                      "Avant l'invention du laser (1960), on utilisait des sources spectralement filtrées (lampe sodium + fente fine) pour obtenir une cohérence suffisante.",
                ),
              ]),
            ),
            _q(
              2,
              "Si on bouche une fente de Young, que voit-on sur l'écran ?",
              2,
              _sol([
                _step(
                  "Plus d'interférences (une seule source) — on observe la **figure de diffraction** d'une seule fente : tache centrale large + taches latérales décroissantes.",
                ),
                _step(
                  "Les franges fines disparaissent. Démonstration que les interférences viennent bien de **deux** sources qui se superposent.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Mesure d\'une longueur d\'onde',
          5,
          "On observe les interférences de Young avec \$a = 0{,}3\\,\\text{mm}\$ et \$D = 2\\,\\text{m}\$. La distance entre la 1ère et la 10ème frange brillante (situées du même côté) est mesurée à \$L = 36\\,\\text{mm}\$.",
          [
            _q(
              1,
              "Déduire l'interfrange.",
              2,
              _sol([
                _step(
                  "Entre la 1ère et la 10ème frange : il y a **9 interfranges**. \$L = 9 i \\iff i = 36/9 = 4\\,\\text{mm}\$.",
                  mistakeFr:
                      "Erreur classique : compter 10 intervalles au lieu de 9. Entre la frange n°1 et la frange n°10, il y a 10 - 1 = 9 intervalles.",
                ),
              ], finalAnswerFr: r"$i = 4$ mm"),
            ),
            _q(
              2,
              "En déduire la longueur d'onde du laser.",
              3,
              _sol([
                _step(
                  "\$i = \\lambda D / a \\iff \\lambda = a i / D\$.",
                ),
                _step(
                  "\$\\lambda = (3 \\times 10^{-4}) \\times (4 \\times 10^{-3}) / 2 = 6 \\times 10^{-7}\\,\\text{m} = 600\\,\\text{nm}\$.",
                ),
                _step(
                  "Domaine du visible (380-780 nm), couleur **orange-jaune** (proche du sodium 589 nm).",
                  tipFr:
                      "Méthode classique de spectroscopie : interféromètre + mesure d'interfrange → \$\\lambda\$. Précision en \$\\mu\\text{m}\$ atteignable avec optique fine.",
                ),
              ], finalAnswerFr: r"$\lambda = 600$ nm (orange)"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperAmModulation() => _paper(
      titleFr: 'Épreuve type — Modulation d\'amplitude (AM)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Modulation AM : signal modulé \$u(t) = [A + s(t)] \\cos(2\\pi f_p t)\$ avec porteuse \$f_p\$ et signal informatif \$s(t)\$. Taux de modulation \$m = S_\\text{max}/A\$. Démodulation par détection d'enveloppe (diode + RC).",
      exercices: [
        _ex(
          1,
          'Principe de la modulation',
          5,
          "Une porteuse sinusoïdale \$u_p(t) = A \\cos(2\\pi f_p t)\$ avec \$A = 5\\,\\text{V}\$ et \$f_p = 100\\,\\text{kHz}\$. Signal informatif \$s(t) = S_0 \\cos(2\\pi f_s t)\$ avec \$S_0 = 2\\,\\text{V}\$ et \$f_s = 1\\,\\text{kHz}\$.",
          [
            _q(
              1,
              "Donner l'expression du signal modulé en amplitude \$u(t) = [A + s(t)] \\cos(2\\pi f_p t)\$.",
              2,
              _sol([
                _step(
                  "\$u(t) = [5 + 2\\cos(2\\pi \\cdot 1000\\,t)] \\cos(2\\pi \\cdot 10^5\\,t)\$, en volts.",
                ),
                _step(
                  "L'amplitude de la porteuse \$\\cos(2\\pi f_p t)\$ varie au rythme du signal \$s(t)\$. L'enveloppe du signal modulé est \$A + s(t)\$.",
                ),
              ], finalAnswerFr: r"$u(t) = [5 + 2\cos(2\pi \cdot 10^3 t)] \cos(2\pi \cdot 10^5 t)$"),
            ),
            _q(
              2,
              "Calculer le taux de modulation \$m = S_0/A\$.",
              1,
              _sol([
                _step(
                  "\$m = 2/5 = 0{,}4 = 40\\%\$.",
                ),
              ], finalAnswerFr: r"$m = 0{,}4$"),
            ),
            _q(
              3,
              "Condition de bonne modulation et conséquence si \$m > 1\$.",
              2,
              _sol([
                _step(
                  "**Condition** : \$m < 1\$ (soit \$S_0 < A\$). L'enveloppe \$A + s(t)\$ reste positive → l'information est récupérable.",
                ),
                _step(
                  "Si \$m > 1\$ : surmodulation. L'enveloppe devient négative par moments → la diode du démodulateur ne suit plus → **distorsion** du signal récupéré.",
                  tipFr:
                      "En radio AM commerciale, \$m \\approx 0{,}3-0{,}5\$ typiquement pour garantir une bonne qualité audio.",
                ),
              ], finalAnswerFr: r"$m < 1$ requis"),
            ),
          ],
        ),
        _ex(
          2,
          'Spectre du signal modulé',
          5,
          "Le signal modulé \$u(t) = [A + S_0\\cos(2\\pi f_s t)]\\cos(2\\pi f_p t)\$ peut être développé.",
          [
            _q(
              1,
              "Développer \$u(t)\$ en somme de cosinus de fréquences pures.",
              3,
              _sol([
                _step(
                  "\$u(t) = A\\cos(2\\pi f_p t) + S_0\\cos(2\\pi f_s t)\\cos(2\\pi f_p t)\$.",
                ),
                _step(
                  "Identité : \$\\cos a \\cos b = \\frac{1}{2}[\\cos(a - b) + \\cos(a + b)]\$.",
                ),
                _step(
                  "Donc \$u(t) = A\\cos(2\\pi f_p t) + \\dfrac{S_0}{2}\\cos[2\\pi(f_p - f_s) t] + \\dfrac{S_0}{2}\\cos[2\\pi(f_p + f_s) t]\$.",
                ),
              ], finalAnswerFr: r"3 raies : $f_p$, $f_p \pm f_s$"),
            ),
            _q(
              2,
              "Identifier les fréquences présentes pour \$f_p = 100\\,\\text{kHz}\$, \$f_s = 1\\,\\text{kHz}\$.",
              1,
              _sol([
                _step(
                  "Trois raies spectrales : **99 kHz**, **100 kHz**, **101 kHz**.",
                ),
                _step(
                  "**Largeur de bande** : 2 kHz (de 99 à 101). Le signal AM occupe 2 fois la bande passante de \$s(t)\$.",
                ),
              ], finalAnswerFr: r"99, 100, 101 kHz"),
            ),
            _q(
              3,
              "Pourquoi cette propriété est-elle importante pour la radio ?",
              1,
              _sol([
                _step(
                  "Les stations radio occupent chacune une bande étroite (~10 kHz pour la voix). On peut les **espacer** sur le spectre sans qu'elles se chevauchent : France Info à 105,5 MHz, Europe 1 à 106,2 MHz, etc.",
                ),
                _step(
                  "Un récepteur sélectionne **une seule** station par un filtre accordé à sa fréquence \$f_p\$, puis démodule.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Démodulation par détection d\'enveloppe',
          5,
          "Le démodulateur AM le plus simple : une **diode** (redresse) + un **filtre RC passe-bas** (lisse).",
          [
            _q(
              1,
              "Rôle de chaque composant.",
              3,
              _sol([
                _step(
                  "**Diode** : passante uniquement aux alternances positives → ne laisse passer que les pics positifs du signal modulé. Élimine les oscillations négatives.",
                ),
                _step(
                  "**Condensateur C** : se charge sur chaque pic positif (à travers la diode passante) et se décharge lentement pendant l'alternance négative (diode bloquée, décharge via R).",
                ),
                _step(
                  "**Résistance R** : règle la constante de temps de décharge \$\\tau = RC\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Condition sur \$\\tau = RC\$.",
              2,
              _sol([
                _step(
                  "On veut suivre l'enveloppe (qui oscille à \$f_s\$) mais filtrer les oscillations rapides (à \$f_p\$).",
                ),
                _step(
                  "**Critère** : \$T_p \\ll \\tau \\ll T_s\$, soit \$\\dfrac{1}{f_p} \\ll RC \\ll \\dfrac{1}{f_s}\$.",
                ),
                _step(
                  "Avec \$f_p = 100\\,\\text{kHz}\$ (\$T_p = 10\\,\\mu\\text{s}\$) et \$f_s = 1\\,\\text{kHz}\$ (\$T_s = 1\\,\\text{ms}\$) : \$10\\,\\mu\\text{s} \\ll RC \\ll 1\\,\\text{ms}\$. Par exemple \$RC = 100\\,\\mu\\text{s}\$ convient.",
                  tipFr:
                      "Si \$\\tau\$ trop petit : ondulation HF résiduelle. Si \$\\tau\$ trop grand : l'enveloppe BF est lissée et perdue.",
                ),
              ], finalAnswerFr: r"$T_p \ll RC \ll T_s$"),
            ),
          ],
        ),
        _ex(
          4,
          'Choix des composants',
          5,
          "On dispose de \$f_p = 540\\,\\text{kHz}\$ (porteuse GO de Radio Bleue), signal vocal jusqu'à \$f_s^\\text{max} = 5\\,\\text{kHz}\$. Choisir \$C\$ si \$R = 10\\,\\text{k}\\Omega\$.",
          [
            _q(
              1,
              "Calculer les périodes \$T_p\$ et \$T_s^\\text{min}\$.",
              1,
              _sol([
                _step(
                  "\$T_p = 1/540\\,000 \\approx 1{,}85\\,\\mu\\text{s}\$. \$T_s^\\text{min} = 1/5000 = 200\\,\\mu\\text{s}\$.",
                ),
              ], finalAnswerFr: r"$T_p \approx 1{,}85$ μs, $T_s \approx 200$ μs"),
            ),
            _q(
              2,
              "Choisir \$\\tau = RC\$ dans la fenêtre admissible et en déduire \$C\$.",
              3,
              _sol([
                _step(
                  "Fenêtre : \$1{,}85\\,\\mu\\text{s} \\ll \\tau \\ll 200\\,\\mu\\text{s}\$. Choix raisonnable : \$\\tau \\approx 20\\,\\mu\\text{s}\$ (un ordre de grandeur de chaque limite).",
                ),
                _step(
                  "\$C = \\tau/R = 20 \\times 10^{-6} / 10^4 = 2\\,\\text{nF}\$.",
                ),
                _step(
                  "Vérifications : \$1{,}85\\,\\mu\\text{s} \\ll 20\\,\\mu\\text{s}\$ (rapport ~10) ✓ ; \$20\\,\\mu\\text{s} \\ll 200\\,\\mu\\text{s}\$ (rapport 10) ✓. La voix sera bien démodulée sans résidu HF ni perte de fréquence audio.",
                ),
              ], finalAnswerFr: r"$C = 2$ nF"),
            ),
            _q(
              3,
              "Conséquence d'un \$C\$ 100 fois trop grand (\$C = 200\\,\\text{nF}\$).",
              1,
              _sol([
                _step(
                  "\$\\tau = 2\\,\\text{ms} = 10 \\times T_s^\\text{min}\$ — bien trop grand. Le condensateur ne se décharge plus assez vite pour suivre l'enveloppe BF.",
                ),
                _step(
                  "**Conséquence** : les variations rapides du signal audio (consonnes, attaque des mots) sont aplaties → son grave et bouché. Distorsion clairement audible.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRadioactivity() => _paper(
      titleFr: 'Épreuve type — Radioactivité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Désintégrations \$\\alpha\$, \$\\beta^-\$, \$\\beta^+\$. Loi de décroissance \$N(t) = N_0 e^{-\\lambda t}\$. Activité \$A = \\lambda N\$. Demi-vie \$t_{1/2} = \\ln 2/\\lambda\$.",
      exercices: [
        _ex(
          1,
          'Types de désintégrations',
          5,
          "On note un noyau \$\\,^A_Z X\$ avec \$A\$ = nombre de masse, \$Z\$ = numéro atomique.",
          [
            _q(
              1,
              "Donner l'équation de la désintégration \$\\alpha\$ du polonium 210 (\$^{210}_{84}\\text{Po}\$). Lois de conservation utilisées ?",
              3,
              _sol([
                _step(
                  "**Désintégration \$\\alpha\$** : émission d'un noyau d'hélium \$^4_2\\text{He}\$.",
                ),
                _step(
                  "Conservation : \$A_X = A_Y + 4\$ (masse) et \$Z_X = Z_Y + 2\$ (charge).",
                ),
                _step(
                  "Équation : \$^{210}_{84}\\text{Po} \\to ^{206}_{82}\\text{Pb} + ^4_2\\text{He}\$ (production de plomb 206).",
                  tipFr:
                      "Lois de Soddy : conservation simultanée du nombre de masse \$A\$ et de la charge électrique \$Z\$. À appliquer systématiquement.",
                ),
              ], finalAnswerFr: r"$^{210}_{84}\text{Po} \to ^{206}_{82}\text{Pb} + ^4_2\text{He}$"),
            ),
            _q(
              2,
              "Désintégration \$\\beta^-\$ du carbone 14 (\$^{14}_6\\text{C}\$).",
              2,
              _sol([
                _step(
                  "**\$\\beta^-\$** : émission d'un électron \$^0_{-1}\\text{e}\$ ; un neutron se transforme en proton. \$A\$ inchangé, \$Z\$ augmente de 1.",
                ),
                _step(
                  "\$^{14}_6\\text{C} \\to ^{14}_7\\text{N} + ^0_{-1}\\text{e} + \\bar\\nu_e\$ (avec antineutrino, souvent omis au Bac).",
                ),
              ], finalAnswerFr: r"$^{14}_6\text{C} \to ^{14}_7\text{N} + ^0_{-1}\text{e}$"),
            ),
            _q(
              3,
              "Désintégration \$\\beta^+\$ du fluor 18 (\$^{18}_9\\text{F}\$).",
              0,
              _sol([
                _step(
                  "**\$\\beta^+\$** : émission d'un positron \$^0_{+1}\\text{e}\$ ; un proton se transforme en neutron. \$A\$ inchangé, \$Z\$ diminue de 1.",
                ),
                _step(
                  "\$^{18}_9\\text{F} \\to ^{18}_8\\text{O} + ^0_{+1}\\text{e}\$. Le fluor 18 est utilisé en imagerie médicale (TEP — tomographie par émission de positrons).",
                ),
              ], finalAnswerFr: r"$^{18}_9\text{F} \to ^{18}_8\text{O} + ^0_{+1}\text{e}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Loi de décroissance',
          5,
          "Un échantillon contient \$N_0 = 10^{12}\$ noyaux radioactifs à \$t = 0\$. La demi-vie est \$t_{1/2} = 8\\,\\text{jours}\$.",
          [
            _q(
              1,
              "Calculer la constante de désintégration \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "**Relation fondamentale** : \$t_{1/2} = \\ln 2 / \\lambda \\iff \\lambda = \\ln 2 / t_{1/2}\$.",
                ),
                _step(
                  "\$\\lambda = 0{,}693/8 \\approx 0{,}0866\\,\\text{jour}^{-1}\$.",
                ),
                _step(
                  "En SI : \$\\lambda \\approx 0{,}0866/(86400) \\approx 1{,}00 \\times 10^{-6}\\,\\text{s}^{-1}\$.",
                ),
              ], finalAnswerFr: r"$\lambda \approx 0{,}087$ /jour"),
            ),
            _q(
              2,
              "Donner \$N(t)\$ et calculer \$N(24\\,\\text{jours})\$.",
              2,
              _sol([
                _step(
                  "\$N(t) = N_0 e^{-\\lambda t}\$. À \$t = 24\\,\\text{jours} = 3 \\times t_{1/2}\$ : \$N = N_0/2^3 = N_0/8 = 1{,}25 \\times 10^{11}\$.",
                ),
                _step(
                  "Vérification : \$N(24) = 10^{12} \\times e^{-0{,}0866 \\times 24} = 10^{12} \\times e^{-2{,}08} \\approx 10^{12} \\times 0{,}125 = 1{,}25 \\times 10^{11}\$ ✓.",
                  tipFr:
                      "Méthode rapide : si \$t = n \\cdot t_{1/2}\$, alors \$N = N_0/2^n\$. Évite le calcul avec exponentielles.",
                ),
              ], finalAnswerFr: r"$N(24) = 1{,}25 \times 10^{11}$"),
            ),
            _q(
              3,
              "Combien de temps pour qu'il reste 1% des noyaux initiaux ?",
              1,
              _sol([
                _step(
                  "\$N/N_0 = 0{,}01 \\iff e^{-\\lambda t} = 0{,}01 \\iff t = \\ln 100/\\lambda = 4{,}605/0{,}0866 \\approx 53\\,\\text{jours}\$.",
                ),
                _step(
                  "**Règle pratique** : il reste 1% après ~7 demi-vies (\$1/2^7 \\approx 0{,}008\$). Ici 53/8 ≈ 6,6 demi-vies. Cohérent.",
                ),
              ], finalAnswerFr: r"$t \approx 53$ jours"),
            ),
          ],
        ),
        _ex(
          3,
          'Activité radioactive',
          5,
          "L'activité \$A\$ est le nombre de désintégrations par seconde. Unité : becquerel (1 Bq = 1 désint./s). \$A(t) = \\lambda N(t) = A_0 e^{-\\lambda t}\$.",
          [
            _q(
              1,
              "Calculer l'activité initiale \$A_0\$ de l'échantillon de l'exercice 2.",
              2,
              _sol([
                _step(
                  "\$A_0 = \\lambda N_0 = 1{,}00 \\times 10^{-6} \\times 10^{12} = 10^6\\,\\text{Bq} = 1\\,\\text{MBq}\$.",
                  tipFr:
                      "Toujours utiliser \$\\lambda\$ en s⁻¹ pour obtenir l'activité en Bq (désint./s). Ne pas mélanger jours et secondes !",
                ),
              ], finalAnswerFr: r"$A_0 = 10^6$ Bq = 1 MBq"),
            ),
            _q(
              2,
              "Activité après 24 jours.",
              1,
              _sol([
                _step(
                  "Même décroissance que \$N\$ : \$A(24) = A_0/2^3 = 125\\,\\text{kBq}\$.",
                ),
              ], finalAnswerFr: r"$A = 125$ kBq"),
            ),
            _q(
              3,
              "Pourquoi un radio-isotope à courte demi-vie est-il plus 'actif' à masse égale ?",
              2,
              _sol([
                _step(
                  "À masse égale (nombre de noyaux égal \$N\$), \$A = \\lambda N\$. \$\\lambda = \\ln 2/t_{1/2}\$ → \$A \\propto 1/t_{1/2}\$.",
                ),
                _step(
                  "**Conséquence** : 1 mg de radium 226 (\$t_{1/2} \\approx 1600\\,\\text{ans}\$) est ~50 fois moins actif que 1 mg de cobalt 60 (\$t_{1/2} \\approx 5{,}3\\,\\text{ans}\$).",
                  tipFr:
                      "C'est pourquoi le tritium ou le radon (vies brèves) sont dangereux malgré leurs faibles quantités — leur activité spécifique est énorme.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Application — datation au carbone 14',
          5,
          "Le \$^{14}\\text{C}\$ est produit dans l'atmosphère par les rayons cosmiques. Sa concentration dans les organismes vivants est constante. À la mort, plus d'assimilation : \$N\$ décroît. \$t_{1/2} = 5730\\,\\text{ans}\$.",
          [
            _q(
              1,
              "On retrouve un os ancien dont l'activité spécifique en \$^{14}\\text{C}\$ est 25% de celle d'un os actuel. Âge ?",
              4,
              _sol([
                _step(
                  "\$A/A_0 = 0{,}25 = 1/4 = 1/2^2\$ → l'échantillon a vécu **2 demi-vies** après la mort.",
                ),
                _step(
                  "Âge : \$t = 2 \\times t_{1/2} = 2 \\times 5730 = 11\\,460\\,\\text{ans}\$.",
                ),
                _step(
                  "**Vérification par log** : \$t = -\\ln(0{,}25)/\\lambda = \\ln 4/\\lambda = 1{,}386 \\times 5730/0{,}693 \\approx 11\\,460\\,\\text{ans}\$ ✓.",
                  tipFr:
                      "Datation \$^{14}\\text{C}\$ : utilisable jusqu'à ~50 000 ans (8-9 demi-vies). Au-delà, l'activité résiduelle est trop faible pour mesurer.",
                ),
              ], finalAnswerFr: r"$t \approx 11\,460$ ans"),
            ),
            _q(
              2,
              "Limite supérieure de la méthode (en âge).",
              1,
              _sol([
                _step(
                  "Vers 10 demi-vies (~57 000 ans), \$A \\approx A_0/1024 < 0{,}1\\%\$ — sous le seuil de détection. Pratiquement : limite ~50 000 ans.",
                ),
                _step(
                  "Pour des roches plus anciennes (millions d'années), on utilise d'autres couples : potassium-argon (\$t_{1/2} = 1{,}25 \\times 10^9\\) ans), uranium-plomb.",
                ),
              ], finalAnswerFr: r"~50 000 ans"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperReactionSpeed() => _paper(
      titleFr: 'Épreuve type — Vitesse de réaction (cinétique chimique)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Vitesse volumique \$v = \\dfrac{1}{V} \\dfrac{d\\xi}{dt}\$ ou en fonction des concentrations. Facteurs cinétiques : température, concentration, catalyseur. Temps de demi-réaction \$t_{1/2}\$.",
      exercices: [
        _ex(
          1,
          'Définition et calcul',
          5,
          "On suit la réaction \$2 \\text{H}_2\\text{O}_2 \\to 2 \\text{H}_2\\text{O} + \\text{O}_2\$ (décomposition de l'eau oxygénée). À \$t = 0\$, \$[\\text{H}_2\\text{O}_2]_0 = 0{,}1\\,\\text{mol/L}\$.",
          [
            _q(
              1,
              "Définir la vitesse volumique \$v(t)\$ en fonction de \$[\\text{H}_2\\text{O}_2]\$.",
              2,
              _sol([
                _step(
                  "**Vitesse volumique** : \$v = \\dfrac{1}{V} \\dfrac{d\\xi}{dt}\$ avec \$\\xi\$ = avancement.",
                ),
                _step(
                  "Pour un réactif R avec coefficient stoechiométrique \$\\nu_R\$ : \$v = -\\dfrac{1}{\\nu_R} \\dfrac{d[R]}{dt}\$.",
                ),
                _step(
                  "Ici \$\\nu = 2\$ pour \$\\text{H}_2\\text{O}_2\$ : \$v = -\\dfrac{1}{2} \\dfrac{d[\\text{H}_2\\text{O}_2]}{dt}\$.",
                  mistakeFr:
                      "Ne pas oublier le signe **moins** pour un réactif (concentration qui décroît) et la division par le coefficient stoechiométrique.",
                ),
              ], finalAnswerFr: r"$v = -\dfrac{1}{2} \dfrac{d[H_2O_2]}{dt}$"),
            ),
            _q(
              2,
              "À \$t_1 = 30\\,\\text{s}\$, on mesure \$[\\text{H}_2\\text{O}_2] = 0{,}08\\,\\text{mol/L}\$ et la tangente locale a une pente de \$-1{,}2 \\times 10^{-3}\\,\\text{mol/(L·s)}\$. Calculer \$v(30\\,\\text{s})\$.",
              2,
              _sol([
                _step(
                  "\$v = -\\dfrac{1}{2} \\times (-1{,}2 \\times 10^{-3}) = 6 \\times 10^{-4}\\,\\text{mol/(L·s)}\$.",
                ),
                _step(
                  "**Unités** : la vitesse volumique s'exprime en mol·L⁻¹·s⁻¹ (ou mol·L⁻¹·min⁻¹ selon le contexte).",
                ),
              ], finalAnswerFr: r"$v = 6 \times 10^{-4}$ mol/(L·s)"),
            ),
            _q(
              3,
              "Comment varie \$v\$ au cours du temps ? Pourquoi ?",
              1,
              _sol([
                _step(
                  "\$v\$ **diminue** au cours du temps : la concentration de réactif diminue (consommation), les chocs efficaces diminuent. À \$t \\to \\infty\$, \$v \\to 0\$ (réaction terminée).",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Facteurs cinétiques',
          5,
          "Quatre facteurs principaux modifient la vitesse d'une réaction.",
          [
            _q(
              1,
              "Effet de la **température**.",
              2,
              _sol([
                _step(
                  "\$T \\nearrow\$ → \$v \\nearrow\$. Une augmentation de **10°C** double approximativement la vitesse (règle empirique de van't Hoff).",
                ),
                _step(
                  "**Explication moléculaire** : agitation thermique accrue → fraction plus élevée de chocs assez énergétiques pour franchir la barrière d'activation \$E_a\$ (loi d'Arrhenius : \$k \\propto e^{-E_a/RT}\$).",
                  tipFr:
                      "Applications : réfrigération (ralentit la dégradation des aliments), cuisson (accélère les réactions de Maillard, etc.).",
                ),
              ]),
            ),
            _q(
              2,
              "Effet de la **concentration** des réactifs.",
              1,
              _sol([
                _step(
                  "\$[R] \\nearrow\$ → \$v \\nearrow\$. Plus de molécules par unité de volume → plus de chocs par unité de temps. Pour une réaction d'ordre 1 : \$v = k[R]\$.",
                ),
              ]),
            ),
            _q(
              3,
              "Effet d'un **catalyseur**.",
              1,
              _sol([
                _step(
                  "Le catalyseur **diminue \$E_a\$** sans être consommé. \$v \\nearrow\$ sans changer l'équilibre thermodynamique (juste la cinétique).",
                ),
                _step(
                  "Exemples : MnO₂ pour décomposer H₂O₂, enzymes en biologie (vitesses multipliées par 10⁶ à 10¹²).",
                ),
              ]),
            ),
            _q(
              4,
              "Effet de la **surface de contact** (réactifs solides).",
              1,
              _sol([
                _step(
                  "Surface \$\\nearrow\$ → \$v \\nearrow\$. Pulvérisation, broyage augmentent la surface de contact réactif/milieu.",
                ),
                _step(
                  "Exemple spectaculaire : poudre de fer dans l'air = combustion explosive ; bloc de fer = oxydation très lente (rouille).",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Temps de demi-réaction',
          5,
          "Pour une réaction où un réactif est limitant : \$t_{1/2}\$ = durée pour atteindre \$[R] = [R]_0/2\$.",
          [
            _q(
              1,
              "Cas d'une réaction d'ordre 1 : \$v = k[R]\$. Déduire \$[R](t)\$ et \$t_{1/2}\$.",
              3,
              _sol([
                _step(
                  "Équation : \$d[R]/dt = -k[R]\$. Solution : \$[R](t) = [R]_0 e^{-k t}\$ (EDO du 1er ordre).",
                ),
                _step(
                  "Temps de demi-réaction : \$[R](t_{1/2}) = [R]_0/2 \\iff e^{-k t_{1/2}} = 1/2 \\iff t_{1/2} = \\ln 2/k\$.",
                ),
                _step(
                  "**Propriété remarquable** : \$t_{1/2}\$ est **indépendant** de \$[R]_0\$ pour une réaction d'ordre 1. Mêmes proportions, mêmes durées.",
                  tipFr:
                      "Analogie parfaite avec la radioactivité (qui est aussi une cinétique d'ordre 1) : même formule \$t_{1/2} = \\ln 2/\\lambda\$.",
                ),
              ], finalAnswerFr: r"$t_{1/2} = \ln 2/k$"),
            ),
            _q(
              2,
              "Si \$k = 0{,}01\\,\\text{s}^{-1}\$ pour une décomposition d'ordre 1, calculer \$t_{1/2}\$.",
              2,
              _sol([
                _step(
                  "\$t_{1/2} = \\ln 2/k = 0{,}693/0{,}01 \\approx 69{,}3\\,\\text{s}\$.",
                ),
                _step(
                  "Au bout de \$5 t_{1/2} \\approx 347\\,\\text{s} \\approx 6\\,\\text{min}\$, il reste \$1/2^5 \\approx 3\\%\$ du réactif initial → réaction quasi-terminée.",
                ),
              ], finalAnswerFr: r"$t_{1/2} \approx 69$ s"),
            ),
          ],
        ),
        _ex(
          4,
          'Méthodes de suivi',
          5,
          "Comment suit-on l'évolution d'une concentration en cours de réaction ?",
          [
            _q(
              1,
              "Méthode **spectrophotométrique** (UV-visible).",
              2,
              _sol([
                _step(
                  "**Principe** : on mesure l'absorbance \$A\$ à une longueur d'onde où **un seul** participant absorbe. Loi de Beer-Lambert : \$A = \\varepsilon \\ell C\$ (linéaire avec la concentration).",
                ),
                _step(
                  "**Applications** : suivi de réactions colorées (diiode, permanganate, complexes). Non-invasif (pas de prélèvement).",
                ),
              ]),
            ),
            _q(
              2,
              "Méthode **conductimétrique**.",
              2,
              _sol([
                _step(
                  "**Principe** : on mesure la conductance \$G\$ de la solution. Si la réaction produit ou consomme des ions, \$G\$ varie : \$G = \\sigma S/\\ell\$ avec \$\\sigma = \\sum \\lambda_i c_i\$ (conductivité = somme pondérée par mobilités ioniques).",
                ),
                _step(
                  "**Applications** : hydrolyses, dosages acide-base, précipitations.",
                ),
              ]),
            ),
            _q(
              3,
              "Méthode **par dégagement gazeux** (volumétrique).",
              1,
              _sol([
                _step(
                  "Mesurer le volume de gaz produit en fonction du temps (ex : décomposition H₂O₂ → O₂). PV = nRT donne la quantité de matière.",
                ),
                _step(
                  "Simple et peu coûteux, mais limité aux réactions à dégagement gazeux mesurable.",
                  tipFr:
                      "Critère de choix : adapter la méthode à la réaction. Coloré → spectro. Avec ions → conductimétrie. Gaz produit → volumétrie. pH variable → pHmétrie.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperPhCalculation() => _paper(
      titleFr: 'Épreuve type — pH et acides-bases',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "pH = -log[H₃O⁺]. À 25°C : \$K_e = [H_3O^+][OH^-] = 10^{-14}\$. Acide fort vs faible (\$K_a\$, pKa). Henderson-Hasselbalch : \$pH = pKa + \\log([A^-]/[HA])\$.",
      exercices: [
        _ex(
          1,
          'pH des solutions usuelles',
          5,
          "À 25°C, \$K_e = 10^{-14}\$.",
          [
            _q(
              1,
              "Solution d'acide chlorhydrique (acide fort) à \$C = 0{,}05\\,\\text{mol/L}\$. Calculer pH.",
              2,
              _sol([
                _step(
                  "**Acide fort** : dissociation totale. \$\\text{HCl} + \\text{H}_2\\text{O} \\to \\text{H}_3\\text{O}^+ + \\text{Cl}^-\$.",
                ),
                _step(
                  "\$[\\text{H}_3\\text{O}^+] = C = 0{,}05\\,\\text{mol/L}\$.",
                ),
                _step(
                  "\$pH = -\\log(0{,}05) = -\\log(5 \\times 10^{-2}) = 2 - \\log 5 \\approx 2 - 0{,}70 = 1{,}30\$.",
                ),
              ], finalAnswerFr: r"$pH \approx 1{,}3$"),
            ),
            _q(
              2,
              "Solution de soude (base forte) à \$C = 10^{-3}\\,\\text{mol/L}\$. Calculer pH.",
              2,
              _sol([
                _step(
                  "**Base forte** : \$\\text{NaOH} \\to \\text{Na}^+ + \\text{OH}^-\$, dissociation totale.",
                ),
                _step(
                  "\$[\\text{OH}^-] = C = 10^{-3}\\,\\text{mol/L}\$. \$[\\text{H}_3\\text{O}^+] = K_e/[\\text{OH}^-] = 10^{-14}/10^{-3} = 10^{-11}\\,\\text{mol/L}\$.",
                ),
                _step(
                  "\$pH = -\\log(10^{-11}) = 11\$. Solution **basique**.",
                  tipFr:
                      "Astuce : pH + pOH = 14 à 25°C. Pour une base forte de concentration C, \$pOH = -\\log C\$ et \$pH = 14 - pOH\$.",
                ),
              ], finalAnswerFr: r"$pH = 11$"),
            ),
            _q(
              3,
              "Effet d'une dilution × 100 d'une solution d'acide fort à pH = 2.",
              1,
              _sol([
                _step(
                  "\$[\\text{H}_3\\text{O}^+]\$ divisée par 100 → pH augmente de \$\\log 100 = 2\$ → nouveau pH = **4**.",
                ),
                _step(
                  "**Attention** : si on dilue énormément (pH initial proche de 7), il faut tenir compte de l'autoprotolyse de l'eau — le pH ne peut pas dépasser 7 par dilution.",
                ),
              ], finalAnswerFr: r"pH = 4"),
            ),
          ],
        ),
        _ex(
          2,
          'Acide faible',
          5,
          "L'acide éthanoïque (\$\\text{CH}_3\\text{COOH}\$, pKa = 4,75) en solution à \$C_0 = 10^{-2}\\,\\text{mol/L}\$.",
          [
            _q(
              1,
              "Écrire l'équilibre et exprimer \$K_a\$.",
              2,
              _sol([
                _step(
                  "Équilibre : \$\\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}_3\\text{O}^+\$.",
                ),
                _step(
                  "Constante d'acidité : \$K_a = \\dfrac{[\\text{CH}_3\\text{COO}^-][\\text{H}_3\\text{O}^+]}{[\\text{CH}_3\\text{COOH}]} = 10^{-pKa} \\approx 1{,}78 \\times 10^{-5}\$.",
                ),
              ], finalAnswerFr: r"$K_a \approx 1{,}78 \times 10^{-5}$"),
            ),
            _q(
              2,
              "Calculer le pH par la formule simplifiée \$pH \\approx \\frac{1}{2}(pKa - \\log C_0)\$.",
              2,
              _sol([
                _step(
                  "\$pH \\approx \\dfrac{1}{2}(4{,}75 - \\log 10^{-2}) = \\dfrac{1}{2}(4{,}75 + 2) = \\dfrac{6{,}75}{2} \\approx 3{,}38\$.",
                ),
                _step(
                  "**Condition de validité** : acide faiblement dissocié (taux de dissociation \$\\alpha \\ll 1\$). À vérifier après calcul.",
                  tipFr:
                      "Cette formule est une approximation. La forme exacte résout \$K_a = h^2/(C_0 - h)\$ où \$h = [\\text{H}_3\\text{O}^+]\$.",
                ),
              ], finalAnswerFr: r"$pH \approx 3{,}38$"),
            ),
            _q(
              3,
              "Taux de dissociation \$\\alpha = [\\text{A}^-]/C_0\$ et vérification de l'hypothèse.",
              1,
              _sol([
                _step(
                  "\$[\\text{H}_3\\text{O}^+] = 10^{-3{,}38} \\approx 4{,}2 \\times 10^{-4}\\,\\text{mol/L}\$. Pour un acide simple (négligeant l'autoprotolyse), \$[\\text{A}^-] \\approx [\\text{H}_3\\text{O}^+]\$.",
                ),
                _step(
                  "\$\\alpha = 4{,}2 \\times 10^{-4}/10^{-2} \\approx 4{,}2\\%\$. \$\\alpha \\ll 1\$ ✓, l'approximation est valide.",
                  tipFr:
                      "**Loi d'Ostwald** : \$\\alpha\$ augmente quand \$C_0\$ diminue. Pour \$C_0 \\to 0\$, \$\\alpha \\to 1\$ (dissociation totale par dilution).",
                ),
              ], finalAnswerFr: r"$\alpha \approx 4{,}2\%$"),
            ),
          ],
        ),
        _ex(
          3,
          'Mélanges et tampons',
          5,
          "On prépare un mélange de \$\\text{CH}_3\\text{COOH}\$ et \$\\text{CH}_3\\text{COO}^-\\text{Na}^+\$ à concentrations égales \$[\\text{HA}] = [\\text{A}^-] = 0{,}1\\,\\text{mol/L}\$, pKa = 4,75.",
          [
            _q(
              1,
              "Calculer le pH par Henderson-Hasselbalch.",
              2,
              _sol([
                _step(
                  "**Henderson-Hasselbalch** : \$pH = pKa + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}\$.",
                ),
                _step(
                  "Ici \$[\\text{A}^-] = [\\text{HA}]\$ → \$\\log 1 = 0\$ → \$pH = pKa = 4{,}75\$.",
                ),
              ], finalAnswerFr: r"$pH = 4{,}75$"),
            ),
            _q(
              2,
              "Que se passe-t-il si on ajoute une petite quantité d'acide fort ?",
              2,
              _sol([
                _step(
                  "**Effet tampon** : les ions \$\\text{H}_3\\text{O}^+\$ ajoutés réagissent avec \$\\text{A}^-\$ pour former \$\\text{HA}\$. Le rapport \$[\\text{A}^-]/[\\text{HA}]\$ diminue légèrement.",
                ),
                _step(
                  "Le pH varie peu (logarithme d'un rapport peu modifié). C'est la propriété **tampon** : résistance aux variations de pH.",
                  tipFr:
                      "Tampons biologiques : sang (pH 7,4), liquide intracellulaire, sont maintenus par tampons phosphate et bicarbonate.",
                ),
              ]),
            ),
            _q(
              3,
              "Quel mélange préparer pour avoir pH = 5,75 ?",
              1,
              _sol([
                _step(
                  "\$pH = pKa + \\log([\\text{A}^-]/[\\text{HA}]) = 5{,}75 \\iff \\log r = 1 \\iff r = 10\$.",
                ),
                _step(
                  "Donc \$[\\text{A}^-] = 10 \\times [\\text{HA}]\$. Par exemple : 0,1 mol/L de base conjuguée + 0,01 mol/L d'acide.",
                ),
              ], finalAnswerFr: r"$[A^-]/[HA] = 10$"),
            ),
          ],
        ),
        _ex(
          4,
          'Diagramme de prédominance',
          5,
          "Le couple \$\\text{NH}_4^+/\\text{NH}_3\$ a pKa = 9,25.",
          [
            _q(
              1,
              "Tracer le diagramme de prédominance et identifier l'espèce majoritaire à pH = 7, 9, 11.",
              3,
              _sol([
                _step(
                  "**Règle** : \$pH < pKa \\Rightarrow [\\text{HA}] > [\\text{A}^-]\$ (acide majoritaire). \$pH > pKa \\Rightarrow [\\text{A}^-] > [\\text{HA}]\$ (base majoritaire).",
                ),
                _step(
                  "Diagramme : | NH₄⁺ majo | pKa = 9,25 | NH₃ majo |",
                ),
                _step(
                  "À pH = 7 (< 9,25) : \$\\text{NH}_4^+\$ majoritaire (~99%). À pH = 9 ≈ pKa : équilibre quasi-équivalent. À pH = 11 (> 9,25) : \$\\text{NH}_3\$ majoritaire (~98%).",
                  tipFr:
                      "À \$pKa \\pm 1\$, la forme majoritaire représente > 90%. À \$pKa \\pm 2\$, > 99%.",
                ),
              ]),
            ),
            _q(
              2,
              "Pour quel pH le rapport \$[\\text{NH}_3]/[\\text{NH}_4^+] = 100\$ ?",
              2,
              _sol([
                _step(
                  "\$pH = pKa + \\log 100 = 9{,}25 + 2 = 11{,}25\$.",
                ),
                _step(
                  "À ce pH, \$\\text{NH}_3\$ représente \$100/101 \\approx 99\\%\$ du couple.",
                ),
              ], finalAnswerFr: r"$pH = 11{,}25$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperTitration() => _paper(
      titleFr: 'Épreuve type — Titrage acide-base',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "À l'équivalence : \$n_\\text{titrant} = n_\\text{titré}\$, soit \$C_b V_b = C_a V_a\$ (acide-base 1:1). Saut de pH brutal. Indicateurs colorés ou pH-métrie.",
      exercices: [
        _ex(
          1,
          'Dosage acide fort par base forte',
          5,
          "On dose un volume \$V_a = 20\\,\\text{mL}\$ d'acide chlorhydrique de concentration \$C_a\$ inconnue par de la soude \$C_b = 0{,}1\\,\\text{mol/L}\$. À l'équivalence, on a versé \$V_b^\\text{eq} = 25\\,\\text{mL}\$.",
          [
            _q(
              1,
              "Écrire la réaction de dosage.",
              1,
              _sol([
                _step(
                  "\$\\text{H}_3\\text{O}^+ + \\text{OH}^- \\to 2\\,\\text{H}_2\\text{O}\$. Réaction totale (constante \$\\sim 10^{14}\$).",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer la concentration \$C_a\$.",
              2,
              _sol([
                _step(
                  "À l'équivalence : \$n(\\text{H}_3\\text{O}^+)_\\text{initial} = n(\\text{OH}^-)_\\text{versé}\$, soit \$C_a V_a = C_b V_b^\\text{eq}\$.",
                ),
                _step(
                  "\$C_a = \\dfrac{C_b V_b^\\text{eq}}{V_a} = \\dfrac{0{,}1 \\times 25}{20} = 0{,}125\\,\\text{mol/L}\$.",
                ),
              ], finalAnswerFr: r"$C_a = 0{,}125$ mol/L"),
            ),
            _q(
              3,
              "Donner le pH initial, à la demi-équivalence, à l'équivalence et au-delà.",
              2,
              _sol([
                _step(
                  "**Initial** : acide fort, \$pH = -\\log 0{,}125 \\approx 0{,}9\$.",
                ),
                _step(
                  "**Demi-équivalence** : moitié de l'acide neutralisé, \$pH\$ vers 1,5–2 (toujours dans la zone acide).",
                ),
                _step(
                  "**Équivalence** : seuls Na⁺ et Cl⁻ en solution (sels neutres) → \$pH = 7\$ exactement.",
                ),
                _step(
                  "**Au-delà** : excès de base forte, \$pH > 7\$ et croît rapidement.",
                ),
              ], finalAnswerFr: r"$pH_i \approx 0{,}9$, $pH_\text{eq} = 7$"),
            ),
          ],
        ),
        _ex(
          2,
          'Choix de l\'indicateur coloré',
          5,
          "Un indicateur change de couleur dans une zone de virage autour de son pKi.",
          [
            _q(
              1,
              "Indicateurs courants et zones de virage :",
              2,
              _sol([
                _step(
                  "**Hélianthine** : pH 3,1–4,4 (rouge → jaune).",
                ),
                _step(
                  "**Bleu de bromothymol (BBT)** : pH 6,0–7,6 (jaune → bleu).",
                ),
                _step(
                  "**Phénolphtaléine** : pH 8,2–10 (incolore → rose).",
                ),
              ]),
            ),
            _q(
              2,
              "Quel indicateur pour doser HCl par NaOH ? Pourquoi ?",
              2,
              _sol([
                _step(
                  "Équivalence à pH = 7 (acide fort/base forte). **BBT** (6,0–7,6) est centré sur 7 — idéal.",
                ),
                _step(
                  "Le saut de pH à l'équivalence est très brutal (de ~3 à ~11 en quelques gouttes), donc même hélianthine ou phénolphtaléine seraient acceptables. Mais BBT est le plus précis.",
                ),
              ], finalAnswerFr: r"BBT (zone 6–7,6)"),
            ),
            _q(
              3,
              "Pour doser CH₃COOH par NaOH (équivalence à pH ≈ 8,5) ?",
              1,
              _sol([
                _step(
                  "**Phénolphtaléine** (zone 8,2–10) — son virage encadre bien le pH d'équivalence ≈ 8,5.",
                ),
                _step(
                  "Hélianthine serait inadaptée : elle vire **avant** l'équivalence → fausse détection.",
                  mistakeFr:
                      "Erreur classique : utiliser hélianthine pour acide faible + base forte. Le virage anticipe l'équivalence et fausse le titrage.",
                ),
              ], finalAnswerFr: r"Phénolphtaléine"),
            ),
          ],
        ),
        _ex(
          3,
          'Dosage acide faible par base forte',
          5,
          "On dose \$V_a = 20\\,\\text{mL}\$ d'acide éthanoïque (pKa = 4,75) par NaOH 0,1 mol/L. \$V_b^\\text{eq} = 15\\,\\text{mL}\$.",
          [
            _q(
              1,
              "Calculer \$C_a\$.",
              1,
              _sol([
                _step(
                  "\$C_a = C_b V_b^\\text{eq}/V_a = 0{,}1 \\times 15/20 = 0{,}075\\,\\text{mol/L}\$.",
                ),
              ], finalAnswerFr: r"$C_a = 0{,}075$ mol/L"),
            ),
            _q(
              2,
              "À la demi-équivalence, pourquoi a-t-on \$pH = pKa\$ ?",
              3,
              _sol([
                _step(
                  "À \$V_b = V_b^\\text{eq}/2\$, la moitié de l'acide \$\\text{HA}\$ a été transformée en \$\\text{A}^-\$.",
                ),
                _step(
                  "Donc \$n(\\text{HA}) = n(\\text{A}^-)\$, et en concentration aussi : \$[\\text{HA}] = [\\text{A}^-]\$.",
                ),
                _step(
                  "Par Henderson-Hasselbalch : \$pH = pKa + \\log 1 = pKa = 4{,}75\$.",
                  tipFr:
                      "**Méthode de mesure du pKa** : tracer la courbe pH-V et lire pH à la demi-équivalence. C'est la technique standard en laboratoire.",
                ),
              ], finalAnswerFr: r"$pH = pKa = 4{,}75$"),
            ),
            _q(
              3,
              "Pourquoi le pH à l'équivalence n'est-il pas 7 ?",
              1,
              _sol([
                _step(
                  "À l'équivalence : tout l'acide est transformé en base conjuguée \$\\text{CH}_3\\text{COO}^-\$. Cette base réagit partiellement avec l'eau : \$\\text{A}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{HA} + \\text{OH}^-\$.",
                ),
                _step(
                  "Donc \$[\\text{OH}^-] > [\\text{H}_3\\text{O}^+]\$ → pH > 7. Typiquement 8,5–9 pour ce type de dosage.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Courbe pH-V et exploitations',
          5,
          "On dispose d'une courbe pH-volume expérimentale (suivi pH-métrique) pour un dosage d'acide inconnu.",
          [
            _q(
              1,
              "Comment repérer le volume équivalent \$V_b^\\text{eq}\$ ?",
              3,
              _sol([
                _step(
                  "**Méthode des tangentes** : tracer deux tangentes parallèles à la courbe, l'une avant l'équivalence, l'autre après. La parallèle équidistante coupe la courbe au point équivalent.",
                ),
                _step(
                  "**Méthode de la dérivée** : tracer \$dpH/dV\$. Le maximum correspond au volume équivalent (point d'inflexion).",
                ),
                _step(
                  "**Méthode du saut** : repérer le saut brutal de pH (de quelques unités sur quelques gouttes). Centre du saut ≈ équivalence.",
                  tipFr:
                      "La méthode de la dérivée est la plus précise pour un dosage automatisé (pH-mètre + ordinateur).",
                ),
              ]),
            ),
            _q(
              2,
              "Comment savoir si l'acide est fort ou faible à partir de la courbe ?",
              2,
              _sol([
                _step(
                  "**pH initial** : acide fort → pH bas (~1–2 pour \$C \\approx 10^{-1}\$). Acide faible → pH plus élevé (~3–5 pour même C).",
                ),
                _step(
                  "**Forme avant équivalence** : acide fort → croissance douce, presque linéaire. Acide faible → plateau-tampon autour de \$pH = pKa\$ à la demi-équivalence.",
                ),
                _step(
                  "**pH à l'équivalence** : ~ 7 pour fort+forte, > 7 (~8,5–9) pour faible+forte.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperEsterification() => _paper(
      titleFr: 'Épreuve type — Estérification et hydrolyse',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Réaction : \$\\text{R-COOH} + \\text{R'-OH} \\rightleftharpoons \\text{R-COO-R'} + \\text{H}_2\\text{O}\$. Lente, limitée, athermique. Hydrolyse = sens inverse. Saponification : ester + soude, totale.",
      exercices: [
        _ex(
          1,
          'Équation et caractéristiques',
          5,
          "On mélange \$n_0 = 1\\,\\text{mol}\$ d'acide éthanoïque et \$n_0 = 1\\,\\text{mol}\$ d'éthanol à 60°C.",
          [
            _q(
              1,
              "Écrire l'équation de l'estérification.",
              2,
              _sol([
                _step(
                  "\$\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{CH}_2\\text{OH} \\rightleftharpoons \\text{CH}_3\\text{COO-CH}_2\\text{CH}_3 + \\text{H}_2\\text{O}\$.",
                ),
                _step(
                  "Produit : éthanoate d'éthyle (acétate d'éthyle) + eau.",
                ),
              ], finalAnswerFr: r"Acide + alcool $\rightleftharpoons$ ester + eau"),
            ),
            _q(
              2,
              "Caractéristiques fondamentales de cette réaction.",
              2,
              _sol([
                _step(
                  "**Lente** : à T ambiante, équilibre atteint en plusieurs semaines/mois. À 60°C avec catalyseur (H₂SO₄), plusieurs heures.",
                ),
                _step(
                  "**Limitée** : équilibre chimique, ne va pas à 100%. Constante \$K \\approx 4\$ (peu favorable).",
                ),
                _step(
                  "**Athermique** : \$\\Delta H \\approx 0\$ → la température ne déplace **pas** l'équilibre, mais accélère la cinétique (sans changer le rendement final).",
                  tipFr:
                      "Distinguer cinétique (T, catalyseur) et thermodynamique (équilibre). T accélère mais ne change pas le rendement ici.",
                ),
              ]),
            ),
            _q(
              3,
              "Taux d'avancement final à partir de \$K \\approx 4\$ pour le mélange stoechiométrique.",
              1,
              _sol([
                _step(
                  "Tableau d'avancement : \$n_\\text{acide} = n_\\text{alcool} = 1 - \\xi\$ ; \$n_\\text{ester} = n_\\text{eau} = \\xi\$. \$K = \\xi^2/(1-\\xi)^2 = 4 \\iff \\xi/(1-\\xi) = 2 \\iff \\xi = 2/3\$.",
                ),
                _step(
                  "Taux d'avancement final : \$\\xi/\\xi_\\text{max} = (2/3)/1 = 67\\%\$.",
                ),
              ], finalAnswerFr: r"$\xi = 2/3$ mol, 67%"),
            ),
          ],
        ),
        _ex(
          2,
          'Facteurs déplaçant l\'équilibre',
          5,
          "On souhaite augmenter le rendement de l'estérification.",
          [
            _q(
              1,
              "Effet de la **température** ?",
              1,
              _sol([
                _step(
                  "\$\\Delta H \\approx 0\$ (athermique). **Aucun effet sur l'équilibre**. Mais T accélère l'atteinte de l'équilibre (cinétique).",
                ),
              ]),
            ),
            _q(
              2,
              "Effet d'un **excès** d'un réactif ?",
              3,
              _sol([
                _step(
                  "**Loi de Le Chatelier** : ajouter un réactif déplace l'équilibre dans le sens de sa consommation (sens direct → plus d'ester).",
                ),
                _step(
                  "Exemple : 1 mol acide + 2 mol alcool (excès alcool). Tableau : \$n_\\text{a} = 1-\\xi\$, \$n_\\text{al} = 2-\\xi\$, \$n_\\text{ester} = \\xi\$. \$K = \\xi^2/[(1-\\xi)(2-\\xi)] = 4\$.",
                ),
                _step(
                  "Résolution : \$\\xi \\approx 0{,}85\$. Taux d'avancement de l'acide : 85% (vs 67% sans excès).",
                  tipFr:
                      "Mettre en excès le réactif **le moins cher** ou le plus facile à recycler. L'autre réactif est mieux consommé.",
                ),
              ], finalAnswerFr: r"Excès d'alcool → $\xi \approx 0{,}85$"),
            ),
            _q(
              3,
              "Effet d'éliminer un produit (eau) par distillation ?",
              1,
              _sol([
                _step(
                  "Déplacement de l'équilibre dans le sens direct (Le Chatelier). On peut atteindre des rendements > 95%.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Hydrolyse',
          5,
          "L'hydrolyse est la réaction inverse : \$\\text{ester} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{acide} + \\text{alcool}\$.",
          [
            _q(
              1,
              "On part de 1 mol d'ester pur + 1 mol d'eau. État final ?",
              3,
              _sol([
                _step(
                  "Tableau : \$n_\\text{ester} = 1 - \\xi\$, \$n_\\text{eau} = 1 - \\xi\$, \$n_\\text{acide} = n_\\text{alcool} = \\xi\$.",
                ),
                _step(
                  "K reste la même (équilibre est le même équilibre) : \$K = (1-\\xi)^2/\\xi^2\$... attention, K est défini pour le sens **estérification**. Pour l'hydrolyse, \$K' = 1/K = 0{,}25\$.",
                ),
                _step(
                  "\$(1-\\xi)^2/\\xi^2 = 4 \\iff (1-\\xi)/\\xi = 2 \\iff \\xi = 1/3\$. Donc 33% d'avancement seulement — l'ester est plutôt stable thermodynamiquement.",
                ),
              ], finalAnswerFr: r"$\xi = 1/3$ mol, 33%"),
            ),
            _q(
              2,
              "Comparaison : estérification à partir de 1+1 mol → 67%. Hydrolyse à partir de 1+1 → 33%. Pourquoi cette différence ?",
              2,
              _sol([
                _step(
                  "Les deux directions atteignent **le même état d'équilibre** (au signe près) : 2/3 ester + 1/3 acide + 1/3 alcool + 2/3 eau.",
                ),
                _step(
                  "Vu de l'estérification : 'on a converti 2/3' (avancement 67%). Vu de l'hydrolyse : 'on a converti 1/3 de l'ester' (avancement 33%). Le 2/3 + 1/3 = 1 mol total est l'état d'équilibre atteint par les deux directions.",
                  tipFr:
                      "Un équilibre chimique est indépendant de la direction de départ. Seules les concentrations initiales modifient l'état final atteint.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Saponification — réaction totale',
          5,
          "La saponification est la réaction d'un ester avec une base forte : \$\\text{R-COO-R'} + \\text{OH}^- \\to \\text{R-COO}^- + \\text{R'-OH}\$.",
          [
            _q(
              1,
              "Pourquoi cette réaction est-elle totale (contrairement à l'estérification) ?",
              3,
              _sol([
                _step(
                  "Le produit \$\\text{R-COO}^-\$ (ion carboxylate) est **stabilisé** par résonance — il est très peu basique. La réaction inverse n'a quasiment pas lieu.",
                ),
                _step(
                  "K très grand (\$\\gg 10^4\$) → réaction quasiment totale dans le sens hydroxyde + ester → carboxylate + alcool.",
                ),
                _step(
                  "**Conséquence pratique** : la saponification permet de récupérer 100% du carboxylate à partir de l'ester. Procédé industriel pour les savons (saponification des triglycérides par la soude).",
                  tipFr:
                      "La basicité de la fonction OH⁻ déplace l'équilibre vers la formation du carboxylate, qui ne se reforme pas en acide (pH élevé en milieu basique).",
                ),
              ]),
            ),
            _q(
              2,
              "Application : hydrolyse basique du méthanoate d'éthyle. Produits ?",
              2,
              _sol([
                _step(
                  "\$\\text{HCOO-C}_2\\text{H}_5 + \\text{OH}^- \\to \\text{HCOO}^- + \\text{C}_2\\text{H}_5\\text{OH}\$.",
                ),
                _step(
                  "Produits : ion méthanoate (formiate) et éthanol. Le méthanoate restera ion en milieu basique (pH > pKa de l'acide méthanoïque ≈ 3,75).",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDaniellCell() => _paper(
      titleFr: 'Épreuve type — Pile Daniell et oxydoréduction',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Pile Daniell : \$\\text{Zn} | \\text{Zn}^{2+} || \\text{Cu}^{2+} | \\text{Cu}\$. Oxydation à l'anode (-), réduction à la cathode (+). fem \$E \\approx 1{,}1\\,\\text{V}\$. Quantité d'électricité \$Q = I \\cdot t = n_e \\cdot F\$.",
      exercices: [
        _ex(
          1,
          'Demi-équations et bilan',
          5,
          "Pile Daniell : électrode de zinc plongée dans une solution de \$\\text{ZnSO}_4\$, électrode de cuivre dans une solution de \$\\text{CuSO}_4\$, jonction par pont salin.",
          [
            _q(
              1,
              "Identifier l'anode et la cathode ; écrire les demi-équations.",
              3,
              _sol([
                _step(
                  "Couples : \$\\text{Zn}^{2+}/\\text{Zn}\$ (pot. standard -0,76 V) et \$\\text{Cu}^{2+}/\\text{Cu}\$ (+0,34 V).",
                ),
                _step(
                  "**Anode (-)** : oxydation (le pôle négatif libère des électrons). Le Zn (plus réducteur) s'oxyde : \$\\text{Zn} \\to \\text{Zn}^{2+} + 2\\,e^-\$.",
                ),
                _step(
                  "**Cathode (+)** : réduction. Le Cu²⁺ se réduit : \$\\text{Cu}^{2+} + 2\\,e^- \\to \\text{Cu}\$.",
                  tipFr:
                      "Mnémo : la moitié-équation à l'anode = OX (oxydation) ; à la cathode = RED. À l'anode, les électrons sortent vers le circuit extérieur.",
                ),
              ]),
            ),
            _q(
              2,
              "Réaction globale de fonctionnement.",
              1,
              _sol([
                _step(
                  "Sommer (les électrons s'éliminent) : \$\\text{Zn} + \\text{Cu}^{2+} \\to \\text{Zn}^{2+} + \\text{Cu}\$.",
                ),
              ], finalAnswerFr: r"$\text{Zn} + \text{Cu}^{2+} \to \text{Zn}^{2+} + \text{Cu}$"),
            ),
            _q(
              3,
              "Force électromotrice (fem) théorique de la pile.",
              1,
              _sol([
                _step(
                  "\$E = E_+^° - E_-^° = E°(\\text{Cu}^{2+}/\\text{Cu}) - E°(\\text{Zn}^{2+}/\\text{Zn}) = 0{,}34 - (-0{,}76) = 1{,}10\\,\\text{V}\$.",
                ),
                _step(
                  "Cette valeur est théorique (concentrations 1 mol/L). En pratique, la tension dépend des concentrations (équation de Nernst — hors-programme Bac).",
                ),
              ], finalAnswerFr: r"$E \approx 1{,}10$ V"),
            ),
          ],
        ),
        _ex(
          2,
          'Quantité d\'électricité',
          5,
          "La pile fonctionne avec un courant \$I = 100\\,\\text{mA}\$ pendant \$t = 1\\,\\text{heure}\$. \$F = 96500\\,\\text{C/mol}\$.",
          [
            _q(
              1,
              "Calculer la quantité d'électricité \$Q\$ et le nombre de moles d'électrons \$n_e\$.",
              2,
              _sol([
                _step(
                  "\$Q = I \\cdot t = 0{,}1 \\times 3600 = 360\\,\\text{C}\$.",
                ),
                _step(
                  "\$n_e = Q/F = 360/96500 \\approx 3{,}73 \\times 10^{-3}\\,\\text{mol} \\approx 3{,}73\\,\\text{mmol}\$.",
                ),
              ], finalAnswerFr: r"$Q = 360$ C, $n_e \approx 3{,}73$ mmol"),
            ),
            _q(
              2,
              "Masse de Zn consommée et masse de Cu déposée. \$M(\\text{Zn}) = 65{,}4\\,\\text{g/mol}\$, \$M(\\text{Cu}) = 63{,}5\\,\\text{g/mol}\$.",
              3,
              _sol([
                _step(
                  "Stoechiométrie : pour 2 mol d'\$e^-\$, 1 mol de Zn consommé et 1 mol de Cu déposé.",
                ),
                _step(
                  "\$n_\\text{Zn} = n_\\text{Cu} = n_e/2 = 1{,}87 \\times 10^{-3}\\,\\text{mol}\$.",
                ),
                _step(
                  "\$m_\\text{Zn} = 1{,}87 \\times 10^{-3} \\times 65{,}4 \\approx 0{,}122\\,\\text{g} = 122\\,\\text{mg}\$.",
                ),
                _step(
                  "\$m_\\text{Cu} = 1{,}87 \\times 10^{-3} \\times 63{,}5 \\approx 0{,}119\\,\\text{g} = 119\\,\\text{mg}\$.",
                  tipFr:
                      "Vérification : masses similaires (~120 mg) car Zn et Cu ont des masses molaires proches. À une heure d'usage modeste, la pile consomme peu de métal.",
                ),
              ], finalAnswerFr: r"$m_\text{Zn} \approx 122$ mg, $m_\text{Cu} \approx 119$ mg"),
            ),
          ],
        ),
        _ex(
          3,
          'Pont salin et durée de vie',
          5,
          "Le pont salin contient une solution ionique (KCl, NH₄NO₃).",
          [
            _q(
              1,
              "Rôle du pont salin ?",
              2,
              _sol([
                _step(
                  "Il **ferme le circuit électrique** dans la solution : les cations migrent vers le compartiment qui s'enrichit en charge négative (cathode où Cu²⁺ disparaît), les anions vers celui qui s'enrichit en positive (anode où Zn²⁺ apparaît).",
                ),
                _step(
                  "Sans pont salin, les charges s'accumuleraient → un champ électrique opposé bloquerait la pile rapidement.",
                ),
                _step(
                  "**Maintient l'électroneutralité** dans chaque compartiment au cours du temps.",
                  tipFr:
                      "Sans pont salin, la pile fournit < 1 ms de courant. Avec, on peut tirer des heures de fonctionnement.",
                ),
              ]),
            ),
            _q(
              2,
              "La pile a 0,1 mol de Zn et 0,1 mol de Cu²⁺. Combien de temps peut-elle débiter \$I = 50\\,\\text{mA}\$ ?",
              3,
              _sol([
                _step(
                  "Quantité d'électrons disponible : \$n_e = 2 \\times \\min(n_\\text{Zn}, n_\\text{Cu²+}) = 0{,}2\\,\\text{mol}\$ (les deux réactifs sont stoechiométriques).",
                ),
                _step(
                  "\$Q_\\text{total} = n_e F = 0{,}2 \\times 96500 = 19\\,300\\,\\text{C}\$.",
                ),
                _step(
                  "Durée : \$t = Q/I = 19300/0{,}05 = 386\\,000\\,\\text{s} \\approx 107\\,\\text{h} \\approx 4{,}5\\,\\text{jours}\$.",
                  tipFr:
                      "Le facteur limitant est le **réactif en plus petite quantité**. Dans une pile commerciale, c'est souvent le métal actif.",
                ),
              ], finalAnswerFr: r"$t \approx 107$ h"),
            ),
          ],
        ),
        _ex(
          4,
          'Électrolyse — opération inverse',
          5,
          "L'électrolyse est le procédé inverse : on impose un courant pour forcer une réaction non spontanée.",
          [
            _q(
              1,
              "Sur le couple Cu²⁺/Cu, comparer pile et électrolyse.",
              3,
              _sol([
                _step(
                  "**Pile (déchargée)** : Cu²⁺ + 2e⁻ → Cu spontanément à la cathode (+). Le Cu se dépose, on consomme du Cu²⁺.",
                ),
                _step(
                  "**Électrolyse** : on impose un courant pour faire l'inverse — Cu → Cu²⁺ + 2e⁻ à l'anode. Le Cu se dissout, on produit du Cu²⁺.",
                ),
                _step(
                  "Conventions inversées : en pile, anode = (-) ; en électrolyse, anode = (+) du générateur extérieur. Mais l'**oxydation reste à l'anode** dans les deux cas.",
                ),
              ]),
            ),
            _q(
              2,
              "Applications industrielles de l'électrolyse.",
              2,
              _sol([
                _step(
                  "**Électrolyse de l'aluminium** : extraction Al à partir de Al₂O₃ (procédé Hall-Héroult). Coûteuse en énergie (~13 kWh/kg).",
                ),
                _step(
                  "**Galvanoplastie** : dépôt de Cu, Ni, Cr, Au sur des surfaces pour protection ou décoration.",
                ),
                _step(
                  "**Production de H₂** : électrolyse de l'eau (H₂O → H₂ + ½ O₂) — vecteur d'énergie verte si l'électricité est renouvelable.",
                  tipFr:
                      "Coût énergétique de l'électrolyse de l'eau : ~50 kWh/kg de H₂ produit. À comparer aux 33 kWh/kg énergétiquement contenu dans H₂ (efficacité ~66%).",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

// ============================================================================
// Registry & main
// ============================================================================

final Map<String, Map<String, dynamic>> _papers = {
  // Math — Batch 1: sequences
  'pc_arithmetic_geom_seq': _paperArithmeticGeomSeq(),
  'pc_seq_convergence': _paperSeqConvergence(),
  'pc_seq_recursive': _paperSeqRecursive(),
  // Math — Batch 2: limits, continuity, derivation
  'pc_limit_calc': _paperLimitCalc(),
  'pc_continuity_tvi': _paperContinuityTvi(),
  'pc_deriv_rules': _paperDerivRules(),
  'pc_deriv_apps': _paperDerivApps(),
  // Math — Batch 3: ln/exp, primitives, integrals
  'pc_ln_function': _paperLnFunction(),
  'pc_exp_function': _paperExpFunction(),
  'pc_primitives': _paperPrimitives(),
  'pc_integral_calc': _paperIntegralCalc(),
  // Math — Batch 4: complex algebra, complex trig, ODE, binomial
  'pc_complex_algebra': _paperComplexAlgebra(),
  'pc_complex_trig': _paperComplexTrig(),
  'pc_ode_first_order': _paperOdeFirstOrder(),
  'pc_prob_binomial': _paperProbBinomial(),
  // Math COMPLETE (15/15).
  // Physique-Chimie — Batch 5: mechanics
  'pc_newton_laws': _paperNewtonLaws(),
  'pc_projectile': _paperProjectile(),
  'pc_energy_mechanical': _paperEnergyMechanical(),
  'pc_pendulum': _paperPendulum(),
  // Physique-Chimie — Batch 6: electricity
  'pc_rc_circuit': _paperRcCircuit(),
  'pc_rl_circuit': _paperRlCircuit(),
  'pc_rlc_oscillations': _paperRlcOscillations(),
  // Physique-Chimie — Batch 7: waves + AM
  'pc_mechanical_waves': _paperMechanicalWaves(),
  'pc_diffraction_interference': _paperDiffractionInterference(),
  'pc_am_modulation': _paperAmModulation(),
  // Physique-Chimie — Batch 8: nuclear + kinetics
  'pc_radioactivity': _paperRadioactivity(),
  'pc_reaction_speed': _paperReactionSpeed(),
  // Physique-Chimie — Batch 9: acid-base + titration
  'pc_ph_calculation': _paperPhCalculation(),
  'pc_titration': _paperTitration(),
  // Physique-Chimie — Batch 10: organic + electrochemistry
  'pc_esterification': _paperEsterification(),
  'pc_daniell_cell': _paperDaniellCell(),
  // PC COMPLETE (31/31).
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln(
      '-- Migration 034: topic-coherent exam papers for PC chapters (Phase 3.4).');
  buf.writeln('-- Auto-generated by json_encode_exam_papers_pc.dart.');
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

  File('backend/supabase/migrations/034_exam_papers_pc.sql')
      .writeAsStringSync(buf.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/034_exam_papers_pc.sql (${_papers.length} papers).');
}
