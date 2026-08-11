"""BacScene — classe de base des explications animées.

Fond crème du site, encre par défaut, carte-titre et badges standard.
Le rythme est délibérément calme : chaque chapitre se termine par un
temps mort (`self.pose()`), point de chapitre naturel pour le futur
lecteur web (arrêts par question) et pour la narration E3.
"""

from manim import (
    Scene,
    VGroup,
    Text,
    RoundedRectangle,
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
    """Fond + défauts du site ; aides communes aux explications."""

    def setup(self):
        apply_defaults()
        self.camera.background_color = BAC_BG

    # ── Aides ──────────────────────────────────────────────────────

    def pose(self, t: float = 1.6):
        """Temps mort de fin de chapitre (rythme calme, arrêt lecteur)."""
        self.wait(t)

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
