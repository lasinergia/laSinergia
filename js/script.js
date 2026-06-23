const QUESTIONS = [
  {
    text: "Cuando escuchas por primera vez que la IA puede hacer casi cualquier cosa, ¿cuál es tu primera reacción?",
    opts: [
      { letter: "A", text: "Empiezo a imaginar todo lo que podría hacer con eso para mis proyectos.", p: "A" },
      { letter: "B", text: "Me da curiosidad. ¿Cómo funciona? ¿Puedo probarlo?", p: "B" },
      { letter: "C", text: "¿Cualquier cosa? Espera... eso necesita una aclaración.", p: "C" },
      { letter: "D", text: "¿Y para qué sirve en la práctica, en el trabajo real?", p: "D" }
    ]
  },
  {
    text: "Si pudieras usar una herramienta de IA hoy, ¿para qué la usarías primero?",
    opts: [
      { letter: "A", text: "Para organizar todas las ideas que tengo en mi cabeza y darles forma.", p: "A" },
      { letter: "B", text: "Para explorar qué puede hacer y ver qué pasa.", p: "B" },
      { letter: "C", text: "Para verificar información y revisar que lo que genera sea confiable.", p: "C" },
      { letter: "D", text: "Para resolver algo concreto: un resumen, un plan, un análisis.", p: "D" }
    ]
  },
  {
    text: "¿Qué te frena más a la hora de usar IA?",
    opts: [
      { letter: "A", text: "Que lo que crea no capture realmente mi voz o mi estilo.", p: "A" },
      { letter: "B", text: "No saber por dónde empezar ni qué herramienta elegir.", p: "B" },
      { letter: "C", text: "Que genere información incorrecta y yo no me dé cuenta.", p: "C" },
      { letter: "D", text: "No tener claro si realmente me va a ahorrar tiempo.", p: "D" }
    ]
  },
  {
    text: "Para aprender algo nuevo, ¿qué tipo de ejemplo necesitas?",
    opts: [
      { letter: "A", text: "Uno visual, creativo, que me muestre posibilidades y me inspire.", p: "A" },
      { letter: "B", text: "Uno práctico que pueda replicar yo mismo/a para ver qué pasa.", p: "B" },
      { letter: "C", text: "Uno con fuentes claras, contexto y explicación de los límites.", p: "C" },
      { letter: "D", text: "Uno que resuelva un problema real que yo ya tengo.", p: "D" }
    ]
  },
  {
    text: "¿Cuál de estas frases te suena más familiar?",
    opts: [
      { letter: "A", text: "Tengo mil ideas en la cabeza, pero me cuesta aterrizarlas.", p: "A" },
      { letter: "B", text: "Siento que me estoy perdiendo algo, quiero entender de qué va esto.", p: "B" },
      { letter: "C", text: "No confío fácilmente. Prefiero revisar antes de creerle a algo.", p: "C" },
      { letter: "D", text: "No necesito teoría, necesito herramientas que funcionen.", p: "D" }
    ]
  },
  {
    text: "Si la IA te da una respuesta, ¿cuál es tu primer instinto?",
    opts: [
      { letter: "A", text: "La tomo como punto de partida y le agrego mi toque personal.", p: "A" },
      { letter: "B", text: "Me pregunto si puedo pedirle algo más interesante.", p: "B" },
      { letter: "C", text: "La reviso, la comparo y busco confirmarla antes de usarla.", p: "C" },
      { letter: "D", text: "Evalúo si realmente me sirve para lo que necesito.", p: "D" }
    ]
  },
  {
    text: "¿Qué rol le darías a la IA en tu vida?",
    opts: [
      { letter: "A", text: "Asistente creativa: me ayuda a desarrollar y organizar mis ideas.", p: "A" },
      { letter: "B", text: "Compañera de exploración: me muestra nuevos caminos.", p: "B" },
      { letter: "C", text: "Herramienta de análisis: me ayuda a pensar mejor, no a pensar por mí.", p: "C" },
      { letter: "D", text: "Herramienta de productividad: hace lo que me lleva mucho tiempo.", p: "D" }
    ]
  },
  {
    text: "¿Qué es lo que más te gustaría lograr usando IA en los próximos meses?",
    opts: [
      { letter: "A", text: "Crear más contenido, proyectos y materiales con menos fricción.", p: "A" },
      { letter: "B", text: "Entender qué es la IA de verdad y perderle el miedo.", p: "B" },
      { letter: "C", text: "Aprender a usarla de forma crítica, sin depender de ella ni creerle todo.", p: "C" },
      { letter: "D", text: "Aplicarla a mi trabajo o estudio de forma concreta y eficiente.", p: "D" }
    ]
  },
  {
    text: "Cuando la IA se equivoca o da una respuesta rara, ¿qué piensas?",
    opts: [
      { letter: "A", text: "Qué interesante. A veces los errores me llevan a ideas inesperadas.", p: "A" },
      { letter: "B", text: "Normal, todavía está aprendiendo. Veo qué pasó.", p: "B" },
      { letter: "C", text: "Exactamente por eso hay que verificar siempre. No es un oráculo.", p: "C" },
      { letter: "D", text: "Si falla así, no me sirve. Necesito algo confiable.", p: "D" }
    ]
  }
];

