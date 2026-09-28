# ADR 0039 — La forme que le produit écrit, et l'unité qui noie le signal

**Date :** 2026-09-21 · **Statut :** accepté (prolonge ADR 0031, 0033, 0034, 0036, 0038)

---

## Contexte

Seconde passe autonome du 2026-09-21, après ADR 0038. Un défaut de poids réel
corrigé dans le produit (la leçon partait deux fois sur le fil), deux
instruments neufs, une porte armée, une mesure ajoutée, deux faits rendus au
propriétaire — et, comme la veille, **la mesure s'est trompée avant le
produit**, trois fois, chaque fois sous une forme nouvelle. Les faits sont en
`docs/HANDOFF.md` §11.174 à §11.179 ; cet ADR ne garde que ce qui se
généralise.

---

## 1. Un MANIFESTE n'est pas un GRAPHE

`§11.174.` Le plancher Safari 16.4 vient d'un `lookbehind` dans un morceau de
JavaScript. Question suivante : quelles pages le chargent ? Le manifeste de
build répond proprement — 2 routes sur 14, et **pas** la route épreuve. Lu
seul, il conclut « les épreuves sont épargnées ». C'est faux : le morceau de
la route épreuve contient `r.e(504)`, un import *paresseux* que le manifeste
ne liste pas. Le navigateur, sur le build servi, montre la page épreuve
demandant ce morceau **dès le chargement**.

**La règle.** Un manifeste de build liste les morceaux INITIAUX d'une route.
C'est la version « dépendances » d'ADR 0036 : une chose n'est prouvée absente
que si l'on a énuméré ses FORMES — ici le morceau initial ET l'import
paresseux. Et quand deux lectures statiques se contredisent, **c'est la page
servie qui tranche**.

---

## 2. Ce n'est pas la chose qui change de forme — c'est le PRODUIT qui la réécrit

`§11.176.` La version la plus coûteuse d'ADR 0036, et la plus discrète.

Une porte neuve cherchait dans le document servi les 36 premiers caractères
d'un titre de `lesson.md`. Elle annonçait « 62 leçons, 0 occurrence », une
heure après avoir été armée et éprouvée rouge. Le texte était là :

```
fichier :  "R0 — Accroche : le réservoir…"
document : "R0 — Accroche : le réservoir…"
```

La typographie française passe avant la sérialisation : espace fine insécable
devant les deux-points, écrite en plus sous sa forme ÉCHAPPÉE. Une espace
d'écart, et la porte certifiait le contraire de la vérité dès qu'un titre
portait une ponctuation haute. Rendue robuste aux formes : **53 sur 62**.

**La règle.** Une porte qui compare du TEXTE à du texte RENDU doit justifier,
à côté de son motif, pourquoi les deux côtés sont dans la même forme. Quand on
ne peut pas le justifier, **on change d'empreinte** : on cherche ce que le
rendu ne peut pas produire, jamais ce qu'il pourrait réécrire. Ici, les
marqueurs de ligne `[[exercise:…]]` — syntaxe de source pure, consommée par le
découpeur, qu'aucune règle typographique ne touche.

**Corollaire sur l'essai rouge.** Le premier essai fabriquait son document
malade en copiant la sonde LITTÉRALE — donc il éprouvait la forme que la porte
savait déjà voir. Il criait et ne prouvait rien. **Un essai rouge doit porter
la forme que le PRODUIT écrit**, pas celle que la porte cherche ; sinon il
mesure l'accord de la porte avec elle-même — la variante « une porte qui se
cite elle-même se disculpe » (ADR 0036).

---

## 3. Le premier chiffre rouge n'est pas plus fiable que le vert qu'il remplace

`§11.176.` Élargie, la sonde trouvait 53 leçons. S'arrêter là aurait été aussi
faux que s'arrêter au 0 : ces 53 n'étaient **pas** le défaut visé. C'était
`react-markdown`, qui passe un `node` hast à chaque composant — 63 props,
31 739 o, 0,8 % du document. Autre cause, autre ordre de grandeur, autre
correctif.

**La règle.** Un rouge qui remplace un vert doit être attribué avant d'être
cru. Le soulagement de « la porte marche enfin » est exactement le moment où
l'on cesse de vérifier.

---

## 4. L'UNITÉ mal choisie noie le signal sous la convention

`§11.178.` Neuf identifiants d'item existent dans deux notions à la fois
(`LIB-1..9`, préfixe dérivé du slug, deux notions en « li- »). Le premier jet
de la porte comptait aussi les `checkpoints.yaml` et annonçait **19
collisions** — dont `cp-r0-predict` dans **62 notions sur 62**.

Ce n'est pas une collision : c'est une CONVENTION de nommage,
`cp-<barreau>-<sujet>`, délibérément répétée. **Un identifiant présent 62 fois
sur 62 est un nom de rôle, pas un accident.** Les compter aurait noyé 9 vraies
collisions sous 10 fausses, et la porte aurait été désarmée le lendemain — le
seuil que ADR 0034 interdit de franchir.

