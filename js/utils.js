function playSound(soundName) {
  // Звуки отключены
  console.log(`Звук ${soundName} отключен`);
}

// ============= ОПРЕДЕЛЕНИЕ ОРИЕНТАЦИИ ИЗОБРАЖЕНИЙ =============

/**
 * Определяет ориентацию изображения по его размерам
 * @param {number} width - Ширина изображения
 * @param {number} height - Высота изображения
 * @returns {string} - 'landscape', 'portrait' или 'square'
 */
function getImageOrientation(width, height) {
  if (width > height) {
    return 'landscape';
  } else if (height > width) {
    return 'portrait';
  } else {
    return 'square';
  }
}

/**
 * Загружает изображение и определяет его ориентацию
 * @param {string} imagePath - Путь к изображению
 * @returns {Promise<Object>} - Объект с ориентацией и размерами
 */
function getImageOrientationAsync(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      const orientation = getImageOrientation(this.naturalWidth, this.naturalHeight);
      resolve({
        orientation: orientation,
        width: this.naturalWidth,
        height: this.naturalHeight,
        aspectRatio: this.naturalWidth / this.naturalHeight
      });
    };
    img.onerror = function() {
      reject(new Error(`Не удалось загрузить изображение: ${imagePath}`));
    };
    img.src = imagePath;
  });
}

/**
 * Кэш для хранения ориентации изображений
 */
const imageOrientationCache = new Map();

/**
 * Получает ориентацию изображения с кэшированием
 * @param {string} imagePath - Путь к изображению
 * @returns {Promise<Object>} - Объект с ориентацией и размерами
 */
async function getCachedImageOrientation(imagePath) {
  if (imageOrientationCache.has(imagePath)) {
    return imageOrientationCache.get(imagePath);
  }
  
  try {
    const orientationData = await getImageOrientationAsync(imagePath);
    imageOrientationCache.set(imagePath, orientationData);
    return orientationData;
  } catch (error) {
    console.warn(`Ошибка определения ориентации для ${imagePath}:`, error);
    // Возвращаем дефолтные значения для горизонтального изображения
    const defaultData = {
      orientation: 'landscape',
      width: 800,
      height: 600,
      aspectRatio: 4/3
    };
    imageOrientationCache.set(imagePath, defaultData);
    return defaultData;
  }
}

// Функция downloadAllPhotos удалена - кнопка скачивания больше не нужна

function openFullscreen(photoPath) {
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-overlay';
  overlay.innerHTML = `<div class="fullscreen-content"><button class="fullscreen-close" onclick="this.parentElement.parentElement.remove()">✕</button><img src="${photoPath}" alt="Фото" class="fullscreen-photo"></div>`;
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  document.body.appendChild(overlay);
}

// ============= ТЕАТРАЛЬНЫЕ УВЕДОМЛЕНИЯ =============

/**
 * Показать театральное уведомление
 * @param {string} title - Заголовок
 * @param {string} message - Сообщение
 * @param {function} onClose - Callback при закрытии
 */
function showNotification(title, message, onClose = null) {
  const notification = document.getElementById('theatreNotification');
  const titleEl = document.getElementById('notificationTitle');
  const messageEl = document.getElementById('notificationMessage');
  
  titleEl.textContent = title;
  messageEl.textContent = message;
  
  notification.style.display = 'flex';
  
  // Сохраняем callback
  window.currentNotificationCallback = onClose;
}

/**
 * Закрыть театральное уведомление
 */
function closeNotification() {
  const notification = document.getElementById('theatreNotification');
  notification.style.display = 'none';
  
  // Вызываем callback если есть
  if (window.currentNotificationCallback) {
    window.currentNotificationCallback();
    window.currentNotificationCallback = null;
  }
}

/**
 * Показать театральное подтверждение
 * @param {string} title - Заголовок
 * @param {string} message - Сообщение
 * @param {function} onConfirm - Callback при подтверждении
 * @param {function} onCancel - Callback при отмене
 */
function showConfirm(title, message, onConfirm, onCancel = null) {
  const confirm = document.getElementById('theatreConfirm');
  const titleEl = document.getElementById('confirmTitle');
  const messageEl = document.getElementById('confirmMessage');
  const yesBtn = document.getElementById('confirmYes');
  const noBtn = document.getElementById('confirmNo');
  
  titleEl.textContent = title;
  messageEl.textContent = message;
  
  confirm.style.display = 'flex';
  
  // Убираем старые обработчики
  const newYesBtn = yesBtn.cloneNode(true);
  const newNoBtn = noBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);
  noBtn.parentNode.replaceChild(newNoBtn, noBtn);
  
  // Добавляем новые обработчики
  newYesBtn.onclick = () => {
    confirm.style.display = 'none';
    if (onConfirm) onConfirm();
  };
  
  newNoBtn.onclick = () => {
    confirm.style.display = 'none';
    if (onCancel) onCancel();
  };
}


