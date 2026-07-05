/* ============================================================
   SOCIALES GRADO 3° — Contenido curricular
   Curso: HomeSchooling Colombia (SOCIALES GRADO 3°)
   8 unidades x 4 temas = 32 temas. Alineado a Estándares MEN / DBA.
   Autoría pedagógica: contenido original grado 3, no reproduce el
   material de la plataforma; sigue su secuencia y competencias.
   ============================================================ */

const UNIDADES = [
  { n: 1, titulo: "¡Explorando los Gigantes Azules de la Tierra!", emoji: "🌊", color: "#2a9dd6", insignia: "Guardiana del Agua" },
  { n: 2, titulo: "¡La Tierra y el Trabajo en mi Región!",         emoji: "🌱", color: "#5aa84f", insignia: "Exploradora de Recursos" },
  { n: 3, titulo: "¡Cuando las Personas Cambian Nuestro Territorio!", emoji: "🏗️", color: "#e08a2b", insignia: "Vigía del Territorio" },
  { n: 4, titulo: "¡Sabores, Ritmos y Paisajes con Historia!",     emoji: "🎉", color: "#d64c8a", insignia: "Guardiana de la Cultura" },
  { n: 5, titulo: "¡El Tiempo, Nuestro Gran Organizador!",         emoji: "⏳", color: "#7b57c2", insignia: "Maestra del Tiempo" },
  { n: 6, titulo: "¡Un Mosaico de Culturas en Colombia!",          emoji: "🧑🏽‍🤝‍🧑🏾", color: "#c2456b", insignia: "Tejedora de Culturas" },
  { n: 7, titulo: "¡Mi Voz Cuenta en mi Municipio!",               emoji: "🏛️", color: "#3b7dd8", insignia: "Ciudadana Líder" },
  { n: 8, titulo: "¡Conociendo el Gobierno de Nuestro Departamento!", emoji: "🗺️", color: "#2f9e8f", insignia: "Constructora de Paz" }
];

