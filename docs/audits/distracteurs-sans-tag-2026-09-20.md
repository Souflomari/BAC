# Les 111 distracteurs sans tag — ce qu'il faut décider, notion par notion

**2026-09-20.** Mesuré avec `node web/scripts/couverture-diagnostique.mjs --detail`.
Contexte et principe : `docs/HANDOFF.md` §11.102.

## Le fait, en une ligne

**111 distracteurs ne portent aucun `misconception:`. Les 111 portent un retour
écrit qui NOMME l'erreur.** L'élève reçoit l'explication ; le modèle d'apprenant
ne voit rien passer.

| notion | sans tag | familles déclarées |
|---|---:|---:|
| `maths/probabilites-conditionnelles` | 34 | 8 |
| `maths/denombrement` | 26 | 5 |
| `pc/rlc-serie` | 23 | 9 |
| `maths/limites-continuite` | 17 | 13 |
| `pc/atome-mecanique-newton` | 4 | — |
| `maths/fonction-logarithme` | 4 | 7 |
| `pc/systemes-oscillants` | 3 | 13 |

## La distinction qui commande la décision

Deux causes très différentes produisent le même `null`, et elles n'appellent pas
le même geste :

- **(A) Le tag est simplement oublié** — une famille déclarée décrit exactement
  l'erreur. Geste : taguer. Mécanique, sans arbitrage.
- **(B) La famille n'existe pas** — l'erreur est réelle, récurrente, bien
  décrite par son retour, et aucune famille déclarée ne la nomme. Geste :
  **déclarer la famille**, puis taguer. Ce n'est pas mécanique : une famille est
  une étiquette que le produit montrera à un élève.

**Ne jamais résoudre un (B) par un (A).** Forcer un distracteur dans la famille
la moins éloignée fait taire l'instrument en rangeant le défaut là où plus
personne ne le regarde — c'est le « vert acheté » de §11.69.

---

## `pc/rlc-serie` — 23 — majoritairement (A), le moins cher à traiter

Neuf familles déclarées couvrent, à la lecture des retours, la plus grande part
des 23. Correspondances qui sautent aux yeux :

| distracteurs | famille déclarée qui les décrit |
|---|---|
| RLC-M1-1/D, M4-3/D, R9-1/D, cp-r3-m1/D — « $T_0$ change si on change $R$ » | `T0-depend-de-R` |
| RLC-M2-1/D, M2-2/C, M7-1/D, M7-2/D — répartition d'énergie C/L | `confusion-roles-C-L-stockage` |
| RLC-M2-3/C — énergie totale conservée avec $R \neq 0$ | `energie-consommee-non-conservee` |
| RLC-M6-2/D — cosinus d'amplitude constante en régime amorti | `cas-amorti-solution-sinusoidale-fermee` |
| RLC-M8-1/C, M8-2/C, cp-r7-m8/C — le générateur « augmente » $R$ au lieu de le compenser | `entretien-est-regime-force` |

**Candidat (B) :** « $R$ n'a aucun effet » (RLC-M1-3/D, M3-1/D). La famille
`plus-de-R-oscille-plus-vite` décrit un effet MAL ORIENTÉ, pas un effet NIÉ.

**Recommandation : commencer par cette notion.** Vérifier chaque correspondance
contre la `description` de la famille — c'est exactement ce contrôle qui a
montré, sur `systemes-oscillants`, qu'une note d'en-tête affirmait une exemption
que l'inventaire démentait.

---

## `maths/denombrement` — 26 — franchement (B) : deux familles manquent

Cinq familles déclarées, toutes sur le choix de l'outil (additif/multiplicatif,
base/exposant, ordre, remise, probabilité). **Aucune ne décrit les deux erreurs
qui dominent les 26.**

**Famille manquante 1 — « produit incomplet : un facteur oublié » (~11).**
DENOMB-1/C, 1/D, 2/D, 4/B, 7/D, 8/D, 9/B, 10/C, 10/D, 11/C, 11/D. L'élève ne
multiplie qu'une partie des choix : « ne retient que le nombre d'entrées, en
oubliant que chaque entrée peut être associée à n'importe lequel des 3 plats ».
Ce n'est pas `additif-vs-multiplicatif` — il multiplie bien, il en oublie un.

**Famille manquante 2 — « propriétés du coefficient binomial mal appliquées » (~8).**
DENOMB-20/B, 20/C, 20/D, 21/C, 21/D, 22/B, 22/C, 22/D. Symétrie confondue avec
une différence ($\binom{12}{7} = 12-7$), Pascal soustrait au lieu d'additionner,
$\binom{9}{0}$ pris pour $0$ ou pour $9$ ou déclaré indéfini. **L'inventaire ne
mentionne pas une seule fois le coefficient binomial.**

Les deux dépassent largement le plancher de trois. **C'est la notion où le trou
d'inventaire est le plus net.**

