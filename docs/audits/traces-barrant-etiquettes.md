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

## La mesure

**195 cas dans 91 figures** (sur 258 statiques), thème clair.

| Gravité (part de l'étiquette traversée) | Cas |
|---|---:|
| ≥ 80 % — le mot est rayé de bout en bout | 38 |
| 60–80 % | 11 |
| 40–60 % | 21 |
| 20–40 % | 53 |
| < 20 % — un coin écorné | 72 |

La médiane est à 29 %. **La moitié des cas sont des écornures**, l'autre
moitié va de la gêne réelle au mot illisible.

## Les figures les plus touchées

| Figure | Cas |
|---|---:|
| `pangee-reconstruction-preuves.svg` | 8 |
| `vecteur-vitesse-tangente.svg` | 6 |
| `explication-bk-2019-n-x1.svg` | 6 |
| `pli-faille-profondeur.svg` | 6 |
| `valeur-moyenne-rectangle.svg` | 6 |
| `double-specificite.svg` | 5 |
| `division-euclidienne-droite.svg` | 5 |
| `subduction-andes.svg` | 5 |
| `transfert-direct-chaleur.svg` | 5 |
| `courant-vs-electrons.svg` | 4 |
| `vallee-stabilite.svg` | 4 |
| `p-liste-cadenas.svg` | 4 |
| `courbe-exponentielle.svg` | 4 |
| `multiplication-par-i.svg` | 4 |
| `triangle-pascal.svg` | 3 |
| `continuite-tvi.svg` | 3 |
| `lecture-Ve-courbe-dosage.svg` | 3 |
| `asymptotes.svg` | 3 |
| `arbre-pondere.svg` | 3 |
| `omega-vitesse-point.svg` | 3 |

## Le détail, par gravité décroissante

| % | Figure | Étiquette barrée | Trait |
|---:|---|---|---:|
| 125 | `triangle-pascal.svg` | « 1 » | 1.5 px |
| 125 | `triangle-pascal.svg` | « 2 » | 1.5 px |
| 125 | `triangle-pascal.svg` | « 6 » | 1.5 px |
| 116 | `courant-vs-electrons.svg` | « e− » | 1.8 px |
| 113 | `droite-point-direction.svg` | « M » | 1.8 px |
| 113 | `vecteur-vitesse-tangente.svg` | « vmoy » | 2.3 px |
| 110 | `vecteur-vitesse-tangente.svg` | « G2' » | 2.5 px |
| 109 | `vallee-stabilite.svg` | « 12C » | 1.2 px |
| 106 | `pile-daniell.svg` | « K+ » | 1.2 px |
| 102 | `regimes-uc.svg` | « T0 » | 1.6 px |
| 100 | `continuite-tvi.svg` | « k = 0,5 » | 1.8 px |
| 100 | `lecture-Ve-courbe-dosage.svg` | « ce n’est PAS VE » | 1.2 px |
| 100 | `moment-force.svg` | « F » | 1.4 px |
| 100 | `p-liste-cadenas.svg` | « roue 1 » | 1.5 px |
| 100 | `sphere-plan.svg` | « d » | 2.0 px |
| 100 | `vecteur-vitesse-tangente.svg` | « G2' » | 2.6 px |
| 99 | `antenne-quart-onde.svg` | « (1,80 m) » | 1.4 px |
| 99 | `continuite-tvi.svg` | « f(a) = 2 » | 1.0 px |
| 99 | `courant-vs-electrons.svg` | « pont salin » | 2.2 px |
| 99 | `double-specificite.svg` | « glucose direct » | 1.3 px |
| 99 | `double-specificite.svg` | « autre coupure » | 1.3 px |
| 99 | `exhumation-erosion-granite.svg` | « GNEISS » | 2.0 px |
| 99 | `reponse-primaire-secondaire.svg` | « t (jours) » | 1.4 px |
| 98 | `asymptotes.svg` | « y = 2 » | 1.8 px |
| 98 | `datation-c14.svg` | « A0 » | 2.4 px |
| 96 | `explication-bk-2019-n-x1.svg` | « C » | 1.1 px |
| 95 | `vecteur-vitesse-tangente.svg` | « G2 » | 2.5 px |
| 94 | `division-euclidienne-droite.svg` | « … » | 1.4 px |
| 94 | `division-euclidienne-droite.svg` | « … » | 1.4 px |
| 94 | `division-euclidienne-droite.svg` | « … » | 1.4 px |
| 94 | `division-euclidienne-droite.svg` | « … » | 1.4 px |
| 93 | `droite-point-direction.svg` | « t·u » | 1.8 px |
| 93 | `explication-bk-2019-n-x1.svg` | « A » | 2.4 px |
| 93 | `qr-vs-k-echelle.svg` | « K » | 1.4 px |
| 92 | `critere-evolution-qr-k.svg` | « K » | 1.4 px |
| 88 | `concentration-substrat-enzyme.svg` | « palier (saturation) » | 1.6 px |
| 81 | `pangee-reconstruction-preuves.svg` | « Inde » | 1.0 px |
| 80 | `explication-bk-2019-n-x1.svg` | « C » | 1.8 px |
| 76 | `kepler3-linearisation.svg` | « pente = 4π² / (GM) » | 2.4 px |
| 74 | `euler-taille-de-pas.svg` | « Δt = 0,05 s (grand pas — s » | 2.4 px |
| 73 | `vecteur-vitesse-tangente.svg` | « vmoy » | 2.5 px |
| 72 | `p-liste-cadenas.svg` | « roue 1 » | 1.5 px |
| 71 | `courbe-logarithme.svg` | « ln x ≤ x − 1 » | 2.4 px |
| 71 | `pangee-reconstruction-preuves.svg` | « Mesosaurus » | 3.0 px |
| 69 | `explication-bk-2019-n-x1.svg` | « O » | 1.1 px |
| 68 | `p-liste-cadenas.svg` | « roue 1 » | 1.5 px |
| 63 | `sphere-plan.svg` | « M » | 2.0 px |
| 63 | `vecteur-vitesse-tangente.svg` | « G2' » | 2.3 px |
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
| 53 | `division-euclidienne-droite.svg` | « q = -13 ? » | 1.6 px |
| 53 | `proba-enfant-atteint.svg` | « a//a — 1/4 » | 2.2 px |
| 53 | `proba-enfant-atteint.svg` | « a//a — 1/4 » | 2.2 px |
| 51 | `vallee-stabilite.svg` | « N = Z » | 1.2 px |
| 49 | `trois-discontinuites.svg` | « f(1) = 1 » | 2.1 px |
| 45 | `courant-vs-electrons.svg` | « pont salin » | 1.5 px |
| 45 | `pile-daniell.svg` | « pont salin » | 1.5 px |
| 41 | `arbre-pondere.svg` | « P(B̅\|A) = 0,5 » | 2.0 px |
| 41 | `reponse-humorale-cellulaire.svg` | « signal » | 1.4 px |
| 41 | `reponse-humorale-cellulaire.svg` | « signal » | 1.4 px |
| 40 | `pli-faille-profondeur.svg` | « faille » | 1.4 px |
| 39 | `omega-vitesse-point.svg` | « v2 = 3,0 m/s » | 1.8 px |
| 39 | `pangee-reconstruction-preuves.svg` | « Australie » | 1.0 px |
| 38 | `courbe-exponentielle.svg` | « y = ex » | 1.8 px |
| 37 | `exp-au-dessus-de-x-plus-1.svg` | « e − 2 ≈ 0,72 » | 1.8 px |
| 37 | `exp-au-dessus-de-x-plus-1.svg` | « y = x + 1 » | 1.8 px |
| 37 | `p-liste-cadenas.svg` | « roue 2 » | 1.5 px |
| 36 | `disjonction-alleles.svg` | « Gamète G — 1/2 » | 2.2 px |
| 35 | `continuite-tvi.svg` | « k = 0,5 » | 2.4 px |
| 35 | `cube-diagonales.svg` | « (BD) » | 2.0 px |
| 34 | `asymptotes.svg` | « x = 2 » | 1.8 px |
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
| 8 | `asymptotes.svg` | « f(x) = 2 + 1/(x - 2) » | 1.4 px |
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

Par ordre de préférence, tirés des cas déjà réparés :

1. **Changer l'ORDRE DE PEINTURE.** Le plus fréquent et le plus propre :
   si le tracé est peint APRÈS le texte, le déplacer avant suffit (l'axe
   de symétrie du triangle de Pascal doit passer SOUS les cases, pas à
   travers les chiffres). Attention au symétrique : une bande translucide
   peinte après des étiquettes les délave (`frontieres-plaques`).
2. **Faire partir le trait du BORD et non du CENTRE** de ce qu'il relie
   (`arbre-denombrement`).
3. **Décaler l'étiquette** perpendiculairement au tracé, du côté libre.
4. **Poser une pastille opaque** quand aucune zone n'est libre — et la
   faire lire comme une pastille (`detecteur-crete`).

## Ce que cet inventaire ne dit pas

- Il porte sur le **thème clair** seulement. La liste serait identique en
  sombre (les métriques ne dépendent pas du thème), la gêne non.
- Il ne voit **que les textes** : un tracé qui en barre un autre, ou une
  étiquette qui sort de SON panneau sans sortir du cadre, restent hors
  mesure. Cette dernière classe a fait un dégât réel dans
  `travail-force-signe` et n'est gardée par rien.
- Il ignore les `.motion.svg`, dont le rendu statique n'est l'état d'aucun
  instant du film.

