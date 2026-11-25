/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Fonction exponentielle », séance 1 « Pourquoi exp » (format v3). Plan d'auteur :
 * docs/refonte/specs/fonction-exponentielle.md ; règles : docs/refonte/07-regles-du-format.md.
 *
 * Douze parties : ce qu'il faut savoir (un test sur ln, qui permet de passer le rappel), l'énigme
 * de Bernoulli (le capital capitalisé de plus en plus souvent), défaire ln (exp est la réciproque
 * de ln), le miroir (domaine et asymptotes lus avant que la courbe de exp soit tracée, puis le
 * pliage), les règles de exp, les équations et inéquations, la dérivée (la pente de exp est sa
 * hauteur), la tangente en 0, le retour à l'énigme (le plafond est e), les limites de base, le bac
 * (une équation commentée, une inéquation, puis un exercice type à faire), puis le bilan.
 * La séance 2 « exp comme fonction » (étude complète, limites habillées, primitives de u′e^u ;
 * en SM, aˣ et xᵃ) est annoncée à la fin.
 *
 * Les scènes vivent dans exponentielle-scenes-{a,b,c}.js, les outils et les nombres dans
 * exponentielle-outils.js ; le déroulé, le panneau, les paris, les fiches et les calculs ligne
 * à ligne dans noyau.js. Aucune valeur numérique affichée n'est tapée à la main : elle sort
 * d'un calcul d'exponentielle-outils.js.
 */
import { monterLecon } from "./noyau";
import {
  fr, ent, M, cap, CRANS, SEUIL_N, SEMESTRE, SEMESTRE_FIN, GAIN_PLAFOND,
  LN2_145, PUISS_2, EXP_MOINS1, LN5, BORNE, SYS_X, SYS_Y, EXP_ECART, E_MOINS_1,
  R1, R2, R_RAPPEL, R_COURSE, A_PT, B_TAN, PENTE_EXP, X_RAPPEL, H_DEBUT, H_FIN, H_PH, X_PH, X_MOINS10, BAC1, P_SOMME, outilsScene, fnHTML,
} from "./exponentielle-outils";
import { scenesA } from "./exponentielle-scenes-a";
import { scenesB } from "./exponentielle-scenes-b";
import { scenesC } from "./exponentielle-scenes-c";
import { scenesD } from "./exponentielle-scenes-d";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,clamp,scenes,hooks,S,defs}=ctx;
const $=ctx.$;
const O=outilsScene(ctx);
const {ty}=O;

// les cadres de découpe des scènes
E('rect',{x:64,y:72,width:836,height:600},E('clipPath',{id:'ex-clip-miroir'},defs));
E('rect',{x:84,y:84,width:832,height:610},E('clipPath',{id:'ex-clip-expo'},defs));
E('rect',{x:70,y:100,width:860,height:550},E('clipPath',{id:'ex-clip-bac'},defs));

// les trois pièges des copies (scène du bilan)
const [PA,PB]=P_SOMME;
const PIEGES=[
  {tag:'Piège 1 sur 3 : la somme',big:`e^{${PA}+${PB}} = ?`,r1:'une somme dans l’exposant',r2:`devient un produit : e^{${PA}} × e^{${PB}} = e^{${PA+PB}}`},
  {tag:'Piège 2 sur 3 : le signe',big:'(*x* − 2) e^{*x*}',r1:'e^{*x*} > 0 pour tout réel *x*',r2:'donc le signe est celui de *x* − 2'},
  {tag:'Piège 3 sur 3 : la dérivée',big:'(e^{−*x*})′ = ?',r1:'(e^{*u*})′ = *u*′ e^{*u*}, avec *u* = −*x*',r2:'donc (e^{−*x*})′ = −e^{−*x*}'}];
scenesA(ctx,O);
scenesB(ctx,O);
scenesC(ctx,O,PIEGES);
scenesD(ctx,O);

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Défaire ln',court:'Défaire'},{name:'Le miroir',court:'Miroir'},{name:'Les règles de exp',court:'Règles'},{name:'Les équations',court:'Équations'},{name:'La dérivée',court:'Dérivée'},{name:'La tangente',court:'Tangente'},{name:'Retour à l’énigme',court:'Retour'},{name:'Les limites',court:'Limites'},{name:'Au bac',court:'Au bac'},{name:'Bilan',court:'Bilan'}
/*__BEATS__*/
];
const BET=t=>({opts:t.map(([x,fb])=>({t:x,fb}))});
// une question : [texte, juste ?, explication, indice (pour une option fausse)]
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>ok?{t:x,ok:true,fb}:{t:x,fb,indice})});
const NW=s=>`<span class="nw">${s}</span>`;
const I0=NW(']0,+∞[');
const PARI_NOTE='Pari noté. Fais l’expérience.';
const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'savoir',beat:0,scene:'savoir',set:{q:1,qr:0,r1:0,r2:0,r3:0},ctl:'saut',sujet:'ln d’une puissance',
  text:['Avant l’énigme, un seul rappel sur ln. Un test : réussi du premier coup, il te permet de passer le rappel.',{t:`Combien vaut ${M('\\ln\\left(e^{2}\\right)','ln(e²)')} ?`,fort:true}],
  verifie:{...VF([
    ['2',true,'Oui : ln(e²) = 2 ln e = 2 × 1. L’exposant descend devant le ln.'],
    ['1',false,'Tu as lu ln(e²) comme (ln e)². Mais l’exposant est dans le ln : il descend devant, et ln(e²) = 2 ln e = 2.','Tu as gardé l’exposant à l’extérieur : (ln e)². Où est-il dans ln(e²) ?'],
    ['e<sup>2</sup>',false,'Tu as supposé que ln ne change rien à une puissance de e. Au contraire, ln compte l’exposant : ln(e²) = 2.','Tu as supposé que ln ne change rien. Que vaut ln e, et combien de facteurs e y a-t-il ?']]),reveal:[{p:{qr:1},d:700}]}},
{cle:'sav-rappel',beat:0,scene:'savoir',set:{q:0,qr:0},seq:[{p:{r1:1},d:700,w:200},{p:{r2:1},d:700,w:600},{p:{r3:1},d:700,w:600}],
  text:['Trois faits sur ln serviront dans toute la séance.',{t:'Un produit devient une somme.',a:0},{t:'ln est strictement croissante, avec ln 1 = 0 et ln e = 1.',a:1},{t:'ln <i>x</i> n’existe que pour <i>x</i> > 0.',a:2}]},

/* ===== 1. l'énigme ===== */
{cle:'bernoulli',beat:1,scene:'interets',tag:'1683',set:{n:1,stair:0,fin:1,ghost:0,plaf:0,courbe:0},seq:[{p:{stair:1},d:1100,w:300}],
  text:['1683. Jacob Bernoulli étudie les [[composes|intérêts composés]] : chaque intérêt versé s’ajoute au capital, et rapporte à son tour.','Prends 1, prêté à 100 % par an.',`Au bout d’un an, le capital vaut ${ent(cap(1))} : un seul versement, une seule marche.`]},
{cle:'semestre',beat:1,scene:'interets',set:{n:2,stair:0,fin:0,ghost:0},sujet:'les intérêts composés',
  text:['Capitaliser deux fois, c’est verser les intérêts à mi-année : ils rapportent à leur tour.',{t:'50 % au bout de six mois, puis 50 % du nouveau capital. Après un an ?',fort:true}],
  pari:{...VF([
    [fr(SEMESTRE_FIN,2),true,`Oui : le capital passe à ${fr(SEMESTRE,1)}, puis ${fr(SEMESTRE,1)} × ${fr(SEMESTRE,1)} = ${fr(SEMESTRE_FIN,2)}. La seconde moitié porte sur ${fr(SEMESTRE,1)}.`],
    [ent(cap(1)),false,`Tu as supposé que couper l’année ne change rien. Mais la seconde moitié porte sur ${fr(SEMESTRE,1)}, pas sur 1 : le capital dépasse ${ent(cap(1))}.`,`À six mois, le capital vaut déjà ${fr(SEMESTRE,1)}. Sur quelle somme porte la seconde moitié ?`],
    [ent(cap(1)*cap(1)),false,`Tu as appliqué 100 % à chaque semestre. C’est 50 % par semestre : on multiplie par ${fr(SEMESTRE,1)}, deux fois.`,'Le taux annuel de 100 % est partagé entre les deux semestres. Combien chacun ?']]),reveal:[{p:{stair:1,fin:1},d:1100}]}},
{cle:'fortune',beat:1,scene:'interets',set:{n:2,stair:1,fin:1,ghost:1},
  text:['Bernoulli pousse l’idée : capitaliser chaque mois, chaque jour, chaque seconde.',{t:'Le capital après un an…',fort:true}],
  pari:{...BET([['grandit sans limite',PARI_NOTE],['s’approche d’un plafond',PARI_NOTE],['grandit de moins en moins vite, sans plafond',PARI_NOTE]])}},
{cle:'curseur',beat:1,scene:'interets',set:{stair:1,fin:1,ghost:1},ctl:'n',need:()=>!!(S.nOk||S.nMontre),needLabel:'Fais glisser n d’abord',
  text:['Chaque période multiplie le capital par 1 + 1/<i>n</i>, et il y en a <i>n</i>.',`Fais glisser <i>n</i> jusqu’à ${ent(CRANS[CRANS.length-1])} : le capital s’écrit sur la scène.`],
  tex:[['\\left(1+\\dfrac{1}{n}\\right)^{n}','(1 + 1/n)^n']]},
{cle:'plafond',beat:1,scene:'interets',set:{n:CRANS[CRANS.length-1],stair:1,fin:1,ghost:0,plaf:1},
  text:()=>[(r=>r===1?`Ton pari était le bon : le capital s’approche d’un plafond, ${fr(Math.E,3)}…, qui est e.`:r===0?`Tu avais parié sur une croissance sans limite. Le capital monte toujours, de moins en moins, sans jamais dépasser ${fr(Math.E,3)}…`:r===2?`Tu avais vu le ralentissement. Il est si fort que le capital ne dépasse jamais ${fr(Math.E,3)}…`:`Le capital s’approche d’un plafond, ${fr(Math.E,3)}…, qui est e.`)(ctx.rep('fortune')),
    'Tu connais ce nombre : e est celui dont le ln vaut 1.',{t:'Pourquoi jamais au-dessus de e ? Et pourquoi e ? La leçon va répondre.',fort:true}]}
