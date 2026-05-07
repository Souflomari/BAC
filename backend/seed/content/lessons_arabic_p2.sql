-- 5. Ilm Al-Badie (figures de style arabes)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les procedes esthetiques du Badie",
      "body_fr": "Ilm al-Badie est la science de l'embellissement du discours. Elle etudie les procedes qui ajoutent de la beaute au texte sans en changer le sens fondamental.\n\nProcedes verbaux (mouhassinate lafdhiyya) :\n\n1. Al-Jinas (paronomase) : ressemblance phonetique entre deux mots de sens differents.\n   - Jinas tam (complet) : les deux mots sont identiques en prononciation. Ex : As-sa'at tasa' (L'heure est vaste / suffit)\n   - Jinas naqis (incomplet) : ressemblance partielle. Ex : Bayn al-jaddi wal-jaddi (entre l'effort et la chance)\n\n2. As-Saj' (prose rimee) : les phrases se terminent par la meme lettre ou le meme son. Tres present dans le Coran et la prose classique.\n   Ex : Al-'ilmou nour, wal-jahlou chourour (La science est lumiere, et l'ignorance est des maux)\n\n3. Al-Iqtibas (citation) : insertion d'un verset coranique ou d'un hadith dans le discours sans le signaler comme citation.\n\nProcedes de sens (mouhassinate ma'nawiyya) :\n\n4. At-Tiba'q (antithese) : reunion de deux mots de sens opposes dans la meme phrase.\n   - Tiba'q ijabi : les deux mots sont de meme forme. Ex : al-layl wa an-nahar (la nuit et le jour)\n   - Tiba'q salbi : opposition par la negation. Ex : ya'lamou wa la ya'lam (il sait et il ne sait pas)\n\n5. Al-Mouqabala : opposition de deux groupes de mots ou plus. Ex : Fa-lyad-hak qalilan wa-lyabki kathiran (Qu'ils rient peu et qu'ils pleurent beaucoup) - double opposition : rire/pleurer et peu/beaucoup.\n\n6. Housn at-ta'lil (belle justification) : attribuer a un phenomene une cause poetique, non reelle."
    },
    {
      "type": "method",
      "title_fr": "Reperer et interpreter les procedes esthetiques",
      "body_fr": "Methode d'identification :\n\n1. Pour le tiba'q :\n   - Chercher deux mots antonymes dans la meme phrase\n   - Les deux mots sont-ils affirmatifs ? -> tiba'q ijabi\n   - L'un est-il nie ? -> tiba'q salbi\n   - Plus de deux oppositions ? -> mouqabala\n\n2. Pour le jinas :\n   - Reperer deux mots qui se ressemblent phonetiquement\n   - Ont-ils le meme sens ? -> Ce n'est PAS du jinas\n   - Ont-ils des sens differents ? -> C'est du jinas\n   - Prononciation identique ? -> jinas tam\n   - Prononciation similaire ? -> jinas naqis\n\n3. Pour le saj' :\n   - Observer les fins de phrases ou de segments\n   - Se terminent-elles par le meme son ? -> saj'\n   - Noter la lettre de rime (harf ar-rawiyy)\n\n4. Pour housn at-ta'lil :\n   - L'auteur donne-t-il une explication poetique a un phenomene ?\n   - Cette explication est-elle imaginaire/esthetique ? -> housn at-ta'lil\n\nFormule de reponse a l'examen :\n\"Le poete/auteur emploie [nom du procede] entre les mots [mot 1] et [mot 2], ce qui confere au texte [harmonie sonore / contraste expressif / beaute esthetique] et met en relief [l'idee concernee].\""
    },
    {
      "type": "example",
      "title_fr": "Identifier les figures dans un vers poetique",
      "body_fr": "Vers 1 : Wa la tastawi al-adwa'ou wal-dhalamu\n(Les lumieres et les tenebres ne sont pas egales)\n\nAnalyse :\n- Figure : Tiba'q ijabi entre al-adwa' (lumieres) et adh-dhalam (tenebres)\n- Les deux mots sont antonymes et affirmatifs\n- Effet : le contraste souligne la difference fondamentale entre le bien et le mal / la science et l'ignorance\n\nVers 2 : Sali al-mali tahini fil-hawa saliyya / Wa hili fi ibtisamin 'an jawahiri hiliya\n\nAnalyse :\n- Figure 1 : Jinas naqis entre saliyya (distraction) et hiliya (bijoux/ornements) - proches phonetiquement mais de sens differents\n- Effet : harmonie musicale entre les rimes\n\nVers 3 : La tarhali 'an dhikri al-habib fa-innamou / Doumou'ouhou tahnou ila dhikrahi\n(Ne quitte pas le souvenir du bien-aime car ses larmes ont la nostalgie de son evocation)\n\nAnalyse :\n- Figure : Housn at-ta'lil (belle justification)\n- Le poete justifie les larmes par la nostalgie du souvenir\n- Cause poetique et non reelle : les larmes ne choisissent pas de couler\n- Effet : expression intense de l'attachement emotionnel\n\nExtrait en prose : Al-hamdou lillahi alladhi ja'ala al-'ilma nouran wa al-jahla dhalmatan\n- Figure : Mouqabala entre 'ilm/nour (science/lumiere) et jahl/dhalma (ignorance/obscurite)\n- Double opposition qui renforce le message"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000075';

-- 6. Comprehension de texte arabe
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Methodologie de comprehension d'un texte arabe",
      "body_fr": "La comprehension de texte arabe au Bac repose sur trois niveaux de lecture :\n\nNiveau 1 - Comprehension globale :\n- L'idee principale (al-fikra ar-ra'isiyya) : de quoi parle le texte ?\n- Le theme general (al-mawdou') : quel sujet est traite ?\n- Le type de texte : argumentatif (hijaji), narratif (sardi), descriptif (wasfi), informatif (ikhbari)\n- La these de l'auteur : quelle position defend-il ?\n\nNiveau 2 - Comprehension detaillee :\n- Les idees secondaires (al-afkar al-far'iyya) : quels sont les arguments ou sous-themes ?\n- La structure du texte : introduction, developpement, conclusion\n- Les connecteurs logiques (adawat ar-rabt) : thumma, li-dhaka, lakin, bal, li-anna, haythu...\n- Le champ lexical (al-haql ad-dalali) : regrouper les mots par theme\n\nNiveau 3 - Analyse approfondie :\n- Le registre (at-tabi') : litteraire, journalistique, scientifique, religieux\n- Le ton de l'auteur : ironique, admiratif, critique, nostalgique\n- Les procedes stylistiques employes\n- La visee du texte : informer, convaincre, emouvoir, decrire\n\nVocabulaire de base pour les questions :\n- Istakhraj (extraire), hadded (determiner), bayyen (expliquer)\n- Istantij (conclure), 'allel (justifier), qarin (comparer)"
    },
    {
      "type": "method",
      "title_fr": "Etapes de lecture et d'analyse d'un texte arabe",
      "body_fr": "Methode en 5 etapes pour repondre aux questions de comprehension :\n\nEtape 1 - Premiere lecture (5 minutes) :\n- Lire le texte entierement sans s'arreter sur les mots difficiles\n- Identifier le theme general et le type de texte\n- Lire les questions pour orienter la deuxieme lecture\n\nEtape 2 - Deuxieme lecture active (10 minutes) :\n- Souligner les mots-cles et les connecteurs logiques\n- Delimiter les parties du texte (paragraphes = idees)\n- Chercher le sens des mots inconnus par le contexte ou la racine\n\nEtape 3 - Repondre aux questions de vocabulaire :\n- Donner le sens du mot dans le contexte (et non le sens general)\n- Utiliser la racine pour deduire le sens si necessaire\n- Proposer un synonyme (mouradif) ou un antonyme (moudadd)\n\nEtape 4 - Repondre aux questions de comprehension :\n- Toujours justifier par une citation du texte\n- Reformuler avec vos propres mots + citation entre guillemets\n- Repondre dans l'ordre des questions (elles suivent souvent l'ordre du texte)\n\nEtape 5 - Questions de synthese :\n- Resumer l'idee principale en 2-3 lignes\n- Donner votre avis personnel en le justifiant (si demande)\n- Utiliser des connecteurs dans votre reponse"
    },
    {
      "type": "example",
      "title_fr": "Questions-types de comprehension et reponses modeles",
      "body_fr": "Supposons un texte sur l'importance de la lecture (ahammiyyat al-qira'a).\n\nQuestion 1 : Hadded al-fikra ar-ra'isiyya li-n-nass.\n(Determine l'idee principale du texte.)\nReponse modele : Al-fikra ar-ra'isiyya hiya anna al-qira'a ta'tabir miftah at-taqadoum wal-ma'rifa, wa anna al-moujtama'at allatiy taqra' hiya allatiy tataqaddam.\n(L'idee principale est que la lecture est la cle du progres et du savoir, et que les societes qui lisent sont celles qui avancent.)\n\nQuestion 2 : Istakhraj min an-nass hojjatayn yasta'milouhouma al-katib.\n(Extrais du texte deux arguments utilises par l'auteur.)\nReponse modele : Al-houjja al-oula : [citation du texte]. Al-houjja ath-thaniya : [citation du texte]. Il faut toujours citer directement le texte.\n\nQuestion 3 : Ma naw' an-nass ? 'Allel jawabak.\n(Quel est le type du texte ? Justifie ta reponse.)\nReponse modele : An-nass min an-naw' al-hijaji (texte argumentatif) li-anna al-katib yaqoum bi-d-difa' 'an ra'yihi bi-sti'mal houjaj wa barahin mouqni'a, kama yastakhdim adawat al-hujaj mithla : li-anna, li-dhaka, bal.\n(Le texte est argumentatif car l'auteur defend son point de vue en utilisant des arguments et des preuves convaincants, et emploie des connecteurs argumentatifs comme : car, c'est pourquoi, mais.)\n\nConseil : toujours structurer la reponse en 3 parties : affirmation + justification + citation."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000076';

-- 7. Analyse litteraire arabe
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Elements d'analyse d'un texte litteraire arabe",
      "body_fr": "L'analyse litteraire arabe (at-tahlil al-adabi) examine un texte sous quatre angles :\n\n1. Le contenu thematique (al-madmoun) :\n- Le theme principal et les sous-themes\n- Les idees et les sentiments exprimes\n- Le message de l'auteur\n- Le contexte historique et litteraire (mouvement, epoque)\n\n2. Le style et la langue (al-ousloub wal-lougha) :\n- Le registre de langue : soutenu (fousha classique), courant, poetique\n- Le champ lexical dominant : quel vocabulaire est privilegie ?\n- Les types de phrases : nominales (stabilite, description) vs verbales (action, dynamisme)\n- L'usage des pronoms : je (subjectivite), nous (collectif), il (objectivite)\n\n3. Les figures de style (as-souwar al-bayaniyya wal-badi'iyya) :\n- Figures de Bayan : tachbih, isti'ara, kinaya\n- Figures de Badie : tiba'q, jinas, saj', mouqabala\n- Les effets produits sur le lecteur\n\n4. La prosodie (al-'aroud) - pour la poesie :\n- Le metre poetique (al-bahr) : tawil, kamil, basit, wafir, etc.\n- La rime (al-qafiya) et la lettre de rime (harf ar-rawiyy)\n- Le schema rythmique et sa relation avec le sens\n\nGenres litteraires courants au Bac :\n- Al-maqal al-adabi (l'article litteraire)\n- Al-qissa al-qasira (la nouvelle)\n- Ach-chi'r al-hadith (la poesie moderne)\n- Al-masrah (le theatre)\n- Al-khitab as-sahafi (le discours journalistique)"
    },
    {
      "type": "method",
      "title_fr": "Construire une analyse structuree d'un texte",
      "body_fr": "Plan-type pour l'analyse litteraire au Bac :\n\nIntroduction (al-mouqaddima) :\n- Presenter l'auteur et le contexte de l'oeuvre\n- Situer l'extrait dans l'oeuvre\n- Formuler la problematique : quelle est la question que pose le texte ?\n- Annoncer le plan d'analyse\n\nDeveloppement (al-'ard) :\nAxe 1 - Analyse du contenu :\n- Identifier le theme et les idees principales\n- Reperer la structure argumentative ou narrative\n- Relever les connecteurs et la progression logique\n\nAxe 2 - Analyse de la forme :\n- Etudier le champ lexical et le registre\n- Identifier les figures de style (bayan et badie)\n- Analyser les types de phrases et leur effet\n- Pour la poesie : etudier le metre et la rime\n\nAxe 3 - Interpretation :\n- Quel est le message de l'auteur ?\n- Quelle est la visee du texte (argumentative, descriptive, narrative) ?\n- Quel effet l'auteur cherche-t-il a produire sur le lecteur ?\n\nConclusion (al-khatima) :\n- Synthese des resultats de l'analyse\n- Reponse a la problematique\n- Ouverture : comparaison avec un autre texte ou reflexion personnelle\n\nConseil cle : toujours lier la forme au fond. Ne pas simplement lister les figures de style, mais expliquer comment elles servent le message du texte."
    },
    {
      "type": "example",
      "title_fr": "Plan d'analyse d'un texte litteraire",
      "body_fr": "Texte : Extrait d'un poeme de Mahmoud Darwich sur la nostalgie de la patrie.\n\nIntroduction :\n- Mahmoud Darwich (1941-2008), poete palestinien majeur de la resistance.\n- Ce poeme s'inscrit dans le courant de la poesie de la resistance (chi'r al-mouqawama).\n- Problematique : Comment le poete exprime-t-il l'attachement a la terre natale ?\n\nAxe 1 - Le theme de la nostalgie :\n- Champ lexical de la patrie : al-ard (la terre), al-watan (la patrie), az-zaytoun (l'olivier), at-tourab (le sol)\n- Champ lexical de la souffrance : al-ghourba (l'exil), al-hanin (la nostalgie), ad-doumou' (les larmes)\n- Opposition entre passe heureux et present douloureux\n\nAxe 2 - Les procedes stylistiques :\n- Isti'ara makniyya : la terre est personnifiee, elle parle et attend le retour du poete -> renforce le lien affectif\n- Tiba'q entre al-qourb (la proximite) et al-bou'd (l'eloignement) -> exprime le dechirement interieur\n- Repetition (tikrar) du mot watan -> insistance sur l'obsession de la patrie\n- Phrases nominales dominantes -> sentiment de stabilite du souvenir face a l'instabilite de l'exil\n\nAxe 3 - Interpretation :\n- Le poete transforme la souffrance individuelle en combat collectif\n- La poesie devient un acte de resistance\n- L'evocation de la terre depasse le geographique pour atteindre le symbolique\n\nConclusion :\n- Darwich reussit a fusionner le lyrique et le politique\n- Son style allie simplicite et profondeur\n- Ouverture : comparer avec Samih al-Qasim, autre poete de la resistance"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000077';

-- 8. Expression ecrite arabe
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Types de sujets d'expression ecrite arabe",
      "body_fr": "L'expression ecrite au Bac (at-ta'bir wal-incha') porte generalement sur trois types de sujets :\n\n1. Le sujet argumentatif (mawdou' hijaji) :\n- Defendre ou refuter une these\n- Structure : these -> arguments -> exemples -> conclusion\n- Connecteurs : li-anna (car), li-dhaka (c'est pourquoi), bal (mais plutot), idafatan ila (de plus), min jihatin oukhra (d'autre part)\n- Exemples de sujets : le role de la technologie, l'importance de l'education, le travail de la femme\n\n2. Le sujet narratif (mawdou' sardi) :\n- Raconter un evenement reel ou fictif\n- Structure : situation initiale -> evenement perturbateur -> peripeties -> denouement\n- Elements : personnages, cadre spatio-temporel, intrigue\n- Utiliser les verbes a l'accompli (madi) pour la narration\n- Exemples : raconter une experience marquante, une rencontre importante\n\n3. Le sujet descriptif (mawdou' wasfi) :\n- Decrire un lieu, une personne, un paysage, une scene\n- Utiliser les adjectifs, les comparaisons et les metaphores\n- Structure : du general au particulier\n- Phrases nominales pour la description statique\n- Exemples : decrire votre ville natale, une scene de la nature\n\nBareme habituel :\n- Contenu et idees : 40%\n- Langue et style : 30%\n- Organisation et coherence : 20%\n- Presentation : 10%"
    },
    {
      "type": "method",
      "title_fr": "Structure et redaction d'un texte en arabe",
      "body_fr": "Methode de redaction en 5 etapes :\n\nEtape 1 - Analyse du sujet (5 minutes) :\n- Lire attentivement le sujet et souligner les mots-cles\n- Identifier le type de sujet (argumentatif, narratif, descriptif)\n- Determiner la consigne : discuter, defendre, raconter, decrire ?\n\nEtape 2 - Brainstorming au brouillon (5 minutes) :\n- Lister toutes les idees en vrac\n- Pour l'argumentatif : trouver 3-4 arguments avec un exemple pour chacun\n- Chercher du vocabulaire pertinent et des expressions soignees\n\nEtape 3 - Elaborer le plan (5 minutes) :\n- Introduction : accroche + presentation du sujet + annonce du plan\n- Developpement : 2-3 paragraphes, chacun avec une idee + argument + exemple\n- Conclusion : synthese + ouverture\n\nEtape 4 - Redaction (25 minutes) :\n- Varier les structures : phrases nominales et verbales\n- Utiliser des connecteurs logiques a chaque transition\n- Integrer des figures de style (tachbih, isti'ara) pour enrichir le style\n- Citer des vers poetiques, des proverbes ou des versets si pertinent\n- Ecrire lisiblement et soigner la ponctuation\n\nEtape 5 - Relecture (5 minutes) :\n- Verifier l'orthographe et les marques d'i'rab\n- S'assurer de la coherence des idees\n- Verifier que chaque paragraphe a une idee directrice\n\nConseils pratiques :\n- Longueur ideale : 15-20 lignes minimum\n- Eviter les repetitions : utiliser des synonymes\n- Eviter le dialecte (darija) : n'utiliser que l'arabe standard (fousha)"
    },
    {
      "type": "example",
      "title_fr": "Plan pour un sujet argumentatif",
      "body_fr": "Sujet : Hal tou'ayyid isti'mal at-tiknoulojia fi at-ta'lim ?\n(Etes-vous favorable a l'utilisation de la technologie dans l'enseignement ?)\n\nIntroduction :\n- Accroche : La technologie a transforme tous les domaines de la vie moderne, y compris l'education.\n- Presentation : Le debat sur l'integration des outils numeriques a l'ecole suscite des avis divergents.\n- Annonce : Nous examinerons les avantages et les limites de cette integration.\n\nParagraphe 1 - Premier argument pour :\n- Idee : La technologie facilite l'acces au savoir\n- Argument : Internet offre un acces illimite aux ressources educatives (cours, videos, livres numeriques)\n- Exemple : Les plateformes comme Khan Academy permettent aux eleves du monde entier d'apprendre gratuitement\n- Connecteur de transition : Idafatan ila dhalik (De plus)\n\nParagraphe 2 - Deuxieme argument pour :\n- Idee : La technologie rend l'apprentissage plus interactif\n- Argument : Les applications et les simulations rendent les cours plus attractifs\n- Exemple : Les simulations en sciences permettent de visualiser des experiences impossibles en classe\n- Connecteur : Wa min jihatin oukhra (D'autre part)\n\nParagraphe 3 - Nuance / limites :\n- Idee : La technologie presente aussi des risques\n- Argument : L'utilisation excessive peut nuire a la concentration et creer une dependance\n- Exemple : Des etudes montrent que l'usage prolonge des ecrans affecte la capacite de concentration des eleves\n- Connecteur : Ghayra anna (Cependant)\n\nConclusion :\n- Synthese : La technologie est un outil precieux si elle est utilisee avec mesure et methode\n- Ouverture : Le vrai defi est de former les enseignants a integrer ces outils de maniere pedagogique"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000078';
