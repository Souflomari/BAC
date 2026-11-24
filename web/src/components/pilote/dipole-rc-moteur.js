/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Le dipôle RC », V3 (plan : docs/refonte/specs/dipole-rc.md, §9 prime sur le reste du plan).
 *
 * Treize parties, 58 étapes : ce qu'il faut savoir (sautable), l'énigme (une lampe qui s'allume puis
 * s'éteint dans un circuit coupé, puis se rallume sans générateur), le condensateur (Leyde,
 * armatures, convention récepteur, i = dq/dt, q = Cu, farad, courant constant, association), la charge
 * pas à pas, l'équation différentielle, sa solution (la vérification, les dimensions, i(t), q(t)), la
 * constante de temps (la figure-clé : la courbe u_C(t) lue de trois façons), la décharge, l'énergie
 * (sautable en SVT pour l'établissement), la mesure à l'oscilloscope, le retour à l'énigme, deux sujets
 * du bac (2022, 2021), le bilan.
 *
 * Les scènes vivent dans dipole-rc-scenes-{a,b,c}.js (`circuit` est un type nouveau), les données
 * sourcées et les calculs dans dipole-rc-outils.js : AUCUN nombre affiché n'est écrit à la main ici, il
 * vient d'un calcul ou d'une donnée sourcée. Le déroulé, les paris et les dérivations sont dans noyau.js.
 *
 * Ce qui reste local : le bouton « Pas suivant » de la construction (`pas`), les trois curseurs (`rc`),
 * les boutons « passer » (ce qu'il faut savoir ; le rappel sur e^u ; l'établissement de l'énergie en SVT).
 */
import { monterLecon } from "./noyau";
import {
  fr, ent, sciH, TN, outilsRc,
  E_V, R_OHM, C_F, TAU, I0, T_MAX, uC, U63, U37, I_TAU, T_HALF, MOITIE, DUREE_5, PARTS_N, chargePart,
  N_PAS, DT_PAS, REDUC, T_FAUX37, uPas, dUPas, iPas, qPas, U_10, U_10_EXACT, EE_12, EE_24, FOIS_ENERGIE, OSC_S_DIV, OSC_DIV,
  CRANS_R, CRANS_C, CRANS_E, S22, S21, S18, S25,
} from "./dipole-rc-outils";
import { scenesA } from "./dipole-rc-scenes-a";
import { scenesB } from "./dipole-rc-scenes-b";
import { scenesC } from "./dipole-rc-scenes-c";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,clamp,scenes,S,defs}=ctx;
const $=ctx.$;
const tx=String.raw;
const O=outilsRc(ctx);

[['rcarw','s-ink'],['rcarwA','s-a']].forEach(([id,c])=>{const mk=E('marker',{id,viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'6',markerHeight:'6',orient:'auto-start-reverse'},defs);E('path',{d:'M0 0L10 5L0 10z',class:c},mk);});
E('rect',{x:100,y:130,width:830,height:480},E('clipPath',{id:'rcclip-courbe'},defs));

/* ---------- les nombres du texte, tous calculés ---------- */
const d1=x=>fr(x,1), d2=x=>fr(x,2), pc=x=>fr(x*100,0), dn=x=>fr(x,Math.abs(x-Math.round(x))<1e-9?0:1);
const i0mA=d1(I0*1e3), tauS=d1(TAU), u63=d1(U63), u37=d1(U37), iTau=d2(I_TAU*1e3);
const dtp=d2(DT_PAS), q1=fr(qPas(1)*1e3,3), du1=d1(dUPas(1)), du2=d2(dUPas(2)), i2=d2(iPas(2)*1e3);
const u10=d1(U_10), u10x=d1(U_10_EXACT), redP=fr(REDUC,1);
const ee12=d1(EE_12*1e3), ee24=d1(EE_24*1e3), th=d1(T_HALF), t5=fr(DUREE_5,0), tau2=d1(2*TAU);
const kO=fr(R_OHM/1e3,0), uFc=fr(C_F*1e6,0), Ev=fr(E_V,0), oscD=d1(OSC_DIV), oscS=d1(OSC_S_DIV);
const p63=pc(chargePart(1)), p86=pc(chargePart(2)), p99=fr(chargePart(5)*100,1);
// les sujets
const R22=sciH(S22.R,1), C22=fr(S22.C*1e6,0), tau22=fr(S22.tau*1e3,0), i22=fr(S22.i0*1e3,0), t37=fr(S22.t37*1e3,0), th22=fr(S22.tHalf*1e3,0);
const RC21=sciH(S21.RC,1), C21=fr(S21.C*1e6,0), pente21=d1(-S21.pente);
const Ceq=fr(S18.Ceq*1e6,0), C1=fr(S18.C1*1e6,1), C2=fr(S18.C2*1e6,1);

/* ---------- les trois pièges des copies, et deux pages de la scène « quiz » ---------- */
const QUIZ=[
  {titre:'Piège n° 1 : 63 % sur une courbe qui descend',tag:'copie sur le sujet 2022, courbe (*C*_{2})',big:`*i* = 63 % de ${i22} mA ?`,sub:`${d1(S22.i63*1e3)} mA donne *τ* ≈ ${t37} ms, donc *C* ≈ ${t37} µF`,r1:`sur une descente, on lit où il reste 37 % : ${d1(S22.i37*1e3)} mA`,r2:`*τ* = ${tau22} ms, donc *C* = ${C22} µF`},
  {titre:'Piège n° 2 : la capacité équivalente',tag:'à retenir pour tout sujet',big:'série ou parallèle ?',sub:'deux condensateurs de 10 µF',r1:'parallèle : les capacités s’ajoutent, 20 µF',r2:'série : 1/*C*_{éq} = 1/*C*_{1} + 1/*C*_{2}, donc 5 µF'},
  {titre:'Piège n° 3 : les préfixes et le produit',tag:'à retenir pour tout sujet',big:`*τ* = *RC* = ${tauS} s`,sub:`*R* = ${kO} kΩ et *C* = ${uFc} µF`,r1:`${uFc} µF = ${sciF2(C_F)} F : on convertit d’abord`,r2:`*R*/*C* ou ${uFc} sans conversion : un résultat faux`},
];
function sciF2(x){return sciH(x,1).replace(/<sup>(.*?)<\/sup>/,'^{$1}');}
scenesA(ctx,O);
scenesB(ctx,O);
scenesC(ctx,O,QUIZ);

/* ---------- des écritures pour le panneau ---------- */
const uCh='<i>u</i><sub>C</sub>', uRh='<i>u</i><sub>R</sub>', uAB='<i>u</i><sub>AB</sub>', Eh='<i>E</i>', Rh='<i>R</i>', Ch='<i>C</i>', ih='<i>i</i>', qh='<i>q</i>', th_='<i>τ</i>', RCh='<i>RC</i>';
const dudt='d<i>u</i><sub>C</sub>/d<i>t</i>';
const eRC='e<sup>−<i>t</i>/<i>RC</i></sup>', eTau='e<sup>−<i>t</i>/<i>τ</i></sup>';
const sci=(x,d=1)=>sciH(x,d);
const Ee='<i>E</i><sub>e</sub>';

// un pari : neutre à l'écran ; `juste` (3ᵉ case) ne sert qu'au profil de fin
const BET=t=>({opts:t.map(([x,fb,j])=>({t:x,fb,juste:!!j}))});
// une question : une bonne réponse ; chaque option fausse a son explication et son indice (second essai)
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>({t:x,ok,fb,indice}))});
// un bouton « passer » : seulement si la question d'entrée est réussie du premier coup
const saut=(cle,vers,oui,non)=>({get html(){return ctx.juste(cle)?`<button type="button" class="ctl-btn alt saut" data-aller="${vers}">${oui} →</button>`:`<p class="small">${non}</p>`;}});

/* les états de scène : chaque étape les donne en entier, rien ne se hérite à l'aveugle */
const CI=o=>({jeu:'rc',K:1,t:0,fi:0,fu:0,fr:0,fe:0,fa:'',ch:1,qq:0.5,nm:0,osc:0,rv:0,gen:0,k2:1,sub:'',...o});
const CV=o=>({jeu:'charge',xmax:T_MAX,ym:14,curve:0,exact:0,Eline:0,trans:0,pas:0,tan:0,p63:0,lect:0,uR:0,p37:0,taus:0,ghost:0,base:0,R:R_OHM,C:C_F,E:E_V,live:0,osc:0,pts:0,rep:0,sub:'',...o});
const DR=o=>({jeu:'qu',line:1,pt:0,tri:0,sub:'',...o});
const FL=(...n)=>Object.fromEntries(['fi','fu','fr','fe'].map(k=>[k,n.includes(k)?1:0]));
const ALL=FL('fi','fu','fr','fe');

/* ---------- les rappels qui dépendent d'un pari ---------- */
function rappelLampe(){const j=S.first.allumage;if(j==null)return '';
  return ['Tu avais parié que la lampe resterait éteinte : le circuit est coupé, et pourtant un courant a passé.','Tu avais parié que la lampe resterait allumée : elle s’éteint, une fois le condensateur chargé.','Tu avais parié juste : la lampe s’allume, puis s’éteint.'][j];}

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Le condensateur',court:'Capacité'},
  {name:'La charge, pas à pas',court:'Charge'},{name:'L’équation',court:'Équation'},{name:'La solution',court:'Solution'},
  {name:'La constante de temps',court:'τ'},{name:'La décharge',court:'Décharge'},{name:'L’énergie',court:'Énergie'},
  {name:'Mesurer',court:'Mesurer'},{name:'Retour à l’énigme',court:'Retour'},{name:'Au bac',court:'Au bac'},{name:'Bilan',court:'Bilan'}];

const U_SAV=4;
const QA=3.0, QB0=6.0, QB1=2.0, DTQ=2.0;
const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'sav-test',beat:0,scene:'circuit',set:CI({K:0,t:0,...ALL}),sujet:'l’additivité des tensions',
  text:[`Ce qu’il faut savoir : juste du premier coup, tu passes. Dans une boucle série, ${Eh} = ${Ev} V et ${uCh} = ${U_SAV} V. Que vaut ${uRh} ?`],
  verifie:{...VF([
    [`${uRh} = ${E_V-U_SAV} V`,true,`Oui : dans une maille, ${uRh} + ${uCh} = ${Eh}, donc ${E_V} − ${U_SAV} = ${E_V-U_SAV} V.`],
    [`${uRh} = ${E_V+U_SAV} V`,false,`Tu as additionné les deux tensions au lieu de les partager. Dans une maille, ${uRh} + ${uCh} = ${Eh}.`,'La somme des tensions des dipôles est-elle égale à E, ou plus grande ?'],
    [`${uRh} = ${E_V/U_SAV} V`,false,'Tu as divisé E par u<sub>C</sub> : l’additivité est une somme, pas un quotient.','Les tensions se somment-elles, ou se divisent-elles ?'],
    [`${uRh} = ${U_SAV} V`,false,`Tu as repris ${uCh}. Deux dipôles en série n’ont pas la même tension : ${uRh} = ${Eh} − ${uCh}.`,'Deux dipôles en série ont-ils la même tension ?']]),
    apres:saut('sav-test','allumage','Je le sais : passer à l’énigme','La suite te le rappelle.')}},
{cle:'sav-rappel',beat:0,scene:'circuit',set:CI({K:0,t:0,...FL('fi','fr')}),
  text:[`Deux rappels avant d’avancer. L’intensité est un débit de charge : <i>I</i> = <i>Q</i>/Δ<i>t</i>, donc ${fr(2,0)} mA pendant ${fr(5,0)} s apportent ${fr(2e-3*5*1e3,0)} mC.`,
    `Et la loi d’Ohm s’écrit ${uRh} = ${Rh} ${ih} : la flèche de ${uRh} est opposée à celle de ${ih}.`]},