,
/* ===== 2. défaire ln ===== */
{cle:'defaire',beat:2,scene:'miroir',set:{lnc:0,kOn:0,k:0,diag:0,pA:0,pA2:0,perp:0,refl:0,expc:0,pts:0,ptsR:0,zone:0,zoneR:0,asym:0,tanB:0,tanB2:0,tanX:0,tg0:0,tgp:0,zm:0},seq:[{p:{lnc:1},d:1600,w:200}],sujet:'défaire ln',
  text:['ln transforme un nombre <i>x</i> > 0 en un nombre <i>k</i> = ln <i>x</i>.','Défaire ln, c’est partir de <i>k</i> et retrouver le <i>x</i>.',{t:'Pour <i>k</i> = 0, quel <i>x</i> ?',fort:true}],
  pari:{...VF([
    ['1',true,'Oui : ln 1 = 0, donc c’est <i>x</i> = 1 que « défaire » renvoie pour <i>k</i> = 0.'],
    ['0',false,'Tu as cru que défaire ramène 0 sur 0. Mais c’est ln 1 qui vaut 0 : le <i>x</i> cherché est 1.','Tu as ramené 0 sur 0. Où la courbe de ln coupe-t-elle l’axe horizontal ?'],
    ['aucun, car ln 0 n’existe pas',false,'Tu as confondu l’entrée et la sortie de ln. On cherche le <i>x</i> dont le ln vaut 0, pas le ln de 0.','ln 0 serait une entrée. Ici 0 est la valeur obtenue : quel <i>x</i> la donne ?']]),reveal:[{p:{kOn:1},d:800}]}},
{cle:'k-curseur',beat:2,scene:'miroir',set:{kOn:1,k:0},ctl:'k',
  text:['Fais glisser la droite <i>y</i> = <i>k</i>.','Pour chaque <i>k</i> que tu essaies, elle coupe la courbe de ln en un seul point.',{t:'Une hauteur n’est jamais atteinte deux fois, car ln est strictement croissante.',fort:true}]},
{cle:'cent',beat:2,scene:'miroir',set:{kOn:1,k:2},sujet:'ln prend toute valeur',
  text:['Le capital de Bernoulli ralentissait, puis plafonnait.','La courbe de ln ralentit aussi.',{t:'Existe-t-il un nombre dont le ln vaut 100 ?',fort:true}],
  pari:{...VF([
    ['oui, un seul',true,`Oui : ln(2<sup>${PUISS_2}</sup>) = ${PUISS_2} ln 2 ≈ ${fr(LN2_145,1)}, donc ln dépasse 100. Continue et strictement croissante, elle passe par 100 une seule fois.`],
    ['non, ln monte si doucement qu’elle plafonne',false,'Ralentir n’est pas plafonner. ln(2<sup><i>n</i></sup>) = <i>n</i> ln 2 dépasse n’importe quel nombre quand <i>n</i> grandit.','Que vaut ln(2<sup><i>n</i></sup>) quand <i>n</i> grandit ?'],
    ['oui, plusieurs',false,'ln est strictement croissante : elle ne repasse jamais par la même hauteur. Un seul nombre convient.','Une fonction strictement croissante peut-elle repasser par la même hauteur ?']]),
    apres:{html:'Vers le bas aussi : ln(1/2<sup><i>n</i></sup>) = −<i>n</i> ln 2 descend sans limite. Continue et strictement croissante, ln prend donc toute valeur réelle, une seule fois : c’est une [[bijection]] de '+I0+' sur ℝ.'}}},
{cle:'exp-nom',beat:2,scene:'miroir',set:{kOn:0},
  text:['La fonction qui défait ln s’appelle la fonction [[exponentielle]] népérienne, notée exp.',{t:'C’est la [[reciproque|réciproque]] de ln.',fort:true},'Donc exp(0) = 1, car ln 1 = 0, et exp(1) = e, car ln e = 1 : le plafond de Bernoulli.'],
  tex:[['\\forall x\\in\\mathbb{R},\\ \\forall y>0,\\quad \\exp(x)=y\\iff x=\\ln y','pour tout réel x et tout y > 0 : exp(x) = y ⇔ x = ln y']]},
{cle:'aller-retour',beat:2,scene:'miroir',sujet:'ln et exp se défont',
  text:['ln et exp se défont l’une l’autre.','Mais leurs deux identités n’ont pas le même domaine.',{t:'Laquelle est vraie pour tout réel <i>x</i> ?',fort:true}],
  verifie:{...VF([
    [M('\\ln(\\exp x)=x','ln(exp x) = x'),true,'Oui : exp <i>x</i> existe pour tout réel <i>x</i>, et ln défait exp. Pour exp(ln <i>x</i>) = <i>x</i>, il faut <i>x</i> > 0.'],
    [M('\\exp(\\ln x)=x','exp(ln x) = x'),false,'Tu as oublié le domaine : ln <i>x</i> n’existe que pour <i>x</i> > 0. Pour <i>x</i> = −2, ln(−2) n’existe pas, donc exp(ln(−2)) n’a pas de sens.','Essaie <i>x</i> = −2 : ln <i>x</i> existe-t-il ?'],
    ['les deux sont vraies',false,'Une seule l’est pour tout réel : exp(ln <i>x</i>) exige <i>x</i> > 0, car ln(−2) n’existe pas.','Essaie <i>x</i> = −2 dans chacune : laquelle perd son sens ?']]),
    apres:{tex:[['\\ln(\\exp x)=x\\quad(x\\in\\mathbb{R})','ln(exp x) = x pour tout réel x'],['\\exp(\\ln x)=x\\quad(x>0)','exp(ln x) = x pour x > 0']]}}}

/* ===== 3. le miroir ===== */
,{cle:'diag',beat:3,scene:'miroir',set:{a:A_PT,lnc:1,kOn:0,diag:0,pA:1,pA2:0,perp:0,refl:0,expc:0},sujet:'le miroir entre ln et exp',
  text:[`Le point (${A_PT} ; ${fr(Math.log(A_PT),2)}) est sur la courbe de ln.`,'exp défait ln.',{t:'Quel point est sur la courbe de exp ?',fort:true}],
  pari:{...VF([
    [`(${fr(Math.log(A_PT),2)} ; ${A_PT})`,true,`Oui : exp(${fr(Math.log(A_PT),2)}) ≈ ${A_PT}. Les deux coordonnées se sont échangées.`],
    [`(${A_PT} ; ${fr(Math.log(A_PT),2)})`,false,`Tu as gardé le point de ln. Pour exp, on part de la valeur ${fr(Math.log(A_PT),2)} et on retrouve ${A_PT} : les coordonnées s’échangent.`,'Ce point est déjà sur la courbe de ln. Que fait exp : elle retrouve l’abscisse ou l’ordonnée ?'],
    [`(${fr(-Math.log(A_PT),2)} ; ${A_PT})`,false,`Tu as changé un signe en échangeant. exp(${fr(-Math.log(A_PT),2)}) ≈ ${fr(1/A_PT,2)}, pas ${A_PT} : on échange sans toucher aux signes.`,`Calcule exp(${fr(-Math.log(A_PT),2)}) : vaut-il ${A_PT} ?`]]),
    reveal:[{p:{pA2:1},d:900},{p:{diag:1,perp:1},d:900}],
    apres:{html:'Échanger les coordonnées, c’est la symétrie par rapport à la droite <i>y</i> = <i>x</i> : le segment qui joint un point à son image est perpendiculaire à cette droite, et son milieu est sur elle.'}}},
{cle:'domaine-exp',beat:3,scene:'miroir',set:{pA:0,pA2:0,perp:0,diag:1,expc:0,pts:0,ptsR:0,zone:0,zoneR:0,asym:0},sujet:'le domaine et le signe de exp',
  text:['La courbe de ln reste à droite de l’axe vertical.',{t:'ln n’existe que pour <i>x</i> > 0. Et exp ?',fort:true}],
  pari:{...VF([
    ['exp(<i>x</i>) existe pour tout réel <i>x</i>, et exp(<i>x</i>) > 0',true,'Oui : ln prend toute valeur réelle, donc exp existe partout. Et ln n’a aucun point avec <i>x</i> ≤ 0, donc exp n’a aucun point avec <i>y</i> ≤ 0.'],
    ['exp n’existe que pour <i>x</i> > 0',false,'C’est ln qui a un domaine restreint, pas exp. ln prend toutes les valeurs réelles, donc exp est définie sur ℝ.','Les <i>x</i> de exp sont les valeurs de ln. ln prend-elle des valeurs négatives ?'],
    ['exp existe partout, et devient négative pour <i>x</i> &lt; 0',false,'La courbe de exp ne descend jamais sous l’axe : le reflet de la bande <i>x</i> ≤ 0, où ln n’a aucun point, est la bande <i>y</i> ≤ 0.','La courbe de ln n’a aucun point dans la bande <i>x</i> ≤ 0. Que devient cette bande dans le miroir ?']]),
    reveal:[{p:{zone:1},d:800},{p:{zoneR:1},d:1000}],apres:{tex:[['\\forall x\\in\\mathbb{R},\\ \\exp(x)>0','pour tout réel x, exp(x) > 0']]}}},
{cle:'asymptotes',beat:3,scene:'miroir',set:{zone:0,zoneR:0,asym:0},sujet:'les limites de base de exp',
  text:['Vers 0, ln descend sans fin le long de l’axe vertical.',{t:'Son reflet, quand <i>x</i> tend vers −∞ : que fait exp(<i>x</i>) ?',fort:true}],
  pari:{...VF([
    ['exp(<i>x</i>) s’approche de 0, sans l’atteindre',true,'Oui : le reflet d’une descente le long de l’axe vertical longe l’axe horizontal, [[asymptote|asymptote]] <i>y</i> = 0.'],
    ['exp(<i>x</i>) devient de plus en plus négative',false,'Tu as gardé la limite de ln. Le miroir change les rôles : la descente le long de l’axe vertical devient un rapprochement de l’axe horizontal.','Tu as repris la limite de ln. Après le miroir, quel axe la courbe longe-t-elle ?'],
    ['exp s’arrête en <i>x</i> = 0, sans suite à gauche',false,'exp est définie partout : ln prend toutes les valeurs réelles. Pour <i>x</i> &lt; 0, la courbe continue, tout près de l’axe.','Chaque réel <i>x</i> est une valeur prise par ln. exp peut-elle s’arrêter ?']]),
    reveal:[{p:{asym:1},d:900}],apres:{tex:[['\\lim_{x\\to-\\infty}\\exp x=0','lim exp x = 0 quand x → −∞'],['\\lim_{x\\to+\\infty}\\exp x=+\\infty','lim exp x = +∞ quand x → +∞']]}}},
{cle:'pliage',beat:3,scene:'miroir',set:{refl:0,expc:0,diag:1,pA:0,pA2:0,perp:0,zone:0,zoneR:0,asym:0},seq:[{p:{refl:1},d:2400,w:300},{p:{expc:1},d:600}],
  text:['Plie la figure le long de <i>y</i> = <i>x</i>.',{t:'Chaque point (<i>x</i> ; ln <i>x</i>) glisse vers (ln <i>x</i> ; <i>x</i>).',a:0},{t:'La courbe de exp est le reflet de celle de ln dans la droite <i>y</i> = <i>x</i>.',a:1,fort:true},{t:'exp est strictement croissante : c’est le reflet d’une courbe croissante.',a:1}]},
{cle:'passage',beat:3,scene:'miroir',set:{pts:0,ptsR:0},seq:[{p:{pts:1},d:700,w:300}],sujet:'les points de la courbe de exp',
  text:['Quelques points se lisent directement.','Le point (1 ; 0) est sur la courbe de ln, car ln 1 = 0 ; le point (e ; 1), car ln e = 1.',{t:'Par quel point passe à coup sûr la courbe de exp ?',fort:true}],
  verifie:{...VF([
    ['(0 ; 1)',true,'Oui : le reflet de (1 ; 0) est (0 ; 1), donc exp(0) = 1. De même, le reflet de (e ; 1) est (1 ; e) : exp(1) = e.'],
    ['(0 ; 0)',false,'Tu as lu e<sup>0</sup> comme 0. Le reflet de (1 ; 0) est (0 ; 1), pas (0 ; 0).','Quel point de ln a pour ordonnée 0 ? Échange ses coordonnées.'],
    ['(1 ; 0)',false,'C’est le point de ln lui-même, car ln 1 = 0. Pour exp, on échange les coordonnées : (0 ; 1).','Ce point est sur la courbe de ln. Que fait le miroir de ses coordonnées ?']]),reveal:[{p:{ptsR:1},d:900}]}},

