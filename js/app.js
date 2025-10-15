let currentAttempts = 0;
let maxAttempts = 3;
let usedHints = [];
let hintTimers = {};
let hintCountdownIntervals = {};
let currentSlideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
  AppState.restoreProductionProgress(); // Восстанавливаем прогресс на занавесах
  initMobileGallery(); // Инициализируем мобильную галерею
  
  // Проверяем целостность сохраненного состояния
  if (AppState.currentQuestionIndex > 0) {
    const savedOrder = localStorage.getItem('quizOrder');
    if (!savedOrder) {
      console.warn('Обнаружен прогресс, но нет сохраненного порядка вопросов. Сбрасываем прогресс.');
      AppState.reset();
      resetQuestionOrder();
    } else if (AppState.currentQuestionIndex >= SHUFFLED_QUESTIONS.length) {
      console.warn('Обнаружен прогресс за пределами количества вопросов. Сбрасываем прогресс.');
      AppState.reset();
      resetQuestionOrder();
    } else {
      showConfirm(
        'Продолжить квиз?',
        'Обнаружен сохранённый прогресс. Хотите продолжить с того места, где остановились?',
        () => continueFromSaved(),
        () => { // Отказ: сбрасываем прогресс, чистим закрашивание
          AppState.reset();
          resetQuestionOrder(); // Сбрасываем порядок вопросов
          AppState.clearProductionProgressVisuals();
          clearSideGalleryPhotos(); // Очищаем боковые галереи
          clearMobileGallery(); // Очищаем мобильную галерею
        }
      );
    }
  }
});

function startQuiz() {
  AppState.reset();
  resetQuestionOrder(); // Сбрасываем порядок вопросов для нового квиза
  AppState.init();
  AppState.clearProductionProgressVisuals();
  clearSideGalleryPhotos(); // Очищаем боковые галереи при начале нового квиза
  clearMobileGallery(); // Очищаем мобильную галерею
  UI.showScreen('questionScreen');
  loadQuestion(0);
  UI.animateCurtain(true);
}

function continueFromSaved() {
  if (AppState.currentQuestionIndex >= AppState.totalQuestions) {
    showFinalGallery();
  } else {
    UI.showScreen('questionScreen');
    restoreSideGalleryPhotos();
    loadQuestion(AppState.currentQuestionIndex);
  }
}

function loadQuestion(index) {
  if (index >= SHUFFLED_QUESTIONS.length) { completeQuiz(); return; }
  
  // Обновляем состояние и сразу сохраняем
  AppState.currentQuestionIndex = index;
  AppState.save(); // Синхронно сохраняем новое состояние
  
  currentAttempts = 0;
  usedHints = [];
  Object.values(hintTimers).forEach(t => clearTimeout(t));
  hintTimers = {};
  Object.values(hintCountdownIntervals).forEach(iv => clearInterval(iv));
  hintCountdownIntervals = {};
  UI.renderQuestion(index);
  startHintTimers();
}

function startHintTimers() {
  const q = SHUFFLED_QUESTIONS[AppState.currentQuestionIndex];
  q.hints.forEach((hint, i) => {
    const level = i + 1;
    if (hint.delay > 0) {
      // обратный отсчёт
      const timerEl = document.getElementById(`timer${level}`);
      let remaining = Math.ceil(hint.delay / 1000);
      timerEl.textContent = `${remaining}с`;
      hintCountdownIntervals[level] = setInterval(() => {
        remaining--;
        if (remaining > 0) {
          timerEl.textContent = `${remaining}с`;
        } else {
          clearInterval(hintCountdownIntervals[level]);
          timerEl.textContent = '';
        }
      }, 1000);

      hintTimers[level] = setTimeout(() => UI.unlockHint(level), hint.delay);
    }
  });
}

function showHint(level) {
  const btn = document.getElementById(`hint${level}`);
  if (btn.disabled) return;
  if (!usedHints.includes(level)) usedHints.push(level);
  UI.showHintModal(level);
}

