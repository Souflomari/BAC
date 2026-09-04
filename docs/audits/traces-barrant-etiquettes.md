# Tracés qui barrent des étiquettes — l'inventaire

> **Mesuré le 2026-09-04.** Une classe de défaut trouvée À L'ŒIL pendant le
> tri des chevauchements, que rien ne mesurait, et qui s'est révélée plus
> répandue que la classe pour laquelle l'instrument avait été construit.

## Ce que c'est

Une courbe, un axe, une flèche ou une arête qui **passe au travers d'un
texte**. Le mot reste « là », mais il se lit rayé. Six cas avaient été
trouvés à l'œil sur les 24 figures ouvertes pendant le tri des
chevauchements — la porteuse de 900 kHz barrant « 1 200 kHz », la droite
N = Z barrant sa PROPRE étiquette, l'oscillation traversant
« u_C ≈ U_0 + s_m(t) », les arêtes d'un arbre barrant « Soupe ». La
question évidente était : combien dans les 244 figures jamais ouvertes ?

## La sonde

`figure-preview.mjs` échantillonne chaque géométrie tracée le long de son
contour (`getPointAtLength`, pas ≈ 1 px), ramène les points dans le repère
du SVG racine, et mesure la longueur de tracé qui tombe **à l'intérieur**
de la boîte d'un texte (rétrécie de 15 % en hauteur).

**Trois exclusions, sans lesquelles la sonde crierait partout et finirait
ignorée** — c'est la leçon des figures de mouvement, appliquée d'avance :

1. **La couleur de grille.** Une graduation posée sur un quadrillage léger
   est normale. *(Piège payé sur-le-champ : `getComputedStyle` rend
   « rgb(232, 230, 225) » là où le jeton vaut « #E8E6E1 ». La première
   version comparait les deux chaînes — l'exclusion ne marchait pas, et
   17 faux positifs passaient.)*
2. **Les amorces.** Un trait qui vient toucher SON étiquette a une
   extrémité collée à la boîte : ce n'est pas un défaut. On ne garde les
   traversées courtes que si les deux bouts du tracé sont loin ; au-delà
   de 20 px dans la boîte, on compte quoi qu'il arrive — c'est le cas des
   arêtes qui partaient du CENTRE d'un nœud et sortaient en barrant son
   mot.
3. **Les pastilles opaques** posées entre le tracé et le texte
   (technique légitime, cf. `detecteur-crete`).

**Elle reste INDICATIVE.** Un trait qui écorne un coin de boîte n'a rien à
voir avec un trait qui traverse un mot de part en part : c'est pourquoi
chaque cas est chiffré en **pourcentage de la largeur de l'étiquette**.
Elle n'est PAS une porte, et ne doit pas le devenir avant que la campagne
ci-dessous soit finie — sinon il faudrait la désarmer, ce qui est la
manière ordinaire de perdre une porte.
## La mesure — deux états

**Au relevé (2026-09-04, avant toute correction) : 195 cas dans 91
figures.** Après la campagne du même jour (trois vagues, 30 figures
ouvertes et corrigées) :

