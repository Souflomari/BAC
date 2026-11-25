/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Noyaux, masse et énergie », V3 (plan : docs/refonte/specs/noyaux-masse-energie.md, §9 prime).
 *
 * Douze parties : ce qu'il faut savoir (sautable), l'énigme (Kelvin 1862, Aston 1920), masse et énergie
 * (E = mc², u, MeV), le défaut de masse, l'énergie de liaison (la figure-clé : le diagramme d'énergie,
 * scène `niveaux`), comparer les noyaux (E_ℓ/A, la courbe d'Aston), le bilan d'une réaction (les trois
 * routes du cadre : énergies de masse, énergies de liaison, diagramme), fission et fusion (sautable en
 * SVT), le retour au Soleil, usages et dangers, deux sujets du bac (2020, 2023) et une copie (2019),
 * le bilan.
 *
 * Les scènes vivent dans noyaux-scenes-{a,b,c}.js, les données sourcées et les calculs dans
 * noyaux-outils.js : AUCUN nombre affiché n'est écrit à la main ici, il vient d'un calcul ou d'une
 * donnée sourcée. Le déroulé, les paris, les fiches et les dérivations sont dans noyau.js.
 *
 * Ce qui reste local : la saisie du défaut de masse (`dm`), le curseur à crans de la courbe d'Aston
 * (`nuc`), les boutons « passer » (ce qu'il faut savoir ; la partie fission et fusion, hors cadre SVT).
 */
import { monterLecon } from "./noyau";
import { lireNombre, proche } from "./exercices/nombre";
import {
  fr, ent, fg, TG, sg, sciH, sciF, TN, TS, nucT, outilsNoyaux, UMEV, F931, U_SUJETS, C, U_KG, MEV_J, EV_J,
  MP, MN, ME, MHE, MD, MT, MP_X, MN_X, M_SEP_HE, DM_HE, EL_HE, PART_HE, ASTON, DT, SOLEIL, DE_DT_X, DE_SOLEIL_X, PART_SOLEIL,
  L_SOL, M_SOL, AGE_SOLEIL, KELVIN_CHIMIE, KELVIN_GRAVITE, DUREE_100, FOIS_KELVIN, E_1G, FISSION, N_GRAMME, E_GRAMME_J, E_CARBONE_EV, FOIS_CHIMIE,
  FL_AFF, E_CARBONE_G, FOIS_GRAMME, MEITNER_MEV, KG_PAR_S, E_MASSE_PROTON, E_SOLEIL_J, S22,
  CINQUIEME, S19, S20, S23, NUCL, ELA, ELT, EL, ASTON_NOYAUX, POINT_FANTOME,
} from "./noyaux-outils";
import { scenesA } from "./noyaux-scenes-a";
import { scenesB, CI, NOM_N } from "./noyaux-scenes-b";
import { scenesC } from "./noyaux-scenes-c";
import { scenesD } from "./noyaux-scenes-d";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,clamp,scenes,hooks,S,defs}=ctx;
const $=ctx.$;
const tx=String.raw;
const O=outilsNoyaux(ctx);

/* ---------- les nombres du texte, tous calculés ---------- */
const NU=NUCL;
const d2=x=>fr(x,2);
const F9=fg(F931,1), UMEV_S=fg(UMEV,1);
const aPart=fr(ASTON.part*100,2), pHe=fr(PART_HE*100,2), pSol=fr(PART_SOLEIL*100,2);
const dmHe=fg(DM_HE,5), elHe=sg(EL_HE);
const cS=sciH(C,3), mevJ=fg(MEV_J*1e13,5), evJ=fg(EV_J*1e19,3);
const fl=(x,d)=>Math.pow(10,Math.floor(Math.log10(x)))*Math.floor(x/Math.pow(10,Math.floor(Math.log10(x))));
const kgG=sciH(E_1G,0);
const r1=x=>Math.round(x*10)/10;
const FL=FL_AFF, FT=r1(FISSION.elF1)+r1(FISSION.elF2)+r1(FISSION.elP);
const EFE=Math.round(ELT('56Fe'));   // E_ℓ du fer 56, arrondie comme dans l'énoncé de dm-inverse

/* ---------- les trois pièges des copies, et deux pages de la scène « quiz » ---------- */
const QUIZ=[
  {titre:'Des applications nucléaires',tag:'quelques exemples',big:'^{18}F · ^{238}Pu · ^{131}I · ^{14}C',sub:'imagerie TEP · stimulateur cardiaque · thyroïde · datation',r1:'',r2:''},
  {titre:'Les dangers de la radioactivité',tag:'source : l’OMS',big:'irradiation ≠ contamination',sub:'une source extérieure, ou une source dans le corps',r1:'irradiation externe : elle cesse si la source est écartée',r2:'contamination interne : elle dure tant que la source est dans le corps'},
  {titre:'Piège n° 1 : la copie de 2019',tag:'sujet 2019, exercice II, question 3',big:`${fg(S19.faux1,2)} MeV`,sub:`*E*_{ℓ}/*A* = ${fg(S19.rn,2)} ; ${fg(S19.po,2)} ; ${fg(S19.he,2)} MeV/nucléon`,r1:'une copie additionne des *E*_{ℓ}/*A*',r2:`il faut *A* × *E*_{ℓ}/*A* : *E*_{lib} = ${fg(S19.lib,2)} MeV`},
  {titre:'Piège n° 2 : un QCM du bac',tag:'sujet 2023, exercice 2, question 1-1',big:'*m*(noyau) = Σ *m*(nucléons) ?',sub:'la masse se conserve-t-elle ?',r1:'non : le noyau pèse moins que ses nucléons séparés',r2:'Δ*m* = *Z* *m*_{p} + (*A* − *Z*) *m*_{n} − *m*(noyau) > 0'},
  {titre:'Piège n° 3 : *E*_{ℓ} ou *E*_{ℓ}/*A* ?',tag:'à retenir pour tout sujet',big:'séparer ou comparer ?',sub:'^{4}He contre ^{238}U',r1:`comparer : *E*_{ℓ}/*A* = ${d2(ELA('4He'))} contre ${d2(ELA('238U'))} MeV/nucléon`,r2:`séparer : *E*_{ℓ} = ${fg(ELT('4He'),0)} contre ${fg(ELT('238U'),0)} MeV`},
  {titre:'Piège n° 4 : le signe de ΔE',tag:'à retenir pour tout sujet',big:'Δ*E* > 0',sub:'ΔE = Σ*m*(produits) − Σ*m*(réactifs), fois *c*^{2}',r1:'le système finit plus haut',r2:'de l’énergie est à fournir, rien n’est libéré'},
];
scenesA(ctx,O);
scenesB(ctx,O);
scenesC(ctx,O,QUIZ);
scenesD(ctx,O);

/* ---------- les nucléides, écrits dans le panneau ---------- */
// A au-dessus de Z, alignés à droite ; insécable, et balisé de séparateurs invisibles pour que la voix lise « C 14 » et non « 146C »
const IM='⁣';
const nuc=(A,Z,X)=>`<span class="nw">${IM}<span class="nuc"><span>${A}${IM}</span><span>${String(Z).replace('-','−')}${IM}</span></span>${X}</span>`;
const sn=(A,X)=>`<sup>${A}</sup>${X}`;
const El='<i>E</i><sub>ℓ</sub>',ElA='<i>E</i><sub>ℓ</sub>/<i>A</i>',Elib='<i>E</i><sub>lib</sub>',dE='Δ<i>E</i>',dm='Δ<i>m</i>';
const nh=k=>nuc(NU[k].A,NU[k].Z,NU[k].X);

// un pari : neutre à l'écran ; `juste` (3ᵉ case) ne sert qu'au profil de fin
const BET=t=>({opts:t.map(([x,fb,j])=>({t:x,fb,juste:!!j}))});
// une question : une bonne réponse ; chaque option fausse a son explication et son indice (second essai)
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>({t:x,ok,fb,indice}))});
// un bouton « passer » : seulement si la question d'entrée est réussie du premier coup
const saut=(cle,vers,oui,non)=>({get html(){return ctx.juste(cle)?`<button type="button" class="ctl-btn alt saut" data-aller="${vers}">${oui} →</button>`:`<p class="small">${non}</p>`;}});
// le jeu de niveaux de la figure-clé : tout à zéro, puis ce que l'étape change
const N0={jeu:'He',lvA:0,lvB:0,lvC:0,nom:1,dm:0,dmv:0,axe:0,up:0,down:0,route:0,de:0,cut:0,val:1};
const NIV=(o)=>({...N0,...o});

/* ---------- les rappels qui dépendent d'un pari ---------- */
function rappelCharbon(){const j=S.first.charbon;if(j==null)return '';
  return ['Ton pari sur le feu chimique était le bon : environ 3 000 ans.','Ton pari sur le feu chimique était trop long : environ 3 000 ans.','Ton pari sur le feu chimique était bien trop long : environ 3 000 ans, pas des milliards.'][j].replace('3 000',ent(KELVIN_CHIMIE));}

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Masse et énergie',court:'Masse'},
  {name:'Le défaut de masse',court:'Défaut'},{name:'L’énergie de liaison',court:'Liaison'},{name:'Comparer les noyaux',court:'Aston'},
  {name:'Le bilan d’une réaction',court:'Bilan'},{name:'Fission et fusion',court:'Fission'},{name:'Retour à l’énigme',court:'Retour'},
  {name:'Usages et dangers',court:'Usages'},{name:'Au bac',court:'Au bac'},{name:'Pour finir',court:'Fin'}];

const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'sav-test',beat:0,scene:'desint',set:{ty:0,rv:0},sujet:'les deux lois de conservation',
  text:[`Ce qu’il faut savoir : juste du premier coup, tu passes. Sujet 2020, session normale, exercice III, question 1 (0,5 pt) : ${nh('210Po')} → ${nuc('<i>A</i>','<i>Z</i>','Pb')} + ${nh('4He')}. Que valent <i>A</i> et <i>Z</i> ?`],
  verifie:{...VF([
    ['<i>A</i> = 206 et <i>Z</i> = 82',true,'Oui : 210 − 4 = 206 nucléons et 84 − 2 = 82 protons.'],
    ['<i>A</i> = 206 et <i>Z</i> = 84',false,'Tu as gardé <i>Z</i> du père : α emporte aussi 2 protons. <i>Z</i> = 84 − 2 = 82.','Une particule α contient-elle des protons ?'],
    ['<i>A</i> = 208 et <i>Z</i> = 82',false,'Tu as retranché 2 nucléons : α en compte 4. <i>A</i> = 210 − 4 = 206.','Combien de nucléons dans une particule α ?'],
    ['<i>A</i> = 214 et <i>Z</i> = 86',false,'Tu as ajouté au lieu de retrancher : les nucléons du père se partagent entre le fils et α. <i>A</i> = 210 − 4.','Le noyau fils a-t-il plus de nucléons que le père ?']]),
    reveal:[{p:{rv:1},d:900}],
    apres:saut('sav-test','soleil','Je le sais : passer à l’énigme','La suite te le rappelle.')}},
{cle:'sav-rappel',beat:0,scene:'desint',set:{ty:0,rv:1},
  text:['Deux rappels avant d’avancer. Dans toute réaction nucléaire, le nombre de nucléons <i>A</i> et la charge <i>Z</i> se conservent : ce sont les [[soddy|lois de conservation]].',
    'Et une énergie se mesure en joules, de symbole J.']},

