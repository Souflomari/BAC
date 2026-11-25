/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Nombres complexes, première partie » : forme algébrique et équations (format v3). Plan d'auteur :
 * docs/refonte/specs/nombres-complexes-1.md ; règles : docs/refonte/07-regles-du-format.md.
 *
 * Onze parties : ce qu'il faut savoir (le second degré dans ℝ), l'énigme de Cardan (x³ = 15x + 4), où
 * vivent ces nombres (le plan et le quart de tour : la figure-clé, la scène `plan`), calculer, le
 * conjugué, le module et la distance, le second degré dans ℂ, la partie SM (coefficients complexes,
 * sautée en PC et SVT), le retour à l'énigme, la fin de deux exercices du bac (2022 commenté, 2018 à
 * compléter), puis le bilan. La séance suivante (argument, forme trigonométrique et exponentielle,
 * rotations) est annoncée à la fin.
 *
 * Les scènes vivent dans complexes-scenes-{a,b,c}.js, les outils et les nombres dans complexes-outils.js ;
 * le déroulé, le panneau, les paris, les fiches et les calculs ligne à ligne dans noyau.js. Aucune valeur
 * numérique affichée n'est tapée à la main : elle sort d'un calcul de complexes-outils.js.
 */
import { monterLecon } from "./noyau";
import * as T from "./complexes-outils";
import { scenesA } from "./complexes-scenes-a";
import { scenesB } from "./complexes-scenes-b";
import { scenesC } from "./complexes-scenes-c";

const { fr, ent, M, H: h, TX: tx, MZ, C, ci, cmul, cadd, cconj, cneg, cre, cim } = T;
// l'espace fine insécable, pour les libellés que le noyau ne retouche pas
const NNB = " ";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {clamp,scenes,hooks,S}=ctx;
const $=ctx.$;
const O=T.outilsScene(ctx);
const {ty}=O;

/* ---------- petits morceaux de texte ---------- */
const I='<i>i</i>', Z='<i>z</i>', ZB='<span class="ov"><i>z</i><span class="vh"> barre</span></span>', IZ='<i>iz</i>';
const sup=(b,e)=>`${b}<sup>${e}</sup>`;
const sub=(b,e)=>`${b}<sub>${e}</sub>`;
const Zs=k=>sub(Z,k);
const ml=s=>String(s).replace(/-/g,'−');                // un moins de calcul → le vrai signe
const sg=x=>x<0?'−':'+';
const NW=s=>`<span class="nw">${s}</span>`;
const lst=a=>a.join(' et ');
const D2=T.polyHtml;

/* les quatre pièges du bilan (scène `quiz`) */
const PIEGES=[
  {tag:'Piège 1 sur 3 : la racine d’un négatif',big:`√(−${T.BQ1.n}) = ?`,r1:'pas de sens dans ℝ',r2:`*z*^{2} = −${T.BQ1.n} : ${T.BQ1.rac}*i* et −${T.BQ1.rac}*i*`},
  {tag:'Piège 2 sur 3 : le module d’une somme',big:'|1 + *i*| + |1 − *i*| et |(1 + *i*) + (1 − *i*)|',r1:`${T.BQ2_TOTAL} et ${ent(T.BQ2_SOMME)}`,r2:'le module d’une somme n’est pas la somme des modules'},
  {tag:'Piège 3 sur 3 : Δ < 0',big:`${T.polyScene(T.BQ3.a,T.BQ3.b,T.BQ3.c)} = 0`,r1:`Δ = ${fr(T.BQ3_DELTA,0)} < 0`,r2:`deux solutions : ${T.S(T.BQ3_SOL.z1)} et ${T.S(T.BQ3_SOL.z2)}`}];
scenesA(ctx,O);
scenesB(ctx,O);
scenesC(ctx,O,PIEGES);

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Où vivent ces nombres',court:'Lieu'},{name:'Calculer',court:'Calcul'},{name:'Le conjugué',court:'Miroir'},{name:'Le module et la distance',court:'Module'},{name:'Le second degré',court:'Racines'},{name:'Filière SM : coefficients complexes',court:'SM'},{name:'Retour à l’énigme',court:'Retour'},{name:'Au bac',court:'Bac'},{name:'Bilan',court:'Bilan'}
];
const BET=t=>({opts:t.map(([x,fb])=>({t:x,fb}))});
// une question : [texte, juste ?, explication, indice (pour une option fausse)]
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>ok?{t:x,ok:true,fb}:{t:x,fb,indice})});
const PARI_NOTE='Pari noté. Regarde la figure.';
// l'état complet de la scène `plan` : chaque étape repart de zéro, rien n'est hérité de l'étape d'avant
const P0={vue:0,axeI:1,lab:1,zv:0,zr:3,zi:2,geste:'',u:0,wr:1,wi:-4,eq:0,pts:'',pv:0,pl:0,cercles:'',cu:0,ab:0,su:0,opts:'',ov:0,proj:0,t1:'',t2:'',lv:0,sub:''};
const PL=o=>({...P0,...o});
const PZ=z=>({zr:cre(z),zi:cim(z)});
const SZ=(z)=>`*z* = ${T.S(z)}`;

/* les nombres de la leçon, nommés une fois */
const Z0=T.Z0, CD=T.CANON_ROUTE, SAV=T.SAV, CARD=T.CARDAN;

const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'savoir',beat:0,scene:'savoir',set:{q:1,qr:0,r1:0,r2:0,r3:0},ctl:'saut',sujet:'le discriminant et ses trois cas',
  text:['Avant l’énigme, un seul rappel : le second degré. Un test, réussi du premier coup, te permet de passer le rappel.',{t:`Quelles sont les solutions réelles de ${D2(SAV.a,SAV.b,SAV.c)} = 0 ?`,fort:true}],
  verifie:{...VF([
    [`aucune : Δ = ${SAV.b**2} − ${4*SAV.a*SAV.c} = ${fr(T.SAV_DELTA,0)} &lt; 0`,true,`Oui : Δ = ${fr(T.SAV_DELTA,0)} est négatif, donc l’équation n’a aucune solution réelle.`],
    [`deux : Δ = ${SAV.b**2} + ${4*SAV.a*SAV.c} = ${T.SAV_DELTA_SIGNE} &gt; 0`,false,`Tu as perdu le signe de −4<i>ac</i> : Δ = <i>b</i>² − 4<i>ac</i>, et 4<i>ac</i> = ${4*SAV.a*SAV.c} se soustrait.`,'Dans <i>b</i>² − 4<i>ac</i>, que fait-on de 4<i>ac</i> : on l’ajoute ou on le soustrait ?'],
    [`deux, ${ent(T.SAV_X_FAUX[0])} et ${fr(T.SAV_X_FAUX[1],0)} : Δ = ${T.SAV_ABS} &gt; 0`,false,`Tu as traité un Δ négatif comme un Δ positif. Pour <i>x</i> = ${ent(T.SAV_X_FAUX[0])}, ${D2(SAV.a,SAV.b,SAV.c)} vaut ${T.SAV_X_FAUX[0]**2} − ${Math.abs(SAV.b*T.SAV_X_FAUX[0])} + ${SAV.c} = ${T.SAV_TEST}, pas 0.`,`Teste <i>x</i> = ${ent(T.SAV_X_FAUX[0])} dans l’équation : obtiens-tu 0 ?`]]),reveal:[{p:{qr:1},d:700}]}},
{cle:'sav-rappel',beat:0,scene:'savoir',set:{q:0,qr:0},seq:[{p:{r1:1},d:700,w:200},{p:{r2:1},d:700,w:600},{p:{r3:1},d:700,w:600}],
  text:['Trois faits serviront dans toute la leçon.',{t:'Le discriminant décide du nombre de solutions réelles.',a:0},{t:'Une somme par une différence se développe en différence de carrés.',a:1},{t:'La distance se calcule avec les coordonnées.',a:2}]},

/* ===== 1. l'énigme ===== */
{cle:'cubique',beat:1,scene:'cardan',set:{cb:0,x4:0,form:0,trois:0,quatre:0},seq:[{p:{cb:1},d:1700,w:200},{p:{x4:1},d:600,w:100}],sujet:'l’équation de l’énigme',
  text:[`On cherche les solutions réelles de l’équation <i>x</i>³ = ${CARD.p}<i>x</i> + ${CARD.q}.`,{t:`Tu peux vérifier que <i>x</i> = ${T.X4} en est une : ${T.X4}³ = ${T.CARDAN_GAUCHE} et ${CARD.p} × ${T.X4} + ${CARD.q} = ${T.CARDAN_DROITE}.`,a:1}]},
{cle:'formule',beat:1,scene:'cardan',tag:'1545',set:{cb:1,x4:1,form:0,trois:0,quatre:0},seq:[{p:{form:1},d:700,w:200}],sujet:'la formule de Cardan',
  text:['En 1545, Cardan publie une formule pour les équations de ce type.',{t:`Appliquée à <i>x</i>³ = ${CARD.p}<i>x</i> + ${CARD.q}, elle donne ceci, et fait apparaître √−${T.CARDAN_MOINS}.`,a:0}],
  tex:[[`x=\\sqrt[3]{${T.CARDAN_DEMI}+\\sqrt{-${T.CARDAN_MOINS}}}+\\sqrt[3]{${T.CARDAN_DEMI}-\\sqrt{-${T.CARDAN_MOINS}}}`,`x = ∛(${T.CARDAN_DEMI} + √−${T.CARDAN_MOINS}) + ∛(${T.CARDAN_DEMI} − √−${T.CARDAN_MOINS})`]],
  html:()=>`<div class="dit"><p class="say" data-a="-1">${ty(`Dans ℝ, −${T.CARDAN_MOINS} n’a pas de racine carrée : cette expression n’a pas de sens. Tu n’as pas à connaître cette formule.`)}</p></div>`},
{cle:'fausse',beat:1,scene:'cardan',set:{cb:1,x4:1,form:1,trois:0,quatre:0},sujet:'une formule qui passe par √−121',
  text:[`La formule fait apparaître √−${T.CARDAN_MOINS}, qui n’est pas un réel. Pourtant ${T.X4} est solution.`,{t:'Alors, cette formule…',fort:true}],
  pari:{...BET([
    [`donne ${T.X4}, si l’on ose calculer avec √−${T.CARDAN_MOINS}`,'Pari noté. Regarde la courbe.'],
    ['est fausse pour cette équation','Pari noté. Regarde la courbe.'],
    ['désigne une autre solution, qui n’est pas réelle','Pari noté. Regarde la courbe.']]),
    reveal:[{p:{trois:1},d:900}],
    apres:{html:`La courbe coupe l’axe en trois points : ${fr(T.CUB_RAC[0],2)} ; ${fr(T.CUB_RAC[1],2)} et ${ent(T.CUB_RAC[2])}. <b>Les trois solutions sont réelles</b>, et la formule passe pourtant par √−${T.CARDAN_MOINS}.`}}},
{cle:'bombelli',beat:1,scene:'cardan',set:{cb:1,x4:1,form:1,trois:1,quatre:0},sujet:'calculer avec √−1',
  text:['Une issue : calculer avec √−1 comme avec une lettre, en posant (√−1)² = −1.','Mais la règle √<i>a</i> × √<i>b</i> = √(<i>ab</i>) donnerait √−1 × √−1 = √1 = 1.',{t:'Les deux ne tiennent pas ensemble. Que fait-on ?',fort:true}],
  pari:{...VF([
    ['on garde (√−1)² = −1 et on abandonne la règle des racines',true,`Oui : la règle √<i>a</i> × √<i>b</i> = √(<i>ab</i>) ne vaut que pour des nombres positifs. Pour √−1, on la quitte : on note ${I} ce nombre, et ${sup(I,2)} = −1.`],
    ['on garde la règle des racines et on abandonne (√−1)² = −1',false,`Tu as gardé la règle des racines : elle donne ${sup(I,2)} = 1. Mais elle n’est démontrée que pour des nombres positifs, et la courbe a montré que ${T.X4} est bien solution.`,'Pour quels nombres <i>a</i> et <i>b</i> la règle √<i>a</i> × √<i>b</i> = √(<i>ab</i>) a-t-elle été démontrée ?'],
    ['on abandonne √−1 : ce nombre n’existe pas, on s’arrête',false,`Tu as arrêté le calcul. Mais ${T.X4} est bien une solution, et la formule passe par √−${T.CARDAN_MOINS} : on garde ce nombre, et c’est la règle qu’on abandonne.`,'La courbe a montré trois solutions réelles : arrêter le calcul explique-t-il que la formule donne une solution ?']]),
    apres:{html:`<b>Trois questions restent ouvertes</b> : peut-on calculer ainsi sans contradiction ? Où vivent ces nombres ? L’expression vaut-elle vraiment ${T.X4} ?`}}},

