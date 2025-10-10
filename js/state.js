const AppState = {
  currentQuestionIndex: 0,
  collectedPhotos: [],
  totalQuestions: 35,
  answers: {},
  productionProgress: {}, // Отслеживание прогресса по каждому произведению
  statistics: {
    startTime: null,
    endTime: null,
    correctFirstTry: 0,
    totalHintsUsed: 0,
    productionStats: {}
  },

  init() {
    this.loadFromStorage();
    if (!this.statistics.startTime) this.statistics.startTime = Date.now();
  },

  save() {
    localStorage.setItem('quizState', JSON.stringify({
      currentQuestionIndex: this.currentQuestionIndex,
      collectedPhotos: this.collectedPhotos,
      answers: this.answers,
      productionProgress: this.productionProgress,
      statistics: this.statistics
    }));
  },

  loadFromStorage() {
    const saved = localStorage.getItem('quizState');
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      this.currentQuestionIndex = data.currentQuestionIndex || 0;
      this.collectedPhotos = data.collectedPhotos || [];
      this.answers = data.answers || {};
      this.productionProgress = data.productionProgress || {};
      this.statistics = data.statistics || this.statistics;
    } catch (e) {
      console.error('Ошибка загрузки состояния:', e);
    }
  },

  reset() {
    localStorage.removeItem('quizState');
    this.currentQuestionIndex = 0;
    this.collectedPhotos = [];
    this.answers = {};
    this.productionProgress = {};
    this.statistics = {
      startTime: Date.now(),
      endTime: null,
      correctFirstTry: 0,
      totalHintsUsed: 0,
      productionStats: {}
    };
    // Очистить визуальное закрашивание названий произведений
    this.clearProductionProgressVisuals();
  },

  recordAnswer(questionId, isCorrect, attempts, hintsUsed) {
    this.answers[questionId] = { correct: isCorrect, attempts, hintsUsed, timestamp: Date.now() };
    if (isCorrect && attempts === 1) this.statistics.correctFirstTry++;
    this.statistics.totalHintsUsed += hintsUsed.length;

    const question = QUESTIONS_DATA.find(q => q.id === questionId);
    if (question) {
      const production = question.production;
      if (!this.statistics.productionStats[production]) this.statistics.productionStats[production] = { total: 0, correct: 0 };
      this.statistics.productionStats[production].total++;
      if (isCorrect) this.statistics.productionStats[production].correct++;
    }
    this.save();
  },

  addPhoto(photoPath) {
    if (!this.collectedPhotos.includes(photoPath)) {
      this.collectedPhotos.push(photoPath);
      this.save();
    }
  },

  complete() {
    this.statistics.endTime = Date.now();
    this.save();
  },

  getFavoriteProduction() {
    let maxScore = 0; let favorite = '';
    for (const [production, stats] of Object.entries(this.statistics.productionStats)) {
      const score = stats.correct / stats.total;
      if (score > maxScore) { maxScore = score; favorite = production; }
    }
    return favorite || 'Все постановки';
  },

  getElapsedTime() {
    if (!this.statistics.startTime) return '0 мин';
    const end = this.statistics.endTime || Date.now();
    const elapsed = end - this.statistics.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${minutes} мин ${seconds} сек`;
  },

  updateProductionProgress(production) {
    if (!this.productionProgress[production]) {
      this.productionProgress[production] = 0;
    }
    this.productionProgress[production]++;
    
    // Обновляем визуальное отображение на занавесе
    const titleEl = document.querySelector(`.production-title[data-production="${production}"]`);
    if (titleEl) {
      const progress = this.productionProgress[production];
      titleEl.className = 'production-title progress-' + progress;
    }
    
    this.save();
  },

  restoreProductionProgress() {
    // Восстанавливаем визуальный прогресс произведений после загрузки страницы
    for (const [production, progress] of Object.entries(this.productionProgress)) {
      const titleEl = document.querySelector(`.production-title[data-production="${production}"]`);
      if (titleEl && progress > 0) {
        titleEl.className = 'production-title progress-' + progress;
      }
    }
  },

  clearProductionProgressVisuals() {
    const titles = document.querySelectorAll('.production-title');
    titles.forEach(t => t.className = 'production-title');
  }
};