function closeHint() { UI.closeHintModal(); }

function checkAnswer(selectedIndex) {
  const q = SHUFFLED_QUESTIONS[AppState.currentQuestionIndex];
  const isCorrect = selectedIndex === q.correctIndex;
  currentAttempts++;
  UI.highlightAnswer(selectedIndex, isCorrect);
  if (isCorrect) {
    // playSound('applause'); // Звук отключен
    AppState.recordAnswer(q.id, true, currentAttempts, usedHints);
    AppState.addPhoto(q.photoPath);
    addPhotoToMobileGallery(q.photoPath); // Добавляем в мобильную галерею
    AppState.updateProductionProgress(q.production); // Обновляем прогресс произведения
    
    // Заранее обновляем индекс следующего вопроса и сохраняем состояние
    const nextIndex = AppState.currentQuestionIndex + 1;
    if (nextIndex >= AppState.totalQuestions) {
      AppState.complete(); // Сохраняем завершение квиза
    } else {
      AppState.currentQuestionIndex = nextIndex;
      AppState.save(); // Синхронно сохраняем переход к следующему вопросу
    }
    
    // Раздвигаем занавесы и показываем вылет фото
    setTimeout(() => {
      openCurtains();
      setTimeout(() => {
        showFlyingPhoto(q.photoPath, AppState.currentQuestionIndex - 1); // Используем предыдущий индекс для анимации
        
        // Загружаем следующий вопрос во время полета фото
        setTimeout(() => {
          if (nextIndex >= AppState.totalQuestions) {
            completeQuiz();
          } else {
            loadQuestion(nextIndex);
          }
        }, 800);
        
        closeCurtains();
      }, 600);
    }, 400);
  } else {
    // playSound('wrong'); // Звук отключен
    if (currentAttempts < maxAttempts) {
      if (currentAttempts === 1) UI.unlockHint(2);
      else if (currentAttempts === 2) UI.unlockHint(3);
      
      const attemptsLeft = maxAttempts - currentAttempts;
      const attemptWord = attemptsLeft === 1 ? 'попытка' : attemptsLeft === 2 ? 'попытки' : 'попыток';
      
      setTimeout(() => {
        showNotification(
          'Не совсем так...',
          `Попробуйте ещё раз! У вас осталось ${attemptsLeft} ${attemptWord}.`,
          () => {
            document.querySelectorAll('.answer-option').forEach(o => o.classList.remove('wrong', 'disabled'));
          }
        );
      }, 400);
    } else {
      UI.showCorrectAnswer(q.correctIndex);
      AppState.recordAnswer(q.id, false, currentAttempts, usedHints);
      setTimeout(() => {
        showNotification(
          'Попытки исчерпаны',
          'Не расстраивайтесь! Правильный ответ отмечен, и вы всё равно получите фотографию.',
          () => {
            AppState.addPhoto(q.photoPath);
            addPhotoToMobileGallery(q.photoPath); // Добавляем в мобильную галерею
            UI.updateProgress(); // Обновляем прогресс-бар
            
            // Заранее обновляем индекс следующего вопроса и сохраняем состояние
            const nextIndex = AppState.currentQuestionIndex + 1;
            if (nextIndex >= AppState.totalQuestions) {
              AppState.complete(); // Сохраняем завершение квиза
            } else {
              AppState.currentQuestionIndex = nextIndex;
              AppState.save(); // Синхронно сохраняем переход к следующему вопросу
            }
            
            // Показываем стандартную анимацию полета фото
            setTimeout(() => {
              openCurtains();
              setTimeout(() => {
                showFlyingPhoto(q.photoPath);
                setTimeout(() => {
                  closeCurtains();
                  setTimeout(() => {
                    if (nextIndex >= AppState.totalQuestions) {
                      completeQuiz();
                    } else {
                      loadQuestion(nextIndex);
                    }
                  }, 500);
                }, 1500);
              }, 500);
            }, 500);
          }
        );
      }, 1000);
    }
  }
}

