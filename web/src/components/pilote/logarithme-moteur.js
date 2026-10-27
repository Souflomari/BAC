/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Fonction logarithme népérien », séance 1 « Pourquoi ln » (V3, refonte 2026-10 :
 * docs/refonte/05-audit-v2-plan-v3.md §3.1, §3.2, §4).
 *
 * Onze parties : ce qu'il faut savoir (les puissances, un test pour passer le rappel),
 * l'énigme de Napier, la table des puissances de 2, les trous et les pas de 1 %, la règle à
 * calcul, l'aire sous l'hyperbole (et les pas de l'élève à côté des aires), la dérivée et la
 * définition du bac, ce que dit la courbe de ln (e, à gauche de 1, l'ensemble de définition,
 * le signe, la croissance), les règles de ln (chacune avec un pari ou un geste, et le retour à
 * l'énigme), une équation du bac commentée, puis le bilan (trois pièges des copies).
 * Les limites, (ln u)′ et l'étude complète forment la séance 2, annoncée au bilan.
 *
 * Les scènes et le script vivent ici ; le déroulé, le panneau, les questions et la voix
 * vivent dans `noyau.js`. Aucune couleur littérale : les classes de pilote.css seulement.
 */
import { monterLecon } from "./noyau";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,lerp,clamp,fr,ty,show,svgPt,scene,scenes,hooks,S}=ctx;
const LN=Math.log, E_=Math.E;
function integ(x1,x2){const n=400,h=(x2-x1)/n;let s=1/x1+1/x2;for(let i=1;i<n;i++)s+=(i%2?4:2)/(x1+i*h);return s*h/3;}
const disc=v=>Math.round(v);

/* ---------- outils de scène ---------- */
// texte de scène : _x_ en italique, ^{…} en exposant (un tspan décalé : jamais d'exposant Unicode)
function rich(t,str){
  str=ty(str);if(t.__s===str)return;t.__s=str;t.textContent='';
  const su=t.__sup||16;let haut=false;
  String(str).split(/(_[^_]+_|\^\{[^}]*\})/).forEach(part=>{if(!part)return;
    const sp=E('tspan',{},t);
    if(part.startsWith('^{')){let s=part.slice(2,-1);if(/^_.+_$/.test(s)){s=s.slice(1,-1);sp.setAttribute('font-style','italic');}
      sp.textContent=s;sp.setAttribute('font-size',su);sp.setAttribute('dy',(-su*.72).toFixed(1));haut=true;return;}
    if(haut){sp.setAttribute('dy',(su*.72).toFixed(1));haut=false;}
    if(part[0]==='_'&&part.length>2){sp.textContent=part.slice(1,-1);sp.setAttribute('font-style','italic');}
    else sp.textContent=part;});
}
function RT(parent,x,y,str,cls,anchor,sup){const t=E('text',{x,y,class:cls,'text-anchor':anchor||'start'},parent);t.__sup=sup;rich(t,str);return t;}
const T=(parent,x,y,str,cls,anchor)=>E('text',{x,y,class:cls,'text-anchor':anchor||'start',text:ty(str)},parent);
function chemin(f,x1,x2,X,Y,n=300,ymin=-1e9,ymax=1e9){let d='';for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,y=clamp(f(x),ymin,ymax);d+=(i?'L':'M')+X(x).toFixed(1)+' '+Y(y).toFixed(1);}return d;}
// l'aire sous 1/x de x1 à x2, éventuellement étirée (sx) et écrasée (sy), coupée en haut à ymax
function region(X,Y,x1,x2,sx=1,sy=1,ymax=1e9){if(x2<x1)[x1,x2]=[x2,x1];const n=60;let d=`M${X(x1*sx).toFixed(1)} ${Y(0).toFixed(1)}`;for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n;d+=`L${X(x*sx).toFixed(1)} ${Y(Math.min(ymax,sy/x)).toFixed(1)}`;}return d+`L${X(x2*sx).toFixed(1)} ${Y(0).toFixed(1)}Z`;}
// l'étiquette d'une aire : dedans si la bande est assez haute, au-dessus sinon
function posLab(X,Y,k,x1,x2){const mid=(x1+x2)/2,hm=1/mid,h=Y(0)-Y(hm);return [X(mid),h>56?Y(hm/2)+7:Y(hm)-14];}

/* ---------- 0. ce qu'il faut savoir : les puissances ---------- */
scene('savoir',{
  p:{q:0,qr:0,r1:0,blk:0,join:0,res:0},
  build(g){
    T(g,60,72,'Ce qu’il faut savoir : les puissances','t-titre s-ink');
    T(g,60,98,'le seul outil dont la leçon a besoin','t-sous');
    this.qg=E('g',{},g);
    RT(this.qg,560,370,'2^{4} × 2^{3} =','t-big2 s-ink','end',18);
    this.qm=E('text',{x:584,y:370,class:'t-big2 s-ink',text:'?'},this.qg);
    this.qa=RT(this.qg,584,370,'2^{7} = 128','t-big2 s-a','start',18);
    this.r1=E('g',{},g);
    RT(this.r1,500,212,'2^{3} = 2 × 2 × 2 = 8','t-big2 s-ink','middle',18);
    T(this.r1,500,248,'l’exposant 3 compte les facteurs','t-sous','middle');
    this.boxes=[];
    for(let i=0;i<5;i++){const bg=E('g',{},g);E('rect',{x:0,y:316,width:64,height:64,rx:2,class:i<2?'cell':'cell hl-a'},bg);E('text',{x:32,y:359,class:'t-big2 s-ink','text-anchor':'middle',text:'2'},bg);this.boxes.push(bg);}
    this.fois=E('text',{x:505,y:359,class:'t-big2 s-dim','text-anchor':'middle',text:'×'},g);
    this.lA=RT(g,389,446,'2^{2}','t-big2 s-ink','middle',18);
    this.lB=RT(g,658,446,'2^{3}','t-big2 s-ink','middle',18);
    this.lR=RT(g,500,446,'2^{5} = 32','t-big2 s-a','middle',18);
    this.lR2=T(g,500,482,'2 + 3 = 5 facteurs : on additionne les exposants','t-sous','middle');
  },
  render(){
    const p=this.p,j=clamp(p.join,0,1),x0=320;
    show(this.qg,p.q);show(this.qm,1-p.qr);show(this.qa,p.qr);
    show(this.r1,p.r1);
    this.boxes.forEach((b,i)=>{const x=x0+i*74+(i>=2?84*(1-j):0),o=clamp(p.blk*5-i,0,1);b.setAttribute('transform',`translate(${x.toFixed(1)} ${((1-o)*10).toFixed(1)})`);b.style.opacity=o;});
    show(this.fois,clamp(p.blk*5-2,0,1)*(1-j));
    show(this.lA,p.blk*(1-j));show(this.lB,p.blk*(1-j));
    show(this.lR,p.res);show(this.lR2,p.res);
  }
});

/* ---------- 1. l'énigme : le cahier de calcul ---------- */
scene('ledger',{
  p:{mul:1,mx:0,rows:0,res:0,add:0,addc:0,q:0},
  build(g){
    const A=2718281,B=3141592,R=470,CW=18;
    this.cap=T(g,0,72,'Une multiplication d’astronome, à la main','t-titre s-ink','middle');
    this.mg=E('g',{},g);
    E('text',{x:R,y:150,class:'mono t-big s-ink','text-anchor':'end',text:String(A)},this.mg);
    E('text',{x:R,y:196,class:'mono t-big s-ink','text-anchor':'end',text:'× '+B},this.mg);
    E('line',{x1:R-290,x2:R,y1:214,y2:214,class:'k-dim','stroke-width':2},this.mg);
    const digits=String(B).split('').reverse().map(Number);
    this.rowEls=digits.map((d,i)=>E('text',{x:R-i*CW,y:252+i*40,class:'mono t-big s-ink','text-anchor':'end',text:String(A*d)},this.mg));
    this.resG=E('g',{},this.mg);
    E('line',{x1:R-290,x2:R,y1:512,y2:512,class:'k-dim','stroke-width':2},this.resG);
    E('text',{x:R,y:552,class:'mono t-big s-ink','text-anchor':'end',text:String(A*B)},this.resG);
    T(this.resG,R,598,'49 produits · 7 lignes décalées · des retenues','t-lab s-dim','end');
    this.ag=E('g',{},g);
    const RA=880;this.RA=RA;
    E('line',{x1:560,x2:560,y1:130,y2:600,class:'k-line'},this.ag);
    E('text',{x:RA,y:252,class:'mono t-big s-ink','text-anchor':'end',text:String(A)},this.ag);
    E('text',{x:RA,y:292,class:'mono t-big s-ink','text-anchor':'end',text:'+ '+B},this.ag);
    E('line',{x1:RA-200,x2:RA,y1:310,y2:310,class:'k-dim','stroke-width':2},this.ag);
    const clip=E('clipPath',{id:'lg-somme'},g);this.clipR=E('rect',{y:316,height:46,x:RA,width:0},clip);
    this.sumT=E('text',{x:RA,y:350,class:'mono t-big s-ink','text-anchor':'end','clip-path':'url(#lg-somme)',text:String(A+B)},this.ag);
    this.addc=T(this.ag,RA,398,'7 additions de chiffres · une ligne','t-lab s-dim','end');
    this.qg=E('g',{},g);
    const t=RT(this.qg,500,390,'_f_ (_a_ × _b_) = _f_ (_a_) + _f_ (_b_)','t-huge s-ink','middle');
    E('tspan',{class:'s-a',text:' ?'},t);
    T(this.qg,500,450,'une fonction qui change les produits en sommes','t-lab s-dim','middle');
  },
  render(){
    const p=this.p,dim=1-p.q;
    this.mg.setAttribute('transform',`translate(${(175*(1-p.mx)).toFixed(1)} 0)`);
    this.cap.setAttribute('x',lerp(500,325,p.mx));
    show(this.mg,p.mul*dim);show(this.cap,dim);
    this.rowEls.forEach((t,i)=>{const o=clamp(p.rows-i,0,1);t.style.opacity=o;t.setAttribute('transform',`translate(0 ${((1-o)*10).toFixed(1)})`);});
    show(this.resG,p.res);show(this.ag,clamp(p.add,0,1)*dim);
    // la somme se pose chiffre par chiffre, de droite à gauche
    const w=this.sumT.getComputedTextLength()||126,k=Math.floor(clamp(p.add-1,0,7)+1e-6);
    this.clipR.setAttribute('x',(this.RA-w*k/7-2).toFixed(1));this.clipR.setAttribute('width',(w*k/7+6).toFixed(1));
    show(this.addc,p.addc*dim);show(this.qg,p.q);
  }
});

/* ---------- 2. la table des puissances de 2 ---------- */
scene('table',{
  p:{cells:0,arrA:0,arrB:0,log:0,gap:0,inter:0,pick:[],demo:0,da:2,db:3},
  build(g){
    const X=i=>52+i*82;this.X=X;
    this.capTop=T(g,52,180,'Pas — on avance en ajoutant 1','t-lab s-dim');
    this.capLog=T(g,52,180,'Logarithme — le nombre de pas','t-titre s-ink');
    this.capBot=T(g,52,534,'Valeur — on avance en multipliant par 2','t-lab s-dim');
    this.arcA=[];this.arcB=[];
    for(let i=0;i<10;i++){
      const x1=X(i)+38,x2=X(i+1)+38,m=(x1+x2)/2;
      const a=E('g',{},g);E('path',{d:`M${x1+8} 240 Q${m} 212 ${x2-8} 240`,class:'k-a nofill','stroke-width':1.5,'marker-end':'url(#arw)'},a);E('text',{x:m,y:214,class:'t-lab s-a','text-anchor':'middle',text:'+1'},a);this.arcA.push(a);
      const b=E('g',{},g);E('path',{d:`M${x1+8} 460 Q${m} 488 ${x2-8} 460`,class:'k-b nofill','stroke-width':1.5,'marker-end':'url(#arw)'},b);E('text',{x:m,y:502,class:'t-lab s-ink','text-anchor':'middle',text:'×2'},b);this.arcB.push(b);
    }
    this.cells=[];
    for(let i=0;i<=10;i++){
      const cg=E('g',{},g);
      const top=E('rect',{x:X(i),y:245,width:76,height:80,rx:2,class:'cell'},cg);
      E('text',{x:X(i)+38,y:296,class:'mono t-mid s-ink','text-anchor':'middle','pointer-events':'none',text:String(i)},cg);
      E('line',{x1:X(i)+38,x2:X(i)+38,y1:325,y2:375,class:'k-line'},cg);
      const bot=E('rect',{x:X(i),y:375,width:76,height:80,rx:2,class:'cell'},cg);
      E('text',{x:X(i)+38,y:426,class:'mono t-mid s-ink','text-anchor':'middle','pointer-events':'none',text:String(2**i)},cg);
      bot.addEventListener('click',()=>this.click(i));
      this.cells.push({cg,top,bot});
    }
    this.ghost=E('g',{},g);
    [[1,'3'],[2,'5  6  7']].forEach(([i,t])=>{const x=X(i)+79;E('line',{x1:x,x2:x,y1:514,y2:560,class:'k-c','stroke-dasharray':'4 5','stroke-width':1.5},this.ghost);E('text',{x,y:592,class:'mono t-mid s-c','text-anchor':'middle',text:t},this.ghost);});
    T(this.ghost,52,640,'Ces nombres n’ont pas de case. Ni 9 à 15, ni 17 à 31… La table est trouée.','t-lab s-c');
    // deux faits, deux éléments séparés (« 4 → pas 2 » et « 8 → pas 3 » ne se collent jamais)
    this.bA=E('text',{x:52,y:604,class:'t-cle s-ink'},g);
    this.bB=E('text',{x:340,y:604,class:'t-cle s-ink'},g);
    this.b2=E('text',{x:52,y:652,class:'t-cle s-ink'},g);
  },
  click(i){
    if(!this.p.inter)return;
    this.p.pick=this.p.pick.length>=2?[i]:[...this.p.pick,i];
    this.render();hooks.onPick&&hooks.onPick(this.p.pick);
  },
  render(){
    const p=this.p,pk=p.pick||[],d=disc(p.demo),da=disc(p.da),db=disc(p.db);
    this.cells.forEach((c,i)=>{
      const o=clamp(p.cells-i,0,1);c.cg.style.opacity=o;c.cg.setAttribute('transform',`translate(0 ${((1-o)*14).toFixed(1)})`);
      c.bot.style.cursor=p.inter?'pointer':'default';
      let tc='cell',bc='cell';
      if(p.inter){if(pk.includes(i)){tc+=' hl-b';bc+=' hl-b';}if(pk.length===2&&i===pk[0]+pk[1]){tc+=' hl-a';bc+=' hl-a';}}
      else if(d>=1){if(i===da||i===db){tc+=' hl-b';bc+=' hl-b';}if(d>=3&&i===da+db)tc+=' hl-a';if(d>=4&&i===da+db)bc+=' hl-a';}
      else if(p.log>.5)tc+=' hl-log';
      c.top.setAttribute('class',tc);c.bot.setAttribute('class',bc);
    });
    const on=clamp(p.cells,0,1),all=clamp(p.cells-10,0,1),fade=1-.8*p.gap;
    this.arcA.forEach((a,i)=>show(a,clamp(p.arrA-i,0,1)*fade));
    this.arcB.forEach((b,i)=>show(b,clamp(p.arrB-i,0,1)*fade));
    show(this.capTop,on*(1-p.log));show(this.capLog,p.log);
    show(this.capBot,all*(1-p.gap));show(this.ghost,p.gap);
    let a='',b='',c='',o=0;
    if(p.inter){o=1;
      if(pk.length===1)a=`${2**pk[0]} → pas ${pk[0]}`;
      else if(pk.length===2){const[i,j]=pk,s=i+j;a=s<=10?`${2**i} × ${2**j} → pas ${i} + ${j} = ${s} → ${2**s}`:`pas ${i} + ${j} = ${s} : hors de la table`;}
    }else if(d>=1){o=1;a=`${2**da} → pas ${da}`;b=`${2**db} → pas ${db}`;if(d>=2)c=`${da} + ${db} = ${da+db} pas`;if(d>=4)c+=` → ${2**(da+db)}`;}
    else if(p.log>0){o=p.log*(1-p.gap);a='512 est au pas 9 : neuf doublements mènent de 1 à 512';}
    this.bA.textContent=ty(a);this.bB.textContent=ty(b);this.b2.textContent=ty(c);
    [this.bA,this.bB,this.b2].forEach(t=>show(t,o));
    this.bA.setAttribute('class',p.inter&&pk.length<2?'t-cle s-dim':'t-cle s-ink');
  }
});

