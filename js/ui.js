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
    // playSound('applause'); // Звук отключен
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
    // Функция отключена, так как элемент galleryGrid не существует
    // Вместо этого используется боковая галерея
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

// ========================================
// ФУНКЦИЯ СОЗДАНИЯ КОНФЕТТИ
// ========================================
function createCelebrationParticles(duration = 8000) {
  const container = document.getElementById('celebrationParticles');
  if (!container) return;

  container.classList.add('active');

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  let particleCount = 40;
  if (isSmallMobile) {
    particleCount = 15;
  } else if (isMobile) {
    particleCount = 25;
  }

  const colors = ['#FFD700', '#FFA500', '#FF6B9D', '#C71585', '#4169E1', '#00CED1'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = Math.random() > 0.5 ? 'sparkle' : 'sparkle confetti';

    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (3 + Math.random() * 4) + 's';
    particle.style.animationDelay = (Math.random() * 2) + 's';
    particle.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');

    if (particle.classList.contains('confetti')) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.setProperty('--confetti-color', color);
    }

    container.appendChild(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 8000);
  }

  setTimeout(() => {
    container.classList.remove('active');
    container.innerHTML = '';
  }, duration);
}

// ========================================
// ФУНКЦИЯ ФЕЙЕРВЕРКА
// ========================================
function startFireworks() {
  const fireworks = document.getElementById('fireworks');
  if (fireworks) {
    fireworks.classList.remove('hidden');
    
    // Убираем фейерверк через 5 секунд
    setTimeout(() => {
      fireworks.classList.add('hidden');
    }, 5000);
  }
}

// ========================================
// НОВАЯ ФУНКЦИЯ ПОКАЗА ГАЛЕРЕИ С ЭФФЕКТАМИ
// ========================================
function showGallery() {
  if (AppState.timer) {
    clearInterval(AppState.timer);
  }

  AppState.endTime = Date.now();

  // Шаг 0: Показать занавес
  const finalCurtain = document.getElementById('finalCurtain');
  if (finalCurtain) {
    // Сбрасываем transform панелей на начальное состояние (закрыто)
    const panels = finalCurtain.querySelectorAll('.curtain-panel');
    panels.forEach(panel => {
      panel.style.transform = 'translateX(0)';
    });
    
    finalCurtain.style.display = 'flex';
    
    // Раздвигаем занавес через небольшую задержку
    setTimeout(() => {
      panels.forEach(panel => {
        if (panel.classList.contains('left-panel')) {
          panel.style.transform = 'translateX(-100%)';
        } else {
          panel.style.transform = 'translateX(100%)';
        }
      });
      
      // Убираем занавес через 3 секунды после начала раздвижения
      setTimeout(() => {
        finalCurtain.style.display = 'none';
        // Сбрасываем transform для следующего использования
        panels.forEach(panel => {
          panel.style.transform = 'translateX(0)';
        });
        
        // Запускаем фейерверк после открытия занавеса
        startFireworks();
      }, 3000);
    }, 100);
  }

  // Шаг 1: Показать оверлей с статистикой
  const completionOverlay = document.getElementById('completionOverlay');
  if (completionOverlay) {
    completionOverlay.style.display = 'flex';
    
    // Заполняем статистику в оверлее
    const completionStats = {
      time: document.getElementById('completionStatTime'),
      correct: document.getElementById('completionStatCorrect'),
      hints: document.getElementById('completionStatHints'),
      favorite: document.getElementById('completionStatFavorite')
    };
    
    if (completionStats.time) completionStats.time.textContent = AppState.getElapsedTime();
    if (completionStats.correct) completionStats.correct.textContent = `${AppState.statistics.correctFirstTry}/${AppState.totalQuestions}`;
    if (completionStats.hints) completionStats.hints.textContent = AppState.statistics.totalHintsUsed;
    if (completionStats.favorite) completionStats.favorite.textContent = AppState.getFavoriteProduction();
  }

  // Шаг 2: Конфетти (0.5с)
  setTimeout(() => {
    if (typeof createCelebrationParticles === 'function') {
      createCelebrationParticles(10000);
    }
  }, 500);

  // Шаг 3: Фейерверк (1с)
  setTimeout(() => {
    const fireworks = document.getElementById('fireworks');
    if (fireworks) {
      fireworks.classList.remove('hidden');
    }
  }, 1000);

  // Шаг 4: Переход к галерее (5с) - убираем автоматическое закрытие оверлея
  setTimeout(() => {
    // Оверлей теперь закрывается только по кнопке "Получить приз"
    // if (completionOverlay) {
    //   completionOverlay.style.display = 'none';
    // }

    const questionScreen = document.getElementById('questionScreen');
    if (questionScreen) {
      questionScreen.style.display = 'none';
    }

    const galleryScreen = document.getElementById('galleryScreen');
    if (galleryScreen) {
      galleryScreen.style.display = 'block';
      galleryScreen.style.opacity = '0';

      setTimeout(() => {
        galleryScreen.style.transition = 'opacity 1s ease-in';
        galleryScreen.style.opacity = '1';
      }, 50);
    }

    const sideCurtains = document.getElementById('sideCurtains');
    if (sideCurtains) {
      sideCurtains.style.display = 'none';
    }

    const progressContainer = document.getElementById('progressContainer');
    if (progressContainer) {
      progressContainer.style.display = 'none';
    }

    setTimeout(() => {
      const fireworks = document.getElementById('fireworks');
      if (fireworks) {
        fireworks.classList.add('hidden');
      }
    }, 3000);

    // Скрываем коллаж по умолчанию, показываем слайдер
    const collageView = document.getElementById('collageView');
    const sliderView = document.getElementById('sliderView');
    const collageBtn = document.getElementById('collageMode');
    const sliderBtn = document.getElementById('sliderMode');
    
    if (collageView) collageView.style.display = 'none';
    if (sliderView) sliderView.style.display = 'block';
    if (collageBtn) collageBtn.classList.remove('active');
    if (sliderBtn) sliderBtn.classList.add('active');

    if (typeof UI.renderFinalGallery === 'function') {
      UI.renderFinalGallery();
    }

    // Убираем автозапуск слайдера - он запускается только по кнопке "Получить приз"
    // setTimeout(() => {
    //   startPrizeSlider();
    // }, 1000);

  }, 5000);
}

