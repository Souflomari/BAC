# ADR 0038 — La règle présente et sans effet, et le défaut qui rendait une porte verte

**Date :** 2026-09-21 · **Statut :** accepté (prolonge ADR 0031, 0033, 0034, 0037)

---

## Contexte

Journée d'audit autonome. Huit défauts réels corrigés dans le produit, trois
portes neuves, deux portes élargies — et, de nouveau, **plusieurs fois la
mesure était fausse avant le produit**. Les faits sont en `docs/HANDOFF.md`
§11.164 à §11.173 ; cet ADR ne garde que ce qui se généralise.

---

## 1. Une règle PRÉSENTE n'est pas une règle QUI S'APPLIQUE

Le sur-titre de partie d'une épreuve coupait une formule (§11.173). Correctif
posé : `max-width: 100%` et `overflow-x: auto` sur `.katex`. Re-mesuré :
**rien n'avait bougé**. Le style était bien là — il se lisait dans le style
calculé —, et il ne faisait rien, parce que KaTeX rend `.katex` en
`display: inline`, et **une boîte en ligne ignore `max-width` comme
`overflow`**.

> Une porte qui aurait demandé « la règle est-elle présente ? » l'aurait
> déclarée verte. C'est ADR 0033 sous une forme neuve : la question exacte
> (« la déclaration existe-t-elle ? ») est plus étroite que celle qu'on croit
> poser (« l'effet a-t-il lieu ? »).

**Règle.** Un correctif de style, de configuration ou de dépendance se vérifie
sur son **EFFET mesuré**, jamais sur la présence de la déclaration. Le corollaire
opérationnel : re-mesurer après avoir corrigé, avec le même instrument qui avait
crié — et non se fier au diff.

Même forme ailleurs le même jour : cinq clés héritées écrivaient une fonction
dans `--font-scale` (§11.169), et **cela ne cassait rien** — CSS jette la
valeur invalide, la page rend au pixel près comme sans préférence. Défaut réel,
effet nul. Il a été corrigé **parce qu'il est faux**, et la note le dit au lieu
de laisser croire à un incident.

---

## 2. Un défaut peut rendre une porte VERTE sur un autre défaut

`frenchTypography` était appelée sur des chaînes brutes contenant du LaTeX, et
posait une espace fine devant le `;` **à l'intérieur des formules** (§11.165) —
jusqu'à couper la commande `\;` en deux. En réparant cela, la porte typographie
est passée **ROUGE sur trois pages**, alors que le correctif n'avait fait que
*cesser* d'abîmer des formules.

La cause du rouge n'était pas le correctif : c'était un **second défaut que le
premier masquait** (§11.166). Le sur-titre de partie était rendu en texte nu —
**150 formules LaTeX affichées telles quelles sur 26 pages**, dollars et
contre-obliques compris —, et la fine injectée dans le `$(O;\vec{u})$` visible
satisfaisait très exactement la règle « espace devant une ponctuation haute »
que la porte exigeait.

**Règle.** Quand un correctif fait passer une porte au rouge **sans rien
casser**, c'est un signal, pas du bruit : quelque chose qui était caché vient
d'apparaître. Le réflexe est d'examiner le rouge avant de le faire taire.

---

## 3. Une sabotage qui n'atteint pas la porte n'est pas un essai rouge

ADR 0034 avait établi qu'un essai rouge est ambigu tant qu'on n'a pas montré le
vert qui l'a précédé. Il manquait un cas : la sabotage peut casser **autre chose
que ce qu'on mesure**.

Casser une CONDITION en `false &&` rend la branche inatteignable ; TypeScript
cesse de rétrécir le type ; la construction échoue ; **la porte ne tourne
jamais**. Code de sortie non nul, et l'outil annonçait « ✓ passée ROUGE, elle
VOIT ce défaut ». Le rouge venait de `tsc`.

C'était la **troisième** version du même défaut dans le même outil (§11.104 la
commande n'a jamais tourné ; §11.106 stderr perdu). Conformément à ADR 0033,
c'est le geste qui a été outillé : `essai-rouge` inspecte la sortie et
**suspend son verdict** quand elle porte la marque d'une chaîne d'outils tombée
avant la porte (`Failed to compile`, `error TS####`, `Cannot find module`,
`SyntaxError`, …), et dit comment réécrire la sabotage — **viser une VALEUR,
pas une CONDITION**.

Le détecteur avait lui-même un angle mort : son premier jet ne connaissait que
les formulations de *Next* et ne reconnaissait pas `tsc` en direct. Le motif a
été écrit **après** avoir rejoué la sabotage pour lire le texte exact.

---

## 4. Ne PAS armer est un résultat — à condition de nommer la condition qui, elle, mérite une porte

Deux décisions inverses le même jour, et c'est le contraste qui compte.

**On n'arme pas** une porte « aucun point décimal dans une formule » (§11.171) :
sur quatre candidats, **trois sont une fidélité délibérée** au sujet officiel,
écrite en toutes lettres dans la note de provenance. La porte serait rouge sur
ce qu'on veut garder, et pousserait le prochain auteur à dégrader le corpus
pour faire taire l'outil.

**On arme** une porte que le même raisonnement avait pourtant refusée
(§11.172). `ancres-uniques` avait conclu qu'une porte « aucun id dupliqué »
serait rouge sur un fait inoffensif — c'est juste : 49 notions sur 51
définissent un `step-N` différemment d'une figure à l'autre. Mais cette
conclusion laissait **le danger sans garde**. La porte neuve exige les trois
conditions à la fois — même id, définitions différentes, **et déréférencé** —
c'est-à-dire mot pour mot la condition que la note nommait comme dangereuse.
Elle se tait 49 fois et crie une fois.

**Règle.** Un refus d'armer doit énoncer **la condition qui mériterait une
porte**, faute de quoi il se transmet comme « ici, rien à garder ». Et le renvoi
se pose **dans les deux sens** (ADR 0031 : un renvoi est une instruction).

---

## 5. L'unité, encore — et l'erreur refaite une heure après l'avoir écrite

ADR 0037 avait posé qu'un motif appliqué à une unité plus large finit par manger
du contenu. La journée en a donné **les deux sens**, et une récidive.

**Trop petite** (§11.164) : la règle d'apostrophe exigeait une lettre après
l'apostrophe *dans le même nœud de texte*. Or `l'**amylase**` fait trois nœuds.
**152 apostrophes droites lisibles sur 50 pages, dont 0 vues par la porte** —
qui appliquait le même motif, nœud par nœud, et partageait donc l'angle mort du
mécanisme qu'elle surveille.

**Trop grande** (§11.165) : les quatre règles typographiques s'appliquaient à
la chaîne entière, LaTeX compris.

**La récidive** (§11.172) : la porte neuve groupait par NOTION. Une page
d'ÉPREUVE inline les figures de **plusieurs** notions — deux notions qui ne
partagent jamais une page de leçon se croisent dans un sujet de bac. Unité
élargie au corpus une heure après avoir écrit la porte.

**Règle.** L'unité d'un motif s'écrit **explicitement**, à côté du motif, avec
la raison. « Le nœud », « le bloc », « la notion », « le corpus » ne sont pas
interchangeables, et le choix se justifie par **ce qui peut se retrouver
ensemble**, pas par ce qui est commode à coder.

---

## 6. Le chiffre auquel l'élève tient

Hors méthode, un fait de produit qui mérite d'être retenu : personne n'avait
jamais ouvert les 39 épreuves, coché **toutes** les questions « juste », et lu
la note. **Deux épreuves sur 39 refusaient le 20/20 à une copie parfaite**
(19,25 et 19,75), parce que la règle de lecture du barème ne retenait que la
PREMIÈRE étiquette d'un énoncé groupé (§11.168). Et **518 questions sur 1 472**
affichaient « Partiel · 0,13 » pour 0,125 compté (§11.170).

**Règle.** Le geste de vérification le plus utile est souvent le plus bête :
faire ce que ferait l'élève, jusqu'au bout, et lire le chiffre.

---

## Ce que cet ADR ne tranche pas

- La CI GitHub n'a **toujours pas de runner** depuis la veille : tout ce qui
  précède est mesuré **en local**. Aucune de ces pages ne doit être lue comme
  « CI verte ».
- Les décisions owner en attente ne bougent pas : elles restent listées en
  `docs/audits/DECISIONS-EN-ATTENTE.md` et dans HANDOFF §11.
- La normalisation de `.10^{…}` vers `\times 10^{…}` (13 occurrences contre
  1 571) est une décision de notation, **non prise ici**.

---

## Retractions and Corrections

*(aucune à ce jour)*
