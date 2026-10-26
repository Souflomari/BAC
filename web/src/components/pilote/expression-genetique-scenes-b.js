/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Du gène à la protéine », seconde moitié : la transcription
 * (l'ARN polymérase en action), le tableau du code, la traduction (le
 * ribosome et l'ARNt), l'atelier de mutation.
 */
import {B4,CODE,AA3,NOM,PAIRE,CDS,NORMAL,L_MURE,TR_COD,TR_TPL,TR_ARN,TL_ARN,NB,FIN,C6,toARN,anticodon,analyser,aaDe,CONNUS} from "./expression-genetique-code";

export const W0=3,WN=21;                       // atelier : codons 1 à 7 = indices 3 à 23
const PN=18;

export function verdict(A){
  if(A.kind==='normal')return{t:'Allèle normal',s:'Choisis une lettre de l’ADN, puis change-la.',n:''};
  const n=CONNUS[A.m]||'';
  if(A.kind==='silencieuse')return{t:`Silencieuse · ${toARN(A.cN)} → ${toARN(A.cM)}`,s:`Substitution : le codon ${A.j} change, l’acide aminé non (${AA3[A.aN]}). La protéine est identique.`,n};
  if(A.kind==='faux-sens')return{t:`Faux-sens · ${AA3[A.aN]} ${A.j} → ${AA3[A.aM]}`,s:`Substitution : un seul acide aminé change ; la chaîne garde ${A.len} acides aminés.`,n};
  if(A.kind==='non-sens')return{t:`Non-sens · le codon ${A.j} devient ${toARN(A.cM)}, un stop`,s:`Substitution : la chaîne s’arrête après ${A.j-1} acides aminés au lieu de ${L_MURE}.`,n};
  const op=A.t==='d'?'Délétion':'Insertion';
  return{t:`Décalage du cadre de lecture · ${op.toLowerCase()}`,s:A.len!=null?`${op} d’une lettre : tout change à partir du n° ${A.first} ; un stop arrive au codon ${A.tr.stop} → ${A.len} acides aminés au lieu de ${L_MURE}.`:`${op} d’une lettre : tout change à partir du n° ${A.first}, sans stop avant la fin du gène.`,n};
}

export function scenesB(ctx){
const {E,lerp,clamp,ty,show,scene,hooks}=ctx;
const txt=(parent,x,y,str,cls,anchor)=>E('text',{x,y,class:cls,'text-anchor':anchor||'start',text:ty(str)},parent);

/* ---------- 3. la transcription : la figure-clé ---------- */
const XT=i=>75+i*40+Math.floor(i/3)*10;            // 21 bases, codons espacés
scene('trans',{
  p:{dna:0,dn:0,open:0,tpl:0,ez:0,n:0,fo:0,cmp:0,lv:0,rules:0,dir:0,a1:0,a2:0,a3:0,rd:0},
  build(g){
    this.dg=E('g',{},g);
    this.rungs=[];this.cod=[];this.tpl=[];
    for(let i=0;i<21;i++){
      this.rungs.push(E('line',{x1:XT(i),x2:XT(i),class:'k-line','stroke-width':2},this.dg));
      this.cod.push(E('text',{x:XT(i),class:'mono t-mid s-ink','text-anchor':'middle',text:TR_COD[i]},this.dg));
      this.tpl.push(E('text',{x:XT(i),class:'mono t-mid s-ink','text-anchor':'middle',text:TR_TPL[i]},this.dg));
    }
    this.cL=txt(this.dg,38,0,'5′','t-lab s-dim','middle');this.cR=txt(this.dg,966,0,'3′','t-lab s-dim','middle');
    this.tL=txt(this.dg,38,0,'3′','t-lab s-dim','middle');this.tR=txt(this.dg,966,0,'5′','t-lab s-dim','middle');
    this.cLab=txt(this.dg,75,0,'brin non transcrit','t-lab s-dim');
    this.tLab=txt(this.dg,75,0,'brin transcrit : le modèle','t-lab2 s-a');
    /* le sens de chaque brin */
    this.dirG=E('g',{},g);
    E('line',{x1:90,x2:910,y1:262,y2:262,class:'k-ink','stroke-width':3,'marker-end':'url(#arw)'},this.dirG);
    txt(this.dirG,500,244,'un brin a un sens : de 5′ vers 3′','t-lab2 s-ink','middle');
    E('line',{x1:910,x2:90,y1:414,y2:414,class:'k-a','stroke-width':3,'marker-end':'url(#arw)'},this.dirG);
    txt(this.dirG,500,448,'l’autre brin, en sens inverse : lui aussi de 5′ vers 3′','t-lab2 s-a','middle');
    this.fbox=E('rect',{x:XT(1)-20,width:40,height:38,rx:3,class:'k-a nofill','stroke-width':2.5},g);
    /* l'enzyme */
    this.pol=E('g',{},g);
    this.polR=E('rect',{x:-56,width:112,rx:34,class:'eg-enz'},this.pol);
    this.polT=txt(this.pol,0,0,'ARN polymérase','t-lab2 s-a','middle');
    /* ce que fait l'enzyme, un geste à la fois */
    this.legG=E('g',{},g);
    this.leg=['elle ouvre les deux brins','elle lit le brin transcrit','elle assemble l’ARN'].map((t,j)=>{const lg=E('g',{},this.legG),y=250+j*46;
      E('circle',{cx:232,cy:y-7,r:16,class:'s-a'},lg);E('text',{x:232,y:y-1,class:'t-lab2 s-onsig','text-anchor':'middle',text:String(j+1)},lg);
      txt(lg,262,y,t,'t-lab2 s-ink');return lg;});
    this.mg=E('g',{},g);this.mr=[];this.ml=[];
    for(let i=0;i<21;i++){
      this.ml.push(E('line',{x1:XT(i),x2:XT(i),class:'k-a','stroke-width':1.5},this.mg));
      this.mr.push(E('text',{x:XT(i),class:'mono t-mid '+(TR_ARN[i]==='U'?'s-a':'s-ink'),'text-anchor':'middle',text:TR_ARN[i]},this.mg));
    }
    this.mL=txt(this.mg,38,0,'5′','t-lab s-a','middle');this.mR=txt(this.mg,966,0,'3′','t-lab s-a','middle');
    this.mLab=txt(this.mg,966,0,'ARN messager (ARNm)','t-lab2 s-a','end');
    /* le sens de la lecture et de la construction */
    this.rdG=E('g',{},g);
    this.rd1=E('g',{},this.rdG);
    E('line',{x1:90,x2:910,y1:606,y2:606,class:'k-ink','stroke-width':3,'marker-end':'url(#arw)'},this.rd1);
    txt(this.rd1,500,640,'l’enzyme lit le brin transcrit de 3′ vers 5′','t-lab2 s-ink','middle');
    this.rd2=E('g',{},this.rdG);
    E('line',{x1:90,x2:910,y1:368,y2:368,class:'k-a','stroke-width':3,'marker-end':'url(#arw)'},this.rd2);
    txt(this.rd2,500,350,'elle construit l’ARNm de 5′ vers 3′','t-lab2 s-a','middle');
    this.cmpT=txt(g,500,346,'Mêmes lettres que le brin non transcrit, U à la place de T','t-lab2 s-ink','middle');
    /* la table de la transcription : elle se construit colonne par colonne */
    this.card=E('g',{},g);
    this.cardHead=E('g',{},this.card);
    txt(this.cardHead,500,150,'La transcription, en une table','t-lab2 s-dim','middle');
    txt(this.cardHead,330,286,'brin transcrit (ADN)','t-lab2 s-ink','end');
    txt(this.cardHead,330,416,'ARNm','t-lab2 s-ink','end');
    this.cols='ATGC'.split('').map((b,k)=>{const x=440+k*110,a=toARN(PAIRE[b]),cg=E('g',{},this.card);
      E('text',{x,y:292,class:'mono t-huge s-ink','text-anchor':'middle',text:b},cg);
      E('line',{x1:x,x2:x,y1:310,y2:364,class:'k-dim','stroke-width':2,'marker-end':'url(#arw)'},cg);
      E('text',{x,y:422,class:'mono t-huge '+(a==='U'?'s-a':'s-ink'),'text-anchor':'middle',text:a},cg);return cg;});
    this.cardFoot=E('g',{},this.card);
    txt(this.cardFoot,500,512,'L’ARNm a la séquence du brin non transcrit, avec U à la place de T.','t-lab2 s-ink','middle');
    txt(this.cardFoot,500,548,'Lu de 3′ vers 5′ sur le brin transcrit · construit de 5′ vers 3′','t-lab s-dim','middle');
  },
  render(){
    const p=this.p,o=p.open,yC=lerp(300,170,o),yT=lerp(358,528,o),yM=lerp(462,238,p.cmp),fade=1-clamp(p.rules*6,0,1);
    show(this.dg,p.dna*fade);
    for(let i=0;i<21;i++){const a=clamp(p.dn-i,0,1);
      this.cod[i].setAttribute('y',yC);this.tpl[i].setAttribute('y',yT);
      this.rungs[i].setAttribute('y1',yC+8);this.rungs[i].setAttribute('y2',yT-28);this.rungs[i].style.opacity=(1-o)*a;
      this.cod[i].style.opacity=a*(1-.6*p.tpl*(1-p.cmp));this.tpl[i].style.opacity=a*(1-.6*p.cmp);
      this.cod[i].setAttribute('class','mono t-mid '+(p.cmp>.5&&TR_COD[i]==='T'?'s-a':'s-ink'));
    }
    const ends=clamp(p.dn,0,1),hot=p.dir>.5?'t-lab2 s-a':'t-lab s-dim';
    [this.cL,this.cR].forEach(t=>{t.setAttribute('y',yC);t.style.opacity=ends;t.setAttribute('class',hot);});
    [this.tL,this.tR].forEach(t=>{t.setAttribute('y',yT);t.style.opacity=ends;t.setAttribute('class',hot);});
    this.cLab.setAttribute('y',yC-36);show(this.cLab,o*p.tpl);this.tLab.setAttribute('y',yT+40);show(this.tLab,p.tpl*o);
    show(this.dirG,p.dir*(1-o)*fade);
    this.fbox.setAttribute('y',yT-29);show(this.fbox,p.fo*p.dna*fade);
    const fx=clamp(p.n-.5,0,20),f0=Math.floor(fx),front=lerp(XT(f0),XT(Math.min(f0+1,20)),fx-f0);
    // l'enzyme couvre d'abord les deux brins (elle les ouvre), puis le seul brin transcrit et l'ARNm (elle lit et assemble)
    const top=lerp(yC-34,yM-40,p.ez);
    this.polR.setAttribute('y',top);this.polR.setAttribute('height',Math.max(0,yT+26-top));
    this.polT.setAttribute('y',top-14);this.polT.setAttribute('x',(clamp(front,112,890)-front).toFixed(1));
    this.pol.setAttribute('transform',`translate(${front.toFixed(1)} 0)`);
    show(this.pol,clamp(p.open*2-1,0,1)*(1-p.cmp)*(1-p.lv)*fade*(p.n<20.5?1:clamp((21-p.n)*2,0,1)));
    show(this.legG,fade*(1-p.cmp));this.leg.forEach((lg,j)=>{const a=clamp(p['a'+(j+1)],0,1);lg.style.opacity=a;lg.setAttribute('transform',`translate(${((1-a)*-14).toFixed(1)} 0)`);});
    show(this.rdG,(1-p.cmp)*fade*(1-p.lv));show(this.rd1,clamp(p.rd,0,1));show(this.rd2,clamp(p.rd-1,0,1));
    for(let i=0;i<21;i++){const a=clamp(p.n-i,0,1);
      this.mr[i].setAttribute('y',yM);this.mr[i].style.opacity=a;
      this.ml[i].setAttribute('y1',yM+8);this.ml[i].setAttribute('y2',yT-28);this.ml[i].style.opacity=a*(1-p.cmp);}
    [this.mL,this.mR].forEach(t=>{t.setAttribute('y',yM);t.style.opacity=clamp(p.n-20,0,1);});
    this.mLab.setAttribute('y',yM-36+76*p.cmp);show(this.mLab,clamp(p.n-20,0,1));
    this.mg.setAttribute('transform',`translate(${(p.lv*900).toFixed(1)} 0)`);show(this.mg,(1-p.lv)*fade);
    show(this.cmpT,p.cmp*(1-p.lv)*fade);
    show(this.card,clamp(p.rules*6,0,1));show(this.cardHead,clamp(p.rules*6,0,1));
    this.cols.forEach((cg,k)=>show(cg,clamp((p.rules-.2-.17*k)/.15,0,1)));show(this.cardFoot,clamp((p.rules-.88)/.12,0,1));
  }
});

/* ---------- 4. le code : triplets, poly-U, la table ---------- */
scene('code',{
  p:{need:0,tri:0,fill:0,pu:0,pf:0,tab:0,sel:'···',hi:''},
  build(g){
    this.needT=txt(g,500,92,'20 acides aminés différents à désigner','t-lab2 s-a','middle');
    this.panels=[1,2,3].map((n,k)=>{
      const pg=E('g',{},g),cx=180+k*320,N=4**n,side=Math.sqrt(N),cs=[44,40,26][k],gap=[6,5,4][k],w=side*cs+(side-1)*gap,x0=cx-w/2,y0=170;
      txt(pg,cx,146,n===1?'1 lettre':`${n} lettres`,'t-lab2 s-ink','middle');
      const cells=[];for(let i=0;i<N;i++){const r=Math.floor(i/side),c=i%side;cells.push(E('rect',{x:x0+c*(cs+gap),y:y0+r*(cs+gap),width:cs,height:cs,rx:2,class:'cell'},pg));}
      txt(pg,cx,460,n===1?'4 mots':n===2?'4 × 4 = 16 mots':'4 × 4 × 4 = 64 mots','t-lab2 s-ink','middle');
      txt(pg,cx,496,N<20?'trop peu':'assez — et même trop','t-lab '+(N<20?'s-dim':'s-a'),'middle');
      return{pg,cells,N};});
    this.redT=txt(g,500,580,'64 codons pour 20 acides aminés : plusieurs codons désignent le même.','t-lab s-ink','middle');
    // poly-U
    this.puG=E('g',{},g);
    txt(this.puG,500,170,'Un ARN artificiel, d’une seule lettre','t-lab s-dim','middle');
    txt(this.puG,128,262,'5′','t-lab s-dim','middle');
    for(let i=0;i<18;i++)E('text',{x:170+i*40,y:262,class:'mono t-mid s-ink','text-anchor':'middle',text:'U'},this.puG);
    txt(this.puG,892,262,'… 3′','t-lab s-dim','middle');
    txt(this.puG,500,330,'+ un extrait de bactéries : ribosomes, ARNt, acides aminés','t-lab s-dim','middle');
    this.pfG=E('g',{},g);this.pfB=[];
    for(let j=0;j<6;j++){const x=210+j*120;
      E('path',{d:`M${x-50} 276v8H${x+50}v-8`,class:'k-dim nofill','stroke-width':1.5},this.pfG);
      const bg=E('g',{},this.pfG);
      if(j)E('line',{x1:x-120+34,x2:x-34,y1:440,y2:440,class:'k-ink','stroke-width':2},bg);
      E('circle',{cx:x,cy:440,r:34,class:'cell'},bg);
      E('text',{x,y:447,class:'t-lab2 s-ink','text-anchor':'middle',text:AA3[CODE.UUU]},bg);this.pfB.push(bg);}
    txt(this.pfG,920,447,'…','t-lab2 s-ink','middle');
    txt(this.pfG,500,540,`UUU → ${AA3[CODE.UUU]} (${NOM[CODE.UUU]}) : le premier mot du code`,'t-lab2 s-a','middle');
    // la table du code génétique
    const x0=130,cw=200,y0=128,lh=31;Object.assign(this,{x0,cw,y0,lh});
    const cp=E('clipPath',{id:'eg-tabclip'},g);this.tabClip=E('rect',{x:0,y:0,width:1000,height:0},cp);
    this.tab=E('g',{'clip-path':'url(#eg-tabclip)'},g);
    this.rowB=E('rect',{x:x0,width:4*cw,height:4*lh,class:'reg f-b'},this.tab);
    this.colB=E('rect',{y:y0,width:cw,height:16*lh,class:'reg f-b'},this.tab);
    this.selB=E('rect',{width:cw,height:lh,class:'reg f-a'},this.tab);
    this.selK=E('rect',{width:cw,height:lh,class:'k-a nofill','stroke-width':2.5},this.tab);
    this.hl={};
    for(let r=0;r<4;r++)for(let c=0;c<4;c++)for(let l=0;l<4;l++){const cod=B4[r]+B4[c]+B4[l];
      this.hl[cod]=E('rect',{x:x0+c*cw+2,y:y0+(r*4+l)*lh+1,width:cw-4,height:lh-2,rx:2,class:'reg f-a'},this.tab);}
    txt(this.tab,x0+2*cw,74,'2ᵉ lettre','t-lab s-dim','middle');
    txt(this.tab,966,108,'3ᵉ','t-lab s-dim','middle');
    E('text',{x:58,y:y0+8*lh,class:'t-lab s-dim','text-anchor':'middle',transform:`rotate(-90 58 ${y0+8*lh})`,text:'1ʳᵉ lettre'},this.tab);
    for(let c=0;c<4;c++)E('text',{x:x0+c*cw+cw/2,y:108,class:'mono t-lab2 s-ink','text-anchor':'middle',text:B4[c]},this.tab);
    for(let r=0;r<4;r++){E('text',{x:100,y:y0+r*4*lh+2*lh+10,class:'mono t-big2 s-ink','text-anchor':'middle',text:B4[r]},this.tab);
      for(let l=0;l<4;l++)E('text',{x:966,y:y0+(r*4+l)*lh+21,class:'mono t-tiny s-dim','text-anchor':'middle',text:B4[l]},this.tab);}
    for(let r=0;r<=4;r++)E('line',{x1:x0,x2:x0+4*cw,y1:y0+r*4*lh,y2:y0+r*4*lh,class:r%4?'k-dim':'k-ink','stroke-width':r%4?1:1.5},this.tab);
    for(let c=0;c<=4;c++)E('line',{x1:x0+c*cw,x2:x0+c*cw,y1:y0,y2:y0+16*lh,class:c%4?'k-dim':'k-ink','stroke-width':c%4?1:1.5},this.tab);
    for(let r=0;r<4;r++)for(let c=0;c<4;c++)for(let l=0;l<4;l++){
      const cod=B4[r]+B4[c]+B4[l],a=CODE[cod],x=x0+c*cw,y=y0+(r*4+l)*lh+21;
      E('text',{x:x+16,y,class:'mono eg-cod s-ink',text:cod},this.tab);
      E('text',{x:x+84,y,class:'eg-aa '+(a==='*'?'s-a':'s-ink'),text:AA3[a]},this.tab);
      if(cod==='AUG')E('text',{x:x+132,y,class:'t-tiny s-a',text:'départ'},this.tab);
      const hit=E('rect',{x,y:y-21,width:cw,height:lh,class:'eg-hit'},this.tab);
      hit.addEventListener('click',()=>{const st=ctx.etape();if(st&&st.ctl==='table'){this.p.sel=cod;this.render();hooks.onCodon&&hooks.onCodon();}});
    }
  },
  render(){
    const p=this.p;show(this.needT,p.need);
    this.panels.forEach((P,k)=>{show(P.pg,clamp(p.tri-k,0,1));P.cells.forEach((c,i)=>c.setAttribute('class',p.fill>.5&&i<20?'cell hl-a':'cell'));});
    show(this.redT,p.fill);
    show(this.puG,p.pu);show(this.pfG,p.pf>0?1:0);this.pfB.forEach((b,j)=>{b.style.opacity=clamp(p.pf*6-j,0,1);});
    show(this.tab,clamp(p.tab*8,0,1));this.tabClip.setAttribute('height',(720*clamp(p.tab,0,1)).toFixed(1));
    const s=p.sel||'···',r=B4.indexOf(s[0]),c=B4.indexOf(s[1]),l=B4.indexOf(s[2]),{x0,cw,y0,lh}=this;
    this.rowB.setAttribute('y',y0+Math.max(r,0)*4*lh);show(this.rowB,r>=0?1:0);
    this.colB.setAttribute('x',x0+Math.max(c,0)*cw);show(this.colB,c>=0?1:0);
    const on=r>=0&&c>=0&&l>=0;[this.selB,this.selK].forEach(e=>{e.setAttribute('x',x0+Math.max(c,0)*cw);e.setAttribute('y',y0+(Math.max(r,0)*4+Math.max(l,0))*lh);show(e,on?1:0);});
    const hi=p.hi||'';for(const cod in this.hl)show(this.hl[cod],hi&&hi.includes(CODE[cod])?1:0);
  }
});

/* ---------- 5. la traduction : le ribosome avance ---------- */
const PX=c=>140+c*104;
const XL=i=>150+i*34+Math.floor(i/3)*12,CXL=c=>XL(3*c+1),PAS=3*34+12;   // un codon = 114 unités
scene('transl',{
  p:{on:0,rib:0,k:0,end:0,met:0,lab:0,hold:0},
  build(g){
    this.rib=E('g',{},g);
    E('rect',{x:-120,y:270,width:240,height:186,rx:64,class:'rulebody'},this.rib);
    E('rect',{x:-112,y:490,width:224,height:74,rx:34,class:'rulebody'},this.rib);
    txt(this.rib,-104,298,'ribosome','t-lab2 s-dim');
    this.sg=E('g',{},g);
    for(let i=0;i<21;i++)E('text',{x:XL(i),y:480,class:'mono t-mid s-ink','text-anchor':'middle',text:TL_ARN[i]},this.sg);
    txt(this.sg,118,480,'5′','t-lab s-dim','middle');txt(this.sg,940,480,'…','t-lab s-dim','middle');
    txt(this.sg,118,612,'ARNm, lu de 5′ vers 3′','t-lab s-dim');
    this.trna=[];
    for(let c=0;c<NB;c++){
      const tg=E('g',{},g),cx=CXL(c),cod=TL_ARN.slice(3*c,3*c+3),ac=anticodon(cod),a=CODE[cod];
      E('line',{x1:cx,x2:cx,y1:268,y2:300,class:'k-ink','stroke-width':2},tg);
      E('rect',{x:cx-48,y:300,width:96,height:108,rx:10,class:'eg-trna'},tg);
      txt(tg,cx,360,'ARNt','t-tiny s-dim','middle');
      for(let j=0;j<3;j++){E('text',{x:XL(3*c+j),y:438,class:'mono t-mid s-a','text-anchor':'middle',text:ac[j]},tg);E('line',{x1:XL(3*c+j),x2:XL(3*c+j),y1:445,y2:457,class:'k-a','stroke-width':2},tg);}
      const bead=E('g',{},tg);E('circle',{cx,cy:240,r:28,class:'eg-trna'},bead);E('text',{x:cx,y:247,class:'eg-aa s-ink','text-anchor':'middle',text:AA3[a]},bead);
      this.trna.push({tg,bead});
    }
    this.eg=E('g',{},g);
    FIN.split('').forEach((b,i)=>E('text',{x:XL(9+i),y:480,class:'mono t-mid '+(i>=9?'s-a':'s-ink'),'text-anchor':'middle',text:b},this.eg));
    txt(this.eg,XL(9)-44,480,'…','t-lab s-dim','middle');txt(this.eg,940,480,'3′','t-lab s-dim','middle');
    txt(this.eg,CXL(6),330,`aucun ARNt pour ${FIN.slice(9)}`,'t-lab s-a','middle');
    // la chaîne
    this.links=[];this.beads=[];
    for(let c=0;c<NB;c++){const x=PX(c);
      if(c)this.links.push(E('line',{x1:x-104+30,x2:x-30,y1:150,y2:150,class:'k-ink','stroke-width':2},g));
      const bg=E('g',{},g);this.beads.push(bg);
      E('circle',{cx:x,cy:150,r:30,class:'eg-trna'},bg);
      E('text',{x,y:157,class:'eg-aa s-ink','text-anchor':'middle',text:AA3[NORMAL.aa[c]]},bg);}
    this.link=E('line',{y1:180,y2:268,class:'k-dim','stroke-width':1.5,'stroke-dasharray':'4 5'},g);
    this.tail=E('g',{},g);
    E('line',{x1:PX(6)+30,x2:830,y1:150,y2:150,class:'k-ink','stroke-width':2},this.tail);
    txt(this.tail,858,157,'…','t-lab2 s-ink','middle');
    E('line',{x1:886,x2:906,y1:150,y2:150,class:'k-ink','stroke-width':2},this.tail);
    E('circle',{cx:936,cy:150,r:30,class:'eg-trna'},this.tail);
    E('text',{x:936,y:157,class:'eg-aa s-ink','text-anchor':'middle',text:AA3[NORMAL.aa[NORMAL.aa.length-1]]},this.tail);
    this.tot1=txt(g,500,82,`Chaîne libérée : ${NORMAL.aa.length} acides aminés`,'t-lab2 s-ink','middle');
    this.tot2=txt(g,500,82,`Chaîne β mûre : ${L_MURE} acides aminés, numérotés à partir de ${AA3[NORMAL.aa[1]]}`,'t-lab2 s-ink','middle');
    this.nums=E('g',{},g);
    for(let c=1;c<NB;c++)txt(this.nums,PX(c),208,c===6?'n° 6':String(c),'t-tick '+(c===6?'s-a':'s-dim'),'middle');
    txt(this.nums,936,208,String(L_MURE),'t-tick s-dim','middle');
    /* les légendes de l'ARNt : un geste, un mot */
    this.labG=E('g',{},g);
    const lead=(y,x2,x1=238)=>E('line',{x1,x2,y1:y,y2:y,class:'k-dim','stroke-width':1.4,'stroke-dasharray':'4 4'},this.labG);
    const c0=TL_ARN.slice(0,3),a0=anticodon(c0);
    lead(240,402,222);txt(this.labG,410,246,`un acide aminé : la méthionine (${AA3[CODE[c0]]})`,'t-lab2 s-ink');
    lead(350,402);txt(this.labG,410,356,'l’ARN de transfert (ARNt)','t-lab2 s-ink');
    lead(436,402);txt(this.labG,410,442,`l’anticodon : ${a0}`,'t-lab2 s-a');
    E('path',{d:`M${XL(0)-14} 494v8H${XL(2)+14}v-8`,class:'k-ink nofill','stroke-width':2.5},this.labG);
    txt(this.labG,XL(1),532,`le codon : ${c0}`,'t-lab2 s-ink','middle');
  },
  render(){
    const p=this.p,k=p.k,e=p.end;
    const rx=CXL(0)+Math.max(0,k-1)*PAS-(1-p.rib)*260;
    this.rib.setAttribute('transform',`translate(${rx.toFixed(1)} 0)`);show(this.rib,p.on*clamp(p.rib*1.5,0,1));
    show(this.sg,p.on*(1-e));show(this.eg,e);
    const hold=.4*p.hold;   // tant que « hold » vaut 1, l'ARNt garde son acide aminé : on peut le montrer
    this.trna.forEach(({tg,bead},c)=>{const a=clamp(k-c,0,1),l=clamp(k-c-1,0,1);
      tg.setAttribute('transform',`translate(${(-l*90).toFixed(1)} ${((1-a)*-150-l*120).toFixed(1)})`);
      tg.style.opacity=a*(1-l)*(1-e);
      bead.style.opacity=1-clamp((k-c-.6-hold)/.4,0,1);});
    this.beads.forEach((b,c)=>{const o=clamp((k-c-.6-hold)/.4,0,1);b.style.opacity=c===0?o*(1-p.met):o;
      if(c===0)b.setAttribute('transform',`translate(${(-40*p.met).toFixed(1)} ${(-40*p.met).toFixed(1)})`);});
    this.links.forEach((l,i)=>{l.style.opacity=clamp((k-i-1.6-hold)/.4,0,1)*(i===0?1-p.met:1);});
    const kk=clamp(Math.ceil(k-.001),1,NB);this.link.setAttribute('x1',PX(kk-1));this.link.setAttribute('x2',CXL(kk-1));
    show(this.link,clamp(k-.6-hold,0,1)*(1-e)*p.on);
    show(this.tail,e);show(this.tot1,e*(1-p.met));show(this.tot2,p.met);show(this.nums,p.met);
    show(this.labG,p.lab*p.on*(1-e));
  }
});

/* ---------- 6. l'atelier de mutation ---------- */
const XA=i=>118+i*37+Math.floor(i/3)*11,CXA=c=>XA(3*c+1),BX=j=>118+j*47;
function dispOf(n,A){if(!A.m||A.t==='s')return n;if(A.t==='d')return n<A.k?n:n===A.k?null:n-1;return n<A.k?n:n+1;}
function normOf(d,A){if(!A.m||A.t==='s')return d;if(A.t==='d')return d<A.k?d:d+1;return d<A.k?d:d===A.k?A.k:d-1;}
scene('atelier',{
  p:{on:0,mut:'',sel:C6+1,prot:0,ver:0,sh:1},
  build(g){
    this.top=E('g',{},g);
    txt(this.top,500,52,'Atelier : les codons 1 à 7 du gène de la chaîne β','t-cap s-dim','middle');
    for(let c=0;c<7;c++)this['n'+c]=txt(this.top,CXA(c),96,String(c+1),'t-tick s-dim','middle');
    txt(this.top,22,152,'ADN','t-tiny s-dim');txt(this.top,22,254,'ARNm','t-tiny s-dim');txt(this.top,22,308,'acides','t-tiny s-dim');txt(this.top,22,324,'aminés','t-tiny s-dim');
    txt(this.top,90,152,'5′','t-tiny s-dim','middle');txt(this.top,954,152,'3′','t-tiny s-dim','middle');
    txt(this.top,90,180,'3′','t-tiny s-dim','middle');txt(this.top,954,180,'5′','t-tiny s-dim','middle');
    txt(this.top,90,254,'5′','t-tiny s-dim','middle');txt(this.top,954,254,'3′','t-tiny s-dim','middle');
    this.selR=E('rect',{y:118,width:34,height:70,rx:3,class:'reg f-a'},this.top);
    this.selK=E('rect',{y:118,width:34,height:70,rx:3,class:'k-a nofill','stroke-width':2},this.top);
    this.caret=E('g',{},this.top);E('line',{x1:0,x2:0,y1:120,y2:188,class:'k-a','stroke-width':3},this.caret);this.caretT=txt(this.caret,0,114,'','t-tiny s-a','middle');
    this.cod=[];this.tpl=[];this.arn=[];
    for(let i=0;i<WN;i++){
      this.cod.push(E('text',{x:XA(i),y:152,class:'mono t-mid s-ink','text-anchor':'middle'},this.top));
      this.tpl.push(E('text',{x:XA(i),y:180,class:'mono t-tick s-dim','text-anchor':'middle'},this.top));
      this.arn.push(E('text',{x:XA(i),y:254,class:'mono t-mid s-ink','text-anchor':'middle'},this.top));
      const hit=E('rect',{x:XA(i)-18,y:116,width:36,height:74,class:'eg-hit'},this.top);
      hit.addEventListener('click',()=>{const st=ctx.etape();if(!st||st.ctl!=='atelier')return;const A=analyser(this.p.mut);this.p.sel=normOf(W0+i,A);this.render();hooks.onSel&&hooks.onSel();});
    }
    this.aa=[];for(let c=0;c<7;c++){E('path',{d:`M${XA(3*c)-14} 266v6H${XA(3*c+2)+14}v-6`,class:'k-dim nofill','stroke-width':1.5},this.top);this.aa.push(txt(this.top,CXA(c),308,'','t-lab2 s-ink','middle'));}
    // les deux chaînes
    this.pr=E('g',{},g);
    txt(this.pr,22,398,'chaîne','t-tiny s-dim');txt(this.pr,22,414,'normale','t-tiny s-dim');
    txt(this.pr,22,488,'chaîne','t-tiny s-dim');txt(this.pr,22,504,'mutée','t-tiny s-dim');
    const mkRow=y=>[...Array(PN)].map((_,j)=>{const bg=E('g',{},this.pr);if(j)E('line',{x1:BX(j)-47+20,x2:BX(j)-20,y1:y,y2:y,class:'k-line','stroke-width':2},bg);
      const c=E('circle',{cx:BX(j),cy:y,r:20,class:'eg-bd'},bg),t=E('text',{x:BX(j),y:y+5,class:'t-tiny s-ink','text-anchor':'middle'},bg);return{bg,c,t};});
    for(let j=0;j<PN;j++)txt(this.pr,BX(j),376,String(j+1),'t-tiny '+(j===5?'s-a':'s-dim'),'middle');
    this.rowN=mkRow(406);this.rowM=mkRow(496);
    this.dotN=txt(this.pr,958,411,'…','t-lab s-dim','middle');this.dotM=txt(this.pr,958,501,'…','t-lab s-dim','middle');
    this.vg=E('g',{},g);
    this.vT=txt(this.vg,500,578,'','t-big2 s-ink','middle');this.vS=txt(this.vg,500,614,'','t-lab s-ink','middle');this.vN=txt(this.vg,500,648,'','t-lab2 s-a','middle');
  },
  render(){
    const p=this.p,A=analyser(p.mut),seq=A.seq;show(this.top,p.on);
    const win=seq.slice(W0,W0+WN),chg=A.m&&A.t!=='d'?A.k-W0:-1;
    for(let i=0;i<WN;i++){const b=win[i]||'',hot=i===chg;
      this.cod[i].textContent=b;this.cod[i].setAttribute('class','mono t-mid '+(hot?'s-a':'s-ink'));
      this.tpl[i].textContent=b?PAIRE[b]:'';this.tpl[i].setAttribute('class','mono t-tick '+(hot?'s-a':'s-dim'));
      this.arn[i].textContent=toARN(b);this.arn[i].setAttribute('class','mono t-mid '+(hot?'s-a':'s-ink'));}
    if(A.m&&A.t==='d'&&A.k>=W0&&A.k<W0+WN){const d=A.k-W0,x=d>0?(XA(d-1)+XA(d))/2:XA(0)-18;this.caret.setAttribute('transform',`translate(${x.toFixed(1)} 0)`);this.caretT.textContent='−'+CDS[A.k];show(this.caret,1);}else show(this.caret,0);
    const d=dispOf(p.sel,A);
    if(d!=null&&d>=W0&&d<W0+WN){[this.selR,this.selK].forEach(e=>e.setAttribute('x',XA(d-W0)-17));show(this.selR,.55*p.sh);show(this.selK,p.sh);}else{show(this.selR,0);show(this.selK,0);}
    for(let c=0;c<7;c++){const n=c+1,cod=seq.slice(3*n,3*n+3),a=aaDe(cod),t=this.aa[c];
      if(A.tr.stop!==-1&&n>A.tr.stop){t.textContent='·';t.setAttribute('class','t-lab2 s-dim');}
      else if(a==='*'){t.textContent='Stop';t.setAttribute('class','t-lab2 s-a');}
      else{t.textContent=AA3[a];t.setAttribute('class','t-lab2 '+(a!==NORMAL.aa[n]?'s-a':'s-ink'));}
      const cn=CDS.slice(3*n,3*n+3);this['n'+c].setAttribute('class','t-tick '+(cod!==cn?'s-a':'s-dim'));}
    show(this.pr,p.prot);
    for(let j=0;j<PN;j++){const n=j+1,aN=NORMAL.aa[n],R=this.rowN[j];R.t.textContent=AA3[aN];
      const M=this.rowM[j],aM=A.tr.aa[n],isStop=A.tr.stop===n;
      if(aM){M.bg.style.opacity=1;const df=aM!==aN;M.c.setAttribute('class',df?'eg-bd eg-bd-x':'eg-bd');M.t.textContent=AA3[aM];M.t.setAttribute('class','t-tiny '+(df?'s-a':'s-ink'));}
      else if(isStop){M.bg.style.opacity=1;M.c.setAttribute('class','eg-bd eg-bd-stop');M.t.textContent='stop';M.t.setAttribute('class','t-tiny s-a');}
      else M.bg.style.opacity=0;}
    show(this.dotM,A.tr.stop===-1||A.tr.stop>PN?1:0);
    const V=verdict(A);this.vT.textContent=ty(V.t);this.vS.textContent=ty(V.s);this.vN.textContent=ty(V.n);
    this.vT.setAttribute('class','t-big2 '+(A.kind==='normal'?'s-dim':'s-ink'));show(this.vg,p.ver);
  }
});
}
