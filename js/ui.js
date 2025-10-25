const UI = {
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
    document.getElementById('progressContainer').style.display = screenId === 'questionScreen' ? 'block' : 'none';
    
    // Управление боковыми занавесами
    const sideCurtains = document.getElementById('sideCurtains');
    if (sideCurtains) {
      if (screenId === 'welcomeScreen') {
        sideCurtains.style.display = 'flex'; // Показываем на стартовом экране
      } else if (screenId === 'galleryScreen') {
        sideCurtains.style.display = 'none'; // Скрываем на финальном экране
      }
      // На экране вопросов занавесы скрываются через animateCurtain
    }
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

  lockHint(hintIndex) {
    // Функция блокировки подсказки
    const hintButton = document.querySelector(`[data-hint="${hintIndex}"]`);
    if (hintButton) {
      hintButton.disabled = true;
      hintButton.classList.add('locked');
    }
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
    
    // Сортируем фотографии по порядку от photo-01 до photo-35
    const sortedPhotos = AppState.collectedPhotos.sort((a, b) => {
      const aNum = parseInt(a.match(/photo-(\d+)\.jpg$/)?.[1] || '0');
      const bNum = parseInt(b.match(/photo-(\d+)\.jpg$/)?.[1] || '0');
      return aNum - bNum;
    });
    
    // Сохраняем отсортированные фотографии в глобальную переменную
    if (typeof window !== 'undefined') {
      window.sortedPhotos = sortedPhotos;
    }
    
    // Создаем элементы галереи асинхронно с определением ориентации
    const createGalleryElement = async (photoPath, index) => {
      const div = document.createElement('div');
      div.className = 'gallery-photo';
      
      // Определяем ориентацию изображения
      let orientationClass = 'landscape'; // По умолчанию
      if (typeof getCachedImageOrientation === 'function') {
        try {
          const orientationData = await getCachedImageOrientation(photoPath);
          orientationClass = orientationData.orientation;
        } catch (error) {
          console.warn('Ошибка определения ориентации для галереи:', error);
        }
      }
      
      div.classList.add(orientationClass);
      div.innerHTML = `<img src="${photoPath}" alt="Фото ${index + 1}"><span class="photo-number-badge">${index + 1}</span>`;
      div.onclick = () => openPhotoViewer(photoPath);
      
      return div;
    };
    
    // Создаем все элементы галереи
    Promise.all(sortedPhotos.map((photoPath, index) => 
      createGalleryElement(photoPath, index)
    )).then(elements => {
      elements.forEach(element => {
        collageView.appendChild(element);
      });
    });
    
    // Обновляем слайдер
    document.getElementById('sliderPhoto').src = sortedPhotos[0] || '';
    document.getElementById('sliderCounter').textContent = `1 / ${AppState.totalQuestions}`;
    
    // Применяем класс ориентации к первому изображению в слайдере
    if (sortedPhotos.length > 0 && typeof getCachedImageOrientation === 'function') {
      getCachedImageOrientation(sortedPhotos[0]).then(orientationData => {
        const sliderPhoto = document.getElementById('sliderPhoto');
        if (sliderPhoto) {
          sliderPhoto.classList.add(orientationData.orientation);
        }
      }).catch(error => {
        console.warn('Ошибка определения ориентации для слайдера:', error);
      });
    }
    
    this.renderStatistics();
  },

  renderStatistics() {
    // Статистика теперь отображается только в модальном окне достижений
    // Эта функция оставлена для совместимости, но не выполняет никаких действий
    console.log('renderStatistics вызвана, но статистика теперь в модальном окне');
  },

  showProductionsList() {
    const productionsSection = document.getElementById('productionsSection');
    if (productionsSection) {
      productionsSection.style.display = 'block';
      productionsSection.style.opacity = '0';
      productionsSection.style.transform = 'translateY(30px)';
      productionsSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      
      setTimeout(() => {
        productionsSection.style.opacity = '1';
        productionsSection.style.transform = 'translateY(0)';
      }, 100);
    }
  },

  hideProductionsList() {
    const productionsSection = document.getElementById('productionsSection');
    if (productionsSection) {
      productionsSection.style.opacity = '0';
      productionsSection.style.transform = 'translateY(30px)';
      setTimeout(() => {
        productionsSection.style.display = 'none';
      }, 400);
    }
  },

  renderProductionsList() {
    const productionsGrid = document.getElementById('productionsGrid');
    if (!productionsGrid || typeof getSortedProductions !== 'function') return;
    
    productionsGrid.innerHTML = '';
    const productions = getSortedProductions();
    
    productions.forEach(production => {
      const card = document.createElement('div');
      card.className = 'production-card';
      card.onclick = () => this.showProductionModal(production.title);
      
      card.innerHTML = `
        <div class="production-card-title">${production.title}</div>
        <div class="production-card-type">${production.type}</div>
        <div class="production-card-composer">Композитор: ${production.composer}</div>
        <div class="production-card-click-hint">Кликните для подробностей</div>
      `;
      
      productionsGrid.appendChild(card);
    });
  },

  showProductionModal(productionName) {
    const modal = document.getElementById('productionModal');
    if (!modal || typeof getProductionInfo !== 'function') return;
    
    const production = getProductionInfo(productionName);
    if (!production) return;
    
    // Обновляем заголовок
    const modalTitle = modal.querySelector('.production-modal-title');
    if (modalTitle) modalTitle.textContent = production.title;
    
    // Обновляем основную информацию
    const modalType = modal.querySelector('.production-modal-type');
    const modalComposer = modal.querySelector('.production-modal-composer');
    const modalChoreographer = modal.querySelector('.production-modal-choreographer');
    const modalLibretto = modal.querySelector('.production-modal-libretto');
    const modalPremiere = modal.querySelector('.production-modal-premiere');
    const modalOriginalPremiere = modal.querySelector('.production-modal-original-premiere');
    const modalDescription = modal.querySelector('.production-modal-description');
    const modalMusic = modal.querySelector('.production-modal-music');
    const modalHighlights = modal.querySelector('.production-modal-highlights');
    const modalTrivia = modal.querySelector('.production-modal-trivia');
    
    if (modalType) modalType.textContent = production.type;
    if (modalComposer) modalComposer.innerHTML = `<strong>Композитор:</strong> ${production.composer}`;
    if (modalChoreographer && production.choreographer !== 'Не применимо') {
      modalChoreographer.innerHTML = `<strong>Хореограф:</strong> ${production.choreographer}`;
      modalChoreographer.style.display = 'block';
    } else if (modalChoreographer) {
      modalChoreographer.style.display = 'none';
    }
    if (modalLibretto) modalLibretto.innerHTML = `<strong>Либретто:</strong> ${production.libretto}`;
    if (modalPremiere) modalPremiere.innerHTML = `<strong>Премьера в Большом театре:</strong> ${production.premiere}`;
    if (modalOriginalPremiere) modalOriginalPremiere.innerHTML = `<strong>Оригинальная премьера:</strong> ${production.originalPremiere}`;
    if (modalDescription) modalDescription.textContent = production.description;
    if (modalMusic) modalMusic.innerHTML = `<strong>Музыка:</strong> ${production.music}`;
    if (modalHighlights) {
      const ul = modalHighlights.querySelector('ul');
      if (ul) {
        ul.innerHTML = production.highlights.map(h => `<li>${h}</li>`).join('');
      }
    }
    if (modalTrivia) modalTrivia.innerHTML = `<strong>Интересный факт:</strong> ${production.trivia}`;
    
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  },

  hideProductionModal() {
    const modal = document.getElementById('productionModal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 400);
    }
  },

  showAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    if (modal) {
      this.updateAchievementsModal();
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    }
  },

  hideAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    if (modal) {
      modal.classList.remove('active');
  setTimeout(() => {
        modal.style.display = 'none';
      }, 400);
    }
  },

  updateAchievementsModal() {
    const modalStatTime = document.getElementById('modalStatTime');
    const modalStatCorrect = document.getElementById('modalStatCorrect');
    const modalStatHints = document.getElementById('modalStatHints');
    const modalStatFavorite = document.getElementById('modalStatFavorite');
    
    if (modalStatTime) modalStatTime.textContent = AppState.getElapsedTime();
    if (modalStatCorrect) modalStatCorrect.textContent = `${AppState.statistics.correctFirstTry}/${AppState.totalQuestions}`;
    if (modalStatHints) modalStatHints.textContent = AppState.statistics.totalHintsUsed;
    if (modalStatFavorite) modalStatFavorite.textContent = AppState.getFavoriteProduction();
  },

  animateCurtain(open) {
    const sideCurtains = document.getElementById('sideCurtains');
    if (!sideCurtains) return;
    
    if (open) {
      // Открываем занавес (скрываем его)
      sideCurtains.style.display = 'none';
    } else {
      // Закрываем занавес (показываем его)
      sideCurtains.style.display = 'flex';
    }
  }
};

