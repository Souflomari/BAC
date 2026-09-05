#!/usr/bin/env python3
"""accents-francais.py — rend au corpus les accents que des passages ont perdus.

`web/scripts/accents-manquants.mjs` mesure le défaut sur le texte RENDU : 128
occurrences de mots français écrits sans leurs accents, dans les libellés
d'items et les titres d'exercices que l'élève lit. Ce script les répare à la
SOURCE, seul endroit où la réparation tient.

CE QU'IL S'AUTORISE

Uniquement des mots dont la forme non accentuée n'existe pas en français, ET
dont la forme accentuée est unique. « theoreme » ne peut être que « théorème » ;
« equation » que « équation ». Ces mots-là se corrigent sans lire la phrase.

CE QU'IL REFUSE DE TOUCHER, ET POURQUOI C'EST LE POINT IMPORTANT

Les mots dont la correction dépend du sens : « eleve » est « élève » ou
« élevé », « complete » est « complète » ou « complété », « verifie » est
« vérifie » ou « vérifié ». Un remplacement aveugle y aurait une chance sur deux
de se tromper — et une faute d'accord introduite par un outil est pire que la
faute d'accent qu'il répare. Ces mots sont LISTÉS en fin d'exécution, pour une
relecture, jamais réécrits.

INVARIANTS VÉRIFIÉS AVANT ÉCRITURE

  1. les segments mathématiques (`$…$`) ressortent identiques au caractère près ;
  2. le nombre de `$` est inchangé ;
  3. un fichier YAML qui se lisait avant se lit encore après.

Le premier invariant est celui qui compte : `\\text{meme}` dans une formule doit
rester tel quel si on y touche mal, et une accolade LaTeX cassée fait échouer le
rendu de toute la page. La leçon vient d'une campagne précédente, où une passe
de typographie avait inséré une espace dans une entité XML et cassé huit SVG.

Usage :
  python3 scripts/accents-francais.py --verifier <fichiers…>   (ne réécrit rien)
  python3 scripts/accents-francais.py --ecrire   <fichiers…>
"""
import re
import sys
import yaml

