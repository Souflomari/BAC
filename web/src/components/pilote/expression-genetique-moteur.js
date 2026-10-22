/* eslint-disable */
// @ts-nocheck
/**
 * Moteur de la leçon pilote « Du gène à la protéine » — l'expression de
 * l'information génétique (SVT, 2ᵉ Bac, refonte 2026-10).
 *
 * Même architecture que `logarithme-moteur.js`, dont les parties GÉNÉRIQUES
 * sont recopiées (outils, moteur d'interpolation, panneau, paris, chapitres,
 * voix, clavier, démontage). Les scènes, les étapes, les contrôles et le
 * profil sont propres à cette leçon. Pas de KaTeX ici : aucune formule.
 *
 * RÈGLE DE CE FICHIER — aucune traduction n'est tapée à la main. Les brins,
 * l'ARNm, les codons, les anticodons, les acides aminés, les longueurs de
 * chaîne et le classement des mutations sont CALCULÉS à partir de la vraie
 * séquence codante du gène HBB (NCBI NM_000518.5, CDS 51..494, 444 nt) et
 * de la table du code génétique standard (NCBI, table 1). Au montage, la
 * traduction calculée est comparée à la protéine publiée (NP_000509.1) :
 * un écart s'écrit dans la console.
 *
 * FAITS ET SOURCES — [V] vérifié sur la source · [S] source secondaire
 * (cours, manuel) · [L] légende (aucune retenue).
 *  1. [V] Séquence codante HBB, 444 nt, ATG…TAA ; protéine 147 aa avec la Met.
 *     https://www.ncbi.nlm.nih.gov/nuccore/NM_000518.5 ·
 *     https://www.ncbi.nlm.nih.gov/protein/NP_000509.1
 *  2. [V] Méthionine initiale retirée (chaîne mûre 2..147 = 146 aa) ; HbS =
 *     E→V au résidu 7 (6 en numérotation classique) ; HbC = E→K au même site.
 *     https://www.uniprot.org/uniprotkb/P68871/entry
 *  3. [V] HBB sur le chromosome 11 (11p15.4). https://www.ncbi.nlm.nih.gov/gene/3043
 *  4. [V] Code génétique standard : 64 codons, AUG = Met (départ), UAA UAG UGA
 *     = stop. https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi#SG1
 *  5. [V] Pauling, Itano, Singer, Wells, Science, 25 nov. 1949 : l'hémoglobine
 *     des malades migre autrement en électrophorèse ; les porteurs ont les deux.
 *     https://en.wikipedia.org/wiki/Sickle_Cell_Anemia,_a_Molecular_Disease
 *  6. [V] Ingram, Nature 1956 (178:792) puis 1957 (180:326, 17 août) : un seul
 *     acide aminé diffère, valine à la place d'acide glutamique ; « première
 *     fois » qu'on montre qu'un seul échange d'acide aminé cause une maladie.
 *     https://pubmed.ncbi.nlm.nih.gov/13464827/ ·
 *     https://en.wikipedia.org/wiki/Vernon_Ingram
 *  7. [V] Drépanocytose : sans oxygène, l'HbS polymérise en longues fibres ;
 *     hématies en faucille, capillaires bloqués, anémie hémolytique ;
 *     transmission autosomique récessive.
 *     https://fr.wikipedia.org/wiki/Dr%C3%A9panocytose ·
 *     https://en.wikipedia.org/wiki/Sickle_cell_disease
 *  8. [V] Érythropoïèse dans la moelle rouge ; l'hémoglobine est fabriquée par
 *     les précurseurs nucléés, qui expulsent ensuite leur noyau.
 *     https://en.wikipedia.org/wiki/Erythropoiesis
 *  9. [V] L'ARN polymérase lit le brin transcrit de 3′ vers 5′ et construit
 *     l'ARN de 5′ vers 3′ ; l'ARN a la séquence du brin codant, U pour T.
 *     https://en.wikipedia.org/wiki/Transcription_(biology)
 * 10. [S] Vocabulaire et attendus du programme marocain : brin transcrit, ARN
 *     polymérase, U devant A, code universel et redondant, codons stop « dits
 *     non-sens », AUG initial, méthionine initiale détachée, phénotype aux
 *     échelles moléculaire / cellulaire / macroscopique (drépanocytose).
 *     Cours SVT 2ᵉ Bac Sc. Ex., M. El Boukhari :
 *     https://moutamadris.ma/wp-content/uploads/2020/03/cours-svt-2bac-sp-international-fr-2-7.pdf
 * 11. [V] Nirenberg et Matthaei, NIH, mai 1961 (essai clé le 27 mai) : un ARN
 *     poly-U fait fabriquer de la polyphénylalanine à un extrait acellulaire
 *     de bactéries ; Moscou, Congrès international de biochimie, août 1961 :
 *     d'abord devant un petit auditoire, puis, à l'instigation de Crick,
 *     devant tout le congrès (≈ un millier de personnes) ; tous les codons
 *     des acides aminés déchiffrés en 1966 (Nobel 1968 avec Holley et Khorana).
 *     https://en.wikipedia.org/wiki/Nirenberg_and_Matthaei_experiment ·
 *     Caskey & Leder, PNAS 2014 : https://pmc.ncbi.nlm.nih.gov/articles/PMC4000803
 *     (Un inventaire NLM date le congrès d'octobre ; les autres sources
 *     disent août — on garde août.)
 * 12. [V] Allison, BMJ, 6 févr. 1954 : le trait drépanocytaire protège du
 *     paludisme. https://pubmed.ncbi.nlm.nih.gov/13115700/ (profil de fin)
 * 13. [V] Maroc : codon 39 (C→T) et FSC 6 (−A) parmi les six mutations
 *     majeures de β-thalassémie (75,7 % des chromosomes étudiés) ; « problème
 *     de santé majeur au Maroc » ; utile au dépistage des porteurs.
 *     Lemsaddek et al., Hemoglobin 2004 : https://pubmed.ncbi.nlm.nih.gov/15008262/ ·
 *     Agouti et al., Genet Test 2008 : https://pubmed.ncbi.nlm.nih.gov/18976160/ ·
 *     Belmokhtar et al., Mol Genet Genomic Med 2022 : https://pubmed.ncbi.nlm.nih.gov/35615994/
 * 14. [S] Poids au bac : génétique 45–50 % ; exercice « maladie héréditaire /
 *     expression » dans la plupart des sujets récents.
 *     docs/refonte/01-programme-bac-maroc.md §3.6
 * ÉCARTÉS faute de source vérifiée : l'étymologie grecque de « drépanocytose »,
 * « 15 000 nouveaux cas par an au Maroc », le taux de porteurs OMS cité de
 * seconde main, le nombre exact de personnes dans la salle de Moscou, la
 * formule du « dogme central » (son sens exact chez Crick n'est pas
 * « ADN → ARN → protéine » : on ne la cite pas plutôt que de la déformer).
 */

