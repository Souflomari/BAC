/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Du gène à la protéine », partie centrale : la transcription (l'ARN polymérase en
 * action), l'ARN comparé à l'ADN, la règle des trois lignes, le tableau du code, la traduction
 * (le ribosome, ses sites P et A, l'ARNt) et l'atelier de mutation.
 *
 * Mêmes règles que les scènes A : titres `t-titre` / `t-sous`, trois tailles de texte au plus,
 * deux objets rouges au plus, 40 unités de marge, aucun exposant Unicode.
 */
import {B4,CODE,AA3,PAIRE,CDS,NORMAL,L_MURE,TR_COD,TR_TPL,TR_ARN,TL_ARN,NB,FIN,C6,toARN,anticodon,analyser,aaDe,CONNUS,compl} from "./expression-genetique-code";

export const W0=3,WN=21;                       // atelier : triplets 1 à 7 = indices 3 à 23
const PN=18;

/** Le verdict de l'atelier : le type de mutation, ce qu'elle fait, et l'allèle s'il est connu. */
export function verdict(A){
  if(A.kind==='normal')return{t:'Allèle normal',s:'Choisis un nucléotide du brin non transcrit, puis change-le.',n:''};
  const n=CONNUS[A.m]||'';
  if(A.kind==='silencieuse')return{t:`Silencieuse · ${toARN(A.cN)} → ${toARN(A.cM)}`,s:`Substitution : le triplet ${A.j} change, l’acide aminé non (${AA3[A.aN]}). La protéine est identique.`,n};
  if(A.kind==='faux-sens')return{t:`Faux-sens · ${AA3[A.aN]} ${A.j} → ${AA3[A.aM]}`,s:`Substitution : un seul acide aminé change ; la chaîne garde ${A.len} acides aminés.`,n};
  if(A.kind==='non-sens')return{t:`Non-sens · le codon ${A.j} devient ${toARN(A.cM)}`,s:`Substitution : un codon stop ; la chaîne s’arrête après ${A.j-1} acides aminés au lieu de ${L_MURE}.`,n};
  const op=A.t==='d'?'Délétion':'Insertion';
  return{t:`Décalage du cadre de lecture · ${op.toLowerCase()}`,s:A.len!=null?`${op} d’un nucléotide : tout change à partir du n° ${A.first} ; stop au codon ${A.tr.stop} → ${A.len} acides aminés au lieu de ${L_MURE}.`:`${op} d’un nucléotide : tout change à partir du n° ${A.first}, sans stop avant la fin du gène.`,n};
}

export function scenesB(ctx){
const {E,lerp,clamp,ty,show,scene,hooks}=ctx;
const txt=(parent,x,y,str,cls,anchor)=>E('text',{x,y,class:cls,'text-anchor':anchor||'start',text:ty(str)},parent);

/* ---------- 3. la transcription : la figure-clé ---------- */
const XT=i=>116+i*36+Math.floor(i/3)*8;            // 21 bases, codons espacés : de 116 à 884
scene('trans',{
  p:{dna:0,dn:0,open:0,tpl:0,ez:0,n:0,fo:0,cmp:0,lv:0,dir:0,a1:0,a2:0,a3:0,rd:0},
  build(g){
    this.dg=E('g',{},g);
    this.rungs=[];this.cod=[];this.tpl=[];
    for(let i=0;i<21;i++){
      this.rungs.push(E('line',{x1:XT(i),x2:XT(i),class:'k-line','stroke-width':2},this.dg));
      this.cod.push(E('text',{x:XT(i),class:'mono t-mid s-ink','text-anchor':'middle',text:TR_COD[i]},this.dg));
      this.tpl.push(E('text',{x:XT(i),class:'mono t-mid s-ink','text-anchor':'middle',text:TR_TPL[i]},this.dg));
    }
    this.cL=txt(this.dg,80,0,'5′','t-sous','middle');this.cR=txt(this.dg,920,0,'3′','t-sous','middle');
    this.tL=txt(this.dg,80,0,'3′','t-sous','middle');this.tR=txt(this.dg,920,0,'5′','t-sous','middle');
    this.cLab=txt(this.dg,116,0,'brin non transcrit','t-sous');
    this.tLab=txt(this.dg,116,0,'brin transcrit : le modèle','t-titre s-ink');
    /* le sens de chaque brin */
    this.dirG=E('g',{},g);
    E('line',{x1:116,x2:884,y1:262,y2:262,class:'k-ink','stroke-width':3,'marker-end':'url(#arw)'},this.dirG);
    txt(this.dirG,500,244,'un brin a un sens : de 5′ vers 3′','t-titre s-ink','middle');
    E('line',{x1:884,x2:116,y1:414,y2:414,class:'k-dim','stroke-width':3,'marker-end':'url(#arw)'},this.dirG);
    txt(this.dirG,500,448,'l’autre brin, en sens inverse : lui aussi de 5′ vers 3′','t-titre s-ink','middle');
    this.fbox=E('rect',{x:XT(1)-19,width:38,height:38,rx:3,class:'k-ink nofill','stroke-width':2.5},g);
    /* l'enzyme : à au moins 40 unités des bords */
    this.pol=E('g',{},g);
    this.polR=E('rect',{x:-54,width:108,rx:34,class:'eg-enz'},this.pol);
    this.polT=txt(this.pol,0,0,'ARN polymérase','t-titre s-a','middle');
    /* ce que fait l'enzyme, un geste à la fois */
    this.legG=E('g',{},g);
    this.leg=['elle ouvre les deux brins','elle lit le brin transcrit','elle assemble l’ARN'].map((t,j)=>{const lg=E('g',{},this.legG),y=258+j*44;
      E('circle',{cx:262,cy:y-6,r:15,class:'s-ink'},lg);E('text',{x:262,y:y,class:'t-titre s-bg sans-halo','text-anchor':'middle',text:String(j+1)},lg);
      txt(lg,290,y,t,'t-titre s-ink');return lg;});
    this.mg=E('g',{},g);this.mr=[];this.ml=[];
    for(let i=0;i<21;i++){
      this.ml.push(E('line',{x1:XT(i),x2:XT(i),class:'k-a','stroke-width':1.5},this.mg));
      this.mr.push(E('text',{x:XT(i),class:'mono t-mid s-a','text-anchor':'middle',text:TR_ARN[i]},this.mg));
    }
    this.mL=txt(this.mg,80,0,'5′','t-sous','middle');this.mR=txt(this.mg,920,0,'3′','t-sous','middle');
    this.mLab=txt(this.mg,884,0,'ARN messager (ARNm)','t-titre s-a','end');
    /* le sens de la lecture et de la construction */
    this.rdG=E('g',{},g);
    this.rd1=E('g',{},this.rdG);
    E('line',{x1:116,x2:884,y1:606,y2:606,class:'k-ink','stroke-width':3,'marker-end':'url(#arw)'},this.rd1);
    txt(this.rd1,500,640,'l’enzyme lit le brin transcrit de 3′ vers 5′','t-titre s-ink','middle');
    this.rd2=E('g',{},this.rdG);
    E('line',{x1:116,x2:884,y1:368,y2:368,class:'k-a','stroke-width':3,'marker-end':'url(#arw)'},this.rd2);
    txt(this.rd2,500,350,'elle construit l’ARNm de 5′ vers 3′','t-titre s-a','middle');
    this.cmpT=txt(g,500,346,'mêmes bases que le brin non transcrit, U à la place de T','t-titre s-ink','middle');
  },
  render(){
    const p=this.p,o=p.open,yC=lerp(300,170,o),yT=lerp(358,528,o),yM=lerp(462,238,p.cmp);
    show(this.dg,p.dna);
    for(let i=0;i<21;i++){const a=clamp(p.dn-i,0,1);
      this.cod[i].setAttribute('y',yC);this.tpl[i].setAttribute('y',yT);
      this.rungs[i].setAttribute('y1',yC+8);this.rungs[i].setAttribute('y2',yT-28);this.rungs[i].style.opacity=(1-o)*a;
      this.cod[i].style.opacity=a*(1-.6*p.tpl*(1-p.cmp));this.tpl[i].style.opacity=a*(1-.6*p.cmp);
      this.cod[i].setAttribute('class','mono t-mid '+(p.cmp>.5&&TR_COD[i]==='T'?'s-a':'s-ink'));
    }
    const ends=clamp(p.dn,0,1),hot=p.dir>.5?'t-titre s-ink':'t-sous';
    [this.cL,this.cR].forEach(t=>{t.setAttribute('y',yC);t.style.opacity=ends;t.setAttribute('class',hot);});
    [this.tL,this.tR].forEach(t=>{t.setAttribute('y',yT);t.style.opacity=ends;t.setAttribute('class',hot);});
    this.cLab.setAttribute('y',yC-36);show(this.cLab,o*p.tpl);this.tLab.setAttribute('y',yT+40);show(this.tLab,p.tpl*o);
    show(this.dirG,p.dir*(1-o));
    this.fbox.setAttribute('y',yT-29);show(this.fbox,p.fo*p.dna);
    const fx=clamp(p.n-.5,0,20),f0=Math.floor(fx),front=lerp(XT(f0),XT(Math.min(f0+1,20)),fx-f0);
    // l'enzyme couvre d'abord les deux brins (elle les ouvre), puis le seul brin transcrit et l'ARNm (elle lit et assemble)
    const top=lerp(yC-34,yM-40,p.ez);
    this.polR.setAttribute('y',top);this.polR.setAttribute('height',Math.max(0,yT+26-top));
    this.polT.setAttribute('y',top-14);this.polT.setAttribute('x',(clamp(front,122,878)-front).toFixed(1));
    this.pol.setAttribute('transform',`translate(${front.toFixed(1)} 0)`);
    show(this.pol,clamp(p.open*2-1,0,1)*(1-p.cmp)*(1-p.lv)*(p.n<20.5?1:clamp((21-p.n)*2,0,1)));
    show(this.legG,1-p.cmp);this.leg.forEach((lg,j)=>{const a=clamp(p['a'+(j+1)],0,1);lg.style.opacity=a;lg.setAttribute('transform',`translate(${((1-a)*-14).toFixed(1)} 0)`);});
    show(this.rdG,(1-p.cmp)*(1-p.lv));show(this.rd1,clamp(p.rd,0,1));show(this.rd2,clamp(p.rd-1,0,1));
    for(let i=0;i<21;i++){const a=clamp(p.n-i,0,1);
      this.mr[i].setAttribute('y',yM);this.mr[i].style.opacity=a;
      this.ml[i].setAttribute('y1',yM+8);this.ml[i].setAttribute('y2',yT-28);this.ml[i].style.opacity=a*(1-p.cmp);}
    [this.mL,this.mR].forEach(t=>{t.setAttribute('y',yM);t.style.opacity=clamp(p.n-20,0,1);});
    this.mLab.setAttribute('y',yM-36+76*p.cmp);show(this.mLab,clamp(p.n-20,0,1));
    this.mg.setAttribute('transform',`translate(${(p.lv*900).toFixed(1)} 0)`);show(this.mg,1-p.lv);
    show(this.cmpT,p.cmp*(1-p.lv));
  }
});

/* ---------- 3. l'ARNm comparé à l'ADN (un classique de la Partie I) ---------- */
scene('arn',{
  p:{r:0},
  build(g){
    txt(g,500,104,'L’ADN et l’ARNm : ce qui change','t-titre s-ink','middle');
    const xL=90,xA=470,xR=730,y0=190,dy=78;
    this.head=E('g',{},g);
    txt(this.head,xA,y0-20,'ADN','t-cle s-ink','middle');txt(this.head,xR,y0-20,'ARNm','t-cle s-a','middle');
    E('line',{x1:xL,x2:910,y1:y0,y2:y0,class:'k-ink','stroke-width':1.5},this.head);
    const R=[['brins','deux','un seul'],['sucre','désoxyribose','ribose'],['bases','A, T, G, C','A, U, G, C'],['où ?','dans le noyau','fait dans le noyau,'],];
    this.rows=R.map(([k,a,b],i)=>{const rg=E('g',{},g),y=y0+46+i*dy;
      txt(rg,xL,y,k,'t-sous');txt(rg,xA,y,a,'t-titre s-ink','middle');txt(rg,xR,y,b,'t-titre s-ink','middle');
      if(i===3)txt(rg,xR,y+26,'lu dans le cytoplasme','t-titre s-ink','middle');
      E('line',{x1:xL,x2:910,y1:y+(i===3?46:22),y2:y+(i===3?46:22),class:'k-line','stroke-width':1},rg);return rg;});
    this.foot=txt(g,500,560,'Dans les deux : une suite de nucléotides (un sucre, un phosphate, une base).','t-sous','middle');
  },
  render(){const p=this.p;show(this.head,clamp(p.r*4,0,1));this.rows.forEach((rg,i)=>show(rg,clamp(p.r-i,0,1)));show(this.foot,clamp((p.r-3.5)*2,0,1));}
});

/* ---------- 3. la règle des trois lignes : brin non transcrit, brin transcrit, ARNm ---------- */
const XR=i=>330+i*54+Math.floor(i/3)*24;           // 9 bases (3 triplets) : de 330 à 810
scene('regle',{
  p:{r:0,c:0},
  build(g){
    txt(g,500,92,'Au bac : trois lignes alignées','t-titre s-ink','middle');
    const nt=CDS.slice(0,9),Y=[210,330,450];
    const L=[['brin non','transcrit',nt,['5′','3′']],['brin','transcrit',compl(nt),['3′','5′']],['ARNm','',toARN(nt),['5′','3′']]];
    this.rows=L.map(([l1,l2,s,[a,b]],k)=>{const rg=E('g',{},g),y=Y[k];
      txt(rg,60,l2?y-10:y,l1,'t-titre s-ink');if(l2)txt(rg,60,y+14,l2,'t-titre s-ink');
      txt(rg,XR(0)-34,y,a,'t-sous','middle');txt(rg,XR(8)+34,y,b,'t-sous','middle');
      const lt=s.split('').map((c,i)=>E('text',{x:XR(i),y,class:'mono t-mid s-ink','text-anchor':'middle',text:c},rg));
      return {rg,lt};});
    // deux fois « complémentaire » : des traits base à base, et le mot dans la marge de gauche
    this.cp=[0,1].map(k=>{const cg=E('g',{},g),y1=Y[k]+12,y2=Y[k+1]-30;
      for(let i=0;i<9;i++)E('line',{x1:XR(i),x2:XR(i),y1,y2,class:'k-line','stroke-width':2},cg);
      E('line',{x1:72,x2:72,y1:y1+16,y2:y2-12,class:'k-ink','stroke-width':2,'marker-end':'url(#arw)','marker-start':'url(#arw)'},cg);
      txt(cg,86,(y1+y2)/2+6,'complémentaires','t-sous');return cg;});
    this.cap=E('g',{},g);
    txt(this.cap,500,546,'l’ARNm a les bases du brin non transcrit, avec U à la place de T','t-titre s-ink','middle');
    txt(this.cap,500,576,'deux fois complémentaire = les mêmes bases','t-sous','middle');
    this.key=[0,2];
  },
  render(){
    const p=this.p;
    this.rows.forEach(({rg,lt},k)=>{show(rg,clamp(p.r-k,0,1));lt.forEach(t=>t.setAttribute('class','mono t-mid '+(p.c>.5&&this.key.includes(k)?'s-a':'s-ink')));});
    this.cp.forEach((cg,k)=>show(cg,clamp(p.r-k-1,0,1)));
    show(this.cap,p.c);
  }
});

/* ---------- 4. le code : triplets, poly-U, la table ---------- */
scene('code',{
  p:{need:0,tri:0,fill:0,pu:0,pf:0,tab:0,sel:'···',hi:''},
  build(g){
    this.needT=txt(g,500,92,'20 acides aminés différents à désigner','t-titre s-ink','middle');
    this.panels=[1,2,3].map((n,k)=>{
      const pg=E('g',{},g),cx=190+k*310,N=4**n,side=Math.sqrt(N),cs=[44,40,26][k],gap=[6,5,4][k],w=side*cs+(side-1)*gap,x0=cx-w/2,y0=170;
      txt(pg,cx,146,n===1?'1 base':`${n} bases`,'t-titre s-ink','middle');
      const cells=[];for(let i=0;i<N;i++){const r=Math.floor(i/side),c=i%side;cells.push(E('rect',{x:x0+c*(cs+gap),y:y0+r*(cs+gap),width:cs,height:cs,rx:2,class:'cell'},pg));}
      txt(pg,cx,460,n===1?'4 mots':n===2?'4 × 4 = 16 mots':'4 × 4 × 4 = 64 mots','t-titre s-ink','middle');
      txt(pg,cx,490,N<20?'trop peu':'assez — et même trop',N<20?'t-sous':'t-titre s-a','middle');
      return{pg,cells,N};});
    this.redT=txt(g,500,580,'64 codons pour 20 acides aminés : plusieurs codons désignent le même.','t-sous','middle');
    // poly-U
    this.puG=E('g',{},g);
    txt(this.puG,500,170,'Un ARN artificiel, fait d’une seule base','t-titre s-ink','middle');
    txt(this.puG,140,262,'5′','t-sous','middle');
    for(let i=0;i<18;i++)E('text',{x:180+i*38,y:262,class:'mono t-mid s-ink','text-anchor':'middle',text:'U'},this.puG);
    txt(this.puG,880,262,'… 3′','t-sous','middle');
    txt(this.puG,500,330,'+ un extrait de bactéries : ribosomes, ARNt, acides aminés','t-sous','middle');
    this.pfG=E('g',{},g);this.pfB=[];
    for(let j=0;j<6;j++){const x=218+j*114;
      E('path',{d:`M${x-50} 276v8H${x+50}v-8`,class:'k-dim nofill','stroke-width':1.5},this.pfG);
      const bg=E('g',{},this.pfG);
      if(j)E('line',{x1:x-114+34,x2:x-34,y1:440,y2:440,class:'k-ink','stroke-width':2},bg);
      E('circle',{cx:x,cy:440,r:34,class:'cell'},bg);
      E('text',{x,y:447,class:'t-titre s-ink','text-anchor':'middle',text:AA3[CODE.UUU]},bg);this.pfB.push(bg);}
    txt(this.pfG,880,447,'…','t-titre s-ink','middle');
    txt(this.pfG,500,540,'une chaîne faite seulement de phénylalanine : UUU → Phe','t-titre s-a','middle');
    // la table du code génétique
    const x0=130,cw=195,y0=128,lh=31;Object.assign(this,{x0,cw,y0,lh});
    const cp=E('clipPath',{id:'eg-tabclip'},g);this.tabClip=E('rect',{x:0,y:0,width:1000,height:0},cp);
    this.tab=E('g',{'clip-path':'url(#eg-tabclip)'},g);
    this.rowB=E('rect',{x:x0,width:4*cw,height:4*lh,class:'reg f-b'},this.tab);
    this.colB=E('rect',{y:y0,width:cw,height:16*lh,class:'reg f-b'},this.tab);
    this.selB=E('rect',{width:cw,height:lh,class:'reg f-a'},this.tab);
    this.selK=E('rect',{width:cw,height:lh,class:'k-a nofill','stroke-width':2.5},this.tab);
    this.hl={};
    for(let r=0;r<4;r++)for(let c=0;c<4;c++)for(let l=0;l<4;l++){const cod=B4[r]+B4[c]+B4[l];
      this.hl[cod]=E('rect',{x:x0+c*cw+2,y:y0+(r*4+l)*lh+1,width:cw-4,height:lh-2,rx:2,class:'reg f-b'},this.tab);}
    txt(this.tab,x0+2*cw,72,'deuxième base','t-sous','middle');
    E('text',{x:938,y:y0+8*lh,class:'t-sous','text-anchor':'middle',transform:`rotate(90 938 ${y0+8*lh})`,text:'troisième base'},this.tab);
    E('text',{x:62,y:y0+8*lh,class:'t-sous','text-anchor':'middle',transform:`rotate(-90 62 ${y0+8*lh})`,text:'première base'},this.tab);
    for(let c=0;c<4;c++)E('text',{x:x0+c*cw+cw/2,y:106,class:'mono t-titre s-ink','text-anchor':'middle',text:B4[c]},this.tab);
    for(let r=0;r<4;r++){E('text',{x:104,y:y0+r*4*lh+2*lh+8,class:'mono t-titre s-ink','text-anchor':'middle',text:B4[r]},this.tab);
      for(let l=0;l<4;l++)E('text',{x:x0+4*cw+12,y:y0+(r*4+l)*lh+21,class:'mono t-sous','text-anchor':'middle',text:B4[l]},this.tab);}
    for(let r=0;r<=4;r++)E('line',{x1:x0,x2:x0+4*cw,y1:y0+r*4*lh,y2:y0+r*4*lh,class:r%4?'k-dim':'k-ink','stroke-width':r%4?1:1.5},this.tab);
    for(let c=0;c<=4;c++)E('line',{x1:x0+c*cw,x2:x0+c*cw,y1:y0,y2:y0+16*lh,class:c%4?'k-dim':'k-ink','stroke-width':c%4?1:1.5},this.tab);
    for(let r=0;r<4;r++)for(let c=0;c<4;c++)for(let l=0;l<4;l++){
      const cod=B4[r]+B4[c]+B4[l],a=CODE[cod],x=x0+c*cw,y=y0+(r*4+l)*lh+21;
      E('text',{x:x+14,y,class:'mono eg-cod s-ink',text:cod},this.tab);
      E('text',{x:x+80,y,class:'eg-aa '+(a==='*'?'s-a':'s-ink'),text:AA3[a]},this.tab);
      if(cod==='AUG')E('text',{x:x+122,y,class:'t-sous',text:'initiation'},this.tab);
      const hit=E('rect',{x,y:y-21,width:cw,height:lh,class:'eg-hit'},this.tab);
      hit.addEventListener('click',()=>{const st=ctx.etape();if(st&&st.ctl==='table'){this.p.sel=cod;this.render();hooks.onCodon&&hooks.onCodon();}});
    }
  },
  render(){
    const p=this.p;show(this.needT,p.need);
    this.panels.forEach((P,k)=>{show(P.pg,clamp(p.tri-k,0,1));P.cells.forEach((c,i)=>c.setAttribute('class',p.fill>.5&&i<20?(k===2?'cell hl-a':'cell hl-b'):'cell'));});
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

/* ---------- 5. la traduction : le ribosome, ses sites P et A ---------- */
const XL=i=>110+i*30+Math.floor(i/3)*14,CXL=c=>XL(3*c+1),PAS=3*30+14;   // un codon = 104 unités
const PX=c=>150+c*104;                                                    // les perles de la chaîne
scene('transl',{
  p:{on:0,rib:0,k:0,end:0,met:0,lab:0,hold:0,sites:0,pep:0},
  build(g){
    /* le ribosome : deux sous-unités ; la grande porte les sites P (à gauche) et A (à droite) */
    this.rib=E('g',{},g);
    E('rect',{x:-118,y:276,width:236,height:184,rx:60,class:'rulebody'},this.rib);
    E('rect',{x:-108,y:490,width:216,height:70,rx:32,class:'rulebody'},this.rib);
    this.siteG=E('g',{},this.rib);
    [[-PAS/2,'P'],[PAS/2,'A']].forEach(([x,l])=>{E('rect',{x:x-46,y:300,width:92,height:150,rx:10,class:'k-dim nofill','stroke-width':1.5,'stroke-dasharray':'5 4'},this.siteG);txt(this.siteG,l==='P'?x-8:x+8,296,'site '+l,'t-sous',l==='P'?'end':'start');});
    this.ribT=txt(this.rib,0,590,'ribosome','t-sous','middle');
    /* l'ARNm */
    this.sg=E('g',{},g);
    for(let i=0;i<24;i++)E('text',{x:XL(i),y:480,class:'mono t-mid s-ink','text-anchor':'middle',text:TL_ARN[i]},this.sg);
    txt(this.sg,XL(0)-30,480,'5′','t-sous','middle');txt(this.sg,XL(23)+30,480,'…','t-sous','middle');
    this.sgL=txt(this.sg,XL(0)-14,630,'ARNm, lu de 5′ vers 3′','t-sous');
    /* les ARNt, un par codon */
    this.trna=[];
    for(let c=0;c<NB;c++){
      const tg=E('g',{},g),cx=CXL(c),cod=TL_ARN.slice(3*c,3*c+3),ac=anticodon(cod),a=CODE[cod];
      E('line',{x1:cx,x2:cx,y1:268,y2:312,class:'k-ink','stroke-width':2},tg);
      E('rect',{x:cx-40,y:312,width:80,height:96,rx:10,class:'eg-trna'},tg);
      txt(tg,cx,366,'ARNt','t-sous','middle');
      for(let j=0;j<3;j++){E('text',{x:XL(3*c+j),y:438,class:'mono t-mid s-a','text-anchor':'middle',text:ac[j]},tg);E('line',{x1:XL(3*c+j),x2:XL(3*c+j),y1:445,y2:457,class:'k-a','stroke-width':2},tg);}
      const bead=E('g',{},tg);E('circle',{cx,cy:240,r:28,class:'eg-trna'},bead);E('text',{x:cx,y:246,class:'eg-aa s-ink','text-anchor':'middle',text:AA3[a]},bead);
      this.trna.push({tg,bead});
    }
    /* la fin du message : le codon stop au site A */
    this.eg=E('g',{},g);
    FIN.split('').forEach((b,i)=>E('text',{x:XL(12+i),y:480,class:'mono t-mid '+(i>=9?'s-a':'s-ink'),'text-anchor':'middle',text:b},this.eg));
    txt(this.eg,XL(12)-44,480,'…','t-sous','middle');txt(this.eg,XL(23)+30,480,'3′','t-sous','middle');
    txt(this.eg,CXL(5)-20,330,`aucun ARNt pour ${FIN.slice(9)} :`,'t-titre s-a','end');txt(this.eg,CXL(5)-20,356,'la chaîne est libérée','t-titre s-a','end');
    /* la chaîne */
    this.links=[];this.beads=[];
    for(let c=0;c<NB;c++){const x=PX(c);
      if(c)this.links.push(E('line',{x1:x-104+30,x2:x-30,y1:150,y2:150,class:'k-ink','stroke-width':2.5},g));
      const bg=E('g',{},g);this.beads.push(bg);
      E('circle',{cx:x,cy:150,r:30,class:'eg-trna'},bg);
      E('text',{x,y:156,class:'eg-aa s-ink','text-anchor':'middle',text:AA3[NORMAL.aa[c]]},bg);}
    this.pepG=E('g',{},g);
    E('path',{d:`M${PX(0)+32} 126v-12H${PX(1)-32}v12`,class:'k-ink nofill','stroke-width':1.5},this.pepG);
    txt(this.pepG,(PX(0)+PX(1))/2,96,'liaison peptidique','t-titre s-ink','middle');
    this.link=E('line',{y1:180,y2:268,class:'k-dim','stroke-width':1.5,'stroke-dasharray':'4 5'},g);
    this.tail=E('g',{},g);
    E('line',{x1:PX(6)+30,x2:820,y1:150,y2:150,class:'k-ink','stroke-width':2},this.tail);
    txt(this.tail,846,157,'…','t-titre s-ink','middle');
    E('line',{x1:868,x2:880,y1:150,y2:150,class:'k-ink','stroke-width':2},this.tail);
    E('circle',{cx:910,cy:150,r:30,class:'eg-trna'},this.tail);
    E('text',{x:910,y:156,class:'eg-aa s-ink','text-anchor':'middle',text:AA3[NORMAL.aa[NORMAL.aa.length-1]]},this.tail);
    this.tot1=txt(g,500,74,`Chaîne libérée : ${NORMAL.aa.length} acides aminés`,'t-titre s-ink','middle');
    this.tot2=txt(g,500,74,`Met retirée : la chaîne β compte ${L_MURE} acides aminés, de Val (n° 1) à His`,'t-titre s-ink','middle');
    this.nums=E('g',{},g);
    for(let c=1;c<NB;c++)txt(this.nums,PX(c),210,c===6?'n° 6':String(c),c===6?'t-titre s-ink':'t-sous','middle');
    txt(this.nums,910,210,String(L_MURE),'t-sous','middle');
    /* les légendes de l'ARNt : un geste, un mot (à droite, hors du ribosome) */
    this.labG=E('g',{},g);
    const lead=(y,x1,x2=548)=>E('line',{x1,x2,y1:y,y2:y,class:'k-dim','stroke-width':1.4,'stroke-dasharray':'4 4'},this.labG);
    const c0=TL_ARN.slice(0,3),a0=anticodon(c0);
    lead(240,CXL(0)+34);txt(this.labG,556,246,`un acide aminé : la méthionine (${AA3[CODE[c0]]})`,'t-titre s-ink');
    lead(360,CXL(0)+44);txt(this.labG,556,366,'l’ARN de transfert (ARNt)','t-titre s-ink');
    lead(432,XL(2)+16);txt(this.labG,556,438,`l’anticodon : ${a0}`,'t-titre s-a');
    E('path',{d:`M${XL(0)-14} 494v8H${XL(2)+14}v-8`,class:'k-ink nofill','stroke-width':2.5},this.labG);
    E('line',{x1:XL(2)+14,x2:548,y1:498,y2:522,class:'k-dim','stroke-width':1.4,'stroke-dasharray':'4 4'},this.labG);txt(this.labG,556,528,`le codon d’initiation : ${c0}`,'t-titre s-ink');
  },
  render(){
    const p=this.p,k=p.k,e=p.end;
    // le ribosome couvre deux codons : site P sur le codon k−1, site A sur le codon k
    const rx=CXL(0)+PAS/2+Math.max(0,k-1)*PAS-(1-p.rib)*240;
    this.rib.setAttribute('transform',`translate(${rx.toFixed(1)} 0)`);show(this.rib,p.on*clamp(p.rib*1.5,0,1));
    show(this.siteG,p.sites);show(this.ribT,1-p.lab);
    show(this.sg,p.on*(1-e));show(this.sgL,1-p.lab);show(this.eg,e);
    const hold=.4*p.hold;   // tant que « hold » vaut 1, l'ARNt garde son acide aminé : on peut le montrer
    this.trna.forEach(({tg,bead},c)=>{const a=clamp(k-c,0,1),l=clamp(k-c-1,0,1);
      tg.setAttribute('transform',`translate(${(-l*90).toFixed(1)} ${((1-a)*-150-l*120).toFixed(1)})`);
      tg.style.opacity=a*(1-l)*(1-e);
      bead.style.opacity=1-clamp((k-c-.6-hold)/.4,0,1);});
    this.beads.forEach((b,c)=>{const o=clamp((k-c-.6-hold)/.4,0,1);b.style.opacity=c===0?o*(1-p.met):o;
      if(c===0)b.setAttribute('transform',`translate(${(-40*p.met).toFixed(1)} ${(-40*p.met).toFixed(1)})`);});
    this.links.forEach((l,i)=>{l.style.opacity=clamp((k-i-1.6-hold)/.4,0,1)*(i===0?1-p.met:1);});
    show(this.pepG,p.pep*clamp((k-1.6)/.4,0,1)*(1-e));
    const kk=clamp(Math.ceil(k-.001),1,NB);this.link.setAttribute('x1',PX(kk-1));this.link.setAttribute('x2',CXL(kk-1));
    show(this.link,clamp(k-.6-hold,0,1)*(1-e)*p.on);
    show(this.tail,e);show(this.tot1,e*(1-p.met));show(this.tot2,p.met);show(this.nums,p.met);
    show(this.labG,p.lab*p.on*(1-e));
  }
});

/* ---------- 6. l'atelier de mutation ---------- */
const XA=i=>176+i*34+Math.floor(i/3)*10,CXA=c=>XA(3*c+1),BX=j=>170+j*44;
function dispOf(n,A){if(!A.m||A.t==='s')return n;if(A.t==='d')return n<A.k?n:n===A.k?null:n-1;return n<A.k?n:n+1;}
function normOf(d,A){if(!A.m||A.t==='s')return d;if(A.t==='d')return d<A.k?d:d+1;return d<A.k?d:d===A.k?A.k:d-1;}
scene('atelier',{
  p:{on:0,mut:'',sel:C6+1,prot:0,ver:0,sh:1},
  build(g){
    this.top=E('g',{},g);
    txt(this.top,500,56,'Atelier : les triplets 1 à 7, comptés depuis le premier montré','t-titre s-ink','middle');
    for(let c=0;c<7;c++)this['n'+c]=txt(this.top,CXA(c),98,String(c+1),'t-sous','middle');
    txt(this.top,44,142,'brin non','t-sous');txt(this.top,44,162,'transcrit','t-sous');
    txt(this.top,44,192,'brin','t-sous');txt(this.top,44,212,'transcrit','t-sous');
    txt(this.top,44,262,'ARNm','t-sous');
    txt(this.top,44,308,'acides','t-sous');txt(this.top,44,328,'aminés','t-sous');
    txt(this.top,XA(0)-26,150,'5′','t-sous','middle');txt(this.top,XA(20)+26,150,'3′','t-sous','middle');
    txt(this.top,XA(0)-26,202,'3′','t-sous','middle');txt(this.top,XA(20)+26,202,'5′','t-sous','middle');
    txt(this.top,XA(0)-26,262,'5′','t-sous','middle');txt(this.top,XA(20)+26,262,'3′','t-sous','middle');
    this.selR=E('rect',{y:118,width:32,height:94,rx:3,class:'reg f-a'},this.top);
    this.selK=E('rect',{y:118,width:32,height:94,rx:3,class:'k-a nofill','stroke-width':2},this.top);
    this.caret=E('g',{},this.top);E('line',{x1:0,x2:0,y1:120,y2:210,class:'k-a','stroke-width':3},this.caret);this.caretT=txt(this.caret,0,114,'','t-sous','middle');
    this.cod=[];this.tpl=[];this.arn=[];
    for(let i=0;i<WN;i++){
      this.cod.push(E('text',{x:XA(i),y:150,class:'mono t-mid s-ink','text-anchor':'middle'},this.top));
      this.tpl.push(E('text',{x:XA(i),y:202,class:'mono t-sous','text-anchor':'middle'},this.top));
      this.arn.push(E('text',{x:XA(i),y:262,class:'mono t-mid s-ink','text-anchor':'middle'},this.top));
      const hit=E('rect',{x:XA(i)-17,y:116,width:34,height:98,class:'eg-hit'},this.top);
      hit.addEventListener('click',()=>{const st=ctx.etape();if(!st||st.ctl!=='atelier')return;const A=analyser(this.p.mut);this.p.sel=normOf(W0+i,A);this.render();hooks.onSel&&hooks.onSel();});
    }
    this.aa=[];for(let c=0;c<7;c++){E('path',{d:`M${XA(3*c)-12} 274v6H${XA(3*c+2)+12}v-6`,class:'k-dim nofill','stroke-width':1.5},this.top);this.aa.push(txt(this.top,CXA(c),318,'','t-titre s-ink','middle'));}
    // les deux chaînes
    this.pr=E('g',{},g);
    txt(this.pr,44,402,'chaîne','t-sous');txt(this.pr,44,422,'normale','t-sous');
    txt(this.pr,44,486,'chaîne','t-sous');txt(this.pr,44,506,'mutée','t-sous');
    const mkRow=y=>[...Array(PN)].map((_,j)=>{const bg=E('g',{},this.pr);if(j)E('line',{x1:BX(j)-44+20,x2:BX(j)-20,y1:y,y2:y,class:'k-line','stroke-width':2},bg);
      const c=E('circle',{cx:BX(j),cy:y,r:20,class:'eg-bd'},bg),t=E('text',{x:BX(j),y:y+5.5,class:'eg-l16 s-ink','text-anchor':'middle'},bg);return{bg,c,t};});
    for(let j=0;j<PN;j++)txt(this.pr,BX(j),376,String(j+1),j===5?'t-titre s-ink':'t-sous','middle');
    this.rowN=mkRow(410);this.rowM=mkRow(494);
    this.dotN=txt(this.pr,BX(PN-1)+34,416,'…','t-sous','middle');this.dotM=txt(this.pr,BX(PN-1)+34,500,'…','t-sous','middle');
    this.vg=E('g',{},g);
    this.vT=txt(this.vg,500,574,'','t-cle s-ink','middle');this.vS=txt(this.vg,500,608,'','t-sous','middle');this.vN=txt(this.vg,500,640,'','t-titre s-ink','middle');
  },
  render(){
    const p=this.p,A=analyser(p.mut),seq=A.seq;show(this.top,p.on);
    const win=seq.slice(W0,W0+WN),chg=A.m&&A.t!=='d'?A.k-W0:-1;
    for(let i=0;i<WN;i++){const b=win[i]||'',hot=i===chg;
      this.cod[i].textContent=b;this.cod[i].setAttribute('class','mono t-mid '+(hot?'s-a':'s-ink'));
      this.tpl[i].textContent=b?PAIRE[b]:'';this.tpl[i].setAttribute('class','mono '+(hot?'eg-l16 s-a':'t-sous'));
      this.arn[i].textContent=toARN(b);this.arn[i].setAttribute('class','mono t-mid '+(hot?'s-a':'s-ink'));}
    if(A.m&&A.t==='d'&&A.k>=W0&&A.k<W0+WN){const d=A.k-W0,x=d>0?(XA(d-1)+XA(d))/2:XA(0)-17;this.caret.setAttribute('transform',`translate(${x.toFixed(1)} 0)`);this.caretT.textContent='−'+CDS[A.k];show(this.caret,1);}else show(this.caret,0);
    const d=dispOf(p.sel,A);
    if(d!=null&&d>=W0&&d<W0+WN){[this.selR,this.selK].forEach(e=>e.setAttribute('x',XA(d-W0)-16));show(this.selR,.55*p.sh);show(this.selK,p.sh);}else{show(this.selR,0);show(this.selK,0);}
    for(let c=0;c<7;c++){const n=c+1,cod=seq.slice(3*n,3*n+3),a=aaDe(cod),t=this.aa[c];
      if(A.tr.stop!==-1&&n>A.tr.stop){t.textContent='·';t.setAttribute('class','t-titre s-dim');}
      else if(a==='*'){t.textContent='Stop';t.setAttribute('class','t-titre s-a');}
      else{t.textContent=AA3[a];t.setAttribute('class','t-titre '+(a!==NORMAL.aa[n]?'s-a':'s-ink'));}
      const cn=CDS.slice(3*n,3*n+3);this['n'+c].setAttribute('class',cod!==cn?'t-titre s-a':'t-sous');}
    show(this.pr,p.prot);
    for(let j=0;j<PN;j++){const n=j+1,aN=NORMAL.aa[n],R=this.rowN[j];R.t.textContent=AA3[aN];
      const M=this.rowM[j],aM=A.tr.aa[n],isStop=A.tr.stop===n;
      if(aM){M.bg.style.opacity=1;const df=aM!==aN;M.c.setAttribute('class',df?'eg-bd eg-bd-x':'eg-bd');M.t.textContent=AA3[aM];M.t.setAttribute('class','eg-l16 '+(df?'s-a':'s-ink'));}
      else if(isStop){M.bg.style.opacity=1;M.c.setAttribute('class','eg-bd eg-bd-stop');M.t.textContent='stop';M.t.setAttribute('class','eg-l16 s-a');}
      else M.bg.style.opacity=0;}
    show(this.dotM,A.tr.stop===-1||A.tr.stop>PN?1:0);
    const V=verdict(A);this.vT.textContent=ty(V.t);this.vS.textContent=ty(V.s);this.vN.textContent=ty(V.n);
    this.vT.setAttribute('class','t-cle '+(A.kind==='normal'?'s-dim':'s-ink'));show(this.vg,p.ver);
  }
});
}