/* ===== 1. l'énigme ===== */
{cle:'allumage',beat:1,scene:'circuit',set:CI({jeu:'lampe',K:0,t:0,ch:1}),
  text:['Un générateur, un interrupteur K à deux positions, une lampe et un condensateur vide, en série.','Entre les deux armatures du condensateur, il y a un isolant : le circuit est coupé.','Tu bascules K en position 1. La lampe…'],
  pari:{reveal:[{p:{K:1,t:0},d:500},{p:{t:1},d:3200}],...BET([
    ['reste éteinte : l’isolant coupe le circuit','Tu as pensé qu’un isolant coupe tout, tout le temps. Pourtant la lampe s’allume d’abord : à la fin seulement, plus rien ne passe.'],
    ['s’allume et reste allumée','Tu as supposé que le condensateur laisse passer le courant sans fin. En réalité la lampe s’éteint : le courant ne dure que le temps de la charge.'],
    ['s’allume, puis s’éteint peu à peu','Oui : la lampe s’allume, puis s’éteint peu à peu, bien que le circuit soit coupé par un isolant. La suite explique pourquoi.',1]])}},
{cle:'flash',beat:1,scene:'circuit',set:CI({jeu:'lampe',K:1,t:1}),
  text:['Le condensateur est resté chargé. On bascule K en position 2 : le générateur sort du circuit.','La lampe reste seule avec le condensateur. Que fait-elle ?'],
  pari:{reveal:[{p:{K:2,t:0},d:700},{p:{t:1},d:3200}],...BET([
    ['rien : sans générateur, pas de courant','Tu as pensé qu’un condensateur ne garde rien. Il garde ses charges : la lampe se rallume, puis s’éteint peu à peu.'],
    ['la lampe se rallume, puis s’éteint peu à peu','Oui : le condensateur chargé joue le rôle de générateur, jusqu’à ce qu’il soit vide.',1],
    ['la lampe se rallume et reste allumée','Tu as pris le condensateur pour un générateur qui ne s’épuise pas. Il rend ce qu’il a stocké, puis il est vide : la lampe s’éteint.']])}},
{cle:'question',beat:1,scene:'circuit',set:CI({jeu:'lampe',K:2,t:1}),
  text:['Un courant a passé, un moment, dans un circuit coupé par un isolant.',{t:'Pourquoi ? Et qu’est-ce qui règle la durée de la lueur ?',fort:true}]},

/* ===== 2. le condensateur ===== */
{cle:'leyde',beat:2,scene:'circuit',tag:'1746',set:CI({jeu:'leyde',rv:0}),
  text:['Un canon de fer, suspendu à des fils de soie, est électrisé par une sphère de verre qu’on frotte.','Musschenbroek tient dans sa main droite un vase de verre à demi plein d’eau (une [[bouteille|bouteille de Leyde]]), relié au canon par un fil.','De l’autre main, il approche le canon. Que sent-il ?'],
  pari:{reveal:[{p:{rv:1},d:900}],
    apres:{html:'<p class="small">Il écrit à Réaumur : « Tout à coup ma main droite fut frappée avec tant de violence, que j’eus tout le corps ébranlé comme d’un coup de foudre. » (cité par Wikipédia, « Bouteille de Leyde »)</p>'},
    ...BET([
    ['la même petite étincelle : le verre isole l’eau de sa main','Ton idée se défend : le verre isole, et c’est pour cela que les charges s’accumulent de part et d’autre. Mais le choc est bien plus violent.'],
    ['rien du tout : l’eau absorbe l’électricité','Tu as pensé que l’eau garde tout. L’eau et la main, séparées par le verre, portent des charges opposées : le choc le prouve.'],
    ['un choc bien plus fort','Oui : l’eau et la main ont accumulé des charges opposées de part et d’autre du verre, et il les a reliées à travers son corps.',1]])}},
{cle:'armatures',beat:2,scene:'circuit',set:CI({jeu:'cond',ch:1,qq:0.5}),sujet:'les charges des deux armatures',
  text:['Un [[condensateur]] est fait de deux conducteurs, les [[armature|armatures]], séparés par un isolant.',`Pendant la charge, l’armature A porte ${qh} = ${fr(QA,1)} µC. L’armature B porte…`],
  verifie:{...VF([
    [`${fr(-QA,1)} µC`,true,'Oui : le courant retire de B ce qu’il apporte à A, donc B porte l’opposé.'],
    [`0`,false,'Tu as pensé que seule l’armature reliée au générateur se charge. Le courant retire de B autant de charge qu’il en apporte à A.','Les charges traversent-elles l’isolant ? D’où vient ce que reçoit A ?'],
    [`+${fr(QA,1)} µC`,false,'Tu as supposé que les deux armatures se chargent pareil. Le condensateur serait alors chargé au total : B porte l’opposé de A.','A et B portent-elles le même signe ?']]),
    reveal:[{p:{ch:2},d:700}],
    apres:{html:`La [[charge|charge du condensateur]] ${qh} désigne celle de A.`}}},
{cle:'convention',beat:2,scene:'circuit',set:CI({jeu:'rc',K:1,t:0.4,fi:1,nm:1}),sujet:'la convention récepteur',
  text:[`Le courant ${ih} entre par l’armature A : sa flèche pointe vers le bas, dans le condensateur.`,`En [[conventionrecepteur|convention récepteur]], la flèche de ${uCh} = ${uAB}…`],
  verifie:{...VF([
    [`pointe vers A, à l’opposé de ${ih}`,true,'Oui : pour un récepteur, la flèche de tension s’oppose au courant.'],
    [`suit le sens de ${ih}`,false,'Tu as pris la convention générateur. Pour un récepteur, la flèche de tension s’oppose au courant.','Pour un récepteur, la tension et le courant vont-ils dans le même sens ?'],
    ['se met dans n’importe quel sens, seul le signe compte',false,`Tu as cru que seul le signe compte. Le sens de la flèche fixe le signe de ${uCh} : la convention l’impose.`,'Qu’est-ce qui fixe le signe d’une tension ?']]),
    reveal:[{p:{fu:1,fa:'uC'},d:700}],
    apres:{html:`<p class="small">Comme dans les sujets 2021 et 2025 : ${ih} vers le bas dans le condensateur, ${uCh} vers le haut.</p>`}}},
{cle:'dqdt',beat:2,scene:'circuit',set:CI({jeu:'rc',K:2,t:0.4,fi:1,fu:1,nm:1}),sujet:'i = dq/dt, avec son signe',
  text:[`Avec ces flèches, la charge ${qh} de l’armature A varie, et ${ih} = d${qh}/d<i>t</i>.`,`K est en position 2. Pendant ${fr(DTQ,1)} s, ${qh} passe régulièrement de ${fr(QB0,1)} µC à ${fr(QB1,1)} µC. Que vaut ${ih} ?`],
  tex:[[tx`i=\dfrac{\mathrm{d}q}{\mathrm{d}t}`,'i = dq/dt']],
  verifie:{...VF([
    [`${fr((QB1-QB0)/DTQ,1)} µA`,true,`Oui : ${qh} diminue, donc d${qh}/d<i>t</i> est négatif : ${ih} circule à l’inverse de sa flèche.`],
    [`+${fr(Math.abs(QB1-QB0)/DTQ,1)} µA`,false,`Tu as perdu le signe. ${qh} diminue : d${qh}/d<i>t</i> est négatif, et ${ih} circule à l’inverse de sa flèche.`,'La charge de A augmente-t-elle, ou diminue-t-elle ?'],
    [`${fr(DTQ/(QB1-QB0),2)} µA`,false,'Tu as divisé la durée par la charge. Un débit est une charge par seconde : Δq/Δt.','Un débit de charge, c’est une charge par seconde ou une seconde par charge ?']])}},
{cle:'q-u',beat:2,scene:'droite',set:DR({jeu:'qu',line:1,pt:1}),sujet:'la capacité, pente de q en fonction de u',
  text:[`Sujet 2018, session normale, exercice III, question 1.2 (${fr(S18.bareme[1],2)} pt) : la charge ${qh} du condensateur équivalent est une droite de ${uAB}, par l’origine et par (${fr(S18.u,0)} V ; ${fr(S18.q*1e6,0)} µC).`,`La [[capacite|capacité]] ${Ch} relie les deux : ${qh} = ${Ch} ${uCh}. Que vaut ${Ch} ?`],
  tex:[[tx`q=C\,u_C`,'q = C uC']],
  verifie:{...VF([
    [`${Ch} = ${fr(S18.Ceq*1e6,0)} µF`,true,`Oui : ${Ch} est la pente de la droite, ${fr(S18.q*1e6,0)} µC pour ${fr(S18.u,0)} V.`],
    [`${Ch} = ${fr(S18.FauxInv,2)} µF`,false,`Tu as divisé la tension par la charge. ${Ch} est la pente de ${qh} = f(${uAB}) : la charge divisée par la tension.`,'La pente de q en fonction de u est-elle q/u ou u/q ?'],
    [`${Ch} = ${fr(S18.FauxProduit,0)} µF`,false,`Tu as multiplié ${qh} par ${uCh}. ${qh} = ${Ch} ${uCh} donne ${Ch} = ${qh}/${uCh}.`,'Comment isole-t-on C dans q = C·u ?']])}},
{cle:'farad',beat:2,scene:'circuit',set:CI({jeu:'cond',ch:2,qq:0.5}),sujet:'les préfixes de la capacité',
  text:['L’unité de capacité est le [[farad]] (F). On utilise ses sous-multiples.','Convertis : 220 µF = ?'],
  tex:[[tx`1\ \mathrm{\mu F}=10^{-6}\ \mathrm{F}`,'1 µF = 10⁻⁶ F'],[tx`1\ \mathrm{nF}=10^{-9}\ \mathrm{F}`,'1 nF = 10⁻⁹ F'],[tx`1\ \mathrm{pF}=10^{-12}\ \mathrm{F}`,'1 pF = 10⁻¹² F']],
  verifie:{...VF([
    [`${sci(220e-6)} F`,true,'Oui : le préfixe µ vaut 10<sup>−6</sup>, donc 220 µF = 2,2 × 10<sup>−4</sup> F.'],
    [`${sci(220e-9)} F`,false,'Tu as lu µ comme n : 2,2 × 10<sup>−7</sup> F, c’est 220 nF. Le préfixe µ vaut 10<sup>−6</sup>.','Combien vaut le préfixe µ ?'],
    [`${fr(220e-3,2)} F`,false,'Tu as lu µ comme m : 0,22 F, c’est 220 mF. Le préfixe µ vaut 10<sup>−6</sup>.','Un mF est-il un millième ou un millionième de farad ?']])}},
{cle:'courant-constant',beat:2,scene:'droite',set:DR({jeu:'courant',line:1,pt:1,tri:1}),sujet:'la capacité avec un générateur de courant',
  text:[`Sujet 2025, session normale, exercice 3, questions 1-1 et 1-2 (${fr(S25.bareme[0],1)} pt chacune) : un générateur de courant débite <i>I</i><sub>0</sub> = ${fr(S25.I0*1e6,0)} µA dans un condensateur vide. La droite de ${uCh}(<i>t</i>) a pour pente ${fr(S25.pente,0)} V·s<sup>−1</sup>.`],
  deriv:[
    {tex:tx`q=I_0\,t`,alt:'q = I₀ t',r:'Le courant est constant, et le condensateur est vide à <i>t</i> = 0.'},
    {tex:tx`u_C=\dfrac{q}{C_0}=\dfrac{I_0}{C_0}\,t`,alt:'uC = q / C₀ = (I₀ / C₀) t',r:`${qh} = ${Ch} ${uCh} : la pente de la droite est <i>I</i><sub>0</sub>/<i>C</i><sub>0</sub>.`}],
  pari:{label:'Capacité ?',
    apres:{html:'<p><b>Une droite : seulement parce que la source impose le courant.</b></p>'},
    ...VF([
    [`<i>C</i><sub>0</sub> = <i>I</i><sub>0</sub>/pente = ${sci(S25.C0,0)} F`,true,`Oui : ${fr(S25.I0*1e6,0)} µA divisés par ${fr(S25.pente,0)} V·s<sup>−1</sup> donnent ${sci(S25.C0,0)} F.`],
    [`<i>C</i><sub>0</sub> = pente/<i>I</i><sub>0</sub> = ${sci(S25.FauxInv,0)} F`,false,'Tu as inversé le rapport. L’unité tranche : A/(V·s<sup>−1</sup>) = F, donc <i>I</i><sub>0</sub>/pente.','Quelle unité donne A divisé par V·s⁻¹ ?'],
    [`<i>C</i><sub>0</sub> = ${fr(S25.FauxUnit,0)} F`,false,`Tu as pris <i>I</i><sub>0</sub> = ${fr(S25.I0*1e6,0)} sans le µ. ${fr(S25.I0*1e6,0)} µA = ${sci(S25.I0,0)} A, donc <i>C</i><sub>0</sub> = ${sci(S25.C0,0)} F.`,'Le courant est-il donné en ampères ?']])}},
{cle:'parallele',beat:2,scene:'circuit',set:CI({jeu:'para',gen:1,k2:0,K:1,t:0.1}),sujet:'la capacité équivalente en parallèle',
  text:[`Sujet 2018, session normale, exercice III, question 1.3 (${fr(S18.bareme[2],1)} pt) : ${Ch}<sub>1</sub> = ${C1} µF est montée en parallèle avec ${Ch}<sub>2</sub> inconnue.`,`La capacité équivalente, lue à la question précédente, vaut ${Ceq} µF. Que vaut ${Ch}<sub>2</sub> ?`],
  verifie:{...VF([
    [`${Ch}<sub>2</sub> = ${C2} µF`,true,`Oui : en parallèle, ${Ch}<sub>éq</sub> = ${Ch}<sub>1</sub> + ${Ch}<sub>2</sub>, donc ${Ceq} − ${C1} = ${C2} µF.`],
    [`${Ch}<sub>2</sub> = ${fr(S18.FauxSomme*1e6,1)} µF`,false,`Tu as ajouté ${Ch}<sub>1</sub> au lieu de la retrancher. En parallèle, ${Ch}<sub>éq</sub> = ${Ch}<sub>1</sub> + ${Ch}<sub>2</sub>.`,'Les capacités en parallèle s’ajoutent : que faut-il retrancher à C_éq ?'],
    [`${Ch}<sub>2</sub> = ${fr(S18.FauxSerie*1e6,1)} µF`,false,'Tu as appliqué la formule du montage en série. Elle vaut pour la série ; en parallèle, les capacités s’ajoutent.','Quelle formule vaut pour un montage en parallèle ?']]),
    apres:{tex:[[tx`C_{\mathrm{\acute{e}q}}=C_1+C_2\quad(\text{parallèle})`,'Céq = C₁ + C₂ (parallèle)'],[tx`\dfrac{1}{C_{\mathrm{\acute{e}q}}}=\dfrac{1}{C_1}+\dfrac{1}{C_2}\quad(\text{série})`,'1/Céq = 1/C₁ + 1/C₂ (série)']],
      html:'<p class="small">L’intérêt : en parallèle, une capacité plus grande ; en série, une capacité plus petite.</p>'}}},

