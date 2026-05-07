-- ============================================================
-- SVT lesson cards expansion: 3 additional cards per skill (cards 4–6)
-- Content style: mechanism analogy first (Campbell Biology / Khan Academy),
--   then Moroccan BAC-style worked genetics/immunology problems.
-- Safe to re-run: only appends if card count < 6.
-- ============================================================

-- =====================
-- 33. Métabolisme énergétique (cell_energy)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "La mitochondrie : centrale électrique de la cellule",
      "body_fr": "Imaginez la mitochondrie comme une centrale hydraulique : les électrons provenant du glucose sont comme de l''eau en hauteur — leur chute vers l''oxygène libère de l''énergie qui actionne une turbine (l''ATP synthase). Cette turbine produit de l''ATP, la ''monnaie énergétique'' de la cellule.\n\n**Bilan de la respiration cellulaire (glycolyse + cycle de Krebs + chaîne respiratoire) :**\n$$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + \\text{ATP (env. 36-38 molécules)}$$\n\n**Coefficient Respiratoire (CR) :** $CR = \\frac{\\text{volume CO}_2 \\text{ dégagé}}{\\text{volume O}_2 \\text{ consommé}}$. Pour les glucides : CR = 1. Pour les lipides : CR ≈ 0,7. Pour les protéines : CR ≈ 0,8."
    },
    {
      "type": "example",
      "title_fr": "Calcul du quotient respiratoire",
      "body_fr": "**Problème.** Un muscle au repos consomme 120 mL O₂/h et dégage 84 mL CO₂/h. Quel est le substrat principalement utilisé ?\n\n**Solution.** $CR = \\frac{84}{120} = 0{,}70$.\n\nCR ≈ 0,7 → substrat lipidique (acides gras).\n\nEquation type pour un acide palmitique : $C_{16}H_{32}O_2 + 23O_2 \\to 16CO_2 + 16H_2O$.\n$CR = \\frac{16}{23} = 0{,}696 \\approx 0{,}70$ ✓\n\n**Interprétation :** Au repos, le muscle préfère oxyder les graisses car elles fournissent plus d''énergie par gramme. À effort intense, il bascule vers les glucides (CR → 1)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT Maroc 2022 (adapté).** Un muscle produit 180 molécules d''ATP par molécule de glucose oxydée complètement.\n\n1) Comparer ce chiffre au bilan théorique (36-38 ATP) et expliquer la différence.\n2) Calculer le rendement énergétique en sachant que l''oxydation complète d''une mole de glucose libère 2870 kJ, et qu''une mole d''ATP stocke environ 30 kJ.\n3) À quel processus correspond la production d''ATP en absence d''oxygène ?\n\n**Réponses guidées.** 1) 180 est supérieur car ce chiffre inclut plusieurs tours du cycle. En réalité : 38 ATP max par voie aérobie. 2) Rendement = (38 × 30) / 2870 ≈ 40 %. 3) Fermentation (lactique ou alcoolique) : 2 ATP par glucose seulement."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000033'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 34. Fermentation (fermentation)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Fermentation vs respiration : comparaison",
      "body_fr": "La fermentation est une voie anaérobie (sans O₂) qui recycle le NAD⁺ pour permettre la glycolyse de continuer. Elle est beaucoup moins efficace que la respiration.\n\n**Fermentation lactique** (muscle en manque d''O₂, bactéries) :\nGlucose → 2 lactate + 2 ATP\n\n**Fermentation alcoolique** (levures) :\nGlucose → 2 éthanol + 2 CO₂ + 2 ATP\n\n**Comparaison :**\n| | Fermentation | Respiration |\n|--|--|--|\n| O₂ requis | Non | Oui |\n| ATP produit | 2 | 36-38 |\n| Produits | lactate ou éthanol + CO₂ | CO₂ + H₂O |\n\n**Applications industrielles :** fromages, yaourts, pain, bière, vin, bioéthanol."
    },
    {
      "type": "example",
      "title_fr": "Expérience de Pasteur : anaérobiose",
      "body_fr": "**Expérience historique.** Pasteur montre que les levures fermentent en absence d''O₂ et respirent en sa présence (''effet Pasteur'').\n\n**Protocole simplifié :**\n- Flacon A (sans O₂) : levures + glucose → production de CO₂ et d''alcool. Croissance lente.\n- Flacon B (avec O₂) : levures + glucose → CO₂ + H₂O. Croissance rapide, peu d''alcool.\n\n**Résultat clé :** En présence d''O₂, les levures inhibent leur fermentation et préfèrent la respiration (18× plus efficace en ATP). Ce changement de métabolisme s''appelle l''effet Pasteur.\n\n**Au BAC :** On peut vous demander de schématiser les deux voies et d''expliquer l''avantage de la respiration."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** Des levures sont placées dans un milieu glucosé à 37°C. On mesure la production de CO₂ avec et sans oxygène.\n\n**Résultats :** Sans O₂ : 20 mmol CO₂/h. Avec O₂ : 6 mmol CO₂/h + consommation de 3 mmol O₂/h.\n\n1) Identifier les processus dans chaque cas.\n2) Calculer la quantité de glucose consommé dans chaque situation (1 mmol glucose → 2 mmol CO₂ en fermentation, 6 mmol CO₂ en respiration).\n3) Comparer l''efficacité énergétique.\n\n**Réponses.** 1) Sans O₂ : fermentation alcoolique. Avec O₂ : respiration (CR = 6/3×2 = 1 → glucides). 2) Sans O₂ : 10 mmol glucose/h. Avec O₂ : 1 mmol glucose/h. 3) La respiration utilise 10× moins de glucose pour le même besoin en ATP."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000034'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 35. ADN et information génétique (dna_structure)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Réplication de l''ADN : fidélité et mécanisme",
      "body_fr": "La réplication de l''ADN est **semi-conservative** : chaque nouvelle molécule d''ADN contient un brin parental et un brin nouvellement synthétisé.\n\n**Mécanisme simplifié (3 étapes) :**\n1. **Ouverture** : L''hélicase déroule la double hélice au niveau de l''origine de réplication.\n2. **Synthèse** : L''ADN polymérase ajoute des nucléotides complémentaires (A-T, G-C) sur chaque brin matrice, toujours dans le sens 5''→3''.\n3. **Correction** : L''ADN polymérase a une activité ''correctrice'' — elle élimine les erreurs incorporées (taux d''erreur final : 1 pour 10⁹ nucléotides).\n\n**Résultat :** 1 molécule d''ADN → 2 molécules identiques."
    },
    {
      "type": "example",
      "title_fr": "Expérience de Meselson-Stahl",
      "body_fr": "**Expérience historique (1958).** Pour prouver la réplication semi-conservative, Meselson et Stahl cultivèrent des bactéries en présence d''azote lourd (¹⁵N) puis transférèrent en milieu ¹⁴N normal.\n\n**Résultats (centrifugation en gradient de densité) :**\n- Génération 0 (¹⁵N) : une seule bande dense\n- Génération 1 : une seule bande de densité intermédiaire (hybride ¹⁵N-¹⁴N)\n- Génération 2 : deux bandes — une intermédiaire (hybride) et une légère (¹⁴N-¹⁴N)\n\n**Conclusion :** La bande intermédiaire à G1 (et sa persistance à G2) est la preuve du modèle semi-conservatif — impossible avec un modèle conservatif (qui aurait donné une bande lourde + une bande légère dès G1)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT Maroc 2021 (adapté).** Un ADN de 1000 paires de bases avec 30 % de bases adénine subit 3 cycles de réplication.\n\n1) Calculer le nombre de molécules d''ADN produites.\n2) Calculer le nombre total de guanines dans toutes les molécules.\n3) Combien de molécules d''ADN hybrides (un brin parental + un brin nouveau) y a-t-il après 3 cycles ?\n\n**Solutions.** 1) Après $n$ cycles : $2^n = 2^3 = 8$ molécules.\n\n2) A = T = 30 % → G = C = 20 %. Guanines par molécule = 0,20 × 2 × 1000 = 400. Total = 8 × 400 = 3200 guanines.\n\n3) Après la 1ère réplication : 2 hybrides. Après les cycles suivants, les 2 brins parentaux restent dans des molécules hybrides → toujours **2 molécules hybrides** après n cycles (quelle que soit $n$)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000035'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 36. Expression de l'information génétique (gene_expression)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Traduction : du codon à la protéine",
      "body_fr": "La **traduction** est la lecture de l''ARNm par les ribosomes pour synthétiser une protéine. Pensez-y comme un lecteur de code-barre : le ribosome lit les codons (groupes de 3 bases), et chaque codon commande un acide aminé spécifique.\n\n**Mécanisme :**\n1. Le ribosome se fixe sur l''ARNm au codon initiateur AUG (méthionine).\n2. L''ARNt complémentaire apporte l''acide aminé correspondant.\n3. La liaison peptidique se forme, le ribosome avance de 3 bases.\n4. Un codon stop (UAA, UAG, UGA) libère la protéine.\n\n**Code génétique :** 4³ = 64 codons pour 20 acides aminés → le code est redondant (plusieurs codons pour le même AA) mais **universel** (même code chez tous les êtres vivants)."
    },
    {
      "type": "example",
      "title_fr": "Déduire la séquence protéique",
      "body_fr": "**Problème.** Un brin matrice d''ADN : 3''-TAC-AAA-GGC-ATT-ACT-5''. Écrire l''ARNm et la séquence d''acides aminés.\n\n**Solution.**\n\nBrin matrice (3''-5'') → ARNm (5''-3'') : complémentaire + substitution T→U.\n- TAC → AUG (méthionine — codon start)\n- AAA → UUU (phénylalanine)\n- GGC → CCG (proline)\n- ATT → UAA (codon STOP !)\n\nSéquence protéique : **Met — Phe — Pro** (3 acides aminés).\n\n**Attention :** Le brin matrice est lu 3''→5'', l''ARNm est synthétisé 5''→3''. Ne pas confondre avec le brin codant (= séquence identique à l''ARNm, avec T à la place de U)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2022 (adapté).** Un fragment d''ARNm : 5''-AUG-CGU-GAA-UGC-UAA-3''.\n\n1) Déterminer le nombre d''acides aminés dans la protéine produite.\n2) Une mutation ponctuelle change GAA en GAG. La protéine est-elle modifiée ? Expliquer.\n3) Une délétion supprime le G du 4ème nucléotide (position 4). Analyser les conséquences.\n\n**Réponses.** 1) 4 codons entre AUG et UAA → **4 acides aminés** (dont la Met initiale qui est souvent clivée).\n\n2) GAA et GAG codent tous les deux pour l''**acide glutamique** (Glu) — mutation silencieuse, protéine inchangée. Le code génétique est redondant.\n\n3) La délétion décale le cadre de lecture (**frameshift**) : tous les codons suivants sont modifiés → protéine totalement différente, probablement non fonctionnelle."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000036'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 37. Code génétique et mutations (mutations)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Types de mutations et leur impact",
      "body_fr": "Une **mutation** est une modification permanente de la séquence d''ADN. Elle peut être :\n\n**Selon la portée :**\n- **Ponctuelle** (substitution) : un nucléotide remplacé par un autre\n- **Insertion/délétion** : ajout ou suppression de nucleotide(s) → décalage du cadre de lecture (*frameshift*) si non multiple de 3\n\n**Selon les conséquences sur la protéine :**\n- **Silencieuse** : même acide aminé (redondance du code) → pas d''effet\n- **Faux-sens** : acide aminé différent → protéine modifiée (peut être inoffensive ou délétère)\n- **Non-sens** : codon stop prématuré → protéine tronquée non fonctionnelle\n\n**Causes :** Erreurs de réplication, rayons UV (thymines dimères), agents mutagènes chimiques."
    },
    {
      "type": "example",
      "title_fr": "Analyse d''une mutation : drépanocytose",
      "body_fr": "**Exemple concret.** La drépanocytose (anémie falciforme) est causée par une mutation ponctuelle dans le gène de l''hémoglobine.\n\n**Mutation :** Codon 6 de la chaîne β : GAG (Glu) → GTG (Val).\n\nC''est une mutation **faux-sens** : un acide aminé chargé négativement (Glu) est remplacé par un acide aminé hydrophobe (Val).\n\n**Conséquences :**\n- La valine hydrophobe provoque l''agglomération des molécules d''hémoglobine en fibres\n- Les globules rouges deviennent falciformes (en forme de faucille)\n- Obstruction des capillaires → douleurs, anémie, crises vaso-occlusives\n\n**Leçon :** Un seul nucléotide sur 3 milliards de paires de bases peut transformer radicalement la fonction d''une protéine !"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** Séquence d''ARNm normale : AUG-AAA-CCC-GAU-UAG.\nMutation 1 : CCC → CCG. Mutation 2 : insertion d''un U après le 6ème nucléotide.\n\n1) Quelle est la séquence protéique normale ?\n2) Analyser les effets de chaque mutation.\n3) Quelle mutation est la plus délétère ? Justifier.\n\n**Réponses.** 1) AUG(Met)-AAA(Lys)-CCC(Pro)-GAU(Asp) → **4 acides aminés**.\n\n2) Mutation 1 : CCC et CCG codent tous deux pour la proline → **mutation silencieuse**, protéine inchangée.\n\nMutation 2 : insertion après position 6 → cadre décalé à partir du 3ème codon : AUG-AAA-UCG-CGA-U... → séquence d''AA totalement différente (**frameshift mutation**) + perte probable du stop.\n\n3) La mutation 2 est la plus délétère : le frameshift altère tous les acides aminés à partir de la position 3 et peut produire une protéine non fonctionnelle."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000037'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 38. Hérédité autosomique (autosomal_heredity)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Dominance, récessivité et croisements-tests",
      "body_fr": "**Rappels fondamentaux :**\n- Un allèle **dominant** s''exprime même en un seul exemplaire (hétérozygote).\n- Un allèle **récessif** ne s''exprime qu''en double dose (homozygote).\n\n**Croisement-test (back-cross) :** Pour déterminer le génotype d''un individu au phénotype dominant, on le croise avec un homozygote récessif. Si la descendance est 1:1 (moitié dom., moitié réc.) → l''individu est hétérozygote. Si toute la descendance est dominante → il est homozygote dominant.\n\n**Dihybridisme :** Pour deux gènes indépendants (non liés), la descendance d''un double hétérozygote (F₁) croisé avec lui-même suit le rapport 9:3:3:1 des phénotypes (loi d''assortiment indépendant de Mendel)."
    },
    {
      "type": "example",
      "title_fr": "Croisement dihybride résolu",
      "body_fr": "**Problème.** Chez le pois, graine jaune (Y) dominant sur vert (y) ; ronde (R) dominant sur ridée (r). Croiser deux plantes F₁ dihétérozygotes (YyRr × YyRr).\n\n**Solution.** Gamètes de YyRr : YR, Yr, yR, yr (4 types équiprobables).\n\nTableau de Punnett 4×4 → 16 combinaisons :\n- Jaune Ronde (Y_R_) : 9/16\n- Jaune Ridée (Y_rr) : 3/16\n- Verte Ronde (yyR_) : 3/16\n- Verte Ridée (yyrr) : 1/16\n\n**Rapport 9:3:3:1** — preuve que les deux gènes sont indépendants (situés sur des chromosomes différents).\n\n**Si les gènes étaient liés** (même chromosome), les proportions seraient différentes — il faudrait tenir compte des crossing-over."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT Maroc 2022 (adapté).** L''albinisme est une maladie autosomique récessive. Deux parents normalement pigmentés ont un enfant albinos.\n\n1) Déterminer les génotypes des parents.\n2) Quelle est la probabilité que leur 2ème enfant soit albinos ?\n3) Quelle est la probabilité que leur 2ème enfant soit porteur sain ?\n\n**Solutions.** 1) L''enfant albinos est homozygote récessif (aa). Chaque parent lui a transmis un allèle a → les parents sont tous deux **hétérozygotes Aa** (porteurs sains).\n\n2) Croisement Aa × Aa :\n| | A | a |\n|--|--|--|\n| **A** | AA | Aa |\n| **a** | Aa | aa |\nP(albinos = aa) = **1/4 = 25 %**.\n\n3) P(porteur sain = Aa) = 2/4 = **50 %**."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000038'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 39. Hérédité liée au sexe (sex_linked_heredity)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Caractéristiques de l''hérédité liée au sexe",
      "body_fr": "Les gènes portés par le chromosome X (gonosomes) ont des patterns héréditaires spécifiques :\n\n**Gène récessif lié à X :** Les femmes (XX) peuvent être porteuses (X^A X^a) sans être malades. Les hommes (XY) n''ont qu''un seul X — si l''allèle récessif y est présent, la maladie s''exprime obligatoirement. Résultat : la maladie touche **plus souvent les garçons**.\n\n**Exemples classiques :** Daltonisme, hémophilie A et B.\n\n**Identification au BAC :**\n- Si un père malade a des fils tous sains et des filles toutes porteuses → lié à X\n- Si un homme malade a une mère saine mais grand-père maternel malade → typiquement lié à X récéssif (transmission par la mère porteuse)"
    },
    {
      "type": "example",
      "title_fr": "Daltonisme : arbre généalogique",
      "body_fr": "**Arbre généalogique.** Une femme normale (fille d''un daltonien) épouse un homme normal. Quels sont les risques pour leurs enfants ?\n\n**Solution.** Le daltonisme est récessif lié à X. Notons $X^D$ l''allèle normal et $X^d$ l''allèle daltonien.\n\nLa femme a un père daltonien ($X^d Y$) → elle a reçu son $X^d$ de son père. Elle est **porteuse** : $X^D X^d$.\nL''homme est normal : $X^D Y$.\n\nCroisement $X^D X^d \\times X^D Y$ :\n- Filles : $X^D X^D$ (50 % normales) et $X^D X^d$ (50 % porteuses)\n- Garçons : $X^D Y$ (50 % normaux) et $X^d Y$ (50 % **daltoniens**)\n\n**Risque :** 25 % de tous les enfants (ou 50 % des garçons) seront daltoniens."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** L''hémophilie A est récessive liée à X. Un homme hémophile épouse une femme dont le père était hémophile et la mère saine non-porteuse.\n\n1) Déterminer les génotypes des deux parents.\n2) Donner les proportions phénotypiques attendues chez les filles et les garçons.\n3) Peut-on avoir une fille hémophile dans cette famille ? Justifier.\n\n**Solutions.** 1) Homme hémophile : $X^h Y$. Femme : son père était hémophile ($X^h Y$) → elle a reçu $X^h$ de lui, et $X^H$ de sa mère saine non-porteuse → **porteuse $X^H X^h$**.\n\n2) Croisement $X^H X^h \\times X^h Y$ :\n- Filles : $X^H X^h$ (50 % porteuses saines) et $X^h X^h$ (50 % **hémophiles**)\n- Garçons : $X^H Y$ (50 % sains) et $X^h Y$ (50 % hémophiles)\n\n3) **Oui** : 50 % des filles sont hémophiles ($X^h X^h$) — c''est un cas particulier où la mère est porteuse ET le père hémophile."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000039'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 40. Le soi et le non-soi (self_nonself)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Complexe majeur d''histocompatibilité (CMH)",
      "body_fr": "Imaginez chaque cellule du corps portant un badge d''identification unique : le **complexe majeur d''histocompatibilité (CMH)**. Ces molécules à la surface des cellules présentent des fragments de protéines (peptides) aux lymphocytes T, permettant la surveillance immunologique.\n\n**CMH de classe I :** Présent sur toutes les cellules nucléées. Présente des peptides du cytoplasme (protéines intracellulaires). Les lymphocytes T cytotoxiques (LTc) le reconnaissent.\n\n**CMH de classe II :** Présent uniquement sur les cellules présentatrices d''antigènes (macrophages, cellules dendritiques, LB). Présente des peptides extracellulaires phagocytés. Les lymphocytes T helper (LTh) le reconnaissent.\n\n**Greffes :** Si le donneur et le receveur ont des CMH différents, les LTc du receveur reconnaissent les cellules du greffon comme ''non-soi'' et l''attaquent (rejet)."
    },
    {
      "type": "example",
      "title_fr": "Test de compatibilité transfusionnelle",
      "body_fr": "**Système ABO :** Les groupes sanguins sont déterminés par des antigènes (agglutinogènes) sur les globules rouges et des anticorps naturels (agglutinines) dans le plasma.\n\n| Groupe | Antigène GR | Anticorps plasma |\n|--------|-------------|------------------|\n| A | A | anti-B |\n| B | B | anti-A |\n| AB | A et B | aucun |\n| O | aucun | anti-A et anti-B |\n\n**Règle de compatibilité :** Ne jamais transfuser si les anticorps du receveur correspondent aux antigènes du donneur (agglutination → emboles).\n\nGroupe O = **donneur universel** (pas d''antigènes). Groupe AB = **receveur universel** (pas d''anticorps).\n\n**Facteur Rhésus :** Rh+ possède l''antigène D ; Rh- n''en possède pas. Une personne Rh- recevant du sang Rh+ développera des anticorps anti-D."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2022 (adapté).** Un patient de groupe A Rh+ a besoin d''une transfusion urgente. Les poches disponibles sont : A Rh+, A Rh-, O Rh+, O Rh-, B Rh+, AB Rh-.\n\n1) Indiquer quelles poches sont compatibles et pourquoi.\n2) Si seulement O Rh- est disponible, est-ce compatible ?\n3) Expliquer pourquoi une femme Rh- enceinte d''un fœtus Rh+ est à risque.\n\n**Réponses.** 1) Compatible : A Rh+ (identique), A Rh- (même groupe, Rh- est toléré par Rh+), O Rh+ (donneur universel + même Rh), O Rh- (donneur universel, Rh- toléré). Incompatible : B Rh+ (anti-B dans le plasma A) et AB Rh- (anti-A et anti-B présents).\n\n2) O Rh- est compatible (groupe O = pas d''antigènes ABO ; Rh- = accepté par Rh+).\n\n3) Le fœtus Rh+ peut faire passer des GR Rh+ dans la circulation maternelle → la mère Rh- fabrique des anti-D → lors d''une 2ème grossesse Rh+, les anti-D maternels traversent le placenta et attaquent les GR fœtaux (maladie hémolytique du nouveau-né)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000040'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 41. Immunité spécifique (specific_immunity)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Réponse humorale vs cellulaire : deux branches de l''immunité adaptative",
      "body_fr": "**Réponse humorale (LB → anticorps) :**\n- Cible : antigènes extracellulaires (bactéries, toxines, virus libres)\n- Mécanisme : LB activés → plasmocytes → anticorps → neutralisation, opsonisation, activation du complément\n- Mémoire : lymphocytes B mémoire → réponse plus rapide et intense au 2ème contact\n\n**Réponse cellulaire (LT cytotoxiques) :**\n- Cible : cellules infectées, cellules cancéreuses, cellules greffées\n- Mécanisme : LTc activés → reconnaissance CMH I-peptide → cytotoxicité directe (perforine, granzyme)\n- Les LT helper (CD4) orchestrent les deux types de réponses en produisant des interleukines\n\n**Clé de lecture BAC :** Une question sur l''immunité spécifique demande toujours de distinguer la réponse humorale (anticorps) de la cellulaire (LTc) et de préciser le type d''antigène ciblé."
    },
    {
      "type": "example",
      "title_fr": "Vaccination : immunité active",
      "body_fr": "**Principe de la vaccination.** Un vaccin introduit des antigènes (virus atténué, protéine virale, ARNm...) sans provoquer la maladie. Le système immunitaire monte une réponse primaire et génère des **lymphocytes mémoire**.\n\n**Lors d''un contact ultérieur avec le vrai pathogène :**\n- Les cellules mémoire se multiplient rapidement (expansion clonale)\n- La réponse secondaire est plus rapide, plus forte, et dure plus longtemps\n- Le pathogène est éliminé avant l''apparition des symptômes\n\n**Immunité de groupe (troupeau) :** Si suffisamment de personnes sont immunisées, le pathogène ne peut plus circuler — même les non-vaccinés sont protégés (seuil : 70-95 % selon le R₀ de la maladie)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** On injecte un antigène A à trois souris :\n- Souris 1 : 1ère injection de A → mesure des anticorps anti-A à J7, J14, J21\n- Souris 2 : même protocole, + 2ème injection de A à J21\n- Souris 3 : 1ère injection de A à J0, puis injection d''un antigène B à J21\n\nLes courbes montrent que la souris 2 produit 10× plus d''anticorps anti-A après J21.\n\n1) Nommer et expliquer le phénomène observé chez la souris 2.\n2) Que peut-on conclure sur la souris 3 pour l''antigène A et pour l''antigène B ?\n3) Quel type cellulaire est responsable de la réponse accélérée ?\n\n**Réponses.** 1) **Réponse immunitaire secondaire (anamnesique)** : plus rapide, plus intense, plus durable — due à la présence de lymphocytes B mémoire créés lors de la réponse primaire. 2) Anti-A : réponse secondaire (mémoire). Anti-B : réponse primaire (premier contact). 3) **Lymphocytes B et T mémoire** spécifiques de l''antigène A."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000041'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 42. Dysfonctionnements immunitaires (immune_disorders)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "SIDA : destruction du système immunitaire",
      "body_fr": "Le VIH (virus de l''immunodéficience humaine) cible spécifiquement les **lymphocytes T CD4 (helper)**. Il les infecte, se réplique à l''intérieur, et finit par les détruire.\n\n**Progression de l''infection :**\n1. Primo-infection (2-4 semaines) : symptômes grippaux, pic virémie, chute rapide des CD4\n2. Phase asymptomatique (2-15 ans) : virus peu actif, CD4 entre 500-1000/mm³\n3. SIDA déclaré : CD4 < 200/mm³ → défenses immunitaires effondrées → infections opportunistes\n\n**Infections opportunistes :** Dues à des microorganismes inoffensifs chez une personne immunocompétente (Pneumocystis jirovecii, Toxoplasma gondii, CMV...).\n\n**Traitement ARV :** Les antirétroviraux bloquent la réplication du VIH (inhibiteurs de la transcriptase inverse, de la protéase...) mais ne guérissent pas."
    },
    {
      "type": "example",
      "title_fr": "Allergies : réponse immune exagérée",
      "body_fr": "**Mécanisme de l''allergie de type I (anaphylaxie) :**\n\n1. **Sensibilisation :** Premier contact avec l''allergène → production d''IgE spécifiques → fixation des IgE sur les mastocytes\n2. **Réaction :** Second contact → l''allergène se lie aux IgE sur les mastocytes → **dégranulation** → libération d''histamine et d''autres médiateurs inflammatoires\n3. **Symptômes :** Vasodilatation, bronchoconstriction, urticaire... pouvant aller jusqu''au choc anaphylactique (voies respiratoires bloquées)\n\n**Traitement :**\n- Antihistaminiques : bloquent les récepteurs à l''histamine\n- Épinéphrine (adrénaline) : traitement d''urgence du choc anaphylactique\n- Désensibilisation : expositions répétées à des doses croissantes d''allergène"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2022 (adapté).** Un patient VIH+ a un taux de CD4 de 180/mm³ (normal : 800-1200/mm³). Il développe une pneumonie à Pneumocystis.\n\n1) Expliquer pourquoi cette infection est qualifiée d''opportuniste.\n2) Quel type cellulaire est ciblé par le VIH et quel est le rôle normal de ces cellules ?\n3) Pourquoi les personnes atteintes du SIDA sont-elles vulnérables à la fois aux infections bactériennes ET virales ?\n\n**Réponses.** 1) Pneumocystis est inoffensif chez les immunocompétents. Ici, le système immunitaire effondré ne peut l''éliminer → infection opportuniste.\n\n2) Les **lymphocytes T CD4 (helper)** sont ciblés. Ils orchestrent la réponse immunitaire : ils activent les LB (réponse humorale) ET les LTc (réponse cellulaire).\n\n3) La destruction des LT helper paralyse les **deux branches** de l''immunité adaptative. Sans LT helper : pas d''activation correcte des LB (donc moins d''anticorps contre les bactéries) et pas d''activation des LTc (donc pas de lutte contre les cellules infectées par virus)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000042'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 43. Déformations tectoniques (tectonic_deformations)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Structures tectoniques : plis et failles",
      "body_fr": "Sous l''effet des contraintes tectoniques (compression ou extension), les roches se déforment :\n\n**Déformation ductile (profondeur, chaleur) → Plis :**\n- Anticlinal : voûte vers le haut (coeur = roches les plus anciennes)\n- Synclinal : creux vers le bas (coeur = roches les plus récentes)\n\n**Déformation cassante (surface, froid) → Failles :**\n- **Faille normale** (extension) : le compartiment supérieur (toit) descend par rapport au mur\n- **Faille inverse** (compression) : le toit monte sur le mur (chevauchement)\n- **Faille décrochante** : déplacement horizontal (ex : faille de San Andreas)\n\n**Règle stratigraphique :** Dans une série sédimentaire non déformée, les couches les plus profondes sont les plus anciennes (principe de superposition)."
    },
    {
      "type": "example",
      "title_fr": "Lire une coupe géologique",
      "body_fr": "**Comment lire une coupe géologique :**\n\n1. Identifier les couches et leur ordre (stratigraphie)\n2. Repérer les déformations (plis, failles, discordances)\n3. Reconstituer l''histoire géologique (du plus ancien au plus récent)\n\n**Exemple de lecture :** Une coupe montre (de bas en haut) : granite, schistes plissés, discordance angulaire, calcaires horizontaux.\n\n**Reconstruction :** 1) Dépôt et plissement des schistes. 2) Intrusion du granite. 3) Érosion → surface plane. 4) Transgression marine → dépôt des calcaires. La discordance angulaire marque une phase orogénique entre les deux dépôts."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT (géologie) 2022 (adapté).** Une coupe montre une faille entre deux blocs. Le bloc gauche est descendu de 200 m par rapport au bloc droit. Les couches sur les deux blocs sont initialement les mêmes.\n\n1) Identifier le type de faille et la contrainte tectonique responsable.\n2) Sachant que les couches A (en bas) et B (en haut) ont des âges de 200 Ma et 50 Ma respectivement, déterminer l''âge de la faille.\n3) Dans quel contexte géodynamique peut-on trouver ce type de faille ?\n\n**Réponses.** 1) Le toit (bloc gauche) est descendu → **faille normale**. Contrainte : **extension** (distension).\n\n2) La faille affecte toutes les couches visibles, y compris B (50 Ma). Elle est donc postérieure à 50 Ma. Pour dater précisément, on cherche la couche la plus récente affectée et la plus ancienne couche non affectée.\n\n3) Failles normales associées aux rifts (ex : rift est-africain), dorsales océaniques, marges passives."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000043'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 44. Métamorphisme et granitisation (metamorphism)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Gradient métamorphique et faciès",
      "body_fr": "Le métamorphisme est la transformation de roches à l''état solide sous l''effet de la chaleur et/ou de la pression. Les roches ne fondent pas — leurs minéraux se réorganisent en de nouveaux minéraux stables dans les nouvelles conditions.\n\n**Principaux types de métamorphisme :**\n- **De contact (thermique)** : roche magmatique chaude intruse dans des roches encaissantes → auréole métamorphique. Haute T, basse P.\n- **Régional (orogénique)** : lors de la formation de chaînes de montagnes → vastes zones affectées. Combinaison T et P.\n- **De subduction** : haute P, basse T → faciès schiste bleu (glaucophane)\n\n**Minéraux indicateurs (''thermomètres-baromètres géologiques'') :** chlorite (basse T) → biotite → grenat → staurotide → disthène (haute P) → sillimanite (haute T)."
    },
    {
      "type": "example",
      "title_fr": "Formation du granite d''anatexie",
      "body_fr": "**Granitisation (anatexie) :** Quand les conditions de pression et de température deviennent extrêmes (>650°C), les roches métamorphiques commencent à fondre partiellement → **migmatites** (roches mixtes, partiellement fondues).\n\nSi la fusion partielle est complète, le magma granitique peut :\n1. **Rester en place** → refroidissement lent → granite syn-métamorphique (même âge que le métamorphisme)\n2. **Remonter** → s''introduire dans les roches encaissantes → granite intrusif (post-métamorphique)\n\n**Preuve de l''origine :** Les granites d''anatexie contiennent des enclaves de roches métamorphiques non fondues (''restites'') et ont une composition proche des roches métamorphiques environnantes."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT géologie 2023 (adapté).** Des roches prélevées à différentes profondeurs lors d''un forage dans une zone orogénique montrent :\n- 0-5 km : calcaires et grès (non transformés)\n- 5-15 km : schistes à chlorite (verts)\n- 15-25 km : gneiss à biotite et grenat\n- >25 km : migmatites\n\n1) Dresser le gradient métamorphique de la zone.\n2) Expliquer l''origine des migmatites.\n3) Dans quel contexte géodynamique ce métamorphisme régional est-il caractéristique ?\n\n**Réponses.** 1) T et P augmentent avec la profondeur : chlorite (faible) → biotite/grenat (modéré) → migmatites (fort). Le gradient est de type normal/régional.\n\n2) Les migmatites résultent de la **fusion partielle** des gneiss à très haute T et P : début d''anatexie. Présence de lits clairs (leucosomes = néo-granite) et sombres (mélanosomes = résidu).\n\n3) **Métamorphisme régional** caractéristique des **zones de collision continentale** (orogènes) — ex : formation des Alpes, de l''Himalaya."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000044'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;