function continueQuiz() {
  UI.hidePhotoReveal();
  const nextIndex = AppState.currentQuestionIndex + 1;
  if (nextIndex >= AppState.totalQuestions) completeQuiz();
  else loadQuestion(nextIndex);
}

function completeQuiz() {
  console.log('completeQuiz вызвана');
  AppState.complete();
  
  // Вызываем новую функцию showGallery с эффектами
  if (typeof showGallery === 'function') {
    showGallery();
  } else {
    // Фоллбэк на старую логику
    const questionScreen = document.getElementById('questionScreen');
    if (questionScreen) questionScreen.style.display = 'none';
    
    const fw = document.getElementById('fireworks');
    if (fw) {
      fw.classList.remove('hidden');
      setTimeout(() => fw.classList.add('hidden'), 5000);
    }
    
    showAchievementsWindow();
  }
}

function showAchievementsWindow() {
  console.log('showAchievementsWindow вызвана');
  // Сначала показываем экран галереи
  UI.showScreen('galleryScreen');
  UI.renderFinalGallery();
  UI.animateCurtain(true);
  
  // Показываем панель достижений
  const statsPanel = document.getElementById('statisticsPanel');
  console.log('statisticsPanel найден:', statsPanel);
  if (statsPanel) {
    statsPanel.style.display = 'block';
    statsPanel.style.visibility = 'visible';
    statsPanel.style.opacity = '1';
    // Убираем автоматическую прокрутку к статистике
    // statsPanel.scrollIntoView({ behavior: 'smooth' });
    
    // Рендерим статистику
    UI.renderStatistics();
    
    // Настраиваем кнопку "Приз"
    const prizeBtn = document.getElementById('prizeButton');
    console.log('Кнопка Приз найдена:', prizeBtn);
    if (prizeBtn) {
      console.log('Устанавливаем обработчик для кнопки Приз');
      
      // Удаляем все предыдущие обработчики
      prizeBtn.onclick = null;
      prizeBtn.removeEventListener('click', prizeBtn._prizeHandler);
      
      // Создаем новый обработчик
      prizeBtn._prizeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Кнопка Приз нажата!');
        
        // Сворачиваем окно достижений
        console.log('Вызываем collapseAchievementsWindow');
        collapseAchievementsWindow();
        
        // Показываем слайдер
        console.log('Вызываем showPrizeSlider');
        showPrizeSlider();
      };
      
      // Добавляем только один обработчик
      prizeBtn.addEventListener('click', prizeBtn._prizeHandler);
    } else {
      console.error('Кнопка Приз не найдена!');
    }
  }
}

function collapseAchievementsWindow() {
  console.log('collapseAchievementsWindow вызвана');
  const statsPanel = document.getElementById('statisticsPanel');
  console.log('statsPanel для сворачивания:', statsPanel);
  if (statsPanel) {
    console.log('Сворачиваем панель достижений');
    // Сворачиваем в иконку рядом с кнопками режимов
    statsPanel.style.transform = 'scale(0.8)';
    statsPanel.style.opacity = '0.9';
    statsPanel.style.position = 'fixed';
    statsPanel.style.top = '50px';
    statsPanel.style.left = 'calc(50% - 400px)'; // Левее кнопки "Коллаж"
    statsPanel.style.width = '120px';
    statsPanel.style.height = '60px';
    statsPanel.style.cursor = 'pointer';
    statsPanel.style.zIndex = '2000';
    statsPanel.style.borderRadius = '10px';
    statsPanel.style.border = '3px solid var(--theatre-gold)';
    statsPanel.style.background = 'rgba(184, 134, 11, 0.95)';
    statsPanel.style.color = 'var(--theatre-dark-red)';
    statsPanel.style.fontSize = '12px';
    statsPanel.style.padding = '5px';
    statsPanel.style.textAlign = 'center';
    statsPanel.style.display = 'flex';
    statsPanel.style.alignItems = 'center';
    statsPanel.style.justifyContent = 'center';
    statsPanel.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
    
    // Меняем содержимое на понятный текст
    statsPanel.innerHTML = '<div style="font-weight: bold;">🏆 Достижения</div>';
    
    // Добавляем обработчик клика для разворачивания
    statsPanel.onclick = () => {
      console.log('Клик по свернутой панели - разворачиваем');
      expandAchievementsWindow();
    };
  }
}

