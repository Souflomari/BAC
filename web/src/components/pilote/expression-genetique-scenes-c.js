/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Du gène à la protéine », fin de leçon : le schéma de la synthèse (repères à
 * légender), du gène à la maladie (trois échelles, puis le Maroc), l'exercice du bac, les trois
 * questions du bilan, ce que tu as compris.
 */
import {CDS,AA3,L_MURE,A_HBS,A_B,B39,BK,BN,BAC_N,BAC_M,B_TRIPLET,compl,toARN,aaDe} from "./expression-genetique-code";
import {croissant} from "./expression-genetique-mots";

/** Les repères du schéma de synthèse, dans l'ordre du chemin : la légende, et un indice qui ne la donne pas. */
export const REPERES=[
  {t:'transcription',i:'La flèche va de l’ADN à l’ARNm, dans le noyau : quelle étape ?'},
  {t:'ARNm',i:'Ce fil sort du noyau par un pore et porte le message du gène.'},
  {t:'ribosome',i:'La machine posée sur l’ARNm, dans le cytoplasme.'},
  {t:'ARNt',i:'Il apporte un acide aminé et porte un anticodon.'},
  {t:'liaison peptidique',i:'Ce qui relie deux acides aminés voisins de la chaîne.'},
  {t:'traduction',i:'Le passage de l’ARNm à la chaîne d’acides aminés, dans le cytoplasme.'}];