/* ===== 1. l'énigme ===== */
{cle:'soleil',beat:1,scene:'soleil',set:{age:0,chim:0,grav:0,fus:0},seq:[{p:{age:1},d:1200}],
  text:[`Le Soleil rayonne ${sciH(L_SOL,3)} joules chaque seconde.`,{t:`Il brille depuis ${fr(AGE_SOLEIL/1e9,1)} milliards d’années : c’est l’âge que donne la datation radioactive des météorites.`,a:0}]},
{cle:'charbon',beat:1,scene:'soleil',tag:'1862',set:{age:1},
  text:['1862 : Kelvin cherche d’où vient cette chaleur.','Imagine le Soleil en feu chimique, avec le meilleur combustible et tout l’oxygène nécessaire.','Pendant combien de temps brillerait-il ?'],
  pari:{reveal:[{p:{chim:1},d:1300}],...BET([
    ['Quelques milliers d’années',`Ton ordre de grandeur est le bon : Kelvin trouve environ ${ent(KELVIN_CHIMIE)} ans, plus d’un million de fois moins que l’âge du Soleil.`,1],
    ['Quelques millions d’années',`C’est de l’ordre de mille fois trop : Kelvin trouve environ ${ent(KELVIN_CHIMIE)} ans pour un feu chimique, des milliers d’années, pas des millions.`],
    ['Quelques milliards d’années',`C’est ce qu’il faudrait, et c’est très loin du compte : un feu chimique donne environ ${ent(KELVIN_CHIMIE)} ans, plus de ${ent(fl(1e9/KELVIN_CHIMIE))} fois moins que ta plus petite estimation.`]])}},
{cle:'gravite',beat:1,scene:'soleil',set:{chim:1},seq:[{p:{grav:1},d:1200}],
  text:['Kelvin cherche ailleurs : un Soleil qui se tasse sous son propre poids libérerait de l’énergie.',{t:`Cela donne environ ${ent(KELVIN_GRAVITE/1e6)} millions d’années, encore ${ent(Math.round(AGE_SOLEIL/KELVIN_GRAVITE/10)*10)} fois trop court.`,a:0},{t:`Aucune énergie connue en 1862 ne donne ${fr(AGE_SOLEIL/1e9,1)} milliards d’années.`,a:0,fort:true}]},
{cle:'aston',beat:1,scene:'niveaux',tag:'1920',set:NIV({jeu:'H4',lvA:1}),
  text:['1920 : Francis Aston, avec son spectrographe de masse, mesure la masse de nombreux atomes, dont l’hydrogène et l’hélium.','Il compare 4 noyaux d’hydrogène, soit 4 protons, et 1 noyau d’hélium, qui a 4 nucléons dont 2 neutrons.','Lequel pèse le plus ?'],
  pari:{reveal:[{p:{lvB:1},d:900},{p:{dm:1},d:700}],...BET([
    ['Les 4 hydrogènes pèsent plus',`Oui : l’hélium pèse un peu moins, il manque ${aPart} % de la masse. Aston l’a mesuré.`,1],
    ['Exactement pareil : 4 nucléons de chaque côté',`Tu as supposé que la masse se conserve, comme en chimie. Pourtant il manque ${aPart} % de la masse à l’hélium.`],
    ['L’hélium pèse plus : ses neutrons sont plus lourds que des protons',`Un neutron est un peu plus lourd qu’un proton, c’est vrai ; mais l’écart va dans l’autre sens : l’hélium pèse ${aPart} % de moins.`]])}},
{cle:'eddington',beat:1,scene:'niveaux',tag:'1920',set:NIV({jeu:'H4',lvA:1,lvB:1,dm:1}),
  text:['Arthur Eddington, astrophysicien, lit la mesure d’Aston.','Que propose-t-il pour la masse qui manque quand 4 hydrogènes deviennent 1 hélium ?'],
  pari:{apres:{html:`<p class="small">Deux questions restent ouvertes : combien d’énergie vaut une masse qui manque ? Et est-ce assez pour ${fr(AGE_SOLEIL/1e9,1)} milliards d’années ? La leçon va le calculer.</p>`},
    ...BET([
    ['Elle est sortie du noyau sous forme d’énergie : la lumière du Soleil','Oui : Eddington propose que la masse qui manque soit devenue de l’énergie. Le Soleil change de l’hydrogène en hélium et rayonne la différence.',1],
    ['Ce n’est qu’une erreur de mesure',`Eddington prend l’écart au sérieux : ${aPart} % de masse en moins n’est pas un détail de balance. Il propose que cette masse soit sortie sous forme d’énergie.`],
    ['Elle est restée cachée dans le noyau d’hélium','Le niveau pesé est celui du noyau entier : rien n’y est caché. La masse qui manque est sortie sous forme d’énergie.']])}},

/* ===== 2. masse et énergie ===== */
{cle:'einstein',beat:2,scene:'calcul',set:{ci:CI.einstein,ok:0,ok2:0},
  text:['Une masse <i>m</i>, au repos, correspond à une [[energiemasse|énergie de masse]] : c’est la relation d’Einstein.','Ici, <i>c</i> est la célérité de la lumière.'],
  tex:[[tx`E=m\,c^{2}`,'E = mc²']]},
{cle:'pile',beat:2,scene:'calcul',set:{ci:CI.einstein,ok:0,ok2:0},
  text:['Une pile neuve se vide en allumant une lampe.','Sa masse…'],
  pari:{reveal:[{p:{ok:1},d:700}],
    apres:{tex:[[tx`\Delta m=\dfrac{\Delta E}{c^{2}}`,'Δm = ΔE / c²']],html:'<p class="small">Si un système perd l’énergie ΔE, sa masse varie de ΔE / <i>c</i>².</p>'},
    ...BET([
    ['diminue, d’une quantité bien trop petite pour une balance','Oui : l’énergie perdue emporte de la masse, mais à l’échelle d’une pile la variation est infime.',1],
    ['ne change pas : <i>E</i> = <i>mc</i>² ne concerne que les noyaux','La relation vaut pour tout système, pas seulement pour un noyau : la pile perd de l’énergie, donc de la masse, très peu.'],
    ['diminue de la masse des électrons partis dans le circuit','Les électrons reviennent à la pile : le circuit est fermé. C’est l’énergie perdue qui fait baisser la masse.']])}},
{cle:'un-gramme',beat:2,scene:'calcul',set:{ci:CI.gramme1,ok:0,ok2:0},sujet:'convertir une masse en kilogrammes',
  text:['Prends 1 g de matière, au repos.','Quelle est son énergie de masse ?'],
  verifie:{...VF([
    [`≈ ${kgG} J`,true,`Oui : <i>m</i> = 10<sup>−3</sup> kg, donc <i>E</i> = 10<sup>−3</sup> × (${cS})² ≈ ${kgG} J.`],
    [`≈ ${sciH(1*C*C,0)} J`,false,'Tu as mis <i>m</i> en grammes : il faut des kilogrammes, 1 g = 10<sup>−3</sup> kg.','La masse doit-elle être en grammes ou en kilogrammes ?'],
    [`≈ ${sciH(1e-3*C,0)} J`,false,`Tu n’as pas élevé <i>c</i> au carré : <i>E</i> = <i>mc</i>², pas <i>mc</i>. Avec <i>c</i>² ≈ ${sciH(C*C,0)} m²·s<sup>−2</sup>, on trouve ${kgG} J.`,'Que fait-on de la célérité <i>c</i> dans <i>mc</i>² ?']]),
    reveal:[{p:{ok:1},d:700}],
    apres:{html:`<p class="small">Le Soleil rayonne ${sciH(L_SOL,3)} J par seconde : il perd donc environ ${fr(KG_PAR_S/1e9,1)} milliards de kilogrammes chaque seconde.</p>`}}},
{cle:'mev-ev',beat:2,scene:'calcul',set:{ci:CI.mev,ok:0,ok2:0},sujet:'MeV et eV',
  text:[`Le joule est trop grand pour un noyau : on compte en électronvolts, avec 1 eV = ${evJ} × 10<sup>−19</sup> J.`,'Un [[mev|MeV]] est un million d’eV : combien de joules ?'],
  verifie:{...VF([
    [`${mevJ} × 10<sup>−13</sup> J`,true,`Oui : 1 MeV = 10<sup>6</sup> eV, donc 10<sup>6</sup> × ${evJ} × 10<sup>−19</sup> J.`],
    [`${evJ} × 10<sup>−19</sup> J`,false,'C’est la valeur de 1 eV. Méga signifie 10<sup>6</sup> : 1 MeV est un million de fois plus grand.','Cette valeur est-elle celle d’un eV ou d’un MeV ?'],
    [`${evJ} × 10<sup>−25</sup> J`,false,'Tu as divisé par 10<sup>6</sup> au lieu de multiplier : 1 MeV est plus grand que 1 eV.','Le MeV est-il plus petit ou plus grand que l’eV ?']]),
    reveal:[{p:{ok:1},d:700}]}},
{cle:'u-mev',beat:2,scene:'calcul',set:{ci:CI.unite,ok:0,ok2:0},sujet:'convertir u en MeV',
  text:[`L’[[uma|unité de masse atomique]] u est de l’ordre de la masse d’un nucléon : 1 u = ${fg(U_KG*1e27,5)} × 10<sup>−27</sup> kg.`,'Quelle énergie de masse pour 1 u, en MeV ?'],
  deriv:[
    {tex:tx`\begin{aligned}E&=1\,\mathrm{u}\times c^{2}\\&=${TG(U_KG*1e27,5)}\times10^{-27}\times\left(${TG(C/1e8,5)}\times10^{8}\right)^{2}\end{aligned}`,alt:`E = 1 u × c² = ${fg(U_KG*1e27,5)} × 10⁻²⁷ × (${fg(C/1e8,5)} × 10⁸)²`,r:'<i>E</i> = <i>mc</i>² pour <i>m</i> = 1 u, en kilogrammes, avec <i>c</i> en m·s<sup>−1</sup>.'},
    {tex:tx`E\approx ${TG(U_KG*C*C*1e10,4)}\times10^{-10}\ \mathrm{J}`,alt:`E ≈ ${fg(U_KG*C*C*1e10,4)} × 10⁻¹⁰ J`,r:'Le calcul, en joules.'}],
  pari:{label:'En MeV ?',
    apres:{tex:[[tx`1\,\mathrm{u}\ \longleftrightarrow\ ${TG(F931,1)}\ \mathrm{MeV}/c^{2}`,`1 u ↔ ${F9} MeV/c²`]],
      html:`<p class="small">Les sujets donnent ${U_SUJETS.map(([v,a])=>`${fg(v,v===931.5?1:2)} (${a})`).join(', ').replace(/, ([^,]*)$/,' ou $1')} : prends la valeur de l’énoncé.</p>`},
    ...VF([
      [`<i>E</i> ≈ ${fg(UMEV,1)} MeV`,true,'Oui : on divise des joules par la valeur d’un MeV en joules.'],
      [`<i>E</i> ≈ ${sciH(U_KG*C*C,2)} MeV`,false,`Ce nombre est encore en joules : 1 u × <i>c</i>² ≈ ${sciH(U_KG*C*C,2)} J. Pour passer aux MeV, on divise par la valeur d’un MeV en joules.`,'Ce résultat est-il en joules ou en MeV ?'],
      [`<i>E</i> ≈ ${sciH(U_KG*C*C/EV_J,2)} MeV`,false,`Tu as divisé par ${sciH(EV_J,3)} J, la valeur de 1 eV, pas celle de 1 MeV : ${sciH(U_KG*C*C/EV_J,2)} est un nombre d’eV.`,'Quelle valeur as-tu mise au dénominateur : 1 eV ou 1 MeV ?']])}},

/* ===== 3. le défaut de masse ===== */
{cle:'peser',beat:3,scene:'assemblage',set:{u:0,dm:0,val:0},
  text:['Sur chaque plateau, 2 protons et 2 neutrons, séparés, loin les uns des autres.','C’est la pesée d’Aston, refaite avec les vrais constituants de l’hélium.','Assemble ceux de droite en un noyau d’hélium 4. Il pèse…'],
  pari:{reveal:[{p:{u:2},d:2600}],...BET([
    ['autant : ce sont les mêmes nucléons',`Tu as supposé que la masse se conserve, comme en chimie. Le noyau pèse ${pHe} % de moins : ${fg(MHE,5)} u au lieu de ${fg(M_SEP_HE,5)} u.`],
    ['moins, de moins de 1 %',`Oui : le noyau pèse ${fg(MHE,5)} u pour ${fg(M_SEP_HE,5)} u de nucléons séparés, soit ${pHe} % de moins. Aston comparait 4 protons ; ici, ce sont 2 protons et 2 neutrons.`,1],
    ['moins, d’environ un quart',`L’écart est de ${pHe} %, pas de 25 % : un quart de la masse serait un nucléon entier qui manque.`]])}},
{cle:'dm-def',beat:3,scene:'assemblage',set:{u:2,dm:1,val:0},
  text:['Cet écart est le [[defautmasse|défaut de masse]] Δ<i>m</i> du noyau.',{t:'Un noyau de plusieurs nucléons a un défaut de masse positif.',fort:true}],
  tex:[[tx`\begin{aligned}\Delta m&=Z\,m_{\mathrm p}+(A-Z)\,m_{\mathrm n}\\&\quad-m\!\left({}^{A}_{Z}\mathrm{X}\right)\end{aligned}`,'Δm = Z mp + (A − Z) mn − m(noyau)']]},
{cle:'calc-dm',beat:3,scene:'assemblage',set:{u:2,dm:1,val:0},ctl:'dm',needLabel:'Calcule d’abord',sujet:'le défaut de masse',
  text:[`Avec <i>m</i><sub>p</sub> = ${fg(MP,5)} u, <i>m</i><sub>n</sub> = ${fg(MN,5)} u et la [[massenoyau|masse du noyau]] <i>m</i>(${nh('4He')}) = ${fg(MHE,5)} u, calcule Δ<i>m</i> pour l’hélium 4, en u.`]},
{cle:'v-dm',beat:3,scene:'calcul',set:{ci:CI.tritium,ok:0,ok2:0},sujet:'le défaut de masse d’un noyau',
  text:[`Défaut de masse du tritium ${nh('3H')}, de masse <i>m</i> = ${fg(MT,5)} u ?`],
  verifie:{...VF([
    [`${fg(MP+2*MN-MT,5)} u`,true,'Oui : 1 proton et 2 neutrons, moins la masse du noyau.'],
    [`${fg(2*MP+MN-MT,5)} u`,false,'Tu as pris 2 protons et 1 neutron : c’est l’inverse. Le tritium a 1 proton et 2 neutrons.','Combien de protons dans un noyau de <i>Z</i> = 1 ?'],
    [`${fg(3*MP-MT,5)} u`,false,'Tu as compté 3 protons : un noyau de <i>Z</i> = 1 n’en a qu’un. Il a 1 proton et 2 neutrons.','Que vaut <i>Z</i> pour le tritium ?'],
    [`${fg(-(MP+2*MN-MT),5)} u`,false,'L’ordre de la soustraction est inversé : Δ<i>m</i> est positif, nucléons moins noyau.','Δ<i>m</i> est-il positif ou négatif ?']]),
    reveal:[{p:{ok:1},d:700}]}},