/* ===== 2. où vivent ces nombres (la figure-clé, la scène `plan`) ===== */
{cle:'droite',beat:2,scene:'plan',d:1,set:PL({axeI:0,lab:0,zv:1,...PZ(T.Z_DROITE),geste:'demi',u:0}),seq:[{p:{u:1},d:1900,w:300}],sujet:'−1 comme demi-tour',
  text:[`Sur la droite des réels, multiplier par −1 envoie ${h(T.Z_DROITE)} sur ${h(cneg(T.Z_DROITE))}.`,{t:'On le dessine comme un demi-tour autour de O.',a:0},`Deux demi-tours ramènent au départ : (−1) × (−1) = ${h(cmul(C(-1),C(-1)))}.`]},
{cle:'quart',beat:2,scene:'plan',d:1,set:PL({axeI:0,lab:0,zv:1,...PZ(T.Z_QUART),geste:'quart',u:0}),sujet:'multiplier par i',
  text:[`Multiplier deux fois par ${I}, c’est multiplier par ${sup(I,2)} = −1 : un demi-tour.`,{t:`Multiplier une fois par ${I}, c’est donc…`,fort:true}],
  pari:{...BET([
    [`une multiplication par ½ : ${h(T.Z_QUART)} reste sur la droite`,`Tu as cherché ${I} sur la droite, à mi-chemin entre 0 et 1. Mais ½ × ½ = ${T.qStr(T.QUART_DEMI2)}, pas −1 : le carré d’un réel n’est jamais négatif.`],
    [`un quart de tour : ${h(T.Z_QUART)} quitte la droite`,`Regarde : le point ${h(T.Z_QUART)} quitte la droite. Deux quarts de tour font un demi-tour, donc ${I} × ${I} = −1.`],
    [`une multiplication par −½ : ${h(T.Z_QUART)} reste sur la droite`,`Tu as pris −½ pour ${I} : (−½)² = ${T.qStr(T.QUART_MDEMI2)}, pas −1. Un réel au carré n’est jamais négatif.`]]),
    reveal:[{p:{u:1,axeI:1},d:1800}],
    apres:{html:`Le point ${h(T.Z_QUART)} a quitté la droite : ${I} n’est pas sur la droite des réels.`}}},
{cle:'axe-i',beat:2,scene:'plan',d:1,set:PL({pts:'un-i',pv:1}),sujet:'l’axe des imaginaires',
  text:[`Le point ${I} est à la hauteur 1, sur l’axe vertical : l’axe des [[imaginaire|imaginaires]].`,'Les nombres ne sont plus sur une droite : ils remplissent un plan.']},
{cle:'quatre-quarts',beat:2,scene:'plan',d:1,set:PL({geste:'tour',...PZ(T.Z_QUART),u:0}),seq:[{p:{u:0.5},d:2300,w:300}],sujet:'le cycle des puissances de i',
  text:[`Chaque multiplication par ${I} fait faire un quart de tour de plus.`,{t:`Combien vaut ${sup(I,3)} ?`,fort:true}],
  verifie:{...VF([
    [h(cneg(ci)),true,`Oui : ${sup(I,3)} = ${sup(I,2)} × ${I} = −1 × ${I} = ${h(cneg(ci))} : trois quarts de tour depuis 1.`],
    [h(ci),false,`Tu as mal compté le cycle : ${I} est le premier quart de tour, ${sup(I,3)} le troisième.`,`Combien de quarts de tour faut-il pour ${sup(I,3)} ? Où arrive-t-on après trois ?`],
    [h(cpowI(2)),false,`Tu as donné ${sup(I,2)}, deux quarts de tour. Il en faut trois : ${sup(I,3)} = ${sup(I,2)} × ${I}.`,`Combien de multiplications par ${I} y a-t-il dans ${sup(I,3)} ?`]]),
    reveal:[{p:{u:1},d:2300}],
    apres:{tex:[[`i^2=${tx(cpowI(2))},\\quad i^3=${tx(cpowI(3))},\\quad i^4=${tx(cpowI(4))}`,`i² = ${h(cpowI(2))}, i³ = ${h(cpowI(3))}, i⁴ = ${h(cpowI(4))}`]],html:`Au quatrième quart de tour, on revient en ${h(cpowI(4))} : le cycle recommence.`}}},
{cle:'point-z',beat:2,scene:'plan',d:1,set:PL({zv:1,proj:1}),sujet:'forme algébrique, image et affixe',
  text:[`À chaque complexe ${Z} = <i>a</i> + <i>ib</i> correspond un point M(<i>a</i> ; <i>b</i>) : son [[image|image]].`,`Et ${Z} est l’[[affixe|affixe]] de M.`,`Re(${Z}) = <i>a</i> et Im(${Z}) = <i>b</i> sont deux réels : c’est la forme algébrique.`]},
{cle:'partie-imag',beat:2,scene:'plan',d:1,set:PL({zv:0}),sujet:'la partie imaginaire est un réel',
  text:[`Prenons un autre complexe : ${h(T.IM_Q)}.`,{t:`Im(${h(T.IM_Q)}) = ?`,fort:true}],
  pari:{...VF([
    [fr(cim(T.IM_Q),0),true,`Oui : <i>b</i> = ${fr(cim(T.IM_Q),0)}. La partie imaginaire est un réel, le coefficient de ${I}.`],
    [`${fr(cim(T.IM_Q),0)}${I}`,false,`Tu as gardé le ${I} dans la partie imaginaire. Im(${Z}) est un réel, le coefficient de ${I} : ${fr(cim(T.IM_Q),0)}, sans ${I}.`,`Im(${Z}) est-il un réel ou un complexe ? Que reste-t-il quand on enlève ${I} ?`],
    [fr(cre(T.IM_Q),0),false,`Tu as donné la partie réelle, l’abscisse. La partie imaginaire est l’ordonnée.`,`Re(${Z}) et Im(${Z}) : lequel est l’abscisse du point ?`]])}},
{cle:'egalite',beat:2,scene:'plan',d:1,set:PL({zv:0}),sujet:'l’égalité de deux complexes',
  text:['Deux complexes sont égaux s’ils ont la même image : mêmes parties réelles, mêmes parties imaginaires.',{t:`Avec <i>x</i> et <i>y</i> réels : (${T.EGAL.p}<i>x</i> ${sg(T.EGAL.q)} ${Math.abs(T.EGAL.q)}) + (<i>y</i> + ${T.EGAL.s})${I} = ${T.EGAL.u} ${sg(T.EGAL.v)} ${Math.abs(T.EGAL.v)}${I}. Que valent <i>x</i> et <i>y</i> ?`,fort:true}],
  pari:{...VF([
    [`<i>x</i> = ${fr(T.EGAL_X,0)} et <i>y</i> = ${fr(T.EGAL_Y,0)}`,true,`Oui : ${T.EGAL.p}<i>x</i> ${sg(T.EGAL.q)} ${Math.abs(T.EGAL.q)} = ${T.EGAL.u} donne <i>x</i> = ${fr(T.EGAL_X,0)}, et <i>y</i> + ${T.EGAL.s} = ${fr(T.EGAL.v,0)} donne <i>y</i> = ${fr(T.EGAL_Y,0)}.`],
    [`<i>x</i> = ${T.qStr(T.EGAL_ECHANGE[0])} et <i>y</i> = ${T.qStr(T.EGAL_ECHANGE[1])}`,false,`Tu as comparé la partie réelle d’un côté à la partie imaginaire de l’autre. On compare abscisse avec abscisse : ${T.EGAL.p}<i>x</i> ${sg(T.EGAL.q)} ${Math.abs(T.EGAL.q)} = ${T.EGAL.u}.`,`Quelle partie du second membre faut-il comparer à ${T.EGAL.p}<i>x</i> ${sg(T.EGAL.q)} ${Math.abs(T.EGAL.q)} : ${T.EGAL.u} ou ${fr(T.EGAL.v,0)} ?`],
    [`<i>x</i> = ${fr(T.EGAL_X,0)} et <i>y</i> = ${h(T.EGAL_IGARDE)}`,false,`Tu as gardé le ${I} dans la partie imaginaire. <i>y</i> est un réel : <i>y</i> + ${T.EGAL.s} = ${fr(T.EGAL.v,0)}, donc <i>y</i> = ${fr(T.EGAL_Y,0)}.`,`<i>y</i> est-il un réel ? Que vaut alors la partie imaginaire du second membre ?`]])}},
{cle:'fois-i',beat:2,scene:'plan',d:1,set:PL({zv:1,geste:'quart',u:0,opts:'fois',ov:1,t1:SZ(Z0)}),sujet:'multiplier par i, c’est tourner',
  text:[`Revenons au point d’affixe ${Z} = ${h(Z0)}.`,{t:`Où va-t-il quand on multiplie ${Z} par ${I} ?`,fort:true}],
  pari:{...BET([
    [`en A : les parties réelle et imaginaire échangées`,`Tu as échangé les parties : (${cre(Z0)} ; ${cim(Z0)}) devient (${cim(Z0)} ; ${cre(Z0)}). Mais ${I}² = −1 change le signe de l’abscisse.`],
    [`en B : un quart de tour autour de O`,`Ton pari : un quart de tour. L’abscisse ${cre(Z0)} et l’ordonnée ${cim(Z0)} deviennent ${fr(cre(T.FOIS_I.ok),0)} et ${fr(cim(T.FOIS_I.ok),0)}.`],
    [`en C : un demi-tour autour de O`,`Tu as pris ${I} pour −1 : un demi-tour envoie ${h(Z0)} sur ${h(T.FOIS_I.demi)}. Multiplier par ${I}, c’est la moitié d’un demi-tour.`]]),
    reveal:[{p:{u:1,eq:1,t2:`*iz* = ${T.S(T.FOIS_I.ok)}`,lv:1},d:1700}],
    apres:{tex:[[`i(${tx(Z0)})=${cre(Z0)}i+${cim(Z0)}i^{2}=${tx(T.FOIS_I.ok)}`,`${I}(${h(Z0)}) = ${cre(Z0)}${I} + ${cim(Z0)}${sup(I,2)} = ${h(T.FOIS_I.ok)}`]],html:`Le point a tourné d’un quart de tour autour de O.`}}},
{cle:'fois-i-curseur',beat:2,scene:'plan',d:1,set:PL({zv:1,geste:'quart',u:1,eq:1,t1:SZ(Z0),t2:`*iz* = ${T.S(T.FOIS_I.ok)}`,lv:1}),ctl:'z',need:()=>!!(S.zOk||S.zMontre),needLabel:'Fais glisser z d’abord',sujet:'iz est à angle droit de z',
  text:[`Fais glisser ${Z} d’un cran à l’autre.`,{t:`Regarde où va le point ${IZ} à chaque fois.`,fort:true}]},

