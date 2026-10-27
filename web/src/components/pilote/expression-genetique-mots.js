/* eslint-disable */
// @ts-nocheck
/**
 * Les fiches de mots de la leçon « Du gène à la protéine » (G9 : chaque mot technique s'explique
 * à sa première apparition). Une fiche = un titre, une définition au niveau du 2ᵉ Bac, et souvent
 * une petite figure. Les figures n'emploient que les classes de `pilote.css` (jetons) : aucune
 * couleur écrite à la main. Le vocabulaire est celui du bac : nucléotide, triplet, codon, codon
 * d'initiation, codon stop (non-sens), liaison peptidique, initiation / élongation / terminaison.
 *
 * Les nombres et les séquences affichés sont calculés (expression-genetique-code.js).
 */
import {NORMAL,L_MURE,AA3,N_SENS,STOPS,TR_COD,CODONS,CODE,A_HBS,A_SIL,A_NS6,anticodon,toARN} from "./expression-genetique-code";

/* ---------- petits outils de dessin (chaînes SVG) ---------- */
const sv=(w,h,label,inner)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" focusable="false">${inner}</svg>`;
const ty=s=>String(s).replace(/ ([?!;:»])/g,' $1').replace(/« /g,'« ');   // la typographie du noyau, pour les textes des figures
const T=(x,y,s,cls='s-ink',o={})=>`<text x="${x}" y="${y}" class="${cls}" font-size="${o.size||14}"${o.anchor?` text-anchor="${o.anchor}"`:''}${o.bold?' font-weight="700"':''}>${ty(s)}</text>`;
const CI=(cx,cy,r,cls)=>`<circle cx="${cx}" cy="${cy}" r="${r}" class="${cls}"/>`;
const LI=(x1,y1,x2,y2,cls='k-ink',w=2,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" stroke-width="${w}"${extra}/>`;
const ARW='<defs><marker id="fig-arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="s-dim"/></marker></defs>';
const FL='marker-end="url(#fig-arw)"';

/** Un croissant (la faucille) : disque de rayon R dont on a rongé un côté ; d = écart des deux centres. */
export function croissant(R,d){
  if(d>=2*R-.5)return `M${-R} 0a${R} ${R} 0 1 0 ${2*R} 0a${R} ${R} 0 1 0 ${-2*R} 0Z`;
  const xi=d/2,yi=Math.sqrt(R*R-xi*xi);
  return `M${xi.toFixed(1)} ${(-yi).toFixed(1)}A${R} ${R} 0 1 0 ${xi.toFixed(1)} ${yi.toFixed(1)}A${R} ${R} 0 0 1 ${xi.toFixed(1)} ${(-yi).toFixed(1)}Z`;}

/** Les positions d'une chaîne repliée : un anneau ondulé de n perles. */
export function repli(i,n,cx,cy,R){
  const th=2*Math.PI*(i/n)*1.0-Math.PI/2,r=R*(1+.24*Math.sin(i*1.9+.7));
  return [cx+r*Math.cos(th)*1.12,cy+r*Math.sin(th)*.92];}
/** Un nucléotide dessiné : phosphate (rond), sucre (pentagone), base (rectangle). */
export function pentagone(cx,cy,r){let d='';for(let k=0;k<5;k++){const a=-Math.PI/2+k*2*Math.PI/5;d+=(k?'L':'M')+(cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1);}return d+'Z';}
const anneau=(cx,cy,R,n,rb,cls)=>{let s='';for(let i=0;i<n;i++){const[x,y]=repli(i,n,cx,cy,R);s+=CI(x.toFixed(1),y.toFixed(1),rb,cls);}return s;};
const helice=(x0,x1,y,amp,per)=>{let a='',b='',rungs='';for(let x=x0;x<=x1;x+=3){const dy=amp*Math.sin((x-x0)/per);a+=(x>x0?'L':'M')+x+' '+(y+dy).toFixed(1);b+=(x>x0?'L':'M')+x+' '+(y-dy).toFixed(1);}
  for(let x=x0+6;x<=x1;x+=9){const dy=amp*Math.sin((x-x0)/per);rungs+=LI(x,(y+dy).toFixed(1),x,(y-dy).toFixed(1),'k-line',1.5);}
  return rungs+`<path d="${a}" class="k-ink nofill" stroke-width="2.5"/><path d="${b}" class="k-ink nofill" stroke-width="2.5"/>`;};
/** Un chromosome : une chromatide (bâtonnet), ou deux chromatides reliées (le X). */
const chromatide=(x,y,h,rot=0)=>`<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-7" y="${-h/2}" width="14" height="${h}" rx="7" class="cell"/><rect x="-7" y="${-h/2}" width="14" height="${h}" rx="7" class="k-ink nofill" stroke-width="2"/></g>`;

/* ---------- les figures ---------- */
const AA4=NORMAL.aa.slice(1,5).map(a=>AA3[a]);
/** Un codon qui change : les trois bases avant et après (la base touchée en rouge), puis l'acide aminé avant et après. */
const exemple=(A,label)=>{const cN=toARN(A.cN),cM=toARN(A.cM),aN=AA3[A.aN],aM=A.aM==='*'?'stop':AA3[A.aM],diff=A.aN!==A.aM;
  const bl=(c,x0,ref)=>c.split('').map((b,i)=>T(x0+i*30,42,b,b!==ref[i]?'s-a':'s-ink',{anchor:'middle',bold:1,size:28})).join('');
  return sv(320,104,label,bl(cN,44,cN)+`<line x1="146" y1="34" x2="184" y2="34" class="k-dim" stroke-width="2" ${FL}/>${ARW}`+bl(cM,236,cN)
    +T(74,84,aN,'s-ink',{anchor:'middle',bold:1,size:16})+T(266,84,aM,diff?'s-a':'s-ink',{anchor:'middle',bold:1,size:16}));};
const LEU=CODONS.filter(c=>CODE[c]==='L');
const FIG={
  globule:sv(320,110,'Un globule rouge : un disque creux au centre',
    `<ellipse cx="70" cy="55" rx="46" ry="46" class="reg f-b"/><ellipse cx="70" cy="55" rx="46" ry="46" class="k-ink nofill" stroke-width="2.5"/><ellipse cx="70" cy="55" rx="19" ry="19" class="s-bg"/>`
    +T(136,48,'globule rouge','s-ink',{bold:1,size:16})+T(136,70,'disque creux au centre,','s-dim')+T(136,88,'plein d’hémoglobine','s-dim')),
  drepanocytose:sv(320,110,'Un globule rouge sain devient une faucille',
    `<ellipse cx="62" cy="55" rx="40" ry="40" class="reg f-b"/><ellipse cx="62" cy="55" rx="40" ry="40" class="k-ink nofill" stroke-width="2.5"/>`
    +`<line x1="116" y1="55" x2="170" y2="55" class="k-dim" stroke-width="2" ${FL}/>${ARW}`
    +`<g transform="translate(246 55) rotate(-18) scale(1.15 .8)"><path d="${croissant(40,20)}" class="reg f-a"/><path d="${croissant(40,20)}" class="k-a nofill" stroke-width="2.5"/></g>`
    +T(62,108,'sain','s-dim',{anchor:'middle',size:13})+T(246,108,'en faucille','s-a',{anchor:'middle',size:13})),
  proteine:sv(320,116,'Une chaîne d’acides aminés qui se replie',
    LI(24,50,24+4*28,50,'k-ink',2)+[0,1,2,3,4].map(i=>CI(24+i*28,50,11,'eg-trna')).join('')
    +`<line x1="158" y1="50" x2="190" y2="50" class="k-dim" stroke-width="2" ${FL}/>${ARW}`
    +anneau(250,50,30,12,7,'eg-trna')
    +T(80,96,'une chaîne','s-dim',{anchor:'middle',size:13})+T(250,108,'repliée : une forme','s-dim',{anchor:'middle',size:13})),
  'acide-amine':sv(320,112,'Des acides aminés, maillons d’une chaîne',
    LI(28,40,28+3*72,40,'k-ink',2)+AA4.map((n,i)=>CI(28+i*72,40,22,'eg-trna')+T(28+i*72,45,n,'s-ink',{anchor:'middle',bold:1,size:14})).join('')
    +T(160,92,'20 sortes, chacune avec son nom et son abréviation','s-dim',{anchor:'middle',size:13})),
  hemoglobine:sv(320,128,'L’hémoglobine : deux chaînes alpha et deux chaînes bêta',
    [[88,40,'α','s-ink','eg-bd'],[158,40,'β','s-a','eg-bd-x'],[88,92,'β','s-a','eg-bd-x'],[158,92,'α','s-ink','eg-bd']].map(([x,y,l,c,k])=>anneau(x,y,19,10,5,k==='eg-bd'?'eg-trna':'eg-bd eg-bd-x')+T(x,y+5,l,c,{anchor:'middle',bold:1,size:16})).join('')
    +T(204,52,'2 chaînes α','s-ink',{bold:1,size:14})+T(204,76,'2 chaînes β','s-a',{bold:1,size:14})+T(204,100,'= 4 chaînes','s-dim',{size:13})),
  chaine:sv(320,110,'La chaîne bêta, un collier de perles',
    LI(20,48,300,48,'k-line',2)+[...Array(14)].map((_,i)=>CI(30+i*20,48,8,i===5?'s-a':'eg-bd eg-bd-x')).join('')
    +T(160,92,`${L_MURE} acides aminés, en une seule chaîne`,'s-dim',{anchor:'middle',size:13})),
  noyau:sv(320,120,'Le noyau, qui contient l’ADN',
    `<circle cx="80" cy="60" r="48" class="reg f-b"/><circle cx="80" cy="60" r="48" class="k-ink nofill" stroke-width="2" stroke-dasharray="26 7"/>`
    +helice(52,108,60,12,9)+T(160,54,'noyau','s-ink',{bold:1,size:16})+T(160,76,'enveloppe percée de pores','s-dim')+T(160,94,'ADN à l’intérieur','s-dim')),
  chromosome:sv(320,128,'Un chromosome non dupliqué (une chromatide) et un chromosome dupliqué (deux chromatides)',
    chromatide(52,58,84)+T(52,120,'non dupliqué','s-dim',{anchor:'middle',size:12})
    +chromatide(132,58,84,-14)+chromatide(150,58,84,14)+`<circle cx="141" cy="58" r="6" class="s-ink"/>`+T(141,120,'dupliqué','s-dim',{anchor:'middle',size:12})
    +T(196,40,'1 chromatide :','s-ink',{bold:1,size:13})+T(196,58,'1 molécule d’ADN','s-dim',{size:13})
    +T(196,84,'2 chromatides :','s-ink',{bold:1,size:13})+T(196,102,'2 molécules d’ADN','s-dim',{size:13})),
  adn:sv(320,110,'L’ADN : une double hélice',
    helice(14,190,54,24,14)+T(206,40,'deux brins de','s-ink',{bold:1,size:15})+T(206,60,'nucléotides','s-ink',{bold:1,size:15})+T(206,84,'bases : A, T, G, C','s-dim',{size:13})),
  nucleotide:sv(320,118,'Un nucléotide : un phosphate, un sucre et une base',
    CI(40,52,18,'eg-trna')+T(40,57,'P','s-ink',{anchor:'middle',bold:1,size:15})+LI(58,52,82,52,'k-ink',2)
    +`<path d="${pentagone(110,54,26)}" class="eg-trna"/>`+LI(136,52,164,52,'k-ink',2)
    +`<rect x="164" y="30" width="58" height="44" rx="3" class="cell"/>`+T(193,60,'A','s-ink',{anchor:'middle',bold:1,size:22})
    +T(40,100,'phosphate','s-dim',{anchor:'middle',size:12})+T(110,100,'sucre','s-dim',{anchor:'middle',size:12})+T(193,100,'base','s-dim',{anchor:'middle',size:12})
    +T(236,48,'1 nucléotide','s-ink',{bold:1,size:14})+T(236,68,'= 1 « lettre »','s-dim',{size:13})),
  gene:sv(320,120,'Un gène est un segment d’ADN',
    `<rect x="14" y="34" width="292" height="26" rx="3" class="cell"/><rect x="104" y="34" width="86" height="26" class="reg f-a"/><rect x="104" y="34" width="86" height="26" class="k-a nofill" stroke-width="2.5"/>`
    +`<path d="M104 70v8H190v-8" class="k-a nofill" stroke-width="2"/>`
    +T(147,100,'un gène','s-a',{anchor:'middle',bold:1,size:15})+T(160,22,'un segment de l’ADN d’un chromosome','s-dim',{anchor:'middle',size:13})),
  base:sv(320,108,'Les quatre bases de l’ADN : A, T, G, C',
    [['A','adénine'],['T','thymine'],['G','guanine'],['C','cytosine']].map(([b,n],i)=>`<rect x="${14+i*76}" y="14" width="64" height="52" rx="3" class="cell"/>`+T(46+i*76,50,b,'s-ink',{anchor:'middle',bold:1,size:30})+T(46+i*76,86,n,'s-dim',{anchor:'middle',size:13})).join('')),
  sens:sv(320,112,'Un brin a un sens, de 5 prime vers 3 prime',
    ARW+LI(40,34,282,34,'k-ink',3,` ${FL}`)+T(22,39,'5′','s-ink',{anchor:'middle',bold:1,size:15})+T(300,39,'3′','s-ink',{anchor:'middle',bold:1,size:15})
    +LI(278,76,38,76,'k-dim',3,` ${FL}`)+T(298,81,'5′','s-ink',{anchor:'middle',bold:1,size:15})+T(20,81,'3′','s-ink',{anchor:'middle',bold:1,size:15})
    +T(160,18,'un brin','s-dim',{anchor:'middle',size:13})+T(160,102,'l’autre brin, en sens inverse','s-dim',{anchor:'middle',size:13})),
  codon:sv(320,100,'Un codon : trois nucléotides de l’ARNm',
    ['A','U','G'].map((b,i)=>T(46+i*34,44,b,'s-ink',{anchor:'middle',bold:1,size:28})).join('')+`<path d="M28 56v8H116v-8" class="k-a nofill" stroke-width="2"/>`
    +T(72,86,'un codon','s-a',{anchor:'middle',bold:1,size:14})
    +T(170,40,'3 nucléotides','s-ink',{bold:1,size:15})+T(170,62,'= 1 acide aminé','s-dim',{size:13})),
  anticodon:sv(320,128,'Le codon et l’anticodon s’apparient',
    T(14,30,'ARNm','s-dim',{size:13})+['A','U','G'].map((b,i)=>T(110+i*34,34,b,'s-ink',{anchor:'middle',bold:1,size:26})).join('')
    +[0,1,2].map(i=>LI(110+i*34,42,110+i*34,66,'k-ink',2)).join('')
    +T(14,98,'ARNt','s-dim',{size:13})+anticodon('AUG').split('').map((b,i)=>T(110+i*34,92,b,'s-a',{anchor:'middle',bold:1,size:26})).join('')
    +T(236,34,'codon','s-ink',{bold:1,size:15})+T(236,98,'anticodon','s-a',{bold:1,size:15})),
  arnt:sv(320,132,'Un ARN de transfert : un acide aminé d’un côté, un anticodon de l’autre',
    CI(70,22,16,'eg-trna')+T(70,27,'Met','s-ink',{anchor:'middle',bold:1,size:13})+LI(70,38,70,50,'k-ink',2)
    +`<rect x="38" y="50" width="64" height="48" rx="8" class="eg-trna"/>`+T(70,80,'ARNt','s-dim',{anchor:'middle',size:13})
    +anticodon('AUG').split('').map((b,i)=>T(46+i*24,120,b,'s-a',{anchor:'middle',bold:1,size:18})).join('')
    +T(132,26,'un acide aminé','s-ink',{size:14})+T(132,122,'un anticodon','s-a',{bold:1,size:14})),
  methionine:sv(320,100,'La méthionine, désignée par AUG',
    ['A','U','G'].map((b,i)=>T(46+i*34,40,b,'s-ink',{anchor:'middle',bold:1,size:28})).join('')+`<line x1="150" y1="30" x2="196" y2="30" class="k-dim" stroke-width="2" ${FL}/>${ARW}`
    +CI(236,30,24,'eg-trna')+T(236,36,'Met','s-ink',{anchor:'middle',bold:1,size:16})
    +T(160,84,'codon d’initiation → méthionine','s-dim',{anchor:'middle',size:13})),
  peptidique:sv(320,100,'Une liaison peptidique relie deux acides aminés',
    CI(90,40,24,'eg-trna')+T(90,46,'Met','s-ink',{anchor:'middle',bold:1,size:14})+LI(114,40,166,40,'k-a',4)+CI(190,40,24,'eg-trna')+T(190,46,'Val','s-ink',{anchor:'middle',bold:1,size:14})
    +T(140,86,'liaison peptidique','s-a',{anchor:'middle',bold:1,size:14})),
  sites:sv(320,124,'Le ribosome et ses deux sites, P et A',
    `<rect x="40" y="10" width="220" height="70" rx="26" class="rulebody"/>`
    +`<rect x="64" y="26" width="78" height="46" rx="8" class="s-bg"/><rect x="64" y="26" width="78" height="46" rx="8" class="k-ink nofill" stroke-width="1.5"/>`
    +`<rect x="158" y="26" width="78" height="46" rx="8" class="s-bg"/><rect x="158" y="26" width="78" height="46" rx="8" class="k-ink nofill" stroke-width="1.5"/>`
    +T(103,56,'site P','s-ink',{anchor:'middle',bold:1,size:14})+T(197,56,'site A','s-ink',{anchor:'middle',bold:1,size:14})
    +LI(20,92,300,92,'k-a',3)+T(160,116,'P : la chaîne en cours · A : l’ARNt qui arrive','s-dim',{anchor:'middle',size:12})),
  mutation:sv(320,112,'Une mutation : un nucléotide change dans l’ADN',
    TR_COD.slice(0,9).split('').map((b,i)=>T(26+i*30,40,i===4?'A':b,i===4?'s-a':'s-ink',{anchor:'middle',bold:1,size:24})).join('')
    +T(26+4*30,76,'↑','s-a',{anchor:'middle',bold:1,size:20})+T(26+4*30,96,`était ${TR_COD[4]}`,'s-dim',{anchor:'middle',size:13})),
  polymerase:sv(320,128,'L’ARN polymérase ouvre l’ADN, lit un brin et assemble l’ARN',
    `<path d="M8 62H92C112 62 118 44 140 44H212C234 44 240 62 262 62H312" class="k-ink nofill" stroke-width="2.5"/><path d="M8 78H92C112 78 118 96 140 96H212C234 96 240 78 262 78H312" class="k-ink nofill" stroke-width="2.5"/>`
    +`<rect x="118" y="30" width="116" height="80" rx="28" class="eg-enz"/><path d="M196 36Q232 6 312 12" class="k-a nofill" stroke-width="3"/>`
    +T(176,74,'enzyme','s-a',{anchor:'middle',bold:1,size:14})+T(160,124,'ouvre l’ADN, lit un brin, assemble l’ARN','s-dim',{anchor:'middle',size:12})),
  complementaire:sv(320,112,'Les deux brins sont complémentaires : A avec T, G avec C',
    ['A','T','G','C','A'].map((b,i)=>T(40+i*40,38,b,'s-ink',{anchor:'middle',bold:1,size:26})+LI(40+i*40,48,40+i*40,64,'k-dim',2)+T(40+i*40,92,{A:'T',T:'A',G:'C',C:'G'}[b],'s-ink',{anchor:'middle',bold:1,size:26})).join('')
    +T(214,40,'un brin','s-dim',{size:13})+T(214,92,'l’autre brin','s-dim',{size:13})),
  redondant:sv(320,126,`Plusieurs codons pour la leucine`,
    LEU.map((c,i)=>T(16+i*50,36,c,'s-ink',{bold:1,size:16})).join('')+LEU.map((c,i)=>LI(34+i*50,46,160,70,'k-line',1.5)).join('')
    +CI(160,86,18,'eg-trna')+T(160,91,AA3.L,'s-ink',{anchor:'middle',bold:1,size:14})+T(160,120,`${LEU.length} codons, 1 seul acide aminé`,'s-dim',{anchor:'middle',size:13})),
  'codon-stop':sv(320,100,'Les trois codons stop',
    STOPS.map((c,i)=>T(46+i*86,46,c,'s-a',{anchor:'middle',bold:1,size:26})).join('')+T(160,84,'aucun acide aminé : la lecture s’arrête','s-dim',{anchor:'middle',size:13})),
  substitution:exemple(A_HBS,'Un nucléotide remplacé par un autre'),
  'faux-sens':exemple(A_HBS,'Faux-sens : l’acide aminé change'),
  silencieuse:exemple(A_SIL,'Mutation silencieuse : l’acide aminé ne change pas'),
  'non-sens':exemple(A_NS6,'Non-sens : le codon devient un codon stop'),
  ribosome:sv(320,110,'Un ribosome, qui assemble les protéines',
    `<rect x="20" y="14" width="96" height="52" rx="22" class="rulebody"/><rect x="26" y="72" width="84" height="26" rx="12" class="rulebody"/>`
    +`<path d="M6 69h128" class="k-a nofill" stroke-width="3"/>`
    +T(150,44,'ribosome','s-ink',{bold:1,size:16})+T(150,66,'lit l’ARN messager','s-dim')+T(150,84,'et assemble la protéine','s-dim')),
  electrophorese:sv(320,128,'Deux hémoglobines n’avancent pas à la même vitesse',
    `<rect x="20" y="12" width="120" height="104" rx="4" class="reg f-c"/><rect x="38" y="16" width="30" height="7" class="k-ink nofill" stroke-width="1.5"/><rect x="92" y="16" width="30" height="7" class="k-ink nofill" stroke-width="1.5"/>`
    +`<rect x="38" y="84" width="30" height="9" rx="4" class="s-ink"/><rect x="92" y="58" width="30" height="9" rx="4" class="s-a"/>`
    +T(160,30,'pôle − (départ)','s-dim',{size:13})+T(160,112,'pôle + ','s-dim',{size:13})
    +T(160,62,'chaque molécule avance','s-ink',{bold:1,size:13})+T(160,80,'selon sa charge','s-ink',{bold:1,size:13})),
};

/* ---------- les mots ---------- */
export const mots={
  globule:{t:'globule rouge',d:'Cellule du sang, en forme de disque creux au centre. Remplie d’hémoglobine, elle transporte l’oxygène des poumons vers tous les organes. Adulte, elle n’a plus de noyau.',fig:FIG.globule},
  drepanocytose:{t:'drépanocytose',d:'Maladie héréditaire du sang. Chez les personnes atteintes, les globules rouges peuvent se déformer en faucille : ils se coincent dans les petits vaisseaux et sont détruits trop vite.',fig:FIG.drepanocytose},
  anemie:{t:'anémie',d:'Manque de globules rouges ou d’hémoglobine : le sang apporte moins d’oxygène aux organes, d’où fatigue et pâleur.'},
  proteine:{t:'protéine',d:'Molécule du vivant faite d’une ou plusieurs chaînes d’acides aminés repliées. Sa forme lui permet d’agir : transporter l’oxygène, couper un aliment, soutenir une cellule…',fig:FIG.proteine},
  'acide-amine':{t:'acide aminé',d:'Un des 20 « maillons » dont les protéines sont faites. Chacun a un nom (méthionine, valine, acide glutamique…) et une abréviation de trois lettres (Met, Val, Glu…). La cellule les reçoit de l’alimentation ou en fabrique certains.',fig:FIG['acide-amine']},
  hemoglobine:{t:'hémoglobine',d:'Protéine des globules rouges. Elle fixe l’oxygène dans les poumons et le libère dans les organes. Elle est faite de 4 chaînes : 2 chaînes α et 2 chaînes β.',fig:FIG.hemoglobine},
  chaine:{t:'chaîne β',d:`L’une des deux sortes de chaînes de l’hémoglobine (l’autre est la chaîne α). La chaîne β compte ${L_MURE} acides aminés.`,fig:FIG.chaine},
  noyau:{t:'noyau',d:'Compartiment de la cellule, délimité par une enveloppe percée de pores. Il contient l’ADN, rangé en chromosomes.',fig:FIG.noyau},
  chromosome:{t:'chromosome',d:'De l’ADN associé à des protéines, rangé dans le noyau. Non dupliqué, un chromosome est une seule chromatide : une molécule d’ADN. Avant une division, il est dupliqué : deux chromatides identiques, donc deux molécules d’ADN (la forme en X des photos). Une cellule humaine en contient 46 ; un spermatozoïde ou un ovule, 23.',fig:FIG.chromosome},
  adn:{t:'ADN',d:'Acide désoxyribonucléique : une molécule en double hélice, faite de deux brins. Chaque brin est une longue suite de nucléotides ; l’information génétique est écrite dans l’ordre de leurs bases (A, T, G, C).',fig:FIG.adn},
  nucleotide:{t:'nucléotide',d:'L’unité de l’ADN et de l’ARN : un phosphate, un sucre et une base. Dans l’ADN, le sucre est le désoxyribose et la base est A, T, G ou C. On parle souvent de « lettre » ; au bac, on écrit nucléotide.',fig:FIG.nucleotide},
  gene:{t:'gène',d:'Un segment d’ADN qui contient la recette d’une chaîne de protéine. Un chromosome en porte beaucoup. Celui de la chaîne β de l’hémoglobine s’appelle HBB.',fig:FIG.gene},
  allele:{t:'allèle',d:'Une version d’un même gène. Deux allèles d’un gène diffèrent par un ou quelques nucléotides. Pour la chaîne β : l’allèle normal, βA, et l’allèle de la drépanocytose, βS.'},
  electrophorese:{t:'électrophorèse',d:'Technique qui sépare des molécules dans un champ électrique, entre un pôle − et un pôle +. Une molécule chargée négativement avance vers le pôle + ; plus elle est chargée, plus elle avance vite.',fig:FIG.electrophorese},
  cytoplasme:{t:'cytoplasme',d:'Tout l’intérieur de la cellule, en dehors du noyau. C’est là que travaillent les ribosomes.'},
  ribosome:{t:'ribosome',d:'Petite machine du cytoplasme, faite de protéines et d’ARN. Elle lit l’ARN messager et assemble les acides aminés dans l’ordre qu’il indique. Elle ne fabrique pas les acides aminés : elle les relie.',fig:FIG.ribosome},
  arn:{t:'ARN',d:'Acide ribonucléique : comme l’ADN, une suite de nucléotides ; mais un seul brin, un autre sucre (le ribose au lieu du désoxyribose), et l’uracile (U) à la place de la thymine (T).'},
  arnm:{t:'ARN messager',d:'Copie d’un gène, faite d’ARN. Elle sort du noyau par un pore et porte le message du gène jusqu’aux ribosomes. On l’écrit ARNm.'},
  transcription:{t:'transcription',d:'Première étape : la copie d’un gène en ARN messager, par l’ARN polymérase. Elle se passe dans le noyau.'},
  traduction:{t:'traduction',d:'Seconde étape : la fabrication d’une protéine d’après l’ARN messager. Elle se passe dans le cytoplasme, sur les ribosomes, en trois phases : initiation, élongation, terminaison.'},
  base:{t:'base',d:'La partie d’un nucléotide qui change de l’un à l’autre : adénine (A), thymine (T), guanine (G) ou cytosine (C). Dans l’ARN, la thymine est remplacée par l’uracile (U).',fig:FIG.base},
  brin:{t:'brin',d:'Un des deux fils de la double hélice d’ADN : une longue suite de nucléotides.'},
  complementaire:{t:'complémentaire',d:'Chaque base a une partenaire : A avec T (ou U dans l’ARN), G avec C. Le brin complémentaire d’un brin est celui où chaque base est remplacée par sa partenaire.',fig:FIG.complementaire},
  sens:{t:'5′ et 3′',d:'Les deux bouts d’un brin ne se ressemblent pas : on les appelle 5′ (« cinq prime ») et 3′ (« trois prime »), d’après les numéros des atomes de carbone du sucre. Un brin a donc un sens, comme une flèche de 5′ vers 3′. Dans la double hélice, les deux brins sont en sens inverse.',fig:FIG.sens},
  enzyme:{t:'enzyme',d:'Protéine qui réalise une réaction chimique précise, et la rend rapide.'},
  polymerase:{t:'ARN polymérase',d:'L’enzyme qui fabrique l’ARN. Elle ouvre l’ADN, lit un brin, et assemble les nucléotides de l’ARN un à un, en face du brin lu.',fig:FIG.polymerase},
  'brin-transcrit':{t:'brin transcrit',d:'Celui des deux brins d’ADN qui sert de modèle : l’ARN polymérase le lit. L’autre brin s’appelle le brin non transcrit ; l’ARNm a la même séquence que lui, avec U à la place de T.'},
  triplet:{t:'triplet',d:'Un groupe de trois nucléotides qui se suivent. Sur l’ARNm, un triplet s’appelle un codon. Au bac, on numérote les triplets du document depuis le premier montré.'},
  codon:{t:'codon',d:'Trois nucléotides consécutifs de l’ARNm (un triplet). Chaque codon désigne un acide aminé, ou un arrêt.',fig:FIG.codon},
  code:{t:'code génétique',d:'La correspondance entre les codons et les acides aminés. Il est universel (le même chez les êtres vivants, à de rares exceptions près) et redondant. GUG signifie valine partout.'},
  redondant:{t:'code redondant',d:`${N_SENS} codons pour 20 acides aminés : plusieurs codons peuvent désigner le même acide aminé. L’inverse est faux : un codon désigne un seul acide aminé.`,fig:FIG.redondant},
  'codon-init':{t:'codon d’initiation',d:'AUG : la traduction commence toujours à ce codon. Il désigne la méthionine (Met).',fig:FIG.methionine},
  initiation:{t:'initiation',d:'Première phase de la traduction : le ribosome se fixe sur l’ARNm et se place au codon d’initiation AUG ; l’ARNt de la méthionine s’y apparie, au site P.'},
  elongation:{t:'élongation',d:'Deuxième phase de la traduction : un ARNt arrive au site A, une liaison peptidique relie son acide aminé à la chaîne, puis le ribosome avance d’un codon. Elle se répète codon après codon.'},
  terminaison:{t:'terminaison',d:'Dernière phase de la traduction : un codon stop arrive au site A. Aucun ARNt ne lui correspond : la chaîne est libérée et le ribosome se détache.'},
  sites:{t:'sites P et A',d:'Les deux places du ribosome où s’installent les ARNt. Au site P, l’ARNt qui tient la chaîne en cours ; au site A, l’ARNt qui arrive avec l’acide aminé suivant.',fig:FIG.sites},
  peptidique:{t:'liaison peptidique',d:'La liaison chimique qui relie deux acides aminés voisins dans une chaîne. Le ribosome en forme une à chaque codon lu.',fig:FIG.peptidique},
  arnt:{t:'ARN de transfert',d:'Petite molécule d’ARN qui fait le lien entre le message et la protéine. Un bout porte un acide aminé, l’autre bout porte un anticodon. On l’écrit ARNt.',fig:FIG.arnt},
  anticodon:{t:'anticodon',d:'Trois bases de l’ARNt, qui s’apparient avec les trois bases d’un codon : sous le codon AUG, l’anticodon UAC. L’anticodon est sur l’ARNt ; le codon est sur l’ARNm.',fig:FIG.anticodon},
  methionine:{t:'méthionine',d:'L’acide aminé désigné par le codon d’initiation AUG (abréviation Met). Toute chaîne commence par elle ; pour la chaîne β, elle est ensuite retirée.',fig:FIG.methionine},
  'codon-stop':{t:'codon stop',d:`${STOPS.join(', ')} : aucun acide aminé ne leur correspond (on les dit aussi non-sens). Quand l’un d’eux arrive au site A du ribosome, la traduction s’arrête et la chaîne est libérée.`,fig:FIG['codon-stop']},
  mutation:{t:'mutation',d:'Un changement de la séquence des nucléotides de l’ADN : un nucléotide remplacé (substitution), retiré (délétion) ou ajouté (insertion). Elle arrive par hasard : une erreur de copie de l’ADN, ou un agent comme les rayons UV.',fig:FIG.mutation},
  substitution:{t:'substitution',d:'Un nucléotide de l’ADN est remplacé par un autre. Un seul triplet est touché.',fig:FIG.substitution},
  deletion:{t:'délétion',d:'Un ou plusieurs nucléotides sont retirés de l’ADN. Si ce n’est pas un multiple de trois, tout le cadre de lecture se décale.'},
  insertion:{t:'insertion',d:'Un ou plusieurs nucléotides sont ajoutés dans l’ADN. Si ce n’est pas un multiple de trois, tout le cadre de lecture se décale.'},
  'faux-sens':{t:'faux-sens',d:'Mutation par substitution qui change l’acide aminé : le codon muté désigne un autre acide aminé.',fig:FIG['faux-sens']},
  silencieuse:{t:'mutation silencieuse',d:'Mutation qui ne change pas l’acide aminé, parce que le nouveau codon désigne le même (le code est redondant).',fig:FIG.silencieuse},
  'non-sens':{t:'non-sens',d:'Mutation qui transforme un codon d’acide aminé en codon stop : la chaîne est coupée trop tôt.',fig:FIG['non-sens']},
  decalage:{t:'décalage du cadre de lecture',d:'Quand un nucléotide est ajouté (insertion) ou retiré (délétion), tous les codons situés après sont découpés autrement : tous les acides aminés suivants changent, et un codon stop arrive souvent vite.'},
  caractere:{t:'caractère',d:'Ce qu’on observe chez une personne : la forme de ses globules rouges, la couleur de ses yeux… Il dépend des protéines fabriquées.'},
  thalassemie:{t:'β-thalassémie',d:'Maladie héréditaire du sang où la chaîne β de l’hémoglobine est absente ou en quantité insuffisante : les globules rouges manquent d’hémoglobine.'},
  hbs:{t:'hémoglobine S',d:'L’hémoglobine des personnes drépanocytaires (S comme sickle, « faucille » en anglais). Elle ne diffère de l’hémoglobine normale (HbA) que par un acide aminé de la chaîne β.'},
  'partie-codante':{t:'partie codante',d:'Les nucléotides d’un gène qui sont traduits en acides aminés, du codon d’initiation au codon stop. Le gène HBB compte aussi des parties non traduites, autour et au milieu.'},
};
