// Phase 1 encoder: topic-coherent Bac exam papers for the 32 SMA chapters.
//
// Each chapter (skill code) gets ONE full Bac-style paper:
//   - 4-5 exercices (numbered)
//   - Each exercice has a preamble (énoncé) + numbered questions
//   - Each question optionally has lettered subparts (a, b, c)
//   - Every question/subpart has a fully-worked multi-step solution
//
// The paper is TOPIC-COHERENT — all exercices revolve around the chapter's
// topic, but explore different angles (forme indéterminée, comparaison,
// limite à l'infini, applications). Mirrors real Bac structure but stays
// pedagogically focused on the one chapter.
//
// Output: backend/supabase/migrations/030_exam_papers_sma.sql
//
// Authoring conventions (per the run rubric):
//   * Energy in the énoncé: concrete scenario, named functions, explicit
//     domains. NOT generic "soit f une fonction".
//   * Solution steps: 300-500 chars each, name the technique → state what
//     blocks naïve substitution → justify the choice → walk the calc →
//     conclude. Same depth as the 023/024 expansion run.
//   * Sub-parts naturally chained: (a) introduces, (b) builds on (a), etc.
//   * Each paper: ~20 points total over 4-5 exercices, ~90 minutes.

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

Map<String, dynamic> _q(
  int number,
  String stemFr,
  int points,
  Map<String, dynamic> solution,
) =>
    {
      'number': number,
      'stem_fr': stemFr,
      'points': points,
      'solution': solution,
    };

Map<String, dynamic> _qSubs(
  int number,
  String stemFr,
  int points,
  List<Map<String, dynamic>> subparts,
) =>
    {
      'number': number,
      'stem_fr': stemFr,
      'points': points,
      'subparts': subparts,
    };

Map<String, dynamic> _sub(
  String letter,
  String stemFr,
  int points,
  Map<String, dynamic> solution,
) =>
    {
      'letter': letter,
      'stem_fr': stemFr,
      'points': points,
      'solution': solution,
    };

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
// Papers (one function per SMA chapter, called from main)
// ============================================================================