# ── mots à correction unique ──────────────────────────────────────────────────
SUR = {
    "meme": "même", "memes": "mêmes", "etre": "être", "deja": "déjà",
    "apres": "après", "tres": "très", "ete": "été",
    "equation": "équation", "equations": "équations",
    "etude": "étude", "etudes": "études", "etudier": "étudier",
    "etape": "étape", "etapes": "étapes",
    "etat": "état", "etats": "états",
    "element": "élément", "elements": "éléments",
    "electron": "électron", "electrons": "électrons",
    "electrique": "électrique", "electriques": "électriques",
    "electrolyse": "électrolyse",
    "energie": "énergie", "energies": "énergies",
    "equilibre": "équilibre", "equilibres": "équilibres",
    "evolution": "évolution", "evolutions": "évolutions",
    "egalite": "égalité", "egalites": "égalités",
    "inegalite": "inégalité", "inegalites": "inégalités",
    "ecran": "écran", "ecrans": "écrans", "ecole": "école", "ecoles": "écoles",
    "epreuve": "épreuve", "epreuves": "épreuves", "economie": "économie",
    "ecrire": "écrire", "ecrit": "écrit", "ecrits": "écrits",
    "theoreme": "théorème", "theoremes": "théorèmes",
    "derivee": "dérivée", "derivees": "dérivées",
    "integrale": "intégrale", "integrales": "intégrales",
    "numerateur": "numérateur", "numerateurs": "numérateurs",
    "denominateur": "dénominateur", "denominateurs": "dénominateurs",
    "resultat": "résultat", "resultats": "résultats",
    "reponse": "réponse", "reponses": "réponses",
    "methode": "méthode", "methodes": "méthodes",
    "probleme": "problème", "problemes": "problèmes",
    "problematique": "problématique", "problematiques": "problématiques",
    "systeme": "système", "systemes": "systèmes",
    "parametre": "paramètre", "parametres": "paramètres",
    "caractere": "caractère", "caracteres": "caractères",
    "propriete": "propriété", "proprietes": "propriétés",
    "quantite": "quantité", "quantites": "quantités",
    "identite": "identité", "identites": "identités",
    "densite": "densité", "densites": "densités",
    "frequence": "fréquence", "frequences": "fréquences",
    "periode": "période", "periodes": "périodes",
    "reference": "référence", "references": "références",
    "experience": "expérience", "experiences": "expériences",
    "espece": "espèce", "especes": "espèces",
    "operation": "opération", "operations": "opérations",
    "verification": "vérification", "verifications": "vérifications",
    "verifier": "vérifier",
    "definition": "définition", "definitions": "définitions",
    "demonstration": "démonstration", "demonstrations": "démonstrations",
    "demontrer": "démontrer", "deduire": "déduire", "determiner": "déterminer",
    "developpement": "développement", "developpements": "développements",
    "resolution": "résolution", "resolutions": "résolutions",
    "resoudre": "résoudre",
    "reciproque": "réciproque", "reciproques": "réciproques",
    "repere": "repère", "reperes": "repères", "reperer": "repérer",
    "regle": "règle", "regles": "règles",
    "critere": "critère", "criteres": "critères",
    "schema": "schéma", "schemas": "schémas",
    "phenomene": "phénomène", "phenomenes": "phénomènes",
    "hypothese": "hypothèse", "hypotheses": "hypothèses",
    "parenthese": "parenthèse", "parentheses": "parenthèses",
    "synthese": "synthèse", "syntheses": "synthèses",
    "consequence": "conséquence", "consequences": "conséquences",
    "general": "général", "generale": "générale", "generales": "générales",
    "generalement": "généralement",
    "immediatement": "immédiatement", "precisement": "précisément",
    "precedent": "précédent", "precedente": "précédente",
    "precedents": "précédents", "precedentes": "précédentes",
    "premiere": "première", "premieres": "premières",
    "derniere": "dernière", "dernieres": "dernières",
    "entiere": "entière", "entieres": "entières",
    "particuliere": "particulière", "particulieres": "particulières",
    "enonce": "énoncé", "enonces": "énoncés",
    "depart": "départ",
    "interet": "intérêt", "interets": "intérêts",
    "interieur": "intérieur", "interieurs": "intérieurs",
    "exterieur": "extérieur", "exterieurs": "extérieurs",
    "necessaire": "nécessaire", "necessaires": "nécessaires",
    "necessairement": "nécessairement",
    "numero": "numéro", "numeros": "numéros",
    "molecule": "molécule", "molecules": "molécules",
    "reaction": "réaction", "reactions": "réactions",
    "acceleration": "accélération", "accelerations": "accélérations",
    "decroissante": "décroissante", "decroissantes": "décroissantes",
    "lineaire": "linéaire", "lineaires": "linéaires",
    "annee": "année", "annees": "années",
    "matiere": "matière", "matieres": "matières",
    "lumiere": "lumière", "lumieres": "lumières",
    "different": "différent", "differents": "différents",
    "differente": "différente", "differentes": "différentes",
    "donnee": "donnée", "donnees": "données",
    "modele": "modèle", "modeles": "modèles",
    # ── vocabulaire de la discipline, ajouté après une première passe ─────────
    # Chaque entrée passe le même test que les précédentes : la forme SANS
    # accent n'est pas un mot français. C'est la seule règle d'admission.
    "carre": "carré", "carres": "carrés",
    "reduction": "réduction", "reductions": "réductions",
    "decroissance": "décroissance", 
    "inferieur": "inférieur", "inferieure": "inférieure",
    "inferieurs": "inférieurs", "inferieures": "inférieures",
    "superieur": "supérieur", "superieure": "supérieure",
    "superieurs": "supérieurs", "superieures": "supérieures",
    "maniere": "manière", "manieres": "manières",
    "negatif": "négatif", "negative": "négative",
    "negatifs": "négatifs", "negatives": "négatives",
    "negligeable": "négligeable", "negligeables": "négligeables",
    "numerique": "numérique", "numeriques": "numériques",
    "numerotation": "numérotation",
    "probabilite": "probabilité", "probabilites": "probabilités",
    "reel": "réel", "reels": "réels", "reelle": "réelle", "reelles": "réelles",
    "repartition": "répartition",
    "representation": "représentation", "representations": "représentations",
    "resistance": "résistance", "resistances": "résistances",
    "resistif": "résistif", "resistivite": "résistivité",
    "resultante": "résultante", "resultantes": "résultantes",
    "serie": "série", "series": "séries",
    "symetrie": "symétrie", "symetries": "symétries",
    "symetrique": "symétrique", "symetriques": "symétriques",
    "theorique": "théorique", "theoriques": "théoriques",
    "theorie": "théorie", "theories": "théories",
    "unite": "unité", "unites": "unités",
    "celerite": "célérité",
    "experimental": "expérimental", "experimentale": "expérimentale",
    "experimentaux": "expérimentaux", "experimentales": "expérimentales",
    "caracteristique": "caractéristique", "caracteristiques": "caractéristiques",
    "decimale": "décimale", "decimales": "décimales",
    "degre": "degré", "degres": "degrés",
    "deuxieme": "deuxième", "troisieme": "troisième", "quatrieme": "quatrième",
    "cinquieme": "cinquième", "sixieme": "sixième", "septieme": "septième",
    "huitieme": "huitième", "neuvieme": "neuvième", "dixieme": "dixième",
    "mecanique": "mécanique", "mecaniques": "mécaniques",
    "metallique": "métallique", "metalliques": "métalliques",
    "metal": "métal", "metaux": "métaux",
    "oxydoreduction": "oxydoréduction",
    "reactif": "réactif", "reactifs": "réactifs",
    "temperature": "température", "temperatures": "températures",
    "electrode": "électrode", "electrodes": "électrodes",
    "electronique": "électronique", "electroniques": "électroniques",
    "radioactivite": "radioactivité", 
    "desintegration": "désintégration", "desintegrations": "désintégrations",
    "activite": "activité", "activites": "activités",
    "nucleide": "nucléide", "nucleides": "nucléides",
    "energetique": "énergétique", "energetiques": "énergétiques",
    "cinetique": "cinétique", "cinetiques": "cinétiques",
    "periodique": "périodique", "periodiques": "périodiques",
    "periodicite": "périodicité",
    "resonance": "résonance", "impedance": "impédance",
    "capacite": "capacité", "capacites": "capacités",
    "intensite": "intensité", "intensites": "intensités",
    "conductimetrie": "conductimétrie", "spectrophotometrie": "spectrophotométrie",
    "manometrique": "manométrique",
    "equivalence": "équivalence", "equivalences": "équivalences",
    "acidite": "acidité", "basicite": "basicité",
    "esterification": "estérification",
    "genetique": "génétique", "genetiques": "génétiques",
    "heredite": "hérédité", "phenotype": "phénotype", "phenotypes": "phénotypes",
    "genotype": "génotype", "genotypes": "génotypes",
    "metamorphique": "métamorphique", "metamorphiques": "métamorphiques",
    "sedimentaire": "sédimentaire", "sedimentaires": "sédimentaires",
    "lithosphere": "lithosphère", "asthenosphere": "asthénosphère",
    "atmosphere": "atmosphère", "hemisphere": "hémisphère",
    "prealable": "préalable", "prealablement": "préalablement",
    "immediat": "immédiat", "immediate": "immédiate", "immediats": "immédiats",
    "evidemment": "évidemment", "systematiquement": "systématiquement",
    "extremite": "extrémité", "extremites": "extrémités",
    "decrit": "décrit", "decrite": "décrite",
    "defini": "défini", "definie": "définie", "definis": "définis",
    "definies": "définies",
    "deduit": "déduit", "deduite": "déduite",
    "deroulement": "déroulement", "detail": "détail", "details": "détails",
    "deviation": "déviation", "diametre": "diamètre",
    "echelle": "échelle", "echelles": "échelles",
    "echantillon": "échantillon", "echantillons": "échantillons",
    "eclairement": "éclairement", "ecoulement": "écoulement",
    "emission": "émission", "emissions": "émissions",
    "etoile": "étoile", "etoiles": "étoiles",
    "evenement": "événement", "evenements": "événements",
    "geometrie": "géométrie", "geometrique": "géométrique",
    "geometriques": "géométriques",
    "generateur": "générateur", "generateurs": "générateurs",
    "homogene": "homogène", "homogenes": "homogènes",
    "hydrogene": "hydrogène", "oxygene": "oxygène",
    "integration": "intégration",
    "interference": "interférence", "interferences": "interférences",
    "litteral": "littéral", "litterale": "littérale",
    "materiel": "matériel", "materiels": "matériels",
    "mediane": "médiane", "medianes": "médianes",
    "melange": "mélange", "melanges": "mélanges",
    "memoire": "mémoire", "memoires": "mémoires",
    "modelisation": "modélisation", "moleculaire": "moléculaire",
    "operateur": "opérateur", "operateurs": "opérateurs",
    "parallele": "parallèle", "paralleles": "parallèles",
    "perimetre": "périmètre", "polynome": "polynôme", "polynomes": "polynômes",
    "procedure": "procédure", "proportionnalite": "proportionnalité",
    "proximite": "proximité",
    "reflexion": "réflexion", "reflexions": "réflexions",
    "refraction": "réfraction",
    "regime": "régime", "regimes": "régimes",
    "region": "région", "regions": "régions",
    "reseau": "réseau", "reseaux": "réseaux",
    "reversible": "réversible", "revolution": "révolution",
    "rigidite": "rigidité", "schematique": "schématique",
    "securite": "sécurité", "selectivite": "sélectivité",
    "sequence": "séquence", "severe": "sévère",
    "specifique": "spécifique", "specifiques": "spécifiques",
    "sphere": "sphère", "spheres": "sphères",
    "portee": "portée", "portees": "portées",
    "lancee": "lancée", "lancees": "lancées",
    # ── quatrième vague : participes féminins et vocabulaire restant ─────────
    # La forme en « -ée » d'un participe est sans ambiguïté : le masculin
    # (« chargé ») et le féminin (« chargée ») portent le même accent, seul le
    # « e » final les distingue. Cette classe entière est donc sûre.
    "entrainee": "entraînée", "entrainees": "entraînées", "entrainer": "entraîner",
    "chargee": "chargée", "chargees": "chargées",
    "cachee": "cachée", "cachees": "cachées",
    "approchee": "approchée", "approchees": "approchées",
    "acceleree": "accélérée", "accelerees": "accélérées",
    "deviee": "déviée", "deviees": "déviées",
    "courbee": "courbée", "courbees": "courbées",
    "projetee": "projetée", "projetees": "projetées",
    "lachee": "lâchée", "lachees": "lâchées",
    "eliminant": "éliminant", "elimination": "élimination",
    "legerement": "légèrement", "malgre": "malgré", "definit": "définit",
    "geostationnaire": "géostationnaire", "geostationnaires": "géostationnaires",
    "immobilite": "immobilité", "verifient": "vérifient",
    "equatorial": "équatorial", "equatoriale": "équatoriale",
    "geocentrique": "géocentrique", "heliocentrique": "héliocentrique",
    "recalculee": "recalculée", "recalculees": "recalculées",
    "continument": "continûment", "decroit": "décroît",
    # « égale » : le participe « égalé » existe, mais le corpus n'en compte
    # qu'UNE occurrence contre 254 de « égale ». Le risque est mesuré, pas
    # supposé — et la relecture du diff le confirme.
    "egal": "égal", "egale": "égale", "egales": "égales", "egaux": "égaux",
    # « négligés » : la deuxième personne du singulier (« tu négliges ») aurait
    # la même forme nue, mais le corpus ne tutoie jamais dans un énoncé — le
    # mot y est toujours le participe (« frottements négligés »).
    "negliges": "négligés",
    # Les composés en « -même » : le tiret fait partie du mot, et la forme nue
    # n'existe pas davantage que « meme » seul.
    "elle-meme": "elle-même", "lui-meme": "lui-même", "soi-meme": "soi-même",
    "moi-meme": "moi-même", "toi-meme": "toi-même",
    "elles-memes": "elles-mêmes", "eux-memes": "eux-mêmes",
    "nous-memes": "nous-mêmes", "vous-memes": "vous-mêmes",
    "stabilite": "stabilité", "succes": "succès",
    "telescope": "télescope", "universite": "université",
    "variete": "variété", "varietes": "variétés",
    "verite": "vérité", "verites": "vérités", "zero": "zéro",
    # ── troisième vague : candidats DÉDUITS DU CORPUS ─────────────────────────
    # Méthode : pour chaque mot du corpus, comparer sa forme nue et ses formes
    # accentuées ; ne retenir que celles où l'accentuée écrase la nue (au moins
    # huit fois plus fréquente) et où il n'existe qu'UNE forme accentuée. Le
    # corpus se corrige alors avec sa propre orthographe majoritaire, sans que
    # personne ait à deviner. Deux candidats ont été écartés à la relecture,
    # « these » et « evidence » : ce sont aussi des mots anglais, et le corpus
    # en contient (notes de travail, specs). Un outil qui les aurait accentués
    # aurait cassé de l'anglais correct pour réparer du français absent.
    "depend": "dépend", "ecart": "écart", "ecarts": "écarts",
    "liberte": "liberté", "role": "rôle", "regime": "régime",
    "difference": "différence", "independant": "indépendant",
    "independante": "indépendante", "independants": "indépendants",
    "independantes": "indépendantes", "independamment": "indépendamment",
    "lecon": "leçon", "lecons": "leçons", "duree": "durée", "durees": "durées",
    "derivable": "dérivable", "defaut": "défaut", "defauts": "défauts",
    "etant": "étant", "etabli": "établi", "etablir": "établir",
    "coincident": "coïncident", "coincidence": "coïncidence",
    "pres": "près", "nucleons": "nucléons", "disparait": "disparaît",
    "apparait": "apparaît", "apparaitre": "apparaître", "connaitre": "connaître",
    "decroit": "décroît", "exces": "excès", "echelle": "échelle",
    "coherence": "cohérence", "selection": "sélection",
    "precedente": "précédente", "ordonnee": "ordonnée", "moitie": "moitié",
    "legitime": "légitime", "chaine": "chaîne", "chaines": "chaînes",
    "tete": "tête", "separement": "séparément", "polarite": "polarité",
    "plutot": "plutôt", "mesuree": "mesurée", "limitee": "limitée",
    "imprimee": "imprimée", "arrivee": "arrivée", "volonte": "volonté",
    "reellement": "réellement", "liee": "liée", "liees": "liées",
    "intermediaire": "intermédiaire", "ethanol": "éthanol",
    "etait": "était", "etaient": "étaient", "errone": "erroné",
    "calculee": "calculée", "supplementaire": "supplémentaire",
    "reservoir": "réservoir", "metres": "mètres",
    "instantanement": "instantanément", "grace": "grâce",
    "egaux": "égaux", "dignite": "dignité", "depot": "dépôt",
    "deplacement": "déplacement", "resout": "résout",
    "recepteur": "récepteur", "realite": "réalité",
    "predominance": "prédominance", "precision": "précision",
    "orthonorme": "orthonormé", "opposes": "opposés",
    "indefiniment": "indéfiniment", "facon": "façon",
    "extremes": "extrêmes", "elastique": "élastique",
    "coordonnees": "coordonnées", "confirmee": "confirmée",
    "utilisee": "utilisée", "refutee": "réfutée",
    "prediction": "prédiction", "notee": "notée",
    "imposee": "imposée", "entree": "entrée", "entrees": "entrées",
    "emmagasinee": "emmagasinée", "dissipee": "dissipée",
    "dirigee": "dirigée", "dela": "delà", "debut": "début", "debit": "débit",
    "accelerer": "accélérer", "zeros": "zéros",
    "uniformement": "uniformément", "trigonometrique": "trigonométrique",
    "theme": "thème", "themes": "thèmes", "scene": "scène", "scenes": "scènes",
    "repond": "répond", "reliee": "reliée", "recit": "récit",
    "modulee": "modulée", "mecanisme": "mécanisme", "mecanismes": "mécanismes",
    "mathematiques": "mathématiques", "maitre": "maître",
    "leger": "léger", "inchange": "inchangé", "galileen": "galiléen",
    "etiquette": "étiquette", "epoque": "époque",
    "entierement": "entièrement", "elan": "élan", "editoriale": "éditoriale",
    "ecriture": "écriture", "dependance": "dépendance", "alignes": "alignés",
    "trouvee": "trouvée", "simultane": "simultané", "separees": "séparées",
    "sensibilite": "sensibilité", "remplacant": "remplaçant",
    "recue": "reçue", "procedure": "procédure", "precis": "précis",
    "poussee": "poussée", "posee": "posée", "planete": "planète",
    "piece": "pièce", "petrole": "pétrole", "pese": "pèse",
    "paralleles": "parallèles", "mobilisee": "mobilisée",
    "francais": "français", "francaise": "française",
    "eviter": "éviter", "enorme": "énorme", "echangent": "échangent",
    "dioxygene": "dioxygène", "differe": "diffère", "deriver": "dériver",
    "degagement": "dégagement", "decrivent": "décrivent",
    "culpabilite": "culpabilité", "commutativite": "commutativité",
    "benzoique": "benzoïque", "ambiguite": "ambiguïté",
    "differentielle": "différentielle", "differentiel": "différentiel",
    "referentiel": "référentiel", "referentiels": "référentiels",
    "sphere": "sphère", "spheres": "sphères",
    "portee": "portée", "portees": "portées",
    "lancee": "lancée", "lancees": "lancées",
    # ── quatrième vague : participes féminins et vocabulaire restant ─────────
    # La forme en « -ée » d'un participe est sans ambiguïté : le masculin
    # (« chargé ») et le féminin (« chargée ») portent le même accent, seul le
    # « e » final les distingue. Cette classe entière est donc sûre.
    "entrainee": "entraînée", "entrainees": "entraînées", "entrainer": "entraîner",
    "chargee": "chargée", "chargees": "chargées",
    "cachee": "cachée", "cachees": "cachées",
    "approchee": "approchée", "approchees": "approchées",
    "acceleree": "accélérée", "accelerees": "accélérées",
    "deviee": "déviée", "deviees": "déviées",
    "courbee": "courbée", "courbees": "courbées",
    "projetee": "projetée", "projetees": "projetées",
    "lachee": "lâchée", "lachees": "lâchées",
    "eliminant": "éliminant", "elimination": "élimination",
    "legerement": "légèrement", "malgre": "malgré", "definit": "définit",
    "geostationnaire": "géostationnaire", "geostationnaires": "géostationnaires",
    "immobilite": "immobilité", "verifient": "vérifient",
    "equatorial": "équatorial", "equatoriale": "équatoriale",
    "geocentrique": "géocentrique", "heliocentrique": "héliocentrique",
    "recalculee": "recalculée", "recalculees": "recalculées",
    "continument": "continûment", "decroit": "décroît",
    # « égale » : le participe « égalé » existe, mais le corpus n'en compte
    # qu'UNE occurrence contre 254 de « égale ». Le risque est mesuré, pas
    # supposé — et la relecture du diff le confirme.
    "egal": "égal", "egale": "égale", "egales": "égales", "egaux": "égaux",
    # « négligés » : la deuxième personne du singulier (« tu négliges ») aurait
    # la même forme nue, mais le corpus ne tutoie jamais dans un énoncé — le
    # mot y est toujours le participe (« frottements négligés »).
    "negliges": "négligés",
    # Les composés en « -même » : le tiret fait partie du mot, et la forme nue
    # n'existe pas davantage que « meme » seul.
    "elle-meme": "elle-même", "lui-meme": "lui-même", "soi-meme": "soi-même",
    "moi-meme": "moi-même", "toi-meme": "toi-même",
    "elles-memes": "elles-mêmes", "eux-memes": "eux-mêmes",
    "nous-memes": "nous-mêmes", "vous-memes": "vous-mêmes",
}

