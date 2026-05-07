-- ============================================================
-- French lesson content: theory, method, examples per skill
-- Uses dollar-quoting for JSONB values
-- Covers 8 skills of the Moroccan Bac French syllabus
-- ============================================================

-- 1. Analyse de texte
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Methodologie de l'analyse de texte",
      "body_fr": "L'analyse de texte consiste a etudier un extrait de maniere organisee en degageant son sens et ses procedes.\n\nEtapes prealables :\n1. Situer le texte : identifier l'auteur, l'oeuvre, le genre, l'epoque\n2. Determiner la nature du texte : narratif, descriptif, argumentatif, explicatif, dialogique\n3. Degager la structure : decouper le texte en parties logiques (mouvements)\n4. Identifier les themes principaux et secondaires\n5. Reperer le registre dominant : lyrique, tragique, comique, polemique, didactique, pathetique\n\nElements a analyser :\n- La situation d'enonciation : qui parle ? a qui ? ou ? quand ? pourquoi ?\n- Le champ lexical dominant\n- Les temps verbaux et leur valeur\n- La tonalite du texte\n- Les procedes stylistiques employes"
    },
    {
      "type": "method",
      "title_fr": "Analyse lineaire et analyse thematique",
      "body_fr": "L'analyse lineaire :\nElle suit l'ordre du texte, mouvement par mouvement.\n1. Lire le texte plusieurs fois et numerotez les lignes\n2. Decouper le texte en 2 a 4 mouvements selon les idees\n3. Pour chaque mouvement : relever les procedes, les analyser et les interpreter\n4. Montrer la progression du texte d'un mouvement a l'autre\n\nL'analyse thematique :\nElle regroupe les observations par axes de lecture.\n1. Degager 2 ou 3 axes (grandes idees) qui traversent le texte\n2. Pour chaque axe : rassembler les citations et procedes qui s'y rattachent\n3. Organiser les observations du plus simple au plus approfondi\n\nConseils pratiques :\n- Toujours citer le texte entre guillemets avec le numero de ligne\n- Ne jamais separer le releve d'un procede de son interpretation\n- Formuler : « L'auteur utilise [procede] pour [effet produit] »"
    },
    {
      "type": "example",
      "title_fr": "Exemple d'introduction pour une analyse de texte",
      "body_fr": "Sujet : Analysez un extrait de La Boite a Merveilles d'Ahmed Sefrioui (chapitre 1).\n\nExemple d'introduction redigee :\n\n« La Boite a Merveilles, publiee en 1954, est le premier roman autobiographique marocain d'expression francaise. Son auteur, Ahmed Sefrioui, y relate les souvenirs d'enfance du petit Sidi Mohammed dans la medina de Fes. [Presentation]\n\nL'extrait soumis a notre analyse est tire du premier chapitre du roman. Le narrateur, desormais adulte, evoque la solitude qu'il ressentait enfant et sa fascination pour les objets de sa boite a merveilles. [Situation]\n\nNous etudierons d'abord le theme de la solitude de l'enfant, puis nous analyserons le role de l'imaginaire comme refuge. [Annonce du plan] »\n\nStructure a retenir :\n1. Presentation de l'oeuvre et de l'auteur (2-3 phrases)\n2. Situation de l'extrait dans l'oeuvre (1-2 phrases)\n3. Annonce des axes d'analyse (1 phrase)"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000063';

-- 2. Figures de style
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les principales figures de style",
      "body_fr": "Les figures de style sont des procedes d'expression qui s'ecartent de l'usage ordinaire de la langue pour produire un effet particulier.\n\nFigures d'analogie :\n- Comparaison : rapprochement de deux elements avec un outil de comparaison (comme, tel, pareil a). Ex : « Il est fort comme un lion. »\n- Metaphore : comparaison sans outil. Ex : « Cet homme est un lion. »\n- Personnification : attribuer des caracteristiques humaines a un objet ou un animal. Ex : « Le vent gemissait. »\n- Allegorie : representation concrete d'une idee abstraite. Ex : la Justice representee par une femme aux yeux bandes.\n\nFigures d'opposition :\n- Antithese : opposition de deux idees. Ex : « Certains aiment le jour, d'autres preferent la nuit. »\n- Oxymore : alliance de deux mots contradictoires. Ex : « une obscure clarte » (Corneille)\n\nFigures d'amplification et d'attenuation :\n- Hyperbole : exageration. Ex : « Je meurs de faim. »\n- Litote : dire moins pour suggerer plus. Ex : « Ce n'est pas mauvais » (= c'est tres bon).\n- Euphemisme : attenuer une realite desagreable. Ex : « Il nous a quittes » (= il est mort)."
    },
    {
      "type": "method",
      "title_fr": "Comment identifier et interpreter les figures",
      "body_fr": "Methode en 3 etapes :\n\n1. Reperer : Lire attentivement et souligner les expressions qui semblent inhabituelles, imagees ou frappantes. Se poser la question : « Est-ce que cette expression est prise au sens propre ou au sens figure ? »\n\n2. Nommer : Identifier la figure de style en la classant :\n- Y a-t-il une comparaison (avec ou sans outil) ? -> Comparaison ou Metaphore\n- Y a-t-il une opposition ? -> Antithese ou Oxymore\n- Y a-t-il une exageration ou une attenuation ? -> Hyperbole, Litote ou Euphemisme\n- Y a-t-il une repetition ? -> Anaphore, Repetition ou Gradation\n- Y a-t-il une construction particuliere ? -> Chiasme, Parallelisme, Enumeration\n\n3. Interpreter : Expliquer l'effet produit et le lien avec le sens du texte :\n- Quel sentiment est renforce ?\n- Quelle image est creee dans l'esprit du lecteur ?\n- En quoi cette figure sert-elle l'intention de l'auteur ?\n\nFormule modele : « L'auteur emploie une [nom de la figure] : [citation]. Cette figure met en valeur / souligne / renforce [interpretation]. »"
    },
    {
      "type": "example",
      "title_fr": "Exercice : identifier les figures de style",
      "body_fr": "Identifiez et interpretez la figure de style dans chaque phrase :\n\n1. « Ma jeunesse ne fut qu'un tenebreux orage. » (Baudelaire)\n-> Metaphore : la jeunesse est assimilee a un orage. Elle evoque une periode sombre et tourmentee.\n\n2. « Je suis mille fois mort sans cesser de vivre. »\n-> Hyperbole : l'exageration (« mille fois ») exprime l'intensite de la souffrance.\n\n3. « La mer montait, montait, montait encore. »\n-> Gradation (par repetition) : elle traduit la progression inquietante de la montee des eaux.\n\n4. « Cette obscure clarte qui tombe des etoiles. » (Corneille)\n-> Oxymore : « obscure clarte » associe deux termes contradictoires pour creer une atmosphere mysterieuse.\n\n5. « Va, je ne te hais point. » (Corneille, Le Cid)\n-> Litote : Chimene dit qu'elle ne hait pas Rodrigue, mais en realite, elle veut dire qu'elle l'aime passionnement.\n\n6. « La nature est un temple ou de vivants piliers / Laissent parfois sortir de confuses paroles. » (Baudelaire)\n-> Personnification et metaphore : la nature est comparee a un temple, et ses elements sont dotes de la parole."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000064';

-- 3. Argumentation et these
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "These, arguments et types de raisonnement",
      "body_fr": "Un texte argumentatif vise a convaincre ou persuader le lecteur.\n\nLes composantes de l'argumentation :\n- La these : l'idee defendue par l'auteur (opinion, point de vue)\n- La these adverse (ou antithese) : l'idee combattue par l'auteur\n- Les arguments : les raisons avancees pour soutenir la these\n- Les exemples : les illustrations concretes des arguments (faits, citations, anecdotes)\n\nTypes de raisonnement :\n- Deductif : du general au particulier (regle -> exemple)\n- Inductif : du particulier au general (exemples -> regle)\n- Par analogie : comparer avec une situation similaire\n- Par l'absurde : montrer que la these adverse mene a des consequences inacceptables\n- Concessif : admettre une partie de la these adverse avant de la refuter (« Certes... mais... »)\n\nLes moyens de persuasion :\n- Convaincre : faire appel a la raison (arguments logiques)\n- Persuader : faire appel aux sentiments et aux emotions\n- Deliberer : peser le pour et le contre avant de trancher"
    },
    {
      "type": "method",
      "title_fr": "Identifier la strategie argumentative",
      "body_fr": "Pour analyser un texte argumentatif, suivre ces etapes :\n\n1. Identifier la these defendue :\n- Quelle est l'opinion de l'auteur ?\n- Est-elle formulee explicitement ou implicitement ?\n- Ou se trouve-t-elle dans le texte (debut, fin) ?\n\n2. Reperer les arguments :\n- Combien d'arguments l'auteur avance-t-il ?\n- Sont-ils ranges du moins fort au plus fort (gradation) ?\n- Quels connecteurs logiques les relient ? (car, en effet, de plus, par consequent, neanmoins...)\n\n3. Analyser les exemples :\n- Chaque argument est-il illustre par un exemple ?\n- De quel type : fait historique, statistique, temoignage, reference litteraire ?\n\n4. Etudier la strategie :\n- L'auteur refute-t-il une these adverse ?\n- Utilise-t-il l'ironie, la concession, l'appel aux sentiments ?\n- A qui s'adresse-t-il ? (destinataire)\n\n5. Conclure sur l'efficacite de l'argumentation :\n- Le texte est-il convaincant ? Pourquoi ?"
    },
    {
      "type": "example",
      "title_fr": "Analyse d'un texte argumentatif",
      "body_fr": "Texte : « La lecture est indispensable a la formation de l'esprit. En effet, elle enrichit le vocabulaire et ameliore l'expression ecrite. De plus, elle ouvre l'esprit sur d'autres cultures et d'autres modes de pensee. Certes, certains affirment que les nouvelles technologies ont remplace le livre, mais rien ne peut egaler le plaisir de se plonger dans un roman et de laisser son imagination vagabonder. »\n\nAnalyse :\n\n- These : La lecture est indispensable a la formation de l'esprit.\n\n- Argument 1 : Elle enrichit le vocabulaire et ameliore l'expression ecrite.\n  (Argument fonde sur l'utilite pratique)\n\n- Argument 2 : Elle ouvre l'esprit sur d'autres cultures.\n  (Argument fonde sur l'ouverture intellectuelle)\n\n- Concession : « Certes, certains affirment que les nouvelles technologies ont remplace le livre... »\n  L'auteur reconnait la these adverse avant de la refuter.\n\n- Refutation : « mais rien ne peut egaler le plaisir de se plonger dans un roman... »\n  L'auteur fait appel a l'experience personnelle du lecteur.\n\n- Strategie : raisonnement concessif + appel aux sentiments (persuasion)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000065';

-- 4. Structure de la dissertation
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les parties de la dissertation",
      "body_fr": "La dissertation est un exercice d'argumentation organisee autour d'un sujet donne.\n\nStructure generale :\n\n1. INTRODUCTION (un seul paragraphe) :\n- Amorce : phrase d'accroche en lien avec le sujet (citation, fait, question)\n- Reformulation du sujet : montrer qu'on a compris la problematique\n- Problematique : la question centrale a laquelle on va repondre\n- Annonce du plan : presenter les grandes parties (2 ou 3)\n\n2. DEVELOPPEMENT (2 ou 3 parties) :\n- Chaque partie defend une idee principale\n- Chaque partie contient 2 a 3 sous-parties (argument + exemple)\n- Des transitions relient les parties entre elles\n\n3. CONCLUSION (un seul paragraphe) :\n- Bilan : synthese des idees developpees\n- Reponse a la problematique : prise de position claire\n- Ouverture : elargissement du sujet (question, perspective nouvelle)\n\nTypes de plans :\n- Plan dialectique : these / antithese / synthese (le plus courant au Bac)\n- Plan analytique : constat / causes / consequences (ou solutions)\n- Plan thematique : plusieurs aspects d'une meme question"
    },
    {
      "type": "method",
      "title_fr": "Construire un plan dialectique ou analytique",
      "body_fr": "Plan dialectique (these / antithese / synthese) :\nA utiliser quand le sujet invite a discuter, debattre (« Pensez-vous que... », « Dans quelle mesure... »)\n\nI. These : On defend une premiere position\n   a) Argument 1 + exemple\n   b) Argument 2 + exemple\n\nII. Antithese : On nuance ou on s'oppose\n   a) Argument 1 + exemple\n   b) Argument 2 + exemple\n\nIII. Synthese : On depasse l'opposition\n   a) Proposition qui concilie les deux points de vue\n   b) Prise de position personnelle\n\nPlan analytique (constat / causes / solutions) :\nA utiliser quand le sujet invite a analyser un phenomene.\n\nI. Constat : description du phenomene\nII. Causes : explication des raisons\nIII. Consequences ou solutions\n\nConseils :\n- Au brouillon, lister toutes les idees puis les classer\n- Chaque argument doit etre illustre par un exemple precis\n- Rediger les transitions : elles annoncent la partie suivante\n- Soigner l'introduction et la conclusion (premieres et dernieres impressions du correcteur)"
    },
    {
      "type": "example",
      "title_fr": "Plan detaille sur un sujet type",
      "body_fr": "Sujet : « La litterature a-t-elle pour unique fonction de divertir le lecteur ? »\n\nProblematique : La litterature se limite-t-elle au simple divertissement ou remplit-elle d'autres fonctions essentielles ?\n\nI. La litterature comme source de divertissement (these)\n   a) Le plaisir de l'evasion : le roman d'aventure transporte le lecteur dans d'autres mondes (ex : Le Petit Prince de Saint-Exupery)\n   b) Le jeu avec les mots et l'imagination : la poesie et le conte stimulent l'imaginaire (ex : les contes des Mille et Une Nuits)\n\nII. Mais la litterature va bien au-dela du divertissement (antithese)\n   a) Fonction educative : la litterature transmet des connaissances et des valeurs (ex : La Boite a Merveilles peint la societe marocaine traditionnelle)\n   b) Fonction critique : elle denonce les injustices sociales (ex : Antigone d'Anouilh questionne le pouvoir et la liberte)\n   c) Fonction cathartique : elle permet au lecteur de vivre des emotions et de mieux se connaitre\n\nIII. La litterature : une rencontre enrichissante (synthese)\n   a) L'oeuvre litteraire reussie combine plaisir et reflexion\n   b) Le lecteur y trouve a la fois du divertissement et une ouverture sur le monde\n\nConclusion : La litterature ne se reduit pas au divertissement ; elle est un miroir du monde et un outil de reflexion."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000066';

-- 5. Commentaire compose
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Methodologie du commentaire compose",
      "body_fr": "Le commentaire compose est un exercice qui consiste a analyser un texte litteraire de maniere organisee autour d'axes de lecture.\n\nPrincipes fondamentaux :\n- Il ne s'agit PAS de paraphraser (reformuler le texte), mais d'ANALYSER (expliquer comment l'auteur s'y prend pour produire du sens)\n- Le commentaire est organise par axes de lecture, et non pas ligne par ligne\n- Chaque observation doit lier un procede (forme) a un effet de sens (fond)\n\nLes axes de lecture :\n- Ce sont les grandes idees directrices du commentaire (en general 2 ou 3)\n- Ils sont formules sous forme de phrases ou de questions\n- Ils ne doivent pas se repeter ni se contredire\n- Ils progressent du plus evident au plus subtil\n\nExemples d'axes possibles :\n- Le portrait d'un personnage tourmente\n- La critique de la societe a travers l'ironie\n- Le lyrisme et l'expression des sentiments\n- La dimension symbolique du recit\n\nStructure du commentaire :\n- Introduction (presentation, situation, annonce des axes)\n- Developpement (un paragraphe par sous-partie, avec citations et analyses)\n- Conclusion (bilan + ouverture)"
    },
    {
      "type": "method",
      "title_fr": "De l'observation au commentaire organise",
      "body_fr": "Etape 1 - Premiere lecture (10 min) :\n- Lire le texte 2 a 3 fois\n- Noter les premieres impressions : de quoi parle le texte ? Quelle emotion se degage ?\n- Identifier le genre, le type et le registre\n\nEtape 2 - Analyse detaillee (20 min) :\n- Souligner les procedes : figures de style, champs lexicaux, temps verbaux, ponctuation, rythme\n- Pour chaque procede, noter l'effet produit\n- Regrouper les observations par themes\n\nEtape 3 - Elaboration du plan (15 min) :\n- Formuler 2 ou 3 axes de lecture a partir des regroupements\n- Chaque axe comporte 2 a 3 sous-parties\n- Chaque sous-partie : idee + citation + analyse du procede + interpretation\n\nEtape 4 - Redaction (1h) :\n- Introduction : auteur, oeuvre, genre, situation de l'extrait, annonce des axes\n- Developpement : un paragraphe par sous-partie avec des transitions\n- Conclusion : bilan des analyses + ouverture\n\nA eviter :\n- La paraphrase (ne pas repeter le texte en d'autres mots)\n- Le catalogue de procedes (ne pas lister sans interpreter)\n- L'etude lineaire deguisee (ne pas suivre l'ordre du texte)"
    },
    {
      "type": "example",
      "title_fr": "Plan de commentaire sur un extrait",
      "body_fr": "Extrait : debut du chapitre 1 de La Boite a Merveilles (le narrateur evoque sa solitude d'enfant au milieu des femmes du voisinage).\n\nIntroduction :\n- Presentation de l'oeuvre et de l'auteur\n- Situation de l'extrait : incipit du roman, le narrateur adulte se souvient\n- Axes : I. Le recit d'une enfance solitaire / II. Le pouvoir de l'imaginaire\n\nAxe I - Le recit d'une enfance solitaire\n   a) Un enfant isole parmi les adultes\n      - Champ lexical de la solitude : « seul », « a l'ecart »\n      - Opposition entre le monde bruyant des femmes et le silence de l'enfant\n   b) Le regard de l'enfant sur le monde des adultes\n      - Focalisation interne : le lecteur voit a travers les yeux de Sidi Mohammed\n      - Descriptions teintees d'incomprehension enfantine\n\nAxe II - Le pouvoir de l'imaginaire comme refuge\n   a) La boite a merveilles : un tresor personnel\n      - Champ lexical du merveilleux et de la fascination\n      - Les objets ordinaires deviennent extraordinaires\n   b) Le double regard du narrateur\n      - Le narrateur adulte porte un regard nostalgique sur son enfance\n      - L'ecriture oscille entre tendresse et lucidite\n\nConclusion : Cet incipit installe les themes centraux du roman : solitude, imaginaire et memoire."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000067';

-- 6. Redaction et expression
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Qualite de l'expression ecrite",
      "body_fr": "Pour obtenir une bonne note au Bac, la qualite de l'expression est essentielle. Voici les piliers d'une bonne redaction :\n\nLes connecteurs logiques :\n- Addition : de plus, en outre, par ailleurs, egalement\n- Cause : car, en effet, parce que, puisque, etant donne que\n- Consequence : donc, par consequent, ainsi, c'est pourquoi, de ce fait\n- Opposition : mais, cependant, neanmoins, toutefois, en revanche, or\n- Concession : certes... mais, bien que, meme si, quoique\n- Illustration : par exemple, notamment, ainsi, en particulier\n- Conclusion : en somme, en definitive, finalement, en conclusion\n\nLes registres de langue :\n- Soutenu : utilise dans les dissertations et commentaires (ex : « Il convient d'examiner... »)\n- Courant : acceptable dans les exercices ecrits (ex : « On peut observer que... »)\n- Familier : a eviter absolument dans les copies du Bac\n\nRegles fondamentales :\n- Ecrire des phrases claires et pas trop longues\n- Varier le vocabulaire (eviter les repetitions)\n- Respecter la concordance des temps\n- Faire attention a l'orthographe et a la ponctuation"
    },
    {
      "type": "method",
      "title_fr": "Techniques de redaction",
      "body_fr": "Rediger une introduction efficace :\n1. Amorce : une phrase d'accroche qui capte l'attention (citation, question, fait general)\n2. Contexte : situer le sujet ou le texte\n3. Problematique : formuler la question centrale\n4. Annonce du plan : presenter les parties (sans les detailler)\n\nRediger une transition :\nUne transition relie deux parties. Elle comporte :\n1. Un bilan de la partie precedente (1 phrase)\n2. Une annonce de la partie suivante (1 phrase)\nExemple : « Apres avoir montre que la litterature divertit, nous verrons qu'elle remplit egalement une fonction educative. »\n\nRediger une conclusion :\n1. Bilan : rappeler les principales idees sans les repeter mot pour mot\n2. Reponse a la problematique : donner une reponse claire et nuancee\n3. Ouverture : elargir le sujet (question, comparaison avec un autre domaine)\n\nAstuces pour ameliorer son style :\n- Remplacer « il y a » par « on observe », « on remarque », « il existe »\n- Remplacer « on voit que » par « il apparait que », « force est de constater que »\n- Remplacer « faire » par des verbes precis : realiser, effectuer, accomplir\n- Utiliser des tournures impersonnelles : « il convient de », « il s'avere que »"
    },
    {
      "type": "example",
      "title_fr": "Reformulation et amelioration d'un paragraphe",
      "body_fr": "Version initiale (faible) :\n« Dans ce texte, l'auteur parle de la solitude. Il dit que le personnage est seul. Il y a des mots tristes. C'est un texte triste et on voit que le personnage souffre. »\n\nProblemes identifies :\n- Vocabulaire pauvre et repetitif (« triste » repete)\n- Paraphrase sans analyse\n- Absence de procedes litteraires\n- Tournures vagues (« il y a », « on voit »)\n\nVersion amelioree :\n« Dans cet extrait, l'auteur aborde le theme de la solitude a travers le personnage principal. En effet, le champ lexical de l'isolement (« seul », « abandonne », « silence ») traduit la detresse du protagoniste. Par ailleurs, l'emploi de phrases courtes et de la ponctuation expressive (points de suspension, exclamations) cree un rythme saccade qui renforce le sentiment de desespoir. Ainsi, la dimension pathetique du texte suscite l'empathie du lecteur. »\n\nAmeliorations apportees :\n- Vocabulaire varie et precis\n- Identification d'un procede (champ lexical) avec citation\n- Analyse de la forme (phrases courtes, ponctuation)\n- Interpretation de l'effet produit sur le lecteur\n- Utilisation de connecteurs logiques (en effet, par ailleurs, ainsi)"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000068';

-- 7. Le roman : La Boite a Merveilles (Ahmed Sefrioui)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Elements d'analyse du roman",
      "body_fr": "Un roman s'analyse selon plusieurs axes :\n\nLes personnages :\n- Le personnage principal (protagoniste) : son portrait physique et moral, son evolution\n- Les personnages secondaires : leur role dans l'intrigue\n- Les relations entre personnages : alliances, conflits, influences\n\nLa narration :\n- Le narrateur : qui raconte ? (narrateur = personnage principal dans l'autobiographie)\n- Le point de vue narratif : interne (on voit a travers les yeux d'un personnage), externe (observation neutre), omniscient (le narrateur sait tout)\n- Les temps du recit : passe simple (actions), imparfait (descriptions, habitudes), present de narration (rendre vivant)\n\nLe cadre spatio-temporel :\n- Le lieu : ou se deroule l'action ? Quel est son role symbolique ?\n- Le temps : epoque, duree de l'action, chronologie ou retours en arriere\n\nLes themes :\n- Les grands sujets abordes par l'oeuvre (amour, mort, liberte, enfance, societe...)\n- Leur lien avec le contexte historique et culturel de l'auteur\n\nLe style :\n- Le registre dominant (lyrique, realiste, merveilleux...)\n- Les procedes recurrents de l'auteur"
    },
    {
      "type": "method",
      "title_fr": "La Boite a Merveilles : themes, structure et style",
      "body_fr": "Ahmed Sefrioui (1915-2004), ecrivain marocain, publie La Boite a Merveilles en 1954. C'est un recit autobiographique a la premiere personne.\n\nStructure : 12 chapitres couvrant environ une annee scolaire dans la vie du petit Sidi Mohammed (6 ans), dans la medina de Fes.\n\nPersonnages principaux :\n- Sidi Mohammed : enfant solitaire, reveur, sensible, fascine par sa boite a merveilles\n- Lalla Zoubida : sa mere, femme au foyer, superstitieuse, emotionnelle\n- Maalam Abdeslam : son pere, artisan tisserand, homme sage et pieux\n- Lalla Aicha : amie de la mere, personnage malheureux (mari la repudie)\n\nThemes majeurs :\n- La solitude de l'enfant : Sidi Mohammed se sent different, isole parmi les adultes\n- L'imaginaire et le merveilleux : la boite a merveilles est un refuge contre la realite\n- La vie quotidienne dans la medina : fetes, traditions, hammam, souk\n- La condition de la femme : soumission, superstitions, peurs\n- La religion et les croyances populaires : saints, voyantes, amulettes\n\nStyle de Sefrioui :\n- Ecriture simple, poetique, teintee de nostalgie\n- Double regard : l'enfant naif et l'adulte qui se souvient\n- Descriptions sensorielles (odeurs, couleurs, sons de la medina)"
    },
    {
      "type": "example",
      "title_fr": "Question type sur La Boite a Merveilles",
      "body_fr": "Question : En quoi la boite a merveilles symbolise-t-elle le monde interieur de Sidi Mohammed ?\n\nElements de reponse :\n\n1. Un objet refuge contre la solitude :\n- Sidi Mohammed se sent isole au milieu du monde des adultes qu'il ne comprend pas\n- La boite contient des objets ordinaires (boutons, perles, cles, images) qu'il transforme par son imagination en tresors fabuleux\n- Elle represente son jardin secret, son espace prive ou personne ne peut entrer\n\n2. Le pouvoir de l'imagination enfantine :\n- Chaque objet de la boite prend une dimension magique et merveilleuse\n- L'enfant dialogue avec ses objets, les anime, leur donne une ame\n- C'est une illustration du regard poetique de l'enfance sur le monde\n\n3. Un symbole de l'ecriture :\n- Comme l'ecrivain, l'enfant transfigure le reel par l'imaginaire\n- La boite a merveilles est une metaphore du recit lui-meme : Sefrioui adulte transforme ses souvenirs d'enfance en matiere litteraire\n- La perte de la boite (chapitre 12) symbolise la fin de l'innocence\n\nConclusion : La boite a merveilles est bien plus qu'un jouet ; elle incarne le monde interieur de l'enfant, sa capacite a poetiser le reel, et annonce la vocation d'ecrivain de Sefrioui."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000069';

-- 8. Le theatre : Antigone (Jean Anouilh)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Elements du theatre",
      "body_fr": "Le theatre est un genre litteraire destine a etre represente sur scene.\n\nLes composantes du texte theatral :\n- Le dialogue : echange de paroles entre les personnages (repliques)\n- Le monologue : un personnage parle seul sur scene (exprime ses pensees)\n- L'aparte : un personnage s'adresse au public sans que les autres l'entendent\n- Les didascalies : indications sceniques de l'auteur (decor, gestes, ton, deplacements)\n- La tirade : longue replique d'un personnage\n\nLa structure d'une piece :\n- Exposition : presentation des personnages, du cadre et de l'intrigue\n- Noeud : developpement du conflit dramatique\n- Denouement : resolution du conflit (tragique ou heureux)\n\nLe conflit dramatique :\n- Opposition entre deux forces, deux volontes, deux visions du monde\n- Conflit interieur : le personnage est dechire entre deux choix\n- Conflit exterieur : opposition entre deux personnages\n\nLes genres theatraux :\n- La tragedie : personnages nobles, destin fatal, fin malheureuse\n- La comedie : personnages ordinaires, situations amusantes, fin heureuse\n- Le drame : melange du tragique et du comique\n- La tragedie moderne : reprend les mythes antiques dans un cadre contemporain"
    },
    {
      "type": "method",
      "title_fr": "Antigone d'Anouilh : themes, personnages et tragedie moderne",
      "body_fr": "Jean Anouilh (1910-1987) ecrit Antigone en 1944, pendant l'Occupation allemande. La piece reprend le mythe de Sophocle.\n\nResume : Apres la mort de ses deux freres (Eteocle et Polynice), Antigone brave l'interdiction de son oncle Creon (roi de Thebes) et enterre Polynice. Elle est condamnee a mort.\n\nPersonnages :\n- Antigone : jeune fille maigre, obstinee, refuse les compromis. Elle dit « non » au bonheur facile et choisit la mort par fidelite a ses valeurs.\n- Creon : roi pragmatique, oncle d'Antigone. Il represente l'ordre, le pouvoir, le compromis. Il tente de la sauver mais echoue.\n- Hemon : fils de Creon, fiance d'Antigone. Dechire entre l'amour et la fidelite filiale. Se suicide.\n- Ismene : soeur d'Antigone, prudente, choisit la vie et le bonheur.\n- La Nourrice, le Prologue, le Choeur, les Gardes.\n\nThemes majeurs :\n- Le conflit entre l'individu et le pouvoir (liberte vs autorite)\n- Le refus du compromis et la purete morale\n- Le bonheur refuse : Antigone rejette le bonheur « mediocre » que Creon lui propose\n- La solitude du heros tragique\n- L'absurdite de la mort et du destin\n- La jeunesse et la revolte face au monde des adultes"
    },
    {
      "type": "example",
      "title_fr": "Question type sur Antigone",
      "body_fr": "Question : Antigone est-elle une heroine tragique ? Justifiez.\n\nElements de reponse :\n\n1. Antigone possede les caracteristiques du heros tragique :\n- Elle est confrontee a un dilemme impossible : obeir a la loi humaine (Creon) ou a la loi morale et divine (enterrer son frere)\n- Elle connait son destin des le debut (le Prologue annonce sa mort) mais refuse de reculer\n- Elle est seule face au pouvoir : ni Ismene, ni Hemon, ni la Nourrice ne peuvent la detourner de son choix\n\n2. Son « non » est l'essence de la tragedie :\n- Lors de la grande confrontation avec Creon, celui-ci lui revele que Polynice ne meritait pas tant de sacrifice\n- Mais Antigone refuse quand meme de se soumettre : « Moi, je n'ai pas dit oui. Qu'est-ce que vous voulez que ca me fasse, a moi, votre politique ? »\n- Son refus n'est plus fonde sur la piete mais sur un rejet absolu du compromis et du bonheur « sale »\n\n3. Une heroine de la tragedie moderne :\n- Contrairement a la tragedie antique, le destin n'est pas impose par les dieux mais par le choix personnel d'Antigone\n- Anouilh montre que la tragedie est un choix : Antigone choisit librement la mort plutot que de vivre en acceptant le mensonge\n- Sa mort entraine celle d'Hemon et d'Eurydice : la fatalite tragique se confirme\n\nConclusion : Antigone est bien une heroine tragique car elle incarne le refus absolu du compromis et accepte la mort comme prix de sa liberte interieure."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000070';
