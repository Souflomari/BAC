/* eslint-disable */
// @ts-nocheck
/**
 * Moteur de la leçon pilote « La décroissance radioactive » (refonte 2026-10).
 *
 * Même architecture que `logarithme-moteur.js` : scènes SVG à paramètres
 * interpolés, étapes (STEPS) groupées en chapitres (BEATS), paris avant
 * révélation, contrôles par étape (CTL), profil de fin, voix, clavier, KaTeX,
 * démontage. Les parties GÉNÉRIQUES (outils, tween/go/animate, panneau,
 * paris, chapitres, voix, clavier, maths) sont recopiées de ce moteur, avec
 * quatre ajouts, tous locaux à ce fichier :
 *   - `after` : l'état qu'une étape laisse quand l'élève l'a menée au bout
 *     (les tics qu'il a lancés lui-même) — c'est lui qu'hérite l'étape suivante ;
 *   - `need` : une étape à geste obligatoire garde « Suivant » fermé tant que
 *     le geste n'est pas fait (comme un pari non répondu) ;
 *   - `juste` : l'option vraie d'un PARI (pas d'un quiz) — l'écran reste
 *     neutre, seul le profil de fin s'en sert ;
 *   - `pari.apres` : une formule qui n'apparaît qu'APRÈS le pari (elle
 *     donnerait la réponse si elle venait avant).
 *
 * LE HASARD. Un générateur à graine (mulberry32). Tous les lancers de dés
 * sont TIRÉS AU MONTAGE : « Retour » rejoue exactement les mêmes dés. La
 * graine change à chaque chargement (`?graine=123` la fixe, pour les
 * captures ; elle est exposée en `data-graine` sur la racine, jamais en
 * texte). Seul le scintillement des faces PENDANT un lancer (0,5 s, décor)
 * utilise Math.random ; la face finale est toujours celle du tirage.
 * Aucun nombre affiché n'est écrit à la main : chaque valeur vient des
 * lancers, d'un calcul ci-dessous, ou d'une donnée sourcée ci-dessous.
 *
 * SOURCES — [V] vérifié sur la source citée (lue le 2026-10-22),
 *           [S] source secondaire (résumé encyclopédique), [L] légende (aucune
 *           n'est utilisée ici).
 *  1. [V] Becquerel, C. R. Acad. Sci. 122, p. 420 (24 février 1896) : plaque
 *     enveloppée de deux feuilles de papier noir très épais, lamelle de
 *     « sulfate double d'uranium et de potassium » posée dessus, exposition au
 *     soleil plusieurs heures ; au développement « la silhouette de la
 *     substance phosphorescente apparaît en noir ».
 *     Texte original : https://www.nssp.uni-saarland.de/lehre/Vorlesung/Kernphysik_SS19/History/Papers/Becquerel.pdf
 *  2. [V] Becquerel, C. R. 122, p. 501 (2 mars 1896) : préparées « le mercredi
 *     26 et le jeudi 27 février », « le soleil ne s'est montré que d'une
 *     manière intermittente », châssis « rentré[s] à l'obscurité dans le tiroir
 *     d'un meuble, en laissant en place les lamelles », développées « le
 *     1er mars, en m'attendant à trouver des images très faibles. Les
 *     silhouettes apparurent, au contraire, avec une grande intensité. »
 *     Même PDF ; traduction : https://web.lemoyne.edu/Giunta/becquerel.html
 *  3. [V] Mai 1896 : des sels d'uranium NON phosphorescents → le rayonnement
 *     vient de l'uranium lui-même ; Becquerel avait d'abord soupçonné la
 *     lumière du soleil ; Nobel 1903 ; unité SI nommée d'après lui.
 *     https://en.wikipedia.org/wiki/Henri_Becquerel
 *  4. [V] 1 Bq = une désintégration par seconde ; les Curie nomment la
 *     « radioactivité » ; « a nucleus does not "age" », probabilité constante.
 *     https://en.wikipedia.org/wiki/Radioactive_decay
 *  5. [V] Rutherford, « A Radioactive Substance emitted from Thorium
 *     Compounds », Philosophical Magazine (5) 49, 1–14, janvier 1900 :
 *     « the intensity fell to half its value in about one minute » ;
 *     tableau III (temps en s → courant relatif) : 0→1 ; 28→0,69 ; 62→0,51 ;
 *     118→0,23 ; 155→0,14 ; 210→0,067 ; 272→0,041 ; 360→0,018.
 *     https://web.chemteam.info/Chem-History/Rutherford-half-life.html
 *     https://web.lemoyne.edu/giunta/classicalcs/rutherhalf.html
 *  6. [S] Rutherford à l'université McGill (Montréal) de 1898 à 1907 ; avec
 *     Owens, « a radioactive sample of any size took the same time for half
 *     of it to decay » ; le gaz du thorium est un isotope du radon.
 *     https://en.wikipedia.org/wiki/Ernest_Rutherford
 *  7. [V] Arnold & Libby, « Age Determinations by Radiocarbon Content: Checks
 *     with Samples of Known Age », Science 110, 678–680 (23 décembre 1949),
 *     tableau 1 : Snéfrou (Meïdoum, cyprès) 4575 ± 75 ans ; Djéser (Saqqarah,
 *     acacia) 4650 ± 75 ans ; âge trouvé au carbone 14 : 4750 ± 250 ans.
 *     https://caeno.org/images/Libby_Science_1949.pdf
 *     (Wikipédia résume « 2625 ± 75 av. J.-C. contre 2800 ± 250 » : ce sont
 *     Snéfrou seul et l'âge trouvé ; on affiche ici le tableau de l'article.)
 *  8. [V] Libby, Nobel de chimie 1960 ; datation au carbone 14 « generally
 *     limited to … no more than 50,000 years ».
 *     https://en.wikipedia.org/wiki/Radiocarbon_dating
 *  9. [V] Carbone 14 : ≈ 1,2 atome pour 10¹² atomes de carbone de l'air ;
 *     β⁻ → azote 14 ; demi-vie 5700 ± 30 ans (les sujets de bac donnent
 *     5730 ans, valeur utilisée ici). https://en.wikipedia.org/wiki/Carbon-14
 * 10. [V] Jebel Irhoud (≈ 50 km au sud-est de Safi) : Richter et al., Nature
 *     546, 293–296 (2017) — thermoluminescence de silex chauffés par le feu,
 *     associés à des restes d'Homo sapiens ; moyenne pondérée 315 ± 34 ka
 *     (résumé : « 383–247 thousand years old »).
 *     https://ideas.repec.org/a/nat/nature/v546y2017i7657d10.1038_nature22335.html
 *     https://en.wikipedia.org/wiki/Jebel_Irhoud
 * 11. [V] Thermoluminescence : un chauffage remet le signal à zéro ; ensuite
 *     la dose s'accumule sous le rayonnement de l'uranium, du thorium et du
 *     potassium 40 environnants. https://en.wikipedia.org/wiki/Thermoluminescence_dating
 * 12. [V] Sujets du bac marocain (transcriptions vérifiées du dépôt,
 *     docs/sujets/pc/decroissance-radioactive.md) : 2019 radon 222,
 *     t½ = 3,8 jours ; 2023 QCM « à t = 2t½ … désintégrés … 25 % » (faux) ;
 *     2022 iode 131 (t½ = 8 jours, 95 % désintégrés). Consigne officielle
 *     « On donnera les expressions littérales avant de passer aux applications
 *     numériques » (docs/refonte/01-programme-bac-maroc.md §3.3).
 * Constantes : N_A = 6,02 × 10²³ mol⁻¹ (valeur des sujets) ; M(²³⁸U) ≈ 238 g/mol ;
 * M(C) = 12 g/mol.
 */
import katex from "katex";

export function monterPilote(root) {

/* ---------- outils (communs avec logarithme-moteur.js) ---------- */
const NS='http://www.w3.org/2000/svg';
const svg=root.querySelector('[data-pilote-scene]');
const $=s=>root.querySelector(s);
function E(tag,attrs,parent){const e=document.createElementNS(NS,tag);if(attrs)for(const k in attrs){if(k==='text')e.textContent=attrs[k];else e.setAttribute(k,attrs[k]);}(parent||svg).appendChild(e);return e;}
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const NB='\u202F';
const grp=s=>s.replace(/\B(?=(\d{3})+(?!\d))/g,NB);
function fr(x,d=2){const s=Math.abs(x).toFixed(d),p=s.split('.');return (x<0&&Number(s)!==0?'−':'')+(p[0].length>=4?grp(p[0]):p[0])+(p[1]?','+p[1]:'');}
const ent=x=>fr(x,0);
const sig3=x=>Number(x.toPrecision(3));
const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};
const sup=n=>String(n).split('').map(c=>SUP[c]||c).join('');
function sci(x,d=1){if(!x)return '0';let e=Math.floor(Math.log10(Math.abs(x))),m=Number((x/10**e).toFixed(d));if(Math.abs(m)>=10){m/=10;e++;}return `${fr(m,d)} × 10${sup(e)}`;}
const ty=s=>String(s).replace(/ ([?!;:\u00BB%])/g,'\u202F$1').replace(/\u00AB /g,'\u00AB\u00A0');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const wait=ms=>new Promise(r=>setTimeout(r,RM.matches?0:ms));
let run=0;const hooks={};
function show(el,o){el.style.opacity=o;}
// Texte SVG à mini-balisage : *x* italique, ^{…} exposant, _{…} indice.
// Les décalages sont en px (taille `fs` de la classe) : Firefox ignore baseline-shift.
function fxFill(t,str){const fs=t.__fs;t.__s=str;t.textContent='';let shift=0;
  String(str).split(/(\^\{[^}]*\}|_\{[^}]*\}|\*[^*\s][^*]*\*)/).forEach(part=>{if(!part)return;
    let txt=part,dy=0,small=false,it=false;
    if(part.startsWith('^{')){txt=part.slice(2,-1);dy=-.42*fs;small=true;}
    else if(part.startsWith('_{')){txt=part.slice(2,-1);dy=.24*fs;small=true;}
    else if(part[0]==='*'&&part.length>2&&part.endsWith('*')){txt=part.slice(1,-1);it=true;}
    const a={text:txt},d=dy-shift;if(Math.abs(d)>.01)a.dy=d.toFixed(1);shift=dy;
    if(small)a['font-size']=(.68*fs).toFixed(1);if(it)a['font-style']='italic';
    E('tspan',a,t);});}
function fx(parent,x,y,str,cls,fs,anchor){const t=E('text',{x,y,class:cls,'text-anchor':anchor||'start'},parent);t.__fs=fs;fxFill(t,str);return t;}
function setFx(t,str){if(t.__s!==str)fxFill(t,str);}
function courbe(fn,x0,x1,X,Y,n=240){let d='';for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n;d+=(i?'L':'M')+X(x).toFixed(1)+' '+Y(fn(x)).toFixed(1);}return d;}
function axes(gr,X,Y,xmax,ymax,xs,ys,xf,yf,xt,yt){gr.textContent='';
  E('line',{x1:X(0),y1:Y(0),x2:X(xmax)+10,y2:Y(0),class:'k-dim','stroke-width':1.5},gr);
  E('line',{x1:X(0),y1:Y(0),x2:X(0),y2:Y(ymax)-12,class:'k-dim','stroke-width':1.5},gr);
  for(let v=0;v<=xmax+1e-9;v+=xs){E('line',{x1:X(v),x2:X(v),y1:Y(0),y2:Y(0)+6,class:'k-dim'},gr);E('text',{x:X(v),y:Y(0)+24,class:'t-tick s-dim','text-anchor':'middle',text:ty(xf(v))},gr);}
  for(let v=ys;v<=ymax+1e-9;v+=ys){E('line',{x1:X(0)-6,x2:X(0),y1:Y(v),y2:Y(v),class:'k-dim'},gr);E('text',{x:X(0)-10,y:Y(v)+5,class:'t-tick s-dim','text-anchor':'end',text:ty(yf(v))},gr);}
  E('text',{x:X(xmax)+16,y:Y(0)+5,class:'t-lab s-dim',text:xt},gr);
  E('text',{x:X(0),y:Y(ymax)-26,class:'t-lab s-dim',text:yt},gr);}