/* ===== 4. les règles de exp ===== */
{cle:'somme-produit',beat:4,scene:'table',set:{cells:0,arrA:0,arrB:0,demo:0,da:2,db:3},seq:[{p:{cells:8,arrA:7,arrB:7},d:1600,w:100},{p:{demo:1},d:500,w:300},{p:{demo:2},d:500,w:900}],sujet:'exp d’une somme',
  text:['Rappelle la table des puissances de 2 : les pas du haut s’additionnent, les valeurs du bas se multiplient.',{t:'Les pas 2 et 3 mènent aux valeurs 4 et 8.',a:1},{t:'Lue de bas en haut, la table agit comme ln ; de haut en bas, comme exp.',a:2},{t:'Alors exp(<i>a</i> + <i>b</i>) = ?',a:2,fort:true}],
  pari:{...VF([
    [M('\\exp(a)\\times\\exp(b)','exp(a) × exp(b)'),true,'Oui : exp change l’addition des exposants en multiplication des valeurs, comme 2<sup>2</sup> × 2<sup>3</sup> = 2<sup>5</sup>.'],
    [M('\\exp(a)+\\exp(b)','exp(a) + exp(b)'),false,'Tu as distribué exp sur la somme, comme si exp était une addition. Dans la table, additionner les pas multiplie les valeurs.','Teste <i>a</i> = <i>b</i> = 0 : exp(0 + 0) = exp 0 = 1. Et exp 0 + exp 0 ?'],
    [M('\\exp(a\\times b)','exp(a × b)'),false,'C’est l’erreur à l’envers : dans la table, ce sont les pas qui s’additionnent et les valeurs qui se multiplient.','Dans la table, additionner les pas fait quoi aux valeurs ?']]),reveal:[{p:{demo:4},d:900}]}},
{cle:'preuve-produit',beat:4,scene:'table',set:{demo:4},
  text:['Prouve la règle avec ce que tu sais de ln.','Les nombres <i>A</i> = exp <i>a</i> et <i>B</i> = exp <i>b</i> sont strictement positifs : ln <i>A</i> et ln <i>B</i> existent.','La règle du produit de ln donne alors ln(<i>AB</i>) = <i>a</i> + <i>b</i>.'],
  tex:[['A=\\exp a>0\\quad\\text{et}\\quad B=\\exp b>0','A = exp a > 0 et B = exp b > 0'],['\\ln(AB)=\\ln A+\\ln B=a+b','ln(AB) = ln A + ln B = a + b']],
  pari:{label:'La ligne suivante ?',apres:{tex:[['\\exp(a+b)=\\exp a\\times\\exp b','exp(a + b) = exp a × exp b']],html:'On passe de ln(<i>AB</i>) = <i>a</i> + <i>b</i> à <i>AB</i> = exp(<i>a</i> + <i>b</i>) par la définition : <i>y</i> = exp <i>x</i> ⇔ <i>x</i> = ln <i>y</i>.'},opts:[
    {t:'<i>AB</i> = exp(<i>a</i> + <i>b</i>)',ok:true,fb:'Oui : la définition de exp, <i>y</i> = exp <i>x</i> ⇔ <i>x</i> = ln <i>y</i>, avec <i>y</i> = <i>AB</i>.'},
    {t:'ln(<i>AB</i>) = exp(<i>a</i> + <i>b</i>)',indice:'ln(AB) est un nombre. Est-ce une valeur de exp ?',fb:'Tu as mélangé les deux côtés de l’équivalence : ln(<i>AB</i>) vaut <i>a</i> + <i>b</i>, il ne vaut pas exp(<i>a</i> + <i>b</i>).'},
    {t:'<i>AB</i> = <i>a</i> + <i>b</i>',indice:'On a ln(AB) = a + b. Que reste-t-il à faire pour obtenir AB ?',fb:'Tu as oublié de défaire le ln : de ln(<i>AB</i>) = <i>a</i> + <i>b</i>, on passe à <i>AB</i> = exp(<i>a</i> + <i>b</i>).'}]}},
{cle:'notation',beat:4,scene:'expo',set:{ex:0,u3:0,kOn:0,kPt:0,ki:0,nl:0,sol:0,pt:0,tg:0,ratio:0,fcn:0},seq:[{p:{ex:1},d:1600,w:200}],sujet:'e puissance moins a',
  text:['exp(2) = exp(1 + 1) = e × e = e<sup>2</sup>, et plus généralement exp(<i>n</i>) = e<sup><i>n</i></sup> pour tout entier <i>n</i>.','On étend cette écriture : e<sup><i>x</i></sup> = exp(<i>x</i>) pour tout réel <i>x</i>.','Les règles des puissances restent vraies.',{t:`Alors ${M('e^{-a}','e^(−a)')} est égal à…`,fort:true}],
  tex:[['e^{a+b}=e^{a}\\,e^{b}','e^(a + b) = eᵃ eᵇ'],['\\left(e^{a}\\right)^{n}=e^{na}','(eᵃ)ⁿ = e^(na)']],
  pari:{...VF([
    [M('\\dfrac{1}{e^{a}}','1/eᵃ'),true,'Oui : eᵃ × e<sup>−a</sup> = e<sup>a−a</sup> = e<sup>0</sup> = 1, donc e<sup>−a</sup> est l’inverse de eᵃ.'],
    [M('-e^{a}','−eᵃ'),false,'Un exposant négatif ne rend pas le nombre négatif : e<sup>−a</sup> > 0. C’est l’inverse de eᵃ.','Un exposant négatif change-t-il le signe de eˣ ? Rappelle-toi que eˣ > 0.'],
    [M('e^{a}','eᵃ'),false,`Le signe de l’exposant compte : e<sup>−1</sup> ≈ ${fr(EXP_MOINS1,2)} alors que e<sup>1</sup> ≈ ${fr(Math.E,2)}.`,'Si e<sup>−a</sup> valait eᵃ, le produit eᵃ × e<sup>−a</sup> vaudrait (eᵃ)². Vaut-il 1 pour <i>a</i> = 1 ?']]),
    apres:{tex:[['e^{-a}=\\dfrac{1}{e^{a}}','e^(−a) = 1/eᵃ'],['e^{a-b}=\\dfrac{e^{a}}{e^{b}}','e^(a − b) = eᵃ / eᵇ']]}}},
{cle:'e2x',beat:4,scene:'expo',sujet:'e puissance 2x',
  text:['Un exposant 2<i>x</i> : attention à ce qu’il veut dire.',{t:`${M('e^{2x}','e^(2x)')} est égal à…`,fort:true}],
  verifie:{...VF([
    [M('\\left(e^{x}\\right)^{2}','(eˣ)²'),true,'Oui : e<sup>2<i>x</i></sup> = e<sup><i>x</i> + <i>x</i></sup> = eˣ × eˣ = (eˣ)².'],
    [M('2e^{x}','2eˣ'),false,'Tu as additionné au lieu de multiplier : e<sup><i>x</i> + <i>x</i></sup> = eˣ × eˣ, pas eˣ + eˣ.','Écris 2<i>x</i> = <i>x</i> + <i>x</i>, puis applique la règle de la somme.'],
    [M('e^{x^{2}}','e^(x²)'),false,'Tu as élevé l’exposant au carré. Dans (eˣ)² = e<sup>2<i>x</i></sup>, l’exposant est multiplié par 2.','Dans (eᵃ)ⁿ = e<sup><i>na</i></sup>, que devient l’exposant ?']])}}

/* ===== 5. les équations ===== */
,{cle:'ek',beat:5,scene:'expo',set:{kOn:1,k:5,kPt:0,ki:0},sujet:'résoudre eˣ = k',
  text:['Résous dans ℝ.',{t:`${M('e^{x}=5','eˣ = 5')} : que vaut <i>x</i> ?`,fort:true}],
  pari:{...VF([
    [M('x=\\ln 5','x = ln 5'),true,`Oui : eˣ = 5 équivaut à <i>x</i> = ln 5, soit <i>x</i> ≈ ${fr(LN5,2)}.`],
    [M('x=\\dfrac{5}{e}','x = 5/e'),false,'Tu as lu eˣ comme e × <i>x</i>. Mais <i>x</i> est l’exposant : eˣ = 5 équivaut à <i>x</i> = ln 5.','Dans eˣ, <i>x</i> est-il un facteur ou un exposant ?'],
    [M('x=e^{5}','x = e^5'),false,'Tu as inversé le sens : e<sup>e<sup>5</sup></sup> n’est pas 5. C’est ln qui défait exp : <i>x</i> = ln 5.','Quelle fonction défait exp : exp elle-même, ou ln ?']]),reveal:[{p:{kPt:1},d:900}]}},
{cle:'k-negatif',beat:5,scene:'expo',set:{k:-2,kPt:0,ki:0},sujet:'eˣ est toujours positif',
  text:['Même question, avec une droite sous l’axe.',{t:`Que vaut <i>x</i> si ${M('e^{x}=-2','eˣ = −2')} ?`,fort:true}],
  pari:{...VF([
    ['aucune solution',true,'Oui : eˣ > 0 pour tout réel <i>x</i>, donc eˣ ne vaut jamais −2. La droite <i>y</i> = −2 reste sous la courbe.'],
    [M('x=\\ln(-2)','x = ln(−2)'),false,'ln(−2) n’existe pas : ln n’est définie que sur '+I0+'. Une équation eˣ = <i>k</i> n’a de solution que si <i>k</i> > 0.','ln(−2) existe-t-il ? Rappelle-toi le domaine de ln.'],
    [M('x=-\\ln 2','x = −ln 2'),false,'Teste : e<sup>−ln 2</sup> = 1/2, qui est positif, pas −2. Aucun réel ne donne un eˣ négatif.','Calcule e<sup>−ln 2</sup> : vaut-il −2 ?']]),reveal:[{p:{kPt:1},d:900}]}},
{cle:'ek-ineq',beat:5,scene:'expo',set:{kOn:1,k:5,kPt:0,ki:0},sujet:'résoudre eˣ < k',
  text:['Même droite, une inéquation.',{t:`Pour quels <i>x</i> a-t-on ${M('e^{x}<5','eˣ < 5')} ?`,fort:true}],
  pari:{...VF([
    ['<i>x</i> &lt; ln 5',true,`Oui : 5 = e<sup>ln 5</sup>, et exp garde l’ordre. eˣ &lt; e<sup>ln 5</sup> équivaut à <i>x</i> &lt; ln 5, soit <i>x</i> &lt; ${fr(LN5,2)}.`],
    ['<i>x</i> > ln 5',false,'Tu as renversé l’inégalité. exp est croissante : elle garde l’ordre.','Sur la figure, pour quels <i>x</i> la courbe est-elle sous la droite <i>y</i> = 5 ?'],
    ['0 &lt; <i>x</i> &lt; ln 5',false,`Tu as ajouté <i>x</i> > 0. C’est eˣ qui est positif, pas <i>x</i> : e<sup>−1</sup> ≈ ${fr(EXP_MOINS1,2)} est plus petit que 5.`,'Essaie <i>x</i> = −1 : eˣ est-il plus petit que 5 ?']]),
    reveal:[{p:{kPt:1,ki:1},d:900}],
    apres:{tex:[['e^{a}=e^{b}\\iff a=b','eᵃ = eᵇ ⇔ a = b'],['e^{a}<e^{b}\\iff a<b','eᵃ < eᵇ ⇔ a < b']],html:'exp est strictement croissante : elle garde l’ordre. Elle n’ajoute aucune condition : e<sup><i>u</i></sup> existe dès que <i>u</i> existe.'}}},
{cle:'inequation',beat:5,scene:'expo',set:{kOn:0,kPt:0,ki:0,nl:1,sol:0},sujet:'résoudre une inéquation avec exp',
  text:['Résous dans ℝ l’inéquation.',{t:'Quelles sont les solutions ?',fort:true}],
  tex:[['e^{2x-1}<e^{x+3}','e^(2x − 1) < e^(x + 3)']],
  pari:{...VF([
    [`<i>x</i> &lt; ${ent(BORNE)}`,true,'Oui : exp garde l’ordre, donc l’inéquation équivaut à 2<i>x</i> − 1 &lt; <i>x</i> + 3, soit <i>x</i> &lt; '+ent(BORNE)+'.'],
    [`<i>x</i> > ${ent(BORNE)}`,false,'Tu as renversé l’inégalité. exp est croissante : elle garde l’ordre, elle ne le renverse pas.','exp est croissante. Garde-t-elle le sens de l’inégalité ?'],
    [`<i>x</i> &lt; ${ent(BORNE)} et <i>x</i> > 1/2`,false,'Tu as transféré le réflexe de ln. exp n’ajoute aucune condition : e<sup><i>u</i></sup> existe dès que <i>u</i> existe, il suffit de résoudre 2<i>x</i> − 1 &lt; <i>x</i> + 3.','Les conditions d’existence servent à ln. Que demande e<sup><i>u</i></sup> ?']]),reveal:[{p:{sol:1},d:1000}]}},
{cle:'systeme',beat:5,scene:'expo',set:{nl:0,sol:0,ex:1},sujet:'résoudre un système avec exp',
  text:['Un système dont les inconnues sont les exposants.',{t:'Quel couple (<i>x</i> ; <i>y</i>) convient ?',fort:true}],
  tex:[['\\begin{cases} e^{x}\\times e^{y}=e^{5}\\\\ \\dfrac{e^{x}}{e^{y}}=e \\end{cases}','eˣ × eʸ = e⁵ et eˣ / eʸ = e']],
  verifie:{...VF([
    [`(${SYS_X} ; ${SYS_Y})`,true,`Oui : eˣ × eʸ = e<sup><i>x</i>+<i>y</i></sup> = e<sup>5</sup> et eˣ/eʸ = e<sup><i>x</i>−<i>y</i></sup> = e, donc <i>x</i> + <i>y</i> = 5 et <i>x</i> − <i>y</i> = 1, soit <i>x</i> = ${SYS_X} et <i>y</i> = ${SYS_Y}.`],
    [`(e<sup>${SYS_X}</sup> ; e<sup>${SYS_Y}</sup>)`,false,'Tu as pris pour inconnues eˣ et eʸ. Les inconnues sont les exposants <i>x</i> et <i>y</i> : e<sup><i>x</i>+<i>y</i></sup> = e<sup>5</sup> donne <i>x</i> + <i>y</i> = 5.','Les inconnues sont x et y, pas eˣ et eʸ. Que vaut eˣ × eʸ en une seule puissance ?'],
    ['aucune solution : eˣ × eʸ ne se simplifie pas',false,'eˣ × eʸ se simplifie : c’est e<sup><i>x</i>+<i>y</i></sup>. On obtient un système sur les exposants.','La règle de la somme se lit aussi à l’envers. Que vaut eˣ × eʸ ?']])}},
{cle:'v-equations',beat:5,scene:'expo',sujet:'le signe de eˣ − 1',
  text:['Une inégalité à connaître par cœur, pour la suite.',{t:`Pour quels <i>x</i> a-t-on ${M('e^{x}\\gt 1','eˣ > 1')} ?`,fort:true}],
  verifie:{...VF([
    ['<i>x</i> > 0',true,'Oui : 1 = e<sup>0</sup>, donc eˣ > e<sup>0</sup> équivaut à <i>x</i> > 0, puisque exp garde l’ordre.'],
    ['<i>x</i> > 1',false,'Tu as confondu e<sup>1</sup> et 1. C’est e<sup>0</sup> qui vaut 1 : eˣ > e<sup>0</sup> ⇔ <i>x</i> > 0.','Quel exposant donne 1 : e<sup>1</sup> ou e<sup>0</sup> ?'],
    ['pour tout réel <i>x</i>',false,`eˣ > 0 ne dit pas eˣ > 1 : e<sup>−1</sup> ≈ ${fr(EXP_MOINS1,2)} est inférieur à 1.`,'Essaie <i>x</i> = −1 : eˣ est-il plus grand que 1 ?']]),
    apres:{tex:[['e^{x}>1\\iff x>0','eˣ > 1 ⇔ x > 0'],['e^{x}<1\\iff x<0','eˣ < 1 ⇔ x < 0']],html:'Donc eˣ − 1 a le signe de <i>x</i>.'}}}

