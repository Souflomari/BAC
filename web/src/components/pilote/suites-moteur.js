/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Les suites numériques », séance 1 « La machine u(n+1) = f(u(n)) » (format v3). Plan d'auteur :
 * docs/refonte/specs/suites-numeriques.md (§9 : décisions du relecteur) ; règles :
 * docs/refonte/07-regles-du-format.md.
 *
 * Onze parties : ce qu'il faut savoir (un test sur les suites arithmétiques et géométriques, qui permet
 * de passer le rappel), l'énigme (un comprimé chaque matin), la machine et son escalier (la figure-clé,
 * la scène `toile`), la récurrence, le sens de variation, converger, la limite, les suites de
 * référence, le retour à l'énigme, la fin de deux problèmes du bac (2022 commenté, 2019 à compléter),
 * puis le bilan. La séance 2 « Encadrer, comparer » (suites homographiques, majoration par une
 * géométrique, comparaison et encadrement, et en SM les accroissements finis et les suites adjacentes)
 * est annoncée à la fin.
 *
 * Les scènes vivent dans suites-scenes-{a,b,c}.js, les outils et les nombres dans suites-outils.js ; le
 * déroulé, le panneau, les paris, les fiches et les calculs ligne à ligne dans noyau.js. Aucune valeur
 * numérique affichée n'est tapée à la main : elle sort d'un calcul de suites-outils.js.
 */
import { monterLecon } from "./noyau";
import * as T from "./suites-outils";
import { scenesA } from "./suites-scenes-a";
import { scenesB } from "./suites-scenes-b";
import { scenesC } from "./suites-scenes-c";

const { fr, ent, M, outilsScene } = T;
// l'espace fine insécable, pour les libellés que le noyau ne retouche pas
const NNB = " ";