/* ===== 3. la charge, pas à pas ===== */
{cle:'allure',beat:3,scene:'courbe',set:CV({jeu:'charge',Eline:1,curve:0}),
  text:[`On remplace la lampe par un conducteur ohmique, pour pouvoir calculer : ${Eh} = ${Ev} V, ${Rh} = ${kO} kΩ, ${Ch} = ${uFc} µF.`,`À <i>t</i> = 0, on ferme K en position 1. Prédis ${uCh}(<i>t</i>).`],
  pari:{reveal:[{p:{curve:1},d:2000}],...BET([
    ['elle saute à E aussitôt','Tu as supposé que la tension saute à E. Elle suit la charge du condensateur, qui demande du temps.'],
    ['elle monte en ligne droite jusqu’à E, puis s’arrête','Ce serait vrai avec une source de courant. Ici, c’est la tension qui est imposée : la montée n’est pas à débit constant.'],
    ['elle monte vite, puis de plus en plus lentement vers E','Oui : plus le condensateur est chargé, moins le courant est fort, et plus la montée ralentit.',1]])}},
{cle:'i0',beat:3,scene:'circuit',set:CI({jeu:'rc',K:1,t:0,...ALL,fa:'i'}),sujet:'le courant à t = 0',
  text:[`À <i>t</i> = 0⁺, juste après la fermeture, le condensateur est vide : ${uCh} = 0.`,'Le courant vaut…'],
  verifie:{...VF([
    [`${Eh}/${Rh} = ${i0mA} mA`,true,`Oui : ${uCh} = 0 laisse toute la tension ${Eh} à ${Rh}, donc ${ih} = ${Eh}/${Rh}.`],
    ['0, comme u<sub>C</sub>',false,`Tu as copié ${uCh}. ${uCh} = 0 laisse toute la tension ${Eh} à ${Rh} : ${ih} = ${uRh}/${Rh} = ${Eh}/${Rh}.`,'Que vaut la tension aux bornes de R quand u_C = 0 ?'],
    [`${d1(I0*500)} mA`,false,`Tu as partagé la tension moitié-moitié. ${uRh} = ${Eh} − ${uCh} = ${Eh} à cet instant.`,'Que valent u_R et u_C à t = 0⁺ ?']])}},
{cle:'pas-pari',beat:3,scene:'courbe',set:CV({jeu:'charge',xmax:2.6,Eline:1,pas:1}),
  text:[`Construisons la courbe par pas de ${dtp} s.`,`Pendant le premier pas, le courant de ${i0mA} mA apporte ${q1} mC à A : ${uCh} monte de ${du1} V.`,`Au pas suivant, encore ${dtp} s : ${uCh} monte de…`],
  pari:{reveal:[{p:{pas:2},d:900}],...BET([
    [`${du1} V encore : même durée, même montée`,`Tu as gardé le même courant. Il n’est plus de ${i0mA} mA : ${uCh} a pris ${du1} V à ${Rh}, il reste ${d1(E_V-dUPas(1))} V aux bornes de ${Rh}.`],
    [`moins de ${du1} V`,`Oui : ${ih} = (${Ev} − ${du1}) V / ${kO} kΩ = ${i2} mA, donc ${uCh} monte de ${du2} V.`,1],
    [`plus de ${du1} V : le condensateur s’est mis en route`,'Tu as supposé que le condensateur accélère la charge. Plus il est chargé, moins il passe de courant : la montée ralentit.']])}},
{cle:'pas',beat:3,scene:'courbe',ctl:'pas',needLabel:'Fais les pas d’abord',set:CV({jeu:'charge',xmax:2.6,Eline:1,pas:2}),
  text:['Clique sur « Pas suivant » : chaque pas ajoute ce que le courant apporte pendant '+dtp+' s.',{t:`À chaque pas, ce qui reste à charger est multiplié par ${redP} : comme les dés de la leçon sur la radioactivité, multipliés par 5/6 à chaque tic.`,fort:true}]},
{cle:'continuite',beat:3,scene:'circuit',set:CI({jeu:'rc',K:1,t:0,...FL('fi','fu')}),sujet:'u_C est continue, i saute à t = 0',
  text:['À la fermeture de K, lequel peut sauter d’un coup ?'],
  verifie:{...VF([
    [`${ih} : de 0 à ${Eh}/${Rh}`,true,`Oui : ${ih} passe de 0 à ${Eh}/${Rh} à <i>t</i> = 0.`],
    [`${uCh} : de 0 à ${Eh}`,false,`Tu as cru que ${uCh} saute. ${uCh} = ${qh}/${Ch}, et ${qh} ne peut pas sauter avec un courant fini.`,'Qu’est-ce qui est proportionnel à la charge q ?'],
    ['les deux',false,`Tu as mis ${ih} et ${uCh} dans le même sac. Seul ${ih} saute à <i>t</i> = 0.`,'Une tension aux bornes d’un condensateur peut-elle sauter ?']]),
    apres:{html:`<p class="small">${uCh} est une fonction continue ; ${ih} est discontinue à <i>t</i> = 0.</p>`}}},
{cle:'permanent',beat:3,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1,trans:1}),sujet:'le courant en régime permanent',
  text:[`Longtemps après, ${uCh} = ${Eh}. Le courant…`],
  verifie:{...VF([
    ['est nul',true,`Oui : ${uRh} = ${Eh} − ${uCh} = 0, donc ${ih} = 0.`],
    [`vaut encore ${Eh}/${Rh}`,false,`Tu as cru qu’un condensateur chargé laisse passer le courant. Quand ${uCh} = ${Eh}, ${uRh} = 0, donc ${ih} = 0.`,'Que vaut la tension aux bornes de R quand u_C = E ?'],
    [`devient négatif, car ${uCh} dépasse ${Eh}`,false,`Tu as supposé que ${uCh} dépasse ${Eh}. La montée ralentit en approchant ${Eh} et ne le franchit pas : ${uRh} reste positive.`,'La courbe franchit-elle la droite u = E ?']]),
    apres:{html:'Le [[regime|régime transitoire]] précède le régime permanent.'}}},

/* ===== 4. l'équation ===== */
{cle:'ed-maille',beat:4,scene:'circuit',set:CI({jeu:'rc',K:1,t:0.3,...ALL}),sujet:'l’équation différentielle de la charge',
  text:['Dans une boucle en série, le même courant <i>i</i> traverse <i>R</i> et <i>C</i>. K est en position 1 : écris l’équation de la maille.'],
  deriv:[
    {tex:tx`u_R+u_C=E`,alt:'uR + uC = E',r:'La loi d’additivité des tensions, K en position 1.'},
    {tex:tx`u_R=R\,i`,alt:'uR = R i',r:'La loi d’Ohm, en convention récepteur.'}],
  pari:{label:'Le courant en fonction de la tension ?',
    apres:{tex:[[tx`RC\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}+u_C=E`,'RC duC/dt + uC = E']]},
    ...VF([
    [`${ih} = d${qh}/d<i>t</i> = ${Ch} ${dudt}`,true,`Oui : ${qh} = ${Ch} ${uCh}, avec ${Ch} constante. Remplace dans ${uRh} = ${Rh} ${ih}, puis dans la maille.`],
    [`${ih} = ${Ch} ${uCh}`,false,`Tu as pris la charge pour l’intensité. ${ih} est un débit : la dérivée de ${qh} = ${Ch} ${uCh}.`,'L’intensité est-elle la charge, ou sa dérivée ?'],
    [`${ih} = −${Ch} ${dudt}`,false,`Tu as pris le signe de l’autre armature. ${qh} est la charge de A, où entre ${ih} : ${ih} = +d${qh}/d<i>t</i>.`,'Par quelle armature le courant entre-t-il ?']])}},
{cle:'ed-forme',beat:4,scene:'circuit',set:CI({jeu:'rc',K:1,t:0.3,...ALL}),sujet:'la forme normalisée de l’équation',
  text:[`Le sujet 2022 (exercice 3, question 1.1, ${fr(S22.bareme[0],2)} pt) demande la forme normalisée. De ${RCh} ${dudt} + ${uCh} = ${Eh}, on tire…`],
  verifie:{...VF([
    [`${dudt} + ${uCh}/(${RCh}) = ${Eh}/(${RCh})`,true,`Oui : on divise les deux membres par ${RCh}, et le coefficient de ${dudt} devient 1.`],
    [`${dudt} + ${RCh} ${uCh} = ${RCh} ${Eh}`,false,`Tu as multiplié par ${RCh} au lieu de diviser. L’homogénéité tranche : ${RCh} ${uCh} n’est pas en V·s<sup>−1</sup>.`,'Pour que le coefficient de du_C/dt vaille 1, multiplie-t-on ou divise-t-on par RC ?'],
    [`${dudt} − ${uCh}/(${RCh}) = ${Eh}/(${RCh})`,false,'Tu as perdu un signe. Avec ce signe, la solution grandirait sans limite.','Le signe de u_C change-t-il quand on divise par RC ?']]),
    apres:{html:`<p class="small">La forme du sujet 2021, ${dudt} = −${uCh}/(${RCh}) + ${Eh}/(${RCh}), est la même.</p>`}}},
{cle:'ed-q',beat:4,scene:'circuit',set:CI({jeu:'rc',K:1,t:0.3,...ALL}),sujet:'l’équation vérifiée par q(t)',
  text:[`Le sujet 2019 (exercice III, question 1, ${fr(0.5,1)} pt) demande l’équation vérifiée par ${qh}(<i>t</i>).`],
  verifie:{...VF([
    [`${Rh} d${qh}/d<i>t</i> + ${qh}/${Ch} = ${Eh}`,true,`Oui : ${uRh} = ${Rh} ${ih} = ${Rh} d${qh}/d<i>t</i>, et ${uCh} = ${qh}/${Ch}.`],
    [`${Rh} d${qh}/d<i>t</i> + ${Ch} ${qh} = ${Eh}`,false,`Tu as écrit ${uCh} = ${Ch} ${qh}. ${qh} = ${Ch} ${uCh} donne ${uCh} = ${qh}/${Ch}.`,'Comment s’exprime u_C en fonction de q ?'],
    [`${Rh} ${qh} + (1/${Ch}) d${qh}/d<i>t</i> = ${Eh}`,false,`Tu as échangé les rôles. ${uRh} = ${Rh} ${ih} = ${Rh} d${qh}/d<i>t</i>, et ${uCh} = ${qh}/${Ch}.`,'Quelle tension contient la dérivée de q ?']])}},

