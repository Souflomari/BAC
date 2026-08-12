"""Explication animée v4 — Bac 2020 SN (SExp), Exercice 3 : limites,
dérivabilité et calcul intégral.

Source de vérité : content/maths/limites-continuite/bank.yaml, entrée
bk-2020-n-x3 (vérifiée, AlloSchool NS22F, element/109797, Exercice 3,
4 points). Fonction g définie sur ]0,+∞[ par :

    g(x) = 2√x - 2 - ln x

Six questions : 1a) montrer que g'(x) = (√x-1)/x (0,5 pt) ; 1b) montrer
que g est croissante sur [1,+∞[ (0,5 pt) ; 1c) en déduire l'encadrement
0 ≤ ln x ≤ 2√x sur [1,+∞[ (0,5 pt) ; 1d) élever au cube, diviser par x²,
obtenir 0 ≤ (ln x)³/x² ≤ 8/√x, et en déduire par le théorème des
gendarmes lim_{x→+∞} (ln x)³/x² = 0 — une limite de croissances
comparées (1 pt, la question la plus lourde) ; 2a) vérifier que
G(x) = x(-1 + 4/3 √x - ln x) est une primitive de g sur ]0,+∞[
(0,75 pt) ; 2b) calculer ∫₁⁴ g(x) dx = 19/3 - 4 ln 4 (0,75 pt). Total :
4 points.

SCOPE NOTE (voir bank.yaml en tête de fichier) : cet exercice déborde
largement le corps R1–R6 de la leçon limites-continuite — 1a/1b
mobilisent la dérivée (chapitre dérivabilité), 1c/1d un encadrement
(théorème des gendarmes, absent de R1–R6), 2a/2b une primitive et une
intégrale (chapitre calcul-integral). Seule la toute dernière étape de
1d (passer de l'encadrement à la limite) touche vraiment au cœur
« limites » de la notion — c'est la lecture retenue par la source, et
c'est là que l'effort de mise en sens est concentré dans cette scène.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape, y compris les règles de dérivation admises,
rappelées avant d'être utilisées), couche de sens AVANT chaque calcul —
la courbe de g tracée avant toute algèbre (question 1a), un second
tracé pour VOIR l'encadrement ln x ≤ 2√x avant de le démontrer (1c), un
troisième tracé pour VOIR (ln x)³/x² et sa borne 8/√x s'aplatir vers
zéro — l'asymptote horizontale dessinée comme son propre geste au moment
où la limite est conclue (1d, le geste de sens central de la scène) — et
l'aire sous la courbe de g entre 1 et 4 pour VOIR l'intégrale avant de
la calculer (2b). Trois pièges reçoivent leur étape rouge dédiée : le
facteur qui disparaît dans la dérivée de 2√x (1a), l'obligation de
NOMMER le théorème des gendarmes plutôt que d'affirmer la limite (1d),
la règle du produit qu'on oublie de développer en entier (2a).

Rendu : ../../render.sh scenes/maths/limites-continuite/bk-2020-n-x3.py
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
    MathTex,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
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

# Identité visuelle stable (DESIGN.md §2) : g = objet nº1 (sarcelle),
# les courbes-outils (bornes d'un encadrement : 2√x, puis 8/√x) = objet
# nº2 clair (sarcelle claire), ln x et (ln x)³/x² = objet nº3 (or),
# conclusion/limite = vert, piège = rouge, réservé à ça.
COL_G = BAC_ACCENT
COL_BORNE = BAC_ACCENT_LIGHT
COL_LN = BAC_WARNING
COL_LIM = BAC_SUCCESS

# ── Valeurs exactes, citées de la banque vérifiée ───────────────────────


def _g(x):
    """g(x) = 2√x - 2 - ln x — la fonction étudiée (énoncé)."""
    return 2 * np.sqrt(x) - 2 - np.log(x)


def _maj_ln(x):
    """2√x — le majorant de ln x établi à la question 1c."""
    return 2 * np.sqrt(x)


def _h(x):
    """(ln x)³ / x² — l'expression de la question 1d."""
    return np.log(x) ** 3 / x**2


def _borne_h(x):
    """8/√x — le majorant de (ln x)³/x² établi à la question 1d."""
    return 8 / np.sqrt(x)


def _G(x):
    """G(x) = x(-1 + 4/3 √x - ln x) — la primitive de la question 2a."""
    return x * (-1 + (4 / 3) * np.sqrt(x) - np.log(x))


