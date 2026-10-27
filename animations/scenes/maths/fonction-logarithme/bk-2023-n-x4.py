"""Explication animée v4 — Bac 2023 SN (SExp), Problème : fonction avec
ln, deux points d'inflexion, aire par intégration par parties et suite
récurrente.

Source de vérité : content/maths/fonction-logarithme/bank.yaml, entrée
bk-2023-n-x4 (vérifiée — examen national session normale 2023, Sciences
Expérimentales BIOF, code NS 22F, AlloSchool element/137482, Problème,
11 points, pages 3-4 du scan). Fonction f définie sur ]0,+∞[ par :

    f(x) = 2 - 2/x + (1 - ln x)^2

et (C_f) sa courbe dans un repère ORTHONORMÉ (O, i, j), unité 1 cm.

Dix-sept questions, six parties, 11 points au total :
  P1 — q1 (0,25) vérifier f(x) = (3x-2-2x ln x+x(ln x)²)/x ; q2 (0,5)
       les deux limites de référence via t=√x ; q3 (0,5) lim en 0⁺
       = -∞ et asymptote verticale ; q4 (0,75) lim en +∞ et branche
       parabolique de direction l'axe des abscisses.
  P2 — q5 (0,5) f'(x) = 2(1-x+x ln x)/x² ; q6 (0,5) stricte croissance
       et tableau de variations, avec f(1)=1 ; q7 (0,5) signe de f''
       lu sur les VARIATIONS de f' ; q8 (1) concavité et les deux
       points d'inflexion, en x=1 et x=β.
  P3 — q9 (0,5) signe de g : x ↦ f(x)-x lu sur (C_g) ; q10 (0,5)
       position de la droite (Δ) : y = x par rapport à (C_f).
  P4 — q11 (1,5) construction de (C_f) et de (Δ).
  P5 — q12 (0,5) x ↦ 2x-x ln x primitive de x ↦ 1-ln x ; q13 (1)
       intégration par parties : ∫ = 5(1-α)+α(4-ln α)ln α ; q14 (0,75)
       aire = 7(1-α)+2(1+2α)ln α-α(ln α)² cm².
  P6 — q15 (0,5) récurrence α<u_n<1 ; q16 (0,5) (u_n) croissante ;
       q17 (0,75) convergence, et limite égale à 1.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique est une étape, y compris les dérivées et primitives
admises, rappelées avant d'être utilisées), et couche de SENS avant
chaque calcul — la courbe de f est tracée AVANT toute algèbre ; le
domaine ]0,+∞[ reçoit sa frontière en pointillés (là où l'argument du
logarithme s'annule), qui DEVIENT l'asymptote verticale au moment
exact où la limite en 0⁺ est calculée (q3) ; les deux limites de
référence (t ln t → 0 en 0⁺, ln t/t → 0 en +∞) sont NOMMÉES et
chacune reçoit sa propre courbe (q2) ; le tableau de variations donné
de f' est traduit en courbe, et c'est SUR cette courbe qu'on lit le
signe de f'' (q7, l'idée centrale de la partie 2) ; l'aire de q14 est
peinte sous la courbe avant d'être calculée ; la suite de la partie 6
est vue en escalier entre (C_f) et (Δ).

Pièges classiques du chapitre, chacun en étape rouge : le domaine du
logarithme vérifié avant tout (intro) ; les formes indéterminées
0 × ∞ et ∞/∞ NOMMÉES avant d'être levées (q2) ; le facteur intérieur
de la dérivée d'un carré composé (q5) ; la dérivée nulle en un point
ISOLÉ qui n'empêche pas la stricte croissance (q6) ; f''(x₀)=0 qui ne
suffit pas à faire un point d'inflexion — il faut un CHANGEMENT de
signe (q8) ; « en dessous » qui parle de (Δ), pas de (C_f) (q10) ; les
DEUX termes de la dérivée d'un produit (q12) ; le signe de l'aire à
vérifier avant de se passer de la valeur absolue (q14) ; l'inégalité
conservée par f UNIQUEMENT parce que f est croissante (q15).

Choix d'illustration, jamais présentés comme des données de l'énoncé
(signalés en légende à l'écran) : l'énoncé donne α ≈ 0,3, β ≈ 4,9 et
f(β) ≈ 1,9 — les points tracés utilisent les valeurs exactes des mêmes
racines (α racine de f(x)-x, β racine de f''), invisibles à l'œil près
des valeurs de l'énoncé, qui restent les seules écrites ; le premier
terme u₀ = 0,5 de l'escalier de la partie 6 est un représentant
quelconque de ]α,1[, seul intervalle imposé par l'énoncé.

Rendu : ../../render.sh scenes/maths/fonction-logarithme/bk-2023-n-x4.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Arrow,
    Axes,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    ORIGIN,
    RIGHT,
    UP,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_STRONG,
    BAC_ACCENT_SUBTLE,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# ── Code couleur sémantique stable (DESIGN.md §2) ────────────────────
# f et sa courbe = objet nº1 (sarcelle) ; la droite (Δ) : y = x = objet
# nº2 (or) ; les objets auxiliaires (f', g, courbes de référence) =
# sarcelle claire ; un résultat encadré = sarcelle forte ; une limite,
# une asymptote, une conclusion finale = vert ; un piège = rouge, et
# le rouge ne sert QU'À ÇA.
COL_F = BAC_ACCENT
COL_DELTA = BAC_WARNING
COL_AUX = BAC_ACCENT_LIGHT
COL_CONCL = BAC_ACCENT_STRONG
COL_LIM = BAC_SUCCESS

DOT_R = 0.075


# ── Les fonctions de l'énoncé (valeurs exactes, banque vérifiée) ─────


def _f(x):
    """f(x) = 2 - 2/x + (1-ln x)² — la fonction étudiée (énoncé)."""
    return 2 - 2 / x + (1 - np.log(x)) ** 2


def _f_forme_q1(x):
    """La forme demandée à la question 1 : (3x-2-2x ln x+x(ln x)²)/x."""
    return (3 * x - 2 - 2 * x * np.log(x) + x * np.log(x) ** 2) / x


def _fp(x):
    """f'(x) = 2(1-x+x ln x)/x² — établie à la question 5."""
    return 2 * (1 - x + x * np.log(x)) / x**2


def _g(x):
    """g(x) = f(x) - x — la fonction de la partie 3 (courbe donnée)."""
    return _f(x) - x


def _x_ln2(x):
    """x(ln x)² — la première limite de la question 2 (en 0⁺)."""
    return x * np.log(x) ** 2


def _ln2_sur_x(x):
    """(ln x)²/x — la seconde limite de la question 2 (en +∞)."""
    return np.log(x) ** 2 / x


def _ipp(a):
    """∫_a^1 (1-ln x)² dx = 5(1-a) + a(4-ln a)ln a — résultat de q13."""
    return 5 * (1 - a) + a * (4 - np.log(a)) * np.log(a)


def _aire(a):
    """∫_a^1 f(x) dx = 7(1-a) + 2(1+2a)ln a - a(ln a)² — résultat q14."""
    return 7 * (1 - a) + 2 * (1 + 2 * a) * np.log(a) - a * np.log(a) ** 2


def _racine(fonc, a, b, n=90):
    """Dichotomie — sert UNIQUEMENT à placer des points sur un tracé."""
    fa = fonc(a)
    for _ in range(n):
        m = 0.5 * (a + b)
        if fa * fonc(m) <= 0:
            b = m
        else:
            a, fa = m, fonc(m)
    return 0.5 * (a + b)


# ── Valeurs de l'énoncé, et valeurs de tracé ─────────────────────────
# L'énoncé donne trois valeurs approchées, et ce sont les SEULES qui
# seront écrites à l'écran : α ≈ 0,3 (q9/q11), β ≈ 4,9 (q6/q11) et
# f(β) ≈ 1,9 (q11). Pour poser les points sur les courbes, on utilise
# les racines exactes des mêmes équations — l'écart est invisible et
# aucune de ces valeurs de tracé n'apparaît dans un calcul écrit.
ALPHA_ENONCE = 0.3
BETA_ENONCE = 4.9
F_BETA_ENONCE = 1.9