// ========================================
// ФУНКЦИЯ ПОКАЗА ГАЛЕРЕИ С ЭФФЕКТАМИ
// ========================================
function showGallery() {
  if (AppState.timer) {
    clearInterval(AppState.timer);
  }

  AppState.endTime = Date.now();

  // Шаг 0: Показать занавес
  const finalCurtain = document.getElementById('finalCurtain');
  if (finalCurtain) {
    // Устанавливаем панели занавеса в открытое состояние (за экраном)
    const panels = finalCurtain.querySelectorAll('.curtain-panel');
    panels.forEach(panel => {
      if (panel.classList.contains('left-panel')) {
        panel.style.transform = 'translateX(-100%)'; // Левая панель за левым краем
      } else {
        panel.style.transform = 'translateX(100%)'; // Правая панель за правым краем
      }
    });
    
    finalCurtain.style.display = 'flex';
    
    // Анимация закрытия занавеса - панели движутся к центру
    setTimeout(() => {
      panels.forEach(panel => {
        panel.style.transform = 'translateX(0)'; // Панели закрываются на весь экран
      });
      
      // После закрытия занавеса ждем достаточно времени для завершения анимации
      setTimeout(() => {
        // Показываем окно "Браво" только когда занавес полностью закрыт
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
        
        // Скрываем экран вопроса
        const questionScreen = document.getElementById('questionScreen');
        if (questionScreen) {
          questionScreen.style.display = 'none';
        }
        
        // Ждем еще немного, затем открываем занавес
        setTimeout(() => {
          // Теперь раздвигаем занавес
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
        }, 1500); // Ждем 1.5 секунды в закрытом состоянии
      }, 3000); // Увеличиваем время ожидания до 3 секунд для завершения анимации закрытия
    }, 100); // Небольшая задержка перед началом анимации закрытия
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

    // Показываем список постановок
    if (typeof UI.showProductionsList === 'function') {
      UI.showProductionsList();
    }
    if (typeof UI.renderProductionsList === 'function') {
      UI.renderProductionsList();
    }

    // Убираем автозапуск слайдера - он запускается только по кнопке "Получить приз"
    // setTimeout(() => {
    //   startPrizeSlider();
    // }, 1000);

  }, 5000);
}

// ========================================
// ФУНКЦИЯ ЗАПУСКА ФЕЙЕРВЕРКА
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
// ФУНКЦИЯ ЗАПУСКА ПРИЗОВОГО СЛАЙДЕРА
// ========================================
function startPrizeSlider() {
  console.log('Запуск призового слайдера');

  // Скрываем оверлей
  const completionOverlay = document.getElementById('completionOverlay');
  if (completionOverlay) {
    completionOverlay.style.display = 'none';
  }

  // Переводим слайдер в полноэкранный режим
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

  // Добавляем кнопку закрытия слайдера
  addSliderCloseButton();

  // Автоматически закрываем слайдер после показа всех фотографий
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
// ФУНКЦИЯ ПОКАЗА ПОЗДРАВЛЕНИЯ С ДНЕМ РОЖДЕНИЯ
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
      
      // Показываем список постановок через 3 секунды после поздравления
      setTimeout(() => {
        if (typeof UI !== 'undefined' && UI.showProductionsList) {
          UI.showProductionsList();
        }
      }, 3000);
    }, 100);
  }
}