export function monterPilote(root) {
return monterLecon(root, ctx => {
const {clamp,scenes,hooks,S}=ctx;
const $=ctx.$;
const O=outilsScene(ctx);
const {ty}=O;

// les trois pièges du bilan (scène `quiz`)
const PIEGES=[
  {tag:'Piège 1 sur 3 : le majorant',big:'croissante, majorée par 5',r1:'elle converge',r2:'vers une limite ≤ 5, pas forcément 5'},
  {tag:'Piège 2 sur 3 : le sens',big:'*f* croissante, *u*_{0} = 6',r1:`*f*(6) = ${ent(T.U_DEP6)} < 6`,r2:'la suite décroît'},
  {tag:'Piège 3 sur 3 : le point fixe',big:'ℓ = *f*(ℓ)',r1:'dit où aller',r2:'si la suite y va'}];
scenesA(ctx,O);
scenesB(ctx,O);
scenesC(ctx,O,PIEGES);

/* ---------- le script ---------- */
const BEATS=[
  {name:'Ce qu’il faut savoir',court:'Savoir'},{name:'L’énigme',court:'Énigme'},{name:'La machine et son escalier',court:'Machine'},{name:'La récurrence',court:'Preuve'},{name:'Le sens de variation',court:'Variation'},{name:'Converger',court:'Converger'},{name:'La limite',court:'Limite'},{name:'Les suites de référence',court:'Référence'},{name:'Retour à l’énigme',court:'Retour'},{name:'Au bac',court:'Bac'},{name:'Bilan',court:'Bilan'}
];
const BET=t=>({opts:t.map(([x,fb])=>({t:x,fb}))});
// une question : [texte, juste ?, explication, indice (pour une option fausse)]
const VF=t=>({opts:t.map(([x,ok,fb,indice])=>ok?{t:x,ok:true,fb}:{t:x,fb,indice})});
const NW=s=>`<span class="nw">${s}</span>`;
const PARI_NOTE='Pari noté. Fais l’expérience.';
// un indice : la variable en italique, l'indice en <sub>
const sb=k=>String(k).replace(/[a-z]/g,m=>`<i>${m}</i>`);
const U=k=>`<i>u</i><sub>${sb(k)}</sub>`;
const V=k=>`<i>v</i><sub>${sb(k)}</sub>`;
const Wn=k=>`<i>w</i><sub>${sb(k)}</sub>`;
const F=x=>`<i>f</i>(${x})`;
const un=U('n'), un1=U('n+1'), vn=V('n'), vn1=V('n+1'), wn=Wn('n');
const D=T.U_DOSE;
const eU=M('e^{u_n/2}',`e<sup>${un}/2</sup>`);
const STEPS=[
/* ===== 0. ce qu'il faut savoir ===== */
{cle:'savoir',beat:0,scene:'savoir',set:{q:1,qr:0,r1:0,r2:0,r3:0},ctl:'saut',sujet:'les suites arithmétiques et géométriques',
  text:['Avant l’énigme, un seul rappel sur les suites. Un test : réussi du premier coup, il te permet de passer le rappel.',{t:`${U(0)} = ${T.SAV.u0} et ${U('n+1')} = ${T.SAV.q}${un}. Combien vaut ${U(5)} ?`,fort:true}],
  verifie:{...VF([
    [ent(T.SAV_U5),true,`Oui : on multiplie par ${T.SAV.q} à chaque pas, et de ${U(0)} à ${U(5)} il y a ${T.SAV.n} pas. ${U(5)} = ${T.SAV.u0} × ${T.SAV.q}<sup>${T.SAV.n}</sup> = ${ent(T.SAV_U5)}.`],
    [ent(T.SAV_ARITH),false,`Tu as traité une géométrique comme une arithmétique : ${T.SAV.u0} + ${T.SAV.n} × ${T.SAV.q}. On multiplie par ${T.SAV.q} à chaque pas, on n’ajoute pas ${T.SAV.q}.`,`Dans « ${U('n+1')} = ${T.SAV.q}${un} », ajoute-t-on ${T.SAV.q} ou multiplie-t-on par ${T.SAV.q} ?`],
    [ent(T.SAV_TROP),false,`Tu as compté un pas de trop : ${T.SAV.u0} × ${T.SAV.q}<sup>${T.SAV.n+1}</sup>. De ${U(0)} à ${U(5)}, il y a ${T.SAV.n} pas, donc ${T.SAV.q}<sup>${T.SAV.n}</sup>.`,`Combien de pas séparent ${U(0)} de ${U(5)} ?`]]),reveal:[{p:{qr:1},d:700}]}},
{cle:'sav-rappel',beat:0,scene:'savoir',set:{q:0,qr:0},seq:[{p:{r1:1},d:700,w:200},{p:{r2:1},d:700,w:600},{p:{r3:1},d:700,w:600}],
  text:['Trois faits serviront dans toute la séance.',{t:'Une suite arithmétique ajoute <i>r</i> à chaque pas.',a:0},{t:'Une suite géométrique multiplie par <i>q</i> à chaque pas.',a:1},{t:'Une fonction croissante sur <i>I</i> garde l’ordre.',a:2}]},

/* ===== 1. l'énigme ===== */
{cle:'comprime',beat:1,scene:'doses',set:{n:1,saw:1,pts:1,fin:1,plaf:0,bas:0,tab:0,dose2:0},sujet:'le modèle du médicament',
  text:['Un comprimé chaque matin. En 24 heures, le corps en élimine la moitié de ce qu’il contient.','C’est un modèle simplifié, pas un vrai médicament.',`On note ${un} la quantité juste après la ${'<i>n</i>'}-ième prise : ${U(0)} = 0 avant la première, ${U(1)} = ${fr(D[1],0)} juste après.`]},
{cle:'deuxieme-jour',beat:1,scene:'doses',set:{n:1,saw:1,pts:1,fin:1},sujet:'la relation entre deux jours',
  text:['Le deuxième matin, la nuit a déjà enlevé la moitié de la veille.',{t:`Juste après la prise, combien de comprimés : ${U(2)} = ?`,fort:true}],
  pari:{...VF([
    [fr(D[2],1),true,`Oui : la nuit enlève la moitié de ${fr(D[1],0)}, il reste ${fr(D[1]/2,1)}, puis la prise ajoute 1 : ${U(2)} = ${fr(D[2],1)}.`],
    [fr(T.DOSE_U2_OUBLI,0),false,'Tu as oublié l’élimination, comme si chaque jour ajoutait 1. La nuit divise par 2 avant la prise du matin.','Que devient le comprimé de la veille pendant la nuit ?'],
    [fr(T.DOSE_U2_ORDRE,0),false,'Tu as ajouté puis divisé : ½(1 + 1). On divise d’abord, la nuit, et on ajoute ensuite, le matin.','Qui vient en premier, la nuit ou la prise du matin ?']]),reveal:[{p:{n:2},d:900}]}},
{cle:'relation',beat:1,scene:'doses',set:{n:3,saw:1,pts:1,fin:1},
  text:['Chaque matin, la quantité est la moitié de celle de la veille, plus 1.',`Au troisième matin, ${U(3)} = ${fr(D[3],2)}.`,'Ni arithmétique, ni géométrique : chaque terme se calcule à partir du précédent.'],
  tex:[['u_{n+1}=\\dfrac{1}{2}\\,u_n+1,\\quad u_0=0','u(n+1) = ½u(n) + 1, u(0) = 0']]},
{cle:'plateau',beat:1,scene:'doses',set:{n:3,saw:1,pts:1,fin:1,tab:0},sujet:'prévoir la suite d’une suite',
  text:['Chaque matin en ajoute un.',{t:'Pendant des mois, la quantité…',fort:true}],
  pari:{...BET([['grandit sans limite',PARI_NOTE],['s’approche d’un plafond',PARI_NOTE],['grandit, puis finit par redescendre',PARI_NOTE]])}},
{cle:'jours',beat:1,scene:'doses',set:{n:3,saw:1,pts:1,fin:1,tab:0},ctl:'n',need:()=>!!(S.nOk||S.nMontre),needLabel:'Fais glisser le nombre de jours d’abord',
  text:['Fais glisser le nombre de jours.','Regarde le sommet de chaque dent, puis le creux.']},
{cle:'questions',beat:1,scene:'doses',set:{n:30,saw:1,pts:1,fin:1,plaf:1,bas:1,tab:0},
  text:()=>[(r=>r===1?'Tu avais parié sur un plafond : la quantité s’approche de 2 sans le dépasser.':r===0?'Tu avais parié sur une croissance sans limite : la quantité s’arrête pourtant près de 2.':r===2?'Tu avais parié qu’elle redescend : elle ne redescend pas, elle s’arrête près de 2.':'La quantité s’approche de 2 sans le dépasser.')(ctx.rep('plateau')),
    'Plus il y en a, plus la nuit en enlève : elle finit par enlever autant que le matin en ajoute.',{t:'Pourquoi jamais au-dessus de 2 ? Pourquoi 2 ? En combien de jours à 1 % près ?',fort:true}]},

/* ===== 2. la machine et son escalier (la figure-clé) ===== */
{cle:'machine',beat:2,scene:'toile',set:{f:'dose',cb:0,diag:0,u0:0,k:0,zoom:0,fixe:0,zone:0,ecart:0,en:2,axeU:0,bornes:0,lecU:0,wr:0},seq:[{p:{cb:1},d:1500,w:200}],sujet:'la machine u(n+1) = f(u(n))',
  text:['Une suite récurrente est une machine : on entre un terme, elle rend le suivant.',{t:`Ici, la machine est ${F('<i>x</i>')} = ½<i>x</i> + 1, et sa courbe est une droite.`,a:0}],
  tex:[['u_{n+1}=f(u_n)','u(n+1) = f(u(n))']]},
{cle:'premiere-marche',beat:2,scene:'toile',set:{cb:1,diag:0,u0:0,k:0,axeU:0},seq:[{p:{k:0.5},d:900,w:300}],sujet:'reporter un terme sur l’axe',
  text:[`On part de ${U(0)} = 0 sur l’axe horizontal, puis on monte jusqu’à la courbe.`,`La hauteur atteinte est ${U(1)} = ${F('0')} = ${fr(D[1],0)}.`,{t:`Pour calculer ${U(2)} = ${F(U(1))}, il faut placer ${U(1)} sur l’axe horizontal. Comment, sans calcul ?`,fort:true}],
  pari:{...VF([
    ['aller à la droite <i>y</i> = <i>x</i>, puis descendre',true,'Oui : la droite <i>y</i> = <i>x</i> échange hauteur et abscisse. On va à l’horizontale jusqu’à elle, et la verticale donne '+U(1)+' sur l’axe.'],
    ['redescendre à la verticale, sur l’axe',false,`Tu redescends tout droit : cela ramène sur ${U(0)}, pas sur ${U(1)}. Il faut passer par la droite <i>y</i> = <i>x</i>, qui échange hauteur et abscisse.`,`Où retombes-tu si tu descends tout droit depuis le point (0 ; ${fr(D[1],0)}) ?`],
    ['lire '+U(1)+' sur l’axe vertical, c’est assez',false,`Tu lis ${U(1)} en hauteur, mais ${F('<i>x</i>')} se lit à partir d’une abscisse. Il faut que ${U(1)} devienne une abscisse : la droite <i>y</i> = <i>x</i> le fait.`,`${F('<i>x</i>')} se lit à partir de quoi, une abscisse ou une hauteur ?`]]),
    reveal:[{p:{diag:1},d:700},{p:{k:1},d:900},{p:{axeU:1},d:500}]}},
{cle:'escalier',beat:2,scene:'toile',set:{diag:1,k:1,axeU:1},seq:[{p:{k:4},d:2600,w:300}],sujet:'l’escalier',
  text:['Même geste, trois fois de plus : on monte à la courbe, on va à la droite, on descend sur l’axe.',{t:`Les termes apparaissent : ${U(2)} = ${fr(D[2],1)}, ${U(3)} = ${fr(D[3],2)}, ${U(4)} = ${fr(D[4],3)}, comme dans l’énigme.`,a:0}]},
{cle:'ou-vont',beat:2,scene:'toile',set:{k:4,axeU:1,zoom:0,fixe:0},sujet:'où vont les marches',
  text:['Les marches continuent.',{t:'Elles vont…',fort:true}],
  pari:{...BET([['vers le point où la courbe coupe la droite <i>y</i> = <i>x</i>',PARI_NOTE],['toujours plus haut, une marche de plus à chaque fois',PARI_NOTE],['jusqu’au bord, puis elles redescendent',PARI_NOTE]]),reveal:[{p:{k:T.U0_MARCHES},d:2800},{p:{zoom:1},d:2200}]}},
{cle:'point-fixe',beat:2,scene:'toile',set:{k:T.U0_MARCHES,zoom:1,axeU:1,fixe:1},sujet:'le point fixe',
  text:['Le point où la courbe coupe la droite s’appelle le [[point-fixe|point fixe]] ℓ.',`Il vérifie ${F('ℓ')} = ℓ : ici ½ℓ + 1 = ℓ, donc ℓ = ${ent(T.PLATEAU)}.`,{t:'Les marches s’empilent vers le point fixe.',fort:true}],
  tex:[[`\\dfrac{1}{2}\\,\\ell+1=\\ell\\iff \\ell=${T.PLATEAU}`,`½ℓ + 1 = ℓ équivaut à ℓ = ${ent(T.PLATEAU)}`]]},
{cle:'depart',beat:2,scene:'toile',set:{zoom:0,u0:5,k:0,fixe:0,axeU:1,lecU:1},sujet:'le départ ne fixe pas la limite',
  text:[`Un patient a reçu une forte dose au départ : ${U(0)} = 5.`,{t:'Les marches vont vers…',fort:true}],
  pari:{...BET([['2, comme avant',PARI_NOTE],['un plafond plus haut que 2, car on part plus haut',PARI_NOTE],['5 : la suite reste près de son départ',PARI_NOTE]]),reveal:[{p:{k:T.U0_MARCHES},d:3000}]}},
{cle:'u0-curseur',beat:2,scene:'toile',set:{u0:5,k:T.U0_MARCHES,axeU:1,fixe:1,lecU:1,zoom:0},ctl:'u0',need:()=>!!(S.uOk||S.uMontre),needLabel:'Fais glisser le départ d’abord',
  text:[`Fais glisser ${U(0)}.`,'Du dessous ou du dessus, regarde où vont les marches.']},

/* ===== 3. la récurrence ===== */
{cle:'pas-assez',beat:3,scene:'table',set:{mode:'u',rows:0},seq:[{p:{rows:31},d:2400,w:200}],sujet:'des termes calculés ne prouvent rien',
  text:[`Le dessin et le tableau montrent ${un} &lt; 2.`,{t:`31 termes calculés, de ${U(0)} à ${U(30)}, tous au-dessous de 2. Est-ce prouvé pour tout <i>n</i> ?`,fort:true}],
  pari:{...VF([
    ['non : 31 termes ne disent rien du 32ᵉ',true,'Oui : calculer des termes ne prouve rien pour le suivant. Il faut un argument valable pour tout <i>n</i>.'],
    ['oui, 31 termes suffisent',false,`Tu as cru que des termes calculés prouvent le suivant. Avec <i>w</i><sub><i>n</i></sub> = 0,1 × 1,5<sup><i>n</i></sup>, ${Wn(0)} à ${Wn(7)} sont sous 2, mais ${Wn(8)} ≈ ${fr(T.W8,2)}.`,`La suite ${wn} = 0,1 × 1,5<sup><i>n</i></sup> : ${Wn(0)} à ${Wn(7)} sont inférieurs à 2. Et ${Wn(8)} ?`],
    ['oui, car les termes se stabilisent',false,`Une suite qui semble se stabiliser peut repartir : ${wn} reste lente au début, puis dépasse 2 au rang 8. Il faut un argument valable pour tout <i>n</i>.`,'Se stabiliser pendant 30 termes, est-ce vrai pour le terme suivant ?']])}},
{cle:'dominos',beat:3,scene:'toile',set:{f:'dose',cb:1,diag:1,u0:0,k:6,zoom:0,fixe:0,zone:0,ecart:0,axeU:1,bornes:0,lecU:0},sujet:'la récurrence en deux pièces',
  text:['La [[recurrence|récurrence]] marche comme des dominos, en deux pièces.','L’initialisation : la propriété est vraie au rang 0.','L’hérédité : si elle est vraie à un rang <i>n</i>, elle l’est au rang <i>n</i> + 1.',{t:'Il faut les deux pièces.',fort:true}],
  tex:[['P(0)\\ \\text{vraie}\\ \\text{et}\\ \\bigl(P(n)\\Rightarrow P(n+1)\\bigr)\\ \\text{pour tout}\\ n\\ \\Longrightarrow\\ P(n)\\ \\text{pour tout}\\ n','P(0) vraie et P(n) ⇒ P(n + 1) pour tout n donnent P(n) pour tout n']]},
{cle:'initialisation',beat:3,scene:'toile',sujet:'l’initialisation',
  text:[`Prenons la propriété P(<i>n</i>) : 0 ≤ ${un} &lt; 2.`,`Au rang 0, ${U(0)} = 0, et 0 ≤ 0 &lt; 2.`,{t:'P(0) est vraie.',fort:true}],
  tex:[['P(n):\\ 0\\le u_n<2','P(n) : 0 ≤ u(n) < 2']]},
{cle:'heredite-debut',beat:3,scene:'toile',sujet:'rédiger le début de l’hérédité',
  text:['On rédige l’hérédité.',{t:'Comment commence-t-elle ?',fort:true}],
  pari:{...VF([
    [`Soit <i>n</i> tel que 0 ≤ ${un} &lt; 2. Montrons que 0 ≤ ${un1} &lt; 2`,true,'Oui : on suppose P(<i>n</i>) à un rang <i>n</i> fixé, puis on montre P(<i>n</i> + 1). C’est l’hypothèse de récurrence.'],
    [`Supposons que 0 ≤ ${un} &lt; 2 pour tout <i>n</i>`,false,'Tu supposes la propriété pour tout <i>n</i> : c’est ce qu’on veut démontrer. On la suppose à un seul rang <i>n</i>, puis on prouve le suivant.','Que veut-on démontrer à la fin : la propriété pour un <i>n</i>, ou pour tout <i>n</i> ?'],
    [`Montrons que 0 ≤ ${un1} &lt; 2, sans rien supposer`,false,`Sans hypothèse, rien ne borne ${un1}. L’hérédité part de P(<i>n</i>) : on suppose 0 ≤ ${un} &lt; 2 à un rang <i>n</i>.`,`Que sais-tu de ${un1} si tu ne supposes rien sur ${un} ?`]])}},
{cle:'heredite',beat:3,scene:'toile',set:{u0:0},sujet:'l’hérédité, ligne à ligne',
  text:[`On a supposé 0 ≤ ${un} &lt; 2. On cherche à encadrer ${un1} = ½${un} + 1.`],
  deriv:[{tex:'0\\le u_n<2',alt:'0 ≤ u(n) < 2',r:'L’[[hypothese|hypothèse de récurrence]], au rang <i>n</i>.'}],
  pari:{label:`La ligne suivante${NNB}?`,apres:{tex:[['1\\le \\dfrac{1}{2}\\,u_n+1<2','1 ≤ ½u(n) + 1 < 2'],['0\\le u_{n+1}<2','0 ≤ u(n+1) < 2']],html:`On ajoute 1 : c’est P(<i>n</i> + 1). <b>Conclusion : pour tout <i>n</i>, 0 ≤ ${un} &lt; 2.</b>`},opts:[
    {t:M('0\\le \\tfrac12 u_n<1',`0 ≤ ½${un} &lt; 1`),ok:true,fb:'Oui : on multiplie les trois membres par ½ > 0, l’ordre est gardé. Il restera à ajouter 1.'},
    {t:`½${un} + 1 &lt; 2, car ½<i>x</i> + 1 &lt; 2 pour tout réel <i>x</i>`,indice:`Teste ½<i>x</i> + 1 &lt; 2 avec <i>x</i> = 3 : est-ce vrai pour tout réel <i>x</i> ?`,fb:`Tu as écrit une hérédité sans hypothèse : ½<i>x</i> + 1 &lt; 2 est faux pour <i>x</i> = 3, qui donne ${fr(T.HEREDITE_CONTRE,1)}. Il faut partir de 0 ≤ ${un} &lt; 2.`},
    {t:M('0\\le \\tfrac12 u_{n+1}<1',`0 ≤ ½${un1} &lt; 1`),indice:`Que sais-tu déjà : ${un} ou ${un1} ?`,fb:`Tu as mélangé ${un} et ${un1} : on ne sait encore rien de ${un1}, c’est ce qu’on cherche. On multiplie l’hypothèse sur ${un} par ½.`}]}},
{cle:'init-oubliee',beat:3,scene:'toile',sujet:'l’initialisation ne s’oublie pas',
  text:[`Une copie démontre : si ${un} > 2, alors ½${un} + 1 > 2. Elle conclut : ${un} > 2 pour tout <i>n</i>.`,{t:'Qu’en penses-tu ?',fort:true}],
  pari:{apres:{html:'Sans initialisation, la récurrence ne démarre pas : l’hérédité seule ne prouve rien.'},...VF([
    [`faux : ${U(0)} = 0, l’initialisation manque`,true,`Oui : la propriété est fausse au rang 0, puisque ${U(0)} = 0 n’est pas supérieur à 2. Sans premier domino, les autres ne tombent pas.`],
    ['juste : l’hérédité suffit',false,`Tu as cru qu’une hérédité suffit. Elle ne dit pas où commencer : ici elle « démontre » une propriété fausse, car ${U(0)} = 0.`,`Que vaut ${U(0)} ? Vérifie la propriété au rang 0.`],
    ['juste, car la suite est croissante',false,`Tu as invoqué la croissance, qui n’a rien à voir. La propriété doit d’abord être vraie au rang 0, et ${U(0)} = 0 n’est pas supérieur à 2.`,'Que dit la croissance de la suite sur la propriété au rang 0 ?']])}},
{cle:'v-recurrence',beat:3,scene:'toile',set:{u0:5,k:6,axeU:1,lecU:0},sujet:'choisir la propriété qui se démontre',
  text:[`Avec ${U(0)} = 5, la suite part de l’autre côté de 2.`,{t:'Laquelle de ces propriétés se démontre par récurrence ?',fort:true}],
  verifie:{...VF([
    [`${un} > 2 pour tout <i>n</i>`,true,`Oui : initialisation 5 > 2, et si ${un} > 2 alors ½${un} + 1 > 2. Les mêmes deux pièces.`],
    [`${un} &lt; 2 pour tout <i>n</i>`,false,`Tu as gardé la propriété du départ à 0. Mais l’initialisation est fausse : ${U(0)} = 5 n’est pas inférieur à 2.`,`Que vaut ${U(0)} ? Est-il inférieur à 2 ?`],
    [`${un} ≥ 5 pour tout <i>n</i>`,false,`Tu as cru que la suite ne descend jamais sous son départ. L’hérédité échoue : ${U(1)} = ${fr(T.U_DEPART5_1,1)} &lt; 5.`,`Calcule ${U(1)} : est-il supérieur ou égal à 5 ?`]])}},

/* ===== 4. le sens de variation ===== */
{cle:'difference',beat:4,scene:'toile',set:{u0:0,k:6,axeU:1,ecart:1,en:2,lecU:0},sujet:'le signe de u(n+1) − u(n)',
  text:[`Pour le sens de variation, on étudie le signe de ${un1} − ${un}.`],
  deriv:[{tex:'u_{n+1}-u_n=\\dfrac{1}{2}\\,u_n+1-u_n',alt:'u(n+1) − u(n) = ½u(n) + 1 − u(n)',r:'La relation de récurrence.'}],
  pari:{label:`La ligne suivante${NNB}?`,apres:{tex:[['u_{n+1}-u_n=\\dfrac{1}{2}(2-u_n)>0','u(n+1) − u(n) = ½(2 − u(n)) > 0']],html:`Donc (${un}) est croissante.`},opts:[
    {t:M('=\\tfrac12(2-u_n)>0,\\ \\text{car}\\ u_n<2',`= ½(2 − ${un}) > 0, car ${un} &lt; 2`),ok:true,fb:`Oui : ½${un} + 1 − ${un} = ½(2 − ${un}), positif d’après la partie sur la récurrence. La suite croît.`},
    {t:`> 0, car <i>f</i> est croissante`,indice:`Le sens de <i>f</i> est-il celui de la suite ? Regarde le signe de ${un1} − ${un}.`,fb:`Tu as lu le sens de la suite sur celui de <i>f</i>. Le sens de <i>f</i> ne dit pas celui de la suite : on étudie le signe de ${un1} − ${un}.`},
    {t:M('u_n-u_{n+1}=\\tfrac12(2-u_n)>0,\\ \\text{donc décroissante}',`${un} − ${un1} = ½(2 − ${un}) > 0, donc décroissante`),indice:`Quelle différence étudie-t-on : ${un1} − ${un} ou ${un} − ${un1} ?`,fb:`Tu as inversé la différence et perdu un signe : ${un} − ${un1} = −½(2 − ${un}). On étudie ${un1} − ${un}, positive ici : la suite croît.`}]}},
{cle:'lecture',beat:4,scene:'toile',set:{zone:1,ecart:1,en:2,k:6},sujet:'lire le signe de f(x) − x',
  text:[`La différence ${un1} − ${un} = ${F(un)} − ${un} est l’écart vertical entre la courbe et la droite <i>y</i> = <i>x</i>.`,'Là où la courbe est au-dessus de la droite, les marches montent.',{t:`Le signe de ${F('<i>x</i>')} − <i>x</i> se lit là où vivent les ${un}.`,fort:true}]},
{cle:'depart-mono',beat:4,scene:'toile',set:{u0:5,k:4,zone:1,ecart:0,axeU:1},sujet:'f croissante, mais la suite ?',
  text:[`Avec ${U(0)} = 5, ${F('<i>x</i>')} est toujours croissante.`,{t:'La suite est…',fort:true}],
  pari:{...VF([
    ['décroissante',true,`Oui : ${un} > 2, donc ${F(un)} − ${un} = ½(2 − ${un}) &lt; 0. La courbe est sous la droite, les marches descendent.`],
    ['croissante, car <i>f</i> l’est',false,`Tu as confondu « <i>f</i> croissante » et « (${un}) croissante ». Regarde le signe de ${F(un)} − ${un} : ${U(1)} = ${fr(T.U_DEPART5_1,1)} est plus petit que ${U(0)} = 5.`,`${U(1)} = ${fr(T.U_DEPART5_1,1)} et ${U(0)} = 5 : qui est le plus grand ?`],
    ['ni l’une ni l’autre',false,`Tu n’as pas utilisé la zone où vivent les ${un}. Pour ${un} > 2, la courbe est sous la droite : la suite est monotone, elle descend.`,`Où est la courbe par rapport à la droite quand ${un} > 2 ?`]])}},
{cle:'spirale',beat:4,scene:'toile',set:{f:'expm',u0:0,k:0,zone:0,ecart:0,axeU:1,fixe:0,lecU:0,zoom:0},sujet:'f décroissante, la suite aussi ?',
  text:[`Une autre machine : ${un1} = e<sup>−${un}</sup>, avec ${U(0)} = 0.`,`Ici ${F('<i>x</i>')} = e<sup>−<i>x</i></sup> est décroissante.`,{t:`La suite (${un}) est…`,fort:true}],
  pari:{...BET([['décroissante, comme <i>f</i>',PARI_NOTE],['croissante',PARI_NOTE],['ni l’une ni l’autre',PARI_NOTE]]),reveal:[{p:{k:8},d:3800}]}},
{cle:'spirale-vu',beat:4,scene:'toile',set:{k:8,axeU:1,fixe:1},sujet:'une fonction décroissante renverse l’ordre',
  text:[`Les termes alternent : ${T.SPIRALE.slice(0,6).map(v=>fr(v,2)).join(' ; ')}, autour de ℓ ≈ ${fr(T.FIX_EXPM,3)}.`,`Une fonction décroissante renverse l’ordre : ${U(0)} &lt; ${U(2)} entraîne ${U(1)} > ${U(3)}.`,{t:'<i>f</i> décroissante : la suite n’est pas monotone, elle tourne.',fort:true}],
  tex:[['e^{-\\ell}=\\ell','e^(−ℓ) = ℓ']]},

/* ===== 5. converger ===== */
{cle:'rappel',beat:5,scene:'doses',set:{n:3,saw:1,pts:1,fin:1,plaf:0,bas:0,tab:0,dose2:0},sujet:'calculer des termes',
  text:['Mi-parcours : c’est le bon moment pour une pause.','Un rappel avant de repartir.',{t:`${U(0)} = 0 et ${un1} = ½${un} + 1. Combien vaut ${U(3)} ?`,fort:true}],
  verifie:{...VF([
    [fr(D[3],2),true,`Oui : ${U(1)} = ${fr(D[1],0)}, ${U(2)} = ${fr(D[2],1)}, ${U(3)} = ${fr(D[3],2)}. Chaque terme part du précédent.`],
    [fr(D[2],1),false,`Tu as calculé ${U(2)}, un pas de moins. De ${U(0)} à ${U(3)}, il y a trois pas : ${U(1)} = ${fr(D[1],0)}, ${U(2)} = ${fr(D[2],1)}, ${U(3)} = ${fr(D[3],2)}.`,`Combien de pas séparent ${U(0)} de ${U(3)} ?`],
    [fr(3,0),false,`Tu as ajouté 1 chaque jour sans diviser : 0 + 3. À chaque pas, on divise d’abord par 2, puis on ajoute 1.`,'La nuit divise-t-elle par 2, dans ton calcul ?']])}},
{cle:'theoreme',beat:5,scene:'toile',set:{f:'dose',u0:0,k:T.U0_MARCHES,zoom:0,fixe:0,zone:0,ecart:0,axeU:1,lecU:0},sujet:'le critère de convergence monotone',
  text:['Voici le critère de convergence monotone. On l’admet, sans le démontrer.',{t:'Il demande les deux à la fois : la monotonie et une borne.',fort:true},'Une suite croissante qui n’est pas majorée tend vers +∞.'],
  tex:[['(u_n)\\ \\text{croissante et majorée}\\ \\Longrightarrow\\ (u_n)\\ \\text{converge}','u(n) croissante et majorée ⇒ u(n) converge'],['(u_n)\\ \\text{décroissante et minorée}\\ \\Longrightarrow\\ (u_n)\\ \\text{converge}','u(n) décroissante et minorée ⇒ u(n) converge']]},
{cle:'majorant-3',beat:5,scene:'toile',sujet:'un majorant n’est pas la limite',
  text:[`Pour ${U(0)} = 0, on a aussi ${un} &lt; 3 pour tout <i>n</i> : c’est vrai, car ${un} &lt; 2.`,{t:'Croissante et [[majorant|majorée]] par 3, la suite…',fort:true}],
  pari:{...VF([
    ['converge, vers une limite ≤ 3',true,'Oui : le critère donne la convergence, et la limite est ≤ 3. Un majorant borne la limite, il ne la fixe pas.'],
    ['converge vers 3',false,'Tu as pris le majorant pour la limite. Un majorant n’est pas unique : 2 majore aussi la suite, et c’est elle qui est la limite.','La limite est 2. Un majorant est-il unique ?'],
    ['tend vers +∞, car elle est croissante',false,'Tu as oublié qu’être majorée empêche de tendre vers +∞. Croissante et majorée, elle converge.','Une suite majorée par 3 peut-elle dépasser 3 ?']])}},
{cle:'bornee-oscille',beat:5,scene:'table',set:{mode:'alt',rows:0},seq:[{p:{rows:10},d:1800,w:200}],sujet:'bornée ne suffit pas',
  text:['(−1)<sup><i>n</i></sup> reste entre −1 et 1.',{t:'Converge-t-elle ?',fort:true}],
  pari:{...VF([
    ['non : elle saute de −1 à 1 sans se fixer',true,'Oui : bornée ne suffit pas, il faut aussi la monotonie. (−1)<sup><i>n</i></sup> n’est ni croissante ni décroissante.'],
    ['oui, vers 0, entre ses bornes',false,'Tu as cru qu’être bornée suffit à converger. Le critère demande aussi la monotonie : (−1)<sup><i>n</i></sup> alterne, elle n’a pas de limite.','Le critère demande deux hypothèses. Lesquelles ? Il en manque une ici.'],
    ['oui, car une suite bornée est monotone',false,'Tu as cru qu’une suite bornée est monotone. Contre-exemple : (−1)<sup><i>n</i></sup> est bornée, et elle n’est ni croissante ni décroissante.','La suite 1, −1, 1, −1 monte-t-elle ou descend-elle ?']])}},
{cle:'pas-retrecissent',beat:5,scene:'toile',set:{f:'pas',u0:0,k:0,cb:1,diag:1,axeU:1,zone:0,ecart:0,fixe:0,zoom:0,lecU:0,wr:0},sujet:'ralentir, ce n’est pas converger',
  text:[`Une machine dont les marches rétrécissent : ${Wn('n+1')} = ${wn} + e<sup>−${wn}</sup>, avec ${Wn(0)} = 0.`,`Chaque pas e<sup>−${wn}</sup> est plus petit que le précédent.`,{t:`La suite (${wn})…`,fort:true}],
  pari:{...BET([['converge : les pas rétrécissent',PARI_NOTE],['tend vers +∞',PARI_NOTE],['oscille',PARI_NOTE]]),reveal:[{p:{k:T.U0_MARCHES},d:2600},{p:{wr:1},d:1500}],apres:{html:`La suite ralentit, mais elle ne s’arrête pas : ${Wn(T.PAS_N[0])} ≈ ${fr(T.PAS_V[0],2)}, ${Wn(ent(T.PAS_N[1]))} ≈ ${fr(T.PAS_V[1],2)}, ${Wn(ent(T.PAS_N[2]))} ≈ ${fr(T.PAS_V[2],2)}. Pourquoi ? La partie suivante répond.`}}},

/* ===== 6. la limite ===== */
{cle:'continuite',beat:6,scene:'toile',set:{f:'dose',u0:0,k:T.U0_MARCHES,zoom:1,fixe:1,axeU:1,wr:0,cb:1,diag:1},sujet:'la limite vérifie ℓ = f(ℓ)',
  text:[`Supposons que (${un}) converge vers ℓ, et que <i>f</i> est continue.`,`Alors ${F(un)} tend vers ${F('ℓ')}. Or ${F(un)} = ${un1}, qui tend aussi vers ℓ.`,{t:`Donc ℓ = ${F('ℓ')}.`,fort:true}],
  tex:[['\\ell=f(\\ell)\\quad\\text{si } f \\text{ continue sur } I,\\ f(I)\\subset I,\\ u_0\\in I,\\ (u_n)\\text{ convergente}','ℓ = f(ℓ) si f est continue sur I, f(I) ⊂ I, u(0) ∈ I et u(n) converge']]},
{cle:'limite-dose',beat:6,scene:'toile',set:{zoom:0,fixe:1},sujet:'résoudre ℓ = f(ℓ)',
  text:[`La suite de l’énigme converge. Sa limite ℓ vérifie ℓ = ½ℓ + 1.`,{t:'Que vaut ℓ ?',fort:true}],
  verifie:{...VF([
    [ent(T.PLATEAU),true,`Oui : ℓ = ½ℓ + 1 donne ½ℓ = 1, donc ℓ = ${ent(T.PLATEAU)}.`],
    [ent(T.LIM_DOSE_CHOIX.depart),false,`Tu as pris ${U(0)}, le départ. La limite ne dépend pas du départ : le curseur de ${U(0)} l’a montré.`,`Le curseur de ${U(0)} : la limite changeait-elle avec le départ ?`],
    [ent(T.LIM_DOSE_CHOIX.dose),false,`Tu as pris la dose de chaque matin. Le plateau n’est pas la dose : il vaut 1 ÷ (1 − ½) = ${ent(T.PLATEAU)}.`,'Résous ℓ = ½ℓ + 1 : que vaut ℓ ?']])}},
{cle:'piege-2u',beat:6,scene:'toile',set:{f:'double',u0:2,k:0,zoom:0,fixe:1,axeU:1},sujet:'un point fixe ne prouve pas la convergence',
  text:[`Une autre machine : ${V(0)} = 2 et ${vn1} = 2${vn} − 1.`,`On résout ℓ = 2ℓ − 1 : ℓ = 1.`,{t:'Donc…',fort:true}],
  pari:{...VF([
    ['on ne peut rien conclure sans prouver la convergence',true,`Oui : ${V(1)} = ${ent(T.V_DOUBLE[1])}, ${V(2)} = ${ent(T.V_DOUBLE[2])}, ${V(3)} = ${ent(T.V_DOUBLE[3])}, la suite s’écarte de 1.`],
    [`${vn} tend vers 1, car ℓ = 1 est la solution`,false,`Tu as calculé la limite avant de prouver la convergence. Ici ${V(1)} = ${ent(T.V_DOUBLE[1])}, ${V(2)} = ${ent(T.V_DOUBLE[2])}, ${V(3)} = ${ent(T.V_DOUBLE[3])} : la suite s’éloigne de 1.`,`Calcule ${V(1)}, ${V(2)}, ${V(3)}. Se rapprochent-ils de 1 ?`],
    [`${vn} tend vers 2, car c’est son premier terme`,false,`Tu as pris le départ pour la limite. ${V(1)} = ${ent(T.V_DOUBLE[1])} et ${V(2)} = ${ent(T.V_DOUBLE[2])} : la suite s’éloigne aussi de 2.`,`Calcule ${V(1)} et ${V(2)} : restent-ils près de 2 ?`]]),
    reveal:[{p:{k:4},d:2400}],apres:{tex:[['v_n=1+2^{n}\\longrightarrow+\\infty','v(n) = 1 + 2^n tend vers +∞']],html:'<b>ℓ = <i>f</i>(ℓ) dit où aller, si l’on y va.</b>'}}},
{cle:'sans-point-fixe',beat:6,scene:'toile',set:{f:'pas',u0:0,k:T.U0_MARCHES,fixe:0,zoom:0,wr:0,axeU:1},sujet:'une suite sans point fixe',
  text:[`On revient à la suite ${Wn('n+1')} = ${wn} + e<sup>−${wn}</sup>.`,'Elle est croissante. Si elle convergeait vers ℓ, on aurait ℓ = <i>f</i>(ℓ), car <i>f</i> est continue.'],
  deriv:[{tex:'w_{n+1}-w_n=e^{-w_n}>0',alt:'w(n+1) − w(n) = e^(−w(n)) > 0',r:`(${wn}) est croissante.`},{tex:'\\ell=\\ell+e^{-\\ell}',alt:'ℓ = ℓ + e^(−ℓ)',r:'La relation ℓ = <i>f</i>(ℓ), si la limite ℓ existe.'}],
  pari:{label:`Donc${NNB}…`,apres:{tex:[['\\lim_{n\\to+\\infty}w_n=+\\infty','lim w(n) = +∞']],html:`La courbe ne coupe jamais la droite. Une suite croissante qui n’est pas majorée tend vers +∞.<details class="detail"><summary>Pour aller plus loin</summary>e<sup><i>w</i><sub><i>n</i>+1</sub></sup> ≥ e<sup>${wn}</sup> + 1, car e<sup><i>x</i></sup> ≥ 1 + <i>x</i> (leçon exponentielle). Donc ${wn} ≥ ln(<i>n</i> + 1).</details>`},opts:[
    {t:'e<sup>−ℓ</sup> = 0 est impossible, donc elle diverge',ok:true,fb:`Oui : e<sup><i>x</i></sup> > 0 pour tout <i>x</i>, donc e<sup>−ℓ</sup> = 0 n’a pas de solution. (${wn}) ne converge pas : croissante, elle tend vers +∞.`},
    {t:'e<sup>−ℓ</sup> = 0 donne ℓ = 0, qui est la limite',indice:'Calcule e⁰ : vaut-il 0 ?',fb:'Tu as pris ℓ = 0 pour une solution : e<sup>0</sup> = 1, pas 0. e<sup><i>x</i></sup> > 0 pour tout <i>x</i>, l’équation n’a aucune solution.'},
    {t:'ℓ = +∞ est la solution de e<sup>−ℓ</sup> = 0',indice:'+∞ est-il un réel, qu’on peut écrire comme limite finie ℓ ?',fb:'Tu as pris +∞ pour un réel. L’équation n’a pas de solution réelle : on conclut par l’absurde que la suite ne converge pas.'}]}},
{cle:'v-lim-composee',beat:6,scene:'toile',set:{f:'dose',u0:0,k:T.U0_MARCHES,fixe:1,zoom:0},sujet:'la limite de ln(u(n))',
  text:[`Pour la suite de l’énigme, ${un} tend vers 2.`,{t:`Que vaut la limite de ln(${un}), pour <i>n</i> ≥ 1 ?`,fort:true}],
  verifie:{...VF([
    [`ln 2 ≈ ${fr(T.LN_LIM,2)}`,true,`Oui : ln est continue en 2, donc ln(${un}) tend vers ln 2 ≈ ${fr(T.LN_LIM,2)}.`],
    ['2',false,`Tu as oublié d’appliquer ln à la limite. ln(${un}) tend vers ln 2, pas vers 2.`,`Que fait la limite de ln(${un}) : ln de la limite, ou la limite elle-même ?`],
    ['−∞',false,`Tu as regardé le départ : ln 0 n’existe pas, et la limite ne dépend pas du départ. ln est continue en 2, donc ln(${un}) tend vers ln 2.`,`C’est la limite de ${un} qui compte : en quel nombre ln est-elle continue ?`]])}},

/* ===== 7. les suites de référence ===== */
{cle:'geo-exp',beat:7,scene:'table',set:{mode:'demi',rows:0},seq:[{p:{rows:11},d:1800,w:200}],sujet:'la limite de qⁿ pour 0 < q < 1',
  text:['Pour <i>q</i> > 0, <i>q</i><sup><i>n</i></sup> = e<sup><i>n</i> ln <i>q</i></sup>, comme dans la leçon sur exp.','Si 0 &lt; <i>q</i> &lt; 1, alors ln <i>q</i> &lt; 0, donc <i>n</i> ln <i>q</i> tend vers −∞.',{t:'Donc <i>q</i><sup><i>n</i></sup> tend vers…',fort:true}],
  pari:{...VF([
    ['0',true,'Oui : e<sup><i>X</i></sup> tend vers 0 quand <i>X</i> tend vers −∞. Les puissances de ½ se rapprochent de 0 sans l’atteindre.'],
    ['−∞',false,'Tu as confondu l’exposant et la valeur. L’exposant tend vers −∞, mais e<sup><i>X</i></sup> > 0 : <i>q</i><sup><i>n</i></sup> reste positif.','L’exposant tend vers −∞. Et e^X, peut-il être négatif ?'],
    ['1',false,`Tu as cru que <i>q</i><sup><i>n</i></sup> s’arrête à 1. Il reste entre 0 et 1 sans s’y arrêter : (½)<sup>10</sup> ≈ ${fr(T.GEO_10,3)}.`,'Regarde le tableau : les puissances de ½ restent-elles près de 1 ?']]),apres:{tex:[['q>1:\\ q^{n}\\to+\\infty\\qquad q=1:\\ q^{n}=1\\qquad 0<q<1:\\ q^{n}\\to0','q > 1 : +∞ ; q = 1 : 1 ; 0 < q < 1 : 0']]}}},
{cle:'q-negatif',beat:7,scene:'table',set:{mode:'mdemi',rows:0},seq:[{p:{rows:11},d:1800,w:200}],sujet:'q négatif et |q| < 1',
  text:['Et si <i>q</i> est négatif ?',{t:'Que vaut la limite de (−½)<sup><i>n</i></sup> ?',fort:true}],
  pari:{...VF([
    ['0, car |(−½)<sup><i>n</i></sup>| = (½)<sup><i>n</i></sup> tend vers 0',true,'Oui : |<i>q</i>| &lt; 1 décide, pas le signe. |(−½)<sup><i>n</i></sup>| = (½)<sup><i>n</i></sup> tend vers 0, donc (−½)<sup><i>n</i></sup> aussi.'],
    ['pas de limite, car le signe alterne',false,'Tu as cru que <i>q</i> &lt; 0 empêche la convergence. Le signe alterne, mais la valeur absolue tend vers 0 : c’est |<i>q</i>| &lt; 1 qui décide.','Le signe alterne. Mais que devient la valeur absolue des termes ?'],
    ['−∞, car la base est négative',false,'Tu as retenu seulement le signe de la base : (−½)<sup><i>n</i></sup> alterne et rétrécit. Elle ne tend pas vers −∞.','Les termes sont-ils tous négatifs ? Regarde le tableau.']]),apres:{tex:[['q>1:\\ +\\infty\\quad q=1:\\ 1\\quad -1<q<1:\\ 0\\quad q\\le-1:\\ \\text{pas de limite}','q > 1 : +∞ ; q = 1 : 1 ; −1 < q < 1 : 0 ; q ≤ −1 : pas de limite']]}}},
{cle:'malthus',beat:7,scene:'table',tag:'1798',set:{mode:'malthus',rows:0},seq:[{p:{rows:10},d:1800,w:200}],sujet:'géométrique contre arithmétique',
  text:['Malthus compare une population qui double tous les 25 ans à des vivres qui augmentent d’une même quantité tous les 25 ans.','Au départ, les deux valent 1.',{t:'En deux siècles et quart, soit 9 périodes de 25 ans, population et vivres sont dans le rapport…',fort:true}],
  pari:{...VF([
    [`${ent(T.MALTHUS.pop)} à ${ent(T.MALTHUS.vivres)}`,true,`Oui : la population est multipliée par 2 à chaque période, 2<sup>9</sup> = ${ent(T.MALTHUS.pop)}, et les vivres passent de 1 à ${ent(T.MALTHUS.vivres)}.`],
    [`${ent(T.MALTHUS.arith)} à ${ent(T.MALTHUS.vivres)}`,false,'Tu as traité la population comme une arithmétique : 1 + 2 × 9. Elle double à chaque période : on multiplie, on n’ajoute pas.','La population double à chaque période : ajoute-t-on 2 ou multiplie-t-on par 2 ?'],
    [`${ent(T.MALTHUS.trop)} à ${ent(T.MALTHUS.vivres)}`,false,'Tu as compté une période de trop : 2<sup>10</sup>. Neuf périodes séparent le départ de la 9ᵉ, donc 2<sup>9</sup>.','Combien de périodes de 25 ans dans deux siècles et quart ? Compte les pas, pas les termes.']])}},
{cle:'malthus-loi',beat:7,scene:'table',set:{mode:'malthus',rows:10},sujet:'2ⁿ/n tend vers +∞',
  text:['Pour comparer, on regarde le rapport 2<sup><i>n</i></sup> / <i>n</i>.',{t:'Que vaut sa limite ?',fort:true}],
  verifie:{...VF([
    ['+∞',true,'Oui : 2<sup><i>n</i></sup> / <i>n</i> = ln 2 × e<sup><i>x</i></sup> / <i>x</i> avec <i>x</i> = <i>n</i> ln 2, et e<sup><i>x</i></sup> / <i>x</i> tend vers +∞ (leçon exponentielle).'],
    ['0',false,'Tu as mis les croissances à l’envers : e<sup><i>x</i></sup> l’emporte sur <i>x</i>, donc 2<sup><i>n</i></sup> l’emporte sur <i>n</i>.','Dans le tableau, 2^n et n : qui grandit le plus vite ?'],
    ['1',false,'« ∞ / ∞ = 1 » n’est pas une règle : c’est une forme indéterminée. On la lève avec e<sup><i>x</i></sup> / <i>x</i> → +∞.','Une forme ∞/∞ vaut-elle toujours 1 ?']]),apres:{html:'Une géométrique de raison > 1 dépasse toute arithmétique.'}}},

/* ===== 8. retour à l'énigme ===== */
{cle:'retour-plafond',beat:8,scene:'doses',set:{n:30,saw:1,pts:1,fin:1,plaf:1,bas:1,tab:0,dose2:0},sujet:'les trois questions de l’énigme',
  text:()=>[(r=>r===1?'Ton pari était le bon : la quantité s’approche d’un plafond.':r===0?'Tu avais parié sur une croissance sans limite : elle s’arrête pourtant au plafond.':r===2?'Tu avais parié qu’elle redescend : elle monte, puis s’arrête au plafond.':'La quantité s’approche d’un plafond.')(ctx.rep('plateau')),
    'Première question résolue : 0 ≤ <i>u</i><sub><i>n</i></sub> &lt; 2 pour tout <i>n</i>, par récurrence.','La suite est croissante, donc convergente, vers ℓ = 2. Reste à voir comment elle s’en approche.']},
{cle:'retour-vn',beat:8,scene:'doses',set:{n:30},sujet:'la suite auxiliaire v(n) = u(n) − 2',
  text:['Deuxième question : pourquoi 2 ? On pose l’écart au plateau.'],
  deriv:[{tex:'v_n=u_n-2',alt:'v(n) = u(n) − 2',r:'L’écart au plateau.'},{tex:'v_{n+1}=u_{n+1}-2=\\dfrac{1}{2}\\,u_n+1-2=\\dfrac{1}{2}\\,u_n-1',alt:'v(n+1) = u(n+1) − 2 = ½u(n) + 1 − 2 = ½u(n) − 1',r:'La relation de récurrence.'}],
  pari:{label:`La ligne suivante${NNB}?`,apres:{tex:[['v_{n+1}=\\dfrac{1}{2}\\,v_n','v(n+1) = ½v(n)']],html:`(${vn}) est géométrique de raison ½, de premier terme ${V(0)} = ${U(0)} − 2 = −2.`},opts:[
    {t:M('=\\tfrac12(u_n-2)=\\tfrac12 v_n',`= ½(${un} − 2) = ½${vn}`),ok:true,fb:`Oui : ½${un} − 1 = ½(${un} − 2) = ½${vn}. Une raison fixe, ½ : (${vn}) est géométrique.`},
    {t:M('=\\tfrac12u_n-1:\\ \\text{raison}\\ \\tfrac12u_n-1',`= ½${un} − 1 : raison ½${un} − 1`),indice:`Une raison dépend-elle de <i>n</i> ? Écris ½${un} − 1 avec ${vn}.`,fb:`Tu as pris pour raison une expression en ${un}. Une raison est un nombre fixe : il faut écrire ½${un} − 1 sous la forme ½${vn}.`},
    {t:M('v_{n+1}=\\tfrac12 v_n+1',`${vn1} = ½${vn} + 1, comme pour ${un}`),indice:`Calcule ${V(1)} = ${U(1)} − 2 : vaut-il 0 ?`,fb:`Tu as supposé que ${vn} suit la même relation que ${un}. Avec ${V(0)} = −2, cela donnerait ${V(1)} = 0, or ${V(1)} = ${U(1)} − 2 = ${fr(D[1]-2,0)}.`}]}},
{cle:'retour-formule',beat:8,scene:'doses',sujet:'écrire u(n) en fonction de n',
  text:[`Le premier terme est ${V(0)} = ${U(0)} − 2 = −2.`,{t:`Alors ${un} = ?`,fort:true}],
  pari:{...VF([
    [M('2-2\\left(\\tfrac12\\right)^{n}','2 − 2(½)<sup>n</sup>'),true,`Oui : ${vn} = −2(½)<sup><i>n</i></sup>, donc ${un} = ${vn} + 2 = 2 − 2(½)<sup><i>n</i></sup>. Pour <i>n</i> = 0, on retrouve ${U(0)} = 0.`],
    [M('2-\\left(\\tfrac12\\right)^{n}','2 − (½)<sup>n</sup>'),false,`Tu as oublié ${V(0)} = −2 : pour <i>n</i> = 0, 2 − (½)<sup>0</sup> vaut 1, or ${U(0)} = 0.`,`Calcule la formule pour <i>n</i> = 0 : retrouves-tu ${U(0)} = 0 ?`],
    [M('-2\\left(\\tfrac12\\right)^{n}','−2(½)<sup>n</sup>'),false,`Tu as écrit ${vn} sans rajouter 2 : pour <i>n</i> = 0, −2(½)<sup>0</sup> vaut −2, or ${U(0)} = 0. Il faut ${un} = ${vn} + 2.`,`${vn} = ${un} − 2 : comment revenir à ${un} ?`]]),
    apres:{tex:[['2-u_n=2\\left(\\tfrac12\\right)^{n}>0','2 − u(n) = 2(½)^n > 0']],html:`(½)<sup><i>n</i></sup> tend vers 0, donc ${un} tend vers 2, et 2 − ${un} > 0 : jamais au-dessus de 2.`}}},
{cle:'retour-jours',beat:8,scene:'doses',sujet:'résoudre une inéquation par ln',
  text:['À 1 % près, c’est 2 − <i>u</i><sub><i>n</i></sub> ≤ 0,02, soit (½)<sup><i>n</i></sup> ≤ 0,01.','En prenant ln : <i>n</i> ln ½ ≤ ln 0,01. Or ln ½ &lt; 0.',{t:'À partir de quel jour ?',fort:true}],
  pari:{...VF([
    [`le ${T.SEUIL.n}ᵉ jour`,true,`Oui : <i>n</i> ≥ ln 100 / ln 2 ≈ ${fr(T.LN100_LN2,2)}, car diviser par ln ½ &lt; 0 renverse le sens. Donc <i>n</i> = ${T.SEUIL.n}.`],
    [`le ${T.SEUIL.n-1}ᵉ jour`,false,`Tu as arrondi vers le bas. ${U(T.SEUIL.n-1)} = ${fr(D[T.SEUIL.n-1],5)} est à ${fr(T.ECART6,5)} de 2, plus que 0,02 : il faut le ${T.SEUIL.n}ᵉ jour.`,`Calcule 2 − ${U(T.SEUIL.n-1)} : est-ce au plus 0,02 ?`],
    [`les ${T.SEUIL.n-1} premiers jours seulement`,false,`Tu as gardé le sens de l’inégalité en divisant par ln ½ &lt; 0. Diviser par un négatif le renverse : <i>n</i> ≥ ${fr(T.LN100_LN2,2)}, pas <i>n</i> ≤.`,'Par quel signe divises-tu, et que devient le sens de l’inégalité ?']]),
    apres:{html:`En SM, sans calculatrice, l’énoncé donne ln 2 ≈ ${fr(T.LN2_SM,2)} et ln 10 ≈ ${fr(T.LN10_SM,2)} : ln 100 / ln 2 = 2 × ${fr(T.LN10_SM,2)} / ${fr(T.LN2_SM,2)} ≈ ${fr(T.LN100_SM,2)}, donc le même ${T.SEUIL.n}ᵉ jour.`}}},
{cle:'retour-dose',beat:8,scene:'doses',set:{n:30,dose2:1,plaf:1,bas:1},sujet:'la dose fixe la hauteur',
  text:[`Deux comprimés chaque matin : ${un1} = ½${un} + 2.`,{t:'Quel est le plateau ?',fort:true}],
  verifie:{...VF([
    [ent(T.DOSE2.plateau),true,`Oui : ℓ = ½ℓ + 2 donne ℓ = ${ent(T.DOSE2.plateau)}, atteint à 1 % près au même ${T.SEUIL2}ᵉ jour.`],
    [ent(T.DOSE2_FAUX.deux),false,'Tu as gardé l’ancien plateau. La dose compte : ℓ = ½ℓ + 2 donne un autre plateau.','Le plateau changeait-il quand la dose double ?'],
    [ent(T.DOSE2_FAUX.trois),false,'Tu as ajouté 1 à l’ancien plateau au lieu de résoudre ℓ = <i>f</i>(ℓ). Résous ℓ = ½ℓ + 2.','Résous ℓ = ½ℓ + 2 : que vaut ℓ ?']]),apres:{html:'<b>La dose fixe la hauteur, la demi-vie fixe le temps.</b> L’énigme est résolue.'}}},

/* ===== 9. au bac ===== */
{cle:'bac',beat:9,scene:'toile',set:{f:'bac22',cb:0,diag:0,u0:1,k:0,zoom:0,fixe:0,zone:0,ecart:0,axeU:0,bornes:1,lecU:0,wr:0},sujet:'le premier geste d’une suite récurrente',
  text:['Un problème du bac : Sciences expérimentales (SVT et Sciences Physiques), 2022, session normale, problème de 8,5 points, question 8.',`La suite est définie par ${U(0)} = 1 et ${un1} = ${F(un)}. Il faut montrer par récurrence que 0 &lt; ${un} &lt; ln 4 (0,5 point), la décroissance (0,5), la convergence (0,25), puis la limite (0,5).`],
  tex:[['f(x)=x\\left(e^{x/2}-1\\right)^{2}','f(x) = x(e^(x/2) − 1)²']],
  pari:{label:`Premier geste${NNB}?`,reveal:[{p:{cb:1,diag:1},d:1400},{p:{k:3,axeU:1,fixe:1},d:2200}],opts:[
    {t:'chercher, dans les questions précédentes, ce que <i>f</i> fait de l’intervalle ]0 ; ln 4[',fb:`C’est le bon réflexe : <i>f</i> est croissante, ${F('0')} = 0 et ${F('ln 4')} = ln 4. Alors <i>f</i> envoie ]0 ; ln 4[ dans lui-même.`},
    {t:`calculer ${U(1)}, ${U(2)}, ${U(3)} et constater`,fb:'Des termes calculés ne prouvent rien pour tout <i>n</i>. Le bon geste : chercher ce que <i>f</i> fait de l’intervalle ]0 ; ln 4[.'},
    {t:`étudier le signe de ${un1} − ${un}`,fb:`C’est la question b : mais il faut d’abord savoir où vivent les ${un}. Le bon geste : les borner par une récurrence.`}]}},
{cle:'bac-heredite',beat:9,scene:'toile',set:{cb:1,diag:1,k:3,axeU:1,fixe:1},sujet:'l’hérédité avec une fonction croissante',
  text:[`D’après la question 4, <i>f</i> est strictement croissante sur ℝ. On calcule ${F('0')} = 0 et ${F('ln 4')} = ln 4.`,`Initialisation : ${U(0)} = 1, et 0 &lt; 1 &lt; ln 4 ≈ ${fr(T.LN4,2)}.`],
  deriv:[{tex:'0<u_n<\\ln 4',alt:'0 < u(n) < ln 4',r:'L’hypothèse de récurrence, pour un <i>n</i> fixé.'}],
  pari:{label:`La ligne suivante${NNB}?`,apres:{tex:[['f(0)<f(u_n)<f(\\ln 4)\\iff 0<u_{n+1}<\\ln 4','f(0) < f(u(n)) < f(ln 4), soit 0 < u(n+1) < ln 4']],html:`C’est P(<i>n</i> + 1). Par récurrence, pour tout <i>n</i>, 0 &lt; ${un} &lt; ln 4.`},opts:[
    {t:M('f(0)\\lt f(u_n)\\lt f(\\ln 4)',`${F('0')} &lt; ${F(un)} &lt; ${F('ln 4')}`)+', car <i>f</i> est strictement croissante',ok:true,fb:`Oui : <i>f</i> garde l’ordre. Avec ${F('0')} = 0 et ${F('ln 4')} = ln 4, cela donne 0 &lt; ${un1} &lt; ln 4.`},
    {t:M('f(0)\\gt f(u_n)\\gt f(\\ln 4)',`${F('0')} > ${F(un)} > ${F('ln 4')}`)+', car <i>f</i> renverse l’ordre',indice:`${F('0')} = 0 et ${F('ln 4')} = ln 4 : une fonction croissante garde-t-elle ou renverse-t-elle l’ordre ?`,fb:`Tu as renversé l’ordre, comme pour une fonction décroissante. <i>f</i> est croissante, et ton inégalité donnerait 0 > ${un1}.`},
    {t:`${un1} = ${F(un)} &lt; ln 4, car ${F('<i>x</i>')} &lt; ln 4 pour tout réel <i>x</i>`,indice:`Calcule ${F('2')} : est-il inférieur à ln 4 ≈ ${fr(T.LN4,2)} ?`,fb:`Tu as écrit une hérédité sans hypothèse : ${F('2')} ≈ ${fr(T.BAC22.f2,2)} dépasse ln 4. Il faut partir de 0 &lt; ${un} &lt; ln 4.`}]}},
{cle:'bac-mono',beat:9,scene:'toile',set:{k:5,ecart:1,en:1},sujet:'le signe de f(u(n)) − u(n) sur ]0 ; ln 4[',
  text:['Question 8 b) : le sens de variation. On factorise.',{t:'Quel est le signe de ce produit ?',fort:true}],
  tex:[['u_{n+1}-u_n=f(u_n)-u_n=u_n\\,e^{u_n/2}\\left(e^{u_n/2}-2\\right)','u(n+1) − u(n) = f(u(n)) − u(n) = u(n) e^(u(n)/2) (e^(u(n)/2) − 2)']],
  pari:{apres:{html:`(${un}) est décroissante.`},...VF([
    [`négatif : ${un} > 0 et ${eU} &lt; 2, car ${un} &lt; ln 4`,true,`Oui : le facteur ${eU} − 2 est négatif, car ${un} &lt; ln 4. Le produit est négatif, donc (${un}) est décroissante.`],
    ['positif, car <i>f</i>(<i>x</i>) − <i>x</i> > 0 sur ]−∞ ; 0[',false,`Tu as lu le signe sur ]−∞ ; 0[, pas là où vivent les ${un}. Ils sont dans ]0 ; ln 4[ : ${U(1)} ≈ ${fr(T.BAC22.f1,2)} est plus petit que ${U(0)} = 1.`,`Où vivent les ${un} : dans ]−∞ ; 0[ ou dans ]0 ; ln 4[ ?`],
    [`positif, car <i>f</i> est croissante`,false,`Tu as lu le sens de la suite sur celui de <i>f</i>. Le sens de <i>f</i> ne dit pas celui de la suite : on étudie le signe de ${F(un)} − ${un}.`,'Le sens de f est-il celui de la suite ? Regarde le signe du produit.']])}},
{cle:'bac-lim',beat:9,scene:'toile',set:{k:8,ecart:0},sujet:'choisir la limite parmi les points fixes',
  text:[`Question 8 c) : décroissante et minorée par 0, (${un}) converge vers un réel ℓ, avec 0 ≤ ℓ ≤ 1.`,`Question 8 d) : <i>f</i> est continue, et ${F('ℓ')} = ℓ équivaut à ℓ = 0 ou ℓ = ln 4.`,{t:'Que vaut la limite ?',fort:true}],
  pari:{...VF([
    ['0, car ln 4 > 1 = '+U(0),true,`Oui : (${un}) décroît à partir de 1, elle ne peut pas atteindre ln 4 ≈ ${fr(T.LN4,2)}. Il reste ℓ = 0.`],
    ['ln 4, le majorant de la suite',false,`Tu as pris le majorant pour la limite. Une suite décroissante partie de 1 ne remonte pas à ln 4 ≈ ${fr(T.LN4,2)}.`,`La suite décroît depuis ${U(0)} = 1 : peut-elle atteindre ln 4 ≈ ${fr(T.LN4,2)} ?`],
    ['1, le premier terme',false,`Tu as pris ${U(0)} pour la limite. ${F('1')} ≈ ${fr(T.BAC22.f1,2)} n’est pas 1 : ℓ vérifie ${F('ℓ')} = ℓ, et 1 ne le vérifie pas.`,`Calcule ${F('1')} : vaut-il 1 ?`]])}},
{cle:'bac-copie',beat:9,scene:'toile',set:{k:8,ecart:0},sujet:'rédiger la fin d’un problème',
  text:['La rédaction attendue pour la question 8, en quatre blocs.','Barème imprimé dans le sujet (Sciences expérimentales, 2022, session normale, problème, question 8) : a) 0,5 ; b) 0,5 ; c) 0,25 ; d) 0,5.'],
  html:()=>`<div class="lg-copie">${[
    `<b>8 a)</b> Initialisation : ${NW(`${U(0)} = 1`)} et ${NW('0 &lt; 1 &lt; ln 4')} : P(0) est vraie.`,
    `Hérédité : soit ${NW('<i>n</i>')} tel que ${NW(`0 &lt; ${un} &lt; ln 4`)}. <i>f</i> est strictement croissante sur ℝ, donc ${NW(`${F('0')} &lt; ${F(un)} &lt; ${F('ln 4')}`)}, soit ${NW(`0 &lt; ${un1} &lt; ln 4`)}.`,
    `Conclusion : pour tout ${NW('<i>n</i>')}, ${NW(`0 &lt; ${un} &lt; ln 4`)}.`,
    `<b>8 b)</b> ${NW(`${un1} − ${un} = ${F(un)} − ${un} = ${un} ${eU}(${eU} − 2)`)}. Or ${NW(`${un} > 0`)} et ${NW(`${eU} &lt; 2`)} car ${NW(`${un} &lt; ln 4`)}, donc ${NW(`${un1} − ${un} &lt; 0`)} : (${un}) est décroissante.`,
    `<b>8 c)</b> (${un}) est décroissante et minorée par 0 : elle converge.`,
    `<b>8 d)</b> Soit ℓ sa limite. <i>f</i> est continue sur ${NW('<i>I</i> = [0 ; ln 4]')} et ${NW('<i>f</i>(<i>I</i>) ⊂ <i>I</i>')}, donc ${NW(`ℓ = ${F('ℓ')}`)}, soit ℓ = 0 ou ℓ = ln 4.`,
    `Or ${NW(`ℓ ≤ ${U(0)} = 1 &lt; ln 4`)} : <b>ℓ = 0</b>.`].map(l=>`<p>${ctx.ty(l)}</p>`).join('')}</div>`},
{cle:'bac-2',beat:9,scene:'toile',set:{f:'bac19',cb:1,diag:1,u0:1,k:3,zoom:0,fixe:0,axeU:1,bornes:1,ecart:0},sujet:'l’hérédité : appliquer f, pas ln',
  text:['À toi, avec la fin d’un autre problème : Sciences expérimentales (SVT et Sciences Physiques), 2019, session normale, problème de 11 points, deuxième partie.','La première partie donne : <i>f</i> est croissante sur [1 ; +∞[. On calcule <i>f</i>(1) = 3/2 et <i>f</i>(e) = e.',{t:`Question 1 a) (0,5 point), l’hérédité : on suppose 1 ≤ ${un} ≤ e.`,fort:true}],
  tex:[['f(x)=x+\\dfrac{1}{2}-\\ln x+\\dfrac{1}{2}(\\ln x)^{2}','f(x) = x + ½ − ln x + ½(ln x)²'],['u_0=1,\\quad u_{n+1}=f(u_n)','u(0) = 1, u(n+1) = f(u(n))']],
  pari:{label:`La ligne suivante${NNB}?`,apres:{tex:[['\\dfrac{3}{2}\\le u_{n+1}\\le e','3/2 ≤ u(n+1) ≤ e']]},...VF([
    [`${F('1')} ≤ ${F(un)} ≤ ${F('e')}, car <i>f</i> est croissante sur [1 ; e]`,true,`Oui : <i>f</i> garde l’ordre sur [1 ; e]. Avec ${F('1')} = 3/2 et ${F('e')} = e : 3/2 ≤ ${un1} ≤ e.`],
    [`ln 1 ≤ ln ${un} ≤ ln e, donc 0 ≤ ${un1} ≤ 1`,false,`Tu as appliqué ln au lieu de <i>f</i>. L’hérédité applique la fonction de la suite : ${U(1)} = ${fr(T.BAC19.f1,1)} est plus grand que 1, ton encadrement est faux.`,`Quelle fonction transforme ${un} en ${un1} : ln ou <i>f</i> ?`],
    [`${F('e')} ≤ ${F(un)} ≤ ${F('1')}, car <i>f</i> est croissante`,false,`Tu as renversé l’ordre, alors que <i>f</i> est croissante. e ≤ ${un1} ≤ 3/2 est impossible, car 3/2 &lt; e.`,`<i>f</i> est croissante : garde-t-elle ou renverse-t-elle l’ordre ?`]])}},
{cle:'bac-2-mono',beat:9,scene:'toile',set:{k:5,ecart:1,en:1},sujet:'u(n+1) − u(n) = f(u(n)) − u(n)',
  text:[`Question 1 b) (0,5 point). La première partie donne ${F('<i>x</i>')} − <i>x</i> = ½(ln <i>x</i> − 1)².`,{t:`Que vaut ${un1} − ${un}, et que conclure ?`,fort:true}],
  pari:{apres:{html:`(${un}) est croissante.`},...VF([
    [`½(ln ${un} − 1)² ≥ 0 : croissante`,true,`Oui : ${un1} − ${un} = ${F(un)} − ${un} = ½(ln ${un} − 1)², positif ou nul. (${un}) est croissante.`],
    [`<i>f</i> ′(${un}) ≥ 0, donc croissante`,false,`Tu as lu le sens de la suite sur celui de <i>f</i>. <i>f</i> ′(${un}) ≥ 0 dit que <i>f</i> croît, pas que (${un}) croît : on étudie ${un1} − ${un}.`,`Le signe de <i>f</i> ′ dit-il le sens de la suite ? Étudie ${un1} − ${un}.`],
    [`${un} − ${un1} = ½(ln ${un} − 1)² ≥ 0, donc décroissante`,false,`Tu as inversé la différence : c’est ${un1} − ${un} qui vaut ½(ln ${un} − 1)². Avec ${U(1)} = ${fr(T.BAC19.f1,1)} > ${U(0)} = 1, la suite croît.`,`Quelle différence vaut ½(ln ${un} − 1)² : ${un1} − ${un} ou ${un} − ${un1} ?`]])}},
{cle:'bac-2-lim',beat:9,scene:'toile',set:{k:3,ecart:0},sujet:'la limite et les points fixes',
  text:[`Questions 1 c) et 2 (0,5 et 0,75 point) : croissante et majorée par e, (${un}) converge vers ℓ dans [1 ; e].`,`La limite vérifie ${F('ℓ')} = ℓ, c’est-à-dire ½(ln ℓ − 1)² = 0.`,{t:'Que vaut ℓ ?',fort:true}],
  pari:{reveal:[{p:{k:T.U0_MARCHES},d:2600}],...VF([
    ['e',true,`Oui : ln ℓ = 1, donc ℓ = e. Ici la limite est le majorant, par hasard : pour la dose, ${un} &lt; 3, et la limite était 2.`],
    ['1',false,`Tu as pris ${U(0)} pour la limite. La suite est croissante : elle ne revient pas à 1, car ℓ ≥ ${U(1)} = 3/2.`,`La suite croît à partir de ${U(0)} = 1 : peut-elle revenir à 1 ?`],
    ['+∞',false,`Tu as oublié que (${un}) est majorée par e. Croissante et majorée, elle converge : elle ne tend pas vers +∞.`,'Une suite majorée par e peut-elle tendre vers +∞ ?']])}},
{cle:'bac-erreur',beat:9,scene:'toile',set:{k:8,ecart:0},sujet:'f croissante ne donne pas (u(n)) croissante',
  text:[`Une copie écrit pour la question 1 b) : <i>f</i> est croissante, donc (${un}) est croissante.`,{t:'Où est l’erreur ?',fort:true}],
  verifie:{...VF([
    ['le sens de <i>f</i> ne donne pas celui de la suite',true,`Oui : <i>f</i> croissante ne dit pas que (${un}) croît. Il faut le signe de ${un1} − ${un}.`],
    ['il fallait écrire « <i>f</i> strictement croissante »',false,`Tu as cru que « strictement » règle le problème. Pas du tout : la dose partie de 5 décroît, avec <i>f</i> strictement croissante.`,'La dose partie de 5 : f est strictement croissante, et la suite ?'],
    ['aucune erreur : <i>f</i> croissante suffit pour la suite',false,`Tu as cru que « <i>f</i> croissante » suffit. La dose partie de 5 est un contre-exemple : <i>f</i> croissante, et pourtant (${un}) décroît.`,'Prends la dose partie de 5 : f est croissante. Que fait la suite ?']]),
    apres:{html:'Barème du problème de 2019 (Sciences expérimentales, session normale), deuxième partie : 1 a) 0,5 ; 1 b) 0,5 ; 1 c) 0,5 ; 2) 0,75.'}}},

