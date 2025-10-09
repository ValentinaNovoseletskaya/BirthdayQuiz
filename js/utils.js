function playSound(soundName) {
  const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  if (!soundEnabled) return;
  try {
    const audio = new Audio(`assets/sounds/${soundName}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch (e) { console.log('Ошибка воспроизведения звука:', e); }
}

async function downloadAllPhotos() {
  try {
    const zip = new JSZip();
    const folder = zip.folder('theatre_photos');
    for (let i = 0; i < AppState.collectedPhotos.length; i++) {
      const photoPath = AppState.collectedPhotos[i];
      const response = await fetch(photoPath);
      const blob = await response.blob();
      folder.file(`photo-${String(i + 1).padStart(2, '0')}.jpg`, blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'theatre_memories.zip';
    link.click();
  } catch (e) {
    console.error('Ошибка создания архива:', e);
    showNotification(
      'Ошибка',
      'К сожалению, не удалось создать архив с фотографиями. Попробуйте ещё раз.'
    );
  }
}

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


