// Phase 4.4 encoder: topic-coherent Bac exam papers for the 25 SVT chapters.
//
// Output: backend/supabase/migrations/038_exam_papers_svt.sql

import 'dart:convert';
import 'dart:io';

Map<String, dynamic> _step(String textFr, {String? latex, String? mistakeFr, String? tipFr}) => {
      'text_fr': textFr,
      if (latex != null) 'latex': latex,
      if (mistakeFr != null) 'mistake_fr': mistakeFr,
      if (tipFr != null) 'tip_fr': tipFr,
    };
Map<String, dynamic> _sol(List<Map<String, dynamic>> steps, {String? finalAnswerFr}) =>
    {'steps': steps, if (finalAnswerFr != null) 'final_answer_fr': finalAnswerFr};
Map<String, dynamic> _q(int n, String stem, int pts, Map<String, dynamic> sol) =>
    {'number': n, 'stem_fr': stem, 'points': pts, 'solution': sol};
Map<String, dynamic> _ex(int n, String title, int pts, String pre, List<Map<String, dynamic>> qs) =>
    {'number': n, 'title_fr': title, 'points': pts, 'preamble_fr': pre, 'questions': qs};
Map<String, dynamic> _paper({required String titleFr, required String subtitleFr, required int duration, required int totalPoints, String? introFr, required List<Map<String, dynamic>> exercices}) => {
      'version': 1, 'title_fr': titleFr, 'subtitle_fr': subtitleFr,
      'duration_minutes': duration, 'total_points': totalPoints,
      if (introFr != null) 'intro_fr': introFr, 'exercices': exercices,
    };

// ============================================================================
// SVT Math (5)
// ============================================================================

Map<String, dynamic> _svtArithGeomSeq() => _paper(
      titleFr: 'Épreuve type — Suites arithmétiques et géométriques (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Suites de base : raison, terme général, somme.",
      exercices: [
        _ex(1, 'Identification', 5, "Soit \$u_0 = 1\$, \$u_{n+1} = u_n + 3\$.", [
          _q(1, "Nature et raison.", 2, _sol([_step("Différence constante \$+3\$ → arithmétique, raison \$r=3\$.")], finalAnswerFr: r"$r = 3$")),
          _q(2, "Calculer \$u_{10}\$.", 1, _sol([_step("\$u_n = u_0 + nr = 1 + 3n\$. \$u_{10} = 31\$.")], finalAnswerFr: r"$u_{10} = 31$")),
          _q(3, "Somme \$S = u_0 + \\dots + u_{10}\$.", 2, _sol([_step("11 termes : \$S = 11(u_0 + u_{10})/2 = 11 \\times 32/2 = 176\$.")], finalAnswerFr: r"$S = 176$")),
        ]),
        _ex(2, 'Croissance bactérienne', 5, "Population qui double toutes les heures, \$P_0 = 200\$.", [
          _q(1, "Modèle ?", 1, _sol([_step("Géométrique de raison 2 : \$P_n = 200 \\cdot 2^n\$.")], finalAnswerFr: r"$P_n = 200 \cdot 2^n$")),
          _q(2, "\$P_5\$ ?", 2, _sol([_step("\$P_5 = 200 \\times 32 = 6400\$ bactéries.")], finalAnswerFr: r"$P_5 = 6400$")),
          _q(3, "Quand atteint-on 100 000 ?", 2, _sol([_step("\$200 \\cdot 2^n \\ge 10^5 \\iff 2^n \\ge 500\$, \$n \\ge \\log_2 500 \\approx 8{,}97\$, donc \$n = 9\$ h.")], finalAnswerFr: r"$n \approx 9$ h")),
        ]),
        _ex(3, 'Suite arithmético-géométrique simple', 5, "\$u_0 = 0\$, \$u_{n+1} = 2 u_n + 1\$.", [
          _q(1, "Trouver le point fixe.", 1, _sol([_step("\$\\ell = 2\\ell + 1 \\iff \\ell = -1\$.")], finalAnswerFr: r"$\ell = -1$")),
          _q(2, "Poser \$v_n = u_n + 1\$. Montrer que c'est géométrique.", 2, _sol([_step("\$v_{n+1} = u_{n+1} + 1 = 2 u_n + 2 = 2(u_n + 1) = 2 v_n\$. Géométrique de raison 2.")], finalAnswerFr: r"$v_n$ géométrique, $q = 2$")),
          _q(3, "En déduire \$u_n\$.", 2, _sol([_step("\$v_0 = 1\$ → \$v_n = 2^n\$ → \$u_n = 2^n - 1\$.")], finalAnswerFr: r"$u_n = 2^n - 1$")),
        ]),
        _ex(4, 'Application — épargne', 5, "Capital \$C_0 = 1000\\,\\text{DH}\$, taux 3% par an.", [
          _q(1, "Donner \$C_n\$.", 1, _sol([_step("Géométrique \$q = 1{,}03\$ : \$C_n = 1000 \\times 1{,}03^n\$.")], finalAnswerFr: r"$C_n = 1000 \times 1{,}03^n$")),
          _q(2, "\$C_{10}\$ et \$C_{20}\$.", 2, _sol([_step("\$1{,}03^{10} \\approx 1{,}344\$ → \$C_{10} \\approx 1344\\,\\text{DH}\$. \$1{,}03^{20} \\approx 1{,}806\$ → \$C_{20} \\approx 1806\\,\\text{DH}\$.")], finalAnswerFr: r"$\approx 1344$ et $1806$ DH")),
          _q(3, "Doublement (règle de 72) :", 2, _sol([_step("Doublement \$\\approx 72/3 = 24\\,\\text{ans}\$. Vérification : \$1{,}03^{24} \\approx 2{,}03\$.")], finalAnswerFr: r"$\approx 24$ ans")),
        ]),
      ]);

Map<String, dynamic> _svtLimitCalc() => _paper(
      titleFr: 'Épreuve type — Calcul de limites (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Substitution, formes 0/0, infini.",
      exercices: [
        _ex(1, 'Calculs directs', 5, "Calculer les limites.", [
          _q(1, "\$\\lim_{x \\to 1} (x^2 + 2x - 3)\$.", 1, _sol([_step("Polynôme continu → substitution : \$1 + 2 - 3 = 0\$.")], finalAnswerFr: r"$0$")),
          _q(2, "\$\\lim_{x \\to 1} (x^2 - 1)/(x - 1)\$.", 2, _sol([_step("Forme 0/0. \$(x-1)(x+1)/(x-1) = x + 1 \\to 2\$.")], finalAnswerFr: r"$2$")),
          _q(3, "\$\\lim_{x \\to +\\infty} (3x^2 + 1)/(x^2 + x)\$.", 2, _sol([_step("Quotient même degré → coeffs dominants : \$3/1 = 3\$.")], finalAnswerFr: r"$3$")),
        ]),
        _ex(2, 'Croissances comparées', 5, "Calculer ces limites.", [
          _q(1, "\$\\lim_{x \\to +\\infty} \\ln x / x\$.", 2, _sol([_step("Croissances comparées : \$\\ln x \\ll x\$ à l'infini, limite = 0.")], finalAnswerFr: r"$0$")),
          _q(2, "\$\\lim_{x \\to +\\infty} e^x / x\$.", 2, _sol([_step("Exponentielle l'emporte sur toute puissance : limite = \$+\\infty\$.")], finalAnswerFr: r"$+\infty$")),
          _q(3, "\$\\lim_{x \\to 0^+} x \\ln x\$.", 1, _sol([_step("Forme \$0 \\cdot (-\\infty)\$. Limite usuelle = 0.")], finalAnswerFr: r"$0$")),
        ]),
        _ex(3, 'Limites latérales', 5, "Soit \$f(x) = 1/x\$.", [
          _q(1, "\$\\lim_{0^+} f\$ et \$\\lim_{0^-} f\$.", 3, _sol([_step("\$0^+\$ : \$x > 0\$ petit → \$1/x \\to +\\infty\$. \$0^-\$ : \$x < 0\$ petit → \$1/x \\to -\\infty\$.")], finalAnswerFr: r"$\pm\infty$")),
          _q(2, "Asymptotes de \$f\$ ?", 2, _sol([_step("Verticale \$x = 0\$, horizontale \$y = 0\$ (à \$\\pm\\infty\$).")], finalAnswerFr: r"$x=0$ et $y=0$")),
        ]),
        _ex(4, 'Application — décroissance', 5, "Une population \$P(t) = 1000 e^{-0{,}5 t}\$.", [
          _q(1, "\$P(0)\$, \$P(2)\$, \$\\lim P\$ ?", 3, _sol([_step("\$P(0) = 1000\$. \$P(2) = 1000 e^{-1} \\approx 368\$. \$\\lim_{+\\infty} = 0\$.")], finalAnswerFr: r"$1000$, $\approx 368$, $0$")),
          _q(2, "Demi-vie ?", 2, _sol([_step("\$e^{-0{,}5 t} = 1/2 \\iff t = \\ln 2/0{,}5 \\approx 1{,}39\\,\\text{ans}\$.")], finalAnswerFr: r"$\approx 1{,}39$ ans")),
        ]),
      ]);

Map<String, dynamic> _svtDerivApps() => _paper(
      titleFr: 'Épreuve type — Dérivation et applications (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Calcul de dérivées, variations, applications.",
      exercices: [
        _ex(1, 'Dérivées', 5, "Calculer.", [
          _q(1, "\$f(x) = 3x^2 - 5x + 2\$.", 1, _sol([_step("\$f'(x) = 6x - 5\$.")], finalAnswerFr: r"$6x - 5$")),
          _q(2, "\$g(x) = (x+1)(x-3)\$.", 2, _sol([_step("Produit : \$g' = 1 \\cdot (x-3) + (x+1) \\cdot 1 = 2x - 2\$.")], finalAnswerFr: r"$2x - 2$")),
          _q(3, "\$h(x) = e^x/x\$ sur \$\\mathbb{R}^*\$.", 2, _sol([_step("Quotient : \$h' = (e^x \\cdot x - e^x \\cdot 1)/x^2 = e^x (x-1)/x^2\$.")], finalAnswerFr: r"$e^x (x-1)/x^2$")),
        ]),
        _ex(2, 'Variations', 5, "\$f(x) = x^3 - 3x + 2\$ sur \$\\mathbb{R}\$.", [
          _q(1, "Calculer \$f'\$ et étudier son signe.", 3, _sol([_step("\$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)\$. Signe \$+\$ sur \$]-\\infty, -1[\$, \$-\$ sur \$]-1, 1[\$, \$+\$ sur \$]1, +\\infty[\$.")], finalAnswerFr: r"Croît, décroît, croît")),
          _q(2, "Extrema locaux.", 2, _sol([_step("Max local \$f(-1) = 4\$. Min local \$f(1) = 0\$.")], finalAnswerFr: r"Max 4, min 0")),
        ]),
        _ex(3, 'Tangente', 5, "Soit \$f(x) = x^2 + 1\$.", [
          _q(1, "Équation de la tangente en \$x_0 = 2\$.", 3, _sol([_step("\$f(2) = 5\$, \$f'(x) = 2x\$, \$f'(2) = 4\$."), _step("\$T : y = 4(x - 2) + 5 = 4x - 3\$.")], finalAnswerFr: r"$y = 4x - 3$")),
          _q(2, "Tangente horizontale ?", 2, _sol([_step("\$f'(x) = 0 \\iff x = 0\$. \$f(0) = 1\$. Point : \$(0, 1)\$.")], finalAnswerFr: r"$(0, 1)$")),
        ]),
        _ex(4, 'Optimisation', 5, "Une boîte ouverte sur le dessus a un carré de côté \$x\$ comme base et hauteur \$10 - x\$. Volume \$V(x) = x^2 (10 - x)\$.", [
          _q(1, "Domaine et \$V'(x)\$.", 3, _sol([_step("Domaine : \$0 < x < 10\$."), _step("\$V' = 2x(10-x) + x^2 \\cdot (-1) = 20x - 3x^2 = x(20 - 3x)\$.")], finalAnswerFr: r"$V' = x(20 - 3x)$")),
          _q(2, "Volume maximal.", 2, _sol([_step("\$V' = 0 \\iff x = 0\$ ou \$x = 20/3 \\approx 6{,}67\$."), _step("\$V(20/3) = (400/9)(10/3) = 4000/27 \\approx 148\\,\\text{cm}^3\$.")], finalAnswerFr: r"$\approx 148$ cm³")),
        ]),
      ]);