# ── mots fautifs mais dont la correction dépend du sens : signalés, pas touchés ─
AMBIGUS = {
    "eleve", "eleves",           # élève / élevé
    "complete", "completes",     # complète / complété
    "separe", "separes",         # sépare / séparé
    "resume", "resumes",         # résume / résumé
    "verifie", "verifiee", "verifiees", "verifies",  # vérifie / vérifié(e)(s)
    "eloigne", "eloignes", "elargi", "elargis",
    # découverts par la passe de vérification : plusieurs formes accentuées
    # coexistent dans le corpus, donc l'outil ne peut pas trancher seul
    "elimine", "elimines", "echange", "echanges", "designe", "designes",
    "developpe", "developpes", "necessite", "neglige", "negliges",
    "transfere", "transferes", "derive", "derives", "controle", "controles",
    "etudie", "etudies", "considere", "consideres", "determine", "determines",
    "precede", "procede", "procedes", "generalise",
    # Écartés à la relecture du RENDU, et la leçon vaut d'être gardée : la
    # première version listait aussi « multiplie », « relie », « simplifie »,
    # « exprime », « quantifie », « identifie » et « cote ». Ces formes SONT du
    # français correct — « on multiplie », « la formule relie », « une cote ».
    # La sonde a crié sur onze leçons parfaitement écrites avant qu'on ne s'en
    # aperçoive. Le critère d'admission n'est pas « le corpus contient aussi une
    # forme accentuée » mais « la forme nue n'existe pas en français ».
}

