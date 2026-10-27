/* eslint-disable */
// @ts-nocheck
/**
 * Noyau commun des leçons pilotes (refonte 2026-10, deuxième version).
 *
 * Une leçon pilote = des scènes SVG à paramètres interpolés + un script
 * d'étapes. Ce noyau fait tout le reste, une seule fois pour toutes les
 * leçons : le déroulé (Suivant / Retour / clavier), l'enchaînement des états
 * de scène, les paris, les questions « Vérifie », le panneau de texte, la
 * voix, KaTeX, les fiches de mots et les dérivations ligne par ligne.
 *
 * Usage : monterLecon(root, ctx => ({ BEATS, STEPS, CTL, mots, profileHTML,
 * reset, plain, touche })) — la fonction reçoit les outils (E, scene, S…),
 * construit ses scènes, et rend son script.
 *
 * Une étape :
 *   { cle, beat, scene, tag, set, seq, d,
 *     text,      // chaîne, ou liste de phrases ; une phrase { t, a: k }
 *                // n'apparaît qu'au début de la k-ième image de `seq`
 *     tex,       // [[tex, texte de repli]] : formules affichées
 *     deriv,     // [{ tex, alt, r, p }] : une ligne de calcul à la fois,
 *                // chacune avec sa raison ; « Suivant » révèle la suivante
 *     pari,      // { opts: [{ t, fb, ok?, indice? }], reveal, apres, label, fixe? }
 *     verifie,   // comme un pari avec une bonne réponse : la question de
 *                // compréhension de fin de partie
 *                // Une question (une option `ok`) : ses options sont mélangées à
 *                // chaque séance, sauf `fixe: true` (options ordonnées : des
 *                // durées, des pourcentages). Une première erreur donne l'`indice`
 *                // de l'option choisie (l'erreur nommée, sans la réponse) et un
 *                // second essai ; la réponse vient après. Un pari n'est jamais noté.
 *     ctl, need, html, say }
 * Dans le texte, [[cle|mot affiché]] ouvre la fiche du mot `cle`.
 */
import katex from "katex";

