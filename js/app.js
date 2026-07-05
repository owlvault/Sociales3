/* ================= Exploradora del Planeta — Motor =================
   App estática (Cloudflare Pages). Guarda progreso en el dispositivo.
   Pensada para foco: una sola cosa por pantalla, pasos cortos,
   refuerzo positivo inmediato, pausas activas y voz opcional.
   ================================================================== */
'use strict';

/* ---------- Estado persistente ---------- */
const CLAVE = 'exploradora_sociales3_v1';
const HOY = () => new Date().toISOString().slice(0,10);

const porDefecto = {
  estrellas:0, racha:0, ultimoDia:null,
  dias:{},           // { idxDia: estrellas(1-3) }
  insignias:[],      // números de unidad ganados
  ajustes:{ voz:true, calma:false, reduce:false, pausas:true }
};
const clon = o => JSON.parse(JSON.stringify(o));   // clon simple (compatible con navegadores antiguos)
let estado = cargar();
function cargar(){ try{ const j=JSON.parse(localStorage.getItem(CLAVE)); return j? Object.assign({}, clon(porDefecto), j, {ajustes:Object.assign({},porDefecto.ajustes,(j&&j.ajustes)||{})}) : clon(porDefecto); }catch(e){ return clon(porDefecto); } }
function guardar(){ localStorage.setItem(CLAVE, JSON.stringify(estado)); }

/* ---------- Construir el plan de 16 semanas / 80 días ---------- */
const NOMBRE_DIA = { descubrir:'Descubrir', practicar:'Practicar', repaso:'Repaso y Juego' };
const EMOJI_DIA  = { descubrir:'🔍', practicar:'✏️', repaso:'🎮' };

function construirPlan(){
  const plan=[];
  for(let w=0; w<16; w++){
    const A=TEMAS[2*w], B=TEMAS[2*w+1];
    const semana=w+1;
    plan.push({ semana, unidad:A.unidad, tipo:'descubrir', temaId:A.id, titulo:A.titulo, emoji:A.emoji });
    plan.push({ semana, unidad:A.unidad, tipo:'practicar', temaId:A.id, titulo:A.titulo, emoji:A.emoji });
    plan.push({ semana, unidad:B.unidad, tipo:'descubrir', temaId:B.id, titulo:B.titulo, emoji:B.emoji });
    plan.push({ semana, unidad:B.unidad, tipo:'practicar', temaId:B.id, titulo:B.titulo, emoji:B.emoji });
    plan.push({ semana, unidad:A.unidad, tipo:'repaso', temaId:A.id, temaId2:B.id, titulo:'Repaso semanal', emoji:'🎮' });
  }
  return plan;
}
const PLAN = construirPlan();
const getTema = id => TEMAS.find(t=>t.id===id);
const primerPendiente = () => { for(let i=0;i<PLAN.length;i++){ if(!(i in estado.dias)) return i; } return PLAN.length-1; };

/* ---------- Utilidades UI ---------- */
const app = document.getElementById('app');
const $ = s => document.querySelector(s);
const barajar = a => a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const esc = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function hablar(texto){
  if(!estado.ajustes.voz || !('speechSynthesis' in window)) return;
  try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(texto);
    u.lang='es-ES'; u.rate=0.95; u.pitch=1.05; speechSynthesis.speak(u); }catch(e){}
}
function callar(){ try{ speechSynthesis.cancel(); }catch(e){} }
function botonLeer(texto){ return `<button class="leer" onclick='hablarTexto(this)' data-t="${esc(texto).replace(/"/g,'&quot;')}">🔊 Escuchar</button>`; }
window.hablarTexto = b => hablar(b.getAttribute('data-t'));

function actualizarTopbar(){
  const numE = $('#numEstrellas');
  const numR = $('#numRacha');
  
  if (numE.textContent != estado.estrellas) {
    $('#chipEstrellas').classList.remove('changed');
    void $('#chipEstrellas').offsetWidth; // force reflow
    $('#chipEstrellas').classList.add('changed');
  }
  if (numR.textContent != estado.racha) {
    $('#chipRacha').classList.remove('changed');
    void $('#chipRacha').offsetWidth; // force reflow
    $('#chipRacha').classList.add('changed');
  }

  numE.textContent = estado.estrellas;
  numR.textContent = estado.racha;
}

