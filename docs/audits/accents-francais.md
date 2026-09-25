# Les accents perdus — le corpus écrivait « theoreme » et « egalite verifiee »

*Mesuré et corrigé le 2026-09-05. Instruments : `web/scripts/accents-manquants.mjs`
(sonde + porte), `scripts/accents-francais.py` (réparation). Corpus : 65 pages
rendues, 94 fichiers de contenu.*

---

## L'angle mort

`typo-francaise.mjs` vérifie la **ponctuation** du texte rendu : apostrophes
droites, espaces manquantes devant `; : ?`, guillemets mal espacés. Il ne
regarde pas les **lettres**.

Or à côté d'une prose soignée, le corpus contenait des passages entiers écrits
sans le moindre accent :

> « Reduction au meme denominateur x. »
> « L'eleve croit que la recurrence d'Euler resout exactement l'equation
>   differentielle, quel que soit le pas. »
> « Hypothèse de Rolle verifiee sur [0,2]. »

Ces phrases sont rendues à l'élève au même titre que le reste : dans les
libellés d'items, dans les titres d'exercices de la banque, dans les notes
d'une dérivation.

## Pourquoi c'est un défaut, et pas une coquetterie

1. **Un élève marocain de terminale composera EN FRANÇAIS et sera noté
   dessus.** Un support de révision qui écrit « theoreme » lui enseigne une
   orthographe fausse aussi sûrement qu'il lui enseigne le théorème.
2. **Un produit qui n'accentue pas sa propre langue se lit comme un
   brouillon.** La confiance se perd là, avant tout argument pédagogique — et
   la vision engage un tuteur, pas un polycopié photocopié.
3. **Effet de bord mesuré :** un corpus désaccentué rend aveugles les outils
   qui cherchent du français. La régénération de `lectures-graphiques.md`
   après la campagne fait remonter une entrée de 16 à 17 mentions — un
   « d'apres la figure » devenu détectable. L'inventaire K-8 comptait par
   défaut, et personne ne pouvait le savoir.

## Ce qui a été trouvé, et où

La mesure au **rendu** était nécessaire. La source contient des milliers
d'occurrences de plus, mais l'essentiel dort dans des champs que l'élève ne
voit jamais (`description` d'une misconception, commentaires de travail). Une
campagne pilotée par le nombre de la source aurait passé son temps au mauvais
endroit.

| | occurrences |
|---|---:|
| Texte **rendu**, 65 pages, avant | **128** |
| Texte **rendu**, après | **0** |
| Corrections appliquées à la **source** | **4 060** dans 94 fichiers |

Sites de rendu touchés : les libellés d'items (`span.math-text`, 115) et les
titres d'exercices de la banque (`button.group`, 11).

## La règle d'admission, qui est tout le sujet

L'outil ne corrige **que** des mots dont la forme non accentuée **n'est pas un
mot français**. « theoreme » ne peut être que « théorème ». Sont exclus, et
l'exclusion est la partie importante : **« cote »** (une cote, une côte, un
côté), **« des »** (des / dès), **« sur »** (sur / sûr), **« ou »** (ou / où),
**« a »** (a / à), **« croissante »** et **« suivante »** (qui ne portent
aucun accent).

Les mots dont la **correction** dépend du sens — « eleve » (élève / élevé),
« verifie » (vérifie / vérifié), « separe » (sépare / séparé) — sont soit
tranchés par une **règle de contexte écrite explicitement** (`on verifie` est
un verbe, `domaine verifie` un participe), soit **listés pour relecture
humaine**. Jamais devinés : une faute d'accord introduite par un outil est
pire que la faute d'accent qu'il répare.