export function monterLecon(root, construire) {

/* ---------- outils ---------- */
const NS='http://www.w3.org/2000/svg';
const svg=root.querySelector('[data-pilote-scene]');
const $=s=>root.querySelector(s);
function E(tag,attrs,parent){const e=document.createElementNS(NS,tag);if(attrs)for(const k in attrs){if(k==='text')e.textContent=attrs[k];else e.setAttribute(k,attrs[k]);}(parent||svg).appendChild(e);return e;}
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function fr(x,d=2){const s=Math.abs(x).toFixed(d);return (x<0&&Number(s)!==0?'−':'')+s.replace('.',',');}
const ty=s=>String(s).replace(/ ([?!;:»])/g,' $1').replace(/« /g,'« ');
// panneau seulement (HTML) : un mot à trait d'union ne se coupe pas, un opérateur ne commence
// pas une ligne, « ln 2 » reste soudé. Hors des balises et des [[fiches]].
const typo=h=>String(h).split(/(<[^>]+>|\[\[[^\]]*\]\])/).map((p,i)=>i%2?p:p
  .replace(/([A-Za-zÀ-ÖØ-öø-ÿ\u0370-\u03FF’']+(?:-[A-Za-zÀ-ÖØ-öø-ÿ\u0370-\u03FF]+)+)/g,'<span class="nw">$1</span>')
  .replace(/ ([×÷=+−→≈≤≥]|&lt;|&gt;)/g,'\u00A0$1')
  .replace(/\b(ln|log|exp) (?=\S)/g,'$1\u00A0')).join('');
const tyP=s=>typo(ty(s));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const TEL=matchMedia('(max-width: 899px)');
const wait=ms=>new Promise(r=>setTimeout(r,RM.matches?0:ms));
let run=0;const hooks={};
function parts(t,str){String(str).split(/(_[^_]+_)/).forEach(part=>{if(!part)return;const sp=E('tspan',{},t);if(part[0]==='_'&&part.length>2){sp.textContent=part.slice(1,-1);sp.setAttribute('font-style','italic');}else sp.textContent=part;});}
function mtext(parent,x,y,str,cls,anchor){const t=E('text',{x,y,class:cls,'text-anchor':anchor||'start'},parent);parts(t,str);return t;}
function setMT(t,str){if(t.__s===str)return;t.__s=str;t.textContent='';parts(t,str);}
function svgPt(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
function show(el,o){el.style.opacity=o;}

const defs=E('defs');
const mk=E('marker',{id:'arw',viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'8',markerHeight:'8',orient:'auto-start-reverse'},defs);
E('path',{d:'M0 0L10 5L0 10z',class:'s-dim'},mk);

const scenes={};
function scene(id,def){const g=E('g',{class:'scene'});g.style.opacity=0;const s=Object.assign({id,g},def);s.defaults={...def.p};s.p={...def.p};s.build(g);s.render();scenes[id]=s;return s;}

/* état de l'élève : réponses (par clé d'étape), lignes vues, étapes vues */
const S={ans:{},first:{},lignes:{},vu:{},essais:{}};
let STEPS=[],cur=-1;
const parCle={};
const ctx={root,svg,$,E,defs,lerp,clamp,ease,fr,ty,esc,RM,wait,show,mtext,setMT,svgPt,scene,scenes,hooks,S,
  stop:()=>{run++;},
  etape:()=>STEPS[cur],
  aller:i=>go(i),
  rep:cle=>S.ans[cle],
  juste:cle=>{const st=parCle[cle];if(!st||!st.pari||S.first[cle]==null)return null;return !!st.pari.opts[S.first[cle]].ok;},
  renderMath:r=>renderMath(r),
  say:t=>say(t),
  plain:t=>plain(t),
  // « Suivant » relu après un geste de l'élève (étapes à `need`)
  majNav:()=>updateNav(),
  // une animation de scène annulée par le prochain changement d'étape
  tween:(sc,target,d)=>tweenTo(sc,target,d,run),
  voir:el=>voir(el)};

const L=construire(ctx);
const BEATS=L.BEATS,CTL=L.CTL||{},MOTS=L.mots||{};
STEPS=L.STEPS;

/* chaque étape : identifiant, clé, question normalisée, état de scène hérité */
STEPS.forEach((st,i)=>{
  st.id=i;st.k=st.cle!=null?String(st.cle):String(i);parCle[st.k]=st;
  if(st.verifie)st.pari={label:'Vérifie',...st.verifie,kind:'verifie'};
  if(st.pari)melanger(st.pari);
});
// l'ordre d'affichage des options : mélangé pour une question, celui de l'auteur pour un pari
function melanger(P){const o=P.opts.map((_,j)=>j);if(isQuiz(P)&&!P.fixe)for(let i=o.length-1;i>0;i--){const r=Math.floor(Math.random()*(i+1));[o[i],o[r]]=[o[r],o[i]];}P.ordre=o;}
// pour les contrôles automatiques (scripts/pilotes-parcours.mjs)
root.__lecon={STEPS,BEATS,S};
{const last={};STEPS.forEach(st=>{const sc=scenes[st.scene];const prev=last[st.scene]||{...sc.defaults};st.base={...prev,...(st.set||{})};const f={...st.base};(st.seq||[]).forEach(x=>Object.assign(f,x.p));st.pre={...f};(st.deriv||[]).forEach(x=>x.p&&Object.assign(f,x.p));if(st.pari&&st.pari.reveal)st.pari.reveal.forEach(x=>Object.assign(f,x.p));last[st.scene]=f;});}

/* ---------- animation ---------- */
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
let curScene=null;
// lignes d'une dérivation déjà montrées : 1 à la première visite, le compte atteint ensuite (garde au retour)
function lignesVues(st){return S.lignes[st.k]!=null?S.lignes[st.k]:1;}
async function animate(sc,st,my,fresh){
  if(fresh)await wait(300);else await tweenTo(sc,st.base,st.d||750,my);
  const seq=st.seq||[];
  for(let k=0;k<seq.length;k++){const f=seq[k];if(my!==run)return;if(f.w){await wait(f.w);if(my!==run)return;}montrerPhrases(k);await tweenTo(sc,f.p,f.d||900,my);}
  if(my!==run)return;
  montrerPhrases(Infinity);
  if(st.deriv){const n=lignesVues(st);for(let j=0;j<n;j++){const x=st.deriv[j];if(x.p){if(my!==run)return;await tweenTo(sc,x.p,x.d||700,my);}}}
  if(st.pari&&st.pari.reveal&&S.ans[st.k]!=null&&resolu(st))for(const f of st.pari.reveal){if(my!==run)return;await tweenTo(sc,f.p,f.d||900,my);}
  if(my===run)S.vu[st.k]=true;
}
function montrerPhrases(k){root.querySelectorAll('#body .say.later').forEach(p=>{if(+p.dataset.a<=k)p.classList.remove('later');});}
function go(i){
  i=clamp(i,0,STEPS.length-1);const st=STEPS[i],sc=scenes[st.scene],my=++run;
  for(const k in hooks)delete hooks[k];
  let fresh=false;
  if(curScene!==sc){if(curScene){curScene.g.style.opacity=0;curScene.g.setAttribute('class','scene');}sc.p={...st.base};sc.render();sc.g.style.opacity=1;sc.g.setAttribute('class','scene on');curScene=sc;fresh=true;}
  cur=i;renderPanel(st);updateChrome(st);
  animate(sc,st,my,fresh);speak(st);
}

/* ---------- le panneau ---------- */
function phrases(st){const v=typeof st.text==='function'?st.text():st.text;return (Array.isArray(v)?v:[v]).filter(x=>x!=null&&x!=='').map(x=>typeof x==='string'?{t:x}:x);}
const motsHTML=h=>String(h).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]((?:\u202F|\u00A0)?[:;.,!?»)]+)?/g,(m,c,t,ponct)=>MOTS[c]?`<span class="nw"><button type="button" class="mot" data-mot="${esc(c)}" aria-expanded="false">${t||c}</button>${ponct||''}</span>`:(t||c)+(ponct||''));
const texHTML=t=>`<div class="formula">${t.map(([x,alt])=>`<span class="m" data-display="1" data-tex="${esc(x)}">${esc(alt)}</span>`).join('')}</div>`;
function apresHTML(P){return P.apres?`${P.apres.tex?texHTML(P.apres.tex):''}${P.apres.html?motsHTML(tyP(P.apres.html)):''}`:'';}
// une ligne de calcul : la dernière montrée porte le trait rouge ; les plus anciennes se compactent
// (formule + une ligne de raison, un clic les rouvre) pour que la question reste à l'écran
function classeLigne(j,n){return j>=n?'cache':`${j<n-2?'ancien':''}${j===n-1?' der':''}`;}
function derivHTML(st){const n=lignesVues(st);
  return `<ol class="deriv">${st.deriv.map((x,j)=>`<li class="${classeLigne(j,n)}" data-l="${j}"><span class="m" data-display="1" data-tex="${esc(x.tex)}">${esc(x.alt||x.tex)}</span>${x.r?`<span class="raison">${motsHTML(tyP(x.r))}</span>`:''}</li>`).join('')}</ol>`;}
function renderPanel(st){
  $('#kicker').textContent=`${String(st.beat+1).padStart(2,'0')} — ${BEATS[st.beat].name}`;
  const revoir=S.vu[st.k]||RM.matches;
  let h=`<div class="dit">${phrases(st).map(p=>`<p class="say${p.a!=null&&!revoir?' later':''}${p.fort?' fort':''}" data-a="${p.a!=null?p.a:-1}">${motsHTML(tyP(p.t))}</p>`).join('')}</div>`;
  if(st.tex)h+=texHTML(st.tex);
  if(st.deriv){if(S.lignes[st.k]==null)S.lignes[st.k]=1;h+=derivHTML(st);}
  if(st.html)h+=st.html();
  if(st.pari)h+=pariHTML(st)+`<div class="fb" id="fb"></div><div class="apres" id="apres">${S.ans[st.k]!=null&&resolu(st)?apresHTML(st.pari):''}</div>`;
  if(st.ctl)h+=CTL[st.ctl].html(st);
  if(!st.pari)h+='<div class="fb" id="fb"></div>';
  h+='<div class="mot-zone" id="motz"></div>';
  const body=$('#body');body.innerHTML=h;body.classList.remove('in');void body.offsetWidth;body.classList.add('in');
  // une étape faite seulement de texte se centre dans la hauteur du panneau (pilote.css)
  $('#script').classList.toggle('texte-seul',!(st.pari||st.deriv||st.ctl||st.tex||st.html));
  $('#script').classList.toggle('calcul',!!(st.deriv&&st.deriv.length>=4));
  $('#script').scrollTop=0;
  // téléphone : la page défile sous la scène collée en haut ; une nouvelle étape remonte son texte
  // juste sous la scène s'il était passé dessous
  if(TEL.matches){const r=$('#script').getBoundingClientRect(),haut=$('.stage-wrap').getBoundingClientRect().bottom;if(r.top<haut-1)window.scrollBy(0,r.top-haut);}
  if(st.pari){wireOpts(st);if(S.ans[st.k]!=null)$('#fb').innerHTML=messagePari(st,S.ans[st.k]);}
  if(st.ctl)CTL[st.ctl].init(st);
  renderMath(body);updateNav();
}
function voir(el){if(el&&el.scrollIntoView)el.scrollIntoView({block:'nearest',behavior:RM.matches?'auto':'smooth'});}
function isQuiz(P){return P.opts.some(o=>o.ok);}
// une question est résolue quand la bonne réponse est trouvée, ou après deux essais ; un pari dès le choix
function resolu(st){const P=st.pari;if(!P)return true;const a=S.ans[st.k];if(a==null)return false;if(!isQuiz(P))return true;return !!P.opts[a].ok||(S.essais[st.k]||[]).length>=2;}
function pariHTML(st){const P=st.pari,a=S.ans[st.k],q=isQuiz(P),ess=S.essais[st.k]||[],fini=resolu(st);
  const essai=q&&!fini&&ess.length===1?'<span class="pari-essai">second essai</span>':'';
  return `<div class="pari${P.kind==='verifie'?' verifie':''}${fini&&a!=null?' fini':''}"><div class="pari-k">${P.label||(q?'Réponds':'Ton pari')}${essai}</div><div class="opts">${P.ordre.map((j,pos)=>{const o=P.opts[j];let c='opt',m='',dit='';
    if(q){if(fini&&o.ok){c+=' ok';m='✓';dit='bonne réponse';}else if(ess.includes(j)){c+=' ko';m='✗';dit='ta réponse, fausse';}else if(fini)c+=' off';}
    else if(a!=null){if(a===j){c+=' sel';dit='ton choix';}else c+=' off';}
    const inerte=(!q&&a!=null)||(q&&!fini&&ess.includes(j));
    return `<button type="button" class="${c}" data-j="${j}"${inerte?' disabled':''}><kbd>${pos+1}</kbd><span>${tyP(o.t)}</span>${m?`<b class="marque" aria-hidden="true">${m}</b>`:''}${dit?`<span class="vh"> (${dit})</span>`:''}</button>`;}).join('')}</div></div>`;}
function wireOpts(st){root.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>choose(st,+b.dataset.j)));}
// le retour sous les options : l'explication d'un pari ; pour une question, l'indice après une
// première erreur, puis l'explication (et la bonne réponse si elle n'a pas été trouvée)
function messagePari(st,j){const P=st.pari,o=P.opts[j];
  if(!isQuiz(P))return motsHTML(tyP(o.fb||''));
  if(o.ok)return motsHTML(tyP(o.fb||'Oui.'));
  if(!resolu(st))return `<b class="fb-lead">Pas tout à fait.</b> ${motsHTML(tyP(o.indice||o.fb||''))} <span class="fb-encore">Choisis une autre réponse.</span>`;
  // après deux erreurs, l'explication de la bonne option suit « La réponse : … » : son « Oui : » initial tombe
  const bon=P.opts.find(x=>x.ok),expl=String(bon.fb||'').replace(/^(Oui|Exactement|Bien vu|Juste|Bravo|C’est ça|C'est ça)\s*[:.,!—–-]?\s*/i,'');
  return `${motsHTML(tyP(o.fb||''))}<span class="fb-bon"><b>La réponse : ${tyP(bon.t)}.</b> ${motsHTML(tyP(/^(ln|log|exp|[a-z]\b)/.test(expl)?expl:expl.charAt(0).toUpperCase()+expl.slice(1)))}</span>`;}
function choose(st,j){
  const P=st.pari,q=isQuiz(P),k=st.k,fb=$('#fb');
  if(!q&&S.ans[k]!=null)return;
  // une question résolue : un clic relit l'explication d'une option, sans rien changer
  if(q&&resolu(st)){fb.innerHTML=P.opts[j].ok?messagePari(st,j):motsHTML(tyP(P.opts[j].fb||''));renderMath(fb);voir(fb);say(plain(P.opts[j].fb||''));return;}
  if(q){const ess=S.essais[k]||(S.essais[k]=[]);if(ess.includes(j))return;ess.push(j);}
  if(S.first[k]==null)S.first[k]=j;S.ans[k]=j;
  const fini=resolu(st);
  root.querySelector('.pari').outerHTML=pariHTML(st);wireOpts(st);
  const btn=root.querySelector(`.opt[data-j="${j}"]`);if(btn&&!btn.disabled)btn.focus();else if(fini)$('#next').focus();else{const autre=root.querySelector('.opt:not([disabled])');autre&&autre.focus();}
  fb.innerHTML=messagePari(st,j);renderMath(fb);
  if(fini&&P.apres){const ap=$('#apres');ap.innerHTML=apresHTML(P);renderMath(ap);voir(ap);}else voir(fb);
  if(fini&&P.reveal){const my=++run,sc=scenes[st.scene];(async()=>{const fr0=[{p:{...st.pre,...P.reveal[0].p},d:P.reveal[0].d},...P.reveal.slice(1)];for(const f of fr0){if(my!==run)return;await tweenTo(sc,f.p,f.d||900,my);}})();}
  updateNav();say(plain(fb.textContent||''));
}
function updateNav(){const st=STEPS[cur],n=$('#next'),bet=!!(st.pari&&!resolu(st)),need=!!(st.need&&!st.need());
  const reste=st.deriv&&lignesVues(st)<st.deriv.length,encore=bet&&S.ans[st.k]!=null;
  n.disabled=bet||need;
  n.textContent=cur===STEPS.length-1?'Recommencer':encore?'Essaie encore':bet?'Choisis d’abord':need?(st.needLabel||'Fais-le d’abord'):reste?'Ligne suivante ↓':'Suivant →';
  $('#prev').disabled=cur===0;$('#count').textContent=`étape ${cur+1} / ${STEPS.length}`;}
function ligneSuivante(st){
  const j=lignesVues(st);if(j>=st.deriv.length)return false;
  S.lignes[st.k]=j+1;
  root.querySelectorAll('.deriv li').forEach(x=>{const i=+x.dataset.l;x.className=classeLigne(i,j+1)+(x.classList.contains('ouvert')?' ouvert':'');});
  const li=root.querySelector(`.deriv li[data-l="${j}"]`);if(li)voir(li);
  const x=st.deriv[j];if(x.p){const my=++run;tweenTo(scenes[st.scene],x.p,x.d||700,my);}
  say(plain((x.alt||x.tex)+'. '+(x.r||'')));
  updateNav();return true;
}
function reset(){S.ans={};S.first={};S.lignes={};S.vu={};S.essais={};STEPS.forEach(st=>st.pari&&melanger(st.pari));L.reset&&L.reset();}
function next(){if($('#next').disabled)return;const st=STEPS[cur];if(st.deriv&&ligneSuivante(st))return;if(cur===STEPS.length-1){reset();go(0);}else go(cur+1);}

/* ---------- fiches de mots ---------- */
function ouvrirMot(btn){
  const z=$('#motz');if(!z)return;const c=btn.dataset.mot,m=MOTS[c];if(!m)return;
  const ouvert=btn.getAttribute('aria-expanded')==='true';
  root.querySelectorAll('.mot[aria-expanded="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));
  if(ouvert){z.innerHTML='';return;}
  btn.setAttribute('aria-expanded','true');
  z.innerHTML=`<div class="mot-carte" role="note" aria-label="${esc('Le mot : '+(m.t||c))}"><div class="mot-k">Le mot</div><b>${m.t||c}</b><p>${tyP(m.d)}</p>${m.fig||''}<button type="button" class="mot-x">Fermer</button></div>`;
  renderMath(z);voir(z.firstElementChild);z.querySelector('.mot-x').addEventListener('click',()=>{z.innerHTML='';btn.setAttribute('aria-expanded','false');btn.focus();});
  say(plain((m.t||c)+'. '+m.d));
}
const surClic=e=>{if(!e.target.closest)return;const b=e.target.closest('.mot');if(b&&root.contains(b)){e.preventDefault();ouvrirMot(b);return;}
  // une ligne de calcul compactée se rouvre d'un clic
  const li=e.target.closest('.deriv li.ancien');if(li&&root.contains(li))li.classList.toggle('ouvert');};
root.addEventListener('click',surClic);

/* chapitres */
const beatEls=BEATS.map((b,k)=>{const n=STEPS.filter(s=>s.beat===k).length,btn=document.createElement('button');btn.type='button';btn.className='beat';btn.style.setProperty('--n',n);btn.innerHTML=`<span>${b.court||b.name}</span><i><b></b></i>`;btn.title=b.name;btn.addEventListener('click',()=>go(STEPS.findIndex(s=>s.beat===k)));$('#beats').appendChild(btn);return btn;});
function updateChrome(st){
  BEATS.forEach((b,k)=>{const steps=STEPS.filter(s=>s.beat===k),f=steps[0].id,done=clamp((cur-f+1)/steps.length,0,1);beatEls[k].querySelector('b').style.width=(done*100)+'%';beatEls[k].classList.toggle('on',k===st.beat);if(k===st.beat)beatEls[k].setAttribute('aria-current','step');else beatEls[k].removeAttribute('aria-current');});
  const pl=$('#plaque');if(st.tag){pl.textContent=st.tag;pl.classList.add('on');}else pl.classList.remove('on');
}

/* maths : KaTeX (déjà chargé par l'app) */
function renderMath(r){r.querySelectorAll('.m[data-tex]:not([data-done])').forEach(n=>{try{katex.render(n.dataset.tex,n,{displayMode:n.dataset.display==='1',throwOnError:false});n.dataset.done='1';}catch(e){}});}

/* voix */
let voiceOn=false;
function plain(h){let s=String(h).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(m,c,t)=>t||c).replace(/<sub>1\/2<\/sub>/g,' un demi').replace(/<sub>0<\/sub>/g,' zéro').replace(/<[^>]+>/g,'').replace(/ | /g,' ').replace(/&lt;/g,' inférieur à ').replace(/&gt;/g,' supérieur à ').replace(/&amp;/g,' et ').replace(/×/g,' fois ').replace(/÷/g,' divisé par ').replace(/≈/g,' environ ').replace(/→/g,', ').replace(/−/g,'moins ').replace(/↦/g,' donne ');return L.plain?L.plain(s):s;}
function say(t){if(!voiceOn||!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';const vs=speechSynthesis.getVoices();const v=vs.find(v=>/^fr/i.test(v.lang)&&/Google|Amélie|Thomas|Audrey|Marie|Denise|Henri/i.test(v.name))||vs.find(v=>/^fr/i.test(v.lang));if(v)u.voice=v;speechSynthesis.speak(u);}
function speak(st){say(st.say?(typeof st.say==='function'?st.say():st.say):plain(phrases(st).map(p=>ty(p.t)).join(' ')));}
const surVoix=e=>{voiceOn=!voiceOn;e.currentTarget.setAttribute('aria-pressed',voiceOn);if(voiceOn)speak(STEPS[cur]);else if('speechSynthesis' in window)speechSynthesis.cancel();};
$('#voice').addEventListener('click',surVoix);

const surPourquoi=()=>$('#whyd').showModal();
$('#why').addEventListener('click',surPourquoi);
const surRetour=()=>go(cur-1);
$('#next').addEventListener('click',next);$('#prev').addEventListener('click',surRetour);
const surTouche=e=>{
  if($('#whyd').open)return;const t=e.target;if(t.tagName==='INPUT'||t.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const st=STEPS[cur];
  if(e.key==='Escape'){const z=$('#motz');if(z&&z.innerHTML){z.innerHTML='';root.querySelectorAll('.mot[aria-expanded="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));}return;}
  if(L.touche&&L.touche(e,st))return;
  if(st&&st.pari&&/^[1-4]$/.test(e.key)&&+e.key<=st.pari.opts.length){e.preventDefault();choose(st,st.pari.ordre[+e.key-1]);return;}
  if(e.key==='ArrowRight'||e.key==='PageDown'||(e.key===' '&&t.tagName!=='BUTTON')){e.preventDefault();next();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(cur-1);}
};
window.addEventListener('keydown',surTouche);
go(0);
return function demonter(){
  run++;window.removeEventListener('keydown',surTouche);root.removeEventListener('click',surClic);
  $('#next').removeEventListener('click',next);$('#prev').removeEventListener('click',surRetour);
  $('#voice').removeEventListener('click',surVoix);$('#why').removeEventListener('click',surPourquoi);
  beatEls.forEach(b=>b.remove());while(svg.firstChild)svg.removeChild(svg.firstChild);
  if('speechSynthesis' in window)speechSynthesis.cancel();
  L.demonter&&L.demonter();
};
}