/* ===== 5. la solution ===== */
{cle:'x-test',beat:5,scene:'expo',set:{cv:0,p1:0,p5:0,tg:0},sujet:'la dérivée de e^u',
  text:[`Ce qu’il faut savoir : juste du premier coup, tu passes. Quelle est la dérivée de <i>t</i> ↦ ${Eh}(1 − ${eTau}) ?`],
  verifie:{...VF([
    [`(${Eh}/${th_}) ${eTau}`,true,`Oui : (e<sup>u</sup>)′ = u′ e<sup>u</sup> avec u′ = −1/${th_}, et le « − » devant e<sup>u</sup> donne +.`],
    [`−(${Eh}/${th_}) ${eTau}`,false,'Tu as compté deux signes moins, mais un seul s’applique : (e<sup>u</sup>)′ = u′ e<sup>u</sup> avec u′ = −1/τ, puis le « − » devant e<sup>u</sup> donne +.','Combien de signes moins se multiplient ?'],
    [`${Eh} ${eTau}`,false,'Tu as oublié le facteur 1/τ : u′ = −1/τ, donc la dérivée porte 1/τ.','Que vaut la dérivée de −t/τ ?']]),
    apres:saut('x-test','verif','Je sais dériver e<sup>u</sup> : passer le rappel','Le rappel suit.')}},
{cle:'expo-rappel',beat:5,scene:'expo',set:{cv:1,p1:1,p5:1,tg:0},
  text:['Rappel de la leçon [[exponentielle]] : (e<sup>u</sup>)′ = u′ e<sup>u</sup>.',`Avec u = −<i>t</i>/${th_}, la fonction ${eTau} décroît de 1 vers 0 sans l’atteindre : e<sup>−1</sup> ≈ ${d2(Math.exp(-1))} et e<sup>−5</sup> ≈ ${fr(Math.exp(-5),3)}.`]},
{cle:'verif',beat:5,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1}),sujet:'vérifier que u_C = E(1 − e^(−t/RC)) est solution',
  text:[`Vérifie que ${uCh} = <i>A</i>(1 − ${eTau}) est solution de ${RCh} ${dudt} + ${uCh} = ${Eh}. Sujet 2019 (question 2, ${fr(0.5,1)} pt) et sujet 2022 (question 1.2).`],
  deriv:[
    {tex:tx`u_C=A\left(1-e^{-t/\tau}\right)`,alt:'uC = A (1 − e^(−t/τ))',r:'On essaie cette forme : elle part de 0 et monte vers A.'},
    {tex:tx`\dfrac{\mathrm{d}u_C}{\mathrm{d}t}=\dfrac{A}{\tau}\,e^{-t/\tau}`,alt:'duC/dt = (A/τ) e^(−t/τ)',r:'La dérivée.'},
    {tex:tx`RC\,\dfrac{A}{\tau}\,e^{-t/\tau}+A-A\,e^{-t/\tau}=E`,alt:'RC (A/τ) e^(−t/τ) + A − A e^(−t/τ) = E',r:'On remplace dans l’équation.'},
    {tex:tx`A\left(\dfrac{RC}{\tau}-1\right)e^{-t/\tau}+A=E`,alt:'A (RC/τ − 1) e^(−t/τ) + A = E',r:'On regroupe.'}],
  pari:{label:'Pour que ce soit vrai à tout instant ?',
    apres:{tex:[[tx`u_C(t)=E\left(1-e^{-t/RC}\right)`,'uC(t) = E (1 − e^(−t/RC))']],html:`La [[tau|constante de temps]] est ${th_} = ${RCh}. Contrôle : ${uCh}(0) = 0.`},
    ...VF([
    [`<i>A</i> = ${Eh} et ${th_} = ${RCh}`,true,`Oui : le terme en ${eTau} doit s’annuler à tout instant, donc ${RCh}/${th_} = 1 ; il reste <i>A</i> = ${Eh}.`],
    [`<i>A</i> = ${Eh}, avec ${th_} quelconque`,false,`Tu as oublié que le terme en ${eTau} change avec <i>t</i>. Il doit s’annuler à tout instant : ${RCh}/${th_} = 1.`,'Le terme en e^(−t/τ) peut-il rester non nul ?'],
    [`<i>A</i> = ${Eh}/${Rh} et ${th_} = ${Rh}/${Ch}`,false,`Tu as deviné ${th_} au lieu de le tirer de la substitution. ${RCh}/${th_} − 1 = 0 donne ${th_} = ${RCh}.`,'Quelle condition annule le terme en e^(−t/τ) ?']])}},
{cle:'dim',beat:5,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1}),sujet:'l’équation aux dimensions de RC',
  text:['Une durée, ou autre chose ? Écris les dimensions de <i>R</i> et de <i>C</i>.'],
  deriv:[
    {tex:tx`[R]=[U]\cdot[I]^{-1}`,alt:'[R] = [U]·[I]⁻¹',r:'<i>u</i> = <i>R</i> <i>i</i>.'},
    {tex:tx`[C]=[Q]\cdot[U]^{-1}=[I]\cdot[T]\cdot[U]^{-1}`,alt:'[C] = [Q]·[U]⁻¹ = [I]·[T]·[U]⁻¹',r:'<i>q</i> = <i>C</i> <i>u</i>, et <i>i</i> = d<i>q</i>/d<i>t</i> donne [<i>Q</i>] = [<i>I</i>][<i>T</i>].'}],
  pari:{label:'[RC] ?',
    apres:{tex:[[tx`[RC]=[U]\cdot[I]^{-1}\times[I]\cdot[T]\cdot[U]^{-1}=[T]`,'[RC] = [U]·[I]⁻¹ × [I]·[T]·[U]⁻¹ = [T]']],html:'Comme 1/λ pour les noyaux, τ est une durée. (Une [[dimensions|équation aux dimensions]], comme au bac.)'},
    ...VF([
    ['[T] : τ est en secondes',true,'Oui : [U][I]<sup>−1</sup> × [I][T][U]<sup>−1</sup> laisse [T].'],
    ['sans dimension : R et C se compensent',false,'Tu as cru que R et C se compensent. [U][I]<sup>−1</sup> × [I][T][U]<sup>−1</sup> laisse [T].','Que reste-t-il quand [U] et [I] se simplifient ?'],
    ['[T]<sup>−1</sup>',false,'[T]<sup>−1</sup> est la dimension de 1/τ, le α du sujet 2019. Le produit des deux lignes donne [T].','τ est-il une durée ou une fréquence ?']])}},
{cle:'i-t',beat:5,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1}),sujet:'l’intensité i(t) et la charge q(t)',
  text:[`${uCh}(<i>t</i>) est établie : déduis-en l’intensité du courant.`],
  deriv:[
    {tex:tx`i=C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}`,alt:'i = C duC/dt',r:'La relation de l’étape précédente sur l’équation.'},
    {tex:tx`\dfrac{\mathrm{d}u_C}{\mathrm{d}t}=\dfrac{E}{\tau}\,e^{-t/\tau}`,alt:'duC/dt = (E/τ) e^(−t/τ)',r:'La dérivée calculée à la vérification.'}],
  pari:{label:'Le courant i(t) ?',
    apres:{tex:[[tx`q(t)=C\,u_C=CE\left(1-e^{-t/RC}\right)`,'q(t) = C uC = CE (1 − e^(−t/RC))'],[tx`u_R(t)=R\,i=E\,e^{-t/RC}`,'uR(t) = R i = E e^(−t/RC)']]},
    ...VF([
    [`${ih}(<i>t</i>) = (${Eh}/${Rh}) ${eRC}`,true,`Oui : ${Ch} × ${Eh}/(${RCh}) = ${Eh}/${Rh}. Le courant part de ${Eh}/${Rh} et décroît.`],
    [`${ih}(<i>t</i>) = (${Eh}/(${RCh})) ${eRC}`,false,`Tu as oublié ${Ch} : (${Eh}/(${RCh})) ${eRC} est ${dudt}, en V·s<sup>−1</sup>. Multiplie par ${Ch}.`,'Quelle unité a du_C/dt, et quelle unité faut-il pour i ?'],
    [`${ih}(<i>t</i>) = (${Eh}/${Rh})(1 − ${eRC})`,false,`Tu as fait monter le courant comme ${uCh}. ${ih} part de ${Eh}/${Rh} à <i>t</i> = 0 : il décroît.`,'Que vaut i à t = 0 ?']])}},

