/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Le dipôle RL », V3 (plan : docs/refonte/specs/dipole-rl.md ; la section 0 du plan dit ce qui a été livré).
 *
 * Treize parties, 50 étapes : ce qu'il faut savoir (sautable), l'énigme (deux lampes dont l'une traîne, et
 * l'étincelle de Henry), la bobine (u = r i + L di/dt, le triangle, L et r), l'établissement du courant, l'équation
 * différentielle, sa solution (transférée de RC, vérifiée une fois), la constante de temps (la figure-clé :
 * i(t) et u_L(t) au même instant ; ce que changent R, L et E), la rupture et la surtension, l'énergie (sautable
 * en SVT pour l'établissement), la mesure à l'oscilloscope, le retour à l'énigme, deux sujets du bac (2023,
 * 2024), le bilan.
 *
 * Les scènes vivent dans dipole-rl-scenes-{a,b,c,d}.js, les données sourcées et les calculs dans
 * dipole-rl-outils.js : AUCUN nombre affiché n'est écrit à la main ici, il vient d'un calcul ou d'une
 * donnée sourcée. Le déroulé, les paris et les dérivations sont dans noyau.js.
 *
 * Ce qui reste local : les quatre curseurs (`rl`), le curseur de temps (`temps`), les boutons « passer » (ce qu'il
 * faut savoir ; l'établissement de l'énergie en SVT).
 */
import { monterLecon } from "./noyau";
import {
  fr, sciH, TN, outilsRl,
  E_V, R_OHM, R_BOB, L_H, RT, I0, TAU, T_MAX, UL_INF, UR_INF, DI0, tauDe, iEt, P63, P37, I_63, I_37, T_FAUX37, T_HALF, MOITIE, DUREE_5, PART_5,
  UL_TAU, N_PAS, DT_PAS, REDUC, iPas, dIPas, pente, uRPas, rIPas, I_10, I_10_EXACT, R2_OHM, UL_RUP0, UL_SURT, TAU_SURT, RAPPORT_TAU, R_MAILLE_SURT,
  EM_1, EM_2, FOIS_ENERGIE, TRI, T_I0, PT, SAV, RAPPEL, BR, CRANS_L, CRANS_R, CRANS_r, CRANS_E, S23, S24, S20, Q3, HENRY_PIEDS, HENRY_FIL_M, chargePart, dechPart,
} from "./dipole-rl-outils";
import { scenesA } from "./dipole-rl-scenes-a";
import { scenesB } from "./dipole-rl-scenes-b";
import { scenesC } from "./dipole-rl-scenes-c";
import { scenesD } from "./dipole-rl-scenes-d";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,clamp,scenes,S,defs}=ctx;
const $=ctx.$;
const tx=String.raw;
const O=outilsRl(ctx);

[['rlarw','s-ink'],['rlarwA','s-a']].forEach(([id,c])=>{const mk=E('marker',{id,viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'6',markerHeight:'6',orient:'auto-start-reverse'},defs);E('path',{d:'M0 0L10 5L0 10z',class:c},mk);});
E('rect',{x:100,y:130,width:830,height:480},E('clipPath',{id:'rlclip-courbe'},defs));

/* ---------- les nombres du texte, tous calculés ---------- */
const d1=x=>fr(x,1), d2=x=>fr(x,2), pc=x=>fr(x*100,0);
const Ev=fr(E_V,0), Rv=fr(R_OHM,0), rv=fr(R_BOB,0), Lv=fr(L_H,2), RTv=fr(RT,0);
const i0mA=fr(I0*1e3,0), tauS=d1(TAU*1e3), t5=fr(DUREE_5*1e3,0), ulInf=d1(UL_INF), urInf=d1(UR_INF), di0=fr(DI0,0);
const i63=fr(I_63*1e3,0), i37=fr(I_37*1e3,0), tFaux37=d1(T_FAUX37*1e3), tHalf=d1(T_HALF*1e3), iMoitie=fr(MOITIE*1e3,0);
const p63=pc(P63), p37=pc(P37), p99=fr(PART_5,0), p5r=fr(dechPart(5)*100,1);
const dtp=d1(DT_PAS*1e3), dI1=fr(dIPas(1)*1e3,0), dI2=d1(dIPas(2)*1e3), uR1=d1(uRPas(1)), rI1=d1(rIPas(1)), reste1=d1(E_V-uRPas(1)-rIPas(1)), pen2=fr(pente(2),0), redP=fr(REDUC,1);
const i10=d1(I_10*1e3), i10x=d1(I_10_EXACT*1e3), ulTau=d1(UL_TAU);
const tauL2=d1(tauDe(R_OHM,R_BOB,2*L_H)*1e3), RT2=fr(2*R_OHM+R_BOB,0), pal2R=d1(E_V/(2*R_OHM+R_BOB)*1e3), tau2R=d1(tauDe(2*R_OHM,R_BOB,L_H)*1e3), pal12=fr(2*E_V/RT*1e3,0);
const Ev2=fr(2*E_V,0), Lv2=fr(2*L_H,2), Rv2=fr(2*R_OHM,0), R2k=d1(R2_OHM/1e3), kOhm=fr(R_MAILLE_SURT,0);
const ulRup=d1(-UL_RUP0), ulSurt=fr(-UL_SURT,0), tauSurt=d2(TAU_SURT*1e3), rapTau=fr(RAPPORT_TAU,0), iERmA=fr(E_V/R_OHM*1e3,0);
const em1=d1(EM_1*1e3), em2=d1(EM_2*1e3), emFois=fr(FOIS_ENERGIE,0);
const triI=fr(TRI.imax*1e3,0), triT=d1(TRI.demi*1e3), triP=d1(TRI.pente), triU=d1(TRI.uPente), triUb=d1(TRI.uBout), triDi=fr(TRI.di,3);
const sciL=x=>sciH(x,1).replace(/<sup>(.*?)<\/sup>/,'<sup>$1</sup>');
const kOhmW=fr(R_MAILLE_SURT,0);

/* ---------- les pièges des copies qui se jouent sur la scène « quiz » ---------- */
const QUIZ=[
  {titre:'',tag:'',big:`*τ* = *L*/*R* = ${Lv}/${Rv} = ${d1(L_H/R_OHM*1e3)} ms`,sub:'la copie',r1:'*r* est dans la maille : la résistance totale est *R* + *r*',r2:`*τ* = *L*/(*R* + *r*) = ${tauS} ms`},
  {titre:'',tag:'',big:'régime permanent : *i* constant',sub:'une bobine réelle, de résistance *r*',r1:'d*i*/d*t* = 0 : il reste *u* = *r* *i*',r2:'la bobine se comporte comme un conducteur ohmique de résistance *r*'},
  {titre:'',tag:'',big:`*L* = ${fr(Q3.L*1e3,0)} mH, *R* = ${fr(Q3.R,0)} Ω, *r* = ${fr(Q3.r,0)} Ω`,sub:'*τ* = ?',r1:`${fr(Q3.L*1e3,0)} mH = ${fr(Q3.L,2)} H : on convertit d’abord`,r2:`*τ* = *L*/(*R* + *r*) = ${d2(Q3.tau*1e3)} ms`},
];
scenesA(ctx,O);
scenesB(ctx,O);
scenesC(ctx,O,QUIZ);
scenesD(ctx,O);

/* ---------- des écritures pour le panneau ---------- */
const uLh='<i>u</i><sub>L</sub>', uRh='<i>u</i><sub>R</sub>', Eh='<i>E</i>', Rh='<i>R</i>', rh='<i>r</i>', Lh='<i>L</i>', ih='<i>i</i>', th_='<i>τ</i>', I0h='<i>I</i><sub>0</sub>', Emh='<i>E</i><sub>m</sub>';
const dIdt='d<i>i</i>/d<i>t</i>';
const eTau='e<sup>−<i>t</i>/<i>τ</i></sup>';

/* les lettres des grandeurs, en italique partout dans le panneau (texte, options, retours, indices) :
   une seule passe, hors des balises et des fiches [[mot]] */
const IX={'E_m':Emh,'di/dt':dIdt,'du_C/dt':'d<i>u</i><sub>C</sub>/d<i>t</i>','u_C':'<i>u</i><sub>C</sub>','u_L':uLh,'u_R':uRh,'R₁':'<i>R</i><sub>1</sub>','R₂':'<i>R</i><sub>2</sub>','L₁':'<i>L</i><sub>1</sub>','L₂':'<i>L</i><sub>2</sub>','i²':'<i>i</i><sup>2</sup>','e^(−t/τ)':eTau,'e^0':'e<sup>0</sup>','I₀':I0h,'E':Eh,'R':Rh,'r':rh,'L':Lh,'i':ih,'τ':th_};
// une lettre seule (E, R, r, L, i) ne devient une variable que si aucune lettre, chiffre ou apostrophe ne la touche : « résistance » garde son r
const IXRE=/(^|[^\p{L}\p{N}_])(E|R|r|L|i)(?![\p{L}\p{N}_’'])|E_m|di\/dt|du_C\/dt|u_C|u_L|u_R|R₁|R₂|L₁|L₂|i²|e\^\(−t\/τ\)|e\^0|I₀|τ/gu;
const ix=s=>typeof s!=='string'?s:s.split(/(<sub>.*?<\/sub>|<sup>.*?<\/sup>|<i>.*?<\/i>|<[^>]+>|\[\[[^\]]*\]\])/).map((p,i)=>i%2?p:p.replace(IXRE,(m,pre,lettre)=>lettre?pre+IX[lettre]:IX[m]||m)).join('');

// un pari : neutre à l'écran ; `juste` (3ᵉ case) ne sert qu'au profil de fin
const BET=t=>({opts:t.map(([x,fb,j])=>({t:ix(x),fb:ix(fb),juste:!!j}))});
// une question : une bonne réponse ; chaque option fausse a son explication et son indice (second essai)
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>({t:ix(x),ok,fb:ix(fb),indice:ix(indice)}))});
// un bouton « passer » : seulement si la question d'entrée est réussie du premier coup
const saut=(cle,vers,oui,non)=>({get html(){return ctx.juste(cle)?`<button type="button" class="ctl-btn alt saut" data-aller="${vers}">${oui} →</button>`:`<p class="small">${non}</p>`;}});
// un texte d'après qui dépend d'un pari de l'élève (lu au moment de l'affichage)
const dyn=f=>({get html(){return f();}});

/* les états de scène : chaque étape les donne en entier, rien ne se hérite à l'aveugle */
const CI=o=>({jeu:'rl',K:1,t:0,fi:0,fu:0,fr:0,fe:0,fa:'',ch:1,osc:0,rv:0,sub:'',...o});
const CV=o=>({jeu:'etab',xmax:30,ym:120,curve:0,exact:0,Pline:0,pas:0,tan:0,p63:0,ghL:0,ghR:0,base:0,L:L_H,R:R_OHM,r:R_BOB,E:E_V,live:0,pts:0,rep:0,sub:'',...o});
const DR=o=>({jeu:'rampe',line:1,pt:0,tri:0,sub:'',...o});
// la scène couplée (circuit + i(t) + u_L(t)) : l'instant t pilote tout ; `dis` : 0 l'établissement, 1 la rupture (K en position 2) ;
// `ic` : ce qui dit i, `ul` : ce qui dit u_L, cachés tant qu'une question les demande
const CP=o=>({jeu:'etab',t:0,dis:0,ic:0,ul:1,r2:0,ech:0,tau1:0,lect:0,trans:0,...o});
const T6=T_MAX, TMT=4*TRI.demi;
const ALL={fi:1,fu:1,fr:1,fe:1};

