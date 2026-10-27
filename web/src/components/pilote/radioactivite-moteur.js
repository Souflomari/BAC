/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « La décroissance radioactive », V3 (refonte 2026-10 ; plan :
 * docs/refonte/05-audit-v2-plan-v3.md §3.1, §3.3, §4).
 *
 * Onze parties, dans l'ordre commun aux trois leçons : ce qu'il faut savoir
 * (atome, noyau, notation ᴬ_Z X, isotopes — sautable par une question),
 * l'énigme (Becquerel, puis le gaz de Rutherford contre le sel d'uranium),
 * écrire la désintégration (Soddy, α, β⁻, β⁺, γ), cent dés (le tic par tic,
 * le survivant, la loi de la population), la demi-vie (marches, N₀/2ⁿ,
 * Rutherford), la formule (ΔN = −λNΔt, dN/dt = −λN, un détour sautable par
 * l'exponentielle, la vérification de N₀e^(−λt), le λ des dés), les grandeurs
 * (t½ = ln 2/λ, activité a = λN, N₀ depuis une masse, τ et la tangente), la
 * datation (carbone 14, Jebel Irhoud, choix du radioélément), la réponse à
 * l'énigme, un exercice du bac commenté (iode 131, 2022), le bilan.
 *
 * Les scènes vivent dans radioactivite-scenes-{a,b,c}.js, les outils et les
 * données sourcées dans radioactivite-outils.js ; le déroulé, le panneau, les
 * paris, les fiches et les dérivations dans noyau.js.
 *
 * Ce qui reste local : les lancers de dés (`lancer`, `rafale`, `relancer`,
 * touche L) ; la saisie de N₀ ; les boutons « passer » des deux questions
 * d'entrée (ce qu'il faut savoir, le rappel sur l'exponentielle).
 *
 * LE HASARD. Un générateur à graine (mulberry32) tire tous les lancers au
 * montage : « Retour » rejoue les mêmes dés. `?graine=123` fixe la graine
 * (captures). « Relancer » tire de nouveaux dés, avec une nouvelle graine.
 * Aucun nombre affiché n'est écrit à la main : il vient des lancers, d'un
 * calcul, ou d'une donnée sourcée (radioactivite-outils.js).
 */
import { monterLecon } from "./noyau";
import { lireNombre, proche } from "./exercices/nombre";
import {
  NB, fr, ent, sig3, sciH, TN, TS, nucT, outilsScene, mulberry32, tirerDes, serie,
  DE, ND, TV, EK, LAMD, TH, NA, N_U, T14, IRHOUD, IRH_DV, IRH_FRAC, N_C14_1G, IRH_RESTE, AGE30,
  T_THORON, DEPUIS, PERTE_U, T_I, LAM_I, T95, M_I, N0_I, A0_SAISIE,
} from "./radioactivite-outils";
import { scenesA } from "./radioactivite-scenes-a";
import { scenesB } from "./radioactivite-scenes-b";
import { scenesC } from "./radioactivite-scenes-c";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,clamp,scenes,hooks,S,wait,RM,defs}=ctx;
const $=ctx.$;
const tx=String.raw;
const O=outilsScene(ctx);

[['rarw','s-dim'],['rarwA','s-a']].forEach(([id,c])=>{const mk=E('marker',{id,viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'7',markerHeight:'7',orient:'auto-start-reverse'},defs);E('path',{d:'M0 0L10 5L0 10z',class:c},mk);});
E('rect',{x:100,y:140,width:810,height:456},E('clipPath',{id:'rclip-loi'},defs));
E('rect',{x:100,y:130,width:800,height:452},E('clipPath',{id:'rclip-expo'},defs));

/* ---------- le hasard ---------- */
let qg=null;try{qg=new URLSearchParams(location.search).get('graine');}catch(e){}
const GRAINE=/^\d{1,9}$/.test(qg||'')?+qg:(Math.random()*2147483647)>>>0;
root.dataset.graine=String(GRAINE);
const rng=mulberry32(GRAINE);
const D={};tirerDes(D,rng);
const AUTRES=[];for(let s=0;s<9;s++)AUTRES.push(serie(rng,100));
const GRANDES=[];for(let s=0;s<10;s++)GRANDES.push(serie(rng,10000).map(n=>n/100));

/* ---------- les trois pièges des copies (scène du bilan) ---------- */
const QUIZ=[
  {tag:'QCM du bac 2023',big:'*t* = 2 *t*_{1/2}',sub:'quelle part des noyaux s’est désintégrée ?',r1:'il reste *N*_{0}/4, soit 25 %',r2:'donc 75 % se sont désintégrés'},
  {tag:'sujet 2022, question 3.2',big:'λ = ln 2 / *t*_{1/2}',sub:'*t*_{1/2} = 8 jours ; *a*_{0} en becquerels',r1:'convertir : 8 jours = 691 200 s',r2:`λ ≈ 1,00 × 10^{−6} s^{−1}`},
  {tag:'sujets 2021, 2022 et 2024',big:'*a* = 8,0 × 10^{6} Bq',sub:'combien de noyaux *N* ?',r1:'*a* = λ*N*, donc *N* = *a* / λ',r2:'l’activité compte des désintégrations par seconde'},
];
scenesA(ctx,O);
scenesB(ctx,O,D,AUTRES,GRANDES);
scenesC(ctx,O,QUIZ);

/* ---------- gestes : lancer les dés ---------- */
// Prendre la main : arrêter toute animation du noyau, poser la scène à l'état de l'étape, garder les clés tenues par l'élève.
function prendre(sc,keys){ctx.stop();const keep={};keys.forEach(k=>keep[k]=sc.p[k]);Object.assign(sc.p,ctx.etape().pre,keep);}
function tw(sc,key,to,d,vivant){return new Promise(res=>{const a=sc.p[key];
  if(RM.matches||!d){sc.p[key]=to;sc.render();res();return;}
  const t0=performance.now();
  const f=now=>{if(!vivant()){res();return;}const t=Math.min(1,(now-t0)/d);sc.p[key]=ctx.lerp(a,to,ctx.ease(t));sc.render();if(t<1)requestAnimationFrame(f);else res();};
  requestAnimationFrame(f);});}
let rolling=false,ep=0;
function lancer(max,done,vite){
  const sc=scenes.des,st=ctx.etape();
  if(rolling){done&&done(false);return;}
  prendre(sc,['k']);const k=Math.round(sc.p.k);sc.p.k=k;sc.p.roll=0;
  if(k>=max){sc.render();hooks.frame&&hooks.frame();done&&done(false);return;}
  const my=++ep,vivant=()=>my===ep&&ctx.etape()===st&&root.isConnected;
  rolling=true;hooks.frame&&hooks.frame();
  // le lancer est fini : les 6 rougissent un instant, puis quittent la grille (le mouvement réduit les laisse en rouge)
  const fin=async()=>{
    rolling=false;sc.p.roll=0;sc.p.k=k+1;sc.p.leave=0;S.kmax=Math.max(S.kmax||0,k+1);sc.render();hooks.frame&&hooks.frame();done&&done(true);
    if(RM.matches)return;
    await wait(vite?110:380);if(!vivant())return;
    await tw(sc,'leave',1,vite?260:560,vivant);
    if(vivant())hooks.frame&&hooks.frame();};
  if(RM.matches){fin();return;}
  sc.p.roll=1;const t0=performance.now();let last=0;
  const dur=vite?300:480;
  const step=now=>{if(!vivant()){rolling=false;sc.p.roll=0;done&&done(false);return;}
    if(now-last>70){sc.render();last=now;}
    if(now-t0<dur)requestAnimationFrame(step);else fin();};
  requestAnimationFrame(step);
}
async function rafale(max){const st=ctx.etape();
  while(ctx.etape()===st&&Math.round(scenes.des.p.k)<max){const ok=await new Promise(r=>lancer(max,r,true));if(!ok)break;await wait(520);}}
// « Relancer » : de nouveaux dés (une nouvelle graine), et l'on recommence au tic 0
function relancer(){
  if(rolling)return;ep++;
  const g=(Math.random()*2147483647)>>>0;tirerDes(D,mulberry32(g));root.dataset.graine=String(g);
  S.kmax=0;S.relances=(S.relances||0)+1;
  const sc=scenes.des;prendre(sc,[]);sc.p.k=0;sc.p.roll=0;sc.p.leave=1;sc.render();hooks.frame&&hooks.frame();
}

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'Écrire la désintégration',court:'Écrire'},
  {name:'Cent dés',court:'Cent dés'},{name:'La demi-vie',court:'Demi-vie'},{name:'La formule',court:'Formule'},
  {name:'Les grandeurs',court:'Grandeurs'},{name:'La datation',court:'Datation'},{name:'Retour à l’énigme',court:'Retour'},
  {name:'Au bac',court:'Au bac'},{name:'Bilan',court:'Bilan'}];
// un pari : neutre à l'écran ; `juste` (3ᵉ case) ne sert qu'au profil de fin
const BET=t=>({opts:t.map(([x,fb,j])=>({t:x,fb,juste:!!j}))});
// une question : une bonne réponse ; chaque option fausse a son explication et son indice (second essai)
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>({t:x,ok,fb,indice}))});
// Un noyau en HTML, A au-dessus de Z (radioactivite.css) : les options ne repassent pas par KaTeX. Insécable, et balisé de
// séparateurs invisibles pour que la voix lise « C 14 » et non « 146C ».
const IM='\u2063';
const nuc=(A,Z,X)=>`<span class="nw">${IM}<span class="nuc"><span>${A}${IM}</span><span>${String(Z).replace('-','−')}${IM}</span></span>${X}</span>`;
const bm='β<sup>−</sup>',bp='β<sup>+</sup>';
const NI='<i>N</i>',N0='<i>N</i><sub>0</sub>',Th='<i>t</i><sub>1/2</sub>',Nt='<i>N</i>(<i>t</i>)',a0='<i>a</i><sub>0</sub>',ai='<i>a</i>';
const r0=k=>Math.round(EK(k));
const F56=tx`\dfrac{5}{6}`;
const TICK=(k,m)=>k>=1?`Tic ${k} : il reste <b>${D.NK[k]}</b> dés. ${k<m?`Encore ${m-k} tic${m-k>1?'s':''}.`:''}`:'Appuie sur « Lancer les dés ».';
const PARIS10=[2,16,42],J10=PARIS10.reduce((b,v,i,a)=>Math.abs(v-EK(TV))<Math.abs(a[b]-EK(TV))?i:b,0);
function pari10(){const j=S.first.pari10;if(j==null)return '';
  if(j===J10)return 'Ton pari était le bon. L’étape suivante explique pourquoi.';
  return j===0?'Le piège : à chaque tic, il part un sixième de ce qui <b>reste</b>, pas un sixième des 100 du début.':'Les dés partent vite au début, quand ils sont nombreux : dix tics en emportent beaucoup.';}
// un bouton « passer » : seulement si la question d'entrée est réussie du premier coup
const saut=(cle,vers,oui,non)=>({get html(){return ctx.juste(cle)?`<button type="button" class="ctl-btn alt saut" data-aller="${vers}">${oui} →</button>`:`<p class="small">${non}</p>`;}});
function rappelEnigme(){const j=S.first.enigme;if(j==null)return '';
  return ['Ton pari : le gaz s’échappe. Non : même enfermé, le thoron perd la moitié de son rayonnement chaque minute.',
    'Ton pari : l’uranium a plus de noyaux. Non : tu l’as vu avec les dés, le nombre de noyaux ne change pas la demi-vie.',
    'Ton pari était le bon : chaque sorte de noyau a son propre rythme.'][j];}

