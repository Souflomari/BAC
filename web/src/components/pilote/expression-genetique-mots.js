/* eslint-disable */
// @ts-nocheck
/**
 * Les fiches de mots de la leçon « Du gène à la protéine » (retour du
 * propriétaire, 2026-10-26, G9 : chaque mot technique s'explique à sa première
 * apparition). Une fiche = un titre, une définition au niveau du 2ᵉ Bac, et
 * souvent une petite figure. Les figures n'emploient que les classes de
 * `pilote.css` (jetons) : aucune couleur écrite à la main.
 *
 * Les nombres et les séquences affichés sont calculés (expression-genetique-code.js).
 */
import {NORMAL,L_MURE,AA3,N_SENS,STOPS,TR_COD,CODONS,CODE,A_HBS,A_SIL,A_NS6,anticodon,toARN} from "./expression-genetique-code";

/* ---------- petits outils de dessin (chaînes SVG) ---------- */
const sv=(w,h,label,inner)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" focusable="false">${inner}</svg>`;
const ty=s=>String(s).replace(/ ([?!;:»])/g,'\u202f$1').replace(/« /g,'«\u202f');   // la typographie du noyau, pour les textes des figures
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
const anneau=(cx,cy,R,n,rb,cls)=>{let s='';for(let i=0;i<n;i++){const[x,y]=repli(i,n,cx,cy,R);s+=CI(x.toFixed(1),y.toFixed(1),rb,cls);}return s;};
const helice=(x0,x1,y,amp,per)=>{let a='',b='',rungs='';for(let x=x0;x<=x1;x+=3){const dy=amp*Math.sin((x-x0)/per);a+=(x>x0?'L':'M')+x+' '+(y+dy).toFixed(1);b+=(x>x0?'L':'M')+x+' '+(y-dy).toFixed(1);}
  for(let x=x0+6;x<=x1;x+=9){const dy=amp*Math.sin((x-x0)/per);rungs+=LI(x,(y+dy).toFixed(1),x,(y-dy).toFixed(1),'k-line',1.5);}
  return rungs+`<path d="${a}" class="k-ink nofill" stroke-width="2.5"/><path d="${b}" class="k-ink nofill" stroke-width="2.5"/>`;};

/* ---------- les figures ---------- */
const AA4=NORMAL.aa.slice(0,4).map(a=>AA3[a]);
/** Un codon qui change : les trois lettres avant et après (la lettre touchée en rouge), puis l'acide aminé avant et après. */
const exemple=(A,label)=>{const cN=toARN(A.cN),cM=toARN(A.cM),aN=AA3[A.aN],aM=AA3[A.aM],diff=aN!==aM;
  const bl=(c,x0,ref)=>c.split('').map((b,i)=>T(x0+i*30,42,b,b!==ref[i]?'s-a':'s-ink',{anchor:'middle',bold:1,size:28})).join('');
  return sv(320,104,label,bl(cN,44,cN)+`<line x1="146" y1="34" x2="184" y2="34" class="k-dim" stroke-width="2" ${FL}/>${ARW}`+bl(cM,236,cN)
    +T(74,84,aN,'s-ink',{anchor:'middle',bold:1,size:16})+T(266,84,aM,diff?'s-a':'s-ink',{anchor:'middle',bold:1,size:16}));};
