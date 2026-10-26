/* eslint-disable */
// @ts-nocheck
/**
 * Leçon pilote « Du gène à la protéine » — l'expression de l'information
 * génétique (SVT, 2ᵉ Bac), deuxième version (refonte 2026-10, retours du
 * propriétaire du 2026-10-26 : docs/refonte/04-retours-pilotes.md).
 *
 * Neuf parties, chacune finie par une question « Vérifie » : ce qu'il faut
 * savoir (protéine, hémoglobine, chromosome, gène), l'énigme, le messager, la
 * transcription, le code, la traduction, la mutation, de la lettre à la
 * maladie, le bac. Les scènes sont dans `expression-genetique-scenes-*.js`, la
 * donnée génétique dans `expression-genetique-code.js`, les fiches de mots dans
 * `expression-genetique-mots.js` ; le déroulé, le panneau, les paris et la voix
 * vivent dans `noyau.js`. Ce fichier-ci : le script, les contrôles, le bilan.
 *
 * RÈGLE — aucune séquence n'est tapée à la main : tout est CALCULÉ à partir de
 * la vraie séquence codante du gène HBB et de la table du code (voir
 * `expression-genetique-code.js`).
 *
 * FAITS ET SOURCES — [V] vérifié sur la source · [S] source secondaire
 * (cours, manuel) · [L] légende (aucune retenue).
 *  1. [V] Séquence codante HBB, 444 nt, ATG…TAA ; protéine 147 aa avec la Met.
 *     https://www.ncbi.nlm.nih.gov/nuccore/NM_000518.5 ·
 *     https://www.ncbi.nlm.nih.gov/protein/NP_000509.1
 *  2. [V] Méthionine initiale retirée (chaîne mûre 2..147 = 146 aa) ; HbS =
 *     E→V au résidu 7 (6 en numérotation classique) ; HbC = E→K au même site.
 *     https://www.uniprot.org/uniprotkb/P68871/entry
 *  3. [V] HBB sur le chromosome 11 (11p15.4). https://www.ncbi.nlm.nih.gov/gene/3043
 *  4. [V] Code génétique standard : 64 codons, AUG = Met (départ), UAA UAG UGA
 *     = stop. https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi#SG1
 *  5. [V] Pauling, Itano, Singer, Wells, Science, 25 nov. 1949 : l'hémoglobine
 *     des malades migre autrement en électrophorèse (on ne dit pas dans quel
 *     sens : seulement « autrement »).
 *     https://en.wikipedia.org/wiki/Sickle_Cell_Anemia,_a_Molecular_Disease
 *  6. [V] Ingram, Nature 1956 (178:792) puis 1957 (180:326, 17 août) : un seul
 *     acide aminé diffère, valine à la place d'acide glutamique ; « première
 *     fois » qu'on montre qu'un seul échange d'acide aminé cause une maladie.
 *     https://pubmed.ncbi.nlm.nih.gov/13464827/ ·
 *     https://en.wikipedia.org/wiki/Vernon_Ingram
 *  7. [V] Drépanocytose : sans oxygène, l'HbS polymérise en longues fibres ;
 *     hématies en faucille, capillaires bloqués, anémie hémolytique ;
 *     transmission autosomique récessive.
 *     https://fr.wikipedia.org/wiki/Dr%C3%A9panocytose ·
 *     https://en.wikipedia.org/wiki/Sickle_cell_disease
 *  8. [V] Érythropoïèse dans la moelle rouge ; l'hémoglobine est fabriquée par
 *     les précurseurs nucléés, qui expulsent ensuite leur noyau (le globule
 *     rouge adulte n'a plus de noyau).
 *     https://en.wikipedia.org/wiki/Erythropoiesis
 *  9. [V] L'ARN polymérase ouvre l'ADN, lit le brin transcrit de 3′ vers 5′ et
 *     construit l'ARN de 5′ vers 3′ ; l'ARN a la séquence du brin codant, U
 *     pour T. https://en.wikipedia.org/wiki/Transcription_(biology)
 * 10. [S] Vocabulaire et attendus du programme marocain : brin transcrit, ARN
 *     polymérase, U devant A, code universel et redondant, codons stop « dits
 *     non-sens », AUG initial, méthionine initiale détachée, phénotype aux
 *     échelles moléculaire / cellulaire / macroscopique (drépanocytose).
 *     Cours SVT 2ᵉ Bac Sc. Ex., M. El Boukhari :
 *     https://moutamadris.ma/wp-content/uploads/2020/03/cours-svt-2bac-sp-international-fr-2-7.pdf
 * 11. [V] Nirenberg et Matthaei, NIH, mai 1961 (essai clé le 27 mai) : un ARN
 *     poly-U fait fabriquer de la polyphénylalanine à un extrait acellulaire
 *     de bactéries ; Moscou, Congrès international de biochimie, août 1961 :
 *     d'abord devant un petit auditoire, puis, à l'instigation de Crick,
 *     devant tout le congrès ; tous les codons des acides aminés déchiffrés en
 *     1966 (Nobel 1968 avec Holley et Khorana).
 *     https://en.wikipedia.org/wiki/Nirenberg_and_Matthaei_experiment ·
 *     Caskey & Leder, PNAS 2014 : https://pmc.ncbi.nlm.nih.gov/articles/PMC4000803
 *     (Un inventaire NLM date le congrès d'octobre ; les autres sources
 *     disent août — on garde août.)
 * 12. [V] Allison, BMJ, 6 févr. 1954 : le trait drépanocytaire protège du
 *     paludisme. https://pubmed.ncbi.nlm.nih.gov/13115700/
 * 13. [V] Maroc : codon 39 (C→T) et FSC 6 (−A) parmi les six mutations
 *     majeures de β-thalassémie (75,7 % des chromosomes étudiés) ; « problème
 *     de santé majeur au Maroc » ; utile au dépistage des porteurs.
 *     Lemsaddek et al., Hemoglobin 2004 : https://pubmed.ncbi.nlm.nih.gov/15008262/ ·
 *     Agouti et al., Genet Test 2008 : https://pubmed.ncbi.nlm.nih.gov/18976160/ ·
 *     Belmokhtar et al., Mol Genet Genomic Med 2022 : https://pubmed.ncbi.nlm.nih.gov/35615994/
 * 14. [S] Poids au bac : génétique 45–50 % ; exercice « maladie héréditaire /
 *     expression » dans la plupart des sujets récents.
 *     docs/refonte/01-programme-bac-maroc.md §3.6
 * Ajouts de la 2ᵉ version (les prérequis et les fiches de mots) :
 * 15. [S] (connaissances de manuel, à recouper sur source avant diffusion) L'hémoglobine adulte (HbA) = 2 chaînes α + 2 chaînes β, chacune avec
 *     un hème qui fixe une molécule d'O₂ ; les 20 acides aminés standard, leur
 *     abréviation à trois lettres ; une cellule humaine = 46 chromosomes ; un
 *     chromosome = une molécule d'ADN ; le noyau a une enveloppe percée de
 *     pores ; les extrémités 5′ et 3′ d'un brin sont les carbones 5′ et 3′ du
 *     désoxyribose ; le ribosome = protéines + ARN ; l'ARNt porte un acide
 *     aminé d'un côté, un anticodon de l'autre.
 *     https://en.wikipedia.org/wiki/Hemoglobin · https://en.wikipedia.org/wiki/Transfer_RNA
 * ÉCARTÉS faute de source vérifiée : l'étymologie grecque de « drépanocytose »,
 * « 15 000 nouveaux cas par an au Maroc », le taux de porteurs OMS cité de
 * seconde main, le nombre exact de personnes dans la salle de Moscou, la
 * formule du « dogme central » (son sens exact chez Crick n'est pas
 * « ADN → ARN → protéine » : on ne la cite pas plutôt que de la déformer),
 * le sens exact de la migration de Pauling (on dit « autrement »), le nombre
 * de molécules d'hémoglobine par globule, le nombre de gènes.
 */
import {monterLecon} from "./noyau";
import {CDS,CODE,AA3,NOM,B4,N_SENS,nCodons,toARN,compl,anticodon,aaDe,groupe,traduire,chaine,NORMAL,L_MURE,
  analyser,ORD,C6,HBS,SIL,FS6,NS6,A_HBS,A_SIL,A_FS6,A_NS6,BK,BN,B39,A_B,BAC_N,BAC_M,TR_COD,TR_TPL,TR_ARN,TL_ARN,NB,FIN} from "./expression-genetique-code";
import {mots} from "./expression-genetique-mots";
import {scenesA} from "./expression-genetique-scenes-a";
import {scenesB,W0,WN,verdict as verdictDe} from "./expression-genetique-scenes-b";
import {scenesC} from "./expression-genetique-scenes-c";