function confeti(){
  if(estado.ajustes.reduce) return;
  const col=['#2a9dd6','#ffb020','#3fae5a','#d64c8a','#7b57c2', '#ff5722', '#00bcd4'];
  const emojis = ['⭐','✨','🎉','🚀','🎈'];
  for(let i=0;i<80;i++){ 
    const c=document.createElement('div'); 
    c.className='confeti';
    
    // Mitad colores, mitad emojis
    if (i % 2 === 0) {
      c.style.background=col[i%col.length];
    } else {
      c.innerText = emojis[i%emojis.length];
      c.style.background = 'transparent';
      c.style.fontSize = (Math.random()*1.5 + 1) + 'rem';
    }

    c.style.left=(Math.random()*100)+'vw'; 
    c.style.animationDuration=(1.2+Math.random()*2)+'s'; 
    c.style.animationDelay=(Math.random()*.5)+'s';
    
    // Añadir rotación extra para más dinamismo
    c.style.setProperty('--rot-end', (Math.random() * 720 - 360) + 'deg');
    document.body.appendChild(c); 
    setTimeout(()=>c.remove(),3200); 
  }
}

/* Guardar y Cargar a Archivo (JSON local) */
function exportarProgreso() {
  const data = JSON.stringify(estado, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aventura_sociales3_${HOY()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  hablar('¡Aventura guardada en tu compu!');
}

function importarProgreso(evento) {
  const file = evento.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const j = JSON.parse(e.target.result);
      if (j && typeof j === 'object') {
        estado = Object.assign({}, clon(porDefecto), j, {ajustes:Object.assign({},porDefecto.ajustes,(j&&j.ajustes)||{})});
        guardar();
        actualizarTopbar();
        $('#hojaAjustes').classList.add('oculto');
        ir(renderInicio);
        hablar('¡Aventura cargada! Listos para seguir explorando.');
        confeti();
      }
    } catch (err) {
      alert('Hubo un problema al cargar el archivo. ¿Es el archivo correcto?');
    }
  };
  reader.readAsText(file);
}

/* Mascota: reacciones (una brújula/globo amistoso, sin género de "diagnóstico") */
const ANIMOS_BIEN=['¡Excelente! 🌟','¡Muy bien! 👏','¡Lo lograste! 🎉','¡Sigue así! 🚀','¡Eres una crack! 💪'];
const ANIMOS_UPS=['¡Casi! Intenta de nuevo 🤔','Tranquila, se aprende probando 🌱','¡Buen intento! Mira la pista 💡','No pasa nada, sigamos 😊'];
const elige = a => a[Math.floor(Math.random()*a.length)];

/* =====================================================================
   ROUTER
   ===================================================================== */
function ir(vista, arg){ callar(); window.scrollTo(0,0); vista(arg); }

/* ---------- INICIO ---------- */
function renderInicio(){
  $('#foco').classList.add('oculto');
  const idx=primerPendiente();
  const hechos=Object.keys(estado.dias).length;
  const d=PLAN[idx];
  const seguir = hechos>0 && hechos<80;
  app.innerHTML = `
    <section class="hero">
      <div class="globo">🌍</div>
      <h1>Exploradora del Planeta</h1>
      <p>Una aventura de Ciencias Sociales · Grado 3°</p>
      <p style="font-size:.95rem">${hechos>0? `Llevas <b>${hechos}</b> de 80 misiones ⭐`:'¡Tu misión empieza hoy!'}</p>
      <button class="btn-grande acento" onclick="ir(iniciarSesion, ${idx})">
        ${seguir? '▶️ Seguir aventura' : (hechos===0? '🚀 ¡Comenzar!' : '🏁 Última misión')}
      </button>
      <div style="margin-top:12px">
        <button class="btn-sec" onclick="ir(renderMapa)">🗺️ Ver mi mapa</button>
      </div>
    </section>
    <div class="tarjeta" style="text-align:left">
      <span class="etiqueta">Misión de hoy</span>
      <h3>${d.emoji} Semana ${d.semana} · ${esc(d.titulo)}</h3>
      <p style="color:var(--tinta-suave);font-size:1rem">${EMOJI_DIA[d.tipo]} ${NOMBRE_DIA[d.tipo]} · unos 40 minutos</p>
    </div>`;
  actualizarTopbar();
}

