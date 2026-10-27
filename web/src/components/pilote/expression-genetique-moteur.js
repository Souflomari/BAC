/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Du gène à la protéine » — l'expression de l'information génétique (SVT, 2ᵉ Bac,
 * filières SVT et PC), troisième version (refonte 2026-10 ; audit : docs/refonte/05-audit-v2-plan-v3.md
 * §3.4 ; retours du propriétaire : docs/refonte/04-retours-pilotes.md).
 *
 * Dix parties, la structure commune de la V3 : ce qu'il faut savoir (une question permet de la
 * sauter), l'énigme, le messager, la transcription, le code, la traduction, la mutation, le retour
 * à l'énigme, au bac (un exercice commenté), le bilan (trois pièges, puis le résultat et les
 * exercices). Les scènes sont dans `expression-genetique-scenes-*.js`, la donnée génétique dans
 * `expression-genetique-code.js`, les fiches de mots dans `expression-genetique-mots.js` ; le déroulé,
 * le panneau, les paris et la voix vivent dans `noyau.js`. Ce fichier-ci : le script, les
 * contrôles, la fin.
 *
 * RÈGLE — aucune séquence n'est tapée à la main : tout est CALCULÉ à partir de la vraie séquence
 * codante du gène HBB et de la table du code (voir `expression-genetique-code.js`).
 *
 * NUMÉROTATION — une seule règle, dite une fois dans l'atelier : on compte les triplets depuis le
 * premier triplet montré (la règle des sujets). L'atelier commence au triplet de Val : c'est
 * aussi la numérotation des médecins pour la chaîne β, qui ne compte pas la méthionine retirée
 * (Glu n° 6, codon 6). Le document « Au bac » numérote ses cinq triplets de 1 à 5.
 *
 * FAITS ET SOURCES — [V] vérifié sur la source · [S] source secondaire (cours, manuel).
 *  1. [V] Séquence codante HBB, 444 nt, ATG…TAA ; protéine 147 aa avec la Met.
 *     https://www.ncbi.nlm.nih.gov/nuccore/NM_000518.5 · https://www.ncbi.nlm.nih.gov/protein/NP_000509.1
 *     Le gène HBB a deux introns : on dit « la partie codante du gène ».
 *  2. [V] Méthionine initiale retirée (chaîne mûre 2..147 = 146 aa, commence par Val) ; HbS = E→V
 *     au résidu 7 (6 en numérotation classique) ; HbC = E→K au même site.
 *     https://www.uniprot.org/uniprotkb/P68871/entry
 *  3. [V] HBB sur le chromosome 11 (11p15.4). https://www.ncbi.nlm.nih.gov/gene/3043
 *  4. [V] Code génétique standard : 64 codons, AUG = Met (initiation), UAA UAG UGA = stop.
 *     https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi#SG1
 *  5. [V] Pauling, Itano, Singer, Wells, Science, 25 nov. 1949 : l'hémoglobine des malades a une
 *     autre charge électrique (autre point isoélectrique) : elle migre autrement en
 *     électrophorèse. https://en.wikipedia.org/wiki/Sickle_Cell_Anemia,_a_Molecular_Disease
 *     Le schéma montre la migration en tampon alcalin (le test courant) : l'HbS, moins
 *     négative, avance moins loin vers le pôle +.
 *  6. [V] Ingram, Nature 1956 (178:792) puis 1957 (180:326) : un seul acide aminé diffère, valine
 *     à la place d'acide glutamique ; « première fois » qu'un seul échange d'acide aminé est relié
 *     à une maladie. La place (n° 6 de la chaîne β) et la longueur (146) sont établies ensuite
 *     (Hunt et Ingram 1959 ; séquence de la chaîne β, 1961).
 *     https://pubmed.ncbi.nlm.nih.gov/13464827/ · https://en.wikipedia.org/wiki/Vernon_Ingram
 *     Glu porte une charge négative (sa chaîne latérale), Val est neutre.
 *  7. [V] Drépanocytose : sans oxygène, l'HbS polymérise en longues fibres ; hématies en faucille,
 *     capillaires bloqués, anémie hémolytique. https://fr.wikipedia.org/wiki/Dr%C3%A9panocytose
 *  8. [V] Érythropoïèse dans la moelle rouge ; les précurseurs nucléés fabriquent l'hémoglobine,
 *     puis expulsent leur noyau. https://en.wikipedia.org/wiki/Erythropoiesis
 *  9. [V] L'ARN polymérase ouvre l'ADN, lit le brin transcrit de 3′ vers 5′ et construit l'ARN de
 *     5′ vers 3′ ; l'ARN a la séquence du brin non transcrit, U pour T ; ARN : un brin, ribose.
 *     https://en.wikipedia.org/wiki/Transcription_(biology)
 * 10. [S] Vocabulaire du programme marocain : nucléotide, triplet, codon, codon d'initiation,
 *     codons stop dits non-sens, liaison peptidique, initiation / élongation / terminaison
 *     (docs/referentiel/svt-svt.yaml p. 11, svt-pc.yaml p. 10) ; sites P et A (sujet 2026 NS 32F,
 *     doc. 6, d'après docs/bible/04-svt.md G2).
 * 11. [V] Nirenberg et Matthaei, NIH, mai 1961 (essai clé le 27 mai) : un ARN poly-U fait
 *     fabriquer une chaîne de phénylalanine ; tous les codons déchiffrés en 1966.
 *     https://en.wikipedia.org/wiki/Nirenberg_and_Matthaei_experiment
 * 12. [V] Maroc : codon 39 (C→T) et FSC 6 (−A) parmi les mutations majeures de β-thalassémie.
 *     Lemsaddek et al., Hemoglobin 2004 : https://pubmed.ncbi.nlm.nih.gov/15008262/ ·
 *     Agouti et al., Genet Test 2008 : https://pubmed.ncbi.nlm.nih.gov/18976160/ ·
 *     Belmokhtar et al., Mol Genet Genomic Med 2022 : https://pubmed.ncbi.nlm.nih.gov/35615994/
 * 13. [S] L'exercice « maladie, protéine, gène » est présent dans presque chaque sujet de la
 *     filière SVT de 2022 à 2026 ; en PC, plus rare (2024 R). docs/bible/04-svt.md G2.
 * 14. [S] Chromosome = ADN + protéines ; non dupliqué : une chromatide, une molécule d'ADN ;
 *     dupliqué : deux ; 46 chromosomes dans une cellule humaine non reproductrice (2n).
 *     L'hémoglobine adulte = 2 α + 2 β, un hème et une molécule d'O₂ par chaîne.
 * 15. [S] Origine des mutations : erreurs de copie de l'ADN, agents mutagènes (UV…) ; elles
 *     ne répondent à aucun besoin de l'organisme.
 */
import {monterLecon} from "./noyau";
import {CDS,CODE,AA3,NOM,B4,N_SENS,nCodons,toARN,compl,anticodon,groupe,traduire,chaine,NORMAL,L_MURE,
  analyser,ORD,C6,HBS,SIL,FS6,NS6,INS3,C3,A_HBS,A_SIL,A_FS6,A_NS6,A_INS,A_B,BAC_N,BAC_M,B_TRIPLET,BN,
  TR_COD,TR_TPL,TR_ARN,TL_ARN,NB,FIN,DECODE,Q_AUG} from "./expression-genetique-code";
import {mots} from "./expression-genetique-mots";
import {scenesA} from "./expression-genetique-scenes-a";
import {scenesB,W0,WN,verdict as verdictDe} from "./expression-genetique-scenes-b";
import {scenesC,REPERES} from "./expression-genetique-scenes-c";

/** Une séquence dans le panneau : le style des lettres de la scène (expression-genetique.css). */
const sq=s=>`<span class="eg-seq">${s}</span>`;

export function monterPilote(root){
return monterLecon(root, ctx => {
const {clamp,ty,S,scenes,hooks,juste,rep}=ctx;
const $=ctx.$;

/* Dans le panneau, deux choses ne se coupent pas : « β-thalassémie » (au trait d'union), et un mot
   à fiche avec ce qui le touche (« l’[[anticodon]]. ») — sans cela, une virgule ou une apostrophe
   se retrouve seule au bord de la ligne, à côté du bouton. */
const nw=h=>typeof h==='string'
  ?h.replace(/([^\s>\]]{1,2})?(\[\[[^\]]+\]\])([,.;:)’]| [?!;:»])?/g,(m,a,c,z)=>(a||z)?`<span class="eg-nw">${a||''}${c}${z||''}</span>`:m)
    .replace(/β-thalassémie/g,'<span class="eg-nw">β-thalassémie</span>')
  :h;
const nwL=v=>Array.isArray(v)?v.map(x=>typeof x==='string'?nw(x):x&&x.t!=null?{...x,t:nw(x.t)}:x):nw(v);

/* ---------- ce que le script calcule ---------- */
const G6=A_HBS.cN,G6S=A_HBS.cM,G6A=A_SIL.cM;                       // GAG, GTG, GAA
const AUG=TL_ARN.slice(0,3),UAC=anticodon(AUG);
const GUG=toARN(G6S),CAC=anticodon(GUG);
const V1=CDS.slice(33,39);                                          // GTTACT : un fragment absent de la scène
const NLEU=nCodons('L'),MOT_NB={2:'Deux',3:'Trois',4:'Quatre',5:'Cinq',6:'Six'};
const tr=s=>{const r=traduire(s);return chaine(r.aa);};
// le bilan, piège 1 : un fragment de brin transcrit
const Q1C=CDS.slice(24,33),Q1T=compl(Q1C);
// le bilan, piège 2 : lire depuis AUG et s'arrêter au codon stop
const QA_I=Q_AUG.indexOf('AUG'),QA_OK=chaine(traduire(Q_AUG.slice(QA_I)).aa);
const QA_CADRE=chaine(traduire(Q_AUG).aa);                         // lu depuis le premier nucléotide
const QA_APRES=(()=>{const s=Q_AUG.slice(QA_I),aa=[];for(let i=0;i+3<=s.length;i+=3){const a=CODE[s.slice(i,i+3)];if(a!=='*')aa.push(a);}return chaine(aa);})();
const QUIZ=[
  {big:`3′-${groupe(Q1T)}-5′`,sub:'un fragment du brin transcrit',r1:'son complémentaire, avec U en face de A :',r2:`5′-${groupe(toARN(Q1C))}-3′`},
  {big:Q_AUG,sub:'un ARNm : où commence la lecture ?',r1:`${Q_AUG.slice(0,QA_I)} · ${groupe(Q_AUG.slice(QA_I,QA_I+12))} · UGA · ${Q_AUG.slice(QA_I+15)}`,r2:QA_OK},
  {big:`${G6} → ${G6S}`,sub:'le triplet 6, chez une personne drépanocytaire',r1:'même gène, autre allèle : βA → βS',r2:`${GUG} = ${AA3[CODE[GUG]]} partout`}
];

scenesA(ctx);
scenesB(ctx);
scenesC(ctx,QUIZ);

const VF=t=>({opts:t.map(([x,ok,fb,indice])=>({t:x,ok,fb,indice}))});
const NOTE_PARI='Pari noté. Pour trancher, il faut suivre le chemin du gène à la protéine : c’est toute la séance. Tu vérifieras toi-même, dans l’atelier.';

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Le messager',court:'Messager'},
  {name:'Copier le gène : la transcription',court:'Copier'},{name:'Le code',court:'Code'},{name:'Traduire le message : la traduction',court:'Traduire'},
  {name:'La mutation',court:'Mutation'},{name:'Retour à l’énigme',court:'Retour'},{name:'Au bac',court:'Au bac'},{name:'Bilan',court:'Bilan'}];