/* ===== 3. calculer ===== */
{cle:'somme',beat:3,scene:'plan',d:1,set:PL({zv:1,geste:'trans',u:0,wr:cre(T.W_SOMME),wi:cim(T.W_SOMME),t1:SZ(Z0),t2:`*w* = ${T.S(T.W_SOMME)}`,lv:1}),sujet:'additionner deux complexes',
  text:[`On calcule avec ${I} comme avec une lettre.`,{t:`(${h(Z0)}) + (${h(T.W_SOMME)}) = ?`,fort:true}],
  pari:{...VF([
    [h(T.SOMME.ok),true,`Oui : les réels ensemble, ${cre(Z0)} + ${cre(T.W_SOMME)} = ${fr(cre(T.SOMME.ok),0)}, et les imaginaires ensemble, ${cim(Z0)} − ${Math.abs(cim(T.W_SOMME))} = ${fr(cim(T.SOMME.ok),0)}.`],
    [h(T.SOMME.signe),false,`Tu as perdu le signe de ${fr(cim(T.W_SOMME),0)}${I} : ${cim(Z0)} + (${fr(cim(T.W_SOMME),0)}) = ${fr(cim(T.SOMME.ok),0)}, pas ${cim(T.SOMME.signe)}.`,`Quel est le signe de la partie imaginaire de ${h(T.W_SOMME)} ?`],
    [h(T.SOMME.tout),false,`Tu as tout additionné, réels et imaginaires mêlés : ${cre(Z0)} + ${cim(Z0)} + ${cre(T.W_SOMME)} − ${Math.abs(cim(T.W_SOMME))} = ${cre(T.SOMME.tout)}. Les réels s’ajoutent entre eux, les imaginaires entre eux.`,`Peut-on additionner ${cre(Z0)} et ${cim(Z0)}${I} en un seul nombre réel ?`]]),
    reveal:[{p:{u:1},d:1600}],apres:{html:`<b>Ajouter <i>w</i>, c’est translater le point par la flèche de <i>w</i>.</b>`}}},
{cle:'produit',beat:3,scene:'plan',d:1,set:PL({zv:0,pts:'',pv:0}),sujet:'multiplier deux complexes',
  text:[`Calculons le produit de ${h(T.PROD.a)} par ${h(T.PROD.b)}.`],
  deriv:[{tex:`(${tx(T.PROD.a)})(${tx(T.PROD.b)})=${T.devTex(T.PROD.a,T.PROD.b)}`,alt:`(${h(T.PROD.a)})(${h(T.PROD.b)}) = ${T.devTxt(T.PROD.a,T.PROD.b)}`,r:'On développe, comme (<i>a</i> + <i>b</i>)(<i>c</i> + <i>d</i>) : quatre termes.'}],
  pari:{label:`La ligne suivante${NNB}?`,
    apres:{tex:[[`=${cre(T.PROD.a)*cre(T.PROD.b)}+${cim(T.PROD.ok)}i+${-cim(T.PROD.a)*cim(T.PROD.b)}=${tx(T.PROD.ok)}`.replace(/\+-/g,'-'),`= ${cre(T.PROD.a)*cre(T.PROD.b)} + ${cim(T.PROD.ok)}${I} + ${-cim(T.PROD.a)*cim(T.PROD.b)} = ${h(T.PROD.ok)}`]],html:'Le résultat est de la forme <i>a</i> + <i>ib</i> : un complexe.'},
    ...VF([
    [h(T.PROD.ok),true,`Oui : ${fr(cim(T.PROD.a)*cim(T.PROD.b),0)}${sup(I,2)} = ${fr(cim(T.PROD.a)*cim(T.PROD.b),0)} × (−1) = ${-cim(T.PROD.a)*cim(T.PROD.b)}, et ${cim(T.PROD.b)*cre(T.PROD.a)}${I} − ${Math.abs(cre(T.PROD.b)*cim(T.PROD.a))}${I} = ${cim(T.PROD.ok)}${I}.`],
    [h(T.PROD.i2plus),false,`Tu as pris ${sup(I,2)} = +1 : ${fr(cim(T.PROD.a)*cim(T.PROD.b),0)}${sup(I,2)} vaudrait ${fr(cim(T.PROD.a)*cim(T.PROD.b),0)}. Or ${sup(I,2)} = −1, donc ${fr(cim(T.PROD.a)*cim(T.PROD.b),0)}${sup(I,2)} = ${-cim(T.PROD.a)*cim(T.PROD.b)}.`,`Que vaut ${sup(I,2)} ? Quel est alors le signe de ${fr(cim(T.PROD.a)*cim(T.PROD.b),0)}${sup(I,2)} ?`],
    [h(T.PROD.terme),false,`Tu as multiplié terme à terme, réel par réel et imaginaire par imaginaire. Il y a quatre termes, pas deux : ${T.devTxt(T.PROD.a,T.PROD.b)}.`,'Combien de termes y a-t-il quand on développe (<i>a</i> + <i>b</i>)(<i>c</i> + <i>d</i>) ?']])}},
{cle:'carre',beat:3,scene:'plan',d:1,set:PL({zv:0}),sujet:'le carré d’un complexe',
  text:['Un carré se développe de la même façon.',{t:`(${h(T.CARRE.z)})² = ?`,fort:true}],
  verifie:{...VF([
    [h(T.CARRE.ok),true,`Oui : (${h(T.CARRE.z)})² = ${sup(cre(T.CARRE.z),2)} + ${2*cre(T.CARRE.z)*cim(T.CARRE.z)}${I} + ${sup(I,2)} = ${cre(T.CARRE.z)**2} + ${2*cre(T.CARRE.z)*cim(T.CARRE.z)}${I} − 1 = ${h(T.CARRE.ok)}.`],
    [h(T.CARRE.somme),false,`Tu as lu (<i>a</i> + <i>b</i>)² comme <i>a</i>² + <i>b</i>². Le double produit ${2*cre(T.CARRE.z)*cim(T.CARRE.z)}${I} manque.`,'Développe (<i>a</i> + <i>b</i>)² : combien de termes obtiens-tu ?'],
    [h(T.CARRE.i2plus),false,`Tu as pris ${sup(I,2)} = +1 : ${cre(T.CARRE.z)**2} + ${2*cre(T.CARRE.z)*cim(T.CARRE.z)}${I} + 1. Or ${sup(I,2)} = −1.`,`Que vaut ${sup(I,2)} : +1 ou −1 ?`]])}},

/* ===== 4. le conjugué ===== */
{cle:'conjugue',beat:4,scene:'plan',d:1,set:PL({zv:1,geste:'miroir',u:0}),seq:[{p:{u:1},d:1800,w:300}],sujet:'le conjugué',
  text:[`Le [[conjugue|conjugué]] de ${Z} = <i>a</i> + <i>ib</i> est ${ZB} = <i>a</i> − <i>ib</i>.`,{t:'Son image est le symétrique de M par rapport à l’axe des réels.',a:0}]},
{cle:'ou-zzbar',beat:4,scene:'plan',d:1,set:PL({vue:0,zv:1,geste:'prod',u:0}),sujet:'z fois son conjugué',
  text:[`Place ${Z} = ${h(Z0)} et son conjugué sur le plan.`,{t:`Le produit ${Z} × ${ZB}, sur le plan, tombe…`,fort:true}],
  pari:{...BET([
    ['n’importe où, selon '+Z,PARI_NOTE],
    ['sur l’axe des imaginaires',PARI_NOTE],
    ['sur l’axe des réels',PARI_NOTE]]),
    reveal:[{p:{vue:1},d:800},{p:{u:0.33},d:900},{p:{u:0.66},d:1600},{p:{u:1},d:1600}],
    apres:{html:`Pour ${lst2(T.ZZBAR_CRANS.map(h))}, le produit ${Z} × ${ZB} tombe <b>sur l’axe des réels, à droite de O</b> : un produit de deux complexes non réels peut être réel.`}}},
{cle:'zzbar',beat:4,scene:'plan',d:1,set:PL({vue:0,zv:1,geste:'prod',u:0}),sujet:'z z̄ = a² + b²',
  text:[`Calculons ${Z} × ${ZB} avec ${Z} = <i>a</i> + <i>ib</i>.`],
  deriv:[{tex:'(a+ib)(a-ib)=a^2-(ib)^2',alt:'(<i>a</i> + <i>ib</i>)(<i>a</i> − <i>ib</i>) = <i>a</i>² − (<i>ib</i>)²',r:'L’identité remarquable (<i>A</i> + <i>B</i>)(<i>A</i> − <i>B</i>) = <i>A</i>² − <i>B</i>².'}],
  pari:{label:`La ligne suivante${NNB}?`,reveal:[{p:{vue:1,pl:1},d:700},{p:{u:0.33},d:900}],
    apres:{tex:[[`z\\bar z=a^2+b^2=${cre(Z0)}^2+${cim(Z0)}^2=${ent(T.ZZBAR_VALEURS[0])}`,`${Z} ${ZB} = <i>a</i>² + <i>b</i>² = ${cre(Z0)}² + ${cim(Z0)}² = ${ent(T.ZZBAR_VALEURS[0])}`]],html:`<b>Un réel positif ou nul</b> : pour ${h(Z0)}, c’est ${ent(T.ZZBAR_VALEURS[0])}, comme sur la figure.`},
    ...VF([
    [M('a^2+b^2','<i>a</i>² + <i>b</i>²'),true,`Oui : (<i>ib</i>)² = ${sup(I,2)}<i>b</i>² = −<i>b</i>², donc <i>a</i>² − (−<i>b</i>²) = <i>a</i>² + <i>b</i>².`],
    [M('a^2-b^2','<i>a</i>² − <i>b</i>²'),false,`Tu as oublié que ${sup(I,2)} = −1 : (<i>ib</i>)² = −<i>b</i>², pas <i>b</i>².`,'Que vaut (<i>ib</i>)² : <i>b</i>² ou autre chose ?'],
    [M('a^2-b^2+2iab','<i>a</i>² − <i>b</i>² + 2<i>iab</i>'),false,`Tu as calculé ${sup(Z,2)}, pas ${Z} × ${ZB}. Dans le second facteur, il y a un signe moins.`,'Le second facteur est <i>a</i> − <i>ib</i> : où est le signe moins ?']])}},
{cle:'z-plus-zbar',beat:4,scene:'plan',d:1,set:PL({zv:1,geste:'miroir',u:1}),sujet:'z + z̄ est réel',
  text:[`Avec ${Z} = <i>a</i> + <i>ib</i>, additionnons ${Z} et son conjugué.`,{t:`${Z} + ${ZB} = ?`,fort:true}],
  pari:{...VF([
    ['2<i>a</i>',true,`Oui : <i>a</i> + <i>ib</i> + <i>a</i> − <i>ib</i> = 2<i>a</i>, un réel : les parties imaginaires s’annulent.`],
    ['2<i>ib</i>',false,`Tu as calculé ${Z} − ${ZB}, où les parties réelles s’annulent. Dans la somme, ce sont les parties imaginaires qui s’annulent.`,`Dans ${Z} + ${ZB}, quelle partie a un signe opposé dans les deux nombres ?`],
    ['0',false,`Tu as pris le conjugué pour l’opposé. L’opposé −${Z} est le symétrique de M par rapport à O ; le conjugué, par rapport à l’axe des réels.`,`${Z} et ${ZB} sont-ils opposés ? Où est le point −${Z} ?`]]),
    apres:{html:`Donc ${Z} est réel si et seulement si ${Z} = ${ZB}, et ${Z} est imaginaire pur si et seulement si ${ZB} = −${Z}.`}}},
{cle:'conj-prop',beat:4,scene:'plan',d:1,set:PL({zv:1,...PZ(T.CONJ_PROP.z),geste:'miroir',u:1}),sujet:'le conjugué d’un produit',
  text:[`Tu as calculé (${h(T.CONJ_PROP.z)})² = ${h(T.CONJ_PROP.carre)}.`,{t:`Alors (${h(cconj(T.CONJ_PROP.z))})² = ?`,fort:true}],
  verifie:{...VF([
    [h(T.CONJ_PROP.ok),true,`Oui : le conjugué d’un produit est le produit des conjugués, donc (${h(cconj(T.CONJ_PROP.z))})² est le conjugué de ${h(T.CONJ_PROP.carre)}.`],
    [h(T.CONJ_PROP.carre),false,`Tu as pensé que le carré efface le signe, comme pour les réels. Recalcule : (${h(cconj(T.CONJ_PROP.z))})² = ${cre(T.CONJ_PROP.z)**2} − ${2*cre(T.CONJ_PROP.z)*cim(T.CONJ_PROP.z)}${I} + ${sup(I,2)} = ${h(T.CONJ_PROP.ok)}.`,`Développe (${h(cconj(T.CONJ_PROP.z))})² : que devient le terme en ${I} ?`],
    [h(T.CONJ_PROP.prod),false,`Tu as calculé (${h(T.CONJ_PROP.z)})(${h(cconj(T.CONJ_PROP.z))}), le produit par le conjugué. Ici, on élève ${h(cconj(T.CONJ_PROP.z))} au carré.`,`Le carré de ${h(cconj(T.CONJ_PROP.z))}, c’est ${h(cconj(T.CONJ_PROP.z))} multiplié par quoi ?`]])}},
{cle:'diviser',beat:4,scene:'plan',d:1,set:PL({zv:1,...PZ(T.DIV.d),geste:'miroir',u:1}),sujet:'diviser par un complexe',
  text:['Pour diviser, on se ramène à un dénominateur réel.',`Calculons ${h(T.DIV.n)} divisé par ${h(T.DIV.d)}.`],
  deriv:[{tex:`\\dfrac{${tx(T.DIV.n)}}{${tx(T.DIV.d)}}=\\dfrac{(${tx(T.DIV.n)})(${tx(T.DIV.cd)})}{(${tx(T.DIV.d)})(${tx(T.DIV.cd)})}`,alt:`(${h(T.DIV.n)}) / (${h(T.DIV.d)}) = (${h(T.DIV.n)})(${h(T.DIV.cd)}) / ((${h(T.DIV.d)})(${h(T.DIV.cd)}))`,r:'On multiplie en haut et en bas par le conjugué du dénominateur : la valeur ne change pas.'},
    {tex:`=\\dfrac{${tx(T.DIV.num)}}{(${tx(T.DIV.d)})(${tx(T.DIV.cd)})}`,alt:`= (${h(T.DIV.num)}) / ((${h(T.DIV.d)})(${h(T.DIV.cd)}))`,r:`Au numérateur : ${T.devTxt(T.DIV.n,T.DIV.cd)} = ${h(T.DIV.num)}.`}],
  pari:{label:`Le dénominateur, puis le résultat${NNB}?`,
    apres:{tex:[[`\\dfrac{${tx(T.DIV.n)}}{${tx(T.DIV.d)}}=${tx(T.DIV.ok)}`,`(${h(T.DIV.n)}) / (${h(T.DIV.d)}) = ${h(T.DIV.ok)}`]]},
    ...VF([
    [`${ent(cre(T.DIV.den))}, donc ${h(T.DIV.ok)}`,true,`Oui : (${h(T.DIV.d)})(${h(T.DIV.cd)}) = ${cre(T.DIV.d)**2} + ${cim(T.DIV.d)**2} = ${ent(cre(T.DIV.den))}, donc le résultat est (${h(T.DIV.num)}) / ${ent(cre(T.DIV.den))}.`],
    [`${fr(cre(T.DIV.denFaux),0)}, donc ${h(T.DIV.faux1)}`,false,`Tu as oublié ${sup(I,2)} : (${h(T.DIV.d)})(${h(T.DIV.cd)}) = ${cre(T.DIV.d)**2} + ${cim(T.DIV.d)**2}, pas ${cre(T.DIV.d)**2} − ${cim(T.DIV.d)**2}. C’est <i>a</i>² + <i>b</i>².`,`Que vaut (<i>a</i> − <i>ib</i>)(<i>a</i> + <i>ib</i>) : <i>a</i>² − <i>b</i>² ou <i>a</i>² + <i>b</i>² ?`],
    [`${ent(cre(T.DIV.den))}, donc (${h(T.DIV.n)}) / ${ent(cre(T.DIV.den))}`,false,`Tu as multiplié seulement le dénominateur par le conjugué. En haut et en bas, sinon la valeur change.`,'Si on multiplie le dénominateur par un nombre, que faut-il faire au numérateur pour garder la même valeur ?']])}},

