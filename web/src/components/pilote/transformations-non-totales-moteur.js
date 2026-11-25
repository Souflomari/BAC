/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Transformations non totales », V3 (plan : docs/refonte/specs/transformations-non-totales.md ; la
 * section 0 du plan dit ce qui a été livré). Première leçon de chimie au format v3.
 *
 * Dix parties, 52 étapes : ce qu'il faut savoir (sautable), l'énigme (deux flacons de même concentration, deux
 * pH), Brønsted et l'équation de l'acide avec l'eau, le tableau et τ par le pH, la solution à la loupe, sur cent
 * molécules (les deux réactions, l'équilibre dynamique, la double flèche), les pièges de l'équilibre, la
 * dilution, le retour à l'énigme, deux sujets du bac (2022 et 2023), le bilan.
 *
 * Les scènes vivent dans transformations-non-totales-scenes-{a,b,c,d}.js, les données sourcées et les calculs
 * dans transformations-non-totales-outils.js : AUCUN nombre affiché n'est écrit à la main ici, il vient d'un
 * calcul ou d'une donnée sourcée. Le déroulé, les paris et les dérivations sont dans noyau.js.
 *
 * Ce qui reste local : le bouton « Tic suivant » (`tic`), les deux curseurs C et pH (`ph`), les boutons « passer ».
 */
import { monterLecon } from "./noyau";
import {
  fr, sciH, sciF, TN, outilsTnt, C0, V_ML, V_L, N0, PH_HCL, PH_ETH, H_ETH, XF, TAU, FOIS_H, DIFF_PH, RAP_PH, C_DIL, PH_DIL, TAU_DIL,
  NM, SAV_N, SAV_PH, FAUX, TF, TF2, RP, LIM, DC, S22, S23, S21, S12, PALIER, VIT, DILPAL, SERIE, SERIE_DEFAUTS, RING, CRANS_C, PH_MAX, phMin, hDe, tauDePh, TICS,
} from "./transformations-non-totales-outils";
import { scenesA } from "./transformations-non-totales-scenes-a";
import { scenesC } from "./transformations-non-totales-scenes-c";
import { scenesD } from "./transformations-non-totales-scenes-d";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,clamp,scenes,S,defs}=ctx;
const $=ctx.$;
const tx=String.raw;
const O=outilsTnt(ctx);
// la série de tics est figée : si l'une de ses contraintes manque, la leçon refuse de se monter
if(SERIE_DEFAUTS.length)throw new Error('série de tics invalide : '+SERIE_DEFAUTS.join(' ; '));

/* ---------- les nombres du texte, tous calculés ---------- */
const Cv=sciH(C0,1), Vml=fr(V_ML,0), Vl=fr(V_L,3), n0=sciH(N0,1), phE=fr(PH_ETH,1), phC=fr(PH_HCL,1), hE=sciH(H_ETH,1), xfv=sciH(XF,1);
const tauS=fr(TAU,3), tauP=fr(TAU*100,1), tau2=fr(TAU,2), pc4=fr(TAU*100,0), fois=fr(FOIS_H,0), dph=fr(DIFF_PH,1), rph=fr(RAP_PH,1);
const nQ=fr(SERIE.n[35],0), nvitB=fr(VIT.B,0), nP=fr(PALIER.n,0), tauPal=fr(PALIER.tau,2), restePal=fr(PALIER.fauxReste*100,0), nvit=fr(VIT.F,0);
const CdilS=sciH(C_DIL,1), phD=fr(PH_DIL,2), tauD=fr(TAU_DIL,2), pcD=fr(TAU_DIL*100,0), tauDfx=fr(DC.fauxAvant,3), nDil=fr(DILPAL.apres,0), nAvant=fr(DILPAL.avant,0);
const n0sav=sciH(SAV_N.n,1), phS=fr(SAV_PH.pH,1), hS=sciH(SAV_PH.h,1), hSx=sciH(SAV_PH.fauxInv,1), hEth=sciH(hDe(PH_ETH),1);
const rapT=fr(RP.tau,2), rapPh=fr(RP.pH,1);
const CaS=sciH(S22.Ca,0), hS22=sciH(S22.h,1), tauS22=sciH(S22.tau,1), tauS22p=fr(S22.tau*100,1), pH22=fr(S22.pH,1), tauInv22=fr(S22.inv,0), hS22s=sciH(Number(S22.h.toPrecision(2)),1);
const CAS=sciH(S23.CA,0), pH23=fr(S23.pH,2), tauS23=sciH(S23.tau,2), alpha23=fr(S23.alpha,3), tauFx23=fr(S23.fauxAlphaTau,3), sansC23=fr(S23.fauxSansC,3);
const tauS21=fr(S21.tau,4), tauS21p=fr(S21.tau*100,2), pH21=fr(S21.pH,2), tauS12=fr(S12.tau,2);
const bq=(a,d)=>fr(a,d);

/* ---------- les pièges des copies qui se jouent sur la scène « quiz » ---------- */
const QUIZ=[
  {titre:'Piège de copie',tag:'sujet 2022, question 1.2',big:`*τ* = *C* / [H_{3}O^{+}] = ${sciF(S22.Ca,0)} / ${sciF(Number(S22.h.toPrecision(2)),1)} ≈ ${tauInv22}`,sub:'la copie',r1:'le rapport est inversé : *τ* ≤ 1 l’aurait signalé',r2:`*τ* = [H_{3}O^{+}]_{f} / *C* ≈ ${sciF(S22.tau,1)}`},
  {titre:'Piège de copie',tag:'Brønsted',big:'CH_{3}COO^{−} ou H_{3}O^{+} ?',sub:'laquelle est une base, au sens de Brønsted',r1:'CH_{3}COO^{−} : elle peut capter un proton',r2:'H_{3}O^{+} est un acide : il peut en céder un'},
  {titre:'Piège de copie',tag:`sujet 2021 : « montrer que τ ≈ ${tauS21p} % »`,big:`*τ* = ${tauS21}`,sub:'le résultat du calcul',r1:`${tauS21} × 100 = ${tauS21p} %`,r2:'la même valeur : *τ* est un rapport, sans unité'},
];
scenesA(ctx,O);
scenesC(ctx,O);
scenesD(ctx,O,QUIZ);

/* ---------- des écritures pour le panneau ---------- */
const IX={'x_max':'<i>x</i><sub>max</sub>','x_f':'<i>x</i><sub>f</sub>','[H₃O⁺]_f':'[H₃O⁺]<sub>f</sub>','[H₃O⁺]_éq':'[H₃O⁺]<sub>éq</sub>','C_a':'<i>C</i><sub>a</sub>','C_A':'<i>C</i><sub>A</sub>','τ':'<i>τ</i>','α':'<i>α</i>','C':'<i>C</i>','V':'<i>V</i>','x':'<i>x</i>','n':'<i>n</i>'};
// une lettre seule (C, V, x) ne devient une variable que si aucune lettre, chiffre ou apostrophe ne la touche : « Cl⁻ » et « CH₃COOH » gardent leur C
const IXRE=/(^|[^\p{L}\p{N}_])(C|V|x|n)(?![\p{L}\p{N}_’'])|\[H₃O⁺\]_f|\[H₃O⁺\]_éq|x_max|x_f|C_a|C_A|τ|α/gu;
const ix=s=>typeof s!=='string'?s:s.split(/(<sub>.*?<\/sub>|<sup>.*?<\/sup>|<i>.*?<\/i>|<[^>]+>|\[\[[^\]]*\]\])/).map((p,i)=>i%2?p:p.replace(IXRE,(m,pre,lettre)=>lettre?pre+IX[lettre]:IX[m]||m)).join('');

// un pari : neutre à l'écran ; `juste` (3ᵉ case) ne sert qu'au profil de fin
const BET=t=>({opts:t.map(([x,fb,j])=>({t:ix(x),fb:ix(fb),juste:!!j}))});
// une question : une bonne réponse ; chaque option fausse a son explication et son indice (second essai)
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>({t:ix(x),ok,fb:ix(fb),indice:ix(indice)}))});
// un bouton « passer » : seulement si la question d'entrée est réussie du premier coup
const saut=(cle,vers,oui,non)=>({get html(){return ctx.juste(cle)?`<button type="button" class="ctl-btn alt saut" data-aller="${vers}">${oui} →</button>`:`<p class="small">${non}</p>`;}});
const dyn=f=>({get html(){return f();}});

/* les états de scène : chaque étape les donne en entier, rien ne se hérite à l'aveugle */
const BE=o=>({jeu:'becher',sub:'',flacons:1,acide:'ethan',ph:0,ph2:0,pv:0,nomx:'',dil:1,...o});
const ZO=o=>({jeu:'zoom',sub:'',acide:'ethan',depart:'acide',tic:0,graph:0,lisse:0,ring:-1,hist:0,cpt:0,eq:0,etiq:0,vol:1,ymax:20,vign:0,vtr:0,leg:1,gros:0,tr:0,...o});
const DU=o=>({jeu:'duo',sub:'',...o});
const AV=o=>({cases:0,lit:0,fx:-1,cache:-1,cache2:-1,exces:1,tete:'generique',conc:'C',squelette:0,sub:'',...o});
const BA=o=>({xm:1,xf:0,tau:0,C:C0,pH:PH_ETH,cur:0,sub:'',...o});
const BC=o=>({eqn:0,n:0,...o});
const GROS=o=>ZO({gros:1,leg:0,...o});
const phTau=t=>-Math.log10(t*C0);   // le pH d'un τ donné, pour la scène `barres`
const SUBETH='AH : CH₃COOH ; l’eau n’est pas dessinée';

/* ---------- les rappels qui dépendent d'un pari ---------- */
function rappelEnigme(){const j=S.first['deux-flacons'];if(j==null)return '';
  return [`Tu avais parié 2,0 aussi : le pH de l’acide éthanoïque est ${phE}.`,`Tu avais parié plus de 2,0 : il est de ${phE}.`,`Tu avais parié moins de 2,0 : il est plus grand, ${phE}.`][j];}
function rappelAttendre(){const j=S.first.attendre;if(j==null)return '';
  return ['Tu avais parié que le compte monte jusqu’à 100 : il se stabilise.','Tu avais parié juste : le compte monte, puis se stabilise.','Tu avais parié qu’il redescend à 0 : il se stabilise.'][j];}