export function scenesC(ctx,QUIZ){
const {E,lerp,clamp,ty,show,scene}=ctx;
const txt=(parent,x,y,str,cls,anchor)=>E('text',{x,y,class:cls,'text-anchor':anchor||'start',text:ty(str)},parent);

/* ---------- 5. le schéma de la synthèse : six repères à légender ---------- */
scene('schema',{
  p:{on:0,pl:0,cur:1},
  build(g){
    txt(g,500,74,'La synthèse d’une protéine, en un schéma','t-titre s-ink','middle');
    // le noyau, son enveloppe percée de pores, l'ADN
    E('circle',{cx:250,cy:340,r:170,class:'reg f-b'},g);
    E('circle',{cx:250,cy:340,r:170,class:'k-ink nofill','stroke-width':2,'stroke-dasharray':'44 12'},g);
    txt(g,250,206,'noyau','t-sous','middle');
    const Y=(x,s)=>(286+s*12*Math.sin((x-140)/14)).toFixed(1);let d1='',d2='';
    for(let x=140;x<=360;x+=4){d1+=(x>140?'L':'M')+x+' '+Y(x,1);d2+=(x>140?'L':'M')+x+' '+Y(x,-1);}
    for(let x=146;x<=356;x+=10)E('line',{x1:x,x2:x,y1:Y(x,1),y2:Y(x,-1),class:'k-line','stroke-width':1.5},g);
    E('path',{d:d1,class:'k-ink nofill','stroke-width':2.5},g);E('path',{d:d2,class:'k-ink nofill','stroke-width':2.5},g);
    txt(g,250,256,'ADN','t-sous','middle');
    E('line',{x1:250,x2:250,y1:306,y2:364,class:'k-ink','stroke-width':2.5,'marker-end':'url(#arw)'},g);
    // l'ARNm : il sort par un pore et rejoint le ribosome
    let m='M168 392';for(let x=168;x<404;x+=16)m+=`q4 -8 8 0t8 0`;m+='L540 470H930';
    E('path',{d:m,class:'k-a nofill','stroke-width':3.5,'stroke-linecap':'round'},g);
    txt(g,720,170,'cytoplasme','t-sous','middle');
    // le ribosome, ses deux sous-unités, un ARNt au site A
    E('rect',{x:640,y:378,width:184,height:84,rx:30,class:'rulebody'},g);
    E('rect',{x:652,y:478,width:160,height:40,rx:18,class:'rulebody'},g);
    E('rect',{x:752,y:392,width:44,height:62,rx:8,class:'eg-trna'},g);
    E('line',{x1:774,x2:774,y1:372,y2:392,class:'k-ink','stroke-width':2},g);
    E('circle',{cx:774,cy:356,r:16,class:'eg-trna'},g);
    // la chaîne d'acides aminés, qui sort du ribosome
    const B=[[690,342],[648,300],[606,262],[564,226]];
    B.forEach(([x,y],i)=>{if(i){const[a,b]=B[i-1];E('line',{x1:a,y1:b,x2:x,y2:y,class:'k-ink','stroke-width':2.5},g);}});
    E('line',{x1:690,y1:342,x2:774,y2:356,class:'k-ink','stroke-width':2.5},g);
    B.forEach(([x,y])=>E('circle',{cx:x,cy:y,r:16,class:'eg-trna'},g));
    // le sens de la traduction
    E('line',{x1:600,x2:900,y1:566,y2:566,class:'k-ink','stroke-width':2.5,'marker-end':'url(#arw)'},g);
    /* les six repères : un rond numéroté, et sa légende une fois placée */
    // [repère x, y, légende x, y, ancrage, cible d'un trait de rappel (facultatif)]
    const R=[[226,336,204,342,'end'],[488,420,510,412,'start'],[850,524,872,530,'start'],[846,424,868,430,'start',[800,423]],[690,262,712,268,'start',[630,280]],[574,610,596,616,'start']];
    this.rep=R.map(([x,y,lx,ly,an,cible],i)=>{const rg=E('g',{},g);
      if(cible)E('line',{x1:x-(x-cible[0])*17/Math.hypot(x-cible[0],y-cible[1]),y1:y-(y-cible[1])*17/Math.hypot(x-cible[0],y-cible[1]),x2:cible[0],y2:cible[1],class:'k-dim','stroke-width':1.5,'stroke-dasharray':'3 3'},rg);
      const ring=E('circle',{cx:x,cy:y,r:17,class:'eg-trna'},rg);
      E('text',{x,y:y+6,class:'eg-l16 s-ink','text-anchor':'middle','font-weight':700,text:String(i+1)},rg);
      const lab=txt(rg,lx,ly,REPERES[i].t,'t-titre s-ink',an);return {ring,lab};});
  },
  render(){
    const p=this.p;
    this.rep.forEach(({ring,lab},i)=>{const fait=i<p.pl,actif=i===p.pl&&p.on>.5;
      ring.setAttribute('class',actif?'eg-rep-on':'eg-trna');show(lab,fait?1:0);});
  }
});

/* ---------- 7. retour à l'énigme : trois échelles, puis le Maroc ---------- */
scene('levels',{
  p:{lv:1,m1:0,c1:0,o1:0,flow:0,map:0},
  build(g){
    this.L=E('g',{},g);
    const cols=[[180,'Échelle moléculaire',`hémoglobine S (${AA3[A_HBS.aM]} n° 6)`],[500,'Échelle cellulaire','le globule rouge'],[810,'Échelle de l’organisme','la personne']];
    this.colG=cols.map(([x,h,s])=>{const cg=E('g',{},this.L);txt(cg,x,96,h,'t-titre s-ink','middle');txt(cg,x,122,s,'t-sous','middle');return cg;});
    // moléculaire : des molécules qui s'alignent en fibre
    this.mol=[];const sc=[[110,190],[230,170],[150,270],[250,300],[100,360],[200,400],[260,440],[120,460]];
    sc.forEach((s,i)=>{const mg=E('g',{},this.colG[0]),f=[165+(i%2)*30,180+i*38];
      E('circle',{cx:0,cy:0,r:19,class:'eg-trna'},mg);E('circle',{cx:13,cy:-9,r:5,class:'s-ink'},mg);this.mol.push({mg,s,f});});
    txt(this.colG[0],180,530,'sans oxygène, l’HbS','t-sous','middle');txt(this.colG[0],180,554,'s’assemble en fibres','t-sous','middle');
    // cellulaire
    const cell=E('g',{transform:'translate(500 310) rotate(-18) scale(1.3 .8)'},this.colG[1]);
    E('path',{d:croissant(100,50),class:'reg f-a'},cell);E('path',{d:croissant(100,50),class:'k-a nofill','stroke-width':2.5},cell);
    for(let k=-1;k<=1;k++)E('line',{x1:-80,x2:-30,y1:k*34-10,y2:k*34+14,class:'k-ink','stroke-width':2},cell);
    txt(this.colG[1],500,530,'les fibres déforment','t-sous','middle');txt(this.colG[1],500,554,'le globule en faucille','t-sous','middle');
    // organisme : un petit vaisseau bouché
    const v=this.colG[2];
    E('path',{d:'M676 196C746 196 786 290 850 290H930',class:'k-ink nofill','stroke-width':2.5},v);
    E('path',{d:'M676 444C746 444 786 350 850 350H930',class:'k-ink nofill','stroke-width':2.5},v);
    [[828,320,0],[790,298,24],[790,344,-24],[750,321,8],[712,268,18],[718,380,-14]].forEach(([x,y,r])=>{const cg=E('g',{transform:`translate(${x} ${y}) rotate(${r}) scale(.3 .2)`},v);E('path',{d:croissant(100,50),class:'reg f-a'},cg);E('path',{d:croissant(100,50),class:'k-a nofill','stroke-width':9},cg);});
    txt(v,890,270,'bouché','t-titre s-ink','middle');
    txt(v,810,530,'vaisseaux bouchés : douleurs','t-sous','middle');txt(v,810,554,'globules détruits : anémie','t-sous','middle');
    this.fl=E('g',{},this.L);
    txt(this.fl,500,612,`allèle βS (${A_HBS.cM})  →  hémoglobine S  →  globule en faucille  →  drépanocytose`,'t-sous','middle');
    txt(this.fl,500,648,'gène  →  protéine  →  caractère','t-titre s-ink','middle');
    // la carte du gène : allèles marocains
    this.M=E('g',{},g);const nC=CDS.length/3,bx=c=>80+(c+.5)*840/nC;
    txt(this.M,500,92,'La partie codante du gène HBB, du codon d’initiation au codon stop','t-titre s-ink','middle');
    txt(this.M,500,118,'codons comptés depuis celui de Val, comme dans l’atelier','t-sous','middle');
    E('rect',{x:80,y:300,width:840,height:36,rx:3,class:'cell'},this.M);
    [[0,'AUG'],[nC-1,'stop']].forEach(([c,t])=>txt(this.M,bx(c),362,t,'t-sous','middle'));
    const x6=bx(6),x39=bx(B39);
    E('line',{x1:x6,x2:x6,y1:232,y2:300,class:'k-a','stroke-width':2.5},this.M);E('circle',{cx:x6,cy:318,r:7,class:'s-a'},this.M);
    txt(this.M,x6-12,172,'codon 6','t-titre s-ink');
    txt(this.M,x6-12,198,`${A_HBS.cN} → ${A_HBS.cM} : drépanocytose (βS)`,'t-sous');
    txt(this.M,x6-12,222,'un A en moins, FSC 6 (−A) : β-thalassémie','t-sous');
    E('line',{x1:x39,x2:x39,y1:336,y2:404,class:'k-a','stroke-width':2.5},this.M);E('circle',{cx:x39,cy:318,r:7,class:'s-a'},this.M);
    txt(this.M,x39-12,432,`codon ${B39}`,'t-titre s-ink');
    txt(this.M,x39-12,458,`${A_B.cN} → ${A_B.cM} : un codon stop`,'t-sous');
    txt(this.M,x39-12,482,'β-thalassémie','t-sous');
    txt(this.M,500,580,'Au Maroc, ces deux allèles comptent parmi les mutations de β-thalassémie les plus fréquentes.','t-sous','middle');
    txt(this.M,500,610,'Lemsaddek et al., 2004 · Agouti et al., 2008 · Belmokhtar et al., 2022','t-sous','middle');
  },
  render(){
    const p=this.p;show(this.L,p.lv);
    show(this.colG[0],clamp(p.m1*3,0,1));show(this.colG[1],p.c1);show(this.colG[2],p.o1);show(this.fl,p.flow);
    this.mol.forEach(({mg,s,f})=>{mg.setAttribute('transform',`translate(${lerp(s[0],f[0],p.m1).toFixed(1)} ${lerp(s[1],f[1],p.m1).toFixed(1)})`);});
    show(this.M,p.map);
  }
});

/* ---------- 8. l'exercice type : un document comme au bac (triplets numérotés depuis le premier montré) ---------- */
const XB=i=>330+i*34+Math.floor(i/3)*16,CXB=c=>XB(3*c+1);
scene('bac',{
  p:{doc:0,e1:0,e2:0,e3:0},
  build(g){
    const row=(par,y,lab,seq,ends,cls)=>{txt(par,64,y,lab,'t-sous');txt(par,XB(0)-28,y,ends[0],'t-sous','middle');txt(par,XB(14)+28,y,ends[1],'t-sous','middle');
      return seq.split('').map((b,i)=>E('text',{x:XB(i),y,class:'mono t-mid '+cls,'text-anchor':'middle',text:b},par));};
    this.d=E('g',{},g);
    E('rect',{x:44,y:44,width:912,height:232,rx:3,class:'rulebody'},this.d);
    const jc=B_TRIPLET-1;
    this.r3=E('g',{},g);   // la bande du triplet muté : au-dessus du fond du document, sous tous les textes
    E('rect',{x:XB(3*jc)-20,y:96,width:XB(3*jc+2)-XB(3*jc)+40,height:444,rx:4,class:'reg f-a'},this.r3);
    txt(this.d,64,78,'Document : fragment du brin transcrit, allèle normal et allèle muté','t-titre s-ink');
    txt(this.d,64,120,'n° du triplet','t-sous');
    for(let c=0;c<BN;c++)txt(this.d,CXB(c),120,String(c+1),'t-sous','middle');
    this.dN=row(this.d,170,'allèle normal',compl(BAC_N),['3′','5′'],'s-ink');
    this.dM=row(this.d,236,'allèle muté',compl(BAC_M),['3′','5′'],'s-ink');
    this.r1=E('g',{},g);
    this.aN=row(this.r1,342,'ARNm normal',toARN(BAC_N),['5′','3′'],'s-ink');
    this.aM=row(this.r1,392,'ARNm muté',toARN(BAC_M),['5′','3′'],'s-ink');
    this.r2=E('g',{},g);
    const trN=[],trM=[];let stopped=false;
    for(let c=0;c<BN;c++){const a=aaDe(BAC_N.slice(3*c,3*c+3));trN.push(a);const b=stopped?null:aaDe(BAC_M.slice(3*c,3*c+3));if(b==='*')stopped=true;trM.push(b===undefined?null:b);}
    txt(this.r2,64,474,'chaîne normale','t-sous');txt(this.r2,64,522,'chaîne mutée','t-sous');
    this.cN=trN.map((a,c)=>txt(this.r2,CXB(c),474,AA3[a],'t-titre s-ink','middle'));
    let seenStop=false;this.cM=trM.map((a,c)=>{let t,cl='t-titre s-ink';if(seenStop){t='·';cl='t-titre s-dim';}else if(a==='*'){t='Stop';cl='t-titre s-a';seenStop=true;}else t=AA3[a];return txt(this.r2,CXB(c),522,t,cl,'middle');});
    this.v=E('g',{},g);
    txt(this.v,500,600,`Substitution d’un nucléotide au triplet ${B_TRIPLET} : mutation non-sens`,'t-titre s-ink','middle');
    txt(this.v,500,632,'chaîne β raccourcie, donc non fonctionnelle : β-thalassémie','t-sous','middle');
    this.hot=[this.dN,this.dM,this.aN,this.aM].map(r=>r[3*jc]);
  },
  render(){const p=this.p;show(this.d,p.doc);
    // l'ARNm s'écrit nucléotide après nucléotide, puis la chaîne maillon après maillon
    show(this.r1,clamp(p.e1*15,0,1));this.aN.forEach((t,i)=>{const o=clamp(p.e1*15-i,0,1);t.style.opacity=o;this.aM[i].style.opacity=o;});
    show(this.r2,clamp(p.e2*BN,0,1));this.cN.forEach((t,c)=>{const o=clamp(p.e2*BN-c,0,1);t.style.opacity=o;this.cM[c].style.opacity=o;});
    show(this.r3,p.e3);show(this.v,p.e3);
    this.hot.forEach(t=>t.setAttribute('class','mono t-mid '+(p.e3>.5?'s-a':'s-ink')));}
});

/* ---------- 9. le bilan : trois pièges ---------- */
scene('quiz',{
  p:{qi:0,rv:0},
  build(g){
    this.tag=E('text',{x:500,y:170,class:'t-sous','text-anchor':'middle'},g);
    this.big=E('text',{x:500,y:290,class:'eg-l40 s-ink mono','text-anchor':'middle'},g);
    this.sub=E('text',{x:500,y:350,class:'t-titre s-ink','text-anchor':'middle'},g);
    this.r1=E('text',{x:500,y:450,class:'t-titre s-ink','text-anchor':'middle'},g);
    this.r2=E('text',{x:500,y:500,class:'eg-l40 s-a mono','text-anchor':'middle'},g);
  },
  render(){const q=QUIZ[Math.round(this.p.qi)];this.tag.textContent=`Piège ${Math.round(this.p.qi)+1} sur 3`;this.big.textContent=ty(q.big);this.sub.textContent=ty(q.sub);this.r1.textContent=ty(q.r1);this.r2.textContent=ty(q.r2);show(this.r1,this.p.rv);show(this.r2,clamp(this.p.rv*2-1,0,1));}
});

/* ---------- 10. ce que tu sais maintenant ---------- */
scene('end',{
  p:{n:0},
  build(g){
    txt(g,90,96,'Ce que tu as compris','t-titre s-ink');
    const I=[['Un gène est la recette d’une chaîne de protéine :','la transcription le copie en ARNm, dans le noyau.'],['Le code se lit par codons de trois nucléotides,','du codon d’initiation AUG jusqu’à un codon stop.'],['Le ribosome traduit codon par codon :','initiation, élongation, terminaison.'],['Un seul nucléotide peut changer la protéine :','silencieuse, faux-sens, non-sens, décalage.']];
    this.items=I.map((l,i)=>{const gg=E('g',{},g),y=180+i*124;E('text',{x:90,y:y+16,class:'t-cle s-ink',text:String(i+1)},gg);txt(gg,140,y,l[0],'eg-l20 s-ink');txt(gg,140,y+34,l[1],'eg-l20 s-dim');return gg;});
  },
  render(){this.items.forEach((g,i)=>{const o=clamp(this.p.n-i,0,1);g.style.opacity=o;g.setAttribute('transform',`translate(${((1-o)*-16).toFixed(1)} 0)`);});}
});
}