/* ===== 10. bilan ===== */
{cle:'q1',beat:10,scene:'quiz',set:{qi:0,rv:0},sujet:'un majorant n’est pas la limite',
  text:['Trois pièges des copies, pour finir. Le premier : le majorant.',{t:`(${un}) est croissante et majorée par 5. Alors…`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    ['elle converge, vers une limite ≤ 5',true,'Oui : le critère donne la convergence, et la limite est ≤ 5. Un majorant n’est pas la limite.'],
    ['elle converge, et sa limite est 5',false,'Tu as pris le majorant pour la limite. Un majorant borne la limite, il ne la fixe pas : la dose était majorée par 3, sa limite était 2.','Un majorant est-il unique ? La dose était majorée par 3 et par 2.'],
    ['elle tend vers +∞, car elle croît',false,'Tu as oublié la borne : une suite majorée ne peut pas tendre vers +∞. Croissante et majorée, elle converge.','Une suite majorée par 5 peut-elle dépasser 5 ?']])}},
{cle:'q2',beat:10,scene:'quiz',set:{qi:1,rv:0},sujet:'le sens d’une suite récurrente',
  text:['Le deuxième : le sens.',{t:`${F('<i>x</i>')} = ½<i>x</i> + 1 est croissante, et ${U(0)} = 6. La suite (${un}) est…`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    [`décroissante : ${F('6')} = ${ent(T.U_DEP6)} &lt; 6`,true,`Oui : ${F('<i>x</i>')} − <i>x</i> = ½(2 − <i>x</i>) est négatif au-dessus de 2, et la suite part de 6. Elle descend.`],
    ['croissante, car <i>f</i> est croissante',false,'Tu as lu le sens de la suite sur celui de <i>f</i>. Le sens de <i>f</i> ne dit pas celui de la suite : on étudie le signe de <i>f</i>(<i>x</i>) − <i>x</i>.','Calcule f(6) : est-il plus grand ou plus petit que 6 ?'],
    ['impossible à dire sans calculer 30 termes',false,'Tu as cru qu’il faut calculer des termes. Le signe de <i>f</i>(<i>x</i>) − <i>x</i> sur l’intervalle des termes suffit.','Compare f(6) et 6 : cela suffit-il ?']])}},
{cle:'q3',beat:10,scene:'quiz',set:{qi:2,rv:0},sujet:'un point fixe ne prouve pas la convergence',
  text:['Le troisième : le point fixe.',{t:'ℓ = <i>f</i>(ℓ) a une solution. La suite converge-t-elle ?',fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    ['pas forcément : il faut prouver la convergence',true,`Oui : ${V(0)} = 2 et ${vn1} = 2${vn} − 1 ont le point fixe 1, mais ${vn} = 1 + 2<sup><i>n</i></sup> tend vers +∞.`],
    ['oui, elle converge vers cette solution',false,'Tu as cru que résoudre ℓ = <i>f</i>(ℓ) prouve la convergence. Elle dit où aller, si l’on y va : il faut prouver la convergence d’abord.','La suite v(n) = 1 + 2^n a le point fixe 1. Converge-t-elle ?'],
    ['oui, elle converge vers son premier terme',false,'Tu as pris le premier terme pour la limite. La limite ne dépend pas du départ : elle vérifie ℓ = <i>f</i>(ℓ).','Le curseur de u0 : la limite suivait-elle le départ ?']])}},
{cle:'fin',beat:10,scene:'end',set:{n:0},seq:[{p:{n:5},d:3000,w:300}],
  text:['Fin de la séance « La machine ».'],html:()=>profileHTML()}
];