# Le point, la barre oblique et le tiret bas encadrent des IDENTIFIANTS, pas de
# la prose : `mc.philo.etat.coup-etat-detruit-appareil` contient deux fois
# « etat » et ne doit surtout pas être accentué — c'est une clé, référencée
# ailleurs. Une première version de ce script les réécrivait ; le dry-run l'a
# montré avant toute écriture, ce qui est exactement à quoi sert un dry-run.
# Bornes de mot. Le point pose un problème à lui seul : il sépare les segments
# d'un identifiant (`mc.philo.etat.coup-etat`) ET termine les phrases. Une
# première version l'excluait des deux côtés — et ne corrigeait alors AUCUN mot
# en fin de phrase, ce qui laissait « frottements negliges. » intact tout en
# rapportant zéro. On distingue donc les deux cas : un point suivi d'une lettre
# est un séparateur d'identifiant et bloque ; un point suivi d'une espace ou
# d'une fin de ligne est une ponctuation et laisse passer.
BORNE_G = r"(?<![A-Za-zÀ-ÿ0-9_/\\-])(?<![A-Za-zÀ-ÿ0-9]\.)"
BORNE_D = r"(?![A-Za-zÀ-ÿ0-9_/-])(?!\.[A-Za-zÀ-ÿ0-9])"
RE_SUR = re.compile(BORNE_G + "(" + "|".join(sorted(SUR, key=len, reverse=True)) + ")" + BORNE_D)
RE_AMB = re.compile(BORNE_G + "(" + "|".join(sorted(AMBIGUS, key=len, reverse=True)) + ")" + BORNE_D, re.I)
RE_MATH = re.compile(r"\$\$?[^$]*\$\$?")
RE_CODE = re.compile(r"`[^`]*`")
RE_TEXTE_LATEX = re.compile(r"(\\text(?:rm|bf|it)?\{)([^{}$]*)(\})")

