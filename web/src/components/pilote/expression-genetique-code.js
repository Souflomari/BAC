/* eslint-disable */
// @ts-nocheck
/**
 * La donnée génétique de la leçon « Du gène à la protéine » : la vraie
 * séquence codante du gène HBB, le code génétique standard, et tous les
 * calculs qu'on en tire. Aucune dépendance au DOM : ce module se teste seul.
 *
 * RÈGLE — aucune traduction n'est tapée à la main. Les brins, l'ARNm, les
 * codons, les anticodons, les acides aminés, les longueurs de chaîne et le
 * classement des mutations sont CALCULÉS ici à partir de la séquence codante
 * du gène HBB (NCBI NM_000518.5, CDS 51..494, 444 nt) et de la table du code
 * génétique standard (NCBI, table 1). Au chargement, la traduction calculée
 * est comparée à la protéine publiée (NP_000509.1) : un écart s'écrit dans la
 * console. Les sources et le détail des faits vérifiés sont en tête de
 * `expression-genetique-moteur.js`.
 */

// NCBI NM_000518.5, CDS 51..494 (gène HBB, chaîne β de l'hémoglobine), brin non transcrit, 5′ → 3′.
export const CDS='ATGGTGCATCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGGCTGCTGGTGGTCTACCCTTGGACCCAGAGGTTCTTTGAGTCCTTTGGGGATCTGTCCACTCCTGATGCTGTTATGGGCAACCCTAAGGTGAAGGCTCATGGCAAGAAAGTGCTCGGTGCCTTTAGTGATGGCCTGGCTCACCTGGACAACCTCAAGGGCACCTTTGCCACACTGAGTGAGCTGCACTGTGACAAGCTGCACGTGGATCCTGAGAACTTCAGGCTCCTGGGCAACGTGCTGGTCTGTGTGCTGGCCCATCACTTTGGCAAAGAATTCACCCCACCAGTGCAGGCTGCCTATCAGAAAGTGGTGGCTGGTGTGGCTAATGCCCTGGCCCACAAGTATCACTAA';
// NCBI NP_000509.1 — sert UNIQUEMENT à vérifier la traduction calculée, jamais à l'afficher.
const PROT_NCBI='MVHLTPEEKSAVTALWGKVNVDEVGGEALGRLLVVYPWTQRFFESFGDLSTPDAVMGNPKVKAHGKKVLGAFSDGLAHLDNLKGTFATLSELHCDKLHVDPENFRLLGNVLVCVLAHHFGKEFTPPVQAAYQKVVAGVANALAHKYH';
// Table standard (NCBI table 1), dans l'ordre U C A G × U C A G × U C A G.
export const B4='UCAG';
const AA1='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
export const CODE={};for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)CODE[B4[i]+B4[j]+B4[k]]=AA1[16*i+4*j+k];
export const AA3={F:'Phe',L:'Leu',S:'Ser',Y:'Tyr',C:'Cys',W:'Trp',P:'Pro',H:'His',Q:'Gln',R:'Arg',I:'Ile',M:'Met',T:'Thr',N:'Asn',K:'Lys',V:'Val',A:'Ala',D:'Asp',E:'Glu',G:'Gly','*':'Stop'};
export const NOM={F:'phénylalanine',L:'leucine',S:'sérine',Y:'tyrosine',C:'cystéine',W:'tryptophane',P:'proline',H:'histidine',Q:'glutamine',R:'arginine',I:'isoleucine',M:'méthionine',T:'thréonine',N:'asparagine',K:'lysine',V:'valine',A:'alanine',D:'acide aspartique',E:'acide glutamique',G:'glycine','*':'aucun acide aminé'};
// les 20 acides aminés, par ordre alphabétique de leur abréviation à trois lettres
export const VINGT=Object.keys(AA3).filter(k=>k!=='*').sort((a,b)=>AA3[a]<AA3[b]?-1:1);
export const PAIRE={A:'T',T:'A',G:'C',C:'G'},PAIRE_ARN={A:'U',U:'A',G:'C',C:'G'};
export const toARN=s=>s.replace(/T/g,'U');
export const compl=s=>s.split('').map(b=>PAIRE[b]).join('');          // brin transcrit, écrit 3′ → 5′
export const anticodon=c=>c.split('').map(b=>PAIRE_ARN[b]).join('');   // écrit 3′ → 5′, aligné sous le codon
export const aaDe=c=>CODE[toARN(c)];
export const groupe=s=>(s.match(/.{1,3}/g)||[]).join(' ');
export function traduire(adn){const aa=[];for(let i=0;i+3<=adn.length;i+=3){const a=aaDe(adn.slice(i,i+3));if(a==='*')return{aa,stop:i/3};aa.push(a);}return{aa,stop:-1};}
export const chaine=(aa,sep)=>aa.map(a=>AA3[a]).join(sep||' – ');
export const NORMAL=traduire(CDS);                 // aa avec la Met initiale
export const L_MURE=NORMAL.aa.length-1;            // 146 : la Met est retirée
if(NORMAL.aa.join('')!==PROT_NCBI)console.warn('[pilote expression-génétique] la traduction calculée diffère de NP_000509.1');
// les codons et les familles, calculés sur la table
export const CODONS=Object.keys(CODE);
export const N_SENS=CODONS.filter(c=>CODE[c]!=='*').length;                  // 61
export const STOPS=CODONS.filter(c=>CODE[c]==='*');                            // UAA, UAG, UGA
export const nCodons=a=>CODONS.filter(c=>CODE[c]===a).length;