const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'sav-test',beat:0,scene:'atome',set:{atom:1,zoom:0,q:1,nota:0,iso:0,emit:0},sujet:'la composition d’un noyau',
  text:[`Ce qu’il faut savoir : juste du premier coup, tu passes. QCM du bac 2022 : le [[noyau]] ${nuc(14,6,'C')} contient…`],
  verifie:{...VF([
    ['6 protons et 8 neutrons',true,'Oui : 6 protons en bas, 14 nucléons en haut : 8 neutrons.'],
    ['6 protons et 14 neutrons',false,'En haut, 14 compte tous les nucléons : 14 − 6 = 8 neutrons.','Le nombre du haut compte-t-il seulement les neutrons ?'],
    ['14 protons et 6 neutrons',false,'C’est l’inverse : en bas, 6 protons ; en haut, 14 nucléons.','Lequel des deux nombres compte les protons ?'],
    ['8 protons et 6 neutrons',false,'Le nombre du bas, 6, compte les protons ; les neutrons sont 8.','Regarde le nombre du bas : que compte-t-il ?']]),
    apres:saut('sav-test','becq','Je le sais : passer à l’énigme','La suite te le montre en images.')}},
{cle:'sav-atome',beat:0,scene:'atome',set:{atom:1,zoom:0,q:0},seq:[{p:{zoom:1},d:1800,w:900}],
  text:['Un [[atome]] : au centre, un noyau minuscule ; autour, des électrons, de charge négative.',
    {t:'Zoom sur le noyau du carbone 14 : des [[proton|protons]], de charge positive, et des [[neutron|neutrons]], sans charge.',a:0},
    {t:'Protons et neutrons sont les [[nucleon|nucléons]] du noyau : ici 6 protons et 8 neutrons, 14 nucléons.',a:0,fort:true}]},
{cle:'sav-notation',beat:0,scene:'atome',set:{zoom:1},seq:[{p:{nota:1},d:1300},{p:{iso:1},d:1200,w:700}],
  text:['Un noyau s’écrit avec le [[symbole]] X de son élément et deux nombres.',
    {t:'En haut, <i>A</i>, le [[nombremasse|nombre de masse]] : les nucléons. En bas, <i>Z</i>, le [[nombrecharge|nombre de charge]] : les protons. Il reste <i>N</i> = <i>A</i> − <i>Z</i> neutrons.',a:0},
    {t:'Le carbone 12 a lui aussi 6 protons, mais 6 neutrons : même <i>Z</i>, <i>A</i> différent. Ce sont deux [[isotope|isotopes]] du carbone.',a:1,fort:true}],
  tex:[[tx`{}^{A}_{Z}\mathrm{X}\qquad ${nucT(14,6,'C')}\qquad ${nucT(12,6,'C')}`,'A Z X ; carbone 14 ; carbone 12']]},

/* ===== 1. l'énigme ===== */
{cle:'becq',beat:1,scene:'plaque',tag:'1896 · Paris',set:{drawer:0,dev:0,src:0},
  text:['Paris, février 1896. Henri Becquerel enveloppe une plaque photographique dans du papier noir épais.','Il pose dessus des lamelles d’un sel d’uranium, [[phosphorescent]], et expose le tout au soleil.','Au développement, la silhouette des lamelles apparaît en noir : le sel émet un [[rayonnement]] invisible, qui traverse le papier.',{t:'Son idée : c’est le soleil qui fait émettre ces rayons au sel.',fort:true}]},
{cle:'tiroir',beat:1,scene:'plaque',tag:'1896 · Paris',seq:[{p:{drawer:1},d:1300}],
  text:[{t:'Les 26 et 27 février, le soleil se cache : Becquerel range ses plaques dans un tiroir, lamelles en place.',a:0},'Le 1<sup>er</sup> mars, sans avoir revu le soleil, il les développe quand même.','À quoi t’attends-tu ?'],
  pari:{reveal:[{p:{drawer:0,dev:1},d:1500},{p:{src:1},d:1100}],...BET([
    ['Rien : sans lumière, pas d’image','C’était logique. Et pourtant les silhouettes sont là, bien noires : sans soleil, le sel d’uranium émet tout seul. Au printemps 1896, des sels d’uranium qui ne luisent pas font de même.'],
    ['Des images très faibles','C’est ce qu’attendait Becquerel. Et pourtant les silhouettes sont là, bien noires : sans soleil, le sel d’uranium émet tout seul. Au printemps 1896, des sels d’uranium qui ne luisent pas font de même.'],
    ['Des silhouettes bien noires','Tu as vu plus loin que Becquerel, qui attendait des images très faibles. Sans soleil, le sel d’uranium émet tout seul ; au printemps 1896, des sels d’uranium qui ne luisent pas font de même.',1]])}},
{cle:'enigme',beat:1,scene:'enigme',set:{thor:0,ura:0,rep:0},seq:[{p:{thor:1},d:1500,w:200},{p:{ura:1},d:1000,w:600}],
  text:['Ce rayonnement vient des noyaux [[radioactivite|radioactifs]] du sel d’uranium. D’autres en émettent, à d’autres rythmes.',
    {t:'En 1900, Rutherford étudie un gaz radioactif issu du thorium : son rayonnement tombe à la moitié en une minute environ.',a:0},
    {t:'Le sel de Becquerel, lui, émet encore autant aujourd’hui. Pourquoi ?',a:1,fort:true}],
  pari:BET([
    ['Le gaz s’échappe, l’uranium reste','Mais Rutherford enfermait son gaz : son rayonnement baissait quand même. Réponse à la fin.'],
    ['L’uranium contient bien plus de noyaux','Le nombre change la quantité de rayonnement, pas le temps pour en perdre la moitié. Réponse à la fin.'],
    ['Chaque sorte de noyau a son propre rythme','Garde cette idée : la leçon va lui donner un nom et un nombre. Réponse à la fin.',1]])},

/* ===== 2. écrire la désintégration ===== */
{cle:'c14',beat:2,scene:'atome',set:{atom:1,zoom:1,q:0,nota:0,iso:0,emit:0,c14:1},
  text:['Que se passe-t-il dans un noyau qui « émet » ? Regarde un noyau instable, le carbone 14.',`Sans aucune cause extérieure, un de ses neutrons se change en proton, et une [[betamoins|particule ${bm}]], un électron, est émise. Que devient le noyau ?`],
  pari:{reveal:[{p:{emit:0.5},d:900},{p:{emit:1},d:1700}],...BET([
    ['Toujours du carbone 14','Il a maintenant 7 protons : ce n’est plus du carbone. C’est de l’azote 14, un autre élément.'],
    ['De l’azote 14 : 7 protons, 7 neutrons','Oui : un proton de plus, c’est un autre élément ; le nombre de nucléons, 14, ne change pas.',1],
    ['Du carbone 13 : il a perdu un nucléon','Aucun nucléon ne part : un neutron devient un proton. 14 nucléons, dont 7 protons : de l’azote 14.']]),
    apres:{html:'<p class="small">Noyau père → noyau fils + particule : c’est une [[desintegration|désintégration]], spontanée et [[aleatoire|aléatoire]]. On l’appelle la [[radioactivite|radioactivité]].</p>'}}},
{cle:'soddy',beat:2,scene:'desint',set:{ty:0,rv:1},
  text:['Écris-la comme au bac : noyau père → noyau fils + particule. Puis compte, avant et après la flèche.'],
  deriv:[
    {tex:tx`${nucT(14,6,'C')}\longrightarrow ${nucT(14,7,'N')}+${nucT(0,-1,'e')}`,alt:'carbone 14 donne azote 14 plus un électron',r:'L’électron s’écrit avec <i>A</i> = 0 (aucun nucléon) et <i>Z</i> = −1 (sa charge).'},
    {tex:tx`A\,:\ 14=14+0\qquad Z\,:\ 6=7+(-1)`,alt:'A : 14 = 14 + 0 ; Z : 6 = 7 + (−1)',r:'Le nombre de nucléons et la charge sont les mêmes des deux côtés de la flèche.'},
    {tex:tx`{}^{A}_{Z}\mathrm{X}\longrightarrow{}^{A'}_{Z'}\mathrm{Y}+{}^{a}_{z}\mathrm{P}`,alt:'X donne Y plus P',r:'En général : un noyau père X, un noyau fils Y, une particule P.'},
    {tex:tx`A=A'+a\qquad Z=Z'+z`,alt:'A = A′ + a ; Z = Z′ + z',r:'Ce sont les deux [[soddy|lois de conservation]], dites de Soddy : elles valent pour toute réaction nucléaire.'}]},
{cle:'alpha',beat:2,scene:'desint',set:{ty:1,rv:0},
  text:['L’uranium 238 émet une [[alpha|particule α]] : un noyau d’hélium, 2 protons et 2 neutrons. Que devient le noyau d’uranium ?'],
  pari:{reveal:[{p:{rv:1},d:1100}],...BET([
    ['Il perd 4 nucléons, et garde ses 92 protons','L’erreur classique : « α ne change que <i>A</i> ». α emporte aussi 2 protons : <i>Z</i> passe de 92 à 90. C’est du thorium 234.'],
    ['Il perd 4 nucléons, dont 2 protons','Oui : <i>A</i> = 238 − 4 = 234 et <i>Z</i> = 92 − 2 = 90. Le noyau fils est le thorium 234.',1],
    ['Il perd 2 nucléons, dont 2 protons','α compte 4 nucléons : <i>A</i> baisse de 4, <i>Z</i> de 2. Le noyau fils est le thorium 234.']]),
    apres:{tex:[[tx`${nucT(238,92,'U')}\longrightarrow ${nucT(234,90,'Th')}+${nucT(4,2,'He')}`,'uranium 238 donne thorium 234 plus hélium 4']]}}},
{cle:'betaplus',beat:2,scene:'desint',set:{ty:2,rv:0},
  text:[`Le fluor 18 (imagerie médicale) émet un [[positon]] ${nuc(0,'+1','e')} : comme un électron, mais de charge +1. C’est la radioactivité ${bp}. Que devient <i>Z</i> ?`],
  pari:{reveal:[{p:{rv:1},d:1100}],...BET([
    ['<i>Z</i> augmente de 1',`Ce serait vrai en ${bm}. Ici la particule emporte +1 : <i>Z</i> passe de 9 à 8, de l’oxygène 18.`],
    ['<i>Z</i> diminue de 1','Oui : la charge se conserve, 9 = 8 + 1, et <i>A</i> ne change pas. De l’oxygène 18.',1],
    ['<i>Z</i> ne change pas','La particule emporte une charge +1 : pour que la charge se conserve, <i>Z</i> passe de 9 à 8.']]),
    apres:{tex:[[tx`${nucT(18,9,'F')}\longrightarrow ${nucT(18,8,'O')}+${nucT(0,'+1','e')}`,'fluor 18 donne oxygène 18 plus un positon']]}}},
{cle:'gamma',beat:2,scene:'desint',set:{ty:3,rv:0},
  text:[`L’iridium 192 (sujet 2024) est émetteur ${bm} ; son noyau fils, trop énergétique, émet en plus un [[gamma|rayonnement γ]]. Change-t-il <i>A</i> ou <i>Z</i> ?`],
  pari:{reveal:[{p:{rv:1},d:1100}],...BET([
    ['Il diminue <i>Z</i> de 1',`γ n’a pas de charge. C’est ${bm} qui fait passer <i>Z</i> de 77 à 78.`],
    ['Il diminue <i>A</i> de 1','γ n’emporte aucun nucléon : <i>A</i> ne change pas. C’est une onde électromagnétique.'],
    ['Ni <i>A</i> ni <i>Z</i>','Oui : γ n’a ni masse ni charge. Il accompagne α ou β sans changer l’équation.',1]]),
    apres:{tex:[[tx`${nucT(192,77,'Ir')}\longrightarrow ${nucT(192,78,'Pt')}+${nucT(0,-1,'e')}+\gamma`,'iridium 192 donne platine 192 plus un électron, avec un rayonnement gamma']]}}},
{cle:'v-ecrire',beat:2,scene:'desint',set:{ty:4,rv:0},sujet:'écrire une désintégration',
  text:[`Sujet 2021 : le plutonium 238 ${nuc(238,94,'Pu')} subit une désintégration α. Son noyau fils est…`],
  verifie:{...VF([
    [nuc(234,92,'U'),true,'Oui : <i>A</i> = 238 − 4 = 234 et <i>Z</i> = 94 − 2 = 92 : l’uranium 234.'],
    [nuc(238,93,'Np'),false,`Ce serait ${bm} : <i>Z</i> + 1, <i>A</i> inchangé. α emporte 4 nucléons, dont 2 protons.`,'Une particule α emporte-t-elle des nucléons ?'],
    [nuc(234,94,'Pu'),false,'α emporte aussi 2 protons : <i>Z</i> baisse de 2. Ce n’est plus du plutonium.','« α ne change que <i>A</i> » : vraiment ?'],
    [nuc(238,92,'U'),false,'<i>Z</i> est juste, mais <i>A</i> baisse de 4 : 238 − 4 = 234.','Et le nombre de nucléons ?']]),reveal:[{p:{rv:1},d:1000}]}},

