const fs=require("fs");
const app=fs.readFileSync("js/app.js","utf8");

// Handlers usados en onclick="fn(" dentro de las plantillas
const usados=new Set();
const re=/onclick=["']([A-Za-z_$][\w$]*)\(/g;
let m; while((m=re.exec(app))) usados.add(m[1]);

// Funciones/vars definidas
const def=new Set();
for(const x of app.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)) def.add(x[1]);
for(const x of app.matchAll(/window\.([A-Za-z_$][\w$]*)\s*=/g)) def.add(x[1]);
for(const x of app.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g)) def.add(x[1]);

const faltan=[...usados].filter(h=>!def.has(h));
console.log("Handlers onclick ("+usados.size+"):", [...usados].sort().join(", "));
console.log(faltan.length ? "FALTAN: "+faltan.join(", ") : "OK: todos los onclick tienen función definida");

// Comprobar que finActividad se llama y define
["finActividad","avanzar","iniciarSesion","respQuiz","respVF","selIzq","selDer","mover","comprobarOrden","toggleUnidad","salirSesion","ir","hablarTexto"].forEach(f=>{
  if(!def.has(f)) console.log("  !! sin definir:", f);
});
