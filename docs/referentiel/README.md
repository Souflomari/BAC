# Le référentiel officiel du bac (cadres CNEE 2025)

> **Statut : en construction, 2026-10-22.** Ce dossier remplace `docs/cadre/` comme source de vérité
> sur **ce que l'examen national teste**. L'ancien dossier a été écrit avec le cadre 2015 (annoncé à
> tort comme en vigueur et illisible), des sources secondaires, et sous des règles de validation qui
> le laissaient au statut de « proposition ». Il contient des erreurs relevées dans
> [`docs/refonte/01-programme-bac-maroc.md`](../refonte/01-programme-bac-maroc.md) §7.2. Il sera
> archivé quand ce référentiel sera complet et relu.

## Le principe

**Un fichier par document officiel, et seulement ce que le document dit.** Les cadres de
référence 2025 (note ministérielle 013-25 du 5 février 2025, option française) sont des scans ;
ils ont été relus page par page. Chaque capacité y est recopiée **mot pour mot**, avec son numéro
et sa page. Ce que nous en déduisons (limites, exclusions, conseils) vit ailleurs : dans la
[bible](../bible/README.md), étiqueté comme tel.

| Fichier | Document officiel | Filière(s) |
|---|---|---|
| `maths-sm.yaml` | Mathématiques — Sciences Mathématiques A et B | SM-A, SM-B |
| `maths-sexp.yaml` | Mathématiques — Sciences Expérimentales | PC, SVT |
| `pc-pc.yaml` | Physique-Chimie — Sciences Physiques | PC |
| `pc-sm.yaml` | Physique-Chimie — Sciences Mathématiques A et B | SM-A, SM-B |
| `pc-svt.yaml` | Physique-Chimie — « Sciences agricoles », donné pour la filière SVT | SVT |
| `svt-svt.yaml` | SVT — filière Sciences de la Vie et de la Terre | SVT |
| `svt-pc.yaml` | SVT — filière Sciences Physiques | PC |
| `svt-sma.yaml` | SVT — Sciences Mathématiques A | SM-A |
| `examen.yaml` | Règles communes : formule de la note, rattrapage, coefficients, calendrier | toutes |

## Le format d'un fichier de cadre

```yaml
document:
  titre: "Cadre de référence de l'examen national du baccalauréat — …"   # tel qu'imprimé
  annee: 2025
  note_ministerielle: "013-25 du 5 février 2025"
  pages: 23
  source: "https://drive.google.com/file/d/<id>/view"
  lu_le: "2026-10-22"
  lecture: "lecture visuelle des pages scannées"
filieres: [svt]                 # sm-a | sm-b | pc | svt
matiere: svt                    # maths | pc | svt

epreuve:                        # tout ce que le document dit de l'épreuve, avec la page
  duree_h: 3
  coefficient: 7                # si le document l'indique ; sinon absent (voir examen.yaml)
  materiel: "calculatrice non programmable, papier millimétré"
  structure:                    # parties, exercices, points, telles qu'imprimées
    - { partie: "I", points: 5, contenu: "…", page: 23 }
  habiletes:
    - { nom: "…", poids: 25, page: 20 }

domaines:
  - id: "1"                     # numérotation du document ; à défaut, ordre d'apparition (noté)
    nom: "…"                    # mot pour mot
    poids: 17                   # % du document (recouvrement ou tableau de spécification), avec la page
    poids_page: 8
    sous_domaines:
      - id: "1.1"
        nom: "…"
        capacites:
          - id: "1.1.1"
            libelle: "…"        # MOT POUR MOT, coquilles du document comprises (signalées par [sic])
            page: 3
            notions_app: [liberation-energie-matiere-organique]   # dossiers content/ qui la couvrent, ou []

programme:                      # si le document annexe le programme (cas de la PC) : chapitres et TP
  - { domaine: "…", chapitre: "…", page: 20 }

notes_de_lecture:               # passages illisibles, ambiguïtés, numérotation reconstituée
  - "…"
```

**Les cadres de PC** numérotent domaines, sous-domaines et chapitres, mais pas les capacités : leurs
fichiers ajoutent un niveau `chapitres:` entre sous-domaine et capacités, et l'identifiant a quatre
chiffres (exemple : `pc-pc 1.3.1.7` = domaine · sous-domaine · chapitre · rang de la puce). Les cadres
de SVT ne numérotent pas non plus les capacités : le troisième chiffre y est l'ordre d'apparition.

**Règles.** Rien d'inventé : un champ que le document ne donne pas est absent, pas deviné. Une
lecture incertaine porte `incertain: true`. Les capacités gardent la numérotation du document ;
c'est elle qui sert d'identifiant partout ailleurs (exemple : `svt-svt 2.3.1`), dans la bible, les
leçons et les exercices.

## Ce qui en dépend

- La [bible du bac](../bible/README.md) cite les capacités par leur identifiant.
- L'application ([`web/src/lib/curriculum.ts`](../../web/src/lib/curriculum.ts)) a aujourd'hui sa
  propre liste, recopiée à la main. Elle devra être générée depuis ce référentiel (phase 2 du
  [plan de refonte](../refonte/00-plan.md)), après relecture par le propriétaire.