const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'v-savoir',beat:0,scene:'apercu',set:{n:0},seq:[{p:{n:4},d:1800,w:200}],
  text:['Avant l’énigme, quatre idées : protéine, hémoglobine, chromosome, gène.',
    'Tu les connais ? Réponds juste, et passe à l’énigme.'],
  verifie:VF([
    ['Un gène est un segment d’ADN',true,'Le gène, fait d’ADN, est la recette d’une protéine.<span class="eg-saut-z"> Tu peux passer à l’énigme, ou revoir les quatre idées (Suivant). <button type="button" class="eg-saut">Passer à l’énigme →</button></span>'],
    ['Un gène est une chaîne d’acides aminés',false,'Une chaîne d’acides aminés, c’est une protéine.','Une chaîne d’acides aminés, c’est une protéine. De quoi un gène est-il fait ?'],
    ['Une protéine s’écrit avec A, T, G, C',false,'A, T, G, C écrivent l’ADN, pas les protéines.','A, T, G, C écrivent l’ADN. De quoi une protéine est-elle faite ?']])},
{cle:'proteine',beat:0,scene:'prot',set:{ch:1,beads:0,kinds:0,fold:0,hb:0},seq:[{p:{beads:16},d:3400,w:300},{p:{kinds:1},d:2600,w:300},{p:{fold:1},d:2400,w:300}],
  text:['Première idée : une [[proteine|protéine]] est une chaîne, comme un collier de perles.',
    {t:'Chaque perle est un [[acide-amine|acide aminé]]. Il en existe 20 sortes, chacune avec son nom : valine, histidine…',a:1},
    {t:'La chaîne se replie sur elle-même : c’est sa forme qui lui permet de travailler.',a:2,fort:true}]},
{cle:'hemoglobine',beat:0,scene:'prot',set:{ch:0,hb:1,rb:0,mol:0,o2:0,bx:0},seq:[{p:{rb:1},d:1200,w:300},{p:{mol:4,o2:4},d:3200,w:400},{p:{bx:1},d:900,w:400}],
  text:['Deuxième idée : l’[[hemoglobine|hémoglobine]], une protéine célèbre.',
    {t:'Elle remplit les [[globule|globules rouges]], les cellules du sang qui transportent l’oxygène.',a:0},
    {t:'Elle est faite de 4 chaînes : 2 chaînes α et 2 [[chaine|chaînes β]]. Chacune retient une molécule d’oxygène.',a:1},
    {t:'Dans cette leçon, tout tourne autour de la chaîne β.',a:2,fort:true}]},
{cle:'chromosome',beat:0,scene:'zoom',set:{z:0,gv:0,gn:0,hl:0},seq:[{p:{z:2},d:2400,w:300},{p:{z:3},d:1600,w:900},{p:{z:4},d:1600,w:900}],
  text:['Troisième idée : où sont rangées les recettes de ces chaînes ? Zoomons dans une cellule.',
    {t:'Dans le [[noyau]], l’ADN est rangé en [[chromosome|chromosomes]] : de l’ADN associé à des protéines. Une cellule humaine en a 46 (23 dans un spermatozoïde ou un ovule).',a:0},
    {t:'Un chromosome non dupliqué, comme celui-ci, contient une seule molécule d’[[adn|ADN]], très longue.',a:1},
    {t:'L’ADN est une double hélice, écrite avec quatre « lettres » : A, T, G, C.',a:2}]},
{cle:'gene',beat:0,scene:'zoom',set:{gv:1,gn:0,hl:0},seq:[{p:{gn:2},d:2800,w:300},{p:{gn:3},d:2400,w:500},{p:{hl:1},d:1000,w:400}],
  text:['Quatrième idée : le [[gene|gène]]. Un chromosome en porte des centaines : ce sont des segments de son ADN.',
    {t:'Chaque gène est la recette d’une chaîne de protéine.',a:1,fort:true},
    {t:'Celui de la chaîne β s’appelle HBB. Il est sur le chromosome 11.',a:2}]},

/* ===== 1. l'énigme ===== */
{cle:'drep',beat:1,scene:'drep',set:{cell:1,morph:0,gl:0,gel:0,chainV:0,chain:0,six:0,grid:0},seq:[{p:{morph:1},d:2600,w:1200}],
  text:['L’énigme : un [[globule|globule rouge]] pas comme les autres.',
    {t:'Chez certains malades, il se déforme en faucille quand l’oxygène manque : c’est la [[drepanocytose|drépanocytose]].',a:0},
    {t:'Rigide, il bouche les petits vaisseaux (douleurs) et il est détruit trop vite ([[anemie|anémie]]).',a:0},
    {t:'D’après toi, où est la cause ?',a:0}],
  pari:{label:'Ton pari',opts:[
    {t:'Dans sa membrane',fb:'Bonne piste à tester. Le chimiste Linus Pauling, en 1949, parie plutôt sur ce qui remplit le globule : l’hémoglobine. La suite dira qui a raison.'},
    {t:'Dans l’hémoglobine qui le remplit',fb:'C’est aussi le pari du chimiste Linus Pauling, en 1949. La suite le vérifie.'},
    {t:'Dans le sang, pauvre en oxygène',fb:'Le manque d’oxygène déclenche la déformation, mais les globules normaux le supportent. Linus Pauling, en 1949, parie sur l’hémoglobine. La suite le vérifie.'}]}},
{cle:'pauling',beat:1,scene:'drep',tag:'1949 · Pauling',set:{cell:0,gl:1,gel:0},seq:[{p:{gel:1},d:3400,w:900}],
  text:['Réponse : la cause est bien dans l’hémoglobine. Pauling le montre par une [[electrophorese|électrophorèse]].',
    {t:'Dans un champ électrique, chaque molécule avance selon sa charge électrique.',a:0},
    {t:'Les deux hémoglobines n’avancent pas pareil : leurs charges diffèrent. Celle des malades est une autre molécule, l’[[hbs|hémoglobine S]] (HbS).',a:0,fort:true}]},
{cle:'ingram',beat:1,scene:'drep',tag:'1956-1957 · Ingram',set:{gl:0,chainV:1,chain:1,six:0},
  text:['Vernon Ingram compare alors les deux hémoglobines, morceau par morceau.','Que va-t-il trouver ?'],
  pari:{label:'Ton pari',reveal:[{p:{six:1},d:900}],apres:{html:'Glu porte une charge négative, Val n’en porte pas : l’HbS est moins négative. Voilà pourquoi elle avance moins loin vers le pôle +.'},opts:[
    {t:'Des chaînes entièrement différentes',fb:'Non : un seul acide aminé diffère. Chez les malades, une valine (Val) remplace un acide glutamique (Glu).'},
    {t:'Un seul acide aminé différent',fb:'Oui, un seul : chez les malades, une valine (Val) remplace un acide glutamique (Glu).'},
    {t:'Un acide aminé en plus',fb:'Non : rien en plus. Un seul acide aminé diffère : une valine (Val) remplace un acide glutamique (Glu).'}]}},
{cle:'v-enigme',beat:1,scene:'drep',
  text:['Ingram a donc trouvé une chaîne β différente.','Où faut-il chercher la cause de cette différence ?'],
  verifie:VF([
    ['Dans le gène HBB, sa recette',true,'Oui. Si la chaîne change, c’est que sa recette, le gène HBB, a changé.'],
    ['Dans le globule rouge déformé',false,'Le globule se déforme à cause de la chaîne, pas l’inverse. La chaîne est fabriquée d’après le gène HBB.','Le globule se déforme après coup. Qui dicte la chaîne β ?'],
    ['Dans les chaînes α',false,'Les chaînes α sont normales. La chaîne β est fabriquée d’après sa recette : le gène HBB.','Ingram n’a trouvé de différence que dans la chaîne β. Où est écrite sa recette ?']])},
{cle:'gene-chr',beat:1,scene:'drep',set:{chainV:0,chain:0,six:0,grid:0},seq:[{p:{grid:1},d:3000,w:400}],
  text:[{t:`Le gène HBB est fait d’ADN. Sa [[partie-codante|partie codante]] compte ${CDS.length} « lettres » A, T, G, C.`,a:0},
    'Un seul acide aminé a changé. Combien de lettres du gène ont changé ?'],
  pari:{label:'Ton pari',opts:[{t:'Une seule lettre',fb:NOTE_PARI},{t:'Quelques lettres',fb:NOTE_PARI},{t:'Des dizaines de lettres',fb:NOTE_PARI}]}},

