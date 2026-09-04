#!/usr/bin/env python3
"""
reparer-renvois-rung.py — réparer un décalage d'un chapitre, déjà publié.

CE QUI S'EST PASSÉ. La campagne 56a424b (« Prose : 1 374 renvois de
rédaction remplacés par un référent que l'élève voit ») traduisait le mot
anglais « rung » par « chapitre » — mais SANS toucher au nombre qui suit.
Or « rung 1 » est une autre écriture de « R1 », et R1 est le DEUXIÈME
chapitre : R0 est le premier. Chaque renvoi de la forme « rung <n> » pointe
donc, depuis, un chapitre trop tôt.

VÉRIFIÉ SUR LE SENS. Dans `chute-mouvements-plans`, « la chute verticale
pure du rung 1 » désigne « R1 — Rappel actif : la chute libre verticale »,
soit le chapitre 2 ; le texte publié dit « chapitre 1 », qui est l'accroche.
Dans `rlc-serie`, « le rung 2 donne la méthode ($T_0 = 2\\pi\\sqrt{LC}$) »
désigne R2, chapitre 3.

COMMENT ON RETROUVE LES BONS ENDROITS. On relit la version d'AVANT la
campagne (`56a424b^`), on y repère chaque « rung <n> », et on garde les
quarante caractères qui le suivent comme EMPREINTE. Dans le fichier
d'aujourd'hui, on cherche « chapitre <n> » suivi de cette même empreinte :
c'est le même endroit, et lui seul. Les renvois issus d'un « R<n> » — que
la campagne a, eux, correctement traduits — ne portent pas cette empreinte
et ne sont pas touchés.

Tout ce que le script ne retrouve pas est IMPRIMÉ, jamais deviné.

    python3 scripts/reparer-renvois-rung.py            # rapport
    python3 scripts/reparer-renvois-rung.py --ecrire   # applique
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RACINE / "scripts"))

import importlib.util

spec = importlib.util.spec_from_file_location("rb", RACINE / "scripts" / "renvois-barreaux.py")
rb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rb)

AVANT = "56a424b^"
RUNG = re.compile(r"\b[Rr]ungs?\s+(\d+)\b")


def texte_avant(chemin: Path) -> str | None:
    rel = chemin.relative_to(RACINE)
    r = subprocess.run(["git", "show", f"{AVANT}:{rel}"], capture_output=True, text=True, cwd=RACINE)
    return r.stdout if r.returncode == 0 else None


def normalise_espaces(t: str) -> str:
    return re.sub(r"\s+", " ", t)


def main() -> int:
    ecrire = "--ecrire" in sys.argv
    repares = introuvables = deja = 0
    for lecon in sorted((RACINE / "content").rglob("lesson.md")):
        vieux = texte_avant(lecon)
        if vieux is None:
            continue
        table = rb.correspondance(lecon.read_text(encoding="utf-8"))
        if not table:
            continue
        actuel = lecon.read_text(encoding="utf-8")
        for m in RUNG.finditer(vieux):
            n = int(m.group(1))
            juste = table.get(n)
            if juste is None:
                print(f"  ? {lecon.relative_to(RACINE)} : rung {n} sans chapitre correspondant")
                introuvables += 1
                continue
            if juste == n:
                deja += 1        # le hasard veut que ce soit déjà le bon numéro
                continue
            empreinte = normalise_espaces(vieux[m.end(): m.end() + 40]).strip()
            if len(empreinte) < 12:
                print(f"  ? {lecon.relative_to(RACINE)} : empreinte trop courte après « rung {n} »")
                introuvables += 1
                continue
            # « chapitre <n> » suivi de la même empreinte, aux espaces près
            motif = re.compile(
                r"([Cc]hapitres?)(\s+)" + str(n) + r"\b(?=" +
                r"\s*" + r"\s*".join(re.escape(c) for c in empreinte[:24]).replace(r"\ ", r"\s+") + r")"
            )
            trouves = list(motif.finditer(actuel))
            if len(trouves) != 1:
                print(f"  ? {lecon.relative_to(RACINE)} : « chapitre {n} » + empreinte "
                      f"« {empreinte[:28]}… » → {len(trouves)} correspondance(s)")
                introuvables += 1
                continue
            t = trouves[0]
            actuel = actuel[: t.start()] + f"{t.group(1)}{t.group(2)}{juste}" + actuel[t.end():]
            repares += 1
        if ecrire:
            lecon.write_text(actuel, encoding="utf-8")
        else:
            # en mode rapport, on garde le texte modifié en mémoire seulement
            pass
    print(f"\nréparés : {repares} · déjà justes par coïncidence : {deja} · non retrouvés : {introuvables}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