/* ===== 3. cent dés ===== */
{cle:'des',beat:3,scene:'des',set:{dice:0,k:0,graph:0,duel:0,duelRv:0,others:0,big:0,law:0},seq:[{p:{dice:1},d:1300}],ctl:'tic',tic:1,needLabel:'Lance d’abord',
  text:['Quand un noyau va-t-il se désintégrer ? Personne ne peut le prévoir : c’est aléatoire.',{t:'Alors on remplace chaque noyau par un dé. À chaque <span class="nw">« [[tic]] »</span>, on lance les dés encore en jeu : un 6, et ce noyau se désintègre ; il sort du jeu.',a:0},'À toi : lance les dés, une fois.'],
  note:k=>k>=1?`<b>${D.DK[1]}</b> dés ont fait 6 : ces noyaux se sont désintégrés. Il en reste <b>${D.NK[1]}</b>.`:'Appuie sur « Lancer les dés » : les 6 rougissent, puis quittent la grille.'},
{cle:'pari10',beat:3,scene:'des',set:{k:1},
  text:['Avant de continuer : au bout de 10 tics, combien de dés resteront en jeu ?'],
  pari:BET([['Presque aucun : dix fois un sixième, c’est plus que tout','Pari noté. Lance, et compte.',J10===0],['Une quinzaine','Pari noté. Lance, et compte.',J10===1],['Une quarantaine','Pari noté. Lance, et compte.',J10===2]])},
{cle:'tic10',beat:3,scene:'des',set:{graph:1},ctl:'tic',tic:10,needLabel:'Lance d’abord',
  text:['Lance jusqu’au dixième tic.','Chaque tic ajoute un point rouge au graphe : le pourcentage de dés encore en jeu.'],
  note:k=>k<10?TICK(k,10):`Tic 10 : il en reste <b>${D.NK[10]}</b>. ${pari10()}`},
{cle:'compte',beat:3,scene:'comptes',set:{n:0,cap:0},seq:[{p:{n:1,cap:1},d:900}],
  text:['Comptons ce que le hasard donne en moyenne, tic par tic.',{t:`À chaque tic, un dé sur ${DE} part : il en reste cinq sixièmes.`,a:0}],
  deriv:[
    {tex:tx`${ND}\times\tfrac56\approx ${r0(1)}`,alt:`${ND} × 5/6 ≈ ${r0(1)}`,r:`Tic 1 : un sixième de ${ND} part (≈ ${fr(EK(0)/DE,1)} dés).`,p:{n:2}},
    {tex:tx`${r0(1)}\times\tfrac56\approx ${r0(2)}`,alt:`${r0(1)} × 5/6 ≈ ${r0(2)}`,r:`Tic 2 : un sixième de ${r0(1)} part (≈ ${fr(EK(1)/DE,1)}), pas un sixième de ${ND}.`,p:{n:3}},
    {tex:tx`${r0(2)}\times\tfrac56\approx ${r0(3)}`,alt:`${r0(2)} × 5/6 ≈ ${r0(3)}`,r:`Tic 3 : un sixième de ${r0(2)} seulement (≈ ${fr(EK(2)/DE,1)}).`,p:{n:4}},
    {tex:tx`\underbrace{${ND}\times\tfrac56\times\cdots\times\tfrac56}_{10\ \text{fois}}\approx ${r0(10)}`,alt:`${ND} × 5/6 × … × 5/6 (10 fois) ≈ ${r0(10)}`,r:()=>`Dix fois de suite × 5/6 : une quinzaine. De moins en moins de dés partent, car on prend chaque fois un sixième de ce qui reste. Ton tirage : ${D.NK[10]}.`,p:{n:11}}]},
{cle:'duel',beat:3,scene:'des',set:{k:TV,graph:1,duel:1,duelRv:0},
  text:['Un noyau qui a survécu longtemps devient-il plus fragile ?','Voici un dé de ta grille qui a survécu à 10 lancers, et un dé neuf. Au prochain lancer, lequel a le plus de chances de faire 6 ?'],
  pari:{reveal:[{p:{duelRv:1},d:900}],...BET([
    ['Le survivant : son tour va venir','C’est l’intuition de l’ampoule usée. Mais un dé n’a pas de mémoire : 1 chance sur 6 pour chacun. Un noyau non plus ne vieillit pas.'],
    ['Le dé neuf : le survivant est solide','Le survivant a eu de la chance, pas de la solidité : ses dix lancers ne changent rien au onzième. 1 chance sur 6 chacun.'],
    ['Les deux, autant','Oui : un dé n’a pas de mémoire. Un noyau non plus : sa chance de se désintégrer ne dépend pas de son âge.',1]])}},
{cle:'tic20',beat:3,scene:'des',set:{duel:0,duelRv:0,k:TV,graph:1},ctl:'tic',tic:20,needLabel:'Lance d’abord',
  text:['Aucun dé ne s’use. Reviens à toute la population : continue jusqu’au vingtième tic, et regarde la forme de tes points.'],
  note:k=>k<20?TICK(k,20):`Tic 20 : il en reste <b>${D.NK[20]}</b>. Les points tombent vite au début, puis de plus en plus lentement : moins il reste de dés, moins il en part.`},
{cle:'grands',beat:3,scene:'des',set:{k:20},seq:[{p:{others:1},d:1800}],
  text:[{t:'Neuf autres séries de 100 dés, en gris : aucune n’est la tienne, toutes ont la même allure.',a:0},'Avec 10 000 dés par série, dix séries s’écarteraient les unes des autres…'],
  pari:{reveal:[{p:{big:1},d:1600},{p:{law:1},d:1600}],...BET([
    ['Plus : plus de dés, plus de hasard','Chaque dé reste imprévisible, mais leurs écarts se compensent : les dix séries de 10 000 dés (traits fins) se confondent presque.'],
    ['Autant qu’avec 100','Regarde les traits fins : les dix séries de 10 000 dés se confondent presque. Les écarts de chaque dé se compensent.'],
    ['Moins : presque une seule courbe','Oui : les dix séries de 10 000 dés se confondent presque. Plus il y a de noyaux, plus la courbe est nette.',1]]),
    apres:{html:`<p class="small">Un milligramme d’uranium contient environ ${sciH(N_U)} noyaux : il ne reste qu’une courbe, toujours la même. Un noyau seul est imprévisible ; une [[population]] suit une loi exacte.</p>`}}},
{cle:'v-des',beat:3,scene:'comptes',set:{n:11,cap:1},sujet:'un sixième de ce qui reste',
  text:['Il reste 60 dés en jeu.','Combien vont partir, en moyenne, au tic suivant ?'],
  verifie:VF([
    [`Environ ${ent(60/DE)} : un sixième des 60 dés restants`,true,`Oui : à chaque tic, il part un sixième de ce qui reste : 60 ÷ ${DE} = ${ent(60/DE)}.`],
    [`Environ ${ent(Math.round(ND/DE))} : un sixième des ${ND} dés du départ`,false,`C’est le piège. Les dés déjà partis ne sont plus là : on prend un sixième de 60, pas un sixième de ${ND}.`,'Les dés déjà sortis sont-ils encore lancés ?'],
    [`Environ ${ent(60*(DE-1)/DE)} : cinq sixièmes des 60 dés`,false,`Cinq sixièmes, ce sont les dés qui restent. Ceux qui partent, c’est le sixième manquant : ${ent(60/DE)}.`,'Cinq sixièmes, est-ce la part qui reste ou celle qui part ?']])},

