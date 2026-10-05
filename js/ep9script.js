(function () {
  'use strict';
  
  var SDD_CONFIG = {
    // Aquí está la URL de tu App Script
    endpoint: 'https://script.google.com/macros/s/AKfycbynM0vbe56nPTeRQVBzo_GeYhye5PzQVYl34CmU1Y5PD2TCJIU6-G9OSm65GAb82hQo/exec',
    privacyUrl: ''
  };
  
  var root = document.getElementById('sinergia-dieta-digital');
  if (!root) return;

  // Utilizamos getElementById para asegurar que siempre encuentre los elementos
  function $(id) { return document.getElementById(id); }

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
    { id: 'aprender', label: 'Aprender algo útil 🧠', goal: 'aprender algo útil' },
    { id: 'inspirar', label: 'Inspirarme y crear ✨', goal: 'inspirarte y crear' },
    { id: 'informar', label: 'Informarme mejor 📰', goal: 'informarte mejor' },
    { id: 'sentir', label: 'Sentirme mejor después de usarlo 🌿', goal: 'sentirte mejor después de usar tu feed' },
    { id: 'descubrir', label: 'Descubrir herramientas, ideas y oportunidades 🔎', goal: 'descubrir herramientas, ideas y oportunidades' },
    { id: 'entretener', label: 'Entretenerme sin sentir que perdí el día 😂', goal: 'entretenerte sin sentir que perdiste el día' }
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

  /* ---------- estado ---------- */
  var state = { mas: [], menos: [], q3: '', q4: '', q5: '', user: { name: '', country: '', email: '' } };

  var screens = ['sdd-screen-intro', 'sdd-screen-q1', 'sdd-screen-q2', 'sdd-screen-q3', 'sdd-screen-q4', 'sdd-screen-q5', 'sdd-screen-result'];
  var questionScreens = ['sdd-screen-q1', 'sdd-screen-q2', 'sdd-screen-q3', 'sdd-screen-q4', 'sdd-screen-q5'];

function showScreen(id, noScroll) {
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
    
    // FIX 1: Forzamos repintado para evitar que los botones queden invisibles
    setTimeout(function() {
      var activeScreen = $(id);
      if(activeScreen) {
        var optionsContainer = activeScreen.querySelector('.sdd-options');
        if(optionsContainer) {
           optionsContainer.style.display = 'none';
           optionsContainer.offsetHeight; // Forzamos reflow
           optionsContainer.style.display = ''; 
        }
      }
    }, 10);

    // FIX 2: Liberamos la altura del acordeón padre para que no corte el resultado
    setTimeout(function() {
      var accordionBody = root.closest('.episode-body');
      if (accordionBody) {
        // Al poner 'none', el acordeón se estirará todo lo que el contenido necesite
        accordionBody.style.maxHeight = 'none';
      }
    }, 50);

    if (!noScroll) { root.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  function buildMultiOptions(containerId, options, key, counterId, nextBtnId) {
    var container = $(containerId);
    if(!container) return;
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

  function buildSingleOptions(containerId, options, key, nextBtnId) {
    var container = $(containerId);
    if(!container) return;
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

  function buildResult() {
    $('sdd-result-for').textContent = state.user.name ? 'Hecha para ' + state.user.name : '';
    var goalOpt = Q4_OPTS.filter(function (o) { return o.id === state.q4; })[0];
    $('sdd-result-objetivo').textContent = 'Tu objetivo: ' + (goalOpt ? goalOpt.goal : '') + '.';

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

  function setError(fieldId, errId, msg) {
    var f = $(fieldId);
    $(errId).textContent = msg || '';
    if (msg) { f.setAttribute('aria-invalid', 'true'); } else { f.removeAttribute('aria-invalid'); }
  }

  function clearForm() {
    $('sdd-name').value = '';
    $('sdd-country').value = '';
    $('sdd-email').value = '';
    $('sdd-website').value = '';
    $('sdd-consent').checked = false;
    $('sdd-result-for').textContent = '';
    setError('sdd-name', 'sdd-name-err', '');
    setError('sdd-country', 'sdd-country-err', '');
    setError('sdd-email', 'sdd-email-err', '');
    setError('sdd-consent', 'sdd-consent-err', '');
  }

  function validateForm() {
    var name = $('sdd-name').value.replace(/\s+/g, ' ').trim();
    var country = $('sdd-country').value;
    var email = $('sdd-email').value.trim();
    var consent = $('sdd-consent').checked;
    var first = null;

    function check(ok, id, errId, msg) {
      setError(id, errId, ok ? '' : msg);
      if (!ok && !first) first = id;
    }
    check(name.length >= 2, 'sdd-name', 'sdd-name-err', 'Cuéntanos tu nombre (mínimo 2 letras).');
    check(country !== '', 'sdd-country', 'sdd-country-err', 'Selecciona tu país.');
    check(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email), 'sdd-email', 'sdd-email-err', 'Escribe un correo válido, por ejemplo nombre@correo.com.');
    check(consent, 'sdd-consent', 'sdd-consent-err', 'Necesitamos tu aceptación para continuar.');

    if (first) { $(first).focus(); return null; }
    return { name: name, country: country, email: email };
  }

  function onStart() {
    var user = validateForm();
    if (!user) return;
    state.user = user;
    // Se removió el envío anticipado para consolidar todo al final
    showScreen('sdd-screen-q1');
  }

  var lastImageUrl = null;
  var IMG_TIPS = {
    comenta: { title: '👀 Tu reto especial', text: 'Cuando algo solo te dé rabia, no conviertas el comentario en otra señal de atención. Pasa de largo o usa "No me interesa".' },
    comparte: { title: '👀 Tu reto especial', text: 'Antes de compartir algo solo para criticarlo, pregúntate: ¿quiero seguir dándole atención a este tema?' },
    pasa: { title: '✨ Vas bien', text: 'No le regalas demasiada atención a lo que no quieres ver. Para una señal más explícita, usa "No me interesa".' },
    silencia: { title: '✨ Ya das señales intencionales', text: 'Tu reto ahora: además de reducir lo que no quieres, alimenta activamente los temas que sí quieres ver.' }
  };

  var SERIF = '"Source Serif 4", Georgia, "Times New Roman", serif';
  var SANS = '"Source Sans 3", "Source Sans Pro", "Segoe UI", Helvetica, Arial, sans-serif';
  var SCRIPT = '"Dancing Script", "Brush Script MT", cursive';

  function joinList(arr) {
    if (arr.length <= 1) return arr.join('');
    return arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1];
  }

  function wrapLines(ctx, text, maxW) {
    var words = text.split(' ');
    var lines = [];
    var line = '';
    words.forEach(function (w) {
      var test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawDietImage(ctx, W, H, d, isFinal) {
    var C = { cream: '#FBF5EF', purple: '#665A9C', lilac: '#928AC2', pink: '#F7C4E9', blush: '#FBDAD2', dark: '#2D2D2D', white: '#FFFFFF' };
    var P = 72;
    var IW = W - P * 2;
    var y = 0;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.cream;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = C.pink;
    ctx.fillRect(0, 0, W, 18);

    function chipsCard(title, items, bg, fg) {
      ctx.font = '700 32px ' + SANS;
      var innerW = IW - 72;
      var rows = [[]];
      var rowW = 0;
      items.forEach(function (t) {
        var w = ctx.measureText(t).width + 48;
        if (rows[rows.length - 1].length && rowW + w > innerW) { rows.push([]); rowW = 0; }
        rows[rows.length - 1].push({ t: t, w: w });
        rowW += w + 14;
      });
      var cardH = 92 + rows.length * 62 + (rows.length - 1) * 14 + 36;
      ctx.fillStyle = C.white;
      rrect(ctx, P, y, IW, cardH, 32);
      ctx.fill();
      ctx.fillStyle = C.purple;
      ctx.font = '700 26px ' + SANS;
      ctx.fillText(title, P + 36, y + 62);
      var cy = y + 92;
      rows.forEach(function (row) {
        var cx = P + 36;
        row.forEach(function (c) {
          ctx.fillStyle = bg;
          rrect(ctx, cx, cy, c.w, 62, 31);
          ctx.fill();
          ctx.fillStyle = fg;
          ctx.font = '700 32px ' + SANS;
          ctx.fillText(c.t, cx + 24, cy + 42);
          cx += c.w + 14;
        });
        cy += 62 + 14;
      });
      y += cardH + 28;
    }

    function textCard(title, text, bg, accent) {
      ctx.font = '400 31px ' + SANS;
      var lines = wrapLines(ctx, text, IW - 88);
      var cardH = 112 + (lines.length - 1) * 44 + 44;
      ctx.fillStyle = bg;
      rrect(ctx, P, y, IW, cardH, 28);
      ctx.fill();
      if (accent) {
        ctx.save();
        rrect(ctx, P, y, IW, cardH, 28);
        ctx.clip();
        ctx.fillStyle = accent;
        ctx.fillRect(P, y, 14, cardH);
        ctx.restore();
      }
      ctx.fillStyle = C.dark;
      ctx.font = '700 38px ' + SERIF;
      ctx.fillText(title, P + 44, y + 68);
      ctx.font = '400 31px ' + SANS;
      ctx.fillStyle = '#3d3d3d';
      lines.forEach(function (ln, i) { ctx.fillText(ln, P + 44, y + 120 + i * 44); });
      y += cardH + 26;
    }

    y = 124;
    ctx.fillStyle = C.purple;
    ctx.font = '700 26px ' + SANS;
    ctx.fillText('EPISODIO 9 · ACTIVIDAD SINERG.ia', P, y);
    y += 104;
    ctx.fillStyle = C.dark;
    ctx.font = '700 90px ' + SERIF;
    var tw = ctx.measureText('Tu dieta digital').width;
    ctx.fillText('Tu dieta digital', P, y);
    ctx.fillStyle = C.purple;
    ctx.fillText(' ✦', P + tw, y);

    if (d.name) {
      y += 66;
      var nmSize = 46;
      var nmText = 'Hecha para ' + d.name;
      ctx.font = '600 ' + nmSize + 'px ' + SCRIPT;
      while (ctx.measureText(nmText).width > IW && nmSize > 26) {
        nmSize -= 2;
        ctx.font = '600 ' + nmSize + 'px ' + SCRIPT;
      }
      ctx.fillStyle = C.purple;
      ctx.fillText(nmText, P, y);
    }

    y += 40;
    ctx.fillStyle = C.dark;
    ctx.font = '600 40px ' + SANS;
    wrapLines(ctx, 'Tu objetivo: ' + d.goal + '.', IW).forEach(function (ln) {
      y += 54;
      ctx.fillText(ln, P, y);
    });

    y += 36;
    ctx.font = '700 30px ' + SANS;
    var pillText = 'Plataforma del experimento: ' + d.plat;
    var pw = ctx.measureText(pillText).width + 56;
    ctx.fillStyle = C.purple;
    rrect(ctx, P, y, pw, 64, 32);
    ctx.fill();
    ctx.fillStyle = C.white;
    ctx.fillText(pillText, P + 28, y + 42);
    y += 64 + 44;

    chipsCard('QUIERO MÁS', d.mas, C.blush, C.dark);
    chipsCard('QUIERO MENOS', d.menos, C.purple, C.white);

    y += 34;
    ctx.fillStyle = C.dark;
    ctx.font = '700 48px ' + SERIF;
    ctx.fillText('Tu plan personalizado de 3 días', P, y);
    y += 40;
    d.days.forEach(function (day) { textCard(day.title, day.text, C.white, C.purple); });

    if (d.tip) textCard(d.tip.title, d.tip.text, C.pink, null);

    y += 10;
    var phrase = 'Tu algoritmo aprende de lo que consumes. Alimenta también aquello que quieres que crezca.';
    ctx.font = '600 38px ' + SERIF;
    var pl = wrapLines(ctx, phrase, IW - 110);
    var firstB = y + 88;
    var scriptB = firstB + (pl.length - 1) * 54 + 84;
    var boxH = scriptB - y + 52;
    ctx.fillStyle = C.dark;
    rrect(ctx, P, y, IW, boxH, 32);
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.fillStyle = C.cream;
    ctx.font = '600 38px ' + SERIF;
    pl.forEach(function (ln, i) { ctx.fillText(ln, W / 2, firstB + i * 54); });
    var sig = '✦ La IA no nos reemplaza. Nos potencia.';
    var sigSize = 48;
    ctx.font = '600 ' + sigSize + 'px ' + SCRIPT;
    while (ctx.measureText(sig).width > IW - 80 && sigSize > 28) {
      sigSize -= 2;
      ctx.font = '600 ' + sigSize + 'px ' + SCRIPT;
    }
    ctx.fillStyle = C.pink;
    ctx.fillText(sig, W / 2, scriptB);
    y += boxH;

    var footerY = y + 74;
    if (isFinal) footerY = Math.max(footerY, H - 64);
    ctx.fillStyle = C.purple;
    ctx.font = '700 28px ' + SANS;
    ctx.fillText('lasinergia.com.co', W / 2, footerY);
    return footerY + 60;
  }

  function renderDietImage(d) {
    var W = 1080;
    var tmp = document.createElement('canvas');
    tmp.width = W;
    tmp.height = 4500;
    var endY = drawDietImage(tmp.getContext('2d'), W, 4500, d, false);
    var H = Math.max(1920, Math.ceil(endY));
    var cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    drawDietImage(cv.getContext('2d'), W, H, d, true);
    return cv;
  }

  function findOpt(list, id) {
    return list.filter(function (o) { return o.id === id; })[0];
  }

  function buildImageData() {
    var goal = findOpt(Q4_OPTS, state.q4);
    var mas = state.mas.map(function (id) { return findOpt(MAS_OPTS, id); });
    var menos = state.menos.map(function (id) { return findOpt(MENOS_OPTS, id); });
    var plat = labelFor(Q5_OPTS, state.q5);
    var masL = mas.map(function (o) { return o.label; });
    var menosL = menos.map(function (o) { return o.label; });
    return {
      name: state.user.name,
      goal: goal ? goal.goal : '',
      plat: plat,
      mas: mas.map(function (o) { return o.emoji + ' ' + o.label; }),
      menos: menos.map(function (o) { return o.emoji + ' ' + o.label; }),
      days: [
        { title: 'Día 1 — Limpia 🔎', text: 'Abre ' + plat + ' y mira los primeros 10 contenidos recomendados. Si aparece ' + joinList(menosL) + ', evita interactuar solo por rabia o curiosidad y usa "No me interesa", silenciar o dejar de seguir cuando tenga sentido.' },
        { title: 'Día 2 — Alimenta 🌱', text: 'Busca activamente ' + joinList(masL) + '. Haz al menos 3 acciones: buscar el tema, seguir una cuenta que aporte, guardar algo útil, ver completo lo que te interese o compartir lo que te sirvió.' },
        { title: 'Día 3 — Compara ✦', text: 'Vuelve a abrir ' + plat + ' y mira otra vez los primeros 10 contenidos. ¿Apareció más de lo que elegiste? ¿Menos de lo que querías reducir? Tu comportamiento también participa en lo que ves.' }
      ],
      tip: IMG_TIPS[state.q3] || null
    };
  }

  function clearPreview() {
    if (lastImageUrl && lastImageUrl.indexOf('blob:') === 0) { URL.revokeObjectURL(lastImageUrl); }
    lastImageUrl = null;
    var img = $('sdd-preview');
    if (img) img.removeAttribute('src');
    $('sdd-preview-wrap').style.display = 'none';
    $('sdd-download-status').textContent = '';
    $('sdd-download-btn').disabled = false;
  }

  function deliverImage(url) {
    if (lastImageUrl && lastImageUrl.indexOf('blob:') === 0) { URL.revokeObjectURL(lastImageUrl); }
    lastImageUrl = url;
    var a = document.createElement('a');
    a.href = url;
    a.download = 'mi-dieta-digital-sinergia.jpg';
    a.style.display = 'none';
    root.appendChild(a);
    a.click();
    root.removeChild(a);
    $('sdd-preview').src = url;
    $('sdd-preview-wrap').style.display = 'block';
    $('sdd-download-status').textContent = '¡Listo! Si la descarga no empezó sola, mantén presionada la imagen de abajo y elige "Guardar imagen".';
    $('sdd-download-btn').disabled = false;
  }

  function onDownload() {
    var btn = $('sdd-download-btn');
    var status = $('sdd-download-status');
    btn.disabled = true;
    status.textContent = 'Preparando tu imagen…';

    function fail() {
      status.textContent = 'No pudimos generar la imagen. Inténtalo de nuevo en unos segundos.';
      btn.disabled = false;
    }

    var d = buildImageData();
    var fontsReady = Promise.resolve();
    if (document.fonts && document.fonts.load) {
      fontsReady = Promise.race([
        Promise.all([
          document.fonts.load('700 40px "Source Serif 4"'),
          document.fonts.load('400 30px "Source Sans 3"'),
          document.fonts.load('700 30px "Source Sans 3"'),
          document.fonts.load('600 40px "Dancing Script"')
        ]),
        new Promise(function (res) { setTimeout(res, 2500); })
      ]).catch(function () {});
    }
    fontsReady.then(function () {
      var cv = renderDietImage(d);
      if (cv.toBlob) {
        cv.toBlob(function (blob) {
          if (!blob) { fail(); return; }
          deliverImage(URL.createObjectURL(blob));
        }, 'image/jpeg', 0.92);
      } else {
        deliverImage(cv.toDataURL('image/jpeg', 0.92));
      }
    }).catch(fail);
  }

  function resetAll(noScroll) {
    state = { mas: [], menos: [], q3: '', q4: '', q5: '', user: { name: '', country: '', email: '' } };
    clearForm();
    buildMultiOptions('sdd-q1-options', MAS_OPTS, 'mas', 'sdd-q1-counter', 'sdd-q1-next');
    buildMultiOptions('sdd-q2-options', MENOS_OPTS, 'menos', 'sdd-q2-counter', 'sdd-q2-next');
    buildSingleOptions('sdd-q3-options', Q3_OPTS, 'q3', 'sdd-q3-next');
    buildSingleOptions('sdd-q4-options', Q4_OPTS, 'q4', 'sdd-q4-next');
    buildSingleOptions('sdd-q5-options', Q5_OPTS, 'q5', 'sdd-q5-next');
    $('sdd-q3-next').disabled = true;
    $('sdd-q4-next').disabled = true;
    $('sdd-q5-next').disabled = true;
    clearPreview();
    showScreen('sdd-screen-intro', noScroll);
  }

  /* ---------- navegación ---------- */
  root.querySelectorAll('[data-back]').forEach(function (btn) {
    btn.addEventListener('click', function () { showScreen(btn.dataset.back); });
  });

  $('sdd-start-btn').addEventListener('click', onStart);
  ['sdd-name', 'sdd-email'].forEach(function (id) {
    $(id).addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); onStart(); }
    });
  });
  $('sdd-q1-next').addEventListener('click', function () { showScreen('sdd-screen-q2'); });
  $('sdd-q2-next').addEventListener('click', function () { showScreen('sdd-screen-q3'); });
  $('sdd-q3-next').addEventListener('click', function () { showScreen('sdd-screen-q4'); });
  $('sdd-q4-next').addEventListener('click', function () { showScreen('sdd-screen-q5'); });
  
  $('sdd-q5-next').addEventListener('click', function () {
    buildResult();
    showScreen('sdd-screen-result');

    var payload = {
      nombre: state.user.name,
      pais: state.user.country,
      correo: state.user.email,
      mas: state.mas,
      menos: state.menos,
      q3: state.q3,
      q4: state.q4,
      q5: state.q5
    };

    if (SDD_CONFIG.endpoint) {
      fetch(SDD_CONFIG.endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      }).catch(function(err) { console.error('Error:', err); });
    }
  });

  $('sdd-restart-btn').addEventListener('click', function () { resetAll(false); });
  $('sdd-download-btn').addEventListener('click', onDownload);

  /* ---------- inicializar ---------- */
  if (SDD_CONFIG.privacyUrl) {
    var privLink = document.createElement('a');
    privLink.href = SDD_CONFIG.privacyUrl;
    privLink.target = '_blank';
    privLink.rel = 'noopener';
    privLink.textContent = 'Política de privacidad';
    $('sdd-privacy-slot').appendChild(document.createTextNode(' '));
    $('sdd-privacy-slot').appendChild(privLink);
  }
  
  resetAll(true);
})();