// une mutation : '' · 's:i:B' (substitution) · 'd:i' (délétion) · 'i:i:B' (insertion avant i) ; i = indice dans CDS
export function appliquer(m){if(!m)return CDS;const[t,i,b]=m.split(':'),k=+i;if(t==='s')return CDS.slice(0,k)+b+CDS.slice(k+1);if(t==='d')return CDS.slice(0,k)+CDS.slice(k+1);return CDS.slice(0,k)+b+CDS.slice(k);}
export function analyser(m){
  const seq=appliquer(m),tr=traduire(seq),A={m,seq,tr,kind:'normal'};
  if(!m)return A;
  const[t,i,b]=m.split(':'),k=+i,j=Math.floor(k/3);Object.assign(A,{t,k,b,j});
  if(t==='s'){A.cN=CDS.slice(3*j,3*j+3);A.cM=seq.slice(3*j,3*j+3);A.aN=aaDe(A.cN);A.aM=aaDe(A.cM);
    A.kind=A.aN===A.aM?'silencieuse':A.aM==='*'?'non-sens':'faux-sens';}
  else{A.kind='décalage';let f=-1;for(let p=0;p<Math.max(tr.aa.length,NORMAL.aa.length);p++)if(tr.aa[p]!==NORMAL.aa[p]){f=p;break;}A.first=f;}
  A.len=tr.stop>0?tr.stop-1:null;            // longueur de la chaîne mûre (sans la Met)
  return A;}
export const CONNUS={'s:19:T':'C’est l’allèle βS : celui de la drépanocytose.','s:18:A':'C’est l’allèle βC, celui de l’hémoglobine C.','d:19':'Cet allèle existe : FSC 6 (−A), l’une des principales mutations de β-thalassémie au Maroc.'};
export const ORD=n=>n===1?'1ʳᵉ':n+'ᵉ';

/* NUMÉROTATION — une seule règle, celle des sujets : on compte les triplets depuis le premier
   triplet MONTRÉ. L'indice j d'un codon dans CDS (AUG = 0) est donc le numéro du triplet dans
   l'atelier, qui commence au triplet de Val (j = 1) ; c'est aussi la numérotation des médecins
   pour la chaîne β, qui ne compte pas la méthionine retirée (Glu n° 6 = codon j = 6). */

// les mutations scénarisées (indices calculés depuis le codon 6, GAG)
export const C6=18, HBS='s:'+(C6+1)+':T', SIL='s:'+(C6+2)+':A', FS6='d:'+(C6+1), NS6='s:'+C6+':T';
export const A_HBS=analyser(HBS),A_SIL=analyser(SIL),A_FS6=analyser(FS6),A_NS6=analyser(NS6);
// l'insertion de l'atelier : un G ajouté au début du triplet 3 (décalage du cadre de lecture)
export const C3=9, INS3='i:'+C3+':G', A_INS=analyser(INS3);
// l'exercice type bac : codons 37 à 41 de la chaîne β (substitution C → T au codon 39), montrés
// au bac comme un fragment de 5 triplets : le triplet muté est le 3ᵉ du document
export const BK=37,BN=5,B39=39,BMUT='s:'+(3*B39)+':T',A_B=analyser(BMUT),B_TRIPLET=B39-BK+1;
export const BAC_N=CDS.slice(3*BK,3*(BK+BN)),BAC_M=A_B.seq.slice(3*BK,3*(BK+BN));

// la transcription du tout début du gène (21 bases) : scène, pari, règle
export const TR_COD=CDS.slice(0,21),TR_TPL=compl(TR_COD),TR_ARN=toARN(TR_COD);
// la lecture du ribosome : l'ARNm du début (8 codons : le site A dépasse le 7ᵉ), et les quatre
// derniers codons (stop compris)
export const TL_ARN=toARN(CDS.slice(0,24)),NB=7;
export const FIN=toARN(CDS.slice(-12));
// un ARNm lu de bout en bout : codon d'initiation, deux codons, codon stop (le début de HBB)
export const DECODE=toARN(CDS.slice(0,9))+'UAA';
// la question « codon d'initiation et codon stop » du bilan : deux nucléotides avant AUG, un
// codon après le stop
export const Q_AUG='CU'+toARN(CDS.slice(0,12))+'UGA'+'GCC';