function rappelDilution(){const j=S.first['dilution-pari'];if(j==null)return '';
  return ['Tu avais parié que τ ne change pas : il augmente.','Tu avais parié juste : τ augmente.','Tu avais parié que τ diminue : il augmente.'][j];}

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Acide et base',court:'Brønsted'},
  {name:'Jusqu’où l’acide a réagi',court:'τ'},{name:'La solution à la loupe',court:'Loupe'},{name:'L’équilibre et ses pièges',court:'Équilibre'},
  {name:'La dilution',court:'Dilution'},{name:'Retour à l’énigme',court:'Retour'},{name:'Au bac',court:'Au bac'},{name:'Bilan',court:'Bilan'}];

const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'sav-test',beat:0,scene:'avancement',set:AV({sub:'Ce qu’il faut savoir',squelette:1,tete:'aucune'}),sujet:'la quantité de matière, n = C V',
  text:['Ce qu’il faut savoir : juste du premier coup, tu passes à l’énigme.',`Une solution a pour concentration C = ${Cv} mol·L⁻¹ et pour volume V = ${Vml} mL. La quantité de matière n vaut…`],
  verifie:{...VF([
    [`${n0sav} mol`,true,`Oui : ${Vml} mL = ${Vl} L, donc n = C × V = ${n0sav} mol.`],
    [`${fr(SAV_N.fauxMl,1)} mol`,false,`Tu as laissé V en mL. Convertis d’abord : ${Vml} mL = ${Vl} L, puis n = C × V.`,'Dans n = C × V, en quelle unité faut-il exprimer V ?'],
    [`${fr(SAV_N.fauxDiv,2)} mol`,false,'Tu as divisé C par V. Une quantité de matière est un produit : n = C × V.','Une quantité de matière est-elle C divisée par V, ou C multipliée par V ?']]),
    apres:saut('sav-test','deux-flacons','Je le sais : passer à l’énigme','La suite te le rappelle.')}},
{cle:'sav-ph',beat:0,scene:'solution',set:BE({ph:1,pv:SAV_PH.pH,nomx:'une solution'}),sujet:'[H₃O⁺] = 10^(−pH)',
  text:[`Le pH d’une solution vaut ${phS}.`,'La concentration en ions H₃O⁺ vaut…'],
  verifie:{...VF([
    [`${hS} mol·L⁻¹`,true,`Oui : [H₃O⁺] = 10<sup>−pH</sup> = 10<sup>−${phS}</sup> = ${hS} mol·L⁻¹.`],
    [`${phS} mol·L⁻¹`,false,'Tu as pris le pH pour une concentration. Le pH n’a pas d’unité : [H₃O⁺] = 10<sup>−pH</sup>.','Le pH est-il une concentration, avec une unité ?'],
    [`${hSx} mol·L⁻¹`,false,'Tu as perdu le signe de l’exposant. Plus le pH est grand, moins il y a d’ions H₃O⁺.','Quand le pH augmente, y a-t-il plus ou moins d’ions H₃O⁺ ?']]),
    apres:{tex:[[tx`[\mathrm{H_3O^+}]=10^{-\mathrm{pH}}`,'[H₃O⁺] = 10^(−pH)']],html:`<p>À la calculatrice, 10<sup>−${phE}</sup> ≈ ${hEth}. Le [[ph|pH]] se lit au pH-mètre ; ses valeurs, ici, sont [[phcalc|calculées]].</p>`}}},
{cle:'sav-rappel',beat:0,scene:'avancement',set:AV({sub:'trois lignes : l’état initial, en cours, final',squelette:1,tete:'aucune'}),
  text:['Deux rappels avant d’avancer. Un tableau d’avancement a trois lignes : l’état initial, un état en cours, l’état final.','L’avancement maximal x_max est celui qui épuise le réactif limitant.']},

/* ===== 1. l'énigme ===== */
{cle:'deux-flacons',beat:1,scene:'solution',set:BE({flacons:2,ph:1,ph2:0}),
  text:[`Deux flacons de même concentration, C = ${Cv} mol·L⁻¹ : de l’acide chlorhydrique, et de l’acide éthanoïque, celui du vinaigre.`,'Chaque molécule de l’un comme de l’autre porte un proton qu’elle peut céder.',`Le premier pH-mètre affiche ${phC} (les pH de la leçon sont [[phcalc|calculés]]). Dans l’acide éthanoïque, il affichera…`],
  pari:{reveal:[{p:{ph2:1},d:1400}],...BET([
    ['2,0 aussi','Tu as supposé que chaque molécule cède son proton : le pH serait alors le même. Le pH-mètre dit autre chose.'],
    ['plus de 2,0','Oui : un pH plus grand, c’est moins d’ions H₃O⁺ que dans l’acide chlorhydrique. La suite compte de combien.',1],
    ['moins de 2,0','Tu as pris « acide » pour « beaucoup d’ions H₃O⁺ ». Le pH-mètre dit le contraire : un pH plus grand, c’est moins d’ions.']])}},
{cle:'ecart',beat:1,scene:'solution',set:BE({flacons:2,ph:1,ph2:1}),sujet:'comparer deux pH : un facteur 10 par unité',
  text:[`${phE} au lieu de ${phC}.`,'Combien de fois moins d’ions H₃O⁺ y a-t-il dans l’acide éthanoïque ?'],
  verifie:{...VF([
    [`${fois} fois moins`,true,`Oui : 10<sup>${phE} − ${phC}</sup> = 10<sup>${dph}</sup> ≈ ${fois}, environ ${fois} fois moins d’ions.`],
    [`${dph} fois moins`,false,'Tu as lu la différence des pH comme un rapport. Une unité de pH, c’est un facteur 10 sur [H₃O⁺].','Une unité de pH de plus change [H₃O⁺] de quel facteur ?'],
    [`${rph} fois moins`,false,`Tu as divisé ${phE} par ${phC} : le pH n’est pas proportionnel à [H₃O⁺]. Compare 10<sup>−${phC}</sup> et 10<sup>−${phE}</sup>.`,'Le pH est-il proportionnel à [H₃O⁺], ou lié par une puissance de 10 ?']]),
    apres:{tex:[[tx`\dfrac{10^{-${TN(PH_HCL,1)}}}{10^{-${TN(PH_ETH,1)}}}=10^{${TN(DIFF_PH,1)}}\approx ${TN(FOIS_H,0)}`,`10^(−${phC}) / 10^(−${phE}) = 10^${dph} ≈ ${fois}`]]}}},
{cle:'question',beat:1,scene:'solution',set:BE({flacons:2,ph:1,ph2:1}),
  text:['Même concentration, même proton à céder.',{t:'Où sont passés les protons qui manquent ?',fort:true}]},

/* ===== 2. acide et base ===== */
{cle:'bronsted',beat:2,scene:'solution',tag:'1923',set:GROS({acide:'nh3',tr:0}),
  text:['L’ammoniac NH₃, dissous dans l’eau, donne une solution basique : c’est le chapeau du sujet 2020.','D’où viennent les ions HO⁻ de la solution ?'],
  pari:{reveal:[{p:{tr:1},d:1800}],
    apres:{html:'<p>En 1923, Brønsted et Lowry, chacun de son côté, définissent un [[acide]] comme une espèce qui peut céder un proton H⁺, et une [[base]] comme une espèce qui peut en capter un.</p>'},
    ...BET([
    ['NH₃ contient des ions HO⁻ et les libère','Tu as supposé que NH₃ contient des ions HO⁻. Sa formule n’en porte aucun : regarde ce que devient l’eau.'],
    ['NH₃ prend un proton H⁺ à l’eau, qui donne HO⁻','Oui : le proton passe de l’eau à NH₃, qui devient NH₄⁺, et l’eau devient HO⁻.',1],
    ['l’eau seule en fournit : NH₃ n’y est pour rien','Tu as supposé que l’eau seule rend la solution basique. Sans NH₃, elle ne le fait pas : c’est NH₃ qui lui prend un proton.']])}},
{cle:'acide',beat:2,scene:'solution',set:GROS({acide:'ethan',tr:0}),sujet:'l’espèce qui reste quand un acide a cédé un proton',
  text:['CH₃COOH est un acide : il peut céder un proton.','L’espèce qui reste est…'],
  verifie:{...VF([
    ['CH₃COO⁻',true,'Oui : il perd un H⁺, la charge baisse de 1 : CH₃COOH devient CH₃COO⁻.'],
    ['CH₃COOH₂⁺',false,'Tu as ajouté un proton au lieu d’en retirer. Céder, c’est perdre H⁺ : la charge baisse de 1.','Céder un proton, c’est en gagner ou en perdre un ?'],
    ['HO⁻',false,'Tu as pris HO⁻ pour la base de tous les acides. La base qui reste garde tout l’acide, sauf un H⁺.','Que reste-t-il de CH₃COOH quand il perd un H⁺ ?']])}},
{cle:'couple',beat:2,scene:'solution',set:GROS({acide:'ethan',tr:0}),sujet:'écrire un couple acide/base',
  text:['Un acide et la base qu’il devient forment un [[couple]], écrit acide/base : AH/A⁻.','Le couple de l’ion ammonium s’écrit…'],
  tex:[[tx`\mathrm{AH}\rightleftarrows\mathrm{A^-}+\mathrm{H^+}`,'AH ⇄ A⁻ + H⁺']],
  verifie:{...VF([
    ['NH₄⁺/NH₃',true,'Oui : NH₄⁺ est l’acide, il cède H⁺ et devient la base NH₃.'],
    ['NH₃/NH₄⁺',false,'Tu as écrit la base avant l’acide. Un couple s’écrit acide/base.','Dans un couple, lequel s’écrit en premier ?'],
    ['NH₄⁺/HO⁻',false,'Tu as pris HO⁻ pour la base de NH₄⁺. La base du couple est ce qui reste quand NH₄⁺ a cédé H⁺.','Que reste-t-il de NH₄⁺ quand il perd un H⁺ ?']]),
    apres:{html:'<p>A⁻ s’appelle la [[baseconj|base conjuguée]] de AH.</p>'}}},
{cle:'eau-base',beat:2,scene:'solution',set:GROS({acide:'ethan',tr:0}),sujet:'l’équation de l’acide avec l’eau',
  text:['Un acide ne cède son proton qu’à une base.','Dans la solution, la base la plus présente est l’eau.','Les flèches des équations ci-dessous sont provisoires : la leçon dira plus loin laquelle convient.'],
  deriv:[{tex:tx`\mathrm{CH_3COOH}\rightleftarrows\mathrm{CH_3COO^-}+\mathrm{H^+}`,alt:'CH₃COOH ⇄ CH₃COO⁻ + H⁺',r:'le couple de l’acide'},{tex:tx`\mathrm{H_2O}+\mathrm{H^+}\rightleftarrows\mathrm{H_3O^+}`,alt:'H₂O + H⁺ ⇄ H₃O⁺',r:'l’eau capte le proton : couple H₃O⁺/H₂O, ion [[oxonium]]'}],
  pari:{label:'L’équation de la réaction ?',reveal:[{p:{tr:1},d:1500}],
    ...VF([
    ['CH₃COOH(aq) + H₂O(l) → CH₃COO⁻(aq) + H₃O⁺(aq)',true,'Oui : l’acide cède H⁺ à l’eau, qui devient H₃O⁺.'],
    ['CH₃COOH(aq) → CH₃COO⁻(aq) + H⁺(aq)',false,'Tu as pris la demi-équation du couple pour l’équation de la réaction. Un proton ne reste pas seul : il faut la base qui le capte.','Où va le proton qui part de l’acide ?'],
    ['CH₃COOH(aq) + HO⁻(aq) → CH₃COO⁻(aq) + H₂O(l)',false,'C’est la réaction avec la soude, pas avec l’eau. Ici, la base qui capte le proton est H₂O.','Y a-t-il des ions HO⁻ au départ dans la solution d’acide ?']])}},
{cle:'couples-eq',beat:2,scene:'solution',set:GROS({acide:'ethan',tr:1}),sujet:'les deux couples de la réaction',
  text:['Les deux couples de cette réaction sont…'],
  verifie:{...VF([
    ['CH₃COOH/CH₃COO⁻ et H₃O⁺/H₂O',true,'Oui : chaque couple a un acide et sa base, qui diffèrent d’un H⁺.'],
    ['CH₃COOH/H₂O et CH₃COO⁻/H₃O⁺',false,'Tu as mis les deux réactifs ensemble, puis les deux produits. Un couple, c’est un acide et l’espèce qu’il devient.','Un couple relie-t-il deux espèces qui se transforment l’une en l’autre ?'],
    ['CH₃COOH/H₃O⁺ et H₂O/CH₃COO⁻',false,'Tu as mis deux acides ensemble. Chaque couple a un acide et une base, qui diffèrent d’un H⁺.','Chaque couple a-t-il un acide et une base ?']])}},
{cle:'ampholyte',beat:2,scene:'solution',set:GROS({acide:'nh3',tr:0}),sujet:'le rôle de l’eau face à une base',
  text:['Dans NH₃ + H₂O ⇄ NH₄⁺ + HO⁻, l’eau joue le rôle…'],
  verifie:{...VF([
    ['d’acide : elle cède un proton',true,'Oui : H₂O perd un H⁺ et devient HO⁻, du couple H₂O/HO⁻.'],
    ['de base, comme avec l’acide éthanoïque',false,'Tu as gardé le rôle de l’eau d’avant. Face à une base, l’eau cède son proton : elle est acide.','L’eau capte-t-elle ou cède-t-elle un proton face à NH₃ ?'],
    ['de solvant seulement, sans réagir',false,'Tu as pris l’eau pour un simple décor. Elle a perdu un H⁺ : elle a réagi.','L’eau a-t-elle perdu un H⁺ dans cette équation ?']]),
    reveal:[{p:{tr:1},d:1500}],
    apres:{html:'<p>L’eau est un [[ampholyte]] : acide dans H₂O/HO⁻, base dans H₃O⁺/H₂O.</p><p class="small">La double flèche ⇄ s’explique plus loin dans la leçon.</p>'}}},