export function monterPilote(root){
return monterLecon(root, ctx => {
const {clamp,ty,S,scenes,hooks,juste,rep}=ctx;
const $=ctx.$;

/* Dans le panneau, deux choses ne se coupent pas : « β-thalassémie » (au trait d'union), et un mot à fiche
   avec ce qui le touche (« l’[[anticodon]]. ») — sans cela, une virgule ou une apostrophe se retrouve seule
   au bord de la ligne, à côté du bouton. */
const nw=h=>typeof h==='string'
  ?h.replace(/([^\s>\]]{1,2})?(\[\[[^\]]+\]\])([,.;:)’]| [?!;:»])?/g,(m,a,c,z)=>(a||z)?`<span class="eg-nw">${a||''}${c}${z||''}</span>`:m)
    .replace(/β-thalassémie/g,'<span class="eg-nw">β-thalassémie</span>')
  :h;
const nwL=v=>Array.isArray(v)?v.map(x=>typeof x==='string'?nw(x):x&&x.t!=null?{...x,t:nw(x.t)}:x):nw(v);

/* ---------- les questions du quiz final (calculées) ---------- */
const Q1C=CDS.slice(24,33),Q1T=compl(Q1C);
const Q2C=CDS.slice(0,15),Q2K=6,Q2D=Q2C.slice(0,Q2K)+Q2C.slice(Q2K+1);
const tq=s=>{const r=traduire(s);return chaine(r.aa)+(r.stop!==-1?', puis stop':'');};
const Q2_OK=tq(Q2D),Q2_MOINS=chaine(traduire(Q2C).aa.filter((_,i)=>i!==2)),Q2_PAREIL=chaine(traduire(Q2C).aa);
const QUIZ=[
  {big:`3′-${groupe(Q1T)}-5′`,sub:'fragment du brin transcrit',r1:'complémentaire du brin transcrit, avec U :',r2:`5′-${groupe(toARN(Q1C))}-3′`},
  {big:groupe(toARN(Q2C)),sub:`on supprime le ${toARN(Q2C)[Q2K]} du 3ᵉ codon`,r1:`nouveau découpage : ${groupe(toARN(Q2D))}`,r2:Q2_OK},
  {big:`${A_HBS.cN} → ${A_HBS.cM}`,sub:'chez une personne drépanocytaire, qu’est-ce qui a changé ?',r1:'même gène, autre allèle : βA → βS',r2:`même code partout : ${toARN(A_HBS.cM)} = ${AA3[A_HBS.aM]}`}
];

scenesA(ctx);
scenesB(ctx);
scenesC(ctx,QUIZ);

/* ---------- ce que le script calcule ---------- */
const G6=A_HBS.cN,G6S=A_HBS.cM,G6A=A_SIL.cM;                       // GAG, GTG, GAA
const AUG=TL_ARN.slice(0,3),UAC=anticodon(AUG);
const GUG=toARN(G6S),CAC=anticodon(GUG);
const V1=CDS.slice(3,9);                                            // GTGCAT : brin non transcrit du vérifie de la transcription
const NLEU=nCodons('L'),MOT_NB={2:'Deux',3:'Trois',4:'Quatre',5:'Cinq',6:'Six'};
const BET=t=>({opts:t.map(([x,fb])=>({t:x,fb}))});
const VF=t=>({opts:t.map(([x,ok,fb])=>({t:x,ok,fb}))});
const NOTE_PARI='Pari noté. Pour trancher, il faut comprendre comment une suite de lettres devient une protéine : c’est le chemin de cette séance. Tu vérifieras toi-même, dans l’atelier.';

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Le messager',court:'Message'},
  {name:'La transcription',court:'Transcription'},{name:'Le code',court:'Code'},{name:'La traduction',court:'Traduction'},
  {name:'La mutation',court:'Mutation'},{name:'De la lettre à la maladie',court:'Maladie'},{name:'Au bac',court:'Bac'}];
const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'proteine',beat:0,scene:'prot',set:{ch:1,beads:0,kinds:0,fold:0,hb:0},seq:[{p:{beads:16},d:3400,w:300},{p:{kinds:1},d:2600,w:300},{p:{fold:1},d:2400,w:300}],
  text:['Avant l’énigme, quatre choses à savoir. La première : ce qu’est une [[proteine|protéine]].',
    {t:'C’est une chaîne, comme un collier de perles.',a:0},
    {t:'Chaque perle est un [[acide-amine|acide aminé]]. Il en existe 20 sortes, chacune avec son nom : méthionine, valine…',a:1},
    {t:'La chaîne se replie sur elle-même : c’est sa forme qui lui permet de travailler.',a:2,fort:true}]},
{cle:'hemoglobine',beat:0,scene:'prot',set:{ch:0,hb:1,rb:0,mol:0,o2:0,bx:0},seq:[{p:{rb:1},d:1200,w:300},{p:{mol:4,o2:4},d:3200,w:400},{p:{bx:1},d:900,w:400}],
  text:['La deuxième : l’[[hemoglobine|hémoglobine]], une protéine célèbre.',
    {t:'Elle remplit les [[globule|globules rouges]], les cellules du sang qui transportent l’oxygène.',a:0},
    {t:'Elle est faite de 4 chaînes : 2 chaînes α et 2 [[chaine|chaînes β]]. Chacune retient une molécule d’oxygène.',a:1},
    {t:'Dans cette leçon, tout va tourner autour de la chaîne β.',a:2,fort:true}]},
{cle:'chromosome',beat:0,scene:'zoom',set:{z:0,gv:0,gn:0,hl:0},seq:[{p:{z:2},d:2400,w:300},{p:{z:3},d:1600,w:900},{p:{z:4},d:1600,w:900}],
  text:['La troisième : où sont rangées les instructions pour fabriquer ces chaînes ? Zoomons dans la cellule.',
    {t:'Dans le [[noyau]] de chaque cellule, il y a des [[chromosome|chromosomes]].',a:0},
    {t:'Un chromosome est une seule molécule d’[[adn|ADN]], très longue, enroulée sur elle-même.',a:1},
    {t:'L’ADN est une double hélice, écrite avec quatre lettres : A, T, G, C.',a:2}]},
{cle:'gene',beat:0,scene:'zoom',set:{gv:1,gn:0,hl:0},seq:[{p:{gn:2},d:2800,w:300},{p:{gn:3},d:2400,w:500},{p:{hl:1},d:1000,w:400}],
  text:['La quatrième : le [[gene|gène]]. Un chromosome en porte beaucoup : ce sont des segments de son ADN.',
    {t:'Chacun est la recette d’une seule chaîne de protéine.',a:1,fort:true},
    {t:'Celui de la chaîne β de l’hémoglobine s’appelle HBB. Il est sur le chromosome 11.',a:2}]},
{cle:'v-prereq',beat:0,scene:'zoom',
  text:['Vérifions que ces quatre idées sont claires.','Quelle phrase est exacte ?'],
  verifie:VF([
    ['Une protéine est une chaîne de lettres A, T, G, C',false,'Les lettres A, T, G, C écrivent l’ADN. Une protéine est une chaîne d’acides aminés, de 20 sortes.'],
    ['Un chromosome contient des gènes ; chacun est la recette d’une chaîne de protéine',true,'Oui. Le chromosome est une longue molécule d’ADN ; un gène en est un segment, la recette d’une chaîne d’acides aminés.'],
    ['L’hémoglobine est un gène des globules rouges',false,'L’hémoglobine est une protéine, faite de 4 chaînes. Un gène, lui, est un segment d’ADN : celui de la chaîne β s’appelle HBB.']])},