/* ===== 4. l'énergie de liaison ===== */
{cle:'axe-energie',beat:4,scene:'niveaux',set:NIV({jeu:'He',lvA:1,lvB:1,dm:1,dmv:1,axe:0}),sujet:'passer de u à MeV',
  text:['L’axe va changer d’unité : les u deviennent des MeV.',`Pour l’hélium 4, Δ<i>m</i> = ${dmHe} u. Combien de MeV vaut cet écart, sachant que 1 u correspond à ${F9} MeV/<i>c</i>² ?`],
  pari:{label:'En MeV\u202f?',reveal:[{p:{axe:1},d:1200}],
    apres:{html:`<p class="small">Δ<i>m</i> <i>c</i>² ≈ ${elHe} MeV : la masse et l’énergie se lisent sur une seule échelle.</p>`},
    ...VF([
      [`${dmHe} × ${F9} ≈ ${elHe} MeV`,true,`Oui : on multiplie des u par ${F9} MeV par u.`],
      [`${dmHe} × (3,00 × 10<sup>8</sup>)² ≈ ${sciH(DM_HE*9e16,1)} J`,false,`Tu as pris u pour des kilogrammes dans <i>mc</i>², et tu obtiens des joules. Pour passer de u à MeV, on multiplie par ${F9} MeV par u.`,'Que vaut 1 u en MeV ?'],
      [`${dmHe} / ${F9} ≈ ${sciH(DM_HE/F931,1)} MeV`,false,`Le facteur est dans le mauvais sens : 1 u vaut ${F9} MeV, donc on multiplie.`,'1 u vaut-il plus ou moins qu’un MeV ?']])}},
{cle:'sens',beat:4,scene:'niveaux',set:NIV({jeu:'He',lvA:1,lvB:1,dm:1,dmv:1,axe:1}),
  text:[`Le noyau est ${elHe} MeV sous ses nucléons séparés.`,'Pour le défaire en 4 nucléons libres…'],
  pari:{reveal:[{p:{up:1},d:1100}],
    apres:{tex:[[tx`E_\ell=\Delta m\,c^{2}`,'Eℓ = Δm c²']],html:'<p class="small">C’est l’[[energieliaison|énergie de liaison]] du noyau : l’énergie qu’il faut lui fournir pour le séparer en ses nucléons.</p>'},
    ...BET([
    [`il faut lui fournir ${elHe} MeV`,`Oui : il faut monter la marche, donc fournir ${El} = ${elHe} MeV.`,1],
    [`il libère ${elHe} MeV`,`Tu as pris ${El} pour une réserve que le noyau libère. Pour monter la marche, c’est à toi de fournir ${elHe} MeV.`],
    ['rien : il suffit d’attendre qu’il se défasse',`Un noyau d’hélium ne se défait jamais seul : il est en bas de la marche. Il faut lui fournir ${elHe} MeV.`]])}},
{cle:'formation',beat:4,scene:'niveaux',set:NIV({jeu:'He',lvA:1,lvB:1,dm:1,dmv:1,axe:1,up:1}),sujet:'E_ℓ est sortie à la formation',
  text:[`Pour défaire le noyau, tu as monté la marche de ${elHe} MeV.`,`Quand les nucléons s’assemblent en noyau, où est passée cette énergie ${El} ?`],
  verifie:{...VF([
    ['elle est sortie du noyau quand il s’est formé',true,`Oui : ${El} sort quand le noyau se forme, c’est la marche descendue. Un noyau stable, laissé seul, ne libère rien.`],
    ['elle est rangée dans le noyau, prête à servir',false,`${El} n’est pas une réserve : elle est sortie quand le noyau s’est formé. Un noyau stable, seul, ne libère rien.`,'L’énergie de liaison est-elle dans le noyau, ou déjà sortie ?'],
    ['elle est dans les nucléons, qui pèsent plus lourd',false,'Les nucléons séparés pèsent plus lourd que le noyau : c’est le défaut de masse, et l’énergie correspondante est sortie à la formation.','Le noyau pèse-t-il plus ou moins que ses nucléons séparés ?']]),
    reveal:[{p:{down:1},d:1100}]}},
{cle:'dm-inverse',beat:4,scene:'calcul',set:{ci:CI.dmFe,ok:0,ok2:0},sujet:'de E_ℓ au défaut de masse',
  text:[`Fer 56 : ${El} ≈ ${fg(EFE,0)} MeV.`,'Son défaut de masse, en u ?'],
  verifie:{...VF([
    [`${fg(EFE,0)} / ${F9} ≈ ${fr(EFE/F931,3)} u`,true,`Oui : on divise des MeV par ${F9} MeV par u.`],
    [`${fg(EFE,0)} × ${F9} ≈ ${sciH(EFE*F931,2)} u`,false,`Le facteur est à l’envers : 1 u vaut ${F9} MeV/<i>c</i>², donc on divise.`,'Un défaut de masse en u est-il plus grand ou plus petit que l’énergie en MeV ?'],
    [`${fg(EFE,0)} / 56 ≈ ${fr(EFE/56,2)} u`,false,`Tu as divisé par <i>A</i> : ${fg(EFE,0)} / 56 est ${ElA}, en MeV/nucléon. Pour un défaut de masse, on divise par ${F9}.`,'Quelle unité obtient-on en divisant des MeV par 56 ?']]),
    reveal:[{p:{ok:1},d:700}],
    apres:{html:`<p class="small">${fr(EFE/F931,3)} u correspondent à ${fg(EFE,0)} MeV/<i>c</i>² : le MeV/<i>c</i>² est une unité de masse.</p>`}}},

/* ===== 5. comparer les noyaux ===== */
{cle:'par-nucleon',beat:5,scene:'nz',set:{pt:1},
  text:[`Fer 56 : ${El} ≈ ${fg(ELT('56Fe'),0)} MeV. Uranium 238 : ${El} ≈ ${fg(ELT('238U'),0)} MeV.`,'L’uranium se désintègre seul, le fer jamais.','Arracher un nucléon coûte en moyenne le plus…'],
  pari:{label:'Où coûte-t-il le plus ?',
    apres:{tex:[[tx`\dfrac{E_\ell}{A}`,'Eℓ / A']],html:`<p class="small">C’est l’[[energieliaisonnucleon|énergie de liaison par nucléon]] ${ElA}, en MeV/nucléon. Au bac, « le plus stable » se lit ainsi : ${ElA} la plus grande. Ce n’est pas la durée de vie du noyau.</p>`},
    ...VF([
      ['au fer, malgré une énergie de liaison plus petite',true,`Oui : en moyenne, arracher un nucléon au fer coûte ${fg(ELT('56Fe'),0)} / 56 ≈ ${d2(ELA('56Fe'))} MeV, à l’uranium ${fg(ELT('238U'),0)} / 238 ≈ ${d2(ELA('238U'))} MeV.`],
      [`à l’uranium : sa ${El} est ${fr(ELT('238U')/ELT('56Fe'),1)} fois plus grande`,false,`Ta ${El} est grande parce qu’il y a 238 nucléons à séparer. Ramenée à un nucléon, elle est plus petite que celle du fer.`,'Combien de nucléons sépare-t-on dans chaque noyau ?'],
      ['pareil : un nucléon est un nucléon',false,`Arracher un nucléon ne coûte pas la même énergie dans tous les noyaux : en divisant ${El} par <i>A</i>, on trouve ${d2(ELA('56Fe'))} contre ${d2(ELA('238U'))} MeV.`,`Divise chaque ${El} par son nombre de nucléons : les deux résultats sont-ils égaux ?`]])}},
{cle:'rn-po',beat:5,scene:'calcul',set:{ci:CI.rn,ok:0,ok2:0},sujet:'comparer par E_ℓ/A',
  text:['Sujet 2019, session normale, exercice II, partie 2, question 1 (0,5 pt), réécrit : au lieu de l’énergie par nucléon, on te donne l’énergie de liaison.',`Lequel de ${nh('222Rn')} et ${nh('218Po')} est le plus stable ?`],
  verifie:{...VF([
    ['le polonium',true,`Oui : par nucléon, le polonium tient mieux : ${d2(S19.po)} contre ${d2(S19.rn)} MeV/nucléon.`],
    ['le radon : il faut plus d’énergie pour le défaire',false,`Tu as comparé les énergies de liaison totales : le radon a plus de nucléons. Par nucléon, le polonium gagne : ${d2(S19.po)} contre ${d2(S19.rn)} MeV/nucléon.`,'Les deux noyaux ont-ils le même nombre de nucléons ?'],
    ['on ne peut pas savoir sans connaître A',false,`Le nombre <i>A</i> est dans les symboles : 222 et 218. En divisant ${El} par <i>A</i>, on trouve ${d2(S19.rn)} et ${d2(S19.po)} MeV/nucléon.`,'Le nombre <i>A</i> est-il écrit dans les symboles ?']]),
    reveal:[{p:{ok:1},d:700},{p:{ok2:1},d:700}]}},
{cle:'u-par-nucleon',beat:5,scene:'calcul',set:{ci:CI.u235,ok:0,ok2:0},sujet:'E_ℓ/A : diviser par A',
  text:[`Uranium 235 : ${El} ≈ ${fg(ELT('235U'),0)} MeV, et <i>Z</i> = 92.`,`Combien vaut ${ElA} ?`],
  verifie:{...VF([
    [`≈ ${d2(ELA('235U'))} MeV/nucléon`,true,'Oui : on divise par le nombre total de nucléons, <i>A</i> = 235.'],
    [`≈ ${fr(ELT('235U')/NU['235U'].Z,1)} MeV/nucléon`,false,`Tu as divisé par <i>Z</i> : <i>A</i> compte tous les nucléons, ${NU['235U'].A}. ${ElA} = ${fg(ELT('235U'),0)} / ${NU['235U'].A}.`,'Par quel nombre divise-t-on pour obtenir une énergie par nucléon ?'],
    [`≈ ${fr(ELT('235U')/(NU['235U'].A-NU['235U'].Z),1)} MeV/nucléon`,false,`Tu as divisé par le nombre de neutrons, ${NU['235U'].A-NU['235U'].Z}. On divise par tous les nucléons, <i>A</i> = ${NU['235U'].A}.`,'Les protons comptent-ils parmi les nucléons ?']]),
    reveal:[{p:{ok:1},d:700}]}},
{cle:'aston-courbe',beat:5,scene:'aston',set:{pts:0,curve:0,nuc:0,top:0,fu:0,fi:0,ff:0,fiU:0,lire:0},
  text:[`On trace −${ElA} en fonction de <i>A</i>, pour que la courbe se lise comme l’échelle d’énergie : plus un point est bas, plus le noyau est lié.`,`${ASTON_NOYAUX.length} noyaux réels vont s’y placer.`,'Avant de les voir : où attends-tu les plus stables ?'],
  pari:{reveal:[{p:{pts:1},d:2200},{p:{curve:1},d:1400},{p:{top:1},d:800}],
    apres:{html:'<p class="small">C’est la [[aston|courbe d’Aston]]. Son creux est vers le fer et le nickel.</p>'},
    ...BET([
    ['les plus lourds, à droite','Tu as pris « plus lourd » pour « plus stable ». À droite, la courbe remonte : l’uranium est moins stable que le fer.'],
    ['ceux du milieu, vers A ≈ 60','Oui : le creux de la courbe est vers <i>A</i> ≈ 60, autour du fer et du nickel.',1],
    ['les plus légers, à gauche','Les noyaux légers sont en haut de la courbe, donc peu stables par nucléon. Le creux est vers <i>A</i> ≈ 60.']])}},
{cle:'aston-lire',beat:5,scene:'aston',set:{pts:1,curve:1,top:0,lire:1,nuc:0},ctl:'nuc',needLabel:'Parcours la courbe d’abord',sujet:'lire la courbe d’Aston',
  text:[`Avec le curseur, trouve le noyau le plus bas des ${ASTON_NOYAUX.length}, puis lis ${ElA} pour ${nh('12C')} et ${nh('238U')}.`,'Regarde où la courbe descend vite, et où elle remonte.']},