const PROFILES = {
  A: {
    name: "Alma creativa con muchas ideas",
    icon: "🌀",
    desc: "Tienes proyectos, ideas y posibilidades que se acumulan más rápido de lo que puedes desarrollarlos. Tu mayor fortaleza es la visión; tu mayor desafío, la estructura. La IA puede ser ese espacio donde por fin le das forma a todo lo que tienes adentro.",
    usar: "Úsala para organizar, estructurar y desarrollar. Puedes hablarle como a un asistente creativo: comparte tus ideas en bruto y pídele que las ordene, las desarrolle o las conecte. También puede ayudarte a crear contenido, escribir borradores y planear proyectos paso a paso.",
    cuidar: "Cuida que no reemplace tu voz. La IA no siente, no tiene intuición ni vivencias, así que lo que genera siempre necesita tu sello personal. Revisa y ajusta: el resultado final debe seguir siendo tuyo.",
    mantra: "\"La IA organiza mis ideas. Yo les doy vida.\"",
    paso: "Abre ChatGPT o Claude y cuéntale un proyecto que tienes en mente pero nunca lograste ordenar. Descríbelo tal como lo piensas. Pídele que te haga un esquema con pasos concretos."
  },
  B: {
    name: "Alma curiosa exploradora",
    icon: "🧭",
    desc: "Tienes ganas de entender, de experimentar, de descubrir qué puede hacer la IA de verdad. No necesitas saber todo antes de empezar; necesitas un buen punto de entrada. Tu fortaleza es la apertura; tu riesgo, perderte en posibilidades sin aterrizarlas.",
    usar: "Empieza explorando sin presión. Pídele a la IA que te explique algo que te genera curiosidad, que te recomiende por dónde empezar, que te muestre ejemplos de lo que puede hacer. Cada sesión es un experimento.",
    cuidar: "Cuida de no quedarte solo en el modo exploración. En algún momento vas a querer anclar la curiosidad en algo concreto que te sirva. La IA es más útil cuando le pides algo específico.",
    mantra: "\"Cada pregunta que hago es un paso que me lleva más lejos.\"",
    paso: "Busca una herramienta gratuita como ChatGPT o Claude, crea una cuenta y escribe: \"Soy nueva/nuevo en esto, ¿qué cosas puedo hacer contigo?\" Deja que te sorprenda la respuesta."
  },
  C: {
    name: "Mente crítica verificadora",
    icon: "🔍",
    desc: "Te acercas a la IA con los ojos bien abiertos. Te interesa, pero no le crees todo. Necesitas entender cómo funciona, qué límites tiene y cuándo puede fallar. Esa mirada crítica es un superpoder que muy poca gente tiene al empezar.",
    usar: "Úsala como apoyo para pensar mejor, no para reemplazar tu criterio. Puedes pedirle que te muestre fuentes, que explique su razonamiento o que te presente distintas perspectivas sobre un tema. La IA es mejor cuando la usas como punto de partida, no como punto de llegada.",
    cuidar: "Cuida de no quedarte solo en el análisis sin llegar a la acción. La IA tiene límites, sí, pero también tiene usos muy valiosos. La clave está en usarla con criterio, no en evitarla.",
    mantra: "\"La verifico porque me importa lo que hago con ella.\"",
    paso: "Toma un tema que conozcas bien y pídele a la IA que te explique algo sobre ese tema. Luego verifica una afirmación que haya hecho. Ese ejercicio te va a dar una medida real de cuánto puedes confiar en ella."
  },
  D: {
    name: "Mente práctica resolutiva",
    icon: "🛠️",
    desc: "Para ti, lo importante es que funcione. No necesitas entender cada detalle técnico ni explorar por explorar: quieres herramientas concretas para problemas concretos. Tu fortaleza es la eficiencia; tu riesgo, no aprovechar todo el potencial de la IA por ir directo al resultado.",
    usar: "Úsala para automatizar tareas repetitivas, generar resúmenes, hacer análisis rápidos, estructurar planes y organizar información. Cuanto más específica sea tu instrucción, mejor será el resultado.",
    cuidar: "Cuida de no tratarla como una máquina de respuestas automáticas sin revisión. La IA puede ahorrarte tiempo, pero el criterio de qué es útil y qué no, sigue siendo tuyo.",
    mantra: "\"La IA hace en minutos lo que a mí me toma horas. Yo decido qué hacer con eso.\"",
    paso: "Identifica una tarea de tu trabajo o estudio que te consume demasiado tiempo. Descríbesela a ChatGPT o Claude con todo el detalle posible y pídele que la resuelva. Evalúa el resultado y ajusta."
  }
};