/* ===== 1. l'énigme ===== */
{cle:'drep',beat:1,scene:'drep',tag:'L’énigme',set:{cell:1,morph:0,gl:0,gel:0,chainV:0,chain:0,six:0,grid:0},seq:[{p:{morph:1},d:2600,w:1500},{p:{},d:10,w:300}],
  text:['Place à l’énigme : un globule rouge pas comme les autres.',
    'Normalement, c’est un disque souple, qui se plie pour passer dans les plus fins vaisseaux.',
    {t:'Chez certains malades, il se déforme en faucille quand l’oxygène manque : c’est la [[drepanocytose|drépanocytose]].',a:0},
    {t:'Rigide, il bouche les petits vaisseaux (douleurs) et il est détruit trop vite ([[anemie|anémie]]).',a:1}]},
{cle:'pauling',beat:1,scene:'drep',tag:'1949 · Pauling',set:{cell:0,gl:1,gel:0},seq:[{p:{gel:1},d:3400,w:1000},{p:{},d:10,w:300}],
  text:['Pourquoi ce globule se déforme-t-il ? En 1949, le chimiste Linus Pauling cherche du côté de l’hémoglobine.',
    {t:'Avec ses collègues, il la fait avancer dans un champ électrique : c’est une [[electrophorese|électrophorèse]].',a:0},
    {t:'Celle des malades n’avance pas comme la normale : c’est une autre molécule.',a:1,fort:true}]},
{cle:'ingram',beat:1,scene:'drep',tag:'1957 · Ingram',set:{gl:0,chainV:1,chain:0,six:0},seq:[{p:{chain:1},d:2400,w:600},{p:{six:1},d:900,w:500}],
  text:['Pauling a vu qu’une différence existe, pas laquelle. En 1957, Vernon Ingram la cherche, maillon par maillon.',
    {t:`La chaîne β compte ${L_MURE} acides aminés.`,a:0},
    {t:`Un seul est différent : le n° 6. Chez les malades, une ${NOM[A_HBS.aM]} remplace un ${NOM[A_HBS.aN]}.`,a:1,fort:true},
    {t:'C’est la première fois qu’on montre qu’un seul acide aminé peut causer une maladie.',a:1}]},
{cle:'gene-chr',beat:1,scene:'drep',set:{chainV:0,chain:0,six:0,grid:0},seq:[{p:{grid:1},d:3000,w:400}],
  text:['Cette chaîne est écrite dans le gène HBB, celui que tu viens de rencontrer.',
    {t:`La partie qui la code compte ${CDS.length} lettres : A, T, G, C.`,a:0},
    'Un acide aminé a changé. Combien de lettres du gène ont dû changer ?'],
  pari:BET([['Une seule lettre',NOTE_PARI],['Quelques lettres',NOTE_PARI],['Des dizaines de lettres',NOTE_PARI]])},
{cle:'v-enigme',beat:1,scene:'drep',
  text:['Que sais-tu de l’énigme ?','Qu’a découvert Ingram, en 1957 ?'],
  verifie:{...VF([
    ['Un seul des 146 acides aminés de la chaîne β est différent',true,'Oui : une valine à la place d’un acide glutamique, au n° 6. Tout le reste de la chaîne est identique.'],
    ['La chaîne β des malades est beaucoup plus courte',false,'Non : elle compte toujours 146 acides aminés. Un seul est différent.'],
    ['Les malades n’ont pas d’hémoglobine',false,'Ils en ont, mais une version légèrement différente : c’est ce que montrait l’électrophorèse de Pauling.']]),reveal:[{p:{grid:0,chainV:1,chain:1,six:1},d:1400}]}},

/* ===== 2. le messager ===== */
{cle:'noyau',beat:2,scene:'cell',set:{on:0,cyto:0,ribo:0,q:0,msg:0,names:0},seq:[{p:{on:1},d:1300,w:200}],
  text:['Un seul acide aminé a changé. Pour comprendre comment, suivons la fabrication de la chaîne, du gène à la protéine.',
    {t:'Voici un futur globule rouge, dans la moelle des os. Il a encore son noyau.',a:0},
    {t:'Le [[noyau]] contient l’ADN, donc les gènes.',a:0},
    {t:'L’ADN ne quitte jamais le noyau.',a:0,fort:true}]},
{cle:'cytoplasme',beat:2,scene:'cell',seq:[{p:{cyto:1},d:1100,w:300},{p:{ribo:1},d:1500,w:400},{p:{q:1},d:700,w:500}],
  text:['Tout autour du noyau, il y a le [[cytoplasme]] : l’intérieur de la cellule.',
    {t:'Dedans, des [[ribosome|ribosomes]] : de petites machines qui fabriquent les protéines.',a:1},
    {t:'Le gène est dans le noyau, les machines sont dehors. Comment le message passe-t-il ?',a:2,fort:true}]},
{cle:'messager',beat:2,scene:'cell',set:{q:1},
  text:['L’ADN reste dans le noyau ; les ribosomes travaillent dehors.','Comment l’information du gène arrive-t-elle jusqu’à eux ?'],
  pari:{label:'Ton pari',reveal:[{p:{q:0,msg:1},d:2400}],opts:[
    {t:'L’ADN sort du noyau, le temps de la lecture',fb:'Non : l’ADN ne quitte pas le noyau. Regarde : c’est une copie du gène qui sort.'},
    {t:'Une copie du gène sort du noyau',ok:true,fb:'Oui. Une copie d’un seul gène, faite d’[[arn|ARN]], sort par un pore du noyau et rejoint les ribosomes : c’est l’[[arnm|ARN messager]] (ARNm).'},
    {t:'Les ribosomes entrent dans le noyau',fb:'Non : les ribosomes restent dans le cytoplasme. Regarde : c’est une copie du gène qui vient à eux.'}]}},
{cle:'deux-etapes',beat:2,scene:'cell',set:{q:0,msg:1},seq:[{p:{names:1},d:1300,w:300},{p:{names:2},d:1300,w:500}],
  text:['Le chemin a donc deux étapes, et le bac attend ces deux mots exacts.',
    {t:'Dans le noyau, la [[transcription]] copie le gène en ARN messager.',a:0},
    {t:'Dans le cytoplasme, la [[traduction]] change ce message en protéine.',a:1}]},
{cle:'v-messager',beat:2,scene:'cell',
  text:['Une question pour vérifier les deux étapes.','Quelle étape se passe dans le cytoplasme, sur les ribosomes ?'],
  verifie:VF([
    ['La transcription : l’ADN devient un ARNm',false,'La transcription a lieu dans le noyau, là où se trouve l’ADN.'],
    ['Aucune : tout se passe dans le noyau',false,'Dans le noyau, seule la transcription a lieu. La protéine est fabriquée dehors, sur les ribosomes.'],
    ['La traduction : l’ARNm devient une protéine',true,'Oui. L’ARNm sort du noyau, et les ribosomes le traduisent en protéine, dans le cytoplasme.']])},