Map<String, dynamic> _paperLimitDef() => _paper(
      titleFr: 'Épreuve type — Limites et continuité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise les techniques essentielles du chapitre **Limites et continuité** : substitution directe, levée des formes indéterminées \$\\frac{0}{0}\$ et \$\\frac{\\infty}{\\infty}\$, théorème des gendarmes, théorème des valeurs intermédiaires. Pense à toujours **tenter la substitution directe avant** toute manipulation.",
      exercices: [
        _ex(
          1,
          'Calcul de limites — formes indéterminées',
          5,
          "On considère la fonction \$f\$ définie sur \$\\mathbb{R} \\setminus \\{2\\}\$ par \$f(x) = \\dfrac{x^2 - 4}{x - 2}\$ et la fonction \$g\$ définie sur \$\\mathbb{R} \\setminus \\{1\\}\$ par \$g(x) = \\dfrac{x^3 - 1}{x - 1}\$.",
          [
            _q(
              1,
              "Calculer \$\\displaystyle\\lim_{x \\to 2} f(x)\$.",
              2,
              _sol([
                _step(
                  "On tente la substitution directe en \$x = 2\$ : le numérateur vaut \$4 - 4 = 0\$, le dénominateur vaut \$2 - 2 = 0\$. On obtient la forme indéterminée \$\\frac{0}{0}\$, signal classique qu'une factorisation cachée existe : numérateur et dénominateur ont une racine commune en \$x = 2\$.",
                ),
                _step(
                  "On factorise le numérateur via l'identité remarquable \$a^2 - b^2 = (a-b)(a+b)\$ avec \$a = x, b = 2\$ : \$x^2 - 4 = (x-2)(x+2)\$. La fraction devient \$f(x) = \\dfrac{(x-2)(x+2)}{x-2}\$.",
                  latex: r"x^2 - 4 = (x-2)(x+2)",
                ),
                _step(
                  "Le facteur \$(x-2)\$ se simplifie au numérateur et au dénominateur — opération légitime car on étudie la limite **quand** \$x \\to 2\$, donc \$x \\ne 2\$ et \$x - 2 \\ne 0\$. Il reste \$f(x) = x + 2\$ pour tout \$x \\ne 2\$, fonction polynômiale continue en 2.",
                  tipFr:
                      "Lever un \$\\frac{0}{0}\$ revient toujours à factoriser le facteur qui fait s'annuler simultanément haut et bas.",
                ),
                _step(
                  "Par continuité de la fonction simplifiée en \$x = 2\$, on obtient \$\\lim_{x \\to 2} f(x) = 2 + 2 = 4\$.",
                ),
              ], finalAnswerFr: r"$\lim_{x \to 2} f(x) = 4$"),
            ),
            _qSubs(
              2,
              "Étudier \$\\displaystyle\\lim_{x \\to 1} g(x)\$ par deux méthodes.",
              3,
              [
                _sub(
                  'a',
                  "Calculer la limite en factorisant \$x^3 - 1\$.",
                  1,
                  _sol([
                    _step(
                      "On utilise l'identité \$a^3 - b^3 = (a-b)(a^2 + ab + b^2)\$ avec \$a = x, b = 1\$ : \$x^3 - 1 = (x-1)(x^2 + x + 1)\$. Donc \$g(x) = \\dfrac{(x-1)(x^2+x+1)}{x-1} = x^2 + x + 1\$ pour \$x \\ne 1\$.",
                      latex: r"x^3 - 1 = (x-1)(x^2+x+1)",
                    ),
                    _step(
                      "Par continuité du polynôme \$x^2 + x + 1\$ en \$x = 1\$, on obtient \$\\lim_{x \\to 1} g(x) = 1 + 1 + 1 = 3\$.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to 1} g(x) = 3$"),
                ),
                _sub(
                  'b',
                  "Retrouver le même résultat en reconnaissant un taux d'accroissement.",
                  2,
                  _sol([
                    _step(
                      "On reconnaît la forme \$\\dfrac{x^3 - 1^3}{x - 1} = \\dfrac{h(x) - h(1)}{x - 1}\$ avec \$h(x) = x^3\$. Cette expression est exactement le **taux d'accroissement** de \$h\$ entre \$1\$ et \$x\$.",
                    ),
                    _step(
                      "Par définition de la dérivée : \$\\lim_{x \\to 1} \\dfrac{h(x) - h(1)}{x - 1} = h'(1)\$. Or \$h'(x) = 3x^2\$, donc \$h'(1) = 3\$.",
                      tipFr:
                          "Reconnaître un taux d'accroissement permet de calculer une limite \$\\frac{0}{0}\$ sans factoriser explicitement.",
                    ),
                    _step(
                      "On retrouve \$\\lim_{x \\to 1} g(x) = 3\$, en cohérence avec la méthode (a).",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to 1} g(x) = h'(1) = 3$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          2,
          'Limites à l\'infini — comparaison des degrés',
          5,
          "On considère la fonction rationnelle \$h\$ définie sur \$\\mathbb{R} \\setminus \\{-5\\}\$ par \$h(x) = \\dfrac{3x^2 + 2x - 1}{x + 5}\$. On cherche à comprendre son comportement asymptotique.",
          [
            _qSubs(
              1,
              "Limites à l'infini.",
              3,
              [
                _sub(
                  'a',
                  "Calculer \$\\displaystyle\\lim_{x \\to +\\infty} h(x)\$.",
                  1,
                  _sol([
                    _step(
                      "Quand \$x \\to +\\infty\$, numérateur et dénominateur tendent tous deux vers \$+\\infty\$ : forme indéterminée \$\\frac{\\infty}{\\infty}\$.",
                    ),
                    _step(
                      "**Méthode standard** : factoriser \$x\$ à la plus haute puissance haut et bas. Au numérateur, on factorise \$x^2\$ ; au dénominateur, \$x\$. \$h(x) = \\dfrac{x^2(3 + 2/x - 1/x^2)}{x(1 + 5/x)} = x \\cdot \\dfrac{3 + 2/x - 1/x^2}{1 + 5/x}\$.",
                    ),
                    _step(
                      "Quand \$x \\to +\\infty\$, les termes en \$1/x\$ et \$1/x^2\$ tendent vers 0. Le quotient \$\\dfrac{3 + 0 - 0}{1 + 0} = 3\$. Multiplié par \$x \\to +\\infty\$, on obtient \$h(x) \\to +\\infty\$.",
                      tipFr:
                          "Quand le degré du numérateur dépasse celui du dénominateur, la limite est \$\\pm\\infty\$ selon le signe.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to +\infty} h(x) = +\infty$"),
                ),
                _sub(
                  'b',
                  "En déduire \$\\displaystyle\\lim_{x \\to -\\infty} h(x)\$.",
                  2,
                  _sol([
                    _step(
                      "Même factorisation : \$h(x) = x \\cdot \\dfrac{3 + 2/x - 1/x^2}{1 + 5/x}\$.",
                    ),
                    _step(
                      "Quand \$x \\to -\\infty\$, le quotient des termes en \$1/x\$ tend toujours vers \$3/1 = 3 > 0\$ (le quotient ne dépend que des termes dominants, qui dominent à \$\\pm\\infty\$).",
                    ),
                    _step(
                      "Le facteur \$x \\to -\\infty\$ multiplié par un nombre positif donne \$-\\infty\$. Donc \$\\lim_{x \\to -\\infty} h(x) = -\\infty\$.",
                      mistakeFr:
                          "Ne pas oublier que pour un polynôme de degré 2 dominant, **le signe à \$-\\infty\$ dépend du coefficient dominant** : ici 3 > 0, donc \$+\\infty\$ — sauf qu'on a divisé par \$x+5\$, qui change le signe global à \$-\\infty\$ comparé à \$+\\infty\$.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to -\infty} h(x) = -\infty$"),
                ),
              ],
            ),
            _qSubs(
              2,
              "Limite en \$x = -5\$ (point exclu du domaine).",
              2,
              [
                _sub(
                  'a',
                  "Calculer \$\\displaystyle\\lim_{x \\to -5^+} h(x)\$.",
                  1,
                  _sol([
                    _step(
                      "En \$x = -5\$, le numérateur vaut \$3(25) + 2(-5) - 1 = 75 - 10 - 1 = 64 \\ne 0\$. Le dénominateur s'annule. Forme \$\\frac{64}{0}\$ — pas une forme indéterminée, c'est une **limite infinie**.",
                    ),
                    _step(
                      "Étudions le signe de \$x + 5\$ près de \$-5\$ : pour \$x > -5\$ (limite à droite), \$x + 5 > 0\$.",
                    ),
                    _step(
                      "Le rapport \$\\frac{64}{0^+}\$ tend vers \$+\\infty\$. Donc \$\\lim_{x \\to -5^+} h(x) = +\\infty\$.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to -5^+} h(x) = +\infty$"),
                ),
                _sub(
                  'b',
                  "En déduire \$\\displaystyle\\lim_{x \\to -5^-} h(x)\$.",
                  1,
                  _sol([
                    _step(
                      "Pour \$x < -5\$ (limite à gauche), \$x + 5 < 0\$, donc le dénominateur tend vers \$0^-\$.",
                    ),
                    _step(
                      "Le numérateur reste près de 64 (positif). Le rapport \$\\frac{64}{0^-}\$ tend vers \$-\\infty\$.",
                      tipFr:
                          "Une asymptote verticale en \$x = a\$ donne typiquement deux limites latérales infinies de signes opposés.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to -5^-} h(x) = -\infty$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          3,
          'Théorème des gendarmes',
          5,
          "Soit \$u\$ la fonction définie sur \$\\mathbb{R}^*\$ par \$u(x) = x \\sin\\left(\\dfrac{1}{x}\\right)\$.",
          [
            _q(
              1,
              "Justifier que pour tout \$x \\ne 0\$, on a \$-|x| \\le u(x) \\le |x|\$.",
              2,
              _sol([
                _step(
                  "Pour tout réel \$y\$, on sait que \$-1 \\le \\sin(y) \\le 1\$. Appliqué à \$y = 1/x\$ : \$-1 \\le \\sin(1/x) \\le 1\$.",
                ),
                _step(
                  "On multiplie cet encadrement par \$x\$, mais **attention au sens des inégalités** : si \$x > 0\$, on garde le sens ; si \$x < 0\$, on inverse. Pour traiter les deux cas en même temps, on multiplie par \$|x|\$ et on utilise \$|x \\sin(1/x)| \\le |x|\$.",
                  tipFr:
                      "Quand on encadre \$x \\cdot f(x)\$ avec \$f\$ bornée, on passe par les valeurs absolues pour éviter le piège du signe.",
                ),
                _step(
                  "On en déduit \$|u(x)| \\le |x|\$, équivalent à \$-|x| \\le u(x) \\le |x|\$ pour tout \$x \\ne 0\$.",
                ),
              ], finalAnswerFr: r"$-|x| \le u(x) \le |x|$"),
            ),
            _q(
              2,
              "En déduire \$\\displaystyle\\lim_{x \\to 0} u(x)\$.",
              3,
              _sol([
                _step(
                  "Quand \$x \\to 0\$, \$|x| \\to 0\$ également. Donc les deux 'gendarmes' \$-|x|\$ et \$|x|\$ tendent tous deux vers 0.",
                ),
                _step(
                  "**Théorème des gendarmes (ou d'encadrement)** : si pour tout \$x\$ proche de \$a\$, \$\\varphi(x) \\le u(x) \\le \\psi(x)\$ avec \$\\lim_{x \\to a} \\varphi = \\lim_{x \\to a} \\psi = L\$, alors \$\\lim_{x \\to a} u = L\$.",
                ),
                _step(
                  "Application : encadrée entre deux fonctions tendant vers 0, la fonction \$u\$ admet aussi 0 pour limite. \$\\lim_{x \\to 0} x \\sin(1/x) = 0\$.",
                  mistakeFr:
                      "On ne peut **pas** dire que \$\\lim_{x\\to 0} \\sin(1/x)\$ existe (elle n'existe pas — oscillations infinies). Le théorème des gendarmes permet justement de conclure pour le produit même quand un des facteurs n'a pas de limite.",
                ),
              ], finalAnswerFr: r"$\lim_{x \to 0} x \sin(1/x) = 0$"),
            ),
          ],
        ),
        _ex(
          4,
          'Théorème des valeurs intermédiaires',
          5,
          "On considère la fonction \$p\$ définie sur \$\\mathbb{R}\$ par \$p(x) = x^3 + x - 1\$.",
          [
            _q(
              1,
              "Montrer que \$p\$ est continue sur \$\\mathbb{R}\$ et calculer \$p(0)\$ et \$p(1)\$.",
              2,
              _sol([
                _step(
                  "\$p\$ est une fonction polynômiale, donc **continue sur \$\\mathbb{R}\$** par les théorèmes généraux (somme de monômes, eux-mêmes continus partout).",
                ),
                _step(
                  "Calcul : \$p(0) = 0 + 0 - 1 = -1\$. \$p(1) = 1 + 1 - 1 = 1\$.",
                ),
                _step(
                  "On observe que \$p(0) = -1 < 0\$ et \$p(1) = 1 > 0\$. Le signe de \$p\$ change donc entre 0 et 1 — ce qui prépare une application du TVI.",
                ),
              ], finalAnswerFr: r"$p(0) = -1$, $p(1) = 1$"),
            ),
            _q(
              2,
              "Démontrer que l'équation \$p(x) = 0\$ admet au moins une solution dans \$]0, 1[\$.",
              3,
              _sol([
                _step(
                  "**Théorème des valeurs intermédiaires (TVI)** : si \$f\$ est continue sur un intervalle \$[a, b]\$ et si \$k\$ est compris entre \$f(a)\$ et \$f(b)\$, alors il existe \$c \\in [a, b]\$ tel que \$f(c) = k\$.",
                ),
                _step(
                  "Application à \$p\$ sur \$[0, 1]\$ : \$p\$ est continue (Q1), \$p(0) = -1\$, \$p(1) = 1\$. La valeur 0 est comprise entre \$-1\$ et 1.",
                ),
                _step(
                  "Par le TVI, il existe \$c \\in ]0, 1[\$ (intervalle ouvert car \$p(0) \\ne 0\$ et \$p(1) \\ne 0\$) tel que \$p(c) = 0\$.",
                  tipFr:
                      "Le TVI prouve l'**existence** sans donner la valeur. Numériquement, \$c \\approx 0,6823\$ ici.",
                ),
                _step(
                  "**Unicité** (bonus) : \$p'(x) = 3x^2 + 1 > 0\$ pour tout \$x\$, donc \$p\$ est strictement croissante. La solution est donc **unique** dans \$\\mathbb{R}\$.",
                ),
              ], finalAnswerFr: r"$\exists ! c \in ]0, 1[ : p(c) = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDerivDefinition() => _paper(
      titleFr: 'Épreuve type — Dérivabilité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise la **définition** de la dérivée (taux d'accroissement), les **règles** de dérivation (somme, produit, quotient, chaîne), et leur **application** à l'étude des variations + tangentes.",
      exercices: [
        _ex(
          1,
          'Définition par taux d\'accroissement',
          5,
          "Soit la fonction \$f\$ définie sur \$\\mathbb{R}\$ par \$f(x) = x^2 + 3x\$.",
          [
            _q(
              1,
              "Calculer le taux d'accroissement de \$f\$ entre \$1\$ et \$1 + h\$ (avec \$h \\ne 0\$).",
              2,
              _sol([
                _step(
                  "Par définition, le taux d'accroissement entre \$a\$ et \$a + h\$ est \$\\tau_h = \\dfrac{f(a+h) - f(a)}{h}\$.",
                ),
                _step(
                  "Ici \$a = 1\$. On calcule \$f(1+h) = (1+h)^2 + 3(1+h) = 1 + 2h + h^2 + 3 + 3h = h^2 + 5h + 4\$. Et \$f(1) = 1 + 3 = 4\$.",
                ),
                _step(
                  "Différence : \$f(1+h) - f(1) = h^2 + 5h + 4 - 4 = h^2 + 5h = h(h + 5)\$.",
                ),
                _step(
                  "Taux d'accroissement : \$\\tau_h = \\dfrac{h(h+5)}{h} = h + 5\$ (pour \$h \\ne 0\$).",
                  tipFr:
                      "Le facteur \$h\$ doit toujours se simplifier pour pouvoir passer à la limite — sinon on obtient \$\\frac{0}{0}\$.",
                ),
              ], finalAnswerFr: r"$\tau_h = h + 5$"),
            ),
            _q(
              2,
              "En déduire \$f'(1)\$ en utilisant la définition.",
              2,
              _sol([
                _step(
                  "**Définition** : \$f'(a) = \\lim_{h \\to 0} \\dfrac{f(a+h) - f(a)}{h}\$.",
                ),
                _step(
                  "Appliquée à \$a = 1\$ : \$f'(1) = \\lim_{h \\to 0}(h + 5)\$. La fonction \$h \\mapsto h + 5\$ est continue en 0.",
                ),
                _step(
                  "Donc \$f'(1) = 0 + 5 = 5\$. Géométriquement, la tangente à la parabole en \$(1, 4)\$ a une pente de 5.",
                ),
              ], finalAnswerFr: r"$f'(1) = 5$"),
            ),
            _q(
              3,
              "Vérifier ce résultat en utilisant les règles usuelles de dérivation.",
              1,
              _sol([
                _step(
                  "Par linéarité et la règle des puissances : \$f'(x) = (x^2)' + (3x)' = 2x + 3\$.",
                ),
                _step(
                  "En \$x = 1\$ : \$f'(1) = 2 + 3 = 5\$. Cohérent avec le calcul direct.",
                  tipFr:
                      "Les règles usuelles sont des raccourcis ; la définition par taux d'accroissement reste valable et utile dans les cas non standards.",
                ),
              ], finalAnswerFr: r"$f'(1) = 5$"),
            ),
          ],
        ),
        _ex(
          2,
          'Règles de dérivation — produit, quotient, chaîne',
          6,
          "On considère trois fonctions : \$g(x) = x \\sin(x)\$, \$h(x) = \\dfrac{x^2 + 1}{x - 2}\$ et \$k(x) = (2x + 1)^3\$.",
          [
            _q(
              1,
              "Calculer \$g'(x)\$.",
              2,
              _sol([
                _step(
                  "**Règle du produit** : \$(uv)' = u'v + uv'\$. Avec \$u(x) = x\$ et \$v(x) = \\sin(x)\$ : \$u'(x) = 1\$, \$v'(x) = \\cos(x)\$.",
                ),
                _step(
                  "Application : \$g'(x) = 1 \\cdot \\sin(x) + x \\cdot \\cos(x) = \\sin(x) + x\\cos(x)\$.",
                  mistakeFr:
                      "Erreur classique : écrire \$g'(x) = \\cos(x)\$ en dérivant terme à terme — **faux** : le produit n'est pas la composition.",
                ),
              ], finalAnswerFr: r"$g'(x) = \sin(x) + x\cos(x)$"),
            ),
            _q(
              2,
              "Calculer \$h'(x)\$ pour \$x \\ne 2\$.",
              2,
              _sol([
                _step(
                  "**Règle du quotient** : \$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}\$. Avec \$u = x^2 + 1\$ (donc \$u' = 2x\$) et \$v = x - 2\$ (donc \$v' = 1\$).",
                ),
                _step(
                  "Numérateur : \$u'v - uv' = 2x(x-2) - (x^2+1) \\cdot 1 = 2x^2 - 4x - x^2 - 1 = x^2 - 4x - 1\$.",
                ),
                _step(
                  "Dénominateur : \$v^2 = (x-2)^2\$. Donc \$h'(x) = \\dfrac{x^2 - 4x - 1}{(x-2)^2}\$.",
                  tipFr:
                      "L'ordre dans le numérateur compte : c'est toujours \$u'v - uv'\$, pas \$uv' - u'v\$ — inverser donne le mauvais signe.",
                ),
              ],
                  finalAnswerFr:
                      r"$h'(x) = \dfrac{x^2 - 4x - 1}{(x-2)^2}$"),
            ),
            _q(
              3,
              "Calculer \$k'(x)\$.",
              2,
              _sol([
                _step(
                  "**Règle de la chaîne** (composition) : \$(f \\circ g)' = (f' \\circ g) \\cdot g'\$. Ici \$k(x) = u(x)^3\$ avec \$u(x) = 2x + 1\$.",
                ),
                _step(
                  "On dérive l'extérieur : \$(t^3)' = 3t^2\$, donc la dérivée de l'extérieur évaluée en \$u(x)\$ est \$3 u(x)^2 = 3(2x+1)^2\$.",
                ),
                _step(
                  "On multiplie par la dérivée de l'intérieur : \$u'(x) = 2\$. Donc \$k'(x) = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2\$.",
                  mistakeFr:
                      "Erreur classique : oublier le \$\\times 2\$ (la dérivée de l'argument intérieur) et écrire \$k'(x) = 3(2x+1)^2\$ — **faux**.",
                ),
              ], finalAnswerFr: r"$k'(x) = 6(2x+1)^2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Étude des variations — application',
          5,
          "Soit la fonction \$f\$ définie sur \$\\mathbb{R}\$ par \$f(x) = x^3 - 3x^2 + 2\$.",
          [
            _qSubs(
              1,
              "Étude de \$f\$.",
              4,
              [
                _sub(
                  'a',
                  "Calculer \$f'(x)\$ et résoudre \$f'(x) = 0\$.",
                  2,
                  _sol([
                    _step(
                      "\$f'(x) = 3x^2 - 6x = 3x(x - 2)\$. C'est un polynôme de degré 2.",
                    ),
                    _step(
                      "\$f'(x) = 0 \\iff 3x(x-2) = 0 \\iff x = 0 \\text{ ou } x = 2\$. Les **points critiques** sont 0 et 2.",
                    ),
                  ],
                      finalAnswerFr:
                          r"$f'(x) = 3x(x-2)$, racines : $x = 0$ et $x = 2$"),
                ),
                _sub(
                  'b',
                  "Établir le tableau de variations de \$f\$.",
                  2,
                  _sol([
                    _step(
                      "Le signe de \$f'(x) = 3x(x-2)\$ : le coefficient dominant est positif. \$f'\$ est positive en dehors des racines (entre lesquelles elle est négative).",
                    ),
                    _step(
                      "Sur \$]-\\infty, 0[\$ : \$f' > 0\$ → \$f\$ **croissante**. Sur \$]0, 2[\$ : \$f' < 0\$ → \$f\$ **décroissante**. Sur \$]2, +\\infty[\$ : \$f' > 0\$ → \$f\$ **croissante**.",
                    ),
                    _step(
                      "**Extrema** : maximum local en \$x = 0\$ avec \$f(0) = 2\$. Minimum local en \$x = 2\$ avec \$f(2) = 8 - 12 + 2 = -2\$.",
                      tipFr:
                          "Un point critique avec changement de signe de \$f'\$ de + à - est un maximum ; de - à + est un minimum.",
                    ),
                  ],
                      finalAnswerFr:
                          r"Max local $f(0) = 2$ ; Min local $f(2) = -2$"),
                ),
              ],
            ),
            _q(
              2,
              "Donner l'équation de la tangente à la courbe en \$x = 1\$.",
              1,
              _sol([
                _step(
                  "**Équation de la tangente** en \$x = a\$ : \$y = f(a) + f'(a)(x - a)\$.",
                ),
                _step(
                  "Calcul : \$f(1) = 1 - 3 + 2 = 0\$. \$f'(1) = 3(1)(1-2) = -3\$.",
                ),
                _step(
                  "Donc l'équation est \$y = 0 + (-3)(x - 1) = -3x + 3\$.",
                ),
              ], finalAnswerFr: r"$y = -3x + 3$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — optimisation',
          4,
          "Un rectangle a un périmètre fixe de 40 cm. On note \$x\$ sa largeur (en cm), avec \$0 < x < 20\$. Sa longueur est alors \$\\ell = 20 - x\$.",
          [
            _q(
              1,
              "Exprimer l'aire \$A(x)\$ du rectangle en fonction de \$x\$.",
              1,
              _sol([
                _step(
                  "Aire = largeur × longueur : \$A(x) = x \\cdot (20 - x) = 20x - x^2\$.",
                ),
                _step(
                  "Cette fonction est définie pour \$x \\in ]0, 20[\$ (largeur strictement positive et inférieure au demi-périmètre).",
                ),
              ], finalAnswerFr: r"$A(x) = 20x - x^2$"),
            ),
            _q(
              2,
              "Étudier le sens de variation de \$A\$ et déterminer la valeur de \$x\$ pour laquelle l'aire est maximale.",
              3,
              _sol([
                _step(
                  "On dérive : \$A'(x) = 20 - 2x\$. Le signe : \$A'(x) > 0 \\iff x < 10\$.",
                ),
                _step(
                  "Tableau de variations : sur \$]0, 10[\$, \$A' > 0\$ donc \$A\$ **croissante**. Sur \$]10, 20[\$, \$A' < 0\$ donc \$A\$ **décroissante**.",
                ),
                _step(
                  "Le **maximum** est atteint en \$x = 10\$ avec \$A(10) = 200 - 100 = 100\$ cm². Le rectangle optimal est donc le **carré** de côté 10 cm.",
                  tipFr:
                      "Résultat classique : à périmètre fixé, le rectangle d'aire maximale est le carré.",
                ),
              ],
                  finalAnswerFr:
                      r"Aire max = 100 cm² atteinte en $x = 10$ cm (carré)"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperSequencesReview() => _paper(
      titleFr: 'Épreuve type — Suites numériques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites arithmétiques, géométriques, récurrentes, convergence par monotonie + bornes, point fixe. Pense à toujours **conjecturer** la limite, puis la prouver via le théorème de la limite monotone.",
      exercices: [
        _ex(
          1,
          'Suites arithmétiques et géométriques',
          5,
          "On considère deux suites : \$(u_n)\$ arithmétique de premier terme \$u_0 = 2\$ et raison \$r = 3\$ ; \$(v_n)\$ géométrique de premier terme \$v_0 = 1\$ et raison \$q = 2\$.",
          [
            _q(
              1,
              "Donner les expressions explicites de \$u_n\$ et \$v_n\$.",
              2,
              _sol([
                _step(
                  "**Suite arithmétique** : \$u_n = u_0 + nr\$. Application : \$u_n = 2 + 3n\$.",
                  latex: r"u_n = u_0 + nr",
                ),
                _step(
                  "**Suite géométrique** : \$v_n = v_0 \\cdot q^n\$. Application : \$v_n = 1 \\cdot 2^n = 2^n\$.",
                  latex: r"v_n = v_0 \cdot q^n",
                ),
              ],
                  finalAnswerFr:
                      r"$u_n = 2 + 3n$, $v_n = 2^n$"),
            ),
            _q(
              2,
              "Calculer la somme \$S = u_0 + u_1 + \\dots + u_{10}\$.",
              2,
              _sol([
                _step(
                  "**Somme arithmétique** : \$S = (n+1) \\cdot \\dfrac{u_0 + u_n}{2}\$ où \$n\$ est l'indice du dernier terme.",
                ),
                _step(
                  "Ici on somme de \$u_0\$ à \$u_{10}\$, soit **11 termes**. \$u_{10} = 2 + 30 = 32\$.",
                ),
                _step(
                  "Donc \$S = 11 \\cdot \\dfrac{2 + 32}{2} = 11 \\cdot 17 = 187\$.",
                  tipFr:
                      "(nombre de termes) × (premier + dernier) / 2 — la formule de Gauss en pratique.",
                ),
              ], finalAnswerFr: r"$S = 187$"),
            ),
            _q(
              3,
              "Calculer la somme \$T = v_0 + v_1 + \\dots + v_5\$.",
              1,
              _sol([
                _step(
                  "**Somme géométrique** : \$T = v_0 \\cdot \\dfrac{1 - q^{n+1}}{1 - q}\$ pour \$n+1\$ termes.",
                ),
                _step(
                  "Ici 6 termes, \$q = 2\$, \$v_0 = 1\$. \$T = 1 \\cdot \\dfrac{1 - 2^6}{1 - 2} = \\dfrac{-63}{-1} = 63\$.",
                ),
              ], finalAnswerFr: r"$T = 63$"),
            ),
          ],
        ),
        _ex(
          2,
          'Suite récurrente — convergence par monotonie',
          6,
          "On définit la suite \$(w_n)\$ par \$w_0 = 0\$ et \$w_{n+1} = \\sqrt{w_n + 2}\$ pour tout \$n \\in \\mathbb{N}\$.",
          [
            _qSubs(
              1,
              "Étude de \$(w_n)\$.",
              4,
              [
                _sub(
                  'a',
                  "Montrer par récurrence que \$0 \\le w_n \\le 2\$ pour tout \$n\$.",
                  2,
                  _sol([
                    _step(
                      "**Initialisation** : \$w_0 = 0\$, donc \$0 \\le w_0 \\le 2\$. La propriété est vraie au rang 0.",
                    ),
                    _step(
                      "**Hérédité** : on suppose \$0 \\le w_n \\le 2\$ pour un certain \$n\$. Alors \$2 \\le w_n + 2 \\le 4\$, donc \$\\sqrt{2} \\le \\sqrt{w_n + 2} \\le 2\$ (la racine est croissante).",
                    ),
                    _step(
                      "Or \$\\sqrt{2} \\ge 0\$, donc \$0 \\le \\sqrt{2} \\le w_{n+1} \\le 2\$. La propriété est vraie au rang \$n+1\$.",
                    ),
                    _step(
                      "**Conclusion** : par récurrence, pour tout \$n \\in \\mathbb{N}\$, \$0 \\le w_n \\le 2\$. La suite est **bornée**.",
                    ),
                  ], finalAnswerFr: r"$0 \le w_n \le 2$ pour tout $n$"),
                ),
                _sub(
                  'b',
                  "Montrer que \$(w_n)\$ est croissante.",
                  2,
                  _sol([
                    _step(
                      "On veut montrer \$w_{n+1} - w_n \\ge 0\$. Calculons \$w_{n+1} - w_n = \\sqrt{w_n + 2} - w_n\$.",
                    ),
                    _step(
                      "**Astuce** : on étudie le signe de \$\\sqrt{w_n + 2} - w_n\$. Comme les deux sont positifs (Q1a), on peut comparer les carrés : \$\\sqrt{w_n + 2} \\ge w_n \\iff w_n + 2 \\ge w_n^2 \\iff w_n^2 - w_n - 2 \\le 0\$.",
                    ),
                    _step(
                      "\$w_n^2 - w_n - 2 = (w_n - 2)(w_n + 1)\$. Sur \$[0, 2]\$, \$w_n - 2 \\le 0\$ et \$w_n + 1 > 0\$, donc le produit est \$\\le 0\$.",
                    ),
                    _step(
                      "Donc \$w_{n+1} \\ge w_n\$ pour tout \$n\$ : la suite est **croissante**.",
                      tipFr:
                          "Pour comparer deux positifs, élever au carré conserve l'ordre.",
                    ),
                  ], finalAnswerFr: r"$(w_n)$ est croissante"),
                ),
              ],
            ),
            _q(
              2,
              "En déduire que \$(w_n)\$ converge et calculer sa limite.",
              2,
              _sol([
                _step(
                  "\$(w_n)\$ est **croissante** (Q1b) et **majorée** par 2 (Q1a). Par le **théorème de la limite monotone**, elle converge vers une limite finie \$L \\in [0, 2]\$.",
                ),
                _step(
                  "Par continuité de \$f(x) = \\sqrt{x + 2}\$, on passe à la limite dans la relation \$w_{n+1} = f(w_n)\$ : \$L = \\sqrt{L + 2}\$.",
                ),
                _step(
                  "On résout : \$L^2 = L + 2 \\iff L^2 - L - 2 = 0 \\iff (L-2)(L+1) = 0\$. Donc \$L = 2\$ ou \$L = -1\$. Comme \$L \\in [0, 2]\$, on retient \$L = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim_{n \to \infty} w_n = 2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Sommes — paradoxe de Zénon',
          4,
          "Soit la suite \$(s_n)\$ définie par \$s_n = \\sum_{k=0}^{n} \\dfrac{1}{2^k} = 1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\dots + \\dfrac{1}{2^n}\$.",
          [
            _q(
              1,
              "Calculer \$s_n\$ en fonction de \$n\$.",
              2,
              _sol([
                _step(
                  "C'est une **somme géométrique** de raison \$q = 1/2\$ et premier terme 1. Il y a \$n+1\$ termes.",
                ),
                _step(
                  "Formule : \$s_n = 1 \\cdot \\dfrac{1 - (1/2)^{n+1}}{1 - 1/2} = \\dfrac{1 - (1/2)^{n+1}}{1/2} = 2(1 - (1/2)^{n+1}) = 2 - (1/2)^n\$.",
                  latex: r"s_n = 2 - \frac{1}{2^n}",
                ),
              ], finalAnswerFr: r"$s_n = 2 - (1/2)^n$"),
            ),
            _q(
              2,
              "Calculer \$\\lim_{n \\to +\\infty} s_n\$ et interpréter.",
              2,
              _sol([
                _step(
                  "Quand \$n \\to +\\infty\$, \$(1/2)^n \\to 0\$ car \$|q| = 1/2 < 1\$.",
                ),
                _step(
                  "Donc \$s_n \\to 2 - 0 = 2\$. La somme infinie \$1 + 1/2 + 1/4 + \\dots = 2\$.",
                ),
                _step(
                  "**Interprétation (Zénon)** : à chaque étape on parcourt la moitié de la distance restante. Bien qu'il faille une infinité d'étapes, la somme totale est finie et vaut 2. C'est le paradoxe résolu par la convergence des séries géométriques.",
                  tipFr:
                      "Pour \$|q| < 1\$ : somme infinie \$= u_0 / (1 - q)\$ — ici \$1 / (1 - 1/2) = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim s_n = 2$"),
            ),
          ],
        ),
        _ex(
          4,
          'Suite adjacente — encadrement de e',
          5,
          "On considère les suites \$(a_n)\$ et \$(b_n)\$ définies pour \$n \\ge 1\$ par \$a_n = \\left(1 + \\dfrac{1}{n}\\right)^n\$ et \$b_n = \\left(1 + \\dfrac{1}{n}\\right)^{n+1}\$.",
          [
            _q(
              1,
              "Calculer \$a_1, a_2, a_5\$ et \$b_1, b_2, b_5\$ (3 chiffres significatifs).",
              2,
              _sol([
                _step(
                  "\$a_1 = 2^1 = 2\$. \$a_2 = (1{,}5)^2 = 2{,}25\$. \$a_5 = (1{,}2)^5 \\approx 2{,}488\$.",
                ),
                _step(
                  "\$b_1 = 2^2 = 4\$. \$b_2 = (1{,}5)^3 = 3{,}375\$. \$b_5 = (1{,}2)^6 \\approx 2{,}986\$.",
                ),
                _step(
                  "On observe que \$(a_n)\$ croît vers une limite, \$(b_n)\$ décroît vers la même limite. L'encadrement \$a_n \\le e \\le b_n\$ se resserre.",
                ),
              ]),
            ),
            _q(
              2,
              "Sachant que \$(a_n)\$ est croissante, \$(b_n)\$ décroissante, et \$b_n - a_n \\to 0\$, conclure sur leur limite commune.",
              3,
              _sol([
                _step(
                  "**Théorème des suites adjacentes** : si \$(a_n)\$ croissante, \$(b_n)\$ décroissante, et \$b_n - a_n \\to 0\$, alors \$(a_n)\$ et \$(b_n)\$ **convergent vers la même limite**.",
                ),
                _step(
                  "Cette limite commune est le **nombre d'Euler** \$e \\approx 2{,}71828\$. C'est l'une des définitions classiques de \$e\$.",
                ),
                _step(
                  "On peut en déduire un encadrement explicite : pour tout \$n \\ge 1\$, \$a_n \\le e \\le b_n\$. Cela permet d'approximer \$e\$ avec autant de précision qu'on veut en prenant \$n\$ grand.",
                  tipFr:
                          "Le théorème des suites adjacentes prouve l'existence et l'unicité de la limite ; il faut une information extérieure pour identifier sa valeur (ici, \$e\$).",
                ),
              ], finalAnswerFr: r"$\lim a_n = \lim b_n = e \approx 2{,}71828$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLnBasics() => _paper(
      titleFr: 'Épreuve type — Fonction logarithme népérien',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise la **fonction \$\\ln\$** : propriétés algébriques, dérivation, limites, résolution d'équations et étude de fonctions composées. Rappel : \$\\ln\$ est définie sur \$]0, +\\infty[\$, \$\\ln(1) = 0\$, \$\\ln(e) = 1\$, \$\\ln(ab) = \\ln a + \\ln b\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques',
          4,
          "On rappelle : \$\\ln(ab) = \\ln a + \\ln b\$, \$\\ln(a/b) = \\ln a - \\ln b\$, \$\\ln(a^n) = n \\ln a\$ pour \$a, b > 0\$.",
          [
            _q(
              1,
              "Simplifier l'expression \$A = \\ln(8) + \\ln(3) - 2\\ln(2) - \\ln(6)\$.",
              2,
              _sol([
                _step(
                  "On utilise \$2\\ln(2) = \\ln(2^2) = \\ln(4)\$ et \$\\ln(8) = \\ln(2^3) = 3\\ln(2)\$. Mais réécrivons plutôt tout en termes de logarithmes simples.",
                ),
                _step(
                  "\$A = \\ln(8) - \\ln(4) + \\ln(3) - \\ln(6) = \\ln(8/4) + \\ln(3/6) = \\ln(2) + \\ln(1/2)\$.",
                ),
                _step(
                  "Or \$\\ln(1/2) = -\\ln(2)\$. Donc \$A = \\ln(2) - \\ln(2) = 0\$.",
                  tipFr:
                      "Regrouper les ln en somme/différence avant de calculer simplifie souvent les expressions logarithmiques.",
                ),
              ], finalAnswerFr: r"$A = 0$"),
            ),
            _q(
              2,
              "Résoudre dans \$\\mathbb{R}\$ : \$\\ln(2x - 1) = \\ln(x + 3)\$.",
              2,
              _sol([
                _step(
                  "**Domaine** : il faut \$2x - 1 > 0\$ et \$x + 3 > 0\$, c'est-à-dire \$x > 1/2\$ (la condition la plus restrictive).",
                ),
                _step(
                  "Par injectivité de \$\\ln\$ (strictement croissante) : \$\\ln(u) = \\ln(v) \\iff u = v\$. Donc \$2x - 1 = x + 3 \\iff x = 4\$.",
                ),
                _step(
                  "Vérification du domaine : \$x = 4 > 1/2\$ ✓. Donc \$S = \\{4\\}\$.",
                  mistakeFr:
                      "Toujours vérifier les conditions d'existence \$u > 0\$ et \$v > 0\$ avant d'utiliser l'injectivité.",
                ),
              ], finalAnswerFr: r"$x = 4$"),
            ),
          ],
        ),
        _ex(
          2,
          'Dérivation et étude de fonction',
          6,
          "Soit la fonction \$f\$ définie sur \$]0, +\\infty[\$ par \$f(x) = x - \\ln(x)\$.",
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
                      "Par linéarité : \$f'(x) = 1 - (\\ln x)' = 1 - 1/x = \\dfrac{x - 1}{x}\$.",
                    ),
                    _step(
                      "Sur \$]0, +\\infty[\$, \$x > 0\$ donc le signe de \$f'\$ est celui de \$x - 1\$. Sur \$]0, 1[\$ : \$f' < 0\$. Sur \$]1, +\\infty[\$ : \$f' > 0\$. \$f' = 0\$ en \$x = 1\$.",
                    ),
                  ],
                      finalAnswerFr:
                          r"$f'(x) = \frac{x-1}{x}$, négative sur $]0, 1[$, positive sur $]1, +\infty[$"),
                ),
                _sub(
                  'b',
                  "En déduire le tableau de variations et l'extremum.",
                  2,
                  _sol([
                    _step(
                      "Sur \$]0, 1[\$ : \$f\$ décroissante. Sur \$]1, +\\infty[\$ : \$f\$ croissante. Donc \$f\$ admet un **minimum global** en \$x = 1\$.",
                    ),
                    _step(
                      "Valeur du minimum : \$f(1) = 1 - \\ln(1) = 1 - 0 = 1\$.",
                    ),
                    _step(
                      "**Conséquence importante** : pour tout \$x > 0\$, \$f(x) \\ge 1\$, soit \$x \\ge 1 + \\ln(x)\$ ou \$\\ln(x) \\le x - 1\$. C'est une inégalité de référence en analyse.",
                      tipFr:
                          "L'inégalité \$\\ln(x) \\le x - 1\$ (avec égalité ssi \$x = 1\$) est très utile pour borner \$\\ln\$ par un polynôme.",
                    ),
                  ],
                      finalAnswerFr:
                          r"Min global $f(1) = 1$ ; $\ln x \le x - 1$"),
                ),
              ],
            ),
            _q(
              2,
              "Calculer \$\\lim_{x \\to 0^+} f(x)\$ et \$\\lim_{x \\to +\\infty} f(x)\$.",
              2,
              _sol([
                _step(
                  "**Limite en \$0^+\$** : \$x \\to 0\$ et \$\\ln(x) \\to -\\infty\$. Donc \$f(x) = x - \\ln(x) \\to 0 - (-\\infty) = +\\infty\$.",
                ),
                _step(
                  "**Limite en \$+\\infty\$** : on a \$f(x) = x - \\ln(x) = x(1 - \\ln(x)/x)\$. Par croissances comparées, \$\\ln(x)/x \\to 0\$. Donc \$1 - \\ln(x)/x \\to 1\$ et \$f(x) \\to +\\infty\$.",
                  tipFr:
                      "**Croissances comparées** : à l'infini, toute puissance positive de \$x\$ l'emporte sur \$\\ln(x)\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{x \to 0^+} f = +\infty$, $\lim_{x \to +\infty} f = +\infty$"),
            ),
          ],
        ),
        _ex(
          3,
          'Équation logarithmique',
          5,
          "On cherche à résoudre dans \$\\mathbb{R}\$ l'équation \$(E) : \\ln(x^2 - 1) = \\ln(3) + \\ln(x + 1)\$.",
          [
            _q(
              1,
              "Déterminer le domaine de définition.",
              2,
              _sol([
                _step(
                  "Conditions : \$x^2 - 1 > 0\$ et \$x + 1 > 0\$.",
                ),
                _step(
                  "\$x^2 - 1 > 0 \\iff (x-1)(x+1) > 0 \\iff x < -1\$ ou \$x > 1\$. \$x + 1 > 0 \\iff x > -1\$.",
                ),
                _step(
                  "Intersection : \$x > 1\$. Le domaine de \$(E)\$ est \$]1, +\\infty[\$.",
                  mistakeFr:
                      "Ne pas oublier d'intersecter les domaines de chaque \$\\ln\$ — la condition la plus restrictive l'emporte.",
                ),
              ], finalAnswerFr: r"$\mathcal{D} = ]1, +\infty[$"),
            ),
            _q(
              2,
              "Résoudre \$(E)\$.",
              3,
              _sol([
                _step(
                  "On regroupe : \$\\ln(x^2 - 1) - \\ln(x + 1) = \\ln(3)\$, soit \$\\ln\\left(\\dfrac{x^2 - 1}{x + 1}\\right) = \\ln(3)\$.",
                ),
                _step(
                  "Factorise : \$\\dfrac{(x-1)(x+1)}{x+1} = x - 1\$. L'équation devient \$\\ln(x - 1) = \\ln(3)\$.",
                ),
                _step(
                  "Par injectivité : \$x - 1 = 3 \\iff x = 4\$.",
                ),
                _step(
                  "Vérification du domaine : \$x = 4 > 1\$ ✓. Donc \$S = \\{4\\}\$.",
                ),
              ], finalAnswerFr: r"$S = \{4\}$"),
            ),
          ],
        ),
        _ex(
          4,
          r"Composition — étude de $g(x) = \ln(x^2 + 1)$",
          5,
          "Soit \$g(x) = \\ln(x^2 + 1)\$ définie sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Justifier que \$g\$ est définie sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Pour tout \$x \\in \\mathbb{R}\$, \$x^2 + 1 \\ge 1 > 0\$. Donc \$\\ln(x^2 + 1)\$ est défini partout.",
                ),
              ], finalAnswerFr: r"$\mathcal{D}_g = \mathbb{R}$"),
            ),
            _q(
              2,
              "Calculer \$g'(x)\$ et étudier les variations de \$g\$.",
              2,
              _sol([
                _step(
                  "**Composition** \$\\ln \\circ u\$ avec \$u(x) = x^2 + 1\$. Règle : \$(\\ln u)' = u'/u\$.",
                ),
                _step(
                  "\$u'(x) = 2x\$, donc \$g'(x) = \\dfrac{2x}{x^2 + 1}\$.",
                ),
                _step(
                  "Le dénominateur \$x^2 + 1 > 0\$ partout. Le signe de \$g'\$ est donc celui de \$2x\$ : \$g' < 0\$ sur \$]-\\infty, 0[\$ (g décroissante), \$g' > 0\$ sur \$]0, +\\infty[\$ (g croissante). Minimum en \$x = 0\$, \$g(0) = \\ln(1) = 0\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = \frac{2x}{x^2+1}$ ; min en 0, $g(0) = 0$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{x \\to \\pm\\infty} g(x)\$.",
              2,
              _sol([
                _step(
                  "Quand \$x \\to +\\infty\$ ou \$-\\infty\$, \$x^2 + 1 \\to +\\infty\$. Et \$\\ln(t) \\to +\\infty\$ quand \$t \\to +\\infty\$.",
                ),
                _step(
                  "Par composition des limites : \$g(x) = \\ln(x^2 + 1) \\to +\\infty\$ quand \$x \\to \\pm\\infty\$.",
                  tipFr:
                          "Une fonction paire (\$g(-x) = g(x)\$ ici) a même limite à \$-\\infty\$ et à \$+\\infty\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{x \to \pm\infty} g(x) = +\infty$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperExpBasics() => _paper(
      titleFr: 'Épreuve type — Fonction exponentielle',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve teste la maîtrise de **\$\\exp = e^x\$** : propriétés algébriques, croissances comparées, équations exponentielles, étude de fonctions. Rappel : \$e^x > 0\$ partout, \$(e^x)' = e^x\$, \$e^0 = 1\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques',
          4,
          "Rappels : \$e^a \\cdot e^b = e^{a+b}\$, \$e^a / e^b = e^{a-b}\$, \$(e^a)^n = e^{na}\$, \$e^{-a} = 1/e^a\$.",
          [
            _q(
              1,
              "Simplifier \$A = \\dfrac{e^3 \\cdot e^{-1}}{e^4}\$.",
              1,
              _sol([
                _step(
                  "Numérateur : \$e^3 \\cdot e^{-1} = e^{3 + (-1)} = e^2\$.",
                ),
                _step(
                  "Quotient : \$\\dfrac{e^2}{e^4} = e^{2-4} = e^{-2}\$.",
                ),
              ], finalAnswerFr: r"$A = e^{-2}$"),
            ),
            _q(
              2,
              "Résoudre dans \$\\mathbb{R}\$ : \$e^{2x} - 3 e^x + 2 = 0\$.",
              3,
              _sol([
                _step(
                  "**Astuce** : poser \$X = e^x\$ (avec contrainte \$X > 0\$). Comme \$e^{2x} = (e^x)^2 = X^2\$, l'équation devient \$X^2 - 3X + 2 = 0\$.",
                ),
                _step(
                  "Discriminant : \$\\Delta = 9 - 8 = 1\$. Racines : \$X = (3 \\pm 1)/2\$, soit \$X = 2\$ ou \$X = 1\$. Les deux racines sont positives, donc compatibles.",
                ),
                _step(
                  "Cas 1 : \$e^x = 2 \\iff x = \\ln(2)\$. Cas 2 : \$e^x = 1 \\iff x = 0\$. Donc \$S = \\{0, \\ln(2)\\}\$.",
                  tipFr:
                          "Une équation polynomiale en \$e^x\$ se résout par substitution \$X = e^x\$, puis on revient à \$x\$.",
                ),
              ], finalAnswerFr: r"$S = \{0, \ln 2\}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Étude de fonction — exponentielle décroissante',
          5,
          "Soit la fonction \$f\$ définie sur \$\\mathbb{R}\$ par \$f(x) = x e^{-x}\$.",
          [
            _q(
              1,
              "Calculer \$f'(x)\$ et étudier son signe.",
              2,
              _sol([
                _step(
                  "**Règle du produit** : \$(uv)' = u'v + uv'\$. Avec \$u(x) = x\$ (donc \$u' = 1\$) et \$v(x) = e^{-x}\$ (donc \$v' = -e^{-x}\$).",
                ),
                _step(
                  "\$f'(x) = 1 \\cdot e^{-x} + x \\cdot (-e^{-x}) = e^{-x}(1 - x)\$.",
                ),
                _step(
                  "Comme \$e^{-x} > 0\$ pour tout \$x\$, le signe de \$f'\$ est celui de \$1 - x\$. Donc \$f' > 0\$ sur \$]-\\infty, 1[\$, \$f' < 0\$ sur \$]1, +\\infty[\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = e^{-x}(1 - x)$"),
            ),
            _q(
              2,
              "Déduire les variations de \$f\$ et son extremum.",
              1,
              _sol([
                _step(
                  "Sur \$]-\\infty, 1[\$ : \$f' > 0\$, \$f\$ croissante. Sur \$]1, +\\infty[\$ : \$f' < 0\$, \$f\$ décroissante. **Maximum** en \$x = 1\$ avec \$f(1) = 1 \\cdot e^{-1} = 1/e\$.",
                ),
              ], finalAnswerFr: r"Max global $f(1) = 1/e \approx 0{,}368$"),
            ),
            _q(
              3,
              "Calculer les limites de \$f\$ aux bornes.",
              2,
              _sol([
                _step(
                  "**En \$-\\infty\$** : \$x \\to -\\infty\$ et \$e^{-x} \\to +\\infty\$. Produit \$x \\cdot e^{-x}\$ → forme indéterminée \$(-\\infty) \\cdot (+\\infty) = -\\infty\$.",
                ),
                _step(
                  "Plus précisément, on a \$x \\to -\\infty\$ négatif × \$e^{-x} \\to +\\infty\$ positif → produit \$\\to -\\infty\$. Donc \$\\lim_{x \\to -\\infty} f = -\\infty\$.",
                ),
                _step(
                  "**En \$+\\infty\$** : \$x \\to +\\infty\$ et \$e^{-x} \\to 0^+\$. Forme indéterminée \$\\infty \\cdot 0\$. Réécrire : \$f(x) = x/e^x\$. Par croissances comparées, \$e^x\$ l'emporte sur \$x\$, donc \$x/e^x \\to 0\$. \$\\lim_{x \\to +\\infty} f = 0\$.",
                  tipFr:
                          "**Croissances comparées** : \$\\lim_{x \\to +\\infty} \\dfrac{x^n}{e^x} = 0\$ pour tout \$n\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{x \to -\infty} f = -\infty$, $\lim_{x \to +\infty} f = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Croissances comparées',
          5,
          "On considère les fonctions \$u(x) = \\dfrac{e^x}{x^3}\$ et \$v(x) = x^2 e^{-x}\$.",
          [
            _q(
              1,
              "Calculer \$\\lim_{x \\to +\\infty} u(x)\$.",
              2,
              _sol([
                _step(
                  "Quand \$x \\to +\\infty\$, numérateur \$e^x \\to +\\infty\$ et dénominateur \$x^3 \\to +\\infty\$. Forme \$\\infty/\\infty\$.",
                ),
                _step(
                  "**Théorème des croissances comparées** : à l'infini, l'exponentielle l'emporte sur toute puissance positive. \$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^n} = +\\infty\$ pour tout \$n > 0\$.",
                  tipFr:
                          "Hiérarchie de croissance : exponentielle \$\\gg\$ puissance \$\\gg\$ logarithme.",
                ),
                _step(
                  "Application : \$\\lim u(x) = +\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim u = +\infty$"),
            ),
            _q(
              2,
              "Calculer \$\\lim_{x \\to +\\infty} v(x)\$.",
              2,
              _sol([
                _step(
                  "\$v(x) = x^2 e^{-x} = \\dfrac{x^2}{e^x}\$.",
                ),
                _step(
                  "Par croissances comparées (l'exponentielle l'emporte) : \$\\lim_{x \\to +\\infty} \\dfrac{x^2}{e^x} = 0\$.",
                ),
                _step(
                  "Donc \$\\lim v(x) = 0\$. La courbe a une asymptote horizontale \$y = 0\$ en \$+\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim v = 0$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x}\$.",
              1,
              _sol([
                _step(
                  "Substitution directe : numérateur \$e^0 - 1 = 0\$, dénominateur 0. Forme \$\\frac{0}{0}\$.",
                ),
                _step(
                  "**Reconnaître un taux d'accroissement** : \$\\dfrac{e^x - e^0}{x - 0}\$ est le taux d'accroissement de \$\\exp\$ entre 0 et \$x\$. Sa limite quand \$x \\to 0\$ est \$\\exp'(0) = e^0 = 1\$.",
                  tipFr:
                          "Limite usuelle : \$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x} = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — modèle de décroissance',
          6,
          "Une quantité \$Q(t)\$ vérifie \$Q(t) = Q_0 e^{-\\lambda t}\$ avec \$Q_0 = 100\$ et \$\\lambda > 0\$. On sait que \$Q(2) = 60\$.",
          [
            _q(
              1,
              "Calculer \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "On a \$Q(2) = 100 e^{-2\\lambda} = 60\$, soit \$e^{-2\\lambda} = 0{,}6\$.",
                ),
                _step(
                  "On applique \$\\ln\$ aux deux membres : \$-2\\lambda = \\ln(0{,}6)\$, soit \$\\lambda = -\\ln(0{,}6)/2 = \\ln(5/3)/2\$.",
                ),
                _step(
                  "Numériquement : \$\\lambda \\approx \\ln(1{,}667)/2 \\approx 0{,}511/2 \\approx 0{,}255\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lambda = \frac{\ln(5/3)}{2} \approx 0{,}255$"),
            ),
            _q(
              2,
              "À quel instant \$t_*\$ a-t-on \$Q(t) = Q_0 / 2\$ (demi-vie) ?",
              2,
              _sol([
                _step(
                  "\$Q(t_*) = Q_0/2 \\iff e^{-\\lambda t_*} = 1/2 \\iff -\\lambda t_* = \\ln(1/2) = -\\ln(2)\$.",
                ),
                _step(
                  "Donc \$t_* = \\ln(2)/\\lambda\$. Avec \$\\lambda \\approx 0{,}255\$ : \$t_* \\approx 0{,}693/0{,}255 \\approx 2{,}72\$.",
                ),
                _step(
                  "**Demi-vie** : indépendante de \$Q_0\$, ne dépend que de \$\\lambda\$. Vrai pour toute décroissance exponentielle (radioactivité, pharmacocinétique).",
                  tipFr:
                          "Demi-vie : \$t_{1/2} = \\ln(2)/\\lambda\$. À retenir pour les exercices de radioactivité.",
                ),
              ], finalAnswerFr: r"$t_* = \ln(2)/\lambda \approx 2{,}72$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{t \\to +\\infty} Q(t)\$ et interpréter.",
              2,
              _sol([
                _step(
                  "Quand \$t \\to +\\infty\$, \$-\\lambda t \\to -\\infty\$ et \$e^{-\\lambda t} \\to 0^+\$. Donc \$Q(t) \\to 0^+\$.",
                ),
                _step(
                  "**Interprétation** : la quantité s'épuise asymptotiquement, sans jamais s'annuler complètement (la décroissance exponentielle ne touche jamais zéro). C'est cohérent avec la radioactivité : il reste toujours un peu de matière originale, même après très longtemps.",
                ),
              ], finalAnswerFr: r"$\lim_{t \to +\infty} Q(t) = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperPrimitives() => _paper(
      titleFr: 'Épreuve type — Primitives et intégrales',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise le **calcul de primitives** (puissances, \$\\ln\$, \$\\exp\$, trigo), les **intégrales définies** via Newton-Leibniz, et l'**intégration par parties (IPP)**.",
      exercices: [
        _ex(
          1,
          'Primitives usuelles',
          4,
          "Donner une primitive sur l'intervalle indiqué.",
          [
            _q(
              1,
              "Primitive de \$f(x) = 3x^2 - 2x + 5\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Linéarité de l'intégration : on intègre terme à terme. Règle des puissances : \$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}\$.",
                ),
                _step(
                  "\$\\int 3x^2\\,dx = x^3\$ ; \$\\int -2x\\,dx = -x^2\$ ; \$\\int 5\\,dx = 5x\$. Donc \$F(x) = x^3 - x^2 + 5x + C\$.",
                  tipFr:
                          "Toujours ajouter \$+ C\$ — la primitive est définie à une constante près.",
                ),
              ], finalAnswerFr: r"$F(x) = x^3 - x^2 + 5x + C$"),
            ),
            _q(
              2,
              "Primitive de \$g(x) = \\dfrac{1}{x}\$ sur \$]0, +\\infty[\$.",
              1,
              _sol([
                _step(
                  "Par définition même, \$(\\ln x)' = 1/x\$ sur \$]0, +\\infty[\$. Donc une primitive est \$\\ln(x) + C\$.",
                ),
                _step(
                  "Sur \$\\mathbb{R}^*\$ entier (en incluant les négatifs), la primitive est \$\\ln|x| + C\$.",
                ),
              ], finalAnswerFr: r"$G(x) = \ln(x) + C$"),
            ),
            _q(
              3,
              "Primitive de \$h(x) = \\cos(2x)\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "**Composition** : on cherche \$H\$ telle que \$H'(x) = \\cos(2x)\$. Essayer \$H(x) = \\dfrac{1}{2}\\sin(2x)\$.",
                ),
                _step(
                  "Vérification : \$H'(x) = \\dfrac{1}{2} \\cdot 2\\cos(2x) = \\cos(2x)\$ ✓. Donc \$H(x) = \\dfrac{1}{2}\\sin(2x) + C\$.",
                  mistakeFr:
                          "Oublier le facteur \$\\dfrac{1}{2}\$ qui compense le 2 de la dérivée de \$\\sin(2x)\$.",
                ),
              ], finalAnswerFr: r"$H(x) = \frac{1}{2}\sin(2x) + C$"),
            ),
            _q(
              4,
              "Primitive de \$k(x) = e^{-3x}\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Pour \$e^{ax}\$, primitive \$\\dfrac{1}{a} e^{ax}\$. Ici \$a = -3\$ : \$K(x) = -\\dfrac{1}{3} e^{-3x} + C\$.",
                ),
                _step(
                  "Vérification : \$K'(x) = -\\dfrac{1}{3} \\cdot (-3) e^{-3x} = e^{-3x}\$ ✓.",
                ),
              ], finalAnswerFr: r"$K(x) = -\frac{1}{3} e^{-3x} + C$"),
            ),
          ],
        ),
        _ex(
          2,
          'Intégrales définies — Newton-Leibniz',
          5,
          "Calculer les intégrales suivantes.",
          [
            _q(
              1,
              "\$\\displaystyle\\int_0^1 (3x^2 + 2x)\\,dx\$.",
              2,
              _sol([
                _step(
                  "Primitive : \$F(x) = x^3 + x^2\$. Vérification : \$F'(x) = 3x^2 + 2x\$ ✓.",
                ),
                _step(
                  "Newton-Leibniz : \$\\int_0^1 = F(1) - F(0) = (1 + 1) - 0 = 2\$.",
                ),
              ], finalAnswerFr: r"$\int_0^1 = 2$"),
            ),
            _q(
              2,
              "\$\\displaystyle\\int_1^e \\dfrac{1}{x}\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$\\ln(x)\$. \$\\int_1^e = \\ln(e) - \\ln(1) = 1 - 0 = 1\$.",
                  tipFr:
                          "\$\\int_1^e \\dfrac{1}{x}\\,dx = 1\$ est l'intégrale définitionnelle de \$e\$ : c'est le \$x\$ tel que l'aire vaut 1.",
                ),
              ], finalAnswerFr: r"$= 1$"),
            ),
            _q(
              3,
              "\$\\displaystyle\\int_0^{\\pi/2} \\sin(x)\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$-\\cos(x)\$. \$\\int_0^{\\pi/2} = -\\cos(\\pi/2) + \\cos(0) = 0 + 1 = 1\$.",
                ),
              ], finalAnswerFr: r"$= 1$"),
            ),
            _q(
              4,
              "\$\\displaystyle\\int_0^1 x e^x\\,dx\$ (intégration par parties).",
              1,
              _sol([
                _step(
                  "**IPP** : \$\\int u v'\\,dx = [uv] - \\int u' v\\,dx\$. Choix : \$u = x\$ (devient \$u' = 1\$, plus simple) ; \$v' = e^x\$ (donc \$v = e^x\$).",
                ),
                _step(
                  "\$\\int_0^1 x e^x\\,dx = [x e^x]_0^1 - \\int_0^1 e^x\\,dx = (1 \\cdot e - 0) - [e^x]_0^1 = e - (e - 1) = 1\$.",
                ),
              ], finalAnswerFr: r"$= 1$"),
            ),
          ],
        ),
        _ex(
          3,
          'Calcul d\'aire',
          5,
          "Soit la courbe d'équation \$y = x^2\$ et la droite \$y = 2x\$ sur \$[0, 2]\$.",
          [
            _q(
              1,
              "Déterminer les points d'intersection de la courbe et la droite.",
              2,
              _sol([
                _step(
                  "Égalité : \$x^2 = 2x \\iff x^2 - 2x = 0 \\iff x(x - 2) = 0\$.",
                ),
                _step(
                  "Solutions : \$x = 0\$ ou \$x = 2\$. Points : \$(0, 0)\$ et \$(2, 4)\$.",
                ),
              ], finalAnswerFr: r"$(0, 0)$ et $(2, 4)$"),
            ),
            _q(
              2,
              "Sur \$[0, 2]\$, déterminer laquelle des deux courbes est au-dessus, puis calculer l'aire \$\\mathcal{A}\$ comprise entre les deux.",
              3,
              _sol([
                _step(
                  "Tester un point intermédiaire, par exemple \$x = 1\$ : \$x^2 = 1\$, \$2x = 2\$. Donc \$2x \\ge x^2\$ sur \$[0, 2]\$ — la droite est au-dessus.",
                ),
                _step(
                  "**Aire entre deux courbes** : \$\\mathcal{A} = \\int_a^b (f_{\\text{sup}} - f_{\\text{inf}})\\,dx = \\int_0^2 (2x - x^2)\\,dx\$.",
                ),
                _step(
                  "Primitive de \$2x - x^2\$ : \$x^2 - x^3/3\$. Newton-Leibniz : \$\\mathcal{A} = [x^2 - x^3/3]_0^2 = (4 - 8/3) - 0 = 12/3 - 8/3 = 4/3\$.",
                ),
                _step(
                  "Donc \$\\mathcal{A} = 4/3\$ unités d'aire \$\\approx 1{,}33\$.",
                  tipFr:
                          "Toujours identifier laquelle des courbes est au-dessus avant d'intégrer — sinon le résultat est négatif et faux.",
                ),
              ], finalAnswerFr: r"$\mathcal{A} = 4/3$"),
            ),
          ],
        ),
        _ex(
          4,
          'IPP — produit polynôme × ln',
          6,
          "On veut calculer \$I = \\displaystyle\\int_1^e x \\ln(x)\\,dx\$.",
          [
            _qSubs(
              1,
              "Application de l'IPP.",
              4,
              [
                _sub(
                  'a',
                  "Choisir \$u\$ et \$v'\$ judicieusement.",
                  1,
                  _sol([
                    _step(
                      "**Stratégie LIATE** : choisir comme \$u\$ la fonction qui se *simplifie* en se dérivant. Ici \$\\ln(x)\$ devient \$1/x\$ (plus simple polynomialement), tandis que \$x\$ devient \$1\$ (encore plus simple) mais resterait en \$x^2/2\$ après intégration (compliqué).",
                    ),
                    _step(
                      "Donc : \$u = \\ln(x)\$ (devient \$u' = 1/x\$) ; \$v' = x\$ (devient \$v = x^2/2\$).",
                    ),
                  ], finalAnswerFr: r"$u = \ln(x)$, $v' = x$"),
                ),
                _sub(
                  'b',
                  "Appliquer la formule \$\\int u v' = [uv] - \\int u' v\$ et calculer \$I\$.",
                  3,
                  _sol([
                    _step(
                      "Formule : \$I = [\\ln(x) \\cdot x^2/2]_1^e - \\int_1^e \\dfrac{1}{x} \\cdot \\dfrac{x^2}{2}\\,dx\$.",
                    ),
                    _step(
                      "Terme de bord : \$[\\ln(x) \\cdot x^2/2]_1^e = (\\ln(e) \\cdot e^2/2) - (\\ln(1) \\cdot 1/2) = e^2/2 - 0 = e^2/2\$.",
                    ),
                    _step(
                      "Intégrale résiduelle : \$\\int_1^e \\dfrac{x}{2}\\,dx = \\left[\\dfrac{x^2}{4}\\right]_1^e = e^2/4 - 1/4\$.",
                    ),
                    _step(
                      "Donc \$I = e^2/2 - (e^2/4 - 1/4) = e^2/2 - e^2/4 + 1/4 = e^2/4 + 1/4 = (e^2 + 1)/4\$.",
                    ),
                    _step(
                      "Numériquement : \$I \\approx (7{,}389 + 1)/4 \\approx 2{,}10\$.",
                      tipFr:
                              "Vérification d'ordre de grandeur : sur \$[1, e]\$ (largeur \$\\approx 1{,}72\$), \$x \\ln(x)\$ varie de 0 à \$e \\cdot 1 = e \\approx 2{,}72\$. Aire moyenne \$\\sim 1{,}5\$, sur largeur 1,7, donne \$\\sim 2{,}5\$ — cohérent.",
                    ),
                  ],
                      finalAnswerFr:
                              r"$I = (e^2 + 1)/4 \approx 2{,}10$"),
                ),
              ],
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperOdeFirstOrder() => _paper(
      titleFr: 'Épreuve type — Équations différentielles',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise les **équations différentielles** d'ordre 1 et 2 du programme : \$y' = ay\$, \$y' = ay + b\$, \$y'' + \\omega^2 y = 0\$. Applications : désintégration, charge de condensateur, oscillateurs.",
      exercices: [
        _ex(
          1,
          'EDO d\'ordre 1 — résolution de référence',
          5,
          "On considère l'équation \$(E_1) : y' = 2y\$ et la condition initiale \$y(0) = 3\$.",
          [
            _q(
              1,
              "Donner la solution générale de \$(E_1)\$.",
              2,
              _sol([
                _step(
                  "**Théorème** : la solution générale de \$y' = ay\$ est \$y(x) = C e^{ax}\$ avec \$C \\in \\mathbb{R}\$.",
                ),
                _step(
                  "Justification : si \$y(x) = C e^{ax}\$, alors \$y'(x) = aC e^{ax} = ay\$ ✓.",
                ),
                _step(
                  "Ici \$a = 2\$ : solution générale \$y(x) = C e^{2x}\$.",
                ),
              ], finalAnswerFr: r"$y(x) = C e^{2x}$"),
            ),
            _q(
              2,
              "Déterminer la solution particulière vérifiant \$y(0) = 3\$.",
              1,
              _sol([
                _step(
                  "Application de la condition initiale : \$y(0) = C e^0 = C = 3\$. Donc \$C = 3\$.",
                ),
                _step(
                  "Solution unique : \$y(x) = 3 e^{2x}\$. Cette fonction croît exponentiellement.",
                ),
              ], finalAnswerFr: r"$y(x) = 3 e^{2x}$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{x \\to +\\infty} y(x)\$ et \$\\lim_{x \\to -\\infty} y(x)\$.",
              2,
              _sol([
                _step(
                  "\$\\lim_{x \\to +\\infty} 3e^{2x} = +\\infty\$ (exponentielle croissante).",
                ),
                _step(
                  "\$\\lim_{x \\to -\\infty} 3e^{2x} = 0^+\$ (asymptote horizontale \$y = 0\$).",
                  tipFr:
                      "Pour \$a > 0\$ dans \$y = Ce^{ax}\$, croissance vers \$+\\infty\$ ; pour \$a < 0\$, décroissance vers \$0\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{+\infty} = +\infty$, $\lim_{-\infty} = 0$"),
            ),
          ],
        ),
        _ex(
          2,
          'EDO avec second membre — méthode',
          5,
          "On considère l'équation \$(E_2) : y' + y = 2\$ et la condition \$y(0) = 5\$.",
          [
            _q(
              1,
              "Trouver une solution particulière constante de \$(E_2)\$.",
              1,
              _sol([
                _step(
                  "On cherche \$y_p\$ constante, donc \$y_p' = 0\$. Reportons dans l'équation : \$0 + y_p = 2 \\iff y_p = 2\$.",
                ),
                _step(
                  "Solution particulière constante : \$y_p(x) = 2\$.",
                ),
              ], finalAnswerFr: r"$y_p = 2$"),
            ),
            _q(
              2,
              "Donner la solution générale de l'équation homogène \$y' + y = 0\$.",
              1,
              _sol([
                _step(
                  "\$y' + y = 0 \\iff y' = -y\$. C'est de la forme \$y' = ay\$ avec \$a = -1\$.",
                ),
                _step(
                  "Solution générale : \$y_h(x) = C e^{-x}\$, \$C \\in \\mathbb{R}\$.",
                ),
              ], finalAnswerFr: r"$y_h(x) = C e^{-x}$"),
            ),
            _q(
              3,
              "En déduire la solution générale de \$(E_2)\$, puis celle vérifiant \$y(0) = 5\$.",
              3,
              _sol([
                _step(
                  "**Principe de superposition** : solution générale = homogène + particulière. \$y(x) = y_h + y_p = C e^{-x} + 2\$.",
                ),
                _step(
                  "Vérification : \$y' = -Ce^{-x}\$, \$y' + y = -Ce^{-x} + Ce^{-x} + 2 = 2\$ ✓.",
                ),
                _step(
                  "Condition initiale : \$y(0) = C + 2 = 5 \\iff C = 3\$. Solution : \$y(x) = 3 e^{-x} + 2\$.",
                ),
                _step(
                  "**Comportement asymptotique** : quand \$x \\to +\\infty\$, \$y \\to 2\$ (la solution converge vers la solution particulière constante). \$y = 2\$ est l'**équilibre**.",
                  tipFr:
                      "Pour \$y' + y = b\$, l'équilibre \$y = b\$ attire toutes les solutions (système stable).",
                ),
              ], finalAnswerFr: r"$y(x) = 3 e^{-x} + 2$"),
            ),
          ],
        ),
        _ex(
          3,
          'EDO d\'ordre 2 — oscillateur harmonique',
          5,
          "Soit l'équation \$(E_3) : y'' + 9 y = 0\$. Conditions : \$y(0) = 2\$ et \$y'(0) = 0\$.",
          [
            _q(
              1,
              "Identifier la forme et la pulsation \$\\omega\$.",
              1,
              _sol([
                _step(
                  "Forme canonique de l'oscillateur harmonique : \$y'' + \\omega^2 y = 0\$. Identification : \$\\omega^2 = 9 \\iff \\omega = 3\$ rad/s (par convention positive).",
                ),
              ], finalAnswerFr: r"$\omega = 3$"),
            ),
            _q(
              2,
              "Donner la solution générale.",
              1,
              _sol([
                _step(
                  "Solution générale : \$y(x) = A \\cos(\\omega x) + B \\sin(\\omega x) = A\\cos(3x) + B\\sin(3x)\$ avec \$A, B \\in \\mathbb{R}\$.",
                ),
              ], finalAnswerFr: r"$y(x) = A\cos(3x) + B\sin(3x)$"),
            ),
            _q(
              3,
              "Déterminer \$A\$ et \$B\$ grâce aux conditions initiales.",
              3,
              _sol([
                _step(
                  "Condition 1 : \$y(0) = A\\cos(0) + B\\sin(0) = A = 2\$. Donc \$A = 2\$.",
                ),
                _step(
                  "Pour exploiter \$y'(0)\$, on dérive : \$y'(x) = -3A\\sin(3x) + 3B\\cos(3x)\$.",
                ),
                _step(
                  "Condition 2 : \$y'(0) = -3A \\cdot 0 + 3B \\cdot 1 = 3B = 0\$, donc \$B = 0\$.",
                ),
                _step(
                  "Solution : \$y(x) = 2\\cos(3x)\$. **Période** \$T = 2\\pi/\\omega = 2\\pi/3\$ s. **Amplitude** = 2.",
                  tipFr:
                      "Pour \$y'' + \\omega^2 y = 0\$ : période \$T = 2\\pi/\\omega\$. Vrai en mécanique (pendule, ressort) et en électricité (LC).",
                ),
              ], finalAnswerFr: r"$y(x) = 2\cos(3x)$, $T = 2\pi/3$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — décroissance radioactive',
          5,
          "Le nombre \$N(t)\$ de noyaux d'un échantillon radioactif vérifie \$N'(t) = -\\lambda N(t)\$ avec \$N(0) = N_0\$ et \$\\lambda > 0\$ (constante radioactive).",
          [
            _q(
              1,
              "Donner \$N(t)\$ et démontrer que sa demi-vie est \$t_{1/2} = \\dfrac{\\ln 2}{\\lambda}\$.",
              3,
              _sol([
                _step(
                  "\$N' = -\\lambda N\$ → solution \$N(t) = N_0 e^{-\\lambda t}\$ (avec \$N(0) = N_0\$).",
                ),
                _step(
                  "**Demi-vie** \$t_{1/2}\$ : durée pour que \$N\$ soit divisée par 2. On résout \$N(t_{1/2}) = N_0/2\$ : \$N_0 e^{-\\lambda t_{1/2}} = N_0 / 2\$.",
                ),
                _step(
                  "Simplification : \$e^{-\\lambda t_{1/2}} = 1/2 \\iff -\\lambda t_{1/2} = \\ln(1/2) = -\\ln 2 \\iff t_{1/2} = \\ln(2)/\\lambda\$.",
                ),
                _step(
                  "**Propriété remarquable** : \$t_{1/2}\$ ne dépend pas de \$N_0\$ — chaque demi-vie réduit la quantité d'un facteur 2, peu importe le point de départ.",
                  tipFr:
                      "Demi-vie indépendante de \$N_0\$ → caractéristique unique des cinétiques d'ordre 1.",
                ),
              ], finalAnswerFr: r"$N(t) = N_0 e^{-\lambda t}$, $t_{1/2} = \ln(2)/\lambda$"),
            ),
            _q(
              2,
              "Pour le carbone-14, \$t_{1/2} = 5730\$ ans. Au bout de \$3 t_{1/2}\$ quel pourcentage du \$N_0\$ initial reste-t-il ?",
              2,
              _sol([
                _step(
                  "Au bout de \$n\$ demi-vies, il reste \$N_0/2^n\$.",
                ),
                _step(
                  "Pour \$n = 3\$ : \$N = N_0/2^3 = N_0/8 = 0{,}125 N_0\$, soit **12,5%**.",
                ),
                _step(
                  "Application typique : datation au carbone-14 d'un échantillon archéologique. Après \$3 t_{1/2} = 17190\$ ans, il reste 12,5% du \$^{14}\$C initial — détectable mais déjà bien attenué.",
                ),
              ], finalAnswerFr: r"$N/N_0 = 1/8 = 12{,}5\%$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexBasics() => _paper(
      titleFr: 'Épreuve type — Nombres complexes',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Forme algébrique, module, argument, forme trigonométrique, conjugué, équations dans \$\\mathbb{C}\$. Rappel : \$i^2 = -1\$, \$|z|^2 = z\\bar{z}\$, \$\\arg(z_1 z_2) = \\arg z_1 + \\arg z_2\$.",
      exercices: [
        _ex(
          1,
          'Forme algébrique — opérations',
          4,
          "On donne \$z_1 = 3 + 2i\$ et \$z_2 = 1 - i\$.",
          [
            _q(
              1,
              "Calculer \$z_1 + z_2\$, \$z_1 z_2\$ et \$\\dfrac{z_1}{z_2}\$ sous forme algébrique.",
              3,
              _sol([
                _step(
                  "**Somme** : \$z_1 + z_2 = (3 + 1) + (2 - 1)i = 4 + i\$.",
                ),
                _step(
                  "**Produit** : \$z_1 z_2 = (3 + 2i)(1 - i) = 3 - 3i + 2i - 2i^2 = 3 - i + 2 = 5 - i\$.",
                ),
                _step(
                  "**Quotient** : on multiplie haut et bas par le conjugué de \$z_2\$, soit \$1 + i\$. \$\\dfrac{z_1}{z_2} = \\dfrac{(3+2i)(1+i)}{(1-i)(1+i)} = \\dfrac{3 + 3i + 2i + 2i^2}{1 - i^2} = \\dfrac{1 + 5i}{2} = \\dfrac{1}{2} + \\dfrac{5}{2}i\$.",
                  tipFr:
                      "Pour diviser : multiplier par le conjugué du dénominateur. \$z\\bar{z}\$ est toujours réel positif (\$= |z|^2\$).",
                ),
              ],
                  finalAnswerFr:
                      r"$z_1+z_2 = 4+i$, $z_1 z_2 = 5-i$, $z_1/z_2 = 1/2 + 5i/2$"),
            ),
            _q(
              2,
              "Calculer \$|z_1|\$ et \$|z_2|\$.",
              1,
              _sol([
                _step(
                  "\$|z_1| = \\sqrt{3^2 + 2^2} = \\sqrt{13}\$. \$|z_2| = \\sqrt{1 + 1} = \\sqrt{2}\$.",
                ),
                _step(
                  "**Vérification** : \$|z_1 z_2| = |z_1| \\cdot |z_2| = \\sqrt{13} \\cdot \\sqrt{2} = \\sqrt{26}\$. Direct : \$|5 - i| = \\sqrt{25 + 1} = \\sqrt{26}\$ ✓.",
                ),
              ], finalAnswerFr: r"$|z_1| = \sqrt{13}$, $|z_2| = \sqrt{2}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Forme trigonométrique et Moivre',
          6,
          "On considère \$z = 1 + i\$.",
          [
            _qSubs(
              1,
              "Forme trigonométrique de \$z\$.",
              3,
              [
                _sub(
                  'a',
                  "Calculer \$|z|\$ et \$\\arg(z)\$.",
                  2,
                  _sol([
                    _step(
                      "\$|z| = \\sqrt{1 + 1} = \\sqrt{2}\$.",
                    ),
                    _step(
                      "Pour l'argument : \$\\cos\\theta = 1/\\sqrt{2}\$ et \$\\sin\\theta = 1/\\sqrt{2}\$. Les deux étant positifs, \$z\$ est dans le **premier quadrant** : \$\\theta = \\pi/4\$.",
                      tipFr:
                          "Toujours vérifier le quadrant : tan seul ne suffit pas (\$\\tan\\pi/4 = \\tan(\\pi/4 + \\pi)\$).",
                    ),
                  ], finalAnswerFr: r"$|z| = \sqrt{2}$, $\arg z = \pi/4$"),
                ),
                _sub(
                  'b',
                  "Écrire \$z\$ sous forme trigonométrique et exponentielle.",
                  1,
                  _sol([
                    _step(
                      "Forme trigonométrique : \$z = \\sqrt{2}(\\cos(\\pi/4) + i\\sin(\\pi/4))\$. Forme exponentielle : \$z = \\sqrt{2} e^{i\\pi/4}\$.",
                    ),
                  ],
                      finalAnswerFr:
                          r"$z = \sqrt{2} e^{i\pi/4}$"),
                ),
              ],
            ),
            _q(
              2,
              "Calculer \$z^4\$ en utilisant la formule de Moivre.",
              3,
              _sol([
                _step(
                  "**Formule de Moivre** : \$z^n = r^n e^{in\\theta}\$ pour \$z = re^{i\\theta}\$.",
                ),
                _step(
                  "Application : \$z^4 = (\\sqrt{2})^4 e^{i \\cdot 4 \\cdot \\pi/4} = 4 \\cdot e^{i\\pi} = 4 \\cdot (-1) = -4\$.",
                ),
                _step(
                  "**Vérification par développement direct** : \$z^2 = (1+i)^2 = 1 + 2i + i^2 = 2i\$. \$z^4 = (z^2)^2 = (2i)^2 = -4\$ ✓.",
                  tipFr:
                      "Pour des puissances élevées, Moivre est instantané ; le développement direct devient impraticable.",
                ),
              ], finalAnswerFr: r"$z^4 = -4$"),
            ),
          ],
        ),
        _ex(
          3,
          r"Équation du second degré dans $\mathbb{C}$",
          5,
          "On considère l'équation \$(E) : z^2 - 2z + 5 = 0\$.",
          [
            _q(
              1,
              "Calculer le discriminant \$\\Delta\$ et conclure sur l'existence de racines réelles.",
              1,
              _sol([
                _step(
                  "\$\\Delta = b^2 - 4ac = 4 - 20 = -16 < 0\$. L'équation n'a **pas de racines réelles**, mais admet deux racines complexes conjuguées dans \$\\mathbb{C}\$.",
                ),
              ], finalAnswerFr: r"$\Delta = -16 < 0$"),
            ),
            _q(
              2,
              "Résoudre \$(E)\$ dans \$\\mathbb{C}\$.",
              3,
              _sol([
                _step(
                  "Pour \$\\Delta < 0\$, on a \$\\sqrt{\\Delta} = \\pm i\\sqrt{-\\Delta} = \\pm i\\sqrt{16} = \\pm 4i\$.",
                ),
                _step(
                  "Racines : \$z = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a} = \\dfrac{2 \\pm 4i}{2} = 1 \\pm 2i\$.",
                ),
                _step(
                  "Donc \$S = \\{1 + 2i,\\, 1 - 2i\\}\$. Les deux racines sont **complexes conjuguées** — propriété générale d'une équation à coefficients réels.",
                  tipFr:
                      "Coefficients réels + \$\\Delta < 0\$ ⇒ racines conjuguées \$\\alpha \\pm i\\beta\$.",
                ),
              ], finalAnswerFr: r"$S = \{1 \pm 2i\}$"),
            ),
            _q(
              3,
              "Vérifier la somme et le produit des racines avec les formules de Viète.",
              1,
              _sol([
                _step(
                  "Somme : \$z_1 + z_2 = (1 + 2i) + (1 - 2i) = 2\$. Or \$-b/a = 2/1 = 2\$ ✓.",
                ),
                _step(
                  "Produit : \$z_1 z_2 = (1 + 2i)(1 - 2i) = 1 + 4 = 5\$. Or \$c/a = 5\$ ✓.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Application géométrique',
          5,
          "Dans le plan complexe, on considère \$A\$, \$B\$, \$C\$ d'affixes \$z_A = 1\$, \$z_B = 1 + i\\sqrt{3}\$, \$z_C = -1 + i\\sqrt{3}\$.",
          [
            _q(
              1,
              "Calculer les distances \$AB\$, \$BC\$, \$CA\$.",
              3,
              _sol([
                _step(
                  "\$AB = |z_B - z_A| = |i\\sqrt{3}| = \\sqrt{3}\$.",
                ),
                _step(
                  "\$BC = |z_C - z_B| = |-2 + 0| = 2\$.",
                ),
                _step(
                  "\$CA = |z_A - z_C| = |1 - (-1 + i\\sqrt{3})| = |2 - i\\sqrt{3}| = \\sqrt{4 + 3} = \\sqrt{7}\$.",
                ),
              ], finalAnswerFr: r"$AB = \sqrt{3}$, $BC = 2$, $CA = \sqrt{7}$"),
            ),
            _q(
              2,
              "Le triangle \$ABC\$ est-il isocèle ? Rectangle ? Quelconque ?",
              2,
              _sol([
                _step(
                  "Les trois côtés sont tous différents (\$\\sqrt{3}, 2, \\sqrt{7}\$), donc le triangle **n'est pas isocèle**.",
                ),
                _step(
                  "**Test de Pythagore** : \$AB^2 + BC^2 = 3 + 4 = 7 = CA^2\$ ✓. Donc le triangle est **rectangle en \$B\$** (le côté \$CA\$ est l'hypoténuse).",
                  tipFr:
                      "Réciproque de Pythagore : si \$a^2 + b^2 = c^2\$, le triangle est rectangle avec hypoténuse \$c\$.",
                ),
                _step(
                  "Conclusion : triangle **rectangle scalène** (rectangle non isocèle), aire \$= AB \\cdot BC / 2 = \\sqrt{3} \\cdot 2 / 2 = \\sqrt{3}\$.",
                ),
              ], finalAnswerFr: r"Triangle rectangle en $B$, aire = $\sqrt{3}$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperVectors3d() => _paper(
      titleFr: 'Épreuve type — Géométrie dans l\'espace',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Vecteurs de \$\\mathbb{R}^3\$, produit scalaire, produit vectoriel, équation cartésienne d'un plan, distance point-plan, intersection droite-plan.",
      exercices: [
        _ex(
          1,
          'Vecteurs et produit scalaire',
          4,
          "Dans un repère orthonormé direct \$(O, \\vec{i}, \\vec{j}, \\vec{k})\$, on donne \$A(1, 2, 3)\$, \$B(4, 6, 3)\$, \$C(2, -1, 5)\$.",
          [
            _q(
              1,
              "Calculer les vecteurs \$\\vec{AB}\$ et \$\\vec{AC}\$.",
              1,
              _sol([
                _step(
                  "\$\\vec{AB} = B - A = (4-1, 6-2, 3-3) = (3, 4, 0)\$.",
                ),
                _step(
                  "\$\\vec{AC} = C - A = (1, -3, 2)\$.",
                ),
              ], finalAnswerFr: r"$\vec{AB} = (3, 4, 0)$, $\vec{AC} = (1, -3, 2)$"),
            ),
            _q(
              2,
              "Calculer \$\\vec{AB} \\cdot \\vec{AC}\$ et déduire l'angle \$\\widehat{BAC}\$ (3 chiffres significatifs).",
              3,
              _sol([
                _step(
                  "**Produit scalaire** : \$\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y + u_z v_z\$. Application : \$\\vec{AB} \\cdot \\vec{AC} = 3 \\cdot 1 + 4 \\cdot (-3) + 0 \\cdot 2 = 3 - 12 + 0 = -9\$.",
                ),
                _step(
                  "**Normes** : \$\\|\\vec{AB}\\| = \\sqrt{9 + 16 + 0} = 5\$ ; \$\\|\\vec{AC}\\| = \\sqrt{1 + 9 + 4} = \\sqrt{14}\$.",
                ),
                _step(
                  "**Formule** : \$\\cos\\widehat{BAC} = \\dfrac{\\vec{AB} \\cdot \\vec{AC}}{\\|\\vec{AB}\\| \\|\\vec{AC}\\|} = \\dfrac{-9}{5\\sqrt{14}} \\approx -0{,}481\$.",
                ),
                _step(
                  "Angle : \\widehat{BAC} = \\arccos(-0{,}481) \\approx 118{,}8°.",
                  tipFr:
                      "Produit scalaire négatif → angle obtus (> 90°). Cohérent ici.",
                ),
              ],
                  finalAnswerFr:
                      r"$\vec{AB} \cdot \vec{AC} = -9$, $\widehat{BAC} \approx 118{,}8°$"),
            ),
          ],
        ),
        _ex(
          2,
          'Produit vectoriel et aire',
          5,
          "On reprend \$A, B, C\$ comme à l'Exercice 1.",
          [
            _q(
              1,
              "Calculer \$\\vec{AB} \\wedge \\vec{AC}\$.",
              3,
              _sol([
                _step(
                  "**Produit vectoriel** : \$\\vec{u} \\wedge \\vec{v} = (u_y v_z - u_z v_y, u_z v_x - u_x v_z, u_x v_y - u_y v_x)\$.",
                ),
                _step(
                  "Avec \$\\vec{AB} = (3, 4, 0)\$, \$\\vec{AC} = (1, -3, 2)\$ :\\nx-composante : \$4 \\cdot 2 - 0 \\cdot (-3) = 8\$.\\ny-composante : \$0 \\cdot 1 - 3 \\cdot 2 = -6\$.\\nz-composante : \$3 \\cdot (-3) - 4 \\cdot 1 = -13\$.",
                ),
                _step(
                  "Donc \$\\vec{AB} \\wedge \\vec{AC} = (8, -6, -13)\$.",
                ),
                _step(
                  "**Propriété** : ce vecteur est **perpendiculaire** à \$\\vec{AB}\$ et à \$\\vec{AC}\$ — c'est-à-dire normal au plan \$(ABC)\$.",
                  tipFr:
                      "Le produit vectoriel donne un vecteur normal au plan formé par les deux vecteurs initiaux.",
                ),
              ], finalAnswerFr: r"$\vec{AB} \wedge \vec{AC} = (8, -6, -13)$"),
            ),
            _q(
              2,
              "En déduire l'aire du triangle \$ABC\$.",
              2,
              _sol([
                _step(
                  "**Aire du triangle** = \$\\dfrac{1}{2} \\|\\vec{AB} \\wedge \\vec{AC}\\|\$.",
                ),
                _step(
                  "Calcul : \$\\|(8, -6, -13)\\| = \\sqrt{64 + 36 + 169} = \\sqrt{269} \\approx 16{,}40\$.",
                ),
                _step(
                  "Aire = \$\\sqrt{269}/2 \\approx 8{,}20\$ unités d'aire.",
                ),
              ], finalAnswerFr: r"Aire $= \sqrt{269}/2 \approx 8{,}20$"),
            ),
          ],
        ),
        _ex(
          3,
          'Équation cartésienne d\'un plan',
          5,
          "Soit le plan \$\\mathcal{P}\$ passant par \$A(1, 2, 3)\$ et de vecteur normal \$\\vec{n} = (2, 1, -1)\$.",
          [
            _q(
              1,
              "Donner une équation cartésienne de \$\\mathcal{P}\$.",
              2,
              _sol([
                _step(
                  "**Forme générale** : un plan de vecteur normal \$(a, b, c)\$ a pour équation \$ax + by + cz + d = 0\$.",
                ),
                _step(
                  "Ici \$(a, b, c) = (2, 1, -1)\$, donc \$2x + y - z + d = 0\$.",
                ),
                _step(
                  "On détermine \$d\$ en utilisant que \$A(1, 2, 3) \\in \\mathcal{P}\$ : \$2(1) + 2 - 3 + d = 0 \\iff 1 + d = 0 \\iff d = -1\$.",
                ),
                _step(
                  "Équation : \$2x + y - z - 1 = 0\$.",
                ),
              ], finalAnswerFr: r"$2x + y - z - 1 = 0$"),
            ),
            _q(
              2,
              "Calculer la distance du point \$M(0, 0, 0)\$ au plan \$\\mathcal{P}\$.",
              2,
              _sol([
                _step(
                  "**Formule** : \$d(M_0, \\mathcal{P}) = \\dfrac{|a x_0 + b y_0 + c z_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}\$.",
                ),
                _step(
                  "Avec \$M = O(0,0,0)\$ et le plan \$2x + y - z - 1 = 0\$ : numérateur \$|0 + 0 + 0 - 1| = 1\$.",
                ),
                _step(
                  "Dénominateur : \$\\sqrt{4 + 1 + 1} = \\sqrt{6}\$.",
                ),
                _step(
                  "Distance : \$d = \\dfrac{1}{\\sqrt{6}} = \\dfrac{\\sqrt{6}}{6} \\approx 0{,}408\$.",
                ),
              ], finalAnswerFr: r"$d(O, \mathcal{P}) = \sqrt{6}/6 \approx 0{,}408$"),
            ),
            _q(
              3,
              "Le point \$N(2, 0, 3)\$ appartient-il à \$\\mathcal{P}\$ ?",
              1,
              _sol([
                _step(
                  "Tester : \$2(2) + 0 - 3 - 1 = 4 - 4 = 0\$ ✓. Donc \$N \\in \\mathcal{P}\$.",
                ),
              ], finalAnswerFr: r"Oui, $N \in \mathcal{P}$"),
            ),
          ],
        ),
        _ex(
          4,
          'Droite et plan — intersection',
          6,
          "Soit \$\\mathcal{D}\$ la droite passant par \$P(1, 1, 2)\$ et de vecteur directeur \$\\vec{u} = (2, -1, 1)\$. Soit \$\\mathcal{Q}\$ le plan d'équation \$x + 2y + z - 5 = 0\$.",
          [
            _q(
              1,
              "Donner une représentation paramétrique de \$\\mathcal{D}\$.",
              2,
              _sol([
                _step(
                  "**Forme paramétrique** : \$M(t) = P + t\\vec{u}\$. Soit \$\\{x = 1 + 2t,\\, y = 1 - t,\\, z = 2 + t\\}\$ pour \$t \\in \\mathbb{R}\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$x = 1 + 2t$, $y = 1 - t$, $z = 2 + t$"),
            ),
            _q(
              2,
              "Déterminer l'intersection \$\\mathcal{D} \\cap \\mathcal{Q}\$.",
              4,
              _sol([
                _step(
                  "On substitue les expressions paramétriques dans l'équation du plan : \$(1 + 2t) + 2(1 - t) + (2 + t) - 5 = 0\$.",
                ),
                _step(
                  "Développement : \$1 + 2t + 2 - 2t + 2 + t - 5 = 0\$, soit \$0 + t = 0\$, donc \$t = 0\$.",
                ),
                _step(
                  "Une seule solution \$t = 0\$ → la droite et le plan se coupent en un **point unique**.",
                ),
                _step(
                  "Coordonnées : \$M = (1 + 0, 1 - 0, 2 + 0) = (1, 1, 2) = P\$. Vérification : \$1 + 2 + 2 - 5 = 0\$ ✓.",
                  tipFr:
                      "Trois cas : 1 point d'intersection (droite traverse le plan), aucun (droite parallèle au plan, non incluse), ou infinité (droite incluse dans le plan).",
                ),
              ], finalAnswerFr: r"$\mathcal{D} \cap \mathcal{Q} = \{P(1, 1, 2)\}$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperCounting() => _paper(
      titleFr: 'Épreuve type — Dénombrement et probabilités',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Dénombrement (permutations, arrangements, combinaisons), probabilités élémentaires, conditionnelles, indépendance, loi binomiale.",
      exercices: [
        _ex(
          1,
          'Dénombrement',
          5,
          "Une classe compte 25 élèves : 14 filles et 11 garçons.",
          [
            _q(
              1,
              "De combien de façons peut-on former un groupe de 3 élèves ?",
              2,
              _sol([
                _step(
                  "**Combinaisons** (sans ordre, sans répétition) : \$\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}\$.",
                ),
                _step(
                  "Application : \$\\binom{25}{3} = \\dfrac{25 \\cdot 24 \\cdot 23}{6} = \\dfrac{13800}{6} = 2300\$.",
                  tipFr:
                      "Pour \$\\binom{n}{k}\$ avec \$k\$ petit, simplifier en gardant les \$k\$ derniers facteurs du numérateur.",
                ),
              ], finalAnswerFr: r"$\binom{25}{3} = 2300$"),
            ),
            _q(
              2,
              "De combien de façons peut-on former un groupe de 3 élèves comprenant exactement 2 filles ?",
              2,
              _sol([
                _step(
                  "**Principe multiplicatif** : choisir 2 filles parmi 14 ET 1 garçon parmi 11.",
                ),
                _step(
                  "Choix des filles : \$\\binom{14}{2} = 91\$. Choix du garçon : \$\\binom{11}{1} = 11\$.",
                ),
                _step(
                  "Total : \$91 \\times 11 = 1001\$ groupes.",
                ),
              ], finalAnswerFr: r"$\binom{14}{2}\binom{11}{1} = 1001$"),
            ),
            _q(
              3,
              "De combien de façons peut-on aligner 5 élèves en file indienne ?",
              1,
              _sol([
                _step(
                  "**Arrangements** (avec ordre, sans répétition) : \$A_n^k = \\dfrac{n!}{(n-k)!}\$.",
                ),
                _step(
                  "\$A_{25}^5 = 25 \\cdot 24 \\cdot 23 \\cdot 22 \\cdot 21 = 6\\,375\\,600\$.",
                ),
              ], finalAnswerFr: r"$A_{25}^5 = 6\,375\,600$"),
            ),
          ],
        ),
        _ex(
          2,
          'Probabilité conditionnelle',
          5,
          "Une urne contient 5 boules rouges et 3 boules vertes. On tire deux boules **successivement et sans remise**.",
          [
            _q(
              1,
              "Quelle est la probabilité de tirer deux boules rouges ?",
              2,
              _sol([
                _step(
                  "Événements : \$R_1\$ = '1ère boule rouge', \$R_2\$ = '2ème boule rouge'. On cherche \$P(R_1 \\cap R_2)\$.",
                ),
                _step(
                  "**Probabilité composée** : \$P(R_1 \\cap R_2) = P(R_1) \\cdot P(R_2 | R_1)\$.",
                ),
                _step(
                  "\$P(R_1) = 5/8\$ (5 rouges sur 8 boules).",
                ),
                _step(
                  "\$P(R_2 | R_1) = 4/7\$ (après tirage d'une rouge, il reste 4 rouges sur 7).",
                ),
                _step(
                  "Donc \$P(R_1 \\cap R_2) = \\dfrac{5}{8} \\cdot \\dfrac{4}{7} = \\dfrac{20}{56} = \\dfrac{5}{14} \\approx 0{,}357\$.",
                ),
              ], finalAnswerFr: r"$P(RR) = 5/14$"),
            ),
            _q(
              2,
              "Probabilité de tirer une boule rouge puis une boule verte.",
              2,
              _sol([
                _step(
                  "\$P(R_1 \\cap V_2) = P(R_1) \\cdot P(V_2 | R_1)\$.",
                ),
                _step(
                  "\$P(R_1) = 5/8\$, \$P(V_2 | R_1) = 3/7\$ (3 vertes restent sur 7 boules).",
                ),
                _step(
                  "Donc \$P(R_1 \\cap V_2) = \\dfrac{5}{8} \\cdot \\dfrac{3}{7} = \\dfrac{15}{56} \\approx 0{,}268\$.",
                ),
              ], finalAnswerFr: r"$P(RV) = 15/56$"),
            ),
            _q(
              3,
              "Probabilité de tirer une boule rouge et une boule verte (dans n'importe quel ordre).",
              1,
              _sol([
                _step(
                  "Deux cas disjoints : RV ou VR. \$P = P(RV) + P(VR)\$.",
                ),
                _step(
                  "\$P(VR) = \\dfrac{3}{8} \\cdot \\dfrac{5}{7} = \\dfrac{15}{56}\$. Donc \$P = 15/56 + 15/56 = 30/56 = 15/28 \\approx 0{,}536\$.",
                ),
              ], finalAnswerFr: r"$P = 15/28$"),
            ),
          ],
        ),
        _ex(
          3,
          'Loi binomiale',
          5,
          "On lance un dé équilibré à 6 faces 4 fois de suite. Soit \$X\$ le nombre de \"6\" obtenus.",
          [
            _q(
              1,
              "Justifier que \$X\$ suit une loi binomiale et préciser ses paramètres.",
              2,
              _sol([
                _step(
                  "**Schéma de Bernoulli** : on a 4 essais indépendants (les lancers d'un dé sont indépendants), chacun à 2 issues : succès = '6' (\$p = 1/6\$) ou échec = 'pas 6' (\$1 - p = 5/6\$). \$X\$ = nombre de succès.",
                ),
                _step(
                  "\$X \\sim \\mathcal{B}(n, p)\$ avec \$n = 4\$ et \$p = 1/6\$.",
                  tipFr:
                      "Conditions binomiale : (1) répétitions indépendantes, (2) même proba à chaque essai, (3) deux issues seulement.",
                ),
              ], finalAnswerFr: r"$X \sim \mathcal{B}(4, 1/6)$"),
            ),
            _q(
              2,
              "Calculer \$P(X = 2)\$.",
              2,
              _sol([
                _step(
                  "**Formule** : \$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}\$.",
                ),
                _step(
                  "Pour \$k = 2, n = 4, p = 1/6\$ : \$P(X = 2) = \\binom{4}{2} \\cdot (1/6)^2 \\cdot (5/6)^2\$.",
                ),
                _step(
                  "Calcul : \$\\binom{4}{2} = 6\$, \$(1/6)^2 = 1/36\$, \$(5/6)^2 = 25/36\$. Produit : \$6 \\cdot 1/36 \\cdot 25/36 = 150/1296 = 25/216 \\approx 0{,}116\$.",
                ),
              ], finalAnswerFr: r"$P(X = 2) = 25/216 \approx 0{,}116$"),
            ),
            _q(
              3,
              "Calculer \$E(X)\$ et \$V(X)\$.",
              1,
              _sol([
                _step(
                  "**Loi binomiale** : \$E(X) = np\$, \$V(X) = np(1-p)\$.",
                ),
                _step(
                  "\$E(X) = 4 \\cdot 1/6 = 2/3 \\approx 0{,}667\$. \$V(X) = 4 \\cdot 1/6 \\cdot 5/6 = 20/36 = 5/9 \\approx 0{,}556\$.",
                ),
              ], finalAnswerFr: r"$E(X) = 2/3$, $V(X) = 5/9$"),
            ),
          ],
        ),
        _ex(
          4,
          'Indépendance et compatibilité',
          5,
          "Soit \$A\$ et \$B\$ deux événements d'un univers fini avec \$P(A) = 0{,}4\$, \$P(B) = 0{,}3\$, et \$P(A \\cap B) = 0{,}12\$.",
          [
            _q(
              1,
              "Vérifier que \$A\$ et \$B\$ sont indépendants.",
              2,
              _sol([
                _step(
                  "**Critère d'indépendance** : \$A \\perp B \\iff P(A \\cap B) = P(A) \\cdot P(B)\$.",
                ),
                _step(
                  "Calcul : \$P(A) \\cdot P(B) = 0{,}4 \\times 0{,}3 = 0{,}12\$.",
                ),
                _step(
                  "\$P(A \\cap B) = 0{,}12 = P(A) \\cdot P(B)\$. Donc \$A\$ et \$B\$ sont **indépendants**.",
                  tipFr:
                      "Indépendance ≠ incompatibilité. Ici \$A\\cap B \\ne \\emptyset\$ donc \$A\$ et \$B\$ ne sont pas incompatibles, mais ils sont indépendants.",
                ),
              ], finalAnswerFr: r"$A \perp B$"),
            ),
            _q(
              2,
              "Calculer \$P(A \\cup B)\$.",
              1,
              _sol([
                _step(
                  "**Formule d'inclusion-exclusion** : \$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0{,}4 + 0{,}3 - 0{,}12 = 0{,}58\$.",
                ),
              ], finalAnswerFr: r"$P(A \cup B) = 0{,}58$"),
            ),
            _q(
              3,
              "Calculer \$P(\\bar{A} \\cap B)\$ et \$P(A | B)\$.",
              2,
              _sol([
                _step(
                  "\$\\bar{A} \\cap B\$ : événement '\$B\$ se produit mais pas \$A\$'. \$P(\\bar{A} \\cap B) = P(B) - P(A \\cap B) = 0{,}3 - 0{,}12 = 0{,}18\$.",
                ),
                _step(
                  "\$P(A | B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}12}{0{,}3} = 0{,}4 = P(A)\$.",
                ),
                _step(
                  "Conséquence de l'indépendance : \$P(A | B) = P(A)\$ — la connaissance de \$B\$ ne change pas la probabilité de \$A\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$P(\bar{A} \cap B) = 0{,}18$, $P(A|B) = 0{,}4$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDivisibility() => _paper(
      titleFr: 'Épreuve type — Arithmétique et divisibilité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Division euclidienne, congruences, PGCD, algorithme d'Euclide, théorème de Bézout. Outils centraux de l'arithmétique dans \$\\mathbb{Z}\$.",
      exercices: [
        _ex(
          1,
          'Division euclidienne',
          4,
          "Rappel : pour \$a \\in \\mathbb{Z}\$ et \$b \\in \\mathbb{N}^*\$, il existe un unique couple \$(q, r)\$ avec \$a = bq + r\$ et \$0 \\le r < b\$.",
          [
            _q(
              1,
              "Effectuer la division euclidienne de \$157\$ par \$11\$.",
              1,
              _sol([
                _step(
                  "On cherche \$q\$ tel que \$11q \\le 157 < 11(q+1)\$. Essai : \$11 \\times 14 = 154 \\le 157\$ ; \$11 \\times 15 = 165 > 157\$. Donc \$q = 14\$.",
                ),
                _step(
                  "Reste : \$r = 157 - 154 = 3\$. Vérification : \$0 \\le 3 < 11\$ ✓.",
                ),
                _step(
                  "Conclusion : \$157 = 11 \\times 14 + 3\$.",
                ),
              ], finalAnswerFr: r"$q = 14$, $r = 3$"),
            ),
            _q(
              2,
              "Donner le reste de \$2^{100}\$ modulo 7.",
              3,
              _sol([
                _step(
                  "Stratégie : calculer les petites puissances de 2 modulo 7 pour trouver un cycle. \$2^1 \\equiv 2\$, \$2^2 \\equiv 4\$, \$2^3 \\equiv 1\$ (car \$8 = 7 + 1\$).",
                ),
                _step(
                  "**Cycle de longueur 3** : \$2^{3k} \\equiv 1\$, \$2^{3k+1} \\equiv 2\$, \$2^{3k+2} \\equiv 4 \\pmod{7}\$.",
                ),
                _step(
                  "On divise \$100 = 3 \\times 33 + 1\$. Donc \$2^{100} = 2^{3 \\cdot 33 + 1} = (2^3)^{33} \\cdot 2^1 \\equiv 1^{33} \\cdot 2 \\equiv 2 \\pmod{7}\$.",
                  tipFr:
                      "Pour calculer une grande puissance modulo \$n\$ : chercher le **cycle** des puissances modulo \$n\$.",
                ),
              ], finalAnswerFr: r"$2^{100} \equiv 2 \pmod{7}$"),
            ),
          ],
        ),
        _ex(
          2,
          'PGCD et algorithme d\'Euclide',
          5,
          "On veut calculer \$\\gcd(252, 198)\$.",
          [
            _q(
              1,
              "Appliquer l'algorithme d'Euclide.",
              3,
              _sol([
                _step(
                  "**Algorithme d'Euclide** : \$\\gcd(a, b) = \\gcd(b, r)\$ où \$r\$ est le reste de la division de \$a\$ par \$b\$. On répète jusqu'à obtenir reste 0.",
                ),
                _step(
                  "\$252 = 198 \\times 1 + 54\$ → \$\\gcd(252, 198) = \\gcd(198, 54)\$.",
                ),
                _step(
                  "\$198 = 54 \\times 3 + 36\$ → \$\\gcd(198, 54) = \\gcd(54, 36)\$.",
                ),
                _step(
                  "\$54 = 36 \\times 1 + 18\$ → \$\\gcd(54, 36) = \\gcd(36, 18)\$.",
                ),
                _step(
                  "\$36 = 18 \\times 2 + 0\$ → \$\\gcd(36, 18) = 18\$.",
                ),
                _step(
                  "Conclusion : \$\\gcd(252, 198) = 18\$.",
                ),
              ], finalAnswerFr: r"$\gcd(252, 198) = 18$"),
            ),
            _q(
              2,
              "En déduire deux entiers \$u, v\$ tels que \$252 u + 198 v = 18\$ (identité de Bézout).",
              2,
              _sol([
                _step(
                  "**Remontée de l'algorithme** : on exprime chaque reste comme combinaison linéaire de 252 et 198.",
                ),
                _step(
                  "\$18 = 54 - 36 \\times 1 = 54 - (198 - 54 \\times 3) = 54 \\times 4 - 198\$.",
                ),
                _step(
                  "Or \$54 = 252 - 198\$. Substitution : \$18 = (252 - 198) \\times 4 - 198 = 252 \\times 4 - 198 \\times 4 - 198 = 252 \\times 4 - 198 \\times 5\$.",
                ),
                _step(
                  "Donc \$(u, v) = (4, -5)\$. Vérification : \$252 \\times 4 - 198 \\times 5 = 1008 - 990 = 18\$ ✓.",
                  tipFr:
                      "Le théorème de Bézout dit : \$\\gcd(a, b) = d \\iff \\exists u, v \\in \\mathbb{Z} : au + bv = d\$.",
                ),
              ], finalAnswerFr: r"$(u, v) = (4, -5)$"),
            ),
          ],
        ),
        _ex(
          3,
          'Nombres premiers et critères de divisibilité',
          5,
          "Soit \$n\$ un entier naturel.",
          [
            _q(
              1,
              "Démontrer que si \$n\$ est impair, alors \$n^2 + 1\$ est pair.",
              2,
              _sol([
                _step(
                  "\$n\$ impair signifie \$n = 2k + 1\$ pour un certain \$k \\in \\mathbb{N}\$.",
                ),
                _step(
                  "\$n^2 + 1 = (2k+1)^2 + 1 = 4k^2 + 4k + 1 + 1 = 4k^2 + 4k + 2 = 2(2k^2 + 2k + 1)\$.",
                ),
                _step(
                  "Comme \$2k^2 + 2k + 1 \\in \\mathbb{N}\$, \$n^2 + 1\$ est un multiple de 2, donc **pair**.",
                ),
              ]),
            ),
            _q(
              2,
              "Démontrer que pour tout entier \$n\$, \$n^3 - n\$ est divisible par 6.",
              3,
              _sol([
                _step(
                  "Factorisation : \$n^3 - n = n(n^2 - 1) = n(n-1)(n+1)\$.",
                ),
                _step(
                  "C'est le **produit de 3 entiers consécutifs** \$n-1, n, n+1\$.",
                ),
                _step(
                  "**Divisibilité par 2** : parmi 3 entiers consécutifs, au moins un est pair. Donc le produit est divisible par 2.",
                ),
                _step(
                  "**Divisibilité par 3** : parmi 3 entiers consécutifs, exactement un est divisible par 3. Donc le produit est divisible par 3.",
                ),
                _step(
                  "Comme 2 et 3 sont premiers entre eux, le produit est divisible par \$2 \\times 3 = 6\$.",
                  tipFr:
                      "Pour montrer la divisibilité par \$pq\$ avec \$p, q\$ premiers entre eux : il suffit de montrer divisibilité par \$p\$ et par \$q\$ séparément.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Congruences et résolution d\'équations',
          6,
          "On cherche les solutions entières de l'équation \$5x \\equiv 3 \\pmod{11}\$.",
          [
            _q(
              1,
              "Trouver l'inverse de 5 modulo 11.",
              3,
              _sol([
                _step(
                  "On cherche \$y\$ tel que \$5y \\equiv 1 \\pmod{11}\$. Tester : \$5 \\times 1 = 5\$, \$5 \\times 2 = 10\$, \$5 \\times 3 = 15 \\equiv 4\$, ..., \$5 \\times 9 = 45 = 44 + 1 \\equiv 1 \\pmod{11}\$.",
                ),
                _step(
                  "Donc \$5^{-1} \\equiv 9 \\pmod{11}\$.",
                  tipFr:
                      "Un entier \$a\$ admet un inverse modulo \$n\$ ssi \$\\gcd(a, n) = 1\$. Ici \$\\gcd(5, 11) = 1\$ ✓.",
                ),
              ], finalAnswerFr: r"$5^{-1} \equiv 9 \pmod{11}$"),
            ),
            _q(
              2,
              "En déduire toutes les solutions de \$5x \\equiv 3 \\pmod{11}\$.",
              3,
              _sol([
                _step(
                  "On multiplie les deux membres par \$9 = 5^{-1}\$ : \$9 \\cdot 5x \\equiv 9 \\cdot 3 \\pmod{11}\$.",
                ),
                _step(
                  "\$9 \\cdot 5 = 45 \\equiv 1 \\pmod{11}\$. \$9 \\cdot 3 = 27 = 22 + 5 \\equiv 5 \\pmod{11}\$.",
                ),
                _step(
                  "Donc \$x \\equiv 5 \\pmod{11}\$. Solutions : \$x \\in \\{\\ldots, -6, 5, 16, 27, \\ldots\\}\$, soit \$x = 5 + 11k\$ pour \$k \\in \\mathbb{Z}\$.",
                ),
                _step(
                  "Vérification : \$5 \\cdot 5 = 25 = 22 + 3 \\equiv 3 \\pmod{11}\$ ✓.",
                ),
              ], finalAnswerFr: r"$x \equiv 5 \pmod{11}$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperNewtonLaws() => _paper(
      titleFr: 'Épreuve type — Mécanique de Newton',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Les trois lois de Newton, application aux objets en équilibre, mouvement rectiligne uniformément varié, frottements. **Méthode** : système → bilan des forces → projection sur axes → équations du mouvement.",
      exercices: [
        _ex(
          1,
          'Bilan des forces et équilibre',
          5,
          "Un livre de masse \$m = 0{,}5\$ kg est posé sur une table horizontale. On prend \$g = 9{,}8\$ m/s².",
          [
            _q(
              1,
              "Faire le bilan des forces s'exerçant sur le livre.",
              2,
              _sol([
                _step(
                  "**Système** : le livre. Référentiel : terrestre (supposé galiléen).",
                ),
                _step(
                  "**Forces** : (1) le **poids** \$\\vec{P}\$, vertical vers le bas, de norme \$P = mg = 0{,}5 \\times 9{,}8 = 4{,}9\$ N. (2) La **réaction normale** \$\\vec{R}\$ de la table, verticale vers le haut.",
                  tipFr:
                      "Bilan : toujours commencer par identifier les contacts (table → réaction) et l'action à distance (Terre → poids).",
                ),
              ]),
            ),
            _q(
              2,
              "Le livre étant au repos, déterminer la norme de \$\\vec{R}\$.",
              2,
              _sol([
                _step(
                  "**1ère loi de Newton (inertie)** : à l'équilibre, \$\\sum \\vec{F} = \\vec{0}\$.",
                ),
                _step(
                  "Projection sur l'axe vertical : \$R - P = 0\$, donc \$R = P = 4{,}9\$ N.",
                ),
                _step(
                  "**Remarque** : \$\\vec{R}\$ et \$\\vec{P}\$ ne sont PAS un couple action/réaction (3ème loi). Ils s'exercent sur le même corps (le livre). Le couple action/réaction relie le poids du livre (livre → Terre) et le poids de la Terre (Terre → livre).",
                  mistakeFr:
                          "Confondre la 1ère loi (équilibre du livre = forces appliquées qui se compensent) avec la 3ème loi (action/réaction = forces réciproques entre 2 corps).",
                ),
              ], finalAnswerFr: r"$R = 4{,}9$ N"),
            ),
            _q(
              3,
              "On pose un second livre identique sur le premier. Déterminer la nouvelle réaction de la table.",
              1,
              _sol([
                _step(
                  "La table supporte maintenant 2 livres de masse totale \$2m = 1\$ kg.",
                ),
                _step(
                  "Pour l'équilibre du système {2 livres} : \$R' = 2mg = 9{,}8\$ N.",
                ),
              ], finalAnswerFr: r"$R' = 9{,}8$ N"),
            ),
          ],
        ),
        _ex(
          2,
          'Plan incliné sans frottement',
          5,
          "Un objet de masse \$m = 2\$ kg glisse sans frottement sur un plan incliné d'angle \$\\alpha = 30°\$ avec l'horizontale. On prend \$g = 10\$ m/s².",
          [
            _q(
              1,
              "Faire le bilan des forces. Projeter dans le repère (Ox parallèle au plan, descendant ; Oy perpendiculaire au plan).",
              3,
              _sol([
                _step(
                  "Forces : poids \$\\vec{P}\$ (vertical, vers le bas) et réaction normale \$\\vec{R}\$ (perpendiculaire au plan, sortante).",
                ),
                _step(
                  "**Projection du poids** : \$P_x = mg\\sin\\alpha\$ (descendant le plan), \$P_y = -mg\\cos\\alpha\$ (vers le plan).",
                ),
                _step(
                  "Réaction \$\\vec{R} = (0, R)\$ (uniquement selon Oy).",
                  tipFr:
                      "Sur un plan incliné : décomposer le poids en composante parallèle (\$mg\\sin\\alpha\$, fait glisser) et perpendiculaire (\$mg\\cos\\alpha\$, équilibrée par R).",
                ),
              ],
                  finalAnswerFr:
                      r"$P_x = mg\sin\alpha$, $P_y = -mg\cos\alpha$"),
            ),
            _q(
              2,
              "Déterminer l'accélération \$a\$ de l'objet le long du plan.",
              2,
              _sol([
                _step(
                  "**2ème loi de Newton** : \$\\sum \\vec{F} = m\\vec{a}\$.",
                ),
                _step(
                  "Projection sur Ox : \$mg\\sin\\alpha = ma\$, donc \$a = g\\sin\\alpha = 10 \\times 0{,}5 = 5\$ m/s².",
                ),
                _step(
                  "Projection sur Oy : \$R - mg\\cos\\alpha = 0\$, donc \$R = mg\\cos\\alpha = 2 \\times 10 \\times \\sqrt{3}/2 = 10\\sqrt{3} \\approx 17{,}3\$ N.",
                  tipFr:
                      "Astuce : l'accélération sur plan incliné sans frottement ne dépend PAS de la masse — \$a = g\\sin\\alpha\$ seulement.",
                ),
              ], finalAnswerFr: r"$a = 5$ m/s², $R \approx 17{,}3$ N"),
            ),
          ],
        ),
        _ex(
          3,
          'Mouvement rectiligne uniformément varié',
          5,
          "Une voiture part du repos et atteint 25 m/s en 10 secondes avec accélération constante.",
          [
            _q(
              1,
              "Calculer l'accélération et la distance parcourue.",
              3,
              _sol([
                _step(
                  "**MRUA** : \$v(t) = v_0 + at\$ et \$x(t) = x_0 + v_0 t + \\frac{1}{2} at^2\$.",
                ),
                _step(
                  "Avec \$v_0 = 0\$ et \$v(10) = 25\$ m/s : \$a = (v - v_0)/t = 25/10 = 2{,}5\$ m/s².",
                ),
                _step(
                  "Distance : \$x = \\frac{1}{2} a t^2 = 0{,}5 \\times 2{,}5 \\times 100 = 125\$ m.",
                  tipFr:
                      "Vérification : la vitesse moyenne d'un MRUA partant du repos est \$v_\\text{moy} = (0 + v_f)/2 = 12{,}5\$ m/s. Distance = 12,5 × 10 = 125 m ✓.",
                ),
              ], finalAnswerFr: r"$a = 2{,}5$ m/s², $d = 125$ m"),
            ),
            _q(
              2,
              "La voiture freine ensuite à accélération constante \$a_2 = -5\$ m/s². Combien de temps faut-il pour s'arrêter ? Quelle distance parcourt-elle pendant le freinage ?",
              2,
              _sol([
                _step(
                  "Au début du freinage : \$v_0 = 25\$ m/s. À l'arrêt : \$v = 0\$.",
                ),
                _step(
                  "Temps : \$0 = 25 + (-5) t \\iff t = 5\$ s.",
                ),
                _step(
                  "Distance : \$x = 25 \\times 5 + \\frac{1}{2}(-5)(25) = 125 - 62{,}5 = 62{,}5\$ m.",
                  tipFr:
                      "Formule sans temps : \$v^2 - v_0^2 = 2a(x - x_0)\$. Application : \$0 - 625 = 2(-5)x \\Rightarrow x = 62{,}5\$ m ✓.",
                ),
              ], finalAnswerFr: r"$t = 5$ s, $d_{\text{frein}} = 62{,}5$ m"),
            ),
          ],
        ),
        _ex(
          4,
          'Action — réaction',
          5,
          "Deux blocs \$A\$ (masse \$m_A = 3\$ kg) et \$B\$ (\$m_B = 2\$ kg) sont en contact sur un sol horizontal sans frottement. On applique une force horizontale \$\\vec{F}\$ sur \$A\$ de norme \$F = 20\$ N (pousse vers \$B\$).",
          [
            _q(
              1,
              "Déterminer l'accélération commune des deux blocs.",
              2,
              _sol([
                _step(
                  "On considère le système {A + B} (masse totale \$M = 5\$ kg). Seule force horizontale : \$\\vec{F}\$.",
                ),
                _step(
                  "**2ème loi de Newton** : \$F = M a \\iff a = F/M = 20/5 = 4\$ m/s².",
                ),
              ], finalAnswerFr: r"$a = 4$ m/s²"),
            ),
            _q(
              2,
              "Déterminer la force exercée par \$A\$ sur \$B\$ (notée \$\\vec{F}_{A/B}\$).",
              3,
              _sol([
                _step(
                  "**Isoler le bloc \$B\$**. Forces sur \$B\$ : son poids, la réaction du sol (s'annulent verticalement), et \$\\vec{F}_{A/B}\$ (horizontale).",
                ),
                _step(
                  "2ème loi sur \$B\$ : \$F_{A/B} = m_B \\cdot a = 2 \\times 4 = 8\$ N.",
                ),
                _step(
                  "**3ème loi (action/réaction)** : \$B\$ exerce sur \$A\$ une force \$\\vec{F}_{B/A} = -\\vec{F}_{A/B}\$, de même norme 8 N, opposée.",
                ),
                _step(
                  "**Vérification sur \$A\$** : forces horizontales : \$F\$ et \$F_{B/A}\$ (opposée). Équation : \$F - F_{B/A} = m_A a\$, soit \$20 - 8 = 3 \\times 4 = 12\$ ✓.",
                  tipFr:
                      "La force interne entre deux blocs en contact est toujours plus petite que la force externe — cohérent avec le partage de l'accélération.",
                ),
              ], finalAnswerFr: r"$F_{A/B} = 8$ N"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRcChargeDischarge() => _paper(
      titleFr: 'Épreuve type — Circuit RC',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Charge et décharge d'un condensateur dans un circuit RC. Équation différentielle, constante de temps \$\\tau = RC\$, énergie stockée \$E_C = \\frac{1}{2}Cu^2\$.",
      exercices: [
        _ex(
          1,
          'Charge d\'un condensateur',
          5,
          "Un condensateur de capacité \$C = 100\\,\\mu F\$ est chargé à travers une résistance \$R = 10\\,k\\Omega\$ par un générateur de tension \$E = 12\\,V\$. À \$t = 0\$, le condensateur est déchargé (\$u_C(0) = 0\$).",
          [
            _q(
              1,
              "Établir l'équation différentielle vérifiée par \$u_C(t)\$.",
              2,
              _sol([
                _step(
                  "**Loi des mailles** : \$E = u_R + u_C\$ où \$u_R = R i\$. Or pour un condensateur \$i = C \\dfrac{du_C}{dt}\$.",
                ),
                _step(
                  "Substitution : \$E = RC \\dfrac{du_C}{dt} + u_C\$, soit \$RC \\dfrac{du_C}{dt} + u_C = E\$, ou encore \$\\tau \\dfrac{du_C}{dt} + u_C = E\$ avec \$\\tau = RC\$.",
                  tipFr:
                      "C'est une EDO d'ordre 1 du type \$\\tau y' + y = b\$ avec solution \$y = b + Ae^{-t/\\tau}\$.",
                ),
              ], finalAnswerFr: r"$\tau \dfrac{du_C}{dt} + u_C = E$"),
            ),
            _q(
              2,
              "Résoudre l'équation pour \$t \\ge 0\$ avec la condition initiale \$u_C(0) = 0\$.",
              3,
              _sol([
                _step(
                  "**Solution générale** : \$u_C(t) = E + A e^{-t/\\tau}\$ (solution particulière constante \$E\$ + solution homogène \$A e^{-t/\\tau}\$).",
                ),
                _step(
                  "**Condition initiale** : \$u_C(0) = E + A = 0 \\Rightarrow A = -E\$.",
                ),
                _step(
                  "Solution : \$u_C(t) = E(1 - e^{-t/\\tau})\$ avec \$\\tau = RC = 10^4 \\times 10^{-4} = 1\\,s\$.",
                ),
                _step(
                  "**Comportement** : à \$t = \\tau\$, \$u_C = E(1 - e^{-1}) \\approx 0{,}63 E \\approx 7{,}56\\,V\$. À \$t = 5\\tau\$, \$u_C \\approx 0{,}993 E \\approx 11{,}9\\,V\$ (régime établi).",
                  tipFr:
                      "Après \$5\\tau\$, on considère le condensateur chargé à 99% — c'est le critère pratique du régime permanent.",
                ),
              ], finalAnswerFr: r"$u_C(t) = E(1 - e^{-t/\tau})$, $\tau = 1$ s"),
            ),
          ],
        ),
        _ex(
          2,
          'Énergie stockée et puissance dissipée',
          5,
          "On reprend le circuit de l'Exercice 1. Étude énergétique au régime permanent.",
          [
            _q(
              1,
              "Calculer l'énergie stockée par le condensateur quand il est complètement chargé.",
              2,
              _sol([
                _step(
                  "**Énergie d'un condensateur** : \$E_C = \\dfrac{1}{2} C u_C^2\$.",
                ),
                _step(
                  "Au régime permanent, \$u_C = E = 12\\,V\$. Donc \$E_C = 0{,}5 \\times 100 \\times 10^{-6} \\times 144 = 7{,}2 \\times 10^{-3}\\,J = 7{,}2\\,mJ\$.",
                ),
              ], finalAnswerFr: r"$E_C = 7{,}2$ mJ"),
            ),
            _q(
              2,
              "Calculer l'énergie totale fournie par le générateur durant la charge.",
              2,
              _sol([
                _step(
                  "Énergie fournie : \$E_{\\text{géné}} = \\int_0^\\infty E \\cdot i(t)\\,dt = E \\cdot Q\$ où \$Q = C E\$ est la charge totale stockée.",
                ),
                _step(
                  "\$Q = C E = 100 \\times 10^{-6} \\times 12 = 1{,}2 \\times 10^{-3}\\,C\$.",
                ),
                _step(
                  "\$E_{\\text{géné}} = E \\cdot Q = 12 \\times 1{,}2 \\times 10^{-3} = 14{,}4 \\times 10^{-3}\\,J = 14{,}4\\,mJ\$.",
                ),
              ], finalAnswerFr: r"$E_{\text{géné}} = 14{,}4$ mJ"),
            ),
            _q(
              3,
              "En déduire l'énergie dissipée par effet Joule dans la résistance.",
              1,
              _sol([
                _step(
                  "**Conservation de l'énergie** : \$E_{\\text{géné}} = E_C + E_{\\text{Joule}}\$.",
                ),
                _step(
                  "\$E_{\\text{Joule}} = 14{,}4 - 7{,}2 = 7{,}2\\,mJ\$. **La moitié de l'énergie est dissipée**, indépendamment de R — résultat universel pour une charge RC.",
                  tipFr:
                      "Le rendement énergétique d'une charge RC est exactement 50%. Pour améliorer, charger par paliers (Coulomb counter).",
                ),
              ], finalAnswerFr: r"$E_J = 7{,}2$ mJ (50%)"),
            ),
          ],
        ),
        _ex(
          3,
          'Décharge du condensateur',
          5,
          "Le condensateur est maintenant chargé à \$u_0 = 12\\,V\$. À \$t = 0\$, on le déconnecte du générateur et on le branche aux bornes d'une résistance \$R' = 5\\,k\\Omega\$.",
          [
            _q(
              1,
              "Établir l'équation différentielle de la décharge.",
              2,
              _sol([
                _step(
                  "Loi des mailles dans le circuit fermé \$\\{C, R'\\}\$ : \$u_C + u_{R'} = 0\$ (pas de générateur). Or \$u_{R'} = R' i\$ et \$i = -C \\dfrac{du_C}{dt}\$ (le courant sort du condensateur, signe négatif).",
                ),
                _step(
                  "Donc \$u_C - R' C \\dfrac{du_C}{dt} = 0\$, soit \$\\dfrac{du_C}{dt} = \\dfrac{u_C}{R'C} = \\dfrac{u_C}{\\tau'}\$ — non, attention au signe.",
                ),
                _step(
                  "Reprenons proprement : \$u_C + R' i = 0\$ avec \$i = C\\dfrac{du_C}{dt}\$ donne \$u_C + R'C\\dfrac{du_C}{dt} = 0\$, soit \$\\tau' \\dfrac{du_C}{dt} + u_C = 0\$ avec \$\\tau' = R'C\$.",
                ),
              ], finalAnswerFr: r"$\tau' \dfrac{du_C}{dt} + u_C = 0$"),
            ),
            _q(
              2,
              "Résoudre et tracer l'allure de \$u_C(t)\$.",
              3,
              _sol([
                _step(
                  "**Solution générale** : \$u_C(t) = A e^{-t/\\tau'}\$. **Condition initiale** : \$u_C(0) = A = u_0 = 12\\,V\$.",
                ),
                _step(
                  "Donc \$u_C(t) = 12 e^{-t/\\tau'}\$ avec \$\\tau' = R'C = 5 \\times 10^3 \\times 100 \\times 10^{-6} = 0{,}5\\,s\$.",
                ),
                _step(
                  "**Décroissance exponentielle** vers 0. À \$t = \\tau'\$ : \$u_C \\approx 0{,}37 u_0 \\approx 4{,}4\\,V\$. À \$t = 5\\tau' = 2{,}5\\,s\$ : \$u_C \\approx 0\$.",
                  widgetSlug: 'capacitor_charge',
                  widgetConfig: {'R': 5000, 'C': 100e-6, 'E': 12, 'mode': 'discharge'},
                  tipFr:
                      "\$\\tau\$ plus petit (R plus petit) = décharge plus rapide. Avec R = 0 (court-circuit), \$\\tau = 0\$ et décharge instantanée.",
                ),
              ], finalAnswerFr: r"$u_C(t) = 12 e^{-2t}$ V"),
            ),
          ],
        ),
        _ex(
          4,
          'Mesure expérimentale de C',
          5,
          "Lors d'une décharge, on observe que \$u_C\$ passe de 10 V à 5 V en 0,5 seconde dans un circuit avec \$R = 5\\,k\\Omega\$. Déterminer \$C\$.",
          [
            _q(
              1,
              "Établir une relation entre \$u_C(t_1), u_C(t_2)\$ et \$\\tau\$.",
              2,
              _sol([
                _step(
                  "\$u_C(t) = u_0 e^{-t/\\tau}\$. Le ratio entre deux instants : \$\\dfrac{u_C(t_2)}{u_C(t_1)} = e^{-(t_2 - t_1)/\\tau}\$.",
                ),
                _step(
                  "Application : \$\\dfrac{5}{10} = e^{-0{,}5/\\tau}\$, soit \$e^{-0{,}5/\\tau} = 0{,}5\$.",
                ),
              ], finalAnswerFr: r"$e^{-0{,}5/\tau} = 0{,}5$"),
            ),
            _q(
              2,
              "En déduire \$\\tau\$ puis \$C\$.",
              3,
              _sol([
                _step(
                  "On applique \$\\ln\$ : \$-0{,}5/\\tau = \\ln(0{,}5) = -\\ln(2)\$, soit \$\\tau = 0{,}5/\\ln(2) \\approx 0{,}721\\,s\$.",
                ),
                _step(
                  "**Note** : 0,5 s est exactement la **demi-vie de décharge** \$t_{1/2} = \\tau \\ln(2)\$ — relation directe.",
                ),
                _step(
                  "\$C = \\tau/R = 0{,}721/5000 \\approx 1{,}44 \\times 10^{-4}\\,F = 144\\,\\mu F\$.",
                  tipFr:
                      "Méthode standard de mesure : mesurer \$t_{1/2}\$ (souvent plus précis qu'une mesure à \$t = \\tau\$). Formule : \$\\tau = t_{1/2}/\\ln(2)\$.",
                ),
              ], finalAnswerFr: r"$C \approx 144$ μF"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRlEstablishment() => _paper(
      titleFr: 'Épreuve type — Circuit RL',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Établissement et rupture du courant dans un circuit RL. EDO \$\\tau \\dfrac{di}{dt} + i = E/R\$ avec \$\\tau = L/R\$. Énergie magnétique \$E_L = \\frac{1}{2}Li^2\$.",
      exercices: [
        _ex(
          1,
          'Établissement du courant',
          5,
          "Un circuit série comporte un générateur \$E = 12\\,V\$, une bobine d'inductance \$L = 0{,}5\\,H\$ (résistance interne nulle), et une résistance \$R = 10\\,\\Omega\$. À \$t = 0\$, on ferme l'interrupteur.",
          [
            _q(
              1,
              "Établir l'équation différentielle vérifiée par \$i(t)\$.",
              2,
              _sol([
                _step(
                  "**Loi des mailles** : \$E = u_R + u_L = R i + L \\dfrac{di}{dt}\$.",
                ),
                _step(
                  "Réécriture : \$\\dfrac{L}{R} \\dfrac{di}{dt} + i = \\dfrac{E}{R}\$, soit \$\\tau \\dfrac{di}{dt} + i = I_{\\max}\$ avec \$\\tau = L/R\$ et \$I_{\\max} = E/R\$.",
                  tipFr:
                      "Forme \$\\tau y' + y = b\$ : équation classique d'EDO d'ordre 1 avec second membre constant.",
                ),
              ],
                  finalAnswerFr:
                      r"$\tau \dfrac{di}{dt} + i = I_{\max}$, $\tau = L/R$"),
            ),
            _q(
              2,
              "Résoudre avec \$i(0) = 0\$ et préciser \$\\tau\$ et \$I_{\\max}\$.",
              3,
              _sol([
                _step(
                  "\$\\tau = L/R = 0{,}5/10 = 0{,}05\\,s = 50\\,ms\$. \$I_{\\max} = E/R = 12/10 = 1{,}2\\,A\$.",
                ),
                _step(
                  "Solution générale : \$i(t) = I_{\\max} + A e^{-t/\\tau}\$. CI : \$i(0) = I_{\\max} + A = 0 \\Rightarrow A = -I_{\\max}\$.",
                ),
                _step(
                  "Solution : \$i(t) = I_{\\max}(1 - e^{-t/\\tau}) = 1{,}2 (1 - e^{-20t})\$.",
                ),
                _step(
                  "**Comportement** : la bobine **s'oppose à la variation** brusque du courant (loi de Lenz). Le courant monte progressivement de 0 à \$I_{\\max}\$ avec constante de temps \$\\tau\$.",
                  mistakeFr:
                      "Ne pas confondre \$\\tau = L/R\$ (RL) avec \$\\tau = RC\$ (RC) — les rôles de R sont opposés : R petit allonge \$\\tau_{RL}\$ mais raccourcit \$\\tau_{RC}\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$i(t) = 1{,}2(1 - e^{-20t})$ A"),
            ),
          ],
        ),
        _ex(
          2,
          'Énergie magnétique',
          5,
          "Au régime permanent du circuit de l'Exercice 1.",
          [
            _q(
              1,
              "Calculer l'énergie magnétique stockée dans la bobine.",
              2,
              _sol([
                _step(
                  "**Énergie d'une bobine** : \$E_L = \\dfrac{1}{2} L i^2\$.",
                ),
                _step(
                  "Au régime permanent : \$i = I_{\\max} = 1{,}2\\,A\$. \$E_L = 0{,}5 \\times 0{,}5 \\times 1{,}44 = 0{,}36\\,J\$.",
                  tipFr:
                      "Analogie mécanique : \$E_L\$ joue le rôle de l'énergie cinétique \$\\frac{1}{2}mv^2\$, le courant = vitesse, l'inductance = masse.",
                ),
              ], finalAnswerFr: r"$E_L = 0{,}36$ J"),
            ),
            _q(
              2,
              "Si on ouvre soudainement le circuit alors que \$i = I_{\\max}\$, que se passe-t-il ?",
              3,
              _sol([
                _step(
                  "La bobine s'oppose à la variation brusque (de \$I_{\\max}\$ à 0). Elle développe une **tension induite** très élevée (\$u_L = L\\,di/dt\$, où \$di/dt\$ est très grand en valeur absolue) pour tenter de maintenir le courant.",
                ),
                _step(
                  "Cette surtension peut produire une **étincelle** aux contacts de l'interrupteur — phénomène utilisé dans les bobines d'allumage automobile.",
                ),
                _step(
                  "L'énergie magnétique stockée \$E_L = 0{,}36\\,J\$ se dissipe alors dans l'air (étincelle) ou dans un éventuel circuit de protection (diode 'roue libre' en parallèle).",
                  tipFr:
                      "Pour éviter les étincelles : monter une diode anti-retour en parallèle inverse de la bobine. L'énergie se dissipe alors lentement dans la diode.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Allure des tensions',
          5,
          "On reprend le circuit. On enregistre \$u_R(t)\$ et \$u_L(t)\$ pendant l'établissement.",
          [
            _q(
              1,
              "Exprimer \$u_R(t)\$ et \$u_L(t)\$ en fonction de \$t\$.",
              3,
              _sol([
                _step(
                  "\$u_R = R i(t) = R I_{\\max}(1 - e^{-t/\\tau}) = E(1 - e^{-t/\\tau})\$ (car \$R I_{\\max} = E\$).",
                ),
                _step(
                  "\$u_L = L \\dfrac{di}{dt} = L \\cdot I_{\\max} \\cdot \\dfrac{1}{\\tau} e^{-t/\\tau} = E e^{-t/\\tau}\$ (puisque \$L I_{\\max}/\\tau = L \\cdot (E/R) / (L/R) = E\$).",
                ),
                _step(
                  "**Vérification** : \$u_R + u_L = E(1 - e^{-t/\\tau}) + E e^{-t/\\tau} = E\$ ✓ (loi des mailles).",
                ),
              ],
                  finalAnswerFr:
                      r"$u_R = E(1 - e^{-t/\tau})$, $u_L = E e^{-t/\tau}$"),
            ),
            _q(
              2,
              "Décrire qualitativement les courbes.",
              2,
              _sol([
                _step(
                  "**\$u_R(t)\$** : démarre à 0, monte exponentiellement vers \$E\$. Image de l'établissement progressif du courant.",
                ),
                _step(
                  "**\$u_L(t)\$** : démarre à \$E\$, décroît exponentiellement vers 0. La bobine reçoit toute la tension au début (s'oppose à \$di/dt\$), puis devient un court-circuit au régime permanent (\$di/dt \\to 0\$).",
                ),
                _step(
                  "**Symétrie** : la somme \$u_R + u_L = E\$ partout (loi des mailles). Les deux courbes sont symétriques par rapport à \$E/2\$ — l'une monte de 0 vers E, l'autre descend de E vers 0.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Mesure expérimentale de L',
          5,
          "Sur un circuit RL inconnu (R = 50 Ω), on mesure le temps nécessaire pour que \$i\$ atteigne 63% de sa valeur finale : 4 ms.",
          [
            _q(
              1,
              "Déterminer \$\\tau\$ et en déduire \$L\$.",
              3,
              _sol([
                _step(
                  "À \$t = \\tau\$, \$i(\\tau) = I_{\\max}(1 - e^{-1}) \\approx 0{,}632 I_{\\max}\$. C'est précisément l'instant où \$i\$ atteint 63% de \$I_{\\max}\$.",
                ),
                _step(
                  "Donc \$\\tau = 4\\,ms = 4 \\times 10^{-3}\\,s\$.",
                ),
                _step(
                  "\$\\tau = L/R \\Rightarrow L = \\tau R = 4 \\times 10^{-3} \\times 50 = 0{,}2\\,H = 200\\,mH\$.",
                  tipFr:
                      "Cette méthode est précise et largement utilisée en travaux pratiques — pas besoin d'oscilloscope sophistiqué, juste un chrono.",
                ),
              ], finalAnswerFr: r"$\tau = 4$ ms, $L = 200$ mH"),
            ),
            _q(
              2,
              "Calculer l'énergie magnétique stockée si \$I_{\\max} = 0{,}5\\,A\$.",
              2,
              _sol([
                _step(
                  "\$E_L = \\dfrac{1}{2} L I^2 = 0{,}5 \\times 0{,}2 \\times 0{,}25 = 0{,}025\\,J = 25\\,mJ\$.",
                ),
              ], finalAnswerFr: r"$E_L = 25$ mJ"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperRlcRegimes() => _paper(
      titleFr: 'Épreuve type — Oscillations libres RLC',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Circuit RLC série en régime libre. Trois régimes selon le discriminant : pseudo-périodique, critique, apériodique. Pulsation propre \$\\omega_0 = 1/\\sqrt{LC}\$.",
      exercices: [
        _ex(
          1,
          'Pulsation propre et période',
          4,
          "Un circuit LC idéal (sans résistance) a \$L = 0{,}1\\,H\$ et \$C = 10\\,\\mu F\$.",
          [
            _q(
              1,
              "Calculer la pulsation propre \$\\omega_0\$ et la période propre \$T_0\$.",
              2,
              _sol([
                _step(
                  "**Pulsation propre** : \$\\omega_0 = \\dfrac{1}{\\sqrt{LC}}\$.",
                ),
                _step(
                  "Application : \$LC = 0{,}1 \\times 10^{-5} = 10^{-6}\$. \$\\sqrt{LC} = 10^{-3}\$. Donc \$\\omega_0 = 10^3 = 1000\\,rad/s\$.",
                ),
                _step(
                  "Période : \$T_0 = 2\\pi/\\omega_0 \\approx 6{,}28\\,ms\$. Fréquence \$f_0 = 1/T_0 \\approx 159\\,Hz\$.",
                  tipFr:
                      "Pour multiplier \$\\omega_0\$ par 10 : diviser \$LC\$ par 100 (\$L\$ par 10 et \$C\$ par 10, par ex.).",
                ),
              ],
                  finalAnswerFr:
                      r"$\omega_0 = 1000$ rad/s, $T_0 \approx 6{,}28$ ms"),
            ),
            _q(
              2,
              "Si on double \$L\$ tout en gardant \$C\$, comment varie \$T_0\$ ?",
              2,
              _sol([
                _step(
                  "\$T_0 = 2\\pi\\sqrt{LC}\$ — proportionnelle à \$\\sqrt{LC}\$.",
                ),
                _step(
                  "Doubler \$L\$ → multiplier \$T_0\$ par \$\\sqrt{2} \\approx 1{,}414\$. Nouvelle période \$\\approx 6{,}28 \\times 1{,}414 \\approx 8{,}88\\,ms\$.",
                  mistakeFr:
                      "Erreur classique : penser que doubler L double \$T_0\$. **Faux** — la racine carrée intervient.",
                ),
              ], finalAnswerFr: r"$T_0$ multipliée par $\sqrt{2}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Équation différentielle du RLC libre',
          5,
          "Le circuit RLC série a \$L = 0{,}1\\,H\$, \$C = 10\\,\\mu F\$, \$R = 20\\,\\Omega\$. Le condensateur a une tension initiale \$u_C(0) = 12\\,V\$.",
          [
            _q(
              1,
              "Établir l'équation différentielle en \$q(t)\$ (charge du condensateur).",
              3,
              _sol([
                _step(
                  "**Loi des mailles** sans générateur : \$u_C + u_R + u_L = 0\$. Or \$u_C = q/C\$, \$u_R = R i\$, \$u_L = L\\,di/dt\$. Et \$i = dq/dt\$, donc \$di/dt = d^2q/dt^2\$.",
                ),
                _step(
                  "Substitution : \$q/C + R \\dfrac{dq}{dt} + L \\dfrac{d^2 q}{dt^2} = 0\$.",
                ),
                _step(
                  "Réarrangement : \$L \\ddot{q} + R \\dot{q} + q/C = 0\$ — équation linéaire homogène d'ordre 2 à coefficients constants.",
                ),
              ],
                  finalAnswerFr:
                      r"$L \ddot{q} + R \dot{q} + q/C = 0$"),
            ),
            _q(
              2,
              "Identifier le régime selon le discriminant.",
              2,
              _sol([
                _step(
                  "**Discriminant** de l'équation caractéristique \$L r^2 + R r + 1/C = 0\$ : \$\\Delta = R^2 - 4L/C\$.",
                ),
                _step(
                  "Application : \$R^2 = 400\$, \$4L/C = 4 \\times 0{,}1 / 10^{-5} = 4 \\times 10^4 = 40000\$. \$\\Delta = 400 - 40000 = -39600 < 0\$.",
                ),
                _step(
                  "\$\\Delta < 0\$ → **régime pseudo-périodique** : oscillations amorties.",
                  tipFr:
                      "Trois régimes : \$\\Delta < 0\$ pseudo-périodique ; \$\\Delta = 0\$ critique ; \$\\Delta > 0\$ apériodique. Le seuil est \$R_c = 2\\sqrt{L/C}\$.",
                ),
              ], finalAnswerFr: r"Régime pseudo-périodique ($\Delta < 0$)"),
            ),
          ],
        ),
        _ex(
          3,
          'Régime pseudo-périodique',
          6,
          "Le circuit RLC oscille librement.",
          [
            _q(
              1,
              "Donner la forme générale de \$q(t)\$ en régime pseudo-périodique.",
              2,
              _sol([
                _step(
                  "**Forme** : \$q(t) = e^{-t/\\tau}(A\\cos(\\omega t) + B\\sin(\\omega t))\$ où \$\\tau = 2L/R\$ (constante d'amortissement) et \$\\omega = \\sqrt{\\omega_0^2 - 1/\\tau^2}\$ (pseudo-pulsation).",
                ),
                _step(
                  "L'enveloppe \$e^{-t/\\tau}\$ traduit la décroissance exponentielle de l'amplitude. La pseudo-période est \$T = 2\\pi/\\omega\$ (\\(\\approx T_0\\) si l'amortissement est faible).",
                  tipFr:
                      "Pour faible amortissement (\$R \\ll R_c\$) : \$\\omega \\approx \\omega_0\$ et la pseudo-période est très proche de la période propre.",
                ),
              ],
                  finalAnswerFr:
                      r"$q(t) = e^{-t/\tau}(A\cos\omega t + B\sin\omega t)$"),
            ),
            _q(
              2,
              "Calculer la pseudo-pulsation \$\\omega\$ avec les valeurs du problème.",
              2,
              _sol([
                _step(
                  "\$\\tau = 2L/R = 0{,}2/20 = 0{,}01\\,s\$. \$\\omega_0 = 1000\\,rad/s\$ (Q1).",
                ),
                _step(
                  "\$\\omega = \\sqrt{\\omega_0^2 - 1/\\tau^2} = \\sqrt{10^6 - 10^4} = \\sqrt{990000} \\approx 995\\,rad/s\$.",
                ),
                _step(
                  "Très proche de \$\\omega_0\$ (différence de 0,5%). Amortissement faible.",
                ),
              ], finalAnswerFr: r"$\omega \approx 995$ rad/s"),
            ),
            _q(
              3,
              "Au bout de combien de pseudo-périodes l'amplitude est-elle divisée par 10 ?",
              2,
              _sol([
                _step(
                  "L'amplitude décroît selon \$e^{-t/\\tau}\$. On veut \$e^{-t/\\tau} = 1/10\$, soit \$t = \\tau \\ln(10) \\approx 0{,}01 \\times 2{,}303 \\approx 0{,}023\\,s\$.",
                ),
                _step(
                  "Pseudo-période : \$T \\approx 2\\pi/995 \\approx 6{,}31\\,ms = 0{,}00631\\,s\$.",
                ),
                _step(
                  "Nombre de pseudo-périodes : \$0{,}023 / 0{,}00631 \\approx 3{,}65\$ — entre 3 et 4 oscillations.",
                  tipFr:
                      "Q faible = oscillations qui meurent vite. Pour un Q élevé (résonateur de quartz), on peut compter des milliers d'oscillations avant que l'amplitude soit divisée par 10.",
                ),
              ], finalAnswerFr: r"$\approx 3{,}65$ pseudo-périodes"),
            ),
          ],
        ),
        _ex(
          4,
          'Conservation de l\'énergie (LC idéal)',
          5,
          "Dans un circuit LC idéal (\$R = 0\$) en oscillation libre.",
          [
            _q(
              1,
              "Exprimer l'énergie totale \$E\$ stockée à un instant donné.",
              2,
              _sol([
                _step(
                  "**Deux réservoirs** : énergie électrique dans le condensateur \$E_C = \\dfrac{q^2}{2C}\$ et énergie magnétique dans la bobine \$E_L = \\dfrac{1}{2} L i^2\$.",
                ),
                _step(
                  "Total : \$E = E_C + E_L = \\dfrac{q^2}{2C} + \\dfrac{L i^2}{2}\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Montrer que \$E\$ est constante au cours du temps (conservation).",
              3,
              _sol([
                _step(
                  "Dériver \$E\$ par rapport au temps : \$\\dfrac{dE}{dt} = \\dfrac{q \\dot{q}}{C} + L i \\dot{i} = \\dfrac{q i}{C} + L i \\ddot{q}\$ (puisque \$i = \\dot q\$).",
                ),
                _step(
                  "Or en circuit LC libre, l'équation est \$L\\ddot q + q/C = 0\$, donc \$L\\ddot q = -q/C\$.",
                ),
                _step(
                  "Substitution : \$\\dfrac{dE}{dt} = \\dfrac{qi}{C} + i \\cdot (-q/C) = 0\$.",
                ),
                _step(
                  "Donc \$E\$ est **constante** — l'énergie oscille entre les formes électrique (dans C) et magnétique (dans L), mais leur somme reste constante. C'est l'analogue électrique du pendule sans frottement.",
                  tipFr:
                      "Avec une résistance R > 0, \$dE/dt = -Ri^2 < 0\$ — l'énergie diminue par effet Joule.",
                ),
              ], finalAnswerFr: r"$E$ constante (conservation)"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperWaveBasics() => _paper(
      titleFr: 'Épreuve type — Ondes mécaniques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Ondes mécaniques progressives, célérité, longueur d'onde, retard, transversales vs longitudinales. **Relation centrale** : \$v = \\lambda f\$.",
      exercices: [
        _ex(
          1,
          'Notions de base',
          5,
          "On crée une onde transversale à l'extrémité d'une corde tendue avec une fréquence \$f = 50\\,Hz\$. La célérité de l'onde dans cette corde est \$v = 20\\,m/s\$.",
          [
            _q(
              1,
              "Calculer la période \$T\$ et la longueur d'onde \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "**Période** : \$T = 1/f = 1/50 = 0{,}02\\,s = 20\\,ms\$.",
                ),
                _step(
                  "**Relation fondamentale** : \$v = \\lambda f\$, donc \$\\lambda = v/f = 20/50 = 0{,}4\\,m = 40\\,cm\$.",
                  tipFr:
                      "Vérification dimensionnelle : m = (m/s) × s ✓. La longueur d'onde est la distance parcourue par l'onde en une période.",
                ),
              ], finalAnswerFr: r"$T = 20$ ms, $\lambda = 40$ cm"),
            ),
            _q(
              2,
              "Définir la double-périodicité d'une onde progressive.",
              2,
              _sol([
                _step(
                  "Une onde progressive est **doublement périodique** : (1) **en temps**, en un point fixe : la grandeur perturbée se reproduit identique tous les \$T\$ secondes. (2) **en espace**, à un instant fixe : la perturbation se reproduit tous les \$\\lambda\$ mètres.",
                ),
                _step(
                  "Lien : \$\\lambda = vT\$ — la longueur d'onde est la distance parcourue par l'onde pendant une période.",
                ),
              ]),
            ),
            _q(
              3,
              "L'onde sur la corde est-elle transversale ou longitudinale ? Citer un exemple de chaque.",
              1,
              _sol([
                _step(
                  "Sur une corde, le mouvement des points est **perpendiculaire** à la direction de propagation (par exemple haut-bas alors que l'onde se propage horizontalement) → **transversale**.",
                ),
                _step(
                  "Exemples : transversale = corde, lumière, vagues sur l'eau (mouvement vertical, propagation horizontale). Longitudinale = son (compressions/raréfactions dans la direction de propagation).",
                  tipFr:
                      "Une onde de surface (vagues) combine en réalité les deux composantes — mouvement quasi-circulaire des particules d'eau près de la surface.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Retard et propagation',
          5,
          "Une source ponctuelle \$S\$ émet une onde de célérité \$v\$. Un point \$M\$ est situé à la distance \$d = 1{,}5\\,m\$ de \$S\$. Le mouvement de \$S\$ est sinusoïdal : \$y_S(t) = A\\sin(2\\pi f t)\$ avec \$A = 2\\,cm\$, \$f = 100\\,Hz\$, \$v = 30\\,m/s\$.",
          [
            _q(
              1,
              "Calculer le retard \$\\tau\$ entre \$M\$ et \$S\$.",
              2,
              _sol([
                _step(
                  "**Retard** : temps mis par l'onde pour parcourir la distance \$d\$. \$\\tau = d/v = 1{,}5/30 = 0{,}05\\,s = 50\\,ms\$.",
                ),
              ], finalAnswerFr: r"$\tau = 50$ ms"),
            ),
            _q(
              2,
              "Donner l'expression de \$y_M(t)\$.",
              2,
              _sol([
                _step(
                  "Un point \$M\$ reproduit le mouvement de la source avec un retard temporel \$\\tau\$ : \$y_M(t) = y_S(t - \\tau)\$.",
                ),
                _step(
                  "\$y_M(t) = A\\sin(2\\pi f (t - \\tau)) = 2 \\times 10^{-2} \\sin(200\\pi (t - 0{,}05))\\,m\$.",
                  tipFr:
                      "Convention : pour \$t < \\tau\$, le point \$M\$ est encore au repos (l'onde n'est pas encore arrivée).",
                ),
              ],
                  finalAnswerFr:
                      r"$y_M(t) = A\sin(2\pi f(t - \tau))$"),
            ),
            _q(
              3,
              "Calculer le déphasage \$\\Delta\\varphi\$ entre \$M\$ et \$S\$ en fonction de \$\\lambda\$.",
              1,
              _sol([
                _step(
                  "Déphasage : \$\\Delta\\varphi = 2\\pi f \\tau = 2\\pi d/\\lambda\$ (avec \$\\lambda = v/f\$).",
                ),
                _step(
                  "Application : \$\\lambda = 30/100 = 0{,}3\\,m\$. \$\\Delta\\varphi = 2\\pi \\times 1{,}5/0{,}3 = 10\\pi\$ rad.",
                ),
                _step(
                  "Modulo \$2\\pi\$ : \$10\\pi = 5 \\times 2\\pi \\equiv 0\$ — \$M\$ et \$S\$ vibrent **en phase** (5 longueurs d'onde séparent les deux).",
                ),
              ], finalAnswerFr: r"$\Delta\varphi = 10\pi \equiv 0$ (en phase)"),
            ),
          ],
        ),
        _ex(
          3,
          'Diffraction',
          5,
          "Une onde plane de longueur d'onde \$\\lambda = 2\\,cm\$ rencontre une fente de largeur \$a\$.",
          [
            _q(
              1,
              "Pour quelle valeur de \$a\$ la diffraction est-elle observable ?",
              2,
              _sol([
                _step(
                  "**Critère de diffraction** : observable quand \$a \\lesssim \\lambda\$, c'est-à-dire que la fente est de l'ordre de la longueur d'onde.",
                ),
                _step(
                  "Pour \$\\lambda = 2\\,cm\$, diffraction nette si \$a \\lesssim 2\\,cm\$. Si \$a \\gg \\lambda\$ (par exemple \$a = 50\\,cm\$) : propagation rectiligne, pas de diffraction visible.",
                ),
              ], finalAnswerFr: r"$a \lesssim \lambda = 2$ cm"),
            ),
            _q(
              2,
              "Si \$a = 1\\,cm\$, calculer l'écart angulaire \$\\theta\$ entre la direction de propagation et le premier minimum de diffraction.",
              3,
              _sol([
                _step(
                  "**Formule** (pour une fente fine) : \$\\sin\\theta = \\lambda/a\$.",
                ),
                _step(
                  "Application : \$\\sin\\theta = 2/1 = 2\$ — impossible (sin > 1) !",
                ),
                _step(
                  "**Interprétation** : avec \$a < \\lambda\$, l'onde diffractée occupe tout le demi-espace en aval. Pas de minimum de diffraction visible — la fente se comporte comme une source ponctuelle.",
                  tipFr:
                      "Pour avoir des minima nets, il faut \$a > \\lambda\$. Avec \$a \\gg \\lambda\$, les minima sont très proches de la direction directe (\$\\theta\$ petit).",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Réflexion et superposition',
          5,
          "Sur une corde, on superpose deux ondes sinusoïdales se propageant en sens contraires, de même fréquence et amplitude : \$y_1(x, t) = A\\sin(\\omega t - kx)\$ et \$y_2(x, t) = A\\sin(\\omega t + kx)\$.",
          [
            _q(
              1,
              "Montrer que la superposition donne une onde stationnaire \$y(x, t) = 2A\\sin(\\omega t)\\cos(kx)\$.",
              3,
              _sol([
                _step(
                  "**Formule trigo** : \$\\sin(p) + \\sin(q) = 2\\sin((p+q)/2)\\cos((p-q)/2)\$.",
                ),
                _step(
                  "Avec \$p = \\omega t - kx\$ et \$q = \\omega t + kx\$ : \$(p+q)/2 = \\omega t\$, \$(p-q)/2 = -kx\$.",
                ),
                _step(
                  "Donc \$y_1 + y_2 = 2A\\sin(\\omega t)\\cos(-kx) = 2A\\sin(\\omega t)\\cos(kx)\$ (\$\\cos\$ est paire).",
                ),
                _step(
                  "**Caractérisation** : la dépendance en \$x\$ et en \$t\$ est **séparée** — c'est la signature d'une onde stationnaire. Pas de propagation, mais des points qui vibrent en place.",
                ),
              ],
                  finalAnswerFr:
                      r"$y = 2A\sin(\omega t)\cos(kx)$"),
            ),
            _q(
              2,
              "Localiser les nœuds (points qui ne vibrent jamais) de l'onde stationnaire.",
              2,
              _sol([
                _step(
                  "Un point \$x_0\$ est un nœud si \$y(x_0, t) = 0\$ pour tout \$t\$. Cela impose \$\\cos(k x_0) = 0\$.",
                ),
                _step(
                  "Solutions : \$k x_0 = \\pi/2 + n\\pi\$ pour \$n \\in \\mathbb{Z}\$, soit \$x_0 = (2n+1) \\dfrac{\\pi}{2k} = (2n+1) \\dfrac{\\lambda}{4}\$.",
                ),
                _step(
                  "**Nœuds espacés de \$\\lambda/2\$** : positions \$\\lambda/4, 3\\lambda/4, 5\\lambda/4, \\ldots\$. Entre deux nœuds, un **ventre** (amplitude maximale) en \$x = n\\lambda/2\$.",
                  tipFr:
                      "Applications : ondes stationnaires dans une corde de guitare (longueur fixée, modes propres), résonateurs acoustiques, lasers (cavité optique).",
                ),
              ], finalAnswerFr: r"Nœuds en $x = (2n+1)\lambda/4$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperPeriodicWaves() => _paper(
      titleFr: 'Épreuve type — Ondes périodiques (interférences, Doppler)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Interférences, fentes d'Young, effet Doppler, applications aux ondes sonores et lumineuses.",
      exercices: [
        _ex(
          1,
          'Interférences de deux sources synchrones',
          5,
          "Deux sources \$S_1\$ et \$S_2\$ émettent en phase une onde de fréquence \$f = 1000\\,Hz\$ dans un milieu où \$v = 340\\,m/s\$. Un point \$M\$ est à \$d_1 = 1{,}50\\,m\$ de \$S_1\$ et \$d_2 = 1{,}85\\,m\$ de \$S_2\$.",
          [
            _q(
              1,
              "Calculer la longueur d'onde \$\\lambda\$.",
              1,
              _sol([
                _step(
                  "\$\\lambda = v/f = 340/1000 = 0{,}34\\,m\$.",
                ),
              ], finalAnswerFr: r"$\lambda = 34$ cm"),
            ),
            _q(
              2,
              "Calculer la différence de marche \$\\delta\$ en \$M\$. L'interférence est-elle constructive ou destructive ?",
              3,
              _sol([
                _step(
                  "**Différence de marche** : \$\\delta = |d_2 - d_1| = 0{,}35\\,m\$.",
                ),
                _step(
                  "Rapport : \$\\delta/\\lambda = 0{,}35/0{,}34 \\approx 1{,}03\$.",
                ),
                _step(
                  "**Critères** : \$\\delta = n\\lambda\$ → interférence constructive (amplitude max). \$\\delta = (n + 1/2)\\lambda\$ → destructive (amplitude min).",
                ),
                _step(
                  "Ici \$\\delta/\\lambda \\approx 1{,}03 \\approx 1\$, proche de \$n = 1\$ : interférence **constructive** (presque parfaite — léger décalage).",
                  tipFr:
                      "Pour une interférence parfaite constructive, il faut \$\\delta\$ exactement multiple de \$\\lambda\$. Sinon, intermédiaire.",
                ),
              ],
                  finalAnswerFr:
                      r"$\delta = 35$ cm, $\delta/\lambda \approx 1$ → constructive"),
            ),
          ],
        ),
        _ex(
          2,
          "Fentes d'Young (lumière)",
          5,
          "Dans une expérience d'Young, deux fentes distantes de \$a = 0{,}2\\,mm\$ sont éclairées par un laser de longueur d'onde \$\\lambda = 600\\,nm\$. L'écran est à \$D = 1\\,m\$.",
          [
            _q(
              1,
              "Calculer l'interfrange \$i\$.",
              3,
              _sol([
                _step(
                  "**Formule** : \$i = \\dfrac{\\lambda D}{a}\$.",
                ),
                _step(
                  "Application : \$i = \\dfrac{600 \\times 10^{-9} \\times 1}{0{,}2 \\times 10^{-3}} = \\dfrac{6 \\times 10^{-7}}{2 \\times 10^{-4}} = 3 \\times 10^{-3}\\,m = 3\\,mm\$.",
                ),
                _step(
                  "**Vérification dimensionnelle** : (m × m) / m = m ✓.",
                ),
              ], finalAnswerFr: r"$i = 3$ mm"),
            ),
            _q(
              2,
              "Si on remplace le laser rouge (\$\\lambda_r = 700\\,nm\$) par un laser bleu (\$\\lambda_b = 450\\,nm\$), comment varie l'interfrange ?",
              2,
              _sol([
                _step(
                  "\$i \\propto \\lambda\$ : un laser à plus courte longueur d'onde donne un interfrange plus petit.",
                ),
                _step(
                  "Rapport : \$i_b/i_r = \\lambda_b/\\lambda_r = 450/700 \\approx 0{,}64\$. Si \$i_r = 3\\,mm\$, \$i_b \\approx 1{,}93\\,mm\$.",
                  tipFr:
                      "C'est pourquoi en lumière blanche, on observe des franges colorées : chaque couleur a son propre interfrange.",
                ),
              ], finalAnswerFr: r"$i_b/i_r \approx 0{,}64$"),
            ),
          ],
        ),
        _ex(
          3,
          'Effet Doppler',
          5,
          "Une ambulance émet un son de fréquence \$f_0 = 700\\,Hz\$. Vous êtes immobile sur le trottoir, l'ambulance s'approche à la vitesse \$v_s = 20\\,m/s\$. Célérité du son : \$v = 340\\,m/s\$.",
          [
            _q(
              1,
              "Calculer la fréquence \$f'\$ perçue par l'observateur immobile à l'approche.",
              3,
              _sol([
                _step(
                  "**Formule de Doppler** (source mobile, récepteur fixe, approche) : \$f' = f_0 \\dfrac{v}{v - v_s}\$.",
                ),
                _step(
                  "Application : \$f' = 700 \\dfrac{340}{340 - 20} = 700 \\times \\dfrac{340}{320} = 700 \\times 1{,}0625 = 743{,}75\\,Hz\$.",
                ),
                _step(
                  "Perception : son plus aigu (fréquence plus élevée) à l'approche.",
                  tipFr:
                      "Lorsque la source s'éloigne, \$f' = f_0 \\cdot v/(v + v_s)\$ — son plus grave.",
                ),
              ], finalAnswerFr: r"$f' \approx 744$ Hz"),
            ),
            _q(
              2,
              "Calculer la fréquence \$f''\$ perçue après le passage (l'ambulance s'éloigne).",
              2,
              _sol([
                _step(
                  "\$f'' = f_0 \\dfrac{v}{v + v_s} = 700 \\times \\dfrac{340}{360} \\approx 661\\,Hz\$.",
                ),
                _step(
                  "**Écart** : \$f' - f'' \\approx 83\\,Hz\$ — bien audible, c'est le 'wah-wahh' caractéristique du Doppler. Applications : radar de vitesse, échographie médicale, expansion de l'univers (red shift).",
                ),
              ], finalAnswerFr: r"$f'' \approx 661$ Hz"),
            ),
          ],
        ),
        _ex(
          4,
          'Cordes vibrantes',
          5,
          "Une corde de guitare de longueur \$L = 0{,}65\\,m\$ et de tension \$T\$ produit un fondamental à \$f_1 = 220\\,Hz\$ (note La₃). La célérité de l'onde sur la corde est \$v = \\sqrt{T/\\mu}\$ où \$\\mu\$ est la masse linéique.",
          [
            _q(
              1,
              "Déterminer la longueur d'onde \$\\lambda_1\$ et la célérité \$v\$ du fondamental.",
              3,
              _sol([
                _step(
                  "**Mode fondamental** d'une corde fixée aux deux extrémités : \$\\lambda_1 = 2L = 1{,}30\\,m\$ (un ventre entre deux nœuds, l'onde fait un aller-retour = \$\\lambda/2\$).",
                ),
                _step(
                  "Célérité : \$v = \\lambda_1 f_1 = 1{,}30 \\times 220 = 286\\,m/s\$.",
                ),
              ], finalAnswerFr: r"$\lambda_1 = 1{,}30$ m, $v = 286$ m/s"),
            ),
            _q(
              2,
              "Quelle fréquence \$f_2\$ produit la première harmonique (octave supérieure) ?",
              2,
              _sol([
                _step(
                  "**Harmoniques** d'une corde : \$f_n = n f_1\$ pour \$n = 1, 2, 3, \\ldots\$.",
                ),
                _step(
                  "\$f_2 = 2 f_1 = 440\\,Hz\$ — c'est la note La₄ (octave au-dessus), le 'la' du diapason.",
                  tipFr:
                      "Pour produire l'octave, on appuie sur la corde à mi-chemin (frette 12 sur la guitare) — on raccourcit la longueur effective à \$L/2\$.",
                ),
              ], finalAnswerFr: r"$f_2 = 440$ Hz"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperNuclearRadioactivity() => _paper(
      titleFr: 'Épreuve type — Radioactivité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Désintégrations \$\\alpha\$, \$\\beta^-\$, \$\\beta^+\$, conservations (A, Z), loi exponentielle, demi-vie, datation.",
      exercices: [
        _ex(
          1,
          'Lois de désintégration',
          4,
          "On considère plusieurs désintégrations.",
          [
            _q(
              1,
              "Écrire la désintégration \$\\alpha\$ du \$^{226}_{88}\\text{Ra}\$.",
              2,
              _sol([
                _step(
                  "**Désintégration \$\\alpha\$** : émission d'un noyau d'hélium \$^4_2 \\text{He}\$. \$^A_Z X \\to ^{A-4}_{Z-2} Y + ^4_2 \\text{He}\$.",
                ),
                _step(
                  "Application : \$^{226}_{88}\\text{Ra} \\to ^{222}_{86}\\text{Rn} + ^4_2\\text{He}\$. Le radium devient du radon (gaz noble, problème de santé publique dans les caves).",
                  tipFr:
                      "Conservation du nombre de nucléons A et du nombre de charge Z — toujours vérifier ces deux conservations.",
                ),
              ],
                  finalAnswerFr:
                      r"$^{226}_{88}\text{Ra} \to ^{222}_{86}\text{Rn} + ^4_2\text{He}$"),
            ),
            _q(
              2,
              "Écrire la désintégration \$\\beta^-\$ du \$^{14}_6 C\$.",
              2,
              _sol([
                _step(
                  "**Désintégration \$\\beta^-\$** : un neutron se transforme en proton, émission d'un électron \$^0_{-1}e\$ : \$^A_Z X \\to ^A_{Z+1} Y + ^0_{-1}e + \\bar{\\nu}\$.",
                ),
                _step(
                  "Application : \$^{14}_6\\text{C} \\to ^{14}_7\\text{N} + ^0_{-1}e + \\bar{\\nu}\$. Le carbone devient de l'azote — base de la datation au C-14.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Loi de décroissance',
          5,
          "Un échantillon de \$^{210}_{84}\\text{Po}\$ (polonium 210) a une activité initiale \$A_0 = 2 \\times 10^{10}\\,Bq\$. Demi-vie : \$t_{1/2} = 138\\,\\text{jours}\$.",
          [
            _q(
              1,
              "Calculer la constante de désintégration \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "**Relation** : \$t_{1/2} = \\ln(2)/\\lambda\$, donc \$\\lambda = \\ln(2)/t_{1/2}\$.",
                ),
                _step(
                  "\$\\lambda = 0{,}693/138 \\approx 5{,}02 \\times 10^{-3}\\,\\text{jour}^{-1}\$ (ou en secondes : \$/86400 \\approx 5{,}81 \\times 10^{-8}\\,s^{-1}\$).",
                ),
              ], finalAnswerFr: r"$\lambda \approx 5{,}02 \times 10^{-3}$ /jour"),
            ),
            _q(
              2,
              "Quelle activité reste-t-il après 1 an (365 jours) ?",
              3,
              _sol([
                _step(
                  "**Loi exponentielle** : \$A(t) = A_0 e^{-\\lambda t}\$.",
                ),
                _step(
                  "Exposant : \$\\lambda t = 5{,}02 \\times 10^{-3} \\times 365 \\approx 1{,}83\$.",
                ),
                _step(
                  "\$A(365) = 2 \\times 10^{10} \\times e^{-1{,}83} \\approx 2 \\times 10^{10} \\times 0{,}160 \\approx 3{,}2 \\times 10^9\\,Bq\$.",
                ),
                _step(
                  "**Vérification** : 365 jours / 138 jours \$\\approx 2{,}64\$ demi-vies. Activité \$\\approx A_0/2^{2{,}64} \\approx A_0/6{,}24 \\approx 3{,}2 \\times 10^9\\,Bq\$ ✓.",
                  tipFr:
                      "\$A_0/2^n\$ où \$n = t/t_{1/2}\$ — méthode rapide quand on veut une estimation.",
                ),
              ], finalAnswerFr: r"$A(1\,\text{an}) \approx 3{,}2 \times 10^9$ Bq"),
            ),
          ],
        ),
        _ex(
          3,
          'Datation au carbone-14',
          6,
          "Dans la nature, le rapport \$^{14}\\text{C}/^{12}\\text{C}\$ d'un organisme vivant est constant (renouvellement par échanges avec l'atmosphère). À sa mort, le \$^{14}\\text{C}\$ se désintègre selon \$t_{1/2} = 5730\\,\\text{ans}\$. Un échantillon archéologique a un rapport \$^{14}\\text{C}/^{12}\\text{C}\$ égal à 25% du rapport actuel.",
          [
            _q(
              1,
              "Calculer l'âge \$t\$ de l'échantillon.",
              4,
              _sol([
                _step(
                  "Le rapport est aussi proportionnel à l'activité (mêmes coefficients). On a \$A(t)/A_0 = 0{,}25\$.",
                ),
                _step(
                  "**Loi** : \$A(t)/A_0 = e^{-\\lambda t} = 0{,}25\$. Avec \$\\lambda = \\ln 2/t_{1/2}\$, on a \$e^{-t \\ln 2 / 5730} = 0{,}25\$.",
                ),
                _step(
                  "Application de \$\\ln\$ : \$-t\\ln 2/5730 = \\ln(0{,}25) = -\\ln 4 = -2\\ln 2\$. Donc \$t/5730 = 2\$, soit \$t = 2 t_{1/2} = 11460\\,\\text{ans}\$.",
                ),
                _step(
                  "**Vérification intuitive** : 25% = 1/4 = 1/2² → 2 demi-vies écoulées → \$t = 2 \\times 5730 = 11460\\,\\text{ans}\$ ✓.",
                  tipFr:
                      "Quand le rapport est une puissance simple de 1/2 (1/2, 1/4, 1/8, 1/16), la datation est immédiate sans \$\\ln\$.",
                ),
              ], finalAnswerFr: r"$t = 11460$ ans"),
            ),
            _q(
              2,
              "Quelle est la limite de la datation au carbone-14 ?",
              2,
              _sol([
                _step(
                  "Après 10 demi-vies (\$\\approx 57300\\,\\text{ans}\$), il reste \$1/2^{10} = 1/1024 \\approx 0{,}1\\%\$ du \$^{14}\\text{C}\$ initial — quantité difficilement mesurable.",
                ),
                _step(
                  "**Limite pratique** : datation utile jusqu'à environ 50 000 ans. Au-delà, on utilise d'autres méthodes (U-Pb pour les roches anciennes, K-Ar, etc.) basées sur des isotopes à demi-vie plus longue.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Énergie de liaison',
          5,
          "On compare deux noyaux : le deutérium \$^2_1\\text{H}\$ (masse \$2{,}01410\\,u\$) et l'hélium-4 \$^4_2\\text{He}\$ (masse \$4{,}00260\\,u\$). Masses : proton \$1{,}00728\\,u\$, neutron \$1{,}00866\\,u\$. \$1\\,u = 931{,}5\\,\\text{MeV}/c^2\$.",
          [
            _q(
              1,
              "Calculer le défaut de masse et l'énergie de liaison du deutérium.",
              3,
              _sol([
                _step(
                  "**Défaut de masse** \$\\Delta m\$ : somme des masses des nucléons libres − masse du noyau.",
                ),
                _step(
                  "Deutérium = 1 proton + 1 neutron : somme = \$1{,}00728 + 1{,}00866 = 2{,}01594\\,u\$. Défaut : \$\\Delta m = 2{,}01594 - 2{,}01410 = 0{,}00184\\,u\$.",
                ),
                _step(
                  "**Énergie de liaison** : \$E = \\Delta m c^2 = 0{,}00184 \\times 931{,}5 \\approx 1{,}71\\,\\text{MeV}\$. Par nucléon : \$1{,}71/2 = 0{,}856\\,\\text{MeV/nucléon}\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$E_l = 1{,}71$ MeV, $0{,}856$ MeV/nucléon"),
            ),
            _q(
              2,
              "Faire de même pour l'hélium-4 et comparer.",
              2,
              _sol([
                _step(
                  "Hélium-4 = 2 protons + 2 neutrons : somme = \$2 \\times 1{,}00728 + 2 \\times 1{,}00866 = 4{,}03188\\,u\$. Défaut : \$\\Delta m = 4{,}03188 - 4{,}00260 = 0{,}02928\\,u\$.",
                ),
                _step(
                  "\$E_l = 0{,}02928 \\times 931{,}5 \\approx 27{,}3\\,\\text{MeV}\$. Par nucléon : \$27{,}3/4 \\approx 6{,}82\\,\\text{MeV/nucléon}\$.",
                ),
                _step(
                  "**Conclusion** : l'hélium-4 est beaucoup plus stable que le deutérium (énergie de liaison par nucléon ~8× supérieure). C'est pour ça que les étoiles fusionnent l'hydrogène en hélium — gain énergétique énorme.",
                  tipFr:
                      "L'énergie de liaison par nucléon est maximale autour du \$^{56}\\text{Fe}\$ (~8,8 MeV/nucléon) — pic de la 'courbe d'Aston'.",
                ),
              ],
                  finalAnswerFr:
                      r"Hélium-4 : $6{,}82$ MeV/nucléon (~8× plus stable)"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperProjectileMotion() => _paper(
      titleFr: 'Épreuve type — Mouvement d\'un projectile',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Chute libre, projectile (champ de pesanteur uniforme, sans frottement). Décomposition horizontale/verticale, trajectoire parabolique, portée et flèche.",
      exercices: [
        _ex(
          1,
          'Chute libre verticale',
          4,
          "Une bille de masse \$m = 100\\,g\$ tombe sans vitesse initiale depuis une hauteur \$h = 20\\,m\$. On néglige la résistance de l'air. \$g = 9{,}8\\,m/s^2\$.",
          [
            _q(
              1,
              "Calculer la durée de la chute.",
              2,
              _sol([
                _step(
                  "**MRUA vertical** : \$y(t) = h - \\frac{1}{2} g t^2\$ (axe Oy ascendant). Bille touche le sol quand \$y = 0\$.",
                ),
                _step(
                  "\$0 = h - g t^2/2 \\iff t = \\sqrt{2h/g} = \\sqrt{40/9{,}8} \\approx 2{,}02\\,s\$.",
                  tipFr:
                      "La masse n'apparaît pas — en chute libre, tous les corps tombent à la même vitesse (Galilée, expérience de Pise).",
                ),
              ], finalAnswerFr: r"$t_{\text{chute}} \approx 2{,}02$ s"),
            ),
            _q(
              2,
              "Quelle est la vitesse au moment de l'impact ?",
              2,
              _sol([
                _step(
                  "**Vitesse** : \$v(t) = g t = 9{,}8 \\times 2{,}02 \\approx 19{,}8\\,m/s\$.",
                ),
                _step(
                  "Conversion : \$19{,}8\\,m/s \\times 3{,}6 \\approx 71\\,km/h\$.",
                ),
                _step(
                  "**Vérification énergétique** : \$E_p = mgh = 0{,}1 \\times 9{,}8 \\times 20 = 19{,}6\\,J\$. \$E_c = \\frac{1}{2}mv^2 = 0{,}05 \\times 392 \\approx 19{,}6\\,J\$ ✓ (conservation de l'énergie).",
                ),
              ], finalAnswerFr: r"$v \approx 19{,}8$ m/s ($\sim$71 km/h)"),
            ),
          ],
        ),
        _ex(
          2,
          'Projectile : tir oblique',
          6,
          "Un projectile est lancé depuis le sol avec une vitesse initiale \$v_0 = 30\\,m/s\$ et un angle \$\\alpha = 45°\$ par rapport à l'horizontale. \$g = 10\\,m/s^2\$.",
          [
            _q(
              1,
              "Donner les équations horaires \$x(t)\$ et \$y(t)\$.",
              2,
              _sol([
                _step(
                  "**Décomposition** : \$v_{0x} = v_0 \\cos\\alpha\$, \$v_{0y} = v_0 \\sin\\alpha\$.",
                ),
                _step(
                  "Pour \$\\alpha = 45°\$ : \$v_{0x} = v_{0y} = 30/\\sqrt{2} \\approx 21{,}2\\,m/s\$.",
                ),
                _step(
                  "Équations : \$x(t) = v_{0x} t = 21{,}2 t\$. \$y(t) = v_{0y} t - g t^2/2 = 21{,}2 t - 5 t^2\$.",
                  tipFr:
                      "Mouvement horizontal : MRU (aucune force, à frottement nul). Mouvement vertical : MRUA (poids vers le bas).",
                ),
              ],
                  finalAnswerFr:
                      r"$x = 21{,}2 t$, $y = 21{,}2 t - 5 t^2$"),
            ),
            _q(
              2,
              "Calculer la portée \$x_p\$ (distance horizontale au point de chute).",
              2,
              _sol([
                _step(
                  "Le projectile retombe quand \$y = 0\$ (autre que \$t = 0\$). Résoudre \$21{,}2 t - 5 t^2 = 0 \\iff t(21{,}2 - 5t) = 0\$.",
                ),
                _step(
                  "Solution non nulle : \$t = 21{,}2/5 = 4{,}24\\,s\$.",
                ),
                _step(
                  "Portée : \$x_p = 21{,}2 \\times 4{,}24 \\approx 89{,}9\\,m\$.",
                ),
                _step(
                  "**Formule générale** : \$x_p = v_0^2 \\sin(2\\alpha)/g\$. Pour \$\\alpha = 45°\$, \$\\sin 90° = 1\$ → portée **maximale** \$x_p = v_0^2/g = 900/10 = 90\\,m\$.",
                  tipFr:
                      "À sans frottement, la portée est maximale pour \$\\alpha = 45°\$. Avec frottement (cas réel), l'angle optimal est inférieur (~35-40°).",
                ),
              ], finalAnswerFr: r"$x_p \approx 90$ m"),
            ),
            _q(
              3,
              "Calculer la flèche \$h_{\\max}\$ (hauteur maximale atteinte).",
              2,
              _sol([
                _step(
                  "Au sommet, \$v_y = 0\$. \$v_y(t) = v_{0y} - g t = 0 \\iff t_{\\text{sommet}} = v_{0y}/g = 21{,}2/10 = 2{,}12\\,s\$.",
                ),
                _step(
                  "Hauteur : \$h_{\\max} = y(2{,}12) = 21{,}2 \\times 2{,}12 - 5 \\times 4{,}50 \\approx 44{,}9 - 22{,}5 = 22{,}4\\,m\$.",
                ),
                _step(
                  "**Formule** : \$h_{\\max} = v_0^2 \\sin^2\\alpha / (2g) = 900 \\times 0{,}5 / 20 = 22{,}5\\,m\$ (cohérent).",
                ),
              ], finalAnswerFr: r"$h_{\max} \approx 22{,}5$ m"),
            ),
          ],
        ),
        _ex(
          3,
          'Équation cartésienne de la trajectoire',
          5,
          "On reprend le projectile de l'Exercice 2.",
          [
            _q(
              1,
              "Exprimer \$y\$ en fonction de \$x\$ et montrer que la trajectoire est parabolique.",
              3,
              _sol([
                _step(
                  "On élimine \$t\$. De \$x = v_{0x} t\$ : \$t = x/v_{0x}\$.",
                ),
                _step(
                  "Substitution : \$y = v_{0y} \\cdot (x/v_{0x}) - g \\cdot (x/v_{0x})^2 / 2 = (v_{0y}/v_{0x}) x - g x^2 / (2 v_{0x}^2)\$.",
                ),
                _step(
                  "Avec \$v_{0y}/v_{0x} = \\tan\\alpha\$ et \$v_{0x} = v_0 \\cos\\alpha\$ : \$y = \\tan(\\alpha) x - \\dfrac{g x^2}{2 v_0^2 \\cos^2\\alpha}\$.",
                ),
                _step(
                  "**Trajectoire parabolique** : \$y = ax + bx^2\$ avec \$a = \\tan\\alpha > 0\$ et \$b = -g/(2 v_0^2 \\cos^2\\alpha) < 0\$ — parabole concave vers le bas.",
                  tipFr:
                      "L'équation cartésienne permet de tracer la trajectoire indépendamment du temps.",
                ),
              ],
                  finalAnswerFr:
                      r"$y = \tan(\alpha)x - \dfrac{gx^2}{2 v_0^2 \cos^2\alpha}$"),
            ),
            _q(
              2,
              "Application numérique : équation pour notre projectile.",
              2,
              _sol([
                _step(
                  "Avec \$\\alpha = 45°\$ : \$\\tan\\alpha = 1\$, \$\\cos^2\\alpha = 1/2\$. \$v_0^2 = 900\$.",
                ),
                _step(
                  "\$y = x - \\dfrac{10 x^2}{2 \\times 900 \\times 0{,}5} = x - \\dfrac{10 x^2}{900} = x - \\dfrac{x^2}{90}\$.",
                ),
                _step(
                  "Vérification : \$y = 0\$ pour \$x = 0\$ ou \$x = 90\$ (notre portée) ✓.",
                ),
              ], finalAnswerFr: r"$y = x - x^2/90$"),
            ),
          ],
        ),
        _ex(
          4,
          'Conservation d\'énergie',
          5,
          "On reprend le projectile.",
          [
            _q(
              1,
              "Calculer \$E_c\$ et \$E_p\$ au sommet de la trajectoire et comparer à l'énergie initiale.",
              3,
              _sol([
                _step(
                  "**Au lancement** : \$E_{c,0} = \\frac{1}{2} m v_0^2 = \\frac{1}{2} m \\times 900 = 450 m\\,J\$. \$E_{p,0} = 0\$. \$E_{m,0} = 450 m\\,J\$.",
                ),
                _step(
                  "**Au sommet** : \$v_x = v_{0x} = 21{,}2\\,m/s\$ (conservé) et \$v_y = 0\$. Donc \$v = 21{,}2\\,m/s\$.",
                ),
                _step(
                  "\$E_c = \\frac{1}{2} m \\times 21{,}2^2 \\approx 225 m\\,J\$. \$E_p = m g h_{\\max} = m \\times 10 \\times 22{,}5 = 225 m\\,J\$.",
                ),
                _step(
                  "Total : \$E_m = 225 m + 225 m = 450 m\\,J = E_{m,0}\$ ✓. **Conservation parfaite** (pas de frottement).",
                  tipFr:
                      "Pour \$\\alpha = 45°\$, à l'instant du sommet, \$E_c = E_p\$ — partage exact moitié-moitié.",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer la vitesse au point de chute (à \$x = x_p\$).",
              2,
              _sol([
                _step(
                  "Au point de chute, \$y = 0\$, donc \$E_p = 0\$. Par conservation, \$E_c = E_{m,0} = 450 m\$.",
                ),
                _step(
                  "Vitesse : \$\\frac{1}{2} m v^2 = 450 m \\Rightarrow v = \\sqrt{900} = 30\\,m/s = v_0\$.",
                ),
                _step(
                  "**Résultat remarquable** : la vitesse au point de chute égale la vitesse de lancement (sans frottement). L'angle est cependant inversé : descend à -45° par rapport à l'horizontale.",
                  tipFr:
                      "Symétrie de la trajectoire parabolique : aller et retour identiques (en énergie et vitesse), seulement inversés en signe vertical.",
                ),
              ], finalAnswerFr: r"$v_{\text{impact}} = v_0 = 30$ m/s"),
            ),
          ],
        ),
      ],
    );

// ============================================================================
// Registry & main
// ============================================================================

/// Map from skill code → paper JSON. The encoder writes one UPDATE row per
/// entry. Skill codes that don't yet have a hand-authored paper are omitted
/// and stay NULL in the database (the renderer skips the section in that case).
final Map<String, Map<String, dynamic>> _papers = {
  'sma_limit_def': _paperLimitDef(),
  'sma_deriv_definition': _paperDerivDefinition(),
  'sma_sequences_review': _paperSequencesReview(),
  'sma_ln_basics': _paperLnBasics(),
  'sma_exp_basics': _paperExpBasics(),
  'sma_primitives': _paperPrimitives(),
  'sma_ode_first_order': _paperOdeFirstOrder(),
  'sma_complex_basics': _paperComplexBasics(),
  'sma_vectors_3d': _paperVectors3d(),
  'sma_counting': _paperCounting(),
  'sma_divisibility': _paperDivisibility(),
  'sma_newton_laws': _paperNewtonLaws(),
  'sma_rc_charge_discharge': _paperRcChargeDischarge(),
  'sma_rl_establishment': _paperRlEstablishment(),
  'sma_rlc_regimes': _paperRlcRegimes(),
  'sma_wave_basics': _paperWaveBasics(),
  'sma_periodic_waves': _paperPeriodicWaves(),
  'sma_nuclear_radioactivity': _paperNuclearRadioactivity(),
  'sma_projectile_motion': _paperProjectileMotion(),
  // 13 SMA chapters remaining (6 physique + 7 chimie).
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln(
      '-- Migration 030: topic-coherent exam papers for SMA chapters (Phase 1).');
  buf.writeln('-- Auto-generated by json_encode_exam_papers_sma.dart.');
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

  File('backend/supabase/migrations/030_exam_papers_sma.sql')
      .writeAsStringSync(buf.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/030_exam_papers_sma.sql (${_papers.length} papers).');
}