ALPHA = _racine(lambda x: _f(x) - x, 0.28, 0.50)          # ≈ 0,3186
BETA = _racine(lambda x: x * np.log(x) - 2 * x + 2, 3.0, 8.0)  # ≈ 4,9215

# Premier terme de la suite de la partie 6 : l'énoncé impose seulement
# u₀ ∈ ]α,1[ — 0,5 en est un représentant, signalé en légende.
U0_ILLUSTRATION = 0.5


# ── Contrôles numériques (aucune valeur affichée n'échappe à ceux-ci) ─
# q1 : les deux écritures de f coïncident sur tout le domaine.
for _x in (0.2, 0.5, 1.0, 2.0, 5.0, 40.0):
    assert abs(_f(_x) - _f_forme_q1(_x)) < 1e-12

# q6 : f(1) = 2-2+(1-ln 1)² = 1, et f'(1) = 0 (dérivée nulle en x=1).
assert abs(_f(1.0) - 1.0) < 1e-12
assert abs(_fp(1.0)) < 1e-12

# q5 : f' calculée à la main coïncide avec le taux d'accroissement.
for _x in (0.4, 1.7, 6.0):
    _h = 1e-6
    assert abs(_fp(_x) - (_f(_x + _h) - _f(_x - _h)) / (2 * _h)) < 1e-6

# q6/q9/q11 : les valeurs approchées de l'énoncé sont bien celles des
# racines exactes utilisées pour le tracé.
assert abs(ALPHA - ALPHA_ENONCE) < 0.05
assert abs(BETA - BETA_ENONCE) < 0.05
assert abs(_f(BETA) - F_BETA_ENONCE) < 0.06
assert abs(_g(ALPHA)) < 1e-9 and abs(_g(1.0)) < 1e-12

# q13/q14 : les deux formules finales, contrôlées par intégration
# numérique (méthode des trapèzes) sur [α,1].
_xs = np.linspace(ALPHA, 1.0, 200001)
assert abs(np.trapezoid((1 - np.log(_xs)) ** 2, _xs) - _ipp(ALPHA)) < 1e-6
assert abs(np.trapezoid(_f(_xs), _xs) - _aire(ALPHA)) < 1e-6
# La décomposition écrite à l'écran redonne bien le regroupement final.
for _a in (0.25, ALPHA, 0.6):
    assert abs(
        _aire(_a) - (2 * (1 - _a) + 2 * np.log(_a) + _ipp(_a))
    ) < 1e-12

# q15/q16 : l'escalier illustratif reste dans ]α,1[ et monte.
_u = U0_ILLUSTRATION
assert ALPHA < _u < 1.0
for _ in range(3):
    _suivant = _f(_u)
    assert _u < _suivant < 1.0
    _u = _suivant


# ── Disposition (DESIGN.md §1) : la région figure, à droite ──────────
# Traits d'axes discrets ; les graduations sont posées à la main, en
# petit nombre et du côté libre (directive owner) — jamais sur un
# trait, jamais contre l'étiquette O.
AXIS_CONFIG = {
    "stroke_color": BAC_INK_MUTED,
    "stroke_width": 2,
    "include_ticks": False,
    "include_tip": False,
}


def _pose_axes(ax, x_ref, y_ref, cible):
    """Aligne le point de données (x_ref, y_ref) sur un point d'écran —
    robuste, indépendant du centrage par défaut de Axes."""
    ax.shift(cible - ax.c2p(x_ref, y_ref))
    return ax


# Le repère de l'énoncé est ORTHONORMÉ (unité 1 cm) : une seule et même
# unité d'écran sur les deux axes, pour que (Δ) : y = x soit vraiment à
# 45° et que l'aire de la question 14 se lise en cm².
UNITE = 0.72
FX_MIN, FX_MAX = -0.5, 5.7
FY_MIN, FY_MAX = -2.6, 3.0
ORIGINE_F = 1.55 * RIGHT + 0.15 * UP

# Abscisse où (C_f) entre par le bas de la fenêtre (tracé seulement).
X_ENTREE = _racine(lambda x: _f(x) - FY_MIN, 0.05, 0.30)


def _repere_f():
    """Le repère orthonormé de (C_f) et (Δ) — parties 1, 4 et 5."""
    ax = Axes(
        x_range=[FX_MIN, FX_MAX, 1],
        y_range=[FY_MIN, FY_MAX, 1],
        x_length=(FX_MAX - FX_MIN) * UNITE,
        y_length=(FY_MAX - FY_MIN) * UNITE,
        axis_config=AXIS_CONFIG,
    )
    return _pose_axes(ax, 0, 0, ORIGINE_F)


def _grad_x(ax, valeurs, etiquettes, font_size=19, buff=0.14):
    """Graduations numériques sous l'axe des abscisses (côté libre)."""
    grp = VGroup()
    for v, lab in zip(valeurs, etiquettes):
        p = ax.c2p(v, 0)
        grp.add(
            Line(p + 0.07 * UP, p + 0.07 * DOWN, color=BAC_INK_MUTED, stroke_width=2)
        )
        grp.add(
            MathTex(lab, font_size=font_size, color=BAC_INK_MUTED).next_to(
                p, DOWN, buff=buff
            )
        )
    return grp


def _grad_y(ax, valeurs, etiquettes, font_size=19, buff=0.14):
    """Graduations numériques à gauche de l'axe des ordonnées."""
    grp = VGroup()
    for v, lab in zip(valeurs, etiquettes):
        p = ax.c2p(0, v)
        grp.add(
            Line(p + 0.07 * LEFT, p + 0.07 * RIGHT, color=BAC_INK_MUTED, stroke_width=2)
        )
        grp.add(
            MathTex(lab, font_size=font_size, color=BAC_INK_MUTED).next_to(
                p, LEFT, buff=buff
            )
        )
    return grp


def _repere_O(ax, direction=DOWN + LEFT, buff=0.12):
    """L'étiquette O de l'origine — posée en diagonale, jamais sur un
    axe ni contre une graduation."""
    return MathTex("O", font_size=24, color=BAC_INK_SOFT).next_to(
        ax.c2p(0, 0), direction, buff=buff
    )


def _lbl_x(ax, x_bout, buff=0.18):
    """L'étiquette x, au bout libre de l'axe des abscisses."""
    return MathTex("x", font_size=24, color=BAC_INK_MUTED).next_to(
        ax.c2p(x_bout, 0), RIGHT, buff=buff
    )


def _point(ax, x, y, couleur, texte=None, direction=DOWN, buff=0.15, font_size=22):
    """Un point marqué + son étiquette, posée du côté libre."""
    pt = Dot(ax.c2p(x, y), color=couleur, radius=DOT_R)
    if texte is None:
        return pt, None
    lbl = MathTex(texte, font_size=font_size, color=couleur).next_to(
        pt, direction, buff=buff
    )
    return pt, lbl