/* ---------- MAPA (semanas y días) ---------- */
function renderMapa(){
  $('#foco').classList.add('oculto');
  const idxActual=primerPendiente();
  const total=80, hechos=Object.keys(estado.dias).length;
  let html = `
    <div class="mapa-cabecera">
      <h2>🗺️ Mi mapa de aventura</h2>
      <div class="barra-progreso"><i style="width:${hechos/total*100}%"></i></div>
      <p style="color:var(--tinta-suave)">${hechos} / ${total} misiones completadas</p>
    </div>`;

  for(let u=1; u<=8; u++){
    const uni=UNIDADES[u-1];
    const diasU = PLAN.map((d,i)=>({d,i})).filter(x=>x.d.unidad===u);
    const compU = diasU.filter(x=> x.i in estado.dias).length;
    const abierta = diasU.some(x=> x.i===idxActual) || compU>0;
    const tieneInsignia = estado.insignias.includes(u);
    html += `
      <div class="semana ${abierta?'abierta':''}" id="uni${u}">
        <header onclick="toggleUnidad(${u})">
          <div class="u-emoji" style="background:${uni.color}22">${uni.emoji}</div>
          <div class="u-info">
            <b>Unidad ${u}${tieneInsignia?' 🏅':''}</b>
            <span>${esc(uni.titulo)} · ${compU}/${diasU.length}</span>
          </div>
          <div class="u-flecha">▶</div>
        </header>
        <div class="dias" ${abierta?'':'style="display:none"'}>
          ${diasU.map(x=>tarjetaDia(x.d,x.i,idxActual)).join('')}
        </div>
      </div>`;
  }
  app.innerHTML=html;
  actualizarTopbar();
}
function tarjetaDia(d,i,idxActual){
  const comp = i in estado.dias;
  const bloq = i>idxActual;
  const est = estado.dias[i]||0;
  const cls = ['dia']; if(comp)cls.push('completo'); if(i===idxActual)cls.push('actual'); if(bloq)cls.push('bloqueado'); if(d.tipo==='repaso')cls.push('repaso');
  const estrellas = comp? '★★★'.slice(0,est).padEnd(3,'☆') : '';
  return `<button class="${cls.join(' ')}" ${bloq?'disabled':''} onclick="ir(iniciarSesion, ${i})">
    <span class="d-num">Día ${i+1}</span>
    <span class="d-emoji">${d.tipo==='repaso'?'🎮':d.emoji}</span>
    <span class="d-tit">${d.tipo==='repaso'?'Repaso':NOMBRE_DIA[d.tipo]}</span>
    <span class="estrellitas">${estrellas}</span>
  </button>`;
}
window.toggleUnidad = u => { const el=$('#uni'+u); el.classList.toggle('abierta'); const dias=el.querySelector('.dias'); dias.style.display = el.classList.contains('abierta')?'':'none'; };

/* =====================================================================
   SESIÓN (clase del día)  — motor de pasos
   ===================================================================== */
let sesion=null, tempTimer=null;

function iniciarSesion(idx){
  const d=PLAN[idx];
  const steps=[];
  steps.push({t:'intro'});
  if(d.tipo==='descubrir'){
    const tema=getTema(d.temaId);
    tema.tarjetas.forEach((c,k)=> steps.push({t:'tarjeta', k}));
    if(estado.ajustes.pausas) steps.push({t:'pausa'});
    steps.push({t:'vocab'});
    steps.push({t:'actividad', modo:'descubrir'});
  } else if(d.tipo==='practicar'){
    steps.push({t:'repasoRapido'});
    steps.push({t:'sabias'});
    if(estado.ajustes.pausas) steps.push({t:'pausa'});
    steps.push({t:'actividad', modo:'practicar'});
  } else { /* repaso */
    if(estado.ajustes.pausas){ steps.push({t:'reto1'}); steps.push({t:'pausa'}); steps.push({t:'reto2'}); }
    else steps.push({t:'actividad', modo:'repaso'});
  }
  steps.push({t:'cierre'});

  sesion={ idx, d, steps, i:0, aciertos:0, intentos:0 };
  iniciarTemporizador();
  mostrarPaso();
}

/* Temporizador visual de 40 minutos (informativo, sin castigo) */
function iniciarTemporizador(){
  clearInterval(tempTimer);
  let restante=40*60;
  const foco=$('#foco'); foco.classList.remove('oculto');
  const pinta=()=>{ const m=Math.floor(restante/60), s=restante%60; $('#focoTiempo').textContent=`${m}:${String(s).padStart(2,'0')}`; };
  pinta();
  tempTimer=setInterval(()=>{ restante=Math.max(0,restante-1); pinta(); if(restante===0)clearInterval(tempTimer); },1000);
}
function pasoActual(){ return sesion.steps[sesion.i]; }

