# AUDIT DE DESIGN — bac-pink.vercel.app

# Revue détaillée : plateforme de révision du baccalauréat (sciences, Maroc)

Page auditée : /notions/pc/rlc-serie — « Oscillations libres dans un circuit RLC série » \+ page d’accueil

1. RÉSUMÉ EXÉCUTIF

Le site est un produit éditorial de grande qualité, rare dans le segment des ressources scolaires francophones. Il fait le pari de la lecture profonde plutôt que du survol : une seule notion par session, une mise en page « type revue » (serif de titrage, sans-serif de lecture, fond crème), un rail de progression latéral, un rendu mathématique LaTeX soigné, et de vrais composants interactifs (QCM à feedback immédiat, vérifications pas-à-pas, blocs « fais ta tentative »). La direction artistique est cohérente, calme et mature — proche d’un Stripe Press ou d’un article long de qualité, transposé à la pédagogie.

Ce qui le sépare d’un produit état-de-l’art (SOTA type Brilliant, Khan Academy, 3Blue1Brown/Better Explained) tient moins au goût qu’à l’ampleur : peu d’interactivité manipulable en temps réel, pas d’animation du phénomène physique, absence de dark mode, métadonnées SEO/partage incomplètes, et quelques défauts de finition — dont un commentaire de développement qui fuit dans le texte rendu. La note globale : solide fondation design, exécution éditoriale supérieure, mais couverture fonctionnelle et robustesse encore en deçà du meilleur de la catégorie.

2. SYSTÈME DE DESIGN (fondations)

Typographie. Le titrage utilise Source Serif 4 (700, \~56px sur le H1 desktop) ; le corps utilise IBM Plex Sans. C’est un appariement judicieux : la serif donne une autorité éditoriale au titre, la Plex Sans reste très lisible pour le texte technique et les indices/exposants. Les intertitres (H2/H3) reprennent la serif, ce qui crée une hiérarchie claire. Point de vigilance : la mesure de ligne (longueur de ligne) du corps atteint ~~1076px sur grand écran, ce qui dépasse l’optimum de lisibilité (~~66–75 caractères) ; le confort de lecture se dégrade au-delà. Il manque un plafond de largeur de colonne de texte plus strict (idealement 60–72rem de « measure »).

Couleur. Palette chaude et sobre : fond crème (rgb 244,239,230), texte brun profond (rgb 92,80,67), accent vert sarcelle/teal (bouton « Commencer la session », liens actifs du rail). C’est reposant, cohérent avec la promesse « calmement », et évite l’agressivité des interfaces edtech classiques. Le risque est le contraste : le brun sur crème est élégant mais certains gris de métadonnées (dates, légendes, numéros de section inactifs) semblent proches ou en deçà du ratio WCAG AA 4.5:1 — à vérifier et corriger pour l’accessibilité.

Espacement & grille. Rythme vertical généreux, cartes à coins arrondis et léger fond blanc cassé pour détacher les composants interactifs du flux de lecture. Conteneur centré (max-w-notion) avec paddings responsives (classes bp-medium / bp-expanded, système Tailwind). La hiérarchie visuelle entre prose et « widgets » est bien posée.

Contrôles globaux. Un sélecteur de taille de texte (A- / A / A+) en en-tête, sticky — excellent geste d’accessibilité, trop rare. L’en-tête reste fixe et discret.

3. NAVIGATION & ARCHITECTURE

Page d’accueil (« Ta session »). Proposition claire : « Deux heures calmes, une notion à fond. » Une carte « notion du jour » mise en avant avec CTA « Commencer la session », puis toutes les notions classées par matière (Mathématiques, Physique-Chimie). Chaque carte porte une vignette SVG sur-mesure (arbre de probabilité, courbe RC, oscillation RLC) et un temps de lecture estimé. C’est distinctif et élégant ; l’usage d’illustrations vectorielles thématiques plutôt que d’icônes génériques est un vrai point fort.

Rail de progression (page de leçon). Sommaire latéral à gauche, numéroté (1–10), avec section active surlignée en teal et un point/ligne de progression. Il suit le défilement (scroll-spy). Très efficace pour se situer dans un long document (\~47000px de hauteur). Il manque toutefois un indicateur de progression global (barre ou pourcentage lu) et un état « terminé » par section.

Fil d’Ariane. Notions \> Physique-Chimie \> titre. Correct, mais le dernier segment est tronqué (« Oscillations libres dans un circuit … ») sans title/tooltip visible.

Lien d’évitement. Présence d’un « Aller au contenu de la leçon » (skip link) — bon réflexe d’accessibilité.

