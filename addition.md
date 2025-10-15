🚀 БЫСТРЫЙ СТАРТ (5 шагов)
1. HTML - 4 добавления
A) Перед </body> добавьте:

html

Копировать код
<div class="celebration-particles" id="celebrationParticles"></div>
B) После <div id='app'> добавьте:

html

Копировать код
<div class="completion-overlay" id="completionOverlay" style="display: none;">
  <div class="completion-content">
    <div class="trophy-icon">🏆</div>
    <h1 class="completion-title">БРАВО!</h1>
    <p class="completion-message">Вы прошли все 35 вопросов!</p>
    <div class="curtain-open-animation">
      <div class="curtain-panel left-panel"></div>
      <div class="curtain-panel right-panel"></div>
    </div>
  </div>
</div>
C) После <section id='galleryScreen' class='screen final-gallery' style='display: none;'> добавьте:

html

Копировать код
<div class="corner-stars">
  <span class="star top-left">⭐</span>
  <span class="star top-right">✨</span>
  <span class="star bottom-left">💫</span>
  <span class="star bottom-right">🌟</span>
</div>
D) После <button class='download-button' onclick='downloadAllPhotos()'> добавьте:

html

Копировать код
<div class="birthday-congratulation">
  <div class="congrats-content">
    <h3 class="congrats-title">🎂 С Днем Рождения! 🎂</h3>
    <p class="congrats-message">
      <strong>Браво!</strong> Ты блестяще прошла все 35 вопросов!<br><br>
      Пусть каждый день твоей жизни будет наполнен<br>
      волшебством театра, яркими эмоциями<br>
      и незабываемыми впечатлениями!<br><br>
      Пусть твоя жизнь сияет так же ярко,<br>
      как премьера в Большом театре! 🎭✨💫
    </p>
  </div>
</div>
E) В <head> после остальных CSS добавьте:

html

Копировать код
<link rel='stylesheet' href='css/celebrations.css'>
2. CSS - Создайте файл css/celebrations.css
Скопируйте весь код: [ПОЛНЫЙ КОД celebrations.css - СКАЧАТЬ]

<details>
<summary><b>📄 Нажмите, чтобы развернуть полный код celebrations.css</b></summary>

css

Копировать код
/* ========================================
   CELEBRATIONS.CSS
   Праздничные эффекты и анимации
   ======================================== */

/* === 1. КОНФЕТТИ И БЛЕСТКИ === */
.celebration-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
  display: none;
}

.celebration-particles.active {
  display: block;
}

.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  animation: fall linear forwards;
  opacity: 0;
}

.sparkle::before {
  content: '✨';
  font-size: 12px;
  filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.8));
}

.sparkle.confetti::before {
  content: '';
  width: 8px;
  height: 8px;
  background: var(--confetti-color, #FFD700);
  display: block;
  border-radius: 50%;
}

@keyframes fall {
  0% {
    top: -10%;
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
  100% {
    top: 110%;
    opacity: 0.3;
    transform: translateX(var(--drift)) rotate(720deg);
  }
}

/* === 2. ТОРЖЕСТВЕННЫЙ ОВЕРЛЕЙ === */
.completion-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.completion-content {
  text-align: center;
  position: relative;
  z-index: 2;
  animation: fadeInScale 1s ease-out;
}

.trophy-icon {
  font-size: 8rem;
  animation: bounce 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
}

.completion-title {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  color: #FFD700;
  text-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 165, 0, 0.6);
  margin: 20px 0;
  letter-spacing: 0.3em;
}

.completion-message {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  color: #FFF;
  margin-bottom: 40px;
}

.curtain-open-animation {
  position: absolute;
  top: 0;
  left: -50vw;
  width: 200vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
}

.curtain-panel {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, #8B0000, #DC143C);
  animation: openCurtain 3s ease-in-out 2s forwards;
}

.curtain-panel.left-panel {
  left: 0;
  transform-origin: left;
}

.curtain-panel.right-panel {
  right: 0;
  transform-origin: right;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce {
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-30px); 
  }
}

@keyframes openCurtain {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

/* === 3. ДЕКОРАТИВНЫЕ ЗВЕЗДЫ === */
.corner-stars {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.corner-stars .star {
  position: absolute;
  font-size: 2rem;
  animation: twinkle 2s ease-in-out infinite;
}

.star.top-left { 
  top: 20px; 
  left: 20px; 
  animation-delay: 0s; 
}

.star.top-right { 
  top: 20px; 
  right: 20px; 
  animation-delay: 0.5s; 
}

.star.bottom-left { 
  bottom: 20px; 
  left: 20px; 
  animation-delay: 1s; 
}

.star.bottom-right { 
  bottom: 20px; 
  right: 20px; 
  animation-delay: 1.5s; 
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2);
  }
}

