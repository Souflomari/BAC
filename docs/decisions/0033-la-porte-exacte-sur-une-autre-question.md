# ADR 0033 — La porte exacte sur une autre question

**Date :** 2026-09-20 · **Statut :** accepté (prolonge ADR 0031, dont il
ne contredit rien) · **Preuves :** `docs/HANDOFF.md` §11.99 à §11.101 ·
**Instruments :** `essai-rouge`, `portee-portes`, `indice-longueur`
(seconde direction), `validate-content` §11.99 et §11.100

## Contexte

ADR 0031 a posé deux règles sur les portes : **une porte doit pouvoir
devenir ROUGE**, et **la PORTÉE d'un mécanisme se mesure séparément de son
bon fonctionnement**. Une journée passée à les appliquer sur nos propres
portes a produit un troisième cas, qu'aucune des deux ne couvre.

Trois façons distinctes pour une porte verte de ne rien garantir :

1. **La porte MORTE.** Son scan ne tourne sur rien — un champ que plus
   aucun fichier ne porte, un glob qui ne résout plus, une extension
   renommée. Elle n'examine aucun fichier et imprime `✓`.
2. **La porte AVEUGLE.** Son scan tourne, mais son motif ne reconnaît plus
   le défaut. Indiscernable d'un corpus propre sans casser quelque chose
   exprès.
3. **La porte EXACTE SUR UNE AUTRE QUESTION.** Elle tourne, elle voit, elle
   dit vrai — mais elle répond à une question plus étroite que celle que
   son nom et son en-tête laissent lire. **C'est le cas nouveau, et c'est
   le plus difficile à repérer, parce qu'il n'y a rien à réparer dans la
   porte.**

## Le cas qui a fait écrire cet ADR

`indice-longueur --porte` garde l'indice **EXPLOITABLE** : la clé est la
plus longue **ET** l'avance dépasse 20 caractères **ET** 20 % du second
choix. Sur tout le corpus : **0 sur 1804**. Vert, et vrai.

Mesuré le même jour, le taux **BRUT** — la clé est strictement la plus
longue, quelle que soit la marge : **42 notions sur 62 au-dessus du
hasard, seize au-dessus de 50 %, une à 79 %.** Le hasard vaut 25 % à
quatre choix.

Plusieurs notions portaient, en commentaire d'auteur, « ÉQUILIBRE DES
LONGUEURS — vérifié par `indice-longueur --porte` ». Vrai du cliquet. Faux
du défaut. Personne n'a menti : la phrase cite exactement ce qui a été
lancé, et ce qui a été lancé a exactement dit ce qu'il mesure.

## Décision

**1. Une porte nomme la question à laquelle elle répond, pas le défaut
qu'elle vise.** Un en-tête qui dit « l'équilibre des longueurs est
vérifié » promet plus qu'un instrument qui compte les avances visibles.
Quand l'écart entre les deux est structurel, il s'écrit dans l'en-tête de
la porte, pas dans la mémoire de qui l'a écrite.

**2. Quand un seul sens se contourne, il en faut deux** (ADR 0031, étendu).
`indice-longueur` garde désormais le taux brut par notion **en plus** de
l'indice exploitable. La tolérance est délibérée — ne crier qu'au-dessus
du hasard ET au-delà de douze points de hausse — parce qu'en dessous le
bruit d'échantillon d'une notion de quinze items dépasse le signal, et
**qu'une porte qui crie pour du bruit finit désarmée**.

**3. Un pourcentage au-dessus du hasard ne prouve pas qu'il y a de quoi
tricher : la MARGE le prouve.** Corollaire mesuré le même jour. L'indice
INVERSE — la clé la plus COURTE — dépassait le hasard dans sept notions,
dont quatre à 31-33 %. De quoi lancer une seconde campagne. Mesuré : **deux
items sur tout le corpus** portent un écart supérieur à quinze caractères.
Tous les autres tiennent entre 2 et 13 % de la longueur de la clé —
invisible. Le taux venait de clés BRÈVES, pas d'un indice. Regarder le
signe sans regarder la marge aurait produit une campagne entière sans
objet.

**4. Deux instruments, parce qu'aucun ne suffit seul.**

| | trouve | coût |
|---|---|---|
| `portee-portes.mjs` | la porte dont le **scan ne tourne pas** | automatique, tout le corpus, une commande |
| `essai-rouge.mjs` | la porte dont le scan tourne mais qui **ne reconnaît pas le défaut** | une mutation écrite à la main par porte |