/* ---------- les rappels qui dépendent d'un pari ---------- */
function rappelLampes(){const j=S.first['deux-lampes'];if(j==null)return '';
  return ['Tu avais parié que les deux lampes s’allument ensemble : L₂ part de 0 et monte, elle traîne.','Tu avais parié juste : L₂ s’allume en retard, puis brille comme L₁.','Tu avais parié que L₂ ne s’allume jamais : le courant monte vers E/(R + r), elle brille.'][j];}
function rappelAllure(){const j=S.first.allure;if(j==null)return '';
  return ['Tu avais parié que i saute à sa valeur finale : il part de 0, sans saut.','Tu avais parié une montée en ligne droite : la pente baisse à mesure que i monte.','Tu avais parié une montée de plus en plus lente : c’est ce que les pas viennent de construire.'][j];}
function rappelEtincelle(){const j=S.first.etincelle;if(j==null)return '';
  return ['Tu avais parié que l’étincelle jaillit au contact : au contact, i part de 0 et rien ne claque.','Tu avais parié juste : l’étincelle jaillit à la rupture seulement.','Tu avais parié que les deux étincelles se valent : au contact, i part de 0 ; à la rupture, il est forcé.','Tu avais parié qu’une pile ne fait pas d’étincelle : à la rupture, la tension monte bien plus haut que celle de la pile.'][j];}

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'La bobine',court:'Bobine'},
  {name:'L’établissement du courant',court:'Courant'},{name:'L’équation',court:'Équation'},{name:'La solution',court:'Solution'},
  {name:'La constante de temps',court:'τ'},{name:'La rupture',court:'Rupture'},{name:'L’énergie',court:'Énergie'},
  {name:'Mesurer',court:'Mesurer'},{name:'Retour à l’énigme',court:'Retour'},{name:'Au bac',court:'Au bac'},{name:'Bilan',court:'Bilan'}];

const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'sav-test',beat:0,scene:'circuit',set:CI({K:0}),sujet:'la charge d’un condensateur, à τ',
  text:[`Ce qu’il faut savoir : juste du premier coup, tu passes à l’énigme.`,`Un dipôle RC est chargé sous E = ${fr(SAV.E,0)} V, avec τ = RC = ${d1(SAV.tau*1e3)} ms. À <i>t</i> = ${d1(SAV.tau*1e3)} ms, u_C vaut…`],
  verifie:{...VF([
    [`environ ${d1(SAV.u)} V : ${p63} % de E`,true,`Oui : à <i>t</i> = τ, 63 % de E sont atteints, soit ${d1(SAV.u)} V.`],
    [`${fr(SAV.E,0)} V : la charge est finie`,false,`Tu as pris τ pour la fin de la charge. À τ, la tension atteint ${p63} % de E seulement.`,'Quelle part de E est atteinte à <i>t</i> = τ ?'],
    [`environ ${d1(SAV.uFaux37)} V : ${p37} % de E`,false,`Tu as appliqué le repère ${p37} % à une montée. À τ, ${p63} % sont atteints ; ${p37} %, c’est ce qui reste.`,'À la charge, 37 % est-il ce qui est atteint, ou ce qui reste ?']]),
    apres:saut('sav-test','deux-lampes','Je le sais : passer à l’énigme','La suite te le rappelle.')}},
{cle:'sav-rappel',beat:0,scene:'circuit',set:CI({K:1,t:0.5}),
  text:[`Deux rappels avant d’avancer. Un solénoïde parcouru par un courant crée un champ magnétique, d’autant plus intense que le courant est grand.`,
    `Et un taux de variation : si i passe de 0 à ${d1(RAPPEL.di)} A en ${fr(RAPPEL.dt*1e3,0)} ms, Δi/Δt = ${fr(RAPPEL.taux,0)} A·s⁻¹.`]},

/* ===== 1. l'énigme ===== */
{cle:'deux-lampes',beat:1,scene:'circuit',set:CI({jeu:'lampes',K:0,t:0}),
  text:['Un générateur, un interrupteur K et deux branches en parallèle : un schéma de principe.',`La lampe L₁ est en série avec un conducteur ohmique ; la lampe L₂, avec une bobine de même résistance.`,'Tu fermes K. Que voit-on ?'],
  pari:{reveal:[{p:{K:1},d:500},{p:{t:1},d:3400}],...BET([
    ['les deux lampes s’allument ensemble : même résistance, même courant','Juste pour la fin : les deux lampes finissent pareilles. Mais au début, L₂ traîne.'],
    ['L₂ s’allume en retard, puis brille autant que L₁','Oui : la bobine retarde l’établissement du courant sans l’empêcher. La suite explique pourquoi.',1],
    ['L₂ ne s’allume jamais : la bobine bloque le courant','Tu as pris la bobine pour un obstacle. Elle retarde le courant, elle ne le bloque pas : L₂ finit par briller comme L₁.']])}},
{cle:'etincelle',beat:1,scene:'circuit',tag:'1832',set:CI({jeu:'henry',rv:0}),
  text:[`Joseph Henry, 1832 : une pile, deux coupelles de mercure, et un long fil de ${fr(HENRY_PIEDS[0],0)} à ${fr(HENRY_PIEDS[1],0)} pieds, soit de ${fr(HENRY_FIL_M[0],0)} à ${fr(HENRY_FIL_M[1],0)} mètres, enroulé en hélice.`,
    'Il établit le contact en plongeant le fil dans le mercure, puis le rompt en le retirant.','Où voit-il une étincelle ?'],
  pari:{reveal:[{p:{rv:1},d:1100},{p:{rv:2},d:1700}],
    apres:{html:'<p class="small">Récit de Henry, American Journal of Science, 1832 (reproduit par le Joseph Henry Project, Princeton).</p><p><b>Pourquoi au moment où l’on coupe, et pas quand on branche ? La réponse est à la fin de la partie sur la rupture.</b></p>'},
    ...BET([
    ['au contact seulement','Tu as pensé que l’étincelle vient de la fermeture du circuit. Henry n’en voit aucune quand il établit le contact : elle jaillit quand il le rompt.'],
    ['à la rupture seulement','Oui : aucune étincelle à l’établissement, une vive étincelle à la rupture, un peu plus vive quand le fil est enroulé en hélice.',1],
    ['aux deux, pareilles','Tu as supposé que le contact et la rupture se valent. Au contact, rien ; à la rupture seulement, une vive étincelle.'],
    ['nulle part : une pile est trop faible','Tu as pensé qu’une pile ne peut pas donner d’étincelle. À la rupture, avec un long fil, Henry en voit une.']])}},

/* ===== 2. la bobine ===== */
{cle:'bobine',beat:2,scene:'circuit',set:CI({jeu:'bobine'}),sujet:'la résistance r de la bobine',
  text:['Une [[bobine]] est un fil conducteur enroulé en spires. Deux grandeurs la décrivent : son [[inductance]] L, en [[henry|henrys]] (H), et la résistance r de son fil, en ohms.','En convention récepteur, la tension à ses bornes s’écrit :','Dans cette expression, r est…'],
  tex:[[tx`u=r\,i+L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}`,'u = r i + L di/dt']],
  verifie:{...VF([
    ['la résistance du fil de la bobine',true,'Oui : r est dans la bobine elle-même, on ne peut pas l’enlever.'],
    ['une résistance qu’on ajoute en série dans le montage',false,'Tu as confondu r et le conducteur ohmique R. r est dans la bobine elle-même : on ne peut pas l’enlever.','Peut-on retirer r du montage ?'],
    ['nulle pour une bonne bobine : on l’oublie toujours',false,'Tu as supposé que r vaut 0. Les sujets donnent r, ou demandent de la mesurer.','Un fil de cuivre enroulé a-t-il une résistance ?']])}},
{cle:'convention',beat:2,scene:'circuit',set:CI({jeu:'rl',K:1,t:0.4,fi:1,fa:'i'}),sujet:'la convention récepteur',
  text:['Le courant i entre par le haut de la bobine : sa flèche pointe vers le bas.','En [[conventionrecepteur|convention récepteur]], la flèche de u_L…'],
  verifie:{...VF([
    ['pointe vers le haut, à l’opposé de i',true,'Oui : pour un récepteur, la flèche de tension s’oppose au courant.'],
    ['suit le sens de i, vers le bas',false,'Tu as pris la convention générateur. Pour un récepteur, la flèche de tension s’oppose au courant.','Pour un récepteur, la tension et le courant vont-ils dans le même sens ?'],
    ['se choisit librement : la bobine n’a pas de pôle +',false,'On choisit le sens de i, mais la convention récepteur fixe ensuite la flèche de u_L : à l’opposé de i.','Une fois i orienté, où place-t-on la flèche de la tension d’un récepteur ?']]),
    reveal:[{p:{fu:1,fa:'uL'},d:700},{p:{fr:1,fa:'uR'},d:700}],
    apres:{html:'<p class="small">La flèche de u_R = R i s’oppose aussi à i.</p>'}}},
{cle:'pente-tension',beat:2,scene:'droite',set:DR({jeu:'rampe',line:1,pt:1,tri:1}),sujet:'la tension d’une bobine : L fois la variation de i',
  text:[`Une bobine de résistance négligeable, L = ${Lv} H, est parcourue par un courant qui passe régulièrement de 0 à ${d2(PT.di)} A en ${d1(PT.dt*1e3)} ms.`,'La tension à ses bornes vaut…'],
  verifie:{...VF([
    [`${d1(PT.u)} V : L·Δi/Δt`,true,`Oui : la pente de i vaut ${fr(PT.pente,0)} A·s⁻¹, donc u = ${Lv} × ${fr(PT.pente,0)} = ${d1(PT.u)} V.`],
    [`${d2(PT.uFauxLi)} V : L·i`,false,'Tu as multiplié L par i. La bobine répond à la variation de i, pas à i : u = L Δi/Δt.','La tension d’une bobine dépend-elle de i, ou de sa variation ?'],
    ['0 : une bobine est un simple fil',false,'Tu as pris la bobine pour un simple fil. Tant que i varie, L di/dt n’est pas nul.','Le courant varie-t-il ici ?']]),
    apres:{tex:[[tx`[L]=\dfrac{[U]\,[T]}{[I]}`,'[L] = [U][T]/[I]'],[tx`1\ \mathrm{H}=1\ \mathrm{V\cdot s\cdot A^{-1}}`,'1 H = 1 V·s·A⁻¹']],html:'<p>L’unité d’inductance porte le nom de Joseph Henry : voir la fiche [[henry]].</p>'}}},
{cle:'bobine-reelle',beat:2,scene:'circuit',set:CI({jeu:'bobine'}),sujet:'la bobine réelle en courant constant',
  text:[`La même bobine, de résistance r = ${fr(BR.r,0)} Ω, est traversée par un courant constant de ${d2(BR.i)} A.`,'La tension à ses bornes vaut…'],
  verifie:{...VF([
    [`${d1(BR.u)} V : r·i, car di/dt = 0`,true,`Oui : di/dt = 0, il reste u = r i = ${fr(BR.r,0)} × ${d2(BR.i)} = ${d1(BR.u)} V.`],
    ['0 : plus de variation, plus de tension',false,'Tu as oublié le terme r i. Quand di/dt = 0, il reste u = r i.','Reste-t-il un terme dans u = r i + L di/dt quand di/dt = 0 ?'],
    [`${d2(BR.uFauxLi)} V : L·i`,false,'Tu as multiplié L par i. L multiplie di/dt, qui est nul ici.','Que multiplie L dans l’expression de u ?']]),
    apres:{html:'<p><b>En courant constant, une bobine réelle se comporte comme un conducteur ohmique de résistance r.</b></p>'}}},
{cle:'triangle',beat:2,scene:'couple',set:CP({jeu:'triangle',t:TMT,ic:1,ul:0}),sujet:'la tension aux bornes d’une bobine parcourue par un courant triangulaire',
  text:[`Travaux pratiques : un générateur impose à la bobine un courant triangulaire, de −${triI} mA à +${triI} mA en ${triT} ms, puis retour.`,'La tension aux bornes de la bobine…'],
  pari:{reveal:[{p:{ul:1},d:1000}],...BET([
    ['est un triangle aussi, comme i','Tu as supposé que u suit i. u = r i + L di/dt dépend surtout de la pente de i, pas de sa valeur.'],
    ['est faite de créneaux : elle change de signe quand la pente de i change',`Oui : la pente de i est constante sur chaque rampe, donc u l’est aussi, au terme r i près (±${d1(TRI.uR)} V).`,1],
    ['est presque nulle : i revient sans cesse à zéro',`Tu as lu la valeur moyenne de i. La pente de i vaut ${triP} A·s⁻¹ : u = L di/dt reste de ${triU} V en valeur absolue.`]])}},
{cle:'triangle-L',beat:2,scene:'couple',set:CP({jeu:'triangle',t:T_I0,ic:1,ul:1}),sujet:'l’inductance lue sur une rampe',
  text:[`Là où i = 0, le terme r·i est nul et u = ${triU} V ; la pente de i vaut ${triP} A·s⁻¹.`,'Que vaut L ?'],
  verifie:{...VF([
    [`${d2(L_H)} H : u divisée par la pente`,true,`Oui : L = u/(di/dt) = ${triU}/${triP} = ${d2(L_H)} H.`],
    [`${fr(TRI.LFauxDt,0)} H : u divisée par Δi`,false,`Tu as divisé u par la variation Δi = ${triDi} A, sans la durée. L = u divisée par la pente, en A·s⁻¹.`,'Faut-il diviser par Δi seul, ou par la pente Δi/Δt ?'],
    [`${d1(TRI.LFauxInv)} H : la pente divisée par u`,false,'Tu as inversé le rapport. L’unité tranche : V divisé par A·s⁻¹ donne des henrys.','L est-elle une tension divisée par une pente, ou l’inverse ?'],
    [`${fr(TRI.LFauxBout,3)} H : u lue en bout de rampe`,false,`Tu as lu u à ${triUb} V, en bout de rampe, où r i s’ajoute. Lis u là où i = 0.`,'Où i est-il nul, pour que r i disparaisse ?']]),
    apres:{html:'<p class="small">r se mesure à part, en courant constant (étape précédente) ou à l’ohmmètre.</p>'}}},

