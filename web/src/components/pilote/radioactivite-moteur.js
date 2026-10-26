/* eslint-disable */
// @ts-nocheck
/**
 * Leçon pilote « La décroissance radioactive », deuxième version (refonte
 * 2026-10, retours du propriétaire du 2026-10-26 : docs/refonte/04-retours-pilotes.md).
 *
 * Neuf parties, chacune finie par une question « Vérifie » : l'énigme de
 * Becquerel (jusqu'au noyau et à la désintégration), les cent dés, le dé sans
 * mémoire, la courbe, la demi-vie, la formule, les grandeurs (t½, τ, activité),
 * le carbone 14 et ses limites, puis le quiz. Les scènes et le script vivent
 * ici ; le déroulé, le panneau, les paris, les fiches de mots, les dérivations
 * et la voix vivent dans `noyau.js`.
 *
 * Ce qui reste local à ce fichier (le noyau n'a pas à le connaître) :
 *   - les lancers de dés de l'élève (`lancer`, `rafale`, touche L), avec
 *     l'animation où les dés tombés sur 6 rougissent puis quittent la grille ;
 *   - `need` : « Suivant » reste fermé tant que l'élève n'a pas lancé ses dés
 *     (le noyau lit `need` mais ne rafraîchit pas le bouton après un geste :
 *     `majSuivant` le fait ici) ;
 *   - `juste` sur une option de PARI : l'écran reste neutre, seul le profil de
 *     fin s'en sert (une option `ok`, elle, ferait un quiz).
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
import { monterLecon } from "./noyau";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,lerp,clamp,show,scene,scenes,hooks,S,wait,RM,defs}=ctx;
const $=ctx.$;

/* ---------- outils propres à la physique ---------- */
const NB=' ';
const grp=s=>s.replace(/\B(?=(\d{3})+(?!\d))/g,NB);
function fr(x,d=2){const s=Math.abs(x).toFixed(d),p=s.split('.');return (x<0&&Number(s)!==0?'−':'')+(p[0].length>=4?grp(p[0]):p[0])+(p[1]?','+p[1]:'');}
const ent=x=>fr(x,0);
const sig3=x=>Number(x.toPrecision(3));
const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};
const sup=n=>String(n).split('').map(c=>SUP[c]||c).join('');
function sci(x,d=1){if(!x)return '0';let e=Math.floor(Math.log10(Math.abs(x))),m=Number((x/10**e).toFixed(d));if(Math.abs(m)>=10){m/=10;e++;}return `${fr(m,d)} × 10${sup(e)}`;}
const ty=s=>ctx.ty(s).replace(/ %/g,NB+'%');
const tx=String.raw;                                              // formules : les barres obliques restent lisibles
const TN=(x,d=0)=>fr(x,d).replace(',','{,}').replace(/\u202F/g,'\\,');   // un nombre pour KaTeX
const TS=(x,d=1)=>{if(!x)return '0';let e=Math.floor(Math.log10(Math.abs(x))),m=Number((x/10**e).toFixed(d));if(Math.abs(m)>=10){m/=10;e++;}return `${TN(m,d)}\\times10^{${e}}`;};   // 2,8 × 10^{-17} pour KaTeX
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

[['rarw','s-dim'],['rarwA','s-a']].forEach(([id,c])=>{const mk=E('marker',{id,viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'7',markerHeight:'7',orient:'auto-start-reverse'},defs);E('path',{d:'M0 0L10 5L0 10z',class:c},mk);});
E('rect',{x:100,y:110,width:830,height:490},E('clipPath',{id:'rclip-loi'},defs));

/* ---------- le hasard, tiré une fois pour toutes ---------- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let qg=null;try{qg=new URLSearchParams(location.search).get('graine');}catch(e){}
const GRAINE=/^\d{1,9}$/.test(qg||'')?+qg:(Math.random()*2147483647)>>>0;
root.dataset.graine=String(GRAINE);
const rng=mulberry32(GRAINE);
const DE=6,ND=100,KMAX=20,TV=10;                                  // faces du dé, dés, tics, lancers du survivant
// les 100 dés de l'élève : face de chaque dé à chaque tic ; dTic = tic de son premier 6
const face=[[]],dTic=new Array(ND).fill(Infinity);
for(let i=0;i<ND;i++)face[0][i]=1+Math.floor(rng()*(DE-1));
for(let k=1;k<=KMAX;k++){face[k]=[];for(let i=0;i<ND;i++){if(dTic[i]<k){face[k][i]=0;continue;}const f=1+Math.floor(rng()*DE);face[k][i]=f;if(f===DE)dTic[i]=k;}}
const NK=[];for(let k=0;k<=KMAX;k++)NK[k]=dTic.filter(t=>t>k).length;
const DK=[0];for(let k=1;k<=KMAX;k++)DK[k]=NK[k-1]-NK[k];
// d'autres séries : un tirage par dé (le tic de son premier 6, loi géométrique de paramètre 1/6)
function serie(n){const c=new Array(KMAX+1).fill(0);for(let i=0;i<n;i++){const k=Math.max(1,Math.ceil(Math.log(1-rng())/Math.log((DE-1)/DE)));for(let j=0;j<Math.min(k,KMAX+1);j++)c[j]++;}return c;}
const AUTRES=[];for(let s=0;s<9;s++)AUTRES.push(serie(100));
const GRANDES=[];for(let s=0;s<10;s++)GRANDES.push(serie(10000).map(n=>n/100));
// le dé « survivant » : encore en jeu au tic TV, le plus près du centre de la grille
const VET=(()=>{let b=-1,bd=1e9;for(let i=0;i<ND;i++)if(dTic[i]>TV){const d=(Math.floor(i/10)-4.5)**2+(i%10-4.5)**2;if(d<bd){bd=d;b=i;}}return b;})();
// son histoire : la face de chacun de ses TV lancers (aucune n'est un 6) ; le dé neuf montre une AUTRE face
const HIST=VET>=0?Array.from({length:TV},(_,j)=>face[j+1][VET]):[];
const F_VET=VET>=0?face[TV][VET]:3, F_NEUF=(F_VET+1)%(DE-1)+1;

/* ---------- constantes physiques (sources en tête de fichier) ---------- */
const R5=(DE-1)/DE;                                              // part des dés qui restent à chaque tic
const EK=k=>ND*R5**k;                                            // nombre MOYEN de dés restants au tic k
const LAMD=Math.log(DE/(DE-1)), TH=Math.log(2)/LAMD, TAU=1/LAMD;  // dés à 6 faces, par tic
const L20=Math.log(20/19);                                       // dé à 20 faces
const thDe=f=>Math.log(2)/Math.log(f/(f-1));
const T14=5730, NA=6.02e23;
const N_U=1e-3/238*NA;                    // noyaux dans 1 mg d'uranium 238
const C14_PART=1.2e-12;                   // part du carbone 14 dans le carbone de l'air
const N_C14_1G=C14_PART*NA/12;            // noyaux de carbone 14 dans 1 g de carbone vivant
const IRHOUD=315000, LIM14=50000;
const ageDe=r=>T14/Math.log(2)*Math.log(100/r);
const AGE30=ageDe(30);
const IRH_DV=IRHOUD/T14, IRH_FRAC=2**(-IRH_DV), IRH_RESTE=N_C14_1G*IRH_FRAC;
const RUTH=[[0,1],[28,.69],[62,.51],[118,.23],[155,.14],[210,.067],[272,.041],[360,.018]];
const LIBBY={snef:[4575,75],djos:[4650,75],c14:[4750,250]};
const PARIS10=[2,16,42], J10=PARIS10.reduce((b,v,i,a)=>Math.abs(v-EK(TV))<Math.abs(a[b]-EK(TV))?i:b,0);
const C_P=6, C_N14=8, C_N12=6;            // carbone : 6 protons ; 8 neutrons (carbone 14), 6 (carbone 12)
const frR=v=>String(v).replace('.',',');

/* ---------- des dés ---------- */
const PIP=[[.25,.25],[.75,.25],[.25,.5],[.75,.5],[.25,.75],[.75,.75],[.5,.5]];
const FACES={1:[6],2:[0,5],3:[0,6,5],4:[0,1,4,5],5:[0,1,4,5,6],6:[0,1,2,3,4,5]};
function mkDie(parent,x,y,s,r){const g=E('g',{},parent);const rect=E('rect',{x,y,width:s,height:s,rx:(s*.16).toFixed(1),class:'die'},g);const pips=PIP.map(([a,b])=>E('circle',{cx:x+a*s,cy:y+b*s,r,class:'pip'},g));return {g,rect,pips,f:-1,c:null,l:0,cx:x+s/2,cy:y+s/2};}
function setDie(d,f,cls){if(d.f!==f){const on=FACES[f]||[];d.pips.forEach((p,j)=>p.style.opacity=on.includes(j)?1:0);d.f=f;}if(d.c!==cls){d.g.setAttribute('class',cls?'die-'+cls:'');d.c=cls;}}
// un dé tombé sur 6 quitte la grille : il tombe un peu, rapetisse et s'efface (v = 0 → 1)
function leaveDie(d,v){if(d.l===v)return;d.l=v;
  if(!v){d.g.removeAttribute('transform');d.g.style.opacity='';return;}
  const k=ctx.ease(v);d.g.setAttribute('transform',`translate(${d.cx} ${(d.cy+30*k).toFixed(1)}) rotate(${(14*k).toFixed(1)}) scale(${(1-.45*k).toFixed(3)}) translate(${-d.cx} ${-d.cy})`);d.g.style.opacity=(1-.86*k).toFixed(3);}