export function monterPilote(root) {

/* ---------- outils (repris du moteur logarithme) ---------- */
const NS='http://www.w3.org/2000/svg';
const svg=root.querySelector('[data-pilote-scene]');
const $=s=>root.querySelector(s);
function E(tag,attrs,parent){const e=document.createElementNS(NS,tag);if(attrs)for(const k in attrs){if(k==='text')e.textContent=attrs[k];else e.setAttribute(k,attrs[k]);}(parent||svg).appendChild(e);return e;}
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const ty=s=>String(s).replace(/ ([?!;:»])/g,' $1').replace(/« /g,'« ');
// dans le panneau (HTML seulement) : « β-thalassémie » ne se coupe pas au trait d'union
const nw=h=>String(h).replace(/β-thalassémie/g,'<span class="eg-nw">β-thalassémie</span>');
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const wait=ms=>new Promise(r=>setTimeout(r,RM.matches?0:ms));
let run=0;const hooks={};
function show(el,o){el.style.opacity=o;}
function txt(parent,x,y,str,cls,anchor){return E('text',{x,y,class:cls,'text-anchor':anchor||'start',text:ty(str)},parent);}
function svgPt(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}

const defs=E('defs');
const mk=E('marker',{id:'eg-arw',viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'8',markerHeight:'8',orient:'auto-start-reverse'},defs);
E('path',{d:'M0 0L10 5L0 10z',class:'s-dim'},mk);

const scenes={};
function scene(id,def){const g=E('g',{class:'scene'});g.style.opacity=0;const s=Object.assign({id,g},def);s.defaults={...def.p};s.p={...def.p};s.build(g);s.render();scenes[id]=s;return s;}

/* ---------- génétique : la donnée et les calculs ---------- */
// NCBI NM_000518.5, CDS 51..494 (gène HBB, chaîne β de l'hémoglobine), brin non transcrit, 5′ → 3′.
const CDS='ATGGTGCATCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGGCTGCTGGTGGTCTACCCTTGGACCCAGAGGTTCTTTGAGTCCTTTGGGGATCTGTCCACTCCTGATGCTGTTATGGGCAACCCTAAGGTGAAGGCTCATGGCAAGAAAGTGCTCGGTGCCTTTAGTGATGGCCTGGCTCACCTGGACAACCTCAAGGGCACCTTTGCCACACTGAGTGAGCTGCACTGTGACAAGCTGCACGTGGATCCTGAGAACTTCAGGCTCCTGGGCAACGTGCTGGTCTGTGTGCTGGCCCATCACTTTGGCAAAGAATTCACCCCACCAGTGCAGGCTGCCTATCAGAAAGTGGTGGCTGGTGTGGCTAATGCCCTGGCCCACAAGTATCACTAA';
// NCBI NP_000509.1 — sert UNIQUEMENT à vérifier la traduction calculée, jamais à l'afficher.
const PROT_NCBI='MVHLTPEEKSAVTALWGKVNVDEVGGEALGRLLVVYPWTQRFFESFGDLSTPDAVMGNPKVKAHGKKVLGAFSDGLAHLDNLKGTFATLSELHCDKLHVDPENFRLLGNVLVCVLAHHFGKEFTPPVQAAYQKVVAGVANALAHKYH';
// Table standard (NCBI table 1), dans l'ordre U C A G × U C A G × U C A G.
const B4='UCAG',AA1='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const CODE={};for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)CODE[B4[i]+B4[j]+B4[k]]=AA1[16*i+4*j+k];
const AA3={F:'Phe',L:'Leu',S:'Ser',Y:'Tyr',C:'Cys',W:'Trp',P:'Pro',H:'His',Q:'Gln',R:'Arg',I:'Ile',M:'Met',T:'Thr',N:'Asn',K:'Lys',V:'Val',A:'Ala',D:'Asp',E:'Glu',G:'Gly','*':'Stop'};
const NOM={F:'phénylalanine',L:'leucine',S:'sérine',Y:'tyrosine',C:'cystéine',W:'tryptophane',P:'proline',H:'histidine',Q:'glutamine',R:'arginine',I:'isoleucine',M:'méthionine',T:'thréonine',N:'asparagine',K:'lysine',V:'valine',A:'alanine',D:'acide aspartique',E:'acide glutamique',G:'glycine','*':'aucun acide aminé'};
const PAIRE={A:'T',T:'A',G:'C',C:'G'},PAIRE_ARN={A:'U',U:'A',G:'C',C:'G'};
const toARN=s=>s.replace(/T/g,'U');
const compl=s=>s.split('').map(b=>PAIRE[b]).join('');          // brin transcrit, écrit 3′ → 5′
const anticodon=c=>c.split('').map(b=>PAIRE_ARN[b]).join('');   // écrit 3′ → 5′, aligné sous le codon
const aaDe=c=>CODE[toARN(c)];
const groupe=s=>(s.match(/.{1,3}/g)||[]).join(' ');
function traduire(adn){const aa=[];for(let i=0;i+3<=adn.length;i+=3){const a=aaDe(adn.slice(i,i+3));if(a==='*')return{aa,stop:i/3};aa.push(a);}return{aa,stop:-1};}
const chaine=(aa,sep)=>aa.map(a=>AA3[a]).join(sep||' – ');
const NORMAL=traduire(CDS);                 // aa avec la Met initiale
const L_MURE=NORMAL.aa.length-1;            // 146 : la Met est retirée
if(NORMAL.aa.join('')!==PROT_NCBI)console.warn('[pilote expression-génétique] la traduction calculée diffère de NP_000509.1');
// une mutation : '' · 's:i:B' (substitution) · 'd:i' (délétion) · 'i:i:B' (insertion avant i) ; i = indice dans CDS
function appliquer(m){if(!m)return CDS;const[t,i,b]=m.split(':'),k=+i;if(t==='s')return CDS.slice(0,k)+b+CDS.slice(k+1);if(t==='d')return CDS.slice(0,k)+CDS.slice(k+1);return CDS.slice(0,k)+b+CDS.slice(k);}
function analyser(m){
  const seq=appliquer(m),tr=traduire(seq),A={m,seq,tr,kind:'normal'};
  if(!m)return A;
  const[t,i,b]=m.split(':'),k=+i,j=Math.floor(k/3);Object.assign(A,{t,k,b,j});
  if(t==='s'){A.cN=CDS.slice(3*j,3*j+3);A.cM=seq.slice(3*j,3*j+3);A.aN=aaDe(A.cN);A.aM=aaDe(A.cM);
    A.kind=A.aN===A.aM?'silencieuse':A.aM==='*'?'non-sens':'faux-sens';}
  else{A.kind='décalage';let f=-1;for(let p=0;p<Math.max(tr.aa.length,NORMAL.aa.length);p++)if(tr.aa[p]!==NORMAL.aa[p]){f=p;break;}A.first=f;}
  A.len=tr.stop>0?tr.stop-1:null;            // longueur de la chaîne mûre (sans la Met)
  return A;}
const CONNUS={'s:19:T':'C’est l’allèle βS : celui de la drépanocytose.','s:18:A':'C’est l’allèle βC, celui de l’hémoglobine C.','d:19':'Cet allèle existe : FSC 6 (−A), l’une des principales mutations de β-thalassémie au Maroc.'};
const ORD=n=>n===1?'1ʳᵉ':n+'ᵉ';
// les trois mutations scénarisées (indices calculés depuis le codon 6, GAG)
const C6=18, HBS='s:'+(C6+1)+':T', SIL='s:'+(C6+2)+':A', FS6='d:'+(C6+1);
const A_HBS=analyser(HBS),A_SIL=analyser(SIL),A_FS6=analyser(FS6);
// l'exercice type bac : codons 37 à 41, substitution C → T au codon 39
const BK=37,BN=5,B39=39,BMUT='s:'+(3*B39)+':T',A_B=analyser(BMUT);
const BAC_N=CDS.slice(3*BK,3*(BK+BN)),BAC_M=A_B.seq.slice(3*BK,3*(BK+BN));

/* ---------- géométries partagées ---------- */
const XT=i=>75+i*40+Math.floor(i/3)*10;            // 21 bases, codons espacés
function croissant(R,d){
  if(d>=2*R-.5)return `M${-R} 0a${R} ${R} 0 1 0 ${2*R} 0a${R} ${R} 0 1 0 ${-2*R} 0Z`;
  const xi=d/2,yi=Math.sqrt(R*R-xi*xi);
  return `M${xi.toFixed(1)} ${(-yi).toFixed(1)}A${R} ${R} 0 1 0 ${xi.toFixed(1)} ${yi.toFixed(1)}A${R} ${R} 0 0 1 ${xi.toFixed(1)} ${(-yi).toFixed(1)}Z`;}

/* ---------- 1. l'énigme : la faucille, la chaîne, les lettres ---------- */
scene('drep',{
  p:{cell:0,morph:0,chainV:0,chain:0,six:0,grid:0},
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
    // la chaîne β
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
    // les lettres du gène
    this.gr=E('g',{},g);
    txt(this.gr,500,92,`La partie du gène qui code la chaîne β : ${CDS.length} lettres`,'t-lab2 s-ink','middle');
    const cols=37;CDS.split('').forEach((b,i)=>E('text',{x:131+(i%cols)*20.5,y:156+Math.floor(i/cols)*36,class:'mono t-tick s-dim','text-anchor':'middle',text:b},this.gr));
    txt(this.gr,500,620,'Quatre lettres seulement : A, T, G, C.','t-lab s-dim','middle');
  },
  render(){
    const p=this.p,m=p.morph,R=150,path=croissant(R,lerp(2*R,.5*R,m));
    [this.pN,this.pNk,this.pS,this.pSk].forEach(e=>e.setAttribute('d',path));
    this.inner.setAttribute('transform',`rotate(${(-18*m).toFixed(1)}) scale(${(1+.35*m).toFixed(3)} ${(1-.22*m).toFixed(3)})`);
    show(this.pN,1-m);show(this.pNk,1-m);show(this.dim,(1-m)*.55);show(this.pS,m);show(this.pSk,m);
    show(this.cg,p.cell);show(this.capN,p.cell*(1-m));show(this.capS,p.cell*m);show(this.capD,p.cell);
    show(this.ch,p.chainV);this.line.style.strokeDashoffset=1000*(1-p.chain);
    this.beads.forEach((b,i)=>{b.style.opacity=clamp(p.chain*L_MURE-i,0,1);});
    show(this.sixG,p.six);show(this.sixCap,p.six);
    show(this.gr,p.grid);
  }
});

/* ---------- 2. les acteurs : noyau, ribosomes, messager ---------- */
scene('cell',{
  p:{on:0,ribo:0,q:0,msg:0,names:0},
  build(g){
    this.base=E('g',{},g);
    E('rect',{x:40,y:52,width:920,height:560,rx:80,class:'k-ink nofill','stroke-width':2},this.base);
    txt(this.base,930,594,'une cellule (schéma)','t-lab s-dim','end');
    E('circle',{cx:290,cy:330,r:200,class:'reg f-b'},this.base);
    E('circle',{cx:290,cy:330,r:200,class:'k-ink nofill','stroke-width':2,'stroke-dasharray':'52 12'},this.base);
    txt(this.base,290,176,'noyau','t-lab2 s-ink','middle');
    const dna=E('g',{},this.base),Y=(x,s)=>(320+s*26*Math.sin((x-160)/22)).toFixed(1);let d1='',d2='';
    for(let x=160;x<=420;x+=4){d1+=(x>160?'L':'M')+x+' '+Y(x,1);d2+=(x>160?'L':'M')+x+' '+Y(x,-1);}
    for(let x=166;x<=416;x+=11)E('line',{x1:x,x2:x,y1:Y(x,1),y2:Y(x,-1),class:'k-line','stroke-width':2},dna);
    E('path',{d:d1,class:'k-ink nofill','stroke-width':3},dna);E('path',{d:d2,class:'k-ink nofill','stroke-width':3},dna);
    txt(this.base,290,398,'ADN : le gène est ici','t-lab2 s-ink','middle');
    txt(this.base,290,424,'il ne quitte pas le noyau','t-lab s-dim','middle');
    txt(this.base,720,110,'cytoplasme','t-lab2 s-dim','middle');
    this.rg=E('g',{},g);
    [[620,222],[850,262],[690,504],[870,524]].forEach(([x,y])=>{E('ellipse',{cx:x,cy:y-12,rx:36,ry:20,class:'eg-trna'},this.rg);E('ellipse',{cx:x,cy:y+16,rx:28,ry:14,class:'eg-trna'},this.rg);});
    txt(this.rg,745,378,'ribosomes','t-lab2 s-ink','middle');
    txt(this.rg,745,404,'ici se fabriquent les protéines','t-lab s-dim','middle');
    this.qm=txt(g,560,352,'?','t-huge s-a','middle');
    this.msg=E('g',{},g);
    E('path',{d:'M-34 0q8.5 -11 17 0t17 0t17 0t17 0',class:'k-a nofill','stroke-width':4,'stroke-linecap':'round'},this.msg);
    txt(this.msg,0,-20,'ARNm','t-lab2 s-a','middle');
    this.P=[[352,262],[478,262],[534,240]];
    this.nm=E('g',{},g);
    txt(this.nm,330,248,'transcription','t-lab2 s-a','middle');
    txt(this.nm,690,170,'traduction','t-lab2 s-a','middle');
    const yb=670;
    txt(this.nm,215,yb,'ADN','t-big2 s-ink','middle');
    E('line',{x1:268,x2:398,y1:yb-10,y2:yb-10,class:'k-ink','stroke-width':2,'marker-end':'url(#eg-arw)'},this.nm);
    txt(this.nm,333,yb-24,'transcription','t-tiny s-a','middle');
    txt(this.nm,470,yb,'ARNm','t-big2 s-ink','middle');
    E('line',{x1:536,x2:666,y1:yb-10,y2:yb-10,class:'k-ink','stroke-width':2,'marker-end':'url(#eg-arw)'},this.nm);
    txt(this.nm,601,yb-24,'traduction','t-tiny s-a','middle');
    txt(this.nm,770,yb,'protéine','t-big2 s-ink','middle');
  },
  render(){
    const p=this.p;show(this.base,p.on);show(this.rg,p.ribo);show(this.qm,p.q*(1-p.msg));
    const t=p.msg,P=this.P,s=t<.55?t/.55:(t-.55)/.45,a=t<.55?P[0]:P[1],b=t<.55?P[1]:P[2];
    this.msg.setAttribute('transform',`translate(${lerp(a[0],b[0],s).toFixed(1)} ${lerp(a[1],b[1],s).toFixed(1)})`);
    show(this.msg,clamp(t*4,0,1));show(this.nm,p.names);
  }
});