**La règle.** L'unité d'un motif s'écrit à côté du motif (ADR 0038 §5), et son
exclusion se MESURE. « 62 sur 62 » est la mesure qui prouve la convention ;
sans elle, l'exclusion aurait été une supposition confortable.

---

## 5. Un défaut LATENT se gate, il ne s'alarme pas — et il ne se corrige pas en douce

`§11.178.` Avant d'écrire quoi que ce soit d'alarmant sur les identifiants
jumeaux, il a fallu vérifier que rien ne les confond : `notion_id` sur chaque
ligne d'événement, `PRIMARY KEY (user_id, notion_id)`, un `perNotionItemMap`
par notion, une page qui ne rend qu'une notion. **Aucune donnée d'élève en jeu,
rien à réparer.** C'est un piège pour le prochain auteur, pas un bug.

**La règle.** Trois gestes, dans cet ordre : établir que c'est latent, armer
une porte qui interdit que ça EMPIRE (pas zéro — aucune NOUVELLE), et laisser
le nettoyage au propriétaire quand il touche des données déjà écrites.
Renommer un id d'item orphelinerait l'historique d'événements : ce n'est pas
un geste d'agent.

---

## 6. Une porte peut être exacte sur une question plus étroite que la RÈGLE DE LA MAISON

`§11.179.` Troisième cas d'ADR 0033, rencontré sous une forme neuve : cette
fois la question plus étroite n'est pas celle de l'en-tête de la porte, c'est
celle du dépôt lui-même.

`dom-truth` vérifie **24 px** de cible tactile — le critère AA de WCAG 2.2 —
et il tient, 622 sur 622. Mais `COMPONENT-STATES.md` §24 écrit « **Floor:**
≥48px touch target height on **all** interactive elements », §365–366 le
répète, `TOKENS.md` scelle `--touch-target: 48px`. Trois endroits, **jamais
mesurés** : 86 cibles sur 622 sont en dessous. Le « ✓ toutes ≥ 24px » était
vrai ; c'est le lecteur qui complétait avec la règle de la maison.

**La règle.** Quand un dépôt s'écrit un seuil plus exigeant que la norme, il
faut **mesurer les deux**. Le seuil normatif s'arme ; le seuil maison se
MESURE et s'imprime à côté, sans rougir, tant que l'écart est un arbitrage et
non un défaut (ADR 0034 : un seuil appartient à une mesure, jamais à un
cliquet). Une porte verte sur le critère faible, muette sur le critère fort,
se lit comme une garantie qu'elle n'a jamais donnée.

---

## 7. L'outil rend une valeur plausible pour une question qu'on n'a pas posée

`§11.177.` Le balayage de poids annonçait `100,59 Mo brut, 100,59 Mo gzip` —
identiques à l'octet près sur 62 leçons. Le `fetch` de Node **décompresse tout
seul** : demander `Accept-Encoding: gzip` puis lire `arrayBuffer()` rend les
octets décompressés. Mesure fausse d'un facteur 10, et l'air parfaitement
propre.

**La règle.** C'est la même forme que les douze de ADR 0035 et les trois de
ADR 0038 : l'outil ne ment jamais, il répond à une autre question. Le réflexe
qui l'attrape est bête et fiable — **deux valeurs qui devraient différer et
qui sont égales à l'octet près sont un défaut de mesure, pas un résultat.** Et
un instrument qui ne peut pas mesurer ce qu'il annonce doit REFUSER de tourner
plutôt qu'imprimer un chiffre approchant.

---

## Ce que cet ADR ne tranche pas

- **La CI n'a toujours pas de runner.** Re-mesuré : dernier vert run 490
  (2026-09-11T16:59Z), puis **230 runs consécutifs** sans un seul vert, tous
  `runner_id: 0`, re-run compris. Tout ce qui est dit « vert » ici a été
  mesuré EN LOCAL. La porte armée en §11.178 n'a jamais tourné en CI.
- **Les arbitrages du propriétaire** : les 1,87 Mo de charge RSC restants
  (frontières client = architecture), le renommage de `LIB-1..9`, et le
  plancher de 48 px (DECISIONS §15 — corriger le produit, ou la règle ?).

---

## Retractions and Corrections

- **§11.175, corrigé le jour même.** La première rédaction annonçait la porte
  `source-en-double` « verte sur 62 leçons, 0 occurrence ». La sonde était
  aveugle (§2 ci-dessus). Le texte de §11.175 porte désormais le renvoi à
  §11.176 ; le CORRECTIF, lui, tient : il est mesuré en octets (−9,9 %, −3,0 %,
  −20,4 % gzip), pas par la porte qui s'était trompée.
- Aucune autre rétractation à ce jour.