/* ===== 6. la dérivée ===== */
,{cle:'rappel',beat:6,scene:'expo',set:{ex:1,u3:0,kOn:0,kPt:0,ki:0,nl:0,sol:0,pt:0,px:X_RAPPEL,ptk:0,tg:0,ratio:0,fcn:0},sujet:'exp et ln, l’aller-retour',
  text:['Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.',{t:`${M('e^{3\\ln 2}','e^(3 ln 2)')} = ?`,fort:true}],
  verifie:{...VF([
    [ent(R_RAPPEL),true,`Oui : 3 ln 2 = ln(2<sup>3</sup>) = ln ${ent(R_RAPPEL)}, donc e<sup>3 ln 2</sup> = e<sup>ln ${ent(R_RAPPEL)}</sup> = ${ent(R_RAPPEL)}.`],
    [ent(3*2),false,`Tu as lu 3 ln 2 comme ln(3 × 2). L’exposant 3 descend devant : 3 ln 2 = ln(2<sup>3</sup>) = ln ${ent(R_RAPPEL)}, pas ln ${ent(3*2)}.`,'Le 3 devant ln 2 vient d’un exposant. Dans quel nombre était-il ?'],
    [ent(3**2),false,`L’exposant 3 porte sur 2 : 2<sup>3</sup> = ${ent(2**3)}, pas 3<sup>2</sup> = ${ent(3**2)}.`,'Dans ln(<i>a</i><sup><i>n</i></sup>) = <i>n</i> ln <i>a</i>, qui est la base : <i>a</i> ou <i>n</i> ?']]),reveal:[{p:{pt:1},d:900}]}},
{cle:'reflet-pente',beat:6,scene:'miroir',set:{lnc:1,expc:1,refl:1,diag:1,zone:0,zoneR:0,asym:0,pts:0,ptsR:0,pA:0,pA2:0,perp:0,kOn:0,b:B_TAN,tanB:1,tanB2:0,tanX:0,tg0:0,tgp:0,zm:0},sujet:'la pente de exp, par le miroir',
  text:[`En (${B_TAN} ; ln ${B_TAN}), la tangente à ln a pour pente ln′(${B_TAN}) = 1/${B_TAN}.`,`Elle avance de ${B_TAN} quand elle monte de 1.`,{t:'Reflétée dans <i>y</i> = <i>x</i>, sa pente devient…',fort:true}],
  pari:{...VF([
    [ent(PENTE_EXP),true,`Oui : avancer de ${B_TAN} et monter de 1 devient avancer de 1 et monter de ${B_TAN}. La pente devient ${ent(PENTE_EXP)}, et le point reflété est à la hauteur ${ent(PENTE_EXP)}.`],
    [`−1/${B_TAN}`,false,'Tu as pensé que le reflet renverse le sens de la montée. Mais la droite reste montante : sa pente reste positive.','Le reflet échange <i>x</i> et <i>y</i>. Une droite qui monte peut-elle se mettre à descendre ?'],
    [`1/${B_TAN}`,false,'Tu as gardé la pente. Le miroir échange avancer et monter : la droite change de direction.',`Dans le reflet, « avancer de ${B_TAN}, monter de 1 » devient quoi ?`]]),reveal:[{p:{tanB2:1},d:1300}]}},
{cle:'pente-hauteur',beat:6,scene:'expo',set:{ex:1,u3:0,kOn:0,kPt:0,ki:0,nl:0,sol:0,pt:1,px:X_PH,ptk:2,tg:0,ratio:0,fcn:0},sujet:'la pente de exp, selon la hauteur',
  text:[`Même miroir, autre point : sur la courbe de exp, le point de hauteur ${ent(H_PH)}.`,{t:'Quelle est sa pente ?',fort:true}],
  pari:{...VF([
    [ent(H_PH),true,`Oui : son point miroir sur ln est en <i>x</i> = ${ent(H_PH)}, de pente 1/${ent(H_PH)}. Le reflet inverse la pente.`],
    [`1/${ent(H_PH)}`,false,'Tu as gardé la pente de ln. Le miroir échange avancer et monter : la pente s’inverse.',`Le point miroir est sur ln, de pente 1/${ent(H_PH)}. Que fait le miroir d’une pente ?`],
    [`ln ${ent(H_PH)}`,false,`ln ${ent(H_PH)} ≈ ${fr(X_PH,2)} est l’abscisse du point, pas sa pente.`,`ln ${ent(H_PH)} se lit sur l’axe horizontal. Est-ce une pente ?`]]),reveal:[{p:{tg:1},d:1000}]}},
{cle:'derivee',beat:6,scene:'miroir',set:{tanB:0,tanB2:0,diag:1,lnc:1,expc:1,refl:1,xt:-1.5,tanX:0},sujet:'la dérivée de exp',
  text:[`À la hauteur ${ent(B_TAN)}, la pente est ${ent(B_TAN)} ; à la hauteur ${ent(H_PH)}, elle est ${ent(H_PH)}.`,'Au point (<i>x</i> ; eˣ), la hauteur est eˣ : son point miroir sur ln a pour abscisse eˣ.'],
  deriv:[{tex:'\\exp\'(x)=\\dfrac{1}{\\ln\'\\left(e^{x}\\right)}',alt:'exp′(x) = 1 / ln′(eˣ)',r:'La pente de exp est l’inverse de la pente de ln au point miroir. C’est la formule de ton cours : (<i>f</i><sup>−1</sup>)′(<i>y</i>) = 1/<i>f</i> ′(<i>f</i><sup>−1</sup>(<i>y</i>)), avec <i>f</i> = ln.'}],
  pari:{label:'La ligne suivante ?',apres:{tex:[['\\left(e^{x}\\right)\'=e^{x}','(eˣ)′ = eˣ']],html:'Regarde : en chaque point, la pente est égale à la hauteur.'},
    reveal:[{p:{tanX:1,xt:-1.5},d:700},{p:{xt:1.6},d:5200}],opts:[
    {t:'= 1/(1/e<sup><i>x</i></sup>) = e<sup><i>x</i></sup>',ok:true,fb:'Oui : ln′(e<sup><i>x</i></sup>) = 1/e<sup><i>x</i></sup>, donc exp′(<i>x</i>) = 1/(1/e<sup><i>x</i></sup>) = e<sup><i>x</i></sup>.'},
    {t:'= 1/(1/<i>x</i>) = <i>x</i>',indice:'Dans 1/ln′(eˣ), en quel nombre calcule-t-on ln′ : x ou eˣ ?',fb:'Tu as évalué ln′ en <i>x</i>. Elle l’est au point reflété e<sup><i>x</i></sup> : ln′(e<sup><i>x</i></sup>) = 1/e<sup><i>x</i></sup>, pas 1/<i>x</i>.'},
    {t:'= <i>x</i> e<sup><i>x</i>−1</sup>',indice:'Dans eˣ, la variable est-elle la base ou l’exposant ? La règle des puissances sert-elle ?',fb:'Tu as appliqué la règle de <i>x</i><sup><i>n</i></sup>. Mais eˣ n’est pas une puissance de <i>x</i> : la base e est fixe, l’exposant varie.'}]}},
{cle:'eu',beat:6,scene:'expo',set:{ex:1,u3:1,pt:0,tg:0,kOn:0,nl:0,ratio:0,ki:0,fcn:0},sujet:'la dérivée de e puissance u',
  text:['Quand l’exposant est une fonction <i>u</i>, on dérive une [[composee|composée]] : on multiplie par <i>u</i>′.',{t:`Alors ${M('\\left(e^{3x}\\right)^{\\prime}','(e^(3x))′')} = ?`,fort:true}],
  tex:[['\\left(e^{u}\\right)^{\\prime}=u^{\\prime}e^{u}','(e^u)′ = u′ e^u']],
  pari:{...VF([
    [M('3e^{3x}','3e^(3x)'),true,'Oui : <i>u</i> = 3<i>x</i> et <i>u</i>′ = 3, donc (e<sup>3<i>x</i></sup>)′ = 3e<sup>3<i>x</i></sup>.'],
    [M('e^{3x}','e^(3x)'),false,'Tu as oublié <i>u</i>′. La dérivée de e<sup><i>u</i></sup> est <i>u</i>′e<sup><i>u</i></sup>, avec <i>u</i>′ = 3 ici.','La règle de la composée multiplie par la dérivée de l’exposant. Que vaut-elle ?'],
    [M('3x\\,e^{3x-1}','3x e^(3x − 1)'),false,'Tu as appliqué la règle des puissances. Mais l’exposant 3<i>x</i> varie : la règle est (e<sup><i>u</i></sup>)′ = <i>u</i>′e<sup><i>u</i></sup>.','Dans e<sup>3<i>x</i></sup>, qu’est-ce qui varie : la base ou l’exposant ?']])}},
{cle:'h0',beat:6,scene:'taux',set:{on:1,sec:1,h:H_DEBUT,tan:0},sujet:'la limite de (eˣ − 1)/x',
  text:['Une limite du bac, avec <i>x</i> qui tend vers 0 : (e<sup><i>x</i></sup> − 1)/<i>x</i>.','Le haut et le bas tendent vers 0 : c’est une [[indetermine|forme indéterminée]].',{t:'Que vaut sa limite ?',fort:true}],
  pari:{...VF([
    ['1',true,'Oui : (eˣ − 1)/<i>x</i> = (eˣ − e<sup>0</sup>)/(<i>x</i> − 0), le taux d’accroissement de exp en 0. Il tend vers exp′(0) = e<sup>0</sup> = 1.'],
    ['0',false,'Tu as pris la forme 0/0 pour 0. Elle demande un calcul : ici, c’est un taux d’accroissement.','eˣ − 1 = eˣ − e<sup>0</sup>. Qu’est-ce que (eˣ − e<sup>0</sup>)/(<i>x</i> − 0) ?'],
    ['+∞',false,'Diviser par un nombre qui tend vers 0 ne suffit pas : le numérateur tend vers 0 lui aussi.','Le numérateur eˣ − 1 tend-il vers 1 ou vers 0 ?']]),
    reveal:[{p:{h:H_FIN},d:4600},{p:{tan:1},d:700}],apres:{tex:[['\\lim_{x\\to0}\\dfrac{e^{x}-1}{x}=1','lim (eˣ − 1)/x = 1 quand x → 0']]}}},
{cle:'v-derivee',beat:6,scene:'expo',set:{ex:0,u3:0,pt:0,tg:0,kOn:0,ki:0,nl:0,ratio:0,fcn:1},sujet:'la dérivée d’un produit avec eˣ',
  text:['Au bac, eˣ est souvent un facteur d’un produit.',{t:`Soit ${M('f(x)=(x-2)\\,e^{x}','f(x) = (x − 2)eˣ')}. Que vaut <i>f</i> ′(<i>x</i>) ?`,fort:true}],
  verifie:{...VF([
    [M('(x-1)\\,e^{x}','(x − 1)eˣ'),true,'Oui : (<i>uv</i>)′ = <i>u</i>′<i>v</i> + <i>uv</i>′, avec <i>u</i> = <i>x</i> − 2 et <i>v</i> = eˣ : eˣ + (<i>x</i> − 2)eˣ = (<i>x</i> − 1)eˣ.'],
    [M('e^{x}','eˣ'),false,'Tu as multiplié les deux dérivées. La dérivée d’un produit est (<i>uv</i>)′ = <i>u</i>′<i>v</i> + <i>uv</i>′.','Dériver un produit, est-ce multiplier la dérivée de chaque facteur ?'],
    [M('(x-2)\\,e^{x}','(x − 2)eˣ'),false,'Tu as dérivé eˣ seul. Le facteur <i>x</i> − 2 se dérive aussi : sa dérivée est 1.','Le facteur x − 2 est-il une constante ?']])}}