// une inégalité ne commence jamais une ligne : espace insécable devant < et > (le noyau soude
// déjà =, ≤, ≥…, mais pas < et >)
const insec=s=>typeof s==='string'?s.replace(/ (&lt;|>)(?= )/g,'\u00A0$1'):s;
const insecT=v=>typeof v==='function'?()=>insecT(v()):Array.isArray(v)?v.map(insecT):v&&typeof v==='object'&&'t' in v?{...v,t:insec(v.t)}:insec(v);
STEPS.forEach(st=>{st.text=insecT(st.text);const P=st.pari||st.verifie;
  if(P)P.opts.forEach(o=>{o.t=insec(o.t);o.fb=insec(o.fb);if(o.indice)o.indice=insec(o.indice);});
  (st.deriv||[]).forEach(x=>{x.r=insec(x.r);});});

/* ---------- les mots ---------- */
const mots={
  'point-fixe':{t:'point fixe',d:'Un nombre ℓ tel que <i>f</i>(ℓ) = ℓ : sur la courbe de <i>f</i>, c’est un point de la droite <i>y</i> = <i>x</i>. Une suite <i>u</i><sub><i>n</i>+1</sub> = <i>f</i>(<i>u</i><sub><i>n</i></sub>) qui démarre en ℓ y reste.'},
  recurrence:{t:'récurrence',d:'Un raisonnement en deux pièces : la propriété est vraie au rang 0 (initialisation), et vraie à un rang <i>n</i> elle l’est au rang <i>n</i> + 1 (hérédité). Le mathématicien al-Karaji (953 - vers 1029) en a utilisé une forme, sans que ce soit encore la récurrence au sens strict (MacTutor).'},
  hypothese:{t:'hypothèse de récurrence',d:'Dans l’hérédité, c’est la propriété supposée vraie à un rang <i>n</i> fixé. On s’en sert pour démontrer la propriété au rang <i>n</i> + 1.'},
  majorant:{t:'majorée, majorant',d:'Une suite est majorée par <i>M</i> quand tous ses termes sont ≤ <i>M</i> : <i>M</i> est un majorant. Il n’est pas unique : tout nombre plus grand convient aussi. Minorée et minorant : tous les termes ≥ <i>m</i>.'}
};
Object.values(mots).forEach(m=>{m.d=insec(m.d);});