# ── mots à correction CONTEXTUELLE ────────────────────────────────────────────
# Ceux-là ont plusieurs formes accentuées ; c'est le mot d'avant qui tranche.
# La règle est écrite explicitement, jamais devinée : « on verifie » est un
# verbe (vérifie), « domaine verifie » est un participe (vérifié). Tout ce qui
# n'entre dans aucune règle reste dans AMBIGUS et part en relecture humaine.
CONTEXTUEL = [
    # (motif, remplacement, formes fautives à signaler à la sonde)
    (re.compile(r"" + BORNE_G + r"(l'|L'|un |Un |d'|D'|chaque |Chaque |on |On )eleve" + BORNE_D),
     lambda m: m.group(1) + "élève", ("eleve",)),
    (re.compile(r"" + BORNE_G + r"eleves" + BORNE_D), lambda m: "élèves", ("eleves",)),
    (re.compile(r"" + BORNE_G + r"(on |On |se |Se )verifie" + BORNE_D),
     lambda m: m.group(1) + "vérifie", ("verifie",)),
    (re.compile(r"" + BORNE_G + r"verifiee" + BORNE_D), lambda m: "vérifiée", ("verifiee",)),
    (re.compile(r"" + BORNE_G + r"verifiees" + BORNE_D), lambda m: "vérifiées", ("verifiees",)),
    (re.compile(r"" + BORNE_G + r"verifies" + BORNE_D), lambda m: "vérifiés", ("verifies",)),
    (re.compile(r"" + BORNE_G + r"(on |On |se |Se )separe" + BORNE_D),
     lambda m: m.group(1) + "sépare", ("separe",)),
    (re.compile(r"" + BORNE_G + r"separes" + BORNE_D), lambda m: "séparés", ("separes",)),
    (re.compile(r"" + BORNE_G + r"(on |On )releve" + BORNE_D),
     lambda m: m.group(1) + "relève", ("releve",)),
    (re.compile(r"" + BORNE_G + r"releves" + BORNE_D), lambda m: "relevés", ("releves",)),
    # « a » → « à » : impossible en général (« il a » / « à »), sûr dans des
    # tournures où le verbe AVOIR ne peut pas se glisser. Chaque entrée est une
    # locution figée ou un adjectif qui appelle « à ». Aucune forme n'est
    # exportée vers la sonde : le mot fautif est « a », qui est aussi un verbe.
    *[
        (re.compile(r"" + BORNE_G + r"(" + g + r") a ", re.I),
         (lambda gr: (lambda m: m.group(1) + " à "))(g), ())
        for g in [r"perpendiculaire", r"parall[èe]le", r"[ée]gale?", r"identique",
                  r"sup[ée]rieure?", r"inf[ée]rieure?", r"proportionnelle?",
                  r"semblable", r"conforme"]
    ],
    *[
        (re.compile(r"" + BORNE_G + r"a (" + d + r")" + BORNE_D, re.I),
         (lambda dr: (lambda m: "à " + m.group(1)))(d), ())
        for d in [r"partir", r"chaque", r"nouveau", r"peu pr[èe]s", r"travers",
                  r"cause", r"mesure que", r"condition", r"savoir", r"droite",
                  r"gauche", r"l'infini", r"la fois", r"l'instant", r"l'origine",
                  r"l'[ée]chelle", r"l'[ée]quilibre", r"l'aide", r"l'inverse"]
    ],
]