/* ===== 7. la tangente ===== */
,{cle:'tangente0',beat:7,scene:'miroir',set:{lnc:0,diag:0,tanB:0,tanB2:0,tanX:0,tg0:0,tgp:1,zm:0,zone:0,zoneR:0,asym:0,pts:0,ptsR:0,kOn:0},
  text:['En 0, la pente de exp est e<sup>0</sup> = 1, et la courbe passe par (0 ; 1).','La [[tangente]] a donc pour équation <i>y</i> = <i>x</i> + 1.',{t:'La courbe est-elle au-dessus de cette droite, en dessous, ou la traverse-t-elle en 0 ?',fort:true}],
  tex:[['y=e^{0}\\,(x-0)+e^{0}=x+1','y = e⁰ (x − 0) + e⁰ = x + 1']],
  pari:{...BET([['au-dessus de sa tangente','Pari noté. Regarde en zoomant sur le point (0 ; 1).'],['en dessous de sa tangente','Pari noté. Regarde en zoomant sur le point (0 ; 1).'],['elle la traverse en 0','Pari noté. Regarde en zoomant sur le point (0 ; 1).']]),reveal:[{p:{tg0:1,tgp:1},d:900},{p:{zm:1},d:1900}],apres:{html:'La courbe reste au-dessus de sa tangente, sauf au point (0 ; 1).'}}},
{cle:'preuve-tangente',beat:7,scene:'miroir',set:{zm:0,tg0:1,tgp:1},sujet:'eˣ ≥ x + 1',
  text:['Pour le prouver, compare la courbe à sa tangente.'],
  deriv:[
    {tex:'g(x)=e^{x}-x-1',alt:'g(x) = eˣ − x − 1',r:'L’écart vertical entre la courbe et la tangente <i>y</i> = <i>x</i> + 1.'},
    {tex:'g\'(x)=e^{x}-1',alt:'g′(x) = eˣ − 1',r:'On dérive : (eˣ)′ = eˣ, et la dérivée de <i>x</i> + 1 est 1.'}],
  pari:{label:'Le signe de g′(x) ?',apres:{tex:[['g(0)=0\\ \\text{est le minimum de}\\ g','g(0) = 0 est le minimum de g'],['e^{x}\\ge x+1\\ \\text{pour tout réel}\\ x','eˣ ≥ x + 1 pour tout réel x']],html:'g est décroissante avant 0, croissante après. Garde cette inégalité : elle explique le plafond de Bernoulli.'},opts:[
    {t:'négatif avant 0, positif après 0',ok:true,fb:'Oui : g′(<i>x</i>) = eˣ − 1 a le signe de <i>x</i>, car eˣ > 1 équivaut à <i>x</i> > 0.'},
    {t:'positif partout, car eˣ > 0',indice:'eˣ > 0 est vrai. Mais eˣ − 1 > 0 demande eˣ > 1 : pour quels x ?',fb:`Tu as étendu « eˣ > 0 » à l’expression eˣ − 1. Mais eˣ − 1 < 0 pour <i>x</i> < 0 : e<sup>−1</sup> − 1 ≈ ${fr(EXP_ECART,2)}.`},
    {t:'négatif partout',indice:'Calcule g′(1) = e − 1 : quel est son signe ?',fb:`Tu as ignoré le côté droit. g′(1) = e − 1 ≈ ${fr(E_MOINS_1,2)}, positif.`}]}}

/* ===== 8. retour à l'énigme ===== */
,{cle:'retour-plafond',beat:8,scene:'interets',set:{n:CRANS[CRANS.length-1],stair:1,fin:1,ghost:0,plaf:1,courbe:0},sujet:'(1 + 1/n)ⁿ ≤ e',
  text:['Première question laissée ouverte : pourquoi le capital ne dépasse-t-il jamais e ?','La tangente répond : e<sup><i>t</i></sup> ≥ <i>t</i> + 1, pour tout réel <i>t</i>.'],
  deriv:[{tex:'1+\\dfrac{1}{n}\\le e^{1/n}',alt:'1 + 1/n ≤ e^(1/n)',r:'La tangente, avec <i>t</i> = 1/<i>n</i>.'}],
  pari:{label:'La ligne suivante ?',apres:{tex:[['\\left(1+\\dfrac{1}{n}\\right)^{n}\\le e','(1 + 1/n)^n ≤ e']],html:'Jamais au-dessus de e, pour tout <i>n</i>.'},opts:[
    {t:M('\\left(1+\\tfrac{1}{n}\\right)^{n}\\le\\left(e^{1/n}\\right)^{n}=e','(1 + 1/n)^n ≤ (e^(1/n))^n = e'),ok:true,fb:'Oui : on élève les deux membres à la puissance <i>n</i>, et (e<sup>1/<i>n</i></sup>)<sup><i>n</i></sup> = e<sup><i>n</i> × 1/<i>n</i></sup> = e.'},
    {t:M('\\left(1+\\tfrac{1}{n}\\right)^{n}\\le e^{1/n}','(1 + 1/n)^n ≤ e^(1/n)'),indice:'On élève chaque membre à la puissance n. Que devient e^(1/n) ?',fb:'Tu as oublié d’élever le membre de droite à la puissance <i>n</i>. La puissance s’applique aux deux membres.'},
    {t:M('\\left(1+\\tfrac{1}{n}\\right)^{n}\\le n\\,e^{1/n}','(1 + 1/n)^n ≤ n e^(1/n)'),indice:'Que vaut (eᵃ)ⁿ : n eᵃ ou e^(na) ?',fb:'Tu as transformé (e<sup><i>a</i></sup>)<sup><i>n</i></sup> en <i>n</i>e<sup><i>a</i></sup>. La règle est (e<sup><i>a</i></sup>)<sup><i>n</i></sup> = e<sup><i>na</i></sup>.'}]}},
{cle:'retour-limite',beat:8,scene:'interets',sujet:'(1 + 1/n)ⁿ tend vers e',
  text:['Deuxième question : pourquoi e, le nombre de ln ?','Prends le ln du capital.'],
  deriv:[
    {tex:'\\ln\\left(\\left(1+\\dfrac{1}{n}\\right)^{n}\\right)=n\\ln\\left(1+\\dfrac{1}{n}\\right)',alt:'ln((1 + 1/n)^n) = n ln(1 + 1/n)',r:'ln(<i>a</i><sup><i>n</i></sup>) = <i>n</i> ln <i>a</i>.'}],
  pari:{label:'Avec h = 1/n, la ligne suivante ?',apres:{tex:[['n\\ln\\left(1+\\dfrac{1}{n}\\right)=\\dfrac{\\ln(1+h)-\\ln 1}{h}\\longrightarrow\\ln\'(1)=1','n ln(1 + 1/n) = (ln(1 + h) − ln 1)/h tend vers ln′(1) = 1'],['\\left(1+\\dfrac{1}{n}\\right)^{n}=e^{\\,n\\ln(1+1/n)}\\longrightarrow e^{1}=e','(1 + 1/n)^n = e^(n ln(1 + 1/n)) tend vers e¹ = e']],html:'C’est le taux d’accroissement de ln en 1, car ln 1 = 0 : il tend vers ln′(1) = 1. exp est continue, car dérivable : on passe à la limite dans l’exposant. <b>L’énigme est résolue : le plafond est e.</b>'},opts:[
    {t:M('\\dfrac{\\ln(1+h)}{h}','ln(1 + h)/h'),ok:true,fb:'Oui : <i>h</i> = 1/<i>n</i> donne <i>n</i> = 1/<i>h</i>, donc <i>n</i> ln(1 + 1/<i>n</i>) = ln(1 + <i>h</i>)/<i>h</i>.'},
    {t:M('h\\,\\ln(1+h)','h ln(1 + h)'),indice:'Si h = 1/n, que vaut n ?',fb:'Tu as remplacé <i>n</i> par <i>h</i>. Mais <i>h</i> = 1/<i>n</i>, donc <i>n</i> = 1/<i>h</i>.'},
    {t:M('\\ln(1+h)','ln(1 + h)'),indice:'Le produit n ln(1 + 1/n) contient le facteur n. Que devient-il ?',fb:'Tu as oublié le facteur <i>n</i>, qui devient 1/<i>h</i> : il reste ln(1 + <i>h</i>)/<i>h</i>.'}]}},
{cle:'croissance',beat:8,scene:'interets',set:{n:CRANS[CRANS.length-1],stair:1,fin:1,ghost:0,plaf:0,courbe:1},
  text:[{t:'Capitalisé à chaque instant, le capital gagne 100 % de ce qu’il vaut : sa pente est sa hauteur.',fort:true},'C’est la courbe <i>y</i> = e<sup><i>t</i></sup>, qui vaut e à <i>t</i> = 1.','En physique, <i>N</i>(<i>t</i>) = <i>N</i><sub>0</sub>e<sup>−λ<i>t</i></sup> suit la même idée : sa pente est proportionnelle à sa hauteur, mais négative.']}