Reste (~7) : permutation totale là où l'arrangement est partiel (DENOMB-3/D,
14/D, 4/D, 16/C — $n!$ au lieu de $A_n^p$), plus quelques cas isolés.

---

## `maths/probabilites-conditionnelles` — 34 — (B), une famille vaut douze

Huit familles déclarées, toutes sur la structure conditionnelle. **Aucune ne
décrit « rendre une valeur de l'énoncé au lieu de calculer » — douze
distracteurs**, quatre fois le plancher : « Ce choix retourne $P(M)=0{,}01$, la
prévalence de la maladie, sans tenir compte du résultat du test. »

**Second candidat (~10) — « opération arithmétique sans sens probabiliste » :**
différence ($|P(A)-P(B)|$), moyenne ($(0{,}4+0{,}5)/2$), produit au lieu de
quotient. Retours explicites : « qui n'a pas de signification probabiliste ici ».

---

## `maths/limites-continuite` — 17 — mixte, et une famille d'un genre différent

Treize familles déclarées, toutes sur les limites, la continuité, le TVI et la
trigonométrie. Les erreurs sans tag, elles, sont souvent **algébriques** :

- **« erreur de factorisation » (3)** — LIMCONT-3/D, 21/D, cp-r3-factorisation/D :
  $x^2-9=(x-3)\times x$. Rien à voir avec une limite ; c'est ce qui empêche d'en
  calculer une.
- **« recopie le résultat d'un autre exemple » (2)** — LIMCONT-4/D, 18/B : « C'est
  le résultat d'un autre exemple de la leçon, recopié sans refaire le calcul. »
  Famille d'un genre différent — une erreur de MÉTHODE DE TRAVAIL, pas de
  concept. À arbitrer : le produit veut-il la nommer à l'élève ?
- **« une table numérique prouve / ne prouve pas » (2)** — LIMCONT-9/C, 9/D, les
  deux excès symétriques.

Plusieurs (A) probables : LIMCONT-12/C et 12/D → `limite-laterale-non-verifiee` ;
14/B et 14/C → `parite-signe-terme-dominant-mal-geree` ; 18/C →
`definition-continuite-mal-appliquee`.

---

## `maths/fonction-logarithme` — 4 — ni (A) ni (B) : à laisser

Les quatre sont des **leurres de LECTURE** sur un texte historique à propos des
tables de logarithmes — « on ne peut rien conclure sans $L(2)$ », « la table
donne directement le produit sans calcul ». Les sept familles déclarées sont
toutes des règles de calcul. Déclarer une famille « lecture de texte » pour
quatre distracteurs de deux items serait disproportionné, et les forcer dans
`regles-quotient-puissance` serait faux.

**Recommandation : les laisser sans tag, et l'écrire dans le fichier** — comme
c'est désormais fait sur `systemes-oscillants` pour ses leurres de frontière. Un
`null` expliqué n'est pas le même objet qu'un `null` oublié.

---

## `pc/systemes-oscillants` — 3 — déjà tranché

Les trois restants (SO-26/D, cp-r6-regimes/D, SO-27/D) sont des **leurres de
frontière** : ils tentent l'élève avec ce que le programme exclut — une
pseudo-période fermée $T=f(m,h,k)$, un régime « forcé » importé du chapitre
suivant. Laissés sans tag délibérément, avec la raison écrite en tête de
`checkpoints.yaml`. Les trois autres de cette notion ont été tagués le
2026-09-20 (`M-OSC-LIBRE-1`) après avoir mesuré que la note qui les exemptait
reposait sur une prémisse fausse.

---

## Ordre suggéré

1. **`pc/rlc-serie`** — majoritairement (A), donc le gain le plus rapide. Vérifier
   chaque correspondance contre la `description` de la famille, jamais contre son
   libellé seul.
2. **`maths/denombrement`** — déclarer les deux familles manquantes, puis taguer.
   Le trou d'inventaire le plus net du corpus.
3. **`maths/probabilites-conditionnelles`** — déclarer « rendre une valeur de
   l'énoncé », puis reprendre les ~10 « opération sans sens ».
4. **`maths/limites-continuite`** — trancher d'abord si une erreur de méthode de
   travail (« recopie un autre exemple ») a sa place dans un inventaire de
   misconceptions. C'est une question de produit, pas de contenu.
5. **`maths/fonction-logarithme`**, **`pc/systemes-oscillants`** — écrire le motif
   du `null`, ne pas taguer.

**Le plancher bouge.** Toute famille déclarée naît à zéro item : `floor_met`
passe à `false` tant que trois items ne la portent pas. Les quatre familles
recommandées ici sont toutes portées par huit à douze distracteurs, donc le
plancher est franchi dès le premier passage — à condition de déclarer ET taguer
dans le même geste, jamais l'un sans l'autre.
