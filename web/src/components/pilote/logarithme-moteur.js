/* eslint-disable */
// @ts-nocheck
/**
 * Leçon pilote « Fonction logarithme népérien », deuxième version (refonte
 * 2026-10, retours du propriétaire du 2026-10-26 : docs/refonte/04-retours-pilotes.md).
 *
 * Huit parties, chacune finie par une question « Vérifie » : le problème de
 * Napier, la table des puissances de 2, les trous et les pas de 1 %, la règle
 * à calcul, l'aire sous l'hyperbole, la dérivée et la définition du bac, les
 * quatre règles de ln, puis le quiz. Les scènes et le script vivent ici ; le
 * déroulé, le panneau, les paris et la voix vivent dans `noyau.js`.
 */
import { monterLecon } from "./noyau";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {E,lerp,clamp,fr,ty,show,mtext,setMT,svgPt,scene,scenes,hooks,S}=ctx;
function integ(x1,x2){const n=400,h=(x2-x1)/n;let s=1/x1+1/x2;for(let i=1;i<n;i++)s+=(i%2?4:2)/(x1+i*h);return s*h/3;}
const disc=v=>Math.round(v);

/* ---------- 1. le cahier de calcul ---------- */
scene('ledger',{
  p:{mul:1,mx:0,rows:0,res:0,add:0,addc:0,q:0},
  build(g){
    const A=2718281,B=3141592,R=470,CW=18;
    this.cap=E('text',{y:72,class:'t-cap s-dim','text-anchor':'middle',text:'Une multiplication d’astronome, à la main'},g);
    this.mg=E('g',{},g);
    E('text',{x:R,y:150,class:'mono t-big s-ink','text-anchor':'end',text:String(A)},this.mg);
    E('text',{x:R,y:196,class:'mono t-big s-ink','text-anchor':'end',text:'× '+B},this.mg);
    E('line',{x1:R-290,x2:R,y1:214,y2:214,class:'k-dim','stroke-width':2},this.mg);
    const digits=String(B).split('').reverse().map(Number);
    this.rowEls=digits.map((d,i)=>E('text',{x:R-i*CW,y:252+i*40,class:'mono t-big s-ink','text-anchor':'end',text:String(A*d)},this.mg));
    this.resG=E('g',{},this.mg);
    E('line',{x1:R-290,x2:R,y1:512,y2:512,class:'k-dim','stroke-width':2},this.resG);
    E('text',{x:R,y:552,class:'mono t-big s-a','text-anchor':'end',text:String(A*B)},this.resG);
    E('text',{x:R,y:598,class:'t-lab s-dim','text-anchor':'end',text:'49 produits · 7 lignes décalées · des retenues'},this.resG);
    this.ag=E('g',{},g);
    const RA=880;this.RA=RA;
    E('line',{x1:560,x2:560,y1:130,y2:600,class:'k-line'},this.ag);
    E('text',{x:RA,y:252,class:'mono t-big s-ink','text-anchor':'end',text:String(A)},this.ag);
    E('text',{x:RA,y:292,class:'mono t-big s-ink','text-anchor':'end',text:'+ '+B},this.ag);
    E('line',{x1:RA-200,x2:RA,y1:310,y2:310,class:'k-dim','stroke-width':2},this.ag);
    const clip=E('clipPath',{id:'sommeclip'},g);this.clipR=E('rect',{y:316,height:46,x:RA,width:0},clip);
    this.sumT=E('text',{x:RA,y:350,class:'mono t-big s-b','text-anchor':'end','clip-path':'url(#sommeclip)',text:String(A+B)},this.ag);
    this.addc=E('text',{x:RA,y:398,class:'t-lab s-dim','text-anchor':'end',text:'7 additions de chiffres · une ligne'},this.ag);
    this.qg=E('g',{},g);
    const t=mtext(this.qg,500,390,'_f_ (_a_ × _b_) = _f_ (_a_) + _f_ (_b_)','t-huge s-ink','middle');
    E('tspan',{class:'s-a',text:' ?'},t);
    E('text',{x:500,y:450,class:'t-lab s-dim','text-anchor':'middle',text:'une fonction qui change les produits en sommes'},this.qg);
  },
  render(){
    const p=this.p,dim=1-.96*p.q;
    this.mg.setAttribute('transform',`translate(${(175*(1-p.mx)).toFixed(1)} 0)`);
    this.cap.setAttribute('x',lerp(500,325,p.mx));
    show(this.mg,p.mul*dim);show(this.cap,dim);
    this.rowEls.forEach((t,i)=>{const o=clamp(p.rows-i,0,1);t.style.opacity=o;t.setAttribute('transform',`translate(0 ${((1-o)*10).toFixed(1)})`);});
    show(this.resG,p.res);show(this.ag,clamp(p.add,0,1)*dim);
    // la somme se pose chiffre par chiffre, de droite à gauche
    const w=this.sumT.getComputedTextLength()||126,k=Math.floor(clamp(p.add-1,0,7)+1e-6);
    this.clipR.setAttribute('x',(this.RA-w*k/7-2).toFixed(1));this.clipR.setAttribute('width',(w*k/7+6).toFixed(1));
    show(this.addc,p.addc);show(this.qg,p.q);
  }
});

/* ---------- 2. la table des puissances de 2 ---------- */
scene('table',{
  p:{cells:0,arrA:0,arrB:0,log:0,gap:0,inter:0,pick:[],demo:0,da:2,db:3,why:0},
  build(g){
    const X=i=>52+i*82;this.X=X;
    this.capTop=E('text',{x:52,y:180,class:'t-lab s-dim',text:'Pas — on avance en ajoutant 1'},g);
    this.capLog=E('text',{x:52,y:180,class:'t-lab2 s-a',text:'Logarithme — le nombre de pas'},g);
    this.capBot=E('text',{x:52,y:532,class:'t-lab s-dim',text:'Valeur — on avance en multipliant par 2'},g);
    this.arcA=[];this.arcB=[];
    for(let i=0;i<10;i++){
      const x1=X(i)+38,x2=X(i+1)+38,m=(x1+x2)/2;
      const a=E('g',{},g);E('path',{d:`M${x1+8} 240 Q${m} 212 ${x2-8} 240`,class:'k-a nofill','stroke-width':1.5,'marker-end':'url(#arw)'},a);E('text',{x:m,y:214,class:'t-tiny s-a','text-anchor':'middle',text:'+1'},a);this.arcA.push(a);
      const b=E('g',{},g);E('path',{d:`M${x1+8} 460 Q${m} 488 ${x2-8} 460`,class:'k-b nofill','stroke-width':1.5,'marker-end':'url(#arw)'},b);E('text',{x:m,y:500,class:'t-tiny s-b','text-anchor':'middle',text:'×2'},b);this.arcB.push(b);
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
    [[1,'3'],[2,'5  6  7']].forEach(([i,t])=>{const x=X(i)+79;E('line',{x1:x,x2:x,y1:460,y2:560,class:'k-c','stroke-dasharray':'4 5','stroke-width':1.5},this.ghost);E('text',{x,y:592,class:'mono t-mid s-c','text-anchor':'middle',text:t},this.ghost);});
    E('text',{x:52,y:640,class:'t-lab s-c',text:'Ces nombres n’ont pas de case. Ni 9 à 15, ni 17 à 31… La table est trouée.'},this.ghost);
    this.banner=E('text',{x:52,y:600,class:'t-big2 s-ink'},g);
    this.banner2=E('text',{x:52,y:648,class:'t-big2 s-ink'},g);
    // pourquoi : 4 × 8 = (2 × 2) × (2 × 2 × 2)
    this.w1=E('text',{x:52,y:600,class:'t-big2 s-ink'},g);
    [['4 × 8 = ','s-ink'],['(2 × 2)','s-a'],[' × ','s-ink'],['(2 × 2 × 2)','s-b']].forEach(([t,c])=>E('tspan',{class:c,text:t},this.w1));
    this.w2=E('text',{x:52,y:648,class:'t-big2 s-ink'},g);
    E('tspan',{text:'= 2⁵ = 32 : cinq doublements, '},this.w2);E('tspan',{class:'s-a',text:'2'},this.w2);E('tspan',{text:' + '},this.w2);E('tspan',{class:'s-b',text:'3'},this.w2);E('tspan',{text:' = 5 pas'},this.w2);
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
      if(p.inter){if(pk.includes(i)){tc+=' hl-a';bc+=' hl-a';}if(pk.length===2&&i===pk[0]+pk[1]){tc+=' hl-b';bc+=' hl-b';}}
      else if(d>=1){if(i===da||i===db){tc+=' hl-a';bc+=' hl-a';}if(d>=3&&i===da+db)tc+=' hl-b';if(d>=4&&i===da+db)bc+=' hl-b';}
      else if(p.log>.5)tc+=' hl-log';
      c.top.setAttribute('class',tc);c.bot.setAttribute('class',bc);
    });
    const on=clamp(p.cells,0,1),all=clamp(p.cells-10,0,1),fade=1-.8*p.gap;
    this.arcA.forEach((a,i)=>show(a,clamp(p.arrA-i,0,1)*fade));
    this.arcB.forEach((b,i)=>show(b,clamp(p.arrB-i,0,1)*fade));
    show(this.capTop,on*(1-p.log));show(this.capLog,p.log);
    show(this.capBot,all*(1-p.gap));show(this.ghost,p.gap);
    let t1='',t2='',o=0;
    if(p.inter){o=1;
      if(pk.length===1)t1=`${2**pk[0]}  →  ${pk[0]} pas`;
      else if(pk.length===2){const[i,j]=pk,s=i+j;t1=s<=10?`${2**i} × ${2**j}   →   ${i} + ${j} = ${s} pas   →   ${2**s}`:`${i} + ${j} = ${s} pas : hors de la table`;}
      else t1='Clique deux nombres de la ligne du bas';
    }else if(d>=1){o=1;t1=`${2**da} → pas ${da}      ${2**db} → pas ${db}`;if(d>=2)t2=`${da} + ${db} = ${da+db} pas`;if(d>=4)t2+=`   →   ${2**(da+db)}`;}
    else if(p.log>0){o=p.log*(1-p.gap);t1='log₂ 512 = 9 : neuf doublements mènent de 1 à 512';}
    o*=1-p.why;
    this.banner.textContent=ty(t1);this.banner2.textContent=ty(t2);show(this.banner,o);show(this.banner2,o);
    this.banner.setAttribute('class',pk.length===2||!p.inter?'t-big2 s-ink':'t-big2 s-dim');
    show(this.w1,clamp(p.why,0,1));show(this.w2,clamp(p.why-1,0,1));
  }
});