/* ===== 4. la demi-vie ===== */
{cle:'marche1',beat:4,scene:'loi',set:{xmax:20,curve:1,run:1,st1:0,st2:0,st3:0,st4:0,stSym:0,tk:0,n0:0,pente:0,lam:0,th:0,tan:0,bars:0},seq:[{p:{st1:1},d:1400}],
  text:['Reviens à la courbe des dés. Pour la lire d’un coup d’œil, une question : en combien de tics perd-on la moitié des dés ?',{t:`Partie de ${ND}, la courbe passe à ${ent(ND/2)} au bout de ${fr(TH,1)} tics.`,a:0}]},
{cle:'marche2',beat:4,scene:'loi',
  text:[`Pour passer de ${ent(ND/2)} à ${ent(ND/4)}, il faudra…`],
  pari:{reveal:[{p:{st2:1},d:1400}],...BET([
    [`Moins de ${fr(TH,1)} tics : il y a moins de dés`,`Moins de dés, mais chacun garde 1 chance sur ${DE} : il faut le même temps pour en perdre la moitié. Regarde la deuxième marche : ${fr(TH,1)} tics.`],
    [`${fr(TH,1)} tics, exactement pareil`,`Oui : la deuxième marche a la même largeur. Peu importe combien il en reste, la moitié part en ${fr(TH,1)} tics.`,1],
    [`Plus de ${fr(TH,1)} tics : il ne reste que les plus résistants`,`Les survivants n’ont rien de spécial : ils ont eu de la chance. Chacun garde 1 chance sur ${DE}, d’où la même largeur : ${fr(TH,1)} tics.`]])}},
{cle:'demivie',beat:4,scene:'loi',seq:[{p:{st3:1},d:1100},{p:{st4:1},d:1100,w:300}],
  text:[{t:`Encore la moitié : ${fr(ND/8,1)}, puis ${fr(ND/16,2)}. Toutes les marches ont la même largeur.`,a:1},
    {t:`Cette durée est la [[demivie|demi-vie]] ${Th} : la durée au bout de laquelle la moitié des noyaux initialement présents se sont désintégrés.`,a:1,fort:true},
    {t:'C’est la définition demandée au bac. La courbe, elle, ne touche jamais zéro.',a:1}]},
{cle:'demi-n',beat:4,scene:'loi',set:{st1:0,st2:0,st3:0,st4:0,stSym:1,run:0},
  text:[`Combien reste-t-il après plusieurs demi-vies ? On note ${N0} le nombre de noyaux au départ, ${Nt} le nombre restant à l’instant <i>t</i>.`],
  deriv:[
    {tex:tx`N(t_{1/2})=\dfrac{N_0}{2}`,alt:'N(t½) = N₀/2',r:'Après une demi-vie, il reste la moitié.',p:{st1:1}},
    {tex:tx`N(2\,t_{1/2})=\dfrac12\times\dfrac{N_0}{2}=\dfrac{N_0}{4}`,alt:'N(2 t½) = ½ × N₀/2 = N₀/4',r:'Pendant la deuxième, la moitié de ce qui restait part à son tour.',p:{st2:1}},
    {tex:tx`N(3\,t_{1/2})=\dfrac12\times\dfrac{N_0}{4}=\dfrac{N_0}{8}`,alt:'N(3 t½) = ½ × N₀/4 = N₀/8',r:'Une division par 2 à chaque demi-vie.',p:{st3:1}},
    {tex:tx`N(n\,t_{1/2})=\dfrac{N_0}{2^{n}}`,alt:'N(n t½) = N₀/2ⁿ',r:`Divisé <i>n</i> fois par 2 : par 2<sup><i>n</i></sup>, pas par <i>n</i>. C’est ce qui <b>reste</b> ; les noyaux désintégrés sont ${N0} − ${N0}/2<sup><i>n</i></sup>.`,p:{st4:1}}]},
{cle:'ruther',beat:4,scene:'ruther',tag:'1900 · Montréal',set:{pts:0,stairs:0},seq:[{p:{pts:1},d:1600,w:200}],
  text:['Des noyaux véritables font-ils pareil ? Voici les mesures de Rutherford sur le gaz de l’énigme.',{t:'Son rayonnement tombe à la moitié en une minute environ : 0,51 à 62 s.',a:0},'Au bout de combien de temps tombe-t-il au quart ?'],
  pari:{reveal:[{p:{stairs:1},d:1600}],...BET([
    ['Vers 1 min 30 s','Un quart, c’est la moitié de la moitié : deux demi-vies, donc vers 2 min. Sa mesure à 118 s : 0,23, presque un quart.'],
    ['Vers 2 min','Oui : la moitié de la moitié, deux demi-vies. Sa mesure à 118 s : 0,23, presque un quart.',1],
    ['Vers 4 min','Quatre minutes, ce serait quatre demi-vies : un seizième. Le quart, c’est deux demi-vies, vers 2 min. Sa mesure à 118 s : 0,23.']])}},
{cle:'v-demivie',beat:4,scene:'loi',set:{st1:1,st2:1,st3:1,st4:1,stSym:1,run:0},sujet:'N₀/2ⁿ après n demi-vies',
  text:['L’iode 131 a une demi-vie de 8 jours.',`Au bout de 24 jours, quelle part des noyaux initiaux ${N0} reste-t-il ?`],
  verifie:VF([
    [`${N0}/8, soit 12,5 %`,true,`Oui : 24 jours = 3 demi-vies, et 2 × 2 × 2 = 8.`],
    [`${N0}/3`,false,'On divise par 2 à chaque demi-vie, pas par le nombre de demi-vies.','Divise-t-on par le nombre de demi-vies ?'],
    [`7${N0}/8`,false,'Ce sont les noyaux désintégrés, pas ceux qui restent.','Est-ce ce qui reste, ou ce qui est parti ?'],
    ['Plus rien : tout a disparu',false,'La courbe ne touche jamais zéro : à chaque demi-vie, il reste la moitié.','La courbe touche-t-elle zéro ?']])},

/* ===== 5. la formule ===== */
{cle:'produit',beat:5,scene:'loi',set:{xmax:8,curve:0,run:0,st1:0,st2:0,st3:0,st4:0,stSym:0,tk:0,n0:0},
  text:['Bon moment pour une pause. Puis écris ce que font les dés : <i>N</i><sub><i>k</i></sub>, les dés restants après <i>k</i> tics.'],
  deriv:[
    {tex:tx`N_1=N_0\times ${F56}`,alt:'N₁ = N₀ × 5/6',r:`Tic 1 : chaque dé a ${DE-1} chances sur ${DE} de rester ; il reste 5/6 des dés.`,p:{tk:1}},
    {tex:tx`N_2=N_1\times ${F56}=N_0\times\left(${F56}\right)^{2}`,alt:'N₂ = N₁ × 5/6 = N₀ × (5/6)²',r:`Tic 2 : on repart de <i>N</i><sub>1</sub>, et il en reste encore 5/6.`,p:{tk:2}},
    {tex:tx`N_3=N_0\times\left(${F56}\right)^{3}`,alt:'N₃ = N₀ × (5/6)³',r:'Tic 3 : une multiplication par 5/6 de plus.',p:{tk:3}},
    {tex:tx`N_k=N_0\times\left(${F56}\right)^{k}`,alt:'N_k = N₀ × (5/6)^k',r:'Après <i>k</i> tics, on a multiplié <i>k</i> fois par 5/6. Voilà la courbe des dés, en formule.',p:{curve:1}}]},
{cle:'deltaN',beat:5,scene:'loi',set:{xmax:20,curve:1,tk:0,n0:1},sujet:'ΔN = −λNΔt',
  text:[`Un tic enlève un sixième de ce qui reste : la [[variation]] Δ${NI} vaut −${NI}/6. Un vrai noyau a, pendant une courte durée Δ<i>t</i>, la petite chance λΔ<i>t</i> de se désintégrer (λ : la [[constanteradio|constante radioactive]]).`,
    `Sur ${NI} noyaux, combien partent pendant Δ<i>t</i> ?`],
  verifie:VF([
    [`λ${NI}Δ<i>t</i>`,true,`Oui : Δ${NI} = −λ${NI}Δ<i>t</i>, une part de ce qui reste.`],
    [`λ${N0}Δ<i>t</i>`,false,`Le piège des dés : on compte les ${NI} noyaux qui restent.`,'Les noyaux déjà désintégrés peuvent-ils encore se désintégrer ?'],
    ['λΔ<i>t</i>',false,`C’est la chance d’un seul noyau ; avec ${NI} noyaux, il en part ${NI} fois plus.`,'C’est la chance d’un seul noyau. Et combien y en a-t-il ?']])},
{cle:'dNdt',beat:5,scene:'loi',set:{pente:0,n0:1},
  text:['Une loi pour toutes les durées : divise par Δ<i>t</i>, puis fais tendre Δ<i>t</i> vers 0.'],
  deriv:[
    {tex:tx`\Delta N=-\lambda\,N\,\Delta t`,alt:'ΔN = −λNΔt',r:'Le nombre de noyaux qui partent pendant Δ<i>t</i>.'},
    {tex:tx`\dfrac{\Delta N}{\Delta t}=-\lambda\,N`,alt:'ΔN/Δt = −λN',r:`On divise par Δ<i>t</i> : la variation de ${NI} par unité de temps.`},
    {tex:tx`\dfrac{dN}{dt}=-\lambda\,N`,alt:'dN/dt = −λN',r:`Quand Δ<i>t</i> tend vers 0, ce taux devient la [[derivee|dérivée]] d${NI}/d<i>t</i>. La pente de la courbe est proportionnelle à ce qui reste.`,p:{pente:1}}]},
{cle:'x-test',beat:5,scene:'loi',set:{pente:1},sujet:'dériver e^(kt)',
  text:['Il faut une fonction proportionnelle à sa propre dérivée : la [[exponentielle|fonction exponentielle]]. Juste du premier coup, tu sautes le rappel.','La dérivée de <i>t</i> ↦ e<sup>−2<i>t</i></sup> est…'],
  verifie:{...VF([
    ['−2e<sup>−2<i>t</i></sup>',true,'Oui : (e<sup><i>kt</i></sup>)′ = <i>k</i>e<sup><i>kt</i></sup>, ici avec <i>k</i> = −2.'],
    ['e<sup>−2<i>t</i></sup>',false,'Ici l’exposant est −2<i>t</i> : le −2 descend devant. (e<sup><i>kt</i></sup>)′ = <i>k</i>e<sup><i>kt</i></sup>.','Que devient le −2 de l’exposant quand on dérive ?'],
    ['−2<i>t</i>e<sup>−2<i>t</i></sup>',false,'On ne multiplie pas par l’exposant entier, seulement par la dérivée de −2<i>t</i>, qui est −2.','Dérive seulement l’exposant −2<i>t</i> : que trouves-tu ?']]),
    apres:saut('x-test','verif','Je la connais : passer le rappel','Le rappel suit, en deux étapes.')}},
{cle:'expo',beat:5,scene:'expo',set:{ex:0,emx:0,tg:0,ln2:0},seq:[{p:{ex:1},d:1400},{p:{tg:1},d:900,w:500},{p:{emx:1},d:1400,w:500}],
  text:['La [[exponentielle|fonction exponentielle]] <i>x</i> ↦ e<sup><i>x</i></sup> est la fonction égale à sa propre dérivée qui vaut 1 en 0 : (e<sup><i>x</i></sup>)′ = e<sup><i>x</i></sup>, e<sup>0</sup> = 1 ; e ≈ 2,718.',
    {t:'En chaque point, sa pente est égale à sa hauteur.',a:1},
    {t:'Avec un nombre <i>k</i> : (e<sup><i>kt</i></sup>)′ = <i>k</i>e<sup><i>kt</i></sup>. Si <i>k</i> est négatif, e<sup><i>kt</i></sup> décroît de 1 vers 0 sans jamais l’atteindre.',a:2,fort:true}]},
{cle:'ln',beat:5,scene:'expo',set:{ex:1,tg:0,emx:0,ln2:0},seq:[{p:{ln2:1},d:1200,w:300}],
  text:['Le [[ln|logarithme népérien]], ln, fait le chemin inverse : pour <i>a</i> &gt; 0, e<sup><i>x</i></sup> = <i>a</i> ⇔ <i>x</i> = ln <i>a</i>.',
    {t:'Par exemple, e<sup><i>x</i></sup> = 2 ⇔ <i>x</i> = ln 2 ≈ 0,693.',a:0,fort:true},
    'C’est la touche ln de ta calculatrice. Ces deux outils suffisent pour toute la suite.']},
{cle:'verif',beat:5,scene:'loi',set:{xmax:20,curve:1,pente:0,n0:1,tk:0,lam:0},
  text:[`Essaie la fonction ${Nt} = ${N0}e<sup>−λ<i>t</i></sup> : vérifie-t-elle d${NI}/d<i>t</i> = −λ${NI}, en partant de ${N0} ?`],
  deriv:[
    {tex:tx`N'(t)=N_0\times\left(-\lambda\,e^{-\lambda t}\right)`,alt:'N′(t) = N₀ × (−λ e^(−λt))',r:'(e<sup><i>kt</i></sup>)′ = <i>k</i>e<sup><i>kt</i></sup>, avec <i>k</i> = −λ.'},
    {tex:tx`N'(t)=-\lambda\,N_0\,e^{-\lambda t}=-\lambda\,N(t)`,alt:'N′(t) = −λ N₀ e^(−λt) = −λ N(t)',r:`On reconnaît ${Nt} : l’équation est vérifiée.`},
    {tex:tx`N(0)=N_0\,e^{0}=N_0`,alt:'N(0) = N₀ e⁰ = N₀',r:`Car e<sup>0</sup> = 1 : elle part bien de ${N0}.`},
    {tex:tx`N(t)=N_0\,e^{-\lambda t}`,alt:'N(t) = N₀ e^(−λt)',r:`C’est la <b>loi de décroissance radioactive</b> (on admet que c’est la seule solution). ${N0} : le nombre de noyaux à <i>t</i> = 0.`}]},
{cle:'lambda-des',beat:5,scene:'loi',set:{lam:0,n0:1},
  text:['Et tes dés ? Leur loi est <i>N</i><sub><i>k</i></sub> = <i>N</i><sub>0</sub>(5/6)<sup><i>k</i></sup>. Quel λ leur correspond, par tic ?'],
  deriv:[
    {tex:tx`N_0\,e^{-\lambda k}=N_0\left(e^{-\lambda}\right)^{k}`,alt:'N₀ e^(−λk) = N₀ (e^(−λ))^k',r:'La loi au tic <i>k</i>, avec les règles des puissances : e<sup>−λ<i>k</i></sup> = (e<sup>−λ</sup>)<sup><i>k</i></sup>.'},
    {tex:tx`e^{-\lambda}=\dfrac56\iff e^{\lambda}=\dfrac65`,alt:'e^(−λ) = 5/6 ⇔ e^λ = 6/5',r:'Pour retrouver (5/6)<sup><i>k</i></sup> ; puis on prend l’inverse des deux côtés.'},
    {tex:tx`\lambda=\ln\dfrac65\approx ${TN(LAMD,3)}\ \text{par tic}`,alt:`λ = ln(6/5) ≈ ${fr(LAMD,3)} par tic`,r:`Un peu plus que 1/6 ≈ ${fr(1/DE,3)} : un tic est un gros pas. Pour une petite chance <i>p</i> par tic, λ ≈ <i>p</i>.`,p:{lam:1}}]},

