-- ============================================================
-- Arabic lesson content: theory, method, examples per skill
-- Uses dollar-quoting for JSONB values
-- Content in French explaining Arabic grammar/rhetoric concepts
-- ============================================================

-- 1. Regles syntaxiques (Nahou)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les principales regles de syntaxe arabe (Nahou)",
      "body_fr": "La syntaxe arabe (an-nahou) etudie les fonctions des mots dans la phrase et les cas grammaticaux qui en decoulent.\n\nDeux types de phrases :\n- La phrase nominale (al-joumla al-ismiyya) : commence par un nom. Elle se compose du sujet (al-moubtada) et du predicat (al-khabar). Ex : Al-walad moujtahid (Le garcon est studieux).\n- La phrase verbale (al-joumla al-fi'liyya) : commence par un verbe. Elle se compose du verbe (al-fi'l), du sujet (al-fa'il) et du complement d'objet (al-maf'oul bihi). Ex : Kataba at-tilmidh ad-dars (L'eleve a ecrit la lecon).\n\nLes trois cas grammaticaux :\n- Le nominatif (ar-raf') : marque par la damma (ou). Concerne le sujet (moubtada, fa'il) et le predicat (khabar).\n- L'accusatif (an-nasb) : marque par la fatha (a). Concerne le complement d'objet et les circonstanciels (maf'oul bihi, hal, tamyiz, maf'oul li-ajlihi).\n- Le genitif (al-jarr) : marque par la kasra (i). Concerne le complement du nom (moudaf ilayhi) et le nom apres une preposition (majrour bi-harf al-jarr)."
    },
    {
      "type": "method",
      "title_fr": "Identifier le cas grammatical et la fonction",
      "body_fr": "Pour analyser la syntaxe d'une phrase arabe, suivez ces etapes :\n\n1. Identifier le type de phrase :\n   - La phrase commence-t-elle par un nom ? -> Phrase nominale\n   - La phrase commence-t-elle par un verbe ? -> Phrase verbale\n\n2. Reperer les constituants principaux :\n   - Phrase nominale : trouver le moubtada (sujet) et le khabar (predicat)\n   - Phrase verbale : trouver le fi'l (verbe), le fa'il (sujet) et le maf'oul bihi (complement d'objet)\n\n3. Attribuer le cas grammatical :\n   - Le moubtada est toujours au nominatif (marfou')\n   - Le khabar est toujours au nominatif (marfou')\n   - Le fa'il est toujours au nominatif (marfou')\n   - Le maf'oul bihi est toujours a l'accusatif (mansoub)\n   - Le nom apres une preposition est au genitif (majrour)\n\n4. Verifier les marques :\n   - Damma pour le nominatif\n   - Fatha pour l'accusatif\n   - Kasra pour le genitif\n   - Cas speciaux : les cinq noms (abou, akhou, hamou, fou, dhou) prennent waw/alif/ya"
    },
    {
      "type": "example",
      "title_fr": "Analyse syntaxique d'une phrase",
      "body_fr": "Analysons la phrase : Qara'a at-tilmidhou al-kitaba fi al-qismi.\n(L'eleve a lu le livre dans la classe.)\n\n1. Type de phrase : phrase verbale (commence par le verbe qara'a).\n\n2. Analyse mot par mot :\n   - Qara'a : verbe a l'accompli (fi'l madi), mabni 'ala al-fath (construit sur la fatha)\n   - at-tilmidhou : sujet (fa'il), au nominatif (marfou'), marque : damma apparente sur la derniere lettre\n   - al-kitaba : complement d'objet direct (maf'oul bihi), a l'accusatif (mansoub), marque : fatha apparente\n   - fi : preposition (harf jarr)\n   - al-qismi : nom apres preposition (ism majrour), au genitif, marque : kasra apparente\n\n3. Structure :\n   Fi'l (qara'a) + Fa'il (at-tilmidhou) + Maf'oul bihi (al-kitaba) + Jar wa majrour (fi al-qismi)\n\nCette phrase suit le schema classique : Verbe - Sujet - Complement - Circonstanciel."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000071';

-- 2. Morphologie (Sarf)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Morphologie arabe : schemas et formes derivees",
      "body_fr": "La morphologie (as-sarf) etudie la structure interne des mots arabes. Chaque mot arabe derive d'une racine trilitere (trois consonnes) selon un schema morphologique (wazn).\n\nLa racine et le schema :\n- La racine (al-jidr) : trois lettres de base, notees fa-'ayn-lam (f-'-l). Ex : k-t-b (ecrire)\n- Le schema (al-wazn) : le moule applique a la racine. Ex : fa'ala -> kataba\n\nLes 10 formes derivees du verbe (al-abwab) :\n- Forme I : fa'ala (forme de base) - Ex : kataba (il a ecrit)\n- Forme II : fa''ala (doublement de la 2e radicale) - intensite/causalite - Ex : darrasa (il a enseigne)\n- Forme III : fa'ala (allongement apres la 1ere radicale) - reciprocite - Ex : kataba (il a correspond avec)\n- Forme IV : af'ala (ajout d'un hamza initial) - causalite - Ex : ajlasa (il a fait asseoir)\n- Forme V : tafa''ala (ta + forme II) - reflexivite - Ex : ta'allama (il a appris)\n- Forme VI : tafa'ala (ta + forme III) - reciprocite - Ex : tabadala (ils ont echange)\n- Forme VII : infa'ala (in + forme I) - passivite - Ex : inkasara (il s'est casse)\n- Forme VIII : ifta'ala (insertion de ta) - reflexivite - Ex : ijtama'a (il s'est reuni)\n- Forme IX : if'alla (redoublement de la derniere radicale) - couleurs/defauts - Ex : ihmarra (il a rougi)\n- Forme X : istaf'ala (ist + forme I) - demande - Ex : istaghfara (il a demande pardon)\n\nLe masdar (nom verbal) :\nChaque forme a son propre schema de masdar. Ex : Forme I -> fa'l, fi'l, fu'l ; Forme II -> taf'il ; Forme V -> tafa''ul."
    },
    {
      "type": "method",
      "title_fr": "Identifier le schema morphologique (wazn)",
      "body_fr": "Pour trouver le wazn d'un mot, suivez ces etapes :\n\n1. Identifier la racine trilitere :\n   - Supprimez les lettres ajoutees (prefixes, infixes, suffixes)\n   - Gardez les trois consonnes de base\n   - Ex : moudarris -> racine d-r-s\n\n2. Replacer sur le moule fa-'ayn-lam :\n   - La 1ere radicale = fa\n   - La 2eme radicale = 'ayn\n   - La 3eme radicale = lam\n   - Ex : moudarris -> moufa''il (les lettres mou et i sont des ajouts, le doublement de la 2e radicale indique la forme II)\n\n3. Identifier la forme derivee :\n   - Reperer les indices (prefixe ta, doublement, hamza initial, prefixe ista...)\n   - Ex : istakhraja -> ista-f-'-l -> Forme X (istaf'ala)\n\n4. Deduire le masdar :\n   - Appliquer le schema de masdar de la forme identifiee\n   - Ex : Forme X -> istif'al -> istikhraj (extraction)\n\n5. Verifier la coherence semantique :\n   - Le sens derive correspond-il a la valeur de la forme ? (intensite, reciprocite, demande...)"
    },
    {
      "type": "example",
      "title_fr": "Trouver la forme derivee et le masdar",
      "body_fr": "Analysons le mot : ista'mala (il a utilise)\n\n1. Racine : '-m-l (travailler, faire)\n   On retire le prefixe ista- : il reste 'amala -> racine '-m-l\n\n2. Schema : istaf'ala (Forme X)\n   - ista + '-m-l = ista'mala\n   - wazn : istaf'ala\n\n3. Sens de la Forme X : demande ou requete\n   - ista'mala = demander le travail de quelque chose -> utiliser\n\n4. Masdar de la Forme X : istif'al\n   - isti'mal (utilisation)\n\n5. Autres derivations de la meme racine :\n   - Forme I : 'amala -> 'amal (travail)\n   - Forme II : 'ammala -> pas courant\n   - Forme III : 'amala -> mou'amala (transaction)\n   - Forme IV : a'mala -> i'mal (mise en oeuvre)\n   - Forme VIII : i'tamala -> i'timal (probabilite, support)\n\nAutre exemple : ta'awana (il a coopere)\n   - Racine : '-w-n (aider)\n   - Schema : tafa'ala (Forme VI) -> reciprocite\n   - Masdar : tafa'ul -> ta'awun (cooperation)"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000072';

-- 3. Analyse grammaticale (I'rab)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les marques d'i'rab et les cas speciaux",
      "body_fr": "L'i'rab est le changement de la voyelle finale d'un mot en fonction de sa position et de sa fonction dans la phrase.\n\nLes marques d'i'rab de base :\n- Nominatif (raf') : damma (ou) - Ex : al-walad-ou\n- Accusatif (nasb) : fatha (a) - Ex : al-walad-a\n- Genitif (jarr) : kasra (i) - Ex : al-walad-i\n- Apocopee (jazm) : soukoun (pour les verbes au present) - Ex : lam yaktub\n\nLes marques subsidiaires :\n- Le duel : alif au nominatif (al-waladani), ya a l'accusatif et au genitif (al-waladayni)\n- Le pluriel masculin sain : waw au nominatif (al-mouslimoun), ya a l'accusatif et au genitif (al-mouslimina)\n- Les cinq noms (abou, akhou, hamou, fou, dhou) : waw au nominatif, alif a l'accusatif, ya au genitif\n- Le pluriel feminin sain : kasra a l'accusatif au lieu de la fatha (al-mouslimati)\n\nLes mots invariables (mabniyy) :\n- Les pronoms personnels, les pronoms demonstratifs, les pronoms relatifs\n- Les verbes a l'accompli (al-madi)\n- Les particules (prepositions, conjonctions)\n- Ces mots gardent toujours la meme terminaison, quel que soit leur fonction"
    },
    {
      "type": "method",
      "title_fr": "Methode d'analyse grammaticale pas a pas",
      "body_fr": "Pour realiser l'i'rab complet d'un mot, suivez ce schema :\n\n1. Le mot est-il variable (mou'rab) ou invariable (mabniyy) ?\n   - Invariable : indiquer sa forme fixe et sa position syntaxique\n   - Variable : continuer l'analyse\n\n2. Identifier la fonction du mot :\n   - Moubtada (sujet de phrase nominale) -> raf'\n   - Khabar (predicat) -> raf'\n   - Fa'il (sujet de verbe) -> raf'\n   - Na'ib al-fa'il (sujet du passif) -> raf'\n   - Maf'oul bihi (COD) -> nasb\n   - Hal (etat) -> nasb\n   - Tamyiz (specificatif) -> nasb\n   - Moudaf ilayhi (complement du nom) -> jarr\n   - Majrour (apres preposition) -> jarr\n\n3. Determiner la marque d'i'rab :\n   - Mot singulier ou pluriel brise -> marques de base (damma, fatha, kasra)\n   - Duel -> alif / ya\n   - Pluriel masculin sain -> waw / ya\n   - Pluriel feminin sain -> damma / kasra / kasra\n   - Cinq noms -> waw / alif / ya\n\n4. Rediger l'i'rab selon la formule :\n   Mot : fonction + cas + marque + type de marque"
    },
    {
      "type": "example",
      "title_fr": "I'rab complet d'une phrase",
      "body_fr": "Phrase : Ja'a al-mouhandisoun ila al-madrasati.\n(Les ingenieurs sont venus a l'ecole.)\n\n1. Ja'a :\n   - Fi'l madi (verbe a l'accompli)\n   - Mabniyy 'ala al-fath (invariable, construit sur la fatha)\n\n2. Al-mouhandisoun :\n   - Fa'il (sujet du verbe ja'a)\n   - Marfou' (au nominatif)\n   - Marque : waw (car c'est un pluriel masculin sain)\n   - Noun : signe du pluriel masculin sain\n\n3. Ila :\n   - Harf jarr (preposition)\n   - Mabniyy 'ala as-soukoun (invariable)\n\n4. Al-madrasati :\n   - Ism majrour (nom au genitif apres la preposition ila)\n   - Majrour (au genitif)\n   - Marque : kasra apparente sur la derniere lettre\n\nFormule recapitulative :\n- Ja'a : fi'l madi, mabniyy 'ala al-fath\n- Al-mouhandisoun : fa'il marfou', wa 'alamat raf'ihi al-waw li-annahu jam' moudhakkar salim\n- Ila : harf jarr\n- Al-madrasati : ism majrour bi-ila, wa 'alamat jarrihi al-kasra"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000073';

-- 4. Ilm Al-Bayan (metaphore, comparaison)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Tachbih, Isti'ara et Kinaya",
      "body_fr": "Ilm al-Bayan est la science des figures de style qui permettent d'exprimer un meme sens de differentes manieres. Trois figures principales :\n\n1. At-Tachbih (la comparaison) :\nRapprochement entre deux elements partageant une qualite commune.\nQuatre piliers : al-mouchabbah (le compare), al-mouchabbah bihi (le comparant), adat at-tachbih (l'outil de comparaison : ka, mithla, ka'anna), wajh ach-chabah (le point commun).\n\nTypes de tachbih :\n- Tachbih moursal moufassal : tous les piliers sont presents\n- Tachbih mouakked : sans l'outil de comparaison\n- Tachbih moujmal : sans le point commun\n- Tachbih baligh : sans outil ni point commun (le plus eloquent)\n\n2. Al-Isti'ara (la metaphore) :\nC'est un tachbih dont on a supprime l'un des deux termes (compare ou comparant).\n- Isti'ara tasrihiyya (explicite) : on mentionne le comparant et on supprime le compare. Ex : Ra'aytou bahran fi al-madrasati (J'ai vu une mer a l'ecole) = un homme genereux.\n- Isti'ara makniyya (implicite) : on mentionne le compare et on supprime le comparant, mais on garde un de ses attributs. Ex : Kalla mani ad-dahr (Le temps m'a parle) = le temps est personnifie.\n\n3. Al-Kinaya (la metonymie) :\nExpression dont le sens apparent est possible, mais qui vise un sens cache.\n- Kinaya 'an sifa (qualite) : Houwa tawil an-najad = il est courageux\n- Kinaya 'an mawsouf (qualifie) : Al-kitab al-'aziz = le Coran\n- Kinaya 'an nisba (rapport) : Al-majd bayna thawbayhi = la gloire est dans ses habits = il est glorieux"
    },
    {
      "type": "method",
      "title_fr": "Identifier et analyser les figures de Bayan",
      "body_fr": "Methode d'analyse en 4 etapes :\n\n1. Reperer l'image dans le texte :\n   - Y a-t-il un rapprochement entre deux elements ? -> Possibilite de tachbih ou isti'ara\n   - Y a-t-il une expression a double sens (apparent et cache) ? -> Possibilite de kinaya\n\n2. Distinguer tachbih et isti'ara :\n   - Les deux termes (compare et comparant) sont-ils presents ? -> Tachbih\n   - Un seul terme est present ? -> Isti'ara\n     - Si le comparant est mentionne -> isti'ara tasrihiyya\n     - Si le compare est mentionne avec un attribut du comparant -> isti'ara makniyya\n\n3. Preciser le type de tachbih :\n   - Outil present + point commun present -> moursal moufassal\n   - Outil absent + point commun present -> mouakked moufassal\n   - Outil present + point commun absent -> moursal moujmal\n   - Outil absent + point commun absent -> baligh\n\n4. Expliquer l'effet stylistique (al-balagh) :\n   - Quel est l'impact sur le sens ?\n   - Quelle image est creee dans l'esprit du lecteur ?\n   - En quoi cette figure renforce-t-elle l'idee de l'auteur ?\n\nFormule de reponse a l'examen :\n\"L'auteur utilise [type de figure] en comparant/associant [element A] a [element B], ce qui met en valeur [qualite/idee] et renforce [l'intention de l'auteur].\""
    },
    {
      "type": "example",
      "title_fr": "Analyse de figures de Bayan dans des extraits",
      "body_fr": "Extrait 1 : Al-'ilmou nour (La science est lumiere)\n- Figure : Tachbih baligh (comparaison eloquente)\n- Compare (mouchabbah) : al-'ilm (la science)\n- Comparant (mouchabbah bihi) : nour (lumiere)\n- Outil : absent\n- Point commun : absent (sous-entendu : le guidage, l'eclairage)\n- Effet : montre que la science eclaire l'esprit comme la lumiere eclaire le chemin\n\nExtrait 2 : Aqbala al-rabi'ou yabtasim (Le printemps est arrive en souriant)\n- Figure : Isti'ara makniyya (metaphore implicite)\n- Compare : ar-rabi' (le printemps) est mentionne\n- Comparant : un etre humain (supprime)\n- Indice du comparant : yabtasim (sourire, attribut humain)\n- Effet : personnification du printemps, qui evoque la joie et le renouveau\n\nExtrait 3 : Houwa kathir ar-ramad (Il a beaucoup de cendres)\n- Figure : Kinaya 'an sifa\n- Sens apparent : il a beaucoup de cendres chez lui\n- Sens cache : il est tres genereux (beaucoup de cendres = beaucoup de cuisine = beaucoup d'invites)\n- Effet : suggere la generosite de maniere indirecte et plus eloquente"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000074';