/* ===== 3. l'établissement du courant ===== */
{cle:'allure',beat:3,scene:'courbe',set:CV({jeu:'etab',curve:0}),
  text:[`Le montage de RC, avec la bobine à la place du condensateur : E = ${Ev} V, R = ${Rv} Ω, bobine L = ${Lv} H et r = ${rv} Ω.`,'À <i>t</i> = 0, on ferme K. Prédis i(<i>t</i>).'],
  pari:{reveal:[{p:{curve:1},d:2400}],...BET([
    ['il saute aussitôt à sa valeur finale, comme le courant de RC','Tu as transféré RC à l’envers : c’est la tension du condensateur qui est continue, ici c’est le courant. i part de 0, sans saut.'],
    ['il monte en ligne droite, puis s’arrête net','Tu as imaginé une montée à pente constante. La pente de i diminue à mesure que i monte : la courbe s’aplatit.'],
    ['il part de 0, monte vite, puis de plus en plus lentement','Oui : i part de 0, sans saut, et la montée ralentit.',1]])}},
{cle:'u0',beat:3,scene:'couple',set:CP({t:0,ic:1,ul:0}),sujet:'la tension aux bornes de la bobine à <i>t</i> = 0',
  text:['À <i>t</i> = 0⁺, i est encore nul.','La tension aux bornes de la bobine vaut…'],
  verifie:{...VF([
    [`E = ${Ev} V : tout est sur la bobine`,true,'Oui : u_R = R i = 0, donc toute la tension E est sur la bobine.'],
    ['0 : comme le courant, nulle aussi',false,'Tu as copié i. u_L = E − u_R, et u_R = R i = 0 : toute la tension E est sur la bobine.','Que vaut u_R quand i = 0 ?'],
    [`${ulInf} V : la valeur de r·I₀`,false,'Tu as pris la valeur de fin. r i est nul tant que i = 0 : c’est L di/dt qui vaut E.','Que vaut r i quand i = 0 ?']]),
    reveal:[{p:{ul:1},d:900}],
    apres:{tex:[[tx`L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}(0)=E`,'L di/dt (0) = E'],[tx`\dfrac{\mathrm{d}i}{\mathrm{d}t}(0)=\dfrac{E}{L}=${TN(DI0,0)}\ \mathrm{A\cdot s^{-1}}`,`di/dt (0) = E/L = ${di0} A·s⁻¹`]],
      html:'<p><b>i est continu ; c’est u_L qui saute, de 0 à E. L’inverse du condensateur.</b></p>'}}},
{cle:'pas-pari',beat:3,scene:'courbe',set:CV({jeu:'etab',xmax:5,ym:70,pas:1}),
  text:[`Construisons la courbe par pas de ${dtp} ms. Pendant le premier pas, on garde la pente de départ, ${di0} A·s⁻¹ : i monte de ${dI1} mA.`,`Pendant les ${dtp} ms suivantes, i monte de…`],
  pari:{reveal:[{p:{pas:2},d:900},{p:{pas:N_PAS},d:2400},{p:{exact:1},d:1300}],
    apres:dyn(()=>`<p>${rappelAllure()?rappelAllure()+' ':''}Comme en RC, à chaque pas, le reste à monter est multiplié par ${redP}. Après ${N_PAS} pas, i = ${i10} mA, contre ${i10x} mA pour la courbe exacte : les pas montent un peu trop vite.</p>`),
    ...BET([
    [`${dI1} mA encore : même durée, même montée`,`Tu as gardé la même pente. i a monté, donc u_R et r i aussi : la pente a baissé, et la montée est de ${dI2} mA.`],
    [`moins de ${dI1} mA`,`Oui : u_R = ${uR1} V et r i = ${rI1} V, il reste ${reste1} V pour L di/dt. La pente tombe à ${pen2} A·s⁻¹, la montée à ${dI2} mA.`,1],
    [`plus de ${dI1} mA : la bobine s’est mise en route`,'Tu as supposé que la bobine accélère la montée. Plus i est grand, plus u_R prend de la tension : la pente baisse.']])}},
{cle:'permanent',beat:3,scene:'couple',ctl:'temps',set:CP({t:0,ic:0,ul:0}),seq:[{p:{t:T6},d:4500}],sujet:'le courant en régime permanent',
  text:['Longtemps après la fermeture, i ne varie plus.','Il vaut…'],
  verifie:{...VF([
    [`E/(R + r) = ${i0mA} mA`,true,`Oui : en courant constant, la bobine n’est plus que sa résistance r, en série avec R : i = E/(R + r) = ${i0mA} mA.`],
    [`E/R = ${iERmA} mA`,false,'Tu as oublié r. En courant constant, la bobine est une résistance r en série avec R : i = E/(R + r).','Quelle résistance totale le courant traverse-t-il ?'],
    ['nul : la bobine bloque le courant',false,'Tu as pris la bobine pour un condensateur chargé. Le condensateur chargé bloque ; la bobine laisse passer un courant constant.','Quel dipôle bloque le courant, une fois chargé ?']]),
    reveal:[{p:{ic:1,ul:1,trans:1},d:1300}],
    apres:dyn(()=>`<p>Le [[regime|régime transitoire]] précède le régime permanent : u_L tend vers r·I₀ = ${ulInf} V, pas vers 0.</p>${rappelLampes()?`<p>${rappelLampes()}</p>`:''}`)}},

/* ===== 4. l'équation ===== */
{cle:'ed-maille',beat:4,scene:'circuit',set:CI({jeu:'rl',K:1,t:0.3,...ALL}),sujet:'l’équation différentielle de l’établissement',
  text:['Le même courant i traverse R et la bobine.','K est en position 1. Avec les flèches du schéma :'],
  deriv:[{tex:tx`u_R+u_L=E`,alt:'uR + uL = E',r:'l’additivité des tensions, K en position 1'},{tex:tx`u_R=R\,i`,alt:'uR = R i',r:'la loi d’Ohm'},{tex:tx`u_L=r\,i+L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}`,alt:'uL = r i + L di/dt',r:'la bobine, en convention récepteur'}],
  pari:{label:'L’équation vérifiée par i ?',
    apres:{tex:[[tx`L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}+(R+r)\,i=E`,'L di/dt + (R + r) i = E']],html:'<p class="small">On a remplacé u_R et u_L dans la maille, puis regroupé les termes en i.</p>'},
    ...VF([
    ['L di/dt + (R + r) i = E',true,'Oui : en remplaçant u_R et u_L dans la maille, le terme en i vaut (R + r) i.'],
    ['L di/dt + R i = E',false,'Tu as oublié r, qui est dans u_L. En remplaçant, le terme en i vaut (R + r) i.','Quelle résistance figure dans u_L ?'],
    ['L i + (R + r) di/dt = E',false,'Tu as échangé les rôles. L multiplie la dérivée di/dt ; R + r multiplie i.','Dans u_L, que multiplie L : i ou di/dt ?']])}},
{cle:'ed-forme',beat:4,scene:'circuit',set:CI({jeu:'rl',K:1,t:0.3,...ALL}),sujet:'la forme normalisée de l’équation',
  text:[`Le sujet 2020 (exercice IV, partie I, question 1, ${fr(S20.bareme[0],1)} pt) demande la forme di/dt + ((R + r)/L) i = E/L.`,'On l’obtient en…'],
  tex:[[tx`L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}+(R+r)\,i=E`,'L di/dt + (R + r) i = E']],
  verifie:{...VF([
    ['divisant les deux membres par L',true,'Oui : le coefficient de di/dt devient 1, et celui de i vaut (R + r)/L.'],
    ['multipliant les deux membres par L',false,'Tu as multiplié au lieu de diviser. L’homogénéité tranche : L (R + r) i n’est pas en A·s⁻¹.','Pour que le coefficient de di/dt vaille 1, multiplie-t-on ou divise-t-on par L ?'],
    ['divisant les deux membres par R + r',false,'C’est une autre forme, celle où le coefficient de i vaut 1. Le sujet veut celui de di/dt égal à 1.','Quel coefficient doit valoir 1 : celui de i ou celui de di/dt ?']]),
    apres:{tex:[[tx`\dfrac{\mathrm{d}i}{\mathrm{d}t}+\dfrac{R+r}{L}\,i=\dfrac{E}{L}`,'di/dt + ((R + r)/L) i = E/L']],html:'<p class="small">La forme du sujet 2024, di/dt = −((R₁ + r)/L) i + E/L, est la même.</p>'}}},
{cle:'meme-equation',beat:4,scene:'circuit',set:CI({jeu:'rl',K:1,t:0.5,...ALL}),sujet:'le transfert de la solution de RC',
  text:['Divise plutôt par R + r. En RC, l’équation s’écrivait RC du_C/dt + u_C = E.','Sans calcul, i(<i>t</i>) = ?'],
  tex:[[tx`\dfrac{L}{R+r}\,\dfrac{\mathrm{d}i}{\mathrm{d}t}+i=\dfrac{E}{R+r}`,'(L/(R + r)) di/dt + i = E/(R + r)'],[tx`RC\,\dfrac{\mathrm{d}u_C}{\mathrm{d}t}+u_C=E`,'RC duC/dt + uC = E']],
  verifie:{...VF([
    ['E/(R + r) × (1 − e^(−t/τ)), avec τ = L/(R + r)',true,'Oui : i joue le rôle de u_C, et E/(R + r) celui de E. L/(R + r) joue celui de RC.'],
    ['E/(R + r) × e^(−t/τ), la loi du courant de RC',false,'Tu as recopié le courant de RC. Dans l’équation, i est à la place de u_C, pas du courant : i monte de 0 vers E/(R + r).','Quelle grandeur de RC correspond à i : u_C ou le courant ?'],
    ['E × (1 − e^(−t/τ)), avec τ = L/(R + r)',false,'Tu as recopié le second membre de RC. E est en volts, i en ampères : le second membre ici vaut E/(R + r).','Quelle unité a E ? Quelle unité faut-il pour i ?']]),
    apres:{html:'<p><b>Même équation, autre grandeur continue.</b></p>'}}},