/* ===== 3. jusqu'où l'acide a réagi ===== */
{cle:'tableau',beat:3,scene:'avancement',set:AV({lit:0,cases:0,exces:0,sub:'AH + H₂O ⇄ A⁻ + H₃O⁺ : une quantité par espèce'}),sujet:'x_max, la quantité de matière de départ',
  text:[`On met ${Vml} mL de solution d’acide éthanoïque, de concentration C = ${Cv} mol·L⁻¹.`,'Le tableau suit la quantité de chaque espèce, de l’état initial à l’état final.'],
  deriv:[{tex:tx`n_0(\mathrm{AH})=C\,V`,alt:'n₀(AH) = C V',r:'on n’a mis que l’acide : A⁻ et H₃O⁺ valent 0',p:{cases:4}},
    {tex:tx`n(\mathrm{AH})=C\,V-x`,alt:'n(AH) = C V − x',r:'un AH consommé pour un A⁻ et un H₃O⁺ formés',p:{cases:8}}],
  pari:{label:'x_max = ?',reveal:[{p:{lit:1,exces:1},d:700}],...VF([
    [`${n0} mol`,true,`Oui : AH est le réactif limitant, l’eau est le solvant, en excès. x_max épuise AH : x_max = C V = ${n0} mol.`],
    ['impossible sans la quantité d’eau',false,'Tu as cherché le réactif limitant du côté de l’eau. L’eau est le solvant, en excès : seul AH peut limiter.','Laquelle des deux espèces ne risque pas de manquer ?'],
    [`${fr(SAV_N.fauxMl,1)} mol`,false,`Tu as laissé V en mL. ${Vml} mL = ${Vl} L, donc C V = ${n0} mol.`,'Dans C V, en quelle unité faut-il exprimer V ?']])}},
{cle:'si-totale',beat:3,scene:'barres',set:BA({xm:1,xf:0,tau:0,pH:PH_HCL}),sujet:'le pH d’une réaction totale',
  text:['Si la réaction était totale, [H₃O⁺]_f vaudrait C.','Le pH serait alors…'],
  verifie:{...VF([
    [`${phC}`,true,`Oui : 10<sup>−pH</sup> = ${Cv} mol·L⁻¹ donne pH = ${phC}, exactement l’acide chlorhydrique.`],
    [`−${phC}`,false,`Tu as recopié le signe de l’exposant. Si [H₃O⁺] = 10<sup>−pH</sup> = ${Cv}, alors pH = ${phC}, pas −${phC}.`,`[H₃O⁺] = 10^(−pH) : quel pH donne ${Cv} ?`],
    [`${Cv}`,false,`Tu as donné la concentration à la place du pH. Le pH est un nombre sans unité : ici ${phC}.`,'Le pH s’exprime-t-il en mol·L⁻¹ ?']])}},
{cle:'xf',beat:3,scene:'solution',set:BE({ph:1}),sujet:'x_f à partir du pH',
  text:[`Le pH vaut ${phE} dans la solution d’acide éthanoïque (C = ${Cv} mol·L⁻¹, V = ${Vml} mL).`,'On néglige les ions H₃O⁺ venus de l’eau seule.'],
  deriv:[{tex:tx`[\mathrm{H_3O^+}]_\mathrm{f}=10^{-\mathrm{pH}}=${TN(H_ETH*1e4,1)}\times10^{-4}\ \mathrm{mol\cdot L^{-1}}`,alt:`[H₃O⁺]_f = 10^(−pH) = ${hE} mol·L⁻¹`,r:'la concentration en ions H₃O⁺ se lit sur le pH'},
    {tex:tx`n(\mathrm{H_3O^+})_\mathrm{f}=x_\mathrm{f}`,alt:'n(H₃O⁺)_f = x_f',r:'la ligne finale du tableau : un H₃O⁺ formé pour chaque x'}],
  pari:{label:'x_f = ?',...VF([
    [`${xfv} mol`,true,`Oui : x_f = [H₃O⁺]_f × V = ${hE} × ${Vl} = ${xfv} mol.`],
    [`${hE} mol`,false,'Tu as pris la concentration pour une quantité. Multiplie par le volume : x_f = [H₃O⁺]_f × V.','Une concentration en mol·L⁻¹ est-elle déjà une quantité en mol ?'],
    [`${fr(FAUX.xfPh,2)} mol`,false,`Tu as pris le pH pour une concentration : ${phE} × ${Vl}. La concentration est 10<sup>−pH</sup>.`,'Le pH est-il une concentration ?']])}},
{cle:'comparer',beat:3,scene:'barres',set:BA({xm:1,xf:0,tau:0}),sujet:'comparer x_f et x_max',
  text:[`On compare x_f = ${xfv} mol à x_max = ${n0} mol.`,'Que dire de x_f par rapport à x_max ?'],
  verifie:{...VF([
    ['x_f < x_max : l’acide n’a pas tout réagi',true,'Oui : x_f est bien plus petit que x_max, et la transformation s’arrête là : x_f ne bouge plus.'],
    ['x_f = x_max, à la précision du pH-mètre près',false,'Tu as mis l’écart sur le compte de la mesure. Un écart aussi grand ne vient pas d’une erreur de mesure : x_f < x_max.','Un écart aussi grand peut-il venir d’une erreur de mesure ?'],
    ['x_f < x_max : la réaction n’a pas encore fini',false,'Tu as pensé que la réaction est en cours. x_f est celui de l’état final : la loupe, plus loin, montre pourquoi la transformation s’arrête là.','L’état final est-il un état en cours, ou celui où plus rien ne change ?']]),
    reveal:[{p:{xf:1},d:900}]}},
{cle:'tau-def',beat:3,scene:'barres',set:BA({xm:1,xf:1,tau:0}),sujet:'le taux d’avancement final, τ = x_f / x_max',
  text:['Le rapport de x_f à x_max a un nom : le [[tauxavancement|taux d’avancement final]], noté τ.','τ = ?'],
  tex:[[tx`\tau=\dfrac{x_\mathrm{f}}{x_\mathrm{max}}`,'τ = x_f / x_max']],
  verifie:{...VF([
    [`${tauS}`,true,`Oui : x_f / x_max = ${xfv} / ${n0} = ${tauS}, soit ${tauP} %.`],
    [`${fr(FAUX.tauInv,0)}`,false,'Tu as inversé le rapport. τ ≤ 1 : x_f, le plus petit, est au numérateur.','x_f et x_max : lequel est le plus petit, et où le met-on ?'],
    [`${sciH(FAUX.tauSurC,1)}`,false,'Tu as divisé x_f par C, une concentration. Une quantité se divise par une quantité : x_max.','x_f est en mol : par quelle grandeur en mol le divise-t-on ?']]),
    reveal:[{p:{tau:1},d:700}],
    apres:{html:`<p>${tauS} et ${tauP} % sont la même valeur ; ${tauS} % serait cent fois moins.</p>`}}},
{cle:'tau-formule',beat:3,scene:'barres',set:BA({xm:1,xf:0,tau:0,C:TF2.C,pH:TF2.pH}),sujet:'τ = 10^(−pH) / C',
  text:['Avec le tableau, x_f et x_max s’écrivent en fonction de la concentration et du volume.'],
  deriv:[{tex:tx`\tau=\dfrac{x_\mathrm{f}}{x_\mathrm{max}}=\dfrac{[\mathrm{H_3O^+}]_\mathrm{f}\,V}{C\,V}`,alt:'τ = x_f / x_max = [H₃O⁺]_f V / (C V)',r:'le tableau : x_f = [H₃O⁺]_f V et x_max = C V'},
    {tex:tx`\tau=\dfrac{10^{-\mathrm{pH}}}{C}`,alt:'τ = 10^(−pH) / C',r:'V se simplifie'}],
  pari:{label:`Un acide, C = ${sciH(TF2.C,1)} mol·L⁻¹ et pH = ${fr(TF2.pH,1)} : τ = ?`,reveal:[{p:{xf:1,tau:1},d:800}],...VF([
    [`τ = ${fr(TF2.tau,2)}`,true,`Oui : 10<sup>−${fr(TF2.pH,1)}</sup> / ${sciH(TF2.C,1)} = ${fr(TF2.tau,2)} : ${fr(TF2.tau*100,0)} % de l’acide a réagi.`],
    [`τ = ${sciH(TF2.fauxSansC,1)}`,false,'Tu as oublié de diviser par C. τ = 10<sup>−pH</sup> / C, pas 10<sup>−pH</sup> seul.','Le rapport est-il 10^(−pH) seul, ou divisé par une autre grandeur ?'],
    ['on ne peut pas : le volume V manque',false,'Tu as cru qu’il faut V. Il se simplifie : seuls le pH et C comptent.','V figure-t-il encore dans la formule simplifiée ?']])}},
{cle:'curseur-ph',beat:3,scene:'barres',ctl:'ph',needLabel:'Bouge les deux curseurs d’abord',set:BA({xm:1,xf:1,tau:1,cur:1,sub:'les deux curseurs, C et pH'}),
  text:['Bouge les deux curseurs, C et pH, et regarde ce que devient τ.','Le curseur du pH s’arrête là où τ = 1 : un acide ne fournit pas plus d’ions H₃O⁺ qu’il n’a de molécules.']},
{cle:'curseur-verifie',beat:3,scene:'barres',set:BA({xm:1,xf:1,tau:1,cur:1,sub:'τ, C et pH'}),sujet:'une unité de pH de plus, à C fixée',
  text:['À C fixée, le pH augmente d’une unité.','Que devient τ ?'],
  verifie:{...VF([
    ['τ est divisé par 10',true,'Oui : τ = 10<sup>−pH</sup> / C, et 10<sup>−(pH+1)</sup> = 10<sup>−pH</sup> / 10.'],
    ['τ est multiplié par 10',false,'Tu as lu le pH comme un exposant positif. Un pH plus grand, c’est moins d’ions H₃O⁺ : τ baisse.','Un pH plus grand, c’est plus ou moins d’ions H₃O⁺ ?'],
    ['τ ne change pas',false,'Tu as supposé que τ ne dépend que de l’acide. À C fixée, τ = 10<sup>−pH</sup> / C change avec le pH : tu l’as vu en bougeant le curseur.','τ = 10^(−pH) / C : le pH y figure-t-il ?']])}},
{cle:'limitee',beat:3,scene:'barres',set:BA({xm:1,xf:1,tau:0,pH:phTau(LIM.tau),sub:`une transformation où ${fr(LIM.tau*100,0)} % de l’acide a réagi`}),sujet:'limitée ne veut pas dire « presque rien »',
  text:[`τ = ${fr(LIM.tau,2)}.`,'La transformation est…'],
  verifie:{...VF([
    [`limitée : τ < 1, même à ${fr(LIM.tau*100,0)} %`,true,`Oui : ${fr(LIM.tau*100,0)} % de l’acide a réagi, mais τ < 1 : la transformation s’arrête avant la fin.`],
    [`totale : ${fr(LIM.tau*100,0)} %, c’est presque tout`,false,'Tu as pris « presque tout » pour « tout ». Totale veut dire τ = 1, pas τ proche de 1.','Que vaut τ pour une transformation totale ?'],
    ['impossible : limitée veut dire presque rien',false,'Tu as lu « limitée » comme « il ne se passe presque rien ». Limitée veut dire « s’arrête avant la fin », quelle que soit la part qui a réagi.','Limitée parle-t-elle de la part qui a réagi, ou de l’arrêt avant la fin ?']]),
    reveal:[{p:{tau:1},d:700}],
    apres:{html:'<p>[[limitee|Transformation limitée (non totale)]] : x_f < x_max, τ < 1. Transformation totale : τ = 1.</p>'}}},