# ── Narration (Phase E3) : un texte parlé par chapitre ───────────────
NARRATION = {
    "titre": "Le problème du bac deux mille vingt-trois, session "
    "normale, sciences expérimentales, sur onze points : l'étude "
    "complète d'une fonction avec logarithme népérien — limites, "
    "asymptote, branche parabolique, variations, concavité et deux "
    "points d'inflexion, construction de la courbe, une aire calculée "
    "par intégration par parties, et pour finir une suite récurrente.",
    "intro": "On considère la fonction f, définie sur l'intervalle "
    "ouvert zéro plus l'infini, par f de x égale deux, moins deux sur "
    "x, plus un moins logarithme népérien de x, le tout au carré. Sa "
    "courbe est tracée dans un repère orthonormé, d'unité un "
    "centimètre.",
    "plan": "Avant le moindre calcul, on regarde l'allure de cette "
    "courbe : elle plonge le long de l'axe des ordonnées, remonte sans "
    "jamais redescendre, et s'aplatit de plus en plus. Tout le problème "
    "consiste à démontrer, morceau par morceau, ce qu'on voit ici.",
    "partie1": "Première partie : les limites aux deux bords du "
    "domaine, l'asymptote verticale, et la branche parabolique.",
    "q1": "Question un, zéro virgule vingt-cinq point. On réécrit f "
    "sous la forme d'une seule fraction : c'est cette écriture qui "
    "rendra la limite en zéro plus lisible.",
    "q2": "Question deux, zéro virgule cinq point. Deux limites de "
    "référence, obtenues toutes les deux avec le changement de "
    "variable t égale racine de x, indiqué par l'énoncé.",
    "q3": "Question trois, zéro virgule cinq point. On en déduit la "
    "limite de f en zéro plus : moins l'infini. Géométriquement, l'axe "
    "des ordonnées est asymptote verticale à la courbe.",
    "q4": "Question quatre, zéro virgule soixante-quinze point. La "
    "limite en plus l'infini, puis la branche parabolique de direction "
    "l'axe des abscisses.",
    "partie2": "Deuxième partie : la dérivée, les variations, et la "
    "concavité de la courbe.",
    "q5": "Question cinq, zéro virgule cinq point. On dérive f terme à "
    "terme pour retrouver la forme demandée.",
    "q6": "Question six, zéro virgule cinq point. Le tableau de "
    "variations de f prime est donné par l'énoncé : on y lit que f "
    "prime est positive, et on en déduit la stricte croissance de f.",
    "q7": "Question sept, zéro virgule cinq point. On donne le signe "
    "de la dérivée seconde sans jamais la calculer : le signe de f "
    "seconde, c'est le sens de variation de f prime.",
    "q8": "Question huit, un point. On traduit ce signe en concavité, "
    "et on nomme les abscisses des deux points d'inflexion.",
    "partie3": "Troisième partie : la position de la droite d'équation "
    "y égale x par rapport à la courbe, à partir d'une courbe donnée.",
    "q9": "Question neuf, zéro virgule cinq point. On lit directement "
    "le signe de g sur la courbe fournie par l'énoncé.",
    "q10": "Question dix, zéro virgule cinq point. Le signe de g égale "
    "f de x moins x donne, sans aucun calcul de plus, la position "
    "relative de la droite et de la courbe.",
    "partie4": "Quatrième partie : la construction de la courbe.",
    "q11": "Question onze, un point cinquante — la question la plus "
    "chère du problème. On reporte tout ce qui a été établi : "
    "asymptote, croissance, points d'inflexion, branche parabolique, "
    "et position par rapport à la droite.",
    "partie5": "Cinquième partie : une primitive, une intégration par "
    "parties, et enfin l'aire.",
    "q12": "Question douze, zéro virgule cinq point. Vérifier qu'une "
    "fonction est une primitive d'une autre, c'est la dériver et "
    "retrouver exactement l'autre.",
    "q13": "Question treize, un point. L'intégration par parties : on "
    "lit le carré comme un produit de deux facteurs identiques, on en "
    "dérive un et on primitive l'autre.",
    "q14": "Question quatorze, zéro virgule soixante-quinze point. "
    "L'aire sous la courbe entre alpha et un, en fonction d'alpha.",
    "partie6": "Sixième et dernière partie : la suite définie par u "
    "zéro dans l'intervalle alpha un, et u n plus un égale f de u n.",
    "q15": "Question quinze, zéro virgule cinq point. Une récurrence : "
    "la suite reste enfermée entre alpha et un, parce que f est "
    "croissante et que alpha et un sont des points fixes de f.",
    "q16": "Question seize, zéro virgule cinq point. La différence de "
    "deux termes consécutifs, c'est exactement g évaluée en u n — dont "
    "on connaît le signe.",
    "q17": "Question dix-sept, zéro virgule soixante-quinze point. "
    "Croissante et majorée, la suite converge ; sa limite est un point "
    "fixe de f, et il n'en reste qu'un seul possible : un.",
    "bilan": "Ce qu'il faut retenir de ce problème : le domaine du "
    "logarithme se vérifie toujours en premier, les formes "
    "indéterminées se nomment avant de se lever, le signe de la "
    "dérivée seconde se lit sur les variations de la dérivée première, "
    "et une aire ne se calcule qu'après avoir vérifié le signe de la "
    "fonction.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        fig = self.chapitre_plan()

        self.partie("1", "PARTIE 1", "Limites, asymptote", "et branche parabolique")
        self.chapitre_q1()
        fig = self.chapitre_q2(fig)
        fig = self.chapitre_q3(fig)
        self.chapitre_q4(fig)

        self.partie("2", "PARTIE 2", "Dérivée, variations", "et concavité")
        fig = self.chapitre_q5(fig)
        self.chapitre_q6(fig)
        self.chapitre_q7(fig)
        self.chapitre_q8(fig)

        self.partie("3", "PARTIE 3", "Position de la droite", "y = x")
        fig = self.chapitre_q9(fig)
        self.chapitre_q10(fig)

        self.partie("4", "PARTIE 4", "Construction", "de la courbe")
        fig = self.chapitre_q11(fig)

        self.partie("5", "PARTIE 5", "Primitive, parties,", "et aire")
        self.chapitre_q12()
        self.chapitre_q13()
        fig = self.chapitre_q14(fig)

        self.partie("6", "PARTIE 6", "La suite définie par", "u(n+1) = f(u(n))")
        self.chapitre_q15(fig)
        self.chapitre_q16(fig)
        self.chapitre_q17(fig)
        self.chapitre_fin()

    # ── Intertitre de partie (segmentation, DESIGN.md §5) ───────────
    # Toujours posé dans la COLONNE DE GAUCHE : à plusieurs endroits une
    # figure est encore à l'écran, et un intertitre centré passerait
    # par-dessus (défaut d'audit).
    def partie(self, slug, sur_titre, *lignes):
        self.etape(f"partie-{slug}")
        eyebrow = Text(sur_titre, font_size=23, color=BAC_ACCENT, weight="BOLD")
        corps = VGroup(
            *[Text(ligne, font_size=27, color=BAC_INK) for ligne in lignes]
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        trait = Line(
            ORIGIN, RIGHT * max(corps.width, eyebrow.width), color=COL_AUX,
            stroke_width=3,
        )
        bloc = VGroup(eyebrow, trait, corps).arrange(DOWN, aligned_edge=LEFT, buff=0.26)
        if bloc.width > 5.9:
            bloc.scale_to_fit_width(5.9)
        bloc.move_to(3.7 * LEFT + 0.5 * UP)
        self.play(FadeIn(bloc, shift=0.2 * UP), run_time=0.9)
        self.pose(2.6)
        self.play(FadeOut(bloc), run_time=0.6)

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2023 · SESSION NORMALE · SCIENCES EXP.",
            "Fonction logarithme — le problème",
            "11 points · 6 parties · sujet officiel NS 22F",
        )

    # ── Les données : f, son domaine, et les deux outils annoncés ────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère la fonction numérique f définie sur ]0 ; +∞[ par :",
            font_size=26,
        ).shift(2.5 * UP)
        defi = MathTex(
            r"f(x) = 2-\dfrac{2}{x}+(1-\ln x)^2", font_size=46, color=COL_F
        ).next_to(entete, DOWN, buff=0.7)
        repere = Text(
            "Sa courbe (Cf) est tracée dans un repère orthonormé, unité 1 cm.",
            font_size=22,
            color=BAC_INK_SOFT,
        ).next_to(defi, DOWN, buff=0.7)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(defi, shift=0.2 * UP), run_time=1.3)
        self.play(FadeIn(repere), run_time=0.8)
        self.legende(
            "Une seule formule, onze points : c'est LE problème du",
            "sujet. On la retrouvera à chacune des dix-sept questions.",
        )
        self.pose(3.6)
        self.play(FadeOut(repere), run_time=0.5)

        self.etape("intro-domaine")
        piege = VGroup(
            Text(
                "ATTENTION : le domaine se vérifie AVANT tout calcul.",
                font_size=21, color=BAC_ERROR,
            ),
            Text(
                "ln x n'existe que pour x > 0, et 2/x interdit x = 0 :",
                font_size=21, color=BAC_ERROR,
            ),
            Text(
                "le domaine est ]0 ; +∞[, jamais R tout entier.",
                font_size=21, color=BAC_ERROR,
            ),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12).next_to(defi, DOWN, buff=0.8)
        self.play(FadeIn(piege, shift=0.15 * UP), run_time=1.0)
        self.legende(
            "Le piège nº1 du chapitre : commencer à calculer sans",
            "avoir dit où la fonction existe.",
        )
        self.pose(3.8)
        self.play(FadeOut(piege), run_time=0.5)

        self.etape("intro-outils")
        o1 = Text(
            "1. la substitution t = √x, pour ramener une limite",
            font_size=22, color=BAC_INK_SOFT,
        )
        o2 = Text(
            "   à une croissance comparée de référence ;",
            font_size=22, color=BAC_INK_SOFT,
        )
        o3 = Text(
            "2. le signe de f'' lu sur les VARIATIONS de f',",
            font_size=22, color=BAC_INK_SOFT,
        )
        o4 = Text(
            "   sans jamais calculer f'' : f'' = (f')'.",
            font_size=22, color=BAC_INK_SOFT,
        )
        bloc = VGroup(o1, o2, o3, o4).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        bloc.next_to(defi, DOWN, buff=0.9)
        cadre = SurroundingRectangle(
            bloc, color=BAC_ACCENT, buff=0.28, corner_radius=0.12, stroke_width=2.5
        )
        self.play(FadeIn(bloc), Create(cadre), run_time=1.2)
        self.legende(
            "Deux techniques reviennent du début à la fin du problème.",
            "Les repérer maintenant fait gagner de longues minutes.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.play(FadeOut(bloc), FadeOut(cadre), FadeOut(entete), run_time=0.6)
        self.play(
            defi.animate.scale(0.58).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        )
        self.epingle(defi)

    # ── La couche de sens : (C_f) tracée AVANT toute algèbre ─────────
    def chapitre_plan(self):
        self.etape("plan-repere")
        ax = _repere_f()
        o_lbl = _repere_O(ax)
        x_lbl = _lbl_x(ax, FX_MAX)
        # La frontière du domaine : là où l'argument du logarithme
        # s'annule. Elle DEVIENDRA l'asymptote verticale à la q3.
        frontiere = DashedLine(
            ax.c2p(0, FY_MIN), ax.c2p(0, FY_MAX),
            color=COL_AUX, stroke_width=4, dash_length=0.13,
        )
        lbl_front = MathTex("x=0", font_size=21, color=COL_AUX).next_to(
            ax.c2p(0, 2.7), LEFT, buff=0.12
        )
        self.play(Create(ax, run_time=1.6), FadeIn(o_lbl), FadeIn(x_lbl))
        grad = self.graduations(ax, [1, 2, 3, 4, 5], [-2, -1, 1, 2])
        self.play(Create(frontiere, run_time=1.2), FadeIn(lbl_front))
        self.legende(
            "Le repère, et la frontière du domaine en pointillés :",
            "tout le problème se passe à DROITE de cette droite,",
            "là où ln x existe.",
        )
        self.pose(3.6)

        self.etape("plan-courbe")
        # Trois morceaux, coupés aux deux abscisses qui serviront plus
        # tard (α et 1) : chacun pourra être recoloré quand la question
        # qui le concerne sera démontrée.
        c1 = ax.plot(
            _f, x_range=[X_ENTREE, ALPHA, 0.002], color=BAC_INK_MUTED, stroke_width=3.5
        )
        c2 = ax.plot(
            _f, x_range=[ALPHA, 1.0, 0.004], color=BAC_INK_MUTED, stroke_width=3.5
        )
        c3 = ax.plot(
            _f, x_range=[1.0, FX_MAX, 0.01], color=BAC_INK_MUTED, stroke_width=3.5
        )
        self.play(Create(c1, run_time=1.4))
        self.play(Create(c2, run_time=1.0), Create(c3, run_time=1.8))
        self.legende(
            "Voici (Cf), avant la moindre preuve — juste pour VOIR",
            "ce qu'on va démontrer question après question.",
        )
        self.pose(3.4)

        self.etape("plan-questions")
        q_bas = MathTex(r"-\infty\ ?", font_size=24, color=BAC_INK_SOFT).move_to(
            ax.c2p(0.62, -1.9)
        )
        q_haut = MathTex(r"+\infty\ ?", font_size=24, color=BAC_INK_SOFT).move_to(
            ax.c2p(4.75, 2.62)
        )
        self.play(FadeIn(q_bas), FadeIn(q_haut), run_time=1.0)
        self.legende(
            "Deux questions sautent aux yeux : où va la courbe quand",
            "x s'approche de 0, et quand x devient très grand ?",
            "C'est exactement le programme de la partie 1.",
        )
        self.pose(4.0)
        self.efface_legende()

        return {
            "ax": ax,
            "grad": grad,
            "o": o_lbl,
            "x_lbl": x_lbl,
            "c1": c1,
            "c2": c2,
            "c3": c3,
            "frontiere": frontiere,
            "lbl_front": lbl_front,
            "q_bas": q_bas,
            "q_haut": q_haut,
        }

    # ── Q1 : forme développée et factorisée sur x ────────────────────
    def chapitre_q1(self):
        badge = self.bandeau_question("1)", "0,25 pt")
        self.ardoise()

        self.etape("q1-enonce")
        but = MathTex(
            r"\text{Montrer : } f(x) = \dfrac{3x - 2 - 2x\ln x + x(\ln x)^2}{x}",
            font_size=27,
        )
        self.ecrit(but)
        self.legende(
            "On développe le carré (1 - ln x)², puis on met chaque",
            "terme sur le dénominateur commun x.",
        )
        self.pose(3.4)

        self.etape("q1-developpement")
        m1 = MathTex(
            r"f(x) = 2 - \dfrac{2}{x} + 1 - 2\ln x + (\ln x)^2 \\"
            r"= 3 - \dfrac{2}{x} - 2\ln x + (\ln x)^2",
            font_size=24,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On regroupe 2 + 1 = 3.")
        self.pose(3.0)

        self.etape("q1-reduction")
        m2 = MathTex(
            r"f(x) = \dfrac{3x - 2 - 2x\ln x + x(\ln x)^2}{x}",
            font_size=26, color=COL_CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=COL_CONCL)
        self.legende(
            "C'est la forme demandée : 0,25 point. Elle va servir",
            "directement pour la limite en 0+.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q2 : deux limites de référence via t = √x ────────────────────
    def chapitre_q2(self, fig):
        badge = self.bandeau_question("2)", "0,5 pt")
        self.ardoise()

        self.etape("q2-enonce")
        but = MathTex(
            r"\lim_{x\to0^+} x(\ln x)^2 = 0 \quad \text{et} \quad"
            r" \lim_{x\to+\infty} \dfrac{(\ln x)^2}{x} = 0",
            font_size=26,
        )
        self.ecrit(but)
        self.legende(
            "L'énoncé suggère le changement de variable t = racine de x.",
            "Il ramène les deux expressions aux croissances comparées.",
        )
        self.pose(3.8)

        self.etape("q2-lim-zero")
        m1 = MathTex(
            r"t = \sqrt{x} \iff x = t^2 \ ; \quad \ln x = 2\ln t \\"
            r"x(\ln x)^2 = t^2(2\ln t)^2 = 4(t\ln t)^2",
            font_size=23,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "Quand x tend vers 0+, t tend vers 0+ : t ln t tend vers 0",
            "(croissances comparées de référence, R4).",
        )
        self.pose(3.6)

        m2 = MathTex(
            r"\lim_{t\to0^+} t\ln t = 0 \implies \lim_{x\to0^+} x(\ln x)^2 = 0",
            font_size=24, color=COL_LIM,
        )
        self.ecrit(m2, buff=0.4)
        self.encadre(couleur=COL_LIM)
        self.pose(3.2)
        self.nettoie(garder=1)

        self.etape("q2-lim-infini")
        m3 = MathTex(
            r"\dfrac{(\ln x)^2}{x} = \dfrac{(2\ln t)^2}{t^2} = 4\left(\dfrac{\ln t}{t}\right)^2",
            font_size=24,
        )
        self.ecrit(m3, buff=0.45)
        self.legende(
            "Quand x tend vers +infini, t tend vers +infini : ln t sur t",
            "tend vers 0 (croissances comparées, R4).",
        )
        self.pose(3.6)

        m4 = MathTex(
            r"\lim_{t\to+\infty} \dfrac{\ln t}{t} = 0 \implies"
            r" \lim_{x\to+\infty} \dfrac{(\ln x)^2}{x} = 0",
            font_size=24, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.4)
        self.encadre(couleur=COL_LIM)
        self.legende("Les deux limites de référence sont établies : 0,5 point.")
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q3 : limite en 0+ et asymptote verticale ─────────────────────
    def chapitre_q3(self, fig):
        badge = self.bandeau_question("3)", "0,5 pt")
        self.ardoise()

        self.etape("q3-enonce")
        but = MathTex(
            r"\text{Déduire : } \lim_{x\to0^+} f(x) = -\infty \quad"
            r"\text{et interpréter géométriquement}",
            font_size=26,
        )
        self.ecrit(but)
        self.legende(
            "On repart de la forme de la question 1 : le numérateur",
            "va révéler sa limite grâce à la question 2.",
        )
        self.pose(3.6)

        self.etape("q3-calcul")
        m1 = MathTex(
            r"3x - 2 - 2x\ln x + x(\ln x)^2 \xrightarrow[x\to0^+]{} 0 - 2 - 0 + 0 = -2",
            font_size=20,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "En 0+ : 3x tend vers 0, x ln x tend vers 0 (R4), et x(ln x)²",
            "tend vers 0 (question 2). Le numérateur tend vers -2.",
        )
        self.pose(3.8)

        m2 = MathTex(
            r"\begin{cases} \text{Numérateur} \to -2 \\ \text{Dénominateur } x \to 0^+ \end{cases}"
            r"\implies \lim_{x\to0^+} f(x) = -\infty",
            font_size=23, color=COL_LIM,
        )
        self.ecrit(m2, buff=0.45)
        self.encadre(couleur=COL_LIM)
        self.pose(3.6)

        self.etape("q3-interpretation")
        interp = VGroup(
            Text("Interprétation géométrique :", font_size=20, color=COL_LIM),
            Text("La droite d'équation x = 0 (l'axe des ordonnées)", font_size=20, color=COL_LIM),
            Text("est asymptote verticale à la courbe (Cf).", font_size=20, color=COL_LIM),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(interp, buff=0.45)
        self.play(
            fig["frontiere"].animate.set_color(COL_LIM).set_stroke(width=3),
            fig["lbl_front"].animate.set_color(COL_LIM),
            FadeOut(fig["q_bas"]),
            fig["c1"].animate.set_color(COL_F),
            run_time=1.4,
        )
        self.legende(
            "La frontière devient une ASYMPTOTE VERTICALE : la courbe",
            "plonge vers le bas sans jamais la traverser. 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q4 : limite en +∞ et branche parabolique ─────────────────────
    def chapitre_q4(self, fig):
        badge = self.bandeau_question("4)", "0,75 pt")
        self.ardoise()

        self.etape("q4-enonce")
        but = MathTex(
            r"\lim_{x\to+\infty} f(x) = +\infty \quad \text{et branche parabolique en } +\infty",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "En +infini : on étudie la limite de f, puis le rapport",
            "f(x)/x pour déterminer la direction de la branche.",
        )
        self.pose(3.6)

        self.etape("q4-calcul-lim")
        m1 = MathTex(
            r"\lim_{x\to+\infty}\left(2 - \dfrac{2}{x}\right) = 2 \quad \text{et} \quad"
            r"\lim_{x\to+\infty}(1-\ln x)^2 = +\infty \\"
            r"\implies \lim_{x\to+\infty} f(x) = +\infty",
            font_size=22, color=COL_LIM,
        )
        self.ecrit(m1, buff=0.45)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Quand x tend vers +infini, 1 - ln x part vers -infini,",
            "son carré part vers +infini : f(x) tend vers +infini.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q4-branche")
        m2 = MathTex(
            r"\dfrac{f(x)}{x} = \dfrac{2}{x} - \dfrac{2}{x^2} + \dfrac{1 - 2\ln x + (\ln x)^2}{x} \\"
            r"= \dfrac{2}{x} - \dfrac{2}{x^2} + \dfrac{1}{x} - 2\dfrac{\ln x}{x} + \dfrac{(\ln x)^2}{x}",
            font_size=20,
        )
        self.ecrit(m2, buff=0.45)
        self.legende(
            "On divise chaque terme par x : les croissances comparées",
            "ln x/x et (ln x)²/x tendent toutes vers 0.",
        )
        self.pose(3.8)

        m3 = MathTex(
            r"\lim_{x\to+\infty} \dfrac{f(x)}{x} = 0 - 0 + 0 - 0 + 0 = 0",
            font_size=24, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.4)
        self.encadre(couleur=COL_LIM)
        self.pose(3.2)

        self.etape("q4-conclusion")
        interp = VGroup(
            Text("Conclusion géométrique :", font_size=20, color=COL_LIM),
            Text("(Cf) admet une branche parabolique de direction", font_size=20, color=COL_LIM),
            Text("l'axe des abscisses (Ox) au voisinage de +∞.", font_size=20, color=COL_LIM),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(interp, buff=0.4)
        self.play(
            FadeOut(fig["q_haut"]),
            fig["c3"].animate.set_color(COL_F),
            run_time=1.4,
        )
        self.legende(
            "La courbe monte indéfiniment mais s'aplatit : branche",
            "parabolique de direction l'axe des abscisses. 0,75 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5 : dérivée f'(x) = 2(1-x+x ln x)/x² ────────────────────────
    def chapitre_q5(self, fig):
        badge = self.bandeau_question("5)", "0,5 pt")
        self.ardoise()

        self.etape("q5-enonce")
        but = MathTex(
            r"\text{Montrer : } f'(x) = \dfrac{2(1-x+x\ln x)}{x^2}",
            font_size=27,
        )
        self.ecrit(but)
        self.legende(
            "On dérive f(x) = 2 - 2/x + (1 - ln x)² terme à terme,",
            "en utilisant la dérivée d'un carré composé pour le dernier.",
        )
        self.pose(3.8)

        self.etape("q5-derivation")
        m1 = MathTex(
            r"f'(x) = 0 - \left(-\dfrac{2}{x^2}\right) + 2(1-\ln x)\left(-\dfrac{1}{x}\right) \\"
            r"= \dfrac{2}{x^2} - \dfrac{2(1-\ln x)}{x}",
            font_size=23,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "La dérivée de 1 - ln x est -1/x. Le facteur 2 vient du carré.",
        )
        self.pose(3.6)

        self.etape("q5-reduction")
        m2 = MathTex(
            r"f'(x) = \dfrac{2 - 2x(1-\ln x)}{x^2} = \dfrac{2 - 2x + 2x\ln x}{x^2} \\"
            r"= \dfrac{2(1-x+x\ln x)}{x^2}",
            font_size=24, color=COL_CONCL,
        )
        self.ecrit(m2, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende("On réduit au même dénominateur x² : 0,5 point.")
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q6 : stricte croissance et tableau de variations ─────────────
    def chapitre_q6(self, fig):
        badge = self.bandeau_question("6)", "0,5 pt")
        self.ardoise()

        self.etape("q6-enonce")
        but = MathTex(
            r"\text{Prouver la stricte croissance de } f \text{ et dresser son tableau}",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "Le tableau de variations de f' fourni par l'énoncé indique",
            "que le minimum de f' vaut 0, atteint uniquement en x = 1.",
        )
        self.pose(4.0)

        self.etape("q6-signe-derivee")
        m1 = MathTex(
            r"f'(x) \ge 0 \text{ sur } ]0,+\infty[, \text{ nul uniquement en } x=1 \\"
            r"\implies f \text{ est strictement croissante sur } ]0,+\infty[",
            font_size=22, color=COL_CONCL,
        )
        self.ecrit(m1, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende(
            "Une dérivée positive s'annulant en un point isolé garantit",
            "la stricte croissance de f.",
        )
        self.pose(3.8)

        self.etape("q6-point-repere")
        m2 = MathTex(
            r"f(1) = 2 - \dfrac{2}{1} + (1-\ln 1)^2 = 0 + 1^2 = 1",
            font_size=25,
        )
        self.ecrit(m2, buff=0.45)
        pt_1, lbl_1 = _point(fig["ax"], 1.0, 1.0, COL_F, r"(1,1)", UP + LEFT, buff=0.18)
        self.play(
            FadeIn(pt_1, scale=1.5),
            Write(lbl_1),
            fig["c2"].animate.set_color(COL_F),
            run_time=1.2,
        )
        fig["pt_1"] = pt_1
        fig["lbl_1"] = lbl_1
        self.legende(
            "Point de repère : (1,1). Toute la courbe (Cf) est maintenant",
            "validée en couleur principale. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q7 : tableau de signe de f'' via les variations de f' ────────
    def chapitre_q7(self, fig):
        badge = self.bandeau_question("7)", "0,5 pt")
        self.ardoise()

        self.etape("q7-enonce")
        but = MathTex(
            r"\text{Donner le tableau de signe de } f'' \text{ sur } ]0,+\infty[",
            font_size=27,
        )
        self.ecrit(but)
        self.legende(
            "Pas besoin de calculer f'' : le signe de la dérivée seconde",
            "est exactement le sens de variation de la dérivée f'.",
        )
        self.pose(3.8)

        self.etape("q7-variations-fp")
        m1 = MathTex(
            r"f'' = (f')' \implies \text{signe}(f'') = \text{variation}(f') \\"
            r"\begin{cases}"
            r"f' \text{ décroît sur } ]0,1[ \implies f''(x) < 0 \\"
            r"f' \text{ croît sur } ]1,\beta[ \implies f''(x) > 0 \\"
            r"f' \text{ décroît sur } ]\beta,+\infty[ \implies f''(x) < 0"
            r"\end{cases}",
            font_size=20,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "On lit directement les trois intervalles sur le tableau",
            "de f' donné par l'énoncé.",
        )
        self.pose(4.0)

        self.etape("q7-tableau-signe")
        m2 = MathTex(
            r"f''(1) = 0 \quad \text{et} \quad f''(\beta) = 0 \quad (\beta \approx 4{,}9)",
            font_size=23, color=COL_CONCL,
        )
        self.ecrit(m2, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende(
            "f'' s'annule en changeant de signe en x = 1 et x = β.",
            "0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q8 : concavité et deux points d'inflexion ────────────────────
    def chapitre_q8(self, fig):
        badge = self.bandeau_question("8)", "1 pt")
        self.ardoise()

        self.etape("q8-enonce")
        but = MathTex(
            r"\text{Déduire la concavité de } (C_f) \text{ et les deux points d'inflexion}",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "La concavité se déduit directement du signe de f'' :",
            "f'' < 0 concave, f'' > 0 convexe.",
        )
        self.pose(3.6)

        self.etape("q8-concavite")
        m1 = MathTex(
            r"\begin{cases}"
            r"(C_f) \text{ est concave sur } ]0,1[ \\"
            r"(C_f) \text{ est convexe sur } ]1,\beta[ \\"
            r"(C_f) \text{ est concave sur } ]\beta,+\infty["
            r"\end{cases}",
            font_size=22, color=COL_CONCL,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("Traduction directe du signe de f'' en concavité.")
        self.pose(3.6)

        self.etape("q8-inflexions")
        m2 = MathTex(
            r"\text{Points d'inflexion en } x = 1 \text{ et } x = \beta \approx 4{,}9 \\"
            r"I_1(1, 1) \quad \text{et} \quad I_2(\beta, f(\beta)) \text{ avec } f(\beta)\approx 1{,}9",
            font_size=20, color=COL_CONCL,
        )
        self.ecrit(m2, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        pt_beta, lbl_beta = _point(
            fig["ax"], BETA, _f(BETA), COL_CONCL, r"I_2(\beta, 1{,}9)", UP + LEFT, buff=0.15, font_size=19
        )
        self.play(FadeIn(pt_beta, scale=1.5), Write(lbl_beta), run_time=1.2)
        fig["pt_beta"] = pt_beta
        fig["lbl_beta"] = lbl_beta
        self.legende(
            "f'' s'annule en changeant de signe : 1 et β sont bien",
            "les abscisses des deux points d'inflexion. 1 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q9 : signe de g(x) = f(x) - x lu sur (C_g) ───────────────────
    def chapitre_q9(self, fig):
        badge = self.bandeau_question("9)", "0,5 pt")
        self.ardoise()

        self.etape("q9-enonce")
        but = MathTex(
            r"\text{Déterminer le signe de } g(x) = f(x)-x \text{ sur } ]0,+\infty[",
            font_size=25,
        )
        self.ecrit(but)
        self.legende(
            "On lit directement le signe sur la courbe (Cg) fournie :",
            "elle est sous l'axe avant alpha, au-dessus entre alpha et 1,",
            "et sous l'axe après 1.",
        )
        self.pose(4.0)

        self.etape("q9-signe")
        m1 = MathTex(
            r"\begin{cases}"
            r"g(x) < 0 \text{ sur } ]0,\alpha[ \\"
            r"g(x) > 0 \text{ sur } ]\alpha,1[ \\"
            r"g(x) < 0 \text{ sur } ]1,+\infty["
            r"\end{cases} \quad \text{avec } g(\alpha)=g(1)=0",
            font_size=22, color=COL_CONCL,
        )
        self.ecrit(m1, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende("Lecture directe sur (Cg) : 0,5 point.")
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q10 : position relative de (Δ) par rapport à (C_f) ───────────
    def chapitre_q10(self, fig):
        badge = self.bandeau_question("10)", "0,5 pt")
        self.ardoise()

        self.etape("q10-enonce")
        but = MathTex(
            r"\text{Déduire la position de } (\Delta) : y = x \text{ par rapport à } (C_f)",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "g(x) = f(x) - x : le signe de g donne immédiatement la",
            "position relative de la droite (Δ) et de la courbe (Cf).",
        )
        self.pose(3.8)

        self.etape("q10-traduction")
        m1 = MathTex(
            r"g(x) > 0 \iff f(x) > x \iff (\Delta) \text{ est en dessous de } (C_f) \\"
            r"g(x) < 0 \iff f(x) < x \iff (\Delta) \text{ est au-dessus de } (C_f)",
            font_size=20,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "Attention au piège : l'énoncé demande la position de la",
            "DROITE par rapport à la courbe.",
        )
        self.pose(3.8)

        self.etape("q10-position")
        m2 = MathTex(
            r"(\Delta) \text{ est en dessous de } (C_f) \text{ sur } [\alpha,1] \\"
            r"(\Delta) \text{ est au-dessus de } (C_f) \text{ sur } ]0,\alpha] \text{ et } [1,+\infty[",
            font_size=21, color=COL_CONCL,
        )
        self.ecrit(m2, buff=0.45)
        self.encadre(couleur=COL_CONCL)

        # On trace (Δ) sur la figure
        delta = fig["ax"].plot(lambda x: x, x_range=[FX_MIN, FX_MAX], color=COL_DELTA, stroke_width=3)
        lbl_delta = MathTex(r"(\Delta) : y=x", font_size=20, color=COL_DELTA).next_to(
            fig["ax"].c2p(4.5, 4.5), UP + LEFT, buff=0.1
        )
        pt_alpha, lbl_alpha = _point(
            fig["ax"], ALPHA, ALPHA, COL_DELTA, r"(\alpha,\alpha)", DOWN + RIGHT, buff=0.15, font_size=19
        )
        self.play(Create(delta, run_time=1.2), FadeIn(lbl_delta), FadeIn(pt_alpha), Write(lbl_alpha))
        fig["delta"] = delta
        fig["lbl_delta"] = lbl_delta
        fig["pt_alpha"] = pt_alpha
        fig["lbl_alpha"] = lbl_alpha

        self.legende(
            "Position relative validée : (Δ) passe au-dessus, en dessous,",
            "puis au-dessus. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q11 : construction de (C_f) et de (Δ) ────────────────────────
    def chapitre_q11(self, fig):
        badge = self.bandeau_question("11)", "1,5 pt")
        self.ardoise()

        self.etape("q11-enonce")
        but = MathTex(
            r"\text{Construire } (C_f) \text{ et } (\Delta) \text{ dans le repère } (O,\vec{i},\vec{j})",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "Question à 1,5 point : on rassemble tous les résultats",
            "obtenus depuis le début.",
        )
        self.pose(3.8)

        self.etape("q11-synthese")
        synthese = VGroup(
            Text("Éléments de construction :", font_size=20, color=COL_CONCL),
            Text("• Asymptote verticale x = 0 (en 0+)", font_size=19, color=BAC_INK_SOFT),
            Text("• Stricte croissance sur ]0 ; +∞[", font_size=19, color=BAC_INK_SOFT),
            Text("• Points d'inflexion : I1(1, 1) et I2(β, 1,9)", font_size=19, color=BAC_INK_SOFT),
            Text("• Intersections avec (Δ) : (α, α) et (1, 1)", font_size=19, color=BAC_INK_SOFT),
            Text("• Branche parabolique selon (Ox) en +∞", font_size=19, color=BAC_INK_SOFT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.ecrit(synthese, buff=0.45)
        self.play(
            fig["c1"].animate.set_stroke(width=4.5),
            fig["c2"].animate.set_stroke(width=4.5),
            fig["c3"].animate.set_stroke(width=4.5),
            run_time=1.5,
        )
        self.legende(
            "Le tracé complet est validé : tous les éléments clés sont",
            "en place, fidèles au barème. 1,5 point.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q12 : primitive de 1 - ln x ──────────────────────────────────
    def chapitre_q12(self):
        badge = self.bandeau_question("12)", "0,5 pt")
        self.ardoise()

        self.etape("q12-enonce")
        but = MathTex(
            r"\text{Vérifier que } F : x \mapsto 2x - x\ln x \text{ est une primitive de } 1 - \ln x",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "Pour vérifier qu'une fonction est une primitive, il",
            "suffit de la dériver et de retrouver la fonction cible.",
        )
        self.pose(3.8)

        self.etape("q12-derivation")
        m1 = MathTex(
            r"F(x) = 2x - x\ln x \\"
            r"F'(x) = 2 - \left(1\cdot\ln x + x\cdot\dfrac{1}{x}\right) = 2 - (\ln x + 1)",
            font_size=24,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "On applique la règle de dérivation d'un produit (u·v)' = u'v + uv'",
            "au terme x ln x.",
        )
        self.pose(3.8)

        self.etape("q12-conclusion")
        m2 = MathTex(
            r"F'(x) = 2 - 1 - \ln x = 1 - \ln x",
            font_size=26, color=COL_CONCL,
        )
        self.ecrit(m2, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende(
            "F est bien une primitive de 1 - ln x sur [alpha ; 1].",
            "0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q13 : intégration par parties de (1 - ln x)² ─────────────────
    def chapitre_q13(self):
        badge = self.bandeau_question("13)", "1 pt")
        self.ardoise()

        self.etape("q13-enonce")
        but = MathTex(
            r"\int_\alpha^1 (1-\ln x)^2\,dx = 5(1-\alpha) + \alpha(4-\ln\alpha)\ln\alpha",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On écrit (1 - ln x)² = (1 - ln x)(1 - ln x) et on",
            "effectue une intégration par parties.",
        )
        self.pose(3.8)

        self.etape("q13-choix-ipp")
        m1 = MathTex(
            r"\begin{cases} u(x) = 1-\ln x & \implies u'(x) = -\dfrac{1}{x} \\[6pt]"
            r"v'(x) = 1-\ln x & \implies v(x) = 2x-x\ln x \quad \text{(q12)} \end{cases}",
            font_size=21,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("On utilise la primitive F trouvée à la question 12.")
        self.pose(3.8)

        self.etape("q13-formule-ipp")
        m2 = MathTex(
            r"\int_\alpha^1 (1-\ln x)^2\,dx = \big[(1-\ln x)(2x-x\ln x)\big]_\alpha^1"
            r" + \int_\alpha^1 (2-\ln x)\,dx",
            font_size=20,
        )
        self.ecrit(m2, buff=0.45)
        self.legende(
            "Le signe moins de la formule IPP se simplifie avec le moins",
            "de u'(x) = -1/x, ce qui donne un plus.",
        )
        self.pose(4.0)
        self.nettoie(garder=1)

        self.etape("q13-crochets")
        m3 = MathTex(
            r"\text{Crochet : } 2 - \alpha(1-\ln\alpha)(2-\ln\alpha) = 2 - 2\alpha + 3\alpha\ln\alpha - \alpha(\ln\alpha)^2 \\"
            r"\text{Intégrale : } \big[3x - x\ln x\big]_\alpha^1 = 3 - 3\alpha + \alpha\ln\alpha",
            font_size=18,
        )
        self.ecrit(m3, buff=0.45)
        self.legende("On calcule les deux termes séparément.")
        self.pose(3.8)

        self.etape("q13-somme")
        m4 = MathTex(
            r"\int_\alpha^1 (1-\ln x)^2\,dx = 5(1-\alpha) + \alpha(4-\ln\alpha)\ln\alpha",
            font_size=22, color=COL_CONCL,
        )
        self.ecrit(m4, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende(
            "En sommant et en factorisant, on retrouve la formule",
            "exacte de l'énoncé : 1 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q14 : aire sous (C_f) entre α et 1 ───────────────────────────
    def chapitre_q14(self, fig):
        badge = self.bandeau_question("14)", "0,75 pt")
        self.ardoise()

        self.etape("q14-enonce")
        but = MathTex(
            r"\text{Calculer l'aire } \mathcal{A} \text{ entre } x=\alpha \text{ et } x=1",
            font_size=25,
        )
        self.ecrit(but)
        self.legende(
            "L'aire est délimitée par (Cf), l'axe des abscisses et",
            "les droites x = alpha et x = 1.",
        )
        self.pose(3.8)

        self.etape("q14-positivite")
        m1 = MathTex(
            r"\text{Sur } [\alpha,1], \ (C_f) \text{ est au-dessus de } (\Delta) : y = x > 0 \\"
            r"\implies f(x) > 0 \implies \mathcal{A} = \int_\alpha^1 f(x)\,dx \ \text{cm}^2",
            font_size=21,
        )
        self.ecrit(m1, buff=0.45)
        # On colorie l'aire sous la courbe
        aire_geom = fig["ax"].get_area(
            fig["c2"], x_range=[ALPHA, 1.0], color=COL_CONCL, opacity=0.3
        )
        self.play(FadeIn(aire_geom), run_time=1.2)
        fig["aire_geom"] = aire_geom
        self.legende(
            "f est positive sur [alpha ; 1] : pas de valeur absolue",
            "nécessaire. L'unité est 1 cm² (repère orthonormé 1 cm).",
        )
        self.pose(4.0)

        self.etape("q14-decomposition")
        m2 = MathTex(
            r"\mathcal{A} = \int_\alpha^1 2\,dx - \int_\alpha^1 \dfrac{2}{x}\,dx + \int_\alpha^1 (1-\ln x)^2\,dx \\"
            r"= 2(1-\alpha) + 2\ln\alpha + \big[5(1-\alpha) + \alpha(4-\ln\alpha)\ln\alpha\big]",
            font_size=19,
        )
        self.ecrit(m2, buff=0.45)
        self.legende("On réutilise directement le résultat de la question 13.")
        self.pose(4.0)

        self.etape("q14-regroupement")
        m3 = MathTex(
            r"\mathcal{A} = 7(1-\alpha) + 2(1+2\alpha)\ln\alpha - \alpha(\ln\alpha)^2 \quad \text{cm}^2",
            font_size=21, color=COL_CONCL,
        )
        self.ecrit(m3, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende("Regroupement final de l'aire : 0,75 point.")
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q15 : récurrence α < u_n < 1 ─────────────────────────────────
    def chapitre_q15(self, fig):
        badge = self.bandeau_question("15)", "0,5 pt")
        self.ardoise()

        self.etape("q15-enonce")
        but = MathTex(
            r"\text{Montrer par récurrence : } \forall n \in \mathbb{N}, \ \alpha < u_n < 1",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On utilise le fait que alpha et 1 sont des points fixes",
            "de f, et que f est strictement croissante.",
        )
        self.pose(4.0)

        self.etape("q15-init")
        m1 = MathTex(
            r"\text{Initialisation : pour } n=0, \ u_0 \in\,]\alpha, 1[ \text{ est donné par l'énoncé.}",
            font_size=20,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("La propriété est vraie pour n = 0.")
        self.pose(3.2)

        self.etape("q15-heredite")
        m2 = MathTex(
            r"\text{Hérédité : supposons } \alpha < u_n < 1. \\"
            r"f \text{ est strictement croissante } \implies f(\alpha) < f(u_n) < f(1) \\"
            r"\text{Or } f(\alpha) = \alpha \text{ et } f(1) = 1 \implies \alpha < u_{n+1} < 1",
            font_size=20,
        )
        self.ecrit(m2, buff=0.45)
        self.legende(
            "L'inégalité est conservée par f grâce à sa stricte croissance.",
        )
        self.pose(4.0)

        self.etape("q15-conclusion")
        m3 = MathTex(
            r"\forall n \in \mathbb{N}, \quad \alpha < u_n < 1",
            font_size=25, color=COL_CONCL,
        )
        self.ecrit(m3, buff=0.45)
        self.encadre(couleur=COL_CONCL)
        self.legende("La récurrence est démontrée : 0,5 point.")
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q16 : croissance de (u_n) ────────────────────────────────────
    def chapitre_q16(self, fig):
        badge = self.bandeau_question("16)", "0,5 pt")
        self.ardoise()

        self.etape("q16-enonce")
        but = MathTex(
            r"\text{Montrer que la suite } (u_n) \text{ est croissante}",
            font_size=25,
        )
        self.ecrit(but)
        self.legende(
            "On étudie le signe de la différence u(n+1) - u(n) = g(u(n)).",
        )
        self.pose(3.6)

        self.etape("q16-difference")
        m1 = MathTex(
            r"u_{n+1} - u_n = f(u_n) - u_n = g(u_n)",
            font_size=24,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("La différence de deux termes consécutifs s'identifie à g.")
        self.pose(3.4)

        self.etape("q16-signe")
        m2 = MathTex(
            r"u_n \in\,]\alpha, 1[ \quad \text{et} \quad g(x) > 0 \text{ sur } ]\alpha, 1[ \\"
            r"\implies g(u_n) > 0 \implies u_{n+1} > u_n",
            font_size=22, color=COL_CONCL,
        )
        self.ecrit(m2, buff=0.45)
        self.encadre(couleur=COL_CONCL)

        # Tracé d'escalier (cobweb) sur la figure
        u_val = U0_ILLUSTRATION
        escalier = VGroup()
        for _ in range(3):
            u_next = _f(u_val)
            p_diag = fig["ax"].c2p(u_val, u_val)
            p_curve = fig["ax"].c2p(u_val, u_next)
            p_next_diag = fig["ax"].c2p(u_next, u_next)
            escalier.add(Line(p_diag, p_curve, color=COL_CONCL, stroke_width=2.5))
            escalier.add(Line(p_curve, p_next_diag, color=COL_CONCL, stroke_width=2.5))
            u_val = u_next
        self.play(Create(escalier, run_time=1.8))
        fig["escalier"] = escalier

        self.legende(
            "L'escalier monte vers 1 : la suite (un) est strictement",
            "croissante. 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q17 : convergence et limite de (u_n) ─────────────────────────
    def chapitre_q17(self, fig):
        badge = self.bandeau_question("17)", "0,75 pt")
        self.ardoise()

        self.etape("q17-enonce")
        but = MathTex(
            r"\text{Déduire la convergence de } (u_n) \text{ et calculer sa limite}",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "Toute suite croissante et majorée converge : on détermine",
            "ensuite la limite via l'équation du point fixe.",
        )
        self.pose(4.0)

        self.etape("q17-convergence")
        m1 = MathTex(
            r"(u_n) \text{ est croissante et majorée par } 1 \\"
            r"\implies (u_n) \text{ converge vers une limite } \ell \le 1",
            font_size=22,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "De plus, (un) est croissante à partir de u0 > alpha,",
            "donc la limite vérifie l >= u0 > alpha.",
        )
        self.pose(4.0)

        self.etape("q17-point-fixe")
        m2 = MathTex(
            r"f \text{ est continue et } u_{n+1} = f(u_n) \implies f(\ell) = \ell \\"
            r"\iff g(\ell) = 0 \iff \ell = \alpha \quad \text{ou} \quad \ell = 1",
            font_size=22,
        )
        self.ecrit(m2, buff=0.45)
        self.legende("alpha et 1 sont les deux seuls zéros de g.")
        self.pose(3.8)

        self.etape("q17-conclusion")
        m3 = MathTex(
            r"\text{Or } \ell \ge u_0 > \alpha \implies \ell = 1 \\"
            r"\lim_{n\to+\infty} u_n = 1",
            font_size=25, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.45)
        self.encadre(couleur=COL_LIM)
        self.legende("La limite de la suite est 1 : 0,75 point.")
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        self.play(FadeOut(self.fig_membres(fig)))
        if getattr(self, "_carte_ref", None) is not None:
            self.play(FadeOut(self._carte_ref))
            self._carte_ref = None
        return fig

    # ── Clôture et bilan du problème ─────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir · BAC 2023", font_size=30, color=BAC_INK),
            Text("• Domaine : ]0 ; +∞[ vérifié avant tout calcul.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Croissances comparées : substitution t = √x pour lever l'indétermination.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Signe de la dérivée seconde lu sur les variations de f' (sans calcul).",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Position relative (Δ)/(Cf) pilotée par le signe de g.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Suite récurrente : point fixe l = 1 par encadrement.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("11 points maîtrisés — sujet réel, barème officiel respecté.",
                 font_size=19, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        if bilan.width > 12.0:
            bilan.scale_to_fit_width(12.0)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