/* ---------- la fin de séance ---------- */
function profileHTML(){
  const Q=[['q1','un majorant n’est pas la limite','exercice 5'],['q2','<i>f</i> croissante, la suite pas forcément','exercice 4'],['q3','un point fixe ne prouve pas la convergence','exercice 6']];
  const res=Q.map(([k])=>ctx.juste(k));
  const Vs=STEPS.filter(s=>s.verifie),vok=Vs.filter(s=>ctx.juste(s.k)===true).length;
  const r=k=>ctx.rep(k),paris=[];
  if(r('plateau')!=null)paris.push(r('plateau')===1?'tu avais vu le plafond de la dose':'le plafond de la dose t’a surpris');
  if(r('ou-vont')!=null)paris.push(r('ou-vont')===0?'tu avais vu les marches aller au point fixe':'les marches vers le point fixe t’ont surpris');
  if(r('depart')!=null)paris.push(r('depart')===0?'tu savais que le départ ne change pas la limite':'la limite indépendante du départ t’a surpris');
  if(r('spirale')!=null)paris.push(r('spirale')===2?'tu avais vu que la suite n’est pas monotone':'la spirale t’a surpris');
  if(r('pas-retrecissent')!=null)paris.push(r('pas-retrecissent')===1?'tu avais vu que ralentir n’est pas converger':'une suite qui ralentit sans converger t’a surpris');
  const ligne=`« Vérifie » réussies du premier coup : ${vok} sur ${Vs.length}.${paris.length?` Tes paris : ${paris.join(' ; ')}.`:''}`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]} : ${Q[i][2]}</li>`).join('')
    +'<li>· la récurrence : initialisation et hérédité : exercice 2</li><li>· l’hérédité avec une fonction croissante : exercice 3</li>';
  const seance2=['les suites homographiques et leur suite auxiliaire, comme dans les exercices de 2020, 2021 et 2024 (sciences expérimentales)','le quotient <i>u</i><sub><i>n</i>+1</sub> / <i>u</i><sub><i>n</i></sub> et la majoration par une géométrique','les théorèmes de comparaison et d’encadrement','en SM seulement : l’inégalité des accroissements finis, puis les suites adjacentes'];
  return ty(`<p class="res">${ligne}</p><a class="lien-exos" href="/pilote/suites/exercices">Faire les exercices →</a>`
    +`<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>`
    +`<div class="next"><div class="pari-k">La prochaine séance : encadrer, comparer</div><ol>${seance2.map(x=>`<li>${x}</li>`).join('')}</ol></div>`
    +`<p class="small">Ses exercices sont déjà prêts, rangés à part à la fin de la page d’exercices.</p></details>`);
}

/* ---------- contrôles par étape ---------- */
S.nOk=false;S.nMontre=false;S.nEssais=0;S.nDispo=false;
S.uOk=false;S.uMontre=false;S.uEssais=0;S.uPos=[];S.uDispo=false;
const resetS=()=>{S.nOk=false;S.nMontre=false;S.nEssais=0;S.nDispo=false;S.uOk=false;S.uMontre=false;S.uEssais=0;S.uPos=[];S.uDispo=false;};
// le test de « Ce qu'il faut savoir », réussi du premier coup : on peut passer le rappel
function majSaut(){const z=root.querySelector('#saut'),st=ctx.etape();if(!z||!st||st.cle!=='savoir')return;
  if(ctx.juste('savoir')===true&&!z.innerHTML)z.innerHTML=`<p class="ctl-note">${ty('Tu connais la règle : tu peux passer le rappel.')}</p><button type="button" class="lg-saut" data-aller="comprime">Passer à l’énigme →</button>`;}
let minuteur=null;
const CTL={
  saut:{html:()=>'<div id="saut"></div>',init(){majSaut();}},
  // n : le curseur à crans de l'énigme ; « Montre-moi » après deux essais ou vingt secondes ; l'étape attend n ≥ 20
  n:{html:()=>`<div class="ctl"><label class="sl"><span>Nombre de jours <i>n</i> = <output id="on"></output></span><input id="rn" type="range" min="0" max="${T.JOURS.length-1}" step="1"></label></div><p class="ctl-note" id="nfb"></p><button type="button" class="ctl-btn alt${S.nDispo&&!S.nOk&&!S.nMontre?'':' lg-cache'}" id="montre"${S.nMontre||S.nOk?' disabled hidden':''}>Montre-moi</button>`,
    init(){const sc=scenes.doses,rn=$('#rn'),bt=$('#montre');
      const idx=()=>T.JOURS.reduce((m,v,i)=>Math.abs(v-sc.p.n)<Math.abs(T.JOURS[m]-sc.p.n)?i:m,0);
      const dispo=()=>{if(S.nOk||S.nMontre)return;S.nDispo=true;const b=$('#montre');if(b)b.classList.remove('lg-cache');};
      const sync=()=>{const n=Math.round(sc.p.n);rn.value=idx();$('#on').textContent=ent(n);
        if(n>=T.SEUIL_JOURS&&!S.nOk&&!S.nMontre){S.nOk=true;bt.disabled=true;bt.hidden=true;ctx.majNav();}
        $('#nfb').innerHTML=ty(S.nOk||S.nMontre?`Au jour 5, ${fr(D[5],4)} ; au jour 10, ${fr(D[10],4)}. Le sommet de chaque dent monte de moins en moins, et le creux tend vers 1.`:'Fais glisser le nombre de jours vers la droite. Que devient la quantité ?');};
      // le curseur attend le pari : manipulé avant, il donnerait la réponse
      const libre=()=>{rn.disabled=ctx.rep('plateau')==null;};libre();
      root.querySelectorAll('#body .opt').forEach(o=>o.addEventListener('click',()=>setTimeout(libre,0)));
      rn.addEventListener('input',()=>{ctx.stop();sc.p.n=T.JOURS[+rn.value];sc.p.saw=1;sc.p.pts=1;sc.p.fin=1;sc.render();sync();});
      rn.addEventListener('change',()=>{if(S.nOk||S.nMontre)return;S.nEssais++;if(S.nEssais>=2)dispo();});
      bt.addEventListener('click',()=>{if(S.nOk||S.nMontre)return;S.nMontre=true;bt.disabled=true;bt.hidden=true;ctx.majNav();ctx.tween(sc,{n:T.SEUIL_JOURS},1500).then(sync);sync();});
      hooks.frame=sync;sync();
      clearTimeout(minuteur);minuteur=setTimeout(()=>{const st=ctx.etape();if(st&&st.cle==='jours')dispo();},20000);}},
  // u0 : le point de départ de l'escalier ; deux positions essayées, ou « Montre-moi »
  u0:{html:()=>`<div class="ctl"><label class="sl"><span>Départ <i>u</i><sub>0</sub> = <output id="ou"></output></span><input id="ru" type="range" min="0" max="${T.CRANS_U0.length-1}" step="1"></label></div><p class="ctl-note" id="ufb"></p><button type="button" class="ctl-btn alt${S.uDispo&&!S.uOk&&!S.uMontre?'':' lg-cache'}" id="montre"${S.uMontre||S.uOk?' disabled hidden':''}>Montre-moi</button>`,
    init(){const sc=scenes.toile,ru=$('#ru'),bt=$('#montre');
      const idx=()=>T.CRANS_U0.reduce((m,v,i)=>Math.abs(v-sc.p.u0)<Math.abs(T.CRANS_U0[m]-sc.p.u0)?i:m,0);
      const dispo=()=>{if(S.uOk||S.uMontre)return;S.uDispo=true;const b=$('#montre');if(b)b.classList.remove('lg-cache');};
      const sync=()=>{ru.value=idx();$('#ou').textContent=ent(sc.p.u0);
        $('#ufb').innerHTML=ty(S.uOk||S.uMontre?`Du dessous (−1, 0, 1) ou du dessus (3, 5, 6), les marches vont à 2 : ${U(10)} ≈ ${fr(T.U10(-1),3)} pour −1, ${fr(T.U10(6),3)} pour 6.`:'Fais glisser le départ. Où vont les marches ?');};
      const joue=()=>{ctx.stop();sc.p.u0=T.CRANS_U0[+ru.value];sc.p.k=0;sc.render();sync();ctx.tween(sc,{k:T.U0_MARCHES},1500);};
      ru.addEventListener('input',joue);
      ru.addEventListener('change',()=>{if(S.uOk||S.uMontre)return;const v=T.CRANS_U0[+ru.value];if(!S.uPos.includes(v))S.uPos.push(v);S.uEssais++;if(S.uEssais>=2)dispo();if(S.uPos.length>=2){S.uOk=true;bt.disabled=true;bt.hidden=true;ctx.majNav();sync();}});
      bt.addEventListener('click',()=>{if(S.uOk||S.uMontre)return;S.uMontre=true;bt.disabled=true;bt.hidden=true;ctx.majNav();ctx.stop();sc.p.u0=T.CRANS_U0[0];sc.p.k=0;sc.render();sync();ctx.tween(sc,{k:T.U0_MARCHES},1800);});
      sync();
      clearTimeout(minuteur);minuteur=setTimeout(()=>{const st=ctx.etape();if(st&&st.cle==='u0-curseur')dispo();},20000);}},
};
// le point de départ se saisit et se glisse sur l'axe (étape du curseur de u0) : il retombe sur le cran le plus proche
{const sc0=scenes.toile;let drag=false;sc0.stHit.style.cursor='grab';
  const actif=()=>{const st=ctx.etape();return !!(st&&st.cle==='u0-curseur'&&$('#ru'));};
  var onDown=e=>{if(!actif())return;drag=true;e.preventDefault();};
  var onMove=e=>{if(!drag||!actif())return;const R=sc0.repere(),pt=ctx.svgPt(e),x=R.x0+(pt.x-R.ox)/R.U;
    const i=T.CRANS_U0.reduce((m,v,k)=>Math.abs(v-x)<Math.abs(T.CRANS_U0[m]-x)?k:m,0),ru=$('#ru');
    if(ru&&+ru.value!==i){ru.value=i;ru.dispatchEvent(new Event('input',{bubbles:true}));}};
  var onUp=()=>{if(!drag)return;drag=false;const ru=$('#ru');if(ru)ru.dispatchEvent(new Event('change',{bubbles:true}));};
  sc0.stHit.addEventListener('pointerdown',onDown);window.addEventListener('pointermove',onMove);window.addEventListener('pointerup',onUp);}
// « Passer à l'énigme » ; après un choix (clic ou touche), le noyau a rendu la réponse
const surClicL=e=>{const b=e.target.closest&&e.target.closest('[data-aller]');
  if(b&&root.contains(b)){const i=STEPS.findIndex(s=>s.cle===b.dataset.aller);if(i>=0)ctx.aller(i);return;}
  setTimeout(majSaut,0);};
const surToucheL=()=>setTimeout(majSaut,0);
root.addEventListener('click',surClicL);window.addEventListener('keydown',surToucheL);

return {BEATS,STEPS,CTL,mots,profileHTML,
  reset(){resetS();},
  plain:s=>s.replace(/⇔/g,' équivaut à ').replace(/\+∞/g,' plus l’infini').replace(/−∞/g,' moins l’infini').replace(/ℓ/g,' ℓ ').replace(/≤/g,' inférieur ou égal à ').replace(/≥/g,' supérieur ou égal à '),
  demonter(){clearTimeout(minuteur);root.removeEventListener('click',surClicL);window.removeEventListener('keydown',surToucheL);window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);}};
});
}