/* ===== 4. les deux réactions qui se croisent ===== */
{cle:'loupe',beat:4,scene:'solution',set:ZO({tic:0,leg:1,sub:SUBETH}),
  text:['On regarde la solution à la loupe, au moment du mélange : 100 molécules d’acide, notées AH.','Autour d’elles, l’eau, H₂O, que l’on ne dessine pas.']},
{cle:'transfert',beat:4,scene:'solution',set:ZO({tic:0,leg:1,sub:SUBETH}),seq:[{p:{tic:1},d:1500,w:500}],sujet:'l’eau qui capte un proton devient H₃O⁺',
  text:['Un proton passe d’une molécule AH à une molécule d’eau.',{t:'La molécule d’eau qui a capté le proton est devenue…',a:1}],
  verifie:{...VF([
    ['un ion H₃O⁺',true,'Oui : H₂O + H⁺ donne H₃O⁺, un ion oxonium.'],
    ['un ion HO⁻',false,'Tu as inversé les rôles : l’eau a gagné un H⁺, elle ne l’a pas perdu. HO⁻ serait une eau qui en a perdu un.','L’eau a-t-elle gagné ou perdu un H⁺ ?'],
    ['une molécule d’eau, inchangée',false,'Une eau qui a capté un proton n’est plus inchangée. Regarde où est le proton : il est sur elle.','Où est le proton, après le transfert ?']]),
    reveal:[{p:{leg:3},d:600}]}},
{cle:'inverse',beat:4,scene:'solution',set:ZO({tic:1,leg:3,vign:1,sub:SUBETH}),sujet:'A⁻ peut reprendre un proton',
  text:['Un ion A⁻ croise un ion H₃O⁺ : la vignette les montre en gros plan.','Que peut-il se passer ?'],
  verifie:{...VF([
    ['A⁻ capte un proton : AH et H₂O se reforment',true,'Oui : A⁻ est la base du couple AH/A⁻, il peut capter un proton.'],
    ['rien : A⁻ est un produit, la réaction ne revient pas',false,'Tu as pensé qu’un produit ne réagit plus. A⁻ est une base : il peut capter un proton.','A⁻ est la base d’un couple : que peut faire une base ?'],
    ['A⁻ cède un proton de plus, comme AH',false,'Tu as pris A⁻ pour un acide. Il n’a plus de proton à céder : c’est la base du couple.','Combien de H⁺ A⁻ a-t-il encore à céder ?']]),
    reveal:[{p:{vtr:1},d:1500}],
    apres:{html:'<p>En PC et SM, une rencontre qui réagit s’appelle un [[chocefficace|choc efficace]].</p>'}}},
{cle:'premiers-tics',beat:4,scene:'solution',ctl:'tic',needLabel:'Fais les cinq tics d’abord',set:ZO({tic:0,leg:3,graph:0,vign:0,ymax:100,sub:SUBETH}),seq:[{p:{graph:1},d:700}],
  text:['À chaque tic, quelques molécules AH cèdent leur proton, et quelques ions A⁻ en reprennent un.','Clique cinq fois sur « Tic suivant » et regarde le compte.']},
{cle:'attendre',beat:4,scene:'solution',set:ZO({tic:5,graph:1,leg:3,ymax:100,sub:SUBETH}),
  text:['On laisse tourner 25 tics de plus.','Le nombre d’ions A⁻…'],
  pari:{reveal:[{p:{tic:30,ymax:20},d:3000}],
    ...BET([
    ['monte régulièrement jusqu’à 100',`Tu as supposé que seul le sens direct agit. Le compte s’arrête à ${nP} sur 100, loin de 100.`],
    ['monte encore un peu, puis se stabilise',`Oui : le compte monte, puis se stabilise autour de ${nP} sur 100.`,1],
    ['redescend peu à peu jusqu’à 0',`Tu as supposé que le sens inverse l’emporte. Le compte ne redescend pas à 0 : il se stabilise autour de ${nP} sur 100.`]])}},
{cle:'palier',beat:4,scene:'solution',set:ZO({tic:30,graph:1,leg:3,lisse:0,sub:SUBETH}),sujet:`τ au palier, ${nP} molécules sur ${NM}`,
  text:[`Au palier, en moyenne ${nP} molécules sur ${NM} ont cédé leur proton.`,'Quel est le taux d’avancement final τ ?'],
  verifie:{...VF([
    [`${tauPal}`,true,`Oui : τ = ${nP}/${NM} = ${tauPal}, la valeur que le pH donnait dans la partie 4.`],
    [`${nP}`,false,'Tu as donné un nombre de molécules, pas un rapport. τ se divise par les 100 du départ.','τ est-il un nombre de molécules, ou un rapport entre deux nombres ?'],
    [`${fr(PALIER.fauxReste,2)}`,false,`Tu as donné la part des AH restés. τ compte ce qui a réagi : ${nP} sur 100.`,'τ compte-t-il les molécules qui ont réagi, ou celles qui restent ?']]),
    reveal:[{p:{lisse:1},d:1500}],
    apres:{html:'<p>Dans un vrai bécher, il y a des milliards de milliards de molécules : le compte ne fluctue plus, c’est la courbe lisse.</p>'}}},
{cle:'qui',beat:4,scene:'solution',set:ZO({tic:30,graph:1,leg:3,lisse:1,ring:RING.i,sub:SUBETH}),
  text:['Une molécule A⁻ est encadrée au tic 30.','Au tic 35, cette molécule…'],
  pari:{reveal:[{p:{tic:35,hist:1},d:2600}],...BET([
    ['est restée A⁻ : le compte ne bouge plus','Tu as lu un compte stable comme des molécules figées. Le compte garde sa valeur, pas les mêmes molécules.'],
    ['est redevenue AH, et une autre l’a remplacée',`Oui : au tic 35, la molécule encadrée est redevenue AH. Le compte, lui, est à ${nQ}, comme au tic 30.`,1],
    ['est redevenue AH : le compte a baissé de 1',`Tu as suivi le retour d’une molécule sans regarder le compte : au tic 35, il est resté à ${nQ}.`]])}},
{cle:'vitesses',beat:4,scene:'solution',set:ZO({tic:35,graph:1,leg:3,lisse:1,ring:-1,hist:0,cpt:0,sub:SUBETH}),
  text:['Pendant dix tics au palier, on compte les protons cédés par AH (sens direct) et les protons repris par A⁻ (sens inverse).','Combien de chaque ?'],
  pari:{reveal:[{p:{cpt:1},d:300},{p:{tic:45},d:4000}],
    apres:{html:'<p><b>Au palier, les deux réactions continuent, à la même vitesse.</b></p>'},
    ...BET([
    ['plus de cédés que de repris','Tu as supposé que le sens direct l’emporte. Au palier, le compte ne monte plus : il n’y a pas plus de protons cédés que de protons repris.'],
    ['autant de cédés que de repris, à un près',`Oui : ${nvit} cédés et ${nvitB} repris en dix tics, et le compte est stable.`,1],
    ['aucun de chaque : tout est arrêté','Tu as lu un compte stable comme un arrêt. Il reste stable parce que chaque sens continue, à la même vitesse.']])}},
{cle:'double-fleche',beat:4,scene:'solution',set:ZO({tic:45,graph:1,leg:3,lisse:1,eq:1,sub:SUBETH}),sujet:'la double flèche ⇄',
  text:['Comment écrire l’équation de ce que tu viens de compter ?'],
  verifie:{...VF([
    ['avec ⇄ : les deux réactions ont lieu en même temps',true,'Oui : ⇄ dit qu’il y a deux sens, ici simultanés.'],
    ['avec → : le sens direct l’a emporté au début',false,`Tu n’as gardé que le sens direct. → dit que l’acide disparaît : ici, il en reste ${restePal} %.`,'La flèche simple dit-elle que l’acide disparaît ? Qu’en reste-t-il ici ?'],
    ['avec ⇄ : la réaction est lente, donc inachevée',false,'Tu as pris ⇄ pour un signe de lenteur. La double flèche ne dit rien de la vitesse.','⇄ parle-t-elle d’un nombre de sens, ou d’une vitesse ?']]),
    reveal:[{p:{eq:2},d:700}],
    apres:{tex:[[tx`\mathrm{CH_3COOH_{(aq)}}+\mathrm{H_2O_{(l)}}\ \overset{1}{\underset{2}{\rightleftarrows}}\ \mathrm{CH_3COO^-_{(aq)}}+\mathrm{H_3O^+_{(aq)}}`,'CH₃COOH(aq) + H₂O(l) ⇄ CH₃COO⁻(aq) + H₃O⁺(aq)']],html:'<p>Le sens 1 est le sens direct, le sens 2 le sens inverse : c’est la forme du sujet 2012.</p>'}}},
{cle:'equilibre',beat:4,scene:'solution',set:ZO({tic:45,graph:1,leg:3,lisse:1,eq:2,etiq:0,sub:SUBETH}),sujet:'ce qui ne change plus à l’équilibre',
  text:['Le système est dans un [[equilibre|état d’équilibre]].','À l’état d’équilibre, ce qui ne change plus, c’est…'],
  verifie:{...VF([
    ['la quantité de chaque espèce',true,'Oui : les quantités sont constantes, parce que les deux vitesses sont égales.'],
    ['chaque molécule : celle qui est A⁻ le reste',false,'Tu as pris les molécules pour figées. Tu l’as vu : la molécule encadrée a changé, ce sont les quantités qui se stabilisent.','La molécule encadrée est-elle restée A⁻ ?'],
    ['rien : les vitesses sont devenues nulles',false,'Tu as confondu égales et nulles. Les deux vitesses restent positives, et elles sont égales.','Au palier, les protons cédés et repris étaient-ils nuls ?']]),
    reveal:[{p:{etiq:1},d:600}],
    apres:{html:'<p class="small">En PC et SM, c’est une capacité de ce chapitre. En SVT, c’est l’idée du chapitre suivant : l’équilibre dynamique.</p>'}}},
{cle:'hcl-zoom',beat:4,scene:'solution',set:ZO({acide:'hcl',tic:0,graph:0,leg:3,sub:'HCl ; l’eau n’est pas dessinée'}),sujet:'l’acide chlorhydrique à la loupe : τ = 1',
  text:[`La même loupe sur l’acide chlorhydrique, dont τ = ${fr(TF.tau,0)}.`,'Au palier, combien d’ions Cl⁻ sur 100 ?'],
  verifie:{...VF([
    ['100',true,'Oui : τ = 1, toutes les molécules ont cédé leur proton. L’équation s’écrit avec →.'],
    [`${nP}`,false,'Tu as repris la valeur de l’acide éthanoïque. Ici τ = 1 : toutes les molécules ont cédé.','Quel est τ pour l’acide chlorhydrique ?'],
    ['50',false,'Tu as lu l’équilibre comme « moitié-moitié ». Il est l’égalité des vitesses, pas celle des quantités.','L’équilibre partage-t-il les quantités en deux moitiés, ou égalise-t-il les vitesses ?']]),
    reveal:[{p:{tic:10},d:2200}]}},