/* ===== 5. le module et la distance ===== */
{cle:'rappel',beat:5,scene:'plan',d:1,set:PL({zv:1,...PZ(T.RAPPEL.z)}),sujet:'calculer avec i',
  text:['Tu es au milieu de la leçon : c’est le bon moment pour une pause.','Un rappel des parties précédentes :',{t:`${I}(${h(T.RAPPEL.z)}) = ?`,fort:true}],
  verifie:{...VF([
    [h(T.RAPPEL.ok),true,`Oui : ${I} + ${cim(T.RAPPEL.z)}${sup(I,2)} = ${I} − ${cim(T.RAPPEL.z)} = ${h(T.RAPPEL.ok)}.`],
    [h(T.RAPPEL.i2plus),false,`Tu as pris ${sup(I,2)} = +1. Or ${sup(I,2)} = −1, donc ${cim(T.RAPPEL.z)}${sup(I,2)} = −${cim(T.RAPPEL.z)}.`,`Que vaut ${cim(T.RAPPEL.z)}${sup(I,2)} : ${cim(T.RAPPEL.z)} ou −${cim(T.RAPPEL.z)} ?`],
    [h(T.RAPPEL.lu),false,`Tu as lu ${I} × ${cim(T.RAPPEL.z)}${I} comme ${cim(T.RAPPEL.z)}${I}. Mais ${I} × ${cim(T.RAPPEL.z)}${I} = ${cim(T.RAPPEL.z)}${sup(I,2)} = −${cim(T.RAPPEL.z)}.`,`Que vaut ${I} × ${I} ?`]])}},
{cle:'module',beat:5,scene:'plan',d:1,set:PL({zv:1,cercles:'z',cu:0,pts:'z-cercle',pv:0}),seq:[{p:{cu:1},d:2000,w:300},{p:{pv:1},d:800,w:100}],sujet:'le module',
  text:[`Le [[module|module]] de ${Z} = <i>a</i> + <i>ib</i> est |${Z}| = √(<i>a</i>² + <i>b</i>²) = √(${Z} ${ZB}) : c’est la distance OM.`,{t:`Le conjugué, l’opposé et ${IZ} sont sur le même cercle de centre O.`,a:1}]},
{cle:'module-calc',beat:5,scene:'plan',d:1,set:PL({zv:0}),sujet:'calculer un module',
  text:[`Calculons le module de ${h(T.MOD_Q)}.`,{t:`|${h(T.MOD_Q)}| = ?`,fort:true}],
  pari:{...VF([
    [ent(T.MOD_OK),true,`Oui : √((${fr(cre(T.MOD_Q),0)})² + ${cim(T.MOD_Q)}²) = √${ent(T.MOD_CARRE)} = ${ent(T.MOD_OK)}.`],
    [ent(T.MOD_LIN),false,`Tu as additionné les valeurs absolues, ${Math.abs(cre(T.MOD_Q))} + ${cim(T.MOD_Q)}. Le module est une racine de somme de carrés, comme dans le théorème de Pythagore.`,`Dans le triangle rectangle de côtés ${Math.abs(cre(T.MOD_Q))} et ${cim(T.MOD_Q)}, que mesure l’hypoténuse ?`],
    [ent(T.MOD_CARRE),false,`Tu as oublié la racine : ${ent(T.MOD_CARRE)} est <i>a</i>² + <i>b</i>². Le module est √${ent(T.MOD_CARRE)}.`,`${ent(T.MOD_CARRE)} est-il le module, ou le carré du module ?`]])}},
{cle:'module-somme',beat:5,scene:'plan',d:1,set:PL({pts:'tri',pv:1}),sujet:'le module d’une somme',
  text:[`Prenons ${Z} = ${h(T.MSOMME.z)} et <i>w</i> = ${h(T.MSOMME.w)}.`,{t:`Que valent |${Z} + <i>w</i>| et |${Z}| + |<i>w</i>| ?`,fort:true}],
  pari:{...VF([
    [`${ent(T.MSOMME_VALEURS.somme)} et ${ent(T.MSOMME_VALEURS.parties)}`,true,`Oui : |${h(T.MSOMME.s)}| = √${ent(T.MSOMME_VALEURS.carre)} = ${ent(T.MSOMME_VALEURS.somme)}, alors que |${h(T.MSOMME.z)}| + |${h(T.MSOMME.w)}| = ${ent(T.MSOMME_VALEURS.parties)}. Dans le triangle, un côté est plus court que la somme des deux autres.`],
    [`${ent(T.MSOMME_VALEURS.parties)} et ${ent(T.MSOMME_VALEURS.parties)}`,false,`Tu as traité le module comme une valeur absolue : le module d’une somme n’est pas la somme des modules. |${h(T.MSOMME.s)}| = √${ent(T.MSOMME_VALEURS.carre)}.`,`Dans le triangle de la figure, un côté peut-il égaler la somme des deux autres ?`],
    [`${ent(T.MSOMME_VALEURS.carre)} et ${ent(T.MSOMME_VALEURS.parties)}`,false,`Tu as oublié la racine pour |${h(T.MSOMME.s)}| : ${ent(T.MSOMME_VALEURS.carre)} est le carré du module.`,`${ent(T.MSOMME_VALEURS.carre)} est-il le module, ou son carré ?`]]),
    apres:{html:`Pour un produit, en revanche, |${Z}<i>w</i>| = |${Z}| × |<i>w</i>|.`}}},
{cle:'distance',beat:5,scene:'plan',d:1,set:PL({ab:1,su:0}),sujet:'la distance AB',
  text:[`Dans le plan, A a pour affixe ${h(T.AB.a)} et B a pour affixe ${h(T.AB.b)}.`,{t:'AB = ?',fort:true}],
  pari:{...VF([
    [T.AB_TEX.ok,true,`Oui : ${Zs('B')} − ${Zs('A')} = ${h(T.AB.diff)}, et |${h(T.AB.diff)}| = √${ent(T.qnum(T.cmod2(T.AB.diff)))} = ${T.AB_TEX.ok}.`],
    [T.AB_TEX.ob,false,`Tu as calculé OB = |${Zs('B')}|, la distance de B à l’origine. AB est la distance de A à B : il faut la différence ${Zs('B')} − ${Zs('A')}.`,`|${Zs('B')}| mesure la distance de B à quel point ?`],
    [ent(T.AB_VALEURS.somme),false,`Tu as additionné les valeurs absolues de ${fr(cre(T.AB.diff),0)} et ${fr(cim(T.AB.diff),0)}. Le module est une racine de somme de carrés.`,`Dans le triangle rectangle de côtés ${Math.abs(cre(T.AB.diff))} et ${Math.abs(cim(T.AB.diff))}, que mesure l’hypoténuse ?`]]),
    reveal:[{p:{su:1},d:1500}],
    apres:{tex:[[`AB=|z_B-z_A|=|${tx(T.AB.diff)}|=${T.AB_TEX.ok}`,`AB = |${Zs('B')} − ${Zs('A')}| = |${h(T.AB.diff)}| = ${T.AB_TEX.ok}`]]}}},
{cle:'cercle',beat:5,scene:'plan',d:1,set:PL({cercles:'m2',cu:0}),sujet:'|z − a| = r est un cercle',
  text:['Une équation sur un module décrit un ensemble de points M d’affixe '+Z+'.',{t:`Les points tels que |${Z} + ${-cre(T.CERCLE_Q.centre)}| = ${T.CERCLE_Q.r} forment…`,fort:true}],
  pari:{...VF([
    [`le cercle de centre le point d’affixe ${fr(cre(T.CERCLE_Q.centre),0)} et de rayon ${T.CERCLE_Q.r}`,true,`Oui : |${Z} + ${-cre(T.CERCLE_Q.centre)}| = |${Z} − (${fr(cre(T.CERCLE_Q.centre),0)})| est la distance de M au point d’affixe ${fr(cre(T.CERCLE_Q.centre),0)}.`],
    [`le cercle de centre le point d’affixe ${fr(cre(T.CERCLE_FAUX.centre),0)} et de rayon ${T.CERCLE_Q.r}`,false,`Tu as lu |${Z} + ${-cre(T.CERCLE_Q.centre)}| comme |${Z} − ${-cre(T.CERCLE_Q.centre)}|. Or |${Z} + ${-cre(T.CERCLE_Q.centre)}| = |${Z} − (${fr(cre(T.CERCLE_Q.centre),0)})| : le centre a pour affixe ${fr(cre(T.CERCLE_Q.centre),0)}.`,`Écris |${Z} + ${-cre(T.CERCLE_Q.centre)}| sous la forme |${Z} − <i>a</i>| : que vaut <i>a</i> ?`],
    [`le cercle de centre O et de rayon ${T.CERCLE_Q.r}`,false,`Tu as lu |${Z} + ${-cre(T.CERCLE_Q.centre)}| comme |${Z}| + ${-cre(T.CERCLE_Q.centre)}. Le module d’une somme n’est pas la somme des modules : |${Z} + ${-cre(T.CERCLE_Q.centre)}| est la distance de M à un point fixe.`,`|${Z} − <i>a</i>| est la distance de M à quel point ?`]]),
    reveal:[{p:{cu:1,pts:'m2',pv:1},d:2000}],
    apres:{html:'Ce cercle revient au bac.'}}},

