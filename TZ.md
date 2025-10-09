📋 ТЕХНИЧЕСКОЕ ЗАДАНИЕ
Одностраничный квиз-сайт "Театральный вечер"
1. ОБЩАЯ ИНФОРМАЦИЯ
1.1 Название проекта
"Театральный вечер" - интерактивный квиз-сайт с фотогалереей

1.2 Цель проекта
Создание интерактивного квиза-викторины на тему постановок Большого театра, где правильные ответы открывают фотографии именинницы, формирующие финальную галерею-коллаж.

1.3 Целевая аудитория
Именинница (основной пользователь)
Возможно, друзья для совместного прохождения
Возраст: взрослая аудитория
Устройства: десктоп, планшет, мобильный телефон
1.4 Технические требования
Платформа размещения: GitHub Pages
Тип: Single Page Application (SPA)
Без серверной части: все данные хранятся в клиентском коде
Формат: статический HTML/CSS/JavaScript
Поддержка браузеров: Chrome, Firefox, Safari, Edge (последние 2 версии)
2. СТРУКТУРА И ФУНКЦИОНАЛ
2.1 Основные экраны
Экран 1: Приветствие

 
Содержимое:
- Приветственное сообщение
- Название "Театральный вечер"
- Краткая инструкция
- Кнопка "Начать квиз"
- Театральные декоративные элементы
Экран 2: Вопросы (35 штук)

 
Содержимое:
- Форма билета с вопросом
- Название постановки
- Номер вопроса (X/35)
- Текст вопроса или фото-вопрос
- 4 варианта ответа (А, Б, В, Г)
- Панель подсказок (3 уровня)
- Прогресс-бар
- Мини-превью собранных фото
Экран 3: Результат ответа

 
Содержимое:
- Сообщение о правильности
- Анимация открытия фото (при правильном ответе)
- Показ фотографии с эффектом
- Кнопка продолжения
Экран 4: Финальная галерея

 
Содержимое:
- Поздравительное сообщение
- Коллаж из всех 35 фото
- Возможность просмотра фото по порядку
- Кнопка скачивания архива фото
- Статистика прохождения
2.2 Функциональные требования
2.2.1 Система вопросов
Типы вопросов:
1. Текстовые вопросы (25 шт.)
2. Фото-вопросы (10 шт.)

Механика:
- 4 варианта ответа (множественный выбор)
- 3 попытки на каждый вопрос
- После неправильного ответа открывается следующая подсказка
- Переход к следующему вопросу только после правильного ответа

Подсказки:

javascript

 
Уровень 1 (🟢): 
- Доступна сразу
- Завуалированная подсказка (история, метафора, загадка)

Уровень 2 (🟡):
- Открывается через 30 секунд ИЛИ после 1 неправильной попытки
- Более явная подсказка (ребус, визуальная подсказка)

Уровень 3 (🔴):
- Открывается через 60 секунд ИЛИ после 2 неправильных попыток
- Почти прямой ответ (анаграмма с подсказкой, неполное слово)
2.2.2 Система прогресса
Отображение:
- Прогресс-бар: X/35 фото собрано
- Визуальная сетка 7×5 с заполнением ячеек
- Счетчик времени (опционально)
- Количество использованных подсказок

Сохранение:

javascript

 
// LocalStorage для сохранения прогресса
const saveProgress = {
  currentQuestion: 15,
  collectedPhotos: [1,2,3...15],
  usedHints: 8,
  startTime: timestamp,
  answers: {
    1: {correct: true, attempts: 1, hints: [1]},
    2: {correct: true, attempts: 2, hints: [1,2]},
    ...
  }
}
Возможности:
- Автосохранение после каждого ответа
- Восстановление при повторном заходе
- Кнопка "Начать заново" (с подтверждением)

2.2.3 Система фотографий
Хранение:


 
/assets/
  /photos/
    photo-01.jpg (вопрос 1)
    photo-02.jpg (вопрос 2)
    ...
    photo-35.jpg (вопрос 35)
  /placeholders/
    placeholder-question-01.jpg (для фото-вопросов)
    placeholder-question-03.jpg
    ...
Формат:
- JPEG, оптимизированные
- Максимальный размер: 500KB на фото
- Рекомендуемое разрешение: 1200×800px
- WebP с fallback на JPEG

Ленивая загрузка:

javascript

 
// Загружать фото только при открытии
const loadPhoto = (photoId) => {
  const img = new Image();
  img.src = `/assets/photos/photo-${photoId}.jpg`;
  return img;
}
2.2.4 Финальная галерея
Режимы просмотра:

Коллаж (по умолчанию):

 
Все 35 фото в сетке с красивым расположением
Возможность клика для увеличения
Слайдер:

 
Пролистывание фото по порядку (1→35)
Стрелки навигации
Номер фото и подпись
Полноэкранный режим:

 
Просмотр отдельного фото
Затемнение фона
Кнопка закрытия
Дополнительные функции:
- Скачивание архива (генерация ZIP на клиенте)
- Показ статистики прохождения

3. ДИЗАЙН-ТРЕБОВАНИЯ
3.1 Визуальная концепция
Основная тема: Большой театр, театральная классика, роскошь

Референсы стиля:
- Интерьеры Большого театра
- Винтажные театральные билеты
- Бархатные занавесы
- Золотая лепнина
- Классическая элегантность

3.2 Цветовая палитра
css

 
:root {
  /* Основные цвета */
  --theatre-red: #8B0000;           /* Темно-красный (бархат) */
  --theatre-burgundy: #800020;      /* Бордовый */
  --theatre-gold: #FFD700;          /* Золотой */
  --theatre-dark-gold: #B8860B;     /* Темное золото */

  /* Фоновые */
  --theatre-cream: #FFF8DC;         /* Кремовый (билет) */
  --theatre-beige: #F5F5DC;         /* Бежевый */
  --theatre-dark: #2C1810;          /* Темно-коричневый */

  /* Акценты */
  --spotlight-white: #FFFAF0;       /* Теплый белый */
  --shadow-dark: rgba(0,0,0,0.7);   /* Тени */

  /* Статусы */
  --hint-available: #90EE90;        /* Зеленый (подсказка доступна) */
  --hint-locked: #D3D3D3;           /* Серый (заблокировано) */
  --correct-answer: #228B22;        /* Зеленый (правильно) */
  --wrong-answer: #DC143C;          /* Красный (неправильно) */
}
Градиенты:

css

 
/* Бархатный занавес */
--curtain-gradient: linear-gradient(
  90deg, 
  #8B0000 0%, 
  #DC143C 50%, 
  #8B0000 100%
);

/* Золотая рамка */
--gold-frame: linear-gradient(
  135deg,
  #FFD700 0%,
  #FFA500 50%,
  #B8860B 100%
);

/* Прожектор */
--spotlight: radial-gradient(
  circle at center,
  rgba(255,250,240,1) 0%,
  rgba(255,250,240,0.3) 50%,
  rgba(255,250,240,0) 100%
);
3.3 Типографика
css

 
/* Шрифты */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;600&family=Roboto:wght@300;400;500&display=swap');

/* Иерархия */
--font-heading: 'Playfair Display', serif;      /* Заголовки */
--font-elegant: 'Cormorant Garamond', serif;    /* Элегантный текст */
--font-body: 'Roboto', sans-serif;              /* Основной текст */

/* Размеры */
--text-h1: clamp(2rem, 5vw, 3.5rem);           /* Главный заголовок */
--text-h2: clamp(1.5rem, 4vw, 2.5rem);         /* Подзаголовки */
--text-h3: clamp(1.2rem, 3vw, 1.8rem);         /* Названия постановок */
--text-body: clamp(1rem, 2vw, 1.125rem);       /* Текст вопросов */
--text-small: clamp(0.875rem, 1.5vw, 1rem);    /* Подписи */

/* Начертание */
h1, h2 {
  font-family: var(--font-heading);
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.production-name {
  font-family: var(--font-elegant);
  font-weight: 600;
  font-style: italic;
}

.question-text {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
}
3.4 Компоненты дизайна
3.4.1 Театральный занавес
css

 
.theatre-curtain {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: var(--curtain-gradient);
  border-bottom: 5px solid var(--theatre-gold);
  box-shadow: 0 5px 20px var(--shadow-dark);
  z-index: 1000;
}

.curtain-left, .curtain-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: var(--curtain-gradient);
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.curtain-left { 
  left: 0; 
  transform-origin: left;
}

.curtain-right { 
  right: 0; 
  transform-origin: right;
}

/* Анимация открытия */
.curtain-opening .curtain-left {
  transform: translateX(-100%);
}

.curtain-opening .curtain-right {
  transform: translateX(100%);
}

/* Драпировка */
.curtain-drape {
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 40px,
    rgba(0,0,0,0.1) 40px,
    rgba(0,0,0,0.1) 42px
  );
}
3.4.2 Театральный билет (форма вопроса)
css

 
.ticket-container {
  max-width: 650px;
  margin: 120px auto 40px;
  padding: 20px;
}

.ticket-form {
  background: var(--theatre-cream);
  border: 3px solid var(--theatre-gold);
  border-radius: 15px;
  box-shadow: 
    0 10px 40px rgba(0,0,0,0.3),
    inset 0 0 20px rgba(255,215,0,0.1);
  padding: 40px;
  position: relative;
  overflow: hidden;
}

/* Перфорация билета */
.ticket-form::before,
.ticket-form::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  background: var(--theatre-dark);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
}

.ticket-form::before { 
  left: -15px; 
}

.ticket-form::after { 
  right: -15px; 
}

/* Текстура старой бумаги */
.ticket-form::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/


ПA
Вы

ТЗ готово?


Claude Sonnet 4.5

Нет, я не закончил. Продолжаю:

css

 
/* Продолжение текстуры */
.ticket-texture {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(139,0,0,0.1) 2px,
    rgba(139,0,0,0.1) 4px
  );
  pointer-events: none;
}