/* ===== 2. le messager ===== */
{cle:'noyau',beat:2,scene:'cell',set:{on:0,cyto:0,ribo:0,q:0,msg:0,names:0,reste:0},seq:[{p:{on:1},d:1300,w:200},{p:{cyto:1,ribo:1},d:1600,w:500},{p:{q:1},d:700,w:500}],
  text:['Pour comprendre, suivons la fabrication de la chaîne β, du gène à la protéine.',
    {t:'Voici un futur globule rouge, dans la moelle des os. Son [[noyau]] contient l’ADN, donc le gène HBB.',a:0},
    {t:'Autour, le [[cytoplasme]], avec des [[ribosome|ribosomes]] : de petites machines qui assemblent les protéines.',a:1},
    {t:'Le gène est dans le noyau, les machines dehors. Comment le message passe-t-il ?',a:2,fort:true}]},
{cle:'messager',beat:2,scene:'cell',set:{q:1},
  text:['Comment l’information du gène arrive-t-elle jusqu’aux ribosomes ?'],
  pari:{label:'Ton pari',reveal:[{p:{q:0,msg:1,reste:1},d:2400}],opts:[
    {t:'L’ADN sort du noyau',fb:'Non : l’ADN reste dans le noyau. C’est une copie du gène, faite d’[[arn|ARN]], qui sort par un pore (un petit trou de l’enveloppe du noyau) : l’[[arnm|ARN messager]] (ARNm).'},
    {t:'Une copie du gène sort du noyau',fb:'Oui : une copie du gène, faite d’[[arn|ARN]], sort par un pore, un petit trou de l’enveloppe du noyau. C’est l’[[arnm|ARN messager]] (ARNm). L’ADN, lui, reste dans le noyau.'},
    {t:'Les ribosomes entrent dans le noyau',fb:'Non : les ribosomes restent dans le cytoplasme, et l’ADN dans le noyau. C’est une copie du gène, faite d’[[arn|ARN]], qui sort par un pore (un petit trou de l’enveloppe du noyau) : l’[[arnm|ARN messager]] (ARNm).'}]}},
{cle:'deux-etapes',beat:2,scene:'cell',set:{q:0,msg:1,reste:1},seq:[{p:{names:1},d:1300,w:300},{p:{names:2},d:1300,w:500}],
  text:['Le chemin a donc deux étapes, et le bac attend ces deux mots exacts.',
    {t:'Dans le noyau, la [[transcription]] copie le gène en ARN messager.',a:0},
    {t:'Dans le cytoplasme, la [[traduction]] change ce message en protéine.',a:1}]},
{cle:'v-messager',beat:2,scene:'cell',
  text:['Imagine une cellule dont les pores du noyau sont bouchés.','Quelle étape devient impossible ?'],
  verifie:VF([
    ['La transcription',false,'La transcription se fait dans le noyau, sans traverser les pores : elle continue. C’est la sortie de l’ARNm qui est bloquée, donc la traduction.','Où se fait la copie du gène ? A-t-elle besoin de traverser les pores ?'],
    ['La traduction',true,'Oui. L’ARNm est bien fabriqué dans le noyau, mais il ne peut plus rejoindre les ribosomes : pas de traduction.'],
    ['Aucune des deux',false,'Sans pore, l’ARNm reste enfermé dans le noyau, et l’ADN ne sort jamais : la traduction devient impossible.','Sans pore, que devient l’ARNm une fois fabriqué ?']])},

/* ===== 3. la transcription ===== */
{cle:'nucleotide',beat:3,scene:'nucleo',set:{nu:0,n:0,pr:0},seq:[{p:{nu:1},d:1200,w:300},{p:{n:4},d:2400,w:600},{p:{pr:2},d:1800,w:600}],
  text:['Pour comprendre la copie, regardons l’ADN de près : c’est une suite de [[nucleotide|nucléotides]].',
    {t:'Un nucléotide = un phosphate, un sucre (le désoxyribose) et une [[base]].',a:0},
    {t:'Quatre bases : adénine (A), thymine (T), guanine (G), cytosine (C). Ce sont les « lettres » de l’ADN.',a:1},
    {t:'Elles vont par paires : A avec T, G avec C.',a:2,fort:true}]},
{cle:'double-brin',beat:3,scene:'trans',set:{dna:1,dn:0,open:0,tpl:0,ez:0,n:0,fo:0,cmp:0,lv:0,dir:0,a1:0,a2:0,a3:0,rd:0},seq:[{p:{dn:21},d:2800,w:200},{p:{dir:1},d:1500,w:400}],
  text:[`Voici le tout début du gène HBB : ${TR_COD.length} paires de nucléotides, sur deux [[brin|brins]] [[complementaire|complémentaires]].`,
    {t:'Les deux bouts d’un brin sont différents : on les appelle [[sens|5′ et 3′]]. Un brin a un sens, comme une flèche.',a:1},
    {t:'Les deux brins vont en sens inverse : l’un vers la droite, l’autre vers la gauche.',a:1,fort:true}]},
{cle:'polymerase',beat:3,scene:'trans',set:{dir:0},seq:[{p:{open:1},d:2300,w:400},{p:{a1:1},d:600,w:100},{p:{tpl:1,a2:1,ez:1},d:1100,w:900}],
  text:['Pour copier le gène, une [[enzyme]] se met au travail : l’[[polymerase|ARN polymérase]].',
    {t:'1. Elle ouvre les deux brins, sans rien couper : le gène reste intact.',a:1},
    {t:'2. Elle lit un seul brin, le [[brin-transcrit|brin transcrit]]. L’autre est le brin non transcrit.',a:2}]},
{cle:'pari-u',beat:3,scene:'trans',set:{n:0,fo:0},seq:[{p:{n:1,a3:1},d:900,w:300},{p:{fo:1},d:500,w:200}],
  text:['3. Elle assemble l’ARN, nucléotide par nucléotide : en face de chaque base, sa partenaire.',
    {t:`En face du ${TR_TPL[0]}, elle a placé un ${TR_ARN[0]}.`,a:0},
    {t:`Le brin transcrit porte ensuite un ${TR_TPL[1]}. Que place-t-elle en face ?`,a:1}],
  pari:{label:'Ton pari',reveal:[{p:{n:3,fo:0},d:1400}],opts:[
    {t:'T, la partenaire de A dans l’ADN',fb:'Surprise : l’ARN n’a pas de T. À sa place, il a l’uracile (U). En face d’un A, l’ARN met un U.'},
    {t:'A, la même base',fb:'Une copie se fait par complémentarité, pas à l’identique. Et l’ARN n’a pas de T : en face d’un A, il met l’uracile (U).'},
    {t:'Une base absente de l’ADN',fb:'Oui : l’uracile (U). L’ARN n’a pas de T ; en face d’un A, il met un U.'}]}},
{cle:'copie',beat:3,scene:'trans',set:{n:3,fo:0,a1:0,a2:0,a3:0,rd:0},seq:[{p:{n:12,rd:1},d:2600,w:300},{p:{n:21,rd:2},d:2400,w:300}],
  text:['Nucléotide par nucléotide, l’ARNm s’allonge.',
    {t:'L’enzyme lit le brin transcrit de 3′ vers 5′…',a:0},
    {t:'… et construit l’ARNm de 5′ vers 3′.',a:1,fort:true},
    {t:'Repère les U : chacun est en face d’un A.',a:1}]},
{cle:'pari-brin',beat:3,scene:'trans',set:{rd:0},
  text:['L’ARNm est terminé. Compare-le aux deux brins d’ADN.','Ses bases sont celles…'],
  pari:{reveal:[{p:{cmp:1},d:2000}],opts:[
    {t:'du brin transcrit',fb:'C’est le piège le plus courant. L’ARNm est complémentaire du brin transcrit : il a donc les bases de l’autre brin, avec U à la place de T.',indice:'L’ARNm est complémentaire du brin transcrit. Et le complémentaire du brin transcrit, c’est… ?'},
    {t:'du brin non transcrit, U pour T',ok:true,fb:'Exactement : complémentaire du brin transcrit, donc identique au brin non transcrit, U à la place de T. Au bac, c’est le premier réflexe.'},
    {t:'d’aucun des deux',fb:'Regarde : il est identique au brin non transcrit, à un détail près, U à la place de T.',indice:'Compare base à base avec le brin du haut, en lisant U comme T.'}]}},
{cle:'arn',beat:3,scene:'arn',set:{r:0},seq:[{p:{r:1},d:700,w:300},{p:{r:2},d:700,w:900},{p:{r:3},d:700,w:900},{p:{r:4.5},d:900,w:900}],
  text:['L’ARNm est une molécule d’[[arn|ARN]]. Comparé à l’ADN, trois choses changent.',
    {t:'Un seul brin au lieu de deux.',a:0},
    {t:'Un autre sucre : le ribose, au lieu du désoxyribose.',a:1},
    {t:'L’uracile (U) au lieu de la thymine (T). Au bac, cette comparaison est une question classique.',a:2}]},
{cle:'regle',beat:3,scene:'regle',set:{r:0,c:0},seq:[{p:{r:1},d:700,w:300},{p:{r:2},d:900,w:600},{p:{r:3},d:900,w:600},{p:{c:1},d:800,w:500}],
  text:['Au bac, on ne dessine pas l’enzyme : on écrit trois lignes alignées.',
    {t:'Le brin transcrit est complémentaire du brin non transcrit.',a:1},
    {t:'L’ARNm est complémentaire du brin transcrit.',a:2},
    {t:'Deux fois complémentaire : l’ARNm a les bases du brin non transcrit, avec U à la place de T.',a:3,fort:true}]},
{cle:'v-transcription',beat:3,scene:'regle',
  text:[`Voici un fragment du brin non transcrit : ${sq(`5′-${groupe(V1)}-3′`)}.`,'Quel est l’ARNm correspondant ?'],
  verifie:VF([
    [sq(`3′-${groupe(toARN(compl(V1)))}-5′`),false,'Tu as pris le complémentaire du brin donné : c’est le brin transcrit, écrit avec U. L’ARNm, lui, a les bases du brin non transcrit, U pour T.','Ce brin est-il le brin transcrit, ou l’autre ?'],
    [sq(`5′-${groupe(toARN(V1))}-3′`),true,'Oui : les bases du brin non transcrit, avec U à la place de T.'],
    [sq(`5′-${groupe(V1)}-3′`),false,'Les bonnes bases, mais avec des T : un ARN n’a jamais de T, il a U à la place.','Les bonnes bases… mais un ARN contient-il des T ?']])},