/* ===== 3. la transcription ===== */
{cle:'bases',beat:3,scene:'bases',set:{n:0,pr:0,u:0},seq:[{p:{n:4},d:2600,w:300},{p:{pr:2},d:1900,w:400},{p:{u:1},d:1200,w:400}],
  text:['Première étape : la transcription. Pour la comprendre, regardons d’abord les lettres de l’ADN.',
    {t:'Ce sont des [[base|bases]] : l’adénine (A), la thymine (T), la guanine (G) et la cytosine (C).',a:0},
    {t:'Elles vont toujours par paires : A avec T, G avec C.',a:1,fort:true},
    {t:'L’[[arn|ARN]], lui, n’a pas de T : il a de l’uracile (U) à la place.',a:2}]},
{cle:'double-brin',beat:3,scene:'trans',set:{dna:1,dn:0,open:0,tpl:0,ez:0,n:0,fo:0,cmp:0,lv:0,rules:0,dir:0,a1:0,a2:0,a3:0,rd:0},seq:[{p:{dn:21},d:2800,w:200}],
  text:[`Voici le tout début du gène : ${TR_COD.length} paires de bases.`,
    {t:'Une molécule d’ADN est faite de deux [[brin|brins]], enroulés l’un autour de l’autre.',a:0},
    {t:'Chaque base d’un brin est reliée à sa partenaire, sur l’autre brin : les deux brins sont [[complementaire|complémentaires]].',a:0}]},
{cle:'sens',beat:3,scene:'trans',seq:[{p:{dir:1},d:1500,w:200}],
  text:['Un brin n’est pas symétrique : ses deux bouts sont différents. On les appelle [[sens|5′ et 3′]].',
    {t:'Un brin a donc un sens, comme une flèche qui va de 5′ vers 3′.',a:0},
    {t:'Dans la double hélice, les deux brins sont en sens inverse : l’un va vers la droite, l’autre vers la gauche.',a:0,fort:true}]},
{cle:'polymerase',beat:3,scene:'trans',set:{dir:0},seq:[{p:{open:1},d:2300,w:400},{p:{a1:1},d:600,w:100}],
  text:['Pour copier le gène, une [[enzyme]] se met au travail : l’[[polymerase|ARN polymérase]].',
    {t:'Premier geste : elle ouvre les deux brins, le temps de la copie.',a:0},
    {t:'Elle ne coupe rien : le gène reste intact.',a:1}]},
{cle:'modele',beat:3,scene:'trans',seq:[{p:{tpl:1,a2:1,ez:1},d:1100,w:300}],
  text:['Deuxième geste : elle lit. Mais un seul des deux brins sert de modèle : le [[brin-transcrit|brin transcrit]], en bas.',
    {t:'L’autre brin, le brin non transcrit, ne sera pas lu.',a:0},
    {t:'C’est donc sur le brin transcrit que l’enzyme va lire, lettre par lettre.',a:0}]},
{cle:'pari-u',beat:3,scene:'trans',set:{n:0,fo:0},seq:[{p:{n:1,a3:1},d:900,w:300},{p:{fo:1},d:500,w:200}],
  text:['Troisième geste : elle assemble l’ARN, lettre par lettre, en plaçant en face de chaque base sa partenaire.',
    {t:`En face du ${TR_TPL[0]}, elle a placé un ${TR_ARN[0]}.`,a:0},
    {t:`Le brin transcrit porte ensuite un ${TR_TPL[1]}. Que place-t-elle en face ?`,a:1}],
  pari:{label:'Ton pari',reveal:[{p:{n:3,fo:0},d:1400}],opts:[
    {t:'T, comme dans l’ADN',fb:'L’ARN n’a pas de T : à sa place, il a U (l’uracile). En face d’un A de l’ADN, l’ARN met toujours un U.'},
    {t:'U',ok:true,fb:'Oui. L’ARN n’a pas de T, il a U (l’uracile). En face de A, c’est U.'},
    {t:'A, la même lettre',fb:'Une copie se fait par complémentarité, pas à l’identique : en face de A, il faut son partenaire. Dans l’ARN, le partenaire de A est U.'}]}},
{cle:'copie',beat:3,scene:'trans',set:{n:3,fo:0,a1:0,a2:0,a3:0,rd:0},seq:[{p:{n:12,rd:1},d:2600,w:300},{p:{n:21,rd:2},d:2400,w:300}],
  text:['Lettre par lettre, l’ARNm s’allonge.',
    {t:'L’enzyme lit le brin transcrit de 3′ vers 5′…',a:0},
    {t:'… et construit l’ARNm de 5′ vers 3′.',a:1,fort:true},
    {t:'Repère les U : chacun est en face d’un A.',a:1}]},
{cle:'pari-brin',beat:3,scene:'trans',set:{rd:0},
  text:['L’ARNm est terminé. Compare-le aux deux brins d’ADN.','Sa suite de lettres est la même que celle…'],
  pari:{label:'Ton pari',reveal:[{p:{cmp:1},d:2000}],opts:[
    {t:'du brin transcrit',fb:'C’est le piège le plus courant. L’ARNm est complémentaire du brin transcrit : il a donc les lettres de l’autre brin, le non transcrit, avec U à la place de T. Regarde.'},
    {t:'du brin non transcrit, avec U à la place de T',ok:true,fb:'Exactement : complémentaire du brin transcrit, donc identique au brin non transcrit, U à la place de T. Au bac, c’est le premier réflexe.'},
    {t:'d’aucun des deux',fb:'Regarde : il est identique au brin non transcrit, à un détail près — U à la place de T.'}]}},
{cle:'depart',beat:3,scene:'trans',seq:[{p:{lv:1},d:1800,w:300}],
  text:['Copie terminée : l’ARNm se détache de l’enzyme.',
    {t:'Il quitte le noyau, avec le message du gène.',a:0},
    {t:'Le gène, lui, reste intact dans le noyau, prêt à être copié de nouveau.',a:0}]},
{cle:'regle',beat:3,scene:'trans',
  text:['Au bac, on ne dessine pas tout : on applique une règle.','Voici d’où elle vient, une ligne à la fois.'],
  deriv:[
    {tex:'\\text{ARNm} \\;=\\; c(T)',alt:'ARNm = c(T)',r:'Notons T le brin transcrit et c( ) « le complémentaire ». L’ARNm copie T : en face de chaque base, sa partenaire.',p:{rules:1},d:2400},
    {tex:'T \\;=\\; c(N)',alt:'T = c(N)',r:'Notons N le brin non transcrit : les deux brins de l’ADN sont complémentaires.'},
    {tex:'\\text{ARNm} \\;=\\; c\\big(c(N)\\big)',alt:'ARNm = c(c(N))',r:'On remplace T par c(N), d’après la ligne précédente.'},
    {tex:'\\text{ARNm} \\;=\\; N \\quad (\\text{U pour T})',alt:'ARNm = N (U pour T)',r:'Deux compléments ramènent aux lettres de départ. Seule différence : U remplace T.'},
    {tex:`\\mathtt{${TR_COD.slice(0,3)}} \\to \\mathtt{${TR_TPL.slice(0,3)}} \\to \\mathtt{${TR_ARN.slice(0,3)}}`,alt:`${TR_COD.slice(0,3)} → ${TR_TPL.slice(0,3)} → ${TR_ARN.slice(0,3)}`,r:`Sur le début du gène : N = ${TR_COD.slice(0,3)}, T = ${TR_TPL.slice(0,3)}, ARNm = ${TR_ARN.slice(0,3)}.`}]},
{cle:'v-transcription',beat:3,scene:'trans',
  text:[`Voici un fragment du brin non transcrit : <span class="eg-nw">5′-${groupe(V1)}-3′</span>.`,'Quel est l’ARNm correspondant ?'],
  verifie:VF([
    [`5′-${groupe(toARN(compl(V1)))}-3′`,false,'Tu as pris le complémentaire du brin donné. Mais ce brin est déjà le brin non transcrit : l’ARNm a ses lettres, avec U à la place de T.'],
    [`5′-${groupe(toARN(V1))}-3′`,true,'Oui : l’ARNm a les lettres du brin non transcrit, avec U à la place de T.'],
    [`5′-${groupe(V1)}-3′`,false,'Les bonnes lettres, mais avec des T : un ARN n’a jamais de T, il a U à la place.']])},

/* ===== 4. le code ===== */
{cle:'alphabet',beat:4,scene:'code',set:{need:1,tri:0,fill:0,pu:0,pf:0,tab:0,sel:'···',hi:''},
  text:['Le message est copié, il faut maintenant le lire.',
    'L’ARNm n’a que 4 lettres : A, U, G, C. Les protéines sont faites de 20 acides aminés.',
    'Combien de lettres faut-il, au minimum, pour désigner chacun ?'],
  pari:{label:'Ton pari',reveal:[{p:{tri:3},d:2400},{p:{fill:1},d:900}],opts:[
    {t:'1 lettre',fb:'Avec 1 lettre, seulement 4 mots. Il en faut 20. Regarde.'},
    {t:'2 lettres',fb:'Avec 2 lettres : 4 × 4 = 16 mots, encore trop peu pour 20. Regarde.'},
    {t:'3 lettres',ok:true,fb:'Oui : 4 × 4 × 4 = 64 mots, assez pour 20 — et même trop. Ce mot de trois lettres s’appelle un [[codon]].'}]}},
{cle:'nirenberg',beat:4,scene:'code',tag:'Mai 1961',set:{need:0,tri:0,fill:0},seq:[{p:{pu:1},d:1200,w:300}],
  text:['Reste à savoir quel codon désigne quel acide aminé : en 1961, personne ne le sait.',
    {t:'Marshall Nirenberg et Heinrich Matthaei fabriquent un ARN d’une seule lettre : UUUUUU…',a:0},
    {t:'Ils le donnent à un extrait de bactéries. Que fabrique-t-il ?',a:0}],
  pari:{label:'Ton pari',reveal:[{p:{pf:1},d:1800}],opts:[
    {t:'Rien : ce n’est pas un vrai gène',fb:`Il a pourtant fabriqué de la ${NOM[CODE.UUU]}. UUU signifie donc ${AA3[CODE.UUU]} : le premier mot du code est lu.`},
    {t:'Une chaîne d’un seul acide aminé, répété',ok:true,fb:`Oui : de la ${NOM[CODE.UUU]}, ${AA3[CODE.UUU]} – ${AA3[CODE.UUU]} – ${AA3[CODE.UUU]}… UUU signifie donc ${AA3[CODE.UUU]}. Le premier mot du code est lu, le 27 mai 1961.`},
    {t:'Une protéine au hasard',fb:`Pas au hasard : de la ${NOM[CODE.UUU]}. UUU signifie donc ${AA3[CODE.UUU]} : le premier mot du code est lu.`}]}},
{cle:'moscou',beat:4,scene:'code',tag:'Août 1961 · Moscou',set:{pu:0,pf:0},seq:[{p:{tab:1},d:1500,w:400}],
  text:['À Moscou, en août 1961, Nirenberg présente son résultat devant une petite salle.',
    'Francis Crick l’apprend et le fait reparler devant tout le congrès.',
    {t:'La course est lancée : en 1966, tous les codons sont déchiffrés. Voici le [[code|code génétique]], le même chez tous les êtres vivants.',a:0}]},
{cle:'lire-table',beat:4,scene:'code',set:{sel:'···',hi:''},seq:[{p:{sel:GUG[0]+'··'},d:10,w:800},{p:{sel:GUG[0]+GUG[1]+'·'},d:10,w:1700},{p:{sel:GUG},d:10,w:1700}],
  text:[`Le tableau se lit en trois temps. Exemple : le codon ${GUG}.`,
    {t:`1ʳᵉ lettre : la grande ligne. Ici ${GUG[0]}.`,a:0},
    {t:`2ᵉ lettre : la colonne. Ici ${GUG[1]}.`,a:1},
    {t:`3ᵉ lettre : la petite ligne, dans la case. Ici ${GUG[2]} : on lit ${AA3[CODE[GUG]]}, la ${NOM[CODE[GUG]]}.`,a:2,fort:true}]},
{cle:'table',beat:4,scene:'code',set:{sel:'···'},ctl:'table',
  text:['À toi de lire le tableau : compose un codon avec les boutons, ou clique dans le tableau.',
    `Défi : ${toARN(G6)}, puis ${toARN(G6S)}, puis un codon stop.`]},
{cle:'depart-stop',beat:4,scene:'code',set:{sel:'···',hi:''},seq:[{p:{hi:'M'},d:600,w:400},{p:{hi:'*'},d:600,w:1700},{p:{hi:'L'},d:600,w:1700}],
  text:['Trois repères à connaître dans ce tableau.',
    {t:`${AUG} est le codon de départ : toute lecture commence par lui. Il désigne la [[methionine|méthionine]].`,a:0},
    {t:'UAA, UAG et UGA sont des [[codon-stop|codons stop]] : aucun acide aminé, la lecture s’arrête.',a:1},
    {t:`Les ${N_SENS} autres codons se partagent les 20 acides aminés : le code est [[redondant]]. ${MOT_NB[NLEU]||NLEU} codons, par exemple, désignent la leucine.`,a:2}]},
{cle:'v-code',beat:4,scene:'code',set:{hi:''},
  text:['Une question sur le code.',`${toARN(G6A)} et ${toARN(G6)} désignent tous les deux l’${NOM[CODE[toARN(G6)]]}. Qu’est-ce que cela montre ?`],
  verifie:{...VF([
    ['Le code est redondant : plusieurs codons pour un même acide aminé',true,`Oui. ${N_SENS} codons pour 20 acides aminés : plusieurs codons désignent le même. Ici, ${toARN(G6A)} et ${toARN(G6)} désignent tous deux l’${NOM[CODE[toARN(G6)]]}.`],
    ['Un codon peut désigner deux acides aminés',false,'C’est l’inverse : un codon désigne toujours un seul acide aminé (ou un arrêt). Ce sont plusieurs codons qui peuvent désigner le même acide aminé.'],
    ['Une des deux lignes du tableau est fausse',false,'Les deux sont exactes : le code est redondant. Plusieurs codons peuvent désigner le même acide aminé.']]),reveal:[{p:{hi:CODE[toARN(G6)]},d:500}]}},