/* Заголовок билета */
.ticket-header {
  text-align: center;
  border-bottom: 2px dashed var(--theatre-gold);
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.ticket-header h2 {
  color: var(--theatre-red);
  margin: 0 0 10px;
  font-size: var(--text-h2);
}

.production-name {
  color: var(--theatre-burgundy);
  font-size: var(--text-h3);
  margin: 10px 0;
}

.question-number {
  color: var(--theatre-dark-gold);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: 0.1em;
}
3.4.3 Варианты ответов
css

 
.answers-container {
  margin: 30px 0;
}

.answer-option {
  background: white;
  border: 2px solid var(--theatre-gold);
  border-radius: 8px;
  padding: 15px 20px;
  margin: 12px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-family: var(--font-body);
  font-size: var(--text-body);
  position: relative;
  overflow: hidden;
}

.answer-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,215,0,0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.answer-option:hover {
  transform: translateX(5px);
  border-color: var(--theatre-dark-gold);
  box-shadow: 0 5px 15px rgba(139,0,0,0.2);
}

.answer-option:hover::before {
  left: 100%;
}

.answer-label {
  width: 35px;
  height: 35px;
  background: var(--theatre-gold);
  color: var(--theatre-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 15px;
  flex-shrink: 0;
}

/* Состояния */
.answer-option.selected {
  background: rgba(255,215,0,0.1);
  border-color: var(--theatre-dark-gold);
  border-width: 3px;
}

.answer-option.correct {
  background: rgba(34,139,34,0.1);
  border-color: var(--correct-answer);
  animation: correctPulse 0.5s ease;
}

.answer-option.wrong {
  background: rgba(220,20,60,0.1);
  border-color: var(--wrong-answer);
  animation: wrongShake 0.5s ease;
}

.answer-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
3.4.4 Панель подсказок
css

 
.hints-panel {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
  padding: 20px;
  background: rgba(139,0,0,0.05);
  border-radius: 10px;
}

.hint-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid;
  background: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Уровни подсказок */
.hint-button.level-1 {
  border-color: #90EE90;
  color: #228B22;
}

.hint-button.level-2 {
  border-color: #FFD700;
  color: #B8860B;
}

.hint-button.level-3 {
  border-color: #DC143C;
  color: #8B0000;
}

.hint-button.locked {
  border-color: #D3D3D3;
  color: #999;
  cursor: not-allowed;
  opacity: 0.5;
}

.hint-button.locked::after {
  content: '🔒';
  position: absolute;
  font-size: 16px;
  bottom: -5px;
  right: -5px;
}

.hint-button.unlocking {
  animation: unlockPulse 1s ease;
}

.hint-button:not(.locked):hover {
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
}

/* Таймер разблокировки */
.hint-timer {
  position: absolute;
  bottom: -25px;
  font-size: 12px;
  color: var(--theatre-burgundy);
  font-weight: 500;
}
3.4.5 Модальное окно подсказки
css

 
.hint-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.hint-modal.active {
  opacity: 1;
  pointer-events: all;
}

.hint-content {
  background: var(--theatre-cream);
  border: 4px solid var(--theatre-gold);
  border-radius: 15px;
  padding: 40px;
  max-width: 500px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  animation: hintAppear 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.hint-content::before {
  content: '💡';
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 48px;
  animation: lightbulb 1.5s ease-in-out infinite;
}

.hint-title {
  color: var(--theatre-red);
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  margin-bottom: 20px;
  text-align: center;
}

.hint-text {
  color: var(--theatre-dark);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.8;
  text-align: center;
}

.hint-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 35px;
  height: 35px;
  background: var(--theatre-red);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
}

.hint-close:hover {
  transform: rotate(90deg);
  background: var(--theatre-burgundy);
}
3.4.6 Прогресс-бар
css

 
.progress-container {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--theatre-beige);
  border-bottom: 2px solid var(--theatre-gold);
  padding: 15px 20px;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.progress-bar {
  width: 100%;
  height: 30px;
  background: white;
  border: 2px solid var(--theatre-gold);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--gold-frame);
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.3),
    transparent
  );
  animation: shine 2s ease-in-out infinite;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--theatre-dark);
  text-shadow: 0 0 5px white;
  pointer-events: none;
}
3.4.7 Галерея фото (мини-превью)
css

 
.gallery-preview {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 280px;
  background: var(--theatre-cream);
  border: 3px solid var(--theatre-gold);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
  z-index: 998;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.gallery-cell {
  aspect-ratio: 1;
  border: 1px solid var(--theatre-gold);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  background: white;
}

.gallery-cell.empty {
  background: rgba(139,0,0,0.1);
}

.gallery-cell.filled {
  background-size: cover;
  background-position: center;
  animation: photoAppear 0.5s ease;
}

.gallery-cell.filled::after {
  content: '✓';
  position: absolute;
  top: 0;
  right: 0;
  background: var(--correct-answer);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 0 0 0 3px;
}

.gallery-toggle {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  background: var(--theatre-red);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.gallery-toggle:hover {
  background: var(--theatre-burgundy);
  transform: translateY(-2px);
}
3.4.8 Фото-вопросы
css

 
.photo-question {
  margin: 20px 0;
  border: 4px solid var(--theatre-gold);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.photo-question img {
  width: 100%;
  height: auto;
  display: block;
}

.photo-caption {
  background: rgba(139,0,0,0.9);
  color: white;
  padding: 15px;
  text-align: center;
  font-family: var(--font-elegant);
  font-size: var(--text-small);
  font-style: italic;
}

.photo-zoom {
  cursor: zoom-in;
  transition: transform 0.3s ease;
}

.photo-zoom:hover {
  transform: scale(1.02);
}
3.4.9 Открытие фотографии (награда)
css

 
.photo-reveal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.95);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.photo-reveal-content {
  max-width: 90%;
  max-height: 80%;
  position: relative;
}

.photo-spotlight {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: var(--spotlight);
  animation: spotlightGrow 1.5s ease-out;
  pointer-events: none;
}

.revealed-photo {
  max-width: 100%;
  max-height: 70vh;
  border: 8px solid var(--theatre-gold);
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(255,215,0,0.5);
  animation: photoZoomIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  z-index: 1;
}

.photo-reveal-message {
  margin-top: 30px;
  color: white;
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  text-align: center;
  animation: textSlideUp 1s ease 0.5s both;
}

.photo-number {
  color: var(--theatre-gold);
  font-size: var(--text-small);
  margin-top: 10px;

Продолжаю ТЗ:

css

 
  animation: textSlideUp 1s ease 0.7s both;
}

.continue-button {
  margin-top: 30px;
  padding: 15px 40px;
  background: var(--theatre-gold);
  color: var(--theatre-dark);
  border: 3px solid var(--theatre-dark-gold);
  border-radius: 30px;
  font-family: var(--font-heading);
  font-size: var(--text-body);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: buttonAppear 1s ease 1s both;
}

.continue-button:hover {
  background: white;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(255,215,0,0.5);
}
3.4.10 Финальная галерея
css

 
.final-gallery {
  min-height: 100vh;
  background: var(--theatre-dark);
  padding: 120px 20px 60px;
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-title {
  color: var(--theatre-gold);
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  margin-bottom: 20px;
  animation: fadeInDown 1s ease;
}

.gallery-subtitle {
  color: var(--theatre-cream);
  font-family: var(--font-elegant);
  font-size: var(--text-h3);
  animation: fadeInUp 1s ease 0.3s both;
}

/* Режим коллажа */
.gallery-collage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.gallery-photo {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 3px solid var(--theatre-gold);
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: photoFadeIn 0.5s ease backwards;
}

.gallery-photo:nth-child(1) { animation-delay: 0.1s; }
.gallery-photo:nth-child(2) { animation-delay: 0.15s; }
.gallery-photo:nth-child(3) { animation-delay: 0.2s; }
/* ... и так далее до 35 */

.gallery-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-photo:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(255,215,0,0.3);
  border-color: white;
  z-index: 10;
}

.gallery-photo:hover img {
  transform: scale(1.1);
}

.photo-number-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(139,0,0,0.9);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
}

/* Режим слайдера */
.gallery-slider {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.slider-photo-container {
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.slider-photo {
  max-width: 90%;
  max-height: 90%;
  border: 8px solid var(--theatre-gold);
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: var(--theatre-red);
  color: white;
  border: 3px solid var(--theatre-gold);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.slider-nav:hover {
  background: var(--theatre-gold);
  color: var(--theatre-dark);
  transform: translateY(-50%) scale(1.1);
}

.slider-nav.prev { left: 20px; }
.slider-nav.next { right: 20px; }

.slider-counter {
  text-align: center;
  margin-top: 30px;
  color: var(--theatre-gold);
  font-family: var(--font-heading);
  font-size: var(--text-h3);
}

/* Переключатель режимов */
.view-mode-toggle {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
}

.mode-button {
  padding: 12px 30px;
  background: transparent;
  color: var(--theatre-cream);
  border: 2px solid var(--theatre-gold);
  border-radius: 25px;
  font-family: var(--font-body);
  font-size: var(--text-body);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-button.active {
  background: var(--theatre-gold);
  color: var(--theatre-dark);
}

.mode-button:hover:not(.active) {
  background: rgba(255,215,0,0.2);
}

/* Кнопка скачивания */
.download-button {
  display: block;
  margin: 40px auto;
  padding: 18px 50px;
  background: var(--theatre-gold);
  color: var(--theatre-dark);
  border: 3px solid var(--theatre-dark-gold);
  border-radius: 30px;
  font-family: var(--font-heading);
  font-size: var(--text-body);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-button:hover {
  background: white;
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(255,215,0,0.5);
}

.download-button::before {
  content: '📥 ';
  font-size: 20px;
}
3.4.11 Статистика
css

 
.statistics-panel {
  max-width: 600px;
  margin: 60px auto;
  padding: 40px;
  background: var(--theatre-cream);
  border: 4px solid var(--theatre-gold);
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

.statistics-title {
  color: var(--theatre-red);
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  text-align: center;
  margin-bottom: 30px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px dashed var(--theatre-gold);
  font-family: var(--font-body);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: var(--theatre-dark);
  font-size: var(--text-body);
}

.stat-value {
  color: var(--theatre-red);
  font-size: var(--text-h3);
  font-weight: 700;
}

.stat-icon {
  font-size: 24px;
  margin-right: 10px;
}
3.5 Анимации
css

 
/* Занавес */
@keyframes curtainOpen {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Правильный ответ */
@keyframes correctPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Неправильный ответ */
@keyframes wrongShake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

/* Разблокировка подсказки */
@keyframes unlockPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 20px currentColor;
  }
}

/* Лампочка */
@keyframes lightbulb {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    filter: brightness(1);
  }
  50% {
    transform: translateX(-50%) scale(1.1);
    filter: brightness(1.5);
  }
}

/* Появление подсказки */
@keyframes hintAppear {
  from {
    transform: scale(0.5) rotate(-10deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}

/* Блеск прогресс-бара */
@keyframes shine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

/* Появление фото */
@keyframes photoAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Прожектор */
@keyframes spotlightGrow {
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

/* Зум фото */
@keyframes photoZoomIn {
  from {
    transform: scale(0);
    opacity: 0;
    filter: blur(20px);
  }
  to {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

/* Текст снизу вверх */
@keyframes textSlideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Появление кнопки */
@keyframes buttonAppear {
  from {
    transform: translateY(30px) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Затухание */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Появление фото в галерее */
@keyframes photoFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
3.6 Адаптивный дизайн
css

 
/* Планшет */
@media (max-width: 1024px) {
  .theatre-curtain {
    height: 60px;
  }

  .ticket-form {
    padding: 30px;
  }

  .gallery-preview {
    width: 240px;
  }

  .gallery-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .gallery-collage {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
  }
}

/* Мобильный */
@media (max-width: 768px) {
  .theatre-curtain {
    height: 50px;
  }

  .progress-container {
    top: 50px;
    padding: 10px;
  }

  .ticket-container {
    margin-top: 100px;
    padding: 10px;
  }

  .ticket-form {
    padding: 20px;
    border-width: 2px;
  }

  .ticket-form::before,
  .ticket-form::after {
    width: 20px;
    height: 20px;
  }

  .ticket-form::before { left: -10px; }
  .ticket-form::after { right: -10px; }

  .answer-option {
    padding: 12px 15px;
    font-size: 14px;
  }

  .answer-label {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }

  .hints-panel {
    gap: 10px;
  }

  .hint-button {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .hint-content {
    padding: 25px;
    max-width: 90%;
  }

  .gallery-preview {
    bottom: 10px;
    right: 10px;
    left: 10px;
    width: auto;
  }

  .gallery-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .gallery-collage {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
  }

  .slider-nav {
    width: 45px;
    height: 45px;
    font-size: 18
css

 
    font-size: 18px;
  }

  .slider-nav.prev { left: 5px; }
  .slider-nav.next { right: 5px; }

  .revealed-photo {
    max-height: 50vh;
    border-width: 4px;
  }

  .photo-reveal-message {
    font-size: 1.5rem;
  }

  .continue-button {
    padding: 12px 30px;
  }

  .statistics-panel {
    padding: 25px;
  }
}

/* Малые мобильные */
@media (max-width: 480px) {
  .ticket-header h2 {
    font-size: 1.2rem;
  }

  .production-name {
    font-size: 1rem;
  }

  .question-text {
    font-size: 0.9rem;
  }

  .hint-button {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }

  .gallery-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  .slider-photo {
    max-width: 95%;
  }
}

/* Ландшафтная ориентация мобильного */
@media (max-width: 768px) and (orientation: landscape) {
  .revealed-photo {
    max-height: 60vh;
  }

  .slider-photo-container {
    height: 60vh;
  }
}
4. ТЕХНИЧЕСКАЯ АРХИТЕКТУРА
4.1 Структура файлов

 
quiz-project/
├── index.html
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── questions.js
│   ├── state.js
│   ├── ui.js
│   └── utils.js
├── assets/
│   ├── photos/
│   │   ├── photo-01.jpg
│   │   ├── photo-02.jpg
│   │   └── ... (до photo-35.jpg)
│   ├── placeholders/
│   │   ├── question-03.jpg
│   │   ├── question-06.jpg
│   │   └── ... (10 фото-вопросов)
│   ├── icons/
│   │   ├── favicon.ico
│   │   └── theatre-icon.svg
│   └── sounds/ (опционально)
│       ├── applause.mp3
│       ├── curtain.mp3
│       └── wrong.mp3
├── libs/
│   └── jszip.min.js (для скачивания архива)
└── README.md
4.2 Основной HTML (index.html)
html

 
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Театральный квиз - интерактивная викторина о постановках Большого театра">
  <title>Театральный вечер | Квиз</title>

  <!-- Favicon -->
  <link rel="icon" href="assets/icons/favicon.ico">

  <!-- Шрифты -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;600&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">

  <!-- Стили -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/animations.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body>

  <!-- Театральный занавес -->
  <div class="theatre-curtain">
    <div class="curtain-drape"></div>
  </div>

  <!-- Прогресс-бар -->
  <div class="progress-container" id="progressContainer" style="display: none;">
    <div class="progress-bar">
      <div class="progress-fill" id="progressFill" style="width: 0%"></div>
      <span class="progress-text" id="progressText">0/35 фото</span>
    </div>
  </div>

  <!-- Основной контейнер -->
  <div id="app">

    <!-- Экран приветствия -->
    <section id="welcomeScreen" class="screen active">
      <div class="welcome-content">
        <h1 class="welcome-title">🎭 Театральный вечер 🎭</h1>
        <p class="welcome-subtitle">Интерактивный квиз о постановках Большого театра</p>
        <div class="welcome-instructions">
          <h3>Правила:</h3>
          <ul>
            <li>Ответь на 35 вопросов о легендарных постановках</li>
            <li>За каждый правильный ответ получи фотографию</li>
            <li>Используй подсказки, если нужна помощь</li>
            <li>Собери все фото и открой финальную галерею!</li>
          </ul>
        </div>
        <button class="start-button" onclick="startQuiz()">
          🎟️ Начать квиз
        </button>
      </div>
    </section>

    <!-- Экран вопросов -->
    <section id="questionScreen" class="screen" style="display: none;">
      <div class="ticket-container">
        <div class="ticket-form">
          <div class="ticket-texture"></div>

          <div class="ticket-header">
            <h2>🎭 БОЛЬШОЙ ТЕАТР 🎭</h2>
            <p class="production-name" id="productionName"></p>
            <p class="question-number" id="questionNumber"></p>
          </div>

          <div class="question-content" id="questionContent">
            <!-- Динамически загружается вопрос -->
          </div>

          <div class="answers-container" id="answersContainer">
            <!-- Динамически загружаются варианты ответов -->
          </div>

          <div class="hints-panel" id="hintsPanel">
            <button class="hint-button level-1" id="hint1" onclick="showHint(1)">
              💡
              <span class="hint-timer" id="timer1"></span>
            </button>
            <button class="hint-button level-2 locked" id="hint2" disabled onclick="showHint(2)">
              💡
              <span class="hint-timer" id="timer2"></span>
            </button>
            <button class="hint-button level-3 locked" id="hint3" disabled onclick="showHint(3)">
              💡
              <span class="hint-timer" id="timer3"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Мини-превью галереи -->
      <div class="gallery-preview" id="galleryPreview">
        <div class="gallery-grid" id="galleryGrid">
          <!-- 35 ячеек -->
        </div>
        <button class="gallery-toggle" onclick="toggleGalleryPreview()">
          👁️ Просмотр собранных фото
        </button>
      </div>
    </section>

    <!-- Экран финальной галереи -->
    <section id="galleryScreen" class="screen final-gallery" style="display: none;">
      <div class="gallery-header">
        <h1 class="gallery-title">🎊 Поздравляем! 🎊</h1>
        <p class="gallery-subtitle">Все 35 фотографий собраны!</p>
      </div>

      <div class="view-mode-toggle">
        <button class="mode-button active" id="collageMode" onclick="switchViewMode('collage')">
          🖼️ Коллаж
        </button>
        <button class="mode-button" id="sliderMode" onclick="switchViewMode('slider')">
          📸 Слайдер
        </button>
      </div>

      <!-- Режим коллажа -->
      <div id="collageView" class="gallery-collage">
        <!-- Динамически загружаются все фото -->
      </div>

      <!-- Режим слайдера -->
      <div id="sliderView" class="gallery-slider" style="display: none;">
        <div class="slider-photo-container">
          <img id="sliderPhoto" class="slider-photo" src="" alt="Фото">
          <button class="slider-nav prev" onclick="prevPhoto()">◀</button>
          <button class="slider-nav next" onclick="nextPhoto()">▶</button>
        </div>
        <div class="slider-counter" id="sliderCounter">1 / 35</div>
      </div>

      <button class="download-button" onclick="downloadAllPhotos()">
        Скачать все фото
      </button>

      <!-- Статистика -->
      <div class="statistics-panel">
        <h2 class="statistics-title">🏆 Твои достижения</h2>
        <div class="stat-item">
          <span class="stat-label">⏱️ Время прохождения:</span>
          <span class="stat-value" id="statTime">--</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">✅ Правильных с 1 попытки:</span>
          <span class="stat-value" id="statCorrect">--/35</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">💡 Использовано подсказок:</span>
          <span class="stat-value" id="statHints">--</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">🎭 Любимая постановка:</span>
          <span class="stat-value" id="statFavorite">--</span>
        </div>
      </div>

      <button class="start-button" onclick="restartQuiz()" style="margin: 40px auto; display: block;">
        🔄 Начать заново
      </button>
    </section>

  </div>

  <!-- Модальное окно подсказки -->
  <div class="hint-modal" id="hintModal">
    <div class="hint-content">
      <button class="hint-close" onclick="closeHint()">✕</button>
      <h3 class="hint-title" id="hintTitle">💡 Подсказка</h3>
      <p class="hint-text" id="hintText"></p>
    </div>
  </div>

  <!-- Оверлей открытия фото -->
  <div class="photo-reveal-overlay" id="photoRevealOverlay" style="display: none;">
    <div class="photo-spotlight"></div>
    <div class="photo-reveal-content">
      <img id="revealedPhoto" class="revealed-photo" src="" alt="Открытое фото">
      <p class="photo-reveal-message">✨ Фотография открыта! ✨</p>
      <p class="photo-number" id="photoNumberText"></p>
      <button class="continue-button" onclick="continueQuiz()">Продолжить →</button>
    </div>
  </div>

  <!-- Занавес для анимаций -->
  <div class="curtain-animation" id="curtainAnimation" style="display: none;">
    <div class="curtain-left"></div>
    <div class="curtain-right"></div>
  </div>

  <!-- Скрипты -->
  <script src="libs/jszip.min.js"></script>
  <script src="js/questions.js"></script>
  <script src="js/state.js"></script>
  <script src="js/ui.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/app.js"></script>

</body>
</html>
4.3 JavaScript архитектура
4.3.1 questions.js - Данные вопросов
javascript

 
// Все 35 вопросов с подсказками
const QUESTIONS_DATA = [
  {
    id: 1,
    production: "Щелкунчик",
    type: "text",
    question: "Кто создал музыку для знаменитого балета «Щелкунчик»?",
    answers: [
      "Модест Мусоргский",
      "Петр Ильич Чайковский",
      "Николай Римский-Корсаков",
      "Антон Рубинштейн"
    ],
    correctIndex: 1,
    photoPath: "assets/photos/photo-01.jpg",
    hints: [
      {
        level: 1,
        text: "Из дневника посетителя: \"Вчера была в Большом на балете. Какая музыка! Ее автор также создал 'Лебединое озеро' и 'Спящую красавицу'. Три великих балета одного гения!\"",
        delay: 0
      },
      {
        level: 2,
        text: "Музыкальный ребус: ЧАЙ + КОВ + СКИЙ = ?",
        delay: 30000
      },
      {
        level: 3,
        text: "Анаграмма: КИЙКОЧВАЙС → ЧАЙКОВСКИЙ",
        delay: 60000
      }
    ]
  },

  {
    id: 2,
    production: "Щелкунчик",
    type: "text",
    question: "Когда впервые состоялся показ балета в Большом театре?",
    answers: [
      "1892 год",
      "1900 год",
      "1925 год",
      "1950 год"
    ],
    correctIndex: 0,
    photoPath: "assets/photos/photo-02.jpg",
    hints: [
      {
        level: 1,
        text: "Хронологическая линейка: между 1880 и 1900, ближе к концу XIX века",
        delay: 0
      },
      {
        level: 2,
        text: "Математическая загадка: 2000 - 108 = ?",
        delay: 30000
      },
      {
        level: 3,
        text: "Год: 1 8 _ 2. Подсказка: третья цифра = 9",
        delay: 60000
      }
    ]
  },

  {
    id: 3,
    production: "Щелкунчик",
    type: "photo",
    question: "На фотографии - программка спектакля. Кто автор сказки, по которой написан балет?",
    placeholderPath: "assets/placeholders/question-03.jpg",
    answers: [
      "Ганс Христиан Андерсен",
      "Братья Гримм",
      "Эрнст Теодор Амадей Гофман",
      "Шарль Перро"
    ],
    correctIndex: 2,
    photoPath: "assets/photos/photo-03.jpg",
    hints: [
      {
        level: 1,
        text: "На программке видно: '...сказки немецкого романтика Э.Т.А. Г████...'",
        delay: 0
      },
      {
        level: 2,
        text: "Немецкий писатель, композитор. Фамилия: ГОФ + МАН",
        delay: 30000
      },
      {
        level: 3,
        text: "Гофман, Эрнст Теодор Амадей (1776–1822)",
        delay: 60000
      }
    ]
  },

  // ... остальные 32 вопроса по аналогичной структуре
  // (здесь для краткости показаны только первые 3)

];

// Экспорт данных
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUESTIONS_DATA;
}
4.3.2 state.js - Управление состоянием
javascript

 
// Глобальное состояние приложения
const AppState = {
  currentQuestionIndex: 0,
  collectedPhotos: [],
  totalQuestions: 35,
  answers: {},
  statistics: {
    startTime: null,
    endTime: null,
    correctFirstTry: 0,
    totalHintsUsed: 0,
    productionStats: {}
  },

  // Инициализация
  init() {
    this.loadFromStorage();
    if (!this.statistics.startTime) {
      this.statistics.startTime = Date.now();
    }
  },

  // Сохранение в LocalStorage
  save() {
    localStorage.setItem('quizState', JSON.stringify({
      currentQuestionIndex: this.currentQuestionIndex,
      collectedPhotos: this.collectedPhotos,
      answers: this.answers,
      statistics: this.statistics
    }));
  },

  // Загрузка из LocalStorage
  loadFromStorage() {
    const saved = localStorage.getItem('quizState');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.currentQuestionIndex = data.currentQuestionIndex || 0;
        this.collectedPhotos = data.collectedPhotos || [];
        this.answers = data.answers || {};
        this.statistics = data.statistics || {
          startTime: Date.now(),
          correctFirstTry: 0,
          totalHintsUsed: 0,
          productionStats: {}
        };
      } catch (e) {
        console.error('Ошибка загрузки состояния:', e);
      }
    }
  },

  // Очистка состояния
  reset() {
    localStorage.removeItem('quizState');
    this.currentQuestionIndex = 0;
    this.collectedPhotos = [];
    this.answers = {};
    this.statistics = {
      startTime: Date.now(),
      endTime: null,
      correctFirstTry: 0,
      totalHintsUsed: 0,
      productionStats: {}
    };
  },

  // Записать ответ
  recordAnswer(questionId, isCorrect, attempts, hintsUsed) {
    this.answers[questionId] = {
      correct: isCorrect,
      attempts: attempts,
      hintsUsed: hintsUsed,
      timestamp: Date.now()
    };

    if (isCorrect && attempts === 1) {
      this.statistics.correctFirstTry++;
    }

    this.statistics.totalHintsUsed += hintsUsed.length;

    // Статистика по постановкам
    const question = QUESTIONS_DATA[questionId - 1];
    const production = question.production;
    if (!this.statistics.productionStats[production]) {
      this.statistics.productionStats[production] = {
        total: 0,
        correct: 0
      };
    }
    this.statistics.productionStats[production].total++;
    if (isCorrect) {
      this.statistics.productionStats[production].correct++;
    }

    this.save();
  },

  // Добавить фото
  addPhoto(photoPath) {
    if (!this.collectedPhotos.includes(photoPath)) {
      this.collectedPhotos.push(photoPath);
      this.save();
    }
  },

  // Завершить квиз
  complete() {
    this.statistics.endTime = Date.now();
    this.save();
  },

  // Получить любимую постановку
  getFavoriteProduction() {
    let maxScore = 0;
    let favorite = '';

    for (const [production, stats] of Object.entries(this.statistics.productionStats)) {
      const score = stats.correct / stats.total;
      if (score > maxScore) {
        maxScore = score;
        favorite = production;
      }
    }

    return favorite || 'Все постановки';
  },

  // Получить время прохождения
  getElapsedTime() {
    if (!this.statistics.startTime) return '0 мин';

    const end = this.statistics.endTime || Date.now();
    const elapsed = end - this.statistics.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    return `${minutes} мин ${seconds} сек`;
  }
};
4.3.3 ui.js - Управление интерфейсом
javascript

 
const UI = {

  // Показать экран
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';

    // Показать/скрыть прогресс-бар
    if (screenId === 'questionScreen') {
      document.getElementById('progressContainer').style.display = 'block';
    } else {
      document.getElementById('progressContainer').style.display = 'none';
    }
  },

  // Отобразить вопрос
  renderQuestion(questionIndex) {
    const question = QUESTIONS_DATA[questionIndex];

    // Название постановки
    document.getElementById('productionName').textContent = question.production;

    // Номер вопроса
    document.getElementById('questionNumber').textContent = 
      `Вопрос ${questionIndex + 1} / ${AppState.totalQuestions}`;

    // Содержимое вопроса
    const questionContent = document.getElementById('questionContent');
    if (question.type === 'text') {
      questionContent.innerHTML = `
        <p class="question-text">${question.question}</p>
      `;
    } else if (question.type === 'photo') {
      questionContent.innerHTML = `
        <div class="photo-question">
          <img src="${question.placeholderPath}" alt="Фото-вопрос" class="photo-zoom">
          <div class="photo-caption">${question.question}</div>
        </div>
      `;
    }

    // Варианты ответов
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
      const label = String.fromCharCode(65 + index); // A, B, C, D
      const answerDiv = document.createElement('div');
      answerDiv.className = 'answer-option';
      answerDiv.innerHTML = `
        <span class="answer-label">${label}</span>
        <span class="answer-text">${answer}</span>
      `;
      answerDiv.onclick = () => checkAnswer(index);
      answersContainer.appendChild(answerDiv);
    });

    // Сброс подсказок
    this.resetHints();

    // Обновить прогресс
    this.updateProgress();

    // Обновить галерею
    this.updateGalleryPreview();
  },

  // Сбросить подсказки
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

  // Разблокировать подсказку
  unlockHint(level) {
    const hintBtn = document.getElementById(`hint${level}`);
    hintBtn.classList.remove('locked');
    hintBtn.classList.add('unlocking');
    hintBtn.disabled = false;

    setTimeout(() => {
      hintBtn.classList.remove('unlocking');
    }, 1000);
  },

  // Показать модальное окно подсказки
  showHintModal(level) {
    const question = QUESTIONS_DATA[AppState.currentQuestionIndex];
    const hint = question.hints[level - 1];

    document.getElementById('hintTitle').textContent = `💡 Подсказка уровень ${level}`;
    document.getElementById('hintText').textContent = hint.text;

    const modal = document.getElementById('hintModal');
    modal.classList.add('active');
  },

  // Закрыть модальное окно подсказки
  closeHintModal() {
    const modal = document.getElementById('hintModal');
    modal.classList.remove('active');
  },

  // Выделить ответ
  highlightAnswer(index, isCorrect) {
    const options = document.querySelectorAll('.answer-option');
    options.forEach((option, i) => {
      if (i === index) {
        option.classList.add(isCorrect ? 'correct' : 'wrong');
      }
      option.classList.add('disabled');
    });
  },

  // Показать правильный ответ
  showCorrectAnswer(correctIndex) {
    const options = document.querySelectorAll('.answer-option');
    options[correctIndex].classList.add('correct');
  },

  // Показать открытие фото
  showPhotoReveal(photoPath, photoNumber) {
    const overlay = document.getElementById('photoRevealOverlay');
    const photo = document.getElementById('revealedPhoto');
    const numberText = document.getElementById('photoNumberText');

    photo.src = photoPath;
    numberText.textContent = `Фото ${photoNumber} из ${AppState.totalQuestions}`;

    overlay.style.display = 'flex';

    // Звук аплодисментов (если включен)
    playSound('applause');
  },

  // Скрыть оверлей фото
  hidePhotoReveal() {
    document.getElementById('photoRevealOverlay').style.display = 'none';
  },

  // Обновить прогресс-бар
  updateProgress() {
    const collected = AppState.collectedPhotos.length;
    const total = AppState.totalQuestions;
    const percentage = (collected / total) * 100;

    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${collected}/${total} фото`;
  },

  // Обновить мини-галерею
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

  // Отобразить финальную галерею
  renderFinalGallery() {
    // Коллаж
    const collageView = document.getElementById('collageView');
    collageView.innerHTML = '';

    AppState.collectedPhotos.forEach((photoPath, index) => {
      const photoDiv = document.createElement('div');
      photoDiv.className = 'gallery-photo';
      photoDiv.style.animationDelay = `${index * 0.05}s`;
      photoDiv.innerHTML = `
        <img src="${photoPath}" alt="Фото ${index + 1}">
        <span class="photo-number-badge">${index + 1}</span>
      `;
      photoDiv.onclick = () => openFullscreen(photoPath);
      collageView.appendChild(photoDiv);
    });

    // Слайдер - первое фото
    document.getElementById('sliderPhoto').src = AppState.collectedPhotos[0];
    document.getElementById('sliderCounter').textContent = `1 / ${AppState.totalQuestions}`;

    // Статистика
    this.renderStatistics();
  },

  // Отобразить статистику
  renderStatistics() {
    document.getElementById('statTime').textContent = AppState.getElapsedTime();
    document.getElementById('statCorrect').textContent = 
      `${AppState.statistics.correctFirstTry}/${AppState.totalQuestions}`;
    document.getElementById('statHints').textContent = AppState.statistics.totalHintsUsed;
    document.getElementById('statFavorite').textContent = AppState.getFavoriteProduction();
  },

  // Анимация занавеса
  animateCurtain(opening = true) {
    const curtain = document.getElementById('curtainAnimation');
    curtain.style.display = 'block';

    if (opening) {
      curtain.classList.add('curtain-opening');
      playSound('curtain');

      setTimeout(() => {
        curtain.style.display = 'none';
        curtain.classList.remove('curtain-opening');
      }, 1000);
    } else {
      curtain.classList.remove('curtain-opening');

      setTimeout(() => {
        curtain.style.display = 'none';
      }, 1000);
    }
  }
};
4.3.4 utils.js - Вспомогательные функции
javascript

 
// Воспроизведение звуков
function playSound(soundName) {
  // Проверка настроек звука
  const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  if (!soundEnabled) return;

  try {
    const audio = new Audio(`assets/sounds/${soundName}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Звук не загружен:', e));
  } catch (e) {
    console.log('Ошибка воспроизведения звука:', e);
  }
}

// Скачивание всех фото в ZIP
async function downloadAllPhotos() {
  try {
    const zip = new JSZip();
    const folder = zip.folder("theatre_photos");

    // Добавляем каждое фото в архив
    for (let i = 0; i < AppState.collectedPhotos.length; i++) {
      const photoPath = AppState.collectedPhotos[i];
      const response = await fetch(photoPath);
      const blob = await response.blob();
      folder.file(`photo-${String(i + 1).padStart(2, '0')}.jpg`, blob);
    }

    // Генерируем ZIP
    const content = await zip.generateAsync({type: "blob"});

    // Скачиваем
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'theatre_memories.zip';
    link.click();

  } catch (error) {
    console.error('Ошибка создания архива:', error);
    alert('Не удалось создать архив. Попробуйте скачать фото по отдельности.');
  }
}

// Открыть фото в полноэкранном режиме
function openFullscreen(photoPath) {
  const fullscreenOverlay = document.createElement('div');
  fullscreenOverlay.className = 'fullscreen-overlay';
  fullscreenOverlay.innerHTML = `
    <div class="fullscreen-content">
      <button class="fullscreen-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      <img src="${photoPath}" alt="Фото" class="fullscreen-photo">
    </div>
  `;

  fullscreenOverlay.onclick = (e) => {
    if (e.target === fullscreenOverlay) {
      fullscreenOverlay.remove();
    }
  };

  document.body.appendChild(fullscreenOverlay);
}

// Форматирование времени
function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}ч ${minutes % 60}м`;
  } else if (minutes > 0) {
    return `${minutes}м ${seconds % 60}с`;
  } else {
    return `${seconds}с`;
  }
}

// Перемешать массив (для рандомизации вопросов, если нужно)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Debounce функция
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
4.3.5 app.js - Основная логика
javascript

 
// Глобальные переменные
let currentAttempts = 0;
let maxAttempts = 3;
let usedHints = [];
let hintTimers = {};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  AppState.init();

  // Проверка на существующий прогресс
  if (AppState.currentQuestionIndex > 0) {
    if (confirm('Обнаружен сохранённый прогресс. Продолжить?')) {
      continueFromSaved();
    } else {
      startQuiz();
    }
  }
});

// Начать квиз
function startQuiz() {
  AppState.reset();
  AppState.init();
  UI.showScreen('questionScreen');
  loadQuestion(0);
  UI.animateCurtain(true);
}

// Продолжить с сохранённого места
function continueFromSaved() {
  if (AppState.currentQuestionIndex >= AppState.totalQuestions) {
    showFinalGallery();
  } else {
    UI.showScreen('questionScreen');
    loadQuestion(AppState.currentQuestionIndex);
  }
}

// Загрузить вопрос
function loadQuestion(index) {
  if (index >= QUESTIONS_DATA.length) {
    completeQuiz();
    return;
  }

  AppState.currentQuestionIndex = index;
  currentAttempts = 0;
  usedHints = [];

  // Очистить старые таймеры
  Object.values(hintTimers).forEach(timer => clearTimeout(timer));
  hintTimers = {};

  UI.renderQuestion(index);

  // Запустить таймеры для подсказок
  startHintTimers();
}

// Запустить таймеры подсказок
function startHintTimers() {
  const question = QUESTIONS_DATA[AppState.currentQuestionIndex];

  question.hints.forEach((hint, index) => {
    const level = index + 1;

    if (hint.delay > 0) {
      // Показать таймер обратного отсчёта
      updateHintTimer(level, hint.delay);

      hintTimers[level] = setTimeout(() => {
        UI.unlockHint(level);
      }, hint.delay);
    }
  });
}

// Обновить таймер подсказки
function updateHintTimer(level, delay) {
  const timerElement = document.getElementById(`timer${level}`);
  let remaining = Math.ceil(delay / 1000);

  const interval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      timerElement.textContent = `${remaining}с`;
    } else {
      timerElement.textContent = '';
      clearInterval(interval);
    }
  }, 1000);
}

// Показать подсказку
function showHint(level) {
  const hintBtn = document.getElementById(`hint${level}`);
  if (hintBtn.disabled) return;

  if (!usedHints.includes(level)) {
    usedHints.push(level);
  }

  UI.showHintModal(level);
}

// Закрыть подсказку
function closeHint() {
  UI.closeHintModal();
}

// Проверить ответ
function checkAnswer(selectedIndex) {
  const question = QUESTIONS_DATA[AppState.currentQuestionIndex];
  const isCorrect = selectedIndex === question.correctIndex;

  currentAttempts++;

  UI.highlightAnswer(selectedIndex, isCorrect);

  if (isCorrect) {
    // Правильный ответ
    playSound('applause');

    // Записать результат
    AppState.recordAnswer(
      question.id,
      true,
      currentAttempts,
      usedHints
    );

    // Добавить фото
    AppState.addPhoto(question.photoPath);

    // Показать фото через 1 секунду
    setTimeout(() => {
      UI.showPhotoReveal(question.photoPath, AppState.currentQuestionIndex + 1);
    }, 1000);

  } else {
    // Неправильный ответ
    playSound('wrong');

    if (currentAttempts < maxAttempts) {
      // Разблокировать следующую подсказку
      if (currentAttempts === 1) {
        UI.unlockHint(2);
      } else if (currentAttempts === 2) {
        UI.unlockHint(3);
      }

      // Показать сообщение
      setTimeout(() => {
        alert(`Неправильно! Попробуйте ещё раз. Осталось попыток: ${maxAttempts - currentAttempts}`);

        // Сбросить выделение
        document.querySelectorAll('.answer-option').forEach(option => {
          option.classList.remove('wrong', 'disabled');
        });
      }, 500);

    } else {
      // Попытки исчерпаны
      UI.showCorrectAnswer(question.correctIndex);

      // Записать результат
      AppState.recordAnswer(
        question.id,
        false,
        currentAttempts,
        usedHints
      );

      setTimeout(() => {
        alert('Попытки исчерпаны. Показываем правильный ответ.');
        // Всё равно показать фото и перейти дальше
        AppState.addPhoto(question.photoPath);
        UI.showPhotoReveal(question.photoPath, AppState.currentQuestionIndex + 1);
      }, 1500);
    }
  }
}

// Продолжить после открытия фото
function continueQuiz() {
  UI.hidePhotoReveal();

  // Переход к следующему вопросу
  const nextIndex = AppState.currentQuestionIndex + 1;

  if (nextIndex >= AppState.totalQuestions) {
    completeQuiz();
  } else {
    loadQuestion(nextIndex);
  }
}

// Завершить квиз
function completeQuiz() {
  AppState.complete();
  showFinalGallery();
}

// Показать финальную галерею
function showFinalGallery() {
  UI.showScreen('galleryScreen');
  UI.renderFinalGallery();
  UI.animateCurtain(true);
}

// Переключить режим просмотра галереи
let currentSlideIndex = 0;

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

    // Показать текущее фото
    showSlide(currentSlideIndex);
  }
}

// Показать слайд
function showSlide(index) {
  if (index < 0) index = AppState.collectedPhotos.length - 1;
  if (index >= AppState.collectedPhotos.length) index = 0;

  currentSlideIndex = index;

  const photo = document.getElementById('sliderPhoto');
  const counter = document.getElementById('sliderCounter');

  photo.src = AppState.collectedPhotos[index];
  counter.textContent = `${index + 1} / ${AppState.totalQuestions}`;
}

// Предыдущее фото
function prevPhoto() {
  showSlide(currentSlideIndex - 1);
}

// Следующее фото
function nextPhoto() {
  showSlide(currentSlideIndex + 1);
}

// Переключить видимость мини-галереи
function toggleGalleryPreview() {
  const preview = document.getElementById('galleryPreview');
  preview.classList.toggle('minimized');
}

// Перезапустить квиз
function restartQuiz() {
  if (confirm('Вы уверены? Весь прогресс будет потерян.')) {
    AppState.reset();
    location.reload();
  }
}

// Клавиатурные шорткаты
document.addEventListener('keydown', (e) => {
  // ESC - закрыть модалки
  if (e.key === 'Escape') {
    UI.closeHintModal();
    const fullscreen = document.querySelector('.fullscreen-overlay');
    if (fullscreen) fullscreen.remove();
  }

  // Стрелки для слайдера
  const sliderVisible = document.getElementById('sliderView').style.display !== 'none';
  if (sliderVisible) {
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  }

  // Цифры 1-4 для выбора ответа
  if (document.getElementById('questionScreen').style.display !== 'none') {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 4) {
      const options = document.querySelectorAll('.answer-option');
      if (options[num - 1] && !options[num - 1].classList.contains('disabled')) {
        checkAnswer(num - 1);
      }
    }
  }
});
5. ДОПОЛНИТЕЛЬНЫЕ ТРЕБОВАНИЯ
5.1 Производительность
Оптимизация изображений:

javascript

 
// Lazy loading для фото
const lazyLoadImage = (img) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  observer.observe(img);
};

// Применение
document.querySelectorAll('img.lazy').forEach(lazyLoadImage);
Размер файлов:
- HTML: ~15KB
- CSS (все файлы): ~50KB
- JavaScript (все файлы): ~80KB
- Каждое фото: максимум 500KB
- Общий размер проекта: ~20-25MB
Кэширование:

javascript

 
// Service Worker для кэширования (опционально)
// sw.js
const CACHE_NAME = 'theatre-quiz-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/app.js',
  '/js/questions.js',
  '/js/state.js',
  '/js/ui.js',
  '/js/utils.js',
  '/libs/jszip.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
5.2 Доступность (A11y)
ARIA-атрибуты:

html

 
<!-- Пример для вопроса -->
<div class="ticket-form" role="main" aria-labelledby="questionTitle">
  <h2 id="questionTitle">Вопрос о Щелкунчике</h2>

  <div class="answers-container" role="radiogroup" aria-labelledby="questionTitle">
    <div class="answer-option" role="radio" aria-checked="false" tabindex="0">
      <span class="answer-label">А</span>
      <span class="answer-text">Вариант ответа</span>
    </div>
  </div>

  <div class="hints-panel" role="toolbar" aria-label="Подсказки">
    <button class="hint-button" aria-label="Подсказка уровень 1">💡</button>
  </div>
</div>
Навигация с клавиатуры:
- Tab/Shift+Tab: навигация по элементам
- Enter/Space: выбор ответа
- 1-4: быстрый выбор ответа
- Esc: закрытие модальных окон
- ←/→: навигация в слайдере

Контрастность:
- Минимальное соотношение 4.5:1 для текста
- 3:1 для крупных элементов

5.3 SEO и метаданные
html

 
<head>
  <!-- Основные метатеги -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Интерактивный квиз о легендарных постановках Большого театра. Отвечайте на вопросы и собирайте фотографии!">
  <meta name="keywords" content="квиз, Большой театр, балет, опера, викторина">
  <meta name="author" content="Your Name">

  <!-- Open Graph -->
  <meta property="og:title" content="Театральный вечер | Квиз">
  <meta property="og:description" content="Интерактивная викторина о постановках Большого театра">
  <meta property="og:image" content="assets/icons/preview.jpg">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Театральный вечер | Квиз">
  <meta name="twitter:description" content="Интерактивная викторина о постановках Большого театра">
  <meta name="twitter:image" content="assets/icons/preview.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico">
  <link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">

  <title>Театральный вечер | Квиз</title>
</head>
6. РАЗВЕРТЫВАНИЕ НА GITHUB PAGES
6.1 Подготовка репозитория
Структура GitHub репозитория:


 
your-username/theatre-quiz/
├── index.html
├── css/
├── js/
├── assets/
├── libs/
├── README.md
├── .gitignore
└── LICENSE
Файл .gitignore:


 
# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
*.log

# Node modules (если используется)
node_modules/
6.2 Инструкция по развертыванию
Шаг 1: Создать репозиторий

bash

 
# Инициализировать Git
git init

# Добавить файлы
git add .

# Коммит
git commit -m "Initial commit: Theatre Quiz"

# Добавить remote
git remote add origin https://github.com/your-username/theatre-quiz.git

# Пуш
git push -u origin main
Шаг 2: Настроить GitHub Pages
1. Перейти в Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Save

Шаг 3: Доступ к сайту


 
https://your-username.github.io/theatre-quiz/
6.3 Файл README.md
markdown

 
# 🎭 Театральный вечер | Интерактивный квиз

Интерактивная викторина о легендарных постановках Большого театра.

## 🎯 О проекте

35 вопросов о балетах, операх и драматических постановках. 
За каждый правильный ответ открывается фотография из галереи воспоминаний.

## 🎪 Постановки в квизе

- **Балеты**: Щелкунчик, Жизель, Золушка, Дон Кихот, Раймонда
- **Драма**: Гамлет, Макбет, Эсмеральда
- **Оперы**: Орлеанская дева, Альцина, Сотворение мира

## 🚀 Запуск

Просто откройте `index.html` в браузере или перейдите по ссылке:
[https://your-username.github.io/theatre-quiz/](https://your-username.github.io/theatre-quiz/)

## 💻 Технологии

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- LocalStorage для сохранения прогресса
- JSZip для скачивания архива фотографий

## 📱 Совместимость

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Мобильные браузеры (iOS Safari, Chrome Mobile)

## 🎨 Особенности

- 🎭 Театральный дизайн в стиле Большого театра
- 💡 Трёхуровневая система подсказок
- 📸 35 фотографий для открытия
- 📊 Статистика прохождения
- 💾 Автосохранение прогресса
- 📥 Скачивание всех фото одним архивом
- 📱 Адаптивный дизайн

## 📝 Лицензия

MIT License

## 👤 Автор

[Your Name]

---

❤️ Сделано с любовью к театру
7. ТЕСТИРОВАНИЕ
7.1 Чек-лист функционала
Основной функционал:
- [ ] Приветственный экран отображается корректно
- [ ] Кнопка "Начать квиз" работает
- [ ] Вопросы загружаются последовательно
- [ ] Все 4 варианта ответа кликабельны
- [ ] Правильный ответ открывает фото
- [ ] Неправильный ответ показывает сообщение
- [ ] Максимум 3 попытки на вопрос
- [ ] После 3 неправильных попыток показывается правильный ответ
- [ ] Переход к следующему вопросу работает

Система подсказок:
- [ ] Подсказка уровня 1 доступна сразу
- [ ] Подсказка уровня 2 разблокируется через 30 сек или после 1 ошибки
- [ ] Подсказка уровня 3 разблокируется через 60 сек или после 2 ошибок
- [ ] Модальное окно подсказки открывается
- [ ] Модальное окно закрывается по кнопке и ESC
- [ ] Таймеры работают корректно

Фото-вопросы:
- [ ] Изображения загружаются
- [ ] Изображения можно увеличить
- [ ] Вопросы к фото отображаются

Прогресс:
- [ ] Прогресс-бар обновляется
- [ ] Счётчик фото корректный (X/35)
- [ ] Мини-галерея отображает собранные фото
- [ ] Анимация появления фото работает

Финальная галерея:
- [ ] Все 35 фото отображаются
- [ ] Режим коллажа работает
- [ ] Режим слайдера работает
- [ ] Навигация в слайдере (кнопки и стрелки клавиатуры)
- [ ] Полноэкранный просмотр работает
- [ ] Скачивание ZIP-архива работает
- [ ] Статистика отображается корректно

LocalStorage:
- [ ] Прогресс сохраняется
- [ ] При перезагрузке предлагается продолжить
- [ ] Кнопка "Начать заново" очищает прогресс

Адаптивность:
- [ ] Десктоп (1920×1080)
- [ ] Ноутбук (1366×768)
- [ ] Планшет (768×1024)
- [ ] Мобильный (375×667)
- [ ] Ландшафтная ориентация

Браузеры:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] iOS Safari
- [ ] Chrome Mobile

7.2 Тестовые сценарии
Сценарий 1: Полное прохождение
1. Открыть сайт
2. Нажать "Начать квиз"
3. Ответить правильно на все 35 вопросов
4. Проверить открытие всех фото
5. Проверить финальную галерею
6. Скачать архив

Сценарий 2: Использование подсказок
1. Открыть вопрос
2. Нажать подсказку уровня 1
3. Подождать 30 секунд
4. Нажать подсказку уровня 2
5. Ответить правильно

Сценарий 3: Неправильные ответы
1. Ответить неправильно (1 попытка)
2. Ответить неправильно (2 попытка)
3. Ответить неправильно (3 попытка)
4. Проверить показ правильного ответа
5. Проверить открытие фото

Сценарий 4: Прерывание и продолжение
1. Начать квиз
2. Ответить на 10 вопросов
3. Закрыть браузер
4. Открыть снова
5. Проверить предложение продолжить
6. Продолжить с 11-го вопроса

8. ОПТИМИЗАЦИЯ И УЛУЧШЕНИЯ
8.1 Возможные улучшения
Функциональные:
- Таймер на весь квиз
- Режим соревнования (таблица лидеров)
- Возможность поделиться результатом в соцсетях
- Тёмная тема
- Настройки (звук, анимации)
- Дополнительные постановки (расширяемость)

Технические:
- Progressive Web App (PWA)
- Service Worker для офлайн-режима
- Предзагрузка следующего фото
- Сжатие изображений (WebP)
- Минификация CSS/JS
- CDN для библиотек

UX:
- Анимация перехода между вопросами
- Конфетти при правильном ответе
- Звуковые эффекты (опционально)
- Индикатор загрузки
- Тултипы и подсказки интерфейса

8.2 Метрики успеха
Измеряемые показатели:
- Среднее время прохождения
- Процент завершивших квиз
- Среднее количество использованных подсказок
- Самые сложные вопросы (по попыткам)
- Процент правильных ответов с первой попытки

Инструменты:

javascript

 
// Google Analytics (опционально)
gtag('event', 'question_answered', {
  'question_id': questionId,
  'is_correct': isCorrect,
  'attempts': attempts,
  'hints_used': hintsUsed.length
});

gtag('event', 'quiz_completed', {
  'total_time': elapsedTime,
  'correct_first_try': correctFirstTry,
  'total_hints': totalHints
});
9. КОНТАКТЫ И ПОДДЕРЖКА
9.1 Техническая поддержка
При возникновении проблем:
1. Проверить консоль браузера (F12 → Console)
2. Очистить кэш и LocalStorage
3. Попробовать в режиме инкогнито
4. Проверить поддержку браузера

Известные ограничения:
- Не работает в IE11 и ниже
- Требуется JavaScript
- Требуется LocalStorage
- Минимальное разрешение 320px

9.2 Обратная связь
**

Сообщения об ошибках:

javascript

 
// Логирование ошибок (опционально)
window.addEventListener('error', (event) => {
  console.error('Ошибка:', event.error);

  // Отправка в систему мониторинга (если есть)
  // sendErrorReport(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Необработанный Promise:', event.reason);
});
10. ЧЕКЛИСТ ПЕРЕД ПУБЛИКАЦИЕЙ
10.1 Контент
[ ] Все 35 вопросов проверены на грамматику
[ ] Все правильные ответы отмечены корректно
[ ] Все подсказки написаны и проверены
[ ] Все 35 фото загружены в /assets/photos/
[ ] Все 10 фото-вопросов загружены в /assets/placeholders/
[ ] Фотографии оптимизированы (размер, качество)
[ ] Названия файлов соответствуют конвенции
10.2 Код
[ ] Код протестирован локально
[ ] Нет console.log в продакшен-коде
[ ] Все пути к файлам относительные
[ ] CSS валидирован
[ ] JavaScript работает без ошибок
[ ] Все функции документированы комментариями
[ ] Код минифицирован (опционально)
10.3 Дизайн
[ ] Все анимации работают плавно
[ ] Цвета соответствуют палитре
[ ] Шрифты загружаются
[ ] Иконки и эмодзи отображаются
[ ] Адаптивность проверена на всех разрешениях
[ ] Нет визуальных багов
10.4 Функционал
[ ] Все экраны работают
[ ] Навигация между экранами корректна
[ ] LocalStorage сохраняет и загружает данные
[ ] Подсказки разблокируются по таймеру
[ ] Фото открываются при правильных ответах
[ ] Финальная галерея отображает все фото
[ ] Скачивание ZIP работает
[ ] Статистика считается правильно
10.5 Производительность
[ ] Страница загружается < 3 секунд
[ ] Изображения lazy-load
[ ] Нет утечек памяти
[ ] Анимации 60 FPS
[ ] Размер проекта < 30MB
10.6 Доступность
[ ] Все интерактивные элементы доступны с клавиатуры
[ ] ARIA-атрибуты добавлены
[ ] Контрастность текста достаточная
[ ] Alt-тексты для изображений
[ ] Семантическая разметка HTML
10.7 SEO
[ ] Метатеги заполнены
[ ] Favicon добавлен
[ ] Open Graph метатеги
[ ] Корректный title
[ ] robots.txt (если нужен)
[ ] sitemap.xml (если нужен)
10.8 GitHub Pages
[ ] Репозиторий создан
[ ] Все файлы закоммичены
[ ] GitHub Pages настроен
[ ] Сайт доступен по URL
[ ] README.md заполнен
[ ] LICENSE добавлен
11. ФАЙЛЫ КОНФИГУРАЦИИ
11.1 package.json (опционально)
json

 
{
  "name": "theatre-quiz",
  "version": "1.0.0",
  "description": "Интерактивный квиз о постановках Большого театра",
  "main": "index.html",
  "scripts": {
    "start": "npx http-server -p 8080",
    "build": "npm run minify",
    "minify": "npx minify js/app.js > js/app.min.js"
  },
  "keywords": ["quiz", "theatre", "bolshoi"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "http-server": "^14.1.1",
    "minify": "^10.0.0"
  }
}
11.2 .editorconfig
ini

 
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
11.3 robots.txt (опционально)

 
User-agent: *
Allow: /

Sitemap: https://your-username.github.io/theatre-quiz/sitemap.xml
12. ИНСТРУКЦИЯ ПО ДОБАВЛЕНИЮ ФОТОГРАФИЙ
12.1 Формат фотографий
Для наград (35 фото):


 
Название: photo-01.jpg, photo-02.jpg, ..., photo-35.jpg
Путь: /assets/photos/
Формат: JPEG
Размер файла: 300-500 KB
Разрешение: 1200×800px (горизонтальные) или 800×1200px (вертикальные)
Качество: 85%
Оптимизация: обязательна (TinyPNG, ImageOptim)
Для фото-вопросов (10 фото):


 
Название: question-03.jpg, question-06.jpg, и т.д.
Путь: /assets/placeholders/
Формат: JPEG
Размер файла: 200-300 KB
Разрешение: 800×600px
Качество: 80%
Детали: должны содержать подсказку на ответ
12.2 Процесс добавления
Шаг 1: Подготовка
1. Выбрать 35 фотографий для наград
2. Выбрать 10 фотографий для вопросов
3. Проверить качество и ориентацию

Шаг 2: Обработка

bash

 
# Изменить размер (ImageMagick)
convert photo-original.jpg -resize 1200x800^ -gravity center -extent 1200x800 photo-01.jpg

# Оптимизировать
jpegoptim --size=400k photo-01.jpg
Шаг 3: Размещение
 
/assets/photos/photo-01.jpg → Вопрос 1 награда
/assets/photos/photo-02.jpg → Вопрос 2 награда
...
/assets/placeholders/question-03.jpg → Вопрос 3 (фото-вопрос)
Шаг 4: Проверка
- [ ] Все файлы на месте
- [ ] Названия соответствуют конвенции
- [ ] Размер файлов приемлемый
- [ ] Изображения загружаются на сайте

13. ЗАМЕНА PLACEHOLDER-ФОТО
13.1 Список фото-вопросов
javascript

 
// В файле questions.js найти вопросы с type: "photo"
// Это вопросы с id: 3, 6, 9, 12, 15, 18, 21, 24, 25, 31

const photoQuestions = [
  {
    id: 3,
    production: "Щелкунчик",
    placeholderPath: "assets/placeholders/question-03.jpg",
    description: "Программка спектакля с частично видимым именем автора"
  },
  {
    id: 6,
    production: "Жизель",
    placeholderPath: "assets/placeholders/question-06.jpg",
    description: "Сцена с танцем духов-вилис в белых пачках"
  },
  {
    id: 9,
    production: "Золушка",
    placeholderPath: "assets/placeholders/question-09.jpg",
    description: "Афиша с выделенной хрустальной туфелькой"
  },
  {
    id: 12,
    production: "Дон Кихот",
    placeholderPath: "assets/placeholders/question-12.jpg",
    description: "Костюм Китри в испанском стиле"
  },
  {
    id: 15,
    production: "Раймонда",
    placeholderPath: "assets/placeholders/question-15.jpg",
    description: "Сцена с рыцарями в средневековых костюмах"
  },
  {
    id: 18,
    production: "Гамлет",
    placeholderPath: "assets/placeholders/question-18.jpg",
    description: "Гамлет держит череп Йорика"
  },
  {
    id: 21,
    production: "Макбет",
    placeholderPath: "assets/placeholders/question-21.jpg",
    description: "Три ведьмы у котла"
  },
  {
    id: 24,
    production: "Эсмеральда",
    placeholderPath: "assets/placeholders/question-24.jpg",
    description: "Афиша с изображением Квазимодо"
  },
  {
    id: 25,
    production: "Эсмеральда",
    placeholderPath: "assets/placeholders/question-25.jpg",
    description: "Цыганский костюм с монетами"
  },
  {
    id: 31,
    production: "Альцина",
    placeholderPath: "assets/placeholders/question-31.jpg",
    description: "Сцена с мультимедийными проекциями"
  }
];
13.2 Инструкция по замене
Для каждого фото-вопроса:
1. Найти соответствующую фотографию
2. Обработать согласно требованиям (800×600px, 200-300KB)
3. Сохранить в /assets/placeholders/ с правильным именем
4. Проверить, что фото содержит визуальную подсказку на ответ
5. Убедиться, что ответ не очевиден с первого взгляда

14. ФИНАЛЬНАЯ СТРУКТУРА ПРОЕКТА

 
theatre-quiz/
│
├── index.html                     # Главный HTML файл
│
├── css/
│   ├── main.css                  # Основные стили
│   ├── animations.css            # Анимации
│   └── responsive.css            # Адаптивность
│
├── js/
│   ├── app.js                    # Основная логика
│   ├── questions.js              # Данные вопросов (35 вопросов)
│   ├── state.js                  # Управление состоянием
│   ├── ui.js                     # Управление интерфейсом
│   └── utils.js                  # Вспомогательные функции
│
├── assets/
│   ├── photos/
│   │   ├── photo-01.jpg          # Фото награды за вопрос 1
│   │   ├── photo-02.jpg          # Фото награды за вопрос 2
│   │   ├── ...
│   │   └── photo-35.jpg          # Фото награды за вопрос 35
│   │
│   ├── placeholders/
│   │   ├── question-03.jpg       # Фото для вопроса 3
│   │   ├── question-06.jpg       # Фото для вопроса 6
│   │   ├── question-09.jpg       # Фото для вопроса 9
│   │   ├── question-12.jpg       # Фото для вопроса 12
│   │   ├── question-15.jpg       # Фото для вопроса 15
│   │   ├── question-18.jpg       # Фото для вопроса 18
│   │   ├── question-21.jpg       # Фото для вопроса 21
│   │   ├── question-24.jpg       # Фото для вопроса 24
│   │   ├── question-25.jpg       # Фото для вопроса 25
│   │   └── question-31.jpg       # Фото для вопроса 31
│   │
│   ├── icons/
│   │   ├── favicon.ico           # Иконка сайта
│   │   ├── apple-touch-icon.png  # Иконка для iOS
│   │   └── preview.jpg           # Превью для соцсетей
│   │
│   └── sounds/ (опционально)
│       ├── applause.mp3          # Звук аплодисментов
│       ├── curtain.mp3           # Звук занавеса
│       └── wrong.mp3             # Звук ошибки
│
├── libs/
│   └── jszip.min.js              # Библиотека для создания ZIP
│
├── .gitignore                    # Игнорируемые файлы Git
├── README.md                     # Документация проекта
├── LICENSE                       # Лицензия MIT
│
└── (опционально)
    ├── sw.js                     # Service Worker
    ├── manifest.json             # PWA манифест
    └── package.json              # NPM конфигурация
15. КРАТКАЯ ИНСТРУКЦИЯ ПО ЗАПУСКУ
Для разработчика:
bash

 
# 1. Клонировать репозиторий
git clone https://github.com/your-username/theatre-quiz.git
cd theatre-quiz

# 2. Добавить фотографии в папки:
# - 35 фото в assets/photos/
# - 10 фото в assets/placeholders/

# 3. Открыть index.html в браузере
# или запустить локальный сервер:
python3 -m http.server 8080
# или
npx http-server -p 8080

# 4. Открыть http://localhost:8080
Для именинницы:

 
1. Открыть ссылку в браузере:
   https://your-username.github.io/theatre-quiz/

2. Нажать "Начать квиз"

3. Отвечать на вопросы

4. Собрать все 35 фотографий

5. Наслаждаться финальной галереей!
16. TROUBLESHOOTING (РЕШЕНИЕ ПРОБЛЕМ)
16.1 Частые проблемы
Проблема: Фотографии не загружаются


 
Решение:
1. Проверить пути к файлам (должны быть относительные)
2. Проверить названия файлов (photo-01.jpg, не Photo-1.jpg)
3. Проверить консоль браузера (F12 → Console)
4. Убедиться, что файлы загружены в репозиторий
Проблема: LocalStorage не работает


 
Решение:
1. Проверить, что сайт открыт по HTTPS или localhost
2. Проверить настройки браузера (разрешены ли cookies)
3. Очистить кэш браузера
4. Попробовать режим инкогнито
Проблема: Подсказки не разблокируются


 
Решение:
1. Проверить console.log в startHintTimers()
2. Убедиться, что таймеры не очищаются преждевременно
3. Проверить значения delay в questions.js
Проблема: ZIP-архив не скачивается


 
Решение:
1. Проверить, подключена ли библиотека jszip.min.js
2. Проверить CORS (если фото на другом домене)
3. Проверить консоль на ошибки
4. Использовать альтернативный метод (скачивание по одному)
Проблема: Анимации лагают на мобильных


 
Решение:
1. Упростить анимации в CSS
2. Использовать transform вместо margin/padding
3. Добавить will-change: transform
4. Уменьшить количество одновременных анимаций
16.2 Отладка
javascript

 
// Добавить в начало app.js для дебага
const DEBUG = true; // Поставить false для продакшена

function log(...args) {
  if (DEBUG) {
    console.log('[Quiz Debug]:', ...args);
  }
}

// Использование
log('Загружен вопрос:', questionIndex);
log('Состояние:', AppState);
log('Попытка ответа:', selectedIndex);
Debug панель (опционально):

javascript

 
// Добавить в HTML (скрыть для продакшена)
if (DEBUG) {
  const debugPanel = document.createElement('div');
  debugPanel.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    color: lime;
    padding: 10px;
    font-family: monospace;
    font-size: 12px;
    z-index: 9999;
  `;
  debugPanel.innerHTML = `
    <div>Вопрос: <span id="debugQuestion">0</span>/35</div>
    <div>Фото: <span id="debugPhotos">0</span>/35</div>
    <div>Попытки: <span id="debugAttempts">0</span></div>
    <div>Подсказки: <span id="debugHints">[]</span></div>
  `;
  document.body.appendChild(debugPanel);

  // Обновлять при изменениях
  setInterval(() => {
    document.getElementById('debugQuestion').textContent = AppState.currentQuestionIndex + 1;
    document.getElementById('debugPhotos').textContent = AppState.collectedPhotos.length;
    document.getElementById('debugAttempts').textContent = currentAttempts;
    document.getElementById('debugHints').textContent = JSON.stringify(usedHints);
  }, 100);
}
17. ДОПОЛНИТЕЛЬНЫЕ СТИЛИ
17.1 Полноэкранный просмотр
css

 
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.95);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
  cursor: zoom-out;
}

.fullscreen-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  cursor: default;
}

.fullscreen-photo {
  max-width: 100%;
  max-height: 95vh;
  border: 5px solid var(--theatre-gold);
  border-radius: 10px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.8);
}

.fullscreen-close {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 50px;
  height: 50px;
  background: var(--theatre-red);
  color: white;
  border: 3px solid var(--theatre-gold);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fullscreen-close:hover {
  background: white;
  color: var(--theatre-red);
  transform: rotate(90deg) scale(1.1);
}
17.2 Загрузка (loader)
css

 
.loader {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid var(--theatre-cream);
  border-top-color: var(--theatre-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--theatre-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5000;
}

.loading-text {
  color: var(--theatre-gold);
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  margin-top: 20px;
}
17.3 Тостеры (уведомления)
css

 
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--theatre-burgundy);
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  border: 2px solid var(--theatre-gold);
  font-family: var(--font-body);
  font-size: var(--text-body);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 6000;
  animation: toastSlideUp 0.5s ease forwards;
}

@keyframes toastSlideUp {
  to {
    transform: translateX(-50%) translateY(0);
  }
}

.toast.hiding {
  animation: toastSlideDown 0.5s ease forwards;
}

@keyframes toastSlideDown {
  to {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }
}

.toast.success {
  background: var(--correct-answer);
}

.toast.error {
  background: var(--wrong-answer);
}

.toast.info {
  background: var(--theatre-dark-gold);
  color: var(--theatre-dark);
}
17.4 Пустые состояния
css

 
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--theatre-burgundy);
}