Map<String, dynamic> _svtExpLnCombined() => _paper(
      titleFr: 'Épreuve type — Exponentielle et logarithme (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Propriétés algébriques, équations, applications.",
      exercices: [
        _ex(1, 'Calculs', 5, "Simplifier ou résoudre.", [
          _q(1, "\$\\ln 4 - \\ln 2\$.", 1, _sol([_step("\$\\ln(4/2) = \\ln 2\$.")], finalAnswerFr: r"$\ln 2$")),
          _q(2, "\$e^{\\ln 5}\$.", 1, _sol([_step("\$e^{\\ln x} = x\$ → résultat = 5.")], finalAnswerFr: r"$5$")),
          _q(3, "Résoudre \$e^x = 3\$.", 2, _sol([_step("\$x = \\ln 3 \\approx 1{,}099\$.")], finalAnswerFr: r"$x = \ln 3$")),
          _q(4, "Résoudre \$\\ln(x - 1) = 0\$.", 1, _sol([_step("\$x - 1 = e^0 = 1 \\iff x = 2\$ (avec \$x > 1\$ ✓).")], finalAnswerFr: r"$x = 2$")),
        ]),
        _ex(2, 'Étude de \$f(x) = x e^{-x}\$', 5, "Sur \$\\mathbb{R}\$.", [
          _q(1, "\$f'(x)\$.", 2, _sol([_step("\$f' = e^{-x} - x e^{-x} = (1 - x) e^{-x}\$.")], finalAnswerFr: r"$(1-x) e^{-x}$")),
          _q(2, "Variations et extremum.", 2, _sol([_step("\$e^{-x} > 0\$ → signe = signe de \$(1-x)\$. Max en \$x = 1\$, \$f(1) = 1/e \\approx 0{,}37\$.")], finalAnswerFr: r"Max $1/e$ en $x=1$")),
          _q(3, "\$\\lim_{+\\infty} f\$ ?", 1, _sol([_step("\$x/e^x \\to 0\$ par croissances comparées.")], finalAnswerFr: r"$0$")),
        ]),
        _ex(3, 'Décroissance radioactive', 5, "\$N(t) = N_0 e^{-\\lambda t}\$ avec \$\\lambda = 0{,}1\\,\\text{an}^{-1}\$.", [
          _q(1, "Demi-vie.", 2, _sol([_step("\$t_{1/2} = \\ln 2 / \\lambda = 0{,}693/0{,}1 \\approx 6{,}93\\,\\text{ans}\$.")], finalAnswerFr: r"$\approx 6{,}93$ ans")),
          _q(2, "Temps pour 99% de disparition.", 3, _sol([_step("\$N/N_0 = 0{,}01 \\iff t = \\ln 100/\\lambda = 4{,}605/0{,}1 \\approx 46\\,\\text{ans}\$.")], finalAnswerFr: r"$\approx 46$ ans")),
        ]),
        _ex(4, 'Équation \$e^{2x} - e^x - 6 = 0\$', 5, "Résoudre dans \$\\mathbb{R}\$.", [
          _q(1, "Poser \$X = e^x\$.", 2, _sol([_step("\$X > 0\$. Équation : \$X^2 - X - 6 = 0\$.")], finalAnswerFr: r"$X^2 - X - 6 = 0$")),
          _q(2, "Résoudre.", 3, _sol([_step("\$\\Delta = 1 + 24 = 25\$. \$X = (1 \\pm 5)/2 = 3\$ ou \$-2\$ (exclu)."), _step("\$e^x = 3 \\iff x = \\ln 3\$.")], finalAnswerFr: r"$x = \ln 3$")),
        ]),
      ]);

Map<String, dynamic> _svtIntegralBasics() => _paper(
      titleFr: 'Épreuve type — Primitives et intégrales (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Primitives, calcul d'intégrales, aires.",
      exercices: [
        _ex(1, 'Primitives', 5, "Donner une primitive.", [
          _q(1, "\$f(x) = 3 x^2 - 2x + 1\$.", 1, _sol([_step("\$F(x) = x^3 - x^2 + x + C\$.")], finalAnswerFr: r"$x^3 - x^2 + x + C$")),
          _q(2, "\$g(x) = e^{2x}\$.", 1, _sol([_step("\$G(x) = e^{2x}/2 + C\$.")], finalAnswerFr: r"$e^{2x}/2 + C$")),
          _q(3, "\$h(x) = 1/x\$ sur \$]0, +\\infty[\$.", 1, _sol([_step("\$H(x) = \\ln x + C\$.")], finalAnswerFr: r"$\ln x + C$")),
          _q(4, "\$k(x) = 2x/(x^2 + 1)\$.", 2, _sol([_step("Forme \$u'/u\$ avec \$u = x^2 + 1\$. \$K(x) = \\ln(x^2 + 1) + C\$.")], finalAnswerFr: r"$\ln(x^2+1) + C$")),
        ]),
        _ex(2, 'Intégrales', 5, "Calculer.", [
          _q(1, "\$\\int_0^2 (x^2 + 1)\\,dx\$.", 2, _sol([_step("\$[x^3/3 + x]_0^2 = 8/3 + 2 = 14/3\$.")], finalAnswerFr: r"$14/3$")),
          _q(2, "\$\\int_0^1 e^x\\,dx\$.", 1, _sol([_step("\$[e^x]_0^1 = e - 1 \\approx 1{,}72\$.")], finalAnswerFr: r"$e - 1$")),
          _q(3, "\$\\int_1^e 1/x\\,dx\$.", 1, _sol([_step("\$[\\ln x]_1^e = 1 - 0 = 1\$.")], finalAnswerFr: r"$1$")),
          _q(4, "\$\\int_0^{\\pi/2} \\sin x\\,dx\$.", 1, _sol([_step("\$[-\\cos x]_0^{\\pi/2} = 0 - (-1) = 1\$.")], finalAnswerFr: r"$1$")),
        ]),
        _ex(3, 'Aire', 5, "Aire sous la courbe \$y = x^2\$ entre 0 et 3.", [
          _q(1, "Calcul.", 2, _sol([_step("\$\\int_0^3 x^2\\,dx = [x^3/3]_0^3 = 9\$ unités d'aire.")], finalAnswerFr: r"$A = 9$")),
          _q(2, "Aire entre \$y = x^2\$ et \$y = x\$ sur \$[0, 1]\$.", 3, _sol([_step("Sur \$[0, 1]\$, \$x \\ge x^2\$. Aire \$= \\int_0^1 (x - x^2)\\,dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6\$.")], finalAnswerFr: r"$1/6$")),
        ]),
        _ex(4, 'Application — distance', 5, "Vitesse \$v(t) = 3 t^2 + 2\$ (m/s) entre \$t = 0\$ et \$t = 4\$ s.", [
          _q(1, "Distance parcourue ?", 3, _sol([_step("Distance = \$\\int_0^4 v(t)\\,dt = [t^3 + 2t]_0^4 = 64 + 8 = 72\\,\\text{m}\$.")], finalAnswerFr: r"$72$ m")),
          _q(2, "Vitesse moyenne ?", 2, _sol([_step("\$\\bar v = 72/4 = 18\\,\\text{m/s}\$.")], finalAnswerFr: r"$18$ m/s")),
        ]),
      ]);

// ============================================================================
// SVT Physique-Chimie (8)
// ============================================================================

Map<String, dynamic> _svtNewtonApps() => _paper(
      titleFr: 'Épreuve type — Lois de Newton (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Applications simples des lois de Newton.",
      exercices: [
        _ex(1, 'Équilibre', 5, "Caisse 20 kg suspendue par une corde verticale. \$g = 10\\,\\text{m/s}^2\$.", [
          _q(1, "Bilan et tension.", 3, _sol([_step("Forces : poids \$\\vec P\$ (descendant, \$P = 200\\,\\text{N}\$) et tension \$\\vec T\$ (montante)."), _step("Équilibre : \$T = P = 200\\,\\text{N}\$.")], finalAnswerFr: r"$T = 200$ N")),
          _q(2, "Si la corde fait un angle de 30° avec la verticale (un seul fil oblique).", 2, _sol([_step("Composante verticale de \$T\$ : \$T \\cos 30° = P \\iff T = 200/\\cos 30° \\approx 231\\,\\text{N}\$.")], finalAnswerFr: r"$T \approx 231$ N")),
        ]),
        _ex(2, 'Chute libre', 5, "Pierre lâchée sans vitesse initiale d'une hauteur 45 m. \$g = 10\\,\\text{m/s}^2\$.", [
          _q(1, "Durée de chute.", 2, _sol([_step("\$h = (1/2) g t^2 \\iff t = \\sqrt{2 h/g} = \\sqrt{9} = 3\\,\\text{s}\$.")], finalAnswerFr: r"$t = 3$ s")),
          _q(2, "Vitesse à l'impact.", 2, _sol([_step("\$v = g t = 30\\,\\text{m/s} = 108\\,\\text{km/h}\$.")], finalAnswerFr: r"$v = 30$ m/s")),
          _q(3, "Énergie cinétique pour \$m = 2\\,\\text{kg}\$.", 1, _sol([_step("\$E_c = 0{,}5 \\times 2 \\times 900 = 900\\,\\text{J}\$.")], finalAnswerFr: r"$900$ J")),
        ]),
        _ex(3, 'Plan incliné', 5, "Bloc 5 kg sur plan à 30°, sans frottement. \$g = 10\$.", [
          _q(1, "Accélération.", 3, _sol([_step("Projection selon le plan : \$m a = m g \\sin\\alpha\$, donc \$a = g \\sin 30° = 5\\,\\text{m/s}^2\$.")], finalAnswerFr: r"$a = 5$ m/s²")),
          _q(2, "Vitesse après 2 s, départ repos.", 2, _sol([_step("\$v = a t = 10\\,\\text{m/s}\$.")], finalAnswerFr: r"$v = 10$ m/s")),
        ]),
        _ex(4, 'Poulie idéale', 5, "Deux blocs \$m_1 = 4\\,\\text{kg}\$, \$m_2 = 2\\,\\text{kg}\$ reliés par un fil sur une poulie.", [
          _q(1, "Accélération et tension.", 4, _sol([_step("Bloc 1 (descend) : \$m_1 g - T = m_1 a \\Rightarrow 40 - T = 4a\$."), _step("Bloc 2 (monte) : \$T - m_2 g = m_2 a \\Rightarrow T - 20 = 2a\$."), _step("Somme : \$20 = 6a \\Rightarrow a = 3{,}33\\,\\text{m/s}^2\$. \$T = 20 + 2 \\times 3{,}33 = 26{,}67\\,\\text{N}\$.")], finalAnswerFr: r"$a \approx 3{,}33$ m/s², $T \approx 26{,}67$ N")),
          _q(2, "Pourquoi \$T < m_1 g\$ ?", 1, _sol([_step("Sinon le bloc 1 ne descendrait pas. \$T\$ s'oppose à la chute mais ne la compense pas entièrement.")], finalAnswerFr: r"car bloc descend")),
        ]),
      ]);

Map<String, dynamic> _svtEnergy() => _paper(
      titleFr: 'Épreuve type — Énergie mécanique (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Énergie cinétique, potentielle, conservation.",
      exercices: [
        _ex(1, 'Calculs', 5, "\$g = 10\\,\\text{m/s}^2\$.", [
          _q(1, "\$E_c\$ d'une voiture 1000 kg à 90 km/h.", 2, _sol([_step("\$v = 25\\,\\text{m/s}\$. \$E_c = 0{,}5 \\times 1000 \\times 625 = 312500\\,\\text{J} = 312{,}5\\,\\text{kJ}\$.")], finalAnswerFr: r"$312{,}5$ kJ")),
          _q(2, "\$E_p\$ d'un objet 5 kg à 20 m.", 1, _sol([_step("\$E_p = m g h = 5 \\times 10 \\times 20 = 1000\\,\\text{J}\$.")], finalAnswerFr: r"$1000$ J")),
          _q(3, "Conversion : à quelle hauteur l'objet (5 kg) aura-t-il \$E_p = 1000\\,\\text{J}\$ d'\$E_c\$ ?", 2, _sol([_step("Conservation : \$mgh = (1/2) m v^2 \\Rightarrow v = \\sqrt{2 g h} = 20\\,\\text{m/s}\$.")], finalAnswerFr: r"$v = 20$ m/s")),
        ]),
        _ex(2, 'Toboggan', 5, "Enfant 30 kg lâché du haut d'un toboggan de hauteur 3 m, sans frottement.", [
          _q(1, "Vitesse en bas.", 3, _sol([_step("Conservation : \$v = \\sqrt{2gh} = \\sqrt{60} \\approx 7{,}75\\,\\text{m/s} \\approx 28\\,\\text{km/h}\$.")], finalAnswerFr: r"$\approx 7{,}75$ m/s")),
          _q(2, "Avec frottement, vitesse réelle = 5 m/s. Énergie dissipée ?", 2, _sol([_step("\$E_m^\\text{haut} = mgh = 900\\,\\text{J}\$. \$E_c^\\text{bas} = 0{,}5 \\times 30 \\times 25 = 375\\,\\text{J}\$."), _step("Dissipée : \$900 - 375 = 525\\,\\text{J}\$.")], finalAnswerFr: r"$525$ J")),
        ]),
        _ex(3, 'Ressort', 5, "Ressort \$k = 200\\,\\text{N/m}\$, comprimé de 5 cm, libéré pour propulser une bille de 100 g.", [
          _q(1, "Énergie potentielle élastique stockée.", 2, _sol([_step("\$E_{pe} = (1/2) k x^2 = 0{,}5 \\times 200 \\times 0{,}0025 = 0{,}25\\,\\text{J}\$.")], finalAnswerFr: r"$0{,}25$ J")),
          _q(2, "Vitesse maximale de la bille.", 3, _sol([_step("Conservation : \$(1/2) m v^2 = 0{,}25 \\Rightarrow v = \\sqrt{0{,}5/0{,}1} = \\sqrt 5 \\approx 2{,}24\\,\\text{m/s}\$.")], finalAnswerFr: r"$\approx 2{,}24$ m/s")),
        ]),
        _ex(4, 'TEC avec frottement', 5, "Caisse 20 kg tirée par F = 50 N sur 10 m, frottement 10 N.", [
          _q(1, "Travail total et vitesse finale (départ repos).", 4, _sol([_step("\$W_F = 50 \\times 10 = 500\\,\\text{J}\$. \$W_f = -10 \\times 10 = -100\\,\\text{J}\$. \$W_\\text{total} = 400\\,\\text{J}\$."), _step("TEC : \$\\Delta E_c = 400 \\Rightarrow v = \\sqrt{800/20} = \\sqrt{40} \\approx 6{,}32\\,\\text{m/s}\$.")], finalAnswerFr: r"$v \approx 6{,}32$ m/s")),
        ]),
      ]);