function expandAchievementsWindow() {
  const statsPanel = document.getElementById('statisticsPanel');
  if (statsPanel) {
    // Возвращаем нормальный вид
    statsPanel.style.transform = 'scale(1)';
    statsPanel.style.opacity = '1';
    statsPanel.style.position = '';
    statsPanel.style.top = '';
    statsPanel.style.right = '';
    statsPanel.style.width = '';
    statsPanel.style.height = '';
    statsPanel.style.cursor = '';
    statsPanel.style.zIndex = '';
    
    // Убираем обработчик клика
    statsPanel.onclick = null;
    
    // Настраиваем кнопку "Приз" снова
    const prizeBtn = document.getElementById('prizeButton');
    console.log('Восстанавливаем обработчик для кнопки Приз:', prizeBtn);
    if (prizeBtn) {
      prizeBtn.onclick = () => {
        console.log('Кнопка Приз нажата (восстановленный обработчик)!');
        collapseAchievementsWindow();
        showPrizeSlider();
      };
    }
  }
}

function showPrizeSlider() {
  console.log('showPrizeSlider вызвана');
  // Переключаем в режим слайдера (экран галереи уже показан)
  console.log('Переключаем в режим слайдера');
  switchViewMode('slider');
  console.log('Запускаем автопрокрутку');
  startAutoSlider();
  
  // Добавляем кнопку закрытия слайдера
  console.log('Добавляем кнопку закрытия');
  addSliderCloseButton();
}

function addSliderCloseButton() {
  const sliderView = document.getElementById('sliderView');
  if (sliderView) {
    // Создаем кнопку закрытия если её нет
    let closeBtn = document.getElementById('sliderCloseBtn');
    if (!closeBtn) {
      closeBtn = document.createElement('button');
      closeBtn.id = 'sliderCloseBtn';
      closeBtn.className = 'slider-close-btn';
      closeBtn.innerHTML = '✕';
      closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      closeBtn.onclick = () => {
        console.log('Кнопка закрытия слайдера нажата');
        stopAutoSlider();
        // Скрываем слайдер и показываем поздравление
        const sliderView = document.getElementById('sliderView');
        if (sliderView) {
          sliderView.style.display = 'none';
          sliderView.classList.remove('slider-view-fullscreen');
        }
        // Показываем кнопки переключения режимов
        const collageBtn = document.getElementById('collageMode');
        const sliderBtn = document.getElementById('sliderMode');
        if (collageBtn) collageBtn.style.display = 'block';
        if (sliderBtn) sliderBtn.style.display = 'block';
        showBirthdayCongratulation();
      };
      sliderView.appendChild(closeBtn);
    }
  }
}

function showFinalGallery() { 
  UI.showScreen('galleryScreen'); 
  UI.renderFinalGallery(); 
  UI.animateCurtain(true); 
}

function switchViewMode(mode) {
  console.log('switchViewMode вызвана с режимом:', mode);
  const collageView = document.getElementById('collageView');
  const sliderView = document.getElementById('sliderView');
  const collageBtn = document.getElementById('collageMode');
  const sliderBtn = document.getElementById('sliderMode');
  
  console.log('Элементы найдены:', { collageView, sliderView, collageBtn, sliderBtn });
  
  if (mode === 'collage') {
    console.log('Переключаемся в режим коллажа');
    collageView.style.display = 'grid';
    sliderView.style.display = 'none';
    collageBtn.classList.add('active');
    sliderBtn.classList.remove('active');
  } else {
    console.log('Переключаемся в режим слайдера');
    collageView.style.display = 'none';
    sliderView.style.display = 'block';
    sliderBtn.classList.add('active');
    collageBtn.classList.remove('active');
    console.log('Показываем слайд с индексом:', currentSlideIndex);
    showSlide(currentSlideIndex);
  }
}

