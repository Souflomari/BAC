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
  {tag:'Piège 2 sur 3 : l’hérédité',big:'*f*(*x*) = √(*x* + 2), *u*_{0} = 0',r1:'*f*(0) ≤ *f*(*u*_{*n*}) ≤ *f*(2)',r2:'car *f* est croissante'},
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
const Tt=k=>`<i>t</i><sub>${sb(k)}</sub>`;
const Sg=k=>`<i>s</i><sub>${sb(k)}</sub>`;
const F=x=>`<i>f</i>(${x})`;
const un=U('n'), un1=U('n+1'), vn=V('n'), vn1=V('n+1'), wn=Wn('n'), sn=Sg('n'), sn1=Sg('n+1');
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
    [fr(T.DOSE_U2_ORDRE,0),false,'Tu as ajouté puis divisé : ½(1 + 1). On divise d’abord, la nuit, et on ajoute ensuite, le matin.','Qui vient en premier, la nuit ou la prise du matin ?']]),reveal:[{p:{n:2},d:900},{p:{n:3},d:900,w:500}],
    apres:{tex:[['u_{n+1}=\\dfrac{1}{2}\\,u_n+1,\\quad u_0=0','u(n+1) = ½u(n) + 1, u(0) = 0']],html:`Chaque matin, la quantité est la moitié de celle de la veille, plus 1 : ${U(3)} = ${fr(D[3],2)}. Ni arithmétique, ni géométrique : chaque terme se calcule à partir du précédent.`}}},
{cle:'plateau',beat:1,scene:'doses',set:{n:3,saw:1,pts:1,fin:1,tab:0},sujet:'prévoir la suite d’une suite',
  text:['Chaque matin en ajoute un.',{t:'Pendant des mois, la quantité…',fort:true}],
  pari:{...BET([['grandit sans limite',PARI_NOTE],['s’approche d’un plafond',PARI_NOTE],['grandit, puis finit par redescendre',PARI_NOTE]])}},
{cle:'jours',beat:1,scene:'doses',set:{n:3,saw:1,pts:1,fin:1,tab:0},ctl:'n',need:()=>!!(S.nOk||S.nMontre),needLabel:'Fais glisser le nombre de jours d’abord',
  text:['Fais glisser le nombre de jours.','Regarde le sommet de chaque dent, puis le creux.']},
{cle:'questions',beat:1,scene:'doses',set:{n:30,saw:1,pts:1,fin:1,plaf:1,bas:1,tab:0},
  text:()=>[(r=>r===1?'Tu avais parié sur un plafond : la quantité s’approche de 2 sans le dépasser.':r===0?'Tu avais parié sur une croissance sans limite : la quantité s’arrête pourtant près de 2.':r===2?'Tu avais parié qu’elle redescend : elle ne redescend pas, elle s’arrête près de 2.':'La quantité s’approche de 2 sans le dépasser.')(ctx.rep('plateau')),
    'Quand la nuit enlève-t-elle exactement 1 ?',{t:'Pourquoi jamais au-dessus de 2 ? Pourquoi 2 ? En combien de jours à 1 % près ?',fort:true}]},

/* ===== 2. la machine et son escalier (la figure-clé) ===== */
{cle:'machine',beat:2,scene:'toile',set:{f:'dose',cb:0,diag:0,u0:0,k:0,zoom:0,cad:0,fixe:0,zone:0,ecart:0,en:2,axeU:0,pt1:0,bornes:0,lecU:0,wr:0},seq:[{p:{cb:1},d:1500,w:200}],sujet:'la machine u(n+1) = f(u(n))',
  text:['Une suite récurrente est une machine : on entre un terme, elle rend le suivant.',{t:`Ici, la machine est ${F('<i>x</i>')} = ½<i>x</i> + 1, et sa courbe est une droite.`,a:0}],
  tex:[['u_{n+1}=f(u_n)','u(n+1) = f(u(n))']]},
{cle:'premiere-marche',beat:2,scene:'toile',set:{cb:1,diag:1,u0:0,k:0,axeU:0,pt1:0},seq:[{p:{k:0.5},d:900,w:300}],sujet:'reporter un terme sur l’axe',
  text:[`On part de ${U(0)} = 0 sur l’axe horizontal, puis on monte jusqu’à la courbe. La droite <i>y</i> = <i>x</i> est tracée.`,`La hauteur atteinte est ${U(1)} = ${F('0')} = ${fr(D[1],0)}.`,{t:`Pour calculer ${U(2)} = ${F(U(1))}, il faut placer ${U(1)} sur l’axe horizontal. Quel chemin suivre, sans calcul ?`,fort:true}],
  pari:{...VF([
    ['aller à la droite <i>y</i> = <i>x</i>, puis descendre',true,'Oui : la droite <i>y</i> = <i>x</i> échange hauteur et abscisse. On va à l’horizontale jusqu’à elle, et la verticale donne '+U(1)+' sur l’axe.'],
    ['redescendre à la verticale, sur l’axe',false,`Tu redescends tout droit : cela ramène sur ${U(0)}, pas sur ${U(1)}. Il faut passer par la droite <i>y</i> = <i>x</i>, qui échange hauteur et abscisse.`,`Où retombes-tu si tu descends tout droit depuis le point (0 ; ${fr(D[1],0)}) ?`],
    ['lire '+U(1)+' sur l’axe vertical, c’est assez',false,`Tu lis ${U(1)} en hauteur, mais ${F('<i>x</i>')} se lit à partir d’une abscisse. Il faut que ${U(1)} devienne une abscisse : la droite <i>y</i> = <i>x</i> le fait.`,`${F('<i>x</i>')} se lit à partir de quoi, une abscisse ou une hauteur ?`]]),
    reveal:[{p:{k:1},d:900},{p:{pt1:1},d:500,w:200},{p:{axeU:1},d:700}]}},
{cle:'escalier',beat:2,scene:'toile',set:{diag:1,k:1,axeU:1},seq:[{p:{k:4},d:2600,w:300}],sujet:'l’escalier',
  text:['Même geste, trois fois de plus : on monte à la courbe, on va à la droite, on descend sur l’axe.',{t:`Les termes apparaissent : ${U(2)} = ${fr(D[2],1)}, ${U(3)} = ${fr(D[3],2)}, ${U(4)} = ${fr(D[4],3)}, comme dans l’énigme.`,a:0}]},
{cle:'ou-vont',beat:2,scene:'toile',set:{k:4,axeU:1,pt1:0,zoom:0,fixe:0},sujet:'où est le plafond sur la figure',
  text:[`Dans l’énigme, la quantité plafonnait à ${ent(T.PLATEAU)}. Les marches continuent.`,{t:`Sur la figure, où est ce ${ent(T.PLATEAU)} ?`,fort:true}],
  pari:{...BET([['là où la courbe coupe la droite <i>y</i> = <i>x</i>',PARI_NOTE],['là où la courbe coupe l’axe vertical',PARI_NOTE],['en haut de la dernière marche',PARI_NOTE]]),reveal:[{p:{k:T.U0_MARCHES},d:2800},{p:{zoom:1},d:2200}]}},
{cle:'point-fixe',beat:2,scene:'toile',set:{k:T.U0_MARCHES,zoom:1,axeU:1,fixe:1},sujet:'le point fixe',
  text:['Le point où la courbe coupe la droite s’appelle le [[point-fixe|point fixe]] ℓ.',`Il vérifie ${F('ℓ')} = ℓ : ½ℓ + 1 = ℓ, donc ½ℓ = ${ent(T.PLATEAU/2)}, donc ℓ = ${ent(T.PLATEAU)}.`,{t:`Voilà pourquoi ${ent(T.PLATEAU)} : la nuit enlève alors exactement ${ent(T.PLATEAU/2)}, ce que la prise ajoute.`,fort:true}],
  tex:[[`\\dfrac{1}{2}\\,\\ell+1=\\ell\\iff \\dfrac{1}{2}\\,\\ell=${T.PLATEAU/2}\\iff \\ell=${T.PLATEAU}`,`½ℓ + 1 = ℓ équivaut à ½ℓ = ${ent(T.PLATEAU/2)}, soit ℓ = ${ent(T.PLATEAU)}`]]},
{cle:'depart',beat:2,scene:'toile',set:{zoom:0,u0:5,k:0,fixe:0,axeU:1,lecU:1},sujet:'le départ ne fixe pas la limite',
  text:[`Un patient a reçu une forte dose au départ : ${U(0)} = 5.`,{t:'Les marches vont vers…',fort:true}],
  pari:{...BET([['2, comme avant',PARI_NOTE],['un plafond plus haut que 2, car on part plus haut',PARI_NOTE],['5 : la suite reste près de son départ',PARI_NOTE]]),reveal:[{p:{k:T.U0_MARCHES},d:3000}]}},
{cle:'u0-curseur',beat:2,scene:'toile',set:{u0:5,k:T.U0_MARCHES,axeU:1,fixe:1,lecU:1,zoom:0},ctl:'u0',need:()=>!!(S.uOk||S.uMontre),needLabel:'Fais glisser le départ d’abord',
  text:[`Fais glisser ${U(0)}.`,'Du dessous ou du dessus, regarde où vont les marches.']},