/* ===== 6. le second degré ===== */
{cle:'somme-carres',beat:6,scene:'plan',d:1,set:PL({}),sujet:'une somme de deux carrés se factorise dans ℂ',
  text:[`Dans ℝ, ${sup('<i>x</i>',2)} + ${T.SOMME_CARRES} ne se factorise pas.`,{t:'Et dans ℂ ?',fort:true}],
  pari:{...VF([
    [`(<i>x</i> + ${T.SC_RAC}${I})(<i>x</i> − ${T.SC_RAC}${I})`,true,`Oui : (<i>a</i> + <i>ib</i>)(<i>a</i> − <i>ib</i>) = <i>a</i>² + <i>b</i>², avec <i>a</i> = <i>x</i> et <i>b</i> = ${T.SC_RAC}.`],
    [`(<i>x</i> + ${T.SC_RAC})²`,false,`Tu as oublié le double produit : (<i>x</i> + ${T.SC_RAC})² = <i>x</i>² + ${T.SC_DOUBLE}<i>x</i> + ${T.SOMME_CARRES}.`,`Développe (<i>x</i> + ${T.SC_RAC})² : obtiens-tu <i>x</i>² + ${T.SOMME_CARRES} ?`],
    ['elle reste non factorisable',false,`Tu as gardé la réponse de ℝ. L’égalité ${Z} × ${ZB} = <i>a</i>² + <i>b</i>², lue à l’envers, factorise une somme de deux carrés.`,`Dans (<i>a</i> + <i>ib</i>)(<i>a</i> − <i>ib</i>) = <i>a</i>² + <i>b</i>², quelles valeurs de <i>a</i> et <i>b</i> donnent <i>x</i>² + ${T.SOMME_CARRES} ?`]])}},
{cle:'x2-moins',beat:6,scene:'plan',d:1,set:PL({}),sujet:'les solutions de z² = −c',
  text:['Cherchons les nombres dont le carré est négatif.',{t:`Les solutions de ${sup(Z,2)} = −${T.X2M} sont…`,fort:true}],
  pari:{...VF([
    [`${T.X2M_RAC}${I} et −${T.X2M_RAC}${I}`,true,`Oui : (${T.X2M_RAC}${I})² = ${T.X2M_RAC**2}${sup(I,2)} = −${T.X2M}, et (−${T.X2M_RAC}${I})² aussi.`],
    [`−${T.X2M_RAC}`,false,`Tu as pris −${T.X2M_RAC} : mais (−${T.X2M_RAC})² = ${T.X2M}, pas −${T.X2M}. Le carré d’un réel n’est jamais négatif.`,`Calcule (−${T.X2M_RAC})² : obtiens-tu −${T.X2M} ?`],
    [`${T.X2M_RAC}${I} seulement`,false,`Tu as oublié −${T.X2M_RAC}${I} : (−${T.X2M_RAC}${I})² = (−${T.X2M_RAC})² × ${sup(I,2)} = −${T.X2M} aussi. Une équation ${sup(Z,2)} = <i>c</i> a deux solutions opposées.`,`Si ${T.X2M_RAC}${I} est solution, quel autre nombre a le même carré ?`]])}},
{cle:'canonique',beat:6,scene:'plan',d:1,set:PL({}),sujet:'résoudre par la forme canonique',
  text:[`Reprenons l’équation du début : ${D2(SAV.a,SAV.b,SAV.c,'z')} = 0, de discriminant ${fr(T.SAV_DELTA,0)}.`],
  deriv:[{tex:`z^2-2z+5=(z-${T.CANON_H})^2+${T.CANON_K}`,alt:`${D2(SAV.a,SAV.b,SAV.c,'z')} = (${Z} − ${T.CANON_H})² + ${T.CANON_K}`,r:'La [[canonique|forme canonique]].'},
    {tex:`=(z-${T.CANON_H})^2-(${T.CANON_M}i)^2`,alt:`= (${Z} − ${T.CANON_H})² − (${T.CANON_M}${I})²`,r:`${T.CANON_K} = −(${T.CANON_M}${I})², car (${T.CANON_M}${I})² = −${T.CANON_K}.`}],
  pari:{label:`Donc les solutions${NNB}?`,
    apres:{html:`<b>Dans ℂ, Δ &lt; 0 n’est plus un mur.</b>`},
    ...VF([
    [lst(CD.map(h)),true,`Oui : (${Z} − ${T.CANON_H})² = (${T.CANON_M}${I})² donne ${Z} − ${T.CANON_H} = ${T.CANON_M}${I} ou ${Z} − ${T.CANON_H} = −${T.CANON_M}${I}.`],
    ['aucune solution',false,`Tu as conclu comme dans ℝ : Δ &lt; 0, aucune solution. Dans ℂ, −${T.CANON_K} est le carré de ${T.CANON_M}${I} : le mur de ℝ tombe.`,`Dans la deuxième ligne, quel nombre au carré donne −${T.CANON_K} ?`],
    [lst(T.CANON_FAUX.map(h)),false,`Tu as perdu le signe de ${Z} − ${T.CANON_H} : ${Z} − ${T.CANON_H} = ±${T.CANON_M}${I} donne ${Z} = ${T.CANON_H} ± ${T.CANON_M}${I}, pas ${fr(-T.CANON_H,0)} ± ${T.CANON_M}${I}.`,`Si ${Z} − ${T.CANON_H} = ${T.CANON_M}${I}, que vaut ${Z} ?`]])}},
{cle:'formule-delta',beat:6,scene:'plan',d:1,set:PL({}),sujet:'la formule du second degré dans ℂ',
  text:[`Si <i>a</i>, <i>b</i>, <i>c</i> sont réels et [[discriminant|Δ]] = <i>b</i>² − 4<i>ac</i> &lt; 0, les solutions de <i>az</i>² + <i>bz</i> + <i>c</i> = 0 sont :`],
  tex:[['z=\\dfrac{-b\\pm i\\sqrt{-\\Delta}}{2a}','<i>z</i> = (−<i>b</i> ± <i>i</i>√(−Δ)) / (2<i>a</i>)']],
  html:()=>`<div class="dit"><p class="say" data-a="-1">${ty('On écrit √(−Δ) avec −Δ &gt; 0 : c’est la racine d’un nombre positif. Si Δ = 0, la solution est double ; si Δ &gt; 0, ce sont celles de ℝ.')}</p></div>`},
{cle:'conjuguees',beat:6,scene:'plan',d:1,set:PL({zv:0,...PZ(CD[0]),geste:'miroir',u:0}),sujet:'les deux solutions sont conjuguées',
  text:[`L’équation ${D2(SAV.a,SAV.b,SAV.c,'z')} = 0 a pour solutions ${lst(CD.map(h))}.`,{t:'Sur le plan, ces deux points sont…',fort:true}],
  pari:{...BET([
    ['symétriques par rapport à O',`Tu as pensé à un demi-tour : le symétrique de ${h(CD[0])} par rapport à O est ${h(T.CONJ_OPPOSE)}. Regarde la figure.`],
    ['symétriques par rapport à l’axe des réels',`Ton pari : ${h(CD[1])} est le conjugué de ${h(CD[0])}. Regarde la figure.`],
    ['sans lien entre eux','Tu as pensé que les deux solutions sont indépendantes. Regarde la figure.']]),
    reveal:[{p:{zv:1,u:1},d:1500}],
    apres:{html:`Coefficients réels : si ${Zs('0')} est solution, son conjugué l’est aussi.`}}},
{cle:'bicarree',beat:6,scene:'plan',d:1,set:PL({}),sujet:'les équations qui se ramènent au second degré',
  text:[`Une équation [[bicarree|bicarrée]] se ramène au second degré : ${sup(Z,4)} + ${T.BICARREE.b}${sup(Z,2)} + ${T.BICARREE.c} = 0.`,`On pose <i>Z</i> = ${sup(Z,2)} : <i>Z</i>² + ${T.BICARREE.b}<i>Z</i> + ${T.BICARREE.c} = 0, donc <i>Z</i> = ${fr(T.BI_Z[0],0)} ou <i>Z</i> = ${fr(T.BI_Z[1],0)}.`,{t:`Quelles sont les solutions en ${Z} ?`,fort:true}],
  pari:{...VF([
    [lst2([ci,cneg(ci),C(0,T.BI_RAC[1]),C(0,-T.BI_RAC[1])].map(h)),true,`Oui : ${sup(Z,2)} = ${fr(T.BI_Z[0],0)} donne ±${I}, et ${sup(Z,2)} = ${fr(T.BI_Z[1],0)} donne ±${T.BI_RAC[1]}${I} : quatre solutions.`],
    [lst(T.BI_Z.map(v=>fr(v,0))),false,`Tu as donné les solutions en <i>Z</i>. L’inconnue de départ est ${Z} : il reste à résoudre ${sup(Z,2)} = <i>Z</i>.`,`<i>Z</i> était un changement d’inconnue : que vaut ${Z} quand ${sup(Z,2)} = ${fr(T.BI_Z[0],0)} ?`],
    [lst([ci,C(0,T.BI_RAC[1])].map(h)),false,`Tu as pris une seule racine pour chaque <i>Z</i>. ${sup(Z,2)} = <i>Z</i> a deux solutions opposées, donc quatre solutions au total.`,`Si ${I} est solution de ${sup(Z,2)} = ${fr(T.BI_Z[0],0)}, quel autre nombre l’est aussi ?`]])}},

/* ===== 7. filière SM : coefficients complexes ===== */
{cle:'sm-signe',beat:7,scene:'plan',d:1,set:PL({}),sujet:'on ne compare pas des complexes',
  text:['Filière SM. En PC et SVT, ce n’est pas à ton programme.',`Quand les coefficients sont complexes, Δ peut ne plus être réel : on cherche alors δ tel que δ² = Δ.`,{t:`Δ = ${h(T.SM_DELTA)}. Que dire de « Δ &lt; 0 » ?`,fort:true}],
  html:()=>`<button type="button" class="lg-saut" data-aller="retour-cube">Passer à la suite →</button>`,
  pari:{...VF([
    ['elle n’a pas de sens : on ne compare pas des complexes',true,`Oui : ℂ n’est pas ordonné. La seule question est « Δ = 0 ou non ? ».`],
    ['elle est vraie, à cause du signe moins',false,`Tu as discuté le signe d’un Δ non réel. ${h(T.SM_DELTA)} n’est ni positif ni négatif : seule compte la question Δ = 0 ou non.`,'Un imaginaire pur est-il à gauche ou à droite de 0 sur une droite ?'],
    ['elle est fausse, car un imaginaire pur est positif',false,`Tu as rangé ${I} parmi les positifs. Si ${I} &gt; 0, alors ${sup(I,2)} &gt; 0 ; si ${I} &lt; 0, aussi : or ${sup(I,2)} = ${fr(cre(T.SM_I2),0)}.`,`Si ${I} &gt; 0, le produit ${I} × ${I} est-il positif ? Que vaut ${sup(I,2)} ?`]])}},
{cle:'sm-delta',beat:7,scene:'plan',d:1,set:PL({}),sujet:'chercher δ tel que δ² = Δ',
  text:[`Cherchons une racine carrée de Δ = ${h(T.SM_D)} : δ = <i>x</i> + <i>iy</i>, avec <i>x</i> et <i>y</i> réels.`],
  deriv:[{tex:`x^2-y^2=${cre(T.SM_D)}\\quad\\text{et}\\quad 2xy=${cim(T.SM_D)}`,alt:`<i>x</i>² − <i>y</i>² = ${cre(T.SM_D)} et 2<i>xy</i> = ${cim(T.SM_D)}`,r:'δ² = <i>x</i>² − <i>y</i>² + 2<i>ixy</i> : on égale les parties réelles et les parties imaginaires, comme pour deux complexes égaux.'},
    {tex:`x^2+y^2=|\\Delta|=${T.SM_MOD}`,alt:`<i>x</i>² + <i>y</i>² = |Δ| = ${T.SM_MOD}`,r:'Les modules sont égaux : |δ|² = |Δ|.'}],
  pari:{label:`Donc une valeur de δ est${NNB}…`,
    apres:{tex:[[`\\delta=${tx(T.SM_DL)}\\quad\\text{ou}\\quad\\delta=${tx(cneg(T.SM_DL))}`,`δ = ${h(T.SM_DL)} ou δ = ${h(cneg(T.SM_DL))}`]],html:`Vérification : (${h(T.SM_DL)})² = ${h(cmul(T.SM_DL,T.SM_DL))}.`},
    ...VF([
    [h(T.SM_DL),true,`Oui : en additionnant, 2<i>x</i>² = ${2*T.SM_X2}, donc <i>x</i> = ±${Math.sqrt(T.SM_X2)} ; puis <i>y</i>² = ${T.SM_Y2}. Comme 2<i>xy</i> = ${cim(T.SM_D)} &gt; 0, <i>x</i> et <i>y</i> ont le même signe.`],
    [h(T.SM_SIGNE),false,`Tu as perdu le signe de <i>xy</i> : 2<i>xy</i> = ${cim(T.SM_D)} &gt; 0, donc <i>x</i> et <i>y</i> ont le même signe. (${h(T.SM_SIGNE)})² = ${h(T.SM_SIGNE_CARRE)}.`,`Si 2<i>xy</i> = ${cim(T.SM_D)}, <i>x</i> et <i>y</i> ont-ils le même signe ou des signes opposés ?`],
    [`√${T.SM_PARTIES.x2} + ${T.SM_PARTIES.y}${I}`,false,`Tu as pris la racine partie par partie. (√${T.SM_PARTIES.x2} + ${T.SM_PARTIES.y}${I})² = ${fr(T.SM_PARTIES_CARRE.re,0)} + ${T.SM_PARTIES_CARRE.im}√${T.SM_PARTIES.x2} ${I}, pas ${h(T.SM_D)}.`,`Développe (√${T.SM_PARTIES.x2} + ${T.SM_PARTIES.y}${I})² : retrouves-tu ${h(T.SM_D)} ?`]])}},
{cle:'sm-resoudre',beat:7,scene:'plan',d:1,set:PL({}),sujet:'résoudre à coefficients complexes',
  text:[`Les coefficients sont complexes : ${sup(Z,2)} − (${h(cneg(T.SM_EQ.b))})${Z} + ${h(T.SM_EQ.c)} = 0.`,`On a Δ = ${h(T.SM_SOL.delta)} = (${h(T.SM_SOL.dl)})².`,{t:'Quelles sont les solutions ?',fort:true}],
  pari:{...VF([
    [lst(T.SM_ROUTE.map(h)),true,`Oui : ${Z} = ((${h(cneg(T.SM_EQ.b))}) ± (${h(T.SM_SOL.dl)})) / 2 donne ${h(cadd(cneg(T.SM_EQ.b),T.SM_SOL.dl))} / 2 = ${h(T.SM_ROUTE[0])} et ${h(T.csub(cneg(T.SM_EQ.b),T.SM_SOL.dl))} / 2 = ${h(T.SM_ROUTE[1])}.`],
    [lst(T.SM_CONJ.map(h)),false,`Tu as cherché des racines conjuguées par réflexe. Elles ne le sont que si les coefficients sont réels : ici ils ne le sont pas.`,`Les coefficients de cette équation sont-ils tous réels ?`],
    [lst(T.SM_FAUX_Z.map(h)),false,`Tu as pris δ = ${h(T.SM_FAUX_DL)}, dont le carré vaut ${h(T.SM_FAUX_DL_CARRE)}, pas ${h(T.SM_SOL.delta)}. Vérifie δ² avant de l’employer.`,`Calcule (${h(T.SM_FAUX_DL)})² : obtiens-tu ${h(T.SM_SOL.delta)} ?`]])}},
{cle:'sm-somme-produit',beat:7,scene:'plan',d:1,set:PL({}),sujet:'somme et produit des racines',
  text:['Sciences mathématiques, 2024, session normale, exercice 3, partie I, question 2 (0,5 point).',`${Zs('1')} et ${Zs('2')} sont les solutions de ${sup(Z,2)} − ${cim(T.SM_VIETE.somme)}${I}${Z} + α = 0, donc ${sup(Z,2)} − ${cim(T.SM_VIETE.somme)}${I}${Z} + α = (${Z} − ${Zs('1')})(${Z} − ${Zs('2')}).`,{t:`Que valent ${Zs('1')} + ${Zs('2')} et ${Zs('1')}${Zs('2')} ?`,fort:true}],
  verifie:{...VF([
    [`${h(T.SM_VIETE.somme)} et α`,true,`Oui : on développe (${Z} − ${Zs('1')})(${Z} − ${Zs('2')}) = ${sup(Z,2)} − (${Zs('1')} + ${Zs('2')})${Z} + ${Zs('1')}${Zs('2')}, puis on compare les coefficients.`],
    [`${h(cneg(T.SM_VIETE.somme))} et α`,false,`Tu as lu la somme comme <i>b</i>/<i>a</i> au lieu de −<i>b</i>/<i>a</i>. Ici <i>b</i> = ${h(T.SM_VIETE.b)}. Contrôle sur ${D2(1,-3,2,'z')} = 0, de racines 1 et 2 : la somme vaut 3.`,`Contrôle sur ${D2(1,-3,2,'z')} = 0 : quelle est la somme des racines 1 et 2 ? Quel est le signe de <i>b</i> ?`],
    [`α et ${h(T.SM_VIETE.somme)}`,false,`Tu as échangé la somme et le produit. Le terme constant α est le produit ; le coefficient de ${Z} donne la somme.`,`Quel coefficient du trinôme est le terme constant : celui de ${Z} ou celui sans ${Z} ?`]])}},