// un noyau dessiné en tournesol : protons (pleins) et neutrons (creux) mêlés
function noyau(parent,cx,cy,R,nP,nN,rho){
  const n=nP+nN,isP=new Array(n).fill(false),pts=[];
  for(let j=0;j<nP;j++)isP[Math.min(n-1,Math.floor((j+.5)*n/nP))]=true;
  for(let i=0;i<n;i++){const r=R*Math.sqrt((i+.5)/n),a=i*2.399963,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
    pts.push({x,y,p:isP[i],c:E('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:rho,class:isP[i]?'prot':'neut','stroke-width':2},parent)});}
  return pts;
}
function noyauHTML(cx,cy,R,nP,nN,rho){
  const n=nP+nN,isP=new Array(n).fill(false);let h='';
  for(let j=0;j<nP;j++)isP[Math.min(n-1,Math.floor((j+.5)*n/nP))]=true;
  for(let i=0;i<n;i++){const r=R*Math.sqrt((i+.5)/n),a=i*2.399963;h+=`<circle cx="${(cx+r*Math.cos(a)).toFixed(1)}" cy="${(cy+r*Math.sin(a)).toFixed(1)}" r="${rho}" class="${isP[i]?'prot':'neut'}" stroke-width="1.4"/>`;}
  return h;
}

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

/* ---------- 1b. l'atome, son noyau, la désintégration, les isotopes ---------- */
scene('atome',{
  p:{atom:0,zoom:0,emit:0,iso:0},
  build(g){
    const CX=500,CY=350;this.CX=CX;this.CY=CY;
    this.capAtom=E('text',{x:CX,y:104,class:'t-big2 s-ink','text-anchor':'middle',text:'un atome de carbone'},g);
    // le cortège d'électrons : 2 sur la première couche, 4 sur la seconde
    this.ag=E('g',{},g);
    [92,170].forEach(r=>E('circle',{cx:CX,cy:CY,r,class:'k-line nofill','stroke-width':2},this.ag));
    [[92,.3],[92,.3+Math.PI],[170,.9],[170,.9+Math.PI/2],[170,.9+Math.PI],[170,.9+1.5*Math.PI]].forEach(([r,a])=>E('circle',{cx:(CX+r*Math.cos(a)).toFixed(1),cy:(CY+r*Math.sin(a)).toFixed(1),r:9,class:'elec'},this.ag));
    E('line',{x1:CX-60,y1:CY-52,x2:CX-12,y2:CY-8,class:'k-dim','stroke-width':1.5},this.ag);
    E('text',{x:CX-66,y:CY-58,class:'t-lab2 s-ink','text-anchor':'end',text:'noyau'},this.ag);
    E('line',{x1:CX+105,y1:CY+133,x2:CX+168,y2:CY+176,class:'k-dim','stroke-width':1.5},this.ag);
    E('text',{x:CX+174,y:CY+190,class:'t-lab2 s-ink',text:'électrons'},this.ag);
    // le noyau : 6 protons + 8 neutrons (carbone 14), dessiné en grand puis réduit à l'échelle de l'atome
    this.ng=E('g',{},g);
    this.parts=noyau(this.ng,CX,CY,104,C_P,C_N14,24.5);
    this.jn=(()=>{let b=-1,bx=-1e9;this.parts.forEach((q,i)=>{if(!q.p&&q.x>bx){bx=q.x;b=i;}});return b;})();
    this.ring=E('circle',{cx:this.parts[this.jn].x.toFixed(1),cy:this.parts[this.jn].y.toFixed(1),r:36,class:'k-a nofill','stroke-width':3},g);
    this.trail=E('line',{class:'k-a','stroke-width':2.5,'stroke-dasharray':'3 7','stroke-linecap':'round'},g);
    this.elec=E('circle',{r:10,class:'s-a'},g);
    this.capNuc=E('text',{x:CX,y:104,class:'t-big2 s-ink','text-anchor':'middle',text:ty(`carbone 14 : ${C_P} protons + ${C_N14} neutrons`)},g);
    this.capEmit=E('text',{x:CX,y:104,class:'t-big2 s-ink','text-anchor':'middle',text:ty(`azote 14 : ${C_P+1} protons + ${C_N14-1} neutrons`)},g);
    this.labFlip=E('text',{x:CX,y:512,class:'t-lab2 s-a','text-anchor':'middle',text:'un neutron devient un proton'},g);
    this.labElec=E('text',{x:960,y:250,class:'t-lab2 s-a','text-anchor':'end',text:'électron expulsé : le rayonnement'},g);
    this.leg=E('g',{},g);
    E('circle',{cx:150,cy:650,r:12,class:'prot','stroke-width':1.6},this.leg);E('text',{x:172,y:656,class:'t-lab s-ink',text:'proton : charge +'},this.leg);
    E('circle',{cx:430,cy:650,r:12,class:'neut','stroke-width':1.6},this.leg);E('text',{x:452,y:656,class:'t-lab s-ink',text:'neutron : sans charge'},this.leg);
    // les deux isotopes du carbone, côte à côte
    this.isoG=E('g',{},g);
    E('text',{x:CX,y:104,class:'t-big2 s-ink','text-anchor':'middle',text:'deux isotopes du carbone'},this.isoG);
    noyau(this.isoG,270,330,84,C_P,C_N12,19.5);noyau(this.isoG,730,330,84,C_P,C_N14,19.5);
    [[270,'carbone 12','stable',C_N12],[730,'carbone 14','radioactif',C_N14]].forEach(([x,nom,etat,nn])=>{
      E('text',{x,y:462,class:'t-big2 s-ink','text-anchor':'middle',text:nom},this.isoG);
      E('text',{x,y:496,class:nom==='carbone 14'?'t-lab2 s-a':'t-lab2 s-dim','text-anchor':'middle',text:etat},this.isoG);
      E('text',{x,y:530,class:'t-lab s-ink','text-anchor':'middle',text:ty(`${C_P} protons · ${nn} neutrons`)},this.isoG);});
    this.isoN=E('text',{x:CX,y:612,class:'t-lab2 s-a','text-anchor':'middle',text:ty(`mêmes ${C_P} protons : même élément ; ${C_N14-C_N12} neutrons de plus`)},this.isoG);
  },
  render(){const p=this.p,z=ctx.ease(clamp(p.zoom,0,1)),s=lerp(.135,1,z),CX=this.CX,CY=this.CY,e=p.emit,k=1-p.iso;
    show(this.capAtom,p.atom*(1-z)*k);show(this.ag,p.atom*(1-z)*k);
    this.ng.setAttribute('transform',`translate(${CX} ${CY}) scale(${s.toFixed(3)}) translate(${-CX} ${-CY})`);
    const sw=(2.2/s).toFixed(2),flip=e>=.5;
    this.parts.forEach((q,i)=>{q.c.setAttribute('stroke-width',sw);q.c.setAttribute('class',(q.p||(i===this.jn&&flip))?'prot':'neut');});
    show(this.ng,p.atom*k);
    // l'émission : le neutron s'entoure, devient proton, puis l'électron part
    show(this.ring,clamp(e*5,0,1)*(1-clamp((e-.5)*5,0,1))*z*k);
    const t=ctx.ease(clamp((e-.5)*2,0,1)),q=this.parts[this.jn],ex=lerp(q.x,930,t),ey=lerp(q.y,300,t);
    this.elec.setAttribute('cx',ex.toFixed(1));this.elec.setAttribute('cy',ey.toFixed(1));
    this.trail.setAttribute('x1',q.x.toFixed(1));this.trail.setAttribute('y1',q.y.toFixed(1));this.trail.setAttribute('x2',ex.toFixed(1));this.trail.setAttribute('y2',ey.toFixed(1));
    show(this.elec,(e>.5?1:0)*k);show(this.trail,clamp((e-.5)*4,0,1)*k);
    const nuc=z*k*(1-clamp((e-.3)*5,0,1)),em=z*k*clamp((e-.4)*4,0,1);
    show(this.capNuc,nuc);show(this.capEmit,em);
    show(this.labFlip,(flip?1:0)*z*k);show(this.labElec,clamp((e-.8)*5,0,1)*k);
    show(this.leg,z*k);
    show(this.isoG,p.iso);
  }
});

/* ---------- 2. cent dés, et le graphe de l'élève ---------- */
const GX=k=>540+20*k, GY=v=>520-3.6*v;
scene('des',{
  p:{dice:0,k:0,roll:0,leave:1,graph:0,duel:0,duelRv:0,others:0,big:0,law:0},
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
    this.law=E('path',{d:courbe(k=>ND*R5**k,0,20,GX,GY),class:'k-ink nofill','stroke-width':3.2,pathLength:1000,'stroke-dasharray':'1000 1000'},this.gr);
    this.lawL=E('text',{x:GX(10.5),y:GY(ND*R5**10.5)-26,class:'t-lab2 s-ink halo',text:'la loi de la population'},this.gr);
    this.myL=E('polyline',{class:'k-a nofill','stroke-width':1.5},this.gr);
    this.my=NK.map((n,j)=>E('circle',{cx:GX(j),cy:GY(n).toFixed(1),r:5,class:'s-a'},this.gr));
    this.myT=E('text',{class:'t-lab2 s-a halo'},this.gr);
    this.legO=E('text',{x:950,y:186,class:'t-lab s-dim','text-anchor':'end',text:'en gris : 9 autres séries de 100 dés'},this.gr);
    this.legB=E('text',{x:950,y:212,class:'t-lab s-ink','text-anchor':'end',text:'traits noirs : 10 séries de 10 000 dés'},this.gr);
    // le duel : le survivant (10 lancers sans 6) contre un dé neuf, deux dés visiblement différents
    this.du=E('g',{},g);
    const SX=532,FX=808,DS=100,DY=176;
    this.dOld=mkDie(this.du,SX,DY,DS,9);this.dNew=mkDie(this.du,FX,DY,DS,9);
    E('rect',{x:SX-9,y:DY-9,width:DS+18,height:DS+18,rx:20,class:'k-a nofill','stroke-width':3},this.du);
    E('text',{x:SX+DS/2,y:DY-28,class:'t-lab2 s-a','text-anchor':'middle',text:'le survivant'},this.du);
    E('text',{x:FX+DS/2,y:DY-28,class:'t-lab2 s-ink','text-anchor':'middle',text:'un dé neuf'},this.du);
    E('text',{x:SX+DS/2,y:DY+DS+34,class:'t-lab s-dim','text-anchor':'middle',text:'encadré dans la grille'},this.du);
    E('text',{x:FX+DS/2,y:DY+DS+34,class:'t-lab s-dim','text-anchor':'middle',text:'jamais lancé'},this.du);
    this.dQ=E('text',{x:(SX+FX+DS)/2,y:DY+DS/2+22,class:'t-huge s-dim','text-anchor':'middle',text:'?'},this.du);
    E('text',{x:SX-9,y:356,class:'t-lab2 s-ink',text:`ses ${TV} lancers`},this.du);
    this.hist=HIST.map((f,j)=>{const x=SX-9+j*42,d=mkDie(this.du,x,370,34,3.2);setDie(d,f,'');E('text',{x:x+17,y:424,class:'t-tiny s-dim','text-anchor':'middle',text:String(j+1)},this.du);return d;});
    E('text',{x:SX-9,y:458,class:'t-lab s-ink',text:ty(`${TV} lancers, aucun 6 :`)},this.du);
    E('text',{x:SX-9,y:482,class:'t-lab s-ink',text:'voilà pourquoi il est encore là.'},this.du);
    this.dR=E('g',{},this.du);
    E('text',{x:(SX+FX+DS)/2,y:548,class:'t-big2 s-a','text-anchor':'middle',text:`1 chance sur ${DE} — pour chacun`},this.dR);
    E('text',{x:(SX+FX+DS)/2,y:584,class:'t-lab s-dim','text-anchor':'middle',text:'au prochain lancer, quel que soit son passé'},this.dR);
    setDie(this.dOld,F_VET,'');setDie(this.dNew,F_NEUF,'');
  },
  render(){const p=this.p,kk=clamp(Math.floor(p.k+1e-6),0,KMAX),lv=clamp(p.leave,0,1);
    show(this.grid,p.dice);show(this.cap,p.dice);
    this.left.setAttribute('transform',`translate(${(250*(1-Math.max(p.graph,p.duel))).toFixed(1)} 0)`);
    for(let i=0;i<ND;i++){const d=this.dice[i],t=dTic[i];let l=0;
      if(p.roll){if(t<=kk)setDie(d,0,'out');else setDie(d,1+Math.floor(Math.random()*DE),'');}
      else if(t<kk)setDie(d,0,'out');
      else if(t===kk&&kk>0){if(lv>=1)setDie(d,0,'out');else{setDie(d,DE,'six');l=lv;}}   // les 6 rougissent, puis quittent la grille
      else setDie(d,face[kk][i],'');
      leaveDie(d,l);}
    this.cnt.textContent=ty(`il reste ${NK[kk]} dé${NK[kk]>1?'s':''} sur ${ND}`);show(this.cnt,p.dice);
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

/* ---------- 2b. cent dés, tic par tic : ce que le hasard donne en moyenne ---------- */
scene('comptes',{
  p:{n:0,cap:0,lin:0},
  build(g){
    const BX=k=>116+76*k,BW=54,B0=540,H=4;this.BX=BX;this.BW=BW;this.B0=B0;this.H=H;
    E('rect',{x:116,y:86,width:22,height:22,class:'f-b k-ink','stroke-width':1.5},g);
    E('text',{x:148,y:104,class:'t-lab s-ink',text:'cinq sixièmes : ils restent'},g);
    E('rect',{x:440,y:86,width:22,height:22,class:'f-a k-a','stroke-width':1.5},g);
    E('text',{x:472,y:104,class:'t-lab s-a',text:'un sixième : il part au tic suivant'},g);
    E('line',{x1:BX(0)-20,x2:BX(10)+BW+20,y1:B0,y2:B0,class:'k-dim','stroke-width':1.5},g);
    E('text',{x:BX(0)-14,y:B0+26,class:'t-tick s-dim','text-anchor':'end',text:'tic'},g);
    E('text',{x:BX(0)-14,y:B0+58,class:'t-tick s-a','text-anchor':'end',text:'partent'},g);
    this.bars=[];
    for(let k=0;k<=10;k++){const gk=E('g',{},g),h=H*EK(k),hc=h/DE;
      E('rect',{x:BX(k),y:B0-(h-hc),width:BW,height:h-hc,class:'f-b k-ink','stroke-width':1.5},gk);
      const cap=E('rect',{x:BX(k),y:B0-h,width:BW,height:hc,class:'f-a k-a','stroke-width':1.5},gk);
      E('text',{x:BX(k)+BW/2,y:B0-h-10,class:'t-lab2 s-ink halo','text-anchor':'middle',text:ent(Math.round(EK(k)))},gk);
      E('text',{x:BX(k)+BW/2,y:B0+26,class:'t-tick s-ink','text-anchor':'middle',text:String(k)},gk);
      const lost=E('text',{x:BX(k)+BW/2,y:B0+58,class:'t-lab s-a','text-anchor':'middle',text:'−'+ent(Math.round(EK(k)/DE))},gk);
      this.bars.push({g:gk,cap,lost});}
    // « si chaque tic enlevait toujours un sixième des 100 du départ » : une droite qui touche zéro au tic DE
    this.lin=E('g',{},g);
    this.linP=E('polyline',{class:'k-c nofill','stroke-width':3,'stroke-dasharray':'9 7'},this.lin);
    this.linD=[...Array(DE+1)].map((_,k)=>E('circle',{cx:BX(k)+BW/2,cy:B0-H*(ND-ND/DE*k),r:6,class:'s-c'},this.lin));
    this.linL=[...Array(DE+1)].map((_,k)=>k>=3?E('text',{x:BX(k)+BW/2+10,y:B0-H*(ND-ND/DE*k)-8,class:'t-lab2 s-c halo',text:ent(ND-ND/DE*k)},this.lin):null);
    this.linT1=E('text',{x:520,y:196,class:'t-lab2 s-c',text:ty(`si chaque tic enlevait toujours ${ent(Math.round(ND/DE))} dés`)},this.lin);
    this.linT2=E('text',{x:520,y:224,class:'t-lab2 s-c',text:ty(`(un sixième de ${ND}), il n’en resterait`)},this.lin);
    this.linT3=E('text',{x:520,y:252,class:'t-lab2 s-c',text:ty(`plus aucun au tic ${DE}.`)},this.lin);
  },
  render(){const p=this.p,BX=this.BX,BW=this.BW,B0=this.B0,H=this.H;
    this.bars.forEach((b,k)=>{const o=clamp(p.n-k,0,1);b.g.style.opacity=o;b.g.setAttribute('transform',`translate(0 ${((1-o)*14).toFixed(1)})`);b.cap.style.opacity=p.cap;b.lost.style.opacity=p.cap;});
    const s=clamp(p.lin,0,1)*DE,pts=[];
    for(let k=0;k<=Math.floor(s+1e-9);k++)pts.push(`${BX(k)+BW/2},${B0-H*(ND-ND/DE*k)}`);
    if(s%1>1e-6&&s<DE){const k=Math.floor(s);pts.push(`${BX(k)+BW/2+(s-k)*(BX(1)-BX(0))},${B0-H*(ND-ND/DE*s)}`);}
    this.linP.setAttribute('points',pts.join(' '));
    const on=clamp(p.lin*20,0,1);this.linD.forEach((c,k)=>show(c,clamp(s-k+.5,0,1)*on));this.linL.forEach((t,k)=>{if(t)show(t,clamp(s-k+.5,0,1)*on);});
    show(this.linT1,clamp(p.lin*3-.5,0,1));show(this.linT2,clamp(p.lin*3-.5,0,1));show(this.linT3,clamp(p.lin*3-.5,0,1));
  }
});

/* ---------- 2c. l'âge ne compte pas : la chance de faire 6 selon l'âge ---------- */
scene('age',{
  p:{flat:0,pts:0,use:0},
  build(g){
    const X=a=>140+37*a,Y=v=>580-9*v;this.X=X;this.Y=Y;
    axes(E('g',{},g),X,Y,20,50,5,10,v=>String(v),v=>String(v),'âge','chance de faire 6 au prochain lancer, en %');
    E('text',{x:X(10),y:Y(0)+62,class:'t-lab s-dim','text-anchor':'middle',text:'âge du dé : nombre de lancers déjà faits'},g);
    const c=100/DE;
    this.use=E('g',{},g);
    this.useP=E('path',{d:`M${X(0)} ${Y(c)}Q${X(12)} ${Y(c)} ${X(20)} ${Y(50)}`,class:'k-c nofill','stroke-width':3,'stroke-dasharray':'9 7'},this.use);
    E('text',{x:X(15),y:Y(47),class:'t-lab2 s-c halo','text-anchor':'end',text:'si les dés s’usaient'},this.use);
    this.flat=E('line',{x1:X(0),x2:X(20),y1:Y(c),y2:Y(c),class:'k-ink','stroke-width':4,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.flatL=E('text',{x:X(20)-4,y:Y(c)+34,class:'t-lab2 s-ink halo','text-anchor':'end',text:ty(`1 chance sur ${DE} ≈ ${fr(c,1)} %, à tout âge`)},g);
    this.pts=E('g',{},g);
    [[0,'dé neuf','start'],[TV,'le survivant','middle']].forEach(([a,t,an])=>{E('circle',{cx:X(a),cy:Y(c),r:10,class:'s-a'},this.pts);E('text',{x:X(a)+(a?0:14),y:Y(c)-24,class:'t-lab2 s-a halo','text-anchor':an,text:t},this.pts);});
  },
  render(){const p=this.p;
    this.flat.style.strokeDashoffset=1000*(1-p.flat);show(this.flatL,clamp(p.flat*2-1,0,1));
    show(this.pts,p.pts);show(this.use,p.use);
  }
});

/* ---------- 3. la loi : escalier, curseurs, formules, activité ---------- */
scene('loi',{
  p:{xmax:20,ymax:100,N0:100,f:6,curve:1,run:0,st1:0,st2:0,st3:0,st4:0,stSym:0,tk:0,eq:0,eqs:'',eqs2:'',f20:0,dbl:0,th:0,tan:0,bars:0,demi:0},
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
    this.cv2=E('path',{class:'k-c nofill','stroke-width':2.5,'stroke-dasharray':'9 7'},this.clip);
    this.cv2L=fx(g,0,0,'λ doublé :','t-lab2 s-c',20);this.cv2M=fx(g,0,0,'*t*_{1/2} ÷ 2','t-lab2 s-c',20);
    this.cv6L=fx(g,0,0,`dé à 6 faces : λ ≈ ${fr(LAMD,3)} par tic`,'t-lab2 s-ink halo',20);
    this.stairs=[1,2,3,4].map(()=>{const sg=E('g',{},g);return {g:sg,
      h:E('line',{class:'k-a','stroke-dasharray':'5 6','stroke-width':1.8},sg),
      v:E('line',{class:'k-a','stroke-dasharray':'5 6','stroke-width':1.8},sg),
      dot:E('circle',{r:5.5,class:'s-a'},sg),lab:fx(sg,0,0,'','t-lab2 s-a',20),
      br:E('path',{class:'k-a nofill','stroke-width':2},sg),brl:fx(sg,0,0,'','t-lab s-a',18,'middle')};});
    // les points de la formule : N1, N2, N3 sur la courbe, et le « × 5/6 » qui mène de l'un à l'autre
    this.tks=[1,2,3].map(()=>{const sg=E('g',{},g);return {g:sg,dot:E('circle',{r:6.5,class:'s-ink'},sg),lab:fx(sg,0,0,'','t-lab2 s-ink',20),ar:E('path',{class:'k-dim nofill','stroke-width':2,'marker-end':'url(#rarw)'},sg),arl:fx(sg,0,0,'× 5/6','t-lab2 s-dim',18,'middle')};});
    this.thL=fx(g,0,0,`*t*_{1/2} = ln 2 / λ ≈ ${fr(TH,2)} tics`,'t-lab2 s-a',20);
    this.tanG=E('g',{},g);
    this.tanL=E('line',{class:'k-ink','stroke-width':2},this.tanG);
    this.tanD=E('circle',{r:6,class:'s-ink'},this.tanG);
    this.tanP=fx(this.tanG,0,0,'e^{−1} ≈ '+fr(100*Math.exp(-1),0)+' %','t-lab2 s-ink',20);
    this.tanT=fx(this.tanG,0,0,'τ = 1/λ ≈ '+fr(TAU,2)+' tics','t-lab2 s-ink',20);
    this.n0L=fx(g,0,0,'','t-lab2 s-ink',20);
    this.eqT=fx(g,910,178,'','t-big2 s-ink',30,'end');
    this.eqT2=fx(g,910,216,'','t-lab2 s-dim',20,'end');
  },
  render(){const p=this.p,X=k=>110+800*k/p.xmax,Y=v=>580-450*v/p.ymax,f=Math.max(2,p.f),th=thDe(f),N0=p.N0;
    const key=p.xmax.toFixed(2)+'|'+p.ymax.toFixed(1);
    if(this._ax!==key){this._ax=key;axes(this.ax,X,Y,p.xmax,p.ymax,p.xmax<=10?1:p.xmax>25?10:5,p.ymax>150?250:25,v=>String(v),v=>String(v),'tics','N : dés restants');}
    this.cv.setAttribute('d',courbe(k=>N0*(1-1/f)**k,0,p.xmax,X,Y));this.cv.style.strokeDashoffset=1000*(1-p.curve);
    this.runP.forEach((c,j)=>{c.setAttribute('cx',X(j).toFixed(1));c.setAttribute('cy',Y(NK[j]).toFixed(1));});show(this.runG,.55*p.run);
    this.cv20.setAttribute('d',courbe(k=>100*(19/20)**k,0,p.xmax,X,Y));show(this.cv20,p.f20);
    this.cv20L.setAttribute('x',X(13));this.cv20L.setAttribute('y',(Y(100*(19/20)**13)-16).toFixed(1));show(this.cv20L,p.f20);
    this.cv2.setAttribute('d',courbe(k=>N0*(1-1/f)**(2*k),0,p.xmax,X,Y));show(this.cv2,p.dbl);
    this.cv2L.setAttribute('x',X(0)+12);this.cv2L.setAttribute('y',Y(N0*.14).toFixed(1));show(this.cv2L,p.dbl);
    this.cv2M.setAttribute('x',X(0)+12);this.cv2M.setAttribute('y',(Y(N0*.14)+26).toFixed(1));show(this.cv2M,p.dbl);
    this.cv6L.setAttribute('x',X(10.5));this.cv6L.setAttribute('y',(Y(N0*(1-1/f)**10.5)-26).toFixed(1));show(this.cv6L,Math.max(p.f20,p.dbl));
    const ops=[p.st1,p.st2,p.st3,p.st4];
    this.stairs.forEach((s,i)=>{const n=i+1,t=n*th,v=N0/2**n,x=X(t),y=Y(v),x0=X((n-1)*th);
      s.h.setAttribute('x1',X(0));s.h.setAttribute('x2',x);s.h.setAttribute('y1',y);s.h.setAttribute('y2',y);
      s.v.setAttribute('x1',x);s.v.setAttribute('x2',x);s.v.setAttribute('y1',y);s.v.setAttribute('y2',Y(0));
      s.dot.setAttribute('cx',x);s.dot.setAttribute('cy',y);
      const num=fr(v,Number.isInteger(v)?0:(Number.isInteger(v*10)?1:2));
      setFx(s.lab,p.stSym>.5?`${num} = *N*_{0}/${2**n}`:num);s.lab.setAttribute('x',x+10);s.lab.setAttribute('y',y-10);
      s.br.setAttribute('d',`M${x0.toFixed(1)} 616v6H${x.toFixed(1)}v-6`);
      setFx(s.brl,n===1&&(p.demi>.5||p.th>.5)?`*t*_{1/2} ≈ ${fr(th,2)} tics`:'*t*_{1/2}');s.brl.setAttribute('x',((x0+x)/2).toFixed(1));s.brl.setAttribute('y',648);
      show(s.g,ops[i]);show(s.lab,n===1&&p.th>.5?0:1);});
    // les points N1, N2, N3 de la formule
    const mv=j=>ND*R5**j;
    this.tks.forEach((s,i)=>{const j=i+1,o=clamp(p.tk-i,0,1),x=X(j),y=Y(mv(j)),xp=X(j-1),yp=Y(mv(j-1)),cx=(xp+x)/2-4,cy=Math.max(y,yp)+38,ay=.25*(yp+14)+.5*cy+.25*(y+12);
      s.dot.setAttribute('cx',x);s.dot.setAttribute('cy',y);
      setFx(s.lab,`*N*_{${j}} ≈ ${ent(Math.round(mv(j)))}`);s.lab.setAttribute('x',x+12);s.lab.setAttribute('y',y-12);
      s.ar.setAttribute('d',`M${xp+6} ${yp+14}Q${cx} ${cy} ${x-8} ${y+12}`);
      s.arl.setAttribute('x',cx);s.arl.setAttribute('y',ay+28);show(s.g,o);});
    this.thL.setAttribute('x',X(TH)+14);this.thL.setAttribute('y',Y(50)-40);show(this.thL,p.th*(1-p.demi));
    this.tanL.setAttribute('x1',X(0));this.tanL.setAttribute('y1',Y(N0));this.tanL.setAttribute('x2',X(TAU));this.tanL.setAttribute('y2',Y(0));
    this.tanD.setAttribute('cx',X(TAU));this.tanD.setAttribute('cy',Y(N0*Math.exp(-1)));
    this.tanP.setAttribute('x',X(TAU)+12);this.tanP.setAttribute('y',Y(N0*Math.exp(-1))-12);
    this.tanT.setAttribute('x',X(TAU)+10);this.tanT.setAttribute('y',Y(0)-12);show(this.tanG,p.tan);
    // activité : les 6 de l'élève, tic par tic ; la barre à mettre en valeur est celle où il restait ≈ 50 dés
    let jh=1;for(let j=1;j<=KMAX;j++)if(Math.abs(NK[j-1]-50)<Math.abs(NK[jh-1]-50))jh=j;
    this.barR.forEach((r,j)=>{if(!j){r.style.display='none';return;}r.setAttribute('x',(X(j)-7).toFixed(1));r.setAttribute('y',Y(DK[j]).toFixed(1));r.setAttribute('height',Math.max(0,Y(0)-Y(DK[j])).toFixed(1));r.setAttribute('class',j===jh?'bar hl':'bar');});
    this.barE.setAttribute('d',courbe(k=>ND/DE*R5**(k-1),1,Math.min(20,p.xmax),X,Y,120));
    this.barT.textContent=ty(`${DK[jh]} sur ${NK[jh-1]}`);this.barT.setAttribute('x',X(jh));this.barT.setAttribute('y',Y(Math.max(DK[jh],ND/DE*R5**(jh-1)))-24);
    show(this.barG,p.bars);show(this.barLeg,p.bars);
    setFx(this.n0L,`*N*_{0} = ${Math.round(N0)}`);this.n0L.setAttribute('x',X(0)+14);this.n0L.setAttribute('y',Y(N0)-12);show(this.n0L,Math.max(p.demi,clamp(p.tk,0,1)));
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
  p:{curve:0,st:0,r:30,line:0,der:0,an:0,age:0,xmax:40000,irh:0,irc:0},
  build(g){
    this.ax=E('g',{},g);
    this.band=E('rect',{y:130,height:450,class:'band'},g);
    this.bandL=E('text',{y:196,class:'t-lab s-a halo',text:ty('portée du carbone 14 : environ 50 000 ans')},g);
    this.cv=E('path',{class:'k-ink nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.st=[1,2,3,4].map(n=>{const sg=E('g',{},g);return {g:sg,h:E('line',{class:'k-dim','stroke-dasharray':'5 6','stroke-width':1.6},sg),v:E('line',{class:'k-dim','stroke-dasharray':'5 6','stroke-width':1.6},sg),dot:E('circle',{r:5,class:'s-ink'},sg),lab:fx(sg,0,0,`${n} *t*_{1/2} = ${ent(n*T14)} ans`,'t-lab s-ink halo',18)};});
    this.lnG=E('g',{},g);
    this.lnH=E('line',{class:'k-a','stroke-width':2.2},this.lnG);this.lnV=E('line',{class:'k-a','stroke-width':2.2,'stroke-dasharray':'7 5'},this.lnG);
    this.lnD=E('circle',{r:7,class:'s-a'},this.lnG);
    // l'âge ne s'affiche qu'une fois CALCULÉ, sous l'axe, là où aucune marche n'écrit
    this.lnR=fx(this.lnG,120,0,'','t-lab2 s-a halo',20);this.lnA=fx(this.lnG,0,646,'','t-lab2 s-a halo',20,'middle');
    this.der=DER.map((s,i)=>fx(g,490,154+i*40,s,'t-mid s-ink',26));
    this.an=fx(g,490,372,`*t* = (${ent(T14)} / ln 2) × ln(1 / 0,30) ≈ ${ent(sig3(AGE30))} ans`,'t-lab2 s-a',20);
    this.an2=E('text',{x:490,y:400,class:'t-lab s-dim',text:'entre une et deux demi-vies, comme ton estimation'},g);
    this.irM=E('line',{y1:130,y2:580,class:'k-a','stroke-width':2.2,'stroke-dasharray':'8 6'},g);
    this.irL=E('text',{y:160,class:'t-lab2 s-a','text-anchor':'end',text:ty('Jebel Irhoud : ≈ 315 000 ans')},g);
    // le calcul de Jebel Irhoud, une ligne à la fois
    this.irB=[
      fx(g,300,282,`${ent(IRHOUD)} ans ≈ ${fr(IRH_DV,0)} demi-vies`,'t-big2 s-ink',30),
      fx(g,300,322,`il reste 1/2^{${fr(IRH_DV,0)}} ≈ ${sci(IRH_FRAC)} du carbone 14`,'t-lab2 s-ink',20),
      fx(g,300,354,`1 g de carbone vivant : ${sci(N_C14_1G)} noyaux de carbone 14`,'t-lab s-dim',18),
      fx(g,300,388,`${ent(IRHOUD)} ans plus tard : ≈ ${sci(IRH_RESTE)} noyau`,'t-lab2 s-a',20)];
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
    show(this.irM,io);show(this.irL,io);
    this.irB.forEach((t,i)=>show(t,clamp(p.irc-(i<2?i:2),0,1)*io));
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

/* ---------- gestes : lancer les dés ---------- */
// Prendre la main : arrêter toute animation du noyau, poser la scène à l'état de l'étape, garder les clés tenues par l'élève.
function prendre(sc,keys){ctx.stop();const keep={};keys.forEach(k=>keep[k]=sc.p[k]);Object.assign(sc.p,ctx.etape().pre,keep);}
// « Suivant » reste fermé tant que le geste n'est pas fait ; le noyau lit `need` à l'arrivée sur l'étape, pas après le geste.
function majSuivant(){ctx.majNav();}
function tw(sc,key,to,d,vivant){return new Promise(res=>{const a=sc.p[key];
  if(RM.matches||!d){sc.p[key]=to;sc.render();res();return;}
  const t0=performance.now();
  const f=now=>{if(!vivant()){res();return;}const t=Math.min(1,(now-t0)/d);sc.p[key]=lerp(a,to,ctx.ease(t));sc.render();if(t<1)requestAnimationFrame(f);else res();};
  requestAnimationFrame(f);});}
let rolling=false,ep=0;
function lancer(max,done,vite){
  const sc=scenes.des,st=ctx.etape();
  if(rolling){done&&done(false);return;}
  prendre(sc,['k']);const k=Math.round(sc.p.k);sc.p.k=k;sc.p.roll=0;
  if(k>=max){sc.render();hooks.frame&&hooks.frame();done&&done(false);return;}
  const my=++ep,vivant=()=>my===ep&&ctx.etape()===st&&root.isConnected;
  rolling=true;
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

/* ---------- le script ---------- */
const BEATS=[{name:'L’énigme',court:'Énigme'},{name:'Cent dés',court:'Dés'},{name:'Sans mémoire',court:'Mémoire'},{name:'La courbe',court:'Courbe'},{name:'La demi-vie',court:'Demi-vie'},{name:'La formule',court:'Formule'},{name:'Les grandeurs',court:'Mesures'},{name:'Le carbone 14',court:'Carbone'},{name:'Ses limites',court:'Limites'},{name:'À toi'}];
// un pari : neutre à l'écran ; `juste` (3ᵉ case) ne sert qu'au profil de fin
const BET=t=>({opts:t.map(([x,fb,j])=>({t:x,fb,juste:!!j}))});
// une question « Vérifie » : une bonne réponse, et chaque réponse a son explication
const VF=t=>({opts:t.map(([x,ok,fb])=>({t:x,ok,fb}))});
const r0=k=>Math.round(EK(k));
const TICK=(k,m)=>k>=1?`Tic ${k} : il reste <b>${NK[k]}</b> dés. ${k<m?`Encore ${m-k} tic${m-k>1?'s':''}.`:''}`:'Appuie sur « Lancer les dés ».';
function pari10(){const j=S.first.pari10;if(j==null)return '';
  if(j===J10)return 'Ton pari était le bon. À l’étape suivante, tu vas voir pourquoi.';
  return j===0?'Le piège : à chaque tic, il part un sixième de ce qui RESTE, pas un sixième des 100 du début.':'Les dés partent vite au début, quand ils sont nombreux : la première dizaine de tics en emporte beaucoup.';}
const F56=tx`\dfrac{${DE-1}}{${DE}}`;
const IRH_FIN='Il a fallu une autre horloge : des silex chauffés par le feu. La chaleur a remis leur compteur à zéro ; depuis, ils accumulent le rayonnement de la radioactivité naturelle (uranium, thorium, potassium 40), mesuré par [[thermoluminescence]].';
const STEPS=[
/* ===== 0. l'énigme ===== */
{cle:'becq',beat:0,scene:'plaque',tag:'Paris · février 1896',
  text:['Paris, février 1896. Henri Becquerel enveloppe une plaque photographique dans du papier noir épais.','Il pose dessus des lamelles d’un sel d’uranium, [[phosphorescent]], puis expose le tout au soleil.','Au développement, la silhouette des lamelles apparaît en noir : le sel envoie un [[rayonnement]] invisible, qui traverse le papier.',{t:'Son idée : c’est le soleil qui fait émettre ces rayons au sel.',fort:true}]},
{cle:'tiroir',beat:0,scene:'plaque',tag:'26 et 27 février 1896',seq:[{p:{drawer:1},d:1300}],
  text:['Mercredi 26 et jeudi 27 février : le soleil ne se montre que par intermittence.',{t:'Becquerel range alors ses plaques toutes prêtes dans le tiroir d’un meuble, lamelles en place.',a:0},{t:'Les jours suivants, toujours pas de soleil.',a:0}]},
{cle:'plaque',beat:0,scene:'plaque',tag:'1ᵉʳ mars 1896',
  text:['Le 1<sup>er</sup> mars, sans avoir revu le soleil, Becquerel développe quand même les plaques.','À quoi t’attends-tu ?'],
  pari:{reveal:[{p:{drawer:0,dev:1},d:1500}],...BET([
    ['Rien du tout : pas de lumière, pas d’image','C’était logique. Et pourtant, les silhouettes sont là, bien noires.'],
    ['Des images très faibles','C’est exactement ce qu’attendait Becquerel. Et pourtant, les silhouettes sont là, bien noires.'],
    ['Des silhouettes bien noires','Tu as vu plus loin que Becquerel : lui s’attendait à des images très faibles.',1]])}},
{cle:'energie',beat:0,scene:'plaque',
  text:['La plaque a noirci dans l’obscurité complète.','D’où vient l’énergie qui l’a impressionnée ?'],
  pari:{reveal:[{p:{src:1},d:1200}],...BET([
    ['Du soleil, gardé en réserve','C’était la piste de Becquerel au départ. Mais en mai 1896, des sels d’uranium qui ne luisent pas noircissent aussi la plaque : l’énergie vient de l’uranium lui-même.'],
    ['De l’uranium lui-même','Oui. En mai 1896, Becquerel le confirme avec des sels d’uranium qui ne luisent pas : le rayonnement vient de l’uranium lui-même.',1],
    ['D’une fuite de lumière dans le tiroir','Bon réflexe d’expérimentateur. Mais une fuite aurait voilé la plaque au hasard, pas dessiné la forme exacte des lamelles. En mai 1896, Becquerel conclut : le rayonnement vient de l’uranium.']])}},
{cle:'noyau',beat:0,scene:'atome',seq:[{p:{atom:1},d:1200,w:200},{p:{zoom:1},d:1800,w:900}],
  text:['Mais qu’est-ce qui, dans l’uranium, émet ce rayonnement ? Entre dans l’atome pour le savoir.',{t:'Au centre, un [[noyau]] minuscule ; autour de lui, des électrons. (Ici, l’atome de carbone, plus simple à dessiner.)',a:0},{t:`Zoom sur le noyau : ${C_P} protons et ${C_N14} neutrons, serrés les uns contre les autres.`,a:1},{t:'C’est dans le noyau que se joue la radioactivité.',a:1,fort:true}]},
{cle:'desint',beat:0,scene:'atome',seq:[{p:{emit:.5},d:900,w:500},{p:{emit:1},d:1700,w:300}],
  text:['Certains noyaux sont instables, comme celui du [[carbone14|carbone 14]].',{t:'Un jour, l’un d’eux se [[desintegration|désintègre]]. Un de ses neutrons se change en proton…',a:0},{t:'… et un électron est expulsé : c’est le rayonnement. Le noyau est devenu un autre noyau, de l’azote 14.',a:1},{t:'Marie et Pierre Curie donneront à ce phénomène son nom : la [[radioactivite|radioactivité]].',a:1,fort:true}]},
{cle:'v-becq',beat:0,scene:'atome',sujet:'le noyau et la désintégration',
  text:['Becquerel a vu une plaque noircir dans le noir complet.','Qu’est-ce qui émet le rayonnement qui la noircit ?'],
  verifie:VF([
    ['Les noyaux d’uranium',true,'Oui. Le rayonnement sort du noyau quand il se désintègre. Le soleil n’y est pour rien : la plaque noircit dans le noir complet.'],
    ['Le soleil, gardé en réserve',false,'C’était la piste de Becquerel au départ. Mais la plaque a noirci dans le tiroir, et des sels d’uranium qui ne luisent pas font de même : l’énergie vient du noyau d’uranium.'],
    ['Les électrons autour du noyau',false,'Les électrons restent autour du noyau. La radioactivité se joue dans le noyau lui-même, quand il se désintègre.']])},

/* ===== 1. cent dés ===== */
{cle:'des',beat:1,scene:'des',set:{dice:0,k:0,graph:0,duel:0,duelRv:0},seq:[{p:{dice:1},d:1400}],
  text:['On ne peut pas suivre un seul noyau : personne ne sait quand il se désintégrera.','Alors on le remplace par un dé. Un grain de sel d’uranium contient des milliards de milliards de noyaux ; ici, cent dés.',{t:'À chaque <span class="nw">« [[tic]] »</span>, on lance tous les dés encore en jeu.',a:0},{t:'Un 6 veut dire : ce noyau se désintègre. Il sort du jeu.',a:0,fort:true}]},
{cle:'tic1',beat:1,scene:'des',ctl:'tic',tic:1,needLabel:'Lance d’abord',
  text:['À toi : lance les dés, une seule fois.','Regarde les 6 : ils rougissent, puis quittent la grille.'],
  note:k=>k>=1?`<b>${DK[1]}</b> dés ont fait 6 : ces noyaux se sont désintégrés. Il en reste <b>${NK[1]}</b>.`:'Appuie sur « Lancer les dés ».'},
{cle:'pari10',beat:1,scene:'des',set:{k:1},
  text:['Avant de continuer : au bout de 10 tics, combien de dés resteront en jeu ?'],
  pari:BET([['Presque aucun : dix fois un sixième, c’est plus que tout','Pari noté. Lance, et compte.',J10===0],['Une quinzaine','Pari noté. Lance, et compte.',J10===1],['Une quarantaine','Pari noté. Lance, et compte.',J10===2]])},
{cle:'tic10',beat:1,scene:'des',set:{graph:1},ctl:'tic',tic:10,needLabel:'Lance d’abord',
  text:['Lance jusqu’au dixième tic.','Chaque tic ajoute un point rouge au graphe : le pourcentage de dés encore en jeu.'],
  note:k=>k<10?TICK(k,10):`Tic 10 : il en reste <b>${NK[10]}</b>. ${pari10()}`},
{cle:'compte',beat:1,scene:'comptes',set:{n:0,cap:0,lin:0},seq:[{p:{n:1,cap:1},d:900}],
  text:['Comptons ce que le hasard donne en moyenne, tic par tic.',{t:`À chaque tic, un dé sur ${DE} part : il en reste cinq sixièmes.`,a:0}],
  deriv:[
    {tex:tx`${ND}\times\tfrac56\approx ${r0(1)}`,alt:`${ND} × 5/6 ≈ ${r0(1)}`,r:`Tic 1 : un sixième de ${ND} part (≈ ${fr(EK(0)/DE,1)} dés).`,p:{n:2}},
    {tex:tx`${r0(1)}\times\tfrac56\approx ${r0(2)}`,alt:`${r0(1)} × 5/6 ≈ ${r0(2)}`,r:`Tic 2 : un sixième de ${r0(1)} part (≈ ${fr(EK(1)/DE,1)}), pas un sixième de ${ND}.`,p:{n:3}},
    {tex:tx`${r0(2)}\times\tfrac56\approx ${r0(3)}`,alt:`${r0(2)} × 5/6 ≈ ${r0(3)}`,r:`Tic 3 : un sixième de ${r0(2)} seulement (≈ ${fr(EK(2)/DE,1)}).`,p:{n:4}},
    {tex:tx`\underbrace{${ND}\times\tfrac56\times\cdots\times\tfrac56}_{10\ \text{fois}}\approx ${r0(10)}`,alt:`${ND} × 5/6 × … × 5/6 (10 fois) ≈ ${r0(10)}`,r:`Dix fois de suite × 5/6. Les barres montrent toute la suite : de moins en moins de dés partent à chaque tic. Ton tirage : ${NK[10]}.`,p:{n:11}}]},
{cle:'compte2',beat:1,scene:'comptes',set:{n:11,cap:1,lin:0},seq:[{p:{lin:1},d:2400,w:400}],
  text:()=>[`Imagine que chaque tic enlève toujours un sixième des ${ND} dés du départ.`,{t:`Il partirait ${ent(Math.round(ND/DE))} dés à chaque tic, toujours autant. Au bout de ${DE} tics, il n’en resterait plus un seul.`,a:0},{t:`Or au tic ${DE}, il en reste encore ${r0(DE)}.`,a:0},{t:'Moins il reste de dés, moins il en part.',a:0,fort:true}]},
{cle:'v-des',beat:1,scene:'comptes',set:{lin:0},sujet:'un sixième de ce qui reste',
  text:['Il reste 60 dés en jeu.','Combien vont partir, en moyenne, au tic suivant ?'],
  verifie:VF([
    [`Environ ${ent(60/DE)} : un sixième des 60 dés restants`,true,`Oui : à chaque tic, il part un sixième de ce qui reste. 60 / ${DE} = ${ent(60/DE)}.`],
    [`Environ ${ent(Math.round(ND/DE))} : un sixième des ${ND} dés du départ`,false,`C’est le piège. Les dés déjà partis ne sont plus là : on prend un sixième de 60, pas un sixième de ${ND}.`],
    [`Environ ${ent(60*(DE-1)/DE)} : cinq sixièmes des 60 dés`,false,`Cinq sixièmes, ce sont les dés qui restent. Ceux qui partent sont le sixième manquant : ${ent(60/DE)}.`]])},

/* ===== 2. sans mémoire ===== */
{cle:'duel',beat:2,scene:'des',set:{k:TV,graph:1,duel:1,duelRv:0},
  text:['Un noyau qui a survécu longtemps est-il plus fragile ?','Voici le survivant, et un dé neuf jamais lancé.','Au prochain tic, lequel a le plus de chances de faire 6 ?'],
  pari:{reveal:[{p:{duelRv:1},d:900}],...BET([
    ['Le survivant : son tour va venir','C’est l’intuition de l’ampoule usée. Mais un dé n’a pas de mémoire : 1 chance sur 6 pour chacun. Un noyau non plus ne vieillit pas.'],
    ['Le dé neuf : le survivant est solide','Le survivant a eu de la chance, pas de la solidité : ses dix lancers ne changent rien au onzième. 1 chance sur 6 chacun.'],
    ['Les deux, autant','Oui : un dé n’a pas de mémoire. Un noyau non plus : sa chance de se désintégrer ne dépend pas de son âge.',1]])}},
{cle:'usure',beat:2,scene:'age',seq:[{p:{flat:1},d:1500,w:200},{p:{pts:1},d:800,w:300},{p:{use:1},d:1500,w:300}],
  text:[`Reprends les deux dés : au prochain lancer, leur chance de faire 6 est la même, 1 sur ${DE}.`,{t:'Place cette chance sur un graphe, selon l’âge du dé : c’est une droite horizontale.',a:0},{t:'Si les dés s’usaient, la courbe monterait avec l’âge (pointillés gris).',a:2},{t:'Un noyau ne s’use pas : sa chance de se désintégrer ne dépend pas de son âge.',a:2,fort:true}]},
{cle:'v-memoire',beat:2,scene:'age',sujet:'un noyau ne vieillit pas',
  text:['Deux noyaux de radon 222 : l’un est tout neuf, l’autre a plusieurs jours.','Lequel a le plus de chances de se désintégrer dans la seconde qui vient ?'],
  verifie:VF([
    ['Le plus ancien',false,'Un noyau ne s’use pas. Comme le survivant aux dix lancers, le plus ancien garde exactement la même chance que le plus récent.'],
    ['Le plus récent',false,'L’ancien n’a rien prouvé : survivre jusqu’ici le rend chanceux, pas plus solide. Même chance pour les deux.'],
    ['Les deux : même chance',true,'Oui. Un noyau ne vieillit pas : sa chance de se désintégrer ne dépend pas de son âge. C’est le dé sans mémoire.']])},

/* ===== 3. la courbe ===== */
{cle:'tic20',beat:3,scene:'des',set:{duel:0,duelRv:0,k:TV},ctl:'tic',tic:20,needLabel:'Lance d’abord',
  text:['On a suivi un dé. Regardons maintenant tous les dés ensemble.','Continue jusqu’au vingtième tic, et regarde la forme que dessinent tes points.'],
  note:k=>k<20?TICK(k,20):`Tic 20 : il en reste <b>${NK[20]}</b>. Les points tombent vite au début, puis de plus en plus lentement : moins il reste de dés, moins il en part à chaque tic.`},
{cle:'autres',beat:3,scene:'des',set:{k:20},seq:[{p:{others:1},d:1800}],
  text:['Refais l’expérience neuf fois, avec 100 dés neufs à chaque fois : ce sont les points gris.',{t:'Aucune série ne ressemble exactement à la tienne…',a:0},{t:'… et pourtant toutes ont la même allure.',a:0,fort:true}]},
{cle:'grands',beat:3,scene:'des',
  text:['Et avec 10 000 dés au lieu de 100, comptés en pourcentage du départ ?','Dix séries de 10 000 dés s’écarteraient les unes des autres…'],
  pari:{reveal:[{p:{big:1},d:1600}],...BET([
    ['Plus : plus de dés, plus de hasard','Chaque dé reste imprévisible, mais leurs écarts se compensent : les dix séries de 10 000 dés (traits noirs) se confondent presque.'],
    ['Autant qu’avec 100','Regarde les traits noirs : les dix séries de 10 000 dés se confondent presque. Les écarts de chaque dé se compensent.'],
    ['Moins : presque une seule courbe','Oui : les dix séries de 10 000 dés (traits noirs) se confondent presque. Plus il y a de noyaux, plus la courbe est nette.',1]])}},
{cle:'loi-pop',beat:3,scene:'des',seq:[{p:{law:1},d:2000}],
  text:()=>[`Un milligramme d’uranium contient environ ${sci(N_U)} noyaux.`,{t:'À cette échelle, le hasard de chaque noyau ne se voit plus : il reste une seule courbe, toujours la même.',a:0},{t:'Un noyau seul est imprévisible ; une [[population]] suit une loi exacte.',a:0,fort:true}],
  say:()=>`Un milligramme d’uranium contient environ ${fr(N_U/1e18,1)} milliards de milliards de noyaux. À cette échelle, le hasard de chaque noyau ne se voit plus : il reste une seule courbe, toujours la même. Un noyau seul est imprévisible ; une population suit une loi exacte.`},
{cle:'v-courbe',beat:3,scene:'des',sujet:'beaucoup de noyaux, une courbe lisse',
  text:['Deux [[echantillon|échantillons]] de la même substance : l’un a 100 noyaux, l’autre un milliard de milliards.','Lequel suit le mieux la courbe lisse ?'],
  verifie:VF([
    ['Le milliard de milliards',true,'Oui : avec autant de noyaux, les hasards individuels se compensent. La courbe est lisse, la même à chaque fois.'],
    ['Celui de 100 noyaux',false,'C’est l’inverse. Avec 100 dés, chaque série s’écarte de la courbe (tes points rouges et les points gris). Avec beaucoup de noyaux, les écarts se compensent.'],
    ['Les deux autant',false,'La loi est la même, mais on ne la voit nettement que sur beaucoup de noyaux : 100 dés s’écartent (points gris), 10 000 se confondent presque (traits noirs).']])},

/* ===== 4. la demi-vie ===== */
{cle:'marche1',beat:4,scene:'loi',set:{run:1},seq:[{p:{st1:1},d:1400}],
  text:()=>['On revient à la courbe des dés. Pour la lire d’un coup d’œil, une seule question : en combien de tics perd-on la moitié des dés ?',{t:`Partie de ${ND}, la courbe passe à ${ent(ND/2)} au bout de ${fr(TH,1)} tics.`,a:0},{t:'La moitié des dés a disparu.',a:0}]},
{cle:'marche2',beat:4,scene:'loi',
  text:()=>[`Pour passer de ${ent(ND/2)} à ${ent(ND/4)}, il faudra…`],
  pari:{reveal:[{p:{st2:1},d:1400}],...BET([
    [`Moins de ${fr(TH,1)} tics : il y a moins de dés`,`Moins de dés, mais chacun garde 1 chance sur ${DE} : il faut le même temps pour en perdre la moitié. Regarde la deuxième marche : ${fr(TH,1)} tics.`],
    [`${fr(TH,1)} tics, exactement pareil`,`Oui : la deuxième marche a exactement la même largeur. Peu importe combien il en reste, la moitié part en ${fr(TH,1)} tics.`,1],
    [`Plus de ${fr(TH,1)} tics : il ne reste que les plus résistants`,`Les survivants n’ont rien de spécial : ils ont eu de la chance. Chacun garde 1 chance sur ${DE}, d’où la même largeur : ${fr(TH,1)} tics.`]])}},
{cle:'demivie',beat:4,scene:'loi',seq:[{p:{st3:1},d:1100},{p:{st4:1},d:1100,w:300}],
  text:()=>[{t:`Encore la moitié : ${fr(ND/8,1)}, puis ${fr(ND/16,2)}.`,a:0},{t:'Toutes les marches ont la même largeur.',a:1},{t:'Cette durée s’appelle la [[demivie|demi-vie]], notée <i>t</i><sub>1/2</sub>.',a:1,fort:true},{t:'La courbe ne touche jamais zéro : à chaque marche, il reste encore la moitié.',a:1}]},
{cle:'demi-n',beat:4,scene:'loi',set:{st1:0,st2:0,st3:0,st4:0,stSym:1},
  text:['Combien reste-t-il après plusieurs demi-vies ? Compte-les une par une.','On note <i>N</i><sub>0</sub> le nombre de dés au départ, et <i>N</i>(<i>t</i>) le nombre de dés restants à l’instant <i>t</i>.'],
  deriv:[
    {tex:tx`N(t_{1/2})=\dfrac{N_0}{2}`,alt:'N(t½) = N₀/2',r:'Après une demi-vie, il reste la moitié.',p:{st1:1}},
    {tex:tx`N(2\,t_{1/2})=\dfrac12\times\dfrac{N_0}{2}=\dfrac{N_0}{4}`,alt:'N(2 t½) = ½ × N₀/2 = N₀/4',r:'Pendant la deuxième demi-vie, la moitié de ce qui restait part à son tour.',p:{st2:1}},
    {tex:tx`N(3\,t_{1/2})=\dfrac12\times\dfrac{N_0}{4}=\dfrac{N_0}{8}`,alt:'N(3 t½) = ½ × N₀/4 = N₀/8',r:'Et ainsi de suite : une division par 2 à chaque demi-vie.',p:{st3:1}},
    {tex:tx`N(n\,t_{1/2})=\dfrac{N_0}{2^{n}}`,alt:'N(n t½) = N₀/2ⁿ',r:'Après <i>n</i> demi-vies, on a divisé <i>n</i> fois par 2, soit par 2<sup><i>n</i></sup>. Ce n’est pas <i>N</i><sub>0</sub>/<i>n</i>.',p:{st4:1}},
    {tex:tx`N_0-\dfrac{N_0}{2^{n}}`,alt:'N₀ − N₀/2ⁿ',r:'Attention : <i>N</i><sub>0</sub>/2<sup><i>n</i></sup>, c’est ce qui RESTE. Ce qui est parti, c’est le reste : après 3 demi-vies, il reste <i>N</i><sub>0</sub>/8, donc 7<i>N</i><sub>0</sub>/8 sont partis.'}]},
{cle:'ruther',beat:4,scene:'ruther',tag:'1900 · Montréal',seq:[{p:{pts:1},d:1600,w:200}],
  text:['Ces marches sortent de dés. Des noyaux véritables font-ils pareil ?','Montréal, 1900. Ernest Rutherford mesure le rayonnement d’un gaz radioactif qui s’échappe de composés du thorium.',{t:'Il écrit que l’intensité « tombe à la moitié de sa valeur en une minute environ » (traduit de l’anglais).',a:0},{t:'Voici ses mesures.',a:0}]},
{cle:'quart',beat:4,scene:'ruther',
  text:['Au bout de combien de temps l’intensité tombe-t-elle au quart ?'],
  pari:{reveal:[{p:{stairs:1},d:1600}],...BET([
    ['Vers 1 min 30 s',`Un quart, c’est la moitié de la moitié : deux demi-vies, donc vers 2 min. Sa mesure à 118 s : ${frR(.23)}, presque un quart.`],
    ['Vers 2 min',`Oui : la moitié de la moitié, deux demi-vies. Sa mesure à 118 s : ${frR(.23)}, presque un quart.`,1],
    ['Vers 4 min',`Quatre minutes, ce serait quatre demi-vies : un seizième. Le quart, c’est deux demi-vies, vers 2 min. Sa mesure à 118 s : ${frR(.23)}.`]])}},
{cle:'curseurs',beat:4,scene:'loi',set:{xmax:40,ymax:1000,N0:300,f:6,run:0,st1:1,st2:0,st3:0,st4:0,stSym:0,demi:1},ctl:'demi',
  text:['Rutherford le constate : un [[echantillon|échantillon]] de n’importe quelle taille met le même temps à perdre la moitié.','Vérifie-le : change le nombre de dés <i>N</i><sub>0</sub>, puis la sorte de dé.']},
{cle:'v-demivie',beat:4,scene:'loi',set:{xmax:20,ymax:100,N0:100,f:6,run:0,st1:1,st2:1,st3:1,st4:1,stSym:1,demi:0,th:0},sujet:'N₀/2ⁿ après n demi-vies',
  text:['L’iode 131 a une demi-vie de 8 jours.','Au bout de 24 jours, que reste-t-il de la quantité initiale <i>N</i><sub>0</sub> ?'],
  verifie:VF([
    ['<i>N</i><sub>0</sub>/8, soit 12,5 %',true,'Oui : 24 jours = 3 demi-vies, donc on a divisé 3 fois par 2 : 2³ = 8. Il reste <i>N</i><sub>0</sub>/8.'],
    ['<i>N</i><sub>0</sub>/3',false,'On divise par 2 à chaque demi-vie, pas par le nombre de demi-vies : 3 demi-vies, c’est 2 × 2 × 2 = 8, donc <i>N</i><sub>0</sub>/8.'],
    ['Plus rien : tout a disparu',false,'La courbe ne touche jamais zéro : à chaque demi-vie il reste la moitié de ce qui restait. Après 3 demi-vies, il reste <i>N</i><sub>0</sub>/8.']])},

/* ===== 5. la formule ===== */
{cle:'produit',beat:5,scene:'loi',set:{xmax:8,ymax:115,N0:100,f:6,curve:0,run:0,st1:0,st2:0,st3:0,st4:0,stSym:0,demi:0,th:0,tk:0,eq:0,eqs:'',eqs2:''},
  text:['Les dés nous ont donné une courbe et une demi-vie. Il nous faut maintenant une formule, pour calculer sans lancer de dés.','Écris ce que font les dés, tic après tic : on note <i>N</i><sub><i>k</i></sub> le nombre de dés restants après <i>k</i> tics.'],
  deriv:[
    {tex:tx`N_1=N_0\times ${F56}`,alt:'N₁ = N₀ × 5/6',r:`Tic 1 : chaque dé a ${DE-1} chances sur ${DE} de rester, donc il reste 5/6 des dés.`,p:{tk:1}},
    {tex:tx`N_2=N_1\times ${F56}=N_0\times\left(${F56}\right)^{2}`,alt:'N₂ = N₁ × 5/6 = N₀ × (5/6)²',r:'Tic 2 : on repart de <i>N</i><sub>1</sub>, et il en reste encore 5/6. On a multiplié deux fois par 5/6.',p:{tk:2}},
    {tex:tx`N_3=N_2\times ${F56}=N_0\times\left(${F56}\right)^{3}`,alt:'N₃ = N₂ × 5/6 = N₀ × (5/6)³',r:'Tic 3 : encore une multiplication par 5/6, soit trois en tout.',p:{tk:3}},
    {tex:tx`N_k=N_0\times\left(${F56}\right)^{k}`,alt:'N_k = N₀ × (5/6)^k',r:'À chaque tic, on multiplie par 5/6 : après <i>k</i> tics, on a multiplié <i>k</i> fois. Voilà la courbe des dés, en formule.',p:{curve:1,eq:1,eqs:'*N*_{k} = *N*_{0} × (5/6)^{k}'}}]},
{cle:'exp',beat:5,scene:'loi',set:{xmax:20,ymax:100,curve:1,tk:0,eq:0,eqs:'',eqs2:''},
  text:['La formule est exacte, mais une puissance <i>k</i>-ième est lourde à manier. Les physiciens préfèrent une [[exponentielle]].','Pour y arriver, réécris 5/6 avec le [[ln|logarithme népérien]] : tu l’as vu, ln change les produits en sommes.'],
  deriv:[
    {tex:tx`\dfrac56=\dfrac{1}{6/5}`,alt:'5/6 = 1 / (6/5)',r:'5/6 est l’inverse de 6/5.'},
    {tex:tx`\dfrac{1}{6/5}=e^{\ln\left(1/(6/5)\right)}`,alt:'1/(6/5) = e^(ln(1/(6/5)))',r:'Tout nombre <i>a</i> > 0 vaut e<sup>ln <i>a</i></sup> : l’exponentielle « défait » le ln.'},
    {tex:tx`\ln\dfrac{1}{6/5}=-\ln\dfrac65`,alt:'ln(1/(6/5)) = −ln(6/5)',r:'Règle de l’inverse de la leçon sur le logarithme : ln(1/<i>a</i>) = −ln <i>a</i>.'},
    {tex:tx`${F56}=e^{-\ln(6/5)}`,alt:'5/6 = e^(−ln(6/5))',r:`On remplace. Vérifie : ln(6/5) ≈ ${fr(LAMD,3)}, et e<sup>−${fr(LAMD,3)}</sup> ≈ ${fr(Math.exp(-LAMD),3)} ≈ 5/6.`,p:{eq:1,eqs:'5/6 = e^{−ln(6/5)}',eqs2:`e^{−${fr(LAMD,3)}} ≈ ${fr(Math.exp(-LAMD),3)}`}}]},
{cle:'lambda',beat:5,scene:'loi',set:{eq:0,eqs:'',eqs2:''},
  text:['Il ne reste qu’à élever à la puissance <i>k</i>, puis à nommer le nombre qui apparaît.'],
  deriv:[
    {tex:tx`\left(${F56}\right)^{k}=\left(e^{-\ln(6/5)}\right)^{k}`,alt:'(5/6)^k = (e^(−ln(6/5)))^k',r:'On élève les deux côtés à la puissance <i>k</i>.'},
    {tex:tx`\left(${F56}\right)^{k}=e^{-k\ln(6/5)}`,alt:'(5/6)^k = e^(−k ln(6/5))',r:'(e<sup><i>a</i></sup>)<sup><i>k</i></sup> = e<sup><i>ak</i></sup> : on multiplie les exposants.'},
    {tex:tx`\lambda=\ln\dfrac{6}{5}\approx ${TN(LAMD,3)}`,alt:`λ = ln(6/5) ≈ ${fr(LAMD,3)}`,r:'On pose λ = ln(6/5) : la [[constanteradio|constante radioactive]] des dés, par tic.',p:{eq:1,eqs:'λ = ln(6/5)',eqs2:`≈ ${fr(LAMD,3)} par tic`}},
    {tex:tx`N_k=N_0\left(${F56}\right)^{k}=N_0\,e^{-\lambda k}`,alt:'N_k = N₀ (5/6)^k = N₀ e^(−λk)',r:'Une exponentielle décroissante de <i>k</i>.',p:{eqs:'*N*_{k} = *N*_{0} e^{−λk}',eqs2:`λ = ln(6/5) ≈ ${fr(LAMD,3)} par tic`}}]},
{cle:'continu',beat:5,scene:'loi',set:{eq:1},
  text:['Pour de vrais noyaux, le temps ne tombe pas en tics : il coule sans à-coups.','Alors on remplace le nombre de tics <i>k</i> par le temps <i>t</i>.'],
  deriv:[
    {tex:tx`N_k=N_0\,e^{-\lambda k}`,alt:'N_k = N₀ e^(−λk)',r:`Pour les dés, <i>k</i> = 0, 1, 2, 3… tics (λ ≈ ${fr(LAMD,3)} par tic, un peu plus que 1/${DE} ≈ ${fr(1/DE,3)}).`},
    {tex:tx`N(t)=N_0\,e^{-\lambda t}`,alt:'N(t) = N₀ e^(−λt)',r:'Pour les noyaux, <i>t</i> prend toutes les valeurs : c’est la <b>loi de décroissance radioactive</b> (<i>N</i><sub>0</sub> : nombre de noyaux à <i>t</i> = 0).',p:{eqs:'*N*(*t*) = *N*_{0} e^{−λt}',eqs2:'λ en s^{−1} ou an^{−1}'}},
    {tex:tx`\lambda\,t\ \text{sans unité}\ \Longrightarrow\ \lambda\ \text{en s}^{-1}`,alt:'λt sans unité ⇒ λ en s⁻¹',r:'Un exposant n’a pas d’unité : si <i>t</i> est en secondes, λ est en s<sup>−1</sup> ; en an<sup>−1</sup> si <i>t</i> est en années.'}]},
{cle:'v-formule',beat:5,scene:'loi',set:{eq:0,f20:0},sujet:'de (5/6)ᵏ à e^(−λk)',
  text:['Un dé à 20 faces : à chaque tic, il reste 19/20 des dés.','Quelle est sa constante radioactive λ, par tic ?'],
  verifie:{...VF([
    [`ln(20/19) ≈ ${fr(L20,3)}`,true,`Oui : 19/20 = e<sup>−λ</sup>, donc λ = −ln(19/20) = ln(20/19) ≈ ${fr(L20,3)}. Même méthode que pour 5/6 et ln(6/5). Le trait gris pointillé est la courbe de ce dé.`],
    [`19/20 = ${fr(19/20,2)}`,false,'19/20 est le facteur par tic, comme 5/6 pour le dé à 6 faces. λ est le nombre dans l’exposant : 19/20 = e<sup>−λ</sup>, donc λ = ln(20/19).'],
    [`ln(19/20) ≈ ${fr(Math.log(19/20),3)}`,false,`Presque : mais λ est positif, le signe − est déjà écrit dans e<sup>−λk</sup>. 19/20 = e<sup>−λ</sup> donne λ = −ln(19/20) = ln(20/19) ≈ ${fr(L20,3)}.`]]),reveal:[{p:{f20:1},d:1000}]}},

/* ===== 6. les grandeurs ===== */
{cle:'ln2',beat:6,scene:'loi',set:{eq:0,f20:0,st1:0,th:0,tan:0},
  text:['D’où vient le ln 2 de ton cours ?','Écris qu’au bout d’une demi-vie, il reste la moitié.'],
  deriv:[
    {tex:tx`N(t_{1/2})=\dfrac{N_0}{2}`,alt:'N(t½) = N₀/2',r:'C’est la définition de la demi-vie.'},
    {tex:tx`N_0\,e^{-\lambda t_{1/2}}=\dfrac{N_0}{2}`,alt:'N₀ e^(−λ t½) = N₀/2',r:'On remplace <i>N</i>(<i>t</i>) par la loi de décroissance.'},
    {tex:tx`e^{-\lambda t_{1/2}}=\dfrac12`,alt:'e^(−λ t½) = 1/2',r:'On divise par <i>N</i><sub>0</sub> (qui n’est pas nul).'},
    {tex:tx`-\lambda t_{1/2}=\ln\dfrac12=-\ln 2`,alt:'−λ t½ = ln(1/2) = −ln 2',r:'On prend le ln des deux côtés : il fait descendre l’exposant. Et ln(1/2) = −ln 2 (règle de l’inverse).'},
    {tex:tx`t_{1/2}=\dfrac{\ln 2}{\lambda}`,alt:'t½ = ln 2 / λ',r:`On divise par −λ. <i>N</i><sub>0</sub> a disparu : la demi-vie ne dépend pas du nombre de noyaux. Pour les dés : ln 2 / ln(6/5) ≈ ${fr(TH,2)} tics, la largeur d’une marche.`,p:{st1:1,th:1}}]},
{cle:'tau',beat:6,scene:'loi',set:{st1:0,th:0,tan:0},
  text:['Une autre durée caractéristique de la décroissance : la [[tau|constante de temps]] τ.'],
  deriv:[
    {tex:tx`\tau=\dfrac{1}{\lambda}`,alt:'τ = 1/λ',r:'τ est l’inverse de λ : c’est une durée, puisque λ est en s<sup>−1</sup>.'},
    {tex:tx`N(\tau)=N_0\,e^{-\lambda\tau}=N_0\,e^{-1}`,alt:'N(τ) = N₀ e^(−λτ) = N₀ e^(−1)',r:'À <i>t</i> = τ, l’exposant λτ vaut 1. La tangente à la courbe en <i>t</i> = 0 coupe l’axe des temps en τ.',p:{tan:1}},
    {tex:tx`\dfrac{N(\tau)}{N_0}=e^{-1}\approx ${TN(Math.exp(-1),2)}`,alt:`N(τ)/N₀ = e⁻¹ ≈ ${fr(Math.exp(-1),2)}`,r:`À <i>t</i> = τ, il reste environ ${fr(100*Math.exp(-1),0)} % des noyaux, pas 50 %.`},
    {tex:tx`t_{1/2}=\dfrac{\ln 2}{\lambda}=\tau\ln 2\approx ${TN(Math.LN2,2)}\,\tau`,alt:`t½ = ln 2 / λ = τ ln 2 ≈ ${fr(Math.LN2,2)} τ`,r:`La demi-vie est plus courte que τ : <i>t</i><sub>1/2</sub> ≈ ${fr(Math.LN2,2)} τ.`}]},
{cle:'activite',beat:6,scene:'loi',set:{tan:0,th:0,st1:0,eq:0},
  text:()=>['Un détecteur compte des désintégrations, pas des noyaux.',`Sur ${ND} dés, environ ${ent(ND/DE)} font 6 par tic. Sur ${ND/2} dés, combien ?`],
  pari:{reveal:[{p:{bars:1},d:1400}],...BET([
    [`Toujours environ ${ent(ND/DE)}`,`Chaque dé garde 1 chance sur ${DE} : moitié moins de dés, moitié moins de 6. Les barres baissent comme la courbe.`],
    [`Environ ${ent(ND/2/DE)}`,`Oui : un sixième de ${ND/2}. Les barres baissent comme la courbe.`,1],
    [`Environ ${ent(2*ND/DE)}`,`Ce serait le double, avec moitié moins de dés. Un sixième de ${ND/2} : environ ${ent(ND/2/DE)}.`]]),
    apres:{html:'<p class="small">Pour des noyaux, ce nombre de désintégrations par seconde s’appelle l’[[activite|activité]] <i>A</i>, mesurée en [[becquerel|becquerels]] : 1 Bq = 1 désintégration par seconde.</p>'}}},
{cle:'activite2',beat:6,scene:'loi',
  text:['Relie maintenant l’activité au nombre de noyaux restants.'],
  deriv:[
    {tex:tx`A(t)=-\dfrac{dN}{dt}`,alt:'A(t) = −dN/dt',r:'L’activité est le nombre de désintégrations par seconde : <i>N</i> diminue, donc −d<i>N</i>/d<i>t</i> est positif.'},
    {tex:tx`\dfrac{dN}{dt}=-\lambda N_0\,e^{-\lambda t}`,alt:'dN/dt = −λ N₀ e^(−λt)',r:'On dérive la loi de décroissance : la dérivée de e<sup>−λ<i>t</i></sup> est −λ e<sup>−λ<i>t</i></sup>.'},
    {tex:tx`A(t)=\lambda N_0\,e^{-\lambda t}=\lambda\,N(t)`,alt:'A(t) = λ N₀ e^(−λt) = λ N(t)',r:'On reconnaît <i>N</i>(<i>t</i>) : <i>A</i> = λ<i>N</i>. Plus il reste de noyaux, plus il y a de désintégrations par seconde.'},
    {tex:tx`A(t)=A_0\,e^{-\lambda t}\qquad A_0=\lambda N_0`,alt:'A(t) = A₀ e^(−λt), avec A₀ = λ N₀',r:'L’activité suit la même loi que <i>N</i>, avec la même demi-vie.'},
    {tex:tx`N=\dfrac{A}{\lambda}`,alt:'N = A / λ',r:'Connaissant l’activité et λ (en s<sup>−1</sup>), on retrouve le nombre de noyaux.'}]},
{cle:'v-grandeurs',beat:6,scene:'loi',set:{bars:0,tan:0,th:0,st1:1,dbl:0},sujet:'t½ = ln 2 / λ',
  text:['Une substance A a une constante radioactive λ deux fois plus grande que celle d’une substance B.','Comparée à celle de B, la demi-vie de A est…'],
  verifie:{...VF([
    ['deux fois plus courte',true,'Oui : <i>t</i><sub>1/2</sub> = ln 2 / λ. Si λ double, <i>t</i><sub>1/2</sub> est divisée par 2 : A perd sa moitié deux fois plus vite. Sur la scène, la courbe pointillée (λ doublé) descend plus vite.'],
    ['deux fois plus longue',false,'λ est au dénominateur de <i>t</i><sub>1/2</sub> = ln 2 / λ. Un λ plus grand, c’est une décroissance plus rapide, donc une demi-vie plus courte.'],
    ['la même',false,'La demi-vie dépend de λ : <i>t</i><sub>1/2</sub> = ln 2 / λ. Elle ne dépend pas de <i>N</i><sub>0</sub>, mais elle change avec la sorte de noyau.']]),reveal:[{p:{dbl:1},d:1000}]}},

/* ===== 7. le carbone 14 ===== */
{cle:'isotope',beat:7,scene:'atome',set:{iso:0},seq:[{p:{iso:1},d:1400,w:200}],
  text:()=>['Dernière application, la plus célèbre : donner un âge à un objet ancien.',{t:'Le carbone existe sous plusieurs formes, les [[isotope|isotopes]] : même nombre de protons, nombre de neutrons différent.',a:0},{t:`Le carbone 12 est stable. Le carbone 14 a ${C_N14-C_N12} neutrons de plus : il est radioactif, c’est notre horloge.`,a:0},{t:`Dans l’air, environ ${fr(C14_PART*1e12,1)} atome de carbone sur 10${sup(12)} est du carbone 14.`,a:0}]},
{cle:'horloge',beat:7,scene:'horloge',set:{curve:0,st:0},seq:[{p:{curve:1},d:1800},{p:{st:1},d:900}],
  text:()=>['Un être vivant échange sans cesse du carbone avec l’air : la part de carbone 14 dans son corps reste constante.',{t:'À sa mort, les échanges cessent. Le carbone 14 n’est plus renouvelé : il ne fait que décroître.',a:0},{t:`L’horloge démarre. Demi-vie du carbone 14 : ${ent(T14)} ans.`,a:1,fort:true}]},
{cle:'pari30',beat:7,scene:'horloge',
  text:['Un charbon de bois trouvé dans un ancien foyer a une activité égale à 30 % de celle d’un bois vivant.','Sans calcul, son âge est…'],
  pari:{reveal:[{p:{line:1},d:1200}],...BET([
    [`Moins de ${ent(T14)} ans`,'Moins d’une demi-vie, il resterait plus de 50 %. Or 30 % est entre 50 % (une demi-vie) et 25 % (deux).'],
    [`Entre ${ent(T14)} et ${ent(2*T14)} ans`,'Oui : 30 % est entre 50 % et 25 %, donc entre une et deux demi-vies.',1],
    [`Plus de ${ent(3*T14)} ans`,'Après trois demi-vies, il ne resterait que 12,5 %. 30 % est entre 50 % et 25 % : entre une et deux demi-vies.']])}},
{cle:'litteral',beat:7,scene:'horloge',set:{der:0,an:0},
  text:['Le calcul exact, comme le correcteur l’attend : l’expression littérale d’abord, avec des lettres.',{t:'« On donnera les expressions littérales avant de passer aux applications numériques. »',fort:true}],
  deriv:[
    {tex:tx`A(t)=A_0\,e^{-\lambda t}`,alt:'A(t) = A₀ e^(−λt)',r:'La loi de décroissance, écrite pour l’activité (même loi que pour <i>N</i>). <i>A</i><sub>0</sub> est l’activité à <i>t</i> = 0, celle d’un bois vivant.',p:{der:1}},
    {tex:tx`\dfrac{A}{A_0}=e^{-\lambda t}`,alt:'A/A₀ = e^(−λt)',r:'On divise par <i>A</i><sub>0</sub> : l’exponentielle est seule d’un côté.',p:{der:2}},
    {tex:tx`\ln\dfrac{A}{A_0}=-\lambda t`,alt:'ln(A/A₀) = −λt',r:'<i>t</i> est coincé dans l’exposant : on prend le ln des deux côtés, car ln(e<sup><i>x</i></sup>) = <i>x</i>.',p:{der:3}},
    {tex:tx`t=\dfrac{1}{\lambda}\,\ln\dfrac{A_0}{A}`,alt:'t = (1/λ) ln(A₀/A)',r:'On divise par −λ, et −ln(<i>A</i>/<i>A</i><sub>0</sub>) = ln(<i>A</i><sub>0</sub>/<i>A</i>) (règle de l’inverse).',p:{der:4}},
    {tex:tx`t=\dfrac{t_{1/2}}{\ln 2}\,\ln\dfrac{A_0}{A}`,alt:'t = (t½ / ln 2) ln(A₀/A)',r:'On remplace λ par ln 2 / <i>t</i><sub>1/2</sub> : c’est la forme que donnent la plupart des énoncés.',p:{der:5}}]},
{cle:'an',beat:7,scene:'horloge',set:{der:5,an:0},
  text:['Application numérique, une fois l’expression littérale écrite.','L’activité mesurée vaut 30 % de celle d’un bois vivant : <i>A</i>/<i>A</i><sub>0</sub> = 0,30.'],
  deriv:[
    {tex:tx`t=\dfrac{${TN(T14)}}{\ln 2}\times\ln\dfrac{1}{0{,}30}`,alt:`t = (${ent(T14)} / ln 2) × ln(1 / 0,30)`,r:`On remplace <i>t</i><sub>1/2</sub> = ${ent(T14)} ans et <i>A</i><sub>0</sub>/<i>A</i> = 1/0,30.`,p:{an:1}},
    {tex:tx`t\approx ${TN(T14/Math.LN2)}\ \text{ans}\times ${TN(Math.log(1/.3),3)}`,alt:`t ≈ ${ent(T14/Math.LN2)} ans × ${fr(Math.log(1/.3),3)}`,r:`${ent(T14)} / ln 2 ≈ ${ent(T14/Math.LN2)} ans, et ln(1/0,30) ≈ ${fr(Math.log(1/.3),3)}.`},
    {tex:tx`t\approx ${TN(sig3(AGE30))}\ \text{ans}`,alt:`t ≈ ${ent(sig3(AGE30))} ans`,r:`Entre une et deux demi-vies (${ent(T14)} et ${ent(2*T14)} ans), comme ton estimation. Un résultat qui contredit l’escalier signale une erreur de calcul.`}]},
{cle:'age',beat:7,scene:'horloge',set:{der:0,an:0,line:0,age:1},ctl:'age',
  text:['À toi : règle l’activité mesurée.','L’âge se calcule, l’escalier le vérifie.']},
{cle:'libby',beat:7,scene:'libby',tag:'1949 · Chicago',seq:[{p:{bars:1},d:2000}],
  text:()=>['Chicago, 1949. James Arnold et Willard Libby testent l’horloge sur des bois d’âge connu.','Les plus anciens viennent des tombes des pharaons Djéser et Snéfrou, datées par les historiens.',{t:`Le carbone 14 répond ${ent(LIBBY.c14[0])} ± ${LIBBY.c14[1]} ans : les intervalles se recouvrent, l’horloge marche.`,a:0,fort:true},{t:'Libby reçoit le prix Nobel de chimie en 1960.',a:0}]},
{cle:'v-c14',beat:7,scene:'horloge',set:{curve:1,st:1,r:30,line:0,age:0,der:0,an:0,irh:0,irc:0,xmax:40000},sujet:'dater avec le carbone 14',
  text:['Un charbon de bois a une activité égale à 25 % de celle d’un bois vivant.','Son âge est…'],
  verifie:{...VF([
    [`${ent(2*T14)} ans : deux demi-vies`,true,`Oui : 25 % = 1/4, donc on a divisé deux fois par 2. Avec la formule : <i>t</i> = (${ent(T14)} / ln 2) × ln 4 = 2 × ${ent(T14)} = ${ent(2*T14)} ans.`],
    [`${ent(T14)} ans : une demi-vie`,false,'Après une demi-vie, il resterait 50 %. 25 %, c’est la moitié de la moitié : deux demi-vies.'],
    [`${ent(4*T14)} ans : quatre demi-vies`,false,'Quatre demi-vies laisseraient 1/16, soit environ 6 %. Ici <i>A</i>/<i>A</i><sub>0</sub> = 1/4 = 1/2² : deux demi-vies, pas quatre.']]),reveal:[{p:{r:25,age:1},d:1100}]}},

/* ===== 8. ses limites ===== */
{cle:'irhoud',beat:8,scene:'horloge',tag:'Jebel Irhoud · Maroc',set:{line:0,age:0,der:0,an:0,irh:0,irc:0,xmax:40000},
  text:['Et pour des fossiles bien plus vieux ? Jebel Irhoud, près de Safi, au Maroc.',`En 2017, la revue <i>Nature</i> publie l’âge de fossiles d’<i>Homo sapiens</i> trouvés là : environ ${ent(IRHOUD)} ans.`,'Le carbone 14 aurait-il pu les dater ?'],
  pari:{reveal:[{p:{xmax:350000,irh:1},d:2400}],...BET([
    ['Oui, avec un meilleur détecteur','Aucun détecteur ne compte des noyaux disparus. Le calcul suit.'],
    ['Non : il n’en reste aucun noyau','Exact : il n’y a plus rien à compter. Le calcul suit.',1],
    ['Oui, mais très imprécis','Il n’y a plus rien à mesurer, même mal. Le calcul suit.']])}},
{cle:'irhoud2',beat:8,scene:'horloge',
  text:['Fais le calcul : que reste-t-il de carbone 14 après 315 000 ans ?'],
  deriv:[
    {tex:tx`\dfrac{${TN(IRHOUD)}}{${TN(T14)}}\approx ${TN(IRH_DV)}\ \text{demi-vies}`,alt:`${ent(IRHOUD)} / ${ent(T14)} ≈ ${fr(IRH_DV,0)} demi-vies`,r:`On compte combien de demi-vies tiennent dans ${ent(IRHOUD)} ans.`,p:{irc:1}},
    {tex:tx`\dfrac{N}{N_0}=\dfrac{1}{2^{${TN(IRH_DV)}}}\approx ${TS(IRH_FRAC)}`,alt:`N/N₀ = 1/2^${fr(IRH_DV,0)} ≈ ${sci(IRH_FRAC)}`,r:`Après ${fr(IRH_DV,0)} demi-vies, on a divisé ${fr(IRH_DV,0)} fois par 2.`,p:{irc:2}},
    {tex:tx`N\approx ${TS(N_C14_1G)}\times ${TS(IRH_FRAC)}`,alt:`N ≈ ${sci(N_C14_1G)} × ${sci(IRH_FRAC)}`,r:`Dans 1 g de carbone vivant : ${sci(N_C14_1G)} noyaux de carbone 14 (${fr(C14_PART*1e12,1)} pour 10${sup(12)} atomes de carbone, avec <i>N</i><sub>A</sub> = ${sci(NA,2)} mol${sup(-1)} et <i>M</i> = 12 g/mol).`,p:{irc:3}},
    {tex:tx`N\approx ${TS(IRH_RESTE)}`,alt:`N ≈ ${sci(IRH_RESTE)}`,r:'Il n’en reste même pas un seul noyau : plus rien à compter.'}]},
{cle:'thermo',beat:8,scene:'horloge',
  text:['Il a fallu une autre horloge : des silex chauffés par le feu.','La chaleur a remis leur compteur à zéro ; depuis, ils accumulent le rayonnement de la radioactivité naturelle autour d’eux (uranium, thorium, potassium 40).',{t:'On le lit par [[thermoluminescence]] : c’est ainsi que l’âge de Jebel Irhoud a été établi.',fort:true}]},
{cle:'v-limites',beat:8,scene:'horloge',sujet:'la limite du carbone 14',
  text:[`La demi-vie du carbone 14 est de ${ent(T14)} ans. Un fossile a ${ent(IRHOUD)} ans.`,'Pourquoi le carbone 14 ne peut-il pas le dater ?'],
  verifie:VF([
    [`Il n’en reste presque plus : ${fr(IRH_DV,0)} demi-vies, c’est diviser par 2${sup(fr(IRH_DV,0))}`,true,`Oui : il reste ${sci(IRH_FRAC)} de la quantité de départ, moins d’un noyau. Au-delà d’environ ${ent(LIM14)} ans, la mesure devient impraticable : il faut une autre horloge.`],
    [`Sa demi-vie est trop longue`,false,`C’est l’inverse : ${ent(T14)} ans est court devant ${ent(IRHOUD)} ans. Il s’est écoulé ${fr(IRH_DV,0)} demi-vies, et presque tout a disparu.`],
    [`Un fossile n’a jamais contenu de carbone 14`,false,`Tout être vivant échange du carbone avec l’air, donc contient du carbone 14 : c’est ce qui permet de dater. Mais ici, ${fr(IRH_DV,0)} demi-vies ont presque tout fait disparaître.`]])},

/* ===== 9. à toi ===== */
{cle:'q1',beat:9,scene:'quiz',set:{qi:0,rv:0},
  text:['Trois questions, chacune sur un piège classique du bac.','La première vient du QCM de 2023 : au bout de <i>t</i> = 2<i>t</i><sub>1/2</sub>, les noyaux désintégrés représentent, du nombre initial…'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'25 %',fb:'Piège classique : 25 %, c’est ce qui RESTE (<i>N</i><sub>0</sub>/4). Les noyaux désintégrés, ce sont tous les autres : 75 %.'},
    {t:'50 %',fb:'La moitié se désintègre pendant la première demi-vie seulement. Après deux, il reste <i>N</i><sub>0</sub>/4 : 75 % se sont désintégrés.'},
    {t:'75 %',ok:true,fb:'Oui : il reste <i>N</i><sub>0</sub>/4 = 25 %, donc 75 % se sont désintégrés. Le sujet de 2023 proposait 25 % : c’était l’affirmation fausse.'}]}},
{cle:'q2',beat:9,scene:'quiz',set:{qi:1,rv:0},
  text:['Un échantillon de radon 222 (<i>t</i><sub>1/2</sub> = 3,8 jours) existe déjà depuis 10 jours.','Combien de temps faut-il encore pour que ses noyaux restants soient divisés par 2 ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'Moins de 3,8 jours : il a déjà vieilli',fb:'Un noyau ne vieillit pas : il faut toujours 3,8 jours pour perdre la moitié de ce qui reste.'},
    {t:'3,8 jours',ok:true,fb:'Oui : la demi-vie ne dépend ni de l’âge de l’échantillon, ni du nombre de noyaux.'},
    {t:'Plus de 3,8 jours : il ne reste que les plus résistants',fb:'Les survivants n’ont rien de spécial, comme le dé qui avait survécu à 10 lancers. Encore 3,8 jours.'}]}},
{cle:'q3',beat:9,scene:'quiz',set:{qi:2,rv:0},
  text:['Un échantillon a une activité <i>A</i> = 8,0 × 10<sup>6</sup> Bq.','Le nombre <i>N</i> de noyaux radioactifs qu’il contient vaut…'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'8,0 × 10<sup>6</sup> noyaux',fb:'L’activité compte des désintégrations par seconde, pas des noyaux : <i>A</i> = λ<i>N</i>, donc <i>N</i> = <i>A</i>/λ, bien plus grand que <i>A</i>.'},
    {t:'<i>A</i> / λ',ok:true,fb:'Oui : <i>A</i> = λ<i>N</i>, donc <i>N</i> = <i>A</i>/λ, avec λ en s<sup>−1</sup> pour que <i>N</i> soit un nombre.'},
    {t:'λ × <i>A</i>',fb:'Vérifie les unités : λ<i>A</i> est en s<sup>−2</sup>, pas un nombre. <i>A</i> = λ<i>N</i>, donc <i>N</i> = <i>A</i>/λ.'}]}},
{cle:'fin',beat:9,scene:'end',seq:[{p:{n:4},d:2800,w:300}],
  text:['Fin de la séance. Voici ce que l’application retiendrait de toi.'],html:()=>profileHTML()}
];
// les étapes à geste : « Suivant » attend que l'élève ait lancé ses dés
STEPS.forEach(st=>{if(st.ctl==='tic')st.need=()=>Math.round(scenes.des.p.k)>=st.tic&&!rolling;});

// Un mot à fiche est un bouton : le navigateur peut passer à la ligne juste après lui et laisser « : » ou « . » seul
// en début de ligne (ni l'espace insécable ni le mot-joint n'y changent rien). Le bouton et la ponctuation qui le
// suit sont donc enfermés dans un <span class="nw"> (white-space: nowrap).
const pct=s=>typeof s==='string'?s.replace(/(\d) %/g,'$1\u202F%'):s;
const soude=s=>typeof s==='string'?pct(s).replace(/(\[\[[^\]]+\]\])( ?)([.,;:!?»)])/g,(m,mot,sp,pt)=>`<span class="nw">${mot}${sp?'\u202F':''}${pt}</span>`):s;
const soudePhrase=p=>typeof p==='string'?soude(p):{...p,t:soude(p.t)};
const soudeOpts=P=>{if(P&&P.opts)P.opts.forEach(o=>{o.t=pct(o.t);o.fb=soude(o.fb);});if(P&&P.apres&&P.apres.html)P.apres.html=soude(P.apres.html);};
STEPS.forEach(st=>{
  if(typeof st.text==='function'){const f=st.text;st.text=()=>{const v=f();return Array.isArray(v)?v.map(soudePhrase):soudePhrase(v);};}
  else st.text=(Array.isArray(st.text)?st.text:[st.text]).map(soudePhrase);
  if(st.deriv)st.deriv.forEach(x=>{x.r=soude(x.r);});
  soudeOpts(st.pari);soudeOpts(st.verifie);
});

/* ---------- les mots ---------- */
const mots={
  phosphorescent:{t:'phosphorescent',d:'Qui continue de luire un moment dans l’obscurité après avoir reçu de la lumière. Les sels d’uranium de Becquerel brillaient ainsi après une exposition au soleil.'},
  rayonnement:{t:'rayonnement',d:'De l’énergie, ou des particules, lancées par une source : on ne les voit pas, mais elles traversent la matière. Ici, le rayonnement traverse le papier noir et noircit la plaque.'},
  noyau:{t:'noyau',d:'Le centre de l’atome. Minuscule, il contient presque toute la masse de l’atome. Il est fait de protons (charge électrique +) et de neutrons (sans charge). Autour de lui tournent des électrons (charge −).',
    fig:`<svg viewBox="0 0 300 120" role="img" aria-label="Un noyau : des protons pleins et des neutrons creux">${noyauHTML(70,60,46,C_P,C_N14,10.5)}<circle cx="168" cy="40" r="9" class="prot" stroke-width="1.4"/><text x="186" y="46" class="t-lab s-ink">proton</text><circle cx="168" cy="82" r="9" class="neut" stroke-width="1.4"/><text x="186" y="88" class="t-lab s-ink">neutron</text></svg>`},
  desintegration:{t:'désintégration',d:'Un noyau instable se transforme en un autre noyau, en émettant un rayonnement. Le moment où cela arrive est imprévisible, et on ne peut pas revenir en arrière.'},
  radioactivite:{t:'radioactivité',d:'La propriété de certains noyaux de se désintégrer d’eux-mêmes en émettant un rayonnement. Le mot est dû à Marie et Pierre Curie.'},
  carbone14:{t:'carbone 14',d:`Une forme radioactive du carbone : ${C_P} protons et ${C_N14} neutrons dans le noyau. Il se désintègre en azote 14. Sa demi-vie est de ${ent(T14)} ans (valeur des sujets de bac).`},
  tic:{t:'tic',d:'Un instant de l’horloge de la simulation. À chaque tic, on lance tous les dés encore en jeu : le temps avance par pas réguliers.'},
  population:{t:'population',d:'Un grand nombre de noyaux (ou de dés) pris ensemble. Chaque noyau est imprévisible ; la population, elle, suit une loi.'},
  echantillon:{t:'échantillon',d:'Une quantité de matière que l’on étudie : un morceau de sel d’uranium, un fragment de charbon de bois… Il contient un très grand nombre de noyaux.'},
  demivie:{t:'demi-vie',d:'La durée au bout de laquelle la moitié des noyaux d’un échantillon se sont désintégrés. On la note <i>t</i><sub>1/2</sub>. Elle est propre à chaque sorte de noyau.'},
  exponentielle:{t:'exponentielle',d:'La fonction <i>x</i> ↦ e<sup><i>x</i></sup>, où e ≈ 2,718. Elle change les sommes en produits : e<sup><i>a</i>+<i>b</i></sup> = e<sup><i>a</i></sup> × e<sup><i>b</i></sup>. Avec un signe − dans l’exposant, e<sup>−<i>x</i></sup> décroît de 1 vers 0 sans jamais l’atteindre.'},
  ln:{t:'logarithme népérien',d:'La fonction ln, qui « défait » l’exponentielle : ln(e<sup><i>x</i></sup>) = <i>x</i>, et e<sup>ln <i>a</i></sup> = <i>a</i> pour <i>a</i> > 0. Elle change les produits en sommes : ln(<i>ab</i>) = ln <i>a</i> + ln <i>b</i>. C’est la leçon sur le logarithme.'},
  constanteradio:{t:'constante radioactive',d:'Le nombre λ de la loi <i>N</i>(<i>t</i>) = <i>N</i><sub>0</sub>e<sup>−λ<i>t</i></sup>. Pendant une très courte durée, un noyau a la chance λ × durée de se désintégrer. Plus λ est grand, plus la décroissance est rapide. Elle s’exprime en s<sup>−1</sup> (ou an<sup>−1</sup>).'},
  tau:{t:'constante de temps',d:`Le nombre τ = 1/λ, une durée caractéristique de la décroissance. À <i>t</i> = τ, il reste environ ${fr(100*Math.exp(-1),0)} % des noyaux.`},
  activite:{t:'activité',d:'Le nombre de désintégrations par seconde dans un échantillon, notée <i>A</i>. C’est ce que mesure un détecteur.'},
  becquerel:{t:'becquerel',d:'L’unité d’activité, nommée d’après Henri Becquerel : 1 Bq = 1 désintégration par seconde.'},
  isotope:{t:'isotope',d:'Des noyaux qui ont le même nombre de protons (donc le même élément chimique) mais un nombre de neutrons différent. Le carbone 12 et le carbone 14 sont deux isotopes du carbone.',
    fig:`<svg viewBox="0 0 300 130" role="img" aria-label="Carbone 12 : 6 protons et 6 neutrons ; carbone 14 : 6 protons et 8 neutrons">${noyauHTML(70,56,40,C_P,C_N12,9)}${noyauHTML(220,56,40,C_P,C_N14,9)}<text x="70" y="120" text-anchor="middle" class="t-lab s-ink">carbone 12</text><text x="220" y="120" text-anchor="middle" class="t-lab s-ink">carbone 14</text></svg>`},
  thermoluminescence:{t:'thermoluminescence',d:'Méthode de datation : un cristal chauffé (un silex par exemple) libère en lumière l’énergie qu’il a accumulée sous l’effet de la radioactivité naturelle. Plus il en rend, plus il l’a accumulée longtemps.'}
};

Object.values(mots).forEach(m=>{m.d=pct(m.d);});

/* ---------- le profil de fin ---------- */
const bet=k=>{const st=STEPS.find(s=>s.cle===k),j=S.first[k];return (!st||j==null)?null:!!st.pari.opts[j].juste;};
function profileHTML(){
  const Q=[['q1','désintégrés ou restants'],['q2','la demi-vie ne dépend pas de l’âge'],['q3','activité et nombre de noyaux']];
  const res=Q.map(([k])=>ctx.juste(k));
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]}</li>`).join('');
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>ctx.juste(s.k)!=null),vok=V.filter(s=>ctx.juste(s.k)===true),vko=V.filter(s=>ctx.juste(s.k)===false);
  const weak=[...res.map((ok,i)=>ok===false?Q[i][1]:null),...vko.map(s=>s.sujet)].filter(Boolean).slice(0,3);
  const bets=[];
  const d=bet('duel');if(d!=null)bets.push(d?'tu savais déjà qu’un noyau ne vieillit pas':'l’idée du noyau qui « s’use » t’a tenté au départ');
  const m=bet('marche2');if(m!=null)bets.push(m?'la marche de même largeur t’a paru évidente':'la marche de même largeur t’a surpris');
  const t=bet('pari10');if(t!=null)bets.push(t?'tu as bien estimé tes 10 tics':'tes 10 tics t’ont surpris');
  if(S.moveN0)bets.push('tu as vérifié toi-même que la demi-vie ne dépend pas de N₀');
  const ir=bet('irhoud');if(ir!=null)bets.push(ir?'tu as vu tout de suite la limite du carbone 14':'la limite du carbone 14 t’a surpris');
  const plan=(weak.length?weak.map(w=>`<li>8 exercices courts sur « ${w} », du plus simple au niveau bac</li>`).join(''):'<li>Aucune erreur : on passe directement au niveau bac</li>')
    +'<li>1 exercice complet au format bac : l’iode 131 (sujet 2022) — lire la demi-vie sur la courbe, calculer <i>N</i><sub>0</sub>, trouver l’instant où 95 % des noyaux sont désintégrés</li><li>Dans 3 jours : 4 questions de rappel sur cette séance</li>';
  return ty(`<ul class="prof">${rows}</ul>${vu.length?`<p class="small">Questions « Vérifie » réussies du premier coup : ${vok.length} sur ${vu.length}.</p>`:''}${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}<div class="next"><div class="pari-k">Ta prochaine séance, générée pour toi</div><ol>${plan}</ol></div><p class="small">Aperçu de l’idée : la génération d’exercices n’est pas branchée dans ce prototype.</p>`);
}

/* ---------- contrôles par étape ---------- */
S.moveN0=false;S.moveF=false;S.ageMoved=false;S.kmax=0;
const CTL={
  tic:{html:st=>`<div class="ctl-btns"><button type="button" class="ctl-btn" id="tic">Lancer les dés</button>${st.tic>1?`<button type="button" class="ctl-btn alt" id="rafale">Lancer jusqu’au tic ${st.tic}</button>`:''}</div><p class="ctl-note" id="ticfb"></p>`,
    init(st){const sc=scenes.des,b=$('#tic'),r=$('#rafale'),fb=$('#ticfb');let lastH='';
      // revenir sur une étape déjà faite : les dés de l'élève sont là où il les avait menés (les tirages ne changent pas)
      if((S.kmax||0)>=st.tic){st.base={...st.base,k:st.tic};sc.p.k=st.tic;sc.p.roll=0;sc.p.leave=1;sc.render();}
      const sync=()=>{const k=Math.round(sc.p.k),fini=k>=st.tic,ae=document.activeElement;b.disabled=fini;if(r)r.disabled=fini;const h=ty(st.note(clamp(k,0,st.tic)));if(h!==lastH){fb.innerHTML=h;lastH=h;}
        majSuivant();
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

// (le noyau fait défiler l'explication, la ligne de calcul et la fiche de mot au-dessus de la barre)

return {BEATS,STEPS,CTL,mots,
  reset(){S.moveN0=S.moveF=S.ageMoved=false;S.kmax=0;},
  plain:s=>s.replace(/λ/g,' lambda ').replace(/τ/g,' tau ').replace(/ %/g,' pour cent').replace(/\bln\b/g,'l n').replace(/N₀/g,'N zéro'),
  // la touche L lance les dés, sur les étapes à geste
  touche(e,st){if(st&&st.ctl==='tic'&&(e.key==='l'||e.key==='L')&&hooks.lancer){e.preventDefault();hooks.lancer();return true;}return false;},
  demonter(){ep++;rolling=false;}};
});
}
