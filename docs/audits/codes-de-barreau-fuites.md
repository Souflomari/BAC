# Les codes de barreau qui fuient — mesure, correctif, et ce qui reste

> **Écrit le 2026-09-04.** Ce document mesure une classe de défaut que le
> dépôt avait déjà jugée, nommée et déclarée corrigée en juillet 2026 — et
> qui vit toujours à 1 122 exemplaires. Il dit ce qui a été réparé
> aujourd'hui, ce qui ne l'a pas été, et pourquoi la distinction compte.

## 1. Le fait vérifiable

Un barreau (« rung ») est une section de leçon. Il est authoré ainsi :

```
## R3 — Le théorème de Bézout
```

**L'élève ne voit jamais le code.** `LessonRenderer.tsx` (`stripRungPrefix`,
l. 52-70) retire le préfixe `R<n> — ` des titres h2 et h3 ; le code ne
survit que dans un attribut `data-rung` invisible. `lib/chapters.ts`
(`RUNG_PREFIX_RE`, l. 28) fait la même chose pour le libellé du rail. Les
deux le disent en toutes lettres dans leur documentation :

> *« Full heading title as authored, minus any `R<n> — ` prefix. »*

Donc toute phrase de la forme « le théorème de Bézout (R4) », « la
situation de R0 », « montré au R2 » **renvoie à une étiquette qui n'existe
nulle part à l'écran.** Un élève qui cherche « R4 » ne le trouvera pas.

## 2. Ce n'est pas une règle nouvelle

L'audit externe de juillet 2026 a classé exactement cela — item 5.1,
*authoring text leaking*. La passe adversariale qui a suivi le correctif a
trouvé cinq classes résiduelles, dont la cinquième :

> *« dangling "en R1/R2" cross-refs in rlc prose and a derivation note
> pointing at labels no student can see. »*

Et le correctif a été déclaré au niveau de la classe :

> *« ALL FIVE fixed: … h3 renderer now strips R-codes like h2; ramp table
> renumbered 1–7; SVG citations removed; prose refs rewritten to visible
> referents. »*

Une amendement de la bible avait même été écrit à cette occasion : **des
classes, pas des instances** (§13).

## 3. Ce que la mesure montre, deux mois plus tard

Le correctif a nettoyé **ce qu'on regardait** : les titres, le tableau de
barème, la prose d'UNE notion (rlc-serie), et les notes « (§0.4) » des cinq
SVG de mouvement. Trois couches ne l'ont jamais été.

| Couche | Occurrences | État au 2026-09-04 |
|---|---:|---|
| Texte rendu des SVG statiques | **47** | **CORRIGÉ ce jour** |
| Slugs de fichier cités dans le texte rendu | **3** | **CORRIGÉ ce jour** |
| Prose des leçons (hors titres, hors commentaires) | **1 122** | **OUVERT** |

La mesure de la prose exclut les titres `##`/`###`/`####` (le rendu y
retire le code), les commentaires d'auteur `<!-- … -->` et les blocs de
code. Elle porte sur **56 des 62 leçons**.

### La rangée de pastilles

Le cas le plus visible n'était pas une parenthèse discrète. La carte de
méthode de philo (`content/philo/analyse-de-texte/media/carte-methode.svg`)
affichait, au milieu de chacune de ses quatre cartes, **une pastille
encadrée** portant « R2 », « R1 · R3 · R4 », « R5 », « R6 ». Un élève qui
prépare l'épreuve de philosophie lisait donc, sous le nom arabe de chaque
moment de la dissertation, un code qu'aucune page du site ne définit. Les
pastilles sont retirées ; les cartes ont été resserrées pour ne pas laisser
le trou qu'elles occupaient.

### Ce qui a été rendu à sa place

Aucun renvoi n'a été simplement supprimé quand il portait du sens. Le
principe suivi est celui du correctif de juillet : **remplacer par un
référent visible.**

- « (déjà décomposé au R3) » → « (déjà décomposé plus haut) »
- « même bille qu'en R7 » → « même bille que dans l'exemple travaillé »
- « R1 : la direction de M se lit par l'angle θ » → « la direction de M se
  lit par l'angle θ » (le sous-titre se suffit)
- « frontière de plaque (R5) — coïncide avec les lignes » → « frontière de
  plaque — coïncide avec les lignes »