const defs=E('defs');
[['rarw','s-dim'],['rarwA','s-a']].forEach(([id,c])=>{const mk=E('marker',{id,viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'7',markerHeight:'7',orient:'auto-start-reverse'},defs);E('path',{d:'M0 0L10 5L0 10z',class:c},mk);});
E('rect',{x:100,y:110,width:830,height:490},E('clipPath',{id:'rclip-loi'},defs));

const scenes={};
function scene(id,def){const g=E('g',{class:'scene'});g.style.opacity=0;const s=Object.assign({id,g},def);s.defaults={...def.p};s.p={...def.p};s.build(g);s.render();scenes[id]=s;return s;}

/* ---------- le hasard, tiré une fois pour toutes ---------- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let qg=null;try{qg=new URLSearchParams(location.search).get('graine');}catch(e){}
const GRAINE=/^\d{1,9}$/.test(qg||'')?+qg:(Math.random()*2147483647)>>>0;
root.dataset.graine=String(GRAINE);
const rng=mulberry32(GRAINE);
const ND=100,KMAX=20;
// les 100 dés de l'élève : face de chaque dé à chaque tic ; dTic = tic de son premier 6
const face=[[]],dTic=new Array(ND).fill(Infinity);
for(let i=0;i<ND;i++)face[0][i]=1+Math.floor(rng()*5);
for(let k=1;k<=KMAX;k++){face[k]=[];for(let i=0;i<ND;i++){if(dTic[i]<k){face[k][i]=0;continue;}const f=1+Math.floor(rng()*6);face[k][i]=f;if(f===6)dTic[i]=k;}}
const NK=[];for(let k=0;k<=KMAX;k++)NK[k]=dTic.filter(t=>t>k).length;
const DK=[0];for(let k=1;k<=KMAX;k++)DK[k]=NK[k-1]-NK[k];
// d'autres séries : un tirage par dé (le tic de son premier 6, loi géométrique de paramètre 1/6)
function serie(n){const c=new Array(KMAX+1).fill(0);for(let i=0;i<n;i++){const k=Math.max(1,Math.ceil(Math.log(1-rng())/Math.log(5/6)));for(let j=0;j<Math.min(k,KMAX+1);j++)c[j]++;}return c;}
const AUTRES=[];for(let s=0;s<9;s++)AUTRES.push(serie(100));
const GRANDES=[];for(let s=0;s<10;s++)GRANDES.push(serie(10000).map(n=>n/100));
// le dé « vétéran » : encore en jeu au tic 10, le plus près du centre de la grille
const VET=(()=>{let b=-1,bd=1e9;for(let i=0;i<ND;i++)if(dTic[i]>10){const d=(Math.floor(i/10)-4.5)**2+(i%10-4.5)**2;if(d<bd){bd=d;b=i;}}return b;})();

/* ---------- constantes physiques (sources en tête de fichier) ---------- */
const LAMD=Math.log(6/5), TH=Math.log(2)/LAMD, TAU=1/LAMD;     // dés à 6 faces, par tic
const L20=Math.log(20/19);                                       // dé à 20 faces
const thDe=f=>Math.log(2)/Math.log(f/(f-1));
const T14=5730, NA=6.02e23;
const N_U=1e-3/238*NA;                    // noyaux dans 1 mg d'uranium 238
const N_C14_1G=1.2e-12*NA/12;             // noyaux de carbone 14 dans 1 g de carbone vivant
const IRHOUD=315000, LIM14=50000;
const ageDe=r=>T14/Math.log(2)*Math.log(100/r);
const AGE30=ageDe(30);
const IRH_DV=IRHOUD/T14, IRH_FRAC=2**(-IRH_DV), IRH_RESTE=N_C14_1G*IRH_FRAC;
const RUTH=[[0,1],[28,.69],[62,.51],[118,.23],[155,.14],[210,.067],[272,.041],[360,.018]];
const LIBBY={snef:[4575,75],djos:[4650,75],c14:[4750,250]};
const PARIS10=[2,16,42], J10=PARIS10.reduce((b,v,i,a)=>Math.abs(v-NK[10])<Math.abs(a[b]-NK[10])?i:b,0);
const frR=v=>String(v).replace('.',',');

/* ---------- des dés ---------- */
const PIP=[[.25,.25],[.75,.25],[.25,.5],[.75,.5],[.25,.75],[.75,.75],[.5,.5]];
const FACES={1:[6],2:[0,5],3:[0,6,5],4:[0,1,4,5],5:[0,1,4,5,6],6:[0,1,2,3,4,5]};
function mkDie(parent,x,y,s,r){const g=E('g',{},parent);const rect=E('rect',{x,y,width:s,height:s,rx:(s*.16).toFixed(1),class:'die'},g);const pips=PIP.map(([a,b])=>E('circle',{cx:x+a*s,cy:y+b*s,r,class:'pip'},g));return {g,rect,pips,f:-1,c:null};}
function setDie(d,f,cls){if(d.f!==f){const on=FACES[f]||[];d.pips.forEach((p,j)=>p.style.opacity=on.includes(j)?1:0);d.f=f;}if(d.c!==cls){d.g.setAttribute('class',cls?'die-'+cls:'');d.c=cls;}}

/* ---------- 1. la plaque de Becquerel ---------- */
const LAM=['350,250 420,236 478,262 470,318 404,334 356,306','520,330 590,318 642,346 628,402 560,414 514,380','560,226 612,220 630,258 594,280 552,264'];
scene('plaque',{
  p:{drawer:0,dev:0,src:0},
  build(g){
    this.sun=E('g',{},g);E('circle',{cx:850,cy:118,r:30,class:'k-dim nofill','stroke-width':3},this.sun);
    for(let j=0;j<8;j++){const a=j*Math.PI/4;E('line',{x1:850+42*Math.cos(a),y1:118+42*Math.sin(a),x2:850+58*Math.cos(a),y2:118+58*Math.sin(a),class:'k-dim','stroke-width':3,'stroke-linecap':'round'},this.sun);}
    E('rect',{x:270,y:170,width:460,height:320,rx:4,class:'cell'},g);
    // papier noir, lamelles claires, plaque développée claire à silhouettes noires — dans les deux thèmes
    this.paper=E('rect',{x:290,y:190,width:420,height:280,class:'paper'},g);
    this.lam=E('g',{},g);LAM.forEach(pts=>E('polygon',{points:pts,class:'lam'},this.lam));
    this.dv=E('g',{},g);
    E('rect',{x:290,y:190,width:420,height:280,class:'plate'},this.dv);
    LAM.forEach(pts=>{E('polygon',{points:pts,class:'sil-flou'},this.dv);E('polygon',{points:pts,class:'sil'},this.dv);});
    this.labA=E('g',{},g);
    E('text',{x:500,y:528,class:'t-lab s-dim','text-anchor':'middle',text:'plaque photographique enveloppée de papier noir'},this.labA);
    E('line',{x1:640,y1:372,x2:752,y2:412,class:'k-dim','stroke-width':1.5},this.labA);
    E('text',{x:758,y:412,class:'t-lab s-ink',text:'lamelles de sel'},this.labA);
    E('text',{x:758,y:436,class:'t-lab s-ink',text:'d’uranium'},this.labA);
    this.labB=E('text',{x:500,y:528,class:'t-lab s-dim','text-anchor':'middle',text:'la même plaque, développée le 1ᵉʳ mars'},g);
    this.dr=E('g',{},g);
    E('rect',{x:240,y:150,width:520,height:360,rx:4,class:'rulebody'},this.dr);
    E('rect',{x:440,y:282,width:120,height:22,rx:3,class:'cell'},this.dr);
    E('text',{x:500,y:378,class:'t-lab2 s-ink','text-anchor':'middle',text:'dans le tiroir d’un meuble'},this.dr);
    E('text',{x:500,y:408,class:'t-lab s-dim','text-anchor':'middle',text:'du 26 février au 1ᵉʳ mars 1896'},this.dr);
    this.q=E('g',{},g);
    E('text',{x:500,y:578,class:'t-lab2 s-ink','text-anchor':'middle',text:ty('« Les silhouettes apparurent, au contraire, avec une grande intensité. »')},this.q);
    E('text',{x:500,y:608,class:'t-lab s-dim','text-anchor':'middle',text:'Henri Becquerel, Comptes rendus de l’Académie des sciences, 2 mars 1896'},this.q);
    this.rays=E('g',{},g);
    [[414,286,40,32],[578,366,46,34],[592,251,28,22]].forEach(([cx,cy,rx,ry])=>{for(let j=0;j<6;j++){const a=j*Math.PI/3+.35,c=Math.cos(a),s=Math.sin(a);E('line',{x1:cx+rx*c,y1:cy+ry*s,x2:cx+(rx+26)*c,y2:cy+(ry+22)*s,class:'k-a','stroke-width':2.5,'marker-end':'url(#rarwA)'},this.rays);}});
    this.srcT=E('text',{x:500,y:118,class:'t-big2 s-a','text-anchor':'middle',text:'Sans soleil : l’uranium émet tout seul'},g);
    this.srcB=E('text',{x:500,y:578,class:'t-lab s-ink','text-anchor':'middle',text:'Mai 1896 : des sels d’uranium qui ne luisent pas font de même.'},g);
  },
  render(){const p=this.p,dark=Math.max(p.drawer,p.dev);
    show(this.sun,(1-.8*dark)*(1-p.src));
    show(this.paper,1-p.dev);show(this.lam,1-p.dev);show(this.dv,p.dev);
    show(this.labA,(1-p.drawer)*(1-p.dev));show(this.labB,p.dev);
    show(this.dr,p.drawer);this.dr.setAttribute('transform',`translate(0 ${((1-p.drawer)*-24).toFixed(1)})`);
    show(this.q,p.dev*(1-p.src));show(this.rays,p.src);show(this.srcT,p.src);show(this.srcB,p.src);
  }
});