/* ===== 6. les grandeurs ===== */
{cle:'ln2',beat:6,scene:'loi',set:{lam:0,th:0,st1:0,n0:1},
  text:[`D’où vient le ln 2 de la demi-vie ? Écris qu’au bout de ${Th}, il reste la moitié.`],
  deriv:[
    {tex:tx`N_0\,e^{-\lambda t_{1/2}}=\dfrac{N_0}{2}`,alt:'N₀ e^(−λ t½) = N₀/2',r:'La définition de la demi-vie, avec la loi de décroissance.'},
    {tex:tx`e^{-\lambda t_{1/2}}=\dfrac12\iff e^{\lambda t_{1/2}}=2`,alt:'e^(−λ t½) = 1/2 ⇔ e^(λ t½) = 2',r:`On divise par ${N0}, qui n’est pas nul, puis on prend l’inverse.`},
    {tex:tx`\lambda\,t_{1/2}=\ln 2`,alt:'λ t½ = ln 2',r:'Le rappel : e<sup><i>x</i></sup> = 2 ⇔ <i>x</i> = ln 2.'},
    {tex:tx`t_{1/2}=\dfrac{\ln 2}{\lambda}`,alt:'t½ = ln 2 / λ',r:`${N0} a disparu : la demi-vie ne dépend pas du nombre de noyaux. Pour les dés : ln 2 / ${fr(LAMD,3)} ≈ ${fr(TH,2)} tics, la largeur d’une marche.`,p:{st1:1,th:1}}]},
{cle:'activite',beat:6,scene:'loi',set:{th:0,st1:0,bars:0,run:0,n0:0},
  text:['Un détecteur compte des désintégrations, pas des noyaux.',`Quand il reste ${ND} dés, environ ${ent(ND/DE)} font 6 au tic suivant. Quand il en reste ${ND/2}, combien ?`],
  pari:{reveal:[{p:{bars:1},d:1400}],...BET([
    [`Toujours environ ${ent(ND/DE)}`,`Chaque dé garde 1 chance sur ${DE} : moitié moins de dés, moitié moins de 6. Les barres baissent comme la courbe.`],
    [`Environ ${ent(ND/2/DE)}`,`Oui : un sixième de ${ND/2}. Les barres baissent comme la courbe.`,1],
    [`Environ ${ent(2*ND/DE)}`,`Ce serait le double, avec moitié moins de dés. Un sixième de ${ND/2} : environ ${ent(ND/2/DE)}.`]]),
    apres:{html:'<p class="small">Pour des noyaux, ce nombre de désintégrations par seconde est l’[[activite|activité]] <i>a</i>, en [[becquerel|becquerels]] : 1 Bq = 1 désintégration par seconde.</p>'}}},
{cle:'a-lambda',beat:6,scene:'loi',set:{bars:1},
  text:['Relie l’activité au nombre de noyaux restants.'],
  deriv:[
    {tex:tx`a(t)=-\dfrac{dN}{dt}`,alt:'a(t) = −dN/dt',r:`Les désintégrations par seconde. ${NI} diminue : d${NI}/d<i>t</i> &lt; 0, d’où le signe −.`},
    {tex:tx`a(t)=\lambda\,N(t)`,alt:'a(t) = λ N(t)',r:`Car d${NI}/d<i>t</i> = −λ${NI}. Plus il reste de noyaux, plus l’activité est grande.`},
    {tex:tx`a(t)=a_0\,e^{-\lambda t}\qquad a_0=\lambda\,N_0`,alt:'a(t) = a₀ e^(−λt), avec a₀ = λ N₀',r:`L’activité suit la même loi que ${NI}, avec la même demi-vie : ${Th} se lit sur une courbe <i>a</i>(<i>t</i>) comme sur ${Nt}.`}]},
{cle:'masse',beat:6,scene:'masse',set:{ok:0},ctl:'n0',needLabel:'Calcule d’abord',sujet:'N₀ = (m/M)·N_A',
  text:[`Au bac, on part souvent d’une masse : ici <i>m</i> = 1,0 µg d’iode 131, de [[massemolaire|masse molaire]] <i>M</i> = ${M_I} g·mol<sup>−1</sup>.`,
    `Le nombre de moles <i>m</i>/<i>M</i>, multiplié par le [[avogadro|nombre d’Avogadro]] <i>N</i><sub>A</sub> = 6,02 × 10<sup>23</sup> mol<sup>−1</sup>, donne ${N0}. Calcule-le.`],
  tex:[[tx`N_0=\dfrac{m}{M}\times N_{\mathrm{A}}`,'N₀ = (m / M) × N_A']]},
{cle:'tau',beat:6,scene:'loi',set:{bars:0,n0:1,tan:0,th:0,st1:0},
  text:['Une autre durée, la [[tau|constante de temps]] τ = 1/λ, se lit avec la [[tangente]] à l’origine.'],
  deriv:[
    {tex:tx`\tau=\dfrac1\lambda`,alt:'τ = 1/λ',r:'λ<i>t</i> est un exposant, sans unité : λ est en s<sup>−1</sup> et τ en secondes. C’est l’[[dimensions|équation aux dimensions]].'},
    {tex:tx`y=N_0-\lambda N_0\,t=N_0\,(1-\lambda t)`,alt:'y = N₀ − λN₀t = N₀(1 − λt)',r:`La tangente en <i>t</i> = 0 : elle part de ${N0}, avec la pente <i>N</i>′(0) = −λ${N0}.`},
    {tex:tx`y=0\iff t=\dfrac1\lambda=\tau`,alt:'y = 0 ⇔ t = 1/λ = τ',r:'Elle coupe l’axe des temps en τ : c’est ainsi qu’on lit τ sur une courbe.',p:{tan:1}},
    {tex:tx`N(\tau)=N_0\,e^{-1}\approx 0{,}37\,N_0`,alt:'N(τ) = N₀ e⁻¹ ≈ 0,37 N₀',r:`À <i>t</i> = τ, il reste environ 37 % des noyaux ; à <i>t</i> = ${Th}, 50 %.`}]},
{cle:'v-tau',beat:6,scene:'loi',set:{tan:1},sujet:'τ et t½',
  text:['À <i>t</i> = τ, quelle part des noyaux initiaux s’est déjà désintégrée ?'],
  verifie:{fixe:true,...VF([
    ['37 %',false,'37 %, c’est ce qui reste à <i>t</i> = τ : e<sup>−1</sup> ≈ 0,37. Désintégrés : 100 % − 37 % = 63 %.','Est-ce la part qui reste, ou celle qui est partie ?'],
    ['50 %',false,`Ça, c’est à <i>t</i> = ${Th}. Or τ est plus long que ${Th} (${Th} ≈ 0,69 τ) : plus de la moitié est partie.`,'À quel instant la moitié exactement est-elle partie ?'],
    ['63 %',true,'Oui : il reste e<sup>−1</sup> ≈ 37 %, donc 63 % se sont désintégrés. C’est le repère des 63 % sur une courbe.']])}},