- « cf. modulation-amplitude et R1/R3 » → la note dit ce qu'elle doit dire
  sans renvoyer à un fichier ni à un code : « en réalité fp ≫ fsignal »

Les `aria-label` sont traités comme du texte rendu : ils sont lus à voix
haute. Quatre en portaient (`factorisation-360`, `famille-solutions`,
`euler-taille-de-pas`, `rendement-esterification`, plus le pedigree), ainsi
que le registre d'aria de `NotionBody.tsx`.

## 4. L'exception, et pourquoi elle est dite

En électricité, `R0`, `R1`, `R2` sont des **noms de composants**.
`content/pc/dipole-rl/media/rl-schema.svg` étiquette son résistor `R0`, et
la leçon l'appelle ainsi. Une porte ne peut pas distinguer seule un renvoi
d'un nom de composant : la figure déclare donc, en commentaire XML,
`CODES R LÉGITIMES:` suivi de la raison — sur le modèle des blocs
`COULEURS SÉMANTIQUES:` du contrat de couleur.

C'est le seul fichier du corpus à en avoir eu besoin.

## 5. La porte

`validate-content.mjs` refuse désormais tout `R<n>` dans le **texte rendu**
d'un SVG : contenu des `<text>` et `<title>`, plus l'`aria-label` de la
racine. Les commentaires d'auteur sont explicitement hors champ — c'est là
que doit vivre l'information « cette figure sert le R2 », et c'est utile.

Testée dans les deux sens le jour de son écriture :

```
état réel                → 0 failure(s) across 62 dir(s)
« (cf. R4) » injecté     → ✗ media/vecteur-vitesse-tangente.svg
                             code(s) de barreau dans le texte rendu : R4
```

La porte a d'ailleurs trouvé, à sa première exécution, **deux occurrences
que le balayage à la main avait manquées** — un `R1` dans un second `<title>`
du pedigree, et le `R0` légitime du schéma RL. C'est la démonstration
ordinaire qu'un grep d'humain n'est pas une porte.

## 6. Ce qui reste ouvert — et pourquoi il n'a pas été fait aujourd'hui

**1 122 renvois dans la prose de 56 leçons.** Répartition (extrait) :

| Leçon | Occurrences |
|---|---:|
| philo/theorie-experience | 69 |
| philo/la-personne | 50 |
| philo/la-violence | 50 |
| philo/le-droit-la-justice | 49 |
| philo/la-verite | 47 |
| philo/l-histoire | 43 |
| svt/moyens-de-defense | 38 |
| maths/fonction-exponentielle | 37 |
| maths/suites-numeriques | 37 |
| … 47 autres leçons | … |

Ce n'est pas un correctif mécanique. « Reviens à la situation de R0 »
devient « reviens à la scène d'ouverture » ; « le théorème de Bézout (R4) »
devient « le théorème de Bézout (vu plus haut) » — mais « ce que R1 a
présenté » demande de savoir ce que R1 présentait, donc de lire la section.
Un `sed` produirait 1 122 phrases plausibles et quelques dizaines de
contresens, et personne ne saurait lesquels.

**La porte n'a donc PAS été étendue à la prose** : elle échouerait
immédiatement sur 56 leçons et il faudrait la désarmer, ce qui est la
manière ordinaire de perdre une porte. Elle sera étendue quand la campagne
de réécriture sera faite — et pas avant.

**Une précaution avant de lancer cette campagne :** vérifier auprès de
l'owner que les codes de barreau doivent bien rester invisibles. Le
correctif de juillet a tranché dans ce sens, mais l'autre sortie existe —
rendre les codes visibles (une puce « R4 » à côté du titre) rendrait
d'un coup les 1 122 renvois corrects. Ce serait un choix de produit, pas
un correctif : à l'owner de le poser.

## 7. Rectifications et corrections

- *Sur ce document même* : la première mesure de la prose annonçait 1 135
  occurrences. Elle comptait des notes d'auteur situées dans des blocs
  `<!-- … -->` multi-lignes, que le filtre ligne-à-ligne ne voyait pas. La
  mesure refaite en retirant les commentaires du fichier entier donne
  **1 122 occurrences rendues, dans 56 leçons** (et non 58). C'est ce
  chiffre qui fait foi.
- Le premier inventaire des SVG annonçait 47 occurrences ; la porte en a
  trouvé 2 de plus au premier passage (§5). Le total réellement traité est
  donc de **49**.
