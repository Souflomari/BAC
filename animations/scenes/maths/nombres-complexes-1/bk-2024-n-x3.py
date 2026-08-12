"""Explication animée v4 — Bac 2024 SN (SExp), Exercice 3 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2024-n-x3 (vérifiée, AlloSchool NS22F, element/144505,
Exercice 3 — Nombres complexes, page Composantes ; 4 points).

a = √3(1-i), b = 2+√3+i. Sept questions : 1) module et argument de a ;
2) le quotient b/a sous forme algébrique puis exponentielle ; 3) forme
trigonométrique de b, puis b^24 réel ; 4) R, rotation de centre O et
d'angle π/6 : formule générale, puis arg(a') où A'=R(A) ; 5) a''=√6e^{iπ/12}
où A''=R(A'), puis O, A'', B alignés ; 6) b'=(3+√3)/3 × ā où B'=R(B) ;
7) le triangle OAB' est rectangle en O.

SCOPE NOTE de bank.yaml : mobilise le registre trigonométrique/
exponentielle et deux rotations successives, au-delà du socle R1–R5
formel — trois rotations en tout (A, A', B, chacune de centre O et
d'angle π/6), une figure qui montre bien que le rayon OM ne change
JAMAIS, seul l'angle avance.

Standard v4 = DESIGN.md : règle du zéro implicite, couche de sens avant
chaque calcul (module = segment tracé, argument = arc depuis l'axe réel,
conjugué = reflet, rotation de centre O = arc de trajectoire à rayon
constant + angle dessiné), signaling dans la formule, zones d'écran
dures. A' et A'' (transitoires, question 4-5 seulement) sont effacés en
fin de question 5 : ils ne resservent pas, la figure reste lisible pour
les questions 6-7 (O, A, B, B' seulement).

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2024-n-x3.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Angle,
    Arc,
    ComplexPlane,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
    ReplacementTransform,
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
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
    BAC_BORDER,
)

# Identité visuelle stable des points de la figure (DESIGN.md §2) :
# A sarcelle, B or (deux points donnés) ; A' sarcelle claire, A'' sarcelle
# forte (même famille que A : images successives par la MÊME rotation) ;
# B' vert (conclusion — le troisième sommet du triangle rectangle).
COL_PT_A, COL_PT_B = BAC_ACCENT, BAC_WARNING
COL_PT_AP, COL_PT_APP = BAC_ACCENT_LIGHT, BAC_ACCENT_STRONG
COL_PT_BP = BAC_SUCCESS
COL_ABAR = BAC_INK_MUTED

NARRATION = {
    "titre": "Exercice trois du bac deux mille vingt-quatre, session "
    "normale, sciences expérimentales : nombres complexes, sur quatre "
    "points. Modules, arguments, et trois rotations de centre O, toutes "
    "du même angle.",
    "intro": "On donne deux points, A et B, par leurs affixes complexes "
    "a et b. On les place dans le plan avant tout calcul.",
    "plan": "Le plan complexe : horizontal pour la partie réelle, "
    "vertical pour la partie imaginaire. Chaque affixe donne un point.",
    "q1": "Question un. On vérifie le module et l'argument de a, en "
    "reconnaissant a comme le produit d'un réel positif et d'un nombre "
    "d'angle remarquable, un moins i.",
    "q2": "Question deux. Le quotient b sur a, d'abord sous forme "
    "algébrique — on multiplie par le conjugué de a — puis sous forme "
    "exponentielle, en vérifiant que les deux écritures coïncident.",
    "q3": "Question trois. On en déduit la forme trigonométrique de b, "
    "puis on montre que b puissance vingt-quatre est un nombre réel : "
    "l'argument, multiplié par vingt-quatre, retombe sur un multiple de "
    "deux pi.",
    "q4": "Question quatre. R, la rotation de centre O et d'angle pi sur "
    "six. On établit sa formule générale, puis on l'applique à A pour "
    "trouver l'argument de A prime.",
    "q5": "Question cinq. On applique une seconde fois la même rotation, "
    "à A prime cette fois, pour obtenir A seconde. Puis on montre que O, "
    "A seconde et B sont alignés : ils partagent le même argument depuis "
    "O.",
    "q6": "Question six. Troisième et dernière rotation : on l'applique "
    "à B pour obtenir B prime, et on vérifie son affixe par module et "
    "argument séparément.",
    "q7": "Question sept. On en déduit que le triangle O A B prime est "
    "rectangle en O : l'angle entre les deux vecteurs vaut exactement "
    "pi sur deux.",
}

# a = √3(1-i) — bank.yaml, intro de bk-2024-n-x3.
A_AFF = np.sqrt(3) * complex(1, -1)
# b = 2+√3+i — bank.yaml, intro de bk-2024-n-x3.
B_AFF = complex(2 + np.sqrt(3), 1)
# R : rotation de centre O, d'angle π/6 (bank.yaml, q4) — appliquée trois
# fois dans cet exercice (à A, à A', à B).
ROT6 = complex(np.cos(np.pi / 6), np.sin(np.pi / 6))
A_PRIME_AFF = A_AFF * ROT6      # a' = R(A) — bank q4
A_SECOND_AFF = A_PRIME_AFF * ROT6  # a'' = R(A') — bank q5
B_PRIME_AFF = B_AFF * ROT6      # b' = R(B) — bank q6

# Géométrie du plan complexe partagé par toutes les questions : échelle
# 1 unité de donnée = 1 unité Manim (x_length/x_span = y_length/y_span
# = 1.0), pour que les trois rayons (OA, OA', OA'', OB, OB') restent
# comparables à l'œil.
PLAN_X_RANGE = [-1.0, 4.5, 1]
PLAN_Y_RANGE = [-2.2, 3.0, 1]
PLAN_X_LEN = 5.5
PLAN_Y_LEN = 5.2
PLAN_SHIFT = 1.7 * RIGHT + 0.25 * UP


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        plan, a_dot, a_lbl, b_dot, b_lbl = self.chapitre_plan()
        self.chapitre_q1(plan, a_dot)
        self.chapitre_q2(plan, a_dot, b_dot)
        self.chapitre_q3()
        a_p_dot, a_p_lbl, oa_p_line = self.chapitre_q4(plan, a_dot)
        self.chapitre_q5(plan, a_p_dot, a_p_lbl, oa_p_line, b_dot)
        b_p_dot = self.chapitre_q6(plan, b_dot)
        self.chapitre_q7(plan, a_dot, b_p_dot)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2024 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 3 — 4 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé ─────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère les points A et B, d'affixes respectives :",
            font_size=28,
        ).shift(2.1 * UP)
        aff_a = MathTex(r"a = \sqrt{3}(1-i)", font_size=40, color=COL_PT_A)
        aff_b = MathTex(r"b = 2+\sqrt{3}+i", font_size=40, color=COL_PT_B)
        ligne = VGroup(aff_a, aff_b).arrange(RIGHT, buff=1.6).next_to(
            entete, DOWN, buff=0.7
        )
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(ligne, shift=0.2 * UP), run_time=1.2)
        self.legende(
            "Deux points donnés par leurs affixes complexes. On les",
            "place dans le plan avant tout calcul.",
        )
        self.pose(3.0)
        self.efface_legende()
        self.play(FadeOut(VGroup(entete, ligne)))

    # ── Le plan complexe : A et B, les deux points donnés ────────────
    def chapitre_plan(self):
        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=PLAN_X_RANGE,
            y_range=PLAN_Y_RANGE,
            x_length=PLAN_X_LEN,
            y_length=PLAN_Y_LEN,
            background_line_style={
                "stroke_color": BAC_BORDER,
                "stroke_width": 1,
                "stroke_opacity": 0.8,
            },
            axis_config={
                "stroke_color": BAC_INK_MUTED,
                "stroke_width": 2,
                "include_ticks": False,
                "include_tip": False,
            },
        ).shift(PLAN_SHIFT)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        re_lbl = Text("axe réel", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(4.0), DOWN, buff=0.18
        )
        # À DROITE de l'axe imaginaire : à gauche, l'étiquette empièterait
        # sur la colonne de travail (défaut d'audit connu).
        im_lbl = Text("axe imaginaire", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.6j), RIGHT, buff=0.18
        )
        self.play(Create(plan, run_time=2.2), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self.legende(
            "Le plan complexe : horizontal = partie réelle,",
            "vertical = partie imaginaire. Chaque affixe, un point.",
        )
        self.pose(2.8)

        self.etape("plan-A")
        a_dot = Dot(plan.n2p(A_AFF), color=COL_PT_A, radius=0.08)
        # A est un point BAS de la figure : étiquette LATÉRALE (à droite),
        # jamais vers le bas — la bande légende est inviolable.
        a_lbl = MathTex("A(a)", font_size=32, color=COL_PT_A).next_to(
            a_dot, RIGHT, buff=0.15
        )
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl))
        self.legende(
            "Pour a = √3(1−i) : partie réelle √3, partie imaginaire",
            "−√3 — environ 1,7 à droite, autant en bas.",
        )
        self.pose(3.0)

        self.etape("plan-B")
        b_dot = Dot(plan.n2p(B_AFF), color=COL_PT_B, radius=0.08)
        b_lbl = MathTex("B(b)", font_size=32, color=COL_PT_B).next_to(
            b_dot, RIGHT, buff=0.15
        )
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl))
        self.legende(
            "Pour b = 2+√3+i : partie réelle 2+√3, environ 3,7 ;",
            "partie imaginaire 1.",
        )
        self.pose(3.0)
        self.efface_legende()
        return plan, a_dot, a_lbl, b_dot, b_lbl

    # ── Q1 : module et argument de a ─────────────────────────────────
    def chapitre_q1(self, plan, a_dot):
        badge = self.bandeau_question("1)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        a_pt = plan.n2p(A_AFF)

        self.etape("q1-enonce")
        but = MathTex(
            r"|a| \overset{?}{=} \sqrt6, \qquad"
            r" \arg(a) \overset{?}{\equiv} -\dfrac{\pi}{4}\ [2\pi]",
            font_size=32,
        )
        self.ecrit(but)
        self.legende(
            "On doit vérifier deux choses sur a : son module,",
            "puis son argument.",
        )
        self.pose(3.0)

        self.etape("q1-sens-module")
        oa_seg = Line(origine, a_pt, color=COL_PT_A, stroke_width=5)
        mod_lbl = MathTex("|a|", font_size=28, color=COL_PT_A).next_to(
            oa_seg.get_center(), UP, buff=0.15
        )
        self.play(Create(oa_seg))
        self.play(FadeIn(mod_lbl, shift=0.1 * UP))
        self.legende(
            "Que SIGNIFIE un module ? La DISTANCE de O au point.",
            "On la mesure avant de la calculer.",
        )
        self.pose(3.4)

        self.etape("q1-calcul-1-moins-i")
        c1 = MathTex(r"|1-i| = \sqrt{1^2+(-1)^2} = \sqrt2", font_size=36)
        self.ecrit(c1)
        self.legende(
            "D'abord le module de 1 moins i : racine de un carré",
            "plus moins un carré.",
        )
        self.pose(2.8)

        self.etape("q1-calcul-module-a")
        c2 = MathTex(
            r"|a| = |\sqrt3(1-i)| = \sqrt3\times\sqrt2 = \sqrt6",
            font_size=34, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(c2, buff=0.5)
        self.legende(
            "a est le produit de racine de 3 par 1 moins i : le module",
            "d'un produit est le produit des modules.",
        )
        self.pose(3.2)

        self.etape("q1-sens-argument")
        self.nettoie(garder=1)
        axe = Line(origine, plan.n2p(4.0))
        # a est SOUS l'axe réel (argument négatif) : on inverse l'ordre
        # des deux rayons pour que Angle() trace le petit arc du bon
        # côté (sous l'axe), pas le grand arc réflexe.
        ang = Angle(oa_seg, axe, radius=0.5, other_angle=False, color=COL_PT_A, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex("?", font_size=26, color=COL_PT_A).move_to(
            milieu + 0.34 * direction
        )
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE un argument ? L'ANGLE depuis l'axe réel",
            "positif — ici mesuré vers le BAS, puisque a est dessous.",
        )
        self.pose(3.6)

        self.etape("q1-calcul-arg-1-moins-i")
        c3 = MathTex(r"\arg(1-i) = -\dfrac{\pi}{4}", font_size=36)
        self.ecrit(c3, buff=0.5)
        self.legende(
            "L'argument de 1 moins i : un angle remarquable,",
            "moins pi sur quatre.",
        )
        self.pose(2.8)

        self.etape("q1-conclusion")
        c4 = MathTex(
            r"\sqrt3>0 \implies \arg(a) = \arg(1-i) = -\dfrac{\pi}{4}\ [2\pi]",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(c4, buff=0.5)
        ang_lbl2 = MathTex(r"-\tfrac{\pi}{4}", font_size=22, color=BAC_ACCENT_STRONG).move_to(
            ang_lbl
        )
        self.play(ReplacementTransform(ang_lbl, ang_lbl2), ang.animate.set_color(BAC_ACCENT_STRONG))
        self.legende(
            "Un facteur réel POSITIF ne change pas l'argument :",
            "arg(a) = −π/4 — vérifié, 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, oa_seg, mod_lbl, ang, ang_lbl2)))

    # ── Q2 : le quotient b/a, sous deux formes ───────────────────────
    def chapitre_q2(self, plan, a_dot, b_dot):
        badge = self.bandeau_question("2)", "0,75 pt")
        self.ardoise()
        a_pt = plan.n2p(A_AFF)

        self.etape("q2-enonce")
        but1 = MathTex(
            r"\dfrac{b}{a} \overset{?}{=} \dfrac{3+\sqrt3}{6}"
            r" + \left(\dfrac{1+\sqrt3}{2}\right)i",
            font_size=30,
        )
        self.ecrit(but1)
        but2 = MathTex(
            r"\text{puis } \dfrac{b}{a} \overset{?}{=} \dfrac{3+\sqrt3}{3}\,e^{i\pi/3}",
            font_size=30,
        )
        self.ecrit(but2, buff=0.4)
        self.legende(
            "Le quotient b sur a, d'abord sous forme algébrique,",
            "puis sous forme exponentielle.",
        )
        self.pose(3.2)

        self.etape("q2-sens-conjugue")
        self.nettoie()
        abar_pt = plan.n2p(A_AFF.conjugate())
        miroir = DashedLine(a_pt, abar_pt, color=COL_ABAR, stroke_width=2)
        abar_dot = Dot(abar_pt, color=COL_ABAR, radius=0.06)
        abar_lbl = MathTex(r"\overline a", font_size=26, color=COL_ABAR).next_to(
            abar_dot, RIGHT, buff=0.12
        )
        self.play(Create(miroir))
        self.play(FadeIn(abar_dot, scale=1.4), Write(abar_lbl))
        self.legende(
            "Que SIGNIFIE le conjugué ? Le REFLET dans l'axe réel :",
            "même partie réelle, partie imaginaire opposée.",
        )
        self.pose(3.4)
        self.play(FadeOut(miroir))

        self.etape("q2-outil-diviser")
        outil = MathTex(
            r"\dfrac{b}{a} = \dfrac{b\,\overline{a}}{a\,\overline{a}}"
            r" = \dfrac{b\,\overline{a}}{|a|^2} = \dfrac{b\,\overline{a}}{6}",
            font_size=30,
        )
        self.ecrit(outil)
        self.legende(
            "L'outil pour diviser par un complexe : multiplier haut",
            "et bas par son conjugué. |a|² vaut 6 — question 1.",
        )
        self.pose(3.4)

        self.etape("q2-conjugue-valeur")
        m1 = MathTex(
            r"\overline{a} = \sqrt3(1+i), \qquad"
            r" b\,\overline{a} = (2+\sqrt3+i)\sqrt3(1+i)",
            font_size=26,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "On change le signe de la partie imaginaire, puis on pose",
            "le produit à développer.",
        )
        self.pose(3.2)

        self.etape("q2-developper")
        self.nettoie(garder=1)
        m2 = MathTex(
            r"(2+\sqrt3+i)(1+i) = (2+\sqrt3) + i(2+\sqrt3) + i + i^2"
            r" = (1+\sqrt3) + i(3+\sqrt3)",
            font_size=22,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On développe terme à terme, puis on remplace i² par −1",
            "et on regroupe.",
        )
        self.pose(3.4)

        self.etape("q2-distribuer")
        m3 = MathTex(
            r"b\,\overline{a} = \sqrt3\left[(1+\sqrt3)+i(3+\sqrt3)\right]"
            r" = (\sqrt3+3) + i(3\sqrt3+3)",
            font_size=24,
        )
        self.ecrit(m3, buff=0.5)
        self.legende("On distribue le facteur racine de 3 restant.")
        self.pose(3.0)

        self.etape("q2-diviser-par-6")
        self.nettoie(garder=1)
        m4a = MathTex(
            r"\dfrac{b}{a} = \dfrac{(\sqrt3+3)+i(3\sqrt3+3)}{6}"
            r" = \dfrac{3+\sqrt3}{6} + i\,\dfrac{3\sqrt3+3}{6}",
            font_size=24,
        )
        self.ecrit(m4a, buff=0.55)
        self.legende(
            "On divise chaque partie, réelle et imaginaire,",
            "par 6.",
        )
        self.pose(3.0)

        self.etape("q2-forme-algebrique")
        m4b = MathTex(
            r"= \dfrac{3+\sqrt3}{6} + i\,\dfrac{1+\sqrt3}{2}",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m4b, buff=0.4)
        self.legende(
            "3√3+3 sur 6 se simplifie en (1+√3)/2 — la forme",
            "algébrique annoncée.",
        )
        self.pose(3.4)

        self.etape("q2-developper-exponentielle")
        self.nettoie(garder=1)
        m5a = MathTex(
            r"\dfrac{3+\sqrt3}{3}e^{i\pi/3} = \dfrac{3+\sqrt3}{3}"
            r"\left(\dfrac12+i\dfrac{\sqrt3}{2}\right)"
            r" = \dfrac{3+\sqrt3}{6} + i\,\dfrac{(3+\sqrt3)\sqrt3}{6}",
            font_size=20,
        )
        self.ecrit(m5a, buff=0.55)
        self.legende(
            "On développe l'autre écriture : le produit du module",
            "par cosinus et sinus de π/3.",
        )
        self.pose(3.4)

        self.etape("q2-forme-exponentielle")
        m5b = MathTex(
            r"= \dfrac{3+\sqrt3}{6}+i\,\dfrac{1+\sqrt3}{2}",
            font_size=30, color=BAC_SUCCESS,
        )
        self.ecrit(m5b, buff=0.4)
        self.legende(
            "(3+√3)√3 sur 6 redonne EXACTEMENT (1+√3)/2 : les deux",
            "écritures coïncident — 0,75 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, abar_dot, abar_lbl)))

    # ── Q3 : forme trigonométrique de b, puis b^24 réel ──────────────
    def chapitre_q3(self):
        badge = self.bandeau_question("3)", "0,75 pt")
        self.ardoise()

        self.etape("q3-enonce")
        but = Text(
            "Forme trigonométrique de b, puis vérifier que b²⁴ est réel.",
            font_size=25,
        )
        self.ecrit(but)
        self.legende(
            "On repart de b/a trouvé à la question 2 : b = a fois ce",
            "quotient, un produit dont on connaît module et argument.",
        )
        self.pose(3.4)

        self.etape("q3-outil-produit")
        outil = MathTex(
            r"|zz'| = |z||z'|, \qquad \arg(zz') = \arg(z)+\arg(z')",
            font_size=30,
        )
        self.ecrit(outil, buff=0.5)
        self.encadre()
        self.legende(
            "L'outil : module d'un produit = produit des modules ;",
            "argument d'un produit = SOMME des arguments.",
        )
        self.pose(3.4)

        self.etape("q3-module-b-a")
        m1a = MathTex(
            r"|b| = |a|\times\dfrac{3+\sqrt3}{3} = \sqrt6\times\dfrac{3+\sqrt3}{3}",
            font_size=28,
        )
        self.ecrit(m1a, buff=0.5)
        self.legende(
            "Module d'un produit : |b| égale |a| fois le module de",
            "l'autre facteur, question 2.",
        )
        self.pose(3.0)

        self.etape("q3-module-b-simplifie")
        m1b = MathTex(
            r"= \dfrac{3\sqrt6+\sqrt{18}}{3} = \dfrac{3\sqrt6+3\sqrt2}{3}"
            r" = \sqrt6+\sqrt2",
            font_size=26,
        )
        self.ecrit(m1b, buff=0.4)
        self.legende(
            "Racine de 18 se simplifie en 3 racine de 2 : il reste",
            "racine de 6 plus racine de 2.",
        )
        self.pose(3.2)

        self.etape("q3-argument-b")
        self.nettoie(garder=1)
        m2 = MathTex(
            r"\arg(b) = \arg(a) + \dfrac{\pi}{3} = -\dfrac{\pi}{4}+\dfrac{\pi}{3}"
            r" = \dfrac{-3\pi+4\pi}{12} = \dfrac{\pi}{12}",
            font_size=24,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Argument d'un produit = somme des arguments : celui de a,",
            "question 1, plus π/3, l'argument de l'autre facteur.",
        )
        self.pose(3.4)

        self.etape("q3-forme-trig")
        m3 = MathTex(
            r"b = (\sqrt6+\sqrt2)\left(\cos\dfrac{\pi}{12}+i\sin\dfrac{\pi}{12}\right)",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.55)
        self.legende(
            "La forme trigonométrique de b, module racine de 6 plus",
            "racine de 2, argument π/12.",
        )
        self.pose(3.4)

        self.etape("q3-outil-puissance")
        self.nettoie(garder=1)
        outil2 = MathTex(
            r"|z^n| = |z|^n, \qquad \arg(z^n) = n\times\arg(z)",
            font_size=30,
        )
        self.ecrit(outil2, buff=0.6)
        self.encadre()
        self.legende(
            "Élever à une puissance n : le module se met à la",
            "puissance n, l'argument se MULTIPLIE par n.",
        )
        self.pose(3.4)

        self.etape("q3-puissance-24")
        m4 = MathTex(
            r"|b^{24}| = (\sqrt6+\sqrt2)^{24}, \qquad"
            r" \arg(b^{24}) = 24\times\dfrac{\pi}{12} = 2\pi \equiv 0\ [2\pi]",
            font_size=24,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "Vingt-quatre fois π/12 fait exactement deux pi — un tour",
            "complet, donc zéro modulo deux pi.",
        )
        self.pose(3.6)

        self.etape("q3-conclusion")
        concl = MathTex(
            r"\arg(b^{24}) \equiv 0\ [2\pi] \implies b^{24} \in \mathbb{R}",
            font_size=36, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "Argument nul modulo deux pi : b puissance vingt-quatre",
            "est réel, et même positif — 0,75 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q4 : R, rotation de centre O et d'angle π/6 ; A' = R(A) ──────
    def chapitre_q4(self, plan, a_dot):
        badge = self.bandeau_question("4)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        a_pt = plan.n2p(A_AFF)
        a_prime_pt = plan.n2p(A_PRIME_AFF)

        self.etape("q4-enonce")
        txt = Text(
            "R : rotation de centre O et d'angle π/6.  A' = R(A).",
            font_size=24,
        )
        self.ecrit(txt)
        but = MathTex(
            r"z' \overset{?}{=} \dfrac12(\sqrt3+i)z, \qquad"
            r" \arg(a') \overset{?}{\equiv} -\dfrac{\pi}{12}\ [2\pi]",
            font_size=28,
        )
        self.ecrit(but, buff=0.5)
        self.legende(
            "Une rotation de centre O, cette fois — le centre le plus",
            "simple. On cherche sa formule, puis l'argument de A'.",
        )
        self.pose(3.4)

        self.etape("q4-sens-rotation")
        oa_line = Line(origine, a_pt, color=COL_PT_A, stroke_width=3)
        rayon = float(np.linalg.norm(a_pt - origine))
        start_angle = float(np.angle(A_AFF))
        arc = Arc(
            radius=rayon, start_angle=start_angle, angle=PI / 6,
            arc_center=origine, color=COL_PT_AP, stroke_width=3,
        )
        image_dot = Dot(a_pt, color=COL_PT_AP, radius=0.08)
        self.play(Create(oa_line))
        self.play(Create(arc, run_time=3.0), MoveAlongPath(image_dot, arc, run_time=3.0))
        oa_p_line = Line(origine, a_prime_pt, color=COL_PT_AP, stroke_width=3)
        ang = Angle(oa_line, oa_p_line, radius=0.42, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\tfrac{\pi}{6}", font_size=24, color=BAC_ACCENT).move_to(
            milieu + 0.32 * direction
        )
        self.play(Create(oa_p_line), Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE cette rotation ? Le point tourne autour de O",
            "en gardant la MÊME distance : regarde, le rayon ne change",
            "pas — seul l'angle avance de π/6.",
        )
        self.pose(4.0)

        self.etape("q4-formule-generale")
        self.nettoie()
        f1 = MathTex(r"z' = e^{i\pi/6}\,z", font_size=38)
        self.ecrit(f1)
        self.legende(
            "Centre O : la formule la plus simple, z' = e^{iθ} z,",
            "sans rien retrancher ni rajouter.",
        )
        self.pose(3.0)

        self.etape("q4-exponentielle")
        f2 = MathTex(
            r"e^{i\pi/6} = \cos\dfrac{\pi}{6}+i\sin\dfrac{\pi}{6}"
            r" = \dfrac{\sqrt3}{2}+\dfrac12 i",
            font_size=32,
        )
        self.ecrit(f2, buff=0.5)
        self.legende("Angle remarquable π/6 : racine de trois sur deux, plus un demi i.")
        self.pose(3.0)

        self.etape("q4-formule-conclusion")
        self.nettoie(garder=1)
        f3 = MathTex(
            r"\dfrac12(\sqrt3+i) = \dfrac{\sqrt3}{2}+\dfrac12 i = e^{i\pi/6}"
            r" \implies z' = \dfrac12(\sqrt3+i)z",
            font_size=24, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(f3, buff=0.5)
        self.legende(
            "Un demi fois (racine de trois + i) a la même écriture",
            "algébrique : la formule annoncée est vérifiée.",
        )
        self.pose(3.4)

        self.etape("q4-argument-produit")
        self.nettoie(garder=1)
        f4 = MathTex(
            r"a' = e^{i\pi/6}a \implies \arg(a') = \arg(a) + \dfrac{\pi}{6}",
            font_size=32,
        )
        self.ecrit(f4, buff=0.5)
        self.legende(
            "A' est l'image de A par R : son affixe est e^{iπ/6} a —",
            "un produit dont l'argument est une somme.",
        )
        self.pose(3.4)

        self.etape("q4-conclusion")
        f5 = MathTex(
            r"\arg(a') = -\dfrac{\pi}{4}+\dfrac{\pi}{6} = \dfrac{-3\pi+2\pi}{12}"
            r" = -\dfrac{\pi}{12}",
            font_size=32, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(f5, buff=0.55)
        a_p_lbl = MathTex("A'(a')", font_size=30, color=COL_PT_AP).next_to(
            image_dot, LEFT, buff=0.15
        )
        self.play(Write(a_p_lbl))
        self.legende(
            "On reporte l'argument de a, moins π/4 — question 1.",
            "arg(a') = −π/12 — 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, oa_line, arc, ang, ang_lbl)))
        return image_dot, a_p_lbl, oa_p_line

    # ── Q5 : A'' = R(A'), puis O, A'', B alignés ─────────────────────
    def chapitre_q5(self, plan, a_p_dot, a_p_lbl, oa_p_line, b_dot):
        badge = self.bandeau_question("5)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        a_prime_pt = plan.n2p(A_PRIME_AFF)
        a_second_pt = plan.n2p(A_SECOND_AFF)
        b_pt = plan.n2p(B_AFF)

        self.etape("q5-enonce")
        but = MathTex(
            r"a'' \overset{?}{=} \sqrt6\,e^{i\pi/12}, \qquad"
            r" \text{puis } O, A'', B \text{ alignés ?}",
            font_size=28,
        )
        self.ecrit(but)
        self.legende(
            "On applique une seconde fois la MÊME rotation R, à A'",
            "cette fois. Puis on regarde si O, A'' et B s'alignent.",
        )
        self.pose(3.4)

        self.etape("q5-sens-deuxieme-rotation")
        rayon = float(np.linalg.norm(a_prime_pt - origine))
        start_angle = float(np.angle(A_PRIME_AFF))
        arc2 = Arc(
            radius=rayon, start_angle=start_angle, angle=PI / 6,
            arc_center=origine, color=COL_PT_APP, stroke_width=3,
        )
        a_second_dot = Dot(a_prime_pt, color=COL_PT_APP, radius=0.08)
        self.play(Create(arc2, run_time=3.0), MoveAlongPath(a_second_dot, arc2, run_time=3.0))
        oa_pp_line = Line(origine, a_second_pt, color=COL_PT_APP, stroke_width=3)
        ang2 = Angle(oa_p_line, oa_pp_line, radius=0.42, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu2 = ang2.point_from_proportion(0.5)
        direction2 = (milieu2 - origine) / np.linalg.norm(milieu2 - origine)
        ang2_lbl = MathTex(r"\tfrac{\pi}{6}", font_size=24, color=BAC_ACCENT).move_to(
            milieu2 + 0.32 * direction2
        )
        self.play(Create(oa_pp_line), Create(ang2), FadeIn(ang2_lbl))
        a_pp_lbl = MathTex("A''(a'')", font_size=28, color=COL_PT_APP).next_to(
            a_second_dot, UP + LEFT, buff=0.12
        )
        self.play(Write(a_pp_lbl))
        self.legende(
            "Même rotation, appliquée une seconde fois : le rayon",
            "reste √6, l'angle avance encore de π/6.",
        )
        self.pose(3.8)

        self.etape("q5-module")
        m1 = MathTex(
            r"\left|e^{i\pi/6}\,a'\right| = |a''| = |a| = \sqrt6", font_size=32
        )
        self.ecrit(m1)
        self.legende(
            "Deux rotations successives conservent le module :",
            "celui d'A deux fois tourné vaut toujours racine de 6.",
        )
        self.pose(3.2)

        self.etape("q5-argument")
        m2 = MathTex(
            r"\arg(a'') = \arg(a') + \dfrac{\pi}{6} = -\dfrac{\pi}{12}+\dfrac{\pi}{6}"
            r" = \dfrac{\pi}{12}",
            font_size=30,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On ajoute π/6 à l'argument de A', moins π/12 —",
            "question précédente.",
        )
        self.pose(3.4)

        self.etape("q5-forme-trig")
        m3 = MathTex(
            r"\sqrt6\,e^{i\pi/12} = \sqrt6\left(\cos\dfrac{\pi}{12}+i\sin\dfrac{\pi}{12}\right)",
            font_size=28, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.55)
        self.legende(
            "Module racine de 6, argument π/12 — exactement l'affixe",
            "annoncée pour A''.",
        )
        self.pose(3.4)

        self.etape("q5-sens-alignement")
        self.nettoie()
        rayon_commun = DashedLine(origine, b_pt, color=BAC_INK_MUTED, stroke_width=2)
        self.play(Create(rayon_commun, run_time=1.4))
        self.legende(
            "Que SIGNIFIE 'alignés avec O' ? O, A'' et B pointent dans",
            "la MÊME direction depuis O — un seul rayon les porte tous.",
        )
        self.pose(3.6)

        self.etape("q5-meme-argument")
        m4 = MathTex(
            r"\arg(b) = \dfrac{\pi}{12} = \arg\!\left(\sqrt6\,e^{i\pi/12}\right)",
            font_size=32,
        )
        self.ecrit(m4)
        self.legende(
            "L'argument de b, question 3, est EXACTEMENT celui trouvé",
            "pour A'' : même direction depuis O.",
        )
        self.pose(3.4)

        self.etape("q5-conclusion")
        concl = MathTex(
            r"\dfrac{\sqrt6\,e^{i\pi/12}}{b} \in \mathbb{R}_{+}^{*}"
            r" \implies O, A'', B \text{ alignés}",
            font_size=30, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.5)
        self.play(rayon_commun.animate.set_color(BAC_SUCCESS))
        self.legende(
            "Rapport réel strictement positif entre les deux affixes :",
            "les vecteurs sont colinéaires — 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(
            badge, oa_p_line, arc2, oa_pp_line, ang2, ang2_lbl,
            a_p_dot, a_p_lbl, a_second_dot, a_pp_lbl, rayon_commun,
        )))

    # ── Q6 : B' = R(B), troisième et dernière rotation ───────────────
    def chapitre_q6(self, plan, b_dot):
        badge = self.bandeau_question("6)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        b_pt = plan.n2p(B_AFF)
        b_prime_pt = plan.n2p(B_PRIME_AFF)

        self.etape("q6-enonce")
        but = MathTex(
            r"b' \overset{?}{=} \left(\dfrac{3+\sqrt3}{3}\right)\overline a,"
            r"\qquad B' = R(B)",
            font_size=30,
        )
        self.ecrit(but)
        self.legende(
            "Troisième et dernière rotation de cet exercice : R",
            "appliquée à B, cette fois.",
        )
        self.pose(3.2)

        self.etape("q6-sens-rotation")
        ob_line = Line(origine, b_pt, color=COL_PT_B, stroke_width=3)
        rayon = float(np.linalg.norm(b_pt - origine))
        start_angle = float(np.angle(B_AFF))
        arc3 = Arc(
            radius=rayon, start_angle=start_angle, angle=PI / 6,
            arc_center=origine, color=COL_PT_BP, stroke_width=3,
        )
        b_prime_dot = Dot(b_pt, color=COL_PT_BP, radius=0.08)
        self.play(Create(ob_line))
        self.play(Create(arc3, run_time=3.0), MoveAlongPath(b_prime_dot, arc3, run_time=3.0))
        ob_p_line = Line(origine, b_prime_pt, color=COL_PT_BP, stroke_width=3)
        self.play(Create(ob_p_line))
        self.legende(
            "Toujours la même rotation R : le rayon OB ne change pas,",
            "seul l'angle avance de π/6, comme pour A.",
        )
        self.pose(3.4)

        self.etape("q6-module-b-prime")
        m1 = MathTex(r"|b'| = |b| = \sqrt6+\sqrt2", font_size=36)
        self.ecrit(m1)
        self.legende(
            "Une rotation conserve le module : celui de b vaut",
            "racine de 6 plus racine de 2 — question 3.",
        )
        self.pose(3.0)

        self.etape("q6-module-membre-droit")
        m2 = MathTex(
            r"\left|\dfrac{3+\sqrt3}{3}\,\overline{a}\right|"
            r" = \dfrac{3+\sqrt3}{3}\,|a| = \dfrac{3+\sqrt3}{3}\sqrt6"
            r" = \sqrt6+\sqrt2",
            font_size=24,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Le module de a barre vaut celui de a, racine de 6 : le",
            "même calcul que la question 3 redonne racine 6 + racine 2.",
        )
        self.pose(3.4)

        self.etape("q6-argument-b-prime")
        self.nettoie()
        m3 = MathTex(
            r"\arg(b') = \arg(b) + \dfrac{\pi}{6} = \dfrac{\pi}{12}+\dfrac{\pi}{6}"
            r" = \dfrac{\pi}{4}",
            font_size=30,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "Rotation d'angle π/6 appliquée à B ; l'argument de b vaut",
            "π/12 — question 3.",
        )
        self.pose(3.2)

        self.etape("q6-argument-membre-droit")
        m4 = MathTex(
            r"\arg(\overline{a}) = -\arg(a) = \dfrac{\pi}{4},"
            r" \quad \dfrac{3+\sqrt3}{3}>0",
            font_size=30,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "Conjuguer change le signe de l'argument ; le coefficient",
            "réel positif ne le change pas.",
        )
        self.pose(3.4)

        self.etape("q6-conclusion")
        concl = MathTex(
            r"|b'| = \left|\dfrac{3+\sqrt3}{3}\overline{a}\right|"
            r"\ \text{et}\ \arg(b') = \arg\!\left(\dfrac{3+\sqrt3}{3}\overline{a}\right)"
            r" \implies b' = \dfrac{3+\sqrt3}{3}\overline{a}",
            font_size=20, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        b_p_lbl = MathTex("B'(b')", font_size=30, color=COL_PT_BP).next_to(
            b_prime_dot, RIGHT, buff=0.15
        )
        self.play(Write(b_p_lbl))
        self.legende(
            "Même module et même argument : les deux nombres sont",
            "égaux — 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, ob_line, arc3, ob_p_line)))
        return b_prime_dot

    # ── Q7 : le triangle OAB' est rectangle en O ─────────────────────
    def chapitre_q7(self, plan, a_dot, b_p_dot):
        badge = self.bandeau_question("7)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        a_pt = plan.n2p(A_AFF)
        b_prime_pt = plan.n2p(B_PRIME_AFF)

        self.etape("q7-enonce")
        but = Text("Montrer que le triangle O A B' est rectangle en O.", font_size=25)
        self.ecrit(but)
        self.legende("On en déduit ce résultat sans nouveau calcul lourd.")
        self.pose(2.8)

        self.etape("q7-sens-angle-quotient")
        oa = Line(origine, a_pt, color=COL_PT_A, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        obp = Line(origine, b_prime_pt, color=COL_PT_BP, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        ang = Angle(oa, obp, radius=0.5, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex("?", font_size=26, color=BAC_ACCENT).move_to(
            milieu + 0.36 * direction
        )
        self.play(Create(oa), Create(obp))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE l'argument d'un quotient d'affixes-vecteurs ?",
            "L'ANGLE entre les deux vecteurs — ici en O, entre OA et OB'.",
        )
        self.pose(3.8)

        self.etape("q7-formule")
        f1 = MathTex(
            r"\left(\overrightarrow{OA},\overrightarrow{OB'}\right) \equiv"
            r" \arg\!\left(\dfrac{b'}{a}\right) = \arg(b')-\arg(a)\ [2\pi]",
            font_size=26,
        )
        self.ecrit(f1)
        self.legende(
            "L'angle en O est l'argument du quotient des affixes des",
            "deux vecteurs issus de O.",
        )
        self.pose(3.2)

        self.etape("q7-substituer")
        f2 = MathTex(
            r"\arg(b')-\arg(a) = \dfrac{\pi}{4} - \left(-\dfrac{\pi}{4}\right)"
            r" = \dfrac{\pi}{2}",
            font_size=32,
        )
        self.ecrit(f2, buff=0.5)
        self.legende(
            "On reporte arg(b') = π/4 — question 6, et arg(a) = −π/4",
            "— question 1.",
        )
        self.pose(3.4)

        self.etape("q7-conclusion")
        concl = MathTex(
            r"\left(\overrightarrow{OA},\overrightarrow{OB'}\right) \equiv"
            r" \dfrac{\pi}{2}\ [2\pi] \implies OAB' \text{ rectangle en } O",
            font_size=28, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        ang_lbl2 = MathTex(r"\tfrac{\pi}{2}", font_size=22, color=BAC_SUCCESS).move_to(ang_lbl)
        contour = VGroup(
            Line(origine, a_pt), Line(a_pt, b_prime_pt), Line(b_prime_pt, origine)
        ).set_stroke(color=BAC_SUCCESS, width=2)
        self.play(
            ReplacementTransform(ang_lbl, ang_lbl2),
            ang.animate.set_color(BAC_SUCCESS),
            Create(contour),
        )
        self.legende(
            "Angle droit en O — le triangle est rectangle en O.",
            "0,5 point. Exercice terminé, quatre points au total.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• |produit| = produit des modules ; arg(produit) = somme des arguments.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Conjugué = reflet dans l'axe réel ; arg(z̄) = −arg(z).",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Rotation de centre O, angle θ : z' = e^{iθ}z — le rayon ne change pas.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Puissance : |zⁿ| = |z|ⁿ et arg(zⁿ) = n × arg(z).",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• arg(quotient d'affixes-vecteurs) = angle entre les deux vecteurs.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("• Trois points alignés avec O ⇔ même argument depuis O.",
                 font_size=22, color=BAC_INK_SOFT),
            Text("4 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=20, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