/* ===== 7. la datation ===== */
{cle:'horloge',beat:7,scene:'horloge',set:{curve:0,st:0,r:30,line:0,age:0,xmax:40000,irh:0},seq:[{p:{curve:1},d:1800},{p:{st:1},d:900}],
  text:['Une application célèbre : dater. Un être vivant échange sans cesse du carbone avec l’air ; la part de carbone 14 dans son corps reste constante.',{t:'À sa mort, les échanges cessent : le carbone 14 n’est plus renouvelé, son activité décroît.',a:0},{t:`L’horloge démarre. Demi-vie du carbone 14 : ${ent(T14)} ans (la valeur est donnée dans l’énoncé).`,a:1,fort:true}]},
{cle:'pari30',beat:7,scene:'horloge',
  text:['Un charbon de bois trouvé dans un ancien foyer a une activité égale à 30 % de celle d’un bois vivant.','Sans calcul, son âge est…'],
  pari:{reveal:[{p:{line:1},d:1200}],...BET([
    [`Moins de ${ent(T14)} ans`,'Moins d’une demi-vie, il resterait plus de 50 %. Or 30 % est entre 50 % (une demi-vie) et 25 % (deux).'],
    [`Entre ${ent(T14)} et ${ent(2*T14)} ans`,'Oui : 30 % est entre 50 % et 25 %, donc entre une et deux demi-vies.',1],
    [`Plus de ${ent(3*T14)} ans`,'Après trois demi-vies, il ne resterait que 12,5 %. 30 % est entre 50 % et 25 % : entre une et deux demi-vies.']])}},
{cle:'litteral',beat:7,scene:'horloge',
  text:['Le calcul exact, comme le correcteur l’attend : l’expression littérale d’abord.',{t:'« On donnera les expressions littérales avant de passer aux applications numériques. » (consigne des sujets)',fort:true}],
  deriv:[
    {tex:tx`a_1=a_0\,e^{-\lambda t_1}`,alt:'a₁ = a₀ e^(−λ t₁)',r:`La loi, écrite pour l’activité. ${a0} : celle d’un bois vivant ; <i>a</i><sub>1</sub> : celle du charbon.`},
    {tex:tx`\dfrac{a_0}{a_1}=e^{\lambda t_1}`,alt:'a₀/a₁ = e^(λ t₁)',r:'On isole l’exponentielle, en prenant l’inverse des deux côtés.'},
    {tex:tx`\lambda\,t_1=\ln\dfrac{a_0}{a_1}`,alt:'λ t₁ = ln(a₀/a₁)',r:'e<sup><i>x</i></sup> = <i>y</i> ⇔ <i>x</i> = ln <i>y</i>.'},
    {tex:tx`t_1=\dfrac{t_{1/2}}{\ln 2}\,\ln\dfrac{a_0}{a_1}`,alt:'t₁ = (t½ / ln 2) ln(a₀/a₁)',r:`On remplace λ par ln 2 / ${Th} : la forme des énoncés.`}]},
{cle:'an',beat:7,scene:'horloge',set:{line:1,age:0},
  text:['Puis l’application numérique : <i>a</i><sub>1</sub>/<i>a</i><sub>0</sub> = 0,30.'],
  deriv:[
    {tex:tx`t_1=\dfrac{${TN(T14)}}{\ln 2}\times\ln\dfrac{1}{0{,}30}`,alt:`t₁ = (${ent(T14)} / ln 2) × ln(1 / 0,30)`,r:`On remplace ${Th} = ${ent(T14)} ans et <i>a</i><sub>0</sub>/<i>a</i><sub>1</sub> = 1/0,30.`},
    {tex:tx`t_1\approx ${TN(T14/Math.LN2)}\ \text{ans}\times ${TN(Math.log(1/0.3),3)}`,alt:`t₁ ≈ ${ent(T14/Math.LN2)} ans × ${fr(Math.log(1/0.3),3)}`,r:`${ent(T14)} / ln 2 ≈ ${ent(T14/Math.LN2)} ans, et ln(1/0,30) ≈ ${fr(Math.log(1/0.3),3)}.`},
    {tex:tx`t_1\approx ${TN(sig3(AGE30))}\ \text{ans}`,alt:`t₁ ≈ ${ent(sig3(AGE30))} ans`,r:`Entre une et deux demi-vies, comme ton estimation : l’escalier vérifie le calcul.`,p:{age:1}}]},
{cle:'irhoud',beat:7,scene:'horloge',tag:'2017 · Jebel Irhoud',set:{line:0,age:0,irh:0,xmax:40000},
  text:[`Jebel Irhoud, près de Safi : des fossiles d’<i>Homo sapiens</i> vieux d’environ ${ent(IRHOUD)} ans (<i>Nature</i>, 2017). Le carbone 14 aurait-il pu les dater ?`],
  pari:{reveal:[{p:{xmax:350000,irh:1},d:2400}],...BET([
    ['Oui, avec un meilleur détecteur',`Aucun détecteur ne compte des noyaux disparus : ${ent(IRHOUD)} ans, c’est ${fr(IRH_DV,0)} demi-vies.`],
    ['Non : il n’en reste presque rien',`Oui : ${ent(IRHOUD)} ans, c’est ${fr(IRH_DV,0)} demi-vies. Plus rien à compter.`,1],
    ['Oui, mais avec moins de précision',`Il n’y a plus rien à mesurer, même mal : ${ent(IRHOUD)} ans, c’est ${fr(IRH_DV,0)} demi-vies.`]]),
    apres:{tex:[[tx`\dfrac{N}{N_0}=\dfrac{1}{2^{${TN(IRH_DV)}}}\approx ${TS(IRH_FRAC)}`,`N/N₀ = 1/2^${fr(IRH_DV,0)} ≈ ${fr(IRH_FRAC*1e17,1)} × 10^−17`]]}}},
{cle:'choisir',beat:7,scene:'choix',set:{obj:0,vin:0},seq:[{p:{obj:1},d:1600,w:300}],
  text:['Pour dater, on choisit un [[radioelement|radioélément]] dont la demi-vie est du même ordre que l’âge à mesurer.',{t:'Trop courte, il n’en reste rien ; trop longue, presque rien n’a changé : la différence ne se mesure pas.',a:0},{t:'Pour Jebel Irhoud, aucun des trois ne convient : son âge vient d’une autre méthode, la [[thermoluminescence]] de silex chauffés par le feu.',a:0}]},
{cle:'v-datation',beat:7,scene:'choix',set:{obj:1,vin:0},sujet:'choisir le radioélément',
  text:['Pour vérifier l’âge d’un vin d’une dizaine d’années, quel radioélément choisir ?'],
  verifie:{...VF([
    ['le tritium (12,3 ans)',true,'Oui : sa demi-vie est à l’échelle de 10 ans. En 10 ans, il en disparaît près de la moitié : la différence se mesure bien.'],
    [`le carbone 14 (${ent(T14)} ans)`,false,'En 10 ans, le carbone 14 ne perd que 0,12 % : la différence serait trop petite pour être mesurée.','En 10 ans, quelle part du carbone 14 a disparu ?'],
    ['le potassium 40 (1,25 milliard d’années)',false,'En 10 ans, il ne perd que quelques milliardièmes : rien de mesurable.','Sa demi-vie est-elle à l’échelle de 10 ans ?']]),reveal:[{p:{vin:1},d:900}]}},

/* ===== 8. la réponse à l'énigme ===== */
{cle:'reponse',beat:8,scene:'enigme',set:{thor:1,ura:1,rep:0},seq:[{p:{rep:1},d:1200,w:300}],
  text:()=>[rappelEnigme(),`Le gaz de Rutherford, le thoron, a une demi-vie de ${fr(T_THORON,0)} s ; l’uranium 238, de 4,5 milliards d’années.`,
    {t:`Chaque sorte de noyau a sa constante λ. Depuis 1896, l’uranium de Becquerel n’a perdu que ${fr(PERTE_U*1e8,0)} cent-millionièmes de ses noyaux : son activité n’a pas bougé.`,a:0},
    {t:'Ce que ça a changé : des horloges pour dater, et des noyaux choisis pour soigner, comme l’iode 131.',a:0,fort:true}]},

/* ===== 9. au bac ===== */
{cle:'bac-geste',beat:9,scene:'bac',set:{curve:1,th:0,t95:0},
  text:[`Sujet 2022 : de l’iode 131 (émetteur ${bm}, ${Th} = 8 jours) est injecté à un patient.`,'Question 3.3 : « en utilisant la loi de décroissance radioactive, déterminer, en jours, l’instant <i>t</i><sub>1</sub> où 95 % des noyaux d’iode 131 se sont désintégrés ».','Quel est ton premier geste ?'],
  pari:{reveal:[{p:{th:1},d:1000}],...BET([
    [`Écrire ce qui reste : <i>N</i>(<i>t</i><sub>1</sub>) = 0,05 ${N0}`,'Le bon réflexe : 95 % désintégrés, donc 5 % restent. La loi de décroissance parle de ce qui reste.',1],
    [`Écrire <i>N</i>(<i>t</i><sub>1</sub>) = 0,95 ${N0}`,`Le piège du sujet : 0,95 ${N0}, ce sont les noyaux désintégrés. La loi ${N0}e<sup>−λ<i>t</i></sup> donne ceux qui restent : 5 %, soit 0,05 ${N0}.`],
    ['Lire <i>t</i><sub>1</sub> sur la courbe','À 5 %, la courbe est presque à plat : la lecture serait imprécise. Et le sujet dit « en utilisant la loi » : on calcule. La courbe sert à lire la demi-vie (question 3.1).']])}},
{cle:'bac-litteral',beat:9,scene:'bac',set:{th:1},
  text:['L’expression littérale d’abord, ligne à ligne.'],
  deriv:[
    {tex:tx`N(t_1)=0{,}05\,N_0`,alt:'N(t₁) = 0,05 N₀',r:'95 % désintégrés : il en reste 5 %.'},
    {tex:tx`N_0\,e^{-\lambda t_1}=0{,}05\,N_0\iff e^{\lambda t_1}=20`,alt:'N₀ e^(−λ t₁) = 0,05 N₀ ⇔ e^(λ t₁) = 20',r:`La loi ; on divise par ${N0} et on prend l’inverse : 1/0,05 = 20.`},
    {tex:tx`\lambda\,t_1=\ln 20`,alt:'λ t₁ = ln 20',r:'e<sup><i>x</i></sup> = 20 ⇔ <i>x</i> = ln 20.'},
    {tex:tx`t_1=\dfrac{t_{1/2}}{\ln 2}\,\ln 20`,alt:'t₁ = (t½ / ln 2) ln 20',r:`Avec λ = ln 2 / ${Th}. Encore aucune valeur numérique.`}]},
{cle:'bac-an',beat:9,scene:'bac',set:{th:1,t95:0},
  text:['Puis l’application numérique.'],
  deriv:[
    {tex:tx`t_1=\dfrac{8}{\ln 2}\times\ln 20`,alt:'t₁ = (8 / ln 2) × ln 20',r:`${Th} = 8 jours : pas besoin de convertir, <i>t</i><sub>1</sub> sort dans la même unité.`},
    {tex:tx`t_1\approx ${TN(T95,1)}\ \text{jours}`,alt:`t₁ ≈ ${fr(T95,1)} jours`,r:`8 / ln 2 ≈ ${fr(T_I/Math.LN2,2)} et ln 20 ≈ ${fr(Math.log(20),2)}. Contrôle : entre 4 demi-vies (32 jours, 6,25 % restent) et 5 (40 jours).`,p:{t95:1}}]},
{cle:'bac-copie',beat:9,scene:'bac',set:{th:1,t95:1},
  text:['La rédaction attendue pour les 0,5 point de la question : la loi écrite pour ce qui reste, l’expression littérale de <i>t</i><sub>1</sub>, puis la valeur avec son unité.','Une valeur seule, sans expression littérale, perd des points.'],
  tex:[[tx`N(t_1)=0{,}05\,N_0\iff e^{-\lambda t_1}=0{,}05`,'N(t₁) = 0,05 N₀ ⇔ e^(−λ t₁) = 0,05'],[tx`t_1=\dfrac{t_{1/2}}{\ln 2}\,\ln 20`,'t₁ = (t½ / ln 2) ln 20'],[tx`t_1=\dfrac{8}{\ln 2}\times\ln 20\approx ${TN(T95,1)}\ \text{jours}`,`t₁ ≈ ${fr(T95,1)} jours`]]},