/* ===== 4. le code ===== */
{cle:'alphabet',beat:4,scene:'code',set:{need:1,tri:0,fill:0,pu:0,pf:0,tab:0,sel:'···',hi:''},
  text:['Le message est copié ; il faut maintenant le lire.',
    'L’ARNm n’a que 4 bases ; les protéines ont 20 acides aminés. Combien de bases par acide aminé, au minimum ?'],
  pari:{fixe:true,reveal:[{p:{tri:3},d:2400},{p:{fill:1},d:900}],opts:[
    {t:'1 base',fb:'Avec 1 base, seulement 4 mots. Il en faut 20.',indice:'Avec 1 base, combien de mots différents peut-on écrire ?'},
    {t:'2 bases',fb:'Avec 2 bases : 4 × 4 = 16 mots, encore trop peu pour 20.',indice:'Avec 2 bases : 4 choix, puis encore 4 choix. Combien de mots ?'},
    {t:'3 bases',ok:true,fb:'Oui : 4 × 4 × 4 = 64 mots, assez pour 20, et même trop. Ce groupe de trois nucléotides est un [[triplet]] ; sur l’ARNm, on l’appelle un [[codon]].'}]}},
{cle:'nirenberg',beat:4,scene:'code',tag:'1961 · Nirenberg',set:{need:0,tri:0,fill:0},seq:[{p:{pu:1},d:1200,w:300}],
  text:['Reste à savoir quel codon désigne quel acide aminé. En 1961, personne ne le sait.',
    {t:'Marshall Nirenberg et Heinrich Matthaei fabriquent un ARN fait d’une seule base : UUUUUU…',a:0},
    {t:'Ils le donnent à un extrait de bactéries. Que fabrique-t-il ?',a:0}],
  pari:{label:'Ton pari',reveal:[{p:{pf:1},d:1800}],opts:[
    {t:'Rien : ce n’est pas un vrai gène',fb:`Il a pourtant fabriqué une chaîne faite seulement de ${NOM[CODE.UUU]}. UUU signifie donc ${AA3[CODE.UUU]} : le premier mot du code est lu, le 27 mai 1961.`},
    {t:'Une chaîne d’un seul acide aminé',fb:`Oui : une chaîne faite seulement de ${NOM[CODE.UUU]}, ${AA3[CODE.UUU]} – ${AA3[CODE.UUU]} – ${AA3[CODE.UUU]}… UUU signifie donc ${AA3[CODE.UUU]}. Le premier mot du code est lu, le 27 mai 1961.`},
    {t:'Une protéine au hasard',fb:`Pas au hasard : une chaîne faite seulement de ${NOM[CODE.UUU]}. UUU signifie donc ${AA3[CODE.UUU]} : le premier mot du code est lu.`}]}},
{cle:'lire-table',beat:4,scene:'code',set:{pu:0,pf:0,sel:'···',hi:''},seq:[{p:{tab:1},d:1500,w:300},{p:{sel:GUG[0]+'··'},d:10,w:900},{p:{sel:GUG[0]+GUG[1]+'·'},d:10,w:1700},{p:{sel:GUG},d:10,w:1700}],
  text:['En 1966, les 64 codons sont lus. Voici le tableau du [[code|code génétique]], le même chez presque tous les êtres vivants.',
    {t:`On le lit en trois temps. Exemple : ${sq(GUG)}. Première base : la grande ligne (${GUG[0]}).`,a:1},
    {t:`Deuxième base : la colonne (${GUG[1]}).`,a:2},
    {t:`Troisième base : la petite ligne (${GUG[2]}). On lit ${AA3[CODE[GUG]]}, la ${NOM[CODE[GUG]]}.`,a:3,fort:true}]},
{cle:'table',beat:4,scene:'code',set:{sel:'···'},ctl:'table',
  text:['À toi : compose un codon avec les boutons, ou clique dans le tableau.',
    `Trouve ${sq(toARN(G6))}, ${sq(toARN(G6S))}, puis un codon stop.`]},
{cle:'depart-stop',beat:4,scene:'code',set:{sel:'···',hi:''},seq:[{p:{hi:'M'},d:600,w:400},{p:{hi:'*'},d:600,w:1700},{p:{hi:'L'},d:600,w:1700}],
  text:['Trois repères à connaître dans ce tableau.',
    {t:`${sq(AUG)} est le [[codon-init|codon d’initiation]] : toute lecture commence par lui. Il désigne la [[methionine|méthionine]] (Met).`,a:0},
    {t:`${sq('UAA')}, ${sq('UAG')} et ${sq('UGA')} sont les [[codon-stop|codons stop]], dits non-sens : la lecture s’arrête.`,a:1},
    {t:`Les ${N_SENS} autres se partagent 20 acides aminés : le code est [[redondant]]. ${MOT_NB[NLEU]||NLEU} codons désignent la leucine.`,a:2}]},
{cle:'v-code',beat:4,scene:'code',set:{hi:''},
  text:[`Lis cet ARNm : ${sq(groupe(DECODE))}.`,'Quelle chaîne donne-t-il ?'],
  verifie:VF([
    [tr(DECODE),true,`Oui : ${AUG}, le codon d’initiation, donne Met ; UAA est un codon stop, il ne donne rien.`],
    [`${tr(DECODE)} – Stop`,false,`Un codon stop ne désigne aucun acide aminé : il arrête la lecture. La chaîne compte ${traduire(DECODE).aa.length} acides aminés.`,'Un codon stop désigne-t-il un acide aminé ?'],
    [chaine(traduire(DECODE).aa.slice(1)),false,`${AUG}, le codon d’initiation, est traduit aussi : il donne Met.`,'Le codon d’initiation est-il lu, lui aussi ?']])},