.empty-state-icon {
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state-title {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  margin-bottom: 10px;
}

.empty-state-text {
  font-family: var(--font-body);
  font-size: var(--text-body);
  opacity: 0.7;
}
18. ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ
18.1 Режим "Звук"
javascript

 
// Добавить в utils.js
const SoundManager = {
  enabled: true,

  init() {
    const saved = localStorage.getItem('soundEnabled');
    this.enabled = saved !== 'false';
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', this.enabled);
    return this.enabled;
  },

  play(soundName) {
    if (!this.enabled) return;
    playSound(soundName);
  }
};

// Добавить кнопку переключения в HTML
/*
<button class="sound-toggle" onclick="toggleSound()">
  <span id="soundIcon">🔊</span>
</button>
*/

function toggleSound() {
  const enabled = SoundManager.toggle();
  document.getElementById('soundIcon').textContent = enabled ? '🔊' : '🔇';
  showToast(enabled ? 'Звук включен' : 'Звук выключен', 'info');
}
18.2 Тостеры (уведомления)
javascript

 
// Добавить в utils.js
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

// Использование
showToast('Подсказка разблокирована!', 'success');
showToast('Неправильный ответ', 'error');
showToast('Прогресс сохранён', 'info');
18.3 Шаринг в соцсети
javascript

 
// Добавить в utils.js
function shareResults() {
  const stats = AppState.statistics;
  const text = `🎭 Я прошёл квиз "Театральный вечер"!\n` +
               `✅ Правильных ответов: ${stats.correctFirstTry}/35\n` +
               `⏱️ Время: ${AppState.getElapsedTime()}\n` +
               `💡 Подсказок: ${stats.totalHintsUsed}\n\n` +
               `Попробуй и ты! 🎟️`;

  if (navigator.share) {
    // Использовать Web Share API (мобильные)
    navigator.share({
      title: 'Театральный вечер | Квиз',
      text: text,
      url: window.location.href
    }).catch(err => console.log('Ошибка шаринга:', err));
  } else {
    // Fallback: скопировать в буфер
    navigator.clipboard.writeText(text + '\n' + window.location.href)
      .then(() => showToast('Результат скопирован!', 'success'))
      .catch(() => showToast('Не удалось скопировать', 'error'));
  }
}

// Добавить кнопку в HTML галереи
/*
<button class="share-button" onclick="shareResults()">
  📤 Поделиться результатом
</button>
*/
18.4 Таймер обратного отсчёта
javascript

 
// Опциональный таймер на весь квиз (например, 30 минут)
const QuizTimer = {
  totalTime: 30 * 60 * 1000, // 30 минут в миллисекундах
  startTime: null,
  timerInterval: null,

  start() {
    this.startTime = Date.now();
    this.updateDisplay();

    this.timerInterval = setInterval(() => {
      this.updateDisplay();

      const elapsed = Date.now() - this.startTime;
      if (elapsed >= this.totalTime) {
        this.timeUp();
      }
    }, 1000);
  },

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },

  updateDisplay() {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.totalTime - elapsed);

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    const display = document.getElementById('quizTimer');
    if (display) {
      display.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;

      // Предупреждение, когда осталось мало времени
      if (remaining < 5 * 60 * 1000) {
        display.style.color = 'var(--wrong-answer)';
      }
    }
  },

  timeUp() {
    this.stop();
    alert('Время вышло! Квиз завершён.');
    completeQuiz();
  }
};