function barraPasos(){
  return `<div class="progreso-pasos">${sesion.steps.map((s,k)=>{
    const cls = k<sesion.i?'hecho':(k===sesion.i?'activo':''); return `<i class="${cls}"></i>`;
  }).join('')}</div>`;
}
function cabeceraSesion(){
  return `<div class="sesion-top">
    <button class="icon-btn volver" onclick="salirSesion()" title="Volver">←</button>
    ${barraPasos()}
  </div>`;
}
window.salirSesion=()=>{ clearInterval(tempTimer); $('#foco').classList.add('oculto'); ir(renderMapa); };

function avanzar(){ sesion.i++; if(sesion.i>=sesion.steps.length){ return; } mostrarPaso(); }

function mostrarPaso(){
  window.scrollTo(0,0); callar();
  const p=pasoActual(), d=sesion.d, tema=getTema(d.temaId);
  if(p.t==='intro') return pintaIntro(d,tema);
  if(p.t==='tarjeta') return pintaTarjeta(tema, p.k);
  if(p.t==='vocab') return pintaVocab(tema);
  if(p.t==='pausa') return pintaPausa();
  if(p.t==='sabias') return pintaSabias(tema);
  if(p.t==='repasoRapido') return pintaRepasoRapido(tema);
  if(p.t==='actividad') return pintaActividad(p.modo);
  if(p.t==='reto1') return pintaActividad('repaso', 0);
  if(p.t==='reto2') return pintaActividad('repaso', 1);
  if(p.t==='cierre') return pintaCierre();
}

/* --- Intro / misión del día --- */
function pintaIntro(d,tema){
  const esRepaso=d.tipo==='repaso';
  const txt = esRepaso
    ? `¡Hora de jugar! Vamos a repasar lo de esta semana con un reto divertido.`
    : `${tema.objetivo}`;
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">${EMOJI_DIA[d.tipo]} ${NOMBRE_DIA[d.tipo]} · Semana ${d.semana}</span>
      <div class="grande-emoji">${esRepaso?'🎮':tema.emoji}</div>
      <h2>${esRepaso?'Repaso de la semana':esc(tema.titulo)}</h2>
      <p><b>Tu misión de hoy:</b><br>${esc(txt)}</p>
      ${botonLeer('Tu misión de hoy: '+txt)}
      <div class="acciones"><button class="btn-grande" onclick="avanzar()">¡Vamos! 👉</button></div>
    </div>`;
}

/* --- Tarjeta de enseñanza (una idea por pantalla) --- */
function pintaTarjeta(tema, k){
  const c=tema.tarjetas[k], total=tema.tarjetas.length;
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">Aprendo · ${k+1} de ${total}</span>
      <div class="grande-emoji">${c.e}</div>
      <h3>${esc(c.t)}</h3>
      <p>${esc(c.x)}</p>
      ${botonLeer(c.t+'. '+c.x)}
      <div class="acciones"><button class="btn-grande" onclick="avanzar()">Siguiente 👉</button></div>
    </div>`;
}

/* --- Vocabulario clave --- */
function pintaVocab(tema){
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">Palabras mágicas ✨</span>
      <h3>Palabras para recordar</h3>
      <div class="vocab-lista">
        ${tema.vocab.map(v=>`<div class="vocab-item"><b>${esc(v.p)}:</b> ${esc(v.d)}</div>`).join('')}
      </div>
      ${botonLeer(tema.vocab.map(v=>v.p+': '+v.d).join('. '))}
      <div class="acciones"><button class="btn-grande" onclick="avanzar()">¡Lo tengo! 👉</button></div>
    </div>`;
}

/* --- Repaso rápido (día de practicar): 2 tarjetas clave --- */
function pintaRepasoRapido(tema){
  const cs=tema.tarjetas.slice(0,2);
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">Recordemos 🧠</span>
      <h3>${esc(tema.titulo)}</h3>
      ${cs.map(c=>`<p style="margin:.6rem 0"><span style="font-size:1.4rem">${c.e}</span> ${esc(c.x)}</p>`).join('')}
      ${botonLeer(cs.map(c=>c.x).join('. '))}
      <div class="acciones"><button class="btn-grande" onclick="avanzar()">Continuar 👉</button></div>
    </div>`;
}