function showSlide(index) {
  if (index < 0) index = AppState.collectedPhotos.length - 1;
  if (index >= AppState.collectedPhotos.length) index = 0;
  currentSlideIndex = index;
  document.getElementById('sliderPhoto').src = AppState.collectedPhotos[index] || '';
  document.getElementById('sliderCounter').textContent = `${index + 1} / ${AppState.totalQuestions}`;
  
  // Сценарий 2: Если пользователь дошел до последнего фото (35) вручную
  if (index === AppState.collectedPhotos.length - 1) {
    console.log('Достигнуто последнее фото (35) - закрываем слайдер');
    stopAutoSlider();
    setTimeout(() => {
      const sliderView = document.getElementById('sliderView');
      if (sliderView) {
        sliderView.style.display = 'none';
        sliderView.classList.remove('slider-view-fullscreen');
      }
      // Показываем кнопки переключения режимов
      const collageBtn = document.getElementById('collageMode');
      const sliderBtn = document.getElementById('sliderMode');
      if (collageBtn) collageBtn.style.display = 'block';
      if (sliderBtn) sliderBtn.style.display = 'block';
      showBirthdayCongratulation();
    }, 1000); // Даем время пользователю увидеть последнее фото
  }
}

// Убираем обработчик клика по фото в слайдере
// Клик по фото больше не закрывает слайдер
function prevPhoto() { showSlide(currentSlideIndex - 1); }
function nextPhoto() { 
  // Проверяем, не достигли ли мы последнего фото
  if (currentSlideIndex >= AppState.collectedPhotos.length - 1) {
    console.log('Нажата стрелка вправо на последнем фото - закрываем слайдер');
    stopAutoSlider();
    setTimeout(() => {
      const sliderView = document.getElementById('sliderView');
      if (sliderView) {
        sliderView.style.display = 'none';
        sliderView.classList.remove('slider-view-fullscreen');
      }
      // Показываем кнопки переключения режимов
      const collageBtn = document.getElementById('collageMode');
      const sliderBtn = document.getElementById('sliderMode');
      if (collageBtn) collageBtn.style.display = 'block';
      if (sliderBtn) sliderBtn.style.display = 'block';
      showBirthdayCongratulation();
    }, 500);
  } else {
    showSlide(currentSlideIndex + 1); 
  }
}

let autoSliderTimer = null;
let autoSliderCounter = 0;
function startAutoSlider() {
  clearInterval(autoSliderTimer);
  autoSliderCounter = 0;
  autoSliderTimer = setInterval(() => {
    nextPhoto();
    autoSliderCounter++;
    
    // Автоматически закрываем слайдер после показа всех фото
    if (autoSliderCounter >= AppState.collectedPhotos.length) {
      stopAutoSlider();
      console.log('Автопрокрутка завершена, показываем поздравление');
      showBirthdayCongratulation();
    }
  }, 3000);
}
function stopAutoSlider() { 
  clearInterval(autoSliderTimer); 
  autoSliderCounter = 0;
}

function toggleGalleryPreview() {
  const preview = document.getElementById('galleryPreview');
  if (preview) preview.classList.toggle('minimized');
}

// ============= УПРАВЛЕНИЕ ЗАНАВЕСАМИ =============
function openCurtains() {
  const curtains = document.getElementById('sideCurtains');
  if (curtains) curtains.classList.add('open');
}