/* ===== 6. le bilan d'une réaction ===== */
{cle:'rappel',beat:6,scene:'calcul',set:{ci:CI.usr,ok:0,ok2:0},sujet:'E_ℓ et E_ℓ/A',
  text:['Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.',{t:`${nh('235U')} (${El} ≈ ${fg(ELT('235U'),0)} MeV) ou ${nh('94Sr')} (${El} ≈ ${fg(ELT('94Sr'),0)} MeV) : lequel est le plus stable ?`,fort:true}],
  verifie:{...VF([
    [`le strontium ${NU['94Sr'].A}`,true,`Oui : ${d2(ELA('94Sr'))} contre ${d2(ELA('235U'))} MeV/nucléon, le strontium tient mieux chaque nucléon.`],
    [`l’uranium ${NU['235U'].A} : sa ${El} est la plus grande`,false,`Tu as comparé les ${El} totales : l’uranium a 235 nucléons, le strontium 94. Par nucléon, le strontium gagne.`,'Les deux noyaux ont-ils le même nombre de nucléons ?'],
    ['aucun : on ne compare pas des noyaux de tailles différentes',false,`C’est justement ce que permet ${ElA} : on divise par le nombre de nucléons.`,`À quoi sert ${ElA} ?`]]),
    reveal:[{p:{ok:1},d:600},{p:{ok2:1},d:600}]}},
{cle:'trois-niveaux',beat:6,scene:'niveaux',set:NIV({jeu:'DT',lvA:1,lvB:1,axe:1}),
  text:['Sur l’échelle d’énergie, les nucléons séparés sont en haut, et ²H + ³H un peu plus bas.','Où placer ⁴He + n, fait des mêmes 5 nucléons ?'],
  pari:{reveal:[{p:{lvC:1},d:1100}],...BET([
    ['plus bas que ²H + ³H',`Oui : le noyau d’hélium est plus lié, donc plus bas. ⁴He + n est à ${elHe} MeV sous les nucléons séparés.`,1],
    ['plus haut',`Tu as pensé qu’assembler coûte de l’énergie. Au contraire, un noyau plus lié est plus bas : ici, ${elHe} MeV sous les nucléons séparés.`],
    ['au même niveau : mêmes nucléons',`Mêmes nucléons ne veut pas dire même énergie : la masse ne se conserve pas. ⁴He + n est à ${elHe} MeV sous les nucléons séparés.`]])}},
{cle:'bilan-masse',beat:6,scene:'calcul',set:{ci:CI.bilan,ok:0,ok2:0},sujet:'le bilan par les masses',
  text:['Une réaction que tu retrouveras : un noyau de deutérium et un noyau de tritium donnent un noyau d’hélium et un neutron. Fais le bilan par les masses.'],
  tex:[[tx`{}^{2}_{1}\mathrm{H}+{}^{3}_{1}\mathrm{H}\longrightarrow{}^{4}_{2}\mathrm{He}+{}^{1}_{0}\mathrm{n}`,'²H + ³H → ⁴He + n']],
  deriv:[
    {tex:tx`\Delta E=\left[\Sigma m(\text{produits})-\Sigma m(\text{réactifs})\right]c^{2}`,alt:'ΔE = [Σ m(produits) − Σ m(réactifs)] c²',r:'La variation de masse : après moins avant, comme toute variation.'},
    {tex:tx`\begin{aligned}\Sigma m(\text{réactifs})&=${TG(MD,5)}+${TG(MT,5)}\\&=${TG(DT.mReac,5)}\ \mathrm{u}\end{aligned}`,alt:`Σ m(réactifs) = ${fg(MD,5)} + ${fg(MT,5)} = ${fg(DT.mReac,5)} u`,r:'On additionne les deux noyaux de départ.'}],
  pari:{label:'Σ m(produits) ?',reveal:[{p:{ok:1},d:700},{p:{ok2:1},d:700}],
    apres:{tex:[[tx`\Sigma m(\text{produits})-\Sigma m(\text{réactifs})=${TG(DT.mProd,5)}-${TG(DT.mReac,5)}\approx ${TG(DT.dm,5)}\ \mathrm{u}`,`Σ m(produits) − Σ m(réactifs) = ${fg(DT.mProd,5)} − ${fg(DT.mReac,5)} ≈ ${fg(DT.dm,5)} u`],[tx`\Delta E\approx ${TG(DT.dm,5)}\times ${TG(F931,1)}\approx ${TG(DT.de,2)}\ \mathrm{MeV}`,`ΔE ≈ ${fg(DT.dm,5)} × ${F9} ≈ ${fg(DT.de,2)} MeV`]]},
    ...VF([
      [`${fg(MHE,5)} + ${fg(MN,5)} = ${fg(DT.mProd,5)} u`,true,'Oui : le noyau d’hélium et le neutron émis.'],
      [`${fg(MHE,5)} u`,false,`Tu as oublié le neutron émis : il pèse aussi. Sans lui, ${dE} ≈ ${fr((MHE-DT.mReac)*F931,0)} MeV, soit plus que l’énergie de masse d’un nucléon entier (${fr(E_MASSE_PROTON,0)} MeV).`,'Combien de particules sortent de la réaction ?'],
      [`${fg(MHE,5)} + 2 × ${fg(MN,5)} = ${fg(MHE+2*MN,5)} u`,false,'Un neutron de trop : vérifie <i>A</i>, 2 + 3 = 4 + 1. Il y a un seul neutron.','Combien de neutrons la loi de conservation de <i>A</i> permet-elle ?']])}},
{cle:'signe',beat:6,scene:'calcul',set:{ci:CI.bilan,ok:1,ok2:1},sujet:'le signe de ΔE',
  text:[`${dE} ≈ ${fr(DT.de,1)} MeV pour cette réaction. Ce signe veut dire…`],
  verifie:{...VF([
    [`le système perd ${fr(-DT.de,1)} MeV : elle est libérée`,true,'Oui : ΔE est négatif, le système finit plus bas, donc il cède de l’énergie.'],
    [`le système gagne ${fr(-DT.de,1)} MeV : la réaction en absorbe`,false,`Tu as lu ${dE} < 0 comme un gain. ${dE} = après − avant : négatif, le système finit plus bas et cède de l’énergie.`,'Après moins avant est négatif : le système a-t-il gagné ou perdu de l’énergie ?'],
    [`rien de particulier : seule la valeur ${fr(-DT.de,1)} compte`,false,'Le signe dit le sens de l’échange : négatif, l’énergie sort ; positif, il faut en fournir.','Le signe de ΔE porte-t-il une information ?']]),
    apres:{tex:[[tx`E_{\text{lib}}=|\Delta E|`,'Elib = |ΔE|']],html:'<p class="small">C’est l’[[energieliberee|énergie libérée]] : toujours positive, quand ΔE &lt; 0.</p>'}}},
{cle:'deux-routes',beat:6,scene:'niveaux',set:NIV({jeu:'DT',lvA:1,lvB:1,lvC:1,axe:1}),seq:[{p:{route:0.5},d:900},{p:{route:1},d:900}],sujet:'le bilan par les énergies de liaison',
  text:['Pour passer de ²H + ³H à ⁴He + n, passe par les nucléons séparés : défais d’abord, assemble ensuite.',
    {t:`D’abord on défait les réactifs : on fournit ${El}(²H) + ${El}(³H).`,a:0},
    {t:`Ensuite on forme les produits : on récupère ${El}(⁴He), car un neutron seul n’a rien à défaire : ${El}(n) = 0.`,a:1}],
  pari:{label:'Donc ΔE = ?',reveal:[{p:{de:1},d:1000}],
    apres:{tex:[[tx`\Delta E=\Sigma E_\ell(\text{réactifs})-\Sigma E_\ell(\text{produits})`,'ΔE = Σ Eℓ(réactifs) − Σ Eℓ(produits)']],html:`<p class="small">Numériquement, ${dE} ≈ ${fr(DE_DT_X,2)} MeV : la même valeur que par les masses.</p>`},
    ...VF([
      [`[${El}(²H) + ${El}(³H)] − ${El}(⁴He)`,true,'Oui : on monte de ce qu’on défait, on descend de ce qu’on forme.'],
      [`${El}(⁴He) − [${El}(²H) + ${El}(³H)]`,false,`Tu as pris le chemin à l’envers : ce choix donne +${fr(-DE_DT_X,2)} MeV, positif pour une réaction qui libère. On monte de ce qu’on défait, on descend de ce qu’on forme.`,'Monte-t-on de ce qu’on défait, ou de ce qu’on forme ?'],
      [`[${ElA}(²H) + ${ElA}(³H)] − ${ElA}(⁴He)`,false,`Tu as additionné des énergies par nucléon : ce sont les énergies de liaison qui s’additionnent. Ce choix donne ${fr(ELA('2H')+ELA('3H')-ELA('4He'),2)} MeV, loin de la valeur par les masses.`,'Les noyaux ont-ils tous le même nombre de nucléons ?']])}},