const LEU=CODONS.filter(c=>CODE[c]==='L');
const FIG={
  globule:sv(320,110,'Un globule rouge : un disque creux au centre',
    `<ellipse cx="70" cy="55" rx="46" ry="46" class="reg f-a"/><ellipse cx="70" cy="55" rx="46" ry="46" class="k-a nofill" stroke-width="2.5"/><ellipse cx="70" cy="55" rx="19" ry="19" class="reg f-b"/>`
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
    +helice(52,108,60,12,9)+T(160,54,'noyau','s-ink',{bold:1,size:16})+T(160,76,'enveloppe à pores','s-dim')+T(160,94,'ADN à l’intérieur','s-dim')),
  chromosome:sv(320,120,'Un chromosome : une très longue molécule d’ADN enroulée',
    `<path d="M62 12Q88 60 62 108" class="k-ink nofill" stroke-width="26" stroke-linecap="round"/><path d="M62 12Q88 60 62 108" class="k-line nofill" stroke-width="22" stroke-linecap="round"/>`
    +[0,1,2,3,4,5,6].map(k=>LI(46+(k%2?3:0),22+k*14,76+(k%2?3:0),30+k*14,'k-ink',2)).join('')
    +T(130,48,'chromosome','s-ink',{bold:1,size:16})+T(130,70,'une molécule d’ADN','s-dim')+T(130,88,'très longue, enroulée','s-dim')),
  adn:sv(320,110,'L’ADN : une double hélice',
    helice(14,190,54,24,14)+T(206,48,'deux brins','s-ink',{bold:1,size:15})+T(206,70,'4 lettres : A, T, G, C','s-dim',{size:13})),
  gene:sv(320,120,'Un gène est un segment d’ADN',
    `<rect x="14" y="34" width="292" height="26" rx="3" class="cell"/><rect x="104" y="34" width="86" height="26" class="reg f-a"/><rect x="104" y="34" width="86" height="26" class="k-a nofill" stroke-width="2.5"/>`
    +`<path d="M104 70v8H190v-8" class="k-a nofill" stroke-width="2"/>`
    +T(147,100,'un gène','s-a',{anchor:'middle',bold:1,size:15})+T(160,22,'un morceau d’ADN du chromosome','s-dim',{anchor:'middle',size:13})),
  base:sv(320,108,'Les quatre bases de l’ADN : A, T, G, C',
    [['A','adénine'],['T','thymine'],['G','guanine'],['C','cytosine']].map(([b,n],i)=>`<rect x="${14+i*76}" y="14" width="64" height="52" rx="3" class="cell"/>`+T(46+i*76,50,b,'s-ink',{anchor:'middle',bold:1,size:30})+T(46+i*76,86,n,'s-dim',{anchor:'middle',size:13})).join('')),
  sens:sv(320,112,'Un brin a un sens, de 5 prime vers 3 prime',
    ARW+LI(40,34,282,34,'k-ink',3,` ${FL}`)+T(22,39,'5′','s-ink',{anchor:'middle',bold:1,size:15})+T(300,39,'3′','s-ink',{anchor:'middle',bold:1,size:15})
    +LI(278,76,38,76,'k-a',3,` ${FL}`)+T(298,81,'5′','s-a',{anchor:'middle',bold:1,size:15})+T(20,81,'3′','s-a',{anchor:'middle',bold:1,size:15})
    +T(160,18,'un brin','s-dim',{anchor:'middle',size:13})+T(160,102,'l’autre brin, en sens inverse','s-dim',{anchor:'middle',size:13})),
  codon:sv(320,100,'Un codon : trois bases',
    ['A','U','G'].map((b,i)=>T(46+i*34,44,b,'s-ink',{anchor:'middle',bold:1,size:28})).join('')+`<path d="M28 56v8H116v-8" class="k-a nofill" stroke-width="2"/>`
    +T(72,86,'un codon','s-a',{anchor:'middle',bold:1,size:14})
    +T(170,40,'3 bases','s-ink',{bold:1,size:15})+T(170,62,'= 1 acide aminé','s-dim',{size:13})),
  anticodon:sv(320,128,'Le codon et l’anticodon s’apparient',
    T(14,30,'ARNm','s-dim',{size:13})+['A','U','G'].map((b,i)=>T(110+i*34,34,b,'s-ink',{anchor:'middle',bold:1,size:26})).join('')
    +[0,1,2].map(i=>LI(110+i*34,42,110+i*34,66,'k-a',2)).join('')
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
    +T(160,84,'codon de départ → méthionine','s-dim',{anchor:'middle',size:13})),
  mutation:sv(320,112,'Une mutation : une lettre change dans l’ADN',
    TR_COD.slice(0,9).split('').map((b,i)=>T(26+i*30,40,i===4?'A':b,i===4?'s-a':'s-ink',{anchor:'middle',bold:1,size:24})).join('')
    +T(26+4*30,76,'↑','s-a',{anchor:'middle',bold:1,size:20})+T(26+4*30,96,`était ${TR_COD[4]}`,'s-dim',{anchor:'middle',size:13})),
  polymerase:sv(320,128,'L’ARN polymérase ouvre l’ADN, lit un brin et assemble l’ARN',
    `<path d="M8 62H92C112 62 118 44 140 44H212C234 44 240 62 262 62H312" class="k-ink nofill" stroke-width="2.5"/><path d="M8 78H92C112 78 118 96 140 96H212C234 96 240 78 262 78H312" class="k-ink nofill" stroke-width="2.5"/>`
    +`<rect x="118" y="30" width="116" height="80" rx="28" class="eg-enz"/><path d="M196 36Q232 6 312 12" class="k-a nofill" stroke-width="3"/>`
    +T(176,74,'enzyme','s-a',{anchor:'middle',bold:1,size:14})+T(160,124,'ouvre l’ADN, lit un brin, assemble l’ARN','s-dim',{anchor:'middle',size:12})),
  complementaire:sv(320,112,'Les deux brins sont complémentaires : A avec T, G avec C',
    ['A','T','G','C','A'].map((b,i)=>T(40+i*40,38,b,'s-ink',{anchor:'middle',bold:1,size:26})+LI(40+i*40,48,40+i*40,64,'k-a',2)+T(40+i*40,92,{A:'T',T:'A',G:'C',C:'G'}[b],'s-ink',{anchor:'middle',bold:1,size:26})).join('')
    +T(214,40,'un brin','s-dim',{size:13})+T(214,92,'l’autre brin','s-dim',{size:13})),
  redondant:sv(320,126,`Plusieurs codons pour la leucine`,
    LEU.map((c,i)=>T(16+i*50,36,c,'s-ink',{bold:1,size:16})).join('')+LEU.map((c,i)=>LI(34+i*50,46,160,70,'k-line',1.5)).join('')
    +CI(160,86,18,'eg-trna')+T(160,91,AA3.L,'s-ink',{anchor:'middle',bold:1,size:14})+T(160,120,`${LEU.length} codons, 1 seul acide aminé`,'s-dim',{anchor:'middle',size:13})),
  'codon-stop':sv(320,100,'Les trois codons stop',
    STOPS.map((c,i)=>T(46+i*86,46,c,'s-a',{anchor:'middle',bold:1,size:26})).join('')+T(160,84,'aucun acide aminé : la lecture s’arrête','s-dim',{anchor:'middle',size:13})),
  substitution:exemple(A_HBS,'Une lettre remplacée par une autre'),
  'faux-sens':exemple(A_HBS,'Faux-sens : l’acide aminé change'),
  silencieuse:exemple(A_SIL,'Mutation silencieuse : l’acide aminé ne change pas'),
  'non-sens':exemple(A_NS6,'Non-sens : le codon devient un stop'),
  ribosome:sv(320,110,'Un ribosome, machine qui fabrique les protéines',
    `<rect x="20" y="14" width="96" height="52" rx="22" class="rulebody"/><rect x="26" y="72" width="84" height="26" rx="12" class="rulebody"/>`
    +`<path d="M6 69h128" class="k-a nofill" stroke-width="3"/>`
    +T(150,44,'ribosome','s-ink',{bold:1,size:16})+T(150,66,'lit l’ARN messager','s-dim')+T(150,84,'et assemble la protéine','s-dim')),
  electrophorese:sv(320,128,'Deux hémoglobines n’avancent pas à la même vitesse',
    `<rect x="20" y="12" width="120" height="104" rx="4" class="reg f-c"/><rect x="38" y="16" width="30" height="7" class="k-ink nofill" stroke-width="1.5"/><rect x="92" y="16" width="30" height="7" class="k-ink nofill" stroke-width="1.5"/>`
    +`<rect x="38" y="84" width="30" height="9" rx="4" class="s-ink"/><rect x="92" y="58" width="30" height="9" rx="4" class="s-a"/>`
    +T(160,44,'même départ,','s-dim',{size:13})+T(160,62,'arrivées différentes :','s-dim',{size:13})+T(160,80,'deux molécules','s-ink',{bold:1,size:14})+T(160,98,'différentes','s-ink',{bold:1,size:14})),
};