/* ===== 5. la solution ===== */
{cle:'verif',beat:5,scene:'courbe',set:CV({jeu:'etab',exact:1}),sujet:'vérifier que i = A(1 − e^(−t/τ)) est solution',
  text:['Vérifie que i = A(1 − e^(−t/τ)) est solution de L di/dt + (R + r) i = E.','A est un courant, τ une durée à trouver.'],
  deriv:[{tex:tx`i=A\left(1-e^{-t/\tau}\right)`,alt:'i = A (1 − e^(−t/τ))',r:'on essaie cette forme, qui part de 0'},
    {tex:tx`\dfrac{\mathrm{d}i}{\mathrm{d}t}=\dfrac{A}{\tau}\,e^{-t/\tau}`,alt:'di/dt = (A/τ) e^(−t/τ)',r:'on dérive'},
    {tex:tx`L\,\dfrac{A}{\tau}\,e^{-t/\tau}+(R+r)A-(R+r)A\,e^{-t/\tau}=E`,alt:'L (A/τ) e^(−t/τ) + (R + r) A − (R + r) A e^(−t/τ) = E',r:'on remplace dans l’équation'},
    {tex:tx`A\left(\dfrac{L}{\tau}-(R+r)\right)e^{-t/\tau}+(R+r)A=E`,alt:'A (L/τ − (R + r)) e^(−t/τ) + (R + r) A = E',r:'on regroupe les termes en e^(−t/τ)'}],
  pari:{label:'Pour que ce soit vrai à tout instant ?',
    apres:{tex:[[tx`i(t)=I_0\left(1-e^{-t/\tau}\right)`,'i(t) = I₀ (1 − e^(−t/τ))'],[tx`I_0=\dfrac{E}{R+r}\quad\text{et}\quad\tau=\dfrac{L}{R+r}`,'I₀ = E/(R + r) et τ = L/(R + r)']],html:'<p class="small">Contrôle : i(0) = 0, comme la courbe. Cette vérification est demandée au sujet 2020 (question 1).</p>'},
    ...VF([
    ['<i>A</i> = E/(R + r) et τ = L/(R + r)',true,'Oui : le terme en e^(−t/τ) s’annule si L/τ = R + r, et il reste (R + r) A = E.'],
    ['<i>A</i> = E/R et τ = L/R',false,'Tu as oublié r. La substitution garde R + r partout : (R + r) A = E donne A = E/(R + r).','Quelle résistance multiplie A dans la dernière ligne ?'],
    ['<i>A</i> = E/(R + r) et τ = (R + r)/L',false,'Tu as inversé τ. Le terme en e^(−t/τ) s’annule si L/τ = R + r, donc τ = L/(R + r).','Que doit valoir L/τ pour annuler le terme en e^(−t/τ) ?']])}},
{cle:'dim',beat:5,scene:'courbe',set:CV({jeu:'etab',exact:1}),sujet:'l’équation aux dimensions de L/(R + r)',
  text:['De u = L di/dt, on tire [L] = [U][T][I]⁻¹ ; de u = R i, [R] = [U][I]⁻¹.','Une [[dimensions|équation aux dimensions]] donne [L/(R + r)] = ?'],
  tex:[[tx`[L]=[U]\cdot[T]\cdot[I]^{-1}`,'[L] = [U]·[T]·[I]⁻¹'],[tx`[R]=[U]\cdot[I]^{-1}`,'[R] = [U]·[I]⁻¹']],
  verifie:{...VF([
    ['[T] : τ est une durée',true,'Oui : [U][T][I]⁻¹ × [I][U]⁻¹ laisse [T].'],
    ['[T]⁻¹ : c’est (R + r)/L',false,'[T]⁻¹ est la dimension de (R + r)/L, le coefficient de i dans la forme du sujet 2020. L/(R + r) donne [T].','Lequel est une durée : L/(R + r) ou (R + r)/L ?'],
    ['sans dimension : [U] et [I] se compensent',false,'Tu as cru que tout se compense. [U][T][I]⁻¹ × [I][U]⁻¹ laisse [T].','Que reste-t-il quand [U] et [I] se simplifient ?']]),
    apres:{tex:[[tx`\left[\dfrac{L}{R+r}\right]=[U][T][I]^{-1}\times[I][U]^{-1}=[T]`,'[L/(R + r)] = [U][T][I]⁻¹ × [I][U]⁻¹ = [T]']],html:`Comme RC, τ est une durée. Ici ${Lv}/${RTv} = ${tauS} ms.`}}},
{cle:'uL-t',beat:5,scene:'couple',ctl:'temps',set:CP({t:T6,ic:1,ul:0}),sujet:'l’expression de u_L(<i>t</i>)',
  text:['i(t) est établie : déduis-en la tension aux bornes de la bobine.','On a u_R = R i, et la maille donne u_L = E − u_R.'],
  deriv:[{tex:tx`u_R=R\,i=R\,I_0\left(1-e^{-t/\tau}\right)`,alt:'uR = R i = R I₀ (1 − e^(−t/τ))',r:'la loi d’Ohm'},{tex:tx`u_L=E-u_R`,alt:'uL = E − uR',r:'la maille'}],
  pari:{label:'u_L(t) = ?',
    apres:{tex:[[tx`u_L(t)=r\,I_0+R\,I_0\,e^{-t/\tau}`,'uL(t) = r I₀ + R I₀ e^(−t/τ)'],[tx`u_L(t)=${TN(UL_INF,1)}+${TN(UR_INF,1)}\,e^{-t/\tau}\ \text{(V)}`,`uL(t) = ${ulInf} + ${urInf} e^(−t/τ) (V)`]],html:'<p class="small">Si r est négligeable, u_L = E e^(−t/τ) : c’est le cas du sujet 2023.</p>'},
    reveal:[{p:{ul:1},d:1100}],
    ...VF([
    ['u_L = r I₀ + R I₀ e^(−t/τ)',true,`Oui : E − R I₀ (1 − e^(−t/τ)) = (E − R I₀) + R I₀ e^(−t/τ), et E − R I₀ = r I₀.`],
    ['u_L = E e^(−t/τ) : la bobine idéale',false,`Tu as supposé r nulle. Avec r, u_L finit à r I₀ = ${ulInf} V, pas à 0.`,'Que vaut u_L en régime permanent, quand di/dt = 0 ?'],
    ['u_L = E (1 − e^(−t/τ)) : elle monte comme i',false,'Tu as fait monter u_L comme i. u_L part de E à <i>t</i> = 0 et descend.','Que vaut u_L à <i>t</i> = 0 ?']])}},