/* ===== 7. fission et fusion (PC, SM) ===== */
{cle:'deux-voies',beat:7,scene:'aston',set:{pts:1,curve:1,top:0,fu:0,fi:0,ff:0,fiU:0,lire:0},seq:[{p:{fu:1},d:900},{p:{fu:0,fi:1},d:900}],
  text:['Filières PC et SM. En SVT, ce n’est pas à ton programme.',
    {t:'Deux façons de descendre vers le creux de la courbe : la [[fusion]], où deux noyaux légers s’unissent (c’est la voie du Soleil), et la [[fission]], où un noyau lourd se casse en deux noyaux moyens.',a:0},
    {t:'Descendre sur la courbe, c’est descendre sur l’échelle d’énergie.',a:1,fort:true}],
  html:()=>'<button type="button" class="ctl-btn alt saut" data-aller="retour-eq">Passer à la suite →</button>'},
{cle:'fer-fer',beat:7,scene:'aston',set:{pts:1,curve:1,top:0,fu:0,fi:0,ff:0,fiU:0,lire:0},
  text:['Deux noyaux de fer 56 fusionnent en un noyau de <i>A</i> = 112.','De l’énergie est-elle libérée ?'],
  pari:{reveal:[{p:{ff:1},d:1200}],...BET([
    ['oui : toute fusion libère de l’énergie',`Tu as généralisé : la fusion libère de l’énergie seulement en descendant vers le creux. À <i>A</i> = 112, le point est plus haut que le fer : il faudrait en fournir.`],
    ['non : à A = 112, on est plus haut sur la courbe',`Oui : à <i>A</i> = 112, le noyau est moins lié par nucléon que le fer, ${d2(ELA(POINT_FANTOME))} contre ${d2(ELA('56Fe'))} MeV/nucléon. Il faudrait fournir de l’énergie.`,1],
    ['oui, mais moins qu’avec de l’hydrogène',`Le fer est déjà au creux : deux noyaux de fer qui fusionnent ne libèrent rien, car le point à <i>A</i> = 112 est plus haut (${d2(ELA(POINT_FANTOME))} contre ${d2(ELA('56Fe'))} MeV/nucléon).`]])}},
{cle:'fission-eq',beat:7,scene:'desint',set:{ty:1,rv:0},sujet:'écrire une fission',
  text:['Un neutron frappe un noyau d’uranium 235, qui se casse en deux noyaux moyens.',`Écris la fission : ${nuc(1,0,'n')} + ${nh('235U')} → ${nh('94Sr')} + ${nh('140Xe')} + <i>x</i> ${nuc(1,0,'n')}. Combien de neutrons <i>x</i> sont émis ?`],
  verifie:{fixe:true,...VF([
    ['2',true,`Oui : 1 + ${NU['235U'].A} = ${NU['94Sr'].A} + ${NU['140Xe'].A} + 2.`],
    ['1',false,`Tu as oublié le neutron incident dans le compte de <i>A</i> : 1 + ${NU['235U'].A} = ${1+NU['235U'].A}, et ${NU['94Sr'].A} + ${NU['140Xe'].A} = ${NU['94Sr'].A+NU['140Xe'].A}. Il faut 2 neutrons de plus.`,'Compte-t-on le neutron incident dans le nombre de nucléons de départ ?'],
    ['0',false,`La loi de <i>Z</i> ne voit pas les neutrons : ${NU['235U'].Z} = ${NU['94Sr'].Z} + ${NU['140Xe'].Z} est déjà vraie. C’est la loi de <i>A</i> qui donne <i>x</i>.`,'Quelle loi permet de trouver le nombre de neutrons ?']]),
    reveal:[{p:{rv:1},d:1100}],
    apres:{tex:[[tx`{}^{1}_{0}\mathrm n+{}^{235}_{92}\mathrm U\longrightarrow{}^{94}_{38}\mathrm{Sr}+{}^{140}_{54}\mathrm{Xe}+2\,{}^{1}_{0}\mathrm n`,'n + ²³⁵U → ⁹⁴Sr + ¹⁴⁰Xe + 2 n']]}}},
{cle:'fission-bilan',beat:7,scene:'aston',set:{pts:1,curve:1,top:0,fu:0,fi:0,ff:0,fiU:1,lire:0},sujet:'le bilan d’une fission',
  text:[`Bilan de la fission, par les énergies de liaison lues sur la courbe : ${El} = <i>A</i> × ${ElA}.`],
  deriv:[
    {tex:tx`E_\ell\left({}^{235}\mathrm U\right)\approx ${TG(ELT('235U'),1)}\ \mathrm{MeV}`,alt:`Eℓ(²³⁵U) ≈ ${fg(ELT('235U'),1)} MeV`,r:`${NU['235U'].A} × ${d2(ELA('235U'))} : l’énergie à fournir pour défaire le père.`},
    {tex:tx`E_\ell\left({}^{94}\mathrm{Sr}\right)\approx ${TG(ELT('94Sr'),1)}\ \mathrm{MeV}`,alt:`Eℓ(⁹⁴Sr) ≈ ${fg(ELT('94Sr'),1)} MeV`,r:`${NU['94Sr'].A} × ${d2(ELA('94Sr'))}.`},
    {tex:tx`E_\ell\left({}^{140}\mathrm{Xe}\right)\approx ${TG(ELT('140Xe'),1)}\ \mathrm{MeV}`,alt:`Eℓ(¹⁴⁰Xe) ≈ ${fg(ELT('140Xe'),1)} MeV`,r:`${NU['140Xe'].A} × ${d2(ELA('140Xe'))} : l’énergie qu’on récupère avec le strontium. Un neutron seul a ${El} = 0.`}],
  pari:{label:'Énergie libérée ?',apres:{tex:[[tx`E_{\text{lib}}=|\Delta E|\approx ${TG(FL,1)}\ \mathrm{MeV}`,`Elib = |ΔE| ≈ ${fg(FL,1)} MeV`]],html:`<p class="small">Meitner et Frisch l’avaient estimée dès 1938 : environ ${MEITNER_MEV} MeV pour une seule cassure.</p>`},
    ...VF([
      [`${fg(FISSION.elF1,1)} + ${fg(FISSION.elF2,1)} − ${fg(FISSION.elP,1)} ≈ ${fg(FL,1)} MeV`,true,'Oui : on récupère celles des fils, moins ce qu’on fournit pour le père.'],
      [`${d2(ELA('94Sr'))} + ${d2(ELA('140Xe'))} − ${d2(ELA('235U'))} ≈ ${fr(ELA('94Sr')+ELA('140Xe')-ELA('235U'),1)} MeV`,false,`Tu as additionné des ${ElA} : ce sont les ${El} qui s’additionnent, car les noyaux n’ont pas le même nombre de nucléons.`,`Additionne-t-on des ${El} ou des ${ElA} ?`],
      [`${fg(FISSION.elF1,1)} + ${fg(FISSION.elF2,1)} + ${fg(FISSION.elP,1)} ≈ ${fg(FT,1)} MeV`,false,`Tu as tout additionné : on fournit ${El} du père, on récupère celles des fils. ${Elib} = fils moins père.`,'Le père se défait-il ou se forme-t-il ?']])}},
{cle:'gramme',beat:7,scene:'calcul',set:{ci:CI.gramme,ok:0,ok2:0},sujet:'convertir des MeV en joules',
  text:[`1 g d’uranium 235 contient <i>N</i> = (1/235) × 6,02 × 10<sup>23</sup> ≈ ${sciH(N_GRAMME,1)} noyaux.`,`S’ils fissionnent tous, à ${fg(FL_AFF,1)} MeV chacun, l’énergie libérée vaut…`],
  verifie:{...VF([
    [`≈ ${sciH(E_GRAMME_J,1)} J`,true,`Oui : <i>N</i> × ${fg(FL_AFF,1)} MeV × ${mevJ} × 10<sup>−13</sup> J par MeV.`],
    [`≈ ${sciH(N_GRAMME*FL_AFF,1)} J`,false,`Tu as laissé des MeV : il faut des joules, 1 MeV = ${mevJ} × 10<sup>−13</sup> J. Multiplie <i>N</i> × ${fg(FL_AFF,1)} par cette valeur.`,'Le résultat est-il bien en joules ?'],
    [`≈ ${sciH(N_GRAMME*FL_AFF*EV_J,1)} J`,false,`Tu as converti avec la valeur de l’eV, ${evJ} × 10<sup>−19</sup> J. Un MeV, c’est ${mevJ} × 10<sup>−13</sup> J.`,'Convertis-tu des eV ou des MeV ?']]),
    reveal:[{p:{ok:1},d:700}],
    apres:{html:`<p class="small">1 g de carbone qui brûle libère environ ${sciH(E_CARBONE_G,1)} J (393,5 kJ par mole, et 12 g par mole) : à masse égale, l’uranium libère environ ${fr(FOIS_GRAMME/1e6,1)} millions de fois plus. Par réaction, l’écart est plus grand : ${fr(E_CARBONE_EV,1)} eV pour une molécule de CO<sub>2</sub>, ${fg(FL_AFF,1)} MeV pour une fission, soit environ ${ent(Math.round(FOIS_CHIMIE/1e6))} millions de fois plus.</p>`}}},
{cle:'type',beat:7,scene:'aston',set:{pts:1,curve:1,top:0,fu:0,fi:0,ff:0,fiU:0,lire:0},sujet:'reconnaître une fission',
  text:['Laquelle de ces équations est une fission ?'],
  verifie:{...VF([
    [`n + ${sn(235,'U')} → ${sn(94,'Sr')} + ${sn(140,'Xe')} + 2 n`,true,'Oui : un neutron frappe un noyau lourd, qui se casse en deux noyaux moyens.'],
    [`${sn(238,'U')} → ${sn(234,'Th')} + ${sn(4,'He')}`,false,'Un noyau lourd perd aussi des nucléons ici, mais c’est une désintégration α, spontanée. Dans la fission, un neutron casse le noyau en deux noyaux moyens.','Qu’est-ce qui déclenche la réaction : un neutron ou rien ?'],
    [`${sn(2,'H')} + ${sn(3,'H')} → ${sn(4,'He')} + n`,false,'Deux noyaux légers qui s’unissent : c’est une fusion, pas une fission.','Combien de noyaux a-t-on à gauche de la flèche ?']]),
    reveal:[{p:{fiU:1},d:900}]}},

/* ===== 8. retour à l'énigme ===== */
{cle:'retour-eq',beat:8,scene:'calcul',set:{ci:CI.soleilEq,ok:0,ok2:0},sujet:'écrire une équation avec les deux lois',
  text:['Retour au Soleil. Au bout d’une suite de réactions, 4 noyaux d’hydrogène donnent un noyau d’hélium et 2 particules X.',`4 ${nuc(1,1,'H')} → ${nh('4He')} + 2 X : que sont les particules X ?`],
  verifie:{...VF([
    [`des positons ${nuc(0,'+1','e')}`,true,'Oui : pour <i>Z</i>, 4 = 2 + 2 × 1, et un positon n’a aucun nucléon.'],
    [`des électrons ${nuc(0,-1,'e')}`,false,'La charge ne se conserve pas : 2 − 2 = 0, pas 4. Il faut 2 particules de charge +1.','Quelle charge faut-il pour que <i>Z</i> se conserve ?'],
    [`des neutrons ${nuc(1,0,'n')}`,false,'Le nombre de nucléons ne se conserve pas : 4 ≠ 4 + 2. X n’a aucun nucléon.','X peut-il avoir des nucléons ?']]),
    reveal:[{p:{ok:1},d:800}],
    apres:{tex:[[tx`4\,{}^{1}_{1}\mathrm{H}\longrightarrow{}^{4}_{2}\mathrm{He}+2\,{}^{0}_{1}\mathrm{e}`,'4 ¹H → ⁴He + 2 e⁺']]}}},
{cle:'retour-de',beat:8,scene:'niveaux',set:NIV({jeu:'soleil',lvA:1,axe:1}),seq:[{p:{lvB:1},d:800}],sujet:'le bilan du Soleil',
  text:['Fais le bilan par les masses : la masse du noyau d’hélium et des 2 positons, moins celle des 4 protons.'],
  deriv:[{tex:tx`\Delta E=\left[m\left({}^{4}\mathrm{He}\right)+2\,m(\mathrm e)-4\,m(\mathrm p)\right]c^{2}`,alt:'ΔE = [m(⁴He) + 2 m(e) − 4 m(p)] c²',r:'Après moins avant.'}],
  pari:{label:'ΔE ?',reveal:[{p:{de:1},d:1100}],apres:{html:`<p class="small">Environ ${pSol} % de la masse des 4 protons devient de l’énergie.</p>`},
    ...VF([
      [`(${fg(MHE,5)} + 2 × ${fg(ME,5)} − 4 × ${fg(MP,5)}) × ${F9} ≈ ${fr(SOLEIL.de,1)} MeV`,true,'Oui : ΔE est négatif, de l’énergie est libérée.'],
      [`(${fg(MHE,5)} − 4 × ${fg(MP,5)}) × ${F9} ≈ ${fr(SOLEIL.deSans,1)} MeV`,false,`Tu as oublié les 2 positons émis : ils ont une masse. Avec eux, ΔE ≈ ${fr(SOLEIL.de,1)} MeV.`,'Que contient le côté droit de l’équation en plus de l’hélium ?'],
      [`(4 × ${fg(MP,5)} − ${fg(MHE,5)} − 2 × ${fg(ME,5)}) × ${F9} ≈ +${fr(-SOLEIL.de,1)} MeV`,false,'Tu as pris réactifs moins produits. ΔE = produits moins réactifs : négatif quand de l’énergie est libérée.','ΔE est-il « avant moins après » ou « après moins avant » ?']])}},
{cle:'retour-duree',beat:8,scene:'soleil',set:{age:1,chim:1,grav:1,fus:0},
  text:()=>[rappelCharbon(),`Dans le Soleil, ${pSol} % de la masse de l’hydrogène devient de l’énergie.`,`Est-ce assez pour ${fr(AGE_SOLEIL/1e9,1)} milliards d’années ?`],
  pari:{reveal:[{p:{fus:1},d:1300}],
    apres:{tex:[[tx`E=${TG(PART_SOLEIL,4)}\times M\times c^{2}\approx ${TG(E_SOLEIL_J/1e45,1)}\times10^{45}\ \mathrm{J}`,`E = ${fg(PART_SOLEIL,4)} × M × c² ≈ ${fg(E_SOLEIL_J/1e45,1)} × 10⁴⁵ J`],
        [tx`\text{durée}=\dfrac{E}{L}\approx ${TG(DUREE_100/1e9,0)}\ \text{milliards d’années}`,`durée = E / L ≈ ${ent(DUREE_100/1e9)} milliards d’années`]],
      html:`<p class="small">Ce calcul suppose que toute la masse du Soleil soit de l’hydrogène changé en hélium. Le feu de Kelvin durait ${ent(KELVIN_CHIMIE)} ans : ici, plus de ${ent(Math.floor(FOIS_KELVIN/1e6))} millions de fois plus.</p>`},
    ...BET([
      ['non : moins de 1 %, c’est trop peu','La masse du Soleil est très grande et <i>c</i>² multiplie chaque kilogramme : 1 % suffit largement. Le calcul donne environ '+ent(DUREE_100/1e9)+' milliards d’années.'],
      ['tout juste',`L’écart n’est pas serré : le calcul donne environ ${ent(DUREE_100/1e9)} milliards d’années, soit ${ent(Math.round(DUREE_100/AGE_SOLEIL))} fois l’âge du Soleil.`],
      ['oui, largement',`Oui : environ ${ent(DUREE_100/1e9)} milliards d’années, soit ${ent(Math.round(DUREE_100/AGE_SOLEIL))} fois l’âge du Soleil.`,1]])}},