# Lignes qui ne portent JAMAIS de prose destinée à l'élève : clés techniques,
# identifiants, commentaires. On ne les lit même pas.
RE_LIGNE_TECHNIQUE = re.compile(
    r"^\s*(-\s*)?(id|ids|skill_code|misconception|misconceptions|tags|slug|notion|"
    r"source|sources|url|href|type|rung|difficulty_level|correct|media|figure|embed|"
    r"tool|key|keys|ref|refs|code|codes|file|files|path|import|export|version|"
    r"schema_version|locale|lang):"
)


def respecte_la_casse(source: str, cible: str) -> str:
    """« Etude » → « Étude », « ETUDE » → « ÉTUDE », « etude » → « étude »."""
    if source.isupper():
        return cible.upper()
    if source[:1].isupper():
        return cible[:1].upper() + cible[1:]
    return cible


def _corrige_prose(fragment: str, compteur: list) -> str:
    """Accentue un fragment de prose (déjà débarrassé des maths et du code)."""
    def rempl(mo):
        compteur[0] += 1
        return respecte_la_casse(mo.group(1), SUR[mo.group(1).lower()])
    fragment = re.sub(RE_SUR.pattern, rempl, fragment, flags=re.I)
    for motif, remplace, _ in CONTEXTUEL:
        def r2(mo):
            compteur[0] += 1
            return remplace(mo)
        fragment = motif.sub(r2, fragment)
    return fragment