/* ---------- 3. des pas minuscules : 1,01^k ---------- */
const MARQUES=[[70,'a'],[140,'b'],[110,'a'],[196,'b'],[306,'c']];
scene('fine',{
  p:{pts:0,m70:0,m140:0,m110:0,m196:0,m306:0,sumA:0,sumB:0},
  build(g){
    const K=323,L=110,R=930,TOP=86,B=560;this.K=K;this.L=L;this.B=B;
    const xa=k=>L+(R-L)*k/330,ya=v=>B-(B-TOP)*v/25;this.xa=xa;this.ya=ya;
    this.vals=[];for(let k=0;k<=K;k++)this.vals.push(1.01**k);
    E('line',{x1:L,y1:B,x2:R+12,y2:B,class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:L,y1:B,x2:L,y2:TOP-12,class:'k-dim','stroke-width':1.5},g);
    for(let k=0;k<=300;k+=50){E('line',{x1:xa(k),x2:xa(k),y1:B,y2:B+6,class:'k-dim'},g);E('text',{x:xa(k),y:B+24,class:'t-tick s-dim','text-anchor':'middle',text:k},g);}
    for(let v=5;v<=25;v+=5){E('line',{x1:L-6,x2:L,y1:ya(v),y2:ya(v),class:'k-dim'},g);E('text',{x:L-12,y:ya(v)+5,class:'t-tick s-dim','text-anchor':'end',text:v},g);}
    RT(g,R,B+100,'nombre de pas _k_ — on ajoute 1','t-lab s-dim','end');
    RT(g,L+14,TOP-28,'valeur 1,01^{_k_} — on multiplie par 1,01','t-lab s-dim','start',15);
    const pg=E('g',{},g);this.dots=this.vals.map(()=>E('circle',{r:2.6,class:'s-ink'},pg));
    this.marks={};
    MARQUES.forEach(([k,c])=>{const mg=E('g',{},g),v=1.01**k,x=xa(k),y=ya(v);
      E('line',{x1:x,x2:x,y1:y,y2:B,class:'k-'+c,'stroke-dasharray':'5 6','stroke-width':1.5},mg);
      E('line',{x1:L,x2:x,y1:y,y2:y,class:'k-'+c,'stroke-dasharray':'5 6','stroke-width':1.5},mg);
      E('circle',{cx:x,cy:y,r:7,class:'s-'+c},mg);
      E('text',{x:x-14,y:y-16,'text-anchor':'end',class:'t-lab2 s-'+c,text:`${k} pas → ${fr(v)}`},mg);this.marks[k]=mg;});
    // les pas mis bout à bout : 110, puis 196, arrivent à 306
    this.barA=E('line',{x1:L,x2:xa(110),y1:B+44,y2:B+44,class:'k-a','stroke-width':7},g);
    this.barAL=E('text',{x:(L+xa(110))/2,y:B+72,class:'t-lab2 s-a','text-anchor':'middle',text:'110 pas'},g);
    this.barB=E('g',{},g);
    E('line',{x1:0,x2:xa(196)-L,y1:0,y2:0,class:'k-b','stroke-width':7},this.barB);
    E('text',{x:(xa(196)-L)/2,y:28,class:'t-lab2 s-b','text-anchor':'middle',text:'+ 196 pas'},this.barB);
    this.sumL=E('text',{x:xa(306)+12,y:B+50,class:'t-lab2 s-c',text:'= 306 pas'},g);
  },
  render(){
    const p=this.p,n=p.pts*(this.K+1),L=this.L,B=this.B,xa=this.xa;
    for(let k=0;k<=this.K;k++){const d=this.dots[k];d.setAttribute('cx',xa(k).toFixed(1));d.setAttribute('cy',this.ya(this.vals[k]).toFixed(1));d.style.opacity=clamp(n-k,0,1);}
    MARQUES.forEach(([k])=>show(this.marks[k],p['m'+k]));
    show(this.barA,p.sumA);show(this.barAL,p.sumA);
    this.barB.setAttribute('transform',`translate(${(L+p.sumB*(xa(110)-L)).toFixed(1)} ${(B+44+(1-p.sumB)*44).toFixed(1)})`);
    show(this.barB,clamp(p.sumA*2-1,0,1));show(this.sumL,clamp(p.sumB*3-2,0,1));
  }
});

/* ---------- 4. la règle à calcul ---------- */
scene('rule',{
  p:{la:0,lb:0,cur:0,read:0,drag:0,eqd:0},
  build(g){
    const x0=90,L=820;this.x0=x0;this.L=L;const pos=v=>x0+L*Math.log10(v);this.pos=pos;
    const clip=E('clipPath',{id:'lg-regle'},g);E('rect',{x:40,y:200,width:920,height:320},clip);
    const corps=E('g',{'clip-path':'url(#lg-regle)'},g);
    E('rect',{x:40,y:365,width:920,height:72,rx:2,class:'rulebody'},corps);
    this.ticks(corps,365,1);
    this.C=E('g',{class:'grab'},corps);
    E('rect',{x:x0-52,y:290,width:L+104,height:72,rx:2,class:'rulebody'},this.C);
    this.hautLabs=[];this.ticks(this.C,362,-1,this.hautLabs);
    this.eq=E('g',{},g);
    [[1,2],[2,4],[4,8]].forEach(([a,b])=>{const m=(pos(a)+pos(b))/2;E('path',{d:`M${pos(a)+3} 284 Q${m} 246 ${pos(b)-3} 284`,class:'k-a nofill','stroke-width':2,'marker-end':'url(#arw)'},this.eq);E('text',{x:m,y:252,class:'t-titre s-a','text-anchor':'middle',text:'×2'},this.eq);});
    T(this.eq,500,212,'chaque doublement occupe la même longueur','t-lab s-dim','middle');
    this.cg=E('g',{class:'grab'},g);
    E('rect',{x:-18,y:262,width:36,height:200,rx:2,class:'glass'},this.cg);
    E('line',{x1:0,x2:0,y1:254,y2:470,class:'k-c','stroke-width':1.8},this.cg);
    this.bLab=E('text',{x:0,y:244,class:'t-titre s-ink','text-anchor':'middle'},this.cg);
    this.am=E('g',{},g);
    E('path',{d:'M0 444l-8 14h16z',class:'s-a'},this.am);
    this.aLab=E('text',{x:0,y:484,class:'t-titre s-a','text-anchor':'middle'},this.am);
    this.read=E('text',{x:500,y:600,class:'t-cle s-ink','text-anchor':'middle'},g);
    const drag=(el,key)=>el.addEventListener('pointerdown',e=>{
      if(!this.p.drag)return;e.preventDefault();el.setPointerCapture(e.pointerId);ctx.stop();
      const xd=svgPt(e).x,v0=this.p[key];
      const mv=ev=>{this.p[key]=clamp(v0+(svgPt(ev).x-xd)/this.L,0,1);this.p.lb=Math.min(this.p.lb,1-this.p.la);this.render();hooks.frame&&hooks.frame();};
      const up=()=>{el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);};
      el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);});
    drag(this.C,'la');drag(this.cg,'lb');
  },
  ticks(par,base,dir,labs){
    for(let i=10;i<=100;i++){const v=i/10,x=this.pos(v),major=i%10===0,half=i%5===0,len=major?26:half?16:9;
      E('line',{x1:x,x2:x,y1:base,y2:base+dir*len,class:'k-ink','stroke-width':major?1.6:1},par);
      if(major){const t=E('text',{x,y:dir>0?base+len+22:base-len-8,class:'mono t-lab s-ink','text-anchor':'middle',text:String(v)},par);if(labs)labs.push({t,x});}}
  },
  render(){
    const p=this.p,a=10**p.la,b=10**p.lb,dx=this.L*p.la;
    this.C.setAttribute('transform',`translate(${dx.toFixed(2)} 0)`);
    // un chiffre de la règle du haut qui sortirait de la fenêtre s'efface au lieu d'être coupé
    this.hautLabs.forEach(({t,x})=>{t.style.opacity=x+dx>944?0:1;});
    this.cg.setAttribute('transform',`translate(${(this.x0+this.L*(p.la+p.lb)).toFixed(2)} 0)`);show(this.cg,p.cur);
    this.C.style.cursor=this.cg.style.cursor=p.drag?'grab':'default';
    this.bLab.textContent=`b = ${fr(b)}`;
    this.am.setAttribute('transform',`translate(${(this.x0+this.L*p.la).toFixed(2)} 0)`);show(this.am,Math.max(p.read,p.drag));
    this.aLab.textContent=`a = ${fr(a)}`;
    this.read.textContent=`${fr(a)} × ${fr(b)} ≈ ${fr(a*b)}`;show(this.read,p.read);
    show(this.eq,p.eqd);
  }
});

