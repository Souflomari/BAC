# NORTH-STAR v2 — ce qu'on construit, et la règle qui l'empêche de dériver

**Date :** 2026-08-15 · **Statut :** cadre arrêté par l'owner, remplace
l'orientation produit précédente. Écrit en une heure, avant le prototype,
pour que Fable exécute depuis un cadre net.

---

## 0. Le constat qui déclenche tout

62 notions, 313 000 mots, 1 347 items, 207 exercices. Toutes les portes
au vert : `dom-truth 176/0`, `validate --strict` sans faute,
`bank-fidelity` conforme. **Et le produit rate sa cible.**

C'est le fait le plus important du projet. Il n'a pas été raté par
négligence : il a été raté *parce que* les portes étaient vertes. Toutes
mesurent la CONFORMITÉ (le sourcing est-il correct, le DOM correspond-il
au spec, les nombres correspondent-ils à la banque, la mise en page
tient-elle). **Aucune ne demande si un élève apprend.**

Preuve à charge, la plus nette : 53 scènes d'explication ont été
auditées et déclarées conformes. 21 d'entre elles ne dessinent rien —
en géométrie dans l'espace, les seules formes tracées sont 34 cadres
autour de texte. L'audit vérifiait que les maths étaient justes et que
les cadres ne se chevauchaient pas. Il n'a jamais demandé si la scène
enseignait. **Le vérificateur avait le même défaut que les portes.**

Corollaire, et c'est la leçon à retenir : *une barre de qualité qui peut
être satisfaite sans qu'un élève comprenne quoi que ce soit finira par
l'être.*

---

## 1. Le nord absolu, reformulé

> Un élève marocain de 2ème bac, **qui n'a pas les bases**, ouvre l'app
> et devient capable de faire l'exercice qu'il ne savait pas faire — en
> le faisant, pas en lisant qu'on le fait.

Trois mots portent tout le poids :

- **qui n'a pas les bases** — l'app descend jusqu'à la lacune réelle,
  fût-elle au collège. C'est précisément ce que fait le prof
  particulier qu'on remplace : il ne récite pas le cours, il remonte le
  fil jusqu'à l'endroit où ça a cassé.
- **en le faisant** — l'élève agit à chaque écran. S'il n'y a rien à
  faire, ce n'est pas un écran, c'est un manuel.
- **l'exercice qu'il ne savait pas faire** — la preuve est un geste
  réussi, pas un temps de lecture ni un nombre de pages vues.

### Ce qu'on n'est pas

Un manuel. Un corrigé. Une chaîne YouTube. Ces trois choses existent
déjà, gratuitement, et l'élève les a déjà — c'est en les jugeant
insuffisantes qu'il vient ici.

---

## 2. L'atome : la chaîne, pas la notion

L'ancien atome était `notion → leçon de 5 000 mots → items → corrigés`.
C'est la forme d'un manuel scolaire, et c'est la cause structurelle du
problème : on ne peut pas rendre une leçon de 5 000 mots « interactive »
en la décorant.

Le nouvel atome est la **chaîne de compétences** : une compétence bac,
et derrière elle la suite ordonnée des compétences dont elle dépend,
jusqu'au collège si nécessaire.

```
nombre dérivé (bac)
  ← pente de la tangente
    ← la sécante quand les points se rapprochent
      ← pente d'une sécante entre deux points
        ← taux de variation
          ← pente d'une droite  (collège)
            ← lire des coordonnées  (collège)
```

L'élève n'entre pas par le haut. Il entre par un **diagnostic court qui
trouve où la chaîne casse pour LUI**, puis remonte de là. Deux élèves
avec le même objectif bac peuvent commencer à deux endroits différents ;
c'est le cœur du dispositif, pas une option.

**Une compétence = 15 à 25 écrans de 30 à 60 secondes.** Pas un
chapitre.

---

## 3. L'écran : une décision, une seule

L'unité de contenu n'est plus le paragraphe, c'est l'écran :

1. **Une figure ou un manipulable** — c'est elle qui porte l'idée.
2. **Deux phrases maximum** — la prose légende, elle n'enseigne pas.
3. **Une chose à faire** — glisser, placer, choisir, saisir un nombre.
4. **Une réponse à l'erreur commise** — pas « faux », mais *pourquoi
   ce raisonnement-là* mène à ce résultat-là.

Le point 4 est le plus coûteux et le plus décisif : c'est ce qui
distingue un exercice d'un tuteur. On a déjà la matière — les 1 347
items portent un `primary_misconception` et un feedback par distracteur
qui explique l'erreur précise. C'est l'actif le plus sous-exploité du
dépôt.

### La composition, qui n'est pas de la décoration

La première version du prototype respectait les quatre points ci-dessus
et ratait quand même sa cible, parce qu'elle les EMPILAIT : figure,
puis texte, puis boutons, puis — tout en bas, en petit — la réponse à
l'erreur. Verdict de l'owner : « les explications sont écrites petit à
la fin, elles ne prennent pas l'écran ». Trois règles en sont tirées, et
elles valent pour toute chaîne future :

- **La figure ne quitte pas le champ de vision.** Elle est collante.
  Lire pourquoi on s'est trompé pendant que la figure qui le montre est
  passée sous le pli, c'est revenir à une illustration décorative.
