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
        chapitres = [chap(n) for n in nums]
        if any(c is None for c in chapitres):
            for n, c in zip(nums, chapitres):
                if c is None:
                    inconnu(n)
            return m.group(0)
        if len(chapitres) == 2:
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
        r"(?P<avant>\b(?:reprends|mobilise|ajoute|relis|revois|voir|compare|rapproche|que|qu'|dont|depuis|dès|selon|d'après|avec|et|ou|comme|dans|par|via|encore|cf\.|la partie|de la partie|à la fin de la partie)\s+)R(?P<n>\d+)\b",
        nominal, ligne, flags=re.I)
    # « Et R6, enfin » / « Or R2 dit » : en tête, avec majuscule.
    ligne = re.sub(
        r"(?P<avant>(?:^|(?<=[.!?]\s))(?:Et|Or|Mais|Puis)\s+)R(?P<n>\d+)\b",
        nominal, ligne)
    # Le tiret cadratin ouvre une PROPOSITION : « — R3 va montrer » veut son
    # article, sinon la phrase boite (« — chapitre 4 va montrer »). La virgule,
    # elle, introduit une apposition et n'en veut pas — d'où deux règles.
    ligne = re.sub(r"(?P<avant>[—–]\s+)R(?P<n>\d+)\b", nominal, ligne)

    # ── 6 bis. LE MOT « RUNG » LUI-MÊME ──────────────────────────────────────
    #
    # « rung » est un mot ANGLAIS, et c'est du vocabulaire de rédaction : il
    # nomme un barreau de l'échelle pédagogique. Il n'a rien à faire sous les
    # yeux d'un élève marocain qui lit une leçon en français — et il y était
    # 252 fois (« au rung », « du rung », « ce rung », « le prochain rung »).
    # Le mot juste, celui que l'interface emploie déjà partout, est
    # « chapitre ». C'est la même fuite que les codes R<n>, sans le code.
    for faux, juste in (
        (r"\brungs\b", "chapitres"),
        (r"\bRungs\b", "Chapitres"),
        (r"\brung\b", "chapitre"),
        (r"\bRung\b", "Chapitre"),
    ):
        ligne = re.sub(faux, juste, ligne)

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
    for i, (brute, m) in enumerate(zip(lignes, masquees), start=1):
        # « rung » sans code compte aussi : c'est le même jargon, sans le
        # chiffre. Filtrer sur le seul R<n> laissait 221 occurrences derrière.
        if not re.search(r"\bR\d+\b", m) and not re.search(r"\brungs?\b", m, flags=re.I):
            continue
        lignes[i - 1] = reecrire_ligne(brute, table, journal, court, i, index)
    neuf = "\n".join(lignes)
    apres = sum(len(re.findall(r"\bR\d+\b", l)) for l in masque_zones_ignorees(neuf).split("\n"))
    if ecrire and neuf != md:
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