/* --- ¿Sabías que? --- */
function pintaSabias(tema){
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">¿Sabías que…? 🤯</span>
      <div class="grande-emoji">💡</div>
      <p style="font-size:1.2rem">${esc(tema.sabias)}</p>
      ${botonLeer('¿Sabías que? '+tema.sabias)}
      <div class="acciones"><button class="btn-grande" onclick="avanzar()">¡Genial! 👉</button></div>
    </div>`;
}

/* --- Pausa activa (movimiento, respiración) --- */
const PAUSAS=[
  {e:'🤸', t:'¡A moverse!', x:'Ponte de pie y salta 5 veces como una rana. ¡1, 2, 3, 4, 5!'},
  {e:'🌬️', t:'Respira como el mar', x:'Toma aire por la nariz contando hasta 4… y suéltalo despacio como una ola.'},
  {e:'💪', t:'Estírate', x:'Estira los brazos bien alto, tócate los pies y da una vuelta despacito.'},
  {e:'👏', t:'Ritmo', x:'Da 8 palmas: 4 rápidas y 4 lentas. ¡Muy bien!'},
  {e:'🐢', t:'Tortuga y cohete', x:'Encógete como tortuga… y estírate como cohete. Repite 3 veces.'}
];
function pintaPausa(){
  const p=PAUSAS[Math.floor(Math.random()*PAUSAS.length)];
  let seg=20;
  app.innerHTML = cabeceraSesion() + `
    <div class="pausa">
      <div class="mov">${p.e}</div>
      <h2>${p.t}</h2>
      <p style="font-size:1.15rem">${p.x}</p>
      <div class="cronometro" id="cron">0:${String(seg).padStart(2,'0')}</div>
      <button class="btn-grande acento" onclick="avanzar()">Ya descansé 👉</button>
    </div>`;
  hablar(p.t+'. '+p.x);
  const cr=$('#cron'); const it=setInterval(()=>{ seg--; if(cr)cr.textContent='0:'+String(Math.max(0,seg)).padStart(2,'0'); if(seg<=0)clearInterval(it); },1000);
}

/* =====================================================================
   ACTIVIDADES
   ===================================================================== */
function pintaActividad(modo, mitad){
  const tema=getTema(sesion.d.temaId);
  if(modo==='descubrir') return actQuiz(tema.descubrir.preguntas, tema);
  if(modo==='practicar'){
    const pr=tema.practicar;
    if(pr.tipo==='vf') return actVF(pr.items, tema);
    if(pr.tipo==='emparejar') return actEmparejar(pr, tema);
    if(pr.tipo==='ordenar') return actOrdenar(pr, tema);
  }
  if(modo==='repaso'){
    const A=getTema(sesion.d.temaId), B=getTema(sesion.d.temaId2);
    let pool=[...A.descubrir.preguntas, ...B.descubrir.preguntas];
    pool=barajar(pool);
    const set = (mitad===undefined)? pool.slice(0,6) : (mitad===0? pool.slice(0,3) : pool.slice(3,6));
    return actQuiz(set, A, true);
  }
}

/* Quiz de opción múltiple, una pregunta por pantalla */
function actQuiz(preguntas, tema, esReto){
  let qi=0, ac=0;
  const paso=()=>{
    const q=preguntas[qi];
    const ops = q.op.map((o,i)=>({o,i}));
    app.innerHTML = cabeceraSesion() + `
      <div class="tarjeta">
        <span class="etiqueta">${esReto?'🎮 Reto':'✏️ Actividad'} · ${qi+1}/${preguntas.length}</span>
        <h3>${esc(q.q)}</h3>
        ${botonLeer(q.q)}
        <div class="opciones" id="ops">
          ${ops.map(x=>`<button class="opcion" data-i="${x.i}" onclick="respQuiz(this)"><span class="letra">${'ABC'[x.i]}</span><span>${esc(x.o)}</span></button>`).join('')}
        </div>
        <div id="fb"></div>
      </div>`;
    window.respQuiz=(b)=>{
      const elegido=+b.dataset.i, ok=elegido===q.c;
      sesion.intentos++; if(ok){ ac++; sesion.aciertos++; }
      document.querySelectorAll('#ops .opcion').forEach(op=>{ op.disabled=true;
        const oi=+op.dataset.i; if(oi===q.c)op.classList.add('correcta'); else if(oi===elegido)op.classList.add('incorrecta'); });
      const fb=$('#fb');
      fb.innerHTML = `<div class="mascota-burbuja ${ok?'bien':'ups'}"><span class="cara">${ok?'😃':'🧭'}</span>
        <p>${ok?elige(ANIMOS_BIEN):elige(ANIMOS_UPS)+' '+(q.pista?('Pista: '+esc(q.pista)):'')}</p></div>
        <div class="acciones"><button class="btn-grande" onclick="sigQuiz()">${qi<preguntas.length-1?'Siguiente 👉':'Terminar ✅'}</button></div>`;
      hablar(ok?'¡Correcto!':'Casi. '+(q.pista||''));
      if(ok)confeti();
    };
    window.sigQuiz=()=>{ qi++; if(qi<preguntas.length) paso(); else finActividad(ac/preguntas.length); };
  };
  paso();
}

/* Verdadero / Falso, un ítem por pantalla */
function actVF(items, tema){
  let qi=0, ac=0;
  const paso=()=>{
    const it=items[qi];
    app.innerHTML = cabeceraSesion() + `
      <div class="tarjeta">
        <span class="etiqueta">✏️ ¿Verdadero o falso? · ${qi+1}/${items.length}</span>
        <h3>${esc(it.af)}</h3>
        ${botonLeer(it.af)}
        <div class="vf-botones" id="vfb">
          <button class="vf-btn v" onclick="respVF(true)">👍 Verdadero</button>
          <button class="vf-btn f" onclick="respVF(false)">👎 Falso</button>
        </div>
        <div id="fb"></div>
      </div>`;
    window.respVF=(r)=>{
      const ok=r===it.v; sesion.intentos++; if(ok){ac++;sesion.aciertos++;}
      document.querySelectorAll('#vfb .vf-btn').forEach(b=>b.disabled=true);
      $('#fb').innerHTML=`<div class="mascota-burbuja ${ok?'bien':'ups'}"><span class="cara">${ok?'😃':'🧭'}</span><p>${(ok?'¡Sí! ':'Era '+(it.v?'Verdadero':'Falso')+'. ')+esc(it.exp)}</p></div>
        <div class="acciones"><button class="btn-grande" onclick="sigVF()">${qi<items.length-1?'Siguiente 👉':'Terminar ✅'}</button></div>`;
      hablar((ok?'¡Correcto! ':'Era '+(it.v?'verdadero':'falso')+'. ')+it.exp); if(ok)confeti();
    };
    window.sigVF=()=>{ qi++; if(qi<items.length)paso(); else finActividad(ac/items.length); };
  };
  paso();
}

/* Emparejar: tocar una palabra de la izquierda y su pareja de la derecha */
function actEmparejar(pr, tema){
  const izq = pr.pares.map((p,i)=>({txt:p[0], id:i}));
  const der = barajar(pr.pares.map((p,i)=>({txt:p[1], id:i})));
  let sel=null, hechos=0, fallos=0;
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">✏️ Emparejar</span>
      <h3>${esc(pr.instruccion||'Une cada pareja')}</h3>
      <div class="empareja">
        <div><div class="col-tit">Toca aquí</div>${izq.map(x=>`<div class="pieza izq" data-id="${x.id}" onclick="selIzq(this)">${esc(x.txt)}</div>`).join('')}</div>
        <div><div class="col-tit">…su pareja</div>${der.map(x=>`<div class="pieza der" data-id="${x.id}" onclick="selDer(this)">${esc(x.txt)}</div>`).join('')}</div>
      </div>
      <div id="fb"></div>
    </div>`;
  window.selIzq=(el)=>{ if(el.classList.contains('listo'))return; document.querySelectorAll('.izq').forEach(e=>e.classList.remove('sel')); el.classList.add('sel'); sel=el; };
  window.selDer=(el)=>{
    if(el.classList.contains('listo')||!sel)return;
    sesion.intentos++;
    if(el.dataset.id===sel.dataset.id){ el.classList.add('listo'); sel.classList.add('listo'); sel.classList.remove('sel'); sel=null; hechos++; sesion.aciertos++;
      if(hechos===pr.pares.length){ confeti();
        $('#fb').innerHTML=`<div class="mascota-burbuja bien"><span class="cara">🎉</span><p>¡Todas las parejas correctas!</p></div>
          <div class="acciones"><button class="btn-grande" onclick="finActividad(${(pr.pares.length/(pr.pares.length+fallos)).toFixed(3)})">Terminar ✅</button></div>`;
        hablar('¡Muy bien! Todas las parejas correctas.'); }
    } else { fallos++; el.classList.add('incorrecta'); setTimeout(()=>el.classList.remove('incorrecta'),500);
      $('#fb').innerHTML=`<div class="mascota-burbuja ups"><span class="cara">🧭</span><p>${elige(ANIMOS_UPS)}</p></div>`; }
  };
}