Map<String, dynamic> _svtWaves() => _paper(
      titleFr: 'Épreuve type — Ondes (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Célérité, longueur d'onde, types d'ondes.",
      exercices: [
        _ex(1, 'Vocabulaire et relations', 5, "Onde sur une corde de fréquence 50 Hz, célérité 20 m/s.", [
          _q(1, "Période \$T\$ et longueur d'onde \$\\lambda\$.", 2, _sol([_step("\$T = 1/f = 20\\,\\text{ms}\$. \$\\lambda = v/f = 0{,}4\\,\\text{m}\$.")], finalAnswerFr: r"$T = 20$ ms, $\lambda = 0{,}4$ m")),
          _q(2, "Distance entre deux maxima consécutifs.", 1, _sol([_step("\$= \\lambda = 0{,}4\\,\\text{m}\$.")], finalAnswerFr: r"$0{,}4$ m")),
          _q(3, "Si f est doublée (v inchangée), comment varie \$\\lambda\$ ?", 2, _sol([_step("\$\\lambda \\propto 1/f\$ → divisée par 2. Nouvelle \$\\lambda = 0{,}2\\,\\text{m}\$.")], finalAnswerFr: r"divisée par 2")),
        ]),
        _ex(2, 'Son', 5, "Vitesse du son ≈ 340 m/s dans l'air.", [
          _q(1, "Distance d'un éclair : 3 s entre éclair et tonnerre.", 2, _sol([_step("\$d = v t = 340 \\times 3 = 1020\\,\\text{m} \\approx 1\\,\\text{km}\$.")], finalAnswerFr: r"$\approx 1$ km")),
          _q(2, "Pourquoi entend-on le tonnerre après l'éclair ?", 2, _sol([_step("Lumière instantanée à l'échelle humaine (\$c = 3 \\times 10^8\\,\\text{m/s}\$), son très lent (340 m/s).")], finalAnswerFr: r"v_lumière >> v_son")),
          _q(3, "Onde sonore : transversale ou longitudinale ?", 1, _sol([_step("**Longitudinale** : oscillation des molécules d'air parallèle à la propagation.")], finalAnswerFr: r"longitudinale")),
        ]),
        _ex(3, 'Lumière et spectre', 5, "Spectre visible : 400-700 nm.", [
          _q(1, "Fréquence d'une lumière à \$\\lambda = 600\\,\\text{nm}\$.", 2, _sol([_step("\$f = c/\\lambda = 3 \\times 10^8 / 6 \\times 10^{-7} = 5 \\times 10^{14}\\,\\text{Hz}\$.")], finalAnswerFr: r"$5 \times 10^{14}$ Hz")),
          _q(2, "Couleur correspondante.", 1, _sol([_step("**Orange**. Le visible va du violet (~400 nm) au rouge (~700 nm).")], finalAnswerFr: r"orange")),
          _q(3, "Plus une couleur a une longueur d'onde courte, plus son énergie est :", 2, _sol([_step("**Élevée**. \$E = h f = h c/\\lambda \\propto 1/\\lambda\$. Violet plus énergétique que rouge.")], finalAnswerFr: r"élevée")),
        ]),
        _ex(4, 'Diffraction', 5, "Laser \$\\lambda = 633\\,\\text{nm}\$ traverse une fente \$a = 0{,}2\\,\\text{mm}\$, écran à \$D = 2\\,\\text{m}\$.", [
          _q(1, "Demi-largeur de la tache centrale.", 3, _sol([_step("\$\\theta \\approx \\lambda/a = 6{,}33 \\times 10^{-7}/2 \\times 10^{-4} = 3{,}17 \\times 10^{-3}\\,\\text{rad}\$."), _step("\$\\ell = D \\theta = 2 \\times 3{,}17 \\times 10^{-3} \\approx 6{,}33\\,\\text{mm}\$.")], finalAnswerFr: r"$\approx 6{,}3$ mm")),
          _q(2, "Effet de réduire la fente ?", 2, _sol([_step("\$\\theta \\propto 1/a\$ → tache plus large. Contre-intuitif mais essentiel.")], finalAnswerFr: r"tache plus large")),
        ]),
      ]);

Map<String, dynamic> _svtRadioactivityBasics() => _paper(
      titleFr: 'Épreuve type — Radioactivité et datation (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Désintégrations, demi-vie, datation.",
      exercices: [
        _ex(1, 'Désintégrations', 5, "Écrire les équations.", [
          _q(1, "Désintégration \$\\alpha\$ de \$^{226}_{88}\\text{Ra}\$.", 2, _sol([_step("\$^{226}_{88}\\text{Ra} \\to ^{222}_{86}\\text{Rn} + ^4_2\\text{He}\$ (lois de Soddy)."), _step("Le radon-222 est produit (gaz radioactif présent dans certains sous-sols).")], finalAnswerFr: r"$\to ^{222}_{86}Rn + ^4_2He$")),
          _q(2, "Désintégration \$\\beta^-\$ de \$^{14}_6\\text{C}\$.", 2, _sol([_step("\$^{14}_6\\text{C} \\to ^{14}_7\\text{N} + ^0_{-1}e\$. \$A\$ inchangé, \$Z\$ augmente de 1.")], finalAnswerFr: r"$\to ^{14}_7N + e^-$")),
          _q(3, "Différence entre \$\\alpha\$ et \$\\gamma\$.", 1, _sol([_step("\$\\alpha\$ = particule matérielle (noyau He), perte de masse. \$\\gamma\$ = photon (rayonnement EM), pas de perte de masse, juste désexcitation.")], finalAnswerFr: r"$\alpha$ massive, $\gamma$ photon")),
        ]),
        _ex(2, 'Loi de décroissance', 5, "Source de \$10^{10}\$ noyaux, demi-vie 4 jours.", [
          _q(1, "Constante \$\\lambda\$.", 1, _sol([_step("\$\\lambda = \\ln 2/4 \\approx 0{,}173\\,\\text{jour}^{-1}\$.")], finalAnswerFr: r"$\approx 0{,}173$ /jour")),
          _q(2, "Noyaux restants après 12 jours.", 2, _sol([_step("\$12 = 3 \\times t_{1/2}\$ → \$N = N_0/2^3 = 10^{10}/8 = 1{,}25 \\times 10^9\$.")], finalAnswerFr: r"$1{,}25 \times 10^9$")),
          _q(3, "Activité initiale en Bq.", 2, _sol([_step("Convertir \$\\lambda\$ en \$\\text{s}^{-1}\$ : \$0{,}173/86400 \\approx 2 \\times 10^{-6}\\,\\text{s}^{-1}\$."), _step("\$A_0 = \\lambda N_0 = 2 \\times 10^{-6} \\times 10^{10} = 2 \\times 10^4\\,\\text{Bq} = 20\\,\\text{kBq}\$.")], finalAnswerFr: r"$\approx 20$ kBq")),
        ]),
        _ex(3, 'Datation au C14', 5, "Demi-vie = 5730 ans. Activité initiale 13,6 Bq/g de carbone.", [
          _q(1, "Échantillon archéologique à 3,4 Bq/g. Âge ?", 3, _sol([_step("\$A/A_0 = 3{,}4/13{,}6 = 0{,}25 = 1/4\$ → 2 demi-vies."), _step("Âge = \$2 \\times 5730 = 11\\,460\\,\\text{ans}\$.")], finalAnswerFr: r"$\approx 11\,460$ ans")),
          _q(2, "Pourquoi le C14 limite-t-il la datation à ~50 000 ans ?", 2, _sol([_step("Après ~9 demi-vies, \$A/A_0 < 0{,}2\\%\$ — sous le seuil de détection."), _step("Au-delà, utiliser K-Ar, U-Pb pour les roches.")], finalAnswerFr: r"~9 demi-vies max")),
        ]),
        _ex(4, 'Datation U-Pb', 5, "Roche : on mesure le rapport \$^{206}\\text{Pb}/^{238}\\text{U} = 0{,}5\$. Demi-vie \$U-238 = 4{,}5 \\times 10^9\$ ans.", [
          _q(1, "Comment relier ce rapport à l'âge ?", 3, _sol([_step("Si \$N_0\$ atomes d'U au départ, après temps \$t\$ : \$N_U = N_0 e^{-\\lambda t}\$, et atomes de Pb produits : \$N_{Pb} = N_0 - N_U\$."), _step("\$N_{Pb}/N_U = e^{\\lambda t} - 1 = 0{,}5 \\iff e^{\\lambda t} = 1{,}5 \\iff t = \\ln 1{,}5/\\lambda\$.")], finalAnswerFr: r"$t = \ln 1{,}5/\lambda$")),
          _q(2, "Calcul numérique.", 2, _sol([_step("\$\\lambda = \\ln 2/(4{,}5 \\times 10^9)\$."), _step("\$t = \\ln 1{,}5 \\cdot 4{,}5 \\times 10^9/\\ln 2 = 0{,}405 \\times 4{,}5 \\times 10^9/0{,}693 \\approx 2{,}6 \\times 10^9\\,\\text{ans}\$.")], finalAnswerFr: r"$\approx 2{,}6$ Ga")),
        ]),
      ]);

Map<String, dynamic> _svtRcCircuit() => _paper(
      titleFr: 'Épreuve type — Dipôle RC (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Charge, décharge, constante de temps.",
      exercices: [
        _ex(1, 'Charge', 5, "\$E = 10\\,\\text{V}\$, \$R = 1\\,\\text{k}\\Omega\$, \$C = 100\\,\\mu\\text{F}\$.", [
          _q(1, "Constante de temps.", 1, _sol([_step("\$\\tau = R C = 10^3 \\times 10^{-4} = 0{,}1\\,\\text{s} = 100\\,\\text{ms}\$.")], finalAnswerFr: r"$\tau = 100$ ms")),
          _q(2, "Expression de \$u_C(t)\$.", 1, _sol([_step("\$u_C(t) = 10(1 - e^{-t/0{,}1})\\,\\text{V}\$.")], finalAnswerFr: r"$10(1 - e^{-10t})$")),
          _q(3, "Temps pour atteindre 95% de \$E\$.", 2, _sol([_step("\$t \\approx 3\\tau = 0{,}3\\,\\text{s}\$ (règle pratique).")], finalAnswerFr: r"$\approx 0{,}3$ s")),
          _q(4, "Énergie stockée à plein chargement.", 1, _sol([_step("\$E_C = (1/2) C U^2 = 0{,}5 \\times 10^{-4} \\times 100 = 5\\,\\text{mJ}\$.")], finalAnswerFr: r"$5$ mJ")),
        ]),
        _ex(2, 'Décharge', 5, "Le même condensateur, chargé à 10 V, se décharge dans une résistance de 2 kΩ.", [
          _q(1, "Nouvelle constante de temps.", 1, _sol([_step("\$\\tau' = 2000 \\times 10^{-4} = 0{,}2\\,\\text{s}\$.")], finalAnswerFr: r"$200$ ms")),
          _q(2, "Tension à \$t = \\tau'\$.", 2, _sol([_step("\$u_C = 10 e^{-1} \\approx 3{,}68\\,\\text{V}\$.")], finalAnswerFr: r"$\approx 3{,}68$ V")),
          _q(3, "Temps de demi-décharge.", 2, _sol([_step("\$u_C = 5 \\iff t = \\tau' \\ln 2 \\approx 0{,}14\\,\\text{s}\$.")], finalAnswerFr: r"$\approx 0{,}14$ s")),
        ]),
        _ex(3, 'Mesure de C', 5, "On observe une décharge : 6 V à 3 V en 1,2 s avec R = 5 kΩ.", [
          _q(1, "Constante \$\\tau\$.", 2, _sol([_step("Temps de demi-décharge \$t_{1/2} = 1{,}2 = \\tau \\ln 2 \\iff \\tau = 1{,}2/0{,}693 \\approx 1{,}73\\,\\text{s}\$.")], finalAnswerFr: r"$\approx 1{,}73$ s")),
          _q(2, "Valeur de C.", 2, _sol([_step("\$C = \\tau/R = 1{,}73/5000 \\approx 3{,}5 \\times 10^{-4}\\,\\text{F} = 350\\,\\mu\\text{F}\$.")], finalAnswerFr: r"$\approx 350$ μF")),
          _q(3, "Méthode standard ?", 1, _sol([_step("Chronométrer la chute à mi-amplitude est la méthode standard de mesure de \$\\tau\$.")], finalAnswerFr: r"chronométrage $t_{1/2}$")),
        ]),
        _ex(4, 'Application — flash', 5, "Flash : \$C = 1000\\,\\mu\\text{F}\$, chargé à 250 V, décharge en 2 ms.", [
          _q(1, "Énergie disponible.", 2, _sol([_step("\$E = (1/2) C U^2 = 0{,}5 \\times 10^{-3} \\times 62500 = 31{,}25\\,\\text{J}\$.")], finalAnswerFr: r"$\approx 31$ J")),
          _q(2, "Puissance moyenne pendant le flash.", 2, _sol([_step("\$P = E/t = 31{,}25/0{,}002 \\approx 15{,}6\\,\\text{kW}\$.")], finalAnswerFr: r"$\approx 15{,}6$ kW")),
          _q(3, "Résistance équivalente du tube ?", 1, _sol([_step("\$\\tau = RC = 2\\,\\text{ms} \\Rightarrow R = 2\\,\\Omega\$.")], finalAnswerFr: r"$\approx 2$ Ω")),
        ]),
      ]);