Une liste de mots a d'abord été **déduite du corpus** — pour chaque mot,
comparer la forme nue et les formes accentuées, ne retenir que celles où
l'accentuée écrase la nue et où il n'existe qu'une seule forme accentuée. Le
corpus se corrige alors avec sa propre orthographe majoritaire. Deux candidats
ont été **écartés à la relecture** : « these » et « evidence », qui sont aussi
des mots anglais, et le corpus en contient. Un outil qui les aurait accentués
aurait cassé de l'anglais correct pour réparer du français absent.

## Trois pièges, chacun attrapé avant écriture

**1. Les identifiants.** Une première version réécrivait
`mc.philo.etat.coup-etat-detruit-appareil` en accentuant « etat » — une clé
référencée ailleurs. Le dry-run l'a montré : **136 fausses corrections dans un
seul fichier de philo, zéro écriture**. Le script ne lit plus les lignes de
clés techniques ni les commentaires.

**2. Le point.** Il sépare les segments d'un identifiant (`mc.philo.etat`) ET
termine les phrases. En l'excluant des deux côtés, l'outil ne corrigeait plus
**aucun mot en fin de phrase** — « frottements negliges. » restait intact
pendant que le compteur affichait zéro. **C'est le test de la porte qui l'a
révélé, pas la lecture du code.** La borne distingue désormais un point suivi
d'une lettre (identifiant, bloque) d'un point suivi d'une espace (ponctuation,
laisse passer).

**3. Les formules à cheval sur deux lignes.** Dans un bloc plié YAML,
`$v_i=2{,}0\` ouvre sur une ligne et se ferme sur la suivante : une analyse
ligne à ligne décale le découpage prose/maths et peut réécrire ce qu'elle
croyait être de la prose. L'invariant « les segments mathématiques ressortent
identiques au caractère près » a **bloqué l'écriture**. La réparation a été de
segmenter le fichier entier — pas de contourner l'invariant.

Le français **dans `\text{…}`** est corrigé, lui : KaTeX y rend de la prose que
l'élève lit comme le reste de la phrase, et il accepte les lettres accentuées
sans difficulté (ce sont les espaces insécables qu'il refuse, pas les lettres).

## Une source unique pour la liste

La sonde et le script de réparation lisent le **même** fichier
`web/scripts/accents.mots.json`, exporté par le script Python. La raison est un
défaut mesuré : au premier test négatif, la sonde ne connaissait que **130
formes** quand la réparation en connaissait **600** — sur trois mots sabotés
volontairement, elle n'en voyait qu'un. Deux listes tenues à la main dans deux
langages divergent toujours, et **une porte plus étroite que la réparation
déclare propre ce qu'elle ne sait pas voir**.

Le premier élargissement de la liste a d'ailleurs produit l'erreur inverse :
en y versant les formes « ambiguës », il a fait crier la sonde sur onze leçons
parfaitement écrites — « on multiplie », « la formule relie », « on
simplifie » sont du français correct. Le critère n'est pas « le corpus contient
aussi une forme accentuée » mais « la forme nue n'existe pas en français ».

## Ce que la porte ne dit pas

- **Les mots dont la forme nue EST du français.** Hors champ par construction,
  et c'est ce qui la rend tenable.
- **Les fautes d'accord et de conjugaison.** « deux choses different » a bien
  été trouvé dans `philo/l-etat` et corrigé en « deux choses différentes » —
  mais parce que « different » figurait dans la liste, pas parce qu'un outil
  sait accorder.
- **La source non rendue.** Les champs `description` des misconceptions et les
  notes de banque qui n'apparaissent sur aucune page restent partiellement
  désaccentués. C'est une dette bornée et connue, sans effet sur l'élève.

## Lancer les instruments

```
# mesurer / garder (au rendu)
node web/scripts/accents-manquants.mjs --porte <routes…>

# réparer à la source
python3 scripts/accents-francais.py --verifier <fichiers…>   # ne réécrit rien
python3 scripts/accents-francais.py --ecrire   <fichiers…>
python3 scripts/accents-francais.py --exporter web/scripts/accents.mots.json
```
