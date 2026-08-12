"""Explication animée v4 — Bac 2019 SN (SM), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-2/bank.yaml,
entrée bk-2019-n-x2 (vérifiée, AlloSchool element/68482, code sujet
NS 24F, Exercice 2, 3,5 points, filière SCIENCES MATHÉMATIQUES).

Neuf questions, deux parties. Partie I — l'équation
(E) : z² − (1+i)(1+m)z + 2im = 0, m ∈ ℂ − ℝ : 1a) Δ ≠ 0 (carré parfait
via (1+i)² = 2i puis (m−1)²) ; 1b) z1 = (1+i)m, z2 = 1+i ; 2a) avec
m = e^{iθ}, 0<θ<π : module et argument de z1+z2 (factorisation par
l'angle moitié) ; 2b) si z1z2 ∈ ℝ alors z1+z2 = 2i (m = i). Partie II —
le plan complexe, A(a=1+i), B(b=(1+i)m), C(c=1−i), D image de B par la
rotation de centre O et d'angle π/2, Ω milieu de [CD] : 1a) ω =
(1−i)(1−m)/2 ; 1b) (b−a)/ω = −2i ; 1c) (OΩ)⊥(AB) et AB = 2·OΩ ; 2a) H,
intersection de (OΩ) et (AB) — deux rapports, un réel, un imaginaire
pur ; 2b) h en fonction de m.

m reste un paramètre SYMBOLIQUE tout au long de la Partie II (aucune
valeur n'est imposée par l'énoncé) : toute l'algèbre de cette scène est
menée en m général, exactement comme dans bank.yaml. Pour ANCRER une
figure (DESIGN.md §3 : la couche de sens précède le calcul), on choisit
UNE valeur d'illustration, m = i, annoncée explicitement comme un choix
(pas une donnée) et rappelée à l'écran tant que la figure est visible.
Ce choix n'est pas arbitraire pour l'auteur : bank.yaml lui-même signale
au dernier pas (q2b2) que m = i sert de contrôle (« Contrôle m = i :
h = i (H(0,1)) »), et la scène boucle sur cette vérification à la fin
de la Partie II — la figure illustrative et la formule générale se
rejoignent au même point.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape, y compris le coefficient 1 invisible devant
z²), couche de sens avant chaque calcul (e^{iθ} = point du cercle
unité, rotation = arc de trajectoire + angle dessiné, milieu = moyenne
des affixes, rapport d'affixes-vecteurs = longueur ET angle à la fois,
rung R6), signaling dans la formule, zones d'écran dures. Collision de
lettres à SIGNALER (rouge, DESIGN.md §2) : les coefficients a, b, c de
l'équation (E) NE SONT PAS les points A, B, C de la Partie II.

Rendu : ../../render.sh scenes/maths/nombres-complexes-2/bk-2019-n-x2.py
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
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
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

# Coefficients de l'ÉQUATION (E) (forme générale a z² + b z + c = 0) —
# collision de lettres à SIGNALER : les points A, B, C de la Partie II
# portent les MÊMES lettres pour d'autres objets (DESIGN.md §2 : rouge
# réservé au piège).
COL_A, COL_B, COL_C = BAC_ACCENT_STRONG, BAC_WARNING, BAC_SUCCESS

# Identité visuelle stable des SIX points de la figure de la Partie II
# (distincte du triplet ci-dessus) : A sarcelle, B sarcelle claire,
# C vert, D sarcelle forte (image par rotation), Ω or (milieu calculé),
# H gris (point d'intersection, dernier point trouvé).
COL_PT_A, COL_PT_B, COL_PT_C = BAC_ACCENT, BAC_ACCENT_LIGHT, BAC_SUCCESS
COL_PT_D, COL_PT_OMEGA, COL_PT_H = BAC_ACCENT_STRONG, BAC_WARNING, BAC_INK_MUTED

NARRATION = {
    "titre": "Exercice deux du bac deux mille dix-neuf, session normale, "
    "sciences mathématiques : nombres complexes, sur trois virgule cinq "
    "points. Deux parties, neuf questions : une équation à paramètre, "
    "puis une figure — rotation, milieu, perpendicularité.",
    "intro": "On donne un nombre complexe m, non réel. La partie un "
    "étudie une équation dont un coefficient dépend de m. La partie "
    "deux plante ces mêmes nombres dans le plan complexe.",
    "q1a": "Question un a. On identifie les coefficients de l'équation "
    "— y compris le 1 invisible devant z carré — puis on calcule le "
    "discriminant. Le geste qui débloque tout : reconnaître que "
    "(1+i) au carré vaut 2i, ce qui fait apparaître un carré parfait. "
    "m non réel garantit que ce discriminant n'est jamais nul.",
    "q1b": "Question un b. Le discriminant est déjà un carré parfait : "
    "pas besoin de chercher sa racine, elle saute aux yeux. On "
    "l'injecte dans la formule des racines et tout se factorise.",
    "q2a": "Question deux a. Avec m sur le cercle unité, on factorise "
    "la somme des deux racines par l'angle moitié pour en lire le "
    "module et l'argument d'un seul coup.",
    "q2b": "Question deux b. Si le produit des racines est réel, m est "
    "un imaginaire pur — sur ce demi-cercle, un seul candidat : m égale "
    "i. On en déduit la somme.",
    "plan": "On installe le plan complexe avec quatre points donnés : "
    "A, B, C dépendent d'un paramètre m — pour les voir, on choisit un "
    "exemple, m égale i, tout en gardant le calcul général en m.",
    "q1a2": "Question un a, partie deux. D est l'image de B par un "
    "quart de tour autour de O. Ω est le milieu de [CD] — sa formule "
    "reste valable pour n'importe quel m, l'exemple ne fait que "
    "la rendre visible.",
    "q1b2": "Question un b, partie deux. Un calcul de rapport, purement "
    "algébrique, entre deux différences d'affixes.",
    "q1c2": "Question un c, partie deux. Le rapport de deux "
    "affixes-vecteurs encode à la fois un rapport de longueurs — son "
    "module — et un angle — son argument. Ici : deux fois plus long, "
    "et perpendiculaire.",
    "q2a2": "Question deux a, partie deux. H est le point où (OΩ) "
    "coupe (AB). Deux alignements, deux rapports réels ou imaginaires "
    "purs à traduire.",
    "q2b2": "Question deux b, partie deux. On combine les deux rapports "
    "pour isoler h en fonction de m — et l'on vérifie que l'exemple "
    "affiché à l'écran, m égale i, donne exactement le point tracé.",
}

# Partie II — affixes données (A, C indépendants de m).
A_AFF = complex(1, 1)      # a = 1 + i
C_AFF = complex(1, -1)     # c = 1 - i

# Valeur D'ILLUSTRATION UNIQUEMENT (voir docstring) : m = i sert à
# ANCRER la figure ; le calcul mené à l'écran reste général, en m.
M_EXEMPLE = complex(0, 1)
B_AFF = complex(1, 1) * M_EXEMPLE                  # b = (1+i)m = -1+i
D_AFF = -complex(1, -1) * M_EXEMPLE                # d = -(1-i)m = -1-i
OMEGA_AFF = (C_AFF + D_AFF) / 2                    # ω = (1-i)(1-m)/2 = -i
H_AFF = complex(0, 1)                              # h = i (vérifié en q2b2)


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1a()
        self.chapitre_q1b()
        self.chapitre_q2a()
        self.chapitre_q2b()
        plan, a_dot, a_lbl, b_dot, b_lbl, c_dot, c_lbl = self.chapitre_plan()
        d_dot, d_lbl, omega_dot, omega_lbl = self.chapitre_q1a2(plan, b_dot, c_dot)
        self.chapitre_q1b2(plan, a_dot, b_dot, omega_dot)
        self.chapitre_q1c2(plan, a_dot, b_dot, omega_dot)
        h_dot, h_lbl = self.chapitre_q2a2(plan, a_dot, b_dot, omega_dot)
        self.chapitre_q2b2(plan, h_dot)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2019 · SESSION NORMALE · SCIENCES MATHÉMATIQUES",
            "Nombres complexes",
            "Exercice 2 — 3,5 points · sujet officiel NS 24F",
        )

    # ── Les données de l'énoncé ─────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "Soit m un nombre complexe NON RÉEL.", font_size=30,
        ).shift(2.3 * UP)
        partie1 = MathTex(
            r"\text{(E)}\ :\ z^2 - (1+i)(1+m)\,z + 2im = 0", font_size=38,
        ).next_to(entete, DOWN, buff=0.6)
        partie2 = Text(
            "Partie II : les mêmes nombres, placés dans le plan complexe.",
            font_size=26, color=BAC_INK_SOFT,
        ).next_to(partie1, DOWN, buff=0.6)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(partie1, shift=0.2 * UP), run_time=1.2)
        self.play(FadeIn(partie2, shift=0.15 * UP), run_time=0.8)
        self.legende(
            "m est un paramètre, non réel — jamais donné comme un",
            "nombre précis. Toute l'algèbre qui suit reste valable pour",
            "N'IMPORTE QUEL m non réel : c'est ça, un exercice à paramètre.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(VGroup(entete, partie1, partie2)))

    # ── Q1 a) : le discriminant de (E) est non nul ───────────────────
    def chapitre_q1a(self):
        badge = self.bandeau_question("1) a)", "0,25 pt")

        self.etape("q1a-enonce")
        eq = MathTex(
            "z^2", "-(1+i)(1+m)", "z", "+", "2im", "=0", font_size=46,
        ).shift(2.3 * UP)
        self.play(Write(eq), run_time=1.6)
        self.legende(
            "On doit montrer que le discriminant de cette équation",
            "n'est JAMAIS nul — quel que soit le m non réel choisi.",
        )
        self.pose(2.8)

        self.etape("q1a-a-implicite")
        lab_a = MathTex("a = 1", font_size=38, color=COL_A).move_to(
            3.4 * LEFT + 0.9 * UP
        )
        cadre_a = self.entoure(eq[0], COL_A)
        self.play(FadeIn(lab_a, shift=0.15 * UP))
        fleche_a = self.fleche_vers(eq[0], lab_a, COL_A)
        self.legende(
            "Devant z², rien n'est écrit : c'est un 1 INVISIBLE. La règle",
            "du zéro implicite s'applique aussi ici : a = 1.",
        )
        self.pose(3.2)

        self.etape("q1a-coefficients")
        lab_b = MathTex(
            "b = -(1+i)(1+m)", font_size=32, color=COL_B
        ).next_to(lab_a, DOWN, buff=0.5).align_to(lab_a, LEFT)
        lab_c = MathTex("c = 2im", font_size=32, color=COL_C).next_to(
            lab_b, DOWN, buff=0.35
        ).align_to(lab_a, LEFT)
        cadre_b = self.entoure(VGroup(eq[1], eq[2]), COL_B)
        self.play(FadeIn(lab_b, shift=0.15 * UP))
        fleche_b = self.fleche_vers(cadre_b, lab_b, COL_B)
        cadre_c = self.entoure(eq[4], COL_C)
        self.play(FadeIn(lab_c, shift=0.15 * UP))
        fleche_c = self.fleche_vers(eq[4], lab_c, COL_C)
        labels = VGroup(lab_a, lab_b, lab_c)
        warn = Text(
            "a, b, c ici : coefficients de l'équation — les points A, B, C",
            font_size=18, color=BAC_ERROR,
        ).next_to(labels, DOWN, buff=0.3).align_to(labels, LEFT)
        warn2 = Text(
            "de la partie II (bientôt) sont d'autres objets, mêmes lettres.",
            font_size=18, color=BAC_ERROR,
        ).next_to(warn, DOWN, buff=0.06).align_to(labels, LEFT)
        self.play(FadeIn(warn, shift=0.1 * UP), FadeIn(warn2))
        self.legende(
            "Devant z il y a moins (1+i)(1+m), AVEC son signe : c'est b.",
            "Tout seul, il y a 2im : c'est c. Ces a, b, c désignent les",
            "coefficients — pas les points A, B, C à venir, même lettres.",
        )
        self.pose(3.8)

        self.etape("q1a-outil-discriminant")
        cadres = VGroup(cadre_a, cadre_b, cadre_c)
        fleches = VGroup(fleche_a, fleche_b, fleche_c)
        self.play(
            FadeOut(cadres), FadeOut(fleches), FadeOut(warn), FadeOut(warn2),
            eq.animate.scale(0.75).to_edge(UP, buff=1.0).to_edge(LEFT, buff=0.7),
        )
        self.play(
            labels.animate.scale(0.8).next_to(eq, DOWN, buff=0.4).to_edge(
                LEFT, buff=0.7
            ),
        )
        delta_def = MathTex(
            r"\Delta = b^2 - 4\,a\,c", font_size=44
        ).next_to(labels, DOWN, buff=0.7).to_edge(LEFT, buff=0.7)
        cadre_outil = SurroundingRectangle(
            delta_def, color=BAC_ACCENT, buff=0.2, corner_radius=0.1
        )
        self.play(Write(delta_def), Create(cadre_outil))
        self.legende(
            "L'outil du second degré : le discriminant, Δ = b² − 4ac.",
            "On y reporte NOS a, b, c — avec des expressions en m.",
        )
        self.pose(3.0)

        self.etape("q1a-calcul-b2-4ac")
        c1 = MathTex(
            r"b^2 = \big[(1+i)(1+m)\big]^2 = (1+i)^2(1+m)^2",
            font_size=34,
        ).next_to(cadre_outil, RIGHT, buff=0.9).align_to(cadre_outil, UP)
        c2 = MathTex(
            r"4\,a\,c = 4\times 1\times 2im = 8im", font_size=34,
        ).next_to(c1, DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(Write(c1))
        self.play(Write(c2))
        self.legende(
            "Le carré efface le signe devant b : b² = (1+i)²(1+m)².",
            "Et 4ac : 4 fois 1 fois 2im, ça fait 8im.",
        )
        self.pose(3.4)

        self.etape("q1a-rappel-1i-carre")
        rappel = MathTex(
            r"(1+i)^2 = 1+2i+i^2 = 2i", font_size=32, color=BAC_INK_SOFT,
        ).next_to(c2, DOWN, aligned_edge=LEFT, buff=0.5)
        cadre_rappel = SurroundingRectangle(
            rappel, color=BAC_INK_MUTED, buff=0.15, corner_radius=0.08
        )
        self.play(FadeIn(rappel), Create(cadre_rappel))
        self.legende(
            "Le geste qui débloque tout : (1+i) au carré vaut 2i",
            "(i² = −1). On le réutilisera encore dans cet exercice.",
        )
        self.pose(3.6)

        # Reset (comme au sujet 2019 de nombres-complexes-1) : l'équation,
        # les coefficients et les calculs intermédiaires quittent l'écran
        # d'un coup ; le résultat qui compte remonte en haut-gauche, avec
        # toute la hauteur libre pour la suite — jamais de dérive vers la
        # bande légende.
        self.etape("q1a-substituer")
        c3 = MathTex(
            r"\Delta = 2i(1+m)^2 - 8im = 2i\big[(1+m)^2 - 4m\big]",
            font_size=36,
        ).to_edge(LEFT, buff=0.7).to_edge(UP, buff=1.3)
        self.play(
            FadeOut(eq), FadeOut(labels), FadeOut(delta_def), FadeOut(cadre_outil),
            FadeOut(c1), FadeOut(c2), FadeOut(rappel), FadeOut(cadre_rappel),
            Write(c3),
        )
        self.legende(
            "On remplace (1+i)² par 2i, puis on met 2i en facteur",
            "commun devant les deux termes.",
        )
        self.pose(3.2)

        self.etape("q1a-carre-parfait")
        c4 = MathTex(
            r"(1+m)^2 - 4m = m^2 - 2m + 1 = (m-1)^2", font_size=36,
        ).next_to(c3, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(Write(c4))
        self.legende(
            "On développe le crochet : une IDENTITÉ REMARQUABLE apparaît,",
            "exactement (m − 1) au carré.",
        )
        self.pose(3.4)

        self.etape("q1a-delta-final")
        c5 = MathTex(
            r"\Delta = 2i\,(m-1)^2", font_size=44, color=BAC_ACCENT_STRONG,
        ).next_to(c4, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(Write(c5))
        self.legende("Le discriminant, sous sa forme la plus simple.")
        self.pose(2.6)

        self.etape("q1a-conclusion")
        c6 = MathTex(
            r"m \notin \mathbb{R} \implies m \neq 1 \implies (m-1)^2 \neq 0"
            r",\quad 2i \neq 0",
            font_size=30,
        ).next_to(c5, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(FadeOut(c3), FadeOut(c4), Write(c6))
        concl = MathTex(
            r"\Delta \neq 0", font_size=46, color=BAC_SUCCESS,
        ).next_to(c6, DOWN, buff=0.55)
        self.play(Write(concl))
        cadre_concl = SurroundingRectangle(
            concl, color=BAC_SUCCESS, buff=0.15, corner_radius=0.1
        )
        self.play(Create(cadre_concl))
        self.legende(
            "m non réel donne m ≠ 1, donc (m−1)² n'est jamais nul — et",
            "2i non plus. Δ ne s'annule JAMAIS : vérifié — 0,25 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, c5, c6, concl, cadre_concl)))

    # ── Q1 b) : les deux solutions z1 et z2 ──────────────────────────
    def chapitre_q1b(self):
        badge = self.bandeau_question("1) b)", "0,5 pt")

        self.etape("q1b-enonce")
        but = MathTex(
            r"\text{Déterminer}\ z_1\ \text{et}\ z_2,"
            r"\ \text{les deux solutions de (E)}", font_size=36,
        ).shift(2.6 * UP)
        rappel_delta = MathTex(
            r"\Delta = 2i\,(m-1)^2", font_size=32, color=BAC_INK_SOFT,
        ).next_to(but, DOWN, buff=0.6)
        self.play(Write(but), run_time=1.4)
        self.play(FadeIn(rappel_delta, shift=0.15 * UP))
        self.legende(
            "On repart du discriminant trouvé à la question précédente.",
        )
        self.pose(2.6)

        self.etape("q1b-racine-carree")
        d1 = MathTex(
            r"\Delta = 2i\,(m-1)^2 = (1+i)^2(m-1)^2 = \big[(1+i)(m-1)\big]^2",
            font_size=30,
        ).next_to(rappel_delta, DOWN, buff=0.6)
        self.legende(
            "Que SIGNIFIE résoudre avec Δ ? Il faut une racine carrée",
            "δ de Δ. Ici pas besoin de la chercher : Δ EST déjà un carré",
            "— on la relit directement dessus.",
        )
        self.play(Write(d1))
        cadre_d1 = self.entoure(d1, BAC_ACCENT)
        self.pose(3.8)

        self.etape("q1b-delta-racine")
        d2 = MathTex(
            r"\delta = (1+i)(m-1)", font_size=38, color=BAC_ACCENT_STRONG,
        ).next_to(d1, DOWN, buff=0.55)
        self.play(Write(d2))
        self.legende("Une racine carrée de Δ : δ = (1+i)(m − 1).")
        self.pose(2.8)

        self.etape("q1b-formule")
        self.play(
            FadeOut(but), FadeOut(rappel_delta), FadeOut(d1), FadeOut(cadre_d1),
            d2.animate.to_edge(LEFT, buff=0.7).to_edge(UP, buff=1.3),
        )
        outil = MathTex(
            r"z = \dfrac{-b \pm \delta}{2a}", font_size=38,
        ).next_to(d2, DOWN, buff=0.6, aligned_edge=LEFT)
        cadre_outil = SurroundingRectangle(
            outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1
        )
        self.play(Write(outil), Create(cadre_outil))
        self.legende(
            "L'outil du second degré, à nouveau : z = (−b ± δ) sur 2a.",
            "Ici −b = (1+i)(1+m), et 2a = 2.",
        )
        self.pose(3.4)

        self.etape("q1b-substituer")
        e1 = MathTex(
            r"z = \dfrac{(1+i)(1+m) \pm (1+i)(m-1)}{2}"
            r" = \dfrac{(1+i)\big[(1+m) \pm (m-1)\big]}{2}",
            font_size=28,
        ).next_to(outil, DOWN, buff=0.6, aligned_edge=LEFT)
        self.play(Write(e1))
        self.legende(
            "On remplace, puis on factorise par (1+i) — commun aux",
            "deux termes du numérateur.",
        )
        self.pose(3.4)

        self.etape("q1b-z1")
        z1_calc = MathTex(
            r"(1+m)+(m-1) = 2m \implies z_1 = \dfrac{(1+i)(2m)}{2} = (1+i)\,m",
            font_size=30, color=BAC_ACCENT_STRONG,
        ).next_to(e1, DOWN, buff=0.55, aligned_edge=LEFT)
        self.play(Write(z1_calc))
        self.legende(
            "Signe +   : (1+m) plus (m−1) égale 2m. Le 2 se simplifie :",
            "z₁ = (1+i) m.",
        )
        self.pose(3.4)

        self.etape("q1b-z2")
        z2_calc = MathTex(
            r"(1+m)-(m-1) = 2 \implies z_2 = \dfrac{(1+i)(2)}{2} = 1+i",
            font_size=30, color=BAC_WARNING,
        ).next_to(z1_calc, DOWN, buff=0.45, aligned_edge=LEFT)
        self.play(Write(z2_calc))
        self.legende(
            "Signe −   : (1+m) moins (m−1) égale 2, le m disparaît.",
            "z₂ = 1+i — un nombre FIXE, indépendant de m.",
        )
        self.pose(3.6)

        self.etape("q1b-conclusion")
        self.play(FadeOut(outil), FadeOut(cadre_outil), FadeOut(e1))
        sols = MathTex(
            r"S = \big\{\, (1+i)\,m\ ;\ \ 1+i \,\big\}",
            font_size=42, color=BAC_ACCENT,
        ).next_to(d2, DOWN, buff=1.0, aligned_edge=LEFT)
        self.play(
            z1_calc.animate.shift(0.8 * UP), z2_calc.animate.shift(0.8 * UP),
            Write(sols),
        )
        cadre_sols = SurroundingRectangle(
            sols, color=BAC_ACCENT, buff=0.18, corner_radius=0.1
        )
        self.play(Create(cadre_sols))
        self.legende(
            "Deux solutions : z₁ dépend de m, z₂ n'en dépend pas —",
            "0,5 point. Les deux reviendront, tels quels, plus loin.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.play(
            FadeOut(
                VGroup(badge, d2, z1_calc, z2_calc, sols, cadre_sols)
            )
        )

    # ── Q2 a) : module et argument de z1+z2, avec m = e^{iθ} ─────────
    def chapitre_q2a(self):
        badge = self.bandeau_question("2) a)", "0,5 pt")
        self.ardoise()

        self.etape("q2a-enonce")
        hyp = MathTex(r"m = e^{i\theta}, \quad 0 < \theta < \pi", font_size=38)
        self.ecrit(hyp)
        but = Text("Module et argument de z₁ + z₂ ?", font_size=26)
        self.ecrit(but, buff=0.5)
        self.legende(
            "Cette fois m est CONTRAINT : il vit sur le cercle unité,",
            "à un angle θ entre 0 et π. On cherche module et argument.",
        )
        self.pose(3.2)

        self.etape("q2a-sens-cercle-unite")
        centre = 4.3 * RIGHT + 0.5 * UP
        rayon = 1.3
        theta_ex = 5 * PI / 6
        axe_ref = Line(
            centre, centre + RIGHT * rayon, color=BAC_INK_MUTED, stroke_width=2
        )
        cercle = Circle(radius=rayon, color=BAC_INK_MUTED, stroke_width=1.5).move_to(
            centre
        )
        m_dir = np.array([np.cos(theta_ex), np.sin(theta_ex), 0])
        m_point = centre + rayon * m_dir
        om = Line(centre, m_point, color=BAC_WARNING, stroke_width=3)
        m_dot = Dot(m_point, color=BAC_WARNING, radius=0.07)
        m_lbl = MathTex("m", font_size=30, color=BAC_WARNING).next_to(
            m_dot, UP + LEFT, buff=0.1
        )
        ang = Angle(
            axe_ref, om, radius=0.45, other_angle=False,
            color=BAC_ACCENT, stroke_width=3,
        )
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - centre) / np.linalg.norm(milieu - centre)
        theta_lbl = MathTex(r"\theta", font_size=26, color=BAC_ACCENT).move_to(
            milieu + 0.38 * direction
        )
        self.play(Create(cercle), Create(axe_ref))
        self.play(Create(om))
        self.play(FadeIn(m_dot, scale=1.6), Write(m_lbl))
        self.play(Create(ang), FadeIn(theta_lbl))
        self.legende(
            "Que SIGNIFIE e^{iθ} ? Le POINT DU CERCLE UNITÉ à l'angle θ",
            "depuis l'axe réel — un module toujours égal à 1, seul",
            "l'angle varie. C'est exactement m.",
        )
        self.pose(3.8)

        self.etape("q2a-factoriser-somme")
        f1 = MathTex(
            r"z_1+z_2 = (1+i)m+(1+i) = (1+i)(m+1) = (1+i)\big(e^{i\theta}+1\big)",
            font_size=28,
        )
        self.ecrit(f1)
        self.legende(
            "On factorise la somme par (1+i) — z₁ et z₂ le contiennent",
            "tous les deux.",
        )
        self.pose(3.2)

        self.etape("q2a-angle-moitie")
        f2 = MathTex(
            r"e^{i\theta}+1 = e^{i\theta/2}\big(e^{i\theta/2}+e^{-i\theta/2}\big)"
            r" = 2\cos\tfrac{\theta}{2}\; e^{i\theta/2}",
            font_size=28,
        )
        self.ecrit(f2, buff=0.5)
        self.legende(
            "L'outil de l'angle moitié : on met e^{iθ/2} en facteur, et",
            "e^{iθ/2} + e^{−iθ/2} devient 2 cos(θ/2) — une somme réelle.",
        )
        self.pose(3.6)

        self.etape("q2a-produit")
        f3 = MathTex(
            r"1+i = \sqrt2\,e^{i\pi/4} \implies z_1+z_2"
            r" = 2\sqrt2\,\cos\tfrac{\theta}{2}\; e^{i\left(\frac{\pi}{4}+\frac{\theta}{2}\right)}",
            font_size=26,
        )
        self.ecrit(f3, buff=0.5)
        self.legende(
            "1+i vaut √2 e^{iπ/4}. Produit de deux exponentielles :",
            "modules × modules, arguments + arguments.",
        )
        self.pose(3.4)

        self.etape("q2a-conclusion")
        f4 = MathTex(
            r"|z_1+z_2| = 2\sqrt2\,\cos\tfrac{\theta}{2}, \quad"
            r" \arg(z_1+z_2) = \tfrac{\pi}{4}+\tfrac{\theta}{2}\ [2\pi]",
            font_size=26, color=BAC_SUCCESS,
        )
        self.ecrit(f4, buff=0.55)
        self.encadre(couleur=BAC_SUCCESS)
        self.legende(
            "0 < θ/2 < π/2 donc cos(θ/2) > 0 : c'est bien un module,",
            "positif. 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(
            FadeOut(
                VGroup(badge, cercle, axe_ref, om, m_dot, m_lbl, ang, theta_lbl)
            )
        )

    # ── Q2 b) : si z1z2 est réel, alors z1+z2 = 2i ───────────────────
    def chapitre_q2b(self):
        badge = self.bandeau_question("2) b)", "0,25 pt")
        self.ardoise()

        self.etape("q2b-enonce")
        but = MathTex(
            r"\text{Si}\ z_1z_2 \in \mathbb{R},"
            r"\ \text{montrer que}\ z_1+z_2 = 2i", font_size=36,
        )
        self.ecrit(but)
        self.legende(
            "On suppose, cette fois, que le PRODUIT des deux racines",
            "est réel — et on en tire une conséquence sur leur somme.",
        )
        self.pose(3.2)

        self.etape("q2b-produit")
        p1 = MathTex(
            r"z_1z_2 = (1+i)m\times(1+i) = (1+i)^2 m = 2im", font_size=32,
        )
        self.ecrit(p1, buff=0.55)
        self.legende(
            "Produit des deux racines ; on retrouve (1+i)² = 2i,",
            "l'outil déjà vu à la question 1a.",
        )
        self.pose(3.2)

        self.etape("q2b-condition-reel")
        p2 = MathTex(
            r"2im \in \mathbb{R} \iff im \in \mathbb{R}"
            r" \iff m \in i\mathbb{R}", font_size=34,
        )
        self.ecrit(p2, buff=0.5)
        self.legende(
            "2 est réel, il ne change rien à la condition : im réel",
            "équivaut à m IMAGINAIRE PUR — partie réelle nulle.",
        )
        self.pose(3.4)

        self.etape("q2b-m-egal-i")
        p3 = MathTex(
            r"m = e^{i\theta},\ 0<\theta<\pi,\ m \in i\mathbb{R}"
            r" \implies \theta = \dfrac{\pi}{2} \implies m = i",
            font_size=28,
        )
        self.ecrit(p3, buff=0.5)
        self.legende(
            "Sur ce demi-cercle, un seul angle rend m imaginaire pur :",
            "θ = π/2. C'est le point du haut du cercle unité — m = i.",
        )
        self.pose(3.6)

        self.etape("q2b-conclusion")
        p4 = MathTex(
            r"z_1+z_2 = (1+i)(m+1) = (1+i)(i+1) = (1+i)^2 = 2i",
            font_size=30, color=BAC_SUCCESS,
        )
        self.ecrit(p4, buff=0.55)
        self.encadre(couleur=BAC_SUCCESS)
        self.legende(
            "On remplace m par i dans la somme factorisée (question 2a) :",
            "il reste (1+i)² — encore lui — soit 2i. 0,25 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Partie II : le plan complexe — A, C donnés, B illustré ───────
    def chapitre_plan(self):
        self.etape("p2-enonce")
        entete = Text(
            "Partie II : le plan complexe (O ; u, v).", font_size=28,
        ).shift(2.5 * UP)
        defs = MathTex(
            r"a=1+i,\quad b=(1+i)m,\quad c=1-i", font_size=32,
        ).next_to(entete, DOWN, buff=0.55)
        defs2 = Text(
            "D, image de B par la rotation de centre O, d'angle π/2.",
            font_size=24, color=BAC_INK_SOFT,
        ).next_to(defs, DOWN, buff=0.45)
        defs3 = Text(
            "Ω, milieu de [CD].", font_size=24, color=BAC_INK_SOFT,
        ).next_to(defs2, DOWN, buff=0.15)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(defs, shift=0.2 * UP))
        self.play(FadeIn(defs2, shift=0.1 * UP), FadeIn(defs3, shift=0.1 * UP))
        self.legende(
            "On installe A, B, C dans le plan. D et Ω viendront question",
            "après question — ils dépendent de la rotation et du milieu.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(VGroup(entete, defs, defs2, defs3)))

        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-2.2, 2.2, 1],
            y_range=[-2.2, 2.2, 1],
            x_length=4.8,
            y_length=4.8,
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
        ).shift(3.3 * RIGHT + 0.3 * UP)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        re_lbl = Text("axe réel", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(1.7), DOWN, buff=0.18
        )
        im_lbl = Text("axe imaginaire", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(1.5j), RIGHT, buff=0.18
        )
        self.play(Create(plan, run_time=2.0), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self._graduations(plan, [-2, -1, 1, 2], [-2, -1, 1, 2])
        self.legende(
            "Le plan complexe : horizontal = partie réelle,",
            "vertical = partie imaginaire.",
        )
        self.pose(2.8)

        self.etape("plan-A-C")
        a_dot = Dot(plan.n2p(A_AFF), color=COL_PT_A, radius=0.08)
        # À DROITE : en haut, l'étiquette collait au libellé « axe
        # imaginaire » (défaut d'audit — adjacence en haut de figure).
        a_lbl = MathTex("A(a)", font_size=32, color=COL_PT_A).next_to(
            a_dot, RIGHT, buff=0.14
        )
        c_dot = Dot(plan.n2p(C_AFF), color=COL_PT_C, radius=0.08)
        c_lbl = MathTex("C(c)", font_size=32, color=COL_PT_C).next_to(
            c_dot, DOWN + RIGHT, buff=0.1
        )
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl))
        self.play(FadeIn(c_dot, scale=1.6), Write(c_lbl))
        self.legende(
            "a = 1+i et c = 1−i sont donnés directement — deux points",
            "fixes, sans m.",
        )
        self.pose(3.0)

        self.etape("plan-exemple-b")
        badge_exemple = Text(
            "Illustration : m = i (un choix, pas une donnée)",
            font_size=20, color=BAC_INK_MUTED,
        ).move_to(3.5 * RIGHT + 2.85 * UP)
        self.play(FadeIn(badge_exemple, shift=0.1 * DOWN))
        self.ardoise()
        exemple = MathTex(
            r"m=i \implies b=(1+i)\,i = -1+i", font_size=30,
        )
        self.ecrit(exemple)
        b_dot = Dot(plan.n2p(B_AFF), color=COL_PT_B, radius=0.08)
        b_lbl = MathTex("B(b)", font_size=32, color=COL_PT_B).next_to(
            b_dot, LEFT, buff=0.14
        )
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl))
        self.legende(
            "b DÉPEND de m : pour le VOIR, on choisit m = i, un exemple.",
            "Le calcul qui suit reste général — valable pour tout m.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        return plan, a_dot, a_lbl, b_dot, b_lbl, c_dot, c_lbl

    # ── 1) a) Partie II : ω = (1-i)(1-m)/2 ───────────────────────────
    def chapitre_q1a2(self, plan, b_dot, c_dot):
        badge = self.bandeau_question("1) a)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        b_pos = plan.n2p(B_AFF)
        c_pos = plan.n2p(C_AFF)
        d_pos = plan.n2p(D_AFF)

        self.etape("q1a2-enonce")
        but = MathTex(
            r"\text{Montrer que}\ \omega = \dfrac{(1-i)(1-m)}{2}", font_size=34,
        )
        self.ecrit(but)
        self.legende(
            "On construit D, image de B par la rotation, puis Ω,",
            "le milieu de [CD].",
        )
        self.pose(3.0)

        self.etape("q1a2-sens-rotation")
        rayon = float(np.linalg.norm(b_pos - origine))
        angle_b = float(np.angle(B_AFF))
        arc = Arc(
            radius=rayon, start_angle=angle_b, angle=PI / 2,
            arc_center=origine, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        d_dot = Dot(b_pos, color=COL_PT_D, radius=0.08)
        self.play(Create(arc, run_time=2.6), MoveAlongPath(d_dot, arc, run_time=2.6))
        d_lbl = MathTex("D(d)", font_size=32, color=COL_PT_D).next_to(
            d_dot, DOWN + LEFT, buff=0.12
        )
        self.play(Write(d_lbl))
        ob_r = Line(origine, b_pos, color=BAC_WARNING, stroke_width=2.5)
        od_r = Line(origine, d_pos, color=BAC_WARNING, stroke_width=2.5)
        ang = Angle(
            ob_r, od_r, radius=0.45, other_angle=False,
            color=BAC_ACCENT, stroke_width=3,
        )
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\tfrac{\pi}{2}", font_size=24, color=BAC_ACCENT).move_to(
            milieu + 0.36 * direction
        )
        self.play(Create(ob_r), Create(od_r))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE cette rotation ? B tourne autour de O, d'un",
            "quart de tour direct, à distance constante : OB = OD.",
        )
        self.pose(3.8)

        self.etape("q1a2-formule-d")
        f1 = MathTex(r"d = e^{i\pi/2}\,b = i\,b = i(1+i)m", font_size=34)
        self.ecrit(f1)
        self.legende(
            "Rotation de centre O et d'angle π/2 : on multiplie",
            "l'affixe par e^{iπ/2}, c'est-à-dire par i.",
        )
        self.pose(3.2)

        self.etape("q1a2-simplifier-i1i")
        f2 = MathTex(
            r"i(1+i) = i+i^2 = i-1 = -(1-i) \implies d = -(1-i)\,m",
            font_size=28,
        )
        self.ecrit(f2, buff=0.5)
        self.legende(
            "i fois (1+i) : i² devient −1, il reste i − 1,",
            "qu'on réécrit −(1−i).",
        )
        self.pose(3.4)

        self.etape("q1a2-sens-milieu")
        cd = Line(c_pos, d_pos, color=BAC_INK_MUTED, stroke_width=2.5)
        self.play(Create(cd))
        self.legende(
            "Que SIGNIFIE un milieu ? Le point à ÉGALE DISTANCE de C",
            "et de D — son affixe est la MOYENNE des deux affixes.",
        )
        self.pose(3.4)

        self.etape("q1a2-formule-omega")
        f3 = MathTex(
            r"\omega = \dfrac{c+d}{2} = \dfrac{(1-i) - (1-i)m}{2}"
            r" = \dfrac{(1-i)(1-m)}{2}",
            font_size=26, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(f3, buff=0.55)
        self.encadre(couleur=BAC_ACCENT_STRONG)
        omega_dot = Dot(plan.n2p(OMEGA_AFF), color=COL_PT_OMEGA, radius=0.08)
        # Ω est SUR l'axe imaginaire (partie réelle nulle) : l'étiquette
        # part en biais (bas-droite), jamais tout droit vers le bas — sinon
        # elle retombe pile sur le trait de l'axe qui continue dessous.
        omega_lbl = MathTex(
            r"\Omega(\omega)", font_size=32, color=COL_PT_OMEGA
        ).next_to(omega_dot, DOWN + RIGHT, buff=0.12)
        self.play(FadeIn(omega_dot, scale=1.6), Write(omega_lbl))
        self.legende(
            "0,5 point. Regarde : Ω tombe exactement au milieu",
            "du segment [CD] tracé.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, arc, ob_r, od_r, ang, ang_lbl, cd)))
        return d_dot, d_lbl, omega_dot, omega_lbl

    # ── 1) b) Partie II : calculer (b-a)/ω ───────────────────────────
    def chapitre_q1b2(self, plan, a_dot, b_dot, omega_dot):
        badge = self.bandeau_question("1) b)", "0,25 pt")
        self.ardoise()

        self.etape("q1b2-enonce")
        but = MathTex(r"\text{Calculer}\ \dfrac{b-a}{\omega}", font_size=40)
        self.ecrit(but)
        self.legende(
            "Un calcul purement algébrique, entre deux différences",
            "d'affixes déjà connues.",
        )
        self.pose(2.8)

        self.etape("q1b2-numerateur")
        n1 = MathTex(r"b-a = (1+i)m - (1+i) = (1+i)(m-1)", font_size=32)
        self.ecrit(n1, buff=0.5)
        self.legende("On factorise par (1+i), commun aux deux termes.")
        self.pose(2.8)

        self.etape("q1b2-denominateur")
        n2 = MathTex(
            r"\omega = \dfrac{(1-i)(1-m)}{2} = -\dfrac{(1-i)(m-1)}{2}",
            font_size=32,
        )
        self.ecrit(n2, buff=0.5)
        self.legende(
            "On réécrit 1 − m en −(m − 1), pour faire apparaître",
            "le même facteur (m − 1) qu'au numérateur.",
        )
        self.pose(3.2)

        self.etape("q1b2-simplifier")
        n3 = MathTex(
            r"\dfrac{b-a}{\omega} = \dfrac{(1+i)(m-1)}{-\dfrac{(1-i)(m-1)}{2}}"
            r" = \dfrac{-2(1+i)}{1-i}",
            font_size=26,
        )
        self.ecrit(n3, buff=0.5)
        self.legende(
            "Le facteur (m − 1) — jamais nul, car m ≠ 1 — se simplifie",
            "entre le haut et le bas.",
        )
        self.pose(3.4)

        self.etape("q1b2-conjugue-methode")
        outil = MathTex(
            r"\dfrac{1+i}{1-i} = \dfrac{(1+i)^2}{(1-i)(1+i)} = \dfrac{2i}{2} = i",
            font_size=30, color=BAC_INK_SOFT,
        )
        self.ecrit(outil, buff=0.5)
        self.encadre(couleur=BAC_INK_MUTED)
        self.legende(
            "La méthode du conjugué, déjà connue : on multiplie",
            "haut et bas par 1+i. On retrouve (1+i)/(1−i) = i.",
        )
        self.pose(3.6)

        self.etape("q1b2-conclusion")
        concl = MathTex(
            r"\dfrac{b-a}{\omega} = -2i", font_size=46, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        self.encadre(couleur=BAC_SUCCESS)
        self.legende(
            "On multiplie : moins deux fois i. 0,25 point — cette",
            "valeur va tout de suite resservir.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── 1) c) Partie II : (OΩ)⊥(AB) et AB = 2·OΩ ─────────────────────
    def chapitre_q1c2(self, plan, a_dot, b_dot, omega_dot):
        badge = self.bandeau_question("1) c)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        a_pos = plan.n2p(A_AFF)
        b_pos = plan.n2p(B_AFF)
        omega_pos = plan.n2p(OMEGA_AFF)

        self.etape("q1c2-enonce")
        but = MathTex(
            r"\text{En déduire que}\ (O\Omega)\perp(AB)"
            r"\ \text{et}\ AB = 2\,O\Omega", font_size=30,
        )
        self.ecrit(but)
        self.legende(
            "On EXPLOITE le rapport (b−a)/ω trouvé — sans rien",
            "recalculer.",
        )
        self.pose(3.0)

        self.etape("q1c2-sens-rapport")
        vec_ab = Line(a_pos, b_pos, color=COL_PT_B, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        vec_om = Line(origine, omega_pos, color=COL_PT_OMEGA, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        lbl_ab = MathTex(r"\overrightarrow{AB}", font_size=26, color=COL_PT_B).next_to(
            vec_ab.get_center(), UP, buff=0.12
        )
        # Étiquette posée aux 2/3 du vecteur (côté Ω) — pas à son centre,
        # trop proche de l'étiquette « O » collée à l'origine juste
        # au-dessus.
        lbl_om = MathTex(
            r"\overrightarrow{O\Omega}", font_size=26, color=COL_PT_OMEGA
        ).next_to(vec_om.point_from_proportion(0.68), LEFT, buff=0.12)
        self.play(Create(vec_ab), Create(vec_om))
        self.play(FadeIn(lbl_ab), FadeIn(lbl_om))
        self.legende(
            "Que SIGNIFIE le rapport de deux affixes-vecteurs ? DEUX",
            "informations à la fois : son MODULE, le rapport des",
            "longueurs ; son ARGUMENT, l'angle entre les deux vecteurs.",
        )
        self.pose(4.0)

        self.etape("q1c2-module")
        m1 = MathTex(
            r"\left|\dfrac{b-a}{\omega}\right| = |-2i| = 2"
            r" = \dfrac{AB}{O\Omega} \implies AB = 2\,O\Omega",
            font_size=28,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "Le module du rapport vaut 2 : AB est deux fois",
            "plus long que OΩ.",
        )
        self.pose(3.4)

        self.etape("q1c2-argument")
        m2 = MathTex(
            r"\arg\!\left(\dfrac{b-a}{\omega}\right) = \arg(-2i) = -\dfrac{\pi}{2}"
            r" = \big(\overrightarrow{O\Omega},\overrightarrow{AB}\big)",
            font_size=26,
        )
        self.ecrit(m2, buff=0.5)
        direction_ab = (b_pos - a_pos) / np.linalg.norm(b_pos - a_pos)
        aux_ab = DashedLine(
            omega_pos, omega_pos + direction_ab * 0.9,
            color=BAC_INK_MUTED, stroke_width=2,
        )
        self.play(Create(aux_ab))
        # Angle NÉGATIF (−π/2, de OΩ vers AB) : l'ordre des opérandes est
        # inversé (destination d'abord) pour obtenir le secteur non réflexe
        # — même règle que la rotation d'angle négatif du sujet frère.
        ang = Angle(
            aux_ab, vec_om, radius=0.45, other_angle=False,
            color=BAC_WARNING, stroke_width=3,
        )
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - omega_pos) / np.linalg.norm(milieu - omega_pos)
        ang_lbl = MathTex(r"\tfrac{\pi}{2}", font_size=24, color=BAC_WARNING).move_to(
            milieu + 0.34 * direction
        )
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Un angle droit en Ω : (AB) et (OΩ) sont PERPENDICULAIRES.",
        )
        self.pose(3.6)

        self.etape("q1c2-conclusion")
        concl = MathTex(
            r"AB = 2\,O\Omega \quad\text{et}\quad (O\Omega)\perp(AB)",
            font_size=34, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        self.encadre(couleur=BAC_SUCCESS)
        self.play(
            vec_ab.animate.set_color(BAC_SUCCESS),
            vec_om.animate.set_color(BAC_SUCCESS),
            run_time=1.0,
        )
        self.legende(
            "Les deux faits demandés, lus sur UN SEUL rapport de",
            "complexes : 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(
            FadeOut(
                VGroup(badge, vec_ab, vec_om, lbl_ab, lbl_om, aux_ab, ang, ang_lbl)
            )
        )

    # ── 2) a) Partie II : H, intersection de (OΩ) et (AB) ────────────
    def chapitre_q2a2(self, plan, a_dot, b_dot, omega_dot):
        badge = self.bandeau_question("2) a)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        a_pos = plan.n2p(A_AFF)
        b_pos = plan.n2p(B_AFF)
        omega_pos = plan.n2p(OMEGA_AFF)

        self.etape("q2a2-enonce")
        txt = Text(
            "La droite (OΩ) coupe (AB) au point H, d'affixe h.", font_size=24,
        )
        self.ecrit(txt)
        but = MathTex(
            r"\text{Montrer que}\ \dfrac{h-a}{b-a}\in\mathbb{R}"
            r"\ \text{et}\ \dfrac{h}{b-a}\in i\mathbb{R}", font_size=26,
        )
        self.ecrit(but, buff=0.5)
        dir_ab = (b_pos - a_pos) / np.linalg.norm(b_pos - a_pos)
        mid_ab = (a_pos + b_pos) / 2
        droite_ab = Line(
            mid_ab - dir_ab * 2.2, mid_ab + dir_ab * 2.2,
            color=COL_PT_B, stroke_width=2.5,
        )
        dir_om = (omega_pos - origine) / np.linalg.norm(omega_pos - origine)
        droite_om = Line(
            origine + dir_om * 2.0, origine - dir_om * 2.0,
            color=COL_PT_OMEGA, stroke_width=2.5,
        )
        self.play(Create(droite_ab), Create(droite_om))
        h_dot = Dot(plan.n2p(H_AFF), color=COL_PT_H, radius=0.08)
        # H est SUR (AB) [horizontale] ET sur (OΩ) [l'axe imaginaire,
        # vertical] : les deux traversent le point. Seul le quadrant
        # bas-droite est libre des deux droites ET des étiquettes de
        # A (haut-droite de A) et de O (bas-gauche de O).
        h_lbl = MathTex("H(h)", font_size=32, color=COL_PT_H).next_to(
            h_dot, DOWN + RIGHT, buff=0.12
        )
        self.play(FadeIn(h_dot, scale=1.6), Write(h_lbl))
        self.legende(
            "H est le point où (OΩ) et (AB) se croisent — un point",
            "unique, puisque les deux droites sont perpendiculaires,",
            "donc jamais parallèles.",
        )
        self.pose(3.8)

        self.etape("q2a2-sens-alignement-AB")
        r1 = MathTex(
            r"H\in(AB) \iff \overrightarrow{AH}\ \text{colinéaire à}"
            r"\ \overrightarrow{AB} \iff \dfrac{h-a}{b-a}\in\mathbb{R}",
            font_size=26,
        )
        self.ecrit(r1, buff=0.5)
        self.legende(
            "H sur (AB) : le vecteur AH est colinéaire à AB — leur",
            "rapport d'affixes est RÉEL (rung R6, déjà vu).",
        )
        self.pose(3.6)

        self.etape("q2a2-sens-alignement-omega")
        r2 = MathTex(r"H\in(O\Omega) \iff \dfrac{h}{\omega}\in\mathbb{R}", font_size=32)
        self.ecrit(r2, buff=0.5)
        self.legende(
            "H sur (OΩ) : O, H, Ω alignés — le rapport h/ω est RÉEL,",
            "lui aussi.",
        )
        self.pose(3.2)

        self.etape("q2a2-inverser")
        r3 = MathTex(
            r"\dfrac{b-a}{\omega}=-2i \implies \dfrac{\omega}{b-a}"
            r" = \dfrac{1}{-2i} = \dfrac{i}{2}", font_size=30,
        )
        self.ecrit(r3, buff=0.5)
        self.legende(
            "On inverse la relation de la question 1 b : un sur",
            "moins 2i, ça fait i sur 2.",
        )
        self.pose(3.4)

        self.etape("q2a2-combiner")
        r4 = MathTex(
            r"\dfrac{h}{b-a} = \dfrac{h}{\omega}\times\dfrac{\omega}{b-a}"
            r" = \underbrace{\dfrac{h}{\omega}}_{\in\,\mathbb{R}}\times\dfrac{i}{2}"
            r"\ \in\ i\mathbb{R}", font_size=26, color=BAC_SUCCESS,
        )
        self.ecrit(r4, buff=0.55)
        self.encadre(couleur=BAC_SUCCESS)
        self.legende(
            "RÉEL fois (i/2) : le produit est un IMAGINAIRE PUR.",
            "0,5 point — les deux rapports ont la nature annoncée.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, droite_ab, droite_om)))
        return h_dot, h_lbl

    # ── 2) b) Partie II : h en fonction de m ─────────────────────────
    def chapitre_q2b2(self, plan, h_dot):
        badge = self.bandeau_question("2) b)", "0,25 pt")
        self.ardoise()

        self.etape("q2b2-enonce")
        but = MathTex(r"\text{En déduire}\ h\ \text{en fonction de}\ m", font_size=36)
        self.ecrit(but)
        self.legende(
            "On combine les deux rapports de la question précédente",
            "pour isoler h.",
        )
        self.pose(2.8)

        self.etape("q2b2-outil-difference")
        outil = MathTex(
            r"\dfrac{h}{b-a} - \dfrac{h-a}{b-a} = \dfrac{a}{b-a}", font_size=32,
        )
        self.ecrit(outil, buff=0.5)
        self.legende(
            "L'astuce : on SOUSTRAIT les deux rapports de la question",
            "2 a. h disparaît, il ne reste que a sur (b − a).",
        )
        self.pose(3.6)

        self.etape("q2b2-simplifier-a-sur-b-a")
        s1 = MathTex(
            r"\dfrac{a}{b-a} = \dfrac{1+i}{(1+i)(m-1)} = \dfrac{1}{m-1}",
            font_size=32,
        )
        self.ecrit(s1, buff=0.5)
        self.legende("Le facteur (1+i) se simplifie, haut et bas.")
        self.pose(2.8)

        self.etape("q2b2-identifier")
        s2 = MathTex(
            r"\dfrac{h-a}{b-a}=t\in\mathbb{R}, \quad \dfrac{h}{b-a}=is\ (s\in\mathbb{R})",
            font_size=26, color=BAC_INK_SOFT,
        )
        self.ecrit(s2, buff=0.5)
        s3 = MathTex(
            r"\dfrac{1}{m-1} = is - t \implies s = \operatorname{Im}\dfrac{1}{m-1}",
            font_size=30,
        )
        self.ecrit(s3, buff=0.4)
        self.legende(
            "t, le réel de tout à l'heure ; s, le réel caché dans is.",
            "En identifiant : s est la partie imaginaire de 1/(m−1).",
        )
        self.pose(3.8)

        self.etape("q2b2-lambda")
        s4 = MathTex(
            r"h=\lambda\,\omega\ (\lambda\in\mathbb{R})"
            r" \implies \lambda = 2\operatorname{Im}\dfrac{1}{m-1}", font_size=30,
        )
        self.ecrit(s4, buff=0.5)
        self.legende(
            "H est sur (OΩ) : h est un multiple RÉEL de ω. On retrouve",
            "λ à partir de s.",
        )
        self.pose(3.4)

        self.etape("q2b2-conclusion")
        concl = MathTex(
            r"h = \operatorname{Im}\!\left(\dfrac{1}{m-1}\right)(1-i)(1-m)",
            font_size=32, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        self.encadre(couleur=BAC_SUCCESS)
        self.legende(
            "0,25 point — h en fonction de m, valable pour n'importe",
            "quel m non réel.",
        )
        self.pose(3.6)

        self.etape("q2b2-controle")
        verif = MathTex(
            r"m=i\ :\ \dfrac{1}{m-1}=\dfrac{1}{i-1}=-\dfrac12-\dfrac12 i"
            r"\implies \operatorname{Im}\dfrac{1}{m-1}=-\dfrac12", font_size=24,
        )
        self.ecrit(verif, buff=0.6)
        verif2 = MathTex(
            r"h = -\dfrac12\,(1-i)(1-i) = -\dfrac12\,(-2i) = i",
            font_size=28, color=BAC_SUCCESS,
        )
        self.ecrit(verif2, buff=0.4)
        cadre_h = self.entoure(h_dot, BAC_WARNING, buff=0.16)
        self.legende(
            "Contrôle avec notre exemple m = i : la formule générale",
            "redonne h = i — EXACTEMENT le point H tracé sur la figure.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.play(*[FadeOut(mob) for mob in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• (1+i)² = 2i : le geste qui débloque les discriminants complexes.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Δ déjà un carré parfait : sa racine se relit, pas besoin de la chercher.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• e^{iθ}+1 : factoriser par l'angle moitié fait apparaître 2cos(θ/2).",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Rotation de centre O, angle θ : on MULTIPLIE l'affixe par e^{iθ}.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Milieu de [MN] : l'affixe est la MOYENNE des deux affixes.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Rapport d'affixes-vecteurs : module = longueurs, argument = angle (R6).",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Alignement ⟺ rapport d'affixes réel — utilisé deux fois pour trouver H.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("3,5 points — sujet réel, m reste un paramètre du début à la fin.",
                 font_size=21, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