/* Cada tema:
   id, unidad, titulo, emoji, objetivo, dba,
   vocab:[{p,d}], tarjetas:[{t,x,e}], sabias,
   descubrir:{tipo:'quiz', preguntas:[{q,op:[],c,pista}]},
   practicar:{tipo:'vf'|'emparejar'|'ordenar', ...}
*/
const TEMAS = [
/* ============ UNIDAD 1 ============ */
{
  id:"u1t1", unidad:1, titulo:"Un Planeta Azul", emoji:"🌍",
  objetivo:"Identificar los océanos y continentes de la Tierra y reconocer que el agua cubre la mayor parte del planeta.",
  dba:"Estándar MEN: Reconozco y describo características del planeta Tierra como los cuerpos de agua y las masas de tierra que lo conforman.",
  vocab:[
    {p:"Océano", d:"Una enorme masa de agua salada que cubre gran parte de la Tierra."},
    {p:"Continente", d:"Una gran extensión de tierra rodeada por agua."},
    {p:"Planeta", d:"Un cuerpo enorme y redondo que gira en el espacio, como la Tierra."}
  ],
  
  manualidad: {"titulo":"Planeta de Plastilina","materiales":["Plastilina azul","Plastilina verde"],"pasos":["Haz una bola grande con la plastilina azul.","Amasa trocitos de plastilina verde y pégalos sobre la bola azul simulando los continentes.","Compara tu planeta con una foto de la Tierra real."]},video: { id: "CsPnOFqTyK0", titulo: "El Planeta Tierra - Happy Learning" },
  enlaces: [
    { url: "https://spaceplace.nasa.gov/all-about-earth/sp/", texto: "Todo sobre la Tierra en NASA Space Place" }
  ],
  tarjetas:[
    {e:"🌐", t:"Planeta Azul", x:"La Tierra se ve azul desde el espacio porque el **AGUA** cubre casi todo el planeta.", modo:"mantener"},
    {e:"🌊", t:"Los 5 océanos", x:"El agua forma 5 océanos. El **Pacífico** es el más grande de todos.", modo:"tocar"},
    {e:"🗺️", t:"Los continentes", x:"La tierra firme forma 6 continentes. ¡Nosotros vivimos en **América**!", modo:"mantener"},
    {e:"🇨🇴", t:"Colombia y el mar", x:"Colombia tiene costa en **DOS** océanos: el Pacífico y el mar Caribe.", modo:"tocar"}
  ],
  sabias:"¡El océano Pacífico es tan grande que cabrían todos los continentes juntos dentro de él!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Por qué llaman a la Tierra el 'Planeta Azul'?", op:["Porque el cielo es azul","Porque el agua cubre casi todo el planeta","Porque hace frío"], c:1, pista:"Piensa en lo que se ve desde el espacio."},
    {q:"¿Cuál es el océano más grande?", op:["Atlántico","Índico","Pacífico"], c:2, pista:"Su nombre empieza por 'Pa'."},
    {q:"¿En qué continente vivimos?", op:["Europa","América","Asia"], c:1, pista:"Colombia está aquí."},
    {q:"Colombia tiene costa en...", op:["Un solo océano","Ningún océano","Dos océanos"], c:2, pista:"El Pacífico y el Caribe."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"El agua cubre la mayor parte de la Tierra.", v:true, exp:"¡Sí! Por eso se ve azul desde el espacio."},
    {af:"Un continente es una masa de agua salada.", v:false, exp:"No: un continente es una gran masa de TIERRA. El agua salada forma los océanos."},
    {af:"El océano Pacífico es más pequeño que un lago.", v:false, exp:"No: el Pacífico es el océano más grande del mundo."},
    {af:"Colombia tiene costa en el mar Caribe.", v:true, exp:"¡Correcto! Y también en el océano Pacífico."}
  ]}
},
{
  id:"u1t2", unidad:1, titulo:"Mares y Costas", emoji:"🏖️",
  objetivo:"Describir qué es una costa y las actividades sociales y económicas de las zonas costeras.",
  dba:"DBA: Describe características de los paisajes costeros y las actividades de las personas que viven cerca del mar.",
  vocab:[
    {p:"Costa", d:"El lugar donde la tierra se encuentra con el mar."},
    {p:"Puerto", d:"Un lugar en la costa donde llegan y salen los barcos."},
    {p:"Manglar", d:"Un bosque especial que crece en la orilla del mar, con árboles de raíces largas."}
  ],
  
  manualidad: {"titulo":"Mi Playa de Arena Casera","materiales":["Una caja de zapatos (tapa)","Arena o pan rallado","Papel azul","Piedritas o conchas"],"pasos":["Pega el papel azul en una mitad de la tapa para hacer el mar.","Pon la arena en la otra mitad para hacer la playa.","Decora la orilla con las piedritas o conchitas que tengas."]},video: { id: "nOl9y1OeL9k", titulo: "Los Accidentes Geográficos - Smile and Learn" },
  enlaces: [
    { url: "https://www.fundacionaquae.org/wiki/por-que-el-mar-es-azul/", texto: "¿Por qué el mar es azul? (Fundación Aquae)" }
  ],
  tarjetas:[
    {e:"🏖️", t:"¿Qué es una costa?", x:"La costa es la **orilla** donde la tierra toca el mar.", modo:"mantener"},
    {e:"🎣", t:"La pesca", x:"Las familias de la costa viven de **atrapar peces** en el mar.", modo:"tocar"},
    {e:"🚢", t:"Los puertos", x:"Allí llegan barcos enormes. **Buenaventura** y **Cartagena** son puertos importantes.", modo:"mantener"},
    {e:"🐠", t:"Vida en el borde", x:"En las costas viven cangrejos, aves y peces. Los **manglares** son su casa.", modo:"tocar"}
  ],
  sabias:"En los manglares nacen muchos peces bebés que se esconden entre las raíces hasta que crecen.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es una costa?", op:["El centro de una ciudad","Donde la tierra se encuentra con el mar","Una montaña muy alta"], c:1, pista:"Es la orilla del mar."},
    {q:"¿Para qué sirve un puerto?", op:["Para que lleguen y salgan barcos","Para sembrar papa","Para esquiar"], c:0, pista:"Piensa en los barcos."},
    {q:"¿Qué trabajo es típico de la costa?", op:["La minería en montañas","La pesca","Cuidar ovejas en el páramo"], c:1, pista:"Se hace con botes y redes."},
    {q:"¿Qué es un manglar?", op:["Un bosque en la orilla del mar","Un desierto","Un volcán"], c:0, pista:"Tiene árboles con raíces largas junto al agua."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada palabra con lo que significa.",
    pares:[["Puerto","Donde llegan los barcos"],["Pesca","Atrapar peces para comer o vender"],["Manglar","Bosque en la orilla del mar"],["Playa","Orilla de arena junto al mar"]]}
},
{
  id:"u1t3", unidad:1, titulo:"¡Océanos en Peligro!", emoji:"⚠️",
  objetivo:"Reconocer problemas que afectan a los océanos y proponer acciones para cuidarlos.",
  dba:"DBA: Reconozco la importancia de cuidar los recursos naturales y propongo acciones para protegerlos.",
  vocab:[
    {p:"Contaminación", d:"Cuando ensuciamos el agua, el aire o la tierra con basura o sustancias dañinas."},
    {p:"Plástico", d:"Un material que tarda muchísimos años en desaparecer y daña a los animales del mar."},
    {p:"Reciclar", d:"Volver a usar los materiales para no botar tanta basura."}
  ],
  
  manualidad: {"titulo":"El Filtro de Agua Mágico","materiales":["Un embudo o botella cortada","Algodón","Arena","Agua con un poco de tierra"],"pasos":["Pon el algodón en el fondo del embudo y luego la arena encima.","Echa el agua sucia poco a poco sobre la arena.","¡Observa cómo el agua sale mucho más limpia por debajo!"]},video: { id: "yOGqpFOO2Dk", titulo: "Contaminación del Agua - Happy Learning" },
  enlaces: [
    { url: "https://spaceplace.nasa.gov/ocean-currents/sp/", texto: "Las corrientes oceánicas y cómo cuidarlas (NASA)" }
  ],
  tarjetas:[
    {e:"🛍️", t:"El problema del plástico", x:"Mucha basura llega al mar, sobre todo plástico. Las tortugas confunden las bolsas con comida y se enferman."},
    {e:"🛢️", t:"Agua sucia", x:"Cuando cae aceite o basura al mar, el agua se contamina y los peces y las aves pueden morir."},
    {e:"🎣", t:"Demasiada pesca", x:"Si pescamos MUCHÍSIMOS peces, no alcanzan a nacer más. Por eso hay que pescar con cuidado."},
    {e:"💪", t:"¡Yo puedo ayudar!", x:"Puedo botar la basura en su lugar, usar menos plástico, reciclar y no dejar residuos en la playa."}
  ],
  sabias:"Una botella de plástico puede tardar más de 400 años en desaparecer. ¡Más que la vida de tu bisabuela y tu tataranieta juntas!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué material contamina mucho el mar?", op:["El plástico","El agua de lluvia","La arena"], c:0, pista:"Las bolsas y botellas."},
    {q:"¿Por qué es malo pescar demasiados peces?", op:["Porque pesan mucho","Porque no alcanzan a nacer más","Porque son bonitos"], c:1, pista:"Piensa en el futuro."},
    {q:"¿Qué puede pasarle a una tortuga con una bolsa plástica?", op:["Nada","La confunde con comida y se enferma","La usa de sombrero"], c:1, pista:"Cree que es comida."},
    {q:"¿Qué acción ayuda al océano?", op:["Botar basura en la playa","Reciclar y no ensuciar","Usar más plástico"], c:1, pista:"La opción que cuida."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"Reciclar ayuda a producir menos basura.", v:true, exp:"¡Sí! Reciclar cuida el planeta."},
    {af:"El plástico desaparece en un día.", v:false, exp:"No: puede tardar cientos de años."},
    {af:"Dejar basura en la playa está bien.", v:false, exp:"No: la basura llega al mar y daña a los animales."},
    {af:"Usar menos plástico protege a los animales del mar.", v:true, exp:"¡Correcto! Menos plástico, mar más sano."}
  ]}
},
{
  id:"u1t4", unidad:1, titulo:"Vivir Cerca o Lejos del Mar", emoji:"⛰️",
  objetivo:"Comparar ventajas y desventajas de vivir en la costa y lejos del mar.",
  dba:"DBA: Comparo las características de distintos lugares donde viven las personas y las actividades que allí realizan.",
  vocab:[
    {p:"Ventaja", d:"Algo bueno o útil de una situación."},
    {p:"Desventaja", d:"Algo difícil o no tan bueno de una situación."},
    {p:"Interior", d:"La parte de un país que está lejos del mar."}
  ],
  
  manualidad: {"titulo":"Pirámide de los Pisos Térmicos","materiales":["Cartón o cartulina","Tijeras","Colores o marcadores"],"pasos":["Recorta un triángulo grande de cartón para simular una montaña.","Dibuja 4 líneas horizontales para dividirla en pisos térmicos.","Dibuja en la parte de abajo cosas de calor (playa, vacas) y en la punta hielo o nieve."]},video: { id: "Q5pph-St3us", titulo: "Los Pisos Térmicos de Colombia" },
  enlaces: [
    { url: "https://enciclopedia.banrepcultural.org/index.php/Clima_de_Colombia", texto: "Aprende más sobre el clima de Colombia (Banrepcultural)" }
  ],
  tarjetas:[
    {e:"🌴", t:"Vivir en la costa", x:"Cerca del mar hace calor casi siempre, hay playas, pesca fresca y turismo. Pero a veces hay tormentas fuertes."},
    {e:"🏔️", t:"Vivir en el interior", x:"Lejos del mar, como en Bogotá, el clima puede ser más frío. Hay montañas, cultivos y ciudades grandes."},
    {e:"🍽️", t:"La comida cambia", x:"En la costa se come mucho pescado y coco. En el interior se comen más papa, maíz y frutas de clima frío."},
    {e:"⚖️", t:"Todo tiene su lado", x:"Ningún lugar es perfecto: cada uno tiene ventajas (cosas buenas) y desventajas (cosas difíciles)."}
  ],
  sabias:"En la costa colombiana usan ropa fresca todo el año, mientras que en Bogotá muchas veces necesitan chaqueta ¡aunque sea el mismo país!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"Una ventaja de vivir en la costa es...", op:["El clima frío","Tener playa y pescado fresco","Estar lejos del agua"], c:1, pista:"Piensa en el mar."},
    {q:"En el interior del país el clima suele ser...", op:["Más frío","Siempre caluroso","Sin cambios"], c:0, pista:"Como en Bogotá."},
    {q:"¿Qué es una desventaja?", op:["Algo bueno","Algo difícil o no tan bueno","Un tipo de pez"], c:1, pista:"Lo contrario de ventaja."},
    {q:"En la costa se come mucho...", op:["Pescado y coco","Solo papa","Nieve"], c:0, pista:"Viene del mar y de palmeras."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada lugar con algo típico de allí.",
    pares:[["Costa","Playas y pesca"],["Interior","Clima más frío"],["Costa","Mucho calor todo el año"],["Interior","Montañas y cultivos"]]}
},
/* ============ UNIDAD 2 ============ */
{
  id:"u2t1", unidad:2, titulo:"¡Un Tesoro Natural!", emoji:"💎",
  objetivo:"Identificar los recursos naturales y diferenciar los renovables de los no renovables.",
  dba:"DBA: Reconozco los recursos naturales de mi entorno y la importancia de usarlos de forma responsable.",
  vocab:[
    {p:"Recurso natural", d:"Algo que nos da la naturaleza y que usamos para vivir."},
    {p:"Renovable", d:"Recurso que se puede volver a tener, como el agua o los árboles, si lo cuidamos."},
    {p:"No renovable", d:"Recurso que se acaba y no vuelve, como el petróleo o el oro."}
  ],
  
  manualidad: {"titulo":"Caja de Tesoros Naturales","materiales":["Caja pequeña","Hojas secas","Piedras","Palitos"],"pasos":["Sal al parque o jardín y recolecta 5 elementos de la naturaleza.","Guárdalos en tu caja y clasifícalos: ¿Cuáles vienen de plantas? ¿Cuáles son minerales?","Decora la caja y ponle el nombre 'Mis Recursos Naturales'."]},tarjetas:[
    {e:"🌳", t:"Regalos de la naturaleza", x:"Los recursos naturales son cosas que la naturaleza nos da: agua, aire, suelo, plantas, animales y minerales."},
    {e:"♻️", t:"Recursos renovables", x:"Algunos recursos se renuevan: el agua, el viento, el sol y los bosques. Si los cuidamos, no se acaban."},
    {e:"⛏️", t:"Recursos no renovables", x:"Otros se acaban y no vuelven, como el petróleo, el oro o el carbón. Por eso hay que usarlos con cuidado."},
    {e:"🇨🇴", t:"Colombia, país rico", x:"Colombia tiene muchos recursos: café, esmeraldas, petróleo, ríos, oro y bosques llenos de vida."}
  ],
  sabias:"¡Colombia es famosa por sus esmeraldas, unas piedras verdes brillantes de las más bonitas del mundo!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es un recurso natural?", op:["Algo que hacen las fábricas","Algo que nos da la naturaleza","Un juguete"], c:1, pista:"Viene de la naturaleza."},
    {q:"¿Cuál es un recurso RENOVABLE?", op:["El petróleo","El oro","El agua"], c:2, pista:"Se puede volver a tener si lo cuidamos."},
    {q:"¿Cuál es un recurso NO renovable?", op:["El viento","El petróleo","El sol"], c:1, pista:"Se acaba y no vuelve."},
    {q:"Una piedra verde famosa de Colombia es...", op:["La esmeralda","El diamante","El rubí"], c:0, pista:"Es de color verde."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"El agua es un recurso renovable si la cuidamos.", v:true, exp:"¡Sí! Por eso no debemos desperdiciarla."},
    {af:"El petróleo se renueva rápido.", v:false, exp:"No: el petróleo es no renovable, se acaba."},
    {af:"Los árboles son un recurso natural.", v:true, exp:"¡Correcto! Nos dan madera, fruta y aire limpio."},
    {af:"Los recursos no se acaban nunca.", v:false, exp:"No: algunos se acaban, por eso hay que cuidarlos."}
  ]}
},
{
  id:"u2t2", unidad:2, titulo:"Las Actividades Económicas", emoji:"🚜",
  objetivo:"Reconocer las actividades económicas de una región y para qué sirven.",
  dba:"DBA: Identifico las actividades económicas de mi entorno y cómo satisfacen las necesidades de las personas.",
  vocab:[
    {p:"Actividad económica", d:"El trabajo que hacen las personas para ganar dinero y conseguir lo que necesitan."},
    {p:"Agricultura", d:"Sembrar y cosechar alimentos de la tierra."},
    {p:"Comercio", d:"Comprar y vender productos."}
  ],
  
  manualidad: {"titulo":"Juego de Roles: El Mercado","materiales":["Juguetes o alimentos de la cocina","Papelitos (para dinero)"],"pasos":["Arma una pequeña tienda en tu cuarto con los objetos.","Juega con alguien de tu familia: uno será el vendedor (sector terciario) y otro el comprador.","Usa los papelitos como dinero para comprar."]},tarjetas:[
    {e:"🌾", t:"Sacar de la naturaleza", x:"Algunos trabajos toman cosas de la naturaleza: la agricultura (cultivar), la ganadería (criar animales), la pesca y la minería."},
    {e:"🏭", t:"Fabricar cosas", x:"En las fábricas se transforman las cosas: con la leche hacen queso, con el algodón hacen ropa. Eso es la industria."},
    {e:"🏪", t:"Dar servicios", x:"Otros trabajos ayudan a las personas: los médicos, los profesores, los tenderos y los conductores. Son los servicios y el comercio."},
    {e:"🤝", t:"Todos nos necesitamos", x:"El campesino cultiva, la fábrica prepara y la tienda vende. ¡Muchos trabajos se unen para que tengamos lo que necesitamos!"}
  ],
  sabias:"El café que toman en muchos países del mundo muchas veces viene de las montañas de Colombia, cultivado por familias campesinas.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es la agricultura?", op:["Vender ropa","Sembrar y cosechar alimentos","Manejar un bus"], c:1, pista:"Se hace en la tierra."},
    {q:"En una fábrica principalmente se...", op:["Transforman o fabrican cosas","Siembran papas","Curan enfermos"], c:0, pista:"Con leche hacen queso."},
    {q:"Un médico o un profesor dan un...", op:["Producto de la tierra","Servicio a las personas","Mineral"], c:1, pista:"Ayudan a la gente."},
    {q:"El comercio es...", op:["Comprar y vender","Criar vacas","Pintar casas"], c:0, pista:"Pasa en las tiendas."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada trabajo con lo que hace.",
    pares:[["Agricultor","Cultiva alimentos"],["Ganadero","Cría animales"],["Comerciante","Vende productos"],["Médico","Cuida la salud"]]}
},
{
  id:"u2t3", unidad:2, titulo:"Organizarnos para Trabajar", emoji:"🧰",
  objetivo:"Comprender cómo las personas se organizan y usan herramientas para aprovechar los recursos.",
  dba:"DBA: Explico cómo las personas se organizan y colaboran para realizar actividades productivas.",
  vocab:[
    {p:"Herramienta", d:"Un objeto que nos ayuda a hacer un trabajo, como un martillo o una pala."},
    {p:"Cooperar", d:"Trabajar juntos para lograr algo."},
    {p:"Oficio", d:"El trabajo que una persona sabe hacer."}
  ],
  
  manualidad: {"titulo":"El Sombrero del Trabajador","materiales":["Papel periódico o cartulina","Cinta","Marcadores"],"pasos":["Arma un gorro de papel (como un barco de papel grande).","Escribe en el frente el nombre de la profesión que te gustaría tener de grande.","Póntelo y actúa como si estuvieras haciendo ese trabajo."]},tarjetas:[
    {e:"🔨", t:"Herramientas que ayudan", x:"Para trabajar mejor usamos herramientas: la pala para cavar, la red para pescar, el tractor para el campo."},
    {e:"👨‍👩‍👧‍👦", t:"Trabajar en equipo", x:"Muchos trabajos se hacen entre varios. Cuando cooperamos, todo sale más rápido y mejor."},
    {e:"📋", t:"Organizarse", x:"Las personas se reparten las tareas: uno siembra, otro riega, otro vende. Así aprovechan bien los recursos."},
    {e:"🌎", t:"Cuidar mientras usamos", x:"Al usar los recursos hay que cuidarlos, para que también los tengan los niños del futuro."}
  ],
  sabias:"Antes, los campesinos se reunían en 'mingas': todos ayudaban a un vecino y luego ese vecino les ayudaba a ellos. ¡Cooperación pura!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Para qué sirve una herramienta?", op:["Para ayudarnos a trabajar","Para adornar","Para comer"], c:0, pista:"Como una pala o un martillo."},
    {q:"Cooperar significa...", op:["Trabajar solo","Trabajar juntos","No hacer nada"], c:1, pista:"Es en equipo."},
    {q:"¿Qué pasa cuando nos organizamos bien?", op:["El trabajo sale mejor","Todo se daña","Nadie hace nada"], c:0, pista:"Cada uno tiene su tarea."},
    {q:"Una herramienta del campo es...", op:["El tractor","El televisor","El celular"], c:0, pista:"Ayuda a arar la tierra."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"Cooperar es trabajar juntos.", v:true, exp:"¡Sí! En equipo se logra más."},
    {af:"Las herramientas hacen el trabajo más difícil.", v:false, exp:"No: lo hacen más fácil."},
    {af:"Organizarse ayuda a aprovechar bien los recursos.", v:true, exp:"¡Correcto! Cada uno cumple una tarea."},
    {af:"No importa cuidar los recursos mientras trabajamos.", v:false, exp:"No: hay que cuidarlos para el futuro."}
  ]}
},
{
  id:"u2t4", unidad:2, titulo:"El Clima y la Comida", emoji:"🌦️",
  objetivo:"Relacionar el clima de una región con los alimentos que allí se producen y se comen.",
  dba:"DBA: Relaciono el clima de mi región con las actividades económicas y la alimentación de las personas.",
  vocab:[
    {p:"Clima", d:"Cómo es el tiempo en un lugar durante el año: caliente, frío o templado."},
    {p:"Piso térmico", d:"El clima según la altura: hace más frío en las montañas altas y más calor abajo."},
    {p:"Cosecha", d:"Recoger los alimentos que se sembraron."}
  ],
  
  manualidad: {"titulo":"Menú del Clima","materiales":["Una hoja de papel","Colores"],"pasos":["Dobla la hoja por la mitad.","De un lado dibuja una comida perfecta para un día de mucho frío (ej. sopa caliente).","Del otro lado dibuja una comida para un día de mucho calor (ej. helado o ensalada)."]},tarjetas:[
    {e:"🌡️", t:"Climas diferentes", x:"En Colombia hay clima caliente, templado y frío. Depende de qué tan alto esté el lugar en las montañas."},
    {e:"🍌", t:"Clima caliente", x:"En tierra caliente crecen banano, coco, mango, cacao y arroz. ¡Frutas ricas y dulces!"},
    {e:"🥔", t:"Clima frío", x:"En tierra fría, en las montañas altas, crecen la papa, el trigo y las fresas."},
    {e:"🍲", t:"La comida cambia", x:"Por eso la comida de cada región es distinta: cada clima da alimentos diferentes."}
  ],
  sabias:"En un solo día podrías comer fruta de tierra caliente y papa de tierra fría, ¡porque Colombia tiene muchos climas a la vez!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es el clima?", op:["Cómo es el tiempo en un lugar","Un tipo de comida","Un animal"], c:0, pista:"Caliente, frío o templado."},
    {q:"En clima caliente crece...", op:["La papa","El banano","El trigo"], c:1, pista:"Es una fruta amarilla."},
    {q:"La papa crece mejor en clima...", op:["Caliente","Frío","Sin importar"], c:1, pista:"En las montañas altas."},
    {q:"¿Por qué la comida cambia entre regiones?", op:["Porque el clima da alimentos distintos","Porque a la gente le da pereza","Porque sí"], c:0, pista:"Cada clima da cosas distintas."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada clima con un alimento que produce.",
    pares:[["Clima caliente","Banano"],["Clima frío","Papa"],["Clima caliente","Coco"],["Clima frío","Fresa"]]}
},
/* ============ UNIDAD 3 ============ */
{
  id:"u3t1", unidad:3, titulo:"¡Nada es Igual para Siempre!", emoji:"🔄",
  objetivo:"Reconocer que los paisajes y territorios cambian con el tiempo, por causas naturales o por las personas.",
  dba:"DBA: Identifico cambios en el paisaje de mi entorno a lo largo del tiempo y sus posibles causas.",
  vocab:[
    {p:"Cambio", d:"Cuando algo se vuelve diferente a como era antes."},
    {p:"Paisaje", d:"Todo lo que vemos en un lugar: montañas, ríos, casas, árboles."},
    {p:"Natural", d:"Que lo hace la naturaleza, sin las personas."}
  ],
  
  manualidad: {"titulo":"Álbum del Antes y Después","materiales":["Fotos viejas de tu familia o ciudad","Papel","Pegante"],"pasos":["Elige una foto de cómo eras de bebé y otra de cómo eres ahora.","Pégalas en el papel y escribe 3 cosas que han cambiado.","Pregúntale a un adulto cómo era la ciudad antes y escríbelo."]},tarjetas:[
    {e:"⏰", t:"Todo cambia", x:"Los lugares no son siempre iguales. Un potrero puede volverse un barrio, y un río puede cambiar de camino."},
    {e:"🌋", t:"Cambios naturales", x:"La naturaleza cambia el paisaje: la lluvia, los ríos, los volcanes y el viento moldean la tierra poco a poco."},
    {e:"👷", t:"Cambios hechos por personas", x:"Las personas también cambiamos el territorio: construimos casas, carreteras, puentes y ciudades."},
    {e:"📷", t:"Comparar antes y ahora", x:"Con fotos viejas podemos ver cómo era un lugar antes y compararlo con cómo es hoy."}
  ],
  sabias:"Hace mucho tiempo, donde hoy hay ciudades enormes, solo había bosques y animales salvajes.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es un cambio?", op:["Cuando algo se vuelve diferente","Cuando algo se queda igual","Un color"], c:0, pista:"Diferente a antes."},
    {q:"Un cambio NATURAL es...", op:["Construir un puente","Un río que cambia de camino","Hacer una casa"], c:1, pista:"Lo hace la naturaleza."},
    {q:"Un cambio hecho por personas es...", op:["Construir una carretera","Una tormenta","Un volcán"], c:0, pista:"Lo hacen los humanos."},
    {q:"¿Cómo vemos cómo era un lugar antes?", op:["Con fotos antiguas","Cerrando los ojos","No se puede"], c:0, pista:"Imágenes del pasado."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"Los paisajes cambian con el tiempo.", v:true, exp:"¡Sí! Nada queda igual para siempre."},
    {af:"Un volcán es un cambio hecho por las personas.", v:false, exp:"No: es un cambio natural."},
    {af:"Construir una ciudad cambia el territorio.", v:true, exp:"¡Correcto! Es un cambio hecho por personas."},
    {af:"Las fotos antiguas ayudan a comparar antes y ahora.", v:true, exp:"¡Sí! Muestran cómo era el lugar."}
  ]}
},
{
  id:"u3t2", unidad:3, titulo:"Construyendo el Progreso", emoji:"🏗️",
  objetivo:"Comprender cómo las construcciones y obras transforman el territorio y mejoran la vida.",
  dba:"DBA: Explico cómo las obras y construcciones modifican el territorio y afectan la vida de las personas.",
  vocab:[
    {p:"Progreso", d:"Avanzar y mejorar la forma de vivir."},
    {p:"Infraestructura", d:"Las obras que sirven a todos: vías, puentes, acueductos, colegios."},
    {p:"Vía", d:"Un camino o carretera por donde se transita."}
  ],
  
  manualidad: {"titulo":"Construyendo mi Ciudad","materiales":["Cajas de medicinas vacías","Rollos de papel higiénico","Pegante"],"pasos":["Usa las cajas como edificios y los rollos como fábricas o torres.","Pega todo sobre un cartón formando una mini-ciudad.","Dibuja carreteras conectando tus edificios."]},tarjetas:[
    {e:"🛣️", t:"Caminos que conectan", x:"Las carreteras y puentes unen a los pueblos. Así podemos viajar y llevar productos de un lugar a otro."},
    {e:"🏫", t:"Obras para todos", x:"Los colegios, hospitales, parques y acueductos ayudan a que la comunidad viva mejor."},
    {e:"🏢", t:"Las ciudades crecen", x:"Cuando llega más gente, se construyen más casas y edificios. La ciudad crece y cambia."},
    {e:"⚖️", t:"Con cuidado", x:"El progreso es bueno, pero hay que construir cuidando la naturaleza y los ríos."}
  ],
  sabias:"Un puente puede ahorrarle a una familia horas de camino: lo que antes tomaba todo el día, ahora se hace en minutos.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es el progreso?", op:["Quedarse igual","Avanzar y mejorar la vida","Destruir todo"], c:1, pista:"Es mejorar."},
    {q:"¿Para qué sirven las carreteras?", op:["Para conectar y transportar","Para nadar","Para sembrar"], c:0, pista:"Unen pueblos."},
    {q:"Un ejemplo de obra para todos es...", op:["Un hospital","Un juguete","Un helado"], c:0, pista:"Sirve a la comunidad."},
    {q:"Al construir debemos...", op:["Cuidar la naturaleza","Botar basura al río","Cortar todos los árboles"], c:0, pista:"El progreso responsable."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada obra con lo que sirve.",
    pares:[["Carretera","Conectar pueblos"],["Hospital","Cuidar la salud"],["Colegio","Aprender"],["Acueducto","Llevar agua a las casas"]]}
},
{
  id:"u3t3", unidad:3, titulo:"¿Somos Más o Menos?", emoji:"👨‍👩‍👧‍👦",
  objetivo:"Reconocer que la población cambia y se mueve entre el campo y la ciudad.",
  dba:"DBA: Identifico cómo cambia la población de mi entorno y los movimientos entre el campo y la ciudad.",
  vocab:[
    {p:"Población", d:"Todas las personas que viven en un lugar."},
    {p:"Migrar", d:"Cambiarse a vivir de un lugar a otro."},
    {p:"Ciudad", d:"Un lugar grande con muchas personas, casas y edificios."}
  ],
  
  manualidad: {"titulo":"Censo Familiar","materiales":["Hoja de papel","Lápiz"],"pasos":["Escribe el nombre de todas las personas que viven en tu casa.","Cuenta cuántos hombres y cuántas mujeres hay.","Haz un dibujo de tu familia y escribe el número total grande al lado."]},tarjetas:[
    {e:"📈", t:"La población cambia", x:"En un lugar pueden vivir cada vez más personas, o a veces menos. La población no es siempre igual."},
    {e:"🚚", t:"Del campo a la ciudad", x:"Muchas familias se van del campo a la ciudad buscando trabajo, estudio o mejores oportunidades."},
    {e:"🏙️", t:"Ciudades que crecen", x:"Por eso las ciudades crecen mucho: llega gente de muchos lugares a vivir en ellas."},
    {e:"🌾", t:"El campo importa", x:"Aunque muchos se van, el campo es muy importante: allí se produce gran parte de nuestra comida."}
  ],
  sabias:"En Colombia, hace 100 años casi todos vivían en el campo. Hoy, la mayoría de las personas vive en ciudades.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es la población?", op:["Las personas que viven en un lugar","Los árboles","Las casas vacías"], c:0, pista:"Son las personas."},
    {q:"Migrar significa...", op:["Quedarse quieto","Cambiarse a vivir a otro lugar","Dormir"], c:1, pista:"Es mudarse."},
    {q:"Muchas familias van del campo a la ciudad buscando...", op:["Trabajo y estudio","Menos comida","Aburrirse"], c:0, pista:"Oportunidades."},
    {q:"¿Por qué es importante el campo?", op:["Allí se produce la comida","No sirve para nada","Solo hay piedras"], c:0, pista:"Los alimentos."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"La población de un lugar puede cambiar.", v:true, exp:"¡Sí! Puede haber más o menos personas."},
    {af:"Migrar es quedarse siempre en el mismo lugar.", v:false, exp:"No: migrar es mudarse a otro lugar."},
    {af:"Las ciudades crecen cuando llega gente a vivir.", v:true, exp:"¡Correcto!"},
    {af:"El campo no sirve para nada.", v:false, exp:"No: en el campo se produce mucha de nuestra comida."}
  ]}
},
{
  id:"u3t4", unidad:3, titulo:"Problemas Sociales y Naturaleza", emoji:"🌳",
  objetivo:"Reconocer problemas que causa el crecimiento sin cuidado y proponer soluciones.",
  dba:"DBA: Reconozco problemas ambientales y sociales de mi entorno y propongo alternativas de solución.",
  vocab:[
    {p:"Deforestación", d:"Cortar muchos árboles de un bosque."},
    {p:"Solución", d:"Una idea o acción para arreglar un problema."},
    {p:"Comunidad", d:"Un grupo de personas que viven juntas y se ayudan."}
  ],
  
  manualidad: {"titulo":"Basurero Clasificador","materiales":["3 cajas o bolsas pequeñas","Papelitos pintados (verde, negro, blanco)"],"pasos":["Marca las 3 bolsas con los colores de reciclaje: Verde (orgánico), Negro (no aprovechable), Blanco (reciclable).","Busca 3 basuras pequeñas en tu casa (limpias) y mételas en la bolsa correcta.","¡Felicidades! Eres un guardián del medio ambiente."]},tarjetas:[
    {e:"🪓", t:"Cuando se cortan los bosques", x:"Si cortamos demasiados árboles, los animales pierden su casa y el aire se vuelve menos limpio."},
    {e:"🏭", t:"Contaminación", x:"El humo de fábricas y carros, y la basura en los ríos, ensucian el aire y el agua de todos."},
    {e:"🤝", t:"Problemas de la gente", x:"A veces, al crecer una ciudad, falta trabajo o vivienda para todos. Son problemas sociales que hay que resolver juntos."},
    {e:"💡", t:"¡Buscar soluciones!", x:"Podemos sembrar árboles, reciclar, cuidar el agua y ayudarnos entre vecinos. ¡Los problemas tienen solución!"}
  ],
  sabias:"Sembrar un árbol es como poner un aire acondicionado natural: da sombra, aire fresco y casa para los pájaros.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es la deforestación?", op:["Sembrar flores","Cortar muchos árboles","Regar plantas"], c:1, pista:"Tiene que ver con bosques."},
    {q:"¿Qué pasa si cortamos demasiados árboles?", op:["Los animales pierden su casa","Nada","Llueve chocolate"], c:0, pista:"Piensa en los animales."},
    {q:"Una solución para cuidar el planeta es...", op:["Sembrar árboles","Botar basura al río","Cortar bosques"], c:0, pista:"La opción buena."},
    {q:"Los problemas sociales se resuelven mejor...", op:["Solos y sin ayuda","Trabajando juntos","Ignorándolos"], c:1, pista:"En comunidad."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada problema con una solución.",
    pares:[["Deforestación","Sembrar árboles"],["Basura en el río","Reciclar y no ensuciar"],["Aire contaminado","Usar más la bici"],["Falta de unión","Ayudarse entre vecinos"]]}
},
/* ============ UNIDAD 4 ============ */
{
  id:"u4t1", unidad:4, titulo:"Huellas del Pasado", emoji:"🏺",
  objetivo:"Reconocer el patrimonio y cómo conocemos la historia de nuestro territorio.",
  dba:"DBA: Reconozco huellas del pasado en mi entorno y su valor como patrimonio.",
  vocab:[
    {p:"Patrimonio", d:"Cosas valiosas del pasado que cuidamos para el futuro."},
    {p:"Historia", d:"Todo lo que pasó antes y podemos conocer."},
    {p:"Museo", d:"Un lugar donde se guardan y muestran objetos antiguos y valiosos."}
  ],
  
  manualidad: {"titulo":"Arte Rupestre en Casa","materiales":["Café instantáneo o tierra","Agua","Una hoja de papel","Algodón o tus dedos"],"pasos":["Mezcla un poquito de café con agua para hacer 'pintura' café.","Moja tus dedos en la pintura y dibuja animales o manos en el papel.","Déjalo secar, ¡parecerá una pintura de las cavernas!"]},tarjetas:[
    {e:"🏛️", t:"El pasado deja huellas", x:"El pasado deja pistas: casas antiguas, monumentos, herramientas viejas y cuentos de los abuelos."},
    {e:"🖼️", t:"El patrimonio", x:"El patrimonio son los tesoros del pasado que cuidamos: iglesias antiguas, plazas, música y hasta comidas tradicionales."},
    {e:"🔍", t:"¿Cómo conocemos la historia?", x:"Conocemos el pasado con fotos, objetos en museos, documentos viejos y las historias que nos cuentan los mayores."},
    {e:"🇨🇴", t:"Tesoros de Colombia", x:"Colombia tiene tesoros como la Ciudad Perdida, San Agustín y los pueblos coloniales llenos de historia."}
  ],
  sabias:"El oro de los pueblos indígenas se guarda en el Museo del Oro de Bogotá, ¡uno de los más famosos del mundo!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es el patrimonio?", op:["Tesoros del pasado que cuidamos","Basura vieja","Un juguete nuevo"], c:0, pista:"Cosas valiosas del pasado."},
    {q:"¿Dónde se guardan objetos antiguos?", op:["En un museo","En la basura","En la nevera"], c:0, pista:"Un lugar para exhibir historia."},
    {q:"¿Cómo conocemos el pasado?", op:["Con fotos y objetos viejos","Adivinando","No se puede"], c:0, pista:"Pistas que quedaron."},
    {q:"Un tesoro histórico de Colombia es...", op:["El Museo del Oro","Un centro comercial nuevo","Una fábrica"], c:0, pista:"Guarda oro antiguo."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"El patrimonio son tesoros del pasado que debemos cuidar.", v:true, exp:"¡Sí! Los cuidamos para el futuro."},
    {af:"En un museo se guardan objetos valiosos.", v:true, exp:"¡Correcto!"},
    {af:"Los abuelos no saben nada del pasado.", v:false, exp:"No: ellos nos cuentan muchas historias del pasado."},
    {af:"No podemos conocer cómo vivían antes.", v:false, exp:"Sí podemos: con fotos, museos y relatos."}
  ]}
},
{
  id:"u4t2", unidad:4, titulo:"Costumbres y Tradiciones", emoji:"💃",
  objetivo:"Identificar costumbres y tradiciones de las familias y regiones de Colombia.",
  dba:"DBA: Reconozco costumbres y tradiciones de mi comunidad y las comparo con las de otras regiones.",
  vocab:[
    {p:"Costumbre", d:"Algo que hacemos muy seguido, casi siempre igual."},
    {p:"Tradición", d:"Una costumbre que pasa de los abuelos a los papás y a los hijos."},
    {p:"Región", d:"Una parte de un país con características parecidas."}
  ],
  
  manualidad: {"titulo":"El Baúl de las Tradiciones","materiales":["Caja pequeña","Objetos simbólicos de tu familia"],"pasos":["Pregúntale a tus papás por un objeto antiguo que sea importante para la familia.","Guárdalo en la caja junto con un dibujo tuyo sobre una costumbre que tengan (como la cena de Navidad o un paseo).","Escribe por qué es importante no olvidar esas costumbres."]},tarjetas:[
    {e:"🏠", t:"Costumbres de familia", x:"Cada familia tiene sus costumbres: reunirse los domingos, cantar en los cumpleaños o hacer un plato especial."},
    {e:"👵", t:"Se pasan de generación", x:"Las tradiciones se heredan: los abuelos las enseñan a los papás y ellos a los hijos."},
    {e:"🪗", t:"Cada región es distinta", x:"En cada región hay bailes, músicas y trajes diferentes: la cumbia en la costa, el bambuco en el interior, el joropo en los llanos."},
    {e:"❤️", t:"Nos dan identidad", x:"Las tradiciones nos hacen sentir parte de una familia y de un país. ¡Nos hacen únicos!"}
  ],
  sabias:"La cumbia se baila moviendo velas encendidas en la mano. ¡Es un baile tradicional de la costa colombiana!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es una tradición?", op:["Una costumbre que pasa de generación en generación","Un carro nuevo","Un examen"], c:0, pista:"La heredamos de los abuelos."},
    {q:"Un baile de la costa colombiana es...", op:["La cumbia","El ballet ruso","El tango"], c:0, pista:"Se baila con velas."},
    {q:"Las costumbres son cosas que hacemos...", op:["Una sola vez","Muy seguido, casi igual","Nunca"], c:1, pista:"Repetidamente."},
    {q:"El joropo es típico de...", op:["Los Llanos","El desierto","La Antártida"], c:0, pista:"Región de sabanas y ganado."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada región con su baile o música.",
    pares:[["Costa Caribe","Cumbia"],["Los Llanos","Joropo"],["Región Andina","Bambuco"],["Pacífico","Currulao"]]}
},
{
  id:"u4t3", unidad:4, titulo:"¡Fiesta en Colombia!", emoji:"🎊",
  objetivo:"Conocer fiestas y festivales tradicionales de distintas regiones de Colombia.",
  dba:"DBA: Identifico celebraciones y festividades de mi región y de Colombia y su significado.",
  vocab:[
    {p:"Festival", d:"Una gran fiesta donde se celebra con música, baile y comida."},
    {p:"Carnaval", d:"Una fiesta con disfraces, comparsas, música y desfiles."},
    {p:"Celebrar", d:"Hacer una fiesta por algo especial."}
  ],
  
  manualidad: {"titulo":"Máscara de Carnaval","materiales":["Cartón o cartulina","Tijeras","Lana, colores, escarcha"],"pasos":["Dibuja el contorno de una máscara o antifaz en el cartón y recórtalo (pide ayuda para los ojos).","Decora la máscara con muchos colores, simulando el Carnaval de Barranquilla o Blancos y Negros.","¡Póntela y baila una cumbia!"]},tarjetas:[
    {e:"🎭", t:"Carnaval de Barranquilla", x:"En la costa se celebra el Carnaval de Barranquilla, con disfraces, bailes y desfiles. ¡Es enorme y muy alegre!"},
    {e:"🌸", t:"Feria de las Flores", x:"En Medellín se hace la Feria de las Flores, donde los campesinos cargan hermosos arreglos llamados silletas."},
    {e:"🎨", t:"Carnaval de Negros y Blancos", x:"En Pasto se pintan de negro y blanco para celebrar la amistad entre todas las personas."},
    {e:"🎶", t:"Fiestas para todos", x:"Cada región tiene sus fiestas. En ellas compartimos música, comida y alegría con la familia y los vecinos."}
  ],
  sabias:"El Carnaval de Barranquilla es tan importante que fue declarado tesoro cultural de la humanidad.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"El Carnaval de Barranquilla se celebra en...", op:["La costa Caribe","La Antártida","El desierto"], c:0, pista:"Ciudad junto al mar."},
    {q:"En la Feria de las Flores de Medellín se cargan...", op:["Silletas de flores","Bolsas de basura","Piedras"], c:0, pista:"Arreglos de flores."},
    {q:"En el Carnaval de Negros y Blancos las personas se...", op:["Pintan de negro y blanco","Ponen guantes","Disfrazan de peces"], c:0, pista:"Dos colores en la cara."},
    {q:"¿Qué es un festival?", op:["Una gran fiesta","Un examen","Una tarea"], c:0, pista:"Con música y baile."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"El Carnaval de Barranquilla tiene disfraces y desfiles.", v:true, exp:"¡Sí! Es muy alegre y colorido."},
    {af:"La Feria de las Flores es en la costa Caribe.", v:false, exp:"No: es en Medellín, región andina."},
    {af:"En las fiestas compartimos música y comida.", v:true, exp:"¡Correcto! Se celebra en comunidad."},
    {af:"El Carnaval de Negros y Blancos se celebra en Pasto.", v:true, exp:"¡Así es! En el sur del país."}
  ]}
},
{
  id:"u4t4", unidad:4, titulo:"Un Festín de Sabores", emoji:"🍲",
  objetivo:"Reconocer platos típicos de las regiones de Colombia como parte de la cultura.",
  dba:"DBA: Identifico la gastronomía de mi región como parte del patrimonio cultural.",
  vocab:[
    {p:"Gastronomía", d:"La comida típica de un lugar y su forma de prepararla."},
    {p:"Plato típico", d:"Una comida especial que representa a una región."},
    {p:"Ingrediente", d:"Cada cosa que se usa para preparar una comida."}
  ],
  
  manualidad: {"titulo":"Mini Chef: Plato Típico","materiales":["Plastilina de colores o ingredientes reales (con ayuda de un adulto)"],"pasos":["Elige un plato típico colombiano (Bandeja Paisa, Ajiaco, Arepas).","Modélalo con plastilina en un platico de juguete.","(Opcional) Ayuda a tu familia a preparar arepas de verdad para la cena."]},tarjetas:[
    {e:"🥘", t:"Ajiaco y bandeja paisa", x:"En el interior se come el ajiaco (una sopa con papa y pollo) y la bandeja paisa (con frijol, arroz, carne y arepa)."},
    {e:"🐟", t:"Sabores de la costa", x:"En la costa se disfruta pescado frito, arroz con coco y patacón. ¡Sabores del mar!"},
    {e:"🌽", t:"La arepa, en todas partes", x:"La arepa, hecha de maíz, se come en casi toda Colombia, de muchas formas distintas."},
    {e:"🍫", t:"Regalos de nuestra tierra", x:"Colombia da cacao para el chocolate, café, frutas y muchos alimentos deliciosos."}
  ],
  sabias:"La arepa es tan colombiana que cada región la hace diferente: rellena, con queso, dulce o asada. ¡Hay decenas de arepas!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"El ajiaco es una sopa hecha con...", op:["Papa y pollo","Pescado y coco","Chocolate"], c:0, pista:"Típica de Bogotá."},
    {q:"En la costa se come mucho...", op:["Pescado y arroz con coco","Papa criolla","Trigo"], c:0, pista:"Viene del mar."},
    {q:"La arepa se hace de...", op:["Maíz","Metal","Plástico"], c:0, pista:"Un grano amarillo."},
    {q:"¿Qué es la gastronomía?", op:["La comida típica de un lugar","Un baile","Un río"], c:0, pista:"Tiene que ver con la comida."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada región con un plato típico.",
    pares:[["Bogotá / Andina","Ajiaco"],["Antioquia","Bandeja paisa"],["Costa Caribe","Arroz con coco"],["Todo el país","Arepa"]]}
},
/* ============ UNIDAD 5 ============ */
{
  id:"u5t1", unidad:5, titulo:"El Tiempo en Nuestra Familia", emoji:"👨‍👩‍👧",
  objetivo:"Ubicar hechos en pasado, presente y futuro usando la historia familiar.",
  dba:"DBA: Ordeno hechos de mi vida y de mi familia en pasado, presente y futuro.",
  vocab:[
    {p:"Pasado", d:"Lo que ya ocurrió, antes de ahora."},
    {p:"Presente", d:"Lo que pasa ahora mismo."},
    {p:"Futuro", d:"Lo que va a pasar, todavía no ha ocurrido."}
  ],
  
  manualidad: {"titulo":"Reloj de Rutinas","materiales":["Plato de cartón","Marcador","Gancho mariposa (opcional) o chiche"],"pasos":["Dibuja los números del reloj en el plato.","En lugar de solo horas, dibuja qué haces en ese momento: dormir, desayunar, estudiar, jugar.","Ponle dos flechas de cartón en el centro para marcar tu rutina de hoy."]},tarjetas:[
    {e:"⏮️", t:"El pasado", x:"El pasado es lo que ya pasó: cuando eras bebé, cuando tus papás eran niños, cuando nacieron tus abuelos."},
    {e:"⏺️", t:"El presente", x:"El presente es AHORA: lo que haces hoy, en este momento, como aprender sociales."},
    {e:"⏭️", t:"El futuro", x:"El futuro es lo que va a pasar: tu próximo cumpleaños, cuando seas grande, lo que harás mañana."},
    {e:"👵", t:"Generaciones", x:"En una familia hay generaciones: abuelos, papás e hijos. Cada una vivió en un tiempo diferente."}
  ],
  sabias:"Tus abuelos fueron niños hace mucho tiempo, ¡y no había celulares ni internet! Jugaban en la calle con trompos y canicas.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"El pasado es...", op:["Lo que ya ocurrió","Lo que pasa ahora","Lo que va a pasar"], c:0, pista:"Antes de ahora."},
    {q:"El presente es...", op:["Ayer","Ahora mismo","El próximo año"], c:1, pista:"En este momento."},
    {q:"Tu próximo cumpleaños es parte del...", op:["Pasado","Presente","Futuro"], c:2, pista:"Aún no llega."},
    {q:"En una familia, los más mayores son los...", op:["Abuelos","Bebés","Vecinos"], c:0, pista:"La primera generación."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"Cuando eras bebé es parte del pasado.", v:true, exp:"¡Sí! Ya ocurrió."},
    {af:"El futuro ya ocurrió.", v:false, exp:"No: el futuro todavía no ha llegado."},
    {af:"El presente es lo que pasa ahora.", v:true, exp:"¡Correcto!"},
    {af:"Los abuelos son más jóvenes que los nietos.", v:false, exp:"No: los abuelos son la generación mayor."}
  ]}
},
{
  id:"u5t2", unidad:5, titulo:"¡Manos al Calendario!", emoji:"📅",
  objetivo:"Usar el calendario: días, semanas, meses y año para organizar el tiempo.",
  dba:"DBA: Utilizo unidades de tiempo como día, semana, mes y año para ubicar acontecimientos.",
  vocab:[
    {p:"Calendario", d:"Una tabla que muestra los días, semanas y meses del año."},
    {p:"Semana", d:"Un grupo de 7 días."},
    {p:"Mes", d:"Un pedazo del año; el año tiene 12 meses."}
  ],
  
  manualidad: {"titulo":"Mi Calendario de Fechas Importantes","materiales":["Una hoja grande","Regla","Colores"],"pasos":["Dibuja una cuadrícula de 7 columnas y 5 filas.","Escribe los días de la semana arriba y llena los números del mes actual.","Dibuja una torta en los días de cumpleaños o una estrella en los días divertidos."]},tarjetas:[
    {e:"🗓️", t:"El calendario nos organiza", x:"El calendario nos ayuda a saber qué día es, cuándo hay cumpleaños o cuándo empiezan las vacaciones."},
    {e:"7️⃣", t:"7 días en una semana", x:"La semana tiene 7 días: lunes, martes, miércoles, jueves, viernes, sábado y domingo."},
    {e:"1️⃣2️⃣", t:"12 meses en un año", x:"El año tiene 12 meses, desde enero hasta diciembre. ¡Y 365 días!"},
    {e:"🎂", t:"Fechas especiales", x:"En el calendario marcamos fechas importantes: cumpleaños, fiestas y días de descanso."}
  ],
  sabias:"Cada 4 años, febrero tiene un día extra (29). ¡A ese año se le llama año bisiesto!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Cuántos días tiene una semana?", op:["5","7","10"], c:1, pista:"De lunes a domingo."},
    {q:"¿Cuántos meses tiene un año?", op:["12","7","30"], c:0, pista:"De enero a diciembre."},
    {q:"¿Para qué sirve el calendario?", op:["Para organizar el tiempo","Para cocinar","Para nadar"], c:0, pista:"Nos dice qué día es."},
    {q:"El primer mes del año es...", op:["Enero","Diciembre","Julio"], c:0, pista:"Empieza el año."}
  ]},
  practicar:{tipo:"ordenar", pregunta:"Ordena los días de la semana de lunes a viernes.",
    items:["Lunes","Martes","Miércoles","Jueves","Viernes"]}
},
{
  id:"u5t3", unidad:5, titulo:"El Tiempo que Pasa", emoji:"🕰️",
  objetivo:"Comprender medidas largas de tiempo (años, décadas, siglos) y usar líneas de tiempo.",
  dba:"DBA: Ordeno acontecimientos en una línea de tiempo usando años, décadas y siglos.",
  vocab:[
    {p:"Década", d:"Un grupo de 10 años."},
    {p:"Siglo", d:"Un grupo de 100 años."},
    {p:"Línea de tiempo", d:"Un dibujo que muestra hechos en orden, del más antiguo al más nuevo."}
  ],
  
  manualidad: {"titulo":"Línea de Tiempo de mi Vida","materiales":["Varias hojas de papel pegadas a lo largo","Cinta","Colores"],"pasos":["Dibuja una línea larga que atraviese todo el papel.","Al inicio, dibuja cuando naciste y escribe el año.","En el medio, dibuja tu primer día de colegio. Al final, dibuja cómo eres hoy con tu edad actual."]},tarjetas:[
    {e:"🔟", t:"La década", x:"Una década son 10 años. Tú tienes menos de una década de edad... ¡todavía!"},
    {e:"💯", t:"El siglo", x:"Un siglo son 100 años. Tus tatarabuelos vivieron hace más de un siglo."},
    {e:"➡️", t:"La línea de tiempo", x:"En una línea de tiempo ponemos los hechos en orden: primero lo más antiguo y al final lo más nuevo."},
    {e:"📜", t:"Antes y después", x:"Ordenar los hechos nos ayuda a entender qué pasó primero y qué pasó después."}
  ],
  sabias:"¡Un siglo es tan largo que casi nadie vive 100 años completos! Quien lo logra recibe felicitaciones especiales.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Cuántos años tiene una década?", op:["10","100","1000"], c:0, pista:"Diez."},
    {q:"¿Cuántos años tiene un siglo?", op:["10","50","100"], c:2, pista:"Cien."},
    {q:"¿Para qué sirve una línea de tiempo?", op:["Para ordenar hechos en el tiempo","Para pesar cosas","Para medir agua"], c:0, pista:"Del más antiguo al más nuevo."},
    {q:"En una línea de tiempo, primero va lo...", op:["Más antiguo","Más nuevo","Más grande"], c:0, pista:"Lo que pasó antes."}
  ]},
  practicar:{tipo:"ordenar", pregunta:"Ordena de lo más antiguo a lo más nuevo.",
    items:["Bebé","Niña de 5 años","Niña de 10 años","Adulta","Abuela"]}
},
{
  id:"u5t4", unidad:5, titulo:"El Tiempo en la Producción", emoji:"🌾",
  objetivo:"Reconocer que las actividades productivas siguen ciclos y horarios en el tiempo.",
  dba:"DBA: Identifico cómo las personas organizan el tiempo para realizar sus actividades productivas.",
  vocab:[
    {p:"Ciclo", d:"Algo que se repite en un orden, una y otra vez."},
    {p:"Siembra", d:"Poner las semillas en la tierra."},
    {p:"Horario", d:"El tiempo organizado para hacer cada actividad."}
  ],
  
  manualidad: {"titulo":"De la Semilla al Pan","materiales":["Semillas (lentejas o frijoles)","Algodón","Un vasito"],"pasos":["Pon el algodón húmedo en el vaso y coloca la semilla.","Ponlo cerca a la ventana. Vas a ver cuánto tiempo tarda la naturaleza en producir alimento.","Anota cada día si ves un cambio. ¡La agricultura toma tiempo!"]},tarjetas:[
    {e:"🌱", t:"El ciclo del cultivo", x:"Para tener comida hay un ciclo: primero se siembra, luego la planta crece, y después se cosecha."},
    {e:"⏰", t:"Horarios de trabajo", x:"Las personas organizan su tiempo: el panadero madruga, la tienda abre a cierta hora, el colegio tiene su horario."},
    {e:"🌦️", t:"Depende del tiempo", x:"Muchos trabajos dependen del clima y las estaciones: se siembra cuando llueve y se cosecha cuando está listo."},
    {e:"📆", t:"Planear el tiempo", x:"Organizar bien el tiempo ayuda a que el trabajo salga mejor y no se dañe la cosecha."}
  ],
  sabias:"El café necesita varios meses desde que florece hasta que el grano está listo. ¡Los caficultores esperan con mucha paciencia!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es un ciclo?", op:["Algo que se repite en orden","Una sola vez","Un color"], c:0, pista:"Se repite."},
    {q:"En el cultivo, primero se...", op:["Cosecha","Siembra","Come"], c:1, pista:"Se ponen las semillas."},
    {q:"¿Por qué es útil un horario?", op:["Para organizar el tiempo","Para nadar","Para pintar"], c:0, pista:"Ordena las actividades."},
    {q:"Muchos trabajos del campo dependen del...", op:["Clima","Color favorito","Ruido"], c:0, pista:"La lluvia y el sol."}
  ]},
  practicar:{tipo:"ordenar", pregunta:"Ordena el ciclo del cultivo, de primero a último.",
    items:["Sembrar la semilla","La planta crece","Aparece el fruto","Cosechar"]}
},
/* ============ UNIDAD 6 ============ */
{
  id:"u6t1", unidad:6, titulo:"¡Conozcamos a Nuestra Gente!", emoji:"🌈",
  objetivo:"Reconocer la diversidad de grupos humanos que forman a Colombia.",
  dba:"DBA: Reconozco la diversidad étnica y cultural de Colombia y la valoro.",
  vocab:[
    {p:"Diversidad", d:"Que hay muchas clases diferentes de algo. En Colombia, muchas culturas."},
    {p:"Indígena", d:"Los pueblos que vivían en América antes de que llegaran los europeos."},
    {p:"Afrocolombiano", d:"Personas colombianas descendientes de africanos."}
  ],
  
  manualidad: {"titulo":"Mi Silueta Divertida","materiales":["Papel periódico grande o muchas hojas unidas","Lápiz","Colores"],"pasos":["Acuéstate sobre el papel y pídele a alguien que dibuje tu silueta.","Adentro de tu silueta, dibuja o escribe las cosas que te hacen única y especial.","Coloréala y pégala en la puerta de tu cuarto."]},tarjetas:[
    {e:"🧑🏽‍🤝‍🧑🏾", t:"Un país de muchos", x:"Colombia está formada por muchos grupos: indígenas, afrocolombianos, raizales, gitanos (Rrom) y mestizos."},
    {e:"🪶", t:"Los pueblos indígenas", x:"Los indígenas son los primeros habitantes. Hoy existen muchos pueblos, como los Wayúu, Nasa y Emberá."},
    {e:"🥁", t:"Los afrocolombianos", x:"Los afrocolombianos aportan música, bailes y sabores, sobre todo en las costas Pacífica y Caribe."},
    {e:"🤝", t:"Todos valemos igual", x:"Aunque somos diferentes en color, lengua o costumbres, todas las personas merecen el mismo respeto."}
  ],
  sabias:"En Colombia se hablan más de 60 lenguas indígenas además del español. ¡Es un país lleno de voces!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué significa diversidad?", op:["Que todo es igual","Que hay muchas clases diferentes","Un tipo de baile"], c:1, pista:"Muchas culturas distintas."},
    {q:"Los primeros habitantes de América son los...", op:["Indígenas","Turistas","Astronautas"], c:0, pista:"Estaban antes de los europeos."},
    {q:"Un pueblo indígena de Colombia es...", op:["Los Wayúu","Los romanos","Los egipcios"], c:0, pista:"Viven en La Guajira."},
    {q:"Todas las personas merecen...", op:["El mismo respeto","Ser ignoradas","Nada"], c:0, pista:"Aunque seamos diferentes."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"En Colombia viven muchos grupos culturales diferentes.", v:true, exp:"¡Sí! Es un país diverso."},
    {af:"Los indígenas llegaron después de los europeos.", v:false, exp:"No: los indígenas ya vivían aquí antes."},
    {af:"Los afrocolombianos aportan música y bailes.", v:true, exp:"¡Correcto! Como la marimba y el currulao."},
    {af:"Las personas diferentes no merecen respeto.", v:false, exp:"No: todos merecemos el mismo respeto."}
  ]}
},
{
  id:"u6t2", unidad:6, titulo:"Voces, Familias y Hogares", emoji:"🏡",
  objetivo:"Reconocer que existen distintas lenguas, familias y formas de vivir, y respetarlas.",
  dba:"DBA: Reconozco distintas formas de organización familiar y las respeto.",
  vocab:[
    {p:"Lengua", d:"El idioma que habla un grupo de personas."},
    {p:"Hogar", d:"El lugar donde vive una familia."},
    {p:"Respeto", d:"Tratar bien a los demás aunque sean diferentes."}
  ],
  
  manualidad: {"titulo":"El Árbol de mi Familia","materiales":["Cartulina","Marcadores","Pintura verde (opcional)"],"pasos":["Dibuja el tronco de un árbol grande.","Pon el nombre de tus abuelos en las raíces, de tus papás en las ramas, y el tuyo en las hojas altas.","Si tienes pintura, usa tu huella digital para hacer las hojas del árbol."]},tarjetas:[
    {e:"🗣️", t:"Muchas lenguas", x:"En Colombia se habla español, pero también muchas lenguas indígenas y el creole de San Andrés."},
    {e:"👨‍👩‍👧‍👦", t:"Familias diferentes", x:"Hay familias grandes y pequeñas: con abuelos, con un solo papá o mamá, con tíos. ¡Todas son valiosas!"},
    {e:"🛖", t:"Hogares distintos", x:"Las casas también cambian: apartamentos en la ciudad, casas de campo, malocas o palafitos junto al agua."},
    {e:"❤️", t:"Respetar lo diferente", x:"Aunque las familias y hogares sean distintos, todos merecen respeto y cariño."}
  ],
  sabias:"En San Andrés muchas personas hablan creole, una lengua propia que mezcla inglés con otras palabras.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es una lengua?", op:["El idioma que habla la gente","Un tipo de casa","Una comida"], c:0, pista:"Como el español."},
    {q:"En Colombia se hablan...", op:["Solo español","Muchas lenguas","Ninguna lengua"], c:1, pista:"Español y lenguas indígenas."},
    {q:"¿Cómo son las familias?", op:["Todas iguales","De muchas formas diferentes","Solo grandes"], c:1, pista:"Grandes, pequeñas, variadas."},
    {q:"A las personas diferentes debemos tratarlas con...", op:["Respeto","Burla","Miedo"], c:0, pista:"Tratar bien."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"En Colombia solo se habla una lengua.", v:false, exp:"No: se hablan español y muchas lenguas más."},
    {af:"Todas las familias son iguales.", v:false, exp:"No: hay familias de muchas formas, y todas valen."},
    {af:"Debemos respetar a las personas aunque sean diferentes.", v:true, exp:"¡Sí! El respeto es para todos."},
    {af:"Un hogar es el lugar donde vive una familia.", v:true, exp:"¡Correcto!"}
  ]}
},
{
  id:"u6t3", unidad:6, titulo:"El Mundo que Nos Rodea", emoji:"🌍",
  objetivo:"Valorar la convivencia entre culturas y aprender de las diferencias.",
  dba:"DBA: Reconozco la importancia de convivir y aprender de personas de otras culturas.",
  vocab:[
    {p:"Convivir", d:"Vivir juntos en paz y ayudándonos."},
    {p:"Cultura", d:"La forma de vivir de un grupo: su comida, música, lengua y costumbres."},
    {p:"Aprender", d:"Conocer cosas nuevas."}
  ],
  
  manualidad: {"titulo":"Mapa de mis Vecinos","materiales":["Hoja","Lápices de colores"],"pasos":["Dibuja tu casa en el centro de la hoja.","Dibuja las casas o edificios de tus vecinos alrededor.","Marca con una 'X' dónde vive un amigo o un lugar importante de tu cuadra (el parque, la tienda)."]},tarjetas:[
    {e:"🤝", t:"Vivir juntos", x:"En un barrio, un colegio o un país viven personas de muchas culturas. Convivir es hacerlo en paz."},
    {e:"🎁", t:"Aprender del otro", x:"De otras culturas aprendemos comidas nuevas, palabras, juegos y formas de ver el mundo."},
    {e:"🌐", t:"El mundo es grande", x:"Más allá de Colombia hay muchísimos países y culturas. ¡El mundo es enorme y variado!"},
    {e:"🕊️", t:"Diferentes y unidos", x:"Ser diferentes no es un problema: nos hace más ricos. Podemos estar unidos aunque no seamos iguales."}
  ],
  sabias:"Palabras que usamos a diario, como 'chocolate' y 'tomate', vienen de lenguas indígenas de América.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"Convivir significa...", op:["Pelear siempre","Vivir juntos en paz","Estar solo"], c:1, pista:"Vivir bien con otros."},
    {q:"¿Qué es la cultura?", op:["La forma de vivir de un grupo","Un animal","Una montaña"], c:0, pista:"Comida, música, lengua."},
    {q:"De otras culturas podemos...", op:["Aprender cosas nuevas","No aprender nada","Burlarnos"], c:0, pista:"Conocer cosas."},
    {q:"Ser diferentes nos hace...", op:["Más ricos como país","Peores","Iguales"], c:0, pista:"La diversidad es buena."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada palabra con su significado.",
    pares:[["Convivir","Vivir juntos en paz"],["Cultura","Forma de vivir de un grupo"],["Respeto","Tratar bien a los demás"],["Diversidad","Muchas clases diferentes"]]}
},
{
  id:"u6t4", unidad:6, titulo:"Aportes de los Pueblos Indígenas", emoji:"🪶",
  objetivo:"Reconocer las contribuciones de los pueblos indígenas a nuestra cultura y naturaleza.",
  dba:"DBA: Valoro los aportes de los pueblos indígenas a la cultura colombiana.",
  vocab:[
    {p:"Aporte", d:"Algo bueno que alguien da o comparte con los demás."},
    {p:"Saberes", d:"Los conocimientos que tiene un grupo de personas."},
    {p:"Ancestral", d:"Muy antiguo, que viene de nuestros antepasados."}
  ],
  
  manualidad: {"titulo":"Collar Indígena de Macarrones","materiales":["Fideos tipo macarrón o penne","Hilo o lana","Pinturas"],"pasos":["Pinta los fideos de diferentes colores vibrantes.","Una vez secos, pásalos por el hilo para crear un collar.","Recuerda que los indígenas elaboran hermosas artesanías con materiales de la naturaleza."]},tarjetas:[
    {e:"🌽", t:"Alimentos que nos dieron", x:"Los pueblos indígenas nos enseñaron a cultivar y comer maíz, papa, yuca, cacao y muchas frutas."},
    {e:"🧺", t:"Saberes y artesanías", x:"Aportan tejidos, mochilas, cerámica y conocimientos sobre plantas que curan."},
    {e:"🌳", t:"Cuidar la naturaleza", x:"Los indígenas nos enseñan a respetar y cuidar la tierra, los ríos y los bosques."},
    {e:"🙏", t:"Agradecer y respetar", x:"Debemos agradecer y respetar a los pueblos indígenas, que aún viven y cuidan sus tradiciones."}
  ],
  sabias:"La mochila Wayúu, tejida a mano por mujeres indígenas de La Guajira, es famosa en todo el mundo.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"Un alimento que nos dieron los indígenas es...", op:["El maíz","La pizza","La hamburguesa"], c:0, pista:"Con él se hace la arepa."},
    {q:"¿Qué es un aporte?", op:["Algo bueno que se comparte","Un castigo","Una pelea"], c:0, pista:"Algo que se da a los demás."},
    {q:"Los pueblos indígenas nos enseñan a...", op:["Cuidar la naturaleza","Botar basura","Cortar bosques"], c:0, pista:"Respetar la tierra."},
    {q:"La mochila Wayúu es una...", op:["Artesanía tejida a mano","Máquina","Comida"], c:0, pista:"La tejen las mujeres indígenas."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"El maíz y la papa son aportes de los pueblos indígenas.", v:true, exp:"¡Sí! Ellos los cultivaban desde hace mucho."},
    {af:"Los pueblos indígenas ya no existen.", v:false, exp:"No: hoy viven muchos pueblos indígenas en Colombia."},
    {af:"Los indígenas nos enseñan a cuidar la naturaleza.", v:true, exp:"¡Correcto! Respetan la tierra y los ríos."},
    {af:"No debemos respetar a los pueblos indígenas.", v:false, exp:"No: merecen respeto y agradecimiento."}
  ]}
},
/* ============ UNIDAD 7 ============ */
{
  id:"u7t1", unidad:7, titulo:"¡Nuestro Municipio se Organiza!", emoji:"🏘️",
  objetivo:"Reconocer qué es un municipio y cómo está organizado.",
  dba:"DBA: Identifico las formas de organización de mi municipio y los servicios que presta.",
  vocab:[
    {p:"Municipio", d:"El pueblo o ciudad donde vivimos, con su propio gobierno."},
    {p:"Alcaldía", d:"La oficina que dirige el municipio."},
    {p:"Servicio público", d:"Algo que ayuda a todos: agua, luz, aseo, salud."}
  ],
  
  manualidad: {"titulo":"Construyo mi Alcaldía","materiales":["Caja de zapatos","Colores","Tijeras"],"pasos":["Usa la caja para hacer el edificio principal de tu municipio (la Alcaldía).","Hazle una puerta y ponle un letrero grande.","Adentro puedes poner muñecos que sean el alcalde trabajando."]},tarjetas:[
    {e:"🏙️", t:"¿Qué es un municipio?", x:"Un municipio es el pueblo o ciudad donde vivimos. Colombia tiene más de mil municipios."},
    {e:"🏛️", t:"La alcaldía", x:"La alcaldía dirige el municipio. Se encarga de que todo funcione: las calles, los parques y la limpieza."},
    {e:"🚰", t:"Servicios para todos", x:"El municipio ayuda a que tengamos agua, luz, recolección de basura, colegios y hospitales."},
    {e:"🧑‍🤝‍🧑", t:"Muchos vecinos", x:"En un municipio viven muchas familias. Todos somos parte de él y podemos cuidarlo."}
  ],
  sabias:"Colombia tiene más de 1.100 municipios. ¡Cada uno tiene su propio nombre, su alcalde y su plaza principal!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es un municipio?", op:["El pueblo o ciudad donde vivimos","Un país lejano","Un planeta"], c:0, pista:"Donde vives."},
    {q:"¿Quién dirige el municipio?", op:["La alcaldía","Un astronauta","Nadie"], c:0, pista:"Su oficina principal."},
    {q:"Un servicio público es...", op:["El agua potable","Un juguete","Un secreto"], c:0, pista:"Sirve a todos."},
    {q:"¿Cuántos municipios tiene aproximadamente Colombia?", op:["Solo 5","Más de mil","Ninguno"], c:1, pista:"Muchísimos."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"Un municipio es el pueblo o ciudad donde vivimos.", v:true, exp:"¡Sí!"},
    {af:"La alcaldía dirige el municipio.", v:true, exp:"¡Correcto!"},
    {af:"El agua y la luz son servicios públicos.", v:true, exp:"¡Sí! Sirven a toda la comunidad."},
    {af:"Colombia solo tiene un municipio.", v:false, exp:"No: tiene más de mil."}
  ]}
},
{
  id:"u7t2", unidad:7, titulo:"¡Líderes para Nuestra Ciudad!", emoji:"🧑‍💼",
  objetivo:"Identificar a las autoridades del municipio y lo que hacen.",
  dba:"DBA: Reconozco las autoridades de mi municipio y sus funciones.",
  vocab:[
    {p:"Alcalde", d:"La persona que dirige el municipio."},
    {p:"Concejo", d:"Grupo de personas que hacen las normas del municipio."},
    {p:"Personero", d:"La persona que defiende los derechos de la gente del municipio."}
  ],
  
  manualidad: {"titulo":"Medalla al Buen Ciudadano","materiales":["Cartón","Cinta o hilo","Papel aluminio o color amarillo"],"pasos":["Recorta un círculo de cartón y fórralo con aluminio o píntalo de amarillo.","Escribe 'Buen Ciudadano'.","Entrégale la medalla a alguien de tu casa que siempre ayuda a los demás."]},tarjetas:[
    {e:"🧑‍💼", t:"El alcalde o alcaldesa", x:"El alcalde es el líder del municipio. Toma decisiones para mejorar la vida de todos los vecinos."},
    {e:"👥", t:"El concejo", x:"El concejo es un grupo de personas (los concejales) que crean las normas del municipio y vigilan al alcalde."},
    {e:"🛡️", t:"El personero", x:"El personero cuida que se respeten los derechos de las personas del municipio."},
    {e:"🤝", t:"Trabajan para nosotros", x:"Estos líderes trabajan para servir a la comunidad. ¡Nosotros los elegimos!"}
  ],
  sabias:"Los concejales de tu municipio se reúnen para decidir cosas como dónde hacer un parque nuevo o cómo cuidar el agua.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Quién es el líder del municipio?", op:["El alcalde","El portero","El cartero"], c:0, pista:"Dirige la alcaldía."},
    {q:"¿Qué hace el concejo?", op:["Crea las normas del municipio","Vende pan","Maneja buses"], c:0, pista:"Los concejales hacen reglas."},
    {q:"El personero defiende...", op:["Los derechos de las personas","A los animales del zoológico","Un equipo de fútbol"], c:0, pista:"Cuida los derechos."},
    {q:"Estos líderes trabajan para...", op:["Servir a la comunidad","Solo para ellos","Nadie"], c:0, pista:"Para todos los vecinos."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada líder con lo que hace.",
    pares:[["Alcalde","Dirige el municipio"],["Concejo","Crea las normas"],["Personero","Defiende los derechos"],["Vecinos","Eligen a sus líderes"]]}
},
{
  id:"u7t3", unidad:7, titulo:"¡Eligiendo a Nuestro Alcalde!", emoji:"🗳️",
  objetivo:"Comprender qué son las elecciones y el voto como parte de la democracia.",
  dba:"DBA: Reconozco el voto como una forma de participación democrática.",
  vocab:[
    {p:"Elecciones", d:"Cuando las personas eligen a sus líderes votando."},
    {p:"Voto", d:"La forma de elegir marcando en un papel a quién queremos."},
    {p:"Democracia", d:"Un sistema donde el pueblo elige y decide."}
  ],
  
  manualidad: {"titulo":"Caja de Votación","materiales":["Una caja pequeña con tapa","Papelitos","Esfero"],"pasos":["Hazle una ranura a la tapa de la caja para que entren los papelitos (una urna).","Haz una votación familiar: ¿Qué película ver hoy? Cada uno escribe su voto.","Mete los votos, cuéntalos y respeta la película ganadora."]},tarjetas:[
    {e:"🗳️", t:"¿Qué son las elecciones?", x:"En las elecciones, las personas adultas votan para escoger a sus líderes, como el alcalde."},
    {e:"✅", t:"El voto", x:"Votar es elegir. Cada persona marca en un papel a quién quiere que la represente. ¡Cada voto cuenta!"},
    {e:"⚖️", t:"La democracia", x:"En una democracia, el pueblo decide. Se elige a los líderes y se respetan las decisiones de la mayoría."},
    {e:"🕊️", t:"Elegir con respeto", x:"Aunque cada quien prefiera a alguien distinto, después de votar todos debemos respetar el resultado."}
  ],
  sabias:"En Colombia, las personas pueden votar desde los 18 años. ¡Es un derecho y también una responsabilidad!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué son las elecciones?", op:["Cuando se elige a líderes votando","Un juego de mesa","Una fiesta de disfraces"], c:0, pista:"Se escoge votando."},
    {q:"Votar es...", op:["Elegir marcando a quién queremos","Correr","Cantar"], c:0, pista:"Se hace en un papel."},
    {q:"En una democracia decide...", op:["El pueblo","Una sola persona","Nadie"], c:0, pista:"Todos participan."},
    {q:"¿Desde qué edad se puede votar en Colombia?", op:["Desde los 18 años","Desde los 5 años","Nunca"], c:0, pista:"Cuando se es adulto."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"En las elecciones se eligen líderes votando.", v:true, exp:"¡Sí!"},
    {af:"En una democracia decide el pueblo.", v:true, exp:"¡Correcto!"},
    {af:"Los niños de 5 años ya pueden votar en Colombia.", v:false, exp:"No: se vota desde los 18 años."},
    {af:"Después de votar debemos respetar el resultado.", v:true, exp:"¡Sí! Aunque no gane nuestro favorito."}
  ]}
},
{
  id:"u7t4", unidad:7, titulo:"¡Decisiones para Todos!", emoji:"🤲",
  objetivo:"Reconocer la participación, las normas y el bien común en la comunidad.",
  dba:"DBA: Participo en la construcción de acuerdos y normas para la convivencia.",
  vocab:[
    {p:"Participar", d:"Dar tu opinión y ayudar a decidir."},
    {p:"Norma", d:"Una regla que ayuda a vivir mejor en grupo."},
    {p:"Bien común", d:"Lo que es bueno para todos, no solo para uno."}
  ],
  
  manualidad: {"titulo":"El Bastón de la Palabra","materiales":["Un palito de madera o un tubo de cartón","Lana, colores o cintas"],"pasos":["Decora el palo con la lana o colores para que quede muy bonito.","Úsenlo en la mesa: Solo puede hablar quien tenga el bastón en la mano.","Esto enseña a escuchar y respetar los turnos en democracia."]},tarjetas:[
    {e:"🙋", t:"Tu voz importa", x:"Participar es dar tu opinión y ayudar a decidir. ¡Los niños también pueden participar en su casa y colegio!"},
    {e:"📏", t:"Las normas nos ayudan", x:"Las normas son reglas que nos ayudan a convivir: respetar el turno, cuidar los parques, no botar basura."},
    {e:"🌍", t:"El bien común", x:"Pensar en el bien común es buscar lo mejor para todos, no solo para uno mismo."},
    {e:"🤝", t:"Acuerdos entre todos", x:"Cuando hay un problema, podemos hablar y llegar a acuerdos justos para todos."}
  ],
  sabias:"En muchos colegios, los estudiantes eligen a un personero estudiantil que representa sus ideas. ¡Participar se aprende desde niños!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"Participar es...", op:["Dar tu opinión y ayudar a decidir","Quedarse callado siempre","Dormir"], c:0, pista:"Tu voz cuenta."},
    {q:"¿Para qué sirven las normas?", op:["Para convivir mejor","Para molestar","Para nada"], c:0, pista:"Ayudan al grupo."},
    {q:"El bien común es lo bueno para...", op:["Todos","Solo para mí","Nadie"], c:0, pista:"Para toda la comunidad."},
    {q:"Cuando hay un problema, es mejor...", op:["Hablar y llegar a acuerdos","Pelear","Ignorarlo"], c:0, pista:"Buscar acuerdos justos."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada palabra con su significado.",
    pares:[["Participar","Dar opinión y decidir"],["Norma","Regla para convivir"],["Bien común","Lo bueno para todos"],["Acuerdo","Solución justa entre varios"]]}
},
/* ============ UNIDAD 8 ============ */
{
  id:"u8t1", unidad:8, titulo:"Los Poderes Públicos", emoji:"⚖️",
  objetivo:"Reconocer de forma sencilla las ramas del poder público y las autoridades del departamento.",
  dba:"DBA: Identifico las autoridades del departamento y las ramas del poder público.",
  vocab:[
    {p:"Departamento", d:"Una parte grande del país que reúne varios municipios."},
    {p:"Gobernador", d:"La persona que dirige un departamento."},
    {p:"Poder público", d:"Las personas y grupos que gobiernan y hacen cumplir las leyes."}
  ],
  
  manualidad: {"titulo":"La Balanza de la Justicia","materiales":["Un gancho de ropa (percha)","Dos vasos de plástico","Cuerda"],"pasos":["Amarra un vaso a cada lado del gancho con la cuerda.","Cuélgalo en algún lado. Esa es la balanza de la Rama Judicial.","Pon objetos en los vasos para intentar que queden perfectamente equilibrados (justos)."]},tarjetas:[
    {e:"🗺️", t:"¿Qué es un departamento?", x:"Colombia se divide en departamentos. Cada uno reúne varios municipios. ¡Hay 32 departamentos!"},
    {e:"🧑‍💼", t:"El gobernador", x:"Así como el municipio tiene alcalde, el departamento tiene un gobernador que lo dirige."},
    {e:"🏛️", t:"Tres poderes", x:"El poder se reparte en tres: uno gobierna (ejecutivo), otro hace las leyes (legislativo) y otro hace justicia (judicial)."},
    {e:"⚖️", t:"Para que sea justo", x:"Repartir el poder en tres ayuda a que nadie mande solo y las cosas sean más justas."}
  ],
  sabias:"Colombia tiene 32 departamentos y una capital, Bogotá. ¡Cada departamento tiene su propia capital también!",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es un departamento?", op:["Una parte del país con varios municipios","Un cuarto de la casa","Un animal"], c:0, pista:"Reúne municipios."},
    {q:"¿Quién dirige un departamento?", op:["El gobernador","El alcalde","El profesor"], c:0, pista:"Como el alcalde, pero del departamento."},
    {q:"¿En cuántos poderes se reparte el gobierno?", op:["Tres","Uno","Diez"], c:0, pista:"Ejecutivo, legislativo y judicial."},
    {q:"¿Cuántos departamentos tiene Colombia?", op:["32","5","100"], c:0, pista:"Treinta y dos."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"Un departamento reúne varios municipios.", v:true, exp:"¡Sí!"},
    {af:"El gobernador dirige un departamento.", v:true, exp:"¡Correcto!"},
    {af:"El poder público está en una sola persona que manda todo.", v:false, exp:"No: se reparte en tres poderes para que sea justo."},
    {af:"Colombia tiene 32 departamentos.", v:true, exp:"¡Así es!"}
  ]}
},
{
  id:"u8t2", unidad:8, titulo:"Mejorando Nuestra Vida", emoji:"🏥",
  objetivo:"Reconocer los servicios que el departamento y el gobierno brindan a la comunidad.",
  dba:"DBA: Reconozco los servicios que brindan las autoridades para mejorar la vida de las personas.",
  vocab:[
    {p:"Salud", d:"Estar bien en el cuerpo; los hospitales nos ayudan a cuidarla."},
    {p:"Educación", d:"Aprender; los colegios nos la brindan."},
    {p:"Comunidad", d:"El conjunto de personas que viven juntas."}
  ],
  
  manualidad: {"titulo":"Cartel por los Derechos","materiales":["Un octavo de cartulina","Marcadores","Recortes de revistas"],"pasos":["Haz un cartel grande que diga: '¡Tengo derecho a jugar y estudiar!'.","Pega recortes de niños jugando o estudiando alrededor.","Pégalo en un lugar visible de tu casa."]},tarjetas:[
    {e:"🏥", t:"Salud para todos", x:"El gobierno construye hospitales y puestos de salud para que las personas se puedan curar."},
    {e:"🏫", t:"Educación", x:"Los colegios y escuelas ayudan a que todos los niños puedan aprender. ¡Estudiar es un derecho!"},
    {e:"🛣️", t:"Vías y transporte", x:"El departamento cuida carreteras que unen los municipios, para viajar y llevar productos."},
    {e:"💧", t:"Servicios básicos", x:"También se trabaja para que haya agua limpia, luz y recolección de basura en más lugares."}
  ],
  sabias:"Ir al colegio no siempre fue para todos. Hoy, la educación es un derecho de todos los niños y niñas de Colombia.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Quién nos ayuda a cuidar la salud?", op:["Los hospitales","Los carros","Los juguetes"], c:0, pista:"Allí curan a las personas."},
    {q:"¿Dónde aprenden los niños?", op:["En los colegios","En la nevera","En la basura"], c:0, pista:"Lugar de estudio."},
    {q:"Las carreteras sirven para...", op:["Unir municipios y transportar","Nadar","Cocinar"], c:0, pista:"Viajar y llevar cosas."},
    {q:"La educación es un...", op:["Derecho de todos los niños","Castigo","Secreto"], c:0, pista:"Algo que todos merecen."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada servicio con el lugar o para qué sirve.",
    pares:[["Salud","Hospital"],["Educación","Colegio"],["Transporte","Carreteras"],["Agua limpia","Acueducto"]]}
},
{
  id:"u8t3", unidad:8, titulo:"¡Tu Opinión Cuenta!", emoji:"📣",
  objetivo:"Reconocer formas de participación ciudadana y de expresar opiniones.",
  dba:"DBA: Reconozco formas de participar y expresar mi opinión en la comunidad.",
  vocab:[
    {p:"Opinión", d:"Lo que una persona piensa sobre algo."},
    {p:"Ciudadano", d:"Una persona que es parte de una comunidad y tiene derechos y deberes."},
    {p:"Veeduría", d:"Vigilar que los líderes hagan bien su trabajo."}
  ],
  
  manualidad: {"titulo":"Megáfono de Opinión","materiales":["Cartulina","Cinta adhesiva"],"pasos":["Enrolla la cartulina formando un cono y pégala con cinta para que no se abra.","Decóralo con marcadores.","Úsalo para decir en voz alta (sin gritar muy fuerte) una buena idea para mejorar tu casa."]},tarjetas:[
    {e:"💬", t:"Expresar lo que pienso", x:"Todos podemos dar nuestra opinión con respeto: en la casa, el colegio y la comunidad."},
    {e:"👂", t:"Escuchar a los demás", x:"Participar no es solo hablar; también es escuchar las ideas de otros, aunque sean distintas."},
    {e:"👀", t:"Estar pendientes", x:"Los ciudadanos vigilan que los líderes cumplan sus promesas. Eso se llama veeduría."},
    {e:"✋", t:"Muchas formas de participar", x:"Podemos participar votando, opinando, ayudando en el barrio o cuidando lo público."}
  ],
  sabias:"Hasta una carta o un dibujo pidiendo un parque limpio es una forma de participar y hacer oír tu voz.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es una opinión?", op:["Lo que una persona piensa","Una comida","Un color"], c:0, pista:"Lo que piensas."},
    {q:"Participar también es...", op:["Escuchar a los demás","Gritar más fuerte","No hablar nunca"], c:0, pista:"No solo hablar."},
    {q:"Vigilar que los líderes cumplan se llama...", op:["Veeduría","Cosecha","Recreo"], c:0, pista:"Estar pendientes."},
    {q:"Debemos dar nuestra opinión con...", op:["Respeto","Groserías","Miedo"], c:0, pista:"Tratando bien a los demás."}
  ]},
  practicar:{tipo:"vf", items:[
    {af:"Todos podemos dar nuestra opinión con respeto.", v:true, exp:"¡Sí! Tu voz cuenta."},
    {af:"Participar es solo hablar, nunca escuchar.", v:false, exp:"No: también es escuchar a los demás."},
    {af:"La veeduría es vigilar que los líderes cumplan.", v:true, exp:"¡Correcto!"},
    {af:"Los niños no pueden participar de ninguna forma.", v:false, exp:"No: pueden opinar, ayudar y cuidar lo público."}
  ]}
},
{
  id:"u8t4", unidad:8, titulo:"Construyendo Paz Juntos", emoji:"🕊️",
  objetivo:"Reconocer la convivencia, la resolución de conflictos y la paz como valores ciudadanos.",
  dba:"DBA: Aplico estrategias para resolver conflictos de forma pacífica en mi entorno.",
  vocab:[
    {p:"Paz", d:"Vivir tranquilos, sin violencia y respetándonos."},
    {p:"Conflicto", d:"Un desacuerdo o pelea entre personas."},
    {p:"Diálogo", d:"Hablar para entenderse y resolver un problema."}
  ],
  
  manualidad: {"titulo":"La Paloma de la Paz","materiales":["Hoja de papel blanco","Tijeras","Lápiz"],"pasos":["Dibuja el contorno de tu mano en el papel blanco y recórtalo.","El dedo pulgar es la cabeza de la paloma, y los demás dedos son las alas.","Dibújale un ojo, un pico y llévala volando por la casa en señal de paz."]},tarjetas:[
    {e:"🕊️", t:"¿Qué es la paz?", x:"La paz es vivir tranquilos, sin violencia, respetándonos y ayudándonos entre todos."},
    {e:"🗣️", t:"Resolver hablando", x:"Cuando hay un conflicto, lo mejor es el diálogo: hablar con calma y escuchar para encontrar una solución."},
    {e:"🤝", t:"Perdonar y acordar", x:"Pedir disculpas, perdonar y llegar a acuerdos ayuda a arreglar los problemas sin pelear."},
    {e:"🌟", t:"Yo construyo paz", x:"Puedes construir paz cada día: compartiendo, respetando turnos y tratando bien a los demás."}
  ],
  sabias:"Los grandes acuerdos de paz empiezan con algo pequeño: dos personas dispuestas a hablar y escucharse.",
  descubrir:{tipo:"quiz", preguntas:[
    {q:"¿Qué es la paz?", op:["Vivir tranquilos y respetándonos","Pelear siempre","Estar solos"], c:0, pista:"Sin violencia."},
    {q:"La mejor forma de resolver un conflicto es...", op:["El diálogo","Los golpes","Los gritos"], c:0, pista:"Hablar con calma."},
    {q:"¿Qué es un conflicto?", op:["Un desacuerdo entre personas","Una fruta","Un baile"], c:0, pista:"Una pelea o problema."},
    {q:"Puedo construir paz si...", op:["Comparto y respeto a los demás","Molesto a todos","Nunca escucho"], c:0, pista:"Buenas acciones diarias."}
  ]},
  practicar:{tipo:"emparejar", instruccion:"Une cada palabra con su significado.",
    pares:[["Paz","Vivir sin violencia"],["Conflicto","Un desacuerdo"],["Diálogo","Hablar para entenderse"],["Acuerdo","Solución que aceptan todos"]]}
}
];

/* Exponer globalmente */
window.UNIDADES = UNIDADES;
window.TEMAS = TEMAS;