/* ===== 9. usages et dangers ===== */
{cle:'usages',beat:9,scene:'quiz',set:{qi:0,rv:0},sujet:'fission et désintégration',
  text:['Quelques [[applications|applications nucléaires]] : produire de l’électricité par fission ; voir l’intérieur du corps avec le fluor 18 (imagerie TEP) ; soigner avec l’iode 131 ; dater avec le carbone 14.','Un stimulateur cardiaque au plutonium 238, comme on en posait dans les années 1970 (sujet 2021), tire son énergie…'],
  verifie:VF([
    ['des désintégrations α du plutonium',true,'Oui : le plutonium 238 émet des particules α, et leur énergie alimente le stimulateur.'],
    ['de fissions du plutonium',false,'Aucun neutron ne casse le noyau ici : désintégration et fission sont deux réactions différentes. Le plutonium 238 émet des particules α.','Qu’est-ce qui déclenche une fission ?'],
    ['d’une pile chimique ordinaire',false,'C’est une source nucléaire : l’énergie vient des noyaux, pas d’une réaction chimique.','L’énergie vient-elle des noyaux ou des électrons ?']])},
{cle:'dangers',beat:9,scene:'quiz',set:{qi:1,rv:0},sujet:'irradiation et contamination',
  text:['Les rayonnements ionisants abîment les tissus : brûlures et syndrome d’irradiation aiguë à forte dose, risque accru de cancer à faible dose (OMS).','Un ouvrier inhale des poussières radioactives. Par rapport à une source posée loin de lui…'],
  verifie:{...VF([
    ['l’exposition continue même s’il s’éloigne : la source est en lui',true,'Oui : la contamination est interne, et elle dure tant que la source est dans le corps.'],
    ['s’éloigner de la zone suffit à l’arrêter',false,'Cela vaut pour une irradiation externe, quand la source est écartée. Ici, la source est dans son corps : c’est une contamination interne.','La source est-elle encore à l’extérieur de son corps ?'],
    ['aucun risque : les rayonnements ne traversent pas la peau',false,'Ici, ils n’ont pas à la traverser : la source est déjà à l’intérieur du corps.','Où se trouve la source après l’inhalation ?']]),
    reveal:[{p:{rv:1},d:1200}]}},

/* ===== 10. au bac ===== */
{cle:'bac',beat:10,scene:'niveaux',set:NIV({jeu:'po2020',lvA:1,lvB:1,lvC:1,nom:0,cut:1,val:0,axe:1}),
  text:['Bac PC 2020, session normale, exercice III, questions 2-1 et 2-2 (0,5 pt chacune).','À l’aide du diagramme d’énergie, calcule l’énergie libérée par la désintégration d’un noyau de polonium 210, puis son défaut de masse, en kg.','Quel est ton premier geste ?'],
  pari:{reveal:[{p:{nom:1},d:900}],...BET([
    ['Repérer le niveau du père et celui des produits','Oui : chaque écart du diagramme est une grandeur différente. On nomme d’abord les niveaux, puis on repère le père et les produits.',1],
    ['Prendre l’écart le plus grand du diagramme','Le plus grand écart, c’est l’énergie de liaison des produits, pas l’énergie libérée. Nomme d’abord chaque niveau.'],
    ['Convertir les trois niveaux en kilogrammes','Inutile à ce stade : on soustrait d’abord, et on ne convertit qu’un seul résultat. Nomme d’abord chaque niveau.']])}},
{cle:'bac-elib',beat:10,scene:'niveaux',set:NIV({jeu:'po2020',lvA:1,lvB:1,lvC:1,nom:1,cut:1,val:0,axe:1}),sujet:'l’énergie libérée lue sur un diagramme',
  text:[`Question 2-1 (0,5 pt) : l’énergie libérée ${Elib} lors de la désintégration d’un noyau de polonium 210. Données du sujet : 1 u = ${fg(S20.u,2)} MeV/<i>c</i>² ; 1 u = 1,66 × 10<sup>−27</sup> kg.`],
  verifie:{fixe:false,...VF([
    [`${Elib} = ${fg(S20.po/1e6,6)} × 10<sup>5</sup> − ${fg(S20.pb/1e6,6)} × 10<sup>5</sup> = ${fg(S20.eLib,1)} MeV`,true,'Oui : de l’énergie du père à celle des produits.'],
    [`${Elib} = ${fg(S20.nuc/1e6,6)} × 10<sup>5</sup> − ${fg(S20.pb/1e6,6)} × 10<sup>5</sup> = ${fg(S20.elProd,1)} MeV`,false,`Tu as pris l’écart entre les nucléons séparés et les produits : c’est ${El} des produits, pas l’énergie libérée. ${Elib} va du père aux produits.`,'Entre quels niveaux l’énergie est-elle libérée ?'],
    [`${Elib} = ${fg(S20.nuc/1e6,6)} × 10<sup>5</sup> − ${fg(S20.po/1e6,6)} × 10<sup>5</sup> = ${fg(S20.elPo,1)} MeV`,false,`C’est l’écart entre les nucléons séparés et le père : ${El}(Po), pas l’énergie libérée. ${Elib} va du père aux produits.`,'Où est le noyau père, et où sont les produits ?']]),
    reveal:[{p:{de:1},d:900},{p:{val:1},d:500}],
    apres:{tex:[[tx`E_{\text{lib}}=|\Delta E|=${TG(S20.eLib,1)}\ \mathrm{MeV}`,`Elib = |ΔE| = ${fg(S20.eLib,1)} MeV`]]}}},
{cle:'bac-dm-ecart',beat:10,scene:'niveaux',set:NIV({jeu:'po2020',lvA:1,lvB:1,lvC:1,nom:1,cut:1,val:1,axe:1,de:1}),sujet:'l’écart qui donne le défaut de masse',
  text:['Question 2-2 (0,5 pt) : le défaut de masse Δ<i>m</i> du noyau de polonium 210, en kg.','Sur le diagramme, il se lit à partir de quel écart ?'],
  verifie:{...VF([
    ['nucléons séparés − ²¹⁰Po',true,`Oui : le défaut de masse est la masse qui manque au noyau. Il vient de l’écart ${El}(Po) entre les nucléons séparés et le noyau.`],
    ['²¹⁰Po − (²⁰⁶Pb + ⁴He)',false,`C’est l’énergie libérée ${Elib}, entre le père et les produits. Le défaut de masse du père compare le noyau à ses nucléons séparés.`,'Le défaut de masse compare le noyau à quoi ?'],
    ['nucléons séparés − (²⁰⁶Pb + ⁴He)',false,`C’est l’énergie de liaison des produits, pas celle du père. Le noyau dont on veut le défaut de masse est le polonium.`,'Le noyau dont on veut le défaut de masse est-il le père ou les produits ?']]),
    reveal:[{p:{up:1},d:900}]}},
{cle:'bac-dm',beat:10,scene:'niveaux',set:NIV({jeu:'po2020',lvA:1,lvB:1,lvC:1,nom:1,cut:1,val:1,axe:1,de:1,up:1}),sujet:'défaut de masse en kg depuis un diagramme',
  text:['On lit l’écart en chiffres, puis on passe de l’énergie à la masse, jusqu’aux kilogrammes.'],
  deriv:[
    {tex:tx`\begin{aligned}E_\ell(\mathrm{Po})&=\left(${TG(S20.nuc/1e6,6)}-${TG(S20.po/1e6,6)}\right)\times10^{5}\\&=${TG(S20.elPo,1)}\ \mathrm{MeV}\end{aligned}`,alt:`Eℓ(Po) = (${fg(S20.nuc/1e6,6)} − ${fg(S20.po/1e6,6)}) × 10⁵ = ${fg(S20.elPo,1)} MeV`,r:'Nucléons séparés moins noyau : l’énergie à fournir.',p:{up:1}},
    {tex:tx`\Delta m=\dfrac{E_\ell}{c^{2}}=${TG(S20.elPo,1)}\ \mathrm{MeV}/c^{2}`,alt:`Δm = Eℓ / c² = ${fg(S20.elPo,1)} MeV/c²`,r:'<i>E</i><sub>ℓ</sub> = Δ<i>m</i> <i>c</i>² : on divise par <i>c</i>².'}],
  pari:{label:'En kg ?',apres:{tex:[[tx`\begin{aligned}\Delta m&=\dfrac{${TG(S20.elPo,1)}}{${TG(S20.u,2)}}\approx ${TG(S20.dmU,3)}\ \mathrm{u}\\&\approx ${TG(S20.dmU,3)}\times1{,}66\times10^{-27}\approx ${TG(S20.dmKg*1e27,2)}\times10^{-27}\ \mathrm{kg}\end{aligned}`,`Δm ≈ ${fg(S20.dmU,3)} u ≈ ${fg(S20.dmKg*1e27,2)} × 10⁻²⁷ kg`]]},
    ...VF([
      [`${fg(S20.elPo,1)} / ${fg(S20.u,2)} × 1,66 × 10<sup>−27</sup> ≈ ${fg(S20.dmKg*1e27,2)} × 10<sup>−27</sup> kg`,true,'Oui : on passe des MeV/<i>c</i>² aux u, puis aux kilogrammes.'],
      [`${fg(S20.elPo,1)} × 1,66 × 10<sup>−27</sup> ≈ ${fg(S20.elPo*S20.uKg*1e24,2)} × 10<sup>−24</sup> kg`,false,`Tu as pris des MeV/<i>c</i>² pour des u. Divise d’abord par ${fg(S20.u,2)} pour obtenir des u.`,'Une valeur en MeV/<i>c</i>² est-elle déjà en u ?'],
      [`${fg(S20.elPo,1)} × ${fg(S20.u,2)} × 1,66 × 10<sup>−27</sup> ≈ ${fg(S20.elPo*S20.u*S20.uKg*1e21,2)} × 10<sup>−21</sup> kg`,false,`Le facteur ${fg(S20.u,2)} est dans le mauvais sens : 1 u = ${fg(S20.u,2)} MeV/<i>c</i>², donc on divise.`,'Pour passer de MeV/<i>c</i>² à u, multiplie-t-on ou divise-t-on ?']])}},
{cle:'bac-copie',beat:10,scene:'niveaux',set:NIV({jeu:'po2020',lvA:1,lvB:1,lvC:1,nom:1,cut:1,val:1,axe:1,de:1,up:1}),
  text:['La rédaction attendue : quatre lignes, la formule littérale avant le nombre. Barème imprimé : 0,5 pt + 0,5 pt.','C’est la consigne des sujets : « On donnera les expressions littérales avant de passer aux applications numériques. »'],
  tex:[[tx`\begin{aligned}E_{\text{lib}}&=E(\mathrm{Po})-E(\mathrm{Pb}+\mathrm{He})\\&=${TG(S20.eLib,1)}\ \mathrm{MeV}\end{aligned}`,`Elib = E(Po) − E(Pb + He) = ${fg(S20.eLib,1)} MeV`],
    [tx`\begin{aligned}E_\ell(\mathrm{Po})&=E(126\,\mathrm n+84\,\mathrm p)\\&\quad-E(\mathrm{Po})\\&=${TG(S20.elPo,1)}\ \mathrm{MeV}\end{aligned}`,`Eℓ(Po) = E(126 n + 84 p) − E(Po) = ${fg(S20.elPo,1)} MeV`],
    [tx`\begin{aligned}\Delta m&=\dfrac{E_\ell}{c^{2}}=\dfrac{${TG(S20.elPo,1)}}{${TG(S20.u,2)}}\\&\approx ${TG(S20.dmU,3)}\ \mathrm{u}\end{aligned}`,`Δm = Eℓ / c² ≈ ${fg(S20.dmU,3)} u`],
    [tx`\begin{aligned}\Delta m&\approx ${TG(S20.dmU,3)}\times1{,}66\times10^{-27}\\&\approx ${TG(S20.dmKg*1e27,2)}\times10^{-27}\ \mathrm{kg}\end{aligned}`,`Δm ≈ ${fg(S20.dmKg*1e27,2)} × 10⁻²⁷ kg`]]},
{cle:'bac-2022-lit',beat:10,scene:'calcul',set:{ci:CI.iode,ok:0,ok2:0},sujet:'la ligne littérale du bilan par les masses',
  text:['À toi. Bac PC 2022, session normale, exercice 2, partie 2, question 2 (0,5 pt) : l’énergie libérée |Δ<i>E</i>| par la désintégration d’un noyau d’iode 131, qui donne un noyau de xénon et une particule β<sup>−</sup>.','Quelle est la formule littérale de Δ<i>E</i> ?'],
  verifie:{...VF([
    [`${dE} = [<i>m</i>(Xe) + <i>m</i>(β<sup>−</sup>) − <i>m</i>(I)] <i>c</i>²`,true,'Oui : après moins avant, avec le xénon et la particule β<sup>−</sup> émise.'],
    [`${dE} = [<i>m</i>(I) − <i>m</i>(Xe) − <i>m</i>(β<sup>−</sup>)] <i>c</i>²`,false,`Tu as pris avant moins après : ${dE} serait positif pour une réaction qui libère de l’énergie. Écris après moins avant.`,'Après moins avant, ou avant moins après ?'],
    [`${dE} = [<i>m</i>(Xe) − <i>m</i>(I)] <i>c</i>²`,false,'Tu as oublié la particule β<sup>−</sup> émise : elle pèse aussi. Les produits sont le xénon et l’électron.','Combien de particules sortent de la désintégration ?']])}},
{cle:'bac-2022-num',beat:10,scene:'calcul',set:{ci:CI.iode,ok:0,ok2:0},sujet:'l’application numérique du bilan par les masses',
  text:['Même question, application numérique : calcule |Δ<i>E</i>|, en MeV.'],
  verifie:{...VF([
    [`|(${fg(S22.mXe,6)} + 5,4858 × 10<sup>−4</sup> − ${fg(S22.mI,6)}) × ${fg(S22.u,1)}| ≈ ${fr(Math.abs(S22.dE),3)} MeV`,true,'Oui : les masses sont en u, et 1 u vaut 931,5 MeV/<i>c</i>².'],
    [`|(${fg(S22.mXe,6)} − ${fg(S22.mI,6)}) × ${fg(S22.u,1)}| ≈ ${fr(Math.abs(S22.sansBeta),3)} MeV`,false,`Tu as oublié la masse de la particule β<sup>−</sup> : avec elle, |${dE}| ≈ ${fr(Math.abs(S22.dE),3)} MeV.`,'Les produits sont-ils le xénon seul ?'],
    [`|(${fg(S22.mXe,6)} + 5,4858 × 10<sup>−4</sup> − ${fg(S22.mI,6)}) × (3,00 × 10<sup>8</sup>)²| ≈ ${sciH(Math.abs(S22.kg),2)} MeV`,false,'Tu as pris des u pour des kilogrammes. Une masse en u se convertit avec 1 u = 931,5 MeV/<i>c</i>², pas avec <i>c</i>².','Que vaut 1 u en MeV ?']]),
    reveal:[{p:{ok:1},d:700}],
    apres:{tex:[[tx`\begin{aligned}\Delta E&=\left[m(\mathrm{Xe})+m(\beta^{-})-m(\mathrm I)\right]c^{2}\\&\approx ${TG(S22.dE,3)}\ \mathrm{MeV}\end{aligned}`,`ΔE ≈ ${fg(S22.dE,3)} MeV`]],html:`<p class="small">Ta phrase de conclusion : ${dE} &lt; 0, la désintégration libère de l’énergie, ${Elib} = |${dE}| ≈ ${fr(Math.abs(S22.dE),3)} MeV.</p>`}}},
{cle:'bac-2b',beat:10,scene:'calcul',set:{ci:CI.sujet23,ok:0,ok2:0},sujet:'le bilan par les énergies de liaison',
  text:[`Bac PC 2023, session normale, exercice 2, partie 2, question 2-2 (0,5 pt) : l’énergie libérée ${Elib} = |${dE}| par la fusion d’un noyau de tritium et d’un noyau de deutérium, en MeV.`,`Prends les valeurs du sujet : ${El}(<sup>2</sup>H) = ${fg(S23.h2,3)} MeV est une donnée du sujet.`],
  verifie:{...VF([
    [`|${fg(S23.h2,3)} + ${fg(S23.h3,3)} − ${fg(S23.he,3)}| = ${fg(S23.lib,3)} MeV`,true,'Oui : on fournit celles des réactifs, on récupère celle du produit.'],
    [`${fg(S23.h2,3)} + ${fg(S23.h3,3)} + ${fg(S23.he,3)} = ${fg(S23.tout,3)} MeV`,false,`Tu as tout additionné : on fournit ${El} des réactifs, on récupère celle du produit. Il faut une différence.`,'Le produit se défait-il, ou se forme-t-il ?'],
    [`|${fg(S23.ela.h2,3)} + ${fg(S23.ela.h3,3)} − ${fg(S23.he/4,3)}| = ${fg(S23.parA,3)} MeV`,false,`Tu as additionné des ${ElA} : ce sont les ${El} qui s’additionnent, car les noyaux n’ont pas le même nombre de nucléons.`,`Additionne-t-on des ${El} ou des ${ElA} ?`]]),
    reveal:[{p:{ok:1},d:700}],
    apres:{tex:[[tx`E_{\text{lib}}=|\Delta E|=\left|E_\ell({}^{2}\mathrm H)+E_\ell({}^{3}\mathrm H)-E_\ell({}^{4}\mathrm{He})\right|=${TG(S23.lib,3)}\ \mathrm{MeV}`,`Elib = |Eℓ(²H) + Eℓ(³H) − Eℓ(⁴He)| = ${fg(S23.lib,3)} MeV`]],
      html:`<p class="small">Dans le même sujet, question 2-1 a- (0,25 pt) : « l’énergie à fournir pour dissocier le tritium est ${fg(S23.h3,3)} MeV » est vraie, c’est ${El}. Question 2-1 b- (0,25 pt) : ${ElA} vaut ${fg(S23.ela.h3,3)} MeV pour le tritium contre ${fg(S23.ela.h2,3)} pour le deutérium : le tritium est plus stable.</p>`}}},
{cle:'bac-erreur',beat:10,scene:'quiz',set:{qi:2,rv:0},sujet:'ne pas additionner des E_ℓ/A',
  text:[`Bac PC 2019, session normale, exercice II, partie 2, question 3 (0,5 pt), un QCM : ${nh('222Rn')} → ${nh('218Po')} + ${nh('4He')}, avec ${ElA} = ${fg(S19.rn,2)} ; ${fg(S19.po,2)} ; ${fg(S19.he,2)} MeV/nucléon.`,`Une copie coche ${Elib} = ${fg(S19.faux1,2)} MeV. Quelle est son erreur ?`],
  verifie:{...VF([
    [`elle a calculé ${fg(S19.po,2)} + ${fg(S19.he,2)} − ${fg(S19.rn,2)}, des ${ElA} additionnées`,true,`Oui : il faut <i>A</i> × ${ElA}, d’où ${fg(S19.lib,2)} MeV. L’autre case, ${fg(S19.faux2,1)} MeV, est la somme des trois ${El}.`],
    [`elle a calculé 218 × ${fg(S19.po,2)} − 222 × ${fg(S19.rn,2)}, et oublié α`,false,`Ce calcul donne ${fr(Math.abs(S19.elPo-S19.elRn),2)} MeV, pas ${fg(S19.faux1,2)}. Cherche le calcul qui donne ${fg(S19.faux1,2)}.`,`Que donne ${fg(S19.po,2)} + ${fg(S19.he,2)} − ${fg(S19.rn,2)} ?`],
    [`elle a calculé ${fg(S19.elPo,2)} + ${fg(S19.elHe,2)} + ${fg(S19.elRn,2)}, la somme des ${El}`,false,`Ce calcul donne ${fg(S19.faux2,1)} MeV, l’autre case du QCM, pas ${fg(S19.faux1,2)}. Cherche avec quels nombres la copie a calculé ${fg(S19.faux1,2)}.`,`Que donne ${fg(S19.po,2)} + ${fg(S19.he,2)} − ${fg(S19.rn,2)} ?`]]),
    reveal:[{p:{rv:1},d:1200}]}},