/* ===== 5. l'équilibre et ses pièges ===== */
{cle:'rappel',beat:5,scene:'barres',set:BA({xm:1,xf:0,tau:0,pH:RP.pH}),sujet:'τ = 10^(−pH) / C',
  text:['Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.',`C = ${Cv} mol·L⁻¹ et pH = ${rapPh}. Que vaut τ ?`],
  verifie:{...VF([
    [`${rapT}`,true,`Oui : τ = 10<sup>−${rapPh}</sup> / ${Cv} = ${rapT}.`],
    [`${sciH(RP.fauxSansC,1)}`,false,'Tu as oublié de diviser par C. τ = 10<sup>−pH</sup> / C.','Le rapport est-il 10^(−pH) seul, ou divisé par C ?'],
    [`${fr(RP.fauxInv,0)}`,false,'Tu as inversé le rapport. τ ≤ 1 : 10<sup>−pH</sup> est au numérateur.','Un taux peut-il dépasser 1 ?']]),
    reveal:[{p:{xf:1,tau:1,pH:RP.pH},d:800}]}},
{cle:'catalyseur',beat:5,scene:'solution',set:ZO({tic:45,graph:1,leg:3,lisse:1,eq:2,sub:SUBETH}),sujet:'un catalyseur ne change pas τ',
  text:['Un [[catalyseur]] accélère une réaction sans être consommé.','Qu’advient-il de τ, pour une transformation limitée ?'],
  verifie:{...VF([
    ['τ ne change pas : l’équilibre est atteint plus vite',true,'Exactement : il accélère les deux sens autant, donc il ne déplace pas l’équilibre.'],
    ['τ augmente : le catalyseur aide la réaction à aller au bout',false,'Tu as supposé qu’une grande quantité de catalyseur change τ. Il accélère les deux sens autant : τ reste le même.','Un catalyseur accélère-t-il un sens plus que l’autre ?'],
    ['τ finit par valoir 1, mais il faut attendre plus longtemps',false,'Tu as pensé qu’il suffit d’attendre. Un catalyseur raccourcit l’attente, il ne change pas le palier.','Attendre plus longtemps change-t-il le palier du compte ?']]),
    apres:{html:'<p class="small">Tu le reverras avec l’estérification.</p>'}}},
{cle:'vitesse-avancement',beat:5,scene:'solution',set:ZO({tic:45,graph:1,leg:3,lisse:1,eq:2,sub:SUBETH}),sujet:'la vitesse et τ sont deux questions séparées',
  text:['Une réaction atteint son équilibre très vite.','Qu’en conclure sur τ ?'],
  verifie:{...VF([
    ['rien : la vitesse et τ sont deux questions séparées',true,'Exactement : la vitesse dit à quel rythme on avance, τ dit jusqu’où on va.'],
    ['qu’elle est totale : rapide, donc elle va au bout',false,`Tu as lié rapidité et fin de réaction. Rapide ou lente, une transformation peut s’arrêter à τ = ${tau2} ou aller jusqu’à τ = 1.`,'Une réaction rapide va-t-elle forcément jusqu’au bout ?'],
    ['qu’elle s’écrit avec ⇄ parce qu’elle est rapide',false,'Tu as lié ⇄ à la rapidité. ⇄ dit « deux sens », pas une vitesse.','⇄ parle-t-elle d’un nombre de sens, ou d’une vitesse ?']])}},
{cle:'quasi-totale',beat:5,scene:'barres',set:BA({xm:1,xf:1,tau:0,pH:phTau(S12.tau),sub:'sujet 2012 : l’acide éthanoïque et l’ammoniac'}),sujet:'⇄ et transformation presque totale',
  text:['Bac PC 2012, session normale, chimie, question 1-3 (1 pt) : l’équation de l’acide éthanoïque avec l’ammoniac est écrite avec ⇄.',`Le sujet demande de « s’assurer que la transformation est totale » ; son calcul donne τ ≈ ${tauS12}, que l’on cite ici.`,'⇄ dans l’équation, et pourtant « totale » : qu’en dire ?'],
  verifie:{...VF([
    ['ils vont ensemble : ⇄ dit deux sens, τ dit jusqu’où',true,`Oui : τ ≈ ${tauS12} est pratiquement totale, et l’équation reste écrite avec ⇄.`],
    ['ils s’excluent : avec ⇄, τ reste forcément petit',false,'Tu as lu ⇄ comme « τ est petit ». τ ne se lit pas sur la flèche, il se calcule.','⇄ donne-t-elle la valeur de τ ?'],
    ['le sujet se trompe : il fallait écrire → ici',false,'Tu as cru le sujet fautif. Il n’y a pas de contradiction : c’est τ qui tranche.','Qui décide si une transformation est totale : la flèche ou τ ?']])}},
{cle:'sens',beat:5,scene:'solution',set:ZO({depart:'ions',tic:0,graph:0,leg:3,sub:'on mélange des ions A⁻ et des ions H₃O⁺'}),sujet:'le sens d’évolution dépend de ce qu’on met',
  text:['On mélange de l’éthanoate de sodium (des ions A⁻) et de l’acide chlorhydrique (des ions H₃O⁺), ajouté en dernier.','Aucune molécule AH au départ. Il se forme…'],
  verifie:{...VF([
    ['de l’acide éthanoïque : A⁻ et H₃O⁺ réagissent',true,'Oui : A⁻ et H₃O⁺ sont les réactifs du sens 2, il se forme AH et H₂O.'],
    ['des ions éthanoate en plus : l’acide ajouté en dernier impose le sens direct',false,'Tu as cru que l’espèce ajoutée en dernier impose le sens. Regarde les réactifs présents : ici A⁻ et H₃O⁺, pas AH.','Quelles espèces sont présentes au départ : AH, ou A⁻ et H₃O⁺ ?'],
    ['rien : la réaction va de l’acide vers sa base, jamais l’inverse',false,'Tu as cru le sens fixé par l’équation. Il dépend de ce qu’on met : ici, A⁻ et H₃O⁺ réagissent.','Peut-on écrire ⇄ si la réaction ne va que dans un sens ?']]),
    reveal:[{p:{tic:15},d:3200}],
    apres:{html:'<p class="small">Prévoir ce sens par le calcul, c’est le chapitre sur l’évolution spontanée.</p>'}}},