/* ===== 3. la récurrence ===== */
{cle:'pas-assez',beat:3,scene:'table',set:{mode:'tgeo',rows:0},seq:[{p:{rows:8},d:1800,w:200}],sujet:'des termes calculés ne prouvent rien',
  text:[`Rappel de l’énigme : la dose ${un} reste sous ${ent(T.PLATEAU)}, au moins pour les ${T.PAS_ASSEZ.n+1} termes calculés.`,`Une autre suite, ${Tt('n')} = 0,1 × 1,5<sup><i>n</i></sup> : ${Tt(0)} à ${Tt(7)} sont tous sous ${ent(T.PLATEAU)}.`,{t:`Le terme ${Tt(8)} est…`,fort:true}],
  pari:{...BET([['inférieur à 2',PARI_NOTE],['supérieur à 2',PARI_NOTE]]),reveal:[{p:{rows:9},d:900}],
    apres:{html:`${Tt(8)} = 0,1 × 1,5<sup>8</sup> ≈ ${fr(T.TG8,2)} : huit termes sous ${ent(T.PLATEAU)} ne disent rien du suivant. <b>Des termes calculés ne prouvent rien : il faut un argument valable pour tout <i>n</i>.</b>`}}},
{cle:'dominos',beat:3,scene:'toile',set:{f:'dose',cb:1,diag:1,u0:0,k:6,zoom:0,cad:0,fixe:0,zone:0,ecart:0,axeU:1,pt1:0,bornes:0,lecU:0},sujet:'la récurrence en deux pièces',
  text:['La [[recurrence|récurrence]] marche comme des dominos, en deux pièces.','L’initialisation : la propriété est vraie au rang 0.','L’hérédité : si elle est vraie à un rang <i>n</i>, elle l’est au rang <i>n</i> + 1.',{t:'Il faut les deux pièces.',fort:true}],
  tex:[['P(0)\\ \\text{vraie}\\ \\text{et}\\ \\bigl(P(n)\\Rightarrow P(n+1)\\bigr)\\ \\text{pour tout}\\ n\\ \\Longrightarrow\\ P(n)\\ \\text{pour tout}\\ n','P(0) vraie et P(n) ⇒ P(n + 1) pour tout n donnent P(n) pour tout n']]},
{cle:'heredite-debut',beat:3,scene:'toile',sujet:'rédiger le début de l’hérédité',
  text:[`Prenons la propriété P(<i>n</i>) : 0 ≤ ${un} &lt; 2. Au rang 0, ${U(0)} = 0 : P(0) est vraie.`,'On rédige l’hérédité.',{t:'Comment commence-t-elle ?',fort:true}],
  tex:[['P(n):\\ 0\\le u_n<2','P(n) : 0 ≤ u(n) < 2']],
  pari:{...VF([
    [`Soit <i>n</i> tel que 0 ≤ ${un} &lt; 2. Montrons que 0 ≤ ${un1} &lt; 2`,true,'Oui : on suppose P(<i>n</i>) à un rang <i>n</i> fixé, puis on montre P(<i>n</i> + 1). C’est l’hypothèse de récurrence.'],
    [`Supposons que 0 ≤ ${un} &lt; 2 pour tout <i>n</i>`,false,'Tu supposes la propriété pour tout <i>n</i> : c’est ce qu’on veut démontrer. On la suppose à un seul rang <i>n</i>, puis on prouve le suivant.','Que veut-on démontrer à la fin : la propriété pour un <i>n</i>, ou pour tout <i>n</i> ?'],
    [`Montrons que 0 ≤ ${un1} &lt; 2, sans rien supposer`,false,`Sans hypothèse, rien ne borne ${un1}. L’hérédité part de P(<i>n</i>) : on suppose 0 ≤ ${un} &lt; 2 à un rang <i>n</i>.`,`Que sais-tu de ${un1} si tu ne supposes rien sur ${un} ?`]])}},
{cle:'heredite',beat:3,scene:'toile',set:{u0:0,bornes:0},sujet:'l’hérédité, par une fonction croissante',
  text:[`On a supposé 0 ≤ ${un} &lt; 2. La fonction ${F('<i>x</i>')} = ½<i>x</i> + 1 est croissante : elle garde l’ordre.`,{t:`Comment encadrer ${un1} = ${F(un)} ?`,fort:true}],
  deriv:[{tex:'0\\le u_n<2',alt:'0 ≤ u(n) < 2',r:'L’[[hypothese|hypothèse de récurrence]], au rang <i>n</i>.'}],
  pari:{label:`La ligne suivante${NNB}?`,reveal:[{p:{bornes:1},d:900}],apres:{tex:[['f(0)\\le f(u_n)<f(2)\\iff 1\\le u_{n+1}<2','f(0) ≤ f(u(n)) < f(2), soit 1 ≤ u(n+1) < 2'],['0\\le u_{n+1}<2','0 ≤ u(n+1) < 2']],html:`C’est P(<i>n</i> + 1). <b>Conclusion : pour tout <i>n</i>, 0 ≤ ${un} &lt; 2.</b> La fonction ${F('<i>x</i>')} envoie [0 ; 2[ dans [${ent(T.f_dose(0))} ; 2[ : l’intervalle <i>I</i> = [0 ; 2] vérifie ${F('<i>I</i>')} ⊂ <i>I</i>.`},opts:[
    {t:M('f(0)\\le f(u_n)<f(2)',`${F('0')} ≤ ${F(un)} &lt; ${F('2')}`)+', car <i>f</i> est croissante',ok:true,fb:`Oui : <i>f</i> garde l’ordre, avec ${F('0')} = ${ent(T.f_dose(0))} et ${F('2')} = ${ent(T.f_dose(2))}. Cela donne ${ent(T.f_dose(0))} ≤ ${un1} &lt; 2, donc 0 ≤ ${un1} &lt; 2.`},
    {t:M('f(0)\\ge f(u_n)>f(2)',`${F('0')} ≥ ${F(un)} > ${F('2')}`)+', car <i>f</i> renverse l’ordre',indice:`${F('0')} = ${ent(T.f_dose(0))} et ${F('2')} = ${ent(T.f_dose(2))} : une fonction croissante garde-t-elle ou renverse-t-elle l’ordre ?`,fb:`Tu as renversé l’ordre, comme pour une fonction décroissante. <i>f</i> est croissante, et ton encadrement donnerait ${ent(T.f_dose(0))} ≥ ${un1} > ${ent(T.f_dose(2))}, impossible.`},
    {t:`${F(un)} &lt; 2, car ½<i>x</i> + 1 &lt; 2 pour tout réel <i>x</i>`,indice:`Teste ½<i>x</i> + 1 &lt; 2 avec <i>x</i> = 3 : est-ce vrai pour tout réel <i>x</i> ?`,fb:`Tu as écrit une hérédité sans hypothèse : ½<i>x</i> + 1 &lt; 2 est faux pour <i>x</i> = 3, qui donne ${fr(T.HEREDITE_CONTRE,1)}. Il faut partir de 0 ≤ ${un} &lt; 2.`},
    {t:M('f(0)\\le f(u_{n+1})<f(2)',`${F('0')} ≤ ${F(un1)} &lt; ${F('2')}`)+', car <i>f</i> est croissante',indice:`Que sais-tu déjà : ${un} ou ${un1} ?`,fb:`Tu as mélangé ${un} et ${un1} : on ne sait encore rien de ${un1}, c’est ce qu’on cherche. L’hypothèse porte sur ${un} : on applique <i>f</i> à ${un}.`}]}},
{cle:'init-oubliee',beat:3,scene:'toile',set:{bornes:0},sujet:'l’initialisation ne s’oublie pas',
  text:[`Une copie démontre : si ${un} > 2, alors ½${un} + 1 > 2. Elle conclut : ${un} > 2 pour tout <i>n</i>.`,{t:'Qu’en penses-tu ?',fort:true}],
  pari:{apres:{html:'Sans initialisation, la récurrence ne démarre pas : l’hérédité seule ne prouve rien.'},...VF([
    [`faux : ${U(0)} = 0, l’initialisation manque`,true,`Oui : la propriété est fausse au rang 0, puisque ${U(0)} = 0 n’est pas supérieur à 2. Sans premier domino, les autres ne tombent pas.`],
    ['juste : l’hérédité suffit',false,`Tu as cru qu’une hérédité suffit. Elle ne dit pas où commencer : ici elle « démontre » une propriété fausse, car ${U(0)} = 0.`,`Que vaut ${U(0)} ? Vérifie la propriété au rang 0.`],
    ['faux : l’hérédité contient une erreur',false,`Tu as cherché la faute dans l’hérédité : elle est juste, car si <i>x</i> > 2 alors ½<i>x</i> + 1 > 2. Ce qui manque, c’est l’initialisation : la propriété est fausse au rang 0, puisque ${U(0)} = 0.`,'Teste l’implication avec <i>x</i> = 4 : ½<i>x</i> + 1 > 2 ? Où est alors le défaut ?']])}},
{cle:'v-recurrence',beat:3,scene:'toile',set:{u0:5,k:6,axeU:1,lecU:0,bornes:0},sujet:'choisir la propriété qui se démontre',
  text:[`Avec ${U(0)} = 5, la suite part de l’autre côté de 2.`,{t:'Laquelle de ces propriétés se démontre par récurrence ?',fort:true}],
  verifie:{...VF([
    [`${un} > 2 pour tout <i>n</i>`,true,`Oui : initialisation 5 > 2, et si ${un} > 2 alors ½${un} + 1 > 2. Les mêmes deux pièces.`],
    [`${un} &lt; 2 pour tout <i>n</i>`,false,`Tu as gardé la propriété du départ à 0. Mais l’initialisation est fausse : ${U(0)} = 5 n’est pas inférieur à 2.`,`Que vaut ${U(0)} ? Est-il inférieur à 2 ?`],
    [`${un} ≥ 5 pour tout <i>n</i>`,false,`Tu as cru que la suite ne descend jamais sous son départ. L’hérédité échoue : ${U(1)} = ${fr(T.U_DEPART5_1,1)} &lt; 5.`,`Calcule ${U(1)} : est-il supérieur ou égal à 5 ?`]])}},