/* ===== 5. la traduction ===== */
{cle:'ribosome',beat:5,scene:'transl',set:{on:1,rib:0,k:0,end:0,met:0,lab:0,hold:1,sites:0,pep:0},seq:[{p:{rib:1},d:1900,w:300},{p:{sites:1},d:900,w:600}],
  text:['Mi-parcours : c’est un bon moment pour une pause. Ensuite, place à la traduction, dans le cytoplasme.',
    {t:`[[initiation|Initiation]] : un [[ribosome]] se fixe sur l’ARNm, au codon d’initiation ${sq(AUG)}.`,a:0},
    {t:'Il a deux places, les [[sites|sites P et A]], chacune en face d’un codon. Il lit l’ARNm de 5′ vers 3′.',a:1}]},
{cle:'pari-aa',beat:5,scene:'transl',
  text:['Le ribosome va assembler une chaîne d’acides aminés.','Ces acides aminés, d’où viennent-ils ?'],
  pari:{label:'Ton pari',apres:{html:'Reste à les amener dans le bon ordre : c’est le rôle d’interprètes, les ARN de transfert.'},opts:[
    {t:'Le ribosome les fabrique',fb:'C’est une idée fausse très courante. Le ribosome ne fabrique aucun acide aminé : il les relie. Ils sont déjà là, libres dans le cytoplasme.'},
    {t:'Ils sont déjà dans le cytoplasme',fb:'Oui : ils sont libres dans le cytoplasme, apportés par l’alimentation ou fabriqués par la cellule. Le ribosome, lui, ne fait que les relier.'},
    {t:'L’ARNm les apporte',fb:'L’ARNm n’apporte que le message. Les acides aminés sont libres dans le cytoplasme ; le ribosome ne fait que les relier.'}]}},
{cle:'arnt',beat:5,scene:'transl',set:{lab:0},seq:[{p:{k:1},d:1900,w:300},{p:{lab:1},d:700,w:400}],
  text:['Voici l’interprète : l’[[arnt|ARN de transfert]] (ARNt).',
    {t:'À un bout, il porte un acide aminé ; à l’autre, trois bases : l’[[anticodon]].',a:0},
    {t:`Sous le codon ${sq(AUG)}, l’anticodon ${sq(UAC)} s’apparie, base à base : c’est l’ARNt de la méthionine, au site P.`,a:1,fort:true}]},
{cle:'ribo',beat:5,scene:'transl',set:{lab:0,hold:0,pep:1},ctl:'ribo',need:()=>S.riboMax>=NB,needLabel:'Avance le ribosome',
  text:['[[elongation|Élongation]] : un ARNt arrive au site A, en face du codon suivant.',
    'Une [[peptidique|liaison peptidique]] relie son acide aminé à la chaîne ; puis le ribosome avance d’un codon.',
    `À toi : avance jusqu’au ${ORD(NB)} codon.`]},
{cle:'fin-traduction',beat:5,scene:'transl',set:{k:NB,lab:0,hold:0,pep:0},seq:[{p:{end:1},d:1500,w:300},{p:{met:1},d:1700,w:1400}],
  text:[`[[terminaison|Terminaison]] : le ribosome arrive au codon stop ${sq(FIN.slice(9))}. Aucun ARNt ne lui correspond.`,
    {t:`La chaîne est libérée (${NORMAL.aa.length} acides aminés), et le ribosome se détache.`,a:0},
    {t:`Puis la méthionine du début est retirée : la chaîne β compte ${L_MURE} acides aminés et commence par Val.`,a:1,fort:true},
    {t:'On la numérote donc depuis Val : l’acide glutamique d’Ingram est le n° 6.',a:1}]},
{cle:'schema',beat:5,scene:'schema',set:{on:1,pl:0},ctl:'schema',need:()=>S.schema>=REPERES.length,needLabel:'Place les légendes',
  text:['Au bac, on demande souvent ce schéma : il résume toute la synthèse.',
    'Pour chaque repère, du 1 au 6, choisis sa légende.']},
{cle:'v-traduction',beat:5,scene:'transl',set:{k:1,end:0,met:0,lab:1,hold:1,pep:0,sites:1,rib:1},
  text:[`Un ARNt porte l’anticodon ${sq(CAC)}, écrit sous le codon, base en face de base.`,'Quel acide aminé apporte-t-il ?'],
  verifie:VF([
    [`L’histidine (${AA3[CODE[CAC]]})`,false,`${CAC}, lu dans le tableau, donnerait ${AA3[CODE[CAC]]}. Mais c’est un anticodon : le codon en face est ${GUG}, qui désigne ${AA3[CODE[GUG]]}.`,`${CAC} est un anticodon : quel codon lui fait face ?`],
    [`La méthionine (${AA3[CODE[AUG]]})`,false,`La méthionine vient avec l’anticodon ${UAC}, en face de ${AUG}. En face de ${CAC}, le codon est ${GUG} : ${AA3[CODE[GUG]]}.`,`Met vient avec l’anticodon ${UAC}. Quel codon fait face à ${CAC} ?`],
    [`La valine (${AA3[CODE[GUG]]})`,true,`Oui. En face de ${CAC}, le codon est ${GUG}, et ${GUG} désigne la valine.`]])},

/* ===== 6. la mutation ===== */
{cle:'mutation',beat:6,scene:'atelier',set:{on:1,mut:'',sel:C6+1,prot:0,ver:0,sh:0},
  text:['Tu sais lire un gène. Que se passe-t-il s’il change ?',
    'Une [[mutation]] change la séquence des nucléotides de l’ADN. D’où vient-elle ?'],
  pari:{label:'Ton pari',apres:{html:'Chaque version d’un gène, normale ou mutée, s’appelle un [[allele|allèle]].'},opts:[
    {t:'D’un besoin de l’organisme',fb:'C’est une idée fausse répandue. La mutation arrive par hasard (erreur de copie de l’ADN, rayons UV…) ; ses effets viennent après : utiles, nuls ou nuisibles.'},
    {t:'Du hasard',fb:'Oui : une erreur quand l’ADN est copié avant une division, ou un agent comme les rayons UV. L’organisme ne la « choisit » pas.'},
    {t:'De la maladie',fb:'C’est l’inverse : la mutation vient d’abord, par hasard (erreur de copie de l’ADN, rayons UV…). Parfois, elle cause ensuite une maladie.'}]}},
{cle:'atelier',beat:6,scene:'atelier',set:{mut:'',sel:C6+1,prot:1,ver:1,sh:1},ctl:'atelier',
  text:['Voici l’allèle normal, à partir du triplet de Val. Comme au bac, on compte les triplets depuis le premier montré.',
    'Choisis un nucléotide du brin non transcrit, puis change-le.',
    'Défi : remplace l’acide glutamique n° 6 par une valine.']},
{cle:'faux-sens',beat:6,scene:'atelier',set:{mut:'',sel:C6+1,sh:1},seq:[{p:{mut:HBS},d:10,w:1100}],
  text:()=>[`Un seul nucléotide : le ${G6[1]} du milieu de ${sq(G6)} devient ${G6S[1]}.`,
    {t:`Sur l’ARNm, ${sq(toARN(G6))} devient ${sq(toARN(G6S))} : ${AA3[A_HBS.aM]}.${rep('gene-chr')==null?'':rep('gene-chr')===0?' Ton pari du début était le bon.':' Tu avais parié plus : un seul suffit.'}`,a:0},
    {t:'Un nucléotide remplacé par un autre : une [[substitution]]. L’acide aminé change : mutation [[faux-sens]].',a:0},
    {t:'C’est l’allèle βS, celui de la drépanocytose.',a:0,fort:true}]},
{cle:'silencieuse',beat:6,scene:'atelier',set:{mut:'',sel:C6+2,sh:1},
  text:[`Autre essai : le dernier ${G6[2]} de ${sq(G6)} devient ${G6A[2]}.`,`Sur l’ARNm, ${sq(toARN(G6))} devient ${sq(toARN(G6A))}. Que devient la protéine ?`],
  pari:{label:'Ton pari',reveal:[{p:{mut:SIL},d:600}],apres:{html:'Une mutation n’est donc pas toujours une maladie : celle-ci ne change rien à la protéine.'},opts:[
    {t:'Rien ne change',fb:`Oui : ${toARN(G6A)} désigne aussi ${AA3[A_SIL.aM]}. Le code est redondant. Mutation [[silencieuse|silencieuse]] : l’allèle change, la protéine non.`},
    {t:'Un acide aminé change',fb:`Regarde le tableau : ${toARN(G6A)} désigne ${AA3[A_SIL.aM]}, comme ${toARN(G6)}. La protéine ne change pas : mutation [[silencieuse|silencieuse]].`},
    {t:'La chaîne s’arrête',fb:`${toARN(G6A)} n’est pas un codon stop : il désigne ${AA3[A_SIL.aM]}, comme ${toARN(G6)}. Mutation [[silencieuse|silencieuse]] : la protéine ne change pas.`}]}},
{cle:'non-sens',beat:6,scene:'atelier',set:{mut:'',sel:C6,sh:1},
  text:[`Troisième essai : le premier ${G6[0]} de ${sq(G6)} devient ${A_NS6.cM[0]}.`,`Sur l’ARNm, ${sq(toARN(G6))} devient ${sq(toARN(A_NS6.cM))}. Que devient la protéine ?`],
  pari:{label:'Ton pari',reveal:[{p:{mut:NS6},d:600}],opts:[
    {t:'Un acide aminé change',fb:`${toARN(A_NS6.cM)} ne désigne aucun acide aminé : c’est un codon stop. La chaîne s’arrête après ${A_NS6.len} acides aminés : mutation [[non-sens|non-sens]].`},
    {t:'Rien ne change',fb:`Ce serait vrai si ${toARN(A_NS6.cM)} désignait aussi ${AA3[A_NS6.aN]}. Mais c’est un codon stop : la chaîne s’arrête après ${A_NS6.len} acides aminés. Mutation [[non-sens|non-sens]].`},
    {t:`Elle s’arrête après ${A_NS6.len} acides aminés`,fb:`Oui. ${toARN(A_NS6.cM)} est un codon stop : la chaîne ne compte que ${A_NS6.len} acides aminés au lieu de ${L_MURE}. Mutation [[non-sens|non-sens]].`}]}},
{cle:'decalage',beat:6,scene:'atelier',set:{mut:'',sel:C6+1,sh:1},
  text:[`Dernier essai : on supprime un seul nucléotide, le ${G6[1]} de ${sq(G6)}, sans le remplacer.`,'Combien d’acides aminés vont changer ?'],
  pari:{label:'Ton pari',reveal:[{p:{mut:FS6},d:600}],opts:[
    {t:'Un seul',fb:`Plus que ça. Le ribosome lit trois par trois depuis AUG : un nucléotide en moins décale toute la lecture. Un codon stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`},
    {t:'Tous ceux qui suivent',fb:`Oui. Une [[deletion|délétion]] d’un nucléotide décale toute la lecture : c’est un [[decalage|décalage du cadre de lecture]]. Un codon stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`},
    {t:'Aucun',fb:`Le code est redondant, mais pas à ce point : un nucléotide en moins décale toute la lecture. Un codon stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`}]}},
{cle:'v-insertion',beat:6,scene:'atelier',set:{mut:'',sel:C3,sh:0},
  text:[`Et si on ajoute un nucléotide ? On insère un ${INS3.split(':')[2]} au début du triplet ${C3/3}.`,'Que devient la chaîne ?'],
  verifie:{...VF([
    [`Tout change à partir du n° ${A_INS.first}`,true,`Oui : une [[insertion]] décale aussi le cadre de lecture. ${chaine(A_INS.tr.aa.slice(1))}, puis un codon stop : ${A_INS.len} acides aminés au lieu de ${L_MURE}.`],
    [`Seul le n° ${A_INS.first} change`,false,'Ce serait vrai pour une substitution. Une insertion décale le découpage de tous les codons suivants.','Un nucléotide en plus : comment le ribosome découpe-t-il la suite, trois par trois ?'],
    ['Rien : il est ignoré',false,'Le ribosome ne peut pas repérer le nucléotide ajouté : il lit trois par trois, et tout le découpage se décale.','Le ribosome lit trois par trois, sans repère entre les codons : peut-il sauter un nucléotide ?']]),reveal:[{p:{mut:INS3},d:600}]}},