/* ===== 8. retour à l'énigme ===== */
{cle:'retour-cube',beat:8,scene:'plan',d:1,set:PL({pts:'cube',pv:1}),sujet:'le cube de 2 + i',
  text:[`Retour à l’énigme. Essayons le nombre ${h(T.CUBE.z)}, dont tu as calculé le carré.`],
  deriv:[{tex:`(${tx(T.CUBE.z)})^2=${tx(T.CUBE.z2)}`,alt:`(${h(T.CUBE.z)})² = ${h(T.CUBE.z2)}`,r:'Le carré calculé plus haut.'},
    {tex:`(${tx(T.CUBE.z)})^3=(${tx(T.CUBE.z2)})(${tx(T.CUBE.z)})=${T.CUBE.dev}`,alt:`(${h(T.CUBE.z)})³ = (${h(T.CUBE.z2)})(${h(T.CUBE.z)}) = ${T.CUBE.devTxt}`,r:'On développe : quatre termes.'}],
  pari:{label:`Donc (${h(T.CUBE.z)})³ = ?`,
    apres:{html:`Et (${T.CUBE.onze}${I})² = ${fr(T.CUBE.onze2,0)} : on note ${T.CUBE.onze}${I} = √${fr(T.CUBE.onze2,0)}. <b>${h(T.CUBE.z)} est donc un nombre dont le cube vaut ${cre(T.CUBE.z3)} + √${fr(T.CUBE.onze2,0)}.</b>`},
    ...VF([
    [h(T.CUBE.z3),true,`Oui : ${cim(T.CUBE.z2)}${sup(I,2)} = −${cim(T.CUBE.z2)}, donc ${cre(T.CUBE.z2)*cre(T.CUBE.z)} − ${cim(T.CUBE.z2)} = ${cre(T.CUBE.z3)}, et ${cre(T.CUBE.z2)*cim(T.CUBE.z)}${I} + ${cim(T.CUBE.z2)*cre(T.CUBE.z)}${I} = ${cim(T.CUBE.z3)}${I}.`],
    [h(T.CUBE.i2plus),false,`Tu as pris ${sup(I,2)} = +1 : ${cre(T.CUBE.z2)*cre(T.CUBE.z)} + ${cim(T.CUBE.z2)}. Or ${cim(T.CUBE.z2)}${sup(I,2)} = −${cim(T.CUBE.z2)}.`,`Que vaut ${cim(T.CUBE.z2)}${sup(I,2)} : +${cim(T.CUBE.z2)} ou −${cim(T.CUBE.z2)} ?`],
    [h(T.CUBE.sans),false,`Tu as oublié le terme ${cim(T.CUBE.z2)}${sup(I,2)} : il y a quatre termes, et le dernier retire ${cim(T.CUBE.z2)} au réel.`,'Combien de termes y a-t-il dans le développement de (<i>a</i> + <i>ib</i>)(<i>c</i> + <i>id</i>) ?']])}},
{cle:'retour-conj',beat:8,scene:'plan',d:1,set:PL({pts:'cube2',pv:1}),sujet:'le conjugué d’un cube',
  text:[`La formule contient aussi un nombre de la forme ${h(cconj(T.CUBE.z))}.`,{t:`(${h(cconj(T.CUBE.z))})³ = ?, sans développer.`,fort:true}],
  pari:{...VF([
    [h(T.CUBE.conj),true,`Oui : le conjugué d’un produit est le produit des conjugués, donc (${h(cconj(T.CUBE.z))})³ est le conjugué de ${h(T.CUBE.z3)}.`],
    [h(T.CONJ_FAUX.meme),false,`Tu as lu le cube comme s’il effaçait le signe. (${h(cconj(T.CUBE.z))})³ est le conjugué de (${h(T.CUBE.z)})³ : la partie imaginaire change de signe.`,`(${h(cconj(T.CUBE.z))})³ est le conjugué de quel nombre ?`],
    [h(T.CONJ_FAUX.oppose),false,`Tu as pris le conjugué pour l’opposé. Le conjugué change le signe de la partie imaginaire seulement, pas celui de la partie réelle.`,`Le conjugué de ${h(T.CUBE.z3)} : quelle partie change de signe ?`]])}},
{cle:'retour-somme',beat:8,scene:'plan',d:1,set:PL({pts:'cube2',pv:1}),sujet:'z + z̄ ramène au réel',
  text:[`La formule additionne deux nombres : ${h(T.CUBE.z)} et ${h(cconj(T.CUBE.z))}.`,{t:`(${h(T.CUBE.z)}) + (${h(cconj(T.CUBE.z))}) = ?`,fort:true}],
  pari:{...VF([
    [ent(cre(T.CUBE_SOMME.somme)),true,`Oui : les parties imaginaires s’annulent, et il reste ${cre(T.CUBE.z)} + ${cre(T.CUBE.z)} = ${ent(cre(T.CUBE_SOMME.somme))}, soit 2 Re(${Z}).`],
    [h(T.CUBE_SOMME.parties),false,`Tu as ajouté les parties imaginaires sans leur signe. ${I} et −${I} s’annulent : ${Z} + ${ZB} = 2 Re(${Z}).`,`Que vaut ${I} + (−${I}) ?`],
    [h(T.CUBE_SOMME.diff),false,`Tu as calculé la différence ${Z} − ${ZB}. Dans la somme, ce sont les parties imaginaires qui s’annulent.`,`Dans une somme de deux conjugués, quelle partie disparaît ?`]]),
    reveal:[{p:{pts:'cube3'},d:900}],
    apres:{get html(){const r=ctx.rep('fausse');return `${r===0?`Ton pari était juste : la formule donne ${ent(cre(T.CUBE_SOMME.somme))}, en osant calculer avec √−${T.CARDAN_MOINS}.`:r===1?`Tu avais parié que la formule est fausse : elle ne l’est pas, elle donne ${ent(cre(T.CUBE_SOMME.somme))}.`:r===2?`Tu avais parié sur une autre solution, non réelle : la formule donne ${ent(cre(T.CUBE_SOMME.somme))}, une solution réelle.`:`La formule donne ${ent(cre(T.CUBE_SOMME.somme))}.`}<details class="detail"><summary>Pour aller plus loin</summary>Un complexe a trois racines cubiques ; la formule demande de les apparier : ici (${h(T.CUBE.z)})(${h(cconj(T.CUBE.z))}) = ${h(T.CUBE_PRODUIT)} = ${T.CARDAN.p}/3. Hors programme.</details>`;}}}},
{cle:'retour-pourquoi',beat:8,scene:'cardan',set:{cb:1,x4:1,form:1,trois:1,quatre:0},sujet:'pourquoi accepter √−1',
  text:['Un nombre dont le carré est négatif paraissait absurde.',{t:'Pourquoi les mathématiciens ont-ils fini par accepter √−1 ?',fort:true}],
  pari:{...VF([
    [`un calcul avec √−${T.CARDAN_MOINS} donnait une solution réelle, ${T.X4}`,true,`Oui : la formule de Cardan, qui passe par √−${T.CARDAN_MOINS}, donne la solution réelle ${T.X4}. Ces nombres se sont imposés par ce qu’ils permettent de calculer.`],
    [`pour donner enfin une solution à ${sup('<i>x</i>',2)} = −1`,false,`Tu as repris le récit habituel. Une équation sans solution, comme ${sup('<i>x</i>',2)} = −1, n’inquiétait personne : c’est la formule de Cardan, avec sa solution réelle, qui a obligé à regarder √−1.`,`Une équation sans solution réelle est-elle un problème, ou une réponse ? Qu’est-ce qui avait une vraie solution ici ?`],
    ['parce qu’on avait trouvé où les placer, dans un plan',false,`Tu as pris la représentation pour la raison. Le plan a rendu ces nombres visibles, mais c’est le calcul qui les a imposés.`,`Le plan est-il apparu avant ou après qu’on a calculé avec √−1 ?`]]),
    reveal:[{p:{quatre:1},d:900}],
    apres:{html:`<b>Le détour par l’impossible ramène à ${T.X4} : l’énigme est résolue.</b>`}}},