/* ---------- 3. la transcription : la figure-clé ---------- */
const TR_COD=CDS.slice(0,21),TR_TPL=compl(TR_COD),TR_ARN=toARN(TR_COD);
scene('trans',{
  p:{dna:0,open:0,tpl:0,n:0,fo:0,cmp:0,lv:0,rules:0},
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
    this.fbox=E('rect',{x:XT(1)-20,width:40,height:38,rx:3,class:'k-a nofill','stroke-width':2.5},g);
    this.pol=E('g',{},g);
    this.polR=E('rect',{x:-56,width:112,rx:34,class:'glass'},this.pol);
    this.polT=txt(this.pol,0,0,'ARN polymérase','t-lab s-c','middle');
    this.mg=E('g',{},g);this.mr=[];this.ml=[];
    for(let i=0;i<21;i++){
      this.ml.push(E('line',{x1:XT(i),x2:XT(i),class:'k-a','stroke-width':1.5},this.mg));
      this.mr.push(E('text',{x:XT(i),class:'mono t-mid '+(TR_ARN[i]==='U'?'s-a':'s-ink'),'text-anchor':'middle',text:TR_ARN[i]},this.mg));
    }
    this.mL=txt(this.mg,38,0,'5′','t-lab s-a','middle');this.mR=txt(this.mg,966,0,'3′','t-lab s-a','middle');
    this.mLab=txt(this.mg,966,0,'ARN messager (ARNm)','t-lab2 s-a','end');
    this.cmpT=txt(g,500,346,'Mêmes lettres que le brin non transcrit, U à la place de T','t-lab2 s-ink','middle');
    // la table de la transcription
    this.card=E('g',{},g);
    txt(this.card,500,150,'La transcription, en une table','t-lab2 s-dim','middle');
    txt(this.card,330,286,'brin transcrit (ADN)','t-lab2 s-ink','end');
    txt(this.card,330,416,'ARNm','t-lab2 s-ink','end');
    'ATGC'.split('').forEach((b,k)=>{const x=440+k*110,a=toARN(PAIRE[b]);
      E('text',{x,y:292,class:'mono t-huge s-ink','text-anchor':'middle',text:b},this.card);
      E('line',{x1:x,x2:x,y1:310,y2:364,class:'k-dim','stroke-width':2,'marker-end':'url(#eg-arw)'},this.card);
      E('text',{x,y:422,class:'mono t-huge '+(a==='U'?'s-a':'s-ink'),'text-anchor':'middle',text:a},this.card);});
    txt(this.card,500,512,'L’ARNm a la séquence du brin non transcrit, avec U à la place de T.','t-lab2 s-ink','middle');
    txt(this.card,500,548,'Lu de 3′ vers 5′ sur le brin transcrit · construit de 5′ vers 3′','t-lab s-dim','middle');
  },
  render(){
    const p=this.p,o=p.open,yC=lerp(300,170,o),yT=lerp(358,528,o),yM=lerp(462,238,p.cmp),fade=1-p.rules;
    show(this.dg,p.dna*fade);
    for(let i=0;i<21;i++){
      this.cod[i].setAttribute('y',yC);this.tpl[i].setAttribute('y',yT);
      this.rungs[i].setAttribute('y1',yC+8);this.rungs[i].setAttribute('y2',yT-28);this.rungs[i].style.opacity=1-o;
      this.cod[i].style.opacity=1-.6*p.tpl*(1-p.cmp);this.tpl[i].style.opacity=1-.6*p.cmp;
      this.cod[i].setAttribute('class','mono t-mid '+(p.cmp>.5&&TR_COD[i]==='T'?'s-a':'s-ink'));
    }
    [this.cL,this.cR].forEach(t=>t.setAttribute('y',yC));[this.tL,this.tR].forEach(t=>t.setAttribute('y',yT));
    this.cLab.setAttribute('y',yC-36);show(this.cLab,o);this.tLab.setAttribute('y',yT+40);show(this.tLab,p.tpl*o);
    this.fbox.setAttribute('y',yT-29);show(this.fbox,p.fo*p.dna*fade);
    const fx=clamp(p.n-.5,0,20),f0=Math.floor(fx),front=lerp(XT(f0),XT(Math.min(f0+1,20)),fx-f0);
    this.polR.setAttribute('y',yM-40);this.polR.setAttribute('height',Math.max(0,yT-yM+66));
    this.polT.setAttribute('y',yM-54);this.polT.setAttribute('x',(clamp(front,90,890)-front).toFixed(1));
    this.pol.setAttribute('transform',`translate(${front.toFixed(1)} 0)`);
    show(this.pol,clamp(p.open*2-1,0,1)*(1-p.cmp)*(1-p.lv)*fade*(p.n<20.5?1:clamp((21-p.n)*2,0,1)));
    for(let i=0;i<21;i++){const a=clamp(p.n-i,0,1);
      this.mr[i].setAttribute('y',yM);this.mr[i].style.opacity=a;
      this.ml[i].setAttribute('y1',yM+8);this.ml[i].setAttribute('y2',yT-28);this.ml[i].style.opacity=a*(1-p.cmp);}
    [this.mL,this.mR].forEach(t=>{t.setAttribute('y',yM);t.style.opacity=clamp(p.n-20,0,1);});
    this.mLab.setAttribute('y',yM-36+76*p.cmp);show(this.mLab,clamp(p.n-20,0,1));
    this.mg.setAttribute('transform',`translate(${(p.lv*900).toFixed(1)} 0)`);show(this.mg,(1-p.lv)*fade);
    show(this.cmpT,p.cmp*(1-p.lv)*fade);
    show(this.card,p.rules);
  }
});

/* ---------- 4. le code : triplets, poly-U, la table ---------- */
scene('code',{
  p:{need:0,tri:0,fill:0,pu:0,pf:0,tab:0,sel:'···'},
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
    this.tab=E('g',{},g);
    this.rowB=E('rect',{x:x0,width:4*cw,height:4*lh,class:'reg f-b'},this.tab);
    this.colB=E('rect',{y:y0,width:cw,height:16*lh,class:'reg f-b'},this.tab);
    this.selB=E('rect',{width:cw,height:lh,class:'reg f-a'},this.tab);
    this.selK=E('rect',{width:cw,height:lh,class:'k-a nofill','stroke-width':2.5},this.tab);
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
      hit.addEventListener('click',()=>{if(cur>=0&&STEPS[cur].ctl==='table'){this.p.sel=cod;this.render();hooks.onCodon&&hooks.onCodon();}});
    }
  },
  render(){
    const p=this.p;show(this.needT,p.need);
    this.panels.forEach((P,k)=>{show(P.pg,clamp(p.tri-k,0,1));P.cells.forEach((c,i)=>c.setAttribute('class',p.fill>.5&&i<20?'cell hl-a':'cell'));});
    show(this.redT,p.fill);
    show(this.puG,p.pu);show(this.pfG,p.pf>0?1:0);this.pfB.forEach((b,j)=>{b.style.opacity=clamp(p.pf*6-j,0,1);});
    show(this.tab,p.tab);
    const s=p.sel||'···',r=B4.indexOf(s[0]),c=B4.indexOf(s[1]),l=B4.indexOf(s[2]),{x0,cw,y0,lh}=this;
    this.rowB.setAttribute('y',y0+Math.max(r,0)*4*lh);show(this.rowB,r>=0?1:0);
    this.colB.setAttribute('x',x0+Math.max(c,0)*cw);show(this.colB,c>=0?1:0);
    const on=r>=0&&c>=0&&l>=0;[this.selB,this.selK].forEach(e=>{e.setAttribute('x',x0+Math.max(c,0)*cw);e.setAttribute('y',y0+(Math.max(r,0)*4+Math.max(l,0))*lh);show(e,on?1:0);});
  }
});

