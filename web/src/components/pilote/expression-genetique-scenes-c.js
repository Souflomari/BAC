/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Du gène à la protéine », fin de leçon : du gène à la maladie
 * (trois échelles, puis le Maroc), la technique du bac, les trois questions,
 * le bilan.
 */
import {CDS,AA3,L_MURE,A_HBS,A_B,B39,BK,BN,BAC_N,BAC_M,compl,toARN,aaDe} from "./expression-genetique-code";
import {croissant} from "./expression-genetique-mots";

export function scenesC(ctx,QUIZ){
const {E,lerp,clamp,ty,show,scene}=ctx;
const txt=(parent,x,y,str,cls,anchor)=>E('text',{x,y,class:cls,'text-anchor':anchor||'start',text:ty(str)},parent);

/* ---------- 7. retour à l'énigme : trois échelles, puis le Maroc ---------- */
scene('levels',{
  p:{lv:1,m1:0,c1:0,o1:0,flow:0,map:0},
  build(g){
    this.L=E('g',{},g);
    const cols=[[180,'Échelle moléculaire',`hémoglobine S (${AA3[A_HBS.aM]} n° 6)`],[500,'Échelle cellulaire','le globule rouge'],[820,'Échelle de l’organisme','la personne']];
    this.colG=cols.map(([x,h,s])=>{const cg=E('g',{},this.L);txt(cg,x,96,h,'t-lab2 s-ink','middle');txt(cg,x,124,s,'t-lab s-dim','middle');return cg;});
    // moléculaire : des molécules qui s'alignent en fibre
    this.mol=[];const sc=[[110,190],[230,170],[150,270],[250,300],[100,360],[200,400],[260,440],[120,460]];
    sc.forEach((s,i)=>{const mg=E('g',{},this.colG[0]),f=[165+(i%2)*30,180+i*38];
      E('circle',{cx:0,cy:0,r:19,class:'eg-trna'},mg);E('circle',{cx:13,cy:-9,r:5,class:'s-a'},mg);this.mol.push({mg,s,f});});
    txt(this.colG[0],180,530,'sans oxygène, l’HbS','t-lab s-ink','middle');txt(this.colG[0],180,554,'s’assemble en fibres','t-lab s-ink','middle');
    // cellulaire
    const cell=E('g',{transform:'translate(500 310) rotate(-18) scale(1.3 .8)'},this.colG[1]);
    E('path',{d:croissant(100,50),class:'reg f-a'},cell);E('path',{d:croissant(100,50),class:'k-a nofill','stroke-width':2.5},cell);
    for(let k=-1;k<=1;k++)E('line',{x1:-80,x2:-30,y1:k*34-10,y2:k*34+14,class:'k-a','stroke-width':2},cell);
    txt(this.colG[1],500,530,'les fibres déforment','t-lab s-ink','middle');txt(this.colG[1],500,554,'le globule en faucille','t-lab s-ink','middle');
    // organisme : un petit vaisseau bouché
    const v=this.colG[2];
    E('path',{d:'M676 196C756 196 796 290 860 290H962',class:'k-ink nofill','stroke-width':2.5},v);
    E('path',{d:'M676 444C756 444 796 350 860 350H962',class:'k-ink nofill','stroke-width':2.5},v);
    [[838,320,0],[800,298,24],[800,344,-24],[760,321,8],[716,268,18],[722,380,-14]].forEach(([x,y,r])=>{const cg=E('g',{transform:`translate(${x} ${y}) rotate(${r}) scale(.3 .2)`},v);E('path',{d:croissant(100,50),class:'reg f-a'},cg);E('path',{d:croissant(100,50),class:'k-a nofill','stroke-width':9},cg);});
    txt(v,912,276,'bouché','t-lab2 s-a','middle');
    txt(v,820,530,'vaisseaux bouchés : douleurs','t-lab s-ink','middle');txt(v,820,554,'globules détruits : anémie','t-lab s-ink','middle');
    this.fl=E('g',{},this.L);
    txt(this.fl,500,612,`allèle βS (${A_HBS.cM})  →  hémoglobine S  →  globule en faucille  →  drépanocytose`,'t-lab s-ink','middle');
    txt(this.fl,500,650,'gène  →  protéine  →  caractère','t-lab2 s-a','middle');
    // la carte du gène : allèles marocains
    this.M=E('g',{},g);const nC=CDS.length/3,bx=c=>80+(c+.5)*840/nC;
    txt(this.M,500,92,`Le gène de la chaîne β : ${nC} codons, du départ au stop`,'t-lab2 s-ink','middle');
    E('rect',{x:80,y:300,width:840,height:36,rx:3,class:'cell'},this.M);
    [[0,'départ'],[nC-1,'stop']].forEach(([c,t])=>txt(this.M,bx(c),362,t,'t-tiny s-dim','middle'));
    const x6=bx(6),x39=bx(B39);
    E('line',{x1:x6,x2:x6,y1:232,y2:300,class:'k-a','stroke-width':2.5},this.M);E('circle',{cx:x6,cy:318,r:6,class:'s-a'},this.M);
    txt(this.M,x6-12,172,'codon 6','t-lab2 s-ink');
    txt(this.M,x6-12,198,`${A_HBS.cN} → ${A_HBS.cM} : drépanocytose (βS)`,'t-lab s-ink');
    txt(this.M,x6-12,224,`un A en moins, FSC 6 (−A) : β-thalassémie`,'t-lab s-a');
    E('line',{x1:x39,x2:x39,y1:336,y2:404,class:'k-a','stroke-width':2.5},this.M);E('circle',{cx:x39,cy:318,r:6,class:'s-a'},this.M);
    txt(this.M,x39-12,432,`codon ${B39}`,'t-lab2 s-ink');
    txt(this.M,x39-12,458,`${A_B.cN} → ${A_B.cM} : un codon stop`,'t-lab s-ink');
    txt(this.M,x39-12,484,'β-thalassémie','t-lab s-a');
    txt(this.M,500,580,'Au Maroc, ces deux allèles comptent parmi les mutations de β-thalassémie les plus fréquentes.','t-lab s-ink','middle');
    txt(this.M,500,612,'Lemsaddek et al., 2004 · Agouti et al., 2008 · Belmokhtar et al., 2022','t-tiny s-dim','middle');
  },
  render(){
    const p=this.p;show(this.L,p.lv);
    show(this.colG[0],clamp(p.m1*3,0,1));show(this.colG[1],p.c1);show(this.colG[2],p.o1);show(this.fl,p.flow);
    this.mol.forEach(({mg,s,f})=>{mg.setAttribute('transform',`translate(${lerp(s[0],f[0],p.m1).toFixed(1)} ${lerp(s[1],f[1],p.m1).toFixed(1)})`);});
    show(this.M,p.map);
  }
});

/* ---------- 8. la technique : l'exercice type ---------- */
const XB=i=>330+i*34+Math.floor(i/3)*16,CXB=c=>XB(3*c+1);
scene('bac',{
  p:{doc:0,e1:0,e2:0,e3:0},
  build(g){
    const row=(par,y,lab,seq,ends,cls)=>{txt(par,64,y,lab,'t-lab s-ink');txt(par,300,y,ends[0],'t-tiny s-dim','middle');txt(par,902,y,ends[1],'t-tiny s-dim','middle');
      return seq.split('').map((b,i)=>E('text',{x:XB(i),y,class:'mono t-mid '+cls,'text-anchor':'middle',text:b},par));};
    this.d=E('g',{},g);
    E('rect',{x:40,y:40,width:920,height:236,rx:3,class:'rulebody'},this.d);
    const jc=B39-BK;
    this.r3=E('g',{},this.d);   // la bande du codon muté : au-dessus du fond du document, sous tous les textes
    E('rect',{x:XB(3*jc)-22,y:96,width:XB(3*jc+2)-XB(3*jc)+44,height:444,rx:4,class:'reg f-a'},this.r3);
    txt(this.d,64,76,'Document — brin transcrit de l’allèle normal et de l’allèle muté','t-lab2 s-ink');
    for(let c=0;c<BN;c++)txt(this.d,CXB(c),118,String(BK+c),'t-tiny s-dim','middle');
    this.dN=row(this.d,166,'allèle normal',compl(BAC_N),['3′','5′'],'s-ink');
    this.dM=row(this.d,236,'allèle muté',compl(BAC_M),['3′','5′'],'s-ink');
    this.r1=E('g',{},g);
    this.aN=row(this.r1,344,'ARNm normal',toARN(BAC_N),['5′','3′'],'s-ink');
    this.aM=row(this.r1,392,'ARNm muté',toARN(BAC_M),['5′','3′'],'s-ink');
    this.r2=E('g',{},g);
    const trN=[],trM=[];let stopped=false;
    for(let c=0;c<BN;c++){const a=aaDe(BAC_N.slice(3*c,3*c+3));trN.push(a);const b=stopped?null:aaDe(BAC_M.slice(3*c,3*c+3));if(b==='*')stopped=true;trM.push(b===undefined?null:b);}
    txt(this.r2,64,474,'chaîne normale','t-lab s-ink');txt(this.r2,64,522,'chaîne mutée','t-lab s-ink');
    this.cN=trN.map((a,c)=>txt(this.r2,CXB(c),474,AA3[a],'t-lab2 s-ink','middle'));
    let seenStop=false;this.cM=trM.map((a,c)=>{let t,cl='t-lab2 s-ink';if(seenStop){t='·';cl='t-lab2 s-dim';}else if(a==='*'){t='Stop';cl='t-lab2 s-a';seenStop=true;}else t=AA3[a];return txt(this.r2,CXB(c),522,t,cl,'middle');});
    this.v=E('g',{},g);
    txt(this.v,500,600,`Substitution · non-sens au codon ${B39}`,'t-big2 s-ink','middle');
    txt(this.v,500,640,`Chaîne arrêtée après ${A_B.len} acides aminés au lieu de ${L_MURE} : β-thalassémie`,'t-lab s-ink','middle');
    this.hot=[this.dN,this.dM,this.aN,this.aM].map(r=>r[3*jc]);
  },
  render(){const p=this.p;show(this.d,p.doc);
    // l'ARNm s'écrit lettre après lettre, puis la chaîne maillon après maillon
    show(this.r1,clamp(p.e1*15,0,1));this.aN.forEach((t,i)=>{const o=clamp(p.e1*15-i,0,1);t.style.opacity=o;this.aM[i].style.opacity=o;});
    show(this.r2,clamp(p.e2*BN,0,1));this.cN.forEach((t,c)=>{const o=clamp(p.e2*BN-c,0,1);t.style.opacity=o;this.cM[c].style.opacity=o;});
    show(this.r3,p.e3);show(this.v,p.e3);
    this.hot.forEach(t=>t.setAttribute('class','mono t-mid '+(p.e3>.5?'s-a':'s-ink')));}
});

/* ---------- 9. vérification ---------- */
scene('quiz',{
  p:{qi:0,rv:0},
  build(g){
    this.tag=E('text',{x:500,y:170,class:'t-lab s-dim','text-anchor':'middle'},g);
    this.big=E('text',{x:500,y:300,class:'t-huge s-ink mono','text-anchor':'middle'},g);
    this.sub=E('text',{x:500,y:360,class:'t-lab2 s-dim','text-anchor':'middle'},g);
    this.r1=E('text',{x:500,y:460,class:'t-big2 s-a','text-anchor':'middle'},g);
    this.r2=E('text',{x:500,y:512,class:'t-big2 s-a','text-anchor':'middle'},g);
  },
  render(){const q=QUIZ[Math.round(this.p.qi)];this.tag.textContent=`Question ${Math.round(this.p.qi)+1} sur 3`;this.big.textContent=ty(q.big);this.sub.textContent=ty(q.sub);this.r1.textContent=ty(q.r1);this.r2.textContent=ty(q.r2);show(this.r1,this.p.rv);show(this.r2,clamp(this.p.rv*2-1,0,1));}
});

/* ---------- 10. ce que tu sais maintenant ---------- */
scene('end',{
  p:{n:0},
  build(g){
    txt(g,90,96,'Ce que tu as compris','t-lab s-dim');
    const I=[['Un gène est la recette d’une chaîne de protéine :','la transcription le copie en ARNm.'],['Le code se lit par codons de trois lettres,','de AUG jusqu’à un codon stop.'],['Le ribosome traduit codon par codon :','un anticodon, un acide aminé.'],['Une seule lettre peut changer la protéine :','silencieuse, faux-sens, non-sens, décalage.']];
    this.items=I.map((l,i)=>{const gg=E('g',{},g),y=180+i*128;E('text',{x:90,y:y+22,class:'mono t-num s-a',text:String(i+1)},gg);txt(gg,170,y,l[0],'t-big s-ink');txt(gg,170,y+42,l[1],'t-big s-dim');return gg;});
  },
  render(){this.items.forEach((g,i)=>{const o=clamp(this.p.n-i,0,1);g.style.opacity=o;g.setAttribute('transform',`translate(${((1-o)*-16).toFixed(1)} 0)`);});}
});
}