/* ===== 7. retour à l'énigme ===== */
{cle:'echelles',beat:7,scene:'levels',set:{lv:1,m1:0,c1:0,o1:0,flow:0,map:0},seq:[{p:{m1:1},d:1800,w:500},{p:{c1:1},d:1200,w:700}],
  text:['Retour à l’énigme : comment une valine déforme-t-elle un globule rouge ?',
    {t:'À l’échelle moléculaire : sans oxygène, la valine rend l’hémoglobine S collante ; ses molécules s’assemblent en longues fibres.',a:0},
    {t:'À l’échelle cellulaire : ces fibres déforment le globule rouge en faucille.',a:1}]},
{cle:'organisme',beat:7,scene:'levels',seq:[{p:{o1:1},d:1300,w:300},{p:{flow:1},d:1000,w:700}],
  text:['À l’échelle de l’organisme : les globules en faucille bouchent les petits vaisseaux (douleurs) et sont détruits trop vite (anémie).',
    {t:'Un nucléotide, un acide aminé, un [[caractere|caractère]] : c’est la relation gène → protéine → caractère que le bac attend.',a:1,fort:true}]},
{cle:'maroc',beat:7,scene:'levels',set:{lv:0},seq:[{p:{map:1},d:1500,w:300}],
  text:['Ce que ça a changé : depuis Ingram, on lit les maladies héréditaires nucléotide par nucléotide.',
    {t:'Au Maroc, la [[thalassemie|β-thalassémie]] est un problème de santé majeur ; les généticiens y ont identifié les allèles les plus fréquents.',a:0},
    {t:'Parmi eux : la délétion vue au codon 6, et une substitution au codon 39. Les connaître permet de dépister les porteurs.',a:0}]},
{cle:'v-chaine',beat:7,scene:'levels',set:{lv:1,map:0,m1:1,c1:1,o1:1,flow:1},
  text:['Imagine une molécule qui empêche l’hémoglobine S de former des fibres.','Chez un malade, que deviendrait le caractère ?'],
  verifie:VF([
    ['Des globules de forme normale',true,'Oui : le caractère dépend de la protéine. L’allèle reste βS, mais si l’HbS ne forme plus de fibres, le globule garde sa forme.'],
    ['L’allèle βS redeviendrait βA',false,'La molécule agit sur la protéine, pas sur l’ADN : l’allèle reste βS. C’est le caractère qui change.','La molécule agit sur la protéine. Touche-t-elle l’ADN ?'],
    ['Rien : seul l’allèle compte',false,'Entre l’allèle et le caractère, il y a la protéine. Si elle ne forme plus de fibres, le globule garde sa forme.','Entre l’allèle et le caractère, il y a une étape : laquelle ?']])},

/* ===== 8. au bac ===== */
{cle:'bac-doc',beat:8,scene:'bac',set:{doc:0,e1:0,e2:0,e3:0},seq:[{p:{doc:1},d:1100,w:300}],
  text:['L’exercice type, presque chaque année en filière SVT (plus rare en PC).',
    {t:'Le document : le brin transcrit d’un allèle normal et d’un allèle muté (une β-thalassémie). Ton premier geste ?',a:0}],
  pari:{reveal:[{p:{e1:1},d:2600}],opts:[
    {t:'Lire les codons sur ces brins',fb:'Ce brin est le brin transcrit ; le tableau, lui, se lit en codons d’ARNm.',indice:'Le tableau du code est écrit avec quelles bases : celles de l’ADN, ou celles de l’ARNm ?'},
    {t:'Écrire l’ARNm, complémentaire',ok:true,fb:'Oui : on transcrit d’abord, base par base, U en face de A.'},
    {t:'Chercher la maladie dans le cours',fb:'Le correcteur note la démarche, à partir du document ; la maladie vient en conclusion.',indice:'Le correcteur note la démarche à partir du document. Par quoi commence-t-elle ?'}]}},
{cle:'bac-codons',beat:8,scene:'bac',seq:[{p:{e2:1},d:2200,w:300}],
  text:()=>{const n=traduire(BAC_N).aa,m=[];for(let c=0;c<BN;c++){const a=CODE[toARN(BAC_M.slice(3*c,3*c+3))];if(a==='*')break;m.push(a);}
    return ['Deuxième geste : découpe chaque ARNm en codons, depuis le premier, et lis le tableau.',
      {t:`Allèle normal : ${chaine(n)}.`,a:0},
      {t:`Allèle muté : ${chaine(m)}, puis ${sq(toARN(A_B.cM))}, un codon stop.`,a:0}];}},
{cle:'bac-redaction',beat:8,scene:'bac',ctl:'lignes',
  text:['Troisième geste : compare, nomme, relie. Voici une rédaction qui prend les points (barème sur le modèle de 2026).'],
  deriv:[
    {tex:'',alt:`ARNm normal : 5′-${groupe(toARN(BAC_N))}-3′`,h:`ARNm normal : ${sq(`5′-${groupe(toARN(BAC_N))}-3′`)}`,r:`Chaîne normale : ${chaine(traduire(BAC_N).aa)}. (0,5 pt)`},
    {tex:'',alt:`ARNm muté : 5′-${groupe(toARN(BAC_M))}-3′`,h:`ARNm muté : ${sq(`5′-${groupe(toARN(BAC_M))}-3′`)}`,r:`Chaîne mutée : ${chaine(traduire(BAC_M).aa)}, puis arrêt : ${toARN(A_B.cM)} est un codon stop. (0,5 pt)`},
    {tex:'',alt:`Substitution d’un nucléotide au triplet ${B_TRIPLET}`,h:`<b>Substitution d’un nucléotide</b>, au triplet ${B_TRIPLET}`,r:`${A_B.cN[0]} → ${A_B.cM[0]} sur le brin non transcrit (${compl(A_B.cN)[0]} → ${compl(A_B.cM)[0]} sur le brin transcrit) : le codon ${toARN(A_B.cN)} devient ${toARN(A_B.cM)}, un codon stop. Mutation non-sens. (0,25 pt)`,p:{e3:1}},
    {tex:'',alt:'Chaîne β raccourcie, donc β-thalassémie',h:'<b>Chaîne β raccourcie</b> → β-thalassémie',r:'La traduction s’arrête trop tôt : la chaîne β est incomplète, non fonctionnelle ; les globules rouges manquent d’hémoglobine. (0,25 pt)'}]},