/* ---------- 2. cent dés, et le graphe de l'élève ---------- */
const GX=k=>540+20*k, GY=v=>520-3.6*v;
scene('des',{
  p:{dice:0,k:0,roll:0,graph:0,duel:0,duelRv:0,others:0,big:0,law:0},
  build(g){
    // la grille est centrée seule, puis glisse à gauche quand le graphe (ou le duel) entre
    this.left=E('g',{},g);
    this.cap=E('text',{x:60,y:118,class:'t-lab s-dim',text:'100 dés · un dé = un noyau'},this.left);
    this.grid=E('g',{},this.left);
    this.dice=[];for(let i=0;i<ND;i++)this.dice.push(mkDie(this.grid,60+(i%10)*38,140+Math.floor(i/10)*38,32,3));
    this.ring=E('rect',{x:60+(VET%10)*38-6,y:140+Math.floor(VET/10)*38-6,width:44,height:44,rx:8,class:'k-a nofill','stroke-width':3},this.left);
    this.cnt=E('text',{x:60,y:574,class:'t-big2 s-ink'},this.left);
    this.cnt2=E('text',{x:60,y:606,class:'t-lab s-dim'},this.left);
    this.gr=E('g',{},g);
    axes(E('g',{},this.gr),GX,GY,20,100,5,25,v=>String(v),v=>String(v),'tics','dés restants, en % du départ');
    this.othG=E('g',{},this.gr);
    this.oth=AUTRES.map(s=>{const gg=E('g',{},this.othG);s.forEach((n,j)=>E('circle',{cx:GX(j),cy:GY(n).toFixed(1),r:3,class:'s-dim'},gg));return gg;});
    this.bigs=GRANDES.map(s=>E('polyline',{points:s.map((v,j)=>`${GX(j)},${GY(v).toFixed(1)}`).join(' '),class:'k-ink nofill','stroke-width':1.3},this.gr));
    this.law=E('path',{d:courbe(k=>100*(5/6)**k,0,20,GX,GY),class:'k-ink nofill','stroke-width':3.2,pathLength:1000,'stroke-dasharray':'1000 1000'},this.gr);
    this.lawL=E('text',{x:GX(10.5),y:GY(100*(5/6)**10.5)-26,class:'t-lab2 s-ink halo',text:'la loi de la population'},this.gr);
    this.myL=E('polyline',{class:'k-a nofill','stroke-width':1.5},this.gr);
    this.my=NK.map((n,j)=>E('circle',{cx:GX(j),cy:GY(n).toFixed(1),r:5,class:'s-a'},this.gr));
    this.myT=E('text',{class:'t-lab2 s-a halo'},this.gr);
    this.legO=E('text',{x:950,y:186,class:'t-lab s-dim','text-anchor':'end',text:'en gris : 9 autres séries de 100 dés'},this.gr);
    this.legB=E('text',{x:950,y:212,class:'t-lab s-ink','text-anchor':'end',text:'traits noirs : 10 séries de 10 000 dés'},this.gr);
    this.du=E('g',{},g);
    this.dOld=mkDie(this.du,560,190,110,9);this.dNew=mkDie(this.du,800,190,110,9);
    E('rect',{x:552,y:182,width:126,height:126,rx:20,class:'k-a nofill','stroke-width':3},this.du);
    E('text',{x:615,y:346,class:'t-lab2 s-ink','text-anchor':'middle',text:'a survécu à 10 lancers'},this.du);
    E('text',{x:855,y:346,class:'t-lab2 s-ink','text-anchor':'middle',text:'sort de la boîte'},this.du);
    this.dQ=E('text',{x:735,y:268,class:'t-huge s-dim','text-anchor':'middle',text:'?'},this.du);
    this.dR=E('g',{},this.du);
    E('text',{x:735,y:430,class:'t-big2 s-a','text-anchor':'middle',text:'1 chance sur 6 — pour chacun'},this.dR);
    E('text',{x:735,y:466,class:'t-lab s-dim','text-anchor':'middle',text:'au prochain lancer, quel que soit son passé'},this.dR);
    setDie(this.dOld,VET>=0?face[10][VET]:3,'');setDie(this.dNew,3,'');
  },
  render(){const p=this.p,kk=clamp(Math.floor(p.k+1e-6),0,KMAX);
    show(this.grid,p.dice);show(this.cap,p.dice);
    this.left.setAttribute('transform',`translate(${(250*(1-Math.max(p.graph,p.duel))).toFixed(1)} 0)`);
    for(let i=0;i<ND;i++){const d=this.dice[i],t=dTic[i];
      if(p.roll){if(t<=kk)setDie(d,0,'out');else setDie(d,1+Math.floor(Math.random()*6),'');}
      else if(t<kk)setDie(d,0,'out');
      else if(t===kk&&kk>0)setDie(d,6,'six');
      else setDie(d,face[kk][i],'');}
    this.cnt.textContent=ty(`il reste ${NK[kk]} dés sur 100`);show(this.cnt,p.dice);
    this.cnt2.textContent=!kk?'aucun lancer pour l’instant':DK[kk]?`tic ${kk} · ${DK[kk]} dé${DK[kk]>1?'s ont':' a'} fait 6`:`tic ${kk} · aucun dé n’a fait 6`;show(this.cnt2,p.dice);
    show(this.ring,p.duel);
    show(this.gr,p.graph*(1-p.duel));
    this.my.forEach((c,j)=>c.style.opacity=j<=kk?1:0);
    this.myL.setAttribute('points',NK.slice(0,kk+1).map((n,j)=>`${GX(j)},${GY(n).toFixed(1)}`).join(' '));
    // l'étiquette suit le dernier point, puis se pose au 3e tic : à droite du début de la courbe, la place est libre
    const jl=Math.min(kk,3);this.myT.textContent='tes lancers';this.myT.setAttribute('x',GX(jl)+14);this.myT.setAttribute('y',(GY(NK[jl])-10).toFixed(1));
    show(this.myT,kk>0?1-p.law:0);
    const dimO=1-.6*p.law;
    this.oth.forEach((o,r)=>show(o,clamp(p.others*9-r,0,1)*dimO));show(this.legO,p.others);
    this.bigs.forEach((b,s)=>show(b,clamp(p.big*10-s,0,1)*.75*dimO));show(this.legB,p.big);
    this.law.style.strokeDashoffset=1000*(1-p.law);show(this.lawL,clamp(p.law*2-1,0,1));
    show(this.du,p.duel);show(this.dQ,1-p.duelRv);show(this.dR,p.duelRv);
  }
});