/* ===== 6. la constante de temps ===== */
{cle:'rappel',beat:6,scene:'couple',set:CP({t:0,ic:0,ul:0}),sujet:'i et u_L à <i>t</i> = 0',
  text:['Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.','On a i(<i>t</i>) = I₀ (1 − e^(−t/τ)) et u_L(<i>t</i>) = r I₀ + R I₀ e^(−t/τ). À <i>t</i> = 0⁺, que valent i et u_L ?'],
  verifie:{...VF([
    ['i = 0 et u_L = E',true,'Oui : e^0 = 1, donc i(0) = 0 et u_L(0) = r I₀ + R I₀ = E.'],
    ['i = E/(R + r) et u_L = 0 : c’est le condensateur que tu décris',false,'Tu as décrit le condensateur. La bobine garde i continu ; c’est u_L qui saute.','Qu’est-ce qui est continu dans une bobine : i ou u_L ?'],
    ['i = 0 et u_L = 0',false,'Tu as fait partir u_L de zéro, comme i. À <i>t</i> = 0, u_R = 0 : toute la tension E est sur la bobine.','Que vaut u_R quand i = 0 ?']]),
    reveal:[{p:{ic:1,ul:1},d:1100}]}},
{cle:'tau-63',beat:6,scene:'courbe',set:CV({jeu:'etab',exact:1,Pline:1}),sujet:'lire τ à 63 % de I₀',
  text:[`Le palier vaut I₀ = ${i0mA} mA. Comme pour u_C, lis τ sur la courbe.`],
  verifie:{fixe:true,...VF([
    [`${tFaux37} ms : lu à ${i37} mA`,false,`Tu as lu à ${i37} mA, soit ${p37} % de I₀. ${p37} % est le repère d’une courbe qui descend ; sur une montée, on lit ${p63} %.`,'Sur une courbe qui monte, lit-on 63 % ou 37 % ?'],
    [`${tHalf} ms : lu à ${iMoitie} mA, la moitié`,false,`Tu as lu à la moitié de I₀, soit ${iMoitie} mA. C’est τ ln 2, pas τ.`,'La moitié de I₀ est-elle le repère de τ ?'],
    [`${tauS} ms : lu à ${i63} mA`,true,`Oui : ${p63} % de ${i0mA} mA font ${i63} mA, atteints à <i>t</i> = τ = ${tauS} ms.`]]),
    reveal:[{p:{tan:1,p63:1},d:1000}],
    apres:{html:`<p>La [[tangente]] à l’origine, de pente E/L, coupe le palier au même instant τ. À 5τ = ${t5} ms, ${p99} % de I₀ sont atteints : c’est la durée du régime transitoire.</p>`}}},
{cle:'double-L',beat:6,scene:'courbe',set:CV({jeu:'etab',exact:1,Pline:1}),sujet:'l’influence de L',
  text:[`On double L : ${Lv2} H. Le reste ne change pas.`,'La courbe…'],
  pari:{reveal:[{p:{ghL:1},d:1300}],...BET([
    ['monte deux fois plus lentement, vers le même palier',`Oui : τ = L/(R + r) double (${tauL2} ms), et le palier E/(R + r) ne contient pas L : il reste à ${i0mA} mA.`,1],
    ['monte vers un palier deux fois plus bas','Tu as cru que L change le palier. En courant constant, di/dt = 0 : L disparaît, le palier vaut toujours E/(R + r).'],
    ['monte plus vite : plus de spires, plus de courant','Tu as supposé qu’une bobine plus grande laisse passer plus de courant. Elle freine la montée : τ double, le palier ne change pas.']])}},
{cle:'double-R',beat:6,scene:'courbe',set:CV({jeu:'etab',exact:1,Pline:1}),sujet:'l’influence de R, sur le palier et sur τ',
  text:[`Retour à L = ${Lv} H : on double R (${Rv2} Ω), r ne change pas.`,'Rappelle-toi : en RC, doubler R ne changeait que τ.','Ici…'],
  pari:{reveal:[{p:{ghR:1},d:1300}],
    apres:{html:'<p>R est au dénominateur des deux : I₀ = E/(R + r) et τ = L/(R + r).</p>'},
    ...BET([
    ['seul τ change, comme en RC','Tu as transféré RC. Ici R figure aussi dans le palier E/(R + r) : il change avec τ.'],
    ['seul le palier baisse','Tu as pensé que R ne règle que la hauteur. R figure aussi dans τ = L/(R + r) : τ baisse aussi.'],
    ['le palier et τ baissent tous les deux',`Oui : R + r passe de ${RTv} Ω à ${RT2} Ω, le palier tombe à ${pal2R} mA et τ à ${tau2R} ms.`,1]])}},
{cle:'curseurs',beat:6,scene:'courbe',ctl:'rl',needLabel:'Fais les quatre réglages d’abord',set:CV({jeu:'etab',exact:1,base:1,live:1,Pline:1}),
  text:['Bouge chacun des quatre curseurs, L, R, r et E.','Regarde ce qui change : la hauteur du palier, la durée de la montée, ou les deux.']},
{cle:'influence-E',beat:6,scene:'courbe',set:CV({jeu:'etab',base:1,E:2*E_V,ym:240}),sujet:'l’influence de E',
  text:[`On passe à E = ${Ev2} V ; la courbe en pointillés est celle de ${Ev} V.`,'Le palier et τ…'],
  verifie:{...VF([
    ['le palier double, τ ne change pas',true,`Oui : le palier vaut ${pal12} mA, et τ = L/(R + r) ne contient pas E : il reste à ${tauS} ms.`],
    ['le palier double et τ double aussi',false,'Tu as cru que E change τ. τ = L/(R + r) ne contient pas E.','Quelles grandeurs figurent dans τ ?'],
    ['le palier double et τ est divisé par deux',false,'Tu as pensé qu’une tension plus grande monte plus vite. La courbe monte plus haut dans le même temps : τ ne change pas.','À τ, quelle part du palier est atteinte, et dépend-elle de E ?']]),
    reveal:[{p:{exact:1,Pline:1,p63:1},d:1400}]}},
{cle:'r-palier',beat:6,scene:'couple',set:CP({t:T6,ic:1,ul:1}),sujet:'la résistance r lue en régime permanent',
  text:[`Régime permanent, comme à la question 2 du sujet 2020 (${fr(S20.bareme[1],1)} pt) : on lit i = ${i0mA} mA et u_L = ${ulInf} V.`,'La résistance r de la bobine vaut…'],
  verifie:{...VF([
    [`${rv} Ω : u_L / I₀`,true,`Oui : en courant constant, u_L = r I₀, donc r = ${ulInf}/${d1(I0)} = ${rv} Ω.`],
    [`${RTv} Ω : E / I₀`,false,'Tu as divisé E par I₀ : cela donne R + r. Pour r seule, divise u_L par I₀, ou retranche R.','E/I₀ est-il la résistance de la bobine seule ?'],
    ['0 : pas de tension en courant constant',false,`Tu as cru qu’une bobine en courant constant n’a pas de tension. u_L = r I₀ = ${ulInf} V, pas 0.`,'Que reste-t-il de u_L quand di/dt = 0 ?'],
    [`${d1(I0/UL_INF)} Ω : I₀ / u_L`,false,'Tu as divisé I₀ par u_L. Une résistance est une tension divisée par un courant : r = u_L/I₀.','Une résistance est-elle une tension divisée par un courant, ou l’inverse ?']])}},

/* ===== 7. la rupture ===== */
{cle:'rupture-pari',beat:7,scene:'couple',ctl:'temps',set:CP({t:T6,dis:0,ic:1,ul:1}),sujet:'le courant à la rupture',
  text:[`Le régime permanent est atteint : i = ${i0mA} mA. À <i>t</i> = 0, on bascule K en position 2 : le générateur sort de la maille, qui reste fermée par R.`,'Le courant…'],
  pari:{reveal:[{p:{dis:1,t:0},d:900},{p:{t:T6},d:4500}],...BET([
    ['tombe à 0 aussitôt : plus de générateur','Tu as pensé que sans générateur, il n’y a plus de courant. Le courant de la bobine ne peut pas sauter : i part de la valeur qu’il avait et décroît.'],
    [`décroît de ${i0mA} mA vers 0`,'Oui : i est continu, il décroît à partir de sa valeur. La bobine retarde aussi la disparition du courant.',1],
    ['change de sens aussitôt, comme à la décharge du condensateur','Tu as transféré RC. Ici i garde son sens, et décroît : c’est u_L qui change de signe.']])}},
{cle:'ed-rupture',beat:7,scene:'circuit',set:CI({jeu:'rl',K:2,t:0,fi:1,fu:1,fr:1}),sujet:'l’équation de la rupture',
  text:['À <i>t</i> = 0, K bascule en position 2 : le générateur sort de la maille, les flèches ne changent pas.','Quelle est l’équation de la rupture ?'],
  deriv:[{tex:tx`u_R+u_L=0`,alt:'uR + uL = 0',r:'plus de générateur dans la maille'},{tex:tx`u_R=R\,i\quad\text{et}\quad u_L=r\,i+L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}`,alt:'uR = R i et uL = r i + L di/dt',r:'les mêmes relations qu’à l’établissement'}],
  pari:{label:'L’équation ?',
    apres:{tex:[[tx`L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}+(R+r)\,i=0`,'L di/dt + (R + r) i = 0'],[tx`i(t)=I_0\,e^{-t/\tau}`,'i(t) = I₀ e^(−t/τ)']],html:'<p>Même τ, car la maille a gardé R + r. Continuité : i(0⁺) = I₀.</p>'},
    ...VF([
    ['L di/dt + (R + r) i = 0',true,'Oui : u_R + u_L = 0, avec les mêmes expressions de u_R et de u_L.'],
    ['L di/dt + (R + r) i = E',false,'Tu as gardé E. Le générateur a quitté la maille : le second membre est nul.','Le générateur est-il encore dans la maille ?'],
    ['L di/dt − (R + r) i = 0',false,'Tu as perdu un signe. Avec ce signe, i grandirait sans fin : u_R + u_L = 0 donne + (R + r) i.','Une intensité qui s’éteint a-t-elle une dérivée de même signe que i ?']])}},
{cle:'rupture-tau',beat:7,scene:'couple',ctl:'temps',set:CP({dis:1,t:0,ic:0,ul:0,tau1:1}),sujet:'le courant à τ après la rupture',
  text:['Après la bascule, i décroît avec la même constante de temps τ.',`À <i>t</i> = ${tauS} ms après la bascule, i vaut…`],
  verifie:{...VF([
    [`environ ${i37} mA : il en reste ${p37} %`,true,`Oui : à <i>t</i> = τ, il reste ${p37} % de ${i0mA} mA, soit ${i37} mA.`],
    [`environ ${i63} mA : ${p63} % de I₀`,false,`Tu as pris ${p63} %, ce qu’atteint une courbe qui monte. Ici i décroît : il en reste ${p37} %.`,'À τ, une courbe qui descend a-t-elle perdu 63 % ou gardé 63 % ?'],
    ['0 : τ est la fin de la rupture',false,`Tu as pris τ pour la fin. À τ, il reste ${p37} % ; il faut environ 5τ pour passer sous 1 % (${p5r} %).`,'Quelle part de I₀ reste-t-il à τ ?']]),
    reveal:[{p:{ic:1,lect:1,t:TAU},d:2400}],
    apres:{html:'<p>La bobine retarde aussi la disparition du courant.</p>'}}},
{cle:'uL-rupture',beat:7,scene:'couple',ctl:'temps',set:CP({dis:1,t:0,ic:1,ul:0}),sujet:'la tension de la bobine juste après la rupture',
  text:[`Juste avant la bascule, u_L = ${ulInf} V.`,'Juste après, u_L vaut…'],
  verifie:{...VF([
    [`−${ulRup} V : u_L = −u_R`,true,`Oui : u_R + u_L = 0, avec u_R = R I₀ = ${ulRup} V. u_L change de signe, et saute de ${ulInf} V à −${ulRup} V.`],
    [`+${ulInf} V : u_L est continue`,false,'Tu as fait de u_L une grandeur continue. C’est i qui l’est : u_L peut sauter, et même changer de signe.','Qu’est-ce qui est continu dans une bobine : i ou u_L ?'],
    ['0 : plus de générateur',false,`Tu as cru que u_L tombe à 0 avec le générateur. i vaut encore I₀, donc u_R = ${ulRup} V et u_L = −${ulRup} V.`,'Que valent i et u_R juste après la bascule ?']]),
    reveal:[{p:{ul:1},d:1000}]}},
{cle:'surtension',beat:7,scene:'couple',ctl:'temps',set:CP({dis:0,t:T6,ic:1,ul:1,r2:1,ech:0}),sujet:'la surtension quand la maille de rupture résiste',
  text:[`On recommence, mais le fil de la borne (2) passe maintenant par un conducteur ohmique R₂ = ${R2k} kΩ.`,'Juste après la bascule, la tension aux bornes de la bobine vaut, en valeur absolue…'],
  pari:{reveal:[{p:{dis:1,t:0,ech:1},d:1300},{p:{t:T6},d:4200}],
    apres:dyn(()=>`<p>Plus la maille de rupture résiste, plus la tension monte. <b>Ouvrir K, c’est mettre de l’air dans la maille : la tension devient assez grande pour faire jaillir l’étincelle de Henry.</b></p>${rappelEtincelle()?`<p class="small">${rappelEtincelle()}</p>`:''}`),
    ...BET([
    [`au plus ${Ev} V : la bobine ne rend pas plus que le générateur`,`Tu as supposé que la bobine ne peut pas donner plus de tension que le générateur. i garde sa valeur, ${i0mA} mA, et traverse R + R₂ : la tension monte à ${ulSurt} V.`],
    [`environ ${fr(Math.round(-UL_SURT/100)*100,0)} V`,`Oui : i(0⁺) = ${i0mA} mA traverse R + R₂ = ${kOhm} Ω, donc |u_L| = ${ulSurt} V. La décroissance est environ ${rapTau} fois plus rapide.`,1],
    ['0 : le générateur est parti','Tu as cru que u_L disparaît avec le générateur. i continue de circuler : u_L = −(R + R₂) i.']])}},