/* === 4. ЗОЛОТАЯ РАМКА === */
.final-gallery {
  position: relative;
  padding: 20px;
}

.final-gallery::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 3px solid transparent;
  border-image: linear-gradient(135deg, #FFD700, #FFA500, #FFD700) 1;
  pointer-events: none;
  animation: borderGlow 3s ease-in-out infinite;
  z-index: 0;
}

@keyframes borderGlow {
  0%, 100% { 
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
  }
  50% { 
    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
  }
}

/* === 5. ПОЗДРАВЛЕНИЕ === */
.birthday-congratulation {
  width: 90%;
  max-width: 700px;
  margin: 40px auto 20px;
  padding: 25px 30px;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(220, 20, 60, 0.2));
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 15px;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 215, 0, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.birthday-congratulation::before,
.birthday-congratulation::after {
  content: '🎭';
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.2;
}

.birthday-congratulation::before {
  top: 10px;
  left: 15px;
  transform: rotate(-15deg);
}

.birthday-congratulation::after {
  bottom: 10px;
  right: 15px;
  transform: rotate(15deg);
}

.congrats-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.congrats-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #FFD700;
  margin: 0 0 15px 0;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.5),
    2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.05em;
  animation: glow 2s ease-in-out infinite;
}

.congrats-message {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #FFF;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.congrats-message strong {
  color: #FFD700;
  font-size: 1.3em;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

@keyframes glow {
  0%, 100% {
    text-shadow: 
      0 0 10px rgba(255, 215, 0, 0.5),
      2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow: 
      0 0 20px rgba(255, 215, 0, 0.8),
      0 0 30px rgba(255, 165, 0, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.3);
  }
}

/* === АДАПТАЦИЯ === */
@media (max-width: 1024px) {
  .corner-stars .star {
    font-size: 1.5rem;
  }
  .completion-title {
    font-size: 3rem;
  }
  .trophy-icon {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .celebration-particles .sparkle {
    width: 6px;
    height: 6px;
  }
  .celebration-particles .sparkle::before {
    font-size: 10px;
  }
  .final-gallery::before {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-width: 2px;
  }
  .corner-stars .star {
    font-size: 1.2rem;
  }
  .star.top-left { top: 10px; left: 10px; }
  .star.top-right { top: 10px; right: 10px; }
  .star.bottom-left { bottom: 10px; left: 10px; }
  .star.bottom-right { bottom: 10px; right: 10px; }
  .birthday-congratulation {
    width: 95%;
    padding: 20px 15px;
    margin: 30px auto 15px;
  }
  .congrats-title {
    font-size: 1.6rem;
  }
  .congrats-message {
    font-size: 1rem;
    line-height: 1.6;
  }
  .birthday-congratulation::before,
  .birthday-congratulation::after {
    font-size: 2rem;
  }
  .completion-title {
    font-size: 2.5rem;
    letter-spacing: 0.2em;
  }
  .completion-message {
    font-size: 1.4rem;
  }
  .trophy-icon {
    font-size: 5rem;
  }
}

@media (max-width: 480px) {
  .congrats-title {
    font-size: 1.4rem;
  }
  .congrats-message {
    font-size: 0.95rem;
  }

ПA
Вы

продолжи


Claude Sonnet 4.5
css

Копировать код
  .congrats-message strong {
    font-size: 1.2em;
  }
  .completion-title {
    font-size: 2rem;
    letter-spacing: 0.15em;
  }
  .completion-message {
    font-size: 1.2rem;
  }
  .trophy-icon {
    font-size: 4rem;
  }
  .corner-stars .star {
    font-size: 1rem;
  }
}
</details>

3. CSS - Обновите css/animations.css
Найдите секцию .fireworks и .fire-burst и замените на:

<details>
<summary><b>📄 Нажмите, чтобы развернуть код для animations.css</b></summary>

css

Копировать код
/* === УЛУЧШЕННЫЙ ФЕЙЕРВЕРК === */
.fireworks {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.fireworks:not(.hidden) {
  opacity: 1;
}

.fire-burst {
  position: relative;
  width: 150px;
  height: 150px;
}

.fire-burst::before,
.fire-burst::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.fire-burst::before {
  box-shadow:
    0 0 20px 10px #FFD700,
    0 0 40px 20px #FFA500,
    0 0 60px 30px #FF6347;
  animation: burst 1.5s ease-out infinite;
}

.fire-burst::after {
  box-shadow:
    0 0 30px 15px #FF1493,
    0 0 50px 25px #9370DB;
  animation: burst 1.5s ease-out 0.3s infinite;
}

@keyframes burst {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

.fire-burst.left { 
  animation-delay: 0s; 
}

.fire-burst.center { 
  animation-delay: 0.5s; 
}

.fire-burst.right { 
  animation-delay: 1s; 
}

@media (max-width: 768px) {
  .fire-burst {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .fire-burst {
    width: 80px;
    height: 80px;
  }
}
</details>

4. JavaScript - Добавьте в конец js/ui.js (или js/app.js)
<details>
<summary><b>📄 Нажмите, чтобы развернуть JavaScript код</b></summary>

javascript

Копировать код
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
// ОБНОВЛЕННАЯ ФУНКЦИЯ ПОКАЗА ГАЛЕРЕИ
// ========================================
function showGallery() {
  if (state.timer) {
    clearInterval(state.timer);
  }

  state.endTime = Date.now();

  // Шаг 1: Показать оверлей
  const completionOverlay = document.getElementById('completionOverlay');
  if (completionOverlay) {
    completionOverlay.style.display = 'flex';
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

  // Шаг 4: Переход к галерее (5с)
  setTimeout(() => {
    if (completionOverlay) {
      completionOverlay.style.display = 'none';
    }

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

    if (typeof populateGallery === 'function') {
      populateGallery();
    }
    if (typeof updateStatistics === 'function') {
      updateStatistics();
    }

    // Шаг 5: Показать поздравление
    setTimeout(() => {
      const birthdayCongrats = document.querySelector('.birthday-congratulation');
      if (birthdayCongrats) {
        birthdayCongrats.style.opacity = '0';
        birthdayCongrats.style.transform = 'translateY(30px)';
        birthdayCongrats.style.transition = 'opacity 1s ease-out, transform 1s ease-out';

        setTimeout(() => {
          birthdayCongrats.style.opacity = '1';
          birthdayCongrats.style.transform = 'translateY(0)';
        }, 100);
      }
    }, 500);

  }, 5000);
}

<!-- Поздравление с днем рождения -->
  <div class="birthday-congratulation">
    <div class="congrats-content">
      <h3 class="congrats-title">🎂 С Днем Рождения! 🎂</h3>
      <p class="congrats-message">
        <strong>Браво!</strong> Ты блестяще прошла все 35 вопросов!<br><br>
        Пусть каждый день твоей жизни будет наполнен<br>
        волшебством театра, яркими эмоциями<br>
        и незабываемыми впечатлениями!<br><br>
        Пусть твоя жизнь сияет так же ярко,<br>
        как премьера в Большом театре! 🎭✨💫
      </p>
    </div>
  </div>

ИЗМЕНЕНО:
├── index.html
│   ├── + celebration-particles (перед </body>)
│   ├── + completion-overlay (после <div id='app'>)
│   ├── + corner-stars (в начале galleryScreen)
│   ├── + birthday-congratulation (после download-button)
│   └── + подключение celebrations.css
│
├── css/
│   ├── animations.css
│   │   └── ОБНОВЛЕНО: .fireworks и .fire-burst (улучшенная анимация)
│   │
│   └── celebrations.css (НОВЫЙ ФАЙЛ)
│       ├── .celebration-particles (контейнер конфетти)
│       ├── .sparkle (частицы)
│       ├── @keyframes fall (падение)
│       ├── .completion-overlay (торжественный экран)
│       ├── .completion-content (содержимое)
│       ├── .trophy-icon (трофей)
│       ├── .completion-title (заголовок БРАВО)
│       ├── .curtain-open-animation (раскрытие занавеса)
│       ├── @keyframes fadeInScale (появление)
│       ├── @keyframes bounce (прыжок трофея)
│       ├── @keyframes openCurtain (занавес)
│       ├── .corner-stars (декоративные звезды)
│       ├── @keyframes twinkle (мерцание)
│       ├── .final-gallery::before (золотая рамка)
│       ├── @keyframes borderGlow (свечение рамки)
│       ├── .birthday-congratulation (блок поздравления)
│       ├── .congrats-content (содержимое)
│       ├── .congrats-title (заголовок)
│       ├── .congrats-message (текст)
│       ├── @keyframes glow (свечение текста)
│       └── @media queries (адаптация для мобильных)
│
└── js/
    └── ui.js (или app.js)
        ├── + createCelebrationParticles() (функция конфетти)
        └── ОБНОВЛЕНО: showGallery() (новая логика финала)
1️⃣3️⃣ ПОШАГОВАЯ ПРОВЕРКА ПОСЛЕ ВНЕДРЕНИЯ
Шаг 1: Проверка файлов
Откройте файловый менеджер и убедитесь:


Копировать код
✓ css/celebrations.css существует
✓ Размер celebrations.css > 5 KB
✓ index.html изменен (размер увеличился)
✓ js/ui.js или js/app.js изменен (размер увеличился)

ПРОВЕРОЧНЫЙ ЧЕКЛИСТ
Перед финальной проверкой пройдитесь по этому списку:

HTML (index.html)
[✓] Добавлен <div class="celebration-particles" id="celebrationParticles"></div> перед </body>
[✓] Добавлен блок completion-overlay после <div id='app'> (УЖЕ БЫЛ В ПРОЕКТЕ)
[✓] Добавлены декоративные звезды в galleryScreen
[✓] Добавлен блок birthday-congratulation после download-button
[✓] Подключен файл css/celebrations.css в <head> (УЖЕ БЫЛ ПОДКЛЮЧЕН)
CSS
[✓] Создан файл css/celebrations.css
[✓] В celebrations.css есть все стили (конфетти, оверлей, звезды, поздравление, рамка)
[✓] В animations.css обновлены стили фейерверка
[✓] Проверены медиа-запросы для мобильных
JavaScript
[✓] Добавлена функция createCelebrationParticles() в js/ui.js или js/app.js
[✓] Обновлена функция showGallery() с новой логикой
[✓] Нет синтаксических ошибок (проверьте консоль браузера)
Тестирование (требуется тестирование в браузере)
[ ] Сайт открывается без ошибок
[ ] Квиз работает корректно
[ ] При завершении показывается торжественный оверлей
[ ] Падают конфетти и блестки
[ ] Работает фейерверк
[ ] Показывается галерея
[ ] Плавно появляется поздравление
[ ] Все работает на мобильных устройствах

Фейерверк:

<div class="pyro">
  <div class="before"></div>
  <div class="after"></div>
</div>

$particles: 50;
$width: 500;
$height: 500;

// Create the explosion...
$box-shadow: ();
$box-shadow2: ();
@for $i from 0 through $particles {
  $box-shadow: $box-shadow,
               random($width)-$width / 2 + px
               random($height)-$height / 1.2 + px
               hsl(random(360), 100, 50);
  $box-shadow2: $box-shadow2, 0 0 #fff
}
@mixin keyframes ($animationName) {
    @-webkit-keyframes #{$animationName} {
        @content;
    }

    @-moz-keyframes #{$animationName} {
        @content;
    }

    @-o-keyframes #{$animationName} {
        @content;
    }

    @-ms-keyframes #{$animationName} {
        @content;
    }

    @keyframes #{$animationName} {
        @content;
    }
}

@mixin animation-delay ($settings) {
    -moz-animation-delay: $settings;
    -webkit-animation-delay: $settings;
    -o-animation-delay: $settings;
    -ms-animation-delay: $settings;
    animation-delay: $settings;
}

@mixin animation-duration ($settings) {
    -moz-animation-duration: $settings;
    -webkit-animation-duration: $settings;
    -o-animation-duration: $settings;
    -ms-animation-duration: $settings;
    animation-duration: $settings;
}

@mixin animation ($settings) {
    -moz-animation: $settings;
    -webkit-animation: $settings;
    -o-animation: $settings;
    -ms-animation: $settings;
    animation: $settings;
}

@mixin transform ($settings) {
    transform: $settings;
    -moz-transform: $settings;
    -webkit-transform: $settings;
    -o-transform: $settings;
    -ms-transform: $settings;
}

body {
  margin:0;
  padding:0;
  background: #000;
  overflow: hidden;
}

.pyro > .before, .pyro > .after {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: $box-shadow2;
  @include animation((1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards));
}
    
.pyro > .after {
  @include animation-delay((1.25s, 1.25s, 1.25s));
  @include animation-duration((1.25s, 1.25s, 6.25s));
}
        
@include keyframes(bang) {
  to {
    box-shadow:$box-shadow;
  }
}
    
@include keyframes(gravity)  {
  to {
    @include transform(translateY(200px));
    opacity: 0;
  }
}
    
@include keyframes(position) {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {  
    margin-top: 20%;
    margin-left: 70%
  }
  60%, 79.9% {  
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {  
    margin-top: 30%;
    margin-left: 80%;
  }
}