/* ===== 9. les limites ===== */
,{cle:'course',beat:9,scene:'course',set:{x:1},sujet:'les croissances comparées',
  text:['eˣ et <i>x</i> tendent tous les deux vers +∞.',{t:'Quand <i>x</i> tend vers +∞, eˣ/<i>x</i>…',fort:true}],
  pari:{...BET([['tend vers +∞','Pari noté. Regarde la course.'],['tend vers 1 : les deux tendent vers +∞','Pari noté. Regarde la course.'],['tend vers 0','Pari noté. Regarde la course.']]),reveal:[{p:{x:R_COURSE[R_COURSE.length-1]},d:7000}],
    apres:{tex:[['\\lim_{x\\to+\\infty}\\dfrac{e^{x}}{x}=+\\infty','lim eˣ/x = +∞ quand x → +∞'],['\\lim_{x\\to+\\infty}\\dfrac{e^{x}}{x^{n}}=+\\infty\\quad(n\\ \\text{entier non nul})','lim eˣ/xⁿ = +∞ quand x → +∞']],html:'La course le suggère ; [[preuve-ex|la preuve]] tient en trois lignes.'}}},
{cle:'x-sur-ex',beat:9,scene:'expo',set:{ratio:0,ex:0,fcn:2},sujet:'x e^(−x) en +∞',
  text:['Une limite du bac, avec une forme indéterminée.',{t:`Que vaut la limite de ${M('xe^{-x}','x e^(−x)')} quand <i>x</i> tend vers +∞ ?`,fort:true}],
  verifie:{...VF([
    ['0',true,'Oui : <i>x</i>e<sup>−<i>x</i></sup> = <i>x</i>/eˣ = 1/(eˣ/<i>x</i>), et eˣ/<i>x</i> tend vers +∞.'],
    ['+∞',false,'Tu as fait gagner <i>x</i>. C’est l’inverse : eˣ l’emporte sur <i>x</i>, donc <i>x</i>/eˣ tend vers 0.','Écris x e^(−x) = x/eˣ. Qui l’emporte, eˣ ou x ?'],
    ['1',false,'Tu as appliqué « ∞/∞ = 1 ». Cette règle n’existe pas : eˣ/<i>x</i> tend vers +∞, donc son inverse tend vers 0.','Une forme ∞/∞ vaut-elle toujours 1 ? Relis le résultat sur eˣ/x.']])}},
{cle:'x-ex-moins',beat:9,scene:'expo',set:{ratio:0,ex:0,fcn:3},sujet:'x eˣ en −∞',
  text:['Quand <i>x</i> tend vers −∞, <i>x</i> tend vers −∞ et eˣ tend vers 0.',{t:`Le produit ${M('xe^{x}','x eˣ')} tend vers…`,fort:true}],
  verifie:{...VF([
    ['0',true,'Oui : avec <i>X</i> = −<i>x</i>, <i>x</i>eˣ = −<i>X</i>/e<sup><i>X</i></sup>, qui tend vers 0 car e<sup><i>X</i></sup> l’emporte sur <i>X</i>.'],
    ['−∞',false,`Tu as fait gagner <i>x</i>. C’est l’exponentielle qui l’emporte : pour <i>x</i> = −10, <i>x</i>eˣ ≈ ${fr(X_MOINS10,5)}, déjà tout près de 0.`,'Calcule x eˣ pour x = −10.'],
    ['on ne peut pas conclure : forme indéterminée',false,`Une forme indéterminée n’interdit pas de conclure : elle demande un calcul. Ici, pour <i>x</i> = −10, <i>x</i>eˣ ≈ ${fr(X_MOINS10,5)} : le produit tend vers 0.`,'Calcule x eˣ pour x = −10.']]),
    apres:{tex:[['\\lim_{x\\to-\\infty}x\\,e^{x}=0','lim x eˣ = 0 quand x → −∞']]}}}

/* ===== 10. au bac ===== */
,{cle:'bac',beat:10,scene:'bac',set:{f:0,dom:0,roots:0,back:0,neg:0,ex2:0,rej:0},
  text:['Un exercice du bac (Sciences expérimentales 2021, session normale, exercice 1, question 1 a) : résoudre dans ℝ l’équation'],
  tex:[['e^{2x}-4e^{x}+3=0','e^(2x) − 4e^x + 3 = 0']],
  pari:{label:'Premier geste ?',reveal:[{p:{f:1},d:1500},{p:{dom:1},d:800}],opts:[
    {t:'Poser <i>t</i> = e<sup><i>x</i></sup>, avec <i>t</i> > 0',fb:'C’est le bon réflexe : e<sup>2<i>x</i></sup> = (eˣ)², donc l’équation devient un trinôme en <i>t</i>, avec <i>t</i> > 0.'},
    {t:'Prendre ln des deux membres',fb:'ln 0 n’existe pas, et ln ne découpe pas une somme. Le bon geste : poser <i>t</i> = eˣ.'},
    {t:'Écrire les conditions d’existence',fb:'C’est le réflexe de ln. Ici, eˣ existe pour tout <i>x</i> : il n’y a rien à écrire. Le bon geste : poser <i>t</i> = eˣ.'}]}},
{cle:'bac-sol',beat:10,scene:'bac',set:{f:0,dom:0,roots:0,back:0},seq:[{p:{f:1},d:1200,w:200},{p:{dom:1},d:600,w:300},{p:{roots:1},d:600,w:300}],sujet:'revenir de t à x',
  text:['On pose <i>t</i> = eˣ : comme e<sup>2<i>x</i></sup> = (eˣ)², l’équation devient un [[trinome|trinôme]] en <i>t</i>, avec <i>t</i> > 0.',{t:'Son [[discriminant]] Δ = <i>b</i>² − 4<i>ac</i> donne deux racines strictement positives : on les garde.',a:2}],
  tex:[[`t^{2}-${-BAC1.b}t+${BAC1.c}=0`,`t² − ${-BAC1.b}t + ${BAC1.c} = 0`],
    [`\\Delta=${BAC1.b**2}-${4*BAC1.a*BAC1.c}=${R1.delta}`,`Δ = ${BAC1.b**2} − ${4*BAC1.a*BAC1.c} = ${R1.delta}`],
    [`t=${R1.r1}\\ \\text{ou}\\ t=${R1.r2}`,`t = ${R1.r1} ou t = ${R1.r2}`]],
  pari:{label:'La ligne suivante ?',...VF([
    [`<i>x</i> = 0 ou <i>x</i> = ln ${ent(R1.r2)}`,true,`Oui : eˣ = ${R1.r1} équivaut à <i>x</i> = 0, et eˣ = ${R1.r2} équivaut à <i>x</i> = ln ${ent(R1.r2)}.`],
    [`<i>x</i> = ${R1.r1} ou <i>x</i> = ${R1.r2}`,false,`Tu as oublié de revenir de <i>t</i> à <i>x</i>. On a posé <i>t</i> = eˣ : il faut résoudre eˣ = ${R1.r1} et eˣ = ${R1.r2}.`,'On a posé t = eˣ. Les racines sont celles de t : que faut-il encore résoudre ?'],
    [`<i>x</i> = e ou <i>x</i> = e<sup>${R1.r2}</sup>`,false,`Tu as appliqué exp au lieu de ln. eˣ = ${R1.r2} équivaut à <i>x</i> = ln ${ent(R1.r2)}, pas à <i>x</i> = e<sup>${R1.r2}</sup>.`,`Pour résoudre eˣ = ${R1.r2}, quelle fonction défait exp ?`]]),
    reveal:[{p:{back:1},d:900}],apres:{tex:[[`S=\\{0\\,;\\,\\ln ${R1.r2}\\}`,`S = {0 ; ln ${R1.r2}}`]]}}},
{cle:'bac-copie',beat:10,scene:'bac',set:{f:1,dom:1,roots:1,back:1,neg:0},
  text:['La rédaction attendue pour la question 1 a).',`Barème du sujet : 0,5 point pour cette question (Sciences expérimentales 2021, session normale).`],
  html:()=>fnHTML(`<div class="lg-copie">${[
    '<b>1 a)</b> On pose '+NW('<i>t</i> = e<sup><i>x</i></sup>')+', avec '+NW('<i>t</i> > 0')+' : '+NW('e<sup>2<i>x</i></sup> = <i>t</i><sup>2</sup>')+'.',
    `L’équation équivaut à ${NW(`<i>t</i><sup>2</sup> − ${-BAC1.b}<i>t</i> + ${BAC1.c} = 0`)} : Δ = ${R1.delta}, donc ${NW(`<i>t</i> = ${R1.r1}`)} ou ${NW(`<i>t</i> = ${R1.r2}`)}.`,
    'Ces deux valeurs sont strictement positives : on les garde.',
    `${NW(`e<sup><i>x</i></sup> = ${R1.r1}`)} équivaut à ${NW('<i>x</i> = 0')} ; ${NW(`e<sup><i>x</i></sup> = ${R1.r2}`)} équivaut à ${NW(`<i>x</i> = ln ${ent(R1.r2)}`)}.`,
    `<b>S = {0 ; ln ${ent(R1.r2)}}</b>`].map(l=>`<p>${ctx.ty(l)}</p>`).join('')}</div>`)},
{cle:'bac-ineq',beat:10,scene:'bac',set:{ex2:0,f:1,dom:1,roots:1,back:0,neg:1,rej:0},sujet:'une inéquation en eˣ',
  text:['La question 1 b) du même sujet (0,5 point) : résoudre dans ℝ l’inéquation.',`Avec <i>t</i> = eˣ, le trinôme se factorise par ses racines ${R1.r1} et ${R1.r2} : il est négatif entre elles.`],
  tex:[['e^{2x}-4e^{x}+3\\le 0','e^(2x) − 4e^x + 3 ≤ 0'],[`(t-${R1.r1})(t-${R1.r2})\\le 0`,`(t − ${R1.r1})(t − ${R1.r2}) ≤ 0`],[`${R1.r1}\\le t\\le ${R1.r2}`,`${R1.r1} ≤ t ≤ ${R1.r2}`]],
  pari:{label:'La ligne suivante ?',...VF([
    [`${NW(`0 ≤ <i>x</i> ≤ ln ${ent(R1.r2)}`)}`,true,`Oui : ${R1.r1} ≤ eˣ ≤ ${R1.r2} équivaut à e<sup>0</sup> ≤ eˣ ≤ ${R1.r2}, donc à 0 ≤ <i>x</i> ≤ ln ${ent(R1.r2)}, car exp et ln gardent l’ordre.`],
    [NW(`${R1.r1} ≤ <i>x</i> ≤ ${R1.r2}`),false,`Tu n’es pas revenu de <i>t</i> à <i>x</i>. ${R1.r1} ≤ <i>t</i> ≤ ${R1.r2} est une condition sur <i>t</i> = eˣ, pas sur <i>x</i>.`,`On a posé t = eˣ. L’encadrement ${R1.r1} ≤ t ≤ ${R1.r2} porte-t-il sur x ?`],
    [NW(`<i>x</i> ≤ 0 ou <i>x</i> ≥ ln ${ent(R1.r2)}`),false,`Tu as pris l’extérieur des racines. Un trinôme est négatif entre ses racines, pas à l’extérieur.`,`Teste x = 1 : e ≈ ${fr(Math.E,2)} est entre ${R1.r1} et ${R1.r2}. x = 1 est-il dans ta réponse ?`]]),
    reveal:[{p:{back:1},d:900}],apres:{tex:[[`S=\\left[0\\,;\\,\\ln ${R1.r2}\\right]`,`S = [0 ; ln ${R1.r2}]`]]}}},
{cle:'bac-2',beat:10,scene:'bac',set:{ex2:1,f:0,dom:0,roots:0,back:0,neg:0,rej:0},sujet:'poser t = eˣ',
  text:['À toi, avec un exercice type du même genre (ce n’est pas un sujet).'],
  tex:[[`e^{2x}-e^{x}-6=0`,'e^(2x) − eˣ − 6 = 0']],
  pari:{label:'La première ligne ?',...VF([
    [`<i>t</i><sup>2</sup> − <i>t</i> − 6 = 0, avec <i>t</i> > 0`,true,'Oui : e<sup>2<i>x</i></sup> = (eˣ)², donc avec <i>t</i> = eˣ on obtient <i>t</i><sup>2</sup> − <i>t</i> − 6 = 0, avec <i>t</i> > 0.'],
    ['eˣ − 6 = 0, soit eˣ = 6',false,'Tu as lu e<sup>2<i>x</i></sup> comme 2eˣ. Mais e<sup>2<i>x</i></sup> = (eˣ)² = <i>t</i><sup>2</sup>, pas 2<i>t</i>.','e^(2x) s’écrit e^(x+x). Que donne la règle de la somme ?'],
    ['2<i>x</i> − <i>x</i> = ln 6, soit <i>x</i> = ln 6',false,'Tu as pris le ln terme à terme. ln ne découpe pas une différence : ln(<i>a</i> − <i>b</i>) n’est pas ln <i>a</i> − ln <i>b</i>.','La différence e^(2x) − eˣ se découpe-t-elle sous un ln ?']])}},
{cle:'bac-2-suite',beat:10,scene:'bac',set:{ex2:1,f:1,dom:0,roots:1,back:0,neg:0,rej:0},sujet:'écarter une racine négative',
  text:[`Le trinôme a pour racines <i>t</i> = ${R2.r2} et <i>t</i> = ${fr(R2.r1,0)}.`,{t:'Quel est l’ensemble des solutions ?',fort:true}],
  pari:{...VF([
    [`S = {ln ${R2.r2}}`,true,`Oui : <i>t</i> = eˣ > 0 écarte <i>t</i> = ${fr(R2.r1,0)}, et eˣ = ${R2.r2} équivaut à <i>x</i> = ln ${R2.r2}.`],
    [`S = {ln ${R2.r2} ; ln(${fr(R2.r1,0)})}`,false,`Tu as gardé <i>t</i> = ${fr(R2.r1,0)}. Mais <i>t</i> = eˣ > 0, et ln(${fr(R2.r1,0)}) n’existe pas.`,`t = eˣ doit être strictement positif. Que devient la racine ${fr(R2.r1,0)} ?`],
    [`S = {ln ${R2.r2} ; −ln ${-R2.r1}}`,false,`e<sup>−ln ${-R2.r1}</sup> = 1/${-R2.r1}, pas ${fr(R2.r1,0)}. Aucun <i>x</i> ne donne eˣ = ${fr(R2.r1,0)}.`,`Calcule e^(−ln ${-R2.r1}) : vaut-il ${fr(R2.r1,0)} ?`]]),reveal:[{p:{dom:1},d:700},{p:{rej:1,back:1},d:1000}]}},
{cle:'bac-2-ineq',beat:10,scene:'bac',set:{ex2:1,f:1,dom:0,roots:1,back:0,neg:1,rej:0},sujet:'une inéquation en eˣ, avec une racine négative',
  text:['Même exercice type, avec une inéquation.',{t:'Quel est l’ensemble des solutions ?',fort:true}],
  tex:[[`e^{2x}-e^{x}-6\\le 0`,'e^(2x) − eˣ − 6 ≤ 0']],
  pari:{...VF([
    [NW(`]−∞ ; ln ${R2.r2}]`),true,`Oui : le trinôme est négatif pour ${fr(R2.r1,0)} ≤ <i>t</i> ≤ ${R2.r2}. Comme <i>t</i> = eˣ > 0, il reste eˣ ≤ ${R2.r2}, soit <i>x</i> ≤ ln ${R2.r2}.`],
    [NW(`[${fr(R2.r1,0)} ; ${R2.r2}]`),false,`Tu as donné l’ensemble des <i>t</i>. Il faut revenir à <i>x</i> avec <i>t</i> = eˣ, et <i>t</i> > 0 écarte les valeurs négatives.`,'On a posé t = eˣ. Cet ensemble est-il celui des x ?'],
    [NW(`]0 ; ln ${R2.r2}]`),false,`Tu as confondu <i>t</i> > 0 et <i>x</i> > 0. C’est <i>t</i> = eˣ qui est positif : <i>x</i> = −1 convient, car e<sup>−1</sup> ≈ ${fr(EXP_MOINS1,2)} est dans ]0 ; ${R2.r2}].`,`Essaie x = −1 : eˣ est-il dans ]0 ; ${R2.r2}] ?`]]),reveal:[{p:{dom:1},d:700},{p:{rej:1,back:1},d:1000}]}}

