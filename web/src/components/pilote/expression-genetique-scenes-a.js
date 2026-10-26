/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Du gène à la protéine », première moitié : les prérequis
 * (la protéine et l'hémoglobine ; le zoom cellule → chromosome → gène ; les
 * quatre bases), l'énigme (globule en faucille, électrophorèse, chaîne β,
 * lettres du gène) et la cellule (noyau, cytoplasme, ribosomes, messager).
 *
 * Chaque scène est un jeu de paramètres numériques interpolés par le noyau
 * (`noyau.js`) : le script les fait varier, la scène se redessine.
 */
import {AA3,NOM,NORMAL,L_MURE,CDS,A_HBS,VINGT} from "./expression-genetique-code";
import {croissant,repli} from "./expression-genetique-mots";

export function scenesA(ctx){
const {E,lerp,clamp,ty,show,scene}=ctx;
const txt=(parent,x,y,str,cls,anchor)=>E('text',{x,y,class:cls,'text-anchor':anchor||'start',text:ty(str)},parent);
const at=(g,x,y,s=1)=>g.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)})${s===1?'':` scale(${s.toFixed(3)})`}`);
// une perle qui apparaît : elle grossit en arrivant
const pop=(g,x,y,o)=>{g.style.opacity=o;at(g,x,y,.55+.45*o);};

/* ---------- 0. une protéine, l'hémoglobine ---------- */
scene('prot',{
  p:{ch:0,beads:0,kinds:0,fold:0,hb:0,rb:0,mol:0,o2:0,bx:0},
  build(g){
    const N=16;this.N=N;
    /* la chaîne : le début de la vraie chaîne β */
    this.chG=E('g',{},g);
    txt(this.chG,500,92,'Une protéine : une chaîne d’acides aminés','t-lab2 s-ink','middle');
    txt(this.chG,500,122,'le début d’une vraie chaîne, celle de l’hémoglobine','t-lab s-dim','middle');
    this.links=[];for(let i=0;i<N-1;i++)this.links.push(E('line',{class:'k-ink','stroke-width':2.5},this.chG));
    this.bd=[];
    for(let i=0;i<N;i++){const bg=E('g',{},this.chG);E('circle',{r:21,class:'eg-trna'},bg);E('text',{y:5,class:'t-tick s-ink','text-anchor':'middle','font-weight':700,text:AA3[NORMAL.aa[i]]},bg);this.bd.push(bg);}
    this.lp=i=>[104+i*52,215];
    this.fp=i=>repli(i,N,500,272,104);
    /* les 20 sortes */
    this.kdG=E('g',{},g);
    txt(this.kdG,500,436,'20 sortes d’acides aminés, chacune avec son nom','t-lab2 s-ink','middle');
    this.kd=VINGT.map((a,j)=>{const kg=E('g',{},this.kdG),x=116+(j%10)*84,y=486+Math.floor(j/10)*62;
      E('circle',{r:25,class:'eg-trna'},kg);E('text',{y:5,class:'t-tick s-ink','text-anchor':'middle','font-weight':700,text:AA3[a]},kg);at(kg,x,y);kg.__xy=[x,y];return kg;});
    /* l'hémoglobine : un globule, puis une molécule à quatre chaînes */
    this.hbG=E('g',{},g);
    this.rbG=E('g',{},this.hbG);
    const rb=E('g',{transform:'translate(190 330)'},this.rbG);
    E('ellipse',{rx:122,ry:122,class:'reg f-a'},rb);E('ellipse',{rx:122,ry:122,class:'k-a nofill','stroke-width':3},rb);E('ellipse',{rx:50,ry:50,class:'reg f-b'},rb);
    [[-84,-30],[-60,52],[-20,-84],[28,-62],[70,-16],[84,44],[26,76],[-30,86],[-96,14],[4,-30],[44,20],[-44,16]].forEach(([x,y])=>E('circle',{cx:x,cy:y,r:7,class:'s-a'},rb));
    txt(this.rbG,190,500,'un globule rouge','t-lab2 s-ink','middle');
    txt(this.rbG,190,528,'rempli de molécules d’hémoglobine','t-lab s-dim','middle');
    this.zl=E('g',{},this.hbG);
    [[318,276,478,176],[318,384,478,500]].forEach(([a,b,c,d])=>E('line',{x1:a,y1:b,x2:c,y2:d,class:'k-dim','stroke-dasharray':'5 6','stroke-width':1.6},this.zl));
    this.molG=E('g',{},this.hbG);
    E('rect',{x:478,y:176,width:440,height:324,rx:10,class:'cell'},this.molG);
    txt(this.molG,698,530,'une molécule d’hémoglobine : 4 chaînes','t-lab2 s-ink','middle');
    this.ring=[[610,290,'α'],[786,290,'β'],[610,402,'β'],[786,402,'α']].map(([x,y,l],j)=>{
      const rg=E('g',{},this.molG),beta=l==='β';
      for(let i=0;i<12;i++){const[bx,by]=repli(i,12,x,y,40);E('circle',{cx:bx.toFixed(1),cy:by.toFixed(1),r:9,class:beta?'eg-bd eg-bd-x':'eg-bd'},rg);}
      E('text',{x,y:y+9,class:'t-big2 '+(beta?'s-a':'s-ink'),'text-anchor':'middle',text:l},rg);
      return {rg,beta};});
    this.o2=[[548,236],[848,236],[548,456],[848,456]].map(([x,y])=>{const og=E('g',{},this.molG);E('circle',{cx:x,cy:y,r:19,class:'eg-trna'},og);E('text',{x,y:y+6,class:'t-tick s-a','text-anchor':'middle','font-weight':700,text:'O₂'},og);return og;});
    this.o2L=txt(this.molG,698,206,'chaque chaîne retient une molécule d’oxygène','t-lab s-dim','middle');
  },
  render(){
    const p=this.p,N=this.N,f=clamp(p.fold,0,1);
    show(this.chG,p.ch);
    const pos=[];for(let i=0;i<N;i++){const a=this.lp(i),b=this.fp(i);pos.push([lerp(a[0],b[0],f),lerp(a[1],b[1],f)]);}
    for(let i=0;i<N;i++){pop(this.bd[i],pos[i][0],pos[i][1],clamp(p.beads-i,0,1));}
    this.links.forEach((l,i)=>{l.setAttribute('x1',pos[i][0]);l.setAttribute('y1',pos[i][1]);l.setAttribute('x2',pos[i+1][0]);l.setAttribute('y2',pos[i+1][1]);l.style.opacity=clamp(p.beads-i-1,0,1);});
    show(this.kdG,clamp(p.kinds*3,0,1)*p.ch);
    this.kd.forEach((kg,j)=>{const o=clamp(p.kinds*24-j,0,1);pop(kg,kg.__xy[0],kg.__xy[1],o);});
    show(this.hbG,p.hb);show(this.rbG,p.rb);show(this.zl,clamp(p.mol*2,0,1));show(this.molG,clamp(p.mol*2,0,1));
    this.ring.forEach(({rg,beta},j)=>{rg.style.opacity=clamp(p.mol-j,0,1)*(!beta?1-.7*p.bx:1);});
    this.o2.forEach((og,j)=>{og.style.opacity=clamp(p.o2-j,0,1)*(j===0||j===3?1-.7*p.bx:1);});show(this.o2L,clamp(p.o2,0,1));
  }
});

/* ---------- 0. le zoom : cellule → noyau → chromosome → ADN, puis les gènes ---------- */
scene('zoom',{
  p:{z:0,gv:0,gn:0,hl:0},
  build(g){
    this.pn=E('g',{},g);
    const X=[28,278,528,778],W=194,Y0=190,H=236;this.X=X;
    this.panels=X.map((x,i)=>{
      const pg=E('g',{},this.pn),cx=x+W/2,cy=Y0+H/2;
      E('rect',{x,y:Y0,width:W,height:H,rx:6,class:'cell'},pg);
      if(i===0){ // la cellule, son noyau
        E('rect',{x:x+16,y:Y0+44,width:W-32,height:H-88,rx:30,class:'reg f-c'},pg);E('rect',{x:x+16,y:Y0+44,width:W-32,height:H-88,rx:30,class:'k-ink nofill','stroke-width':2},pg);
        E('circle',{cx,cy,r:30,class:'reg f-b'},pg);E('circle',{cx,cy,r:30,class:'k-ink nofill','stroke-width':2,'stroke-dasharray':'16 5'},pg);
        pg.__sq=[cx-40,cy-40,80];
      }else if(i===1){ // le noyau et ses chromosomes
        E('circle',{cx,cy,r:84,class:'reg f-b'},pg);E('circle',{cx,cy,r:84,class:'k-ink nofill','stroke-width':2.5,'stroke-dasharray':'30 8'},pg);
        [[-42,-34,20],[30,-46,-30],[-8,6,40],[48,20,-10],[-46,40,-50],[20,52,15]].forEach(([dx,dy,r],k)=>{const xg=E('g',{transform:`translate(${cx+dx} ${cy+dy}) rotate(${r})`},pg);
          E('path',{d:'M-4 -18Q6 0 -4 18',class:(k===2?'k-a':'k-ink')+' nofill','stroke-width':6,'stroke-linecap':'round'},xg);});
        pg.__sq=[cx-30,cy-30,60];
      }else if(i===2){ // un chromosome : une seule molécule d'ADN, très enroulée
        const xg=E('g',{transform:`translate(${cx} ${cy})`},pg);
        E('path',{d:'M-12 -92Q16 0 -12 92',class:'k-ink nofill','stroke-width':34,'stroke-linecap':'round'},xg);
        E('path',{d:'M-12 -92Q16 0 -12 92',class:'k-line nofill','stroke-width':30,'stroke-linecap':'round'},xg);
        for(let k=-4;k<=4;k++){const y=k*20,t=(y+92)/184,mx=-12+56*t*(1-t);E('line',{x1:(mx-17).toFixed(1),x2:(mx+17).toFixed(1),y1:y-6,y2:y+8,class:'k-ink','stroke-width':2.5},xg);}
        pg.__sq=[cx-34,cy-70,68];
      }else{ // l'ADN
        let a='',b='',r='';const x0=x+14,x1=x+W-14;
        for(let xx=x0;xx<=x1;xx+=3){const dy=36*Math.sin((xx-x0)/15);a+=(xx>x0?'L':'M')+xx+' '+(cy+dy).toFixed(1);b+=(xx>x0?'L':'M')+xx+' '+(cy-dy).toFixed(1);}
        for(let xx=x0+6;xx<=x1;xx+=9){const dy=36*Math.sin((xx-x0)/15);E('line',{x1:xx,x2:xx,y1:cy+dy,y2:cy-dy,class:'k-line','stroke-width':1.5},pg);}
        E('path',{d:a,class:'k-ink nofill','stroke-width':3},pg);E('path',{d:b,class:'k-ink nofill','stroke-width':3},pg);
      }
      return pg;});
    ['cellule','noyau','chromosome','ADN'].forEach((t,i)=>txt(this.panels[i],X[i]+W/2,Y0+H+34,t,'t-lab2 s-ink','middle'));
    ['','contient l’ADN','un ADN très long','4 lettres : A T G C'].forEach((t,i)=>{if(t)txt(this.panels[i],X[i]+W/2,Y0+H+62,t,'t-lab s-dim','middle');});
    // les lignes de zoom : d'un petit carré vers le panneau suivant
    this.zm=[0,1,2].map(i=>{const zg=E('g',{},this.pn),s=this.panels[i].__sq;
      E('rect',{x:s[0],y:s[1],width:s[2],height:s[2],class:'k-a nofill','stroke-width':2},zg);
      E('line',{x1:s[0]+s[2],y1:s[1],x2:X[i+1],y2:Y0,class:'k-a','stroke-dasharray':'5 5','stroke-width':1.5},zg);
      E('line',{x1:s[0]+s[2],y1:s[1]+s[2],x2:X[i+1],y2:Y0+H,class:'k-a','stroke-dasharray':'5 5','stroke-width':1.5},zg);return zg;});
    txt(this.pn,500,120,'On zoome : de plus en plus petit','t-lab2 s-dim','middle');
    /* les gènes le long d'un chromosome */
    this.gG=E('g',{},g);
    this.bar=E('g',{},this.gG);
    E('rect',{x:70,y:252,width:860,height:44,rx:4,class:'cell'},this.bar);
    txt(this.bar,500,176,'un chromosome : un très long ADN','t-lab2 s-ink','middle');
    this.c11=txt(this.bar,930,176,'chromosome 11','t-lab2 s-a','end');
    const G=[[130,300,'gène 1',4],[410,640,'gène 2',8],[730,850,'gène 3',4]];
    this.genes=G.map(([x1,x2,l,n],j)=>{const gg=E('g',{},this.gG),cx=(x1+x2)/2;
      E('rect',{x:x1,y:242,width:x2-x1,height:64,rx:3,class:'reg f-b'},gg);E('rect',{x:x1,y:242,width:x2-x1,height:64,rx:3,class:'k-ink nofill','stroke-width':2.5},gg);
      const lab=txt(gg,cx,228,l,'t-lab2 s-ink','middle');
      const ar=E('line',{x1:cx,y1:316,x2:cx,y2:394,class:'k-dim','stroke-width':2,'marker-end':'url(#arw)'},gg);
      const ch=E('g',{},gg);E('line',{x1:cx-(n-1)*17,x2:cx+(n-1)*17,y1:446,y2:446,class:'k-ink','stroke-width':2.5},ch);
      const bs=[];for(let i=0;i<n;i++)bs.push(E('circle',{cx:cx-(n-1)*17+i*34,cy:446,r:14,class:'eg-trna'},ch));
      const cl=txt(gg,cx,498,'chaîne '+(j+1),'t-lab s-dim','middle');
      return {gg,lab,ar,ch,bs,cl,x1,x2,cx,n,j};});
    this.rec=txt(this.gG,500,364,'recette','t-tiny s-dim','middle');this.rec.setAttribute('x',this.genes[0].cx+36);
    this.cap=txt(this.gG,500,590,'un gène = la recette d’une chaîne de protéine','t-big2 s-ink','middle');
    this.hbb=txt(this.gG,this.genes[1].cx,228,'HBB','t-lab2 s-a','middle');
    this.hbbC=txt(this.gG,this.genes[1].cx,498,'chaîne β','t-lab2 s-a','middle');
  },
  render(){
    const p=this.p,gv=clamp(p.gv,0,1);
    show(this.pn,1-gv);
    this.panels.forEach((pg,i)=>pg.style.opacity=clamp(p.z-i,0,1));
    this.zm.forEach((zg,i)=>zg.style.opacity=clamp(p.z-i-1,0,1)*.9);
    show(this.gG,gv);
    show(this.bar,clamp(p.gn,0,1));show(this.c11,p.hl);
    this.genes.forEach(({gg,lab,ar,ch,cl,j})=>{
      const on=clamp(p.gn-1,0,1),ch_=clamp(p.gn-2,0,1),red=j===1?p.hl:0;
      gg.style.opacity=1;
      gg.children[0].style.opacity=on;gg.children[1].style.opacity=on;lab.style.opacity=on;ar.style.opacity=ch_;ch.style.opacity=ch_;cl.style.opacity=ch_;
      gg.children[0].setAttribute('class',j===1&&red>.5?'reg f-a':'reg f-b');gg.children[1].setAttribute('class',(j===1&&red>.5?'k-a':'k-ink')+' nofill');
      if(j===1){lab.style.opacity=on*(1-red);cl.style.opacity=ch_*(1-red);ch.querySelectorAll('circle').forEach(c=>c.setAttribute('class',red>.5?'eg-bd eg-bd-x':'eg-trna'));ch.querySelector('line').setAttribute('class',red>.5?'k-a':'k-ink');}
    });
    show(this.hbb,on1(p));show(this.hbbC,on1(p));
    show(this.rec,clamp(p.gn-2,0,1)*(1-p.hl));show(this.cap,clamp(p.gn-2.6,0,1)*(1-p.hl));
    function on1(p){return clamp(p.gn-1,0,1)*p.hl;}
  }
});

/* ---------- 3. les quatre bases ---------- */
scene('bases',{
  p:{n:0,pr:0,u:0},
  build(g){
    const T=[['A','adénine',120],['T','thymine',280],['G','guanine',480],['C','cytosine',640]];
    txt(g,60,150,'ADN : quatre bases','t-lab2 s-dim');
    this.tiles=T.map(([l,n,cx])=>{const tg=E('g',{},g);
      E('rect',{x:cx-60,y:190,width:120,height:130,rx:4,class:'cell hl-b'},tg);
      E('text',{x:cx,y:282,class:'t-num s-ink','text-anchor':'middle',text:l},tg);
      txt(tg,cx,364,n,'t-lab2 s-ink','middle');return tg;});
    this.pairs=[[120,280,'A avec T'],[480,640,'G avec C']].map(([a,b,t])=>{const pg=E('g',{},g);
      E('path',{d:`M${a} 388v16H${b}v-16`,class:'k-a nofill','stroke-width':2.5},pg);
      txt(pg,(a+b)/2,444,t,'t-big2 s-a','middle');return pg;});
    this.ug=E('g',{},g);
    txt(this.ug,860,150,'ARN','t-lab2 s-a','middle');
    E('rect',{x:800,y:190,width:120,height:130,rx:4,class:'cell hl-a'},this.ug);
    E('text',{x:860,y:282,class:'t-num s-a','text-anchor':'middle',text:'U'},this.ug);
    txt(this.ug,860,364,'uracile','t-lab2 s-a','middle');
    txt(this.ug,860,404,'prend la place','t-lab s-dim','middle');txt(this.ug,860,430,'de T dans l’ARN','t-lab s-dim','middle');
  },
  render(){
    const p=this.p;
    this.tiles.forEach((tg,i)=>{const o=clamp(p.n-i,0,1);tg.style.opacity=o;tg.setAttribute('transform',`translate(0 ${((1-o)*14).toFixed(1)})`);});
    this.pairs.forEach((pg,i)=>show(pg,clamp(p.pr-i,0,1)));
    show(this.ug,p.u);
  }
});

/* ---------- 1. l'énigme : la faucille, l'électrophorèse, la chaîne, les lettres ---------- */
scene('drep',{
  p:{cell:0,morph:0,chainV:0,chain:0,six:0,grid:0,gl:0,gel:0},
  build(g){
    this.cg=E('g',{transform:'translate(500 320)'},g);
    this.inner=E('g',{},this.cg);
    this.pN=E('path',{class:'reg f-b'},this.inner);
    this.dim=E('ellipse',{cx:0,cy:0,rx:62,ry:62,class:'s-bg'},this.inner);
    this.pNk=E('path',{class:'k-ink nofill','stroke-width':2.5},this.inner);
    this.pS=E('path',{class:'reg f-a'},this.inner);
    this.pSk=E('path',{class:'k-a nofill','stroke-width':2.5},this.inner);
    this.capN=txt(g,500,580,'Globule rouge normal : un disque souple','t-lab2 s-ink','middle');
    this.capS=txt(g,500,580,'Globule rouge en faucille : rigide, il se coince','t-lab2 s-a','middle');
    this.capD=txt(g,500,616,'schéma, pas à l’échelle','t-lab s-dim','middle');
    /* l'électrophorèse (Pauling, 1949) */
    this.gl=E('g',{},g);
    txt(this.gl,500,92,'Électrophorèse : l’hémoglobine avance dans un champ électrique','t-lab2 s-ink','middle');
    E('rect',{x:300,y:130,width:400,height:400,rx:6,class:'reg f-c'},this.gl);
    E('rect',{x:300,y:130,width:400,height:400,rx:6,class:'k-line nofill','stroke-width':1.5},this.gl);
    [400,600].forEach(x=>E('rect',{x:x-36,y:140,width:72,height:12,class:'k-ink nofill','stroke-width':1.5},this.gl));
    txt(this.gl,288,152,'départ','t-tiny s-dim','end');
    this.bandS=E('rect',{x:364,width:72,height:18,rx:9,class:'s-ink'},this.gl);
    this.bandM=E('rect',{x:564,width:72,height:18,rx:9,class:'s-a'},this.gl);
    E('line',{x1:752,y1:150,x2:752,y2:500,class:'k-dim','stroke-width':2,'marker-end':'url(#arw)'},this.gl);
    txt(this.gl,770,330,'le sens de','t-lab s-dim');txt(this.gl,770,354,'la migration','t-lab s-dim');
    txt(this.gl,400,562,'hémoglobine','t-lab s-dim','middle');txt(this.gl,400,588,'saine','t-lab2 s-ink','middle');
    txt(this.gl,600,562,'hémoglobine','t-lab s-dim','middle');txt(this.gl,600,588,'d’un malade','t-lab2 s-a','middle');
    txt(this.gl,500,622,'schéma : les deux avancent différemment','t-lab s-dim','middle');
    /* la chaîne β */
    this.ch=E('g',{},g);
    txt(this.ch,500,92,`La chaîne β de l’hémoglobine : ${L_MURE} acides aminés`,'t-lab2 s-ink','middle');
    const per=25,pos=i=>{const r=Math.floor(i/per),c=i%per;return[128+(r%2?per-1-c:c)*31.5,170+r*74];};
    let d='';for(let i=0;i<L_MURE;i++){const[x,y]=pos(i);d+=(i?'L':'M')+x.toFixed(1)+' '+y;}
    this.line=E('path',{d,class:'k-line nofill','stroke-width':2,pathLength:1000,'stroke-dasharray':'1000 1000'},this.ch);
    this.beads=[];for(let i=0;i<L_MURE;i++){const[x,y]=pos(i);this.beads.push(E('circle',{cx:x,cy:y,r:10,class:'s-dim'},this.ch));}
    {const[x,y]=pos(0);txt(this.ch,x,y+34,'1','t-tick s-dim','middle');}
    {const[x,y]=pos(L_MURE-1);txt(this.ch,x,y+34,String(L_MURE),'t-tick s-dim','middle');}
    const[x6,y6]=pos(5);this.sixG=E('g',{},this.ch);
    E('circle',{cx:x6,cy:y6,r:16,class:'s-a'},this.sixG);
    txt(this.sixG,x6-14,y6-28,`n° 6 : ${AA3[A_HBS.aN]} → ${AA3[A_HBS.aM]}`,'t-lab2 s-a');
    this.sixCap=txt(this.ch,500,640,'Un seul maillon diffère entre l’hémoglobine normale et l’hémoglobine S.','t-lab s-ink','middle');
    /* les lettres du gène : elles s'écrivent une à une */
    this.gr=E('g',{},g);
    txt(this.gr,500,92,`La partie du gène qui code la chaîne β : ${CDS.length} lettres`,'t-lab2 s-ink','middle');
    const cols=37;this.lt=CDS.split('').map((b,i)=>E('text',{x:131+(i%cols)*20.5,y:156+Math.floor(i/cols)*36,class:'mono t-tick s-dim','text-anchor':'middle',text:b},this.gr));
    this.grCap=txt(this.gr,500,620,'Quatre lettres seulement : A, T, G, C.','t-lab s-dim','middle');
  },
  render(){
    const p=this.p,m=p.morph,R=150,path=croissant(R,lerp(2*R,.5*R,m));
    [this.pN,this.pNk,this.pS,this.pSk].forEach(e=>e.setAttribute('d',path));
    this.inner.setAttribute('transform',`rotate(${(-18*m).toFixed(1)}) scale(${(1+.35*m).toFixed(3)} ${(1-.22*m).toFixed(3)})`);
    show(this.pN,1-m);show(this.pNk,1-m);show(this.dim,(1-m)*.55);show(this.pS,m);show(this.pSk,m);
    show(this.cg,p.cell);show(this.capN,p.cell*(1-m));show(this.capS,p.cell*m);show(this.capD,p.cell);
    show(this.gl,p.gl);this.bandS.setAttribute('y',(170+250*p.gel).toFixed(1));this.bandM.setAttribute('y',(170+150*p.gel).toFixed(1));
    show(this.ch,p.chainV);this.line.style.strokeDashoffset=1000*(1-p.chain);
    this.beads.forEach((b,i)=>{b.style.opacity=clamp(p.chain*L_MURE-i,0,1);});
    show(this.sixG,p.six);show(this.sixCap,p.six);
    show(this.gr,clamp(p.grid*8,0,1));const n=p.grid*CDS.length;this.lt.forEach((t,i)=>{t.style.opacity=clamp(n-i,0,1);});show(this.grCap,clamp(p.grid*3-2,0,1));
  }
});

/* ---------- 2. les acteurs : noyau, cytoplasme, ribosomes, messager ---------- */
scene('cell',{
  p:{on:0,cyto:0,ribo:0,q:0,msg:0,names:0},
  build(g){
    this.base=E('g',{},g);
    this.cy=E('rect',{x:40,y:52,width:920,height:560,rx:80,class:'reg f-c'},this.base);
    E('rect',{x:40,y:52,width:920,height:560,rx:80,class:'k-ink nofill','stroke-width':2},this.base);
    txt(this.base,930,594,'un futur globule rouge (schéma)','t-lab s-dim','end');
    E('circle',{cx:290,cy:330,r:200,class:'reg f-b'},this.base);
    E('circle',{cx:290,cy:330,r:200,class:'k-ink nofill','stroke-width':2,'stroke-dasharray':'52 12'},this.base);
    txt(this.base,290,176,'noyau','t-lab2 s-ink','middle');
    const dna=E('g',{},this.base),Y=(x,s)=>(320+s*26*Math.sin((x-160)/22)).toFixed(1);let d1='',d2='';
    for(let x=160;x<=420;x+=4){d1+=(x>160?'L':'M')+x+' '+Y(x,1);d2+=(x>160?'L':'M')+x+' '+Y(x,-1);}
    for(let x=166;x<=416;x+=11)E('line',{x1:x,x2:x,y1:Y(x,1),y2:Y(x,-1),class:'k-line','stroke-width':2},dna);
    E('path',{d:d1,class:'k-ink nofill','stroke-width':3},dna);E('path',{d:d2,class:'k-ink nofill','stroke-width':3},dna);
    txt(this.base,290,398,'ADN : le gène est ici','t-lab2 s-ink','middle');
    txt(this.base,290,426,'il ne quitte pas le noyau','t-lab s-dim','middle');
    this.cyL=E('g',{},g);
    txt(this.cyL,720,116,'cytoplasme','t-lab2 s-ink','middle');
    txt(this.cyL,720,142,'tout l’intérieur de la cellule, hors du noyau','t-lab s-dim','middle');
    this.rg=E('g',{},g);
    [[620,222],[850,262],[690,504],[870,524]].forEach(([x,y])=>{E('ellipse',{cx:x,cy:y-12,rx:36,ry:20,class:'eg-trna'},this.rg);E('ellipse',{cx:x,cy:y+16,rx:28,ry:14,class:'eg-trna'},this.rg);});
    txt(this.rg,745,372,'ribosomes','t-lab2 s-ink','middle');
    txt(this.rg,745,398,'de petites machines','t-lab s-dim','middle');txt(this.rg,745,422,'qui fabriquent les protéines','t-lab s-dim','middle');
    this.qm=txt(g,560,352,'?','t-huge s-a','middle');
    this.msg=E('g',{},g);
    E('path',{d:'M-34 0q8.5 -11 17 0t17 0t17 0t17 0',class:'k-a nofill','stroke-width':4,'stroke-linecap':'round'},this.msg);
    txt(this.msg,0,-20,'ARNm','t-lab2 s-a','middle');
    this.P=[[352,262],[478,262],[534,240]];
    this.nm1=E('g',{},g);this.nm2=E('g',{},g);
    txt(this.nm1,330,248,'transcription','t-lab2 s-a','middle');
    txt(this.nm2,745,336,'traduction','t-lab2 s-a','middle');
    const yb=670;
    txt(this.nm1,215,yb,'ADN','t-big2 s-ink','middle');
    E('line',{x1:268,x2:398,y1:yb-10,y2:yb-10,class:'k-ink','stroke-width':2,'marker-end':'url(#arw)'},this.nm1);
    txt(this.nm1,333,yb-24,'transcription','t-tiny s-a','middle');
    txt(this.nm1,470,yb,'ARNm','t-big2 s-ink','middle');
    E('line',{x1:536,x2:666,y1:yb-10,y2:yb-10,class:'k-ink','stroke-width':2,'marker-end':'url(#arw)'},this.nm2);
    txt(this.nm2,601,yb-24,'traduction','t-tiny s-a','middle');
    txt(this.nm2,770,yb,'protéine','t-big2 s-ink','middle');
  },
  render(){
    const p=this.p;show(this.base,p.on);show(this.cy,p.cyto);show(this.cyL,p.cyto);show(this.rg,p.ribo);show(this.qm,p.q*(1-p.msg));
    const t=p.msg,P=this.P,s=t<.55?t/.55:(t-.55)/.45,a=t<.55?P[0]:P[1],b=t<.55?P[1]:P[2];
    this.msg.setAttribute('transform',`translate(${lerp(a[0],b[0],s).toFixed(1)} ${lerp(a[1],b[1],s).toFixed(1)})`);
    show(this.msg,clamp(t*4,0,1));show(this.nm1,clamp(p.names,0,1));show(this.nm2,clamp(p.names-1,0,1));
  }
});
}