/* ---------- les mots ---------- */
export const mots={
  globule:{t:'globule rouge',d:'Cellule du sang, en forme de disque creux au centre. Remplie d’hémoglobine, elle transporte l’oxygène des poumons vers tous les organes. Adulte, elle n’a plus de noyau.',fig:FIG.globule},
  drepanocytose:{t:'drépanocytose',d:'Maladie héréditaire du sang. Chez les personnes atteintes, les globules rouges peuvent se déformer en faucille : ils se coincent dans les petits vaisseaux et sont détruits trop vite.',fig:FIG.drepanocytose},
  anemie:{t:'anémie',d:'Manque de globules rouges ou d’hémoglobine : le sang apporte moins d’oxygène aux organes, d’où fatigue et pâleur.'},
  proteine:{t:'protéine',d:'Molécule du vivant faite d’une ou plusieurs chaînes d’acides aminés repliées. Sa forme lui permet d’agir : transporter l’oxygène, couper un aliment, soutenir une cellule…',fig:FIG.proteine},
  'acide-amine':{t:'acide aminé',d:'Un des 20 « maillons » dont les protéines sont faites. Chacun a un nom (méthionine, valine, acide glutamique…) et une abréviation de trois lettres (Met, Val, Glu…).',fig:FIG['acide-amine']},
  hemoglobine:{t:'hémoglobine',d:'Protéine des globules rouges. Elle fixe l’oxygène dans les poumons et le libère dans les organes. Elle est faite de 4 chaînes : 2 chaînes α et 2 chaînes β.',fig:FIG.hemoglobine},
  chaine:{t:'chaîne β',d:`L’une des deux sortes de chaînes de l’hémoglobine (l’autre est la chaîne α). La chaîne β compte ${L_MURE} acides aminés.`,fig:FIG.chaine},
  noyau:{t:'noyau',d:'Compartiment de la cellule, délimité par une enveloppe percée de pores. Il contient l’ADN.',fig:FIG.noyau},
  chromosome:{t:'chromosome',d:'Une seule molécule d’ADN, très longue, enroulée sur elle-même et rangée dans le noyau. Une cellule humaine en contient 46.',fig:FIG.chromosome},
  adn:{t:'ADN',d:'Acide désoxyribonucléique : une molécule en double hélice, faite de deux brins. Elle porte l’information génétique, écrite avec quatre lettres : A, T, G, C.',fig:FIG.adn},
  gene:{t:'gène',d:'Un segment d’ADN qui contient la recette d’une chaîne de protéine. Un chromosome en porte beaucoup. Celui de la chaîne β de l’hémoglobine s’appelle HBB.',fig:FIG.gene},
  allele:{t:'allèle',d:'Une version d’un même gène. Deux allèles diffèrent par quelques lettres seulement. Pour la chaîne β : l’allèle normal, βA, et l’allèle de la drépanocytose, βS.'},
  electrophorese:{t:'électrophorèse',d:'Technique qui sépare des molécules : on les fait avancer dans un champ électrique. Selon leur charge et leur taille, elles avancent plus ou moins vite et s’arrêtent à des endroits différents.',fig:FIG.electrophorese},
  cytoplasme:{t:'cytoplasme',d:'Tout l’intérieur de la cellule, en dehors du noyau. C’est là que travaillent les ribosomes.'},
  ribosome:{t:'ribosome',d:'Petite machine du cytoplasme, faite de protéines et d’ARN. Elle lit un ARN messager et assemble les acides aminés dans l’ordre qu’il indique : c’est elle qui fabrique les protéines.',fig:FIG.ribosome},
  arn:{t:'ARN',d:'Acide ribonucléique : une molécule proche de l’ADN, mais à un seul brin, avec U (uracile) à la place de T.'},
  arnm:{t:'ARN messager',d:'Copie d’un gène, faite d’ARN. Elle sort du noyau et porte le message du gène jusqu’aux ribosomes. On l’écrit ARNm.'},
  transcription:{t:'transcription',d:'Première étape : la copie d’un gène en ARN messager. Elle se passe dans le noyau.'},
  traduction:{t:'traduction',d:'Seconde étape : la fabrication d’une protéine d’après l’ARN messager. Elle se passe dans le cytoplasme, sur les ribosomes.'},
  base:{t:'base',d:'Une « lettre » de l’ADN. Il y en a quatre : adénine (A), thymine (T), guanine (G) et cytosine (C). Dans l’ARN, la thymine est remplacée par l’uracile (U).',fig:FIG.base},
  brin:{t:'brin',d:'Un des deux fils de la double hélice d’ADN : une longue suite de bases.'},
  complementaire:{t:'complémentaire',d:'Chaque base a une partenaire : A avec T (ou U dans l’ARN), G avec C. Le complémentaire d’un brin est le brin où chaque lettre est remplacée par sa partenaire.',fig:FIG.complementaire},
  sens:{t:'5′ et 3′',d:'Les deux bouts d’un brin ne se ressemblent pas : on les appelle 5′ (« cinq prime ») et 3′ (« trois prime »), d’après des numéros d’atomes du sucre de l’ossature. Un brin a donc un sens, comme une flèche de 5′ vers 3′. Dans la double hélice, les deux brins sont en sens inverse.',fig:FIG.sens},
  enzyme:{t:'enzyme',d:'Protéine qui réalise une réaction chimique précise, et la rend rapide.'},
  polymerase:{t:'ARN polymérase',d:'L’enzyme qui fabrique l’ARN. Elle ouvre l’ADN, lit un brin, et assemble les lettres de l’ARN une à une, en face du brin lu.',fig:FIG.polymerase},
  'brin-transcrit':{t:'brin transcrit',d:'Celui des deux brins d’ADN qui sert de modèle : l’ARN polymérase le lit. L’autre brin s’appelle le brin non transcrit.'},
  codon:{t:'codon',d:'Groupe de trois bases consécutives de l’ARN messager. Chaque codon désigne un acide aminé, ou un arrêt.',fig:FIG.codon},
  code:{t:'code génétique',d:'La correspondance entre les codons et les acides aminés. Il est universel : le même chez tous les êtres vivants. GUG signifie valine partout.'},
  redondant:{t:'code redondant',d:`${N_SENS} codons pour 20 acides aminés : plusieurs codons peuvent désigner le même acide aminé. L’inverse est faux : un codon désigne un seul acide aminé.`,fig:FIG.redondant},
  arnt:{t:'ARN de transfert',d:'Petite molécule d’ARN qui fait le lien entre le message et la protéine. Un bout porte un acide aminé, l’autre bout porte un anticodon. On l’écrit ARNt.',fig:FIG.arnt},
  anticodon:{t:'anticodon',d:'Trois bases de l’ARNt, qui s’apparient avec les trois bases d’un codon : le codon AUG s’apparie avec l’anticodon UAC. L’anticodon est sur l’ARNt ; le codon est sur l’ARNm.',fig:FIG.anticodon},
  methionine:{t:'méthionine',d:'L’acide aminé désigné par le codon AUG (abréviation Met). Comme toute lecture commence par AUG, toute chaîne commence par elle. Pour la chaîne β, elle est ensuite détachée.',fig:FIG.methionine},
  'codon-stop':{t:'codon stop',d:`${STOPS.join(', ')} : aucun acide aminé ne leur correspond. Quand le ribosome en rencontre un, la traduction s’arrête et la chaîne est libérée.`,fig:FIG['codon-stop']},
  mutation:{t:'mutation',d:'Un changement dans la suite des lettres de l’ADN : une lettre remplacée (substitution), retirée (délétion) ou ajoutée (insertion).',fig:FIG.mutation},
  substitution:{t:'substitution',d:'Une lettre de l’ADN est remplacée par une autre. Un seul codon est touché.',fig:FIG.substitution},
  'faux-sens':{t:'faux-sens',d:'Mutation par substitution qui change l’acide aminé : le codon muté désigne un autre acide aminé.',fig:FIG['faux-sens']},
  silencieuse:{t:'mutation silencieuse',d:'Mutation qui ne change pas l’acide aminé, parce que le nouveau codon désigne le même (le code est redondant).',fig:FIG.silencieuse},
  'non-sens':{t:'non-sens',d:'Mutation qui transforme un codon d’acide aminé en codon stop : la chaîne est coupée trop tôt.',fig:FIG['non-sens']},
  decalage:{t:'décalage du cadre de lecture',d:'Quand une lettre est ajoutée ou retirée, tous les codons situés après sont découpés autrement : tous les acides aminés suivants changent.'},
  caractere:{t:'caractère',d:'Ce qu’on observe chez une personne : la forme de ses globules rouges, la couleur de ses yeux… Il dépend des protéines fabriquées.'},
  thalassemie:{t:'β-thalassémie',d:'Maladie héréditaire du sang où la chaîne β de l’hémoglobine est absente ou en quantité insuffisante : les globules rouges manquent d’hémoglobine.'},
};