# Contrôles numériques des valeurs citées dans la banque (aucune valeur
# affichée à l'écran n'est recalculée différemment de ces vérifications).
assert abs(_g(1) - 0.0) < 1e-9  # q1c : g(1) = 2-2-0 = 0
assert abs(_G(1) - 1 / 3) < 1e-9  # q2b : G(1) = 1/3
assert abs(_G(4) - (20 / 3 - 4 * np.log(4))) < 1e-9  # q2b : G(4) = 20/3-4ln4


def _pose_axes(axes, x_ref: float, y_ref: float, x_target: float, y_target: float):
    """Aligne le point de données (x_ref, y_ref) sur le point-cible de la
    scène (x_target, y_target) — même procédé que _pose_ligne des scènes
    de suites : robuste, indépendant de la convention de centrage par
    défaut de Axes."""
    axes.shift((x_target * RIGHT + y_target * UP) - axes.c2p(x_ref, y_ref))
    return axes


# Configuration commune des trois systèmes d'axes de cette scène : traits
# discrets, sans graduation ni pointe automatique (les valeurs utiles
# sont annotées à la main, DESIGN.md — moins de bruit visuel).
AXIS_CONFIG = {
    "stroke_color": BAC_INK_MUTED,
    "stroke_width": 2,
    "include_ticks": False,
    "include_tip": False,
}


