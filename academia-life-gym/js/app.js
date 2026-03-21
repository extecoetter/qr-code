const academyConfig = {
  name: 'Academia Life Gym',
  category: 'Academia Life Gym',
  intro: 'Escaneie o QR Code do aparelho e veja como executar o exercício.',
  defaultExercise: 'supino',
  basePathHint: 'Use os links com ?ex=nome-do-exercicio'
};

const exercises = {
  supino: {
    title: 'Supino Máquina',
    subtitle: 'Execução guiada para peitoral, ombros e tríceps.',
    video: 'videos/supino.mp4',
    muscles: ['Peitoral', 'Tríceps', 'Deltoide anterior'],
    tips: [
      'Mantenha as escápulas apoiadas no banco.',
      'Empurre de forma controlada, sem travar o cotovelo.',
      'Respire e mantenha o abdômen firme durante o movimento.'
    ],
    errors: [
      'Soltar o peso muito rápido na volta.',
      'Tirar os pés do apoio ou desalinhar o tronco.',
      'Abrir demais os cotovelos.'
    ],
    warning: 'Ajuste carga e banco antes de iniciar. Em caso de dor, pare e procure orientação profissional.'
  },
  legpress: {
    title: 'Leg Press',
    subtitle: 'Foco em quadríceps, glúteos e posteriores.',
    video: 'videos/legpress.mp4',
    muscles: ['Quadríceps', 'Glúteos', 'Posteriores de coxa'],
    tips: [
      'Posicione bem os pés na plataforma.',
      'Desça controlando o movimento.',
      'Mantenha a lombar apoiada no encosto.'
    ],
    errors: [
      'Descolar a lombar do banco.',
      'Descer além do seu limite com perda de postura.',
      'Travar totalmente os joelhos na subida.'
    ],
    warning: 'Use apenas a carga que permite execução controlada e segura.'
  },
  puxada: {
    title: 'Puxada Frontal',
    subtitle: 'Execução guiada para costas e bíceps.',
    video: 'videos/puxada.mp4',
    muscles: ['Dorsal', 'Bíceps', 'Romboides'],
    tips: [
      'Puxe em direção ao peito alto.',
      'Mantenha o tronco firme e sem embalo.',
      'Retorne devagar à posição inicial.'
    ],
    errors: [
      'Puxar atrás da nuca.',
      'Usar excesso de balanço do corpo.',
      'Encolher demais os ombros.'
    ],
    warning: 'Ajuste o banco e o apoio antes de começar para manter a postura correta.'
  }
};

const titleEl = document.getElementById('exerciseTitle');
const subtitleEl = document.getElementById('exerciseSubtitle');
const videoEl = document.getElementById('exerciseVideo');
const musclesList = document.getElementById('musclesList');
const tipsList = document.getElementById('tipsList');
const errorsList = document.getElementById('errorsList');
const warningText = document.getElementById('warningText');
const exerciseLinks = document.getElementById('exerciseLinks');
const replayBtn = document.getElementById('replayBtn');
const academyBadge = document.querySelector('.academy-badge');
const brandInfoText = document.querySelector('.brand-info p');
const logoEl = document.querySelector('.logo');

function getExerciseKey(){
  const params = new URLSearchParams(window.location.search);
  const key = params.get('ex');
  return exercises[key] ? key : academyConfig.defaultExercise;
}

function fillList(element, items){
  element.innerHTML = '';
  if(!items || !items.length){
    element.innerHTML = '<li class="empty">Nada cadastrado.</li>';
    return;
  }
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    element.appendChild(li);
  });
}

function renderExercise(key){
  const item = exercises[key];
  if(!item) return;

  document.title = `${academyConfig.name} - ${item.title}`;
  titleEl.textContent = item.title;
  subtitleEl.textContent = item.subtitle;
  videoEl.src = item.video;
  videoEl.load();
  warningText.textContent = item.warning || '';

  fillList(musclesList, item.muscles);
  fillList(tipsList, item.tips);
  fillList(errorsList, item.errors);
}

function renderExerciseLinks(){
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  exerciseLinks.innerHTML = '';

  Object.entries(exercises).forEach(([key, item]) => {
    const a = document.createElement('a');
    a.className = 'exercise-link';
    a.href = `${baseUrl}?ex=${encodeURIComponent(key)}`;
    a.innerHTML = `<strong>${item.title}</strong><small>${a.href}</small>`;
    exerciseLinks.appendChild(a);
  });
}

function applyAcademyInfo(){
  if (academyBadge) academyBadge.textContent = academyConfig.category;
  if (brandInfoText) brandInfoText.textContent = academyConfig.intro;
  if (logoEl) logoEl.textContent = academyConfig.name;
}

replayBtn?.addEventListener('click', () => {
  videoEl.currentTime = 0;
  videoEl.play();
});

applyAcademyInfo();
renderExerciseLinks();
renderExercise(getExerciseKey());