Map<String, dynamic> _svtPh() => _paper(
      titleFr: 'Épreuve type — pH et solutions (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Calcul de pH, acides forts et faibles.",
      exercices: [
        _ex(1, 'Calculs de pH', 5, "À 25°C, \$K_e = 10^{-14}\$.", [
          _q(1, "pH d'une solution de HCl à 0,01 mol/L.", 1, _sol([_step("Acide fort : \$pH = -\\log 0{,}01 = 2\$.")], finalAnswerFr: r"$pH = 2$")),
          _q(2, "pH d'une solution de NaOH à \$10^{-3}\$ mol/L.", 2, _sol([_step("\$[\\text{OH}^-] = 10^{-3}\$. \$[\\text{H}_3\\text{O}^+] = 10^{-11}\$. \$pH = 11\$.")], finalAnswerFr: r"$pH = 11$")),
          _q(3, "pH après dilution × 10 d'une solution acide à pH = 3.", 2, _sol([_step("Acide fort : \$[\\text{H}_3\\text{O}^+]\$ divisée par 10 → pH augmente de 1 → \$pH = 4\$.")], finalAnswerFr: r"$pH = 4$")),
        ]),
        _ex(2, 'Acide faible', 5, "Acide acétique, pKa = 4,75, \$C_0 = 0{,}1\\,\\text{mol/L}\$.", [
          _q(1, "pH par formule simplifiée.", 2, _sol([_step("\$pH \\approx (pKa - \\log C_0)/2 = (4{,}75 + 1)/2 = 2{,}875\$.")], finalAnswerFr: r"$\approx 2{,}88$")),
          _q(2, "Taux de dissociation \$\\alpha\$.", 2, _sol([_step("\$[\\text{H}_3\\text{O}^+] = 10^{-2{,}88} \\approx 1{,}33 \\times 10^{-3}\\,\\text{mol/L}\$. \$\\alpha = 1{,}33 \\times 10^{-3}/0{,}1 \\approx 1{,}3\\%\$.")], finalAnswerFr: r"$\approx 1{,}3\%$")),
          _q(3, "L'acide est-il fortement ou faiblement dissocié ?", 1, _sol([_step("Faiblement (1,3% ≪ 100%). Cohérent avec l'approximation utilisée.")], finalAnswerFr: r"faiblement")),
        ]),
        _ex(3, 'Tampon', 5, "Mélange CH₃COOH (0,1 mol/L) + CH₃COONa (0,1 mol/L), pKa = 4,75.", [
          _q(1, "pH par Henderson-Hasselbalch.", 2, _sol([_step("\$pH = pKa + \\log([\\text{A}^-]/[\\text{HA}]) = 4{,}75 + \\log 1 = 4{,}75\$.")], finalAnswerFr: r"$pH = 4{,}75$")),
          _q(2, "Caractère tampon : ajout d'acide fort.", 2, _sol([_step("Les ions \$\\text{H}_3\\text{O}^+\$ ajoutés sont consommés par \$\\text{A}^-\$. Le rapport \$[\\text{A}^-]/[\\text{HA}]\$ varie peu → pH varie peu.")], finalAnswerFr: r"pH stable")),
          _q(3, "Pour avoir pH = 5,75, rapport ?", 1, _sol([_step("\$5{,}75 = 4{,}75 + \\log r \\iff r = 10\$. \$[\\text{A}^-] = 10 \\times [\\text{HA}]\$.")], finalAnswerFr: r"$[A^-]/[HA] = 10$")),
        ]),
        _ex(4, 'Prédominance', 5, "Couple \$\\text{NH}_4^+/\\text{NH}_3\$, pKa = 9,25.", [
          _q(1, "Diagramme de prédominance.", 2, _sol([_step("\$pH < pKa\$ : NH₄⁺ majoritaire. \$pH > pKa\$ : NH₃ majoritaire.")], finalAnswerFr: r"frontière à pKa")),
          _q(2, "À pH = 7, quelle forme prédomine ?", 1, _sol([_step("\$pH = 7 < 9{,}25\$ → \$\\text{NH}_4^+\$ majoritaire.")], finalAnswerFr: r"NH₄⁺")),
          _q(3, "À quel pH \$[\\text{NH}_3] = [\\text{NH}_4^+]\$ ?", 2, _sol([_step("À \$pH = pKa = 9{,}25\$.")], finalAnswerFr: r"$pH = 9{,}25$")),
        ]),
      ]);

Map<String, dynamic> _svtRedoxBasics() => _paper(
      titleFr: 'Épreuve type — Oxydoréduction (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Couples redox, piles, Faraday.",
      exercices: [
        _ex(1, 'Demi-équations', 5, "Écrire les demi-équations.", [
          _q(1, "Couple Cu²⁺/Cu.", 1, _sol([_step("\$\\text{Cu}^{2+} + 2 e^- \\rightleftharpoons \\text{Cu}\$.")], finalAnswerFr: r"$Cu^{2+} + 2e^- \to Cu$")),
          _q(2, "Couple Fe³⁺/Fe²⁺.", 1, _sol([_step("\$\\text{Fe}^{3+} + e^- \\rightleftharpoons \\text{Fe}^{2+}\$.")], finalAnswerFr: r"$Fe^{3+} + e^- \to Fe^{2+}$")),
          _q(3, "Bilan global Zn + Cu²⁺.", 3, _sol([_step("Anode : \$\\text{Zn} \\to \\text{Zn}^{2+} + 2 e^-\$. Cathode : \$\\text{Cu}^{2+} + 2 e^- \\to \\text{Cu}\$."), _step("Bilan : \$\\text{Zn} + \\text{Cu}^{2+} \\to \\text{Zn}^{2+} + \\text{Cu}\$.")], finalAnswerFr: r"$Zn + Cu^{2+} \to Zn^{2+} + Cu$")),
        ]),
        _ex(2, 'Pile Daniell', 5, "Pile Zn|Zn²⁺ ‖ Cu²⁺|Cu, courant 50 mA.", [
          _q(1, "fem théorique.", 1, _sol([_step("\$E = E°(Cu^{2+}/Cu) - E°(Zn^{2+}/Zn) = 0{,}34 - (-0{,}76) = 1{,}10\\,\\text{V}\$.")], finalAnswerFr: r"$1{,}10$ V")),
          _q(2, "Quantité d'électricité après 1 h.", 2, _sol([_step("\$Q = I t = 0{,}05 \\times 3600 = 180\\,\\text{C}\$.")], finalAnswerFr: r"$180$ C")),
          _q(3, "Masse de Cu déposée (M = 63,5 g/mol, F = 96500).", 3, _sol([_step("\$n_e = Q/F = 180/96500 \\approx 1{,}87 \\times 10^{-3}\\,\\text{mol}\$."), _step("\$n_{Cu} = n_e/2 = 9{,}3 \\times 10^{-4}\\,\\text{mol}\$. \$m = 9{,}3 \\times 10^{-4} \\times 63{,}5 \\approx 59\\,\\text{mg}\$.")], finalAnswerFr: r"$\approx 59$ mg")),
        ]),
        _ex(3, 'Corrosion du fer', 5, "Le fer rouille en présence d'humidité et d'oxygène.", [
          _q(1, "Demi-équations.", 3, _sol([_step("Oxydation : \$\\text{Fe} \\to \\text{Fe}^{2+} + 2 e^-\$."), _step("Réduction : \$\\text{O}_2 + 2 \\text{H}_2\\text{O} + 4 e^- \\to 4 \\text{OH}^-\$."), _step("Le Fe²⁺ s'oxyde ensuite en Fe³⁺ → rouille (oxyde hydraté de fer III).")], finalAnswerFr: r"oxydation Fe, réduction $O_2$")),
          _q(2, "Comment protéger ? 3 méthodes.", 2, _sol([_step("(1) Peinture ou plastification (barrière physique). (2) Galvanisation (zinc, anode sacrificielle). (3) Protection cathodique (Mg ou Zn relié au fer, qui s'oxyde à sa place).")], finalAnswerFr: r"peinture, galva, cathodique")),
        ]),
        _ex(4, 'Électrolyse', 5, "Électrolyse de CuSO₄ avec électrodes inertes, I = 0,5 A pendant 30 min.", [
          _q(1, "Quels sont les produits à chaque électrode ?", 3, _sol([_step("Cathode (-) : \$\\text{Cu}^{2+} + 2 e^- \\to \\text{Cu}\$, dépôt de cuivre."), _step("Anode (+) : \$2 \\text{H}_2\\text{O} \\to \\text{O}_2 + 4 \\text{H}^+ + 4 e^-\$, dégagement d'oxygène.")], finalAnswerFr: r"Cu à cathode, $O_2$ à anode")),
          _q(2, "Masse de Cu déposée.", 2, _sol([_step("\$Q = I t = 0{,}5 \\times 1800 = 900\\,\\text{C}\$. \$n_e = 9{,}33 \\times 10^{-3}\\,\\text{mol}\$. \$n_{Cu} = 4{,}66 \\times 10^{-3}\$. \$m = 4{,}66 \\times 10^{-3} \\times 63{,}5 \\approx 296\\,\\text{mg}\$.")], finalAnswerFr: r"$\approx 296$ mg")),
        ]),
      ]);

Map<String, dynamic> _svtOrganicBasics() => _paper(
      titleFr: 'Épreuve type — Chimie organique — esters (SVT)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Estérification, hydrolyse, saponification.",
      exercices: [
        _ex(1, 'Équations', 5, "Écrire.", [
          _q(1, "Estérification entre acide éthanoïque et éthanol.", 2, _sol([_step("\$\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{CH}_2\\text{OH} \\rightleftharpoons \\text{CH}_3\\text{COO-CH}_2\\text{CH}_3 + \\text{H}_2\\text{O}\$."), _step("Produit : éthanoate d'éthyle + eau.")], finalAnswerFr: r"éthanoate d'éthyle")),
          _q(2, "Caractéristiques de la réaction.", 2, _sol([_step("**Lente, limitée (K≈4), athermique** : T accélère mais ne déplace pas l'équilibre.")], finalAnswerFr: r"lente, limitée, athermique")),
          _q(3, "Catalyseur courant ?", 1, _sol([_step("H₂SO₄ concentré (catalyseur acide).")], finalAnswerFr: r"$H_2SO_4$")),
        ]),
        _ex(2, 'Équilibre', 5, "1 mol acide + 1 mol alcool, K = 4.", [
          _q(1, "Avancement final.", 3, _sol([_step("\$K = \\xi^2/(1-\\xi)^2 = 4 \\iff \\xi/(1-\\xi) = 2 \\iff \\xi = 2/3\$."), _step("67% de rendement.")], finalAnswerFr: r"$\xi = 2/3$, 67%")),
          _q(2, "Avec excès d'alcool (2 mol au lieu de 1).", 2, _sol([_step("\$K = \\xi^2/[(1-\\xi)(2-\\xi)] = 4\$, résolution → \$\\xi \\approx 0{,}85\$. **Rendement augmenté à 85%**.")], finalAnswerFr: r"$\xi \approx 0{,}85$, 85%")),
        ]),
        _ex(3, 'Hydrolyse', 5, "1 mol d'ester + 1 mol d'eau.", [
          _q(1, "Avancement final.", 3, _sol([_step("Même équilibre atteint : 1/3 d'acide et alcool, 2/3 d'ester (vu de l'estérification). Donc 33% d'hydrolyse."), _step("Démonstration : pour l'hydrolyse, K' = 1/K = 0,25. \$(1-\\xi)^2/\\xi^2 = 4 \\iff \\xi = 1/3\$.")], finalAnswerFr: r"$\xi = 1/3$, 33%")),
          _q(2, "Pourquoi 33% d'un côté et 67% de l'autre ?", 2, _sol([_step("Même équilibre atteint quel que soit le sens de départ. 'Avancement' est défini par rapport à l'état initial. Vu de A→B : 67%. Vu de B→A : 33%.")], finalAnswerFr: r"même équilibre")),
        ]),
        _ex(4, 'Saponification', 5, "Hydrolyse basique : ester + soude.", [
          _q(1, "Équation et caractère totale.", 3, _sol([_step("\$\\text{R-COO-R'} + \\text{OH}^- \\to \\text{R-COO}^- + \\text{R'-OH}\$."), _step("**Totale** car le carboxylate est très stable (résonance) et la base \$\\text{OH}^-\$ déplace l'équilibre vers ce produit.")], finalAnswerFr: r"totale")),
          _q(2, "Application industrielle.", 2, _sol([_step("**Fabrication des savons** : saponification des triglycérides (graisses végétales/animales) par la soude → carboxylate de sodium = savon.")], finalAnswerFr: r"savons")),
        ]),
      ]);