/* ===== 9. bilan ===== */
{cle:'q1',beat:9,scene:'quiz',set:{qi:0,rv:0},
  text:['Trois pièges qui coûtent des points au bac.',`Piège 1 : ${sq(`3′-${groupe(Q1T)}-5′`)} est un fragment du brin transcrit. Quel est l’ARNm ?`],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:sq(`3′-${groupe(toARN(Q1T))}-5′`),fb:'Tu as recopié le brin transcrit en changeant T en U. Mais l’ARNm est son complémentaire.',indice:'Recopier en changeant T en U : cela marche pour quel brin ?'},
    {t:sq(`5′-${groupe(toARN(Q1C))}-3′`),ok:true,fb:'Oui : le complémentaire du brin transcrit, avec U en face de A.'},
    {t:sq(`5′-${groupe(Q1C)}-3′`),fb:'Les bonnes bases, mais avec des T : un ARN n’a jamais de T, il a U à la place.',indice:'Les bonnes bases… mais un ARN contient-il des T ?'}]}},
{cle:'q2',beat:9,scene:'quiz',set:{qi:1,rv:0},
  text:[`Piège 2 : voici un ARNm, ${sq(Q_AUG)}.`,'Quelle chaîne donne-t-il ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:QA_OK,ok:true,fb:'Oui : la lecture commence au codon d’initiation AUG et s’arrête au codon stop UGA.'},
    {t:QA_CADRE,fb:'Tu as lu depuis le premier nucléotide. La lecture commence au codon d’initiation, AUG.',indice:'Où commence toute lecture ?'},
    {t:QA_APRES,fb:'UGA est un codon stop : la lecture s’arrête là. Ce qui suit n’est pas traduit.',indice:'Que fait le ribosome quand il rencontre UGA ?'}]}},
{cle:'q3',beat:9,scene:'quiz',set:{qi:2,rv:0},
  text:[`Piège 3 : chez une personne drépanocytaire, le triplet 6 ${sq(G6)} est devenu ${sq(G6S)}.`,'Qu’est-ce qui a changé ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'L’allèle : une autre version du gène',ok:true,fb:'Oui : même gène (HBB, chromosome 11), autre version, l’allèle βS. Le code, lui, est le même chez tous.'},
    {t:'Le gène : c’est un autre gène',fb:'C’est le même gène, au même endroit du chromosome 11. Une version différente d’un gène s’appelle un allèle.',indice:'Est-ce toujours la recette de la chaîne β, au même endroit ?'},
    {t:'Le code génétique de la personne',fb:`Le code est universel : ${GUG} signifie ${AA3[CODE[GUG]]} chez tous. Ce qui change, c’est le message (l’allèle), pas le dictionnaire.`,indice:`${GUG} signifie-t-il autre chose chez elle que chez toi ?`}]}},
{cle:'fin',beat:9,scene:'end',seq:[{p:{n:4},d:2800,w:300}],
  text:['Fin de la séance. La scène résume ce que tu as compris.'],html:()=>finHTML()}
];

/* « β-thalassémie » et les mots à fiche : insécables, dans tous les textes du panneau */
STEPS.forEach(st=>{
  if(typeof st.text==='function'){const f=st.text;st.text=()=>nwL(f());}else st.text=nwL(st.text);
  const P=st.pari||st.verifie;if(P){P.opts.forEach(o=>{o.fb=nw(o.fb);if(o.indice)o.indice=nw(o.indice);});if(P.apres&&P.apres.html)P.apres.html=nw(P.apres.html);}
  if(st.deriv)st.deriv.forEach(x=>{if(x.r)x.r=nw(x.r);});
});

/* ---------- la fin : une ligne de résultat, les exercices, le détail replié ---------- */
const PIEGES=[['q1','lire le bon brin (U, jamais T)','les exercices 2 et 3 (brin transcrit, complémenter ou non)'],
  ['q2','du codon d’initiation au codon stop','l’exercice 5 (de l’ARNm à la chaîne)'],
  ['q3','gène, allèle, code','l’exercice 8 (le type de mutation)']];
function finHTML(){
  const res=PIEGES.map(([k])=>juste(k));
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${PIEGES[i][1]}</li>`).join('');
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>juste(s.k)!=null),vok=V.filter(s=>juste(s.k)===true);
  const P=STEPS.filter(s=>s.pari&&!s.pari.opts.some(o=>o.ok)),faits=P.filter(s=>rep(s.k)!=null).length;
  const plan=res.map((ok,i)=>ok===false?`Le piège « ${PIEGES[i][1]} » : ${PIEGES[i][2]}.`:null).filter(Boolean)
    .concat([res.every(ok=>ok!==false)?'Aucun piège ne t’a eu : va directement à l’exercice 10, l’exercice complet comme en 2026.':'Puis l’exercice 10 : l’exercice complet, comme en 2026.']).map(x=>`<li>${x}</li>`).join('');
  const une=rep('gene-chr')===0?' ; « une seule lettre » : bien vu':'';
  return ty(`<p class="eg-res">« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length||V.length}</b>. Tes paris : ${faits} faits${une}.</p>`
    +`<a class="lien-exos" href="/pilote/expression-genetique/exercices">Faire les exercices →</a>`
    +`<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul><div class="next"><div class="pari-k">Par où commencer les exercices</div><ol>${plan}</ol></div></details>`);
}

/* ---------- contrôles par étape ---------- */
S.hbs=false;S.types=new Set();S.look=new Set();S.schema=0;S.schemaKo=new Set();S.riboMax=1;
// l'animation d'un pas du ribosome : le noyau n'expose pas son interpolateur pour un seul paramètre
let tk=0;
function tweenK(sc,to,d){
  ctx.stop();const my=++tk,from=sc.p.k,t0=performance.now();
  return new Promise(res=>{const step=now=>{
    if(my!==tk||ctx.etape().cle!=='ribo')return res(false);
    const t=ctx.RM.matches?1:Math.min(1,(now-t0)/d);sc.p.k=ctx.lerp(from,to,ctx.ease(t));sc.render();hooks.frame&&hooks.frame();
    if(t<1)requestAnimationFrame(step);else res(true);};requestAnimationFrame(step);});}
const seg=(cls,label,items,attr)=>`<div class="eg-seg" role="group" aria-label="${label}">${items.map(b=>`<button type="button" class="${cls}" ${attr(b)}>${b}</button>`).join('')}</div>`;
const CTL={
  table:{html:()=>`<div class="ctl eg-ctl">${['1ʳᵉ base','2ᵉ base','3ᵉ base'].map((l,k)=>`<div class="eg-row"><span class="eg-k">${l}</span>${seg('eg-btn',l,B4.split(''),b=>`data-k="${k}" data-b="${b}" aria-pressed="false"`)}</div>`).join('')}</div><p class="ctl-note" id="tabfb"></p>`,
    init(){const sc=scenes.code;sc.p.sel=ctx.etape().base.sel;sc.render();
      const goals=[toARN(G6),toARN(G6S),'stop'];
      const sync=()=>{const s=sc.p.sel||'···';
        root.querySelectorAll('.eg-btn[data-k]').forEach(b=>b.setAttribute('aria-pressed',String(s[+b.dataset.k]===b.dataset.b)));
        let m;const full=!s.includes('·');
        if(!full)m=`Codon : <b class="eg-seq">${s}</b>`;
        else{const a=CODE[s];S.look.add(a==='*'?'stop':s);
          m=a==='*'?`<b class="eg-seq">${s}</b> : aucun acide aminé. C’est un <b>codon stop</b> (dit non-sens) : la traduction s’arrête là.`
            :`<b class="eg-seq">${s}</b> → <b>${AA3[a]}</b> (${NOM[a]}).${s===AUG?' C’est aussi le codon d’initiation : toute lecture commence par lui.':''}${s===toARN(G6S)?' Retiens-le : il reviendra.':''}`;}
        m+=`<br>À trouver : ${goals.map(gl=>`${S.look.has(gl)?'✓':'○'} ${gl==='stop'?'un codon stop':`<span class="eg-seq">${gl}</span>`}`).join(' · ')}`;
        $('#tabfb').innerHTML=ty(m);};
      root.querySelectorAll('.eg-btn[data-k]').forEach(b=>b.addEventListener('click',()=>{const s=(sc.p.sel||'···').split('');const k=+b.dataset.k;s[k]=b.dataset.b;sc.p.sel=s.join('');sc.render();sync();}));
      hooks.onCodon=sync;sync();}},
  ribo:{html:()=>`<div class="ctl eg-ctl"><div class="eg-row"><button type="button" class="eg-lien" id="rbm">← Recule</button><button type="button" class="eg-btn eg-wide ctl-btn" id="rbp">Avance d’un codon →</button></div></div><p class="ctl-note" id="ribofb"></p>`,
    init(){const sc=scenes.transl;
      const sync=()=>{const k=clamp(Math.round(sc.p.k),1,NB),c=TL_ARN.slice(3*(k-1),3*k),a=CODE[c];
        $('#rbm').disabled=k<=1;$('#rbp').disabled=k>=NB;
        const ch=traduire(CDS.slice(0,3*k)).aa;
        $('#ribofb').innerHTML=ty(`${ORD(k)} codon : <b class="eg-seq">${c}</b> · anticodon <b class="eg-seq">${anticodon(c)}</b> → <b>${AA3[a]}</b> (${NOM[a]}).<br>Chaîne : ${chaine(ch)}${k>=NB?'. Tu viens de fabriquer le début de la chaîne β.':''}`);};
      const goK=k=>{sc.p.hold=0;sc.p.lab=0;const to=clamp(k,1,NB);tweenK(sc,to,700).then(ok=>{if(ok){S.riboMax=Math.max(S.riboMax,to);sync();ctx.majNav();}});};
      $('#rbp').addEventListener('click',()=>goK(Math.round(sc.p.k)+1));
      $('#rbm').addEventListener('click',()=>goK(Math.round(sc.p.k)-1));
      sync();}},
  atelier:{html:()=>`<div class="ctl eg-ctl">
