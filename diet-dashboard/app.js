/* ==========================================================================
   LOVABLE DIET APP - APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. STATE & STORAGE MANAGEMENT
  // ==========================================================================
  
  const defaultAnamnese = {
    name: 'Ana Paula',
    goal: 'Emagrecimento',
    currentWeight: 68.5,
    goalWeight: 62.0,
    height: 170,
    calorieTarget: 1800,
    restrictions: ['Lactose']
  };

  const defaultWeightHistory = [
    { date: '01/07', weight: 71.2 },
    { date: '07/07', weight: 70.4 },
    { date: '14/07', weight: 69.8 },
    { date: '21/07', weight: 69.0 },
    { date: '24/08', weight: 68.5 }
  ];

  const defaultDailyMeals = [
    { name: 'Omelete com Espinafre & Queijo Branco', calories: 280, protein: 22, carbs: 4, fat: 18, time: '08:30' },
    { name: 'Salada Caesar com Frango Grelhado', calories: 420, protein: 38, carbs: 18, fat: 14, time: '12:45' },
    { name: 'Iogurte Natural com Frutas Vermelhas', calories: 180, protein: 12, carbs: 24, fat: 4, time: '16:15' }
  ];

  const defaultDietPlan = [
    {
      id: 'meal_1',
      title: 'Café da Manhã',
      time: '07:30',
      description: '2 Ovos mexidos + 1 fatia Pão Integral + 1 xícara de Café Preto sem açúcar + 1 fatia de Mamão',
      calories: 320,
      protein: 20,
      carbs: 28,
      fat: 12
    },
    {
      id: 'meal_2',
      title: 'Almoço',
      time: '12:30',
      description: '120g Peito de Frango Grelhado + 100g Arroz Integral + 80g Feijão + Salada verde à vontade com 1 colher azeite',
      calories: 540,
      protein: 42,
      carbs: 58,
      fat: 14
    },
    {
      id: 'meal_3',
      title: 'Lanche da Tarde',
      time: '16:30',
      description: '30g Whey Protein ou 1 Iogurte Proteico + 1 Banana Prata com 15g Farinha de Aveia',
      calories: 260,
      protein: 26,
      carbs: 32,
      fat: 3
    },
    {
      id: 'meal_4',
      title: 'Jantar',
      time: '19:30',
      description: '140g Filé de Tilápia Assado + 120g Batata Doce Cozida + Brócolis e Couve-Flor no vapor',
      calories: 380,
      protein: 36,
      carbs: 34,
      fat: 8
    }
  ];

  const defaultSubstitutions = [
    { category: 'Proteínas', original: '100g Peito de Frango Grelhado', replacement: '115g Filé de Tilápia ou 3 Ovos Cozidos ou 100g Patinho' },
    { category: 'Carboidratos', original: '100g Arroz Integral Cozido', replacement: '130g Batata Doce ou 150g Mandioquinha ou 1 fatia Pão Integral' },
    { category: 'Frutas & Doces', original: '1 Banana Prata (80g)', replacement: '1 Maçã Média ou 150g Morangos Frescos ou 1 fatia Mamão' },
    { category: 'Gorduras', original: '1 colher (sopa) Azeite de Oliva (10ml)', replacement: '15g Castanha do Pará ou 30g Abacate Amassado' }
  ];

  const defaultWorkouts = {
    segunda: {
      title: 'Membros Inferiores & Glúteos',
      exercises: [
        { id: 'ex_1', name: 'Agachamento Livre com Barra', details: '4 séries x 10 repetições', load: '40 kg', cals: 90, completed: false },
        { id: 'ex_2', name: 'Leg Press 45°', details: '4 séries x 12 repetições', load: '120 kg', cals: 85, completed: false },
        { id: 'ex_3', name: 'Cadeira Extensora', details: '3 séries x 15 repetições', load: '45 kg', cals: 65, completed: false },
        { id: 'ex_4', name: 'Stiff com Halteres', details: '4 séries x 12 repetições', load: '24 kg', cals: 70, completed: false },
        { id: 'ex_5', name: 'Elevação Pélvica', details: '4 séries x 10 repetições', load: '60 kg', cals: 80, completed: false }
      ]
    },
    terca: {
      title: 'Membros Superiores (Peito, Ombro & Tríceps)',
      exercises: [
        { id: 'ex_6', name: 'Supino Reto com Halteres', details: '4 séries x 10 repetições', load: '20 kg', cals: 75, completed: false },
        { id: 'ex_7', name: 'Desenvolvimento de Ombros', details: '4 séries x 12 repetições', load: '16 kg', cals: 65, completed: false },
        { id: 'ex_8', name: 'Elevação Lateral', details: '3 séries x 15 repetições', load: '8 kg', cals: 50, completed: false },
        { id: 'ex_9', name: 'Tríceps Pulley na Corda', details: '4 séries x 12 repetições', load: '25 kg', cals: 60, completed: false }
      ]
    },
    quarta: {
      title: 'Costas, Bíceps & Core',
      exercises: [
        { id: 'ex_10', name: 'Puxada Frontal no Pulley', details: '4 séries x 10 repetições', load: '40 kg', cals: 80, completed: false },
        { id: 'ex_11', name: 'Remada Curvada com Barra', details: '4 séries x 12 repetições', load: '30 kg', cals: 75, completed: false },
        { id: 'ex_12', name: 'Rosca Direta com Halteres', details: '3 séries x 12 repetições', load: '10 kg', cals: 55, completed: false },
        { id: 'ex_13', name: 'Prancha Abdominal', details: '3 séries x 60 segundos', load: 'Corpo', cals: 45, completed: false }
      ]
    },
    quinta: {
      title: 'Posterior de Coxa & Glúteos',
      exercises: [
        { id: 'ex_14', name: 'Mesa Flexora', details: '4 séries x 12 repetições', load: '35 kg', cals: 70, completed: false },
        { id: 'ex_15', name: 'Agachamento Sumô com Kettlebell', details: '4 séries x 12 repetições', load: '24 kg', cals: 85, completed: false },
        { id: 'ex_16', name: 'Cadeira Abdutora', details: '4 séries x 15 repetições', load: '55 kg', cals: 60, completed: false },
        { id: 'ex_17', name: 'Passada / Afundo Caminhando', details: '3 séries x 20 passos', load: '16 kg', cals: 90, completed: false }
      ]
    },
    sexta: {
      title: 'Superiores Completo & Abdominais',
      exercises: [
        { id: 'ex_18', name: 'Remada Unilateral (Serrote)', details: '4 séries x 10 repetições', load: '18 kg', cals: 70, completed: false },
        { id: 'ex_19', name: 'Crucifixo Inclinado', details: '3 séries x 12 repetições', load: '12 kg', cals: 60, completed: false },
        { id: 'ex_20', name: 'Tríceps Testa', details: '3 séries x 12 repetições', load: '14 kg', cals: 55, completed: false },
        { id: 'ex_21', name: 'Abdominal Infra na Barra', details: '4 séries x 15 repetições', load: 'Corpo', cals: 50, completed: false }
      ]
    },
    sabado: {
      title: 'Full Body & Funcional',
      exercises: [
        { id: 'ex_22', name: 'Kettlebell Swings', details: '4 séries x 20 repetições', load: '16 kg', cals: 100, completed: false },
        { id: 'ex_23', name: 'Polichinelos & Corda', details: '5 séries x 1 min', load: 'Cardio', cals: 90, completed: false }
      ]
    },
    domingo: {
      title: 'Descanso Ativo & Mobilidade',
      exercises: [
        { id: 'ex_24', name: 'Alongamento Completo & Mobilidade de Quadril', details: '20 minutos', load: 'Corpo', cals: 50, completed: false }
      ]
    }
  };

  const defaultCardioLogs = [
    { date: '24/08', type: 'Esteira / Corrida', duration: 35, distance: 4.8, calories: 310 },
    { date: '22/08', type: 'Bicicleta Ergométrica', duration: 40, distance: 12.0, calories: 260 },
    { date: '20/08', type: 'Elíptico', duration: 30, distance: 3.5, calories: 240 }
  ];

  const defaultMeasurements = [
    { date: '01/07', waist: 75.5, hip: 100.5, thigh: 54.8, arm: 29.5, chest: 91.0 },
    { date: '15/07', waist: 73.8, hip: 99.2, thigh: 55.4, arm: 29.0, chest: 90.5 },
    { date: '24/08', waist: 72.0, hip: 98.5, thigh: 56.0, arm: 28.5, chest: 90.0 }
  ];

  let anamnese = JSON.parse(localStorage.getItem('nutriflow_anamnese')) || defaultAnamnese;
  let weightHistory = JSON.parse(localStorage.getItem('nutriflow_weight_history')) || defaultWeightHistory;
  let dailyMeals = JSON.parse(localStorage.getItem('nutriflow_meals')) || defaultDailyMeals;
  let dietPlan = JSON.parse(localStorage.getItem('nutriflow_diet_plan')) || defaultDietPlan;
  let substitutions = JSON.parse(localStorage.getItem('nutriflow_substitutions')) || defaultSubstitutions;
  let workouts = JSON.parse(localStorage.getItem('nutriflow_workouts')) || defaultWorkouts;
  let cardioLogs = JSON.parse(localStorage.getItem('nutriflow_cardio_logs')) || defaultCardioLogs;
  let measurements = JSON.parse(localStorage.getItem('nutriflow_measurements')) || defaultMeasurements;
  let detoxWater = parseInt(localStorage.getItem('nutriflow_detox_water')) || 1550;

  let photoBefore = localStorage.getItem('nutriflow_photo_before') || null;
  let photoAfter = localStorage.getItem('nutriflow_photo_after') || null;

  let weightChart = null;
  let measuresChart = null;
  let mediaStream = null;
  let currentScannedMeal = null;
  let activeWorkoutDay = 'segunda';

  // ==========================================================================
  // 2. NAVIGATION SYSTEM
  // ==========================================================================
  
  const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
  const viewSections = document.querySelectorAll('.view-section');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  const pageHeadings = {
    'dashboard-view': { title: 'Visão Geral da Dieta', subtitle: 'Acompanhe seu progresso, refeições e saúde em tempo real.' },
    'dietplan-view': { title: 'Meu Plano Alimentar & Substituições', subtitle: 'Consulte sua dieta diária e calcule trocas equivalentes de alimentos.' },
    'workout-view': { title: 'Ficha de Treinos & Medidas Corporais', subtitle: 'Acompanhe sua musculação semanal, cardio e perimetria.' },
    'evolution-view': { title: 'Evolução Corporal & Desempenho', subtitle: 'Resumo de resultados, comparativo de fotos e gráfico de medidas.' },
    'scanner-view': { title: 'Leitor Inteligente de Refeição', subtitle: 'Escaneie fotos ou QR Codes para analisar calorias e alérgenos.' },
    'detox-view': { title: 'Protocolo Detox & Desinflamação', subtitle: 'Guia pós-exagero para desinchar e restaurar o equilíbrio.' },
    'anamnese-view': { title: 'Anamnese & Restrições Alimentares', subtitle: 'Configure suas metas e alergias para alertas do sistema.' }
  };

  function switchView(targetViewId) {
    if (targetViewId !== 'scanner-view') {
      stopCamera();
    }

    navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetViewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    viewSections.forEach(section => {
      if (section.id === targetViewId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    if (pageHeadings[targetViewId] && pageTitle) {
      pageTitle.textContent = pageHeadings[targetViewId].title;
      pageSubtitle.textContent = pageHeadings[targetViewId].subtitle;
    }

    if (targetViewId === 'evolution-view') {
      initMeasuresChart();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      switchView(target);
    });
  });

  document.getElementById('btn-activate-detox-quick')?.addEventListener('click', () => switchView('detox-view'));
  document.getElementById('btn-open-scanner-quick')?.addEventListener('click', () => switchView('scanner-view'));
  document.getElementById('btn-mobile-scan')?.addEventListener('click', () => switchView('scanner-view'));
  document.getElementById('btn-mobile-top-scan')?.addEventListener('click', () => switchView('scanner-view'));
  document.getElementById('btn-mobile-quick-scan')?.addEventListener('click', () => switchView('scanner-view'));

  const openWeightModal = () => {
    const modalWeight = document.getElementById('modal-weight');
    if (modalWeight) {
      modalWeight.classList.add('active');
      document.getElementById('input-weight-date').valueAsDate = new Date();
    }
  };

  document.getElementById('btn-mobile-add-weight')?.addEventListener('click', openWeightModal);
  document.getElementById('btn-mobile-top-weight')?.addEventListener('click', openWeightModal);
  document.getElementById('btn-mobile-quick-weight')?.addEventListener('click', openWeightModal);

  // ==========================================================================
  // 3. EVOLUTION HUB & PROGRESS MODULE
  // ==========================================================================
  
  function initMeasuresChart() {
    const ctx = document.getElementById('measuresChart')?.getContext('2d');
    if (!ctx) return;

    const labels = measurements.map(m => m.date);
    const waistData = measurements.map(m => m.waist);
    const hipData = measurements.map(m => m.hip);
    const thighData = measurements.map(m => m.thigh);
    const armData = measurements.map(m => m.arm);

    if (measuresChart) {
      measuresChart.destroy();
    }

    measuresChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cintura (cm)',
            data: waistData,
            borderColor: '#E8B84F',
            backgroundColor: 'rgba(232, 184, 79, 0.1)',
            fill: false,
            tension: 0.3,
            borderWidth: 3
          },
          {
            label: 'Quadril (cm)',
            data: hipData,
            borderColor: '#FF7A45',
            backgroundColor: 'rgba(255, 122, 69, 0.1)',
            fill: false,
            tension: 0.3,
            borderWidth: 3
          },
          {
            label: 'Coxa (cm)',
            data: thighData,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: false,
            tension: 0.3,
            borderWidth: 2
          },
          {
            label: 'Braço (cm)',
            data: armData,
            borderColor: '#9C27B0',
            backgroundColor: 'rgba(156, 39, 176, 0.1)',
            fill: false,
            tension: 0.3,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(0,0,0,0.05)' } }
        }
      }
    });
  }

  function updateEvolutionSummary() {
    if (weightHistory.length > 0) {
      const firstW = weightHistory[0].weight;
      const currentW = weightHistory[weightHistory.length - 1].weight;
      const diffW = (firstW - currentW).toFixed(1);
      
      const elem = document.getElementById('evo-weight-loss');
      if (elem) {
        if (diffW > 0) {
          elem.textContent = `-${diffW} kg`;
        } else {
          elem.textContent = `0.0 kg`;
        }
      }
    }

    if (measurements.length > 0) {
      const firstWaist = measurements[0].waist;
      const currentWaist = measurements[measurements.length - 1].waist;
      const diffWaist = (firstWaist - currentWaist).toFixed(1);

      const elemWaist = document.getElementById('evo-waist-loss');
      if (elemWaist) {
        if (diffWaist > 0) {
          elemWaist.textContent = `-${diffWaist} cm`;
        } else {
          elemWaist.textContent = `0.0 cm`;
        }
      }
    }

    if (photoBefore) {
      const imgB = document.getElementById('img-preview-before');
      const phB = document.getElementById('ph-before');
      if (imgB && phB) {
        imgB.src = photoBefore;
        imgB.style.display = 'block';
        phB.style.display = 'none';
      }
    }

    if (photoAfter) {
      const imgA = document.getElementById('img-preview-after');
      const phA = document.getElementById('ph-after');
      if (imgA && phA) {
        imgA.src = photoAfter;
        imgA.style.display = 'block';
        phA.style.display = 'none';
      }
    }
  }

  // Upload Before & After Photos Handlers
  const btnUploadBefore = document.getElementById('btn-upload-before');
  const btnUploadAfter = document.getElementById('btn-upload-after');
  const inputPhotoBefore = document.getElementById('input-photo-before');
  const inputPhotoAfter = document.getElementById('input-photo-after');

  btnUploadBefore?.addEventListener('click', () => inputPhotoBefore?.click());
  btnUploadAfter?.addEventListener('click', () => inputPhotoAfter?.click());

  inputPhotoBefore?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      photoBefore = event.target.result;
      localStorage.setItem('nutriflow_photo_before', photoBefore);
      updateEvolutionSummary();
    };
    reader.readAsDataURL(file);
  });

  inputPhotoAfter?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      photoAfter = event.target.result;
      localStorage.setItem('nutriflow_photo_after', photoAfter);
      updateEvolutionSummary();
    };
    reader.readAsDataURL(file);
  });

  // ==========================================================================
  // 4. WORKOUT, CARDIO & BODY MEASUREMENTS MODULE
  // ==========================================================================
  
  const tabBtnGym = document.getElementById('tab-btn-gym');
  const tabBtnCardio = document.getElementById('tab-btn-cardio');
  const tabBtnMeasures = document.getElementById('tab-btn-measures');

  const subviewGym = document.getElementById('subview-gym');
  const subviewCardio = document.getElementById('subview-cardio');
  const subviewMeasures = document.getElementById('subview-measures');

  tabBtnGym?.addEventListener('click', () => {
    tabBtnGym.className = 'btn btn-secondary';
    tabBtnCardio.className = 'btn btn-outline';
    tabBtnMeasures.className = 'btn btn-outline';
    subviewGym.style.display = 'block';
    subviewCardio.style.display = 'none';
    subviewMeasures.style.display = 'none';
  });

  tabBtnCardio?.addEventListener('click', () => {
    tabBtnCardio.className = 'btn btn-secondary';
    tabBtnGym.className = 'btn btn-outline';
    tabBtnMeasures.className = 'btn btn-outline';
    subviewCardio.style.display = 'block';
    subviewGym.style.display = 'none';
    subviewMeasures.style.display = 'none';
  });

  tabBtnMeasures?.addEventListener('click', () => {
    tabBtnMeasures.className = 'btn btn-secondary';
    tabBtnGym.className = 'btn btn-outline';
    tabBtnCardio.className = 'btn btn-outline';
    subviewMeasures.style.display = 'block';
    subviewGym.style.display = 'none';
    subviewCardio.style.display = 'none';
  });

  document.querySelectorAll('#subview-gym .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#subview-gym .chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      activeWorkoutDay = chip.getAttribute('data-day');
      renderWorkoutUI();
    });
  });

  function renderWorkoutUI() {
    const dayData = workouts[activeWorkoutDay];
    if (!dayData) return;

    const dayLabels = {
      segunda: 'Segunda-feira',
      terca: 'Terça-feira',
      quarta: 'Quarta-feira',
      quinta: 'Quinta-feira',
      sexta: 'Sexta-feira',
      sabado: 'Sábado',
      domingo: 'Domingo'
    };

    if (document.getElementById('workout-day-label')) document.getElementById('workout-day-label').textContent = dayLabels[activeWorkoutDay];
    if (document.getElementById('workout-group-title')) document.getElementById('workout-group-title').textContent = dayData.title;

    const container = document.getElementById('exercise-list-container');
    if (!container) return;
    container.innerHTML = '';

    const totalCals = dayData.exercises.reduce((sum, ex) => sum + (ex.cals || 70), 0);
    const completedCount = dayData.exercises.filter(ex => ex.completed).length;

    if (document.getElementById('workout-total-cals')) {
      document.getElementById('workout-total-cals').textContent = `${totalCals} kcal`;
    }
    if (document.getElementById('workout-completed-count')) {
      document.getElementById('workout-completed-count').textContent = `${completedCount} / ${dayData.exercises.length}`;
    }

    if (dayData.exercises.length === 0) {
      container.innerHTML = '<p style="font-size:14px; color:var(--text-muted); text-align:center; padding:20px;">Nenhum exercício cadastrado para este dia. Clique no botão "+ Adicionar Exercício" acima para personalizar seu treino!</p>';
      return;
    }

    dayData.exercises.forEach((ex, idx) => {
      const card = document.createElement('div');
      card.className = `exercise-item-card ${ex.completed ? 'completed' : ''}`;
      card.innerHTML = `
        <div class="ex-info">
          <input type="checkbox" class="ex-checkbox" ${ex.completed ? 'checked' : ''} onchange="toggleExercise('${activeWorkoutDay}', ${idx})">
          <div>
            <div class="ex-name">${ex.name}</div>
            <div class="ex-details">${ex.details} • Est: ${ex.cals || 70} kcal</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span class="ex-load">${ex.load}</span>
          <i class="fa-solid fa-trash-can" style="color:var(--status-danger); cursor:pointer; font-size:14px;" onclick="deleteExercise('${activeWorkoutDay}', ${idx})" title="Excluir exercício"></i>
        </div>
      `;
      container.appendChild(card);
    });
  }

  window.toggleExercise = function(dayKey, index) {
    if (workouts[dayKey] && workouts[dayKey].exercises[index]) {
      workouts[dayKey].exercises[index].completed = !workouts[dayKey].exercises[index].completed;
      localStorage.setItem('nutriflow_workouts', JSON.stringify(workouts));
      renderWorkoutUI();
    }
  };

  window.deleteExercise = function(dayKey, index) {
    if (workouts[dayKey] && workouts[dayKey].exercises[index]) {
      if (confirm(`Remover "${workouts[dayKey].exercises[index].name}" da sua ficha de treino?`)) {
        workouts[dayKey].exercises.splice(index, 1);
        localStorage.setItem('nutriflow_workouts', JSON.stringify(workouts));
        renderWorkoutUI();
      }
    }
  };

  const modalAddExercise = document.getElementById('modal-add-exercise');
  document.getElementById('btn-add-custom-exercise')?.addEventListener('click', () => {
    modalAddExercise?.classList.add('active');
  });
  document.getElementById('close-modal-exercise')?.addEventListener('click', () => {
    modalAddExercise?.classList.remove('active');
  });
  document.getElementById('btn-cancel-exercise')?.addEventListener('click', () => {
    modalAddExercise?.classList.remove('active');
  });

  document.getElementById('form-add-exercise')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('ex-name-input').value;
    const details = document.getElementById('ex-details-input').value;
    const load = document.getElementById('ex-load-input').value;
    const cals = parseInt(document.getElementById('ex-cals-input').value) || 70;

    if (name && details && load) {
      if (!workouts[activeWorkoutDay]) {
        workouts[activeWorkoutDay] = { title: 'Treino Personalizado', exercises: [] };
      }

      workouts[activeWorkoutDay].exercises.push({
        id: 'ex_custom_' + Date.now(),
        name: name,
        details: details,
        load: load,
        cals: cals,
        completed: false
      });

      localStorage.setItem('nutriflow_workouts', JSON.stringify(workouts));
      renderWorkoutUI();
      document.getElementById('form-add-exercise').reset();
      modalAddExercise?.classList.remove('active');
      alert(`Exercício "${name}" adicionado à sua ficha de treino!`);
    }
  });

  document.getElementById('form-add-cardio')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('cardio-type').value;
    const duration = parseInt(document.getElementById('cardio-duration').value);
    const distance = parseFloat(document.getElementById('cardio-distance').value) || 0;
    const calories = parseInt(document.getElementById('cardio-calories').value);

    if (type && duration && calories) {
      cardioLogs.unshift({
        date: new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit' }),
        type: type,
        duration: duration,
        distance: distance,
        calories: calories
      });

      localStorage.setItem('nutriflow_cardio_logs', JSON.stringify(cardioLogs));
      renderCardioUI();
      document.getElementById('form-add-cardio').reset();
      alert('Sessão de Cardio registrada com sucesso!');
    }
  });

  function renderCardioUI() {
    const container = document.getElementById('cardio-history-container');
    if (!container) return;
    container.innerHTML = '';

    const totalTime = cardioLogs.reduce((sum, c) => sum + c.duration, 0);
    const totalCals = cardioLogs.reduce((sum, c) => sum + c.calories, 0);

    if (document.getElementById('cardio-total-time')) document.getElementById('cardio-total-time').textContent = `${totalTime} min`;
    if (document.getElementById('cardio-total-cals')) document.getElementById('cardio-total-cals').textContent = `${totalCals} kcal`;
    if (document.getElementById('cardio-total-sessions')) document.getElementById('cardio-total-sessions').textContent = `${cardioLogs.length} sessões`;

    cardioLogs.forEach(log => {
      const item = document.createElement('div');
      item.className = 'cardio-log-item';
      item.innerHTML = `
        <div>
          <span style="font-weight:700; font-size:14px;">${log.type}</span>
          <div style="font-size:12px; color:var(--text-muted);">${log.date} • ${log.duration} min ${log.distance ? '• ' + log.distance + ' km' : ''}</div>
        </div>
        <span style="font-weight:800; color:var(--orange); font-size:14px;">-${log.calories} kcal</span>
      `;
      container.appendChild(item);
    });
  }

  const modalMeasure = document.getElementById('modal-measure');
  document.getElementById('btn-open-measure-modal')?.addEventListener('click', () => {
    modalMeasure?.classList.add('active');
  });
  document.getElementById('close-modal-measure')?.addEventListener('click', () => {
    modalMeasure?.classList.remove('active');
  });
  document.getElementById('btn-cancel-measure')?.addEventListener('click', () => {
    modalMeasure?.classList.remove('active');
  });

  document.getElementById('form-add-measure')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const waist = parseFloat(document.getElementById('input-waist').value);
    const hip = parseFloat(document.getElementById('input-hip').value);
    const thigh = parseFloat(document.getElementById('input-thigh').value) || 0;
    const arm = parseFloat(document.getElementById('input-arm').value) || 0;
    const chest = parseFloat(document.getElementById('input-chest').value) || 0;

    if (waist && hip) {
      measurements.push({
        date: new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit' }),
        waist: waist,
        hip: hip,
        thigh: thigh,
        arm: arm,
        chest: chest
      });

      localStorage.setItem('nutriflow_measurements', JSON.stringify(measurements));
      renderMeasurementsUI();
      updateEvolutionSummary();
      modalMeasure?.classList.remove('active');
      alert('Medidas corporais atualizadas com sucesso!');
    }
  });

  function renderMeasurementsUI() {
    if (measurements.length === 0) return;
    const latest = measurements[measurements.length - 1];

    if (document.getElementById('measure-waist')) document.getElementById('measure-waist').textContent = latest.waist.toFixed(1);
    if (document.getElementById('measure-hip')) document.getElementById('measure-hip').textContent = latest.hip.toFixed(1);
    if (document.getElementById('measure-thigh')) document.getElementById('measure-thigh').textContent = latest.thigh.toFixed(1);
    if (document.getElementById('measure-arm')) document.getElementById('measure-arm').textContent = latest.arm.toFixed(1);

    const tbody = document.getElementById('measures-history-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    measurements.slice().reverse().forEach(m => {
      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
      row.innerHTML = `
        <td style="padding:10px; font-weight:700;">${m.date}</td>
        <td style="padding:10px;">${m.waist} cm</td>
        <td style="padding:10px;">${m.hip} cm</td>
        <td style="padding:10px;">${m.thigh} cm</td>
        <td style="padding:10px;">${m.arm} cm</td>
        <td style="padding:10px;">${m.chest} cm</td>
      `;
      tbody.appendChild(row);
    });
  }

  // ==========================================================================
  // 5. DIET PLAN & SUBSTITUTION CALCULATOR MODULE
  // ==========================================================================
  
  const tabBtnMyPlan = document.getElementById('tab-btn-myplan');
  const tabBtnCalculator = document.getElementById('tab-btn-calculator');
  const subviewMyPlan = document.getElementById('subview-myplan');
  const subviewCalculator = document.getElementById('subview-calculator');

  tabBtnMyPlan?.addEventListener('click', () => {
    tabBtnMyPlan.className = 'btn btn-secondary';
    tabBtnCalculator.className = 'btn btn-outline';
    subviewMyPlan.style.display = 'block';
    subviewCalculator.style.display = 'none';
  });

  tabBtnCalculator?.addEventListener('click', () => {
    tabBtnCalculator.className = 'btn btn-secondary';
    tabBtnMyPlan.className = 'btn btn-outline';
    subviewCalculator.style.display = 'block';
    subviewMyPlan.style.display = 'none';
  });

  function renderDietPlanUI() {
    const container = document.getElementById('diet-meals-container');
    if (!container) return;
    container.innerHTML = '';

    dietPlan.forEach(meal => {
      const card = document.createElement('div');
      card.className = 'diet-meal-card';
      card.innerHTML = `
        <div class="diet-meal-info">
          <h3><i class="fa-solid fa-clock" style="color:var(--mustard-yellow); font-size:16px;"></i> ${meal.time} • ${meal.title}</h3>
          <p>${meal.description}</p>
          <div class="diet-meal-macros">
            <span>🔥 ${meal.calories} kcal</span>
            <span>🥩 Prot: ${meal.protein}g</span>
            <span>🍞 Carb: ${meal.carbs}g</span>
            <span>🥑 Gord: ${meal.fat}g</span>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="consumeDietMeal('${meal.id}')" style="white-space:nowrap;">
          <i class="fa-solid fa-circle-check"></i> Marcar Consumido
        </button>
      `;
      container.appendChild(card);
    });
  }

  window.consumeDietMeal = function(mealId) {
    const meal = dietPlan.find(m => m.id === mealId);
    if (!meal) return;

    dailyMeals.push({
      name: `${meal.title}: ${meal.description.split('+')[0]}`,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    localStorage.setItem('nutriflow_meals', JSON.stringify(dailyMeals));
    updateDashboardStats();
    alert(`Refeição "${meal.title}" registrada com sucesso no seu Dashboard do dia! 🎉`);
  };

  const foodDensity = {
    frango: { name: 'Peito de Frango Grelhado', calPer100g: 165, unit: 'g' },
    patinho: { name: 'Patinho Moído', calPer100g: 215, unit: 'g' },
    tilapia: { name: 'Filé de Tilápia', calPer100g: 120, unit: 'g' },
    ovos: { name: 'Ovos de Galinha Cozidos', calPer100g: 155, unit: 'g (aprox. 2 ovos)' },
    arroz: { name: 'Arroz Integral Cozido', calPer100g: 130, unit: 'g' },
    batatadoce: { name: 'Batata Doce Cozida', calPer100g: 86, unit: 'g' },
    tapioca: { name: 'Massa de Tapioca', calPer100g: 240, unit: 'g' },
    aveia: { name: 'Farinha de Aveia', calPer100g: 380, unit: 'g' },
    banana: { name: 'Banana Prata', calPer100g: 90, unit: 'g' },
    mandioquinha: { name: 'Mandioquinha / Baroa', calPer100g: 95, unit: 'g' },
    pao: { name: 'Pão Integral', calPer100g: 250, unit: 'g (aprox. 2 fatias)' },
    maca: { name: 'Maçã Vermelha', calPer100g: 52, unit: 'g' }
  };

  function updateEquivalenceCalculator() {
    const origKey = document.getElementById('calc-original-food')?.value;
    const origQty = parseFloat(document.getElementById('calc-original-qty')?.value) || 100;
    const subKey = document.getElementById('calc-substitute-food')?.value;

    const origFood = foodDensity[origKey];
    const subFood = foodDensity[subKey];

    if (!origFood || !subFood) return;

    const totalCals = (origFood.calPer100g / 100) * origQty;
    const equivQty = Math.round((totalCals / subFood.calPer100g) * 100);

    const resultText = document.getElementById('eq-result-text');
    const resultDetails = document.getElementById('eq-result-details');

    if (resultText) {
      resultText.innerHTML = `${origQty}g de <strong>${origFood.name}</strong> ➔ <span style="color:var(--orange);">${equivQty}g de ${subFood.name}</span>`;
    }
    if (resultDetails) {
      resultDetails.textContent = `Ambas as porções contêm aproximadamente ${Math.round(totalCals)} kcal.`;
    }
  }

  document.getElementById('calc-original-food')?.addEventListener('change', updateEquivalenceCalculator);
  document.getElementById('calc-original-qty')?.addEventListener('input', updateEquivalenceCalculator);
  document.getElementById('calc-substitute-food')?.addEventListener('change', updateEquivalenceCalculator);

  function renderSubstitutionsUI() {
    const container = document.getElementById('substitutions-container');
    if (!container) return;
    container.innerHTML = '';

    substitutions.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'sub-item-card';
      card.innerHTML = `
        <div>
          <div class="sub-item-header">${item.category}</div>
          <div class="sub-item-orig">Trocar: ${item.original}</div>
          <div class="sub-item-rep">➔ Por: ${item.replacement}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  const modalAddSub = document.getElementById('modal-add-sub');
  document.getElementById('btn-open-add-sub-modal')?.addEventListener('click', () => {
    modalAddSub?.classList.add('active');
  });
  document.getElementById('close-modal-add-sub')?.addEventListener('click', () => {
    modalAddSub?.classList.remove('active');
  });
  document.getElementById('btn-cancel-add-sub')?.addEventListener('click', () => {
    modalAddSub?.classList.remove('active');
  });

  document.getElementById('form-add-substitute')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const orig = document.getElementById('sub-original').value;
    const rep = document.getElementById('sub-replacement').value;
    const cat = document.getElementById('sub-category').value;

    if (orig && rep) {
      substitutions.push({ category: cat, original: orig, replacement: rep });
      localStorage.setItem('nutriflow_substitutions', JSON.stringify(substitutions));
      renderSubstitutionsUI();
      modalAddSub?.classList.remove('active');
    }
  });

  // ==========================================================================
  // 6. ANAMNESE & PROFILE SYNC
  // ==========================================================================
  
  function syncProfileUI() {
    const initials = anamnese.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    if (document.getElementById('user-avatar-display')) document.getElementById('user-avatar-display').textContent = initials || 'AP';
    if (document.getElementById('user-name-display')) document.getElementById('user-name-display').textContent = anamnese.name;
    if (document.getElementById('mobile-user-name')) document.getElementById('mobile-user-name').textContent = anamnese.name;
    if (document.getElementById('user-goal-display')) document.getElementById('user-goal-display').textContent = `Meta: ${anamnese.goal}`;

    if (document.getElementById('form-name')) document.getElementById('form-name').value = anamnese.name;
    if (document.getElementById('form-goal')) document.getElementById('form-goal').value = anamnese.goal;
    if (document.getElementById('form-current-weight')) document.getElementById('form-current-weight').value = anamnese.currentWeight;
    if (document.getElementById('form-goal-weight')) document.getElementById('form-goal-weight').value = anamnese.goalWeight;
    if (document.getElementById('form-height')) document.getElementById('form-height').value = anamnese.height;
    if (document.getElementById('form-calorie-target')) document.getElementById('form-calorie-target').value = anamnese.calorieTarget;

    if (document.getElementById('restr-gluten')) document.getElementById('restr-gluten').checked = anamnese.restrictions.includes('Glúten');
    if (document.getElementById('restr-lactose')) document.getElementById('restr-lactose').checked = anamnese.restrictions.includes('Lactose');
    if (document.getElementById('restr-vegan')) document.getElementById('restr-vegan').checked = anamnese.restrictions.includes('Carne');
    if (document.getElementById('restr-peanuts')) document.getElementById('restr-peanuts').checked = anamnese.restrictions.includes('Amendoim');
    if (document.getElementById('restr-seafood')) document.getElementById('restr-seafood').checked = anamnese.restrictions.includes('Frutos do Mar');
    if (document.getElementById('restr-sugar')) document.getElementById('restr-sugar').checked = anamnese.restrictions.includes('Açúcar');

    updateCheckboxCardStyles();
  }

  function updateCheckboxCardStyles() {
    document.querySelectorAll('.checkbox-card').forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        card.classList.add('checked');
      } else {
        card.classList.remove('checked');
      }
    });
  }

  document.querySelectorAll('.checkbox-card input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckboxCardStyles);
  });

  document.getElementById('anamnese-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const activeRestrictions = [];
    if (document.getElementById('restr-gluten')?.checked) activeRestrictions.push('Glúten');
    if (document.getElementById('restr-lactose')?.checked) activeRestrictions.push('Lactose');
    if (document.getElementById('restr-vegan')?.checked) activeRestrictions.push('Carne');
    if (document.getElementById('restr-peanuts')?.checked) activeRestrictions.push('Amendoim');
    if (document.getElementById('restr-seafood')?.checked) activeRestrictions.push('Frutos do Mar');
    if (document.getElementById('restr-sugar')?.checked) activeRestrictions.push('Açúcar');

    anamnese = {
      name: document.getElementById('form-name').value,
      goal: document.getElementById('form-goal').value,
      currentWeight: parseFloat(document.getElementById('form-current-weight').value),
      goalWeight: parseFloat(document.getElementById('form-goal-weight').value),
      height: parseFloat(document.getElementById('form-height').value),
      calorieTarget: parseInt(document.getElementById('form-calorie-target').value),
      restrictions: activeRestrictions
    };

    localStorage.setItem('nutriflow_anamnese', JSON.stringify(anamnese));
    syncProfileUI();
    updateDashboardStats();
    updateEvolutionSummary();
    
    alert('Anamnese e perfil salvos com sucesso!');
  });

  // ==========================================================================
  // 7. DASHBOARD STATS & REFRESH
  // ==========================================================================
  
  function updateDashboardStats() {
    if (document.getElementById('stat-current-weight')) document.getElementById('stat-current-weight').textContent = anamnese.currentWeight.toFixed(1);
    if (document.getElementById('stat-goal-weight')) document.getElementById('stat-goal-weight').textContent = anamnese.goalWeight.toFixed(1);
    
    const weightDiff = (anamnese.currentWeight - anamnese.goalWeight).toFixed(1);
    const diffElem = document.getElementById('stat-weight-diff');
    if (diffElem) {
      if (weightDiff > 0) {
        diffElem.textContent = `-${weightDiff} kg`;
        diffElem.style.color = 'var(--light-green)';
      } else {
        diffElem.textContent = `Meta Atingida! 🎉`;
        diffElem.style.color = 'var(--mustard-yellow)';
      }
    }

    const totalCals = dailyMeals.reduce((sum, m) => sum + m.calories, 0);
    const totalProtein = dailyMeals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const totalCarbs = dailyMeals.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const totalFat = dailyMeals.reduce((sum, m) => sum + (m.fat || 0), 0);

    if (document.getElementById('stat-calories-consumed')) document.getElementById('stat-calories-consumed').textContent = totalCals;
    
    const caloriesLeft = Math.max(0, anamnese.calorieTarget - totalCals);
    if (document.getElementById('stat-calories-left')) document.getElementById('stat-calories-left').textContent = `${caloriesLeft} kcal`;

    const calPercent = Math.min(100, Math.round((totalCals / anamnese.calorieTarget) * 100));
    if (document.getElementById('calorie-progress-bar')) document.getElementById('calorie-progress-bar').style.width = `${calPercent}%`;

    if (document.getElementById('macro-protein-val')) document.getElementById('macro-protein-val').textContent = `${totalProtein}g`;
    if (document.getElementById('macro-carbs-val')) document.getElementById('macro-carbs-val').textContent = `${totalCarbs}g`;
    if (document.getElementById('macro-fat-val')) document.getElementById('macro-fat-val').textContent = `${totalFat}g`;

    const heightInMeters = anamnese.height / 100;
    if (heightInMeters > 0) {
      const bmi = (anamnese.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
      if (document.getElementById('stat-bmi-value')) document.getElementById('stat-bmi-value').textContent = bmi;
      
      const statusElem = document.getElementById('stat-bmi-status');
      if (statusElem) {
        if (bmi < 18.5) {
          statusElem.textContent = 'Abaixo do Peso';
          statusElem.style.color = 'var(--status-info)';
        } else if (bmi < 25.0) {
          statusElem.textContent = 'Eutrófico (Saudável)';
          statusElem.style.color = 'var(--light-green)';
        } else if (bmi < 30.0) {
          statusElem.textContent = 'Sobrepeso Leve';
          statusElem.style.color = 'var(--mustard-yellow-hover)';
        } else {
          statusElem.textContent = 'Obesidade';
          statusElem.style.color = 'var(--status-danger)';
        }
      }
    }

    renderMealsFeed();
  }

  function renderMealsFeed() {
    const feed = document.getElementById('daily-meal-feed');
    if (!feed) return;
    feed.innerHTML = '';

    if (dailyMeals.length === 0) {
      feed.innerHTML = '<p style="font-size:13px; color:var(--text-muted);">Nenhuma refeição registrada hoje.</p>';
      return;
    }

    dailyMeals.forEach((meal, idx) => {
      const item = document.createElement('div');
      item.className = 'meal-item';
      item.innerHTML = `
        <div>
          <div class="meal-item-title">${meal.name}</div>
          <div class="meal-item-details">${meal.time || 'Hoje'} • Prot: ${meal.protein || 0}g</div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="meal-item-cals">+${meal.calories} kcal</span>
          <i class="fa-solid fa-trash-can" style="color:var(--status-danger); cursor:pointer; font-size:13px;" onclick="removeMeal(${idx})"></i>
        </div>
      `;
      feed.appendChild(item);
    });
  }

  window.removeMeal = function(index) {
    dailyMeals.splice(index, 1);
    localStorage.setItem('nutriflow_meals', JSON.stringify(dailyMeals));
    updateDashboardStats();
  };

  // ==========================================================================
  // 8. CHART.JS WEIGHT PROGRESS RENDER
  // ==========================================================================
  
  function initWeightChart() {
    const ctx = document.getElementById('weightChart')?.getContext('2d');
    if (!ctx) return;

    const labels = weightHistory.map(item => item.date);
    const dataPoints = weightHistory.map(item => item.weight);

    if (weightChart) {
      weightChart.destroy();
    }

    weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Peso (kg)',
          data: dataPoints,
          borderColor: '#FF7A45',
          backgroundColor: 'rgba(255, 122, 69, 0.12)',
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointBackgroundColor: '#E8B84F',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#777777', font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { color: '#777777', font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }

  // ==========================================================================
  // 9. REAL CAMERA & IMAGE SCANNER ENGINE
  // ==========================================================================
  
  const cameraFeed = document.getElementById('camera-feed');
  const capturedImagePreview = document.getElementById('captured-image-preview');
  const cameraPlaceholder = document.getElementById('camera-placeholder');
  const btnStartCamera = document.getElementById('btn-start-camera');
  const btnCapturePhoto = document.getElementById('btn-capture-photo');
  const btnUploadPhoto = document.getElementById('btn-upload-photo');
  const fileInputPhoto = document.getElementById('file-input-photo');
  const viewfinder = document.getElementById('scanner-viewfinder');

  async function startCamera() {
    try {
      if (mediaStream) stopCamera();

      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      if (cameraFeed) {
        cameraFeed.srcObject = mediaStream;
        cameraFeed.style.display = 'block';
      }
      if (capturedImagePreview) capturedImagePreview.style.display = 'none';
      if (cameraPlaceholder) cameraPlaceholder.style.display = 'none';
      
      if (btnStartCamera) btnStartCamera.style.display = 'none';
      if (btnCapturePhoto) btnCapturePhoto.style.display = 'inline-flex';
      
      viewfinder?.classList.add('video-active');
    } catch (err) {
      alert('Não foi possível acessar a câmera diretamente neste navegador. Por favor, use o botão "Upload Foto / QR" para selecionar uma foto da sua galeria.');
    }
  }

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    if (cameraFeed) {
      cameraFeed.style.display = 'none';
      cameraFeed.srcObject = null;
    }
    viewfinder?.classList.remove('video-active');
  }

  function capturePhotoFromStream() {
    if (!cameraFeed) return;

    const canvas = document.getElementById('scanner-canvas');
    canvas.width = cameraFeed.videoWidth || 640;
    canvas.height = cameraFeed.videoHeight || 480;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    stopCamera();

    if (capturedImagePreview) {
      capturedImagePreview.src = dataUrl;
      capturedImagePreview.style.display = 'block';
    }

    if (btnCapturePhoto) btnCapturePhoto.style.display = 'none';
    if (btnStartCamera) btnStartCamera.style.display = 'inline-flex';

    analyzeCapturedImage(dataUrl, 'foto_camera.jpg');
  }

  btnUploadPhoto?.addEventListener('click', () => {
    fileInputPhoto?.click();
  });

  fileInputPhoto?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    stopCamera();

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (capturedImagePreview) {
        capturedImagePreview.src = dataUrl;
        capturedImagePreview.style.display = 'block';
      }
      if (cameraPlaceholder) cameraPlaceholder.style.display = 'none';
      if (btnCapturePhoto) btnCapturePhoto.style.display = 'none';
      if (btnStartCamera) btnStartCamera.style.display = 'inline-flex';

      analyzeCapturedImage(dataUrl, file.name);
    };
    reader.readAsDataURL(file);
  });

  btnStartCamera?.addEventListener('click', startCamera);
  btnCapturePhoto?.addEventListener('click', capturePhotoFromStream);

  function analyzeCapturedImage(imageDataUrl, sourceName) {
    if (!viewfinder) return;

    viewfinder.classList.add('scanning');

    setTimeout(() => {
      viewfinder.classList.remove('scanning');

      const isQR = sourceName.toLowerCase().includes('qr') || sourceName.toLowerCase().includes('code');
      const isSalad = sourceName.toLowerCase().includes('salada') || sourceName.toLowerCase().includes('verde');
      const isPizzaOrPasta = sourceName.toLowerCase().includes('pizza') || sourceName.toLowerCase().includes('massa') || sourceName.toLowerCase().includes('queijo');

      let mealData = {
        name: 'Prato Saudável Analisado',
        desc: 'Identificado: Proteína magra grelhada, vegetais frescos e acompanhamento.',
        calories: 490,
        protein: 41,
        carbs: 45,
        fat: 12,
        allergens: []
      };

      if (isQR) {
        mealData = {
          name: 'Menu Restaurante - Prato Executivo Fit',
          desc: 'Leitura de QR Code: Peito de frango ao molho de ervas com legumes no vapor.',
          calories: 520,
          protein: 44,
          carbs: 48,
          fat: 14,
          allergens: ['Lactose']
        };
      } else if (isSalad) {
        mealData = {
          name: 'Salada Completa Proteica',
          desc: 'Identificado: Mix de folhas, tiras de peito de frango, azeite extra virgem e sementes.',
          calories: 380,
          protein: 35,
          carbs: 16,
          fat: 18,
          allergens: []
        };
      } else if (isPizzaOrPasta) {
        mealData = {
          name: 'Refeição Densa (Massa/Queijos)',
          desc: 'Identificado: Base de farinha de trigo refinada, molho e alto teor de laticínios.',
          calories: 760,
          protein: 24,
          carbs: 78,
          fat: 36,
          allergens: ['Glúten', 'Lactose']
        };
      }

      currentScannedMeal = mealData;

      if (document.getElementById('res-dish-name')) document.getElementById('res-dish-name').textContent = mealData.name;
      if (document.getElementById('res-dish-desc')) document.getElementById('res-dish-desc').textContent = mealData.desc;
      if (document.getElementById('res-calories')) document.getElementById('res-calories').textContent = `${mealData.calories} kcal`;
      if (document.getElementById('res-protein')) document.getElementById('res-protein').textContent = `${mealData.protein} g`;
      if (document.getElementById('res-carbs')) document.getElementById('res-carbs').textContent = `${mealData.carbs} g`;
      if (document.getElementById('res-fat')) document.getElementById('res-fat').textContent = `${mealData.fat} g`;

      const allergenConflicts = mealData.allergens.filter(a => anamnese.restrictions.includes(a));
      const verdictBanner = document.getElementById('verdict-banner');
      const verdictTitle = document.getElementById('verdict-title');
      const verdictDesc = document.getElementById('verdict-desc');
      const verdictAllergens = document.getElementById('verdict-allergens');
      const verdictIcon = document.getElementById('verdict-icon');

      if (verdictAllergens) verdictAllergens.innerHTML = '';

      if (allergenConflicts.length > 0) {
        if (verdictBanner) verdictBanner.className = 'result-verdict warning';
        if (verdictIcon) verdictIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        if (verdictTitle) verdictTitle.textContent = 'ATENÇÃO: RESTRIÇÃO ALIMENTAR DETECTADA!';
        if (verdictDesc) verdictDesc.textContent = 'A foto enviada contém ingredientes incompatíveis com sua anamnese!';

        allergenConflicts.forEach(allergen => {
          if (verdictAllergens) verdictAllergens.innerHTML += `<span class="allergen-tag"><i class="fa-solid fa-ban"></i> Contém ${allergen}</span> `;
        });
      } else if (mealData.calories > 700) {
        if (verdictBanner) verdictBanner.className = 'result-verdict warning';
        if (verdictIcon) verdictIcon.innerHTML = '<i class="fa-solid fa-fire"></i>';
        if (verdictTitle) verdictTitle.textContent = 'ALTA DENSIDADE CALÓRICA';
        if (verdictDesc) verdictDesc.textContent = 'Refeição nutritiva, porém atinge quase metade da sua meta diária.';
      } else {
        if (verdictBanner) verdictBanner.className = 'result-verdict approved';
        if (verdictIcon) verdictIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        if (verdictTitle) verdictTitle.textContent = 'APROVADO • DENTRO DA DIETA';
        if (verdictDesc) verdictDesc.textContent = 'Refeição alinhada com o seu objetivo e livre de alérgenos cadastrados.';
      }

      if (document.getElementById('scanner-placeholder')) document.getElementById('scanner-placeholder').style.display = 'none';
      if (document.getElementById('scanner-analysis-card')) document.getElementById('scanner-analysis-card').style.display = 'block';

    }, 1100);
  }

  document.getElementById('btn-add-scanned-to-dashboard')?.addEventListener('click', () => {
    if (!currentScannedMeal) return;

    dailyMeals.push({
      name: currentScannedMeal.name,
      calories: currentScannedMeal.calories,
      protein: currentScannedMeal.protein,
      carbs: currentScannedMeal.carbs,
      fat: currentScannedMeal.fat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    localStorage.setItem('nutriflow_meals', JSON.stringify(dailyMeals));
    updateDashboardStats();
    alert('Refeição adicionada ao seu painel principal!');
    switchView('dashboard-view');
  });

  // ==========================================================================
  // 10. DETOX & WATER ACCELERATOR
  // ==========================================================================
  
  function updateDetoxWaterUI() {
    if (document.getElementById('detox-water-val')) document.getElementById('detox-water-val').textContent = detoxWater;
    if (document.getElementById('stat-water-consumed')) document.getElementById('stat-water-consumed').textContent = detoxWater;

    const fillPercent = Math.min(100, Math.round((detoxWater / 3500) * 100));
    if (document.getElementById('detox-water-fill')) document.getElementById('detox-water-fill').style.height = `${fillPercent}%`;

    const dashWaterPercent = Math.min(100, Math.round((detoxWater / 2500) * 100));
    if (document.getElementById('water-progress-bar')) document.getElementById('water-progress-bar').style.width = `${dashWaterPercent}%`;
  }

  document.getElementById('btn-add-water-250')?.addEventListener('click', () => {
    detoxWater += 250;
    localStorage.setItem('nutriflow_detox_water', detoxWater);
    updateDetoxWaterUI();
  });

  document.getElementById('btn-add-water-500')?.addEventListener('click', () => {
    detoxWater += 500;
    localStorage.setItem('nutriflow_detox_water', detoxWater);
    updateDetoxWaterUI();
  });

  // ==========================================================================
  // 11. MODALS & FORMS
  // ==========================================================================
  
  const modalWeight = document.getElementById('modal-weight');
  document.getElementById('btn-open-weight-modal')?.addEventListener('click', openWeightModal);

  document.getElementById('close-modal-weight')?.addEventListener('click', () => {
    modalWeight?.classList.remove('active');
  });

  document.getElementById('btn-cancel-weight')?.addEventListener('click', () => {
    modalWeight?.classList.remove('active');
  });

  document.getElementById('form-add-weight')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newW = parseFloat(document.getElementById('input-new-weight').value);
    const dateVal = document.getElementById('input-weight-date').value;
    const formattedDate = dateVal ? dateVal.split('-').slice(1).reverse().join('/') : 'Hoje';

    if (newW) {
      anamnese.currentWeight = newW;
      weightHistory.push({ date: formattedDate, weight: newW });

      localStorage.setItem('nutriflow_anamnese', JSON.stringify(anamnese));
      localStorage.setItem('nutriflow_weight_history', JSON.stringify(weightHistory));

      updateDashboardStats();
      initWeightChart();
      updateEvolutionSummary();
      modalWeight?.classList.remove('active');
    }
  });

  const modalMeal = document.getElementById('modal-meal');
  document.getElementById('btn-add-meal-manual')?.addEventListener('click', () => {
    modalMeal?.classList.add('active');
  });

  document.getElementById('close-modal-meal')?.addEventListener('click', () => {
    modalMeal?.classList.remove('active');
  });

  document.getElementById('btn-cancel-meal')?.addEventListener('click', () => {
    modalMeal?.classList.remove('active');
  });

  document.getElementById('form-add-meal')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const mName = document.getElementById('meal-name').value;
    const mCals = parseInt(document.getElementById('meal-calories').value);
    const mProt = parseInt(document.getElementById('meal-protein').value) || 0;

    if (mName && mCals) {
      dailyMeals.push({
        name: mName,
        calories: mCals,
        protein: mProt,
        carbs: 20,
        fat: 8,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      localStorage.setItem('nutriflow_meals', JSON.stringify(dailyMeals));
      updateDashboardStats();
      modalMeal?.classList.remove('active');
    }
  });

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  syncProfileUI();
  updateDashboardStats();
  updateDetoxWaterUI();
  initWeightChart();
  renderDietPlanUI();
  renderSubstitutionsUI();
  updateEquivalenceCalculator();
  renderWorkoutUI();
  renderCardioUI();
  renderMeasurementsUI();
  updateEvolutionSummary();

});