/* ---------- 5. la traduction : le ribosome avance ---------- */
const TL_ARN=toARN(CDS.slice(0,21)),NB=7;
const FIN=toARN(CDS.slice(-12));                                   // les 4 derniers codons, stop compris
const PX=c=>140+c*104;
const XL=i=>150+i*34+Math.floor(i/3)*12,CXL=c=>XL(3*c+1),PAS=3*34+12;   // un codon = 114 unités
scene('transl',{
  p:{on:0,k:0,end:0,met:0},
  build(g){
    this.rib=E('g',{},g);
    E('rect',{x:-120,y:270,width:240,height:186,rx:64,class:'rulebody'},this.rib);
    E('rect',{x:-112,y:490,width:224,height:74,rx:34,class:'rulebody'},this.rib);
    txt(this.rib,0,538,'ribosome','t-lab s-dim','middle');
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
  },
  render(){
    const p=this.p,k=p.k,e=p.end;
    const rx=k>=1?CXL(0)+(k-1)*PAS:CXL(0)-(1-k)*260;
    this.rib.setAttribute('transform',`translate(${rx.toFixed(1)} 0)`);show(this.rib,p.on*clamp(k*1.5,0,1));
    show(this.sg,p.on*(1-e));show(this.eg,e);
    this.trna.forEach(({tg,bead},c)=>{const a=clamp(k-c,0,1),l=clamp(k-c-1,0,1);
      tg.setAttribute('transform',`translate(${(-l*90).toFixed(1)} ${((1-a)*-150-l*120).toFixed(1)})`);
      tg.style.opacity=a*(1-l)*(1-e);
      bead.style.opacity=1-clamp((k-c-.6)/.4,0,1);});
    this.beads.forEach((b,c)=>{const o=clamp((k-c-.6)/.4,0,1);b.style.opacity=c===0?o*(1-p.met):o;
      if(c===0)b.setAttribute('transform',`translate(${(-40*p.met).toFixed(1)} ${(-40*p.met).toFixed(1)})`);});
    this.links.forEach((l,i)=>{l.style.opacity=clamp((k-i-1.6)/.4,0,1)*(i===0?1-p.met:1);});
    const kk=clamp(Math.ceil(k-.001),1,NB);this.link.setAttribute('x1',PX(kk-1));this.link.setAttribute('x2',CXL(kk-1));
    show(this.link,clamp(k-.6,0,1)*(1-e)*p.on);
    show(this.tail,e);show(this.tot1,e*(1-p.met));show(this.tot2,p.met);show(this.nums,p.met);
  }
});

/* ---------- 6. l'atelier de mutation ---------- */
const W0=3,WN=21;                                                  // codons 1 à 7 : indices 3 à 23
const XA=i=>118+i*37+Math.floor(i/3)*11,CXA=c=>XA(3*c+1),BX=j=>118+j*47,PN=18;
function dispOf(n,A){if(!A.m||A.t==='s')return n;if(A.t==='d')return n<A.k?n:n===A.k?null:n-1;return n<A.k?n:n+1;}
function normOf(d,A){if(!A.m||A.t==='s')return d;if(A.t==='d')return d<A.k?d:d+1;return d<A.k?d:d===A.k?A.k:d-1;}
function verdict(A){
  if(A.kind==='normal')return{t:'Allèle normal',s:'Choisis une lettre de l’ADN, puis change-la.',n:''};
  const n=CONNUS[A.m]||'';
  if(A.kind==='silencieuse')return{t:`Silencieuse · ${toARN(A.cN)} → ${toARN(A.cM)}`,s:`Substitution : le codon ${A.j} change, l’acide aminé non (${AA3[A.aN]}). La protéine est identique.`,n};
  if(A.kind==='faux-sens')return{t:`Faux-sens · ${AA3[A.aN]} ${A.j} → ${AA3[A.aM]}`,s:`Substitution : un seul acide aminé change ; la chaîne garde ${A.len} acides aminés.`,n};
  if(A.kind==='non-sens')return{t:`Non-sens · le codon ${A.j} devient ${toARN(A.cM)}, un stop`,s:`Substitution : la chaîne s’arrête après ${A.j-1} acides aminés au lieu de ${L_MURE}.`,n};
  const op=A.t==='d'?'Délétion':'Insertion';
  return{t:`Décalage du cadre de lecture · ${op.toLowerCase()}`,s:A.len!=null?`${op} d’une lettre : tout change à partir du n° ${A.first} ; un stop arrive au codon ${A.tr.stop} → ${A.len} acides aminés au lieu de ${L_MURE}.`:`${op} d’une lettre : tout change à partir du n° ${A.first}, sans stop avant la fin du gène.`,n};
}
scene('atelier',{
  p:{on:0,mut:'',sel:C6+1,prot:0,ver:0},
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
      hit.addEventListener('click',()=>{if(cur<0||STEPS[cur].ctl!=='atelier')return;const A=analyser(this.p.mut);this.p.sel=normOf(W0+i,A);this.render();hooks.onSel&&hooks.onSel();});
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
    if(d!=null&&d>=W0&&d<W0+WN){[this.selR,this.selK].forEach(e=>e.setAttribute('x',XA(d-W0)-17));show(this.selR,.55);show(this.selK,1);}else{show(this.selR,0);show(this.selK,0);}
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
    // un petit vaisseau qui se rétrécit : les globules en faucille se coincent au goulot
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
    const row=(par,y,lab,seq,ends,cls,diff)=>{txt(par,64,y,lab,'t-lab s-ink');txt(par,300,y,ends[0],'t-tiny s-dim','middle');txt(par,902,y,ends[1],'t-tiny s-dim','middle');
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
    trN.forEach((a,c)=>txt(this.r2,CXB(c),474,AA3[a],'t-lab2 s-ink','middle'));
    let seenStop=false;trM.forEach((a,c)=>{let t,cl='t-lab2 s-ink';if(seenStop){t='·';cl='t-lab2 s-dim';}else if(a==='*'){t='Stop';cl='t-lab2 s-a';seenStop=true;}else t=AA3[a];txt(this.r2,CXB(c),522,t,cl,'middle');});
    this.v=E('g',{},g);
    txt(this.v,500,600,`Substitution · non-sens au codon ${B39}`,'t-big2 s-ink','middle');
    txt(this.v,500,640,`Chaîne arrêtée après ${A_B.len} acides aminés au lieu de ${L_MURE} : β-thalassémie`,'t-lab s-ink','middle');
    this.hot=[this.dN,this.dM,this.aN,this.aM].map(r=>r[3*jc]);
  },
  render(){const p=this.p;show(this.d,p.doc);show(this.r1,p.e1);show(this.r2,p.e2);show(this.r3,p.e3);show(this.v,p.e3);
    this.hot.forEach(t=>t.setAttribute('class','mono t-mid '+(p.e3>.5?'s-a':'s-ink')));}
});

/* ---------- 9. vérification ---------- */
// Q1 : quel ARNm ? (codons 8 à 10) · Q2 : le cadre (codons 0 à 4, une lettre en moins) · Q3 : gène, allèle, code
const Q1C=CDS.slice(24,33),Q1T=compl(Q1C);
const Q2C=CDS.slice(0,15),Q2K=6,Q2D=Q2C.slice(0,Q2K)+Q2C.slice(Q2K+1);
const tq=s=>{const r=traduire(s);return chaine(r.aa)+(r.stop!==-1?', puis stop':'');};
const Q2_OK=tq(Q2D),Q2_MOINS=chaine(traduire(Q2C).aa.filter((_,i)=>i!==2)),Q2_PAREIL=chaine(traduire(Q2C).aa);
const QUIZ=[
  {big:`3′-${groupe(Q1T)}-5′`,sub:'fragment du brin transcrit',r1:'complémentaire du brin transcrit, avec U :',r2:`5′-${groupe(toARN(Q1C))}-3′`},
  {big:groupe(toARN(Q2C)),sub:`on supprime le ${toARN(Q2C)[Q2K]} du 3ᵉ codon`,r1:`nouveau découpage : ${groupe(toARN(Q2D))}`,r2:Q2_OK},
  {big:`${A_HBS.cN} → ${A_HBS.cM}`,sub:'chez une personne drépanocytaire, qu’est-ce qui a changé ?',r1:'même gène, autre allèle : βA → βS',r2:`même code partout : ${toARN(A_HBS.cM)} = ${AA3[A_HBS.aM]}`}
];
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
    const I=[['L’ARNm est complémentaire du brin transcrit :','mêmes lettres que l’autre brin, U pour T.'],['Le code se lit par codons de trois lettres,','de AUG jusqu’à un codon stop.'],['Le ribosome traduit codon par codon :','un anticodon, un acide aminé.'],['Une seule lettre peut changer la protéine :','silencieuse, faux-sens, non-sens, décalage.']];
    this.items=I.map((l,i)=>{const gg=E('g',{},g),y=180+i*128;E('text',{x:90,y:y+22,class:'mono t-num s-a',text:String(i+1)},gg);txt(gg,170,y,l[0],'t-big s-ink');txt(gg,170,y+42,l[1],'t-big s-dim');return gg;});
  },
  render(){this.items.forEach((g,i)=>{const o=clamp(this.p.n-i,0,1);g.style.opacity=o;g.setAttribute('transform',`translate(${((1-o)*-16).toFixed(1)} 0)`);});}
});