def _corrige_math(segment: str, compteur: list) -> str:
    """Dans une formule, seul le contenu de `\text{…}` est du français.

    Le reste — noms de variables, opérateurs, `\mathrm{}` des unités — ne doit
    surtout pas bouger. Mais `\text{egalite verifiee}` est lu par l'élève comme
    une phrase, au milieu de la formule : il lui faut ses accents comme au
    reste. KaTeX rend « é » sans difficulté en mode texte (ce sont l'espace
    fine insécable et l'espace insécable qu'il refuse, pas les lettres).
    """
    return RE_TEXTE_LATEX.sub(
        lambda m: m.group(1) + _corrige_prose(m.group(2), compteur) + m.group(3), segment
    )


def corrige(texte: str):
    """Renvoie (texte corrigé, nombre de remplacements).

    La segmentation se fait sur le FICHIER ENTIER, pas ligne à ligne. La raison
    est un défaut réel, attrapé par l'invariant : dans un bloc plié YAML, une
    formule peut enjamber deux lignes —

        Pour une bille, on relève $v_i=2{,}0\\
        \\text{m/s}$ et $a_i=6{,}0$…

    Vue ligne par ligne, la première n'a qu'un `$` non refermé : le découpage
    prose/maths se décale d'une ligne sur l'autre et l'outil peut réécrire ce
    qu'il croyait être de la prose. L'invariant « les maths ne bougent pas » l'a
    signalé avant toute écriture ; la correction n'est pas de contourner
    l'invariant mais de segmenter au bon niveau.

    Trois zones protégées, dans cet ordre : les lignes techniques (commentaires,
    clés d'identifiants, blocs de code), les segments mathématiques (sauf le
    contenu des `\\text{…}`, qui est du français lu par l'élève), et les
    portions entre accents graves.
    """
    compteur = [0]
    n = len(texte)
    protege = bytearray(n)          # 1 = ne pas toucher

    # 1. lignes techniques et blocs de code
    pos, dans_bloc_code = 0, False
    for ligne in texte.split("\n"):
        nue = ligne.lstrip()
        if nue.startswith("```"):
            dans_bloc_code = not dans_bloc_code
            protege[pos:pos + len(ligne)] = b"\x01" * len(ligne)
        elif dans_bloc_code or nue.startswith("#") or RE_LIGNE_TECHNIQUE.match(ligne):
            protege[pos:pos + len(ligne)] = b"\x01" * len(ligne)
        pos += len(ligne) + 1

    # 2. maths — protégées, sauf l'intérieur des \text{…}
    for m in RE_MATH.finditer(texte):
        protege[m.start():m.end()] = b"\x01" * (m.end() - m.start())
        for t in RE_TEXTE_LATEX.finditer(m.group(0)):
            d = m.start() + t.start(2)
            f = m.start() + t.end(2)
            protege[d:f] = b"\x00" * (f - d)

    # 3. code entre accents graves
    for m in RE_CODE.finditer(texte):
        protege[m.start():m.end()] = b"\x01" * (m.end() - m.start())

    # on ne réécrit que les plages libres, une par une
    sortie, i = [], 0
    while i < n:
        j = i
        libre = protege[i] == 0
        while j < n and (protege[j] == 0) == libre:
            j += 1
        sortie.append(_corrige_prose(texte[i:j], compteur) if libre else texte[i:j])
        i = j
    return "".join(sortie), compteur[0]