/* ===== 4. le sens de variation ===== */
{cle:'difference',beat:4,scene:'toile',set:{u0:0,k:6,axeU:1,ecart:1,en:0,lecU:0,cad:1,zone:0,bornes:0},sujet:'le signe de u(n+1) − u(n)',
  text:[`Pour le sens de variation, on étudie le signe de ${un1} − ${un}.`],
  deriv:[{tex:'u_{n+1}-u_n=\\dfrac{1}{2}\\,u_n+1-u_n',alt:'u(n+1) − u(n) = ½u(n) + 1 − u(n)',r:'La relation de récurrence.'}],
  pari:{label:`La ligne suivante${NNB}?`,reveal:[{p:{zone:1},d:900}],apres:{tex:[['u_{n+1}-u_n=\\dfrac{1}{2}(2-u_n)>0','u(n+1) − u(n) = ½(2 − u(n)) > 0']],html:`Donc (${un}) est croissante. <b>${un1} − ${un} = ${F(un)} − ${un} est l’écart vertical entre la courbe et la droite <i>y</i> = <i>x</i>.</b> Là où la courbe est au-dessus de la droite, les marches montent.`},opts:[
    {t:M('=\\tfrac12(2-u_n)>0,\\ \\text{car}\\ u_n<2',`= ½(2 − ${un}) > 0, car ${un} &lt; 2`),ok:true,fb:`Oui : ½${un} + 1 − ${un} = ½(2 − ${un}), positif d’après la partie sur la récurrence. La suite croît.`},
    {t:`> 0, car <i>f</i> est croissante`,indice:`Le sens de <i>f</i> est-il celui de la suite ? Regarde le signe de ${un1} − ${un}.`,fb:`Tu as lu le sens de la suite sur celui de <i>f</i>. Le sens de <i>f</i> ne dit pas celui de la suite : on étudie le signe de ${un1} − ${un}.`},
    {t:M('u_n-u_{n+1}=\\tfrac12(2-u_n)>0,\\ \\text{donc décroissante}',`${un} − ${un1} = ½(2 − ${un}) > 0, donc décroissante`),indice:`Quelle différence étudie-t-on : ${un1} − ${un} ou ${un} − ${un1} ?`,fb:`Tu as inversé la différence et perdu un signe : ${un} − ${un1} = −½(2 − ${un}). On étudie ${un1} − ${un}, positive ici : la suite croît.`}]}},
{cle:'depart-mono',beat:4,scene:'toile',set:{u0:5,k:4,cad:0,zone:0,ecart:0,axeU:1},sujet:'f croissante, mais la suite ?',
  text:[`Avec ${U(0)} = 5, ${F('<i>x</i>')} est toujours croissante.`,{t:'La suite est…',fort:true}],
  pari:{...VF([
    ['décroissante',true,`Oui : ${un} > 2, donc ${F(un)} − ${un} = ½(2 − ${un}) &lt; 0. La courbe est sous la droite, les marches descendent.`],
    ['croissante, car <i>f</i> l’est',false,`Tu as confondu « <i>f</i> croissante » et « (${un}) croissante ». Regarde le signe de ${F(un)} − ${un} : ${U(1)} = ${fr(T.U_DEPART5_1,1)} est plus petit que ${U(0)} = 5.`,`${U(1)} = ${fr(T.U_DEPART5_1,1)} et ${U(0)} = 5 : qui est le plus grand ?`],
    ['ni l’une ni l’autre',false,`Tu n’as pas regardé où vivent les ${un}. Pour ${un} > 2, la courbe est sous la droite : la suite est monotone, elle descend.`,`Où est la courbe par rapport à la droite quand ${un} > 2 ?`]]),reveal:[{p:{zone:2},d:900}]}},
{cle:'spirale',beat:4,scene:'toile',set:{f:'expm',u0:0,k:0,cad:0,zone:0,ecart:0,axeU:1,fixe:0,lecU:0,zoom:0},sujet:'f décroissante, la suite aussi ?',
  text:[`Une autre machine : ${un1} = e<sup>−${un}</sup>, avec ${U(0)} = 0.`,`Ici ${F('<i>x</i>')} = e<sup>−<i>x</i></sup> est décroissante.`,{t:`La suite (${un}) est…`,fort:true}],
  pari:{...BET([['décroissante, comme <i>f</i>',PARI_NOTE],['croissante',PARI_NOTE],['ni l’une ni l’autre',PARI_NOTE]]),reveal:[{p:{k:8},d:3800},{p:{fixe:1},d:500}],
    apres:{tex:[['e^{-\\ell}=\\ell','e^(−ℓ) = ℓ']],html:`Les termes alternent : ${T.SPIRALE.slice(0,6).map(v=>fr(v,2)).join(' ; ')}, autour de ℓ ≈ ${fr(T.FIX_EXPM,3)}. Une fonction décroissante renverse l’ordre : ${U(0)} &lt; ${U(2)} entraîne ${U(1)} > ${U(3)}. <b>La suite n’est pas monotone, elle tourne, et pourtant elle converge vers ℓ.</b>`}}},