/* ===== 10. bilan ===== */
{cle:'q1',beat:10,scene:'quiz',set:{qi:0,rv:0},
  text:['Trois pièges des copies, tirés des sujets.',`QCM du bac 2023 : au bout de <i>t</i> = 2${Th}, les noyaux désintégrés représentent, du nombre initial…`],
  pari:{fixe:true,reveal:[{p:{rv:1},d:900}],opts:[
    {t:'25 %',fb:`25 %, c’est ce qui <b>reste</b> (${N0}/4). Les désintégrés, ce sont tous les autres : 75 %.`,indice:'Est-ce la part qui reste, ou celle qui s’est désintégrée ?'},
    {t:'50 %',fb:`La moitié part pendant la <b>première</b> demi-vie. Après deux, il reste ${N0}/4 : 75 % se sont désintégrés.`,indice:'Combien de demi-vies se sont écoulées ?'},
    {t:'75 %',ok:true,fb:`Oui : il reste ${N0}/4 = 25 %, donc 75 % se sont désintégrés. Le sujet de 2023 proposait 25 % : c’était l’affirmation fausse.`}]}},
{cle:'q2',beat:10,scene:'quiz',set:{qi:1,rv:0},
  text:[`Sujet 2022 : ${Th} = 8 jours, et l’activité ${a0} est en becquerels.`,`Pour calculer ${N0} = ${a0}/λ, λ doit être en…`],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'s<sup>−1</sup>',ok:true,fb:`Oui : 1 Bq = 1 désintégration par seconde. λ = ln 2 / (8 × 86 400 s) ≈ ${sciH(LAM_I,2)} s<sup>−1</sup>.`},
    {t:'jour<sup>−1</sup>',fb:`Avec λ en jour<sup>−1</sup> et ${a0} en désintégrations par seconde, ${N0} serait faux d’un facteur 86 400. On convertit ${Th} en secondes.`,indice:'Un becquerel compte des désintégrations par quoi ?'},
    {t:'sans unité',fb:'λ<i>t</i> est sans unité, donc λ a l’unité inverse d’un temps : ici, s<sup>−1</sup>.',indice:'λ<i>t</i> est sans unité : qu’en déduis-tu pour λ ?'}]}},
{cle:'q3',beat:10,scene:'quiz',set:{qi:2,rv:0},
  text:['Un échantillon a une activité <i>a</i> = 8,0 × 10<sup>6</sup> Bq.',`Le nombre ${NI} de noyaux radioactifs qu’il contient vaut…`],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'8,0 × 10<sup>6</sup> noyaux',fb:`L’activité compte des désintégrations par seconde, pas des noyaux : <i>a</i> = λ${NI}, donc ${NI} = <i>a</i>/λ, bien plus grand que <i>a</i>.`,indice:'L’activité compte-t-elle des noyaux, ou des désintégrations par seconde ?'},
    {t:'<i>a</i> / λ',ok:true,fb:`Oui : <i>a</i> = λ${NI}, donc ${NI} = <i>a</i>/λ, avec λ en s<sup>−1</sup>.`},
    {t:'λ × <i>a</i>',fb:`Vérifie les unités : λ<i>a</i> est en s<sup>−2</sup>, ce n’est pas un nombre de noyaux. <i>a</i> = λ${NI}, donc ${NI} = <i>a</i>/λ.`,indice:'Quelle relation relie <i>a</i>, λ et le nombre de noyaux ?'}]}},
{cle:'fin',beat:10,scene:'end',seq:[{p:{n:4},d:2800,w:300}],
  text:['Fin de la séance.'],html:()=>profileHTML()}
];
// les étapes à geste : « Suivant » attend que l'élève ait lancé ses dés
STEPS.forEach(st=>{if(st.ctl==='tic')st.need=()=>Math.round(scenes.des.p.k)>=st.tic&&!rolling;if(st.ctl==='n0')st.need=()=>!!S.n0ok;});

// « 30 % » : une espace fine insécable avant le signe, partout dans le panneau
// et un nombre ne se sépare pas de son unité en fin de ligne
const pct=s=>typeof s==='string'?s.replace(/(\d) %/g,'$1\u202F%').replace(/(\d) (s|ans|jours|tics?|g|µg|Bq|min|noyaux|dés)(?=[\s.,;:)<]|$)/g,'$1\u00A0$2'):s;
const pctP=p=>typeof p==='string'?pct(p):p&&typeof p==='object'?{...p,t:pct(p.t)}:p;
const pctOpts=P=>{if(!P)return;if(P.opts)P.opts.forEach(o=>{o.t=pct(o.t);o.fb=pct(o.fb);o.indice=pct(o.indice);});
  if(P.apres){const d=Object.getOwnPropertyDescriptor(P.apres,'html');if(d&&!d.get&&typeof P.apres.html==='string')P.apres.html=pct(P.apres.html);}};
STEPS.forEach(st=>{
  if(typeof st.text==='function'){const f=st.text;st.text=()=>{const v=f();return (Array.isArray(v)?v:[v]).map(pctP);};}
  else st.text=(Array.isArray(st.text)?st.text:[st.text]).map(pctP);
  if(st.deriv)st.deriv.forEach(x=>{if(typeof x.r==='function'){const f=x.r;Object.defineProperty(x,'r',{get:()=>pct(f()),enumerable:true});}else x.r=pct(x.r);});
  pctOpts(st.pari);pctOpts(st.verifie);
});

/* ---------- les mots ---------- */
const fig=(h,aria)=>`<svg viewBox="0 0 300 130" role="img" aria-label="${aria}">${h}</svg>`;
const mots={
  noyau:{t:'noyau',d:'Le centre de l’atome. Minuscule, il porte presque toute la masse de l’atome. Il est fait de protons et de neutrons.',
    fig:fig(`${O.noyauHTML(70,62,46,6,8,10.5)}<circle cx="168" cy="42" r="9" class="prot" stroke-width="1.4"/><text x="186" y="48" class="t-lab s-ink">proton</text><circle cx="168" cy="84" r="9" class="neut" stroke-width="1.4"/><text x="186" y="90" class="t-lab s-ink">neutron</text>`,'Un noyau : des protons pleins et des neutrons creux')},
  atome:{t:'atome',d:'La plus petite partie d’un élément chimique : un noyau, et des électrons autour. Un atome est électriquement neutre : autant d’électrons que de protons.'},
  proton:{t:'proton',d:'Une particule du noyau, de charge électrique +<i>e</i>. Leur nombre <i>Z</i> fixe l’élément : 6 protons, c’est du carbone ; 7, de l’azote.'},
  neutron:{t:'neutron',d:'Une particule du noyau, sans charge électrique, de masse presque égale à celle du proton.'},
  nucleon:{t:'nucléon',d:'Une particule du noyau : un proton ou un neutron. Le nombre de nucléons est le nombre de masse <i>A</i>.'},
  symbole:{t:'symbole',d:'Une ou deux lettres qui désignent un élément chimique : C pour le carbone, N pour l’azote, U pour l’uranium, He pour l’hélium.'},
  nombremasse:{t:'nombre de masse',d:'<i>A</i> : le nombre de nucléons du noyau (protons + neutrons). Il est écrit en haut, à gauche du symbole.'},
  nombrecharge:{t:'nombre de charge',d:'<i>Z</i> : le nombre de protons du noyau, aussi appelé numéro atomique. Il est écrit en bas, à gauche du symbole. Le nombre de neutrons est <i>N</i> = <i>A</i> − <i>Z</i>.'},
  isotope:{t:'isotope',d:'Des noyaux qui ont le même nombre de protons <i>Z</i> (le même élément) mais pas le même nombre de neutrons, donc pas le même <i>A</i>. Le carbone 12 et le carbone 14 sont deux isotopes du carbone.',
    fig:fig(`${O.noyauHTML(70,56,40,6,6,9)}${O.noyauHTML(220,56,40,6,8,9)}<text x="70" y="120" text-anchor="middle" class="t-lab s-ink">carbone 12</text><text x="220" y="120" text-anchor="middle" class="t-lab s-ink">carbone 14</text>`,'Carbone 12 : 6 protons et 6 neutrons ; carbone 14 : 6 protons et 8 neutrons')},
  phosphorescent:{t:'phosphorescent',d:'Qui continue de luire un moment dans l’obscurité après avoir reçu de la lumière. Les sels d’uranium de Becquerel brillaient ainsi après une exposition au soleil.'},
  rayonnement:{t:'rayonnement',d:'De l’énergie, ou des particules, lancées par une source : invisibles, elles traversent la matière. Ici, le rayonnement traverse le papier noir et noircit la plaque.'},
  betamoins:{t:'particule β<sup>−</sup>',d:`Un électron émis par un noyau quand un de ses neutrons se change en proton. Il s’écrit ${nuc(0,-1,'e')} : aucun nucléon, une charge −1. C’est une particule, à ne pas confondre avec le rayonnement γ.`},
  desintegration:{t:'désintégration',d:'Un noyau instable, le noyau père, se transforme en un autre noyau, le noyau fils, en émettant une particule : noyau père → noyau fils + particule. On ne peut ni la prévoir ni la provoquer.'},
  radioactivite:{t:'radioactivité',d:'La désintégration spontanée (sans cause extérieure) et aléatoire (imprévisible) d’un noyau instable : noyau père → noyau fils + particule. Le mot est dû à Marie et Pierre Curie.'},
  alpha:{t:'particule α',d:`Un noyau d’hélium ${nuc(4,2,'He')} : 2 protons et 2 neutrons. La radioactivité α concerne surtout les noyaux lourds.`},
  positon:{t:'positon',d:`Une particule de même masse que l’électron, mais de charge +1 : ${nuc(0,'+1','e')}. Il est émis quand un proton du noyau se change en neutron : c’est la radioactivité β<sup>+</sup>.`},
  gamma:{t:'rayonnement γ',d:'Une onde électromagnétique, comme la lumière, mais bien plus énergétique. Émis par un noyau fils formé avec trop d’énergie, il ne change ni <i>A</i> ni <i>Z</i>.'},
  soddy:{t:'lois de conservation',d:'Dans toute réaction nucléaire, le nombre total de nucléons (<i>A</i>) et la charge totale (<i>Z</i>) sont les mêmes avant et après. On les appelle aussi lois de Soddy.'},
  aleatoire:{t:'aléatoire',d:'Qui dépend du hasard : on ne peut pas savoir à l’avance quand un noyau donné va se désintégrer. On connaît seulement sa chance de le faire.'},
  tic:{t:'tic',d:'Un instant de l’horloge de la simulation. À chaque tic, on lance tous les dés encore en jeu : le temps avance par pas réguliers.'},
  population:{t:'population',d:'Un grand nombre de noyaux (ou de dés) pris ensemble. Chaque noyau est imprévisible ; la population, elle, suit une loi.'},
  demivie:{t:'demi-vie',d:'<i>t</i><sub>1/2</sub> : la durée au bout de laquelle la moitié des noyaux initialement présents se sont désintégrés. Elle ne dépend que de la sorte de noyau.'},
  variation:{t:'variation',d:'Δ<i>N</i> (« delta <i>N</i> ») : la différence entre la valeur d’après et celle d’avant, <i>N</i><sub>après</sub> − <i>N</i><sub>avant</sub>. Elle est négative quand <i>N</i> diminue.'},
  constanteradio:{t:'constante radioactive',d:'λ (« lambda ») : pendant une très courte durée Δ<i>t</i>, un noyau a la chance λΔ<i>t</i> de se désintégrer. Elle ne dépend que de la sorte de noyau. Plus λ est grande, plus la décroissance est rapide. Unité : s<sup>−1</sup> (ou an<sup>−1</sup>).'},
  derivee:{t:'dérivée',d:'d<i>N</i>/d<i>t</i> : la vitesse à laquelle <i>N</i> change, c’est-à-dire la pente de la courbe de <i>N</i> en fonction du temps. On l’écrit aussi <i>N</i>′(<i>t</i>).'},
  exponentielle:{t:'fonction exponentielle',d:'La fonction <i>x</i> ↦ e<sup><i>x</i></sup> (e ≈ 2,718), égale à sa propre dérivée, qui vaut 1 en 0. Elle change les sommes en produits : e<sup><i>a</i>+<i>b</i></sup> = e<sup><i>a</i></sup> × e<sup><i>b</i></sup>.'},
  ln:{t:'logarithme népérien',d:'La fonction ln, qui défait l’exponentielle : pour <i>a</i> &gt; 0, e<sup><i>x</i></sup> = <i>a</i> ⇔ <i>x</i> = ln <i>a</i>. Elle a sa propre leçon de maths.'},
  tau:{t:'constante de temps',d:'τ = 1/λ (« tau »), une durée. À <i>t</i> = τ, il reste environ 37 % des noyaux : 63 % se sont désintégrés. On la lit avec la tangente à l’origine.'},
  tangente:{t:'tangente',d:'La droite qui touche une courbe en un point en suivant sa direction : sa pente est la dérivée en ce point.'},
  dimensions:{t:'équation aux dimensions',d:'On vérifie les unités d’une formule : un exposant comme λ<i>t</i> n’a pas d’unité, donc [λ] × [<i>t</i>] = 1, et λ a l’unité inverse d’un temps (s<sup>−1</sup>).'},
  activite:{t:'activité',d:'<i>a</i>(<i>t</i>) : le nombre de désintégrations par seconde dans un échantillon, mesuré par un détecteur. <i>a</i> = λ<i>N</i>. Les sujets l’écrivent <i>a</i>, car <i>A</i> est le nombre de masse.'},
  becquerel:{t:'becquerel',d:'L’unité d’activité, notée Bq, nommée d’après Henri Becquerel : 1 Bq = 1 désintégration par seconde.'},
  massemolaire:{t:'masse molaire',d:'<i>M</i> : la masse d’une mole (6,02 × 10<sup>23</sup> entités), en g·mol<sup>−1</sup>. Pour l’iode 131, environ 131 g·mol<sup>−1</sup>.'},
  avogadro:{t:'nombre d’Avogadro',d:'<i>N</i><sub>A</sub> = 6,02 × 10<sup>23</sup> mol<sup>−1</sup> : le nombre d’entités dans une mole. La valeur est donnée dans l’énoncé.'},
  thermoluminescence:{t:'thermoluminescence',d:'Une méthode de datation hors programme : un silex chauffé rend en lumière l’énergie accumulée depuis sa dernière chauffe sous la radioactivité naturelle.'},
  radioelement:{t:'radioélément',d:'Un élément dont un isotope est radioactif : le carbone 14, le potassium 40, le tritium (l’hydrogène 3)…'},
};
Object.values(mots).forEach(m=>{m.d=pct(m.d);});

