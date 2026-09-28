"""Explication animée v4 — Bac 2024 SN (SExp), Exercice 1 : suites numériques.

Source de vérité : content/maths/suites-numeriques/bank.yaml, entrée
bk-2024-n-x1 (vérifiée, AlloSchool NS22F, element/144505, Exercice 1,
3 points). Suite homographique définie par récurrence :

    u_0 = 4,   u_{n+1} = (4u_n - 2)/(1 + u_n)   pour tout n de N.

Sept questions : 1a) vérifier que u_{n+1} = 4 - 6/(1+u_n) (0,25 pt) ;
1b) montrer par récurrence que 2 <= u_n <= 4 (0,5 pt) ; 2a) montrer que
u_{n+1} - u_n = (u_n-1)(2-u_n)/(1+u_n) (0,25 pt) ; 2b) montrer que (u_n)
est décroissante et en déduire qu'elle converge, par le théorème de la
limite monotone (0,5 pt) ; 3a) montrer que v_n = (2-u_n)/(1-u_n) est
géométrique de raison 2/3 (0,5 pt) ; 3b) montrer que u_n = 1 + 1/(1 -
(2/3)^{n+1}) (0,5 pt) ; 3c) calculer lim u_n = 2, cohérente avec la
convergence déjà garantie à la question 2b (0,5 pt). Total : 3 points.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape), couche de sens AVANT chaque calcul — une droite
graduée où les termes u_n marchent en points colorés, DEUX barrières
verticales en pointillés pour l'encadrement [2 ; 4] établi à la question
1b, celle du bas (2) devenant, à la question 3c, le marqueur de la
limite ; une droite graduée séparée pour la suite auxiliaire géométrique
v_n, avec ses sauts « ×2/3 ». Signaling dans la formule, zones d'écran
dures, carte de référence épinglée (u0 et la relation de récurrence).
Quatre pièges classiques du bac reçoivent chacun leur étape rouge
dédiée : la récurrence exige TOUJOURS initialisation ET
hérédité (question 1b) ; le sens de variation se justifie par un signe,
jamais « à l'œil » (question 2b) ; dans v_n = v_0 × q^n, ne pas confondre
le premier terme v_0 (= 2/3 ici) et la raison q (= 2/3 aussi, par pure
coïncidence numérique) (question 3b) ; une suite géométrique de raison q
ne tend vers 0 que si |q| < 1, condition à énoncer (question 3c).

Voir la SCOPE NOTE en tête de bank.yaml : la suite auxiliaire v_n =
(2-u_n)/(1-u_n) (question 3a) est la technique dite « de la suite
homographique », au-delà de ce que R8 enseigne formellement (R8
n'enseigne que v_n = u_n - L).

Rendu : ../../render.sh scenes/maths/suites-numeriques/bk-2024-n-x1.py
"""

import sys
from pathlib import Path
from fractions import Fraction as F

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

