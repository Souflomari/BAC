"""Explication animée v4 — Bac 2017 SN (SM), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-2/bank.yaml, entrée
bk-2017-n-x2 (vérifiée, AlloSchool element/57970, Exercice 2, 3,5 points,
filière Sciences Mathématiques, code sujet NS 25).

Partie 1 : équation (E) : 2z² − 2(m+1+i)z + m² + (1+i)m + i = 0, m ∈ ℂ*.
Δ = (2im)² (un carré parfait) ; racines z1 = (1+i)/2 (m+1), z2 = (1-i)/2
(m+i).

Partie 2 : plan complexe, m ∈ ℂ∖{0,1,i} ; A(1), B(i), M(m), M1(z1), M2(z2).
1-a) z1 = i z2 + 1 ; 1-b) M1 est l'image de M2 par la rotation de centre
Ω(ω=(1+i)/2) et d'angle π/2 ; 2-a) (z2−m)/(z1−m) = i(m−1)/(m−i), l'outil
central du chapitre (un rapport de deux affixes code à la fois alignement
— réel — et angle droit — imaginaire pur) ; 2-b) si M, M1, M2 alignés
alors M appartient au cercle (Γ) de diamètre [AB] ; 2-c) cocyclicité de
Ω, M, M1, M2 : la relation de rotation place Ω sur le cercle de diamètre
[M1M2] POUR TOUT m (Thalès) ; M rejoint ce cercle exactement quand M, A, B
sont alignés — la droite (AB), privée du point Ω (milieu de [AB], cas
dégénéré à 3 points). Chemin de géométrie élémentaire choisi par l'auteur
de la banque (deux cercles de Thalès imbriqués), PAS le birapport — voir
SCOPE NOTE 2 en tête de bank.yaml.

Standard v4 = DESIGN.md : règle du zéro implicite, couche de sens avant
chaque calcul (rotation décentrée, rapport de deux affixes — l'outil du
chapitre —, cercle = distance fixe, réciproque de Thalès, cocyclicité =
quatre points sur UN SEUL cercle), signaling dans la formule, zones
d'écran dures. Deux valeurs de m choisies pour l'illustration (m = 1+i,
sur (Γ) ; m' = -1+2i, sur (AB)) — signalé explicitement à l'écran, jamais
présenté comme une donnée de l'énoncé (m reste un paramètre libre).

Rendu : ../../render.sh scenes/maths/nombres-complexes-2/bk-2017-n-x2.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Angle,
    Arc,
    Circle,
    ComplexPlane,
    Create,
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
    RIGHT,
    UP,
    PI,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_STRONG,
    BAC_BORDER,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Coefficients de l'équation (E) de la partie 1 (forme générale
# a z² + b z + c = 0) — DESIGN.md §2 : n°1 sarcelle forte, n°2 or,
# n°3 vert. Aucune collision avec les points A, B de la partie 2 : ici
# a, b, c ne sont QUE les coefficients, aucun point ne s'appelle "a" ou
# "b" seul (A a pour affixe 1, B a pour affixe i — pas "a" ni "b").
COL_A_EQ, COL_B_EQ, COL_C_EQ = BAC_ACCENT_STRONG, BAC_WARNING, BAC_SUCCESS

# Identité visuelle stable des points de la partie 2. Ω reçoit l'or
# (pivot de la rotation, puis clé de la cocyclicité) ; M reste neutre
# (point LIBRE, paramétré par m) ; M1, M2 réutilisent sarcelle forte et
# vert (ce sont les IMAGES, z1 et z2, déjà nommées en partie 1).
COL_PT_A, COL_PT_B = BAC_ACCENT, BAC_ACCENT_LIGHT
COL_PT_OMEGA = BAC_WARNING
COL_PT_M = BAC_INK_SOFT
COL_PT_M1, COL_PT_M2 = BAC_ACCENT_STRONG, BAC_SUCCESS

NARRATION = {
    "titre": "Exercice deux du bac deux mille dix-sept, session normale, "
    "sciences mathématiques : nombres complexes, sur trois virgule cinq "
    "points. Une équation à paramètre m, une rotation, un rapport "
    "d'affixes qui code angles et alignements, et une cocyclicité de "
    "quatre points construite à partir de deux cercles de Thalès "
    "imbriqués.",
    "q1": "Question un de la partie un. On vérifie que le discriminant de "
    "l'équation, qui dépend du paramètre m, est exactement le carré de "
    "deux i m. Le calcul réutilise une identité déjà connue : un plus i, "
    "au carré, vaut deux i.",
    "q2": "Question deux. Le discriminant est déjà un carré parfait : sa "
    "racine s'obtient sans détour. On applique la formule des racines, "
    "puis on factorise chaque solution pour lui donner une forme "
    "compacte.",
    "plan": "Partie deux : on place ces mêmes nombres dans le plan "
    "complexe, avec deux points fixes A et B, et une famille de points "
    "M, M1, M2 qui dépendent du paramètre m. Pour voir la construction, "
    "on choisit une valeur particulière de m.",
    "q1a2": "Question un a de la partie deux. Une vérification directe : "
    "on remplace z2 par sa valeur et on retombe exactement sur z1.",
    "q1b2": "Question un b. Cette égalité est une rotation cachée : on "
    "cherche son centre, le point fixe de la transformation, puis on "
    "l'exprime sous la forme décentrée d'une rotation d'angle un quart "
    "de tour.",
    "q2a2": "Question deux a. On introduit l'outil central du chapitre : "
    "un rapport de deux affixes. Réel, il signale un alignement ; "
    "imaginaire pur, il signale un angle droit. On en vérifie ici la "
    "valeur exacte.",
    "q2b2": "Question deux b. Si M, M1 et M2 sont alignés, ce rapport "
    "devient réel — et cela force M à se trouver sur un cercle bien "
    "précis, celui de diamètre [AB].",
    "q2c2": "Question deux c, la plus riche : quatre points cocycliques. "
    "La relation de rotation place Ω sur un premier cercle, toujours le "
    "même quel que soit m. M rejoint ce cercle exactement quand il est "
    "sur la droite (AB) — privée d'un point à exclure.",
}

# ── Partie 2 : les points fixes ──────────────────────────────────────
A_AFF = complex(1, 0)
B_AFF = complex(0, 1)
OMEGA_AFF = complex(0.5, 0.5)  # ω = (1+i)/2, point fixe de z ↦ iz+1

# Illustration : m est un paramètre LIBRE (m ∈ ℂ∖{0,1,i}) ; pour DESSINER
# M, M1, M2, on choisit m = 1+i, qui a la propriété remarquable d'être
# exactement sur le cercle (Γ) de diamètre [AB] — utile pour rendre la
# question 2-b concrète. Signalé explicitement à l'écran comme un choix
# d'illustration, jamais présenté comme une donnée de l'énoncé.
M_AFF = complex(1, 1)
M1_AFF = complex(0.5, 1.5)  # z1 = (1+i)/2 (m+1) pour m = 1+i
M2_AFF = complex(1.5, 0.5)  # z2 = (1-i)/2 (m+i) pour m = 1+i

# Seconde illustration, pour la question 2-c (cocyclicité) : m' = -1+2i,
# choisi SUR la droite (AB) (x+y=1), pour donner un exemple concret où
# les quatre points Ω, M', M1', M2' sont réellement cocycliques.
MP_AFF = complex(-1, 2)
M1P_AFF = complex(-1, 1)  # z1' pour m' = -1+2i
M2P_AFF = complex(1, 2)  # z2' pour m' = -1+2i


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_q1()
        self.chapitre_q2()
        (
            plan, a_dot, a_lbl, b_dot, b_lbl,
            m_dot, m_lbl, m1_dot, m1_lbl, m2_dot, m2_lbl,
        ) = self.chapitre_plan()
        self.chapitre_q1a2()
        omega_dot, omega_lbl = self.chapitre_q1b2(plan, m_dot, m1_dot, m2_dot)
        self.chapitre_q2a2(plan, m_dot, m1_dot, m2_dot)
        self.chapitre_q2b2(plan, a_dot, b_dot, omega_dot, m_dot, m1_dot, m2_dot)
        self.chapitre_q2c2(
            plan, a_dot, a_lbl, b_dot, b_lbl, omega_dot, omega_lbl,
            m_dot, m_lbl, m1_dot, m1_lbl, m2_dot, m2_lbl,
        )
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2017 · SESSION NORMALE · SCIENCES MATH.",
            "Nombres complexes",
            "Exercice 2 — 3,5 points · sujet officiel NS 25",
        )

    # ── Partie 1, Q1 : vérifier Δ = (2im)² ───────────────────────────
    def chapitre_q1(self):
        badge = self.bandeau_question("Partie 1 — 1)", "0,5 pt")

        self.etape("q1-enonce")
        domaine = Text("Soit m un nombre complexe NON NUL.", font_size=26).shift(
            2.7 * UP
        )
        eq = MathTex(
            "(E)\\,:\\ ", "2", "z^2", "-2(m+1+i)", "z", "+", "m^2+(1+i)m+i", "=0",
            font_size=40,
        ).next_to(domaine, DOWN, buff=0.5)
        self.play(FadeIn(domaine, shift=0.15 * DOWN))
        self.play(Write(eq), run_time=1.8)
        self.legende(
            "Les coefficients de (E) dépendent du paramètre m — un nombre",
            "complexe non nul, mais pas forcément réel.",
        )
        self.pose(3.0)

        self.etape("q1-coefficients")
        lab_a = MathTex("a=2", font_size=34, color=COL_A_EQ).to_edge(
            LEFT, buff=0.8
        ).shift(0.55 * UP)
        lab_b = MathTex("b=-2(m+1+i)", font_size=34, color=COL_B_EQ).next_to(
            lab_a, RIGHT, buff=1.0
        )
        lab_c = MathTex("c=m^2+(1+i)m+i", font_size=30, color=COL_C_EQ).next_to(
            lab_b, RIGHT, buff=1.0
        )
        cadre_a = self.entoure(eq[1], COL_A_EQ)
        self.play(FadeIn(lab_a, shift=0.15 * UP))
        fleche_a = self.fleche_vers(eq[1], lab_a, COL_A_EQ)
        cadre_b = self.entoure(eq[3], COL_B_EQ)
        self.play(FadeIn(lab_b, shift=0.15 * UP))
        fleche_b = self.fleche_vers(eq[3], lab_b, COL_B_EQ)
        cadre_c = self.entoure(eq[6], COL_C_EQ)
        self.play(FadeIn(lab_c, shift=0.15 * UP))
        fleche_c = self.fleche_vers(eq[6], lab_c, COL_C_EQ)
        self.legende(
            "Cette fois, a n'est PAS caché : il est écrit, 2. Devant b,",
            "attention au signe : b = −2(m+1+i), avec son moins.",
        )
        self.pose(3.6)

        self.etape("q1-outil-discriminant")
        labels = VGroup(lab_a, lab_b, lab_c)
        cadres = VGroup(cadre_a, cadre_b, cadre_c)
        fleches = VGroup(fleche_a, fleche_b, fleche_c)
        # L'équation part ICI (pas à l'étape suivante) : la rangée de
        # labels monte exactement là où elle s'affichait — défaut d'audit
        # (petits labels colorés par-dessus les glyphes de (E)).
        self.play(
            FadeOut(cadres), FadeOut(fleches),
            FadeOut(domaine), FadeOut(eq),
            labels.animate.scale(0.82).to_edge(UP, buff=1.85),
        )
        delta_def = MathTex(r"\Delta = b^2 - 4ac", font_size=40).shift(0.3 * UP)
        cadre_outil = SurroundingRectangle(
            delta_def, color=BAC_ACCENT, buff=0.22, corner_radius=0.1
        )
        self.play(Write(delta_def), Create(cadre_outil))
        self.legende(
            "La formule vaut aussi dans les complexes. On ne nous demande",
            "pas de la deviner : l'énoncé donne déjà le résultat à VÉRIFIER.",
        )
        self.pose(3.4)

        self.etape("q1-substituer")
        self.play(
            FadeOut(cadre_outil),
            delta_def.animate.to_edge(LEFT, buff=0.7).to_edge(UP, buff=1.35),
        )
        c1a = MathTex(
            r"\Delta = \big[2(m+1+i)\big]^2 - 4\times2\times\big(m^2+(1+i)m+i\big)",
            font_size=26,
        ).next_to(delta_def, DOWN, aligned_edge=LEFT, buff=0.5)
        c1b = MathTex(
            r"\Delta = 4(m+1+i)^2 - 8\big(m^2+(1+i)m+i\big)", font_size=28,
        ).next_to(c1a, DOWN, aligned_edge=LEFT, buff=0.35)
        self.play(Write(c1a))
        self.play(Write(c1b))
        self.legende(
            "On remplace b et a, c par leurs valeurs : b² efface le signe",
            "moins ; 4ac devient 4 fois 2 fois (...), soit 8 fois (...).",
        )
        self.pose(3.6)

        self.etape("q1-identite-rappel")
        rappel = MathTex(
            r"(1+i)^2 = 1+2i+i^2 = 2i", font_size=30, color=BAC_INK_SOFT,
        ).to_edge(RIGHT, buff=1.1).shift(0.9 * UP)
        cadre_rappel = SurroundingRectangle(
            rappel, color=BAC_INK_MUTED, buff=0.16, corner_radius=0.08
        )
        self.play(FadeIn(rappel), Create(cadre_rappel))
        self.legende(
            "Un rappel qui va tout débloquer : un plus i, au carré, vaut",
            "deux i — déjà vu au chapitre précédent.",
        )
        self.pose(3.4)

        self.etape("q1-developper-carre")
        c2 = MathTex(
            r"(m+1+i)^2 = m^2 + 2(1+i)m + (1+i)^2 = m^2+2(1+i)m+2i",
            font_size=24,
        ).next_to(c1b, DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(Write(c2))
        self.legende(
            "On développe le carré de la somme, puis on remplace",
            "(1+i)² par 2i grâce au rappel — les deux termes du milieu",
            "et le terme constant se simplifient d'un coup.",
        )
        self.pose(3.6)
        self.play(FadeOut(rappel), FadeOut(cadre_rappel))

        self.etape("q1-developper-4-8")
        self.play(
            FadeOut(c1a), FadeOut(c1b),
            c2.animate.next_to(delta_def, DOWN, aligned_edge=LEFT, buff=0.5),
        )
        c3a = MathTex(
            r"4(m+1+i)^2 = 4m^2+8(1+i)m+8i", font_size=26,
        ).next_to(c2, DOWN, aligned_edge=LEFT, buff=0.4)
        c3b = MathTex(
            r"8\big(m^2+(1+i)m+i\big) = 8m^2+8(1+i)m+8i", font_size=26,
        ).next_to(c3a, DOWN, aligned_edge=LEFT, buff=0.3)
        self.play(Write(c3a))
        self.play(Write(c3b))
        self.legende(
            "On multiplie le développement par 4, et l'expression de c",
            "par 8. Les deux termes en (1+i)m ET les deux termes en i",
            "tombent EXACTEMENT identiques des deux côtés.",
        )
        self.pose(4.0)

        self.etape("q1-conclusion")
        self.play(
            FadeOut(c2),
            VGroup(c3a, c3b).animate.next_to(delta_def, DOWN, aligned_edge=LEFT, buff=0.5),
        )
        c4a = MathTex(
            r"\Delta = \big[4m^2+8(1+i)m+8i\big] - \big[8m^2+8(1+i)m+8i\big]",
            font_size=22,
        ).next_to(c3b, DOWN, aligned_edge=LEFT, buff=0.45)
        c4b = MathTex(
            r"\Delta = -4m^2 = (2im)^2", font_size=36, color=BAC_ACCENT_STRONG,
        ).next_to(c4a, DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(Write(c4a))
        self.play(Write(c4b))
        self.legende(
            "Les termes identiques s'annulent : il reste −4m². Et −4m²,",
            "c'est exactement (2im)², puisque i² = −1. Vérifié — 0,5 pt.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(
            FadeOut(VGroup(badge, labels, delta_def, c3a, c3b, c4a, c4b))
        )

    # ── Partie 1, Q2 : résoudre (E) dans ℂ ───────────────────────────
    def chapitre_q2(self):
        badge = self.bandeau_question("Partie 1 — 2)", "0,5 pt")

        self.etape("q2-enonce")
        but = Text("Résoudre (E) dans ℂ.", font_size=30).shift(2.5 * UP)
        recall = MathTex(
            r"\Delta = (2im)^2 \quad (\text{question précédente})",
            font_size=30, color=BAC_INK_SOFT,
        ).next_to(but, DOWN, buff=0.55)
        self.play(Write(but))
        self.play(FadeIn(recall, shift=0.15 * UP))
        self.legende(
            "On repart du résultat vérifié à la question précédente :",
            "Delta est déjà écrit comme un carré.",
        )
        self.pose(3.0)

        self.etape("q2-racine-immediate")
        racine = MathTex(
            r"\delta = 2im \ \text{ est une racine carrée de } \Delta",
            font_size=32,
        ).next_to(recall, DOWN, buff=0.6)
        self.play(Write(racine))
        self.legende(
            "Δ est DÉJÀ un carré parfait : sa racine ne demande AUCUN",
            "calcul supplémentaire — c'est directement deux i m.",
        )
        self.pose(3.2)

        self.etape("q2-formule")
        self.play(FadeOut(but), FadeOut(recall), racine.animate.to_edge(LEFT, buff=0.75).to_edge(UP, buff=1.3))
        f1a = MathTex(
            r"z = \dfrac{-b \pm \delta}{2a} = \dfrac{2(m+1+i)\pm 2im}{4}",
            font_size=30,
        ).next_to(racine, DOWN, aligned_edge=LEFT, buff=0.55)
        f1b = MathTex(
            r"z = \dfrac{(m+1+i)\pm im}{2}", font_size=36,
        ).next_to(f1a, DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(Write(f1a))
        self.play(Write(f1b))
        self.legende(
            "Formule des racines : moins b, plus ou moins δ, sur 2a. On",
            "remplace, puis on simplifie chaque terme par 2.",
        )
        self.pose(3.4)

        self.etape("q2-factoriser-z1")
        self.play(
            FadeOut(racine), FadeOut(f1a),
            f1b.animate.to_edge(LEFT, buff=0.75).to_edge(UP, buff=1.3),
        )
        z1a = MathTex(
            r"z_1 = \dfrac{(m+1+i)+im}{2} = \dfrac{m(1+i)+(1+i)}{2}",
            font_size=26,
        ).next_to(f1b, DOWN, aligned_edge=LEFT, buff=0.55)
        z1b = MathTex(
            r"z_1 = \dfrac{(1+i)(m+1)}{2}", font_size=36, color=COL_PT_M1,
        ).next_to(z1a, DOWN, aligned_edge=LEFT, buff=0.35)
        self.play(Write(z1a))
        self.play(Write(z1b))
        self.legende(
            "Signe +. On regroupe m + im = m(1+i), puis on factorise",
            "encore par (1+i) : le numérateur entier se met en facteur.",
        )
        self.pose(3.6)

        self.etape("q2-factoriser-z2")
        self.play(
            FadeOut(f1b), FadeOut(z1a),
            z1b.animate.to_edge(LEFT, buff=0.75).to_edge(UP, buff=1.3),
        )
        z2a = MathTex(
            r"z_2 = \dfrac{(m+1+i)-im}{2} = \dfrac{m(1-i)+(1+i)}{2}",
            font_size=26,
        ).next_to(z1b, DOWN, aligned_edge=LEFT, buff=0.55)
        z2b = MathTex(
            r"z_2 = \dfrac{(1-i)(m+i)}{2}", font_size=36, color=COL_PT_M2,
        ).next_to(z2a, DOWN, aligned_edge=LEFT, buff=0.35)
        self.play(Write(z2a))
        self.play(Write(z2b))
        self.legende(
            "Signe −. On regroupe m − im = m(1−i) ; on vérifie que",
            "(1−i)(m+i) redonne bien le même numérateur, développé.",
        )
        self.pose(3.6)

        self.etape("q2-solutions")
        self.play(FadeOut(z1b), FadeOut(z2a), FadeOut(z2b))
        sols = MathTex(
            r"S = \left\{\ \dfrac{(1+i)(m+1)}{2}\ ;\ \dfrac{(1-i)(m+i)}{2}\ \right\}",
            font_size=30, color=BAC_ACCENT,
        ).move_to(0.3 * UP)
        self.play(Write(sols), run_time=1.8)
        self.legende(
            "Deux solutions, chacune factorisée. Dans la partie 2, elles",
            "deviendront les affixes de deux points, M1 et M2 — 0,5 pt.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, sols)))

    # ── Partie 2 : le plan complexe, A, B, et la famille M/M1/M2 ────
    def chapitre_plan(self):
        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-2, 2.5, 1],
            y_range=[-0.6, 2.9, 1],
            x_length=5.2,
            y_length=4.0,
            background_line_style={
                "stroke_color": BAC_BORDER, "stroke_width": 1, "stroke_opacity": 0.8,
            },
            axis_config={
                "stroke_color": BAC_INK_MUTED, "stroke_width": 2,
                "include_ticks": False, "include_tip": False,
            },
        # 0,15 (pas 0,6) : à 0,6 les étiquettes du bas de la figure
        # (O, A(1), « axe réel ») entraient dans la bande des légendes de
        # trois lignes — défaut d'audit aux étapes 31/37/43/44.
        ).shift(3.3 * RIGHT + 0.15 * DOWN)
        o_lbl = MathTex("O", font_size=28, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.1
        )
        re_lbl = Text("axe réel", font_size=18, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.2), UP, buff=0.12
        )
        # À DROITE de l'axe imaginaire, jamais à gauche (règle d'audit).
        im_lbl = Text("axe imaginaire", font_size=18, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.4j), RIGHT, buff=0.16
        )
        self.play(Create(plan, run_time=2.0), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self._graduations(plan, [-1, 2], [2])
        self.legende(
            "Le plan complexe (O, e1, e2) : horizontal = partie réelle,",
            "vertical = partie imaginaire.",
        )
        self.pose(2.8)

        self.etape("plan-AB")
        a_dot = Dot(plan.n2p(A_AFF), color=COL_PT_A, radius=0.08)
        # A est SUR l'axe réel : étiquette latérale, en dessous (rien
        # d'autre n'occupe cette zone).
        a_lbl = MathTex("A(1)", font_size=32, color=COL_PT_A).next_to(
            a_dot, DOWN, buff=0.12
        )
        b_dot = Dot(plan.n2p(B_AFF), color=COL_PT_B, radius=0.08)
        # B est SUR l'axe imaginaire : étiquette latérale, à gauche.
        b_lbl = MathTex("B(i)", font_size=32, color=COL_PT_B).next_to(
            b_dot, LEFT, buff=0.14
        )
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl))
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl))
        self.legende(
            "A et B sont deux points FIXES, donnés directement par leurs",
            "affixes : 1 et i. Ils ne bougeront plus.",
        )
        self.pose(3.2)

        self.etape("plan-domaine")
        self.ardoise()
        txt = Text("m décrit ℂ, privé de 0, 1 et i.", font_size=26)
        self.ecrit(txt)
        self.legende(
            "m évite 0 (déjà exclu en partie 1), et 1, i : les affixes",
            "mêmes de A et B — pour que M reste distinct de ces deux points.",
        )
        self.pose(3.4)

        recall = MathTex(
            r"z_1 = \dfrac{(1+i)(m+1)}{2}, \qquad z_2 = \dfrac{(1-i)(m+i)}{2}",
            font_size=26,
        )
        self.ecrit(recall, buff=0.5)
        self.legende(
            "Ce sont exactement z1 et z2 de la partie 1 — maintenant, les",
            "affixes de deux points, M1 et M2, liés à M par la même formule.",
        )
        self.pose(3.6)

        self.etape("plan-illustration")
        txt2 = Text(
            "Pour VOIR la construction, on choisit m = 1 + i.",
            font_size=24, color=BAC_INK_SOFT,
        )
        self.ecrit(txt2, buff=0.55)
        self.legende(
            "m reste libre dans l'énoncé — ce choix sert seulement à",
            "dessiner un exemple concret, jamais une donnée imposée.",
        )
        self.pose(3.4)

        inst = MathTex(
            r"z_1 = \tfrac12+\tfrac32 i, \qquad z_2 = \tfrac32+\tfrac12 i",
            font_size=26,
        )
        self.ecrit(inst, buff=0.4)
        m_dot = Dot(plan.n2p(M_AFF), color=COL_PT_M, radius=0.07)
        m_lbl = MathTex("M(m)", font_size=30, color=COL_PT_M).next_to(
            m_dot, UP + RIGHT, buff=0.1
        )
        m1_dot = Dot(plan.n2p(M1_AFF), color=COL_PT_M1, radius=0.07)
        m1_lbl = MathTex("M_1", font_size=30, color=COL_PT_M1).next_to(
            m1_dot, UP, buff=0.12
        )
        m2_dot = Dot(plan.n2p(M2_AFF), color=COL_PT_M2, radius=0.07)
        m2_lbl = MathTex("M_2", font_size=30, color=COL_PT_M2).next_to(
            m2_dot, RIGHT, buff=0.12
        )
        self.play(FadeIn(m_dot, scale=1.6), Write(m_lbl))
        self.play(FadeIn(m1_dot, scale=1.6), Write(m1_lbl))
        self.play(FadeIn(m2_dot, scale=1.6), Write(m2_lbl))
        self.legende(
            "Voici M, M1 et M2 pour cet exemple. Ils bougeront différemment",
            "si m change — mais les RELATIONS qu'on va démontrer, elles,",
            "resteront vraies pour n'importe quel m du domaine.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        return (
            plan, a_dot, a_lbl, b_dot, b_lbl,
            m_dot, m_lbl, m1_dot, m1_lbl, m2_dot, m2_lbl,
        )

    # ── Q1-a) : vérifier z1 = i z2 + 1 ────────────────────────────────
    def chapitre_q1a2(self):
        badge = self.bandeau_question("1) a)", "0,25 pt")
        self.ardoise()

        self.etape("q1a2-enonce")
        but = MathTex(r"\text{Vérifier que : } z_1 = i\,z_2+1", font_size=38)
        self.ecrit(but)
        self.legende(
            "Une vérification directe : on remplace z2 par sa valeur,",
            "et on doit retomber exactement sur z1.",
        )
        self.pose(3.0)

        self.etape("q1a2-calcul-iz2")
        m1 = MathTex(
            r"i\,z_2 = i\cdot\dfrac{1-i}{2}(m+i) = \dfrac{i-i^2}{2}(m+i)"
            r" = \dfrac{1+i}{2}(m+i)",
            font_size=26,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "i fois (1 moins i) : on remplace i² par −1, il reste 1 + i.",
        )
        self.pose(3.0)

        self.etape("q1a2-simplifier")
        m2 = MathTex(
            r"i\,z_2+1 = \dfrac{1+i}{2}m + \dfrac{1+i}{2}i + 1"
            r" = \dfrac{1+i}{2}m + \dfrac{i-1}{2} + 1",
            font_size=24,
        )
        self.ecrit(m2, buff=0.5)
        m3 = MathTex(
            r"i\,z_2+1 = \dfrac{1+i}{2}m + \dfrac{i+1}{2}", font_size=30,
        )
        self.ecrit(m3, buff=0.35)
        self.legende(
            "On distribue le 1, on regroupe les termes constants :",
            "(i−1)/2 plus 1 redonne (i+1)/2.",
        )
        self.pose(3.4)

        self.etape("q1a2-conclusion")
        concl = MathTex(
            r"i\,z_2+1 = \dfrac{1+i}{2}(m+1) = z_1", font_size=36, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.5)
        self.legende(
            "On factorise par (1+i)/2 : c'est EXACTEMENT z1.",
            "Vérifié — 0,25 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q1-b) : la rotation décentrée de centre Ω ────────────────────
    def chapitre_q1b2(self, plan, m_dot, m1_dot, m2_dot):
        badge = self.bandeau_question("1) b)", "0,5 pt")
        self.ardoise()

        self.etape("q1b2-enonce")
        but1 = MathTex(
            r"\text{Montrer que } M_1 \text{ est l'image de } M_2"
            r" \text{ par la rotation}", font_size=28,
        )
        but2 = MathTex(
            r"\text{de centre } \Omega\left(\omega=\dfrac{1+i}{2}\right)"
            r" \text{ et d'angle } \dfrac{\pi}{2}", font_size=28,
        )
        grp = VGroup(but1, but2).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        self.ecrit(grp)
        self.legende(
            "L'égalité z1 = i z2 + 1 cache une rotation. Il faut trouver",
            "son centre, puis vérifier l'angle.",
        )
        self.pose(3.6)

        self.etape("q1b2-sens-rotation")
        rappel = MathTex(r"z' - \omega = e^{i\theta}(z-\omega)", font_size=34)
        self.ecrit(rappel, buff=0.5)
        self.legende(
            "Que SIGNIFIE une rotation de centre Ω ? On retranche le",
            "centre, on tourne d'un angle θ, puis on le rajoute.",
        )
        self.pose(3.4)

        self.etape("q1b2-trouver-omega")
        calc = MathTex(
            r"\omega = i\omega+1 \implies \omega(1-i)=1"
            r" \implies \omega = \dfrac{1}{1-i} = \dfrac{1+i}{(1-i)(1+i)} = \dfrac{1+i}{2}",
            font_size=20,
        )
        self.ecrit(calc, buff=0.55)
        self.legende(
            "Le centre est le POINT FIXE de z ↦ i z + 1 : on résout",
            "ω = i ω + 1 par la méthode du conjugué — déjà connue.",
        )
        self.pose(3.8)

        self.etape("q1b2-relation-decentree")
        rel = MathTex(
            r"z_1-\omega = i\,(z_2-\omega)", font_size=38, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(rel, buff=0.55)
        self.legende(
            "z1 = i z2 + 1 se réécrit exactement sous cette forme",
            "décentrée : le multiplicateur i a pour module 1 et pour",
            "argument π/2 — le signe d'une rotation.",
        )
        self.pose(3.8)

        omega_dot = Dot(plan.n2p(OMEGA_AFF), color=COL_PT_OMEGA, radius=0.08)
        # Ω : espace libre en bas-gauche (A en bas-droite, B en haut-gauche
        # au loin, M1 juste au-dessus, M2 juste à droite).
        omega_lbl = MathTex(r"\Omega", font_size=32, color=COL_PT_OMEGA).next_to(
            omega_dot, DOWN + LEFT, buff=0.12
        )
        self.play(FadeIn(omega_dot, scale=1.6), Write(omega_lbl))
        self.legende("Voici Ω, placé dans le plan — on le retrouvera bientôt.")
        self.pose(2.6)

        self.etape("q1b2-dessiner-rotation")
        omega_pos = plan.n2p(OMEGA_AFF)
        om2 = Line(omega_pos, plan.n2p(M2_AFF), color=COL_PT_M2, stroke_width=3)
        om1 = Line(omega_pos, plan.n2p(M1_AFF), color=COL_PT_M1, stroke_width=3)
        rayon = float(np.linalg.norm(plan.n2p(M2_AFF) - omega_pos))
        arc = Arc(
            radius=rayon, start_angle=float(np.angle(M2_AFF - OMEGA_AFF)), angle=PI / 2,
            arc_center=omega_pos, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        self.play(Create(om2))
        self.play(Create(arc, run_time=2.6))
        self.play(Create(om1))
        ang = Angle(om2, om1, radius=0.4, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        # Proportion 0,25 (pas 0,5) : la bissectrice de l'angle pointe
        # EXACTEMENT sur M(m) — poussée vers l'extérieur, l'étiquette
        # atterrissait sur le point (défaut d'audit).
        appui = ang.point_from_proportion(0.25)
        direction = (appui - omega_pos) / np.linalg.norm(appui - omega_pos)
        ang_lbl = MathTex(r"\tfrac{\pi}{2}", font_size=24, color=BAC_ACCENT).move_to(
            appui + 0.36 * direction
        )
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "L'arc trace le chemin de M2 à M1, en tournant autour de Ω,",
            "d'un quart de tour exact : ΩM1 = ΩM2, et l'angle vaut π/2.",
        )
        self.pose(4.0)

        self.etape("q1b2-conclusion")
        concl = MathTex(
            r"M_1 \text{ est l'image de } M_2 \text{ par la rotation de centre }"
            r" \Omega \text{ et d'angle } \dfrac{\pi}{2}",
            font_size=24, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.6)
        self.legende(
            "Conclusion géométrique complète : même distance à Ω, et un",
            "quart de tour exact — vérifié, 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, om2, arc, om1, ang, ang_lbl)))
        return omega_dot, omega_lbl

    # ── Q2-a) : le rapport de deux affixes, l'outil du chapitre ──────
    def chapitre_q2a2(self, plan, m_dot, m1_dot, m2_dot):
        badge = self.bandeau_question("2) a)", "0,5 pt")
        self.ardoise()

        self.etape("q2a2-enonce")
        but = MathTex(
            r"\text{Vérifier que : } \dfrac{z_2-m}{z_1-m} = i\,\dfrac{m-1}{m-i}",
            font_size=32,
        )
        self.ecrit(but)
        self.legende(
            "On calcule un rapport entre deux différences d'affixes —",
            "un objet qui va devenir central pour la suite.",
        )
        self.pose(3.2)

        self.etape("q2a2-outil-rapport")
        # La question « Vérifier que… » occupe le haut de l'ardoise, là
        # même où la carte-outil va se construire : on l'efface d'abord
        # (défaut d'audit — formule par-dessus la carte épinglée).
        self.nettoie()
        outil_titre = Text(
            "L'outil du chapitre : un rapport d'affixes-vecteurs.",
            font_size=19, color=BAC_INK_SOFT,
        )
        outil_reel = MathTex(
            r"\dfrac{q-m}{p-m}\in\mathbb{R}^{*} \iff M,P,Q\ \text{alignés}",
            font_size=21,
        )
        outil_imag = MathTex(
            r"\dfrac{q-m}{p-m}\in i\mathbb{R}^{*} \iff"
            r" \widehat{\big(\vec{MP},\vec{MQ}\big)}=\dfrac{\pi}{2}",
            font_size=21,
        )
        outil = VGroup(outil_titre, outil_reel, outil_imag).arrange(
            DOWN, aligned_edge=LEFT, buff=0.16
        ).scale(0.95).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        cadre_outil = SurroundingRectangle(
            outil, color=BAC_ACCENT, buff=0.18, corner_radius=0.1
        )
        self.play(FadeIn(outil), Create(cadre_outil))
        vec_mm1 = Line(
            plan.n2p(M_AFF), plan.n2p(M1_AFF), color=COL_PT_M1, stroke_width=3
        ).add_tip(tip_width=0.12, tip_length=0.12)
        vec_mm2 = Line(
            plan.n2p(M_AFF), plan.n2p(M2_AFF), color=COL_PT_M2, stroke_width=3
        ).add_tip(tip_width=0.12, tip_length=0.12)
        self.play(Create(vec_mm1), Create(vec_mm2))
        self.epingle(VGroup(outil, cadre_outil))
        self.legende(
            "RÉEL, ce rapport signale un ALIGNEMENT ; IMAGINAIRE PUR, il",
            "signale un ANGLE DROIT. On le retrouvera question après",
            "question — retiens-le bien.",
        )
        self.pose(4.2)

        self.etape("q2a2-calcul-z1-m")
        za = MathTex(
            r"z_1-m = \dfrac{(1+i)(m+1)}{2}-m = \dfrac{m(i-1)+(1+i)}{2}",
            font_size=22,
        )
        self.ecrit(za, buff=0.5)
        zb = MathTex(
            r"z_1-m = \dfrac{(i-1)(m-i)}{2}", font_size=30, color=COL_PT_M1,
        )
        self.ecrit(zb, buff=0.35)
        self.legende(
            "On regroupe les termes en m, puis on factorise : le",
            "facteur commun est (m − i), pas m lui-même.",
        )
        self.pose(3.6)

        self.etape("q2a2-calcul-z2-m")
        self.nettoie(garder=1)
        za2 = MathTex(
            r"z_2-m = \dfrac{(1-i)(m+i)}{2}-m = \dfrac{m(-1-i)+(1+i)}{2}",
            font_size=22,
        )
        self.ecrit(za2, buff=0.5)
        zb2 = MathTex(
            r"z_2-m = -\dfrac{(1+i)(m-1)}{2}", font_size=30, color=COL_PT_M2,
        )
        self.ecrit(zb2, buff=0.35)
        self.legende(
            "Même démarche : cette fois le facteur commun est (m − 1) —",
            "le facteur (1+i) se met en évidence des deux côtés.",
        )
        self.pose(3.6)

        self.etape("q2a2-simplifier-rapport")
        self.nettoie(garder=1)
        rap1 = MathTex(
            r"\dfrac{z_2-m}{z_1-m} = \dfrac{-(1+i)(m-1)}{(i-1)(m-i)}"
            r" = \dfrac{(1+i)(m-1)}{(1-i)(m-i)}",
            font_size=22,
        )
        self.ecrit(rap1, buff=0.5)
        rap2 = MathTex(
            r"\dfrac{z_2-m}{z_1-m} = \dfrac{1+i}{1-i}\cdot\dfrac{m-1}{m-i}",
            font_size=28,
        )
        self.ecrit(rap2, buff=0.35)
        self.legende(
            "i − 1 = −(1 − i) : les deux signes moins se simplifient.",
            "Il reste un produit de deux rapports.",
        )
        self.pose(3.6)

        self.etape("q2a2-conclusion")
        self.nettoie()
        conv = MathTex(
            r"\dfrac{1+i}{1-i} = \dfrac{(1+i)^2}{(1-i)(1+i)} = \dfrac{2i}{2} = i",
            font_size=26,
        )
        self.ecrit(conv, buff=0.5)
        concl = MathTex(
            r"\dfrac{z_2-m}{z_1-m} = i\,\dfrac{m-1}{m-i}",
            font_size=38, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.5)
        self.legende(
            "La méthode du conjugué, déjà connue : (1+i)/(1−i) vaut i.",
            "Vérifié — 0,5 point. On garde ce rapport pour la suite.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, vec_mm1, vec_mm2)))

    # ── Q2-b) : alignement ⟹ M sur le cercle (Γ) de diamètre [AB] ────
    def chapitre_q2b2(self, plan, a_dot, b_dot, omega_dot, m_dot, m1_dot, m2_dot):
        badge = self.bandeau_question("2) b)", "0,5 pt")
        self.ardoise()

        self.etape("q2b2-enonce")
        but = MathTex(
            r"\text{Montrer que si } M,M_1,M_2 \text{ alignés, alors }"
            r" M\in(\Gamma), \text{ cercle de diamètre } [AB]",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On relit le rapport de la question précédente sous l'angle",
            "de l'alignement, cette fois.",
        )
        self.pose(3.2)

        self.etape("q2b2-sens-cercle")
        r_unit = float(np.linalg.norm(plan.n2p(1) - plan.n2p(0)))
        gamma = Circle(
            radius=(np.sqrt(2) / 2) * r_unit, color=BAC_ACCENT_LIGHT, stroke_width=2.5,
        ).move_to(plan.n2p(OMEGA_AFF))
        self.play(Create(gamma, run_time=1.8))
        m_pos = plan.n2p(M_AFF)
        ma = Line(m_pos, plan.n2p(A_AFF), color=COL_PT_A, stroke_width=2.5)
        mb = Line(m_pos, plan.n2p(B_AFF), color=COL_PT_B, stroke_width=2.5)
        self.play(Create(ma), Create(mb))
        # MA pointe vers 270°, MB vers 180° : le secteur non réflexe (90°)
        # va de MB vers MA dans le sens trigonométrique — d'où l'ordre
        # (mb, ma), pas (ma, mb) qui donnerait le secteur réflexe 270°.
        ang = Angle(mb, ma, radius=0.35, other_angle=False, color=BAC_WARNING, stroke_width=3)
        # Proportion 0,75 (pas 0,5) : la bissectrice depuis M pointe
        # EXACTEMENT sur Ω — l'étiquette poussée le long d'elle collait
        # au point Ω (défaut d'audit, même classe qu'à la rotation).
        appui = ang.point_from_proportion(0.75)
        direction = (appui - m_pos) / np.linalg.norm(appui - m_pos)
        ang_lbl = MathTex(r"\tfrac{\pi}{2}", font_size=22, color=BAC_WARNING).move_to(
            appui + 0.32 * direction
        )
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE ce cercle ? |z−ω| = rayon : TOUS les points à",
            "distance fixe de Ω. Réciproque de Thalès : un point qui voit",
            "[AB] sous un angle droit est SUR ce cercle — comme M ici.",
        )
        self.pose(4.2)

        self.etape("q2b2-chaine-1")
        e1 = MathTex(
            r"M,M_1,M_2\ \text{alignés} \iff \dfrac{z_2-m}{z_1-m}\in\mathbb{R}",
            font_size=24,
        )
        self.ecrit(e1, buff=0.5)
        e1b = MathTex(
            r"\iff i\,\dfrac{m-1}{m-i}\in\mathbb{R}\quad(\text{question 2-a})",
            font_size=24,
        )
        self.ecrit(e1b, buff=0.3)
        self.legende(
            "Aligné veut dire : rapport RÉEL. On remplace par la valeur",
            "trouvée à la question 2-a.",
        )
        self.pose(3.6)

        self.etape("q2b2-chaine-2")
        self.nettoie(garder=1)
        e2 = MathTex(
            r"i\,\dfrac{m-1}{m-i}\in\mathbb{R} \iff \dfrac{m-1}{m-i}\in i\mathbb{R}"
            r" \iff \dfrac{m-i}{m-1}\in i\mathbb{R}",
            font_size=22,
        )
        self.ecrit(e2, buff=0.5)
        self.legende(
            "Diviser un réel par i donne un imaginaire pur ; l'inverse",
            "d'un imaginaire pur non nul reste un imaginaire pur.",
        )
        self.pose(3.8)

        self.etape("q2b2-chaine-3")
        self.nettoie()
        e3 = MathTex(
            r"\dfrac{m-i}{m-1} = \dfrac{i-m}{1-m} = \dfrac{b-m}{a-m}",
            font_size=28,
        )
        self.ecrit(e3, buff=0.5)
        e3b = Text(
            "(affixes de B(i) et A(1))", font_size=20, color=BAC_INK_SOFT,
        )
        self.ecrit(e3b, buff=0.25)
        self.legende(
            "Même rapport, numérateur et dénominateur changés de signe",
            "ensemble : on retrouve exactement les points A et B.",
        )
        self.pose(3.8)

        self.etape("q2b2-conclusion")
        self.nettoie()
        concl = MathTex(
            r"\dfrac{b-m}{a-m}\in i\mathbb{R} \implies"
            r" \widehat{\big(\vec{MA},\vec{MB}\big)} = \dfrac{\pi}{2}",
            font_size=26, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.5)
        concl2 = MathTex(
            r"\implies M\in(\Gamma)\ \text{cercle de diamètre } [AB]",
            font_size=30, color=BAC_SUCCESS,
        )
        self.ecrit(concl2, buff=0.3)
        self.legende(
            "Imaginaire pur = angle droit en M : M voit [AB] sous un",
            "angle droit, donc M est SUR le cercle (Γ) — 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, ma, mb, ang, ang_lbl, gamma)))

    # ── Q2-c) : cocyclicité de Ω, M, M1, M2 (le finale) ──────────────
    def chapitre_q2c2(
        self, plan, a_dot, a_lbl, b_dot, b_lbl, omega_dot, omega_lbl,
        m_dot, m_lbl, m1_dot, m1_lbl, m2_dot, m2_lbl,
    ):
        badge = self.bandeau_question("2) c)", "0,75 pt")
        self.ardoise()
        r_unit = float(np.linalg.norm(plan.n2p(1) - plan.n2p(0)))

        self.etape("q2c2-enonce")
        self.play(FadeOut(m_dot), FadeOut(m_lbl))
        but = MathTex(
            r"\Omega,\ M,\ M_1,\ M_2\ \text{cocycliques}\ ?", font_size=32,
        )
        self.ecrit(but)
        self.legende(
            "Cocycliques : les QUATRE points sur un SEUL et même cercle.",
            "On cherche pour quels m cela arrive.",
        )
        self.pose(3.4)

        self.etape("q2c2-omega-sur-cercle")
        recall = MathTex(
            r"\dfrac{z_1-\omega}{z_2-\omega} = i \quad (\text{question 1-b})",
            font_size=24,
        )
        self.ecrit(recall, buff=0.5)
        consequence = MathTex(
            r"\Omega M_1=\Omega M_2 \ \text{et}\ \widehat{M_1\Omega M_2}=\dfrac{\pi}{2}"
            r"\ \ \text{pour TOUT } m",
            font_size=22,
        )
        self.ecrit(consequence, buff=0.35)
        center_m1m2 = (M1_AFF + M2_AFF) / 2
        radius_m1m2 = abs(M1_AFF - M2_AFF) / 2
        cercle_m1m2 = Circle(
            radius=radius_m1m2 * r_unit, color=BAC_WARNING, stroke_width=2.5,
        ).move_to(plan.n2p(center_m1m2))
        self.play(Create(cercle_m1m2, run_time=1.8))
        self.legende(
            "Ce rapport valait i pour TOUT m — module 1, argument π/2.",
            "Ω voit donc toujours [M1M2] sous un angle droit : il est",
            "TOUJOURS sur le cercle de diamètre [M1M2], quel que soit m.",
        )
        self.pose(4.4)

        self.etape("q2c2-condition-m")
        cond = MathTex(
            r"\Omega,M,M_1,M_2\ \text{cocycliques} \iff M \in \text{ce même cercle}",
            font_size=22,
        )
        self.ecrit(cond, buff=0.5)
        cond2 = MathTex(
            r"\iff \widehat{M_1MM_2} = \dfrac{\pi}{2}"
            r" \iff \dfrac{z_1-m}{z_2-m}\in i\mathbb{R}",
            font_size=24,
        )
        self.ecrit(cond2, buff=0.3)
        self.legende(
            "Trois points non alignés déterminent un unique cercle : ce",
            "cercle EST le cercle (Ω, M1, M2). M doit, lui aussi, voir",
            "[M1M2] sous un angle droit pour rejoindre les trois autres.",
        )
        self.pose(4.4)

        self.etape("q2c2-calcul-rapport-inverse")
        self.nettoie()
        inv = MathTex(
            r"\dfrac{z_1-m}{z_2-m} = \dfrac{1}{i}\cdot\dfrac{m-i}{m-1}"
            r" = -i\,\dfrac{m-i}{m-1}",
            font_size=26,
        )
        self.ecrit(inv, buff=0.5)
        self.legende(
            "On inverse le rapport de la question 2-a : un sur i vaut",
            "moins i.",
        )
        self.pose(3.4)

        self.etape("q2c2-equivalence-alignement")
        eq1 = MathTex(
            r"\dfrac{z_1-m}{z_2-m}\in i\mathbb{R} \iff \dfrac{m-i}{m-1}\in\mathbb{R}",
            font_size=24,
        )
        self.ecrit(eq1, buff=0.5)
        eq2 = MathTex(
            r"\iff M,\,A,\,B\ \text{alignés}", font_size=32, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(eq2, buff=0.3)
        self.legende(
            "Multiplié par −i, imaginaire pur redevient réel : on",
            "retrouve notre outil, sens ALIGNEMENT — avec A et B, cette",
            "fois.",
        )
        self.pose(4.0)

        self.etape("q2c2-exclure-omega")
        self.nettoie()
        exclu = MathTex(
            r"M=\Omega \implies m=\dfrac{1+i}{2}", font_size=28,
        )
        self.ecrit(exclu, buff=0.5)
        exclu2 = Text(
            "— exactement le milieu de [AB], donc déjà sur (AB) !",
            font_size=20, color=BAC_ERROR,
        )
        self.ecrit(exclu2, buff=0.3)
        self.play(
            FadeOut(cercle_m1m2), FadeOut(m1_dot), FadeOut(m1_lbl),
            FadeOut(m2_dot), FadeOut(m2_lbl),
        )
        self.legende(
            "Cas dégénéré : si M = Ω, il ne reste que TROIS points",
            "distincts, pas quatre — Ω, milieu de [AB], est à exclure.",
        )
        self.pose(4.2)

        self.etape("q2c2-conclusion-ensemble")
        self.nettoie()
        concl = MathTex(
            r"\text{Ensemble cherché : la droite } (AB)"
            r"\ \text{privée du point } \Omega",
            font_size=26, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.5)
        t1, t2 = -0.5, 2.3
        endpoint1 = A_AFF + t1 * (B_AFF - A_AFF)
        endpoint2 = A_AFF + t2 * (B_AFF - A_AFF)
        droite = Line(
            plan.n2p(endpoint1), plan.n2p(endpoint2), color=BAC_SUCCESS, stroke_width=2.5,
        )
        exclusion = Dot(
            plan.n2p(OMEGA_AFF), radius=0.15, color=BAC_ERROR,
            fill_opacity=0, stroke_width=2.5,
        )
        self.play(Create(droite))
        self.play(Create(exclusion))
        self.legende(
            "La droite (AB) tout entière — sauf Ω, marqué d'un cercle",
            "vide : à cet endroit précis, il ne reste que 3 points.",
        )
        self.pose(4.4)

        self.etape("q2c2-verification-concrete")
        txt_mp = Text(
            "Vérifions sur un point de cette droite : m' = -1 + 2i.",
            font_size=20, color=BAC_INK_SOFT,
        )
        self.ecrit(txt_mp, buff=0.5)
        mp_dot = Dot(plan.n2p(MP_AFF), color=COL_PT_M, radius=0.07)
        mp_lbl = MathTex("M'", font_size=28, color=COL_PT_M).next_to(
            mp_dot, UP + LEFT, buff=0.1
        )
        m1p_dot = Dot(plan.n2p(M1P_AFF), color=COL_PT_M1, radius=0.07)
        m1p_lbl = MathTex(r"M_1'", font_size=26, color=COL_PT_M1).next_to(
            m1p_dot, LEFT, buff=0.12
        )
        m2p_dot = Dot(plan.n2p(M2P_AFF), color=COL_PT_M2, radius=0.07)
        m2p_lbl = MathTex(r"M_2'", font_size=26, color=COL_PT_M2).next_to(
            m2p_dot, RIGHT, buff=0.12
        )
        self.play(FadeIn(mp_dot, scale=1.6), Write(mp_lbl))
        self.play(FadeIn(m1p_dot, scale=1.6), Write(m1p_lbl))
        self.play(FadeIn(m2p_dot, scale=1.6), Write(m2p_lbl))
        center_p = (M1P_AFF + M2P_AFF) / 2
        radius_p = abs(M1P_AFF - M2P_AFF) / 2
        cercle_final = Circle(
            radius=radius_p * r_unit, color=BAC_SUCCESS, stroke_width=3,
        ).move_to(plan.n2p(center_p))
        self.play(Create(cercle_final, run_time=2.2))
        self.bring_to_front(omega_dot, mp_dot, m1p_dot, m2p_dot)
        self.legende(
            "Un seul et même cercle passe par les quatre points : Ω, M′,",
            "M1′ et M2′ sont bien COCYCLIQUES — 0,75 point.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.play(*[FadeOut(mobj) for mobj in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Δ = b² − 4ac se manipule comme dans ℝ, même avec un paramètre m.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Un carré parfait pour Δ : sa racine se lit directement.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Rotation de centre Ω : z' − ω = e^(iθ)(z − ω).",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Rapport de deux affixes : réel ⟹ alignés ; imaginaire pur ⟹ angle droit.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Cercle de diamètre [AB] : on y voit [AB] sous un angle droit (Thalès).",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Cocyclicité : quatre points sur un même cercle, un seul et unique.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("3,5 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=20, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