// Добавить в HTML (в progress-container)
/*
<span id="quizTimer" class="quiz-timer"></span>
*/
19. ИТОГОВЫЙ ЧЕКЛИСТ
✅ ГОТОВО К ПУБЛИКАЦИИ, ЕСЛИ:
Контент:
- [x] Все 35 вопросов добавлены в questions.js
- [x] Все подсказки написаны (3 уровня на каждый вопрос)
- [x] Правильные ответы проверены
- [x] 35 фото наград добавлены в assets/photos/
- [x] 10 фото-вопросов добавлены в assets/placeholders/

Код:
- [x] HTML структура создана
- [x] CSS стили написаны (main, animations, responsive)
- [x] JavaScript модули готовы (app, questions, state, ui, utils)
- [x] LocalStorage интеграция работает
- [x] Все функции протестированы

Дизайн:
- [x] Театральная тема реализована
- [x] Цветовая палитра применена
- [x] Типографика настроена
- [x] Анимации работают плавно
- [x] Адаптивность для всех устройств

**Функционал:**
- [x] Система вопросов работает
- [x] Подсказки разблокируются корректно
- [x] Фотографии открываются при правильных ответах
- [x] Прогресс-бар обновляется
- [x] Финальная галерея отображается
- [x] ZIP-архив генерируется
- [x] Статистика считается правильно