/* ---------- 3. des pas minuscules : 1,01^k ---------- */
const MARQUES=[[70,'a'],[140,'b'],[110,'a'],[196,'b'],[306,'c']];
scene('fine',{
  p:{pts:0,m70:0,m140:0,m110:0,m196:0,m306:0,sumA:0,sumB:0,swap:0},
  build(g){
    const K=323,L=110,R=930,T=70,B=590;this.K=K;this.L=L;this.B=B;
    const xa=k=>L+(R-L)*k/330,ya=v=>B-(B-T)*v/25,xb=v=>L+(R-L)*v/25,yb=k=>B-(B-T)*k/330;
    Object.assign(this,{xa,ya,xb,yb});
    this.vals=[];for(let k=0;k<=K;k++)this.vals.push(1.01**k);
    E('line',{x1:L,y1:B,x2:R+12,y2:B,class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:L,y1:B,x2:L,y2:T-12,class:'k-dim','stroke-width':1.5},g);
    const sup=(par,x,y,base,s,rest,cls,anchor)=>{const t=E('text',{x,y,class:cls,'text-anchor':anchor||'start'},par);E('tspan',{text:base},t);E('tspan',{dy:'-9','font-size':'13',text:s},t);E('tspan',{dy:'9',text:rest},t);return t;};
    this.ta=E('g',{},g);this.tb=E('g',{},g);
    for(let k=0;k<=300;k+=50){E('line',{x1:xa(k),x2:xa(k),y1:B,y2:B+6,class:'k-dim'},this.ta);E('text',{x:xa(k),y:B+24,class:'t-tick s-dim','text-anchor':'middle',text:k},this.ta);}
    for(let v=5;v<=25;v+=5){E('line',{x1:L-6,x2:L,y1:ya(v),y2:ya(v),class:'k-dim'},this.ta);E('text',{x:L-12,y:ya(v)+5,class:'t-tick s-dim','text-anchor':'end',text:v},this.ta);}
    E('text',{x:R,y:B+102,class:'t-lab s-dim','text-anchor':'end',text:'nombre de pas k — on ajoute 1'},this.ta);
    sup(this.ta,L+14,T-26,'valeur 1,01','k','  — on multiplie par 1,01','t-lab s-dim');
    for(let v=5;v<=25;v+=5){E('line',{x1:xb(v),x2:xb(v),y1:B,y2:B+6,class:'k-dim'},this.tb);E('text',{x:xb(v),y:B+24,class:'t-tick s-dim','text-anchor':'middle',text:v},this.tb);}
    for(let k=50;k<=300;k+=50){E('line',{x1:L-6,x2:L,y1:yb(k),y2:yb(k),class:'k-dim'},this.tb);E('text',{x:L-12,y:yb(k)+5,class:'t-tick s-dim','text-anchor':'end',text:k},this.tb);}
    E('text',{x:R,y:B+94,class:'t-lab s-dim','text-anchor':'end',text:'valeur'},this.tb);
    E('text',{x:L+14,y:T-26,class:'t-lab2 s-a',text:'nombre de pas = logarithme de la valeur'},this.tb);
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
    this.swapLab=E('text',{x:xb(1.01**280)+16,y:yb(280)+34,class:'t-lab2 s-a',text:'la courbe du logarithme'},g);
  },
  render(){
    const p=this.p,n=p.pts*(this.K+1),s=p.swap,L=this.L,B=this.B,xa=this.xa;
    for(let k=0;k<=this.K;k++){const d=this.dots[k],v=this.vals[k];d.setAttribute('cx',lerp(xa(k),this.xb(v),s).toFixed(1));d.setAttribute('cy',lerp(this.ya(v),this.yb(k),s).toFixed(1));d.style.opacity=clamp(n-k,0,1);}
    show(this.ta,1-s);show(this.tb,s);
    MARQUES.forEach(([k])=>show(this.marks[k],p['m'+k]*(1-s)));
    show(this.barA,p.sumA*(1-s));show(this.barAL,p.sumA*(1-s));
    this.barB.setAttribute('transform',`translate(${(L+p.sumB*(xa(110)-L)).toFixed(1)} ${(B+44+(1-p.sumB)*44).toFixed(1)})`);
    show(this.barB,clamp(p.sumA*2-1,0,1)*(1-s));show(this.sumL,clamp(p.sumB*3-2,0,1)*(1-s));
    show(this.swapLab,s);
  }
});

/* ---------- 4. la règle à calcul ---------- */
scene('rule',{
  p:{la:0,lb:0,cur:0,read:0,drag:0,eqd:0},
  build(g){
    const x0=90,L=820;this.x0=x0;this.L=L;const pos=v=>x0+L*Math.log10(v);this.pos=pos;
    const clip=E('clipPath',{id:'ruleclip'},g);E('rect',{x:28,y:200,width:944,height:320},clip);
    const root=E('g',{'clip-path':'url(#ruleclip)'},g);
    E('rect',{x:40,y:365,width:920,height:72,rx:2,class:'rulebody'},root);
    this.ticks(root,365,1);
    this.C=E('g',{class:'grab'},root);
    E('rect',{x:x0-52,y:290,width:L+104,height:72,rx:2,class:'rulebody'},this.C);
    this.ticks(this.C,362,-1);
    this.eq=E('g',{},g);
    [[1,2],[2,4],[4,8]].forEach(([a,b])=>{const m=(pos(a)+pos(b))/2;E('path',{d:`M${pos(a)+3} 284 Q${m} 246 ${pos(b)-3} 284`,class:'k-a nofill','stroke-width':2,'marker-end':'url(#arw)'},this.eq);E('text',{x:m,y:250,class:'t-lab2 s-a','text-anchor':'middle',text:'×2'},this.eq);});
    E('text',{x:500,y:212,class:'t-lab s-dim','text-anchor':'middle',text:'chaque doublement occupe la même longueur'},this.eq);
    this.cg=E('g',{class:'grab'},g);
    E('rect',{x:-18,y:262,width:36,height:200,rx:2,class:'glass'},this.cg);
    E('line',{x1:0,x2:0,y1:254,y2:470,class:'k-c','stroke-width':1.8},this.cg);
    this.bLab=E('text',{x:0,y:244,class:'t-lab2 s-b','text-anchor':'middle'},this.cg);
    this.am=E('g',{},g);
    E('path',{d:'M0 444l-8 14h16z',class:'s-a'},this.am);
    this.aLab=E('text',{x:0,y:484,class:'t-lab2 s-a','text-anchor':'middle'},this.am);
    this.read=E('text',{x:500,y:600,class:'t-big2 s-ink','text-anchor':'middle'},g);
    const drag=(el,key)=>el.addEventListener('pointerdown',e=>{
      if(!this.p.drag)return;e.preventDefault();el.setPointerCapture(e.pointerId);ctx.stop();
      const x0_=svgPt(e).x,v0=this.p[key];
      const mv=ev=>{this.p[key]=clamp(v0+(svgPt(ev).x-x0_)/this.L,0,1);this.p.lb=Math.min(this.p.lb,1-this.p.la);this.render();hooks.frame&&hooks.frame();};
      const up=()=>{el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);};
      el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);});
    drag(this.C,'la');drag(this.cg,'lb');
  },
  ticks(par,base,dir){
    for(let i=10;i<=100;i++){const v=i/10,x=this.pos(v),major=i%10===0,half=i%5===0,len=major?26:half?16:9;
      E('line',{x1:x,x2:x,y1:base,y2:base+dir*len,class:'k-ink','stroke-width':major?1.6:1},par);
      if(major)E('text',{x,y:dir>0?base+len+20:base-len-8,class:'mono t-tickb s-ink','text-anchor':'middle',text:String(v)},par);
      else if(i===15)E('text',{x,y:dir>0?base+len+16:base-len-6,class:'mono t-tiny s-dim','text-anchor':'middle',text:'1,5'},par);}
  },
  render(){
    const p=this.p,a=10**p.la,b=10**p.lb;
    this.C.setAttribute('transform',`translate(${(this.L*p.la).toFixed(2)} 0)`);
    this.cg.setAttribute('transform',`translate(${(this.x0+this.L*(p.la+p.lb)).toFixed(2)} 0)`);show(this.cg,p.cur);
    this.C.style.cursor=this.cg.style.cursor=p.drag?'grab':'default';
    this.bLab.textContent=`b = ${fr(b)}`;
    this.am.setAttribute('transform',`translate(${(this.x0+this.L*p.la).toFixed(2)} 0)`);show(this.am,Math.max(p.read,p.drag));
    this.aLab.textContent=`a = ${fr(a)}`;
    this.read.textContent=`${fr(a)} × ${fr(b)} ≈ ${fr(a*b)}`;show(this.read,p.read);
    show(this.eq,p.eqd);
  }
});

