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
  xp: 0, nivel: 1,   // Gamificación
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

window._ultimaVoz = null;
function hablar(texto, forzar = false){
  if((!estado.ajustes.voz && !forzar) || !('speechSynthesis' in window)) return;
  
  try {
    // Si el motor de voz se quedó pausado/atascado, reanudarlo
    if (speechSynthesis.paused) speechSynthesis.resume();
    // Cancelar cualquier locución anterior en curso
    if (speechSynthesis.speaking) speechSynthesis.cancel();
  } catch(e) {}
  
  // No usar setTimeout aquí porque los navegadores requieren que el speak()
  // se llame sincrónicamente en el contexto del evento click (user gesture).
  try {
    const u = new SpeechSynthesisUtterance(texto);
    u.rate = 0.95; 
    u.pitch = 1.05; 
    u.lang = 'es-ES'; // Idioma por defecto seguro
    
    // Intentar forzar la mejor voz en español disponible
    const voces = speechSynthesis.getVoices();
    if (voces && voces.length > 0) {
      const vozIdeal = voces.find(v => v.lang === 'es-CO') || 
                       voces.find(v => v.lang === 'es-MX') || 
                       voces.find(v => v.lang === 'es-ES') ||
                       voces.find(v => v.lang.startsWith('es'));
      if (vozIdeal) {
        u.voice = vozIdeal;
        u.lang = vozIdeal.lang;
      }
    }

    window._ultimaVoz = u; // Prevenir recolección de basura prematura (bug Chrome)
    u.onend = () => { window._ultimaVoz = null; };
    u.onerror = (e) => { window._ultimaVoz = null; console.error("Error voz:", e); };
    
    speechSynthesis.speak(u);
  } catch(e) {
    console.error("Error reproduciendo audio:", e);
  }
}
function callar(){ try{ speechSynthesis.cancel(); }catch(e){} }
function botonLeer(texto){ return `<button class="leer" onclick='hablarTexto(this)' data-t="${esc(texto).replace(/"/g,'&quot;')}">🔊 Escuchar</button>`; }

window.hablarTexto = b => {
  // Pequeña animación visual para confirmar el clic
  const originalBg = b.style.backgroundColor;
  b.style.backgroundColor = '#bce0fd';
  b.style.transform = 'scale(0.92)';
  setTimeout(() => {
    b.style.backgroundColor = originalBg;
    b.style.transform = '';
  }, 200);

  hablar(b.getAttribute('data-t'), true);
};

function actualizarTopbar(){
  const numE = $('#numEstrellas');
  const numR = $('#numRacha');
  const numN = $('#numNivel');
  const numXP = $('#numXP');
  const barraXP = $('#barraXP');
  
  if (numE && numE.textContent != estado.estrellas) {
    $('#chipEstrellas').classList.remove('changed');
    void $('#chipEstrellas').offsetWidth; // force reflow
    $('#chipEstrellas').classList.add('changed');
  }
  if (numR && numR.textContent != estado.racha) {
    $('#chipRacha').classList.remove('changed');
    void $('#chipRacha').offsetWidth; // force reflow
    $('#chipRacha').classList.add('changed');
  }

  if(numE) numE.textContent = estado.estrellas;
  if(numR) numR.textContent = estado.racha;
  if(numN) numN.textContent = estado.nivel;
  if(numXP) numXP.textContent = estado.xp;
  
  // Calcular progreso al siguiente nivel (ej: cada 100 XP es un nivel)
  if(barraXP) {
    const xpBase = (estado.nivel - 1) * 100;
    const xpSiguiente = estado.nivel * 100;
    const progreso = ((estado.xp - xpBase) / (xpSiguiente - xpBase)) * 100;
    barraXP.style.width = Math.min(100, Math.max(0, progreso)) + '%';
  }
}