`portee-portes` lance la porte sous couverture V8 et distingue une branche
d'échec inerte — normale quand rien n'échoue — d'un scan mort, par la
LARGEUR de la région à compteur zéro. `essai-rouge` casse une occurrence,
mesure, et restaure **depuis une copie hors de l'arbre**.

**5. Un essai rouge ne se défait jamais depuis l'index.** `git checkout --`
détruit tout ce qui n'est pas committé dans le fichier. Ce piège est écrit
en HANDOFF §11.97, répété en §11.98, et repris une **troisième** fois en
§11.100. Trois notes n'ont rien empêché ; d'où `essai-rouge.mjs`. **Quand
une règle est reprise trois fois, ce n'est plus la note qu'il faut
réécrire, c'est le geste qu'il faut outiller.**

**6. C'est la porte, et non la passe, qui établit le compte.** Deux fois
dans la même journée, une porte fraîchement armée a trouvé ce que la passe
manuelle qui la précédait avait manqué : dix citations de chemin de plus
après une correction de quarante fichiers que j'avais déclarée close ; une
occurrence au pluriel que ma propre sonde ne cherchait pas. Une passe dit
ce qui a été fait ; une porte dit ce qui reste.

**7. Quand un constat arrive par un échantillon, mesurer le corpus avant
d'en écrire la portée.** Le défaut de longueur m'est venu de deux critiques
de notions **philo**, et le cadrage « les deux notions non sourcées n'ont
jamais reçu la passe de rééquilibrage » était vrai et hors sujet : elles
sont 5ᵉ et 11ᵉ du classement. Le défaut est dominé par **PC** (médiane
45 %, neuf notions au-dessus de 50 %) et **SVT** (médiane 50 %), que
personne n'avait regardées sous cet angle. Philo avait la médiane la plus
BASSE des quatre matières.

## Conséquences

**Faites.** Deux instruments neufs, vérifiés ROUGE et VERT. Trois portes
armées dans `validate-content` (§11.99 renvois morts et couverture nulle
affirmée au présent ; §11.100 séquelles de la passe `R<n>`→chapitre ;
§11.101 seconde direction de l'indice de longueur), chacune rouge-testée
dans toutes ses formes. Un audit de portée sur les 73 points d'échec de
`validate-content` : **zéro porte morte**, chaque portée confrontée à son
dénominateur.

**Payé.** 203 distracteurs rallongés sur vingt notions : seize notions
dépassaient 50 % d'indice brut, **il n'en reste aucune**. Corpus 34 % →
26 %. Aucune clé raccourcie — chaque ajout pousse le modèle faux jusqu'à
une conséquence elle-même fausse, ce qui améliore le diagnostic et fait
disparaître le tell par surcroît.

**Non payé, et dit.** Trente et une notions restent au-dessus du hasard,
aucune au-dessus de 50 %. `pc/suivi-temporel-vitesse` reste à 50 % avec un
écart médian de douze caractères : égaliser ces items ferait descendre un
chiffre sans rien changer pour l'élève. `svt/dysfonctionnements-immunitaires`
porte un indice inverse de 27 %, antérieur à cette passe.

**Cause racine réparée.** `SUMMIT-CONVERSION-RECIPE.md:172` ordonnait
d'écrire dans `coverage_summary.notes` — clé qui n'existe pas. Des auteurs
ont suivi la recette à la lettre et ont produit les renvois morts réparés
notion par notion en §11.99. Réparer le corpus sans réparer la recette
n'aurait garanti que la récidive.

## Rétractations et corrections

**Une, et elle porte sur ma propre lecture de la couverture V8.** La
première version de `portee-portes` annonçait « 72 portes sur 73 jamais
exécutées ». Absurde : une branche d'échec qui ne s'exécute pas signifie
seulement que rien n'a échoué. La deuxième version remontait jusqu'à la
première plage englobante de compteur non nul — et annonçait donc une
portée de **62** pour une porte qui ne regardait **rien**, la remontée
atteignant la boucle par notion. Découverte en tuant une porte exprès avec
`essai-rouge`, écrit une heure plus tôt : l'instrument est resté VERT,
aveugle exactement au défaut qu'il devait voir. Le discriminant correct
est la largeur de la région à zéro.

**Une régression introduite et trouvée par l'instrument.** En corrigeant la
géologie de `CDM-8` — l'exhumation est un soulèvement tectonique ET une
érosion, pas l'érosion seule — j'ai allongé la clé de 201 à 263 caractères
et créé le pire indice de longueur du corpus. La correction de fond était
juste ; son effet de bord n'a jamais été mesuré.