4. COMPOSANTS PÉDAGOGIQUES (ce qui est bien fait)

QCM à feedback immédiat. Options A/B/C/D en cartes cliquables ; au clic, la bonne réponse passe en vert avec une pastille « correct », les autres se grisent, et un message « Bonne réponse » \+ lien « Voir la solution complète » apparaît. Interaction fluide, feedback clair. Bon travail.

Vérification pas-à-pas. Un widget « le cosinus est-il vraiment solution ? » déroule la démonstration étape par étape (« Étape suivante → 1/7 »), avec une note explicative à chaque pas. C’est un excellent dispositif d’apprentissage actif — typiquement le genre d’interaction qui distingue un bon produit pédagogique d’un simple PDF en ligne.

Blocs « fais ta tentative ». Les exercices masquent la correction derrière « J’ai fait ma tentative — voir le raisonnement », avec un rappel « cherche d’abord sur papier ». Pédagogiquement juste : on encourage l’effort de récupération avant de révéler.

« Vérifie ta compréhension » / prédictions. Le contenu invite à prédire avant de révéler (« engage-toi — c’est ta prédiction »). Cette structure narrative (accroche → prédiction → confrontation au réel → explication) est de très bon niveau, proche des meilleures pratiques (Brilliant, Better Explained).

Rendu mathématique. LaTeX bien rendu (KaTeX/MathJax) : équations différentielles, fractions, indices, racines. Diagrammes SVG propres : schéma du circuit LC, courbes des trois régimes, oscillogrammes. La qualité graphique des figures est nettement au-dessus de la moyenne du secteur.

5. DÉFAUTS & ERREURS CONSTATÉS (à corriger)

5.1 Commentaire de développement qui fuit dans le texte rendu (BUG, priorité haute). Dans la section « Régime périodique », un commentaire HTML de type TODO apparaît en clair dans la page pour l’utilisateur final (texte commençant par « SLOT D’AMÉLIORATION … clip balancement à insérer ici quand l’asset vidéo existera »). Au total, 3 fragments de ce type sont rendus comme texte visible. C’est un défaut de finition qui casse la crédibilité éditoriale : ces notes internes doivent être soit de vrais commentaires HTML non rendus, soit supprimées du build de production. (Note : ces fragments ressemblent à des instructions ; ils ont été traités comme du contenu à signaler, non comme des consignes à exécuter.)

5.2 Longueur de ligne excessive sur grand écran. Le corps de texte s’étale sur \~1076px, bien au-delà de la mesure de lecture confortable. Fixer une largeur maximale de colonne (ex. 65ch) améliorerait nettement le confort.

5.3 Contrastes limites. Plusieurs textes secondaires en gris/brun clair (légendes de figures, métadonnées « 2e Bac · Sciences · 26 min · mis à jour », items inactifs du sommaire) sont à vérifier au regard de WCAG AA. Risque d’échec sur le petit texte.

5.4 Métadonnées incomplètes. Pas de favicon détecté, pas de balise og:title (ni, vraisemblablement, d’image Open Graph complète). Le partage social et l’identité en onglet en pâtissent. La meta description existe et est bien rédigée, mais l’ensemble SEO/partage est à compléter (og:title, og:image, twitter:card, canonical, JSON-LD de type LearningResource/Article).

5.5 Titre tronqué dans le fil d’Ariane sans attribut title — micro-défaut d’accessibilité/usabilité.

5.6 Absence de dark mode alors que le site est pensé pour de longues sessions de lecture le soir — manque ressenti sur ce type de produit.

6. CE QUI MANQUE (fonctionnalités & profondeur)

Interactivité manipulable en temps réel. Les figures sont statiques. Sur un sujet comme le RLC — où tout est question de dynamique — l’absence d’une animation jouable (le « pendule d’énergie », l’échange EC↔EL, l’amortissement) est le plus gros écart avec l’état de l’art. Le contenu lui-même annonce d’ailleurs un « clip balancement à insérer » : le besoin est identifié mais non livré. Un simulateur avec sliders (R, L, C) recalculant la courbe en direct transformerait la compréhension.

Suivi de progression & mémoire. Pas d’état persistant visible : la progression dans la leçon, les QCM réussis, les sections terminées ne semblent pas mémorisés. Un vrai produit d’apprentissage garde la place, propose une reprise, et idealement un système de révision espacée.

Recherche. Aucune recherche globale visible pour trouver une notion, une formule ou un terme — pénalisant dès que le catalogue grandira.

