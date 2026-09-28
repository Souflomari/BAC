# Quand la connexion tombe — ce que l'élève vit, mesuré

> Mesuré le 2026-09-04. Point 5 de la liste « ce que RIEN ne mesure encore ».
> Instrument : `web/scripts/horsligne-sweep.mjs`, six scènes jouées dans
> l'ordre où elles arrivent vraiment. Coupure par CDP (`offline: true`).

---

## Pourquoi la question n'est pas académique

L'élève visé lit sur un téléphone, souvent en 3G, parfois là où le réseau va
et vient. La coupure n'est pas un cas limite : c'est le mardi soir.

## Ce qui TIENT

| Scène | Résultat |
|---|---|
| La leçon est chargée, le réseau meurt, l'élève change de chapitre | **La navigation marche.** 0 → 1, sans réseau : tout est déjà dans la page. |
| Il répond à un QCM hors ligne | **Le retour s'affiche.** L'état est marqué, la région live parle. Rien n'attend le serveur. |
| Le bouton Retour, après une navigation ratée | **La leçon revient — ET SA PLACE AUSSI.** Parti du chapitre 5, il y revient : `?chapitre=5`, chapitre actif 4 (index 0). |
| Le réseau revient | **La page est toujours vivante**, aucune bannière d'erreur, rien à recharger. |

C'est la conséquence directe d'un choix d'architecture déjà fait : les 14
chapitres sont servis d'un coup (voir `docs/audits/poids-et-reactivite.md`).
Ce choix coûte 43 000 nœuds et six secondes d'attente sur un téléphone bon
marché ; **il rend aussi la leçon entièrement utilisable sans réseau.** Les
deux faits appartiennent au même arbitrage.

## Ce qui CASSE

**Tout clic vers une autre page.** L'élève sort de l'application et tombe sur
la page d'erreur de Chrome — `chrome-error://chromewebdata/`, titre
« No internet », **en anglais**, avec des conseils sur les câbles et le
modem. Pour un élève marocain de terminale, c'est un mur.

**Et une leçon DÉJÀ VISITÉE ne s'ouvre pas davantage.** C'est le résultat qui
tranche un autre arbitrage : l'accueil précharge ~920 ko de charges RSC
(`docs/audits/poids-et-reactivite.md`), ce qui pèse sur un forfait marocain.
On pouvait espérer que ce coût achète au moins de la résistance à la
coupure. **Il n'en achète aucune** : le cache du routeur Next expire, la
requête RSC échoue, et Next retombe sur une navigation dure — qui meurt
comme les autres. Le préchargement est donc un coût de données pur.

## L'arbitrage, pour le propriétaire

Rien dans l'application ne peut intercepter une navigation dure qui échoue :
il faudrait un **service worker**. C'est une décision d'architecture, avec
deux faces qu'il faut peser ensemble :

- **Ce qu'il apporterait** : une page de repli en français (« Tu es hors
  ligne — la leçon que tu lisais est toujours là, appuie sur Retour »), et,
  si l'on va plus loin, un cache d'exécution qui garderait vraiment les
  leçons déjà visitées.
- **Ce qu'il coûterait** : un service worker mal invalidé sert une version
  périmée du site après un déploiement — un élève réviserait un contenu
  corrigé depuis. Ce projet a déjà payé une fois le prix d'un état qui ne
  correspondait plus à la vérité déployée (ADR 0025, la discipline
  « vérité rendue et déployée »).

**Ce qui est mesuré et ne demande pas d'arbitrage** : la casse est bornée. Le
bouton Retour ramène la leçon ET le chapitre. L'élève perd quelques secondes
et voit un écran en anglais ; il ne perd ni sa place ni son travail.

## Ce que ce balayage ne dit pas

- **La coupure PENDANT un enregistrement.** Le mode examen écrit-il quelque
  part ? S'il écrit côté serveur, une coupure au mauvais moment perd-elle une
  réponse ? Non mesuré ici — la surface d'écriture est gardée par le lane
  base de données, human-gated.
- **Le réseau qui ne meurt pas franchement mais RAMPE** (le pire cas réel :
  200 ms de latence et 5 % de paquets perdus). `cls-sweep` et `poids-sweep`
  brident le débit ; personne ne mesure la perte de paquets.