// ========================================
// ФУНКЦИЯ ЗАПУСКА ПРИЗОВОГО СЛАЙДЕРА
// ========================================
function startPrizeSlider() {
  console.log('Запуск призового слайдера');
  
  // Скрываем оверлей
  const completionOverlay = document.getElementById('completionOverlay');
  if (completionOverlay) {
    completionOverlay.style.display = 'none';
  }

  // Переключаемся на слайдер в полноэкранном режиме
  const sliderView = document.getElementById('sliderView');
  if (sliderView) {
    sliderView.classList.add('slider-view-fullscreen');
    sliderView.style.display = 'flex';
  }
  
  // Скрываем кнопки переключения режимов
  const collageBtn = document.getElementById('collageMode');
  const sliderBtn = document.getElementById('sliderMode');
  if (collageBtn) collageBtn.style.display = 'none';
  if (sliderBtn) sliderBtn.style.display = 'none';
  
  // Запускаем автопрокрутку
  startAutoSlider();
  
  // Добавляем кнопку закрытия
  addSliderCloseButton();
  
  // После завершения слайдера показываем поздравление
  setTimeout(() => {
    console.log('Автопрокрутка завершена, показываем поздравление');
    const sliderView = document.getElementById('sliderView');
    if (sliderView) {
      sliderView.style.display = 'none';
      sliderView.classList.remove('slider-view-fullscreen');
    }
    showBirthdayCongratulation();
  }, AppState.collectedPhotos.length * 3000 + 2000);
}

// ========================================
// ФУНКЦИЯ ПОКАЗА ПОЗДРАВЛЕНИЯ
// ========================================
function showBirthdayCongratulation() {
  const birthdayCongrats = document.getElementById('birthdayCongratulation');
  if (birthdayCongrats) {
    birthdayCongrats.style.display = 'block';
    birthdayCongrats.style.opacity = '0';
    birthdayCongrats.style.transform = 'translateY(30px)';
    birthdayCongrats.style.transition = 'opacity 1s ease-out, transform 1s ease-out';

    setTimeout(() => {
      birthdayCongrats.style.opacity = '1';
      birthdayCongrats.style.transform = 'translateY(0)';
    }, 100);
  }
}