/* ---------- 5-6. l'aire sous 1/x, la dérivée, puis ln ---------- */
const TABLEAU=[[2,70],[3,110],[4,140],[7,196],[21,306]];
scene('hyper',{
  p:{curve:0,pts2:0,A1:0,A2:0,A3:0,lab:0,tgt:0,m:0,pt:0,sx:1,sy:1,gen:0,a:2.4,b:1.8,dec:0,decB:0,va:0,strip:0,xs:2.5,h:1.4,lnc:0,z1:0,dl:0,seg:0,tan:0,xt:1.2,tab:0,tab3:0,tabAll:0},
  build(g){
    const X=x=>90+98*x,Y=y=>580-200*y;this.X=X;this.Y=Y;
    E('line',{x1:X(0),x2:X(8.85),y1:Y(0),y2:Y(0),class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:X(0),x2:X(0),y1:Y(0),y2:Y(2.4),class:'k-dim','stroke-width':1.5},g);
    for(let i=1;i<=8;i++){E('line',{x1:X(i),x2:X(i),y1:Y(0),y2:Y(0)+6,class:'k-dim'},g);E('text',{x:X(i),y:Y(0)+24,class:'t-tick s-dim','text-anchor':'middle',text:i},g);}
    [[.5,'0,5'],[1,'1'],[1.5,'1,5'],[2,'2']].forEach(([v,t])=>{E('line',{x1:X(0)-6,x2:X(0),y1:Y(v),y2:Y(v),class:'k-dim'},g);E('text',{x:X(0)-12,y:Y(v)+5,class:'t-tick s-dim','text-anchor':'end',text:t},g);});
    this.r={};['A1','A2','A3','t3','vA','vB','dl','g1','d0','g2','mv','base','strip'].forEach(k=>this.r[k]=E('path',{class:'reg'},g));
    this.tgt=E('path',{class:'k-ink nofill','stroke-dasharray':'7 6','stroke-width':1.6},g);
    this.mvO=E('path',{class:'k-a nofill','stroke-width':1.4},g);
    this.box=E('path',{class:'k-ink nofill','stroke-width':1.6},g);
    this.cv=E('path',{d:chemin(x=>1/x,.43,8.85,X,Y),class:'k-ink nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    // ln en rouge, 1/x en noir : deux courbes, deux couleurs. À gauche de 1, la courbe de ln
    // attend la partie « La courbe de ln ».
    this.lnv=E('path',{d:chemin(LN,1,8.85,X,Y),class:'k-a nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.cvLab=RT(g,X(.62)+16,Y(1/.62),'_y_ = 1/_x_','t-lab2 s-ink');
    this.lnLab=RT(g,X(7.6),Y(LN(7.6))+36,'_y_ = ln _x_','t-lab2 s-a','middle');
    // trois points : quand x double, la hauteur est divisée par 2
    this.p2=E('g',{},g);
    [[1,'1'],[2,'1/2'],[4,'1/4']].forEach(([x,t])=>{E('line',{x1:X(x),x2:X(x),y1:Y(0),y2:Y(1/x),class:'k-ink','stroke-dasharray':'4 5','stroke-width':1.5},this.p2);E('circle',{cx:X(x),cy:Y(1/x),r:6,class:'s-ink'},this.p2);E('text',{x:X(x)+12,y:Y(1/x)-12,class:'t-lab2 s-ink',text:`hauteur ${t}`},this.p2);});
    RT(this.p2,X(4.6),Y(1.15),'_x_ double → la hauteur est divisée par 2','t-lab s-dim');
    this.L={};['A1','A2','A3','vA','vB','g1','g2'].forEach(k=>this.L[k]=E('text',{class:'t-lab2 s-ink','text-anchor':'middle'},g));
    this.dLab=RT(g,0,0,'','t-lab2 s-ink','middle');this.bLab=RT(g,0,0,'','t-lab2 s-ink','middle');
    // la copie qu'on étire puis qu'on écrase, et le point suivi
    this.mvLab=E('text',{class:'t-lab2 s-ink','text-anchor':'middle'},g);
    this.ptG=E('g',{},g);this.ptGap=E('line',{class:'k-ink','stroke-dasharray':'4 4','stroke-width':2},this.ptG);this.ptC=E('circle',{r:8,class:'s-ink'},this.ptG);
    this.ptT=E('text',{class:'t-lab2 s-ink'},this.ptG);this.ptT2=E('text',{class:'t-lab s-ink'},this.ptG);
    this.arrow=E('path',{class:'k-dim nofill','stroke-width':1.6,'marker-end':'url(#arw)'},g);
    this.arrowLab=RT(g,0,0,'étirer ×_a_, écraser ÷_a_','t-lab s-dim','middle');
    this.mk={};
    [['a','_a_'],['b','_b_'],['ab','_ab_'],['x','_x_']].forEach(([k,t])=>{const mg=E('g',{},g);E('line',{x1:0,x2:0,y1:Y(0)-6,y2:Y(0)+8,class:'k-ink','stroke-width':2},mg);this.mk[k]={g:mg,t:RT(mg,0,Y(0)+50,t,'t-lab2 s-ink','middle')};});
    this.brk=E('g',{},g);this.brkP=E('path',{class:'k-ink nofill','stroke-width':2},this.brk);this.brkT=RT(this.brk,0,Y(0)+92,'A(_ab_) : l’aire de 1 à _ab_','t-lab2 s-ink','middle');
    this.hLab=RT(g,0,0,'hauteur 1/_x_','t-lab2 s-ink','end');
    this.wP=E('path',{class:'k-ink nofill','stroke-width':1.6},g);
    this.wLab=RT(g,0,Y(0)+90,'largeur _h_','t-lab2 s-ink','middle');
    // la définition : ln 1 = 0, et la hauteur de ln en 4 vaut l'aire de 1 à 4
    this.z1=E('g',{},g);E('circle',{cx:X(1),cy:Y(0),r:8,class:'s-a'},this.z1);T(this.z1,X(1),Y(0)+50,'ln 1 = 0','t-lab2 s-ink','middle');
    this.segG=E('g',{},g);E('line',{x1:X(4),x2:X(4),y1:Y(0),y2:Y(LN(4)),class:'k-ink','stroke-dasharray':'6 5','stroke-width':2},this.segG);
    T(this.segG,X(4)+12,Y(LN(4)/2)+6,'hauteur = aire ≈ 1,39','t-lab2 s-ink');
    // la hauteur de 1/x devient la pente de ln
    this.tanG=E('g',{},g);
    this.tanH=E('line',{class:'k-ink','stroke-width':4},this.tanG);this.tanP1=E('circle',{r:6,class:'s-ink'},this.tanG);
    this.tanL=E('line',{class:'k-a','stroke-width':3},this.tanG);this.tanP2=E('circle',{r:7,class:'s-a'},this.tanG);
    this.tanT1=E('text',{class:'t-lab2 s-ink'},this.tanG);this.tanT2=E('text',{class:'t-lab2 s-a','text-anchor':'end'},this.tanG);
    // les pas de l'élève à côté des aires (la découverte de Sarasa)
    this.tabG=E('g',{},g);
    RT(this.tabG,560,96,'Tes pas de 1 % et l’aire sous 1/_x_','t-titre s-ink');
    [['nombre',640],['pas',760],['aire de 1 au nombre',920]].forEach(([t,x])=>T(this.tabG,x,132,t,'t-tick s-dim','end'));
    this.rows=TABLEAU.map(([n,k],i)=>{const rg=E('g',{},this.tabG),y=170+i*36;
      E('text',{x:640,y,class:'t-lab2 s-ink','text-anchor':'end',text:String(n)},rg);
      E('text',{x:760,y,class:'t-lab2 s-ink','text-anchor':'end',text:String(k)},rg);
      const v=E('text',{x:920,y,class:'t-lab2 '+(n===3?'s-a':'s-ink'),'text-anchor':'end',text:fr(LN(n))},rg);
      return {rg,v,n};});
    this.tabNote=T(this.tabG,560,362,'l’aire ≈ les pas ÷ 100','t-lab s-ink');
  },
  setR(k,x1,x2,o,cls,sx,sy){const e=this.r[k];e.style.opacity=o;if(o>.001)e.setAttribute('d',region(this.X,this.Y,x1,x2,sx,sy));e.setAttribute('class','reg '+cls);},
  lab(k,x1,x2,txt,o){const t=this.L[k],[x,y]=posLab(this.X,this.Y,k,x1,x2);t.setAttribute('x',x);t.setAttribute('y',y);t.textContent=ty(txt);t.style.opacity=o;},
  marker(k,x,o){const m=this.mk[k];m.g.setAttribute('transform',`translate(${this.X(x).toFixed(1)} 0)`);m.g.style.opacity=o;},
  render(){
    const p=this.p,X=this.X,Y=this.Y;
    this.cv.style.strokeDashoffset=1000*(1-p.curve);show(this.cvLab,clamp(p.curve*2-1,0,1));
    this.lnv.style.strokeDashoffset=1000*(1-p.lnc);show(this.lnLab,clamp(p.lnc*2-1,0,1)*(1-p.tan));
    show(this.p2,p.pts2);
    this.setR('A1',1,2,p.A1,'f-a');this.setR('A2',2,4,p.A2,'f-b');this.setR('A3',4,8,p.A3,'f-c');
    this.lab('A1',1,2,'≈ '+fr(integ(1,2)),p.A1*p.lab);this.lab('A2',2,4,'≈ '+fr(integ(2,4)),p.A2*p.lab);this.lab('A3',4,8,'≈ '+fr(integ(4,8)),p.A3*p.lab);
    this.tgt.setAttribute('d',region(X,Y,2,4));show(this.tgt,p.tgt);
    // la copie de la tranche de 1 à 2 : étirée ×sx en largeur, écrasée ×sy en hauteur
    this.setR('mv',1,2,p.m,'f-a',p.sx,p.sy);this.mvO.setAttribute('d',region(X,Y,1,2,p.sx,p.sy));show(this.mvO,p.m);
    this.mvLab.textContent=`aire × ${fr(p.sx*p.sy)}`;this.mvLab.setAttribute('x',X(1.5*p.sx));this.mvLab.setAttribute('y',Y(0)-16);show(this.mvLab,p.m);
    {const xp=1.5*p.sx,yp=p.sy/1.5,yc=1/xp,ok=Math.abs(yp-yc)<.005;
      this.ptC.setAttribute('cx',X(xp));this.ptC.setAttribute('cy',Y(yp));
      this.ptGap.setAttribute('x1',X(xp));this.ptGap.setAttribute('x2',X(xp));this.ptGap.setAttribute('y1',Y(yp));this.ptGap.setAttribute('y2',Y(yc));
      show(this.ptGap,ok?0:1);
      this.ptT.setAttribute('x',X(xp)+16);this.ptT.setAttribute('y',Y(yp)-40);this.ptT.textContent=ty(`point : hauteur ${fr(yp)}`);
      this.ptT2.setAttribute('x',X(xp)+16);this.ptT2.setAttribute('y',Y(yp)-16);this.ptT2.textContent=ty(ok?`= la courbe en ${fr(xp,1)} ✓`:`la courbe en ${fr(xp,1)} : ${fr(yc)}`);
      show(this.ptG,p.pt);}
    // n'importe quels a et b : la tranche de 1 à b devient celle de a à ab ; puis A(ab) en deux morceaux
    const a=p.a,b=p.b,og=p.gen*(1-p.dec);
    this.setR('g1',1,b,og,'f-a');this.setR('g2',a,a*b,p.gen,'f-a');this.setR('d0',1,a,p.dec,'f-b');
    this.lab('g1',1,b,'≈ '+fr(integ(1,b)),og);
    {const [x,y]=posLab(X,Y,0,a,a*b),t=this.L.g2;t.setAttribute('x',x);t.setAttribute('y',y);t.textContent='≈ '+fr(integ(a,a*b));t.style.opacity=p.gen*(1-p.decB);
      this.bLab.setAttribute('x',x);this.bLab.setAttribute('y',y);rich(this.bLab,`A(_b_) ≈ ${fr(integ(1,b))}`);show(this.bLab,p.decB);
      const [x2,y2]=posLab(X,Y,0,1,a);this.dLab.setAttribute('x',x2);this.dLab.setAttribute('y',y2);rich(this.dLab,`A(_a_) ≈ ${fr(integ(1,a))}`);show(this.dLab,p.dec);}
    this.marker('a',a,p.gen);this.marker('b',b,og);this.marker('ab',a*b,p.gen);
    // la flèche s'arrête au-dessus de l'étiquette de la tranche d'arrivée
    {const m1=(1+b)/2,m2=a*m1,x1=X(m1),y1=Y(1/m1)-26,x2=X(m2),y2=Y(1/m2)-50,cy=Math.min(y1,y2)-60,ay=.25*y1+.5*cy+.25*y2;
      this.arrow.setAttribute('d',`M${x1.toFixed(1)} ${y1.toFixed(1)}Q${((x1+x2)/2).toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);show(this.arrow,og);
      this.arrowLab.setAttribute('x',(x1+x2)/2);this.arrowLab.setAttribute('y',ay-14);show(this.arrowLab,og);}
    this.brkP.setAttribute('d',`M${X(1)} ${Y(0)+60}v10H${X(a*b)}v-10`);this.brkT.setAttribute('x',(X(1)+X(a*b))/2);show(this.brk,p.dec);
    // le « Vérifie » : A(6) = A(2) + A(3)
    this.setR('vA',1,2,p.va,'f-b');this.setR('vB',2,6,p.va,'f-a');
    this.lab('vA',1,2,'≈ 0,69',p.va);this.lab('vB',2,6,'≈ 1,10 (= A(3))',p.va);
    // la bande fine
    this.setR('base',1,p.xs,p.strip,'f-a');this.setR('strip',p.xs,p.xs+p.h,p.strip,'f-b');
    const x0=X(p.xs),x1=X(p.xs+p.h),yt=Y(1/p.xs);
    this.box.setAttribute('d',`M${x0.toFixed(1)} ${Y(0)}V${yt.toFixed(1)}H${x1.toFixed(1)}V${Y(0)}`);show(this.box,p.strip);
    this.hLab.setAttribute('x',x0-10);this.hLab.setAttribute('y',(yt+Y(0))/2+6);show(this.hLab,p.strip);
    this.wP.setAttribute('d',`M${x0.toFixed(1)} ${Y(0)+58}v8H${x1.toFixed(1)}v-8`);show(this.wP,p.strip);
    this.wLab.setAttribute('x',(x0+x1)/2);show(this.wLab,p.strip);
    this.marker('x',p.xs,p.strip);
    // la définition
    this.setR('dl',1,4,p.dl,'f-b');show(this.segG,p.seg);show(this.z1,p.z1);
    {const xt=p.xt,lt=LN(xt),s=1/xt,d1=Math.min(1.1,xt-.56);
      this.tanH.setAttribute('x1',X(xt));this.tanH.setAttribute('x2',X(xt));this.tanH.setAttribute('y1',Y(0));this.tanH.setAttribute('y2',Y(s));
      this.tanP1.setAttribute('cx',X(xt));this.tanP1.setAttribute('cy',Y(s));
      this.tanL.setAttribute('x1',X(xt-d1));this.tanL.setAttribute('y1',Y(lt-s*d1));this.tanL.setAttribute('x2',X(xt+1.3));this.tanL.setAttribute('y2',Y(lt+s*1.3));
      this.tanP2.setAttribute('cx',X(xt));this.tanP2.setAttribute('cy',Y(lt));
      this.tanT1.setAttribute('x',X(xt)+12);this.tanT1.setAttribute('y',Y(s)-12);this.tanT1.textContent=`hauteur ${fr(s)}`;
      this.tanT2.setAttribute('x',X(xt)-14);this.tanT2.setAttribute('y',Y(lt)-18);this.tanT2.textContent=`pente ${fr(s)}`;
      show(this.tanG,p.tan);}
    // le tableau des pas et des aires
    this.setR('t3',1,3,p.tab,'f-a');show(this.tabG,p.tab);
    this.rows.forEach((r,i)=>{const o=(i<2?1:clamp(p.tabAll*3-(i-2),0,1))*clamp(p.tab,0,1);r.rg.style.opacity=o;if(r.n===3)r.v.textContent=p.tab3>.5?fr(LN(3)):'?';});
    show(this.tabNote,clamp(p.tabAll*3-2,0,1));
  }
});

/* ---------- 6. la dérivée, en images ---------- */
scene('taux',{
  p:{on:0,sec:0,h:3.6,tan:0},
  build(g){
    const X=x=>110+92*x,Y=y=>600-170*y;this.X=X;this.Y=Y;this.f=x=>Math.sqrt(x);
    T(g,140,72,'Rappel : la dérivée, en images','t-titre s-ink');
    E('line',{x1:X(0),x2:X(8.6),y1:Y(0),y2:Y(0),class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:X(0),x2:X(0),y1:Y(0),y2:Y(3.2),class:'k-dim','stroke-width':1.5},g);
    this.cv=E('path',{d:chemin(this.f,0,8.4,X,Y),class:'k-ink nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.cvL=RT(g,X(6.6),Y(this.f(6.6))+44,'courbe de _f_','t-lab2 s-ink','middle');
    this.sec=E('line',{class:'k-ink','stroke-width':2},g);
    this.run=E('line',{class:'k-dim','stroke-dasharray':'5 5','stroke-width':1.6},g);
    this.rise=E('line',{class:'k-a','stroke-width':4},g);
    this.hL=RT(g,0,0,'_h_','t-lab2 s-ink','middle');
    this.dL=RT(g,0,0,'variation de _f_','t-lab2 s-a');
    this.pA=E('circle',{r:7,class:'s-ink'},g);this.pB=E('circle',{r:7,class:'s-ink'},g);
    this.lA=RT(g,0,Y(0)+30,'_x_','t-lab2 s-ink','middle');this.lB=RT(g,0,Y(0)+30,'_x_ + _h_','t-lab2 s-ink','middle');
    this.tanL=E('line',{class:'k-a','stroke-width':3},g);
    this.box=E('text',{x:940,y:540,class:'t-big2 s-ink','text-anchor':'end'},g);
    this.box2=E('text',{x:940,y:578,class:'t-lab s-dim','text-anchor':'end'},g);
  },
  render(){
    const p=this.p,X=this.X,Y=this.Y,f=this.f,x0=2,x1=x0+p.h,yA=f(x0),yB=f(x1),s=(yB-yA)/p.h,dv=1/(2*Math.sqrt(x0));
    this.cv.style.strokeDashoffset=1000*(1-p.on);show(this.cvL,p.on);
    const xs=Math.max(.2,x0-(yA-.05)/Math.max(s,1e-6)),xe=Math.min(8.4,x0+(3.05-yA)/Math.max(s,1e-6)),ys=yA+s*(xs-x0),ye=yA+s*(xe-x0);
    this.sec.setAttribute('x1',X(xs));this.sec.setAttribute('y1',Y(ys));this.sec.setAttribute('x2',X(xe));this.sec.setAttribute('y2',Y(ye));show(this.sec,p.sec*(1-.75*p.tan));
    this.run.setAttribute('x1',X(x0));this.run.setAttribute('y1',Y(yA));this.run.setAttribute('x2',X(x1));this.run.setAttribute('y2',Y(yA));
    this.rise.setAttribute('x1',X(x1));this.rise.setAttribute('y1',Y(yA));this.rise.setAttribute('x2',X(x1));this.rise.setAttribute('y2',Y(yB));
    const lab=p.sec*clamp((p.h-.5)/.7,0,1);show(this.run,p.sec);show(this.rise,p.sec);
    this.hL.setAttribute('x',(X(x0)+X(x1))/2);this.hL.setAttribute('y',Y(yA)+30);show(this.hL,lab);
    this.dL.setAttribute('x',X(x1)+12);this.dL.setAttribute('y',(Y(yA)+Y(yB))/2+6);show(this.dL,lab);
    this.pA.setAttribute('cx',X(x0));this.pA.setAttribute('cy',Y(yA));this.pB.setAttribute('cx',X(x1));this.pB.setAttribute('cy',Y(yB));show(this.pA,p.on);show(this.pB,p.sec);
    this.lA.setAttribute('x',X(x0));this.lB.setAttribute('x',X(x1));show(this.lA,p.on);show(this.lB,lab);
    this.tanL.setAttribute('x1',X(x0-1.8));this.tanL.setAttribute('y1',Y(yA-dv*1.8));this.tanL.setAttribute('x2',X(x0+4));this.tanL.setAttribute('y2',Y(yA+dv*4));show(this.tanL,p.tan);
    this.box.textContent=ty(p.tan>.5?`tangente : pente ${fr(dv,3)}`:`pente de la droite : ${fr(s,3)}`);show(this.box,p.sec);
    this.box2.textContent=p.tan>.5?'la dérivée : la limite du taux quand h tend vers 0':'taux = variation de f ÷ h';show(this.box2,p.sec);
  }
});

/* ---------- 7. la courbe de ln : e, à gauche de 1, l'ensemble de définition, le signe ---------- */
scene('courbe',{
  p:{lnR:0,lnL:0,ev:0,xe:1,eNom:0,half:0,q5:0,dot5:0,cp:0,csx:1,csy:1,cLab:0,near:0,xd:.5,dom:0,sg:0,ab:0,zone:0},
  build(g){
    const X=x=>200+104*x,Y=y=>330-120*y;this.X=X;this.Y=Y;
    const pat=E('pattern',{id:'lg-hach',width:10,height:10,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},ctx.defs);
    E('line',{x1:0,y1:0,x2:0,y2:10,class:'k-dim','stroke-width':1.5},pat);
    this.domG=E('g',{},g);
    E('rect',{x:X(-1.5),y:Y(2.3),width:X(0)-X(-1.5),height:Y(-2.3)-Y(2.3),fill:'url(#lg-hach)',opacity:.55},this.domG);
    RT(this.domG,X(-.78),Y(1.62),'_x_ ≤ 0','t-lab2 s-ink','middle');
    T(this.domG,X(-.78),Y(1.62)+28,'ln n’existe pas','t-lab s-ink','middle');
    E('line',{x1:X(-1.5),x2:X(7.2),y1:Y(0),y2:Y(0),class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:X(0),x2:X(0),y1:Y(-2.35),y2:Y(2.35),class:'k-dim','stroke-width':1.5},g);
    [-1,1,2,3,4,5,6,7].forEach(i=>{E('line',{x1:X(i),x2:X(i),y1:Y(0),y2:Y(0)+6,class:'k-dim'},g);E('text',{x:X(i),y:Y(0)+24,class:'t-tick s-dim','text-anchor':'middle',text:i<0?'−1':i},g);});
    [-2,-1,1,2].forEach(v=>{E('line',{x1:X(0)-6,x2:X(0),y1:Y(v),y2:Y(v),class:'k-dim'},g);E('text',{x:X(0)-12,y:Y(v)+5,class:'t-tick s-dim','text-anchor':'end',text:v<0?'−'+(-v):v},g);});
    this.r={};['eA','half','cp','near'].forEach(k=>this.r[k]=E('path',{class:'reg f-b'},g));
    this.cpO=E('path',{class:'k-ink nofill','stroke-dasharray':'5 4','stroke-width':1.4},g);
    this.c1x=E('path',{d:chemin(x=>1/x,.43,7.2,X,Y),class:'k-ink nofill','stroke-width':3},g);
    this.c1xLab=RT(g,X(.75)+14,Y(1/.75)-6,'_y_ = 1/_x_','t-lab2 s-ink');
    this.lnR=E('path',{d:chemin(LN,1,7.2,X,Y),class:'k-a nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.lnL=E('path',{d:chemin(LN,1,.1,X,Y),class:'k-a nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.lnLab=RT(g,X(6.2),Y(LN(6.2))+36,'_y_ = ln _x_','t-lab2 s-a','middle');
    // e : l'aire de 1 à x, puis le point (e ; 1)
    this.eMk=E('g',{},g);E('line',{x1:0,x2:0,y1:Y(0)-6,y2:Y(0)+8,class:'k-ink','stroke-width':2},this.eMk);this.eMkT=RT(this.eMk,0,Y(0)+52,'','t-lab2 s-ink','middle');
    this.eT=E('text',{x:930,y:150,class:'t-cle s-ink','text-anchor':'end'},g);
    this.eN=E('g',{},g);
    E('line',{x1:X(E_),x2:X(E_),y1:Y(0),y2:Y(1),class:'k-dim','stroke-dasharray':'4 5','stroke-width':1.6},this.eN);
    E('line',{x1:X(0),x2:X(E_),y1:Y(1),y2:Y(1),class:'k-dim','stroke-dasharray':'4 5','stroke-width':1.6},this.eN);
    E('circle',{cx:X(E_),cy:Y(1),r:7,class:'s-a'},this.eN);
    T(this.eN,X(E_)-16,Y(1)-16,'ln e = 1','t-cle s-ink','end');
    T(this.eN,X(1.85),Y(0)-14,'aire = 1','t-lab2 s-ink','middle');
    // à gauche de 1
    this.halfMk=T(g,X(.5),Y(0)+24,'0,5','t-tick s-ink','middle');
    this.q5=E('g',{},g);E('line',{x1:X(.5),x2:X(.5),y1:Y(0),y2:Y(-.69),class:'k-dim','stroke-dasharray':'4 5','stroke-width':1.6},this.q5);E('text',{x:X(.5),y:Y(-.69)+34,class:'t-cle s-a','text-anchor':'middle',text:'?'},this.q5);
    this.d5=E('g',{},g);E('circle',{cx:X(.5),cy:Y(LN(.5)),r:7,class:'s-a'},this.d5);T(this.d5,X(.5)+16,Y(LN(.5))+24,'ln 0,5 ≈ −0,69','t-lab2 s-ink');
    this.cLab=T(g,X(1.8),Y(0)+50,'même aire ≈ 0,69','t-lab2 s-ink','middle');
    // vers 0 : l'aire de x à 1 grandit sans fin, ln x descend sans fin
    this.nearDot=E('circle',{r:7,class:'s-a'},g);
    this.nearT=E('g',{},g);T(this.nearT,X(.45)+16,66,'1/x monte sans fin','t-lab s-dim');T(this.nearT,X(.1)+20,Y(-2.3)+2,'ln x descend sans fin','t-lab s-dim');
    // le signe et la croissance
    // le signe, écrit là où la courbe le montre : sous l'axe avant 1, au-dessus après
    this.sgG=E('g',{},g);
    RT(this.sgG,X(1)+14,Y(-.9),'ln _x_ < 0 sur ]0,1[','t-lab2 s-ink');RT(this.sgG,X(3.3),Y(.72),'ln _x_ > 0 sur ]1,+∞[','t-lab2 s-ink');
    this.abG=E('g',{},g);
    [[1.5,'_a_'],[5.5,'_b_']].forEach(([v,t])=>{const l=LN(v);
      E('line',{x1:X(v),x2:X(v),y1:Y(0),y2:Y(l),class:'k-ink','stroke-dasharray':'4 5','stroke-width':1.6},this.abG);
      E('line',{x1:X(0),x2:X(v),y1:Y(l),y2:Y(l),class:'k-ink','stroke-dasharray':'4 5','stroke-width':1.6},this.abG);
      E('circle',{cx:X(v),cy:Y(l),r:6,class:'s-ink'},this.abG);
      RT(this.abG,X(v),Y(0)+24,t,'t-lab2 s-ink','middle');RT(this.abG,X(0)-12,Y(l)+6,'ln '+t,'t-lab2 s-ink','end');});
    this.zoneG=E('g',{},g);E('line',{x1:X(0)+3,x2:X(1)-3,y1:Y(0),y2:Y(0),class:'k-a','stroke-width':7},this.zoneG);
    RT(this.zoneG,X(1)+14,Y(0)+50,'← ici : 0 < _x_ − 2 < 1','t-lab2 s-ink');
  },
  setR(k,x1,x2,o,sx,sy,ymax){const e=this.r[k];e.style.opacity=o;if(o>.001)e.setAttribute('d',region(this.X,this.Y,x1,x2,sx,sy,ymax));},
  render(){
    const p=this.p,X=this.X,Y=this.Y;
    this.lnR.style.strokeDashoffset=1000*(1-p.lnR);this.lnL.style.strokeDashoffset=1000*(1-p.lnL);
    show(this.lnLab,clamp(p.lnR*2-1,0,1));
    // la recherche de e
    const xe=p.xe,A=integ(1,xe),hit=Math.abs(A-1)<.004;
    this.setR('eA',1,xe,p.ev);
    this.eMk.setAttribute('transform',`translate(${X(xe).toFixed(1)} 0)`);show(this.eMk,p.ev);
    rich(this.eMkT,hit?'e ≈ 2,718':`_x_ = ${fr(xe)}`);
    this.eT.textContent=ty(hit?'l’aire vaut 1':`aire de 1 à ${fr(xe)} : ${fr(A,3)}`);show(this.eT,p.ev*(1-p.eNom));
    show(this.eN,p.eNom);
    // à gauche de 1
    this.setR('half',.5,1,p.half);show(this.halfMk,p.half);show(this.q5,p.q5);show(this.d5,p.dot5);
    this.setR('cp',.5,1,p.cp,p.csx,p.csy);this.cpO.setAttribute('d',region(X,Y,.5,1,p.csx,p.csy));show(this.cpO,p.cp);show(this.cLab,p.cLab);
    // vers 0
    this.setR('near',p.xd,1,p.near,1,1,2.3);this.nearDot.setAttribute('cx',X(p.xd));this.nearDot.setAttribute('cy',Y(LN(p.xd)));show(this.nearDot,p.near);
    show(this.nearT,p.near*clamp((.45-p.xd)/.2,0,1));
    show(this.domG,p.dom);show(this.sgG,p.sg);show(this.abG,p.ab);show(this.zoneG,p.zone);
  }
});

/* ---------- 8. les règles de ln, sur les aires ---------- */
scene('bandes',{
  p:{tit:'',sous:'',r1:0,r2:0,br6:0,quot:0,r4:0,b3:0,h4:0,s12:0,z1:0,q38:0},
  build(g){
    const X=x=>90+100*x,Y=y=>580-220*y;this.X=X;this.Y=Y;
    this.tit=RT(g,60,64,'','t-titre s-ink');this.sous=RT(g,60,90,'','t-sous');
    E('line',{x1:X(0),x2:X(8.6),y1:Y(0),y2:Y(0),class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:X(0),x2:X(0),y1:Y(0),y2:Y(2.05),class:'k-dim','stroke-width':1.5},g);
    for(let i=1;i<=8;i++){E('line',{x1:X(i),x2:X(i),y1:Y(0),y2:Y(0)+6,class:'k-dim'},g);E('text',{x:X(i),y:Y(0)+24,class:'t-sous','text-anchor':'middle',text:i},g);}
    this.r={};['r1','r2','r4','b1','b2','b3','h1','h2','s12','q38'].forEach(k=>this.r[k]=E('path',{class:'reg'},g));
    this.r1O=E('path',{class:'k-ink nofill','stroke-dasharray':'5 4','stroke-width':1.4},g);
    E('path',{d:chemin(x=>1/x,.5,8.6,X,Y),class:'k-ink nofill','stroke-width':3},g);
    RT(g,X(.62)+16,Y(1/.62),'_y_ = 1/_x_','t-lab2 s-ink');
    this.L={};['r1','r2','r4','b1','b2','b3','h1','h2','s12','q38'].forEach(k=>this.L[k]=E('text',{class:'t-lab2 s-ink','text-anchor':'middle'},g));
    this.br={};['b6','b8','b4','b38'].forEach(k=>{const bg=E('g',{},g);this.br[k]={g:bg,p:E('path',{class:'k-ink nofill','stroke-width':2},bg),t:E('text',{y:Y(0)+76,class:'t-lab2 s-ink','text-anchor':'middle'},bg)};});
    this.z1=E('g',{},g);E('circle',{cx:X(1),cy:Y(0),r:7,class:'s-ink'},this.z1);T(this.z1,X(1),Y(0)+52,'ln 1 = 0 : aucune aire','t-lab2 s-ink','middle');
  },
  setR(k,x1,x2,o,cls){const e=this.r[k];e.style.opacity=o;if(o>.001)e.setAttribute('d',region(this.X,this.Y,x1,x2));e.setAttribute('class','reg '+cls);},
  lab(k,x1,x2,txt,o){const t=this.L[k],[x,y]=posLab(this.X,this.Y,k,x1,x2);t.setAttribute('x',x);t.setAttribute('y',y);t.textContent=ty(txt);t.style.opacity=o;},
  brace(k,x1,x2,txt,o){const b=this.br[k],X=this.X,y=this.Y(0)+42;b.p.setAttribute('d',`M${X(x1)+2} ${y}v8H${X(x2)-2}v-8`);b.t.setAttribute('x',(X(x1)+X(x2))/2);b.t.textContent=ty(txt);b.g.style.opacity=o;},
  render(){
    const p=this.p,q=p.quot;
    rich(this.tit,p.tit||'');rich(this.sous,p.sous||'');
    // le produit, puis le quotient lu sur la même figure
    this.setR('r1',1,2,p.r1*(1-.6*q),'f-b');this.r1O.setAttribute('d',region(this.X,this.Y,1,2));show(this.r1O,p.r1*q);
    this.setR('r2',2,6,p.r2,'f-a');
    this.lab('r1',1,2,q>.5?'ln 2':'ln 2 ≈ 0,69',p.r1);this.lab('r2',2,6,q>.5?'ln 6 − ln 2 = ln 3':'≈ 1,10 : c’est ln 3',p.r2);
    this.brace('b6',1,6,q>.5?'ln 6':'ln 6 ≈ 1,79',p.br6);
    // la puissance : trois bandes égales
    this.setR('r4',1,8,p.r4*(1-p.b3),'f-b');this.lab('r4',1,8,'ln 8 ?',p.r4*(1-p.b3));
    this.setR('b1',1,2,p.b3,'f-b');this.setR('b2',2,4,p.b3,'f-a');this.setR('b3',4,8,p.b3,'f-b');
    ['b1','b2','b3'].forEach((k,i)=>this.lab(k,2**i,2**(i+1),'≈ 0,69',p.b3));
    this.brace('b8',1,8,'ln 8 = 3 ln 2 ≈ 2,08',p.b3);
    // la racine carrée : deux bandes égales
    this.setR('h1',1,2,p.h4,'f-b');this.setR('h2',2,4,p.h4,'f-a');
    this.lab('h1',1,2,'≈ 0,69',p.h4);this.lab('h2',2,4,'≈ 0,69',p.h4);this.brace('b4',1,4,'ln 4 ≈ 1,39',p.h4);
    // une somme : ln(1 + 1) = ln 2, l'aire de 1 à 2
    this.setR('s12',1,2,p.s12,'f-a');this.lab('s12',1,2,'ln 2 ≈ 0,69',p.s12);show(this.z1,p.z1);
    // le « Vérifie » : ln 8 − ln 3
    this.setR('q38',3,8,p.q38,'f-a');this.lab('q38',3,8,'≈ 0,98',p.q38);this.brace('b38',3,8,'ln 8 − ln 3 = ln(8/3)',p.q38);
  }
});

/* ---------- le retour à l'énigme ---------- */
scene('retour',{
  p:{l1:0,l2:0,sum:0,res:0,wink:0},
  build(g){
    T(g,60,72,'Retour à l’énigme','t-titre s-ink');
    T(g,60,98,'la même multiplication, par les logarithmes','t-sous');
    E('text',{x:500,y:182,class:'mono t-big s-ink','text-anchor':'middle',text:'2718281 × 3141592'},g);
    const R=780;
    this.g1=E('g',{},g);T(this.g1,R-190,278,'ln 2718281 ≈','t-lab s-dim','end');E('text',{x:R,y:278,class:'mono t-big s-ink','text-anchor':'end',text:'14,8155'},this.g1);
    this.g2=E('g',{},g);T(this.g2,R-190,326,'ln 3141592 ≈','t-lab s-dim','end');E('text',{x:R,y:326,class:'mono t-big s-ink','text-anchor':'end',text:'+ 14,9602'},this.g2);
    this.g3=E('g',{},g);E('line',{x1:R-170,x2:R,y1:344,y2:344,class:'k-dim','stroke-width':2},this.g3);T(this.g3,R-190,386,'une addition :','t-lab s-dim','end');E('text',{x:R,y:386,class:'mono t-big s-ink','text-anchor':'end',text:'29,7757'},this.g3);
    this.g4=E('g',{},g);T(this.g4,R-230,462,'la table, lue à l’envers :','t-lab s-dim','end');RT(this.g4,R,462,'8,54 × 10^{12}','t-big s-a','end',18);
    this.g5=E('g',{},g);T(this.g5,300,570,'2,718281… = e','t-titre s-ink','middle');T(this.g5,700,570,'3,141592… = π','t-titre s-ink','middle');
  },
  render(){const p=this.p;show(this.g1,p.l1);show(this.g2,p.l2);show(this.g3,p.sum);show(this.g4,p.res);show(this.g5,p.wink);}
});

/* ---------- 9. au bac : ln(x − 1) + ln(x + 1) = ln 3 ---------- */
scene('bac',{
  p:{f:0,dom:0,grp:0,cand:0,rej:0},
  build(g){
    const X=x=>460+90*x,Y=y=>380-90*y;this.X=X;this.Y=Y;
    T(g,60,64,'Les deux membres de l’équation, tracés','t-titre s-ink');
    const clip=E('clipPath',{id:'lg-bac'},g);E('rect',{x:60,y:76,width:880,height:574},clip);
    E('line',{x1:X(-4.2),x2:X(5.2),y1:Y(0),y2:Y(0),class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:X(0),x2:X(0),y1:Y(-2.9),y2:Y(3.3),class:'k-dim','stroke-width':1.5},g);
    for(let i=-4;i<=5;i++){if(!i)continue;E('line',{x1:X(i),x2:X(i),y1:Y(0),y2:Y(0)+6,class:'k-dim'},g);E('text',{x:X(i),y:Y(0)+24,class:'t-tick s-dim','text-anchor':'middle',text:i<0?'−'+(-i):i},g);}
    [-2,-1,1,2,3].forEach(v=>{E('line',{x1:X(0)-6,x2:X(0),y1:Y(v),y2:Y(v),class:'k-dim'},g);E('text',{x:X(0)-12,y:Y(v)+5,class:'t-tick s-dim','text-anchor':'end',text:v<0?'−'+(-v):v},g);});
    this.domG=E('g',{},g);E('rect',{x:X(1),y:Y(0)-7,width:X(5.2)-X(1),height:14,class:'reg f-b'},this.domG);RT(this.domG,X(3.1),Y(0)+48,'conditions : _x_ > 1','t-lab s-ink','middle');
    const cg=E('g',{'clip-path':'url(#lg-bac)'},g);
    const l3=Y(LN(3));
    this.c3=E('line',{x1:X(-4.2),x2:X(5.2),y1:l3,y2:l3,class:'k-ink','stroke-dasharray':'8 6','stroke-width':2},cg);
    this.c3L=RT(g,928,l3-12,'_y_ = ln 3','t-lab s-ink','end');
    const f=x=>LN(x-1)+LN(x+1);
    this.fv=E('path',{d:chemin(f,1.0004,5.2,X,Y,500,-3.6,3.6),class:'k-a nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},cg);
    this.fL=RT(g,X(2.55)-14,Y(f(2.55))-14,'ln(_x_ − 1) + ln(_x_ + 1)','t-lab s-a','end');
    // regrouper d'abord : ln(x² − 1) existe aussi pour x < −1, d'où la fausse solution −2
    this.grpG=E('g',{},g);
    E('path',{d:chemin(x=>LN(x*x-1),-4.2,-1.0004,X,Y,500,-3.6,3.6),class:'k-c nofill','stroke-dasharray':'6 5','stroke-width':2.4,'clip-path':'url(#lg-bac)'},this.grpG);
    RT(this.grpG,100,450,'ln(_x_^{2} − 1) existe aussi','t-lab s-c','start',15);RT(this.grpG,100,474,'pour _x_ < −1','t-lab s-c');
    this.candG=E('g',{},g);
    this.d2=E('circle',{cx:X(2),cy:l3,r:7,class:'s-ink'},this.candG);E('circle',{cx:X(-2),cy:l3,r:7,class:'s-c'},this.candG);
    RT(this.candG,X(2)+12,l3+28,'_x_ = 2','t-lab s-ink');
    this.m2=RT(this.candG,X(-2)-14,l3+28,'_x_ = −2','t-lab s-ink','end');
    this.sT=T(g,X(2)-16,l3-22,'S = {2}','t-cle s-ink','end');
  },
  render(){
    const p=this.p;
    this.fv.style.strokeDashoffset=1000*(1-p.f);show(this.fL,clamp(p.f*2-1,0,1));show(this.c3,p.f);show(this.c3L,p.f);
    show(this.domG,p.dom);show(this.grpG,p.grp);show(this.candG,p.cand);
    this.d2.setAttribute('class',p.rej>.5?'s-a':'s-ink');
    rich(this.m2,p.rej>.5?'−2 : rejeté':'_x_ = −2');this.m2.setAttribute('class',p.rej>.5?'t-lab s-c':'t-lab s-ink');
    show(this.sT,p.rej);
  }
});

/* ---------- 10. trois pièges des copies ---------- */
const PIEGES=[
  {tag:'Piège 1 sur 3 : le signe',big:'ln 0,8 : quel signe ?',r1:'0 < 0,8 < 1',r2:'donc ln 0,8 < 0'},
  {tag:'Piège 2 sur 3 : le domaine',big:'ln(3 − _x_) existe pour…',r1:'il faut 3 − _x_ > 0',r2:'donc _x_ < 3'},
  {tag:'Piège 3 sur 3 : la somme',big:'ln 3 + ln 5 = ?',r1:'une somme de ln est le ln d’un produit',r2:'ln 3 + ln 5 = ln 15'}];
scene('quiz',{
  p:{qi:0,rv:0},
  build(g){
    this.tag=E('text',{x:500,y:210,class:'t-sous','text-anchor':'middle'},g);
    this.big=RT(g,500,320,'','t-big2 s-ink','middle');
    this.r1=RT(g,500,430,'','t-lab2 s-ink','middle');
    this.r2=RT(g,500,474,'','t-lab2 s-ink','middle');
  },
  render(){const q=PIEGES[disc(this.p.qi)];this.tag.textContent=ty(q.tag);rich(this.big,q.big);rich(this.r1,q.r1);rich(this.r2,q.r2);show(this.r1,this.p.rv);show(this.r2,clamp(this.p.rv*2-1,0,1));}
});

/* ---------- ce que tu sais maintenant ---------- */
scene('end',{
  p:{n:0},
  build(g){
    T(g,90,96,'Ce que tu as compris','t-titre s-ink');
    const I=[['Un logarithme compte des pas :','il change les × en +.'],
      ['ln _x_ est l’aire sous 1/_x_, de 1 à _x_ :','ln 1 = 0 et ln e = 1.'],
      ['ln est la primitive de 1/_x_ nulle en 1,','définie sur ]0,+∞[ et strictement croissante.'],
      ['ln _x_ < 0 sur ]0,1[, ln _x_ > 0 sur ]1,+∞[,','et ln _a_ < ln _b_ équivaut à _a_ < _b_.'],
      ['Produit, inverse, quotient, puissance :','aucune règle pour ln(_a_ + _b_).']];
    this.items=I.map((l,i)=>{const gg=E('g',{},g),y=170+i*100;E('text',{x:90,y:y+8,class:'t-cle s-ink',text:String(i+1)},gg);RT(gg,140,y,l[0],'t-lab2 s-ink');RT(gg,140,y+30,l[1],'t-lab s-dim');return gg;});
  },
  render(){this.items.forEach((g,i)=>{const o=clamp(this.p.n-i,0,1);g.style.opacity=o;g.setAttribute('transform',`translate(${((1-o)*-16).toFixed(1)} 0)`);});}
});


/* ---------- le script ---------- */
const L2=Math.log10(2),L3=Math.log10(3);
const BEATS=[{name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'La table',court:'Table'},{name:'Les trous',court:'Trous'},
  {name:'La règle',court:'Règle'},{name:'L’aire',court:'Aire'},{name:'La dérivée',court:'Dérivée'},{name:'La courbe de ln',court:'Courbe'},
  {name:'Les règles de ln',court:'Règles'},{name:'Au bac'},{name:'Bilan'}];
const BET=t=>({opts:t.map(([x,fb])=>({t:x,fb}))});
// une question : [texte, juste ?, explication, indice (pour une option fausse)]
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>ok?{t:x,ok:true,fb}:{t:x,fb,indice})});
const NW=s=>`<span class="nw">${s}</span>`;
const I0=NW(']0,+∞['),I01=NW(']0,1['),I1=NW(']1,+∞[');
const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'savoir',beat:0,scene:'savoir',set:{q:1,qr:0,r1:0,blk:0,join:0,res:0},ctl:'saut',
  text:['Avant l’énigme, un seul outil : les [[puissance|puissances]]. Un test : réussi du premier coup, il te permet de passer le rappel.',{t:'Combien vaut 2<sup>4</sup> × 2<sup>3</sup> ?',fort:true}],
  verifie:{...VF([
    ['2<sup>7</sup>',true,'Oui : quatre 2, puis trois 2, soit sept 2 multipliés : 2<sup>7</sup> = 128. On additionne les exposants.'],
    ['2<sup>12</sup>',false,'Ce serait 4 × 3 = 12 facteurs. Or 2<sup>4</sup> × 2<sup>3</sup> met bout à bout quatre 2 et trois 2 : sept facteurs, 2<sup>7</sup>.','Tu as multiplié les exposants. Écris les 2 un par un : combien y en a-t-il en tout ?'],
    ['4<sup>7</sup>',false,'On ne multiplie pas les bases : chaque facteur reste un 2. Sept 2 à la suite : 2<sup>7</sup>.','Les exposants s’additionnent, mais la base ne change pas : chaque facteur est un 2.']]),reveal:[{p:{qr:1},d:700}]}},
{cle:'rappel',beat:0,scene:'savoir',set:{q:0,qr:0},seq:[{p:{r1:1},d:700,w:200},{p:{blk:1},d:1400,w:700},{p:{join:1},d:1100,w:600},{p:{res:1},d:700,w:200}],
  text:['2<sup>3</sup> se lit « 2 puissance 3 » : c’est 2 × 2 × 2 = 8. Le petit 3 est l’[[exposant]] : il compte les facteurs.',
    {t:'Pour 2<sup>2</sup> × 2<sup>3</sup>, on met les facteurs bout à bout : deux 2, puis trois 2.',a:1},
    {t:'Cinq 2 à la suite : 2<sup>2</sup> × 2<sup>3</sup> = 2<sup>5</sup> = 32. On additionne les exposants.',a:3,fort:true}],
  tex:[['2^a \\times 2^b = 2^{a+b}','2^a × 2^b = 2^(a+b)']]},

/* ===== 1. l'énigme ===== */
{cle:'napier',beat:1,scene:'ledger',tag:'1614 · Édimbourg',set:{mul:1,mx:0,rows:0,res:0,add:0,addc:0,q:0},seq:[{p:{rows:7},d:4200,w:900},{p:{res:1},d:700}],
  text:['Édimbourg, 1614. John Napier regarde les astronomes de son temps se noyer dans les calculs.','Pour prédire où sera une planète, il faut multiplier des nombres comme ceux-ci, à la main, des centaines de fois.',
    {t:'Une seule de ces multiplications : 49 produits de chiffres, sept lignes à décaler, des retenues partout.',a:0},
    {t:'Une erreur sur un chiffre, et la planète n’est plus là où on l’attend.',a:1,fort:true}]},
{cle:'add',beat:1,scene:'ledger',seq:[{p:{mx:1},d:900,w:200},{p:{add:1},d:500},{p:{add:8},d:1800},{p:{addc:1},d:500}],
  text:['Pose maintenant les mêmes nombres en addition.',{t:'Sept petites additions de chiffres, de droite à gauche, sur une seule ligne.',a:2},{t:'L’addition est rapide et sûre. La multiplication est lente et fragile.',a:3,fort:true}]},
{cle:'reve',beat:1,scene:'ledger',seq:[{p:{q:1},d:900}],
  text:['Le rêve de Napier : une fonction <i>f</i> qui transformerait chaque multiplication en addition.','Est-ce seulement possible ?'],
  pari:BET([['Oui, ça doit exister','Napier y a cru assez pour y consacrer vingt ans de sa vie. Tu sauras à la fin de la séance s’il avait raison : ce calcul reviendra.'],['Non, c’est trop beau pour être vrai','Méfiance saine. La réponse tient pourtant dans une simple table, et ce calcul reviendra à la fin.'],['Aucune idée','C’est exactement là qu’en était Napier quand il a commencé. Ce calcul reviendra à la fin de la séance.']])},

/* ===== 2. la table ===== */
{cle:'table',beat:2,scene:'table',set:{cells:0,arrA:0,arrB:0,log:0,gap:0,inter:0,demo:0},seq:[{p:{cells:11},d:3400,w:200},{p:{arrA:10},d:2800,w:400},{p:{arrB:10},d:1800,w:400}],
  text:['L’idée de départ circule depuis le mathématicien allemand Stifel, en 1544 : deux lignes de nombres qui avancent ensemble. Napier va la rendre utilisable.',
    {t:'En bas, on part de 1 et on double à chaque case : 1, 2, 4, 8…',a:0},
    {t:'En haut, on compte les doublements : on ajoute 1 à chaque case.',a:1},
    {t:'Une ligne avance à coups de × 2, l’autre à coups de + 1.',a:2,fort:true}]},
{cle:'exemple',beat:2,scene:'table',set:{da:2,db:3,demo:0},seq:[{p:{demo:1},d:500,w:300},{p:{demo:2},d:500,w:1300},{p:{demo:3},d:500,w:900},{p:{demo:4},d:500,w:700}],
  text:['Un exemple : 4 × 8, sans multiplier.',{t:'4 est au pas 2, et 8 au pas 3.',a:0},{t:'On additionne les pas : 2 + 3 = 5. Au pas 5, la table donne 32. Et en effet, 4 × 8 = 32.',a:3},
    {t:'C’est la règle des puissances : 2<sup>2</sup> × 2<sup>3</sup> = 2<sup>5</sup>. Les pas sont les exposants.',a:3,fort:true}]},
{cle:'pick',beat:2,scene:'table',set:{demo:0,inter:1,pick:[]},ctl:'pick',
  text:['À toi : calcule 16 × 32 sans multiplier.','Clique 16, puis 32, dans la ligne du bas. La table additionne leurs pas, puis lit le résultat.']},
{cle:'nom',beat:2,scene:'table',set:{inter:0,pick:[]},seq:[{p:{log:1},d:1000}],
  text:['La ligne du haut a un nom.',{t:'Napier l’appelle [[logarithme]], du grec <i>logos</i>, le rapport, et <i>arithmos</i>, le nombre.',a:0},{t:'Le logarithme d’un nombre compte ses pas : 512 est au pas 9, car neuf doublements mènent de 1 à 512.',a:0,fort:true}]},
{cle:'v-table',beat:2,scene:'table',set:{log:0,da:3,db:6,demo:0},
  text:['Dans la table, 8 est au pas 3 et 64 au pas 6.','Où lit-on 8 × 64 ?'],
  verifie:{...VF([['Au pas 9',true,'Oui : 3 + 6 = 9, et au pas 9 on lit 512. En effet, 8 × 64 = 512.'],
    ['Au pas 18',false,'Ce serait 3 × 6 : on ne multiplie pas les pas, on les additionne. 3 + 6 = 9, et au pas 9 on lit 512.','Tu as multiplié les pas. Que fait-on aux pas quand on multiplie les valeurs ?'],
    ['Au pas 72',false,'72 = 8 + 64 : ce sont les valeurs qu’on aurait additionnées. Ce sont les pas qui s’additionnent : 3 + 6 = 9.','72 = 8 + 64 : tu as additionné les valeurs. Qu’est-ce qui s’additionne, dans la table ?']]),reveal:[{p:{demo:4},d:900}]}},

/* ===== 3. les trous ===== */
{cle:'trou',beat:3,scene:'table',set:{demo:0,gap:0},seq:[{p:{gap:1},d:1100}],
  text:['Un astronome a besoin de 16 × 3.','Problème : où est 3 dans la table ?'],
  pari:BET([['Entre 2 et 4','Justement : entre 2 et 4, il n’y a aucune case. Ni 3, ni 5, ni 6, ni 7. La table est trouée.'],['À un pas et demi, environ','Bien vu : il faudrait des demi-pas, des dixièmes de pas… La table, elle, saute de 2 à 4.'],['Nulle part','Exact. Et c’est le cas de presque tous les nombres. Napier va boucher ces trous.']])},
{cle:'pas',beat:3,scene:'fine',set:{pts:0,m70:0,m140:0,m110:0,m196:0,m306:0,sumA:0,sumB:0},seq:[{p:{pts:1},d:4000,w:300},{p:{m110:1},d:900,w:400},{p:{m196:1},d:900,w:700}],
  text:['L’idée de Napier : des pas minuscules. Au lieu de doubler, on multiplie par 1,01 à chaque pas : on grandit de 1 %.',
    {t:'Chaque point est un pas de plus : la table a maintenant des centaines de cases. (Napier prenait 0,9999999 : une précision folle.)',a:0},
    {t:'Au bout de 110 pas, on tombe sur 2,99, presque 3.',a:1},{t:'Au bout de 196 pas, sur 7,03, presque 7.',a:2}]},
{cle:'p21',beat:3,scene:'fine',
  text:['Alors, 3 × 7 = 21 se trouve à combien de pas ?'],
  pari:{reveal:[{p:{sumA:1},d:700},{p:{sumB:1},d:1500},{p:{m306:1},d:900}],opts:[
    {t:'110 + 196 = 306 pas',fb:'C’est ça. Regarde les deux longueurs mises bout à bout : 110 pas, puis 196, arrivent au pas 306. Et au pas 306, on lit 21,0.'},
    {t:'110 × 196 = 21 560 pas',fb:'Ce sont les valeurs qu’on multiplie. Les pas, eux, se mettent bout à bout : 110 + 196 = 306. Au pas 306, on lit 21,0.'},
    {t:'21 pas',fb:'21 est la valeur, lue sur l’axe vertical. Les pas vivent sur l’axe horizontal : 110 + 196 = 306, et au pas 306 on lit 21,0.'}]}},
{cle:'p21-pourquoi',beat:3,scene:'fine',
  text:['Pourquoi les pas s’additionnent-ils ? Écris-le, une ligne à la fois.'],
  deriv:[
    {tex:'3 \\approx 1{,}01^{110} \\quad\\text{et}\\quad 7 \\approx 1{,}01^{196}',alt:'3 ≈ 1,01^110 et 7 ≈ 1,01^196',r:'110 pas de 1 % mènent à 3 ; 196 pas mènent à 7.'},
    {tex:'3 \\times 7 \\approx 1{,}01^{110} \\times 1{,}01^{196}',alt:'3 × 7 ≈ 1,01^110 × 1,01^196',r:'On remplace chaque nombre par ses pas.'},
    {tex:'3 \\times 7 \\approx 1{,}01^{110+196}',alt:'3 × 7 ≈ 1,01^(110 + 196)',r:'La règle des [[puissance|puissances]] : on additionne les exposants.'},
    {tex:'3 \\times 7 \\approx 1{,}01^{306} \\approx 21',alt:'3 × 7 ≈ 1,01^306 ≈ 21',r:'Les pas de 21, ce sont les pas de 3 plus ceux de 7.'}]},
{cle:'v-trous',beat:3,scene:'fine',set:{m110:0,m196:0,m306:0,sumA:0,sumB:0},
  text:['Avec les pas de 1 %, on atteint 2 au bout d’environ 70 pas.','Vers combien de pas se trouve 4 ?'],
  verifie:{...VF([['Vers 140 pas',true,'Oui : 4 = 2 × 2, donc on additionne les pas : 70 + 70 = 140. (1,01<sup>140</sup> ≈ 4,03.)'],
    ['Vers 280 pas',false,'280 pas, c’est quatre fois 70 : ça mènerait à 2 × 2 × 2 × 2 = 16. Or 4 = 2 × 2 : deux fois 70 pas suffisent, 140.','Tu as compté quatre fois 70 pas. Combien de 2 faut-il multiplier pour faire 4 ?'],
    ['Vers 72 pas',false,'72 = 70 + 2 : on a ajouté une valeur à un nombre de pas. 4 = 2 × 2, donc 70 + 70 = 140 pas.','72 = 70 + 2 : tu as ajouté une valeur à des pas. Écris 4 comme un produit.']]),reveal:[{p:{m70:1},d:700},{p:{m140:1},d:900}]}},

/* ===== 4. la règle ===== */
{cle:'gunter',beat:4,scene:'rule',tag:'1620 · Londres',set:{eqd:0,la:0,lb:0,cur:0,read:0,drag:0},seq:[{p:{eqd:1},d:1100,w:400},{p:{eqd:0},d:500,w:2600},{p:{la:L2},d:1700,w:200},{p:{cur:1},d:500},{p:{lb:L3},d:1700},{p:{read:1},d:600}],
  text:['Londres, 1620. Edmund Gunter grave ces pas sur une règle : la distance depuis 1, c’est le logarithme.',
    {t:'De 1 à 2, de 2 à 4, de 4 à 8 : même longueur, car chaque fois on double.',a:0},
    {t:'Vers 1622, William Oughtred fait glisser deux règles. Pour 2 × 3, on pose le 1 du haut sur le 2 du bas, et on lit en face du 3 : 6.',a:2},
    {t:'Les longueurs s’ajoutent ; les nombres se multiplient.',a:5,fort:true}]},
{cle:'regle',beat:4,scene:'rule',tag:'1622 → 1972',set:{drag:1},ctl:'rule',
  text:['À toi : fais glisser la règle du haut et le curseur, ici ou sur la scène.','Pendant 350 ans, ingénieurs et architectes ont calculé ainsi ; les astronautes d’Apollo en emportaient encore une.']},
{cle:'v-regle',beat:4,scene:'rule',set:{drag:0,la:0,lb:0,cur:0,read:0},
  text:['Pour calculer 3 × 3 avec la règle, que fais-tu ?'],
  verifie:{...VF([['Je pose le 1 du haut sur le 3 du bas, et je lis en face du 3 du haut',true,'Oui : tu ajoutes la longueur de 3 à la longueur de 3. En face, on lit 9.'],
    ['Je pose le 3 du haut sur le 3 du bas',false,'Les longueurs se comptent depuis 1 : c’est le 1 du haut qu’on pose sur le 3 du bas. On lit ensuite en face du 3 du haut : 9.','Les longueurs se comptent depuis le 1 de chaque règle. Quel repère du haut faut-il poser sur le 3 ?'],
    ['Je pose le 0 du haut sur le 3 du bas',false,'La règle ne commence pas à 0 mais à 1 : le 1 est au pas zéro. On pose le 1 du haut sur le 3, et on lit 9 en face du 3.','Regarde le bout de la règle : y a-t-il un 0 ? Le pas zéro, c’est le nombre 1.']]),
    reveal:[{p:{la:L3},d:1200},{p:{cur:1},d:400},{p:{lb:L3},d:1200},{p:{read:1},d:500}]}},

/* ===== 5. l'aire ===== */
{cle:'hyper',beat:5,scene:'hyper',set:{curve:0,pts2:0,A1:0,A2:0,A3:0,lab:0},seq:[{p:{curve:1},d:2400,w:300},{p:{pts2:1},d:900,w:500},{p:{pts2:0,A1:1},d:1000,w:2000}],
  text:['Napier a construit ses tables à la main, pas à pas. Existe-t-il une grandeur qui change les × en + d’elle-même, sans table ?',
    {t:'Une trentaine d’années plus tard, la réponse sort d’une [[aire]] : l’aire sous l’[[hyperbole]] <i>y</i> = 1/<i>x</i>.',a:0},
    {t:'Quand <i>x</i> double, sa hauteur est divisée par 2.',a:1,fort:true},
    {t:'Voici l’aire de 1 à 2. Garde-la en tête.',a:2}]},
{cle:'a24',beat:5,scene:'hyper',seq:[{p:{A2:1},d:1100}],
  text:['Voici l’aire de 2 à 4 : deux fois plus large, mais deux fois plus basse.','Laquelle est la plus grande ?'],
  pari:BET([['Celle de 2 à 4','Pari noté. Vérifions, sans calculer une seule aire.'],['Elles sont égales','Pari noté. Vérifions, sans calculer une seule aire.'],['Celle de 1 à 2','Pari noté. Vérifions, sans calculer une seule aire.']])},
{cle:'etire',beat:5,scene:'hyper',set:{A2:0,tgt:1,A1:.35,m:1,pt:1,sx:1,sy:1},seq:[{p:{sx:2},d:2800,w:600}],
  text:['Prends une copie de la tranche de 1 à 2, et étire-la deux fois en largeur.',{t:'Elle couvre maintenant 2 à 4… mais elle déborde : elle est deux fois trop haute. Son aire a doublé.',a:0},
    {t:'Suis le point du bord : parti de <i>x</i> = 1,5, il arrive en <i>x</i> = 3, toujours à la hauteur 0,67. La courbe, en 3, n’est qu’à 0,33.',a:0}]},
{cle:'ecrase',beat:5,scene:'hyper',seq:[{p:{sy:.5},d:2800,w:400}],
  text:['Écrase-la maintenant de moitié en hauteur.',{t:'Le point descend de 0,67 à 0,33 : exactement la hauteur de la courbe en 3.',a:0},
    {t:'Ce n’est pas un hasard : un point parti de <i>u</i>, à la hauteur 1/<i>u</i>, arrive en 2<i>u</i> à la hauteur 1/(2<i>u</i>), sur la courbe. La copie l’épouse partout.',a:0},
    {t:'Aire × 2, puis ÷ 2 : elle n’a pas changé.',a:0,fort:true}]},
{cle:'egales',beat:5,scene:'hyper',set:{m:0,tgt:0,pt:0,A1:1,A2:1,lab:1},seq:[{p:{A3:1},d:1200,w:600}],
  text:()=>[`Les deux aires sont égales${ctx.rep('a24')===1?' : ton pari était le bon.':' : contre-intuitif, non ?'}`,{t:'Et de 4 à 8 : encore la même, pour la même raison.',a:0},{t:'Doubler en bas, ajouter la même aire : c’est la table de Napier.',a:0,fort:true}]},
{cle:'gen',beat:5,scene:'hyper',set:{A1:0,A2:0,A3:0,lab:0,gen:0,a:3,b:2},seq:[{p:{gen:1},d:1200,w:300}],ctl:'gen',
  text:['Ce n’est pas propre au 2. Étire par 3 et écrase par 3 : la tranche de 1 à 2 devient la tranche de 3 à 6, avec la même aire.',
    'Pour tous <i>a</i> et <i>b</i> : la tranche de 1 à <i>b</i> devient celle de <i>a</i> à <i>ab</i>.','Bouge <i>a</i> et <i>b</i> : les deux aires restent égales.']},
{cle:'coupe',beat:5,scene:'hyper',set:{gen:1,a:2.4,b:1.8,dec:0,decB:0},
  text:['Note A(<i>x</i>) l’aire sous la courbe, de 1 à <i>x</i>.','Coupe l’aire de 1 à <i>ab</i> en deux morceaux, en <i>a</i>.'],
  deriv:[
    {tex:'A(ab) = A(a) + \\big(\\text{aire de } a \\text{ à } ab\\big)',alt:'A(ab) = A(a) + (aire de a à ab)',r:'Le morceau gris va de 1 à <i>a</i> ; le morceau rouge, de <i>a</i> à <i>ab</i>.',p:{dec:1}},
    {tex:'\\text{aire de } a \\text{ à } ab = A(b)',alt:'aire de a à ab = A(b)',r:'C’est ce que tu viens de voir : la tranche de 1 à <i>b</i>, étirée et écrasée par <i>a</i>.',p:{decB:1}},
    {tex:'A(ab) = A(a) + A(b)',alt:'A(ab) = A(a) + A(b)',r:'L’aire change les produits en sommes, exactement comme la table de Napier.'}]},
{cle:'sarasa',beat:5,scene:'hyper',tag:'1647 · Anvers',set:{gen:0,dec:0,decB:0,tab:1,tab3:0,tabAll:0},
  text:['Anvers, 1647. Grégoire de Saint-Vincent publie cette propriété ; deux ans plus tard, son élève Sarasa comprend que cette aire <b>est</b> un logarithme.',
    'Teste-le avec tes pas : 2 est au pas 70, et l’aire de 1 à 2 vaut 0,69. Et 3, au pas 110 : son aire ?'],
  pari:{reveal:[{p:{tab3:1},d:500},{p:{tabAll:1},d:1800}],opts:[
    {t:'Environ 1,10',fb:'C’est ça : 1,10, à peu près 110 ÷ 100. Regarde le tableau : pour chaque nombre, l’aire vaut à peu près ses pas divisés par 100. Les pas et l’aire, c’est la même chose.'},
    {t:'Environ 3',fb:'3, c’est le nombre lui-même. Son aire vaut 1,10, à peu près 110 ÷ 100. Regarde le tableau : pour chaque nombre, l’aire vaut ses pas divisés par 100.'},
    {t:'Environ 1,39',fb:'1,39 = 0,69 + 0,69, c’est l’aire de 1 à 4. Celle de 3 vaut 1,10, à peu près 110 ÷ 100. Regarde le tableau : l’aire vaut les pas divisés par 100.'}]}},
{cle:'v-aire',beat:5,scene:'hyper',set:{tab:0,tab3:0,tabAll:0,va:0},
  text:['L’aire de 1 à 2 vaut environ 0,69, et celle de 1 à 3 environ 1,10.','Combien vaut l’aire de 1 à 6 ?'],
  verifie:{...VF([['Environ 1,79',true,'Oui : 6 = 2 × 3, donc A(6) = A(2) + A(3) ≈ 0,69 + 1,10 = 1,79.'],
    ['Environ 0,76',false,'0,76 ≈ 0,69 × 1,10 : l’aire ne change pas un produit en produit. 6 = 2 × 3, donc 0,69 + 1,10 = 1,79.','Tu as multiplié les deux aires. Que fait l’aire d’un produit ?'],
    ['Environ 0,41',false,'0,41 = 1,10 − 0,69, c’est l’aire de 1 à 1,5. Pour 6 = 2 × 3, on additionne : 0,69 + 1,10 = 1,79.','Tu as soustrait les aires. 6 s’écrit comme un produit : lequel ?']]),reveal:[{p:{va:1},d:900}]}},

/* ===== 6. la dérivée et la définition du bac ===== */
{cle:'cours',beat:6,scene:'hyper',set:{va:0},
  text:['Tu es à mi-chemin. Si tu veux faire une pause, c’est le bon moment.',
    'Ton cours ne définit pas ln par une aire, mais par une [[derivee|dérivée]] : ln est « la [[primitive]] de 1/<i>x</i> qui s’annule en 1 ».',
    'Pour faire le lien, regarde à quelle vitesse l’aire grandit quand <i>x</i> avance.',{t:'Un rappel d’abord : qu’est-ce qu’une dérivée ?',fort:true}]},
{cle:'taux',beat:6,scene:'taux',set:{on:0,sec:0,h:3.6,tan:0},seq:[{p:{on:1},d:1500,w:200},{p:{sec:1},d:700,w:500},{p:{h:.22},d:4400,w:900},{p:{tan:1},d:700,w:200}],
  text:['Prends une fonction <i>f</i> et deux points de sa courbe : en <i>x</i>, puis un petit pas <i>h</i> plus loin.',
    {t:'Le [[taux|taux d’accroissement]], c’est la variation de <i>f</i> divisée par <i>h</i> : la pente de la droite qui joint les deux points.',a:1},
    {t:'Rapproche les deux points : <i>h</i> [[tendvers|tend vers]] 0…',a:2},
    {t:'… et la droite devient la [[tangente]]. Sa pente, c’est la dérivée <i>f</i> ′(<i>x</i>).',a:3,fort:true}]},
{cle:'bande',beat:6,scene:'hyper',set:{strip:1,xs:2.5,h:1.4},seq:[{p:{h:.08},d:4000,w:700}],
  text:['Fais la même chose avec l’aire : avance <i>x</i> d’un petit pas <i>h</i>.',{t:'L’aire gagne une bande fine, presque un rectangle. Combien vaut-elle, environ ?',a:0}],
  pari:{label:'Pourquoi ce geste ?',opts:[
    {t:'<i>h</i> × 1/<i>x</i>',ok:true,fb:'Oui : largeur <i>h</i>, hauteur 1/<i>x</i>. Plus <i>h</i> est petit, plus le « presque » disparaît.'},
    {t:'<i>h</i> × <i>x</i>',indice:'<i>x</i> est l’endroit où l’on se trouve. Quelle est la hauteur de la courbe en <i>x</i> ?',fb:'<i>x</i> est une position sur l’axe ; la hauteur de la bande est 1/<i>x</i>.'},
    {t:'<i>h</i>',indice:'Une aire, c’est largeur × hauteur. La hauteur vaut-elle 1 ?',fb:'Ce serait vrai si la hauteur valait 1. Elle vaut 1/<i>x</i>.'}]}},
{cle:'derivee',beat:6,scene:'hyper',
  text:['Écris-le, une ligne à la fois.'],
  deriv:[
    {tex:'A(x+h) - A(x) \\approx h \\times \\dfrac{1}{x}',alt:'A(x + h) − A(x) ≈ h × 1/x',r:'L’aire gagnée, c’est la bande : largeur <i>h</i>, hauteur 1/<i>x</i>.'},
    {tex:'\\dfrac{A(x+h) - A(x)}{h} \\approx \\dfrac{1}{x}',alt:'(A(x + h) − A(x)) / h ≈ 1/x',r:'On divise par <i>h</i> : à gauche, le taux d’accroissement de A.'},
    {tex:"A'(x) = \\dfrac{1}{x}",alt:'A′(x) = 1/x',r:'Quand <i>h</i> tend vers 0, le taux devient la dérivée. La vitesse de l’aire, c’est la hauteur de la courbe.'}]},
{cle:'definition',beat:6,scene:'hyper',set:{strip:0},seq:[{p:{lnc:1},d:2400,w:300},{p:{dl:1,seg:1},d:900,w:500},{p:{z1:1},d:700,w:500}],
  text:['Voilà la définition de ton cours, et tu sais d’où elle sort :',
    {t:'la fonction logarithme [[neperien|népérien]], notée ln, est la primitive de <i>x</i> [[fleche|↦]] 1/<i>x</i> sur l’[[intervalle]] '+I0+' qui s’annule en 1.',fort:true},
    {t:'En rouge, la courbe de ln : sa hauteur en <i>x</i> est l’aire sous la courbe de 1/<i>x</i>, de 1 à <i>x</i>. (À gauche de 1, on verra plus loin.)',a:1},
    {t:'En 1, il n’y a aucune aire : ln 1 = 0. C’est le « qui s’annule en 1 ».',a:2}],
  tex:[["\\ln'(x) = \\dfrac{1}{x}",'ln′(x) = 1/x']]},
{cle:'pente',beat:6,scene:'hyper',set:{z1:0,dl:0,seg:0,tan:1,xt:1.2},seq:[{p:{xt:5.6},d:5200,w:500}],
  text:['En chaque <i>x</i>, la hauteur de la courbe de 1/<i>x</i> est la pente de la courbe rouge : elle monte de plus en plus doucement, sans jamais s’arrêter.',
    {t:'Quelle est la pente de la courbe rouge en <i>x</i> = 10 ?',a:0}],
  verifie:{...VF([['0,1',true,'Oui : la hauteur de 1/<i>x</i> en 10, soit 1/10 = 0,1.'],
    ['10',false,'10, c’est <i>x</i> lui-même, pas la pente.','La pente de ln en <i>x</i> vaut la hauteur de 1/<i>x</i>. Que vaut 1/<i>x</i> pour <i>x</i> = 10 ?'],
    ['Environ 2,30',false,'ln 10 ≈ 2,30 est la hauteur de la courbe rouge, pas sa pente.','2,30, c’est ln 10 : la hauteur de la courbe rouge, pas sa pente.']])}},

/* ===== 7. la courbe de ln ===== */
{cle:'e',beat:7,scene:'courbe',set:{lnR:0,lnL:0,ev:1,xe:1,eNom:0,half:0,q5:0,dot5:0,cp:0,cLab:0,near:0,dom:0,sg:0,ab:0,zone:0},ctl:'e',
  need:()=>!!(S.eFound||S.eMontre),needLabel:'Trouve d’abord ce nombre',
  text:['Il existe un nombre où l’aire sous 1/<i>x</i>, depuis 1, vaut exactement 1. Où est-il, à ton avis ?'],
  pari:BET([['Vers 2','Pari noté. Cherche-le avec le curseur.'],['Entre 2 et 3','Pari noté. Cherche-le avec le curseur.'],['Vers 10','Pari noté. Cherche-le avec le curseur.']])},
{cle:'e-nom',beat:7,scene:'courbe',set:{xe:E_},seq:[{p:{lnR:1},d:2000,w:200},{p:{eNom:1},d:800,w:300}],
  text:()=>['Ce nombre s’appelle [[nombre-e|e]] : e ≈ 2,718.',
    {t:'Sur la courbe rouge de ln : ln e = 1.',a:0,fort:true},
    {t:ctx.rep('e')===1?'Ton pari, entre 2 et 3, était le bon.':ctx.rep('e')===0?'Ton pari disait vers 2 : l’aire de 1 à 2 ne vaut que 0,69, il faut aller plus loin.':ctx.rep('e')===2?'Ton pari disait vers 10 : l’aire de 1 à 10 vaut déjà 2,30. L’aire grandit vite au début.':'L’aire vaut 1 entre 2 et 3.',a:0},
    {t:'Ces chiffres, 2 718…, te disent quelque chose ? Garde-les en tête.',a:1}]},
{cle:'gauche',beat:7,scene:'courbe',set:{ev:0,eNom:0,half:1,q5:1,lnL:0,dot5:0},
  text:['Et à gauche de 1 ? Prends <i>x</i> = 0,5.','ln 0,5 est-il positif, négatif ou nul ?'],
  pari:{reveal:[{p:{q5:0,lnL:1},d:1600},{p:{dot5:1},d:600}],opts:[
    {t:'Positif',fb:'Non : ln monte toujours (sa pente 1/<i>x</i> est positive) et vaut 0 en 1. Avant 1, sa courbe est donc sous l’axe : ln 0,5 est négatif.'},
    {t:'Négatif',fb:'Oui : ln monte toujours (sa pente 1/<i>x</i> est positive) et vaut 0 en 1. Avant 1, sa courbe est donc sous l’axe.'},
    {t:'Nul',fb:'Seul ln 1 vaut 0. ln monte toujours : avant 1, sa courbe est sous l’axe, donc ln 0,5 est négatif.'}]}},
{cle:'demi',beat:7,scene:'courbe',set:{cp:1,csx:1,csy:1,cLab:0},seq:[{p:{csx:2},d:2200,w:700},{p:{csy:.5},d:2200,w:300},{p:{cLab:1},d:600}],
  text:['Combien vaut ln 0,5 ? Prends l’aire grise, de 0,5 à 1.',
    {t:'Étire-la par 2 et écrase-la par 2 : elle devient l’aire de 1 à 2, qui vaut 0,69.',a:1},
    {t:'Mais en allant de 1 vers 0,5, on recule : ln perd cette aire au lieu de la gagner. ln 0,5 = −0,69 = −ln 2.',a:2,fort:true},
    {t:'Pour tout <i>a</i> > 0, c’est la règle de l’[[inverse]] :',a:2}],
  tex:[['\\ln\\dfrac{1}{a} = -\\ln a','ln(1/a) = −ln a']]},
{cle:'domaine',beat:7,scene:'courbe',set:{half:0,cp:0,cLab:0,dot5:0,dom:0,near:1,xd:.5},seq:[{p:{xd:.12},d:3000,w:600},{p:{dom:1},d:900,w:400}],
  text:['Et pour <i>x</i> ≤ 0 ?',
    {t:'Plus <i>x</i> s’approche de 0, plus 1/<i>x</i> monte : l’aire de <i>x</i> à 1 grandit sans fin, et ln <i>x</i> descend sans fin.',a:0},
    {t:'En 0, 1/<i>x</i> n’existe pas : on ne passe pas de l’autre côté. ln <i>x</i> n’existe que pour <i>x</i> > 0 : son [[ensemble|ensemble de définition]] est '+I0+'.',a:1,fort:true},
    {t:'Au bac, ln <i>u</i> n’existe que si <i>u</i> > 0 : ce sont les [[conditions|conditions d’existence]].',a:1}]},
{cle:'croissance',beat:7,scene:'courbe',set:{near:0,dom:0},seq:[{p:{sg:1},d:900,w:300},{p:{ab:1},d:900,w:1200}],
  text:['Deux choses se lisent sur la courbe rouge.',
    {t:'Son signe : ln <i>x</i> &lt; 0 sur '+I01+', ln 1 = 0, ln <i>x</i> > 0 sur '+I1+'.',a:0},
    {t:'Sa pente 1/<i>x</i> est toujours positive : ln est [[croissante|strictement croissante]]. Un nombre plus grand a un ln plus grand.',a:1},
    {t:'Pour <i>a</i> > 0 et <i>b</i> > 0 (le signe [[equivalent|⇔]] se lit « équivaut à ») :',a:1,fort:true}],
  tex:[['\\ln a = \\ln b \\iff a = b','ln a = ln b ⇔ a = b'],['\\ln a < \\ln b \\iff a < b','ln a < ln b ⇔ a < b']]},
{cle:'v-courbe',beat:7,scene:'courbe',set:{sg:0,ab:0,zone:0},
  text:['Pour quels <i>x</i> a-t-on ln(<i>x</i> − 2) &lt; 0 ?'],
  verifie:{...VF([['2&nbsp;&lt; <i>x</i>&nbsp;&lt; 3',true,'Oui : il faut <i>x</i> − 2 > 0 pour que ln existe, et <i>x</i> − 2 &lt; 1 pour qu’il soit négatif. Donc 2 &lt; <i>x</i> &lt; 3.'],
    ['<i>x</i>&nbsp;&lt; 3',false,'<i>x</i> &lt; 3 oublie les conditions d’existence : pour <i>x</i> = 1, ln(−1) n’existe pas. Il faut 0 &lt; <i>x</i> − 2 &lt; 1, soit 2 &lt; <i>x</i> &lt; 3.','Et l’existence ? ln(<i>x</i> − 2) n’existe que si <i>x</i> − 2 > 0.'],
    ['<i>x</i>&nbsp;> 3',false,'Pour <i>x</i> > 3, <i>x</i> − 2 > 1 et ln(<i>x</i> − 2) est positif. Il faut 0 &lt; <i>x</i> − 2 &lt; 1 : 2 &lt; <i>x</i> &lt; 3.','ln est-il négatif à gauche de 1 ou à droite ? Regarde où la courbe rouge passe sous l’axe.']]),reveal:[{p:{zone:1},d:800}]}},

/* ===== 8. les règles de ln ===== */
{cle:'r-prod',beat:8,scene:'bandes',set:{tit:'Le produit, sur les aires',sous:'6 = 2 × 3',r1:0,r2:0,br6:0,quot:0,r4:0,b3:0,h4:0,s12:0,z1:0,q38:0},seq:[{p:{r1:1},d:700,w:300},{p:{r2:1},d:900,w:300},{p:{br6:1},d:700,w:300}],
  text:['Des aires sortent toutes les règles de calcul de ln. Tu en as déjà deux, pour <i>a</i> > 0 et <i>b</i> > 0.',
    {t:'Le produit : le logarithme d’un produit est la somme des logarithmes. L’inverse, vu à gauche de 1.',a:1}],
  tex:[['\\ln(ab) = \\ln a + \\ln b','ln(ab) = ln a + ln b'],['\\ln\\dfrac{1}{a} = -\\ln a','ln(1/a) = −ln a']]},
{cle:'r-quotient',beat:8,scene:'bandes',set:{tit:'Le quotient, sur les aires',sous:'6 ÷ 2 = 3'},seq:[{p:{quot:1},d:900,w:300}],
  text:['Le quotient <i>a</i>/<i>b</i> : à toi de trouver la ligne suivante.'],
  deriv:[
    {tex:'\\ln\\dfrac{a}{b} = \\ln\\Big(a \\times \\dfrac{1}{b}\\Big)',alt:'ln(a/b) = ln(a × 1/b)',r:'Diviser par <i>b</i>, c’est multiplier par 1/<i>b</i>.'},
    {tex:'\\ln\\dfrac{a}{b} = \\ln a + \\ln\\dfrac{1}{b} = \\ln a - \\ln b',alt:'ln(a/b) = ln a + ln(1/b) = ln a − ln b',r:'Le produit, puis l’inverse.'}],
  pari:{label:'La ligne suivante ?',opts:[
    {t:'ln <i>a</i> + ln(1/<i>b</i>)',ok:true,fb:'Oui : la règle du produit.'},
    {t:'ln <i>a</i> × ln(1/<i>b</i>)',indice:'ln change-t-il un produit en produit, ou en somme ?',fb:'ln change un produit en somme, jamais en produit.'},
    {t:'ln <i>a</i> / ln <i>b</i>',indice:'La ligne écrite est un produit. Quelle règle s’applique ?',fb:'C’est l’erreur ln(<i>a</i>/<i>b</i>) = ln <i>a</i> / ln <i>b</i>.'}]}},
{cle:'r-puissance',beat:8,scene:'bandes',set:{tit:'La puissance, sur les aires',sous:'8 = 2 × 2 × 2',r1:0,r2:0,br6:0,quot:0,r4:1,b3:0},
  text:['Quatrième règle : la puissance. Un pari d’abord.',{t:'ln 8, c’est 3 ln 2 ou (ln 2)<sup>3</sup> ?',fort:true}],
  pari:{reveal:[{p:{b3:1},d:1400}],opts:[
    {t:'3 ln 2',fb:'C’est ça : 8 = 2 × 2 × 2, et ln change chaque × en + : ln 2 + ln 2 + ln 2 = 3 ln 2 ≈ 2,08. Regarde les trois bandes égales.'},
    {t:'(ln 2)<sup>3</sup>',fb:'Non : (ln 2)<sup>3</sup> ≈ 0,33. Or 8 = 2 × 2 × 2, et ln change chaque × en + : ln 2 + ln 2 + ln 2 = 3 ln 2 ≈ 2,08. Regarde les trois bandes.'},
    {t:'Ni l’un ni l’autre',fb:'8 = 2 × 2 × 2, et ln change chaque × en + : ln 8 = ln 2 + ln 2 + ln 2 = 3 ln 2 ≈ 2,08. Regarde les trois bandes égales.'}]}},
{cle:'r-puissance2',beat:8,scene:'bandes',set:{r4:0,b3:1},
  text:['La règle, une ligne à la fois. Elle vaut pour tout [[relatif|entier relatif]] <i>n</i>, et pour la racine carrée.'],
  deriv:[
    {tex:'\\ln(a^n) = \\ln(a \\times a \\times \\cdots \\times a)',alt:'ln(aⁿ) = ln(a × a × … × a)',r:'Pour <i>n</i> entier positif, une [[puissance]] est un produit de <i>n</i> facteurs.'},
    {tex:'\\ln(a^n) = \\ln a + \\ln a + \\cdots + \\ln a = n \\ln a',alt:'ln(aⁿ) = ln a + ln a + … + ln a = n ln a',r:'La règle du produit, <i>n</i> fois. Exemple : ln(e<sup>3</sup>) = 3 ln e = 3.'},
    {tex:'\\ln(a^{-n}) = \\ln\\dfrac{1}{a^n} = -n \\ln a',alt:'ln(a^−n) = ln(1/aⁿ) = −n ln a',r:'Un exposant négatif donne un inverse : la règle vaut pour tout entier relatif.'},
    {tex:'\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a',alt:'ln √a = ½ ln a',r:'Car ln <i>a</i> = ln(√<i>a</i> × √<i>a</i>) = 2 ln √<i>a</i>. Sur la figure : ln 2 est la moitié de ln 4.',p:{b3:0,h4:1,tit:'La racine carrée, sur les aires',sous:'4 = 2 × 2, donc √4 = 2'}}]},
{cle:'r-somme',beat:8,scene:'bandes',set:{tit:'Une somme, sur les aires',sous:'1 + 1 = 2',h4:0,b3:0,s12:0,z1:1},
  text:['Une erreur fréquente des copies :',{t:'ln(1 + 1) = ln 1 + ln 1 = 0.',fort:true},'Où est l’erreur ?'],
  pari:{label:'Réponds',reveal:[{p:{s12:1},d:900}],opts:[
    {t:'ln(1 + 1) ≠ ln 1 + ln 1',ok:true,fb:'Oui : la règle vaut pour un produit, ln(1 × 1) = ln 1 + ln 1. Or 1 + 1 = 2, et ln 2 ≈ 0,69.'},
    {t:'ln 1 + ln 1 ≠ 0',indice:'ln 1, c’est l’aire de 1 à 1. Cette égalité-là est-elle fausse ?',fb:'ln 1 = 0, donc ln 1 + ln 1 = 0 : cette égalité-là est juste.'},
    {t:'Aucune : ln 2 = 0',indice:'ln 2, c’est l’aire de 1 à 2. Est-elle nulle ?',fb:'ln 2 est l’aire de 1 à 2 : environ 0,69, pas 0.'}]}},
{cle:'v-regles',beat:8,scene:'bandes',set:{tit:'Un quotient, sur les aires',sous:'8 ÷ 3',s12:0,z1:0,q38:0},
  text:['Écris ln(8/3) avec ln 2 et ln 3.'],
  verifie:{...VF([['3 ln 2 − ln 3',true,'Oui : 8/3 est un quotient, donc ln 8 − ln 3 ; et 8 = 2<sup>3</sup>, donc ln 8 = 3 ln 2.'],
    ['3 ln 2 / ln 3',false,'C’est l’erreur ln(<i>a</i>/<i>b</i>) = ln <i>a</i> / ln <i>b</i>. Un quotient devient une différence : 3 ln 2 − ln 3.','Un quotient devient-il un quotient de ln, ou une différence ?'],
    ['(ln 2)<sup>3</sup> − ln 3',false,'L’exposant descend devant : ln(2<sup>3</sup>) = 3 ln 2, pas (ln 2)<sup>3</sup>. Donc 3 ln 2 − ln 3.','Dans 2<sup>3</sup>, l’exposant descend-il devant ln, ou reste-t-il en puissance ?']]),reveal:[{p:{q38:1},d:900}]}},
{cle:'retour',beat:8,scene:'retour',set:{l1:0,l2:0,sum:0,res:0,wink:0},seq:[{p:{l1:1},d:600,w:600},{p:{l2:1},d:600,w:300},{p:{sum:1},d:700,w:500},{p:{res:1},d:700,w:700}],
  text:['Retour à l’énigme : 2\u202F718\u202F281 × 3\u202F141\u202F592.',
    {t:'Avec une table de ln, on additionne : 14,8155 + 14,9602 = 29,7757.',a:0},
    {t:'Lue à l’envers, la table donne 8,54 × 10<sup>12</sup>. Une addition au lieu de 49 produits.',a:3,fort:true},
    {t:'Et ces deux nombres : tu les reconnais ?',a:3}],
  pari:{reveal:[{p:{wink:1},d:800}],opts:[
    {t:'e et π',fb:'Bien vu : 2,718281…, c’est e ; 3,141592…, c’est π. L’énigme était un clin d’œil.'},
    {t:'Des puissances de 2',fb:'Non : 2,718281…, c’est e, le nombre où l’aire vaut 1 ; 3,141592…, c’est π.'},
    {t:'Rien de spécial',fb:'Regarde mieux : 2,718281…, c’est e, le nombre où l’aire vaut 1 ; 3,141592…, c’est π.'}]}},

/* ===== 9. au bac ===== */
{cle:'bac',beat:9,scene:'bac',set:{f:0,dom:0,grp:0,cand:0,rej:0},seq:[{p:{f:1},d:1800,w:300}],
  text:['Un exercice type du bac : résoudre dans ℝ l’équation'],
  tex:[['\\ln(x-1) + \\ln(x+1) = \\ln 3','ln(x − 1) + ln(x + 1) = ln 3']],
  pari:{label:'Premier geste ?',reveal:[{p:{dom:1},d:800}],opts:[
    {t:'Écrire les conditions d’existence',fb:'C’est le bon réflexe : la première ligne attendue dit où l’équation a un sens. Sans elle, on garde une fausse solution.'},
    {t:'Regrouper les deux ln en un seul',fb:'Ce sera le deuxième geste. Regrouper d’abord fait oublier les conditions, et l’on garde une fausse solution.'},
    {t:'Enlever les ln des deux côtés',fb:'Ce sera le troisième geste, avec ln <i>a</i> = ln <i>b</i> ⇔ <i>a</i> = <i>b</i>. D’abord : les conditions d’existence.'}]}},
{cle:'bac-sol',beat:9,scene:'bac',
  text:['La solution, une ligne à la fois.'],
  deriv:[
    {tex:'x - 1 > 0 \\ \\text{et}\\ x + 1 > 0 \\iff x > 1',alt:'x − 1 > 0 et x + 1 > 0 ⇔ x > 1',r:'Les conditions d’existence : ce qui est dans chaque ln doit être strictement positif. On cherche <i>x</i> dans '+I1+'.',p:{dom:1}},
    {tex:'\\ln(x-1) + \\ln(x+1) = \\ln\\big((x-1)(x+1)\\big)',alt:'ln(x − 1) + ln(x + 1) = ln((x − 1)(x + 1))',r:'Pour <i>x</i> > 1, les deux nombres sont positifs : la règle du produit s’applique.',p:{grp:1}},
    {tex:'\\ln(x^2 - 1) = \\ln 3 \\iff x^2 - 1 = 3',alt:'ln(x² − 1) = ln 3 ⇔ x² − 1 = 3',r:'(<i>x</i> − 1)(<i>x</i> + 1) = <i>x</i><sup>2</sup> − 1, puis ln <i>a</i> = ln <i>b</i> ⇔ <i>a</i> = <i>b</i>.'},
    {tex:'x^2 = 4 \\iff x = 2 \\ \\text{ou}\\ x = -2',alt:'x² = 4 ⇔ x = 2 ou x = −2',r:'Deux candidats. Sont-ils tous les deux solutions ?',p:{cand:1}}]},
{cle:'bac-rejet',beat:9,scene:'bac',
  text:['Deux candidats : 2 et −2.','Lesquels sont solutions de l’équation de départ ?'],
  pari:{label:'Réponds',reveal:[{p:{rej:1},d:900}],opts:[
    {t:'2 seulement',ok:true,fb:'Oui : −2 n’est pas dans '+I1+', et ln(−2 − 1) = ln(−3) n’existe pas. Pour 2 : ln 1 + ln 3 = ln 3. S = {2}.'},
    {t:'2 et −2',indice:'Vérifie chaque candidat dans les conditions d’existence : est-il plus grand que 1 ?',fb:'−2 vérifie <i>x</i><sup>2</sup> = 4, mais pas <i>x</i> > 1 : ln(−3) n’existe pas. On le rejette.'},
    {t:'Aucun',indice:'Remplace <i>x</i> par 2 dans l’équation de départ : que vaut ln 1 + ln 3 ?',fb:'2 convient : ln 1 + ln 3 = 0 + ln 3 = ln 3. Seul −2 est rejeté.'}]}},
{cle:'bac-copie',beat:9,scene:'bac',
  text:['La rédaction attendue. Les conditions d’existence viennent en premier : ce sont elles qui écartent −2.'],
  html:()=>`<div class="lg-copie">${[
    'Conditions d’existence : '+NW('<i>x</i> − 1 > 0')+' et '+NW('<i>x</i> + 1 > 0')+', donc '+NW('<i>x</i> > 1')+'.',
    'Pour '+NW('<i>x</i> > 1')+', l’équation équivaut à '+NW('ln((<i>x</i> − 1)(<i>x</i> + 1)) = ln 3')+',',
    'soit '+NW('<i>x</i><sup>2</sup> − 1 = 3')+', soit '+NW('<i>x</i><sup>2</sup> = 4')+' : '+NW('<i>x</i> = 2')+' ou '+NW('<i>x</i> = −2')+'.',
    'Or −2 ne vérifie pas '+NW('<i>x</i> > 1')+' : on le rejette.',
    '<b>S = {2}</b>'].map(l=>`<p>${ctx.ty(l)}</p>`).join('')}</div>`},

/* ===== 10. bilan ===== */
{cle:'q1',beat:10,scene:'quiz',set:{qi:0,rv:0},
  text:['Trois pièges des copies, pour finir. Le premier : le signe.','Quel est le signe de ln 0,8 ?'],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],opts:[
    {t:'Négatif',ok:true,fb:'Oui : 0,8 est entre 0 et 1, et sur '+I01+' la courbe de ln est sous l’axe (ln 0,8 ≈ −0,22).'},
    {t:'Positif',indice:'Où est 0,8 par rapport à 1 ? De quel côté de 1 la courbe est-elle sous l’axe ?',fb:'Un ln n’est positif qu’au-delà de 1. 0,8 &lt; 1, donc ln 0,8 &lt; 0 (environ −0,22).'},
    {t:'On ne peut pas savoir sans calculatrice',indice:'La courbe suffit : de quel côté de 1 est 0,8 ?',fb:'Pas besoin de calculatrice : 0 &lt; 0,8 &lt; 1, donc ln 0,8 &lt; 0.'}]}},
{cle:'q2',beat:10,scene:'quiz',set:{qi:1,rv:0},
  text:['Le deuxième : le domaine.','Pour quels <i>x</i> ln(3 − <i>x</i>) existe-t-il ?'],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],opts:[
    {t:'<i>x</i>&nbsp;&lt; 3',ok:true,fb:'Oui : il faut 3 − <i>x</i> > 0, donc <i>x</i> &lt; 3. L’ensemble de définition est '+NW(']−∞,3[')+'.'},
    {t:'<i>x</i>&nbsp;> 3',indice:'Résous 3 − <i>x</i> > 0 : attention au signe devant <i>x</i>.',fb:'Pour <i>x</i> = 4, 3 − <i>x</i> = −1 : ln(−1) n’existe pas. Il faut 3 − <i>x</i> > 0, soit <i>x</i> &lt; 3.'},
    {t:'<i>x</i>&nbsp;≤ 3',indice:'Que vaut 3 − <i>x</i> pour <i>x</i> = 3 ? ln 0 existe-t-il ?',fb:'Pour <i>x</i> = 3, ln 0 n’existe pas : l’inégalité est stricte, <i>x</i> &lt; 3.'}]}},
{cle:'q3',beat:10,scene:'quiz',set:{qi:2,rv:0},
  text:['Le troisième : la somme.','À quoi est égal ln 3 + ln 5 ?'],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],opts:[
    {t:'ln 15',ok:true,fb:'Oui : ln 3 + ln 5 = ln(3 × 5) = ln 15. Une somme de ln est le ln d’un produit.'},
    {t:'ln 8',indice:'3 + 5 = 8 : tu as additionné à l’intérieur. La règle parle d’un produit.',fb:'C’est le piège ln(<i>a</i> + <i>b</i>) = ln <i>a</i> + ln <i>b</i>, à l’envers : ln 8 n’est pas ln 3 + ln 5. La somme des ln, c’est ln(3 × 5) = ln 15.'},
    {t:'ln 3 × ln 5',indice:'ln change les produits en sommes. Ici, dans quel sens faut-il lire la règle ?',fb:'ln 3 × ln 5 est un autre nombre. La règle : ln 3 + ln 5 = ln(3 × 5) = ln 15.'}]}},
{cle:'fin',beat:10,scene:'end',set:{n:0},seq:[{p:{n:5},d:3000,w:300}],
  text:['Fin de la séance « Pourquoi ln ».'],html:()=>profileHTML()}
];

// une inégalité ne commence jamais une ligne : espace insécable devant < et > (le noyau soude
// déjà =, ≤, ≥…, mais pas < et >)
const insec=s=>typeof s==='string'?s.replace(/ (&lt;|>)(?= )/g,' $1'):s;
const insecT=v=>typeof v==='function'?()=>insecT(v()):Array.isArray(v)?v.map(insecT):v&&typeof v==='object'&&'t' in v?{...v,t:insec(v.t)}:insec(v);
STEPS.forEach(st=>{st.text=insecT(st.text);const P=st.pari||st.verifie;
  if(P)P.opts.forEach(o=>{o.t=insec(o.t);o.fb=insec(o.fb);if(o.indice)o.indice=insec(o.indice);});
  (st.deriv||[]).forEach(x=>{x.r=insec(x.r);});});

/* ---------- les mots ---------- */
const mots={
  puissance:{t:'puissance',d:'2<sup>5</sup> se lit « 2 puissance 5 » : 2 multiplié 5 fois par lui-même, 2 × 2 × 2 × 2 × 2 = 32.'},
  exposant:{t:'exposant',d:'Le petit nombre en haut : dans 2<sup>5</sup>, l’exposant est 5. Il compte les facteurs. Multiplier deux puissances de 2, c’est additionner les exposants : 2<sup>2</sup> × 2<sup>3</sup> = 2<sup>5</sup>. Un exposant négatif donne un inverse : 2<sup>−3</sup> = 1/2<sup>3</sup>.'},
  logarithme:{t:'logarithme',d:'Du grec <i>logos</i> (le rapport) et <i>arithmos</i> (le nombre). Le logarithme d’un nombre compte les pas de multiplication qui mènent de 1 à ce nombre : dans la table des doublements, celui de 8 est 3, car 2 × 2 × 2 = 8. Au bac, on utilise ln (et, en PC et SVT, le logarithme décimal).'},
  aire:{t:'aire sous une courbe',d:'La surface comprise entre la courbe, l’axe horizontal et deux verticales. On la compte en unités du repère : un carré de côté 1 vaut 1.'},
  hyperbole:{t:'hyperbole',d:'La courbe de la fonction <i>x</i> ↦ 1/<i>x</i>. Quand <i>x</i> double, sa hauteur est divisée par 2 ; elle s’approche des axes sans jamais les toucher.'},
  derivee:{t:'dérivée',d:'La dérivée <i>f</i> ′(<i>x</i>) est la pente de la courbe de <i>f</i> au point <i>x</i> : la limite du taux d’accroissement quand le pas <i>h</i> devient très petit. Elle dit à quelle vitesse <i>f</i> change.'},
  primitive:{t:'primitive',d:'Une primitive de <i>f</i> est une fonction <i>F</i> dont la dérivée est <i>f</i> : <i>F</i> ′ = <i>f</i>. Exemple : <i>x</i><sup>2</sup> est une primitive de 2<i>x</i>. Une fonction a plusieurs primitives ; « qui s’annule en 1 » en choisit une seule.'},
  taux:{t:'taux d’accroissement',d:'De combien <i>f</i> change quand <i>x</i> avance de <i>h</i>, divisé par <i>h</i> : (<i>f</i>(<i>x</i> + <i>h</i>) − <i>f</i>(<i>x</i>)) ÷ <i>h</i>. C’est la pente de la droite qui joint les deux points de la courbe.'},
  tendvers:{t:'tend vers',d:'« <i>h</i> tend vers 0 » : <i>h</i> devient aussi proche de 0 qu’on veut, sans jamais valoir 0. On écrit <i>h</i> → 0.'},
  tangente:{t:'tangente',d:'La droite qui touche la courbe en un point en suivant sa direction. Sa pente est la dérivée en ce point.'},
  neperien:{t:'népérien',d:'De Neper, l’orthographe française de Napier. Le logarithme népérien, noté ln, est celui de ton cours : ln 1 = 0 et ln e = 1.'},
  fleche:{t:'la flèche ↦',d:'« <i>x</i> ↦ 1/<i>x</i> » se lit « la fonction qui à <i>x</i> associe 1/<i>x</i> ». La flèche dit ce que la fonction fait à chaque nombre.'},
  intervalle:{t:'intervalle',d:I0+' est l’ensemble des nombres strictement plus grands que 0. Le crochet tourné vers l’extérieur dit que 0 n’en fait pas partie ; +∞ n’est pas un nombre : l’intervalle n’a pas de fin.'},
  'nombre-e':{t:'le nombre e',d:'e ≈ 2,718 : le nombre pour lequel l’aire sous 1/<i>x</i>, de 1 à e, vaut exactement 1. Donc ln e = 1.'},
  inverse:{t:'inverse',d:'L’inverse de <i>a</i> est 1/<i>a</i> : le nombre qui, multiplié par <i>a</i>, donne 1. L’inverse de 2 est 0,5.'},
  ensemble:{t:'ensemble de définition',d:'Tous les <i>x</i> pour lesquels une fonction a un sens. Pour ln, c’est '+I0+' : ln 0 et ln(−2) n’existent pas.'},
  conditions:{t:'conditions d’existence',d:'Avant de résoudre une équation avec ln, on écrit pour quels <i>x</i> chaque ln existe : ce qui est dedans doit être strictement positif. Une solution qui ne les vérifie pas est rejetée.'},
  croissante:{t:'strictement croissante',d:'Une fonction strictement croissante monte toujours : si <i>a</i> &lt; <i>b</i>, alors <i>f</i>(<i>a</i>) &lt; <i>f</i>(<i>b</i>). C’est le cas quand sa dérivée est strictement positive.'},
  equivalent:{t:'équivaut à (⇔)',d:'« A ⇔ B » se lit « A équivaut à B » : si l’un est vrai, l’autre aussi, et inversement. On peut remplacer l’un par l’autre dans un calcul.'},
  relatif:{t:'entier relatif',d:'Un entier positif, négatif ou nul : …, −2, −1, 0, 1, 2, … Leur ensemble se note ℤ.'}
};
Object.values(mots).forEach(m=>{m.d=insec(m.d);});

/* ---------- la fin de séance : une ligne, une action, le détail replié ---------- */
function profileHTML(){
  const Q=[['q1','le signe de ln'],['q2','le domaine de ln'],['q3','la somme sous ln']];
  const res=Q.map(([k])=>ctx.juste(k));
  const V=STEPS.filter(s=>s.verifie),vok=V.filter(s=>ctx.juste(s.k)===true).length;
  const r=k=>ctx.rep(k),paris=[];
  if(r('a24')!=null)paris.push(r('a24')===1?'tu avais vu les aires égales':'les aires égales t’ont surpris');
  if(r('gauche')!=null)paris.push(r('gauche')===1?'tu avais vu ln 0,5 négatif':'ln 0,5 négatif t’a surpris');
  if(S.eMontre)paris.push('e t’a été montré');else if(S.eFound)paris.push('tu as trouvé e toi-même');
  const ligne=`« Vérifie » réussies du premier coup : ${vok} sur ${V.length}.${paris.length?` Tes paris : ${paris.join(' ; ')}.`:''}`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]}</li>`).join('');
  const seance2=['les limites de ln en 0 et en +∞','la dérivée de ln <i>u</i> et les primitives de <i>u</i> ′/<i>u</i>','le logarithme décimal (PC et SVT)','l’étude complète d’une fonction avec ln, comme au problème du bac'];
  return ty(`<p class="lg-res">${ligne}</p><a class="lien-exos" href="/pilote/logarithme/exercices">Faire les exercices →</a>`
    +`<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>`
    +`<div class="next"><div class="pari-k">La prochaine séance : ln comme fonction</div><ol>${seance2.map(x=>`<li>${x}</li>`).join('')}</ol></div>`
    +`<p class="small">Ses exercices sont déjà prêts, rangés à part à la fin de la page d’exercices.</p></details>`);
}

/* ---------- contrôles par étape ---------- */
S.tries=0;S.eFound=false;S.eMontre=false;S.eEssais=0;S.eDispo=false;
const $=ctx.$;
// le test de « Ce qu'il faut savoir », réussi du premier coup : on peut passer le rappel
function majSaut(){const z=root.querySelector('#saut'),st=ctx.etape();if(!z||!st||st.cle!=='savoir')return;
  if(ctx.juste('savoir')===true&&!z.innerHTML)z.innerHTML=`<p class="ctl-note">${ty('Tu connais la règle : tu peux passer le rappel.')}</p><button type="button" class="lg-saut" data-aller="napier">Passer à l’énigme →</button>`;}
let minuteur=null;
const CTL={
  saut:{html:()=>'<div id="saut"></div>',init(){majSaut();}},
  pick:{html:()=>'<p class="ctl-note" id="pickfb">Ton calcul s’affichera ici.</p>',
    init(){hooks.onPick=pk=>{const fb=$('#pickfb');if(!fb)return;
      if(pk.length===1){fb.innerHTML=ty(`${2**pk[0]} est au pas ${pk[0]}. Choisis le deuxième nombre.`);return;}
      S.tries++;const[i,j]=pk,s=i+j;
      fb.innerHTML=ty(s<=10?`${2**i} × ${2**j} : pas ${i} + pas ${j} = pas ${s} → <b>${2**s}</b>. ${S.tries>=3?'Tu calcules comme un astronome de 1620.':'Essaie une autre paire.'}`:`${i} + ${j} = ${s} pas : la table s’arrête à 10. Il faudrait l’agrandir.`);};}},
  rule:{html:()=>`<div class="ctl"><label class="sl"><span>Règle du haut : <i>a</i> = <output id="oa"></output></span><input id="ra" type="range" min="0" max="1" step="0.001"></label><label class="sl"><span>Curseur : <i>b</i> = <output id="ob"></output></span><input id="rb" type="range" min="0" max="1" step="0.001"></label></div><p class="ctl-note" id="rulefb"></p>`,
    init(){const sc=scenes.rule,ra=$('#ra'),rb=$('#rb');
      const sync=()=>{ra.value=sc.p.la;rb.value=sc.p.lb;const a=10**sc.p.la,b=10**sc.p.lb;$('#oa').textContent=fr(a);$('#ob').textContent=fr(b);
        $('#rulefb').innerHTML=ty(Math.abs(a-2.5)<.04&&Math.abs(b-3.2)<.05?'2,5 × 3,2 = <b>8</b>. Tu viens de multiplier en ajoutant deux longueurs.':'Défi : calcule 2,5 × 3,2. Pose le 1 du haut sur 2,5, puis le curseur sur 3,2.');};
      ra.addEventListener('input',()=>{ctx.stop();sc.p.la=+ra.value;sc.p.lb=Math.min(sc.p.lb,1-sc.p.la);sc.render();sync();});
      rb.addEventListener('input',()=>{ctx.stop();sc.p.lb=Math.min(+rb.value,1-sc.p.la);sc.render();sync();});
      hooks.frame=sync;sync();}},
  gen:{html:()=>`<div class="ctl"><label class="sl"><span><i>a</i> = <output id="oa"></output></span><input id="ga" type="range" min="1.2" max="3" step="0.01"></label><label class="sl"><span><i>b</i> = <output id="ob"></output> (entre 1 et <i>a</i>)</span><input id="gb" type="range" min="1.1" max="3" step="0.01"></label></div><p class="ctl-note" id="genfb"></p>`,
    init(){const sc=scenes.hyper,ga=$('#ga'),gb=$('#gb');
      // ab reste dans la scène (ab ≤ 8,8)
      const borne=()=>{sc.p.b=clamp(sc.p.b,1.1,Math.min(sc.p.a,8.8/sc.p.a));};
      const sync=()=>{ga.value=sc.p.a;gb.value=sc.p.b;$('#oa').textContent=fr(sc.p.a);$('#ob').textContent=fr(sc.p.b);
        $('#genfb').innerHTML=ty(`Aire de 1 à ${fr(sc.p.b)} : <b>${fr(integ(1,sc.p.b),3)}</b><br>Aire de ${fr(sc.p.a)} à ${fr(sc.p.a*sc.p.b)} : <b>${fr(integ(sc.p.a,sc.p.a*sc.p.b),3)}</b>`);};
      ga.addEventListener('input',()=>{ctx.stop();sc.p.a=+ga.value;borne();sc.render();sync();});
      gb.addEventListener('input',()=>{ctx.stop();sc.p.b=+gb.value;borne();sc.render();sync();});
      hooks.frame=sync;sync();}},
  // e : le curseur, et « Montre-moi » après deux essais ou vingt secondes ; l'étape attend e
  e:{html:()=>`<div class="ctl"><label class="sl"><span><i>x</i> = <output id="ox"></output></span><input id="ex" type="range" min="1" max="4" step="0.001"></label></div><p class="ctl-note" id="efb"></p><button type="button" class="ctl-btn alt${S.eDispo&&!S.eFound&&!S.eMontre?'':' lg-cache'}" id="montre"${S.eMontre||S.eFound?' disabled hidden':''}>Montre-moi</button>`,
    init(){const sc=scenes.courbe,ex=$('#ex'),bt=$('#montre');
      const dispo=()=>{if(S.eFound||S.eMontre)return;S.eDispo=true;const b=$('#montre');if(b)b.classList.remove('lg-cache');};
      const sync=()=>{const xe=sc.p.xe,A=integ(1,xe),hit=Math.abs(A-1)<.004;ex.value=xe;$('#ox').textContent=fr(xe,3);
        if(hit&&!S.eFound&&!S.eMontre){S.eFound=true;bt.disabled=true;bt.hidden=true;ctx.majNav();}
        $('#efb').innerHTML=ty(S.eMontre?'Le voici : l’aire vaut 1 pour <b><i>x</i> ≈ 2,718</b>.':hit?'Tu l’as : l’aire vaut 1 pour <b><i>x</i> ≈ 2,718</b>.':`Aire de 1 à ${fr(xe)} : <b>${fr(A,3)}</b>. ${A<1?'Encore un peu plus loin.':'Trop loin : reviens un peu.'}`);};
      S.essai=()=>{if(S.eFound||S.eMontre)return;S.eEssais++;if(S.eEssais>=2)dispo();};
      ex.addEventListener('input',()=>{ctx.stop();sc.p.xe=+ex.value;sc.render();sync();});
      ex.addEventListener('change',()=>S.essai());
      bt.addEventListener('click',()=>{if(S.eFound||S.eMontre)return;S.eMontre=true;bt.disabled=true;bt.hidden=true;ctx.majNav();ctx.tween(sc,{xe:E_},1400).then(sync);sync();});
      hooks.frame=sync;sync();
      clearTimeout(minuteur);minuteur=setTimeout(()=>{const st=ctx.etape();if(st&&st.cle==='e')dispo();},20000);}}
};
// glisser x sur la scène, à l'étape de e
let dragE=false;
const svg=ctx.svg;
const moveE=e=>{ctx.stop();const sc=scenes.courbe;sc.p.xe=clamp((svgPt(e).x-200)/104,1,4);sc.render();hooks.frame&&hooks.frame();};
const surDown=e=>{const st=ctx.etape();if(!st||st.ctl!=='e')return;dragE=true;svg.setPointerCapture(e.pointerId);moveE(e);};
const surMove=e=>{if(dragE)moveE(e);};
const surUp=()=>{if(dragE){dragE=false;S.essai&&S.essai();}};
svg.addEventListener('pointerdown',surDown);svg.addEventListener('pointermove',surMove);
svg.addEventListener('pointerup',surUp);svg.addEventListener('pointercancel',surUp);
// « Passer à l'énigme » ; après un choix (clic ou touche), le noyau a rendu la réponse
const surClicL=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');
  if(b&&root.contains(b)){const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0)ctx.aller(i);return;}
  setTimeout(majSaut,0);};
const surToucheL=()=>setTimeout(majSaut,0);
root.addEventListener('click',surClicL);window.addEventListener('keydown',surToucheL);

return {BEATS,STEPS,CTL,mots,
  reset(){S.tries=0;S.eFound=false;S.eMontre=false;S.eEssais=0;S.eDispo=false;},
  plain:s=>s.replace(/1\/x/g,'1 sur x').replace(/1,01/g,'1 virgule 01').replace(/⇔/g,' équivaut à ').replace(/\+∞/g,' plus l’infini').replace(/−∞/g,' moins l’infini'),
  demonter(){clearTimeout(minuteur);svg.removeEventListener('pointerdown',surDown);svg.removeEventListener('pointermove',surMove);svg.removeEventListener('pointerup',surUp);svg.removeEventListener('pointercancel',surUp);
    root.removeEventListener('click',surClicL);window.removeEventListener('keydown',surToucheL);}};
});
}