/* ===== 8. l'énergie ===== */
{cle:'energie-pari',beat:8,scene:'courbe',set:CV({jeu:'energie',curve:0,pts:0}),
  text:['Après la bascule, sans générateur, la bobine a fait passer du courant dans R.',`Avec un courant établi deux fois plus grand (${fr(2*I0*1e3,0)} mA), elle en aurait donné…`],
  pari:{reveal:[{p:{curve:1},d:1500},{p:{pts:1},d:1200}],...BET([
    ['deux fois plus d’énergie','Tu as cru que l’énergie est proportionnelle au courant. Elle varie comme i² : un courant deux fois plus grand, quatre fois plus d’énergie.'],
    ['quatre fois plus d’énergie',`Oui : ${em1} mJ contre ${em2} mJ, soit ${emFois} fois plus. Les points sont sur une parabole : la suite l’établit.`,1],
    ['rien de plus : la bobine stocke du courant, pas de l’énergie','Tu as cru que la bobine stocke du courant. Elle emmagasine de l’énergie, et plus i est grand, plus elle en stocke.']])}},
{cle:'energie-etablir',beat:8,scene:'courbe',set:CV({jeu:'energie',curve:1,pts:1}),sujet:'établir l’énergie emmagasinée',
  text:['Filières PC et SM. En SVT, ce n’est pas à ton programme.','La puissance reçue par la bobine, en convention récepteur, est le débit d’énergie.'],
  html:()=>'<button type="button" class="ctl-btn alt saut" data-aller="energie-calc">Passer à la suite →</button>',
  deriv:[{tex:tx`p=u_L\,i`,alt:'p = uL i',r:'la puissance reçue, en convention récepteur'},{tex:tx`p=r\,i^{2}+L\,i\,\dfrac{\mathrm{d}i}{\mathrm{d}t}`,alt:'p = r i² + L i di/dt',r:'on remplace u_L par r i + L di/dt'}],
  pari:{label:'La part emmagasinée est la dérivée de…',
    apres:{tex:[[tx`E_m=\dfrac{1}{2}\,L\,i^{2}`,'Em = ½ L i²']],html:'C’est l’[[energiemagnetique|énergie magnétique]] emmagasinée dans la bobine ; r i² est perdue par effet Joule dans le fil.'},
    ...VF([
    ['½ L i²',true,'Oui : la dérivée de i² est 2 i di/dt, d’où le ½.'],
    ['L i²',false,'Tu as oublié le ½. La dérivée de i² est 2 i di/dt : d’où le ½.','Que vaut la dérivée de i² ?'],
    ['½ L i² + r i²',false,'Tu as compté toute la puissance reçue. r i² chauffe le fil : ce n’est pas une dérivée, donc ce n’est pas emmagasiné.','Où va l’énergie r i² : dans le champ, ou dans le fil ?']])}},
{cle:'energie-calc',beat:8,scene:'courbe',set:CV({jeu:'energie',curve:1,pts:0}),sujet:'calculer l’énergie emmagasinée',
  text:[`L = ${Lv} H, i = ${i0mA} mA. Que vaut E_m ?`],
  verifie:{...VF([
    [`${em1} mJ`,true,`Oui : ½ × ${Lv} × ${d2(I0)}² = ${em1} mJ.`],
    [`${fr(0.5*L_H*I0*1e3,0)} mJ`,false,'Tu n’as pas élevé i au carré. E_m = ½ L i², pas ½ L i.','Le courant est-il au carré dans la formule ?'],
    [`${sciL(0.5*L_H*(I0*1e3)**2)} J`,false,`Tu as laissé i en mA. Convertis : ${i0mA} mA = ${d2(I0)} A, et l’énergie sort en joules.`,'Dans une formule, le courant doit-il être en ampères ?']]),
    apres:dyn(()=>`<p>À la rupture, cette énergie est dissipée par effet Joule dans R et r, ou dans l’étincelle.</p>`)}},

/* ===== 9. mesurer ===== */
{cle:'oscillo',beat:9,scene:'circuit',set:CI({jeu:'oscillo',K:1,t:1,osc:0}),sujet:'ce que montre un oscilloscope',
  text:['Un oscilloscope ne montre que des tensions.','Pour voir l’allure de i(<i>t</i>), on visualise…'],
  verifie:{...VF([
    ['u_R, car u_R = R i',true,'Oui : u_R est l’image de i, à R près. La voie Y₁ de l’autre côté de R, et la masse entre R et la bobine, la montrent.'],
    ['u_L : c’est la tension de la bobine',false,'Tu as pris u_L pour l’image de i. u_L = r i + L di/dt n’est pas proportionnelle à i.','u_L est-elle proportionnelle à i ?'],
    ['rien : un oscilloscope ne voit pas les courants',false,'Tu as cru que i est invisible. u_R = R i en est l’image, à R près.','Quelle tension est proportionnelle à i ?']]),
    reveal:[{p:{osc:1},d:800}]}},
{cle:'oscillo-voies',beat:9,scene:'courbe',set:CV({jeu:'voies',curve:1,rep:0}),sujet:'reconnaître u_L sur un écran',
  text:['L’écran montre deux tensions, en volts, sur la même échelle.',`Une courbe part de 0 et monte vers ${urInf} V ; l’autre part de ${d1(E_V)} V et descend vers ${ulInf} V. u_L est…`],
  verifie:{...VF([
    [`celle qui part de ${d1(E_V)} V`,true,'Oui : à <i>t</i> = 0⁺, i = 0 et toute la tension E est sur la bobine. L’autre courbe est u_R = R i.'],
    ['celle qui part de 0',false,'Tu as pris u_R pour u_L. Au départ, i = 0 : toute la tension E est sur la bobine.','Que vaut u_L à <i>t</i> = 0⁺ ?'],
    ['aucune : u_L doit finir à 0',false,`Tu as oublié r. La bobine réelle garde u_L = r I₀ = ${ulInf} V en régime permanent.`,'Que vaut u_L en courant constant ?']]),
    reveal:[{p:{rep:1},d:700}]}},

/* ===== 10. retour à l'énigme ===== */
{cle:'retour-lampes',beat:10,scene:'circuit',set:CI({jeu:'lampes',K:1,t:0}),seq:[{p:{t:1},d:3400}],sujet:'pourquoi la bobine retarde le courant',
  text:()=>[rappelLampes(),`i est continu dans la bobine : il monte de 0 vers E/(R + r), avec τ = L/(R + r).`,'L₂ traîne quelques τ, puis brille comme L₁ : en courant constant, la bobine n’est plus que sa résistance r.',{t:'La bobine ne bloque pas le courant : elle le retarde.',fort:true}]},