const MIXED = {
  AB: { name: "Creativa exploradora", A: "Alma creativa", B: "Alma curiosa", desc: "Tienes muchas ideas y también muchas ganas de descubrir. Usas la IA como un espacio de juego y creación al mismo tiempo. Lo tuyo es el movimiento: pensar, probar, generar." },
  AC: { name: "Creativa con criterio", A: "Alma creativa", B: "Mente crítica", desc: "Creas con libertad, pero no sueltas el ojo crítico. Generas ideas y después las revisas con cuidado antes de lanzarlas. Esa combinación es especialmente valiosa." },
  AD: { name: "Creativa estratégica", A: "Alma creativa", B: "Mente práctica", desc: "Tienes visión y también piensas en resultados concretos. Combinas la creatividad con una orientación clara hacia lo que funciona. La IA puede ser tu aliada perfecta." },
  BC: { name: "Exploradora consciente", A: "Alma curiosa", B: "Mente crítica", desc: "Quieres entender, pero no te conformas con cualquier respuesta. Exploras con curiosidad y con cautela al mismo tiempo. Eso te da perspectiva." },
  BD: { name: "Aprendiz práctica", A: "Alma curiosa", B: "Mente práctica", desc: "Quieres aprender haciendo. La teoría te importa solo si te sirve para aplicarla a algo real. Tu forma de aprender es lanzarte y ver qué pasa." },
  CD: { name: "Analítica resolutiva", A: "Mente crítica", B: "Mente práctica", desc: "Analizas con cuidado y actúas con eficiencia. Usas la IA como herramienta de apoyo al pensamiento, no como atajo. Eso es exactamente lo que recomendamos." }
};

let current = 0;
let answers = new Array(QUESTIONS.length).fill(null);

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz() {
  current = 0;
  answers = new Array(QUESTIONS.length).fill(null);
  renderQuestion();
  showScreen('quiz');
}

function renderQuestion() {
  const q = QUESTIONS[current];
  const total = QUESTIONS.length;
  const pct = Math.round((current / total) * 100);

  document.getElementById('prog-label').textContent = 'Pregunta ' + (current+1) + ' de ' + total;
  document.getElementById('prog-pct').textContent = pct + '% completado';
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('q-label').textContent = 'Pregunta ' + (current+1);
  document.getElementById('q-text').textContent = q.text;

  const container = document.getElementById('q-options');
  container.innerHTML = '';
  q.opts.forEach(o => {
    const btn = document.createElement('button');
    btn.className = 'opt' + (answers[current] === o.p ? ' selected' : '');
    btn.innerHTML = '<span class="opt-letter">' + o.letter + '</span><span class="opt-text">' + o.text + '</span>';
    btn.onclick = () => selectAnswer(o.p);
    container.appendChild(btn);
  });

  document.getElementById('btn-back').disabled = current === 0;
  document.getElementById('btn-next').disabled = answers[current] === null;
  document.getElementById('btn-next').textContent = current === total - 1 ? 'Ver mi perfil →' : 'Siguiente →';
}

function selectAnswer(p) {
  answers[current] = p;
  document.querySelectorAll('.opt').forEach((btn, i) => {
    btn.classList.toggle('selected', QUESTIONS[current].opts[i].p === p);
  });
  document.getElementById('btn-next').disabled = false;
}