/* ===== 11. bilan ===== */
,{cle:'q1',beat:11,scene:'quiz',set:{qi:0,rv:0},sujet:'e puissance (a + b)',
  text:['Trois pièges des copies, pour finir. Le premier : la somme.',{t:`${M(`e^{${P_SOMME[0]}+${P_SOMME[1]}}`,`e^(${P_SOMME[0]} + ${P_SOMME[1]})`)} est égal à…`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    [M(`e^{${P_SOMME[0]}}\\times e^{${P_SOMME[1]}}`,`e^${P_SOMME[0]} × e^${P_SOMME[1]}`),true,`Oui : e<sup>${P_SOMME[0]}+${P_SOMME[1]}</sup> = e<sup>${P_SOMME[0]}</sup> × e<sup>${P_SOMME[1]}</sup> = e<sup>${P_SOMME[0]+P_SOMME[1]}</sup>. L’addition des exposants devient un produit.`],
    [M(`e^{${P_SOMME[0]}}+e^{${P_SOMME[1]}}`,`e^${P_SOMME[0]} + e^${P_SOMME[1]}`),false,'Tu as distribué l’exponentielle sur la somme. Une somme dans l’exposant devient un produit.','Teste a = b = 0 : e^(0+0) = 1, mais e⁰ + e⁰ ?'],
    [M(`e^{${P_SOMME[0]*P_SOMME[1]}}`,`e^${P_SOMME[0]*P_SOMME[1]}`),false,`Tu as multiplié les exposants. Dans e<sup>${P_SOMME[0]}</sup> × e<sup>${P_SOMME[1]}</sup>, ils s’additionnent : e<sup>${P_SOMME[0]+P_SOMME[1]}</sup>.`,'Dans eᵃ × eᵇ, les exposants s’additionnent ou se multiplient ?']])}},
{cle:'q2',beat:11,scene:'quiz',set:{qi:1,rv:0},sujet:'le signe d’un produit avec eˣ',
  text:['Le deuxième : le signe.',{t:`Sur ℝ, ${M('(x-2)\\,e^{x}','(x − 2) eˣ')} a le signe de…`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    ['<i>x</i> − 2',true,'Oui : eˣ > 0 ne change pas le signe du produit. (<i>x</i> − 2)eˣ a le signe de <i>x</i> − 2.'],
    ['toujours positif, car eˣ > 0',false,'Un facteur positif ne rend pas le produit positif. Il garde le signe de l’autre facteur, <i>x</i> − 2.','Un produit est positif si ses deux facteurs le sont. x − 2 l’est-il toujours ?'],
    ['eˣ − 2',false,'On ne fait pas entrer le −2 dans l’exponentielle : (<i>x</i> − 2)eˣ n’est pas eˣ − 2.','Le facteur x − 2 multiplie eˣ : est-ce la même chose que soustraire 2 ?']])}},
{cle:'q3',beat:11,scene:'quiz',set:{qi:2,rv:0},sujet:'la dérivée de e puissance moins x',
  text:['Le troisième : la dérivée.',{t:`${M('\\left(e^{-x}\\right)^{\\prime}','(e^(−x))′')} est égal à…`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    [M('-e^{-x}','−e^(−x)'),true,'Oui : <i>u</i> = −<i>x</i> et <i>u</i>′ = −1, donc (e<sup>−<i>x</i></sup>)′ = −e<sup>−<i>x</i></sup>.'],
    [M('e^{-x}','e^(−x)'),false,'Tu as oublié <i>u</i>′ = −1. La dérivée de e<sup><i>u</i></sup> est <i>u</i>′e<sup><i>u</i></sup>.','Quelle est la dérivée de l’exposant −x ?'],
    [M('-x\\,e^{-x-1}','−x e^(−x − 1)'),false,'Tu as appliqué la règle des puissances. L’exposant −<i>x</i> varie : (e<sup><i>u</i></sup>)′ = <i>u</i>′e<sup><i>u</i></sup>.','Dans e^(−x), qu’est-ce qui varie : la base ou l’exposant ?']])}},
{cle:'fin',beat:11,scene:'end',set:{n:0},seq:[{p:{n:5},d:3000,w:300}],
  text:['Fin de la séance « Pourquoi exp ».'],html:()=>profileHTML()}
/*__STEPS__*/
];

// une inégalité ne commence jamais une ligne : espace insécable devant < et > (le noyau soude
// déjà =, ≤, ≥…, mais pas < et >)
const insec=s=>typeof s==='string'?s.replace(/ (&lt;|>)(?= )/g,' $1').replace(/ %/g,'\u202F%'):s;
const insecT=v=>typeof v==='function'?()=>insecT(v()):Array.isArray(v)?v.map(insecT):v&&typeof v==='object'&&'t' in v?{...v,t:insec(v.t)}:insec(v);
// « ln » et « exp » en romain (classe fn) : dans la police condensée, « ln » se lit « In »
const roman=v=>typeof v==='function'?()=>roman(v()):Array.isArray(v)?v.map(roman):v&&typeof v==='object'&&'t' in v?{...v,t:fnHTML(v.t)}:fnHTML(v);
STEPS.forEach(st=>{st.text=roman(insecT(st.text));const P=st.pari||st.verifie;
  if(P){P.opts.forEach(o=>{o.t=fnHTML(insec(o.t));o.fb=fnHTML(insec(o.fb));if(o.indice)o.indice=fnHTML(insec(o.indice));});
    if(P.apres&&P.apres.html)P.apres.html=fnHTML(insec(P.apres.html));}
  (st.deriv||[]).forEach(x=>{x.r=fnHTML(insec(x.r));});});

