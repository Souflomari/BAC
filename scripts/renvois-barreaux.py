#!/usr/bin/env python3
"""
renvois-barreaux.py — remplacer les renvois « R<n> » de la PROSE par un
référent que l'élève voit réellement : le numéro de chapitre.

LE PROBLÈME. Un « R3 » désigne une section de leçon. L'élève n'en voit
JAMAIS le code : `LessonRenderer.stripRungPrefix` retire le préfixe
« R<n> — » des titres h2/h3 (il ne survit que dans un `data-rung`
invisible), et `lib/chapters.ts` fait de même pour le libellé du rail.
L'audit externe de juillet 2026 a classé ces renvois comme fuite de texte
de rédaction (5.1) ; le correctif d'alors a nettoyé les titres, le tableau
de barème et la prose d'UNE notion. Le reste — 1 086 occurrences dans
56 leçons — n'a jamais été touché.

CE QUE L'ÉLÈVE VOIT, EN REVANCHE : le NUMÉRO du chapitre. Le rail affiche
« 3 · Établir l'équation différentielle », la position affiche
« Chapitre 3 / 11 », et l'URL porte `?chapitre=3`. Un renvoi vers un
numéro de chapitre est donc résoluble — et même cliquable.

LA CORRESPONDANCE EST CALCULABLE, PAS DEVINÉE. Elle se lit dans la leçon
elle-même : le k-ième titre `## ` est le chapitre k+1, et son code de
barreau est ce que le titre déclare. Mesuré sur le corpus : dans 56 leçons
sur 62, R<n> tombe exactement sur le chapitre n+1 ; dans les 6 autres, des
titres NON-barreau s'intercalent et décalent la suite — la correspondance
reste juste, elle n'est simplement plus n+1. On la calcule par position,
leçon par leçon, et jamais par une formule globale.

CE QUE CE SCRIPT REFUSE DE TOUCHER — et c'est le plus important :

  · les TITRES `## R<n> — …` : le préfixe est retiré au rendu, il doit
    rester dans la source (c'est lui qui porte `data-rung`, qui attache
    les items du chapitre) ;
  · les COMMENTAIRES d'auteur `<!-- … -->` et les blocs de code : ils ne
    sortent pas à l'écran, et c'est justement là que l'information
    « ce passage sert le R2 » a sa place ;
  · les renvois vers UNE AUTRE NOTION (« « L'État », R6 ») : le numéro de
    chapitre à écrire est celui de la leçon CITÉE, pas de celle qu'on
    lit. Le script les signale et n'y touche pas ;
  · tout contexte grammatical qu'il ne reconnaît pas. Il vaut mieux
    signaler dix cas à la main qu'en abîmer un en silence.

USAGE
    python3 scripts/renvois-barreaux.py            # rapport à blanc
    python3 scripts/renvois-barreaux.py --ecrire   # applique
    python3 scripts/renvois-barreaux.py --check    # sort 1 s'il reste des
                                                   # renvois traitables
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
CONTENU = RACINE / "content"

TITRE = re.compile(r"^(#{2,6})\s+(.+?)\s*$")
PREFIXE_BARREAU = re.compile(r"^(R\d+)\s*[-—–]\s*")


def masque_zones_ignorees(md: str) -> str:
    """Remplace commentaires et blocs de code par des blancs de MÊME longueur.

    On garde les offsets intacts pour pouvoir réécrire le texte original par
    position — un simple `re.sub` détruirait l'alignement.
    """
    out = list(md)

    def blanchir(m: re.Match) -> None:
        for i in range(m.start(), m.end()):
            if out[i] != "\n":
                out[i] = " "

    for m in re.finditer(r"<!--.*?-->", md, flags=re.S):
        blanchir(m)
    for m in re.finditer(r"```.*?```", md, flags=re.S):
        blanchir(m)
    for m in re.finditer(r"(?m)^#{2,6}\s+.*$", md):
        blanchir(m)
    return "".join(out)


def index_des_lecons() -> dict[str, dict[int, int]]:
    """{ titre H1 normalisé ET slug -> table barreau→chapitre } pour TOUTES
    les leçons.

    Sert aux renvois vers une AUTRE notion : « (cf. la leçon « L'État », R6) »
    vise le chapitre 7 de `l-etat`, pas celui de la leçon qu'on lit. Avec cet
    index, ces renvois-là deviennent traduisibles au lieu d'être abandonnés —
    et ce sont les PIRES du corpus : ils désignent une autre leçon ET un code
    que l'élève ne voit nulle part.
    """
    index: dict[str, dict[int, int]] = {}
    for f in sorted(CONTENU.rglob("lesson.md")):
        md = f.read_text(encoding="utf-8")
        table = correspondance(md)
        if not table:
            continue
        slug = f.parent.name
        index[slug] = table
        h1 = re.search(r"(?m)^#\s+(.+?)\s*$", md)
        if h1:
            index[normalise(h1.group(1))] = table
    return index


def normalise(t: str) -> str:
    """Titre → clé comparable : minuscules, sans accents ni ponctuation."""
    t = t.lower().strip()
    for a, b in (("à", "a"), ("â", "a"), ("é", "e"), ("è", "e"), ("ê", "e"),
                 ("î", "i"), ("ï", "i"), ("ô", "o"), ("û", "u"), ("ù", "u"),
                 ("ç", "c"), ("’", "'")):
        t = t.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "", t)


def correspondance(md: str) -> dict[int, int]:
    """{ numéro de barreau -> numéro de chapitre (1-based) }, lue dans la leçon.

    Le découpage en chapitres est celui de `lib/chapters.ts` : un chapitre par
    titre `## `, ce qui précède le premier fusionnant dans le chapitre 1.
    """
    table: dict[int, int] = {}
    idx = 0
    for ligne in md.split("\n"):
        m = TITRE.match(ligne)
        if not m or len(m.group(1)) != 2:
            continue
        idx += 1
        p = PREFIXE_BARREAU.match(m.group(2))
        if p:
            table[int(p.group(1)[1:])] = idx
    return table


# ── Les tournures reconnues ───────────────────────────────────────────────
#
# Chaque règle dit ce qu'elle attend AVANT le code et ce qu'elle écrit. L'ordre
# compte : les formes composées (« R1/R3 », « R7-R8 ») passent avant la forme
# simple, sinon la simple les couperait en deux.
#
# Le mot « chapitre » ne prend jamais de majuscule au milieu d'une phrase ; en
# tête de phrase, la règle START le capitalise et ajoute l'article.

def num(n: int, table: dict[int, int]) -> str | None:
    c = table.get(n)
    return str(c) if c else None


# ── LES SLUGS DE LEÇON ────────────────────────────────────────────────────
#
# « Tu as déjà rencontré, dans la leçon sur la vérité (la-verite, chapitre 6),
# la démarche de Descartes. » `la-verite` est un NOM DE DOSSIER. L'élève ne
# l'a jamais vu ; ce qu'il lit, dans le rail et dans le fil d'Ariane, c'est
# le TITRE : « La vérité ». Même classe que les codes de barreau, même
# remède — remplacer par ce que l'élève voit.
#
# Seuls les slugs À TIRET sont traités. `autrui`, `travail`, `bonheur` sont
# aussi des mots français ordinaires, et la leçon « Autrui » écrit
# légitimement « autrui » à chaque paragraphe : les toucher casserait le
# texte pour réparer une fuite qui n'existe pas.
def titres_par_slug() -> dict[str, str]:
    out: dict[str, str] = {}
    for lecon in CONTENU.rglob("lesson.md"):
        slug = lecon.parent.name
        if "-" not in slug:
            continue
        premiere = lecon.read_text(encoding="utf-8").split("\n", 1)[0]
        titre = premiere.lstrip("# ").strip()
        if titre:
            out[slug] = titre
    return out


TITRES = titres_par_slug()


def reecrire_slugs(ligne: str) -> str:
    # CE QUI EST ENTRE ACCENTS GRAVES EST DU CODE, ET LE RESTE.
    # « transcrites dans la banque sœur `calcul-integral/bank.yaml` » : un
    # chemin de dépôt, que remplacer par un titre rendrait absurde
    # (« `« Calcul intégral »/bank.yaml` »). Payé une fois, en relisant la
    # sortie. Que ces identifiants soient VISIBLES par l'élève est une autre
    # fuite, d'une autre nature — elle se traite en réécrivant la phrase, pas
    # en substituant un mot.
    # NUANCE, ET ELLE COMPTE. Un accent grave autour d'un CHEMIN
    # (`calcul-integral/bank.yaml`) protège une référence de dépôt : on n'y
    # touche pas. Un accent grave autour du SEUL SLUG (« tu l'as dans
    # `la-liberte` ») ne protège rien du tout : l'élève voit un identifiant
    # dans une boîte à chasse fixe, ce qui est la fuite elle-même, en plus
    # voyant. Celui-là, on le remplace par le titre — accents graves compris,
    # car un titre de leçon n'est pas du code.
    protege: list[str] = []

    def garder(m: re.Match) -> str:
        interieur = m.group(1)
        if interieur in TITRES:
            return f"« {TITRES[interieur]} »"
        protege.append(m.group(0))
        return f"\x04CODE{len(protege) - 1}\x04"

    ligne = re.sub(r"`([^`]*)`", garder, ligne)

    for slug, titre in TITRES.items():
        if slug not in ligne:
            continue
        s = re.escape(slug)
        # « (la-verite, chapitre 8) » et « la-verite chapitre 8 »
        ligne = re.sub(rf"(?<![\w/-]){s},?\s+(?:le\s+)?chapitre\s+(\d+)(?![\w-])",
                       lambda m: f"chapitre {m.group(1)} de « {titre} »", ligne)
        # « dans la leçon la-liberte », « la leçon « … » » déjà correcte
        ligne = re.sub(rf"(?<![\w/-])(la\s+le[çc]on\s+){s}(?![\w-])",
                       lambda m: f"{m.group(1)}« {titre} »", ligne)
        # tout autre emploi nu : « dans le-devoir », « (la-verite) »
        ligne = re.sub(rf"(?<![\w/-]){s}(?![\w-])", f"« {titre} »", ligne)

    for i, brut in enumerate(protege):
        ligne = ligne.replace(f"\x04CODE{i}\x04", brut)
    return ligne


def reecrire_ligne(ligne: str, table: dict[int, int], journal: list[str], fichier: str, no: int,
                   index: dict[str, dict[int, int]] | None = None) -> str:
    """Réécrit une ligne de prose. Signale ce qu'elle ne sait pas traiter."""

    # ── RENVOIS VERS UNE AUTRE NOTION : protégés, pas sautés ────────────────
    #
    # « Reprends Marx (« L'État », R6) » vise le chapitre 6 d'une AUTRE leçon :
    # le numéro à écrire n'est pas celui de la table locale. On ne peut donc
    # pas les traduire ici — mais on ne peut pas non plus abandonner la LIGNE
    # entière, car elle contient souvent aussi des renvois internes. (Premier
    # essai : sauter la ligne dès qu'elle contenait un guillemet fermant a fait
    # rater une dizaine de « Reprends R2 » parfaitement locaux.)
    #
    # On remplace donc chaque renvoi externe par une sentinelle le temps du
    # traitement, et on le restitue tel quel à la fin.
    ligne = reecrire_slugs(ligne)

    # ── UN « R1 » N'EST PAS TOUJOURS UN BARREAU ──────────────────────────────
    #
    # En physique, R1 est une RÉSISTANCE. « Loi d'Ohm sur R1, avec
    # i(0+) = 0,1 A » parle d'un composant du circuit, pas d'un chapitre de la
    # leçon — et la réécrire en « sur le chapitre 2 » produit une phrase qui
    # ne veut plus rien dire. Attrapé en relisant la sortie, une règle trop
    # tard : ajouter « sur » à la liste des prépositions avait suffi.
    #
    # LA GARDE EST GROSSIÈRE ET C'EST VOULU : dès que la LIGNE porte du
    # vocabulaire de circuit, on protège tous les codes qu'elle contient,
    # SAUF ceux qu'un « rung » précède explicitement — là, l'auteur a levé
    # l'ambiguïté lui-même. Vingt et une lignes du corpus sont concernées ;
    # trois portent une vraie résistance. Protéger les dix-huit autres coûte
    # dix-huit renvois non traduits ; en abîmer trois coûterait la confiance
    # dans le reste.
    CIRCUIT = re.compile(
        r"\b(?:Ohm|ohm|résistances?|resistances?|résistor|bobine|condensateur|"
        r"dip[ôo]les?|circuits?|bornes?|tension|intensit[ée]|maille|inductance|"
        r"capacit[ée])\b", re.I)
    protege_composant: list[str] = []
    if CIRCUIT.search(ligne):
        def garder_composant(m: re.Match) -> str:
            protege_composant.append(m.group(0))
            journal.append(
                f"  ⚡ {fichier}:{no} « {m.group(0)} » dans une ligne de circuit — "
                f"laissé intact (résistance ou barreau ? on ne devine pas)")
            return f"\x05COMP{len(protege_composant) - 1}\x05"

        ligne = re.sub(r"(?<![Rr]ung )(?<![Rr]ungs )\bR\d+\b", garder_composant, ligne)

    # ── RENVOI EXTERNE À L'ENVERS : « R7 de « Calcul intégral » » ───────────
    #
    # Le détecteur ci-dessous cherche le titre AVANT le code (« … dans « L'État »,
    # R6 »). L'autre ordre existe aussi, et il est PIRE : le code d'abord, la
    # notion citée ensuite. Rien ne le signalait, donc la table LOCALE
    # s'appliquait — et « R7 de « Calcul intégral » » devenait « chapitre 8 »
    # ou « chapitre 2 » selon la leçon où la phrase se trouvait. Dix-neuf
    # renvois du corpus ont cette forme ; treize tombaient sur le mauvais
    # chapitre d'une autre leçon. Mesuré en re-résolvant chacun contre la
    # table de la leçon CITÉE, jamais à l'œil.
    protege_inv: list[str] = []

    def externe_inverse(m: re.Match) -> str:
        n = int(m.group("n") or m.group("n2"))
        cle = normalise(m.group("titre"))
        cible = (index or {}).get(cle)
        if cible is None:
            # Le titre cité est parfois ABRÉGÉ : « Suivi temporel d'une
            # transformation » pour la leçon « Suivi temporel d'une
            # transformation — vitesse de réaction ». On accepte un préfixe,
            # mais SEULEMENT s'il ne désigne qu'une leçon : deux candidates,
            # on ne devine pas.
            cands = [k for k in (index or {}) if k.startswith(cle)]
            if len(cands) == 1:
                cible = index[cands[0]]
        if not cible or n not in cible:
            # PROTÉGÉ, pas seulement signalé. Sans sentinelle, les règles
            # suivantes réécrivaient quand même le code — avec la table
            # LOCALE, donc vers le mauvais chapitre d'une autre leçon. C'est
            # exactement le défaut que cette fonction existe pour empêcher.
            protege_inv.append(m.group(0))
            journal.append(
                f"  ↷ {fichier}:{no} renvoi « R{n} de « {m.group('titre')} » » NON résolu, "
                f"laissé intact (leçon citée inconnue ou chapitre absent)")
            return f"\x02INV{len(protege_inv) - 1}\x02"
        return f"{m.group('lien') or ''}chapitre {cible[n]}{m.group('milieu')}« {m.group('titre')} »"

    ligne = re.sub(
        r"(?P<lien>\b(?:du|de|le|la|au|dans le|dans la)\s+)?"
        r"(?:[Rr]ungs?\s+(?P<n>\d+)|R(?P<n2>\d+))"
        r"(?P<milieu>\s+(?:de|du|dans)\s+)«\s*(?P<titre>[^»]{3,70}?)\s*»",
        externe_inverse, ligne)

    ligne_source = ligne
    EXTERNE = re.compile(
        # Le SLUG d'une autre leçon (« la-verite R7 », « la-verite, chapitre… »)
        # compte autant qu'un titre entre guillemets : la virgule facultative a
        # été apprise à la dure — sans elle, « (la-verite, R6) » passait au
        # travers et se faisait traduire avec la table de la leçon COURANTE,
        # c'est-à-dire vers le mauvais chapitre d'une autre leçon.
        r"(?:[»”\"]\s*[,)]?\s*|le[çc]on\s+«[^»]{0,60}»\s*,?\s*|\b[a-z]+(?:-[a-z]{2,})+\s*,?\s*)"
        r"R\d+(?:\s*[;,–—-]\s*R?\d+)*\b"
    )
    externes: list[str] = []

    def garder(m: re.Match) -> str:
        brut = m.group(0)
        # QUELLE leçon est citée ? Le titre est souvent AVANT le morceau
        # capturé (« … dans la leçon « L'État », R6 ») : on le cherche donc
        # dans le début de ligne, pas seulement dans la capture. Sans ça, les
        # dix renvois de la-violence restaient « non résolus » alors que leur
        # cible était écrite trois mots plus tôt.
        amont = ligne_source[: m.start()]
        # DEUX FORMES, et la première est celle qui manquait : quand la capture
        # commence PAR le guillemet fermant (« … dans « L'État », R5 »), le
        # titre est en amont SANS son guillemet de clôture — chercher une paire
        # complète le rate, et allait chercher un tout autre mot cité plus tôt
        # dans la phrase (« légitime »). On regarde donc d'abord un guillemet
        # ouvrant NON REFERMÉ en fin d'amont.
        ouvert = re.search(r"«\s*([^»]{2,60}?)\s*$", amont)
        cite = ouvert
        if cite is None:
            for c in re.finditer(r"«\s*([^»]{2,60})\s*»", amont):
                cite = c
        cle = normalise(cite.group(1)) if cite else None
        if cle not in (index or {}):
            # Repli : la dernière paire complète de la ligne.
            for c in re.finditer(r"«\s*([^»]{2,60})\s*»", amont):
                if normalise(c.group(1)) in (index or {}):
                    cle = normalise(c.group(1))
        if cle not in (index or {}):
            slug = re.match(r"\s*([a-z]+(?:-[a-z]{2,})+)", brut)
            # Le nom d'une AUTRE leçon, pas n'importe quel mot composé :
            # « rappelle-toi R1 » ressemble à un slug et n'en est pas un.
            cle = slug.group(1) if slug and slug.group(1) in (index or {}) else cle
        cible = (index or {}).get(cle or "")
        codes = re.findall(r"R(\d+)", brut)
        if cible and codes:
            chapitres = [cible.get(int(c)) for c in codes]
            if all(chapitres):
                sortie = brut
                for c, ch in zip(codes, chapitres):
                    sortie = re.sub(rf"\bR{c}\b", f"chapitre {ch}", sortie, count=1)
                journal.append(
                    f"  → {fichier}:{no} renvoi externe RÉSOLU via {cle} : …{brut.strip()} → {sortie.strip()}…"
                )
                externes.append(sortie)
                return f"\x00{len(externes) - 1}\x00"
        if cle is None and not re.match(r"\s*[»”\"]", brut):
            # Ni titre cité en amont, ni slug connu : ce n'est pas un renvoi
            # externe. On laisse les règles ordinaires s'en occuper.
            return brut
        externes.append(brut)
        journal.append(f"  ↷ {fichier}:{no} renvoi vers une AUTRE notion, NON résolu : …{brut}…")
        return f"\x00{len(externes) - 1}\x00"

    ligne = EXTERNE.sub(garder, ligne)

    def chap(n: int) -> str | None:
        c = table.get(n)
        return str(c) if c else None

    def inconnu(n: int) -> None:
        journal.append(f"  ✗ {fichier}:{no} R{n} n'a pas de chapitre dans cette leçon")

    # ── 1. LES LISTES DE BARREAUX ────────────────────────────────────────────
    # « R1, R5 », « R2 et R3 », « R1/R3 », « R7-R8 », « R1 ou R2 ».
    # Traitées EN PREMIER : sinon les règles simples en réécrivent un seul et
    # laissent l'autre — c'est le défaut qui a produit « (R1, chapitre 6) » au
    # premier essai.
    LISTE = re.compile(
        r"\bR(\d+)((?:\s*(?:,|et|ou|/|–|—|-)\s*R?\d+)+)\b"
    )

    def liste(m: re.Match) -> str:
        nums = [int(m.group(1))] + [int(x) for x in re.findall(r"\d+", m.group(2))]
        # Le connecteur d'origine décide du mot de liaison : « ou » reste « ou ».
        ou = " ou " in m.group(2)
        # UN TIRET N'EST PAS UNE VIRGULE. « R0-R4 » désigne un INTERVALLE — du
        # premier au cinquième chapitre — pas une paire. La première version
        # écrivait « chapitres 1 et 5 » pour « le corps de la leçon », ce qui
        # dit littéralement autre chose : deux chapitres au lieu de neuf. Vu
        # sur la-liberte (« un axe que R0-R4 n'ont pas encore nommé ») et sur
        # une trentaine d'autres.
        tiret = bool(re.search(r"[–—-]", m.group(2))) and len(nums) == 2
        chapitres = [chap(n) for n in nums]
        if any(c is None for c in chapitres):
            for n, c in zip(nums, chapitres):
                if c is None:
                    inconnu(n)
            return m.group(0)
        if tiret:
            corps = f"{chapitres[0]} à {chapitres[1]}"
        elif len(chapitres) == 2:
            corps = f"{chapitres[0]} {'ou' if ou else 'et'} {chapitres[1]}"
        else:
            corps = ", ".join(chapitres[:-1]) + f" {'ou' if ou else 'et'} {chapitres[-1]}"
        return f"chapitres {corps}"

    # ── 0 bis. LES INTERVALLES ───────────────────────────────────────────────
    # « des rungs R1 à R5 », « de R2 jusqu'à R4 ». Traités AVANT les listes :
    # sans cette règle, chaque borne était réécrite séparément et donnait
    # « des chapitre 2 au chapitre 6 » — vu sur genetique-humaine.
    def intervalle(m: re.Match) -> str:
        a_, b_ = int(m.group("a")), int(m.group("b"))
        ca, cb = chap(a_), chap(b_)
        if not ca or not cb:
            for n, c in ((a_, ca), (b_, cb)):
                if not c:
                    inconnu(n)
            return m.group(0)
        return f"chapitres {ca} à {cb}"

    ligne = re.sub(
        r"\b(?:rungs?\s+)?R(?P<a>\d+)\s+(?:à|jusqu'à|au)\s+R?(?P<b>\d+)\b",
        intervalle, ligne)

    ligne = LISTE.sub(liste, ligne)
    # Accorder l'article qui précède une liste : « au chapitres 3 et 4 » n'existe pas.
    ligne = re.sub(r"\b(au|du|le|en|de|à)\s+(chapitres\s)", lambda m: {
        "au": "aux ", "du": "des ", "le": "les ", "en": "aux ", "de": "des ", "à": "aux ",
    }[m.group(1)] + m.group(2), ligne)
    ligne = re.sub(r"\b(Au|Du|Le|En|De|À)\s+(chapitres\s)", lambda m: {
        "Au": "Aux ", "Du": "Des ", "Le": "Les ", "En": "Aux ", "De": "Des ", "À": "Aux ",
    }[m.group(1)] + m.group(2), ligne)
    # Deux séquelles de la réécriture, l'une et l'autre constatées sur la
    # sortie et corrigées ici plutôt que dans trente fichiers :
    #   · « chapitres chapitres 5 et 6 » — la source disait déjà « chapitres
    #     R4-R5 », le mot était donc écrit deux fois ;
    #   · « le socle chapitres 2 à 8 » — après un nom comme socle ou corps, le
    #     français demande « des ». Sans article, la phrase trébuche.
    ligne = re.sub(r"\b(socle|corps|cadre|périmètre|programme|terrain|réflexe|axe)\s+(chapitres\s)",
                   r"\1 des \2", ligne)
    # « que chapitres 4 et 5 », « dès chapitres 3 et 5 », « ni chapitres 2 à 10
    # ne nomment » : après une préposition ou une conjonction, le pluriel
    # réclame son article. Le code source n'en avait pas besoin — « que R1 et
    # R3 » se lit — mais « que chapitres 1 et 3 » ne se lit pas.
    ligne = re.sub(
        r"\b(que|qu'|dans|sur|dès|entre|avec|ni|ou|et|par|pour|selon|sans|sous|vers|"
        r"comme|depuis|parmi|chez|reprends|mobilise|contredit|construit|nomme|couvre|"
        r"portent|Comment|Reprends)\s+(chapitres\s+\d)",
        r"\1 les \2", ligne)

    # ── 2. « rung R<n> » : le mot est du jargon anglais de rédaction, il part
    #       avec le code.
    def avec_rung(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        art = m.group("art").lower()
        contraction = {"au ": "au ", "du ": "du ", "le ": "le ", "de ": "du ", "en ": "au ", "à ": "au "}
        return f"{contraction.get(art, art)}chapitre {c}"

    ligne = re.sub(r"(?P<art>\b(?:au|du|le|de|en|à)\s+)rungs?\s+R(?P<n>\d+)\b", avec_rung, ligne, flags=re.I)
    ligne = re.sub(r"\brungs?\s+R(?P<n>\d+)\b",
                   lambda m: (chap(int(m.group("n"))) and f"chapitre {chap(int(m.group('n')))}") or m.group(0),
                   ligne)

    # ── 3. FORMES PRÉPOSITIONNELLES ──────────────────────────────────────────
    def simple(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        avant = m.group("avant")
        maj = avant[:1].isupper()
        cle = avant.lower()
        contraction = {"de ": "du ", "en ": "au ", "à ": "au "}
        remplace = contraction.get(cle, cle)
        if maj:
            remplace = remplace[:1].upper() + remplace[1:]
        return f"{remplace}chapitre {c}"

    ligne = re.sub(
        r"(?P<avant>\b(?:[Aa]u|[Dd]u|[Ll]e|[Ee]n|[Dd]e|[Àà]|[Dd]ans le|[Dd]epuis le|[Jj]usqu'au|[Qq]u'au|[Qq]u'en|[Vv]ers le)\s+)R(?P<n>\d+)\b",
        simple, ligne)

    # ── 4. FORMES NUES : « (R4) », « , R4 », « — R4 » ────────────────────────
    def nu(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"{m.group('avant')}chapitre {c}{m.group('apres')}"

    ligne = re.sub(r"(?P<avant>\()R(?P<n>\d+)(?P<apres>[),.;:\s])", nu, ligne)
    # La virgule introduit une apposition (« (R1, R5) ») : pas d'article.
    ligne = re.sub(r"(?P<avant>,\s+)R(?P<n>\d+)(?P<apres>[),.;:\s])", nu, ligne)

    # ── 5. DÉBUT DE PHRASE : « R1 a présenté … » ─────────────────────────────
    def debut(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"{m.group('avant')}Le chapitre {c} "

    ligne = re.sub(r"(?P<avant>(?:^|(?<=[.!?:]\s)|(?<=\*\*)))R(?P<n>\d+)\s+(?=[a-zàéèêîôn])", debut, ligne)

    # ── 6. VERBES ET RELATIFS ────────────────────────────────────────────────
    # « Reprends R5 », « Mobilise R2 », « Ajoute R8 », « ce que R1 identifiait »,
    # « depuis R1 », « et R4 (Popper) ». Le code y tient la place d'un GROUPE
    # NOMINAL : il devient « le chapitre N ».
    def nominal(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"{m.group('avant')}le chapitre {c}"

    # `re.I` sans risque : le préfixe est réinjecté TEL QUEL (m.group("avant")),
    # donc « D'après » reste capitalisé et « d'après » reste minuscule.
    ligne = re.sub(
        r"(?P<avant>\b(?:reprends|mobilise|mobiliser|ajoute|relis|revois|voir|compare|rapproche|corrige|construit|présente|décrit|distingue|montre|nomme|répond|oppose|affirme|établit|constitue|développe|apporte|prépare|que|qu'|dont|depuis|dès|selon|d'après|avec|et|ou|comme|dans|par|via|encore|sur|cf\.|la partie|de la partie|à la fin de la partie)\s+)R(?P<n>\d+)\b",
        nominal, ligne, flags=re.I)
    # « Et R6, enfin » / « Or R2 dit » : en tête, avec majuscule.
    ligne = re.sub(
        r"(?P<avant>(?:^|(?<=[.!?]\s))(?:Et|Or|Mais|Puis)\s+)R(?P<n>\d+)\b",
        nominal, ligne)
    # Le tiret cadratin ouvre une PROPOSITION : « — R3 va montrer » veut son
    # article, sinon la phrase boite (« — chapitre 4 va montrer »). La virgule,
    # elle, introduit une apposition et n'en veut pas — d'où deux règles.
    ligne = re.sub(r"(?P<avant>[—–]\s+)R(?P<n>\d+)\b", nominal, ligne)

    # ── 6 bis bis. « en R<n> » et le code SEUL entre parenthèses ─────────────
    # « mal appliquée en R2 », « évoqué en R4 », « construit en R3 » : la
    # préposition « en » demande « au chapitre ». Et « (R2) », « (R6) » —
    # une apposition nue entre parenthèses — devient « (chapitre 3) », sans
    # article : c'est une étiquette, pas un groupe dans la phrase.
    def en_chapitre(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"{m.group('avant')}au chapitre {c}"

    ligne = re.sub(r"(?P<avant>\ben\s+)R(?P<n>\d+)\b", en_chapitre, ligne)

    def parenthese(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"(chapitre {c})"

    ligne = re.sub(r"\(R(?P<n>\d+)\)", parenthese, ligne)

    # ── 6 ter. APPOSITION APRÈS UN NOM ───────────────────────────────────────
    # « la formule R8 », « la limite de référence R4 », « le rappel R1 » : le
    # code qualifie le nom qui précède. En français, cela s'écrit « du
    # chapitre N » — « la formule le chapitre 9 » ne se dit pas. C'est la
    # tournure la plus fréquente du reliquat (banques de maths).
    def apposition(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"{m.group('nom')}du chapitre {c}"

    ligne = re.sub(
        r"(?P<nom>\b(?:formule|rappel|critère|méthode|signal|geste|résultat|théorème|"
        r"propriété|règle|définition|forme|encadré|tableau|calcul|raisonnement|"
        r"limite de référence|exemple travaillé)\s+)R(?P<n>\d+)\b",
        apposition, ligne, flags=re.I)

    # ── 6 quater. LE CODE EN POSITION DE SUJET ───────────────────────────────
    # « R2 présente ce critère », « R6 construit la dépersonnalisation »,
    # « R1 les distingue » : le code EST le sujet du verbe qui suit. Repéré
    # par ce qui suit — un mot en minuscules.
    #
    # DEUX RÈGLES, ET LA SÉPARATION EST DÉLIBÉRÉE. Après une ponctuation
    # forte, la phrase recommence : il faut une majuscule. En DÉBUT DE LIGNE,
    # on ne sait pas — dans un scalaire YAML en bloc, une ligne commence le
    # plus souvent au MILIEU d'une phrase, coupée par la largeur. On y écrit
    # donc la minuscule, qui est le cas majoritaire, et on relit la sortie.
    def sujet_maj(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"{m.group('tete')}Le chapitre {c} "

    def sujet_min(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        return f"{m.group('tete')}le chapitre {c} "

    ligne = re.sub(
        # `^\s*` et non `^` : dans un scalaire YAML en bloc, la ligne
        # commence par son indentation, et l'ancre nue ne mordait jamais.
        # Idem après un numéro de question (« 2 R0 présente… »).
        r"(?P<tete>(?:^\s*|(?<=[.!?]\s)|(?<=\d\s))(?:«\s*)?)R(?P<n>\d+)\s+(?=[a-zàâçéèêëîïôûùü])",
        sujet_maj, ligne)
    ligne = re.sub(
        r"(?P<tete>(?<=[,;:(]\s)|(?<=\())R(?P<n>\d+)\s+(?=[a-zàâçéèêëîïôûùü])",
        sujet_min, ligne)

    # ── 6 bis. LE MOT « RUNG » LUI-MÊME ──────────────────────────────────────
    #
    # « rung » est un mot ANGLAIS, et c'est du vocabulaire de rédaction : il
    # nomme un barreau de l'échelle pédagogique. Il n'a rien à faire sous les
    # yeux d'un élève marocain qui lit une leçon en français — et il y était
    # 252 fois (« au rung », « du rung », « ce rung », « le prochain rung »).
    # Le mot juste, celui que l'interface emploie déjà partout, est
    # « chapitre ». C'est la même fuite que les codes R<n>, sans le code.
    # ET LE NUMÉRO QUI LE SUIT EST UN CODE, PAS UN NUMÉRO DE CHAPITRE.
    #
    # « rung 7 » s'écrit aussi « R7 » : c'est le même barreau, dit autrement.
    # La première version remplaçait seulement le MOT et gardait le chiffre —
    # « rung 1 » devenait « chapitre 1 ». Or R1 est le DEUXIÈME chapitre
    # (R0 est le premier). Chaque renvoi de cette forme pointait donc un
    # chapitre trop tôt.
    #
    # VÉRIFIÉ SUR LE SENS, PAS SUR LA SYNTAXE : dans chute-mouvements-plans,
    # « la chute verticale pure du rung 1 » désigne « R1 — Rappel actif : la
    # chute libre verticale », c'est-à-dire le chapitre 2 ; « chapitre 1 »
    # renvoyait l'élève à l'accroche. Dans rlc-serie, « le rung 2 donne la
    # méthode ($T_0 = 2\pi\sqrt{LC}$) » désigne R2, chapitre 3.
    #
    # 98 occurrences en prose de leçon (déjà publiées, donc à réparer) et
    # 1 358 dans les sidecars.
    def rung_numerote(m: re.Match) -> str:
        n = int(m.group("n"))
        c = chap(n)
        if not c:
            inconnu(n)
            return m.group(0)
        mot = "Chapitre" if m.group("mot")[0].isupper() else "chapitre"
        return f"{mot} {c}"

    ligne = re.sub(r"(?P<mot>\b[Rr]ungs?)\s+(?P<n>\d+)\b", rung_numerote, ligne)

    # CE QUI N'A PAS PU ÊTRE RÉSOLU RESTE INTACT. Si le barreau n'existe pas
    # dans CETTE leçon, c'est qu'il désigne une AUTRE notion : traduire quand
    # même le mot laisserait le numéro faux (« rung 7 » d'une leçon voisine
    # devenu « chapitre 7 » de celle-ci, qui n'en compte que cinq). On protège
    # donc la forme complète le temps de la traduction du mot.
    protege_rung: list[str] = []

    def garder_rung(m: re.Match) -> str:
        protege_rung.append(m.group(0))
        return f"\x03RUNG{len(protege_rung) - 1}\x03"

    ligne = re.sub(r"\b[Rr]ungs?\s+\d+\b", garder_rung, ligne)

    for faux, juste in (
        (r"\brungs\b", "chapitres"),
        (r"\bRungs\b", "Chapitres"),
        (r"\brung\b", "chapitre"),
        (r"\bRung\b", "Chapitre"),
    ):
        ligne = re.sub(faux, juste, ligne)

    for i, brut in enumerate(protege_rung):
        ligne = ligne.replace(f"\x03RUNG{i}\x03", brut)

    # ── 7. FILET GRAMMATICAL ─────────────────────────────────────────────────
    # Les règles ci-dessus substituent un mot à un autre ; le français, lui,
    # contracte. « vue en R1 » ne devient pas « vue en chapitre 2 » mais « vue
    # au chapitre 2 ». Plutôt que d'encoder la contraction dans chaque règle —
    # et d'en oublier une, ce qui est arrivé pour « qu'en » et « d'après » —
    # on passe une fois à la fin sur les formes fautives. Ce filet est la
    # SEULE chose qui garantisse qu'aucune tournure ne sort bancale.
    for faux, juste in (
        (r"\bqu'en (chapitres?\b)", r"qu'au \1"),
        (r"\ben (chapitres?\b)", r"au \1"),
        (r"\bEn (chapitres?\b)", r"Au \1"),
        (r"\bde (chapitre\b)", r"du \1"),
        (r"\bDe (chapitre\b)", r"Du \1"),
        (r"\bde (chapitres\b)", r"des \1"),
        (r"\bà (chapitres?\b)", r"au \1"),
        (r"\bd'après (chapitres?\b)", r"d'après le \1"),
        (r"\bpar (chapitres?\b)", r"par le \1"),
        (r"\bvia (chapitres?\b)", r"via le \1"),
        (r"\bselon (chapitres?\b)", r"selon le \1"),
        (r"\bau chapitres\b", r"aux chapitres"),
        (r"\bdu chapitres\b", r"des chapitres"),
        (r"\ble chapitres\b", r"les chapitres"),
        (r"\bd'après le chapitres\b", r"d'après les chapitres"),
        (r"\bpar le chapitres\b", r"par les chapitres"),
    ):
        ligne = re.sub(faux, juste, ligne)

    # ── Restitution des renvois externes ─────────────────────────────────────
    ligne = re.sub(r"\x00(\d+)\x00", lambda m: externes[int(m.group(1))], ligne)

    # ── Ce qui reste est signalé, jamais deviné. ─────────────────────────────
    # (Les renvois externes viennent d'être restitués : ils ont déjà leur ligne
    # de journal, inutile de les compter deux fois.)
    dejaVus = set()
    for e in externes:
        for m in re.finditer(r"R\d+", e):
            dejaVus.add(m.group(0))
    for m in re.finditer(r"\bR\d+\b", ligne):
        if m.group(0) in dejaVus:
            dejaVus.discard(m.group(0))
            continue
        journal.append(f"  ? {fichier}:{no} non reconnu : …{ligne[max(0, m.start() - 36):m.end() + 20].strip()}…")
    # Restitution des renvois inverses protégés.
    for i, brut in enumerate(protege_inv):
        ligne = ligne.replace(f"\x02INV{i}\x02", brut)

    for i, brut in enumerate(protege_composant):
        ligne = ligne.replace(f"\x05COMP{i}\x05", brut)

    # ── 8. DÉDOUBLONNAGE, EN DERNIER ET PAS AVANT ────────────────────────────
    #
    # « aux rungs R2 et R4 » : la règle des LISTES écrit « chapitres 3 et 5 »,
    # puis la règle 6 bis traduit « rungs » en « chapitres ». Résultat :
    # « aux chapitres chapitres 3 et 5 ». Le dédoublonnage était placé juste
    # après les listes — donc AVANT la règle qui recrée le doublon, et il ne
    # servait à rien. Quinze phrases du corpus le disaient ; c'est la
    # relecture de la SORTIE qui l'a montré, pas celle du script.
    ligne = re.sub(r"\b[Cc]hapitres\s+(chapitres\s)", r"\1", ligne)
    ligne = re.sub(r"\b(au|du|le|ce)\s+chapitre\s+(chapitres\s)", lambda m: {
        "au": "aux ", "du": "des ", "le": "les ", "ce": "ces ",
    }[m.group(1)] + m.group(2), ligne)
    # Et le cas sans article devant : « (rung R1/R4) » → « (chapitre chapitres
    # 2 et 5) ». On enlève le singulier, le pluriel porte déjà le sens.
    ligne = re.sub(r"\bchapitre\s+(chapitres\s)", r"\1", ligne)
    # « deja etablie chapitres 2 et 6 » : un participe suivi du pluriel réclame
    # « aux ». Même famille que la règle des prépositions, mais elle ne peut
    # s'appliquer qu'ici, après la traduction du mot « rung ».
    ligne = re.sub(r"\b(étable|établie|etablie|posée[s]?|rappelée[s]?|vue[s]?|construite[s]?)\s+(chapitres\s+\d)",
                   r"\1 aux \2", ligne)

    return ligne


def traiter(chemin: Path, ecrire: bool, journal: list[str],
            index: dict[str, dict[int, int]] | None = None) -> tuple[int, int]:
    md = chemin.read_text(encoding="utf-8")
    table = correspondance(md)
    if not table:
        return (0, 0)
    masque = masque_zones_ignorees(md)
    lignes = md.split("\n")
    masquees = masque.split("\n")
    court = str(chemin.relative_to(RACINE))
    avant = sum(len(re.findall(r"\bR\d+\b", l)) for l in masquees)
    # LES TITRES, corps seulement. Le préfixe « R<n> — » est retiré au rendu
    # (il porte `data-rung`) et doit rester ; mais « ### Le geste du R8, mis à
    # l'épreuve » affiche « R8 » EN GRAND à l'élève. La première campagne
    # sautait la ligne entière dès qu'elle commençait par un `#`, et laissait
    # donc 52 titres dans 18 leçons. On ne saute plus la ligne : on protège le
    # préfixe et on réécrit ce qui suit.
    PREFIXE_TITRE = re.compile(r"^(#{2,6}\s+(?:R\d+\s*[-—–]\s*)?)(.*)$")
    for i, brute in enumerate(lignes, start=1):
        if not re.match(r"^#{2,6}\s", brute):
            continue
        mt = PREFIXE_TITRE.match(brute)
        if not mt:
            continue
        corps = mt.group(2)
        if not re.search(r"\bR\d+\b", corps) and not re.search(r"\brungs?\b", corps, flags=re.I):
            continue
        lignes[i - 1] = mt.group(1) + reecrire_ligne(corps, table, journal, court, i, index)

    for i, (brute, m) in enumerate(zip(lignes, masquees), start=1):
        # « rung » sans code compte aussi : c'est le même jargon, sans le
        # chiffre. Filtrer sur le seul R<n> laissait 221 occurrences derrière.
        if (not re.search(r"\bR\d+\b", m)
                and not re.search(r"\brungs?\b", m, flags=re.I)
                and not any(sl in m for sl in TITRES)):
            continue
        lignes[i - 1] = reecrire_ligne(lignes[i - 1], table, journal, court, i, index)
    neuf = "\n".join(lignes)
    apres = sum(len(re.findall(r"\bR\d+\b", l)) for l in masque_zones_ignorees(neuf).split("\n"))
    if ecrire and neuf != md:
        chemin.write_text(neuf, encoding="utf-8")
    return (avant, apres)


# ── LES SIDECARS ──────────────────────────────────────────────────────────
#
# La première campagne n'a touché que `lesson.md`. Mesuré sur le RENDU le
# 2026-09-04 (et non sur la source, ce qui a tout changé) : il restait
# **529 codes R et 19 « rung » VISIBLES à l'écran**, sur 38 leçons. Ils
# viennent des sidecars — l'énoncé d'un item, le raisonnement d'une question
# de banque, la note d'une étape de dérivation. Un élève qui ouvre « À toi »
# lisait « un axe que R0-R4 n'ont pas encore nommé ».
#
# LE PIÈGE, ET C'EST LUI QUI COMMANDE TOUTE LA MÉCANIQUE : le corpus porte
# **1 618 champs `rung: "R7"`**. Ce sont des DONNÉES — elles attachent un
# item à son chapitre. Les réécrire casserait le produit. Une réécriture
# ligne à ligne naïve les aurait toutes détruites.
#
# D'où une LISTE BLANCHE de clés, jamais une liste noire : on ne réécrit que
# ce dont on sait que c'est de la prose lue par un élève. Une clé inconnue
# est laissée tranquille par construction — c'est le sens de marche sûr.
CLES_PROSE = {
    "stem", "text", "feedback", "correct_feedback", "reasoning",
    "solution", "intro", "part", "title", "description", "label",
}
# `note` EST DE LA PROSE — mais seulement sous `steps` (la note d'une étape de
# dérivation, que l'élève lit). Ailleurs, `note:` porte des notes d'AUTORAT en
# anglais, au niveau du fichier : « Every R1-R8 chapitre now has exactly 3
# items… », « the R5 label now belongs exclusively to the new ressort
# chapter ». Là, « R5 » est une DONNÉE — le nom du champ `rung:` — et la
# réécrire détruit le sens. Une première passe les avait touchées ; c'est la
# relecture de la sortie qui l'a montré, pas la relecture du script.
CLES_PROSE_SOUS = {"note": "steps"}
# `sourcing:` porte la provenance d'un sujet (année, session, référence du
# document). Sa `note` n'est pas de la prose d'élève et cite des identifiants
# qui ressemblent à des codes — on ne descend pas dedans.
PARENTS_EXCLUS = {"sourcing"}

CLE_YAML = re.compile(r"^(\s*)(-\s+)?([A-Za-z_][A-Za-z_0-9]*)\s*:(.*)$")


def traiter_yaml(chemin: Path, table: dict[int, int], ecrire: bool,
                 journal: list[str], index: dict[str, dict[int, int]] | None) -> tuple[int, int]:
    """Réécrit les renvois dans les CHAMPS DE PROSE d'un sidecar YAML.

    Marche par lignes pour préserver le fichier tel qu'il est écrit —
    commentaires, ordre, scalaires en bloc. Un `yaml.dump` aurait tout
    reformaté et perdu les commentaires d'auteur, qui sont précisément
    l'endroit où « ce passage sert le R2 » a le droit de vivre.
    """
    src = chemin.read_text(encoding="utf-8")
    lignes = src.split("\n")
    court = str(chemin.relative_to(RACINE))

    pile: list[tuple[int, str]] = []   # (indentation, clé)
    # Tampon des lignes d'un MÊME scalaire en bloc : on les réécrit ENSEMBLE.
    #
    # Pourquoi : un scalaire YAML est coupé à la largeur, pas à la phrase.
    # « … a été mal appliquée en\n          R2, ce qui invalide » place le
    # déclencheur (« en ») sur une ligne et le code sur la suivante ; ligne à
    # ligne, aucune règle ne mord. Cinquante-six renvois restaient là.
    #
    # GARDE : on ne fusionne jamais deux lignes dont la SECONDE ouvre une
    # structure markdown (liste, titre, citation, tableau, math détachée) —
    # là, le retour à la ligne porte du sens.
    courant: list[tuple[int, str]] = []
    STRUCTURE = re.compile(r"^\s*(?:[-*+]\s|#{1,6}\s|>\s|\||\d+[.)]\s|\$\$)")

    def vider_bloc() -> None:
        nonlocal avant, apres
        if not courant:
            return
        texte = "\n".join(l for _, l in courant)
        avant += len(re.findall(r"\bR\d+\b", texte))
        # On protège les sauts de ligne qui précèdent une ligne STRUCTURÉE.
        morceaux: list[str] = []
        tampon: list[str] = []
        for k, (_, l) in enumerate(courant):
            if tampon and (STRUCTURE.match(l) or not l.strip()):
                morceaux.append("\n".join(tampon))
                tampon = []
            tampon.append(l)
        if tampon:
            morceaux.append("\n".join(tampon))
        neufs = [reecrire_ligne(m, table, journal, court, courant[0][0] + 1, index) for m in morceaux]
        neuf = "\n".join(neufs)
        apres += len(re.findall(r"\bR\d+\b", neuf))
        lignes_neuves = neuf.split("\n")
        debut = courant[0][0]
        # On remplace la plage d'origine par le nouveau texte (le nombre de
        # lignes peut diminuer si une règle a mangé un saut de ligne).
        sorties[debut: debut + len(courant)] = lignes_neuves
        courant.clear()
    bloc: tuple[int, bool] | None = None  # (indentation du scalaire, prose ?)
    avant = apres = 0
    sorties: list[str] = []

    for no, ligne in enumerate(lignes, start=1):
        nu = ligne.strip()
        # Une ligne VIDE à l'intérieur d'un scalaire en bloc appartient au
        # bloc : c'est une séparation de paragraphe. La sauter faisait
        # diverger les indices du tampon, et le remplacement en bloc écrasait
        # les mauvaises lignes — dupliquant l'une, effaçant l'autre. Vu sur
        # transmission-caracteres avant d'être commis.
        if not nu and bloc and bloc[1] and courant:
            courant.append((len(sorties), ligne))
            sorties.append(ligne)
            continue
        # Commentaire d'auteur : intouchable, c'est sa place.
        if nu.startswith("#") or not nu:
            vider_bloc()
            sorties.append(ligne)
            continue

        m = CLE_YAML.match(ligne)
        indent = len(ligne) - len(ligne.lstrip())

        if m or not (bloc and indent > bloc[0]):
            vider_bloc()

        if m:
            base, tiret, cle, valeur = m.group(1), m.group(2) or "", m.group(3), m.group(4)
            col = len(base) + len(tiret)
            while pile and pile[-1][0] >= col:
                pile.pop()
            pile.append((col, cle))
            sous_exclu = any(k in PARENTS_EXCLUS for _, k in pile[:-1]) or cle in PARENTS_EXCLUS
            ancetres = {k for _, k in pile[:-1]}
            prose = (
                (cle in CLES_PROSE or
                 (cle in CLES_PROSE_SOUS and CLES_PROSE_SOUS[cle] in ancetres))
                and not sous_exclu
            )
            marqueur = valeur.strip()
            bloc = (col, prose) if marqueur in ("|", ">", "|-", ">-", "|+", ">+") else None
            if prose and valeur.strip() and marqueur not in ("|", ">", "|-", ">-", "|+", ">+"):
                avant += len(re.findall(r"\bR\d+\b", valeur))
                # Un scalaire YAML entre guillemets DROITS : on les retire le
                # temps de la réécriture. Sinon le détecteur de renvoi externe
                # — qui cherche « un guillemet fermant suivi d'un code » — lit
                # le guillemet OUVRANT de `stem: "R1 les distingue…"` comme la
                # fin d'un titre cité, et classe le renvoi « vers une autre
                # notion ». Quarante faux positifs, tous dans les checkpoints
                # de philosophie.
                enveloppe = re.match(r'^(\s*)(["\'])(.*)\2(\s*)$', valeur)
                if enveloppe:
                    interieur = reecrire_ligne(enveloppe.group(3), table, journal, court, no, index)
                    neuf = enveloppe.group(1) + enveloppe.group(2) + interieur + enveloppe.group(2) + enveloppe.group(4)
                else:
                    neuf = reecrire_ligne(valeur, table, journal, court, no, index)
                apres += len(re.findall(r"\bR\d+\b", neuf))
                sorties.append(base + tiret + cle + ":" + neuf)
                continue
            sorties.append(ligne)
            continue

        # Ligne de continuation d'un scalaire en bloc.
        if bloc and indent > bloc[0]:
            if bloc[1]:
                courant.append((len(sorties), ligne))
                sorties.append(ligne)   # remplacé plus bas, en bloc
                continue
            sorties.append(ligne)
            continue

        bloc = None
        sorties.append(ligne)

    vider_bloc()
    neuf = "\n".join(sorties)
    if ecrire and neuf != src:
        chemin.write_text(neuf, encoding="utf-8")
    return (avant, apres)


SIDECARS = ("items.yaml", "checkpoints.yaml", "exercises.yaml", "derivations.yaml", "bank.yaml")

# Les légendes de figures vivent dans des JSON à côté du SVG. Elles
# s'affichent sous la figure, en toutes lettres : « déjà construite au R1 »,
# « trouvée au R4 ». Trente d'entre elles, dans vingt-sept fichiers.
CHAMPS_JSON = re.compile(r'("(?:caption|title|note|label|text|alt)"\s*:\s*")([^"\\]*)(")')


def traiter_json(chemin: Path, table: dict[int, int], ecrire: bool,
                 journal: list[str], index: dict[str, dict[int, int]] | None) -> tuple[int, int]:
    """Réécrit les renvois dans les champs de texte d'un sidecar JSON.

    On ne touche QUE des chaînes sans échappement (`[^"\\]*`) : une chaîne
    qui contient un guillemet ou une barre oblique inverse est laissée
    telle quelle plutôt que risquer un JSON cassé pour une tournure.
    """
    src = chemin.read_text(encoding="utf-8")
    avant = apres = 0
    court = str(chemin.relative_to(RACINE))

    def remplace(m: re.Match) -> str:
        nonlocal avant, apres
        val = m.group(2)
        if not re.search(r"\bR\d+\b", val) and not re.search(r"\brungs?\b", val, flags=re.I):
            return m.group(0)
        avant += len(re.findall(r"\bR\d+\b", val))
        neuf = reecrire_ligne(val, table, journal, court, 0, index)
        apres += len(re.findall(r"\bR\d+\b", neuf))
        return m.group(1) + neuf + m.group(3)

    neuf = CHAMPS_JSON.sub(remplace, src)
    if ecrire and neuf != src:
        chemin.write_text(neuf, encoding="utf-8")
    return (avant, apres)


def main() -> int:
    ecrire = "--ecrire" in sys.argv
    check = "--check" in sys.argv
    journal: list[str] = []
    index = index_des_lecons()
    tot_avant = tot_apres = 0
    for f in sorted(CONTENU.rglob("lesson.md")):
        a, b = traiter(f, ecrire, journal, index)
        tot_avant += a
        tot_apres += b
    print(f"renvois de barreau en prose : {tot_avant} → {tot_apres}")

    # Les sidecars, avec la table de LEUR leçon.
    y_avant = y_apres = 0
    for lecon in sorted(CONTENU.rglob("lesson.md")):
        table = correspondance(lecon.read_text(encoding="utf-8"))
        if not table:
            continue
        for nom in SIDECARS:
            f = lecon.parent / nom
            if not f.exists():
                continue
            a, b = traiter_yaml(f, table, ecrire, journal, index)
            y_avant += a
            y_apres += b
        for j in sorted((lecon.parent / "media").glob("*.json")) if (lecon.parent / "media").exists() else []:
            a, b = traiter_json(j, table, ecrire, journal, index)
            y_avant += a
            y_apres += b
    print(f"renvois de barreau dans les sidecars : {y_avant} → {y_apres}")
    tot_apres += y_apres
    if journal:
        print(f"\n{len(journal)} cas signalés (non modifiés) :")
        for l in journal[:200]:
            print(l)
        if len(journal) > 200:
            print(f"  … et {len(journal) - 200} de plus")
    if check and tot_apres > 0:
        print("\n✗ il reste des renvois traitables — relance sans --check pour voir lesquels")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