/* ===== 6. la dilution ===== */
{cle:'dilution-pari',beat:6,scene:'solution',set:ZO({tic:45,graph:1,leg:3,lisse:1,vol:1,sub:'mêmes molécules, bocal dix fois plus grand'}),seq:[{p:{vol:10},d:1800}],
  text:['On dilue la solution 10 fois : les mêmes molécules AH, dans un bocal dix fois plus grand.','Le taux d’avancement final…'],
  pari:{reveal:[{p:{tic:80},d:4000}],
    apres:dyn(()=>`<p>${rappelDilution()?rappelDilution()+' ':''}Le compte passe de ${nAvant} à environ ${nDil} sur ${NM}.</p><p class="small">En PC et SM, c’est un enrichissement ; en SVT, une capacité du programme.</p>`),
    ...BET([
    ['ne change pas',`Tu as supposé que τ ne dépend que de l’acide. Le compte passe de ${nAvant} à environ ${nDil} sur ${NM} : τ a changé.`],
    ['augmente',`Oui : le compte passe de ${nAvant} à environ ${nDil} sur ${NM}.`,1],
    ['diminue',`Tu as compté l’acide par litre. Le compte ne baisse pas : il monte de ${nAvant} à environ ${nDil} sur ${NM}.`]])}},
{cle:'dilution-calc',beat:6,scene:'solution',set:BE({dil:10,ph:1}),sujet:'τ après dilution',
  text:[`Après dilution, C = ${CdilS} mol·L⁻¹ et le pH vaut ${phD}.`,'τ = ?'],
  verifie:{...VF([
    [`${tauD}`,true,`Oui : τ = 10<sup>−${phD}</sup> / ${CdilS} = ${tauD}, soit ${pcD} %.`],
    [`${tauDfx}`,false,`Tu as gardé la concentration d’avant la dilution. C a été divisée par 10 : C = ${CdilS} mol·L⁻¹.`,'Quelle est la concentration après dilution ?'],
    [`${tauS}`,false,'Tu as repris τ d’avant. Recalcule avec le nouveau pH et la nouvelle concentration.','Le pH et C ont-ils changé ?']])}},
{cle:'dilution-pourquoi',beat:6,scene:'solution',set:ZO({tic:80,graph:1,leg:3,lisse:1,vol:10,sub:'dix fois plus de place, les mêmes 100 molécules'}),sujet:'pourquoi τ augmente quand on dilue',
  text:[`Après la dilution, τ passe de ${tau2} à ${tauD}.`,'Pourquoi τ augmente-t-il ?'],
  verifie:{...VF([
    ['A⁻ et H₃O⁺ se rencontrent plus rarement',true,'Oui : le retour ralentit, l’équilibre s’établit plus loin vers les produits.'],
    ['l’eau ajoutée cède des protons en plus',false,'Tu as pensé que l’eau fournit des H₃O⁺. Ils viennent de l’acide : l’eau les capte.','D’où viennent les ions H₃O⁺ : de l’eau ou de l’acide ?'],
    ['l’acide devient plus fort quand on le dilue',false,'Tu as changé la nature de l’acide. Il est le même : c’est l’état de départ, plus dilué, qui a changé.','La dilution change-t-elle l’acide, ou seulement sa concentration ?']])}},

/* ===== 7. retour à l'énigme ===== */
{cle:'retour',beat:7,scene:'solution',set:DU({sub:'chaque molécule a un proton à céder'}),
  text:()=>[rappelEnigme(),`Dans l’acide chlorhydrique, τ = ${fr(TF.tau,0)} : chaque molécule a cédé son proton.`,`Dans l’acide éthanoïque, τ = ${tau2} : les protons qui manquent sont restés sur les molécules d’acide, pas toujours les mêmes.`,{t:'Le pH dit jusqu’où l’acide a réagi.',fort:true}]},
{cle:'retour-ph',beat:7,scene:'solution',set:BE({ph:1,pv:TF.pH}),sujet:'une solution plus concentrée pour un même pH',
  text:[`Une solution d’acide éthanoïque a un pH de ${phC}.`,`Sa concentration est… (celle de l’acide chlorhydrique de même pH : ${Cv} mol·L⁻¹)`],
  verifie:{...VF([
    [`plus grande que ${Cv} mol·L⁻¹`,true,'Oui : τ < 1, il faut plus d’acide pour obtenir autant d’ions H₃O⁺.'],
    [`égale à ${Cv} mol·L⁻¹`,false,'Tu as repris le raisonnement de l’énigme : il n’est vrai que si τ = 1. L’acide éthanoïque a τ < 1.','Une même concentration donne-t-elle le même pH si τ ≠ 1 ?'],
    [`plus petite que ${Cv} mol·L⁻¹`,false,'Tu as supposé que l’acide éthanoïque cède plus de protons. Il en cède moins : il en faut plus pour le même pH.','L’acide éthanoïque cède-t-il plus ou moins de protons que l’acide chlorhydrique ?']])}},

/* ===== 8. au bac ===== */
{cle:'bac-eq',beat:8,scene:'bac',set:BC({eqn:0,n:0}),sujet:'l’équation de l’acide avec l’eau, sujet 2022',
  text:[`Bac PC 2022, session normale, exercice 1, partie 2 : une solution d’acide propanoïque, C_a = ${CaS} mol·L⁻¹ et pH = ${pH22}.`,`Question 1.1 (${fr(S22.bareme[0],1)} pt) : écrire l’équation de la réaction de l’acide propanoïque avec l’eau.`,'Laquelle est juste ?'],
  verifie:{...VF([
    ['C₂H₅COOH(aq) + H₂O(l) ⇄ C₂H₅COO⁻(aq) + H₃O⁺(aq)',true,'Oui : l’acide cède H⁺ à l’eau, qui devient H₃O⁺.'],
    ['C₂H₅COOH(aq) ⇄ C₂H₅COO⁻(aq) + H⁺(aq)',false,'Tu as écrit la demi-équation du couple. Dans l’équation, le proton passe à l’eau, qui devient H₃O⁺.','Un proton H⁺ reste-t-il seul dans une équation de réaction ?'],
    ['C₂H₅COOH(aq) + HO⁻(aq) ⇄ C₂H₅COO⁻(aq) + H₂O(l)',false,'C’est l’équation du dosage, question 2.1 du même sujet. Ici, la base qui capte le proton est l’eau.','Y a-t-il des ions HO⁻ dans la solution d’acide au départ ?']]),
    reveal:[{p:{eqn:1},d:700}]}},
{cle:'bac',beat:8,scene:'bac',set:BC({eqn:1,n:0}),
  text:[`Question 1.2 (${fr(S22.bareme[1],2)} pt) : calculer τ. Que peut-on conclure ?`,'On ne donne aucun volume.','Quel est ton premier geste ?'],
  verifie:{...VF([
    ['Poser τ = x_f / x_max, puis exprimer x_f et x_max',true,'Oui : on part de la définition, et V, laissé en lettres, se simplifiera.'],
    ['Dire qu’on ne peut pas calculer : le volume V manque',false,'Tu as cru qu’il faut V. Il se simplifie dans τ : c’est pour cela que le sujet ne le donne pas.','x_f et x_max contiennent-ils V tous les deux ?'],
    ['Poser directement τ = pH / C_a, puis calculer',false,'Tu as pris le pH pour une concentration. Cette formule n’existe pas : τ se définit par des avancements, x_f / x_max.','Le pH est-il une concentration ?']]),
    reveal:[{p:{n:1},d:800}]}},
{cle:'bac-ed',beat:8,scene:'bac',set:BC({eqn:1,n:1}),
  text:['Voici la rédaction de la question 1.2, avec la pensée de celui qui l’écrit.',`Lis chaque ligne, avec sa raison. Barème imprimé en marge du sujet : ${fr(S22.bareme[0],1)} + ${fr(S22.bareme[1],2)} pt.`],
  deriv:[{tex:tx`\tau=\dfrac{x_\mathrm{f}}{x_\mathrm{max}}`,alt:'τ = x_f / x_max',r:'je commence par la définition : τ est un rapport d’avancements',p:{n:1}},
    {tex:tx`x_\mathrm{max}=C_a\,V\qquad x_\mathrm{f}=[\mathrm{H_3O^+}]_\mathrm{f}\,V=10^{-\mathrm{pH}}\,V`,alt:'x_max = C_a V ; x_f = [H₃O⁺]_f V = 10^(−pH) V',r:'je pose le tableau : AH limitant, l’eau en excès ; je lis x_f sur la ligne finale',p:{n:2}},
    {tex:tx`\tau=\dfrac{10^{-\mathrm{pH}}\,V}{C_a\,V}=\dfrac{10^{-\mathrm{pH}}}{C_a}`,alt:'τ = 10^(−pH) V / (C_a V) = 10^(−pH) / C_a',r:'la formule littérale d’abord : V disparaît, c’est pour cela que le sujet ne le donne pas',p:{n:3}},
    {tex:tx`\tau=\dfrac{10^{-${TN(S22.pH,1)}}}{${TN(S22.Ca*100,0)}\times10^{-2}}\approx ${TN(S22.tau*100,1)}\times10^{-2}`,alt:`τ = 10^(−${pH22}) / (${CaS}) ≈ ${tauS22}`,r:'je remplace par les valeurs, puis je contrôle : τ ≤ 1',p:{n:4}}]},
{cle:'bac-conclure',beat:8,scene:'bac',set:BC({eqn:1,n:4}),sujet:'conclure : τ < 1, limitée',
  text:[`Question 1.2, seconde moitié : τ ≈ ${tauS22}, soit ${tauS22p} %.`,'Que peut-on conclure ?'],
  verifie:{...VF([
    ['τ < 1 : la transformation est limitée (non totale)',true,'Oui : τ < 1, donc x_f < x_max.'],
    ['τ ≈ 0 : l’acide ne réagit pas avec l’eau',false,`Tu as lu « petit » comme « nul ». ${tauS22p} % des molécules ont réagi : peu, mais pas rien.`,`τ = ${tauS22} est-il égal à 0 ?`],
    ['la réaction est lente, puisque τ est petit',false,'Tu as lu τ comme une vitesse. τ ne dit rien de la vitesse.','τ parle-t-il de durée, ou de proportion ?']]),
    reveal:[{p:{n:5},d:800}],
    apres:{html:`<div class="tn-copie"><p><b>Équation.</b> C₂H₅COOH(aq) + H₂O(l) ⇄ C₂H₅COO⁻(aq) + H₃O⁺(aq)</p><p><b>Définition.</b> τ = x_f / x_max, avec x_max = C_a V et x_f = [H₃O⁺]_f V = 10<sup>−pH</sup> V.</p><p><b>Littéral.</b> τ = 10<sup>−pH</sup> / C_a : V se simplifie.</p><p><b>Numérique.</b> τ = 10<sup>−${pH22}</sup> / (${CaS}) ≈ ${tauS22}, soit ${tauS22p} %.</p><p><b>Conclusion.</b> τ < 1 : la transformation est limitée (non totale).</p></div><p class="small">Barème imprimé du sujet : ${fr(S22.bareme[0],1)} + ${fr(S22.bareme[1],2)} pt. Consigne imprimée sur les sujets : « On donnera les expressions littérales avant de passer aux applications numériques. »</p>`}}},
{cle:'bac-2a',beat:8,scene:'avancement',set:AV({lit:0,cases:12,cache:8,cache2:4,tete:'ethan',conc:'CA',sub:'sujet 2023 : CH₃COOH + H₂O ⇄ CH₃COO⁻ + H₃O⁺'}),sujet:'la ligne finale du tableau, sujet 2023',
  text:[`À toi. Bac PC 2023, session normale, exercice 1, §1, question 1.2 (${fr(S23.bareme[1],2)} pt) : « En vous aidant du tableau d’avancement, montrer que α = 1 − τ. »`,`C_A = ${CAS} mol·L⁻¹ ; pH = ${pH23}. Dans la ligne finale, n(CH₃COOH) vaut…`],
  tex:[[tx`\alpha=\dfrac{[\mathrm{CH_3COOH}]_{\text{éq}}}{[\mathrm{CH_3COOH}]_{\text{éq}}+[\mathrm{CH_3COO^-}]_{\text{éq}}}`,'α = [CH₃COOH]_éq / ([CH₃COOH]_éq + [CH₃COO⁻]_éq)']],
  verifie:{...VF([
    ['C_A V − x_f',true,'Oui : on retire à la quantité de départ ce qui a réagi.'],
    ['x_f',false,'Tu as pris la quantité formée pour la quantité restante. x_f est ce qui s’est formé : l’acide, lui, a perdu x_f.','x_f est-il ce qui reste de l’acide, ou ce qui s’est formé ?'],
    ['C_A V',false,'Tu as laissé l’acide inchangé. Ce qui a réagi est retiré : C_A V − x_f.','L’acide a-t-il perdu quelque chose entre l’état initial et l’état final ?']]),
    reveal:[{p:{cache:-1,cache2:-1,fx:8},d:700}]}},
{cle:'bac-2b',beat:8,scene:'avancement',set:AV({lit:0,cases:12,cache:-1,fx:8,tete:'ethan',conc:'CA',sub:'sujet 2023 : CH₃COOH + H₂O ⇄ CH₃COO⁻ + H₃O⁺'}),sujet:'α = 1 − τ, sujet 2023',
  text:['On reprend α avec les quantités de la ligne finale du tableau.'],
  deriv:[{tex:tx`\alpha=\dfrac{C_A V-x_\mathrm{f}}{(C_A V-x_\mathrm{f})+x_\mathrm{f}}`,alt:'α = (C_A V − x_f) / ((C_A V − x_f) + x_f)',r:'même volume partout : les concentrations deviennent des quantités'}],
  pari:{label:'Simplifie, puis calcule α',...VF([
    [`${alpha23}`,true,`Oui : α = 1 − x_f / (C_A V) = 1 − τ, avec τ = 10<sup>−${pH23}</sup> / ${CAS} ≈ ${tauS23}, donc α ≈ ${alpha23}.`],
    [`${tauFx23}`,false,'Tu as confondu α et τ. α compte l’acide restant, τ l’acide qui a réagi : α = 1 − τ.','α compte-t-il l’acide qui reste, ou l’acide qui a réagi ?'],
    [`${sansC23}`,false,'Tu as oublié C_A dans τ. τ = 10<sup>−pH</sup> / C_A, pas 10<sup>−pH</sup> seul.','Par quoi divise-t-on 10^(−pH) pour obtenir τ ?']]),
    apres:{tex:[[tx`\alpha=1-\tau`,'α = 1 − τ']],html:'<p class="small">La question 1.3 de ce sujet (le pK_A) et les questions 1.3 et 1.4 du sujet 2022 sont la suite du chapitre : elles viennent après.</p>'}}},