/* ---------- la fin : une ligne de résultat, les exercices, le détail ---------- */
const bet=k=>{const st=STEPS.find(s=>s.cle===k),j=S.first[k];return (!st||j==null)?null:!!st.pari.opts[j].juste;};
function profileHTML(){
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>ctx.juste(s.k)!=null),vok=V.filter(s=>ctx.juste(s.k)===true),vko=V.filter(s=>ctx.juste(s.k)===false);
  const P=STEPS.filter(s=>s.pari&&!s.verifie&&!s.pari.opts.some(o=>o.ok)),pv=P.filter(s=>bet(s.cle)!=null);
  const Q=[['q1','désintégrés ou restants'],['q2','λ en s⁻¹ avant N₀ = a₀/λ'],['q3','activité et nombre de noyaux']];
  const res=Q.map(([k])=>ctx.juste(k));
  const ligne=`« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length||V.length}</b> . Tes paris : ${pv.length} faits.`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]}</li>`).join('');
  const bets=[];
  const d=bet('duel');if(d!=null)bets.push(d?'tu savais déjà qu’un noyau ne vieillit pas':'l’idée du noyau qui « s’use » t’a tenté au départ');
  const m=bet('marche2');if(m!=null)bets.push(m?'la marche de même largeur t’a paru évidente':'la marche de même largeur t’a surpris');
  const t=bet('pari10');if(t!=null)bets.push(t?'tu as bien estimé tes 10 tics':'tes 10 tics t’ont surpris');
  const a=bet('alpha');if(a!=null)bets.push(a?'tu savais que α emporte 2 protons':'« α ne change que A » t’a tenté');
  const b=bet('bac-geste');if(b!=null)bets.push(b?'au bac, tu as écrit d’abord ce qui reste':'au bac, le piège « 95 % » t’a tenté');
  const revoir=vko.map(s=>s.sujet).filter(Boolean);
  return `<p class="small">${pct(ligne)}</p><a class="lien-exos" href="/pilote/radioactivite/exercices">Faire les exercices →</a>
<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}${revoir.length?`<p class="small">À revoir : ${revoir.join(' ; ')}.</p>`:''}${S.n0vu?'<p class="small">Le calcul de <i>N</i><sub>0</sub> depuis une masse : refais-le dans les exercices.</p>':''}<div class="next"><div class="pari-k">Dans les exercices</div><ol><li>Écrire une désintégration et nommer son type.</li><li>Demi-vie, λ, τ et leurs unités ; ${N0} depuis une masse, puis l’activité.</li><li>Un instant, un âge, le choix du radioélément ; un exercice complet au format du bac.</li></ol></div></details>`;
}

/* ---------- contrôles par étape ---------- */
S.kmax=0;S.n0ok=false;S.n0vu=false;
function noteN0(v){
  const T=[[N0_I*1e6,'Tu as pris <i>m</i> = 1,0 : convertis d’abord en grammes, 1 µg = 10<sup>−6</sup> g.'],
    [N0_I*1e3,'1 µg = 10<sup>−6</sup> g, pas 10<sup>−3</sup> g (ça, c’est le milligramme).'],
    [N0_I*1e-3,'Tu as converti en kilogrammes ; <i>M</i> est en g·mol<sup>−1</sup>, donc <i>m</i> doit être en grammes.'],
    [MASSE_RAPPORT(),'Ça, c’est la quantité de matière <i>m</i>/<i>M</i>, en moles. Il reste à multiplier par <i>N</i><sub>A</sub>.'],
    [1e-6*M_I*NA,'On divise par <i>M</i>, on ne multiplie pas : <i>N</i><sub>0</sub> = (<i>m</i>/<i>M</i>) × <i>N</i><sub>A</sub>.'],
    [(M_I/1e-6)*NA,'<i>M</i>/<i>m</i> est l’inverse de ce qu’il faut : <i>N</i><sub>0</sub> = (<i>m</i>/<i>M</i>) × <i>N</i><sub>A</sub>.']];
  const p=T.find(([x])=>proche(v,x,{rel:0.05}));
  return p?p[1]:'Ce n’est pas la bonne valeur. Reprends : <i>m</i> en grammes, divisé par <i>M</i>, multiplié par <i>N</i><sub>A</sub>.';
}
function MASSE_RAPPORT(){return 1e-6/M_I;}
const N0_BON=`<i>N</i><sub>0</sub> = (1,0 × 10<sup>−6</sup> g / ${M_I} g·mol<sup>−1</sup>) × 6,02 × 10<sup>23</sup> mol<sup>−1</sup> ≈ <b>${sciH(N0_I)}</b> noyaux. Son activité : ${a0} = λ${N0} ≈ ${sciH(A0_SAISIE)} Bq (λ ≈ ${sciH(LAM_I,2)} s<sup>−1</sup> pour 8 jours).`;
const CTL={
  tic:{html:st=>`<div class="ctl-btns"><button type="button" class="ctl-btn" id="tic">Lancer les dés</button>${st.tic>1?`<button type="button" class="ctl-btn alt" id="rafale">Lancer jusqu’au tic ${st.tic}</button>`:''}<button type="button" class="ctl-btn alt" id="relance" hidden disabled>Relancer avec de nouveaux dés</button></div><p class="ctl-note" id="ticfb"></p>`,
    init(st){const sc=scenes.des,b=$('#tic'),r=$('#rafale'),rl=$('#relance'),fb=$('#ticfb');let lastH='';
      // revenir sur une étape déjà faite : les dés de l'élève sont là où il les avait menés (les tirages ne changent pas)
      if((S.kmax||0)>=st.tic){st.base={...st.base,k:st.tic};sc.p.k=st.tic;sc.p.roll=0;sc.p.leave=1;sc.render();}
      const sync=()=>{const k=Math.round(sc.p.k),fini=k>=st.tic,ae=document.activeElement;
        // avant : « Lancer » en encre ; après : « Relancer » en contour (un bouton caché est aussi désactivé)
        b.hidden=fini;b.disabled=fini||rolling;if(r){r.hidden=fini;r.disabled=fini||rolling;}
        rl.hidden=!fini;rl.disabled=!fini||rolling;
        const h=ctx.ty(pct(st.note(clamp(k,0,st.tic))));if(h!==lastH){fb.innerHTML=h;lastH=h;}
        ctx.majNav();
        if(fini&&(ae===b||(r&&ae===r)))setTimeout(()=>{const n=$('#next');if(n&&!n.disabled)n.focus();},0);};
      b.addEventListener('click',()=>lancer(st.tic));
      if(r)r.addEventListener('click',()=>rafale(st.tic));
      rl.addEventListener('click',()=>{relancer();sync();b.focus();});
      hooks.frame=sync;hooks.lancer=()=>{if(Math.round(sc.p.k)<st.tic)lancer(st.tic);};sync();}},
  n0:{html:()=>`<div class="ctl"><label class="saisie"><span><i>N</i><sub>0</sub> =</span><input id="n0in" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="par exemple 3,2 × 10^12"></label><div class="ctl-btns"><button type="button" class="ctl-btn" id="n0ok" disabled>Vérifier</button><button type="button" class="ctl-btn alt" id="n0voir">Voir le calcul</button></div></div><p class="ctl-note" id="n0fb"></p>`,
    init(){const inp=$('#n0in'),ok=$('#n0ok'),voir=$('#n0voir'),fb=$('#n0fb'),sc=scenes.masse;
      const fini=()=>{inp.disabled=true;ok.disabled=true;voir.disabled=true;ok.hidden=true;voir.hidden=true;ctx.stop();sc.p.ok=1;sc.render();ctx.majNav();};
      if(S.n0ok){inp.value=S.n0val||'';fb.innerHTML=N0_BON;fini();}
      inp.addEventListener('input',()=>{ok.disabled=!inp.value.trim();});
      const tester=()=>{const v=lireNombre(inp.value);
        if(!Number.isFinite(v)){fb.innerHTML='Écris un nombre, par exemple 4,6 × 10^15 ou 4,6e15.';return;}
        if(proche(v,N0_I,{rel:0.03})){S.n0ok=true;S.n0val=inp.value;fb.innerHTML=`Oui. ${N0_BON}`;fini();$('#next').focus();}
        else{S.n0essais=(S.n0essais||0)+1;fb.innerHTML=`<b>Pas tout à fait.</b> ${noteN0(v)}`;}
        ctx.voir(fb);};
      ok.addEventListener('click',tester);
      inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&inp.value.trim()){e.preventDefault();tester();}});
      voir.addEventListener('click',()=>{S.n0ok=true;S.n0vu=true;fb.innerHTML=N0_BON;fini();ctx.voir(fb);$('#next').focus();});}}
};

// « Passer » : un bouton du panneau (les deux questions d'entrée) mène à une autre étape
const surSaut=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');if(!b||!root.contains(b))return;const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0){e.preventDefault();ctx.aller(i);}};
root.addEventListener('click',surSaut);

return {BEATS,STEPS,CTL,mots,
  reset(){S.kmax=0;S.n0ok=false;S.n0vu=false;S.n0val='';S.n0essais=0;},
  plain:s=>s.replace(/\u2063(\d+)\u2063[^\u2063]*\u2063([A-Za-z]+)/g,(m,A,X)=>A==='0'?X:`${X} ${A}`).replace(/λ/g,' lambda ').replace(/τ/g,' tau ').replace(/ ?%/g,' pour cent').replace(/\bln\b/g,'l n').replace(/N₀/g,'N zéro').replace(/β/g,'bêta ').replace(/γ/g,'gamma ').replace(/α/g,'alpha '),
  // la touche L lance les dés, sur les étapes à geste
  touche(e,st){if(st&&st.ctl==='tic'&&(e.key==='l'||e.key==='L')&&hooks.lancer){e.preventDefault();hooks.lancer();return true;}return false;},
  demonter(){ep++;rolling=false;root.removeEventListener('click',surSaut);}};
});
}