/* ===== 11. au bac ===== */
{cle:'bac',beat:11,scene:'circuit',set:CI({jeu:'rl',K:1,t:0.3,sub:'le montage du sujet, la bobine de résistance négligeable'}),
  text:[`Bac PC 2023, session normale, exercice 3, question 1-1 (${fr(S23.bareme[0],2)} pt).`,'Établir l’équation différentielle vérifiée par i(<i>t</i>), la bobine ayant une résistance négligeable.','Quel est ton premier geste ?'],
  pari:{reveal:[{p:{...ALL},d:900}],...BET([
    ['Écrire l’additivité des tensions, avec les flèches du schéma','Oui : u_R + u_L = E, avec les flèches du schéma, est le point de départ de toute la question.',1],
    ['Dériver i(<i>t</i>) = A + B e^(−t/τ) et remplacer','Tu as pris la question 1-1 pour la 1-2. Dériver une solution, c’est la vérifier ; ici, on établit l’équation, avec la maille.'],
    ['Lire τ sur la tangente (T)','Aucune valeur n’est demandée en 1-1. Commence par l’équation : l’additivité des tensions dans la maille.']])}},
{cle:'bac-ed',beat:11,scene:'circuit',set:CI({jeu:'rl',K:1,t:0.3,...ALL,sub:'le montage du sujet, la bobine de résistance négligeable'}),sujet:'la rédaction de la question 1-1',
  text:['Voici la rédaction de la question 1-1.',`Lis chaque ligne, avec sa raison. Barème imprimé en marge du sujet : ${fr(S23.bareme[0],2)} pt.`],
  deriv:[{tex:tx`u_R+u_L=E`,alt:'uR + uL = E',r:'l’additivité des tensions, avec les flèches du schéma'},{tex:tx`u_R=R\,i`,alt:'uR = R i',r:'la loi d’Ohm'},{tex:tx`u_L=L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}`,alt:'uL = L di/dt',r:'la bobine, de résistance négligeable (r = 0)'},
    {tex:tx`L\,\dfrac{\mathrm{d}i}{\mathrm{d}t}+R\,i=E`,alt:'L di/dt + R i = E',r:'on remplace dans la maille'},{tex:tx`\dfrac{\mathrm{d}i}{\mathrm{d}t}+\dfrac{R}{L}\,i=\dfrac{E}{L}`,alt:'di/dt + (R/L) i = E/L',r:'on divise par L'}]},
{cle:'bac-AB',beat:11,scene:'courbe',set:CV({jeu:'bac23',curve:1}),sujet:'les constantes A et B de la solution',
  text:[`Question 1-2-1 (${fr(S23.bareme[1],1)} pt) : i(<i>t</i>) = A + B e^(−t/τ).`,'Les constantes A et B, en fonction de E et R, valent…'],
  verifie:{...VF([
    ['<i>A</i> = E/R et <i>B</i> = −E/R',true,'Oui : en régime permanent, i tend vers A = E/R ; et i(0) = A + B = 0, donc B = −A.'],
    ['<i>A</i> = E/R et <i>B</i> = +E/R',false,'Tu as oublié que i(0) = 0. i(0) = A + B doit être nul : B = −A.','Que vaut i à <i>t</i> = 0, la bobine étant continue ?'],
    ['<i>A</i> = 0 et <i>B</i> = E/R',false,'Tu as pris le courant de RC, qui décroît. Ici i monte vers E/R : A = E/R en régime permanent.','Vers quoi tend i en régime permanent ?']]),
    apres:{tex:[[tx`i(t)=\dfrac{E}{R}\left(1-e^{-t/\tau}\right)`,'i(t) = (E/R) (1 − e^(−t/τ))']]}}},
{cle:'bac-L',beat:11,scene:'courbe',set:CV({jeu:'bac23',curve:1,rep:0}),sujet:'l’inductance lue sur le sujet 2023',
  text:[`Question 1-2-2 (${fr(S23.bareme[2],1)} pt) : montrer que L = ${fr(S23.L,0)} H.`,`E = ${fr(S23.E,0)} V ; le palier vaut I₀ = ${fr(S23.I0*1e3,0)} mA, et (T) est la tangente à l’origine.`],
  verifie:{...VF([
    [`R = E/I₀ = ${fr(S23.R,0)} Ω, puis L = R τ = ${d1(S23.L)} H`,true,`Oui : (T) coupe le palier à <i>t</i> = τ = ${d1(S23.tau*1e3)} ms, et τ = L/R donne L = R τ.`],
    [`L = τ/R = ${sciL(S23.LFaux)} H`,false,'Tu as inversé le rapport. τ = L/R donne L = R τ.','Comment isole-t-on L dans τ = L/R ?'],
    [`τ lu à 37 % : ${d2(S23.t37*1e3)} ms, donc L = ${d2(S23.LFaux37)} H`,false,'Tu as lu τ là où i = 37 % de I₀. Sur une montée, τ se lit à 63 %, ou là où (T) coupe le palier.','Où la tangente (T) coupe-t-elle le palier ?']]),
    reveal:[{p:{rep:1},d:700}],
    apres:{html:`<div class="rl-copie"><p><b>Littéral.</b> τ = L/R, donc L = R τ, avec R = E/I₀.</p><p><b>Lecture.</b> (T) coupe le palier à <i>t</i> = τ = ${d1(S23.tau*1e3)} ms.</p><p><b>Numérique.</b> R = ${fr(S23.E,0)}/(${fr(S23.I0*1e3,0)} × 10<sup>−3</sup>) = ${fr(S23.R,0)} Ω, puis L = ${fr(S23.R,0)} × ${d1(S23.tau*1e3)} × 10<sup>−3</sup> = ${d1(S23.L)} H.</p></div><p class="small">Barème imprimé du sujet : ${S23.bareme.map(b=>fr(b,Math.abs(b*10-Math.round(b*10))<1e-9?1:2)).join(' + ')} pt, soit ${fr(S23.bareme.reduce((a,b)=>a+b,0),2)} pt. Consigne imprimée sur les sujets : « On donnera les expressions littérales avant de passer aux applications numériques. »</p>`}}},
{cle:'bac-uL',beat:11,scene:'courbe',set:CV({jeu:'bac23',curve:1}),sujet:'l’expression numérique de u_L(<i>t</i>) en unités SI',
  text:[`Question 1-3 (${fr(S23.bareme[3],1)} pt) : l’expression numérique de u_L(<i>t</i>) à l’établissement, en unités SI.`,'La bobine a une résistance négligeable. Que vaut u_L(<i>t</i>) ?'],
  verifie:{...VF([
    [`u_L = ${fr(S23.E,0)} e<sup>−${fr(S23.k,0)} <i>t</i></sup>`,true,`Oui : u_L = L di/dt = E e^(−t/τ), et τ = ${d1(S23.tau*1e3)} × 10⁻³ s, donc 1/τ = ${fr(S23.k,0)} s⁻¹.`],
    [`u_L = ${fr(S23.E,0)} e<sup>−${d1(S23.kFaux)} <i>t</i></sup>`,false,`Tu as laissé τ en ms. En unités SI, τ = ${d1(S23.tau*1e3)} × 10⁻³ s, donc 1/τ = ${fr(S23.k,0)} s⁻¹.`,'Le temps doit-il être en secondes ?'],
    [`u_L = ${fr(S23.E,0)} (1 − e<sup>−${fr(S23.k,0)} <i>t</i></sup>)`,false,'Tu as fait monter u_L comme i. u_L = L di/dt part de E à <i>t</i> = 0 et décroît.','Que vaut u_L à <i>t</i> = 0 : 0 ou E ?']])}},
{cle:'bac-2a',beat:11,scene:'circuit',set:CI({jeu:'rl',K:1,t:0.3,...ALL,sub:'le montage RL de la leçon'}),sujet:'la première ligne de la copie du sujet 2024',
  text:[`À toi. Bac PC 2024, session normale, exercice 4, partie 2, question 2-1 (${fr(S24.bareme[0],1)} pt) : montrer que di/dt = −((R₁ + r)/L) i + E/L.`,'K est en position 1. Quelle ligne est juste ?'],
  verifie:{...VF([
    ['R₁ i + r i + L di/dt = E',true,'Oui : u_R = R₁ i et u_L = r i + L di/dt s’ajoutent, et leur somme vaut E.'],
    ['R₁ i + L di/dt = E',false,'Tu as oublié r : la bobine (b) a une résistance. u_L = r i + L di/dt.','La bobine du sujet a-t-elle une résistance ?'],
    ['R₁ i + r i − L di/dt = E',false,'Tu as perdu un signe. Avec ce signe, la pente de la droite di/dt = f(i) serait positive.','Dans u_L = r i + L di/dt, L di/dt est-il compté en plus ou en moins ?']]),
    apres:{tex:[[tx`\dfrac{\mathrm{d}i}{\mathrm{d}t}=-\dfrac{R_1+r}{L}\,i+\dfrac{E}{L}`,'di/dt = −((R₁ + r)/L) i + E/L']],html:'<p class="small">On isole ensuite di/dt, en divisant par L.</p>'}}},
{cle:'bac-2b',beat:11,scene:'droite',set:DR({jeu:'didt',line:1,pt:0}),sujet:'l’inductance lue sur la droite du sujet 2024',
  text:[`Question 2-2-1 (${fr(S24.bareme[1],1)} pt), avec la figure 4 : E = ${fr(S24.E,0)} V.`,'À i = 0, on lit la valeur de di/dt sur l’axe des ordonnées.'],
  deriv:[{tex:tx`i=0\ :\quad \dfrac{\mathrm{d}i}{\mathrm{d}t}=\dfrac{E}{L}`,alt:'à i = 0 : di/dt = E/L',r:`l’ordonnée à l’origine de la droite, lue ${sciH(S24.ordo,0)} A·s⁻¹`}],
  pari:{label:'L = ?',reveal:[{p:{pt:1},d:700}],
    ...VF([
    [`${fr(S24.E,0)}/(${sciH(S24.ordo,0)}) = ${sciH(S24.L,0)} H`,true,`Oui : L = E divisée par l’ordonnée à l’origine, en V divisés par des A·s⁻¹.`],
    [`${sciH(S24.ordo,0)}/${fr(S24.E,0)} = ${sciH(S24.LFauxInv,0)} H`,false,'Tu as inversé le rapport. L’unité tranche : V divisé par A·s⁻¹ donne des henrys.','L est-elle E divisée par l’ordonnée, ou l’inverse ?'],
    [`1/(${sciH(S24.ordo,0)}) = ${sciH(S24.LFauxE,1)} H`,false,'Tu as oublié E. À i = 0, di/dt = E/L : L = E divisée par l’ordonnée.','Que vaut di/dt à i = 0 ?']])}},
{cle:'bac-2c',beat:11,scene:'droite',set:DR({jeu:'didt',line:1,pt:1}),sujet:'la constante de temps lue sur la droite du sujet 2024',
  text:[`Question 2-2-2 (${fr(S24.bareme[2],1)} pt) : la droite coupe l’axe des abscisses en i = ${fr(S24.abs*1e3,0)} mA, le palier I₀ = E/(R₁ + r).`,'La constante de temps τ du circuit vaut…'],
  verifie:{...VF([
    [`${sciH(S24.tau,0)} s : 1/|pente|`,true,`Oui : la pente vaut −1/τ = −${sciH(S24.pente,0)} s⁻¹, donc τ = (${fr(S24.abs*1e3,0)} × 10⁻³)/(${sciH(S24.ordo,0)}) = ${sciH(S24.tau,0)} s.`],
    [`${sciH(S24.pente,0)} s : la pente`,false,`Tu as pris la pente pour τ. Elle vaut −1/τ, en s⁻¹ : τ = 1/${sciH(S24.pente,0)} = ${sciH(S24.tau,0)} s.`,'La pente de la droite est-elle τ, ou −1/τ ?'],
    [`${sciH(S24.tauFaux3,0)} s : intersection lue à ${fr(S24.abs*500,0)} mA`,false,`Tu as lu l’intersection à ${fr(S24.abs*500,0)} mA. La droite coupe l’axe des abscisses en i = ${fr(S24.abs*1e3,0)} mA.`,'Où la droite coupe-t-elle l’axe des abscisses ?']])}},

/* ===== 12. bilan ===== */
{cle:'q1',beat:12,scene:'quiz',set:{qi:0,rv:0},sujet:'r oubliée dans τ',
  text:[`Une copie écrit τ = L/R = ${Lv}/${Rv} = ${d1(L_H/R_OHM*1e3)} ms. Son erreur ?`],
  verifie:{...VF([
    [`elle a oublié r : τ = L/(R + r) = ${tauS} ms`,true,`Oui : r est dans la maille, la résistance totale est R + r : τ = ${Lv}/${RTv} = ${tauS} ms.`],
    ['il fallait R/L, pas L/R',false,'Tu as inversé τ. R/L est en s⁻¹ : τ = L/(R + r) est une durée.','Quelle unité a R/L ?'],
    ['aucune : r ne compte qu’en régime permanent',false,'Tu as cru que r n’intervient qu’à la fin. r est dans l’équation à tout instant : L di/dt + (R + r) i = E.','Où figure r dans l’équation différentielle ?']]),
    reveal:[{p:{rv:1},d:1200}]}},
{cle:'q2',beat:12,scene:'quiz',set:{qi:1,rv:0},sujet:'la bobine en régime permanent',
  text:['En régime permanent, une bobine réelle se comporte comme…'],
  verifie:{...VF([
    ['un conducteur ohmique de résistance r',true,'Oui : di/dt = 0, il reste u = r i.'],
    ['un fil, sans aucune résistance électrique',false,'Tu as oublié r. Le fil de la bobine a une résistance : u = r i en courant constant.','Que reste-t-il de u = r i + L di/dt quand di/dt = 0 ?'],
    ['un interrupteur ouvert : il bloque le courant',false,'Tu as pris la bobine pour un condensateur chargé. Elle laisse passer un courant constant : i = E/(R + r).','Quel dipôle bloque le courant en régime permanent ?']]),
    reveal:[{p:{rv:1},d:1200}]}},
{cle:'q3',beat:12,scene:'quiz',set:{qi:2,rv:0},sujet:'le calcul de τ et les préfixes',
  text:[`L = ${fr(Q3.L*1e3,0)} mH, R = ${fr(Q3.R,0)} Ω et r = ${fr(Q3.r,0)} Ω : τ = ?`],
  verifie:{...VF([
    [`${d2(Q3.tau*1e3)} ms`,true,`Oui : τ = L/(R + r) = ${fr(Q3.L*1e3,0)} × 10⁻³ / ${fr(Q3.R+Q3.r,0)} = ${d2(Q3.tau*1e3)} ms.`],
    [`${d2(Q3.tauFauxR*1e3)} ms : r oubliée`,false,`Tu as oublié r. τ = L/(R + r) = ${fr(Q3.L*1e3,0)} × 10⁻³ / ${fr(Q3.R+Q3.r,0)}, pas L/R.`,'Quelle résistance totale figure au dénominateur ?'],
    [`${d2(Q3.tauFauxMh)} s : mH non converti`,false,`Tu as laissé L en mH : ${fr(Q3.L*1e3,0)} mH = ${fr(Q3.L*1e3,0)} × 10⁻³ H, donc τ = ${d2(Q3.tau*1e3)} ms.`,'L doit-elle être en henrys ?']]),
    reveal:[{p:{rv:1},d:1200}]}},
{cle:'fin',beat:12,scene:'end',seq:[{p:{n:5},d:3200,w:300}],
  text:['Fin de la séance.'],html:()=>profileHTML()}
];
// les étapes à geste : « Suivant » attend les quatre réglages
STEPS.forEach(st=>{if(st.ctl==='rl')st.need=()=>S.rlBouges.length>=4;});

