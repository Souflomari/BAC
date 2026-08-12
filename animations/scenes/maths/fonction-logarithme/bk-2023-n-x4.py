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
        grad = VGroup(
            _grad_x(ax, [1, 2, 3, 4, 5], ["1", "2", "3", "4", "5"]),
            _grad_y(ax, [-2, -1, 1, 2], ["-2", "-1", "1", "2"]),
        )
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
        self.play(FadeIn(grad), run_time=0.8)
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
            "c1": c1,
            "c2": c2,
            "c3": c3,
            "frontiere": frontiere,
            "lbl_front": lbl_front,
            "q_bas": q_bas,
            "q_haut": q_haut,
            "group": VGroup(
                ax, grad, o_lbl, x_lbl, frontiere, lbl_front, c1, c2, c3,
                q_bas, q_haut,
            ),
        }