function closeCurtains() {
  const curtains = document.getElementById('sideCurtains');
  if (curtains) {
    setTimeout(() => curtains.classList.remove('open'), 1200);
  }
}

// ============= ВЫЛЕТ ФОТО ИЗ-ЗА ЗАНАВЕСА =============
function showFlyingPhoto(photoPath, photoIndex) {
  const flyingPhoto = document.createElement('img');
  flyingPhoto.src = photoPath;
  flyingPhoto.className = 'photo-flying';
  flyingPhoto.style.cssText = `
    left: 50%;
    top: 50%;
    width: 300px;
    height: 225px;
    object-fit: cover;
    border: 6px solid var(--theatre-gold);
    box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,215,0,0.6);
  `;
  
  document.body.appendChild(flyingPhoto);
  
  // Определяем случайную позицию для фото
  const isLeft = photoIndex % 2 === 0;
  const gallery = isLeft ? 
    document.getElementById('sideGalleryLeft') : 
    document.getElementById('sideGalleryRight');
  
  // Анимация полета к галерее
  setTimeout(() => {
    const galleryRect = gallery.getBoundingClientRect();
    const slots = gallery.querySelectorAll('.side-photo-slot');
    const emptySlot = Array.from(slots).find(s => !s.classList.contains('filled'));
    
    if (emptySlot) {
      const slotRect = emptySlot.getBoundingClientRect();
      flyingPhoto.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      flyingPhoto.style.left = slotRect.left + slotRect.width / 2 + 'px';
      flyingPhoto.style.top = slotRect.top + slotRect.height / 2 + 'px';
      flyingPhoto.style.width = slotRect.width + 'px';
      flyingPhoto.style.height = slotRect.height + 'px';
      flyingPhoto.style.opacity = '0';
      
      // Заполняем слот
      setTimeout(() => {
        emptySlot.style.backgroundImage = `url('${photoPath}')`;
        emptySlot.classList.add('filled');
        flyingPhoto.remove();
      }, 1500);
    } else {
      setTimeout(() => flyingPhoto.remove(), 2000);
    }
  }, 1000);
}

// ============= ИНИЦИАЛИЗАЦИЯ БОКОВЫХ ГАЛЕРЕЙ =============
function initSideGalleries() {
  const leftGallery = document.getElementById('sideGalleryLeft');
  const rightGallery = document.getElementById('sideGalleryRight');
  
  if (!leftGallery || !rightGallery) return;
  
  // Создаем слоты в случайных позициях
  const totalSlots = 18; // 18 на каждую сторону = 36 общее (35 фото + 1 запасной)
  
  for (let i = 0; i < totalSlots; i++) {
    const gallery = i % 2 === 0 ? leftGallery : rightGallery;
    const slot = document.createElement('div');
    slot.className = 'side-photo-slot';
    
    // Случайное позиционирование
    const top = Math.random() * 70 + 5; // от 5% до 75%
    const left = Math.random() * 30 + 10; // от 10% до 40%
    const rotation = Math.random() * 20 - 10; // от -10 до +10 градусов
    
    slot.style.top = `${top}%`;
    slot.style.left = `${left}%`;
    slot.style.transform = `rotate(${rotation}deg)`;
    
    gallery.appendChild(slot);
  }
}

// Инициализируем галереи при загрузке
window.addEventListener('DOMContentLoaded', () => {
  initSideGalleries();
  initMobileGallery(); // Инициализируем мобильную галерею
  // Если есть сохраненные фото, восстановим их в слоты
  restoreSideGalleryPhotos();
  restoreMobileGallery(); // Восстанавливаем мобильную галерею
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') UI.closeHintModal();
  const sliderVisible = document.getElementById('sliderView') && document.getElementById('sliderView').style.display !== 'none';
  if (sliderVisible) {
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  }
  if (document.getElementById('questionScreen') && document.getElementById('questionScreen').style.display !== 'none') {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 4) {
      const options = document.querySelectorAll('.answer-option');
      if (options[num - 1] && !options[num - 1].classList.contains('disabled')) checkAnswer(num - 1);
    }
  }
});