// ============================================================================
// SVT bio/geo (12) — NOVEL authoring, SME REVIEW required
// ============================================================================

Map<String, dynamic> _svtGenetiqueHumaine() => _paper(
      titleFr: 'Épreuve type — Génétique humaine (lois de Mendel)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Hérédité monohybride et dihybride, ABO, daltonisme.",
      exercices: [
        _ex(1, 'Monohybridisme', 5, "Couleur des yeux : marron (B) dominant sur bleu (b).", [
          _q(1, "Croisement BB × bb. F1 ?", 2, _sol([_step("100% Bb (hétérozygote, phénotype marron uniforme — 1ère loi de Mendel).")], finalAnswerFr: r"100% Bb, marron")),
          _q(2, "F1 × F1 → F2 ratios ?", 2, _sol([_step("Bb × Bb → 1 BB : 2 Bb : 1 bb."), _step("Phénotypiquement : **3 marron : 1 bleu** (2ème loi).")], finalAnswerFr: r"3:1")),
          _q(3, "Deux parents marron ont un enfant aux yeux bleus. Génotypes ?", 1, _sol([_step("Enfant bb → chaque parent a donné un b → parents Bb (hétérozygotes).")], finalAnswerFr: r"Bb × Bb")),
        ]),
        _ex(2, 'Dihybridisme', 5, "Deux gènes indépendants : couleur (B/b) et taille (T/t, grand/petit).", [
          _q(1, "BbTt × BbTt → F2 ratios.", 3, _sol([_step("3ème loi : assortiment indépendant. F2 phénotypique = \$3:1 \\times 3:1 = 9:3:3:1\$."), _step("9 dominants/dominants : 3 dom/réc : 3 réc/dom : 1 réc/réc.")], finalAnswerFr: r"9:3:3:1")),
          _q(2, "Pourcentage attendu d'enfants aux yeux bleus et petits.", 2, _sol([_step("Récessif/récessif : 1/16 = 6,25%.")], finalAnswerFr: r"6,25%")),
        ]),
        _ex(3, 'Hérédité liée au sexe', 5, "Daltonisme : récessif lié au X (\$X^d\$).", [
          _q(1, "Femme XX, homme XY. Risques chez les fils d'une mère porteuse \$X^D X^d\$ × père sain \$X^D Y\$ ?", 3, _sol([_step("Fils : \$X^d Y\$ (daltoniens) ou \$X^D Y\$ (sains), proba 1/2 chacun."), _step("Donc **50% des fils** sont daltoniens.")], finalAnswerFr: r"50% des fils")),
          _q(2, "Pourquoi le daltonisme est plus fréquent chez les hommes ?", 2, _sol([_step("Un seul X chez l'homme → un seul allèle suffit (XY → \$X^d Y\$ exprime)."), _step("Femme XX → besoin des deux X récessifs (\$X^d X^d\$, rare)."), _step("Femme XX peut être 'porteuse' (\$X^D X^d\$) sans être atteinte.")], finalAnswerFr: r"un seul X")),
        ]),
        _ex(4, 'Groupes sanguins ABO', 5, "Allèles I^A, I^B (codominants) et i (récessif).", [
          _q(1, "Génotypes possibles pour chaque groupe sanguin.", 3, _sol([_step("A : I^A I^A ou I^A i. B : I^B I^B ou I^B i. AB : I^A I^B (codominance). O : ii.")], finalAnswerFr: r"4 groupes, 6 génotypes")),
          _q(2, "Deux parents A et B ont un enfant O. Possible ? Génotypes ?", 2, _sol([_step("Oui si parents I^A i (A) × I^B i (B) → enfant ii (O) possible (proba 1/4).")], finalAnswerFr: r"oui, parents Aa × Bb")),
        ]),
      ]);

Map<String, dynamic> _svtGenetiquePopulations() => _paper(
      titleFr: 'Épreuve type — Génétique des populations (Hardy-Weinberg)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Fréquences alléliques, équilibre de Hardy-Weinberg.",
      exercices: [
        _ex(1, 'Hardy-Weinberg', 5, "Allèles A (dominant) et a (récessif), fréquences p et q.", [
          _q(1, "Donner les fréquences génotypiques à l'équilibre.", 2, _sol([_step("\$f(AA) = p^2\$, \$f(Aa) = 2pq\$, \$f(aa) = q^2\$. Somme = \$(p+q)^2 = 1\$.")], finalAnswerFr: r"$p^2 + 2pq + q^2 = 1$")),
          _q(2, "Conditions de validité.", 3, _sol([_step("Population grande (pas de dérive)."), _step("Pas de sélection (tous les génotypes ont même succès reproductif)."), _step("Pas de mutation. Pas de migration. Accouplement au hasard (panmixie).")], finalAnswerFr: r"5 conditions")),
        ]),
        _ex(2, 'Calculs', 5, "Maladie récessive : 1 personne sur 2500 (\$q^2 = 1/2500\$).", [
          _q(1, "Fréquence de l'allèle pathogène \$q\$.", 2, _sol([_step("\$q = \\sqrt{1/2500} = 1/50 = 0{,}02\$.")], finalAnswerFr: r"$q = 0{,}02$")),
          _q(2, "Fréquence des hétérozygotes (porteurs).", 2, _sol([_step("\$2 p q = 2 \\times 0{,}98 \\times 0{,}02 \\approx 0{,}0392 \\approx 3{,}9\\%\$."), _step("100 fois plus de porteurs que de malades !")], finalAnswerFr: r"$\approx 3{,}9\%$")),
          _q(3, "Proba qu'un couple au hasard ait un enfant malade.", 1, _sol([_step("Couple Aa × Aa : 1/4 d'enfant aa. Couple porteur : (0,039)² ≈ 0,15%, donc 0,15% × 1/4 = 0,04% — proche du taux observé."), _step("(En réalité : ~1/2500 = 0,04%, cohérent.)")], finalAnswerFr: r"$\approx 0{,}04\%$")),
        ]),
        _ex(3, 'Application — mucoviscidose', 5, "Maladie autosomique récessive, fréquence ~1/2500 en France.", [
          _q(1, "Estimation du nombre de porteurs sains en France (67 millions habitants).", 3, _sol([_step("\$q \\approx 1/50\$, fréquence de porteurs \$\\approx 2pq \\approx 4\\%\$."), _step("Nombre : \$0{,}04 \\times 67\\,\\text{M} \\approx 2{,}7\\,\\text{M}\$ porteurs.")], finalAnswerFr: r"$\approx 2{,}7$ M")),
          _q(2, "Risque pour deux porteurs.", 2, _sol([_step("Couple Aa × Aa : 1/4 d'enfants malades, 1/2 porteurs, 1/4 sains. **25% d'enfants malades**.")], finalAnswerFr: r"25%")),
        ]),
        _ex(4, 'Écart à Hardy-Weinberg', 5, "Population : génotypes observés AA=400, Aa=400, aa=200.", [
          _q(1, "Total et fréquences alléliques observées.", 2, _sol([_step("Total = 1000. Allèles A : \$2 \\times 400 + 400 = 1200/2000 = 0{,}6\$. Allèles a : 0,4.")], finalAnswerFr: r"$p = 0{,}6$")),
          _q(2, "Génotypes attendus sous H-W.", 2, _sol([_step("\$p^2 = 0{,}36 \\to 360\$, \$2pq = 0{,}48 \\to 480\$, \$q^2 = 0{,}16 \\to 160\$.")], finalAnswerFr: r"360 : 480 : 160")),
          _q(3, "Comparer aux observations. Conclusion ?", 1, _sol([_step("Observés (400, 400, 200) ≠ attendus (360, 480, 160). Plus d'homozygotes et moins d'hétérozygotes que prévu."), _step("**Force évolutive** à l'œuvre : peut-être sélection contre les Aa, ou consanguinité (réduit Aa).")], finalAnswerFr: r"écart, force évolutive")),
        ]),
      ]);

Map<String, dynamic> _svtDiversificationGenetique() => _paper(
      titleFr: 'Épreuve type — Diversification génétique',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Méiose, brassages interchromosomique et intrachromosomique.",
      exercices: [
        _ex(1, 'Méiose', 5, "Cellule mère diploïde (2n = 4).", [
          _q(1, "Nombre et type de cellules produites.", 2, _sol([_step("**4 cellules haploïdes (n)** — les gamètes."), _step("Une méiose = 2 divisions successives : méiose I (réductionnelle, séparation des homologues) puis méiose II (équationnelle, comme une mitose).")], finalAnswerFr: r"4 gamètes (n)")),
          _q(2, "Différence avec la mitose.", 3, _sol([_step("Mitose : 1 division → 2 cellules **diploïdes** identiques à la mère. Reproduction conforme."), _step("Méiose : 2 divisions → 4 cellules **haploïdes** **différentes** entre elles ET de la mère. Source de diversité.")], finalAnswerFr: r"haploïde vs diploïde, identité")),
        ]),
        _ex(2, 'Brassage interchromosomique', 5, "Espèce à n = 3 paires.", [
          _q(1, "Nombre de combinaisons possibles.", 2, _sol([_step("Chaque paire d'homologues s'oriente au hasard en métaphase I → \$2^n = 2^3 = 8\$ combinaisons gamétiques par parent.")], finalAnswerFr: r"$2^n = 8$")),
          _q(2, "Chez l'homme (n = 23), combien de combinaisons ?", 2, _sol([_step("\$2^{23} \\approx 8{,}4 \\times 10^6\$ — plus de 8 millions de combinaisons.")], finalAnswerFr: r"$\sim 8 \times 10^6$")),
          _q(3, "Avec la fécondation (2 gamètes), combinaisons en F1 ?", 1, _sol([_step("\$2^{23} \\times 2^{23} = 2^{46} \\approx 7 \\times 10^{13}\$. Soixante-dix mille milliards !")], finalAnswerFr: r"$\sim 7 \times 10^{13}$")),
        ]),
        _ex(3, 'Brassage intrachromosomique', 5, "Crossing-over en prophase I.", [
          _q(1, "Mécanisme.", 3, _sol([_step("En prophase I, les chromosomes homologues s'apparient (bivalents)."), _step("Des fragments s'échangent entre chromatides — **crossing-over**."), _step("Résultat : chromosomes recombinés, allèles initialement liés peuvent se retrouver séparés.")], finalAnswerFr: r"échange entre chromatides")),
          _q(2, "Pourquoi le crossing-over augmente-t-il la diversité ?", 2, _sol([_step("Il **rebat les cartes** : crée des combinaisons d'allèles nouvelles, jamais vues dans les générations précédentes."), _step("Combiné au brassage interchromosomique, multiplie encore la diversité gamétique.")], finalAnswerFr: r"nouvelles combinaisons")),
        ]),
        _ex(4, 'Fécondation', 5, "Étape finale de la reproduction sexuée.", [
          _q(1, "Quel rôle joue la fécondation dans la diversité ?", 3, _sol([_step("Elle **combine au hasard** un gamète mâle (parmi des millions) avec un gamète femelle (parmi des millions)."), _step("La diversité totale = (gamètes ♂) × (gamètes ♀) ≈ \$10^{13}\$ chez l'humain."), _step("**Chaque embryon humain est unique** — pas deux frères/sœurs identiques (sauf jumeaux monozygotes, issus d'un même embryon scindé).")], finalAnswerFr: r"combinaison aléatoire")),
          _q(2, "Importance biologique.", 2, _sol([_step("Diversité = matière première de l'évolution (sélection naturelle agit sur cette variation)."), _step("Permet l'adaptation aux changements environnementaux.")], finalAnswerFr: r"adaptation, évolution")),
        ]),
      ]);