/* ===== 5. la traduction ===== */
{cle:'ribosome',beat:5,scene:'transl',set:{on:1,rib:0,k:0,end:0,met:0,lab:0,hold:1},seq:[{p:{rib:1},d:1900,w:300}],
  text:['Le code est déchiffré. Reste à l’utiliser : c’est la traduction, dans le cytoplasme.',
    {t:`Un [[ribosome]] se fixe sur l’ARNm, au codon ${AUG} : une lecture commence toujours là.`,a:0},
    {t:'Mais le ribosome ne reconnaît pas les acides aminés : il lui faut des interprètes.',a:0}]},
{cle:'arnt',beat:5,scene:'transl',set:{lab:0},seq:[{p:{k:1},d:1900,w:300},{p:{lab:1},d:700,w:400}],
  text:['Voici l’interprète : l’[[arnt|ARN de transfert]], ou ARNt.',
    {t:`À un bout, il porte un acide aminé : ici, la [[methionine|méthionine]].`,a:0},
    {t:'À l’autre bout, trois bases : l’[[anticodon]].',a:1},
    {t:`L’anticodon ${UAC} s’apparie avec le codon ${AUG} : c’est ce qui amène la méthionine au bon endroit.`,a:1,fort:true}]},
{cle:'anticodon',beat:5,scene:'transl',
  text:['Comment trouve-t-on l’anticodon ? Base par base, en face du codon.'],
  deriv:[
    {tex:`\\text{codon : } \\mathtt{${AUG}}`,alt:`codon : ${AUG}`,r:'Le codon lu sur l’ARNm : ici, le départ.'},
    {tex:'\\mathtt{A}\\leftrightarrow\\mathtt{U} \\qquad \\mathtt{G}\\leftrightarrow\\mathtt{C}',alt:'A ↔ U     G ↔ C',r:'Chaque base s’apparie avec sa partenaire.'},
    {tex:`\\text{anticodon : } \\mathtt{${UAC}}`,alt:`anticodon : ${UAC}`,r:'Les partenaires, base par base, en face du codon.'},
    {tex:`\\mathtt{${AUG}} \\;\\to\\; \\text{${AA3[CODE[AUG]]}}`,alt:`${AUG} → ${AA3[CODE[AUG]]}`,r:`Dans le tableau, ${AUG} désigne la méthionine.`},
    {tex:`\\text{ARNt } \\mathtt{${UAC}} \\;\\Rightarrow\\; \\text{${AA3[CODE[AUG]]}}`,alt:`ARNt ${UAC} ⇒ ${AA3[CODE[AUG]]}`,r:`L’ARNt d’anticodon ${UAC} porte donc la méthionine : c’est ce qui rend la traduction exacte.`}]},
{cle:'ribo',beat:5,scene:'transl',set:{lab:0,hold:0},ctl:'ribo',
  text:['À toi : fais avancer le ribosome, codon par codon.',
    'À chaque pas, l’ARNt dont l’anticodon s’apparie au codon apporte son acide aminé, et la chaîne s’allonge d’un maillon.',
    'Va jusqu’au 7ᵉ codon.']},
{cle:'stop-fin',beat:5,scene:'transl',set:{k:NB},seq:[{p:{end:1},d:1500,w:400}],
  text:['Le ribosome continue ainsi jusqu’au bout du message.',
    {t:`À la fin, il rencontre ${FIN.slice(9)} : aucun ARNt n’a d’anticodon pour lui.`,a:0},
    {t:'C’est un [[codon-stop|codon stop]] : le ribosome se détache et libère la chaîne.',a:0},
    {t:`La chaîne libérée compte ${NORMAL.aa.length} acides aminés.`,a:0}]},
{cle:'met',beat:5,scene:'transl',seq:[{p:{met:1},d:1700,w:400}],
  text:[`Dernière retouche : la ${NOM[NORMAL.aa[0]]} du début est détachée.`,
    {t:`La chaîne β commence donc par la ${NOM[NORMAL.aa[1]]}, et on compte ${AA3[NORMAL.aa[1]]} = 1.`,a:0},
    {t:`Voilà pourquoi l’${NOM[NORMAL.aa[6]]} d’Ingram est le n° 6… porté par le 7ᵉ codon.`,a:0,fort:true}]},
{cle:'v-traduction',beat:5,scene:'transl',
  text:['Pour vérifier le rôle de l’ARNt :',`un ARNt porte l’anticodon ${CAC}. Quel acide aminé apporte-t-il ?`],
  verifie:VF([
    [`L’histidine (${AA3[CODE[CAC]]})`,false,`${CAC}, lu dans le tableau, donnerait ${AA3[CODE[CAC]]} — mais ${CAC} est ici un anticodon, pas un codon. Il faut chercher son partenaire sur l’ARNm : ${GUG}, qui désigne ${AA3[CODE[GUG]]}.`],
    [`La méthionine (${AA3[CODE[AUG]]})`,false,`La méthionine est apportée par l’ARNt d’anticodon ${UAC}, qui s’apparie avec ${AUG}. Ici, ${CAC} s’apparie avec ${GUG} : ${AA3[CODE[GUG]]}.`],
    [`La valine (${AA3[CODE[GUG]]})`,true,`Oui. L’anticodon ${CAC} s’apparie avec le codon ${GUG}, et ${GUG} désigne la valine.`]])},