// ============= ВОССТАНОВЛЕНИЕ ФОТО В БОКОВЫХ ГАЛЕРЕЯХ =============
function restoreSideGalleryPhotos() {
  const leftGallery = document.getElementById('sideGalleryLeft');
  const rightGallery = document.getElementById('sideGalleryRight');
  if (!leftGallery || !rightGallery) return;
  const leftSlots = leftGallery.querySelectorAll('.side-photo-slot');
  const rightSlots = rightGallery.querySelectorAll('.side-photo-slot');
  let li = 0, ri = 0;
  AppState.collectedPhotos.forEach((photoPath, index) => {
    const isLeft = index % 2 === 0;
    if (isLeft && leftSlots[li]) {
      const slot = leftSlots[li++];
      slot.style.backgroundImage = `url('${photoPath}')`;
      slot.classList.add('filled');
    } else if (!isLeft && rightSlots[ri]) {
      const slot = rightSlots[ri++];
      slot.style.backgroundImage = `url('${photoPath}')`;
      slot.classList.add('filled');
    }
  });
}

// ============= ОЧИСТКА ФОТО В БОКОВЫХ ГАЛЕРЕЯХ =============
function clearSideGalleryPhotos() {
  const leftGallery = document.getElementById('sideGalleryLeft');
  const rightGallery = document.getElementById('sideGalleryRight');
  if (!leftGallery || !rightGallery) return;
  
  // Очищаем все слоты в обеих галереях
  const allSlots = leftGallery.querySelectorAll('.side-photo-slot');
  allSlots.forEach(slot => {
    slot.style.backgroundImage = '';
    slot.classList.remove('filled');
  });
  
  const allRightSlots = rightGallery.querySelectorAll('.side-photo-slot');
  allRightSlots.forEach(slot => {
    slot.style.backgroundImage = '';
    slot.classList.remove('filled');
  });
}

// ============= МОБИЛЬНАЯ ГАЛЕРЕЯ =============

function initMobileGallery() {
  const mobileGallery = document.getElementById('mobileGalleryPreview');
  if (!mobileGallery) return;
  
  // Показываем мобильную галерею только на мобильных устройствах
  if (window.innerWidth <= 768) {
    mobileGallery.style.display = 'flex';
  } else {
    mobileGallery.style.display = 'none';
  }
}

function addPhotoToMobileGallery(photoPath) {
  const mobileGallery = document.getElementById('mobileGalleryPreview');
  if (!mobileGallery || window.innerWidth > 768) return;
  
  const photoElement = document.createElement('img');
  photoElement.src = photoPath;
  photoElement.className = 'gallery-photo';
  photoElement.alt = 'Собранное фото';
  
  mobileGallery.appendChild(photoElement);
  
  // Прокручиваем к последнему добавленному фото
  mobileGallery.scrollLeft = mobileGallery.scrollWidth;
}

function restoreMobileGallery() {
  const mobileGallery = document.getElementById('mobileGalleryPreview');
  if (!mobileGallery || window.innerWidth > 768) return;
  
  mobileGallery.innerHTML = '';
  
  // Добавляем все собранные фото
  AppState.collectedPhotos.forEach(photoPath => {
    addPhotoToMobileGallery(photoPath);
  });
}

function clearMobileGallery() {
  const mobileGallery = document.getElementById('mobileGalleryPreview');
  if (mobileGallery) {
    mobileGallery.innerHTML = '';
  }
}

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
  const mobileGallery = document.getElementById('mobileGalleryPreview');
  if (mobileGallery) {
    if (window.innerWidth <= 768) {
      mobileGallery.style.display = 'flex';
      restoreMobileGallery(); // Восстанавливаем фото при переходе на мобильный
    } else {
      mobileGallery.style.display = 'none';
    }
  }
});