Map<String, dynamic> _svtEvolution() => _paper(
      titleFr: 'Épreuve type — Mécanismes de l\'évolution',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Sélection naturelle, dérive, mutations, spéciation.",
      exercices: [
        _ex(1, 'Forces évolutives', 5, "Identifier la force responsable.", [
          _q(1, "Population de papillons dans une forêt polluée : ceux à ailes sombres survivent mieux (camouflage).", 2, _sol([_step("**Sélection naturelle** : les sombres sont mieux adaptés à l'environnement pollué (résistance aux prédateurs)."), _step("Exemple historique réel : phalène du bouleau (Biston betularia) pendant la révolution industrielle anglaise.")], finalAnswerFr: r"sélection naturelle")),
          _q(2, "Petite île, 10 lézards arrivent. Après 100 générations, fréquences alléliques très différentes du continent.", 2, _sol([_step("**Dérive génétique** : effet du hasard fort dans petite population."), _step("Effet fondateur : la petite pop initiale n'avait pas toute la variabilité du continent.")], finalAnswerFr: r"dérive + effet fondateur")),
          _q(3, "Apparition d'un nouvel allèle jamais vu.", 1, _sol([_step("**Mutation** : seule force qui crée de la nouveauté génétique.")], finalAnswerFr: r"mutation")),
        ]),
        _ex(2, 'Sélection naturelle (Darwin)', 5, "Principes.", [
          _q(1, "Énoncer les 4 conditions de la sélection naturelle.", 3, _sol([_step("(1) Variation : les individus diffèrent."), _step("(2) Héritabilité : ces différences sont transmissibles."), _step("(3) Compétition : ressources limitées, surabondance de descendants."), _step("(4) Adaptation différentielle : certaines variations donnent un avantage reproductif.")], finalAnswerFr: r"variation, hérédité, compétition, adaptation")),
          _q(2, "Résultat à long terme ?", 2, _sol([_step("Les allèles 'favorables' (= conférant succès reproductif accru) deviennent plus fréquents génération après génération."), _step("À terme : adaptation de la population à son environnement.")], finalAnswerFr: r"adaptation")),
        ]),
        _ex(3, 'Spéciation', 5, "Émergence de nouvelles espèces.", [
          _q(1, "Critère d'espèce le plus utilisé.", 2, _sol([_step("**Isolement reproductif** (concept biologique de l'espèce, Mayr) : deux populations sont des espèces différentes si elles ne peuvent plus produire de descendance fertile.")], finalAnswerFr: r"isolement reproductif")),
          _q(2, "Spéciation allopatrique.", 2, _sol([_step("Séparation **géographique** (barrière physique) d'une population en deux sous-pops."), _step("Évolution indépendante (mutations + sélection + dérive différentes) → divergence. Si retour de contact et reproduction impossible : 2 espèces.")], finalAnswerFr: r"barrière géo → divergence")),
          _q(3, "Exemple iconique.", 1, _sol([_step("**Pinsons des Galápagos** (Darwin) : 13 espèces dérivées d'un ancêtre commun, différenciées par la forme du bec selon le régime alimentaire disponible sur chaque île.")], finalAnswerFr: r"pinsons de Galápagos")),
        ]),
        _ex(4, 'Évolution humaine', 5, "Quelques jalons.", [
          _q(1, "Combien d'années depuis le dernier ancêtre commun homme-chimpanzé ?", 2, _sol([_step("Environ 7 millions d'années (horloge moléculaire + paléontologie).")], finalAnswerFr: r"$\sim 7$ Ma")),
          _q(2, "Les humains modernes (Homo sapiens) sont apparus il y a combien de temps ?", 1, _sol([_step("Environ 300 000 ans en Afrique."), _step("Sortie d'Afrique vers -70 000 ans, colonisation mondiale.")], finalAnswerFr: r"$\sim 300\,000$ ans")),
          _q(3, "Sommes-nous toujours en évolution ?", 2, _sol([_step("Oui — exemples récents : persistance de la lactase à l'âge adulte (adaptation à l'élevage), résistance à certaines maladies."), _step("Mais évolution lente à l'échelle d'une vie humaine.")], finalAnswerFr: r"oui, lentement")),
        ]),
      ]);

Map<String, dynamic> _svtCommunicationNerveuse() => _paper(
      titleFr: 'Épreuve type — Communication nerveuse',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Neurone, potentiel d'action, synapse.",
      exercices: [
        _ex(1, 'Le neurone', 5, "Cellule excitable.", [
          _q(1, "Structure d'un neurone.", 3, _sol([_step("**Corps cellulaire** (soma) : noyau, organites."), _step("**Dendrites** : extensions qui reçoivent les informations."), _step("**Axone** : long prolongement unique qui propage les PA. Se termine par des **terminaisons axonales** où sont libérés les neurotransmetteurs.")], finalAnswerFr: r"soma, dendrites, axone")),
          _q(2, "Potentiel de repos d'un neurone.", 2, _sol([_step("Environ \$-70\\,\\text{mV}\$ (intérieur négatif). Maintenu par la pompe Na⁺/K⁺ et les canaux fuite."), _step("Différence ionique : K⁺ surtout intracellulaire, Na⁺ surtout extracellulaire.")], finalAnswerFr: r"$-70$ mV")),
        ]),
        _ex(2, 'Potentiel d\'action', 5, "Mécanisme du PA.", [
          _q(1, "Phases du PA.", 4, _sol([_step("**Dépolarisation** : ouverture canaux Na⁺ voltage-dépendants → entrée Na⁺ → potentiel passe à \$+40\\,\\text{mV}\$."), _step("**Repolarisation** : fermeture Na⁺, ouverture K⁺ → sortie K⁺ → retour vers \$-70\\,\\text{mV}\$."), _step("**Hyperpolarisation** transitoire (légèrement plus négatif que repos)."), _step("**Période réfractaire** : un nouveau PA n'est pas immédiatement possible.")], finalAnswerFr: r"4 phases")),
          _q(2, "Loi du tout ou rien.", 1, _sol([_step("Un stimulus en dessous du seuil ne déclenche rien. Au-dessus, déclenche **toujours** un PA de même amplitude (~+40 mV). Le codage est par **fréquence** de PA, pas amplitude.")], finalAnswerFr: r"tout ou rien")),
        ]),
        _ex(3, 'Propagation et synapse', 5, "Transmission de l'information.", [
          _q(1, "Vitesse de propagation : myéline vs non myélinisé.", 3, _sol([_step("**Sans myéline** : ~1 m/s, propagation continue."), _step("**Avec myéline** : jusqu'à 100 m/s, propagation **saltatoire** (de nœud de Ranvier en nœud)."), _step("Sclérose en plaques = destruction de myéline → ralentissement et symptômes neurologiques variés.")], finalAnswerFr: r"1 m/s vs 100 m/s")),
          _q(2, "Transmission à la synapse.", 2, _sol([_step("PA présynaptique → entrée Ca²⁺ → fusion des vésicules → libération des **neurotransmetteurs** dans la fente synaptique."), _step("Neurotransmetteurs se fixent sur récepteurs postsynaptiques → ouverture de canaux ioniques → nouveau PA (synapse excitatrice) ou inhibition (synapse inhibitrice).")], finalAnswerFr: r"chimique, vésicules")),
        ]),
        _ex(4, 'Réflexe myotatique', 5, "Le réflexe rotulien : tap sous le genou → extension de la jambe.", [
          _q(1, "Tracer le circuit du réflexe.", 3, _sol([_step("Étirement du muscle (récepteurs fuseaux neuromusculaires)."), _step("Neurone sensitif (afférent) → moelle épinière."), _step("Synapse directe avec neurone moteur (efférent) → contraction du muscle."), _step("**Arc réflexe monosynaptique** : pas de cerveau impliqué, ultra rapide (~50 ms).")], finalAnswerFr: r"étirement → moelle → contraction")),
          _q(2, "Pourquoi tester ce réflexe en consultation ?", 2, _sol([_step("Évalue l'intégrité du circuit nerveux périphérique."), _step("Réflexe absent = lésion (nerf ou moelle). Réflexe exagéré = lésion centrale (cerveau).")], finalAnswerFr: r"évalue circuit nerveux")),
        ]),
      ]);

Map<String, dynamic> _svtCommunicationHormonale() => _paper(
      titleFr: 'Épreuve type — Communication hormonale',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Glandes endocrines, régulation, rétrocontrôle.",
      exercices: [
        _ex(1, 'Hormones et glandes', 5, "Caractéristiques.", [
          _q(1, "Définition d'une hormone.", 2, _sol([_step("Molécule sécrétée par une glande endocrine dans le sang, qui agit à distance sur des **cellules cibles** porteuses de récepteurs spécifiques.")], finalAnswerFr: r"messager sanguin")),
          _q(2, "5 glandes endocrines majeures et leur hormone caractéristique.", 3, _sol([_step("**Hypophyse** : nombreuses hormones (GH, ACTH, FSH/LH...)."), _step("**Thyroïde** : thyroxine (T4) — régule le métabolisme."), _step("**Pancréas** : insuline et glucagon — régulent la glycémie."), _step("**Surrénales** : adrénaline (stress aigu), cortisol (stress chronique)."), _step("**Gonades** : testostérone (♂), œstrogènes/progestérone (♀).")], finalAnswerFr: r"hypophyse, thyroïde, pancréas, surrénales, gonades")),
        ]),
        _ex(2, 'Régulation glycémique', 5, "Glycémie normale : 0,8-1,1 g/L.", [
          _q(1, "Que se passe-t-il après un repas riche en sucres ?", 3, _sol([_step("Glycémie ↑ détectée par les cellules β du pancréas → libération d'**insuline**."), _step("L'insuline fait entrer le glucose dans les cellules (foie, muscle) — stockage en glycogène."), _step("Glycémie revient à la normale → arrêt de l'insuline (rétrocontrôle négatif).")], finalAnswerFr: r"insuline → baisse glycémie")),
          _q(2, "Pendant le jeûne ?", 2, _sol([_step("Glycémie ↓ → cellules α du pancréas → **glucagon**."), _step("Glucagon active la glycogénolyse hépatique → libération de glucose → glycémie remonte.")], finalAnswerFr: r"glucagon → hausse")),
        ]),
        _ex(3, 'Diabète', 5, "Pathologie de la régulation.", [
          _q(1, "Diabète de type 1.", 3, _sol([_step("Maladie auto-immune : destruction des cellules β pancréatiques."), _step("Plus d'insuline produite → glycémie ↑ ↑ → traitement par insuline injectable à vie."), _step("Apparition généralement jeune (enfance/adolescence). ~10% des diabètes.")], finalAnswerFr: r"manque d'insuline")),
          _q(2, "Diabète de type 2.", 2, _sol([_step("Résistance à l'insuline : les cellules ne répondent plus correctement."), _step("Plus fréquent (~90%), lié au surpoids/sédentarité, apparition adulte. Traitement : régime, activité, médicaments oraux, parfois insuline.")], finalAnswerFr: r"résistance à l'insuline")),
        ]),
        _ex(4, 'Axe hypothalamo-hypophysaire', 5, "Régulation hiérarchique.", [
          _q(1, "Décrire l'axe hypothalamo-hypophyso-thyroïdien.", 3, _sol([_step("Hypothalamus → TRH (neurohormone) → hypophyse antérieure → TSH → thyroïde → T3/T4."), _step("Les T3/T4 exercent un **rétrocontrôle négatif** sur hypothalamus et hypophyse → diminution de TRH et TSH si T3/T4 élevées.")], finalAnswerFr: r"cascade régulée")),
          _q(2, "Pourquoi un rétrocontrôle négatif ?", 2, _sol([_step("Pour **stabiliser** le taux d'hormone : si trop, inhibition de la production ; si pas assez, stimulation. Effet thermostat."), _step("Sans rétrocontrôle : production explosive ou absence — incompatible avec la vie.")], finalAnswerFr: r"stabilisation")),
        ]),
      ]);