**Технические:**
- [x] Все пути относительные
- [x] Нет console.log в продакшене
- [x] Код оптимизирован
- [x] Изображения сжаты
- [x] Браузеры протестированы
- [x] Мобильные устройства протестированы

**GitHub Pages:**
- [x] Репозиторий создан
- [x] Файлы закоммичены
- [x] GitHub Pages активирован
- [x] Сайт доступен по URL
- [x] README.md заполнен
20. ЗАКЛЮЧЕНИЕ
20.1 Резюме технического задания
Данное ТЗ описывает полноценный одностраничный веб-квиз с следующими характеристиками:

Технологический стек:
- HTML5 (семантическая разметка)
- CSS3 (Flexbox, Grid, анимации, адаптивность)
- Vanilla JavaScript ES6+ (модульная архитектура)
- LocalStorage (сохранение прогресса)
- JSZip (генерация архивов)

Особенности:
- ✨ 35 вопросов о постановках Большого театра
- 🎭 Театральный дизайн с занавесами, билетами, золотом
- 💡 Трёхуровневая система подсказок
- 📸 35 фотографий для открытия
- 📊 Подробная статистика прохождения
- 💾 Автосохранение в LocalStorage
- 📱 Полная адаптивность
- 🚀 GitHub Pages ready

Структура данных:

javascript

 
{
  questions: 35,        // 25 текстовых + 10 фото
  photos: 35,          // По одному на вопрос
  hints: 105,          // По 3 подсказки на вопрос
  productions: 11,     // Постановок в квизе
  screens: 4           // Экранов интерфейса
}
20.2 Метрики проекта

Размеры файлов (примерно):

 
HTML:         ~15 KB
CSS:          ~50 KB
JavaScript:   ~80 KB
JSZip:        ~100 KB
Фото (35×):   ~17.5 MB
Placeholders: ~2.5 MB
────────────────────
ИТОГО:        ~20 MB

Время разработки (оценка):

 
Дизайн и верстка:     8-12 часов
JavaScript логика:    10-15 часов
Подготовка контента:  5-8 часов
Тестирование:         4-6 часов
Оптимизация:          2-4 часа
────────────────────────────────
ИТОГО:                29-45 часов

20.3 Следующие шаги
Немедленные действия:
1. ✅ Создать структуру папок
2. ✅ Скопировать HTML каркас
3. ✅ Добавить CSS стили
4. ✅ Реализовать JavaScript модули
5. 📸 Подготовить и загрузить фотографии
6. 🧪 Протестировать локально
7. 🚀 Задеплоить на GitHub Pages
8. 🎉 Отправить ссылку имениннице