/* ===== 6. la mutation ===== */
{cle:'mutation',beat:6,scene:'atelier',set:{on:1,mut:'',sel:C6+1,prot:0,ver:0,sh:0},seq:[{p:{on:1},d:900,w:200}],
  text:['Tu sais maintenant lire un gène. Que se passe-t-il quand il change ?',
    {t:'Une [[mutation]] est un changement dans la suite des lettres de l’ADN.',a:0},
    {t:'Une version différente d’un même gène s’appelle un [[allele|allèle]].',a:0},
    {t:'Voici les codons 1 à 7 du gène de la chaîne β : l’allèle normal.',a:0}]},
{cle:'atelier',beat:6,scene:'atelier',set:{mut:'',sel:C6+1,prot:1,ver:1,sh:1},ctl:'atelier',
  text:['L’atelier : les codons 1 à 7, leur ARNm, leur chaîne.',
    'Choisis une lettre de l’ADN (clic, ou boutons ← →), puis change-la.',
    'Défi : remplace l’acide glutamique n° 6 par une valine.']},
{cle:'faux-sens',beat:6,scene:'atelier',set:{mut:'',sel:C6+1},seq:[{p:{mut:HBS},d:10,w:1100}],
  text:()=>[`Une seule lettre : le ${G6[1]} du milieu de ${G6} devient ${G6S[1]}.`,
    {t:`Sur l’ARNm, ${toARN(G6)} devient ${toARN(G6S)} — et ${toARN(G6S)}, c’est ${AA3[A_HBS.aM]}.${rep('gene-chr')==null?'':rep('gene-chr')===0?' Ton pari du début était le bon.':' Tu avais parié plus : une seule suffit.'}`,a:0},
    {t:'Changer une base pour une autre, c’est une [[substitution]]. Comme l’acide aminé change, on parle de [[faux-sens]].',a:0},
    {t:'Voici l’allèle βS, celui de la drépanocytose.',a:0,fort:true}]},
{cle:'silencieuse',beat:6,scene:'atelier',set:{mut:'',sel:C6+2},
  text:[`Autre essai, au même codon : le dernier ${G6[2]} de ${G6} devient ${G6A[2]}.`,`Sur l’ARNm, ${toARN(G6)} devient ${toARN(G6A)}. Que devient la protéine ?`],
  pari:{label:'Ton pari',reveal:[{p:{mut:SIL},d:600}],opts:[
    {t:'Rien ne change',ok:true,fb:`Oui : ${toARN(G6A)} désigne aussi l’${NOM[A_SIL.aM]}. Le code est <b>redondant</b> : plusieurs codons pour un même acide aminé. Mutation <b>[[silencieuse|silencieuse]]</b> : l’allèle change, la protéine non.`},
    {t:'Un acide aminé change',fb:`Regarde le tableau : ${toARN(G6A)} désigne ${AA3[A_SIL.aM]}, comme ${toARN(G6)}. La protéine ne change pas : mutation <b>silencieuse</b>. Le code est redondant.`},
    {t:'La chaîne s’arrête',fb:`${toARN(G6A)} n’est pas un codon stop (UAA, UAG, UGA) : il désigne ${AA3[A_SIL.aM]}, comme ${toARN(G6)}. Mutation <b>silencieuse</b> : la protéine ne change pas.`}]}},
{cle:'non-sens',beat:6,scene:'atelier',set:{mut:'',sel:C6},
  text:[`Troisième essai : au même codon, le premier ${G6[0]} de ${G6} devient ${A_NS6.cM[0]}.`,`Sur l’ARNm, ${toARN(G6)} devient ${toARN(A_NS6.cM)}. Que devient la protéine ?`],
  pari:{label:'Ton pari',reveal:[{p:{mut:NS6},d:600}],opts:[
    {t:'Un acide aminé change',fb:`${toARN(A_NS6.cM)} ne désigne aucun acide aminé : c’est un codon stop. La chaîne est coupée.`},
    {t:'Rien ne change',fb:`Ce serait vrai si ${toARN(A_NS6.cM)} désignait aussi l’${NOM[A_NS6.aN]}. Mais c’est un codon stop : la lecture s’arrête là.`},
    {t:`Elle s’arrête après ${A_NS6.len} acides aminés`,ok:true,fb:`Oui. ${toARN(A_NS6.cM)} est un codon stop : la chaîne ne compte que ${A_NS6.len} acides aminés au lieu de ${L_MURE}. C’est une mutation <b>[[non-sens|non-sens]]</b>.`}]}},
{cle:'decalage',beat:6,scene:'atelier',set:{mut:'',sel:C6+1},
  text:[`Dernier essai : on supprime une seule lettre, le ${G6[1]} de ${G6}, sans la remplacer.`,'Combien d’acides aminés vont changer ?'],
  pari:{label:'Ton pari',reveal:[{p:{mut:FS6},d:600}],opts:[
    {t:'Un seul',fb:`Plus que ça. Le ribosome lit trois par trois depuis AUG : une lettre en moins décale toute la lecture. Tous les codons suivants changent, et un codon stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`},
    {t:'Tous ceux qui suivent',ok:true,fb:`Oui. Le ribosome lit trois par trois depuis AUG : une lettre en moins décale toute la lecture — c’est un <b>[[decalage|décalage du cadre de lecture]]</b>. Un codon stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`},
    {t:'Aucun',fb:`Le code est redondant, mais pas à ce point : une lettre en moins décale toute la lecture. Tous les codons suivants changent, et un stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`}]}},
{cle:'v-mutation',beat:6,scene:'atelier',set:{mut:'',sel:C6+1},
  text:['Pour synthétiser les quatre cas :','laquelle de ces mutations change tous les acides aminés situés après elle ?'],
  verifie:{...VF([
    ['Remplacer une lettre par une autre',false,'Une substitution ne touche qu’un seul codon : tous les autres sont lus comme avant.'],
    ['Supprimer une seule lettre',true,'Oui. Le ribosome lit trois lettres par trois : une lettre en moins décale tous les codons suivants, donc tous les acides aminés suivants.'],
    [`Remplacer ${G6} par ${G6A}`,false,`C’est une substitution, silencieuse de surcroît : ${toARN(G6)} et ${toARN(G6A)} désignent le même acide aminé.`]]),reveal:[{p:{mut:FS6},d:600}]}},

/* ===== 7. de la lettre à la maladie ===== */
{cle:'echelles',beat:7,scene:'levels',set:{lv:1,m1:0,c1:0,o1:0,flow:0,map:0},seq:[{p:{m1:1},d:1800,w:500},{p:{c1:1},d:1200,w:700}],
  text:['Retour à l’énigme : comment une valine change-t-elle un globule rouge ?',
    {t:'À l’échelle <b>moléculaire</b> : sans oxygène, la valine rend l’hémoglobine S collante, et ses molécules s’assemblent en longues fibres.',a:0},
    {t:'À l’échelle <b>cellulaire</b> : ces fibres déforment le globule rouge en faucille.',a:1}]},
{cle:'organisme',beat:7,scene:'levels',seq:[{p:{o1:1},d:1300,w:300},{p:{flow:1},d:1000,w:700}],
  text:['À l’échelle de l’<b>organisme</b> : les globules en faucille bouchent les petits vaisseaux (douleurs) et sont détruits trop vite (anémie).',
    {t:'Une lettre, un acide aminé, un [[caractere|caractère]] : c’est la relation gène → protéine → caractère que le bac attend.',a:1,fort:true}]},
{cle:'maroc',beat:7,scene:'levels',tag:'Maroc',set:{lv:0},seq:[{p:{map:1},d:1500,w:300}],
  text:['Ce que ça a changé : depuis Ingram, on lit les maladies héréditaires lettre par lettre.',
    {t:'Au Maroc, la [[thalassemie|β-thalassémie]] est un problème de santé majeur, et les généticiens y ont identifié les allèles les plus fréquents.',a:0},
    {t:`Parmi eux : la délétion que tu viens de faire au codon 6, et une substitution au codon ${B39}. Les connaître permet de dépister les porteurs.`,a:0}]},
{cle:'v-chaine',beat:7,scene:'levels',set:{lv:1,map:0},
  text:['Pour conclure cette partie :','dans la drépanocytose, quel est le bon enchaînement ?'],
  verifie:VF([
    ['Allèle βS → hémoglobine S → globules en faucille',true,'Oui : le gène est traduit en protéine, et c’est la protéine qui fait le caractère. Gène → protéine → caractère.'],
    ['Globules en faucille → hémoglobine S → allèle βS',false,'C’est à l’envers : les globules ne changent pas le gène. L’allèle fabrique la protéine, et la protéine fait le caractère.'],
    ['Allèle βS → globules en faucille → hémoglobine S',false,'On ne saute pas d’étape : l’allèle βS fabrique d’abord l’hémoglobine S, et c’est elle qui déforme le globule.']])},