| Gravité (part de l'étiquette traversée) | Au relevé | Aujourd'hui |
|---|---:|---:|
| ≥ 80 % — le mot est rayé de bout en bout | 46 | **0** |
| 60–80 % | 11 | 4 |
| 40–60 % | 23 | 17 |
| 20–40 % | 55 | 50 |
| < 20 % — un coin écorné | 60 | 71 |
| **total** | **195** | **142** |

**La tranche grave est vidée.** Ce qui reste est majoritairement de
l'écornure : un trait qui coupe un coin de boîte, pas un mot rayé. Les
chiffres des tranches basses bougent peu, et parfois montent : déplacer
une étiquette de 12 px la sort d'un tracé et l'amène parfois à en frôler
un autre. C'est le prix, et il est petit.

## Ce que la campagne a appris sur l'instrument

Trois faux positifs ont été trouvés EN REGARDANT, et corrigés dans la
sonde plutôt que dans les figures :

1. **La rature est voulue.** `division-euclidienne-droite` barre
   « q = -13 ? » exprès, `double-specificite` barre deux issues « jamais
   observées ». La sonde ne peut pas deviner l'intention : la figure la
   déclare par `data-rature` sur le trait — même contrat que
   `COULEURS SÉMANTIQUES:` pour la porte de couleur.
2. **`getBBox` rend la boîte EM, pas la boîte d'encre.** Pour « … », « . »
   ou « , », l'encre tient dans le bas et tout le haut est vide : quatre
   « … » posés au bord d'une droite numérotée sortaient à 94 % alors que
   les points sont bien SOUS l'axe. Leur boîte est désormais rétrécie à
   son tiers bas.
3. **Un texte TOURNÉ n'a pas de boîte axée utile.** L'englobante d'un
   texte incliné à 28° est bien plus grande que le texte, et toute droite
   parallèle la traverse : la sonde a cru barrer « pente = 4π²/(GM) »
   alors que l'étiquette longe sa droite à 11 px, comme une étiquette de
   pente doit le faire. Le point échantillonné est maintenant ramené dans
   le repère PROPRE du texte — exact, quelle que soit la rotation.

## Les figures qui restent touchées

| Figure | Cas |
|---|---:|
| `pangee-reconstruction-preuves.svg` | 7 |
| `pli-faille-profondeur.svg` | 6 |
| `valeur-moyenne-rectangle.svg` | 6 |
| `subduction-andes.svg` | 5 |
| `transfert-direct-chaleur.svg` | 5 |
| `courbe-exponentielle.svg` | 4 |
| `multiplication-par-i.svg` | 4 |
| `arbre-pondere.svg` | 3 |
| `omega-vitesse-point.svg` | 3 |
| `orbite-geostationnaire.svg` | 3 |
| `double-specificite.svg` | 3 |
| `tangente-derivee.svg` | 3 |
| `courbe-logarithme.svg` | 2 |
| `ec-parabole.svg` | 2 |
| `spirale-rayonnement.svg` | 2 |
| `uc-decharge.svg` | 2 |
| `direct-vs-pile.svg` | 2 |
| `proba-enfant-atteint.svg` | 2 |
| `trois-discontinuites.svg` | 2 |
| `reponse-humorale-cellulaire.svg` | 2 |

## Le détail, par gravité décroissante

| % | Figure | Étiquette barrée | Trait |
|---:|---|---|---:|
| 71 | `courbe-logarithme.svg` | « ln x ≤ x − 1 » | 2.4 px |
| 71 | `pangee-reconstruction-preuves.svg` | « Mesosaurus » | 3.0 px |
| 63 | `sphere-plan.svg` | « M » | 2.0 px |
| 61 | `rendement-esterification.svg` | « τ(t) » | 2.4 px |
| 58 | `distance-deux-pythagore.svg` | « AB » | 1.6 px |
| 58 | `refroidissement-modeles.svg` | « 29,5 °C » | 2.6 px |
| 57 | `avancement-tangente.svg` | « (la droite ne touche x(t)  » | 2.2 px |
| 56 | `ec-parabole.svg` | « (si Ec ∝ v — faux) » | 1.3 px |
| 55 | `spirale-rayonnement.svg` | « −e » | 2.0 px |
| 55 | `spirale-rayonnement.svg` | « −e » | 2.2 px |
| 55 | `uc-decharge.svg` | « (37 % de E restants) » | 2.4 px |
| 54 | `origin-uL.svg` | « pente = di/dt » | 2.2 px |
| 54 | `positions-droite-droite.svg` | « (BC) » | 2.2 px |
| 53 | `direct-vs-pile.svg` | « pont salin » | 1.6 px |
| 53 | `proba-enfant-atteint.svg` | « a//a — 1/4 » | 2.2 px |
| 53 | `proba-enfant-atteint.svg` | « a//a — 1/4 » | 2.2 px |
| 49 | `trois-discontinuites.svg` | « f(1) = 1 » | 2.1 px |
| 41 | `arbre-pondere.svg` | « P(B̅\|A) = 0,5 » | 2.0 px |
| 41 | `reponse-humorale-cellulaire.svg` | « signal » | 1.4 px |
| 41 | `reponse-humorale-cellulaire.svg` | « signal » | 1.4 px |
| 40 | `pli-faille-profondeur.svg` | « faille » | 1.4 px |
| 39 | `omega-vitesse-point.svg` | « v2 = 3,0 m/s » | 1.8 px |
| 39 | `pangee-reconstruction-preuves.svg` | « Australie » | 1.0 px |
| 38 | `courbe-exponentielle.svg` | « y = ex » | 1.8 px |
| 37 | `exp-au-dessus-de-x-plus-1.svg` | « e − 2 ≈ 0,72 » | 1.8 px |
| 37 | `exp-au-dessus-de-x-plus-1.svg` | « y = x + 1 » | 1.8 px |
| 36 | `disjonction-alleles.svg` | « Gamète G — 1/2 » | 2.2 px |
| 35 | `cube-diagonales.svg` | « (BD) » | 2.0 px |
| 34 | `pli-faille-profondeur.svg` | « suivie de haut en bas » | 3.4 px |
| 34 | `travail-ressort-triangle.svg` | « F(x) = kx » | 1.3 px |
| 34 | `zone-virage-sur-saut.svg` | « E (pHE ≈ 8,5) » | 2.4 px |
| 33 | `equivalence-methode-tangentes.svg` | « tangente après le saut » | 1.8 px |
| 33 | `plis-chevauchement.svg` | « (plan de fracture incliné) » | 1.6 px |
| 33 | `plis-chevauchement.svg` | « (plan de fracture incliné) » | 2.6 px |
| 33 | `vitesse-vs-temps-frottement.svg` | « pente g » | 2.4 px |
| 32 | `orbite-geostationnaire.svg` | « même vitesse angulaire ω → » | 2.0 px |
| 32 | `travail-ressort-triangle.svg` | « F(x) = kx » | 2.4 px |
| 31 | `travail-torsion-triangle.svg` | « M(θ) = Cθ » | 1.3 px |
| 30 | `aire-entre-courbes.svg` | « f(x) = x » | 2.2 px |
| 30 | `comparaison-aires-nichees.svg` | « f(x) = x » | 2.2 px |
| 30 | `cycle-enzyme-substrat.svg` | « enzyme » | 1.8 px |
| 30 | `equivalence-methode-tangentes.svg` | « parallèle équidistante » | 1.8 px |
| 30 | `travail-torsion-triangle.svg` | « M(θ) = Cθ » | 2.4 px |
| 29 | `anhydride-alcool.svg` | « (l'hydrogène n'a pas encor » | 1.8 px |
| 29 | `courbe-temperature.svg` | « ≈ 37 °C » | 2.4 px |
| 29 | `oscillateur-periode.svg` | « y(0) = A = 3 » | 2.3 px |
| 28 | `aire-entre-courbes.svg` | « g(x) = x² » | 2.2 px |
| 28 | `comparaison-aires-nichees.svg` | « g(x) = x² » | 2.2 px |
| 28 | `deflexion-magnetique.svg` | « v (= v0) » | 2.4 px |
| 28 | `trois-discontinuites.svg` | « f(a) n'existe pas » | 2.1 px |
| 28 | `vitesse-vs-temps-frottement.svg` | « pente g » | 1.8 px |
| 27 | `valeur-moyenne-rectangle.svg` | « f(x) = x² » | 1.0 px |
| 26 | `energy-exchange.svg` | « effet Joule (R) » | 2.0 px |
| 25 | `explication-bk-2019-n-x1.svg` | « R = √5 » | 2.4 px |
| 25 | `valeur-moyenne-rectangle.svg` | « f(x) = x² » | 2.0 px |
| 25 | `valeur-moyenne-rectangle.svg` | « f(x) = x² » | 1.3 px |
| 24 | `courbe-logarithme.svg` | « y = x − 1 » | 1.8 px |
| 24 | `ec-parabole.svg` | « Ec = 0,10 v2 » | 2.4 px |
| 24 | `explication-bk-2019-n-x1.svg` | « d = √3 » | 1.8 px |
| 23 | `arbre-pondere.svg` | « P(B̅\|A̅) = 0,8 » | 2.0 px |
| 23 | `prediction-avancement.svg` | « vitesse constante ? » | 1.8 px |
| 23 | `specificite-cle-serrure.svg` | « s'emboîte » | 1.8 px |
| 23 | `vih-lt4-charge-virale.svg` | « charge virale » | 2.4 px |
| 22 | `cubique-trois-racines.svg` | « c1 ∈ ]−3,−1[ » | 2.3 px |
| 22 | `theoreme-gendarmes.svg` | « wn — coincé, forcé vers L » | 1.6 px |
| 21 | `courbe-exponentielle.svg` | « e ≈ 2,718 » | 1.8 px |
| 21 | `lecture-Ve-courbe-dosage.svg` | « pH ≈ pKA ≈ 4,8 — pas non p » | 2.4 px |
| 21 | `lecture-Ve-courbe-dosage.svg` | « demi-équivalence : VE/2 =  » | 2.4 px |
| 21 | `pangee-reconstruction-preuves.svg` | « Argentine » | 1.7 px |
| 21 | `subduction-andes.svg` | « décalé vers l'intérieur » | 1.8 px |
| 20 | `omega-vitesse-point.svg` | « d1 = 0,30 m » | 1.6 px |
| 19 | `pangee-reconstruction-preuves.svg` | « chaînes plissées, même str » | 1.5 px |
| 19 | `solutions-diophantiennes-reseau.svg` | « (+11, −14) » | 1.4 px |
| 19 | `uc-decharge.svg` | « uC(τ) ≈ 0,37 · E » | 2.4 px |
| 18 | `direct-vs-pile.svg` | « Détour forcé (pile) » | 2.0 px |
| 17 | `concentration-substrat-enzyme.svg` | « quantité d'enzyme fixée » | 2.4 px |
| 17 | `courbe-temperature.svg` | « optimum thermique » | 2.4 px |
| 17 | `cubique-trois-racines.svg` | « c2 ∈ ]−1,1[ » | 1.4 px |
| 17 | `lente-rapide.svg` | « transformation lente » | 2.0 px |
| 17 | `orbite-geostationnaire.svg` | « P (point fixe au sol) » | 1.6 px |
| 17 | `origin-uc.svg` | « pente = 1/C » | 2.4 px |
| 17 | `valeur-moyenne-rectangle.svg` | « excédentaire » | 2.0 px |
| 17 | `valeur-moyenne-rectangle.svg` | « excédentaire » | 1.3 px |
| 16 | `double-specificite.svg` | « forme complémentaire » | 1.3 px |
| 16 | `exp-reciproque-de-ln.svg` | « ln(exp(x)) = x » | 1.8 px |
| 16 | `multiplication-par-i.svg` | « C′ : −1 + i » | 1.0 px |
| 16 | `multiplication-par-i.svg` | « C : z = 1 + i » | 1.0 px |
| 16 | `multiplication-par-i.svg` | « C′ : −1 + i » | 1.0 px |
| 16 | `tangente-derivee.svg` | « sécante : pente 5,2 » | 1.9 px |
| 16 | `valeur-moyenne-rectangle.svg` | « excédentaire » | 1.0 px |
| 15 | `multiplication-par-i.svg` | « C : z = 1 + i » | 1.6 px |
| 15 | `regimes-uc.svg` | « périodique » | 1.4 px |
| 15 | `tangente-derivee.svg` | « sécante : pente 5,2 » | 2.3 px |
| 15 | `titre-anticorps-vaccin-serum.svg` | « vaccination » | 2.4 px |
| 15 | `vallee-stabilite.svg` | « juste hors de la vallée » | 1.2 px |
| 14 | `arbre-pondere.svg` | « P(A̅) = 0,4 » | 2.0 px |
| 14 | `energy-exchange.svg` | « énergie dissipée dans R » | 2.5 px |
| 14 | `omega-vitesse-point.svg` | « v1 = 0,60 m/s » | 1.8 px |
| 14 | `seismicite-volcanisme-gps-carte.svg` | « frontière de plaque — coïn » | 1.6 px |
| 14 | `subduction-andes.svg` | « fusion partielle » | 1.8 px |
| 13 | `courant-vs-electrons.svg` | « (sens inverse des électron » | 1.5 px |
| 13 | `inegalite-moyenne-rectangles.svg` | « aire = M(b−a) = e ≈ 2,718 » | 2.0 px |
| 13 | `tangente-derivee.svg` | « sécante : pente 5,2 » | 1.4 px |
| 12 | `orbites-gravite.svg` | « r₃ = 1,5·rgéo → T₃ ≈ 44 h » | 1.6 px |
| 12 | `satellite-chute-permanente.svg` | « elle tombe en permanence — » | 1.6 px |
| 12 | `selection-clonale.svg` | « complémentaire » | 1.6 px |
| 12 | `solutions-diophantiennes-reseau.svg` | « 252x + 198y = 36 » | 1.6 px |
| 11 | `orbites-gravite.svg` | « r₂ = rgéo → T₂ = 24 h » | 1.6 px |
| 11 | `solidus-seuil-anatexie.svg` | « enfouissement, reste solid » | 2.4 px |
| 11 | `subduction-andes.svg` | « fosse océanique » | 1.8 px |
| 11 | `titre-anticorps-vaccin-serum.svg` | « délai (jours-semaines) » | 2.4 px |
| 10 | `courbe-ph.svg` | « optimum ≈ pH 2 » | 2.4 px |
| 10 | `double-specificite.svg` | « forme non complémentaire » | 1.3 px |
| 10 | `orbite-geostationnaire.svg` | « Terre : TTerre ≈ 24 h » | 1.3 px |
| 10 | `pli-faille-profondeur.svg` | « compression horizontale » | 1.4 px |
| 10 | `subduction-andes.svg` | « (foyers de plus en plus » | 1.8 px |
| 10 | `subduction-andes.svg` | « profonds vers l'intérieur) » | 1.8 px |
| 9 | `courbe-exponentielle.svg` | « y = x + 1 — tangente en 0 » | 1.8 px |
| 9 | `courbe-exponentielle.svg` | « y = x + 1 — tangente en 0 » | 1.0 px |
| 9 | `double-specificite.svg` | « site actif (forme pour l'a » | 1.8 px |
| 9 | `enfouissement-exhumation.svg` | « P et T ↑, sans fondre » | 2.2 px |
| 9 | `enfouissement-exhumation.svg` | « empilement de la croûte » | 2.2 px |
| 9 | `pli-faille-profondeur.svg` | « compression horizontale » | 2.2 px |
| 9 | `pli-faille-profondeur.svg` | « compression horizontale » | 1.4 px |
| 9 | `vallee-stabilite.svg` | « hors de la vallée, même tr » | 1.2 px |
| 8 | `courbe-aston.svg` | « 4He — 7,08 MeV/nucléon » | 1.2 px |
| 8 | `datation-c14.svg` | « mort de l'organisme (t = 0 » | 2.4 px |
| 7 | `montage-resonance.svg` | « floue (amortissement fort) » | 2.6 px |
| 7 | `pli-faille-profondeur.svg` | « transition fragile-ductile » | 2.2 px |
| 6 | `bilan-forces-caisse-horizontale.svg` | « F − f seule subsiste sur O » | 2.5 px |
| 6 | `exp-reciproque-de-ln.svg` | « Aucun x ne donne exp(x) =  » | 1.2 px |
| 5 | `catalyse-meme-palier.svg` | « flacon A — ambiante, sans  » | 2.4 px |
| 5 | `collision-himalaya.svg` | « la Téthys plonge sous l'As » | 1.4 px |
| 5 | `distribution-curseur-pH.svg` | « pH = 4,8 (= pKA) → 50 % /  » | 1.0 px |
| 5 | `pangee-reconstruction-preuves.svg` | « chaînes plissées, même str » | 1.6 px |
| 5 | `transfert-direct-chaleur.svg` | « énergie → agitation thermi » | 1.1 px |
| 5 | `transfert-direct-chaleur.svg` | « énergie → agitation thermi » | 1.1 px |
| 5 | `transfert-direct-chaleur.svg` | « énergie → agitation thermi » | 1.1 px |
| 5 | `transfert-direct-chaleur.svg` | « énergie → agitation thermi » | 1.1 px |
| 5 | `transfert-direct-chaleur.svg` | « énergie → agitation thermi » | 1.1 px |
| 4 | `pangee-reconstruction-preuves.svg` | « stries glaciaires (~300 Ma » | 1.5 px |
| 4 | `pangee-reconstruction-preuves.svg` | « chaînes plissées, même str » | 1.6 px |

## Les gestes qui corrigent

Par ordre de préférence, tirés des 30 figures réparées :

1. **Changer l'ORDRE DE PEINTURE.** Le plus propre quand il s'applique :
   la bande de manteau de `frontieres-plaques` délavait les étiquettes
   qu'elle recouvrait — peinte avant, tout rentre dans l'ordre.
2. **Faire partir le trait du BORD et non du CENTRE** de ce qu'il relie
   (`arbre-denombrement` : les arêtes barraient le mot du nœud d'où elles
   partaient).
3. **Router autrement.** L'éventail de `p-liste-cadenas` traversait les
   quatre roues et leurs étiquettes ; en montant au-dessus des boîtes
   puis en redescendant dans chacune, il ne croise plus rien.
4. **Interrompre le tracé** quand il appartient à une étape postérieure et
   que l'ordre de peinture ne peut donc rien (l'axe de symétrie du
   triangle de Pascal, en quatre segments qui contournent les cases).
5. **Décaler l'étiquette du côté libre** de ce qu'elle nomme — le cas le
   plus fréquent, et de loin : l'étiquette d'une ligne écrite SUR cette
   ligne. Onze figures d'un coup.
6. **Poser une pastille opaque** quand aucune zone n'est libre, et la
   faire lire comme une pastille (`detecteur-crete`).

## Ce que cet inventaire ne dit pas

- Il porte sur le **thème clair** seulement.
- Il ne voit **que les textes** : un tracé qui en barre un autre, ou une
  étiquette qui sort de SON panneau sans sortir du cadre, restent hors
  mesure. Cette dernière classe a fait un dégât réel dans
  `travail-force-signe` et n'est gardée par rien.
- Il ignore les `.motion.svg`.
- **Ce n'est toujours pas une porte.** 74 cas subsistent : l'armer
  aujourd'hui obligerait à la désarmer demain.

---

## Vague 4 (2026-09-04) — la tranche 40 % et au-dessus est vidée

`142 → 115` cas, `75 → 62` figures. Les deux tranches hautes sont
maintenant à zéro :

| tranche | avant | après |
|---|---|---|
| ≥ 60 % | 4 | **0** |
| 40–59 % | 17 | **0** |
| 20–39 % | 50 | 47 |
| < 20 % | 71 | 68 |

Dix-huit figures reprises. **Chaque correctif a été REGARDÉ**, pas seulement
mesuré : le PNG avant, la mesure, le PNG après.

**Deux gestes nouveaux, que les vagues précédentes n'avaient pas eus :**

1. **Sortir de la trajectoire, au lieu de longer.** Sur `ec-parabole`,
   remonter l'étiquette de 8 px l'a fait passer de 56 % à 30 % — et pas à
   zéro : la droite est OBLIQUE, elle descend de 277 à 260 sur la longueur du
   texte et la retraversait par l'autre bout. Une étiquette horizontale
   posée près d'une ligne inclinée est toujours rattrapée par la pente sur sa
   propre largeur. Il faut dégager la hauteur du texte **plus** la montée sur
   sa longueur — ou changer d'endroit. Même leçon sur `origin-uL`.
2. **Reconnaître une rature VOULUE.** Sur `proba-enfant-atteint`, les deux
   traits qui barrent « a//a — 1/4 » sont le propos de l'étape (le cas
   éliminé par « sachant sain »). Ce n'est pas un défaut : c'est un
   `data-rature`, et l'exception est écrite dans le fichier, à côté du trait.

**Un défaut de composition d'étapes, vu deux fois** dans
`pangee-reconstruction-preuves` : une preuve d'une étape vient barrer
l'étiquette d'une autre (« Mesosaurus » sous la bande des chaînes plissées,
« Australie » sous le marqueur Glossopteris). Ce défaut n'existe dans AUCUNE
étape prise seule — il naît de leur superposition, et c'est exactement ce
qu'une relecture étape par étape ne peut pas voir.

**Et un titre de panneau rayé** (`direct-vs-pile`) : la flèche d'électrons,
dessinée au-dessus du fil, traversait « Détour forcé (pile) ». Mesuré à 18 %
seulement — la mesure sous-estime ce cas-là, parce qu'un titre rayé se voit
bien avant qu'un mot le soit à moitié.


---

## Vague 5 (2026-09-04, même jour) — la tranche 30 % attaquée

`115 → 94` cas, `62 → 51` figures. Onze figures de plus, toutes prises dans
la tranche 28–39 %.

| tranche | après vague 4 | après vague 5 |
|---|---|---|
| ≥ 40 % | 0 | **0** |
| 30–39 % | 13 | **7** |
| 20–29 % | 34 | 20 |
| < 20 % | 68 | 67 |

**Le geste dominant est désormais nommé et il a une règle chiffrée.** Une
étiquette horizontale posée près d'une ligne OBLIQUE est rattrapée par la
pente sur sa propre largeur : pour une ligne à 45° et un texte de 60 px, il
faut dégager **la hauteur du texte plus ~30 px**, sinon on ne fait que
déplacer le point de croisement (mesuré : 56 % → 30 % sur `ec-parabole`,
37 % → 24 % sur `exp-au-dessus-de-x-plus-1`). Trois solutions, dans cet
ordre de préférence : **ancrer du côté opposé** (`text-anchor` inversé, le
texte se termine avant la ligne au lieu de l'enjamber), **aller au bout de
la ligne** là où elle sort du cadre, ou **passer de l'autre côté** quand la
bande y est plus large.

**Deux pièges de placement, payés une fois chacun :**
- descendre une étiquette sous une parabole l'a posée sur l'**axe des
  abscisses** (`aire-entre-courbes` : 28 % → 98 %). Sous une courbe qui
  épouse l'axe, il n'y a pas de bande — il faut aller là où la courbe s'en
  est éloignée.
- remonter une étiquette au-dessus d'une diagonale l'a fait buter sur une
  **arête verticale** que le premier déplacement avait rendue voisine
  (`cube-diagonales`). Un déplacement révèle les tracés du nouvel endroit.

**Un cas de figures jumelles** : `aire-entre-courbes` et
`comparaison-aires-nichees` partagent leurs deux étiquettes au pixel près,
comme `travail-ressort-triangle` et `travail-torsion-triangle`. Le même
correctif s'applique deux fois — et si l'une avait été corrigée seule, la
mesure aurait continué à signaler l'autre sans qu'on comprenne pourquoi.

---

## Vague 6 (2026-09-04) — plus rien au-dessus de 30 %

`94 → 85` cas, `51 → 46` figures. **Les trois tranches hautes sont vides.**

| tranche | matin | ce soir |
|---|---|---|
| ≥ 60 % | 4 | **0** |
| 40–59 % | 17 | **0** |
| 30–39 % | 13 | **0** |
| 20–29 % | 34 | 18 |
| < 20 % | 71 | 67 |

Restent 85 cas, tous sous 30 % — c'est-à-dire un tracé qui effleure moins
d'un tiers d'une étiquette. La campagne s'arrête là pour aujourd'hui, avec
les deux tranches basses documentées et aucune porte armée.

**Trois choses apprises dans cette dernière vague :**

1. **Une étiquette à DEUX LIGNES se déplace en bloc.** Monter la seconde
   ligne de `pli-faille-profondeur` l'a posée sur la première (83 % de
   recouvrement) : le défaut de tracé s'est mué en défaut de chevauchement.
   Même chose sur `orbite-geostationnaire`, où sortir une ligne du disque a
   fallu entraîner la parenthèse qui la suivait.
2. **Certaines figures sont trop denses pour un simple déplacement.** Sur
   `anhydride-alcool`, la note « (l'hydrogène n'a pas encore bougé) » a été
   essayée deux fois : plus haut, elle recouvre l'atome H (64 %) ; plus haut
   encore, l'atome C (63 %). Elle a été **remise où elle était**, à 29 %.
   Refuser un correctif qui empire est un résultat, pas un échec.
3. **Le dégagement nécessaire se calcule.** Pour une ligne de pente `p` et un
   texte de largeur `w`, il faut dégager `hauteur_du_texte + p·w`. Sur
   `deflexion-magnetique` (pente 0,84, texte ~50 px), 18 px ont fait passer
   de 28 % à **37 %** — plus mauvais qu'avant. 32 px ont réglé l'affaire.
---

## Sonde 5 (2026-09-04) — le texte qui sort de SON panneau

La classe était **nommée depuis la veille** — un cas réel corrigé à la main
sur `travail-force-signe` — et **sans instrument**. Elle l'a maintenant.

Elle est différente du « texte hors cadre » : l'étiquette reste dans la
figure, mais elle déborde du PANNEAU auquel elle appartient — la moitié d'un
diptyque, la boîte d'une étape, la bande d'une zone. Ce qu'on lit n'est pas
faux, il est **mal attribué** : une légende du panneau A qui empiète sur le
panneau B semble parler de B.

**Définition mécanique.** Pour chaque texte, le PLUS PETIT rectangle qui
contient son centre est son panneau ; s'il en sort de plus de 12 px, on le
signale.

**Trois exclusions, et chacune a été payée par un faux positif :**

| exclusion | pourquoi | ce qu'elle a supprimé |
|---|---|---|
| rectangle > 85 % du cadre | c'est le FOND, pas un panneau | le fond de `bilan-forces-chute-frottement` (650 px pour un cadre de 740) |
| rectangle TOURNÉ | c'est un objet du dessin, pas un cadre — sa boîte axe-alignée ne veut rien dire | la tige de `pendule-pesant-bras-levier` : « boîte » de 169×227, étiquette « sortant » de 31 px alors qu'elle est simplement posée à côté |
| seuil à 12 px | une étiquette d'AXE vit par convention juste en dehors de l'aire tracée | une vingtaine de « t (s) », « y », « U₀ », « uC » à 4–9 px |

**Relevé : 9 cas réels.** Tous traités le jour même.

- **3 straddles LÉGITIMES** (`lambda-nu-changement-milieu`) : « même ν de
  part et d'autre de l'interface » est centrée SUR l'interface parce que
  c'est son propos. Marquées `data-hors-panneau`, exception écrite dans le
  fichier — même contrat que `data-rature`.
- **1 straddle légitime par format** (`tour-des-ensembles`) : la ligne
  d'explication fait 122 px, la boîte ℕ en fait 100 ; les quatre lignes
  débordent de leur boîte par construction.
- **5 défauts réels, corrigés** : une plaque de synthèse de 416 px sous un
  texte de 567 (`paquet-qui-se-deforme` — la légende n'était soulignée qu'en
  son milieu) ; deux chiffres du panneau « cas audio » écrits DANS le panneau
  « cas porteuse » (`antenne-quart-onde`) ; une légende de zone à moitié dans
  la marge (`solidus-seuil-anatexie`) ; une équation dont le « 3 » était
  traversé par le bord de sa boîte (`tour-des-ensembles`) ; deux lignes
  passant par-dessus la bordure et la flèche (`pli-faille-profondeur`).

**État : 0 cas — et la porte est ARMÉE.** `figure-preview --porte` sort en
erreur si l'une des deux classes PROPRES trouve quoi que ce soit : « déborde »
(texte hors du cadre) et « hors panneau ». Testée dans les deux sens : en
remettant l'équation de `tour-des-ensembles` à son ancien x, la porte échoue
(sortie 1) ; remise en place, elle passe. Elle tourne en CI sur les 258 SVG
statiques, après dom-truth.

Les trois autres classes restent des OUTILS et le resteront tant qu'elles ne
seront pas vides : chevauchements (7, tous dans la figure sous dette owner),
tracés qui barrent (85, tous sous 30 %), aplats clairs en thème sombre (2,
la même dette). **Armer une porte sur une classe sale oblige à la désarmer
le lendemain** — c'est la règle, et c'est pour ça que trois des cinq sondes
n'en sont pas une.


---

## Vague 7 (2026-09-04) — 85 → 74, et la tranche 20–29 % se vide à son tour

`85 → 74` cas, `46 → 41` figures. `20–29 %` passe de 18 à 11.

**Un cas de figure GÉNÉRÉE, traité à sa source.**
`explication-bk-2019-n-x1` sort d'un script Python : les deux décalages
d'étiquette sont corrigés dans `scripts/figure-geometrie-espace-2019.py`,
jamais dans le SVG. **Et le résultat est dit tel qu'il est** : le rayon
pointillé et le segment ΩC ne traversent plus leurs étiquettes, mais le bord
du plan (ABC) les croise encore à 24 %. Dans une scène 3-D dense — sphère,
grand cercle, plan, triangle, normale — **aucune position n'est libre de
tout**, et le commentaire du script le dit maintenant au lieu de laisser
croire que le problème est réglé.

**Un enchaînement de trois essais, sur `cubique-trois-racines`,** qui vaut
comme méthode : les trois étiquettes de racine étaient centrées SOUS leur
racine — c'est-à-dire exactement là où la courbe coupe l'axe. Les décaler
vers la gauche a posé c₁ sur la branche montante de gauche (même 22 %, à un
autre endroit) ; les décaler vers la droite l'a fait buter contre c₂ (le
défaut de tracé mué en chevauchement) ; il a fallu **descendre c₁ d'une
ligne**. Sous une racine, le seul côté libre est celui où la courbe repasse
au-dessus de l'axe — et il faut encore vérifier que le voisin n'est pas là.

**Et une règle de plus, pour les suites qui convergent.** Dans
`theoreme-gendarmes`, l'étiquette de la suite encadrée vivait ENTRE les deux
gendarmes. C'est le seul endroit où aucune étiquette horizontale ne tient :
les deux suites se rapprochent, donc la bande se referme sur la longueur du
texte et l'une des deux finit toujours par le traverser.