const EXERCISES = {
  supino: {
    title: 'Supino Máquina',
    subtitle: 'Peito, tríceps e ombros anteriores.',
    video: 'videos/supino.mp4',
    poster: 'img/poster-padrao.png',
    muscles: ['Peitoral maior', 'Tríceps', 'Deltoide anterior'],
    tips: [
      'Mantenha os pés firmes no chão.',
      'Empurre de forma controlada, sem travar os cotovelos.',
      'Desça o movimento com controle.'
    ],
    errors: [
      'Levantar o quadril do banco.',
      'Fazer o movimento rápido demais.',
      'Abrir os cotovelos em excesso.'
    ],
    warning: 'Use uma carga compatível com seu nível. Em caso de dor ou desconforto, pare o exercício e procure um instrutor.'
  },
  legpress: {
    title: 'Leg Press 45°',
    subtitle: 'Quadríceps, glúteos e posteriores.',
    video: 'videos/legpress.mp4',
    poster: 'img/poster-padrao.png',
    muscles: ['Quadríceps', 'Glúteos', 'Posteriores da coxa'],
    tips: [
      'Apoie a lombar no encosto.',
      'Empurre pela planta dos pés.',
      'Desça até a amplitude segura para você.'
    ],
    errors: [
      'Tirar a lombar do banco.',
      'Fechar muito os joelhos.',
      'Descer mais do que sua mobilidade permite.'
    ],
    warning: 'Nunca solte a trava sem estar posicionado corretamente. Procure orientação antes de aumentar a carga.'
  },
  puxada: {
    title: 'Puxada Frontal',
    subtitle: 'Costas e bíceps.',
    video: 'videos/puxada.mp4',
    poster: 'img/poster-padrao.png',
    muscles: ['Latíssimo do dorso', 'Bíceps', 'Redondo maior'],
    tips: [
      'Mantenha o peito aberto.',
      'Puxe a barra em direção à parte alta do peito.',
      'Retorne devagar, controlando a subida.'
    ],
    errors: [
      'Puxar atrás da nuca.',
      'Balançar o tronco para roubar no movimento.',
      'Subir a barra de uma vez.'
    ],
    warning: 'Evite compensações com a lombar. Se estiver começando, peça ajuste de carga a um instrutor.'
  },
  nenem: {
    title: 'Arremesso de Nena',
    subtitle: 'Costas e bíceps.',
    video: 'videos/nenem.mp4',
    poster: 'img/poster-padrao.png',
    muscles: ['Latíssimo do dorso', 'Bíceps', 'Redondo maior'],
    tips: [
      'mantenha as maos firmes.',
      'nao deixe o nenem cair.',
      'nao jogue muito alto.'
    ],
    errors: [
      'derrubar o nenem no chao.',
      'Balançar o tronco para roubar no movimento.',
      'machucar o nenem.'
    ],
    warning: 'Evite compensações com a lombar. Se estiver começando, peça ajuda a um instrutor.'
  }
};

function qs(selector) {
  return document.querySelector(selector);
}

function getExerciseKey() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('ex') || 'supino').toLowerCase().trim();
}

function setList(selector, items) {
  const el = qs(selector);
  el.innerHTML = '';

  if (!items || !items.length) {
    el.innerHTML = '<li class="empty">Sem informações cadastradas.</li>';
    return;
  }

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    el.appendChild(li);
  });
}

function renderExerciseLinks() {
  const box = qs('#exerciseLinks');
  box.innerHTML = '';

  Object.entries(EXERCISES).forEach(([key, item]) => {
    const a = document.createElement('a');
    a.className = 'exercise-link';
    a.href = `?ex=${encodeURIComponent(key)}`;
    a.innerHTML = `<strong>${item.title}</strong><small>${window.location.origin}${window.location.pathname}?ex=${key}</small>`;
    box.appendChild(a);
  });
}

function renderExercise() {
  const key = getExerciseKey();
  const item = EXERCISES[key] || EXERCISES.supino;

  qs('#exerciseTitle').textContent = item.title;
  qs('#exerciseSubtitle').textContent = item.subtitle;

  const video = qs('#exerciseVideo');
  video.src = item.video;
  video.setAttribute('poster', item.poster || '');
  video.load();

  qs('#warningText').textContent = item.warning || 'Procure um instrutor em caso de dúvidas.';

  setList('#musclesList', item.muscles);
  setList('#tipsList', item.tips);
  setList('#errorsList', item.errors);
}

function bindEvents() {
  qs('#replayBtn').addEventListener('click', () => {
    const video = qs('#exerciseVideo');
    video.currentTime = 0;
    video.play().catch(() => {});
  });
}

renderExercise();
renderExerciseLinks();
bindEvents();
