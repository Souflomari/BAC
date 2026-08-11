"""BacScene — classe de base des explications animées.

Fond crème du site, encre par défaut, carte-titre et badges standard.
Le rythme est délibérément calme : chaque chapitre se termine par un
temps mort (`self.pose()`), point de chapitre naturel pour le futur
lecteur web (arrêts par question) et pour la narration E3.
"""

from manim import (
    Arrow,
    Scene,
    SurroundingRectangle,
    VGroup,
    Text,
    RoundedRectangle,
    Create,
    FadeIn,
    FadeOut,
    Write,
    DOWN,
    UP,
    LEFT,
    RIGHT,
)

from bac_style import (
    BAC_BG,
    BAC_SURFACE_RAISED,
    BAC_BORDER_SOFT,
    BAC_INK,
    BAC_INK_SOFT,
    BAC_ACCENT,
    apply_defaults,
)


class BacScene(Scene):
    """Fond + défauts du site ; aides communes aux explications.

    Standard v2 (règle du zéro implicite) : chaque geste = une étape
    (`etape()`) rendue comme section Manim → un clip par clic dans le
    futur lecteur ; une légende parlée (`legende()`) accompagne chaque
    étape en bas d'écran.
    """

    def setup(self):
        apply_defaults()
        self.camera.background_color = BAC_BG
        self._num_etape = 0
        self._badge_etape = None
        self._legende = None

    # ── Aides ──────────────────────────────────────────────────────

    # Multiplicateur global du rythme (verdict owner : « beaucoup plus
    # lent »). 1.0 = les durées écrites dans les scènes ; monter pour
    # ralentir tout un rendu sans retoucher les scènes.
    TEMPO = 1.35

    def pose(self, t: float = 2.4):
        """Temps mort — rythme calme, point d'arrêt du lecteur."""
        self.wait(t * self.TEMPO)

    def etape(self, nom: str):
        """Nouvelle étape : section Manim + compteur discret en haut à droite."""
        self._num_etape += 1
        self.next_section(f"{self._num_etape:02d}-{nom}")
        badge = Text(f"Étape {self._num_etape}", font_size=20, color=BAC_INK_SOFT)
        badge.to_edge(UP, buff=0.32).to_edge(RIGHT, buff=0.55)
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
        self.add(badge)
        self._badge_etape = badge

    def legende(self, *lignes: str, t: float = 0.7):
        """Légende parlée en bas d'écran (registre oral, phrases courtes)."""
        texte = Text(
            "\n".join(lignes),
            font_size=26,
            color=BAC_INK_SOFT,
            line_spacing=0.9,
        ).to_edge(DOWN, buff=0.35)
        anims = [FadeIn(texte, shift=0.15 * UP)]
        if self._legende is not None:
            anims.append(FadeOut(self._legende))
        self.play(*anims, run_time=t)
        self._legende = texte

    def efface_legende(self):
        if self._legende is not None:
            self.play(FadeOut(self._legende), run_time=0.4)
            self._legende = None

    # ── L'ardoise : la colonne de travail gérée (DESIGN.md §1) ─────
    # Ce qui est consommé s'efface avant que la suite n'arrive ; rien
    # ne descend jamais dans la bande légende (y < ARDOISE_BAS).

    # Le bas de l'ardoise réserve TOUTE la hauteur d'une légende de
    # trois lignes + une marge — plus aucun calcul ne peut la toucher.
    ARDOISE_HAUT = 2.55
    ARDOISE_BAS = -1.95

    def epingle(self, groupe):
        """Déclare une carte de référence épinglée en haut de la colonne.
        L'ardoise démarre DESSOUS — plus jamais d'écriture par-dessus."""
        self._carte_ref = groupe

    def _haut_ardoise(self) -> float:
        carte = getattr(self, "_carte_ref", None)
        if carte is not None:
            return min(self.ARDOISE_HAUT, carte.get_bottom()[1] - 0.4)
        return self.ARDOISE_HAUT

    def ardoise(self, gauche_buff: float = 0.65):
        """(Ré)initialise la colonne de travail du chapitre."""
        self._lignes = []
        self._ard_buff = gauche_buff

    def _pose_en_haut(self, m):
        m.to_edge(LEFT, buff=self._ard_buff)
        m.shift((self._haut_ardoise() - m.get_top()[1]) * UP)

    # Largeur maximale d'une ligne de la colonne de travail : au-delà,
    # elle mordrait la région figure (x ≳ −0,45). Les lignes trop longues
    # sont réduites d'office — le débordement horizontal a été le défaut
    # le plus fréquent des premiers audits.
    LARGEUR_MAX = 6.0

    def ecrit(self, m, buff: float = 0.45, run_time: float = 1.2):
        """Écrit une ligne sous la précédente ; auto-nettoie si ça déborde."""
        if m.width > self.LARGEUR_MAX:
            m.scale_to_fit_width(self.LARGEUR_MAX)
        if getattr(self, "_lignes", None):
            m.next_to(self._lignes[-1], DOWN, aligned_edge=LEFT, buff=buff)
        else:
            self._lignes = getattr(self, "_lignes", [])
            self._pose_en_haut(m)
        if m.get_bottom()[1] < self.ARDOISE_BAS:
            self.nettoie(garder=1)
            if self._lignes:
                m.next_to(self._lignes[-1], DOWN, aligned_edge=LEFT, buff=buff)
            else:
                self._pose_en_haut(m)
        self.play(Write(m), run_time=run_time)
        self._lignes.append(m)
        return m

    def nettoie(self, garder: int = 0):
        """Efface les lignes consommées ; remonte celles qu'on garde."""
        lignes = getattr(self, "_lignes", [])
        if not lignes:
            return
        consommees = lignes[: len(lignes) - garder] if garder else lignes[:]
        gardees = lignes[len(lignes) - garder:] if garder else []
        if consommees:
            self.play(*[FadeOut(m) for m in consommees], run_time=0.6)
        if gardees:
            dy = self._haut_ardoise() - gardees[0].get_top()[1]
            if abs(dy) > 0.05:
                self.play(*[m.animate.shift(dy * UP) for m in gardees], run_time=0.7)
        self._lignes = gardees

    # ── Signaling (DESIGN.md §2) : entourer + relier par une flèche ─

    def entoure(self, cible, couleur, buff: float = 0.08):
        """Entoure un morceau de formule (l'exemple owner : a, b, c)."""
        cadre = SurroundingRectangle(
            cible, color=couleur, buff=buff, corner_radius=0.12, stroke_width=2.5
        )
        self.play(Create(cadre), run_time=0.7)
        return cadre

    def fleche_vers(self, source, cible, couleur):
        """Flèche de signaling entre un morceau entouré et sa valeur."""
        fl = Arrow(
            source.get_bottom(),
            cible.get_top(),
            buff=0.12,
            color=couleur,
            stroke_width=3,
            max_tip_length_to_length_ratio=0.18,
        )
        self.play(Create(fl), run_time=0.7)
        return fl

    def carte_titre(self, sur_titre: str, titre: str, sous_titre: str):
        """Carte d'ouverture : provenance réelle de l'épreuve."""
        eyebrow = Text(sur_titre, font_size=26, color=BAC_ACCENT, weight="BOLD")
        main = Text(titre, font_size=44, color=BAC_INK)
        sub = Text(sous_titre, font_size=26, color=BAC_INK_SOFT)
        bloc = VGroup(eyebrow, main, sub).arrange(DOWN, buff=0.45)
        carte = RoundedRectangle(
            corner_radius=0.18,
            width=bloc.width + 1.6,
            height=bloc.height + 1.2,
            fill_color=BAC_SURFACE_RAISED,
            fill_opacity=1.0,
            stroke_color=BAC_BORDER_SOFT,
            stroke_width=2,
        )
        carte.move_to(bloc)
        self.play(FadeIn(carte), Write(eyebrow), run_time=1.0)
        self.play(Write(main), run_time=1.2)
        self.play(FadeIn(sub, shift=0.2 * UP), run_time=0.8)
        self.pose(2.2)
        self.play(FadeOut(VGroup(carte, bloc)), run_time=0.7)

    def bandeau_question(self, numero: str, bareme: str):
        """Bandeau discret en haut : « 1) — 0,75 pt »."""
        badge = Text(f"{numero} — {bareme}", font_size=24, color=BAC_INK_SOFT)
        badge.to_edge(UP, buff=0.35).to_edge(LEFT, buff=0.6)
        self.play(FadeIn(badge, shift=0.15 * DOWN), run_time=0.5)
        return badge
