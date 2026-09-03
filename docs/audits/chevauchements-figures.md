# Chevauchements d'étiquettes — le reliquat mesuré du premier balayage visuel

> **Écrit le 2026-09-03**, à l'issue du premier audit visuel réel du corpus
> de figures. Ce document ne corrige rien : il **mesure**, et il dit ce que
> la mesure vaut. Le tri figure par figure est un travail de mise en page
> qui demande de juger l'intention de l'auteur, pas un correctif mécanique.

## Pourquoi ce balayage n'existait pas avant

`figure-preview.mjs` rendait des SVG effondrés à zéro pixel. Sa sonde lit
`getBBox()` : sur un rendu nul, toutes les boîtes sont nulles, donc aucun
texte ne peut en chevaucher un autre ni sortir d'un cadre nul. L'outil
annonçait « aucun défaut » sur l'ensemble du corpus. Réparé le même jour,
il a été passé sur les **258 figures statiques**.

Résultat brut : **20 débordements** (tous corrigés, cadres élargis) et
**38 chevauchements**, dont ce document traite.

## Ce que la mesure vaut, et ce qu'elle ne vaut pas

L'outil le dit de lui-même : la détection de **débordement est fiable**
(comparaison à un cadre fixe), celle de **chevauchement est indicative**
— les métriques de texte fluctuent avec le contexte de rendu, et un même
fichier près du seuil peut changer d'avis. Elle **dirige le regard**.

Deux hypothèses ont été testées sur ces 38, et la première s'est révélée
largement fausse :

1. **« Ce sont des artefacts de l'aperçu, qui montre toutes les étapes à
   la fois. »** FAUX pour la plupart. La mise en étapes est **cumulative**
   — à la dernière étape, l'élève voit bien tous les groupes ensemble,
   donc l'état que l'aperçu rend *est* un état réel.
2. **« Ce sont des remplacements masqués. »** Vrai pour **3 sur 38**
   seulement. Une figure stagée qui remplace un texte pose un aplat
   opaque par-dessus l'ancien avant d'écrire le nouveau (technique
   documentée en commentaire dans `rlc-schema.svg`) ; les deux `<text>`
   restent dans le DOM et se recouvrent à 100 % au sens des boîtes, alors
   que l'élève n'en voit qu'un. **La sonde tient désormais compte des
   masques** et se tait sur ces cas.

**Il reste donc 35 chevauchements dont rien n'explique qu'ils soient
faux.** Un cas a été ouvert et regardé — `cube-diagonales` — et il est
**réel** : l'annotation « croisement apparent (mais aucun point commun) »
traverse l'étiquette du sommet C.

## Le reliquat, par gravité