/* ===== 9. bilan ===== */
{cle:'q1',beat:9,scene:'quiz',set:{qi:0,rv:0},sujet:'τ inversé dans une copie',
  text:[`Une copie écrit : τ = C / [H₃O⁺] = ${sciH(S22.Ca,0)} / ${hS22s} ≈ ${tauInv22}. Son erreur ?`],
  verifie:{...VF([
    ['le rapport est inversé',true,`Oui : τ ≤ 1 aurait dû alerter. τ = [H₃O⁺]_f / C ≈ ${tauS22}.`],
    ['le volume V est oublié',false,'Tu as cru que V manque. V se simplifie : τ = [H₃O⁺]_f / C.','V figure-t-il encore dans τ = [H₃O⁺]_f / C ?'],
    ['aucune : le calcul est juste',false,'Tu as lu un grand τ comme une réaction totale. τ ne dépasse jamais 1.','Un taux d’avancement peut-il dépasser 1 ?']]),
    reveal:[{p:{rv:1},d:1200}]}},
{cle:'q2',beat:9,scene:'quiz',set:{qi:1,rv:0},sujet:'une base selon Brønsted',
  text:['Parmi CH₃COO⁻ et H₃O⁺, laquelle est une base selon Brønsted ?'],
  verifie:{...VF([
    ['CH₃COO⁻ : elle peut capter un proton',true,'Oui : une base capte un proton, elle n’a pas à contenir HO⁻.'],
    ['H₃O⁺ : elle peut capter un proton',false,'Tu as pris H₃O⁺ pour une base. Il peut céder un proton : c’est un acide.','H₃O⁺ cède-t-il ou capte-t-il un proton ?'],
    ['aucune des deux, faute d’ion HO⁻',false,'Tu as cherché HO⁻ dans la formule. Une base capte un proton ; elle n’a pas à contenir HO⁻.','Qu’est-ce qui définit une base selon Brønsted ?']]),
    reveal:[{p:{rv:1},d:1200}]}},
{cle:'q3',beat:9,scene:'quiz',set:{qi:2,rv:0},sujet:'fraction et pourcentage',
  text:[`2021 : « Montrer que τ ≈ ${fr(S21.tau*100,2)} % ». On trouve ${tauS21}. C’est…`],
  verifie:{...VF([
    ['une valeur identique, écrite autrement',true,`Oui : ${tauS21} × 100 = ${tauS21p}. Une fraction et un pourcentage sont la même valeur.`],
    ['une valeur cent fois trop petite',false,`Tu as oublié que le pourcentage multiplie par 100. ${tauS21} × 100 = ${tauS21p} : c’est la même valeur écrite autrement.`,`Que donne ${tauS21} × 100 ?`],
    ['une valeur fausse : τ s’exprime en mol',false,'Tu as donné une unité à τ. C’est un rapport de deux quantités : il n’a pas d’unité.','τ est-il le rapport de deux quantités de même unité ?']]),
    reveal:[{p:{rv:1},d:1200}]}},
{cle:'fin',beat:9,scene:'end',seq:[{p:{n:5},d:3200,w:300}],
  text:['Fin de la séance.'],html:()=>profileHTML()}
];
STEPS.forEach(st=>{if(st.ctl==='tic')st.need=()=>(S.tntTics||0)>=5;if(st.ctl==='ph')st.need=()=>S.tntBouges.length>=2;});

// une espace insécable avant « % » ; un nombre ne se sépare pas de son unité
const pct=s=>typeof s==='string'?s.replace(/(\d) %/g,'$1\u202f%').replace(/(\d|<\/sup>) (mol·L⁻¹|mol|mL|L|pt)(?=[\s.,;:)<]|$)/g,'$1\u00a0$2'):s;
const pctP=p=>typeof p==='string'?pct(ix(p)):p&&typeof p==='object'?{...p,t:pct(ix(p.t))}:p;
const pctOpts=P=>{if(!P)return;if(P.opts)P.opts.forEach(o=>{o.t=pct(o.t);o.fb=pct(o.fb);o.indice=pct(o.indice);});
  if(P.label)P.label=pct(ix(P.label));
  if(P.apres){const d=Object.getOwnPropertyDescriptor(P.apres,'html');if(d&&!d.get&&typeof P.apres.html==='string')P.apres.html=pct(ix(P.apres.html));
    else if(d&&d.get){const f=d.get;Object.defineProperty(P.apres,'html',{get:()=>pct(ix(f())),enumerable:true,configurable:true});}}};
STEPS.forEach(st=>{
  if(typeof st.text==='function'){const f=st.text;st.text=()=>{const v=f();return (Array.isArray(v)?v:[v]).filter(x=>x!=null&&x!=='').map(pctP);};}
  else st.text=(Array.isArray(st.text)?st.text:[st.text]).filter(x=>x!=null&&x!=='').map(pctP);
  if(st.deriv)st.deriv.forEach(x=>{x.r=pct(ix(x.r));});
  pctOpts(st.pari);pctOpts(st.verifie);
});