Map<String, dynamic> _svtImmunite() => _paper(
      titleFr: 'Épreuve type — Immunité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Immunité innée, acquise, vaccination.",
      exercices: [
        _ex(1, 'Immunité innée vs acquise', 5, "Deux lignes de défense.", [
          _q(1, "Caractéristiques de l'immunité innée.", 3, _sol([_step("**Présente dès la naissance**, immédiate (quelques minutes-heures)."), _step("**Non-spécifique** : même réponse contre tout pathogène."), _step("**Pas de mémoire** : pas d'amélioration aux contacts répétés."), _step("Acteurs : barrières (peau, muqueuses), phagocytes (macrophages, neutrophiles), inflammation, complément.")], finalAnswerFr: r"rapide, non-spécifique")),
          _q(2, "Caractéristiques de l'immunité acquise.", 2, _sol([_step("**Acquise au cours de la vie** (après contact avec antigène). Lente (plusieurs jours à la 1ère exposition, quelques heures aux suivantes)."), _step("**Spécifique** : un récepteur reconnait un antigène précis."), _step("**Avec mémoire** : réponse plus rapide et plus forte aux contacts ultérieurs.")], finalAnswerFr: r"lente, spécifique, mémoire")),
        ]),
        _ex(2, 'Lymphocytes B et T', 5, "Les soldats de l'immunité acquise.", [
          _q(1, "Lymphocytes B → réponse humorale.", 3, _sol([_step("Les LB reconnaissent les antigènes (libres dans le sang ou portés par cellules infectées) via leurs récepteurs (BCR)."), _step("Activation → différenciation en **plasmocytes** producteurs d'**anticorps** spécifiques."), _step("Anticorps neutralisent l'antigène (agrégation, opsonisation) ou activent le complément.")], finalAnswerFr: r"LB → anticorps")),
          _q(2, "Lymphocytes T cytotoxiques → réponse cellulaire.", 2, _sol([_step("Les LT8 reconnaissent les cellules infectées (qui présentent des peptides viraux sur leur MHC I)."), _step("Activation → destruction des cellules infectées par perforine + granzymes (apoptose induite).")], finalAnswerFr: r"LT8 → destruction cellulaire")),
        ]),
        _ex(3, 'Vaccination', 5, "Stratégie préventive.", [
          _q(1, "Principe.", 3, _sol([_step("Injection d'antigènes (microbes atténués, inactivés, fragments, ARN messager...) **sans pathogénicité**."), _step("Le système immunitaire active une réponse acquise et produit des **cellules mémoire**."), _step("Lors d'une rencontre ultérieure avec le vrai pathogène : réponse immédiate et puissante → protection.")], finalAnswerFr: r"mémoire immunitaire")),
          _q(2, "Pourquoi certains vaccins nécessitent des rappels ?", 2, _sol([_step("La mémoire immunitaire **décline** avec le temps."), _step("Rappels stimulent une nouvelle production d'anticorps et entretiennent la population de cellules mémoire.")], finalAnswerFr: r"déclin de mémoire")),
        ]),
        _ex(4, 'VIH et SIDA', 5, "Mécanisme d\'attaque immunitaire.", [
          _q(1, "Comment le VIH attaque-t-il le système immunitaire ?", 3, _sol([_step("Le VIH a une affinité pour les **récepteurs CD4** présents sur les LT4 auxiliaires (chef d'orchestre de la réponse immunitaire)."), _step("Le virus entre dans la cellule, intègre son génome (rétrovirus), se multiplie, détruit la cellule."), _step("Progressive **diminution des LT4** : population normale ~1000/mm³ → SIDA déclaré si <200/mm³.")], finalAnswerFr: r"détruit LT4")),
          _q(2, "Pourquoi le SIDA est-il mortel ?", 2, _sol([_step("Effondrement de l'immunité acquise → vulnérabilité aux **infections opportunistes** (pneumocystose, toxoplasmose, candidose, etc.) et à certains cancers (sarcome de Kaposi)."), _step("Traitement antirétroviral : rend la maladie chronique gérable mais pas curable. Espérance de vie quasi-normale sous traitement.")], finalAnswerFr: r"infections opportunistes")),
        ]),
      ]);

Map<String, dynamic> _svtTectoniquePlaques() => _paper(
      titleFr: 'Épreuve type — Tectonique des plaques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Lithosphère, dorsales, subduction, failles transformantes.",
      exercices: [
        _ex(1, 'Structure de la Terre', 5, "Couches.", [
          _q(1, "De la surface au centre.", 3, _sol([_step("**Croûte** (5-70 km) : continentale (granite) ou océanique (basalte)."), _step("**Manteau** (jusqu'à 2900 km) : supérieur (lithosphérique rigide + asthénosphérique ductile) et inférieur."), _step("**Noyau** : externe liquide (2900-5150 km), interne solide (5150-6370 km) — Fe-Ni.")], finalAnswerFr: r"croûte, manteau, noyau")),
          _q(2, "Différence lithosphère / asthénosphère.", 2, _sol([_step("**Lithosphère** : croûte + manteau supérieur rigide (~100 km épaisseur). Fragmentée en plaques."), _step("**Asthénosphère** : manteau supérieur ductile (déforme lentement). C'est sur elle que glissent les plaques.")], finalAnswerFr: r"rigide vs ductile")),
        ]),
        _ex(2, 'Frontières de plaques', 5, "Trois types.", [
          _q(1, "Frontière divergente (dorsale).", 3, _sol([_step("Deux plaques s'écartent (~1-10 cm/an)."), _step("Le manteau remonte par décompression → fusion partielle → **nouveau magma** qui durcit en basalte = **nouvelle croûte océanique**."), _step("Exemple : dorsale médio-atlantique (Islande, là où elle émerge).")], finalAnswerFr: r"création de croûte")),
          _q(2, "Subduction (convergente).", 3, _sol([_step("Une plaque océanique (plus dense) plonge sous une plaque continentale."), _step("Provoque : **fosse océanique**, **séismes profonds**, **volcanisme explosif** (eau libérée → fusion du manteau)."), _step("Exemple : Cordillère des Andes (plaque Nazca sous Sud-Amérique).")], finalAnswerFr: r"plaque dense plonge")),
          _q(3, "Faille transformante.", 1, _sol([_step("Glissement latéral sans création ni destruction. Faille de San Andreas (Californie) — séismes fréquents.")], finalAnswerFr: r"glissement latéral")),
        ]),
        _ex(3, 'Preuves de la tectonique', 5, "Comment Wegener a-t-il convaincu (a posteriori) ?", [
          _q(1, "Trois preuves historiques.", 3, _sol([_step("(1) **Forme des continents** : Afrique et Amérique du Sud s'emboîtent (Wegener, 1912)."), _step("(2) **Fossiles communs** : Mesosaurus (reptile) en Afrique et Amérique du Sud — mais incapable de traverser les océans."), _step("(3) **Roches similaires** sur les deux côtés de l'Atlantique : continuité géologique avant séparation.")], finalAnswerFr: r"forme, fossiles, roches")),
          _q(2, "Preuve moderne décisive : paléomagnétisme.", 2, _sol([_step("Les basaltes de la dorsale enregistrent le champ magnétique terrestre quand ils se solidifient."), _step("**Bandes magnétiques alternées symétriques** de part et d'autre de la dorsale → preuve d'expansion océanique continue."), _step("Confirme l'âge croissant des roches en s'éloignant de la dorsale.")], finalAnswerFr: r"paléomagnétisme symétrique")),
        ]),
        _ex(4, 'Conséquences sismiques', 5, "Séismes liés aux frontières.", [
          _q(1, "Où sont concentrés les séismes mondiaux ?", 2, _sol([_step("Aux **frontières de plaques** (95% des séismes). Le 'feu' du Pacifique (ceinture périphérique) est le plus actif."), _step("Profondeurs variables : superficiels aux dorsales, jusqu'à 700 km aux subductions.")], finalAnswerFr: r"frontières actives")),
          _q(2, "Échelle de magnitude.", 2, _sol([_step("**Échelle de Richter** (logarithmique) : magnitude 6 = 10× énergie de magnitude 5."), _step("Magnitude 9 = catastrophique (Tohoku 2011, Sumatra 2004).")], finalAnswerFr: r"Richter logarithmique")),
          _q(3, "Magnitude vs intensité.", 1, _sol([_step("**Magnitude** : énergie libérée (mesurée). **Intensité** (Mercalli) : effets observés sur place (varie selon la distance, le sol).")], finalAnswerFr: r"énergie vs effet")),
        ]),
      ]);

Map<String, dynamic> _svtGeochronologie() => _paper(
      titleFr: 'Épreuve type — Géochronologie',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Datation absolue et relative.",
      exercices: [
        _ex(1, 'Datation relative', 5, "Principes stratigraphiques.", [
          _q(1, "Principe de superposition.", 2, _sol([_step("Dans une série sédimentaire non déformée, les couches inférieures sont les plus **anciennes**, les supérieures sont les plus **récentes**."), _step("Stratigraphie = lecture chronologique des dépôts.")], finalAnswerFr: r"inférieur = ancien")),
          _q(2, "Principe de recoupement.", 2, _sol([_step("Toute formation qui en **traverse** une autre lui est **postérieure**."), _step("Exemple : une faille qui coupe une couche est plus jeune que cette couche.")], finalAnswerFr: r"recoupant = postérieur")),
          _q(3, "Principe d'identité paléontologique.", 1, _sol([_step("Deux couches contenant les mêmes **fossiles stratigraphiques** (espèces rapidement disparues, largement réparties) sont du même âge.")], finalAnswerFr: r"mêmes fossiles = contemporain")),
        ]),
        _ex(2, 'Datation au C14', 5, "Demi-vie 5730 ans.", [
          _q(1, "Un os à 50% d'activité initiale. Âge ?", 1, _sol([_step("1 demi-vie : 5730 ans.")], finalAnswerFr: r"5730 ans")),
          _q(2, "Un échantillon à 6,25% (1/16) d'activité.", 2, _sol([_step("\$1/16 = 1/2^4\$ → 4 demi-vies. Âge = \$4 \\times 5730 = 22\\,920\\,\\text{ans}\$.")], finalAnswerFr: r"$\approx 22\,920$ ans")),
          _q(3, "Limite supérieure de la méthode et alternatives.", 2, _sol([_step("Vers 50 000 ans (~9 demi-vies), activité trop faible à mesurer."), _step("Au-delà : K-Ar (millions d'années), U-Pb (milliards d'années).")], finalAnswerFr: r"~50 000 ans")),
        ]),
        _ex(3, 'Datation K-Ar', 5, "Demi-vie K40 = 1,25 milliards d'années.", [
          _q(1, "Roche volcanique : rapport \$Ar/K = 1\$. Âge ?", 3, _sol([_step("Si \$N_K = N_{Ar}\$, alors la moitié du K initial s'est désintégrée → 1 demi-vie."), _step("Âge = 1,25 Ga (milliards d'années).")], finalAnswerFr: r"1,25 Ga")),
          _q(2, "Application : datation de l'âge des roches lunaires (Apollo).", 2, _sol([_step("La Lune s'est formée il y a ~4,5 Ga (peu après la Terre)."), _step("Les roches lunaires ont entre 3,2 et 4,5 Ga — beaucoup plus anciennes que les plus vieilles roches terrestres (rares au-delà de 3 Ga car recyclées par la tectonique).")], finalAnswerFr: r"3-4,5 Ga")),
        ]),
        _ex(4, 'Échelle géologique', 5, "Repères temporels.", [
          _q(1, "Âge de la Terre.", 1, _sol([_step("4,57 milliards d'années (datation U-Pb sur météorites primitives).")], finalAnswerFr: r"4,57 Ga")),
          _q(2, "Trois ères principales (du plus ancien au plus récent).", 2, _sol([_step("**Paléozoïque** (-541 à -252 Ma) : invertébrés, premiers vertébrés."), _step("**Mésozoïque** (-252 à -66 Ma) : dinosaures."), _step("**Cénozoïque** (-66 Ma à aujourd'hui) : mammifères, humains."), _step("Avant : Précambrien (de la formation de la Terre à -541 Ma) — 88% de l'histoire.")], finalAnswerFr: r"Paléozoïque, Mésozoïque, Cénozoïque")),
          _q(3, "Extinction Cretacé-Tertiaire.", 2, _sol([_step("Il y a 66 Ma, météorite gigantesque (cratère de Chicxulub, Mexique) → hiver d'impact → extinction de ~75% des espèces, dont les dinosaures non-aviens."), _step("Permet l'essor des mammifères, puis des primates, puis des humains.")], finalAnswerFr: r"-66 Ma, météorite, dinosaures")),
        ]),
      ]);