/* ---------- 5. l'aire sous 1/x, puis ln ---------- */
scene('hyper',{
  p:{curve:0,pts2:0,A1:0,A2:0,A3:0,lab:0,tgt:0,m:0,pt:0,sx:1,sy:1,gen:0,a:2.4,b:1.8,dec:0,strip:0,xs:2.5,h:1.4,lnc:0,z1:0,tan:0,xt:2,ev:0,xe:1,eq:0,eqs:''},
  build(g){
    const X=x=>80+100*x,Y=y=>590-210*y;this.X=X;this.Y=Y;
    E('line',{x1:X(0),x2:X(8.9),y1:Y(0),y2:Y(0),class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:X(0),x2:X(0),y1:Y(0),y2:Y(2.6),class:'k-dim','stroke-width':1.5},g);
    for(let i=1;i<=8;i++){E('line',{x1:X(i),x2:X(i),y1:Y(0),y2:Y(0)+6,class:'k-dim'},g);E('text',{x:X(i),y:Y(0)+26,class:'t-tick s-dim','text-anchor':'middle',text:i},g);}
    [[.5,'0,5'],[1,'1'],[1.5,'1,5'],[2,'2']].forEach(([v,t])=>{E('line',{x1:X(0)-6,x2:X(0),y1:Y(v),y2:Y(v),class:'k-dim'},g);E('text',{x:X(0)-12,y:Y(v)+5,class:'t-tick s-dim','text-anchor':'end',text:t},g);});
    this.one=E('line',{x1:X(0),x2:X(8.8),y1:Y(1),y2:Y(1),class:'k-dim','stroke-dasharray':'3 7'},g);
    this.r={};['e','base','A1','A2','A3','g1','d0','g2','strip','mv'].forEach(k=>this.r[k]=E('path',{class:'reg'},g));
    this.tgt=E('path',{class:'k-ink nofill','stroke-dasharray':'7 6','stroke-width':1.6},g);
    this.box=E('path',{class:'k-ink nofill','stroke-width':1.6},g);
    const curve=(f,x1,x2)=>{let d='';for(let i=0;i<=300;i++){const x=x1+(x2-x1)*i/300;d+=(i?'L':'M')+X(x).toFixed(1)+' '+Y(f(x)).toFixed(1);}return d;};
    this.cv=E('path',{d:curve(x=>1/x,.4,8.9),class:'k-ink nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    // ln en rouge, 1/x en noir : deux courbes, deux couleurs
    this.lnv=E('path',{d:curve(Math.log,.55,8.9),class:'k-a nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.cvLab=mtext(g,X(.62)+16,Y(1/.62),'_y_ = 1/_x_','t-lab2 s-ink');
    this.lnLab=mtext(g,X(7.4),Y(Math.log(7.4))+38,'_y_ = ln _x_','t-lab2 s-a','middle');
    // trois points : quand x double, la hauteur est divisée par 2
    this.p2=E('g',{},g);
    [[1,'1'],[2,'1/2'],[4,'1/4']].forEach(([x,t])=>{E('line',{x1:X(x),x2:X(x),y1:Y(0),y2:Y(1/x),class:'k-ink','stroke-dasharray':'4 5','stroke-width':1.5},this.p2);E('circle',{cx:X(x),cy:Y(1/x),r:6,class:'s-ink'},this.p2);E('text',{x:X(x)+12,y:Y(1/x)-12,class:'t-lab2 s-ink',text:`hauteur ${t}`},this.p2);});
    E('text',{x:X(4.6),y:Y(1.15),class:'t-lab s-dim',text:'x double → la hauteur est divisée par 2'},this.p2);
    this.L={};['A1','A2','A3','g1','g2','d0'].forEach(k=>this.L[k]=E('text',{class:'t-lab2 s-ink','text-anchor':'middle'},g));
    this.mvLab=E('text',{class:'t-lab2 s-a','text-anchor':'middle'},g);
    // le point suivi pendant l'étirement et l'écrasement
    this.ptG=E('g',{},g);this.ptGap=E('line',{class:'k-a','stroke-dasharray':'4 4','stroke-width':2},this.ptG);this.ptC=E('circle',{r:8,class:'s-a'},this.ptG);
    this.ptT=E('text',{class:'t-lab2 s-a'},this.ptG);this.ptT2=E('text',{class:'t-lab s-ink'},this.ptG);
    this.arrow=E('path',{class:'k-dim nofill','stroke-width':1.6,'marker-end':'url(#arw)'},g);
    this.arrowLab=mtext(g,0,0,'étirer ×_a_, écraser ÷_a_','t-lab s-dim','middle');
    this.mk={};
    [['a','_a_','s-b'],['b','_b_','s-a'],['ab','_ab_','s-b'],['x','_x_','s-ink'],['e','','s-ink']].forEach(([k,t,c])=>{const mg=E('g',{},g);E('line',{x1:0,x2:0,y1:Y(0)-6,y2:Y(0)+8,class:'k-ink','stroke-width':2},mg);this.mk[k]={g:mg,t:mtext(mg,0,Y(0)+56,t,'t-lab2 '+c,'middle')};});
    this.brk=E('g',{},g);this.brkP=E('path',{class:'k-c nofill','stroke-width':2},this.brk);this.brkT=mtext(this.brk,0,Y(0)+104,'aire de 1 à _ab_','t-lab2 s-c','middle');
    this.hLab=mtext(g,0,0,'hauteur 1/_x_','t-lab2 s-ink','end');
    this.wP=E('path',{class:'k-ink nofill','stroke-width':1.6},g);
    this.wLab=mtext(g,0,Y(0)+96,'largeur _h_','t-lab2 s-ink','middle');
    // ln 1 = 0
    this.z1=E('g',{},g);E('circle',{cx:X(1),cy:Y(0),r:8,class:'s-a'},this.z1);E('text',{x:X(1)+14,y:Y(0)-16,class:'t-lab2 s-a',text:'ln 1 = 0 : de 1 à 1, aucune aire'},this.z1);
    // la hauteur de 1/x devient la pente de ln
    this.tanG=E('g',{},g);
    this.tanH=E('line',{class:'k-ink','stroke-width':4},this.tanG);this.tanP1=E('circle',{r:6,class:'s-ink'},this.tanG);
    this.tanL=E('line',{class:'k-a','stroke-width':3},this.tanG);this.tanP2=E('circle',{r:7,class:'s-a'},this.tanG);
    this.tanT1=E('text',{class:'t-lab2 s-ink'},this.tanG);this.tanT2=E('text',{class:'t-lab2 s-a'},this.tanG);
    this.eDot=E('circle',{r:7,class:'s-a'},g);
    this.eH=E('line',{class:'k-a','stroke-dasharray':'4 5','stroke-width':1.6},g);
    this.eqT=E('text',{x:935,y:118,class:'t-big2 s-ink','text-anchor':'end'},g);
  },
  reg(x1,x2,sx=1,sy=1){if(x2<x1)[x1,x2]=[x2,x1];const X=this.X,Y=this.Y,n=60;let d=`M${X(x1*sx).toFixed(1)} ${Y(0)}`;for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n;d+=`L${X(x*sx).toFixed(1)} ${Y(sy/x).toFixed(1)}`;}return d+`L${X(x2*sx).toFixed(1)} ${Y(0)}Z`;},
  setR(k,x1,x2,o,cls,sx,sy){const e=this.r[k];e.style.opacity=o;if(o>.001)e.setAttribute('d',this.reg(x1,x2,sx,sy));e.setAttribute('class','reg '+cls);},
  lab(k,x1,x2,txt,o){const t=this.L[k],mid=(x1+x2)/2,hm=1/mid;t.setAttribute('x',this.X(mid));t.setAttribute('y',hm*210>56?this.Y(hm/2)+7:this.Y(hm)-14);t.textContent=txt;t.style.opacity=o;},
  marker(k,x,o,txt,cls){const m=this.mk[k];m.g.setAttribute('transform',`translate(${this.X(x).toFixed(1)} 0)`);m.g.style.opacity=o;if(txt!=null){m.t.textContent=txt;m.t.setAttribute('class','t-lab2 '+cls);}},
  render(){
    const p=this.p,X=this.X,Y=this.Y;
    this.cv.style.strokeDashoffset=1000*(1-p.curve);show(this.cvLab,clamp(p.curve*2-1,0,1));
    this.lnv.style.strokeDashoffset=1000*(1-p.lnc);show(this.lnLab,clamp(p.lnc*2-1,0,1)*(1-p.tan));
    show(this.p2,p.pts2);
    this.setR('A1',1,2,p.A1,'f-a');this.setR('A2',2,4,p.A2,'f-b');this.setR('A3',4,8,p.A3,'f-c');
    this.lab('A1',1,2,'≈ '+fr(integ(1,2)),p.A1*p.lab);this.lab('A2',2,4,'≈ '+fr(integ(2,4)),p.A2*p.lab);this.lab('A3',4,8,'≈ '+fr(integ(4,8)),p.A3*p.lab);
    this.tgt.setAttribute('d',this.reg(2,4));show(this.tgt,p.tgt);
    this.setR('mv',1,2,p.m,'f-a',p.sx,p.sy);
    const ml=this.mvLab;ml.textContent=`aire × ${fr(p.sx*p.sy)}`;ml.setAttribute('x',X(1.5*p.sx));ml.setAttribute('y',Y(p.sy/1.5)-48);show(ml,p.m);
    {const xp=1.5*p.sx,yp=p.sy/1.5,yc=1/xp;
      this.ptC.setAttribute('cx',X(xp));this.ptC.setAttribute('cy',Y(yp));
      this.ptGap.setAttribute('x1',X(xp));this.ptGap.setAttribute('x2',X(xp));this.ptGap.setAttribute('y1',Y(yp));this.ptGap.setAttribute('y2',Y(yc));
      show(this.ptGap,Math.abs(yp-yc)>.01?1:0);
      this.ptT.setAttribute('x',X(xp)+14);this.ptT.setAttribute('y',Y(yp)-44);this.ptT.textContent=`point : hauteur ${fr(yp)}`;
      this.ptT2.setAttribute('x',X(xp)+14);this.ptT2.setAttribute('y',Y(yp)-18);this.ptT2.textContent=Math.abs(yp-yc)<.005?`= la courbe en ${fr(xp,1)} ✓`:`courbe en ${fr(xp,1)} : ${fr(yc)}`;
      show(this.ptG,p.pt);}
    const a=p.a,b=p.b,og=p.gen*(1-p.dec);
    this.setR('g1',1,b,og,'f-a');this.setR('g2',a,a*b,p.gen,'f-b');this.setR('d0',1,a,p.dec,'f-c');
    this.lab('g1',1,b,'≈ '+fr(integ(1,b)),og);this.lab('g2',a,a*b,'≈ '+fr(integ(a,a*b)),p.gen);this.lab('d0',1,a,'≈ '+fr(integ(1,a)),p.dec);
    this.marker('a',a,p.gen);this.marker('b',b,og);this.marker('ab',a*b,p.gen);
    {const m1=(1+b)/2,m2=a*m1,x1=X(m1),y1=Y(1/m1)-26,x2=X(m2),y2=Y(1/m2)-26,cy=Math.min(y1,y2)-70,ay=.25*y1+.5*cy+.25*y2;
      this.arrow.setAttribute('d',`M${x1.toFixed(1)} ${y1.toFixed(1)}Q${((x1+x2)/2).toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);show(this.arrow,og);
      this.arrowLab.setAttribute('x',(x1+x2)/2);this.arrowLab.setAttribute('y',ay-14);show(this.arrowLab,og);}
    this.brkP.setAttribute('d',`M${X(1)} ${Y(0)+68}v10H${X(a*b)}v-10`);this.brkT.setAttribute('x',(X(1)+X(a*b))/2);show(this.brk,p.dec);
    this.setR('base',1,p.xs,p.strip,'f-a');this.setR('strip',p.xs,p.xs+p.h,p.strip,'f-b');
    const x0=X(p.xs),x1=X(p.xs+p.h),yt=Y(1/p.xs);
    this.box.setAttribute('d',`M${x0.toFixed(1)} ${Y(0)}V${yt.toFixed(1)}H${x1.toFixed(1)}V${Y(0)}`);show(this.box,p.strip);
    this.hLab.setAttribute('x',x0-10);this.hLab.setAttribute('y',(yt+Y(0))/2+6);show(this.hLab,p.strip);
    this.wP.setAttribute('d',`M${x0.toFixed(1)} ${Y(0)+66}v8H${x1.toFixed(1)}v-8`);show(this.wP,p.strip);
    this.wLab.setAttribute('x',(x0+x1)/2);show(this.wLab,p.strip);
    this.marker('x',p.xs,p.strip);
    show(this.z1,p.z1);
    {const xt=p.xt,lt=Math.log(xt),s=1/xt,d1=Math.min(1.1,xt-.56);
      this.tanH.setAttribute('x1',X(xt));this.tanH.setAttribute('x2',X(xt));this.tanH.setAttribute('y1',Y(0));this.tanH.setAttribute('y2',Y(s));
      this.tanP1.setAttribute('cx',X(xt));this.tanP1.setAttribute('cy',Y(s));
      this.tanL.setAttribute('x1',X(xt-d1));this.tanL.setAttribute('y1',Y(lt-s*d1));this.tanL.setAttribute('x2',X(xt+1.3));this.tanL.setAttribute('y2',Y(lt+s*1.3));
      this.tanP2.setAttribute('cx',X(xt));this.tanP2.setAttribute('cy',Y(lt));
      this.tanT1.setAttribute('x',X(xt)+12);this.tanT1.setAttribute('y',Y(s)-12);this.tanT1.textContent=`hauteur ${fr(s)}`;
      this.tanT2.setAttribute('x',X(xt+1.3)+8);this.tanT2.setAttribute('y',Y(lt+s*1.3)+6);this.tanT2.textContent=`pente ${fr(s)}`;
      show(this.tanG,p.tan);}
    const xe=p.xe,A=integ(1,xe),hit=Math.abs(A-1)<.004;
    this.setR('e',Math.min(1,xe),Math.max(1,xe),p.ev,xe>=1?'f-a':'f-c');
    this.marker('e',xe,p.ev,hit?'e ≈ 2,718':`x = ${fr(xe)}`,hit?'s-a':'s-ink');
    this.eDot.setAttribute('cx',X(xe));this.eDot.setAttribute('cy',Y(A));show(this.eDot,p.ev*p.lnc);
    this.eH.setAttribute('x1',X(0));this.eH.setAttribute('x2',X(xe));this.eH.setAttribute('y1',Y(A));this.eH.setAttribute('y2',Y(A));show(this.eH,p.ev*p.lnc);
    show(this.one,.7*p.ev);
    if(p.ev>.01){setMT(this.eqT,hit?'ln e = 1':`ln ${fr(xe)} ≈ ${fr(A,3)}`);this.eqT.setAttribute('class','t-big2 '+(hit?'s-a':'s-ink'));show(this.eqT,p.ev);}
    else{setMT(this.eqT,p.eqs);this.eqT.setAttribute('class','t-big2 s-ink');show(this.eqT,p.eq);}
  }
});

/* ---------- 6. la dérivée, en images ---------- */
scene('taux',{
  p:{on:0,sec:0,h:3.6,tan:0},
  build(g){
    const X=x=>110+92*x,Y=y=>600-170*y;this.X=X;this.Y=Y;this.f=x=>Math.sqrt(x);
    E('line',{x1:X(0),x2:X(8.6),y1:Y(0),y2:Y(0),class:'k-dim','stroke-width':1.5},g);
    E('line',{x1:X(0),x2:X(0),y1:Y(0),y2:Y(3.2),class:'k-dim','stroke-width':1.5},g);
    let d='';for(let i=0;i<=300;i++){const x=8.4*i/300;d+=(i?'L':'M')+X(x).toFixed(1)+' '+Y(this.f(x)).toFixed(1);}
    this.cv=E('path',{d,class:'k-ink nofill','stroke-width':3,pathLength:1000,'stroke-dasharray':'1000 1000'},g);
    this.cvL=mtext(g,X(6.6),Y(this.f(6.6))+44,'courbe de _f_','t-lab2 s-ink','middle');
    this.sec=E('line',{class:'k-ink','stroke-width':2},g);
    this.run=E('line',{class:'k-dim','stroke-dasharray':'5 5','stroke-width':1.6},g);
    this.rise=E('line',{class:'k-a','stroke-width':4},g);
    this.hL=mtext(g,0,0,'_h_','t-lab2 s-ink','middle');
    this.dL=mtext(g,0,0,'variation de _f_','t-lab2 s-a');
    this.pA=E('circle',{r:7,class:'s-ink'},g);this.pB=E('circle',{r:7,class:'s-ink'},g);
    this.lA=mtext(g,0,Y(0)+30,'_x_','t-lab2 s-ink','middle');this.lB=mtext(g,0,Y(0)+30,'_x_ + _h_','t-lab2 s-ink','middle');
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
    this.box.textContent=p.tan>.5?`tangente : pente ${fr(dv,3)} = la dérivée`:`pente de la droite : ${fr(s,3)}`;show(this.box,p.sec);
    this.box2.textContent=p.tan>.5?'la limite du taux quand h tend vers 0':'taux = variation de f ÷ h';show(this.box2,p.sec);
  }
});

/* ---------- 7. le tableau des règles ---------- */
const REGLES=[['ln(_ab_) = ln _a_ + ln _b_','ln 6 = ln 2 + ln 3'],['ln(1/_a_) = −ln _a_','ln(1/8) = −ln 8'],['ln(_a_/_b_) = ln _a_ − ln _b_','ln(3/4) = ln 3 − ln 4'],['ln(_a_ⁿ) = _n_ ln _a_','ln 8 = ln(2³) = 3 ln 2']];
const NOMS_R=['produit','inverse','quotient','puissance'];
scene('tableau',{
  p:{n:0,hl:-1,exN:0,v12:0},
  build(g){
    E('text',{x:90,y:96,class:'t-lab s-dim',text:'Les règles de ln, pour a > 0 et b > 0'},g);
    this.rows=REGLES.map(([r,ex],i)=>{const gg=E('g',{},g),y=180+i*112;
      E('text',{x:90,y,class:'t-lab s-dim',text:NOMS_R[i]},gg);
      const rt=mtext(gg,250,y,r,'t-big2 s-ink');const et=E('text',{x:250,y:y+40,class:'t-lab s-dim',text:'exemple : '+ex},gg);
      return {gg,rt,et};});
    this.v=E('text',{x:90,y:650,class:'t-lab2 s-a',text:'12 = 2 × 2 × 3 = 2² × 3   →   ln 12 = 2 ln 2 + ln 3'},g);
  },
  render(){
    const p=this.p,h=disc(p.hl);
    this.rows.forEach((r,i)=>{const o=clamp(p.n-i,0,1);r.gg.style.opacity=o;r.gg.setAttribute('transform',`translate(${((1-o)*-16).toFixed(1)} 0)`);
      r.rt.setAttribute('class','t-big2 '+(h===i?'s-a':'s-ink'));show(r.et,clamp(p.exN-i,0,1));});
    show(this.v,p.v12);
  }
});

/* ---------- 8. le quiz ---------- */
const QUIZ=[
  {big:'ln 18 = ?',r1:'18 = 2 × 3 × 3 = 2 × 3²',r2:'donc  ln 18 = ln 2 + 2 ln 3'},
  {big:'ln(2 + 3) = ?',r1:'2 + 3 = 5 est une somme',r2:'aucune règle ne la découpe : c’est ln 5'},
  {big:'ln(e³) = ?',r1:'ln(e³) = 3 ln e',r2:'et ln e = 1, donc  ln(e³) = 3'}
];
scene('quiz',{
  p:{qi:0,rv:0},
  build(g){
    this.tag=E('text',{x:500,y:190,class:'t-lab s-dim','text-anchor':'middle'},g);
    this.big=E('text',{x:500,y:320,class:'t-huge s-ink','text-anchor':'middle'},g);
    this.r1=E('text',{x:500,y:440,class:'t-big2 s-a','text-anchor':'middle'},g);
    this.r2=E('text',{x:500,y:490,class:'t-big2 s-a','text-anchor':'middle'},g);
  },
  render(){const q=QUIZ[disc(this.p.qi)];this.tag.textContent=`Question ${disc(this.p.qi)+1} sur 3`;this.big.textContent=ty(q.big);this.r1.textContent=q.r1;this.r2.textContent=ty(q.r2);show(this.r1,this.p.rv);show(this.r2,clamp(this.p.rv*2-1,0,1));}
});

/* ---------- 9. ce que tu sais maintenant ---------- */
scene('end',{
  p:{n:0},
  build(g){
    E('text',{x:90,y:96,class:'t-lab s-dim',text:'Ce que tu as compris'},g);
    const I=[['Un logarithme compte des pas :','il transforme les × en +.'],['L’aire sous 1/_x_ fait la même chose :','ln _x_ = l’aire de 1 à _x_.'],['La dérivée de cette aire est 1/_x_ :','ln est la primitive de 1/_x_ nulle en 1.'],['De là, quatre règles :','produit, inverse, quotient, puissance.']];
    this.items=I.map((l,i)=>{const gg=E('g',{},g),y=180+i*128;E('text',{x:90,y:y+22,class:'mono t-num s-a',text:String(i+1)},gg);mtext(gg,170,y,ty(l[0]),'t-big s-ink');mtext(gg,170,y+42,ty(l[1]),'t-big s-dim');return gg;});
  },
  render(){this.items.forEach((g,i)=>{const o=clamp(this.p.n-i,0,1);g.style.opacity=o;g.setAttribute('transform',`translate(${((1-o)*-16).toFixed(1)} 0)`);});}
});


/* ---------- le script ---------- */
const L2=Math.log10(2),L3=Math.log10(3);
const BEATS=[{name:'Le problème',court:'Napier'},{name:'La table'},{name:'Les trous'},{name:'La règle'},{name:'L’aire'},{name:'La dérivée',court:'Dérivée'},{name:'Les règles de ln',court:'Règles'},{name:'À toi'}];
const BET=t=>({opts:t.map(([x,fb])=>({t:x,fb}))});
const VF=t=>({opts:t.map(([x,ok,fb])=>({t:x,ok,fb}))});
const STEPS=[
/* ===== 0. le problème ===== */
{cle:'napier',beat:0,scene:'ledger',tag:'1614 · Édimbourg',set:{mul:1,mx:0},
  text:['Édimbourg, 1614.','John Napier regarde les astronomes de son temps se noyer dans les calculs.','Pour prédire où sera une planète, il faut multiplier des nombres comme ceux-ci — à la main, des centaines de fois.']},
{cle:'mult',beat:0,scene:'ledger',seq:[{p:{rows:7},d:4200,w:300},{p:{res:1},d:700}],
  text:['Une seule de ces multiplications : 49 produits de chiffres.',{t:'Sept lignes à décaler, des retenues partout.',a:0},{t:'Une erreur sur un seul chiffre, et la planète n’est plus là où on l’attend.',a:1}]},
{cle:'add',beat:0,scene:'ledger',seq:[{p:{mx:1},d:900,w:200},{p:{add:1},d:500},{p:{add:8},d:1800},{p:{addc:1},d:500}],
  text:['Pose maintenant les mêmes nombres en addition.',{t:'Sept petites additions de chiffres, de droite à gauche, sur une seule ligne.',a:2},{t:'L’addition est rapide et sûre. La multiplication est lente et fragile.',a:3,fort:true}]},
{cle:'reve',beat:0,scene:'ledger',seq:[{p:{q:1},d:900}],
  text:['Le rêve de Napier : une fonction <i>f</i> qui transformerait chaque multiplication en addition.','Est-ce seulement possible ?'],
  pari:BET([['Oui, ça doit exister','Napier y a cru assez pour y consacrer vingt ans de sa vie. Voyons s’il avait raison.'],['Non, c’est trop beau pour être vrai','Méfiance saine. Mais la réponse tient dans une simple table — regarde.'],['Aucune idée','C’est exactement là qu’en était Napier quand il a commencé. Allons-y.']])},

/* ===== 1. la table ===== */
{cle:'table',beat:1,scene:'table',set:{cells:0},seq:[{p:{cells:11},d:4400,w:200}],
  text:['Napier commence par une idée simple : chercher deux lignes de nombres qui avancent ensemble, l’une en multipliant, l’autre en additionnant.',{t:'En bas, on part de 1 et on double à chaque case : 1, 2, 4, 8…',a:0},{t:'En haut, on compte les doublements : 0, 1, 2, 3…',a:0}]},
{cle:'fleches',beat:1,scene:'table',seq:[{p:{arrA:10},d:2800,w:200},{p:{arrB:10},d:2800,w:400}],
  text:['Avance d’une case, et regarde ce qui change.',{t:'En haut, on ajoute 1.',a:0},{t:'En bas, on multiplie par 2.',a:1},{t:'Les deux lignes avancent ensemble : l’une à coups d’additions, l’autre à coups de multiplications.',a:1,fort:true}]},
{cle:'exemple',beat:1,scene:'table',set:{da:2,db:3,demo:0},seq:[{p:{demo:1},d:500,w:300},{p:{demo:2},d:500,w:1300},{p:{demo:3},d:500,w:1100},{p:{demo:4},d:500,w:900}],
  text:['Un exemple : 4 × 8, sans multiplier.',{t:'4 est au pas 2, et 8 au pas 3.',a:0},{t:'On additionne les pas : 2 + 3 = 5.',a:1},{t:'Au pas 5, la table donne 32. Et en effet, 4 × 8 = 32.',a:3}]},
{cle:'pourquoi',beat:1,scene:'table',set:{why:0},seq:[{p:{why:1},d:800,w:300},{p:{why:2},d:800,w:1400}],
  text:['Pourquoi ça marche ?',{t:'4, c’est deux doublements : 2 × 2. Et 8, c’est trois doublements : 2 × 2 × 2.',a:0},{t:'Donc 4 × 8, c’est cinq doublements à la suite : 2 + 3 = 5 pas, et [[puissance|2⁵]] = 32.',a:1},{t:'Multiplier les valeurs revient à additionner les pas.',a:1,fort:true}]},
{cle:'pick',beat:1,scene:'table',set:{demo:0,why:0,inter:1,pick:[]},ctl:'pick',
  text:['À toi : calcule 16 × 32 sans multiplier.','Clique 16, puis 32, dans la ligne du bas.','La table additionne leurs pas, puis redescend lire le résultat.']},
{cle:'nom',beat:1,scene:'table',set:{inter:0,pick:[]},seq:[{p:{log:1},d:1000}],
  text:['La ligne du haut a un nom.',{t:'Napier l’appelle [[logarithme]], du grec <i>logos</i>, le rapport, et <i>arithmos</i>, le nombre.',a:0},{t:'Le logarithme compte combien de fois on a multiplié : 512 est au pas 9, car neuf doublements mènent de 1 à 512.',a:0}]},
{cle:'v-table',beat:1,scene:'table',set:{log:0,da:3,db:6,demo:0},
  text:['Dans la table, 8 est au pas 3 et 64 au pas 6.','Où lit-on 8 × 64 ?'],
  verifie:{...VF([['Au pas 9',true,'Oui : 3 + 6 = 9, et au pas 9 on lit 512. Vérifie : 8 × 64 = 512.'],['Au pas 18',false,'Ce serait 3 × 6 : on ne multiplie pas les pas, on les additionne. 3 + 6 = 9, et au pas 9 on lit 512.'],['Au pas 72',false,'72 = 8 + 64 : ce sont les valeurs qu’on aurait additionnées. Ce sont les pas qui s’additionnent : 3 + 6 = 9.']]),reveal:[{p:{demo:4},d:900}]}},

/* ===== 2. les trous ===== */
{cle:'trou',beat:2,scene:'table',set:{demo:0,gap:0},seq:[{p:{gap:1},d:1100}],
  text:['Un astronome a besoin de 16 × 3.','Problème : où est 3 dans la table ?'],
  pari:BET([['Entre 2 et 4','Justement : entre 2 et 4, il n’y a aucune case. Ni 3, ni 5, ni 6, ni 7. La table est trouée.'],['À un pas et demi, environ','Bien vu : il faudrait des demi-pas, des dixièmes de pas… La table, elle, saute de 2 à 4.'],['Nulle part','Exact. Et c’est le cas de presque tous les nombres. Le génie de Napier va être de boucher ces trous.']])},
{cle:'pas',beat:2,scene:'fine',seq:[{p:{pts:1},d:4500,w:300}],
  text:['L’idée de Napier : des pas minuscules.','Au lieu de doubler à chaque pas, on multiplie par 1,01 : on grandit de 1 %.',{t:'Chaque point est un pas de plus. La table a maintenant des centaines de cases.',a:0},{t:'(Napier, lui, prenait 0,9999999 : il voulait une précision folle.)',a:0}]},
{cle:'marques',beat:2,scene:'fine',seq:[{p:{m110:1},d:900},{p:{m196:1},d:900,w:700}],
  text:['Plus de trous : les valeurs se suivent de près.',{t:'Au bout de 110 pas, on tombe sur 2,99 — presque 3.',a:0},{t:'Au bout de 196 pas, sur 7,03 — presque 7.',a:1}]},
{cle:'p21',beat:2,scene:'fine',
  text:['Alors 3 × 7 = 21 se trouve à combien de pas ?'],
  pari:{label:'Ton pari',reveal:[{p:{sumA:1},d:700},{p:{sumB:1},d:1500},{p:{m306:1},d:900}],opts:[
    {t:'110 + 196 = 306 pas',ok:true,fb:'Oui. Regarde les deux longueurs de pas mises bout à bout : 110, puis 196, arrivent au pas 306. Et au pas 306, on lit 21,0.'},
    {t:'110 × 196 = 21 560 pas',fb:'Ce sont les valeurs qu’on multiplie. Les pas, eux, se mettent bout à bout : 110 + 196 = 306. Regarde le point 306 : 21,0.'},
    {t:'21 pas',fb:'21 est la valeur, lue sur l’axe vertical. Le nombre de pas vit sur l’axe horizontal : 110 + 196 = 306.'}]}},
{cle:'p21-pourquoi',beat:2,scene:'fine',
  text:['Pourquoi les pas s’additionnent-ils ? Écris-le, une ligne à la fois.'],
  deriv:[
    {tex:'3 \\approx 1{,}01^{110}',alt:'3 ≈ 1,01^110',r:'110 pas de 1 % mènent à 3.'},
    {tex:'7 \\approx 1{,}01^{196}',alt:'7 ≈ 1,01^196',r:'196 pas mènent à 7.'},
    {tex:'3 \\times 7 \\approx 1{,}01^{110} \\times 1{,}01^{196}',alt:'3 × 7 ≈ 1,01^110 × 1,01^196',r:'On remplace chaque nombre par ses pas.'},
    {tex:'3 \\times 7 \\approx 1{,}01^{110+196} = 1{,}01^{306}',alt:'3 × 7 ≈ 1,01^(110 + 196) = 1,01^306',r:'110 multiplications par 1,01, puis 196 autres : 306 en tout. C’est la règle des [[puissance|puissances]] : on additionne les exposants.'},
    {tex:'1{,}01^{306} \\approx 21',alt:'1,01^306 ≈ 21',r:'C’est le même principe que 4 × 8 = 2⁵ dans la table.'}]},
{cle:'courbe',beat:2,scene:'fine',seq:[{p:{swap:1},d:3200,w:300}],
  text:['Lis maintenant la table à l’envers : tu donnes une valeur, elle te rend un nombre de pas.',{t:'Échange les deux axes…',a:0},{t:'La courbe que tu vois naître, c’est celle du logarithme.',a:0,fort:true}]},
{cle:'v-trous',beat:2,scene:'fine',set:{swap:0,m110:0,m196:0,m306:0,sumA:0,sumB:0},
  text:['Avec les pas de 1 %, on atteint 2 au bout d’environ 70 pas.','Vers combien de pas se trouve 4 ?'],
  verifie:{...VF([['Vers 140 pas',true,'Oui : 4 = 2 × 2, donc on additionne les pas, 70 + 70 = 140. (1,01¹⁴⁰ ≈ 4,03.)'],['Vers 280 pas',false,'280 pas, c’est quatre fois 70 : ça mènerait à 2 × 2 × 2 × 2 = 16. Or 4 = 2 × 2 : deux fois 70 pas suffisent, 140.'],['Vers 72 pas',false,'72 = 70 + 2 : on a ajouté une valeur à un nombre de pas. 4 = 2 × 2, donc 70 + 70 = 140 pas.']]),reveal:[{p:{m70:1},d:700},{p:{m140:1},d:900}]}},

/* ===== 3. la règle ===== */
{cle:'gunter',beat:3,scene:'rule',tag:'1620 · Londres',seq:[{p:{eqd:1},d:1100,w:500}],
  text:['Londres, 1620. Edmund Gunter grave ces pas sur une règle.',{t:'Les nombres n’y sont plus régulièrement espacés : la distance depuis 1, c’est le logarithme.',a:0},{t:'De 1 à 2, de 2 à 4, de 4 à 8 : même longueur, car chaque fois on double.',a:0}]},
{cle:'oughtred',beat:3,scene:'rule',tag:'Vers 1622 · William Oughtred',set:{eqd:0},seq:[{p:{la:L2},d:1700,w:300},{p:{cur:1},d:500},{p:{lb:L3},d:1700},{p:{read:1},d:600}],
  text:['Vers 1622, William Oughtred fait glisser deux règles l’une contre l’autre.',{t:'Pour 2 × 3 : on pose le 1 du haut sur le 2 du bas…',a:0},{t:'… puis on lit en bas, en face du 3 du haut : 6.',a:3},{t:'Les longueurs s’ajoutent ; les nombres se multiplient.',a:3,fort:true}]},
{cle:'regle',beat:3,scene:'rule',tag:'1622 → 1972',set:{drag:1},ctl:'rule',
  text:['À toi : fais glisser la règle du haut et le curseur, ici ou sur la scène.','Pendant 350 ans, ingénieurs et architectes ont calculé ainsi — les astronautes d’Apollo en emportaient encore une à bord.']},
{cle:'v-regle',beat:3,scene:'rule',set:{drag:0,la:0,lb:0,cur:0,read:0},
  text:['Pour calculer 3 × 3 avec la règle, que fais-tu ?'],
  verifie:{...VF([['Je pose le 1 du haut sur le 3 du bas, et je lis en face du 3 du haut',true,'Oui : tu ajoutes la longueur de 3 à la longueur de 3. En face, on lit 9.'],['Je pose le 3 du haut sur le 3 du bas',false,'Les longueurs se comptent depuis 1 : c’est le 1 du haut qu’on pose sur le 3 du bas. On lit ensuite en face du 3 du haut : 9.'],['Je pose le 0 du haut sur le 3 du bas',false,'La règle ne commence pas à 0 mais à 1 : le 1 est au pas zéro. On pose le 1 du haut sur le 3, et on lit 9 en face du 3.']]),reveal:[{p:{la:L3},d:1200},{p:{cur:1},d:400},{p:{lb:L3},d:1200},{p:{read:1},d:500}]}},

/* ===== 4. l'aire ===== */
{cle:'hyper',beat:4,scene:'hyper',seq:[{p:{curve:1},d:2600,w:300},{p:{pts2:1},d:900,w:400}],
  text:['Napier a construit ses tables à la main, pas à pas. Cinquante ans plus tard, on se demande : une grandeur pourrait-elle changer les × en + toute seule, sans table ?',{t:'La réponse vient d’un endroit inattendu : l’[[aire]] sous une courbe, l’[[hyperbole]] <i>y</i> = 1/<i>x</i>.',a:0},{t:'Regarde-la : quand <i>x</i> double, sa hauteur est divisée par 2.',a:1,fort:true}]},
{cle:'a12',beat:4,scene:'hyper',set:{pts2:0},seq:[{p:{A1:1},d:1100}],
  text:['Colorie l’aire sous la courbe entre 1 et 2.','Garde-la en tête.']},
{cle:'a24',beat:4,scene:'hyper',seq:[{p:{A2:1},d:1100}],
  text:['Voici l’aire entre 2 et 4 : deux fois plus large, mais deux fois plus basse.','Laquelle est la plus grande ?'],
  pari:BET([['Celle de 2 à 4','Pari noté. Vérifions — sans calculer une seule aire.'],['Elles sont égales','Pari noté. Vérifions — sans calculer une seule aire.'],['Celle de 1 à 2','Pari noté. Vérifions — sans calculer une seule aire.']])},
{cle:'etire',beat:4,scene:'hyper',set:{A2:0,tgt:1,A1:.35,m:1,pt:1,sx:1,sy:1},seq:[{p:{sx:2},d:2800,w:600}],
  text:['Prends une copie de la tranche de 1 à 2, et étire-la deux fois en largeur.',{t:'Elle couvre maintenant 2 à 4… mais elle déborde : elle est deux fois trop haute. Son aire a doublé.',a:0},{t:'Suis le point rouge du bord : parti de <i>x</i> = 1,5, il arrive en <i>x</i> = 3, toujours à la hauteur 0,67. La courbe, en 3, n’est qu’à 0,33.',a:0}]},
{cle:'ecrase',beat:4,scene:'hyper',seq:[{p:{sy:.5},d:2800,w:400}],
  text:['Écrase-la maintenant de moitié en hauteur.',{t:'Le point rouge descend de 0,67 à 0,33 : exactement la hauteur de la courbe en 3.',a:0},{t:'Ce n’est pas un hasard : un point parti de <i>u</i>, à la hauteur 1/<i>u</i>, arrive en 2<i>u</i> à la hauteur 1/<i>u</i> ÷ 2 = 1/(2<i>u</i>) — la hauteur de la courbe en 2<i>u</i>. La copie épouse la courbe partout, sans le moindre écart.',a:0},{t:'Aire × 2, puis ÷ 2 : elle n’a pas changé.',a:0,fort:true}]},
{cle:'egales',beat:4,scene:'hyper',set:{m:0,tgt:0,pt:0,A1:1,A2:1,lab:1},seq:[{p:{A3:1},d:1200,w:600}],
  text:()=>[`Les deux aires sont égales${ctx.rep('a24')===1?' : ton pari était le bon.':' : contre-intuitif, non ?'}`,{t:'Et de 4 à 8 : encore la même, pour la même raison.',a:0},{t:'Doubler en bas, ajouter la même aire : c’est la table de Napier.',a:0,fort:true}]},
{cle:'gen3',beat:4,scene:'hyper',set:{A1:0,A2:0,A3:0,lab:0,gen:0,a:3,b:2},seq:[{p:{gen:1},d:1200,w:300}],
  text:['Ce n’est pas propre au 2. Prends 3.',{t:'Étire par 3 et écrase par 3 : la tranche de 1 à 2 devient la tranche de 3 à 6.',a:0},{t:'Même raisonnement, même conclusion : les deux aires sont égales.',a:0}]},
{cle:'gen',beat:4,scene:'hyper',set:{gen:1,a:2.4,b:1.8},ctl:'gen',
  text:['Et pour n’importe quels nombres <i>a</i> et <i>b</i> ?','Étire par <i>a</i> et écrase par <i>a</i> : la tranche de 1 à <i>b</i> devient la tranche de <i>a</i> à <i>ab</i>, avec la même aire.','Bouge <i>a</i> et <i>b</i> : les deux aires restent égales.']},
{cle:'coupe',beat:4,scene:'hyper',set:{eqs:'A(_ab_) = A(_a_) + A(_b_)',dec:0,eq:0},
  text:['Note A(<i>x</i>) l’aire sous la courbe, de 1 à <i>x</i>.','Coupe l’aire de 1 à <i>ab</i> en deux morceaux, en <i>a</i>, et écris-le une ligne à la fois.'],
  deriv:[
    {tex:'A(ab) = A(a) + \\big(\\text{aire de } a \\text{ à } ab\\big)',alt:'A(ab) = A(a) + (aire de a à ab)',r:'Un morceau de 1 à <i>a</i>, un morceau de <i>a</i> à <i>ab</i>.',p:{dec:1}},
    {tex:'\\text{aire de } a \\text{ à } ab = A(b)',alt:'aire de a à ab = A(b)',r:'C’est ce que tu viens de voir : la tranche de 1 à <i>b</i>, étirée et écrasée par <i>a</i>.'},
    {tex:'A(ab) = A(a) + A(b)',alt:'A(ab) = A(a) + A(b)',r:'L’aire change les produits en sommes, exactement comme la table de Napier.',p:{eq:1}}]},
{cle:'anvers',beat:4,scene:'hyper',tag:'1647 · Anvers',
  text:['Anvers, 1647. Le jésuite Grégoire de Saint-Vincent publie cette propriété des aires sous l’hyperbole.','Deux ans plus tard, son élève Alphonse Antonio de Sarasa comprend ce qu’elle veut dire : cette aire <b>est</b> un logarithme.',{t:'Le rêve de Napier était caché dans une courbe.',fort:true}]},
{cle:'v-aire',beat:4,scene:'hyper',set:{gen:0,dec:0,eq:0,A1:0,A2:0,lab:0},
  text:['L’aire de 1 à 2 vaut environ 0,69.','Combien vaut l’aire de 1 à 4 ?'],
  verifie:{...VF([['Environ 1,39',true,'Oui : 4 = 2 × 2, donc A(4) = A(2) + A(2) ≈ 0,69 + 0,69 ≈ 1,39.'],['Environ 2,77',false,'Ce serait 4 × 0,69. Or 4 = 2 × 2, et l’aire change ce produit en somme : 0,69 + 0,69 ≈ 1,39.'],['Environ 0,48',false,'0,48 ≈ 0,69 × 0,69 : l’aire ne change pas les produits en produits. 4 = 2 × 2, donc 0,69 + 0,69 ≈ 1,39.']]),reveal:[{p:{A1:1,lab:1},d:800},{p:{A2:1},d:900}]}},

/* ===== 5. la dérivée et la définition du bac ===== */
{cle:'cours',beat:5,scene:'hyper',set:{A1:0,A2:0,lab:0},
  text:['Ton cours ne définit pas ln par une aire, mais par une [[derivee|dérivée]] : ln est « la [[primitive]] de 1/<i>x</i> qui s’annule en 1 ».','Pour faire le lien, il faut regarder à quelle vitesse l’aire grandit quand <i>x</i> avance.',{t:'Un rappel d’abord : qu’est-ce qu’une dérivée ?',fort:true}]},
{cle:'taux',beat:5,scene:'taux',seq:[{p:{on:1},d:1500,w:200},{p:{sec:1},d:700,w:500},{p:{h:.22},d:4400,w:900},{p:{tan:1},d:700,w:200}],
  text:['Prends une fonction <i>f</i>, et deux points de sa courbe : en <i>x</i>, puis un petit pas <i>h</i> plus loin.',{t:'Le [[taux|taux d’accroissement]], c’est la variation de <i>f</i> divisée par <i>h</i> : la pente de la droite qui joint les deux points.',a:1},{t:'Rapproche les deux points : <i>h</i> devient minuscule…',a:2},{t:'… et la droite devient la tangente. Sa pente, c’est la dérivée <i>f</i> ′(<i>x</i>).',a:3,fort:true}]},
{cle:'bande',beat:5,scene:'hyper',set:{strip:1,xs:2.5,h:1.4,eq:0,eqs:''},seq:[{p:{h:.08},d:4800,w:900}],
  text:['Fais la même chose avec l’aire : avance <i>x</i> d’un petit pas <i>h</i>.',{t:'L’aire gagne une bande fine, presque un rectangle : hauteur 1/<i>x</i>, largeur <i>h</i>.',a:0},{t:'Plus <i>h</i> est petit, plus le « presque » disparaît.',a:0}]},
{cle:'derivee',beat:5,scene:'hyper',set:{eqs:'A′(_x_) = 1/_x_',eq:0},
  text:['Écris-le, une ligne à la fois.'],
  deriv:[
    {tex:'A(x+h) - A(x) \\approx h \\times \\dfrac{1}{x}',alt:'A(x + h) − A(x) ≈ h × 1/x',r:'L’aire gagnée, c’est la bande : largeur <i>h</i>, hauteur 1/<i>x</i>.'},
    {tex:'\\dfrac{A(x+h) - A(x)}{h} \\approx \\dfrac{1}{x}',alt:'(A(x + h) − A(x)) / h ≈ 1/x',r:'On divise par <i>h</i> : à gauche, c’est le taux d’accroissement de A.'},
    {tex:"A'(x) = \\dfrac{1}{x}",alt:'A′(x) = 1/x',r:'Quand <i>h</i> tend vers 0, le taux devient la dérivée. La dérivée de l’aire, c’est la hauteur de la courbe.',p:{eq:1}},
    {tex:'A(1) = 0',alt:'A(1) = 0',r:'De 1 à 1, il n’y a aucune surface : l’aire est nulle.'}]},
{cle:'definition',beat:5,scene:'hyper',set:{strip:0,eq:1,eqs:'ln _x_ = aire de 1 à _x_'},seq:[{p:{lnc:1},d:2600,w:300},{p:{z1:1},d:700,w:300}],
  text:['Voilà la définition de ton cours, et tu sais maintenant d’où elle sort :',{t:'la fonction logarithme [[neperien|népérien]], notée ln, est la primitive de <i>x</i> ↦ 1/<i>x</i> sur ]0 ; +∞[ qui s’annule en 1.',fort:true},{t:'En rouge, la courbe de ln : en chaque <i>x</i>, sa hauteur vaut l’aire sous la courbe noire, de 1 à <i>x</i>.',a:0},{t:'En 1, aucune aire : ln 1 = 0, la courbe rouge coupe l’axe en 1.',a:1}],
  tex:[["\\ln'(x) = \\dfrac{1}{x} \\qquad \\ln 1 = 0",'ln′(x) = 1/x    ln 1 = 0']]},
{cle:'pente',beat:5,scene:'hyper',set:{z1:0,tan:1,xt:.7},seq:[{p:{xt:5.6},d:5600,w:500}],
  text:['Lis la dérivée sur les deux courbes à la fois.',{t:'Pour chaque <i>x</i>, la hauteur de la courbe noire, 1/<i>x</i>, est la pente de la courbe rouge.',a:0},{t:'Près de 0, la noire est très haute : la rouge monte très vite. Plus loin, la noire s’aplatit : la rouge monte de plus en plus doucement, sans jamais s’arrêter.',a:0}]},
{cle:'e-pari',beat:5,scene:'hyper',set:{tan:0,ev:1,xe:1},
  text:['Il existe un nombre où l’aire vaut exactement 1.','Avant de le chercher : à ton avis, il est où ?'],
  pari:BET([['Vers 2','Pari noté. Va le chercher.'],['Entre 2 et 3','Pari noté. Va le chercher.'],['Vers 10','Pari noté. Va le chercher.']])},
{cle:'e',beat:5,scene:'hyper',ctl:'e',seq:[{p:{xe:2},d:1300,w:200}],
  text:['Fais glisser <i>x</i> jusqu’à ce que l’aire vaille 1.','Va aussi à gauche de 1 : l’aire se compte alors à rebours, en négatif — c’est pour cela que ln <i>x</i> &lt; 0 entre 0 et 1.']},
{cle:'v-def',beat:5,scene:'hyper',set:{ev:0,z1:0},
  text:['Que vaut ln 1, et pourquoi ?'],
  verifie:{...VF([['0 : de 1 à 1, il n’y a aucune aire',true,'Oui. C’est pour cela que la définition dit « qui s’annule en 1 ».'],['1 : ln 1 = 1',false,'C’est ln e qui vaut 1. En 1, l’aire va de 1 à 1 : elle est nulle, donc ln 1 = 0.'],['On ne peut pas le savoir sans calculatrice',false,'Pas besoin : ln 1 est l’aire de 1 à 1, qui est nulle. ln 1 = 0.']]),reveal:[{p:{z1:1},d:800}]}},

/* ===== 6. les règles de ln ===== */
{cle:'r-produit',beat:6,scene:'tableau',set:{n:0,hl:0,exN:0,v12:0},seq:[{p:{n:1},d:700,w:300},{p:{exN:1},d:700,w:900}],
  text:['De la propriété des aires sortent toutes les règles de calcul avec ln. La première, tu la connais déjà :',{t:'ln(<i>ab</i>) = ln <i>a</i> + ln <i>b</i> : le logarithme d’un produit est la somme des logarithmes.',a:0,fort:true},{t:'Exemple : 6 = 2 × 3, donc ln 6 = ln 2 + ln 3.',a:1}]},
{cle:'r-inverse',beat:6,scene:'tableau',set:{hl:1},seq:[{p:{n:2},d:700}],
  text:['Deuxième règle : l’inverse. Que vaut ln(1/<i>a</i>) ?'],
  deriv:[
    {tex:'\\ln\\frac{1}{a} + \\ln a = \\ln\\Big(\\frac{1}{a} \\times a\\Big)',alt:'ln(1/a) + ln a = ln(1/a × a)',r:'C’est la règle du produit, avec les deux nombres 1/<i>a</i> et <i>a</i>.'},
    {tex:'\\ln\\frac{1}{a} + \\ln a = \\ln 1 = 0',alt:'ln(1/a) + ln a = ln 1 = 0',r:'1/<i>a</i> × <i>a</i> = 1, et ln 1 = 0.'},
    {tex:'\\ln\\frac{1}{a} = -\\ln a',alt:'ln(1/a) = −ln a',r:'On passe ln <i>a</i> de l’autre côté. Exemple : ln(1/8) = −ln 8.',p:{exN:2}}]},
{cle:'r-quotient',beat:6,scene:'tableau',set:{hl:2},seq:[{p:{n:3},d:700}],
  text:['Troisième règle : le quotient <i>a</i>/<i>b</i>.'],
  deriv:[
    {tex:'\\ln\\frac{a}{b} = \\ln\\Big(a \\times \\frac{1}{b}\\Big)',alt:'ln(a/b) = ln(a × 1/b)',r:'Diviser par <i>b</i>, c’est multiplier par 1/<i>b</i>.'},
    {tex:'\\ln\\frac{a}{b} = \\ln a + \\ln\\frac{1}{b}',alt:'ln(a/b) = ln a + ln(1/b)',r:'Règle du produit.'},
    {tex:'\\ln\\frac{a}{b} = \\ln a - \\ln b',alt:'ln(a/b) = ln a − ln b',r:'Règle de l’inverse. Exemple : ln(3/4) = ln 3 − ln 4.',p:{exN:3}}]},
{cle:'r-puissance',beat:6,scene:'tableau',set:{hl:3},seq:[{p:{n:4},d:700}],
  text:['Dernière règle : la puissance <i>a</i>ⁿ, c’est-à-dire <i>a</i> multiplié <i>n</i> fois par lui-même.'],
  deriv:[
    {tex:'\\ln(a^n) = \\ln(\\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ fois}})',alt:'ln(aⁿ) = ln(a × a × … × a), n fois',r:'Une [[puissance]], c’est un produit répété.'},
    {tex:'\\ln(a^n) = \\underbrace{\\ln a + \\ln a + \\cdots + \\ln a}_{n \\text{ fois}}',alt:'ln(aⁿ) = ln a + ln a + … + ln a, n fois',r:'Règle du produit, appliquée de proche en proche.'},
    {tex:'\\ln(a^n) = n \\ln a',alt:'ln(aⁿ) = n ln a',r:'Exemple : ln 8 = ln(2³) = 3 ln 2.',p:{exN:4}}]},
{cle:'v-regles',beat:6,scene:'tableau',set:{hl:-1,n:4,exN:4},
  text:['Avec ces quatre règles : à quoi est égal ln 12 ?'],
  verifie:{...VF([['2 ln 2 + ln 3',true,'Oui : 12 = 2² × 3, donc ln 12 = ln(2²) + ln 3 = 2 ln 2 + ln 3.'],['ln 2 × ln 6',false,'ln ne change jamais un produit en produit. 12 = 2² × 3 : ln 12 = 2 ln 2 + ln 3.'],['ln 10 + ln 2',false,'10 + 2 = 12 est une somme : aucune règle ne découpe le ln d’une somme. 12 = 2² × 3, donc ln 12 = 2 ln 2 + ln 3.']]),reveal:[{p:{v12:1},d:900}]}},

/* ===== 7. à toi ===== */
{cle:'q1',beat:7,scene:'quiz',set:{qi:0,rv:0},
  text:['Trois questions, comme au bac : chacune vise une erreur classique des copies.','Première : ln 18 = ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'ln 2 + 2 ln 3',ok:true,fb:'Oui : 18 = 2 × 3², donc ln 18 = ln 2 + ln(3²) = ln 2 + 2 ln 3.'},
    {t:'ln 2 × ln 9',fb:'C’est l’erreur la plus fréquente : ln change le × en +. 18 = 2 × 9, donc ln 18 = ln 2 + ln 9 = ln 2 + 2 ln 3.'},
    {t:'2 ln 9',fb:'2 ln 9 = ln 81, pas ln 18. 18 = 2 × 9 : ln 18 = ln 2 + ln 9 = ln 2 + 2 ln 3.'}]}},
{cle:'q2',beat:7,scene:'quiz',set:{qi:1,rv:0},
  text:['Deuxième : une somme à l’intérieur. ln(2 + 3) = ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'ln 2 + ln 3',fb:'ln 2 + ln 3 = ln(2 × 3) = ln 6, pas ln 5. La règle marche pour les produits, pas pour les sommes.'},
    {t:'ln 2 × ln 3',fb:'Aucune règle ne transforme une somme en produit. ln(2 + 3), c’est simplement ln 5.'},
    {t:'ln 5 — aucune formule ne la découpe',ok:true,fb:'Exact : ln(<i>a</i> + <i>b</i>) ne se simplifie pas. C’est un piège classique des copies.'}]}},
{cle:'q3',beat:7,scene:'quiz',set:{qi:2,rv:0},
  text:['Dernière : une puissance de e. ln(e³) = ?'],
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'3',ok:true,fb:'Oui : ln(e³) = 3 ln e, et ln e = 1.'},
    {t:'e³',fb:'ln « défait » la puissance : ln(e³) = 3 ln e = 3 × 1 = 3.'},
    {t:'1',fb:'C’est ln e qui vaut 1. ln(e³) = 3 ln e = 3.'}]}},
{cle:'fin',beat:7,scene:'end',seq:[{p:{n:4},d:2800,w:300}],
  text:['Fin de la séance. Voici ce que l’application retiendrait de toi.'],html:()=>profileHTML()}
];

/* ---------- les mots ---------- */
const mots={
  logarithme:{t:'logarithme',d:'Du grec <i>logos</i> (le rapport) et <i>arithmos</i> (le nombre). Le logarithme d’un nombre compte combien de fois il faut multiplier par une même base pour l’atteindre : log₂ 8 = 3, car 2 × 2 × 2 = 8.'},
  puissance:{t:'puissance',d:'2⁵ se lit « 2 puissance 5 » : 2 multiplié 5 fois par lui-même, 2 × 2 × 2 × 2 × 2 = 32. Le petit 5 s’appelle l’exposant. Multiplier deux puissances de 2, c’est additionner les exposants : 2² × 2³ = 2⁵.'},
  aire:{t:'aire sous une courbe',d:'La surface comprise entre la courbe, l’axe horizontal et deux verticales. Ici, on la compte en unités du repère : un carré de côté 1 vaut 1.'},
  hyperbole:{t:'hyperbole',d:'La courbe de la fonction <i>x</i> ↦ 1/<i>x</i>. Quand <i>x</i> double, sa hauteur est divisée par 2 ; elle s’approche des axes sans jamais les toucher.'},
  derivee:{t:'dérivée',d:'La dérivée <i>f</i> ′(<i>x</i>) est la pente de la courbe de <i>f</i> au point <i>x</i> : la limite du taux d’accroissement quand le pas <i>h</i> devient très petit. Elle dit à quelle vitesse <i>f</i> change.'},
  primitive:{t:'primitive',d:'Une primitive de <i>f</i> est une fonction <i>F</i> dont la dérivée est <i>f</i> : <i>F</i> ′ = <i>f</i>. Exemple : <i>x</i>² est une primitive de 2<i>x</i>. Une fonction a plusieurs primitives ; « qui s’annule en 1 » en choisit une seule.'},
  taux:{t:'taux d’accroissement',d:'De combien <i>f</i> change quand <i>x</i> avance de <i>h</i>, divisé par <i>h</i> : (<i>f</i>(<i>x</i> + <i>h</i>) − <i>f</i>(<i>x</i>)) ÷ <i>h</i>. C’est la pente de la droite qui joint les deux points de la courbe.'},
  neperien:{t:'népérien',d:'De Neper, l’orthographe française de Napier. Le logarithme népérien est celui dont la base est e ≈ 2,718 : ln e = 1.'}
};

/* ---------- le profil de fin ---------- */
function profileHTML(){
  const Q=[['q1','ln d’un produit'],['q2','ln d’une somme'],['q3','ln d’une puissance de e']];
  const res=Q.map(([k])=>ctx.juste(k));
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]}</li>`).join('');
  const weak=res.map((ok,i)=>ok===false?Q[i][1]:null).filter(Boolean);
  const V=STEPS.filter(s=>s.verifie),vu=V.filter(s=>ctx.juste(s.k)!=null),vok=V.filter(s=>ctx.juste(s.k)===true);
  const bets=[];
  if(ctx.rep('a24')!=null)bets.push(ctx.rep('a24')===1?'tu as vu juste sur les aires':'les aires égales t’ont surpris');
  if(ctx.juste('p21')!=null)bets.push(ctx.juste('p21')?'tu as additionné les pas d’instinct':'additionner les pas n’était pas encore un réflexe');
  if(S.eFound)bets.push('tu as trouvé e toi-même');
  const plan=(weak.length?weak.map(w=>`<li>8 exercices courts sur « ${w} », du plus simple au niveau bac</li>`).join(''):'<li>Aucune erreur : on passe directement au niveau bac</li>')
    +'<li>1 exercice complet au format bac (étude de fonction avec ln), corrigé étape par étape</li><li>Dans 3 jours : 4 questions de rappel sur cette séance</li>';
  return ty(`<ul class="prof">${rows}</ul>${vu.length?`<p class="small">Questions « Vérifie » réussies du premier coup : ${vok.length} sur ${vu.length}.</p>`:''}${bets.length?`<p class="small">Tes paris : ${bets.join(' ; ')}.</p>`:''}<div class="next"><div class="pari-k">Ta prochaine séance, générée pour toi</div><ol>${plan}</ol></div><p class="small">Aperçu de l’idée : la génération d’exercices n’est pas branchée dans ce pilote.</p>`);
}

/* ---------- contrôles par étape ---------- */
S.tries=0;S.eFound=false;
const $=ctx.$;
const CTL={
  pick:{html:()=>'<p class="ctl-note" id="pickfb">Clique deux nombres dans la ligne du bas.</p>',
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
  gen:{html:()=>`<div class="ctl"><label class="sl"><span><i>a</i> = <output id="oa"></output></span><input id="ga" type="range" min="1" max="2.9" step="0.01"></label><label class="sl"><span><i>b</i> = <output id="ob"></output> (entre 1 et <i>a</i>)</span><input id="gb" type="range" min="1" max="2.9" step="0.01"></label></div><p class="ctl-note" id="genfb"></p>`,
    init(){const sc=scenes.hyper,ga=$('#ga'),gb=$('#gb');
      const sync=()=>{ga.value=sc.p.a;gb.value=sc.p.b;$('#oa').textContent=fr(sc.p.a);$('#ob').textContent=fr(sc.p.b);
        $('#genfb').innerHTML=ty(`Aire de 1 à ${fr(sc.p.b)} : <b>${fr(integ(1,sc.p.b),3)}</b><br>Aire de ${fr(sc.p.a)} à ${fr(sc.p.a*sc.p.b)} : <b>${fr(integ(sc.p.a,sc.p.a*sc.p.b),3)}</b>`);};
      ga.addEventListener('input',()=>{ctx.stop();sc.p.a=+ga.value;if(sc.p.b>sc.p.a)sc.p.b=sc.p.a;sc.render();sync();});
      gb.addEventListener('input',()=>{ctx.stop();sc.p.b=Math.min(+gb.value,sc.p.a);sc.render();sync();});
      hooks.frame=sync;sync();}},
  e:{html:()=>`<div class="ctl"><label class="sl"><span><i>x</i> = <output id="ox"></output></span><input id="ex" type="range" min="0.55" max="4" step="0.001"></label></div><p class="ctl-note" id="efb"></p>`,
    init(){const sc=scenes.hyper,ex=$('#ex');
      const sync=()=>{const xe=sc.p.xe,A=integ(1,xe);ex.value=xe;$('#ox').textContent=fr(xe,3);
        let m;if(Math.abs(A-1)<.004){S.eFound=true;m='Tu l’as : <b>e ≈ 2,718</b>, et ln e = 1. Ces chiffres te disent quelque chose ? 2 718 281… c’était le premier nombre de la multiplication du début. Et le second, 3 141 592, c’était π.';}
        else if(xe<1)m=`Aire comptée à rebours : ln ${fr(xe)} ≈ <b>${fr(A,3)}</b>, négatif.`;
        else m=`Aire de 1 à ${fr(xe)} : <b>${fr(A,3)}</b>. ${A<1?'Encore un peu.':'Trop loin.'}`;
        $('#efb').innerHTML=ty(m);};
      ex.addEventListener('input',()=>{ctx.stop();sc.p.xe=+ex.value;sc.render();sync();});
      hooks.frame=sync;sync();}}
};
let dragE=false;
const moveE=e=>{ctx.stop();const sc=scenes.hyper;sc.p.xe=clamp((svgPt(e).x-80)/100,.55,4);sc.render();hooks.frame&&hooks.frame();};
const svg=ctx.svg;
const surDown=e=>{const st=ctx.etape();if(!st||st.ctl!=='e')return;dragE=true;svg.setPointerCapture(e.pointerId);moveE(e);};
const surMove=e=>{if(dragE)moveE(e);};
const surUp=()=>{dragE=false;};
svg.addEventListener('pointerdown',surDown);svg.addEventListener('pointermove',surMove);
svg.addEventListener('pointerup',surUp);svg.addEventListener('pointercancel',surUp);

return {BEATS,STEPS,CTL,mots,
  reset(){S.tries=0;S.eFound=false;},
  plain:s=>s.replace(/1\/x/g,'1 sur x').replace(/1,01/g,'1 virgule 01'),
  demonter(){svg.removeEventListener('pointerdown',surDown);svg.removeEventListener('pointermove',surMove);svg.removeEventListener('pointerup',surUp);svg.removeEventListener('pointercancel',surUp);}};
});
}