/* Ordenar: mover con flechas y comprobar */
function actOrdenar(pr, tema){
  let orden = barajar(pr.items.map((t,i)=>({t, ok:i})));
  const pinta=()=>{
    app.innerHTML = cabeceraSesion() + `
      <div class="tarjeta">
        <span class="etiqueta">✏️ Ordenar</span>
        <h3>${esc(pr.pregunta)}</h3>
        <div class="ordenar-lista">
          ${orden.map((x,i)=>`<div class="orden-item"><span>${esc(x.t)}</span>
            <span class="flechas">
              <button onclick="mover(${i},-1)" ${i===0?'disabled style=opacity:.3':''}>▲</button>
              <button onclick="mover(${i},1)" ${i===orden.length-1?'disabled style=opacity:.3':''}>▼</button>
            </span></div>`).join('')}
        </div>
        <div class="acciones"><button class="btn-grande" onclick="comprobarOrden()">Comprobar ✅</button></div>
        <div id="fb"></div>
      </div>`;
  };
  window.mover=(i,dir)=>{ const j=i+dir; if(j<0||j>=orden.length)return; [orden[i],orden[j]]=[orden[j],orden[i]]; pinta(); };
  window.comprobarOrden=()=>{
    sesion.intentos++;
    const bien = orden.reduce((n,x,i)=> n + (x.ok===i?1:0), 0);
    const frac = bien/orden.length; const perfecto = bien===orden.length;
    if(perfecto) sesion.aciertos++;
    if(perfecto)confeti();
    $('#fb').innerHTML=`<div class="mascota-burbuja ${perfecto?'bien':'ups'}"><span class="cara">${perfecto?'🎉':'🧭'}</span>
      <p>${perfecto?'¡Orden perfecto!':'Acertaste '+bien+' de '+orden.length+'. ¡Ajusta y sigamos!'}</p></div>
      <div class="acciones"><button class="btn-grande" onclick="finActividad(${frac.toFixed(3)})">Terminar ✅</button></div>`;
    hablar(perfecto?'¡Orden perfecto!':'Acertaste '+bien+' de '+orden.length);
  };
  pinta();
}