// une espace insécable avant « % » ; un nombre ne se sépare pas de son unité
const pct=s=>typeof s==='string'?s.replace(/(\d) %/g,'$1 %').replace(/(\d) (A·s⁻¹|ms|µs|mH|mJ|mA|kΩ|Ω|kV|V|H|A|J|s|mètres|pieds|pas)(?=[\s.,;:)<]|$)/g,'$1 $2'):s;
const pctP=p=>typeof p==='string'?pct(ix(p)):p&&typeof p==='object'?{...p,t:pct(ix(p.t))}:p;
const pctOpts=P=>{if(!P)return;if(P.opts)P.opts.forEach(o=>{o.t=pct(o.t);o.fb=pct(o.fb);o.indice=pct(o.indice);});
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
  bobine:{t:'bobine',d:'Un fil conducteur enroulé en spires. Elle a une inductance <i>L</i> et une résistance <i>r</i>, celle de son fil. Son symbole : un fil en spires, noté (<i>L</i>, <i>r</i>).'},
  inductance:{t:'inductance',d:'La grandeur <i>L</i> d’une bobine, en henrys. Elle relie la tension à la variation du courant : <i>u</i> = <i>L</i> d<i>i</i>/d<i>t</i>, quand la résistance du fil est négligeable.'},
  henry:{t:'henry',d:'L’unité d’inductance, de symbole H : 1 H = 1 V·s·A<sup>−1</sup>. Elle porte le nom de Joseph Henry, un physicien américain (Wikipédia, « Joseph Henry »).'},
  conventionrecepteur:{t:'convention récepteur',d:'Pour un récepteur, la flèche de la tension s’oppose à celle du courant. Ici : <i>i</i> entre par le haut de la bobine, et la flèche de <i>u</i><sub>L</sub> pointe vers le haut.'},
  regime:{t:'régimes transitoire et permanent',d:'Le régime transitoire : les grandeurs varient, ici jusqu’à environ 5<i>τ</i>. Le régime permanent : elles sont constantes, ici <i>i</i> = <i>E</i>/(<i>R</i> + <i>r</i>) et <i>u</i><sub>L</sub> = <i>r</i> <i>I</i><sub>0</sub>.'},
  tangente:{t:'tangente à l’origine',d:'La droite qui touche la courbe en <i>t</i> = 0, avec la même pente. À l’établissement, elle coupe le palier <i>I</i><sub>0</sub> en <i>t</i> = <i>τ</i>.'},
  dimensions:{t:'équation aux dimensions',d:'On écrit la dimension d’une grandeur avec [U] (tension), [I] (intensité), [T] (durée). Elle sert à vérifier une unité ou une formule.'},
  energiemagnetique:{t:'énergie magnétique',d:'L’énergie stockée dans une bobine parcourue par un courant : <i>E</i><sub>m</sub> = ½ <i>L</i> <i>i</i><sup>2</sup>. Elle est rendue à la rupture.'},
};
Object.values(mots).forEach(m=>{m.d=pct(m.d);});

/* ---------- la fin : une ligne de résultat, les exercices, le détail ---------- */
const bet=k=>{const st=STEPS.find(s=>s.cle===k),j=S.first[k];return (!st||j==null)?null:!!st.pari.opts[j].juste;};
function profileHTML(){
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>ctx.juste(s.k)!=null),vok=V.filter(s=>ctx.juste(s.k)===true),vko=V.filter(s=>ctx.juste(s.k)===false);
  const P=STEPS.filter(s=>s.pari&&!s.verifie&&!s.pari.opts.some(o=>o.ok)),pv=P.filter(s=>bet(s.cle)!=null);
  const Q=[['q1','r oubliée dans τ'],['q2','la bobine en régime permanent'],['q3','τ = L/(R + r) et les préfixes']];
  const res=Q.map(([k])=>ctx.juste(k));
  const ligne=`« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length||V.length}</b>. Tes paris : ${pv.length} faits.`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${ix(Q[i][1])}</li>`).join('');
  const bets=[];
  const a=bet('deux-lampes');if(a!=null)bets.push(a?'tu savais que la bobine retarde le courant sans le bloquer':'« les deux lampes s’allument ensemble » ou « L₂ ne s’allume jamais » t’a tenté');
  const h=bet('etincelle');if(h!=null)bets.push(h?'tu avais prévu l’étincelle à la rupture seulement':'tu n’avais pas prévu que l’étincelle jaillit à la rupture seulement');
  const c=bet('allure');if(c!=null)bets.push(c?'tu savais que i part de 0 et monte de plus en plus lentement':'« i saute » ou « i monte en ligne droite » t’a tenté');
  const d=bet('double-R');if(d!=null)bets.push(d?'tu savais que R change le palier et τ':'« seul τ change », comme en RC, ou « seul le palier » t’a tenté');
  const r=bet('rupture-pari');if(r!=null)bets.push(r?'tu savais que le courant décroît, sans sauter':'« le courant tombe à 0 » ou « il change de sens » t’a tenté');
  const e=bet('surtension');if(e!=null)bets.push(e?'tu avais prévu la surtension quand la maille résiste':'« la bobine ne rend pas plus que le générateur » t’a tenté');
  const revoir=vko.map(x=>x.sujet).filter(Boolean);
  return `<p class="res">${pct(ligne)}</p><a class="lien-exos" href="/pilote/dipole-rl/exercices">Faire les exercices →</a>
<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}${revoir.length?`<p class="small">À revoir : ${revoir.join(' ; ')}.</p>`:''}<div class="next"><div class="pari-k">Dans les exercices, piège par piège</div><ol><li>Le saut du courant : les exercices 7 et 11. r oubliée : les exercices 1, 4, 5 et 7.</li><li>L·i au lieu de L·di/dt : les exercices 2 et 3. Le transfert de RC : les exercices 6, 10 et 11.</li><li>τ et les repères 63 % et 37 % : l’exercice 8. La droite di/dt = f(i) : l’exercice 9.</li><li>L’énergie : l’exercice 12. Les deux voies de l’oscilloscope : l’exercice 13.</li><li>Le bac : l’exercice 14.</li></ol></div></details>`;
}

/* ---------- contrôles par étape ---------- */
S.rlBouges=[];S.rlPos=null;
const fTau=t=>t<1?fr(t,2):fr(t,1);
const CTL={
  // le curseur de temps de la scène `couple` : il règle t, arrête l'animation en cours, et ne paraît qu'une fois la question résolue
  // (avant le pari, le glisser donnerait la réponse : i(t), u_R, la durée de la décroissance)
  temps:{html:()=>`<div class="rl-tctl" id="tctl" hidden><div class="rl-cur"><label><span><i>t</i></span><input id="rlt" type="range" min="0" max="${T6}" step="${T6/120}" value="0" aria-label="Instant t, de 0 à ${fr(T6*1e3,0)} millisecondes"><output id="rlot" for="rlt">0 ms</output></label></div><p class="ctl-note">Fais glisser l’instant <i>t</i> : le circuit et les deux courbes suivent.</p></div>`,
    init(st){const sc=scenes.couple,I=$('#rlt'),Oo=$('#rlot');
      const lire=t=>{I.setAttribute('aria-valuetext',`t = ${fr(t*1e3,1)} ms`);Oo.textContent=`${fr(t*1e3,1)} ms`;};
      // le curseur suit la scène pendant qu'elle s'anime (la révélation de la réponse, par exemple)
      ctx.hooks.frame=()=>{if(document.activeElement!==I){I.value=sc.p.t;lire(sc.p.t);}};
      I.value=sc.p.t;lire(sc.p.t);
      I.addEventListener('input',()=>{ctx.stop();
        // l'élève prend la main : la révélation s'achève d'un coup, puis t suit le curseur
        const P=st.pari||st.verifie,pr=P&&P.reveal;if(pr)pr.forEach(r=>Object.assign(sc.p,r.p));
        sc.p.t=+I.value;sc.render();lire(sc.p.t);});
      majTemps();}},
  rl:{html:()=>`<div class="ctl"><div class="rl-cur">`+
      [['L','L',CRANS_L,2,v=>`${fr(CRANS_L[v],2)} H`],['R','R',CRANS_R,2,v=>`${fr(CRANS_R[v],0)} Ω`],['r','r',CRANS_r,2,v=>`${fr(CRANS_r[v],0)} Ω`],['E','E',CRANS_E,1,v=>`${fr(CRANS_E[v],0)} V`]]
        .map(([k,n,arr,i0,f])=>`<label><span><i>${n}</i></span><input id="sl-${k}" type="range" min="0" max="${arr.length-1}" step="1" value="${i0}" aria-label="${n}"><output id="so-${k}" for="sl-${k}">${f(i0)}</output></label>`).join('')
      +`</div><div class="ctl-btns"><button type="button" class="ctl-btn alt" id="rlauto">Montre-moi un exemple</button></div></div><p class="ctl-note" id="rlfb"></p>`,
    init(st){const sc=scenes.courbe,fb=$('#rlfb');
      const ARR={L:CRANS_L,R:CRANS_R,r:CRANS_r,E:CRANS_E},ks=['L','R','r','E'];
      const I={},Oo={};ks.forEach(k=>{I[k]=$(`#sl-${k}`);Oo[k]=$(`#so-${k}`);});
      const lab={L:v=>`${fr(CRANS_L[v],2)} H`,R:v=>`${fr(CRANS_R[v],0)} Ω`,r:v=>`${fr(CRANS_r[v],0)} Ω`,E:v=>`${fr(CRANS_E[v],0)} V`};
      const note=()=>{const tau=tauDe(sc.p.R,sc.p.r,sc.p.L),pal=sc.p.E/(sc.p.R+sc.p.r),fait=S.rlBouges.length>=4;
        fb.innerHTML=ix(`<i>τ</i> = <i>L</i>/(<i>R</i> + <i>r</i>) = ${fTau(tau*1e3)} ms ; <i>I</i><sub>0</sub> = <i>E</i>/(<i>R</i> + <i>r</i>) = ${fr(pal*1e3,0)} mA.<br>${ks.map(k=>`${S.rlBouges.includes(k)?'✓':'·'} ${k}`).join(' ')}${fait?'.<br><b>L ne règle que la durée, E que la hauteur, R + r les deux.</b>':''}`);};
      const poser=(k,v,marquer)=>{I[k].value=v;Oo[k].textContent=lab[k](+v);
        sc.p.L=CRANS_L[+I.L.value];sc.p.R=CRANS_R[+I.R.value];sc.p.r=CRANS_r[+I.r.value];sc.p.E=CRANS_E[+I.E.value];sc.render();
        S.rlPos={L:+I.L.value,R:+I.R.value,r:+I.r.value,E:+I.E.value};
        if(marquer&&!S.rlBouges.includes(k))S.rlBouges.push(k);
        note();ctx.majNav();};
      ks.forEach(k=>I[k].addEventListener('input',()=>{ctx.stop();poser(k,I[k].value,true);}));
      // l'exemple : L = 1,0 H, R = 100 Ω, r = 5 Ω, E = 12 V
      $('#rlauto').addEventListener('click',()=>{ctx.stop();poser('L',4,true);poser('R',3,true);poser('r',1,true);poser('E',3,true);});
      if(S.rlPos)setTimeout(()=>{if(ctx.etape()===st){ks.forEach(k=>poser(k,S.rlPos[k],false));}},900);
      else note();}}
};

// le curseur de temps paraît quand la question de l'étape est résolue : bonne réponse, deux essais, ou un pari fait
function resolue(st){const P=st.pari,a=S.ans[st.k];if(!P||a==null)return false;return !!P.opts[a].ok||!P.opts.some(o=>o.ok)||(S.essais[st.k]||[]).length>=2;}
function majTemps(){const st=ctx.etape();if(!st||st.ctl!=='temps')return;const z=$('#tctl');if(z&&z.hidden&&resolue(st))z.hidden=false;}
const surChoix=()=>setTimeout(majTemps,0);
root.addEventListener('click',surChoix);window.addEventListener('keydown',surChoix);

// « Passer » : un bouton du panneau mène à une autre étape
const surSaut=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');if(!b||!root.contains(b))return;const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0){e.preventDefault();ctx.aller(i);}};
root.addEventListener('click',surSaut);

return {BEATS,STEPS,CTL,mots,
  reset(){S.rlBouges=[];S.rlPos=null;},
  plain:s=>s.replace(/ ?%/g,' pour cent').replace(/Ω/g,' ohms').replace(/µ/g,'micro').replace(/τ/g,' tau ').replace(/Δ/g,' delta '),
  demonter(){root.removeEventListener('click',surSaut);root.removeEventListener('click',surChoix);window.removeEventListener('keydown',surChoix);}};
});
}