/* ===== 6. la constante de temps ===== */
{cle:'rappel',beat:6,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1}),sujet:'u_C et i à t = 0',
  text:['Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.',{t:`${uCh}(<i>t</i>) = ${Eh}(1 − ${eRC}) et ${ih}(<i>t</i>) = (${Eh}/${Rh}) ${eRC}. À <i>t</i> = 0⁺, que valent ${uCh} et ${ih} ?`,fort:true}],
  verifie:{...VF([
    [`${uCh} = 0 et ${ih} = ${Eh}/${Rh}`,true,`Oui : e<sup>0</sup> = 1, donc ${uCh}(0) = 0 et ${ih}(0) = ${Eh}/${Rh}.`],
    [`${uCh} = 0 et ${ih} = 0`,false,`Tu as fait partir le courant de zéro, comme ${uCh}. e<sup>0</sup> = 1 : ${ih}(0) = ${Eh}/${Rh}.`,'Que vaut e^0 ?'],
    [`${uCh} = ${Eh} et ${ih} = 0`,false,`Tu as pris le régime permanent pour le départ. 1 − e<sup>0</sup> = 0 : ${uCh}(0) = 0.`,'Que vaut 1 − e^0 ?']])}},
{cle:'tangente',beat:6,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1}),sujet:'la tangente à l’origine',
  text:['Trace la [[tangente]] à l’origine de la courbe : elle montre où la montée s’arrêterait, si elle gardait sa pente de départ.'],
  deriv:[
    {tex:tx`\dfrac{\mathrm{d}u_C}{\mathrm{d}t}(0)=\dfrac{E}{\tau}`,alt:'duC/dt (0) = E/τ',r:'La pente à l’origine.'},
    {tex:tx`y=\dfrac{E}{\tau}\,t`,alt:'y = (E/τ) t',r:'La tangente part de 0.'},
    {tex:tx`y=E\iff t=\tau`,alt:'y = E ⇔ t = τ',r:'Elle coupe la droite <i>u</i> = <i>E</i> à <i>t</i> = <i>τ</i>.',p:{tan:1}}],
  pari:{label:'À t = τ, la courbe est à…',reveal:[{p:{p63:1},d:900}],...BET([
    ['E : la charge est finie','Tu as pris τ pour la fin de la charge. À t = τ, la courbe est encore sous E : elle y arrive vers 5τ.'],
    [`environ ${p63} % de E`,`Oui : 1 − e<sup>−1</sup> ≈ 0,63, donc environ ${u63} V sur ${Ev} V.`,1],
    ['la moitié de E',`Tu as pris la moitié. Elle est atteinte plus tôt, à τ ln 2 ≈ ${th} s, avant τ.`]])}},
{cle:'lecture-63',beat:6,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1,tan:1,lect:Math.round(U63*10)/10}),sujet:'lire τ à 63 %',
  text:[`Ici ${Eh} = ${Ev} V : la courbe passe à ${u63} V. Lis ${th_} sur l’axe des temps.`],
  verifie:{fixe:true,...VF([
    [`${d1(T_FAUX37)} s`,false,`Tu as lu à 37 % de E, soit ${u37} V. 37 % est le repère d’une courbe qui descend.`,'Où lit-on τ quand la courbe monte : à 37 % ou à 63 % ?'],
    [`${th} s`,false,`Tu as lu à la moitié de ${Eh}, soit ${dn(MOITIE)} V. C’est τ ln 2, la « demi-vie » de la charge, pas τ.`,'La moitié de E est-elle le repère de τ ?'],
    [`${tauS} s`,true,`Oui : ${p63} % de ${Ev} V font ${u63} V, atteints à <i>t</i> = ${th_} = ${tauS} s.`]])}},
{cle:'reste',beat:6,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1,uR:1}),sujet:'ce qui reste à charger',
  text:[`Ce qui reste à charger, ${Eh} − ${uCh}, c’est ${uRh} = ${Eh} ${eTau}. Elle suit la loi…`],
  verifie:{...VF([
    [`des noyaux : N<sub>0</sub> e<sup>−λ<i>t</i></sup>, avec 1/${th_} pour λ`,true,'Oui : une exponentielle décroissante, qui part de E.'],
    [`de ${uCh} : elle monte vers ${Eh}`,false,`Tu as pris ${uRh} pour ${uCh}. ${uRh} part de ${Eh} et descend vers 0.`,'La courbe u_R monte-t-elle ou descend-elle ?'],
    ['d’une droite qui atteint 0 en τ',false,`Tu as pris la tangente pour la courbe. ${uRh} ne touche jamais 0 : seule sa tangente coupe l’axe en τ.`,'Une exponentielle atteint-elle 0 ?']]),
    reveal:[{p:{p37:1},d:900}],
    apres:{html:`<p class="small">Comme pour les noyaux : sa tangente à l’origine coupe l’axe des temps en ${th_}, et à ${th_} il reste ${pc(1-chargePart(1))} %. Sur ${ih}(<i>t</i>), la même lecture : ${ih}(${th_}) ≈ ${iTau} mA.</p>`}}},
{cle:'cinq-tau',beat:6,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1,taus:1}),sujet:'la durée de la charge, environ 5τ',
  text:['Au bout de combien de temps la charge est-elle pratiquement finie, à plus de 99 % ?'],
  verifie:{fixe:true,...VF([
    [`${th_} = ${tauS} s`,false,`À ${th_}, seulement ${p63} % sont atteints. Il faut environ 5${th_} pour dépasser 99 %.`,'Quelle part est atteinte à τ ?'],
    [`2${th_} = ${tau2} s`,false,`À 2${th_}, ${p86} % seulement sont atteints. Il faut environ 5${th_} pour dépasser 99 %.`,'Quelle part est atteinte à 2τ ?'],
    [`environ 5${th_} = ${t5} s`,true,`Oui : à 5${th_}, ${p99} % de la charge est faite.`]]),
    apres:{html:'Le [[regime|régime transitoire]] dure environ 5τ ; ensuite, le régime est permanent.'}}},
{cle:'double',beat:6,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1}),
  text:[`On double ${Rh} et on divise ${Ch} par deux.`,`La courbe ${uCh}(<i>t</i>)…`],
  pari:{reveal:[{p:{ghost:1},d:1200}],...BET([
    ['monte plus vite : un C plus petit se remplit plus vite','Tu as retenu C seul. Un C plus petit se remplit plus vite, mais un R plus grand freine : le produit RC ne change pas.'],
    ['ne change pas','Oui : RC reste le même, donc τ aussi, et la courbe est la même.',1],
    ['monte plus lentement : un R plus grand freine','Tu as retenu R seul. Un R plus grand freine, mais un C plus petit se remplit plus vite : le produit RC ne change pas.']])}},
{cle:'curseurs',beat:6,scene:'courbe',ctl:'rc',needLabel:'Bouge les curseurs d’abord',set:CV({jeu:'charge',Eline:1,exact:1,base:1,live:1}),
  text:[`Bouge chaque curseur au moins une fois, et regarde la valeur de ${th_} au-dessus de la courbe.`]},
{cle:'influence-E',beat:6,scene:'courbe',set:CV({jeu:'charge',Eline:1,exact:1,base:1,live:1,E:2*E_V,ym:28}),sujet:'l’influence de E sur τ',
  text:[`On charge sous ${fr(2*E_V,0)} V au lieu de ${Ev} V. La constante de temps ${th_}…`],
  verifie:{...VF([
    ['ne change pas : seule l’asymptote double',true,`Oui : ${th_} = ${RCh} ne contient pas ${Eh}. La courbe monte deux fois plus haut dans le même temps.`],
    ['double',false,`Tu as cru que ${Eh} entre dans ${th_}. ${th_} = ${RCh} ne contient pas ${Eh}.`,'Quelles grandeurs figurent dans τ = RC ?'],
    ['est divisé par deux : avec plus de tension, la charge va plus vite',false,`Tu as cru qu’une tension plus grande charge plus vite. La courbe monte plus haut dans le même temps : ${th_} ne change pas.`,'La courbe est-elle plus rapide, ou seulement plus haute ?']])}},

/* ===== 7. la décharge ===== */
{cle:'ed-decharge',beat:7,scene:'circuit',set:CI({jeu:'rc',K:2,t:0,...FL('fi','fu','fr')}),sujet:'l’équation de la décharge',
  text:[`Le condensateur est chargé : ${uCh} = ${Eh}. À <i>t</i> = 0, on bascule K en position 2 : le générateur sort de la maille, les flèches ne changent pas.`],
  deriv:[
    {tex:tx`u_R+u_C=0`,alt:'uR + uC = 0',r:'Plus de générateur dans la maille.'},
    {tex:tx`u_R=R\,i\quad\text{et}\quad i=C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}`,alt:'uR = R i et i = C duC/dt',r:'Les mêmes relations qu’à la charge.'}],
  pari:{label:'L’équation ?',
    apres:{tex:[[tx`RC\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}+u_C=0`,'RC duC/dt + uC = 0']]},
    ...VF([
    [`${RCh} ${dudt} + ${uCh} = 0`,true,`Oui : ${uRh} + ${uCh} = 0 avec ${uRh} = ${RCh} ${dudt}.`],
    [`${RCh} ${dudt} − ${uCh} = 0`,false,`Tu as écrit ${uRh} = ${uCh}. Avec ce signe, ${uCh} grandirait sans fin : ${uRh} + ${uCh} = 0.`,'Que vaut la somme u_R + u_C sans générateur ?'],
    [`${RCh} ${dudt} + ${uCh} = ${Eh}`,false,`Tu as gardé ${Eh}. Le générateur a quitté la maille : le second membre est nul.`,'Le générateur est-il encore dans la maille ?']])}},
{cle:'sol-decharge',beat:7,scene:'courbe',set:CV({jeu:'decharge',curve:0}),sujet:'la solution de la décharge',
  text:[`${uCh}(0) = ${Eh}. La solution de ${RCh} ${dudt} + ${uCh} = 0 est…`],
  verifie:{...VF([
    [`${Eh} ${eRC}`,true,`Oui : elle vaut ${Eh} à <i>t</i> = 0 et décroît vers 0.`],
    [`${Eh}(1 − ${eRC})`,false,'Tu as repris la solution de la charge. Elle vaut 0 à t = 0, pas E.','Que vaut cette expression à t = 0 ?'],
    [`${Eh} e<sup>+<i>t</i>/<i>RC</i></sup>`,false,'Tu as changé le signe de l’exposant. e<sup>+t/RC</sup> grandit sans fin.','Une tension qui se décharge grandit-elle ?']]),
    reveal:[{p:{curve:1,tan:1,p37:1},d:1400}],
    apres:{html:`<p class="small">C’est N<sub>0</sub> e<sup>−λ<i>t</i></sup>, avec ${Eh} pour N<sub>0</sub> et 1/${th_} pour λ. Même ${th_} qu’à la charge.</p>`}}},
{cle:'i-decharge',beat:7,scene:'circuit',set:CI({jeu:'rc',K:2,t:0,fi:1,fu:1,fa:'i'}),sujet:'le signe de i à la décharge',
  text:[`Pendant la décharge, ${ih}(<i>t</i>) = ?`],
  verifie:{...VF([
    [`−(${Eh}/${Rh}) ${eRC}`,true,`Oui : ${ih} = ${Ch} ${dudt} et ${uCh} décroît, donc ${ih} < 0.`],
    [`+(${Eh}/${Rh}) ${eRC}`,false,`Tu as oublié le signe. ${ih} = ${Ch} ${dudt} et ${uCh} décroît : ${ih} est négatif.`,'u_C croît-elle ou décroît-elle ? Quel est le signe de i ?'],
    [`nul à <i>t</i> = 0⁺, comme ${uCh} est continue`,false,`Tu as confondu ${ih} et ${uCh}. ${uCh} est continue, mais ${ih} saute de 0 à −${Eh}/${Rh}.`,'Qu’est-ce qui est continu : u_C ou i ?']]),
    apres:{html:`<p class="small">Un courant négatif circule à l’inverse de sa flèche.</p>`}}},
{cle:'v-37',beat:7,scene:'courbe',set:CV({jeu:'decharge',curve:1,lect:Math.round(U37*10)/10}),sujet:'lire τ à 37 %',
  text:[`Décharge depuis ${Ev} V : lis ${th_} sur l’axe des temps.`],
  verifie:{fixe:true,...VF([
    [`${d1(T_FAUX37)} s`,false,`Tu as lu à ${u63} V, le repère de la montée. Sur une courbe qui descend, on lit où il reste 37 %.`,'Où lit-on τ quand la courbe descend : à 37 % ou à 63 % ?'],
    [`${th} s`,false,`Tu as lu à la moitié de ${Eh}, soit ${dn(MOITIE)} V. C’est τ ln 2, pas τ.`,'La moitié de E est-elle le repère de τ ?'],
    [`${tauS} s`,true,`Oui : il reste ${pc(1-chargePart(1))} % de ${Ev} V, soit ${u37} V, à <i>t</i> = ${th_} = ${tauS} s.`]])}},