/* ===== 5. converger ===== */
{cle:'rappel',beat:5,scene:'toile',set:{f:'dose',u0:5,k:6,cb:1,diag:1,cad:0,zoom:0,fixe:0,zone:0,ecart:0,axeU:1,pt1:0,bornes:0,lecU:0,wr:0},sujet:'le sens d’une suite récurrente',
  text:['Mi-parcours : c’est le bon moment pour une pause.',`Un rappel des parties précédentes : ${U(0)} = 5 et ${un1} = ½${un} + 1.`,{t:'La suite est… et pourquoi ?',fort:true}],
  verifie:{...VF([
    [`décroissante, car ${F('<i>x</i>')} − <i>x</i> = ½(2 − <i>x</i>) &lt; 0 pour <i>x</i> > 2`,true,`Oui : ${un} > 2, donc ${un1} − ${un} &lt; 0. Les marches descendent : ${U(1)} = ${fr(T.U_DEPART5[1],2)} &lt; ${U(0)} = 5.`],
    ['croissante, car <i>f</i> est croissante',false,`Tu as lu le sens de la suite sur celui de <i>f</i>. Le sens de <i>f</i> ne dit pas celui de la suite : ${U(1)} = ${fr(T.U_DEPART5[1],2)} est plus petit que ${U(0)} = 5.`,`Calcule ${U(1)} : est-il plus grand ou plus petit que ${U(0)} = 5 ?`],
    ['ni croissante ni décroissante : elle tourne autour de 2',false,`Tu as confondu avec la spirale, où <i>f</i> est décroissante. Ici <i>f</i> est croissante : les termes restent du même côté de 2, ${U(1)} = ${fr(T.U_DEPART5[1],2)}, ${U(2)} = ${fr(T.U_DEPART5[2],2)}.`,`${U(1)} = ${fr(T.U_DEPART5[1],2)} et ${U(2)} = ${fr(T.U_DEPART5[2],2)} : de quel côté de 2 sont-ils ?`]])}},
{cle:'theoreme',beat:5,scene:'toile',set:{f:'dose',u0:0,k:T.U0_MARCHES,zoom:0,cad:0,fixe:0,zone:0,ecart:0,axeU:1,lecU:0,bornes:0},sujet:'le critère de convergence monotone',
  text:[`La dose monte et ne dépasse jamais ${ent(T.PLATEAU)}.`,{t:'A-t-elle forcément une limite ?',fort:true}],
  pari:{...BET([['oui : elle converge',PARI_NOTE],['non : elle peut monter sans fin',PARI_NOTE],['cela dépend de son départ',PARI_NOTE]]),
    apres:{tex:[['(u_n)\\ \\text{croissante, majorée}\\ \\Rightarrow\\ \\text{converge}','u(n) croissante, majorée ⇒ converge'],['(u_n)\\ \\text{décroissante, minorée}\\ \\Rightarrow\\ \\text{converge}','u(n) décroissante, minorée ⇒ converge']],
      html:'C’est le critère de convergence monotone : on l’admet, sans le démontrer. <b>Il demande les deux à la fois : la monotonie et une borne.</b>'}}},
{cle:'majorant-3',beat:5,scene:'toile',sujet:'un majorant n’est pas la limite',
  text:[`Pour ${U(0)} = 0, on a aussi ${un} &lt; 3 pour tout <i>n</i> : c’est vrai, car ${un} &lt; 2.`,{t:'Croissante et [[majorant|majorée]] par 3, la suite…',fort:true}],
  pari:{...VF([
    ['converge, vers une limite ≤ 3',true,'Oui : le critère donne la convergence, et la limite est ≤ 3. Un majorant borne la limite, il ne la fixe pas.'],
    ['converge vers 3',false,'Tu as pris le majorant pour la limite. Un majorant n’est pas unique : 2 majore aussi la suite, et c’est lui qui est la limite.','La limite est 2. Un majorant est-il unique ?'],
    ['tend vers +∞, car elle est croissante',false,'Tu as oublié qu’être majorée empêche de tendre vers +∞. Croissante et majorée, elle converge.','Une suite majorée par 3 peut-elle dépasser 3 ?']])}},
{cle:'bornee-oscille',beat:5,scene:'table',set:{mode:'alt',rows:0},seq:[{p:{rows:10},d:1800,w:200}],sujet:'bornée ne suffit pas',
  text:['(−1)<sup><i>n</i></sup> reste entre −1 et 1.',{t:'Converge-t-elle ?',fort:true}],
  pari:{...VF([
    ['non : elle saute de −1 à 1 sans se fixer',true,'Oui : bornée seule ne permet pas d’appliquer le critère, car (−1)<sup><i>n</i></sup> est bornée et ne converge pas. Le critère suffit, il n’est pas nécessaire : la spirale converge sans être monotone.'],
    ['oui, vers 0, entre ses bornes',false,'Tu as cru qu’être bornée suffit à converger. Bornée seule ne permet pas d’appliquer le critère : (−1)<sup><i>n</i></sup> est bornée et ne converge pas.','Le critère demande deux hypothèses. Lesquelles ? Il en manque une ici.'],
    ['oui, car une suite bornée est monotone',false,'Tu as cru qu’une suite bornée est monotone. Contre-exemple : (−1)<sup><i>n</i></sup> est bornée, et elle n’est ni croissante ni décroissante.','La suite 1, −1, 1, −1 monte-t-elle ou descend-elle ?']])}},
{cle:'pas-retrecissent',beat:5,scene:'toile',set:{f:'pas',u0:0,k:0,cb:1,diag:1,axeU:1,zone:0,ecart:0,fixe:0,zoom:0,cad:0,lecU:0,wr:0},sujet:'ralentir, ce n’est pas converger',
  text:[`Une machine dont les marches rétrécissent : ${Wn('n+1')} = ${wn} + e<sup>−${wn}</sup>, avec ${Wn(0)} = 0.`,`Chaque pas e<sup>−${wn}</sup> est plus petit que le précédent.`,{t:`La suite (${wn})…`,fort:true}],
  pari:{...BET([['converge : les pas rétrécissent',PARI_NOTE],['tend vers +∞',PARI_NOTE],['oscille',PARI_NOTE]]),reveal:[{p:{k:T.U0_MARCHES},d:2600},{p:{wr:1},d:1500}],apres:{html:`La suite ralentit, mais elle ne s’arrête pas : ${Wn(T.PAS_N[0])} ≈ ${fr(T.PAS_V[0],2)}, ${Wn(ent(T.PAS_N[1]))} ≈ ${fr(T.PAS_V[1],2)}, ${Wn(ent(T.PAS_N[2]))} ≈ ${fr(T.PAS_V[2],2)}. Pourquoi ? La partie suivante répond.`}}},