/* ---------- le script : 36 étapes ---------- */
const BEATS=[{name:'L’énigme'},{name:'Le messager'},{name:'La transcription'},{name:'Le code'},{name:'La traduction'},{name:'La mutation'},{name:'Au bac'}];
const BET=t=>({opts:t.map(([x,fb])=>({t:x,fb}))});
const G6=A_HBS.cN,G6S=A_HBS.cM,G6A=A_SIL.cM;                       // GAG, GTG, GAA — calculés
const STEPS=[
/* 0 */ {beat:0,scene:'drep',set:{cell:1,morph:0},seq:[{p:{morph:1},d:2600,w:900}],
  text:'Regarde ce globule rouge. D’habitude, c’est un disque souple qui se plie pour passer dans les plus fins vaisseaux. Chez les personnes atteintes de <b>drépanocytose</b>, quand l’oxygène manque, il se déforme en faucille et se rigidifie. Il bouche les petits vaisseaux : crises douloureuses, anémie.'},
/* 1 */ {beat:0,scene:'drep',tag:'1949 · 1957',set:{cell:0,chainV:1,chain:0,six:0},seq:[{p:{chain:1},d:2200,w:300},{p:{six:1},d:800,w:400}],
  text:`En 1949, Linus Pauling et ses collègues montrent que l’hémoglobine des malades n’est pas la même : dans un champ électrique, elle ne migre pas comme l’hémoglobine normale. En 1957, Vernon Ingram trouve la différence : un seul acide aminé, une ${NOM[A_HBS.aM]} à la place d’un ${NOM[A_HBS.aN]}. C’est le 6ᵉ des ${L_MURE} de la chaîne β.`},
/* 2 */ {beat:0,scene:'drep',set:{chainV:0,six:0,grid:0},seq:[{p:{grid:1},d:1200}],
  text:`Ces ${L_MURE} acides aminés sont écrits dans un gène, sur le chromosome 11. La partie du gène qui code la chaîne β compte ${CDS.length} lettres. Pour qu’un seul acide aminé change, combien de lettres du gène ont dû changer ?`,
  pari:BET([['Une seule lettre','Pari noté. Pour trancher, il faut comprendre comment une suite de lettres devient une protéine : c’est le chemin de cette séance. Tu vérifieras ton pari toi-même, dans l’atelier.'],['Quelques lettres','Pari noté. Pour trancher, il faut comprendre comment une suite de lettres devient une protéine : c’est le chemin de cette séance. Tu vérifieras ton pari toi-même, dans l’atelier.'],['Des dizaines de lettres','Pari noté. Pour trancher, il faut comprendre comment une suite de lettres devient une protéine : c’est le chemin de cette séance. Tu vérifieras ton pari toi-même, dans l’atelier.']])},
/* 3 */ {beat:1,scene:'cell',set:{on:0,ribo:0},seq:[{p:{on:1},d:1200},{p:{ribo:1},d:1200,w:500}],
  text:'D’abord, les acteurs. Le gène est un morceau d’ADN, rangé dans le noyau — et l’ADN ne quitte jamais le noyau. L’hémoglobine, elle, se fabrique dans le cytoplasme, sur de petites machines : les <b>ribosomes</b>. Ces cellules sont les futurs globules rouges, dans la moelle osseuse.'},
/* 4 */ {beat:1,scene:'cell',set:{q:1},
  text:'L’ADN reste dans le noyau ; les ribosomes travaillent dehors. Comment l’information du gène arrive-t-elle jusqu’à eux ?',
  pari:{label:'Ton pari',reveal:[{p:{q:0,msg:1},d:2400}],opts:[
    {t:'L’ADN sort du noyau, le temps de la lecture',fb:'Non : l’ADN ne quitte pas le noyau. Regarde : c’est une copie du gène qui sort.'},
    {t:'Une copie du gène sort du noyau',ok:true,fb:'Oui. Une copie d’un seul gène, faite d’ARN, sort par un pore du noyau et rejoint les ribosomes : c’est l’<b>ARN messager</b> (ARNm).'},
    {t:'Les ribosomes entrent dans le noyau',fb:'Non : les ribosomes restent dans le cytoplasme. Regarde : c’est une copie du gène qui vient à eux.'}]}},
/* 5 */ {beat:1,scene:'cell',set:{q:0,msg:1},seq:[{p:{names:1},d:1200}],
  text:'Le chemin a donc deux étapes, et le bac attend ces deux mots exacts. Dans le noyau, la <b>transcription</b> copie le gène en ARN messager. Dans le cytoplasme, la <b>traduction</b> change ce message en protéine.'},
/* 6 */ {beat:2,scene:'trans',set:{dna:0},seq:[{p:{dna:1},d:1400}],
  text:`Zoom sur le tout début du gène : ${TR_COD.length} paires de lettres. Ces lettres sont des <b>bases</b> — A, T, G, C — et elles s’apparient toujours de la même façon : A avec T, G avec C.`},
/* 7 */ {beat:2,scene:'trans',seq:[{p:{open:1},d:2000,w:200}],
  text:'Pour copier, une enzyme, l’<b>ARN polymérase</b>, écarte les deux brins sur une petite longueur, le temps de la copie.'},
/* 8 */ {beat:2,scene:'trans',seq:[{p:{tpl:1},d:1000}],
  text:'Un seul des deux brins sert de modèle : le <b>brin transcrit</b>, en bas. L’autre, le brin non transcrit, ne sera pas lu.'},
/* 9 */ {beat:2,scene:'trans',seq:[{p:{n:1},d:900,w:300},{p:{fo:1},d:500}],
  text:`L’ARN polymérase lit le brin transcrit lettre par lettre. En face du ${TR_TPL[0]}, elle a placé un ${TR_ARN[0]}. La lettre suivante est un ${TR_TPL[1]}. En face, elle place… ?`,
  pari:{label:'Ton pari',reveal:[{p:{n:3,fo:0},d:1400}],opts:[
    {t:'T, comme dans l’ADN',fb:'L’ARN n’a pas de T : à sa place, il a U (l’uracile). En face d’un A de l’ADN, l’ARN met toujours un U.'},
    {t:'U',ok:true,fb:'Oui. L’ARN n’a pas de T, il a U (l’uracile). En face de A, c’est U.'},
    {t:'A, la même lettre',fb:'Une copie se fait par complémentarité, pas à l’identique : en face de A, il faut son partenaire. Dans l’ARN, le partenaire de A est U.'}]}},
/* 10 */ {beat:2,scene:'trans',set:{n:3,fo:0},seq:[{p:{n:21},d:4200,w:200}],
  text:'Lettre par lettre, l’ARNm s’allonge. L’ARN polymérase lit le brin transcrit de 3′ vers 5′ et construit l’ARNm de 5′ vers 3′. Repère les U : chacun est en face d’un A.'},
/* 11 */ {beat:2,scene:'trans',
  text:'Compare l’ARNm aux deux brins d’ADN. Sa suite de lettres est la même que celle…',
  pari:{label:'Ton pari',reveal:[{p:{cmp:1},d:2000}],opts:[
    {t:'du brin transcrit',fb:'C’est le piège le plus courant. L’ARNm est complémentaire du brin transcrit : il a donc les lettres de l’autre brin, le non transcrit, avec U à la place de T. Regarde.'},
    {t:'du brin non transcrit, avec U à la place de T',ok:true,fb:'Exactement : complémentaire du brin transcrit, donc identique au brin non transcrit, U à la place de T. Au bac, c’est le premier réflexe.'},
    {t:'d’aucun des deux',fb:'Regarde : il est identique au brin non transcrit, à un détail près — U à la place de T.'}]}},
/* 12 */ {beat:2,scene:'trans',seq:[{p:{lv:1},d:1800,w:300}],
  text:'Copie terminée : l’ARNm se détache et quitte le noyau. Le gène, lui, reste intact dans le noyau, prêt à être copié de nouveau.'},
/* 13 */ {beat:2,scene:'trans',seq:[{p:{rules:1},d:1000}],
  text:'Ce que tu viens de voir s’appelle la <b>transcription</b>. Retiens-la en une phrase : l’ARNm est complémentaire du brin transcrit, donc il a la séquence du brin non transcrit, avec U à la place de T.'},
/* 14 */ {beat:3,scene:'code',set:{need:1},
  text:'L’ARNm n’a que 4 lettres : A, U, G, C. Les protéines, elles, sont faites de 20 acides aminés différents. Combien de lettres faut-il, au minimum, pour désigner chacun ?',
  pari:{label:'Ton pari',reveal:[{p:{tri:3},d:2400},{p:{fill:1},d:900}],opts:[
    {t:'1 lettre',fb:'Avec 1 lettre, seulement 4 mots. Il en faut 20. Regarde.'},
    {t:'2 lettres',fb:'Avec 2 lettres : 4 × 4 = 16 mots, encore trop peu pour 20. Regarde.'},
    {t:'3 lettres',ok:true,fb:'Oui : 4 × 4 × 4 = 64 mots, assez pour 20 — et même trop. Ce mot de trois lettres s’appelle un <b>codon</b>.'}]}},
/* 15 */ {beat:3,scene:'code',tag:'Mai 1961',set:{need:0,tri:0,fill:0},seq:[{p:{pu:1},d:1200,w:300}],
  text:'1961. On soupçonne un code, personne ne sait le lire. Marshall Nirenberg et Heinrich Matthaei fabriquent un ARN artificiel qui n’a qu’une seule lettre : UUUUUU… Ils le donnent à un extrait de bactéries capable de fabriquer des protéines. Que fabrique-t-il ?',
  pari:{label:'Ton pari',reveal:[{p:{pf:1},d:1800}],opts:[
    {t:'Rien : ce n’est pas un vrai gène',fb:`Il a pourtant fabriqué quelque chose : une chaîne d’un seul acide aminé, la ${NOM[CODE.UUU]}. UUU signifie donc ${AA3[CODE.UUU]} : le premier mot du code est lu.`},
    {t:'Une chaîne d’un seul acide aminé, répété',ok:true,fb:`Oui : de la ${NOM[CODE.UUU]}, ${AA3[CODE.UUU]} – ${AA3[CODE.UUU]} – ${AA3[CODE.UUU]}… UUU signifie donc ${AA3[CODE.UUU]}. Le premier mot du code est lu, le 27 mai 1961.`},
    {t:'Une protéine au hasard',fb:`Pas au hasard : une chaîne d’un seul acide aminé, la ${NOM[CODE.UUU]}. UUU signifie donc ${AA3[CODE.UUU]} : le premier mot du code est lu.`}]}},
/* 16 */ {beat:3,scene:'code',tag:'Août 1961 · Moscou',set:{pu:0,pf:0},seq:[{p:{tab:1},d:1400,w:300}],
  text:'À Moscou, en août 1961, Nirenberg présente son résultat devant une petite salle. Francis Crick l’apprend et le fait reparler devant tout le congrès. La course est lancée : en 1966, tous les codons des acides aminés sont déchiffrés. Voici le résultat — le tableau que le sujet du bac te donne.'},
/* 17 */ {beat:3,scene:'code',set:{sel:'···'},ctl:'table',
  text:`À toi de lire le tableau. Première lettre du codon : la grande ligne. Deuxième : la colonne. Troisième : la petite ligne dans la case. Compose un codon avec les boutons, ou clique dans le tableau. Défi : ${toARN(G6)}, puis ${toARN(G6S)}, puis un codon stop.`},
/* 18 */ {beat:4,scene:'transl',set:{on:1,k:0,end:0,met:0},seq:[{p:{k:1},d:1800,w:600}],
  text:`Dans le cytoplasme, un ribosome se fixe sur l’ARNm, au codon ${TL_ARN.slice(0,3)} : la lecture commence toujours là. Un <b>ARN de transfert</b> (ARNt) arrive. Il porte une ${NOM[CODE[TL_ARN.slice(0,3)]]} et, à l’autre bout, un <b>anticodon</b>, ${anticodon(TL_ARN.slice(0,3))}, qui s’apparie au codon.`},
/* 19 */ {beat:4,scene:'transl',ctl:'ribo',
  text:'À toi : fais avancer le ribosome, codon par codon. À chaque pas, l’ARNt dont l’anticodon s’apparie au codon apporte son acide aminé, et la chaîne s’allonge d’un maillon. Va jusqu’au 7ᵉ codon.'},
/* 20 */ {beat:4,scene:'transl',set:{k:NB},seq:[{p:{end:1},d:1400,w:300}],
  text:`Le ribosome continue ainsi jusqu’au bout du message. À la fin, il rencontre ${FIN.slice(9)} : aucun ARNt ne lui correspond. C’est un <b>codon stop</b>. Le ribosome se détache et libère la chaîne : ${NORMAL.aa.length} acides aminés.`},
/* 21 */ {beat:4,scene:'transl',seq:[{p:{met:1},d:1600,w:300}],
  text:`Dernière retouche : la ${NOM[NORMAL.aa[0]]} du début est détachée. La chaîne β commence donc par la ${NOM[NORMAL.aa[1]]}. Voilà pourquoi on compte ${AA3[NORMAL.aa[1]]} = 1 : l’${NOM[NORMAL.aa[6]]} d’Ingram est le n° 6… porté par le 7ᵉ codon.`},
/* 22 */ {beat:5,scene:'atelier',set:{on:1,mut:'',sel:C6+1,prot:1,ver:1},ctl:'atelier',
  text:'L’atelier : les codons 1 à 7, leur ARNm, leur chaîne. Choisis une lettre de l’ADN (clic ou flèches), puis change-la. Défi : remplace l’acide glutamique n° 6 par une valine.'},
/* 23 */ {beat:5,scene:'atelier',set:{mut:HBS,sel:C6+1},
  text:()=>`Une seule lettre : le ${G6[1]} du milieu de ${G6} devient ${G6S[1]}. Sur l’ARNm, ${toARN(G6)} devient ${toARN(G6S)} — et ${toARN(G6S)}, c’est ${AA3[A_HBS.aM]}. ${S.first[2]==null?'':S.first[2]===0?'Ton pari du début était le bon. ':'Tu avais parié plus : une seule suffit. '}Changer une base pour une autre, c’est une <b>substitution</b> ; comme l’acide aminé change, on dit <b>faux-sens</b>. Voici l’allèle βS, celui de la drépanocytose.`},
/* 24 */ {beat:5,scene:'atelier',set:{mut:'',sel:C6+2},
  text:`Autre essai, au même codon : le dernier ${G6[2]} de ${G6} devient ${G6A[2]}. Sur l’ARNm, ${toARN(G6)} devient ${toARN(G6A)}. Que devient la protéine ?`,
  pari:{label:'Ton pari',reveal:[{p:{mut:SIL},d:600}],opts:[
    {t:'Rien ne change',ok:true,fb:`Oui : ${toARN(G6A)} code aussi l’${NOM[A_SIL.aM]}. Le code est <b>redondant</b> : plusieurs codons pour un même acide aminé. Mutation <b>silencieuse</b> : l’allèle change, la protéine non.`},
    {t:'Un acide aminé change',fb:`Regarde le tableau : ${toARN(G6A)} code ${AA3[A_SIL.aM]}, comme ${toARN(G6)}. La protéine ne change pas : mutation <b>silencieuse</b>. Le code est redondant.`},
    {t:'La chaîne s’arrête',fb:`${toARN(G6A)} n’est pas un codon stop (UAA, UAG, UGA) : il code ${AA3[A_SIL.aM]}, comme ${toARN(G6)}. Mutation <b>silencieuse</b> : la protéine ne change pas.`}]}},
/* 25 */ {beat:5,scene:'atelier',set:{mut:'',sel:C6+1},
  text:`Dernier essai : on supprime une seule lettre, le ${G6[1]} de ${G6}, sans la remplacer. Combien d’acides aminés vont changer ?`,
  pari:{label:'Ton pari',reveal:[{p:{mut:FS6},d:600}],opts:[
    {t:'Un seul',fb:`Plus que ça. Le ribosome lit trois par trois depuis AUG : une lettre en moins décale toute la lecture. Tous les codons suivants changent, et un codon stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`},
    {t:'Tous ceux qui suivent',ok:true,fb:`Oui. Le ribosome lit trois par trois depuis AUG : une lettre en moins décale toute la lecture — c’est un <b>décalage du cadre de lecture</b>. Un codon stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`},
    {t:'Aucun',fb:`Le code est redondant, mais pas à ce point : une lettre en moins décale toute la lecture. Tous les codons suivants changent, et un stop arrive vite : ${A_FS6.len} acides aminés au lieu de ${L_MURE}.`}]}},
/* 26 */ {beat:5,scene:'levels',set:{lv:1},seq:[{p:{m1:1},d:1800,w:300},{p:{c1:1},d:1200,w:600}],
  text:'Retour à l’énigme. À l’échelle <b>moléculaire</b> : quand l’oxygène manque, la valine rend l’hémoglobine S collante, et ses molécules s’assemblent en longues fibres. À l’échelle <b>cellulaire</b> : ces fibres déforment le globule rouge en faucille.'},
/* 27 */ {beat:5,scene:'levels',seq:[{p:{o1:1},d:1200,w:200},{p:{flow:1},d:900,w:500}],
  text:'À l’échelle de l’<b>organisme</b> : les globules en faucille bouchent les petits vaisseaux — crises douloureuses — et sont détruits trop vite — anémie. Une lettre, un acide aminé, un caractère : c’est la relation gène → protéine → caractère que le bac attend.'},
/* 28 */ {beat:5,scene:'levels',tag:'Maroc',set:{lv:0},seq:[{p:{map:1},d:1400}],
  text:`Ce que ça a changé : depuis Ingram, on lit les maladies héréditaires lettre par lettre. Au Maroc, la β-thalassémie est un problème de santé majeur, et les généticiens y ont identifié les allèles les plus fréquents. Parmi eux : la délétion que tu viens de faire au codon 6, et une substitution au codon ${B39}. Les connaître permet de dépister les porteurs.`},
/* 29 */ {beat:6,scene:'bac',set:{doc:0},seq:[{p:{doc:1},d:1000}],
  text:`Voici l’exercice qui revient presque chaque année au bac : le brin transcrit de l’allèle normal et de l’allèle muté, et le tableau du code. Ici, la β-thalassémie du codon ${B39}. Quel est ton premier geste ?`,
  pari:{label:'Réponds',reveal:[{p:{e1:1},d:1400}],opts:[
    {t:'Lire les codons directement sur ces brins',fb:'Le tableau du code est écrit en codons d’ARNm, et ce brin est le brin transcrit, le complémentaire. Premier geste : écrire l’ARNm. Regarde.'},
    {t:'Écrire l’ARNm, complémentaire du brin transcrit',ok:true,fb:'Oui. Le tableau se lit en codons d’ARNm : on transcrit d’abord, base par base, avec U en face de A.'},
    {t:'Chercher la maladie dans le cours',fb:'Le correcteur attend la démarche : ARNm, puis codons, puis comparaison. La maladie vient en dernier, comme conclusion. Premier geste : écrire l’ARNm.'}]}},
/* 30 */ {beat:6,scene:'bac',seq:[{p:{e2:1},d:1400}],
  text:()=>{const n=traduire(BAC_N).aa,m=[];for(let c=0;c<BN;c++){const a=aaDe(BAC_M.slice(3*c,3*c+3));if(a==='*')break;m.push(a);}
    return `Deuxième geste : découpe l’ARNm en codons, dans le bon cadre, et lis chacun dans le tableau. L’allèle normal donne ${chaine(n)}. L’allèle muté donne ${chaine(m)}… puis ${toARN(A_B.cM)} : un codon stop.`;}},
/* 31 */ {beat:6,scene:'bac',seq:[{p:{e3:1},d:1200}],
  text:'Troisième geste : compare, nomme, relie. Voici une rédaction qui prend tous les points.',
  html:()=>`<ol class="eg-ans"><li>Une seule base diffère : sur le brin transcrit, ${compl(A_B.cN)[0]} devient ${compl(A_B.cM)[0]} ; le codon ${B39} ${toARN(A_B.cN)} devient ${toARN(A_B.cM)}. C’est une mutation par <b>substitution</b>.</li><li>${toARN(A_B.cM)} est un codon stop : la chaîne s’arrête après ${A_B.len} acides aminés au lieu de ${L_MURE}. C’est une mutation <b>non-sens</b>.</li><li>La chaîne β n’est pas fabriquée en entier : les globules rouges manquent d’hémoglobine. C’est la <b>β-thalassémie</b>.</li></ol>`},
/* 32 */ {beat:6,scene:'quiz',set:{qi:0,rv:0},
  text:'Trois questions, chacune sur une erreur classique des copies. D’abord : voici un fragment du brin transcrit. Quel est l’ARNm ?',
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:`5′-${groupe(toARN(Q1T))}-3′`,fb:'Tu as recopié le brin transcrit en changeant T en U. Mais l’ARNm est son complémentaire : il a les lettres de l’autre brin.'},
    {t:`5′-${groupe(toARN(Q1C))}-3′`,ok:true,fb:'Oui : complémentaire du brin transcrit, avec U en face de A.'},
    {t:`5′-${groupe(Q1C)}-3′`,fb:'Les bonnes bases… mais avec des T. Un ARN n’a jamais de T : U à la place.'}]}},