/* ---------- 3. la loi : escalier, curseurs, formules, activité ---------- */
scene('loi',{
  p:{xmax:20,ymax:100,N0:100,f:6,curve:1,run:0,st1:0,st2:0,st34:0,eq:0,eqs:'',eqs2:'',f20:0,th:0,tan:0,bars:0,demi:0},
  build(g){
    this.ax=E('g',{},g);
    this.clip=E('g',{'clip-path':'url(#rclip-loi)'},g);
    this.runG=E('g',{},this.clip);this.runP=NK.map(()=>E('circle',{r:4,class:'s-a'},this.runG));
    this.barG=E('g',{},this.clip);this.barR=DK.map(()=>E('rect',{width:14,class:'bar'},this.barG));
    this.barE=E('path',{class:'k-ink nofill','stroke-width':2,'stroke-dasharray':'6 6'},this.barG);
    this.barT=E('text',{class:'t-lab2 s-a halo','text-anchor':'middle'},this.barG);
    this.barLeg=E('g',{},g);
    E('text',{x:910,y:258,class:'t-lab s-a','text-anchor':'end',text:'barres : tes 6, tic par tic'},this.barLeg);
    E('text',{x:910,y:284,class:'t-lab s-ink','text-anchor':'end',text:'pointillés : un sixième des dés restants'},this.barLeg);
    this.cv=E('path',{class:'k-ink nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},this.clip);
    this.cv20=E('path',{class:'k-c nofill','stroke-width':2.5,'stroke-dasharray':'9 7'},this.clip);
    this.cv20L=fx(g,0,0,`dé à 20 faces : λ ≈ ${fr(L20,3)} par tic`,'t-lab2 s-c halo',20);
    this.stairs=[1,2,3,4].map(()=>{const sg=E('g',{},g);return {g:sg,
      h:E('line',{class:'k-a','stroke-dasharray':'5 6','stroke-width':1.8},sg),
      v:E('line',{class:'k-a','stroke-dasharray':'5 6','stroke-width':1.8},sg),
      dot:E('circle',{r:5.5,class:'s-a'},sg),lab:E('text',{class:'t-lab2 s-a halo'},sg),
      br:E('path',{class:'k-a nofill','stroke-width':2},sg),brl:fx(sg,0,0,'','t-lab s-a',18,'middle')};});
    this.thL=fx(g,0,0,`*t*_{1/2} = ln 2 / λ ≈ ${fr(TH,2)} tics`,'t-lab2 s-a halo',20);
    this.tanG=E('g',{},g);
    this.tanL=E('line',{class:'k-ink','stroke-width':2},this.tanG);
    this.tanD=E('circle',{r:6,class:'s-ink'},this.tanG);
    this.tanP=fx(this.tanG,0,0,'e^{−1} ≈ '+fr(100*Math.exp(-1),0)+' %','t-lab2 s-ink halo',20);
    this.tanT=fx(this.tanG,0,0,'τ = 1/λ ≈ '+fr(TAU,2)+' tics','t-lab2 s-ink halo',20);
    this.n0L=fx(g,0,0,'','t-lab2 s-ink halo',20);
    this.eqT=fx(g,910,178,'','t-big2 s-ink',30,'end');
    this.eqT2=fx(g,910,216,'','t-lab2 s-dim',20,'end');
  },
  render(){const p=this.p,X=k=>110+800*k/p.xmax,Y=v=>580-450*v/p.ymax,f=Math.max(2,p.f),th=thDe(f),N0=p.N0;
    const key=p.xmax.toFixed(2)+'|'+p.ymax.toFixed(1);
    if(this._ax!==key){this._ax=key;axes(this.ax,X,Y,p.xmax,p.ymax,p.xmax>25?10:5,p.ymax>150?250:25,v=>String(v),v=>String(v),'tics','N : dés restants');}
    this.cv.setAttribute('d',courbe(k=>N0*(1-1/f)**k,0,p.xmax,X,Y));this.cv.style.strokeDashoffset=1000*(1-p.curve);
    this.runP.forEach((c,j)=>{c.setAttribute('cx',X(j).toFixed(1));c.setAttribute('cy',Y(NK[j]).toFixed(1));});show(this.runG,.55*p.run);
    this.cv20.setAttribute('d',courbe(k=>100*(19/20)**k,0,p.xmax,X,Y));show(this.cv20,p.f20);
    this.cv20L.setAttribute('x',X(13));this.cv20L.setAttribute('y',(Y(100*(19/20)**13)-16).toFixed(1));show(this.cv20L,p.f20);
    const ops=[p.st1,p.st2,p.st34,p.st34];
    this.stairs.forEach((s,i)=>{const n=i+1,t=n*th,v=N0/2**n,x=X(t),y=Y(v),x0=X((n-1)*th);
      s.h.setAttribute('x1',X(0));s.h.setAttribute('x2',x);s.h.setAttribute('y1',y);s.h.setAttribute('y2',y);
      s.v.setAttribute('x1',x);s.v.setAttribute('x2',x);s.v.setAttribute('y1',y);s.v.setAttribute('y2',Y(0));
      s.dot.setAttribute('cx',x);s.dot.setAttribute('cy',y);
      s.lab.textContent=fr(v,Number.isInteger(v)?0:(Number.isInteger(v*10)?1:2));s.lab.setAttribute('x',x+10);s.lab.setAttribute('y',y-10);
      s.br.setAttribute('d',`M${x0.toFixed(1)} 616v6H${x.toFixed(1)}v-6`);
      setFx(s.brl,n===1&&(p.demi>.5||p.th>.5)?`*t*_{1/2} ≈ ${fr(th,2)} tics`:'*t*_{1/2}');s.brl.setAttribute('x',((x0+x)/2).toFixed(1));s.brl.setAttribute('y',648);
      show(s.g,ops[i]);show(s.lab,n===1&&p.th>.5?0:1);});
    this.thL.setAttribute('x',X(TH)+14);this.thL.setAttribute('y',Y(50)-40);show(this.thL,p.th*(1-p.demi));
    this.tanL.setAttribute('x1',X(0));this.tanL.setAttribute('y1',Y(N0));this.tanL.setAttribute('x2',X(TAU));this.tanL.setAttribute('y2',Y(0));
    this.tanD.setAttribute('cx',X(TAU));this.tanD.setAttribute('cy',Y(N0*Math.exp(-1)));
    this.tanP.setAttribute('x',X(TAU)+12);this.tanP.setAttribute('y',Y(N0*Math.exp(-1))-12);
    this.tanT.setAttribute('x',X(TAU)+10);this.tanT.setAttribute('y',Y(0)-12);show(this.tanG,p.tan);
    // activité : les 6 de l'élève, tic par tic ; la barre à mettre en valeur est celle où il restait ≈ 50 dés
    let jh=1;for(let j=1;j<=KMAX;j++)if(Math.abs(NK[j-1]-50)<Math.abs(NK[jh-1]-50))jh=j;
    this.barR.forEach((r,j)=>{if(!j){r.style.display='none';return;}r.setAttribute('x',(X(j)-7).toFixed(1));r.setAttribute('y',Y(DK[j]).toFixed(1));r.setAttribute('height',Math.max(0,Y(0)-Y(DK[j])).toFixed(1));r.setAttribute('class',j===jh?'bar hl':'bar');});
    this.barE.setAttribute('d',courbe(k=>100/6*(5/6)**(k-1),1,Math.min(20,p.xmax),X,Y,120));
    this.barT.textContent=ty(`${DK[jh]} sur ${NK[jh-1]}`);this.barT.setAttribute('x',X(jh));this.barT.setAttribute('y',Y(Math.max(DK[jh],100/6*(5/6)**(jh-1)))-24);
    show(this.barG,p.bars);show(this.barLeg,p.bars);
    setFx(this.n0L,`*N*_{0} = ${Math.round(N0)}`);this.n0L.setAttribute('x',X(0)+14);this.n0L.setAttribute('y',Y(N0)-12);show(this.n0L,p.demi);
    if(p.demi>.5){setFx(this.eqT,`*t*_{1/2} ≈ ${fr(th,2)} tics`);setFx(this.eqT2,`dé à ${Math.round(f)} faces · *N*_{0} = ${Math.round(N0)}`);show(this.eqT,p.demi);show(this.eqT2,p.demi);}
    else{setFx(this.eqT,p.eqs);setFx(this.eqT2,p.eqs2);show(this.eqT,p.eq);show(this.eqT2,p.eq);}
  }
});

/* ---------- 4. les mesures de Rutherford (1900) ---------- */
scene('ruther',{
  p:{pts:0,stairs:0},
  build(g){const X=t=>110+800*t/360,Y=v=>580-450*v;this.X=X;this.Y=Y;
    axes(E('g',{},g),X,Y,360,1,60,.25,v=>v?`${v/60} min`:'0',frR,'t','intensité mesurée (1 au départ)');
    E('text',{x:910,y:150,class:'t-tiny s-dim','text-anchor':'end',text:'Rutherford, Philosophical Magazine, janvier 1900 — tableau III'},g);
    this.st=[1,2,3,4].map(n=>{const sg=E('g',{},g),t=60*n,v=1/2**n;
      E('line',{x1:X(0),x2:X(t),y1:Y(v),y2:Y(v),class:'k-a','stroke-dasharray':'5 6','stroke-width':1.8},sg);
      E('line',{x1:X(t),x2:X(t),y1:Y(v),y2:Y(0),class:'k-a','stroke-dasharray':'5 6','stroke-width':1.8},sg);return sg;});
    this.pts=RUTH.map(([t,v])=>E('circle',{cx:X(t),cy:Y(v),r:7,class:'s-ink'},g));
    this.a62=E('text',{x:X(62)+12,y:Y(.51)-12,class:'t-lab2 s-ink halo',text:ty(`${frR(.51)} à 62 s`)},g);
    this.a118=E('text',{x:X(118)+12,y:Y(.23)-12,class:'t-lab2 s-a halo',text:ty(`${frR(.23)} à 118 s : presque ¼`)},g);
  },
  render(){const p=this.p;
    this.pts.forEach((c,j)=>show(c,clamp(p.pts*RUTH.length-j,0,1)));show(this.a62,clamp(p.pts*2-1,0,1));
    this.st.forEach((s,i)=>show(s,clamp(p.stairs*4-i,0,1)));show(this.a118,clamp(p.stairs*2-1,0,1));
  }
});

/* ---------- 5. l'horloge du carbone 14 ---------- */
const DER=['*A* = *A*_{0} e^{−λt}','*A* / *A*_{0} = e^{−λt}','ln(*A* / *A*_{0}) = −λ*t*','*t* = (1/λ) · ln(*A*_{0} / *A*)','soit *t* = (*t*_{1/2} / ln 2) · ln(*A*_{0} / *A*)'];
scene('horloge',{
  p:{curve:0,st:0,r:30,line:0,der:0,an:0,age:0,xmax:40000,irh:0},
  build(g){
    this.ax=E('g',{},g);
    this.band=E('rect',{y:130,height:450,class:'band'},g);
    this.bandL=E('text',{y:196,class:'t-lab s-a halo',text:ty('portée du carbone 14 : environ 50 000 ans')},g);
    this.cv=E('path',{class:'k-ink nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.st=[1,2,3,4].map(n=>{const sg=E('g',{},g);return {g:sg,h:E('line',{class:'k-dim','stroke-dasharray':'5 6','stroke-width':1.6},sg),v:E('line',{class:'k-dim','stroke-dasharray':'5 6','stroke-width':1.6},sg),dot:E('circle',{r:5,class:'s-ink'},sg),lab:fx(sg,0,0,`${n} *t*_{1/2} = ${ent(n*T14)} ans`,'t-lab s-ink halo',18)};});
    this.lnG=E('g',{},g);
    this.lnH=E('line',{class:'k-a','stroke-width':2.2},this.lnG);this.lnV=E('line',{class:'k-a','stroke-width':2.2,'stroke-dasharray':'7 5'},this.lnG);
    this.lnD=E('circle',{r:7,class:'s-a'},this.lnG);
    // l'âge ne s'affiche qu'une fois CALCULÉ (étapes 28-29), sous l'axe, là où aucune marche n'écrit
    this.lnR=fx(this.lnG,120,0,'','t-lab2 s-a halo',20);this.lnA=fx(this.lnG,0,646,'','t-lab2 s-a halo',20,'middle');
    this.der=DER.map((s,i)=>fx(g,490,154+i*40,s,'t-mid s-ink',26));
    this.an=fx(g,490,372,`*t* = (${ent(T14)} / ln 2) × ln(1 / 0,30) ≈ ${ent(sig3(AGE30))} ans`,'t-lab2 s-a',20);
    this.an2=E('text',{x:490,y:400,class:'t-lab s-dim',text:'entre une et deux demi-vies, comme ton estimation'},g);
    this.irM=E('line',{y1:130,y2:580,class:'k-a','stroke-width':2.2,'stroke-dasharray':'8 6'},g);
    this.irL=E('text',{y:160,class:'t-lab2 s-a','text-anchor':'end',text:ty('Jebel Irhoud : ≈ 315 000 ans')},g);
    this.irB=E('g',{},g);
    fx(this.irB,300,282,`${ent(IRHOUD)} ans ≈ ${fr(IRH_DV,0)} demi-vies`,'t-big2 s-ink',30);
    fx(this.irB,300,322,`il reste 1/2^{${fr(IRH_DV,0)}} ≈ ${sci(IRH_FRAC)} du carbone 14`,'t-lab2 s-ink',20);
    fx(this.irB,300,354,`1 g de carbone vivant : ${sci(N_C14_1G)} noyaux de carbone 14`,'t-lab s-dim',18);
    fx(this.irB,300,388,`${ent(IRHOUD)} ans plus tard : ≈ ${sci(IRH_RESTE)} noyau`,'t-lab2 s-a',20);
  },
  render(){const p=this.p,X=t=>110+800*t/p.xmax,Y=v=>580-450*v/100;
    if(this._ax!==p.xmax){this._ax=p.xmax;axes(this.ax,X,Y,p.xmax,100,p.xmax>60000?50000:10000,25,v=>ent(v),v=>`${v} %`,'t (ans)','activité, en % de celle d’un bois vivant');}
    this.cv.setAttribute('d',courbe(t=>100*2**(-t/T14),0,p.xmax,X,Y,400));this.cv.style.strokeDashoffset=1000*(1-p.curve);
    const so=p.st*(1-p.irh);
    this.st.forEach((s,i)=>{const n=i+1,x=X(n*T14),y=Y(100/2**n);s.h.setAttribute('x1',X(0));s.h.setAttribute('x2',x);s.h.setAttribute('y1',y);s.h.setAttribute('y2',y);
      s.v.setAttribute('x1',x);s.v.setAttribute('x2',x);s.v.setAttribute('y1',y);s.v.setAttribute('y2',Y(0));s.dot.setAttribute('cx',x);s.dot.setAttribute('cy',y);
      s.lab.setAttribute('x',x+10);s.lab.setAttribute('y',y-10);show(s.g,so);});
    const r=clamp(p.r,1,99),tr=ageDe(r),xr=X(tr),yr=Y(r);
    this.lnH.setAttribute('x1',X(0));this.lnH.setAttribute('x2',xr);this.lnH.setAttribute('y1',yr);this.lnH.setAttribute('y2',yr);
    this.lnV.setAttribute('x1',xr);this.lnV.setAttribute('x2',xr);this.lnV.setAttribute('y1',yr);this.lnV.setAttribute('y2',Y(0));
    this.lnD.setAttribute('cx',xr);this.lnD.setAttribute('cy',yr);
    setFx(this.lnR,ty(`*A* / *A*_{0} = ${Math.round(r)} %`));this.lnR.setAttribute('y',yr-10);
    setFx(this.lnA,ty(`*t* ≈ ${ent(sig3(tr))} ans`));this.lnA.setAttribute('x',clamp(xr,190,840).toFixed(1));
    show(this.lnG,Math.max(p.line,p.age)*(1-p.irh));show(this.lnA,Math.max(p.an,p.age));
    this.der.forEach((t,i)=>show(t,clamp(p.der-i,0,1)));show(this.an,p.an);show(this.an2,p.an);
    const io=clamp(p.irh*2-1,0,1);
    this.band.setAttribute('x',X(0));this.band.setAttribute('width',Math.max(0,X(LIM14)-X(0)).toFixed(1));show(this.band,.7*io);
    this.bandL.setAttribute('x',X(LIM14)+10);show(this.bandL,io);
    this.irM.setAttribute('x1',X(IRHOUD));this.irM.setAttribute('x2',X(IRHOUD));this.irL.setAttribute('x',X(IRHOUD)-10);
    show(this.irM,io);show(this.irL,io);show(this.irB,io);
  }
});

/* ---------- 6. Libby, 1949 ---------- */
scene('libby',{
  p:{bars:0},
  build(g){const X=a=>160+740*(a-4000)/1400;
    E('line',{x1:X(4000),x2:X(5400),y1:520,y2:520,class:'k-dim','stroke-width':1.5},g);
    for(let a=4000;a<=5400;a+=200){E('line',{x1:X(a),x2:X(a),y1:520,y2:526,class:'k-dim'},g);E('text',{x:X(a),y:546,class:'t-tick s-dim','text-anchor':'middle',text:ent(a)},g);}
    E('text',{x:X(5400),y:580,class:'t-lab s-dim','text-anchor':'end',text:'âge en 1949, en années'},g);
    const lo=Math.max(...Object.values(LIBBY).map(([c,e])=>c-e)),hi=Math.min(...Object.values(LIBBY).map(([c,e])=>c+e));
    this.band=E('g',{},g);E('rect',{x:X(lo),y:150,width:X(hi)-X(lo),height:370,class:'band'},this.band);
    E('text',{x:(X(lo)+X(hi))/2,y:140,class:'t-lab s-a','text-anchor':'middle',text:'les trois intervalles se recouvrent'},this.band);
    const rows=[['Tombe de Snéfrou (Meïdoum) — date des historiens',LIBBY.snef,220,'ink'],['Tombe de Djéser (Saqqarah) — date des historiens',LIBBY.djos,320,'ink'],['Carbone 14 — Arnold et Libby, 1949',LIBBY.c14,440,'a']];
    this.rows=rows.map(([t,[c,e],y,k])=>{const rg=E('g',{},g);
      E('text',{x:160,y:y-28,class:`t-lab2 s-${k}`,text:t},rg);
      E('line',{x1:X(c-e),x2:X(c+e),y1:y,y2:y,class:`k-${k}`,'stroke-width':6},rg);
      [c-e,c+e].forEach(a=>E('line',{x1:X(a),x2:X(a),y1:y-12,y2:y+12,class:`k-${k}`,'stroke-width':3},rg));
      E('circle',{cx:X(c),cy:y,r:8,class:`s-${k}`},rg);
      E('text',{x:X(c+e)+16,y:y+7,class:`t-lab2 s-${k}`,text:ty(`${ent(c)} ± ${e} ans`)},rg);return rg;});
    E('text',{x:160,y:640,class:'t-tiny s-dim',text:'Science, 23 décembre 1949, tableau 1 · bois d’acacia (Djéser) et de cyprès (Snéfrou)'},g);
  },
  render(){const p=this.p;this.rows.forEach((r,i)=>show(r,clamp(p.bars*4-i,0,1)));show(this.band,clamp(p.bars*4-3,0,1));}
});

/* ---------- 7. vérification ---------- */
const QUIZ=[
  {tag:'d’après le QCM du bac 2023',big:'*t* = 2 *t*_{1/2}',sub:'part des noyaux désintégrés ?',r1:'il reste *N*_{0}/4, soit 25 %',r2:'donc 75 % se sont désintégrés'},
  {tag:'radon 222 : sujet du bac 2019',big:'radon 222',sub:'*t*_{1/2} = 3,8 jours · déjà 10 jours',r1:'encore 3,8 jours, comme au premier jour',r2:'un noyau ne vieillit pas'},
  {tag:'activité ou nombre de noyaux',big:'*A* = 8,0 × 10^{6} Bq',sub:'combien de noyaux *N* ?',r1:'*A* = λ*N*, donc *N* = *A* / λ',r2:'l’activité compte des désintégrations par seconde'}
];
scene('quiz',{
  p:{qi:0,rv:0},
  build(g){
    this.tag=E('text',{x:500,y:190,class:'t-lab s-dim','text-anchor':'middle'},g);
    this.big=fx(g,500,312,'','t-huge s-ink',60,'middle');
    this.sub=fx(g,500,370,'','t-big s-dim',30,'middle');
    this.r1=fx(g,500,460,'','t-big2 s-a',30,'middle');
    this.r2=fx(g,500,508,'','t-big2 s-a',30,'middle');
  },
  render(){const i=Math.round(this.p.qi),q=QUIZ[i];this.tag.textContent=ty(`Question ${i+1} sur 3 · ${q.tag}`);
    setFx(this.big,ty(q.big));setFx(this.sub,ty(q.sub));setFx(this.r1,ty(q.r1));setFx(this.r2,ty(q.r2));
    show(this.r1,this.p.rv);show(this.r2,clamp(this.p.rv*2-1,0,1));}
});

/* ---------- 8. ce que tu sais maintenant ---------- */
scene('end',{
  p:{n:0},
  build(g){
    E('text',{x:90,y:96,class:'t-lab s-dim',text:'Ce que tu as compris'},g);
    const I=[['Chaque noyau tire au sort, sans mémoire :','aucun ne vieillit.'],['Une population suit une loi exacte :','*N*(*t*) = *N*_{0} e^{−λt}'],['La demi-vie ne dépend ni de *N*_{0} ni de l’âge :','*t*_{1/2} = ln 2 / λ'],['L’activité restante donne l’âge :','*t* = (1/λ) · ln(*A*_{0} / *A*)']];
    this.items=I.map((l,i)=>{const gg=E('g',{},g),y=180+i*128;E('text',{x:90,y:y+22,class:'mono t-num s-a',text:String(i+1)},gg);fx(gg,170,y,ty(l[0]),'t-big s-ink',30);fx(gg,170,y+44,ty(l[1]),'t-big s-dim',30);return gg;});
  },
  render(){this.items.forEach((g,i)=>{const o=clamp(this.p.n-i,0,1);g.style.opacity=o;g.setAttribute('transform',`translate(${((1-o)*-16).toFixed(1)} 0)`);});}
});

/* ---------- le script ---------- */
const BEATS=[{name:'L’énigme'},{name:'Cent dés'},{name:'La courbe'},{name:'La demi-vie'},{name:'La loi'},{name:'Dater'},{name:'À toi'}];
const BET=t=>({opts:t.map(([x,fb,j])=>({t:x,fb,juste:!!j}))});
const TICK=(k,m)=>k>=1?`Tic ${k} : il reste <b>${NK[k]}</b> dés. ${k<m?`Encore ${m-k} tic${m-k>1?'s':''}.`:''}`:'Appuie sur « Lancer les dés ».';
const IRH_FIN='Il a fallu une autre horloge : des silex chauffés par le feu. La chaleur a remis leur compteur à zéro ; depuis, ils accumulent le rayonnement de la radioactivité naturelle (uranium, thorium, potassium 40), mesuré par thermoluminescence.';
const STEPS=[
/* 0 */ {cle:'becq',beat:0,scene:'plaque',tag:'Paris · février 1896',
  text:'Paris, février 1896. Henri Becquerel enveloppe une plaque photographique dans du papier noir, pose dessus des lamelles d’un sel d’uranium et expose le tout au soleil. Au développement, la silhouette des lamelles apparaît en noir. Son idée : le soleil ferait émettre au sel des rayons invisibles.'},
/* 1 */ {cle:'tiroir',beat:0,scene:'plaque',tag:'26 et 27 février 1896',seq:[{p:{drawer:1},d:1300}],
  text:'Le mercredi 26 et le jeudi 27 février, le soleil ne se montre que par intermittence. Becquerel range les plaques toutes prêtes dans le tiroir d’un meuble, lamelles en place. Les jours suivants, toujours pas de soleil.'},
/* 2 */ {cle:'plaque',beat:0,scene:'plaque',tag:'1ᵉʳ mars 1896',
  text:'Le 1<sup>er</sup> mars, sans avoir revu le soleil, il développe quand même les plaques. À quoi t’attends-tu ?',
  pari:{reveal:[{p:{drawer:0,dev:1},d:1500}],...BET([
    ['Rien du tout : pas de lumière, pas d’image','C’était logique. Et pourtant, les silhouettes sont là, bien noires.'],
    ['Des images très faibles','C’est exactement ce qu’attendait Becquerel. Et pourtant, les silhouettes sont là, bien noires.'],
    ['Des silhouettes bien noires','Tu as vu plus loin que Becquerel : lui s’attendait à des images très faibles.',1]])}},
/* 3 */ {cle:'energie',beat:0,scene:'plaque',
  text:'La plaque a noirci dans le noir complet. D’où vient l’énergie qui l’a impressionnée ?',
  pari:{reveal:[{p:{src:1},d:1200}],...BET([
    ['Du soleil des jours d’avant, gardé en réserve','C’était la piste naturelle, celle de Becquerel au départ. Mais en mai 1896, des sels d’uranium qui ne luisent pas du tout font le même effet : l’énergie vient de l’uranium lui-même.'],
    ['De l’uranium lui-même, sans aucune aide','Oui. En mai 1896, Becquerel le confirme avec des sels d’uranium qui ne luisent pas : le rayonnement vient de l’uranium lui-même. Marie et Pierre Curie lui donneront un nom : la radioactivité.',1],
    ['D’une fuite de lumière dans le tiroir','Bon réflexe d’expérimentateur. Mais une fuite aurait voilé la plaque au hasard, pas dessiné la forme exacte des lamelles. En mai 1896, Becquerel conclut : le rayonnement vient de l’uranium lui-même.']])}},
/* 4 */ {cle:'des',beat:1,scene:'des',set:{dice:0},seq:[{p:{dice:1},d:1400}],
  text:'Un grain de sel d’uranium contient des milliards de milliards de noyaux. Chacun finira par se désintégrer, mais personne ne sait quand. Pour voir ce que ça donne, remplace chaque noyau par un dé : à chaque tic, on lance tous les dés encore en jeu, et un 6 veut dire « ce noyau se désintègre ».'},
/* 5 */ {cle:'tic1',beat:1,scene:'des',ctl:'tic',tic:1,after:{k:1},
  text:'À toi : lance les dés. Une seule fois.',
  note:k=>k>=1?`<b>${DK[1]}</b> dés ont fait 6 : ces noyaux se sont désintégrés. Il en reste <b>${NK[1]}</b>.`:'Appuie sur « Lancer les dés ».'},
/* 6 */ {cle:'pari10',beat:1,scene:'des',
  text:'Avant de continuer : au bout de 10 tics, combien de dés resteront en jeu ?',
  pari:BET([['Presque aucun : dix fois un sixième, c’est plus que tout','Pari noté. Lance, et compte.',J10===0],['Une quinzaine','Pari noté. Lance, et compte.',J10===1],['Une quarantaine','Pari noté. Lance, et compte.',J10===2]])},
/* 7 */ {cle:'tic10',beat:1,scene:'des',set:{graph:1},ctl:'tic',tic:10,after:{k:10},
  text:'Lance jusqu’au dixième tic. Chaque tic ajoute un point rouge au graphe : le pourcentage de dés encore en jeu.',
  note:k=>k<10?TICK(k,10):`Tic 10 : il en reste <b>${NK[10]}</b>. ${pari10()}`},
/* 8 */ {cle:'duel',beat:1,scene:'des',set:{duel:1},
  text:'Le dé de gauche a survécu à 10 lancers : c’est celui qui est encadré dans la grille. Celui de droite sort de la boîte. Au prochain tic, lequel a le plus de chances de faire 6 ?',
  pari:{reveal:[{p:{duelRv:1},d:900}],...BET([
    ['Le vieux : son tour finit par venir','C’est l’intuition de l’ampoule usée. Mais un dé ne se souvient pas de ses lancers : 1 chance sur 6, pour l’un comme pour l’autre. Un noyau non plus ne vieillit pas : sa chance ne dépend pas de son âge.'],
    ['Le neuf : le vieux a prouvé qu’il est solide','Le vieux a eu de la chance, pas de la solidité : ses dix lancers ne changent rien au onzième. 1 chance sur 6 chacun. Un noyau non plus ne vieillit pas.'],
    ['Les deux, autant','Oui : un dé n’a pas de mémoire. Un noyau non plus : il ne vieillit pas, et sa chance de se désintégrer ne dépend pas de son âge.',1]])}},
/* 9 */ {cle:'tic20',beat:2,scene:'des',set:{duel:0,duelRv:0},ctl:'tic',tic:20,after:{k:20},
  text:'Continue jusqu’au vingtième tic, et regarde la forme que dessinent tes points.',
  note:k=>k<20?TICK(k,20):`Tic 20 : il en reste <b>${NK[20]}</b>. Les points tombent vite au début, puis de plus en plus lentement : moins il reste de dés, moins il en part à chaque tic.`},
/* 10 */ {cle:'autres',beat:2,scene:'des',seq:[{p:{others:1},d:1800}],
  text:'Refais l’expérience neuf fois, avec 100 dés neufs à chaque fois : ce sont les points gris. Aucune série ne ressemble exactement à la tienne, et pourtant toutes ont la même allure.'},
/* 11 */ {cle:'grands',beat:2,scene:'des',
  text:'Et avec 10 000 dés au lieu de 100, comptés en pourcentage du départ ? Dix séries de 10 000 dés s’écarteraient les unes des autres…',
  pari:{reveal:[{p:{big:1},d:1600}],...BET([
    ['Plus : plus de dés, plus de hasard','Chaque dé reste imprévisible, mais leurs écarts se compensent : les dix séries de 10 000 dés (traits noirs) se confondent presque.'],
    ['Autant qu’avec 100','Regarde les traits noirs : les dix séries de 10 000 dés se confondent presque. Les écarts de chaque dé se compensent.'],
    ['Moins : presque une seule courbe','Oui : les dix séries de 10 000 dés (traits noirs) se confondent presque. Plus il y a de noyaux, plus la courbe est nette.',1]])}},
/* 12 */ {cle:'loi-pop',beat:2,scene:'des',seq:[{p:{law:1},d:2000}],
  text:()=>`Un milligramme d’uranium contient environ ${sci(N_U)} noyaux. À cette échelle, le hasard de chaque noyau ne se voit plus : il reste une seule courbe, toujours la même. Un noyau seul est imprévisible ; une population suit une loi exacte.`,
  say:()=>`Un milligramme d’uranium contient environ ${fr(N_U/1e18,1)} milliards de milliards de noyaux. À cette échelle, le hasard de chaque noyau ne se voit plus : il reste une seule courbe, toujours la même. Un noyau seul est imprévisible ; une population suit une loi exacte.`},
/* 13 */ {cle:'marche1',beat:3,scene:'loi',set:{run:1},seq:[{p:{st1:1},d:1400}],
  text:`Suis cette courbe, celle des dés. Partie de 100, elle passe à 50 au bout de ${fr(TH,1)} tics : la moitié des dés a disparu.`},
/* 14 */ {cle:'marche2',beat:3,scene:'loi',
  text:'Pour passer de 50 à 25, il faudra…',
  pari:{reveal:[{p:{st2:1},d:1400}],...BET([
    [`Moins de ${fr(TH,1)} tics : il y a moins de dés`,`Moins de dés, mais chacun garde 1 chance sur 6 : il faut le même temps pour en perdre la moitié. Regarde la deuxième marche : ${fr(TH,1)} tics.`],
    [`${fr(TH,1)} tics, exactement pareil`,`Oui : la deuxième marche a exactement la même largeur. Peu importe combien il en reste, la moitié part en ${fr(TH,1)} tics.`,1],
    [`Plus de ${fr(TH,1)} tics : il ne reste que les plus résistants`,`Les survivants n’ont rien de spécial : ils ont eu de la chance. Chacun garde 1 chance sur 6, d’où la même largeur : ${fr(TH,1)} tics.`]])}},
/* 15 */ {cle:'demivie',beat:3,scene:'loi',seq:[{p:{st34:1},d:1400}],
  text:'Puis 12,5, puis 6,25 : toutes les marches ont la même largeur. Cette durée s’appelle la <b>demi-vie</b>, notée <i>t</i><sub>1/2</sub>. Et la courbe ne touche jamais zéro : après <i>n</i> demi-vies, il reste <i>N</i><sub>0</sub>/2<sup><i>n</i></sup>.',
  say:'Puis 12,5, puis 6,25 : toutes les marches ont la même largeur. Cette durée s’appelle la demi-vie, notée t un demi. Et la courbe ne touche jamais zéro : après n demi-vies, il reste N zéro divisé par 2 puissance n.'},
/* 16 */ {cle:'ruther',beat:3,scene:'ruther',tag:'1900 · Montréal',seq:[{p:{pts:1},d:1600}],
  text:'Montréal, 1900. Ernest Rutherford mesure le rayonnement d’un gaz radioactif qui s’échappe des composés du thorium. Il écrit que l’intensité « tombe à la moitié de sa valeur en une minute environ » (traduit de l’anglais). Voici ses mesures.'},
/* 17 */ {cle:'quart',beat:3,scene:'ruther',
  text:'Au bout de combien de temps l’intensité tombe-t-elle au quart ?',
  pari:{reveal:[{p:{stairs:1},d:1600}],...BET([
    ['Vers 1 min 30 s',`Un quart, c’est la moitié de la moitié : deux demi-vies, donc vers 2 min. Sa mesure à 118 s : ${frR(.23)}, presque un quart.`],
    ['Vers 2 min',`Oui : la moitié de la moitié, deux demi-vies. Sa mesure à 118 s : ${frR(.23)}, presque un quart.`,1],
    ['Vers 4 min',`Quatre minutes, ce serait quatre demi-vies : un seizième. Le quart, c’est deux demi-vies, vers 2 min. Sa mesure à 118 s : ${frR(.23)}.`]])}},
/* 18 */ {cle:'curseurs',beat:3,scene:'loi',set:{xmax:40,ymax:1000,N0:300,f:6,run:0,st1:1,st2:0,st34:0,demi:1},ctl:'demi',
  text:'Rutherford le constate : un échantillon de n’importe quelle taille met le même temps à perdre la moitié. Vérifie-le : change le nombre de dés <i>N</i><sub>0</sub>, puis la sorte de dé.'},
/* 19 */ {cle:'produit',beat:4,scene:'loi',set:{xmax:20,ymax:100,N0:100,f:6,demi:0,st1:0,eq:0,eqs:'*N* = *N*_{0} × (5/6)^{k}',eqs2:''},seq:[{p:{eq:1},d:900}],
  text:'Écris ce que font les dés. À chaque tic, il reste 5/6 des dés : <i>N</i><sub>0</sub> devient <i>N</i><sub>0</sub> × 5/6, puis <i>N</i><sub>0</sub> × (5/6)², et ainsi de suite.',
  tex:[['N = N_0 \\times \\left(\\tfrac{5}{6}\\right)^{k}','N = N₀ × (5/6)^k']],
  say:'Écris ce que font les dés. À chaque tic, il reste cinq sixièmes des dés : N zéro devient N zéro fois cinq sixièmes, puis N zéro fois cinq sixièmes au carré, et ainsi de suite.'},
/* 20 */ {cle:'lambda',beat:4,scene:'loi',set:{eqs:'*N* = *N*_{0} e^{−λk}',eqs2:`λ = ln(6/5) ≈ ${fr(LAMD,3)} par tic`},
  text:'Souviens-toi de la leçon sur le logarithme : ln change les × en +. Les <i>k</i> multiplications par 5/6 deviennent une exponentielle. Le nombre ln(6/5) s’appelle la <b>constante radioactive</b> λ.',
  tex:[['\\left(\\tfrac{5}{6}\\right)^{k} = e^{-k\\ln(6/5)}','(5/6)^k = e^(−k ln(6/5))'],[`N = N_0\\,e^{-\\lambda k} \\qquad \\lambda \\approx ${fr(LAMD,3).replace(',','{,}')}`,`N = N₀ e^(−λk), λ ≈ ${fr(LAMD,3)}`]],
  html:()=>ty(`<p class="small">λ est un peu plus grand que 1/6 ≈ ${fr(1/6,3)} : les dés tombent par à-coups, à chaque tic ; le temps des noyaux, lui, coule sans à-coups.</p>`),
  say:'Souviens-toi de la leçon sur le logarithme : l n change les produits en sommes. Les k multiplications par cinq sixièmes deviennent une exponentielle. Le nombre l n de six cinquièmes s’appelle la constante radioactive, lambda.'},
/* 21 */ {cle:'continu',beat:4,scene:'loi',set:{eqs:'*N*(*t*) = *N*_{0} e^{−λt}',eqs2:'λ en s^{−1} ou an^{−1} : λt sans unité'},seq:[{p:{f20:1},d:1400}],
  text:`Pour de vrais noyaux, le temps ne tombe pas en tics : il coule. C’est la <b>loi de décroissance</b>, avec λ en s<sup>−1</sup> (ou en an<sup>−1</sup>) pour que λ<i>t</i> soit sans unité. Plus λ est grand, plus la décroissance est rapide : le dé à 20 faces (λ ≈ ${fr(L20,3)} par tic) décroît lentement.`,
  tex:[['N(t) = N_0\\,e^{-\\lambda t}','N(t) = N₀ e^(−λt)']],
  say:'Pour de vrais noyaux, le temps ne tombe pas en tics : il coule. C’est la loi de décroissance, N de t égale N zéro exponentielle de moins lambda t, avec lambda en seconde puissance moins un, pour que lambda t soit sans unité. Plus lambda est grand, plus la décroissance est rapide : le dé à 20 faces décroît lentement.'},
/* 22 */ {cle:'ln2',beat:4,scene:'loi',set:{f20:0},seq:[{p:{st1:1,th:1},d:1300}],
  text:`D’où vient le ln 2 de ton cours ? Écris qu’à la demi-vie il reste la moitié, puis prends le ln pour faire descendre l’exposant. Pour les dés : ln 2 / ln(6/5) ≈ ${fr(TH,2)} tics, exactement la largeur de la marche.`,
  tex:[['\\dfrac{N_0}{2} = N_0\\,e^{-\\lambda t_{1/2}}','N₀/2 = N₀ e^(−λ t½)'],['e^{\\lambda t_{1/2}} = 2 \\;\\Longrightarrow\\; \\lambda\\, t_{1/2} = \\ln 2','λ t½ = ln 2'],['t_{1/2} = \\dfrac{\\ln 2}{\\lambda}','t½ = ln 2 / λ']],
  say:()=>`D’où vient le l n 2 de ton cours ? Écris qu’à la demi-vie il reste la moitié, puis prends le l n pour faire descendre l’exposant : t un demi égale l n 2 sur lambda. Pour les dés, environ ${fr(TH,1)} tics : exactement la largeur de la marche.`},
/* 23 */ {cle:'tau',beat:4,scene:'loi',seq:[{p:{tan:1},d:1400}],
  text:`Une autre durée caractéristique : la <b>constante de temps</b> τ = 1/λ. La tangente à l’origine coupe l’axe des temps en τ. À <i>t</i> = τ, il reste e<sup>−1</sup> ≈ ${fr(100*Math.exp(-1),0)} % des noyaux, pas 50 % : τ est plus long que <i>t</i><sub>1/2</sub>.`,
  tex:[['\\tau = \\dfrac{1}{\\lambda} \\qquad t_{1/2} = \\tau\\,\\ln 2','τ = 1/λ, t½ = τ ln 2']],
  say:()=>`Une autre durée caractéristique : la constante de temps, tau égale un sur lambda. La tangente à l’origine coupe l’axe des temps en tau. À t égale tau, il reste environ ${fr(100*Math.exp(-1),0)} pour cent des noyaux, pas 50 : tau est plus long que t un demi.`},
/* 24 */ {cle:'activite',beat:4,scene:'loi',set:{tan:0,th:0,st1:0,eq:0},
  text:()=>`Un détecteur compte des désintégrations, pas des noyaux. Sur 100 dés, environ ${fr(100/6,0)} font 6 par tic. Sur 50 dés, combien ?`,
  pari:{reveal:[{p:{bars:1},d:1400}],...BET([
    [`Toujours environ ${fr(100/6,0)}`,'Chaque dé garde 1 chance sur 6 : moitié moins de dés, moitié moins de 6. Les barres baissent comme la courbe.'],
    [`Environ ${fr(50/6,0)}`,'Oui : un sixième de 50. Les barres baissent au même rythme que la courbe.',1],
    [`Environ ${fr(200/6,0)}`,`Ce serait le double, avec moitié moins de dés. Un sixième de 50 : environ ${fr(50/6,0)}. Les barres baissent comme la courbe.`]]),
    apres:{tex:[['A = -\\dfrac{dN}{dt} = \\lambda N','A = −dN/dt = λN']],
      html:'<p class="small">Pour des noyaux, c’est l’<b>activité</b> <i>A</i>, en becquerels : 1 Bq = 1 désintégration par seconde. Même loi, même demi-vie : <i>A</i>(<i>t</i>) = <i>A</i><sub>0</sub>e<sup>−λ<i>t</i></sup>.</p>'}}},
/* 25 */ {cle:'horloge',beat:5,scene:'horloge',seq:[{p:{curve:1},d:1800},{p:{st:1},d:900}],
  text:`Un être vivant échange sans cesse du carbone avec l’air : la part de carbone 14 dans son corps reste constante. À sa mort, les échanges cessent et le carbone 14 n’est plus renouvelé : l’horloge démarre. Demi-vie du carbone 14 : ${ent(T14)} ans.`},
/* 26 */ {cle:'pari30',beat:5,scene:'horloge',
  text:'Exercice : un charbon de bois trouvé dans un ancien foyer a une activité égale à 30 % de celle d’un bois vivant. Sans calcul, son âge est…',
  pari:{reveal:[{p:{line:1},d:1200}],...BET([
    [`Moins de ${ent(T14)} ans`,'Moins d’une demi-vie, il resterait plus de 50 %. Or 30 % est entre 50 % (une demi-vie) et 25 % (deux).'],
    [`Entre ${ent(T14)} et ${ent(2*T14)} ans`,'Oui : 30 % est entre 50 % et 25 %, donc entre une et deux demi-vies.',1],
    [`Plus de ${ent(3*T14)} ans`,'Après trois demi-vies, il ne resterait que 12,5 %. 30 % est entre 50 % et 25 % : entre une et deux demi-vies.']])}},
/* 27 */ {cle:'litteral',beat:5,scene:'horloge',seq:[{p:{der:5},d:3000}],
  text:'Maintenant le calcul exact, comme le correcteur l’attend : la loi, puis le ln, parce que <i>t</i> est coincé dans l’exposant, et l’expression littérale avant tout nombre. Les sujets le disent : « On donnera les expressions littérales avant de passer aux applications numériques. »',
  tex:[['t = \\dfrac{1}{\\lambda}\\,\\ln\\dfrac{A_0}{A} = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln\\dfrac{A_0}{A}','t = (1/λ) ln(A₀/A) = (t½ / ln 2) ln(A₀/A)']],
  say:'Maintenant le calcul exact, comme le correcteur l’attend : la loi, puis le l n, parce que t est coincé dans l’exposant, et l’expression littérale avant tout nombre : t égale un sur lambda fois l n de A zéro sur A. Les sujets le disent : on donnera les expressions littérales avant de passer aux applications numériques.'},
/* 28 */ {cle:'an',beat:5,scene:'horloge',seq:[{p:{an:1},d:1200}],
  text:()=>`Application numérique : <i>t</i> = (${ent(T14)} / ln 2) × ln(1 / 0,30) ≈ ${ent(sig3(AGE30))} ans. Puis vérifie avec l’escalier : entre une et deux demi-vies, comme ton estimation. Un résultat qui contredit l’escalier signale une erreur de calcul.`},
/* 29 */ {cle:'age',beat:5,scene:'horloge',set:{der:0,an:0,line:0,age:1},ctl:'age',
  text:'À toi : règle l’activité mesurée. L’âge se calcule, l’escalier le vérifie.'},
/* 30 */ {cle:'libby',beat:5,scene:'libby',tag:'1949 · Chicago',seq:[{p:{bars:1},d:2000}],
  text:()=>`Chicago, 1949. James Arnold et Willard Libby testent l’horloge sur des bois d’âge connu. Les plus anciens viennent des tombes des pharaons Djéser et Snéfrou, datées par les historiens. Le carbone 14 répond ${ent(LIBBY.c14[0])} ± ${LIBBY.c14[1]} ans : les intervalles se recouvrent, l’horloge marche. Libby reçoit le prix Nobel de chimie en 1960.`},
/* 31 */ {cle:'irhoud',beat:5,scene:'horloge',tag:'Jebel Irhoud · Maroc',set:{line:0,age:0,der:0,an:0,irh:0,xmax:40000},
  text:'Jebel Irhoud, près de Safi. En 2017, la revue <i>Nature</i> publie l’âge de fossiles d’<i>Homo sapiens</i> trouvés là : environ 315 000 ans, parmi les plus anciens connus. Le carbone 14 aurait-il pu les dater ?',
  pari:{reveal:[{p:{xmax:350000,irh:1},d:2400}],...BET([
    ['Oui, avec un meilleur détecteur',`Aucun détecteur ne compte des noyaux qui n’existent plus : regarde le calcul. ${IRH_FIN}`],
    ['Non : il n’en reste aucun noyau',`Exact : il n’y a plus rien à compter. ${IRH_FIN}`,1],
    ['Oui, mais très imprécis',`Il n’y a plus rien à mesurer, même mal : regarde le calcul. ${IRH_FIN}`]])}},
/* 32 */ {cle:'q1',beat:6,scene:'quiz',set:{qi:0,rv:0},
  text:'Trois questions, chacune sur un piège classique du bac. La première vient du QCM de 2023 : au bout de <i>t</i> = 2<i>t</i><sub>1/2</sub>, les noyaux désintégrés représentent, du nombre initial…',
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'25 %',fb:'Piège classique : 25 %, c’est ce qui RESTE (<i>N</i><sub>0</sub>/4). Les noyaux désintégrés, ce sont tous les autres : 75 %.'},
    {t:'50 %',fb:'La moitié se désintègre pendant la première demi-vie seulement. Après deux, il reste <i>N</i><sub>0</sub>/4 : 75 % se sont désintégrés.'},
    {t:'75 %',ok:true,fb:'Oui : il reste <i>N</i><sub>0</sub>/4 = 25 %, donc 75 % se sont désintégrés. Le sujet de 2023 proposait 25 % : c’était l’affirmation fausse.'}]}},
/* 33 */ {cle:'q2',beat:6,scene:'quiz',set:{qi:1,rv:0},
  text:'Un échantillon de radon 222 (<i>t</i><sub>1/2</sub> = 3,8 jours) existe déjà depuis 10 jours. Combien de temps faut-il encore pour que ses noyaux restants soient divisés par 2 ?',
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'Moins de 3,8 jours : il a déjà vieilli',fb:'Un noyau ne vieillit pas : à n’importe quel instant, il faut encore 3,8 jours pour perdre la moitié de ce qui reste.'},
    {t:'3,8 jours',ok:true,fb:'Oui : la demi-vie ne dépend ni de l’âge de l’échantillon, ni du nombre de noyaux.'},
    {t:'Plus de 3,8 jours : il ne reste que les plus résistants',fb:'Les survivants n’ont rien de spécial, comme le dé qui avait survécu à 10 lancers. Encore 3,8 jours.'}]}},