/* Al terminar una actividad, guardamos el resultado parcial */
function finActividad(frac){
  sesion._ultimaFrac = (sesion._ultimaFrac===undefined)? frac : (sesion._ultimaFrac+frac)/2;
  avanzar();
}

/* =====================================================================
   CIERRE + RECOMPENSA
   ===================================================================== */
function pintaCierre(){
  clearInterval(tempTimer);
  const d=sesion.d, idx=sesion.idx;
  const frac = (sesion._ultimaFrac!==undefined)? sesion._ultimaFrac : (sesion.intentos? sesion.aciertos/sesion.intentos : 1);
  let estrellas = 1 + Math.round(frac*2); estrellas=Math.max(1,Math.min(3,estrellas));

  // Guardar progreso (nos quedamos con lo mejor)
  const previo = estado.dias[idx]||0;
  const nuevoDia = !(idx in estado.dias);
  estado.dias[idx]=Math.max(previo, estrellas);
  if(nuevoDia) estado.estrellas += estrellas;

  // Racha diaria
  const hoy=HOY();
  if(estado.ultimoDia!==hoy){
    const ayer=new Date(Date.now()-864e5).toISOString().slice(0,10);
    estado.racha = (estado.ultimoDia===ayer)? estado.racha+1 : 1;
    estado.ultimoDia=hoy;
  }

  // ¿Se completó una unidad? → insignia
  let insigniaNueva=null;
  const uni=d.unidad;
  const diasUni=PLAN.map((p,i)=>({p,i})).filter(x=>x.p.unidad===uni);
  if(diasUni.every(x=> x.i in estado.dias) && !estado.insignias.includes(uni)){
    estado.insignias.push(uni); insigniaNueva=UNIDADES[uni-1];
  }
  guardar(); actualizarTopbar();

  const estrHtml=[1,2,3].map(n=>`<span class="${n<=estrellas?'on':'off'}">⭐</span>`).join('');
  app.innerHTML = `
    <div class="tarjeta recompensa">
      <div class="cofre">🎁</div>
      <span class="etiqueta">¡Misión cumplida!</span>
      <h2>${esc(d.tipo==='repaso'?'¡Terminaste el repaso!':d.titulo)}</h2>
      <div class="estrellas-ganadas">${estrHtml}</div>
      <p>${estrellas===3?'¡Increíble, puntaje perfecto!':estrellas===2?'¡Muy buen trabajo!':'¡Lo lograste! Cada día aprendes más.'}</p>
      ${insigniaNueva?`<div class="insignia-nueva"><div class="med">🏅</div><b>¡Nueva insignia!</b><br>${esc(insigniaNueva.insignia)}<br><small>Completaste la Unidad ${uni}</small></div>`:''}
      <div class="acciones" style="flex-direction:column;gap:10px;margin-top:22px">
        ${idx<79?`<button class="btn-grande acento" onclick="ir(iniciarSesion, ${idx+1})">➡️ Siguiente misión</button>`:`<div class="tarjeta" style="box-shadow:none"><h3>🏆 ¡Completaste toda la aventura!</h3><p>Eres una gran exploradora del planeta.</p></div>`}
        <button class="btn-sec" onclick="ir(renderMapa)">🗺️ Ver mi mapa</button>
      </div>
    </div>`;
  $('#foco').classList.add('oculto');
  confeti();
  hablar('¡Misión cumplida! Ganaste '+estrellas+(estrellas===1?' estrella.':' estrellas.'));
}