/* ===== 6. la limite ===== */
{cle:'continuite',beat:6,scene:'toile',set:{f:'dose',u0:0,k:T.U0_MARCHES,zoom:0,cad:0,fixe:1,axeU:1,wr:0,cb:1,diag:1,zone:0,ecart:0,bornes:1},sujet:'la limite vérifie ℓ = f(ℓ)',
  text:[`Rappel de l’énigme : la dose est croissante et majorée par ${ent(T.PLATEAU)}, elle converge.`,`Supposons que (${un}) converge vers ℓ, et que <i>f</i> est continue. Alors ${F(un)} tend vers ${F('ℓ')}.`,`Or ${F(un)} = ${un1}, qui tend aussi vers ℓ.`,{t:`Donc ℓ = ${F('ℓ')}.`,fort:true}],
  tex:[['\\ell=f(\\ell)\\quad\\text{si } f \\text{ continue sur } I,\\ f(I)\\subset I,\\ u_0\\in I,\\ (u_n)\\text{ convergente}','ℓ = f(ℓ) si f est continue sur I, f(I) ⊂ I, u(0) ∈ I et u(n) converge']]},
{cle:'limite-dose',beat:6,scene:'toile',set:{zoom:0,fixe:1,bornes:0},sujet:'justifier la convergence',
  text:['La suite de l’énigme converge.',{t:'Quelle justification écris-tu ?',fort:true}],
  verifie:{...VF([
    [`elle est croissante et majorée par ${ent(T.PLATEAU)}`,true,`Oui : c’est le critère de convergence monotone. Le point fixe ${ent(T.PLATEAU)} vient après, pour la valeur de la limite.`],
    ['elle est croissante, donc elle converge',false,'Tu as oublié la borne : une suite croissante qui n’est pas majorée tend vers +∞. Il faut aussi un majorant.','Croissante suffit-elle ? Que dit le critère de la borne ?'],
    [`ℓ = ${F('ℓ')} a la solution ${ent(T.PLATEAU)}`,false,'Tu as utilisé le point fixe pour prouver la convergence. Il dit où aller, si l’on y va : la convergence se prouve avant.','Le point fixe dit-il que la suite converge, ou seulement où elle irait ?']])}},
{cle:'piege-2u',beat:6,scene:'toile',set:{f:'double',u0:2,k:0,zoom:0,cad:0,fixe:1,axeU:1,bornes:0},sujet:'un point fixe ne prouve pas la convergence',
  text:[`Une autre machine : ${Sg(0)} = 2 et ${sn1} = 2${sn} − 1.`,`On résout ℓ = 2ℓ − 1 : ℓ = 1.`,{t:'Donc…',fort:true}],
  pari:{...VF([
    ['on ne peut rien conclure sans prouver la convergence',true,`Oui : ${Sg(1)} = ${ent(T.S_DOUBLE[1])}, ${Sg(2)} = ${ent(T.S_DOUBLE[2])}, ${Sg(3)} = ${ent(T.S_DOUBLE[3])}, la suite s’écarte de 1.`],
    [`${sn} tend vers 1, car ℓ = 1 est la solution`,false,`Tu as calculé la limite avant de prouver la convergence. Ici ${Sg(1)} = ${ent(T.S_DOUBLE[1])}, ${Sg(2)} = ${ent(T.S_DOUBLE[2])}, ${Sg(3)} = ${ent(T.S_DOUBLE[3])} : la suite s’éloigne de 1.`,`Calcule ${Sg(1)}, ${Sg(2)}, ${Sg(3)}. Se rapprochent-ils de 1 ?`],
    [`${sn} tend vers 2, car c’est son premier terme`,false,`Tu as pris le départ pour la limite. ${Sg(1)} = ${ent(T.S_DOUBLE[1])} et ${Sg(2)} = ${ent(T.S_DOUBLE[2])} : la suite s’éloigne aussi de 2.`,`Calcule ${Sg(1)} et ${Sg(2)} : restent-ils près de 2 ?`]]),
    reveal:[{p:{k:4},d:2400}],apres:{tex:[['s_n=1+2^{n}\\longrightarrow+\\infty','s(n) = 1 + 2^n tend vers +∞']],html:'<b>ℓ = <i>f</i>(ℓ) dit où aller, si l’on y va.</b>'}}},
{cle:'sans-point-fixe',beat:6,scene:'toile',set:{f:'pas',u0:0,k:T.U0_MARCHES,fixe:0,zoom:0,wr:0,axeU:1},sujet:'une suite sans point fixe',
  text:[`On revient à la suite ${Wn('n+1')} = ${wn} + e<sup>−${wn}</sup>.`,'Elle est croissante. Si elle convergeait vers ℓ, on aurait ℓ = <i>f</i>(ℓ), car <i>f</i> est continue.'],
  deriv:[{tex:'w_{n+1}-w_n=e^{-w_n}>0',alt:'w(n+1) − w(n) = e^(−w(n)) > 0',r:`(${wn}) est croissante.`},{tex:'\\ell=\\ell+e^{-\\ell}',alt:'ℓ = ℓ + e^(−ℓ)',r:'La relation ℓ = <i>f</i>(ℓ), si la limite ℓ existe.'}],
  pari:{label:`Donc${NNB}…`,apres:{tex:[['\\lim_{n\\to+\\infty}w_n=+\\infty','lim w(n) = +∞']],html:`La courbe ne coupe jamais la droite. Une suite croissante qui n’est pas majorée tend vers +∞.<details class="detail"><summary>Pour aller plus loin</summary>e<sup><i>w</i><sub><i>n</i>+1</sub></sup> ≥ e<sup>${wn}</sup> + 1, car e<sup><i>x</i></sup> ≥ 1 + <i>x</i> (leçon exponentielle). Donc ${wn} ≥ ln(<i>n</i> + 1).</details>`},opts:[
    {t:'e<sup>−ℓ</sup> = 0 est impossible, donc elle diverge',ok:true,fb:`Oui : e<sup><i>x</i></sup> > 0 pour tout <i>x</i>, donc e<sup>−ℓ</sup> = 0 n’a pas de solution. (${wn}) ne converge pas : croissante, elle tend vers +∞.`},
    {t:'e<sup>−ℓ</sup> = 0 donne ℓ = 0, qui est la limite',indice:'Calcule e⁰ : vaut-il 0 ?',fb:'Tu as pris ℓ = 0 pour une solution : e<sup>0</sup> = 1, pas 0. e<sup><i>x</i></sup> > 0 pour tout <i>x</i>, l’équation n’a aucune solution.'},
    {t:'ℓ = +∞ est la solution de e<sup>−ℓ</sup> = 0',indice:'+∞ est-il un réel, qu’on peut écrire comme limite finie ℓ ?',fb:'Tu as pris +∞ pour un réel. L’équation n’a pas de solution réelle : on conclut par l’absurde que la suite ne converge pas.'}]}},
{cle:'v-lim-composee',beat:6,scene:'toile',set:{f:'dose',u0:0,k:T.U0_MARCHES,fixe:1,zoom:0,cad:0,bornes:0},sujet:'la limite de ln(u(n))',
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
    ['1',false,`Tu as cru que <i>q</i><sup><i>n</i></sup> s’arrête à 1. Il reste entre 0 et 1 sans s’y arrêter : (½)<sup>10</sup> ≈ ${fr(T.GEO_10,3)}.`,'Regarde le tableau : les puissances de ½ restent-elles près de 1 ?']]),apres:{tex:[['q>1:\\ +\\infty\\quad q=1:\\ 1\\quad -1<q<1:\\ 0\\quad q\\le-1:\\ \\text{pas de limite}','q > 1 : +∞ ; q = 1 : 1 ; −1 < q < 1 : 0 ; q ≤ −1 : pas de limite']],html:'Et si <i>q</i> est négatif ? Le signe alterne, mais c’est |<i>q</i>| &lt; 1 qui décide : |(−½)<sup><i>n</i></sup>| = (½)<sup><i>n</i></sup> tend vers 0, donc (−½)<sup><i>n</i></sup> aussi.'}}},
{cle:'malthus',beat:7,scene:'table',tag:'1798',set:{mode:'malthus',rows:4},sujet:'géométrique contre arithmétique',
  text:['Malthus compare une population qui double tous les 25 ans à des vivres qui augmentent d’une même quantité tous les 25 ans.','Au départ, les deux valent 1.',{t:'Au fil des siècles, le rapport population / vivres…',fort:true}],
  pari:{...BET([['tend vers +∞',PARI_NOTE],['se stabilise',PARI_NOTE],['tend vers 0',PARI_NOTE]]),reveal:[{p:{rows:10},d:2200}],
    apres:{html:`En 1798, Malthus écrit « ${ent(T.MALTHUS.pop)} à ${ent(T.MALTHUS.vivres)} » pour ${T.MALTHUS.periodes} périodes de 25 ans. Le rapport 2<sup><i>n</i></sup> / (1 + <i>n</i>) se comporte comme 2<sup><i>n</i></sup> / <i>n</i>, qui tend vers +∞ comme e<sup><i>x</i></sup> / <i>x</i>. <b>Une géométrique de raison > 1 dépasse toute arithmétique.</b>`}}},