/* 34 */ {cle:'q3',beat:6,scene:'quiz',set:{qi:2,rv:0},
  text:'Un échantillon a une activité <i>A</i> = 8,0 × 10<sup>6</sup> Bq. Le nombre <i>N</i> de noyaux radioactifs qu’il contient vaut…',
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'8,0 × 10<sup>6</sup> noyaux',fb:'L’activité compte des désintégrations par seconde, pas des noyaux : <i>A</i> = λ<i>N</i>, donc <i>N</i> = <i>A</i>/λ, bien plus grand que <i>A</i>.'},
    {t:'<i>A</i> / λ',ok:true,fb:'Oui : <i>A</i> = λ<i>N</i>, donc <i>N</i> = <i>A</i>/λ, avec λ en s<sup>−1</sup> pour que <i>N</i> soit un nombre.'},
    {t:'λ × <i>A</i>',fb:'Vérifie les unités : λ<i>A</i> est en s<sup>−2</sup>, pas un nombre. <i>A</i> = λ<i>N</i>, donc <i>N</i> = <i>A</i>/λ.'}]}},
/* 35 */ {cle:'fin',beat:6,scene:'end',seq:[{p:{n:4},d:2800,w:300}],
  text:'Fin de la séance. Voici ce que l’application retiendrait de toi.',html:()=>profileHTML()}
];
const I=k=>STEPS.findIndex(s=>s.cle===k);