/* =====================================================================
   AJUSTES / PANEL DE ADULTOS
   ===================================================================== */
function aplicarAjustes(){
  document.body.classList.toggle('calma', estado.ajustes.calma);
  document.body.classList.toggle('reduce', estado.ajustes.reduce);
  ['voz','calma','reduce','pausas'].forEach(k=>{
    const sw={voz:'#swVoz',calma:'#swCalma',reduce:'#swReduce',pausas:'#swPausas'}[k];
    $(sw).classList.toggle('on', !!estado.ajustes[k]);
  });
}
function abrirAjustes(){
  // progreso
  const hechos=Object.keys(estado.dias).length;
  $('#barraAjustes').style.width=(hechos/80*100)+'%';
  let filas='';
  for(let u=1;u<=8;u++){
    const dias=PLAN.map((p,i)=>({p,i})).filter(x=>x.p.unidad===u);
    const c=dias.filter(x=>x.i in estado.dias).length;
    filas+=`<tr><td>${UNIDADES[u-1].emoji} Unidad ${u}: ${esc(UNIDADES[u-1].titulo)}</td><td>${c}/${dias.length}${estado.insignias.includes(u)?' 🏅':''}</td></tr>`;
  }
  $('#tablaProgreso').innerHTML=filas;
  aplicarAjustes();
  $('#hojaAjustes').classList.remove('oculto');
}

/* =====================================================================
   ARRANQUE
   ===================================================================== */
function init(){
  aplicarAjustes();
  actualizarTopbar();
  // switches
  document.querySelectorAll('.switch').forEach(sw=>{
    sw.addEventListener('click',()=>{ const k=sw.dataset.set; estado.ajustes[k]=!estado.ajustes[k]; guardar(); aplicarAjustes(); });
  });
  $('#btnAjustes').addEventListener('click', abrirAjustes);
  $('#btnCerrarAjustes').addEventListener('click',()=> $('#hojaAjustes').classList.add('oculto'));
  $('#hojaAjustes').addEventListener('click',e=>{ if(e.target.id==='hojaAjustes') $('#hojaAjustes').classList.add('oculto'); });
  
  // Archivos
  $('#btnGuardarArchivo').addEventListener('click', exportarProgreso);
  $('#btnCargarArchivo').addEventListener('click', () => $('#inputArchivo').click());
  $('#inputArchivo').addEventListener('change', importarProgreso);

  $('#btnReiniciar').addEventListener('click',()=>{
    if(confirm('¿Seguro que quieres borrar todo el progreso y empezar de nuevo tu viaje mágico?')){
      const aj=estado.ajustes; estado=clon(porDefecto); estado.ajustes=aj; guardar(); actualizarTopbar(); $('#hojaAjustes').classList.add('oculto'); ir(renderInicio);
    }
  });
  ir(renderInicio);
}
document.addEventListener('DOMContentLoaded', init);