| Figure | Notion | Recouvrement | Texte | chevauche |
|---|---|---|---|---|
| `circuit-accorde-selection.svg` | pc/ondes-em-modulation | 100 % | « 900 kHz » | « 900 kHz » |
| `equivalence-courbe-derivee.svg` | pc/reactions-acido-basiques | 100 % | « rappel — pH = f(V) » | « pH » |
| `loi-mailles-build.svg` | pc/rlc-serie | 100 % | « T₀ = 2π√(LC) uniquement. » | « pas cette équation. » |
| `loi-mailles-build.svg` | pc/rlc-serie | 100 % | « R n'apparaît pas. » | « Le terme R·q′ subsiste. » |
| `loi-mailles-build.svg` | pc/rlc-serie | 100 % | « Donc T₀ ne dépend pas de R » | « Le cosinus idéal ne vérifi » |
| `loi-mailles-build.svg` | pc/rlc-serie | 80 % | « du condensateur » | « q/C + L·d²q/dt² = 0 » |
| `loi-mailles-build.svg` | pc/rlc-serie | 45 % | « tension aux bornes » | « ↓ substitution » |
| `loi-mailles-build.svg` | pc/rlc-serie | 45 % | « boucle série sans source » | « ↓ substitution » |
| `diagramme-distribution-vs-predominance.svg` | pc/reactions-acido-basiques | 91 % | « distribution » | « 100 » |
| `diagramme-distribution-vs-predominance.svg` | pc/reactions-acido-basiques | 77 % | « distribution » | « % » |
| `diagramme-distribution-vs-predominance.svg` | pc/reactions-acido-basiques | 69 % | « % » | « 100 » |
| `convection-mantellique-moteur.svg` | svt/theorie-tectonique-plaques | 82 % | « redescend (froid, dense) » | « slab-pull — » |
| `vecteur-vitesse-tangente.svg` | pc/lois-de-newton | 79 % | « vmoy » | « t₂ − t₁ se resserre, la co » |
| `seismicite-volcanisme-gps-carte.svg` | svt/theorie-tectonique-plaques | 78 % | « océan Pacifique » | « ~8 cm/an » |
| `courbe-ph.svg` | svt/role-enzymes | 76 % | « optimum ≈ pH 7 » | « optimum ≈ pH 2 » |
| `solutions-diophantiennes-reseau.svg` | maths/arithmetique | 75 % | « Les solutions entières de  » | « … » |
| `conservation-em.svg` | pc/aspects-energetiques | 73 % | « Sans frottement — Em const » | « 1 » |
| `conservation-em.svg` | pc/aspects-energetiques | 73 % | « Avec frottement — Em dimin » | « 1 » |
| `trois-catalyses.svg` | pc/controle-catalyse | 73 % | « Pt / Pd / Rh (solide) » | « ✱ » |
| `droite-point-direction.svg` | maths/geometrie-espace | 71 % | « O » | « t = −2,3 » |
| `travail-force-signe.svg` | pc/aspects-energetiques | 71 % | « θ » | « force résistante » |
| `chimiosmose-atp-synthase.svg` | svt/liberation-energie-matiere-organique | 67 % | « espace intermembranaire » | « + » |
| `profil-age-plancher-oceanique.svg` | svt/theorie-tectonique-plaques | 65 % | « axe de la dorsale — âge ≈  » | « (axe de la dorsale) » |
| `etude-fonction-rationnelle.svg` | maths/derivabilite-etude-fonctions | 64 % | « 0 » | « A(0 ; −1) » |
| `distribution-curseur-pH.svg` | pc/reactions-acido-basiques | 64 % | « 100 » | « pH = 3,8 → 91 % AH / 9 % A » |
| `orbite-geostationnaire.svg` | pc/chute-mouvements-plans | 62 % | « r » | « Terre : TTerre ≈ 24 h » |
| `frontieres-plaques-quatre-types.svg` | svt/theorie-tectonique-plaques | 61 % | « inclinée (Benioff) » | « densité croît avec l'âge → » |
| `arbre-denombrement.svg` | maths/denombrement | 59 % | « n2 = 2 possibilités » | « Salade + Tajine » |
| `cube-diagonales.svg` | maths/geometrie-espace | 58 % | « C » | « (mais aucun point commun) » |
| `detecteur-crete.svg` | pc/ondes-em-modulation | 50 % | « (rapport fp/fsignal réduit » | « s(t) » |
| `croissances-comparees-ln.svg` | maths/fonction-logarithme | 48 % | « y » | « 10 » |
| `desintegrations-nz.svg` | pc/decroissance-radioactive | 45 % | « N = Z » | « désintégration α : ΔZ = −2 » |
| `pangee-reconstruction-preuves.svg` | svt/theorie-tectonique-plaques | 44 % | « Afrique » | « (pas le littoral actuel) » |
| `echelle-acide-neutre-basique.svg` | pc/reactions-acido-basiques | 42 % | « [H3O+] = [HO-] = √Ke = 10⁻ » | « pH = 9 → [H3O+] = 10⁻⁹ mol » |

## Comment trier, quand quelqu'un s'y mettra

- **Ouvre le PNG**, ne juge pas sur le pourcentage. Le dénominateur est la
  PLUS PETITE des deux boîtes : une étiquette d'un seul caractère (« 0 »,
  « y », « C ») recouverte à moitié par une longue annotation affiche un
  pourcentage élevé pour une collision parfois mineure — et parfois pour
  une collision qui rend le caractère illisible. Seul le regard tranche.
- **Vérifie l'étape**. Une figure stagée se lit étape par étape : deux
  textes qui se percutent à la dernière étape peuvent être parfaitement
  lisibles à celle où chacun compte. Cela n'excuse pas la collision (la
  dernière étape est une vue réelle), mais cela en change la gravité.
- **Déplace l'étiquette, pas le contenu.** Et re-mesure après : l'outil
  est là pour ça.

## Ce que ce document n'a PAS fait

- Aucun des 35 n'a été corrigé.
- Aucun n'a été ouvert au-delà de `cube-diagonales`, qui a servi à établir
  que le reliquat contient de vrais défauts. **Les 34 autres ne sont donc
  ni confirmés ni réfutés individuellement.**
- Le balayage a porté sur le thème CLAIR uniquement. Les métriques de
  texte ne dépendent pas du thème, mais la lisibilité d'une collision,
  elle, en dépend.