/* états de scène : chaque étape hérite de la précédente sur la même scène */
const S={ans:{},first:{},moveN0:false,moveF:false,ageMoved:false};
{const last={};STEPS.forEach((st,i)=>{st.id=i;const sc=scenes[st.scene];const prev=last[st.scene]||{...sc.defaults};st.base={...prev,...(st.set||{})};const f={...st.base};(st.seq||[]).forEach(x=>Object.assign(f,x.p));st.pre={...f};if(st.pari&&st.pari.reveal)st.pari.reveal.forEach(x=>Object.assign(f,x.p));if(st.after)Object.assign(f,st.after);last[st.scene]=f;});}

function juste(k){const i=I(k),j=S.first[i];return j==null?null:!!STEPS[i].pari.opts[j].juste;}
function pari10(){const j=S.first[I('pari10')];if(j==null)return '';
  if(STEPS[I('pari10')].pari.opts[j].juste)return 'Ton pari était le bon.';
  return j===0?'Le piège : à chaque tic, il part un sixième de ce qui RESTE, pas un sixième des 100 du début.':'Les dés partent vite au début, quand ils sont nombreux : la première dizaine de tics en emporte beaucoup.';}

function profileHTML(){
  const ids=[I('q1'),I('q2'),I('q3')],names=['désintégrés ou restants','la demi-vie ne dépend pas de l’âge','activité et nombre de noyaux'];
  const res=ids.map(id=>S.first[id]==null?null:!!STEPS[id].pari.opts[S.first[id]].ok);
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${names[i]}</li>`).join('');
  const weak=res.map((ok,i)=>ok===false?names[i]:null).filter(Boolean);
  const bets=[];
  const d=juste('duel');if(d!=null)bets.push(d?'tu savais déjà qu’un noyau ne vieillit pas':'l’idée du noyau qui « s’use » t’a tenté au départ');
  const m=juste('marche2');if(m!=null)bets.push(m?'la marche de même largeur t’a paru évidente':'la marche de même largeur t’a surpris');
  const t=juste('pari10');if(t!=null)bets.push(t?'tu as bien estimé tes 10 tics':'tes 10 tics t’ont surpris');
  if(S.moveN0)bets.push('tu as vérifié toi-même que la demi-vie ne dépend pas de N₀');
  const ir=juste('irhoud');if(ir!=null)bets.push(ir?'tu as vu tout de suite la limite du carbone 14':'la limite du carbone 14 t’a surpris');
  const plan=(weak.length?weak.map(w=>`<li>8 exercices courts sur « ${w} », du plus simple au niveau bac</li>`).join(''):'<li>Aucune erreur : on passe directement au niveau bac</li>')
    +'<li>1 exercice complet au format bac : l’iode 131 (sujet 2022) — lire la demi-vie sur la courbe, calculer <i>N</i><sub>0</sub>, trouver l’instant où 95 % des noyaux sont désintégrés</li><li>Dans 3 jours : 4 questions de rappel sur cette séance</li>';
  return ty(`<ul class="prof">${rows}</ul>${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}<div class="next"><div class="pari-k">Ta prochaine séance, générée pour toi</div><ol>${plan}</ol></div><p class="small">Aperçu de l’idée : la génération d’exercices n’est pas branchée dans ce prototype.</p>`);
}

/* ---------- contrôles par étape ---------- */
// Prendre la main : arrêter toute animation, poser la scène à l'état de l'étape, garder les clés tenues par l'élève.
function prendre(sc,keys){run++;const keep={};keys.forEach(k=>keep[k]=sc.p[k]);Object.assign(sc.p,STEPS[cur].pre,keep);}
let rolling=false;
function lancer(max,done){
  const sc=scenes.des;if(rolling){done&&done(false);return;}
  prendre(sc,['k']);const k=Math.round(sc.p.k);sc.p.k=k;sc.p.roll=0;
  if(k>=max){sc.render();hooks.frame&&hooks.frame();done&&done(false);return;}
  const my=run;rolling=true;
  const fin=()=>{rolling=false;sc.p.roll=0;sc.p.k=k+1;sc.render();hooks.frame&&hooks.frame();updateNav();done&&done(true);};
  if(RM.matches){fin();return;}
  sc.p.roll=1;const t0=performance.now();let last=0;
  const step=now=>{if(my!==run){rolling=false;sc.p.roll=0;done&&done(false);return;}
    if(now-last>70){sc.render();last=now;}
    if(now-t0<480)requestAnimationFrame(step);else fin();};
  requestAnimationFrame(step);
}
async function rafale(max){const at=cur;
  while(cur===at&&Math.round(scenes.des.p.k)<max){const ok=await new Promise(r=>lancer(max,r));if(!ok)break;await wait(140);}}
const CTL={
  tic:{html:st=>`<div class="ctl-btns"><button type="button" class="ctl-btn" id="tic">Lancer les dés</button>${st.tic>1?`<button type="button" class="ctl-btn alt" id="rafale">Lancer jusqu’au tic ${st.tic}</button>`:''}</div><p class="ctl-note" id="ticfb"></p>`,
    init(st){const sc=scenes.des,b=$('#tic'),r=$('#rafale'),fb=$('#ticfb');let lastH='';
      const sync=()=>{const k=Math.round(sc.p.k),fini=k>=st.tic,ae=document.activeElement;b.disabled=fini;if(r)r.disabled=fini;const h=ty(st.note(clamp(k,0,st.tic)));if(h!==lastH){fb.innerHTML=h;lastH=h;}
        // le dernier lancer désactive les deux boutons : le focus clavier passe à « Suivant », il ne reste pas sur un bouton éteint
        if(fini&&(ae===b||(r&&ae===r)))setTimeout(()=>{const n=$('#next');if(n&&!n.disabled)n.focus();},0);};
      b.addEventListener('click',()=>lancer(st.tic));
      if(r)r.addEventListener('click',()=>rafale(st.tic));
      hooks.frame=sync;hooks.lancer=()=>lancer(st.tic);sync();}},
  demi:{html:()=>`<div class="ctl"><label class="sl"><span>Nombre de dés au départ : <i>N</i><sub>0</sub> = <output id="on0"></output></span><input id="n0" type="range" min="100" max="1000" step="10"></label><div class="sl"><span id="facesl">Sorte de dé</span><div class="seg" role="group" aria-labelledby="facesl">${[6,10,20].map(f=>`<button type="button" data-f="${f}" aria-pressed="false">${f} faces</button>`).join('')}</div></div></div><p class="ctl-note" id="demifb"></p>`,
    init(){const sc=scenes.loi,n0=$('#n0'),fb=$('#demifb');let lastH='';
      const sync=()=>{const N0=Math.round(sc.p.N0),f=Math.round(sc.p.f),th=thDe(f);n0.value=N0;$('#on0').textContent=N0;
        root.querySelectorAll('.seg button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.f===f?'true':'false'));
        let m=`<i>N</i><sub>0</sub> = ${N0} : la moitié (${fr(N0/2,N0%2?1:0)}) est atteinte au bout de <b>${fr(th,2)} tics</b>.`;
        if(f!==6)m+=` Avec un dé à ${f} faces, la demi-vie change : elle dépend de la sorte de dé — pour un noyau, de la sorte de noyau.`;
        else if(S.moveN0)m+=' Comme avec 100 dés : la demi-vie ne dépend pas de <i>N</i><sub>0</sub>.';
        else m+=' Fais glisser <i>N</i><sub>0</sub> et regarde la marche.';
        const h=ty(m);if(h!==lastH){fb.innerHTML=h;lastH=h;}};
      n0.addEventListener('input',()=>{prendre(sc,['N0','f']);sc.p.N0=+n0.value;S.moveN0=true;sc.render();sync();});
      root.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{prendre(sc,['N0','f']);sc.p.f=+b.dataset.f;S.moveF=true;sc.render();sync();}));
      hooks.frame=sync;sync();}},
  age:{html:()=>`<div class="ctl"><label class="sl"><span>Activité mesurée : <i>A</i>/<i>A</i><sub>0</sub> = <output id="or"></output></span><input id="rr" type="range" min="1" max="99" step="1"></label></div><p class="ctl-note" id="agefb"></p>`,
    init(){const sc=scenes.horloge,rr=$('#rr'),fb=$('#agefb');let lastH='';
      const sync=()=>{const r=clamp(Math.round(sc.p.r),1,99),t=ageDe(r),q=Math.log2(100/r),n=Math.floor(q+1e-9);rr.value=r;$('#or').textContent=ty(`${r} %`);
        let m=`<i>A</i>/<i>A</i><sub>0</sub> = ${r} % : <i>t</i> ≈ <b>${ent(sig3(t))} ans</b>, `;
        m+=Math.abs(q-Math.round(q))<1e-9?`exactement ${Math.round(q)} demi-vie${Math.round(q)>1?'s':''}.`:n===0?'moins d’une demi-vie.':`entre ${n} et ${n+1} demi-vies.`;
        if(n>=5)m+=' Il reste peu de carbone 14 à compter : la mesure devient délicate (limite pratique : environ 50 000 ans).';
        const h=ty(m);if(h!==lastH){fb.innerHTML=h;lastH=h;}};
      rr.addEventListener('input',()=>{prendre(sc,['r']);sc.p.r=+rr.value;S.ageMoved=true;sc.render();sync();});
      hooks.frame=sync;sync();}}
};

/* ---------- moteur (commun avec logarithme-moteur.js) ---------- */
function tweenTo(sc,target,d,my){
  const from={...sc.p},keys=Object.keys(target).filter(k=>from[k]!==target[k]);
  if(!keys.length)return Promise.resolve();
  if(RM.matches)d=0;
  return new Promise(res=>{const t0=performance.now();
    const step=now=>{if(my!==run)return res();
      const t=d?Math.min(1,(now-t0)/d):1,k=ease(t);
      for(const key of keys){const a=from[key],b=target[key];sc.p[key]=(typeof a==='number'&&typeof b==='number')?lerp(a,b,k):b;}
      sc.render();hooks.frame&&hooks.frame();
      if(t<1)requestAnimationFrame(step);else res();};
    requestAnimationFrame(step);});
}
let cur=-1,curScene=null;
async function animate(sc,st,my,fresh){
  if(fresh)await wait(300);else await tweenTo(sc,st.base,st.d||750,my);
  for(const f of st.seq||[]){if(my!==run)return;if(f.w){await wait(f.w);if(my!==run)return;}await tweenTo(sc,f.p,f.d||900,my);}
  if(st.pari&&st.pari.reveal&&S.ans[st.id]!=null)for(const f of st.pari.reveal){if(my!==run)return;await tweenTo(sc,f.p,f.d||900,my);}
}
function go(i){
  i=clamp(i,0,STEPS.length-1);const st=STEPS[i],sc=scenes[st.scene],my=++run;rolling=false;
  for(const k in hooks)delete hooks[k];
  let fresh=false;
  if(curScene!==sc){if(curScene){curScene.g.style.opacity=0;curScene.g.setAttribute('class','scene');}sc.p={...st.base};sc.render();sc.g.style.opacity=1;sc.g.setAttribute('class','scene on');curScene=sc;fresh=true;}
  cur=i;renderPanel(st);updateChrome(st);
  animate(sc,st,my,fresh);speak(st);
}
function textOf(st){return typeof st.text==='function'?st.text():st.text;}
const texHTML=t=>`<div class="formula">${t.map(([x,alt])=>`<span class="m" data-display="1" data-tex="${esc(x)}">${esc(alt)}</span>`).join('')}</div>`;
function apresHTML(P){return P.apres?`${P.apres.tex?texHTML(P.apres.tex):''}${P.apres.html?ty(P.apres.html):''}`:'';}
function renderPanel(st){
  $('#kicker').textContent=`${String(st.beat+1).padStart(2,'0')} — ${BEATS[st.beat].name}`;
  let h=`<p class="say">${ty(textOf(st))}</p>`;
  if(st.tex)h+=texHTML(st.tex);
  if(st.html)h+=st.html();
  if(st.pari)h+=pariHTML(st)+`<div class="fb" id="fb"></div><div class="apres" id="apres">${S.ans[st.id]!=null?apresHTML(st.pari):''}</div>`;
  if(st.ctl)h+=CTL[st.ctl].html(st);
  if(!st.pari)h+='<div class="fb" id="fb"></div>';
  const body=$('#body');body.innerHTML=h;body.classList.remove('in');void body.offsetWidth;body.classList.add('in');
  $('#script').scrollTop=0;
  if(st.pari){wireOpts(st);if(S.ans[st.id]!=null)$('#fb').innerHTML=ty(st.pari.opts[S.ans[st.id]].fb||'');}
  if(st.ctl)CTL[st.ctl].init(st);
  renderMath(body);updateNav();
}
function isQuiz(P){return P.opts.some(o=>o.ok);}
function pariHTML(st){const P=st.pari,a=S.ans[st.id],q=isQuiz(P);
  return `<div class="pari"><div class="pari-k">${P.label||(q?'Réponds':'Ton pari')}</div><div class="opts">${P.opts.map((o,j)=>{let c='opt';if(a!=null){if(q){if(o.ok)c+=' ok';else if(a===j)c+=' ko';}else if(a===j)c+=' sel';}
    return `<button type="button" class="${c}" data-j="${j}"${a!=null&&!q?' disabled':''}><kbd>${j+1}</kbd><span>${ty(o.t)}</span></button>`;}).join('')}</div></div>`;}
function wireOpts(st){root.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>choose(st,+b.dataset.j)));}
function choose(st,j){
  const P=st.pari,q=isQuiz(P),first=S.ans[st.id]==null;
  if(!first&&!q)return;
  if(first)S.first[st.id]=j;S.ans[st.id]=j;
  root.querySelector('.pari').outerHTML=pariHTML(st);wireOpts(st);
  const btn=root.querySelector(`.opt[data-j="${j}"]`);if(btn&&!btn.disabled)btn.focus();else $('#next').focus();
  $('#fb').innerHTML=ty(P.opts[j].fb||'');
  if(first&&P.apres){const ap=$('#apres');ap.innerHTML=apresHTML(P);renderMath(ap);}
  if(first&&P.reveal){const my=++run,sc=scenes[st.scene];(async()=>{const fr0=[{p:{...st.pre,...P.reveal[0].p},d:P.reveal[0].d},...P.reveal.slice(1)];for(const f of fr0){if(my!==run)return;await tweenTo(sc,f.p,f.d||900,my);}})();}
  updateNav();say(plain(P.opts[j].fb||''));
}
function updateNav(){const st=STEPS[cur],n=$('#next'),bet=!!(st.pari&&S.ans[st.id]==null),need=!!(st.need&&!st.need());
  n.disabled=bet||need;n.textContent=cur===STEPS.length-1?'Recommencer':bet?'Choisis d’abord':need?'Lance d’abord':'Suivant →';
  $('#prev').disabled=cur===0;$('#count').textContent=`étape ${cur+1} / ${STEPS.length}`;}
function next(){if($('#next').disabled)return;if(cur===STEPS.length-1){S.ans={};S.first={};S.moveN0=S.moveF=S.ageMoved=false;go(0);}else go(cur+1);}
// les étapes à geste : « Suivant » attend que l'élève ait lancé ses dés
STEPS.forEach(st=>{if(st.ctl==='tic')st.need=()=>Math.round(scenes.des.p.k)>=st.tic&&!rolling;});

/* chapitres */
const beatEls=BEATS.map((b,k)=>{const n=STEPS.filter(s=>s.beat===k).length,btn=document.createElement('button');btn.type='button';btn.className='beat';btn.style.setProperty('--n',n);btn.innerHTML=`<span>${b.name}</span><i><b></b></i>`;btn.addEventListener('click',()=>go(STEPS.findIndex(s=>s.beat===k)));$('#beats').appendChild(btn);return btn;});
function updateChrome(st){
  BEATS.forEach((b,k)=>{const steps=STEPS.filter(s=>s.beat===k),f=steps[0].id,done=clamp((cur-f+1)/steps.length,0,1);beatEls[k].querySelector('b').style.width=(done*100)+'%';beatEls[k].classList.toggle('on',k===st.beat);if(k===st.beat)beatEls[k].setAttribute('aria-current','step');else beatEls[k].removeAttribute('aria-current');});
  const pl=$('#plaque');if(st.tag){pl.textContent=st.tag;pl.classList.add('on');}else pl.classList.remove('on');
}

/* maths : KaTeX (déjà chargé par l'app) */
const renderMath=function(r){r.querySelectorAll('.m[data-tex]:not([data-done])').forEach(n=>{try{katex.render(n.dataset.tex,n,{displayMode:n.dataset.display==='1',throwOnError:false});n.dataset.done='1';}catch(e){}});};

/* voix */
let voiceOn=false;
function plain(h){return String(h).replace(/<sub>1\/2<\/sub>/g,' un demi').replace(/<sub>0<\/sub>/g,' zéro').replace(/<[^>]+>/g,'').replace(/\u202F|\u00A0/g,' ').replace(/×/g,' fois ').replace(/≈/g,' environ ').replace(/→/g,', ').replace(/−/g,'moins ').replace(/λ/g,' lambda ').replace(/τ/g,' tau ').replace(/ %/g,' pour cent');}
function say(t){if(!voiceOn||!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';const vs=speechSynthesis.getVoices();const v=vs.find(v=>/^fr/i.test(v.lang)&&/Google|Amélie|Thomas|Audrey|Marie|Denise|Henri/i.test(v.name))||vs.find(v=>/^fr/i.test(v.lang));if(v)u.voice=v;speechSynthesis.speak(u);}
function speak(st){say(st.say?(typeof st.say==='function'?st.say():st.say):plain(ty(textOf(st))));}
$('#voice').addEventListener('click',e=>{voiceOn=!voiceOn;e.currentTarget.setAttribute('aria-pressed',voiceOn);if(voiceOn)speak(STEPS[cur]);else if('speechSynthesis' in window)speechSynthesis.cancel();});

$('#why').addEventListener('click',()=>$('#whyd').showModal());
$('#next').addEventListener('click',next);$('#prev').addEventListener('click',()=>go(cur-1));
const surTouche=e=>{
  if($('#whyd').open)return;const t=e.target;if(t.tagName==='INPUT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const st=STEPS[cur];
  if(st&&st.pari&&/^[1-3]$/.test(e.key)&&+e.key<=st.pari.opts.length){e.preventDefault();choose(st,+e.key-1);return;}
  if(st&&st.ctl==='tic'&&(e.key==='l'||e.key==='L')&&hooks.lancer){e.preventDefault();hooks.lancer();return;}
  if(e.key==='ArrowRight'||e.key==='PageDown'||(e.key===' '&&t.tagName!=='BUTTON')){e.preventDefault();next();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(cur-1);}
};
window.addEventListener('keydown',surTouche);
go(0);
return function demonter(){run++;rolling=false;window.removeEventListener('keydown',surTouche);if('speechSynthesis' in window)speechSynthesis.cancel();};
}