/* ===== 8. l'énergie ===== */
{cle:'energie-pari',beat:8,scene:'courbe',set:CV({jeu:'energie',curve:0,pts:0}),
  text:[`Chargé sous ${Ev} V, le condensateur a rallumé la lampe.`,`Chargé sous ${fr(2*E_V,0)} V, il lui donnera…`],
  pari:{reveal:[{p:{curve:1},d:1500},{p:{pts:1},d:1200}],...BET([
    ['deux fois plus d’énergie','Tu as pensé que l’énergie est proportionnelle à la tension. Deux fois plus de charge, poussée par une tension deux fois plus grande : quatre fois plus.'],
    ['quatre fois plus d’énergie',`Oui : ${ee12} mJ contre ${ee24} mJ, soit ${fr(FOIS_ENERGIE,0)} fois plus. Les deux points sont sur une parabole : la suite l’établit.`,1],
    ['la même énergie : c’est le même condensateur','Tu as cru que l’énergie ne dépend que du condensateur. Elle dépend aussi de la tension : plus u<sub>C</sub> est grande, plus il a stocké.']])}},
{cle:'energie-etablir',beat:8,scene:'courbe',set:CV({jeu:'energie',curve:1,pts:1}),sujet:'établir l’énergie emmagasinée',
  text:['Filières PC et SM. En SVT, ce n’est pas à ton programme.','La puissance reçue par le condensateur vaut <i>p</i> = <i>u</i><sub>C</sub> <i>i</i>, en convention récepteur.'],
  html:()=>'<button type="button" class="ctl-btn alt saut" data-aller="energie-calc">Passer à la suite →</button>',
  deriv:[
    {tex:tx`p=u_C\,i`,alt:'p = uC i',r:'La puissance reçue, en convention récepteur.'},
    {tex:tx`p=C\,u_C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}`,alt:'p = C uC duC/dt',r:`${ih} = ${Ch} ${dudt}.`}],
  pari:{label:'Une dérivée ?',
    apres:{tex:[[tx`E_e=\dfrac{1}{2}\,C\,u_C^{2}`,'Ee = ½ C uC²']],html:'C’est l’[[energieemmagasinee|énergie emmagasinée]] dans le condensateur.'},
    ...VF([
    [`½ ${Ch} ${uCh}<sup>2</sup>`,true,`Oui : la dérivée de ${uCh}<sup>2</sup> est 2 ${uCh} ${dudt}, d’où le ½.`],
    [`${Ch} ${uCh}<sup>2</sup>`,false,`Tu as oublié le ½. La dérivée de ${uCh}<sup>2</sup> est 2 ${uCh} ${dudt} : d’où le ½.`,'Que vaut la dérivée de u_C² ?'],
    [`${Ch} ${uCh}`,false,`${Ch} ${uCh} est la charge ${qh}, pas une énergie. Dérive ${uCh}<sup>2</sup> : on obtient 2 ${uCh} ${dudt}.`,'C·u_C est-elle une énergie ou une charge ?']])}},
{cle:'energie-calc',beat:8,scene:'courbe',set:CV({jeu:'energie',curve:1,pts:0}),sujet:'calculer l’énergie emmagasinée',
  text:[`${Ch} = ${uFc} µF, chargé sous ${Ev} V. Que vaut ${Ee} ?`],
  verifie:{...VF([
    [`${ee12} mJ`,true,`Oui : ½ × ${sci(C_F)} × ${Ev}<sup>2</sup> = ${ee12} mJ.`],
    [`${sci(0.5*220*E_V*E_V,2)} J`,false,`Tu as laissé ${Ch} en µF. Convertis : ${uFc} µF = ${sci(C_F)} F, et l’énergie sort en joules.`,'Dans une formule, la capacité doit-elle être en farads ?'],
    [`${fr(0.5*C_F*E_V*1e3,2)} mJ`,false,`Tu n’as pas élevé ${uCh} au carré. ${Ee} = ½ ${Ch} ${uCh}<sup>2</sup>, pas ½ ${Ch} ${uCh}.`,'La tension est-elle au carré dans la formule ?']]),
    apres:{html:'<p class="small">À la décharge, cette énergie est dissipée par effet Joule dans <i>R</i>.</p>'}}},

/* ===== 9. mesurer ===== */
{cle:'oscillo',beat:9,scene:'circuit',set:CI({jeu:'oscillo',K:1,t:1,osc:1}),sujet:'ce que montre un oscilloscope',
  text:[`Voie <i>Y</i><sub>1</sub> sur A, masse sur B : l’oscilloscope montre ${uCh} = ${uAB}.`,`Il ne montre que des tensions. Pour voir l’allure de ${ih}(<i>t</i>), on visualise…`],
  verifie:{...VF([
    [`${uRh}, car ${uRh} = ${Rh} ${ih}`,true,`Oui : ${uRh} est l’image de ${ih}, à ${Rh} près.`],
    [`${uCh}`,false,`Tu as pris ${uCh} pour l’image de ${ih}. ${uCh} suit la charge ${qh}, pas le courant.`,'u_C suit-elle la charge q ou le courant i ?'],
    ['rien : un oscilloscope ne voit pas les courants',false,`Tu as cru que ${ih} est invisible. ${uRh} = ${Rh} ${ih} en est l’image, à ${Rh} près.`,'Quelle tension est proportionnelle à i ?']])}},
{cle:'oscillo-lire',beat:9,scene:'courbe',set:CV({jeu:'charge',xmax:5,Eline:1,exact:1,tan:1,osc:1}),sujet:'convertir des divisions en secondes',
  text:[`À l’écran, ${oscS} s par division. La tangente à l’origine coupe l’asymptote à ${oscD} divisions. ${th_} = ?`],
  verifie:{fixe:true,...VF([
    [`${tauS} s`,true,`Oui : ${oscD} divisions × ${oscS} s par division = ${tauS} s.`],
    [`${oscD} s`,false,`Tu as lu des divisions comme des secondes. Multiplie par la sensibilité horizontale : ${oscD} × ${oscS} s.`,'Une division vaut-elle une seconde ?'],
    [`${d1(OSC_DIV/OSC_S_DIV)} s`,false,`Tu as divisé par la sensibilité. ${th_} = divisions × secondes par division.`,'Combien de secondes dans 4,4 divisions de 0,5 s ?']])}},

/* ===== 10. retour à l'énigme ===== */
{cle:'retour-lampe',beat:10,scene:'circuit',set:CI({jeu:'lampe',K:1,t:0}),seq:[{p:{t:1},d:3200}],
  text:()=>[rappelLampe(),'Aucune charge n’a traversé l’isolant : le courant a apporté des charges à A et en a retiré à B.',`Il vaut ${Eh}/${Rh} au départ, puis décroît avec ${th_} : la lampe s’éteint après environ 5${th_}.`,{t:'Le courant passe tant que le condensateur se charge.',fort:true}]},
{cle:'retour-duree',beat:10,scene:'circuit',set:CI({jeu:'lampe',K:1,t:0.3}),sujet:'ce qui règle la durée de la lueur',
  text:['La durée de la lueur est réglée par '+th_+' = '+RCh+'.','Pour qu’elle dure deux fois plus longtemps, on…'],
  verifie:{...VF([
    [`double ${Ch}`,true,`Oui : ${th_} = ${RCh} est doublé.`],
    [`double ${Eh}`,false,`Tu as cru que ${Eh} règle la durée. ${Eh} fixe la hauteur : ${th_} = ${RCh} ne contient pas ${Eh}.`,'Quelles grandeurs figurent dans τ ?'],
    [`divise ${Rh} par deux`,false,`Tu as fait l’inverse : ${th_} = ${RCh} serait divisé par deux.`,'Diviser R par deux allonge-t-il ou raccourcit-il τ ?']])}},
{cle:'retour-interet',beat:10,scene:'circuit',set:CI({jeu:'lampe',K:2,t:0.3}),sujet:'l’intérêt d’un circuit RC',
  text:['Ce montage permet…'],
  verifie:{...VF([
    ['de stocker de l’énergie, puis de la rendre',true,`Oui : le condensateur rend, en un temps réglé par ${RCh}, l’énergie que le générateur lui a donnée.`],
    ['de produire de l’énergie à partir de rien',false,'Tu as cru que le condensateur produit de l’énergie. Il rend seulement ce que le générateur lui a donné.','Le condensateur rend-il plus que ce qu’il a reçu ?'],
    ['de laisser passer un courant continu',false,`Tu as cru qu’il conduit en continu. En régime permanent, ${ih} = 0.`,'Que vaut i quand u_C = E ?']])}},

