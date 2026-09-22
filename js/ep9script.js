(function () {
  'use strict';
  var root = document.getElementById('sinergia-dieta-digital');
  if (!root) return;

  /* ---------- datos ---------- */
  var MAS_OPTS = [
    { id: 'ia', label: 'IA y tecnología', emoji: '🤖' },
    { id: 'creatividad', label: 'Creatividad', emoji: '🎨' },
    { id: 'aprendizaje', label: 'Aprendizaje', emoji: '🧠' },
    { id: 'bienestar', label: 'Bienestar', emoji: '🌿' },
    { id: 'finanzas', label: 'Finanzas', emoji: '💰' },
    { id: 'noticias', label: 'Noticias y contexto', emoji: '📰' },
    { id: 'trabajo', label: 'Trabajo / negocio', emoji: '💼' },
    { id: 'libros', label: 'Libros', emoji: '📚' },
    { id: 'musica', label: 'Música y cultura', emoji: '🎵' },
    { id: 'recetas', label: 'Recetas / hobbies', emoji: '🍳' }
  ];
  var MENOS_OPTS = [
    { id: 'polemica', label: 'Polémica y peleas', emoji: '🔥' },
    { id: 'compras', label: 'Compras impulsivas', emoji: '🛍️' },
    { id: 'noticiasneg', label: 'Noticias negativas', emoji: '📰' },
    { id: 'chisme', label: 'Chisme', emoji: '👀' },
    { id: 'repetitivo', label: 'Contenido repetitivo', emoji: '🔁' },
    { id: 'comparacion', label: 'Comparación / apariencia', emoji: '🪞' },
    { id: 'rabia', label: 'Contenido que me da rabia', emoji: '😤' },
    { id: 'distraccion', label: 'Distracción infinita', emoji: '♾️' },
    { id: 'publicidad', label: 'Publicidad que no me interesa', emoji: '📢' },
    { id: 'temasviejos', label: 'Temas que ya no me representan', emoji: '🧹' }
  ];
  var Q3_OPTS = [
    { id: 'comenta', label: 'Entro a comentarios o respondo 😅' },
    { id: 'comparte', label: 'Lo comparto para comentarlo con alguien' },
    { id: 'pasa', label: 'Paso rápido y sigo' },
    { id: 'silencia', label: 'Uso "No me interesa", silencio o dejo de seguir' }
  ];
  var Q4_OPTS = [
    { id: 'aprender', label: 'Aprender algo útil 🧠' },
    { id: 'inspirar', label: 'Inspirarme y crear ✨' },
    { id: 'informar', label: 'Informarme mejor 📰' },
    { id: 'sentir', label: 'Sentirme mejor después de usarlo 🌿' },
    { id: 'descubrir', label: 'Descubrir herramientas, ideas y oportunidades 🔎' },
    { id: 'entretener', label: 'Entretenerme sin sentir que perdí el día 😂' }
  ];
  var Q5_OPTS = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'youtube', label: 'YouTube' }
  ];

  var CHALLENGES = {
    comenta: {
      title: '👀 Tu reto especial',
      text: 'Cuando algo solo te dé rabia, prueba no convertir el comentario en otra señal de atención. No necesitas ganar todas las discusiones de internet 😂. Si realmente no quieres verlo, pasa de largo o utiliza una herramienta como "No me interesa".'
    },
    comparte: {
      title: '👀 Tu reto especial',
      text: 'Antes de compartir algo solamente para criticarlo, pregúntate: ¿quiero seguir dándole atención a este tema? Compartir también puede mantener ese contenido circulando dentro de tu experiencia digital.'
    },
    pasa: {
      title: '✨ Vas bien',
      text: 'Ya haces algo importante: no regalarle demasiada atención a contenido que no quieres consumir. Cuando quieras dar una señal todavía más explícita, puedes utilizar herramientas como "No me interesa".'
    },
    silencia: {
      title: '✨ Ya estás dando señales intencionales',
      text: 'Ahora tu reto está del otro lado: no solamente reducir lo que no quieres, sino alimentar activamente los temas que sí quieres que aparezcan.'
    }
  };

  /* ---------- estado (en memoria, sin localStorage) ---------- */
  var state = { mas: [], menos: [], q3: '', q4: '', q5: '' };

  var screens = ['sdd-screen-intro', 'sdd-screen-q1', 'sdd-screen-q2', 'sdd-screen-q3', 'sdd-screen-q4', 'sdd-screen-q5', 'sdd-screen-result'];
  var questionScreens = ['sdd-screen-q1', 'sdd-screen-q2', 'sdd-screen-q3', 'sdd-screen-q4', 'sdd-screen-q5'];

  function $(id) { return root.querySelector('#' + id); }

  function showScreen(id) {
    screens.forEach(function (s) {
      var el = $(s);
      if (!el) return;
      el.classList.toggle('sdd-active', s === id);
    });
    var progressWrap = $('sdd-progress-wrap');
    var qIndex = questionScreens.indexOf(id);
    if (qIndex > -1) {
      progressWrap.classList.add('sdd-show');
      $('sdd-progress-label').textContent = 'Pregunta ' + (qIndex + 1) + ' de 5';
      $('sdd-progress-fill').style.width = (((qIndex + 1) / 5) * 100) + '%';
    } else {
      progressWrap.classList.remove('sdd-show');
    }
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- construir opciones multi-selección (máx 3) ---------- */
  function buildMultiOptions(containerId, options, key, counterId, nextBtnId) {
    var container = $(containerId);
    container.innerHTML = '';
    options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sdd-option';
      btn.setAttribute('aria-pressed', 'false');
      btn.dataset.id = opt.id;
      btn.innerHTML = '<span class="sdd-emoji" aria-hidden="true">' + opt.emoji + '</span><span>' + opt.label + '</span>';
      btn.addEventListener('click', function () {
        var arr = state[key];
        var idx = arr.indexOf(opt.id);
        if (idx > -1) {
          arr.splice(idx, 1);
        } else {
          if (arr.length >= 3) return;
          arr.push(opt.id);
        }
        btn.setAttribute('aria-pressed', idx > -1 ? 'false' : 'true');
        updateMultiState(containerId, options, key, counterId, nextBtnId);
      });
      container.appendChild(btn);
    });
    updateMultiState(containerId, options, key, counterId, nextBtnId);
  }

  function updateMultiState(containerId, options, key, counterId, nextBtnId) {
    var arr = state[key];
    $(counterId).textContent = arr.length + '/3';
    $(nextBtnId).disabled = arr.length !== 3;
    var buttons = $(containerId).querySelectorAll('.sdd-option');
    buttons.forEach(function (btn) {
      var selected = arr.indexOf(btn.dataset.id) > -1;
      btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
      btn.disabled = !selected && arr.length >= 3;
    });
  }

  /* ---------- construir opciones de selección única ---------- */
  function buildSingleOptions(containerId, options, key, nextBtnId) {
    var container = $(containerId);
    container.innerHTML = '';
    options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sdd-option';
      btn.setAttribute('aria-pressed', 'false');
      btn.dataset.id = opt.id;
      btn.innerHTML = '<span>' + opt.label + '</span>';
      btn.addEventListener('click', function () {
        state[key] = opt.id;
        var buttons = container.querySelectorAll('.sdd-option');
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        $(nextBtnId).disabled = false;
      });
      container.appendChild(btn);
    });
  }

  function labelFor(list, id) {
    var found = list.filter(function (o) { return o.id === id; })[0];
    return found ? found.label : '';
  }

  function buildTagList(elId, ids, list) {
    var ul = $(elId);
    ul.innerHTML = '';
    ids.forEach(function (id) {
      var opt = list.filter(function (o) { return o.id === id; })[0];
      if (!opt) return;
      var li = document.createElement('li');
      li.textContent = (opt.emoji ? opt.emoji + ' ' : '') + opt.label;
      ul.appendChild(li);
    });
  }

  /* ---------- construir resultado dinámico ---------- */
  function buildResult() {
    var objetivoLabel = labelFor(Q4_OPTS, state.q4).replace(/\s[✨🧠📰🌿🔎😂]$/,'');
    $('sdd-result-objetivo').textContent = 'Tu objetivo: ' + objetivoLabel.toLowerCase() + '.';

    buildTagList('sdd-tags-mas', state.mas, MAS_OPTS);
    buildTagList('sdd-tags-menos', state.menos, MENOS_OPTS);
    $('sdd-tag-plataforma').textContent = labelFor(Q5_OPTS, state.q5);

    var masLabels = state.mas.map(function (id) { return labelFor(MAS_OPTS, id); });
    var menosLabels = state.menos.map(function (id) { return labelFor(MENOS_OPTS, id); });
    var plataforma = labelFor(Q5_OPTS, state.q5);

    $('sdd-day1-text').textContent =
      'Abre ' + plataforma + ' y mira los primeros 10 contenidos recomendados de tu feed. Cuando aparezcan contenidos relacionados con ' +
      menosLabels.join(', ') + ', observa qué haces normalmente. Si realmente no quieres seguir viendo ese tipo de contenido, evita quedarte interactuando solo por rabia o curiosidad. Cuando tenga sentido, utiliza herramientas como "No me interesa", silenciar o dejar de seguir. No queremos borrar medio internet 😂. Solo empezar a dar señales un poquito más claras.';

    $('sdd-day2-intro').textContent =
      'Hoy vamos a alimentar lo que sí quieres que crezca. Busca activamente contenido sobre ' + masLabels.join(', ') + '. Haz al menos 3 de estas acciones:';

    $('sdd-day3-text').textContent = 'Vuelve a abrir ' + plataforma + '. Mira nuevamente los primeros 10 contenidos recomendados. Ahora pregúntate:';

    var challenge = CHALLENGES[state.q3];
    var box = $('sdd-challenge-box');
    if (challenge) {
      box.innerHTML = '<strong>' + challenge.title + '</strong>' + challenge.text;
    } else {
      box.innerHTML = '';
    }
  }

  /* ---------- reinicio total ---------- */
  function resetAll() {
    state = { mas: [], menos: [], q3: '', q4: '', q5: '' };
    buildMultiOptions('sdd-q1-options', MAS_OPTS, 'mas', 'sdd-q1-counter', 'sdd-q1-next');
    buildMultiOptions('sdd-q2-options', MENOS_OPTS, 'menos', 'sdd-q2-counter', 'sdd-q2-next');
    buildSingleOptions('sdd-q3-options', Q3_OPTS, 'q3', 'sdd-q3-next');
    buildSingleOptions('sdd-q4-options', Q4_OPTS, 'q4', 'sdd-q4-next');
    buildSingleOptions('sdd-q5-options', Q5_OPTS, 'q5', 'sdd-q5-next');
    $('sdd-q3-next').disabled = true;
    $('sdd-q4-next').disabled = true;
    $('sdd-q5-next').disabled = true;
    showScreen('sdd-screen-intro');
  }

  /* ---------- navegación ---------- */
  root.querySelectorAll('[data-back]').forEach(function (btn) {
    btn.addEventListener('click', function () { showScreen(btn.dataset.back); });
  });

  $('sdd-start-btn').addEventListener('click', function () { showScreen('sdd-screen-q1'); });
  $('sdd-q1-next').addEventListener('click', function () { showScreen('sdd-screen-q2'); });
  $('sdd-q2-next').addEventListener('click', function () { showScreen('sdd-screen-q3'); });
  $('sdd-q3-next').addEventListener('click', function () { showScreen('sdd-screen-q4'); });
  $('sdd-q4-next').addEventListener('click', function () { showScreen('sdd-screen-q5'); });
  $('sdd-q5-next').addEventListener('click', function () {
    buildResult();
    showScreen('sdd-screen-result');
  });
  $('sdd-restart-btn').addEventListener('click', resetAll);

  /* ---------- inicializar ---------- */
  resetAll();
})();