/* 33 */ {beat:6,scene:'quiz',set:{qi:1,rv:0},
  text:'Deuxième : le cadre de lecture. Une seule lettre disparaît de cet ARNm. Que devient la chaîne ?',
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:Q2_MOINS,fb:'Ce serait vrai si on supprimait un codon entier, trois lettres. Une seule lettre en moins décale tout ce qui suit.'},
    {t:Q2_PAREIL,fb:'Le ribosome lit trois par trois depuis AUG, sans repère entre les codons : une lettre en moins décale tout ce qui suit.'},
    {t:Q2_OK,ok:true,fb:'Oui : une lettre en moins décale la lecture, et un codon stop apparaît aussitôt.'}]}},
/* 34 */ {beat:6,scene:'quiz',set:{qi:2,rv:0},
  text:'Dernière : gène, allèle, code. Les trois mots que les copies mélangent.',
  pari:{reveal:[{p:{rv:1},d:900}],opts:[
    {t:'L’allèle : une autre version du même gène',ok:true,fb:'Oui : même gène (HBB, chromosome 11), autre version — l’allèle βS. Le code, lui, est le même chez tous les êtres vivants.'},
    {t:'Le gène : c’est un autre gène',fb:'C’est le même gène, au même endroit du chromosome 11. Une version différente d’un gène s’appelle un allèle.'},
    {t:'Le code génétique de cette personne',fb:`Le code est universel : ${toARN(A_HBS.cM)} signifie ${AA3[A_HBS.aM]} chez tous les êtres vivants. Ce qui change, c’est le message (l’allèle), pas le dictionnaire.`}]}},
