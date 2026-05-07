-- ============================================================
-- SVT (Sciences de la Vie et de la Terre) lesson content
-- 12 skills: theory, method, example per skill
-- Uses dollar-quoting for JSONB values
-- Content aligned with Moroccan Bac SVT syllabus (2eme Bac SM)
-- ============================================================

-- 1. Metabolisme energetique cellulaire
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Metabolisme energetique cellulaire",
      "body_fr": "La cellule produit de l'energie sous forme d'ATP a travers plusieurs voies metaboliques :\n\n**La glycolyse** (cytoplasme) :\n- Degradation du glucose (C6) en 2 molecules de pyruvate (C3)\n- Bilan : 2 ATP + 2 NADH,H+\n- Ne necessite pas d'oxygene\n\n**Le cycle de Krebs** (matrice mitochondriale) :\n- Oxydation complete de l'acetyl-CoA\n- Par tour de cycle : 3 NADH,H+ + 1 FADH2 + 1 ATP (GTP)\n- 2 tours par molecule de glucose\n\n**La chaine respiratoire** (membrane interne mitochondriale) :\n- Reoxydation des transporteurs reduits (NADH,H+ et FADH2)\n- Transfert d'electrons jusqu'a l'accepteur final : O2\n- Phosphorylation oxydative : synthese d'ATP par l'ATP synthase\n- Couplage chimiosmotique : le gradient de H+ genere la force proton-motrice\n\n**L'ATP** (adenosine triphosphate) est la molecule energetique universelle de la cellule. Son hydrolyse libere environ 30,5 kJ/mol."
    },
    {
      "type": "formula",
      "title_fr": "Bilan energetique de la respiration cellulaire",
      "body_fr": "**Equation bilan de la respiration cellulaire :**\n$$C_6H_{12}O_6 + 6O_2 + 6H_2O \\rightarrow 6CO_2 + 12H_2O + 36 \\text{ (ou 38) ATP}$$\n\n**Bilan detaille par etape :**\n\n1. Glycolyse : 2 ATP + 2 NADH,H+\n2. Decarboxylation du pyruvate : 2 NADH,H+\n3. Cycle de Krebs (x2) : 6 NADH,H+ + 2 FADH2 + 2 ATP\n4. Chaine respiratoire :\n   - 10 NADH,H+ x 3 ATP = 30 ATP (ou 2,5 ATP par NADH)\n   - 2 FADH2 x 2 ATP = 4 ATP (ou 1,5 ATP par FADH2)\n\n**Total : 36 a 38 ATP par molecule de glucose**\n\n**Rendement energetique :**\n$$R = \\frac{\\text{Energie stockee dans ATP}}{\\text{Energie totale du glucose}} \\times 100$$"
    },
    {
      "type": "example",
      "title_fr": "Calcul du rendement energetique",
      "body_fr": "**Donnees :**\n- Energie liberee par l'oxydation complete d'une mole de glucose : 2840 kJ\n- Energie stockee dans une liaison phosphate de l'ATP : 30,5 kJ\n- Nombre d'ATP produits : 36 molecules\n\n**Calcul :**\n$$\\text{Energie recuperee} = 36 \\times 30{,}5 = 1098 \\text{ kJ}$$\n\n$$R = \\frac{1098}{2840} \\times 100 = 38{,}7\\%$$\n\n**Interpretation :**\nLe rendement de la respiration cellulaire est d'environ 39%. Le reste de l'energie (environ 61%) est dissipe sous forme de chaleur. Ce rendement est neanmoins eleve compare aux machines thermiques industrielles.\n\nRemarque : si on considere 38 ATP, le rendement atteint environ 40,8%."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000033';

-- 2. Fermentation
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La fermentation",
      "body_fr": "La fermentation est une voie metabolique anaerobique (sans oxygene) de degradation incomplete du glucose.\n\n**Fermentation alcoolique :**\n- Realisee par les levures (Saccharomyces cerevisiae)\n- Le pyruvate est transforme en ethanol + CO2\n- Equation : $C_6H_{12}O_6 \\rightarrow 2C_2H_5OH + 2CO_2 + 2ATP$\n- Applications : panification, vinification, brasserie\n\n**Fermentation lactique :**\n- Realisee par les bacteries lactiques ou les cellules musculaires en anaerobiose\n- Le pyruvate est transforme en acide lactique\n- Equation : $C_6H_{12}O_6 \\rightarrow 2CH_3CHOHCOOH + 2ATP$\n- Applications : fabrication du yaourt, fromage\n\n**Points communs :**\n- Debut par la glycolyse (dans le cytoplasme)\n- Ne necessitent pas d'oxygene\n- Permettent la reoxydation du NADH,H+ en NAD+ pour maintenir la glycolyse"
    },
    {
      "type": "formula",
      "title_fr": "Comparaison respiration vs fermentation",
      "body_fr": "| Critere | Respiration | Fermentation |\n|---------|-------------|---------------|\n| Milieu | Aerobique (O2 present) | Anaerobique (absence d'O2) |\n| Localisation | Cytoplasme + mitochondrie | Cytoplasme uniquement |\n| Degradation du glucose | Complete | Incomplete |\n| Produits finaux | CO2 + H2O | Ethanol + CO2 ou Acide lactique |\n| Bilan en ATP | 36-38 ATP | 2 ATP |\n| Rendement | ~39% | ~2% |\n\n**Bilan energetique compare :**\n- Respiration : 36 a 38 ATP/glucose\n- Fermentation : 2 ATP/glucose (glycolyse seule)\n\nLa fermentation est donc 18 a 19 fois moins rentable que la respiration, car le substrat n'est que partiellement oxyde. L'ethanol ou le lactate contiennent encore une grande partie de l'energie chimique du glucose."
    },
    {
      "type": "example",
      "title_fr": "Mise en evidence experimentale de la fermentation",
      "body_fr": "**Experience : fermentation alcoolique par les levures**\n\n**Protocole :**\n- Preparer deux erlenmeyers contenant une solution de glucose\n- Erlenmeyer A : ajouter des levures, fermer hermetiquement, relier a un tube plongeant dans de l'eau de chaux\n- Erlenmeyer B : temoin sans levures, meme montage\n\n**Resultats attendus :**\n- Erlenmeyer A : l'eau de chaux se trouble (production de CO2), odeur d'alcool apres quelques heures, le niveau de glucose diminue\n- Erlenmeyer B : aucun changement\n\n**Interpretation :**\nLes levures, en absence d'oxygene (milieu ferme), degradent le glucose par fermentation alcoolique en produisant de l'ethanol et du CO2.\n\nLe trouble de l'eau de chaux confirme le degagement de CO2 :\n$$Ca(OH)_2 + CO_2 \\rightarrow CaCO_3 \\downarrow + H_2O$$\n\nOn peut aussi mesurer la production de CO2 par un dispositif ExAO pour tracer la cinetique de la fermentation."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000034';

-- 3. ADN et information genetique
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Structure de l'ADN et information genetique",
      "body_fr": "L'ADN (acide desoxyribonucleique) est le support de l'information genetique.\n\n**Structure en double helice (Watson et Crick, 1953) :**\n- Deux brins antiparalleles enroules en helice\n- Chaque brin est un enchainement de nucleotides\n- Un nucleotide = base azotee + desoxyribose + groupement phosphate\n\n**Les 4 bases azotees :**\n- Purines : Adenine (A) et Guanine (G)\n- Pyrimidines : Thymine (T) et Cytosine (C)\n\n**Complementarite des bases :**\n- A = T (2 liaisons hydrogene)\n- G ≡ C (3 liaisons hydrogene)\n\n**Regles de Chargaff :**\n- %A = %T et %G = %C\n- %A + %G = %T + %C = 50%\n\n**Le gene** est une portion d'ADN portant l'information necessaire a la synthese d'une proteine. La sequence des nucleotides determine la sequence des acides amines de la proteine."
    },
    {
      "type": "formula",
      "title_fr": "Replication semi-conservative de l'ADN",
      "body_fr": "**Principe de la replication :**\nChaque brin de l'ADN parental sert de matrice pour la synthese d'un nouveau brin complementaire.\n\n**Etapes de la replication :**\n1. **Initiation** : l'helicase ouvre la double helice au niveau des origines de replication (fourche de replication)\n2. **Elongation** : l'ADN polymerase synthetise le nouveau brin dans le sens 5'→3'\n   - Brin direct (leading) : synthese continue\n   - Brin indirect (lagging) : synthese discontinue (fragments d'Okazaki)\n3. **Terminaison** : la ligase relie les fragments d'Okazaki\n\n**Caractere semi-conservatif :**\nChaque molecule fille contient un brin ancien (parental) et un brin nouvellement synthetise.\n\nApres n replications, une molecule d'ADN donne $2^n$ molecules, dont 2 seulement possedent un brin parental original.\n\n**Fidelite** : l'ADN polymerase possede une activite de relecture (correction d'erreurs), assurant un taux d'erreur tres faible ($10^{-9}$ par nucleotide)."
    },
    {
      "type": "example",
      "title_fr": "Experience de Meselson et Stahl (1958)",
      "body_fr": "**Objectif :** Demontrer le caractere semi-conservatif de la replication de l'ADN.\n\n**Protocole :**\n1. Cultiver des bacteries E. coli sur un milieu contenant de l'azote lourd ($^{15}N$) pendant plusieurs generations → tout l'ADN est marque lourd ($^{15}N$-$^{15}N$)\n2. Transferer les bacteries sur un milieu contenant de l'azote leger ($^{14}N$)\n3. Prelever des echantillons apres chaque generation et centrifuger en gradient de densite de CsCl\n\n**Resultats :**\n- Generation 0 : une seule bande lourde ($^{15}N$-$^{15}N$)\n- Generation 1 : une seule bande intermediaire ($^{15}N$-$^{14}N$)\n- Generation 2 : deux bandes : une intermediaire + une legere ($^{14}N$-$^{14}N$)\n\n**Interpretation :**\n- Le modele conservatif est exclu (il predit une bande lourde + une bande legere des la G1)\n- Le modele dispersif est exclu (il predit uniquement des bandes intermediaires)\n- Seul le modele semi-conservatif explique les resultats observes"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000035';

-- 4. Expression de l'information genetique
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "De l'ADN a la proteine",
      "body_fr": "L'expression de l'information genetique se fait en deux etapes principales :\n\n**1. La transcription (noyau) :**\n- L'ARN polymerase copie le brin matrice de l'ADN en ARN messager (ARNm)\n- Sens de lecture du brin matrice : 3'→5'\n- Sens de synthese de l'ARNm : 5'→3'\n- Dans l'ARNm, l'uracile (U) remplace la thymine (T)\n- Complementarite : A-U, T-A, G-C, C-G\n\n**2. La traduction (cytoplasme, ribosomes) :**\n- Le ribosome lit l'ARNm par codons (triplets de nucleotides)\n- Chaque codon correspond a un acide amine selon le code genetique\n- L'ARN de transfert (ARNt) apporte l'acide amine correspondant grace a son anticodon\n\n**Le code genetique est :**\n- Universel : le meme pour tous les etres vivants\n- Degenere (redondant) : plusieurs codons pour un meme acide amine\n- Non chevauchant : les codons sont lus sans chevauchement\n- Non ambigu : un codon = un seul acide amine"
    },
    {
      "type": "formula",
      "title_fr": "Etapes detaillees de l'expression genetique",
      "body_fr": "**Transcription :**\n1. Initiation : l'ARN polymerase se fixe sur le promoteur du gene\n2. Elongation : synthese de l'ARNm complementaire du brin matrice\n3. Terminaison : l'ARN polymerase atteint le terminateur, l'ARNm est libere\n4. Maturation (chez les eucaryotes) : excision des introns, epissage des exons, ajout de la coiffe et de la queue poly-A\n\n**Traduction :**\n1. Initiation : le ribosome se fixe sur l'ARNm au codon initiateur AUG (methionine)\n2. Elongation : lecture codon par codon, liaison peptidique entre les acides amines\n3. Terminaison : le ribosome rencontre un codon stop (UAA, UAG ou UGA), la proteine est liberee\n\n**Relations de calcul :**\n- Nombre de codons = nombre de nucleotides de l'ARNm / 3\n- Nombre d'acides amines = nombre de codons - 1 (codon stop exclu)\n- Nombre de nucleotides du gene = nombre d'acides amines x 3 + 3 (codon stop)"
    },
    {
      "type": "example",
      "title_fr": "Determiner la sequence d'acides amines",
      "body_fr": "**Enonce :** Soit le brin non transcrit (brin codant) de l'ADN suivant :\n5' - TAC GGA AAT CTT ACC - 3'\n\nDeterminer la sequence de l'ARNm et la chaine polypeptidique correspondante.\n\n**Resolution :**\n\n1. Le brin matrice (brin transcrit) est le complementaire antiparallele :\n3' - ATG CCT TTA GAA TGG - 5'\n\n2. L'ARNm est complementaire du brin matrice (avec U au lieu de T) :\n5' - UAC GGA AAU CUU ACC - 3'\n\nRemarque : l'ARNm a la meme sequence que le brin codant (avec U a la place de T).\n\n3. Lecture par codons :\nUAC | GGA | AAU | CUU | ACC\n\n4. Traduction avec le tableau du code genetique :\n- UAC → Tyrosine (Tyr)\n- GGA → Glycine (Gly)\n- AAU → Asparagine (Asn)\n- CUU → Leucine (Leu)\n- ACC → Threonine (Thr)\n\n**Chaine polypeptidique :** Tyr - Gly - Asn - Leu - Thr"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000036';

-- 5. Code genetique et mutations
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les mutations genetiques",
      "body_fr": "Une mutation est une modification de la sequence des nucleotides de l'ADN. Elle peut etre spontanee ou induite par des agents mutagenes (UV, substances chimiques, radiations).\n\n**Types de mutations ponctuelles :**\n\n1. **Substitution** : remplacement d'un nucleotide par un autre\n   - Transition : purine ↔ purine ou pyrimidine ↔ pyrimidine\n   - Transversion : purine ↔ pyrimidine\n\n2. **Insertion** (addition) : ajout d'un ou plusieurs nucleotides\n   - Provoque un decalage du cadre de lecture\n\n3. **Deletion** (suppression) : perte d'un ou plusieurs nucleotides\n   - Provoque aussi un decalage du cadre de lecture\n\n**Consequences possibles d'une substitution :**\n- Mutation silencieuse : le nouveau codon code le meme acide amine (degenerescence du code)\n- Mutation faux-sens : le nouveau codon code un acide amine different\n- Mutation non-sens : le nouveau codon est un codon stop → proteine tronquee"
    },
    {
      "type": "formula",
      "title_fr": "Consequences des mutations sur la proteine",
      "body_fr": "**Effet selon le type de mutation :**\n\n1. **Substitution :**\n   - Affecte un seul codon\n   - Peut etre silencieuse si le nouveau codon est synonyme\n   - Faux-sens : un acide amine change → proteine potentiellement non fonctionnelle\n   - Non-sens : apparition d'un codon stop premature → proteine tronquee\n\n2. **Insertion ou deletion :**\n   - Si le nombre de nucleotides inseres/supprimes n'est pas un multiple de 3 : decalage du cadre de lecture (frameshift)\n   - Tous les codons en aval sont modifies\n   - Consequence generalement grave : proteine completement alteree\n   - Si le nombre est un multiple de 3 : ajout ou perte d'acides amines sans decalage\n\n**Les mutations sont la source de la diversite genetique :**\n- Mutations somatiques : non transmises a la descendance\n- Mutations germinales : transmises aux generations suivantes\n- Les mutations constituent la matiere premiere de l'evolution"
    },
    {
      "type": "example",
      "title_fr": "Analyser l'effet d'une mutation ponctuelle",
      "body_fr": "**Enonce :** Le brin codant d'un gene normal contient la sequence :\n5' - ATG GCA TTC AAG TAA - 3'\n\nUne mutation remplace le 8eme nucleotide (C) par un A.\n\n**Resolution :**\n\n1. Sequence normale de l'ARNm :\nAUG GCA UUC AAG UAA\nMet - Ala - Phe - Lys - Stop\n\n2. Sequence mutee du brin codant :\n5' - ATG GCA TTA AAG TAA - 3'\n\n3. ARNm mute :\nAUG GCA UUA AAG UAA\nMet - Ala - Leu - Lys - Stop\n\n**Analyse :**\n- Type de mutation : substitution (C → A)\n- Le 3eme codon passe de UUC (Phe) a UUA (Leu)\n- C'est une mutation faux-sens : un acide amine est remplace par un autre\n- La proteine conserve la meme longueur mais sa fonction peut etre alteree si la Phe etait essentielle pour la structure 3D ou le site actif\n\n**Exemple clinique :** La drepanocytose est causee par une substitution dans le gene de la beta-globine : GAG → GUG, remplacant l'acide glutamique par la valine en position 6."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000037';

-- 6. Heredite liee aux autosomes
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Heredite mendelienne : autosomes",
      "body_fr": "L'heredite autosomale concerne les genes situes sur les chromosomes non sexuels (autosomes).\n\n**Monohybridisme** (un seul caractere etudie) :\n- Croisement de deux lignees pures differant par un caractere\n- **1ere loi de Mendel** (uniformite des hybrides de F1) : tous les individus F1 sont identiques et expriment le phenotype dominant\n- **2eme loi de Mendel** (segregation) : en F2, on obtient 3/4 [dominant] et 1/4 [recessif] → rapport 3:1\n\n**Dihybridisme** (deux caracteres etudies) :\n- **3eme loi de Mendel** (assortiment independant) : les genes situes sur des chromosomes differents se transmettent independamment\n- F2 : rapport 9:3:3:1 si les genes sont independants\n\n**Dominance et recessivite :**\n- Allele dominant : s'exprime a l'etat heterozygote (notation en majuscule)\n- Allele recessif : ne s'exprime qu'a l'etat homozygote (notation en minuscule)\n- Codominance : les deux alleles s'expriment simultanement (ex: groupes sanguins A et B)"
    },
    {
      "type": "formula",
      "title_fr": "Croisements et analyse de F1, F2",
      "body_fr": "**Methode d'analyse d'un croisement :**\n\n1. Determiner les phenotypes des parents, F1 et F2\n2. Si F1 est uniforme → les parents sont de lignee pure (homozygotes)\n3. Le phenotype exprime en F1 est dominant\n4. Ecrire les genotypes des parents et de F1\n5. Realiser l'echiquier de croisement pour predire F2\n\n**Test-cross (croisement test) :**\nCroisement d'un individu de phenotype dominant (genotype inconnu) avec un homozygote recessif :\n- Si 100% [dominant] → l'individu teste est homozygote dominant\n- Si 50% [dominant] + 50% [recessif] → l'individu teste est heterozygote\n\n**Proportions attendues en F2 :**\n- Monohybridisme : 1/4 AA + 2/4 Aa + 1/4 aa → 3:1 en phenotypes\n- Dihybridisme (genes independants) : 9/16 [A-B-] : 3/16 [A-bb] : 3/16 [aaB-] : 1/16 [aabb]\n- Dihybridisme (genes lies) : proportions differentes de 9:3:3:1, calcul du taux de recombinaison"
    },
    {
      "type": "example",
      "title_fr": "Probleme de croisement avec echiquier",
      "body_fr": "**Enonce :** Chez les pois, la couleur jaune (J) domine la verte (j) et la forme lisse (L) domine la ridee (l). On croise deux plants dihybrides JjLl x JjLl.\n\n**Echiquier de croisement :**\n\nGametes possibles de chaque parent : JL, Jl, jL, jl (1/4 chacun)\n\n|  | JL | Jl | jL | jl |\n|--|----|----|----|----|  \n| JL | JJLL | JJLl | JjLL | JjLl |\n| Jl | JJLl | JJll | JjLl | Jjll |\n| jL | JjLL | JjLl | jjLL | jjLl |\n| jl | JjLl | Jjll | jjLl | jjll |\n\n**Resultats phenotypiques (sur 16) :**\n- 9/16 Jaune-Lisse [J-L-]\n- 3/16 Jaune-Ridee [J-ll]\n- 3/16 Vert-Lisse [jjL-]\n- 1/16 Vert-Ridee [jjll]\n\n**Verification :** 9 + 3 + 3 + 1 = 16\n\nCe rapport 9:3:3:1 confirme que les deux genes sont portes par des chromosomes differents (assortiment independant)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000038';

-- 7. Heredite liee au sexe
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Heredite liee au sexe",
      "body_fr": "L'heredite liee au sexe concerne les genes portes par les chromosomes sexuels, principalement le chromosome X.\n\n**Chromosomes sexuels :**\n- Femme : XX (homogametique)\n- Homme : XY (heterogametique)\n- Le chromosome Y porte peu de genes (principalement SRY pour la determination masculine)\n\n**Particularites de la transmission liee a X :**\n- Un homme ne possede qu'un seul allele pour les genes portes par X (hemizygote)\n- Un allele recessif porte par X s'exprime toujours chez l'homme\n- Une femme peut etre porteuse saine (heterozygote) sans exprimer la maladie\n\n**Caracteristiques d'une heredite recessive liee a X :**\n- La maladie touche principalement les garcons\n- Les femmes atteintes sont homozygotes recessives (rare)\n- Un pere atteint transmet l'allele a toutes ses filles (porteuses) mais a aucun fils\n- Une mere porteuse transmet l'allele a 1/2 de ses fils (atteints) et 1/2 de ses filles (porteuses)"
    },
    {
      "type": "formula",
      "title_fr": "Arbre genealogique et mode de transmission",
      "body_fr": "**Methode d'analyse d'un arbre genealogique :**\n\n1. **Determiner dominant ou recessif :**\n   - Deux parents sains ayant un enfant atteint → la maladie est recessive\n   - Un parent atteint ayant un enfant sain → la maladie est dominante\n\n2. **Determiner autosomal ou lie au sexe :**\n   - Si un pere atteint a des filles toutes saines → recessif lie a X possible (filles heterozygotes)\n   - Si la maladie touche autant les filles que les garcons → autosomal probable\n   - Si la maladie touche surtout les garcons → lie a X probable\n   - Un pere sain ne transmet pas une maladie recessive liee a X a ses fils\n\n**Notations genetiques :**\n- Gene autosomal : A/a chez les deux sexes\n- Gene lie a X : $X^A X^A$, $X^A X^a$, $X^a X^a$ (femme) ; $X^A Y$, $X^a Y$ (homme)\n\n**Probabilites de transmission :**\n- Mere porteuse ($X^A X^a$) x Pere sain ($X^A Y$) :\n  - Fils : 1/2 sains ($X^A Y$), 1/2 atteints ($X^a Y$)\n  - Filles : 1/2 saines ($X^A X^A$), 1/2 porteuses ($X^A X^a$)"
    },
    {
      "type": "example",
      "title_fr": "Le daltonisme et l'hemophilie",
      "body_fr": "**Exemple 1 : Le daltonisme**\nLe daltonisme est une anomalie recessive liee au chromosome X qui empeche la distinction entre le rouge et le vert.\n\nUne femme porteuse ($X^D X^d$) epouse un homme normal ($X^D Y$) :\n\n| | $X^D$ | $X^d$ |\n|--|-------|-------|\n| $X^D$ | $X^D X^D$ (fille saine) | $X^D X^d$ (fille porteuse) |\n| $Y$ | $X^D Y$ (garcon sain) | $X^d Y$ (garcon daltonien) |\n\nResultat : 1/4 fille saine, 1/4 fille porteuse, 1/4 garcon sain, 1/4 garcon daltonien.\n\n**Exemple 2 : L'hemophilie**\nL'hemophilie A est due a un deficit du facteur VIII de coagulation, gene recessif lie a X.\n\nDans les familles royales europeennes, la reine Victoria etait porteuse ($X^H X^h$). Elle a transmis l'allele a plusieurs de ses descendants masculins qui ont ete atteints d'hemophilie, tandis que ses filles porteuses ont diffuse l'allele dans d'autres familles royales.\n\nFrequence : ~1/5000 garcons (tres rare chez les filles car il faut $X^h X^h$)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000039';

-- 8. Le soi et le non-soi
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Le soi et le non-soi",
      "body_fr": "Le systeme immunitaire distingue les elements du soi (propres a l'organisme) des elements du non-soi (etrangers).\n\n**Les marqueurs du soi :**\n- **Le CMH (Complexe Majeur d'Histocompatibilite)** ou systeme HLA chez l'homme\n- Glycoproteines presentes a la surface de toutes les cellules nucleees\n- **CMH de classe I** : present sur toutes les cellules nucleees, reconnu par les LT cytotoxiques (CD8)\n- **CMH de classe II** : present sur les cellules presentatrices d'antigenes (CPA : macrophages, cellules dendritiques, lymphocytes B)\n- Le CMH est specifique a chaque individu (sauf vrais jumeaux)\n- Il est code par des genes tres polymorphes sur le chromosome 6\n\n**Le non-soi :**\n- **Antigene** : toute molecule capable de declencher une reponse immunitaire\n- Les antigenes peuvent etre : des molecules de surface de bacteries, virus, cellules etrangeres, toxines, allergenes\n- **Epitope (determinant antigenique)** : partie de l'antigene reconnue specifiquement par les recepteurs immunitaires\n\n**Le soi modifie :**\n- Cellules infectees par un virus ou cellules cancereuses\n- Presentent des antigenes anormaux associes au CMH I\n- Reconnues et eliminees par les LT cytotoxiques"
    },
    {
      "type": "formula",
      "title_fr": "Experiences de greffe",
      "body_fr": "**Principes de la greffe et du rejet :**\n\n1. **Autogreffe** (donneur = receveur) : toujours acceptee car le CMH est identique\n2. **Isogreffe** (entre vrais jumeaux) : acceptee car CMH identique\n3. **Allogreffe** (entre individus de la meme espece) : rejet possible si CMH incompatible\n4. **Xenogreffe** (entre especes differentes) : rejet systematique\n\n**Experience classique de greffe de peau chez la souris :**\n- Greffe de souris A vers souris A → acceptee (autogreffe)\n- Greffe de souris B vers souris A → rejet en 10-12 jours (reponse primaire)\n- 2eme greffe de souris B vers souris A → rejet accelere en 3-4 jours (reponse secondaire = memoire immunitaire)\n\n**Mecanisme du rejet :**\n- Les lymphocytes T du receveur reconnaissent le CMH du greffon comme du non-soi\n- Activation des LT cytotoxiques → destruction des cellules du greffon\n- Le rejet est une reponse immunitaire a mediation cellulaire\n\n**Prevention du rejet :**\n- Typage HLA : recherche de la meilleure compatibilite donneur-receveur\n- Immunosuppresseurs (ciclosporine) pour limiter la reponse immunitaire"
    },
    {
      "type": "example",
      "title_fr": "Compatibilite donneur-receveur",
      "body_fr": "**Enonce :** On dispose des typages HLA suivants pour un patient necessitant une greffe de rein et trois donneurs potentiels :\n\n- Patient : HLA-A2, HLA-A11, HLA-B7, HLA-B35, HLA-DR4, HLA-DR15\n- Donneur 1 : HLA-A2, HLA-A24, HLA-B7, HLA-B44, HLA-DR4, HLA-DR11\n- Donneur 2 : HLA-A2, HLA-A11, HLA-B7, HLA-B35, HLA-DR4, HLA-DR7\n- Donneur 3 : HLA-A1, HLA-A3, HLA-B8, HLA-B51, HLA-DR3, HLA-DR13\n\n**Analyse de compatibilite :**\n\n- Donneur 1 : 3 antigenes communs sur 6 (A2, B7, DR4) → compatibilite partielle\n- Donneur 2 : 5 antigenes communs sur 6 (A2, A11, B7, B35, DR4) → tres bonne compatibilite\n- Donneur 3 : 0 antigene commun → incompatible\n\n**Conclusion :** Le donneur 2 est le meilleur candidat car il presente le plus grand nombre d'antigenes HLA en commun avec le receveur (5/6). Le risque de rejet est minimal.\n\nEn pratique, on recherche aussi la compatibilite du groupe sanguin ABO et on realise un cross-match (test de compatibilite serique) avant la transplantation."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000040';

-- 9. Immunite specifique
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "L'immunite specifique",
      "body_fr": "L'immunite specifique (adaptative) est dirigee contre un antigene precis. Elle est assuree par les lymphocytes.\n\n**Immunite humorale (a mediation humorale) :**\n- Assuree par les lymphocytes B (LB)\n- Apres contact avec l'antigene, les LB se differencient en plasmocytes\n- Les plasmocytes secretent des anticorps (immunoglobulines) specifiques de l'antigene\n- Les anticorps neutralisent l'antigene en formant des complexes immuns\n- Structure de l'anticorps : 2 chaines lourdes + 2 chaines legeres, avec 2 sites de fixation a l'antigene\n\n**Immunite cellulaire (a mediation cellulaire) :**\n- Assuree par les lymphocytes T cytotoxiques (LTc ou CD8+)\n- Les LTc reconnaissent les cellules infectees presentant l'antigene associe au CMH I\n- Destruction par contact direct : liberation de perforines et granzymes → lyse de la cellule cible\n- Efficace contre les cellules infectees par des virus, cellules cancereuses, greffons\n\n**Les lymphocytes T auxiliaires (LT4 ou CD4+) :**\n- Role central : activation des LB et des LTc par secretion d'interleukines\n- Reconnaissent l'antigene presente par le CMH II des CPA\n- Indispensables a la reponse immunitaire specifique"
    },
    {
      "type": "formula",
      "title_fr": "Etapes de la reponse immunitaire specifique",
      "body_fr": "**Les 4 phases de la reponse immunitaire adaptative :**\n\n**1. Phase d'induction (reconnaissance) :**\n- Les CPA (macrophages, cellules dendritiques) phagocytent l'antigene et le presentent via le CMH II\n- Les LT4 reconnaissent le complexe antigene-CMH II\n- Les LB reconnaissent directement l'antigene par leurs recepteurs BCR\n\n**2. Phase d'amplification (proliferation clonale) :**\n- Les LT4 actives secretent des interleukines (IL-2)\n- Proliferation et differentiation des LB en plasmocytes\n- Proliferation et differentiation des LT8 en LTc\n- Selection clonale : seuls les clones specifiques de l'antigene proliferent\n\n**3. Phase effectrice (elimination) :**\n- Voie humorale : anticorps + antigene → complexe immun → phagocytose\n- Voie cellulaire : LTc + cellule infectee → lyse cellulaire\n\n**4. Phase de memoire :**\n- Formation de lymphocytes memoire (LB memoire, LT memoire)\n- Reponse secondaire plus rapide, plus intense et plus durable\n- Fondement de la vaccination"
    },
    {
      "type": "example",
      "title_fr": "Serotherapie vs vaccinotherapie",
      "body_fr": "**Serotherapie :**\n- Injection de serum contenant des anticorps specifiques (immunite passive)\n- Source : serum d'un animal immunise ou d'un donneur humain\n- Action immediate : les anticorps neutralisent directement l'antigene\n- Duree limitee : les anticorps injectes sont degrades en quelques semaines\n- Pas de memoire immunitaire\n- Utilisation : traitement d'urgence (morsure de serpent, tetanos declare)\n\n**Vaccinotherapie :**\n- Injection d'antigenes attenues, inactives ou de fragments antigeniques (immunite active)\n- Le systeme immunitaire du receveur produit ses propres anticorps\n- Action retardee : necessite plusieurs jours pour la reponse primaire\n- Duree prolongee : creation de cellules memoire\n- Rappels necessaires pour maintenir l'immunite\n- Utilisation : prevention (BCG, ROR, DTP, hepatite B)\n\n**Comparaison :**\n| Critere | Serotherapie | Vaccinotherapie |\n|---------|-------------|------------------|\n| Type d'immunite | Passive | Active |\n| Delai d'action | Immediat | Plusieurs jours |\n| Duree de protection | Courte (semaines) | Longue (annees) |\n| Memoire immunitaire | Non | Oui |\n| Usage | Curatif (urgence) | Preventif |"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000041';

-- 10. Dysfonctionnements immunitaires
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Dysfonctionnements du systeme immunitaire",
      "body_fr": "Le systeme immunitaire peut presenter des dysfonctionnements par exces, par defaut ou par erreur.\n\n**1. Les allergies (hypersensibilite) :**\n- Reaction exageree contre des antigenes normalement inoffensifs (allergenes : pollen, acariens, aliments)\n- Lors du 1er contact : sensibilisation, production d'IgE specifiques qui se fixent sur les mastocytes\n- Lors du 2eme contact : degranulation des mastocytes, liberation d'histamine → reaction inflammatoire\n- Manifestations : rhinite, asthme, eczema, choc anaphylactique\n\n**2. Les maladies auto-immunes :**\n- Le systeme immunitaire attaque les cellules du soi\n- Perte de la tolerance au soi\n- Exemples : diabete de type 1 (destruction des cellules beta du pancreas), lupus, polyarthrite rhumatoide, sclerose en plaques\n\n**3. L'immunodeficience :**\n- Deficit du systeme immunitaire\n- Congenitale : DICS (deficit immunitaire combine severe), syndrome de Di George\n- Acquise : SIDA (Syndrome d'Immunodeficience Acquise) cause par le VIH\n- Consequence : sensibilite accrue aux infections opportunistes"
    },
    {
      "type": "formula",
      "title_fr": "Le VIH et la destruction des LT4",
      "body_fr": "**Le Virus de l'Immunodeficience Humaine (VIH) :**\n\n**Structure du VIH :**\n- Retrovirus a ARN (2 brins d'ARN)\n- Enveloppe avec glycoproteines gp120 et gp41\n- Capside contenant la transcriptase inverse\n\n**Cycle de replication du VIH :**\n1. Fixation : gp120 se lie au recepteur CD4 des LT4 (+ corecepteur CCR5 ou CXCR4)\n2. Fusion et penetration de la capside dans la cellule\n3. Transcription inverse : ARN viral → ADN proviral (par la transcriptase inverse)\n4. Integration : l'ADN proviral s'integre au genome de la cellule hote\n5. Transcription et traduction : production de proteines virales\n6. Assemblage et bourgeonnement : liberation de nouveaux virions\n\n**Consequence : destruction progressive des LT4**\n- Les LT4 etant les chefs d'orchestre de la reponse immunitaire, leur destruction entraine un effondrement du systeme immunitaire\n- Seuil critique : quand les LT4 < 200/mm3 (normal : 800-1200/mm3), apparition des maladies opportunistes → stade SIDA\n\n**Modes de transmission :** voie sexuelle, voie sanguine, transmission mere-enfant"
    },
    {
      "type": "example",
      "title_fr": "Evolution de la charge virale et des LT4",
      "body_fr": "**Analyse de l'evolution de l'infection par le VIH :**\n\nApres contamination, l'infection evolue en 3 phases :\n\n**Phase 1 : Primo-infection (semaines 2-8)**\n- Charge virale : augmentation rapide (pic a 10^6-10^7 copies/mL)\n- LT4 : chute transitoire puis remontee partielle\n- Symptomes : syndrome grippal dans 50-80% des cas\n- Seroconversion : apparition des anticorps anti-VIH (fenetre serologique : 2-8 semaines)\n\n**Phase 2 : Phase asymptomatique (plusieurs annees, 2-15 ans)**\n- Charge virale : faible et relativement stable (equilibre dynamique)\n- LT4 : diminution lente et progressive\n- Le virus se replique activement dans les ganglions lymphatiques\n- Le patient est seropositif mais asymptomatique\n\n**Phase 3 : Stade SIDA**\n- Charge virale : augmentation importante\n- LT4 < 200/mm3\n- Apparition d'infections opportunistes : pneumocystose, toxoplasmose cerebrale, candidose, sarcome de Kaposi, tuberculose\n\n**Traitements :** La tritherapie (combinaison d'antiretroviraux) bloque la replication virale a differentes etapes (inhibiteurs de la transcriptase inverse, inhibiteurs de protease, inhibiteurs d'integrase). Elle ne guerit pas mais maintient la charge virale indetectable."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000042';

-- 11. Deformations tectoniques
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les deformations tectoniques",
      "body_fr": "Les roches de la croute terrestre subissent des contraintes tectoniques qui provoquent des deformations.\n\n**Les contraintes tectoniques :**\n- **Compression** : forces convergentes → raccourcissement\n- **Extension (distension)** : forces divergentes → allongement\n- **Cisaillement** : forces paralleles de sens oppose → coulissement\n\n**Les plis :**\n- Deformations souples (ductiles) des roches\n- Se forment sous des conditions de pression et temperature elevees, ou dans des roches plastiques\n- **Anticlinal** : pli convexe vers le haut (les couches les plus anciennes sont au coeur)\n- **Synclinal** : pli concave vers le haut (les couches les plus recentes sont au coeur)\n- Elements d'un pli : charniere, flancs, plan axial, axe du pli\n- Types de plis : droit, deverse, couche, coffreiforme\n\n**Les failles :**\n- Deformations cassantes (fragiles) des roches\n- Se produisent quand les contraintes depassent la limite d'elasticite de la roche\n- **Faille normale** : regime extensif, le compartiment situe au-dessus du plan de faille descend (le toit descend)\n- **Faille inverse** : regime compressif, le compartiment situe au-dessus du plan de faille monte (le toit monte)\n- **Faille decrochante (transformante)** : mouvement horizontal, coulissement lateral"
    },
    {
      "type": "formula",
      "title_fr": "Identification des structures sur carte et coupe geologique",
      "body_fr": "**Methode d'analyse d'une carte geologique :**\n\n1. **Identifier les couches** : reperer les differentes formations par leur couleur, symbole et age (legende stratigraphique)\n2. **Determiner le pendage** : direction et inclinaison des couches par rapport a l'horizontale\n3. **Reperer les failles** : traits epais, parfois avec indication du sens du rejet\n4. **Reperer les plis** : bandes de couches symetriques de part et d'autre d'un axe\n\n**Criteres d'identification sur une coupe :**\n\n- **Anticlinal** : les couches les plus anciennes sont au centre, les flancs s'inclinent vers l'exterieur\n- **Synclinal** : les couches les plus recentes sont au centre, les flancs s'inclinent vers l'interieur\n- **Faille normale** : extension, le toit descend par rapport au mur, les couches sont etendues (la serie est plus large)\n- **Faille inverse** : compression, le toit monte par rapport au mur, les couches se chevauchent (repetition de terrains)\n\n**Relations geometriques :**\n- Concordance : couches paralleles, depot continu\n- Discordance : couches non paralleles, lacune stratigraphique\n- Chevauchement : superposition anormale de terrains anciens sur des terrains plus recents"
    },
    {
      "type": "example",
      "title_fr": "Analyser une coupe geologique",
      "body_fr": "**Enonce :** On observe la coupe geologique suivante (de bas en haut) :\n- Couche 1 (la plus ancienne) : gres du Cambrien\n- Couche 2 : calcaire de l'Ordovicien\n- Couche 3 : schiste du Silurien\n- Couche 4 : gres du Devonien\n- Les couches 1 a 4 sont plissees en forme de U inverse (convexe vers le haut)\n- Une faille F coupe les couches avec un rejet vertical : le compartiment droit est descendu\n\n**Analyse :**\n\n1. **Structure plissee** : les couches forment un pli convexe vers le haut avec les couches les plus anciennes (Cambrien) au coeur → c'est un **anticlinal**\n\n2. **La faille F** : le compartiment au-dessus du plan de faille (toit) est descendu par rapport au compartiment en dessous (mur) → c'est une **faille normale**\n\n3. **Regime tectonique** :\n   - L'anticlinal temoigne d'une phase de compression (raccourcissement)\n   - La faille normale temoigne d'une phase d'extension posterieure\n   - Chronologie : la compression est anterieure a l'extension (la faille coupe les plis)\n\n**Conclusion :** Cette region a subi d'abord une phase de compression (formation des plis), puis une phase d'extension (formation de la faille normale). La faille est posterieure au plissement car elle affecte les structures plissees."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000043';

-- 12. Metamorphisme et granitisation
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Metamorphisme et granitisation",
      "body_fr": "Le metamorphisme est la transformation mineralogique et structurale des roches a l'etat solide, sous l'effet de variations de pression (P) et de temperature (T).\n\n**Types de metamorphisme :**\n\n1. **Metamorphisme regional (general) :**\n- Affecte de grandes surfaces dans les chaines de montagnes\n- Lie a l'augmentation de P et T lors de l'enfouissement ou de la collision\n- Produit une foliation (schistosite) : orientation preferentielle des mineraux aplatis\n- Serie : argile → schiste → micaschiste → gneiss → migmatite\n\n2. **Metamorphisme de contact (thermique) :**\n- Autour des intrusions magmatiques (plutons)\n- Principalement du a l'augmentation de T\n- Zone d'aureole de contact : la roche encaissante est transformee\n- Pas de foliation, texture granoblastique (cristaux equidimensionnels)\n- Exemples : corneen, marbre (a partir du calcaire), quartzite (a partir du gres)\n\n**Facies metamorphiques :**\nUn facies metamorphique est defini par une association mineralogique stable dans des conditions P-T determinees :\n- Facies des schistes verts (basse T, basse P) : chlorite, actinote, epidote\n- Facies des amphibolites (T moyenne, P moyenne) : amphibole, grenat\n- Facies des granulites (haute T, haute P) : pyroxene, sillimanite\n- Facies des eclogites (haute P, T moderee) : grenat, jadéite (omphacite)"
    },
    {
      "type": "formula",
      "title_fr": "Serie metamorphique et conditions P-T",
      "body_fr": "**La serie metamorphique regionale :**\n\nL'augmentation progressive de P et T transforme les roches selon la sequence :\n\nArgile → **Schiste** (chlorite, sericite) → **Micaschiste** (muscovite, biotite, grenats) → **Gneiss** (feldspaths, quartz, micas en lits alternes) → **Migmatite** (debut de fusion partielle)\n\n**Mineraux index (indicateurs de conditions P-T) :**\n- Chlorite : faible metamorphisme (schistes verts, ~300-450°C)\n- Biotite : metamorphisme moyen (~400-500°C)\n- Grenat (almandin) : metamorphisme moyen a eleve (~500-700°C)\n- Staurotide : metamorphisme moyen (~550-700°C, P moyenne)\n- Disthene (kyanite) : haute pression (~600-800°C, P > 0.5 GPa)\n- Sillimanite : haute temperature (~600-850°C, P moderee)\n- Andalousite : metamorphisme de contact (T elevee, basse P)\n\n**Diagramme P-T :**\n- Le gradient geothermique normal est d'environ 30°C/km\n- En zone de subduction : gradient faible (~10°C/km) → facies schistes bleus, eclogites\n- En zone d'extension (dorsale) : gradient eleve (~60°C/km) → facies granulites\n\n**La granitisation :**\nFusion partielle (anatexie) des roches metamorphiques a haute T (> 650°C) → formation de magma granitique. Les migmatites representent le stade intermediaire entre metamorphisme et magmatisme."
    },
    {
      "type": "example",
      "title_fr": "Identifier les mineraux indicateurs",
      "body_fr": "**Enonce :** On dispose de 4 echantillons de roches metamorphiques preleves dans une chaine de montagne, a des distances croissantes d'un batholite granitique. L'analyse mineralogique donne :\n\n- Echantillon A : quartz + feldspaths + biotite + sillimanite\n- Echantillon B : quartz + chlorite + sericite (muscovite fine)\n- Echantillon C : quartz + muscovite + biotite + grenat\n- Echantillon D : quartz + feldspaths + biotite + muscovite (lits clairs et sombres alternes)\n\n**Analyse :**\n\n1. Echantillon B : presence de chlorite et sericite → schiste → **faible metamorphisme** (facies schistes verts, ~300-450°C)\n\n2. Echantillon C : presence de grenat → micaschiste → **metamorphisme moyen** (~500-600°C)\n\n3. Echantillon D : lits alternes de mineraux clairs (quartz, feldspaths) et sombres (biotite) → gneiss → **metamorphisme eleve** (~600-700°C)\n\n4. Echantillon A : presence de sillimanite → **metamorphisme eleve, haute temperature** (~700-800°C), proche du batholite granitique\n\n**Classement par intensite croissante du metamorphisme :**\nB (schiste) → C (micaschiste) → D (gneiss) → A (gneiss a sillimanite)\n\n**Interpretation :** L'intensite du metamorphisme augmente en se rapprochant du batholite granitique, ce qui confirme l'influence thermique de l'intrusion magmatique (aureole metamorphique)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000044';