/* ===== 8. au bac ===== */
{cle:'bac-doc',beat:8,scene:'bac',set:{doc:0,e1:0,e2:0,e3:0},seq:[{p:{doc:1},d:1100,w:300}],
  text:['Dernière étape : le raisonnement du bac. L’exercice revient presque chaque année.',
    {t:`On donne le brin transcrit d’un allèle normal et d’un allèle muté (une [[thalassemie|β-thalassémie]], codon ${B39}). Quel est ton premier geste ?`,a:0}],
  pari:{label:'Réponds',reveal:[{p:{e1:1},d:2600}],opts:[
    {t:'Lire les codons directement sur ces brins',fb:'Le tableau du code est écrit en codons d’ARNm, et ce brin est le brin transcrit, le complémentaire. Premier geste : écrire l’ARNm. Regarde.'},
    {t:'Écrire l’ARNm, complémentaire du brin transcrit',ok:true,fb:'Oui. Le tableau se lit en codons d’ARNm : on transcrit d’abord, base par base, avec U en face de A.'},
    {t:'Chercher la maladie dans le cours',fb:'Le correcteur attend la démarche : ARNm, puis codons, puis comparaison. La maladie vient en dernier, comme conclusion. Premier geste : écrire l’ARNm.'}]}},
{cle:'bac-codons',beat:8,scene:'bac',seq:[{p:{e2:1},d:2200,w:300}],
  text:()=>{const n=traduire(BAC_N).aa,m=[];for(let c=0;c<BN;c++){const a=aaDe(BAC_M.slice(3*c,3*c+3));if(a==='*')break;m.push(a);}
    return ['Deuxième geste : découpe l’ARNm en codons, dans le bon cadre, et lis chacun dans le tableau.',
      {t:`L’allèle normal donne ${chaine(n)}.`,a:0},
      {t:`L’allèle muté donne ${chaine(m)}… puis ${toARN(A_B.cM)} : un codon stop.`,a:0}];}},
{cle:'bac-redaction',beat:8,scene:'bac',
  text:['Troisième geste : compare, nomme, relie.','Voici une rédaction qui prend tous les points, une ligne à la fois.'],
  deriv:[
    {tex:`\\mathtt{${toARN(A_B.cN)}} \\;\\to\\; \\mathtt{${toARN(A_B.cM)}}`,alt:`${toARN(A_B.cN)} → ${toARN(A_B.cM)}`,r:`Une seule base diffère : sur le brin transcrit, ${compl(A_B.cN)[0]} devient ${compl(A_B.cM)[0]} ; le codon ${B39}, ${toARN(A_B.cN)}, devient ${toARN(A_B.cM)}. C’est une mutation par <b>substitution</b>.`,p:{e3:1}},
    {tex:`\\mathtt{${toARN(A_B.cM)}} = \\text{stop} \\;\\Rightarrow\\; ${A_B.len} \\text{ au lieu de } ${L_MURE}`,alt:`${toARN(A_B.cM)} = stop ⇒ ${A_B.len} au lieu de ${L_MURE}`,r:`${toARN(A_B.cM)} est un codon stop : la chaîne s’arrête après ${A_B.len} acides aminés au lieu de ${L_MURE}. C’est une mutation <b>non-sens</b>.`},
    {tex:'\\text{chaîne } \\beta \\text{ incomplète}',alt:'chaîne β incomplète',r:'La chaîne β n’est pas fabriquée en entier : les globules rouges manquent d’hémoglobine.'},
    {tex:'\\beta\\text{-thalassémie}',alt:'β-thalassémie',r:'Voilà la maladie : c’est la <b>β-thalassémie</b>.'}]},
{cle:'q1',beat:8,scene:'quiz',set:{qi:0,rv:0},
  text:['Trois questions, comme au bac : chacune vise une erreur classique des copies.','Première : voici un fragment du brin transcrit. Quel est l’ARNm ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:`5′-${groupe(toARN(Q1T))}-3′`,fb:'Tu as recopié le brin transcrit en changeant T en U. Mais l’ARNm est son complémentaire : il a les lettres de l’autre brin.'},
    {t:`5′-${groupe(toARN(Q1C))}-3′`,ok:true,fb:'Oui : complémentaire du brin transcrit, avec U en face de A.'},
    {t:`5′-${groupe(Q1C)}-3′`,fb:'Les bonnes bases… mais avec des T. Un ARN n’a jamais de T : U à la place.'}]}},
{cle:'q2',beat:8,scene:'quiz',set:{qi:1,rv:0},
  text:['Deuxième : le cadre de lecture.','Une seule lettre disparaît de cet ARNm. Que devient la chaîne ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:Q2_MOINS,fb:'Ce serait vrai si on supprimait un codon entier, trois lettres. Une seule lettre en moins décale tout ce qui suit.'},
    {t:Q2_PAREIL,fb:'Le ribosome lit trois par trois depuis AUG, sans repère entre les codons : une lettre en moins décale tout ce qui suit.'},
    {t:Q2_OK,ok:true,fb:'Oui : une lettre en moins décale la lecture, et un codon stop apparaît aussitôt.'}]}},
{cle:'q3',beat:8,scene:'quiz',set:{qi:2,rv:0},
  text:['Dernière : gène, allèle, code.','Les trois mots que les copies mélangent.'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'L’allèle : une autre version du même gène',ok:true,fb:'Oui : même gène (HBB, chromosome 11), autre version — l’allèle βS. Le code, lui, est le même chez tous les êtres vivants.'},
    {t:'Le gène : c’est un autre gène',fb:'C’est le même gène, au même endroit du chromosome 11. Une version différente d’un gène s’appelle un allèle.'},
    {t:'Le code génétique de cette personne',fb:`Le code est universel : ${toARN(A_HBS.cM)} signifie ${AA3[A_HBS.aM]} chez tous les êtres vivants. Ce qui change, c’est le message (l’allèle), pas le dictionnaire.`}]}},
{cle:'fin',beat:8,scene:'end',seq:[{p:{n:4},d:2800,w:300}],
  text:['Fin de la séance. Voici ce que l’application retiendrait de toi.'],html:()=>profileHTML()}
];

/* « β-thalassémie » : insécable, dans tous les textes du panneau */
STEPS.forEach(st=>{
  if(typeof st.text==='function'){const f=st.text;st.text=()=>nwL(f());}else st.text=nwL(st.text);
  const P=st.pari||st.verifie;if(P)P.opts.forEach(o=>{o.fb=nw(o.fb);});
  if(st.deriv)st.deriv.forEach(x=>{if(x.r)x.r=nw(x.r);});
});