from manim import (
    Arrow,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    MathTex,
    NumberLine,
    ReplacementTransform,
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
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Identité visuelle stable (DESIGN.md §2) : u_n = objet nº1 (sarcelle),
# v_n (suite auxiliaire, question 3) = objet nº2 (or), les deux barrières
# de l'encadrement = outil du cours (sarcelle clair), la limite = vert
# (conclusion), un piège = toujours rouge, réservé à ça.
COL_U = BAC_ACCENT
COL_BOUND = BAC_ACCENT_LIGHT
COL_LIM = BAC_SUCCESS
COL_V = BAC_WARNING

# ── Valeurs exactes (fractions), citées de la banque vérifiée ──────────
U0 = F(4)


def _suivant(u: F) -> F:
    """u_{n+1} = (4u_n - 2)/(1 + u_n) — la relation de récurrence donnée."""
    return (4 * u - 2) / (1 + u)


# u_1..u_4 : AUCUN n'est demandé numériquement par la banque (la question
# 1a est une réécriture symbolique, pas un calcul de u_1) — calculés ici,
# par la MÊME relation de récurrence vérifiée, uniquement pour FAIRE VOIR
# la suite avancer sur la droite graduée, au-delà de ce que l'énoncé
# demande.
U1 = _suivant(U0)  # = 14/5 = 2,8
U2 = _suivant(U1)  # = 46/19 ≈ 2,42
U3 = _suivant(U2)  # = 146/65 ≈ 2,25 (illustration seule)
U4 = _suivant(U3)  # = 454/211 ≈ 2,15 (illustration seule)
assert (U0, U1) == (F(4), F(14, 5))

BOUND_MIN = F(2)  # minorant établi en q1b — devient le marqueur de limite en q3c
BOUND_MAJ = F(4)  # majorant établi en q1b — coïncide avec u0


def _v(u: F) -> F:
    """v_n = (2-u_n)/(1-u_n) — question 3a."""
    return (2 - u) / (1 - u)


# v_0 EST demandé (question 3b) ; v_1, v_2 sont calculés ici, au-delà de
# l'énoncé, pour la couche de sens (question 3a).
V0 = _v(U0)  # = 2/3
V1 = _v(U1)  # = 4/9
V2 = _v(U2)  # = 8/27
assert V0 == F(2, 3)

# ── Disposition de la figure (région droite, DESIGN.md §1) ──────────
# Chaque droite est positionnée en alignant un point n2p(valeur) DE
# RÉFÉRENCE sur un point-cible de la scène — robuste, indépendant de la
# convention de centrage par défaut de NumberLine.
LINE_U_ANCHOR_VAL = 2.0   # la droite de (u_n) est ancrée sur le minorant
LINE_U_ANCHOR_X = 1.3
LINE_U_Y = 1.15
LINE_V_ANCHOR_VAL = 0.0   # la droite de (v_n) est ancrée sur 0
LINE_V_ANCHOR_X = 1.6
LINE_V_Y = -1.05
DOT_R = 0.075


def _pose_ligne(ligne, valeur: float, x: float, y: float):
    """Aligne le point n2p(valeur) de la droite sur (x, y) — indépendant
    de la position initiale de construction de la NumberLine."""
    ligne.shift((x * RIGHT + y * UP) - ligne.n2p(valeur))
    return ligne


NARRATION = {
    "titre": "Exercice un du bac deux mille vingt-quatre, session "
    "normale, sciences expérimentales : suites numériques, sur trois "
    "points.",
    "intro": "On considère la suite u, définie par u zéro égale quatre, "
    "et par la relation de récurrence u indice n plus un égale quatre u "
    "n moins deux, sur un plus u n, pour tout n.",
    "plan": "Avant tout calcul, on regarde où vivent les premiers termes "
    "sur une droite graduée : u zéro, u un, u deux — un point par terme. "
    "On les voit décroître vers deux.",
    "q1a": "Question un a. On vérifie une réécriture de la relation de "
    "récurrence, sous une forme qui va isoler le terme variable.",
    "q1b": "Question un b. On montre par récurrence que u n reste "
    "toujours entre deux et quatre : la droite gagne ses deux premières "
    "barrières.",
    "q2a": "Question deux a. On calcule le pas de la suite, u n plus un "
    "moins u n, et on le factorise.",
    "q2b": "Question deux b. On signe ce pas pour montrer que la suite "
    "est décroissante, puis on conclut, par le théorème de la limite "
    "monotone, qu'elle converge.",
    "q3a": "Question trois a. On introduit une suite auxiliaire, v n, "
    "égale à deux moins u n sur un moins u n, et on montre qu'elle est "
    "géométrique de raison deux tiers.",
    "q3b": "Question trois b. On détermine v n en fonction de n, puis on "
    "en déduit u n en fonction de n, par inversion algébrique.",
    "q3c": "Question trois c. On calcule la limite de u n à partir de sa "
    "formule explicite, et on retrouve la valeur deux — cohérente avec "
    "la convergence déjà garantie à la question deux b.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        ligne_u, u_dots = self.chapitre_plan()
        self.chapitre_q1a()
        barrieres = self.chapitre_q1b(ligne_u)
        self.chapitre_q2a()
        self.chapitre_q2b(ligne_u, u_dots)
        ligne_v, v_dots = self.chapitre_q3a(ligne_u)
        self.chapitre_q3b(v_dots)
        self.chapitre_q3c(ligne_u, barrieres)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2024 · SESSION NORMALE · SCIENCES EXP.",
            "Suites numériques",
            "Exercice 1 — 3 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé : u0 et la récurrence ────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère la suite numérique (u_n) définie par :",
            font_size=27,
        ).shift(2.3 * UP)
        def0 = MathTex(r"u_0 = 4", font_size=40, color=COL_U)
        rec_def = MathTex(
            r"u_{n+1} = \dfrac{4u_n-2}{1+u_n} \quad \text{pour tout } n \text{ de } \mathbb{N}",
            font_size=34, color=COL_U,
        )
        bloc = VGroup(def0, rec_def).arrange(DOWN, buff=0.5).next_to(
            entete, DOWN, buff=0.7
        )
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(bloc, shift=0.2 * UP), run_time=1.4)
        self.legende(
            "Un premier terme, et une règle pour passer d'un terme au",
            "suivant — on les retrouve à CHAQUE question.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(entete))
        self.play(
            bloc.animate.scale(0.62).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        )
        self.epingle(bloc)
        return bloc

    # ── La couche de sens : les premiers termes, AVANT d'être prouvés ──
    def chapitre_plan(self):
        self.etape("plan-ligne")
        ligne = NumberLine(
            x_range=[1.8, 4.6, 0.4],
            length=5.7,
            color=BAC_INK_MUTED,
            include_numbers=False,
            include_tip=False,
            stroke_width=2,
        )
        _pose_ligne(ligne, LINE_U_ANCHOR_VAL, LINE_U_ANCHOR_X, LINE_U_Y)
        ligne.add_numbers([2, 3, 4], font_size=18, color=BAC_INK_MUTED)
        self.play(Create(ligne), FadeIn(ligne.numbers), run_time=1.8)
        self.legende(
            "On place les premiers termes sur une droite graduée — un",
            "point par terme. On regarde d'abord où ils vivent.",
        )
        self.pose(3.0)

        self.etape("plan-u0")
        u0_dot = Dot(ligne.n2p(float(U0)), color=COL_U, radius=DOT_R)
        u0_lbl = MathTex("u_0", font_size=28, color=COL_U).next_to(
            u0_dot, DOWN, buff=0.28
        )
        self.play(FadeIn(u0_dot, scale=1.6), Write(u0_lbl))
        self.legende("u0 = 4 : le point de départ, tout en haut de l'intervalle.")
        self.pose(2.6)

        self.etape("plan-u1")
        u1_dot = Dot(ligne.n2p(float(U1)), color=COL_U, radius=DOT_R)
        u1_lbl = MathTex("u_1", font_size=28, color=COL_U).next_to(
            u1_dot, DOWN, buff=0.28
        )
        self.play(FadeIn(u1_dot, scale=1.6), Write(u1_lbl))
        self.legende(
            "u1 : déjà plus proche de deux — calculé au-delà de",
            "l'énoncé, juste pour voir la suite avancer.",
        )
        self.pose(3.2)

        self.etape("plan-u2")
        u2_dot = Dot(ligne.n2p(float(U2)), color=COL_U, radius=DOT_R)
        u2_lbl = MathTex("u_2", font_size=28, color=COL_U).next_to(
            u2_dot, DOWN, buff=0.28
        )
        self.play(FadeIn(u2_dot, scale=1.6), Write(u2_lbl))
        self.legende(
            "u2 : un pas de plus, toujours au-delà de l'énoncé — les",
            "points DÉCROISSENT vers deux. On va le démontrer, pas",
            "seulement le voir.",
        )
        self.pose(3.6)
        self.efface_legende()

        return ligne, {"u0": u0_dot, "u1": u1_dot, "u2": u2_dot}

    # ── Q1a : vérifier une réécriture ─────────────────────────────────
    def chapitre_q1a(self):
        badge = self.bandeau_question("1) a)", "0,25 pt")
        self.ardoise()

        self.etape("q1a-enonce")
        but = MathTex(
            r"\text{Vérifier que } u_{n+1} = 4 - \dfrac{6}{1+u_n}",
            font_size=34,
        )
        self.ecrit(but)
        self.legende(
            "Une vérification : on réécrit u n plus un sous une autre",
            "forme, équivalente à la définition.",
        )
        self.pose(2.8)

        self.etape("q1a-meme-denominateur")
        m1 = MathTex(
            r"4-\dfrac{6}{1+u_n} = \dfrac{4(1+u_n)-6}{1+u_n} = \dfrac{4+4u_n-6}{1+u_n}",
            font_size=24,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "On met les deux termes du membre de droite au même",
            "dénominateur, un plus u n.",
        )
        self.pose(3.2)

        self.etape("q1a-simplifier")
        m2 = MathTex(
            r"4-\dfrac{6}{1+u_n} = \dfrac{4u_n-2}{1+u_n} = u_{n+1}",
            font_size=28, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On simplifie le numérateur (quatre moins six égale moins",
            "deux) : on retrouve exactement u n plus un. 0,25 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q1b : encadrement 2 <= u_n <= 4 par récurrence ─────────────────
    def chapitre_q1b(self, ligne_u):
        badge = self.bandeau_question("1) b)", "0,5 pt")
        self.ardoise()

        self.etape("q1b-enonce")
        but = MathTex(
            r"\text{Montrer par récurrence que } 2 \le u_n \le 4",
            font_size=34,
        )
        self.ecrit(but)
        self.legende(
            "Une propriété vraie pour TOUS les rangs : le bon outil",
            "est le raisonnement par récurrence.",
        )
        self.pose(3.2)

        self.etape("q1b-piege-recurrence")
        piege = VGroup(
            Text("ATTENTION : une récurrence exige DEUX étapes,",
                 font_size=19, color=BAC_ERROR),
            Text("jamais une seule — l'INITIALISATION (le rang 0)",
                 font_size=19, color=BAC_ERROR),
            Text("ET l'HÉRÉDITÉ (le passage de n à n+1).",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique du bac : oublier l'une des deux",
            "étapes invalide toute la récurrence.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q1b-sens-encadrement")
        base_min = ligne_u.n2p(float(BOUND_MIN))
        base_maj = ligne_u.n2p(float(BOUND_MAJ))
        barre_min = DashedLine(
            base_min + 0.5 * DOWN, base_min + 1.3 * UP,
            color=COL_BOUND, stroke_width=2.5, dash_length=0.12,
        )
        lbl_min = MathTex(
            r"2\ (\text{minorant})", font_size=22, color=COL_BOUND
        ).next_to(barre_min.get_top(), UP, buff=0.12)
        barre_maj = DashedLine(
            base_maj + 0.5 * DOWN, base_maj + 1.3 * UP,
            color=COL_BOUND, stroke_width=2.5, dash_length=0.12,
        )
        lbl_maj = MathTex(
            r"4\ (\text{majorant})", font_size=22, color=COL_BOUND
        ).next_to(barre_maj.get_top(), UP, buff=0.12)
        self.play(Create(barre_min, run_time=1.2), FadeIn(lbl_min))
        self.play(Create(barre_maj, run_time=1.2), FadeIn(lbl_maj))
        self.legende(
            "Deux barrières : u n ne descend jamais sous deux, et ne",
            "dépasse jamais quatre — exactement ce qu'on va démontrer.",
        )
        self.pose(3.6)

        self.etape("q1b-initialisation")
        m1 = MathTex(r"u_0 = 4, \quad 2\le 4\le 4", font_size=32)
        self.ecrit(m1)
        self.legende("Initialisation : vrai au rang 0.")
        self.pose(2.6)

        self.etape("q1b-hypothese-denominateur")
        m2 = MathTex(
            r"2\le u_n\le 4 \implies 3\le 1+u_n\le 5 \implies"
            r" \dfrac{6}{5}\le\dfrac{6}{1+u_n}\le\dfrac{6}{3}=2",
            font_size=21,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Hypothèse de récurrence : on encadre le dénominateur,",
            "puis son inverse — une fonction DÉCROISSANTE sur les",
            "positifs.",
        )
        self.pose(3.8)

        self.etape("q1b-soustraire-a-4")
        m3 = MathTex(
            r"\dfrac{6}{5}\le\dfrac{6}{1+u_n}\le 2 \implies"
            r" 4-2\le 4-\dfrac{6}{1+u_n}\le 4-\dfrac{6}{5}",
            font_size=23,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On soustrait à quatre : l'encadrement s'inverse encore,",
            "car soustraire est une opération décroissante.",
        )
        self.pose(3.4)

        self.etape("q1b-conclusion")
        m4 = MathTex(
            r"2\le u_{n+1}\le\dfrac{14}{5}\le 4",
            font_size=32, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m4, buff=0.55)
        self.legende(
            "u n plus un reste dans [2 ; 4]. Par récurrence,",
            "l'encadrement tient pour tout n. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return {
            "min_ligne": barre_min, "min_label": lbl_min,
            "maj_ligne": barre_maj, "maj_label": lbl_maj,
        }

    # ── Q2a : le signe du pas, factorisé ──────────────────────────────
    def chapitre_q2a(self):
        badge = self.bandeau_question("2) a)", "0,25 pt")
        self.ardoise()

        self.etape("q2a-enonce")
        but = MathTex(
            r"\text{Montrer que } u_{n+1}-u_n = \dfrac{(u_n-1)(2-u_n)}{1+u_n}",
            font_size=27,
        )
        self.ecrit(but)
        self.legende(
            "On étudie le PAS de la suite, u n plus un moins u n, pour",
            "connaître son sens de variation.",
        )
        self.pose(3.2)

        self.etape("q2a-meme-denominateur")
        m1 = MathTex(
            r"u_{n+1}-u_n = \dfrac{4u_n-2}{1+u_n} - u_n"
            r" = \dfrac{4u_n-2-u_n(1+u_n)}{1+u_n}",
            font_size=22,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On met les deux termes au même dénominateur, un plus u n.")
        self.pose(3.2)

        self.etape("q2a-developper")
        m2 = MathTex(
            r"4u_n-2-u_n(1+u_n) = 4u_n-2-u_n-u_n^2 = -u_n^2+3u_n-2",
            font_size=23,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("On développe et on réduit le numérateur.")
        self.pose(3.0)

        self.etape("q2a-factoriser")
        m3 = MathTex(
            r"-u_n^2+3u_n-2 = -(u_n-1)(u_n-2) = (u_n-1)(2-u_n)",
            font_size=24,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On factorise le trinôme (racines un et deux), puis on",
            "change un signe pour retrouver la forme demandée.",
        )
        self.pose(3.6)

        self.etape("q2a-conclusion")
        m4 = MathTex(
            r"u_{n+1}-u_n = \dfrac{(u_n-1)(2-u_n)}{1+u_n}",
            font_size=32, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m4, buff=0.55)
        self.legende("L'égalité est vérifiée. 0,25 point.")
        self.pose(3.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q2b : décroissance, puis convergence ──────────────────────────
    def chapitre_q2b(self, ligne_u, u_dots):
        badge = self.bandeau_question("2) b)", "0,5 pt")
        self.ardoise()

        self.etape("q2b-enonce")
        but1 = MathTex(
            r"\text{Montrer que } (u_n) \text{ est décroissante,}", font_size=30
        )
        but2 = MathTex(
            r"\text{en déduire que } (u_n) \text{ est convergente}", font_size=30
        )
        self.ecrit(but1)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "Deux gestes : signer le pas u n plus un moins u n, puis",
            "conclure avec le théorème de la limite monotone.",
        )
        self.pose(3.6)

        self.etape("q2b-sens-decroissance")
        fleche = Arrow(
            u_dots["u0"].get_center() + 0.32 * UP,
            u_dots["u1"].get_center() + 0.32 * UP,
            buff=0.12, color=COL_U, stroke_width=3,
            max_tip_length_to_length_ratio=0.2,
        )
        self.play(Create(fleche), run_time=1.2)
        self.legende(
            "On le VOIT déjà : u1 est plus proche de deux que u0.",
            "Vérifions-le pour TOUS les rangs, avec un signe.",
        )
        self.pose(3.4)

        self.etape("q2b-signer-facteurs")
        m1 = MathTex(
            r"2\le u_n\le 4 \implies u_n-1\ge 1>0, \quad 2-u_n\le 0,"
            r" \quad 1+u_n\ge 3>0",
            font_size=19,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "On signe les trois facteurs sur l'intervalle [2 ; 4],",
            "établi à la question un b.",
        )
        self.pose(3.6)

        self.etape("q2b-signe-du-pas")
        m2 = MathTex(
            r"u_{n+1}-u_n = \dfrac{(u_n-1)(2-u_n)}{1+u_n} \le 0",
            font_size=30,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Facteur positif fois facteur négatif ou nul, divisé par",
            "un facteur positif : le résultat est négatif ou nul.",
        )
        self.pose(3.6)

        self.etape("q2b-piege-monotonie")
        piege = VGroup(
            Text("ATTENTION : le sens de variation se JUSTIFIE",
                 font_size=19, color=BAC_ERROR),
            Text("toujours par un signe ou un quotient — jamais en",
                 font_size=19, color=BAC_ERROR),
            Text("regardant si les valeurs « semblent » diminuer.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : décroissante ne se devine pas à",
            "l'œil, elle se prouve avec un SIGNE.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q2b-conclusion")
        concl = MathTex(
            r"(u_n) \text{ décroissante et minorée par } 2"
            r" \implies (u_n) \text{ converge}",
            font_size=22, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "Décroissante (étape précédente) et minorée par deux",
            "(question un b) : le théorème de la limite monotone",
            "garantit la convergence. 0,5 point.",
        )
        self.pose(4.0)

        self.etape("q2b-confirmation")
        self.play(FadeOut(fleche))
        u3_dot = Dot(ligne_u.n2p(float(U3)), color=COL_U, radius=DOT_R * 0.7)
        u4_dot = Dot(ligne_u.n2p(float(U4)), color=COL_U, radius=DOT_R * 0.7)
        pts = MathTex(r"\cdots", font_size=24, color=COL_U).next_to(
            u3_dot, DOWN, buff=0.3
        )
        self.play(FadeIn(u3_dot, scale=1.6), FadeIn(u4_dot, scale=1.6), FadeIn(pts))
        self.legende(
            "u3, u4 : encore au-delà de l'énoncé — les termes se",
            "TASSENT contre la barrière des deux. On calculera",
            "EXACTEMENT cette limite à la question trois c.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return {"u3": u3_dot, "u4": u4_dot, "pts": pts}

    # ── Q3a : la suite auxiliaire (v_n), géométrique de raison 2/3 ────
    def chapitre_q3a(self, ligne_u):
        badge = self.bandeau_question("3) a)", "0,5 pt")
        self.ardoise()

        self.etape("q3a-enonce")
        defv = MathTex(
            r"v_n = \dfrac{2-u_n}{1-u_n} \quad (n \in \mathbb{N})",
            font_size=32, color=COL_V,
        )
        but = MathTex(
            r"\text{Montrer que } (v_n) \text{ est géométrique de raison } \dfrac{2}{3}",
            font_size=26,
        )
        self.ecrit(defv)
        self.ecrit(but, buff=0.5)
        self.legende(
            "Une nouvelle suite, construite à partir de u n — un",
            "rapport bien choisi. On regarde d'abord ce qu'elle vaut.",
        )
        self.pose(3.6)

        self.etape("q3a-sens-v")
        ligne_v = NumberLine(
            x_range=[-0.05, 0.8, 0.2],
            length=5.0,
            color=BAC_INK_MUTED,
            include_numbers=False,
            include_tip=False,
            stroke_width=2,
        )
        _pose_ligne(ligne_v, LINE_V_ANCHOR_VAL, LINE_V_ANCHOR_X, LINE_V_Y)
        ligne_v.add_numbers([0, 0.4, 0.8], font_size=18, color=BAC_INK_MUTED, direction=UP)
        self.play(Create(ligne_v), FadeIn(ligne_v.numbers), run_time=1.6)
        v0_dot = Dot(ligne_v.n2p(float(V0)), color=COL_V, radius=DOT_R)
        v0_lbl = MathTex("v_0", font_size=26, color=COL_V).next_to(
            v0_dot, DOWN, buff=0.16
        )
        v1_dot = Dot(ligne_v.n2p(float(V1)), color=COL_V, radius=DOT_R)
        v1_lbl = MathTex("v_1", font_size=26, color=COL_V).next_to(
            v1_dot, DOWN, buff=0.16
        )
        v2_dot = Dot(ligne_v.n2p(float(V2)), color=COL_V, radius=DOT_R)
        v2_lbl = MathTex("v_2", font_size=26, color=COL_V).next_to(
            v2_dot, DOWN, buff=0.16
        )
        self.play(FadeIn(v0_dot, scale=1.6), Write(v0_lbl))
        self.play(FadeIn(v1_dot, scale=1.6), Write(v1_lbl))
        self.play(FadeIn(v2_dot, scale=1.6), Write(v2_lbl))
        f1 = Arrow(
            ligne_v.n2p(float(V0)) + 0.35 * UP, ligne_v.n2p(float(V1)) + 0.35 * UP,
            buff=0.1, color=COL_V, stroke_width=2.5,
            max_tip_length_to_length_ratio=0.15,
        )
        lbl_f1 = MathTex(r"\times\tfrac23", font_size=20, color=COL_V).next_to(
            f1, UP, buff=0.08
        )
        f2 = Arrow(
            ligne_v.n2p(float(V1)) + 0.35 * UP, ligne_v.n2p(float(V2)) + 0.35 * UP,
            buff=0.1, color=COL_V, stroke_width=2.5,
            max_tip_length_to_length_ratio=0.15,
        )
        lbl_f2 = MathTex(r"\times\tfrac23", font_size=20, color=COL_V).next_to(
            f2, UP, buff=0.08
        )
        self.play(Create(f1), FadeIn(lbl_f1))
        self.play(Create(f2), FadeIn(lbl_f2))
        self.legende(
            "v0 = 2/3 (question trois b), v1 et v2 : calculés au-delà",
            "de l'énoncé, juste pour VOIR le même saut, ×2/3, d'un",
            "terme au suivant — on va le PROUVER.",
        )
        self.pose(4.2)

        self.etape("q3a-calc-2moins-u")
        m1a = MathTex(
            r"2-u_{n+1} = 2-\dfrac{4u_n-2}{1+u_n}"
            r" = \dfrac{2(1+u_n)-(4u_n-2)}{1+u_n}",
            font_size=21,
        )
        m1b = MathTex(
            r"= \dfrac{4-2u_n}{1+u_n} = \dfrac{2(2-u_n)}{1+u_n}",
            font_size=21,
        )
        self.ecrit(
            VGroup(m1a, m1b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        self.legende(
            "On calcule deux moins u n plus un, en réduisant au même",
            "dénominateur, un plus u n.",
        )
        self.pose(3.6)

        self.etape("q3a-calc-1moins-u")
        m2a = MathTex(
            r"1-u_{n+1} = 1-\dfrac{4u_n-2}{1+u_n}"
            r" = \dfrac{(1+u_n)-(4u_n-2)}{1+u_n}",
            font_size=21,
        )
        m2b = MathTex(
            r"= \dfrac{3-3u_n}{1+u_n} = \dfrac{3(1-u_n)}{1+u_n}",
            font_size=21,
        )
        self.ecrit(
            VGroup(m2a, m2b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        self.legende("Même démarche pour un moins u n plus un.")
        self.pose(3.2)

        self.etape("q3a-quotient")
        m3 = MathTex(
            r"v_{n+1} = \dfrac{2-u_{n+1}}{1-u_{n+1}}"
            r" = \dfrac{\frac{2(2-u_n)}{1+u_n}}{\frac{3(1-u_n)}{1+u_n}}"
            r" = \dfrac{2(2-u_n)}{3(1-u_n)}",
            font_size=19,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "v n plus un est le quotient des deux : le dénominateur",
            "commun, un plus u n, se simplifie entre haut et bas.",
        )
        self.pose(3.6)

        self.etape("q3a-conclusion")
        m4 = MathTex(
            r"v_{n+1} = \dfrac{2}{3}\times\dfrac{2-u_n}{1-u_n} = \dfrac{2}{3}v_n",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m4, buff=0.55)
        self.legende(
            "On fait réapparaître v n : (v n) est bien géométrique,",
            "de raison deux tiers — le saut vu sur la droite. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return ligne_v, {"v0": v0_dot, "v1": v1_dot, "v2": v2_dot}

    # ── Q3b : terme général de (v_n), puis de (u_n) ───────────────────
    def chapitre_q3b(self, v_dots):
        badge = self.bandeau_question("3) b)", "0,5 pt")
        self.ardoise()

        self.etape("q3b-enonce")
        but = MathTex(
            r"\text{Montrer que } u_n = 1+\dfrac{1}{1-\left(\dfrac{2}{3}\right)^{n+1}}",
            font_size=26,
        )
        self.ecrit(but)
        self.legende(
            "La formule explicite d'une suite géométrique donne v n.",
            "Il reste à inverser sa définition pour isoler u n.",
        )
        self.pose(3.4)

        self.etape("q3b-v0")
        m1 = MathTex(
            r"v_0 = \dfrac{2-u_0}{1-u_0} = \dfrac{2-4}{1-4}"
            r" = \dfrac{-2}{-3} = \dfrac{2}{3}",
            font_size=24,
        )
        self.ecrit(m1, buff=0.55)
        cadre = self.entoure(v_dots["v0"], BAC_ACCENT_STRONG, buff=0.12)
        self.legende(
            "Premier terme de la suite géométrique v — exactement le",
            "point v0 déjà placé sur sa droite.",
        )
        self.pose(3.6)
        self.play(FadeOut(cadre))

        self.etape("q3b-formule-explicite")
        m2 = MathTex(
            r"v_n = v_0\left(\dfrac{2}{3}\right)^n = \left(\dfrac{2}{3}\right)^{n+1}",
            font_size=30,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Formule explicite d'une suite géométrique, avec v0 = deux",
            "tiers : l'exposant se décale à n plus un.",
        )
        self.pose(3.4)

        self.etape("q3b-piege-raison-terme")
        piege = VGroup(
            Text("ATTENTION : v_0 = 2/3 est le PREMIER TERME — il vaut,",
                 font_size=19, color=BAC_ERROR),
            Text("ici, la MÊME valeur que la raison 2/3, par pure",
                 font_size=19, color=BAC_ERROR),
            Text("coïncidence numérique. Les deux rôles restent différents.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : ne pas confondre le premier terme",
            "et la raison — même quand ils partagent la même valeur.",
        )
        self.pose(4.0)
        self.nettoie(garder=1)

        self.etape("q3b-isoler-un")
        m3 = MathTex(
            r"v_n = \dfrac{2-u_n}{1-u_n} \implies v_n(1-u_n) = 2-u_n"
            r" \implies u_n(1-v_n) = 2-v_n",
            font_size=21,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On repart de la définition de v n et on isole les termes",
            "en u n.",
        )
        self.pose(3.6)

        self.etape("q3b-conclusion-un")
        m4a = MathTex(
            r"u_n = \dfrac{2-v_n}{1-v_n} = \dfrac{(1-v_n)+1}{1-v_n}"
            r" = 1+\dfrac{1}{1-v_n}",
            font_size=22, color=COL_LIM,
        )
        m4b = MathTex(
            r"= 1+\dfrac{1}{1-\left(\frac{2}{3}\right)^{n+1}}",
            font_size=22, color=COL_LIM,
        )
        self.ecrit(
            VGroup(m4a, m4b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.55
        )
        self.legende(
            "On écrit deux moins v n comme un moins v n plus un, puis",
            "on remplace v n par sa valeur trouvée. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q3c : la limite, à partir de la formule explicite ─────────────
    def chapitre_q3c(self, ligne_u, barrieres):
        badge = self.bandeau_question("3) c)", "0,5 pt")
        self.ardoise()

        self.etape("q3c-enonce")
        but = MathTex(r"\text{Calculer } \lim_{n\to+\infty} u_n", font_size=36)
        self.ecrit(but)
        self.legende(
            "On dispose maintenant de la formule explicite de u n",
            "(question trois b) — il suffit de passer à la limite.",
        )
        self.pose(3.2)

        self.etape("q3c-piege-raison")
        piege = VGroup(
            Text("ATTENTION : une suite géométrique de raison q ne",
                 font_size=19, color=BAC_ERROR),
            Text("tend vers 0 QUE SI |q| < 1. Ici q = 2/3, donc",
                 font_size=19, color=BAC_ERROR),
            Text("|2/3| < 1 — il faut toujours le VÉRIFIER.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique du bac : il faut ÉCRIRE la condition",
            "|q| < 1, jamais la sous-entendre.",
        )
        self.pose(4.0)
        self.nettoie(garder=1)

        self.etape("q3c-limite-geometrique")
        m1 = MathTex(
            r"\left|\dfrac{2}{3}\right|<1 \implies"
            r" \lim_{n\to+\infty}\left(\dfrac{2}{3}\right)^{n+1} = 0",
            font_size=26,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "Raison entre -1 et 1 — le piège qu'on vient de signaler,",
            "ici vérifié : la suite géométrique tend vers 0.",
        )
        self.pose(3.6)

        self.etape("q3c-limite-denominateur")
        m2 = MathTex(
            r"\lim_{n\to+\infty}\left(1-\left(\dfrac{2}{3}\right)^{n+1}\right) = 1-0 = 1",
            font_size=27,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Opérations sur les limites : le dénominateur tend",
            "vers 1, non nul.",
        )
        self.pose(3.2)

        self.etape("q3c-conclusion")
        m3 = MathTex(
            r"\lim_{n\to+\infty} u_n = 1+\dfrac{1}{1} = 2",
            font_size=38, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Le dénominateur tend vers 1, non nul : on passe à la",
            "limite dans le quotient. lim u_n = 2. 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()

        self.etape("q3c-marker")
        lim_dot = Dot(ligne_u.n2p(2.0), color=COL_LIM, radius=DOT_R * 1.3)
        self.play(FadeIn(lim_dot, scale=1.6))
        nouveau_lbl = MathTex("L=2", font_size=24, color=COL_LIM).move_to(
            barrieres["min_label"]
        )
        self.play(
            ReplacementTransform(barrieres["min_label"], nouveau_lbl),
            barrieres["min_ligne"].animate.set_color(COL_LIM),
        )
        self.legende(
            "Les termes s'accumulent contre la même barrière posée à",
            "la question un b — qui devient ici le marqueur de la",
            "limite. Deux méthodes, même réponse.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(FadeOut(badge))
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Encadrement par récurrence : l'intervalle doit être",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  STABLE — toujours initialisation ET hérédité.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Sens de variation : on signe u_{n+1} − u_n (ou un",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  quotient) — jamais deviné sur quelques valeurs.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Décroissante et minorée ⟹ converge (limite monotone),",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  sans connaître encore la valeur de la limite.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Suite auxiliaire homographique v_n = (2−u_n)/(1−u_n) :",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  ne pas confondre le premier terme et la raison.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Suite géométrique : q^n → 0 SEULEMENT si |q| < 1.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("3 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=21, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.24)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