/* ===== 8. retour à l'énigme ===== */
{cle:'retour-plafond',beat:8,scene:'doses',set:{n:30,saw:1,pts:1,fin:1,plaf:1,bas:1,tab:0,dose2:0},sujet:'les trois questions de l’énigme',
  text:()=>[(r=>r===1?'Ton pari était le bon : la quantité s’approche d’un plafond.':r===0?'Tu avais parié sur une croissance sans limite : elle s’arrête pourtant au plafond.':r===2?'Tu avais parié qu’elle redescend : elle monte, puis s’arrête au plafond.':'La quantité s’approche d’un plafond.')(ctx.rep('plateau')),
    'Première question : jamais au-dessus de 2. La récurrence l’a réglée : 0 ≤ <i>u</i><sub><i>n</i></sub> &lt; 2 pour tout <i>n</i>.','Deuxième question : pourquoi 2 ? Le point fixe l’a réglée : ℓ = ½ℓ + 1 donne ℓ = 2.','La suite est croissante et majorée, donc convergente, vers ℓ = 2.']},
{cle:'retour-vn',beat:8,scene:'doses',set:{n:30},sujet:'la suite auxiliaire v(n) = u(n) − 2',
  text:['Troisième question : combien de jours ? Il faut une formule de '+un+'.','On pose l’écart au plateau.'],
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
  text:['À 1 % près, c’est 2 − <i>u</i><sub><i>n</i></sub> ≤ 0,02, soit (½)<sup><i>n</i></sup> ≤ 0,01.','En prenant ln : <i>n</i> ln ½ ≤ ln 0,01. Or ln ½ &lt; 0.'],
  pari:{label:`La ligne suivante${NNB}?`,apres:{html:`Donc <i>n</i> ≥ ${fr(T.LN001_LNDEMI,2)}, soit <i>n</i> = ${T.SEUIL.n} : le ${T.SEUIL.n}ᵉ jour. On arrondit vers le haut : ${U(T.SEUIL.n-1)} = ${fr(D[T.SEUIL.n-1],5)} est à ${fr(T.ECART6,5)} de 2, plus que 0,02.<details class="detail"><summary>En SM, sans calculatrice</summary>L’énoncé donne ln 2 ≈ ${fr(T.LN2_SM,2)} et ln 10 ≈ ${fr(T.LN10_SM,2)} : ln 100 / ln 2 = 2 × ${fr(T.LN10_SM,2)} / ${fr(T.LN2_SM,2)} ≈ ${fr(T.LN100_SM,2)}, donc le même ${T.SEUIL.n}ᵉ jour.</details>`},opts:[
    {t:M('n\\ge \\dfrac{\\ln 0{,}01}{\\ln \\frac12}','<i>n</i> ≥ ln 0,01 / ln ½'),ok:true,fb:'Oui : on divise par ln ½ &lt; 0, donc le sens de l’inégalité est renversé.'},
    {t:M('n\\le \\dfrac{\\ln 0{,}01}{\\ln \\frac12}','<i>n</i> ≤ ln 0,01 / ln ½'),indice:'Par quel signe divises-tu, et que devient le sens de l’inégalité ?',fb:`Tu as gardé le sens en divisant par ln ½ &lt; 0. Diviser par un négatif le renverse : <i>n</i> ≥ ${fr(T.LN001_LNDEMI,2)}, pas <i>n</i> ≤.`},
    {t:M('n\\ge \\dfrac{\\ln 0{,}01}{\\ln 2}','<i>n</i> ≥ ln 0,01 / ln 2'),indice:'Que vaut ln ½ : ln 2 ou −ln 2 ?',fb:`Tu as remplacé ln ½ par ln 2 : or ln ½ = −ln 2. Ton quotient vaut ${fr(T.LN001_LN2,2)}, et ${'<i>n</i>'} ≥ ${fr(T.LN001_LN2,2)} est vrai dès le jour 0 : ce n’est pas le seuil.`}]}},
{cle:'retour-dose',beat:8,scene:'doses',set:{n:30,dose2:1,plaf:1,bas:1},sujet:'la dose fixe la hauteur',
  text:[`Deux comprimés chaque matin : ${un1} = ½${un} + 2.`,{t:'Quel est le plateau ?',fort:true}],
  verifie:{...VF([
    [ent(T.DOSE2.plateau),true,`Oui : ℓ = ½ℓ + 2 donne ℓ = ${ent(T.DOSE2.plateau)}, atteint à 1 % près au même ${T.SEUIL2}ᵉ jour.`],
    [ent(T.DOSE2_FAUX.deux),false,'Tu as gardé l’ancien plateau. La dose compte : ℓ = ½ℓ + 2 donne un autre plateau.','Le plateau changeait-il quand la dose double ?'],
    [ent(T.DOSE2_FAUX.trois),false,'Tu as ajouté 1 à l’ancien plateau au lieu de résoudre ℓ = <i>f</i>(ℓ). Résous ℓ = ½ℓ + 2.','Résous ℓ = ½ℓ + 2 : que vaut ℓ ?']]),apres:{html:'<b>La dose fixe la hauteur, la demi-vie fixe le temps.</b> L’énigme est résolue.'}}},