/* ===== 11. pour finir ===== */
{cle:'q1',beat:11,scene:'quiz',set:{qi:3,rv:0},sujet:'la masse ne se conserve pas',
  text:['Bac PC 2023, session normale, exercice 2, partie 1, question 1-1 (0,5 pt), un QCM. Laquelle de ces affirmations est juste ?'],
  verifie:{fixe:false,...VF([
    ['Lors d’une réaction de fission nucléaire, de la masse est convertie en énergie',true,'Oui : la masse qui disparaît devient de l’énergie, c’est le principe du bilan.'],
    ['La masse d’un noyau atomique est égale à la somme des masses de ses nucléons',false,'Tu as supposé que la masse se conserve. Un noyau pèse moins que ses nucléons séparés : Δ<i>m</i> > 0.','Le noyau pèse-t-il plus, autant ou moins que ses nucléons séparés ?'],
    ['Aucune des deux affirmations',false,'La première est la définition même du bilan : la masse qui disparaît devient de l’énergie.','Que se passe-t-il pour la masse dans une fission ?']]),
    reveal:[{p:{rv:1},d:1200}]}},
{cle:'q2',beat:11,scene:'quiz',set:{qi:4,rv:0},sujet:'E_ℓ pour séparer, E_ℓ/A pour comparer',
  text:[`${nh('4He')} : ${d2(ELA('4He'))} MeV/nucléon. ${nh('238U')} : ${d2(ELA('238U'))} MeV/nucléon.`,'Pour séparer entièrement un noyau en ses nucléons, lequel demande le plus d’énergie ?'],
  verifie:{fixe:false,...VF([
    [`l’uranium : 238 × ${d2(ELA('238U'))} ≈ ${fg(ELT('238U'),0)} MeV`,true,`Oui : ${El} = <i>A</i> × ${ElA}, et l’uranium a 238 nucléons. On compare ${ElA} pour la stabilité, ${El} pour l’énergie à fournir.`],
    ['l’hélium : il ne se désintègre jamais',false,`La durée de vie ne dit pas l’énergie à fournir. Cette énergie est ${El} = <i>A</i> × ${ElA}.`,`Comment calcule-t-on ${El} à partir de ${ElA} ?`],
    [`presque pareil : ${d2(ELA('4He'))} et ${d2(ELA('238U'))} sont voisins`,false,`Ces deux nombres sont par nucléon : il faut les multiplier par le nombre de nucléons, 4 pour l’hélium, 238 pour l’uranium.`,'Combien de nucléons chaque noyau compte-t-il ?']])}},
{cle:'q3',beat:11,scene:'quiz',set:{qi:5,rv:0},sujet:'le signe de ΔE',
  text:[`Une réaction a ${dE} = +${fr(3.2,1)} MeV. Que peut-on dire ?`],
  verifie:{fixe:false,...VF([
    [`il faut lui fournir ${fr(3.2,1)} MeV`,true,'Oui : ΔE positif, le système finit plus haut, il a reçu de l’énergie.'],
    [`elle libère ${fr(3.2,1)} MeV, comme toute réaction`,false,`Tu as lu le signe + comme un gain. ${dE} > 0 : le système finit plus haut, il a reçu de l’énergie.`,'Le système finit-il plus haut ou plus bas ?'],
    ['on ne peut rien dire sans connaître les masses',false,`Le signe de ${dE} suffit : positif, il faut fournir de l’énergie ; négatif, elle est libérée.`,`Le signe de ${dE} porte-t-il une information ?`]])}},
{cle:'fin',beat:11,scene:'end',seq:[{p:{n:5},d:3200,w:300}],
  text:['Fin de la séance.'],html:()=>profileHTML()}
];

// les étapes à geste : « Suivant » attend la saisie ou la visite de la courbe
STEPS.forEach(st=>{if(st.ctl==='dm')st.need=()=>!!S.dmok;if(st.ctl==='nuc')st.need=()=>nucOk();});

// « 30 % » : une espace fine insécable avant le signe ; un nombre ne se sépare pas de son unité
const pct=s=>typeof s==='string'?s.replace(/(\d) %/g,'$1 %').replace(/(\d) (s|ans|jours|g|kg|u|J|eV|MeV|MeV\/nucléon|MeV\/c²|noyaux|neutrons|nucléons|milliards|millions)(?=[\s.,;:)<]|$)/g,'$1 $2'):s;
const pctP=p=>typeof p==='string'?pct(p):p&&typeof p==='object'?{...p,t:pct(p.t)}:p;
const pctOpts=P=>{if(!P)return;if(P.opts)P.opts.forEach(o=>{o.t=pct(o.t);o.fb=pct(o.fb);o.indice=pct(o.indice);});
  if(P.apres){const d=Object.getOwnPropertyDescriptor(P.apres,'html');if(d&&!d.get&&typeof P.apres.html==='string')P.apres.html=pct(P.apres.html);}};
STEPS.forEach(st=>{
  if(typeof st.text==='function'){const f=st.text;st.text=()=>{const v=f();return (Array.isArray(v)?v:[v]).filter(x=>x!=null&&x!=='').map(pctP);};}
  else st.text=(Array.isArray(st.text)?st.text:[st.text]).filter(x=>x!=null&&x!=='').map(pctP);
  if(st.deriv)st.deriv.forEach(x=>{x.r=pct(x.r);});
  pctOpts(st.pari);pctOpts(st.verifie);
});