function goBack() {
  if (current > 0) { current--; renderQuestion(); }
}

function goNext() {
  if (answers[current] === null) return;
  if (current < QUESTIONS.length - 1) { current++; renderQuestion(); }
  else showResult();
}

function getResult() {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(a => { if (a) counts[a]++; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] === sorted[1][1]) {
    const pair = [sorted[0][0], sorted[1][0]].sort().join('');
    return { type: 'mixed', pair, counts };
  }
  return { type: 'single', profile: sorted[0][0], counts };
}

function showResult() {
  const result = getResult();
  const el = document.getElementById('result-content');

  if (result.type === 'mixed') {
    const m = MIXED[result.pair] || { name: 'Perfil mixto', desc: 'Combinas rasgos de dos perfiles complementarios.' };
    const pA = PROFILES[result.pair[0]];
    const pB = PROFILES[result.pair[1]];
    el.innerHTML = `
      <div class="result-header">
        <div class="result-eyebrow">Tu perfil SINERG.ia</div>
        <div class="result-icon-badge">✦</div>
        <h2 class="result-profile-name"><em>${m.name}</em></h2>
        <p class="result-desc">${m.desc}</p>
      </div>
      <div class="result-divider"></div>
      <div class="mantra-block">
        <div class="mantra-text">"Lo importante no es encajar perfecto en un perfil.<br>Lo importante es entender desde dónde estás llegando a la IA."<br><em style="font-size:0.85rem; opacity:0.7;">— SINERG.ia</em></div>
      </div>
      <div class="mixed-profiles">
        <div class="mixed-card">
          <div class="mixed-card-label">Tu lado ${result.pair[0] === 'A' ? 'creativo' : result.pair[0] === 'B' ? 'curioso' : result.pair[0] === 'C' ? 'crítico' : 'práctico'}</div>
          <div class="mixed-card-name">${pA.name}</div>
          <div class="mixed-card-text">${pA.cuidar}</div>
        </div>
        <div class="mixed-card">
          <div class="mixed-card-label">Tu lado ${result.pair[1] === 'A' ? 'creativo' : result.pair[1] === 'B' ? 'curioso' : result.pair[1] === 'C' ? 'crítico' : 'práctico'}</div>
          <div class="mixed-card-name">${pB.name}</div>
          <div class="mixed-card-text">${pB.cuidar}</div>
        </div>
      </div>
      <div class="result-footer">
        <p class="cta-text">Escucha el episodio 2 de <strong>SINERG.ia</strong>: <em>¿La IA piensa?</em> y cuéntanos en los comentarios qué perfil te tocó 👇</p>
        <button class="restart-btn" onclick="startQuiz()">Repetir el quiz</button>
      </div>
    `;
  } else {
    const p = PROFILES[result.profile];
    el.innerHTML = `
      <div class="result-header">
        <div class="result-eyebrow">Tu perfil SINERG.ia</div>
        <div class="result-icon-badge">${p.icon}</div>
        <h2 class="result-profile-name"><em>${p.name}</em></h2>
        <p class="result-desc">${p.desc}</p>
      </div>
      <div class="result-divider"></div>
      <div class="result-section">
        <div class="section-label">Cómo usar mejor la IA</div>
        <div class="section-text">${p.usar}</div>
      </div>
      <div class="result-section">
        <div class="section-label">Qué tener en cuenta</div>
        <div class="section-text">${p.cuidar}</div>
      </div>
      <div class="mantra-block">
        <div class="mantra-text">${p.mantra}</div>
      </div>
      <div class="primer-paso">
        <div class="primer-label">✦ Primer paso práctico</div>
        <div class="primer-text">${p.paso}</div>
      </div>
      <div class="result-footer">
        <p class="cta-text">Escucha el episodio 2 de <strong>SINERG.ia</strong>: <em>¿La IA piensa? Lo que nadie te dice sobre la diferencia entre inteligencia artificial e inteligencia humana</em> y cuéntanos en los comentarios qué perfil te tocó 👇</p>
        <button class="restart-btn" onclick="startQuiz()">Repetir el quiz</button>
        <button class="social-btn" href="https://www.instagram.com/lasinerg.ia">Siguenos en Instagram</button>
      </div>
      
    `;
  }

  showScreen('result');
}