/* 35 */ {beat:6,scene:'end',seq:[{p:{n:4},d:2800,w:300}],
  text:'Fin de la séance. Voici ce que l’application retiendrait de toi.',html:()=>profileHTML()}
];

/* états de scène : chaque étape hérite de la précédente sur la même scène */
const S={ans:{},first:{},hbs:false,types:new Set(),look:new Set()};
{const last={};STEPS.forEach((st,i)=>{st.id=i;const sc=scenes[st.scene];const prev=last[st.scene]||{...sc.defaults};st.base={...prev,...(st.set||{})};const f={...st.base};(st.seq||[]).forEach(x=>Object.assign(f,x.p));st.pre={...f};if(st.pari&&st.pari.reveal)st.pari.reveal.forEach(x=>Object.assign(f,x.p));last[st.scene]=f;});}

function profileHTML(){
  const ids=[32,33,34],names=['lire le bon brin (U, jamais T)','le cadre de lecture','gène, allèle, code'];
  const res=ids.map(id=>S.first[id]==null?null:!!STEPS[id].pari.opts[S.first[id]].ok);
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${names[i]}</li>`).join('');
  const weak=res.map((ok,i)=>ok===false?names[i]:null).filter(Boolean);
  const bets=[];
  if(S.first[2]!=null)bets.push(S.first[2]===0?'« une seule lettre » deviné':'« une seule lettre » t’a surpris');
  if(S.first[11]!=null)bets.push(STEPS[11].pari.opts[S.first[11]].ok?'piège du brin évité':'piège du brin : tombé une fois');
  if(S.hbs)bets.push('drépanocytose trouvée sans aide');
  if(S.types.size)bets.push(`${S.types.size} type${S.types.size>1?'s':''} de mutation produit${S.types.size>1?'s':''}`);
  const plan=(weak.length?weak.map(w=>`<li>8 exercices courts sur « ${w} »</li>`).join(''):'<li>Aucune erreur au contrôle : directement le niveau bac</li>')
    +'<li>1 exercice bac complet, corrigé pas à pas</li><li>Dans 3 jours : 4 questions de rappel</li><li>Ensuite : βS et le paludisme (Allison, 1954)</li>';
  return ty(`<ul class="prof">${rows}</ul>${bets.length?`<p class="small">Tes gestes : ${bets.join(' · ')}.</p>`:''}<div class="next"><div class="pari-k">Ta prochaine séance, générée pour toi</div><ol>${plan}</ol></div><p class="small">Aperçu : la génération d’exercices n’est pas encore branchée.</p>`);
}


/* ---------- contrôles par étape ---------- */
const CTL={
  table:{html:()=>`<div class="ctl eg-ctl">${['1ʳᵉ lettre','2ᵉ lettre','3ᵉ lettre'].map((l,k)=>`<div class="eg-row"><span class="eg-k">${l}</span><div class="eg-grp" role="group" aria-label="${l}">${B4.split('').map(b=>`<button type="button" class="eg-btn" data-k="${k}" data-b="${b}" aria-pressed="false">${b}</button>`).join('')}</div></div>`).join('')}</div><p class="ctl-note" id="tabfb"></p>`,
    init(){const sc=scenes.code;
      const goals=[toARN(G6),toARN(G6S),'stop'];
      const sync=()=>{const s=sc.p.sel||'···';
        root.querySelectorAll('.eg-btn[data-k]').forEach(b=>b.setAttribute('aria-pressed',String(s[+b.dataset.k]===b.dataset.b)));
        let m;const full=!s.includes('·');
        if(!full)m=`Codon : <b>${s}</b>`;
        else{const a=CODE[s];S.look.add(a==='*'?'stop':s);
          m=a==='*'?`<b>${s}</b> : aucun acide aminé. C’est un <b>codon stop</b> (on dit aussi non-sens) : la traduction s’arrête là.`
            :`<b>${s}</b> → <b>${AA3[a]}</b> (${NOM[a]}).${s==='AUG'?' C’est aussi le codon de départ : toute lecture commence par AUG.':''}${s===toARN(G6S)?' Retiens-le : il reviendra.':''}`;}
        m+=`<br>Défi : ${goals.map(gl=>`${S.look.has(gl)?'✓':'·'} ${gl==='stop'?'un codon stop':gl}`).join('  ')}`;
        $('#tabfb').innerHTML=ty(m);};
      root.querySelectorAll('.eg-btn[data-k]').forEach(b=>b.addEventListener('click',()=>{const s=(sc.p.sel||'···').split('');const k=+b.dataset.k;s[k]=b.dataset.b;sc.p.sel=s.join('');sc.render();sync();}));
      hooks.onCodon=sync;sync();}},
  ribo:{html:()=>`<div class="ctl eg-ctl"><div class="eg-grp"><button type="button" class="eg-btn eg-wide" id="rbm">← Recule</button><button type="button" class="eg-btn eg-wide" id="rbp">Avance d’un codon →</button></div></div><p class="ctl-note" id="ribofb"></p>`,
    init(){const sc=scenes.transl;
      const sync=()=>{const k=clamp(Math.round(sc.p.k),1,NB),c=TL_ARN.slice(3*(k-1),3*k),a=CODE[c];
        $('#rbm').disabled=k<=1;$('#rbp').disabled=k>=NB;
        const ch=traduire(CDS.slice(0,3*k)).aa;
        $('#ribofb').innerHTML=ty(`${ORD(k)} codon : <b>${c}</b> · anticodon de l’ARNt : <b>${anticodon(c)}</b> → <b>${AA3[a]}</b> (${NOM[a]}).<br>Chaîne : ${chaine(ch)}${k>=NB?'. Tu viens de fabriquer le début de la chaîne β.':''}`);};
      const goK=k=>{const my=++run;tweenTo(sc,{k:clamp(k,1,NB)},700,my).then(()=>{if(my===run)sync();});};
      $('#rbp').addEventListener('click',()=>goK(Math.round(sc.p.k)+1));
      $('#rbm').addEventListener('click',()=>goK(Math.round(sc.p.k)-1));
      sync();}},
  atelier:{html:()=>`<div class="ctl eg-ctl">
<div class="eg-row"><button type="button" class="eg-btn" id="agl" aria-label="Lettre précédente">←</button><output id="agpos" class="eg-pos"></output><button type="button" class="eg-btn" id="agr" aria-label="Lettre suivante">→</button></div>
<div class="eg-row"><span class="eg-k">Remplacer par</span><div class="eg-grp" role="group" aria-label="Remplacer la lettre par">${'ATGC'.split('').map(b=>`<button type="button" class="eg-btn" data-sub="${b}">${b}</button>`).join('')}</div></div>
<div class="eg-row"><span class="eg-k">Insérer avant</span><div class="eg-grp" role="group" aria-label="Insérer une lettre avant">${'ATGC'.split('').map(b=>`<button type="button" class="eg-btn" data-ins="${b}">${b}</button>`).join('')}</div></div>
<div class="eg-grp"><button type="button" class="eg-btn eg-wide" id="agdel">Supprimer cette lettre</button><button type="button" class="eg-btn eg-wide" id="agrst">Allèle normal</button></div>
</div><p class="ctl-note" id="agfb"></p>`,
    init(){const sc=scenes.atelier;let dit='';
      const sync=()=>{const A=analyser(sc.p.mut),k=sc.p.sel,c=Math.floor(k/3),pos=k%3+1;
        const etat=!A.m||A.k!==k?CDS[k]:A.t==='s'?`${CDS[k]} → ${A.b}`:A.t==='d'?`${CDS[k]}, supprimée`:`${CDS[k]}, un ${A.b} inséré avant`;
        $('#agpos').textContent=ty(`codon ${c}, ${ORD(pos)} lettre : ${etat}`);
        $('#agl').disabled=k<=W0;$('#agr').disabled=k>=W0+WN-1;
        if(A.m)S.types.add(A.kind);
        const V=verdict(A);let m;
        if(dit)m=dit;
        else if(!A.m)m='Défi : trouve la lettre qui remplace l’acide glutamique n° 6 par une valine. Indice : dans le tableau, les codons de Val commencent par GU.';
        else m=`<b>${V.t}</b>. ${V.s}${V.n?' '+V.n:''}`;
        dit='';
        if(A.m===HBS){S.hbs=true;m+=' <b>Trouvé : une seule lettre a suffi.</b>';}
        if(S.types.size)m+=`<br>Déjà obtenus : ${[...S.types].join(', ')}.`;
        $('#agfb').innerHTML=nw(ty(m));};
      const set=m=>{run++;sc.p.mut=m;sc.render();sync();};
      $('#agl').addEventListener('click',()=>{sc.p.sel=clamp(sc.p.sel-1,W0,W0+WN-1);sc.render();sync();});
      $('#agr').addEventListener('click',()=>{sc.p.sel=clamp(sc.p.sel+1,W0,W0+WN-1);sc.render();sync();});
      root.querySelectorAll('[data-sub]').forEach(b=>b.addEventListener('click',()=>{const k=sc.p.sel,B=b.dataset.sub;if(CDS[k]===B)dit=`C’est déjà un ${B} dans l’allèle normal : l’atelier revient à l’allèle normal.`;set(CDS[k]===B?'':`s:${k}:${B}`);}));
      root.querySelectorAll('[data-ins]').forEach(b=>b.addEventListener('click',()=>set(`i:${sc.p.sel}:${b.dataset.ins}`)));
      $('#agdel').addEventListener('click',()=>set(`d:${sc.p.sel}`));
      $('#agrst').addEventListener('click',()=>set(''));
      hooks.onSel=sync;sync();}}
};

/* ---------- moteur (repris du moteur logarithme) ---------- */
function tweenTo(sc,target,d,my){
  const from={...sc.p},keys=Object.keys(target).filter(k=>from[k]!==target[k]);
  if(!keys.length)return Promise.resolve();
  if(RM.matches)d=0;
  return new Promise(res=>{const t0=performance.now();
    const step=now=>{if(my!==run)return res();
      const t=d?Math.min(1,(now-t0)/d):1,k=ease(t);
      for(const key of keys){const a=from[key],b=target[key];sc.p[key]=(typeof a==='number'&&typeof b==='number')?lerp(a,b,k):b;}
      sc.render();hooks.frame&&hooks.frame();
      if(t<1)requestAnimationFrame(step);else res();};
    requestAnimationFrame(step);});
}
let cur=-1,curScene=null;
async function animate(sc,st,my,fresh){
  if(fresh)await wait(300);else await tweenTo(sc,st.base,st.d||750,my);
  for(const f of st.seq||[]){if(my!==run)return;if(f.w){await wait(f.w);if(my!==run)return;}await tweenTo(sc,f.p,f.d||900,my);}
  if(st.pari&&st.pari.reveal&&S.ans[st.id]!=null)for(const f of st.pari.reveal){if(my!==run)return;await tweenTo(sc,f.p,f.d||900,my);}
}
function go(i){
  i=clamp(i,0,STEPS.length-1);const st=STEPS[i],sc=scenes[st.scene],my=++run;
  for(const k in hooks)delete hooks[k];
  let fresh=false;
  if(curScene!==sc){if(curScene){curScene.g.style.opacity=0;curScene.g.setAttribute('class','scene');}sc.p={...st.base};sc.render();sc.g.style.opacity=1;sc.g.setAttribute('class','scene on');curScene=sc;fresh=true;}
  cur=i;renderPanel(st);updateChrome(st);
  animate(sc,st,my,fresh);speak(st);
}
function textOf(st){return typeof st.text==='function'?st.text():st.text;}
function renderPanel(st){
  $('#kicker').textContent=`${String(st.beat+1).padStart(2,'0')} — ${BEATS[st.beat].name}`;
  let h=`<p class="say">${ty(textOf(st))}</p>`;
  if(st.html)h+=ty(st.html());
  if(st.pari)h+=pariHTML(st);
  if(st.ctl)h+=CTL[st.ctl].html();
  h+='<div class="fb" id="fb"></div>';
  const body=$('#body');body.innerHTML=nw(h);body.classList.remove('in');void body.offsetWidth;body.classList.add('in');
  $('#script').scrollTop=0;
  if(st.pari){wireOpts(st);if(S.ans[st.id]!=null)$('#fb').innerHTML=nw(ty(st.pari.opts[S.ans[st.id]].fb||''));}
  if(st.ctl)CTL[st.ctl].init();
  updateNav();
}
function isQuiz(P){return P.opts.some(o=>o.ok);}
function pariHTML(st){const P=st.pari,a=S.ans[st.id],q=isQuiz(P);
  return `<div class="pari"><div class="pari-k">${P.label||(q?'Réponds':'Ton pari')}</div><div class="opts">${P.opts.map((o,j)=>{let c='opt';if(a!=null){if(q){if(o.ok)c+=' ok';else if(a===j)c+=' ko';}else if(a===j)c+=' sel';}
    return `<button class="${c}" data-j="${j}"${a!=null&&!q?' disabled':''}><kbd>${j+1}</kbd><span>${ty(o.t)}</span></button>`;}).join('')}</div></div>`;}
function wireOpts(st){root.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>choose(st,+b.dataset.j)));}
function choose(st,j){
  const P=st.pari,q=isQuiz(P),first=S.ans[st.id]==null;
  if(!first&&!q)return;
  if(first)S.first[st.id]=j;S.ans[st.id]=j;
  root.querySelector('.pari').outerHTML=nw(pariHTML(st));wireOpts(st);
  const btn=root.querySelector(`.opt[data-j="${j}"]`);if(btn&&!btn.disabled)btn.focus();else $('#next').focus();
  $('#fb').innerHTML=nw(ty(P.opts[j].fb||''));
  if(first&&P.reveal){const my=++run,sc=scenes[st.scene];(async()=>{const fr0=[{p:{...st.pre,...P.reveal[0].p},d:P.reveal[0].d},...P.reveal.slice(1)];for(const f of fr0){if(my!==run)return;await tweenTo(sc,f.p,f.d||900,my);}})();}
  updateNav();say(plain(P.opts[j].fb||''));
}
function updateNav(){const st=STEPS[cur],n=$('#next'),blocked=!!(st.pari&&S.ans[st.id]==null);
  n.disabled=blocked;n.textContent=cur===STEPS.length-1?'Recommencer':blocked?'Choisis d’abord':'Suivant →';
  $('#prev').disabled=cur===0;$('#count').textContent=`étape ${cur+1} / ${STEPS.length}`;}
function next(){if($('#next').disabled)return;if(cur===STEPS.length-1){S.ans={};S.first={};S.hbs=false;S.types=new Set();S.look=new Set();go(0);}else go(cur+1);}

/* chapitres */
const beatEls=BEATS.map((b,k)=>{const n=STEPS.filter(s=>s.beat===k).length,btn=document.createElement('button');btn.type='button';btn.className='beat';btn.style.setProperty('--n',n);btn.innerHTML=`<span>${b.name}</span><i><b></b></i>`;btn.addEventListener('click',()=>go(STEPS.findIndex(s=>s.beat===k)));$('#beats').appendChild(btn);return btn;});
function updateChrome(st){
  BEATS.forEach((b,k)=>{const steps=STEPS.filter(s=>s.beat===k),f=steps[0].id,done=clamp((cur-f+1)/steps.length,0,1);beatEls[k].querySelector('b').style.width=(done*100)+'%';beatEls[k].classList.toggle('on',k===st.beat);if(k===st.beat)beatEls[k].setAttribute('aria-current','step');else beatEls[k].removeAttribute('aria-current');});
  const pl=$('#plaque');if(st.tag){pl.textContent=st.tag;pl.classList.add('on');}else pl.classList.remove('on');
}

/* voix */
let voiceOn=false;
function plain(h){return String(h).replace(/<[^>]+>/g,'').replace(/ | /g,' ')
  .replace(/(\d)′/g,'$1 prime').replace(/1ʳᵉ/g,'première').replace(/1ᵉʳ/g,'premier').replace(/(\d)ᵉ/g,'$1ième').replace(/n° /g,'numéro ')
  .replace(/β/g,'bêta ').replace(/×/g,' fois ').replace(/→/g,', ').replace(/−/g,'moins ').replace(/–/g,', ')
  .replace(/\b[ACGTU]{2,}\b/g,m=>m.split('').join(' '));}
function say(t){if(!voiceOn||!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';const vs=speechSynthesis.getVoices();const v=vs.find(v=>/^fr/i.test(v.lang)&&/Google|Amélie|Thomas|Audrey|Marie|Denise|Henri/i.test(v.name))||vs.find(v=>/^fr/i.test(v.lang));if(v)u.voice=v;speechSynthesis.speak(u);}
function speak(st){say(st.say||plain(ty(textOf(st))));}
const surVoix=e=>{voiceOn=!voiceOn;e.currentTarget.setAttribute('aria-pressed',String(voiceOn));if(voiceOn)speak(STEPS[cur]);else if('speechSynthesis' in window)speechSynthesis.cancel();};
$('#voice').addEventListener('click',surVoix);

$('#why').addEventListener('click',()=>$('#whyd').showModal());
$('#next').addEventListener('click',next);$('#prev').addEventListener('click',()=>go(cur-1));
const surTouche=e=>{
  if($('#whyd').open)return;const t=e.target;if(t.tagName==='INPUT')return;
  const st=STEPS[cur];
  if(st&&st.pari&&/^[1-3]$/.test(e.key)&&+e.key<=st.pari.opts.length){e.preventDefault();choose(st,+e.key-1);return;}
  if(e.key==='ArrowRight'||e.key==='PageDown'||(e.key===' '&&t.tagName!=='BUTTON')){e.preventDefault();next();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(cur-1);}
};
window.addEventListener('keydown',surTouche);
go(0);
return function demonter(){run++;window.removeEventListener('keydown',surTouche);if('speechSynthesis' in window)speechSynthesis.cancel();};

}