/* ===== 9. au bac ===== */
{cle:'bac',beat:9,scene:'plan',d:1,set:PL({cercles:'bac',cu:1,pts:'bac',pv:1}),sujet:'traduire M ∈ cercle par une distance',
  text:['Sciences expérimentales (SVT et Sciences Physiques), 2022, session normale, exercice 2 (3 points), question 4.',`Le point D a pour affixe ${fr(T.BAC.d,0)} (question 1). M, d’affixe ${Z}, est sur le cercle (Γ) de centre D et de rayon ${T.BAC.r1}, et sur le cercle (Γ′) de centre O et de rayon ${T.BAC.r2}.`,{t:'Premier geste pour la question a) ?',fort:true}],
  html:()=>`<div class="lg-copie"><p>${ty(`<b>4 a)</b> (0,25 point) Vérifier que |${Z} + ${-T.BAC.d}| = ${T.BAC.r1}.`)}</p><p>${ty(`<b>4 b)</b> (0,5) Prouver que ${Z} + ${ZB} = ${fr(T.BAC_S,0)} (remarquer que |${Z}| = ${T.BAC.r2}).`)}</p><p>${ty(`<b>4 c)</b> (0,25) En déduire que (Γ) et (Γ′) se coupent en un seul point.`)}</p></div>`,
  pari:{...BET([
    [`traduire « M ∈ (Γ) » par une distance : |${Z} − <i>d</i>| = ${T.BAC.r1}`,`C’est le bon réflexe : M ∈ (Γ) signifie DM = ${T.BAC.r1}, c’est-à-dire |${Z} − <i>d</i>| = ${T.BAC.r1}.`],
    [`poser ${Z} = <i>x</i> + <i>iy</i> et développer tout de suite`,`Cela aboutit, mais plus longuement : le sujet guide vers ${Z} + ${ZB}. Le bon réflexe traduit d’abord M ∈ (Γ) par une distance.`],
    ['lire le point commun sur la figure','Une figure ne prouve pas l’unicité d’un point. Le bon réflexe traduit M ∈ (Γ) par une distance.']]),
    apres:{tex:[[`M\\in(\\Gamma)\\iff DM=${T.BAC.r1}\\iff |z-d|=${T.BAC.r1}`,`M ∈ (Γ) ⇔ DM = ${T.BAC.r1} ⇔ |${Z} − <i>d</i>| = ${T.BAC.r1}`]]}}},
{cle:'bac-a',beat:9,scene:'plan',d:1,set:PL({cercles:'bac',cu:1,pts:'bac',pv:1}),sujet:'z − d avec d négatif',
  text:[`Avec <i>d</i> = ${fr(T.BAC.d,0)}, on vérifie la question a).`,{t:`Pourquoi |${Z} + ${-T.BAC.d}| = ${T.BAC.r1} ?`,fort:true}],
  pari:{...VF([
    [`DM = |${Z} − (${fr(T.BAC.d,0)})| = |${Z} + ${-T.BAC.d}| et DM = ${T.BAC.r1}`,true,`Oui : ${Z} − <i>d</i> = ${Z} − (${fr(T.BAC.d,0)}) = ${Z} + ${-T.BAC.d}, et DM est le rayon de (Γ), donc DM = ${T.BAC.r1}.`],
    [`|${Z} + ${-T.BAC.d}| = |${Z}| + ${-T.BAC.d} et DM = ${T.BAC.r1}`,false,`Tu as traité le module d’une somme comme une somme de modules. |${Z} + ${-T.BAC.d}| est la distance de M à D, pas |${Z}| + ${-T.BAC.d}.`,`|${Z} + ${-T.BAC.d}| est-il égal à |${Z}| + ${-T.BAC.d} ? Que mesure-t-il ?`],
    [`DM = |${Z} − ${-T.BAC.d}| et DM = ${T.BAC.r1}`,false,`Tu as perdu le signe de <i>d</i> : <i>d</i> = ${fr(T.BAC.d,0)}, donc ${Z} − <i>d</i> = ${Z} + ${-T.BAC.d}, pas ${Z} − ${-T.BAC.d}.`,`Que vaut ${Z} − <i>d</i> quand <i>d</i> = ${fr(T.BAC.d,0)} ?`]])}},
{cle:'bac-b',beat:9,scene:'plan',d:1,set:PL({cercles:'bac',cu:1,pts:'bac',pv:1}),sujet:'|w|² = w × conjugué de w',
  text:[`Question b) : il faut faire apparaître ${Z} + ${ZB}. L’outil : |<i>w</i>|² = <i>w</i> × conjugué de <i>w</i>.`,{t:`On l’applique à <i>w</i> = ${Z} + ${-T.BAC.d}.`,fort:true}],
  deriv:[{tex:`|z+${-T.BAC.d}|^2=${T.BAC.r1}^2=${T.BAC_B.carre}`,alt:`|${Z} + ${-T.BAC.d}|² = ${T.BAC.r1}² = ${T.BAC_B.carre}`,r:'La question a), élevée au carré.'}],
  pari:{label:`La ligne suivante${NNB}?`,
    apres:{tex:[[`|z+${-T.BAC.d}|^2=(z+${-T.BAC.d})(\\bar z+${-T.BAC.d})=z\\bar z+${-T.BAC.d}(z+\\bar z)+${T.BAC_B.carre}`,`|${Z} + ${-T.BAC.d}|² = (${Z} + ${-T.BAC.d})(${ZB} + ${-T.BAC.d}) = ${Z} ${ZB} + ${-T.BAC.d}(${Z} + ${ZB}) + ${T.BAC_B.carre}`],[`${T.BAC_B.carre}=${T.BAC_B.zz}+${-T.BAC.d}(z+\\bar z)+${T.BAC_B.carre}`,`${T.BAC_B.carre} = ${T.BAC_B.zz} + ${-T.BAC.d}(${Z} + ${ZB}) + ${T.BAC_B.carre}`],[`z+\\bar z=${fr(T.BAC_S,0).replace('−','-')}`,`${Z} + ${ZB} = ${fr(T.BAC_S,0)}`]],html:`Avec ${Z} ${ZB} = |${Z}|² = ${T.BAC_B.zz} et |${Z} + ${-T.BAC.d}|² = ${T.BAC_B.carre}, on obtient ${Z} + ${ZB} = ${fr(T.BAC_S,0)}.`},
    ...VF([
    [M(`(z+${-T.BAC.d})(\\bar z+${-T.BAC.d})`,`(${Z} + ${-T.BAC.d})(${ZB} + ${-T.BAC.d})`),true,`Oui : le conjugué de ${Z} + ${-T.BAC.d} est ${ZB} + ${-T.BAC.d}, car ${-T.BAC.d} est réel : son conjugué est lui-même.`],
    [M(`(z+${-T.BAC.d})(\\bar z-${-T.BAC.d})`,`(${Z} + ${-T.BAC.d})(${ZB} − ${-T.BAC.d})`),false,`Tu as appliqué le conjugué au réel ${-T.BAC.d} pour en changer le signe. Un réel est son propre conjugué : le conjugué de ${Z} + ${-T.BAC.d} est ${ZB} + ${-T.BAC.d}.`,`Quel est le conjugué du réel ${-T.BAC.d} ?`],
    [M(`|z|^2+${-T.BAC.d}^2`,`|${Z}|² + ${-T.BAC.d}²`),false,`Tu as appliqué Pythagore à une somme quelconque : |${Z} + ${-T.BAC.d}|² n’est pas |${Z}|² + ${-T.BAC.d}². Les termes ${-T.BAC.d}${Z} et ${-T.BAC.d}${ZB} manquent.`,`Développe (${Z} + ${-T.BAC.d})(${ZB} + ${-T.BAC.d}) : combien de termes obtiens-tu ?`]])}},
{cle:'bac-c',beat:9,scene:'plan',d:1,set:PL({cercles:'bac',cu:1,pts:'bac',pv:1}),sujet:'z + z̄ = 2 Re(z) et |z|² = Re² + Im²',
  text:[`On a ${Z} + ${ZB} = ${fr(T.BAC_S,0)} et |${Z}| = ${T.BAC.r2}.`,{t:`Qu’en déduire pour ${Z} ?`,fort:true}],
  pari:{...VF([
    [`${Z} = ${fr(T.BAC_RE,0)}, car Re(${Z}) = ${fr(T.BAC_RE,0)} et |${Z}| = ${T.BAC.r2}`,true,`Oui : ${Z} + ${ZB} = 2 Re(${Z}) = ${fr(T.BAC_S,0)} donne Re(${Z}) = ${fr(T.BAC_RE,0)}, puis Im(${Z})² = ${T.BAC.r2**2} − ${T.BAC_RE**2} = ${fr(T.BAC_IM2,0)} : ${Z} = ${fr(T.BAC_RE,0)}, un seul point.`],
    [`${Z} = ${fr(T.BAC_C.mauvais,0)}, car ${Z} + ${ZB} vaut ${fr(T.BAC_S,0)}`,false,`Tu as lu ${Z} + ${ZB} comme ${Z}. Or ${Z} + ${ZB} = 2 Re(${Z}) : Re(${Z}) = ${fr(T.BAC_RE,0)}.`,`${Z} + ${ZB} est-il égal à ${Z}, ou à 2 Re(${Z}) ?`],
    [`${Z} = ${fr(T.BAC_RE,0)} ± ${T.BAC_C.im}${I}, car |${Z}| = ${T.BAC.r2}`,false,`Tu as lu |${Z}| = ${T.BAC.r2} comme |Im(${Z})| = ${T.BAC.r2}. Le module vérifie Re(${Z})² + Im(${Z})² = ${T.BAC.r2**2}, avec Re(${Z}) = ${fr(T.BAC_RE,0)}.`,`Quel est le module de ${fr(T.BAC_RE,0)} + ${T.BAC_C.im}${I} : est-ce ${T.BAC.r2} ?`]]),
    reveal:[{p:{pts:'bac3'},d:900}],
    apres:{html:`Les deux cercles se touchent au point d’affixe ${fr(T.BAC_RE,0)} : ils ont un seul point commun.`}}},
{cle:'bac-copie',beat:9,scene:'plan',d:1,set:PL({cercles:'bac',cu:1,pts:'bac3',pv:1}),sujet:'rédiger la fin d’un exercice',
  text:['La rédaction attendue pour la question 4, en trois blocs.','Barème imprimé dans le sujet (Sciences expérimentales, 2022, session normale, exercice 2, question 4) : a) 0,25 ; b) 0,5 ; c) 0,25.'],
  html:()=>`<div class="lg-copie">${[
    `<b>4 a)</b> M appartient à (Γ), de centre D et de rayon ${T.BAC.r1} : ${NW(`DM = ${T.BAC.r1}`)}, soit ${NW(`|${Z} − <i>d</i>| = |${Z} + ${-T.BAC.d}| = ${T.BAC.r1}`)}.`,
    `<b>4 b)</b> ${NW(`|${Z} + ${-T.BAC.d}|² = (${Z} + ${-T.BAC.d})(${ZB} + ${-T.BAC.d}) = ${Z} ${ZB} + ${-T.BAC.d}(${Z} + ${ZB}) + ${T.BAC_B.carre}`)}. Or ${NW(`${Z} ${ZB} = |${Z}|² = ${T.BAC_B.zz}`)} et ${NW(`|${Z} + ${-T.BAC.d}|² = ${T.BAC_B.carre}`)}, donc ${NW(`${T.BAC_B.zz} + ${-T.BAC.d}(${Z} + ${ZB}) + ${T.BAC_B.carre} = ${T.BAC_B.carre}`)} : ${NW(`${Z} + ${ZB} = ${fr(T.BAC_S,0)}`)}.`,
    `<b>4 c)</b> ${NW(`${Z} + ${ZB} = 2 Re(${Z}) = ${fr(T.BAC_S,0)}`)}, donc ${NW(`Re(${Z}) = ${fr(T.BAC_RE,0)}`)}. Alors ${NW(`Im(${Z})² = |${Z}|² − Re(${Z})² = ${T.BAC.r2**2} − ${T.BAC_RE**2} = ${fr(T.BAC_IM2,0)}`)} : <b>${Z} = ${fr(T.BAC_RE,0)}</b>. Les deux cercles ont un seul point commun, d’affixe ${fr(T.BAC_RE,0)}.`].map(l=>`<p>${ctx.ty(l)}</p>`).join('')}</div>`},
{cle:'bac-2',beat:9,scene:'plan',d:1,set:PL({}),sujet:'le discriminant avec a ≠ 1',
  text:['À toi : Sciences expérimentales (SVT et Sciences Physiques), 2018, session normale, exercice 2, question 1 (0,75 point).',`Résoudre ${D2(T.BAC2.a,T.BAC2.b,T.BAC2.c,'z')} = 0.`,{t:'Que vaut Δ ?',fort:true}],
  pari:{...VF([
    [fr(T.BAC2_DELTA,0),true,`Oui : Δ = ${T.BAC2.b}² − 4 × ${T.BAC2.a} × ${T.BAC2.c} = ${T.BAC2.b**2} − ${4*T.BAC2.a*T.BAC2.c} = ${fr(T.BAC2_DELTA,0)}.`],
    [fr(T.BAC2_DELTA_A1,0),false,`Tu as pris <i>a</i> = 1 : ${T.BAC2.b**2} − 4 × 1 × ${T.BAC2.c}. Ici <i>a</i> = ${T.BAC2.a}, donc 4<i>ac</i> = ${4*T.BAC2.a*T.BAC2.c}.`,`Quelle est la valeur de <i>a</i>, le coefficient de ${sup(Z,2)} ?`],
    [ent(T.BAC2_DELTA_SIGNE),false,`Tu as perdu le signe de −4<i>ac</i> : on soustrait 4<i>ac</i> = ${4*T.BAC2.a*T.BAC2.c}, on ne l’ajoute pas.`,`Dans <i>b</i>² − 4<i>ac</i>, que fait-on de 4<i>ac</i> ?`]])}},
{cle:'bac-2-racines',beat:9,scene:'plan',d:1,set:PL({pts:'bac2',pv:0}),sujet:'racines : 2a au dénominateur, −b devant',
  text:[`Avec Δ = ${fr(T.BAC2_DELTA,0)} = (${h(T.BAC2_SOL.dl)})², on termine la question 1.`,{t:'Quelles sont les solutions ?',fort:true}],
  pari:{...VF([
    [lst(T.BAC2_ROUTE.map(h)),true,`Oui : ${Z} = (−${T.BAC2.b} ± ${h(T.BAC2_SOL.dl)}) / ${2*T.BAC2.a} = ${h(T.BAC2_ROUTE[0])} ou ${h(T.BAC2_ROUTE[1])}.`],
    [lst(T.BAC2_DIV2.map(h)),false,`Tu as divisé par 2 au lieu de 2<i>a</i> = ${2*T.BAC2.a}. Le dénominateur est 2<i>a</i>.`,`Quelle est la valeur de 2<i>a</i> pour ${D2(T.BAC2.a,T.BAC2.b,T.BAC2.c,'z')} = 0 ?`],
    [lst(T.BAC2_MOINSB.map(h)),false,`Tu as perdu le signe de −<i>b</i> : <i>b</i> = ${T.BAC2.b}, donc −<i>b</i> = −${T.BAC2.b}.`,`Quel est le signe de −<i>b</i> quand <i>b</i> = ${T.BAC2.b} ?`]]),
    reveal:[{p:{pv:1},d:900}],
    apres:{html:'Barème du sujet : 0,75 point. La question 2 b) du sujet réutilise la solution '+h(T.BAC2_ROUTE[0])+'.'}}},