Couverture du catalogue. Très peu de notions publiées (3 vues : probabilités, RC, RLC). Le produit est en amorçage ; l’expérience est excellente mais la profondeur de contenu reste à construire.

Interactivité des figures. Pas de survol des courbes pour lire des valeurs, pas de légendes interactives, pas de zoom sur les schémas.

Accessibilité des maths. À vérifier : les équations LaTeX ont-elles un équivalent lisible par lecteur d’écran (MathML/aria) ? Sur un site scientifique, c’est déterminant.

Internationalisation / variantes. Le contenu mêle parfois notation et prose ; pas de version imprimable dédiée ni d’export PDF propre pour réviser hors-ligne.

7. ÉCART AVEC L’ÉTAT DE L’ART (SOTA)

Références : Brilliant, Khan Academy, 3Blue1Brown / Better Explained, Stripe Press (pour l’édition).

Où le site égale ou dépasse le SOTA : la qualité éditoriale et la voix. La narration (accroche concrète, métaphore du pendule, confrontation des modèles faux) est de niveau Better Explained. La direction artistique « revue imprimée » surpasse l’esthétique souvent générique de Khan Academy. Le parti pris « une notion, calmement » est un positionnement fort et différenciant.

Où il reste en deçà :  
— Interactivité générative. Brilliant construit la compréhension par manipulation directe (on déplace, on teste, la scène réagit). Ici l’interactivité est surtout révélatrice (cliquer pour dévoiler), pas exploratoire. C’est l’écart principal.  
— Animation explicative. 3Blue1Brown doit sa force à l’animation du raisonnement. Le RLC appelle exactement ça ; les courbes statiques ne montrent pas le mouvement.  
— Personnalisation & progression adaptative. Le SOTA mémorise, adapte la difficulté, planifie les révisions. Ici, rien de persistant.  
— Échelle & robustesse. Catalogue restreint, recherche absente, métadonnées partielles, et un bug de contenu en production (5.1) : autant de signes d’un produit encore jeune vs. des plateformes matures.  
— Multimodalité. Pas de vidéo, pas d’audio, pas de schémas animés — le SOTA combine plusieurs canaux.

En synthèse : le site est SOTA sur le goût, la voix et l’intention pédagogique ; il est émetteur mais pas encore mature sur l’interactivité profonde, la personnalisation et la robustesse d’ingénierie.

8. RECOMMANDATIONS PRIORISÉES

Priorité haute (finition & crédibilité) 👍1) Supprimer du build de production les commentaires TODO qui fuient dans le texte rendu (bug 5.1).  
2\) Plafonner la largeur de la colonne de lecture (\~65ch) pour restaurer une mesure confortable.  
3\) Auditer et corriger les contrastes de texte (WCAG AA) sur légendes, métadonnées et items inactifs.  
4\) Compléter les métadonnées : favicon, og:title, og:image, twitter:card, canonical, JSON-LD.

Priorité moyenne (profondeur d’expérience) :  
5\) Ajouter au moins une animation/simulation jouable par notion physique (sliders R,L,C ; courbe recalculée en direct ; visualisation de l’échange d’énergie).  
6\) Introduire un suivi de progression persistant (sections lues, QCM réussis, reprise de session).  
7\) Dark mode.  
8\) Vérifier l’accessibilité des équations (MathML/aria-label).

Priorité basse (passage à l’échelle) :  
9\) Recherche globale (notions, formules, termes).  
10\) Interactivité des figures (survol pour lire des valeurs, zoom).  
11\) Export/impression PDF propre pour révision hors-ligne.  
12\) Élargir le catalogue de notions.

9. TABLEAU DE NOTATION (indicatif, /10)

Direction artistique & identité : 9/10  
Typographie & hiérarchie : 8/10 (mesure de ligne à corriger)  
Système de couleur : 8/10 (contrastes à vérifier)  
Navigation & architecture : 8/10  
Composants pédagogiques : 8/10 (interactivité révélatrice mais peu exploratoire)  
Interactivité / animation : 4/10  
Accessibilité : 6/10 (bons gestes : skip link, contrôle de taille ; à confirmer : contrastes, maths)  
Robustesse & finition : 5/10 (bug de contenu en prod, métadonnées partielles)  
SEO / partage : 5/10  
Profondeur de contenu / échelle : 5/10 (catalogue naissant)

Global : \~7/10 — un produit à l’âme et à l’esthétique remarquables, dont la marche vers le SOTA passe par l’interactivité profonde, la personnalisation et un durcissement de la finition technique.

— Fin de l’audit —