/* ---------- les mots ---------- */
const mots={
  composes:{t:'intérêts composés',d:'Des intérêts qui s’ajoutent au capital, puis rapportent à leur tour. Avec 100 % par an versés en une fois, 1 devient 2. Versés en deux fois, 50 % puis 50 % du nouveau capital, 1 devient 1,5 puis 2,25.'},
  bijection:{t:'bijection',d:'Une fonction est une bijection de A sur B quand chaque nombre de B est atteint exactement une fois. ln est une bijection de '+I0+' sur ℝ : à chaque réel <i>k</i> correspond un seul <i>x</i> > 0 tel que ln <i>x</i> = <i>k</i>.'},
  reciproque:{t:'réciproque',d:'La réciproque d’une bijection <i>f</i> la défait : elle associe à <i>y</i> l’unique <i>x</i> tel que <i>f</i>(<i>x</i>) = <i>y</i>. Dans un repère orthonormé, les courbes de <i>f</i> et de sa réciproque sont symétriques par rapport à la droite <i>y</i> = <i>x</i>.'},
  asymptote:{t:'asymptote',d:'Une droite dont la courbe se rapproche autant qu’on veut, sans la couper forcément. Ici, la courbe de exp s’approche de l’axe horizontal <i>y</i> = 0 quand <i>x</i> tend vers −∞.'},
  tangente:{t:'tangente',d:'La droite qui touche la courbe en un point en suivant sa direction. Sa pente est la dérivée en ce point : en 0, la tangente à exp a pour pente e<sup>0</sup> = 1.'},
  trinome:{t:'trinôme',d:'Une expression <i>at</i><sup>2</sup> + <i>bt</i> + <i>c</i>, avec <i>a</i> ≠ 0. On cherche ses racines avec le discriminant. Entre ses racines, il a le signe contraire de <i>a</i>.'},
  discriminant:{t:'discriminant',d:'Pour <i>at</i><sup>2</sup> + <i>bt</i> + <i>c</i> = 0, c’est Δ = <i>b</i><sup>2</sup> − 4<i>ac</i>. Si Δ > 0, il y a deux racines : (−<i>b</i> ± √Δ)/(2<i>a</i>).'},
  composee:{t:'fonction composée',d:'La composée <i>f</i>∘<i>u</i> applique d’abord <i>u</i>, puis <i>f</i> : (<i>f</i>∘<i>u</i>)(<i>x</i>) = <i>f</i>(<i>u</i>(<i>x</i>)). Sa dérivée est <i>u</i>′ × <i>f</i> ′(<i>u</i>).'},
  indetermine:{t:'forme indéterminée',d:'Une limite dont le résultat ne se lit pas directement, comme 0/0 ou ∞/∞. Elle demande un calcul : un taux d’accroissement, une factorisation, une règle de croissances comparées.'},
  'preuve-ex':{t:'la preuve de eˣ/x → +∞',d:'Pour <i>x</i> > 0, la tangente en 0 appliquée à <i>x</i>/2 donne e<sup><i>x</i>/2</sup> ≥ <i>x</i>/2 + 1 > <i>x</i>/2. Les deux membres sont positifs : on les élève au carré, eˣ > <i>x</i><sup>2</sup>/4. Donc eˣ/<i>x</i> > <i>x</i>/4, qui tend vers +∞.'},
  exponentielle:{t:'exponentielle',d:'La fonction exponentielle népérienne, notée exp, est la réciproque de ln : exp(<i>x</i>) est le nombre dont le ln vaut <i>x</i>. On écrit aussi e<sup><i>x</i></sup>.'}
};
Object.values(mots).forEach(m=>{m.d=fnHTML(insec(m.d));});

/* ---------- la fin de séance ---------- */
function profileHTML(){
  const Q=[['q1','la somme dans l’exposant','exercice 1'],['q2','le signe avec eˣ','exercice 7'],['q3','la dérivée de e<sup><i>u</i></sup>','exercice 8']];
  const res=Q.map(([k])=>ctx.juste(k));
  const V=STEPS.filter(s=>s.verifie),vok=V.filter(s=>ctx.juste(s.k)===true).length;
  const r=k=>ctx.rep(k),paris=[];
  if(r('fortune')!=null)paris.push(r('fortune')===1?'tu avais vu le plafond de Bernoulli':'le plafond de Bernoulli t’a surpris');
  if(ctx.juste('domaine-exp')!=null)paris.push(ctx.juste('domaine-exp')?'tu savais exp toujours positive':'exp toujours positive t’a surpris');
  if(r('tangente0')!=null)paris.push(r('tangente0')===0?'tu avais vu la courbe au-dessus de sa tangente':'la courbe au-dessus de sa tangente t’a surpris');
  if(r('course')!=null)paris.push(r('course')===0?'tu avais vu eˣ l’emporter sur x':'eˣ qui l’emporte sur x t’a surpris');
  const ligne=`« Vérifie » réussies du premier coup : ${vok} sur ${V.length}.${paris.length?` Tes paris : ${paris.join(' ; ')}.`:''}`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]} : ${Q[i][2]}</li>`).join('')
    +'<li>· oublier t = eˣ > 0 dans une équation : exercice 5</li>'
    +'<li>· revenir de t à x dans une inéquation : exercice 6</li>'
    +'<li>· les limites de base, dont x eˣ en −∞ : exercice 9</li>';
  const seance2=['l’étude complète d’une fonction avec exp : branches infinies, asymptote oblique, position relative','les limites habillées, comme (e<sup><i>kx</i></sup> − 1)/<i>x</i>','les primitives de <i>u</i>′e<sup><i>u</i></sup>','en SM seulement : aˣ = e<sup><i>x</i> ln <i>a</i></sup>, xᵃ et la racine <i>n</i>-ième'];
  return ty(`<p class="res">${ligne}</p><a class="lien-exos" href="/pilote/exponentielle/exercices">Faire les exercices →</a>`
    +`<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>`
    +`<div class="next"><div class="pari-k">La prochaine séance : exp comme fonction</div><ol>${seance2.map(x=>`<li>${x}</li>`).join('')}</ol></div>`
    +`<p class="small">Ses exercices sont déjà prêts, rangés à part à la fin de la page d’exercices.</p></details>`);
}

/* ---------- contrôles par étape ---------- */
S.nOk=false;S.nMontre=false;S.nEssais=0;S.nDispo=false;
const resetS=()=>{S.nOk=false;S.nMontre=false;S.nEssais=0;S.nDispo=false;};
// le test de « Ce qu'il faut savoir », réussi du premier coup : on peut passer le rappel
function majSaut(){const z=root.querySelector('#saut'),st=ctx.etape();if(!z||!st||st.cle!=='savoir')return;
  if(ctx.juste('savoir')===true&&!z.innerHTML)z.innerHTML=`<p class="ctl-note">${ty('Tu connais la règle : tu peux passer le rappel.')}</p><button type="button" class="lg-saut" data-aller="bernoulli">Passer à l’énigme →</button>`;}
let minuteur=null;
const CTL={
  saut:{html:()=>'<div id="saut"></div>',init(){majSaut();}},
  // n : le curseur à crans de l'énigme ; « Montre-moi » après deux essais ou vingt secondes ; l'étape attend n ≥ 365
  n:{html:()=>`<div class="ctl"><label class="sl"><span><i>n</i> = <output id="on"></output></span><input id="rn" type="range" min="0" max="${CRANS.length-1}" step="1"></label></div><p class="ctl-note" id="nfb"></p><button type="button" class="ctl-btn alt${S.nDispo&&!S.nOk&&!S.nMontre?'':' lg-cache'}" id="montre"${S.nMontre||S.nOk?' disabled hidden':''}>Montre-moi</button>`,
    init(){const sc=scenes.interets,rn=$('#rn'),bt=$('#montre');
      const idx=()=>CRANS.reduce((m,v,i)=>Math.abs(v-sc.p.n)<Math.abs(CRANS[m]-sc.p.n)?i:m,0);
      const dispo=()=>{if(S.nOk||S.nMontre)return;S.nDispo=true;const b=$('#montre');if(b)b.classList.remove('lg-cache');};
      const sync=()=>{const n=Math.round(sc.p.n);rn.value=idx();$('#on').textContent=ent(n);
        if(n>=SEUIL_N&&!S.nOk&&!S.nMontre){S.nOk=true;bt.disabled=true;bt.hidden=true;ctx.majNav();}
        $('#nfb').innerHTML=ty(S.nOk||S.nMontre?`Le capital gagne de moins en moins : de <i>n</i> = ${ent(SEUIL_N)} à <i>n</i> = ${ent(CRANS[CRANS.length-1])}, il ne monte que de ${fr(GAIN_PLAFOND,3)}.`:'Fais glisser <i>n</i> vers la droite. Que devient le capital ?');};
      // le curseur attend le pari : manipulé avant, il donnerait la réponse (G-01-012)
      const libre=()=>{rn.disabled=ctx.rep('fortune')==null;};libre();
      root.querySelectorAll('#body .opt').forEach(o=>o.addEventListener('click',()=>setTimeout(libre,0)));
      rn.addEventListener('input',()=>{ctx.stop();sc.p.n=CRANS[+rn.value];sc.p.stair=1;sc.p.fin=1;sc.render();sync();});
      rn.addEventListener('change',()=>{if(S.nOk||S.nMontre)return;S.nEssais++;if(S.nEssais>=2)dispo();});
      bt.addEventListener('click',()=>{if(S.nOk||S.nMontre)return;S.nMontre=true;bt.disabled=true;bt.hidden=true;ctx.majNav();ctx.tween(sc,{n:SEUIL_N},1300).then(sync);sync();});
      hooks.frame=sync;sync();
      clearTimeout(minuteur);minuteur=setTimeout(()=>{const st=ctx.etape();if(st&&st.cle==='curseur')dispo();},20000);}},
  // k : la droite y = k coupe la courbe de ln en un seul point
  k:{html:()=>`<div class="ctl"><label class="sl"><span><i>k</i> = <output id="ok"></output></span><input id="rk" type="range" min="-2.5" max="2" step="0.1"></label></div><p class="ctl-note" id="kfb"></p>`,
    init(){const sc=scenes.miroir,rk=$('#rk');
      const sync=()=>{rk.value=sc.p.k;$('#ok').textContent=fr(sc.p.k,1);
        $('#kfb').innerHTML=ty(`La droite coupe la courbe en un seul point, d’abscisse <i>x</i> ≈ ${fr(Math.exp(sc.p.k),2)}.`);};
      rk.addEventListener('input',()=>{ctx.stop();sc.p.k=+rk.value;sc.p.kOn=1;sc.render();sync();});
      hooks.frame=sync;sync();}},
/*__CTL__*/
};
// « Passer à l'énigme » ; après un choix (clic ou touche), le noyau a rendu la réponse
const surClicL=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');
  if(b&&root.contains(b)){const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0)ctx.aller(i);return;}
  setTimeout(majSaut,0);};
const surToucheL=()=>setTimeout(majSaut,0);
root.addEventListener('click',surClicL);window.addEventListener('keydown',surToucheL);

return {BEATS,STEPS,CTL,mots,profileHTML,
  reset(){resetS();},
  plain:s=>s.replace(/1\/n/g,'1 sur n').replace(/1,01/g,'1 virgule 01').replace(/⇔/g,' équivaut à ').replace(/\+∞/g,' plus l’infini').replace(/−∞/g,' moins l’infini').replace(/e\^/g,'e puissance '),
  demonter(){clearTimeout(minuteur);root.removeEventListener('click',surClicL);window.removeEventListener('keydown',surToucheL);}};
});
}
