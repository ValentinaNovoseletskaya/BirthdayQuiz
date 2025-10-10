const UI = {
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
    document.getElementById('progressContainer').style.display = screenId === 'questionScreen' ? 'block' : 'none';
  },

  renderQuestion(questionIndex) {
    const q = SHUFFLED_QUESTIONS[questionIndex];
    // production name removed from header by design
    document.getElementById('questionNumber').textContent = `Вопрос ${questionIndex + 1} / ${AppState.totalQuestions}`;

    const questionContent = document.getElementById('questionContent');
    if (q.type === 'text') {
      questionContent.innerHTML = `<p class="question-text">${q.question}</p>`;
    } else {
      questionContent.innerHTML = `<div class="photo-question"><img src="${q.placeholderPath}" alt="Фото-вопрос" class="photo-zoom"><div class="photo-caption">${q.question}</div></div>`;
    }

    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    q.answers.forEach((answer, index) => {
      const label = String.fromCharCode(65 + index);
      const div = document.createElement('div');
      div.className = 'answer-option';
      div.setAttribute('role', 'radio');
      div.setAttribute('aria-checked', 'false');
      div.tabIndex = 0;
      div.innerHTML = `<span class="answer-label">${label}</span><span class="answer-text">${answer}</span>`;
      div.onclick = () => checkAnswer(index);
      answersContainer.appendChild(div);
    });

    this.resetHints();
    this.updateProgress();
    this.updateGalleryPreview();
  },

  resetHints() {
    document.getElementById('hint1').classList.remove('locked');
    document.getElementById('hint1').disabled = false;
    document.getElementById('hint2').classList.add('locked');
    document.getElementById('hint2').disabled = true;
    document.getElementById('hint3').classList.add('locked');
    document.getElementById('hint3').disabled = true;
    document.getElementById('timer1').textContent = '';
    document.getElementById('timer2').textContent = '';
    document.getElementById('timer3').textContent = '';
  },

  unlockHint(level) {
    const btn = document.getElementById(`hint${level}`);
    btn.classList.remove('locked');
    btn.disabled = false;
  },

  showHintModal(level) {
    const q = SHUFFLED_QUESTIONS[AppState.currentQuestionIndex];
    const hint = q.hints[level - 1];
    document.getElementById('hintTitle').textContent = `💡 Подсказка уровень ${level}`;
    // Разрешаем простой HTML для вывода иконок/изображений в подсказке
    const hintEl = document.getElementById('hintText');
    hintEl.innerHTML = hint.text;
    document.getElementById('hintModal').classList.add('active');
  },
  closeHintModal() { document.getElementById('hintModal').classList.remove('active'); },

  highlightAnswer(index, isCorrect) {
    const options = document.querySelectorAll('.answer-option');
    options.forEach((o, i) => {
      if (i === index) o.classList.add(isCorrect ? 'correct' : 'wrong');
      o.classList.add('disabled');
    });
  },

  showCorrectAnswer(correctIndex) {
    const options = document.querySelectorAll('.answer-option');
    if (options[correctIndex]) options[correctIndex].classList.add('correct');
  },

  showPhotoReveal(photoPath, photoNumber) {
    const overlay = document.getElementById('photoRevealOverlay');
    document.getElementById('revealedPhoto').src = photoPath;
    document.getElementById('photoNumberText').textContent = `Фото ${photoNumber} из ${AppState.totalQuestions}`;
    overlay.style.display = 'flex';
    playSound('applause');
  },
  hidePhotoReveal() { document.getElementById('photoRevealOverlay').style.display = 'none'; },

  updateProgress() {
    const collected = AppState.collectedPhotos.length;
    const total = AppState.totalQuestions;
    const percentage = (collected / total) * 100;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${collected}/${total} фото`;
  },

  updateGalleryPreview() {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';
    for (let i = 0; i < AppState.totalQuestions; i++) {
      const cell = document.createElement('div');
      cell.className = 'gallery-cell';
      if (AppState.collectedPhotos[i]) {
        cell.classList.add('filled');
        cell.style.backgroundImage = `url(${AppState.collectedPhotos[i]})`;
      } else {
        cell.classList.add('empty');
      }
      grid.appendChild(cell);
    }
  },

  renderFinalGallery() {
    const collageView = document.getElementById('collageView');
    collageView.innerHTML = '';
    AppState.collectedPhotos.forEach((photoPath, index) => {
      const div = document.createElement('div');
      div.className = 'gallery-photo';
      div.innerHTML = `<img src="${photoPath}" alt="Фото ${index + 1}"><span class="photo-number-badge">${index + 1}</span>`;
      div.onclick = () => openFullscreen(photoPath);
      collageView.appendChild(div);
    });
    document.getElementById('sliderPhoto').src = AppState.collectedPhotos[0] || '';
    document.getElementById('sliderCounter').textContent = `1 / ${AppState.totalQuestions}`;
    this.renderStatistics();
  },

  renderStatistics() {
    document.getElementById('statTime').textContent = AppState.getElapsedTime();
    document.getElementById('statCorrect').textContent = `${AppState.statistics.correctFirstTry}/${AppState.totalQuestions}`;
    document.getElementById('statHints').textContent = AppState.statistics.totalHintsUsed;
    document.getElementById('statFavorite').textContent = AppState.getFavoriteProduction();
  },

  animateCurtain(opening = true) {
    const curtain = document.getElementById('curtainAnimation');
    curtain.style.display = 'block';
    setTimeout(() => { curtain.style.display = 'none'; }, 1000);
  }
};