NARRATION = {
    "titre": "Exercice trois du bac deux mille vingt, session normale, "
    "sciences expérimentales : limites, dérivabilité et calcul intégral, "
    "sur quatre points. On étudie une fonction en racine de x et "
    "logarithme, avec un encadrement qui mène à une limite de "
    "croissances comparées, puis une primitive et une intégrale.",
    "intro": "On considère la fonction numérique g, définie sur "
    "l'intervalle ouvert zéro plus l'infini, par g de x égale deux "
    "racine de x, moins deux, moins logarithme népérien de x.",
    "plan": "Avant tout calcul, on regarde l'allure de cette courbe : "
    "elle descend, touche l'axe exactement en x égale un, puis remonte.",
    "q1a": "Question un a, zéro virgule cinq point. On calcule la "
    "dérivée de g, terme à terme, pour retrouver la forme demandée.",
    "q1b": "Question un b, zéro virgule cinq point. On signe cette "
    "dérivée sur l'intervalle un plus l'infini pour montrer que g y est "
    "croissante.",
    "q1c": "Question un c, zéro virgule cinq point. On déduit de cette "
    "croissance un encadrement du logarithme népérien de x par deux "
    "racine de x.",
    "q1d": "Question un d, un point — la plus lourde de l'exercice. On "
    "élève cet encadrement au cube, on divise par x carré, et on en "
    "déduit, par le théorème des gendarmes, une limite de croissances "
    "comparées : zéro.",
    "q2a": "Question deux a, zéro virgule soixante-quinze point. On sort "
    "du terrain des limites : on vérifie, par dérivation, qu'une "
    "fonction G donnée est une primitive de g.",
    "q2b": "Question deux b, zéro virgule soixante-quinze point. On "
    "calcule l'intégrale de g entre un et quatre, à l'aide de cette "
    "primitive.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        figure_g = self.chapitre_plan()
        self.chapitre_q1a()
        self.chapitre_q1b(figure_g)
        figure_enc = self.chapitre_q1c(figure_g)
        figure_lim = self.chapitre_q1d(figure_enc)
        self.chapitre_q2a(figure_lim)
        self.chapitre_q2b()
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2020 · SESSION NORMALE · SCIENCES EXP.",
            "Limites, dérivabilité et calcul intégral",
            "Exercice 3 — 4 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé : g et son domaine ───────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère la fonction numérique g, définie sur ]0,+∞[, par :",
            font_size=26,
        ).shift(2.3 * UP)
        defg = MathTex(
            r"g(x) = 2\sqrt{x} - 2 - \ln x", font_size=42, color=COL_G
        ).next_to(entete, DOWN, buff=0.6)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(defg, shift=0.2 * UP), run_time=1.2)
        self.legende(
            "Une fonction définie pour x strictement positif — le",
            "domaine du logarithme. On la retrouve à CHAQUE question.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(entete))
        self.play(
            defg.animate.scale(0.62).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        )
        self.epingle(defg)
        return defg

    # ── La couche de sens : l'allure de g, AVANT toute algèbre ────────
    def chapitre_plan(self):
        self.etape("plan-axes")
        axes = Axes(
            x_range=[0, 8.5, 2],
            y_range=[-0.4, 1.9, 0.5],
            x_length=4.4,
            y_length=3.2,
            axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes, 0, 0, 1.0, 0.0)
        o_lbl = MathTex("O", font_size=26, color=BAC_INK_SOFT).next_to(
            axes.c2p(0, 0), DOWN + LEFT, buff=0.1
        )
        x_lbl = MathTex("x", font_size=26, color=BAC_INK_MUTED).next_to(
            axes.c2p(8.5, 0), RIGHT, buff=0.1
        )
        self.play(Create(axes, run_time=1.8), FadeIn(o_lbl))
        self.play(FadeIn(x_lbl))
        self.legende(
            "On regarde d'abord l'allure de g, avant toute preuve —",
            "juste pour VOIR ce qu'on va démontrer.",
        )
        self.pose(3.0)

        self.etape("plan-courbe")
        branch_dec = axes.plot(_g, x_range=[0.12, 1], color=BAC_INK_MUTED)
        branch_inc = axes.plot(_g, x_range=[1, 8.5], color=BAC_INK_MUTED)
        self.play(Create(branch_dec, run_time=1.6))
        self.play(Create(branch_inc, run_time=1.8))
        self.legende(
            "La courbe de g : elle descend, puis remonte — les deux",
            "branches, pour l'instant dans la même couleur.",
        )
        self.pose(3.2)

        self.etape("plan-minimum")
        min_dot = Dot(axes.c2p(1, 0), color=COL_G, radius=0.075)
        min_lbl = MathTex("x=1", font_size=24, color=COL_G).next_to(
            min_dot, DOWN, buff=0.16
        )
        self.play(FadeIn(min_dot, scale=1.6), Write(min_lbl))
        self.legende(
            "Elle touche l'axe exactement en x = 1 — on va le",
            "RETROUVER par le calcul dans un instant.",
        )
        self.pose(3.2)
        self.efface_legende()

        return {
            "axes": axes,
            "branch_dec": branch_dec,
            "branch_inc": branch_inc,
            "o_lbl": o_lbl,
            "x_lbl": x_lbl,
            "min_dot": min_dot,
            "min_lbl": min_lbl,
            "group": VGroup(
                axes, branch_dec, branch_inc, o_lbl, x_lbl, min_dot, min_lbl
            ),
        }

    # ── Q1a : dérivée g'(x) = (√x-1)/x ─────────────────────────────
    def chapitre_q1a(self):
        badge = self.bandeau_question("1) a)", "0,5 pt")
        self.ardoise()

        self.etape("q1a-enonce")
        but = MathTex(
            r"\text{Montrer que, pour tout } x \text{ de } ]0,+\infty[,\ "
            r"g'(x) = \dfrac{\sqrt{x}-1}{x}",
            font_size=26,
        )
        self.ecrit(but)
        self.legende(
            "On calcule la dérivée de g, terme à terme, pour retrouver",
            "cette forme précise.",
        )
        self.pose(3.0)

        self.etape("q1a-rappel-derivees")
        outil = MathTex(
            r"(2\sqrt{x})' = \dfrac{1}{\sqrt{x}}, \quad (-2)' = 0, \quad"
            r" (-\ln x)' = -\dfrac{1}{x}",
            font_size=22,
            color=BAC_INK_SOFT,
        )
        self.ecrit(outil)
        self.encadre(couleur=BAC_ACCENT)
        self.legende(
            "On admet trois dérivées usuelles : celle de 2 racine de x,",
            "celle d'une constante (nulle), celle de moins ln x.",
        )
        self.pose(3.6)

        self.etape("q1a-piege-facteur")
        piege = VGroup(
            Text("ATTENTION : la dérivée de racine de x vaut 1 sur DEUX",
                 font_size=19, color=BAC_ERROR),
            Text("racine de x — le 2 de 2 racine de x s'annule avec ce",
                 font_size=19, color=BAC_ERROR),
            Text("facteur : (2√x)' = 2×1/(2√x) = 1/√x, JAMAIS 2/√x.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : oublier que le 2 s'annule avec le",
            "un demi caché dans la dérivée de racine de x.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q1a-derivee-terme-a-terme")
        m1 = MathTex(r"g'(x) = \dfrac{1}{\sqrt{x}} - \dfrac{1}{x}", font_size=32)
        self.ecrit(m1, buff=0.55)
        self.legende(
            "On additionne les trois dérivées admises : c'est la",
            "dérivée de g.",
        )
        self.pose(3.0)

        self.etape("q1a-meme-denominateur")
        m2 = MathTex(r"\dfrac{1}{\sqrt{x}} = \dfrac{\sqrt{x}}{x}", font_size=30)
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On met la première fraction au même dénominateur x, en",
            "multipliant haut et bas par racine de x.",
        )
        self.pose(3.2)

        self.etape("q1a-conclusion")
        m3 = MathTex(
            r"g'(x) = \dfrac{\sqrt{x}}{x} - \dfrac{1}{x} = \dfrac{\sqrt{x}-1}{x}",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=BAC_ACCENT_STRONG)
        self.legende(
            "On regroupe sur le même dénominateur x : c'est exactement",
            "le résultat annoncé. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q1b : g croissante sur [1,+∞[ ─────────────────────────────
    def chapitre_q1b(self, figure_g):
        badge = self.bandeau_question("1) b)", "0,5 pt")
        self.ardoise()

        self.etape("q1b-enonce")
        but = MathTex(
            r"\text{Montrer que } g \text{ est croissante sur } [1,+\infty[",
            font_size=32,
        )
        self.ecrit(but)
        self.legende(
            "Le signe de g', trouvée à la question précédente, donne",
            "le sens de variation.",
        )
        self.pose(3.0)

        self.etape("q1b-signe-numerateur")
        m1 = MathTex(
            r"x \ge 1 \implies \sqrt{x} \ge 1 \implies \sqrt{x}-1 \ge 0",
            font_size=27,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "La racine carrée est croissante : x supérieur ou égal à 1",
            "entraîne racine de x supérieure ou égale à 1.",
        )
        self.pose(3.4)

        self.etape("q1b-signe-denominateur")
        m2 = MathTex(r"x \ge 1 \implies x > 0", font_size=32)
        self.ecrit(m2, buff=0.5)
        self.legende("Le dénominateur x est strictement positif sur [1;+∞[.")
        self.pose(2.8)

        self.etape("q1b-conclusion")
        m3 = MathTex(
            r"g'(x) = \dfrac{\sqrt{x}-1}{x} \ge 0 \ \text{sur}\ [1,+\infty["
            r"\implies g \ \text{croissante sur}\ [1,+\infty[",
            font_size=21, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=BAC_ACCENT_STRONG)
        self.legende(
            "Numérateur positif ou nul, dénominateur strictement positif :",
            "le quotient est positif ou nul — g est croissante. 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()

        self.etape("q1b-confirmation-courbe")
        axes = figure_g["axes"]
        branch_inc = figure_g["branch_inc"]
        self.play(branch_inc.animate.set_color(BAC_ACCENT_STRONG), run_time=1.4)
        fleche = Arrow(
            axes.c2p(1, -0.3), axes.c2p(8.3, -0.3),
            buff=0.08, color=BAC_ACCENT_STRONG, stroke_width=3,
            max_tip_length_to_length_ratio=0.1,
        )
        lbl = Text(
            "croissante sur [1;+∞[", font_size=17, color=BAC_ACCENT_STRONG
        ).next_to(fleche, DOWN, buff=0.08)
        self.play(Create(fleche), FadeIn(lbl))
        figure_g["group"].add(fleche, lbl)
        self.legende(
            "On retrouve, sur la courbe, exactement la branche",
            "croissante qu'on vient de démontrer.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(badge))

    # ── Q1c : en déduire 0 ≤ ln x ≤ 2√x sur [1,+∞[ ─────────────────
    def chapitre_q1c(self, figure_g):
        badge = self.bandeau_question("1) c)", "0,5 pt")
        self.ardoise()

        self.etape("q1c-enonce")
        but = MathTex(
            r"\text{En déduire que, pour tout } x \text{ de } [1,+\infty[,\ "
            r"0 \le \ln x \le 2\sqrt{x}",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On exploite la croissance de g, établie à la question",
            "précédente, pour encadrer ln x.",
        )
        self.pose(3.2)

        self.etape("q1c-figure-sens")
        self.play(FadeOut(figure_g["group"]))
        axes_enc = Axes(
            x_range=[1, 9.5, 2],
            y_range=[0, 6.5, 2],
            x_length=4.4,
            y_length=3.4,
            axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes_enc, 1, 0, 0.6, -1.6)
        x_lbl = MathTex("x", font_size=24, color=BAC_INK_MUTED).next_to(
            axes_enc.c2p(9.5, 0), RIGHT, buff=0.1
        )
        self.play(Create(axes_enc, run_time=1.4), FadeIn(x_lbl))
        curve_ln = axes_enc.plot(np.log, x_range=[1, 9.5], color=COL_LN)
        curve_maj = axes_enc.plot(_maj_ln, x_range=[1, 9.5], color=COL_BORNE)
        self.play(Create(curve_ln, run_time=1.6))
        self.play(Create(curve_maj, run_time=1.6))
        area = axes_enc.get_area(
            curve_maj, x_range=[1, 9.5], color=BAC_ACCENT_SUBTLE,
            opacity=0.35, bounded_graph=curve_ln,
        )
        self.play(FadeIn(area))
        lbl_ln = MathTex(r"y=\ln x", font_size=22, color=COL_LN).next_to(
            axes_enc.c2p(8, float(np.log(8))), UP, buff=0.14
        )
        lbl_maj = MathTex(r"y=2\sqrt{x}", font_size=22, color=COL_BORNE).next_to(
            axes_enc.c2p(6, _maj_ln(6)), UP, buff=0.14
        )
        self.play(FadeIn(lbl_ln), FadeIn(lbl_maj))
        self.legende(
            "On regarde d'abord les deux courbes : ln x et deux racine",
            "de x. L'écart entre elles, à partir de 1, est ce qu'on va",
            "démontrer.",
        )
        self.pose(4.0)
        self.efface_legende()

        self.etape("q1c-g-en-1")
        m1 = MathTex(
            r"g(1) = 2\sqrt{1}-2-\ln 1 = 2-2-0 = 0", font_size=28
        )
        self.ecrit(m1)
        self.legende("On évalue g au point 1 : racine de 1 vaut 1, ln de 1 vaut 0.")
        self.pose(2.8)

        self.etape("q1c-monotonie-consequence")
        m2 = MathTex(
            r"x \ge 1 \ \text{et}\ g \ \text{croissante sur}\ [1,+\infty["
            r"\implies g(x) \ge g(1) = 0",
            font_size=19,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "g est croissante (question précédente) : à partir de 1,",
            "elle ne redescend jamais sous g(1).",
        )
        self.pose(3.6)

        self.etape("q1c-isoler-lnx")
        m3 = MathTex(
            r"2\sqrt{x}-2-\ln x \ge 0 \implies \ln x \le 2\sqrt{x}-2",
            font_size=26,
        )
        self.ecrit(m3, buff=0.5)
        self.legende("On développe g(x) supérieur ou égal à 0 et on isole ln x.")
        self.pose(3.0)

        self.etape("q1c-indication")
        indic_titre = Text(
            "Indication de l'énoncé :", font_size=18, color=BAC_INK_SOFT
        )
        m4 = MathTex(
            r"2\sqrt{x}-2 \le 2\sqrt{x} \quad (\text{car}\ -2<0)", font_size=27
        )
        bloc4 = VGroup(indic_titre, m4).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.ecrit(bloc4, buff=0.5)
        self.legende(
            "Retirer 2 rend l'expression plus petite : c'est",
            "l'indication donnée par l'énoncé, immédiate.",
        )
        self.pose(3.4)

        self.etape("q1c-conclusion")
        m5a = MathTex(
            r"x \ge 1 \implies \ln x \ge \ln 1 = 0 \quad (\ln \text{ croissante})",
            font_size=20,
        )
        self.ecrit(m5a, buff=0.5)
        m5b = MathTex(
            r"0 \le \ln x \le 2\sqrt{x} \quad \text{sur}\ [1,+\infty[",
            font_size=28, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m5b, buff=0.5)
        self.encadre(couleur=BAC_ACCENT_STRONG)
        self.legende(
            "On enchaîne les deux inégalités ; la borne basse vient de",
            "la croissance du logarithme (ln 1 = 0). 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

        return {
            "axes": axes_enc,
            "curve_ln": curve_ln,
            "curve_maj": curve_maj,
            "area": area,
            "x_lbl": x_lbl,
            "lbl_ln": lbl_ln,
            "lbl_maj": lbl_maj,
            "group": VGroup(
                axes_enc, curve_ln, curve_maj, area, x_lbl, lbl_ln, lbl_maj
            ),
        }

    # ── Q1d : encadrement cubé, puis la limite (croissances comparées) ─
    def chapitre_q1d(self, figure_enc):
        badge = self.bandeau_question("1) d)", "1 pt")
        self.ardoise()

        self.etape("q1d-enonce")
        but1 = MathTex(
            r"\text{Montrer que, pour tout } x \text{ de } [1,+\infty[,\ "
            r"0 \le \dfrac{(\ln x)^3}{x^2} \le \dfrac{8}{\sqrt{x}}",
            font_size=21,
        )
        but2 = MathTex(
            r"\text{et en déduire } \lim_{x\to+\infty} \dfrac{(\ln x)^3}{x^2}",
            font_size=26,
        )
        self.ecrit(but1)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "La question la plus lourde de l'exercice : un",
            "encadrement, puis une limite de croissances comparées.",
        )
        self.pose(3.6)

        self.etape("q1d-figure-sens")
        self.play(FadeOut(figure_enc["group"]))
        axes_lim = Axes(
            x_range=[1, 55, 10],
            y_range=[0, 8.5, 2],
            x_length=4.6,
            y_length=3.4,
            axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes_lim, 1, 0, 0.7, -1.7)
        x_lbl = MathTex("x", font_size=24, color=BAC_INK_MUTED).next_to(
            axes_lim.c2p(55, 0), RIGHT, buff=0.1
        )
        self.play(Create(axes_lim, run_time=1.4), FadeIn(x_lbl))
        curve_borne = axes_lim.plot(_borne_h, x_range=[1, 55], color=COL_BORNE)
        curve_h = axes_lim.plot(_h, x_range=[1, 55], color=COL_LN)
        self.play(Create(curve_borne, run_time=1.8))
        self.play(Create(curve_h, run_time=1.8))
        lbl_borne = MathTex(
            r"y=\dfrac{8}{\sqrt{x}}", font_size=20, color=COL_BORNE
        ).next_to(axes_lim.c2p(9, _borne_h(9)), UP, buff=0.14)
        lbl_h = MathTex(
            r"y=\dfrac{(\ln x)^3}{x^2}", font_size=18, color=COL_LN
        ).next_to(axes_lim.c2p(22, _h(22)), UP, buff=0.32)
        self.play(FadeIn(lbl_borne), FadeIn(lbl_h))
        self.legende(
            "On regarde d'abord ces deux courbes : le quotient",
            "(ln x)³ sur x², et sa borne 8 sur racine de x — avant",
            "de le démontrer.",
        )
        self.pose(4.0)
        self.efface_legende()

        self.etape("q1d-cuber")
        m1 = MathTex(
            r"0 \le \ln x \le 2\sqrt{x} \implies"
            r" 0 \le (\ln x)^3 \le \left(2\sqrt{x}\right)^3",
            font_size=20,
        )
        self.ecrit(m1)
        self.legende(
            "On élève au cube : les trois membres sont positifs ou",
            "nuls sur [1,+∞[, donc la mise au cube conserve l'ordre.",
        )
        self.pose(3.6)

        self.etape("q1d-develop-cube")
        m2 = MathTex(r"\left(2\sqrt{x}\right)^3 = 8x\sqrt{x} = 8x^{3/2}", font_size=28)
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On développe le cube : 2 au cube fait 8, racine de x au",
            "cube fait x racine de x.",
        )
        self.pose(3.2)

        self.etape("q1d-diviser")
        m3 = MathTex(
            r"0 \le \dfrac{(\ln x)^3}{x^2} \le \dfrac{8x^{3/2}}{x^2} = \dfrac{8}{\sqrt{x}}",
            font_size=23, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.5)
        self.encadre(couleur=BAC_ACCENT_STRONG)
        self.legende(
            "On divise les trois membres par x carré, strictement",
            "positif : l'ordre est conservé et le quotient se",
            "simplifie en 8 sur racine de x.",
        )
        self.pose(3.8)

        self.etape("q1d-limites-des-bornes")
        outil = MathTex(
            r"\sqrt{x}\to+\infty \implies \dfrac{1}{\sqrt{x}}\to 0"
            r" \quad (x\to+\infty)",
            font_size=19, color=BAC_WARNING,
        )
        self.ecrit(outil)
        self.encadre(couleur=BAC_WARNING)
        m4 = MathTex(
            r"\lim_{x\to+\infty} 0 = 0 \qquad \lim_{x\to+\infty} \dfrac{8}{\sqrt{x}} = 0",
            font_size=23,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "Les deux bornes de l'encadrement tendent vers 0 : un",
            "résultat analogue à 1/xⁿ → 0, ici pour racine de x —",
            "hors du corps de cette leçon, cité comme outil.",
        )
        self.pose(4.0)

        self.etape("q1d-piege-gendarmes")
        piege = VGroup(
            Text("ATTENTION : affirmer « croissances comparées » ne",
                 font_size=19, color=BAC_ERROR),
            Text("suffit PAS — il FAUT passer par l'encadrement ET",
                 font_size=19, color=BAC_ERROR),
            Text("NOMMER le théorème des gendarmes : méthode imposée.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique du bac : sauter à la conclusion sans",
            "citer le théorème coûte des points de méthode.",
        )
        self.pose(4.0)
        self.nettoie(garder=1)

        self.etape("q1d-conclusion")
        m5 = MathTex(
            r"\lim_{x\to+\infty} \dfrac{(\ln x)^3}{x^2} = 0",
            font_size=32, color=COL_LIM,
        )
        self.ecrit(m5, buff=0.55)
        self.encadre(couleur=COL_LIM)
        asymptote = DashedLine(
            axes_lim.c2p(1, 0), axes_lim.c2p(55, 0),
            color=COL_LIM, stroke_width=3, dash_length=0.12,
        )
        lbl_asym = Text("limite = 0", font_size=18, color=COL_LIM).next_to(
            axes_lim.c2p(45, 0), UP, buff=0.15
        )
        self.play(Create(asymptote, run_time=1.6))
        self.play(FadeIn(lbl_asym))
        self.play(curve_h.animate.set_color(COL_LIM), run_time=1.2)
        self.legende(
            "Théorème des gendarmes : coincée entre deux bornes qui",
            "tendent vers la même limite, l'expression tend elle aussi",
            "vers zéro — ln x, même au cube, est écrasé par x². 1 point.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

        return {
            "group": VGroup(
                axes_lim, curve_borne, curve_h, x_lbl, lbl_borne, lbl_h,
                asymptote, lbl_asym,
            ),
        }

    # ── Q2a : G est une primitive de g (sortie du terrain limites) ────
    def chapitre_q2a(self, figure_lim):
        badge = self.bandeau_question("2) a)", "0,75 pt")
        self.play(FadeOut(figure_lim["group"]))
        self.ardoise()

        self.etape("q2a-enonce")
        but = MathTex(
            r"\text{Montrer que } G: x \mapsto x\left(-1+\dfrac{4}{3}\sqrt{x}-\ln x\right)"
            r" \text{ est une primitive de } g",
            font_size=19,
        )
        self.ecrit(but)
        self.legende(
            "On sort du terrain des limites : vérifier une primitive,",
            "c'est dériver G et retrouver exactement g.",
        )
        self.pose(3.4)

        self.etape("q2a-developper-G")
        m1 = MathTex(
            r"G(x) = x\left(-1+\dfrac{4}{3}\sqrt{x}-\ln x\right)"
            r" = -x+\dfrac{4}{3}x^{3/2}-x\ln x",
            font_size=19,
        )
        self.ecrit(m1)
        self.legende(
            "On développe G en distribuant x : x fois racine de x",
            "devient x puissance trois demis.",
        )
        self.pose(3.4)

        self.etape("q2a-derivee-premiers-termes")
        m2 = MathTex(
            r"\left(-x+\dfrac{4}{3}x^{3/2}\right)'"
            r" = -1+\dfrac{4}{3}\times\dfrac{3}{2}\,x^{1/2} = -1+2\sqrt{x}",
            font_size=19,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Dérivée des deux premiers termes : trois demis fois x",
            "puissance un demi se simplifie avec quatre tiers en",
            "2 racine de x.",
        )
        self.pose(3.8)

        self.etape("q2a-rappel-regle-produit")
        outil = MathTex(r"(uv)' = u'v + uv'", font_size=30, color=BAC_INK_SOFT)
        self.ecrit(outil, buff=0.55)
        self.encadre(couleur=BAC_ACCENT)
        self.legende(
            "On admet la règle du produit : dérivée du premier facteur",
            "fois le second, plus le premier facteur fois la dérivée",
            "du second.",
        )
        self.pose(3.6)

        self.etape("q2a-piege-produit")
        piege = VGroup(
            Text("ATTENTION : la dérivée d'un produit n'est PAS le",
                 font_size=19, color=BAC_ERROR),
            Text("produit des dérivées — oublier l'un des deux termes,",
                 font_size=19, color=BAC_ERROR),
            Text("u'v OU uv', est l'erreur la plus fréquente ici.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : n'écrire qu'un seul des deux termes",
            "de la règle du produit.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q2a-derivee-produit")
        m3 = MathTex(
            r"\left(x\ln x\right)' = 1\times\ln x+x\times\dfrac{1}{x} = \ln x+1",
            font_size=22,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On applique la règle du produit à x fois ln x — la",
            "dérivée de ln x, admise, vaut 1 sur x.",
        )
        self.pose(3.4)

        self.etape("q2a-conclusion")
        m4 = MathTex(
            r"G'(x) = \left(-1+2\sqrt{x}\right)-\left(\ln x+1\right)"
            r" = 2\sqrt{x}-2-\ln x = g(x)",
            font_size=19, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "On assemble les deux dérivées : on retrouve exactement",
            "g(x). G est donc une primitive de g. 0,75 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q2b : l'intégrale de g entre 1 et 4 ────────────────────────
    def chapitre_q2b(self):
        badge = self.bandeau_question("2) b)", "0,75 pt")
        self.ardoise()

        self.etape("q2b-enonce")
        but = MathTex(r"\text{Calculer } \displaystyle\int_1^4 g(x)\,dx", font_size=36)
        self.ecrit(but)
        self.legende(
            "Une fois la primitive G établie, l'intégrale se calcule",
            "directement par différence de ses valeurs aux bornes.",
        )
        self.pose(3.0)

        self.etape("q2b-figure-sens")
        axes_g2 = Axes(
            x_range=[0, 8.5, 2],
            y_range=[-0.4, 1.9, 0.5],
            x_length=4.4,
            y_length=3.2,
            axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes_g2, 0, 0, 1.0, 0.0)
        o_lbl2 = MathTex("O", font_size=26, color=BAC_INK_SOFT).next_to(
            axes_g2.c2p(0, 0), DOWN + LEFT, buff=0.1
        )
        x_lbl2 = MathTex("x", font_size=26, color=BAC_INK_MUTED).next_to(
            axes_g2.c2p(8.5, 0), RIGHT, buff=0.1
        )
        self.play(
            Create(axes_g2, run_time=1.4), FadeIn(o_lbl2), FadeIn(x_lbl2)
        )
        curve_g2 = axes_g2.plot(_g, x_range=[0.12, 8.5], color=COL_G)
        self.play(Create(curve_g2, run_time=1.8))
        area2 = axes_g2.get_area(
            curve_g2, x_range=[1, 4], color=COL_G, opacity=0.3
        )
        self.play(FadeIn(area2))
        lbl_1 = MathTex("1", font_size=22, color=BAC_INK_SOFT).next_to(
            axes_g2.c2p(1, 0), DOWN, buff=0.14
        )
        lbl_4 = MathTex("4", font_size=22, color=BAC_INK_SOFT).next_to(
            axes_g2.c2p(4, 0), DOWN, buff=0.14
        )
        self.play(FadeIn(lbl_1), FadeIn(lbl_4))
        self.legende(
            "L'intégrale, c'est l'AIRE sous la courbe de g, entre 1 et",
            "4 — avant tout calcul.",
        )
        self.pose(3.8)
        self.efface_legende()

        self.etape("q2b-formule-fondamentale")
        m1 = MathTex(
            r"\displaystyle\int_1^4 g(x)\,dx = G(4)-G(1)", font_size=32
        )
        self.ecrit(m1)
        self.legende(
            "G est une primitive de g : l'intégrale se calcule",
            "directement par différence des valeurs de G aux bornes.",
        )
        self.pose(3.4)

        self.etape("q2b-evaluer-G4")
        m2 = MathTex(
            r"G(4) = 4\left(-1+\dfrac{4}{3}\sqrt{4}-\ln 4\right)"
            r" = 4\left(-1+\dfrac{8}{3}-\ln 4\right)"
            r" = 4\left(\dfrac{5}{3}-\ln 4\right) = \dfrac{20}{3}-4\ln 4",
            font_size=16,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("On évalue G en 4 : racine de 4 vaut 2.")
        self.pose(3.4)

        self.etape("q2b-evaluer-G1")
        m3 = MathTex(
            r"G(1) = 1\times\left(-1+\dfrac{4}{3}\times 1-\ln 1\right)"
            r" = -1+\dfrac{4}{3}-0 = \dfrac{1}{3}",
            font_size=21,
        )
        self.ecrit(m3, buff=0.5)
        self.legende("On évalue G en 1 : racine de 1 vaut 1, ln de 1 vaut 0.")
        self.pose(3.2)

        self.etape("q2b-conclusion")
        m4 = MathTex(
            r"\displaystyle\int_1^4 g(x)\,dx = \dfrac{20}{3}-4\ln 4-\dfrac{1}{3}"
            r" = \dfrac{19}{3}-4\ln 4",
            font_size=23, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "On soustrait les deux résultats : vingt tiers moins un",
            "tiers fait dix-neuf tiers. 0,75 point. Exercice terminé,",
            "quatre points au total.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Dérivées usuelles : (2√x)' = 1/√x (le 2 s'annule avec le",
                 font_size=22, color=BAC_INK_SOFT),
            Text("  1/2), (ln x)' = 1/x — à ADMETTRE, jamais à deviner.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Un encadrement se déduit d'une monotonie : g croissante",
                 font_size=22, color=BAC_INK_SOFT),
            Text("  et g(1) = 0 donnent 0 ≤ ln x ≤ 2√x sur [1;+∞[.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Théorème des gendarmes : coincée entre deux bornes qui",
                 font_size=22, color=BAC_INK_SOFT),
            Text("  tendent vers la même limite, l'expression aussi — à",
                 font_size=22, color=BAC_INK_SOFT),
            Text("  NOMMER, jamais juste affirmer « croissances comparées ».",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Primitive : dériver G doit redonner EXACTEMENT g — la",
                 font_size=22, color=BAC_INK_SOFT),
            Text("  règle du produit (uv)' = u'v+uv' a deux termes, pas un.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Intégrale = aire sous la courbe ; se calcule par",
                 font_size=22, color=BAC_INK_SOFT),
            Text("  différence des valeurs d'une primitive aux bornes.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("4 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=20, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        if bilan.width > 12.5:
            bilan.scale_to_fit_width(12.5)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