/* ===== 9. au bac ===== */
{cle:'bac',beat:9,scene:'toile',set:{f:'bac22',cb:0,diag:0,u0:1,k:0,zoom:0,cad:0,fixe:0,zone:0,ecart:0,axeU:0,pt1:0,bornes:1,lecU:0,wr:0},sujet:'le premier geste d’une suite récurrente',
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
  text:[`Question 8 c) : décroissante et minorée par 0, (${un}) converge vers un réel ℓ.`,`Question 8 d) : <i>f</i> est continue, et ${F('ℓ')} = ℓ équivaut à ℓ = 0 ou ℓ = ln 4.`,{t:'Que vaut la limite ?',fort:true}],
  pari:{...VF([
    ['0, car ln 4 > 1 = '+U(0),true,`Oui : (${un}) décroît à partir de ${U(0)} = 1, donc ℓ ≤ 1 &lt; ln 4 ≈ ${fr(T.LN4,2)}. Il reste ℓ = 0.`],
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
  pari:{reveal:[{p:{k:T.U0_MARCHES},d:2600}],apres:{html:'Barème du problème de 2019 (Sciences expérimentales, session normale), deuxième partie : 1 a) 0,5 ; 1 b) 0,5 ; 1 c) 0,5 ; 2) 0,75.'},...VF([
    ['e',true,`Oui : ln ℓ = 1, donc ℓ = e. Ici la limite est le majorant, par hasard : pour la dose, ${un} &lt; 3, et la limite était 2.`],
    ['1',false,`Tu as pris ${U(0)} pour la limite. La suite est croissante : elle ne revient pas à 1, car ℓ ≥ ${U(1)} = 3/2.`,`La suite croît à partir de ${U(0)} = 1 : peut-elle revenir à 1 ?`],
    ['+∞',false,`Tu as oublié que (${un}) est majorée par e. Croissante et majorée, elle converge : elle ne tend pas vers +∞.`,'Une suite majorée par e peut-elle tendre vers +∞ ?']])}},
{cle:'bac-2-cite',beat:9,scene:'toile',set:{k:T.U0_MARCHES,ecart:0},sujet:'les conditions pour écrire f(ℓ) = ℓ',
  text:[`Dans ta copie, tu écris ${F('ℓ')} = ℓ.`,{t:'Que cites-tu pour l’écrire ?',fort:true}],
  verifie:{...VF([
    [`<i>f</i> continue sur [1 ; e], ${F('[1 ; e]')} ⊂ [1 ; e], (${un}) converge`,true,`Oui : ces trois conditions donnent ${F('ℓ')} = ℓ. La convergence vient avant, par le critère monotone.`],
    ['<i>f</i> est strictement croissante sur [1 ; e], donc elle garde l’ordre',false,`Tu as cité le sens de <i>f</i>, qui sert à l’hérédité et pas à ${F('ℓ')} = ℓ. Il faut la continuité de <i>f</i>, l’intervalle stable, et la convergence de (${un}).`,`Pour passer à la limite dans ${un1} = ${F(un)}, quelle propriété de <i>f</i> sert : le sens ou la continuité ?`],
    ['ℓ = <i>f</i>(ℓ) a au moins une solution dans [1 ; e]',false,'Tu as cité le résultat à la place de sa raison. Qu’une solution existe ne dit pas que la limite en est une : on cite la continuité, l’intervalle stable et la convergence.','Cette solution est-elle une condition, ou ce qu’on veut obtenir ?']])}},
/* ===== 10. bilan ===== */
{cle:'q1',beat:10,scene:'quiz',set:{qi:0,rv:0},sujet:'un majorant n’est pas la limite',
  text:['Trois pièges des copies, pour finir. Le premier : le majorant.',{t:`(${un}) est croissante et majorée par 5. Alors…`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    ['elle converge, vers une limite ≤ 5',true,'Oui : le critère donne la convergence, et la limite est ≤ 5. Un majorant n’est pas la limite.'],
    ['elle converge, et sa limite est 5',false,'Tu as pris le majorant pour la limite. Un majorant borne la limite, il ne la fixe pas : la dose était majorée par 3, sa limite était 2.','Un majorant est-il unique ? La dose était majorée par 3 et par 2.'],
    ['elle tend vers +∞, car elle croît',false,'Tu as oublié la borne : une suite majorée ne peut pas tendre vers +∞. Croissante et majorée, elle converge.','Une suite majorée par 5 peut-elle dépasser 5 ?']])}},
{cle:'q2',beat:10,scene:'quiz',set:{qi:1,rv:0},sujet:'l’hérédité avec une fonction croissante',
  text:['Le deuxième : l’hérédité.',{t:`${F('<i>x</i>')} = √(<i>x</i> + 2) est croissante, ${U(0)} = 0 et P(<i>n</i>) : 0 ≤ ${un} ≤ 2. Quelle ligne écris-tu ?`,fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    [`${F('0')} ≤ ${F(un)} ≤ ${F('2')}, car <i>f</i> est croissante`,true,`Oui : <i>f</i> garde l’ordre, avec ${F('0')} = √2 ≈ ${fr(T.NEUVE.f0,2)} et ${F('2')} = ${ent(T.NEUVE.f2)}. Cela donne ${fr(T.NEUVE.f0,2)} ≤ ${un1} ≤ ${ent(T.NEUVE.f2)}, donc 0 ≤ ${un1} ≤ 2.`],
    [`${F('0')} ≥ ${F(un)} ≥ ${F('2')}, car <i>f</i> renverse l’ordre`,false,`Tu as renversé l’ordre, comme pour une fonction décroissante. <i>f</i> est croissante, et ton encadrement donnerait ${fr(T.NEUVE.f0,2)} ≥ ${un1} ≥ ${ent(T.NEUVE.f2)}, impossible.`,`${F('0')} ≈ ${fr(T.NEUVE.f0,2)} et ${F('2')} = ${ent(T.NEUVE.f2)} : une fonction croissante garde-t-elle l’ordre ?`],
    [`${F(un)} ≤ 2, car ${F('<i>x</i>')} ≤ 2 pour tout réel <i>x</i>`,false,`Tu as écrit une hérédité sans hypothèse : ${F('7')} = ${ent(T.NEUVE.f7)} dépasse 2. Il faut partir de 0 ≤ ${un} ≤ 2 et appliquer <i>f</i>.`,`Calcule ${F('7')} : est-il inférieur ou égal à 2 ?`]])}},
{cle:'q3',beat:10,scene:'quiz',set:{qi:2,rv:0},sujet:'un point fixe ne prouve pas la convergence',
  text:['Le troisième : le point fixe.',{t:'ℓ = <i>f</i>(ℓ) a une solution. La suite converge-t-elle ?',fort:true}],
  pari:{label:'Réponds',reveal:[{p:{rv:1},d:900}],...VF([
    ['pas forcément : il faut prouver la convergence',true,`Oui : ${Sg(0)} = 2 et ${sn1} = 2${sn} − 1 ont le point fixe 1, mais ${sn} = 1 + 2<sup><i>n</i></sup> tend vers +∞.`],
    ['oui, elle converge vers cette solution',false,'Tu as cru que résoudre ℓ = <i>f</i>(ℓ) prouve la convergence. Elle dit où aller, si l’on y va : il faut prouver la convergence d’abord.','La suite v(n) = 1 + 2^n a le point fixe 1. Converge-t-elle ?'],
    ['oui, car la suite est bornée',false,'Tu as supposé la suite bornée, ce que rien ne dit. Et bornée ne suffirait pas : (−1)<sup><i>n</i></sup> est bornée et ne converge pas.','Une suite bornée converge-t-elle toujours ? Pense à (−1)ⁿ.']])}},
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
  const Q=[['q1','un majorant n’est pas la limite','exercice 5'],['q2','l’hérédité avec une fonction croissante','exercice 3'],['q3','un point fixe ne prouve pas la convergence','exercice 6']];
  const res=Q.map(([k])=>ctx.juste(k));
  const Vs=STEPS.filter(s=>s.verifie),vok=Vs.filter(s=>ctx.juste(s.k)===true).length;
  const r=k=>ctx.rep(k),paris=[];
  if(r('plateau')!=null)paris.push(r('plateau')===1?'tu avais vu le plafond de la dose':'le plafond de la dose t’a surpris');
  if(r('ou-vont')!=null)paris.push(r('ou-vont')===0?'tu avais situé le plafond sur la figure, au point fixe':'le plafond au point fixe t’a surpris');
  if(r('depart')!=null)paris.push(r('depart')===0?'tu savais que le départ ne change pas la limite':'la limite indépendante du départ t’a surpris');
  if(r('spirale')!=null)paris.push(r('spirale')===2?'tu avais vu que la suite n’est pas monotone':'la spirale t’a surpris');
  if(r('pas-retrecissent')!=null)paris.push(r('pas-retrecissent')===1?'tu avais vu que ralentir n’est pas converger':'une suite qui ralentit sans converger t’a surpris');
  const ligne=`« Vérifie » réussies du premier coup : ${vok} sur ${Vs.length}.${paris.length?` Tes paris : ${paris.join(' ; ')}.`:''}`;
  const rows=res.map((ok,i)=>`<li class="${ok===true?'ok':ok===false?'ko':''}">${ok===true?'✓':ok===false?'✗':'·'} ${Q[i][1]} : ${Q[i][2]}</li>`).join('')
    +'<li>· la récurrence : initialisation et hérédité : exercice 2</li><li>· <i>f</i> croissante, la suite pas forcément : exercice 4</li><li>· la limite de <i>q</i><sup><i>n</i></sup>, signe de <i>q</i> compris : exercice 7</li><li>· la limite de <i>g</i>(<i>u</i><sub><i>n</i></sub>) : exercice 8</li><li>· la suite auxiliaire : exercice 9</li><li>· le seuil par ln : exercice 10</li>';
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