/* ---------- le profil de fin ---------- */
const PARTIES={'v-prereq':'ce qu’il faut savoir','v-enigme':'l’énigme','v-messager':'le messager','v-transcription':'la transcription','v-code':'le code','v-traduction':'la traduction','v-mutation':'la mutation','v-chaine':'de la lettre à la maladie'};
function profileHTML(){
  const Q=[['q1','lire le bon brin (U, jamais T)'],['q2','le cadre de lecture'],['q3','gène, allèle, code']];
  const res=Q.map(([k])=>juste(k));
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]}</li>`).join('');
  const weak=res.map((ok,i)=>ok===false?Q[i][1]:null).filter(Boolean);
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>juste(s.k)!=null),vok=V.filter(s=>juste(s.k)===true);
  const ratees=V.filter(s=>juste(s.k)===false).map(s=>PARTIES[s.k]).filter(Boolean);
  const bets=[];
  if(rep('gene-chr')!=null)bets.push(rep('gene-chr')===0?'« une seule lettre » deviné':'« une seule lettre » t’a surpris');
  if(juste('pari-brin')!=null)bets.push(juste('pari-brin')?'piège du brin évité':'piège du brin : tombé une fois');
  if(S.hbs)bets.push('drépanocytose trouvée sans aide');
  if(S.types&&S.types.size)bets.push(`${S.types.size} type${S.types.size>1?'s':''} de mutation produit${S.types.size>1?'s':''}`);
  const plan=[weak.length?`8 exercices courts sur ${weak.map(w=>`« ${w} »`).join(' et ')}`:'Aucune erreur au contrôle : directement le niveau bac']
    .concat(ratees.length?[`Une courte reprise de : ${ratees.join(', ')}`]:[])
    .concat(['1 exercice bac complet, corrigé pas à pas','Dans 3 jours : 4 questions de rappel']).map(x=>`<li>${x}</li>`).join('');
  return ty(`<ul class="prof">${rows}</ul>${vu.length?`<p class="small">« Vérifie » du premier coup : ${vok.length} sur ${vu.length}.</p>`:''}${bets.length?`<p class="small">Tes gestes : ${bets.join(' · ')}.</p>`:''}<div class="next"><div class="pari-k">Ta prochaine séance, générée pour toi</div><ol>${plan}</ol></div><p class="small">Aperçu : exercices pas encore branchés.</p>`);
}

/* ---------- contrôles par étape ---------- */
S.hbs=false;S.types=new Set();S.look=new Set();
// l'animation d'un pas du ribosome : le noyau n'expose pas encore son interpolateur
let tk=0;
function tweenK(sc,to,d){
  ctx.stop();const my=++tk,from=sc.p.k,t0=performance.now();
  return new Promise(res=>{const step=now=>{
    if(my!==tk||ctx.etape().cle!=='ribo')return res(false);
    const t=ctx.RM.matches?1:Math.min(1,(now-t0)/d);sc.p.k=ctx.lerp(from,to,ctx.ease(t));sc.render();hooks.frame&&hooks.frame();
    if(t<1)requestAnimationFrame(step);else res(true);};requestAnimationFrame(step);});}
const CTL={
  table:{html:()=>`<div class="ctl eg-ctl">${['1ʳᵉ lettre','2ᵉ lettre','3ᵉ lettre'].map((l,k)=>`<div class="eg-row"><span class="eg-k">${l}</span><div class="eg-grp" role="group" aria-label="${l}">${B4.split('').map(b=>`<button type="button" class="eg-btn" data-k="${k}" data-b="${b}" aria-pressed="false">${b}</button>`).join('')}</div></div>`).join('')}</div><p class="ctl-note" id="tabfb"></p>`,
    init(){const sc=scenes.code;sc.p.sel=ctx.etape().base.sel;sc.render();
      const goals=[toARN(G6),toARN(G6S),'stop'];
      const sync=()=>{const s=sc.p.sel||'···';
        root.querySelectorAll('.eg-btn[data-k]').forEach(b=>b.setAttribute('aria-pressed',String(s[+b.dataset.k]===b.dataset.b)));
        let m;const full=!s.includes('·');
        if(!full)m=`Codon : <b>${s}</b>`;
        else{const a=CODE[s];S.look.add(a==='*'?'stop':s);
          m=a==='*'?`<b>${s}</b> : aucun acide aminé. C’est un <b>codon stop</b> (on dit aussi non-sens) : la traduction s’arrête là.`
            :`<b>${s}</b> → <b>${AA3[a]}</b> (${NOM[a]}).${s===AUG?' C’est aussi le codon de départ : toute lecture commence par AUG.':''}${s===toARN(G6S)?' Retiens-le : il reviendra.':''}`;}
        m+=`<br>Défi : ${goals.map(gl=>`${S.look.has(gl)?'✓':'·'} ${gl==='stop'?'un codon stop':gl}`).join('  ')}`;
        $('#tabfb').innerHTML=ty(m);};
      root.querySelectorAll('.eg-btn[data-k]').forEach(b=>b.addEventListener('click',()=>{const s=(sc.p.sel||'···').split('');const k=+b.dataset.k;s[k]=b.dataset.b;sc.p.sel=s.join('');sc.render();sync();}));
      hooks.onCodon=sync;sync();}},
  ribo:{html:()=>`<div class="ctl eg-ctl"><div class="eg-grp"><button type="button" class="eg-btn eg-wide" id="rbm">← Recule</button><button type="button" class="eg-btn eg-wide ctl-btn" id="rbp">Avance d’un codon →</button></div></div><p class="ctl-note" id="ribofb"></p>`,
    init(){const sc=scenes.transl;
      const sync=()=>{const k=clamp(Math.round(sc.p.k),1,NB),c=TL_ARN.slice(3*(k-1),3*k),a=CODE[c];
        $('#rbm').disabled=k<=1;$('#rbp').disabled=k>=NB;
        const ch=traduire(CDS.slice(0,3*k)).aa;
        $('#ribofb').innerHTML=ty(`${ORD(k)} codon : <b>${c}</b> · anticodon de l’ARNt : <b>${anticodon(c)}</b> → <b>${AA3[a]}</b> (${NOM[a]}).<br>Chaîne : ${chaine(ch)}${k>=NB?'. Tu viens de fabriquer le début de la chaîne β.':''}`);};
      const goK=k=>{sc.p.hold=0;sc.p.lab=0;tweenK(sc,clamp(k,1,NB),700).then(ok=>{if(ok)sync();});};
      $('#rbp').addEventListener('click',()=>goK(Math.round(sc.p.k)+1));
      $('#rbm').addEventListener('click',()=>goK(Math.round(sc.p.k)-1));
      sync();}},
  atelier:{html:()=>`<div class="ctl eg-ctl">
<div class="eg-row"><button type="button" class="eg-btn" id="agl" aria-label="Lettre précédente">←</button><output id="agpos" class="eg-pos"></output><button type="button" class="eg-btn" id="agr" aria-label="Lettre suivante">→</button></div>
<div class="eg-row"><span class="eg-k">Remplacer par</span><div class="eg-grp" role="group" aria-label="Remplacer la lettre par">${'ATGC'.split('').map(b=>`<button type="button" class="eg-btn" data-sub="${b}">${b}</button>`).join('')}</div></div>
<div class="eg-row"><span class="eg-k">Insérer avant</span><div class="eg-grp" role="group" aria-label="Insérer une lettre avant">${'ATGC'.split('').map(b=>`<button type="button" class="eg-btn" data-ins="${b}">${b}</button>`).join('')}</div></div>
<div class="eg-grp"><button type="button" class="eg-btn eg-wide" id="agdel">Supprimer cette lettre</button><button type="button" class="eg-btn eg-wide" id="agrst">Allèle normal</button></div>
</div><p class="ctl-note" id="agfb"></p>`,
    init(){const sc=scenes.atelier;let dit='';
      const sync=()=>{const A=analyser(sc.p.mut),k=sc.p.sel,c=Math.floor(k/3),pos=k%3+1;
        const etat=!A.m||A.k!==k?CDS[k]:A.t==='s'?`${CDS[k]} → ${A.b}`:A.t==='d'?`${CDS[k]}, supprimée`:`${CDS[k]}, un ${A.b} inséré avant`;
        $('#agpos').textContent=ty(`codon ${c}, ${ORD(pos)} lettre : ${etat}`);
        $('#agl').disabled=k<=W0;$('#agr').disabled=k>=W0+WN-1;
        if(A.m)S.types.add(A.kind);
        const V=verdictDe(A);let m;
        if(dit)m=dit;
        else if(!A.m)m='Défi : trouve la lettre qui remplace l’acide glutamique n° 6 par une valine. Indice : dans le tableau, les codons de Val commencent par GU.';
        else m=`<b>${V.t}</b>. ${V.s}${V.n?' '+V.n:''}`;
        dit='';
        if(A.m===HBS){S.hbs=true;m+=' <b>Trouvé : une seule lettre a suffi.</b>';}
        if(S.types.size)m+=`<br>Déjà obtenus : ${[...S.types].join(', ')}.`;
        $('#agfb').innerHTML=nw(ty(m));};
      const set=m=>{ctx.stop();const b=ctx.etape().base;sc.p.on=b.on;sc.p.prot=b.prot;sc.p.ver=b.ver;sc.p.sh=b.sh;sc.p.mut=m;sc.render();sync();};
      $('#agl').addEventListener('click',()=>{sc.p.sel=clamp(sc.p.sel-1,W0,W0+WN-1);sc.render();sync();});
      $('#agr').addEventListener('click',()=>{sc.p.sel=clamp(sc.p.sel+1,W0,W0+WN-1);sc.render();sync();});
      root.querySelectorAll('[data-sub]').forEach(b=>b.addEventListener('click',()=>{const k=sc.p.sel,B=b.dataset.sub;if(CDS[k]===B)dit=`C’est déjà un ${B} dans l’allèle normal : l’atelier revient à l’allèle normal.`;set(CDS[k]===B?'':`s:${k}:${B}`);}));
      root.querySelectorAll('[data-ins]').forEach(b=>b.addEventListener('click',()=>set(`i:${sc.p.sel}:${b.dataset.ins}`)));
      $('#agdel').addEventListener('click',()=>set(`d:${sc.p.sel}`));
      $('#agrst').addEventListener('click',()=>set(''));
      hooks.onSel=sync;sync();}}
};

/* une fiche de mot qui s'ouvre sous le texte : on la ramène à l'écran (le noyau ne le fait pas) */
const surMot=e=>{if(e.target.closest&&e.target.closest('.mot'))setTimeout(()=>{const z=$('#motz');if(z&&z.firstChild)z.scrollIntoView({block:'nearest',behavior:ctx.RM.matches?'auto':'smooth'});},30);};
root.addEventListener('click',surMot);

return {BEATS,STEPS,CTL,mots,
  reset(){S.hbs=false;S.types=new Set();S.look=new Set();},
  plain:s=>s.replace(/(\d)′/g,'$1 prime').replace(/1ʳᵉ/g,'première').replace(/1ᵉʳ/g,'premier').replace(/(\d)ᵉ/g,'$1ième').replace(/n° /g,'numéro ')
    .replace(/β/g,'bêta ').replace(/α/g,'alpha ').replace(/–/g,', ').replace(/\b[ACGTU]{2,}\b/g,m=>m.split('').join(' ')),
  demonter(){tk++;root.removeEventListener('click',surMot);}};
});
}