Map<String, dynamic> _svtMetamorphisme() => _paper(
      titleFr: 'Épreuve type — Métamorphisme',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Transformation des roches à l'état solide.",
      exercices: [
        _ex(1, 'Définition et causes', 5, "Comprendre le phénomène.", [
          _q(1, "Métamorphisme = ?", 2, _sol([_step("Transformation d'une roche **à l'état solide** sous l'effet d'augmentation de **pression**, **température**, ou des **fluides**."), _step("Pas de fusion (au-delà = magmatisme).")], finalAnswerFr: r"solide, P-T-fluides")),
          _q(2, "Trois grands contextes.", 3, _sol([_step("**De contact** : faible P, forte T, autour d'intrusions magmatiques. Auréole de contact."), _step("**Régional** : grandes échelles, lors des collisions tectoniques (chaînes de montagnes). P et T élevées."), _step("**De subduction** : forte P, T modérée (HP-BT). Roches caractéristiques : éclogites, schistes bleus.")], finalAnswerFr: r"contact, régional, subduction")),
        ]),
        _ex(2, 'Faciès métamorphiques', 5, "Domaines P-T.", [
          _q(1, "Citer 3 faciès classiques.", 3, _sol([_step("**Schiste vert** : faible degré (~300°C, ~3 kbar). Chlorite, épidote."), _step("**Amphibolite** : moyen degré (~600°C, ~6 kbar). Amphibole, plagioclase."), _step("**Granulite** : haut degré (~800°C, ~8 kbar). Pyroxène, grenat, perte d'eau."), _step("**Éclogite** : très haute pression (>700°C, >12 kbar). Pyroxène jadeitique + grenat, chimie particulière.")], finalAnswerFr: r"4 faciès")),
          _q(2, "Comment 'lire' les conditions P-T d'une roche ?", 2, _sol([_step("Les **minéraux index** indiquent les conditions de leur formation."), _step("Exemple : disthène = HP, andalousite = BP-HT, sillimanite = HT. Ce sont 3 polymorphes (même formule Al₂SiO₅, différentes stabilités).")], finalAnswerFr: r"minéraux index")),
        ]),
        _ex(3, 'Trajets P-T-t', 5, "Histoire métamorphique.", [
          _q(1, "Qu'est-ce qu'un trajet P-T-t ?", 3, _sol([_step("Évolution de la roche en pression, température, et temps."), _step("Une roche subduite va plonger (P augmente, T augmente plus lentement), atteindre un pic, puis remonter (exhumation : P diminue, parfois T continue d'augmenter brièvement)."), _step("Permet de reconstituer l'histoire tectonique d'une région.")], finalAnswerFr: r"P, T, temps")),
          _q(2, "Importance des éclogites de surface.", 2, _sol([_step("Une éclogite à la surface raconte une **subduction passée** suivie d'une **exhumation rapide** (sinon la roche réagirait et perdrait sa signature HP)."), _step("Les Alpes contiennent des éclogites — vestiges de la fermeture de l'océan Téthys.")], finalAnswerFr: r"subduction passée")),
        ]),
        _ex(4, 'Métamorphisme et tectonique', 5, "Lien avec la dynamique terrestre.", [
          _q(1, "Pourquoi observe-t-on plus de roches métamorphiques dans les chaînes de montagnes ?", 3, _sol([_step("Les collisions tectoniques (ex. Himalaya) génèrent des **épaississements crustaux** énormes (parfois >70 km)."), _step("Les roches profondes subissent des P-T élevées → métamorphisme régional intense."), _step("L'**érosion** ultérieure expose ces roches métamorphiques à la surface.")], finalAnswerFr: r"collision + érosion")),
          _q(2, "Trois exemples de chaînes avec roches métamorphiques.", 2, _sol([_step("Alpes (collision Afrique-Eurasie). Himalaya (collision Inde-Asie). Atlas marocain (témoignages de collision plus ancienne).")], finalAnswerFr: r"Alpes, Himalaya, Atlas")),
        ]),
      ]);

Map<String, dynamic> _svtEnergieCellulaire() => _paper(
      titleFr: 'Épreuve type — Énergie cellulaire',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Photosynthèse, respiration, ATP.",
      exercices: [
        _ex(1, 'Photosynthèse', 5, "Énergie lumineuse → énergie chimique.", [
          _q(1, "Équation bilan.", 2, _sol([_step("\$6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} + \\text{lumière} \\to \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2\$.")], finalAnswerFr: r"$6CO_2 + 6H_2O \to C_6H_{12}O_6 + 6O_2$")),
          _q(2, "Deux phases.", 3, _sol([_step("**Phase claire (thylakoïdes)** : la lumière dissocie l'eau (\$2 H_2O \\to O_2 + 4 H^+ + 4 e^-\$) et produit ATP + NADPH. **Source de l'O₂ atmosphérique** !"), _step("**Phase sombre (stroma, cycle de Calvin)** : utilise ATP + NADPH pour réduire CO₂ en glucose."), _step("La phase sombre ne nécessite pas de lumière directe — mais a besoin des produits de la phase claire.")], finalAnswerFr: r"claire + Calvin")),
        ]),
        _ex(2, 'Respiration cellulaire', 5, "Inverse de la photosynthèse.", [
          _q(1, "Équation bilan.", 2, _sol([_step("\$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2 \\to 6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} + \\text{énergie (ATP)}\$.")], finalAnswerFr: r"glucose + $O_2 \to CO_2$ + $H_2O$ + ATP")),
          _q(2, "Trois étapes.", 3, _sol([_step("**Glycolyse** (cytoplasme) : glucose (6C) → 2 pyruvate (3C). Bilan : 2 ATP + 2 NADH."), _step("**Cycle de Krebs** (matrice mitochondriale) : pyruvate → CO₂ + NADH + FADH₂."), _step("**Chaîne respiratoire** (membrane interne mitochondrie) : O₂ accepte les électrons, gradient de protons → ATP synthase → ATP. Production massive : ~32 ATP."), _step("**Bilan total** : ~36 ATP par glucose oxydé.")], finalAnswerFr: r"glycolyse, Krebs, chaîne")),
        ]),
        _ex(3, 'Fermentation', 5, "Sans oxygène.", [
          _q(1, "Bilan de la fermentation lactique.", 2, _sol([_step("\$\\text{glucose} \\to 2\\,\\text{lactate} + 2\\,\\text{ATP}\$ (faible rendement)."), _step("Se produit dans les muscles privés d'O₂ (effort intense → acide lactique → courbatures).")], finalAnswerFr: r"glucose → lactate")),
          _q(2, "Pourquoi rendement faible vs respiration aérobie ?", 2, _sol([_step("Sans O₂ accepteur final, on s'arrête à la glycolyse (2 ATP). Pas de cycle de Krebs ni chaîne respiratoire."), _step("Respiration aérobie 18× plus efficace énergétiquement par glucose (36 vs 2 ATP).")], finalAnswerFr: r"pas de chaîne respiratoire")),
          _q(3, "Application industrielle.", 1, _sol([_step("Fermentation alcoolique par levures : glucose → 2 éthanol + 2 CO₂. Base de la fabrication de pain, vin, bière.")], finalAnswerFr: r"pain, vin, bière")),
        ]),
        _ex(4, 'Couplage photosynthèse-respiration', 5, "Vue d'ensemble.", [
          _q(1, "Pourquoi sont-elles complémentaires à l'échelle planétaire ?", 3, _sol([_step("**Photosynthèse** : fixe le CO₂, libère l'O₂, produit la matière organique."), _step("**Respiration** : oxyde la matière organique, libère le CO₂, consomme l'O₂."), _step("Cycle global du carbone et de l'oxygène : équilibre maintenu sur l'échelle des siècles.")], finalAnswerFr: r"cycles couplés C/O₂")),
          _q(2, "Effet humain sur ce couplage.", 2, _sol([_step("Combustion des énergies fossiles (libération du C stocké il y a des millions d'années) → augmentation du CO₂ atmosphérique."), _step("Déforestation → diminution de la photosynthèse. Conséquence : effet de serre, changement climatique.")], finalAnswerFr: r"déséquilibre actuel")),
        ]),
      ]);

Map<String, dynamic> _svtEcosystemes() => _paper(
      titleFr: 'Épreuve type — Écosystèmes',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      duration: 90, totalPoints: 20,
      introFr: "Producteurs, consommateurs, flux d'énergie, cycles.",
      exercices: [
        _ex(1, 'Structure d\'un écosystème', 5, "Définitions.", [
          _q(1, "Biocénose, biotope, écosystème.", 3, _sol([_step("**Biocénose** : ensemble des êtres vivants d'un milieu (faune + flore + microbes)."), _step("**Biotope** : milieu physique (sol, climat, eau, lumière)."), _step("**Écosystème** = biocénose + biotope + leurs interactions.")], finalAnswerFr: r"vivant + milieu + interactions")),
          _q(2, "Niveaux trophiques.", 2, _sol([_step("**Producteurs (autotrophes)** : plantes vertes, algues, cyanobactéries."), _step("**Consommateurs primaires** : herbivores. **Secondaires** : carnivores qui mangent les herbivores. **Tertiaires** : super-prédateurs."), _step("**Décomposeurs** : champignons, bactéries du sol — recyclent la matière morte.")], finalAnswerFr: r"producteurs, conso, décomposeurs")),
        ]),
        _ex(2, 'Flux d\'énergie', 5, "Règle des 10%.", [
          _q(1, "Que devient l'énergie à chaque niveau trophique ?", 3, _sol([_step("Sur 100% d'énergie ingérée par un niveau, ~10% est transférée au niveau suivant."), _step("Le reste (~90%) est perdu : respiration (chaleur dissipée), excréments, parties non consommées."), _step("Conséquence : **pyramide d'énergie** étroite au sommet. Peu d'énergie disponible pour les super-prédateurs.")], finalAnswerFr: r"10% transféré, 90% perdu")),
          _q(2, "Pourquoi peu de niveaux trophiques (4-5 max) ?", 2, _sol([_step("À chaque niveau, division par 10. Au-delà de 4-5 niveaux, énergie disponible insuffisante pour maintenir une population."), _step("Plus de lions que de léopards (carnivores), mais beaucoup plus de gazelles (herbivores).")], finalAnswerFr: r"énergie épuisée")),
        ]),
        _ex(3, 'Cycle du carbone', 5, "Carbone biologique et géologique.", [
          _q(1, "Réservoirs principaux.", 3, _sol([_step("Atmosphère (CO₂, peu mais accessible)."), _step("Océans (CO₂ dissous, énorme réservoir)."), _step("Biosphère (matière organique vivante)."), _step("Sols (matière organique morte, humus)."), _step("Combustibles fossiles (charbon, pétrole — C piégé depuis des millions d'années).")], finalAnswerFr: r"5 réservoirs principaux")),
          _q(2, "Flux principaux.", 2, _sol([_step("**Photosynthèse** : atmosphère → biosphère. **Respiration et combustion** : biosphère → atmosphère."), _step("**Échanges air-mer** : CO₂ atmosphérique se dissout dans les océans (~30% du CO₂ anthropique absorbé)."), _step("**Stockage géologique** : à très long terme, biosphère → fossiles.")], finalAnswerFr: r"photosynthèse, respiration, dissolution")),
        ]),
        _ex(4, 'Perturbations anthropiques', 5, "Impact humain.", [
          _q(1, "Effet de serre : mécanisme.", 3, _sol([_step("Le CO₂ et autres gaz à effet de serre (CH₄, N₂O, vapeur d'eau) laissent passer la lumière visible mais absorbent l'infrarouge réémis par la surface."), _step("Effet de serre **naturel** : indispensable à la vie (sans lui, T moyenne = -18°C au lieu de +15°C)."), _step("Effet de serre **anthropique** : excès de CO₂ dû à la combustion fossile → réchauffement global.")], finalAnswerFr: r"piégeage IR")),
          _q(2, "Conséquences observées.", 2, _sol([_step("Hausse de T globale (~+1,1°C depuis 1880), événements météo extrêmes."), _step("Fonte des glaces, hausse niveau marin (+20 cm en 100 ans)."), _step("Acidification des océans (CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻)."), _step("Perte de biodiversité (changement de niches, extinctions).")], finalAnswerFr: r"T, glaces, océans, biodiversité")),
        ]),
      ]);

// ============================================================================
// Registry & main
// ============================================================================

final Map<String, Map<String, dynamic>> _papers = {
  // Math (5)
  'svt_arith_geom_seq': _svtArithGeomSeq(),
  'svt_limit_calc': _svtLimitCalc(),
  'svt_deriv_apps': _svtDerivApps(),
  'svt_exp_ln_combined': _svtExpLnCombined(),
  'svt_integral_basics': _svtIntegralBasics(),
  // PC (8)
  'svt_newton_apps': _svtNewtonApps(),
  'svt_energy': _svtEnergy(),
  'svt_waves': _svtWaves(),
  'svt_radioactivity_basics': _svtRadioactivityBasics(),
  'svt_rc_circuit': _svtRcCircuit(),
  'svt_ph': _svtPh(),
  'svt_redox_basics': _svtRedoxBasics(),
  'svt_organic_basics': _svtOrganicBasics(),
  // Bio/geo (12) — SME REVIEW
  'svt_genetique_humaine': _svtGenetiqueHumaine(),
  'svt_genetique_populations': _svtGenetiquePopulations(),
  'svt_diversification_genetique': _svtDiversificationGenetique(),
  'svt_evolution': _svtEvolution(),
  'svt_communication_nerveuse': _svtCommunicationNerveuse(),
  'svt_communication_hormonale': _svtCommunicationHormonale(),
  'svt_immunite': _svtImmunite(),
  'svt_tectonique_plaques': _svtTectoniquePlaques(),
  'svt_geochronologie': _svtGeochronologie(),
  'svt_metamorphisme': _svtMetamorphisme(),
  'svt_energie_cellulaire': _svtEnergieCellulaire(),
  'svt_ecosystemes': _svtEcosystemes(),
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln('-- Migration 038: SVT exam papers (Phase 4.4).');
  buf.writeln('-- Auto-generated by json_encode_exam_papers_svt.dart.');
  buf.writeln('-- Bio/geo (12) REQUIRES SME REVIEW before ship-quality.');
  buf.writeln('BEGIN;');
  buf.writeln();
  for (final entry in _papers.entries) {
    final json = jsonEncode(entry.value);
    buf.writeln("UPDATE public.skills SET exam_paper = '${_sqlEscape(json)}'::jsonb WHERE code = '${entry.key}';");
  }
  buf.writeln();
  buf.writeln('COMMIT;');
  File('backend/supabase/migrations/038_exam_papers_svt.sql').writeAsStringSync(buf.toString());
  stdout.writeln('Wrote backend/supabase/migrations/038_exam_papers_svt.sql (${_papers.length} papers).');
}