/* ---------- les mots ---------- */
const mots={
  soddy:{t:'lois de conservation',d:'Dans toute réaction nucléaire, le nombre total de nucléons (<i>A</i>) et la charge totale (<i>Z</i>) sont les mêmes avant et après. On les appelle aussi lois de Soddy.'},
  energiemasse:{t:'énergie de masse',d:`<i>E</i> = <i>mc</i>² : l’énergie qu’un système possède du seul fait de sa masse <i>m</i>, au repos. <i>c</i> = ${cS} m·s<sup>−1</sup> est la célérité de la lumière.`},
  uma:{t:'unité de masse atomique',d:`Le u : 1/12 de la masse d’un atome de carbone 12. 1 u = ${fg(U_KG*1e27,5)} × 10<sup>−27</sup> kg, de l’ordre de la masse d’un nucléon. 1 u correspond à ${F9} MeV/<i>c</i>².`},
  mev:{t:'MeV',d:`Le méga-électronvolt : 1 MeV = 10<sup>6</sup> eV, et 1 eV = ${evJ} × 10<sup>−19</sup> J, donc 1 MeV = ${mevJ} × 10<sup>−13</sup> J. C’est l’unité commode pour l’énergie des noyaux.`},
  massenoyau:{t:'masse du noyau',d:'Un atome compte aussi ses <i>Z</i> électrons : sa masse est plus grande que celle de son noyau. Dans un énoncé, prends les masses telles qu’elles sont nommées.'},
  defautmasse:{t:'défaut de masse',d:'Δ<i>m</i> : la différence entre la masse des nucléons séparés et celle du noyau, Δ<i>m</i> = <i>Z</i> <i>m</i><sub>p</sub> + (<i>A</i> − <i>Z</i>) <i>m</i><sub>n</sub> − <i>m</i>(noyau). Elle est positive dès qu’un noyau compte plusieurs nucléons.'},
  energieliaison:{t:'énergie de liaison',d:'<i>E</i><sub>ℓ</sub> : l’énergie qu’il faut fournir à un noyau au repos pour le séparer en ses nucléons au repos. <i>E</i><sub>ℓ</sub> = Δ<i>m</i> <i>c</i>², en MeV.'},
  energieliaisonnucleon:{t:'énergie de liaison par nucléon',d:'<i>E</i><sub>ℓ</sub>/<i>A</i> : l’énergie de liaison divisée par le nombre de nucléons, en MeV/nucléon. Plus elle est grande, plus le noyau est stable.'},
  aston:{t:'courbe d’Aston',d:'La courbe de −<i>E</i><sub>ℓ</sub>/<i>A</i> en fonction de <i>A</i>. Son creux, vers <i>A</i> ≈ 60 (le fer et le nickel), est celui des noyaux les plus stables.'},
  energieliberee:{t:'énergie libérée',d:'<i>E</i><sub>lib</sub> = |Δ<i>E</i>| : l’énergie qu’une réaction cède au milieu, quand Δ<i>E</i> &lt; 0. Elle est toujours positive.'},
  fusion:{t:'fusion',d:'Une réaction nucléaire où deux noyaux légers s’unissent en un noyau plus lourd. Exemple : ²H + ³H → ⁴He + n.'},
  fission:{t:'fission',d:'Une réaction nucléaire où un noyau lourd, frappé par un neutron, se casse en deux noyaux de taille moyenne, avec des neutrons émis. Ces neutrons peuvent en casser d’autres : c’est une réaction en chaîne, hors programme.'},
  applications:{t:'applications nucléaires',d:'Produire de l’électricité par fission (une réaction différente de la désintégration radioactive) ; soigner (iode 131) ; voir l’intérieur du corps (fluor 18, imagerie TEP) ; dater (carbone 14) ; alimenter des stimulateurs cardiaques (plutonium 238, dans les années 1970 ; remplacé depuis par des piles au lithium).'},
};
Object.values(mots).forEach(m=>{m.d=pct(m.d);});

/* ---------- la fin : une ligne de résultat, les exercices, le détail ---------- */
const bet=k=>{const st=STEPS.find(s=>s.cle===k),j=S.first[k];return (!st||j==null)?null:!!st.pari.opts[j].juste;};
function profileHTML(){
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>ctx.juste(s.k)!=null),vok=V.filter(s=>ctx.juste(s.k)===true),vko=V.filter(s=>ctx.juste(s.k)===false);
  const P=STEPS.filter(s=>s.pari&&!s.verifie&&!s.pari.opts.some(o=>o.ok)),pv=P.filter(s=>bet(s.cle)!=null);
  const Q=[['q1','la masse d’un noyau et celle de ses nucléons'],['q2','E_ℓ pour séparer, E_ℓ/A pour comparer'],['q3','le signe de ΔE']];
  const res=Q.map(([k])=>ctx.juste(k));
  const ligne=`« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length||V.length}</b>. Tes paris : ${pv.length} faits.`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]}</li>`).join('');
  const bets=[];
  const c=bet('charbon');if(c!=null)bets.push(c?'tu avais le bon ordre de grandeur pour le feu chimique':'le feu chimique durait bien moins que tu ne le pensais');
  const a=bet('aston');if(a!=null)bets.push(a?'tu savais que la masse ne se conserve pas':'« la masse se conserve » t’a tenté au départ');
  const s=bet('sens');if(s!=null)bets.push(s?'tu savais que l’énergie de liaison est à fournir':'l’énergie de liaison comme réserve t’a tenté');
  const r=ctx.juste('par-nucleon');if(r!=null)bets.push(r?'tu avais compris qu’on compare par nucléon':'comparer les énergies totales t’a tenté');
  const f=bet('fer-fer');if(f!=null)bets.push(f?'tu savais que toute fusion ne libère pas d’énergie':'« toute fusion libère » t’a tenté');
  const revoir=vko.map(x=>x.sujet).filter(Boolean);
  return `<p class="res">${pct(ligne)}</p><a class="lien-exos" href="/pilote/noyaux/exercices">Faire les exercices →</a>
<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}${revoir.length?`<p class="small">À revoir : ${revoir.join(' ; ')}.</p>`:''}<div class="next"><div class="pari-k">Dans les exercices, piège par piège</div><ol><li>La masse qui se conserve : les exercices 3 (défaut de masse) et 14 (vrai ou faux).</li><li>${El} contre ${ElA} : l’exercice 5 (stabilité) ; ${ElA} additionnées : l’exercice 10.</li><li>Le signe de ${dE} : l’exercice 9 ; les neutrons oubliés : les exercices 7 et 9.</li><li>Les unités et le facteur 931,5 : les exercices 1 et 11 ; la courbe d’Aston, fission et fusion : le 6.</li></ol></div></details>`.replace('931,5',F9);
}

/* ---------- contrôles par étape ---------- */
S.dmok=false;S.dmvu=false;S.nucvus=[];
function noteDm(v){
  const T=[[4*MP-MHE,'Tu as compté 4 protons : il y a 2 protons et 2 neutrons.'],
    [MHE-(2*MP+2*MN),'Le noyau moins les nucléons : l’ordre est inversé. Δ<i>m</i> = nucléons séparés − noyau.'],
    [2*MP+2*MN+MHE,'Tu as additionné la masse du noyau : il faut la retrancher.'],
    [MN-MP,'<i>m</i><sub>n</sub> − <i>m</i><sub>p</sub> n’est pas Δ<i>m</i> : il faut les masses de tous les nucléons.']];
  const p=T.find(([x])=>proche(v,x,{rel:0.03}));
  return p?p[1]:'Ce n’est pas la bonne valeur. Reprends : 2 protons et 2 neutrons, moins la masse du noyau.';
}
const DM_BON=`Δ<i>m</i> = 2 × ${fg(MP,5)} + 2 × ${fg(MN,5)} − ${fg(MHE,5)} ≈ <b>${fg(DM_HE,5)} u</b>. C’est la masse qui manque au noyau d’hélium.`;
const iBas=[ASTON_NOYAUX.indexOf('56Fe'),ASTON_NOYAUX.indexOf('62Ni')],iC=ASTON_NOYAUX.indexOf('12C'),iU=ASTON_NOYAUX.indexOf('238U');
const nucBas=()=>iBas.some(i=>S.nucvus.includes(i));
const nucOk=()=>nucBas()&&S.nucvus.includes(iC)&&S.nucvus.includes(iU);
const nucReste=()=>[nucBas()?null:'le noyau le plus bas',S.nucvus.includes(iC)?null:'le carbone 12',S.nucvus.includes(iU)?null:'l’uranium 238'].filter(Boolean).join(', ');
const CTL={
  dm:{html:()=>`<div class="ctl"><label class="saisie"><span>Δ<i>m</i> =</span><input id="dmin" type="text" inputmode="text" autocomplete="off" spellcheck="false" placeholder="par exemple 0,0123"><span>u</span></label><div class="ctl-btns"><button type="button" class="ctl-btn" id="dmok" disabled>Vérifier</button><button type="button" class="ctl-btn alt" id="dmvoir">Voir le calcul</button></div></div><p class="ctl-note" id="dmfb"></p>`,
    init(){const inp=$('#dmin'),ok=$('#dmok'),voir=$('#dmvoir'),fb=$('#dmfb'),sc=scenes.niveaux;
      const fini=()=>{inp.disabled=true;ok.disabled=true;voir.disabled=true;ok.hidden=true;voir.hidden=true;ctx.stop();sc.p.dmv=1;sc.render();ctx.tween(scenes.assemblage,{val:1},700);ctx.majNav();};
      if(S.dmok){inp.value=S.dmval||'';fb.innerHTML=DM_BON;fini();}
      inp.addEventListener('input',()=>{ok.disabled=!inp.value.trim();});
      const tester=()=>{const v=lireNombre(inp.value);
        if(!Number.isFinite(v)){fb.innerHTML='Écris un nombre, par exemple 0,0123.';return;}
        if(proche(v,DM_HE,{rel:0.03})){S.dmok=true;S.dmval=inp.value;fb.innerHTML=`Oui. ${DM_BON}`;fini();$('#next').focus();}
        else{S.dmessais=(S.dmessais||0)+1;fb.innerHTML=`<b>Pas tout à fait.</b> ${noteDm(v)}`;}
        ctx.voir(fb);};
      ok.addEventListener('click',tester);
      inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&inp.value.trim()){e.preventDefault();tester();}});
      voir.addEventListener('click',()=>{S.dmok=true;S.dmvu=true;fb.innerHTML=DM_BON;fini();ctx.voir(fb);$('#next').focus();});}},
  nuc:{html:()=>`<div class="nx-cur"><input id="nxr" type="range" min="0" max="${ASTON_NOYAUX.length-1}" step="1" value="0" aria-label="Noyau désigné sur la courbe"><output id="nxo" for="nxr"></output></div><div class="ctl-btns"><button type="button" class="ctl-btn" id="nxn">Noyau suivant →</button><button type="button" class="ctl-btn alt" id="nxp">← Noyau précédent</button></div><p class="ctl-note" id="nxfb"></p>`,
    init(){const r=$('#nxr'),o=$('#nxo'),n=$('#nxn'),p=$('#nxp'),fb=$('#nxfb'),sc=scenes.aston;
      const poser=i=>{i=clamp(i,0,ASTON_NOYAUX.length-1);r.value=i;ctx.stop();sc.p.nuc=i;sc.p.lire=1;sc.render();
        const k=ASTON_NOYAUX[i];o.innerHTML=`${nuc(NU[k].A,NU[k].Z,NU[k].X)}`;
        if(!S.nucvus.includes(i))S.nucvus.push(i);
        n.disabled=i>=ASTON_NOYAUX.length-1;p.disabled=i<=0;
        fb.innerHTML=nucOk()?'La courbe descend vite jusque vers <i>A</i> ≈ 60, où elle a son creux (le fer et le nickel), puis elle remonte lentement.':`Il te reste à désigner : ${nucReste()}.`;
        ctx.majNav();};
      r.addEventListener('input',()=>poser(+r.value));n.addEventListener('click',()=>poser(+r.value+1));p.addEventListener('click',()=>poser(+r.value-1));
      poser(S.nucvus.length?S.nucvus[S.nucvus.length-1]:0);}}
};

// « Passer » : un bouton du panneau mène à une autre étape (ce qu'il faut savoir ; la partie fission et fusion en SVT)
const surSaut=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');if(!b||!root.contains(b))return;const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0){e.preventDefault();ctx.aller(i);}};
root.addEventListener('click',surSaut);

return {BEATS,STEPS,CTL,mots,
  reset(){S.dmok=false;S.dmvu=false;S.dmval='';S.dmessais=0;S.nucvus=[];},
  plain:s=>s.replace(/⁣(\d+)⁣[^⁣]*⁣([A-Za-z]+)/g,(m,A,X)=>A==='0'?X:`${X} ${A}`).replace(/ ?%/g,' pour cent').replace(/Δ/g,' delta ').replace(/ℓ/g,' l ').replace(/\bMeV\b/g,'méga-électronvolt').replace(/α/g,'alpha '),
  demonter(){root.removeEventListener('click',surSaut);}};
});
}