/* ===== 11. au bac ===== */
{cle:'bac',beat:11,scene:'circuit',set:CI({jeu:'rc',K:1,t:0.3,fi:0,fu:0,fr:0,fe:0,sub:'le montage du sujet, sans la bobine'}),
  text:[`Bac PC 2022, session normale, exercice 3, question 1.1 (${fr(S22.bareme[0],2)} pt).`,`Montrer que l’équation différentielle de ${uCh} s’écrit ${dudt} + ${uCh}/(${RCh}) = ${Eh}/(${RCh}).`,'Quel est ton premier geste ?'],
  pari:{reveal:[{p:{...ALL},d:900}],...BET([
    ['Écrire l’additivité des tensions dans la maille, avec les flèches du schéma',`Oui : ${uRh} + ${uCh} = ${Eh}, avec les flèches du schéma, est le point de départ de toute la question.`,1],
    ['Dériver la solution donnée en 1.2 et la remplacer','Tu as pris la question 1.1 pour la 1.2. Dériver une solution, c’est la vérifier ; ici, on établit l’équation, avec la maille.'],
    ['Lire τ sur la courbe (T)','Aucune valeur n’est demandée en 1.1. Commence par l’équation : l’additivité des tensions dans la maille.']])}},
{cle:'bac-ed',beat:11,scene:'circuit',set:CI({jeu:'rc',K:1,t:0.3,...ALL,sub:'le montage du sujet, sans la bobine'}),
  text:[`Voici la rédaction attendue au sujet 2022. Barème imprimé en marge : ${fr(S22.bareme[0],2)} pt.`],
  deriv:[
    {tex:tx`u_R+u_C=E`,alt:'uR + uC = E',r:'L’additivité des tensions dans la maille, avec les flèches du schéma.'},
    {tex:tx`u_R=R\,i`,alt:'uR = R i',r:'La loi d’Ohm, en convention récepteur.'},
    {tex:tx`i=\dfrac{\mathrm{d}q}{\mathrm{d}t}=C\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}`,alt:'i = dq/dt = C duC/dt',r:'<i>q</i> = <i>C</i> <i>u</i><sub>C</sub>, et <i>q</i> est la charge de A.'},
    {tex:tx`RC\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}+u_C=E`,alt:'RC duC/dt + uC = E',r:'On remplace <i>u</i><sub>R</sub> dans la maille.'},
    {tex:tx`\dfrac{\mathrm{d}u_C}{\mathrm{d}t}+\dfrac{1}{RC}\,u_C=\dfrac{E}{RC}`,alt:'duC/dt + uC/(RC) = E/(RC)',r:'On divise par <i>RC</i> : c’est la forme demandée.'}]},
{cle:'bac-i',beat:11,scene:'courbe',set:CV({jeu:'bac22',curve:1}),sujet:'l’intensité du sujet 2022',
  text:[`Sujet 2022, question 1.2.1 (${fr(S22.bareme[1],1)} pt) : établir ${ih}(<i>t</i>) en fonction de ${Eh}, ${Rh}, ${Ch} et <i>t</i>, sachant que ${uCh}(<i>t</i>) = ${Eh}(1 − ${eRC}).`],
  verifie:{...VF([
    [`${ih} = ${Ch} ${dudt} = (${Eh}/${Rh}) ${eRC}`,true,`Oui : on dérive ${uCh}, puis on multiplie par ${Ch}.`],
    [`${ih} = (${Eh}/(${RCh})) ${eRC}`,false,`Tu as oublié ${Ch} : c’est ${dudt}, en V·s<sup>−1</sup>. Multiplie par ${Ch}.`,'Quelle relation lie i et du_C/dt ?'],
    [`${ih} = (${Eh}/${Rh})(1 − ${eRC})`,false,`Tu as fait monter le courant comme ${uCh}. ${ih} part de ${Eh}/${Rh} : il décroît.`,'Que vaut i à t = 0 ?']])}},
{cle:'bac-R',beat:11,scene:'courbe',set:CV({jeu:'bac22',curve:1,rep:1}),sujet:'la résistance lue sur le sujet 2022',
  text:[`Sujet 2022, question 1.2.2 (${fr(S22.bareme[2],1)} pt) : sur la figure 2, ${uCh} tend vers ${fr(S22.E,0)} V et ${ih}(0) = ${i22} mA. Déduis ${Rh}.`],
  verifie:{...VF([
    [`${Rh} = ${Eh}/<i>i</i><sub>0</sub> = ${fr(S22.E,0)}/(${i22} × 10<sup>−3</sup>) = ${R22} Ω`,true,`Oui : ${ih}(0) = ${Eh}/${Rh}, donc ${Rh} = ${Eh}/<i>i</i><sub>0</sub>.`],
    [`${Rh} = ${Eh}/<i>i</i><sub>0</sub> = ${fr(S22.E,0)}/${i22} = ${fr(S22.RFaux1,0)} Ω`,false,`Tu as laissé <i>i</i><sub>0</sub> en mA. ${i22} mA = ${i22} × 10<sup>−3</sup> A, donc ${Rh} = ${R22} Ω.`,'Le courant doit-il être en ampères ?'],
    [`${Rh} = <i>i</i><sub>0</sub>/${Eh} = ${i22} × 10<sup>−3</sup>/${fr(S22.E,0)} = ${sci(S22.RFaux2,1)} Ω`,false,`Tu as divisé <i>i</i><sub>0</sub> par ${Eh}. ${Rh} = ${Eh}/<i>i</i><sub>0</sub> : la tension sur le courant.`,'R est-elle une tension divisée par un courant, ou l’inverse ?']])}},
{cle:'bac-C',beat:11,scene:'courbe',set:CV({jeu:'bac22',curve:1,rep:2}),sujet:'la capacité lue sur le sujet 2022',
  text:[`Sujet 2022, question 1.2.3 (${fr(S22.bareme[3],2)} pt) : montrer que ${Ch} = ${C22} µF. Où lis-tu ${th_} ?`],
  verifie:{...VF([
    [`${th_} = ${tau22} ms, où (T) coupe le palier, donc ${Ch} = ${th_}/${Rh} = ${C22} µF`,true,`Oui : la tangente (T) coupe le palier à <i>t</i> = ${th_}.`],
    [`${th_} ≈ ${t37} ms, où ${uCh} = 37 % de ${Eh}, donc ${Ch} = ${th_}/${Rh} ≈ ${t37} µF`,false,`Tu as lu à 37 % sur une courbe qui monte : à 37 % de E, ce n’est pas τ. Lis τ où (T) coupe le palier.`,'Où la tangente à l’origine coupe-t-elle le palier ?'],
    [`${th_} ≈ ${th22} ms, où ${uCh} = ${Eh}/2, donc ${Ch} = ${th_}/${Rh} ≈ ${th22} µF`,false,`Tu as lu à la moitié de ${Eh} : c’est τ ln 2, pas τ.`,'La moitié de E est-elle le repère de τ ?']]),
    apres:{html:`<div class="rc-copie"><p><b>Littéral.</b> ${th_} = ${RCh}, donc ${Ch} = ${th_}/${Rh}.</p><p><b>Lecture.</b> (T) coupe le palier ${uCh} = ${Eh} à <i>t</i> = ${th_} = ${tau22} ms.</p><p><b>Numérique.</b> ${Ch} = ${tau22} × 10<sup>−3</sup> / ${R22} = ${sci(S22.C,1)} F = ${C22} µF.</p></div><p class="small">Barème imprimé : ${S22.bareme.map(b=>fr(b,Math.abs(b*10-Math.round(b*10))<1e-9?1:2)).join(' + ')} pt, soit ${fr(S22.bareme.reduce((a,b)=>a+b,0),1)} pt. Consigne imprimée sur les sujets : « On donnera les expressions littérales avant de passer aux applications numériques. »</p>`}}},
{cle:'bac-2a',beat:11,scene:'droite',set:DR({jeu:'dudt',line:1,pt:0}),sujet:'la forme du sujet 2021',
  text:[`À toi. Bac PC 2021, session normale, exercice IV, partie I, question 1 (${fr(S21.bareme[0],1)} pt) : montrer que ${dudt} = −${uCh}/(${RCh}) + ${Eh}/(${RCh}). De ${RCh} ${dudt} + ${uCh} = ${Eh}, on tire…`],
  verifie:{...VF([
    [`${dudt} = −${uCh}/(${RCh}) + ${Eh}/(${RCh})`,true,`Oui : on divise par ${RCh} et on isole ${dudt}.`],
    [`${dudt} = −${RCh} ${uCh} + ${RCh} ${Eh}`,false,`Tu as multiplié par ${RCh} au lieu de diviser. L’homogénéité tranche : ${RCh} ${uCh} n’est pas en V·s<sup>−1</sup>.`,'Pour isoler du_C/dt, multiplie-t-on ou divise-t-on par RC ?'],
    [`${dudt} = ${uCh}/(${RCh}) − ${Eh}/(${RCh})`,false,`Tu as inversé les deux signes. ${RCh} ${dudt} = ${Eh} − ${uCh} : divise par ${RCh}.`,'Que vaut RC du_C/dt en fonction de E et u_C ?']])}},
{cle:'bac-2b',beat:11,scene:'droite',set:DR({jeu:'dudt',line:1,pt:1}),sujet:'la capacité lue sur la droite du sujet 2021',
  text:[`Sujet 2021, question 2 (${fr(S21.bareme[1],1)} pt) : la droite ${dudt} = f(${uCh}) passe par (0 ; ${fr(S21.ordo,0)}), (${S21.mil[0]} ; ${S21.mil[1]}) et (${S21.abs} ; 0), avec ${Rh} = 10<sup>${Math.round(Math.log10(S21.R))}</sup> Ω. Montre que ${Ch} = ${C21} µF.`],
  deriv:[
    {tex:tx`u_C=0:\ \dfrac{\mathrm{d}u_C}{\mathrm{d}t}=\dfrac{E}{RC}=${TN(S21.ordo)}\ \mathrm{V\cdot s^{-1}}`,alt:`uC = 0 : duC/dt = E/(RC) = ${fr(S21.ordo,0)} V·s⁻¹`,r:'L’ordonnée à l’origine.'},
    {tex:tx`\text{pente}=-\dfrac{1}{RC}=-\dfrac{${TN(S21.ordo)}}{${TN(S21.abs)}}\approx -${TN(-S21.pente,1)}\ \mathrm{s^{-1}}`,alt:`pente = −1/(RC) = −${fr(S21.ordo,0)}/${fr(S21.abs,0)} ≈ −${pente21} s⁻¹`,r:`La droite coupe l’axe en ${uCh} = ${Eh} = ${fr(S21.abs,0)} V.`}],
  pari:{label:'Capacité ?',
    ...VF([
    [`${RCh} = ${fr(S21.abs,0)}/${fr(S21.ordo,0)} = ${RC21} s, donc ${Ch} = ${C21} µF`,true,`Oui : ${Eh}/(${RCh}) = ${fr(S21.ordo,0)} avec ${Eh} = ${fr(S21.abs,0)} V donne ${RCh}, puis ${Ch} = ${RCh}/${Rh}.`],
    [`1/(${RCh}) = ${fr(S21.ordo,0)} s<sup>−1</sup>, donc ${Ch} = ${fr(S21.CFaux1*1e6,0)} µF`,false,`Tu as pris ${fr(S21.ordo,0)} pour 1/(${RCh}) : c’est ${Eh}/(${RCh}). Il faut aussi ${Eh}, lue où la droite coupe l’axe.`,'Que représente l’ordonnée à l’origine ?'],
    [`${RCh} = ${pente21} s, donc ${Ch} = ${sci(S21.CFauxPente,1)} F`,false,`Tu as pris ${pente21} pour ${RCh} : c’est 1/(${RCh}). ${RCh} = 1/${pente21} = ${RC21} s.`,'La pente vaut-elle RC ou 1/RC ?']])}},

/* ===== 12. bilan ===== */
{cle:'q1',beat:12,scene:'quiz',set:{qi:0,rv:0},seq:[{p:{rv:1},d:1200}],sujet:'63 % sur une courbe qui descend',
  text:[`Sur la courbe (<i>C</i><sub>2</sub>) du sujet 2022, une copie lit ${th_} là où ${ih} = 63 % de ${i22} mA, soit ${d1(S22.i63*1e3)} mA. Elle trouve ${th_} ≈ ${t37} ms, puis ${Ch} ≈ ${t37} µF. Son erreur ?`],
  verifie:{...VF([
    [`elle a lu 63 % sur une courbe qui descend : il faut 37 %, soit ${d1(S22.i37*1e3)} mA`,true,`Oui : sur une courbe qui descend, ${th_} se lit là où il reste 37 %. On trouve ${th_} = ${tau22} ms.`],
    [`elle aurait dû lire à la moitié de <i>i</i><sub>0</sub>, soit ${dn(S22.iMoitie*1e3)} mA, pas à 63 %`,false,`Tu as pris la moitié pour le repère de ${th_} : c’est τ ln 2. Sur une descente, on lit où il reste 37 %.`,'La moitié de i₀ est-elle le repère de τ ?'],
    ['aucune : le repère 63 % vaut pour toutes les courbes',false,'Tu as cru que 63 % vaut partout. 63 % est ce qui est atteint par une courbe qui monte ; sur une descente, il reste 37 %.','La courbe de i monte-t-elle ou descend-elle ?']])}},
{cle:'q2',beat:12,scene:'quiz',set:{qi:1,rv:0},seq:[{p:{rv:1},d:1200}],sujet:'la capacité équivalente',
  text:['Deux condensateurs de 10 µF sont montés en série. Que vaut <i>C</i><sub>éq</sub> ?'],
  verifie:{...VF([
    ['5 µF',true,'Oui : 1/<i>C</i><sub>éq</sub> = 1/10 + 1/10, donc <i>C</i><sub>éq</sub> = 5 µF.'],
    ['20 µF',false,'Tu as additionné : c’est la formule du montage en parallèle. En série, 1/<i>C</i><sub>éq</sub> = 1/<i>C</i><sub>1</sub> + 1/<i>C</i><sub>2</sub>.','Quel montage additionne les capacités ?'],
    ['10 µF',false,'Tu as cru que la capacité ne change pas. 1/<i>C</i><sub>éq</sub> = 1/10 + 1/10 donne 5 µF.','Que donne 1/10 + 1/10 ?']])}},
{cle:'q3',beat:12,scene:'quiz',set:{qi:2,rv:0},seq:[{p:{rv:1},d:1200}],sujet:'le calcul de τ et les préfixes',
  text:[`${Rh} = ${kO} kΩ et ${Ch} = ${uFc} µF : ${th_} = ?`],
  verifie:{...VF([
    [`${tauS} s`,true,`Oui : ${th_} = ${RCh} = ${sci(R_OHM,0)} × ${sci(C_F,1)} = ${tauS} s.`],
    [`${sci(R_OHM/C_F,1)} s`,false,`Tu as divisé ${Rh} par ${Ch}. ${th_} = ${RCh} : le produit.`,'τ est-il un produit ou un quotient ?'],
    [`${sci(R_OHM*220,1)} s`,false,`Tu as laissé ${Ch} en µF : ${uFc} µF = ${sci(C_F,1)} F, donc ${th_} = ${tauS} s.`,'La capacité doit-elle être en farads ?']])}},
{cle:'fin',beat:12,scene:'end',seq:[{p:{n:5},d:3200,w:300}],
  text:['Fin de la séance.'],html:()=>profileHTML()}
];
// les étapes à geste : « Suivant » attend les pas, ou les trois curseurs
STEPS.forEach(st=>{if(st.ctl==='pas')st.need=()=>S.pasClics>=5;if(st.ctl==='rc')st.need=()=>(S.rcBouges||[]).length>=3;});