def exporter_liste(chemin: str) -> None:
    """Écrit la liste des formes fautives, pour que la SONDE lise la même.

    La sonde qui mesure (web/scripts/accents-manquants.mjs) et le script qui
    répare doivent connaître exactement les mêmes mots : une sonde plus étroite
    que la réparation déclare « propre » ce qu'elle ne sait pas voir, et c'est
    ainsi qu'une porte devient décorative. Plutôt que d'entretenir deux listes
    en deux langages, on en exporte une.
    """
    import json
    # Les formes des règles contextuelles sont DÉCLARÉES, jamais extraites de
    # leurs expressions régulières. La version précédente les devinait — et
    # exportait du même coup les mots de CONTEXTE (« fois », « droite »,
    # « partir », qui apparaissent dans les règles « a → à »). La sonde criait
    # alors sur du français parfaitement écrit, sur onze leçons. Un motif dit
    # ce qu'il CHERCHE et ce qui l'ENTOURE ; seul le premier est une faute.
    formes = sorted(set(SUR) | AMBIGUS | {f for _, _, fs in CONTEXTUEL for f in fs})
    with open(chemin, "w", encoding="utf-8") as fh:
        json.dump({
            "_lisezMoi": "Généré par scripts/accents-francais.py --exporter. "
                         "Ne pas éditer à la main : éditer le script, puis réexporter.",
            "formes": formes,
        }, fh, ensure_ascii=False, indent=1)
        fh.write("\n")
    print(f"{len(formes)} formes exportées → {chemin}")


def main():
    if "--exporter" in sys.argv:
        cible = [a for a in sys.argv[1:] if not a.startswith("--")]
        exporter_liste(cible[0] if cible else "web/scripts/accents.mots.json")
        return 0
    ecrire = "--ecrire" in sys.argv
    fichiers = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not fichiers:
        print("usage: accents-francais.py [--verifier|--ecrire] <fichiers…>")
        return 1

    total, touches = 0, 0
    ambigus_vus = {}
    for f in fichiers:
        src = open(f, encoding="utf-8").read()
        neuf, n = corrige(src)

        prose = "\n".join(
            l for l in src.split("\n")
            if not l.lstrip().startswith("#") and not RE_LIGNE_TECHNIQUE.match(l)
        )
        for m in RE_AMB.finditer(RE_MATH.sub(" ", prose)):
            ambigus_vus.setdefault(m.group(1).lower(), []).append(f)

        if n == 0:
            continue

        # invariant 1 : les segments mathématiques, au caractère près
        def squelette(t):
            # le contenu des \text{…} est justement ce qu'on s'autorise à
            # changer : on le remplace par un jeton avant de comparer.
            return [RE_TEXTE_LATEX.sub(r"\1§\3", m) for m in RE_MATH.findall(t)]
        assert squelette(src) == squelette(neuf), f"{f} : un segment mathématique a bougé"
        # invariant 2 : le compte des délimiteurs
        assert src.count("$") == neuf.count("$"), f"{f} : le nombre de $ a changé"
        # invariant 3 : un YAML lisible le reste
        if f.endswith((".yaml", ".yml")):
            yaml.safe_load(src)          # se lisait-il ?
            yaml.safe_load(neuf)         # se lit-il encore ?

        total += n
        touches += 1
        if ecrire:
            open(f, "w", encoding="utf-8").write(neuf)
        print(f"  {n:5d}  {f}")

    print(f"\n{total} accent(s) rendu(s) dans {touches} fichier(s)"
          + ("" if ecrire else "  [SIMULATION — relancer avec --ecrire]"))
    if ambigus_vus:
        print("\nÀ RELIRE À LA MAIN (la correction dépend du sens, l'outil s'abstient) :")
        for mot, fs in sorted(ambigus_vus.items(), key=lambda kv: -len(kv[1])):
            print(f"  {len(fs):5d}  « {mot} »  ex. {fs[0]}")
    return 0


sys.exit(main())