- **La réponse à l'erreur a la taille d'un texte qu'on lit**, pas d'une
  note de bas de page. C'est le moment où on enseigne ; il occupe la
  place que ça mérite.
- **Le mouvement porte l'idée ou n'existe pas.** La droite d'une réponse
  fausse ne surgit pas à sa place : elle part de la bonne et s'en écarte
  sous les yeux de l'élève. L'écart est PARCOURU. Une animation qui
  n'enseigne rien est du bruit, et le cœur calme l'interdit.

---

## 4. LA RÈGLE — ce qui remplace les portes vertes

Vérifiable mécaniquement, et volontairement dure. Un écran qui la viole
n'est pas « à améliorer », il n'est pas livrable.

| # | Règle | Comment on la vérifie |
|---|---|---|
| R1 | **Zéro écran sans interaction.** | Chaque écran déclare une action ; un écran sans action échoue au build. |
| R2 | **≤ 2 phrases visibles à la fois.** | Compteur de phrases sur le texte de l'écran. |
| R3 | **Chaque erreur prévue se MONTRE sur la figure.** | Toute réponse fausse porte de quoi être tracée (`montre`), ou déclare explicitement pourquoi elle n'est pas traçable. Un feedback écrit seul ne satisfait plus la règle : il accompagne ce que la figure a rendu visible. |
| R4 | **Aucun prérequis supposé sans être testé.** | Toute compétence cite ses parents dans la chaîne ; le diagnostic couvre la chaîne. |
| R5 | **La figure porte l'idée, pas la prose.** | Un écran dont on retire la figure doit devenir incompréhensible. Jugement humain, une fois par compétence. |

R1–R4 sont automatisables. R5 ne l'est pas, et c'est voulu : il reste un
jugement humain par compétence — c'est le trou qu'avaient toutes les
portes précédentes, on ne le rebouche pas avec une régression.

---

## 5. Ce qu'on garde du corpus existant

Matière première, jamais produit fini :

- **Les 1 347 items misconception-mappés** — le carburant du point 3.4.
  Le travail le plus précieux du dépôt, et le moins exploité.
- **Les 207 exercices de bac transcrits et vérifiés** — durs à sourcer,
  vérifiés en adversarial. Ils deviennent la CIBLE d'une chaîne (« tu
  sais maintenant faire celui-ci »), pas le contenu.
- **Le système de design, la coquille calme, StagedFigure** — le
  substrat interactif fonctionne ; 235 figures l'utilisent déjà.

Ce qui n'est pas repris : les 313 000 mots de prose de leçon. Non
qu'ils soient faux — ils sont justes — mais leur FORME est ce qui est
rejeté.

---

## 6. Le périmètre, honnêtement

3 à 5 chaînes portées au niveau visé. Pas 62 notions. On saura alors ce
que coûte réellement UNE chaîne réussie — chiffre qu'on ignore
aujourd'hui, et sans lequel toute planification est de la fiction.

Première chaîne, choisie par l'owner : **les dérivées**, de la pente au
collège jusqu'au nombre dérivé. C'est le plus gros morceau du bac, tout
le programme d'analyse en dépend, et c'est là que le plus d'élèves
décrochent.

---

## Retractions and Corrections

- **2026-08-15 — R3 renforcée.** Première rédaction : « chaque réponse
  fausse porte son feedback ». Trop faible : elle était satisfaite par de
  la PROSE, alors que la prose est précisément ce que l'owner rejette. Le
  prototype a passé la règle 4/4 tout en donnant, selon lui, « encore
  l'impression d'un quiz ». Une règle qui peut être satisfaite sans que
  l'élève VOIE son erreur finira par l'être — c'est la leçon des portes
  vertes, reproduite en petit.
- **2026-08-15 — §3 complété par « la composition ».** Première
  rédaction : l'écran était défini par ses quatre ingrédients (figure,
  deux phrases, une action, une réponse à l'erreur). Insuffisant : le
  prototype les avait tous les quatre et ratait quand même, parce que
  leur DISPOSITION renvoyait la réponse à l'erreur en bas de page et
  faisait sortir la figure du champ dès qu'on défilait. Une règle qui
  énumère des ingrédients sans dire comment ils occupent l'écran laisse
  passer un manuel mis en page verticalement.
- **2026-08-15 — le rythme est une propriété de la chaîne, pas de
  l'écran.** L'écran « en rapprochant B de A, que fait la pente ? »
  respectait R1–R4 et restait infranchissable, parce qu'il introduisait
  la courbe, la notation f(x), les points A et B, la sécante ET le
  passage à la limite d'un seul coup. Aucune des quatre règles ne mesure
  ça. Le correctif a été de découper (deux écrans insérés), pas de
  réécrire l'écran — mais rien ne garantit aujourd'hui qu'un pas trop
  grand soit détecté ailleurs que par l'œil.
- Ce document remplace l'orientation « couverture d'abord » qui a produit
  les 62 notions. Cette orientation n'était pas absurde — elle visait la
  suffisance par le volume. Elle a échoué parce que le volume n'était pas
  le facteur limitant : la forme l'était.
