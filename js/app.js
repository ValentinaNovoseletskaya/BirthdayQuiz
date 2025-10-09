let currentAttempts = 0;
let maxAttempts = 3;
let usedHints = [];
let hintTimers = {};
let hintCountdownIntervals = {};
let currentSlideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
  if (AppState.currentQuestionIndex > 0) {
    showConfirm(
      'Продолжить квиз?',
      'Обнаружен сохранённый прогресс. Хотите продолжить с того места, где остановились?',
      () => continueFromSaved(),
      () => {} // При отказе просто остаёмся на главном экране
    );
  }
});

function startQuiz() {
  AppState.reset();
  AppState.init();
  UI.showScreen('questionScreen');
  loadQuestion(0);
  UI.animateCurtain(true);
}

function continueFromSaved() {
  if (AppState.currentQuestionIndex >= AppState.totalQuestions) {
    showFinalGallery();
  } else {
    UI.showScreen('questionScreen');
    loadQuestion(AppState.currentQuestionIndex);
  }
}

function loadQuestion(index) {
  if (index >= QUESTIONS_DATA.length) { completeQuiz(); return; }
  AppState.currentQuestionIndex = index;
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
  const q = QUESTIONS_DATA[AppState.currentQuestionIndex];
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
  const q = QUESTIONS_DATA[AppState.currentQuestionIndex];
  const isCorrect = selectedIndex === q.correctIndex;
  currentAttempts++;
  UI.highlightAnswer(selectedIndex, isCorrect);
  if (isCorrect) {
    playSound('applause');
    AppState.recordAnswer(q.id, true, currentAttempts, usedHints);
    AppState.addPhoto(q.photoPath);
    
    // Раздвигаем занавесы и показываем вылет фото
    setTimeout(() => {
      openCurtains();
      setTimeout(() => {
        showFlyingPhoto(q.photoPath, AppState.currentQuestionIndex);
        
        // Загружаем следующий вопрос во время полета фото
        setTimeout(() => {
          const nextIndex = AppState.currentQuestionIndex + 1;
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
    playSound('wrong');
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
            UI.showPhotoReveal(q.photoPath, AppState.currentQuestionIndex + 1);
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

function completeQuiz() { AppState.complete(); showFinalGallery(); }

function showFinalGallery() { UI.showScreen('galleryScreen'); UI.renderFinalGallery(); UI.animateCurtain(true); }

function switchViewMode(mode) {
  const collageView = document.getElementById('collageView');
  const sliderView = document.getElementById('sliderView');
  const collageBtn = document.getElementById('collageMode');
  const sliderBtn = document.getElementById('sliderMode');
  if (mode === 'collage') {
    collageView.style.display = 'grid';
    sliderView.style.display = 'none';
    collageBtn.classList.add('active');
    sliderBtn.classList.remove('active');
  } else {
    collageView.style.display = 'none';
    sliderView.style.display = 'block';
    sliderBtn.classList.add('active');
    collageBtn.classList.remove('active');
    showSlide(currentSlideIndex);
  }
}

function showSlide(index) {
  if (index < 0) index = AppState.collectedPhotos.length - 1;
  if (index >= AppState.collectedPhotos.length) index = 0;
  currentSlideIndex = index;
  document.getElementById('sliderPhoto').src = AppState.collectedPhotos[index] || '';
  document.getElementById('sliderCounter').textContent = `${index + 1} / ${AppState.totalQuestions}`;
}
function prevPhoto() { showSlide(currentSlideIndex - 1); }
function nextPhoto() { showSlide(currentSlideIndex + 1); }

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