<div class="eg-row eg-nav"><button type="button" class="eg-fl" id="agl" aria-label="Nucléotide précédent">←</button><output id="agpos" class="eg-pos"></output><button type="button" class="eg-fl" id="agr" aria-label="Nucléotide suivant">→</button></div>
<div class="eg-row"><span class="eg-k">Remplacer par</span>${seg('eg-btn','Remplacer le nucléotide par','ATGC'.split(''),b=>`data-sub="${b}"`)}</div>
<div class="eg-row"><span class="eg-k">Insérer avant</span>${seg('eg-btn','Insérer un nucléotide avant','ATGC'.split(''),b=>`data-ins="${b}"`)}</div>
<div class="eg-row eg-liens"><button type="button" class="eg-lien" id="agdel">Supprimer ce nucléotide</button><button type="button" class="eg-lien" id="agrst">Revenir à l’allèle normal</button></div>
</div><p class="ctl-note" id="agfb"></p>`,
    init(){const sc=scenes.atelier;let dit='';
      const sync=()=>{const A=analyser(sc.p.mut),k=sc.p.sel,c=Math.floor(k/3),pos=k%3+1;
        const etat=!A.m||A.k!==k?CDS[k]:A.t==='s'?`${CDS[k]} → ${A.b}`:A.t==='d'?`${CDS[k]}, supprimé`:`${CDS[k]}, un ${A.b} inséré avant`;
        $('#agpos').textContent=ty(`triplet ${c}, ${ORD(pos)} nucléotide : ${etat}`);
        $('#agl').disabled=k<=W0;$('#agr').disabled=k>=W0+WN-1;
        if(A.m)S.types.add(A.kind);
        const V=verdictDe(A);let m;
        if(dit)m=dit;
        else if(!A.m)m='Indice : dans le tableau, les codons de Val commencent par GU.';
        else m=`<b>${V.t}</b>. ${V.s}${V.n?' '+V.n:''}`;
        dit='';
        if(A.m===HBS){S.hbs=true;m+=' <b>Trouvé : un seul nucléotide a suffi.</b>';}
        if(S.types.size)m+=`<br>Déjà obtenus : ${[...S.types].join(', ')}.`;
        $('#agfb').innerHTML=nw(ty(m));};
      const set=m=>{ctx.stop();const b=ctx.etape().base;sc.p.on=b.on;sc.p.prot=b.prot;sc.p.ver=b.ver;sc.p.sh=b.sh;sc.p.mut=m;sc.render();sync();};
      $('#agl').addEventListener('click',()=>{sc.p.sel=clamp(sc.p.sel-1,W0,W0+WN-1);sc.render();sync();});
      $('#agr').addEventListener('click',()=>{sc.p.sel=clamp(sc.p.sel+1,W0,W0+WN-1);sc.render();sync();});
      root.querySelectorAll('[data-sub]').forEach(b=>b.addEventListener('click',()=>{const k=sc.p.sel,B=b.dataset.sub;if(CDS[k]===B)dit=`C’est déjà un ${B} dans l’allèle normal : l’atelier revient à l’allèle normal.`;set(CDS[k]===B?'':`s:${k}:${B}`);}));
      root.querySelectorAll('[data-ins]').forEach(b=>b.addEventListener('click',()=>set(`i:${sc.p.sel}:${b.dataset.ins}`)));
      $('#agdel').addEventListener('click',()=>set(`d:${sc.p.sel}`));
      $('#agrst').addEventListener('click',()=>set(''));
      hooks.onSel=sync;sync();}},
  // le schéma de synthèse : un repère à la fois, l'élève choisit sa légende ; une légende fausse
  // reçoit un indice et se grise pour ce repère
  schema:{html:()=>{const L=[...REPERES.map(r=>r.t)].sort((a,b)=>a.localeCompare(b,'fr'));
      return `<div class="ctl eg-ctl"><div class="eg-chips" role="group" aria-label="Les légendes">${L.map(t=>`<button type="button" class="eg-btn eg-chip ctl-btn" data-leg="${t}">${t}</button>`).join('')}</div></div><p class="ctl-note" id="schfb" aria-live="polite"></p>`;},
    init(){const sc=scenes.schema;
      const sync=msg=>{const n=S.schema,fini=n>=REPERES.length;sc.p.pl=n;sc.render();
        root.querySelectorAll('[data-leg]').forEach(b=>{const t=b.dataset.leg,place=REPERES.findIndex(r=>r.t===t)<n;b.disabled=fini||place||S.schemaKo.has(t);b.classList.toggle('eg-place',place);});
        $('#schfb').innerHTML=ty((msg?msg+'<br>':'')+(fini?'Les six repères sont légendés : c’est le schéma attendu au bac.':`Repère ${n+1} : quelle légende ?`));};
      root.querySelectorAll('[data-leg]').forEach(b=>b.addEventListener('click',()=>{const n=S.schema;if(n>=REPERES.length)return;const t=b.dataset.leg,R=REPERES[n];
        if(t===R.t){S.schema=n+1;S.schemaKo=new Set();sync(`<b>${n+1}. ${t}</b> : juste.`);ctx.majNav();}
        else{S.schemaKo.add(t);sync(`Pas « ${t} » pour le repère ${n+1}. Indice : ${R.i}`);}}));
      sync('');}},
  // une rédaction ligne à ligne, dans la police de l'interface (pas de mot dans la police des maths) :
  // les lignes de la dérivation reçoivent leur HTML avant que le noyau n'appelle KaTeX
  lignes:{html:()=>'',init(st){root.querySelectorAll('#body .deriv li').forEach(li=>{const x=st.deriv[+li.dataset.l],m=li.querySelector('.m');if(m&&x&&x.h){m.innerHTML=ty(x.h);m.dataset.done='1';m.classList.add('eg-ligne');}});}}
};

/* le saut de « ce qu'il faut savoir » vers l'énigme, offert à qui a réussi la première question */
const surSaut=e=>{if(e.target.closest&&e.target.closest('.eg-saut')){e.preventDefault();ctx.aller(STEPS.findIndex(s=>s.cle==='drep'));}};
root.addEventListener('click',surSaut);
/* une fiche de mot qui s'ouvre sous le texte : on la ramène à l'écran (le noyau ne le fait pas) */
const surMot=e=>{if(e.target.closest&&e.target.closest('.mot'))setTimeout(()=>{const z=$('#motz');if(z&&z.firstChild)z.scrollIntoView({block:'nearest',behavior:ctx.RM.matches?'auto':'smooth'});},30);};
root.addEventListener('click',surMot);

return {BEATS,STEPS,CTL,mots,
  reset(){S.hbs=false;S.types=new Set();S.look=new Set();S.schema=0;S.schemaKo=new Set();S.riboMax=1;},
  plain:s=>s.replace(/(\d)′/g,'$1 prime').replace(/1ʳᵉ/g,'première').replace(/1ᵉʳ/g,'premier').replace(/(\d)ᵉ/g,'$1ième').replace(/n° /g,'numéro ')
    .replace(/β/g,'bêta ').replace(/α/g,'alpha ').replace(/–/g,', ').replace(/\b[ACGTU]{2,}\b/g,m=>m.split('').join(' ')),
  demonter(){tk++;root.removeEventListener('click',surMot);root.removeEventListener('click',surSaut);}};
});
}