/* ===== 10. bilan ===== */
{cle:'q1',beat:10,scene:'quiz',set:{qi:0,rv:0},sujet:'la racine d’un négatif',
  text:['Trois pièges des copies, pour finir. Le premier : la racine d’un négatif.',{t:`Que vaut √(−${T.BQ1.n}) ?`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    [`aucun réel ; ${sup(Z,2)} = −${T.BQ1.n} a deux solutions, ±${T.BQ1.rac}${I}`,true,`Oui : √(−${T.BQ1.n}) n’est pas un réel. L’équation ${sup(Z,2)} = −${T.BQ1.n} a deux solutions, ${T.BQ1.rac}${I} et −${T.BQ1.rac}${I}.`],
    [`−${T.BQ1.rac}, car √(−${T.BQ1.n}) = −√${T.BQ1.n}`,false,`Tu as sorti le signe moins de la racine. Mais (−${T.BQ1.rac})² = ${T.BQ1.n}, pas −${T.BQ1.n}.`,`Calcule (−${T.BQ1.rac})² : obtiens-tu −${T.BQ1.n} ?`],
    [`${T.BQ1.rac}${I}, car (${T.BQ1.rac}${I})² = −${T.BQ1.n}, donc √(−${T.BQ1.n}) = ${T.BQ1.rac}${I}`,false,`Tu as pris ${T.BQ1.rac}${I} pour « la » racine carrée. Mais (−${T.BQ1.rac}${I})² = −${T.BQ1.n} aussi : ${sup(Z,2)} = −${T.BQ1.n} a deux solutions, et √(−${T.BQ1.n}) n’est pas défini.`,`Si ${T.BQ1.rac}${I} a pour carré −${T.BQ1.n}, quel autre nombre a le même carré ?`]])}},
{cle:'q2',beat:10,scene:'quiz',set:{qi:1,rv:0},sujet:'le module d’une somme',
  text:['Le deuxième : le module d’une somme.',{t:`Que valent |${h(T.BQ2.a)}| + |${h(T.BQ2.b)}| et |(${h(T.BQ2.a)}) + (${h(T.BQ2.b)})| ?`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    [`${T.BQ2_TOTAL} et ${ent(T.BQ2_SOMME)}`,true,`Oui : |${h(T.BQ2.a)}| = |${h(T.BQ2.b)}| = √${ent(T.qnum(T.cmod2(T.BQ2.a)))}, donc la somme des modules vaut ${T.BQ2_TOTAL} ; et |${ent(cre(T.BQ2.somme))}| = ${ent(T.BQ2_SOMME)}. Le module d’une somme n’est pas la somme des modules.`],
    [`${T.BQ2_TOTAL} et ${T.BQ2_TOTAL}`,false,`Tu as pris le module d’une somme pour la somme des modules. (${h(T.BQ2.a)}) + (${h(T.BQ2.b)}) = ${ent(cre(T.BQ2.somme))}, de module ${ent(T.BQ2_SOMME)}, pas ${T.BQ2_TOTAL}.`,`Que vaut (${h(T.BQ2.a)}) + (${h(T.BQ2.b)}) ? Quel est son module ?`],
    [`${ent(T.BQ2_SANS_RACINE)} et ${ent(T.BQ2_SOMME)}`,false,`Tu as oublié la racine : |${h(T.BQ2.a)}| = √${ent(T.qnum(T.cmod2(T.BQ2.a)))}, pas ${ent(T.qnum(T.cmod2(T.BQ2.a)))}. La somme des modules vaut ${T.BQ2_TOTAL}.`,`${ent(T.qnum(T.cmod2(T.BQ2.a)))} est-il le module de ${h(T.BQ2.a)}, ou son carré ?`]])}},
{cle:'q3',beat:10,scene:'quiz',set:{qi:2,rv:0},sujet:'le second degré avec Δ négatif',
  text:['Le troisième : le second degré.',{t:`${D2(T.BQ3.a,T.BQ3.b,T.BQ3.c,'z')} = 0 : quelles sont les solutions ?`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    [lst([T.BQ3_SOL.z1,T.BQ3_SOL.z2].map(h)),true,`Oui : Δ = ${T.BQ3.b**2} − ${4*T.BQ3.a*T.BQ3.c} = ${fr(T.BQ3_DELTA,0)}, donc ${Z} = (−${T.BQ3.b} ± ${h(T.BQ3_SOL.dl)}) / ${2*T.BQ3.a} = ${h(T.BQ3_SOL.z1)} ou ${h(T.BQ3_SOL.z2)}.`],
    ['aucune solution',false,`Tu as conclu comme dans ℝ. Δ = ${fr(T.BQ3_DELTA,0)} &lt; 0 donne deux solutions conjuguées dans ℂ.`,`Dans ℂ, quel nombre a pour carré ${fr(T.BQ3_DELTA,0)} ?`],
    [lst(T.BQ3_SIGNE.map(h)),false,`Tu as perdu le signe de −<i>b</i> : −<i>b</i> = −${T.BQ3.b}, donc la partie réelle est ${fr(cre(T.BQ3_SOL.z1),0)}.`,`Quel est le signe de −<i>b</i> quand <i>b</i> = ${T.BQ3.b} ?`]])}},
{cle:'fin',beat:10,scene:'end',set:{n:0},seq:[{p:{n:5},d:3000,w:300}],
  text:['Fin de la séance « Forme algébrique et équations ».'],html:()=>profileHTML()}
];

function cpowI(n){return T.cpow(ci,n);}
function lst2(a){return a.slice(0,-1).join(', ')+' et '+a[a.length-1];}

// une inégalité ne commence jamais une ligne : espace insécable devant < et > (le noyau soude
// déjà =, ≤, ≥…, mais pas < et >)
const insec=s=>typeof s==='string'?s.replace(/ (&lt;|&gt;|>)(?= )/g,' $1'):s;
const insecT=v=>typeof v==='function'?()=>insecT(v()):Array.isArray(v)?v.map(insecT):v&&typeof v==='object'&&'t' in v?{...v,t:insec(v.t)}:insec(v);
STEPS.forEach(st=>{st.text=insecT(st.text);const P=st.pari||st.verifie;
  if(P)P.opts.forEach(o=>{o.t=insec(o.t);o.fb=insec(o.fb);if(o.indice)o.indice=insec(o.indice);});
  (st.deriv||[]).forEach(x=>{x.r=insec(x.r);});});

/* ---------- les mots ---------- */
const mots={
  imaginaire:{t:'partie imaginaire, axe des imaginaires',d:'Pour z = a + ib (a et b réels), a est la partie réelle Re(z) et b la partie imaginaire Im(z) : un réel, sans le i. L’axe des imaginaires est l’axe vertical du plan.'},
  image:{t:'image',d:'Le point M(a ; b) du plan qui correspond au complexe z = a + ib.'},
  affixe:{t:'affixe',d:'Le complexe z = a + ib est l’affixe du point M(a ; b) : on dit aussi « le point M d’affixe z ».'},
  conjugue:{t:'conjugué',d:'Le conjugué de z = a + ib est le complexe obtenu en changeant le signe de la partie imaginaire : a − ib. Dans le plan, son image est le symétrique de celle de z par rapport à l’axe des réels.'},
  module:{t:'module',d:'Le module de z = a + ib est le réel positif |z| = √(a² + b²). C’est la distance de l’origine O au point M d’affixe z.'},
  discriminant:{t:'discriminant',d:'Pour az² + bz + c = 0, le discriminant est Δ = b² − 4ac. Son signe décide, dans ℝ, du nombre de solutions réelles.'},
  canonique:{t:'forme canonique',d:'L’écriture az² + bz + c = a[(z + b/(2a))² − Δ/(4a²)]. Pour a = 1 et un b pair, on complète le carré : z² − 2z + 5 = (z − 1)² + 4.'},
  bicarree:{t:'équation bicarrée',d:'Une équation de la forme az⁴ + bz² + c = 0. On pose Z = z² pour se ramener au second degré, puis on revient à z.'}
};
Object.values(mots).forEach(m=>{m.d=insec(m.d);});

/* ---------- la fin de séance ---------- */
function profileHTML(){
  const Q=[['q1','la racine d’un négatif','exercice 8'],['q2','le module d’une somme','exercice 6'],['q3','le second degré avec Δ négatif','exercice 8']];
  const res=Q.map(([k])=>ctx.juste(k));
  const Vs=STEPS.filter(s=>s.verifie),vok=Vs.filter(s=>ctx.juste(s.k)===true).length;
  const r=k=>ctx.rep(k),paris=[];
  if(r('fausse')!=null)paris.push(r('fausse')===0?'tu avais parié que la formule de Cardan donne 4':'la formule qui donne 4 t’a surpris');
  if(r('quart')!=null)paris.push(r('quart')===1?'tu avais vu que 1 quitte la droite':'le quart de tour t’a surpris');
  if(r('fois-i')!=null)paris.push(r('fois-i')===1?'tu avais placé le point de iz au quart de tour':'le quart de tour de z t’a surpris');
  if(r('ou-zzbar')!=null)paris.push(r('ou-zzbar')===2?'tu avais vu que z z̄ est réel':'un produit réel de deux complexes non réels t’a surpris');
  if(r('conjuguees')!=null)paris.push(r('conjuguees')===1?'tu avais vu que les deux solutions sont conjuguées':'les deux solutions conjuguées t’ont surpris');
  const ligne=`« Vérifie » réussies du premier coup : ${vok} sur ${Vs.length}.${paris.length?` Tes paris : ${paris.join(' ; ')}.`:''}`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]} : ${Q[i][2]}</li>`).join('')
    +'<li>· <i>i</i>² = −1 et le produit : exercice 2</li><li>· la partie réelle, la partie imaginaire, l’égalité : exercice 1</li><li>· le quart de tour : exercice 3</li><li>· le conjugué : exercice 4</li><li>· la division : exercice 5</li><li>· le cercle |<i>z</i> − ω| = <i>r</i> : exercice 7</li><li>· le changement d’inconnue : exercice 9</li><li>· en SM : la racine de Δ, les coefficients complexes : exercices 10 et 11</li><li>· au bac : deux cercles : exercice 12</li>';
  const suite=['l’argument et la forme trigonométrique d’un complexe','la forme exponentielle, les formules de Moivre et d’Euler','la rotation, la translation et l’homothétie écrites avec des complexes','distance, alignement, orthogonalité : la géométrie par les complexes'];
  return ty(`<p class="res">${ligne}</p><a class="lien-exos" href="/pilote/complexes/exercices">Faire les exercices →</a>`
    +`<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>`
    +`<div class="next"><div class="pari-k">La prochaine séance : nombres complexes, deuxième partie</div><ol>${suite.map(x=>`<li>${x}</li>`).join('')}</ol></div></details>`);
}

/* ---------- contrôles par étape ---------- */
S.zOk=false;S.zMontre=false;S.zEssais=0;S.zPos=[];S.zDispo=false;
const resetS=()=>{S.zOk=false;S.zMontre=false;S.zEssais=0;S.zPos=[];S.zDispo=false;};
// le test de « Ce qu'il faut savoir », réussi du premier coup : on peut passer le rappel
function majSaut(){const z=root.querySelector('#saut'),st=ctx.etape();if(!z||!st||st.cle!=='savoir')return;
  if(ctx.juste('savoir')===true&&!z.innerHTML)z.innerHTML=`<p class="ctl-note">${ty('Tu connais la règle : tu peux passer le rappel.')}</p><button type="button" class="lg-saut" data-aller="cubique">Passer à l’énigme →</button>`;}
let minuteur=null;
const CTL={
  saut:{html:()=>'<div id="saut"></div>',init(){majSaut();}},
  // z : le curseur de z, six crans ; « Montre-moi » après deux essais ou vingt secondes ; l'étape attend deux crans essayés
  z:{html:()=>`<div class="ctl"><label class="sl"><span>Cran de ${Z} : <output id="oz"></output></span><input id="rz" type="range" min="0" max="${T.CRANS_Z.length-1}" step="1"></label></div><p class="ctl-note" id="zfb"></p><button type="button" class="ctl-btn alt${S.zDispo&&!S.zOk&&!S.zMontre?'':' lg-cache'}" id="montre"${S.zMontre||S.zOk?' disabled hidden':''}>Montre-moi</button>`,
    init(){const sc=scenes.plan,rz=$('#rz'),bt=$('#montre');
      const idx=()=>T.CRANS_Z.findIndex(c=>cre(c)===Math.round(sc.p.zr)&&cim(c)===Math.round(sc.p.zi));
      const dispo=()=>{if(S.zOk||S.zMontre)return;S.zDispo=true;const b=$('#montre');if(b)b.classList.remove('lg-cache');};
      const sync=()=>{const c=T.CRANS_Z[+rz.value];$('#oz').innerHTML=ty(h(c));
        sc.p.t1=`*z* = ${T.S(c)}`;sc.p.t2=`*iz* = ${T.S(cmul(ci,c))}`;sc.p.lv=1;sc.render();
        $('#zfb').innerHTML=ty(S.zOk||S.zMontre?`À chaque cran, ${IZ} est à la même distance de O que ${Z}, à angle droit : (<i>a</i> ; <i>b</i>) devient (−<i>b</i> ; <i>a</i>). <b>Multiplier par ${I}, c’est tourner d’un quart de tour.</b>`:`Fais glisser ${Z} vers un autre cran. Où va ${IZ} ?`);};
      const joue=()=>{ctx.stop();const c=T.CRANS_Z[+rz.value];sc.p.zr=cre(c);sc.p.zi=cim(c);sc.p.u=0;sc.p.eq=1;sc.render();sync();ctx.tween(sc,{u:1},1100);};
      rz.value=Math.max(0,idx());
      rz.addEventListener('input',joue);
      rz.addEventListener('change',()=>{if(S.zOk||S.zMontre)return;const v=+rz.value;if(!S.zPos.includes(v))S.zPos.push(v);S.zEssais++;if(S.zEssais>=2)dispo();if(S.zPos.length>=2){S.zOk=true;bt.disabled=true;bt.hidden=true;ctx.majNav();sync();}});
      bt.addEventListener('click',()=>{if(S.zOk||S.zMontre)return;S.zMontre=true;bt.disabled=true;bt.hidden=true;ctx.majNav();rz.value=2;joue();});
      sync();
      clearTimeout(minuteur);minuteur=setTimeout(()=>{const st=ctx.etape();if(st&&st.cle==='fois-i-curseur')dispo();},20000);}},
};
// « Passer à l'énigme », « Passer à la suite » ; après un choix (clic ou touche), le noyau a rendu la réponse
const surClicL=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');
  if(b&&root.contains(b)){const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0)ctx.aller(i);return;}
  setTimeout(majSaut,0);};
const surToucheL=()=>setTimeout(majSaut,0);
root.addEventListener('click',surClicL);window.addEventListener('keydown',surToucheL);

return {BEATS,STEPS,CTL,mots,profileHTML,
  reset(){resetS();},
  plain:s=>s.replace(/⇔/g,' équivaut à ').replace(/⇒/g,' entraîne ').replace(/Δ/g,' delta ').replace(/δ/g,' delta ').replace(/≤/g,' inférieur ou égal à ').replace(/≥/g,' supérieur ou égal à '),
  demonter(){clearTimeout(minuteur);root.removeEventListener('click',surClicL);window.removeEventListener('keydown',surToucheL);}};
});
}