// une espace insécable avant « % » ; un nombre ne se sépare pas de son unité
const pct=s=>typeof s==='string'?s.replace(/(\d) %/g,'$1 %').replace(/(\d) (s|ms|V|mV|kΩ|Ω|µF|nF|pF|mA|µA|mJ|J|µC|mC|F|divisions|dés)(?=[\s.,;:)<]|$)/g,'$1 $2'):s;
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
  bouteille:{t:'bouteille de Leyde',d:'Un vase de verre rempli d’eau : l’eau et la main qui le tient sont deux conducteurs séparés par le verre, un isolant. Kleist avait observé un choc semblable en 1745, avec une bouteille et un clou (Wikipédia, « Bouteille de Leyde »).'},
  condensateur:{t:'condensateur',d:'Un dipôle fait de deux conducteurs, les armatures, séparés par un isolant. Son symbole : deux traits parallèles.'},
  armature:{t:'armature',d:'Chacun des deux conducteurs d’un condensateur. Ici, A est l’armature par où entre <i>i</i>, et B l’autre.'},
  charge:{t:'charge du condensateur',d:'Par convention, la charge <i>q</i> du condensateur est celle de l’armature A, où entre <i>i</i>. L’armature B porte −<i>q</i>.'},
  conventionrecepteur:{t:'convention récepteur',d:'Pour un récepteur, la flèche de la tension s’oppose à celle du courant. Ici : <i>i</i> entre par A, et la flèche de <i>u</i><sub>C</sub> pointe vers A.'},
  capacite:{t:'capacité',d:'<i>C</i> = <i>q</i>/<i>u</i><sub>C</sub> : la charge de l’armature A divisée par la tension. Elle se mesure en farads, et se lit comme la pente de <i>q</i> en fonction de <i>u</i>.'},
  farad:{t:'farad',d:'L’unité de capacité, de symbole F. On rencontre le µF (10<sup>−6</sup> F), le nF (10<sup>−9</sup> F) et le pF (10<sup>−12</sup> F).'},
  regime:{t:'régimes transitoire et permanent',d:'Le régime transitoire : les grandeurs varient, ici jusqu’à environ 5τ. Le régime permanent : elles sont constantes, ici <i>u</i><sub>C</sub> = <i>E</i> et <i>i</i> = 0.'},
  tau:{t:'constante de temps',d:'<i>τ</i> = <i>RC</i>, une durée en secondes. Elle règle la vitesse de la charge et de la décharge.'},
  tangente:{t:'tangente à l’origine',d:'La droite qui touche la courbe en <i>t</i> = 0, avec la même pente. À la charge, elle coupe la droite <i>u</i> = <i>E</i> en <i>t</i> = <i>τ</i>.'},
  dimensions:{t:'équation aux dimensions',d:'On écrit la dimension d’une grandeur avec [U] (tension), [I] (intensité), [T] (durée), [Q] (charge). Elle sert à vérifier une unité ou une formule.'},
  exponentielle:{t:'fonction exponentielle',d:'Une fonction égale à sa dérivée : (e<sup>x</sup>)′ = e<sup>x</sup>, et (e<sup>u</sup>)′ = u′ e<sup>u</sup>. Elle a sa propre leçon.'},
  energieemmagasinee:{t:'énergie emmagasinée',d:'L’énergie électrique stockée dans un condensateur : <i>E</i><sub>e</sub> = ½ <i>C</i> <i>u</i><sub>C</sub><sup>2</sup>. Elle est rendue à la décharge.'},
};
Object.values(mots).forEach(m=>{m.d=pct(m.d);});

/* ---------- la fin : une ligne de résultat, les exercices, le détail ---------- */
const bet=k=>{const st=STEPS.find(s=>s.cle===k),j=S.first[k];return (!st||j==null)?null:!!st.pari.opts[j].juste;};
function profileHTML(){
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>ctx.juste(s.k)!=null),vok=V.filter(s=>ctx.juste(s.k)===true),vko=V.filter(s=>ctx.juste(s.k)===false);
  const P=STEPS.filter(s=>s.pari&&!s.verifie&&!s.pari.opts.some(o=>o.ok)),pv=P.filter(s=>bet(s.cle)!=null);
  const Q=[['q1','63 % sur une courbe qui descend'],['q2','la capacité équivalente'],['q3','τ = RC et les préfixes']];
  const res=Q.map(([k])=>ctx.juste(k));
  const ligne=`« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length||V.length}</b>. Tes paris : ${pv.length} faits.`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]}</li>`).join('');
  const bets=[];
  const a=bet('allumage');if(a!=null)bets.push(a?'tu savais qu’un courant passe, un moment, dans un circuit coupé':'« l’isolant coupe tout » ou « la lampe reste allumée » t’a tenté au départ');
  const f=bet('flash');if(f!=null)bets.push(f?'tu savais qu’un condensateur chargé se décharge dans la lampe':'« un condensateur ne garde rien » t’a tenté');
  const l=bet('leyde');if(l!=null)bets.push(l?'tu avais prévu le choc de Leyde':'tu n’avais pas prévu le choc de Leyde');
  const c=bet('allure');if(c!=null)bets.push(c?'tu savais que la tension monte vite, puis de plus en plus lentement':'« u_C saute » ou « u_C monte en ligne droite » t’a tenté');
  const p=bet('pas-pari');if(p!=null)bets.push(p?'tu avais compris que chaque pas monte moins que le précédent':'tu avais gardé le même courant à chaque pas');
  const t=bet('tangente');if(t!=null)bets.push(t?'tu savais qu’à τ la courbe est à environ 63 %':'« τ est la fin de la charge » t’a tenté');
  const d=bet('double');if(d!=null)bets.push(d?'tu savais que seul le produit RC compte':'« R seul » ou « C seul » t’a tenté');
  const e=bet('energie-pari');if(e!=null)bets.push(e?'tu savais que l’énergie est quatre fois plus grande':'« l’énergie est proportionnelle à la tension » t’a tenté');
  const revoir=vko.map(x=>x.sujet).filter(Boolean);
  return `<p class="res">${pct(ligne)}</p><a class="lien-exos" href="/pilote/dipole-rc/exercices">Faire les exercices →</a>
<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}${revoir.length?`<p class="small">À revoir : ${revoir.join(' ; ')}.</p>`:''}<div class="next"><div class="pari-k">Dans les exercices, piège par piège</div><ol><li>Le saut de ${uCh} et le courant initial : les exercices 7 et 8.</li><li>Le débit constant : l’exercice 3. Les 63 % et les 37 % : l’exercice 8.</li><li>τ = <i>R</i>/<i>C</i> : les exercices 1 et 6. Les signes : les exercices 2 et 5.</li><li>Les graphes : les exercices 3 et 9. Les préfixes : les exercices 1 et 12.</li><li>L’énergie : l’exercice 12. Les divisions de l’oscilloscope : l’exercice 13. Le bac : l’exercice 14.</li></ol></div></details>`;
}

/* ---------- contrôles par étape ---------- */
S.pasClics=0;S.rcBouges=[];S.rcPos=null;
const fkO=r=>fr(r/1e3,Number.isInteger(r/1e3)?0:1);
const fTau=t=>t<0.1?fr(t,3):t<1?fr(t,2):fr(t,1);
const dernierPas=()=>2+Math.min(S.pasClics,5);
function noteDuPas(k){
  const u=uPas(k),reste=E_V-u;
  return pct(`Pas n° ${k} : ${'<i>u</i><sub>C</sub>'} = ${fr(u,2)} V, il reste ${fr(reste,2)} V à charger, soit ${redP} fois le reste d’avant.`);
}
const NOTE_FIN=`Après ${N_PAS} pas, <i>u</i><sub>C</sub> = ${u10} V ; la courbe exacte donne ${u10x} V : les pas montent un peu trop vite. Plus ils sont courts, plus ils collent à la courbe.`;
const CTL={
  pas:{html:()=>`<div class="ctl"><div class="ctl-btns"><button type="button" class="ctl-btn" id="pasn">Pas suivant</button><button type="button" class="ctl-btn alt" id="pasv">Montre-moi la suite</button></div></div><p class="ctl-note" id="pasfb"></p>`,
    init(st){const b=$('#pasn'),v=$('#pasv'),fb=$('#pasfb'),sc=scenes.courbe;
      const fini=()=>{b.disabled=true;v.disabled=true;v.hidden=true;fb.innerHTML=pct(NOTE_FIN);ctx.majNav();};
      const terminer=async()=>{S.pasClics=Math.max(S.pasClics,5);fini();await ctx.tween(sc,{pas:N_PAS},1100);await ctx.tween(sc,{exact:1},1300);};
      if(S.pasClics>=5){fini();setTimeout(()=>{if(ctx.etape()===st){sc.p.pas=N_PAS;sc.p.exact=1;sc.render();}},900);return;}
      if(S.pasClics>0){fb.innerHTML=noteDuPas(dernierPas());setTimeout(()=>{if(ctx.etape()===st){sc.p.pas=dernierPas();sc.render();}},900);}
      b.addEventListener('click',()=>{S.pasClics++;const k=dernierPas();ctx.stop();sc.p.pas=k;sc.render();fb.innerHTML=noteDuPas(k);ctx.voir(fb);if(S.pasClics>=5)terminer();else ctx.majNav();});
      v.addEventListener('click',()=>{S.pasClics=5;terminer();});}},
  rc:{html:()=>`<div class="ctl"><div class="rc-cur">`+
      [['r','R',CRANS_R.length-1,3,v=>`${fkO(CRANS_R[v])} kΩ`],['c','C',CRANS_C.length-1,2,v=>`${fr(CRANS_C[v]*1e6,0)} µF`],['e','E',CRANS_E.length-1,2,v=>`${fr(CRANS_E[v],0)} V`]]
        .map(([k,n,mx,i0,f])=>`<label><span><i>${n}</i></span><input id="rc${k}" type="range" min="0" max="${mx}" step="1" value="${i0}" aria-label="${n}"><output id="rco${k}" for="rc${k}">${f(i0)}</output></label>`).join('')
      +`</div><div class="ctl-btns"><button type="button" class="ctl-btn alt" id="rcauto">Changer les trois réglages</button></div></div><p class="ctl-note" id="rcfb"></p>`,
    init(st){const sc=scenes.courbe,fb=$('#rcfb');
      const I={r:$('#rcr'),c:$('#rcc'),e:$('#rce')},Oo={r:$('#rcor'),c:$('#rcoc'),e:$('#rcoe')};
      const lab={r:v=>`${fkO(CRANS_R[v])} kΩ`,c:v=>`${fr(CRANS_C[v]*1e6,0)} µF`,e:v=>`${fr(CRANS_E[v],0)} V`};
      const ymE=e=>e<=12?14:e<=18?21:28;
      const poser=(k,v,marquer)=>{I[k].value=v;Oo[k].textContent=lab[k](+v);
        sc.p.R=CRANS_R[+I.r.value];sc.p.C=CRANS_C[+I.c.value];sc.p.E=CRANS_E[+I.e.value];sc.p.ym=ymE(sc.p.E);sc.render();
        if(marquer&&!S.rcBouges.includes(k)){S.rcBouges.push(k);}
        S.rcPos={r:+I.r.value,c:+I.c.value,e:+I.e.value};
        const tau=sc.p.R*sc.p.C;
        fb.innerHTML=S.rcBouges.length>=3?`<i>τ</i> = <i>RC</i> = ${fTau(tau)} s. Seul le produit <i>RC</i> règle la vitesse. <i>E</i> règle la hauteur.`:`Curseurs bougés : ${S.rcBouges.length} sur 3. <i>τ</i> = ${fr(tau,2)} s.`;
        ctx.majNav();};
      ['r','c','e'].forEach(k=>I[k].addEventListener('input',()=>{ctx.stop();poser(k,I[k].value,true);}));
      $('#rcauto').addEventListener('click',()=>{ctx.stop();['r','c','e'].forEach(k=>{const mx=+I[k].max;poser(k,(+I[k].value+1)%(mx+1),true);});});
      if(S.rcPos)setTimeout(()=>{if(ctx.etape()===st){['r','c','e'].forEach(k=>poser(k,S.rcPos[k],false));}},900);
      else fb.innerHTML='Curseurs bougés : 0 sur 3.';}}
};

// « Passer » : un bouton du panneau mène à une autre étape
const surSaut=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');if(!b||!root.contains(b))return;const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0){e.preventDefault();ctx.aller(i);}};
root.addEventListener('click',surSaut);

return {BEATS,STEPS,CTL,mots,
  reset(){S.pasClics=0;S.rcBouges=[];S.rcPos=null;},
  plain:s=>s.replace(/ ?%/g,' pour cent').replace(/Ω/g,' ohms').replace(/µ/g,'micro').replace(/τ/g,' tau ').replace(/λ/g,' lambda ').replace(/Δ/g,' delta '),
  demonter(){root.removeEventListener('click',surSaut);}};
});
}