// Función para ganar XP
function ganarXP(cantidad) {
  estado.xp += cantidad;
  const nivelNuevo = Math.floor(estado.xp / 100) + 1;
  if (nivelNuevo > estado.nivel) {
    estado.nivel = nivelNuevo;
    hablar(`¡Felicidades! Subiste al nivel ${estado.nivel}`);
    confeti();
  }
  guardar();
  actualizarTopbar();
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

/* --- Motor TDAH: Sonidos y Reacciones (NUEVO) --- */
const AudioCTX = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function playTone(freq, type, duration) {
  if (estado.ajustes.reduce) return;
  if (!audioCtx) {
    try { audioCtx = new AudioCTX(); } catch(e) { return; }
  }
  if(audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

const SFX = {
  click: () => playTone(600, 'sine', 0.1),
  success: () => { playTone(400, 'square', 0.1); setTimeout(()=>playTone(600, 'square', 0.2), 100); },
  reveal: () => playTone(300, 'triangle', 0.3),
  error: () => playTone(150, 'sawtooth', 0.3)
};

function reaccionarAvatar(emocion, mensaje = "") {
  const avatar = document.getElementById('avatar');
  const bubble = document.getElementById('avatar-bubble');
  if(!avatar || estado.ajustes.reduce) return;
  
  avatar.className = ''; 
  avatar.classList.add('avatar-' + emocion);
  
  if (mensaje) {
    bubble.textContent = mensaje;
    bubble.classList.remove('oculto');
    setTimeout(() => bubble.classList.add('oculto'), 3000);
  }
  
  setTimeout(() => {
    avatar.className = 'avatar-idle';
  }, emocion === 'excited' ? 1500 : 3000);
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
  const tema=getTema(d.temaId);
  
  if(tema.video && d.tipo === 'descubrir') {
    steps.push({t:'video'});
  }

  if(d.tipo==='descubrir'){
    tema.tarjetas.forEach((c,k)=> steps.push({t:'tarjeta', k}));
    if(estado.ajustes.pausas) steps.push({t:'pausa'});
    steps.push({t:'vocab'});
    steps.push({t:'actividad', modo:'descubrir'});
  } else if(d.tipo==='practicar'){
    steps.push({t:'repasoRapido'});
    steps.push({t:'sabias'});
    if(estado.ajustes.pausas) steps.push({t:'pausa'});
    steps.push({t:'actividad', modo:'practicar'});
    if(tema.manualidad) steps.push({t:'manualidad'});
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
  if(p.t==='video') return pintaVideo(tema);
  if(p.t==='tarjeta') return pintaTarjeta(tema, p.k);
  if(p.t==='vocab') return pintaVocab(tema);
  if(p.t==='pausa') return pintaPausa();
  if(p.t==='sabias') return pintaSabias(tema);
  if(p.t==='repasoRapido') return pintaRepasoRapido(tema);
  if(p.t==='actividad') return pintaActividad(p.modo);
  if(p.t==='reto1') return pintaActividad('repaso', 0);
  if(p.t==='reto2') return pintaActividad('repaso', 1);
  if(p.t==='manualidad') return pintaManualidad(tema);
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

function pintaCierre(){
  clearInterval(tempTimer);
  const puntos=10; const monedas=5;
  sumar(puntos, monedas);
  
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta slide-up" style="background:linear-gradient(135deg,var(--primario-suave),#fff)">
      <h2>¡Misión Cumplida! 🥳</h2>
      <div style="font-size:3rem; margin:10px 0;">🌟</div>
      <p style="font-size:1.2rem; color:var(--primario-osc);">¡Eres genial! Lo lograste.</p>
      <div class="stats-fin">
        <div><span class="emoji">⭐</span> +${puntos} XP</div>
        <div><span class="emoji">🪙</span> +${monedas}</div>
      </div>
      <div class="acciones"><button class="btn-grande pulse-anim" onclick="salirSesion()">Volver al Mapa</button></div>
    </div>`;
  hablar("¡Misión cumplida! Eres genial, lo lograste.");
  tirarConfeti();
}

/* --- Actividad Manual --- */
function pintaManualidad(tema){
  const m = tema.manualidad;
  if (!m) return avanzar();
  
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta slide-up">
      <span class="etiqueta pulse-anim">¡Manos a la Obra! 🎨</span>
      <div class="grande-emoji">✂️</div>
      <h3>${esc(m.titulo)}</h3>
      
      <div style="text-align:left; background:var(--bg); border-radius:14px; padding:16px; margin:15px 0;">
        <h4 style="color:var(--primario-osc); margin-bottom:8px;">Materiales:</h4>
        <ul style="padding-left:20px; font-size:1.1rem; color:var(--tinta);">
          ${m.materiales.map(x=>`<li>${esc(x)}</li>`).join('')}
        </ul>
      </div>

      <div style="text-align:left;">
        <h4 style="color:var(--primario-osc); margin-bottom:8px;">Instrucciones:</h4>
        <ol style="padding-left:20px; font-size:1.1rem; color:var(--tinta);">
          ${m.pasos.map(x=>`<li style="margin-bottom:8px;">${esc(x)}</li>`).join('')}
        </ol>
      </div>

      <div class="acciones"><button class="btn-grande" onclick="avanzar()">¡Actividad Completada! 👉</button></div>
    </div>`;
    
  hablar("¡Manos a la obra! " + m.titulo);
}

/* --- Video de Youtube Curado --- */
function pintaVideo(tema) {
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">Cine Explorador 🍿</span>
      <h3>${esc(tema.video.titulo)}</h3>
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/${tema.video.id}?rel=0&showinfo=0" allowfullscreen></iframe>
      </div>
      <div class="acciones"><button class="btn-grande" onclick="avanzar()">Ya vi el video 👉</button></div>
    </div>`;
}


/* --- Tarjeta Interactiva (Motor TDAH) --- */
function pintaTarjeta(tema, k){
  const c = tema.tarjetas[k], total = tema.tarjetas.length;
  const modo = c.modo || 'tocar'; // 'tocar', 'mantener'
  
  let htmlMecanica = '';
  
  if (modo === 'mantener') {
    htmlMecanica = `
      <div id="zonaInteraccion" class="caja-misteriosa" style="user-select:none; background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);">
        <div style="font-size:4rem; margin-bottom:10px;">${c.e}</div>
        <div>MANTÉN PRESIONADO PARA DESCUBRIR</div>
        <div style="width:100%; height:12px; background:rgba(0,0,0,0.2); border-radius:10px; margin-top:20px; overflow:hidden;">
          <div id="barraMantener" style="width:0%; height:100%; background:#00f260; transition: width 0.1s;"></div>
        </div>
      </div>
    `;
  } else {
    htmlMecanica = `
      <div id="zonaInteraccion" class="caja-misteriosa" onclick="tocarMision()">
        <div style="font-size:4rem; margin-bottom:10px;">🎁</div>
        <div>¡TOCA RÁPIDO PARA ABRIR!</div>
      </div>
    `;
  }

  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta" id="tarjetaContenedor">
      <span class="etiqueta">Misión · ${k+1} de ${total}</span>
      
      ${htmlMecanica}

      <div id="contenidoTarjeta" style="display:none;" class="tarjeta-revelada">
        <div class="grande-emoji">${c.e}</div>
        <h3>${esc(c.t)}</h3>
        <p>${esc(c.x)}</p>
        ${botonLeer(c.t+'. '+c.x)}
        <div class="acciones"><button class="btn-grande" onclick="avanzarMision()">¡Misión Cumplida! 👉</button></div>
      </div>
    </div>`;
    
  if (modo === 'mantener') {
    let intervalo = null;
    let progreso = 0;
    const zona = $('#zonaInteraccion');
    const iniciar = () => {
      if(progreso >= 100) return;
      SFX.click();
      reaccionarAvatar('thinking', '¡Sigue así!');
      intervalo = setInterval(() => {
        progreso += 5;
        $('#barraMantener').style.width = progreso + '%';
        if (progreso >= 100) {
          clearInterval(intervalo);
          revelar();
        }
      }, 50);
    };
    const detener = () => { 
      clearInterval(intervalo); 
      if(progreso > 0 && progreso < 100) { 
        progreso=0; $('#barraMantener').style.width = '0%'; SFX.error(); reaccionarAvatar('idle');
      } 
    };
    
    zona.addEventListener('mousedown', iniciar);
    zona.addEventListener('mouseup', detener);
    zona.addEventListener('mouseleave', detener);
    zona.addEventListener('touchstart', (e)=>{ e.preventDefault(); iniciar(); }, {passive:false});
    zona.addEventListener('touchend', detener);
  } else {
    let toques = 0;
    window.tocarMision = () => {
      toques++;
      SFX.click();
      const caja = $('#zonaInteraccion');
      if (toques === 1) { caja.classList.add('toque-1'); reaccionarAvatar('thinking', '¡Casi!'); }
      if (toques === 2) { caja.classList.add('toque-2'); }
      if (toques >= 3) {
        revelar();
      }
    };
  }

  function revelar() {
    $('#zonaInteraccion').style.display = 'none';
    $('#contenidoTarjeta').style.display = 'block';
    SFX.reveal();
    confeti();
    reaccionarAvatar('excited', '¡Excelente!');
    ganarXP(10);
    hablar("¡Misión completada!");
  }
  
  window.avanzarMision = () => {
    SFX.click();
    avanzar();
  };
}

/* --- Vocabulario clave (Burbujas) --- */
function pintaVocab(tema){
  let reventadas = 0;
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">Palabras mágicas ✨</span>
      <h3>¡Explota las burbujas para descubrir su significado!</h3>
      <div class="burbujas-container">
        ${tema.vocab.map((v, i) => `
          <div class="burbuja" id="burbuja-${i}" onclick="reventarBurbuja(${i}, '${esc(v.d).replace(/'/g,"\\'").replace(/"/g,"&quot;")}')">
            ${esc(v.p)}
          </div>
        `).join('')}
      </div>
      <div class="acciones" id="btnVocab" style="display:none; margin-top:20px;">
        <button class="btn-grande" onclick="avanzar()">¡Lo tengo! 👉</button>
      </div>
    </div>`;

  window.reventarBurbuja = (i, definicion) => {
    const b = $(`#burbuja-${i}`);
    if(b.classList.contains('reventada')) return;
    b.classList.add('reventada');
    b.innerHTML = `<b>${b.textContent}</b> ${definicion}`;
    reventadas++;
    if(reventadas === tema.vocab.length) {
      $('#btnVocab').style.display = 'block';
      confeti();
      ganarXP(10);
    }
  };
}

/* --- Repaso rápido (Carga de energía) --- */
function pintaRepasoRapido(tema){
  const cs=tema.tarjetas.slice(0,2);
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">Recordemos 🧠</span>
      <h3>${esc(tema.titulo)}</h3>
      
      <div id="cajaRepaso">
        <p style="color:var(--tinta-suave); font-size:1.1rem">Para recordar, necesitas recargar tu energía neuronal.</p>
        <button class="btn-grande btn-carga" id="btnCarga" style="width:100%; margin-top:20px; font-size:1.2rem; padding:20px;">
          <div class="carga-progreso" id="cargaProgreso"></div>
          <span style="position:relative; z-index:2">Mantén presionado 2 seg</span>
        </button>
      </div>

      <div id="contenidoRepaso" style="display:none;" class="tarjeta-revelada">
        ${cs.map(c=>`<p style="margin:.6rem 0"><span style="font-size:1.4rem">${c.e}</span> ${esc(c.x)}</p>`).join('')}
        ${botonLeer(cs.map(c=>c.x).join('. '))}
        <div class="acciones"><button class="btn-grande" onclick="avanzar()">Continuar 👉</button></div>
      </div>
    </div>`;

  setTimeout(() => {
    const btn = $('#btnCarga');
    const prog = $('#cargaProgreso');
    if(!btn) return;
    
    let holdTimer = null;
    let progress = 0;
    
    const stopHold = () => {
      clearInterval(holdTimer);
      if(progress < 100) {
        progress = 0;
        prog.style.width = '0%';
      }
    };
    
    const startHold = (e) => {
      // Evitar que el long-press de móviles abra un menú
      if (e.cancelable) e.preventDefault();
      clearInterval(holdTimer);
      holdTimer = setInterval(() => {
        progress += 5;
        prog.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(holdTimer);
          $('#cajaRepaso').style.display = 'none';
          $('#contenidoRepaso').style.display = 'block';
          confeti();
          ganarXP(10);
        }
      }, 100);
    };

    btn.addEventListener('mousedown', startHold);
    btn.addEventListener('touchstart', startHold, {passive: false});
    window.addEventListener('mouseup', stopHold);
    window.addEventListener('touchend', stopHold);
  }, 100);
}

/* --- ¿Sabías que? (Slider) --- */
function pintaSabias(tema){
  app.innerHTML = cabeceraSesion() + `
    <div class="tarjeta">
      <span class="etiqueta">¿Sabías que…? 🤯</span>
      <div class="grande-emoji">💡</div>
      <h3>¡Desliza el cohete para revelar el secreto!</h3>
      
      <div class="slider-container" id="sliderContainer">
        <div class="slider-track" id="sliderTrack"></div>
        <div class="slider-text">Desliza ➔</div>
        <div class="slider-thumb" id="sliderThumb">🚀</div>
      </div>

      <div id="secretoSabias" style="display:none;" class="tarjeta-revelada">
        <p style="font-size:1.2rem">${esc(tema.sabias)}</p>
        ${botonLeer('¿Sabías que? '+tema.sabias)}
        <div class="acciones"><button class="btn-grande" onclick="avanzar()">¡Genial! 👉</button></div>
      </div>
    </div>`;

  setTimeout(() => {
    const thumb = $('#sliderThumb');
    const track = $('#sliderTrack');
    const container = $('#sliderContainer');
    if(!thumb) return;
    
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const maxScroll = container.offsetWidth - thumb.offsetWidth;

    const onStart = (e) => {
      isDragging = true;
      startX = (e.touches ? e.touches[0].clientX : e.clientX) - currentX;
    };
    
    const onMove = (e) => {
      if(!isDragging) return;
      // Prevenir el scroll de la pagina si arrastramos
      if (e.cancelable) e.preventDefault(); 
      let x = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
      if (x < 0) x = 0;
      if (x > maxScroll) x = maxScroll;
      currentX = x;
      thumb.style.transform = `translateX(${x}px)`;
      track.style.width = `${x + thumb.offsetWidth}px`;

      if (x >= maxScroll * 0.95) {
        isDragging = false;
        container.style.display = 'none';
        $('#secretoSabias').style.display = 'block';
        confeti();
        ganarXP(5);
      }
    };
    
    const onEnd = () => {
      if(!isDragging) return;
      isDragging = false;
      if (currentX < maxScroll * 0.95) {
        currentX = 0;
        thumb.style.transform = `translateX(0px)`;
        thumb.style.transition = 'transform 0.3s';
        track.style.width = `${thumb.offsetWidth}px`;
        track.style.transition = 'width 0.3s';
        setTimeout(() => {
          thumb.style.transition = '';
          track.style.transition = '';
        }, 300);
      }
    };

    thumb.addEventListener('mousedown', onStart);
    thumb.addEventListener('touchstart', onStart, {passive: true});
    window.addEventListener('mousemove', onMove, {passive: false});
    window.addEventListener('touchmove', onMove, {passive: false});
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
  }, 100);
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
      sesion.intentos++; if(ok){ ac++; sesion.aciertos++; ganarXP(10); }
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
      const ok=r===it.v; sesion.intentos++; if(ok){ac++;sesion.aciertos++; ganarXP(10);}
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
      <h3>${esc(pr.instruccion||'Arrastra cada palabra hacia su pareja correcta')}</h3>
      <div class="empareja">
        <div>
          <div class="col-tit">Arrastra de aquí...</div>
          ${izq.map(x=>`<div class="pieza izq arrastrable" draggable="true" data-id="${x.id}" ondragstart="arrastrarIzq(event, this)" ondragend="finArrastre(event, this)">${esc(x.txt)}</div>`).join('')}
        </div>
        <div>
          <div class="col-tit">...hasta aquí</div>
          ${der.map(x=>`<div class="pieza der zona-drop" data-id="${x.id}" ondragover="permitirDrop(event)" ondragenter="entraDrop(event, this)" ondragleave="saleDrop(event, this)" ondrop="soltarDer(event, this)">${esc(x.txt)}</div>`).join('')}
        </div>
      </div>
      <div id="fb"></div>
    </div>`;

  window.arrastrarIzq = (e, el) => {
    if(el.classList.contains('listo')){ e.preventDefault(); return; }
    e.dataTransfer.setData('text/plain', el.dataset.id);
    setTimeout(()=>el.classList.add('dragging'), 0);
    sel = el;
  };
  window.finArrastre = (e, el) => { el.classList.remove('dragging'); };
  window.permitirDrop = e => e.preventDefault();
  window.entraDrop = (e, el) => { if(!el.classList.contains('listo')) el.classList.add('drag-over'); };
  window.saleDrop = (e, el) => el.classList.remove('drag-over');

  window.soltarDer = (e, el) => {
    e.preventDefault();
    el.classList.remove('drag-over');
    if(el.classList.contains('listo') || !sel) return;
    const idArrastrado = e.dataTransfer.getData('text/plain');
    sesion.intentos++;
    if(el.dataset.id === idArrastrado){ 
      el.classList.add('listo'); sel.classList.add('listo'); 
      sel.classList.remove('arrastrable'); sel.removeAttribute('draggable'); 
      sel=null; hechos++; sesion.aciertos++; ganarXP(10);
      if(hechos===pr.pares.length){ confeti(); ganarXP(20);
        $('#fb').innerHTML=`<div class="mascota-burbuja bien"><span class="cara">🎉</span><p>¡Todas las parejas correctas!</p></div>
          <div class="acciones"><button class="btn-grande" onclick="finActividad(${(pr.pares.length/(pr.pares.length+fallos)).toFixed(3)})">Terminar ✅</button></div>`;
        hablar('¡Muy bien! Todas las parejas correctas.'); }
    } else { 
      fallos++; el.classList.add('incorrecta'); setTimeout(()=>el.classList.remove('incorrecta'),500);
      $('#fb').innerHTML=`<div class="mascota-burbuja ups"><span class="cara">🧭</span><p>${elige(ANIMOS_UPS)}</p></div>`; 
    }
  };
}

/* Ordenar: mover con flechas y comprobar */
function actOrdenar(pr, tema){
  let orden = barajar(pr.items.map((t,i)=>({t, ok:i})));
  let arrastradoIdx = null;

  const pinta=()=>{
    app.innerHTML = cabeceraSesion() + `
      <div class="tarjeta">
        <span class="etiqueta">✏️ Ordenar</span>
        <h3>${esc(pr.pregunta)}</h3>
        <p style="color:var(--tinta-suave); font-size:0.9rem;">(Arrastra los elementos para ordenarlos)</p>
        <div class="ordenar-lista">
          ${orden.map((x,i)=>`
            <div class="orden-item arrastrable zona-drop" draggable="true" data-idx="${i}" 
                 ondragstart="iniciarArrastreOrden(event, ${i}, this)" 
                 ondragover="permitirDropOrden(event)" 
                 ondragenter="entraDropOrden(event, this)" 
                 ondragleave="saleDropOrden(event, this)" 
                 ondrop="soltarOrden(event, ${i}, this)"
                 ondragend="finArrastreOrden(event, this)">
              <span>${esc(x.t)}</span>
              <span class="flechas" style="opacity:0.3">↕️</span>
            </div>`).join('')}
        </div>
        <div class="acciones"><button class="btn-grande" onclick="comprobarOrden()">Comprobar ✅</button></div>
        <div id="fb"></div>
      </div>`;
  };

  window.iniciarArrastreOrden = (e, i, el) => { arrastradoIdx = i; setTimeout(()=>el.classList.add('dragging'), 0); };
  window.finArrastreOrden = (e, el) => { el.classList.remove('dragging'); };
  window.permitirDropOrden = e => e.preventDefault();
  window.entraDropOrden = (e, el) => el.classList.add('drag-over');
  window.saleDropOrden = (e, el) => el.classList.remove('drag-over');
  
  window.soltarOrden = (e, dropIdx, el) => {
    e.preventDefault();
    el.classList.remove('drag-over');
    if (arrastradoIdx === null || arrastradoIdx === dropIdx) return;
    // Intercambiar (o insertar)
    const item = orden.splice(arrastradoIdx, 1)[0];
    orden.splice(dropIdx, 0, item);
    arrastradoIdx = null;
    pinta();
  };

  window.comprobarOrden=()=>{
    sesion.intentos++;
    const bien = orden.reduce((n,x,i)=> n + (x.ok===i?1:0), 0);
    const frac = bien/orden.length; const perfecto = bien===orden.length;
    if(perfecto){ sesion.aciertos++; ganarXP(30); }
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
      
      ${d.tipo !== 'repaso' && getTema(d.temaId).enlaces ? `
      <div class="enlaces-extra" style="margin-top:20px; text-align:left; background:var(--bg); padding:16px; border-radius:14px;">
        <h4 style="margin:0 0 10px; color:var(--primario-osc);">🚀 ¡Explora más por tu cuenta!</h4>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          ${getTema(d.temaId).enlaces.map(e => `
            <li><a href="${esc(e.url)}" target="_blank" style="display:flex; align-items:center; gap:8px; color:var(--tinta); text-decoration:none; font-weight:700; background:#fff; padding:10px 14px; border-radius:10px; border:1px solid var(--linea); transition:transform 0.2s;">
              <span>🔗</span> <span>${esc(e.texto)}</span>
            </a></li>
          `).join('')}
        </ul>
      </div>
      ` : ''}

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