Дополнительные улучшения (при желании):
- PWA функционал (офлайн режим)
- Анимация конфетти при правильных ответах
- Звуковые эффекты
- Темная тема
- Режим соревнования с таблицей лидеров
- Расширение на другие театры

20.4 Контакты для поддержки

 
📧 Email: your-email@example.com
🐙 GitHub: github.com/your-username
💬 Issues: github.com/your-username/theatre-quiz/issues
📋 КРАТКАЯ ШПАРГАЛКА ДЛЯ СТАРТА
Минимальный набор для запуска:
bash

 
# 1. Создать структуру
mkdir theatre-quiz
cd theatre-quiz
mkdir -p css js assets/{photos,placeholders,icons} libs

# 2. Скачать библиотеку
curl -o libs/jszip.min.js https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js

# 3. Создать файлы
touch index.html
touch css/{main,animations,responsive}.css
touch js/{app,questions,state,ui,utils}.js

# 4. С  из ТЗ в соответствующие файлы

# 5. Добавить 35 фото в assets/photos/
# Назвать: photo-01.jpg, photo-02.jpg, ..., photo-35.jpg

# 6. Добавить 10 фото-вопросов в assets/placeholders/
# Назвать: question-03.jpg, question-06.jpg, и т.д.

# 7. Открыть index.html в браузере
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
🎭 ФИНАЛЬНОЕ СЛОВО
Этот проект создан с любовью к театру и вниманием к деталям. Каждый элемент — от театрального занавеса до золотых билетов — призван погрузить именинницу в атмосферу Большого театра.

Цель достигнута, если:
- 😊 Именинница довольна
- 🎯 Все вопросы интересные
- 📸 Все фото открыты
- ✨ Воспоминания сохранены

Удачи с запуском! 🎊