/* ---------- les mots ---------- */
const mots={
  ph:{t:'pH',d:'Le pH se lit au pH-mètre : [H₃O⁺] = 10<sup>−pH</sup>, en mol·L<sup>−1</sup>. Le nom date de 1909 : Sørensen, au laboratoire Carlsberg (le sens du « p » est discuté).'},
  phcalc:{t:'une valeur calculée',d:'Dans la leçon, les pH sont calculés par le programme à partir d’une donnée de l’acide (son pK<sub>A</sub>, que le chapitre suivant enseigne). Ce ne sont pas des mesures faites au laboratoire. Au bac, la valeur du pH est donnée.'},
  acide:{t:'acide (Brønsted)',d:'Une espèce capable de céder un proton H⁺. Exemples : CH₃COOH, H₃O⁺, NH₄⁺.'},
  base:{t:'base (Brønsted)',d:'Une espèce capable de capter un proton H⁺. Elle n’a pas à contenir d’ion HO⁻. Exemples : CH₃COO⁻, NH₃, H₂O.'},
  couple:{t:'couple acide/base',d:'Un acide et la base qu’il devient en cédant un proton, écrits acide/base : AH/A⁻. Leur demi-équation : AH ⇄ A⁻ + H⁺. Elle n’est pas une équation de réaction : un proton ne reste pas seul.'},
  baseconj:{t:'base conjuguée',d:'La base d’un couple : ce qui reste d’un acide quand il a cédé son proton. A⁻ est la base conjuguée de AH.'},
  oxonium:{t:'ion oxonium',d:'L’ion H₃O⁺ : une molécule d’eau qui a capté un proton. Son couple est H₃O⁺/H₂O.'},
  ampholyte:{t:'ampholyte',d:'Une espèce à la fois acide et base. L’eau est acide dans le couple H₂O/HO⁻, base dans le couple H₃O⁺/H₂O.'},
  tauxavancement:{t:'taux d’avancement final',d:`τ = x<sub>f</sub> / x<sub>max</sub>, avec τ ≤ 1. Les sujets l’écrivent en fraction (${tauS21}) ou en pourcentage (${tauS21p} %) : c’est la même grandeur, sans unité. La concentration s’écrit C, mais aussi C<sub>a</sub> ou C<sub>A</sub> selon les sujets.`},
  limitee:{t:'transformation limitée',d:'Une transformation non totale : x<sub>f</sub> < x<sub>max</sub>, donc τ < 1. Elle s’arrête avant que le réactif limitant soit épuisé, même si une grande part a réagi.'},
  chocefficace:{t:'choc efficace',d:'En PC et SM : une rencontre entre deux espèces qui aboutit à une réaction. Le cadre officiel demande d’interpréter l’équilibre avec les chocs efficaces entre les espèces réactives d’une part, entre les espèces produites d’autre part.'},
  equilibre:{t:'état d’équilibre',d:'Un état où les quantités de chaque espèce ne changent plus, parce que les deux réactions, en sens inverse, ont lieu à la même vitesse. Les sujets écrivent [H₃O⁺]<sub>éq</sub> ; la leçon écrit [H₃O⁺]<sub>f</sub> dans le tableau, l’état final.'},
  catalyseur:{t:'catalyseur',d:'Une espèce qui accélère une réaction sans être consommée.'},
};
Object.values(mots).forEach(m=>{m.d=pct(m.d);});

/* ---------- la fin : une ligne de résultat, les exercices, le détail ---------- */
const bet=k=>{const st=STEPS.find(s=>s.cle===k),j=S.first[k];return (!st||j==null)?null:!!st.pari.opts[j].juste;};
function profileHTML(){
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>ctx.juste(s.k)!=null),vok=V.filter(s=>ctx.juste(s.k)===true),vko=V.filter(s=>ctx.juste(s.k)===false);
  const P=STEPS.filter(s=>s.pari&&!s.verifie&&!s.pari.opts.some(o=>o.ok)),pv=P.filter(s=>bet(s.cle)!=null);
  const Q=[['q1','τ inversé dans une copie'],['q2','une base selon Brønsted'],['q3','fraction et pourcentage']];
  const res=Q.map(([k])=>ctx.juste(k));
  const ligne=`« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length||V.length}</b>. Tes paris : ${pv.length} faits.`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${ix(Q[i][1])}</li>`).join('');
  const bets=[];
  const a=bet('deux-flacons');if(a!=null)bets.push(a?'tu avais prévu que l’acide éthanoïque a un pH plus grand':'« 2,0 aussi » ou « moins de 2,0 » t’a tenté');
  const b=bet('bronsted');if(b!=null)bets.push(b?'tu avais vu que NH₃ prend un proton à l’eau':'tu n’avais pas vu que NH₃ prend un proton à l’eau');
  const c=bet('attendre');if(c!=null)bets.push(c?'tu savais que le compte se stabilise':'« jusqu’à 100 » ou « retour à 0 » t’a tenté');
  const d=bet('qui');if(d!=null)bets.push(d?'tu savais que les molécules changent quand le compte ne bouge plus':'tu croyais les molécules figées au palier');
  const e=bet('vitesses');if(e!=null)bets.push(e?'tu savais que les deux réactions continuent à la même vitesse':'« plus de cédés » ou « zéro et zéro » t’a tenté');
  const f=bet('dilution-pari');if(f!=null)bets.push(f?'tu avais prévu que τ augmente quand on dilue':'« τ ne change pas » ou « τ diminue » t’a tenté');
  const revoir=vko.map(x=>x.sujet).filter(Boolean);
  return `<p class="res">${pct(ligne)}</p><a class="lien-exos" href="/pilote/transformations-non-totales/exercices">Faire les exercices →</a>
<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}${revoir.length?`<p class="small">À revoir : ${revoir.join(' ; ')}.</p>`:''}<div class="next"><div class="pari-k">Dans les exercices, piège par piège</div><ol><li>pH et [H₃O⁺] : l’exercice 3. Brønsted, couples et équation : les exercices 1 et 2.</li><li>Tableau et x_max : l’exercice 4. x_f, et V oublié : l’exercice 5.</li><li>τ inversé, C oubliée, pourcentage : l’exercice 6. « Limitée » pris pour « presque rien », τ proche de 1 : l’exercice 7.</li><li>Équilibre figé, attendre, catalyseur : l’exercice 8. La dilution : l’exercice 9.</li><li>La copie du bac : l’exercice 10.</li></ol></div></details>`;
}

/* ---------- contrôles par étape ---------- */
S.tntTics=0;S.tntBouges=[];S.tntPos=null;
const CTL={
  // « Tic suivant » : un tic de plus, cinq au plus ; « Montre-moi » après vingt secondes
  tic:{html:()=>`<div class="ctl"><div class="ctl-btns"><button type="button" class="ctl-btn" id="tntic">Tic suivant</button><button type="button" class="ctl-btn alt" id="tntmo" hidden>Montre-moi</button></div></div><p class="ctl-note" id="tntnote"></p>`,
    init(st){const sc=scenes.solution,b=$('#tntic'),m=$('#tntmo'),nt=$('#tntnote');
      const note=()=>{const n=S.tntTics||0;nt.innerHTML=n?ix(`Tic ${n} sur 5 : ${SERIE.n[n]} ion${SERIE.n[n]>1?'s':''} A⁻ sur 100.`):'Aucun tic pour l’instant.';b.disabled=n>=5;if(n>=5)m.hidden=true;ctx.majNav();};
      if(S.tntTics>0){sc.p.tic=S.tntTics;sc.p.graph=1;sc.render();}
      note();
      b.addEventListener('click',()=>{if((S.tntTics||0)>=5)return;S.tntTics=(S.tntTics||0)+1;ctx.stop();ctx.tween(sc,{tic:S.tntTics},900);note();});
      setTimeout(()=>{if(ctx.etape()===st&&(S.tntTics||0)<5)m.hidden=false;},20000);
      m.addEventListener('click',async()=>{ctx.stop();while((S.tntTics||0)<5){S.tntTics=(S.tntTics||0)+1;await ctx.tween(sc,{tic:S.tntTics},600);}note();});}},
  // les deux curseurs de la figure `barres` : C à trois crans, pH de −log C à 6 par pas de 0,1
  ph:{html:()=>`<div class="ctl"><div class="tn-cur"><label><span><i>C</i></span><input id="sl-C" type="range" min="0" max="${CRANS_C.length-1}" step="1" value="1" aria-label="Concentration C"><output id="so-C" for="sl-C">${sciH(C0,1)} mol·L⁻¹</output></label><label><span>pH</span><input id="sl-pH" type="range" min="${phMin(C0)}" max="${PH_MAX}" step="0.1" value="${PH_ETH}" aria-label="pH"><output id="so-pH" for="sl-pH">${fr(PH_ETH,1)}</output></label></div><div class="ctl-btns"><button type="button" class="ctl-btn alt" id="tnauto">Montre-moi un exemple</button></div></div><p class="ctl-note" id="tnfb"></p>`,
    init(st){const sc=scenes.barres,fb=$('#tnfb'),iC=$('#sl-C'),iP=$('#sl-pH'),oC=$('#so-C'),oP=$('#so-pH');
      const note=()=>{const tau=Math.min(1,tauDePh(sc.p.C,sc.p.pH));fb.innerHTML=ix(`τ = 10<sup>−pH</sup> / C = ${tau>=0.995?'1':fr(tau,tau<0.1?3:2)}, soit ${fr(tau*100,tau<0.01?2:1)} %.<br>${S.tntBouges.includes('C')?'✓':'·'} C ${S.tntBouges.includes('pH')?'✓':'·'} pH`);};
      const poser=(c,p,marquer)=>{const C=CRANS_C[c],mn=phMin(C);iC.value=c;iP.min=mn;const pv=clamp(+p,mn,PH_MAX);iP.value=pv;oC.innerHTML=ix(`${sciH(C,1)} mol·L⁻¹`);oP.textContent=fr(pv,1);
        sc.p.C=C;sc.p.pH=pv;sc.render();S.tntPos={c,p:pv};
        if(marquer&&!S.tntBouges.includes(marquer))S.tntBouges.push(marquer);note();ctx.majNav();};
      iC.addEventListener('input',()=>{ctx.stop();poser(+iC.value,iP.value,'C');});
      iP.addEventListener('input',()=>{ctx.stop();poser(+iC.value,iP.value,'pH');});
      $('#tnauto').addEventListener('click',()=>{ctx.stop();poser(0,phMin(CRANS_C[0])+1,'C');S.tntBouges.includes('pH')||S.tntBouges.push('pH');poser(0,phMin(CRANS_C[0])+1,'pH');});
      if(S.tntPos)setTimeout(()=>{if(ctx.etape()===st)poser(S.tntPos.c,S.tntPos.p,null);},700);else note();}}
};

// « Passer » : un bouton du panneau mène à une autre étape
const surSaut=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');if(!b||!root.contains(b))return;const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0){e.preventDefault();ctx.aller(i);}};
root.addEventListener('click',surSaut);

return {BEATS,STEPS,CTL,mots,
  reset(){S.tntTics=0;S.tntBouges=[];S.tntPos=null;},
  plain:s=>s.replace(/ ?%/g,' pour cent').replace(/τ/g,' tau ').replace(/⇄/g,' double flèche ').replace(/→/g,' flèche '),
  demonter(){root.removeEventListener('click',surSaut);}};
});
}
